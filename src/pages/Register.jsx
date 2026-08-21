import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    qualification: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const doRegister = async (retrying = false) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    const apiUrl = import.meta.env.VITE_API_URL || 'https://careersdream-backend.onrender.com';
    try {
      const response = await fetch(`${apiUrl}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
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
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      clearTimeout(timeoutId);
      if (err.name === 'AbortError' && !retrying) {
        setStatusMsg('⏳ Server is starting up, retrying...');
        setTimeout(() => doRegister(true), 2000);
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
    await doRegister();
  };

  return (
    <div className="register-page">
      <div className="register-layout">
        
        {/* Left Side: Branding / Visuals */}
        <div className="register-visual">
          <div className="visual-content animate-fade-in">
            <div className="reg-brand-name"><span className="brand-white">Careers</span><span className="brand-gold">Dream</span></div>
            <div className="reg-brand-divider"></div>
            <h2 className="visual-title">Unlock Your<br/>Future with Us</h2>
            <p className="visual-subtitle">
              Join thousands of students discovering their perfect career path. A world of opportunities awaits!
            </p>
            <div className="reg-stats-grid">
              <div className="reg-stat-card">
                <span className="reg-stat-icon">🎓</span>
                <span className="reg-stat-value">10k+</span>
                <span className="reg-stat-label">Students Mentored</span>
              </div>
              <div className="reg-stat-card">
                <span className="reg-stat-icon">👩‍💼</span>
                <span className="reg-stat-value">500+</span>
                <span className="reg-stat-label">Expert Counselors</span>
              </div>
              <div className="reg-stat-card">
                <span className="reg-stat-icon">🏆</span>
                <span className="reg-stat-value">95%</span>
                <span className="reg-stat-label">Success Rate</span>
              </div>
              <div className="reg-stat-card">
                <span className="reg-stat-icon">🌍</span>
                <span className="reg-stat-value">50+</span>
                <span className="reg-stat-label">Career Paths</span>
              </div>
            </div>
          </div>
          {/* Decorative shapes */}
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
        </div>

        {/* Right Side: Form */}
        <div className="register-form-container">
          <div className="form-wrapper animate-fade-in">
            <h2 className="form-title">Create an Account</h2>
            <p className="form-subtitle">Please fill in your details to get started.</p>
            {error && <div className="error-message" style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}
            {statusMsg && <div style={{ color: '#d97706', marginBottom: '12px', fontSize: '0.9rem', textAlign: 'center' }}>{statusMsg}</div>}

            <form onSubmit={handleSubmit} className="modern-form" autoComplete="off">
              <div className="form-group">
                <div className="input-wrapper floating-label-wrapper">
                  <input type="text" id="fullName" name="fullName" placeholder=" " required value={formData.fullName} onChange={handleChange} autoComplete="off" />
                  <label htmlFor="fullName">Full Name</label>
                </div>
              </div>

              <div className="form-group">
                <div className="input-wrapper floating-label-wrapper">
                  <input type="email" id="email" name="email" placeholder=" " required value={formData.email} onChange={handleChange} autoComplete="off" />
                  <label htmlFor="email">Email Address</label>
                </div>
              </div>

              <div className="form-group">
                <div className="input-wrapper floating-label-wrapper">
                  <input type={showPassword ? 'text' : 'password'} id="password" name="password" placeholder=" " required value={formData.password} onChange={handleChange} autoComplete="new-password" />
                  <label htmlFor="password">Password</label>
                  <button
                    type="button"
                    className="reg-toggle-password"
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

              <div className="form-group">
                <div className="input-wrapper floating-label-wrapper floating-select-wrapper">
                  <select id="qualification" name="qualification" required value={formData.qualification} onChange={handleChange}>
                    <option value="" disabled hidden></option>
                    <option value="Class 8">Class 8</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 10">Class 10</option>
                    <option value="Class 11">Class 11</option>
                    <option value="Class 12">Class 12</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Postgraduate">Postgraduate</option>
                    <option value="Working Professional">Working Professional</option>
                    <option value="Other">Other</option>
                  </select>
                  <label htmlFor="qualification" className={formData.qualification ? 'label-float' : ''}>Class / Qualification</label>
                </div>
              </div>



              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Registering...' : 'Register Now'}
                {!loading && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>}
              </button>
            </form>

            <div className="form-footer">
              <p>Already have an account? <Link to="/login" className="login-link">Log In</Link></p>
            </div>
          </div>
        </div>

      </div>

      {/* Success Modal */}
      {showSuccessPopup && (
        <div className="success-modal-overlay">
          <div className="success-modal-card">
            <div className="success-modal-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h3 className="success-modal-title">Registration successful!</h3>
            <p className="success-modal-subtitle">You can now log in to your account.</p>
            <button 
              className="success-modal-btn"
              onClick={() => {
                setShowSuccessPopup(false);
                navigate('/login');
              }}
            >
              Ok
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
