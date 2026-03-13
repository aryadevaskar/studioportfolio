import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function LiveClock({ timezone, city }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const t = new Date().toLocaleTimeString('en-US', {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      setTime(t);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [timezone]);

  return (
    <span className="clock-item">
      <span className="clock-city">{city}</span>
      <span>{time}</span>
    </span>
  );
}

export default function Navbar() {
  return (
    <motion.nav
      className="navbar"
      initial={{ y: -52, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.span
        className="navbar-name"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Fable & Folk
      </motion.span>

      <motion.div
        className="navbar-clocks"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <LiveClock timezone="Asia/Kolkata" city="BLR" />
        <LiveClock timezone="America/New_York" city="NYC" />
      </motion.div>

      <motion.a
        href="#contact"
        className="navbar-action"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        Build with us
      </motion.a>
    </motion.nav>
  );
}
