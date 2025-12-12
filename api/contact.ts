import type { VercelRequest, VercelResponse } from "@vercel/node";
import { emailService } from "../server/services/emailService";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { email, name, message, subject } = req.body as {
      email?: string;
      name?: string;
      message?: string;
      subject?: string;
    };

    // Basic validation
    if (!email || !message) {
      return res.status(400).json({
        success: false,
        message: "Email and message are required",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // Send contact email to admin (4S inbox)
    const sentToAdmin = await emailService.sendContactEmail({
      email,
      name,
      message,
      subject,
    });

    // Send confirmation email to visitor
    const sentConfirmation = await emailService.sendConfirmationEmail(email);

    if (!sentConfirmation) {
      console.warn(
        "[Contact API] Failed to send confirmation email to:",
        email
      );
    }

    if (!sentToAdmin) {
      return res.status(500).json({
        success: false,
        message: "Failed to send message. Please try again.",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Your message has been sent successfully. We'll get back to you soon!",
    });
  } catch (error: any) {
    console.error("[Contact API] Error:", error);
    return res.status(500).json({
      success: false,
      message:
        "Unexpected error sending your message. Please try again later.",
    });
  }
}
