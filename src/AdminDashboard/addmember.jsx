import React, { useState } from 'react';
import { 
  Upload, Save, Eye, EyeOff, X, CheckCircle2
} from 'lucide-react';
import Sidebar from './Sidebar';
import AdminHeader from './AdminHeader';
import './index.css';
import './addmember.css';

const Team = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation();
    setImageFile(null);
    setImagePreview(null);
  };

  const [loading, setLoading]       = useState(false);
  const [success, setSuccess]       = useState('');
  const [error, setError]           = useState('');
  const [showModal, setShowModal]   = useState(false);
  const [addedMemberName, setAddedMemberName] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');

    try {
      // Build multipart/form-data so the image is sent along
      const payload = new FormData();
      payload.append('name',     formData.name);
      payload.append('phone',    formData.phone);
      payload.append('email',    formData.email);
      payload.append('password', formData.password);
      if (imageFile) {
        payload.append('profileImage', imageFile);
      }

      const res = await fetch('http://localhost:5000/api/team/add', {
        method: 'POST',
        body: payload,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to add member');
      }

      setAddedMemberName(formData.name);
      setShowModal(true);

      // Reset form
      setFormData({ name: '', phone: '', email: '', password: '' });
      setImageFile(null);
      setImagePreview(null);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <Sidebar activePage="team" />

      {/* Main Content */}
      <main className="admin-main">
        {/* Header */}
        <AdminHeader title="Add Team Member" />

        {/* Dashboard Content */}
        <div className="dashboard-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

          {/* Success / Error Alerts */}
          {success && (
            <div className="alert alert-success">
              ✅ {success}
            </div>
          )}
          {error && (
            <div className="alert alert-error">
              ❌ {error}
            </div>
          )}

          <div className="form-card">
            <form onSubmit={handleSubmit} autoComplete="off">
              <div className="form-grid">


                {/* Name */}
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    className="form-control" 
                    placeholder="e.g. John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Phone */}
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    className="form-control" 
                    placeholder="e.g. +1 (555) 000-0000"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Email */}
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    className="form-control" 
                    placeholder="e.g. john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Password */}
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <div className="password-input-wrapper">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      id="password" 
                      name="password" 
                      className="form-control" 
                      placeholder="Create a password"
                      autoComplete="new-password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <button 
                      type="button" 
                      className="password-toggle-btn"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                
                {/* Image Upload - Full Width (Moved to end) */}
                <div className="form-group full-width">
                  <label>Profile Image</label>
                  <div className="file-upload-wrapper" style={{ cursor: 'pointer', position: 'relative' }}>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageChange}
                      style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', zIndex: 2 }}
                    />
                    {imagePreview ? (
                      <div className="image-preview-container">
                        <button
                          type="button"
                          className="image-remove-btn"
                          onClick={handleRemoveImage}
                          title="Remove image"
                        >
                          <X size={14} />
                        </button>
                        <img src={imagePreview} alt="Preview" className="image-preview" />
                        <div className="image-filename">
                          <Upload size={14} />
                          <span>{imageFile.name}</span>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="file-icon">
                          <Upload size={32} />
                        </div>
                        <p className="upload-text">
                          <span>Click to upload</span> or drag and drop<br />
                          SVG, PNG, JPG or GIF (max. 800x400px)
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-secondary"
                  onClick={() => {
                    setFormData({ name: '', phone: '', email: '', password: '' });
                    setImageFile(null);
                    setImagePreview(null);
                    setSuccess('');
                    setError('');
                  }}
                >Cancel</button>
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? (
                    <span className="btn-spinner">⏳ Saving...</span>
                  ) : (
                    <><Save size={18} /> Save Member</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* ── Success Popup Modal ── */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setShowModal(false)}>
              <X size={18} />
            </button>
            <div className="modal-icon-success">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="modal-title">Member Added Successfully!</h3>
            <p className="modal-subtitle">
              <strong>{addedMemberName}</strong> has been registered and added to the team list.
            </p>
            <div className="modal-actions">
              <button 
                type="button" 
                className="btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Add Another
              </button>
              <a 
                href="/admin/team-list" 
                className="btn-primary"
              >
                View Team List
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Team;
