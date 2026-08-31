import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, ChevronDown, LogOut, User } from 'lucide-react';

const AdminHeader = ({ title = 'Dashboard Overview' }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [imgError, setImgError] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL || 'https://careersdream-backend.onrender.com';

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsed = JSON.parse(userData);
      setUser(parsed);
      setImgError(false);

      // Fetch latest profile details if ID is available
      if (parsed._id) {
        const token = localStorage.getItem('token');
        fetch(`${apiUrl}/api/team/${parsed._id}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success && data.data) {
              setUser((prev) => ({ ...prev, ...data.data }));
              localStorage.setItem('user', JSON.stringify({ ...parsed, ...data.data }));
            }
          })
          .catch(() => {});
      }
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

  // Helper to format profile image source correctly
  const getProfileImageUrl = () => {
    if (!user || !user.profileImage) return null;
    const img = user.profileImage;
    if (img.startsWith('http://') || img.startsWith('https://')) {
      return img;
    }
    const cleanPath = img.startsWith('/') ? img.slice(1) : img;
    if (cleanPath.startsWith('uploads/')) {
      return `${apiUrl}/${cleanPath}`;
    }
    return `${apiUrl}/uploads/${cleanPath}`;
  };

  const avatarSrc = !imgError && getProfileImageUrl()
    ? getProfileImageUrl()
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(user ? user.name : 'Admin')}&background=34D399&color=111312&bold=true`;

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
              src={avatarSrc}
              alt={user ? user.name : 'User'}
              className="avatar"
              onError={() => setImgError(true)}
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
              <button className="dropdown-item" onClick={() => { setProfileOpen(false); navigate('/admin/profile'); }}>
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

