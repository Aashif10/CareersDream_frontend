import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import './faq.css';

const faqs = [
  {
    question: 'How long does the full program take?',
    answer:
      'The core journey — assessment, counselling, and roadmap delivery — typically takes 4–6 weeks, with follow-up support continuing through the term.',
  },
  {
    question: 'Is this only available through schools?',
    answer:
      'No. While we partner with schools directly, individual families can also book independently through this page.',
  },
  {
    question: 'What age group is this for?',
    answer:
      'The program is designed specifically for students in Classes 8, 9, and 10.',
  },
  {
    question: 'Do parents need to attend every session?',
    answer:
      'Parents are required for the dedicated parent session and encouraged to stay involved throughout, but one-on-one counselling sessions are conducted privately with the student.',
  },
  {
    question: 'What happens after the roadmap is delivered?',
    answer:
      'Depending on your package, follow-up check-ins continue across the term or full year to track progress and adjust the plan as needed.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="faq-page">
      {/* Hero */}
      <section className="page-hero">
        <div className="container text-center animate-fade-in">
          <h1 className="heading-primary text-white">Frequently Asked Questions</h1>
          <p className="subheading" style={{ color: '#cbd5e1', maxWidth: '640px', margin: '0 auto' }}>
            Everything you need to know about our career counselling program. Can't find your answer? Feel free to reach out.
          </p>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="section-padding container">
        <div className="faq-wrapper">
          <div className="faq-header-row">
            <HelpCircle size={32} className="faq-header-icon" />
            <h2 className="heading-secondary" style={{ margin: 0 }}>Your Questions, Answered</h2>
          </div>

          <div className="faq-list">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className={`faq-item ${openIndex === idx ? 'faq-item--open' : ''}`}
              >
                <button
                  className="faq-question"
                  onClick={() => toggle(idx)}
                  aria-expanded={openIndex === idx}
                >
                  <span className="faq-q-number">{String(idx + 1).padStart(2, '0')}</span>
                  <span className="faq-q-text">{faq.question}</span>
                  <ChevronDown size={20} className="faq-chevron" />
                </button>
                <div className="faq-answer-wrapper">
                  <p className="faq-answer">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Still have questions CTA */}
        <div className="faq-cta">
          <h3>Still have questions?</h3>
          <p>Our counsellors are happy to help you get the clarity you need.</p>
          <a href="mailto:careersdream4u@gmail.com" className="faq-cta-btn">
            Email Us
          </a>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
