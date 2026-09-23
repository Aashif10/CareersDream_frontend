import React, { useState } from 'react';
import {
  Mail,
  Phone,
  Globe,
  MapPin,
  Clock,
  Briefcase,
  Send,
  CheckCircle2,
  Copy,
  Check,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { FaInstagram, FaLinkedin, FaFacebook, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import './contactus.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleSelect = (roleValue) => {
    setFormData((prev) => ({ ...prev, role: roleValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: '',
      message: '',
    });
    setIsSubmitted(false);
  };

  const handleCopy = (text, field) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  const roles = [
    { label: 'Student', value: 'student' },
    { label: 'Parent', value: 'parent' },
    { label: 'School / Institution', value: 'school' },
    { label: 'Other', value: 'other' },
  ];

  return (
    <div className="contact-page">
      {/* Ambient background glows */}
      <div className="contact-ambient-glow contact-glow-1" />
      <div className="contact-ambient-glow contact-glow-2" />

      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container text-center animate-fade-in">
          <div className="contact-hero-badge">
            <Sparkles size={15} className="hero-badge-icon" />
            <span>We're Here to Help You Thrive</span>
          </div>

          <h1 className="contact-hero-title">
            Get in <span className="highlight-text">Touch</span> With Us
          </h1>

          <p className="contact-hero-sub">
            We'd love to hear from you — whether you're a parent with questions, a student ready to get started, or a school exploring a partnership.
          </p>

          {/* Quick trust metrics / assurance */}
          <div className="contact-trust-bar">
            <div className="trust-item">
              <Clock size={16} className="trust-icon" />
              <span>Response within <strong>24 hours</strong></span>
            </div>
            <div className="trust-divider" />
            <div className="trust-item">
              <ShieldCheck size={16} className="trust-icon" />
              <span><strong>100% Confidential</strong> & Free Consultation</span>
            </div>
            <div className="trust-divider" />
            <div className="trust-item">
              <MapPin size={16} className="trust-icon" />
              <span>Based in <strong>New Delhi, India</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="contact-main-section">
        <div className="container">
          <div className="contact-grid">

            {/* ── Left Column: Direct Reach & Info ── */}
            <div className="contact-info-col">

              {/* Contact Info Rows (Colorful Accents: Icon | Content | Copy Button) */}
              <div className="contact-info-rows">

                {/* Row 1: Call Our Advisors */}
                <div className="contact-row-item contact-row-item--phone">
                  <div className="cri-icon cri-icon--phone">
                    <Phone size={20} />
                  </div>
                  <div className="cri-content">
                    <div className="cri-top-row">
                      <span className="cri-label">CALL OUR ADVISORS</span>
                      <a href="tel:+91-9541869852" className="cri-value">+91-9541869852</a>
                    </div>
                    <div className="cri-sub">Mon–Sat, 9:00 AM – 6:00 PM</div>
                  </div>
                  <button 
                    className="cri-copy-btn" 
                    onClick={() => handleCopy('+91-9541869852', 'phone')}
                    title="Copy phone number"
                  >
                    {copiedField === 'phone' ? <Check size={16} className="text-success" /> : <Copy size={16} />}
                    {copiedField === 'phone' && <span className="cri-tooltip">Copied!</span>}
                  </button>
                </div>

                {/* Row 2: Send An Email */}
                <div className="contact-row-item contact-row-item--email">
                  <div className="cri-icon cri-icon--email">
                    <Mail size={20} />
                  </div>
                  <div className="cri-content">
                    <div className="cri-top-row">
                      <span className="cri-label">SEND AN EMAIL</span>
                      <a href="mailto:careersdream4u@gmail.com" className="cri-value">
                        careersdream4u@gmail.com
                      </a>
                    </div>
                    <div className="cri-sub">Online support team</div>
                  </div>
                  <button 
                    className="cri-copy-btn" 
                    onClick={() => handleCopy('careersdream4u@gmail.com', 'email')}
                    title="Copy email address"
                  >
                    {copiedField === 'email' ? <Check size={16} className="text-success" /> : <Copy size={16} />}
                    {copiedField === 'email' && <span className="cri-tooltip">Copied!</span>}
                  </button>
                </div>

                {/* Row 3: Official Website */}
                <div className="contact-row-item contact-row-item--website">
                  <div className="cri-icon cri-icon--website">
                    <Globe size={20} />
                  </div>
                  <div className="cri-content">
                    <div className="cri-top-row">
                      <span className="cri-label">OFFICIAL WEBSITE</span>
                      <a 
                        href="https://www.careersdream.com" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="cri-value"
                      >
                        www.careersdream.com
                      </a>
                    </div>
                    <div className="cri-sub">Explore courses &amp; assessments</div>
                  </div>
                  <a 
                    href="https://www.careersdream.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="cri-copy-btn"
                    title="Visit official website"
                  >
                    <ArrowRight size={16} />
                  </a>
                </div>

                {/* Row 4: Office Headquarters */}
                <div className="contact-row-item contact-row-item--location">
                  <div className="cri-icon cri-icon--location">
                    <MapPin size={20} />
                  </div>
                  <div className="cri-content">
                    <div className="cri-top-row">
                      <span className="cri-label">OFFICE LOCATION</span>
                      <span className="cri-value cri-value--static">New Delhi, India</span>
                    </div>
                    <div className="cri-sub">Mon–Sat: 9:00 AM – 6:00 PM</div>
                  </div>
                </div>

              </div>

              {/* School Partnerships Feature Card */}
              <div className="school-partnership-card">
                <div className="spc-badge">
                  <Briefcase size={16} />
                  <span>Institutional Collaboration</span>
                </div>
                <h3 className="spc-title">For School Partnerships</h3>
                <p className="spc-desc">
                  Principals and management committees can reach our partnerships team directly at{' '}
                  <a href="mailto:careersdream4u@gmail.com" className="spc-link">
                    careersdream4u@gmail.com
                  </a>{' '}
                  to request a tailored proposal or schedule an introductory presentation for your school.
                </p>
                <div className="spc-action">
                  <a href="mailto:careersdream4u@gmail.com?subject=School%20Partnership%20Inquiry" className="spc-btn">
                    <span>Inquire for Institution</span>
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>

            </div>

            {/* ── Right Column: Interactive Contact Form ── */}
            <div className="contact-form-col">
              <div className="contact-form-wrapper">
                
                {isSubmitted ? (
                  /* Animated Success Card */
                  <div className="form-success-state animate-fade-in">
                    <div className="success-icon-wrap">
                      <CheckCircle2 size={56} className="success-icon" />
                    </div>
                    <h3 className="success-title">Message Sent Successfully!</h3>
                    <p className="success-desc">
                      Thank you for reaching out, <strong>{formData.name || 'there'}</strong>. Our career guidance team has received your message and will respond via email (<em>{formData.email}</em>) or phone within 24 hours.
                    </p>
                    
                    <div className="success-info-box">
                      <div className="sib-item">
                        <span className="sib-label">Subject Role:</span>
                        <span className="sib-val">
                          {roles.find(r => r.value === formData.role)?.label || 'General Inquiry'}
                        </span>
                      </div>
                      <div className="sib-item">
                        <span className="sib-label">Estimated Response:</span>
                        <span className="sib-val text-gold">Under 24 Hours</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="reset-form-btn"
                      onClick={handleReset}
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  /* Form Card */
                  <div className="contact-form-card">
                    <div className="form-header">
                      <div className="form-header-badge">
                        <Send size={14} />
                        <span>Direct Channel</span>
                      </div>
                      <h2 className="form-card-title">Send Us a Message</h2>
                      <p className="form-card-sub">
                        Fill in the form and we'll get back to you within 24 hours.
                      </p>
                    </div>

                    <form className="contact-form" onSubmit={handleSubmit}>
                      {/* Name & Email Row */}
                      <div className="form-row">
                        <div className="cf-group">
                          <label htmlFor="cf-name">
                            Full Name <span className="req-star">*</span>
                          </label>
                          <input
                            id="cf-name"
                            name="name"
                            type="text"
                            placeholder="e.g. Rahul Sharma"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="cf-group">
                          <label htmlFor="cf-email">
                            Email Address <span className="req-star">*</span>
                          </label>
                          <input
                            id="cf-email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      {/* Phone Number */}
                      <div className="cf-group">
                        <label htmlFor="cf-phone">
                          Phone Number <span className="optional-tag">(Optional)</span>
                        </label>
                        <input
                          id="cf-phone"
                          name="phone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>

                      {/* Role Selector Chips */}
                      <div className="cf-group">
                        <label htmlFor="cf-subject">
                          I am a… <span className="req-star">*</span>
                        </label>
                        <div className="role-selector-chips" role="radiogroup" aria-label="I am a">
                          {roles.map((r) => (
                            <button
                              key={r.value}
                              type="button"
                              className={`role-chip ${formData.role === r.value ? 'role-chip--active' : ''}`}
                              onClick={() => handleRoleSelect(r.value)}
                            >
                              {r.label}
                            </button>
                          ))}
                        </div>
                        {/* Hidden select fallback for accessibility & standard form compliance */}
                        <select
                          id="cf-subject"
                          name="role"
                          value={formData.role}
                          onChange={handleChange}
                          className="role-native-select"
                          required
                        >
                          <option value="">Select your role</option>
                          <option value="student">Student</option>
                          <option value="parent">Parent</option>
                          <option value="school">School / Institution</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      {/* Message Textarea */}
                      <div className="cf-group">
                        <label htmlFor="cf-message">
                          Your Message <span className="req-star">*</span>
                        </label>
                        <textarea
                          id="cf-message"
                          name="message"
                          rows={4}
                          placeholder="Tell us how we can help you with your career journey or school counseling..."
                          value={formData.message}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      {/* Submit CTA */}
                      <button
                        type="submit"
                        className={`cf-submit-btn ${isSubmitting ? 'cf-submit-btn--loading' : ''}`}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <div className="submit-spinner-wrap">
                            <div className="submit-spinner" />
                            <span>Sending Message...</span>
                          </div>
                        ) : (
                          <>
                            <Send size={18} />
                            <span>Send Message</span>
                          </>
                        )}
                      </button>

                      <p className="form-privacy-note">
                        <ShieldCheck size={14} />
                        <span>Your data is protected. We will never share your personal information.</span>
                      </p>
                    </form>
                  </div>
                )}

              </div>
            </div>

            {/* ── Full Width Social Section with Centered Header ── */}
            <div className="contact-social-section">
              <div className="social-header-centered">
                <div className="social-icon-pulse">
                  <MessageSquare size={20} />
                </div>
                <h3 className="social-card-title">Follow Us &amp; Stay Connected</h3>
                <p className="social-card-sub">Stay updated with our latest programs and career tips.</p>
              </div>

              <div className="contact-social-full-row">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-pill social-pill--facebook"
                  aria-label="Facebook"
                >
                  <FaFacebook size={18} className="social-pill-icon" />
                  <span>Facebook</span>
                </a>
                <a
                  href="https://www.instagram.com/careersdream4u/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-pill social-pill--instagram"
                  aria-label="Instagram"
                >
                  <FaInstagram size={18} className="social-pill-icon" />
                  <span>Instagram</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/careers-dream-92630b425/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-pill social-pill--linkedin"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={18} className="social-pill-icon" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://www.youtube.com/channel/UCJ3eiGtgCmOaLuvvv7Jvs-g"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-pill social-pill--youtube"
                  aria-label="YouTube"
                >
                  <FaYoutube size={18} className="social-pill-icon" />
                  <span>YouTube</span>
                </a>
                <a
                  href="https://x.com/Careersdream4u"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-pill social-pill--twitter"
                  aria-label="X (Twitter)"
                >
                  <FaXTwitter size={18} className="social-pill-icon" />
                  <span></span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
