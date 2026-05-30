import { useEffect, useState } from 'react';
import { Search, Menu, X, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { SearchBar } from './SearchBar';
import { NavLink, Link } from 'react-router-dom';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showAdminShortcut, setShowAdminShortcut] = useState(false);

  useEffect(() => {
    setShowAdminShortcut(Boolean(window.localStorage.getItem('bliss-admin-token')));
  }, []);

  const navigationItems = [
    { label: 'Home', to: '/' },
    { label: 'India', to: '/india' },
    { label: 'World', to: '/world' },
    { label: 'Contact', to: '/contact' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-travel-stone shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center justify-between gap-2">
            <img src="/favicon.png" alt="Bliss Musafir Logo" className="w-10 h-10 object-contain" />
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-serif text-gray-800 font-semibold hover:text-travel-teal transition-colors">Bliss Musafir</Link>
            </div>
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
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) => `px-3 py-2 transition-colors duration-200 ${isActive ? 'text-travel-teal border-b-2 border-travel-teal' : 'text-gray-700 hover:text-travel-teal'}`}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>
          )}

          {/* Search, Admin, and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {!isSearchOpen && (
              <>
                {showAdminShortcut && (
                  <Link to="/admin" title="Admin Panel">
                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-travel-teal">
                      <Settings className="h-5 w-5" />
                    </Button>
                  </Link>
                )}
                <Button variant="ghost" size="sm" className="text-gray-700 hover:text-travel-teal" onClick={() => setIsSearchOpen(true)}>
                  <Search className="h-5 w-5" />
                </Button>
              </>
            )}

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700">
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
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) => `block w-full text-left px-3 py-2 transition-colors duration-200 rounded-md ${isActive ? 'text-travel-teal bg-travel-teal/10' : 'text-gray-700 hover:text-travel-teal hover:bg-gray-50'}`}
                >
                  {item.label}
                </NavLink>
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