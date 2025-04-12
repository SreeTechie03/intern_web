import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as Icons from 'lucide-react';
import { Calendar, SortAsc, Medal } from 'lucide-react';

// MetricCard Component
const MetricCard = ({ metric, isLoading }) => {
  const IconComponent = Icons[metric.icon];

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-10 bg-gray-200 rounded w-3/4"></div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-600 text-sm font-medium">{metric.title}</h3>
        <div className="p-2 rounded-lg bg-blue-50">
          <IconComponent className="w-5 h-5 text-blue-500" />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
          <div className="flex items-center mt-2">
            <span className={`text-sm ${metric.trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {metric.trend >= 0 ? '+' : ''}{metric.trend}%
            </span>
            <span className="text-gray-500 text-sm ml-1">vs last period</span>
          </div>
        </div>
      </div>
    </div>
  );
};

MetricCard.propTypes = {
  metric: PropTypes.shape({
    title: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    trend: PropTypes.number.isRequired,
    icon: PropTypes.string.isRequired
  }).isRequired,
  isLoading: PropTypes.bool
};

MetricCard.defaultProps = {
  isLoading: false
};

// FilterBar Component
const FilterBar = ({
  timeFilter,
  sortOption,
  onTimeFilterChange,
  onSortOptionChange,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-4 mb-6">
      <div className="flex items-center gap-2 bg-white rounded-lg shadow-sm p-1">
        <Calendar className="w-4 h-4 text-gray-500 ml-2" />
        {['week', 'month', 'quarter'].map((filter) => (
          <button
            key={filter}
            onClick={() => onTimeFilterChange(filter)}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors
              ${timeFilter === filter
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-600 hover:bg-gray-100'
              }`}
          >
            This {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 bg-white rounded-lg shadow-sm p-1">
        <SortAsc className="w-4 h-4 text-gray-500 ml-2" />
        {['sales', 'revenue'].map((option) => (
          <button
            key={option}
            onClick={() => onSortOptionChange(option)}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors
              ${sortOption === option
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-600 hover:bg-gray-100'
              }`}
          >
            By {option.charAt(0).toUpperCase() + option.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

FilterBar.propTypes = {
  timeFilter: PropTypes.oneOf(['week', 'month', 'quarter']).isRequired,
  sortOption: PropTypes.oneOf(['sales', 'revenue']).isRequired,
  onTimeFilterChange: PropTypes.func.isRequired,
  onSortOptionChange: PropTypes.func.isRequired
};

// LeaderboardTable Component
const LeaderboardTable = ({ employees, isLoading }) => {
  if (isLoading) {
    return (
      <div className="animate-pulse">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center space-x-4 py-4 border-b">
            <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const getRankColor = (rank) => {
    switch (rank) {
      case 1: return 'text-yellow-500';
      case 2: return 'text-gray-400';
      case 3: return 'text-amber-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="border-b">
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Rank</th>
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Employee</th>
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Sales</th>
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Revenue</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id} className="border-b hover:bg-gray-50">
              <td className="py-4 px-4">
                {employee.rank <= 3 ? (
                  <Medal className={`w-6 h-6 ${getRankColor(employee.rank)}`} />
                ) : (
                  <span className="text-gray-600">{employee.rank}</span>
                )}
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center">
                  {employee.avatar ? (
                    <img src={employee.avatar} alt="" className="w-8 h-8 rounded-full mr-3" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-medium">
                        {employee.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  )}
                  <div>
                    <div className="font-medium text-gray-900">{employee.name}</div>
                    <div className="text-sm text-gray-500">{employee.department}</div>
                  </div>
                </div>
              </td>
              <td className="py-4 px-4 text-gray-900">{employee.salesCount}</td>
              <td className="py-4 px-4 text-gray-900">${employee.revenue.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

LeaderboardTable.propTypes = {
  employees: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    rank: PropTypes.number.isRequired,
    salesCount: PropTypes.number.isRequired,
    revenue: PropTypes.number.isRequired,
    avatar: PropTypes.string,
    department: PropTypes.string.isRequired
  })).isRequired,
  isLoading: PropTypes.bool
};

LeaderboardTable.defaultProps = {
  isLoading: false
};

// Mock Data
const mockMetrics = [
  { title: 'Total Sales Count', value: 856, trend: 12.5, icon: 'BarChart3' },
  { title: 'Pre Sales', value: 245, trend: 8.2, icon: 'Users' },
  { title: 'Full Payments', value: 512, trend: 15.8, icon: 'Wallet' },
  { title: 'Post Pending', value: 99, trend: -4.3, icon: 'Clock' },
  { title: 'Monthly Target', value: 1000, trend: 0, icon: 'Target' },
];

const mockEmployees = [
  {
    id: '1',
    name: 'Sarah Johnson',
    rank: 1,
    salesCount: 156,
    revenue: 285000,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    department: 'Enterprise Sales'
  },
  {
    id: '2',
    name: 'Michael Chen',
    rank: 2,
    salesCount: 143,
    revenue: 262000,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    department: 'SMB Sales'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    rank: 3,
    salesCount: 138,
    revenue: 251000,
    department: 'Enterprise Sales'
  },
  {
    id: '4',
    name: 'David Kim',
    rank: 4,
    salesCount: 125,
    revenue: 228000,
    department: 'SMB Sales'
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    rank: 5,
    salesCount: 119,
    revenue: 215000,
    department: 'Enterprise Sales'
  },
];

// Main App Component
function SalesEmp() {
  const [isLoading, setIsLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState('month');
  const [sortOption, setSortOption] = useState('sales');
  const [metrics, setMetrics] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Simulate API call
    const loadData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setMetrics(mockMetrics);
      setEmployees(mockEmployees);
      setIsLoading(false);
    };

    loadData();
  }, [timeFilter]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Sales Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track your team's performance and sales metrics
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-5">
          {metrics.map((metric, index) => (
            <MetricCard
              key={index}
              metric={metric}
              isLoading={isLoading}
            />
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Top Performance Ranking
            </h2>
            <FilterBar
              timeFilter={timeFilter}
              sortOption={sortOption}
              onTimeFilterChange={setTimeFilter}
              onSortOptionChange={setSortOption}
            />
          </div>
          <LeaderboardTable
            employees={employees}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}

export default SalesEmp;