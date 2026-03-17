/**
 * Controller Réalisations — CRUD + XSS sanitization
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

// ─── Liste réalisations publiées (public) ───

exports.getPublished = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit) || 12));
    const offset = (page - 1) * limit;
    const category = req.query.category || null;

    const whereClause = category
      ? 'WHERE published = 1 AND category = ?'
      : 'WHERE published = 1';
    const params = category ? [category, String(limit), String(offset)] : [String(limit), String(offset)];
    const countParams = category ? [category] : [];

    const [realisations] = await pool.execute(
      `SELECT id, title, slug, description, cover_image, category, date_realisation
       FROM realisations ${whereClause}
       ORDER BY display_order ASC, date_realisation DESC LIMIT ? OFFSET ?`,
      params
    );

    const [[{ total }]] = await pool.execute(
      `SELECT COUNT(*) as total FROM realisations ${whereClause}`,
      countParams
    );

    res.json({
      realisations,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// ─── Détail réalisation par slug (public) ───

exports.getBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const [rows] = await pool.execute(
      'SELECT * FROM realisations WHERE slug = ? AND published = 1',
      [slug]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Réalisation non trouvée' });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// ─── Liste toutes les réalisations (admin) ───

exports.getAll = async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM realisations ORDER BY display_order ASC, created_at DESC'
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// ─── Créer une réalisation (admin) ───

exports.create = async (req, res) => {
  try {
    const { title, description, content, cover_image, category, date_realisation, published, display_order } = req.body;

    const cleanTitle = stripHtml(title);
    const cleanDescription = stripHtml(description);
    const cleanContent = sanitizeHtml(content || '');
    const cleanCategory = stripHtml(category || '');
    const slug = generateSlug(cleanTitle);

    if (cover_image && !/^(\/uploads\/|\/img\/|https:\/\/)/.test(cover_image)) {
      return res.status(400).json({ error: "URL d'image invalide" });
    }

    const [result] = await pool.execute(
      `INSERT INTO realisations (title, slug, description, content, cover_image, category, date_realisation, published, display_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        cleanTitle, slug, cleanDescription, cleanContent,
        cover_image || null,
        cleanCategory || null,
        date_realisation || null,
        published ? 1 : 0,
        parseInt(display_order) || 0
      ]
    );

    res.status(201).json({ id: result.insertId, slug });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// ─── Modifier une réalisation (admin) ───

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    if (!/^\d+$/.test(id)) {
      return res.status(400).json({ error: 'ID invalide' });
    }

    const { title, description, content, cover_image, category, date_realisation, display_order } = req.body;

    const cleanTitle = stripHtml(title);
    const cleanDescription = stripHtml(description);
    const cleanContent = sanitizeHtml(content || '');
    const cleanCategory = stripHtml(category || '');
    const slug = generateSlug(cleanTitle);

    if (cover_image && !/^(\/uploads\/|\/img\/|https:\/\/)/.test(cover_image)) {
      return res.status(400).json({ error: "URL d'image invalide" });
    }

    await pool.execute(
      `UPDATE realisations SET title=?, slug=?, description=?, content=?, cover_image=?,
       category=?, date_realisation=?, display_order=?, updated_at=NOW() WHERE id=?`,
      [
        cleanTitle, slug, cleanDescription, cleanContent,
        cover_image || null,
        cleanCategory || null,
        date_realisation || null,
        parseInt(display_order) || 0,
        id
      ]
    );

    res.json({ message: 'Réalisation modifiée', slug });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// ─── Supprimer une réalisation (admin) ───

exports.remove = async (req, res) => {
  try {
    const id = req.params.id;
    if (!/^\d+$/.test(id)) {
      return res.status(400).json({ error: 'ID invalide' });
    }

    await pool.execute('DELETE FROM realisations WHERE id = ?', [id]);
    res.json({ message: 'Réalisation supprimée' });
  } catch (err) {
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

    const [rows] = await pool.execute('SELECT published FROM realisations WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Réalisation non trouvée' });
    }

    const newStatus = rows[0].published ? 0 : 1;
    await pool.execute(
      'UPDATE realisations SET published = ?, updated_at = NOW() WHERE id = ?',
      [newStatus, id]
    );

    res.json({ published: !!newStatus });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
