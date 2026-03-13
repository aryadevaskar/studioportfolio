import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const TICKER_ITEMS = [
  'Web Design', 'Brand Identity', 'Framer', 'UI/UX Design',
  'React', 'Webflow', 'Landing Pages', 'E-commerce', 'Motion Design',
  'Web Design', 'Brand Identity', 'Framer', 'UI/UX Design',
  'React', 'Webflow', 'Landing Pages', 'E-commerce', 'Motion Design',
];

// Split headline into word spans for staggered animation
function AnimatedHeadline({ children }) {
  // Matches the 2-line structure in the screenshot
  const lines = [
    { words: ['Your', 'brand', 'is', 'unique.'], strong: ['Your', 'brand', 'is', 'unique.'] },
    { words: ['Your', 'website', 'should', 'be', 'too.'], strong: ['Your', 'website', 'should', 'be', 'too.'] },
  ];

  return (
    <div>
      {lines.map((line, li) => (
        <div key={li} className="hero-line" style={{ overflow: 'hidden', display: 'block' }}>
          {line.words.map((word, wi) => (
            <motion.span
              key={wi}
              className="word"
              style={{
                fontWeight: 400, // Slightly bolder as seen in screenshot
                display: 'inline-block',
              }}
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: (li * 5 + wi) * 0.05 + 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}&nbsp;
            </motion.span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function Hero() {
  const tickerRef = useRef(null);
  const tickerInView = useInView(tickerRef, { once: true });

  return (
    <>
      <section className="hero">
        <h1 className="hero-headline">
          <AnimatedHeadline />
        </h1>
      </section>

      {/* Ticker */}
      <motion.div
        ref={tickerRef}
        className="ticker-wrap"
        initial={{ opacity: 0 }}
        animate={tickerInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.2, duration: 0.7 }}
      >
        <div className="ticker-inner">
          {TICKER_ITEMS.map((item, i) => (
            <span className="ticker-item" key={i}>
              {item}
              <span className="ticker-dot" />
            </span>
          ))}
        </div>
      </motion.div>
    </>
  );
}
