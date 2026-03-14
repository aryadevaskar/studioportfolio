import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const tiers = [
  {
    name: 'STARTER',
    price: '$399',
    subline: 'For founders who need a launch-ready landing page fast.',
    features: [
      'Single page website',
      'Up to 6 sections',
      'Mobile responsive',
      'Contact form integration',
      '2 rounds of revisions',
      'Delivered in 5 days'
    ],
    highlight: false
  },
  {
    name: 'STUDIO',
    badge: 'MOST POPULAR',
    price: '$799',
    subline: 'For brands who need a complete web presence.',
    features: [
      'Multi-page website up to 5 pages',
      'CMS integration',
      'Custom animations',
      'SEO optimised',
      '3 rounds of revisions',
      '30 days post-launch support',
      'Delivered in 10 days'
    ],
    highlight: true
  },
  {
    name: 'CUSTOM',
    price: "Let's talk",
    subline: 'Complex builds, e-commerce, SaaS, or anything that needs a custom approach.',
    features: [
      'Everything in Studio',
      'Custom scope and timeline',
      'Priority communication',
      'Ongoing support available'
    ],
    highlight: false
  }
];

export default function Pricing() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const headline = "Transparent pricing for exceptional digital work.";
  const words = headline.split(" ");

  return (
    <section id="pricing" className="pricing-section">
      <div className="section-header">
        <div style={{ overflow: 'hidden' }}>
          <motion.p 
            className="section-label"
            initial={{ y: '100%', opacity: 0 }}
            animate={isInView ? { y: '0%', opacity: 1 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            03 / PRICING
          </motion.p>
        </div>
        
        <div style={{ marginTop: '24px', overflow: 'hidden' }}>
          <h2 
            className="proj-title"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)', maxWidth: '900px', lineHeight: 1.1 }}
          >
            {words.map((word, i) => (
              <span key={i} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.2em' }}>
                <motion.span
                  style={{ display: 'inline-block' }}
                  initial={{ y: '100%' }}
                  animate={isInView ? { y: '0%' } : {}}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.1 + (i * 0.03), 
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h2>
        </div>
      </div>

      <div ref={containerRef} className="pricing-grid">
        {tiers.map((tier, idx) => (
          <motion.div 
            key={tier.name}
            className={`pricing-tier ${tier.highlight ? 'pricing-tier--highlight' : ''}`}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ 
              duration: 0.8, 
              delay: 0.3 + (idx * 0.15), 
              ease: [0.16, 1, 0.3, 1] 
            }}
          >
            {tier.badge && <span className="pricing-badge">{tier.badge}</span>}
            
            <div className="pricing-card-header">
              <span className="pricing-name">{tier.name}</span>
              
              <div className="pricing-price-wrap">
                <span className="pricing-price">{tier.price}</span>
              </div>
              
              <p className="pricing-subline">{tier.subline}</p>
            </div>
            
            <ul className="pricing-list">
              {tier.features.map((feature, fIdx) => (
                <motion.li 
                  key={feature} 
                  className="pricing-item"
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6 + (idx * 0.1) + (fIdx * 0.05), duration: 0.5 }}
                >
                  <span className="pricing-item-dot" />
                  {feature}
                </motion.li>
              ))}
            </ul>
            
            <a href="#contact" className="pricing-cta-btn">
              Get Started
            </a>
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="pricing-note"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <p className="pricing-note-text">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          All projects include a discovery call, full source files, and deployment support.
        </p>
      </motion.div>
    </section>
  );
}
