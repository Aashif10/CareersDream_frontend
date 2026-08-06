import React from 'react';
import { Mail, Phone, Clock, CheckCircle, HeartHandshake } from 'lucide-react';
import Sidebar from './Sidebar';
import AdminHeader from './AdminHeader';
import './support.css';

const Support = () => {
  return (
    <div className="admin-layout">
      <Sidebar activePage="support" />

      <main className="admin-main">
        <AdminHeader title="Support Center" />

        <div className="dashboard-content">
          <div className="support-container">
            {/* Header Section */}
            <div className="support-header">
              <h1>We're Here to Help</h1>
              <p>
                At <strong>CareersDream</strong>, our support team is dedicated to providing quick and reliable assistance. Whether you have questions about your account, courses, career counseling, or experience any technical issues, we're here to help.
              </p>
              <p className="subtitle-highlight">
                Our goal is to ensure you have a smooth and hassle-free experience while using our platform.
              </p>
            </div>
            
            <div className="support-content">
              {/* Left Column */}
              <div className="support-left">
                {/* Contact Information */}
                <div className="support-card contact-card">
                  <h2>Contact Information</h2>
                  <div className="contact-item">
                    <div className="icon primary-icon"><Mail size={24} /></div>
                    <div>
                        <h4>Email</h4>
                        <a href="mailto:support@careersdream.com">support@careersdream.com</a>
                    </div>
                  </div>
                  <div className="contact-item">
                    <div className="icon primary-icon"><Phone size={24} /></div>
                    <div>
                        <h4>Phone</h4>
                        <a href="tel:+917417573741">+91 7417573741</a>
                    </div>
                  </div>
                  <div className="contact-item">
                    <div className="icon primary-icon"><Clock size={24} /></div>
                    <div>
                        <h4>Office Hours</h4>
                        <p>Monday – Saturday<br/>9:00 AM – 6:00 PM (IST)</p>
                    </div>
                  </div>
                </div>

                {/* Message from Admin */}
                <div className="support-card admin-message">
                  <div className="admin-icon"><HeartHandshake size={32} /></div>
                  <h2>Message from the Admin</h2>
                  <p>
                    Thank you for choosing CareersDream. We are committed to providing the best possible support and continuously improving our platform. If you encounter any issues or have suggestions, please don't hesitate to contact us. Your feedback helps us serve you better.
                  </p>
                </div>
              </div>

              {/* Right Column */}
              <div className="support-right">
                {/* Support Services */}
                <div className="support-card services-card">
                  <h2>Support Services</h2>
                  <ul className="services-list">
                    <li>
                      <CheckCircle className="check-icon" size={20} />
                      <span>Account & Login Assistance</span>
                    </li>
                    <li>
                      <CheckCircle className="check-icon" size={20} />
                      <span>Course Enrollment Support</span>
                    </li>
                    <li>
                      <CheckCircle className="check-icon" size={20} />
                      <span>Career Counseling Queries</span>
                    </li>
                    <li>
                      <CheckCircle className="check-icon" size={20} />
                      <span>Technical Issue Resolution</span>
                    </li>
                    <li>
                      <CheckCircle className="check-icon" size={20} />
                      <span>Payment & Billing Support</span>
                    </li>
                    <li>
                      <CheckCircle className="check-icon" size={20} />
                      <span>General Assistance</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Support;
