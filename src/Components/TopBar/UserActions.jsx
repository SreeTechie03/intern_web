import React from 'react';
import { Bell, User } from 'lucide-react';

export function UserActions() {
  return (
    <div className="flex items-center gap-4">
      <button className="p-2 hover:bg-gray-100 rounded-lg">
        <Bell className="h-6 w-6 text-gray-600" />
      </button>
      <button className="p-2 hover:bg-gray-100 rounded-lg">
        <User className="h-6 w-6 text-gray-600" />
      </button>
    </div>
  );
}