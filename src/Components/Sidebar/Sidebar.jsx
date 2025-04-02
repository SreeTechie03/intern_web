import React from 'react';
import { X } from 'lucide-react';
import { MenuItem } from './MenuItem';
import { menuItems } from '../TopBar/menuItems';

export function Sidebar({ currentView, onViewChange, isOpen, onClose }) {
  return (
    <>
      {/* Overlay when sidebar is open (for mobile screens) */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar container */}
      <div 
        className={`
          fixed left-0 top-16 bottom-0 w-64 bg-gray-50 border-r border-gray-200 
          transform transition-transform duration-300 ease-in-out z-50 overflow-y-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Mobile close button */}
        <div className="flex justify-between items-center p-4 md:hidden">
          <h2 className="font-semibold text-gray-800">Menu</h2>
          <button onClick={onClose} className="p-2">
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Navigation menu items */}
        <nav className="p-4 flex flex-col gap-1">
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              item={item}
              currentView={currentView}
              onViewChange={onViewChange}
            />
          ))}
        </nav>

       
      </div>
    </>
  );
}
