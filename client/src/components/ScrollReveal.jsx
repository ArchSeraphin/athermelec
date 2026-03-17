import React, { useEffect, useRef, useState } from 'react';

/**
 * Composant ScrollReveal — Animation d'apparition au scroll
 *
 * Usage : <ScrollReveal><MonComposant /></ScrollReveal>
 */
export default function ScrollReveal({ children, threshold = 0.1, className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${visible ? 'visible' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
