import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Brain, ArrowLeft, ArrowRight, CheckCircle2, Sparkles, Trophy,
  RotateCcw, Download, UserCheck, Shield, Award, HelpCircle,
  Clock, CheckCircle, BarChart3, ChevronRight, User, Mail, Phone, Lock
} from 'lucide-react';
import './personalitytest.css';

const API_URL = import.meta.env.VITE_API_URL || 'https://careersdream-backend.onrender.com';

// Dynamic options generator based on question config (Normal: 1->5, Reverse: 5->1)
const getQuestionOptions = (question) => {
  const letters = ['A', 'B', 'C', 'D', 'E'];
  if (question && question.options && Array.isArray(question.options) && question.options.length === 5) {
    return question.options.map((opt, i) => ({
      letter: letters[i] || `${i + 1}`,
      label: opt.label,
      marks: opt.marks,
      tag: `${opt.marks} Mark${opt.marks !== 1 ? 's' : ''}`
    }));
  }
  const isReverse = question && (question.scoringType === 'Reverse' || (question.options && question.options[0]?.marks === 5));
  const marksList = isReverse ? [5, 4, 3, 2, 1] : [1, 2, 3, 4, 5];
  const standardLabels = ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'];
  return standardLabels.map((lbl, idx) => ({
    letter: letters[idx],
    label: lbl,
    marks: marksList[idx],
    tag: `${marksList[idx]} Mark${marksList[idx] !== 1 ? 's' : ''}`
  }));
};

// Fallback questions in case of network delay
const DEFAULT_FALLBACK_QUESTIONS = [
  {
    _id: 'q1',
    question: 'I prefer working independently and taking full responsibility for complex project decisions.',
    category: 'Work Autonomy & Leadership',
    scoringType: 'Normal',
    options: [
      { label: 'Strongly Disagree', marks: 1 },
      { label: 'Disagree', marks: 2 },
      { label: 'Neutral', marks: 3 },
      { label: 'Agree', marks: 4 },
      { label: 'Strongly Agree', marks: 5 }
    ],
    order: 1
  },
  {
    _id: 'q2',
    question: 'I actively seek out intellectually challenging tasks even when no immediate guidance is provided.',
    category: 'Critical Thinking & Problem Solving',
    scoringType: 'Normal',
    options: [
      { label: 'Strongly Disagree', marks: 1 },
      { label: 'Disagree', marks: 2 },
      { label: 'Neutral', marks: 3 },
      { label: 'Agree', marks: 4 },
      { label: 'Strongly Agree', marks: 5 }
    ],
    order: 2
  },
  {
    _id: 'q3',
    question: 'I find it easy to adapt to sudden changes in strategy, environment, or project scope.',
    category: 'Adaptability & Resilience',
    scoringType: 'Normal',
    options: [
      { label: 'Strongly Disagree', marks: 1 },
      { label: 'Disagree', marks: 2 },
      { label: 'Neutral', marks: 3 },
      { label: 'Agree', marks: 4 },
      { label: 'Strongly Agree', marks: 5 }
    ],
    order: 3
  },
  {
    _id: 'q4',
    question: 'I prefer structured, clearly defined rules over open-ended, ambiguous assignments.',
    category: 'Work Structure & Discipline',
    scoringType: 'Normal',
    options: [
      { label: 'Strongly Disagree', marks: 1 },
      { label: 'Disagree', marks: 2 },
      { label: 'Neutral', marks: 3 },
      { label: 'Agree', marks: 4 },
      { label: 'Strongly Agree', marks: 5 }
    ],
    order: 4
  },
  {
    _id: 'q5',
    question: 'I feel energized when collaborating and brainstorming in large group environments.',
    category: 'Interpersonal Communication',
    scoringType: 'Normal',
    options: [
      { label: 'Strongly Disagree', marks: 1 },
      { label: 'Disagree', marks: 2 },
      { label: 'Neutral', marks: 3 },
      { label: 'Agree', marks: 4 },
      { label: 'Strongly Agree', marks: 5 }
    ],
    order: 5
  },
  {
    _id: 'q6',
    question: 'I thoroughly analyze data and evidence before making any major conclusion.',
    category: 'Analytical Orientation',
    scoringType: 'Normal',
    options: [
      { label: 'Strongly Disagree', marks: 1 },
      { label: 'Disagree', marks: 2 },
      { label: 'Neutral', marks: 3 },
      { label: 'Agree', marks: 4 },
      { label: 'Strongly Agree', marks: 5 }
    ],
    order: 6
  },
  {
    _id: 'q7',
    question: 'I stay calm and maintain clear focus when working under high-pressure deadlines.',
    category: 'Emotional Stability & Stress Management',
    scoringType: 'Normal',
    options: [
      { label: 'Strongly Disagree', marks: 1 },
      { label: 'Disagree', marks: 2 },
      { label: 'Neutral', marks: 3 },
      { label: 'Agree', marks: 4 },
      { label: 'Strongly Agree', marks: 5 }
    ],
    order: 7
  },
  {
    _id: 'q8',
    question: 'I enjoy mentoring others and helping team members overcome learning hurdles.',
    category: 'Empathy & Mentorship',
    scoringType: 'Normal',
    options: [
      { label: 'Strongly Disagree', marks: 1 },
      { label: 'Disagree', marks: 2 },
      { label: 'Neutral', marks: 3 },
      { label: 'Agree', marks: 4 },
      { label: 'Strongly Agree', marks: 5 }
    ],
    order: 8
  },
  {
    _id: 'q9',
    question: 'I frequently look for innovative, out-of-the-box approaches to solve everyday problems.',
    category: 'Innovation & Creativity',
    scoringType: 'Normal',
    options: [
      { label: 'Strongly Disagree', marks: 1 },
      { label: 'Disagree', marks: 2 },
      { label: 'Neutral', marks: 3 },
      { label: 'Agree', marks: 4 },
      { label: 'Strongly Agree', marks: 5 }
    ],
    order: 9
  },
  {
    _id: 'q10',
    question: 'I prioritize meticulous attention to detail over rapid speed of execution.',
    category: 'Quality & Precision',
    scoringType: 'Normal',
    options: [
      { label: 'Strongly Disagree', marks: 1 },
      { label: 'Disagree', marks: 2 },
      { label: 'Neutral', marks: 3 },
      { label: 'Agree', marks: 4 },
      { label: 'Strongly Agree', marks: 5 }
    ],
    order: 10
  }
];

