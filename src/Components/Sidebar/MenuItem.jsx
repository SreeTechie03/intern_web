import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

export function MenuItem({ item, currentView, onViewChange, level = 0 }) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const Icon = item.icon;

  return (
    <div>
      <button
        onClick={() => {
          if (hasChildren) {
            setIsOpen(!isOpen);
          } else {
            onViewChange(item.label.toLowerCase());
          }
        }}
        className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
          currentView === item.label.toLowerCase()
            ? 'bg-blue-50 text-blue-600'
            : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
        }`}
        style={{ paddingLeft: `${level * 12 + 16}px` }}
      >
        <Icon className="h-5 w-5 flex-shrink-0" />
        <span className="text-sm font-medium flex-grow text-left">{item.label}</span>
        {hasChildren && (
          isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
        )}
      </button>
      {hasChildren && isOpen && (
        <div className="mt-1">
          {item.children.map((child, index) => (
            <MenuItem
              key={index}
              item={child}
              currentView={currentView}
              onViewChange={onViewChange}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}