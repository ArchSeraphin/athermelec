import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * Composant SEO réutilisable — meta, Open Graph, Twitter Card
 *
 * Props :
 *  - title (string)
 *  - description (string)
 *  - canonical (string) — URL canonique complète
 *  - ogType (string) — 'website' par défaut
 *  - ogImage (string) — URL image OG
 *  - noindex (boolean) — true pour noindex
 *  - article (object) — { publishedTime, modifiedTime, author }
 */
export default function SEO({
  title = '',
  description = '',
  canonical = '',
  ogType = 'website',
  ogImage = '',
  noindex = false,
  article = null
}) {
  const siteName = 'Athermelec';
  const fullTitle = title ? `${title} | ${siteName}` : siteName;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      {canonical && <link rel="canonical" href={canonical} />}
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:type" content={ogType} />
      {canonical && <meta property="og:url" content={canonical} />}
      {ogImage && <meta property="og:image" content={ogImage} />}
      {siteName && <meta property="og:site_name" content={siteName} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {/* Article schema */}
      {article && article.publishedTime && (
        <meta property="article:published_time" content={article.publishedTime} />
      )}
      {article && article.modifiedTime && (
        <meta property="article:modified_time" content={article.modifiedTime} />
      )}
    </Helmet>
  );
}
