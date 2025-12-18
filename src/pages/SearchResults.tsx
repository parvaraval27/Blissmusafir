import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import type { Article } from '../lib/api';
import { articleService } from '../services/articleService';
import { BlogCard } from '../components/BlogCard';

export function SearchResults() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q') ?? '';
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    articleService
      .getAllArticles()
      .then((all) => {
        if (!mounted) return;
        const term = q.trim().toLowerCase();
        if (!term) {
          setArticles([]);
          setLoading(false);
          return;
        }

        const results = all.filter((a) => {
          const hay = `${a.title} ${a.excerpt} ${a.content} ${a.category} ${a.tags?.join(' ')}`.toLowerCase();
          return hay.includes(term);
        });

        setArticles(results);
      })
      .catch(() => setArticles([]))
      .finally(() => setLoading(false));

    return () => {
      mounted = false;
    };
  }, [q]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-semibold mb-4">Search results for “{q}”</h1>

      {loading ? (
        <p>Loading…</p>
      ) : q.trim() === '' ? (
        <p className="text-gray-600">Enter a search to find destinations and blogs.</p>
      ) : articles.length === 0 ? (
        <p className="text-gray-600">No results found for “{q}”.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((a) => (
            <BlogCard
              key={a.id}
              image={a.image}
              category={a.category}
              title={a.title}
              excerpt={a.excerpt}
              onClick={() => navigate(`/blog/${a.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
