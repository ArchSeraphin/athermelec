import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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


function RealisationCard({ r }) {
  const body = (
    <>
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
        {r.category && <span className="realisation-category">{r.category}</span>}
        <h3>{r.title}</h3>
        {r.description && <p>{r.description}</p>}
        <div className="realisation-card-meta">
          {r.date_realisation && (
            <span className="realisation-date">
              {new Date(r.date_realisation).toLocaleDateString('fr-FR', {
                year: 'numeric', month: 'long'
              })}
            </span>
          )}
          {r.slug && <span className="card-read-more">Voir la réalisation →</span>}
        </div>
      </div>
    </>
  );

  if (r.slug) {
    return (
      <Link to={`/realisations/${r.slug}`} className="realisation-card">
        {body}
      </Link>
    );
  }

  return <div className="realisation-card">{body}</div>;
}

export default function Realisations() {
  const [realisations, setRealisations] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');
  const [loading, setLoading] = useState(true);

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

          {!loading && realisations.length === 0 && (
            <p className="empty-state">Aucune réalisation dans cette catégorie pour le moment.</p>
          )}

          <ScrollReveal>
            <div className="realisations-grid">
              {realisations.map(r => <RealisationCard key={r.id} r={r} />)}
            </div>
          </ScrollReveal>
        </section>
      </div>

      {/* CTA */}
      <ScrollReveal>
        <div className="cta-section">
          <div className="cta-section-inner">
            <h2>Votre projet, notre prochain défi</h2>
            <p>Chaque installation est unique. Contactez-nous pour étudier votre projet ensemble.</p>
            <Link to="/contact" className="btn btn-primary btn-lg">Discuter de votre projet</Link>
          </div>
        </div>
      </ScrollReveal>
    </>
  );
}
