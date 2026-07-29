import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.identifier,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate('/'); // Redirect to home or dashboard after login
      } else {
        setError(data.message || 'Login failed');
        alert('Login Error: ' + (data.message || 'Login failed'));
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('An error occurred during login. Please try again.');
      alert('Network Error: Could not connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-layout">

        {/* Left Side: Branding */}
        <div className="login-visual">
          <div className="login-visual-content animate-fade-in">
            <div className="login-brand-name"><span className="brand-white">Careers</span><span className="brand-gold">Dream</span></div>
            <div className="login-brand-divider"></div>
            <h2 className="login-visual-title">Welcome Back!</h2>
            <p className="login-visual-subtitle">
              Log in to access your personalized career dashboard, counseling sessions, and expert guidance.
            </p>
            <div className="login-stats-grid">
              <div className="login-stat-card">
                <span className="login-stat-icon">🎯</span>
                <span className="login-stat-value">10k+</span>
                <span className="login-stat-label">Students Guided</span>
              </div>
              <div className="login-stat-card">
                <span className="login-stat-icon">👩‍💼</span>
                <span className="login-stat-value">500+</span>
                <span className="login-stat-label">Expert Counselors</span>
              </div>
              <div className="login-stat-card">
                <span className="login-stat-icon">🏆</span>
                <span className="login-stat-value">95%</span>
                <span className="login-stat-label">Success Rate</span>
              </div>
              <div className="login-stat-card">
                <span className="login-stat-icon">🌍</span>
                <span className="login-stat-value">50+</span>
                <span className="login-stat-label">Career Paths</span>
              </div>
            </div>
          </div>
          <div className="login-blob login-blob-1"></div>
          <div className="login-blob login-blob-2"></div>
        </div>

        {/* Right Side: Login Form */}
        <div className="login-form-container">
          <div className="login-form-wrapper animate-fade-in">
            <h2 className="login-form-title">Log In</h2>
            <p className="login-form-subtitle">Enter your credentials to continue.</p>
            {error && <div className="error-message" style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}

            <form onSubmit={handleSubmit} className="login-form">

              {/* Email or Mobile */}
              <div className="login-form-group">
                <label htmlFor="identifier">Email Address or Mobile Number</label>
                <div className="login-input-wrapper">
                  <span className="input-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  </span>
                  <input
                    type="text"
                    id="identifier"
                    name="identifier"
                    placeholder="Enter your Email or Mobile Number"
                    required
                    value={formData.identifier}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="login-form-group">
                <div className="password-label-row">
                  <label htmlFor="password">Password</label>
                  <a href="#" className="forgot-link">Forgot Password?</a>
                </div>
                <div className="login-input-wrapper">
                  <span className="input-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    placeholder="Enter your Password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                  />
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
              <p>Don't have an account? <a href="/register" className="register-link">Register Now</a></p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
