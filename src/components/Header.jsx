import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo.png';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('userName') || '';
    setIsLoggedIn(!!token);
    setUserName(name);
  }, [location]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    setDropdownOpen(false);
    navigate('/login');
  };

  const avatarLetter = userName ? userName.charAt(0).toUpperCase() : '?';

  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo">
          <img src={logo} alt="CareersDream" className="logo-img" />
        </Link>
        <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
        <nav className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setIsMenuOpen(false)}>About Us</Link>
          <Link to="/courses" onClick={() => setIsMenuOpen(false)}>Our Courses</Link>
          <Link to="/schools" onClick={() => setIsMenuOpen(false)}>For Schools</Link>
          <Link to="/students" onClick={() => setIsMenuOpen(false)}>For Students</Link>
          <Link to="/contactus" onClick={() => setIsMenuOpen(false)}>Contact Us</Link>

          <div className="auth-buttons mobile-only">
            {isLoggedIn ? (
              <button className="btn btn-outline" onClick={() => { handleLogout(); setIsMenuOpen(false); }}>Logout</button>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline" onClick={() => setIsMenuOpen(false)}>Login</Link>
                <Link to="/register" className="btn btn-outline" onClick={() => setIsMenuOpen(false)}>Register</Link>
              </>
            )}
          </div>
        </nav>
        <div className="auth-buttons desktop-only">
          {isLoggedIn ? (
            <div className="user-avatar-wrapper" ref={dropdownRef}>
              <button
                className="user-avatar-btn"
                onClick={() => setDropdownOpen((prev) => !prev)}
                aria-label="User menu"
                title={userName || 'User'}
              >
                {avatarLetter}
              </button>
              {dropdownOpen && (
                <div className="user-dropdown">
                  <div className="user-dropdown-header">
                    <div className="user-dropdown-avatar">{avatarLetter}</div>
                    <div className="user-dropdown-name">{userName || 'User'}</div>
                  </div>
                  <div className="user-dropdown-divider" />
                  <button className="user-dropdown-logout" onClick={handleLogout}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                      <polyline points="16 17 21 12 16 7"/>
                      <line x1="21" y1="12" x2="9" y2="12"/>
                    </svg>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline">Login</Link>
              <Link to="/register" className="btn btn-outline">Register</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
