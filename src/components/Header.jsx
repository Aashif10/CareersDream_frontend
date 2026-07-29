import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo.png';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

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
          
          <div className="auth-buttons mobile-only">
            {isLoggedIn ? (
              <button className="btn btn-outline" onClick={() => { handleLogout(); setIsMenuOpen(false); }}>Logout</button>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline" onClick={() => setIsMenuOpen(false)}>Login</Link>
                <Link to="/register" className="btn btn-primary" onClick={() => setIsMenuOpen(false)}>Register</Link>
              </>
            )}
          </div>
        </nav>
        <div className="auth-buttons desktop-only">
          {isLoggedIn ? (
            <button className="btn btn-outline" onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline">Login</Link>
              <Link to="/register" className="btn btn-primary">Register</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
