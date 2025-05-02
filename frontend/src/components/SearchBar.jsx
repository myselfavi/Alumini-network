import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const api = useApi();
    const response = await api.get(`/api/post/search?term=${searchTerm}`);
    setSearchResults(response.data);
  };

  return (
    <div className="max-w-2xl mx-auto mb-8 w-full">
      <div className="relative">
        <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search peoples or organization ..."
          className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <button
          type="submit"
          onClick={handleSearch}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
        >
          Search
        </button>
      </div>
      {searchResults.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl mb-4">Search Results</h2>
          <ul>
            {searchResults.map((post) => (
              <li key={post.id} className="mb-4">
                <div className="flex items-center space-x-4">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
                    alt="User"
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex flex-col">
                    <span className="text-lg">{post.user.name}</span>
                    <span className="text-sm">{post.user.organization}</span>
                  </div>
                </div>
                <p className="mt-2">{post.content}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;

