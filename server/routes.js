"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = registerRoutes;
const http_1 = require("http");
const grokService_js_1 = require("./services/grokService.js");
const emailService_js_1 = require("./services/emailService.js");
async function registerRoutes(app) {
    // Chat API - Using GrokAI 
    app.post("/api/ai/chat", async (req, res) => {
        try {
            const { message, sessionId, language = 'en' } = req.body;
            if (!message || !sessionId) {
                return res.status(400).json({ message: "Message and sessionId are required" });
            }
            const response = await grokService_js_1.grokService.chatWithContext(message, language);
            res.json({ response });
        }
        catch (error) {
            console.error("Chat error:", error);
            res.status(500).json({ message: "Failed to get chat response" });
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
            await emailService_js_1.emailService.sendContactEmail({ email, name, message, subject });
            // Send confirmation email to user
            await emailService_js_1.emailService.sendConfirmationEmail(email);
            res.json({
                success: true,
                message: "Your message has been sent successfully. We'll get back to you soon!"
            });
        }
        catch (error) {
            console.error("Contact form error:", error);
            res.status(500).json({
                message: "Failed to send message. Please try again or contact us directly at info@4ssolutions.com",
                error: error.message
            });
        }
    });
    // Newsletter Subscription - Email Collection
    app.post("/api/subscribe", async (req, res) => {
        try {
            const { email } = req.body;
            if (!email || !email.includes('@')) {
                return res.status(400).json({ message: "Valid email is required" });
            }
            console.log(`[Subscribe] Email: ${email}, Time: ${new Date().toISOString()}`);
            res.json({ message: "Successfully subscribed", email });
        }
        catch (error) {
            console.error("Subscribe error:", error);
            res.status(500).json({ message: "Failed to subscribe" });
        }
    });
    // Visitor Data Collection - Automatic data gathering from cookies
    app.post("/api/collect-visitor-data", async (req, res) => {
        try {
            const visitorData = req.body;
            // Log comprehensive visitor information for outreach
            const logEntry = {
                timestamp: visitorData.timestamp,
                location: visitorData.ipInfo ? `${visitorData.ipInfo.city}, ${visitorData.ipInfo.country}` : 'Unknown',
                ip: visitorData.ipInfo?.ip || 'Not captured',
                device: visitorData.platform,
                browser: visitorData.userAgent.substring(0, 100),
                screenSize: visitorData.screenResolution,
                referrer: visitorData.referrer,
                language: visitorData.language,
                timezone: visitorData.timezone,
                url: visitorData.url,
            };
            console.log(`[Visitor Data Collected]`, logEntry);
            // Send email notification with visitor data
            await emailService_js_1.emailService.sendVisitorDataEmail(visitorData);
            res.json({
                success: true,
                message: "Visitor data collected successfully"
            });
        }
        catch (error) {
            console.error("Error collecting visitor data:", error);
            res.status(500).json({ message: "Failed to collect visitor data" });
        }
    });
    const httpServer = (0, http_1.createServer)(app);
    return httpServer;
}
