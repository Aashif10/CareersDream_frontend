import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, Star } from 'lucide-react';
import './Home.css';

const Home = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, [location]);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content animate-fade-in">
          <h1 className="heading-primary">Shape Your Future with the Right Career Guidance</h1>
          <p className="subheading">At CareersDream, we help students discover their strengths, explore career opportunities, and make informed decisions through expert Counselling, psychometric assessments, and personalized career planning.</p>
          <div className="hero-buttons">
            <Link to={isLoggedIn ? "/counselling" : "/register"} className="btn btn-primary">Get Started</Link>
          
            {showLoginModal && <AdminLoginModal onClose={() => setShowLoginModal(false)} />}
            <Link to="/contact" className="btn btn-secondary">Book Free Counselling</Link>
          </div>
          <div className="trusted-by">
            <p>Trusted By: Helping students, schools, and parents make smarter career decisions.</p>
            <div className="stats-mini">
              <span><strong>10,000+</strong> Students Guided</span>
              <span><strong>300+</strong> Schools Connected</span>
              <span><strong>100+</strong> Career Experts</span>
              <span><strong>95%</strong> Student Satisfaction</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section section-padding">
        <div className="container text-center">
          <h2 className="heading-secondary">Your Trusted Career Counselling Partner</h2>
          <p className="about-text">
            Choosing the right career is one of the most important decisions in life. CareersDream empowers students with personalized career guidance, expert mentorship, aptitude assessments, and skill development programs. Whether you are in school, college, or preparing for competitive exams, we help you choose the career path that matches your passion, abilities, and future goals.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-us section-padding bg-light">
        <div className="container">
          <h2 className="heading-secondary text-center">Why Students Choose Us</h2>
          <div className="grid grid-cols-3 gap-8">
            <div className="card">
              <h3>Personalized Career Guidance</h3>
              <p>Receive one-on-one Counselling sessions based on your interests, strengths, personality, and aspirations.</p>
            </div>
            <div className="card">
              <h3>Career Assessment</h3>
              <p>Scientifically designed psychometric tests to discover your ideal career path.</p>
            </div>
            <div className="card">
              <h3>Experienced Counselors</h3>
              <p>Our certified career experts provide practical advice backed by industry knowledge.</p>
            </div>
            <div className="card">
              <h3>College & Course Selection</h3>
              <p>Get expert assistance in selecting the best colleges, universities, and courses.</p>
            </div>
            <div className="card">
              <h3>Skill Development</h3>
              <p>Enhance communication, leadership, critical thinking, and employability skills.</p>
            </div>
            <div className="card">
              <h3>Continuous Mentorship</h3>
              <p>Stay connected with mentors throughout your academic and professional journey.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="services section-padding">
        <div className="container">
          <h2 className="heading-secondary text-center">Everything You Need to Build Your Career</h2>
          <div className="grid grid-cols-2 gap-8">
            <div className="service-item">
              <CheckCircle className="icon-maize" />
              <div>
                <h3>Career Counselling</h3>
                <p>Personalized guidance to help students identify the right career path.</p>
              </div>
            </div>
            <div className="service-item">
              <CheckCircle className="icon-maize" />
              <div>
                <h3>Psychometric Assessment</h3>
                <p>Understand your personality, aptitude, interests, and strengths.</p>
              </div>
            </div>
            <div className="service-item">
              <CheckCircle className="icon-maize" />
              <div>
                <h3>Career Planning</h3>
                <p>Create a clear roadmap for your academic and professional future.</p>
              </div>
            </div>
            <div className="service-item">
              <CheckCircle className="icon-maize" />
              <div>
                <h3>College Admission Guidance</h3>
                <p>Explore universities, eligibility, entrance exams, and admission processes.</p>
              </div>
            </div>
            <div className="service-item">
              <CheckCircle className="icon-maize" />
              <div>
                <h3>Competitive Exam Guidance</h3>
                <p>JEE • NEET • CUET • UPSC • SSC • CAT • GATE • Banking • NDA</p>
              </div>
            </div>
            <div className="service-item">
              <CheckCircle className="icon-maize" />
              <div>
                <h3>Resume & Interview Preparation</h3>
                <p>Build professional resumes and prepare for interviews with confidence.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="how-it-works section-padding bg-dark">
        <div className="container text-center">
          <h2 className="heading-secondary text-white">Your Career Journey in 5 Simple Steps</h2>
          <div className="steps-container">
            {[
              { step: 1, title: 'Register Your Account', desc: 'Create your CareersDream account in just a few minutes.' },
              { step: 2, title: 'Take Career Assessment', desc: 'Complete our scientifically designed aptitude and personality assessment.' },
              { step: 3, title: 'Meet Your Counselor', desc: 'Schedule a one-on-one Counselling session with our career expert.' },
              { step: 4, title: 'Receive Your Career Roadmap', desc: 'Get a personalized report with career recommendations and action plans.' },
              { step: 5, title: 'Achieve Your Dream Career', desc: 'Follow expert guidance, improve your skills, and achieve your goals.' }
            ].map(item => (
              <div key={item.step} className="step-card">
                <div className="step-number">{item.step}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials section-padding">
        <div className="container">
          <h2 className="heading-secondary text-center">Student Success Stories</h2>
          <div className="grid grid-cols-3 gap-8">
            <div className="testimonial-card">
              <p>"I was confused after Class 12. CareersDream helped me choose Computer Science based on my interests. Today I'm pursuing my dream course with confidence."</p>
              <h4>Riya Sharma</h4>
              <div className="stars"><Star/><Star/><Star/><Star/><Star/></div>
            </div>
            <div className="testimonial-card">
              <p>"The psychometric assessment and Counselling session gave me complete clarity about my future. Highly recommended!"</p>
              <h4>Aman Verma</h4>
              <div className="stars"><Star/><Star/><Star/><Star/><Star/></div>
            </div>
            <div className="testimonial-card">
              <p>"The counselors were supportive and explained every career option in detail. The experience was excellent."</p>
              <h4>Neha Gupta</h4>
              <div className="stars"><Star/><Star/><Star/><Star/><Star/></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta section-padding text-center">
        <div className="container">
          <h2 className="heading-secondary">Ready to Discover Your Dream Career?</h2>
          <p className="subheading">Take the first step toward a successful future with CareersDream. Connect with our expert counselors and receive personalized guidance tailored to your goals.</p>
          <div className="hero-buttons justify-center">
            <Link to="/contact" className="btn btn-primary">Book Free Counselling</Link>
            <Link to="/courses" className="btn btn-secondary">Explore Courses</Link>
            {/* Admin Button – opens login modal */}
            <Link to="/adminlogin" className="btn btn-admin">Admin</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
