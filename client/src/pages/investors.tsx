import { OpportunityPipeline } from '@/components/investor/opportunity-pipeline';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const investmentBriefs = [
  {
    title: 'Nigeria Investment Brief',
    description: 'Comprehensive analysis of energy access opportunities and market potential in Nigeria\'s rural regions.',
    icon: 'fas fa-file-pdf',
    downloadUrl: '/briefs/nigeria-investment-brief.pdf'
  },
  {
    title: 'Kenya AgriTech Report',
    description: 'Market analysis and investment opportunities in Kenya\'s rapidly growing agricultural technology sector.',
    icon: 'fas fa-file-pdf',
    downloadUrl: '/briefs/kenya-agritech-report.pdf'
  },
  {
    title: 'Regional Impact Study',
    description: 'Cross-country analysis of sustainable development investment returns and social impact metrics.',
    icon: 'fas fa-file-pdf',
    downloadUrl: '/briefs/regional-impact-study.pdf'
  }
];

export default function Investors() {
  return (
    <div className="pt-16">
      <section className="py-20 bg-gradient-to-b from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 font-accent">
              Investor <span className="text-gradient">Hub</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Join us in driving sustainable development across Sub-Saharan Africa. Explore investment opportunities with measurable impact and strong returns.
            </p>
          </div>
        </div>
      </section>
      
      <OpportunityPipeline />
      
      {/* Investment Briefs Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Investment Resources</h2>
            <p className="text-lg text-muted-foreground">
              Download our comprehensive investment briefs and market analysis reports.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {investmentBriefs.map((brief, index) => (
              <Card key={index} className="p-6">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    <i className={`${brief.icon} text-2xl text-destructive mr-3`}></i>
                    <h4 className="font-bold text-foreground">{brief.title}</h4>
                  </div>
                  <p className="text-muted-foreground mb-4">{brief.description}</p>
                  <Button
                    variant="ghost"
                    className="text-primary hover:text-primary/80 p-0"
                    data-testid={`button-download-${index}`}
                  >
                    Download PDF <i className="fas fa-download ml-1"></i>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* CTA Section */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Invest in Africa's Future?</h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Schedule a meeting with our investment team to explore partnership opportunities and due diligence materials.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-secondary text-secondary-foreground px-8 py-4 text-lg font-semibold btn-seed-hover shadow-lg hover:shadow-xl"
                data-testid="button-schedule-meeting"
              >
                <i className="fas fa-calendar-alt mr-2"></i>
                Schedule Meeting
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-secondary text-secondary px-8 py-4 text-lg font-semibold btn-seed-hover hover:bg-secondary hover:text-secondary-foreground"
                data-testid="button-request-info-pack"
              >
                <i className="fas fa-envelope mr-2"></i>
                Request Info Pack
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
