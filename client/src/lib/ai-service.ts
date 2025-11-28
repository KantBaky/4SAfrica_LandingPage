// client/src/lib/ai-service.ts
import { grokService } from "@/services/grokService"; 
// If you get an error here, change to: import { grokService } from "../services/grokService";

interface ImpactCalculationParams {
  country: string;
  population: number;
  solutionType: string;
  budget: number;
  selectedSdgs: string[];
}

interface ImpactResults {
  peopleImpacted: number;
  co2Reduction: number;
  jobsCreated: number;
  recommendations: string[];
}

interface QuizAnswers {
  focusArea: string;
  budget: string;
  timeline?: string;
  region?: string;
  experience?: string;
}

interface SolutionRecommendation {
  title: string;
  description: string;
  sdgs: string[];
  tools: string[];
  matchScore: number;
}

export class AIService {
  constructor() {}

  async calculateImpact(params: ImpactCalculationParams): Promise<ImpactResults> {
    return this.fallbackImpactCalculation(params);
  }

  async getSolutionRecommendations(answers: QuizAnswers): Promise<SolutionRecommendation[]> {
    return this.fallbackRecommendations(answers);
  }

  async getChatResponse(message: string, sessionId: string, language: string = 'en'): Promise<string> {
    try {
      const result = await grokService.chatWithContext(message, language);

      if (typeof result === 'object' && result && 'narrative' in result) {
        return result.narrative;
      }

      return result as string;
    } catch (error) {
      console.error('Grok direct call failed:', error);
      // Use the built-in fallback from GrokService (no longer private)
      const lastUserMessage = { role: 'user' as const, content: message };
      return await grokService.chat(
        [{ role: 'user', content: message }],
        language
      );
    }
  }

  private fallbackImpactCalculation(params: ImpactCalculationParams): ImpactResults {
    const { population, budget, solutionType } = params;
    
    const baseMultiplier = {
      solar: { impact: 0.6, co2: 0.002, jobs: 0.0001 },
      agriculture: { impact: 0.8, co2: 0.001, jobs: 0.00015 },
      water: { impact: 0.7, co2: 0.0005, jobs: 0.00012 },
      education: { impact: 0.9, co2: 0.0003, jobs: 0.00008 },
      healthcare: { impact: 0.5, co2: 0.0002, jobs: 0.0001 },
    };

    const multiplier = baseMultiplier[solutionType as keyof typeof baseMultiplier] || baseMultiplier.solar;

    return {
      peopleImpacted: Math.floor(population * multiplier.impact),
      co2Reduction: Math.floor(budget * multiplier.co2),
      jobsCreated: Math.floor(budget * multiplier.jobs),
      recommendations: [
        "Partner with local organizations for community engagement",
        "Implement phased rollout starting with pilot communities",
        "Establish monitoring and evaluation framework",
        "Develop local capacity building programs",
      ],
    };
  }

  private fallbackRecommendations(answers: QuizAnswers): SolutionRecommendation[] {
    const recommendations: Record<string, SolutionRecommendation> = {
      energy: {
        title: "Solar Energy Microgrid",
        description: "AI-optimized solar energy system with smart grid capabilities for reliable power access.",
        sdgs: ["SDG 7", "SDG 13"],
        tools: ["AI/ML", "IoT"],
        matchScore: 95,
      },
      agriculture: {
        title: "Smart Agriculture Platform",
        description: "IoT-based crop monitoring and AI-driven farming recommendations to optimize yields.",
        sdgs: ["SDG 2", "SDG 15"],
        tools: ["IoT", "AI/ML", "Mobile"],
        matchScore: 92,
      },
      water: {
        title: "Water Quality Management",
        description: "Mobile-based water monitoring system with real-time quality tracking and distribution optimization.",
        sdgs: ["SDG 6", "SDG 3"],
        tools: ["Mobile", "IoT"],
        matchScore: 88,
      },
      education: {
        title: "Digital Learning Platform",
        description: "AI-powered adaptive learning system delivering personalized education in local languages.",
        sdgs: ["SDG 4", "SDG 10"],
        tools: ["AI/ML", "Mobile"],
        matchScore: 90,
      },
    };

    return [recommendations[answers.focusArea] || recommendations.energy];
  }
}

export const aiService = new AIService();