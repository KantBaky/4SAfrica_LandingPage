import { Card, CardContent } from '@/components/ui/card';

export default function Privacy() {
  return (
    <div className="min-h-screen pt-20 pb-16 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-accent">
            Privacy <span className="text-gradient">Policy</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Your privacy is important to us. Learn how we collect, use, and protect your information.
          </p>
        </div>

        <Card>
          <CardContent className="p-8">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-foreground mb-4">Information We Collect</h2>
              <p className="text-muted-foreground mb-6">
                We collect information to provide better services to our users and partners. 
                This includes data you provide directly, usage information, and technical data.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">How We Use Information</h2>
              <p className="text-muted-foreground mb-6">
                We use collected information to improve our services, communicate with users, 
                and advance our mission of sustainable development in Sub-Saharan Africa.
              </p>

              <h2 className="text-2xl font-bold text-foreground mb-4">Data Protection</h2>
              <p className="text-muted-foreground">
                We implement appropriate security measures to protect your personal information 
                and ensure compliance with applicable data protection regulations.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}