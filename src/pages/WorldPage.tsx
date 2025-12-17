import { useState, useEffect } from 'react';
import { MapPin, Clock, Eye, Globe } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Page } from '../components/Router';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { articleService } from '../services/articleService';
import { Article } from '../lib/api';

interface WorldPageProps {
  onNavigate: (page: Page, blogId?: string) => void;
}

export function WorldPage({ onNavigate }: WorldPageProps) {
  const [selectedContinent, setSelectedContinent] = useState('all');
  const [currentTab, setCurrentTab] = useState('latest');
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch articles from MongoDB
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const fetchedArticles = await articleService.getArticles('World');
        setArticles(fetchedArticles);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const filteredBlogs = articles.filter((blog) => {
    if (selectedContinent === 'all') return true;
    if (selectedContinent === 'multiplecontinents') {
      return blog.continent?.toLowerCase() === 'multiple';
    }
    return blog.continent?.toLowerCase() === selectedContinent.toLowerCase();
  });

  const sortedBlogs = [...filteredBlogs].sort((a, b) => {
    return new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime();
  });

  const continents = ['Europe', 'Asia', 'North America', 'South America', 'Africa', 'Oceania', 'Multiple Continents'];

  if (loading) {
    return (
      <div className="min-h-screen bg-travel-beige flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-travel-teal mx-auto mb-4"></div>
          <p className="text-gray-600">Loading articles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-travel-beige">
      {/* Hero Banner */}
      <div className="relative h-96 overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1503221043305-f7498f8b7888?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3JsZCUyMHRyYXZlbCUyMGFkdmVudHVyZXxlbnwxfHx8fDE3NTk4NDA3NjN8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="World Travel"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 gradient-overlay"></div>
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="text-white">
            <h1 className="text-5xl md:text-6xl font-serif mb-4 text-shadow">Explore the World</h1>
            <p className="text-xl md:text-2xl text-shadow font-light">Adventures across continents and cultures</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-white shadow-sm">
                <TabsTrigger 
                  value="latest" 
                  className="data-[state=active]:bg-gray-200 data-[state=active]:text-gray-800 data-[state=active]:shadow-md transition-all duration-200"
                >
                  Latest
                </TabsTrigger>
                <TabsTrigger 
                  value="continents" 
                  className="data-[state=active]:bg-gray-200 data-[state=active]:text-gray-800 data-[state=active]:shadow-md transition-all duration-200"
                >
                  Continents
                </TabsTrigger>
              </TabsList>

              <TabsContent value="latest" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedBlogs.map((blog) => (
                    <WorldBlogCard key={blog.id} blog={blog} onNavigate={onNavigate} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="continents" className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                  {continents.map((continent) => (
                    <Button 
                      key={continent} 
                      variant={selectedContinent === continent.toLowerCase().replace(' ', '') ? 'default' : 'outline'}
                      className={`h-12 hover:bg-travel-teal hover:text-white transition-colors ${
                        selectedContinent === continent.toLowerCase().replace(' ', '') ? 'bg-teal-600 text-white' : ''
                      }`}
                      onClick={() => setSelectedContinent(continent.toLowerCase().replace(' ', ''))}
                    >
                      {continent}
                    </Button>
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedBlogs.map((blog) => (
                    <WorldBlogCard key={blog.id} blog={blog} onNavigate={onNavigate} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            {/* Load More Button */}
            <div className="text-center mt-12">
              <Button className="bg-travel-teal hover:bg-travel-teal-dark text-white px-8 py-3">
                Load More Adventures
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 space-y-6">
            {/* Continent Filter */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="font-serif text-xl mb-4">Filter by Continent</h3>
              <Select value={selectedContinent} onValueChange={setSelectedContinent}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a continent" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Continents</SelectItem>
                  {continents.map(continent => (
                    <SelectItem key={continent} value={continent.toLowerCase().replace(' ', '')}>
                      {continent}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* World Statistics */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="font-serif text-xl mb-4">Travel Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Countries Visited</span>
                  <span className="font-medium text-travel-teal">47</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Continents Explored</span>
                  <span className="font-medium text-travel-teal">6</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Miles Traveled</span>
                  <span className="font-medium text-travel-teal">125K+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Stories Shared</span>
                  <span className="font-medium text-travel-teal">89</span>
                </div>
              </div>
            </div>

            {/* Popular Countries */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="font-serif text-xl mb-4">Popular Countries</h3>
              <div className="space-y-3">
                {['Italy', 'Japan', 'Iceland', 'New Zealand', 'Peru', 'Morocco'].map((country, index) => (
                  <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-2 text-travel-teal" />
                      <span className="text-gray-700">{country}</span>
                    </div>
                    <Badge variant="secondary">{Math.floor(Math.random() * 15) + 3} posts</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WorldBlogCard({ blog, onNavigate }: { blog: any; onNavigate: (page: Page, blogId?: string) => void }) {
  return (
    <div className="bg-white rounded-xl shadow-lg hover-lift cursor-pointer overflow-hidden group">
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <Badge className="bg-travel-gold text-white">{blog.continent}</Badge>
        </div>
        {blog.isPopular && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-travel-teal text-white">Popular</Badge>
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center text-sm text-travel-sage mb-2 space-x-4">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            {blog.location}
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {blog.readTime}
          </div>
          <div className="flex items-center">
            <Eye className="h-4 w-4 mr-1" />
            {blog.views}
          </div>
        </div>
        <h3 className="font-serif text-xl mb-3 line-clamp-2 group-hover:text-travel-teal transition-colors">
          {blog.title}
        </h3>
        <p className="text-gray-600 line-clamp-3 mb-4">{blog.excerpt}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {blog.tags.slice(0, 3).map((tag: string, index: number) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <Button 
          onClick={() => onNavigate('blog', blog.id)}
          className="w-full bg-travel-teal hover:bg-travel-teal-dark text-white"
        >
          Read More
        </Button>
      </div>
    </div>
  );
}