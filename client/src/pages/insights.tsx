import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const blogPosts = [
  {
    id: '1',
    title: 'AI-Driven Climate Adaptation in West Africa',
    excerpt: 'How machine learning is helping farmers in Senegal adapt to changing weather patterns and improve crop resilience.',
    author: 'Dr. Amina Kone',
    date: '2024-03-15',
    readTime: '8 min read',
    category: 'Climate Tech',
    tags: ['AI', 'Agriculture', 'West Africa', 'Climate'],
    imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
  },
  {
    id: '2',
    title: 'Solar Microgrids Transform Rural Nigerian Communities',
    excerpt: 'A deep dive into how decentralized renewable energy is bringing reliable electricity to off-grid communities.',
    author: 'Samuel Okafor',
    date: '2024-03-10',
    readTime: '12 min read',
    category: 'Energy Access',
    tags: ['Solar', 'Nigeria', 'Energy', 'Rural Development'],
    imageUrl: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
  },
  {
    id: '3',
    title: 'Water Innovation in East Africa: IoT Sensors Save Lives',
    excerpt: 'Exploring how smart water monitoring systems are ensuring clean water access across Kenya and Uganda.',
    author: 'Grace Mwangi',
    date: '2024-03-05',
    readTime: '10 min read',
    category: 'Water & Sanitation',
    tags: ['IoT', 'Water', 'Kenya', 'Uganda', 'Health'],
    imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
  },
  {
    id: '4',
    title: 'Digital Education Revolution in Rural Ghana',
    excerpt: 'How AI-powered learning platforms are bridging the education gap in remote communities.',
    author: 'Kwame Asante',
    date: '2024-02-28',
    readTime: '6 min read',
    category: 'Education',
    tags: ['Education', 'Ghana', 'Digital Learning', 'AI'],
    imageUrl: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
  },
  {
    id: '5',
    title: 'Carbon Markets: Empowering African Farmers',
    excerpt: 'Understanding how blockchain technology is enabling smallholder farmers to access carbon credit markets.',
    author: 'Dr. Fatou Diallo',
    date: '2024-02-20',
    readTime: '15 min read',
    category: 'Climate Finance',
    tags: ['Blockchain', 'Carbon Credits', 'Agriculture', 'Finance'],
    imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
  },
  {
    id: '6',
    title: 'Impact Investing: Lessons from Sub-Saharan Africa',
    excerpt: 'Key insights from successful impact investments and what investors need to know about the African market.',
    author: 'Michael Banda',
    date: '2024-02-15',
    readTime: '11 min read',
    category: 'Investment',
    tags: ['Impact Investing', 'Africa', 'Finance', 'Sustainability'],
    imageUrl: 'https://images.unsplash.com/photo-1454391304352-2bf4678b1a7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
  }
];

const categories = ['All', 'Climate Tech', 'Energy Access', 'Water & Sanitation', 'Education', 'Climate Finance', 'Investment'];

export default function Insights() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-16">
      <section className="py-20 bg-gradient-to-b from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 font-accent">
              Sustainability <span className="text-gradient">Insights</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Stay informed with the latest research, case studies, and insights from our work across Sub-Saharan Africa.
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search and Filter */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-md"
                data-testid="input-search-articles"
              />
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    data-testid={`button-category-${category.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Articles Grid */}
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <i className="fas fa-search text-4xl text-muted-foreground mb-4"></i>
              <h3 className="text-xl font-semibold text-foreground mb-2">No Articles Found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden card-hover" data-testid={`card-article-${post.id}`}>
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge className="bg-primary/10 text-primary">
                        {post.category}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3 leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        <p className="font-medium">{post.author}</p>
                        <p>{new Date(post.date).toLocaleDateString()}</p>
                      </div>
                      <Button
                        variant="ghost"
                        className="text-primary hover:text-primary/80 p-0"
                        data-testid={`button-read-more-${post.id}`}
                      >
                        Read More <i className="fas fa-arrow-right ml-1"></i>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Load More */}
          {filteredPosts.length > 0 && (
            <div className="text-center mt-12">
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-4 text-lg font-semibold"
                data-testid="button-load-more-articles"
              >
                Load More Articles
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
