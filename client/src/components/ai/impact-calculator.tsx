import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { aiService } from '@/lib/ai-service';
import { COUNTRIES, SDGS } from '@/types/sustainability';
import type { ImpactMetrics } from '@/types/sustainability';

const calculatorSchema = z.object({
  country: z.string().min(1, 'Please select a country'),
  population: z.number().min(1, 'Population must be greater than 0'),
  solutionType: z.string().min(1, 'Please select a solution type'),
  budget: z.number().min(1000, 'Budget must be at least $1,000'),
  selectedSdgs: z.array(z.string()).min(1, 'Please select at least one SDG'),
});

type CalculatorForm = z.infer<typeof calculatorSchema>;

const solutionTypes = [
  { value: 'solar', label: 'Solar Energy' },
  { value: 'agriculture', label: 'Smart Agriculture' },
  { value: 'water', label: 'Water Management' },
  { value: 'education', label: 'Digital Education' },
  { value: 'healthcare', label: 'Mobile Healthcare' },
];

export function ImpactCalculator() {
  const [results, setResults] = useState<ImpactMetrics | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const { toast } = useToast();

  const form = useForm<CalculatorForm>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      country: '',
      population: 0,
      solutionType: '',
      budget: 0,
      selectedSdgs: [],
    },
  });

  const onSubmit = async (data: CalculatorForm) => {
    setIsCalculating(true);
    try {
      const impact = await aiService.calculateImpact(data);
      setResults(impact);
      toast({
        title: "Impact Calculated",
        description: "Your sustainability impact projection is ready!",
      });
    } catch (error) {
      toast({
        title: "Calculation Error",
        description: "Failed to calculate impact. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <section id="impact" className="py-20 bg-gradient-to-b from-primary/5 to-secondary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-accent">
            AI <span className="text-gradient">Impact Calculator</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover the potential impact of sustainable solutions in your region. Our AI analyzes multiple factors to project outcomes.
          </p>
        </div>

        <Card className="max-w-4xl mx-auto shadow-xl">
          <CardContent className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country/Region</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-country">
                              <SelectValue placeholder="Select a country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {COUNTRIES.map((country) => (
                              <SelectItem key={country.id} value={country.id}>
                                {country.flag} {country.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="population"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Population Size</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="e.g., 50000"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            data-testid="input-population"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="solutionType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Solution Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-solution-type">
                              <SelectValue placeholder="Select solution type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {solutionTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="budget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Investment Budget (USD)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="e.g., 100000"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                            data-testid="input-budget"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="selectedSdgs"
                  render={() => (
                    <FormItem>
                      <FormLabel className="text-base">Priority SDGs</FormLabel>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {SDGS.map((sdg) => (
                          <FormField
                            key={sdg.id}
                            control={form.control}
                            name="selectedSdgs"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(sdg.id)}
                                    onCheckedChange={(checked) => {
                                      const value = field.value || [];
                                      return checked
                                        ? field.onChange([...value, sdg.id])
                                        : field.onChange(value.filter(id => id !== sdg.id));
                                    }}
                                    data-testid={`checkbox-sdg-${sdg.id}`}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  {sdg.name}
                                </FormLabel>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                    </FormItem>
                  )}
                />

                <div className="text-center">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isCalculating}
                    className="bg-primary text-primary-foreground px-8 py-4 text-lg font-semibold btn-seed-hover shadow-lg hover:shadow-xl"
                    data-testid="button-calculate-impact"
                  >
                    <i className="fas fa-calculator mr-2"></i>
                    {isCalculating ? 'Calculating...' : 'Calculate Impact'}
                  </Button>
                </div>
              </form>
            </Form>

            {/* Results Section */}
            {results && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mt-12 border-t border-border pt-8"
              >
                <h3 className="text-2xl font-bold text-foreground mb-6 text-center">Projected Impact</h3>
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-6 bg-primary/10 rounded-xl">
                    <div className="text-3xl font-bold text-primary mb-2" data-testid="text-people-impacted">
                      {results.peopleImpacted.toLocaleString()}
                    </div>
                    <div className="text-muted-foreground">People Directly Impacted</div>
                  </div>
                  <div className="text-center p-6 bg-secondary/10 rounded-xl">
                    <div className="text-3xl font-bold text-secondary mb-2" data-testid="text-co2-reduction">
                      {results.co2Reduction.toLocaleString()}
                    </div>
                    <div className="text-muted-foreground">Tons CO₂ Reduced/Year</div>
                  </div>
                  <div className="text-center p-6 bg-accent/10 rounded-xl">
                    <div className="text-3xl font-bold text-accent mb-2" data-testid="text-jobs-created">
                      {results.jobsCreated.toLocaleString()}
                    </div>
                    <div className="text-muted-foreground">Jobs Created</div>
                  </div>
                </div>
                <div className="p-6 bg-muted/50 rounded-xl">
                  <h4 className="font-semibold text-foreground mb-3">Recommended Actions:</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    {results.recommendations.map((rec, index) => (
                      <li key={index} data-testid={`text-recommendation-${index}`}>
                        • {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
