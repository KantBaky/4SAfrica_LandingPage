import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function About() {
  return (
    <div className="min-h-screen pt-20 pb-16 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-accent">
            About <span className="text-gradient">4S</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Sub-Saharan Sustainability Solutions is pioneering AI-powered sustainability solutions 
            across Africa, transforming challenges into opportunities for lasting impact.
          </p>
        </div>

        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              To accelerate sustainable development across Sub-Saharan Africa through innovative 
              AI-powered solutions that address local challenges while creating lasting positive 
              impact for communities and the environment.
            </p>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button className="bg-primary text-primary-foreground btn-seed-hover">
            Learn More About Our Work
          </Button>
        </div>
      </div>
    </div>
  );
}