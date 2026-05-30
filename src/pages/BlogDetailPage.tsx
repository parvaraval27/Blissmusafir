import { useState, useEffect } from 'react';
import { Calendar, Clock, Heart, Share2, Loader2, ChevronRight, Instagram, Youtube, Linkedin, Mail } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Input } from '../components/ui/input';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { articleService } from '../services/articleService';
import { apiClient, Article } from '../lib/api';
import { useParams, useNavigate } from 'react-router-dom';

export function BlogDetailPage() {
  const params = useParams();
  const navigate = useNavigate();
  const blogId = params.id;

  const [blog, setBlog] = useState<Article | null>(null);
  const [latestPosts, setLatestPosts] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

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
  }, [blogId]);

  const handleShare = async () => {
    if (!blog) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleSubscribe = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubscribing(true);
    setNewsletterStatus('');

    try {
      await apiClient.subscribeToNewsletter(newsletterEmail);
      setNewsletterStatus('You are subscribed to weekly stories.');
      setNewsletterEmail('');
    } catch (subscribeError) {
      setNewsletterStatus('Subscription failed. Please try again later.');
    } finally {
      setIsSubscribing(false);
    }
  };

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
        <Button onClick={() => navigate('/')}>Back to Home</Button>
      </div>
    );
  }

  const categories = ['India', 'World', 'Adventure', 'Culture', 'Food', 'Photography'];

  return (
    <div className="min-h-screen bg-travel-beige font-sans">
      <div className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center space-x-2 text-sm text-travel-sage">
          <button onClick={() => navigate('/')} className="hover:text-travel-teal transition-colors">Home</button>
          <ChevronRight className="h-4 w-4" />
          <button onClick={() => navigate(`/${blog.category.toLowerCase()}`)} className="hover:text-travel-teal transition-colors">{blog.category}</button>
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

            <div className="mb-10 w-full overflow-hidden rounded-2xl shadow-xl bg-gray-200" style={{ height: '450px' }}>
              <ImageWithFallback 
                src={blog.image} 
                alt={blog.title} 
                className="w-full h-full min-w-full min-h-full block object-cover" 
                style={{ objectFit: 'cover', objectPosition: 'center' }} 
              />
            </div>

            <div 
              className="prose prose-lg max-w-none text-gray-700 leading-relaxed blog-content mb-16"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </article>

          {/* SIDEBAR: Integrated uniform spacing and sticky behavior */}
          <aside className="lg:w-1/3 flex flex-col gap-8 sticky top-48 mt-24 self-start">
            <div className="h-32 w-full" aria-hidden="true"></div>
            {/* Recent Stories */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-serif text-xl mb-6 flex items-center">
                <span className="w-8 h-px bg-travel-teal mr-3" />
                Recent Stories
              </h3>
              <div className="space-y-6">
                {latestPosts.map((post) => (
                  <div 
                    key={post.id} 
                    className="group flex items-center gap-4 cursor-pointer" 
                    onClick={() => navigate(`/blog/${post.id}`)}
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

            {/* Categories */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-serif text-xl mb-6 flex items-center">
                <span className="w-8 h-px bg-travel-teal mr-3" />
                Categories
              </h3>
              <div className="grid grid-cols-1 gap-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => navigate(`/${cat.toLowerCase()}`)}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-travel-beige group transition-colors text-left"
                  >
                    <span className="text-gray-700 group-hover:text-travel-teal font-medium">{cat}</span>
                    <ChevronRight className="h-4 w-4 text-travel-sage group-hover:translate-x-1 transition-transform" />
                  </button>
                ))}
              </div>
            </div>

  {/* 4. Popular Tags Section */}
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
    <h3 className="font-serif text-xl mb-4 pb-2 border-b-2 border-travel-teal inline-block">
      Popular Tags
    </h3>
    <div className="flex flex-wrap gap-2">
      {['Adventure', 'Culture', 'Food', 'Nature', 'History', 'Photography'].map((tag) => (
        <span
          key={tag}
          className="px-3 py-1 bg-travel-beige text-travel-sage text-xs rounded-full hover:bg-travel-teal hover:text-white cursor-pointer transition-colors"
        >
          {tag}
        </span>
      ))}
    </div>
  </div>

  {/* 5. Follow Us Section */}
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
    <h3 className="font-serif text-xl mb-4 pb-2 border-b-2 border-travel-teal inline-block">
      Follow Us
    </h3>
    <div className="grid grid-cols-2 gap-3">
      <Button variant="outline" size="sm" className="hover:bg-travel-teal hover:text-white text-xs h-9">Instagram</Button>
      <Button variant="outline" size="sm" className="hover:bg-travel-teal hover:text-white text-xs h-9">YouTube</Button>
      <Button variant="outline" size="sm" className="hover:bg-travel-teal hover:text-white text-xs h-9">Twitter</Button>
      <Button variant="outline" size="sm" className="hover:bg-travel-teal hover:text-white text-xs h-9">Facebook</Button>
    </div>
  </div>

  {/* Share Article Section */}
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
    <h3 className="font-serif text-xl mb-4 pb-2 border-b-2 border-travel-teal inline-block">
      Share this Story
    </h3>
    <Button onClick={handleShare} variant="outline" className="w-full group hover:bg-travel-teal hover:text-white transition-colors">
      <Share2 className="mr-2 h-4 w-4 transform group-hover:scale-110 transition-transform" />
      <span>Share Now</span>
    </Button>
  </div>

  {/* 6. Newsletter Section (The Footer of the Sidebar) */}
  <div className="bg-travel-teal p-8 rounded-2xl text-white shadow-lg text-center">
    <h3 className="font-serif text-2xl mb-2">Join the Journey</h3>
    <p className="text-teal-50 text-xs mb-6 opacity-80">Get travel stories in your inbox.</p>
    <form onSubmit={handleSubscribe} className="space-y-3">
      <Input 
        type="email"
        placeholder="Your Email" 
        value={newsletterEmail}
        onChange={(event) => setNewsletterEmail(event.target.value)}
        className="bg-white/10 border-white/20 text-white placeholder:text-teal-100 h-10 border-none focus-visible:ring-white/30" 
        required
      />
      <Button type="submit" disabled={isSubscribing} className="w-full bg-white text-travel-teal hover:bg-teal-50 font-bold h-10">
        {isSubscribing ? 'Joining...' : 'Subscribe'}
      </Button>
      {newsletterStatus && <p className="text-xs text-teal-50">{newsletterStatus}</p>}
    </form>
  </div>
          </aside>
        </div>
      </div>
    </div>
  );
}