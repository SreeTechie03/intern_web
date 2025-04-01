import React, { useState, useRef, useEffect } from "react";
import { Menu, LogOut, Settings, User } from "lucide-react";
import { SearchBar } from "./SearchBar";
import { Logo } from "./Logo";

const TopBar = ({ onMenuClick, onLogout, username }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

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

      <div className="flex items-center gap-4">
        {/* Welcome Message and User Profile */}
        <div 
          ref={buttonRef}
          className="flex items-center gap-2 cursor-pointer" 
          onClick={toggleDropdown}
        >
          <span className="text-gray-600">Welcome, {username}</span>
          <User className="h-6 w-6 text-gray-600" />
        </div>

        {/* Dropdown Menu for Profile */}
        {isDropdownOpen && (
          <div 
            ref={dropdownRef}
            className="absolute right-4 top-16 bg-white shadow-md rounded-lg border border-gray-200 w-48 z-10"
          >
            <button
              onClick={() => {
                toggleDropdown();
                // Add your settings handler here
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-gray-600"
            >
              <Settings className="h-5 w-5 text-gray-600" />
              Settings
            </button>
            <button
              onClick={() => {
                toggleDropdown();
                onLogout();
              }}
              className="w-full text-left px-4 py-2 hover:bg-red-100 flex items-center gap-2 text-gray-600"
            >
              <LogOut className="h-5 w-5 text-red-500" />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;