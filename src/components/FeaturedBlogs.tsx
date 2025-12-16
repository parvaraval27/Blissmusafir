import { BlogCard } from './BlogCard';
import { Page } from './Router';

interface FeaturedBlogsProps {
  onNavigate: (page: Page, blogId?: string) => void;
}

const featuredBlogs = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1663918455395-49146be36cbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWolMjBtYWhhbCUyMGluZGlhJTIwbGFuZG1hcmt8ZW58MXx8fHwxNzU5ODczMjM5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "India" as const,
    title: "The Eternal Beauty of Taj Mahal: A Love Story in Marble",
    excerpt: "Discover the enchanting tales behind India's most iconic monument and learn about the best times to visit this wonder of the world.",
    readTime: "6 min read"
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1680599022555-57fb95b64b5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXJhbGElMjBiYWNrd2F0ZXJzJTIwaW5kaWF8ZW58MXx8fHwxNzU5ODczMjQwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "India" as const,
    title: "Kerala Backwaters: Cruising Through God's Own Country",
    excerpt: "Experience the serene beauty of Kerala's backwaters, traditional houseboats, and the warm hospitality of local communities.",
    readTime: "8 min read"
  },
  {
    id: "6",
    image: "https://images.unsplash.com/photo-1602828959545-11dd10955196?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJpcyUyMGVpZmZlbCUyMHRvd2VyJTIwZXVyb3BlfGVufDF8fHx8MTc1OTg3MzI0MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "World" as const,
    title: "Paris Beyond the Eiffel Tower: Hidden Gems of the City of Light",
    excerpt: "Explore the charming neighborhoods, secret gardens, and local cafes that make Paris truly magical beyond its famous landmarks.",
    readTime: "7 min read"
  },
  {
    id: "7",
    image: "https://images.unsplash.com/photo-1604394089666-6d365c060c6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxpJTIwdGVtcGxlJTIwaW5kb25lc2lhfGVufDF8fHx8MTc1OTg3MzI0MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "World" as const,
    title: "Spiritual Journey Through Bali's Ancient Temples",
    excerpt: "Immerse yourself in the spiritual energy of Bali's sacred temples and discover the island's rich cultural heritage.",
    readTime: "5 min read"
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1608587069812-9a452271350c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2lzcyUyMGFscHMlMjBtb3VudGFpbnN8ZW58MXx8fHwxNzU5ODczMjQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "World" as const,
    title: "Swiss Alps Adventure: Hiking Through Heaven",
    excerpt: "Trek through pristine mountain trails, breathe in crisp alpine air, and witness some of the world's most spectacular scenery.",
    readTime: "9 min read"
  },
  {
    id: "8",
    image: "https://images.unsplash.com/photo-1614147892684-ce0bdcbaf582?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMGphcGFuJTIwc3RyZWV0fGVufDF8fHx8MTc1OTg3Mjc1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "World" as const,
    title: "Tokyo Streets: Where Tradition Meets Modernity",
    excerpt: "Navigate through Tokyo's vibrant neighborhoods and discover how ancient traditions seamlessly blend with cutting-edge culture.",
    readTime: "6 min read"
  }
];

export function FeaturedBlogs({ onNavigate }: FeaturedBlogsProps) {
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
          {featuredBlogs.map((blog, index) => (
            <BlogCard
              key={index}
              image={blog.image}
              category={blog.category}
              title={blog.title}
              excerpt={blog.excerpt}
              readTime={blog.readTime}
              onClick={() => onNavigate('blog', blog.id)}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <button 
            onClick={() => onNavigate('india')}
            className="text-travel-teal hover:text-travel-teal-dark font-medium text-lg hover:underline transition-all duration-200"
          >
            View All Stories →
          </button>
        </div>
      </div>
    </section>
  );
}