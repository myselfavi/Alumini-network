import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = () => {
  return (
    <div className="max-w-2xl mx-auto mb-8 w-full">
      <div className="relative">
        <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search peoples or organization ..."
          className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>
    </div>
  );
};

export default SearchBar;