// Returns score level info based on total score
const getScoreLevel = (score) => {
  if (score >= 23) return { label: 'High', desc: 'A clear personal strength.', color: 'high' };
  if (score >= 14) return { label: 'Moderate', desc: 'Balanced — the student adapts depending on the situation.', color: 'moderate' };
  return { label: 'Low', desc: 'This is a developing area; targeted support may help.', color: 'low' };
};

const PersonalityTest = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('token'));
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [alreadyAttempted, setAlreadyAttempted] = useState(false);

  // User details state (auto-populated from logged-in session)
  const [userDetails, setUserDetails] = useState({
    name: localStorage.getItem('userName') || '',
    email: localStorage.getItem('userEmail') || '',
    phone: ''
  });

  // Check if current user email has already completed this assessment
  const checkPreviousSubmission = async (email) => {
    if (!email) return;
    try {
      const res = await fetch(`${API_URL}/api/test/check/${encodeURIComponent(email)}`);
      const data = await res.json();
      if (res.ok && data.hasTakenTest && data.data) {
        setSubmissionResult(data.data);
        setAlreadyAttempted(true);
        setShowResults(true);
      }
    } catch (err) {
      console.warn('Error checking prior test submission:', err);
    }
  };

  // Fetch dynamic questions from backend
  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/questions`);
      const data = await res.json();
      if (res.ok && data.data && data.data.length > 0) {
        setQuestions(data.data);
      } else {
        try {
          const seedRes = await fetch(`${API_URL}/api/questions/seed`, { method: 'POST' });
          const seedData = await seedRes.json();
          if (seedRes.ok && seedData.data && seedData.data.length > 0) {
            setQuestions(seedData.data);
            return;
          }
        } catch (e) {
          // ignore
        }
        setQuestions(DEFAULT_FALLBACK_QUESTIONS);
      }
    } catch (err) {
      console.warn('API error, using default questions:', err);
      setQuestions(DEFAULT_FALLBACK_QUESTIONS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
    const token = localStorage.getItem('token');
    const storedName = localStorage.getItem('userName');
    const storedEmail = localStorage.getItem('userEmail');
    setIsLoggedIn(!!token);

    if (storedName || storedEmail) {
      setUserDetails(prev => ({
        ...prev,
        name: storedName || prev.name,
        email: storedEmail || prev.email
      }));
      if (storedEmail) {
        checkPreviousSubmission(storedEmail);
      }
    }

    if (token) {
      fetch(`${API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          if (data.data) {
            const freshEmail = data.data.email || storedEmail || '';
            setUserDetails({
              name: data.data.name || storedName || 'Candidate',
              email: freshEmail,
              phone: data.data.phone || ''
            });
            if (freshEmail) {
              checkPreviousSubmission(freshEmail);
            }
          }
        })
        .catch(() => {});
    }
  }, []);

  const totalQuestions = questions.length;
  const currentQ = questions[currentIdx] || {};
  const currentQId = currentQ._id || `q-${currentIdx}`;
  const isCurrentAnswered = userAnswers[currentQId] !== undefined;

  const handleSelectOption = (option) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentQId]: {
        questionId: currentQ._id,
        questionText: currentQ.question,
        category: currentQ.category || 'General Personality',
        selectedOption: option.label,
        marksObtained: option.marks
      }
    }));
  };

  const handleNext = () => {
    if (!isCurrentAnswered) return;
    if (currentIdx < totalQuestions - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      submitAssessment();
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(prev => prev - 1);
    }
  };

  const submitAssessment = async () => {
    setSubmitting(true);

    const responsesArray = questions.map(q => {
      const qId = q._id || `q-${questions.indexOf(q)}`;
      const ans = userAnswers[qId];
      return {
        questionId: q._id,
        questionText: q.question,
        category: q.category || 'General Personality',
        selectedOption: ans ? ans.selectedOption : 'Neutral',
        marksObtained: ans ? ans.marksObtained : 3
      };
    });

    const payload = {
      userName: userDetails.name.trim() || localStorage.getItem('userName') || 'Candidate',
      userEmail: userDetails.email.trim() || localStorage.getItem('userEmail') || 'student@careersdream.com',
      userPhone: userDetails.phone.trim() || '',
      responses: responsesArray
    };

    try {
      const token = localStorage.getItem('token');
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`${API_URL}/api/test/submit`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok && data.data) {
        setSubmissionResult(data.data);
        setAlreadyAttempted(true);
      } else if (data.alreadyTaken && data.data) {
        setSubmissionResult(data.data);
        setAlreadyAttempted(true);
      } else {
        const localTotal = responsesArray.reduce((acc, curr) => acc + curr.marksObtained, 0);
        const localMax = responsesArray.length * 5;
        const localPct = Math.round((localTotal / localMax) * 100);
        setSubmissionResult({
          userName: payload.userName,
          userEmail: payload.userEmail,
          responses: responsesArray,
          totalScore: localTotal,
          maxScore: localMax,
          percentage: localPct,
          summary: 'Assessment completed. Your individual trait and response marks have been evaluated.',
          createdAt: new Date().toISOString()
        });
        setAlreadyAttempted(true);
      }
    } catch (err) {
      console.warn('Submission network issue, displaying local evaluation:', err);
      const localTotal = responsesArray.reduce((acc, curr) => acc + curr.marksObtained, 0);
      const localMax = responsesArray.length * 5;
      setSubmissionResult({
        userName: payload.userName,
        userEmail: payload.userEmail,
        responses: responsesArray,
        totalScore: localTotal,
        maxScore: localMax,
        percentage: Math.round((localTotal / localMax) * 100),
        summary: 'Assessment completed. Your individual trait and response marks have been evaluated.',
        createdAt: new Date().toISOString()
      });
      setAlreadyAttempted(true);
    } finally {
      setSubmitting(false);
      setShowResults(true);
    }
  };

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="personalitytest-page">
      <section className="personalitytest-section container">
        {/* Top Hero Banner in Warm Golden Yellow Gradient */}
        {!showResults && isLoggedIn && (
          <div className="personality-hero-banner hide-on-print" style={{ marginBottom: '0.9rem' }}>
            <div className="hero-banner-badge">
              <Brain size={25} />
            </div>
            <div className="hero-banner-text">
              <h2>Psychometric & Personality Assessment Test</h2>
              <p>Evaluate your behavioral traits, cognitive orientation, and personal strengths profile</p>
            </div>
          </div>
        )}

        {/* Auth Required View if User Not Logged In */}
        {!isLoggedIn ? (
          <div className="auth-required-wrapper">
            <div className="auth-required-card">
              <div className="auth-lock-circle">
                <Lock size={44} className="icon-lock" />
              </div>
              <h2 className="auth-required-title">Login or Register Required</h2>
              <p className="auth-required-desc">
                Please log in to your CareersDream account or register a new account before taking the Psychometric & Personality Assessment Test.
              </p>
              <div className="auth-required-buttons">
                <Link to="/login" className="btn-auth btn-auth-login">
                  <UserCheck size={18} />
                  <span>Log In to Account</span>
                </Link>
                <Link to="/register" className="btn-auth btn-auth-register">
                  <Sparkles size={18} />
                  <span>Register New Account</span>
                </Link>
              </div>
            </div>
          </div>
        ) : loading ? (
          /* Loading Spinner */
          <div className="question-card" style={{ textAlign: 'center', padding: '3.5rem 1rem' }}>
            <div className="pt-loading-spinner" />
            <p style={{ marginTop: '1rem', color: '#64748b', fontWeight: 600 }}>Loading assessment...</p>
          </div>
        ) : !showResults ? (
          /* Active Question Card View */
          <div className="single-question-wrapper hide-on-print">
            {/* Progress Status Bar */}
            <div className="quiz-status-bar">
              <div className="status-item">
                <span className="status-label">Progress:</span>
                <span className="status-value">{Object.keys(userAnswers).length} of {totalQuestions} Answered</span>
              </div>
            </div>

            <div className="question-card">
              <div className="question-card-header">
                <span className="question-number-badge">Question {currentIdx + 1} of {totalQuestions}</span>
                {currentQ.category && (
                  <span className="question-category-tag">{currentQ.category}</span>
                )}
              </div>

              <h3 className="question-text" style={{ whiteSpace: 'pre-line' }}>{currentQ.question}</h3>

              <div className="options-vertical-list">
                {getQuestionOptions(currentQ).map((opt, optIdx) => {
                  const isSelected = userAnswers[currentQId]?.selectedOption === opt.label;

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      className={`option-row-button ${isSelected ? 'option-selected' : ''}`}
                      onClick={() => handleSelectOption(opt)}
                    >
                      <div className="option-left-group">
                        <div className="option-letter-badge">{opt.letter}</div>
                        <span className="option-label-text">{opt.label}</span>
                      </div>
                      <div className="option-radio-right">
                        {isSelected && <span className="radio-dot-inner" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="quiz-nav-controls">
              <button
                className="btn-quiz-nav btn-prev"
                onClick={handlePrev}
                disabled={currentIdx === 0}
              >
                <ArrowLeft size={17} />
                <span>Previous</span>
              </button>

              <button
                className={`btn-quiz-nav btn-next ${currentIdx === totalQuestions - 1 ? 'btn-submit-action' : ''}`}
                onClick={handleNext}
                disabled={!isCurrentAnswered || submitting}
              >
                <span>{currentIdx === totalQuestions - 1 ? (submitting ? 'Submitting...' : 'Submit Test') : 'Next'}</span>
                <ArrowRight size={17} />
              </button>
            </div>
          </div>
        ) : (
          /* Results View */
          <div className="results-wrapper">
            {/* Screen Congratulations / Completed Card */}
            <div className="congratulations-card mb-6 hide-on-print">
              <div className="congratulations-body">
                <div className="trophy-circle">
                  <Trophy size={46} className="icon-trophy" />
                  <Sparkles size={24} className="icon-sparkles" />
                </div>

                <h2 className="congratulations-title">
                  {alreadyAttempted ? 'Assessment Completed' : 'Congratulations! 🎉'}
                </h2>
                <p className="congratulations-subtitle">
                  {alreadyAttempted 
                    ? `You have already completed your Psychometric & Personality Assessment Test.`
                    : `You have completed your Psychometric & Personality Assessment Test.`
                  }
                </p>

                {/* Single attempt notice */}
                <div className="pt-single-attempt-alert">
                  <Shield size={20} style={{ flexShrink: 0 }} />
                  <span>
                    <strong>Note:</strong> A student can take this test only once using one email ID ({userDetails.email || submissionResult?.userEmail}).
                  </span>
                </div>

                <div className="score-main-display">
                  <div className="score-big-text">
                    <span className="score-val">{submissionResult?.totalScore}</span>
                    <span className="score-max">/ {submissionResult?.maxScore}</span>
                  </div>
                  <div className="score-level-row">
                    {submissionResult?.totalScore != null && (() => {
                      const lvl = getScoreLevel(submissionResult.totalScore);
                      return (
                        <span className={`score-level-badge score-level-${lvl.color}`}>
                          {lvl.label}
                        </span>
                      );
                    })()}
                    <span className="score-badge-pill">
                      {submissionResult?.percentage}% Score Achieved
                    </span>
                  </div>
                </div>

                {/* Score Level Achievement Card - Only shows achieved level */}
                {submissionResult?.totalScore != null && (() => {
                  const lvl = getScoreLevel(submissionResult.totalScore);
                  const configs = {
                    high:     { icon: '🏆', gradient: 'linear-gradient(135deg, #022c22 0%, #064e3b 40%, #065f46 100%)', accent: '#6ee7b7', textColor: '#d1fae5', descColor: '#a7f3d0', rangeBg: 'rgba(255,255,255,0.1)', pillBg: 'rgba(110,231,183,0.18)', pillColor: '#6ee7b7', glowColor: 'rgba(16,185,129,0.45)', barColor: '#34d399' },
                    moderate: { icon: '⚡', gradient: 'linear-gradient(135deg, #1c0a00 0%, #451a03 40%, #78350f 100%)', accent: '#fcd34d', textColor: '#fef3c7', descColor: '#fde68a', rangeBg: 'rgba(255,255,255,0.08)', pillBg: 'rgba(252,211,77,0.18)', pillColor: '#fcd34d', glowColor: 'rgba(245,158,11,0.45)', barColor: '#f59e0b' },
                    low:      { icon: '🌱', gradient: 'linear-gradient(135deg, #0f0e2e 0%, #1e1b4b 40%, #312e81 100%)', accent: '#a5b4fc', textColor: '#e0e7ff', descColor: '#c7d2fe', rangeBg: 'rgba(255,255,255,0.08)', pillBg: 'rgba(165,180,252,0.18)', pillColor: '#a5b4fc', glowColor: 'rgba(99,102,241,0.45)', barColor: '#818cf8' },
                  };
                  const cfg = configs[lvl.color];
                  const rangeMap = { high: '23 – 30', moderate: '14 – 22', low: '6 – 13' };
                  const pct = submissionResult.maxScore ? Math.round((submissionResult.totalScore / submissionResult.maxScore) * 100) : 0;
                  return (
                    <div className="score-achievement-card" style={{ background: cfg.gradient, boxShadow: `0 16px 48px ${cfg.glowColor}` }}>
                      <div className="sac-glow" style={{ background: cfg.glowColor }} />
                      <div className="sac-top-row">
                        <div className="sac-icon-wrap">{cfg.icon}</div>
                        <div className="sac-badges">
                          <span className="sac-range-pill" style={{ background: cfg.rangeBg, color: cfg.accent, border: `1px solid ${cfg.accent}35` }}>
                            Score Range: {rangeMap[lvl.color]}
                          </span>
                          <span className="sac-yours-pill" style={{ background: cfg.pillBg, color: cfg.pillColor, border: `1px solid ${cfg.pillColor}45` }}>
                            ✦ Your Achievement
                          </span>
                        </div>
                      </div>
                      <div className="sac-level-name" style={{ color: cfg.accent }}>{lvl.label}</div>
                      <p className="sac-desc" style={{ color: cfg.descColor }}>{lvl.desc}</p>

                      {/* Score progress bar */}
                      <div className="sac-bar-wrap" style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '999px', height: '6px', marginBottom: '1.4rem', overflow: 'hidden', position: 'relative', zIndex: 1 }}>
                        <div style={{ height: '100%', width: `${pct}%`, background: cfg.barColor, borderRadius: '999px', boxShadow: `0 0 12px ${cfg.barColor}`, transition: 'width 1s ease' }} />
                      </div>

                      <div className="sac-divider" style={{ background: `${cfg.accent}25` }} />
                      <div className="sac-score-row">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                          <span className="sac-score-label" style={{ color: cfg.textColor }}>Your Score</span>
                          <span className="sac-score-val" style={{ color: cfg.accent }}>
                            {submissionResult.totalScore}
                            <span style={{ fontSize: '1.1rem', opacity: 0.55, fontWeight: 700 }}> / {submissionResult.maxScore}</span>
                          </span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.15rem' }}>
                          <span className="sac-score-label" style={{ color: cfg.textColor }}>Percentage</span>
                          <span className="sac-score-val" style={{ color: cfg.accent }}>{pct}<span style={{ fontSize: '1.1rem', opacity: 0.55, fontWeight: 700 }}>%</span></span>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* Insight Summary */}
                {submissionResult?.summary && (
                  <div className="pt-result-summary-box">
                    <h4>Behavioral Profile Evaluation</h4>
                    <p>{submissionResult.summary}</p>
                  </div>
                )}

                {/* Category Breakdown */}
                {submissionResult?.categoryBreakdown && submissionResult.categoryBreakdown.length > 0 && (
                  <div className="pt-cat-breakdown-list">
                    {submissionResult.categoryBreakdown.map((cat, i) => (
                      <div key={i} className="pt-cat-bar-card">
                        <div className="pt-cat-info-row">
                          <span className="pt-cat-name">{cat.category}</span>
                          <span className="pt-cat-marks">{cat.score} / {cat.maxScore} ({cat.percentage}%)</span>
                        </div>
                        <div className="pt-bar-track">
                          <div className="pt-bar-fill" style={{ width: `${cat.percentage}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="results-actions-bar hide-on-print">
                  <button className="btn-action btn-download-report" onClick={handlePrintReport}>
                    <Download size={18} />
                    <span>Download Test Report</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Printable Detailed Report Card (Print / PDF Download Only) */}
            <div className="pdf-review-section print-only">
              <div className="pdf-page">
                <div className="pdf-report-header mb-4">
                  <div className="pdf-title-row flex justify-between items-center mb-2">
                    <h2>Psychometric & Personality Assessment Report</h2>
                    <span className="pdf-date-tag">
                      {new Date(submissionResult?.createdAt || Date.now()).toLocaleDateString('en-GB')}
                    </span>
                  </div>
                  <div className="pdf-summary-banner">
                    <div className="pdf-summary-score">
                      Candidate: <strong>{submissionResult?.userName}</strong> ({submissionResult?.userEmail})
                    </div>
                    <div className="pdf-summary-score">
                      Overall Score: <strong>{submissionResult?.totalScore} / {submissionResult?.maxScore}</strong> ({submissionResult?.percentage}%)
                    </div>
                  </div>
                </div>

                <div className="pdf-questions-list">
                  {submissionResult?.responses?.map((item, idx) => (
                    <div key={idx} className="pdf-question-item">
                      <div className="pdf-q-header flex justify-between items-center">
                        <span className="pdf-q-num">Q{idx + 1}. {item.category}</span>
                        <span className="pdf-status-badge status-correct">
                          {item.marksObtained} Marks Awarded
                        </span>
                      </div>
                      <div className="pdf-q-text">{item.questionText}</div>
                      <div className="pdf-q-ans-box">
                        <div className="pdf-ans-row">
                          <span className="pdf-label">Selected Option:</span>
                          <span className="pdf-val text-correct">
                            {item.selectedOption} ({item.marksObtained} Marks)
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default PersonalityTest;

