import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Search, Filter, Plus, List, X, ChevronDown, ChevronLeft, ChevronRight, Key } from 'lucide-react';
import * as XLSX from 'xlsx';

const STATUS_OPTIONS = ['All', 'Hide', 'Finished', 'Waiting', 'Live', 'Canceled', 'Finished Behind'];
const PROJECTS = [
  'All',
  'Credit Card Fraud Detection',
  'Install Application Lead Generation',
  'Software Piracy Protection System',
  'Therapy and Mental Health Support',
  'Video Editing Service',
  'Wardrobe Styling'
];

const DUMMY_MEETINGS = [
  {
    id: 'MTG001',
    title: 'Project Kickoff Meeting',
    host: 'John Smith',
    startDate: '2025-01-09 10:00 AM',
    endDate: '2025-01-09 11:00 AM',
    status: 'Live'
  },
  {
    id: 'MTG002', 
    title: 'Weekly Team Sync',
    host: 'Sarah Johnson',
    startDate: '2025-01-09 2:00 PM',
    endDate: '2025-01-09 3:00 PM',
    status: 'Waiting'
  },
  {
    id: 'MTG003',
    title: 'Client Presentation',
    host: 'Mike Wilson', 
    startDate: '2025-01-10 11:00 AM',
    endDate: '2025-01-10 12:00 PM',
    status: 'Finished'
  }
];

const DURATION_OPTIONS = [
  { label: 'Today', value: 'today' },
  { label: 'Last 30 Days', value: 'last30' },
  { label: 'This Month', value: 'thisMonth' },
  { label: 'Last Month', value: 'lastMonth' },
  { label: 'Last 90 Days', value: 'last90' },
  { label: 'Last 6 Months', value: 'last6months' },
  { label: 'Last 1 Year', value: 'last1year' },
  { label: 'Custom Range', value: 'custom' }
];

