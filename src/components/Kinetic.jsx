import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring, animate } from 'framer-motion';

// Counting number that animates from 0 to target on scroll entry
function CountUp({ to, suffix = '', prefix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) {
        setDisplay(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {prefix}{display}{suffix}
    </span>
  );
}

const stats = [
  { value: 40, suffix: '+', label: 'Projects\ndelivered' },
  { value: 5, suffix: ' days', label: 'Average\ndelivery time' },
  { value: 100, suffix: '%', label: 'Client\nretention' },
  { value: 24, suffix: 'h', label: 'Response\ntime' },
];

export default function KineticSection() {
  const sectionRef = useRef(null);

  // Scroll-driven horizontal translate for the giant text
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Row 1 moves left → right (starts far left, ends far right)
  const x1 = useTransform(scrollYProgress, [0, 1], ['-12%', '4%']);
  // Row 2 moves right → left
  const x2 = useTransform(scrollYProgress, [0, 1], ['4%', '-12%']);

  const springX1 = useSpring(x1, { stiffness: 60, damping: 20 });
  const springX2 = useSpring(x2, { stiffness: 60, damping: 20 });

  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-80px' });

  return (
    <section ref={sectionRef} className="kinetic-section">
      {/* Giant scroll-driven type */}
      <div className="kinetic-type-wrap">
        <motion.div className="kinetic-row" style={{ x: springX1 }}>
          <span className="kinetic-text">CRAFTED WITH INTENTION</span>
          <span className="kinetic-dot">·</span>
          <span className="kinetic-text">BUILT TO PERFORM</span>
          <span className="kinetic-dot">·</span>
          <span className="kinetic-text">CRAFTED WITH INTENTION</span>
          <span className="kinetic-dot">·</span>
          <span className="kinetic-text">BUILT TO PERFORM</span>
        </motion.div>

        <motion.div className="kinetic-row kinetic-row--outline" style={{ x: springX2 }}>
          <span className="kinetic-text">DELIVERED ON TIME</span>
          <span className="kinetic-dot">·</span>
          <span className="kinetic-text">DESIGNED TO LAST</span>
          <span className="kinetic-dot">·</span>
          <span className="kinetic-text">DELIVERED ON TIME</span>
          <span className="kinetic-dot">·</span>
          <span className="kinetic-text">DESIGNED TO LAST</span>
        </motion.div>
      </div>

      {/* Stats row */}
      <div ref={statsRef} className="kinetic-stats">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            className="kinetic-stat"
            initial={{ opacity: 0, y: 30 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              delay: i * 0.1 + 0.2,
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <span className="kinetic-stat-number">
              <CountUp to={s.value} suffix={s.suffix} />
            </span>
            <span className="kinetic-stat-label">
              {s.label.split('\n').map((line, j) => (
                <span key={j} style={{ display: 'block' }}>{line}</span>
              ))}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
