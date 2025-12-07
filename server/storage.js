"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = exports.MemStorage = void 0;
const crypto_1 = require("crypto");
class MemStorage {
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
    initializeSampleData() {
        // Sample Investment Opportunities
        const sampleOpportunities = [
            {
                id: (0, crypto_1.randomUUID)(),
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
                id: (0, crypto_1.randomUUID)(),
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
                id: (0, crypto_1.randomUUID)(),
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
        const sampleSolutions = [
            {
                id: (0, crypto_1.randomUUID)(),
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
                id: (0, crypto_1.randomUUID)(),
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
    async getUser(id) {
        return this.users.get(id);
    }
    async getUserByUsername(username) {
        return Array.from(this.users.values()).find((user) => user.username === username);
    }
    async createUser(insertUser) {
        const id = (0, crypto_1.randomUUID)();
        const user = { ...insertUser, id };
        this.users.set(id, user);
        return user;
    }
    async createImpactCalculation(calculation) {
        const id = (0, crypto_1.randomUUID)();
        const impact = {
            ...calculation,
            id,
            createdAt: new Date(),
            selectedSdgs: calculation.selectedSdgs,
            results: {
                ...calculation.results,
                recommendations: calculation.results.recommendations
            }
        };
        this.impactCalculations.set(id, impact);
        return impact;
    }
    async getImpactCalculations() {
        return Array.from(this.impactCalculations.values());
    }
    async getSolutions() {
        return Array.from(this.solutions.values());
    }
    async createSolution(solution) {
        const id = (0, crypto_1.randomUUID)();
        const newSolution = {
            ...solution,
            id,
            createdAt: new Date(),
            tools: solution.tools,
            beneficiaries: solution.beneficiaries || null
        };
        this.solutions.set(id, newSolution);
        return newSolution;
    }
    async createQuizResult(result) {
        const id = (0, crypto_1.randomUUID)();
        const quizResult = {
            ...result,
            id,
            createdAt: new Date(),
            timeline: result.timeline || null,
            region: result.region || null,
            experience: result.experience || null,
            recommendations: result.recommendations
        };
        this.quizResults.set(id, quizResult);
        return quizResult;
    }
    async getQuizResults() {
        return Array.from(this.quizResults.values());
    }
    async createChatMessage(message) {
        const id = (0, crypto_1.randomUUID)();
        const chatMessage = { ...message, id, createdAt: new Date() };
        this.chatMessages.set(id, chatMessage);
        return chatMessage;
    }
    async getChatMessages(sessionId) {
        return Array.from(this.chatMessages.values())
            .filter(msg => msg.sessionId === sessionId)
            .sort((a, b) => (a.createdAt?.getTime() || 0) - (b.createdAt?.getTime() || 0));
    }
    async getInvestmentOpportunities() {
        return Array.from(this.investmentOpportunities.values())
            .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
    }
    async createInvestmentOpportunity(opportunity) {
        const id = (0, crypto_1.randomUUID)();
        const newOpportunity = {
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
    async getInvestmentStats() {
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
exports.MemStorage = MemStorage;
exports.storage = new MemStorage();
