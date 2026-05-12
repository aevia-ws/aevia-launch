# ANTIGRAVITY — Skylaunch Template Rewrite Brief
# 55 templates → Gold Standard (Top 1% design mondial)

> **Date**: 2026-05-12
> **Scope**: Réécriture de 55 templates visibles vers le niveau premium absolu
> **NE PAS TOUCHER**: impact-01 à impact-49 (déjà gold)

---

## OBJECTIF

Faire de Skylaunch la galerie de templates **top 1% mondial** — au niveau de Framer, Webflow Showcase, Awwwards.
Chaque template doit être une référence de design dans son secteur, digne d'être cité sur designspells.com ou godly.website.

---

## OUTILS DISPONIBLES — UTILISE-LES TOUS

### Inspiration design (étudier avant de coder)
- **designspells.com** — design details que les meilleurs sites font
- **godly.website** — galerie des meilleurs sites web du monde
- **mobbin.com** — patterns UI mobile et web de référence
- **designvault.io** — archive des meilleures interfaces par catégorie

### Animation références
- **gsap.com/showcase** — les animations les plus avancées du web
- **animejs.com** — micro-animations et effets
- **motion.dev** — Motion/Framer Motion documentation et exemples avancés
- **motionsites.ai** — sites avec les meilleures animations
- **vibeui.online** — UI components animés de référence

### Génération et inspiration
- **manus.im** — agent AI pour générer des idées de design
- **spline.design** — 3D interactif (embed Spline viewer si pertinent)
- **univorn.studio** — studio créatif pour inspiration de layout

### MCP Magic (composants UI premium)
Le serveur MCP `magic` est installé et disponible.
Utilise-le pour générer des composants UI complexes :
```
mcp__magic__21st_magic_component_builder — génère des composants React premium
mcp__magic__21st_magic_component_inspiration — trouve des exemples de composants
```

### Skill disponible : `/ui-ux-pro-max`
Avant chaque template, lancer :
```bash
python3 /Users/milliandvalentin/.claude/skills/ui-ux-pro-max/scripts/search.py \
  "[business type] [keywords]" --design-system -p "[Template Name]"
```
Exemple pour un template luxury watch :
```bash
python3 /Users/milliandvalentin/.claude/skills/ui-ux-pro-max/scripts/search.py \
  "luxury watch horology premium dark" --design-system -p "Atelier Mécanique"
```
**Ce skill retourne** : palette de couleurs, typographie recommandée, style UI, anti-patterns à éviter.

### Librairies installées dans le projet
- **framer-motion** (`npm install` déjà fait) — animations scroll, spring, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll, useInView
- **shadcn/ui** — composants UI prêts (`Button`, `Card`, `Dialog`, `Tabs`, `Accordion`, `Badge`, etc.)
  - Import : `import { Button } from "@/components/ui/button"`
  - Utiliser pour les éléments interactifs complexes (modals, accordions, tabs)
  - **Toujours overrider les styles shadcn avec `style={}` inline pour garder la cohérence du design**
- **lucide-react** — iconographie (liste des icons autorisées ci-dessous)

---

## GOLD STANDARD — Pattern obligatoire

