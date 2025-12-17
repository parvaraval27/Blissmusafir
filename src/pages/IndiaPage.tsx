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

interface IndiaPageProps {
  onNavigate: (page: Page, blogId?: string) => void;
}

const blogs = [
  {
    id: '1',
    title: 'Taj Mahal: A Symbol of Love',
    excerpt: 'Explore the stunning beauty of the Taj Mahal, a UNESCO World Heritage Site and one of the Seven Wonders of the Modern World.',
    image: 'https://images.unsplash.com/photo-1685850749074-9cf8023d7e8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYSUyMHRyYXZlbCUyMGRlc3RpbmF0aW9ufGVufDF8fHx8MTc1OTg3MzE5Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'India',
    location: 'Agra, Uttar Pradesh',
    author: 'Priya Sharma',
    readTime: '8 min read',
    views: 1205,
    date: '2025-01-15',
    tags: ['Architecture', 'History', 'UNESCO'],
    isPopular: true
  },
  {
    id: '2',
    title: 'Kerala Backwaters: Floating Through Paradise',
    excerpt: 'Journey through the serene waterways of God\'s Own Country and experience traditional houseboat life.',
    image: 'https://images.unsplash.com/photo-1680599022555-57fb95b64b5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXJhbGElMjBiYWNrd2F0ZXJzJTIwaW5kaWF8ZW58MXx8fHwxNzU5ODczMjQwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'India',
    location: 'Alleppey, Kerala',
    author: 'Ravi Kumar',
    readTime: '12 min read',
    views: 892,
    date: '2025-01-10',
    tags: ['Nature', 'Waterways', 'Culture'],
    isPopular: true
  },
  {
    id: '3',
    title: 'Rajasthan Desert Safari: Golden Dunes Adventure',
    excerpt: 'Experience the magic of the Thar Desert with camel rides, folk music, and starlit nights.',
    image: 'https://images.unsplash.com/photo-1685850749074-9cf8023d7e8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYSUyMHRyYXZlbCUyMGRlc3RpbmF0aW9ufGVufDF8fHx8MTc1OTg3MzE5Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'India',
    location: 'Jaisalmer, Rajasthan',
    author: 'Arjun Singh',
    readTime: '10 min read',
    views: 756,
    date: '2025-01-05',
    tags: ['Desert', 'Adventure', 'Culture'],
    isPopular: false
  },
  {
    id: '4',
    title: 'Himalayan Heights: Trekking in Ladakh',
    excerpt: 'Journey to the roof of the world and discover the breathtaking landscapes of the Himalayas.',
    image: 'https://images.unsplash.com/photo-1596693097925-9d818cc9692d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxhbmRzY2FwZSUyMG5jZW5pYyUyMHZpZXd8ZW58MXx8fHwxNzU5ODczMTk2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'India',
    location: 'Leh, Ladakh',
    author: 'Maya Patel',
    readTime: '15 min read',
    views: 1034,
    date: '2025-01-01',
    tags: ['Mountains', 'Trekking', 'Adventure'],
    isPopular: true
  }
];

function IndiaBlogCard({ blog, onNavigate }: { blog: any; onNavigate: (page: Page, blogId?: string) => void }) {
  return (
    <div className="bg-white rounded-xl shadow-lg hover-lift cursor-pointer overflow-hidden group">
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <Badge className="bg-travel-gold text-white">India</Badge>
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
            {blog.location || 'India'}
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {blog.readTime}
          </div>
          <div className="flex items-center">
            <Eye className="h-4 w-4 mr-1" />
            {blog.views || 0}
          </div>
        </div>
        <h3 className="font-serif text-xl mb-3 line-clamp-2 group-hover:text-travel-teal transition-colors">
          {blog.title}
        </h3>
        <p className="text-gray-600 line-clamp-3 mb-4">{blog.subtitle || blog.content?.replace(/<[^>]*>/g, '').substring(0, 150) + '...'}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {(blog.tags || []).slice(0, 3).map((tag: string, index: number) => (
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

export function IndiaPage({ onNavigate }: IndiaPageProps) {
  const [selectedTag, setSelectedTag] = useState('all');
  const [currentTab, setCurrentTab] = useState('latest');
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch articles from MongoDB
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const fetchedArticles = await articleService.getArticles('India');
        setArticles(fetchedArticles);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const filteredArticles = articles.filter((article) => {
    if (selectedTag === 'all') return true;
    return article.tags?.includes(selectedTag);
  });

  const sortedArticles = [...filteredArticles].sort((a, b) => {
    return new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime();
  });

  // Get unique tags from all articles
  const getAllTags = () => {
    const allTags = new Set<string>();
    articles.forEach((article) => {
      if (article.tags && Array.isArray(article.tags)) {
        article.tags.forEach((tag: string) => allTags.add(tag));
      }
    });
    return Array.from(allTags);
  };

  const allTags = getAllTags();

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
          src="https://images.unsplash.com/photo-1582510003544-4d00b7f74220?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080"
          alt="India Travel"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 gradient-overlay"></div>
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="text-white">
            <h1 className="text-5xl md:text-6xl font-serif mb-4 text-shadow">Discover India</h1>
            <p className="text-xl md:text-2xl text-shadow font-light">From ancient temples to pristine beaches</p>
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
                  value="tags" 
                  className="data-[state=active]:bg-gray-200 data-[state=active]:text-gray-800 data-[state=active]:shadow-md transition-all duration-200"
                >
                  Tags
                </TabsTrigger>
              </TabsList>

              <TabsContent value="latest" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedArticles.map((article) => (
                    <IndiaBlogCard key={article.id} blog={article} onNavigate={onNavigate} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="tags" className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                  <Button 
                    variant="outline" 
                    className="h-12 hover:bg-travel-teal hover:text-white transition-colors"
                    onClick={() => setSelectedTag('all')}
                  >
                    All Tags
                  </Button>
                  {allTags.map((tag) => (
                    <Button 
                      key={tag} 
                      variant="outline" 
                      className="h-12 hover:bg-travel-teal hover:text-white transition-colors"
                      onClick={() => setSelectedTag(tag)}
                    >
                      {tag}
                    </Button>
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedArticles.map((article) => (
                    <IndiaBlogCard key={article.id} blog={article} onNavigate={onNavigate} />
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
            {/* Tag Filter */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="font-serif text-xl mb-4">Filter by Tag</h3>
              <Select value={selectedTag} onValueChange={setSelectedTag}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a tag" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tags</SelectItem>
                  {allTags.map(tag => (
                    <SelectItem key={tag} value={tag}>
                      {tag}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* India Statistics */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="font-serif text-xl mb-4">Travel Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">States Visited</span>
                  <span className="font-medium text-travel-teal">28</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Cities Explored</span>
                  <span className="font-medium text-travel-teal">156</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Miles Traveled</span>
                  <span className="font-medium text-travel-teal">45K+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Stories Shared</span>
                  <span className="font-medium text-travel-teal">67</span>
                </div>
              </div>
            </div>

            {/* Popular States */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="font-serif text-xl mb-4">Popular States</h3>
              <div className="space-y-3">
                {['Rajasthan', 'Kerala', 'Himachal Pradesh', 'Goa', 'Uttarakhand', 'Tamil Nadu'].map((state, index) => (
                  <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-2 text-travel-teal" />
                      <span className="text-gray-700">{state}</span>
                    </div>
                    <Badge variant="secondary">{Math.floor(Math.random() * 12) + 3} posts</Badge>
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