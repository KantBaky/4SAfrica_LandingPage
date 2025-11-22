import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'fr';

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
    },
    testimonials: {
      title: 'What People Say',
      subtitle: 'Voices from communities we\'ve empowered',
      whatPeopleSay: 'What People',
      voicesFromCommunities: 'Voices from communities we\'ve empowered',
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
    },
    testimonials: {
      title: 'Ce que les gens disent',
      subtitle: 'Voix des communautés que nous avons habilitées',
      whatPeopleSay: 'Ce que les Gens',
      voicesFromCommunities: 'Voix des communautés que nous avons habilitées',
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
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('language') as Language) || 'en';
    }
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
