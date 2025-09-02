import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { TheoryStage } from '@/types/sustainability';

const theoryStages: TheoryStage[] = [
  {
    id: 1,
    title: 'Diagnose',
    description: 'AI-powered analysis of local challenges, community needs, and resource availability. We use satellite data, ground sensors, and community feedback to create comprehensive assessments.',
    icon: 'fas fa-search',
    color: 'primary',
    imageUrl: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
  },
  {
    id: 2,
    title: 'Innovate',
    description: 'Co-creation of tailored solutions with local communities and partners. Our innovation labs combine global AI expertise with indigenous knowledge systems.',
    icon: 'fas fa-lightbulb',
    color: 'secondary',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
  },
  {
    id: 3,
    title: 'Scale',
    description: 'Strategic expansion across regions through partnerships with governments, NGOs, and private sector. Technology transfer and capacity building ensure sustainable growth.',
    icon: 'fas fa-expand-arrows-alt',
    color: 'accent',
    imageUrl: 'https://images.unsplash.com/photo-1454391304352-2bf4678b1a7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
  },
  {
    id: 4,
    title: 'Sustain',
    description: 'Long-term community ownership and maintenance systems. Financial sustainability models and continuous monitoring ensure lasting impact.',
    icon: 'fas fa-leaf',
    color: 'primary',
    imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
  },
];

export function TheoryTimeline() {
  return (
    <section id="theory" className="py-20 bg-gradient-to-b from-card to-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-accent">
            Our <span className="text-gradient">Theory of Change</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From identifying challenges to creating sustainable impact - our proven methodology transforms communities across Sub-Saharan Africa.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-primary via-secondary to-accent h-full hidden md:block"></div>
          
          <div className="space-y-16">
            {theoryStages.map((stage, index) => (
              <TimelineStage
                key={stage.id}
                stage={stage}
                index={index}
                isEven={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineStage({ 
  stage, 
  index, 
  isEven 
}: { 
  stage: TheoryStage; 
  index: number; 
  isEven: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className={`flex flex-col md:flex-row items-center ${!isEven ? 'md:flex-row-reverse' : ''}`}
      data-testid={`theory-stage-${stage.id}`}
    >
      {/* Content */}
      <div className={`w-full md:w-1/2 ${isEven ? 'md:pr-8' : 'md:pl-8'} mb-6 md:mb-0`}>
        <Card className="card-hover">
          <CardContent className="p-8">
            <div className={`flex items-center mb-4 ${!isEven ? 'md:justify-end' : ''}`}>
              {isEven && (
                <div className={`w-16 h-16 bg-${stage.color}/10 rounded-full flex items-center justify-center mr-4`}>
                  <i className={`${stage.icon} text-2xl text-${stage.color}`}></i>
                </div>
              )}
              <h3 className="text-2xl font-bold text-foreground">{stage.title}</h3>
              {!isEven && (
                <div className={`w-16 h-16 bg-${stage.color}/10 rounded-full flex items-center justify-center ml-4`}>
                  <i className={`${stage.icon} text-2xl text-${stage.color}`}></i>
                </div>
              )}
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {stage.description}
            </p>
            <div className={`flex ${!isEven ? 'md:justify-end' : ''}`}>
              <Button
                variant="ghost"
                className={`text-${stage.color} hover:text-${stage.color}/80 p-0`}
                data-testid={`button-watch-process-${stage.id}`}
              >
                <i className="fas fa-play-circle mr-2"></i>
                Watch Process
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Timeline Circle (Desktop) */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-card rounded-full flex items-center justify-center z-10 border-4 border-background hidden md:flex">
        <span className={`text-${stage.color} font-bold`}>{stage.id}</span>
      </div>
      
      {/* Image */}
      <div className={`w-full md:w-1/2 ${!isEven ? 'md:pr-8' : 'md:pl-8'}`}>
        <img
          src={stage.imageUrl}
          alt={`${stage.title} process illustration`}
          className="rounded-xl shadow-lg w-full h-auto"
        />
      </div>
    </motion.div>
  );
}
