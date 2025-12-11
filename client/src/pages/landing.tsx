import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import logoImage from '@assets/4S Logo_1756834402906.jpg';
import { useLanguage, translations } from '@/lib/i18n';
import { Users, Globe, Rocket, Trees, ChevronDown, Lock, Mail, X, DollarSign, Target, Award, Calendar, MapPin, ExternalLink } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

import solarEnergyImg from '@assets/generated_images/solar_panels_african_savanna.png';
import heroBackgroundImg from '@assets/generated_images/african_sustainability_hero_landscape.png';
import heroBackgroundVideo from '@assets/generated_videos/african_savanna_sustainability_aerial.mp4';
import waterManagementImg from '@assets/generated_images/water_management_africa_infrastructure.png';
import smartAgricultureImg from '@assets/generated_images/smart_agriculture_african_farm.png';
import digitalInfraImg from '@assets/generated_images/digital_infrastructure_africa_technology.png';
import climateFinanceImg from '@assets/generated_images/climate_finance_green_investment.png';
import sustainableInnovationImg from '@assets/generated_images/sustainable_innovation_research_lab.png';
import carbonCreditsImg from '@assets/generated_images/carbon_credits_forest_conservation.png';
import capacityBuildingImg from '@assets/generated_images/capacity_building_training_workshop.png';
import smartSafariImg from '@assets/generated_images/smart_safari_african_wildlife.png';

