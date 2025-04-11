import React, { useState } from 'react';
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

function AddTeamModal({ isOpen, onClose, onAddTeam }) {
  const [formData, setFormData] = useState({
    name: '',
    manager: '',
    members: [],
    targetMonth: '',
    targetAmount: '',
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTeam({
      name: formData.name,
      memberCount: formData.members.length,
      revenue: parseFloat(formData.targetAmount) || 0,
      totalPayments: 0,
      receivedPayments: 0,
      pending: parseFloat(formData.targetAmount) || 0,
    });
    setFormData({
      name: '',
      manager: '',
      members: [],
      targetMonth: '',
      targetAmount: '',
    });
    setCurrentStep(1);
    onClose();
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center space-x-2 mb-8">
      {[1, 2, 3].map((step) => (
        <div
          key={step}
          className={`flex items-center ${step !== 3 ? 'w-full' : ''}`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === currentStep
                ? 'bg-blue-600 text-white'
                : step < currentStep
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-600'
            }`}
          >
            {step < currentStep ? '✓' : step}
          </div>
          {step !== 3 && (
            <div
              className={`h-1 w-full ${
                step < currentStep ? 'bg-green-500' : 'bg-gray-200'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="relative">
              <Building2 className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter team name"
              />
            </div>
            <div className="relative">
              <Users className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <select
                required
                value={formData.manager}
                onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none transition-all duration-200"
              >
                <option value="">Select team manager</option>
                {mockUsers.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        );
      case 2:
        return (
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
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 h-48"
              >
                {mockUsers.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
              <p className="mt-2 text-sm text-gray-500 flex items-center gap-1">
                <span className="text-blue-500">Tip:</span>
                Hold Ctrl/Cmd to select multiple members
              </p>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="relative">
              <Calendar className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <select
                required
                value={formData.targetMonth}
                onChange={(e) => setFormData({ ...formData, targetMonth: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none transition-all duration-200"
              >
                <option value="">Select target month</option>
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
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
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter target amount"
                />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
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
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Create New Team</h2>
          <p className="text-gray-500 mt-1">Step {currentStep} of {totalSteps}</p>
        </div>

        {renderStepIndicator()}

        <form onSubmit={handleSubmit} className="space-y-6">
          {renderStepContent()}

          <div className="flex justify-between items-center pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={prevStep}
              className={`px-6 py-2.5 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all duration-200 font-medium ${
                currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={currentStep === 1}
            >
              Previous
            </button>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 text-gray-600 hover:text-gray-800 transition-all duration-200"
              >
                Cancel
              </button>
              {currentStep === totalSteps ? (
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
                >
                  Create Team
                </button>
              ) : (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
                >
                  Continue
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTeamModal;