/**
 * Controller Articles — CRUD + XSS sanitization
 */

const pool = require('../config/database');
const xss = require('xss');

// ─── Helpers ───

function sanitizeHtml(html) {
  return xss(html, {
    whiteList: {
      h1: [], h2: [], h3: [], h4: [], h5: [], h6: [],
      p: [], br: [], hr: [],
      strong: [], em: [], u: [], s: [],
      a: ['href', 'title', 'target'],
      img: ['src', 'alt', 'width', 'height'],
      ul: [], ol: [], li: [],
      blockquote: [],
      pre: [], code: [],
      table: [], thead: [], tbody: [], tr: [], th: [], td: [],
      span: ['style'],
      div: ['class']
    },
    stripIgnoreTag: true,
    onTagAttr(tag, name, value) {
      // Bloquer javascript:, data: dans les URLs
      if ((name === 'href' || name === 'src') && /^(javascript|data):/i.test(value)) {
        return '';
      }
    }
  });
}

function stripHtml(text) {
  return text ? text.replace(/<[^>]*>/g, '').trim() : '';
}

function generateSlug(title) {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// ─── Liste articles publiés (public) ───

exports.getPublished = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit) || 10));
    const offset = (page - 1) * limit;

    const [articles] = await pool.execute(
      `SELECT id, title, slug, excerpt, cover_image, published_at
       FROM articles WHERE published = 1
       ORDER BY published_at DESC LIMIT ? OFFSET ?`,
      [String(limit), String(offset)]
    );

    const [[{ total }]] = await pool.execute(
      'SELECT COUNT(*) as total FROM articles WHERE published = 1'
    );

    res.json({
      articles,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    console.error('Erreur getPublished:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// ─── Détail article par slug (public) ───

exports.getBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const [articles] = await pool.execute(
      `SELECT * FROM articles WHERE slug = ? AND published = 1`,
      [slug]
    );

    if (articles.length === 0) {
      return res.status(404).json({ error: 'Article non trouvé' });
    }

    res.json(articles[0]);
  } catch (err) {
    console.error('Erreur getBySlug:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// ─── Liste tous les articles (admin) ───

exports.getAll = async (req, res) => {
  try {
    const [articles] = await pool.execute(
      'SELECT * FROM articles ORDER BY created_at DESC'
    );
    res.json(articles);
  } catch (err) {
    console.error('Erreur getAll:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// ─── Créer un article (admin) ───

exports.create = async (req, res) => {
  try {
    const { title, excerpt, content, cover_image, published } = req.body;

    const cleanTitle = stripHtml(title);
    const cleanExcerpt = stripHtml(excerpt);
    const cleanContent = sanitizeHtml(content);
    const slug = generateSlug(cleanTitle);

    // Validation URL cover_image
    if (cover_image && !/^(\/uploads\/|\/img\/|https:\/\/)/.test(cover_image)) {
      return res.status(400).json({ error: 'URL d\'image invalide' });
    }

    const [result] = await pool.execute(
      `INSERT INTO articles (title, slug, excerpt, content, cover_image, published, published_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        cleanTitle, slug, cleanExcerpt, cleanContent,
        cover_image || null,
        published ? 1 : 0,
        published ? new Date() : null
      ]
    );

    res.status(201).json({ id: result.insertId, slug });
  } catch (err) {
    console.error('Erreur create article:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// ─── Modifier un article (admin) ───

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    if (!/^\d+$/.test(id)) {
      return res.status(400).json({ error: 'ID invalide' });
    }

    const { title, excerpt, content, cover_image } = req.body;

    const cleanTitle = stripHtml(title);
    const cleanExcerpt = stripHtml(excerpt);
    const cleanContent = sanitizeHtml(content);
    const slug = generateSlug(cleanTitle);

    if (cover_image && !/^(\/uploads\/|\/img\/|https:\/\/)/.test(cover_image)) {
      return res.status(400).json({ error: 'URL d\'image invalide' });
    }

    await pool.execute(
      `UPDATE articles SET title = ?, slug = ?, excerpt = ?, content = ?,
       cover_image = ?, updated_at = NOW() WHERE id = ?`,
      [cleanTitle, slug, cleanExcerpt, cleanContent, cover_image || null, id]
    );

    res.json({ message: 'Article modifié', slug });
  } catch (err) {
    console.error('Erreur update article:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// ─── Supprimer un article (admin) ───

exports.remove = async (req, res) => {
  try {
    const id = req.params.id;
    if (!/^\d+$/.test(id)) {
      return res.status(400).json({ error: 'ID invalide' });
    }

    await pool.execute('DELETE FROM articles WHERE id = ?', [id]);
    res.json({ message: 'Article supprimé' });
  } catch (err) {
    console.error('Erreur delete article:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// ─── Publier / Dépublier (admin) ───

exports.togglePublish = async (req, res) => {
  try {
    const id = req.params.id;
    if (!/^\d+$/.test(id)) {
      return res.status(400).json({ error: 'ID invalide' });
    }

    const [articles] = await pool.execute('SELECT published FROM articles WHERE id = ?', [id]);
    if (articles.length === 0) {
      return res.status(404).json({ error: 'Article non trouvé' });
    }

    const newStatus = articles[0].published ? 0 : 1;
    const publishedAt = newStatus ? new Date() : null;

    await pool.execute(
      'UPDATE articles SET published = ?, published_at = ?, updated_at = NOW() WHERE id = ?',
      [newStatus, publishedAt, id]
    );

    res.json({ published: !!newStatus });
  } catch (err) {
    console.error('Erreur togglePublish:', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
