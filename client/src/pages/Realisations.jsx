import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import ScrollReveal from '../components/ScrollReveal';
import { IconBolt } from '../components/Icons';

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
  {
    id: 1, title: 'Installation cellules HT', category: 'Haute Tension',
    description: 'Installation de cellules haute tension sur site industriel en Isère — poste de transformation complet 20kV/400V.',
    cover_image: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=700&q=80'
  },
  {
    id: 2, title: 'Câblage TGBT usine chimique', category: 'Basse Tension',
    description: 'Conception et câblage d\'un tableau général basse tension pour une usine de traitement chimique en Isère.',
    cover_image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&q=80'
  },
  {
    id: 3, title: 'Automatisme instrumentation', category: 'Automatisme',
    description: 'Programmation automate Schneider M340 avec supervision SCADA, instrumentation de cuves et variation de vitesse.',
    cover_image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=700&q=80'
  },
  {
    id: 4, title: 'Précâblage VDI industriel', category: 'Réseaux VDI',
    description: 'Précâblage VDI Cat.6A complet pour bâtiment industriel 2 000 m², intégrant 120 prises RJ45 et 4 baies serveurs.',
    cover_image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=700&q=80'
  },
  {
    id: 5, title: 'Fibre optique pharmaceutique', category: 'Fibre optique',
    description: 'Installation et lovage fibre optique monomode OS2 sur site pharmaceutique classé ISO — 2 km de câble posé.',
    cover_image: 'https://images.unsplash.com/photo-1562408590-e32931084e23?w=700&q=80'
  },
  {
    id: 6, title: 'Relamping LED parking', category: 'Éclairage',
    description: 'Remplacement complet de l\'éclairage parking industriel par technologie LED — économie de 65% sur la consommation.',
    cover_image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&q=80'
  },
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

      <section className="page-header page-header-img">
        <img
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&q=80"
          alt="Technicienne sur poste informatique industriel SCADA"
          className="page-header-bg"
          loading="eager"
        />
        <div className="page-header-content">
          <h1>Nos réalisations</h1>
          <p>Exemples de projets réalisés en électricité industrielle, automatisme et réseaux</p>
        </div>
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
                    <div className="realisation-card-img-placeholder"><IconBolt /></div>
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
