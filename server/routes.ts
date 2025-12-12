import type { Express } from "express";
import { createServer, type Server } from "http";
import { emailService } from "./services/emailService";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact Form API
  app.post("/api/contact", async (req, res) => {
    try {
      const { email, name, message } = req.body;

      if (!email || !message) {
        return res.status(400).json({ 
          success: false, 
          message: "Email and message are required" 
        });
      }

      // Send email (if email service is configured)
      try {
        await sendContactEmail({ email, name, message });
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
        // Continue even if email fails
      }

      res.json({ 
        success: true, 
        message: "Thank you for your message! We'll get back to you soon." 
      });
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Something went wrong. Please try again later." 
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
    } catch (error) {
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
      await emailService.sendVisitorDataEmail(visitorData);
      
      res.json({ 
        success: true, 
        message: "Visitor data collected successfully" 
      });
    } catch (error) {
      console.error("Error collecting visitor data:", error);
      res.status(500).json({ message: "Failed to collect visitor data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
function sendContactEmail(arg0: { email: any; name: any; message: any; }) {
  throw new Error("Function not implemented.");
}

 // app.post("/api/contact", async (req, res) => {
  //   try {
  //     const { email, name, message, subject } = req.body;

  //     // Validate required fields
  //     if (!email || !message) {
  //       return res.status(400).json({ message: "Email and message are required" });
  //     } 

  //     // Validate email format
  //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //     if (!emailRegex.test(email)) {
  //       return res.status(400).json({ message: "Invalid email format" });
  //     }

  //     // Send contact email to 4S
  //     await emailService.sendContactEmail({ email, name, message, subject });

  //     // Send confirmation email to user
  //     await emailService.sendConfirmationEmail(email);

  //     res.json({ 
  //       success: true,
  //       message: "Your message has been sent successfully. We'll get back to you soon!" 
  //     });
  //   } catch (error: any) {
  //     console.error("Contact form error:", error);
  //     res.status(500).json({ 
  //       message: "Failed to send message. Please try again or contact us directly at info@4ssolutions.com",
  //       error: error.message 
  //     });
  //   }
  // });