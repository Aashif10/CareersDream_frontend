import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import animationGif from '../assets/animation766.gif';
import {
  Brain, ArrowLeft, ArrowRight, Sparkles, Trophy,
  Download, UserCheck, Shield, Award, HelpCircle,
  Clock, CheckCircle, BarChart3, ChevronRight, User, Mail, Phone, Lock,
  PieChart as PieChartIcon, CheckCircle2, Star, Layers, Activity,
  Target, TrendingUp, X, RotateCcw, Briefcase, Compass, BookOpen, Check
} from 'lucide-react';
import './personalitytest.css';

const API_URL = import.meta.env.VITE_API_URL || 'https://careersdream-backend.onrender.com';

// 5 Big Five Personality Dimensions Configuration
export const PERSONALITY_DIMENSIONS = [
  {
    code: 'E',
    shortName: 'Extraversion',
    name: 'Extraversion / Sociability',
    fullName: 'E — Extraversion / Sociability',
    questionNumbers: [1, 6, 11, 16, 21, 26],
    measures: 'Comfort with people, group energy, leadership',
    color: '#2563eb', // Royal Blue
    barColor: '#2563eb',
    bgLight: 'rgba(37, 99, 235, 0.08)',
    descriptions: [
      'Confidence in social situations, communication, and connecting with others.',
      'Reflects comfort with group activities, interaction, and taking the lead.'
    ]
  },
  {
    code: 'C',
    shortName: 'Conscientiousness',
    name: 'Conscientiousness / Discipline',
    fullName: 'C — Conscientiousness / Discipline',
    questionNumbers: [2, 7, 12, 17, 22, 27],
    measures: 'Organisation, responsibility, study habits',
    color: '#3b719f', // Deep Steel Blue (matches uploaded image C card)
    barColor: '#3b719f',
    bgLight: 'rgba(59, 113, 159, 0.08)',
    descriptions: [
      'Reflects responsibility, organisation, and the ability to stay focused on goals.',
      'Shows how well you manage tasks, time, and commitments.'
    ]
  },
  {
    code: 'A',
    shortName: 'Agreeableness',
    name: 'Agreeableness / Empathy',
    fullName: 'A — Agreeableness / Empathy',
    questionNumbers: [3, 8, 13, 18, 23, 28],
    measures: 'Kindness, cooperation, teamwork',
    color: '#8b5cf6', // Violet / Purple
    barColor: '#8b5cf6',
    bgLight: 'rgba(139, 92, 246, 0.08)',
    descriptions: [
      'Reflects kindness, understanding, and respect for others’ feelings and perspectives.',
      'Shows how well you cooperate, support others, and build positive relationships.'
    ]
  },
  {
    code: 'S',
    shortName: 'Stability',
    name: 'Emotional Stability',
    fullName: 'S — Emotional Stability',
    questionNumbers: [5, 10, 15, 20, 25, 30],
    measures: 'Calmness, resilience, stress management',
    color: '#2e9b72', // Emerald Teal-Green (matches uploaded image S card)
    barColor: '#2e9b72',
    bgLight: 'rgba(46, 155, 114, 0.08)',
    descriptions: [
      'Reflects calmness, resilience, and the ability to handle stress effectively.',
      'Shows how well you manage emotions and stay balanced during challenges.'
    ]
  },
  {
    code: 'O',
    shortName: 'Openness',
    name: 'Openness / Curiosity',
    fullName: 'O — Openness / Curiosity',
    questionNumbers: [4, 9, 14, 19, 24, 29],
    measures: 'Creativity, learning, exploration',
    color: '#ea580c', // Orange / Amber
    barColor: '#ea580c',
    bgLight: 'rgba(234, 88, 12, 0.08)',
    descriptions: [
      'Reflects creativity, curiosity, and an eagerness to explore new ideas and experiences.',
      'Shows how open you are to learning, discovering, and thinking in new ways.'
    ]
  }
];

// 10 Career Trait Signatures Configuration (Career to Trait Fit Matrix)
export const CAREER_TRAIT_SIGNATURES = [
  {
    career: 'Doctor',
    traitSignature: 'C + A + S',
    primaryTraits: ['C', 'A', 'S'],
    note: null,
    whyItFits: 'Long training, patient care, pressure tolerance',
    domain: 'Healthcare & Medicine'
  },
  {
    career: 'Entrepreneur',
    traitSignature: 'E + O + S',
    primaryTraits: ['E', 'O', 'S'],
    note: null,
    whyItFits: 'Selling ideas, creative risk-taking, handling setbacks',
    domain: 'Business & Leadership'
  },
  {
    career: 'Scientist/Researcher',
    traitSignature: 'O + C (E optional)',
    primaryTraits: ['O', 'C'],
    note: 'E optional',
    whyItFits: 'Curiosity + rigour; often independent work',
    domain: 'Science & Research'
  },
  {
    career: 'Teacher/Educator',
    traitSignature: 'E + A + C',
    primaryTraits: ['E', 'A', 'C'],
    note: null,
    whyItFits: 'Energy, empathy, structured preparation',
    domain: 'Education & Mentorship'
  },
  {
    career: 'Lawyer',
    traitSignature: 'E + C (low A acceptable)',
    primaryTraits: ['E', 'C'],
    note: 'low A acceptable',
    whyItFits: 'Argument, preparation, healthy competitiveness',
    domain: 'Legal & Advocacy'
  },
  {
    career: 'Engineer',
    traitSignature: 'C + O',
    primaryTraits: ['C', 'O'],
    note: null,
    whyItFits: 'Disciplined problem-solving',
    domain: 'Engineering & Technology'
  },
  {
    career: 'Designer/Artist',
    traitSignature: 'O + A',
    primaryTraits: ['O', 'A'],
    note: null,
    whyItFits: 'Creativity combined with audience empathy',
    domain: 'Design & Creative Arts'
  },
  {
    career: 'Civil Servant',
    traitSignature: 'C + A + S',
    primaryTraits: ['C', 'A', 'S'],
    note: null,
    whyItFits: 'Discipline, public service, exam pressure',
    domain: 'Public Administration & Govt'
  },
  {
    career: 'Analyst / CA',
    traitSignature: 'C + (low E is fine)',
    primaryTraits: ['C'],
    note: 'low E is fine',
    whyItFits: 'Precision and patience over people-work',
    domain: 'Finance, Accounts & Analytics'
  },
  {
    career: 'Armed Forces',
    traitSignature: 'E + C + S',
    primaryTraits: ['E', 'C', 'S'],
    note: null,
    whyItFits: 'Leadership, discipline, high-pressure environments',
    domain: 'Defense & National Security'
  }
];

