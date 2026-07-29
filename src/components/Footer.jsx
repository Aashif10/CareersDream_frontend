import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1: Brand & About */}
          <div className="footer-brand">
            <h3 className="logo">Careers<span>Dream</span></h3>
            <p className="tagline">Empowering students to discover their potential and design their future.</p>
            <div className="newsletter">
              <input type="email" placeholder="Subscribe to newsletter" className="newsletter-input" />
            </div>
            <div className="social-icons">
              <a href="#" aria-label="Facebook"><FaFacebook size={18} /></a>
              <a href="#" aria-label="Instagram"><FaInstagram size={18} /></a>
              <a href="#" aria-label="LinkedIn"><FaLinkedin size={18} /></a>
              <a href="#" aria-label="YouTube"><FaYoutube size={18} /></a>
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
              <li><Phone size={14} /> +91 98765 43210</li>
              <li><Mail size={14} /> info@careersdream.com</li>
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
