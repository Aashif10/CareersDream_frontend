import React, { useState, useEffect } from 'react';
import {
  Search, RefreshCw, ShieldCheck, Trash2, UserCircle,
} from 'lucide-react';
import Sidebar from './Sidebar';
import AdminHeader from './AdminHeader';
import './index.css';
import './registrationlist.css';

// ── Mock data matching the MongoDB structure from the screenshot ─────────────
const MOCK_USERS = [
  {
    _id: '6a6af73fa96b848bb087479b',
    name: 'Aashif',
    email: 'aashif6004@gmail.com',
    createdAt: '2026-07-30T07:03:27.068+00:00',
    __v: 0,
  }
];

// ── Utility ──────────────────────────────────────────────────────────────────
const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

const getInitials = (name = '') =>
  name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);

const AVATAR_COLORS = [
  '#34D399', '#60A5FA', '#F59E0B', '#A78BFA', '#F472B6', '#38BDF8',
];
const getAvatarColor = (id = '') =>
  AVATAR_COLORS[id.charCodeAt(id.length - 1) % AVATAR_COLORS.length];

// ── Component ─────────────────────────────────────────────────────────────────
const RegistrationList = () => {
  const [users, setUsers]           = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState('');
  const [search, setSearch]         = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const [toast, setToast]           = useState({ msg: '', type: '' });

  // ── Simulate fetch (replace with real API call later) ──────────────
  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      // TODO: Replace with real API call when ready
      // const res  = await fetch('http://localhost:5000/api/auth/users');
      // const data = await res.json();
      // if (!res.ok) throw new Error(data.message || 'Failed to fetch');
      // setUsers(data.data);
      await new Promise((r) => setTimeout(r, 800)); // Simulate network delay
      setUsers(MOCK_USERS);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  // ── Auto-dismiss toast ─────────────────────────────────────────────
  useEffect(() => {
    if (!toast.msg) return;
    const t = setTimeout(() => setToast({ msg: '', type: '' }), 3500);
    return () => clearTimeout(t);
  }, [toast]);

  // ── Delete user ────────────────────────────────────────────────────
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    setDeletingId(id);
    try {
      // TODO: Replace with real delete API call
      await new Promise((r) => setTimeout(r, 600));
      setUsers((prev) => prev.filter((u) => u._id !== id));
      setToast({ msg: 'User deleted successfully', type: 'success' });
    } catch (err) {
      setToast({ msg: err.message, type: 'error' });
    } finally {
      setDeletingId(null);
    }
  };

  // ── Filter ─────────────────────────────────────────────────────────
  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u._id.includes(search),
  );

  return (
    <div className="admin-layout">
      <Sidebar activePage="registration-list" />

      <main className="admin-main">
        {/* ── Header ── */}
        <AdminHeader title="Registered Users" />

        {/* ── Page Body ── */}
        <div className="dashboard-content">

          {/* Toast */}
          {toast.msg && (
            <div className={`rl-toast rl-toast--${toast.type}`} id="rl-toast">
              {toast.type === 'success' ? '✅' : '❌'} {toast.msg}
            </div>
          )}

          {/* Page Header */}
          <div className="rl-page-header">
            <div className="rl-page-title-group">
              <div className="rl-title-icon">
                <ShieldCheck size={22} />
              </div>
              <div>
                <h1 className="rl-title">Registered Users</h1>
                <p className="rl-subtitle">
                  {users.length} user{users.length !== 1 ? 's' : ''} in the system
                </p>
              </div>
            </div>

            <div className="rl-header-actions">
              {/* Search */}
              <div className="rl-search" id="rl-search-box">
                <Search size={15} className="rl-search-icon" />
                <input
                  id="rl-search-input"
                  type="text"
                  placeholder="Search by name, email or ID…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              {/* Refresh */}
              <button
                id="rl-refresh-btn"
                className="rl-refresh-btn"
                onClick={fetchUsers}
                title="Refresh list"
              >
                <RefreshCw size={17} className={loading ? 'rl-spin' : ''} />
              </button>
            </div>
          </div>

          {/* Stats strip */}
          <div className="rl-stats-strip">
            <div className="rl-stat">
              <span className="rl-stat-value">{users.length}</span>
              <span className="rl-stat-label">Total Users</span>
            </div>
            <div className="rl-stat-divider" />
            <div className="rl-stat">
              <span className="rl-stat-value">
                {users.filter((u) => {
                  const d = new Date(u.createdAt);
                  const now = new Date();
                  return (now - d) / (1000 * 60 * 60 * 24) <= 7;
                }).length}
              </span>
              <span className="rl-stat-label">New this week</span>
            </div>
            <div className="rl-stat-divider" />
            <div className="rl-stat">
              <span className="rl-stat-value">{filtered.length}</span>
              <span className="rl-stat-label">Showing</span>
            </div>
          </div>

          {/* Table Card */}
          <div className="rl-card">
            {loading ? (
              <div className="rl-state-box">
                <div className="rl-spinner" />
                <p>Loading registered users…</p>
              </div>
            ) : error ? (
              <div className="rl-state-box rl-state-box--error">
                <p>❌ {error}</p>
                <button className="rl-retry-btn" onClick={fetchUsers}>Retry</button>
              </div>
            ) : filtered.length === 0 ? (
              <div className="rl-state-box">
                <UserCircle size={52} opacity={0.25} />
                <p>{search ? 'No users match your search.' : 'No registered users yet.'}</p>
              </div>
            ) : (
              <div className="rl-table-wrapper">
                <table className="rl-table" id="rl-users-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>User</th>
                      <th>Email</th>
                      <th>Registered</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((u, i) => (
                      <tr key={u._id} className="rl-row">
                        {/* Index */}
                        <td className="rl-index">{i + 1}</td>

                        {/* User */}
                        <td>
                          <div className="rl-user-cell">
                            <div
                              className="rl-avatar"
                              style={{ background: getAvatarColor(u._id) }}
                            >
                              {getInitials(u.name)}
                            </div>
                            <span className="rl-user-name">{u.name}</span>
                          </div>
                        </td>

                        {/* Email */}
                        <td className="rl-muted">{u.email}</td>

                        {/* Created At */}
                        <td className="rl-muted rl-date">{formatDate(u.createdAt)}</td>

                        {/* Actions */}
                        <td>
                          <button
                            className="rl-delete-btn"
                            title="Delete user"
                            disabled={deletingId === u._id}
                            onClick={() => handleDelete(u._id)}
                          >
                            {deletingId === u._id
                              ? <span className="rl-deleting">…</span>
                              : <Trash2 size={15} />}
                          </button>
                        </td>
                      </tr>
                    ))}
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

export default RegistrationList;
