import React, { useState, useEffect } from 'react';
import {
  FileText, Search, RefreshCw, Trash2, Eye, Printer, Award,
  Calendar, Mail, Phone, User, CheckCircle, AlertCircle, X, ChevronRight, BarChart2, AlertTriangle
} from 'lucide-react';
import Sidebar from './Sidebar';
import AdminHeader from './AdminHeader';
import './index.css';
import './adminreports.css';

const API_URL = import.meta.env.VITE_API_URL || 'https://careersdream-backend.onrender.com';

const formatDate = (iso) => {
  if (!iso) return '-';
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const getInitials = (name = '') =>
  name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);

const AVATAR_COLORS = [
  '#34d399', '#60a5fa', '#f59e0b', '#a78bfa', '#f472b6', '#38bdf8', '#fbbf24'
];
const getAvatarColor = (id = '') =>
  AVATAR_COLORS[id.charCodeAt(id.length - 1) % AVATAR_COLORS.length] || '#60a5fa';

const AdminReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);
  const [toast, setToast] = useState({ msg: '', type: '' });
  const [deletingId, setDeletingId] = useState(null);
  const [questionsMap, setQuestionsMap] = useState({});
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  // Helper to determine whether question scoring is Normal (1->5) or Reverse (5->1)
  const getQuestionScoringType = (resp) => {
    if (resp.scoringType) return resp.scoringType;
    if (resp.isReverse !== undefined) return resp.isReverse ? 'Reverse' : 'Normal';

    if (resp.questionId && questionsMap[resp.questionId]) {
      const q = questionsMap[resp.questionId];
      if (q.scoringType) return q.scoringType;
      if (q.options && q.options.length > 0 && q.options[0].label === 'Strongly Disagree' && q.options[0].marks === 5) {
        return 'Reverse';
      }
    }
    if (resp.order && questionsMap[`order_${resp.order}`]) {
      const q = questionsMap[`order_${resp.order}`];
      if (q.scoringType) return q.scoringType;
    }
    if (resp.questionText && questionsMap[resp.questionText.trim().toLowerCase()]) {
      const q = questionsMap[resp.questionText.trim().toLowerCase()];
      if (q.scoringType) return q.scoringType;
    }

    // Mathematical deduction from selectedOption & marksObtained
    const opt = (resp.selectedOption || '').trim().toLowerCase();
    const marks = Number(resp.marksObtained);
    if (opt.includes('strongly agree')) return marks === 1 ? 'Reverse' : 'Normal';
    if (opt.includes('strongly disagree')) return marks === 5 ? 'Reverse' : 'Normal';
    if (opt.includes('agree') && !opt.includes('disagree')) return marks === 2 ? 'Reverse' : 'Normal';
    if (opt.includes('disagree')) return marks === 4 ? 'Reverse' : 'Normal';

    return 'Normal';
  };

  // Fetch all test submissions
  const fetchReports = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/api/test/reports`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch test reports');
      setReports(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();

    // Fetch questions to build lookup map for scoring types
    fetch(`${API_URL}/api/questions/admin`)
      .then(res => res.json())
      .then(d => {
        if (d.data && Array.isArray(d.data)) {
          const map = {};
          d.data.forEach(q => {
            if (q._id) map[q._id] = q;
            if (q.order) map[`order_${q.order}`] = q;
            if (q.question) map[q.question.trim().toLowerCase()] = q;
          });
          setQuestionsMap(map);
        }
      })
      .catch(() => {
        // fallback to public questions endpoint
        fetch(`${API_URL}/api/questions`)
          .then(res => res.json())
          .then(d => {
            if (d.data && Array.isArray(d.data)) {
              const map = {};
              d.data.forEach(q => {
                if (q._id) map[q._id] = q;
                if (q.order) map[`order_${q.order}`] = q;
                if (q.question) map[q.question.trim().toLowerCase()] = q;
              });
              setQuestionsMap(map);
            }
          })
          .catch(() => {});
      });
  }, []);

  // Toast timer
  useEffect(() => {
    if (!toast.msg) return;
    const t = setTimeout(() => setToast({ msg: '', type: '' }), 3500);
    return () => clearTimeout(t);
  }, [toast]);

  // Delete submission
  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      const res = await fetch(`${API_URL}/api/test/reports/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Delete failed');
      setReports(prev => prev.filter(r => r._id !== id));
      if (selectedReport && selectedReport._id === id) {
        setSelectedReport(null);
      }
      setToast({ msg: 'Report deleted successfully', type: 'success' });
    } catch (err) {
      setToast({ msg: err.message, type: 'error' });
    } finally {
      setDeletingId(null);
    }
  };

  // View full report details
  const handleViewReport = async (report) => {
    setSelectedReport(report);
    // If responses are incomplete, fetch fresh details
    try {
      const res = await fetch(`${API_URL}/api/test/reports/${report._id}`);
      const data = await res.json();
      if (res.ok && data.data) {
        setSelectedReport(data.data);
      }
    } catch (e) {
      // ignore
    }
  };

  // Print modal report
  const handlePrint = () => {
    window.print();
  };

  // Filter reports
  const filtered = reports.filter(r =>
    (r.userName && r.userName.toLowerCase().includes(search.toLowerCase())) ||
    (r.userEmail && r.userEmail.toLowerCase().includes(search.toLowerCase())) ||
    (r._id && r._id.includes(search))
  );

  // Overall Stats
  const totalSubmissions = reports.length;
  const avgPercentage = totalSubmissions > 0
    ? Math.round(reports.reduce((acc, curr) => acc + (curr.percentage || 0), 0) / totalSubmissions)
    : 0;
  const avgScore = totalSubmissions > 0
    ? (reports.reduce((acc, curr) => acc + (curr.totalScore || 0), 0) / totalSubmissions).toFixed(1)
    : 0;

  return (
    <div className="admin-layout">
      <Sidebar activePage="test-reports" />

      <main className="admin-main">
        <AdminHeader title="Student Test Reports & Submissions" />

        <div className="dashboard-content">
          {/* Toast Notification */}
          {toast.msg && (
            <div className={`ar-toast ar-toast--${toast.type}`}>
              {toast.type === 'success' ? '✅' : '❌'} {toast.msg}
            </div>
          )}

          {/* Top Page Header */}
          <div className="ar-page-header hide-on-print">
            <div className="ar-title-group">
              <div className="ar-title-icon">
                <FileText size={24} />
              </div>
              <div>
                <h1 className="ar-title">User Test Reports</h1>
                <p className="ar-subtitle">
                  {totalSubmissions} Test{totalSubmissions !== 1 ? 's' : ''} Taken
                </p>
              </div>
            </div>

            <div className="ar-header-actions">
              <div className="ar-search-box">
                <Search size={15} className="ar-search-icon" />
                <input
                  type="text"
                  placeholder="Search by student name or email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <button className="ar-refresh-btn" onClick={fetchReports} title="Refresh Reports">
                <RefreshCw size={18} className={loading ? 'ar-spin' : ''} />
              </button>
            </div>
          </div>

          {/* Submissions Table Card */}
          <div className="ar-table-card hide-on-print">
            {loading ? (
              <div className="ar-state-box">
                <div className="ar-spinner" />
                <p>Loading test submissions...</p>
              </div>
            ) : error ? (
              <div className="ar-state-box ar-state-box--error">
                <AlertCircle size={40} color="#ef4444" />
                <p>{error}</p>
                <button className="ar-btn-retry" onClick={fetchReports}>Retry</button>
              </div>
            ) : filtered.length === 0 ? (
              <div className="ar-state-box">
                <FileText size={48} opacity={0.3} />
                <p>{search ? 'No reports match your search query.' : 'No test reports submitted yet.'}</p>
              </div>
            ) : (
              <div className="ar-table-wrapper">
                <table className="ar-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Candidate Name</th>
                      <th>Email</th>
                      <th>Questions</th>
                      <th>Total Score</th>
                      <th>Submitted Date & Time</th>
                      <th style={{ width: '130px' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((r, idx) => (
                      <tr key={r._id} className="ar-row">
                        <td className="ar-index-cell">{idx + 1}</td>
                        <td>
                          <div className="ar-user-cell">
                            <div
                              className="ar-avatar"
                              style={{ background: getAvatarColor(r._id) }}
                            >
                              {getInitials(r.userName || 'User')}
                            </div>
                            <span className="ar-user-name">{r.userName || 'Anonymous'}</span>
                          </div>
                        </td>
                        <td className="ar-muted">{r.userEmail || '-'}</td>
                        <td>
                          <span className="ar-count-badge">
                            {r.responses ? r.responses.length : 0} Qs
                          </span>
                        </td>
                        <td>
                          <div className="ar-score-cell">
                            <span className="ar-score-main">{r.totalScore} / {r.maxScore}</span>
                            <span className={`ar-pct-pill ${r.percentage >= 70 ? 'high' : r.percentage >= 45 ? 'mid' : 'low'}`}>
                              {r.percentage}%
                            </span>
                          </div>
                        </td>
                        <td className="ar-date-cell">
                          <span className="ar-date-text">{formatDate(r.createdAt)}</span>
                        </td>
                        <td>
                          <div className="ar-actions-group">
                            <button
                              className="ar-btn-view"
                              onClick={() => handleViewReport(r)}
                              title="View Full Test Report"
                            >
                              <Eye size={15} />
                              <span>View</span>
                            </button>
                            <button
                              className="ar-btn-delete"
                              onClick={() => setConfirmDeleteId(r._id)}
                              disabled={deletingId === r._id}
                              title="Delete Report"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Comprehensive Full Test Report Modal / Print View */}
      {selectedReport && (
        <div className="ar-modal-overlay">
          <div className="ar-modal-card ar-report-modal">
            {/* Modal Top Bar */}
            <div className="ar-modal-header hide-on-print">
              <div className="ar-modal-title">
                <Award size={22} color="#c29903" />
                <h3>Comprehensive Personality Test Report</h3>
              </div>
              <div className="ar-modal-actions">
                <button className="ar-btn-print" onClick={handlePrint} title="Print / Download PDF">
                  <Printer size={16} />
                  <span>Print / Save PDF</span>
                </button>
                <button
                  className="ar-modal-close"
                  onClick={() => setSelectedReport(null)}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Printable Report Body */}
            <div className="ar-modal-body printable-report-area">
              {/* Header Profile Section */}
              <div className="ar-report-candidate-header">
                <div className="ar-candidate-info">
                  <h2>{selectedReport.userName}</h2>
                  <div className="ar-candidate-meta">
                    <span><Mail size={14} /> {selectedReport.userEmail}</span>
                    {selectedReport.userPhone && (
                      <span><Phone size={14} /> {selectedReport.userPhone}</span>
                    )}
                    <span><Calendar size={14} /> Submitted: {formatDate(selectedReport.createdAt)}</span>
                  </div>
                </div>

                <div className="ar-report-score-banner">
                  <div className="ar-score-big">
                    <span className="val">{selectedReport.totalScore}</span>
                    <span className="max">/{selectedReport.maxScore}</span>
                  </div>
                  <div className="ar-score-badge">
                    {selectedReport.percentage}% Total Marks
                  </div>
                </div>
              </div>

              {/* Personality Insight Summary Card */}
              {selectedReport.summary && (
                <div className="ar-report-summary-box">
                  <h4>Assessment Evaluation & Profile Insight</h4>
                  <p>{selectedReport.summary}</p>
                </div>
              )}

              {/* Category Breakdown if available */}
              {selectedReport.categoryBreakdown && selectedReport.categoryBreakdown.length > 0 && (
                <div className="ar-category-breakdown-section">
                  <h4>Category-wise Score Analysis</h4>
                  <div className="ar-cat-grid">
                    {selectedReport.categoryBreakdown.map((cat, i) => (
                      <div key={i} className="ar-cat-card">
                        <div className="ar-cat-header">
                          <span className="ar-cat-title">{cat.category}</span>
                          <span className="ar-cat-score">{cat.score}/{cat.maxScore} ({cat.percentage}%)</span>
                        </div>
                        <div className="ar-cat-bar-track">
                          <div
                            className="ar-cat-bar-fill"
                            style={{ width: `${cat.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Question-by-Question Detailed Review Table */}
              <div className="ar-report-questions-section">
                <h4>All Questions & Selected Answers Breakdown</h4>
                <div className="ar-q-table-wrapper">
                  <table className="ar-q-table">
                    <thead>
                      <tr>
                        <th style={{ width: '40px' }}>#</th>
                        <th>Question Statement</th>
                        <th style={{ width: '130px' }}>Scoring Mode</th>
                        <th style={{ width: '170px' }}>Category</th>
                        <th style={{ width: '170px' }}>User Selected Option</th>
                        <th style={{ width: '90px' }}>Marks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedReport.responses && selectedReport.responses.map((resp, i) => {
                        const opt = resp.selectedOption || '';
                        const marks = resp.marksObtained;
                        const scoringType = getQuestionScoringType(resp);
                        const isReverse = scoringType === 'Reverse';

                        let badgeClass = 'neutral';
                        if (marks === 5) badgeClass = 'strongly-disagree';
                        else if (marks === 4) badgeClass = 'disagree';
                        else if (marks === 3) badgeClass = 'neutral';
                        else if (marks === 2) badgeClass = 'agree';
                        else if (marks === 1) badgeClass = 'strongly-agree';

                        return (
                          <tr key={i}>
                            <td className="ar-q-num">{i + 1}</td>
                            <td className="ar-q-statement">{resp.questionText}</td>
                            <td>
                              <span className={`ar-scoring-tag ${isReverse ? 'reverse' : 'normal'}`}>
                                <span className="ar-scoring-dot" />
                                {scoringType} ({isReverse ? '5→1' : '1→5'})
                              </span>
                            </td>
                            <td>
                              <span className="ar-q-cat-tag">{resp.category || 'General'}</span>
                            </td>
                            <td>
                              <span className={`ar-opt-badge ${badgeClass}`}>
                                {opt || 'Not Selected'}
                              </span>
                            </td>
                            <td className="ar-marks-cell">
                              <span className="ar-marks-pill">{marks} Marks</span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Report Footer / Signature */}
              <div className="ar-report-footer print-only">
                <div className="ar-footer-left">
                  <span>CareersDream Psychometric Assessment Engine</span>
                  <small>Generated automatically on submission</small>
                </div>
                <div className="ar-footer-right">
                  <span>Authorized Signature / System Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Delete Confirmation Popup */}
      {confirmDeleteId && (
        <div className="ar-confirm-overlay">
          <div className="ar-confirm-card">
            <div className="ar-confirm-icon-wrap">
              <AlertTriangle size={32} />
            </div>
            <h3 className="ar-confirm-title">Delete Test Report?</h3>
            <p className="ar-confirm-desc">
              This action is permanent and cannot be undone. The student's entire assessment data, scores, and responses will be permanently removed.
            </p>
            <div className="ar-confirm-actions">
              <button
                className="ar-confirm-btn ar-confirm-cancel"
                onClick={() => setConfirmDeleteId(null)}
              >
                <X size={15} />
                <span>Cancel</span>
              </button>
              <button
                className="ar-confirm-btn ar-confirm-delete"
                onClick={() => {
                  handleDelete(confirmDeleteId);
                  setConfirmDeleteId(null);
                }}
              >
                <Trash2 size={15} />
                <span>Yes, Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReports;
