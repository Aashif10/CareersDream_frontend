import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Calculator, 
  Atom, 
  FlaskConical, 
  Dna, 
  Globe, 
  Cpu, 
  Sparkles, 
  Brain, 
  Award, 
  CheckCircle,
  FileText,
  HelpCircle,
  Lock
} from 'lucide-react';
import './assessment.css';

const classTabs = [
  { id: 'class1', title: 'Class 1', desc: 'Primary Foundation' },
  { id: 'class2', title: 'Class 2', desc: 'Primary Foundation' },
  { id: 'class3', title: 'Class 3', desc: 'Elementary Skills' },
  { id: 'class4', title: 'Class 4', desc: 'Elementary Skills' },
  { id: 'class5', title: 'Class 5', desc: 'Intermediate Logic' },
  { id: 'class6', title: 'Class 6', desc: 'Middle School Science & Math' },
  { id: 'class7', title: 'Class 7', desc: 'Middle School Science & Math' },
  { id: 'class8', title: 'Class 8', desc: 'Pre-Secondary Orientation' },
  { id: 'class9-10', title: 'Class 9 - 10', desc: 'Stream Selector & Board Prep' },
  { id: 'class11-12', title: 'Class 11 - 12', desc: 'Career & Stream Evaluator' },
  { id: 'personality', title: 'Psychometric & Personality Test', desc: 'Common Behavioral & Aptitude Assessment for All Students' }
];