// Helper component to render styled trait signature pills with color codes
export const TraitSignatureDisplay = ({ signature }) => {
  const DIM_COLORS = {
    E: { bg: 'rgba(37, 99, 235, 0.12)', color: '#2563eb', border: 'rgba(37, 99, 235, 0.35)', name: 'Extraversion' },
    C: { bg: 'rgba(59, 113, 159, 0.12)', color: '#3b719f', border: 'rgba(59, 113, 159, 0.35)', name: 'Conscientiousness' },
    A: { bg: 'rgba(139, 92, 246, 0.12)', color: '#8b5cf6', border: 'rgba(139, 92, 246, 0.35)', name: 'Agreeableness' },
    S: { bg: 'rgba(46, 155, 114, 0.12)', color: '#2e9b72', border: 'rgba(46, 155, 114, 0.35)', name: 'Emotional Stability' },
    O: { bg: 'rgba(234, 88, 12, 0.12)', color: '#ea580c', border: 'rgba(234, 88, 12, 0.35)', name: 'Openness' }
  };

  // Match trait tokens (e.g. "C", "+", "A", "(E optional)", etc.)
  const parts = signature.split(/(\s*\+\s*|\s*\(.*?\))/g).filter(p => p && p.trim().length > 0);

  return (
    <div className="pt-trait-sig-wrap">
      {parts.map((part, pIdx) => {
        const trimmed = part.trim();
        if (trimmed === '+') {
          return <span key={pIdx} className="pt-sig-plus">+</span>;
        }
        if (trimmed.startsWith('(') && trimmed.endsWith(')')) {
          return (
            <span key={pIdx} className="pt-sig-note">
              {trimmed}
            </span>
          );
        }
        const dimConfig = DIM_COLORS[trimmed];
        if (dimConfig) {
          return (
            <span
              key={pIdx}
              className="pt-sig-badge"
              style={{
                backgroundColor: dimConfig.bg,
                color: dimConfig.color,
                borderColor: dimConfig.border
              }}
              title={`${trimmed} — ${dimConfig.name}`}
            >
              {trimmed}
            </span>
          );
        }
        return <span key={pIdx} className="pt-sig-raw">{trimmed}</span>;
      })}
    </div>
  );
};

// Calculate career fit scores based on ranked dimensions
export const calculateCareerFitScores = (dimensionsList) => {
  const scoresByCode = {};
  dimensionsList.forEach(d => {
    scoresByCode[d.code] = d.percentage || 0;
  });

  const list = CAREER_TRAIT_SIGNATURES.map((item, index) => {
    const relevantScores = item.primaryTraits.map(t => scoresByCode[t] !== undefined ? scoresByCode[t] : 50);
    const avgScore = relevantScores.length > 0
      ? Math.round(relevantScores.reduce((a, b) => a + b, 0) / relevantScores.length)
      : 50;

    let fitBadgeClass = 'fit-badge-good';
    let fitText = 'Good Fit';
    let fitColor = '#2563eb';

    if (avgScore >= 75) {
      fitBadgeClass = 'fit-badge-high';
      fitText = 'High Match';
      fitColor = '#10b981';
    } else if (avgScore >= 60) {
      fitBadgeClass = 'fit-badge-solid';
      fitText = 'Strong Fit';
      fitColor = '#0284c7';
    } else if (avgScore < 50) {
      fitBadgeClass = 'fit-badge-moderate';
      fitText = 'Moderate Fit';
      fitColor = '#f59e0b';
    }

    return {
      ...item,
      id: `career-${index + 1}`,
      matchPercentage: avgScore,
      fitBadgeClass,
      fitText,
      fitColor
    };
  });

  return list.sort((a, b) => b.matchPercentage - a.matchPercentage);
};

// Helper to find dimension for a question number (1-based)
export const getDimensionForQuestionNumber = (qNum) => {
  return PERSONALITY_DIMENSIONS.find(d => d.questionNumbers.includes(qNum)) || PERSONALITY_DIMENSIONS[0];
};

// 30 Standard Questions (6 questions per dimension)
const DEFAULT_30_QUESTIONS = [
  // 1-5
  {
    _id: 'q1',
    order: 1,
    question: 'I feel energized, outgoing, and confident when interacting in large group settings or meeting new people.',
    category: 'E — Extraversion / Sociability'
  },
  {
    _id: 'q2',
    order: 2,
    question: 'I keep my study schedules, personal assignments, and daily commitments well-organized and planned in advance.',
    category: 'C — Conscientiousness / Discipline'
  },
  {
    _id: 'q3',
    order: 3,
    question: 'I genuinely enjoy helping classmates and coworkers, and I prioritize teamwork and mutual kindness.',
    category: 'A — Agreeableness / Empathy'
  },
  {
    _id: 'q4',
    order: 4,
    question: 'I am drawn to novel ideas, creative arts, and exploring imaginative solutions to complex problems.',
    category: 'O — Openness / Curiosity'
  },
  {
    _id: 'q5',
    order: 5,
    question: 'I stay calm, level-headed, and composed even when facing unexpected changes, exams, or tight deadlines.',
    category: 'S — Emotional Stability'
  },

  // 6-10
  {
    _id: 'q6',
    order: 6,
    question: 'I readily take initiative and feel comfortable stepping forward to guide or lead group activities.',
    category: 'E — Extraversion / Sociability'
  },
  {
    _id: 'q7',
    order: 7,
    question: 'I am disciplined, reliable, and finish all required tasks thoroughly before taking time to relax.',
    category: 'C — Conscientiousness / Discipline'
  },
  {
    _id: 'q8',
    order: 8,
    question: 'I listen attentively to other perspectives and seek respectful, constructive common ground during disagreements.',
    category: 'A — Agreeableness / Empathy'
  },
  {
    _id: 'q9',
    order: 9,
    question: 'I have a strong curiosity about how things work and actively pursue learning opportunities outside my routine.',
    category: 'O — Openness / Curiosity'
  },
  {
    _id: 'q10',
    order: 10,
    question: 'I bounce back quickly from unexpected setbacks, critical feedback, or difficult academic challenges.',
    category: 'S — Emotional Stability'
  },

  // 11-15
  {
    _id: 'q11',
    order: 11,
    question: 'I find it effortless to initiate discussions and express my thoughts openly in social and academic circles.',
    category: 'E — Extraversion / Sociability'
  },
  {
    _id: 'q12',
    order: 12,
    question: 'I establish clear milestones for myself and maintain consistent study habits to reach my goals.',
    category: 'C — Conscientiousness / Discipline'
  },
  {
    _id: 'q13',
    order: 13,
    question: 'I am sensitive to the needs and feelings of others and readily offer support when someone needs a hand.',
    category: 'A — Agreeableness / Empathy'
  },
  {
    _id: 'q14',
    order: 14,
    question: 'I enjoy thinking about theoretical questions, futuristic concepts, and abstract possibilities.',
    category: 'O — Openness / Curiosity'
  },
  {
    _id: 'q15',
    order: 15,
    question: 'I rarely feel overwhelmed or excessively worried when high demands or unexpected pressures arise.',
    category: 'S — Emotional Stability'
  },

  // 16-20
  {
    _id: 'q16',
    order: 16,
    question: 'I thrive when working in dynamic, collaborative environments rather than isolated, solitary routines.',
    category: 'E — Extraversion / Sociability'
  },
  {
    _id: 'q17',
    order: 17,
    question: 'I pay close attention to accuracy and details, striving to deliver high-quality and dependable outcomes.',
    category: 'C — Conscientiousness / Discipline'
  },
  {
    _id: 'q18',
    order: 18,
    question: 'I believe in treating everyone with compassion, fairness, and fostering cooperative partnerships.',
    category: 'A — Agreeableness / Empathy'
  },
  {
    _id: 'q19',
    order: 19,
    question: 'I regularly seek out unconventional perspectives and innovative ways to approach everyday challenges.',
    category: 'O — Openness / Curiosity'
  },
  {
    _id: 'q20',
    order: 20,
    question: 'I maintain emotional equilibrium and steady focus during high-pressure situations.',
    category: 'S — Emotional Stability'
  },

  // 21-25
  {
    _id: 'q21',
    order: 21,
    question: 'I feel enthusiastic and comfortable speaking up, presenting ideas, or answering questions in front of a group.',
    category: 'E — Extraversion / Sociability'
  },
  {
    _id: 'q22',
    order: 22,
    question: 'I structure my time effectively and avoid leaving critical tasks until the last minute.',
    category: 'C — Conscientiousness / Discipline'
  },
  {
    _id: 'q23',
    order: 23,
    question: 'I am cooperative, considerate, and value healthy team camaraderie over personal rivalries.',
    category: 'A — Agreeableness / Empathy'
  },
  {
    _id: 'q24',
    order: 24,
    question: 'I enjoy exploring diverse disciplines, cultural traditions, and artistic or philosophical subjects.',
    category: 'O — Openness / Curiosity'
  },
  {
    _id: 'q25',
    order: 25,
    question: 'I stay optimistic, patient, and self-assured when dealing with stressful or challenging circumstances.',
    category: 'S — Emotional Stability'
  },

  // 26-30
  {
    _id: 'q26',
    order: 26,
    question: 'I bring vibrant energy to team projects and naturally encourage others to participate enthusiastically.',
    category: 'E — Extraversion / Sociability'
  },
  {
    _id: 'q27',
    order: 27,
    question: 'I am persevering and follow through on my duties until completion, even when the work is demanding.',
    category: 'C — Conscientiousness / Discipline'
  },
  {
    _id: 'q28',
    order: 28,
    question: 'I am empathetic and work proactively to resolve conflicts with empathy, diplomacy, and tact.',
    category: 'A — Agreeableness / Empathy'
  },
  {
    _id: 'q29',
    order: 29,
    question: 'I love experimenting with new techniques, tools, and creative angles rather than sticking rigidly to tradition.',
    category: 'O — Openness / Curiosity'
  },
  {
    _id: 'q30',
    order: 30,
    question: 'I quickly regain my composure and mental clarity after experiencing stress or emotional tension.',
    category: 'S — Emotional Stability'
  }
];

