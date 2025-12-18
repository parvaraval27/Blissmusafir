import { useState, useEffect } from 'react';
import { Calendar, Clock, Heart, Share2, Loader2, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Input } from '../components/ui/input';
import { Page } from '../components/Router';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { articleService } from '../services/articleService';
import { Article } from '../lib/api';

interface BlogDetailPageProps {
  onNavigate: (page: Page, blogId?: string) => void;
  blogId?: string;
}

export function BlogDetailPage({ onNavigate, blogId }: BlogDetailPageProps) {
  const [blog, setBlog] = useState<Article | null>(null);
  const [latestPosts, setLatestPosts] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      if (!blogId) return;
      try {
        setLoading(true);
        const [currentBlog, allArticles] = await Promise.all([
          articleService.getArticleById(blogId),
          articleService.getAllArticles()
        ]);
        setBlog(currentBlog);
        setLatestPosts(allArticles.filter(a => a.id !== blogId).slice(0, 5));
      } catch (err) {
        console.error("Failed to load blog details:", err);
        setError("Could not load the article.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
    window.scrollTo(0, 0);
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

  const categories = ['India', 'World', 'Adventure', 'Culture', 'Food', 'Photography'];

  return (
    <div className="min-h-screen bg-travel-beige font-sans">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center space-x-2 text-sm text-travel-sage">
          <button onClick={() => onNavigate('home')} className="hover:text-travel-teal transition-colors">Home</button>
          <ChevronRight className="h-4 w-4" />
          <button onClick={() => onNavigate(blog.category.toLowerCase() as Page)} className="hover:text-travel-teal transition-colors">{blog.category}</button>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900 font-medium truncate">{blog.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-12 pt-8">
          
          <article className="lg:w-2/3">
            <header className="mb-8">
              <Badge className="bg-travel-teal text-white mb-4 uppercase tracking-wider">{blog.category}</Badge>
              <h1 className="font-serif text-3xl md:text-5xl text-gray-900 mb-4 leading-tight">{blog.title}</h1>
              <p className="text-xl text-gray-600 mb-6 italic border-l-4 border-travel-teal pl-4">"{blog.excerpt}"</p>
            </header>

            {/* ISSUE 1 FIXED: Main image centered vertically and horizontally */}
            <div className="mb-10 w-full overflow-hidden rounded-2xl shadow-xl bg-gray-200" style={{ height: '450px' }}>
              <ImageWithFallback 
                src={blog.image} 
                alt={blog.title} 
                className="w-full h-full block" 
                style={{ objectFit: 'cover', objectPosition: 'center' }} 
              />
            </div>

            <div 
              className="prose prose-lg max-w-none text-gray-700 leading-relaxed blog-content"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </article>

          <aside className="lg:w-1/3 flex flex-col gap-8 sticky top-32 self-start">
            {/* Latest Stories Section */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-serif text-xl mb-6 pb-2 border-b-2 border-travel-teal inline-block">
                Recent Stories
              </h3>
              <div className="space-y-6">
                {latestPosts.map((post) => (
                  <div 
                    key={post.id} 
                    className="group flex items-center gap-4 cursor-pointer" 
                    onClick={() => onNavigate('blog', post.id)}
                  >
                    <div 
                      className="shrink-0 rounded-lg overflow-hidden bg-gray-50 border border-gray-100"
                      style={{ width: '90px', height: '60px' }}
                    >
                      <ImageWithFallback 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full block transition-transform duration-500 group-hover:scale-110" 
                        style={{ objectFit: 'cover', objectPosition: 'center' }}
                      />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <h4 className="font-medium text-sm text-gray-900 line-clamp-2 leading-tight group-hover:text-travel-teal transition-colors">
                        {post.title}
                      </h4>
                      <span className="text-[10px] text-travel-sage mt-1 uppercase tracking-tighter">
                        {new Date(post.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-serif text-xl mb-6 pb-2 border-b-2 border-travel-teal inline-block">
                Categories
              </h3>
              <div className="grid grid-cols-1 gap-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => onNavigate(cat.toLowerCase() as Page)}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-travel-beige group transition-colors text-left"
                  >
                    <span className="text-gray-700 group-hover:text-travel-teal font-medium">{cat}</span>
                    <ChevronRight className="h-4 w-4 text-travel-sage group-hover:translate-x-1 transition-transform" />
                  </button>
                ))}
              </div>
            </div>

            {/* Newsletter section pushed to bottom */}
            <div className="bg-travel-teal p-8 rounded-2xl text-white shadow-lg text-center">
              <h3 className="font-serif text-2xl mb-2">Join the Journey</h3>
              <p className="text-teal-50 text-xs mb-6 opacity-80">Get travel stories in your inbox.</p>
              <div className="space-y-3">
                <Input placeholder="Your Email" className="bg-white/10 border-white/20 text-white placeholder:text-teal-100 h-10" />
                <Button className="w-full bg-white text-travel-teal hover:bg-teal-50 font-bold h-10">Subscribe</Button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}