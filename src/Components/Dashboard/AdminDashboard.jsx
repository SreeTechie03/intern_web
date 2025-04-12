import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Area,
  AreaChart,
} from 'recharts';
import {
  DollarSign,
  ShoppingCart,
  Clock,
  CreditCard,
} from 'lucide-react';

// Mock Data
const employees = [
  { id: 1, name: 'John Doe', salesCount: 145, revenue: 285000 },
  { id: 2, name: 'Jane Smith', salesCount: 132, revenue: 264000 },
  { id: 3, name: 'Mike Johnson', salesCount: 128, revenue: 256000 },
  { id: 4, name: 'Sarah Williams', salesCount: 120, revenue: 240000 },
  { id: 5, name: 'Tom Brown', salesCount: 115, revenue: 230000 },
];

const teams = [
  { id: 1, name: 'Alpha Team', totalSales: 450, revenue: 900000 },
  { id: 2, name: 'Beta Team', totalSales: 380, revenue: 760000 },
  { id: 3, name: 'Gamma Team', totalSales: 350, revenue: 700000 },
  { id: 4, name: 'Delta Team', totalSales: 320, revenue: 640000 },
  { id: 5, name: 'Epsilon Team', totalSales: 300, revenue: 600000 },
  
];

const salesTrends = [
  { date: 'Jan', sales: 65, revenue: 130000 },
  { date: 'Feb', sales: 75, revenue: 150000 },
  { date: 'Mar', sales: 85, revenue: 170000 },
  { date: 'Apr', sales: 95, revenue: 190000 },
  { date: 'May', sales: 15, revenue: 2100 },
  { date: 'Jun', sales: 115, revenue: 230000 },
  { date: 'Jul', sales: 125, revenue: 250000 },
  { date: 'Aug', sales: 135, revenue: 270000 },
  { date: 'Sep', sales: 45, revenue: 2000 },
  { date: 'Oct', sales: 155, revenue: 310000 },
  { date: 'Nov', sales: 165, revenue: 330000 },
  { date: 'Dec', sales: 175, revenue: 350000 },
];

const salesTypes = [
  { name: 'Pre-sales', value: 250 },
  { name: 'Full Payments', value: 450 },
  { name: 'Post Pending', value: 300 },
];

const teamPerformance = [
  { team: 'Alpha Team', sales: 450, revenue: 900000 },
  { team: 'Beta Team', sales: 380, revenue: 760000 },
  { team: 'Gamma Team', sales: 350, revenue: 700000 },
  { team: 'Delta Team', sales: 320, revenue: 640000 },
  { team: 'Epsilon Team', sales: 300, revenue: 600000 },
  { team: 'Zeta Team', sales: 280, revenue: 560000 },
  { team: 'Eta Team', sales: 260, revenue: 520000 },
  { team: 'Theta Team', sales: 240, revenue: 480000 },
  { team: 'Iota Team', sales: 220, revenue: 440000 },
  { team: 'Kappa Team', sales: 200, revenue: 400000 },

];

const COLORS = ['#6366f1', '#06b6d4', '#10b981', '#f59e0b'];

// Components
const colorVariants = {
  indigo: 'bg-indigo-50 text-indigo-600',
  cyan: 'bg-cyan-50 text-cyan-600',
  emerald: 'bg-emerald-50 text-emerald-600',
  amber: 'bg-amber-50 text-amber-600',
};

