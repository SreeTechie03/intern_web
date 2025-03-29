import React from 'react';
import { Bell, Calendar, Clock, FileText, MessageSquare, Shield } from 'lucide-react';

function Notifications() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* New Notifications */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <Bell className="h-5 w-5 mr-2 text-blue-600" />
                New Notifications
              </h2>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                3 New
              </span>
            </div>
            <div className="space-y-4">
              {[
                {
                  title: 'Project Milestone Achieved',
                  time: '2 hours ago',
                  description: 'Frontend development phase completed successfully.',
                },
                {
                  title: 'Team Meeting Reminder',
                  time: '1 hour ago',
                  description: 'Daily standup at 10:00 AM.',
                },
                {
                  title: 'New Feature Announcement',
                  time: '30 minutes ago',
                  description: 'AI-powered analytics dashboard released.',
                },
              ].map((notification, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-md transition"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                    <p className="text-sm text-gray-500">{notification.description}</p>
                    <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Project Updates */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-green-600" />
                Project Updates
              </h2>
            </div>
            <div className="space-y-4">
              {[
                {
                  project: 'SmartED Dashboard',
                  progress: 75,
                  status: 'In Progress',
                },
                {
                  project: 'Mobile App Development',
                  progress: 90,
                  status: 'Review',
                },
                {
                  project: 'API Integration',
                  progress: 60,
                  status: 'In Progress',
                },
              ].map((project, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-900">{project.project}</span>
                    <span className="text-sm text-gray-500">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500">{project.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Task Reminders */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-purple-600" />
                Task Reminders
              </h2>
            </div>
            <div className="space-y-4">
              {[
                {
                  task: 'Code Review: Authentication Module',
                  deadline: 'Today, 2:00 PM',
                  priority: 'High',
                },
                {
                  task: 'Update Documentation',
                  deadline: 'Tomorrow, 11:00 AM',
                  priority: 'Medium',
                },
                {
                  task: 'Security Assessment',
                  deadline: 'Friday, 3:00 PM',
                  priority: 'High',
                },
              ].map((task, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-md transition"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{task.task}</p>
                    <p className="text-xs text-gray-500">{task.deadline}</p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      task.priority === 'High'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Team Messages */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-indigo-600" />
                Team Messages
              </h2>
            </div>
            <div className="space-y-4">
              {[
                {
                  sender: 'Ravi Kumar',
                  message: 'Updated the API documentation',
                  time: '10 minutes ago',
                  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
                },
                {
                  sender: 'Sreedhar Gowda',
                  message: 'Need review on the latest PR',
                  time: '1 hour ago',
                  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
                },
              ].map((message, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <img
                    src={message.avatar}
                    alt={message.sender}
                    className="h-8 w-8 rounded-full"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{message.sender}</p>
                    <p className="text-sm text-gray-500">{message.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{message.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Alerts */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-red-600" />
                System Alerts
              </h2>
            </div>
            <div className="space-y-4">
              {[
                {
                  title: 'Security Update Available',
                  description: 'New security patch ready for deployment',
                  type: 'warning',
                },
                {
                  title: 'Server Maintenance',
                  description: 'Scheduled maintenance on Saturday',
                  type: 'info',
                },
              ].map((alert, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-md ${
                    alert.type === 'warning'
                      ? 'bg-yellow-50 border border-yellow-200'
                      : 'bg-blue-50 border border-blue-200'
                  }`}
                >
                  <p
                    className={`text-sm font-medium ${
                      alert.type === 'warning' ? 'text-yellow-800' : 'text-blue-800'
                    }`}
                  >
                    {alert.title}
                  </p>
                  <p
                    className={`text-sm ${
                      alert.type === 'warning' ? 'text-yellow-700' : 'text-blue-700'
                    }`}
                  >
                    {alert.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Event Reminders */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-orange-600" />
                Event Reminders
              </h2>
            </div>
            <div className="space-y-4">
              {[
                {
                  event: 'Tech Talk: AI in Education',
                  date: 'March 15, 2024',
                  time: '2:00 PM - 3:30 PM',
                },
                {
                  event: 'Team Building Workshop',
                  date: 'March 20, 2024',
                  time: '10:00 AM - 4:00 PM',
                },
              ].map((event, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-100 rounded-md hover:bg-gray-50 transition"
                >
                  <p className="text-sm font-medium text-gray-900">{event.event}</p>
                  <p className="text-xs text-gray-500 mt-1">{event.date}</p>
                  <p className="text-xs text-gray-500">{event.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notifications;