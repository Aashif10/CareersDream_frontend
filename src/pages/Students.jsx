import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, UserCheck, BookOpen, GraduationCap, Briefcase } from 'lucide-react';
import './Students.css';

const Students = () => {
  return (
    <div className="students-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container text-center animate-fade-in">
          <h1 className="heading-primary text-white">Your Dream Career Starts Here</h1>
          <p className="subheading text-white">Discover your strengths, explore career opportunities, and receive expert guidance to make informed decisions for a successful future.</p>
          <div className="hero-buttons justify-center">
            <Link to="/contact" className="btn btn-primary">Book Free Counseling</Link>
            <Link to="/courses" className="btn btn-secondary">Take Career Assessment</Link>
          </div>
        </div>
      </section>

      {/* Why CareersDream */}
      <section className="section-padding container text-center">
        <h2 className="heading-secondary">Why CareersDream?</h2>
        <p className="max-w-3xl mx-auto">
          Choosing a career can be overwhelming, but you don't have to do it alone. At CareersDream, we provide personalized guidance, scientific assessments, and expert mentorship to help you make the right career choices with confidence. Whether you're a school student, college student, or recent graduate, our programs are designed to help you achieve your academic and professional goals.
        </p>
      </section>

      {/* We Help Students With */}
      <section className="section-padding bg-light">
        <div className="container">
          <h2 className="heading-secondary text-center">We Help Students With</h2>
          <div className="grid grid-cols-2 gap-8 mt-8">
            <div className="help-card">
              <UserCheck className="icon-maize mb-4" size={32} />
              <h3>Career Confusion</h3>
              <p>Not sure which career is right for you? Our experts help you identify the best path based on your interests and strengths.</p>
            </div>
            <div className="help-card">
              <BookOpen className="icon-maize mb-4" size={32} />
              <h3>Stream Selection</h3>
              <p>Confused between Science, Commerce, Arts, or vocational courses? We help you choose the stream that aligns with your future goals.</p>
            </div>
            <div className="help-card">
              <GraduationCap className="icon-maize mb-4" size={32} />
              <h3>Course & College Selection</h3>
              <p>Explore the best colleges, universities, and courses in India and abroad based on your career aspirations.</p>
            </div>
            <div className="help-card">
              <Briefcase className="icon-maize mb-4" size={32} />
              <h3>Competitive Exam Guidance</h3>
              <p>Get guidance for exams like JEE, NEET, CUET, CLAT, CAT, GATE, UPSC, SSC, Banking, NDA.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Student Journey */}
      <section className="journey-section section-padding bg-dark text-white">
        <div className="container">
          <h2 className="heading-secondary text-white text-center">Your Journey to Success</h2>
          <div className="journey-timeline">
            <div className="journey-step">
              <div className="step-num">1</div>
              <div>
                <h4>Create Account</h4>
                <p>Register on CareersDream</p>
              </div>
            </div>
            <div className="journey-connector"></div>
            <div className="journey-step">
              <div className="step-num">2</div>
              <div>
                <h4>Assessment</h4>
                <p>Complete Career Assessment</p>
              </div>
            </div>
            <div className="journey-connector"></div>
            <div className="journey-step">
              <div className="step-num">3</div>
              <div>
                <h4>Counseling</h4>
                <p>Meet Your Career Expert</p>
              </div>
            </div>
            <div className="journey-connector"></div>
            <div className="journey-step">
              <div className="step-num">4</div>
              <div>
                <h4>Roadmap</h4>
                <p>Receive Personalized Report</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta section-padding text-center">
        <div className="container">
          <h2 className="heading-secondary">Ready to Shape Your Future?</h2>
          <p className="subheading">Take the first step toward your dream career with expert guidance from CareersDream.</p>
          <div className="hero-buttons justify-center">
            <Link to="/contact" className="btn btn-primary">Book Free Counseling</Link>
            <Link to="/register" className="btn btn-secondary">Register Now</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Students;
