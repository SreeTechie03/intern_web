import React, { useState, useRef, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Menu, LogOut, Settings, User } from "lucide-react";
import { SearchBar } from "./SearchBar";
import { Logo } from "./Logo";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL, 
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const TopBar = ({ onMenuClick, onLogout }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  // Fetch user session and profile data from Supabase
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Get the authenticated user
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        
        if (authError) throw authError;
        if (!user) return;

        setUser(user);

        // Try to get additional user data from profiles table
        try {
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

          if (!profileError) {
            setUserData(profileData);
          }
          // If the table doesn't exist or there's no profile, we'll just use the basic user info
        } catch (e) {
          console.log("No profile data available, using basic user info");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

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

  const getDisplayName = () => {
    if (userData?.name) return userData.name;
    if (user?.user_metadata?.name) return user.user_metadata.name;
    if (user?.email) return user.email.split('@')[0];
    return "Guest";
  };

  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 fixed top-0 left-0 right-0 z-50">
      {/* Mobile Menu Button */}
      <button
        onClick={onMenuClick}
        className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
      >
        <Menu className="h-6 w-6 text-gray-600" />
      </button>

      {/* Logo & Search Bar */}
      <Logo />
      <SearchBar />

      {/* User Profile Section */}
      <div className="relative flex items-center gap-4">
        <div
          ref={buttonRef}
          className="flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-100 rounded-lg"
          onClick={toggleDropdown}
        >
          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-indigo-100 text-indigo-600">
            {user ? (
              <span className="font-medium">
                {getDisplayName().charAt(0).toUpperCase()}
              </span>
            ) : (
              <User className="h-5 w-5" />
            )}
          </div>
          <span className="text-gray-600 font-medium">
            {getDisplayName()}
          </span>
        </div>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute right-0 top-12 bg-white shadow-md rounded-lg border border-gray-200 w-48 z-10"
          >
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900">{getDisplayName()}</p>
              {user?.email && (
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              )}
            </div>
            <button
              onClick={toggleDropdown}
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