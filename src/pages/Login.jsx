import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const doLogin = async (retrying = false) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    const apiUrl = import.meta.env.VITE_API_URL || 'https://careersdream-backend.onrender.com';
    try {
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.identifier,
          password: formData.password
        }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        if (data.user && data.user.name) localStorage.setItem('userName', data.user.name);
        else if (data.name) localStorage.setItem('userName', data.name);
        setStatusMsg('');
        setShowSuccessPopup(true);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      clearTimeout(timeoutId);
      if (err.name === 'AbortError' && !retrying) {
        setStatusMsg('⏳ Server is starting up, retrying...');
        setTimeout(() => doLogin(true), 2000);
        return;
      }
      setError(err.name === 'AbortError'
        ? 'Server is taking too long. Please try again in a moment.'
        : 'Network error. Could not connect to the server.');
    } finally {
      if (!(!retrying && false)) setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setStatusMsg('');
    setLoading(true);
    await doLogin();
  };

  return (
    <div className="login-page">
      <div className="login-layout">

        {/* Top: Branding Banner */}
        <div className="login-visual">
          <div className="login-visual-content animate-fade-in">
            <div className="login-brand-name"><span className="brand-white">Careers</span><span className="brand-gold">Dream</span></div>
            <div className="login-brand-divider"></div>
            <h2 className="login-visual-title">Welcome Back!</h2>

          </div>
          <div className="login-blob login-blob-1"></div>
          <div className="login-blob login-blob-2"></div>
        </div>

        {/* Bottom: Login Form */}
        <div className="login-form-container">
          <div className="login-form-wrapper animate-fade-in">
            <h2 className="login-form-title">Log In</h2>
            <p className="login-form-subtitle">Enter your credentials to continue.</p>
            {error && <div className="error-message" style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}
            {statusMsg && <div style={{ color: '#d97706', marginBottom: '12px', fontSize: '0.9rem', textAlign: 'center' }}>{statusMsg}</div>}

            <form onSubmit={handleSubmit} className="login-form" autoComplete="off">

              {/* Email or Mobile */}
              <div className="login-form-group">
                <div className="login-input-wrapper login-floating-wrapper">
                  <span className="input-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  </span>
                  <input
                    type="text"
                    id="identifier"
                    name="identifier"
                    placeholder=" "
                    required
                    value={formData.identifier}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                  <label htmlFor="identifier">Email or Mobile Number</label>
                </div>
              </div>

              {/* Password */}
              <div className="login-form-group">
                <div className="login-input-wrapper login-floating-wrapper">
                  <span className="input-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    placeholder=" "
                    required
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                  />
                  <label htmlFor="password">Password</label>
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    )}
                  </button>
                </div>
                <div className="forgot-link-row">
                  <a href="#" className="forgot-link">Forgot Password?</a>
                </div>
              </div>

              {/* Remember Me */}
              <div className="remember-row">
                <label className="remember-label">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    id="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />
                  <span className="custom-checkbox"></span>
                  Remember Me
                </label>
              </div>

              {/* Submit */}
              <button type="submit" className="login-submit-btn" disabled={loading}>
                {loading ? 'Logging in...' : 'Log In'}
                {!loading && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>}
              </button>
            </form>

            <div className="login-form-footer">
              <p>Don't have an account? <Link to="/register" className="register-link">Register Now</Link></p>
            </div>
          </div>
        </div>

      </div>
      {/* Login Success Modal */}
      {showSuccessPopup && (
        <div className="login-success-modal-overlay">
          <div className="login-success-modal-card">
            <div className="login-success-modal-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h3 className="login-success-modal-title">Login Successful! 🎉</h3>
            <p className="login-success-modal-subtitle">Welcome back! You are now logged in to your account.</p>
            <button
              className="login-success-modal-btn"
              onClick={() => {
                setShowSuccessPopup(false);
                navigate('/');
              }}
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
