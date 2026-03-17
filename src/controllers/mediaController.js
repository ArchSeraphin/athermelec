/**
 * Controller Media — Upload images → conversion Sharp WebP
 */

const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// ─── Configuration Multer ───

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB max
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);

    if (ext && mime) {
      cb(null, true);
    } else {
      cb(new Error('Seuls les fichiers image (JPG, PNG, GIF, WebP) sont autorisés.'));
    }
  }
});

// ─── Upload + conversion WebP ───

exports.uploadMiddleware = upload.single('image');

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Aucun fichier fourni' });
    }

    // Créer le dossier uploads s'il n'existe pas
    const uploadsDir = path.join(__dirname, '..', '..', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Nom de fichier unique
    const timestamp = Date.now();
    const filename = `${timestamp}.webp`;
    const filepath = path.join(uploadsDir, filename);

    // Conversion en WebP avec Sharp
    await sharp(req.file.buffer)
      .webp({ quality: 80 })
      .resize(1200, null, { withoutEnlargement: true })
      .toFile(filepath);

    res.json({
      url: `/uploads/${filename}`,
      filename
    });
  } catch (err) {
    console.error('Erreur upload:', err);
    res.status(500).json({ error: 'Erreur lors de l\'upload' });
  }
};
