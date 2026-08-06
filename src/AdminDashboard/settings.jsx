import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import AdminHeader from './AdminHeader';
import { Moon, Sun, Globe, Clock, Lock, Eye, EyeOff, Check, ShieldCheck } from 'lucide-react';
import './settings.css';

const Settings = () => {
  const [isLightMode, setIsLightMode] = useState(false);
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [language, setLanguage] = useState('en');
  const [dateFormat, setDateFormat] = useState('DD/MM/YYYY');
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({ current: '', newPass: '', confirm: '' });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('admin-theme');
    if (savedTheme === 'light') {
      setIsLightMode(true);
      document.body.classList.add('light-theme');
    }
    const savedLang = localStorage.getItem('admin-language');
    if (savedLang) setLanguage(savedLang);
    const savedDateFmt = localStorage.getItem('admin-date-format');
    if (savedDateFmt) setDateFormat(savedDateFmt);
  }, []);

  const toggleTheme = () => {
    setIsLightMode((prev) => {
      const newMode = !prev;
      if (newMode) {
        document.body.classList.add('light-theme');
        localStorage.setItem('admin-theme', 'light');
      } else {
        document.body.classList.remove('light-theme');
        localStorage.setItem('admin-theme', 'dark');
      }
      return newMode;
    });
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    localStorage.setItem('admin-language', e.target.value);
  };

  const handleDateFormatChange = (e) => {
    setDateFormat(e.target.value);
    localStorage.setItem('admin-date-format', e.target.value);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!passwordData.current || !passwordData.newPass || !passwordData.confirm) {
      setPasswordMsg({ type: 'error', text: 'Please fill in all fields.' });
      return;
    }
    if (passwordData.newPass !== passwordData.confirm) {
      setPasswordMsg({ type: 'error', text: 'New passwords do not match.' });
      return;
    }
    if (passwordData.newPass.length < 6) {
      setPasswordMsg({ type: 'error', text: 'Password must be at least 6 characters.' });
      return;
    }
    setPasswordMsg({ type: 'success', text: 'Password changed successfully!' });
    setPasswordData({ current: '', newPass: '', confirm: '' });
    setTimeout(() => {
      setPasswordMsg(null);
      setShowPasswordForm(false);
    }, 2000);
  };

  return (
    <div className="admin-layout">
      <Sidebar activePage="settings" />
      <main className="admin-main">
        <AdminHeader title="Settings" />
        <div className="dashboard-content">
          <div className="settings-page-wrapper">

            {/* Dark / Light Mode */}
            <div className="settings-theme-card">
              <div className="settings-card-row">
                <div className="theme-icon-box">
                  {isLightMode ? <Sun size={24} /> : <Moon size={24} />}
                </div>
                <div className="theme-card-text">
                  <h2 className="theme-card-title">{isLightMode ? 'Light Mode' : 'Dark Mode'}</h2>
                  <p className="theme-card-desc">{isLightMode ? 'Currently using light theme.' : 'Currently using dark theme.'}</p>
                </div>
              </div>
              <div className="theme-divider" />
              <div
                className={`theme-switch-track ${isLightMode ? 'light' : 'dark'}`}
                onClick={toggleTheme}
                role="switch"
                aria-checked={isLightMode}
                id="theme-toggle-switch"
              >
                <div className="theme-switch-thumb">
                  {isLightMode ? <Sun size={13} /> : <Moon size={13} />}
                </div>
              </div>
            </div>

            {/* Language */}
            <div className="settings-theme-card">
              <div className="settings-card-row">
                <div className="theme-icon-box">
                  <Globe size={24} />
                </div>
                <div className="theme-card-text">
                  <h2 className="theme-card-title">Language</h2>
                  <p className="theme-card-desc">Choose your preferred display language.</p>
                </div>
              </div>
              <div className="theme-divider" />
              <select
                className="settings-select"
                value={language}
                onChange={handleLanguageChange}
                id="language-select"
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="es">Spanish</option>
                <option value="ar">Arabic</option>
              </select>
            </div>

            {/* Date & Time Format */}
            <div className="settings-theme-card">
              <div className="settings-card-row">
                <div className="theme-icon-box">
                  <Clock size={24} />
                </div>
                <div className="theme-card-text">
                  <h2 className="theme-card-title">Date &amp; Time Format</h2>
                  <p className="theme-card-desc">Select how dates and times are displayed.</p>
                </div>
              </div>
              <div className="theme-divider" />
              <select
                className="settings-select"
                value={dateFormat}
                onChange={handleDateFormatChange}
                id="date-format-select"
              >
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                <option value="DD MMM YYYY">DD MMM YYYY</option>
              </select>
            </div>

            {/* Change Password */}
            <div className="settings-theme-card settings-password-card">
              <div className="settings-password-top">
                <div className="settings-card-row">
                  <div className="theme-icon-box">
                    <Lock size={24} />
                  </div>
                  <div className="theme-card-text">
                    <h2 className="theme-card-title">Change Password</h2>
                    <p className="theme-card-desc">Update your account password securely.</p>
                  </div>
                </div>
                <div className="theme-divider" />
                <button
                  className={`settings-btn ${showPasswordForm ? 'settings-btn-cancel' : 'settings-btn-primary'}`}
                  onClick={() => { setShowPasswordForm(!showPasswordForm); setPasswordMsg(null); }}
                  id="change-password-btn"
                >
                  {showPasswordForm ? 'Cancel' : 'Change'}
                </button>
              </div>

              {showPasswordForm && (
                <form className="password-form" onSubmit={handlePasswordSubmit}>
                  {/* Current Password */}
                  <div className="password-field">
                    <label>Current Password</label>
                    <div className="password-input-wrap">
                      <input
                        type={showCurrent ? 'text' : 'password'}
                        placeholder="Enter current password"
                        value={passwordData.current}
                        onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                        id="current-password"
                      />
                      <button type="button" onClick={() => setShowCurrent(!showCurrent)}>
                        {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                  {/* New Password */}
                  <div className="password-field">
                    <label>New Password</label>
                    <div className="password-input-wrap">
                      <input
                        type={showNew ? 'text' : 'password'}
                        placeholder="Enter new password"
                        value={passwordData.newPass}
                        onChange={(e) => setPasswordData({ ...passwordData, newPass: e.target.value })}
                        id="new-password"
                      />
                      <button type="button" onClick={() => setShowNew(!showNew)}>
                        {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                  {/* Confirm Password */}
                  <div className="password-field">
                    <label>Confirm New Password</label>
                    <div className="password-input-wrap">
                      <input
                        type={showConfirm ? 'text' : 'password'}
                        placeholder="Confirm new password"
                        value={passwordData.confirm}
                        onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                        id="confirm-password"
                      />
                      <button type="button" onClick={() => setShowConfirm(!showConfirm)}>
                        {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  {passwordMsg && (
                    <div className={`password-msg ${passwordMsg.type}`}>
                      {passwordMsg.type === 'success' && <Check size={15} />}
                      {passwordMsg.text}
                    </div>
                  )}

                  <button type="submit" className="settings-btn settings-btn-primary password-submit-btn" id="submit-password-btn">
                    Update Password
                  </button>
                </form>
              )}
            </div>

            {/* Two-Factor Authentication */}
            <div className="settings-theme-card">
              <div className="settings-card-row">
                <div className="theme-icon-box">
                  <ShieldCheck size={24} />
                </div>
                <div className="theme-card-text">
                  <h2 className="theme-card-title">Two-Factor Authentication <span className="badge-optional">Optional</span></h2>
                  <p className="theme-card-desc">
                    {twoFAEnabled ? 'Two-factor authentication is enabled.' : 'Add an extra layer of security to your account.'}
                  </p>
                </div>
              </div>
              <div className="theme-divider" />
              <div
                className={`theme-switch-track ${twoFAEnabled ? 'light' : 'dark'}`}
                onClick={() => setTwoFAEnabled(!twoFAEnabled)}
                role="switch"
                aria-checked={twoFAEnabled}
                id="two-fa-toggle"
              >
                <div className="theme-switch-thumb">
                  {twoFAEnabled ? <Check size={13} /> : <ShieldCheck size={13} />}
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
