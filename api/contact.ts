import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

function getTransporter() {
  const smtpUser = process.env.SMTP_USER;
  const smtpPassword = process.env.SMTP_PASSWORD;

  if (!smtpUser || !smtpPassword) {
    throw new Error("Missing SMTP_USER or SMTP_PASSWORD environment variables.");
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true", // true for 465, false for 587
    auth: { user: smtpUser, pass: smtpPassword },
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Content-Type", "application/json");

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const { email, name, message, subject } = (req.body ?? {}) as {
      email?: string;
      name?: string;
      message?: string;
      subject?: string;
    };

    if (!email || !message) {
      return res.status(400).json({ success: false, message: "Email and message are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }

    const transporter = getTransporter();
    const inbox = process.env.CONTACT_EMAIL || process.env.SMTP_USER || "info@weare4s.com";

    // 1) Send to your inbox
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: inbox,
      replyTo: email,
      subject: `New Contact Form Submission${subject ? ": " + subject : ""}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${name || email}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
      text: `New Contact Form Submission\n\nFrom: ${name || email}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    // 2) Send confirmation back to user (don’t fail whole request if this fails)
    try {
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: "Thank you for contacting 4S",
        html: `
          <h2>Thank You for Reaching Out!</h2>
          <p>We’ve received your message and will get back to you soon.</p>
          <p>Best regards,<br/>The 4S Team</p>
        `,
        text: `Thank you for reaching out!\n\nWe’ve received your message and will get back to you soon.\n\nThe 4S Team`,
      });
    } catch (e) {
      console.warn("[api/contact] confirmation email failed:", e);
    }

    return res.status(200).json({
      success: true,
      message: "Your message has been sent successfully. We'll get back to you soon!",
    });
  } catch (err: any) {
    console.error("[api/contact] ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Error sending message. Please try again.",
      error: err?.message,
    });
  }
}