### Structure de fichier type
```tsx
"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star, Check, /* autres icons */ } from "lucide-react";
// shadcn si nécessaire :
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const C = {
  bg: "#...",         // background principal
  bgAlt: "#...",      // background sections alternées
  text: "#...",       // texte principal
  textMuted: "#...",  // texte secondaire
  accent: "#...",     // couleur accent principale
  accentDark: "#...", // variante sombre
  accentLight: "#...",// variante claire
  border: "#...",     // bordures
  white: "#ffffff",
  // + couleurs spécifiques au secteur
};

// Google Fonts inline
// DONNÉES RICHES : au moins 4-6 tableaux
const SERVICES = [/* 4-6 items avec titre, description, prix, icône, détails */];
const TESTIMONIALS = [/* 6 témoignages avec nom, poste, ville, note, texte */];
const STATS = [/* 4 stats avec valeur, label, suffix */];
const PRICING = [/* 3 plans avec nom, prix, features[], cta */];
const TEAM = [/* 4 membres avec nom, rôle, bio */];
const FAQ = [/* 5-6 questions/réponses */];

export default function ImpactXXPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.15]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  return (
    <div ref={containerRef} style={{ background: C.bg, color: C.text, minHeight: "100vh" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=...&display=swap');`}</style>
      {/* 10 sections minimum */}
    </div>
  );
}
```

### Règles ABSOLUES (tolérance zéro)
| Règle | Requis | Interdit |
|-------|--------|---------|
| Styles | `style={{ ... }}` inline 100% | `className=` Tailwind |
| Couleurs | Via `C.xxx` uniquement | Valeurs hex hardcodées dans JSX |
| Animations | `motion.div` sur chaque section | Sections statiques |
| Scroll | `useScroll` + `useTransform` sur ≥ 3 zones | Hero uniquement |
| Interactivité | `AnimatePresence` + `useState` sur ≥ 1 composant | Pure statique |
| Longueur | ≥ 800 lignes (cible 1000-1500) | < 800 lignes |
| Sections | ≥ 9 sections `<section>` | < 7 sections |
| Business | Vrai nom, vraie ville, vrais prix | "Company Name", Lorem ipsum |
| Icons | Lucide standard uniquement | Twitter, Github, Linkedin, Facebook, Instagram, Pinterest, Codesandbox |

### Icônes de remplacement obligatoires
```
Twitter      → MessageSquare
Github       → GitBranch
Linkedin     → Link2
Facebook     → Users2
Instagram    → Camera
Pinterest    → Bookmark
Codesandbox  → Code2
```

### Structure des 10 sections cibles
1. **Nav** — sticky/floating, logo, liens, CTA button, hamburger mobile
2. **Hero** — plein écran, headline impactante, sous-titre, 2 CTA, signature element animé
3. **Stats/USP** — 4 chiffres clés animés au scroll (counter ou reveal)
4. **Services/Features** — 4-6 cards avec hover effect, icônes, descriptions
5. **Process/How it works** — timeline ou étapes numérotées (3-5 steps)
6. **Portfolio/Gallery** — grille avec filtres ou tabs shadcn, hover overlay
7. **Testimonials** — 4-6 avis avec photo placeholder, note étoiles, carousel ou masonry
8. **Pricing** — 3 plans avec highlights, toggle mensuel/annuel si SaaS
9. **Team** — 3-4 membres avec rôle, bio courte, réseaux
10. **FAQ + CTA final + Footer** — accordion shadcn pour FAQ, gradient CTA, footer complet

### Signature Element (UN par template — obligatoire)
C'est L'élément mémorable unique. Exemples des templates gold :
- Wine bar (impact-37) : SVG bouteille qui se remplit avec `pathLength` au scroll
- Farm (impact-40) : carte régions France avec hover interactif
- Fragrance (impact-26) : molécule SVG en rotation continue
- Sailing school (impact-14) : vague SVG animée en hero
- Jewelry (impact-20) : marquee produits avec pause au hover
- Recording studio (impact-42) : barres EQ qui bougent en tempo
- SaaS (impact-25) : dashboard live avec données animées
- Cybersec (impact-15) : terminal avec logs qui défilent en temps réel

**Trouve le signature element qui correspond parfaitement au secteur du template.**

### Typographies par secteur
```
Luxury / Fine dining      → Cormorant Garamond (serif élégant)
Tech / SaaS               → Inter ou Space Grotesk (sans moderne)
Dev / Terminal            → JetBrains Mono (monospace)
Editorial / Magazine      → Playfair Display (serif éditorial)
Creative / Agence         → DM Sans ou Space Grotesk
Health / Wellness / Spa   → Nunito ou Lato (rond, doux)
Legal / Finance / Corp    → Libre Baskerville ou Merriweather
Food & Drink / Restaurant → Libre Baskerville ou Playfair
Architecture / BTP        → Oswald ou Barlow Condensed
Tattoo / Ink              → system-ui bold ou Anton
```

### Import Google Fonts dans JSX
```tsx
<style>{`
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
`}</style>
```

---

## Anti-patterns INTERDITS

### ❌ Le template "court-circuit" (le pire)
Un design "minimaliste" de 350 lignes avec 3 sections vides.
**Même un design ultra-minimal a des données riches** — le minimalisme est dans le style, pas dans le contenu.

### ❌ Le placeholder évident
"Service 1", "Feature description goes here", "John Doe — CEO", "Lorem ipsum dolor sit amet"
**Tout doit être un vrai business imaginé** : noms français/internationaux réalistes, vraie ville, vrais tarifs.

### ❌ L'animation token unique
Juste `opacity: 0 → 1` sur chaque div. C'est du bruit, pas une animation.
**Chaque section a sa propre animation signature** : clip-path reveal, scale + blur, slide depuis un côté différent, stagger des children, rotation, etc.

### ❌ La répétition de layout
Deux templates avec la même grille 3 colonnes hero + cards + testimonials identique.
**Chaque template = une identité visuelle unique** — différents layouts, différentes hiérarchies.

### ❌ Tailwind résiduel
Même un seul `className="flex"` est une violation. Zéro Tailwind.

### ❌ Shadcn sans style override
Utiliser un `<Button>` shadcn avec son style par défaut violet cassé. 
**Toujours overrider** : `<Button style={{ background: C.accent, color: C.white, border: "none" }}>`.

---

## Templates à réécrire — 55 au total

### GROUPE C — Réécriture complète (Old Tailwind Architecture)
31 templates. Utiliser l'identité existante (nom, secteur) mais réécrire de zéro avec le nouveau pattern.

| ID | Nom | Catégorie | Direction créative |
|----|-----------|-----------|--------------------|
| impact-57 | Mask Unit | Creative | Agence créative dark — typographie massive avec mask video, portfolio immersif, noir pur |
| impact-58 | Skew OS | Creative | Studio motion design — scroll cinétique avec distorsion skew, projets animés |
| impact-61 | Segment OS | Minimal | Studio architecture minimaliste — dot navigation verticale, sections snap, projets B&W |
| impact-63 | Orbit Unit | Luxury | Maison horlogère — rotation produit 3D au scroll, dark charcoal/or, Cormorant Garamond |
| impact-64 | Data Stream OS | Tech | Cybersécurité — terminal dark vert néon, live threat feed, JetBrains Mono |
| impact-68 | Orbit OS | Creative | Agence branding — typographie circulaire SVG, reveal projets, dark bold |
| impact-69 | Depth OS | Minimal | Photographe nature — parallaxe profondeur multi-couches, tons forêt/sépia |
| impact-72 | Stack Unit | Creative | Studio film/pub — stack cartes 3D avec spring physics, projets cinéma, noir |
| impact-81 | Vogue Noire | Editorial | Magazine mode luxury — grille mosaïque asymétrique, editorial B&W pur |
| impact-82 | Blueprint Dev | Tech | Promoteur immobilier institutionnel — plans archi SVG, tons béton/acier |
| impact-83 | Aurelius Heritage | Luxury | Joaillerie + horlogerie — gemstone reveal animé, dark chaud, ultra-premium |
| impact-84 | Cypher Clinic | Luxury | Médecine esthétique élite — dark clinique or/blanc, protocoles premium |
| impact-85 | Aether Labs | Minimal | Labo skincare science — blanc/kaki, moléculaire, clinique |
| impact-86 | Aura Wellness | Luxury | Spa wellness luxe — rituels animés, tons sable/or, booking interactif |
| impact-88 | Velvet Nails | Luxury | Nail art salon premium — portfolio filtrable, dark velours/or rose |
| impact-89 | Ink & Iron | Luxury | Tatouage luxury dark-brutalist — masonry portfolio, styles filtrables |
| impact-90 | Maison Laval | Food & Drink | Boulangerie artisanale — ivoire/brun chaud, menu produits animé |
| impact-91 | Aurelia Jewels | Luxury | Atelier joaillerie — archives saisonnières, bespoke service, dark or |
| impact-94 | Botanica Flowers | Luxury | Atelier floral luxury — archives bouquets avec filtres, botanique architecturale |
| impact-95 | Lumière Clinic | Health | Clinique esthétique premium — protocoles médicaux, blanc/or, diagnostic |
| impact-96 | Urban Pulse | Creative | Studio cinéma — archives horizontales, dark ambré, montage |
| impact-112 | Artisan Minimal | Minimal | E-commerce artisanal — grille warm hover cart, tons terre |
| impact-114 | Terra Slider | Creative | Portfolio paysagiste / photographe nature — curtain reveal plein écran |
| impact-115 | Verda Parallax | Creative | Studio végétal / paysagisme — parallaxe multi-vitesse, émeraude |
| impact-126 | Trattoria Menu | Food & Drink | Restaurant italien — menu tabulé (shadcn Tabs), cuir/or, ambiance chaleureuse |
| impact-130 | Split Reveal | Creative | Studio design branding — split-screen reveal, émeraude |
| impact-131 | Cuvée Prestige | Luxury | Cave à vins prestige — hero bouteille SVG animé, dark bordeaux/or |
| impact-132 | Elementum | Minimal | Portfolio design minimaliste — lignes alternantes, typographie aérée |
| impact-133 | Atlas Zoom | Creative | Agence voyage aventure — zoom reveal hero, skyline, bleu ciel |
| impact-134 | Lumière Beauty | Luxury | Beauty/skincare e-commerce — pêche/rose, grille produits avec panier |
| impact-135 | Trade OS | Tech | Plateforme trading fintech — ticker live animé, dark vert/rouge |

### GROUPE A — Expansion de contenu (Bonne architecture, trop courts)
14 templates. Conserver l'identité et les couleurs, TOUT enrichir jusqu'à ≥ 800 lignes.

| ID | Nom | Catégorie | Sections à ajouter |
|----|-----|-----------|-------------------|
| impact-158 | Atlas — Journal de Voyage | Editorial | Destinations grid hover, galerie photos masonry, auteur bio, newsletter, awards |
| impact-163 | L'Essentiel | Editorial | Articles featured grid, sidebar catégories, profils auteurs, newsletter, archive mois |
| impact-165 | Pulse App | Tech | Features 3 colonnes animées, pricing, témoignages App Store, mockup démo scroll |
| impact-166 | Iris Studio | Creative | Portfolio filtrable (landscape/portrait/commercial), process, booking, about cinéma |
| impact-167 | Rive Gauche Immobilier | Luxury | Listings grid avec filtres prix/type, stats agence, agents profiles, estimation form |
| impact-168 | Éclat | E-Commerce | Collections grid hover, bestsellers, programme fidélité, tailles/couleurs selector |
| impact-169 | Fréquence | Editorial | Articles grid, categories sidebar sticky, featured story hero, newsletter, auteur |
| impact-170 | Rafaël Moreau | Creative | Stack tech avec barres compétences, projets GitHub-style, blog, timeline parcours |
| impact-171 | Vitalité Médical | Health | Spécialités cards, médecins profiles, prise RDV interactif, avis patients, assurances |
| impact-172 | Legrand & Associés | Corporate | Domaines droit, avocats profiles, publications récentes, dossiers types, contact form |
| impact-173 | Structure Bâtisseurs | Services | Chantiers réalisés gallery, corps de métiers, délais garantis, devis form, partenaires |
| impact-174 | FORGE | Services | Programmes training cards, coachs profiles, résultats avant/après, abonnements, planning |
| impact-175 | Confluence Events | Services | Types événements avec gallery, process en timeline, équipe, galerie passés, devis form |
| impact-176 | Metric | Tech | Dashboard mockup SVG animé, features SaaS 3 colonnes, pricing toggle, intégrations grid |

### GROUPE B — Expansion ciblée (Base correcte, 400-541 lignes)
10 templates. Même approche que Groupe A.

| ID | Nom | Catégorie | Direction |
|----|-----|-----------|-----------|
| impact-157 | Aurum Jewelry | Luxury | Collection bijoux — essayage virtuel, certificats authenticité, gravure personnalisée |
| impact-161 | Essential SaaS | Free | Landing SaaS gratuit — features grid, pricing free/pro, intégrations, CTA double |
| impact-162 | Essential Cafe | Free | Café local — menu complet, galerie barista, équipe, événements, horaires |
| impact-164 | Bureau | Creative | Agence brutaliste — projets grille mono, process, team, manifeste typographique |
| impact-196 | The Bio-Robot | Tech | Interface cybernétique — specs modules, pricing tiers, FAQ technique, waitlist |
| impact-197 | Évasion Dorée | Luxury | Agence voyage luxury — destinations cards, packages, témoignages, conciergerie |
| impact-198 | Lumière Beauty | Services | Salon beauté — soins grid, équipe, avant/après shadcn Tabs, booking, fidélité |
| impact-199 | Encre & Âme | Creative | Studio tatouage — styles 6 cards, artistes profiles, flash sales, booking, FAQ |
| impact-200 | Cérémonie | Services | Wedding planner — formules, galerie mariages masonry, témoignages, FAQ accordion |
| impact-201 | Maison Saveur | Food & Drink | Chef privé — menus saison, expériences gourmet, chef bio, réservation, presse |

---

## Plan d'exécution parallèle

Lancer 11 agents en parallèle, chacun avec 5 templates :

| Agent | Templates | Groupe |
|-------|-----------|--------|
| Agent 1 | impact-57, 58, 61, 63, 64 | C |
| Agent 2 | impact-68, 69, 72, 81, 82 | C |
| Agent 3 | impact-83, 84, 85, 86, 88 | C |
| Agent 4 | impact-89, 90, 91, 94, 95 | C |
| Agent 5 | impact-96, 112, 114, 115, 126 | C |
| Agent 6 | impact-130, 131, 132, 133, 134 | C |
| Agent 7 | impact-135, 157, 158, 161, 162 | C + B |
| Agent 8 | impact-163, 164, 165, 166, 167 | A |
| Agent 9 | impact-168, 169, 170, 171, 172 | A |
| Agent 10 | impact-173, 174, 175, 176, 196 | A + B |
| Agent 11 | impact-197, 198, 199, 200, 201 | B |

---

## Workflow par agent (pour chaque template)

```bash
# 1. Lire le fichier existant
cat app/templates/[id]/page.tsx

