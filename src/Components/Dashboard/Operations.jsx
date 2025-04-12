import React, { useEffect, useState } from 'react';
import {BarChart3,ShoppingCart,Clock,CheckCircle,ArrowUpRight} from 'lucide-react';
import {AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer,BarChart,Bar,Legend} from 'recharts';

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
const exportToCSV = (metrics) => {
  const headers = ['Metric', 'Count', 'Trend', 'Period'];
  
  const rows = [
    ['Total Sales', metrics.totalSales.count, metrics.totalSales.trend, metrics.totalSales.period],
    ['Pre-Sales', metrics.preSales.count, metrics.preSales.trend, metrics.preSales.period],
    ['Post-Pending Sales', metrics.postPendingSales.count, metrics.postPendingSales.trend, metrics.postPendingSales.period],
    ['Fully Received Sales', metrics.fullyReceivedSales.count, metrics.fullyReceivedSales.trend, metrics.fullyReceivedSales.period],
  ];

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `operations_metrics_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Sample data for charts
const monthlyData = [
  { name: 'Jan', totalSales: 1000, preSales: 400, postPending: 300, fullyReceived: 300 },
  { name: 'Feb', totalSales: 1200, preSales: 500, postPending: 350, fullyReceived: 350 },
  { name: 'Mar', totalSales: 1100, preSales: 450, postPending: 325, fullyReceived: 325 },
  { name: 'Apr', totalSales: 1300, preSales: 550, postPending: 375, fullyReceived: 375 },
  { name: 'May', totalSales: 1400, preSales: 600, postPending: 400, fullyReceived: 400 },
  { name: 'Jun', totalSales: 1284, preSales: 456, postPending: 284, fullyReceived: 544 },
  { name: 'Jul', totalSales: 1500, preSales: 700, postPending: 450, fullyReceived: 450 },
  { name: 'Aug', totalSales: 1600, preSales: 800, postPending: 500, fullyReceived: 500 },
  { name: 'Sep', totalSales: 1700, preSales: 900, postPending: 550, fullyReceived: 550 },
  { name: 'Oct', totalSales: 1800, preSales: 1000, postPending: 600, fullyReceived: 600 },
  { name: 'Nov', totalSales: 1900, preSales: 1100, postPending: 650, fullyReceived: 650 },
  { name: 'Dec', totalSales: 2000, preSales: 1200, postPending: 700, fullyReceived: 700 },
];

// Dashboard Component
function Dashboard() {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setMetrics({
        totalSales: {
          count: 1284,
          trend: "+12.5%",
          period: "This month"
        },
        preSales: {
          count: 456,
          trend: "+8.2%",
          period: "This month"
        },
        postPendingSales: {
          count: 284,
          trend: "-3.1%",
          period: "This month"
        },
        fullyReceivedSales: {
          count: 544,
          trend: "+15.8%",
          period: "This month"
        }
      });
    }, 1000);
  }, []);

  const handleExport = () => {
    if (metrics) {
      exportToCSV(metrics);
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
            <button
              onClick={handleExport}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <ArrowUpRight className="w-4 h-4" />
              Export Data
            </button>
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
                <AreaChart data={monthlyData}>
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
                <BarChart data={monthlyData}>
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