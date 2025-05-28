// Type definitions for the application

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  demoUrl?: string;
  githubUrl?: string;
  aiModel?: AIModelType;
}

export interface TechStack {
  category: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  icon: string;
  proficiency: number; // 1-10
}

export type AIModelType = 'imageClassification' | 'textGeneration' | 'other';

export interface QuantumGate {
  id: string;
  name: string;
  symbol: string;
  matrix: number[][];
  description: string;
  qubits: number; // Number of qubits the gate operates on
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}