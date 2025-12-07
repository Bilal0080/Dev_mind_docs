import { GoogleGenAI, Type } from "@google/genai";
import { IdeaStructureResponse, SearchResult } from '../types';

export class GeminiError extends Error {
  constructor(message: string, public type: 'auth' | 'quota' | 'server' | 'unknown' = 'unknown') {
    super(message);
    this.name = 'GeminiError';
  }
}

// Helper to get the most relevant API key (Local storage takes precedence over Env)
const getApiKey = (): string => {
  if (typeof window !== 'undefined') {
    const localKey = localStorage.getItem('gemini_api_key');
    if (localKey) return localKey;
  }
  return process.env.API_KEY || '';
};

// Helper to get an initialized AI instance
const getAI = (): GoogleGenAI => {
  const key = getApiKey();
  return new GoogleGenAI({ apiKey: key });
};

const handleGeminiError = (error: any): never => {
  console.error("Gemini API Error Detail:", error);
  
  const msg = error.message || '';
  
  if (msg.includes('API_KEY') || msg.includes('401') || msg.includes('403')) {
    throw new GeminiError("Invalid or missing API Key. Please update it in Settings.", 'auth');
  }
  if (msg.includes('429') || msg.includes('quota')) {
    throw new GeminiError("API Quota exceeded. You may be sending too many requests.", 'quota');
  }
  if (msg.includes('fetch failed') || msg.includes('NetworkError')) {
    throw new GeminiError("Network error. Please check your internet connection.", 'server');
  }
  
  throw new GeminiError("An unexpected error occurred with the AI service.", 'unknown');
};

const checkApiKey = () => {
  const key = getApiKey();
  if (!key) {
    throw new GeminiError("API Key is missing. Please configure it in Settings or your environment.", 'auth');
  }
};

export const generateIdeaStructure = async (rawIdea: string): Promise<IdeaStructureResponse> => {
  checkApiKey();
  try {
    const response = await getAI().models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Analyze the following raw idea and restructure it into a 'Motivational Background Structure'.
      
      Raw Idea: ${rawIdea}
      
      Return a JSON object with:
      1. 'vision': A clear, inspiring vision statement (max 20 words).
      2. 'motivation': The core 'why' that drives this idea (max 30 words).
      3. 'steps': An array of 3-5 concrete, actionable steps to execute it.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            vision: { type: Type.STRING },
            motivation: { type: Type.STRING },
            steps: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from AI");
    return JSON.parse(text) as IdeaStructureResponse;

  } catch (error) {
    throw handleGeminiError(error);
  }
};

export const chatWithMentor = async (message: string): Promise<string> => {
    checkApiKey();
    try {
        const response = await getAI().models.generateContent({
            model: "gemini-2.5-flash",
            contents: `You are a senior developer mentor. Provide a short, encouraging, and technical answer to the user's question. Keep it under 50 words. Question: ${message}`,
        });
        return response.text || "I couldn't generate a response.";
    } catch (e) {
        throw handleGeminiError(e);
    }
};

export const debugCode = async (code: string, errorMsg: string): Promise<string> => {
  checkApiKey();
  try {
    const response = await getAI().models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are an expert code debugger. 
      
      Code Snippet:
      \`\`\`
      ${code}
      \`\`\`
      
      Error Message:
      ${errorMsg}
      
      Please provide:
      1. A brief explanation of why the error occurred.
      2. The corrected code block.
      Keep the explanation concise and professional.`,
    });
    return response.text || "Unable to analyze the error.";
  } catch (e) {
    throw handleGeminiError(e);
  }
};

export const generateProjectDescription = async (projectName: string, rawNotes: string): Promise<string> => {
  checkApiKey();
  try {
    const response = await getAI().models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Create a professional portfolio project description based on these details.
      
      Project Name: ${projectName}
      Raw Notes/Repo Link: ${rawNotes}
      
      Write a compelling 2-3 sentence description that highlights the problem solved, the technology used, and the impact. Use professional tone.`,
    });
    return response.text || "Could not generate description.";
  } catch (e) {
    throw handleGeminiError(e);
  }
};

export const generateImage = async (prompt: string): Promise<string | null> => {
  checkApiKey();
  try {
    const response = await getAI().models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData && part.inlineData.data) {
        const mimeType = part.inlineData.mimeType || 'image/png';
        return `data:${mimeType};base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (e) {
    throw handleGeminiError(e);
  }
};

export const performWebSearch = async (query: string): Promise<SearchResult> => {
  checkApiKey();
  try {
    const response = await getAI().models.generateContent({
      model: "gemini-2.5-flash",
      contents: query,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "No results found.";
    
    // Extract grounding chunks for sources
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = chunks
      .map((chunk: any) => chunk.web)
      .filter((web: any) => web)
      .map((web: any) => ({
        title: web.title || "Web Source",
        uri: web.uri || "#"
      }));

    return { text, sources };
  } catch (e) {
    throw handleGeminiError(e);
  }
};