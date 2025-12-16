import { ArrowLeft, ArrowRight, Calendar, Clock, Eye, MapPin, Share2, Heart, Bookmark } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { Textarea } from '../components/ui/textarea';
import { Input } from '../components/ui/input';
import { Page } from '../components/Router';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface BlogDetailPageProps {
  onNavigate: (page: Page, blogId?: string) => void;
  blogId?: string;
}

// Mock blog detail data
const mockBlogData = {
  id: '1',
  title: 'Majestic Taj Mahal: A Love Story in Stone',
  subtitle: 'Discovering the timeless beauty and romantic history behind India\'s most iconic monument',
  content: `
    <p>The Taj Mahal stands as one of the world's most recognizable monuments, a testament to eternal love that has captivated visitors for centuries. Built by Emperor Shah Jahan as a mausoleum for his beloved wife Mumtaz Mahal, this architectural marvel represents the pinnacle of Mughal architecture.</p>

    <h2>A Monument Born from Love</h2>
    <p>The story begins in 1631 when Mumtaz Mahal, the emperor's third wife and the love of his life, died during childbirth. Devastated by her loss, Shah Jahan commissioned the construction of the most beautiful tomb the world had ever seen. The project took 22 years to complete, employing over 20,000 artisans from across the empire.</p>

    <blockquote>"The Taj Mahal rises above the banks of the river like a solitary tear suspended on the cheek of time." - Rabindranath Tagore</blockquote>

    <h2>Architectural Perfection</h2>
    <p>The Taj Mahal is a perfect example of symmetrical architecture. The main dome, surrounded by four smaller domes, creates a harmonious silhouette that changes throughout the day as the white marble reflects different hues of sunlight. The intricate inlay work, known as pietra dura, features precious and semi-precious stones arranged in beautiful floral patterns.</p>

    <p>The four minarets that frame the main structure are slightly tilted outward, ensuring that in the event of an earthquake, they would fall away from the tomb rather than onto it. This attention to detail showcases the incredible engineering prowess of Mughal architects.</p>

    <h2>Best Time to Visit</h2>
    <p>While the Taj Mahal is beautiful at any time of day, there are certain moments when its beauty becomes almost ethereal:</p>
    <ul>
      <li><strong>Sunrise:</strong> The golden hour provides warm, soft lighting that makes the marble glow</li>
      <li><strong>Full Moon Nights:</strong> The monument is open on full moon nights, offering a mystical experience</li>
      <li><strong>Winter Months:</strong> October to March offer pleasant weather for exploration</li>
    </ul>

    <h2>Photography Tips</h2>
    <p>Capturing the perfect shot of the Taj Mahal requires patience and the right timing. The classic shot from the main gateway offers the iconic view, but don't miss exploring different angles from the gardens. The reflection in the long pool creates a stunning mirror image, especially during calm weather.</p>
  `,
  image: 'https://images.unsplash.com/photo-1663918455395-49146be36cbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWolMjBtYWhhbCUyMGluZGlhJTIwbGFuZG1hcmt8ZW58MXx8fHwxNzU5ODczMjM5fDA&ixlib=rb-4.1.0&q=80&w=1080',
  category: 'India',
  location: 'Agra, Uttar Pradesh',
  date: '2025-01-15',
  readTime: '8 min read',
  views: 1205,
  author: {
    name: 'Arya Wanderer',
    avatar: 'https://images.unsplash.com/photo-1608661649226-796c26630764?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBibG9nZ2VyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU5ODcyNzA0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    bio: 'Travel enthusiast exploring the world one story at a time'
  },
  tags: ['Architecture', 'History', 'UNESCO', 'Mughal', 'Love Story'],
  relatedPosts: [
    {
      id: '2',
      title: 'Kerala Backwaters: Floating Through Paradise',
      image: 'https://images.unsplash.com/photo-1680599022555-57fb95b64b5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXJhbGElMjBiYWNrd2F0ZXJzJTIwaW5kaWF8ZW58MXx8fHwxNzU5ODczMjQwfDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: '3',
      title: 'Rajasthan Desert Safari: Golden Dunes Adventure',
      image: 'https://images.unsplash.com/photo-1685850749074-9cf8023d7e8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYSUyMHRyYXZlbCUyMGRlc3RpbmF0aW9ufGVufDF8fHx8MTc1OTg3MzE5Nnww&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ]
};

export function BlogDetailPage({ onNavigate, blogId }: BlogDetailPageProps) {
  const blog = mockBlogData; // In a real app, fetch based on blogId

  return (
    <div className="min-h-screen bg-travel-beige">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm text-travel-sage">
            <button onClick={() => onNavigate('home')} className="hover:text-travel-teal">Home</button>
            <span>/</span>
            <button onClick={() => onNavigate(blog.category.toLowerCase() as Page)} className="hover:text-travel-teal">{blog.category}</button>
            <span>/</span>
            <span className="text-gray-900">{blog.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <article className="lg:w-2/3">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-4 mb-4">
                <Badge className="bg-travel-teal text-white">{blog.category}</Badge>
                <div className="flex items-center text-sm text-travel-sage space-x-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {blog.readTime}
                  </div>
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    {blog.views} views
                  </div>
                </div>
              </div>
              
              <h1 className="font-serif text-4xl md:text-5xl text-gray-900 mb-4 leading-tight">{blog.title}</h1>
              <p className="text-xl text-gray-600 mb-6">{blog.subtitle}</p>
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={blog.author.avatar} alt={blog.author.name} />
                    <AvatarFallback>AW</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-900">{blog.author.name}</p>
                    <p className="text-sm text-gray-600">{blog.author.bio}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Heart className="h-4 w-4 mr-2" />
                    Like
                  </Button>
                  <Button variant="outline" size="sm">
                    <Bookmark className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="mb-8 rounded-xl overflow-hidden">
              <ImageWithFallback
                src={blog.image}
                alt={blog.title}
                className="w-full h-96 object-cover"
              />
            </div>

            {/* Blog Content */}
            <div className="prose prose-lg max-w-none mb-8">
              <div 
                className="blog-content text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>

            {/* Tags */}
            <div className="mb-8">
              <h3 className="font-serif text-lg mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="hover:bg-travel-teal hover:text-white cursor-pointer">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator className="my-8" />

            {/* Navigation */}
            <div className="flex justify-between items-center mb-8">
              <Button variant="outline" onClick={() => onNavigate('india')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous Post
              </Button>
              <Button variant="outline" onClick={() => onNavigate('india')}>
                Next Post
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            {/* Comments Section */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="font-serif text-2xl mb-6">Leave a Reply</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder="Your Name" />
                  <Input placeholder="Your Email" type="email" />
                </div>
                <Textarea placeholder="Share your thoughts about this destination..." rows={4} />
                <Button className="bg-travel-teal hover:bg-travel-teal-dark text-white">
                  Post Comment
                </Button>
              </form>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:w-1/3 space-y-6">
            {/* Popular Posts */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="font-serif text-xl mb-4">Popular Posts</h3>
              <div className="space-y-4">
                {blog.relatedPosts.map((post) => (
                  <div key={post.id} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors" onClick={() => onNavigate('blog', post.id)}>
                    <ImageWithFallback
                      src={post.image}
                      alt={post.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm line-clamp-2">{post.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="font-serif text-xl mb-4">Categories</h3>
              <div className="space-y-2">
                {['India', 'World', 'Adventure', 'Culture', 'Food', 'Photography'].map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                    <span className="text-gray-700">{category}</span>
                    <Badge variant="secondary">{Math.floor(Math.random() * 20) + 5}</Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Follow Us */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="font-serif text-xl mb-4">Follow Our Journey</h3>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="hover:bg-travel-teal hover:text-white">
                  Instagram
                </Button>
                <Button variant="outline" className="hover:bg-travel-teal hover:text-white">
                  YouTube
                </Button>
                <Button variant="outline" className="hover:bg-travel-teal hover:text-white">
                  Pinterest
                </Button>
                <Button variant="outline" className="hover:bg-travel-teal hover:text-white">
                  Twitter
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}