# 2. Lire les métadonnées registry
grep -A 10 '"[id]"' lib/templates/registry.ts

# 3. Lire le gold standard de référence (selon le secteur)
# Tech/SaaS       → app/templates/impact-15/page.tsx  (Fortress, 1558 lignes)
# Luxury dark     → app/templates/impact-37/page.tsx  (Clos du Soir, 1808 lignes)
# Luxury light    → app/templates/impact-20/page.tsx  (Orens Jewelry, 1419 lignes)
# Food & Drink    → app/templates/impact-33/page.tsx  (La Fournée, 1155 lignes)
# Health          → app/templates/impact-30/page.tsx  (Smile Studio, 1419 lignes)
# Creative        → app/templates/impact-27/page.tsx  (Vertex Studio, 1200 lignes)
# Services        → app/templates/impact-35/page.tsx  (Nexus Hub, 1558 lignes)
# Editorial       → app/templates/impact-23/page.tsx  (Studio Pelikan, 1200 lignes)

# 4. Lancer le design system check
python3 /Users/milliandvalentin/.claude/skills/ui-ux-pro-max/scripts/search.py \
  "[keywords secteur]" --design-system -p "[Template Name]"

# 5. Écrire le nouveau fichier (remplacement complet)
# ... write app/templates/[id]/page.tsx ...