// Reverse-Scored Questions Configuration (Questions 10, 15, 22, 25)
export const REVERSE_QUESTION_NUMBERS = [10, 15, 22, 25];

export const isReverseQuestion = (qNum) => {
  return REVERSE_QUESTION_NUMBERS.includes(Number(qNum));
};

// 5-point Likert Scale (Standard: 1 to 5)
const STANDARD_5_OPTIONS = [
  { letter: 'A', label: 'Strongly Disagree', marks: 1, tag: '1 Mark' },
  { letter: 'B', label: 'Disagree', marks: 2, tag: '2 Marks' },
  { letter: 'C', label: 'Neutral', marks: 3, tag: '3 Marks' },
  { letter: 'D', label: 'Agree', marks: 4, tag: '4 Marks' },
  { letter: 'E', label: 'Strongly Agree', marks: 5, tag: '5 Marks' }
];

// 5-point Likert Scale (Reverse-Scored: 5 to 1)
const REVERSE_5_OPTIONS = [
  { letter: 'A', label: 'Strongly Disagree', marks: 5, tag: '5 Marks' },
  { letter: 'B', label: 'Disagree', marks: 4, tag: '4 Marks' },
  { letter: 'C', label: 'Neutral', marks: 3, tag: '3 Marks' },
  { letter: 'D', label: 'Agree', marks: 2, tag: '2 Marks' },
  { letter: 'E', label: 'Strongly Agree', marks: 1, tag: '1 Mark' }
];

const OPTION_MARKS_MAP = {
  'Strongly Disagree': 1,
  'Disagree': 2,
  'Neutral': 3,
  'Agree': 4,
  'Strongly Agree': 5
};

const REVERSE_OPTION_MARKS_MAP = {
  'Strongly Disagree': 5,
  'Disagree': 4,
  'Neutral': 3,
  'Agree': 2,
  'Strongly Agree': 1
};

export const getQuestionOptions = (question, qNum) => {
  const targetQNum = qNum || question?.order;
  const isRev = isReverseQuestion(targetQNum) || question?.isReverse;

  if (question && question.options && Array.isArray(question.options) && question.options.length === 5) {
    const letters = ['A', 'B', 'C', 'D', 'E'];
    return question.options.map((opt, i) => {
      const marks = isRev ? (6 - opt.marks) : opt.marks;
      return {
        letter: letters[i] || `${i + 1}`,
        label: opt.label,
        marks,
        tag: `${marks} Mark${marks !== 1 ? 's' : ''}`
      };
    });
  }
  return isRev ? REVERSE_5_OPTIONS : STANDARD_5_OPTIONS;
};

// Calculate Big Five Dimension scores and rank them descending
export const calculateRankedDimensions = (responsesList) => {
  const answersByQNum = {};
  responsesList.forEach((resp, idx) => {
    const qNum = resp.order || (idx + 1);
    let marks = resp.marksObtained;
    if (marks === undefined || marks === null) {
      const isRev = isReverseQuestion(qNum) || resp.isReverse;
      const mapToUse = isRev ? REVERSE_OPTION_MARKS_MAP : OPTION_MARKS_MAP;
      marks = mapToUse[resp.selectedOption] || 3;
    }
    answersByQNum[qNum] = marks;
  });

  const dimensionResults = PERSONALITY_DIMENSIONS.map(dim => {
    let score = 0;
    const qScores = [];

    dim.questionNumbers.forEach(qNum => {
      const qScore = answersByQNum[qNum] !== undefined ? answersByQNum[qNum] : 3;
      score += qScore;
      qScores.push({ qNum, score: qScore });
    });

    const maxScore = 30;
    const minScore = 6;
    const percentage = Number(((score / maxScore) * 100).toFixed(2));

    return {
      ...dim,
      score,
      minScore,
      maxScore,
      percentage,
      qScores
    };
  });

  const sorted = dimensionResults.sort((a, b) => b.score - a.score);

  const RANK_ORDER_COLORS = [
    '#10b981', // #1 Rank: Green (Highest score)
    '#f59e0b', // #2 Rank: Gold / Amber
    '#2563eb', // #3 Rank: Dark Blue
    '#8b5cf6', // #4 Rank: Purple
    '#ef4444'  // #5 Rank: Red (Lowest score)
  ];

  return sorted.map((dim, idx) => ({
    ...dim,
    color: RANK_ORDER_COLORS[idx] || dim.color,
    barColor: RANK_ORDER_COLORS[idx] || dim.barColor
  }));
};

