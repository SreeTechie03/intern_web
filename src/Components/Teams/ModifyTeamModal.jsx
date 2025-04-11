import React, { useState, useEffect } from 'react';
import { X, Users, DollarSign, Calendar, UserPlus, Building2, Target } from 'lucide-react';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const mockUsers = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Mike Johnson' },
  { id: 4, name: 'Sarah Williams' },
  { id: 5, name: 'Alex Thompson' },
  { id: 6, name: 'Emily Davis' },
  { id: 7, name: 'Chris Wilson' },
  { id: 8, name: 'Lisa Anderson' },
];

function ModifyTeamModal({ isOpen, onClose, onModify, team }) {
  const [formData, setFormData] = useState({
    name: '',
    manager: '',
    members: [],
    targetMonth: '',
    targetAmount: '',
  });

  useEffect(() => {
    if (team) {
      setFormData({
        name: team.name,
        manager: team.manager || '',
        members: team.members || [],
        targetMonth: team.targetMonth || '',
        targetAmount: String(team.revenue) || '',
      });
    }
  }, [team]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onModify(team.id, {
      name: formData.name,
      memberCount: formData.members.length,
      revenue: parseFloat(formData.targetAmount) || 0,
      totalPayments: team.totalPayments,
      receivedPayments: team.receivedPayments,
      pending: parseFloat(formData.targetAmount) - team.receivedPayments,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 relative shadow-2xl animate-slideUp">
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 bg-white text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-50 rounded-full shadow-lg"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-full mb-4">
            <Users className="w-6 h-6 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Modify Team</h2>
          <p className="text-gray-500 mt-1">Update team information</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-6">
            <div className="relative">
              <Building2 className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter team name"
              />
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <UserPlus className="w-5 h-5" />
                    Team Members
                  </h3>
                  <span className="text-sm text-gray-500">
                    Selected: {formData.members.length}
                  </span>
                </div>
                <select
                  multiple
                  value={formData.members}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      members: Array.from(e.target.selectedOptions, (option) => option.value),
                    })
                  }
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 h-48"
                >
                  {mockUsers.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
                <p className="mt-2 text-sm text-gray-500 flex items-center gap-1">
                  <span className="text-emerald-500">Tip:</span>
                  Hold Ctrl/Cmd to select multiple members
                </p>
              </div>
            </div>

            <div className="relative">
              <Target className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <div className="relative">
                <DollarSign className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  required
                  min="0"
                  step="1000"
                  value={formData.targetAmount}
                  onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter target amount"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end items-center gap-3 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-gray-600 hover:text-gray-800 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
            >
              Update Team
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModifyTeamModal;