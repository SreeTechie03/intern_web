import React from "react";
import { Search, Bell, User, Menu, LogOut } from "lucide-react";
import { SearchBar } from "./SearchBar";
import { UserActions } from "./UserActions";
import { Logo } from "./Logo";

const TopBar = ({ onMenuClick, onLogout }) => {
  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 fixed top-0 left-0 right-0 z-50">
      <button onClick={onMenuClick} className="md:hidden p-2 hover:bg-gray-100 rounded-lg">
        <Menu className="h-6 w-6 text-gray-600" />
      </button>

      <Logo />
      <SearchBar />

      <div className="flex items-center gap-4">
        <UserActions />

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="bg-red-500 text-white px-3 py-1 rounded-lg flex items-center gap-2 hover:bg-red-600 transition"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );
};

export default TopBar;
