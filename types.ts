import React from 'react';

export interface NavItem {
  title: string;
  path: string;
  icon?: React.ReactNode;
  children?: NavItem[];
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

export interface IdeaStructureResponse {
  vision: string;
  motivation: string;
  steps: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  link: string;
}

export interface SearchSource {
  title: string;
  uri: string;
}

export interface SearchResult {
  text: string;
  sources: SearchSource[];
}