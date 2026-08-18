import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Brain, 
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Award,
  Download,
  Sparkles,
  Trophy
} from 'lucide-react';
import './assessment1.css';

const questionsData = [
  // Section A: Aptitude
  {
    id: 1,
    category: "Section A: Aptitude",
    question: "If a train travels 60 km in 1 hour, how far will it travel in 3.5 hours?",
    options: [
      "A) 180 km",
      "B) 210 km",
      "C) 240 km",
      "D) 150 km"
    ],
    correctAnswer: 1, // B) 210 km
    explanation: "Distance = Speed × Time = 60 km/h × 3.5 hours = 210 km."
  },
  {
    id: 2,
    category: "Section A: Aptitude",
    question: "Find the next number in the series:\n3, 6, 12, 24, ?",
    options: [
      "A) 36",
      "B) 42",
      "C) 48",
      "D) 60"
    ],
    correctAnswer: 2, // C) 48
    explanation: "The series doubles each preceding number (multiplied by 2): 24 × 2 = 48."
  },
  {
    id: 3,
    category: "Section A: Aptitude",
    question: "If APPLE = 50 and each letter has its alphabetical value (A=1, B=2...), what is the value of DOG?",
    options: [
      "A) 24",
      "B) 26",
      "C) 28",
      "D) 30"
    ],
    correctAnswer: 1, // B) 26
    explanation: "Alphabetical values: D = 4, O = 15, G = 7. Total sum = 4 + 15 + 7 = 26."
  },
  {
    id: 4,
    category: "Section A: Aptitude",
    question: "A shopkeeper gives a 10% discount on a ₹500 item. What is the final price?",
    options: [
      "A) ₹400",
      "B) ₹450",
      "C) ₹475",
      "D) ₹490"
    ],
    correctAnswer: 1, // B) ₹450
    explanation: "Discount amount = 10% of ₹500 = ₹50. Final price = ₹500 - ₹50 = ₹450."
  },
  {
    id: 5,
    category: "Section A: Aptitude",
    question: "Which figure is different from the others?",
    options: [
      "A) Circle",
      "B) Triangle",
      "C) Square",
      "D) Cube"
    ],
    correctAnswer: 3, // D) Cube
    explanation: "Cube is a 3D (three-dimensional) shape, while Circle, Triangle, and Square are 2D shapes."
  },

  // Section B: English
  {
    id: 6,
    category: "Section B: English",
    question: "Choose the correct word:\nShe ____ to school every day.",
    options: [
      "A) go",
      "B) goes",
      "C) going",
      "D) gone"
    ],
    correctAnswer: 1, // B) goes
    explanation: "'She' is a third-person singular subject, requiring the verb form 'goes' in simple present tense."
  },
  {
    id: 7,
    category: "Section B: English",
    question: "Choose the synonym of Brave:",
    options: [
      "A) Coward",
      "B) Fearless",
      "C) Weak",
      "D) Lazy"
    ],
    correctAnswer: 1, // B) Fearless
    explanation: "'Fearless' means feeling or showing no fear, which is synonymous with 'Brave'."
  },
  {
    id: 8,
    category: "Section B: English",
    question: "Choose the correct spelling:",
    options: [
      "A) Recieve",
      "B) Receive",
      "C) Receeve",
      "D) Receve"
    ],
    correctAnswer: 1, // B) Receive
    explanation: "The correct spelling is 'Receive'."
  },
  {
    id: 9,
    category: "Section B: English",
    question: "Fill in the blank:\nThe meeting starts ____ 10:00 AM.",
    options: [
      "A) in",
      "B) on",
      "C) at",
      "D) by"
    ],
    correctAnswer: 2, // C) at
    explanation: "The preposition 'at' is used to denote specific times on the clock."
  },
  {
    id: 10,
    category: "Section B: English",
    question: "Choose the opposite of Success:",
    options: [
      "A) Achievement",
      "B) Victory",
      "C) Failure",
      "D) Progress"
    ],
    correctAnswer: 2, // C) Failure
    explanation: "'Failure' is the direct antonym (opposite) of 'Success'."
  },

  // Section C: Mathematics
  {
    id: 11,
    category: "Section C: Mathematics",
    question: "What is 25 × 8?",
    options: [
      "A) 180",
      "B) 190",
      "C) 200",
      "D) 220"
    ],
    correctAnswer: 2, // C) 200
    explanation: "25 multiplied by 8 equals 200."
  },
  {
    id: 12,
    category: "Section C: Mathematics",
    question: "Solve:\n144 ÷ 12 = ?",
    options: [
      "A) 10",
      "B) 11",
      "C) 12",
      "D) 14"
    ],
    correctAnswer: 2, // C) 12
    explanation: "144 divided by 12 equals 12."
  },
  {
    id: 13,
    category: "Section C: Mathematics",
    question: "What is 15% of 200?",
    options: [
      "A) 20",
      "B) 25",
      "C) 30",
      "D) 35"
    ],
    correctAnswer: 2, // C) 30
    explanation: "(15 / 100) × 200 = 15 × 2 = 30."
  },
  {
    id: 14,
    category: "Section C: Mathematics",
    question: "A rectangle has length 10 cm and width 6 cm. What is its area?",
    options: [
      "A) 16 cm²",
      "B) 60 cm²",
      "C) 32 cm²",
      "D) 120 cm²"
    ],
    correctAnswer: 1, // B) 60 cm²
    explanation: "Area of a rectangle = length × width = 10 cm × 6 cm = 60 cm²."
  },
  {
    id: 15,
    category: "Section C: Mathematics",
    question: "Solve:\n7² + 3² = ?",
    options: [
      "A) 52",
      "B) 58",
      "C) 60",
      "D) 64"
    ],
    correctAnswer: 1, // B) 58
    explanation: "7² = 49 and 3² = 9. 49 + 9 = 58."
  },

  // Section D: Hindi
  {
    id: 16,
    category: "Section D: Hindi",
    question: "'साहसी' का समानार्थी शब्द क्या है?",
    options: [
      "A) डरपोक",
      "B) वीर",
      "C) आलसी",
      "D) क्रोधित"
    ],
    correctAnswer: 1, // B) वीर
    explanation: "'साहसी' (बहादुर) का समानार्थी शब्द 'वीर' है।"
  },
  {
    id: 17,
    category: "Section D: Hindi",
    question: "'कम' का विलोम शब्द क्या है?",
    options: [
      "A) अधिक",
      "B) छोटा",
      "C) दूर",
      "D) हल्का"
    ],
    correctAnswer: 0, // A) अधिक
    explanation: "'कम' का विपरीत (विलोम) शब्द 'अधिक' होता है।"
  },
  {
    id: 18,
    category: "Section D: Hindi",
    question: "सही वर्तनी चुनिए:",
    options: [
      "A) विद्यालय",
      "B) विध्यालय",
      "C) विदयालय",
      "D) विधयालय"
    ],
    correctAnswer: 0, // A) विद्यालय
    explanation: "'विद्यालय' शुद्ध रूप (सही वर्तनी) है।"
  },
  {
    id: 19,
    category: "Section D: Hindi",
    question: "'राम स्कूल जाता है।' इस वाक्य में कर्ता कौन है?",
    options: [
      "A) स्कूल",
      "B) जाता",
      "C) राम",
      "D) है"
    ],
    correctAnswer: 2, // C) राम
    explanation: "वाक्य में कार्य (स्कूल जाना) करने वाला 'राम' है, इसलिए 'राम' कर्ता है।"
  },
  {
    id: 20,
    category: "Section D: Hindi",
    question: "'जल' का पर्यायवाची शब्द क्या है?",
    options: [
      "A) अग्नि",
      "B) वायु",
      "C) नीर",
      "D) पृथ्वी"
    ],
    correctAnswer: 2, // C) नीर
    explanation: "'जल' का पर्यायवाची शब्द 'नीर' है।"
  }
];

