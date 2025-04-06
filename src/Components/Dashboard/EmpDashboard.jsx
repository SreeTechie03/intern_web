import React from 'react';
import './EmpDashboard.css';

const EmpDashboard = () => {
  return (
    <div className="employee-dashboard">
      <div className="search-bar-container">
        <input type="text" placeholder="Type here to search" className="search-input" />
      </div>

      <div className="dashboard-content">
        <div className="stats-row">
          <div className="revenue-card">
            <h3>My Revenue</h3>
            <p className="amount">¥1,87,600</p>
            <div className="progress-container">
              <div className="progress-label">
                <span>7.7%</span>
                <span>Target Progress</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '79%' }}></div>
              </div>
              <span className="progress-percent">79%</span>
            </div>
          </div>

          <div className="performance-card">
            <h3>My Performance</h3>
            <div className="progress-title">Progress</div>
            <div className="performance-stats">
              <div className="stat-item">
                <span className="stat-label">Current</span>
                <span className="stat-value">¥1,87,600</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Target</span>
                <span className="stat-value">¥2,00,000</span>
              </div>
            </div>
            <div className="progress-container">
              <div className="progress-label">
                <span>7.4%</span>
                <span>Tasks Completed</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '42%' }}></div>
              </div>
              <span className="progress-value">42</span>
            </div>
            <div className="progress-container">
              <div className="progress-label">
                <span>Attendance</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '59%' }}></div>
              </div>
              <span className="progress-percent">59%</span>
            </div>
          </div>
        </div>

        <div className="data-tables">
          <div className="task-table">
            <h3>Task Overview</h3>
            <table>
              <thead>
                <tr>
                  <th>Completed Tasks</th>
                  <th>Pending Tasks</th>
                  <th>Overdue Tasks</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>42</td>
                  <td>8</td>
                  <td>2</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="payment-table">
            <h3>Payment Breakdown</h3>
            <table>
              <thead>
                <tr>
                  <th>Pre-Payments</th>
                  <th>Full Payments</th>
                  <th>Post-Pending</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>¥34,500</td>
                  <td>¥98,700</td>
                  <td>¥12,100</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="dashboard-footer">
        <span className="stock-info">USD/INR +0.30%</span>
        <span className="datetime">08:38 06-04-2025</span>
      </div>
    </div>
  );
};

export default EmpDashboard;