import { Link } from 'react-router-dom';
import { Target, Lightbulb, Heart, Shield, Users, BookOpen, Star } from 'lucide-react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container text-center animate-fade-in">
          <h1 className="heading-primary text-white">About CareersDream</h1>
          <p className="subheading text-white">Empowering students to make confident career decisions through expert guidance, personalized counseling, and future-focused learning.</p>
        </div>
      </section>

      {/* Who We Are & Our Story */}
      <section className="section-padding container">
        <div className="grid grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="heading-secondary">Helping Students Turn Dreams into Careers</h2>
            <p>At CareersDream, we believe that every student has unique talents, interests, and aspirations. Choosing the right career is one of the most important decisions in life, and we are committed to making that journey easier, more informed, and more successful.</p>
            <p>Our platform provides career counseling, psychometric assessments, college and course guidance, skill development programs, and mentorship to help students discover the career path that best matches their abilities and goals.</p>
          </div>
          <div className="story-box bg-light">
            <h3>Our Story</h3>
            <p>Every great career begins with the right guidance.</p>
            <p>CareersDream was founded with a simple mission—to bridge the gap between students' aspirations and the ever-changing world of education and careers. Many students face confusion when choosing subjects, colleges, or career paths due to limited awareness and lack of professional guidance.</p>
            <p>Recognizing this challenge, CareersDream was created to provide reliable, unbiased, and personalized career counseling.</p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision section-padding bg-dark text-center">
        <div className="container grid grid-cols-2 gap-8">
          <div className="card-dark">
            <Target size={48} className="icon-maize mb-4 mx-auto" />
            <h3 className="text-champagne">Our Mission</h3>
            <p>To empower every student with the knowledge, confidence, and guidance needed to choose the right career and achieve lifelong success.</p>
          </div>
          <div className="card-dark">
            <Lightbulb size={48} className="icon-maize mb-4 mx-auto" />
            <h3 className="text-champagne">Our Vision</h3>
            <p>To become India's most trusted career counseling platform, helping millions of students build meaningful and successful careers.</p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="core-values section-padding container">
        <h2 className="heading-secondary text-center">Our Core Values</h2>
        <div className="grid grid-cols-3 gap-8 mt-8">
          {[
            { icon: <Heart />, title: 'Student First', desc: 'Every decision we make is focused on helping students succeed.' },
            { icon: <Shield />, title: 'Integrity', desc: 'We provide honest, transparent, and unbiased career guidance.' },
            { icon: <Star />, title: 'Excellence', desc: 'We strive to deliver high-quality counseling and educational services.' },
            { icon: <Lightbulb />, title: 'Innovation', desc: 'We continuously adopt new tools and technologies to improve career guidance.' },
            { icon: <Users />, title: 'Collaboration', desc: 'We work closely with students, parents, schools, and industry experts.' },
            { icon: <BookOpen />, title: 'Lifelong Learning', desc: 'We encourage continuous growth, adaptability, and skill development.' }
          ].map((val, idx) => (
            <div key={idx} className="value-card text-center">
              <div className="icon-wrapper mx-auto mb-4">{val.icon}</div>
              <h3>{val.title}</h3>
              <p>{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta section-padding text-center">
        <div className="container">
          <h2 className="heading-secondary">Ready to Build Your Future?</h2>
          <p className="subheading">Take the first step toward a successful career with expert guidance from CareersDream.</p>
          <div className="hero-buttons justify-center">
            <Link to="/contact" className="btn btn-primary">Book Free Counseling</Link>
            <Link to="/contact" className="btn btn-secondary">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
