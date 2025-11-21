import OpenAI from "openai";

// xAI integration - using the xAI blueprint pattern
const openai = new OpenAI({ 
  baseURL: "https://api.x.ai/v1", 
  apiKey: process.env.XAI_API_KEY 
});

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export class GrokService {
  private async getFallbackResponse(userMessage: string): Promise<string> {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('solution') || lowerMessage.includes('what do you offer')) {
      return `4S offers six core sustainability solutions for Sub-Saharan Africa:

1. **Clean Energy Access**: AI-optimized solar microgrids for rural communities
2. **Water Management**: IoT-powered clean water distribution systems
3. **Smart Agriculture**: Data-driven farming to maximize yields sustainably
4. **Digital Infrastructure**: Building connectivity in underserved regions
5. **Impact Analytics**: Real-time SDG tracking and reporting
6. **Innovation Labs**: Fostering local tech-driven solutions

Would you like to learn more about any specific solution?`;
    }
    
    if (lowerMessage.includes('impact') || lowerMessage.includes('result')) {
      return `4S has made significant impact across Sub-Saharan Africa:

• 500K+ lives impacted through our solutions
• Operating in 15+ countries
• 50+ solutions successfully deployed
• 2.5M tons of CO₂ emissions reduced

Our approach combines AI technology with local expertise to create sustainable, scalable solutions that address real community needs.`;
    }
    
    if (lowerMessage.includes('how') || lowerMessage.includes('work')) {
      return `4S follows a three-step process:

1. **Assess & Analyze**: Use AI to identify sustainability challenges specific to your region
2. **Design & Deploy**: Implement tailored solutions with local expertise
3. **Monitor & Scale**: Continuous optimization and expansion to new communities

Each solution is designed for the unique context of Sub-Saharan Africa, ensuring maximum impact and sustainability.`;
    }
    
    if (lowerMessage.includes('partner') || lowerMessage.includes('contact') || lowerMessage.includes('get started')) {
      return `I'd be happy to help you get started! You can:

• Fill out the contact form at the bottom of this page
• Email us at info@4ssolutions.com
• Call us at +234 (0) 123 456 7890

We work with governments, NGOs, and investors to create lasting sustainability impact across Sub-Saharan Africa. What type of partnership are you interested in?`;
    }
    
    return `Thank you for your question! I'm SustainaBot, here to help you learn about 4S's AI-powered sustainability solutions for Sub-Saharan Africa.

I can tell you about:
• Our six core solution areas
• Impact we've achieved (500K+ lives, 15+ countries)
• How our process works
• Partnership opportunities

What would you like to know more about?`;
  }

  async chat(messages: ChatMessage[]): Promise<string> {
    try {
      const response = await openai.chat.completions.create({
        model: "grok-2-1212",
        messages: messages.map(msg => ({
          role: msg.role,
          content: msg.content
        })),
        max_tokens: 500,
        temperature: 0.7,
      });

      return response.choices[0].message.content || "I apologize, but I couldn't generate a response. Please try again.";
    } catch (error: any) {
      console.error("Grok API error:", error);
      
      // Use fallback if API is unavailable (credits issue, network error, etc.)
      const lastUserMessage = messages.filter(m => m.role === 'user').pop();
      if (lastUserMessage) {
        console.log("Using fallback response due to API error");
        return this.getFallbackResponse(lastUserMessage.content);
      }
      
      throw new Error(`Failed to get response from Grok: ${error.message}`);
    }
  }

  async chatWithContext(userMessage: string): Promise<string> {
    const systemPrompt = `You are SustainaBot, an AI assistant for 4S (Sub-Saharan Sustainability Solutions). 
You help users understand 4S's AI-powered sustainability solutions for Sub-Saharan Africa.

Key information about 4S:
- Mission: Transform Sub-Saharan Africa through AI-powered sustainability solutions
- Focus Areas: Clean Energy Access, Water Management, Smart Agriculture, Digital Infrastructure, Impact Analytics, Innovation Labs
- Impact: Over 5 million lives impacted across 12 countries with 200+ solutions deployed
- Goals: Address SDGs (Sustainable Development Goals) while creating lasting impact

Your responses should be:
- Professional yet warm and approachable
- Focused on sustainability and impact in Sub-Saharan Africa
- Informative about 4S's solutions and approach
- Helpful in guiding users to the right solutions for their needs

Keep responses concise (2-3 paragraphs maximum) and actionable.`;

    const messages: ChatMessage[] = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userMessage }
    ];

    return this.chat(messages);
  }
}

export const grokService = new GrokService();