export default function Landing() {
  const { t, language } = useLanguage();
  const [email, setEmail] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [selectedSolution, setSelectedSolution] = useState<any>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  
  const solutionDetails = translations[language].solutions.details as Record<string, {
    features: string[];
    impact: string;
    caseStudy: string;
  }>;
  
  const solutions = [
    {
      image: solarEnergyImg,
      title: t('solutions.cleanEnergy'),
      description: t('solutions.cleanEnergyDesc'),
      key: 'cleanEnergy',
      color: 'from-yellow-400 to-orange-500',
    },
    {
      image: waterManagementImg,
      title: t('solutions.waterManagement'),
      description: t('solutions.waterManagementDesc'),
      key: 'waterManagement',
      color: 'from-blue-400 to-cyan-500',
    },
    {
      image: smartAgricultureImg,
      title: t('solutions.smartAgriculture'),
      description: t('solutions.smartAgricultureDesc'),
      key: 'smartAgriculture',
      color: 'from-green-400 to-emerald-500',
    },
    {
      image: digitalInfraImg,
      title: t('solutions.digitalInfra'),
      description: t('solutions.digitalInfraDesc'),
      key: 'digitalInfra',
      color: 'from-purple-400 to-indigo-500',
    },
    {
      image: climateFinanceImg,
      title: t('solutions.impactAnalytics'),
      description: t('solutions.impactAnalyticsDesc'),
      key: 'impactAnalytics',
      color: 'from-pink-400 to-rose-500',
    },
    {
      image: sustainableInnovationImg,
      title: t('solutions.innovationLabs'),
      description: t('solutions.innovationLabsDesc'),
      key: 'innovationLabs',
      color: 'from-amber-400 to-yellow-500',
    },
    {
      image: carbonCreditsImg,
      title: t('solutions.climateChange'),
      description: t('solutions.climateChangeDesc'),
      key: 'climateChange',
      color: 'from-teal-400 to-green-500',
    },
    {
      image: capacityBuildingImg,
      title: t('solutions.capacityDevelopment'),
      description: t('solutions.capacityDevelopmentDesc'),
      key: 'capacityDevelopment',
      color: 'from-indigo-400 to-blue-500',
    },
    {
      image: smartSafariImg,
      title: t('solutions.smartSafari'),
      description: t('solutions.smartSafariDesc'),
      key: 'smartSafari',
      color: 'from-orange-400 to-amber-500',
      externalLink: 'https://smartsafari.io',
    },
  ];

  const stats = [
    { value: '500K+', label: t('stats.livesImpacted'), Icon: Users },
    { value: '15+', label: t('stats.activeCountries'), Icon: Globe },
    { value: '50+', label: t('stats.solutionsDeployed'), Icon: Rocket },
    { value: '2.5M', label: t('stats.co2Reduced'), Icon: Trees },
  ];

  const steps = [
    {
      number: '01',
      title: t('howItWorks.step01'),
      description: t('howItWorks.assessDesc'),
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    },
    {
      number: '02',
      title: t('howItWorks.step02'),
      description: t('howItWorks.designDesc'),
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    },
    {
      number: '03',
      title: t('howItWorks.step03'),
      description: t('howItWorks.monitorDesc'),
      image: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    },
  ];

  const projects = translations[language].trackRecord.projects;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Background Video */}
      <section 
        id="hero" 
        className="relative min-h-[85vh] flex items-center justify-center overflow-hidden"
      >
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          tabIndex={-1}
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
          poster={heroBackgroundImg}
        >
          <source src={heroBackgroundVideo} type="video/mp4" />
        </video>
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-64 h-64 rounded-full bg-white/5"
              style={{
                left: `${20 + i * 15}%`,
                top: `${10 + (i % 3) * 30}%`,
              }}
              animate={{
                y: [0, -30, 0],
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 font-accent leading-tight hero-title">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                size="lg"
                onClick={() => scrollToSection('contact')}
                className="bg-white text-primary px-8 py-4 text-lg font-semibold btn-seed-hover shadow-lg hover:shadow-xl"
                data-testid="button-get-started"
              >
                <i className="fas fa-rocket mr-2"></i>
                {t('hero.getStarted')}
              </Button>
              <Button
                size="lg"
                onClick={() => scrollToSection('solutions')}
                className="bg-white text-primary px-8 py-4 text-lg font-semibold btn-seed-hover shadow-lg hover:shadow-xl"
                data-testid="button-learn-more"
              >
                <i className="fas fa-info-circle mr-2"></i>
                {t('hero.learnMore')}
              </Button>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white">
          <motion.div
            className="flex flex-col items-center cursor-pointer"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={() => scrollToSection('mission')}
          >
            <span className="text-sm mb-2">{t('mission.discoverMore')}</span>
            <ChevronDown className="text-xl" />
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                <span className="text-gradient">{t('mission.empowering')}</span>
              </h2>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>{t('mission.about')}</p>
              <p>{t('mission.partner')}</p>
              <p className="text-foreground font-semibold">{t('mission.building')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Showcase - Redesigned */}
      <section id="solutions" className="py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-accent">
                <span className="text-gradient">{t('solutions.title')}</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {t('solutions.comprehensive')}
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card 
                  className="solution-card h-full bg-card overflow-hidden cursor-pointer group" 
                  data-testid={`card-solution-${index}`}
                  onClick={() => setSelectedSolution({ ...solution, details: solutionDetails[solution.key as keyof typeof solutionDetails] })}
                >
                  <div className="relative h-40 overflow-hidden">
                    <img 
                      src={solution.image} 
                      alt={solution.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${solution.color} opacity-20`}></div>
                  </div>
                  <CardContent className="p-5 relative z-10">
                    <h3 className="text-lg font-bold text-foreground mb-2">{solution.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{solution.description}</p>
                    <div className="mt-4 flex items-center text-primary text-sm font-medium" data-testid={`link-solution-${solution.key}`}>
                      <span>{t('solutions.learnMore')}</span>
                      <ChevronDown className="w-4 h-4 ml-1 rotate-[-90deg]" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Details Modal */}
      <Dialog open={!!selectedSolution} onOpenChange={() => setSelectedSolution(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedSolution && (
            <>
              <DialogHeader>
                <div className="w-full h-48 rounded-xl overflow-hidden mb-4 shadow-lg" data-testid="modal-solution-image">
                  <img 
                    src={selectedSolution.image} 
                    alt={selectedSolution.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <DialogTitle className="text-2xl font-bold" data-testid="modal-solution-title">{selectedSolution.title}</DialogTitle>
                <DialogDescription className="text-base mt-2" data-testid="modal-solution-desc">
                  {selectedSolution.description}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6 mt-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-3 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-primary" />
                    {t('solutions.keyFeatures')}
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2" data-testid="modal-solution-features">
                    {selectedSolution.details?.features?.map((feature: string, i: number) => (
                      <li key={i} className="flex items-center text-sm text-muted-foreground" data-testid={`feature-${i}`}>
                        <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-primary/5 rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-2 flex items-center">
                    <Award className="w-5 h-5 mr-2 text-primary" />
                    {t('solutions.impact')}
                  </h4>
                  <p className="text-primary font-medium" data-testid="modal-solution-impact">{selectedSolution.details?.impact}</p>
                </div>
                
                <div className="border-l-4 border-secondary pl-4">
                  <h4 className="font-semibold text-foreground mb-2">{t('solutions.caseStudy')}</h4>
                  <p className="text-sm text-muted-foreground italic" data-testid="modal-solution-casestudy">{selectedSolution.details?.caseStudy}</p>
                </div>
                
                {selectedSolution.externalLink ? (
                  <Button 
                    className="w-full"
                    data-testid="button-solution-visit-website"
                    onClick={() => window.open(selectedSolution.externalLink, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {t('solutions.visitWebsite')}
                  </Button>
                ) : (
                  <Button 
                    className="w-full"
                    data-testid="button-solution-get-started"
                    onClick={() => {
                      setSelectedSolution(null);
                      scrollToSection('contact');
                    }}
                  >
                    {t('solutions.getStarted')} {selectedSolution.title}
                  </Button>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Impact Metrics */}
      <section id="impact" className="py-24 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-accent">
              {t('impact.ourImpact')}
            </h2>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              {t('impact.realResults')}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center" data-testid={`stat-${index}`}>
                <stat.Icon className="text-4xl mb-4 opacity-80 mx-auto" />
                <div className="text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-lg text-primary-foreground/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-accent">
              <span className="text-gradient">{t('howItWorks.title')}</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('howItWorks.subtitle')}
            </p>
          </div>

          <div className="space-y-24">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`grid md:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                  <div className="text-6xl font-bold text-primary/20 mb-4">{step.number}</div>
                  <h3 className="text-3xl font-bold text-foreground mb-4">{step.title}</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
                <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                  <img
                    src={step.image}
                    alt={step.title}
                    className="rounded-xl shadow-lg w-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Track Record - Redesigned */}
      <section id="track-record" className="py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-accent">
                <span className="text-gradient">{t('trackRecord.title')}</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {t('trackRecord.subtitle')}
              </p>
            </motion.div>
          </div>

          {/* Total Funding Badge */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-full shadow-lg" data-testid="badge-total-funding">
              <DollarSign className="w-6 h-6" />
              <span className="text-lg font-bold">{t('trackRecord.totalValue')}</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card 
                  className="track-record-card h-full bg-card cursor-pointer" 
                  data-testid={`card-project-${index}`}
                  onClick={() => setSelectedProject({ ...project, index })}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="funding-badge" data-testid={`badge-funding-${index}`}>{project.funding}</span>
                      <div className="flex items-center text-muted-foreground text-sm" data-testid={`text-country-${index}`}>
                        <MapPin className="w-4 h-4 mr-1" />
                        {project.country}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-3 line-clamp-2" data-testid={`text-project-title-${index}`}>{project.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4" data-testid={`text-project-desc-${index}`}>{project.description}</p>
                    {index < 5 && (
                      <div className="mt-3 flex items-center text-xs text-secondary">
                        <Award className="w-3 h-3 mr-1" />
                        <span>{t('trackRecord.withAscent')}</span>
                      </div>
                    )}
                    <div className="mt-3 flex items-center text-primary text-sm font-medium">
                      <span>{t('solutions.learnMore')}</span>
                      <ChevronDown className="w-4 h-4 ml-1 rotate-[-90deg]" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Partnership Note */}
          <div className="mt-12 text-center" data-testid="text-partnership-note">
            <p className="text-muted-foreground italic">
              {t('trackRecord.partnershipFirst5')}{' '}
              <a 
                href="https://africasustainability.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary font-semibold hover:underline inline-flex items-center"
                data-testid="link-ascent"
              >
                Ascent
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Project Details Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedProject && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
                    <DollarSign className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-primary">{selectedProject.funding}</span>
                    <div className="flex items-center text-muted-foreground text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      {selectedProject.country}
                    </div>
                  </div>
                </div>
                <DialogTitle className="text-xl font-bold" data-testid="modal-project-title">{selectedProject.title}</DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground">
                  {selectedProject.client}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 mt-4">
                <p className="text-muted-foreground leading-relaxed" data-testid="modal-project-desc">
                  {selectedProject.description}
                </p>
                
                {selectedProject.index < 5 && (
                  <div className="bg-secondary/10 rounded-lg p-4 flex items-center gap-3">
                    <Award className="w-6 h-6 text-secondary" />
                    <div>
                      <p className="text-sm text-foreground font-medium">
                        {t('trackRecord.deliveredWith')}{' '}
                        <a 
                          href="https://africasustainability.org/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline inline-flex items-center"
                        >
                          Ascent
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      </p>
                    </div>
                  </div>
                )}
                
                <Button 
                  className="w-full"
                  data-testid="button-project-contact"
                  onClick={() => {
                    setSelectedProject(null);
                    scrollToSection('contact');
                  }}
                >
                  {t('contact.cta')}
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Contact/CTA Section */}
      <section id="contact" className="py-24 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-accent">
            {t('contact.title')}
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-12 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>

          <div className="space-y-4 max-w-2xl mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="text"
                placeholder={t('contact.namePlaceholder')}
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="flex-1 bg-white text-foreground px-6 py-4 text-lg"
                data-testid="input-name"
              />
              <Input
                type="email"
                placeholder={t('contact.emailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white text-foreground px-6 py-4 text-lg"
                data-testid="input-email"
              />
            </div>
            <textarea
              placeholder={t('contact.messagePlaceholder')}
              value={contactMessage}
              onChange={(e) => setContactMessage(e.target.value)}
              className="w-full bg-white text-foreground px-6 py-4 text-lg rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary min-h-[120px]"
              data-testid="textarea-message"
            />
            <Button
              size="lg"
              onClick={async () => {
                if (!email || !contactMessage) {
                  setSubmitMessage(t('contact.error'));
                  return;
                }

                setIsSubmitting(true);
                setSubmitMessage('');

                try {
                  const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      email,
                      name: contactName || undefined,
                      message: contactMessage,
                    }),
                  });

                  const data = await response.json();

                  if (response.ok) {
                    setSubmitMessage('✓ ' + t('contact.success'));
                    setEmail('');
                    setContactName('');
                    setContactMessage('');
                    setTimeout(() => setSubmitMessage(''), 5000);
                  } else {
                    setSubmitMessage(data.message || t('contact.error'));
                  }
                } catch (error) {
                  setSubmitMessage(t('contact.error'));
                  console.error('Contact form error:', error);
                } finally {
                  setIsSubmitting(false);
                }
              }}
              disabled={isSubmitting || !email || !contactMessage}
              className="w-full bg-secondary text-secondary-foreground px-8 py-4 text-lg font-semibold btn-seed-hover hover:bg-secondary/90"
              data-testid="button-submit-email"
            >
              {isSubmitting ? t('contact.sending') : t('contact.submit')}
            </Button>
            {submitMessage && (
              <p className={`text-sm text-center ${submitMessage.includes('✓') ? 'text-green-300' : 'text-yellow-200'}`}>
                {submitMessage}
              </p>
            )}
          </div>

          <p className="text-sm text-primary-foreground/70">
            <Lock className="inline mr-2" size={20} />
            We respect your privacy. No spam, ever.
          </p>
        </div>
      </section>

    </div>
  );
}