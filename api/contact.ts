export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, name, message } = req.body;

    if (!email || !message) {
      return res.status(400).json({ 
        success: false,
        message: 'Email and message are required' 
      });
    }

    // Log the submission (you can add email sending here later)
    console.log('Contact form submission:', { email, name, message });

    return res.status(200).json({ 
      success: true,
      message: 'Thank you for your message! We\'ll get back to you soon.' 
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Something went wrong. Please try again later.' 
    });
  }
}