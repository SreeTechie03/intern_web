import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function TeamForm({ onSubmit, onClose, initialData, isEdit }) {
  const [formData, setFormData] = useState({
    name: '',
    manager: '',
    members: [],
    target_month: '',
    target_amount: ''
  });

  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    const fetchEmployee = async () => {
      const { data, error } = await supabase.from('employee').select('name');
      if (error) console.error('Error fetching employee:', error);
      else setEmployee(data.map(emp => emp.name));
    };

    fetchEmployee();
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        members: initialData.members || [],
        target_month: new Date(initialData.target_month).toISOString().split('T')[0]
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMultiSelectChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, o => o.value);
    setFormData(prev => ({ ...prev, members: selected }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const processedData = {
      ...formData,
      target_amount: Number(formData.target_amount)
    };
    onSubmit(processedData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {isEdit ? 'Edit Team' : 'Create New Team'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Team Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border-2"
              placeholder="Enter team name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Manager</label>
            <input
              type="text"
              name="manager"
              value={formData.manager}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border-2"
              placeholder="Enter manager name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Team Members <span className="text-gray-500 text-sm font-normal ml-2">(Hold Ctrl/Cmd to select multiple)</span>
            </label>
            <select
              name="members"
              multiple
              value={formData.members}
              onChange={handleMultiSelectChange}
              className="w-full px-4 py-3 rounded-lg border-2"
              required
            >
              {employee.map(name => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Target Month</label>
            <input
              type="date"
              name="target_month"
              value={formData.target_month}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Target Amount</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
              <input
                type="number"
                name="target_amount"
                value={formData.target_amount}
                onChange={handleChange}
                required
                className="w-full pl-8 pr-4 py-3 rounded-lg border-2"
                placeholder="Enter target amount"
              />
            </div>
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="px-6 py-3 text-gray-700 bg-gray-100 rounded-lg">
              Cancel
            </button>
            <button type="submit" className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
              {isEdit ? 'Update Team' : 'Create Team'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TeamForm;
