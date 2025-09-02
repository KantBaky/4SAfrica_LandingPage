import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function Contact() {
  return (
    <div className="min-h-screen pt-20 pb-16 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-accent">
            Contact <span className="text-gradient">Us</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Get in touch with our team to discuss partnerships, investments, or learn more 
            about our sustainability solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-foreground mb-4">General Inquiries</h3>
              <p className="text-muted-foreground mb-4">
                <i className="fas fa-envelope mr-2"></i>
                info@4ssolutions.com
              </p>
              <p className="text-muted-foreground">
                <i className="fas fa-phone mr-2"></i>
                +234 (0) 123 456 7890
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-foreground mb-4">Partnership Opportunities</h3>
              <p className="text-muted-foreground mb-4">
                <i className="fas fa-envelope mr-2"></i>
                partnerships@4ssolutions.com
              </p>
              <Button className="bg-primary text-primary-foreground btn-seed-hover">
                Schedule a Meeting
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}