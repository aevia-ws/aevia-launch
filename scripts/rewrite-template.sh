#!/bin/bash
# Template rewrite helper - validates output after writing
TEMPLATE_ID=$1
FILE="app/templates/impact-${TEMPLATE_ID}/page.tsx"

if [ -z "$TEMPLATE_ID" ]; then
  echo "Usage: ./scripts/rewrite-template.sh <id>"
  exit 1
fi

echo "=== Validating impact-${TEMPLATE_ID} ==="
echo "Lines: $(wc -l < "$FILE")"
echo "className count: $(grep -c 'className=' "$FILE" 2>/dev/null || echo 0)"
echo "Sections count: $(grep -c '<section' "$FILE")"
echo "Has const C: $(grep -c 'const C = {' "$FILE")"
echo "Has framer-motion: $(grep -c 'from \"framer-motion\"' "$FILE")"
echo "Has useScroll: $(grep -c 'useScroll' "$FILE")"
echo "Has useInView: $(grep -c 'useInView' "$FILE")"
echo "Banned icons: $(grep -cE 'Twitter|Github|Linkedin|Facebook|Instagram|Pinterest|Codesandbox' "$FILE" 2>/dev/null || echo 0)"

LINES=$(wc -l < "$FILE")
CLASSNAMES=$(grep -c 'className=' "$FILE" 2>/dev/null || echo 0)
SECTIONS=$(grep -c '<section' "$FILE")

if [ "$LINES" -lt 800 ]; then echo "❌ FAIL: Lines < 800"; fi
if [ "$CLASSNAMES" -gt 2 ]; then echo "❌ FAIL: Too many classNames ($CLASSNAMES)"; fi
if [ "$SECTIONS" -lt 9 ]; then echo "❌ FAIL: Sections < 9 ($SECTIONS)"; fi
echo "=== Done ==="
