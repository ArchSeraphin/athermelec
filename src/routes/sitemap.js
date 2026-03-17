/**
 * Route Sitemap — Génération dynamique /sitemap.xml depuis la DB
 */

const express = require('express');
const router = express.Router();
const pool = require('../config/database');

router.get('/sitemap.xml', async (req, res) => {
  try {
    const baseUrl = 'https://www.atherm-elec.com';

    // Pages statiques
    const staticPages = [
      { loc: '/',              priority: '1.0', changefreq: 'weekly' },
      { loc: '/a-propos',      priority: '0.8', changefreq: 'monthly' },
      { loc: '/services',      priority: '0.9', changefreq: 'monthly' },
      { loc: '/realisations',  priority: '0.8', changefreq: 'weekly' },
      { loc: '/actualites',    priority: '0.8', changefreq: 'weekly' },
      { loc: '/contact',       priority: '0.7', changefreq: 'monthly' }
    ];

    // Articles publiés
    const [articles] = await pool.execute(
      'SELECT slug, updated_at, published_at FROM articles WHERE published = 1 ORDER BY published_at DESC'
    );

    // Réalisations publiées
    const [realisations] = await pool.execute(
      'SELECT slug, updated_at FROM realisations WHERE published = 1 ORDER BY display_order ASC'
    );

    const today = new Date().toISOString().split('T')[0];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    for (const page of staticPages) {
      xml += `
  <url>
    <loc>${baseUrl}${page.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
    }

    for (const article of articles) {
      const lastmod = (article.updated_at || article.published_at)
        .toISOString().split('T')[0];
      xml += `
  <url>
    <loc>${baseUrl}/actualites/${article.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
    }

    for (const r of realisations) {
      const lastmod = r.updated_at.toISOString().split('T')[0];
      xml += `
  <url>
    <loc>${baseUrl}/realisations/${r.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
    }

    xml += `\n</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(xml);
  } catch (err) {
    res.status(500).send('Erreur lors de la génération du sitemap');
  }
});

module.exports = router;
