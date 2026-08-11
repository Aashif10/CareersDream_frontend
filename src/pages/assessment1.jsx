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
  Award
} from 'lucide-react';
import './assessment1.css';

const questionsData = [
  {
    id: 1,
    question: "A shirt's price is increased by 20% and then decreased by 20%. What is the overall change in price?",
    options: [
      "A. No change",
      "B. 4% decrease",
      "C. 4% increase",
      "D. 2% decrease"
    ],
    correctAnswer: 1, // Index 1: B. 4% decrease
    explanation: "Let original price = 100. After 20% increase = 120. After 20% decrease on 120 = 120 - 24 = 96. Overall change = 4% decrease."
  },
  {
    id: 2,
    question: "A can complete a piece of work in 12 days, and B can complete the same work in 18 days. If they work together, in how many days will the work be completed?",
    options: [
      "A. 6.2 days",
      "B. 7.2 days",
      "C. 8 days",
      "D. 9 days"
    ],
    correctAnswer: 1, // Index 1: B. 7.2 days
    explanation: "Combined rate = 1/12 + 1/18 = 5/36 per day. Time required = 36/5 = 7.2 days."
  },
  {
    id: 3,
    question: "A shopkeeper buys an item for ₹800 and sells it for ₹920. What is the profit percentage?",
    options: [
      "A. 12%",
      "B. 15%",
      "C. 18%",
      "D. 20%"
    ],
    correctAnswer: 1, // Index 1: B. 15%
    explanation: "Profit = 920 - 800 = ₹120. Profit percentage = (120 / 800) × 100 = 15%."
  },
  {
    id: 4,
    question: "Find the simple interest on ₹5,000 at 8% per annum for 3 years.",
    options: [
      "A. ₹1,000",
      "B. ₹1,200",
      "C. ₹1,500",
      "D. ₹800"
    ],
    correctAnswer: 1, // Index 1: B. ₹1,200
    explanation: "SI = (P × R × T) / 100 = (5000 × 8 × 3) / 100 = ₹1,200."
  },
  {
    id: 5,
    question: "The ratio of boys to girls in a class is 5 : 3. If there are 24 students in total, how many boys are there?",
    options: [
      "A. 12",
      "B. 15",
      "C. 18",
      "D. 20"
    ],
    correctAnswer: 1, // Index 1: B. 15
    explanation: "Total ratio parts = 5 + 3 = 8. Value of 1 part = 24 / 8 = 3. Number of boys = 5 × 3 = 15."
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

  const handleNext = () => {
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

  const handleReset = () => {
    setUserAnswers({});
    setShowResults(false);
    setCurrentIdx(0);
  };

  const score = calculateScore();
  const answeredCount = Object.keys(userAnswers).length;

  return (
    <div className="assessment1-page">
      <section className="assessment1-section container">
        {/* Hero Header Banner */}
        <div className="personality-hero-banner" style={{marginBottom: '0.75rem'}}>
          <div className="hero-banner-badge">
            <Brain size={32} />
          </div>
          <div className="hero-banner-text">
            <h2>Psychometric & Aptitude Assessment Test</h2>
            <p>Evaluate your numerical reasoning, quantitative logic, and problem-solving skills</p>
          </div>
        </div>

        {/* Quiz Header Progress Bar */}
        <div className="quiz-status-bar" style={{marginBottom: '0.75rem'}}>
          <div className="status-item">
            <span className="status-label">Progress:</span>
            <span className="status-value">{answeredCount} of {totalQuestions} Answered</span>
          </div>
          {showResults && (
            <div className="status-score-badge">
              <Award size={20} />
              <span>Your Score: {score} / {totalQuestions} ({Math.round((score / totalQuestions) * 100)}%)</span>
            </div>
          )}
          {showResults && (
            <button 
              className="btn btn-outline-secondary btn-reset-quiz"
              onClick={handleReset}
            >
              <RotateCcw size={16} />
              <span>Retake Quiz</span>
            </button>
          )}
        </div>

        {!showResults ? (
          /* Single Active Question Card View */
          <div className="single-question-wrapper">
            <div className="question-card">
              <div className="question-card-header flex items-center justify-between mb-3">
                <span className="question-number-badge">Question {currentIdx + 1} of {totalQuestions}</span>
                <span className="question-category-tag">Aptitude Evaluator</span>
              </div>

              <h3 className="question-text mb-4">{currentQ.question}</h3>

              <div className="options-vertical-list">
                {currentQ.options.map((opt, optIdx) => {
                  const isSelected = userAnswers[currentQ.id] === optIdx;
                  const letterBadge = ['A', 'B', 'C', 'D'][optIdx];
                  const optionText = opt.replace(/^[A-D]\.\s*/, '');

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
            <div className="quiz-nav-controls mt-6 flex items-center justify-between">
              <button
                className="btn-quiz-nav btn-prev"
                onClick={handlePrev}
                disabled={currentIdx === 0}
              >
                <ArrowLeft size={18} />
                <span>Previous</span>
              </button>

              <div className="question-dots">
                {questionsData.map((_, idx) => (
                  <span 
                    key={idx} 
                    className={`nav-dot ${idx === currentIdx ? 'dot-active' : ''} ${userAnswers[questionsData[idx].id] !== undefined ? 'dot-answered' : ''}`}
                    onClick={() => setCurrentIdx(idx)}
                  />
                ))}
              </div>

              <button
                className="btn-quiz-nav btn-next"
                onClick={handleNext}
              >
                <span>{currentIdx === totalQuestions - 1 ? 'Submit Test' : 'Next'}</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        ) : (
          /* Results View: Review All Questions */
          <div className="questions-container">
            {questionsData.map((q, index) => {
              const selectedOpt = userAnswers[q.id];
              const isAnswered = selectedOpt !== undefined;
              const isCorrect = selectedOpt === q.correctAnswer;

              return (
                <div key={q.id} className={`question-card ${isCorrect ? 'card-correct' : 'card-incorrect'}`}>
                  <div className="question-card-header flex items-center justify-between mb-3">
                    <span className="question-number-badge">Question {index + 1} of {totalQuestions}</span>
                    <div className="flex items-center gap-3">
                      <span className="question-category-tag">Aptitude Evaluator</span>
                      <span className={`result-tag ${isCorrect ? 'tag-correct' : 'tag-incorrect'}`}>
                        {isCorrect ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                        <span>{isCorrect ? 'Correct' : 'Incorrect'}</span>
                      </span>
                    </div>
                  </div>

                  <h3 className="question-text mb-4">{q.question}</h3>

                  <div className="options-vertical-list">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = selectedOpt === optIdx;
                      const isCorrectOption = optIdx === q.correctAnswer;
                      const letterBadge = ['A', 'B', 'C', 'D'][optIdx];
                      const optionText = opt.replace(/^[A-D]\.\s*/, '');

                      let optionClass = "option-row-button";
                      if (isCorrectOption) {
                        optionClass += " option-correct";
                      } else if (isSelected && !isCorrectOption) {
                        optionClass += " option-wrong";
                      }

                      return (
                        <div key={optIdx} className={optionClass}>
                          <div className="option-left-group">
                            <div className="option-letter-badge">{letterBadge}</div>
                            <span className="option-label-text">{optionText}</span>
                          </div>
                          <div className="option-radio-right">
                            {(isSelected || isCorrectOption) && <span className="radio-dot-inner" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="explanation-box mt-4">
                    <div className="explanation-header">
                      <HelpCircle size={16} />
                      <span>Solution & Explanation:</span>
                    </div>
                    <p className="explanation-text">
                      <strong>Correct Answer: {q.options[q.correctAnswer]}</strong>
                      <br />
                      {q.explanation}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Bottom CTA Banner */}
      <section className="cta section-padding text-center">
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
