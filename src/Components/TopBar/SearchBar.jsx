import React from 'react';
import { Search } from 'lucide-react';

export function SearchBar() {
  return (
    <>
      <div className="flex-1 max-w-2xl mx-8 hidden md:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for courses..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <button className="md:hidden p-2 hover:bg-gray-100 rounded-lg">
        <Search className="h-6 w-6 text-gray-600" />
      </button>
    </>
  );
}