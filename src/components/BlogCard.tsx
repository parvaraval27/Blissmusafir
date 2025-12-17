import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface BlogCardProps {
  image: string;
  category: 'India' | 'World';
  title: string;
  excerpt: string;
  author?: string;
  readTime?: string;
  onClick?: () => void;
}

export function BlogCard({ image, category, title, excerpt, author = "Anonymous Traveler", readTime = "5 min read", onClick }: BlogCardProps) {
  return (
    <article className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden cursor-pointer" onClick={onClick}>
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <Badge 
            variant="secondary" 
            className={`${
              category === 'India' 
                ? 'bg-travel-gold-light/20 text-travel-gold-light border-travel-gold-light' 
                : 'bg-travel-teal/20 text-travel-teal border-travel-teal'
            } font-medium`}
          >
            {category}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-travel-teal transition-colors duration-200">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {excerpt}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <span>Written by {author}</span>
          <span>{readTime}</span>
        </div>

        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            className="text-travel-teal hover:text-travel-teal-dark hover:bg-travel-teal/10 p-0 h-auto font-medium"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              onClick?.();
            }}
          >
            Read More →
          </Button>
        </div>
      </div>
    </article>
  );
}