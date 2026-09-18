import React, { useState, useEffect } from 'react';
import {
  Users, UserPlus, Bell, Handshake,
  Calendar, Edit, MessageSquare,
  TrendingUp, TrendingDown, Minus
} from 'lucide-react';
import Sidebar from './Sidebar';
import AdminHeader from './AdminHeader';
import './index.css';

const API_URL = import.meta.env.VITE_API_URL || 'https://careersdream-backend.onrender.com';

// ── helpers ──────────────────────────────────────────────────────────────────

const daysAgo = (n) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
};

const weekdayLabel = (iso) =>
  new Date(iso).toLocaleDateString('en-US', { weekday: 'short' });

const buildDailyBuckets = (users, days = 7) => {
  const buckets = {};
  for (let i = days - 1; i >= 0; i--) {
    const iso = daysAgo(i);
    buckets[iso] = 0;
  }
  users.forEach((u) => {
    const iso = new Date(u.createdAt).toISOString().slice(0, 10);
    if (iso in buckets) buckets[iso]++;
  });
  return Object.entries(buckets).map(([date, count]) => ({
    date,
    label: weekdayLabel(date),
    count,
  }));
};

// ── SVG line graph ────────────────────────────────────────────────────────────

const SVG_W = 820, SVG_H = 300, PAD_L = 48, PAD_R = 20, PAD_T = 20, PAD_B = 30;

