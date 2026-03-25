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
            <img src="/assets/img/logo-athermelec.png" alt="Logo Athermelec" className="navbar-logo-img logo-default" />
            <img src="/assets/img/logo-athermelec-white.webp" alt="Logo Athermelec" className="navbar-logo-img logo-white" />
            <span className="footer-logo-text">Athermelec</span>
          </Link>
          <p className="footer-slogan">L'exigence sous tension</p>
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
            31790 SAINT-JORY<br /><br />
            <a href="mailto:actifreseau@orange.fr">actifreseau@orange.fr</a>
          </address>
        </div>
      </div>

      <div className="footer-bottom footer-bottom-centered">
        <nav className="footer-bottom-links footer-bottom-nav-main" aria-label="Navigation principale">
          <Link to="/">Accueil</Link>
          <Link to="/a-propos">À propos</Link>
          <Link to="/services">Services</Link>
          <Link to="/realisations">Réalisations</Link>
          <Link to="/actualites">Actualités</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        <div className="footer-bottom-secondary">
          <p className="footer-copy">
            &copy; {year} ATHERMELEC SAS. Tous droits réservés.
          </p>
          <nav className="footer-bottom-links" aria-label="Liens légaux">
            <Link to="/mentions-legales">Mentions légales</Link>
            <Link to="/cgv">CGV</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
