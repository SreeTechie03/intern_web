// TopBar.jsx
import React from 'react';
import { Search, Bell, User, Menu } from 'lucide-react';
import { SearchBar } from './TopBar/SearchBar';
import { UserActions } from './TopBar/UserActions';
import { Logo } from './TopBar/Logo';

const TopBar = ({ onMenuClick }) => {
  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 fixed top-0 left-0 right-0 z-50">
      <button 
        onClick={onMenuClick}
        className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
      >
        <Menu className="h-6 w-6 text-gray-600" />
      </button>

      <Logo />
      <SearchBar />
      <UserActions />
    </div>
  );
};

export default TopBar; // Default export at the end
