import { Mail, Phone, Globe, MapPin, Clock, Briefcase, Send } from 'lucide-react';
import { FaInstagram, FaLinkedin, FaFacebook } from 'react-icons/fa';
import './contactus.css';

const ContactUs = () => {
  return (
    <div className="contact-page">

      {/* Hero */}
      <section className="page-hero">
        <div className="container text-center animate-fade-in">
          <h1 className="heading-primary text-white">Contact Us</h1>
          <p className="contact-hero-sub">
            We'd love to hear from you — whether you're a parent with questions, a student ready to get started, or a school exploring a partnership.
          </p>
        </div>
      </section>

      <section className="section-padding container">
        <div className="contact-grid">

          {/* ── Left Column: Info Cards ── */}
          <div className="contact-info-col">

            {/* Get in Touch */}
            <div className="contact-card">
              <div className="contact-card-header">
                <div className="contact-card-icon-wrap">
                  <Phone size={20} />
                </div>
                <h3>Get in Touch</h3>
              </div>
              <ul className="contact-detail-list">
                <li>
                  <Phone size={15} className="detail-icon" />
                  <span><strong>Phone:</strong> +91 7417573741</span>
                </li>
                <li>
                  <Mail size={15} className="detail-icon" />
                  <span>
                    <strong>Email:</strong>{' '}
                    <a href="mailto:careersdream4u@gmail.com" className="contact-link">
                      careersdream4u@gmail.com
                    </a>
                  </span>
                </li>
                <li>
                  <Globe size={15} className="detail-icon" />
                  <span>
                    <strong>Website:</strong>{' '}
                    <a href="https://www.careersdream.com" target="_blank" rel="noopener noreferrer" className="contact-link">
                      www.careersdream.com
                    </a>
                  </span>
                </li>
                <li>
                  <Clock size={15} className="detail-icon" />
                  <span><strong>Office Hours:</strong> Monday–Saturday, 9:00 AM – 6:00 PM</span>
                </li>
                <li>
                  <MapPin size={15} className="detail-icon" />
                  <span><strong>Address:</strong> New Delhi, India</span>
                </li>
              </ul>
            </div>

            {/* Follow Us */}
            <div className="contact-card">
              <div className="contact-card-header">
                <div className="contact-card-icon-wrap">
                  <FaInstagram size={20} />
                </div>
                <h3>Follow Us</h3>
              </div>
              <p className="contact-follow-sub">Stay updated with our latest programs and career tips.</p>
              <div className="social-links">
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn social-btn--instagram"
                  aria-label="Instagram"
                >
                  <FaInstagram size={18} />
                  Instagram
                </a>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn social-btn--linkedin"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={18} />
                  LinkedIn
                </a>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn social-btn--facebook"
                  aria-label="Facebook"
                >
                  <FaFacebook size={18} />
                  Facebook
                </a>
              </div>
            </div>

            {/* For School Partnerships */}
            <div className="contact-card contact-card--school">
              <div className="contact-card-header">
                <div className="contact-card-icon-wrap contact-card-icon-wrap--gold">
                  <Briefcase size={20} />
                </div>
                <h3 className="school-heading">For School Partnerships</h3>
              </div>
              <p className="school-desc">
                Principals and management committees can reach our partnerships team directly at{' '}
                <a href="mailto:careersdream4u@gmail.com" className="contact-link">
                  careersdream4u@gmail.com
                </a>{' '}
                to request a proposal or schedule an introductory presentation.
              </p>
            </div>
          </div>

          {/* ── Right Column: Contact Form ── */}
          <div className="contact-form-col">
            <div className="contact-form-card">
              <h3 className="form-card-title">Send Us a Message</h3>
              <p className="form-card-sub">Fill in the form and we'll get back to you within 24 hours.</p>

              <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-row">
                  <div className="cf-group">
                    <label htmlFor="cf-name">Full Name</label>
                    <input id="cf-name" type="text" placeholder="Your full name" required />
                  </div>
                  <div className="cf-group">
                    <label htmlFor="cf-email">Email Address</label>
                    <input id="cf-email" type="email" placeholder="you@example.com" required />
                  </div>
                </div>

                <div className="cf-group">
                  <label htmlFor="cf-phone">Phone Number</label>
                  <input id="cf-phone" type="tel" placeholder="+91 XXXXX XXXXX" />
                </div>

                <div className="cf-group">
                  <label htmlFor="cf-subject">I am a…</label>
                  <select id="cf-subject">
                    <option value="">Select your role</option>
                    <option value="student">Student</option>
                    <option value="parent">Parent</option>
                    <option value="school">School / Institution</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="cf-group">
                  <label htmlFor="cf-message">Message</label>
                  <textarea id="cf-message" rows={5} placeholder="Tell us how we can help you…" required />
                </div>

                <button type="submit" className="cf-submit-btn">
                  <Send size={16} />
                  Send Message
                </button>
              </form>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default ContactUs;
