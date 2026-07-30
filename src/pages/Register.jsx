import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    qualification: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      console.log('Sending registration request...', { name: formData.fullName, email: formData.email });
      const apiUrl = import.meta.env.VITE_API_URL || 'https://careersdream-backend.onrender.com';
      const response = await fetch(`${apiUrl}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();
      console.log('Server response:', response.status, data);

      if (response.ok) {
        localStorage.setItem('token', data.token);
        setShowSuccessPopup(true);
      } else {
        const errorMsg = data.message || 'Registration failed';
        setError(errorMsg);
        alert('Registration Error: ' + errorMsg);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('An error occurred during registration. Please check the console.');
      alert('Network Error: Could not connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-layout">
        
        {/* Left Side: Branding / Visuals */}
        <div className="register-visual">
          <div className="visual-content animate-fade-in">
            <div className="reg-brand-name"><span className="brand-white">Careers</span><span className="brand-gold">Dream</span></div>
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

            <form onSubmit={handleSubmit} className="modern-form">
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <div className="input-wrapper">
                  <input type="text" id="fullName" name="fullName" placeholder="Name" required value={formData.fullName} onChange={handleChange} />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-wrapper">
                  <input type="email" id="email" name="email" placeholder="Email" required value={formData.email} onChange={handleChange} />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-wrapper">
                  <input type="password" id="password" name="password" placeholder="Password" required value={formData.password} onChange={handleChange} />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="qualification">Class / Qualification</label>
                <div className="input-wrapper">
                  <select id="qualification" name="qualification" required value={formData.qualification} onChange={handleChange}>
                    <option value="" disabled>Select your current status</option>
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
                </div>
              </div>



              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Registering...' : 'Register Now'}
                {!loading && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>}
              </button>
            </form>

            <div className="form-footer">
              <p>Already have an account? <a href="/login" className="login-link">Log In</a></p>
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