const subjectData = {
  class1: [
    { name: 'English', icon: <BookOpen size={24} />, desc: 'Grammar, Phonics, Storytelling & Vocabulary', tag: 'Language' },
    { name: 'Mathematics', icon: <Calculator size={24} />, desc: 'Basic Numbers, Shapes, Counting & Addition', tag: 'Numeracy' },
    { name: 'Environmental Science (EVS)', icon: <Globe size={24} />, desc: 'Nature, Plants, Animals & My Body', tag: 'Science' },
    { name: 'General Knowledge', icon: <Sparkles size={24} />, desc: 'Fun Facts, World Trivia & Visual Puzzles', tag: 'Aptitude' }
  ],
  class2: [
    { name: 'English', icon: <BookOpen size={24} />, desc: 'Grammar Rules, Reading Passages & Writing', tag: 'Language' },
    { name: 'Mathematics', icon: <Calculator size={24} />, desc: 'Addition, Subtraction, Patterns & Measurements', tag: 'Numeracy' },
    { name: 'Environmental Science (EVS)', icon: <Globe size={24} />, desc: 'Seasons, Transport, Safety & Environment', tag: 'Science' },
    { name: 'General Knowledge', icon: <Sparkles size={24} />, desc: 'World Facts, Mind Games & Aptitude', tag: 'Aptitude' }
  ],
  class3: [
    { name: 'English', icon: <BookOpen size={24} />, desc: 'Comprehension, Nouns, Verbs & Creative Writing', tag: 'Language' },
    { name: 'Mathematics', icon: <Calculator size={24} />, desc: 'Multiplication, Division, Time & Geometry', tag: 'Math' },
    { name: 'Science', icon: <Atom size={24} />, desc: 'Living Things, Matter, Forces & Solar System', tag: 'Science' },
    { name: 'Social Studies', icon: <Globe size={24} />, desc: 'Community, Our Country, Maps & History Basics', tag: 'Social' },
    { name: 'Computer Basics', icon: <Cpu size={24} />, desc: 'Parts of Computer, Paint & Keyboard Skills', tag: 'Tech' }
  ],
  class4: [
    { name: 'English', icon: <BookOpen size={24} />, desc: 'Advanced Grammar, Story Writing & Speaking Skills', tag: 'Language' },
    { name: 'Mathematics', icon: <Calculator size={24} />, desc: 'Fractions, Decimals, Perimeter & Area', tag: 'Math' },
    { name: 'Science', icon: <Atom size={24} />, desc: 'Human Body Systems, Food & Energy', tag: 'Science' },
    { name: 'Social Studies', icon: <Globe size={24} />, desc: 'Indian Geography, Heritage & Local Civics', tag: 'Social' },
    { name: 'Computer Science', icon: <Cpu size={24} />, desc: 'MS Office Basics, Internet Safety & Digital Literacy', tag: 'Tech' }
  ],
  class5: [
    { name: 'English', icon: <BookOpen size={24} />, desc: 'Reading Comprehension, Vocabulary & Essays', tag: 'Language' },
    { name: 'Mathematics', icon: <Calculator size={24} />, desc: 'Large Numbers, Factors, Multiples & Geometry', tag: 'Math' },
    { name: 'Science', icon: <Atom size={24} />, desc: 'Ecosystems, Simple Machines, Matter & Energy', tag: 'Science' },
    { name: 'Social Studies', icon: <Globe size={24} />, desc: 'World Geography, Freedom Struggle & Climate', tag: 'Social' },
    { name: 'Computer & Logic', icon: <Cpu size={24} />, desc: 'Basic Algorithm Logic, Scratch & Cyber Safety', tag: 'Tech' }
  ],
  class6: [
    { name: 'English', icon: <BookOpen size={24} />, desc: 'Prose, Poetry, Grammar & Speech Preparation', tag: 'Language' },
    { name: 'Mathematics', icon: <Calculator size={24} />, desc: 'Integers, Algebra Intro, Ratio & Proportion', tag: 'Math' },
    { name: 'Physics', icon: <Atom size={24} />, desc: 'Motion, Distances, Light, Shadow & Electricity', tag: 'Physics' },
    { name: 'Chemistry', icon: <FlaskConical size={24} />, desc: 'Fibre to Fabric, Sorting Materials & Separation', tag: 'Chemistry' },
    { name: 'Biology', icon: <Dna size={24} />, desc: 'Food Sources, Components of Food & Body Movements', tag: 'Biology' },
    { name: 'Social Science', icon: <Globe size={24} />, desc: 'Ancient History, Earth Orbit & Panchayati Raj', tag: 'Social' },
    { name: 'Computer Science', icon: <Cpu size={24} />, desc: 'Coding Logic, Block Programming & HTML Basics', tag: 'Tech' }
  ],
  class7: [
    { name: 'English', icon: <BookOpen size={24} />, desc: 'Grammar, Analytical Reading & Formal Writing', tag: 'Language' },
    { name: 'Mathematics', icon: <Calculator size={24} />, desc: 'Fractions, Decimals, Equations & Triangles', tag: 'Math' },
    { name: 'Physics', icon: <Atom size={24} />, desc: 'Heat, Electric Current, Light & Motion', tag: 'Physics' },
    { name: 'Chemistry', icon: <FlaskConical size={24} />, desc: 'Acids, Bases, Salts, Chemical Changes & Water', tag: 'Chemistry' },
    { name: 'Biology', icon: <Dna size={24} />, desc: 'Nutrition in Plants & Animals, Respiration & Transport', tag: 'Biology' },
    { name: 'Social Science', icon: <Globe size={24} />, desc: 'Medieval History, Atmosphere & Democracy', tag: 'Social' }
  ],
  class8: [
    { name: 'English', icon: <BookOpen size={24} />, desc: 'Advanced Literature, Speech, Debate & Essays', tag: 'Language' },
    { name: 'Mathematics', icon: <Calculator size={24} />, desc: 'Rational Numbers, Factorisation, Mensuration & Graphs', tag: 'Math' },
    { name: 'Physics', icon: <Atom size={24} />, desc: 'Force, Pressure, Friction, Sound & Chemical Currents', tag: 'Physics' },
    { name: 'Chemistry', icon: <FlaskConical size={24} />, desc: 'Synthetic Fibres, Metals, Non-metals, Combustion & Flame', tag: 'Chemistry' },
    { name: 'Biology', icon: <Dna size={24} />, desc: 'Crop Production, Microorganisms & Conservation', tag: 'Biology' },
    { name: 'Social Science', icon: <Globe size={24} />, desc: 'Modern History, Resources, Agriculture & Judiciary', tag: 'Social' },
    { name: 'Computer & AI', icon: <Cpu size={24} />, desc: 'App Development, Database Concepts & AI Basics', tag: 'Tech' }
  ],
  'class9-10': [
    { name: 'English', icon: <BookOpen size={24} />, desc: 'CBSE/ICSE Literature, Formal Discursive Writing & Grammar', tag: 'Language' },
    { name: 'Mathematics', icon: <Calculator size={24} />, desc: 'Polynomials, Quadratic Equations, Trigonometry & Coordinate Geometry', tag: 'Math' },
    { name: 'Physics', icon: <Atom size={24} />, desc: 'Laws of Motion, Gravitation, Work & Energy, Light Reflection & Electricity', tag: 'Physics' },
    { name: 'Chemistry', icon: <FlaskConical size={24} />, desc: 'Chemical Equations, Periodic Table, Carbon Compounds, Acids & Bases', tag: 'Chemistry' },
    { name: 'Biology', icon: <Dna size={24} />, desc: 'Life Processes, Control & Coordination, Reproduction, Genetics & Heredity', tag: 'Biology' },
    { name: 'Social Science', icon: <Globe size={24} />, desc: 'Rise of Nationalism, Resources, Economics & Indian Polity', tag: 'Social' }
  ],
  'class11-12': [
    { name: 'Physics', icon: <Atom size={24} />, desc: 'Kinematics, Thermodynamics, Electromagnetism, Optics & Modern Physics', tag: 'Physics' },
    { name: 'Chemistry', icon: <FlaskConical size={24} />, desc: 'Physical Chemistry, Organic Synthesis, Inorganic Elements & Solutions', tag: 'Chemistry' },
    { name: 'Mathematics', icon: <Calculator size={24} />, desc: 'Differential Calculus, Integral Calculus, Vectors, Matrices & Probability', tag: 'Math' },
    { name: 'Biology', icon: <Dna size={24} />, desc: 'Cellular Biology, Human Physiology, Genetics, Biotechnology & Ecology', tag: 'Biology' },
    { name: 'Accountancy & Commerce', icon: <FileText size={24} />, desc: 'Financial Accounting, Partnership Accounts, Business Studies & Economics', tag: 'Commerce' },
    { name: 'Computer Science (Python)', icon: <Cpu size={24} />, desc: 'Python Programming, Data Structures, SQL Databases & Networking', tag: 'Tech' }
  ],
  personality: [
    { name: 'Holland Code (RIASEC) Test', icon: <Brain size={24} />, desc: 'Evaluates Realistic, Investigative, Artistic, Social, Enterprising & Conventional profiles', tag: 'Personality' },
    { name: 'Big Five Personality Profile', icon: <Sparkles size={24} />, desc: 'Maps Openness, Conscientiousness, Extraversion, Agreeableness & Emotional Stability', tag: 'Psychometric' },
    { name: 'Cognitive & Aptitude Evaluator', icon: <Award size={24} />, desc: 'Tests numerical reasoning, spatial awareness, verbal logic & abstract problem solving', tag: 'Aptitude' },
    { name: 'Learning Style Assessment', icon: <BookOpen size={24} />, desc: 'Determines visual, auditory, kinesthetic, and reading/writing learning preferences', tag: 'Learning' },
    { name: 'Stream & Career Compatibility', icon: <Globe size={24} />, desc: 'Correlates behavioral traits with top high-demand career fields and academic pathways', tag: 'Career' }
  ]
};

