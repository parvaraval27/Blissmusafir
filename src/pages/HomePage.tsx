import { HeroSection } from '../components/HeroSection';
import { FeaturedBlogs } from '../components/FeaturedBlogs';
import { CategoryHighlight } from '../components/CategoryHighlight';
import { Page } from '../components/Router';

interface HomePageProps {
  onNavigate: (page: Page, blogId?: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <>
      <HeroSection onNavigate={onNavigate} />
      <FeaturedBlogs onNavigate={onNavigate} />
      <CategoryHighlight onNavigate={onNavigate} />
    </>
  );
}