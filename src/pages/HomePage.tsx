import { HeroSection } from '../components/HeroSection';
import { FeaturedBlogs } from '../components/FeaturedBlogs';
import { CategoryHighlight } from '../components/CategoryHighlight';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedBlogs />
      <CategoryHighlight />
    </>
  );
}