const Assessment1 = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const totalQuestions = questionsData.length;
  const currentQ = questionsData[currentIdx];

  const handleSelectOption = (questionId, optionIndex) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const isCurrentAnswered = userAnswers[currentQ.id] !== undefined;

  const handleNext = () => {
    if (!isCurrentAnswered) return;
    if (currentIdx < totalQuestions - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
    }
  };

  const calculateScore = () => {
    let score = 0;
    questionsData.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) {
        score += 1;
      }
    });
    return score;
  };

  const getSectionBreakdown = () => {
    const categories = ["Section A: Aptitude", "Section B: English", "Section C: Mathematics", "Section D: Hindi"];
    return categories.map((cat) => {
      const questionsInCat = questionsData.filter((q) => q.category === cat);
      const correctCount = questionsInCat.filter((q) => userAnswers[q.id] === q.correctAnswer).length;
      return {
        name: cat.replace(/^Section\s+[A-D]:\s*/, ''),
        fullName: cat,
        correct: correctCount,
        total: questionsInCat.length
      };
    });
  };

  const handleDownloadReport = () => {
    window.print();
  };

  const handleReset = () => {
    setUserAnswers({});
    setShowResults(false);
    setCurrentIdx(0);
  };

  const score = calculateScore();
  const answeredCount = Object.keys(userAnswers).length;

  const chunkArray = (arr, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const questionPages = chunkArray(questionsData, 5);

  return (
    <div className="assessment1-page">
      <section className="assessment1-section container">
        {/* Hero Header Banner */}
        {!showResults && (
          <div className="personality-hero-banner hide-on-print" style={{marginBottom: '0.75rem'}}>
            <div className="hero-banner-badge">
              <Brain size={32} />
            </div>
            <div className="hero-banner-text">
              <h2>Psychometric & Aptitude Assessment Test</h2>
              <p>Evaluate your numerical reasoning, quantitative logic, and problem-solving skills</p>
            </div>
          </div>
        )}

        {/* Quiz Header Progress Bar */}
        {!showResults && (
          <div className="quiz-status-bar hide-on-print" style={{marginBottom: '0.75rem'}}>
            <div className="status-item">
              <span className="status-label">Progress:</span>
              <span className="status-value">{answeredCount} of {totalQuestions} Answered</span>
            </div>
          </div>
        )}

        {!showResults ? (
          /* Single Active Question Card View */
          <div className="single-question-wrapper">
            <div className="question-card">
              <div className="question-card-header mb-3">
                <span className="question-number-badge">Question {currentIdx + 1} of {totalQuestions}</span>
                <span className="question-category-tag">{currentQ.category || "Aptitude Evaluator"}</span>
              </div>

              <h3 className="question-text mb-4" style={{ whiteSpace: 'pre-line' }}>{currentQ.question}</h3>

              <div className="options-vertical-list">
                {currentQ.options.map((opt, optIdx) => {
                  const isSelected = userAnswers[currentQ.id] === optIdx;
                  const letterBadge = ['A', 'B', 'C', 'D'][optIdx];
                  const optionText = opt.replace(/^[A-D][\.\)]\s*/, '');

                  return (
                    <button
                      key={optIdx}
                      className={`option-row-button ${isSelected ? 'option-selected' : ''}`}
                      onClick={() => handleSelectOption(currentQ.id, optIdx)}
                    >
                      <div className="option-left-group">
                        <div className="option-letter-badge">{letterBadge}</div>
                        <span className="option-label-text">{optionText}</span>
                      </div>
                      <div className="option-radio-right">
                        {isSelected && <span className="radio-dot-inner" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Next / Previous Navigation Controls */}
            <div className="quiz-nav-controls mt-6">
              <button
                className="btn-quiz-nav btn-prev"
                onClick={handlePrev}
                disabled={currentIdx === 0}
              >
                <ArrowLeft size={18} />
                <span>Previous</span>
              </button>

              <button
                className="btn-quiz-nav btn-next"
                onClick={handleNext}
                disabled={!isCurrentAnswered}
              >
                <span>{currentIdx === totalQuestions - 1 ? 'Submit Test' : 'Next'}</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        ) : (
          /* Results View: Celebration Header on Screen + PDF Print Report */
          <div className="results-wrapper">
            {/* Celebration Congratulations Card (Screen View) */}
            <div className="congratulations-card mb-6 hide-on-print">
              <div className="confetti-backdrop">
                <span className="confetti-dot dot-1" />
                <span className="confetti-dot dot-2" />
                <span className="confetti-dot dot-3" />
                <span className="confetti-dot dot-4" />
                <span className="confetti-dot dot-5" />
                <span className="confetti-dot dot-6" />
                <span className="confetti-ribbon ribbon-1" />
                <span className="confetti-ribbon ribbon-2" />
              </div>

              <div className="congratulations-body">
                <div className="trophy-circle">
                  <Trophy size={48} className="icon-trophy" />
                  <Sparkles size={24} className="icon-sparkles" />
                </div>

                <h2 className="congratulations-title">Congratulations! 🎉</h2>
                <p className="congratulations-subtitle">
                  You have completed your Psychometric & Aptitude Assessment Test.
                </p>

                <div className="score-main-display">
                  <div className="score-big-text">
                    <span className="score-val">{score}</span>
                    <span className="score-max">/ {totalQuestions}</span>
                  </div>
                  <span className="score-badge-pill">
                    {Math.round((score / totalQuestions) * 100)}% Score Achieved
                  </span>
                </div>

                {/* Section Breakdown Grid */}
                <div className="section-breakdown-grid">
                  {getSectionBreakdown().map((sec, idx) => (
                    <div key={idx} className="sec-breakdown-item">
                      <span className="sec-title">{sec.name}</span>
                      <span className="sec-score">{sec.correct} / {sec.total}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="results-actions-bar hide-on-print">
                  <button className="btn-action btn-download-report" onClick={handleDownloadReport}>
                    <Download size={18} />
                    <span>Download Test Report</span>
                  </button>
                  <button className="btn-action btn-retake-test" onClick={handleReset}>
                    <RotateCcw size={18} />
                    <span>Retake Assessment</span>
                  </button>
                </div>
              </div>
            </div>

            {/* PDF Print-Only Review Section (5 questions per page, only answers) */}
            <div className="pdf-review-section print-only">
              {questionPages.map((pageQuestions, pageIdx) => (
                <div key={pageIdx} className="pdf-page">
                  {pageIdx === 0 && (
                    <div className="pdf-report-header mb-4">
                      <div className="pdf-title-row flex justify-between items-center mb-2">
                        <h2>Psychometric & Aptitude Assessment Report</h2>
                        <span className="pdf-date-tag">{new Date().toLocaleDateString('en-GB')}</span>
                      </div>
                      <div className="pdf-summary-banner">
                        <div className="pdf-summary-score">
                          Overall Score: <strong>{score} / {totalQuestions}</strong> ({Math.round((score / totalQuestions) * 100)}%)
                        </div>
                        <div className="pdf-sec-breakdown">
                          {getSectionBreakdown().map((sec, idx) => (
                            <span key={idx} className="pdf-sec-pill">
                              {sec.name}: {sec.correct}/{sec.total}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="pdf-page-top-bar">
                    <span>Question Review (Questions {pageIdx * 5 + 1} - {Math.min((pageIdx + 1) * 5, totalQuestions)})</span>
                    <span>Page {pageIdx + 1} of {questionPages.length}</span>
                  </div>

                  <div className="pdf-questions-list">
                    {pageQuestions.map((q, qIndexOnPage) => {
                      const globalIdx = pageIdx * 5 + qIndexOnPage;
                      const selectedOpt = userAnswers[q.id];
                      const isCorrect = selectedOpt === q.correctAnswer;
                      const userAnsText = selectedOpt !== undefined ? q.options[selectedOpt] : 'Not Answered';
                      const correctAnsText = q.options[q.correctAnswer];

                      return (
                        <div key={q.id} className="pdf-question-item">
                          <div className="pdf-q-header flex justify-between items-center">
                            <span className="pdf-q-num">Q{globalIdx + 1}. {q.category}</span>
                            <span className={`pdf-status-badge ${isCorrect ? 'status-correct' : 'status-incorrect'}`}>
                              {isCorrect ? 'Correct' : 'Incorrect'}
                            </span>
                          </div>
                          <div className="pdf-q-text">{q.question}</div>
                          <div className="pdf-q-ans-box">
                            <div className="pdf-ans-row">
                              <span className="pdf-label">Your Answer:</span>
                              <span className={`pdf-val ${isCorrect ? 'text-correct' : 'text-incorrect'}`}>
                                {userAnsText}
                              </span>
                            </div>
                            {!isCorrect && (
                              <div className="pdf-ans-row">
                                <span className="pdf-label">Correct Answer:</span>
                                <span className="pdf-val text-correct">{correctAnsText}</span>
                              </div>
                            )}
                            {q.explanation && (
                              <div className="pdf-explanation">
                                <strong>Solution:</strong> {q.explanation}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Bottom CTA Banner */}
      <section className="cta section-padding text-center hide-on-print">
        <div className="container">
          <h2 className="heading-secondary">Ready to Unlock Your True Potential?</h2>
          <p className="subheading">
            Join thousands of successful students who found their ideal career direction with CareersDream.
          </p>
          <div className="hero-buttons justify-center">
            <Link to="/contactus" className="btn btn-primary btn-lg">
              Book Free Career Counseling
            </Link>
            <Link to="/courses" className="btn btn-secondary btn-lg">
              Explore Guidance Programs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Assessment1;
