import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const SERVICES = [
  'Landing Pages', 'Brand Websites', 'E-commerce', 'SaaS Products',
  'Portfolio Sites', 'Framer Builds', 'React SPAs', 'UI/UX Design',
  'Landing Pages', 'Brand Websites', 'E-commerce', 'SaaS Products',
  'Portfolio Sites', 'Framer Builds', 'React SPAs', 'UI/UX Design',
];

const BUDGETS = [
  'Under ₹50,000',
  '₹50,000 – ₹1,50,000',
  '₹1,50,000 – ₹5,00,000',
  '₹5,00,000+',
  'Let\'s talk',
];

// Staggered word reveal for the contact headline
function ContactHeadline({ inView }) {
  const words = [
    { text: "Let's", weight: 300 },
    { text: 'make', weight: 300 },
    { text: 'something', weight: 300 },
    { text: 'great', weight: 600 },
    { text: 'together.', weight: 600 },
  ];

  return (
    <h2 className="contact-headline" style={{ overflow: 'hidden' }}>
      {words.map((w, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.22em' }}>
          <motion.span
            style={{ display: 'inline-block', fontWeight: w.weight }}
            initial={{ y: '110%' }}
            animate={inView ? { y: '0%' } : {}}
            transition={{
              duration: 0.7,
              delay: 0.15 + i * 0.07,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {w.text}
          </motion.span>
        </span>
      ))}
    </h2>
  );
}

function ArrowRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="13 6 19 12 13 18" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function Contact() {
  const ref = useRef(null);
  const headlineRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const headlineInView = useInView(headlineRef, { once: true, margin: '-40px' });

  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1100));
    setLoading(false);
    setSubmitted(true);
  };

  // Staggered form field entrance
  const formFieldVariants = {
    hidden: { opacity: 0, y: 22 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 + i * 0.07, duration: 0.65, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  return (
    <>
      {/* Services marquee */}
      <div className="services-marquee">
        <div className="services-marquee-inner">
          {SERVICES.map((s, i) => (
            <span className="services-marquee-item" key={i}>
              {s}
              <span className="services-marquee-sep" />
            </span>
          ))}
        </div>
      </div>

      <section id="contact" className="contact-section">
        <div className="contact-inner">
          {/* Left — copy */}
          <div ref={headlineRef}>
            <motion.p
              className="contact-label"
              initial={{ opacity: 0 }}
              animate={headlineInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              Build with us
            </motion.p>

            <ContactHeadline inView={headlineInView} />

            <motion.p
              className="contact-sub"
              initial={{ opacity: 0, y: 16 }}
              animate={headlineInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              Whether you need a landing page, a full brand website, or a complex web app — I partner with founders and teams who care about craft.
            </motion.p>

            <motion.div
              className="contact-details"
              initial={{ opacity: 0 }}
              animate={headlineInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.75 }}
            >
              <div className="contact-detail-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <a href="mailto:hello@aryadevaskar.com">hello@aryadevaskar.com</a>
              </div>
              <div className="contact-detail-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span>Bangalore, India · Available globally</span>
              </div>
            </motion.div>
          </div>

          {/* Right — form */}
          <motion.div ref={ref}>
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  className="form-success"
                  initial={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                >
                  <motion.div
                    className="success-icon"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.15, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                  >
                    <CheckIcon />
                  </motion.div>
                  <div style={{ overflow: 'hidden' }}>
                    <motion.h3
                      className="success-title"
                      initial={{ y: '100%' }}
                      animate={{ y: '0%' }}
                      transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                      Message <strong>received.</strong>
                    </motion.h3>
                  </div>
                  <motion.p
                    className="success-text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    Thanks for reaching out. I'll review your project details and get back to you within 24 hours.
                  </motion.p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  className="contact-form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Name + Email row */}
                  <motion.div
                    className="form-row"
                    custom={0}
                    variants={formFieldVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                  >
                    <div className="form-group" style={{ borderRight: '1px solid rgba(255,255,255,0.06)', paddingRight: '20px', marginRight: '20px' }}>
                      <label className="form-label" htmlFor="name">Full name</label>
                      <input id="name" name="name" className="form-input" type="text" placeholder="Your name" value={form.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="email">Email</label>
                      <input id="email" name="email" className="form-input" type="email" placeholder="you@company.com" value={form.email} onChange={handleChange} required />
                    </div>
                  </motion.div>

                  <motion.div className="form-group" custom={1} variants={formFieldVariants} initial="hidden" animate={inView ? "visible" : "hidden"}>
                    <label className="form-label" htmlFor="company">Company / Project</label>
                    <input id="company" name="company" className="form-input" type="text" placeholder="What are you building?" value={form.company} onChange={handleChange} />
                  </motion.div>

                  <motion.div className="form-group" custom={2} variants={formFieldVariants} initial="hidden" animate={inView ? "visible" : "hidden"}>
                    <label className="form-label" htmlFor="service">What do you need?</label>
                    <select id="service" name="service" className="form-select form-input" value={form.service} onChange={handleChange} required>
                      <option value="" disabled>Select a service</option>
                      <option>Landing Page</option>
                      <option>Brand Website</option>
                      <option>SaaS / Product Site</option>
                      <option>E-commerce</option>
                      <option>Portfolio Site</option>
                      <option>Web App (React)</option>
                      <option>Other</option>
                    </select>
                  </motion.div>

                  <motion.div className="form-group" custom={3} variants={formFieldVariants} initial="hidden" animate={inView ? "visible" : "hidden"}>
                    <label className="form-label" htmlFor="budget">Budget range</label>
                    <select id="budget" name="budget" className="form-select form-input" value={form.budget} onChange={handleChange}>
                      <option value="" disabled>Select a range</option>
                      {BUDGETS.map(b => <option key={b}>{b}</option>)}
                    </select>
                  </motion.div>

                  <motion.div className="form-group" custom={4} variants={formFieldVariants} initial="hidden" animate={inView ? "visible" : "hidden"}>
                    <label className="form-label" htmlFor="message">Tell me about your project</label>
                    <textarea id="message" name="message" className="form-textarea" placeholder="Timeline, goals, anything else relevant..." value={form.message} onChange={handleChange} required />
                  </motion.div>

                  <motion.div
                    className="form-submit"
                    custom={5}
                    variants={formFieldVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                  >
                    <motion.button
                      type="submit"
                      className="submit-btn"
                      id="contact-submit"
                      disabled={loading}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    >
                      {loading ? (
                        <motion.span
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          style={{ display: 'flex', alignItems: 'center', gap: 10 }}
                        >
                          <LoadingDots />
                        </motion.span>
                      ) : (
                        <motion.span
                          key="idle"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          style={{ display: 'flex', alignItems: 'center', gap: 12 }}
                        >
                          Send message <ArrowRight />
                        </motion.span>
                      )}
                    </motion.button>
                    <span className="submit-note">Usually reply<br />within 24 hours</span>
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </>
  );
}

function LoadingDots() {
  return (
    <span style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
      Sending
      {[0, 1, 2].map(i => (
        <motion.span
          key={i}
          style={{ width: 4, height: 4, borderRadius: '50%', background: '#080808', display: 'inline-block' }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.18 }}
        />
      ))}
    </span>
  );
}
