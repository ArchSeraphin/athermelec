import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SEO from '../components/SEO';

const BASE_URL = 'https://www.atherm-elec.com';

export default function RealisationDetail() {
  const { slug } = useParams();
  const [realisation, setRealisation] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/realisations/${slug}`, { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(setRealisation)
      .catch(err => { if (err.name !== 'AbortError') setError(true); });
    return () => controller.abort();
  }, [slug]);

  if (error) {
    return (
      <section className="section">
        <h1>Réalisation non trouvée</h1>
        <Link to="/realisations" className="btn btn-outline mt-4">← Retour aux réalisations</Link>
      </section>
    );
  }

  if (!realisation) {
    return <div className="loading">Chargement...</div>;
  }

  const realisationUrl = `${BASE_URL}/realisations/${realisation.slug}`;

  return (
    <>
      <SEO
        title={realisation.title}
        description={realisation.description}
        canonical={realisationUrl}
        ogImage={realisation.cover_image ? `${BASE_URL}${realisation.cover_image}` : ''}
      />

      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE_URL },
              { '@type': 'ListItem', position: 2, name: 'Réalisations', item: `${BASE_URL}/realisations` },
              { '@type': 'ListItem', position: 3, name: realisation.title, item: realisationUrl }
            ]
          })}
        </script>
      </Helmet>

      <div className="article-hero">
        <nav className="article-breadcrumb" aria-label="Fil d'Ariane">
          <Link to="/">Accueil</Link>
          <span> / </span>
          <Link to="/realisations">Réalisations</Link>
          <span> / </span>
          <span>{realisation.title}</span>
        </nav>
        <div className="article-header">
          {realisation.category && (
            <span className="realisation-category" style={{ marginBottom: '1rem', display: 'inline-block' }}>
              {realisation.category}
            </span>
          )}
          <h1>{realisation.title}</h1>
          {realisation.date_realisation && (
            <time className="article-meta">
              {new Date(realisation.date_realisation).toLocaleDateString('fr-FR', {
                month: 'long', year: 'numeric'
              })}
            </time>
          )}
        </div>
      </div>

      {realisation.cover_image && (
        <div className="article-cover">
          <img src={realisation.cover_image} alt={realisation.title} loading="eager" />
        </div>
      )}

      {realisation.description && (
        <div className="article-content" style={{ paddingBottom: realisation.content ? '1rem' : undefined }}>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-2)', fontStyle: 'italic' }}>
            {realisation.description}
          </p>
        </div>
      )}

      {realisation.content && (
        <div
          className="article-content"
          style={{ paddingTop: realisation.description ? 0 : undefined }}
          dangerouslySetInnerHTML={{ __html: realisation.content }}
        />
      )}

      <div className="article-footer">
        <Link to="/realisations" className="btn btn-outline">← Retour aux réalisations</Link>
      </div>
    </>
  );
}
