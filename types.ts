export enum Page {
  DASHBOARD = 'DASHBOARD',
  SCENARIOS = 'SCENARIOS',
  ROLES = 'ROLES',
  TRAINING_SESSION = 'TRAINING_SESSION',
  ANALYTICS = 'ANALYTICS'
}

export interface UserState {
  name: string;
  role: string;
  avatar: string;
}

export interface Scenario {
  id: string;
  title: string;
  category: 'Sales' | 'Service' | 'Management' | 'Product';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  roles: string[];
  passRate: number;
  status: 'Active' | 'Draft';
}

export interface AIRole {
  id: string;
  name: string;
  age: number;
  jobTitle: string;
  personality: string[];
  avatar: string;
  description: string;
  voiceType: string;
}

export interface Message {
  id: string;
  sender: 'user' | 'ai' | 'system';
  text: string;
  timestamp: Date;
  feedback?: {
    score: number;
    sentiment: 'positive' | 'neutral' | 'negative';
    tips: string[];
  };
}

export interface Metric {
  label: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  color?: string;
}