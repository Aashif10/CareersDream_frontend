import React, { useState, useEffect } from 'react';
import {
  Mail, Search, RefreshCw, Trash2, Download, Copy, Check,
  Send, Users, CheckCircle2, XCircle, AlertCircle, Clock
} from 'lucide-react';
import Sidebar from './Sidebar';
import AdminHeader from './AdminHeader';
import './index.css';
import './subscribers.css';

const API_URL = import.meta.env.VITE_API_URL || 'https://careersdream-backend.onrender.com';

// ── Helpers ──────────────────────────────────────────────────────────────────
const formatDate = (iso) => {
  if (!iso) return 'N/A';
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const getRelativeTime = (iso) => {
  if (!iso) return '';
  const now = new Date();
  const past = new Date(iso);
  const diffMs = now - past;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHours = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 30) return '';
  if (diffDays > 0) return `${diffDays}d ago`;
  if (diffHours > 0) return `${diffHours}h ago`;
  if (diffMin > 0) return `${diffMin}m ago`;
  return 'Just now';
};

const AVATAR_GRADIENTS = [
  'linear-gradient(135deg, #10B981, #059669)',
  'linear-gradient(135deg, #3B82F6, #1D4ED8)',
  'linear-gradient(135deg, #F59E0B, #D97706)',
  'linear-gradient(135deg, #8B5CF6, #6D28D9)',
  'linear-gradient(135deg, #EC4899, #BE185D)',
  'linear-gradient(135deg, #06B6D4, #0891B2)',
];

