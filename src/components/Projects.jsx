import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import goldenImpex from '../assets/spice.png';
import promptlyAI from '../assets/tech.png';
import studioBrand from '../assets/agency.png';

const projects = [
  {
    id: 'golden-impex',
    index: '01',
    year: '2026',
    name: 'Parnika International',
    category: 'FMCG · Export',
    desc: 'A premium B2B export website built in React for an Indian grocery and FMCG exporter. Google Sheets CMS, scroll animations, working inquiry form, and conversion-focused design, delivered in under 2 weeks.',
    tags: ['Web Design', 'UI/UX', 'React'],
    video: '/videos/spices.mp4',
    poster: goldenImpex,
    bg: '#ede6dd', // Warm beige from the video
    url: 'https://www.parnikainternational.com/',
  },
  {
    id: 'promptly-ai',
    index: '02',
    year: '2024',
    name: 'Prism AI',
    category: 'SaaS · AI Tools',
    desc: 'A Framer SaaS landing page for an AI prompt management platform. Dark editorial aesthetic, animated wave hero, pricing section, and FAQ, built ahead of their Product Hunt launch.',
    tags: ['Web Design', 'Framer', 'Motion'],
    video: '/videos/saas.mp4',
    poster: promptlyAI,
    bg: '#000000', // Deep black for SaaS
    url: 'https://refreshed-messages-134314.framer.app/',
  },
  {
    id: 'studio-noir',
    index: '03',
    year: '2025',
    name: 'Fable and Folk',
    category: 'Creative Studio · Branding',
    desc: 'The brand identity and website that started it all, now available as a template. Built for creative studios, agencies, and consultancies who want an editorial web presence without starting from scratch.',
    tags: ['Web Design', 'Webflow', 'Brand'],
    video: '/videos/agency.mp4',
    poster: studioBrand,
    bg: '#2a221b', // Warm deep brown to match the brand palette
    url: '#',
  },
];

// Auto-plays video when in view, transitions smoothly from poster with parallax
function VideoPanel({ video, poster, inView }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const videoY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (inView) {
      if (videoElement.paused) {
        const playPromise = videoElement.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      }
    } else {
      if (!videoElement.paused) {
        videoElement.pause();
      }
    }
  }, [inView]);

  return (
    <div className="proj-video-col" ref={containerRef}>
      {/* Fallback/Poster Image that fades out */}
      <motion.img
        src={poster}
        alt=""
        initial={{ opacity: 1, scale: 1.05 }}
        animate={{ 
          opacity: isReady ? 0 : 1,
          scale: isReady ? 1 : 1.05
        }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />
      
      <motion.video
        ref={videoRef}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        onPlaying={() => setIsReady(true)}
        className="proj-video-element"
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'contain',
          position: 'relative',
          zIndex: 1,
          opacity: isReady ? 1 : 0,
          y: videoY,
          scale: 1.15
        }}
        whileHover={{ scale: 1.18 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <source src={video} type="video/mp4" />
      </motion.video>

      {/* Subtle overlay for depth */}
      <div className="proj-video-overlay" style={{ zIndex: 3 }} />
    </div>
  );
}

function ProjectCard({ project, flip, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const videoInView = useInView(ref, { margin: '100px' });

  return (
    <motion.div
      ref={ref}
      className={`proj-editorial${flip ? ' proj-editorial--flip' : ''}`}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
    >
      {/* ── Video side ── */}
      <motion.div
        className={project.bg === '#000000' || project.bg === 'var(--black)' ? 'bg-grain-overlay' : ''}
        initial={{ clipPath: flip ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)' }}
        animate={inView ? { clipPath: 'inset(0 0% 0 0%)' } : {}}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        style={{ display: 'block', backgroundColor: project.bg || 'var(--white)', position: 'relative' }}
      >
        <VideoPanel video={project.video} poster={project.poster} inView={videoInView} />
      </motion.div>

      {/* ── Info side ── */}
      <div className="proj-info-col">
        {/* Giant ghost number */}
        <span className="proj-ghost-num" aria-hidden="true">{project.index}</span>

        <div className="proj-info-top">
          <div className="proj-label-row">
            <motion.span
              className="proj-index-label"
              initial={{ opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {project.index} / {String(projects.length).padStart(2, '0')}
            </motion.span>
            <motion.span
              className="proj-year"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {project.year}
            </motion.span>
          </div>

          {/* Title clip reveal */}
          <div style={{ overflow: 'hidden', marginBottom: 12 }}>
            <motion.h2
              className="proj-title"
              initial={{ y: '110%' }}
              animate={inView ? { y: '0%' } : {}}
              transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              {project.name}
            </motion.h2>
          </div>

          <motion.p
            className="proj-category"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {project.category}
          </motion.p>

          <motion.p
            className="proj-desc-text"
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {project.desc}
          </motion.p>
        </div>

        <motion.div
          className="proj-info-bottom"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="proj-pills">
            {project.tags.map(t => (
              <span className="proj-pill" key={t}>{t}</span>
            ))}
          </div>
          <a href={project.url} className="proj-cta" target="_blank" rel="noopener noreferrer">
            View Project
            <svg className="proj-cta-arrow" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="13 6 19 12 13 18" />
            </svg>
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const labelRef = useRef(null);
  const labelInView = useInView(labelRef, { once: true });

  return (
    <section className="section">
      <div className="section-header">
        <div style={{ overflow: 'hidden' }}>
          <motion.p
            ref={labelRef}
            className="section-label"
            initial={{ y: '100%', opacity: 0 }}
            animate={labelInView ? { y: '0%', opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            SELECTED WORK | WEB DESIGN & DEVELOPMENT
          </motion.p>
        </div>
      </div>

      <div>
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} flip={i % 2 !== 0} index={i} />
        ))}
      </div>
    </section>
  );
}
