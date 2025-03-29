import React, { useState } from 'react';
import { BookOpen, Mail, User, Calendar, Clock, DollarSign, CheckCircle } from 'lucide-react';

function Enroll() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: '',
    startDate: '',
    preferredTime: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const courses = [
    {
      id: 1,
      name: 'AI and Machine Learning',
      duration: '6 months',
      price: '$999'
    },
    {
      id: 2,
      name: 'Full Stack Web Development',
      duration: '8 months',
      price: '$1299'
    },
    {
      id: 3,
      name: 'Data Science',
      duration: '6 months',
      price: '$899'
    },
    {
      id: 4,
      name: 'Cybersecurity',
      duration: '7 months',
      price: '$1199'
    }
  ];

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSuccess(true);
    setIsSubmitting(false);
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto p-8 text-center">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Enrollment Successful!</h2>
          <p className="text-gray-600 mb-6">
            Welcome, {formData.name}! You've successfully enrolled in {formData.course}.
            We've sent a confirmation email to {formData.email}.
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition"
          >
            Enroll Another Student
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <BookOpen className="h-8 w-8 text-blue-600" />
          Course Enrollment
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Full Name
                </div>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address
                </div>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="startDate">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Start Date
                </div>
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="preferredTime">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Preferred Time
                </div>
              </label>
              <select
                id="preferredTime"
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select preferred time</option>
                <option value="morning">Morning (9 AM - 12 PM)</option>
                <option value="afternoon">Afternoon (1 PM - 4 PM)</option>
                <option value="evening">Evening (6 PM - 9 PM)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-4" htmlFor="course">
              Select Your Course
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {courses.map(course => (
                <div
                  key={course.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    formData.course === course.name
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => handleChange({ target: { name: 'course', value: course.name } })}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-800">{course.name}</h3>
                      <div className="mt-2 space-y-1">
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          Duration: {course.duration}
                        </p>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          Price: {course.price}
                        </p>
                      </div>
                    </div>
                    <div className={`w-4 h-4 rounded-full border ${
                      formData.course === course.name
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Processing...' : 'Complete Enrollment'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Enroll;