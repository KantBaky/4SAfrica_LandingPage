import OpenAI from "openai";

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
  private openai: OpenAI | null = null;

  private getOpenAIClient(): OpenAI {
    if (!this.openai) {
      const apiKey = import.meta.env.VITE_XAI_API_KEY;
      // const apiKey = process.env.XAI_API_KEY || process.env.VITE_XAI_API_KEY;
      if (!apiKey) {
        throw new Error('XAI_API_KEY environment variable is not set');
      }
      this.openai = new OpenAI({
        baseURL: "https://api.x.ai/v1",
        apiKey: apiKey
      });
    }
    return this.openai;
  }
  private getSystemPrompt(language: string = 'en'): string {
    if (language === 'fr') {
      return `Tu es SustainaBot, un assistant IA puissant alimenté par GrokAI. Tu représentes 4S (Solutions de Durabilité pour l'Afrique Subsaharienne). Réponds toujours en FRANÇAIS. 
Tu aides les utilisateurs à:
- Calculer l'impact des solutions de durabilité
- Trouver les meilleures solutions pour leurs défis
- Comprendre le ROI et les partenariats
- Explorer nos 8 solutions: Énergie Propre, Gestion de l'Eau, Agriculture Intelligente, Infrastructure Numérique, Analytique d'Impact, Laboratoires d'Innovation, Changement Climatique, Développement des Capacités
Sois professionnel, optimiste et axé sur l'impact.`;
    }
    if (language === 'pt') {
      return `Você é SustainaBot, um poderoso assistente de IA alimentado por GrokAI. Você representa 4S (Soluções de Sustentabilidade para a África Subsaariana). Sempre responda em PORTUGUÊS.
Você ajuda os usuários a:
- Calcular o impacto das soluções de sustentabilidade
- Encontrar as melhores soluções para seus desafios
- Entender ROI e parcerias
- Explorar nossas 8 soluções: Energia Limpa, Gestão de Água, Agricultura Inteligente, Infraestrutura Digital, Análise de Impacto, Laboratórios de Inovação, Mudança Climática, Desenvolvimento de Capacidades
Seja profissional, otimista e focado no impacto.`;
    }
    if (language === 'es') {
      return `Eres SustainaBot, un poderoso asistente de IA impulsado por GrokAI. Representas a 4S (Soluciones de Sostenibilidad para el África Subsahariana). Siempre responde en ESPAÑOL.
Ayudas a los usuarios a:
- Calcular el impacto de las soluciones de sostenibilidad
- Encontrar las mejores soluciones para sus desafíos
- Comprender ROI y asociaciones
- Explorar nuestras 8 soluciones: Energía Limpia, Gestión del Agua, Agricultura Inteligente, Infraestructura Digital, Análisis de Impacto, Laboratorios de Innovación, Cambio Climático, Desarrollo de Capacidades
Sé profesional, optimista y enfocado en el impacto.`;
    }
    return `You are SustainaBot, a powerful AI assistant powered by GrokAI. You represent 4S (Sub-Saharan Sustainability Solutions). Always respond in ENGLISH.
You help users:
- Calculate the impact of sustainability solutions
- Find the best solutions for their challenges
- Understand ROI and partnerships
- Explore our 8 solutions: Clean Energy, Water Management, Smart Agriculture, Digital Infrastructure, Impact Analytics, Innovation Labs, Climate Change, Capacity Development
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
      if (language === 'pt') {
        return `Adoraria ajudá-lo a encontrar as soluções perfeitas! Deixe-me fazer algumas perguntas:

• Quais desafios de sustentabilidade você enfrenta? (pobreza, falta de eletricidade, acesso à água, baixos rendimentos agrícolas, conectividade inadequada, etc.)
• Quem é você? (agência governamental, ONG, investidor, líder comunitário)
• Qual é seu prazo? (imediato, 1 ano, 3 anos, longo prazo)
• Faixa de orçamento aproximado?

Com base em suas respostas, posso recomendar a melhor mistura de nossas 8 soluções principais: Energia Limpa, Gestão de Água, Agricultura Inteligente, Infraestrutura Digital, Análise de Impacto, Laboratórios de Inovação, Mudança Climática ou Desenvolvimento de Capacidades.`;
      }
      if (language === 'es') {
        return `¡Me encantaría ayudarte a encontrar las soluciones perfectas! Déjame hacer algunas preguntas:

• ¿Qué desafíos de sostenibilidad enfrentas? (pobreza, falta de electricidad, acceso a agua, bajos rendimientos agrícolas, conectividad inadecuada, etc.)
• ¿Quién eres? (agencia gubernamental, ONG, inversor, líder comunitario)
• ¿Cuál es tu plazo? (inmediato, 1 año, 3 años, largo plazo)
• ¿Rango de presupuesto aproximado?

Con base en tus respuestas, puedo recomendar la mejor mezcla de nuestras 8 soluciones principales: Energía Limpia, Gestión del Agua, Agricultura Inteligente, Infraestructura Digital, Análisis de Impacto, Laboratorios de Innovación, Cambio Climático o Desarrollo de Capacidades.`;
      }
      if (language === 'fr') {
        return `J'aimerais vous aider à trouver les solutions parfaites! Laissez-moi poser quelques questions:

• Quels défis de durabilité affrontez-vous? (pauvreté, manque d'électricité, accès à l'eau, faibles rendements agricoles, connectivité insuffisante, etc.)
• Qui êtes-vous? (agence gouvernementale, ONG, investisseur, leader communautaire)
• Quel est votre délai? (immédiat, 1 an, 3 ans, long terme)
• Budget approximatif?

En fonction de vos réponses, je peux recommander le meilleur mélange de nos 8 solutions principales: Énergie Propre, Gestion de l'Eau, Agriculture Intelligente, Infrastructure Numérique, Analytique d'Impact, Laboratoires d'Innovation, Changement Climatique, ou Développement des Capacités.`;
      }
      return `I'd love to help you find the perfect solutions! Let me ask a few questions:

• What sustainability challenges are you facing? (poverty, lack of electricity, water access, low agricultural yields, poor connectivity, etc.)
• Who are you? (government agency, NGO, investor, community leader)
• What's your timeline? (immediate, 1 year, 3 years, long-term)
• Approximate budget range?

Based on your answers, I can recommend the best mix of our 8 core solutions: Clean Energy, Water Management, Smart Agriculture, Digital Infrastructure, Impact Analytics, Innovation Labs, Climate Change, or Capacity Development.`;
    }
    
    if (lowerMessage.includes('solution') || lowerMessage.includes('what do you offer')) {
      if (language === 'pt') {
        return `4S oferece oito soluções principais de sustentabilidade para a África Subsaariana:

1. **Acesso a Energia Limpa**: Microrredes solares alimentadas por IA ($50K-500K), servem ~500 pessoas/sistema
2. **Gestão de Água**: Distribuição IoT ($30K-300K), servem ~2000 pessoas/sistema
3. **Agricultura Inteligente**: Fazenda baseada em dados ($2K-20K), aumenta rendimentos 35-50%
4. **Infraestrutura Digital**: Conectividade e alfabetização ($100K-1M+), fecha lacuna digital
5. **Análise de Impacto**: Rastreamento de ODS em tempo real, preços customizados
6. **Laboratórios de Inovação**: Centros tecnológicos comunitários ($150K-750K), fomentam soluções locais
7. **Mudança Climática**: Estratégias de mitigação e adaptação, preparação e resposta comunitária
8. **Desenvolvimento de Capacidades**: Programas de treinamento e fortalecimento institucional

Peça-me para calcular impacto ou fazer correspondência de soluções com suas necessidades específicas!`;
      }
      if (language === 'es') {
        return `4S ofrece ocho soluciones principales de sostenibilidad para el África Subsahariana:

1. **Acceso a Energía Limpia**: Microrredes solares impulsadas por IA ($50K-500K), sirven ~500 personas/sistema
2. **Gestión del Agua**: Distribución IoT ($30K-300K), sirven ~2000 personas/sistema
3. **Agricultura Inteligente**: Agricultura basada en datos ($2K-20K), aumenta rendimientos 35-50%
4. **Infraestructura Digital**: Conectividad y alfabetización ($100K-1M+), cierra la brecha digital
5. **Análisis de Impacto**: Seguimiento de ODS en tiempo real, precios personalizados
6. **Laboratorios de Innovación**: Centros tecnológicos comunitarios ($150K-750K), fomentan soluciones locales
7. **Cambio Climático**: Estrategias de mitigación y adaptación, preparación y respuesta comunitaria
8. **Desarrollo de Capacidades**: Programas de capacitación y fortalecimiento institucional

¡Pídeme que calcule impacto o haga coincidir soluciones con tus necesidades específicas!`;
      }
      if (language === 'fr') {
        return `4S propose huit solutions de durabilité principales pour l'Afrique subsaharienne:

1. **Accès à l'Énergie Propre**: Microgrilles solaires alimentées par l'IA ($50K-500K), servent ~500 personnes/système
2. **Gestion de l'Eau**: Distribution IoT ($30K-300K), servent ~2000 personnes/système
3. **Agriculture Intelligente**: Exploitation agricole basée sur les données ($2K-20K), augmente rendements 35-50%
4. **Infrastructure Numérique**: Connectivité et littératie ($100K-1M+), comble fossé numérique
5. **Analytique d'Impact**: Suivi des ODD en temps réel, tarification personnalisée
6. **Laboratoires d'Innovation**: Centres technologiques communautaires ($150K-750K), favorisent solutions locales
7. **Changement Climatique**: Stratégies d'atténuation et d'adaptation, préparation et réponse communautaire
8. **Développement des Capacités**: Programmes de formation et renforcement institutionnel

Demandez-moi de calculer l'impact ou de faire correspondre les solutions à vos besoins spécifiques!`;
      }
      return `4S offers eight core sustainability solutions for Sub-Saharan Africa:

1. **Clean Energy Access**: AI solar microgrids ($50K-500K), serves ~500 people/system
2. **Water Management**: IoT distribution ($30K-300K), serves ~2000 people/system
3. **Smart Agriculture**: Data-driven farming ($2K-20K), increases yields 35-50%
4. **Digital Infrastructure**: Connectivity & literacy ($100K-1M+), bridges digital gap
5. **Impact Analytics**: Real-time SDG tracking, custom pricing
6. **Innovation Labs**: Community tech hubs ($150K-750K), fosters local solutions
7. **Climate Change**: Mitigation and adaptation strategies, community preparedness and response
8. **Capacity Development**: Training programs and institutional strengthening

Ask me to calculate impact or match solutions to your specific needs!`;
    }
    
    if (lowerMessage.includes('investment') || lowerMessage.includes('roi') || lowerMessage.includes('return')) {
      if (language === 'pt') {
        return `Ótimo interesse em investimento! Aqui está nossa estrutura de ROI típica:

**Projeções de 5-10 Anos:**
• Energia Limpa: TIR 15-25%, payback em 6-8 anos
• Agricultura Inteligente: TIR 25-35%, melhoria imediata de rendimentos
• Gestão de Água: TIR 12-18%, alto impacto social
• Infraestrutura Digital: TIR 10-20%, crescimento de longo prazo

**Retornos Focados em Impacto:**
• Vidas melhoradas: 500-10.000+ por solução
• CO₂ reduzido: 50-500 toneladas anualmente
• Empregos criados: 5-100+ por implantação
• Alinhamento de ODS: 3-6 objetivos por solução

Deixe-me calcular retornos específicos para seus parâmetros de investimento!`;
      }
      if (language === 'es') {
        return `¡Excelente interés en inversión! Aquí está nuestra estructura de ROI típica:

**Proyecciones de 5-10 Años:**
• Energía Limpia: TIR 15-25%, recuperación en 6-8 años
• Agricultura Inteligente: TIR 25-35%, mejora inmediata de rendimientos
• Gestión del Agua: TIR 12-18%, alto impacto social
• Infraestructura Digital: TIR 10-20%, crecimiento a largo plazo

**Retornos Enfocados en Impacto:**
• Vidas mejoradas: 500-10.000+ por solución
• CO₂ reducido: 50-500 toneladas anualmente
• Empleos creados: 5-100+ por despliegue
• Alineación de ODS: 3-6 objetivos por solución

¡Déjame calcular retornos específicos para tus parámetros de inversión!`;
      }
      if (language === 'fr') {
        return `Grand intérêt pour l'investissement! Voici notre structure de ROI typique:

**Projections 5-10 ans:**
• Énergie Propre: TRI 15-25%, remboursement en 6-8 ans
• Agriculture Intelligente: TRI 25-35%, amélioration immédiate des rendements
• Gestion de l'Eau: TRI 12-18%, impact social élevé
• Infrastructure Numérique: TRI 10-20%, croissance à long terme

**Rendements Axés sur l'Impact:**
• Vies améliorées: 500-10 000+ par solution
• CO₂ réduit: 50-500 tonnes annuellement
• Emplois créés: 5-100+ par déploiement
• Alignement ODD: 3-6 objectifs par solution

Laissez-moi calculer des retours spécifiques pour vos paramètres d'investissement!`;
      }
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
      if (language === 'pt') {
        return `Excelente! Vamos discutir sua parceria com 4S. Posso ajudar com:

• **Governos**: Implantação em larga escala, integração política, métricas de impacto
• **ONGs**: Implementação focada em comunidade, expertise local, expansão de base
• **Investidores**: Análise de ROI, diversificação de portfólio, retornos de impacto
• **Comunidades**: Implantação direta de soluções, treinamento técnico, construção de capacidade

Próximos passos:
• Preencha o formulário de contato na parte inferior desta página
• Envie-nos um email em info@weare4s.com
• Ligue para +254 782 999 666 / +60 13 870 4808

Qual tipo de parceria o interessa mais?`;
      }
      if (language === 'es') {
        return `¡Excelente! Discutamos tu asociación con 4S. Puedo ayudarte con:

• **Gobiernos**: Despliegue a gran escala, integración política, métricas de impacto
• **ONG**: Implementación centrada en la comunidad, expertise local, escalada local
• **Inversores**: Análisis de ROI, diversificación de portafolio, retornos de impacto
• **Comunidades**: Despliegue directo de soluciones, capacitación técnica, construcción de capacidades

Próximos pasos:
• Rellena el formulario de contacto en la parte inferior de esta página
• Envíanos un email a info@weare4s.com
• Llama a +254 782 999 666 / +60 13 870 4808

¿Qué tipo de asociación te interesa más?`;
      }
      if (language === 'fr') {
        return `Excellent! Discutons de votre partenariat avec 4S. Je peux vous aider avec:

• **Gouvernements**: Déploiement à grande échelle, intégration politique, mesures d'impact
• **ONG**: Implémentation communautaire, expertise locale, expansion locale
• **Investisseurs**: Analyse ROI, diversification de portefeuille, rendements d'impact
• **Communautés**: Déploiement direct de solutions, formation technologique, renforcement des capacités

Prochaines étapes:
• Remplissez le formulaire de contact au bas de cette page
• Contactez-nous à info@weare4s.com
• Appelez +254 782 999 666 / +60 13 870 4808

Quel type de partenariat vous intéresse le plus?`;
      }
      return `Excellent! Let's discuss your partnership with 4S. I can help with:

• **Governments**: Large-scale deployment, policy integration, impact metrics
• **NGOs**: Community-focused implementation, local expertise, grassroots scaling
• **Investors**: ROI analysis, portfolio diversification, impact returns
• **Communities**: Direct solution deployment, tech training, capacity building

Next steps:
• Fill out the contact form at the bottom of this page
• Email us at info@weare4s.com
• Call +254 782 999 666 / +60 13 870 4808

What type of partnership interests you most?`;
    }
    
    if (lowerMessage.includes('how') || lowerMessage.includes('work') || lowerMessage.includes('process')) {
      if (language === 'pt') {
        return `4S segue um processo de implementação em três etapas:

1. **Avaliar e Analisar**: IA analisa sua região - clima, infraestrutura, população, economia
2. **Projetar e Implementar**: Personalizamos soluções usando expertise local + tecnologia de ponta
3. **Monitorar e Escalar**: Rastreamento de dados em tempo real, otimização e expansão

Além disso, posso:
• Calcular impacto potencial para sua situação
• Fazer correspondência de soluções com seus desafios específicos
• Analisar estrutura de ROI e parcerias
• Orientá-lo sobre alinhamento de ODS

Qual aspecto você gostaria que eu ajudasse?`;
      }
      if (language === 'es') {
        return `4S sigue un proceso de implementación de tres pasos:

1. **Evaluar y Analizar**: IA analiza tu región - clima, infraestructura, población, economía
2. **Diseñar e Implementar**: Personalizamos soluciones utilizando expertise local + tecnología de vanguardia
3. **Monitorear y Escalar**: Seguimiento de datos en tiempo real, optimización y expansión

Además, puedo:
• Calcular impacto potencial para tu situación
• Hacer coincidir soluciones con tus desafíos específicos
• Analizar estructura de ROI y asociaciones
• Orientarte sobre alineación de ODS

¿Qué aspecto te gustaría que te ayudara?`;
      }
      if (language === 'fr') {
        return `4S suit un processus de mise en œuvre en trois étapes:

1. **Évaluer et Analyser**: L'IA analyse votre région - climat, infrastructure, population, économie
2. **Concevoir et Déployer**: Nous personnalisons les solutions en utilisant expertise locale + technologie de pointe
3. **Surveiller et Développer**: Suivi des données en temps réel, optimisation et expansion

De plus, je peux:
• Calculer l'impact potentiel pour votre situation
• Faire correspondre les solutions à vos défis spécifiques
• Analyser la structure de ROI et de partenariat
• Vous guider sur l'alignement des ODD

Quel aspect aimeriez-vous que je vous aide?`;
      }
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
    
    if (language === 'pt') {
      return `Obrigado! Sou SustainaBot, aqui para ajudar com as soluções de sustentabilidade alimentadas por IA da 4S para a África Subsaariana.

Posso ajudar com:
• **Calculadora de Impacto**: Estimar impacto potencial das soluções
• **Matchmaker de Soluções**: Encontrar as soluções certas para seus desafios
• **Análise de Investimento**: Calcular estrutura de ROI e parcerias
• **Alinhamento de ODS**: Mapear soluções para Objetivos de Desenvolvimento Sustentável das Nações Unidas
• **Orientação de Parcerias**: Ajudar governos, ONGs e investidores a escalar impacto

Com o que posso ajudá-lo? Peça-me para calcular impacto, fazer correspondência de soluções, analisar ROI ou discutir parcerias!`;
    }
    if (language === 'es') {
      return `¡Gracias! Soy SustainaBot, aquí para ayudarte con las soluciones de sostenibilidad impulsadas por IA de 4S para el África Subsahariana.

Puedo ayudarte con:
• **Calculadora de Impacto**: Estimar impacto potencial de las soluciones
• **Matchmaker de Soluciones**: Encontrar las soluciones correctas para tus desafíos
• **Análisis de Inversión**: Calcular estructura de ROI y asociaciones
• **Alineación de ODS**: Mapear soluciones a Objetivos de Desarrollo Sostenible de las Naciones Unidas
• **Orientación de Asociaciones**: Ayudar a gobiernos, ONG e inversores a escalar impacto

¿Con qué puedo ayudarte? ¡Pídeme que calcule impacto, haga coincidir soluciones, analice ROI o discuta asociaciones!`;
    }
    if (language === 'fr') {
      return `Merci! Je suis SustainaBot, ici pour vous aider avec les solutions de durabilité alimentées par l'IA de 4S pour l'Afrique subsaharienne.

Je peux vous aider avec:
• **Calculatrice d'Impact**: Estimer l'impact potentiel des solutions
• **Matchmaker de Solutions**: Trouver les bonnes solutions pour vos défis
• **Analyse d'Investissement**: Calculer la structure de ROI et de partenariat
• **Alignement ODD**: Mapper les solutions aux Objectifs de Développement Durable des Nations unies
• **Orientation de Partenariat**: Aider les gouvernements, ONG et investisseurs à développer l'impact

Comment puis-je vous aider? Demandez-moi de calculer l'impact, faire correspondre les solutions, analyser le ROI ou discuter des partenariats!`;
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

  async chat(messages: ChatMessage[], language: string = 'en'): Promise<string> {
    try {
      const client = this.getOpenAIClient();
      const response = await client.chat.completions.create({
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
      
      // Use fallback if API is unavailable (missing key, credits issue, network error, etc.)
      const lastUserMessage = messages.filter(m => m.role === 'user').pop();
      if (lastUserMessage) {
        console.log("Using fallback response due to API error");
        return await this.getFallbackResponse(lastUserMessage.content, language);
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

    const response = await this.chat(messages, language);
    
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
