import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
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
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} aria-label="Navigation principale">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={close} aria-label="Athermelec — Accueil">
            <img src="/assets/img/logo-athermelec.png" alt="Logo Athermelec" className="navbar-logo-img logo-default" />
            <img src="/assets/img/logo-athermelec-white.webp" alt="Logo Athermelec" className="navbar-logo-img logo-white" />
            <span className="navbar-logo-text">Athermelec</span>
          </Link>

          {/* Menu desktop — visible uniquement sur desktop */}
          <div className="navbar-menu">
            <ul className="navbar-links">
              <li><NavLink to="/" end onClick={close}>Accueil</NavLink></li>
              <li><NavLink to="/a-propos" onClick={close}>À propos</NavLink></li>
              <li><NavLink to="/services" onClick={close}>Services</NavLink></li>
              <li><NavLink to="/realisations" onClick={close}>Réalisations</NavLink></li>
              <li><NavLink to="/actualites" onClick={close}>Actualités</NavLink></li>
              <li><NavLink to="/contact" onClick={close}>Contact</NavLink></li>
            </ul>
            <div className="navbar-cta">
              <ThemeToggle />
              <Link to="/contact" className="btn btn-primary" onClick={close}>
                Demander un devis
              </Link>
            </div>
          </div>

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
        </div>
      </nav>

      {/* Menu mobile via Portal — rendu sur document.body, hors du
          contexte d'empilement de la navbar (évite le bug position:fixed
          dans position:fixed sur mobile) */}
      {createPortal(
        <div
          className={`navbar-mobile-overlay${menuOpen ? ' open' : ''}`}
          inert={!menuOpen ? '' : undefined}
          role="dialog"
          aria-label="Menu navigation mobile"
        >
          <ul className="navbar-mobile-links">
            <li><NavLink to="/" end onClick={close}>Accueil</NavLink></li>
            <li><NavLink to="/a-propos" onClick={close}>À propos</NavLink></li>
            <li><NavLink to="/services" onClick={close}>Services</NavLink></li>
            <li><NavLink to="/realisations" onClick={close}>Réalisations</NavLink></li>
            <li><NavLink to="/actualites" onClick={close}>Actualités</NavLink></li>
            <li><NavLink to="/contact" onClick={close}>Contact</NavLink></li>
          </ul>
          <div className="navbar-cta">
            <ThemeToggle />
            <Link to="/contact" className="btn btn-primary" onClick={close}>
              Demander un devis
            </Link>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
