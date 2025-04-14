import React, { useEffect, useState } from 'react';
import {BarChart3, ShoppingCart, Clock, CheckCircle, ArrowUpRight} from 'lucide-react';
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend} from 'recharts';

// MetricCard Component
const MetricCard = ({ title, count, trend, period, icon: Icon, color }) => {
  const isPositiveTrend = trend.startsWith('+');

  return (
    <div className={`${color} rounded-2xl p-0.5`}>
      <div className="bg-white rounded-[14px] p-6 h-full">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center space-x-3">
            <Icon className="w-5 h-5 text-gray-600" />
            <h3 className="font-medium text-gray-600">{title}</h3>
          </div>
          <span
            className={`text-sm font-medium px-2 py-1 rounded-full ${
              isPositiveTrend
                ? 'text-emerald-700 bg-emerald-50'
                : 'text-rose-700 bg-rose-50'
            }`}
          >
            {trend}
          </span>
        </div>
        <div className="space-y-1">
          <div className="text-3xl font-bold text-gray-900">
            {count.toLocaleString()}
          </div>
          <div className="text-sm text-gray-500">{period}</div>
        </div>
      </div>
    </div>
  );
};

// Export utility function
const exportToCSV = (metrics, selectedPeriod) => {
  const headers = ['Metric', 'Count', 'Trend', 'Period'];
  
  const rows = [
    ['Total Sales', metrics.totalSales.count, metrics.totalSales.trend, selectedPeriod],
    ['Pre-Sales', metrics.preSales.count, metrics.preSales.trend, selectedPeriod],
    ['Post-Pending Sales', metrics.postPendingSales.count, metrics.postPendingSales.trend, selectedPeriod],
    ['Fully Received Sales', metrics.fullyReceivedSales.count, metrics.fullyReceivedSales.trend, selectedPeriod],
  ];

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `operations_metrics_${selectedPeriod}_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Sample data generator for different periods
const generateData = (period) => {
  let data = [];
  const now = new Date();
  let dataPoints;
  let interval;
  
  switch(period) {
    case '7d':
      dataPoints = 7;
      interval = 'day';
      break;
    case '1m':
      dataPoints = 30;
      interval = 'day';
      break;
    case '3m':
      dataPoints = 12;
      interval = 'week';
      break;
    case '1y':
      dataPoints = 12;
      interval = 'month';
      break;
    default:
      dataPoints = 30;
      interval = 'day';
  }

  for (let i = dataPoints - 1; i >= 0; i--) {
    const date = new Date(now);
    if (interval === 'day') {
      date.setDate(date.getDate() - i);
    } else if (interval === 'week') {
      date.setDate(date.getDate() - (i * 7));
    } else {
      date.setMonth(date.getMonth() - i);
    }

    const baseValue = 1000 + Math.random() * 1000;
    data.push({
      name: interval === 'month' 
        ? date.toLocaleString('default', { month: 'short' })
        : date.toLocaleDateString('default', { month: 'short', day: 'numeric' }),
      totalSales: Math.round(baseValue),
      preSales: Math.round(baseValue * 0.4),
      postPending: Math.round(baseValue * 0.3),
      fullyReceived: Math.round(baseValue * 0.3)
    });
  }
  
  return data;
};

// Dashboard Component
function Dashboard() {
  const [metrics, setMetrics] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('1m');
  const [chartData, setChartData] = useState([]);

  const periods = [
    { value: '7d', label: '7 Days' },
    { value: '1m', label: '1 Month' },
    { value: '3m', label: '3 Months' },
    { value: '1y', label: '1 Year' },
  ];

  useEffect(() => {
    // Simulate API call with different metrics based on period
    const fetchData = () => {
      const data = generateData(selectedPeriod);
      setChartData(data);
      
      const lastValue = data[data.length - 1];
      const previousValue = data[data.length - 2];
      
      const calculateTrend = (current, previous) => {
        const trend = ((current - previous) / previous) * 100;
        return trend > 0 ? `+${trend.toFixed(1)}%` : `${trend.toFixed(1)}%`;
      };

      setMetrics({
        totalSales: {
          count: lastValue.totalSales,
          trend: calculateTrend(lastValue.totalSales, previousValue.totalSales),
          period: periods.find(p => p.value === selectedPeriod).label
        },
        preSales: {
          count: lastValue.preSales,
          trend: calculateTrend(lastValue.preSales, previousValue.preSales),
          period: periods.find(p => p.value === selectedPeriod).label
        },
        postPendingSales: {
          count: lastValue.postPending,
          trend: calculateTrend(lastValue.postPending, previousValue.postPending),
          period: periods.find(p => p.value === selectedPeriod).label
        },
        fullyReceivedSales: {
          count: lastValue.fullyReceived,
          trend: calculateTrend(lastValue.fullyReceived, previousValue.fullyReceived),
          period: periods.find(p => p.value === selectedPeriod).label
        }
      });
    };

    fetchData();
  }, [selectedPeriod]);

  const handleExport = () => {
    if (metrics) {
      exportToCSV(metrics, periods.find(p => p.value === selectedPeriod).label);
    }
  };

  if (!metrics) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" />
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-.3s]" />
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-.5s]" />
        </div>
      </div>
    );
  }

  const cards = [
    {
      title: 'Total Sales',
      data: metrics.totalSales,
      icon: BarChart3,
      color: 'bg-gradient-to-r from-blue-600 to-indigo-600',
    },
    {
      title: 'Pre-Sales',
      data: metrics.preSales,
      icon: ShoppingCart,
      color: 'bg-gradient-to-r from-violet-600 to-purple-600',
    },
    {
      title: 'Post-Pending Sales',
      data: metrics.postPendingSales,
      icon: Clock,
      color: 'bg-gradient-to-r from-amber-500 to-orange-600',
    },
    {
      title: 'Fully Received Sales',
      data: metrics.fullyReceivedSales,
      icon: CheckCircle,
      color: 'bg-gradient-to-r from-emerald-500 to-teal-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1600px] mx-auto p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-semibold text-gray-900">
              Operations Overview
            </h1>
            <div className="flex items-center gap-4">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {periods.map((period) => (
                  <option key={period.value} value={period.value}>
                    {period.label}
                  </option>
                ))}
              </select>
              <button
                onClick={handleExport}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <ArrowUpRight className="w-4 h-4" />
                Export Data
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            Last updated {new Date().toLocaleString()}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <MetricCard
              key={card.title}
              title={card.title}
              count={card.data.count}
              trend={card.data.trend}
              period={card.data.period}
              icon={card.icon}
              color={card.color}
            />
          ))}
        </div>

        {/* Charts Section */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Total Sales Trend */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Total Sales Trend</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="totalSales"
                    stroke="#4F46E5"
                    fill="#4F46E5"
                    fillOpacity={0.1}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sales Distribution */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Distribution</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="preSales" fill="#8B5CF6" />
                  <Bar dataKey="postPending" fill="#F59E0B" />
                  <Bar dataKey="fullyReceived" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Operations() {
  return <Dashboard />;
}

export default Operations;