import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-top">
        {/* Colonne marque */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo" aria-label="Athermelec">
            <img src="/assets/logo/LOGO%20ATHERM%20ELEC%202019.avif" alt="Logo Athermelec" className="navbar-logo-img" />
            <span className="footer-logo-text">Athermelec</span>
          </Link>
          <p>
            Expert en électricité industrielle haute et basse tension, automatisme
            et réseaux informatiques depuis 1983. Certifié MASE.
          </p>
          <div className="footer-certif">
            <span className="footer-certif-badge">MASE</span>
            <span className="footer-certif-badge">ATEX</span>
            <span className="footer-certif-badge">IRVE 1&2</span>
            <span className="footer-certif-badge">SEE Gold</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="footer-col">
          <h4>Navigation</h4>
          <ul>
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/a-propos">À propos</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/realisations">Réalisations</Link></li>
            <li><Link to="/actualites">Actualités</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Site Frontonas */}
        <div className="footer-col">
          <h4>Frontonas (38)</h4>
          <address className="footer-address">
            <strong>ATHERMELEC SAS</strong><br />
            328 route de la Verpillière<br />
            38290 FRONTONAS<br /><br />
            <strong>Tél :</strong>{' '}
            <a href="tel:+33474941989">04 74 94 19 89</a><br />
            <strong>Fax :</strong> 04 74 99 04 95<br />
            <a href="mailto:contact@atherm-elec.com">contact@atherm-elec.com</a>
          </address>
        </div>

        {/* Site Pechbonnieu */}
        <div className="footer-col">
          <h4>Pechbonnieu (31)</h4>
          <address className="footer-address">
            <strong>ACTIF RÉSEAU</strong><br />
            ZA le Grands<br />
            17 rue des artisans<br />
            31140 PECHBONNIEU<br /><br />
            <strong>Tél :</strong>{' '}
            <a href="tel:+33561711532">05 61 71 15 32</a><br />
            <strong>Fax :</strong> 05 34 36 94 76
          </address>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copy">
          &copy; {year} ATHERMELEC SAS. Tous droits réservés.
        </p>
        <nav className="footer-bottom-links" aria-label="Liens légaux">
          <Link to="/mentions-legales">Mentions légales</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </div>
    </footer>
  );
}
