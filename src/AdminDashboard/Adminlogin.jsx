import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ShieldCheck, Mail, Lock } from 'lucide-react';
import './Adminlogin.css';

const Adminlogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${backendUrl}/api/team/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) throw new Error('Invalid or unauthorized credentials');
      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      setSuccess('Authentication successful...');
      setTimeout(() => navigate('/admin'), 1200);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modern-admin-layout">
      {/* Animated Background Elements */}
      <div className="bg-glow-orb orb-1"></div>
      <div className="bg-glow-orb orb-2"></div>
      <div className="bg-grid-overlay"></div>

      {/* Main Glass Card */}
      <div className="modern-glass-card">
        
        <div className="card-header">
          <div className="icon-wrapper">
            <ShieldCheck size={32} strokeWidth={1.5} />
          </div>
          <h1>Admin Portal</h1>
          <p>Sign in to the CareersDream Admin Portal</p>
        </div>

        {error && <div className="modern-alert alert-error">{error}</div>}
        {success && <div className="modern-alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit} className="modern-form">
          <div className="modern-input-wrapper">
            <label>Work Email</label>
            <div className="input-with-icon">
              <Mail size={18} className="input-icon" />
              <input 
                type="email" 
                placeholder="admin@careerdream.com" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
          </div>

          <div className="modern-input-wrapper">
            <label>Password</label>
            <div className="input-with-icon">
              <Lock size={18} className="input-icon" />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••••" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
              <button 
                type="button" 
                className="btn-eye" 
                onClick={() => setShowPassword(!showPassword)}
                tabIndex="-1"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="modern-form-footer">
            <label className="modern-checkbox">
              <input type="checkbox" />
              <span className="chk-box"></span>
              Remember device
            </label>
            <a href="#" className="forgot-link">Recover access?</a>
          </div>

          <button type="submit" className="modern-submit-btn" disabled={loading}>
            {loading ? (
              <span className="loader-ring"></span>
            ) : (
              'Authenticate'
            )}
          </button>
        </form>

        <div className="card-footer">
          <p>Secure connection established</p>
          <span>v2.0.41 - 2026 Build</span>
        </div>

      </div>
    </div>
  );
};

export default Adminlogin;
