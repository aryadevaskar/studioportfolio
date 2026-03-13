import { useEffect, useRef } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Kinetic from './components/Kinetic';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Smooth cursor glow that follows the mouse with lag
function CursorGlow() {
  const glowRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMove);

    const animate = () => {
      current.current.x += (pos.current.x - current.current.x) * 0.1;
      current.current.y += (pos.current.y - current.current.y) * 0.1;
      if (glowRef.current) {
        glowRef.current.style.left = current.current.x + 'px';
        glowRef.current.style.top = current.current.y + 'px';
      }
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return <div ref={glowRef} className="cursor-glow" />;
}

function App() {
  return (
    <>
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Testimonials />
        <Kinetic />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
