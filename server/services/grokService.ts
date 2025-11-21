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
