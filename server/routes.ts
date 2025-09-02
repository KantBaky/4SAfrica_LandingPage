import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { storage } from "./storage";
import { aiService } from "./services/ai-service";
import { 
  insertImpactCalculationSchema,
  insertQuizResultSchema,
  insertChatMessageSchema,
  insertInvestmentOpportunitySchema 
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Impact Calculator API
  app.post("/api/ai/calculate-impact", async (req, res) => {
    try {
      const data = insertImpactCalculationSchema.parse(req.body);
      const results = await aiService.calculateImpact(data);
      
      // Store calculation in database
      const calculation = await storage.createImpactCalculation({
        ...data,
        results
      });
      
      res.json(results);
    } catch (error) {
      console.error("Impact calculation error:", error);
      res.status(500).json({ message: "Failed to calculate impact" });
    }
  });

  // Solution Recommendations API
  app.post("/api/ai/recommend-solutions", async (req, res) => {
    try {
      const data = insertQuizResultSchema.parse(req.body);
      const recommendations = await aiService.getSolutionRecommendations(data);
      
      // Store quiz result
      await storage.createQuizResult({
        ...data,
        recommendations: recommendations as any[]
      });
      
      res.json(recommendations);
    } catch (error) {
      console.error("Solution recommendation error:", error);
      res.status(500).json({ message: "Failed to generate recommendations" });
    }
  });

  // Chat API
  app.post("/api/ai/chat", async (req, res) => {
    try {
      const { message, sessionId } = req.body;
      
      if (!message || !sessionId) {
        return res.status(400).json({ message: "Message and sessionId are required" });
      }
      
      const response = await aiService.getChatResponse(message, sessionId);
      
      // Store chat message
      await storage.createChatMessage({
        message,
        response,
        sessionId
      });
      
      res.json({ response });
    } catch (error) {
      console.error("Chat error:", error);
      res.status(500).json({ message: "Failed to get chat response" });
    }
  });

  // Investment Opportunities API
  app.get("/api/investment-opportunities", async (req, res) => {
    try {
      const opportunities = await storage.getInvestmentOpportunities();
      res.json(opportunities);
    } catch (error) {
      console.error("Investment opportunities error:", error);
      res.status(500).json({ message: "Failed to fetch investment opportunities" });
    }
  });

  app.get("/api/investment-stats", async (req, res) => {
    try {
      const stats = await storage.getInvestmentStats();
      res.json(stats);
    } catch (error) {
      console.error("Investment stats error:", error);
      res.status(500).json({ message: "Failed to fetch investment stats" });
    }
  });

  // Solutions API
  app.get("/api/solutions", async (req, res) => {
    try {
      const solutions = await storage.getSolutions();
      res.json(solutions);
    } catch (error) {
      console.error("Solutions error:", error);
      res.status(500).json({ message: "Failed to fetch solutions" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
