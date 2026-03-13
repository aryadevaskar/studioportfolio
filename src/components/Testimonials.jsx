import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const testimonials = [
  {
    id: 't1',
    index: '01',
    name: 'Jake Morrison',
    role: 'Founder, Promptly AI',
    location: 'San Francisco',
    quote: 'We needed a landing page fast before our Product Hunt launch. Delivered in 4 days and it looked better than sites we\'d seen from agencies charging 5× more.',
  },
  {
    id: 't2',
    index: '02',
    name: 'Priya Nair',
    role: 'CEO, Veda Organics',
    location: 'Mumbai',
    quote: 'Arya understood our brand from the very first call. The site doesn\'t just look beautiful — it actually converts. We saw a 40% uptick in inquiries within the first month.',
  },
  {
    id: 't3',
    index: '03',
    name: 'Luca Ferretti',
    role: 'Co-founder, Arc Studio',
    location: 'Milan',
    quote: 'Working on a portfolio site can feel personal and risky. Arya made it feel effortless — the final result was exactly what we had in our heads, but better.',
  },
  {
    id: 't4',
    index: '04',
    name: 'Anika Mehta',
    role: 'Head of Brand, Kasa Living',
    location: 'London',
    quote: 'The attention to typography and spacing alone set this apart from anything we\'d seen. Clean, considered, and unmistakably ours.',
  },
];

// Splits a string into words and animates each one up from a mask
function AnimatedQuote({ text, inView, baseDelay = 0 }) {
  const words = text.split(' ');
  return (
    <blockquote className="testimonial-quote">
      {words.map((word, i) => (
        <span
          key={i}
          style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.28em', verticalAlign: 'bottom' }}
        >
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '110%', opacity: 0 }}
            animate={inView ? { y: '0%', opacity: 1 } : {}}
            transition={{
              duration: 0.65,
              delay: baseDelay + i * 0.028,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </blockquote>
  );
}

function TestimonialItem({ t, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      className="testimonial-item"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.01 }}
    >
      {/* Left — meta */}
      <div className="testimonial-meta">
        <motion.span
          className="testimonial-index"
          initial={{ opacity: 0, x: -10 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {t.index}
        </motion.span>

        {/* Animated line under index */}
        <motion.div
          style={{ height: 1, background: 'var(--mid)', marginBottom: 16 }}
          initial={{ scaleX: 0, originX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />

        <motion.span
          className="testimonial-name"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.18, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          {t.name}
        </motion.span>

        <motion.span
          className="testimonial-role"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.26, duration: 0.5 }}
        >
          {t.role}
        </motion.span>

        <motion.span
          className="testimonial-location"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.32, duration: 0.5 }}
        >
          {t.location}
        </motion.span>
      </div>

      {/* Right — word-by-word quote */}
      <AnimatedQuote text={t.quote} inView={inView} baseDelay={0.08} />
    </motion.div>
  );
}

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section className="testimonials-section">
      <div className="testimonials-inner">
        <div style={{ overflow: 'hidden' }}>
          <motion.p
            ref={ref}
            className="section-label"
            initial={{ y: '100%', opacity: 0 }}
            animate={inView ? { y: '0%', opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            What our clients say
          </motion.p>
        </div>

        <div className="testimonial-list">
          {testimonials.map((t, i) => (
            <TestimonialItem key={t.id} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
