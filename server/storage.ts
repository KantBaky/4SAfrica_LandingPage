import { randomUUID } from "crypto";
import type { 
  User, 
  InsertUser,
  ImpactCalculation,
  InsertImpactCalculation,
  Solution,
  InsertSolution,
  QuizResult,
  InsertQuizResult,
  ChatMessage,
  InsertChatMessage,
  InvestmentOpportunity,
  InsertInvestmentOpportunity
} from "@shared/schema";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createImpactCalculation(calculation: InsertImpactCalculation): Promise<ImpactCalculation>;
  getImpactCalculations(): Promise<ImpactCalculation[]>;
  
  getSolutions(): Promise<Solution[]>;
  createSolution(solution: InsertSolution): Promise<Solution>;
  
  createQuizResult(result: InsertQuizResult): Promise<QuizResult>;
  getQuizResults(): Promise<QuizResult[]>;
  
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  getChatMessages(sessionId: string): Promise<ChatMessage[]>;
  
  getInvestmentOpportunities(): Promise<InvestmentOpportunity[]>;
  createInvestmentOpportunity(opportunity: InsertInvestmentOpportunity): Promise<InvestmentOpportunity>;
  getInvestmentStats(): Promise<{ totalValue: number; activeProjects: number; avgIrr: number; }>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private impactCalculations: Map<string, ImpactCalculation>;
  private solutions: Map<string, Solution>;
  private quizResults: Map<string, QuizResult>;
  private chatMessages: Map<string, ChatMessage>;
  private investmentOpportunities: Map<string, InvestmentOpportunity>;

  constructor() {
    this.users = new Map();
    this.impactCalculations = new Map();
    this.solutions = new Map();
    this.quizResults = new Map();
    this.chatMessages = new Map();
    this.investmentOpportunities = new Map();
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample Investment Opportunities
    const sampleOpportunities: InvestmentOpportunity[] = [
      {
        id: randomUUID(),
        title: "Nigeria Solar Grid Expansion",
        description: "Scalable solar microgrid system for rural communities",
        stage: "series-a",
        sector: "Energy Access",
        country: "Nigeria",
        fundingTarget: 3200000,
        currentFunding: 800000,
        beneficiaries: 50000,
        irr: "12.5%",
        status: "active",
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        title: "Kenya AgriTech Platform",
        description: "AI-powered agricultural optimization platform",
        stage: "seed",
        sector: "Agriculture",
        country: "Kenya",
        fundingTarget: 1800000,
        currentFunding: 400000,
        beneficiaries: 15000,
        irr: "15.2%",
        status: "active",
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        title: "Ghana Water Management",
        description: "Smart water distribution and quality monitoring system",
        stage: "series-b",
        sector: "Water & Sanitation",
        country: "Ghana",
        fundingTarget: 5500000,
        currentFunding: 2200000,
        beneficiaries: 80000,
        irr: "9.8%",
        status: "active",
        createdAt: new Date(),
      }
    ];

    sampleOpportunities.forEach(opportunity => {
      this.investmentOpportunities.set(opportunity.id, opportunity);
    });

    // Sample Solutions
    const sampleSolutions: Solution[] = [
      {
        id: randomUUID(),
        title: "Smart Grid Nigeria",
        description: "AI-powered microgrid system serving 15,000 rural households",
        imageUrl: "https://images.unsplash.com/photo-1497440001374-f26997328c1b",
        country: "nigeria",
        sdg: "sdg7",
        tools: ["ai", "iot"],
        status: "active",
        beneficiaries: 15000,
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        title: "AgriSense Kenya",
        description: "IoT sensor network for crop optimization",
        imageUrl: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449",
        country: "kenya",
        sdg: "sdg2",
        tools: ["iot", "mobile"],
        status: "active",
        beneficiaries: 8500,
        createdAt: new Date(),
      }
    ];

    sampleSolutions.forEach(solution => {
      this.solutions.set(solution.id, solution);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createImpactCalculation(calculation: InsertImpactCalculation): Promise<ImpactCalculation> {
    const id = randomUUID();
    const impact: ImpactCalculation = { 
      ...calculation, 
      id, 
      createdAt: new Date(),
      selectedSdgs: calculation.selectedSdgs as string[],
      results: {
        ...calculation.results,
        recommendations: calculation.results.recommendations as string[]
      }
    };
    this.impactCalculations.set(id, impact);
    return impact;
  }

  async getImpactCalculations(): Promise<ImpactCalculation[]> {
    return Array.from(this.impactCalculations.values());
  }

  async getSolutions(): Promise<Solution[]> {
    return Array.from(this.solutions.values());
  }

  async createSolution(solution: InsertSolution): Promise<Solution> {
    const id = randomUUID();
    const newSolution: Solution = { 
      ...solution, 
      id, 
      createdAt: new Date(),
      tools: solution.tools as string[],
      beneficiaries: solution.beneficiaries || null
    };
    this.solutions.set(id, newSolution);
    return newSolution;
  }

  async createQuizResult(result: InsertQuizResult): Promise<QuizResult> {
    const id = randomUUID();
    const quizResult: QuizResult = { 
      ...result, 
      id, 
      createdAt: new Date(),
      timeline: result.timeline || null,
      region: result.region || null,
      experience: result.experience || null,
      recommendations: result.recommendations as any[]
    };
    this.quizResults.set(id, quizResult);
    return quizResult;
  }

  async getQuizResults(): Promise<QuizResult[]> {
    return Array.from(this.quizResults.values());
  }

  async createChatMessage(message: InsertChatMessage): Promise<ChatMessage> {
    const id = randomUUID();
    const chatMessage: ChatMessage = { ...message, id, createdAt: new Date() };
    this.chatMessages.set(id, chatMessage);
    return chatMessage;
  }

  async getChatMessages(sessionId: string): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values())
      .filter(msg => msg.sessionId === sessionId)
      .sort((a, b) => (a.createdAt?.getTime() || 0) - (b.createdAt?.getTime() || 0));
  }

  async getInvestmentOpportunities(): Promise<InvestmentOpportunity[]> {
    return Array.from(this.investmentOpportunities.values())
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }

  async createInvestmentOpportunity(opportunity: InsertInvestmentOpportunity): Promise<InvestmentOpportunity> {
    const id = randomUUID();
    const newOpportunity: InvestmentOpportunity = { 
      ...opportunity, 
      id, 
      createdAt: new Date(),
      status: opportunity.status || "active",
      currentFunding: opportunity.currentFunding || 0,
      irr: opportunity.irr || null,
      beneficiaries: opportunity.beneficiaries || null
    };
    this.investmentOpportunities.set(id, newOpportunity);
    return newOpportunity;
  }

  async getInvestmentStats(): Promise<{ totalValue: number; activeProjects: number; avgIrr: number; }> {
    const opportunities = Array.from(this.investmentOpportunities.values());
    const activeOpportunities = opportunities.filter(opp => opp.status === "active");
    
    const totalValue = activeOpportunities.reduce((sum, opp) => sum + opp.fundingTarget, 0);
    const activeProjects = activeOpportunities.length;
    
    // Calculate average IRR
    const irrValues = activeOpportunities
      .map(opp => parseFloat(opp.irr?.replace('%', '') || '0'))
      .filter(irr => !isNaN(irr));
    const avgIrr = irrValues.length > 0 
      ? irrValues.reduce((sum, irr) => sum + irr, 0) / irrValues.length 
      : 0;

    return {
      totalValue,
      activeProjects,
      avgIrr: Math.round(avgIrr * 10) / 10, // Round to 1 decimal place
    };
  }
}

export const storage = new MemStorage();
