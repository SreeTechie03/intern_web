import React, { useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';
import { IndianRupee, RefreshCw, AlertCircle } from 'lucide-react';
import { format, eachMonthOfInterval, startOfYear, endOfYear } from 'date-fns';
import axios from 'axios';
import './AdminDashboard.css';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch transactions from Razorpay API
  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('/api/payments', {
        auth: {
          username: import.meta.env.VITE_RAZORPAY_KEY_ID,
          password: import.meta.env.VITE_RAZORPAY_KEY_SECRET
        },
        params: {
          count: 100
        }
      });
      setTransactions(response.data.items);
    } catch (err) {
      setError('Failed to fetch transactions. Please try again later.');
      console.error('Error fetching transactions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Calculate payment metrics
  const paymentMetrics = transactions.reduce((acc, transaction) => {
    const amount = transaction.amount / 100;
    if (transaction.status === 'captured') {
      acc.completed += amount;
      acc.completedCount++;
    } else if (transaction.status === 'failed') {
      acc.failed += amount;
      acc.failedCount++;
    } else {
      acc.pending += amount;
      acc.pendingCount++;
    }
    return acc;
  }, { completed: 0, pending: 0, failed: 0, completedCount: 0, pendingCount: 0, failedCount: 0 });

  // Generate monthly revenue data from transactions
  const generateMonthlyRevenueData = () => {
    const currentYear = new Date().getFullYear();
    const months = eachMonthOfInterval({
      start: startOfYear(new Date(currentYear, 0, 1)),
      end: endOfYear(new Date(currentYear, 11, 31))
    });

    const monthlyData = months.map(month => {
      const monthKey = format(month, 'MMM');
      const monthStart = new Date(month.getFullYear(), month.getMonth(), 1);
      const monthEnd = new Date(month.getFullYear(), month.getMonth() + 1, 0);

      const successfulTransactions = transactions.filter(tx => {
        const txDate = new Date(tx.created_at * 1000);
        return tx.status === 'captured' && 
               txDate >= monthStart && 
               txDate <= monthEnd;
      });

      const failedTransactions = transactions.filter(tx => {
        const txDate = new Date(tx.created_at * 1000);
        return tx.status === 'failed' && 
               txDate >= monthStart && 
               txDate <= monthEnd;
      });

      const successfulRevenue = successfulTransactions.reduce((sum, tx) => sum + (tx.amount / 100), 0);
      const failedRevenue = failedTransactions.reduce((sum, tx) => sum + (tx.amount / 100), 0);
      
      return {
        month: monthKey,
        successful: successfulRevenue,
        failed: failedRevenue
      };
    });

    return monthlyData;
  };

  const monthlyRevenueData = generateMonthlyRevenueData();

  // Mock data for other sections
  const dashboardData = {
    teams: [
      { 
        id: 1,
        name: 'Alpha Squad', 
        revenue: 11200000, 
        members: 12,
        activeTasks: 45, 
        completionRate: 92,
        employees: [
          { id: 1, name: 'Ramana', position: 'Team Lead', joinDate: '2022-01-15' },
          { id: 2, name: 'Abhiram', position: 'Developer', joinDate: '2022-03-10' }
        ],
        projects: ['Guntur Karam', 'Nannaku Prematho']
      },
      { 
        id: 2,
        name: 'Beta Squad', 
        revenue: 1900000, 
        members: 10,
        activeTasks: 38, 
        completionRate: 88,
        employees: [
          { id: 3, name: 'Daya', position: 'Team Lead', joinDate: '2022-02-20' },
          { id: 4, name: 'Krishna', position: 'Designer', joinDate: '2022-04-05' }
        ],
        projects: ['Temper', 'Nannaku Prematho']
      },
      { 
        id: 3,
        name: 'Gamma Squad', 
        revenue: 1750000, 
        members: 8,
        activeTasks: 32, 
        completionRate: 90,
        employees: [
          { id: 5, name: 'Pushpa Raj', position: 'Team Lead', joinDate: '2022-05-12' },
          { id: 6, name: 'Srivalli', position: 'Marketer', joinDate: '2022-06-18' }
        ],
        projects: ['Pushpa']
      }
    ],
    allEmployees: [
      { id: 1, name: 'Ramana', team: 'Alpha Squad', position: 'Team Lead', salary: 8500, joinDate: '2022-01-15' },
      { id: 2, name: 'Abhiram', team: 'Alpha Squad', position: 'Developer', salary: 7500, joinDate: '2022-03-10' },
      { id: 3, name: 'Daya', team: 'Beta Squad', position: 'Team Lead', salary: 8200, joinDate: '2022-02-20' },
      { id: 4, name: 'Krishna', team: 'Beta Squad', position: 'Designer', salary: 6800, joinDate: '2022-04-05' },
      { id: 5, name: 'Pushpa Raj', team: 'Gamma Squad', position: 'Team Lead', salary: 8000, joinDate: '2022-05-12' },
      { id: 6, name: 'Srivalli', team: 'Gamma Squad', position: 'Marketer', salary: 6500, joinDate: '2022-06-18' }
    ]
  };

  // Chart data
  const revenueData = {
    labels: monthlyRevenueData.map(data => data.month),
    datasets: [
      {
        label: 'Successful Payments (₹)',
        data: monthlyRevenueData.map(data => data.successful),
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        tension: 0.4,
        fill: false
      },
      {
        label: 'Failed Payments (₹)',
        data: monthlyRevenueData.map(data => data.failed),
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        tension: 0.4,
        fill: false
      }
    ]
  };

  const teamPerformanceData = {
    labels: dashboardData.teams.map(team => team.name),
    datasets: [{
      label: 'Revenue (₹)',
      data: dashboardData.teams.map(team => team.revenue / 100000),
      backgroundColor: [
        'rgba(74, 107, 223, 0.7)',
        'rgba(243, 156, 18, 0.7)',
        'rgba(231, 76, 60, 0.7)'
      ],
      borderColor: [
        'rgba(74, 107, 223, 1)',
        'rgba(243, 156, 18, 1)',
        'rgba(231, 76, 60, 1)'
      ],
      borderWidth: 1
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        position: 'top',
        labels: {
          usePointStyle: true,
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label.split(' (')[0]}: ₹${context.raw.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return `₹${value.toLocaleString()}`;
          }
        }
      }
    },
    interaction: {
      mode: 'index',
      intersect: false
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'captured': return 'status-completed';
      case 'failed': return 'status-failed';
      case 'refunded': return 'status-pending';
      default: return 'status-pending';
    }
  };

  const renderTeamTab = () => (
    <div className="team-tab-content">
      <h2>Team Management</h2>
      <div className="team-cards-container">
        {dashboardData.teams.map(team => (
          <div key={team.id} className="team-card">
            <div className="team-header">
              <h3>{team.name}</h3>
              <div className="team-stats">
                <span>Revenue: ₹{team.revenue.toLocaleString()}</span>
                <span>Members: {team.members}</span>
                <span>Tasks: {team.activeTasks}</span>
                <span>Completion: {team.completionRate}%</span>
              </div>
            </div>
            
            <div className="team-details">
              <div className="team-members">
                <h4>Key Members</h4>
                <ul>
                  {team.employees.map(member => (
                    <li key={member.id}>
                      <strong>{member.name}</strong>
                      <span>{member.position}</span>
                      <small>Joined: {format(new Date(member.joinDate), 'dd MMM yyyy')}</small>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="team-projects">
                <h4>Current Projects</h4>
                <ul>
                  {team.projects.map((project, index) => (
                    <li key={index}>{project}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderEmployeesTab = () => (
    <div className="employees-tab">
      <h2>Employee Directory</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Team</th>
              <th>Position</th>
              <th>Salary</th>
              <th>Join Date</th>
            </tr>
          </thead>
          <tbody>
            {dashboardData.allEmployees.map(employee => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.team}</td>
                <td>{employee.position}</td>
                <td>₹{employee.salary.toLocaleString()}</td>
                <td>{format(new Date(employee.joinDate), 'dd MMM yyyy')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderTransactionsTab = () => (
    <div className="transactions-tab">
      <div className="flex justify-between items-center mb-4">
        <h2>Transaction History</h2>
        <button 
          onClick={fetchTransactions} 
          className="refresh-btn"
          disabled={loading}
        >
          <RefreshCw size={18} className={loading ? 'spinner' : ''} />
          Refresh
        </button>
      </div>

      {error && (
        <div className="error-message">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="loading-cell">
                  <RefreshCw size={24} className="spinner" />
                  Loading transactions...
                </td>
              </tr>
            ) : transactions.length > 0 ? (
              transactions.map(transaction => (
                <tr key={transaction.id}>
                  <td>{transaction.id}</td>
                  <td>
                    <IndianRupee size={14} />
                    {(transaction.amount / 100).toFixed(2)}
                  </td>
                  <td>
                    <span className={`status-badge ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td>{transaction.email || 'N/A'}</td>
                  <td>{transaction.contact || 'N/A'}</td>
                  <td>{format(new Date(transaction.created_at * 1000), 'dd MMM yyyy')}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="empty-cell">
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderOverviewTab = () => (
    <>
      <div className="stats-row">
        <div className="stat-card">
          <h3>Total Revenue</h3>
          <p>₹{(paymentMetrics.completed + paymentMetrics.pending).toLocaleString()}</p>
          <div className="trend up">
            {paymentMetrics.completedCount + paymentMetrics.pendingCount} transactions
          </div>
        </div>

        <div className="stat-card">
          <h3>Completed Payments</h3>
          <p>₹{paymentMetrics.completed.toLocaleString()}</p>
          <div className="trend up">
            {paymentMetrics.completedCount} successful
          </div>
        </div>

        <div className="stat-card">
          <h3>Pending Payments</h3>
          <p>₹{paymentMetrics.pending.toLocaleString()}</p>
          <div className="trend neutral">
            {paymentMetrics.pendingCount} in progress
          </div>
        </div>

        <div className="stat-card">
          <h3>Failed Payments</h3>
          <p>₹{paymentMetrics.failed.toLocaleString()}</p>
          <div className="trend down">
            {paymentMetrics.failedCount} failed
          </div>
        </div>
      </div>

      <div className="charts-row">
        <div className="chart-card">
          <h3>Payment Status Overview ({new Date().getFullYear()})</h3>
          <div className="chart-container">
            <Line data={revenueData} options={chartOptions} />
          </div>
        </div>

        <div className="chart-card">
          <h3>Team Performance Comparison</h3>
          <div className="chart-container">
            <Bar data={teamPerformanceData} options={chartOptions} />
          </div>
        </div>
      </div>

      <div className="details-row">
        <div className="teams-card">
          <h3>Top Performance</h3>
          <div className="team-list">
            {dashboardData.teams.flatMap(team => 
              team.employees.map(employee => ({
                ...employee,
                teamName: team.name,
                projects: team.projects
              }))
            ).slice(0, 5).map((employee, index) => (
              <div className="team-member" key={index}>
                <div className="member-info">
                  <h4>{employee.name} – {employee.projects[0]}</h4>
                  <p>{employee.teamName}</p>
                </div>
                <div className="revenue-info">
                  <p>Revenue Contribution</p>
                  <p>₹{(employee.teamName === 'Alpha Squad' ? 198450 : 
                        employee.teamName === 'Beta Squad' ? 187600 : 176900).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="transactions-card">
          <h3>Recent Transactions</h3>
          <div className="transaction-list">
            {transactions.slice(0, 4).map((transaction, index) => (
              <div className="transaction" key={index}>
                <h4>Transaction #{transaction.id.slice(0, 8)}</h4>
                <p>{format(new Date(transaction.created_at * 1000), 'dd MMM yyyy')}</p>
                <div className={`status ${transaction.status.toLowerCase()}`}>
                  {transaction.status}
                </div>
                <div className="amount">
                  <IndianRupee size={14} />
                  {(transaction.amount / 100).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  const renderTabContent = () => {
    switch(activeTab) {
      case 'Team': return renderTeamTab();
      case 'Employees': return renderEmployeesTab();
      case 'Transactions': return renderTransactionsTab();
      default: return renderOverviewTab();
    }
  };

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <div className="search-bar">
          <input type="text" placeholder="Type here to search" />
        </div>
      </header>

      <nav className="dashboard-nav">
        <ul>
          {['Overview', 'Team', 'Employees', 'Transactions'].map((tab) => (
            <li 
              key={tab}
              className={activeTab === tab ? 'active' : ''}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </li>
          ))}
        </ul>
      </nav>

      <div className="dashboard-content">
        {renderTabContent()}
      </div>

      <footer className="dashboard-footer">
        <div className="stock-info">
          <span>USD/INR +0.30%</span>
        </div>
        <div className="datetime">
          <span>{format(new Date(), 'HH:mm dd-MM-yyyy')}</span>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;