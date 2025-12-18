import { useState, useEffect } from 'react'; // Added hooks
import { ArrowLeft, ArrowRight, Calendar, Clock, Eye, MapPin, Share2, Heart, Bookmark, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { Textarea } from '../components/ui/textarea';
import { Input } from '../components/ui/input';
import { Page } from '../components/Router';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { articleService } from '../services/articleService'; // Import service
import { Article } from '../lib/api'; // Import type

interface BlogDetailPageProps {
  onNavigate: (page: Page, blogId?: string) => void;
  blogId?: string;
}

export function BlogDetailPage({ onNavigate, blogId }: BlogDetailPageProps) {
  const [blog, setBlog] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlog() {
      if (!blogId) return;
      
      try {
        setLoading(true);
        // Fetch specific article from API
        const data = await articleService.getArticleById(blogId);
        setBlog(data);
      } catch (err) {
        console.error("Failed to fetch blog:", err);
        setError("Could not load the article. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchBlog();
  }, [blogId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-travel-beige">
        <Loader2 className="h-12 w-12 animate-spin text-travel-teal" />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-travel-beige">
        <p className="text-xl text-red-600 mb-4">{error || "Article not found"}</p>
        <Button onClick={() => onNavigate('home')}>Back to Home</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-travel-beige">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm text-travel-sage">
            <button onClick={() => onNavigate('home')} className="hover:text-travel-teal">Home</button>
            <span>/</span>
            <button onClick={() => onNavigate(blog.category.toLowerCase() as Page)} className="hover:text-travel-teal">
                {blog.category}
            </button>
            <span>/</span>
            <span className="text-gray-900 truncate max-w-[200px] md:max-w-none">{blog.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <article className="lg:w-2/3">
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
                    {blog.views || 0} views
                  </div>
                </div>
              </div>
              
              <h1 className="font-serif text-4xl md:text-5xl text-gray-900 mb-4 leading-tight">{blog.title}</h1>
              <p className="text-xl text-gray-600 mb-6">{blog.excerpt}</p>
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>{blog.author.substring(0,2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-900">{blog.author}</p>
                    <p className="text-sm text-gray-600">Travel Explorer</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="hidden sm:flex">
                    <Heart className="h-4 w-4 mr-2" /> Like
                  </Button>
                  <Button variant="outline" size="sm" className="hidden sm:flex">
                    <Bookmark className="h-4 w-4 mr-2" /> Save
                  </Button>
                </div>
              </div>
            </div>

            <div className="mb-8 rounded-xl overflow-hidden">
              <ImageWithFallback
                src={blog.image}
                alt={blog.title}
                className="w-full h-[400px] object-cover"
              />
            </div>

            {/* Render actual content using dangerouslySetInnerHTML since content is likely HTML string */}
            <div className="prose prose-lg max-w-none mb-8">
              <div 
                className="blog-content text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
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
            )}

            <Separator className="my-8" />

            <div className="flex justify-between items-center mb-8">
              <Button variant="outline" onClick={() => onNavigate('home')}>
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to Explorations
              </Button>
            </div>
          </article>

          {/* Sidebar logic remains similar but can be updated to fetch real popular posts */}
          <aside className="lg:w-1/3 space-y-6">
             {/* ... (Sidebar components) ... */}
          </aside>
        </div>
      </div>
    </div>
  );
}