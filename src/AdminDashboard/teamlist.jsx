import React, { useState, useEffect } from 'react';
import { Search, Trash2, UserCircle, RefreshCw, Users } from 'lucide-react';
import Sidebar from './Sidebar';
import AdminHeader from './AdminHeader';
import './index.css';
import './teamlist.css';

const TeamList = () => {
  const [members, setMembers]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');
  const [search, setSearch]     = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const [toast, setToast]       = useState({ msg: '', type: '' });

  // ── Fetch members from API ──────────────────────────────────────
  const apiUrl = import.meta.env.VITE_API_URL || 'https://careersdream-backend.onrender.com';
  const fetchMembers = async () => {
    setLoading(true);
    setError('');
    try {
      const res  = await fetch(`${apiUrl}/api/team`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch members');
      setMembers(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMembers(); }, []);

  // ── Auto-dismiss toast ──────────────────────────────────────────
  useEffect(() => {
    if (!toast.msg) return;
    const t = setTimeout(() => setToast({ msg: '', type: '' }), 3500);
    return () => clearTimeout(t);
  }, [toast]);

  // ── Delete member ───────────────────────────────────────────────
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this member?')) return;
    setDeletingId(id);
    try {
      const res  = await fetch(`${apiUrl}/api/team/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Delete failed');
      setMembers(prev => prev.filter(m => m._id !== id));
      setToast({ msg: 'Member deleted successfully', type: 'success' });
    } catch (err) {
      setToast({ msg: err.message, type: 'error' });
    } finally {
      setDeletingId(null);
    }
  };

  // ── Filter by search ────────────────────────────────────────────
  const filtered = members.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.email.toLowerCase().includes(search.toLowerCase()) ||
    (m.phone && m.phone.includes(search))
  );

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <div className="admin-layout">
      <Sidebar activePage="team" />

      <main className="admin-main">
        {/* ── Header ── */}
        <AdminHeader title="Team Members" />

        {/* ── Page Content ── */}
        <div className="dashboard-content">

          {/* Toast */}
          {toast.msg && (
            <div className={`tl-toast tl-toast--${toast.type}`}>
              {toast.type === 'success' ? '✅' : '❌'} {toast.msg}
            </div>
          )}

          {/* Page Header */}
          <div className="tl-page-header">
            <div>
              <h1 className="tl-title">
                <Users size={26} /> Team Members
              </h1>
              <p className="tl-subtitle">
                {members.length} member{members.length !== 1 ? 's' : ''} registered
              </p>
            </div>
            <div className="tl-header-actions">
              {/* Search */}
              <div className="tl-search">
                <Search size={16} className="tl-search-icon" />
                <input
                  type="text"
                  placeholder="Search by name, email, phone…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              {/* Refresh */}
              <button className="tl-refresh-btn" onClick={fetchMembers} title="Refresh">
                <RefreshCw size={18} />
              </button>
              {/* Add Member shortcut */}
              <a href="/admin/add-member" className="tl-add-btn">
                + Add Member
              </a>
            </div>
          </div>

          {/* ── Table Card ── */}
          <div className="tl-card">
            {loading ? (
              <div className="tl-state-box">
                <div className="tl-spinner" />
                <p>Loading members…</p>
              </div>
            ) : error ? (
              <div className="tl-state-box tl-state-box--error">
                <p>❌ {error}</p>
                <button className="tl-retry-btn" onClick={fetchMembers}>Retry</button>
              </div>
            ) : filtered.length === 0 ? (
              <div className="tl-state-box">
                <UserCircle size={48} opacity={0.3} />
                <p>{search ? 'No members match your search.' : 'No team members yet.'}</p>
                {!search && (
                  <a href="/admin/add-member" className="tl-add-btn" style={{ marginTop: '12px' }}>
                    + Add your first member
                  </a>
                )}
              </div>
            ) : (
              <div className="tl-table-wrapper">
                <table className="tl-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Member</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Joined</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((m, i) => (
                      <tr key={m._id}>
                        <td className="tl-index">{i + 1}</td>
                        <td>
                          <div className="tl-member-cell">
                            {m.profileImage ? (
                              <img
                               src={
                                 m.profileImage.startsWith('http://') || m.profileImage.startsWith('https://')
                                   ? m.profileImage
                                   : `${apiUrl}/uploads/${m.profileImage.startsWith('/') ? m.profileImage.slice(1) : m.profileImage.replace(/^uploads\//, '')}`
                               }
                               alt={m.name}
                               className="tl-avatar"
                               onError={(e) => {
                                 e.currentTarget.style.display = 'none';
                                 if (e.currentTarget.nextElementSibling) {
                                   e.currentTarget.nextElementSibling.style.display = 'flex';
                                 }
                               }}
                              />
                            ) : null}
                            <div
                              className="tl-avatar tl-avatar-placeholder"
                              style={{ display: m.profileImage ? 'none' : 'flex' }}
                            >
                              {m.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="tl-member-name">{m.name}</span>
                          </div>
                        </td>
                        <td className="tl-muted">{m.phone || '—'}</td>
                        <td className="tl-muted">{m.email}</td>
                        <td>
                          <span className="tl-badge">{m.role || 'member'}</span>
                        </td>
                        <td className="tl-muted">{formatDate(m.createdAt)}</td>
                        <td>
                          <button
                            className="tl-delete-btn"
                            title="Delete member"
                            disabled={deletingId === m._id}
                            onClick={() => handleDelete(m._id)}
                          >
                            {deletingId === m._id
                              ? <span className="tl-deleting">…</span>
                              : <Trash2 size={16} />
                            }
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

export default TeamList;
