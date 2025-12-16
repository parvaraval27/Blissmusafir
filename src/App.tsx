import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Router, Page } from './components/Router';
import { Footer } from './components/Footer';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [currentBlogId, setCurrentBlogId] = useState<string | undefined>();

  const handleNavigation = (page: Page, blogId?: string) => {
    setCurrentPage(page);
    setCurrentBlogId(blogId);
    // Scroll to top when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-travel-beige font-sans">
      <Navigation currentPage={currentPage} onNavigate={handleNavigation} />
      <div className="pt-16"> {/* Add padding for fixed navbar */}
        <Router 
          currentPage={currentPage} 
          onNavigate={handleNavigation} 
          blogId={currentBlogId}
        />
      </div>
      <Footer onNavigate={handleNavigation} />
    </div>
  );
}