const getAvatarGradient = (email = '') => {
  let hash = 0;
  for (let i = 0; i < email.length; i++) {
    hash = email.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % AVATAR_GRADIENTS.length;
  return AVATAR_GRADIENTS[index];
};

const Subscribers = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const [copiedEmail, setCopiedEmail] = useState(null);
  const [toast, setToast] = useState({ msg: '', type: '' });

  // ── Fetch Subscribers from backend ──────────────────────────────────────────
  const fetchSubscribers = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/newsletter`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch subscribers');
      setSubscribers(data.data || []);
    } catch (err) {
      console.error('Fetch subscribers error:', err);
      setError(err.message || 'Unable to connect to server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  // ── Toast dismiss ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (!toast.msg) return;
    const timer = setTimeout(() => setToast({ msg: '', type: '' }), 3500);
    return () => clearTimeout(timer);
  }, [toast]);

  // ── Delete Subscriber ──────────────────────────────────────────────────────
  const handleDelete = async (id, email) => {
    if (!window.confirm(`Are you sure you want to remove "${email}" from the subscriber list?`)) return;
    setDeletingId(id);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/newsletter/${id}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Delete failed');
      setSubscribers((prev) => prev.filter((s) => s._id !== id));
      setToast({ msg: `Subscriber ${email} deleted successfully`, type: 'success' });
    } catch (err) {
      setToast({ msg: err.message, type: 'error' });
    } finally {
      setDeletingId(null);
    }
  };

  // ── Toggle Status ──────────────────────────────────────────────────────────
  const handleToggleStatus = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/newsletter/${id}/toggle`, {
        method: 'PATCH',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update status');
      
      setSubscribers((prev) =>
        prev.map((s) => (s._id === id ? { ...s, isActive: !s.isActive } : s))
      );
      setToast({ msg: data.message || 'Status updated', type: 'success' });
    } catch (err) {
      setToast({ msg: err.message, type: 'error' });
    }
  };

  // ── Copy single email ──────────────────────────────────────────────────────
  const handleCopyEmail = (email) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setToast({ msg: `Copied: ${email}`, type: 'success' });
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  // ── Copy all emails ────────────────────────────────────────────────────────
  const handleCopyAll = () => {
    if (subscribers.length === 0) return;
    const allEmails = subscribers.map((s) => s.email).join(', ');
    navigator.clipboard.writeText(allEmails);
    setToast({ msg: `Copied ${subscribers.length} emails to clipboard!`, type: 'success' });
  };

  // ── Export CSV ─────────────────────────────────────────────────────────────
  const handleExportCSV = () => {
    if (subscribers.length === 0) return;
    const headers = ['Email,Status,Subscribed Date,Subscriber ID'];
    const rows = subscribers.map((s) =>
      `"${s.email}","${s.isActive ? 'Active' : 'Inactive'}","${s.subscribedAt || ''}","${s._id}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `careersdream_subscribers_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setToast({ msg: 'Exported subscribers CSV successfully!', type: 'success' });
  };

  // ── Filtered list ──────────────────────────────────────────────────────────
  const filtered = subscribers.filter((s) =>
    s.email?.toLowerCase().includes(search.toLowerCase()) ||
    s._id?.includes(search)
  );

  const activeCount = subscribers.filter((s) => s.isActive !== false).length;
  const recentCount = subscribers.filter((s) => {
    if (!s.subscribedAt) return false;
    const diff = (new Date() - new Date(s.subscribedAt)) / (1000 * 60 * 60 * 24);
    return diff <= 7;
  }).length;

  return (
    <div className="admin-layout">
      <Sidebar activePage="subscribers" />

      <main className="admin-main">
        <AdminHeader title="Newsletter Subscribers" />

        {/* ── Toast Notification ── */}
        {toast.msg && (
          <div className={`sub-toast sub-toast--${toast.type}`}>
            {toast.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            <span>{toast.msg}</span>
          </div>
        )}

        <div className="sub-content">
          {/* ── Page Header ── */}
          <div className="sub-page-header">
            <div className="sub-page-title-group">
              <div className="sub-title-icon">
                <Mail size={24} />
              </div>
              <div>
                <h1 className="sub-title">Newsletter Subscribers</h1>
                <p className="sub-subtitle">
                  Users who subscribed via the footer newsletter on CareersDream
                </p>
              </div>
            </div>

            <div className="sub-header-actions">
              <div className="sub-search">
                <Search size={16} className="sub-search-icon" />
                <input
                  type="text"
                  placeholder="Search by email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {search && (
                  <button className="sub-search-clear" onClick={() => setSearch('')}>
                    ×
                  </button>
                )}
              </div>

              <button
                className="sub-btn sub-btn-secondary"
                onClick={handleCopyAll}
                disabled={subscribers.length === 0}
                title="Copy all subscriber emails"
              >
                <Copy size={16} />
                <span>Copy All</span>
              </button>

              <button
                className="sub-btn sub-btn-secondary"
                onClick={handleExportCSV}
                disabled={subscribers.length === 0}
                title="Export to CSV"
              >
                <Download size={16} />
                <span>Export CSV</span>
              </button>

              <button
                className="sub-btn sub-btn-icon"
                onClick={fetchSubscribers}
                disabled={loading}
                title="Refresh list"
              >
                <RefreshCw size={17} className={loading ? 'sub-spin' : ''} />
              </button>
            </div>
          </div>

          {/* ── Stat Cards ── */}
          <div className="sub-stats-grid">
            <div className="sub-stat-card">
              <div className="sub-stat-icon-wrap primary">
                <Users size={20} />
              </div>
              <div className="sub-stat-info">
                <span className="sub-stat-label">Total Subscribers</span>
                <div className="sub-stat-num">{subscribers.length}</div>
              </div>
            </div>

            <div className="sub-stat-card">
              <div className="sub-stat-icon-wrap success">
                <CheckCircle2 size={20} />
              </div>
              <div className="sub-stat-info">
                <span className="sub-stat-label">Active Audience</span>
                <div className="sub-stat-num">{activeCount}</div>
              </div>
            </div>

            <div className="sub-stat-card">
              <div className="sub-stat-icon-wrap warning">
                <Clock size={20} />
              </div>
              <div className="sub-stat-info">
                <span className="sub-stat-label">New This Week</span>
                <div className="sub-stat-num">{recentCount}</div>
              </div>
            </div>
          </div>

          {/* ── Error Banner ── */}
          {error && (
            <div className="sub-error-banner">
              <AlertCircle size={18} />
              <span>{error}</span>
              <button onClick={fetchSubscribers}>Try Again</button>
            </div>
          )}

          {/* ── Subscribers Table Container ── */}
          <div className="sub-card">
            <div className="sub-card-header">
              <div className="sub-card-header-left">
                <h3 className="sub-card-title">All Subscribers</h3>
                <span className="sub-count-badge">
                  {filtered.length} {filtered.length === 1 ? 'subscriber' : 'subscribers'}
                </span>
              </div>
              {search && (
                <span className="sub-filtered-hint">
                  Filtered from {subscribers.length} total
                </span>
              )}
            </div>

            {loading ? (
              <div className="sub-loading-wrap">
                <RefreshCw size={32} className="sub-spin" />
                <p>Loading subscribers...</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="sub-empty-state">
                <div className="sub-empty-icon">
                  <Mail size={40} />
                </div>
                <h3>{search ? 'No matching subscribers' : 'No subscribers yet'}</h3>
                <p>
                  {search
                    ? `No subscriber found matching "${search}". Try searching for another email.`
                    : 'When users enter their email into the newsletter form on the website footer, their subscriptions will appear here automatically.'}
                </p>
              </div>
            ) : (
              <div className="sub-table-responsive">
                <table className="sub-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Subscriber Email</th>
                      <th>Status</th>
                      <th>Subscribed On</th>
                      <th>Quick Contact</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((item, idx) => {
                      const isDeleting = deletingId === item._id;
                      const relative = getRelativeTime(item.subscribedAt);
                      const initial = item.email ? item.email[0].toUpperCase() : 'S';

                      return (
                        <tr key={item._id || idx} className={isDeleting ? 'sub-row--deleting' : ''}>
                          {/* Index */}
                          <td className="sub-td-index">{idx + 1}</td>

                          {/* Email & Avatar */}
                          <td className="sub-td-email">
                            <div className="sub-email-cell">
                              <div
                                className="sub-avatar"
                                style={{ background: getAvatarGradient(item.email) }}
                              >
                                {initial}
                              </div>
                              <div className="sub-email-details">
                                <span className="sub-email-text">{item.email}</span>
                                <span className="sub-id-text">ID: {item._id}</span>
                              </div>
                            </div>
                          </td>

                          {/* Status Badge with toggle */}
                          <td className="sub-td-status">
                            <button
                              className={`sub-status-pill ${item.isActive !== false ? 'active' : 'inactive'}`}
                              onClick={() => handleToggleStatus(item._id)}
                              title="Click to toggle status"
                            >
                              <span className="sub-status-dot"></span>
                              {item.isActive !== false ? 'Subscribed' : 'Inactive'}
                            </button>
                          </td>

                          {/* Subscribed At */}
                          <td className="sub-td-date">
                            <div className="sub-date-cell">
                              <span className="sub-date-main">{formatDate(item.subscribedAt)}</span>
                              {relative && <span className="sub-date-rel">({relative})</span>}
                            </div>
                          </td>

                          {/* Quick Contact Link */}
                          <td className="sub-td-contact">
                            <a
                              href={`mailto:${item.email}?subject=Welcome%20to%20CareersDream`}
                              className="sub-email-action-link"
                              title="Send Email"
                            >
                              <Send size={13} />
                              <span>Compose</span>
                            </a>
                          </td>

                          {/* Actions */}
                          <td className="sub-td-actions">
                            <div className="sub-action-btns">
                              <button
                                className="sub-action-btn"
                                onClick={() => handleCopyEmail(item.email)}
                                title="Copy Email"
                              >
                                {copiedEmail === item.email ? (
                                  <Check size={15} className="sub-copied-icon" />
                                ) : (
                                  <Copy size={15} />
                                )}
                              </button>

                              <button
                                className="sub-action-btn sub-action-btn--delete"
                                onClick={() => handleDelete(item._id, item.email)}
                                disabled={isDeleting}
                                title="Delete subscriber"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Subscribers;