const SummaryCard = ({ icon, label, value, trend, color = 'indigo' }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className={`p-3 rounded-lg ${colorVariants[color]}`}>{icon}</div>
        {trend !== undefined && (
          <span 
            className={`text-sm font-medium px-2.5 py-0.5 rounded-full ${
              trend >= 0 
                ? 'bg-emerald-50 text-emerald-600' 
                : 'bg-red-50 text-red-600'
            }`}
          >
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <h3 className="mt-4 text-2xl font-bold text-gray-900">{value}</h3>
      <p className="text-sm font-medium text-gray-500 mt-1">{label}</p>
    </div>
  );
};

const DataTable = ({ headers, data, columns }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, index) => (
            <tr 
              key={index}
              className={`hover:bg-gray-50 transition-colors duration-150 ${
                index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
              }`}
            >
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-600"
                >
                  {column === 'revenue' ? (
                    <span className="font-medium text-gray-900">
                      ${row[column].toLocaleString()}
                    </span>
                  ) : (
                    row[column]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Main App Component
function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-[1600px] mx-auto space-y-8">
        {/* Page Title */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">Track your business performance and growth</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <SummaryCard
            icon={<ShoppingCart className="w-6 h-6" />}
            label="Total Sales"
            value="1,234"
            trend={12}
            color="indigo"
          />
          <SummaryCard
            icon={<Clock className="w-6 h-6" />}
            label="Pre-Sales"
            value="250"
            trend={8}
            color="cyan"
          />
          <SummaryCard
            icon={<CreditCard className="w-6 h-6" />}
            label="Full Payments"
            value="450"
            trend={15}
            color="emerald"
          />
          <SummaryCard
            icon={<DollarSign className="w-6 h-6" />}
            label="Total Revenue"
            value="$3,000,000"
            trend={10}
            color="amber"
          />
        </div>

        {/* Main Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sales Trends */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Sales & Revenue Trends</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesTrends}>
                  <defs>
                    <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" stroke="#6b7280" />
                  <YAxis yAxisId="left" stroke="#6b7280" />
                  <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.5rem',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    }}
                  />
                  <Legend />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="sales"
                    stroke="#6366f1"
                    fill="url(#salesGradient)"
                    strokeWidth={2}
                    name="Sales"
                  />
                  <Area
                    yAxisId="right"
                    type="monotone"
                    dataKey="revenue"
                    stroke="#10b981"
                    fill="url(#revenueGradient)"
                    strokeWidth={2}
                    name="Revenue"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sales Distribution */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Sales Distribution</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={salesTypes}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {salesTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.5rem',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    }}
                  />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Tables Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">Top Performing Employees</h2>
              <p className="mt-1 text-sm text-gray-500">Based on sales performance and revenue generated</p>
            </div>
            <DataTable
              headers={['Name', 'Sales Count', 'Revenue']}
              data={employees}
              columns={['name', 'salesCount', 'revenue']}
            />
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">Top Teams</h2>
              <p className="mt-1 text-sm text-gray-500">Ranked by total sales and revenue</p>
            </div>
            <DataTable
              headers={['Team Name', 'Total Sales', 'Revenue']}
              data={teams}
              columns={['name', 'totalSales', 'revenue']}
            />
          </div>
        </div>

        {/* Team Performance */}
        <div className="bg-white rounded-lg p-5 shadow-md border border-gray-200">
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-2xl font-bold text-gray-800">Team Performance Metrics</h2>
    <div className="flex space-x-4">
      <span className="flex items-center">
        <span className="w-3 h-3 bg-indigo-500 rounded-full mr-2"></span>
        <span className="text-sm text-gray-600">Sales</span>
      </span>
      <span className="flex items-center">
        <span className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></span>
        <span className="text-sm text-gray-600">Revenue</span>
      </span>
    </div>
  </div>
  
  <div className="h-72">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={teamPerformance}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        barSize={28}
      >
        <CartesianGrid vertical={false} stroke="#f3f4f6" />
        <XAxis 
          dataKey="team" 
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#6b7280', fontSize: 12 }}
        />
        <YAxis 
          yAxisId="left"
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#6b7280', fontSize: 12 }}
        />
        <YAxis 
          yAxisId="right" 
          orientation="right"
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#6b7280', fontSize: 12 }}
        />
        <Tooltip
          contentStyle={{
            background: 'rgba(255, 255, 255, 0.96)',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            padding: '12px',
          }}
          itemStyle={{ color: '#1f2937' }}
          labelStyle={{ fontWeight: 'bold', color: '#111827' }}
        />
        <Bar 
          yAxisId="left" 
          dataKey="sales" 
          fill="#6366f1" 
          name="Sales (units)" 
          radius={[6, 6, 0, 0]}
          animationDuration={1500}
        />
        <Bar 
          yAxisId="right" 
          dataKey="revenue" 
          fill="#10b981" 
          name="Revenue ($)" 
          radius={[6, 6, 0, 0]}
          animationDuration={1500}
        />
      </BarChart>
    </ResponsiveContainer>
  </div>
  
  <div className="mt-4 flex justify-end">
    <select className="text-sm border border-gray-300 rounded-md px-3 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100">
      <option>Last 7 days</option>
      <option>Last 30 days</option>
      <option>This Quarter</option>
    </select>
  </div>
</div>
      </div>
    </div>
  );
}

export default App;