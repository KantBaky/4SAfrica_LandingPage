import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import type { InvestmentOpportunity } from '@shared/schema';

interface PipelineStats {
  totalValue: number;
  activeProjects: number;
  avgIrr: number;
}

export function OpportunityPipeline() {
  const { data: opportunities, isLoading: opportunitiesLoading } = useQuery<InvestmentOpportunity[]>({
    queryKey: ['/api/investment-opportunities'],
  });

  const { data: stats, isLoading: statsLoading } = useQuery<PipelineStats>({
    queryKey: ['/api/investment-stats'],
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-primary';
      case 'funding': return 'bg-secondary';
      case 'closed': return 'bg-accent';
      default: return 'bg-muted';
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'seed': return 'text-primary';
      case 'series-a': return 'text-secondary';
      case 'series-b': return 'text-accent';
      default: return 'text-muted-foreground';
    }
  };

  if (opportunitiesLoading || statsLoading) {
    return (
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8 shadow-xl">
            <CardContent className="p-0">
              <div className="space-y-6">
                <Skeleton className="h-8 w-64 mx-auto" />
                <div className="grid md:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-24" />
                  ))}
                </div>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-20" />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 p-8 shadow-xl">
          <CardContent className="p-0">
            <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
              Live Opportunity Pipeline
            </h3>
            
            {/* Pipeline Stats */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="p-6 text-center">
                <CardContent className="p-0">
                  <div className="text-3xl font-bold text-primary mb-2" data-testid="text-total-pipeline-value">
                    ${stats?.totalValue ? (stats.totalValue / 1000000).toFixed(1) : '0'}M
                  </div>
                  <div className="text-muted-foreground">Total Pipeline Value</div>
                </CardContent>
              </Card>
              <Card className="p-6 text-center">
                <CardContent className="p-0">
                  <div className="text-3xl font-bold text-secondary mb-2" data-testid="text-active-projects">
                    {stats?.activeProjects || 0}
                  </div>
                  <div className="text-muted-foreground">Active Projects</div>
                </CardContent>
              </Card>
              <Card className="p-6 text-center">
                <CardContent className="p-0">
                  <div className="text-3xl font-bold text-accent mb-2" data-testid="text-avg-irr">
                    {stats?.avgIrr || 0}%
                  </div>
                  <div className="text-muted-foreground">Avg. IRR</div>
                </CardContent>
              </Card>
            </div>

            {/* Pipeline Projects */}
            <div className="space-y-4">
              {opportunities?.slice(0, 5).map((opportunity) => (
                <Card key={opportunity.id} className="p-6" data-testid={`card-opportunity-${opportunity.id}`}>
                  <CardContent className="p-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(opportunity.status)}`}></div>
                        <div>
                          <h4 className="font-semibold text-foreground">{opportunity.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            <span className={`capitalize ${getStageColor(opportunity.stage)}`}>
                              {opportunity.stage.replace('-', ' ')}
                            </span>
                            {' • '}
                            {opportunity.sector}
                            {' • '}
                            {opportunity.beneficiaries?.toLocaleString()} beneficiaries
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-foreground">
                          ${(opportunity.fundingTarget / 1000000).toFixed(1)}M
                        </div>
                        <div className="text-sm text-muted-foreground">Seeking</div>
                        {opportunity.currentFunding && opportunity.currentFunding > 0 && (
                          <div className="mt-2">
                            <Progress 
                              value={(opportunity.currentFunding / opportunity.fundingTarget) * 100} 
                              className="w-24"
                            />
                            <div className="text-xs text-muted-foreground mt-1">
                              ${(opportunity.currentFunding / 1000000).toFixed(1)}M raised
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )) || (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No investment opportunities available at this time.</p>
                </div>
              )}
            </div>

            <div className="text-center mt-8">
              <Button
                className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold btn-seed-hover"
                data-testid="button-view-full-pipeline"
              >
                View Full Pipeline
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
