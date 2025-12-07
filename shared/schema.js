"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertInvestmentOpportunitySchema = exports.insertChatMessageSchema = exports.insertQuizResultSchema = exports.insertSolutionSchema = exports.insertImpactCalculationSchema = exports.insertUserSchema = exports.investmentOpportunities = exports.chatMessages = exports.quizResults = exports.solutions = exports.impactCalculations = exports.users = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_zod_1 = require("drizzle-zod");
exports.users = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.varchar)("id").primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    username: (0, pg_core_1.text)("username").notNull().unique(),
    password: (0, pg_core_1.text)("password").notNull(),
});
exports.impactCalculations = (0, pg_core_1.pgTable)("impact_calculations", {
    id: (0, pg_core_1.varchar)("id").primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    country: (0, pg_core_1.text)("country").notNull(),
    population: (0, pg_core_1.integer)("population").notNull(),
    solutionType: (0, pg_core_1.text)("solution_type").notNull(),
    budget: (0, pg_core_1.integer)("budget").notNull(),
    selectedSdgs: (0, pg_core_1.jsonb)("selected_sdgs").notNull().$type(),
    results: (0, pg_core_1.jsonb)("results").notNull().$type(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
});
exports.solutions = (0, pg_core_1.pgTable)("solutions", {
    id: (0, pg_core_1.varchar)("id").primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    title: (0, pg_core_1.text)("title").notNull(),
    description: (0, pg_core_1.text)("description").notNull(),
    imageUrl: (0, pg_core_1.text)("image_url").notNull(),
    country: (0, pg_core_1.text)("country").notNull(),
    sdg: (0, pg_core_1.text)("sdg").notNull(),
    tools: (0, pg_core_1.jsonb)("tools").notNull().$type(),
    status: (0, pg_core_1.text)("status").notNull(),
    beneficiaries: (0, pg_core_1.integer)("beneficiaries"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
});
exports.quizResults = (0, pg_core_1.pgTable)("quiz_results", {
    id: (0, pg_core_1.varchar)("id").primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    focusArea: (0, pg_core_1.text)("focus_area").notNull(),
    budget: (0, pg_core_1.text)("budget").notNull(),
    timeline: (0, pg_core_1.text)("timeline"),
    region: (0, pg_core_1.text)("region"),
    experience: (0, pg_core_1.text)("experience"),
    recommendations: (0, pg_core_1.jsonb)("recommendations").notNull().$type(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
});
exports.chatMessages = (0, pg_core_1.pgTable)("chat_messages", {
    id: (0, pg_core_1.varchar)("id").primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    message: (0, pg_core_1.text)("message").notNull(),
    response: (0, pg_core_1.text)("response").notNull(),
    sessionId: (0, pg_core_1.text)("session_id").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
});
exports.investmentOpportunities = (0, pg_core_1.pgTable)("investment_opportunities", {
    id: (0, pg_core_1.varchar)("id").primaryKey().default((0, drizzle_orm_1.sql) `gen_random_uuid()`),
    title: (0, pg_core_1.text)("title").notNull(),
    description: (0, pg_core_1.text)("description").notNull(),
    stage: (0, pg_core_1.text)("stage").notNull(),
    sector: (0, pg_core_1.text)("sector").notNull(),
    country: (0, pg_core_1.text)("country").notNull(),
    fundingTarget: (0, pg_core_1.integer)("funding_target").notNull(),
    currentFunding: (0, pg_core_1.integer)("current_funding").default(0),
    beneficiaries: (0, pg_core_1.integer)("beneficiaries"),
    irr: (0, pg_core_1.text)("irr"),
    status: (0, pg_core_1.text)("status").notNull().default("active"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
});
exports.insertUserSchema = (0, drizzle_zod_1.createInsertSchema)(exports.users).pick({
    username: true,
    password: true,
});
exports.insertImpactCalculationSchema = (0, drizzle_zod_1.createInsertSchema)(exports.impactCalculations).omit({
    id: true,
    createdAt: true,
});
exports.insertSolutionSchema = (0, drizzle_zod_1.createInsertSchema)(exports.solutions).omit({
    id: true,
    createdAt: true,
});
exports.insertQuizResultSchema = (0, drizzle_zod_1.createInsertSchema)(exports.quizResults).omit({
    id: true,
    createdAt: true,
});
exports.insertChatMessageSchema = (0, drizzle_zod_1.createInsertSchema)(exports.chatMessages).omit({
    id: true,
    createdAt: true,
});
exports.insertInvestmentOpportunitySchema = (0, drizzle_zod_1.createInsertSchema)(exports.investmentOpportunities).omit({
    id: true,
    createdAt: true,
});