const Zoom = () => {
  const navigate = useNavigate();
  const [view, setView] = useState('table');
  const [calendarView, setCalendarView] = useState('month');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedProject, setSelectedProject] = useState('All');
  const [showDurationDropdown, setShowDurationDropdown] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [entries, setEntries] = useState(10);
  const [showAddMeetingModal, setShowAddMeetingModal] = useState(false);
  const [meetings, setMeetings] = useState(DUMMY_MEETINGS);
  const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 1));

  const handleDurationSelect = (option) => {
    const now = new Date();
    let startDate = new Date();
    let endDate = new Date();

    switch (option.value) {
      case 'today':
        startDate = new Date(now.setHours(0, 0, 0, 0));
        endDate = new Date(now.setHours(23, 59, 59, 999));
        break;
      case 'last30':
        startDate = new Date(now.setDate(now.getDate() - 30));
        break;
      case 'thisMonth':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        break;
      case 'lastMonth':
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        endDate = new Date(now.getFullYear(), now.getMonth(), 0);
        break;
      case 'last90':
        startDate = new Date(now.setDate(now.getDate() - 90));
        break;
      case 'last6months':
        startDate = new Date(now.setMonth(now.getMonth() - 6));
        break;
      case 'last1year':
        startDate = new Date(now.setFullYear(now.getFullYear() - 1));
        break;
      default:
        break;
    }

    const filteredMeetings = DUMMY_MEETINGS.filter(meeting => {
      const meetingDate = new Date(meeting.startDate);
      return meetingDate >= startDate && meetingDate <= endDate;
    });

    setMeetings(filteredMeetings);
    setShowDurationDropdown(false);
  };

  const handleExport = () => {
    const data = [
      ['Meeting ID', 'Title', 'Host', 'Start Date', 'End Date', 'Status'],
      ...meetings.map(meeting => [
        meeting.id,
        meeting.title,
        meeting.host,
        meeting.startDate,
        meeting.endDate,
        meeting.status
      ])
    ];

    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Meetings');
    XLSX.writeFile(wb, 'meetings_data.xlsx');
  };

  const renderCalendarContent = () => {
    switch (calendarView) {
      case 'month': {
        const daysInMonth = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          0
        ).getDate();
        const firstDay = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          1
        ).getDay();
        const days = Array.from(
          { length: daysInMonth + firstDay },
          (_, i) => i - firstDay + 1
        );

        return (
          <div className="grid grid-cols-7 gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center font-medium text-blue-600 py-2">
                {day}
              </div>
            ))}
            {days.map((day, index) => {
              if (day <= 0) {
                return <div key={`empty-${index}`} className="min-h-[100px]" />;
              }
              return (
                <div
                  key={day}
                  className={`min-h-[100px] p-2 border rounded-lg hover:bg-sky-50 ${
                    day === currentDate.getDate() ? 'ring-2 ring-sky-500' : ''
                  }`}
                >
                  <div className="font-medium text-sky-700 mb-2">{day}</div>
                  {meetings
                    .filter(
                      (meeting) =>
                        new Date(meeting.startDate).getDate() === day
                    )
                    .map((meeting) => (
                      <div
                        key={meeting.id}
                        className="text-xs bg-sky-100 p-1 rounded mb-1 truncate text-sky-700"
                      >
                        {meeting.title}
                      </div>
                    ))}
                </div>
              );
            })}
          </div>
        );
      }
      case 'week':
        return (
          <div className="grid grid-cols-7 gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="border rounded-lg p-4">
                <div className="font-medium text-sky-700 mb-4">{day}</div>
                <div className="space-y-2">
                  {meetings.map((meeting) => (
                    <div
                      key={meeting.id}
                      className="bg-sky-100 p-2 rounded text-sm text-sky-700"
                    >
                      {meeting.title}
                      <div className="text-xs text-sky-600 mt-1">
                        {new Date(meeting.startDate).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      case 'day':
        return (
          <div className="border rounded-lg p-4">
            <div className="grid grid-cols-1 gap-4">
              {Array.from({ length: 24 }, (_, i) => (
                <div key={i} className="flex items-start border-t py-2">
                  <div className="w-20 text-sm text-sky-600">
                    {i.toString().padStart(2, '0')}:00
                  </div>
                  <div className="flex-1 min-h-[60px]">
                    {meetings.map((meeting) => {
                      const meetingHour = new Date(
                        meeting.startDate
                      ).getHours();
                      return (
                        meetingHour === i && (
                          <div
                            key={meeting.id}
                            className="bg-sky-100 p-2 rounded text-sm text-sky-700"
                          >
                            {meeting.title}
                            <div className="text-xs text-sky-600 mt-1">
                              {new Date(
                                meeting.startDate
                              ).toLocaleTimeString()}{' '}
                              -{' '}
                              {new Date(
                                meeting.endDate
                              ).toLocaleTimeString()}
                            </div>
                          </div>
                        )
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation Bar */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-4">
          {/* Left Section */}
          <div className="flex flex-wrap items-center gap-4 lg:gap-8">
            {/* Duration Dropdown */}
            <div className="relative">
              <div className="flex items-center gap-2">
                <span className="text-slate-600 text-sm">Duration</span>
                <button
                  onClick={() => setShowDurationDropdown(!showDurationDropdown)}
                  className="flex items-center gap-2 px-3 py-1.5 border rounded text-slate-600 text-sm hover:border-sky-400 min-w-[200px]"
                >
                  <span>Start Date To End Date</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
              {showDurationDropdown && (
                <div className="absolute z-50 mt-1 w-48 bg-white border rounded-md shadow-lg">
                  {DURATION_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-sky-50 text-slate-600"
                      onClick={() => handleDurationSelect(option)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Status Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-slate-600 text-sm">Status</span>
              <select
                className="px-3 py-1.5 border rounded text-sm text-slate-600 hover:border-sky-400 min-w-[120px]"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Bar */}
            <div className="relative flex-grow lg:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Start typing to search"
                className="w-full pl-10 pr-4 py-1.5 border rounded text-sm focus:border-sky-400 focus:ring focus:ring-sky-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 ml-auto">
            <button
              className="flex items-center gap-2 text-slate-600 text-sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
              Filters
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 border rounded text-sm text-slate-600 hover:bg-sky-50">
              <X className="h-4 w-4" />
              Clear
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mt-4 p-4 border rounded-lg bg-sky-50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Project
                </label>
                <select
                  className="w-full px-3 py-1.5 border rounded text-sm text-slate-600"
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                >
                  {PROJECTS.map((project) => (
                    <option key={project} value={project}>
                      {project}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Date Range
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-1.5 border rounded text-sm text-slate-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Host
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-1.5 border rounded text-sm text-slate-600"
                  placeholder="Search hosts..."
                />
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddMeetingModal(true)}
              className="flex items-center gap-2 bg-sky-500 text-white px-4 py-2 rounded text-sm hover:bg-sky-600"
            >
              <Plus className="h-4 w-4" />
              Add Meeting
            </button>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 border px-4 py-2 rounded text-sm text-slate-600 hover:bg-sky-50"
            >
              Export
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setView('table')}
              className={`p-2 rounded ${
                view === 'table'
                  ? 'bg-sky-500 text-white'
                  : 'border text-slate-600 hover:bg-sky-50'
              }`}
            >
              <List className="h-5 w-5" />
            </button>
            <button
              onClick={() => setView('calendar')}
              className={`p-2 rounded ${
                view === 'calendar'
                  ? 'bg-sky-500 text-white'
                  : 'border text-slate-600 hover:bg-sky-50'
              }`}
            >
              <Calendar className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Table View */}
      {view === 'table' && (
        <div className="bg-white shadow-sm mt-4 mx-4 rounded-lg overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b bg-sky-50">
                <th className="w-12 py-4 px-4">
                  <input type="checkbox" className="rounded border-slate-300" />
                </th>
                <th className="text-left py-4 px-4 font-medium text-slate-700 text-sm">
                  Meeting Id
                </th>
                <th className="text-left py-4 px-4 font-medium text-slate-700 text-sm">
                  Meeting Title
                </th>
                <th className="text-left py-4 px-4 font-medium text-slate-700 text-sm">
                  Meeting Host
                </th>
                <th className="text-left py-4 px-4 font-medium text-slate-700 text-sm">
                  Start On
                </th>
                <th className="text-left py-4 px-4 font-medium text-slate-700 text-sm">
                  End On
                </th>
                <th className="text-left py-4 px-4 font-medium text-slate-700 text-sm">
                  Status
                </th>
                <th className="text-left py-4 px-4 font-medium text-slate-700 text-sm">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {meetings.map((meeting, index) => (
                <tr
                  key={meeting.id}
                  className={index % 2 === 0 ? 'bg-sky-50/50' : ''}
                >
                  <td className="py-4 px-4">
                    <input type="checkbox" className="rounded border-slate-300" />
                  </td>
                  <td className="py-4 px-4 text-sm text-slate-600">
                    {meeting.id}
                  </td>
                  <td className="py-4 px-4 text-sm text-slate-600">
                    {meeting.title}
                  </td>
                  <td className="py-4 px-4 text-sm text-slate-600">
                    {meeting.host}
                  </td>
                  <td className="py-4 px-4 text-sm text-slate-600">
                    {meeting.startDate}
                  </td>
                  <td className="py-4 px-4 text-sm text-slate-600">
                    {meeting.endDate}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        meeting.status === 'Live'
                          ? 'bg-emerald-100 text-emerald-800'
                          : meeting.status === 'Waiting'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-800'
                      }`}
                    >
                      {meeting.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <button className="text-sky-600 hover:text-sky-800 text-sm">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between p-4 border-t gap-4">
            <div className="flex items-center gap-2">
              <span className="text-slate-600 text-sm">Show</span>
              <select
                className="border rounded px-2 py-1 text-sm text-slate-600"
                value={entries}
                onChange={(e) => setEntries(Number(e.target.value))}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span className="text-slate-600 text-sm">entries</span>
            </div>

            <div className="text-slate-600 text-sm">
              Showing 1 to {meetings.length} of {meetings.length} entries
            </div>

            <div className="flex items-center gap-2">
              <button
                className="px-3 py-1 border rounded text-sm text-slate-400"
                disabled
              >
                Previous
              </button>
              <button
                className="px-3 py-1 border rounded text-sm text-slate-400"
                disabled
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Calendar View */}
      {view === 'calendar' && (
        <div className="bg-white shadow-sm mt-4 mx-4 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const newDate = new Date(currentDate);
                  newDate.setMonth(currentDate.getMonth() - 1);
                  setCurrentDate(newDate);
                }}
                className="p-2 border rounded hover:bg-sky-50 text-slate-600"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => {
                  const newDate = new Date(currentDate);
                  newDate.setMonth(currentDate.getMonth() + 1);
                  setCurrentDate(newDate);
                }}
                className="p-2 border rounded hover:bg-sky-50 text-slate-600"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => setCurrentDate(new Date(2025, 0, 1))}
                className="px-3 py-1 border rounded text-sm hover:bg-sky-50 text-slate-600"
              >
                Today
              </button>
            </div>
            <h2 className="text-lg font-medium text-slate-700">
              {currentDate.toLocaleString('default', {
                month: 'long',
                year: 'numeric',
              })}
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCalendarView('month')}
                className={`px-3 py-1 rounded text-sm ${
                  calendarView === 'month'
                    ? 'bg-sky-500 text-white'
                    : 'border hover:bg-sky-50 text-slate-600'
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setCalendarView('week')}
                className={`px-3 py-1 rounded text-sm ${
                  calendarView === 'week'
                    ? 'bg-sky-500 text-white'
                    : 'border hover:bg-sky-50 text-slate-600'
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setCalendarView('day')}
                className={`px-3 py-1 rounded text-sm ${
                  calendarView === 'day'
                    ? 'bg-sky-500 text-white'
                    : 'border hover:bg-sky-50 text-slate-600'
                }`}
              >
                Day
              </button>
            </div>
          </div>

          {renderCalendarContent()}
        </div>
      )}

      {/* Add Meeting Modal */}
      {showAddMeetingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-slate-900 mb-6">
                Add Meeting
              </h2>
              
              <div className="bg-white rounded-lg border border-slate-200">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-slate-900 mb-4">
                    Meeting Details
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-center p-8 bg-sky-50 rounded-lg border border-dashed border-sky-300">
                      <div className="text-center">
                        <Key className="h-12 w-12 text-sky-400 mx-auto mb-4" />
                        <p className="text-slate-500 mb-2">Please configure the Zoom Setting credentials first</p>
                        <button 
                          onClick={() => {
                            setShowAddMeetingModal(false);
                            navigate('/zoom-settings');
                          }}
                          className="inline-flex items-center px-4 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600 transition-colors"
                        >
                          Zoom Settings
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 bg-slate-50 rounded-b-lg border-t flex justify-end gap-3">
              <button
                onClick={() => setShowAddMeetingModal(false)}
                className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-sky-500 rounded-md hover:bg-sky-600 transition-colors">
                Add Meeting
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Zoom;