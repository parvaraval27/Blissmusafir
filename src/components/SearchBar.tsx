import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Button } from './ui/button';

interface SearchBarProps {
  onClose: () => void;
}

export function SearchBar({ onClose }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Searching for:', searchQuery);
    onClose();
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center space-x-3">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 h-5 w-5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search destinations or blogs..."
          className="w-full pl-10 pr-4 py-2 border border-stone-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-stone-50"
          autoFocus
        />
      </div>
      <Button type="submit" size="sm" className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-6">
        Search
      </Button>
      <Button 
        type="button" 
        variant="ghost" 
        size="sm" 
        onClick={onClose}
        className="text-stone-500 hover:text-stone-700"
      >
        <X className="h-5 w-5" />
      </Button>
    </form>
  );
}