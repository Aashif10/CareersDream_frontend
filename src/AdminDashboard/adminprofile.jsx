import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User, Mail, Phone, Edit3, Save, X, CheckCircle,
  Copy, Check, ShieldCheck, KeyRound, HelpCircle, ArrowRight
} from 'lucide-react';
import Sidebar from './Sidebar';
import AdminHeader from './AdminHeader';
import './index.css';
import './adminprofile.css';

const API_URL = import.meta.env.VITE_API_URL || 'https://careersdream-backend.onrender.com';

const AdminProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ msg: '', type: '' });
  const [imgError, setImgError] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // ── Load user from localStorage & fetch fresh details ─────────────
  useEffect(() => {
    const raw = localStorage.getItem('user');
    if (!raw) {
      navigate('/adminlogin');
      return;
    }
    const parsed = JSON.parse(raw);
    setUser(parsed);
    setForm({
      name: parsed.name || '',
      email: parsed.email || '',
      phone: parsed.phone || ''
    });

    // Fetch latest profile details from backend
    if (parsed._id) {
      const token = localStorage.getItem('token');
      fetch(`${API_URL}/api/team/${parsed._id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.data) {
            setUser((prev) => ({ ...prev, ...data.data }));
            setForm({
              name: data.data.name || '',
              email: data.data.email || '',
              phone: data.data.phone || ''
            });
            localStorage.setItem('user', JSON.stringify({ ...parsed, ...data.data }));
          }
        })
        .catch(() => {});
    }
  }, [navigate]);

  // ── Auto-dismiss toast ────────────────────────────────────────────
  useEffect(() => {
    if (!toast.msg) return;
    const t = setTimeout(() => setToast({ msg: '', type: '' }), 3500);
    return () => clearTimeout(t);
  }, [toast]);

  // ── Save profile ──────────────────────────────────────────────────
  const handleSave = async (e) => {
    if (e) e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      setToast({ msg: 'Name and Email are required', type: 'error' });
      return;
    }

    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/team/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim()
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Update failed');

      // Update localStorage & state
      const updated = {
        ...user,
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim()
      };
      localStorage.setItem('user', JSON.stringify(updated));
      setUser(updated);
      setEditing(false);
      setToast({ msg: 'Profile updated successfully!', type: 'success' });
    } catch (err) {
      setToast({ msg: err.message || 'Error updating profile', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setForm({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || ''
    });
    setEditing(false);
  };

  const handleCopyEmail = () => {
    if (!user?.email) return;
    navigator.clipboard.writeText(user.email);
    setCopiedEmail(true);
    setToast({ msg: 'Email copied to clipboard', type: 'success' });
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const avatarSrc = user && user.profileImage && !imgError
    ? `${API_URL}/uploads/${user.profileImage}`
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'Admin')}&background=34D399&color=111312&bold=true&size=200`;

  if (!user) return null;

  return (
    <div className="admin-layout">
      <Sidebar activePage="profile" />

      <main className="admin-main">
        <AdminHeader title="My Profile" />

        {/* Toast */}
        {toast.msg && (
          <div className={`ap-toast ap-toast--${toast.type}`}>
            {toast.type === 'success' ? <CheckCircle size={16} /> : <X size={16} />}
            <span>{toast.msg}</span>
          </div>
        )}

        <div className="ap-content">

          {/* ── Hero Profile Card (Without Green Banner) ── */}
          <div className="ap-hero-card">
            <div className="ap-hero-body">
              <div className="ap-avatar-wrap">
                <img
                  src={avatarSrc}
                  alt={user.name}
                  className="ap-avatar"
                  onError={() => setImgError(true)}
                />
                <div className="ap-avatar-ring" />
                <div className="ap-avatar-status" title="Active Account" />
              </div>

              <div className="ap-hero-info">
                <div className="ap-name-row">
                  <h1 className="ap-name">{user.name}</h1>
                  <span className="ap-verified-badge" title="Verified Administrator">
                    <ShieldCheck size={15} /> Verified
                  </span>
                </div>
                
                <div className="ap-email-row">
                  <span className="ap-email-sub">{user.email}</span>
                  <button
                    className="ap-copy-btn"
                    onClick={handleCopyEmail}
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check size={13} className="ap-copied-icon" /> : <Copy size={13} />}
                  </button>
                </div>
              </div>

              <div className="ap-hero-actions">
                {!editing ? (
                  <button
                    className="ap-edit-btn"
                    onClick={() => setEditing(true)}
                    id="ap-edit-btn"
                  >
                    <Edit3 size={15} />
                    <span>Edit Profile</span>
                  </button>
                ) : (
                  <div className="ap-edit-actions">
                    <button
                      className="ap-save-btn"
                      onClick={handleSave}
                      disabled={saving}
                      id="ap-save-btn"
                    >
                      <Save size={15} />
                      <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                    </button>
                    <button
                      className="ap-cancel-btn"
                      onClick={handleCancel}
                      id="ap-cancel-btn"
                    >
                      <X size={15} />
                      <span>Cancel</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── Main Profile Details Section ── */}
          <div className="ap-main-card">
            <div className="ap-card-header">
              <div className="ap-card-icon">
                <User size={20} />
              </div>
              <div className="ap-card-title-group">
                <h3 className="ap-card-title">Personal Information</h3>
                <p className="ap-card-subtitle">
                  {editing
                    ? 'Update your personal details and contact information below'
                    : 'Your personal information and contact details'}
                </p>
              </div>
            </div>

            {editing ? (
              /* ── Edit Form ── */
              <form onSubmit={handleSave} className="ap-form-grid">
                <div className="ap-input-group">
                  <label htmlFor="ap-name-input" className="ap-input-label">
                    Full Name
                  </label>
                  <div className="ap-input-wrapper">
                    <User size={16} className="ap-input-icon" />
                    <input
                      id="ap-name-input"
                      className="ap-input"
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Enter full name"
                      required
                    />
                  </div>
                </div>

                <div className="ap-input-group">
                  <label htmlFor="ap-email-input" className="ap-input-label">
                    Email Address
                  </label>
                  <div className="ap-input-wrapper">
                    <Mail size={16} className="ap-input-icon" />
                    <input
                      id="ap-email-input"
                      className="ap-input"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="Enter email address"
                      required
                    />
                  </div>
                </div>

                <div className="ap-input-group">
                  <label htmlFor="ap-phone-input" className="ap-input-label">
                    Phone Number
                  </label>
                  <div className="ap-input-wrapper">
                    <Phone size={16} className="ap-input-icon" />
                    <input
                      id="ap-phone-input"
                      className="ap-input"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                <div className="ap-input-group">
                  <label className="ap-input-label">
                    Role
                  </label>
                  <div className="ap-input-wrapper">
                    <ShieldCheck size={16} className="ap-input-icon" />
                    <input
                      className="ap-input"
                      type="text"
                      value={user.role || 'Administrator'}
                      disabled
                      style={{ opacity: 0.7, cursor: 'not-allowed' }}
                    />
                  </div>
                </div>

                <div className="ap-form-actions">
                  <button
                    type="button"
                    className="ap-cancel-btn"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="ap-save-btn"
                    disabled={saving}
                  >
                    <Save size={15} />
                    <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                  </button>
                </div>
              </form>
            ) : (
              /* ── View Cards Grid ── */
              <div className="ap-info-grid">
                <div className="ap-info-item">
                  <div className="ap-info-icon-wrap">
                    <User size={18} />
                  </div>
                  <div className="ap-info-content">
                    <span className="ap-info-label">Full Name</span>
                    <span className="ap-info-value">{user.name || 'Not provided'}</span>
                  </div>
                </div>

                <div className="ap-info-item">
                  <div className="ap-info-icon-wrap">
                    <Mail size={18} />
                  </div>
                  <div className="ap-info-content">
                    <span className="ap-info-label">Email Address</span>
                    <span className="ap-info-value">{user.email}</span>
                  </div>
                </div>

                <div className="ap-info-item">
                  <div className="ap-info-icon-wrap">
                    <Phone size={18} />
                  </div>
                  <div className="ap-info-content">
                    <span className="ap-info-label">Phone Number</span>
                    <span className="ap-info-value">
                      {user.phone || <span className="ap-na">Not provided</span>}
                    </span>
                  </div>
                </div>

                <div className="ap-info-item">
                  <div className="ap-info-icon-wrap">
                    <ShieldCheck size={18} />
                  </div>
                  <div className="ap-info-content">
                    <span className="ap-info-label">Role</span>
                    <span className="ap-info-value ap-role-badge">
                      {user.role || 'Administrator'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── Quick Shortcuts / Settings Access ── */}
          <div className="ap-shortcuts-grid">
            <div
              className="ap-shortcut-card"
              onClick={() => navigate('/admin/settings')}
              role="button"
              tabIndex={0}
            >
              <div className="ap-shortcut-icon">
                <KeyRound size={20} />
              </div>
              <div className="ap-shortcut-info">
                <h4 className="ap-shortcut-title">Security & Password</h4>
                <p className="ap-shortcut-desc">Update your password and security settings</p>
              </div>
              <ArrowRight size={18} className="ap-shortcut-arrow" />
            </div>

            <div
              className="ap-shortcut-card"
              onClick={() => navigate('/admin/support')}
              role="button"
              tabIndex={0}
            >
              <div className="ap-shortcut-icon support">
                <HelpCircle size={20} />
              </div>
              <div className="ap-shortcut-info">
                <h4 className="ap-shortcut-title">Help & Support</h4>
                <p className="ap-shortcut-desc">Get assistance with your administrator account</p>
              </div>
              <ArrowRight size={18} className="ap-shortcut-arrow" />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default AdminProfile;

