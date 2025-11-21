import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { storage } from "./storage";
import { aiService } from "./services/ai-service";
import { grokService } from "./services/grokService";
import { emailService } from "./services/emailService";
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

  // Chat API - Using GrokAI
  app.post("/api/ai/chat", async (req, res) => {
    try {
      const { message, sessionId } = req.body;
      
      if (!message || !sessionId) {
        return res.status(400).json({ message: "Message and sessionId are required" });
      }
      
      const response = await grokService.chatWithContext(message);
      
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

  // Contact Form API
  app.post("/api/contact", async (req, res) => {
    try {
      const { email, name, message, subject } = req.body;

      // Validate required fields
      if (!email || !message) {
        return res.status(400).json({ message: "Email and message are required" });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
      }

      // Send contact email to 4S
      await emailService.sendContactEmail({ email, name, message, subject });

      // Send confirmation email to user
      await emailService.sendConfirmationEmail(email);

      res.json({ 
        success: true,
        message: "Your message has been sent successfully. We'll get back to you soon!" 
      });
    } catch (error: any) {
      console.error("Contact form error:", error);
      res.status(500).json({ 
        message: "Failed to send message. Please try again or contact us directly at info@4ssolutions.com",
        error: error.message 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
