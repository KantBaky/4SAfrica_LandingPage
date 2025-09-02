import { ImpactCalculator } from '@/components/ai/impact-calculator';

export default function Impact() {
  return (
    <div className="pt-16">
      <section className="py-20 bg-gradient-to-b from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 font-accent">
              Measure Your <span className="text-gradient">Impact</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Use our AI-powered tools to calculate and visualize the potential impact of sustainability initiatives across Sub-Saharan Africa.
            </p>
          </div>
        </div>
      </section>
      
      <ImpactCalculator />
    </div>
  );
}
