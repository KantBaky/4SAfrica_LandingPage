export interface SDG {
  id: string;
  name: string;
  color: string;
}

export interface Country {
  id: string;
  name: string;
  flag: string;
}

export interface SolutionTool {
  id: string;
  name: string;
  category: string;
}

export interface ImpactMetrics {
  peopleImpacted: number;
  co2Reduction: number;
  jobsCreated: number;
  recommendations: string[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    value: string;
    title: string;
    description: string;
    icon: string;
  }[];
}

export interface ChatMessage {
  id: string;
  message: string;
  isUser: boolean;
  timestamp: Date;
}

export interface TheoryStage {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  imageUrl: string;
}

export const SDGS: SDG[] = [
  { id: "sdg1", name: "No Poverty", color: "bg-red-500" },
  { id: "sdg2", name: "Zero Hunger", color: "bg-yellow-500" },
  { id: "sdg3", name: "Good Health", color: "bg-green-500" },
  { id: "sdg4", name: "Quality Education", color: "bg-red-600" },
  { id: "sdg6", name: "Clean Water", color: "bg-blue-400" },
  { id: "sdg7", name: "Clean Energy", color: "bg-yellow-400" },
  { id: "sdg13", name: "Climate Action", color: "bg-green-600" },
  { id: "sdg15", name: "Life on Land", color: "bg-green-700" },
  { id: "sdg17", name: "Partnerships", color: "bg-blue-800" },
];

export const COUNTRIES: Country[] = [
  { id: "nigeria", name: "Nigeria", flag: "🇳🇬" },
  { id: "kenya", name: "Kenya", flag: "🇰🇪" },
  { id: "ghana", name: "Ghana", flag: "🇬🇭" },
  { id: "senegal", name: "Senegal", flag: "🇸🇳" },
  { id: "uganda", name: "Uganda", flag: "🇺🇬" },
  { id: "tanzania", name: "Tanzania", flag: "🇹🇿" },
];

export const SOLUTION_TOOLS: SolutionTool[] = [
  { id: "ai", name: "AI/ML", category: "technology" },
  { id: "iot", name: "IoT Sensors", category: "technology" },
  { id: "mobile", name: "Mobile Apps", category: "technology" },
  { id: "blockchain", name: "Blockchain", category: "technology" },
  { id: "solar", name: "Solar Energy", category: "energy" },
  { id: "wind", name: "Wind Energy", category: "energy" },
];
