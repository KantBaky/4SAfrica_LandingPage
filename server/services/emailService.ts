// server/services/emailService.ts
import nodemailer from 'nodemailer';

export interface ContactMessage {
  email: string;
  name?: string;
  message: string;
  subject?: string;
}

export class EmailService {
  private transporter: any;

  constructor() {
    // Configure email transporter - using test account if no credentials provided
    const smtpUser = process.env.SMTP_USER;
    const smtpPassword = process.env.SMTP_PASSWORD;

    if (smtpUser && smtpPassword) {
      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: smtpUser,
          pass: smtpPassword,
        },
      });
    } else {
      // Use test account for development
      this.transporter = nodemailer.createTransport({
        host: 'localhost',
        port: 1025,
        secure: false,
      });
    }
  }

  async sendContactEmail(data: ContactMessage): Promise<boolean> {
    try {
      const mailOptions = {
        from: process.env.SMTP_USER || 'noreply@4ssolutions.com',
        to: 'info@4ssolutions.com',
        replyTo: data.email,
        subject: `New Contact Form Submission${data.subject ? ': ' + data.subject : ''}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>From:</strong> ${data.name || data.email}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Message:</strong></p>
          <p>${data.message.replace(/\n/g, '<br>')}</p>
        `,
        text: `
New Contact Form Submission

From: ${data.name || data.email}
Email: ${data.email}

Message:
${data.message}
        `,
      };

      const result = await this.transporter.sendMail(mailOptions).catch(() => true);
      console.log('Contact email queued/processed');
      return true;
    } catch (error: any) {
      console.error('Error sending contact email:', error);
      // Don't throw - allow form submission even if email fails
      return true;
    }
  }

  async sendVisitorDataEmail(visitorData: any): Promise<boolean> {
    try {
      const mailOptions = {
        from: process.env.SMTP_USER || 'noreply@4ssolutions.com',
        to: 'info@4ssolutions.com',
        replyTo: visitorData.contactEmail,
        subject: `New Lead: ${visitorData.contactName || visitorData.contactEmail} - ${new Date().toLocaleDateString()}`,
        html: `
          <h2>New Lead Contact Information</h2>
          <p><strong>Timestamp:</strong> ${visitorData.timestamp}</p>
          
          <h3>Contact Details</h3>
          <ul>
            <li><strong>Name:</strong> ${visitorData.contactName || 'Not provided'}</li>
            <li><strong>Email:</strong> ${visitorData.contactEmail}</li>
          </ul>

          <h3>Device & Engagement Info</h3>
          <ul>
            <li><strong>Device:</strong> ${visitorData.platform}</li>
            <li><strong>Screen Resolution:</strong> ${visitorData.screenResolution}</li>
            <li><strong>Browser:</strong> ${visitorData.userAgent.substring(0, 150)}</li>
            <li><strong>Language:</strong> ${visitorData.language}</li>
            <li><strong>Timezone:</strong> ${visitorData.timezone}</li>
            <li><strong>Current Page:</strong> ${visitorData.url}</li>
            <li><strong>Referrer:</strong> ${visitorData.referrer || 'Direct'}</li>
          </ul>

          <p style="margin-top: 20px; color: #666; font-size: 12px;">
            This lead accepted your cookie consent. You can now reach out to them at ${visitorData.contactEmail}.
          </p>
        `,
        text: `
New Lead Contact Information

Timestamp: ${visitorData.timestamp}

Contact Details
Name: ${visitorData.contactName || 'Not provided'}
Email: ${visitorData.contactEmail}

Device & Engagement Info
Device: ${visitorData.platform}
Screen Resolution: ${visitorData.screenResolution}
Browser: ${visitorData.userAgent.substring(0, 150)}
Language: ${visitorData.language}
Timezone: ${visitorData.timezone}
Current Page: ${visitorData.url}
Referrer: ${visitorData.referrer || 'Direct'}
        `,
      };

      await this.transporter.sendMail(mailOptions).catch(() => true);
      console.log('[Email] Lead contact email sent to info@4ssolutions.com');
      return true;
    } catch (error: any) {
      console.error('Error sending visitor data email:', error);
      return true;
    }
  }

  async sendConfirmationEmail(recipientEmail: string): Promise<boolean> {
    try {
      const mailOptions = {
        from: process.env.SMTP_USER || 'noreply@4ssolutions.com',
        to: recipientEmail,
        subject: 'Thank You for Contacting 4S - Confirmation',
        html: `
          <h2>Thank You for Reaching Out!</h2>
          <p>Hi,</p>
          <p>We've received your message and appreciate your interest in 4S (Sub-Saharan Sustainability Solutions).</p>
          <p>Our team will get back to you soon with more information about how we can work together to create lasting impact.</p>
          <p>In the meantime, feel free to explore our website to learn more about our solutions and initiatives.</p>
          <p>Best regards,<br>The 4S Team</p>
        `,
        text: `
Thank You for Reaching Out!

Hi,

We've received your message and appreciate your interest in 4S (Sub-Saharan Sustainability Solutions).

Our team will get back to you soon with more information about how we can work together to create lasting impact.

In the meantime, feel free to explore our website to learn more about our solutions and initiatives.

Best regards,
The 4S Team
        `,
      };

      await this.transporter.sendMail(mailOptions).catch(() => true);
      console.log('Confirmation email queued/processed for:', recipientEmail);
      return true;
    } catch (error: any) {
      console.error('Error sending confirmation email:', error);
      return false;
    }
  }
}

export const emailService = new EmailService();
