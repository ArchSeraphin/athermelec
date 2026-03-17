/**
 * Script de conversion batch — JPG/PNG → WebP via Sharp
 *
 * Usage : node scripts/convert-photos.js [dossier_source] [dossier_destination]
 * Par défaut : img/photos/ → img/photos/webp/
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sourceDir = process.argv[2] || path.join(__dirname, '..', 'img', 'photos');
const destDir = process.argv[3] || path.join(sourceDir, 'webp');

async function convert() {
  if (!fs.existsSync(sourceDir)) {
    console.error(`❌ Dossier source introuvable : ${sourceDir}`);
    process.exit(1);
  }

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const files = fs.readdirSync(sourceDir).filter(f =>
    /\.(jpg|jpeg|png)$/i.test(f)
  );

  if (files.length === 0) {
    console.log('Aucune image à convertir.');
    return;
  }

  console.log(`🖼️  Conversion de ${files.length} image(s)...`);

  for (const file of files) {
    const input = path.join(sourceDir, file);
    const output = path.join(destDir, file.replace(/\.(jpg|jpeg|png)$/i, '.webp'));

    try {
      await sharp(input)
        .webp({ quality: 80 })
        .toFile(output);
      console.log(`  ✅ ${file} → ${path.basename(output)}`);
    } catch (err) {
      console.error(`  ❌ ${file} : ${err.message}`);
    }
  }

  console.log('🎉 Conversion terminée !');
}

convert();
