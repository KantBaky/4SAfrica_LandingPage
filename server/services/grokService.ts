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
    
    if (lowerMessage.includes('calculate') || lowerMessage.includes('impact')) {
      return `I can help you calculate the potential impact of 4S solutions! To give you accurate estimates, I'd like to know:

• What's the primary challenge you're addressing? (energy, water, agriculture, etc.)
• How many people would be affected?
• What's your estimated budget?
• Which UN SDGs are priorities for you?
• Which country or region?

For example, a clean energy microgrid in a rural area can impact 500+ people, reduce ~50 tons of CO₂ annually, and create 5-10 jobs. Tell me more about your context!`;
    }
    
    if (lowerMessage.includes('match') || lowerMessage.includes('which solution') || lowerMessage.includes('recommend')) {
      return `I'd love to help you find the perfect solutions! Let me ask a few questions:

• What sustainability challenges are you facing? (poverty, lack of electricity, water access, low agricultural yields, poor connectivity, etc.)
• Who are you? (government agency, NGO, investor, community leader)
• What's your timeline? (immediate, 1 year, 3 years, long-term)
• Approximate budget range?

Based on your answers, I can recommend the best mix of our 6 core solutions: Clean Energy, Water Management, Smart Agriculture, Digital Infrastructure, Impact Analytics, or Innovation Labs.`;
    }
    
    if (lowerMessage.includes('solution') || lowerMessage.includes('what do you offer')) {
      return `4S offers six core sustainability solutions for Sub-Saharan Africa:

1. **Clean Energy Access**: AI solar microgrids ($50K-500K), serves ~500 people/system
2. **Water Management**: IoT distribution ($30K-300K), serves ~2000 people/system
3. **Smart Agriculture**: Data-driven farming ($2K-20K), increases yields 35-50%
4. **Digital Infrastructure**: Connectivity & literacy ($100K-1M+), bridges digital gap
5. **Impact Analytics**: Real-time SDG tracking, custom pricing
6. **Innovation Labs**: Community tech hubs ($150K-750K), fosters local solutions

Ask me to calculate impact or match solutions to your specific needs!`;
    }
    
    if (lowerMessage.includes('investment') || lowerMessage.includes('roi') || lowerMessage.includes('return')) {
      return `Great interest in investment! Here's our typical ROI structure:

**5-10 Year Projections:**
• Clean Energy: 15-25% IRR, payback in 6-8 years
• Smart Agriculture: 25-35% IRR, immediate yield improvement
• Water Management: 12-18% IRR, high social impact
• Digital Infrastructure: 10-20% IRR, long-term growth

**Impact-First Returns:**
• Lives improved: 500-10,000+ per solution
• CO₂ reduced: 50-500 tons annually
• Jobs created: 5-100+ per deployment
• SDG alignment: 3-6 goals per solution

Let me calculate specific returns for your investment parameters!`;
    }
    
    if (lowerMessage.includes('partner') || lowerMessage.includes('contact') || lowerMessage.includes('get started')) {
      return `Excellent! Let's discuss your partnership with 4S. I can help with:

• **Governments**: Large-scale deployment, policy integration, impact metrics
• **NGOs**: Community-focused implementation, local expertise, grassroots scaling
• **Investors**: ROI analysis, portfolio diversification, impact returns
• **Communities**: Direct solution deployment, tech training, capacity building

Next steps:
• Fill out the contact form at the bottom of this page
• Email us at info@4ssolutions.com
• Call +234 (0) 123 456 7890

What type of partnership interests you most?`;
    }
    
    if (lowerMessage.includes('how') || lowerMessage.includes('work') || lowerMessage.includes('process')) {
      return `4S follows a three-step implementation process:

1. **Assess & Analyze**: AI analyzes your region - climate, infrastructure, population, economics
2. **Design & Deploy**: We customize solutions using local expertise + cutting-edge tech
3. **Monitor & Scale**: Real-time data tracking, optimization, and expansion

Plus, I can:
• Calculate potential impact for your situation
• Match solutions to your specific challenges
• Analyze ROI and partnership structure
• Guide you on SDG alignment

What aspect would you like me to help with?`;
    }
    
    return `Thank you! I'm SustainaBot, here to help with 4S's AI-powered sustainability solutions for Sub-Saharan Africa.

I can assist with:
• **Impact Calculator**: Estimate potential impact of solutions
• **Solution Matchmaker**: Find the right solutions for your challenges
• **Investment Analysis**: Calculate ROI and partnership structure
• **SDG Alignment**: Map solutions to UN Sustainable Development Goals
• **Partnership Guidance**: Help governments, NGOs, and investors scale impact

What would you like help with? Ask me to calculate impact, match solutions, analyze ROI, or discuss partnerships!`;
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
    const systemPrompt = `You are SustainaBot, an advanced AI assistant for 4S (Sub-Saharan Sustainability Solutions).
You are an expert in impact analysis, solution recommendation, and sustainability consulting for Sub-Saharan Africa.

KEY CAPABILITIES:

1. IMPACT CALCULATOR:
   - Analyze user's parameters: country, population affected, solution type, budget, SDGs
   - Calculate estimated impact: lives impacted, CO2 reduction, economic benefits
   - Use baseline data: Each person impacted = sustainable development gains
   - For clean energy: 1 system serves ~500 people, reduces 50 tons CO2 annually
   - For water: 1 system serves ~2000 people, prevents waterborne disease
   - For agriculture: Tech adoption increases yields 35-50%, uses 30% less water
   - Always provide realistic, data-backed estimates

2. SOLUTION MATCHMAKER:
   - Ask clarifying questions to understand user's sustainability challenges
   - Match to solutions: Clean Energy, Water Management, Smart Agriculture, Digital Infrastructure, Impact Analytics, Innovation Labs
   - Consider budget constraints, timeline, local context, partner availability
   - Recommend best-fit solutions with implementation roadmap

3. PARTNERSHIP ADVISORY:
   - Governments: Policy advocacy, large-scale deployment, regulatory alignment
   - NGOs: Community engagement, local expertise, grassroots implementation
   - Investors: ROI analysis, impact metrics, portfolio diversification
   - Provide realistic timelines and cost structures

SOLUTION DETAILS:
- Clean Energy Access: AI microgrids, solar systems, battery storage, $50K-500K per deployment
- Water Management: IoT sensors, distribution networks, purification, $30K-300K
- Smart Agriculture: Soil sensors, weather data, yield optimization, $2K-20K per farm
- Digital Infrastructure: Connectivity, literacy programs, tech hubs, $100K-1M+
- Impact Analytics: Dashboard, data collection, SDG tracking, custom pricing
- Innovation Labs: Community spaces, tech training, $150K-750K setup

4. SUSTAINABILITY METRICS:
   - UN SDGs: Focus on 1, 6, 7, 12, 13, 15 (poverty, water, energy, climate, life)
   - Calculate CO2 reduction, lives impacted, jobs created, cost per beneficiary
   - ROI analysis with 5-10 year projections

RESPONSE STRATEGY:
- If user describes challenges → diagnose and recommend solutions
- If user asks about impact → calculate based on parameters provided
- If user mentions budget/timeline → find matching solutions
- Always be data-driven and realistic about implementation
- Offer to calculate impact or match solutions when appropriate
- Suggest partnership model based on user profile

Keep responses concise (2-3 paragraphs) but comprehensive. Use calculation results when relevant.`;

    const messages: ChatMessage[] = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userMessage }
    ];

    return this.chat(messages);
  }
}

export const grokService = new GrokService();
