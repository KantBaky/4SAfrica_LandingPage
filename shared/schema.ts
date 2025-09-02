import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const impactCalculations = pgTable("impact_calculations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  country: text("country").notNull(),
  population: integer("population").notNull(),
  solutionType: text("solution_type").notNull(),
  budget: integer("budget").notNull(),
  selectedSdgs: jsonb("selected_sdgs").notNull().$type<string[]>(),
  results: jsonb("results").notNull().$type<{
    peopleImpacted: number;
    co2Reduction: number;
    jobsCreated: number;
    recommendations: string[];
  }>(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const solutions = pgTable("solutions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  country: text("country").notNull(),
  sdg: text("sdg").notNull(),
  tools: jsonb("tools").notNull().$type<string[]>(),
  status: text("status").notNull(),
  beneficiaries: integer("beneficiaries"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const quizResults = pgTable("quiz_results", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  focusArea: text("focus_area").notNull(),
  budget: text("budget").notNull(),
  timeline: text("timeline"),
  region: text("region"),
  experience: text("experience"),
  recommendations: jsonb("recommendations").notNull().$type<any[]>(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const chatMessages = pgTable("chat_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  message: text("message").notNull(),
  response: text("response").notNull(),
  sessionId: text("session_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const investmentOpportunities = pgTable("investment_opportunities", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  stage: text("stage").notNull(),
  sector: text("sector").notNull(),
  country: text("country").notNull(),
  fundingTarget: integer("funding_target").notNull(),
  currentFunding: integer("current_funding").default(0),
  beneficiaries: integer("beneficiaries"),
  irr: text("irr"),
  status: text("status").notNull().default("active"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertImpactCalculationSchema = createInsertSchema(impactCalculations).omit({
  id: true,
  createdAt: true,
});

export const insertSolutionSchema = createInsertSchema(solutions).omit({
  id: true,
  createdAt: true,
});

export const insertQuizResultSchema = createInsertSchema(quizResults).omit({
  id: true,
  createdAt: true,
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).omit({
  id: true,
  createdAt: true,
});

export const insertInvestmentOpportunitySchema = createInsertSchema(investmentOpportunities).omit({
  id: true,
  createdAt: true,
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type ImpactCalculation = typeof impactCalculations.$inferSelect;
export type InsertImpactCalculation = z.infer<typeof insertImpactCalculationSchema>;
export type Solution = typeof solutions.$inferSelect;
export type InsertSolution = z.infer<typeof insertSolutionSchema>;
export type QuizResult = typeof quizResults.$inferSelect;
export type InsertQuizResult = z.infer<typeof insertQuizResultSchema>;
export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type InvestmentOpportunity = typeof investmentOpportunities.$inferSelect;
export type InsertInvestmentOpportunity = z.infer<typeof insertInvestmentOpportunitySchema>;
