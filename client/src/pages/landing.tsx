import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import logoImage from '@assets/4S Logo_1756834402906.jpg';
import { GrokChatbot } from '@/components/GrokChatbot';
import { ImpactResults } from '@/components/ImpactResults';
import { useLanguage, translations } from '@/lib/i18n';
import { Sun, Droplet, Sprout, Wifi, TrendingUp, Lightbulb, Leaf, BookOpen, Users, Globe, Rocket, Trees, ChevronDown, Lock, Mail } from 'lucide-react';

export default function Landing() {
  const { t, language } = useLanguage();
  const [email, setEmail] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  
  const solutions = [
    {
      Icon: Sun,
      title: t('solutions.cleanEnergy'),
      description: t('solutions.cleanEnergyDesc'),
    },
    {
      Icon: Droplet,
      title: t('solutions.waterManagement'),
      description: t('solutions.waterManagementDesc'),
    },
    {
      Icon: Sprout,
      title: t('solutions.smartAgriculture'),
      description: t('solutions.smartAgricultureDesc'),
    },
    {
      Icon: Wifi,
      title: t('solutions.digitalInfra'),
      description: t('solutions.digitalInfraDesc'),
    },
    {
      Icon: TrendingUp,
      title: t('solutions.impactAnalytics'),
      description: t('solutions.impactAnalyticsDesc'),
    },
    {
      Icon: Lightbulb,
      title: t('solutions.innovationLabs'),
      description: t('solutions.innovationLabsDesc'),
    },
    {
      Icon: Leaf,
      title: t('solutions.climateChange'),
      description: t('solutions.climateChangeDesc'),
    },
    {
      Icon: BookOpen,
      title: t('solutions.capacityDevelopment'),
      description: t('solutions.capacityDevelopmentDesc'),
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
      {/* Hero Section */}
      <section 
        id="hero" 
        className="relative min-h-[85vh] flex items-center justify-center overflow-hidden"
      >
        {/* Multi-layer gradient background using 4S theme colors */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(102,35%,25%)] via-[hsl(218,73%,41%)] to-[hsl(29,94%,43%)] opacity-95"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-[hsl(102,35%,25%)]/50 via-transparent to-[hsl(218,73%,41%)]/30"></div>
        </div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')"
          }}
          role="img"
          aria-label="African landscape"
        ></div>
        {/* Overlay pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}></div>
        
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

      {/* Solutions Showcase */}
      <section id="solutions" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-accent">
              <span className="text-gradient">{t('solutions.title')}</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('solutions.comprehensive')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <Card key={index} className="card-hover" data-testid={`card-solution-${index}`}>
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <solution.Icon className="text-3xl text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{solution.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{solution.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

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

      {/* Track Record */}
      <section id="track-record" className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-accent">
              <span className="text-gradient">{t('trackRecord.title')}</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('trackRecord.subtitle')}
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {projects.map((project: any, index: number) => (
              <Card key={index} className="card-hover" data-testid={`card-project-${index}`}>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-2">{project.title}</h3>
                  <div className="text-sm font-semibold text-primary mb-4">{project.client}</div>
                  <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

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

      {/* GrokAI Chatbot */}
      {/* <GrokChatbot /> */}
    </div>
  );
}