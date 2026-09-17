import { Link } from 'react-router-dom';
import { Building, Users, BookOpen, Presentation, CheckCircle, Target, Briefcase, GraduationCap, ArrowRight } from 'lucide-react';
import './Schools.css';

const Schools = () => {
  return (
    <div className="schools-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container text-center animate-fade-in">
          <h1 className="heading-primary text-white">Empowering Schools to Build Future-Ready Students</h1>
          <p className="subheading text-white max-w-3xl mx-auto">Partner with CareersDream to provide expert career counseling, psychometric assessments, skill development, and career awareness programs that help students make informed decisions about their future.</p>
          <div className="hero-buttons justify-center">
            <Link to="/contact" className="btn btn-primary">Partner With Us</Link>
            <Link to="/contact" className="btn btn-secondary">Schedule a Meeting</Link>
          </div>
        </div>
      </section>

      {/* About Our School Program */}
      <section className="section-padding container text-center">
        <h2 className="heading-secondary">About Our School Program</h2>
        <p className="max-w-3xl mx-auto mb-4">
          Every student deserves the opportunity to discover their strengths and make informed career decisions. At CareersDream, we collaborate with schools to provide comprehensive career guidance programs that prepare students for higher education and successful careers.
        </p>
        <p className="max-w-3xl mx-auto">
          Our customized solutions are designed for students from Class 8 to Class 12, helping them explore career options, understand their abilities, and develop the skills needed for the future.
        </p>
      </section>

      {/* Why Partner with Us */}
      <section className="section-padding bg-light">
        <div className="container">
          <h2 className="heading-secondary text-center">Why Partner with CareersDream?</h2>
          <div className="grid grid-cols-3 gap-8 mt-8">
            {[
              { icon: <Users />, title: 'Expert Career Counselors', desc: 'Our certified counselors provide personalized career guidance based on each student\'s interests, aptitude, and aspirations.' },
              { icon: <Target />, title: 'Scientific Assessments', desc: 'Students receive detailed assessments that evaluate their personality, aptitude, interests, and learning styles.' },
              { icon: <Presentation />, title: 'Career Awareness', desc: 'Interactive seminars and workshops introduce students to emerging careers, industry trends, and educational opportunities.' },
              { icon: <Briefcase />, title: 'Skill Development', desc: 'We help students build essential life and professional skills, including communication, leadership, and problem-solving.' },
              { icon: <Users />, title: 'Parent Engagement', desc: 'Parents receive guidance on supporting their children\'s educational and career decisions through dedicated sessions.' },
              { icon: <Building />, title: 'Customized Solutions', desc: 'Our programs are tailored to meet the unique needs of each school, ensuring maximum impact for students.' }
            ].map((feature, idx) => (
              <div key={idx} className="card text-center">
                <div className="icon-wrapper mx-auto mb-4">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services for Schools */}
      <section className="section-padding container">
        <h2 className="heading-secondary text-center">Our Services for Schools</h2>
        <div className="grid grid-cols-2 gap-8 mt-8">
          <div className="service-item" style={{ gap: '1.25rem' }}>
            <CheckCircle className="icon-maize mt-1" />
            <div>
              <h3>Career Counseling Sessions</h3>
              <p>Personalized one-on-one counseling sessions to help students identify suitable career paths based on their strengths and goals.</p>
            </div>
          </div>
          <div className="service-item" style={{ gap: '1.25rem' }}>
            <CheckCircle className="icon-maize mt-1" />
            <div>
              <h3>Psychometric Assessments</h3>
              <p>Comprehensive assessments covering Aptitude, Personality, Interests, Learning Style, and Career Preferences.</p>
            </div>
          </div>
          <div className="service-item" style={{ gap: '1.25rem' }}>
            <CheckCircle className="icon-maize mt-1" />
            <div>
              <h3>Career Guidance Workshops</h3>
              <p>Interactive sessions on Career Planning, Stream Selection, Future Skills, Emerging Careers, and Goal Setting.</p>
            </div>
          </div>
          <div className="service-item" style={{ gap: '1.25rem' }}>
            <CheckCircle className="icon-maize mt-1" />
            <div>
              <h3>Parent Counseling Programs</h3>
              <p>Dedicated sessions to help parents understand career opportunities, educational planning, and decision-making strategies.</p>
            </div>
          </div>
          <div className="service-item" style={{ gap: '1.25rem' }}>
            <CheckCircle className="icon-maize mt-1" />
            <div>
              <h3>Teacher Training Programs</h3>
              <p>Professional development workshops covering student mentoring, motivational techniques, and career guidance basics.</p>
            </div>
          </div>

          <div className="service-item" style={{ gap: '1.25rem' }}>
            <CheckCircle className="icon-maize mt-1" />
            <div>
              <h3>Skill Development & Career Fairs</h3>
              <p>Workshops on Communication, Leadership, and Digital Literacy. Fairs to interact with universities and industry experts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-dark text-white">
        <div className="container">
          <h2 className="heading-secondary text-white text-center">Benefits for Schools</h2>
          <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.55)', marginBottom: '2.5rem', fontSize: '1rem' }}>
            Everything your school gains by partnering with CareersDream
          </p>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            justifyContent: 'center',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            {[
              { label: 'Improved Career Awareness Among Students', icon: '🎯' },
              { label: 'Better Academic and Career Planning', icon: '📚' },
              { label: 'Increased Student Confidence', icon: '💪' },
              { label: 'Enhanced Parent Satisfaction', icon: '👨‍👩‍👧' },
              { label: 'Stronger School Reputation', icon: '🏆' },
              { label: 'Better Student Outcomes', icon: '📈' },
              { label: 'Professional Career Reports', icon: '📋' },
              { label: 'Customized Career Programs', icon: '⚙️' },
              { label: 'Online & Offline Delivery', icon: '🌐' },
              { label: 'Continuous Student Support', icon: '🤝' },
            ].map((benefit, idx) => (
              <div key={idx} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(212,175,55,0.3)',
                borderRadius: '50px',
                padding: '0.65rem 1.25rem',
                fontSize: '0.92rem',
                fontWeight: '500',
                color: '#fff',
                backdropFilter: 'blur(6px)',
                transition: 'all 0.2s ease',
                cursor: 'default',
                boxShadow: '0 2px 12px rgba(212,175,55,0.08)'
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(212,175,55,0.18)';
                  e.currentTarget.style.borderColor = 'rgba(212,175,55,0.7)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(212,175,55,0.2)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)';
                  e.currentTarget.style.boxShadow = '0 2px 12px rgba(212,175,55,0.08)';
                }}
              >
                <span style={{ fontSize: '1.1rem' }}>{benefit.icon}</span>
                <span>{benefit.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Our Process */}
      <section className="section-padding container text-center">
        <h2 className="heading-secondary">Our Process</h2>
        <div className="steps-container">
          {[
            { step: 1, title: 'School Consultation', desc: 'Understand your school\'s goals and student needs.' },
            { step: 2, title: 'Program Planning', desc: 'Design a customized career guidance program.' },
            { step: 3, title: 'Assessment & Workshops', desc: 'Conduct psychometric tests, workshops, and counseling sessions.' },
            { step: 4, title: 'Career Reports', desc: 'Provide personalized reports and recommendations for every student.' },
            { step: 5, title: 'Follow-Up Support', desc: 'Offer continuous guidance, mentoring, and progress tracking.' }
          ].map(item => (
            <div key={item.step} className="step-card bg-light text-dark-override">
              <div className="step-number">{item.step}</div>
              <h3 className="text-indigo">{item.title}</h3>
              <p className="text-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who Can Partner With Us */}
      <section className="section-padding bg-light text-center">
        <div className="container">
          <h2 className="heading-secondary">Who Can Partner With Us?</h2>
          <p className="mb-8">We work with a wide range of educational institutions, including:</p>
          <div className="tags-container">
            {['Government Schools', 'Private Schools', 'CBSE Schools', 'ICSE Schools', 'State Board Schools', 'International Schools', 'Residential Schools', 'Coaching Institutes', 'Junior Colleges', 'Educational Trusts'].map((tag, idx) => (
              <span key={idx} className="partner-tag">{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta section-padding text-center">
        <div className="container">
          <h2 className="heading-secondary">Ready to Empower Your Students?</h2>
          <p className="subheading">Partner with CareersDream today and build a future-ready school.</p>
          <div className="hero-buttons justify-center">
            <Link to="/contact" className="btn btn-primary">Partner With Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Schools;
