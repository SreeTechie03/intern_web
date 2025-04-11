import React from 'react';
import { X, AlertTriangle } from 'lucide-react';

function DeleteTeamModal({ isOpen, onClose, onDelete, team }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative shadow-2xl animate-slideUp">
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 bg-white text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-50 rounded-full shadow-lg"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mb-4">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Delete Team</h2>
          <p className="text-gray-500 mt-2">
            Are you sure you want to delete "{team?.name}"? This action cannot be undone.
          </p>
        </div>

        <div className="flex justify-end items-center gap-3 pt-6 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-gray-600 hover:text-gray-800 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onDelete(team.id);
              onClose();
            }}
            className="px-6 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
          >
            Delete Team
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteTeamModal;