export interface AnalysisResult {
  id: string;
  riskLevel: 'low' | 'medium' | 'high';
  confidence: number;
  findings: string[];
  recommendations: string[];
  timestamp: Date;
  imageUrl?: string;
}

export interface GeminiRecommendation {
  homeRemedies: string[];
  skincareProducts: string[];
  dermatologists: DermatologistInfo[];
  supportResources: string[];
}

export interface DermatologistInfo {
  name: string;
  specialty: string;
  location: string;
  rating: number;
  contact: string;
}

export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}