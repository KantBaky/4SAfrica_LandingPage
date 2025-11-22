import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'fr' | 'pt' | 'es';

export const translations = {
  en: {
    nav: {
      home: 'Home',
      solutions: 'Solutions',
      impact: 'Impact',
      howItWorks: 'How It Works',
      testimonials: 'Testimonials',
      contact: 'Contact',
    },
    hero: {
      title: 'AI-Powered Sustainability for Africa',
      subtitle: 'Transforming challenges into opportunities through intelligent technology, empowering communities across Sub-Saharan Africa to achieve sustainable development goals.',
      getStarted: 'Get Started',
      learnMore: 'Learn More',
      discoverMore: 'Discover More',
    },
    mission: {
      title: 'Our Mission',
      description: 'At 4S, we believe technology should serve humanity and nature. By combining artificial intelligence with deep local expertise, we create sustainable solutions that address real challenges in Sub-Saharan Africa.',
      empowering: 'Empowering Africa\'s future through sustainable innovation',
      about: '4S (Sub-Saharan Sustainability Solutions) is dedicated to accelerating sustainable development across Africa through cutting-edge AI and technology solutions.',
      partner: 'We partner with communities, governments, and organizations to address critical challenges in energy access, water management, agriculture, and climate action.',
      building: 'Together, we\'re building a greener, more prosperous Africa for generations to come.',
      discoverMore: 'Discover More',
    },
    solutions: {
      title: 'Our Solutions',
      subtitle: 'Six core areas of impact',
      comprehensive: 'Comprehensive technology-driven approaches to Africa\'s sustainability challenges',
      cleanEnergy: 'Clean Energy Access',
      cleanEnergyDesc: 'AI-optimized microgrids bringing reliable solar power to rural communities across Sub-Saharan Africa.',
      waterManagement: 'Water Management',
      waterManagementDesc: 'IoT-powered systems ensuring clean water distribution and quality monitoring for sustainable communities.',
      smartAgriculture: 'Smart Agriculture',
      smartAgricultureDesc: 'Data-driven farming solutions helping smallholders maximize yields while preserving soil health.',
      digitalInfra: 'Digital Infrastructure',
      digitalInfraDesc: 'Building connectivity and digital literacy to bridge the technology gap in underserved regions.',
      impactAnalytics: 'Impact Analytics',
      impactAnalyticsDesc: 'Real-time tracking and reporting of sustainability metrics aligned with UN SDGs.',
      innovationLabs: 'Innovation Labs',
      innovationLabsDesc: 'Collaborative spaces fostering local innovation and tech-driven solutions to regional challenges.',
    },
    stats: {
      livesImpacted: 'Lives Impacted',
      activeCountries: 'Active Countries',
      solutionsDeployed: 'Solutions Deployed',
      co2Reduced: 'Tons CO₂ Reduced',
    },
    impact: {
      title: 'Your Impact Results',
      subtitle: 'Track and manage your sustainability calculations from SustainaBot',
      ourImpact: 'Our Impact',
      realResults: 'Real results, measurable change across Sub-Saharan Africa',
    },
    howItWorks: {
      title: 'How It Works',
      subtitle: 'Our proven three-step approach to delivering sustainable impact',
      assess: 'Assess & Analyze',
      assessDesc: 'We use AI to identify sustainability challenges and opportunities specific to your region, considering local context, infrastructure, and community needs.',
      design: 'Design & Deploy',
      designDesc: 'Our team implements tailored solutions combining cutting-edge technology with local expertise, ensuring sustainable impact from day one.',
      monitor: 'Monitor & Scale',
      monitorDesc: 'Continuous data collection and analysis enable us to optimize performance, demonstrate impact, and expand successful solutions to new communities.',
      step01: 'Assess & Analyze',
      step02: 'Design & Deploy',
      step03: 'Monitor & Scale',
    },
    testimonials: {
      title: 'What People Say',
      subtitle: 'Voices from communities we\'ve empowered',
      quote1: '4S transformed our village with clean energy. We now have reliable power for schools and health clinics, changing lives every day.',
      name1: 'Amara Okafor',
      title1: 'Community Leader, Nigeria',
      quote2: 'The smart agriculture platform increased our yields by 40% while using less water. It\'s exactly what smallholder farmers need.',
      name2: 'Kofi Mensah',
      title2: 'Agricultural Cooperative Director, Ghana',
    },
    contact: {
      title: 'Ready to Make an Impact?',
      subtitle: 'Join 500+ organizations partnering with us to build a sustainable future for Africa',
      namePlaceholder: 'Your name (optional)',
      emailPlaceholder: 'Your email',
      messagePlaceholder: 'Tell us about your sustainability goals or partnership interests...',
      submit: 'Send Message',
      sending: 'Sending...',
      success: 'Thank you! We\'ll be in touch soon.',
      error: 'Error sending message. Please try again.',
    },
    chatbot: {
      title: 'SustainaBot',
      greeting: 'Hi! I\'m SustainaBot, powered by GrokAI. How can I help you learn about 4S\'s sustainability solutions for Sub-Saharan Africa?',
      placeholder: 'Ask about our solutions...',
      error: 'I apologize, but I\'m having trouble connecting right now. Please try again in a moment.',
    },
    cookies: {
      title: 'We Value Your Privacy',
      message: 'We\'d like to collect information to stay in touch about 4S updates and opportunities. Your privacy is important to us.',
      namePlaceholder: 'Your name',
      emailPlaceholder: 'Your email address',
      accept: 'Accept & Continue',
      decline: 'Decline',
      successMessage: 'Thank you! We\'ve saved your information.',
    },
    language: 'Language',
    footer: {
      copyright: '© 2025 4S - Sub-Saharan Sustainability Solutions. All rights reserved.',
    },
  },
  fr: {
    nav: {
      home: 'Accueil',
      solutions: 'Solutions',
      impact: 'Impact',
      howItWorks: 'Comment ça marche',
      testimonials: 'Témoignages',
      contact: 'Contact',
    },
    hero: {
      title: 'Durabilité alimentée par l\'IA pour l\'Afrique',
      subtitle: 'Transformer les défis en opportunités grâce à la technologie intelligente, en habilitant les communautés d\'Afrique subsaharienne à atteindre les objectifs de développement durable.',
      getStarted: 'Commencer',
      learnMore: 'En savoir plus',
      discoverMore: 'Découvrez plus',
    },
    mission: {
      title: 'Notre Mission',
      description: 'Chez 4S, nous croyons que la technologie doit servir l\'humanité et la nature. En combinant l\'intelligence artificielle avec une expertise locale approfondie, nous créons des solutions durables qui répondent aux vrais défis d\'Afrique subsaharienne.',
      empowering: 'Autonomiser l\'avenir de l\'Afrique par l\'innovation durable',
      about: '4S (Solutions de Durabilité pour l\'Afrique Subsaharienne) est dédié à l\'accélération du développement durable en Afrique par des solutions technologiques de pointe et l\'IA.',
      partner: 'Nous partenons avec des communautés, des gouvernements et des organisations pour aborder les défis critiques d\'accès à l\'énergie, gestion de l\'eau, agriculture et action climatique.',
      building: 'Ensemble, nous construisons une Afrique plus verte et prospère pour les générations à venir.',
      discoverMore: 'Découvrez Plus',
    },
    solutions: {
      title: 'Nos Solutions',
      subtitle: 'Six domaines d\'impact clés',
      comprehensive: 'Approches technologiques complètes pour les défis de durabilité de l\'Afrique',
      cleanEnergy: 'Accès à l\'Énergie Propre',
      cleanEnergyDesc: 'Microgrilles optimisées par l\'IA apportant une énergie solaire fiable aux communautés rurales d\'Afrique subsaharienne.',
      waterManagement: 'Gestion de l\'Eau',
      waterManagementDesc: 'Systèmes alimentés par l\'IoT assurant la distribution d\'eau propre et le contrôle de la qualité pour les communautés durables.',
      smartAgriculture: 'Agriculture Intelligente',
      smartAgricultureDesc: 'Solutions agricoles basées sur les données aidant les petits exploitants à maximiser les rendements tout en préservant la santé des sols.',
      digitalInfra: 'Infrastructure Numérique',
      digitalInfraDesc: 'Construire la connectivité et la littératie numérique pour combler le fossé technologique dans les régions mal desservies.',
      impactAnalytics: 'Analytique d\'Impact',
      impactAnalyticsDesc: 'Suivi et rapport en temps réel des mesures de durabilité alignées avec les ODD des Nations unies.',
      innovationLabs: 'Laboratoires d\'Innovation',
      innovationLabsDesc: 'Espaces collaboratifs favorisant l\'innovation locale et les solutions axées sur la technologie pour les défis régionaux.',
    },
    impact: {
      title: 'Vos Résultats d\'Impact',
      subtitle: 'Suivez et gérez vos calculs de durabilité de SustainaBot',
      ourImpact: 'Notre Impact',
      realResults: 'Résultats réels, changement mesurable en Afrique subsaharienne',
    },
    howItWorks: {
      title: 'Comment ça marche',
      subtitle: 'Notre approche à trois étapes éprouvée pour l\'impact durable',
      assess: 'Évaluer et Analyser',
      assessDesc: 'Nous utilisons l\'IA pour identifier les défis et opportunités de durabilité spécifiques à votre région, en tenant compte du contexte local, de l\'infrastructure et des besoins communautaires.',
      design: 'Concevoir et Déployer',
      designDesc: 'Notre équipe implémente des solutions sur mesure combinant la technologie de pointe avec l\'expertise locale, assurant un impact durable dès le départ.',
      monitor: 'Surveiller et Développer',
      monitorDesc: 'La collecte et l\'analyse continues des données nous permettent d\'optimiser les performances, de démontrer l\'impact et d\'étendre les solutions réussies à de nouvelles communautés.',
      step01: 'Évaluer et Analyser',
      step02: 'Concevoir et Déployer',
      step03: 'Surveiller et Développer',
    },
    stats: {
      livesImpacted: 'Vies Impactées',
      activeCountries: 'Pays Actifs',
      solutionsDeployed: 'Solutions Déployées',
      co2Reduced: 'Tonnes CO₂ Réduites',
    },
    testimonials: {
      title: 'Ce que les gens disent',
      subtitle: 'Voix des communautés que nous avons habilitées',
      quote1: '4S a transformé notre village avec l\'énergie propre. Nous avons maintenant une alimentation électrique fiable pour les écoles et les cliniques de santé, changeant des vies chaque jour.',
      name1: 'Amara Okafor',
      title1: 'Leader Communautaire, Nigeria',
      quote2: 'La plateforme d\'agriculture intelligente a augmenté nos rendements de 40% tout en utilisant moins d\'eau. C\'est exactement ce dont les petits agriculteurs ont besoin.',
      name2: 'Kofi Mensah',
      title2: 'Directeur de Coopérative Agricole, Ghana',
    },
    contact: {
      title: 'Prêt à faire une différence?',
      subtitle: 'Rejoignez 500+ organisations partenaires pour construire un avenir durable pour l\'Afrique',
      namePlaceholder: 'Votre nom (optionnel)',
      emailPlaceholder: 'Votre email',
      messagePlaceholder: 'Parlez-nous de vos objectifs de durabilité ou d\'intérêts de partenariat...',
      submit: 'Envoyer le message',
      sending: 'Envoi en cours...',
      success: 'Merci! Nous vous recontacterons bientôt.',
      error: 'Erreur lors de l\'envoi. Veuillez réessayer.',
    },
    chatbot: {
      title: 'SustainaBot',
      greeting: 'Bonjour! Je suis SustainaBot, alimenté par GrokAI. Comment puis-je vous aider à en savoir plus sur les solutions de durabilité de 4S pour l\'Afrique subsaharienne?',
      placeholder: 'Posez des questions sur nos solutions...',
      error: 'Je m\'excuse, mais j\'ai du mal à me connecter en ce moment. Veuillez réessayer dans un instant.',
    },
    cookies: {
      title: 'Nous Valorisons Votre Confidentialité',
      message: 'Nous aimerions collecter des informations pour rester en contact au sujet des mises à jour et opportunités de 4S. Votre confidentialité est importante pour nous.',
      namePlaceholder: 'Votre nom',
      emailPlaceholder: 'Votre adresse email',
      accept: 'Accepter et Continuer',
      decline: 'Refuser',
      successMessage: 'Merci! Nous avons sauvegardé vos informations.',
    },
    language: 'Langue',
    footer: {
      copyright: '© 2025 4S - Solutions de Durabilité pour l\'Afrique Subsaharienne. Tous droits réservés.',
    },
  },
  pt: {
    nav: {
      home: 'Início',
      solutions: 'Soluções',
      impact: 'Impacto',
      howItWorks: 'Como Funciona',
      testimonials: 'Depoimentos',
      contact: 'Contato',
    },
    hero: {
      title: 'Sustentabilidade Alimentada por IA para a África',
      subtitle: 'Transformando desafios em oportunidades através de tecnologia inteligente, capacitando comunidades na África Subsaariana a alcançar objetivos de desenvolvimento sustentável.',
      getStarted: 'Começar',
      learnMore: 'Saiba Mais',
      discoverMore: 'Descubra Mais',
    },
    mission: {
      title: 'Nossa Missão',
      description: 'Na 4S, acreditamos que a tecnologia deve servir a humanidade e a natureza. Ao combinar inteligência artificial com expertise local profunda, criamos soluções sustentáveis que abordam desafios reais na África Subsaariana.',
      empowering: 'Capacitando o futuro da África através de inovação sustentável',
      about: '4S (Soluções de Sustentabilidade para a África Subsaariana) é dedicada a acelerar o desenvolvimento sustentável na África através de soluções tecnológicas de ponta e IA.',
      partner: 'Nos parcerizamos com comunidades, governos e organizações para abordar desafios críticos em acesso a energia, gestão de água, agricultura e ação climática.',
      building: 'Juntos, estamos construindo uma África mais verde e próspera para as gerações futuras.',
      discoverMore: 'Descubra Mais',
    },
    solutions: {
      title: 'Nossas Soluções',
      subtitle: 'Seis áreas principais de impacto',
      comprehensive: 'Abordagens impulsionadas por tecnologia para os desafios de sustentabilidade da África',
      cleanEnergy: 'Acesso a Energia Limpa',
      cleanEnergyDesc: 'Microgrids otimizadas por IA trazendo energia solar confiável para comunidades rurais na África Subsaariana.',
      waterManagement: 'Gestão de Água',
      waterManagementDesc: 'Sistemas alimentados por IoT garantindo distribuição de água limpa e monitoramento de qualidade para comunidades sustentáveis.',
      smartAgriculture: 'Agricultura Inteligente',
      smartAgricultureDesc: 'Soluções agrícolas baseadas em dados ajudando pequenos produtores a maximizar rendimentos enquanto preservam a saúde do solo.',
      digitalInfra: 'Infraestrutura Digital',
      digitalInfraDesc: 'Construindo conectividade e alfabetização digital para fechar a lacuna tecnológica em regiões mal atendidas.',
      impactAnalytics: 'Análise de Impacto',
      impactAnalyticsDesc: 'Rastreamento e relatório em tempo real de métricas de sustentabilidade alinhadas com os ODS das Nações Unidas.',
      innovationLabs: 'Laboratórios de Inovação',
      innovationLabsDesc: 'Espaços colaborativos promovendo inovação local e soluções orientadas pela tecnologia para desafios regionais.',
    },
    stats: {
      livesImpacted: 'Vidas Impactadas',
      activeCountries: 'Países Ativos',
      solutionsDeployed: 'Soluções Implementadas',
      co2Reduced: 'Toneladas de CO₂ Reduzidas',
    },
    impact: {
      title: 'Seus Resultados de Impacto',
      subtitle: 'Rastreie e gerencie seus cálculos de sustentabilidade do SustainaBot',
      ourImpact: 'Nosso Impacto',
      realResults: 'Resultados reais, mudança mensurável na África Subsaariana',
    },
    howItWorks: {
      title: 'Como Funciona',
      subtitle: 'Nossa abordagem comprovada de três etapas para impacto sustentável',
      assess: 'Avaliar e Analisar',
      assessDesc: 'Usamos IA para identificar desafios e oportunidades de sustentabilidade específicos da sua região, considerando contexto local, infraestrutura e necessidades comunitárias.',
      design: 'Projetar e Implementar',
      designDesc: 'Nossa equipe implementa soluções personalizadas combinando tecnologia de ponta com expertise local, garantindo impacto sustentável desde o primeiro dia.',
      monitor: 'Monitorar e Escalar',
      monitorDesc: 'Coleta e análise contínua de dados nos permitem otimizar desempenho, demonstrar impacto e expandir soluções bem-sucedidas para novas comunidades.',
      step01: 'Avaliar e Analisar',
      step02: 'Projetar e Implementar',
      step03: 'Monitorar e Escalar',
    },
    testimonials: {
      title: 'O Que as Pessoas Dizem',
      subtitle: 'Vozes das comunidades que capacitamos',
      quote1: 'A 4S transformou nossa aldeia com energia limpa. Agora temos energia confiável para escolas e clínicas de saúde, mudando vidas todos os dias.',
      name1: 'Amara Okafor',
      title1: 'Líder Comunitário, Nigéria',
      quote2: 'A plataforma de agricultura inteligente aumentou nossos rendimentos em 40% enquanto usa menos água. É exatamente o que os pequenos agricultores precisam.',
      name2: 'Kofi Mensah',
      title2: 'Diretor de Cooperativa Agrícola, Gana',
    },
    contact: {
      title: 'Pronto para Fazer um Impacto?',
      subtitle: 'Junte-se a 500+ organizações parceiras para construir um futuro sustentável para a África',
      namePlaceholder: 'Seu nome (opcional)',
      emailPlaceholder: 'Seu email',
      messagePlaceholder: 'Conte-nos sobre seus objetivos de sustentabilidade ou interesses de parcerias...',
      submit: 'Enviar Mensagem',
      sending: 'Enviando...',
      success: 'Obrigado! Entraremos em contato em breve.',
      error: 'Erro ao enviar. Por favor, tente novamente.',
    },
    chatbot: {
      title: 'SustainaBot',
      greeting: 'Olá! Sou SustainaBot, alimentado por GrokAI. Como posso ajudá-lo a aprender sobre as soluções de sustentabilidade da 4S para a África Subsaariana?',
      placeholder: 'Pergunte sobre nossas soluções...',
      error: 'Peço desculpas, mas estou tendo dificuldades para conectar agora. Por favor, tente novamente em um momento.',
    },
    cookies: {
      title: 'Valorizamos Sua Privacidade',
      message: 'Gostaríamos de coletar informações para manter contato sobre atualizações e oportunidades da 4S. Sua privacidade é importante para nós.',
      namePlaceholder: 'Seu nome',
      emailPlaceholder: 'Seu endereço de email',
      accept: 'Aceitar e Continuar',
      decline: 'Recusar',
      successMessage: 'Obrigado! Salvamos suas informações.',
    },
    language: 'Idioma',
    footer: {
      copyright: '© 2025 4S - Soluções de Sustentabilidade para a África Subsaariana. Todos os direitos reservados.',
    },
  },
  es: {
    nav: {
      home: 'Inicio',
      solutions: 'Soluciones',
      impact: 'Impacto',
      howItWorks: 'Cómo Funciona',
      testimonials: 'Testimonios',
      contact: 'Contacto',
    },
    hero: {
      title: 'Sostenibilidad Impulsada por IA para África',
      subtitle: 'Transformando desafíos en oportunidades a través de tecnología inteligente, empoderando comunidades en el África Subsahariana para lograr objetivos de desarrollo sostenible.',
      getStarted: 'Comenzar',
      learnMore: 'Más Información',
      discoverMore: 'Descubre Más',
    },
    mission: {
      title: 'Nuestra Misión',
      description: 'En 4S, creemos que la tecnología debe servir a la humanidad y a la naturaleza. Al combinar inteligencia artificial con expertise local profunda, creamos soluciones sostenibles que abordan desafíos reales en el África Subsahariana.',
      empowering: 'Empoderando el futuro de África a través de la innovación sostenible',
      about: '4S (Soluciones de Sostenibilidad para el África Subsahariana) está dedicada a acelerar el desarrollo sostenible en África a través de soluciones tecnológicas de vanguardia e IA.',
      partner: 'Nos asociamos con comunidades, gobiernos y organizaciones para abordar desafíos críticos en acceso a energía, gestión del agua, agricultura y acción climática.',
      building: 'Juntos, estamos construyendo un África más verde y próspero para las generaciones futuras.',
      discoverMore: 'Descubre Más',
    },
    solutions: {
      title: 'Nuestras Soluciones',
      subtitle: 'Seis áreas principales de impacto',
      comprehensive: 'Enfoques impulsados por tecnología para los desafíos de sostenibilidad de África',
      cleanEnergy: 'Acceso a Energía Limpia',
      cleanEnergyDesc: 'Microrredes optimizadas por IA que traen energía solar confiable a las comunidades rurales del África Subsahariana.',
      waterManagement: 'Gestión del Agua',
      waterManagementDesc: 'Sistemas impulsados por IoT que garantizan distribución de agua limpia y monitoreo de calidad para comunidades sostenibles.',
      smartAgriculture: 'Agricultura Inteligente',
      smartAgricultureDesc: 'Soluciones agrícolas basadas en datos que ayudan a los pequeños productores a maximizar rendimientos mientras preservan la salud del suelo.',
      digitalInfra: 'Infraestructura Digital',
      digitalInfraDesc: 'Construyendo conectividad y alfabetización digital para cerrar la brecha tecnológica en regiones desatendidas.',
      impactAnalytics: 'Análisis de Impacto',
      impactAnalyticsDesc: 'Seguimiento e informe en tiempo real de métricas de sostenibilidad alineadas con los ODS de las Naciones Unidas.',
      innovationLabs: 'Laboratorios de Innovación',
      innovationLabsDesc: 'Espacios colaborativos que fomentan la innovación local y las soluciones orientadas por tecnología para desafíos regionales.',
    },
    stats: {
      livesImpacted: 'Vidas Impactadas',
      activeCountries: 'Países Activos',
      solutionsDeployed: 'Soluciones Implementadas',
      co2Reduced: 'Toneladas de CO₂ Reducidas',
    },
    impact: {
      title: 'Tus Resultados de Impacto',
      subtitle: 'Rastrear y gestionar tus cálculos de sostenibilidad de SustainaBot',
      ourImpact: 'Nuestro Impacto',
      realResults: 'Resultados reales, cambio medible en el África Subsahariana',
    },
    howItWorks: {
      title: 'Cómo Funciona',
      subtitle: 'Nuestro enfoque probado de tres pasos para impacto sostenible',
      assess: 'Evaluar y Analizar',
      assessDesc: 'Usamos IA para identificar desafíos y oportunidades de sostenibilidad específicos de tu región, considerando el contexto local, la infraestructura y las necesidades comunitarias.',
      design: 'Diseñar e Implementar',
      designDesc: 'Nuestro equipo implementa soluciones personalizadas que combinan tecnología de vanguardia con expertise local, garantizando impacto sostenible desde el primer día.',
      monitor: 'Monitorear y Escalar',
      monitorDesc: 'La recopilación y análisis continuo de datos nos permite optimizar el rendimiento, demostrar impacto y expandir soluciones exitosas a nuevas comunidades.',
      step01: 'Evaluar y Analizar',
      step02: 'Diseñar e Implementar',
      step03: 'Monitorear y Escalar',
    },
    testimonials: {
      title: 'Lo Que la Gente Dice',
      subtitle: 'Voces de comunidades que empoderamos',
      quote1: '4S transformó nuestro pueblo con energía limpia. Ahora tenemos energía confiable para escuelas y clínicas de salud, cambiando vidas cada día.',
      name1: 'Amara Okafor',
      title1: 'Líder Comunitario, Nigeria',
      quote2: 'La plataforma de agricultura inteligente aumentó nuestros rendimientos un 40% mientras usamos menos agua. Es exactamente lo que los pequeños agricultores necesitan.',
      name2: 'Kofi Mensah',
      title2: 'Director de Cooperativa Agrícola, Ghana',
    },
    contact: {
      title: '¿Listo para Crear Impacto?',
      subtitle: 'Únete a 500+ organizaciones asociadas para construir un futuro sostenible para África',
      namePlaceholder: 'Tu nombre (opcional)',
      emailPlaceholder: 'Tu email',
      messagePlaceholder: 'Cuéntanos sobre tus objetivos de sostenibilidad o intereses de asociación...',
      submit: 'Enviar Mensaje',
      sending: 'Enviando...',
      success: '¡Gracias! Nos pondremos en contacto pronto.',
      error: 'Error al enviar. Por favor, inténtalo de nuevo.',
    },
    chatbot: {
      title: 'SustainaBot',
      greeting: '¡Hola! Soy SustainaBot, impulsado por GrokAI. ¿Cómo puedo ayudarte a aprender sobre las soluciones de sostenibilidad de 4S para el África Subsahariana?',
      placeholder: 'Pregunta sobre nuestras soluciones...',
      error: 'Disculpa, estoy teniendo dificultades para conectar ahora. Por favor, inténtalo de nuevo en un momento.',
    },
    cookies: {
      title: 'Valoramos Tu Privacidad',
      message: 'Nos gustaría recopilar información para mantenernos en contacto sobre actualizaciones y oportunidades de 4S. Tu privacidad es importante para nosotros.',
      namePlaceholder: 'Tu nombre',
      emailPlaceholder: 'Tu dirección de correo electrónico',
      accept: 'Aceptar y Continuar',
      decline: 'Rechazar',
      successMessage: '¡Gracias! Hemos guardado tu información.',
    },
    language: 'Idioma',
    footer: {
      copyright: '© 2025 4S - Soluciones de Sostenibilidad para el África Subsahariana. Todos los derechos reservados.',
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'en';
    
    // Check localStorage first for user preference
    const saved = localStorage.getItem('language');
    if (saved && ['en', 'fr', 'pt', 'es'].includes(saved)) {
      return saved as Language;
    }
    
    // Auto-detect from browser language
    const browserLang = navigator.language.toLowerCase();
    
    // Direct matches
    if (browserLang.startsWith('fr')) return 'fr';
    if (browserLang.startsWith('pt')) return 'pt';
    if (browserLang.startsWith('es')) return 'es';
    if (browserLang.startsWith('en')) return 'en';
    
    // Default to English
    return 'en';
  });

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
