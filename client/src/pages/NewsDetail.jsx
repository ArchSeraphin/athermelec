import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SEO from '../components/SEO';

const BASE_URL = 'https://www.atherm-elec.com';

export default function NewsDetail() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/articles/${slug}`, { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(setArticle)
      .catch(err => { if (err.name !== 'AbortError') setError(true); });
    return () => controller.abort();
  }, [slug]);

  if (error) {
    return (
      <section className="section">
        <h1>Article non trouvé</h1>
        <Link to="/actualites" className="btn btn-outline mt-4">← Retour aux actualités</Link>
      </section>
    );
  }

  if (!article) {
    return <div className="loading">Chargement...</div>;
  }

  const articleUrl = `${BASE_URL}/actualites/${article.slug}`;

  return (
    <>
      <SEO
        title={article.title}
        description={article.excerpt}
        canonical={articleUrl}
        ogType="article"
        ogImage={article.cover_image ? `${BASE_URL}${article.cover_image}` : ''}
        article={{
          publishedTime: article.published_at,
          modifiedTime: article.updated_at
        }}
      />

      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'NewsArticle',
            headline: article.title,
            description: article.excerpt,
            image: article.cover_image ? `${BASE_URL}${article.cover_image}` : '',
            datePublished: article.published_at,
            dateModified: article.updated_at,
            url: articleUrl,
            publisher: {
              '@type': 'Organization',
              name: 'Athermelec',
              url: BASE_URL
            }
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Accueil', item: BASE_URL },
              { '@type': 'ListItem', position: 2, name: 'Actualités', item: `${BASE_URL}/actualites` },
              { '@type': 'ListItem', position: 3, name: article.title, item: articleUrl }
            ]
          })}
        </script>
      </Helmet>

      <article className="article-detail">
        <nav className="breadcrumb" aria-label="Fil d'Ariane">
          <Link to="/">Accueil</Link>
          <span className="breadcrumb-sep">/</span>
          <Link to="/actualites">Actualités</Link>
          <span className="breadcrumb-sep">/</span>
          <span>{article.title}</span>
        </nav>

        {article.cover_image && (
          <img src={article.cover_image} alt={article.title} className="article-cover" loading="eager" />
        )}

        <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--color-navy)', fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)', marginBottom: '1rem' }}>
          {article.title}
        </h1>

        {article.published_at && (
          <time className="article-date">
            {new Date(article.published_at).toLocaleDateString('fr-FR', {
              day: 'numeric', month: 'long', year: 'numeric'
            })}
          </time>
        )}

        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        <Link to="/actualites" className="btn btn-outline mt-6">← Retour aux actualités</Link>
      </article>
    </>
  );
}