const UserGraph = ({ buckets }) => {
  const counts = buckets.map((b) => b.count);
  const maxVal = Math.max(...counts, 1);

  const xOf = (i) => PAD_L + (i / (buckets.length - 1)) * (SVG_W - PAD_L - PAD_R);
  const yOf = (v) => PAD_T + (1 - v / maxVal) * (SVG_H - PAD_T - PAD_B);

  const pts = buckets.map((b, i) => ({ x: xOf(i), y: yOf(b.count) }));

  const linePath = pts.map((p, i) => {
    if (i === 0) return `M${p.x},${p.y}`;
    const prev = pts[i - 1];
    const cx = (prev.x + p.x) / 2;
    return `C${cx},${prev.y} ${cx},${p.y} ${p.x},${p.y}`;
  }).join(' ');

  const areaPath =
    linePath +
    ` L${pts[pts.length - 1].x},${SVG_H - PAD_B} L${pts[0].x},${SVG_H - PAD_B} Z`;

  const ticks = 5;
  const yTicks = Array.from({ length: ticks + 1 }, (_, i) =>
    Math.round((maxVal / ticks) * i)
  ).reverse();

  const fmtDate = (iso) =>
    new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const rangeLabel =
    buckets.length ? `${fmtDate(buckets[0].date)} – ${fmtDate(buckets[buckets.length - 1].date)}` : '';

  return (
    <div className="chart-card">
      <div className="chart-header">
        <div>
          <h3 className="chart-title">User Registrations</h3>
          <p className="chart-subtitle">New sign-ups per day (last 7 days)</p>
        </div>
        <div className="chart-legend">
          <span className="legend-dot" />
          New Users ({rangeLabel})
        </div>
      </div>
      <div className="chart-container">
        <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="mock-chart">
          <defs>
            <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--admin-primary)" stopOpacity="0.18" />
              <stop offset="100%" stopColor="var(--admin-primary)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Grid lines */}
          <g className="grid-lines">
            {yTicks.map((_, i) => {
              const y = PAD_T + (i / ticks) * (SVG_H - PAD_T - PAD_B);
              return <line key={i} x1={PAD_L} y1={y} x2={SVG_W - PAD_R} y2={y} />;
            })}
          </g>
          {/* Y labels */}
          <g className="y-labels">
            {yTicks.map((val, i) => {
              const y = PAD_T + (i / ticks) * (SVG_H - PAD_T - PAD_B);
              return <text key={i} x={PAD_L - 6} y={y + 4} textAnchor="end">{val}</text>;
            })}
          </g>
          {/* X labels */}
          <g className="x-labels">
            {buckets.map((b, i) => (
              <text key={i} x={xOf(i)} y={SVG_H - 4} textAnchor="middle">{b.label}</text>
            ))}
          </g>
          {/* Area */}
          <path d={areaPath} fill="url(#chartGradient)" />
          {/* Line */}
          <path d={linePath} fill="none" stroke="var(--admin-primary)" strokeWidth="3" strokeLinejoin="round" />
          {/* Data points */}
          {pts.map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r="6"
                fill="var(--admin-card)" stroke="var(--admin-primary)" strokeWidth="2.5" />
              <title>{`${buckets[i].label}: ${buckets[i].count} new user${buckets[i].count !== 1 ? 's' : ''}`}</title>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
};

// ── Trend badge ───────────────────────────────────────────────────────────────

const TrendBadge = ({ value, suffix = '', neutral = false }) => {
  if (neutral)
    return (
      <div className="stat-change neutral" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <Minus size={13} /> Live count
      </div>
    );
  if (value === null || value === undefined) return null;
  const positive = value >= 0;
  return (
    <div className={`stat-change ${positive ? 'positive' : 'negative'}`}
      style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      {positive ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
      {positive ? '+' : ''}{value}{suffix}
    </div>
  );
};

// ── Main component ────────────────────────────────────────────────────────────

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: null,
    teamCount: null,
    subscriberCount: null,
  });
  const [graphBuckets, setGraphBuckets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const parseArr = async (result) => {
      if (result.status === 'fulfilled' && result.value.ok) {
        const data = await result.value.json();
        return Array.isArray(data)
          ? data
          : (data.data ?? data.users ?? data.members ?? data.subscribers ?? []);
      }
      return [];
    };

    const fetchStats = async () => {
      try {
        const [usersRes, teamRes, newsletterRes] = await Promise.allSettled([
          fetch(`${API_URL}/api/auth/users`, { headers }),
          fetch(`${API_URL}/api/team`, { headers }),
          fetch(`${API_URL}/api/newsletter`, { headers }),
        ]);

        const [users, team, subscribers] = await Promise.all([
          parseArr(usersRes),
          parseArr(teamRes),
          parseArr(newsletterRes),
        ]);

        setStats({
          totalUsers: users.length,
          teamCount: team.length,
          subscriberCount: subscribers.length,
        });

        // Build per-day registration buckets from real createdAt timestamps
        setGraphBuckets(buildDailyBuckets(users, 7));
      } catch (err) {
        console.error('Failed to fetch dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const formatNum = (n) => (n !== null && n !== undefined ? n.toLocaleString() : '—');

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
              <div className={`stat-value${loading ? ' stat-loading' : ''}`}>
                {loading ? '' : formatNum(stats.totalUsers)}
              </div>
              <TrendBadge value={8.1} suffix="% vs last month" />
            </div>
            <div className="stat-card">
              <div className="stat-header">
                <div className="stat-icon-wrapper primary">
                  <UserPlus size={20} />
                </div>
                <span className="stat-title">Team</span>
              </div>
              <div className={`stat-value${loading ? ' stat-loading' : ''}`}>
                {loading ? '' : formatNum(stats.teamCount)}
              </div>
              <TrendBadge value={15.3} suffix="%" />
            </div>
            <div className="stat-card">
              <div className="stat-header">
                <div className="stat-icon-wrapper primary">
                  <Bell size={20} />
                </div>
                <span className="stat-title">Subscribers</span>
              </div>
              <div className={`stat-value${loading ? ' stat-loading' : ''}`}>
                {loading ? '' : formatNum(stats.subscriberCount)}
              </div>
              <TrendBadge neutral />
            </div>
            <div className="stat-card">
              <div className="stat-header">
                <div className="stat-icon-wrapper primary">
                  <Handshake size={20} />
                </div>
                <span className="stat-title">Let's Connect</span>
              </div>
              <div className="stat-value">120</div>
              <TrendBadge value={4.5} suffix="%" />
            </div>
          </div>

          {/* Main Grid */}
          <div className="main-grid">
            {/* Dynamic user registration graph */}
            {loading
              ? <div className="chart-card chart-skeleton" />
              : <UserGraph buckets={graphBuckets} />
            }

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
