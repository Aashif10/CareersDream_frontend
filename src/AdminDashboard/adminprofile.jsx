import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User, Mail, Phone, Shield, Calendar,
  Edit3, Save, X, Camera, ArrowLeft, CheckCircle,
} from 'lucide-react';
import Sidebar from './Sidebar';
import AdminHeader from './AdminHeader';
import './index.css';
import './adminprofile.css';

const API_URL = import.meta.env.VITE_API_URL || 'https://careersdream-backend.onrender.com';

const AdminProfile = () => {
  const navigate = useNavigate();
  const [user, setUser]       = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm]       = useState({ name: '', email: '', phone: '' });
  const [saving, setSaving]   = useState(false);
  const [toast, setToast]     = useState({ msg: '', type: '' });
  const [imgError, setImgError] = useState(false);

  // ── Load user from localStorage ──────────────────────────────────
  useEffect(() => {
    const raw = localStorage.getItem('user');
    if (!raw) { navigate('/adminlogin'); return; }
    const parsed = JSON.parse(raw);
    setUser(parsed);
    setForm({ name: parsed.name || '', email: parsed.email || '', phone: parsed.phone || '' });
  }, [navigate]);

  // ── Auto-dismiss toast ────────────────────────────────────────────
  useEffect(() => {
    if (!toast.msg) return;
    const t = setTimeout(() => setToast({ msg: '', type: '' }), 3500);
    return () => clearTimeout(t);
  }, [toast]);

  // ── Save profile ──────────────────────────────────────────────────
  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/team/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Update failed');

      // Update localStorage
      const updated = { ...user, name: form.name, email: form.email, phone: form.phone };
      localStorage.setItem('user', JSON.stringify(updated));
      setUser(updated);
      setEditing(false);
      setToast({ msg: 'Profile updated successfully!', type: 'success' });
    } catch (err) {
      setToast({ msg: err.message, type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setForm({ name: user.name || '', email: user.email || '', phone: user.phone || '' });
    setEditing(false);
  };

  const avatarSrc = user && user.profileImage && !imgError
    ? `${API_URL}/uploads/${user.profileImage}`
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'Admin')}&background=34D399&color=111312&bold=true&size=200`;

  const joinDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : 'N/A';

  if (!user) return null;

  return (
    <div className="admin-layout">
      <Sidebar activePage="profile" />

      <main className="admin-main">
        <AdminHeader title="My Profile" />

        {/* Toast */}
        {toast.msg && (
          <div className={`ap-toast ap-toast--${toast.type}`}>
            {toast.type === 'success' ? <CheckCircle size={16} /> : '❌'} {toast.msg}
          </div>
        )}

        <div className="dashboard-content ap-content">

          {/* ── Cover + Avatar card ── */}
          <div className="ap-hero-card">
            <div className="ap-cover">
              <div className="ap-cover-gradient" />
              <div className="ap-cover-pattern" />
            </div>

            <div className="ap-hero-body">
              <div className="ap-avatar-wrap">
                <img
                  src={avatarSrc}
                  alt={user.name}
                  className="ap-avatar"
                  onError={() => setImgError(true)}
                />
                <div className="ap-avatar-ring" />
                <div className="ap-avatar-badge" title="Administrator">
                  <Shield size={12} />
                </div>
              </div>

              <div className="ap-hero-info">
                <h2 className="ap-name">{user.name}</h2>
                <span className="ap-role-pill">
                  {user.role || 'Administrator'}
                </span>
                <p className="ap-email-sub">{user.email}</p>
              </div>

              <div className="ap-hero-actions">
                {!editing ? (
                  <button className="ap-edit-btn" onClick={() => setEditing(true)} id="ap-edit-btn">
                    <Edit3 size={15} /> Edit Profile
                  </button>
                ) : (
                  <div className="ap-edit-actions">
                    <button className="ap-save-btn" onClick={handleSave} disabled={saving} id="ap-save-btn">
                      <Save size={15} /> {saving ? 'Saving…' : 'Save'}
                    </button>
                    <button className="ap-cancel-btn" onClick={handleCancel} id="ap-cancel-btn">
                      <X size={15} /> Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── Info cards grid ── */}
          <div className="ap-grid">

            {/* Personal Info */}
            <div className="ap-card">
              <div className="ap-card-header">
                <div className="ap-card-icon">
                  <User size={18} />
                </div>
                <h3 className="ap-card-title">Personal Information</h3>
              </div>

              <div className="ap-fields">

                {/* Name */}
                <div className="ap-field">
                  <label className="ap-label">Full Name</label>
                  {editing ? (
                    <input
                      id="ap-name-input"
                      className="ap-input"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your full name"
                    />
                  ) : (
                    <p className="ap-value">{user.name}</p>
                  )}
                </div>

                {/* Email */}
                <div className="ap-field">
                  <label className="ap-label">Email Address</label>
                  {editing ? (
                    <input
                      id="ap-email-input"
                      className="ap-input"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="Your email"
                    />
                  ) : (
                    <p className="ap-value"><Mail size={14} className="ap-value-icon" />{user.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div className="ap-field">
                  <label className="ap-label">Phone Number</label>
                  {editing ? (
                    <input
                      id="ap-phone-input"
                      className="ap-input"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="Your phone number"
                    />
                  ) : (
                    <p className="ap-value">
                      <Phone size={14} className="ap-value-icon" />
                      {user.phone || <span className="ap-na">Not provided</span>}
                    </p>
                  )}
                </div>

              </div>
            </div>

            {/* Account Details */}
            <div className="ap-card">
              <div className="ap-card-header">
                <div className="ap-card-icon">
                  <Shield size={18} />
                </div>
                <h3 className="ap-card-title">Account Details</h3>
              </div>

              <div className="ap-fields">

                <div className="ap-field">
                  <label className="ap-label">Role</label>
                  <p className="ap-value">
                    <span className="ap-role-tag">{user.role || 'Administrator'}</span>
                  </p>
                </div>

                <div className="ap-field">
                  <label className="ap-label">Account ID</label>
                  <p className="ap-value ap-id">{user._id}</p>
                </div>

                <div className="ap-field">
                  <label className="ap-label">Member Since</label>
                  <p className="ap-value">
                    <Calendar size={14} className="ap-value-icon" />{joinDate}
                  </p>
                </div>

                <div className="ap-field">
                  <label className="ap-label">Account Status</label>
                  <p className="ap-value">
                    <span className="ap-status-dot" /> Active
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminProfile;
