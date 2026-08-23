import React, { useState, useRef } from 'react';
import { 
  Upload, Save, Eye, EyeOff, X, CheckCircle2, Image as ImageIcon
} from 'lucide-react';
import Sidebar from './Sidebar';
import AdminHeader from './AdminHeader';
import './index.css';
import './addmember.css';

const Team = () => {
  const fileInputRef = useRef(null);
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
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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
    const apiUrl = import.meta.env.VITE_API_URL || 'https://careersdream-backend.onrender.com';
  
      const res = await fetch(`${apiUrl}/api/team/add`, {
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

          <div className="am-form-card">
            <form onSubmit={handleSubmit} autoComplete="off">
              <div className="am-form-grid">

                {/* Name */}
                <div className="am-form-group">
                  <label htmlFor="name" className="am-label">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    className="am-form-control" 
                    placeholder="e.g. John Doe"
                    autoComplete="off"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Phone */}
                <div className="am-form-group">
                  <label htmlFor="phone" className="am-label">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    className="am-form-control" 
                    placeholder="e.g. +1 (555) 000-0000"
                    autoComplete="off"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Email */}
                <div className="am-form-group">
                  <label htmlFor="email" className="am-label">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    className="am-form-control" 
                    placeholder="e.g. john@example.com"
                    autoComplete="off"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Password */}
                <div className="am-form-group">
                  <label htmlFor="password" className="am-label">Password</label>
                  <div className="am-password-input-wrapper">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      id="password" 
                      name="password" 
                      className="am-form-control" 
                      placeholder="Create a password"
                      autoComplete="new-password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <button 
                      type="button" 
                      className="am-password-toggle-btn"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                
                {/* Image Upload - Full Width (Compact Height) */}
                <div className="am-form-group am-full-width">
                  <label className="am-label">Profile Image</label>
                  <div className={`am-file-upload-wrapper ${imagePreview ? 'has-preview' : ''}`}>
                    <input 
                      ref={fileInputRef}
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageChange}
                      className="am-file-upload-input"
                    />
                    {imagePreview ? (
                      <div className="am-image-preview-container">
                        <img src={imagePreview} alt="Preview" className="am-image-preview" />
                        <div className="am-image-preview-meta">
                          <div className="am-image-filename">
                            <Upload size={13} />
                            <span>{imageFile?.name || 'Selected Image'}</span>
                          </div>
                          <span className="am-image-change-hint">Click box to change photo</span>
                        </div>
                        <button
                          type="button"
                          className="am-image-remove-btn"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleRemoveImage();
                          }}
                          title="Remove image"
                        >
                          <X size={15} />
                        </button>
                      </div>
                    ) : (
                      <div className="am-file-upload-placeholder">
                        <div className="am-file-icon">
                          <ImageIcon size={32} />
                        </div>
                        <p className="am-upload-text">
                          <span>Click to upload</span> or drag and drop photo (PNG, JPG)
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="am-form-actions">
                <button type="button" className="am-btn-secondary"
                  onClick={() => {
                    setFormData({ name: '', phone: '', email: '', password: '' });
                    setImageFile(null);
                    setImagePreview(null);
                    setSuccess('');
                    setError('');
                  }}
                >Cancel</button>
                <button type="submit" className="am-btn-primary" disabled={loading}>
                  {loading ? (
                    <span className="am-btn-spinner">⏳ Saving...</span>
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
