import OpenAI from "openai";
import type { 
  InsertImpactCalculation, 
  InsertQuizResult,
  ImpactCalculation,
  QuizResult
} from "@shared/schema";

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY || "" 
});

interface ImpactResults {
  peopleImpacted: number;
  co2Reduction: number;
  jobsCreated: number;
  recommendations: string[];
}

interface SolutionRecommendation {
  title: string;
  description: string;
  sdgs: string[];
  tools: string[];
  matchScore: number;
}

export class AIService {
  async calculateImpact(params: InsertImpactCalculation): Promise<ImpactResults> {
    try {
      const prompt = `
        You are an AI expert in sustainability and development in Sub-Saharan Africa. 
        Calculate the potential impact of a sustainability project with these parameters:
        
        Country: ${params.country}
        Population: ${params.population}
        Solution Type: ${params.solutionType}
        Budget: $${params.budget}
        Target SDGs: ${params.selectedSdgs.join(", ")}
        
        Provide realistic estimates for:
        1. People directly impacted
        2. CO2 reduction per year (in tons)
        3. Jobs created
        4. 4-5 specific actionable recommendations
        
        Consider local context, infrastructure, and typical project outcomes in Sub-Saharan Africa.
        Respond in JSON format.
      `;

      const response = await openai.chat.completions.create({
        model: "gpt-5",
        messages: [
          {
            role: "system",
            content: "You are an expert in sustainability impact assessment for Sub-Saharan Africa. Provide realistic, data-driven estimates based on actual project outcomes in the region."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.3
      });

      const result = JSON.parse(response.choices[0].message.content || "{}");
      
      return {
        peopleImpacted: result.peopleImpacted || Math.floor(params.population * 0.6),
        co2Reduction: result.co2Reduction || Math.floor(params.budget * 0.002),
        jobsCreated: result.jobsCreated || Math.floor(params.budget * 0.0001),
        recommendations: result.recommendations || [
          "Partner with local organizations for community engagement",
          "Implement phased rollout starting with pilot communities",
          "Establish monitoring and evaluation framework",
          "Develop local capacity building programs"
        ]
      };
    } catch (error) {
      console.error("AI impact calculation error:", error);
      return this.fallbackImpactCalculation(params);
    }
  }

  async getSolutionRecommendations(answers: InsertQuizResult): Promise<SolutionRecommendation[]> {
    try {
      const prompt = `
        Based on these user preferences for sustainability solutions in Sub-Saharan Africa:
        
        Focus Area: ${answers.focusArea}
        Budget Range: ${answers.budget}
        Timeline: ${answers.timeline || "Not specified"}
        Region: ${answers.region || "Not specified"}
        Experience Level: ${answers.experience || "Not specified"}
        
        Recommend 2-3 specific sustainability solutions that would be most suitable.
        For each solution, provide:
        1. Title
        2. Detailed description (2-3 sentences)
        3. Relevant SDGs
        4. Required tools/technologies
        5. Match score (0-100%)
        
        Focus on proven solutions that work well in Sub-Saharan Africa.
        Respond in JSON format with an array of recommendations.
      `;

      const response = await openai.chat.completions.create({
        model: "gpt-5",
        messages: [
          {
            role: "system",
            content: "You are an expert consultant specializing in sustainability solutions for Sub-Saharan Africa. Recommend practical, proven solutions based on user needs."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.4
      });

      const result = JSON.parse(response.choices[0].message.content || "{}");
      return result.recommendations || this.fallbackRecommendations(answers);
    } catch (error) {
      console.error("AI recommendation error:", error);
      return this.fallbackRecommendations(answers);
    }
  }

  async getChatResponse(message: string, sessionId: string): Promise<string> {
    try {
      const prompt = `
        You are SustainaBot, an AI assistant specializing in sustainability solutions for Sub-Saharan Africa.
        You work for 4S (Sub-Saharan Sustainability Solutions), a company that creates AI-powered sustainability solutions.
        
        Key information about 4S:
        - Focus on AI + opportunity-driven sustainability in Africa
        - Work across energy access, agriculture, water, education, and climate action
        - Serve 12 countries with 150+ completed projects
        - Impact 500+ communities addressing all 17 SDGs
        - Use AI, IoT, mobile, and blockchain technologies
        
        User message: "${message}"
        
        Provide helpful, accurate information about sustainability in Africa, 4S solutions, or general guidance.
        Be conversational, supportive, and knowledgeable. Keep responses concise but informative.
      `;

      const response = await openai.chat.completions.create({
        model: "gpt-5",
        messages: [
          {
            role: "system",
            content: "You are SustainaBot, a knowledgeable and helpful AI assistant focused on sustainability solutions in Sub-Saharan Africa."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 300
      });

      return response.choices[0].message.content || "I'm sorry, I couldn't process your request right now. Please try again.";
    } catch (error) {
      console.error("AI chat error:", error);
      return "I'm experiencing technical difficulties. Please try again later or contact our support team for assistance.";
    }
  }

  private fallbackImpactCalculation(params: InsertImpactCalculation): ImpactResults {
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

  private fallbackRecommendations(answers: InsertQuizResult): SolutionRecommendation[] {
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
