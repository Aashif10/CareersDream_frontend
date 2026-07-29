import { Link } from 'react-router-dom';
import { BookOpen, Compass, Award, Globe, Code, PenTool, CheckCircle } from 'lucide-react';
import './Courses.css';

const Courses = () => {
  const programs = [
    {
      title: "Career Discovery Program",
      duration: "2 Weeks",
      for: "Class 8–10 Students",
      points: ["Self-discovery", "Career exploration", "Goal setting", "Understanding options", "Future planning"],
      icon: <Compass />
    },
    {
      title: "Stream Selection Program",
      duration: "1 Week",
      for: "Class 10 Students",
      points: ["Science vs Commerce vs Arts", "Subject selection", "Future opportunities", "Parent guidance", "Career roadmap"],
      icon: <BookOpen />
    },
    {
      title: "Career Planning Program",
      duration: "4 Weeks",
      for: "Class 11, 12 & College Students",
      points: ["Career mapping", "Industry trends", "Decision-making", "Long-term planning", "Action plan creation"],
      icon: <TargetIcon />
    },
    {
      title: "Psychometric Assessment",
      duration: "Self-paced",
      for: "All Students",
      points: ["Personality Assessment", "Interest Assessment", "Aptitude Assessment", "Learning Style", "Recommendation Report"],
      icon: <Award />
    },
    {
      title: "College Admission Guidance",
      duration: "Ongoing",
      for: "Class 12 & Graduates",
      points: ["College Selection", "Course Selection", "University Comparison", "Application Guidance", "Admission Strategy"],
      icon: <BookOpen />
    },
    {
      title: "Study Abroad Guidance",
      duration: "Ongoing",
      for: "High School & College",
      points: ["Country Selection", "University Selection", "SOP & LOR Guidance", "Visa Assistance", "Scholarships"],
      icon: <Globe />
    },
    {
      title: "Skill Development Program",
      duration: "4-8 Weeks",
      for: "All Students",
      points: ["Communication Skills", "Leadership", "Critical Thinking", "Time Management", "Problem Solving"],
      icon: <CheckCircle />
    },
    {
      title: "Digital Skills Program",
      duration: "4 Weeks",
      for: "All Students",
      points: ["MS Office", "AI Tools", "Digital Marketing", "Data Analysis Basics", "Cyber Safety"],
      icon: <Code />
    },
    {
      title: "Resume & Interview Prep",
      duration: "2 Weeks",
      for: "College Students & Grads",
      points: ["Resume Writing", "LinkedIn Profile", "HR Interview", "Technical Interview", "Mock Interviews"],
      icon: <PenTool />
    }
  ];

  return (
    <div className="courses-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container text-center animate-fade-in">
          <h1 className="heading-primary text-white">Transform Your Future with Expert Programs</h1>
          <p className="subheading text-white">Explore our carefully designed courses that help students build the right skills, choose the right career, and achieve academic and professional success.</p>
        </div>
      </section>

      {/* Course Catalog */}
      <section className="section-padding container">
        <div className="grid grid-cols-3 gap-8">
          {programs.map((program, idx) => (
            <div key={idx} className="course-card">
              <div className="course-icon">{program.icon}</div>
              <h3>{program.title}</h3>
              <div className="course-meta">
                <span><strong>Duration:</strong> {program.duration}</span>
                <span><strong>Best For:</strong> {program.for}</span>
              </div>
              <ul className="course-points">
                {program.points.map((point, i) => (
                  <li key={i}><CheckCircle size={14} className="icon-maize" /> {point}</li>
                ))}
              </ul>
              <button className="btn btn-outline full-width mt-4">Enroll Now</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// Dummy icon component for Target since it wasn't imported from lucide-react in this file but used above.
function TargetIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
  );
}

export default Courses;
