import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Globe, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !email.trim()) return;

    setLoading(true);
    setStatus(null);
    setMessage('');

    const rawApiUrl = import.meta.env.VITE_API_URL || 'https://careersdream-backend.onrender.com';
    const apiUrl = rawApiUrl.endsWith('/') ? rawApiUrl.slice(0, -1) : rawApiUrl;

    try {
      const response = await fetch(`${apiUrl}/api/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setMessage(data.message || 'Subscribed successfully!');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.message || 'Subscription failed. Please try again.');
      }
    } catch (err) {
      console.error('Newsletter error:', err);
      setStatus('error');
      setMessage('Unable to connect. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1: Brand & About */}
          <div className="footer-brand">
            <h3 className="logo">Careers<span>Dream</span></h3>
            <p className="tagline">Empowering students to discover their potential and design their future.</p>
            <form className="newsletter-form" onSubmit={handleSubscribe}>
              <div className="newsletter-input-wrapper">
                <input
                  type="email"
                  placeholder="Subscribe to newsletter"
                  className="newsletter-input"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status) setStatus(null);
                  }}
                  disabled={loading}
                  required
                />
                <button
                  type="submit"
                  className="newsletter-submit-btn"
                  disabled={loading || !email.trim()}
                  aria-label="Subscribe"
                  title="Subscribe"
                >
                  {loading ? <Loader2 size={16} className="newsletter-spinner" /> : <Send size={15} />}
                </button>
              </div>
              {status && (
                <div className={`newsletter-feedback ${status}`}>
                  {status === 'success' ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                  <span>{message}</span>
                </div>
              )}
            </form>
            <div className="social-icons">
              <a href="#" aria-label="Facebook" className="social-icon facebook"><FaFacebook size={18} /></a>
              <a href="https://www.instagram.com/careersdream4u/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-icon instagram"><FaInstagram size={18} /></a>
              <a href="https://www.linkedin.com/in/careers-dream-92630b425/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-icon linkedin"><FaLinkedin size={18} /></a>
              <a href="https://www.youtube.com/channel/UCJ3eiGtgCmOaLuvvv7Jvs-g" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="social-icon youtube"><FaYoutube size={18} /></a>
              <a href="https://x.com/Careersdream4u" target="_blank" rel="noopener noreferrer" aria-label="X" className="social-icon x-twitter"><FaXTwitter size={18} /></a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/courses">Our Courses</Link></li>
              <li><Link to="/students">For Students</Link></li>
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div className="footer-links">
            <h4>Our Services</h4>
            <ul>
              <li><Link to="/services/counseling">Career Counseling</Link></li>
              <li><Link to="/services/assessment">Assessment</Link></li>
              <li><Link to="/services/study-abroad">Study Abroad</Link></li>
              <li><Link to="/services/skill-development">Skill Development</Link></li>
            </ul>
          </div>

          {/* Column 4: Resources */}
          <div className="footer-links">
            <h4>Resources</h4>
            <ul>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/resources">Resources</Link></li>
              <li><Link to="/scholarships">Scholarships</Link></li>
            </ul>
          </div>

          {/* Column 5: Contact */}
          <div className="footer-contact">
            <h4>Contact</h4>
            <ul>
              <li><Phone size={14} /> +91 7417573741</li>
              <li><Mail size={14} />careersdream4u@gmail.com </li>
              <li><Globe size={14} /> <a href="https://www.careersdream.com" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>CareersDream.com</a></li>
              <li><MapPin size={14} /> New Delhi, India</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} CareersDream. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/sitemap">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
