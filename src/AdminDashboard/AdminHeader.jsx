import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, ChevronDown, LogOut, User } from 'lucide-react';

const AdminHeader = ({ title = 'Dashboard Overview' }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const apiUrl = "https://careersdream-backend.onrender.com";

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/adminlogin');
  };

  // Get today's date formatted
  const today = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <header className="admin-header">
      <div className="header-left">
        <h1 className="dashboard-title">{title}</h1>
        <p className="dashboard-subtitle">
          Welcome back, {user ? user.name.split(' ')[0] : 'Admin'}!
        </p>
      </div>

      <div className="header-actions">
        <div className="dashboard-date">{today}</div>

        <button className="notification-btn">
          <Bell size={20} />
          <span className="notification-badge">4</span>
        </button>

        <div className="profile-dropdown-container" style={{ position: 'relative' }} ref={dropdownRef}>
          <div className="user-profile" onClick={() => setProfileOpen(!profileOpen)}>
            <img
              src={
                user && user.profileImage
                  ? `${apiUrl}/${user.profileImage}`
                  : `https://ui-avatars.com/api/?name=${encodeURIComponent(user ? user.name : 'Admin')}&background=34D399&color=111312&bold=true`
              }
              alt="User"
              className="avatar"
            />
            <div className="user-info">
              <span className="user-name">{user ? user.name : 'Admin User'}</span>
              <span className="user-role">{user && user.role ? user.role : 'Administrator'}</span>
            </div>
            <ChevronDown
              size={16}
              className="chevron"
              style={{
                transition: 'transform 0.2s',
                transform: profileOpen ? 'rotate(180deg)' : 'rotate(0)',
              }}
            />
          </div>

          {profileOpen && (
            <div className="profile-dropdown-menu">

              <div className="dropdown-divider" />
              <button className="dropdown-item">
                <User size={16} /> View Profile
              </button>
              <button className="dropdown-item text-red" onClick={handleLogout}>
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
