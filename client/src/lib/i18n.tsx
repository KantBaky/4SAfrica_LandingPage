import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'fr' | 'pt' | 'es';

export const translations = {
  en: {
    nav: {
      home: 'Home',
      solutions: 'Solutions',
      impact: 'Impact',
      howItWorks: 'How It Works',
      trackRecord: 'Track Record',
      contact: 'Contact',
    },
    hero: {
      title: 'Sustainability Solutions for Sub-Saharan Africa',
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
      subtitle: 'Eight core areas of impact',
      badge: 'Our Solutions',
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
      climateChange: 'Climate Change',
      climateChangeDesc: 'Comprehensive strategies for climate mitigation and adaptation, helping communities prepare for and respond to climate impacts.',
      capacityDevelopment: 'Capacity Development',
      capacityDevelopmentDesc: 'Building skills and institutional strength in governments and companies through training, mentoring, and organizational development programs.',
      smartSafari: 'SmartSafari.io',
      smartSafariDesc: 'SmartSafari draws you straight into the pulse of East Africa, turning your travel dreams into something bright, bold, and instantly alive. Its smart AI listens to your style and shapes your ideas into vivid routes.',
      visitWebsite: 'Visit SmartSafari.io',
      learnMore: 'Learn more',
      getStarted: 'Get Started with',
      keyFeatures: 'Key Features',
      impact: 'Impact',
      caseStudy: 'Case Study',
      details: {
        cleanEnergy: {
          features: ['AI-optimized solar microgrids', 'Battery storage solutions', 'Smart metering systems', 'Community power management'],
          impact: '500,000+ people with reliable electricity access',
          caseStudy: 'Rural electrification in Nigeria increased productivity by 40%',
        },
        waterManagement: {
          features: ['IoT water quality sensors', 'Smart distribution networks', 'Leak detection systems', 'Water usage analytics'],
          impact: '2M+ liters of water saved annually',
          caseStudy: 'Kenya project reduced water loss by 60%',
        },
        smartAgriculture: {
          features: ['Crop monitoring AI', 'Weather prediction systems', 'Soil analysis tools', 'Market price integration'],
          impact: '35% average yield increase for farmers',
          caseStudy: '50,000 farmers connected to markets in Ghana',
        },
        digitalInfra: {
          features: ['Connectivity solutions', 'Digital literacy programs', 'Tech hub development', 'E-government platforms'],
          impact: '15+ countries with improved digital access',
          caseStudy: 'Digital hub in Rwanda trained 10,000+ youth',
        },
        impactAnalytics: {
          features: ['Real-time SDG tracking', 'Carbon footprint monitoring', 'Impact dashboards', 'Automated reporting'],
          impact: 'Tracking progress on 17 UN SDGs',
          caseStudy: 'Enabled transparent reporting for $200M in investments',
        },
        innovationLabs: {
          features: ['Incubator programs', 'Tech transfer support', 'Research partnerships', 'Prototype development'],
          impact: '100+ startups supported',
          caseStudy: 'Lab in Ethiopia launched 25 climate tech solutions',
        },
        climateChange: {
          features: ['Climate vulnerability assessments', 'Adaptation planning', 'Carbon offset programs', 'Green finance support'],
          impact: '2.5M tons CO₂ reduced',
          caseStudy: 'Supported $191M+ in GCF project approvals',
        },
        capacityDevelopment: {
          features: ['Training programs', 'Institutional strengthening', 'Knowledge transfer', 'Policy advisory'],
          impact: '5,000+ professionals trained',
          caseStudy: 'Built capacity for 6 national climate authorities',
        },
        smartSafari: {
          features: ['AI-powered trip planning', 'Real wildlife insights', 'Safari route optimization', 'Cross-country itineraries (Kenya, Tanzania, Uganda, Rwanda)'],
          impact: 'Transforming travel planning for East Africa explorers',
          caseStudy: 'SmartSafari is your doorway to East Africa\'s wild heart. It brings Kenya, Tanzania, Uganda, and Rwanda together in one clean, inspiring space where you can plan every detail of your adventure without stress. You get real wildlife insights, safari routes, national parks, seasonal highlights, and smooth trip-building tools that guide you from idea to full itinerary.\n\nIts built-in AI makes planning feel effortless. Ask anything about the region and it gives you sharp, reliable answers that match your style of travel. Whether you want big cats at sunrise, gorilla trekking, or a quiet lodge near a hidden valley, it helps you shape the perfect journey in seconds.\n\nEverything lives on smartsafari.io, ready to turn your dream trip into something you can actually book, enjoy, and brag about later. It feels modern, fast, and tailored to explorers who want more than generic advice. With SmartSafari, you plan smart, travel bold, and step straight into the kind of moments you will never forget.',
        },
      },
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
    trackRecord: {
      title: 'Our Track Record',
      subtitle: 'Delivering impact across Sub-Saharan Africa',
      badge: 'Proven Results',
      totalValue: 'Total Project Value: USD 191M+',
      partnership: 'All projects delivered in partnership with',
      partnershipFirst5: 'First 5 projects delivered in partnership with',
      withAscent: 'With Ascent',
      deliveredWith: 'Delivered in partnership with',
      projects: [
        {
          title: 'Green Climate Finance Facility for Climate-Smart Agriculture – Senegal',
          funding: 'USD 50M',
          country: 'Senegal',
          description: '4S developed the full GCF project proposal enabling La Banque Agricole (LBA) to finance climate-smart agriculture across Senegal. The work included climate vulnerability assessments, gender analysis, environmental & social safeguards, and the design of innovative financial products such as climate-linked credit and index-based insurance. The initiative strengthens farmer resilience, ensures climate-proofed value chains, and supports large-scale agricultural transformation.',
        },
        {
          title: 'Project Preparation Facility (PPF) – Senegal Agriculture Finance Facility',
          funding: 'USD 600K',
          country: 'Senegal',
          description: '4S prepared a PPF application that secured USD 600,000 from the Green Climate Fund to complete detailed studies for the main LBA climate finance programme. This included development of the ESS framework, gender policy, climate risk assessments, and full proposal preparation support, enabling the project to advance toward implementation.',
        },
        {
          title: 'Makueni Climate Resilience & Food Security Project – Kenya',
          funding: 'USD 10M',
          country: 'Kenya',
          description: '4S designed a GCF Simplified Approval Process (SAP) project focused on improving water security and climate-resilient agriculture in Kenya\'s Makueni County. The project promotes solar-powered water systems, borehole rehabilitation, drip irrigation, rainwater harvesting, and improved post-harvest management. 4S led concept development, technical analysis, and stakeholder engagement, supporting Kenya\'s transition to resilient food production systems.',
        },
        {
          title: 'Green Climate Finance Facility to Support Climate-Smart Agriculture – Zambia',
          funding: 'USD 100M',
          country: 'Zambia',
          description: '4S is leading the design of a national climate-smart agriculture financing facility for Zambia. The project supports the development of new loan products, bundled insurance solutions, and climate-risk-informed agricultural financing. 4S conducts stakeholder consultations, climate assessments, financial modelling, and proposal development, helping Zambia build a major climate-finance mechanism inspired by 4S\'s successful Senegal model.',
        },
        {
          title: 'Climate-Proofing Food Production Investments – Burundi (SAP017)',
          funding: 'USD 31M',
          country: 'Burundi',
          description: '4S drafted the approved GCF SAP concept for the Government of Burundi to scale climate-resilient land and water management across the Imbo and Moso basins. The project strengthens soil conservation, reduces erosion, safeguards irrigation infrastructure, and enhances farmer resilience across 15,000 hectares. 4S provided technical design, climate analysis, and gender and ESS inputs during development.',
        },
        {
          title: 'Strengthening Private Sector Engagement in Climate Finance – Mali',
          funding: 'Readiness Support',
          country: 'Mali',
          description: 'ASCENT supported Mali\'s National Designated Authority (AEDD) to enhance private-sector participation in climate finance. The assignment included developing a national Private Sector Engagement Strategy, conducting in-depth consultations across agribusiness, finance, energy, and MSMEs, and identifying climate investment barriers and opportunities. ASCENT also designed practical tools for project pipeline development, proposed financial instruments tailored to private-sector needs, and delivered training to strengthen institutions involved in GCF processes.',
        },
      ],
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
      cta: 'Contact Us',
    },
    chatbot: {
      title: 'SustainaBot',
      greeting: 'Hi! I\'m SustainaBot, powered by GrokAI. How can I help you learn about 4S\'s sustainability solutions for Sub-Saharan Africa?\n\n💡 For better responses, try asking:\n• "Calculate impact of solar energy in Kenya"\n• "What\'s our climate change solution?"\n• "Tell me about digital infrastructure and capacity development"\n• "Show me water management and smart agriculture case studies"',
      placeholder: 'Ask about our solutions... (be specific for better results)',
      error: 'I apologize, but I\'m having trouble connecting right now. Please try again in a moment.',
      tips: 'Tips: Ask about specific solutions, regions, or use cases for better answers',
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
      trackRecord: 'Historique',
      contact: 'Contact',
    },
    hero: {
      title: 'Solutions de Durabilité pour l\'Afrique Subsaharienne',
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
      subtitle: 'Huit domaines d\'impact clés',
      badge: 'Nos Solutions',
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
      climateChange: 'Changement Climatique',
      climateChangeDesc: 'Stratégies complètes d\'atténuation et d\'adaptation au changement climatique, aidant les communautés à se préparer et à réagir aux impacts climatiques.',
      capacityDevelopment: 'Développement des Capacités',
      capacityDevelopmentDesc: 'Renforcer les compétences et la force institutionnelle dans les gouvernements et les entreprises par le biais de formation, mentorat et programmes de développement organisationnel.',
      smartSafari: 'SmartSafari.io',
      smartSafariDesc: 'SmartSafari vous plonge au cœur de l\'Afrique de l\'Est, transformant vos rêves de voyage en quelque chose de lumineux, audacieux et instantanément vivant. Son IA intelligente écoute votre style et façonne vos idées en itinéraires vivants.',
      visitWebsite: 'Visiter SmartSafari.io',
      learnMore: 'En savoir plus',
      getStarted: 'Commencer avec',
      keyFeatures: 'Caractéristiques Clés',
      impact: 'Impact',
      caseStudy: 'Étude de Cas',
      details: {
        cleanEnergy: {
          features: ['Microgrilles solaires optimisées par IA', 'Solutions de stockage batterie', 'Systèmes de comptage intelligent', 'Gestion de l\'énergie communautaire'],
          impact: '500 000+ personnes avec accès à l\'électricité fiable',
          caseStudy: 'L\'électrification rurale au Nigeria a augmenté la productivité de 40%',
        },
        waterManagement: {
          features: ['Capteurs IoT de qualité de l\'eau', 'Réseaux de distribution intelligents', 'Systèmes de détection de fuites', 'Analytique d\'utilisation de l\'eau'],
          impact: '2M+ litres d\'eau économisés annuellement',
          caseStudy: 'Le projet au Kenya a réduit les pertes d\'eau de 60%',
        },
        smartAgriculture: {
          features: ['IA de surveillance des cultures', 'Systèmes de prévision météo', 'Outils d\'analyse des sols', 'Intégration des prix du marché'],
          impact: 'Augmentation moyenne de 35% des rendements',
          caseStudy: '50 000 agriculteurs connectés aux marchés au Ghana',
        },
        digitalInfra: {
          features: ['Solutions de connectivité', 'Programmes d\'alphabétisation numérique', 'Développement de hubs technologiques', 'Plateformes e-gouvernement'],
          impact: '15+ pays avec accès numérique amélioré',
          caseStudy: 'Hub numérique au Rwanda a formé 10 000+ jeunes',
        },
        impactAnalytics: {
          features: ['Suivi ODD en temps réel', 'Surveillance empreinte carbone', 'Tableaux de bord d\'impact', 'Rapports automatisés'],
          impact: 'Suivi des progrès sur 17 ODD de l\'ONU',
          caseStudy: 'Rapports transparents pour 200M$ d\'investissements',
        },
        innovationLabs: {
          features: ['Programmes d\'incubation', 'Support transfert technologique', 'Partenariats de recherche', 'Développement de prototypes'],
          impact: '100+ startups soutenues',
          caseStudy: 'Lab en Éthiopie a lancé 25 solutions climat',
        },
        climateChange: {
          features: ['Évaluations de vulnérabilité climatique', 'Planification d\'adaptation', 'Programmes de compensation carbone', 'Support finance verte'],
          impact: '2,5M tonnes CO₂ réduites',
          caseStudy: 'Soutien de 191M$+ en approbations de projets FVC',
        },
        capacityDevelopment: {
          features: ['Programmes de formation', 'Renforcement institutionnel', 'Transfert de connaissances', 'Conseil en politiques'],
          impact: '5 000+ professionnels formés',
          caseStudy: 'Capacité renforcée pour 6 autorités climatiques nationales',
        },
        smartSafari: {
          features: ['Planification de voyage propulsée par IA', 'Informations sur la faune en temps réel', 'Optimisation des itinéraires safari', 'Itinéraires multi-pays (Kenya, Tanzanie, Ouganda, Rwanda)'],
          impact: 'Transformer la planification de voyages pour les explorateurs de l\'Afrique de l\'Est',
          caseStudy: 'SmartSafari est votre porte d\'entrée vers le cœur sauvage de l\'Afrique de l\'Est. Il réunit le Kenya, la Tanzanie, l\'Ouganda et le Rwanda dans un espace propre et inspirant où vous pouvez planifier chaque détail de votre aventure sans stress. Vous obtenez des informations réelles sur la faune, des itinéraires safari, des parcs nationaux, des points forts saisonniers et des outils de création d\'itinéraires fluides qui vous guident de l\'idée à l\'itinéraire complet.\n\nSon IA intégrée rend la planification sans effort. Posez n\'importe quelle question sur la région et elle vous donne des réponses précises et fiables qui correspondent à votre style de voyage. Que vous vouliez voir les grands félins au lever du soleil, faire du trekking avec les gorilles ou trouver un lodge tranquille près d\'une vallée cachée, elle vous aide à façonner le voyage parfait en quelques secondes.\n\nTout est disponible sur smartsafari.io, prêt à transformer votre voyage de rêve en quelque chose que vous pouvez réellement réserver, apprécier et dont vous pourrez vous vanter plus tard.',
        },
      },
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
    chatbot: {
      title: 'SustainaBot',
      greeting: 'Bonjour! Je suis SustainaBot, alimenté par GrokAI. Comment puis-je vous aider à en savoir plus sur les solutions de durabilité de 4S pour l\'Afrique subsaharienne?\n\n💡 Pour de meilleures réponses, essayez de demander:\n• "Calculer l\'impact de l\'énergie solaire au Kenya"\n• "Qu\'est-ce que notre solution changement climatique?"\n• "Parlez-moi de l\'infrastructure numérique et du développement des capacités"\n• "Montrez-moi les études de cas de gestion de l\'eau et agriculture intelligente"',
      placeholder: 'Posez des questions sur nos solutions... (soyez spécifique pour de meilleurs résultats)',
      error: 'Je m\'excuse, mais j\'ai du mal à me connecter en ce moment. Veuillez réessayer dans un instant.',
      tips: 'Conseils: Posez des questions sur des solutions, régions ou cas d\'utilisation spécifiques pour de meilleures réponses',
    },
    stats: {
      livesImpacted: 'Vies Impactées',
      activeCountries: 'Pays Actifs',
      solutionsDeployed: 'Solutions Déployées',
      co2Reduced: 'Tonnes CO₂ Réduites',
    },
    trackRecord: {
      title: 'Notre Historique',
      subtitle: 'Créer un impact à travers l\'Afrique subsaharienne',
      badge: 'Résultats Prouvés',
      totalValue: 'Valeur Totale des Projets: USD 191M+',
      partnership: 'Tous les projets livrés en partenariat avec',
      partnershipFirst5: 'Les 5 premiers projets livrés en partenariat avec',
      withAscent: 'Avec Ascent',
      deliveredWith: 'Livré en partenariat avec',
      projects: [
        {
          title: 'Financement Climatique Vert pour l\'Agriculture Intelligente – Sénégal',
          funding: 'USD 50M',
          country: 'Sénégal',
          description: '4S a développé la proposition complète du projet FVC permettant à La Banque Agricole (LBA) de financer l\'agriculture intelligente au Sénégal. Le travail comprenait des évaluations de vulnérabilité climatique, l\'analyse de genre, les garanties environnementales et sociales, et la conception de produits financiers innovants.',
        },
        {
          title: 'Facilité de Préparation de Projet (PPF) – Sénégal',
          funding: 'USD 600K',
          country: 'Sénégal',
          description: '4S a préparé une demande PPF qui a obtenu 600 000 USD du Fonds Vert pour le Climat pour compléter des études détaillées pour le programme principal de finance climatique de la LBA.',
        },
        {
          title: 'Projet de Résilience Climatique de Makueni – Kenya',
          funding: 'USD 10M',
          country: 'Kenya',
          description: '4S a conçu un projet SAP du FVC axé sur l\'amélioration de la sécurité de l\'eau et de l\'agriculture résiliente au climat dans le comté de Makueni au Kenya.',
        },
        {
          title: 'Financement Climatique Vert pour l\'Agriculture – Zambie',
          funding: 'USD 100M',
          country: 'Zambie',
          description: '4S dirige la conception d\'un mécanisme national de financement de l\'agriculture intelligente pour la Zambie, soutenant le développement de nouveaux produits de prêt et solutions d\'assurance.',
        },
        {
          title: 'Protection Climatique des Investissements Alimentaires – Burundi',
          funding: 'USD 31M',
          country: 'Burundi',
          description: '4S a rédigé le concept SAP approuvé du FVC pour le gouvernement du Burundi pour étendre la gestion résiliente des terres et de l\'eau.',
        },
        {
          title: 'Renforcement du Secteur Privé dans la Finance Climatique – Mali',
          funding: 'Appui Préparation',
          country: 'Mali',
          description: 'ASCENT a soutenu l\'Autorité Nationale Désignée du Mali pour améliorer la participation du secteur privé à la finance climatique.',
        },
      ],
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
      cta: 'Nous Contacter',
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
      trackRecord: 'Histórico',
      contact: 'Contato',
    },
    hero: {
      title: 'Soluções de Sustentabilidade para a África Subsaariana',
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
      subtitle: 'Oito áreas principais de impacto',
      badge: 'Nossas Soluções',
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
      climateChange: 'Mudança Climática',
      climateChangeDesc: 'Estratégias abrangentes de mitigação e adaptação às mudanças climáticas, ajudando comunidades a se prepararem e responderem aos impactos climáticos.',
      capacityDevelopment: 'Desenvolvimento de Capacidades',
      capacityDevelopmentDesc: 'Construindo habilidades e força institucional em governos e empresas através de programas de treinamento, mentoria e desenvolvimento organizacional.',
      smartSafari: 'SmartSafari.io',
      smartSafariDesc: 'SmartSafari leva você direto ao pulso da África Oriental, transformando seus sonhos de viagem em algo brilhante, ousado e instantaneamente vivo. Sua IA inteligente ouve seu estilo e molda suas ideias em rotas vívidas.',
      visitWebsite: 'Visitar SmartSafari.io',
      learnMore: 'Saiba mais',
      getStarted: 'Começar com',
      keyFeatures: 'Características Principais',
      impact: 'Impacto',
      caseStudy: 'Estudo de Caso',
      details: {
        cleanEnergy: {
          features: ['Microgrids solares otimizadas por IA', 'Soluções de armazenamento de bateria', 'Sistemas de medição inteligente', 'Gestão de energia comunitária'],
          impact: '500.000+ pessoas com acesso a eletricidade confiável',
          caseStudy: 'Eletrificação rural na Nigéria aumentou produtividade em 40%',
        },
        waterManagement: {
          features: ['Sensores IoT de qualidade da água', 'Redes de distribuição inteligentes', 'Sistemas de detecção de vazamentos', 'Análise de uso de água'],
          impact: '2M+ litros de água economizados anualmente',
          caseStudy: 'Projeto no Quênia reduziu perda de água em 60%',
        },
        smartAgriculture: {
          features: ['IA de monitoramento de culturas', 'Sistemas de previsão do tempo', 'Ferramentas de análise de solo', 'Integração de preços de mercado'],
          impact: 'Aumento médio de 35% nos rendimentos',
          caseStudy: '50.000 agricultores conectados aos mercados em Gana',
        },
        digitalInfra: {
          features: ['Soluções de conectividade', 'Programas de alfabetização digital', 'Desenvolvimento de hubs tecnológicos', 'Plataformas de e-governo'],
          impact: '15+ países com acesso digital melhorado',
          caseStudy: 'Hub digital em Ruanda treinou 10.000+ jovens',
        },
        impactAnalytics: {
          features: ['Rastreamento ODS em tempo real', 'Monitoramento de pegada de carbono', 'Painéis de impacto', 'Relatórios automatizados'],
          impact: 'Rastreando progresso em 17 ODS da ONU',
          caseStudy: 'Relatórios transparentes para $200M em investimentos',
        },
        innovationLabs: {
          features: ['Programas de incubação', 'Suporte de transferência tecnológica', 'Parcerias de pesquisa', 'Desenvolvimento de protótipos'],
          impact: '100+ startups apoiadas',
          caseStudy: 'Lab na Etiópia lançou 25 soluções climáticas',
        },
        climateChange: {
          features: ['Avaliações de vulnerabilidade climática', 'Planejamento de adaptação', 'Programas de compensação de carbono', 'Suporte de finanças verdes'],
          impact: '2,5M toneladas CO₂ reduzidas',
          caseStudy: 'Suporte de $191M+ em aprovações de projetos FVC',
        },
        capacityDevelopment: {
          features: ['Programas de treinamento', 'Fortalecimento institucional', 'Transferência de conhecimento', 'Consultoria de políticas'],
          impact: '5.000+ profissionais treinados',
          caseStudy: 'Capacidade construída para 6 autoridades climáticas nacionais',
        },
        smartSafari: {
          features: ['Planejamento de viagem com IA', 'Informações sobre vida selvagem em tempo real', 'Otimização de rotas de safári', 'Itinerários multi-países (Quênia, Tanzânia, Uganda, Ruanda)'],
          impact: 'Transformando o planejamento de viagens para exploradores da África Oriental',
          caseStudy: 'SmartSafari é sua porta de entrada para o coração selvagem da África Oriental. Ele reúne Quênia, Tanzânia, Uganda e Ruanda em um espaço limpo e inspirador onde você pode planejar cada detalhe de sua aventura sem estresse. Você obtém informações reais sobre a vida selvagem, rotas de safári, parques nacionais, destaques sazonais e ferramentas de construção de itinerários fluidas que o guiam da ideia ao itinerário completo.\n\nSua IA integrada torna o planejamento sem esforço. Pergunte qualquer coisa sobre a região e ela lhe dá respostas precisas e confiáveis que combinam com seu estilo de viagem. Se você quer ver grandes felinos ao nascer do sol, fazer trekking com gorilas ou encontrar um lodge tranquilo perto de um vale escondido, ela ajuda você a moldar a viagem perfeita em segundos.\n\nTudo está disponível em smartsafari.io, pronto para transformar sua viagem dos sonhos em algo que você pode realmente reservar, aproveitar e se gabar depois.',
        },
      },
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
    chatbot: {
      title: 'SustainaBot',
      greeting: 'Olá! Sou SustainaBot, alimentado por GrokAI. Como posso ajudá-lo a aprender sobre as soluções de sustentabilidade da 4S para a África Subsaariana?\n\n💡 Para melhores respostas, tente perguntar:\n• "Calcule o impacto da energia solar no Quênia"\n• "Qual é nossa solução de mudança climática?"\n• "Fale-me sobre infraestrutura digital e desenvolvimento de capacidades"\n• "Mostre-me estudos de caso de gestão de água e agricultura inteligente"',
      placeholder: 'Pergunte sobre nossas soluções... (seja específico para melhores resultados)',
      error: 'Peço desculpas, estou tendo dificuldades para conectar agora. Por favor, tente novamente em um momento.',
      tips: 'Dica: Pergunte sobre soluções, regiões ou casos de uso específicos para melhores respostas',
    },
    trackRecord: {
      title: 'Nosso Histórico',
      subtitle: 'Criando impacto na África Subsaariana',
      badge: 'Resultados Comprovados',
      totalValue: 'Valor Total dos Projetos: USD 191M+',
      partnership: 'Todos os projetos entregues em parceria com',
      partnershipFirst5: 'Primeiros 5 projetos entregues em parceria com',
      withAscent: 'Com Ascent',
      deliveredWith: 'Entregue em parceria com',
      projects: [
        {
          title: 'Financiamento Climático Verde para Agricultura Inteligente – Senegal',
          funding: 'USD 50M',
          country: 'Senegal',
          description: '4S desenvolveu a proposta completa do projeto FVC permitindo que La Banque Agricole (LBA) financie agricultura inteligente em todo o Senegal. O trabalho incluiu avaliações de vulnerabilidade climática, análise de gênero, salvaguardas ambientais e sociais.',
        },
        {
          title: 'Facilidade de Preparação de Projeto (PPF) – Senegal',
          funding: 'USD 600K',
          country: 'Senegal',
          description: '4S preparou uma aplicação PPF que garantiu USD 600.000 do Fundo Verde para o Clima para completar estudos detalhados para o programa principal de financiamento climático da LBA.',
        },
        {
          title: 'Projeto de Resiliência Climática de Makueni – Quênia',
          funding: 'USD 10M',
          country: 'Quênia',
          description: '4S projetou um projeto SAP do FVC focado em melhorar a segurança hídrica e agricultura resiliente ao clima no Condado de Makueni, Quênia.',
        },
        {
          title: 'Financiamento Climático Verde para Agricultura – Zâmbia',
          funding: 'USD 100M',
          country: 'Zâmbia',
          description: '4S está liderando o desenho de uma facilidade nacional de financiamento de agricultura inteligente para a Zâmbia, apoiando o desenvolvimento de novos produtos de empréstimo e soluções de seguro.',
        },
        {
          title: 'Proteção Climática de Investimentos Alimentares – Burundi',
          funding: 'USD 31M',
          country: 'Burundi',
          description: '4S redigiu o conceito SAP aprovado do FVC para o Governo do Burundi para escalar a gestão resiliente de terras e água.',
        },
        {
          title: 'Fortalecimento do Setor Privado em Finanças Climáticas – Mali',
          funding: 'Apoio Preparação',
          country: 'Mali',
          description: 'ASCENT apoiou a Autoridade Nacional Designada do Mali para aprimorar a participação do setor privado em finanças climáticas.',
        },
      ],
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
      cta: 'Fale Conosco',
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
      trackRecord: 'Historial',
      contact: 'Contacto',
    },
    hero: {
      title: 'Soluciones de Sostenibilidad para el África Subsahariana',
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
      subtitle: 'Ocho áreas principales de impacto',
      badge: 'Nuestras Soluciones',
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
      climateChange: 'Cambio Climático',
      climateChangeDesc: 'Estrategias integrales de mitigación y adaptación al cambio climático, ayudando a las comunidades a prepararse y responder a los impactos climáticos.',
      capacityDevelopment: 'Desarrollo de Capacidades',
      capacityDevelopmentDesc: 'Construyendo habilidades y fortaleza institucional en gobiernos y empresas a través de programas de capacitación, mentoría y desarrollo organizacional.',
      smartSafari: 'SmartSafari.io',
      smartSafariDesc: 'SmartSafari te lleva directo al pulso de África Oriental, convirtiendo tus sueños de viaje en algo brillante, audaz e instantáneamente vivo. Su IA inteligente escucha tu estilo y moldea tus ideas en rutas vívidas.',
      visitWebsite: 'Visitar SmartSafari.io',
      learnMore: 'Más información',
      getStarted: 'Comenzar con',
      keyFeatures: 'Características Clave',
      impact: 'Impacto',
      caseStudy: 'Caso de Estudio',
      details: {
        cleanEnergy: {
          features: ['Microrredes solares optimizadas por IA', 'Soluciones de almacenamiento de batería', 'Sistemas de medición inteligente', 'Gestión de energía comunitaria'],
          impact: '500.000+ personas con acceso a electricidad confiable',
          caseStudy: 'La electrificación rural en Nigeria aumentó la productividad en un 40%',
        },
        waterManagement: {
          features: ['Sensores IoT de calidad del agua', 'Redes de distribución inteligentes', 'Sistemas de detección de fugas', 'Análisis de uso del agua'],
          impact: '2M+ litros de agua ahorrados anualmente',
          caseStudy: 'El proyecto en Kenia redujo la pérdida de agua en un 60%',
        },
        smartAgriculture: {
          features: ['IA de monitoreo de cultivos', 'Sistemas de predicción meteorológica', 'Herramientas de análisis de suelo', 'Integración de precios de mercado'],
          impact: 'Aumento promedio de 35% en rendimientos',
          caseStudy: '50.000 agricultores conectados a mercados en Ghana',
        },
        digitalInfra: {
          features: ['Soluciones de conectividad', 'Programas de alfabetización digital', 'Desarrollo de hubs tecnológicos', 'Plataformas de e-gobierno'],
          impact: '15+ países con acceso digital mejorado',
          caseStudy: 'Hub digital en Ruanda capacitó a 10.000+ jóvenes',
        },
        impactAnalytics: {
          features: ['Seguimiento ODS en tiempo real', 'Monitoreo de huella de carbono', 'Paneles de impacto', 'Informes automatizados'],
          impact: 'Seguimiento del progreso en 17 ODS de la ONU',
          caseStudy: 'Informes transparentes para $200M en inversiones',
        },
        innovationLabs: {
          features: ['Programas de incubación', 'Soporte de transferencia tecnológica', 'Alianzas de investigación', 'Desarrollo de prototipos'],
          impact: '100+ startups apoyadas',
          caseStudy: 'Lab en Etiopía lanzó 25 soluciones climáticas',
        },
        climateChange: {
          features: ['Evaluaciones de vulnerabilidad climática', 'Planificación de adaptación', 'Programas de compensación de carbono', 'Soporte de finanzas verdes'],
          impact: '2,5M toneladas CO₂ reducidas',
          caseStudy: 'Apoyo de $191M+ en aprobaciones de proyectos FVC',
        },
        capacityDevelopment: {
          features: ['Programas de capacitación', 'Fortalecimiento institucional', 'Transferencia de conocimiento', 'Asesoría de políticas'],
          impact: '5.000+ profesionales capacitados',
          caseStudy: 'Capacidad construida para 6 autoridades climáticas nacionales',
        },
        smartSafari: {
          features: ['Planificación de viajes con IA', 'Información sobre vida silvestre en tiempo real', 'Optimización de rutas de safari', 'Itinerarios multi-país (Kenia, Tanzania, Uganda, Ruanda)'],
          impact: 'Transformando la planificación de viajes para exploradores de África Oriental',
          caseStudy: 'SmartSafari es tu puerta de entrada al corazón salvaje de África Oriental. Reúne Kenia, Tanzania, Uganda y Ruanda en un espacio limpio e inspirador donde puedes planificar cada detalle de tu aventura sin estrés. Obtienes información real sobre la vida silvestre, rutas de safari, parques nacionales, momentos destacados de temporada y herramientas fluidas de construcción de itinerarios que te guían desde la idea hasta el itinerario completo.\n\nSu IA integrada hace que la planificación sea sin esfuerzo. Pregunta cualquier cosa sobre la región y te da respuestas precisas y confiables que coinciden con tu estilo de viaje. Ya sea que quieras ver grandes felinos al amanecer, hacer trekking con gorilas o encontrar un lodge tranquilo cerca de un valle escondido, te ayuda a moldear el viaje perfecto en segundos.\n\nTodo está disponible en smartsafari.io, listo para convertir tu viaje soñado en algo que realmente puedes reservar, disfrutar y presumir después.',
        },
      },
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
    trackRecord: {
      title: 'Nuestro Historial',
      subtitle: 'Creando impacto en el África Subsahariana',
      badge: 'Resultados Comprobados',
      totalValue: 'Valor Total del Proyecto: USD 191M+',
      partnership: 'Todos los proyectos entregados en asociación con',
      partnershipFirst5: 'Primeros 5 proyectos entregados en asociación con',
      withAscent: 'Con Ascent',
      deliveredWith: 'Entregado en asociación con',
      projects: [
        {
          title: 'Financiamiento Climático Verde para Agricultura Inteligente – Senegal',
          funding: 'USD 50M',
          country: 'Senegal',
          description: '4S desarrolló la propuesta completa del proyecto FVC permitiendo que La Banque Agricole (LBA) financie agricultura inteligente en todo Senegal. El trabajo incluyó evaluaciones de vulnerabilidad climática, análisis de género, salvaguardas ambientales y sociales.',
        },
        {
          title: 'Facilidad de Preparación de Proyecto (PPF) – Senegal',
          funding: 'USD 600K',
          country: 'Senegal',
          description: '4S preparó una solicitud PPF que aseguró USD 600.000 del Fondo Verde para el Clima para completar estudios detallados para el programa principal de financiamiento climático de LBA.',
        },
        {
          title: 'Proyecto de Resiliencia Climática de Makueni – Kenia',
          funding: 'USD 10M',
          country: 'Kenia',
          description: '4S diseñó un proyecto SAP del FVC enfocado en mejorar la seguridad hídrica y agricultura resiliente al clima en el Condado de Makueni, Kenia.',
        },
        {
          title: 'Financiamiento Climático Verde para Agricultura – Zambia',
          funding: 'USD 100M',
          country: 'Zambia',
          description: '4S está liderando el diseño de una facilidad nacional de financiamiento de agricultura inteligente para Zambia, apoyando el desarrollo de nuevos productos de préstamo y soluciones de seguro.',
        },
        {
          title: 'Protección Climática de Inversiones Alimentarias – Burundi',
          funding: 'USD 31M',
          country: 'Burundi',
          description: '4S redactó el concepto SAP aprobado del FVC para el Gobierno de Burundi para escalar la gestión resiliente de tierras y agua.',
        },
        {
          title: 'Fortalecimiento del Sector Privado en Finanzas Climáticas – Mali',
          funding: 'Apoyo Preparación',
          country: 'Mali',
          description: 'ASCENT apoyó a la Autoridad Nacional Designada de Mali para mejorar la participación del sector privado en finanzas climáticas.',
        },
      ],
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
      cta: 'Contáctanos',
    },
    chatbot: {
      title: 'SustainaBot',
      greeting: '¡Hola! Soy SustainaBot, impulsado por GrokAI. ¿Cómo puedo ayudarte a aprender sobre las soluciones de sostenibilidad de 4S para el África Subsahariana?\n\n💡 Para mejores respuestas, intenta preguntar:\n• "Calcula el impacto de la energía solar en Kenia"\n• "¿Cuál es nuestra solución de cambio climático?"\n• "Cuéntame sobre infraestructura digital y desarrollo de capacidades"\n• "Muéstrame estudios de caso de gestión del agua y agricultura inteligente"',
      placeholder: 'Pregunta sobre nuestras soluciones... (sé específico para mejores resultados)',
      error: 'Disculpa, estoy teniendo dificultades para conectar ahora. Por favor, inténtalo de nuevo en un momento.',
      tips: 'Consejo: Pregunta sobre soluciones, regiones o casos de uso específicos para mejores respuestas',
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
