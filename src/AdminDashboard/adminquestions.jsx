import React, { useState, useEffect } from 'react';
import {
  HelpCircle, Plus, Search, RefreshCw, Trash2, Edit3, CheckCircle2,
  XCircle, Check, X, AlertCircle, Send, Scale
} from 'lucide-react';
import Sidebar from './Sidebar';
import AdminHeader from './AdminHeader';
import './index.css';
import './adminquestions.css';

const API_URL = import.meta.env.VITE_API_URL || 'https://careersdream-backend.onrender.com';

const NORMAL_OPTIONS_PAYLOAD = [
  { label: 'Strongly Disagree', marks: 1 },
  { label: 'Disagree', marks: 2 },
  { label: 'Neutral', marks: 3 },
  { label: 'Agree', marks: 4 },
  { label: 'Strongly Agree', marks: 5 }
];

const REVERSE_OPTIONS_PAYLOAD = [
  { label: 'Strongly Disagree', marks: 5 },
  { label: 'Disagree', marks: 4 },
  { label: 'Neutral', marks: 3 },
  { label: 'Agree', marks: 2 },
  { label: 'Strongly Agree', marks: 1 }
];

const AdminQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState({ msg: '', type: '' });

  // Direct question input state
  const [newQuestionText, setNewQuestionText] = useState('');
  const [scoringType, setScoringType] = useState('Normal');
  const [submitting, setSubmitting] = useState(false);

  // Edit Modal state
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [editQuestionText, setEditQuestionText] = useState('');
  const [editScoringType, setEditScoringType] = useState('Normal');

  // Fetch all questions
  const fetchQuestions = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/api/questions/admin`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch questions');
      setQuestions(data.data || []);
    } catch (err) {
      try {
        const fallbackRes = await fetch(`${API_URL}/api/questions`);
        const fallbackData = await fallbackRes.json();
        if (fallbackRes.ok && fallbackData.data) {
          setQuestions(fallbackData.data);
          return;
        }
      } catch (e) {
        // ignore
      }
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  // Auto-dismiss toast
  useEffect(() => {
    if (!toast.msg) return;
    const t = setTimeout(() => setToast({ msg: '', type: '' }), 3500);
    return () => clearTimeout(t);
  }, [toast]);

  // Upload / Add Question
  const handleAddQuestion = async (e) => {
    e.preventDefault();
    if (!newQuestionText.trim()) {
      setToast({ msg: 'Please enter question text', type: 'error' });
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        question: newQuestionText.trim(),
        scoringType: scoringType,
        order: questions.length + 1,
        isActive: true,
        options: scoringType === 'Reverse' ? REVERSE_OPTIONS_PAYLOAD : NORMAL_OPTIONS_PAYLOAD
      };

      const res = await fetch(`${API_URL}/api/questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to add question');

      setToast({ msg: 'Question uploaded successfully!', type: 'success' });
      setNewQuestionText('');
      setScoringType('Normal');
      fetchQuestions();
    } catch (err) {
      setToast({ msg: err.message, type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  // Update Question
  const handleUpdateQuestion = async (e) => {
    e.preventDefault();
    if (!editQuestionText.trim() || !editingQuestion) return;

    try {
      const res = await fetch(`${API_URL}/api/questions/${editingQuestion._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: editQuestionText.trim(),
          scoringType: editScoringType,
          options: editScoringType === 'Reverse' ? REVERSE_OPTIONS_PAYLOAD : NORMAL_OPTIONS_PAYLOAD
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update question');

      setToast({ msg: 'Question updated successfully!', type: 'success' });
      setEditingQuestion(null);
      setEditQuestionText('');
      fetchQuestions();
    } catch (err) {
      setToast({ msg: err.message, type: 'error' });
    }
  };

  // Delete Question
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this question?')) return;
    try {
      const res = await fetch(`${API_URL}/api/questions/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Delete failed');
      setQuestions(prev => prev.filter(q => q._id !== id));
      setToast({ msg: 'Question deleted successfully', type: 'success' });
    } catch (err) {
      setToast({ msg: err.message, type: 'error' });
    }
  };

  // Toggle Active/Inactive status
  const handleToggleActive = async (q) => {
    try {
      const res = await fetch(`${API_URL}/api/questions/${q._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !q.isActive })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Update failed');
      setQuestions(prev => prev.map(item => item._id === q._id ? { ...item, isActive: !item.isActive } : item));
      setToast({ msg: `Question status updated to ${!q.isActive ? 'Active' : 'Inactive'}`, type: 'success' });
    } catch (err) {
      setToast({ msg: err.message, type: 'error' });
    }
  };

  // Helper to determine question scoring type
  const getScoringType = (q) => {
    if (q.scoringType) return q.scoringType;
    if (q.options && q.options.length > 0) {
      const firstOpt = q.options[0];
      if (firstOpt.label === 'Strongly Disagree' && firstOpt.marks === 5) {
        return 'Reverse';
      }
    }
    return 'Normal';
  };

  // Filter questions
  const filtered = questions.filter(q =>
    q.question && q.question.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-layout">
      <Sidebar activePage="questions" />

      <main className="admin-main">
        <AdminHeader title="Questions Management" />

        <div className="dashboard-content">
          {/* Toast */}
          {toast.msg && (
            <div className={`aq-toast aq-toast--${toast.type}`}>
              {toast.type === 'success' ? '✅' : '❌'} {toast.msg}
            </div>
          )}

          {/* Quick Upload Question Card */}
          <div className="aq-upload-card">
            <div className="aq-upload-header">
              <div className="aq-upload-icon">
                <Plus size={20} />
              </div>
              <div>
                <h2 className="aq-upload-title">Upload New Question</h2>
                <p className="aq-upload-sub">Type your question statement and select scoring mode (Normal / Reverse).</p>
              </div>
            </div>

            <form onSubmit={handleAddQuestion} className="aq-upload-form">
              <div className="aq-input-row">
                <textarea
                  rows={2}
                  className="aq-textarea"
                  placeholder="Enter question text here..."
                  value={newQuestionText}
                  onChange={(e) => setNewQuestionText(e.target.value)}
                  required
                />
              </div>

              {/* Scoring Mode Selection */}
              <div className="aq-scoring-selection-group">
                <label className="aq-scoring-label">
                  <Scale size={16} />
                  <span>Scoring Mode:</span>
                </label>

                <div className="aq-scoring-options-row">
                  <div
                    className={`aq-scoring-card ${scoringType === 'Normal' ? 'selected' : ''}`}
                    onClick={() => setScoringType('Normal')}
                  >
                    <div className="aq-scoring-radio">
                      <div className={`aq-radio-circle ${scoringType === 'Normal' ? 'active' : ''}`} />
                    </div>
                    <div className="aq-scoring-details">
                      <div className="aq-scoring-name">
                        <strong>Normal Scoring</strong>
                        <span className="aq-tag-pill normal">1 → 5 Marks</span>
                      </div>
                      <div className="aq-scoring-preview">
                        <span>SD: 1</span> • <span>D: 2</span> • <span>N: 3</span> • <span>A: 4</span> • <span>SA: 5</span>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`aq-scoring-card ${scoringType === 'Reverse' ? 'selected' : ''}`}
                    onClick={() => setScoringType('Reverse')}
                  >
                    <div className="aq-scoring-radio">
                      <div className={`aq-radio-circle ${scoringType === 'Reverse' ? 'active' : ''}`} />
                    </div>
                    <div className="aq-scoring-details">
                      <div className="aq-scoring-name">
                        <strong>Reverse Scoring</strong>
                        <span className="aq-tag-pill reverse">5 → 1 Marks</span>
                      </div>
                      <div className="aq-scoring-preview">
                        <span>SD: 5</span> • <span>D: 4</span> • <span>N: 3</span> • <span>A: 2</span> • <span>SA: 1</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="aq-submit-row">
                <button
                  type="submit"
                  className="aq-btn-add"
                  disabled={submitting || !newQuestionText.trim()}
                >
                  <Plus size={18} />
                  <span>{submitting ? 'Uploading...' : 'Add Question'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Search & Header Bar */}
          <div className="aq-list-header-bar">
            <div className="aq-search-box">
              <Search size={16} className="aq-search-icon" />
              <input
                type="text"
                placeholder="Search all questions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="aq-list-actions">
              <span className="aq-count-tag">{filtered.length} Question{filtered.length !== 1 ? 's' : ''} Total</span>
              <button className="aq-refresh-btn" onClick={fetchQuestions} title="Refresh list">
                <RefreshCw size={17} className={loading ? 'aq-spin' : ''} />
              </button>
            </div>
          </div>

          {/* All Questions Table Card */}
          <div className="aq-table-card">
            {loading ? (
              <div className="aq-state-box">
                <div className="aq-spinner" />
                <p>Loading all questions...</p>
              </div>
            ) : error ? (
              <div className="aq-state-box aq-state-box--error">
                <AlertCircle size={36} color="#ef4444" />
                <p>{error}</p>
                <button className="aq-btn-retry" onClick={fetchQuestions}>Retry</button>
              </div>
            ) : filtered.length === 0 ? (
              <div className="aq-state-box">
                <HelpCircle size={44} opacity={0.3} />
                <p>{search ? 'No questions match your search.' : 'No questions uploaded yet. Use the form above to add questions.'}</p>
              </div>
            ) : (
              <div className="aq-table-wrapper">
                <table className="aq-table">
                  <thead>
                    <tr>
                      <th style={{ width: '50px' }}>#</th>
                      <th>Question Statement</th>
                      <th style={{ width: '150px' }}>Scoring Mode</th>
                      <th style={{ width: '120px' }}>Status</th>
                      <th style={{ width: '100px', textAlign: 'center' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((q, idx) => {
                      const qScoring = getScoringType(q);
                      return (
                        <tr key={q._id} className="aq-row">
                          <td className="aq-index-cell">
                            <span className="aq-index-circle">{idx + 1}</span>
                          </td>
                          <td className="aq-question-cell">
                            <span className="aq-q-text-clean">{q.question}</span>
                          </td>
                          <td>
                            <span className={`aq-scoring-badge aq-scoring-badge--${qScoring.toLowerCase()}`}>
                              <span className="aq-scoring-dot" />
                              {qScoring} ({qScoring === 'Reverse' ? '5→1' : '1→5'})
                            </span>
                          </td>
                          <td>
                            <button
                              className={`aq-status-pill ${q.isActive ? 'active' : 'inactive'}`}
                              onClick={() => handleToggleActive(q)}
                              title="Click to toggle Active/Inactive"
                            >
                              {q.isActive ? <CheckCircle2 size={13} /> : <XCircle size={13} />}
                              <span>{q.isActive ? 'Active' : 'Inactive'}</span>
                            </button>
                          </td>
                          <td>
                            <div className="aq-actions-group" style={{ justifyContent: 'center' }}>
                              <button
                                className="aq-action-btn edit"
                                onClick={() => {
                                  setEditingQuestion(q);
                                  setEditQuestionText(q.question);
                                  setEditScoringType(getScoringType(q));
                                }}
                                title="Edit Question"
                              >
                                <Edit3 size={15} />
                              </button>
                              <button
                                className="aq-action-btn delete"
                                onClick={() => handleDelete(q._id)}
                                title="Delete Question"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Edit Question Modal */}
      {editingQuestion && (
        <div className="aq-modal-overlay">
          <div className="aq-modal-card">
            <div className="aq-modal-header">
              <div className="aq-modal-title">
                <Edit3 size={18} />
                <h3>Edit Question</h3>
              </div>
              <button
                className="aq-modal-close"
                onClick={() => setEditingQuestion(null)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleUpdateQuestion} className="aq-modal-form">
              <div className="aq-form-group">
                <label>Question Statement</label>
                <textarea
                  rows={3}
                  className="aq-textarea"
                  required
                  value={editQuestionText}
                  onChange={(e) => setEditQuestionText(e.target.value)}
                />
              </div>

              <div className="aq-form-group">
                <label>Scoring Mode</label>
                <div className="aq-scoring-options-row">
                  <div
                    className={`aq-scoring-card ${editScoringType === 'Normal' ? 'selected' : ''}`}
                    onClick={() => setEditScoringType('Normal')}
                  >
                    <div className="aq-scoring-radio">
                      <div className={`aq-radio-circle ${editScoringType === 'Normal' ? 'active' : ''}`} />
                    </div>
                    <div className="aq-scoring-details">
                      <div className="aq-scoring-name">
                        <strong>Normal (1 → 5)</strong>
                      </div>
                      <div className="aq-scoring-preview">
                        SD: 1, D: 2, N: 3, A: 4, SA: 5
                      </div>
                    </div>
                  </div>

                  <div
                    className={`aq-scoring-card ${editScoringType === 'Reverse' ? 'selected' : ''}`}
                    onClick={() => setEditScoringType('Reverse')}
                  >
                    <div className="aq-scoring-radio">
                      <div className={`aq-radio-circle ${editScoringType === 'Reverse' ? 'active' : ''}`} />
                    </div>
                    <div className="aq-scoring-details">
                      <div className="aq-scoring-name">
                        <strong>Reverse (5 → 1)</strong>
                      </div>
                      <div className="aq-scoring-preview">
                        SD: 5, D: 4, N: 3, A: 2, SA: 1
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="aq-modal-footer">
                <button
                  type="button"
                  className="aq-btn-cancel"
                  onClick={() => setEditingQuestion(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="aq-btn-submit"
                  disabled={!editQuestionText.trim()}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminQuestions;

