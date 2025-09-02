import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const challenges = [
  {
    icon: 'fas fa-exclamation-triangle',
    title: 'Climate Vulnerability',
    description: 'Rising temperatures and unpredictable weather patterns threaten agricultural livelihoods.',
    color: 'destructive'
  },
  {
    icon: 'fas fa-plug',
    title: 'Energy Access Gap',
    description: '600 million people lack access to reliable electricity infrastructure.',
    color: 'destructive'
  },
  {
    icon: 'fas fa-chart-line-down',
    title: 'Limited Investment',
    description: 'Sustainability projects struggle to attract sufficient funding and resources.',
    color: 'destructive'
  }
];

const opportunities = [
  {
    icon: 'fas fa-leaf',
    title: 'Climate-Smart Agriculture',
    description: 'AI-driven farming solutions that adapt to climate change and boost yields.',
    color: 'primary'
  },
  {
    icon: 'fas fa-solar-panel',
    title: 'Renewable Energy Grid',
    description: 'Decentralized solar and wind networks powered by smart grid technology.',
    color: 'secondary'
  },
  {
    icon: 'fas fa-coins',
    title: 'Green Finance Hub',
    description: 'Innovative funding mechanisms that connect global capital with local impact.',
    color: 'accent'
  }
];

const features = [
  {
    icon: 'fas fa-brain',
    title: 'AI-Powered Insights',
    description: 'Machine learning algorithms analyze local conditions, market dynamics, and climate data to identify the most promising sustainability opportunities.',
    color: 'primary'
  },
  {
    icon: 'fas fa-users',
    title: 'Community-Centered',
    description: 'Every solution is designed with and for local communities, ensuring cultural relevance, social acceptance, and long-term sustainability.',
    color: 'secondary'
  },
  {
    icon: 'fas fa-rocket',
    title: 'Scalable Impact',
    description: 'From pilot projects to regional implementation, our solutions are designed to scale efficiently across diverse African contexts.',
    color: 'accent'
  }
];

export function FeaturesSection() {
  const [showOpportunities, setShowOpportunities] = useState(true);

  return (
    <section id="solutions" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-accent">
            The <span className="text-gradient">4S Difference</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We don't just identify problems—we transform them into sustainable opportunities using AI and innovation.
          </p>
        </div>

        {/* Interactive Challenges → Opportunities Slider */}
        <div className="mb-16">
          <Card className="p-8">
            <CardContent className="p-0">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">Challenges → Opportunities</h3>
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <Button
                    variant={!showOpportunities ? "default" : "outline"}
                    onClick={() => setShowOpportunities(false)}
                    data-testid="button-show-challenges"
                    className={!showOpportunities ? 'bg-destructive text-destructive-foreground' : ''}
                  >
                    Challenges
                  </Button>
                  <div className="w-12 h-0.5 bg-border"></div>
                  <Button
                    variant={showOpportunities ? "default" : "outline"}
                    onClick={() => setShowOpportunities(true)}
                    data-testid="button-show-opportunities"
                    className={showOpportunities ? 'bg-primary text-primary-foreground' : ''}
                  >
                    Opportunities
                  </Button>
                </div>
              </div>
              
              <motion.div
                key={showOpportunities ? 'opportunities' : 'challenges'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-3 gap-6"
              >
                {(showOpportunities ? opportunities : challenges).map((item, index) => (
                  <div
                    key={item.title}
                    className={`p-6 rounded-xl ${
                      showOpportunities 
                        ? `bg-${item.color}/10` 
                        : 'bg-destructive/10'
                    }`}
                    data-testid={`card-${showOpportunities ? 'opportunity' : 'challenge'}-${index}`}
                  >
                    <i className={`${item.icon} text-3xl mb-4 ${
                      showOpportunities 
                        ? `text-${item.color}` 
                        : 'text-destructive'
                    }`}></i>
                    <h4 className="font-semibold text-foreground mb-2">{item.title}</h4>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </motion.div>
            </CardContent>
          </Card>
        </div>

        {/* Core Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 card-hover h-full">
                <CardContent className="p-0">
                  <div className={`w-16 h-16 bg-${feature.color}/10 rounded-xl flex items-center justify-center mb-6`}>
                    <i className={`${feature.icon} text-2xl text-${feature.color}`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