// ── Big High-Definition SVG Pie Chart Component ──
const PersonalityPieChart = ({ dimensions, activeCode, onHoverDim }) => {
  const totalScore = dimensions.reduce((acc, curr) => acc + curr.score, 0) || 1;
  const size = 480;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 220;

  let currentAngle = -Math.PI / 2; // Start from 12 o'clock

  const slices = dimensions.map((dim) => {
    const sliceAngle = (dim.score / totalScore) * (2 * Math.PI);
    const startAngle = currentAngle;
    const endAngle = currentAngle + sliceAngle;
    currentAngle = endAngle;

    const x1 = cx + radius * Math.cos(startAngle);
    const y1 = cy + radius * Math.sin(startAngle);
    const x2 = cx + radius * Math.cos(endAngle);
    const y2 = cy + radius * Math.sin(endAngle);
    const largeArc = sliceAngle > Math.PI ? 1 : 0;

    const pathData = `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;

    const midAngle = (startAngle + endAngle) / 2;
    const labelRadius = radius * 0.62;
    const lx = cx + labelRadius * Math.cos(midAngle);
    const ly = cy + labelRadius * Math.sin(midAngle);

    // Calculate rotation angle for readable angled labels
    let deg = (midAngle * 180) / Math.PI;
    if (deg > 90 && deg < 270) deg += 180;

    const slicePct = ((dim.score / totalScore) * 100).toFixed(1);

    return {
      ...dim,
      pathData,
      lx,
      ly,
      deg,
      slicePct,
      sliceAngle
    };
  });

  return (
    <div className="pt-pie-chart-wrapper">
      <div className="pt-pie-svg-box">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="pt-pie-svg"
          aria-label="Personality Dimensions Pie Chart"
        >
          {slices.map((slice) => {
            const isHovered = activeCode === slice.code;
            return (
              <g
                key={slice.code}
                className={`pt-pie-slice-group ${isHovered ? 'pt-slice-hovered' : ''}`}
                onMouseEnter={() => onHoverDim && onHoverDim(slice.code)}
                onMouseLeave={() => onHoverDim && onHoverDim(null)}
              >
                <path
                  d={slice.pathData}
                  fill={slice.color}
                  stroke="#ffffff"
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                  className="pt-pie-path"
                />
                {/* Text Label on Slice — single line, adaptive font size */}
                {slice.sliceAngle > 0.32 && (() => {
                  const label = slice.shortName || slice.code;
                  const fontSize = 14;
                  return (
                    <text
                      x={slice.lx}
                      y={slice.ly}
                      transform={`rotate(${slice.deg}, ${slice.lx}, ${slice.ly})`}
                      textAnchor="middle"
                      dominantBaseline="central"
                      className="pt-pie-slice-text"
                      fontSize={fontSize}
                    >
                      {label}
                    </text>
                  );
                })()}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend Breakdown List beside the Pie */}
      <div className="pt-pie-legend-list">
        {slices.map((slice) => {
          const isHovered = activeCode === slice.code;
          return (
            <div
              key={slice.code}
              className={`pt-pie-legend-item ${isHovered ? 'pt-legend-hovered' : ''}`}
              onMouseEnter={() => onHoverDim && onHoverDim(slice.code)}
              onMouseLeave={() => onHoverDim && onHoverDim(null)}
            >
              <div className="pt-legend-left">
                <span
                  className="pt-legend-color-dot"
                  style={{ backgroundColor: slice.color }}
                />
                <span className="pt-legend-name">{slice.fullName}</span>
              </div>
              <div className="pt-legend-right">
                <span className="pt-legend-pct">{slice.percentage}%</span>
                <span className="pt-legend-score">({slice.score} / {slice.maxScore})</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ── 1-on-1 Guidance Illustration Component (Below 30% Score Popup) ──
const GuidanceIllustration = () => (
  <svg viewBox="0 0 500 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="pt-guidance-svg">
    {/* Soft Light Blue Backdrop Blob */}
    <path
      d="M60 120C60 65 110 30 200 25C290 20 420 35 440 90C460 145 420 205 340 215C260 225 100 215 70 180C50 155 60 135 60 120Z"
      fill="#E0F2FE"
      opacity="0.8"
    />
    
    {/* Lightbulb above Student */}
    <g transform="translate(135, 20)">
      <circle cx="20" cy="20" r="18" fill="#FEF08A" opacity="0.6" />
      <circle cx="20" cy="20" r="12" fill="#F59E0B" />
      <path d="M16 20C16 17.8 17.8 16 20 16C22.2 16 24 17.8 24 20C24 21.8 22.8 23.3 21.2 23.8V26H18.8V23.8C17.2 23.3 16 21.8 16 20Z" fill="#FFFFFF" />
      <rect x="18.5" y="26.5" width="3" height="2.5" rx="0.5" fill="#D97706" />
      <line x1="20" y1="3" x2="20" y2="0" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
      <line x1="6" y1="9" x2="3.5" y2="7" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
      <line x1="34" y1="9" x2="36.5" y2="7" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
      <line x1="2" y1="20" x2="-1" y2="20" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
      <line x1="38" y1="20" x2="41" y2="20" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
    </g>

    {/* Speech Bubble "Your Goals Our Guidance" */}
    <g transform="translate(200, 18)">
      <rect x="0" y="0" width="135" height="38" rx="19" fill="#FFFFFF" stroke="#93C5FD" strokeWidth="1.5" />
      <path d="M45 38 L55 46 L58 37 Z" fill="#FFFFFF" stroke="#93C5FD" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M44 36 L57 36 L54 44 Z" fill="#FFFFFF" />
      <text x="67.5" y="16" textAnchor="middle" fill="#1E40AF" fontSize="11" fontWeight="700" fontFamily="sans-serif">Your Goals</text>
      <text x="67.5" y="29" textAnchor="middle" fill="#1E40AF" fontSize="11" fontWeight="700" fontFamily="sans-serif">Our Guidance</text>
    </g>

    {/* Plant in background right */}
    <g transform="translate(365, 80)">
      <path d="M25 60 Q40 30 50 15 Q30 30 25 60Z" fill="#4ADE80" />
      <path d="M20 70 Q5 35 -10 25 Q10 45 20 70Z" fill="#22C55E" />
      <path d="M22 65 Q35 45 42 35 Q28 50 22 65Z" fill="#16A34A" />
    </g>

    {/* Desk Surface */}
    <path d="M110 185 L390 185 C400 185 408 190 405 194 L395 204 C393 207 385 208 375 208 L125 208 C115 208 107 207 105 204 L95 194 C92 190 100 185 110 185Z" fill="#E2E8F0" />
    <rect x="100" y="185" width="300" height="4" fill="#CBD5E1" />

    {/* Laptop on desk */}
    <g transform="translate(290, 130)">
      <path d="M15 12 L55 12 L65 55 L5 55 Z" fill="#64748B" />
      <path d="M18 15 L52 15 L60 50 L10 50 Z" fill="#1E293B" />
      <circle cx="35" cy="32" r="3" fill="#94A3B8" />
      <path d="M0 55 L70 55 C73 55 75 57 73 59 L68 62 L2 62 L-3 59 C-5 57 -3 55 0 55Z" fill="#94A3B8" />
    </g>

    {/* Notebook & Pen on desk */}
    <g transform="translate(235, 180)">
      <polygon points="0,5 30,0 45,15 15,20" fill="#1E3A8A" />
      <polygon points="2,6 29,1.5 43,15 16,19" fill="#FFFFFF" />
      <line x1="40" y1="2" x2="52" y2="12" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" />
    </g>

    {/* Student (Left) */}
    <g transform="translate(100, 80)">
      <path d="M-5 50 C-15 50 -20 70 -15 95 C-10 110 -5 110 5 105 Z" fill="#1E3A8A" />
      <path d="M20 75 C10 75 0 85 -5 115 L55 115 C55 105 50 85 40 75 Z" fill="#2563EB" />
      <path d="M5 82 C15 90 30 95 45 92 L50 115 L25 115 Z" fill="#1D4ED8" />
      <path d="M15 65 C10 65 5 70 5 78 C12 80 25 80 32 75 Z" fill="#1E40AF" />
      <rect x="23" y="60" width="10" height="12" fill="#FDBA74" />
      <circle cx="28" cy="48" r="16" fill="#FDBA74" />
      <path d="M14 46 C12 30 25 22 36 28 C42 32 42 42 42 42 C38 38 32 38 28 42 C24 38 18 40 14 46Z" fill="#1E1B4B" />
      <circle cx="34" cy="46" r="2" fill="#431407" />
      <path d="M36 52 Q32 55 29 52" fill="none" stroke="#431407" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M38 90 C45 90 60 98 68 105 L60 112 C52 106 42 100 35 98 Z" fill="#2563EB" />
      <circle cx="70" cy="106" r="5" fill="#FDBA74" />
    </g>

    {/* Mentor / Counselor (Right) */}
    <g transform="translate(230, 70)">
      <rect x="120" y="60" width="35" height="70" rx="8" fill="#1E293B" />
      <path d="M60 70 C45 70 35 85 30 125 L115 125 C110 85 100 70 85 70 Z" fill="#0F172A" />
      <polygon points="66,70 72.5,100 79,70" fill="#FFFFFF" />
      <rect x="67" y="55" width="11" height="18" fill="#FED7AA" />
      <circle cx="72.5" cy="42" r="16" fill="#FED7AA" />
      <path d="M55 42 C55 22 70 18 85 24 C92 30 92 50 90 75 C82 72 82 50 82 42 C75 35 62 38 55 42Z" fill="#020617" />
      <circle cx="66" cy="42" r="2" fill="#431407" />
      <path d="M64 48 Q67 52 71 49" fill="none" stroke="#431407" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M45 80 C30 85 15 88 0 86 L-5 93 C12 96 30 93 48 87 Z" fill="#0F172A" />
      <circle cx="-6" cy="89" r="5" fill="#FED7AA" />
    </g>
  </svg>
);

const PersonalityTest = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('token'));
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [alreadyAttempted, setAlreadyAttempted] = useState(false);
  const [hoveredDimCode, setHoveredDimCode] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showLowScorePopup, setShowLowScorePopup] = useState(false);

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
        const overallPct = data.data.percentage !== undefined
          ? data.data.percentage
          : Math.round(((data.data.totalScore || 0) / 150) * 100);
        if (overallPct < 40) {
          setShowLowScorePopup(true);
        }
      }
    } catch (err) {
      console.warn('Error checking prior test submission:', err);
    }
  };

  // Fetch dynamic questions from backend or use DEFAULT_30_QUESTIONS
  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/questions`);
      const data = await res.json();
      if (res.ok && data.data && data.data.length >= 30) {
        setQuestions(data.data);
      } else {
        try {
          const seedRes = await fetch(`${API_URL}/api/questions/seed`, { method: 'POST' });
          const seedData = await seedRes.json();
          if (seedRes.ok && seedData.data && seedData.data.length >= 30) {
            setQuestions(seedData.data);
            return;
          }
        } catch (e) {
          // ignore
        }
        setQuestions(DEFAULT_30_QUESTIONS);
      }
    } catch (err) {
      console.warn('API error, using standard 30 questions:', err);
      setQuestions(DEFAULT_30_QUESTIONS);
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
  const currentQNum = currentIdx + 1;
  const currentDim = getDimensionForQuestionNumber(currentQNum);
  const currentQId = currentQ._id || `q-${currentIdx}`;
  const isCurrentAnswered = userAnswers[currentQId] !== undefined;

  const handleSelectOption = (option) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentQId]: {
        questionId: currentQ._id,
        order: currentQNum,
        questionText: currentQ.question,
        category: currentDim.fullName,
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

    const responsesArray = questions.map((q, idx) => {
      const qNum = idx + 1;
      const qId = q._id || `q-${idx}`;
      const ans = userAnswers[qId];
      const dim = getDimensionForQuestionNumber(qNum);
      return {
        order: qNum,
        questionId: q._id,
        questionText: q.question,
        category: dim.fullName,
        selectedOption: ans ? ans.selectedOption : 'Neutral',
        marksObtained: ans ? ans.marksObtained : 3
      };
    });

    const rankedDimensions = calculateRankedDimensions(responsesArray);
    const totalScore = rankedDimensions.reduce((acc, curr) => acc + curr.score, 0);
    const maxScore = rankedDimensions.length * 30; // 150
    const overallPct = Number(((totalScore / maxScore) * 100).toFixed(2));

    const topDim = rankedDimensions[0];
    const summaryText = `Dominant Personality Dimension: ${topDim.fullName} with a score of ${topDim.score}/30 (${topDim.percentage}%). Measures: ${topDim.measures}.`;

    const payload = {
      userName: userDetails.name.trim() || localStorage.getItem('userName') || 'Candidate',
      userEmail: userDetails.email.trim() || localStorage.getItem('userEmail') || 'student@careersdream.com',
      userPhone: userDetails.phone.trim() || '',
      responses: responsesArray,
      categoryBreakdown: rankedDimensions.map(d => ({
        category: d.fullName,
        code: d.code,
        score: d.score,
        maxScore: d.maxScore,
        percentage: d.percentage,
        measures: d.measures
      })),
      totalScore,
      maxScore,
      percentage: Math.round(overallPct),
      summary: summaryText
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
        setSubmissionResult(payload);
        setAlreadyAttempted(true);
      }
    } catch (err) {
      console.warn('Submission network issue, displaying evaluation:', err);
      setSubmissionResult(payload);
      setAlreadyAttempted(true);
    } finally {
      setSubmitting(false);
      setShowSuccessPopup(true);
    }
  };

  const handlePrintReport = () => {
    window.print();
  };

  const handleGetGuidance = () => {
    setShowLowScorePopup(false);
    navigate('/contactus');
  };

  // Compute ranked dimensions for the results display
  const displayRankedDimensions = submissionResult?.responses
    ? calculateRankedDimensions(submissionResult.responses)
    : (submissionResult?.categoryBreakdown && submissionResult.categoryBreakdown.length > 0)
      ? PERSONALITY_DIMENSIONS.map(dim => {
          const matched = submissionResult.categoryBreakdown.find(c => 
            c.code === dim.code || (c.category && c.category.includes(dim.code)) || (c.category && c.category.includes(dim.name))
          );
          const score = matched ? matched.score : 18;
          return {
            ...dim,
            score,
            minScore: 6,
            maxScore: 30,
            percentage: Number(((score / 30) * 100).toFixed(2))
          };
        })
        .sort((a, b) => b.score - a.score)
        .map((dim, idx) => {
          const RANK_COLORS = ['#10b981', '#f59e0b', '#2563eb', '#8b5cf6', '#ef4444'];
          return {
            ...dim,
            color: RANK_COLORS[idx] || dim.color,
            barColor: RANK_COLORS[idx] || dim.barColor
          };
        })
      : calculateRankedDimensions(DEFAULT_30_QUESTIONS.map(q => ({ order: q.order, marksObtained: 3 })));

  const overallScorePct = submissionResult?.percentage !== undefined
    ? submissionResult.percentage
    : Math.round(((submissionResult?.totalScore || displayRankedDimensions.reduce((acc, curr) => acc + curr.score, 0)) / 150) * 100);

  return (
    <div className="personalitytest-page">

      {/* ── Test Submitted Success Popup ── */}
      {showSuccessPopup && (
        <div className="pt-success-overlay" onClick={() => { setShowSuccessPopup(false); setShowResults(true); if (overallScorePct < 40) setShowLowScorePopup(true); }}>
          <div className="pt-success-popup" onClick={e => e.stopPropagation()}>
            {/* Full Popup Confetti Animation Overlay (Plays Once & Fades Out Slower) */}
            <img
              key="pt-confetti-once"
              src={animationGif}
              alt="Celebration Confetti"
              className="pt-confetti-bg-gif"
            />

            <div className="pt-success-icon-circle">
              <CheckCircle size={42} color="#22c55e" strokeWidth={2.2} />
            </div>
            <h2 className="pt-success-title">
              Test Submitted! <span className="pt-party-popper">🎉</span>
            </h2>
            <p className="pt-success-desc">
              Your personality assessment has been submitted successfully.
            </p>
            <div className="pt-success-actions">
              <button
                className="pt-success-btn pt-success-btn-primary"
                onClick={() => {
                  setShowSuccessPopup(false);
                  setShowResults(true);
                  if (overallScorePct < 40) setShowLowScorePopup(true);
                }}
              >
                View Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── One to One Guidance Modal Popup (Triggers when student score is below 40%) ── */}
      {showLowScorePopup && (
        <div className="pt-guidance-overlay" onClick={() => setShowLowScorePopup(false)}>
          <div className="pt-guidance-modal" onClick={e => e.stopPropagation()}>
            {/* Close Button */}
            <button
              className="pt-guidance-close-btn"
              onClick={() => setShowLowScorePopup(false)}
              aria-label="Close guidance popup"
            >
              <X size={20} />
            </button>

            {/* Vector Illustration at Top */}
            <div className="pt-guidance-illustration-wrap">
              <GuidanceIllustration />
            </div>

            {/* Title & Description */}
            <h2 className="pt-guidance-title">One to One Guidance</h2>
            <p className="pt-guidance-desc">
              Get personalized career guidance from our expert mentors, tailored to your goals, interests and strengths.
            </p>

            {/* 4 Feature Badges */}
            <div className="pt-guidance-features-grid">
              <div className="pt-guidance-feature-item">
                <div className="pt-gf-icon-circle pt-gf-user">
                  <User size={22} color="#0284c7" />
                </div>
                <span className="pt-gf-text">Personalized Support</span>
              </div>

              <div className="pt-guidance-feature-item">
                <div className="pt-gf-icon-circle pt-gf-target">
                  <Target size={22} color="#16a34a" />
                </div>
                <span className="pt-gf-text">Career Planning</span>
              </div>

              <div className="pt-guidance-feature-item">
                <div className="pt-gf-icon-circle pt-gf-chart">
                  <TrendingUp size={22} color="#9333ea" />
                </div>
                <span className="pt-gf-text">Expert Mentors</span>
              </div>

              <div className="pt-guidance-feature-item">
                <div className="pt-gf-icon-circle pt-gf-star">
                  <Star size={22} color="#eab308" />
                </div>
                <span className="pt-gf-text">Better Opportunities</span>
              </div>
            </div>

            {/* Main Action Button */}
            <div className="pt-guidance-cta-wrap">
              <button className="pt-guidance-btn-primary" onClick={handleGetGuidance}>
                <span>Get Guidance</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
      <section className="personalitytest-section container-fluid">
        {/* Top Hero Banner in Warm Golden Yellow Gradient */}
        {!showResults && isLoggedIn && (
          <div className="personality-hero-banner hide-on-print" style={{ marginBottom: '0.9rem' }}>
            <div className="hero-banner-badge">
              <Brain size={25} />
            </div>
            <div className="hero-banner-text">
              <h2>Psychometric &amp; Personality Assessment Test</h2>

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
                Please log in to your CareersDream account or register a new account before taking the Psychometric &amp; Personality Assessment Test.
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
            <p style={{ marginTop: '1rem', color: '#64748b', fontWeight: 600 }}>Loading assessment questions...</p>
          </div>
        ) : !showResults ? (
          /* Active Question Card View */
          <div className="single-question-wrapper hide-on-print">

            <div className="question-card">
              <div className="question-badge-wrap mb-2">
                <span className="question-number-badge">Question {currentQNum} of {totalQuestions}</span>
                {isReverseQuestion(currentQNum) && (
                  <span className="question-reverse-badge" title="Scoring scale is inverted for this reverse-scored question">
                    <RotateCcw size={12} /> Reverse-Scored Question
                  </span>
                )}
              </div>
              <h3 className="question-text" style={{ whiteSpace: 'pre-line' }}>{currentQ.question}</h3>

              <div className="options-vertical-list">
                {getQuestionOptions(currentQ, currentQNum).map((opt, optIdx) => {
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
          /* Ultra-Light Full-Width Modern Dashboard */
          <div className="results-wrapper full-width-report ultra-light-theme">
            <div className="modern-report-container hide-on-print">
              
              {/* Redesigned Ultra-Modern Top Hero Banner */}
              <div className="modern-hero-header mb-6">
                <div className="mhh-main-content">
                  <div className="mhh-pill-badge">
                    <CheckCircle2 size={13} color="#34d399" />
                    <span>Personality Assessment Evaluation</span>
                  </div>

                  <h2 className="mhh-title">Personality Dimensions Breakdown</h2>

                  <div className="mhh-date-chip">
                    <Clock size={12} />
                    <span>{new Date(submissionResult?.createdAt || Date.now()).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>

                  <div className="mhh-notice-text">
                    <span className="mhh-notice-label">
                      <Shield size={13} className="mhh-shield-icon" />
                      <strong>Note:</strong>
                    </span>
                    <span className="mhh-notice-message">
                      A student can take this test only once using one email ID ({submissionResult?.userEmail || userDetails.email || 'careersdream@gmail.com'}).
                    </span>
                  </div>
                </div>
              </div>

              {/* Low Score 1-on-1 Guidance Banner */}
              {overallScorePct < 40 && (
                <div className="pt-low-score-banner hide-on-print">
                  <div className="pt-lsb-content">
                    <Brain size={24} className="pt-lsb-icon" />
                    <div>
                      <h4 className="pt-lsb-title">Score Below 40% — Expert Mentorship Recommended</h4>
                      <p className="pt-lsb-desc">Your overall assessment score is below 40%. Connect with our expert mentors for one-on-one personalized career guidance.</p>
                    </div>
                  </div>
                  <button className="pt-lsb-btn" onClick={() => setShowLowScorePopup(true)}>
                    <span>One to One Guidance</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              )}

              {/* Main Dual Grid: Pie Chart (Left) + Ranked Progress Bars (Right) */}
              <div className="modern-results-grid">
                
                {/* Left Card: Pie Chart Distribution */}
                <div className="modern-card modern-pie-card">
                  <div className="card-header-styled">
                    <PieChartIcon size={19} className="card-header-icon" />
                    <div>
                      <h3 className="card-title">Personality Profile Distribution</h3>
                      <span className="card-subtitle">Proportional share of your 5 dimensions</span>
                    </div>
                  </div>

                  <PersonalityPieChart
                    dimensions={displayRankedDimensions}
                    activeCode={hoveredDimCode}
                    onHoverDim={setHoveredDimCode}
                  />
                </div>

                {/* Right Card: Ranked Horizontal Progress Bars (Descending Order) */}
                <div className="modern-card modern-bars-card">
                  <div className="card-header-styled">
                    <BarChart3 size={19} className="card-header-icon" />
                    <div>
                      <h3 className="card-title">Ranked Dimension Scores</h3>
                      <span className="card-subtitle">Sorted from highest score to lowest score (Scores: 6 – 30)</span>
                    </div>
                  </div>

                  <div className="modern-bars-stack">
                    {displayRankedDimensions.map((dim, rankIdx) => {
                      const isHovered = hoveredDimCode === dim.code;
                      return (
                        <div
                          key={dim.code}
                          className={`modern-bar-row ${isHovered ? 'bar-row-highlighted' : ''}`}
                          onMouseEnter={() => setHoveredDimCode(dim.code)}
                          onMouseLeave={() => setHoveredDimCode(null)}
                        >
                          {/* Row Header: Rank & Dimension Name on Left, Percentage on Right */}
                          <div className="mbr-top">
                            <div className="mbr-title-wrap">
                              <span className="mbr-rank-badge">{rankIdx + 1}</span>
                              <span className="mbr-dim-name">{dim.fullName}</span>
                            </div>
                            <div className="mbr-score-wrap">
                              <span className="mbr-percentage">{dim.percentage}%</span>
                            </div>
                          </div>

                          {/* Progress Track & Fill */}
                          <div className="mbr-track">
                            <div
                              className="mbr-fill"
                              style={{
                                width: `${Math.max(dim.percentage, 4)}%`,
                                backgroundColor: dim.color,
                                animationDelay: `${rankIdx * 0.15}s`
                              }}
                            />
                          </div>


                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Image-Style 5 Personality Trait Cards Section (Matching Uploaded Design) */}
              <div className="modern-card trait-cards-container">
                <div className="card-header-styled">
                  <Layers size={19} className="card-header-icon" />
                  <div>
                    <h3 className="card-title">Personality Dimensions Breakdown &amp; Trait Analysis</h3>
                    <span className="card-subtitle">Comprehensive behavioral insights and characteristics for your personality profile</span>
                  </div>
                </div>

                <div className="report-traits-list">
                  {displayRankedDimensions.map((dim, index) => {
                    const rankNum = index + 1 > 9 ? index + 1 : `0${index + 1}`;
                    return (
                      <div key={dim.code} className="modern-report-card">
                        {/* Background Watermark Letter */}
                        <div className="mrc-watermark" style={{ color: dim.color }}>{dim.code}</div>
                        
                        {/* Top Gradient Accent Line */}
                        <div className="mrc-top-accent" style={{ background: `linear-gradient(90deg, ${dim.color} 0%, transparent 100%)` }}></div>

                        <div className="mrc-header">
                          <div className="mrc-header-left">
                            <span className="mrc-rank-pill" style={{ backgroundColor: dim.color }}>
                              Rank {rankNum}
                            </span>
                            <h4 className="mrc-title">{dim.fullName}</h4>
                          </div>
                          <div className="mrc-header-right">
                            <div className="mrc-score-box">
                              <span className="mrc-score-val" style={{ color: dim.color }}>{dim.percentage}</span>
                              <span className="mrc-score-pct">%</span>
                            </div>
                            <span className="mrc-score-label">Match Score</span>
                          </div>
                        </div>
                        
                        <div className="mrc-body">
                          <div className="mrc-measures-col">
                            <div className="mrc-section-head">
                              <Activity size={16} style={{ color: dim.color }} />
                              <h5>Core Measures</h5>
                            </div>
                            <p className="mrc-measures-text">{dim.measures}</p>
                            
                            <div className="mrc-progress-container">
                              <div className="mrc-progress-track">
                                <div 
                                  className="mrc-progress-fill" 
                                  style={{ 
                                    width: `${Math.max(dim.percentage, 4)}%`, 
                                    backgroundColor: dim.color,
                                    boxShadow: `0 0 10px ${dim.color}80` 
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mrc-analysis-col">
                            <div className="mrc-section-head">
                              <Star size={16} style={{ color: dim.color }} />
                              <h5>Behavioral Analysis</h5>
                            </div>
                            <ul className="mrc-bullet-list">
                              {dim.descriptions && dim.descriptions.map((desc, idx) => (
                                <li key={idx}>
                                  <div className="mrc-bullet-icon" style={{ backgroundColor: `${dim.color}20`, color: dim.color }}>
                                    <CheckCircle2 size={14} />
                                  </div>
                                  <span className="mrc-bullet-text">{desc}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Centered Download CTA */}
              <div className="modern-bottom-actions hide-on-print">
                <button className="btn-modern-download-large" onClick={handlePrintReport}>
                  <Download size={18} />
                  <span>Download &amp; Print Complete Assessment Report</span>
                </button>
              </div>

            </div>

            {/* Printable Detailed Report Card (Print / PDF Download Only) */}
            <div className="pdf-review-section print-only">
              <div className="pdf-page">
                <div className="pdf-report-header mb-4">
                  <div className="pdf-title-row flex justify-between items-center mb-2">
                    <h2>Psychometric &amp; Personality Assessment Report</h2>
                    <span className="pdf-date-tag">
                      {new Date(submissionResult?.createdAt || Date.now()).toLocaleDateString('en-GB')}
                    </span>
                  </div>
                  <div className="pdf-summary-banner">
                    <div className="pdf-summary-score">
                      Candidate: <strong>{submissionResult?.userName || userDetails.name}</strong> ({submissionResult?.userEmail || userDetails.email})
                    </div>
                    <div className="pdf-summary-score">
                      Status: <strong>Verified 30-Question Assessment</strong>
                    </div>
                  </div>
                </div>

                {/* Printable Dimensions Ranking Table */}
                <div className="pdf-dimensions-table-wrap mb-4">
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem', color: '#1A2634' }}>
                    Ranked Personality Dimensions
                  </h4>
                  <table className="pdf-dimensions-table" style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem' }}>
                    <thead>
                      <tr style={{ background: '#f1f5f9', textAlign: 'left', borderBottom: '2px solid #cbd5e1' }}>
                        <th style={{ padding: '8px', width: '50px' }}>Rank</th>
                        <th style={{ padding: '8px' }}>Dimension</th>
                        <th style={{ padding: '8px' }}>Measures</th>
                        <th style={{ padding: '8px', width: '110px' }}>Question Nos.</th>
                        <th style={{ padding: '8px', width: '90px' }}>Score</th>
                        <th style={{ padding: '8px', width: '80px' }}>Percentage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayRankedDimensions.map((dim, idx) => (
                        <tr key={dim.code} style={{ borderBottom: '1px solid #e2e8f0' }}>
                          <td style={{ padding: '8px', fontWeight: 700 }}>{idx + 1}</td>
                          <td style={{ padding: '8px', fontWeight: 600 }}>{dim.fullName}</td>
                          <td style={{ padding: '8px', color: '#475569', fontSize: '0.85rem' }}>{dim.measures}</td>
                          <td style={{ padding: '8px', fontSize: '0.85rem' }}>{dim.questionNumbers.join(', ')}</td>
                          <td style={{ padding: '8px', fontWeight: 700 }}>{dim.score} / {dim.maxScore}</td>
                          <td style={{ padding: '8px', fontWeight: 700, color: dim.color }}>{dim.percentage}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Printable Trait Analysis Cards */}
                <div className="pdf-trait-cards-wrap mb-4" style={{ pageBreakInside: 'avoid' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem', color: '#1A2634' }}>
                    Personality Dimensions Trait Analysis
                  </h4>
                  <div className="report-traits-list">
                    {displayRankedDimensions.map((dim, index) => {
                      const rankNum = index + 1 > 9 ? index + 1 : `0${index + 1}`;
                      return (
                        <div key={dim.code} className="modern-report-card" style={{ pageBreakInside: 'avoid' }}>
                          <div className="mrc-watermark" style={{ color: dim.color }}>{dim.code}</div>
                          <div className="mrc-top-accent" style={{ background: `linear-gradient(90deg, ${dim.color} 0%, transparent 100%)` }}></div>
                          <div className="mrc-header">
                            <div className="mrc-header-left">
                              <span className="mrc-rank-pill" style={{ backgroundColor: dim.color }}>
                                Rank {rankNum}
                              </span>
                              <h4 className="mrc-title">{dim.fullName}</h4>
                            </div>
                            <div className="mrc-header-right">
                              <div className="mrc-score-box">
                                <span className="mrc-score-val" style={{ color: dim.color }}>{dim.percentage}</span>
                                <span className="mrc-score-pct">%</span>
                              </div>
                              <span className="mrc-score-label">Match Score</span>
                            </div>
                          </div>
                          <div className="mrc-body">
                            <div className="mrc-measures-col">
                              <div className="mrc-section-head">
                                <Activity size={16} style={{ color: dim.color }} />
                                <h5>Core Measures</h5>
                              </div>
                              <p className="mrc-measures-text">{dim.measures}</p>
                              <div className="mrc-progress-container">
                                <div className="mrc-progress-track">
                                  <div 
                                    className="mrc-progress-fill" 
                                    style={{ 
                                      width: `${Math.max(dim.percentage, 4)}%`, 
                                      backgroundColor: dim.color,
                                      boxShadow: `0 0 10px ${dim.color}80` 
                                    }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                            <div className="mrc-analysis-col">
                              <div className="mrc-section-head">
                                <Star size={16} style={{ color: dim.color }} />
                                <h5>Behavioral Analysis</h5>
                              </div>
                              <ul className="mrc-bullet-list">
                                {dim.descriptions && dim.descriptions.map((desc, idx) => (
                                  <li key={idx}>
                                    <div className="mrc-bullet-icon" style={{ backgroundColor: `${dim.color}20`, color: dim.color }}>
                                      <CheckCircle2 size={14} />
                                    </div>
                                    <span className="mrc-bullet-text">{desc}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Printable Question List */}
                <div className="pdf-questions-list">
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem', color: '#1A2634' }}>
                    Responses Breakdown (All 30 Questions)
                  </h4>
                  {(submissionResult?.responses || DEFAULT_30_QUESTIONS).map((item, idx) => {
                    const qNum = item.order || (idx + 1);
                    const dim = getDimensionForQuestionNumber(qNum);
                    return (
                      <div key={idx} className="pdf-question-item">
                        <div className="pdf-q-header flex justify-between items-center">
                          <span className="pdf-q-num">
                            Q{qNum}. {dim.fullName}
                            {isReverseQuestion(qNum) && (
                              <span className="pdf-reverse-tag"> (Reverse-Scored)</span>
                            )}
                          </span>
                          <span className="pdf-status-badge status-correct">
                            {item.marksObtained || 3} Marks Awarded
                          </span>
                        </div>
                        <div className="pdf-q-text">{item.questionText || item.question}</div>
                        <div className="pdf-q-ans-box">
                          <div className="pdf-ans-row">
                            <span className="pdf-label">Selected Option:</span>
                            <span className="pdf-val text-correct">
                              {item.selectedOption || 'Neutral'} ({item.marksObtained || 3} Marks)
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
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
