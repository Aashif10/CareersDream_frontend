import React from 'react';
import { 
  Users, UserPlus, Folder, DollarSign, Calendar, Edit, MessageSquare
} from 'lucide-react';
import Sidebar from './Sidebar';
import AdminHeader from './AdminHeader';
import './index.css';

const AdminDashboard = () => {
  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <Sidebar activePage="dashboard" />

      {/* Main Content */}
      <main className="admin-main">
        {/* Header */}
        <AdminHeader title="Dashboard Overview" />

        {/* Dashboard Content */}
        <div className="dashboard-content">
          {/* Stats Grid */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-header">
                <div className="stat-icon-wrapper primary">
                  <Users size={20} />
                </div>
                <span className="stat-title">Total Users</span>
              </div>
              <div className="stat-value">12,482</div>
              <div className="stat-change positive">+8.1% vs last month</div>
            </div>
            <div className="stat-card">
              <div className="stat-header">
                <div className="stat-icon-wrapper primary">
                  <UserPlus size={20} />
                </div>
                <span className="stat-title">New Registrations</span>
              </div>
              <div className="stat-value">1,294</div>
              <div className="stat-change positive">+15.3%</div>
            </div>
            <div className="stat-card">
              <div className="stat-header">
                <div className="stat-icon-wrapper">
                  <Folder size={20} />
                </div>
                <span className="stat-title">Active Projects</span>
              </div>
              <div className="stat-value">58</div>
              <div className="stat-change neutral">2 new</div>
            </div>
            <div className="stat-card">
              <div className="stat-header">
                <div className="stat-icon-wrapper primary">
                  <DollarSign size={20} />
                </div>
                <span className="stat-title">Revenue</span>
              </div>
              <div className="stat-value">$48,720</div>
              <div className="stat-change positive">+4.5%</div>
            </div>
          </div>

          {/* Main Grid */}
          <div className="main-grid">
            {/* Graph Area */}
            <div className="chart-card">
              <div className="chart-header">
                <div>
                  <h3 className="chart-title">Active Users graph</h3>
                  <p className="chart-subtitle">Recent User Activity</p>
                </div>
                <div className="chart-legend">
                  <span className="legend-dot"></span>
                  Active Users (May 10 - May 15)
                </div>
              </div>
              <div className="chart-container">
                <svg viewBox="0 0 820 300" className="mock-chart">
                  <defs>
                    <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="var(--admin-primary)" stopOpacity="0.15"/>
                      <stop offset="100%" stopColor="var(--admin-primary)" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  
                  {/* Grid Lines */}
                  <g className="grid-lines">
                    <line x1="40" y1="20" x2="780" y2="20" />
                    <line x1="40" y1="70" x2="780" y2="70" />
                    <line x1="40" y1="120" x2="780" y2="120" />
                    <line x1="40" y1="170" x2="780" y2="170" />
                    <line x1="40" y1="220" x2="780" y2="220" />
                    <line x1="40" y1="270" x2="780" y2="270" />
                  </g>

                  {/* Y Axis Labels */}
                  <g className="y-labels">
                    <text x="30" y="25">14k</text>
                    <text x="30" y="75">12k</text>
                    <text x="30" y="125">10k</text>
                    <text x="30" y="175">8k</text>
                    <text x="30" y="225">4k</text>
                    <text x="30" y="275">2k</text>
                  </g>

                  {/* X Axis Labels */}
                  <g className="x-labels">
                    <text x="188" y="295">Mon</text>
                    <text x="336" y="295">Tue</text>
                    <text x="484" y="295">Wed</text>
                    <text x="632" y="295">Thu</text>
                    <text x="780" y="295">Fri</text>
                  </g>

                  {/* Chart Line & Area */}
                  <path d="M40,270 C 114,270 114,180 188,180 C 262,180 262,230 336,230 C 410,230 410,100 484,100 C 558,100 558,140 632,140 C 706,140 706,60 780,60" fill="none" stroke="var(--admin-primary)" strokeWidth="3" />
                  <path d="M40,270 C 114,270 114,180 188,180 C 262,180 262,230 336,230 C 410,230 410,100 484,100 C 558,100 558,140 632,140 C 706,140 706,60 780,60 L 780,270 L 40,270 Z" fill="url(#chartGradient)" />
                  
                  {/* Data Points */}
                  <circle cx="40" cy="270" r="5" fill="var(--admin-card)" stroke="var(--admin-primary)" strokeWidth="2.5" />
                  <circle cx="188" cy="180" r="5" fill="var(--admin-card)" stroke="var(--admin-primary)" strokeWidth="2.5" />
                  <circle cx="336" cy="230" r="5" fill="var(--admin-card)" stroke="var(--admin-primary)" strokeWidth="2.5" />
                  <circle cx="484" cy="100" r="5" fill="var(--admin-card)" stroke="var(--admin-primary)" strokeWidth="2.5" />
                  <circle cx="632" cy="140" r="5" fill="var(--admin-card)" stroke="var(--admin-primary)" strokeWidth="2.5" />
                  <circle cx="780" cy="60" r="5" fill="var(--admin-card)" stroke="var(--admin-primary)" strokeWidth="2.5" />
                </svg>
              </div>
            </div>

            {/* Recent Tasks Area */}
            <div className="tasks-card">
              <h3 className="tasks-title">Recent Tasks</h3>
              <div className="task-list">
                <div className="task-item">
                  <div className="task-icon primary">
                    <UserPlus size={18} />
                  </div>
                  <div className="task-info">
                    <p className="task-name">New user registered</p>
                    <p className="task-desc">David K.</p>
                  </div>
                </div>
                <div className="task-item">
                  <div className="task-icon primary">
                    <Calendar size={18} />
                  </div>
                  <div className="task-info">
                    <p className="task-name">Project updated</p>
                    <p className="task-desc">Website Redesign</p>
                  </div>
                </div>
                <div className="task-item">
                  <div className="task-icon primary">
                    <Edit size={18} />
                  </div>
                  <div className="task-info">
                    <p className="task-name">Content published</p>
                    <p className="task-desc">Blog Post</p>
                  </div>
                </div>
                <div className="task-item">
                  <div className="task-icon danger">
                    <MessageSquare size={18} />
                  </div>
                  <div className="task-info">
                    <p className="task-name">Comment flagged</p>
                    <p className="task-desc">Comment #103</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
