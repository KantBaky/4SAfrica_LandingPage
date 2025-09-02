import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="min-h-screen pt-20 pb-16 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-accent">
            {title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        <Card>
          <CardContent className="p-8 text-center">
            <i className="fas fa-cogs text-4xl text-muted-foreground mb-4"></i>
            <h2 className="text-2xl font-bold text-foreground mb-4">Coming Soon</h2>
            <p className="text-muted-foreground mb-6">
              This page is currently under development. Check back soon for updates!
            </p>
            <Button className="bg-primary text-primary-foreground btn-seed-hover">
              <i className="fas fa-home mr-2"></i>
              Return Home
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Individual placeholder page components
export function TeamPage() {
  return (
    <PlaceholderPage 
      title="Our Team" 
      description="Meet the talented individuals working to transform sustainability across Sub-Saharan Africa."
    />
  );
}

export function CareersPage() {
  return (
    <PlaceholderPage 
      title="Careers" 
      description="Join our mission to create sustainable solutions for Africa's future."
    />
  );
}

export function PressPage() {
  return (
    <PlaceholderPage 
      title="Press & Media" 
      description="Latest news, press releases, and media coverage about 4S."
    />
  );
}

export function ResearchPage() {
  return (
    <PlaceholderPage 
      title="Research" 
      description="Explore our research publications and findings on sustainability in Sub-Saharan Africa."
    />
  );
}

export function CaseStudiesPage() {
  return (
    <PlaceholderPage 
      title="Case Studies" 
      description="Real-world examples of our AI-powered sustainability solutions in action."
    />
  );
}

export function DocsPage() {
  return (
    <PlaceholderPage 
      title="Documentation" 
      description="Technical documentation and resources for our sustainability platform."
    />
  );
}

export function SupportPage() {
  return (
    <PlaceholderPage 
      title="Support" 
      description="Get help and support for our sustainability solutions and platforms."
    />
  );
}

export function TermsPage() {
  return (
    <PlaceholderPage 
      title="Terms of Service" 
      description="Terms and conditions for using 4S services and platforms."
    />
  );
}

export function CookiesPage() {
  return (
    <PlaceholderPage 
      title="Cookie Policy" 
      description="Information about how we use cookies to improve your experience."
    />
  );
}