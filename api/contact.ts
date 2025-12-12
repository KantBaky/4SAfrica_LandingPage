import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, name, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({ 
      success: false,
      message: 'Email and message are required' 
    });
  }

  // Add your email sending logic here
  console.log('Contact form submission:', { email, name, message });

  return res.status(200).json({ 
    success: true,
    message: 'Thank you for your message!' 
  });
}