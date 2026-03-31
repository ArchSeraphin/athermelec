#!/usr/bin/env bash
# optimize-images.sh — Convertit JPG/JPEG/PNG en WebP et met à jour les références
# Usage : npm run optimize-images
# Dépendance : cwebp (brew install webp)

set -euo pipefail

IMG_DIR="$(dirname "$0")/../assets/img"
SRC_DIR="$(dirname "$0")/../client/src"
QUALITY=82
MAX_WIDTH=1920

# Résolution de cwebp (Homebrew ne met pas toujours /opt/homebrew/bin dans le PATH de npm)
CWEBP=$(command -v cwebp 2>/dev/null \
  || ls /opt/homebrew/bin/cwebp /usr/local/bin/cwebp 2>/dev/null | head -1)

if [ -z "$CWEBP" ]; then
  echo "❌ cwebp introuvable. Installez-le : brew install webp"
  exit 1
fi

converted=0
skipped=0

for file in "$IMG_DIR"/*.jpg "$IMG_DIR"/*.jpeg "$IMG_DIR"/*.png; do
  [ -f "$file" ] || continue

  filename=$(basename "$file")
  ext="${filename##*.}"
  base="${filename%.*}"
  out="$IMG_DIR/$base.webp"

  if [ -f "$out" ]; then
    echo "⏭  Déjà converti : $filename"
    ((skipped++)) || true
    continue
  fi

  if [ "$ext" = "png" ]; then
    # PNG → WebP lossless (logos, transparences)
    "$CWEBP" -lossless "$file" -o "$out" -quiet
    echo "✅ [lossless] $filename → $base.webp ($(du -h "$out" | cut -f1))"
  else
    # JPG/JPEG → WebP qualité 82, max 1920px de large
    "$CWEBP" -q "$QUALITY" -resize "$MAX_WIDTH" 0 "$file" -o "$out" -quiet
    echo "✅ [lossy]    $filename → $base.webp ($(du -h "$out" | cut -f1))"
  fi

  # Mise à jour des références dans le code source
  old_ref="$filename"
  new_ref="$base.webp"
  grep -rl "$old_ref" "$SRC_DIR" 2>/dev/null | while read -r srcfile; do
    sed -i '' "s|$old_ref|$new_ref|g" "$srcfile"
    echo "   ↳ Référence mise à jour dans $(basename "$srcfile")"
  done

  # Suppression de l'original
  rm "$file"
  ((converted++)) || true
done

echo ""
echo "Done : $converted converti(s), $skipped déjà en WebP."
