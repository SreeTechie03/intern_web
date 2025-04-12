import React, { useState } from 'react';
import './EmpDashboard.css';

const SalesEmp = () => {
  const [activeTab, setActiveTab] = useState('team');
  const [timeRange, setTimeRange] = useState('month');

  // Top performers data
  const topPerformers = [
    { id: 1, name: 'John Smith', sales: 245, conversion: '78%', revenue: '₹245,000', status: 'exceeding' },
    { id: 2, name: 'Sarah Johnson', sales: 231, conversion: '75%', revenue: '₹231,000', status: 'meeting' },
    { id: 3, name: 'Michael Chen', sales: 218, conversion: '72%', revenue: '₹218,000', status: 'meeting' },
    { id: 4, name: 'Emily Wilson', sales: 203, conversion: '68%', revenue: '₹203,000', status: 'approaching' },
    { id: 5, name: 'David Kim', sales: 197, conversion: '65%', revenue: '₹197,000', status: 'approaching' }
  ];

  // Function to get initials from name
  const getInitials = (name) => {
    return name.split(' ').map(part => part[0]).join('').toUpperCase();
  };

  return (
    <div className="professional-dashboard">
      <div className="dashboard-header">
        <div className="header-title">
          <h1>Sales Performance</h1>
          <p className="subtitle">Team analytics and key metrics</p>
        </div>
        <div className="header-controls">
          <div className="time-range-selector">
            <button 
              className={timeRange === 'week' ? 'active' : ''}
              onClick={() => setTimeRange('week')}
            >
              Week
            </button>
            <button 
              className={timeRange === 'month' ? 'active' : ''}
              onClick={() => setTimeRange('month')}
            >
              Month
            </button>
            <button 
              className={timeRange === 'quarter' ? 'active' : ''}
              onClick={() => setTimeRange('quarter')}
            >
              Quarter
            </button>
          </div>
          <div className="search-container">
            <input type="text" placeholder="" className="search-input" />
            <span className="search-icon">search</span>
          </div>
        </div>
      </div>

      <div className="dashboard-tabs">
        <button 
          className={`tab-button ${activeTab === 'team' ? 'active' : ''}`}
          onClick={() => setActiveTab('team')}
        >
          <span className="material-icons">groups</span>
          Team Overview
        </button>
        <button 
          className={`tab-button ${activeTab === 'personal' ? 'active' : ''}`}
          onClick={() => setActiveTab('personal')}
        >
          <span className="material-icons">person</span>
          My Performance
        </button>
      </div>

      {activeTab === 'team' && (
        <div className="dashboard-content">
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-header">
                <h3>Total Sales</h3>
                <span className="metric-trend positive">+12%</span>
              </div>
              <div className="metric-value">187</div>
              <div className="metric-comparison">
                <span>vs target: 250</span>
                <span className="progress-percent">75%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '75%' }}></div>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-header">
                <h3>Pre Sales</h3>
                <span className="metric-trend positive">+5%</span>
              </div>
              <div className="metric-value">42</div>
              <div className="metric-comparison">
                <span>vs last month: 40</span>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-header">
                <h3>Full Sales</h3>
                <span className="metric-trend negative">-3%</span>
              </div>
              <div className="metric-value">98</div>
              <div className="metric-comparison">
                <span>vs last month: 101</span>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-header">
                <h3>Post Pending</h3>
                <span className="metric-trend positive">+8%</span>
              </div>
              <div className="metric-value">12</div>
              <div className="metric-comparison">
                <span>vs last month: 11</span>
              </div>
            </div>

            <div className="metric-card target-card">
              <div className="metric-header">
                <h3>Need to Achieve</h3>
                <span className="metric-trend neutral">Monthly</span>
              </div>
              <div className="metric-value">63</div>
              <div className="metric-comparison">
                <span>Remaining to target</span>
              </div>
              <div className="days-remaining">
                <span>15 days left in month</span>
              </div>
            </div>
          </div>

          <div className="performance-section">
            <div className="section-header">
              <h2>Top Performers</h2>
              <div className="section-actions">
                <button className="export-btn">
                  <span className="material-icons">download</span>
                  Export
                </button>
              </div>
            </div>
            
            <div className="performance-table">
              <table>
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Employee</th>
                    <th>Total Sales</th>
                    <th>Conversion Rate</th>
                    <th>Revenue</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {topPerformers.map((performer) => (
                    <tr key={performer.id}>
                      <td><span className={`rank-badge rank-${performer.id}`}>{performer.id}</span></td>
                      <td>
                        <div className="employee-info">
                          <div className="initials-circle">{getInitials(performer.name)}</div>
                          {performer.name}
                        </div>
                      </td>
                      <td>{performer.sales}</td>
                      <td>
                        <div className="conversion-bar">
                          <div className="conversion-fill" style={{ width: performer.conversion }}></div>
                          <span>{performer.conversion}</span>
                        </div>
                      </td>
                      <td>{performer.revenue}</td>
                      <td>
                        <span className={`status-badge ${performer.status}`}>
                          {performer.status.charAt(0).toUpperCase() + performer.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'personal' && (
        <div className="personal-performance-content">
          {/* Personal performance content would go here */}
        </div>
      )}
    </div>
  );
};

export default SalesEmp;