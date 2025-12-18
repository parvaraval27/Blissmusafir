import { useState, useEffect } from 'react';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { articleService } from '../services/articleService';
import { Article } from '../lib/api';

import { BlogCard } from './BlogCard';
import { useNavigate } from 'react-router-dom';

export function FeaturedBlogs() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const allArticles = await articleService.getAllArticles();
        setArticles(allArticles);
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-travel-stone">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">Loading articles...</div>
          </div>
        </div>
      </section>
    );
  }

  const featuredBlogs = articles.map((article: Article) => ({
    id: article.id,
    image: article.image,
    category: article.category,
    title: article.title,
    excerpt: article.excerpt || article.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
    readTime: article.readTime,
    tags: article.tags || []
  }));

  return (
    <section className="py-20 bg-travel-stone">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-gray-800 mb-4">
            Latest Adventures
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Dive into stories of wanderlust, cultural discoveries, and breathtaking destinations from around the globe
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredBlogs.map((blog: any, index: number) => (
            <BlogCard
              key={index}
              image={blog.image}
              category={blog.category}
              title={blog.title}
              excerpt={blog.excerpt}
              readTime={blog.readTime}
              onClick={() => navigate(`/blog/${blog.id}`)}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <button 
            onClick={() => navigate('/india')}
            className="text-travel-teal hover:text-travel-teal-dark font-medium text-lg hover:underline transition-all duration-200"
          >
            View All Stories →
          </button>
        </div>
      </div>
    </section>
  );
}