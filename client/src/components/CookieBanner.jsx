import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CONSENT_KEY = 'athermelec_cookie_consent';

/**
 * Bannière de consentement RGPD.
 * Quand l'utilisateur accepte, injecte Google Analytics si GA_ID est configuré.
 */
export default function CookieBanner({ gaId }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      setVisible(true);
    } else if (consent === 'accepted' && gaId) {
      injectGA(gaId);
    }
  }, [gaId]);

  function injectGA(id) {
    if (document.getElementById('ga-script')) return;
    const script = document.createElement('script');
    script.id = 'ga-script';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', id);
  }

  function handleAccept() {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    setVisible(false);
    if (gaId) injectGA(gaId);
  }

  function handleRefuse() {
    localStorage.setItem(CONSENT_KEY, 'refused');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="region" aria-label="Consentement cookies">
      <div className="cookie-banner-inner">
        <p>
          Ce site utilise des cookies pour mesurer l'audience (Google Analytics).{' '}
          <Link to="/mentions-legales">En savoir plus</Link>
        </p>
        <div className="cookie-banner-actions">
          <button className="btn btn-outline btn-sm" onClick={handleRefuse}>
            Refuser
          </button>
          <button className="btn btn-primary btn-sm" onClick={handleAccept}>
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
