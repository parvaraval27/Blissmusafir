import { useState } from 'react';
import { Search, Menu, X, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { SearchBar } from './SearchBar';
import { Page } from './Router';

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navigationItems = [
    { label: 'Home', page: 'home' as Page },
    { label: 'India', page: 'india' as Page },
    { label: 'World', page: 'world' as Page },
    { label: 'Contact', page: 'contact' as Page }
  ];

  const handleNavigation = (page: Page) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-travel-stone shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button 
              onClick={() => handleNavigation('home')}
              className="text-2xl font-serif text-gray-800 font-semibold hover:text-travel-teal transition-colors"
            >
              Bliss Musafir
            </button>
          </div>

          {/* Search Bar (when open) */}
          {isSearchOpen && (
            <div className="flex-1 max-w-md mx-4">
              <SearchBar onClose={() => setIsSearchOpen(false)} />
            </div>
          )}

          {/* Desktop Navigation */}
          {!isSearchOpen && (
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navigationItems.map((item) => (
                  <button
                    key={item.page}
                    onClick={() => handleNavigation(item.page)}
                    className={`px-3 py-2 transition-colors duration-200 ${
                      currentPage === item.page
                        ? 'text-travel-teal border-b-2 border-travel-teal'
                        : 'text-gray-700 hover:text-travel-teal'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search, Admin, and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {!isSearchOpen && (
              <>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-gray-500 hover:text-travel-teal"
                  onClick={() => handleNavigation('admin')}
                  title="Admin Panel"
                >
                  <Settings className="h-5 w-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-gray-700 hover:text-travel-teal"
                  onClick={() => setIsSearchOpen(true)}
                >
                  <Search className="h-5 w-5" />
                </Button>
              </>
            )}
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-travel-stone">
              {navigationItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => handleNavigation(item.page)}
                  className={`block w-full text-left px-3 py-2 transition-colors duration-200 rounded-md ${
                    currentPage === item.page
                      ? 'text-travel-teal bg-travel-teal/10'
                      : 'text-gray-700 hover:text-travel-teal hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              {/* Mobile Search */}
              <div className="px-3 py-2">
                <SearchBar onClose={() => setIsMenuOpen(false)} />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}