import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Bloquer le scroll du body quand le menu est ouvert
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Fermer le menu sur Escape
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
          <img src="/assets/logo/LOGO%20ATHERM%20ELEC%202019.avif" alt="Logo Athermelec" className="navbar-logo-img" />
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
            <ThemeToggle />
            <Link to="/contact" className="btn btn-primary" onClick={close}>
              Demander un devis
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
