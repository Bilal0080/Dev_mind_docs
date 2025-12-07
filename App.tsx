import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import PythonPage from './pages/PythonPage';
import GeminiPage from './pages/GeminiPage';
import MotivationalPage from './pages/MotivationalPage';
import ProjectsPage from './pages/ProjectsPage';
import HackathonPage from './pages/HackathonPage';
import ClaudePage from './pages/ClaudePage';
import WSLPage from './pages/WSLPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import SettingsPage from './pages/SettingsPage';
import MCPPage from './pages/MCPPage';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/guides/hackathon" element={<HackathonPage />} />
          <Route path="/guides/tools" element={<ClaudePage />} />
          <Route path="/guides/wsl" element={<WSLPage />} />
          <Route path="/guides/mcp" element={<MCPPage />} />
          <Route path="/skills/python" element={<PythonPage />} />
          <Route path="/skills/github" element={<PythonPage />} />
          <Route path="/ai/gemini" element={<GeminiPage />} />
          <Route path="/philosophy/structure" element={<MotivationalPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;