import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';

interface JobSearchProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
  className?: string;
}

export function JobSearch({ onSearch, placeholder = "Search for jobs, companies, or skills...", className = "" }: JobSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounced search
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (searchTerm.trim()) {
      setIsSearching(true);
      searchTimeoutRef.current = setTimeout(() => {
        onSearch(searchTerm.trim());
        setIsSearching(false);
      }, 500);
    } else {
      setIsSearching(false);
      onSearch('');
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchTerm, onSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    onSearch(searchTerm.trim());
    setIsSearching(false);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClear();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`w-full max-w-2xl mx-auto ${className}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        
        <Input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="pl-10 pr-12 h-14 text-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
          disabled={isSearching}
        />
        
        {searchTerm && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </Button>
        )}
        
        <Button
          type="submit"
          size="lg"
          className="absolute inset-y-0 right-0 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium"
          disabled={isSearching || !searchTerm.trim()}
        >
          {isSearching ? 'Searching...' : 'Search'}
        </Button>
      </div>
      
      {/* Search suggestions */}
      {searchTerm && (
        <div className="mt-3 text-sm text-gray-500 text-center">
          <span>Press Enter to search or wait for auto-search</span>
        </div>
      )}
    </form>
  );
}