# 6. Validation automatique
echo "Lines:" && wc -l app/templates/[id]/page.tsx
echo "Tailwind className count:" && grep -c 'className=' app/templates/[id]/page.tsx
echo "Sections count:" && grep -c '<section' app/templates/[id]/page.tsx
echo "Has const C:" && grep -c 'const C = {' app/templates/[id]/page.tsx
echo "Has framer-motion:" && grep -c 'from "framer-motion"' app/templates/[id]/page.tsx
```

### Critères de validation (OBLIGATOIRES avant commit)
- [ ] Lignes ≥ 800 (cible 1000-1500)
- [ ] `className=` count = 0 (ou ≤ 2 pour les shadcn wrappers si inévitable)
- [ ] `<section` count ≥ 9
- [ ] `const C = {` count ≥ 1
- [ ] `from "framer-motion"` présent
- [ ] `useScroll` présent
- [ ] `useInView` présent
- [ ] Aucune icône bannie (grep Twitter|Github|Linkedin|Facebook|Instagram|Pinterest|Codesandbox → 0)

### Commit après chaque batch de 5
```bash
cd /Users/milliandvalentin/skylaunch
git add app/templates/
git commit -m "feat: rewrite batch [N] — [id1] to [id5] gold standard"
git push origin main
```

---

## Références qualité absolue

Avant de commencer, lire ces 3 templates intégralement :

```bash
# Gold dark luxury (1808 lignes)
cat app/templates/impact-37/page.tsx

# Gold tech dark (1558 lignes)
cat app/templates/impact-15/page.tsx

# Gold light services (1558 lignes)
cat app/templates/impact-35/page.tsx
```

Ces 3 fichiers définissent le niveau de densité, d'animation, et de contenu attendu.

---

## Standards de design top 1% mondial

Pour atteindre le niveau designspells.com / godly.website / Awwwards :

### Micro-interactions obligatoires
- Hover sur chaque card : `scale(1.02)` + `box-shadow` change + couleur transition
- Boutons : `scale(0.98)` au click (active state)
- Liens nav : underline animé avec `scaleX` depuis left
- Images : zoom léger `scale(1.05)` au hover avec `overflow: hidden`

### Scroll animations sophistiquées
- **Parallaxe multi-couches** : hero background + foreground à vitesses différentes
- **Clip-path reveal** : sections qui "s'ouvrent" au scroll
- **Counter animation** : chiffres qui comptent de 0 à la valeur cible
- **Stagger enfants** : liste d'items qui apparaissent en cascade (delay 0.1s each)
- **Sticky scroll** : sidebar ou label qui reste fixe pendant que le contenu défile

### Détails visuels signature top 1%
- **Grain texture** : SVG filter `feTurbulence` pour texture film sur les heros dark
- **Gradient text** : `background-clip: text` pour les titres hero
- **Border animations** : bordures qui se dessinent au scroll avec `pathLength`
- **Noise overlay** : pseudo-element avec opacité 0.03-0.05 pour profondeur
- **Custom cursor** (optionnel) : curseur magnétique sur les éléments clés

### Layout patterns premium
- **Asymétrique** : pas de grille parfaitement symétrique — offset, overlaps
- **Full bleed** : images qui cassent les marges et vont bord à bord
- **Large whitespace** : `padding: 120px 0` minimum entre sections
- **Typography oversized** : titres en `clamp(48px, 8vw, 120px)` pour impact maximal
- **Mixed grid** : alterner 1 colonne / 2 colonnes / 3 colonnes selon les sections
