import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';

const BASE_URL = 'https://www.atherm-elec.com';

const CATEGORIES = [
  { value: '', label: 'Toutes' },
  { value: 'Haute Tension', label: 'Haute Tension' },
  { value: 'Basse Tension', label: 'Basse Tension' },
  { value: 'Automatisme', label: 'Automatisme' },
  { value: 'Réseaux VDI', label: 'Réseaux VDI' },
  { value: 'Fibre optique', label: 'Fibre optique' },
  { value: 'Éclairage', label: 'Éclairage' },
  { value: 'Sécurité', label: 'Sécurité' },
];

// Réalisations de démonstration affichées si aucune n'est en base
const DEMO_REALISATIONS = [
  { id: 1, title: 'Installation cellules HT', category: 'Haute Tension', description: 'Installation de cellules haute tension sur site industriel en Isère.' },
  { id: 2, title: 'Câblage TGBT', category: 'Basse Tension', description: 'Conception et câblage d\'un tableau général basse tension pour une usine chimique.' },
  { id: 3, title: 'Automatisme / sonde', category: 'Automatisme', description: 'Programmation automate Schneider avec instrumentation de cuves.' },
  { id: 4, title: 'Cheminement VDI', category: 'Réseaux VDI', description: 'Précâblage VDI complet pour bâtiment industriel tertiaire.' },
  { id: 5, title: 'Lovage fibre optique', category: 'Fibre optique', description: 'Installation et lovage fibre optique monomode sur site pharmaceutique.' },
  { id: 6, title: 'Relamping parking', category: 'Éclairage', description: 'Remplacement complet de l\'éclairage parking par technologie LED.' },
];

export default function Realisations() {
  const [realisations, setRealisations] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const url = activeCategory
      ? `/api/realisations?limit=24&category=${encodeURIComponent(activeCategory)}`
      : '/api/realisations?limit=24';

    setLoading(true);
    fetch(url, { signal: controller.signal })
      .then(res => res.json())
      .then(data => {
        setRealisations(data.realisations || []);
        setLoading(false);
      })
      .catch(err => {
        if (err.name !== 'AbortError') setLoading(false);
      });

    return () => controller.abort();
  }, [activeCategory]);

  // Fermer lightbox avec Escape
  useEffect(() => {
    if (!lightbox) return;
    const handler = (e) => { if (e.key === 'Escape') setLightbox(null); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [lightbox]);

  const displayed = realisations.length > 0 ? realisations : (loading ? [] : DEMO_REALISATIONS);

  const filtered = activeCategory
    ? displayed.filter(r => r.category === activeCategory)
    : displayed;

  return (
    <>
      <SEO
        title="Réalisations — Portfolio de projets électriques industriels"
        description="Découvrez nos réalisations en électricité industrielle : haute tension, câblage TGBT, automatisme, réseaux VDI et fibre optique. Interventions en Isère et Haute-Garonne."
        canonical={`${BASE_URL}/realisations`}
      />

      <section className="page-header">
        <h1>Nos réalisations</h1>
        <p>Exemples de projets réalisés en électricité industrielle, automatisme et réseaux</p>
      </section>

      <div className="section-full section-white">
        <section className="section">
          {/* Filtres */}
          <div className="filter-tabs">
            {CATEGORIES.map(cat => (
              <button
                key={cat.value}
                className={`filter-tab${activeCategory === cat.value ? ' active' : ''}`}
                onClick={() => setActiveCategory(cat.value)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {loading && <div className="loading">Chargement des réalisations...</div>}

          {!loading && filtered.length === 0 && (
            <p className="empty-state">Aucune réalisation dans cette catégorie pour le moment.</p>
          )}

          <ScrollReveal>
            <div className="realisations-grid">
              {filtered.map(r => (
                <div
                  key={r.id}
                  className="realisation-card"
                  onClick={() => r.cover_image && setLightbox(r.cover_image)}
                  style={{ cursor: r.cover_image ? 'pointer' : 'default' }}
                >
                  {r.cover_image ? (
                    <img
                      src={r.cover_image}
                      alt={r.title}
                      className="realisation-card-img"
                      loading="lazy"
                    />
                  ) : (
                    <div className="realisation-card-img-placeholder">⚡</div>
                  )}
                  <div className="realisation-card-body">
                    {r.category && (
                      <span className="realisation-category">{r.category}</span>
                    )}
                    <h3>{r.title}</h3>
                    {r.description && <p>{r.description}</p>}
                    {r.date_realisation && (
                      <span className="card-date">
                        {new Date(r.date_realisation).toLocaleDateString('fr-FR', {
                          year: 'numeric', month: 'long'
                        })}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </section>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="lightbox"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image agrandie"
        >
          <img src={lightbox} alt="Réalisation Athermelec" />
        </div>
      )}

      {/* CTA */}
      <ScrollReveal>
        <div className="cta-section">
          <div className="cta-section-inner">
            <h2>Votre projet, notre prochain défi</h2>
            <p>Chaque installation est unique. Contactez-nous pour étudier votre projet ensemble.</p>
            <a href="/contact" className="btn btn-primary btn-lg">Discuter de votre projet</a>
          </div>
        </div>
      </ScrollReveal>
    </>
  );
}
