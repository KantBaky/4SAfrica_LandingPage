import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { COUNTRIES, SDGS, SOLUTION_TOOLS } from '@/types/sustainability';
import type { Solution } from '@shared/schema';

// Mock solutions data
const mockSolutions: Solution[] = [
  {
    id: '1',
    title: 'Smart Grid Nigeria',
    description: 'AI-powered microgrid system serving 15,000 rural households with reliable solar energy and smart load balancing.',
    imageUrl: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    country: 'nigeria',
    sdg: 'sdg7',
    tools: ['ai', 'iot'],
    status: 'active',
    beneficiaries: 15000,
    createdAt: null,
  },
  {
    id: '2',
    title: 'AgriSense Kenya',
    description: 'IoT sensor network providing real-time soil and weather data to optimize crop yields for smallholder farmers.',
    imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    country: 'kenya',
    sdg: 'sdg2',
    tools: ['iot', 'mobile'],
    status: 'active',
    beneficiaries: 8500,
    createdAt: null,
  },
  {
    id: '3',
    title: 'WaterWatch Ghana',
    description: 'Mobile-based water quality monitoring and distribution system ensuring safe drinking water for 30+ communities.',
    imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    country: 'ghana',
    sdg: 'sdg6',
    tools: ['mobile', 'iot'],
    status: 'active',
    beneficiaries: 25000,
    createdAt: null,
  },
  {
    id: '4',
    title: 'EduAI Senegal',
    description: 'AI-powered adaptive learning platform delivering personalized education content in local languages to rural schools.',
    imageUrl: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    country: 'senegal',
    sdg: 'sdg4',
    tools: ['ai', 'mobile'],
    status: 'active',
    beneficiaries: 12000,
    createdAt: null,
  },
  {
    id: '5',
    title: 'Carbon Track Uganda',
    description: 'Blockchain-based carbon credit system enabling smallholder farmers to monetize sustainable farming practices.',
    imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    country: 'uganda',
    sdg: 'sdg13',
    tools: ['blockchain', 'iot'],
    status: 'pilot',
    beneficiaries: 5000,
    createdAt: null,
  },
  {
    id: '6',
    title: 'WindSmart Ghana',
    description: 'AI-optimized wind farm management system maximizing energy output while reducing environmental impact.',
    imageUrl: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    country: 'ghana',
    sdg: 'sdg7',
    tools: ['ai', 'iot'],
    status: 'active',
    beneficiaries: 40000,
    createdAt: null,
  },
];

export function SolutionsGrid() {
  const [solutions, setSolutions] = useState<Solution[]>(mockSolutions);
  const [filteredSolutions, setFilteredSolutions] = useState<Solution[]>(mockSolutions);
  const [filters, setFilters] = useState({
    sdg: '',
    country: '',
    tool: '',
  });

  useEffect(() => {
    let filtered = solutions;

    if (filters.sdg) {
      filtered = filtered.filter(solution => solution.sdg === filters.sdg);
    }

    if (filters.country) {
      filtered = filtered.filter(solution => solution.country === filters.country);
    }

    if (filters.tool) {
      filtered = filtered.filter(solution => solution.tools.includes(filters.tool));
    }

    setFilteredSolutions(filtered);
  }, [filters, solutions]);

  const clearFilters = () => {
    setFilters({ sdg: '', country: '', tool: '' });
  };

  const getSdgName = (sdgId: string) => {
    return SDGS.find(sdg => sdg.id === sdgId)?.name || sdgId.toUpperCase();
  };

  const getCountryName = (countryId: string) => {
    return COUNTRIES.find(country => country.id === countryId)?.name || countryId;
  };

  const getToolName = (toolId: string) => {
    return SOLUTION_TOOLS.find(tool => tool.id === toolId)?.name || toolId;
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-accent">
            Our <span className="text-gradient">Solutions Portfolio</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Explore our comprehensive range of AI-powered sustainability solutions across different sectors and regions.
          </p>
        </div>

        {/* Filter Controls */}
        <Card className="p-6 mb-12">
          <CardContent className="p-0">
            <div className="flex flex-wrap gap-4 items-center justify-center">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-foreground">Filter by:</label>
              </div>
              
              <Select value={filters.sdg} onValueChange={(value) => setFilters(prev => ({ ...prev, sdg: value }))}>
                <SelectTrigger className="w-40" data-testid="select-filter-sdg">
                  <SelectValue placeholder="All SDGs" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All SDGs</SelectItem>
                  {SDGS.map(sdg => (
                    <SelectItem key={sdg.id} value={sdg.id}>{sdg.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filters.country} onValueChange={(value) => setFilters(prev => ({ ...prev, country: value }))}>
                <SelectTrigger className="w-40" data-testid="select-filter-country">
                  <SelectValue placeholder="All Countries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Countries</SelectItem>
                  {COUNTRIES.map(country => (
                    <SelectItem key={country.id} value={country.id}>
                      {country.flag} {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filters.tool} onValueChange={(value) => setFilters(prev => ({ ...prev, tool: value }))}>
                <SelectTrigger className="w-40" data-testid="select-filter-tool">
                  <SelectValue placeholder="All Tools" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Tools</SelectItem>
                  {SOLUTION_TOOLS.map(tool => (
                    <SelectItem key={tool.id} value={tool.id}>{tool.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                variant="ghost"
                onClick={clearFilters}
                className="text-primary hover:text-primary/80"
                data-testid="button-clear-filters"
              >
                Clear All
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Solutions Grid */}
        {filteredSolutions.length === 0 ? (
          <div className="text-center py-16">
            <i className="fas fa-search text-4xl text-muted-foreground mb-4"></i>
            <h3 className="text-xl font-semibold text-foreground mb-2">No Solutions Found</h3>
            <p className="text-muted-foreground">Try adjusting your filters to see more solutions.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSolutions.map((solution) => (
              <Card key={solution.id} className="overflow-hidden card-hover" data-testid={`card-solution-${solution.id}`}>
                <img
                  src={solution.imageUrl}
                  alt={solution.title}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge className="bg-primary/10 text-primary">
                      {getSdgName(solution.sdg)}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {getCountryName(solution.country)}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{solution.title}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {solution.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {solution.tools.map(tool => (
                        <Badge key={tool} variant="secondary" className="text-xs">
                          {getToolName(tool)}
                        </Badge>
                      ))}
                    </div>
                    <Button
                      variant="ghost"
                      className="text-primary hover:text-primary/80 p-0"
                      data-testid={`button-learn-more-${solution.id}`}
                    >
                      Learn More <i className="fas fa-arrow-right ml-1"></i>
                    </Button>
                  </div>
                  {solution.beneficiaries && (
                    <div className="mt-3 text-sm text-muted-foreground">
                      <i className="fas fa-users mr-1"></i>
                      {solution.beneficiaries.toLocaleString()} beneficiaries
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-secondary text-secondary-foreground px-8 py-4 text-lg font-semibold btn-seed-hover shadow-lg hover:shadow-xl"
            data-testid="button-view-all-solutions"
          >
            <i className="fas fa-plus-circle mr-2"></i>
            View All Solutions
          </Button>
        </div>
      </div>
    </section>
  );
}
