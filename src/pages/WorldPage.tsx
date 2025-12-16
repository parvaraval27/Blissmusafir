import { useState } from 'react';
import { MapPin, Clock, Eye, Globe } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Page } from '../components/Router';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface WorldPageProps {
  onNavigate: (page: Page, blogId?: string) => void;
}

// Mock world blog data
const mockWorldBlogs = [
  {
    id: '5',
    title: 'Swiss Alps: A Journey to Heaven on Earth',
    excerpt: 'Experience the breathtaking beauty of snow-capped peaks, pristine lakes, and charming Alpine villages.',
    image: 'https://images.unsplash.com/photo-1608587069812-9a452271350c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2lzcyUyMGFscHMlMjBtb3VudGFpbnN8ZW58MXx8fHwxNzU5ODczMjQxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'World',
    location: 'Switzerland',
    continent: 'Europe',
    author: 'Emma Thompson',
    readTime: '12 min read',
    views: 1456,
    date: '2025-01-20',
    tags: ['Mountains', 'Nature', 'Photography'],
    isPopular: true
  },
  {
    id: '6',
    title: 'Paris: The City of Light and Love',
    excerpt: 'Discover the romantic charm of Paris with its iconic landmarks, world-class cuisine, and artistic heritage.',
    image: 'https://images.unsplash.com/photo-1602828959545-11dd10955196?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJpcyUyMGVpZmZlbCUyMHRvd2VyJTIwZXVyb3BlfGVufDF8fHx8MTc1OTg3MzI0MHww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'World',
    location: 'Paris, France',
    continent: 'Europe',
    author: 'Sophie Martin',
    readTime: '10 min read',
    views: 2134,
    date: '2025-01-18',
    tags: ['Culture', 'Architecture', 'Food'],
    isPopular: true
  },
  {
    id: '7',
    title: 'Bali: Island of the Gods',
    excerpt: 'Immerse yourself in the spiritual beauty of Bali with its ancient temples, lush rice terraces, and pristine beaches.',
    image: 'https://images.unsplash.com/photo-1604394089666-6d365c060c6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxpJTIwdGVtcGxlJTIwaW5kb25lc2lhfGVufDF8fHx8MTc1OTg3MzI0MXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'World',
    location: 'Bali, Indonesia',
    continent: 'Asia',
    author: 'Lisa Chen',
    readTime: '14 min read',
    views: 1823,
    date: '2025-01-15',
    tags: ['Temples', 'Beach', 'Spirituality'],
    isPopular: true
  },
  {
    id: '8',
    title: 'Tokyo: Where Tradition Meets Innovation',
    excerpt: 'Experience the fascinating contrast of ultra-modern Tokyo with its ancient traditions and incredible street food culture.',
    image: 'https://images.unsplash.com/photo-1614147892684-ce0bdcbaf582?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMGphcGFuJTIwc3RyZWV0fGVufDF8fHx8MTc1OTg3Mjc1NHww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'World',
    location: 'Tokyo, Japan',
    continent: 'Asia',
    author: 'Kenji Tanaka',
    readTime: '11 min read',
    views: 1672,
    date: '2025-01-12',
    tags: ['Urban', 'Culture', 'Technology'],
    isPopular: false
  },
  {
    id: '9',
    title: 'Santorini: Sunset Paradise in the Aegean',
    excerpt: 'Witness the world\'s most beautiful sunsets from the cliff-top villages of this iconic Greek island.',
    image: 'https://images.unsplash.com/photo-1650878201492-0c8039ff8ae6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dGlmdWwlMjBiZWFjaCUyMHN1bnNldHxlbnwxfHx8fDE3NTk4NzMxOTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'World',
    location: 'Santorini, Greece',
    continent: 'Europe',
    readTime: '9 min read',
    views: 1956,
    date: '2025-01-08',
    tags: ['Island', 'Sunset', 'Romance'],
    isPopular: true
  }
];

export function WorldPage({ onNavigate }: WorldPageProps) {
  const [selectedContinent, setSelectedContinent] = useState('all');
  const [currentTab, setCurrentTab] = useState('latest');

  const filteredBlogs = mockWorldBlogs.filter(blog => {
    if (selectedContinent === 'all') return true;
    return blog.continent.toLowerCase() === selectedContinent.toLowerCase();
  });

  const sortedBlogs = [...filteredBlogs].sort((a, b) => {
    if (currentTab === 'popular') {
      return b.views - a.views;
    }
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const continents = ['Europe', 'Asia', 'North America', 'South America', 'Africa', 'Oceania'];

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
              <TabsList className="grid w-full grid-cols-3 mb-8 bg-white shadow-sm">
                <TabsTrigger 
                  value="latest" 
                  className="data-[state=active]:bg-travel-teal data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200"
                >
                  Latest
                </TabsTrigger>
                <TabsTrigger 
                  value="popular" 
                  className="data-[state=active]:bg-travel-teal data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200"
                >
                  Popular
                </TabsTrigger>
                <TabsTrigger 
                  value="continents" 
                  className="data-[state=active]:bg-travel-teal data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200"
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

              <TabsContent value="popular" className="space-y-6">
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
                      variant="outline" 
                      className="h-12 hover:bg-travel-teal hover:text-white transition-colors"
                      onClick={() => setSelectedContinent(continent.toLowerCase())}
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
                    <SelectItem key={continent} value={continent.toLowerCase()}>
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