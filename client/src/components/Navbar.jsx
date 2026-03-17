import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermer le menu si on clique en dehors
  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`} aria-label="Navigation principale">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={close} aria-label="Athermelec — Accueil">
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
            <polygon points="13,1 25,7 25,19 13,25 1,19 1,7" fill="none" stroke="#F0A500" strokeWidth="1.5"/>
            <path d="M8 13 L13 7 L18 13 L13 19 Z" fill="#F0A500" opacity="0.9"/>
          </svg>
          <span className="navbar-logo-text">Athermelec</span>
        </Link>

        <button
          className="navbar-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={menuOpen}
        >
          <span className={`hamburger${menuOpen ? ' open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        <div className={`navbar-menu${menuOpen ? ' open' : ''}`}>
          <ul className="navbar-links">
            <li><NavLink to="/" end onClick={close}>Accueil</NavLink></li>
            <li><NavLink to="/a-propos" onClick={close}>À propos</NavLink></li>
            <li><NavLink to="/services" onClick={close}>Services</NavLink></li>
            <li><NavLink to="/realisations" onClick={close}>Réalisations</NavLink></li>
            <li><NavLink to="/contact" onClick={close}>Contact</NavLink></li>
          </ul>
          <div className="navbar-cta">
            <Link to="/contact" className="btn btn-primary" onClick={close}>
              Demander un devis
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
