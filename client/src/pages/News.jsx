import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import SEO from '../components/SEO';

const BASE_URL = 'https://www.atherm-elec.com';

export default function News() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [articles, setArticles] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });

  const page = parseInt(searchParams.get('page')) || 1;

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/articles?page=${page}&limit=10`, { signal: controller.signal })
      .then(res => res.json())
      .then(data => {
        setArticles(data.articles || []);
        setPagination(data.pagination || { page: 1, totalPages: 1 });
      })
      .catch(err => { if (err.name !== 'AbortError') {} });
    return () => controller.abort();
  }, [page]);

  return (
    <>
      <SEO
        title="Actualités — Électricité industrielle Athermelec"
        description="Suivez les actualités d'ATHERMELEC : nouvelles certifications, projets industriels, interventions haute tension, automatisme et réseaux VDI en Isère et Haute-Garonne."
        canonical={`${BASE_URL}/actualites${page > 1 ? `?page=${page}` : ''}`}
      />

      <section className="page-header page-header-img">
        <img
          src="https://images.unsplash.com/photo-1562408590-e32931084e23?w=1600&q=80"
          alt="Fibre optique et câblage réseau informatique industriel"
          className="page-header-bg"
          loading="eager"
        />
        <div className="page-header-content">
          <h1>Actualités</h1>
          <p>Les dernières nouvelles d'Athermelec</p>
        </div>
      </section>

      <section className="section">
        <div className="card-grid">
          {articles.map(article => (
            <Link to={`/actualites/${article.slug}`} key={article.id} className="card">
              {article.cover_image && (
                <img src={article.cover_image} alt={article.title} className="card-image" loading="lazy" />
              )}
              <div className="card-body">
                <h3>{article.title}</h3>
                <p>{article.excerpt}</p>
                {article.published_at && (
                  <time className="card-date">
                    {new Date(article.published_at).toLocaleDateString('fr-FR', {
                      year: 'numeric', month: 'long', day: 'numeric'
                    })}
                  </time>
                )}
                <span className="card-read-more">Lire l'article →</span>
              </div>
            </Link>
          ))}
        </div>

        {articles.length === 0 && (
          <p className="empty-state">Aucune actualité pour le moment.</p>
        )}

        {pagination.totalPages > 1 && (
          <nav className="pagination" aria-label="Pagination">
            {page > 1 && (
              <button className="btn btn-outline btn-sm" onClick={() => setSearchParams({ page: page - 1 })}>
                ← Précédent
              </button>
            )}
            <span>Page {pagination.page} / {pagination.totalPages}</span>
            {page < pagination.totalPages && (
              <button className="btn btn-outline btn-sm" onClick={() => setSearchParams({ page: page + 1 })}>
                Suivant →
              </button>
            )}
          </nav>
        )}
      </section>
    </>
  );
}