const Assessment = () => {
  const [selectedTab, setSelectedTab] = useState('class1');

  const currentSubjects = subjectData[selectedTab] || subjectData['class1'];

  return (
    <div className="assessment-page">
      {/* Main Class Tabs & Subject Cards Section */}
      <section className="assessment-section container">
        <div className="text-center mb-4">
          <h2 className="heading-secondary">Class-wise Academic & Subject Assessment</h2>
          <p className="subheading assessment-subheading">Select your class level below to explore subject assessment cards</p>
        </div>
        
        {/* Personality & Psychometric Test Banner */}
        {classTabs.filter(t => t.id === 'personality').map((tab) => (
          <div key={tab.id} className="personality-banner-wrapper">
            <Link
              to="/assessment1"
              className="class-tab-pill personality-tab full-width-tab"
            >
              <div className="banner-icon-badge">
                <Brain size={22} className="tab-icon" />
              </div>
              <div className="banner-content">
                <span className="tab-title">{tab.title}</span>
                <span className="tab-divider">|</span>
                <span className="tab-badge">{tab.desc}</span>
              </div>
              <span className="banner-action-pill">Explore Test →</span>
            </Link>
          </div>
        ))}

        {/* Class Selection Tabs Container */}
        <div className="class-tabs-container mb-8">
          <div className="class-tabs-grid">
            {classTabs.filter(t => t.id !== 'personality').map((tab) => (
              <button
                key={tab.id}
                className={`class-tab-pill ${selectedTab === tab.id ? 'active' : ''}`}
                onClick={() => setSelectedTab(tab.id)}
              >
                <span className="tab-title">{tab.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Active Class Title */}
        <div className="class-active-header mb-6">
          <h3 className="class-active-title">
            {classTabs.find(t => t.id === selectedTab)?.title} Subjects
          </h3>
          <p className="class-active-desc">
            {classTabs.find(t => t.id === selectedTab)?.desc}
          </p>
        </div>

        {/* Subject Cards Grid */}
        <div className="subject-cards-grid grid grid-cols-3 gap-6 mb-12">
          {currentSubjects.map((sub, idx) => (
            <div key={idx} className="subject-card subject-card-locked">
              {/* Lock Overlay */}
              <div className="subject-lock-overlay">
                <div className="subject-lock-icon">
                  <Lock size={28} />
                </div>
              </div>
              <div className="subject-card-header flex items-center justify-between mb-4">
                <div className="subject-icon-box">{sub.icon}</div>
                <span className="subject-tag">{sub.tag}</span>
              </div>
              <h3 className="subject-name">{sub.name}</h3>
              <p className="subject-desc">{sub.desc}</p>
              <div className="subject-card-footer mt-4">
                <span className="btn-subject-outline">Assessment Module</span>
              </div>
            </div>
          ))}
        </div>
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

export default Assessment;
