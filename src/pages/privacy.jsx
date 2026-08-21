import React from 'react';
import { 
  Shield, 
  UserCheck, 
  Sparkles, 
  Lock, 
  Cookie, 
  Scale, 
  Users, 
  Mail, 
  Globe, 
  Calendar,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import './privacy.css';

const policyCards = [
  {
    icon: UserCheck,
    number: '01',
    title: 'Information We Collect',
    points: [
      'Personal details (name, email, mobile number)',
      'Educational background and career interests',
      'Data from registration, counselling, and contact forms',
      'Technical device and website usage info'
    ]
  },
  {
    icon: Sparkles,
    number: '02',
    title: 'How We Use Your Data',
    points: [
      'Provide personalised career counselling & roadmaps',
      'Manage accounts and respond to enquiries',
      'Improve website features, tools, and services',
      'Ensure security and regulatory compliance'
    ]
  },
  {
    icon: Lock,
    number: '03',
    title: 'Sharing & Data Security',
    points: [
      'We do NOT sell or rent your personal information',
      'Shared only with trusted service providers to operate services',
      'Standard security protocols to prevent unauthorized access'
    ]
  },
  {
    icon: Cookie,
    number: '04',
    title: 'Cookies & Preferences',
    points: [
      'Used for essential functionality and site performance',
      'Helps remember preferences and analyse traffic',
      'Easily managed or disabled via your browser settings'
    ]
  },
  {
    icon: Scale,
    number: '05',
    title: 'Your Privacy Rights',
    points: [
      'Request access, correction, or deletion of your data',
      'Withdraw consent at any time where applicable',
      'Raise privacy inquiries directly with our team'
    ]
  },
  {
    icon: Users,
    number: '06',
    title: "Children's Privacy & Updates",
    points: [
      'Parental/guardian consent verified when required by law',
      'Policy updates published on this page with revision dates',
      'Data retained only as long as necessary for services'
    ]
  }
];

const Privacy = () => {
  return (
    <div className="privacy-page">
      {/* Compact Hero */}
      <section className="privacy-hero">
        <div className="privacy-hero-bg-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
        </div>
        <div className="container privacy-hero-container">
          <div className="privacy-badge">
            <Shield size={15} />
            <span>Privacy Summary</span>
          </div>
          <h1 className="privacy-title">Privacy Policy</h1>
          <div className="privacy-meta-bar">
            <span className="meta-pill">
              <Calendar size={14} /> Last Updated: <strong>August 21, 2026</strong>
            </span>
            <span className="meta-pill">
              <CheckCircle2 size={14} /> CareersDream Protection
            </span>
          </div>
          <p className="privacy-lead">
            We respect your privacy and are committed to protecting your personal information. Here is a clear, concise summary of how we handle your data.
          </p>
        </div>
      </section>

      {/* Main Content: Clean Grid Layout */}
      <section className="container privacy-compact-container">
        <div className="policy-grid">
          {policyCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div key={idx} className="compact-card">
                <div className="compact-card-header">
                  <div className="compact-icon-wrap">
                    <Icon size={20} />
                  </div>
                  <div className="compact-card-title-wrap">
                    <span className="compact-card-num">{card.number}</span>
                    <h3>{card.title}</h3>
                  </div>
                </div>
                <ul className="compact-points-list">
                  {card.points.map((point, pIdx) => (
                    <li key={pIdx}>
                      <span className="point-dot"></span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Contact & Support Banner */}
        <div className="privacy-contact-banner">
          <div className="contact-banner-content">
            <div className="contact-banner-text">
              <h3>Have questions about your data?</h3>
              <p>Our team is here to assist with any privacy inquiries or data requests.</p>
            </div>
            <div className="contact-actions">
              <a href="mailto:careersdream4u@gmail.com" className="contact-btn primary">
                <Mail size={16} /> careersdream4u@gmail.com
              </a>
              <a href="https://www.careersdream.com" target="_blank" rel="noopener noreferrer" className="contact-btn secondary">
                <Globe size={16} /> www.careersdream.com
              </a>
            </div>
          </div>
        </div>

        {/* Short Consent Note */}
        <div className="short-consent-card">
          <CheckCircle2 size={20} className="consent-icon" />
          <p>
            By using CareersDream, you acknowledge that you have read and understood this Privacy Policy.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
