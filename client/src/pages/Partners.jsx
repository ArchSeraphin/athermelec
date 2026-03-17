import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';

const BASE_URL = 'https://www.atherm-elec.com';

export default function Partners() {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/partners', { signal: controller.signal })
      .then(res => res.json())
      .then(data => setPartners(Array.isArray(data) ? data : []))
      .catch(err => { if (err.name !== 'AbortError') {} });
    return () => controller.abort();
  }, []);

  return (
    <>
      <SEO
        title="Partenaires & fournisseurs"
        description="Découvrez les partenaires et fournisseurs d'ATHERMELEC : Schneider, Siemens, Rockwell et autres fabricants de matériel électrique industriel."
        canonical={`${BASE_URL}/partenaires`}
      />

      <section className="page-header">
        <h1>Partenaires</h1>
        <p>Nos fournisseurs et partenaires techniques</p>
      </section>

      <section className="section">
        <div className="partners-grid">
          {partners.map(partner => (
            <a
              key={partner.id}
              href={partner.website_url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="partner-item"
            >
              {partner.logo_url && (
                <img src={partner.logo_url} alt={partner.name} loading="lazy" />
              )}
              <span>{partner.name}</span>
            </a>
          ))}
        </div>

        {partners.length === 0 && (
          <p className="empty-state">Aucun partenaire pour le moment.</p>
        )}
      </section>
    </>
  );
}
