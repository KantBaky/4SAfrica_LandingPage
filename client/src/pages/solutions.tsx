import { SolutionsGrid } from '@/components/portfolio/solutions-grid';
import { SolutionMatchmaker } from '@/components/ai/solution-matchmaker';

export default function Solutions() {
  return (
    <div className="pt-16">
      <section className="py-20 bg-gradient-to-b from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 font-accent">
              Our <span className="text-gradient">Solutions</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover AI-powered sustainability solutions designed for Sub-Saharan Africa's unique challenges and opportunities.
            </p>
          </div>
        </div>
      </section>
      
      <SolutionsGrid />
      <SolutionMatchmaker />
    </div>
  );
}
