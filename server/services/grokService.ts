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

export interface ResultData {
  type: 'impact' | 'investment' | 'recommendation' | 'text';
  title: string;
  data: Record<string, string | number | Record<string, string | number>>;
  narrative: string;
}

export class GrokService {
  private getSystemPrompt(language: string = 'en'): string {
    if (language === 'fr') {
      return `Tu es SustainaBot, un assistant IA puissant alimenté par GrokAI. Tu représentes 4S (Solutions de Durabilité pour l'Afrique Subsaharienne). Réponds toujours en FRANÇAIS. 
Tu aides les utilisateurs à:
- Calculer l'impact des solutions de durabilité
- Trouver les meilleures solutions pour leurs défis
- Comprendre le ROI et les partenariats
- Explorer nos 6 solutions: Énergie Propre, Gestion de l'Eau, Agriculture Intelligente, Infrastructure Numérique, Analytique d'Impact, Laboratoires d'Innovation
Sois professionnel, optimiste et axé sur l'impact.`;
    }
    if (language === 'pt') {
      return `Você é SustainaBot, um poderoso assistente de IA alimentado por GrokAI. Você representa 4S (Soluções de Sustentabilidade para a África Subsaariana). Sempre responda em PORTUGUÊS.
Você ajuda os usuários a:
- Calcular o impacto das soluções de sustentabilidade
- Encontrar as melhores soluções para seus desafios
- Entender ROI e parcerias
- Explorar nossas 6 soluções: Energia Limpa, Gestão de Água, Agricultura Inteligente, Infraestrutura Digital, Análise de Impacto, Laboratórios de Inovação
Seja profissional, otimista e focado no impacto.`;
    }
    if (language === 'es') {
      return `Eres SustainaBot, un poderoso asistente de IA impulsado por GrokAI. Representas a 4S (Soluciones de Sostenibilidad para el África Subsahariana). Siempre responde en ESPAÑOL.
Ayudas a los usuarios a:
- Calcular el impacto de las soluciones de sostenibilidad
- Encontrar las mejores soluciones para sus desafíos
- Comprender ROI y asociaciones
- Explorar nuestras 6 soluciones: Energía Limpia, Gestión del Agua, Agricultura Inteligente, Infraestructura Digital, Análisis de Impacto, Laboratorios de Innovación
Sé profesional, optimista y enfocado en el impacto.`;
    }
    return `You are SustainaBot, a powerful AI assistant powered by GrokAI. You represent 4S (Sub-Saharan Sustainability Solutions). Always respond in ENGLISH.
You help users:
- Calculate the impact of sustainability solutions
- Find the best solutions for their challenges
- Understand ROI and partnerships
- Explore our 6 solutions: Clean Energy, Water Management, Smart Agriculture, Digital Infrastructure, Impact Analytics, Innovation Labs
Be professional, optimistic, and impact-focused.`;
  }

  private async getFallbackResponse(userMessage: string, language: string = 'en'): Promise<string> {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('calculat') || lowerMessage.includes('impact')) {
      if (language === 'pt') {
        return `Posso ajudá-lo a calcular o impacto potencial das soluções 4S! Para fornecer estimativas precisas, gostaria de saber:

• Qual é o principal desafio que você está abordando? (energia, água, agricultura, etc.)
• Quantas pessoas seriam afetadas?
• Qual é seu orçamento estimado?
• Quais ODS das Nações Unidas são prioridades para você?
• Qual país ou região?

Por exemplo, uma microrrede de energia limpa em uma área rural pode impactar 500+ pessoas, reduzir ~50 toneladas de CO₂ anualmente e criar 5-10 empregos. Conte-me mais sobre seu contexto!`;
      }
      if (language === 'es') {
        return `¡Puedo ayudarte a calcular el impacto potencial de las soluciones 4S! Para darte estimaciones precisas, me gustaría saber:

• ¿Cuál es el desafío principal que estás abordando? (energía, agua, agricultura, etc.)
• ¿Cuántas personas se verían afectadas?
• ¿Cuál es tu presupuesto estimado?
• ¿Cuáles son tus ODS prioritarios de las Naciones Unidas?
• ¿Qué país o región?

Por ejemplo, una microrred de energía limpia en una zona rural puede impactar a 500+ personas, reducir ~50 toneladas de CO₂ anualmente y crear 5-10 empleos. ¡Cuéntame más sobre tu contexto!`;
      }
      if (language === 'fr') {
        return `Je peux vous aider à calculer l'impact potentiel des solutions 4S! Pour vous donner des estimations précises, j'aimerais savoir:

• Quel est le défi principal que vous adressez? (énergie, eau, agriculture, etc.)
• Combien de personnes seraient affectées?
• Quel est votre budget estimé?
• Quels ODD des Nations unies sont prioritaires pour vous?
• Quel pays ou région?

Par exemple, un microgrid d'énergie propre en zone rurale peut impacter 500+ personnes, réduire ~50 tonnes de CO₂ annuellement, et créer 5-10 emplois. Parlez-moi plus de votre contexte!`;
      }
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

  async chatWithContext(userMessage: string, language: string = 'en'): Promise<string | ResultData> {
    const systemPrompt = this.getSystemPrompt(language) + `

CRITICAL: When user asks for calculations or analysis, respond with JSON data structured like:
{"type":"impact","title":"Impact Analysis","data":{"lives_impacted":"5000","co2_reduced":"250 tons","jobs_created":"45"},"narrative":"Analysis details..."}

KEY CAPABILITIES:
1. IMPACT CALCULATOR: Analyze parameters and calculate estimated impact
2. SOLUTION MATCHMAKER: Return recommendations as structured data
3. INVESTMENT ANALYSIS: Return ROI data with metrics

SOLUTION BASELINES:
- Clean Energy: 1 system = 500 people, $50K-500K, 50 tons CO₂/year
- Water: 1 system = 2000 people, $30K-300K
- Agriculture: 1 farm = 5-10 families, yields +35-50%, water -30%
- Digital Infrastructure: $100K-1M+, affects 1000+ people
- Impact Analytics: Custom, $50K-200K
- Innovation Labs: $150K-750K, trains 500+ people`;

    const messages: ChatMessage[] = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userMessage }
    ];

    const response = await this.chat(messages);
    
    // Try to parse as JSON if it looks like structured data
    if (response.startsWith('{')) {
      try {
        const parsed = JSON.parse(response);
        if (parsed.type && parsed.data) {
          return parsed;
        }
      } catch (e) {
        // Not valid JSON, return as text
      }
    }
    
    return response;
  }
}

export const grokService = new GrokService();
