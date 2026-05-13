"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { ShoppingBag, Heart, Search, User, ArrowRight, Check, Star, Package, RefreshCw, Leaf, Camera, X, ChevronLeft, ChevronRight, Truck } from "lucide-react";

// ─── Design Tokens ────────────────────────────────────────────────────────────
const C = {
  bg: "#0D0D0D",
  bgAlt: "#111111",
  bgCard: "#161616",
  cream: "#F5F0E8",
  creamDim: "rgba(245,240,232,0.55)",
  gold: "#C8A96E",
  goldDark: "#A8893E",
  goldLight: "rgba(200,169,110,0.15)",
  white: "#FFFFFF",
  border: "rgba(200,169,110,0.18)",
  borderLight: "rgba(255,255,255,0.06)",
  muted: "rgba(245,240,232,0.4)",
  serif: "'DM Serif Display', 'Cormorant Garamond', Georgia, serif",
  sans: "'DM Sans', system-ui, sans-serif",
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const ANNOUNCEMENTS = [
  "Livraison offerte dès 150 € — Code ÉCLAT20 : –20% sur la nouvelle collection",
  "Nouvelle collection Été Brûlant — 34 pièces exclusives disponibles dès maintenant",
  "Retours gratuits 30 jours · Emballage cadeau offert · Matières certifiées GOTS",
];

const COLLECTIONS = [
  {
    id: "ete",
    name: "Été Brûlant",
    subtitle: "Été 2025",
    pieces: 34,
    badge: "Nouvelle collection",
    description: "Lin, soie et tencel. Des matières qui respirent dans des coloris soleil, terracotta et sable brûlé.",
    accent: "#D4896A",
  },
  {
    id: "neutres",
    name: "Essentiels Neutres",
    subtitle: "Permanente",
    pieces: 28,
    badge: "Bestseller",
    description: "La garde-robe intemporelle. Beige, écru, gris souris — des pièces qui traversent les années.",
    accent: "#B5A895",
  },
  {
    id: "nuit",
    name: "Nuit Dorée",
    subtitle: "Édition limitée",
    pieces: 19,
    badge: "Édition limitée",
    description: "Pour les soirées qui comptent. Matières nobles, coupes sculptées, finitions haute couture.",
    accent: "#C8A96E",
  },
  {
    id: "resort",
    name: "Resort Méditerranée",
    subtitle: "Capsule exclusive",
    pieces: 12,
    badge: "Exclusivité",
    description: "Capsule créée en partenariat avec des artisans de Marseille. Broderies marines, voiles légères.",
    accent: "#7A9BB0",
  },
];

const PRODUCTS = [
  {
    name: "Robe Lin Biarritz",
    price: 189,
    oldPrice: null,
    tag: "Nouveau",
    tagType: "new",
    collection: "Été Brûlant",
    sizes: ["XS", "S", "M", "L", "XL"],
    material: "100% Lin lavé",
    colors: ["#C9A87C", "#E8DDD0", "#7B6B5A"],
    rating: 4.9,
    reviews: 142,
  },
  {
    name: "Top Soie Côte d'Azur",
    price: 134,
    oldPrice: 189,
    tag: "–29%",
    tagType: "sale",
    collection: "Nuit Dorée",
    sizes: ["XS", "S", "M", "L"],
    material: "100% Soie grège",
    colors: ["#C4754E", "#2C2C3E", "#E8D5C4"],
    rating: 4.8,
    reviews: 89,
  },
  {
    name: "Pantalon Wide-Leg",
    price: 165,
    oldPrice: null,
    tag: null,
    tagType: null,
    collection: "Essentiels Neutres",
    sizes: ["34", "36", "38", "40", "42", "44"],
    material: "Tencel Lyocell",
    colors: ["#6B7A5C", "#C4B9A8", "#1A1A1A"],
    rating: 4.7,
    reviews: 203,
  },
  {
    name: "Blazer Sable",
    price: 295,
    oldPrice: null,
    tag: "Exclusivité",
    tagType: "exclusive",
    collection: "Essentiels Neutres",
    sizes: ["34", "36", "38", "40", "42", "44"],
    material: "Laine vierge GOTS",
    colors: ["#D4C4A8", "#8B7355", "#2A2A2A"],
    rating: 5.0,
    reviews: 67,
  },
  {
    name: "Robe Dos-Nu Riviera",
    price: 215,
    oldPrice: null,
    tag: "Quasi épuisé",
    tagType: "low",
    collection: "Resort Méditerranée",
    sizes: ["XS", "S", "M"],
    material: "Viscose OEKO-TEX",
    colors: ["#D4A0A0", "#F5E8E0", "#7BA4C4"],
    rating: 4.9,
    reviews: 44,
  },
  {
    name: "Chemise Portuense",
    price: 98,
    oldPrice: 145,
    tag: "–32%",
    tagType: "sale",
    collection: "Été Brûlant",
    sizes: ["XS", "S", "M", "L", "XL"],
    material: "Coton égyptien",
    colors: ["#B5C4B1", "#E8E0D4", "#4A6B5A"],
    rating: 4.6,
    reviews: 178,
  },
  {
    name: "Jupe Midi Plissée",
    price: 145,
    oldPrice: null,
    tag: "Nouveau",
    tagType: "new",
    collection: "Été Brûlant",
    sizes: ["XS", "S", "M", "L", "XL"],
    material: "Polyester recyclé",
    colors: ["#C8A96E", "#E8D4B0", "#6B5A3E"],
    rating: 4.8,
    reviews: 31,
  },
  {
    name: "Pull Cachemire Léger",
    price: 245,
    oldPrice: null,
    tag: "Exclusivité",
    tagType: "exclusive",
    collection: "Nuit Dorée",
    sizes: ["XS", "S", "M", "L"],
    material: "Cachemire Grade A",
    colors: ["#F5F0E8", "#C4B4A0", "#2A2A2A"],
    rating: 5.0,
    reviews: 58,
  },
];

const TESTIMONIALS = [
  {
    quote: "La qualité est incomparable. J'ai la Robe Lin depuis 2 ans — elle est toujours parfaite après chaque lavage. C'est exactement ce que j'attendais d'une marque éthique.",
    name: "Pauline M.",
    location: "Paris 11e",
    service: "Robe Lin Biarritz",
    stars: 5,
    verified: true,
  },
  {
    quote: "Livraison le lendemain, emballage cadeau inclus et une petite note manuscrite. J'offre Éclat à toutes mes amies maintenant. La marque qui comprend le luxe accessible.",
    name: "Juliette D.",
    location: "Lyon",
    service: "Top Soie Côte d'Azur",
    stars: 5,
    verified: true,
  },
  {
    quote: "Enfin une boutique qui a des tailles pour les vraies femmes. Les coupes sont d'une précision rare — le 38 d'Éclat, c'est vraiment un 38 européen.",
    name: "Amélie R.",
    location: "Bordeaux",
    service: "Blazer Sable",
    stars: 5,
    verified: true,
  },
  {
    quote: "Le service client est exceptionnel. J'ai eu un problème de taille, ils m'ont renvoyé un article sans même attendre le retour. Confiance totale.",
    name: "Sophie K.",
    location: "Marseille",
    service: "Pantalon Wide-Leg",
    stars: 5,
    verified: true,
  },
  {
    quote: "Des matières qui ont l'air chères parce qu'elles l'are vraiment. Mon Pull Cachemire a survécu à 40 lavages machine — je n'en reviens toujours pas.",
    name: "Margot L.",
    location: "Lille",
    service: "Pull Cachemire Léger",
    stars: 5,
    verified: true,
  },
  {
    quote: "La jupe midi plissée est parfaite du bureau au dîner. Exactement ce dont j'avais besoin pour simplifier ma garde-robe.",
    name: "Claire B.",
    location: "Nantes",
    service: "Jupe Midi Plissée",
    stars: 5,
    verified: true,
  },
];

const LOYALTY_TIERS = [
  {
    name: "Ivoire",
    threshold: "0 – 300 €",
    perks: ["Accès aux ventes privées", "Newsletter en avant-première", "Guide des tailles personnalisé"],
    color: "#E8E0D4",
  },
  {
    name: "Or",
    threshold: "300 – 800 €",
    perks: ["Tout niveau Ivoire", "Livraison prioritaire 24h", "Retours illimités", "–10% sur les nouvelles collections"],
    color: C.gold,
  },
  {
    name: "Platine",
    threshold: "800 € +",
    perks: ["Tout niveau Or", "Personal shopper dédié", "Accès ateliers créateurs", "Invitations événements exclusifs", "–15% permanent"],
    color: "#C0C0C0",
  },
];

const FAQS = [
  {
    q: "Quels sont les délais de livraison ?",
    a: "Livraison standard 2–3 jours ouvrés. Express J+1 disponible (avant 14h). Gratuit dès 150 € d'achat. International disponible vers 45 pays.",
  },
  {
    q: "Puis-je retourner un article ?",
    a: "30 jours de retour, sans justification. Le colis de retour prépayé est inclus dans votre commande. Remboursement sous 5 jours ouvrés.",
  },
  {
    q: "Les tailles sont-elles fidèles ?",
    a: "Oui — notre guide des tailles détaillé (tour de poitrine, hanches, longueurs) est disponible sur chaque fiche produit. Un chat live avec notre équipe est aussi disponible.",
  },
  {
    q: "Vos matières sont-elles durables ?",
    a: "Nous travaillons uniquement avec des fournisseurs certifiés GOTS et OEKO-TEX. Aucune matière synthétique issue du pétrole depuis 2022.",
  },
  {
    q: "Proposez-vous un emballage cadeau ?",
    a: "Oui — boîte cartonnée, ruban et carte message manuscrite, offerts sur demande à la commande. Expédition discrète (pas de prix visible sur le colis).",
  },
  {
    q: "Comment fonctionne le programme fidélité ?",
    a: "Chaque euro dépensé = 1 point Éclat. À partir de 300 points, accédez au niveau Or avec des avantages exclusifs. Le niveau Platine débute à 800 points annuels.",
  },
];

const STATS = [
  { val: "4.92", label: "Note moyenne", sub: "2 840 avis vérifiés" },
  { val: "J+1", label: "Livraison express", sub: "Commande avant 14h" },
  { val: "30 j", label: "Retours gratuits", sub: "Sans justification" },
  { val: "100%", label: "Matières certifiées", sub: "GOTS & OEKO-TEX" },
];

// ─── Animated Announcement Bar ───────────────────────────────────────────────
function AnnouncementBar() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % ANNOUNCEMENTS.length), 3800);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      style={{
        background: C.gold,
        padding: "11px 16px",
        textAlign: "center",
        overflow: "hidden",
        position: "relative",
        height: 38,
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            fontSize: 12,
            fontFamily: C.sans,
            fontWeight: 600,
            letterSpacing: 0.8,
            color: C.bg,
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            whiteSpace: "nowrap",
          }}
        >
          {ANNOUNCEMENTS[current]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({ p, i, onAddToCart }: { p: typeof PRODUCTS[0]; i: number; onAddToCart: () => void }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [hovering, setHovering] = useState(false);
  const [added, setAdded] = useState(false);

  const tagColors: Record<string, string> = {
    new: C.gold,
    sale: "#D4614A",
    exclusive: "#8B7355",
    low: "#B5763A",
  };

  const handleAdd = () => {
    if (!selectedSize) return;
    onAddToCart();
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.07, duration: 0.5 }}
      onHoverStart={() => setHovering(true)}
      onHoverEnd={() => setHovering(false)}
      style={{
        background: C.bgCard,
        border: `1px solid ${C.borderLight}`,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Image area */}
      <div
        style={{
          height: 300,
          background: `linear-gradient(135deg, ${p.colors[0]}22 0%, ${p.colors[1]}22 100%)`,
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Colour swatches as product visual */}
        <motion.div
          animate={{ scale: hovering ? 1.04 : 1 }}
          transition={{ duration: 0.4 }}
          style={{
            display: "flex",
            gap: 8,
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 80,
              height: 140,
              background: `linear-gradient(160deg, ${p.colors[0]}, ${p.colors[1]})`,
              borderRadius: 4,
            }}
          />
          <div style={{ display: "flex", gap: 6 }}>
            {p.colors.map((color, ci) => (
              <div
                key={ci}
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: color,
                  border: `1.5px solid rgba(255,255,255,0.2)`,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Tag */}
        {p.tag && (
          <div
            style={{
              position: "absolute",
              top: 14,
              left: 14,
              background: p.tagType ? tagColors[p.tagType] : C.gold,
              color: "#fff",
              padding: "4px 10px",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: 0.8,
              fontFamily: C.sans,
            }}
          >
            {p.tag}
          </div>
        )}

        {/* Wishlist */}
        <motion.button
          onClick={() => setWishlisted(w => !w)}
          whileTap={{ scale: 0.85 }}
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            width: 36,
            height: 36,
            background: "rgba(0,0,0,0.5)",
            border: `1px solid ${wishlisted ? "#D4614A" : "rgba(255,255,255,0.15)"}`,
            borderRadius: "50%",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Heart
            size={15}
            fill={wishlisted ? "#D4614A" : "none"}
            stroke={wishlisted ? "#D4614A" : C.muted}
          />
        </motion.button>

        {/* Quick size hover overlay */}
        <AnimatePresence>
          {hovering && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                background: "rgba(13,13,13,0.92)",
                padding: "12px 14px",
                display: "flex",
                gap: 6,
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: 10, color: C.muted, fontFamily: C.sans, letterSpacing: 0.5, marginRight: 4 }}>
                Taille:
              </span>
              {p.sizes.map(s => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s === selectedSize ? null : s)}
                  style={{
                    padding: "3px 7px",
                    background: selectedSize === s ? C.gold : "transparent",
                    color: selectedSize === s ? C.bg : C.creamDim,
                    border: `1px solid ${selectedSize === s ? C.gold : "rgba(255,255,255,0.15)"}`,
                    fontSize: 10,
                    cursor: "pointer",
                    fontFamily: C.sans,
                    transition: "all 0.15s",
                  }}
                >
                  {s}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info */}
      <div style={{ padding: "18px 20px 20px" }}>
        <div style={{ fontSize: 10, color: C.gold, letterSpacing: 1.5, marginBottom: 4, fontFamily: C.sans }}>
          {p.collection} · {p.material}
        </div>
        <div
          style={{
            fontFamily: C.serif,
            fontSize: 17,
            color: C.cream,
            marginBottom: 6,
            fontStyle: "italic",
          }}
        >
          {p.name}
        </div>
        <div style={{ display: "flex", gap: 4, alignItems: "center", marginBottom: 14 }}>
          {[...Array(5)].map((_, j) => (
            <Star key={j} size={10} fill={C.gold} stroke="none" />
          ))}
          <span style={{ fontSize: 10, color: C.muted, fontFamily: C.sans, marginLeft: 4 }}>
            {p.rating} ({p.reviews})
          </span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: C.cream,
                fontFamily: C.sans,
              }}
            >
              {p.price} €
            </span>
            {p.oldPrice && (
              <span
                style={{
                  fontSize: 13,
                  color: C.muted,
                  textDecoration: "line-through",
                  fontFamily: C.sans,
                }}
              >
                {p.oldPrice} €
              </span>
            )}
          </div>
          <motion.button
            onClick={handleAdd}
            whileHover={{ background: added ? "#2A6A3A" : C.gold, color: C.bg }}
            whileTap={{ scale: 0.94 }}
            style={{
              padding: "8px 16px",
              background: added ? "#2A6A3A" : "transparent",
              color: added ? "#6EE6A0" : C.gold,
              border: `1px solid ${added ? "#2A6A3A" : C.gold}`,
              fontSize: 11,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s",
              fontFamily: C.sans,
              letterSpacing: 0.5,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            {added ? (
              <>
                <Check size={12} /> Ajouté
              </>
            ) : (
              <>
                <ShoppingBag size={12} /> Panier
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ImpactEclatPage() {
  const [cartCount, setCartCount] = useState(0);
  const [activeCollection, setActiveCollection] = useState(0);
  const [activeFilter, setActiveFilter] = useState("Tous");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeLoyaltyTier, setActiveLoyaltyTier] = useState(1);
  const [navScrolled, setNavScrolled] = useState(false);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const productsRef = useRef<HTMLElement>(null);
  const lookbookRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: containerRef });
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, -60]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.7]);

  const productsInView = useInView(productsRef, { once: true, margin: "-80px" });
  const lookbookInView = useInView(lookbookRef, { once: true, margin: "-80px" });

  useEffect(() => {
    const handleScroll = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filters = ["Tous", "Été Brûlant", "Essentiels Neutres", "Nuit Dorée", "Resort Méditerranée"];
  const filteredProducts =
    activeFilter === "Tous"
      ? PRODUCTS
      : PRODUCTS.filter(p => p.collection === activeFilter);

  return (
    <div
      ref={containerRef}
      style={{ background: C.bg, color: C.cream, minHeight: "100vh", fontFamily: C.sans, overflowX: "hidden" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        input::placeholder { color: rgba(245,240,232,0.3); }
        textarea::placeholder { color: rgba(245,240,232,0.3); }
      `}</style>

      {/* ANNOUNCEMENT BAR */}
      <AnnouncementBar />

      {/* NAV */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: navScrolled ? "rgba(13,13,13,0.97)" : "rgba(13,13,13,0.9)",
          backdropFilter: "blur(16px)",
          borderBottom: `1px solid ${navScrolled ? C.border : "transparent"}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 64px",
          height: 68,
          transition: "border-color 0.3s, background 0.3s",
        }}
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{
            fontFamily: C.serif,
            fontSize: 26,
            letterSpacing: 4,
            fontStyle: "italic",
            color: C.gold,
          }}
        >
          Éclat
        </motion.div>

        {/* Nav links */}
        <div style={{ display: "flex", gap: 40, alignItems: "center" }}>
          {["Collections", "Nouveautés", "Soldes", "Lookbook", "Notre histoire"].map(l => (
            <a
              key={l}
              href="#"
              style={{
                fontSize: 13,
                color: C.muted,
                textDecoration: "none",
                letterSpacing: 0.3,
                fontWeight: 500,
                transition: "color 0.2s",
                position: "relative",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = C.cream)}
              onMouseLeave={e => (e.currentTarget.style.color = C.muted as string)}
            >
              {l}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          <Search size={18} style={{ color: C.muted, cursor: "pointer" }} />
          <User size={18} style={{ color: C.muted, cursor: "pointer" }} />
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={() => setCartOpen(true)}
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "9px 20px",
              background: "transparent",
              color: C.gold,
              border: `1px solid ${C.gold}`,
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: C.sans,
              transition: "all 0.2s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = C.gold;
              (e.currentTarget as HTMLElement).style.color = C.bg;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color = C.gold;
            }}
          >
            <ShoppingBag size={15} />
            Panier
            {cartCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: -6,
                  right: -6,
                  width: 18,
                  height: 18,
                  background: C.gold,
                  color: C.bg,
                  borderRadius: "50%",
                  fontSize: 10,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {cartCount}
              </span>
            )}
          </motion.button>
        </div>
      </nav>

      {/* HERO — plein écran editorial dark */}
      <section
        ref={heroRef}
        style={{
          position: "relative",
          height: "92vh",
          background: C.bg,
          overflow: "hidden",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        {/* Background gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 30% 50%, rgba(200,169,110,0.08) 0%, transparent 55%), radial-gradient(ellipse at 70% 30%, rgba(212,137,106,0.06) 0%, transparent 50%)",
          }}
        />

        {/* Diagonal lines decoration */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 60px,
              rgba(200,169,110,0.02) 60px,
              rgba(200,169,110,0.02) 61px
            )`,
          }}
        />

        {/* Right image panel */}
        <motion.div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "42%",
            background: `linear-gradient(160deg, #1A1208 0%, #2A1F0E 50%, #1A1208 100%)`,
            borderLeft: `1px solid ${C.border}`,
          }}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {/* Decorative product silhouettes */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            style={{
              position: "absolute",
              top: "20%",
              left: "50%",
              transform: "translateX(-50%)",
              width: 160,
              height: 240,
              background: `linear-gradient(160deg, ${C.gold}33, ${C.gold}11)`,
              border: `1px solid ${C.border}`,
            }}
          />
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
            style={{
              position: "absolute",
              top: "35%",
              left: "30%",
              width: 100,
              height: 160,
              background: `linear-gradient(160deg, rgba(212,137,106,0.2), rgba(212,137,106,0.05))`,
              border: `1px solid rgba(212,137,106,0.2)`,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 40,
              left: 40,
              right: 40,
            }}
          >
            <div
              style={{
                fontSize: 10,
                color: C.gold,
                letterSpacing: 3,
                fontFamily: C.sans,
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Collection vedette
            </div>
            <div
              style={{
                fontFamily: C.serif,
                fontSize: 22,
                fontStyle: "italic",
                color: C.cream,
              }}
            >
              Été Brûlant 2025
            </div>
          </div>
        </motion.div>

        {/* Left content */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity, position: "relative", zIndex: 10, padding: "0 80px 80px", maxWidth: "62%" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <div
              style={{
                fontSize: 10,
                letterSpacing: 5,
                color: C.gold,
                textTransform: "uppercase",
                marginBottom: 32,
                fontFamily: C.sans,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div style={{ width: 32, height: 1, background: C.gold }} />
              Été 2025 · Nouvelle collection
            </div>

            <h1
              style={{
                fontFamily: C.serif,
                fontSize: "clamp(56px, 8vw, 112px)",
                fontWeight: 400,
                letterSpacing: -2,
                lineHeight: 0.92,
                color: C.cream,
                fontStyle: "italic",
                marginBottom: 40,
              }}
            >
              La chaleur<br />
              comme<br />
              <span style={{ color: C.gold }}>philosophie.</span>
            </h1>

            <p
              style={{
                fontSize: 17,
                color: C.creamDim,
                lineHeight: 1.75,
                marginBottom: 52,
                maxWidth: 440,
                fontWeight: 300,
              }}
            >
              Lin, soie, tencel. Des matières qui respirent, des coupes qui durent.
              La mode éditoriale pour celles qui choisissent la qualité sur la quantité.
            </p>

            <div style={{ display: "flex", gap: 16 }}>
              <motion.button
                whileHover={{ background: C.cream, color: C.bg }}
                whileTap={{ scale: 0.96 }}
                style={{
                  padding: "17px 44px",
                  background: C.gold,
                  color: C.bg,
                  border: "none",
                  fontSize: 14,
                  fontWeight: 600,
                  letterSpacing: 0.5,
                  cursor: "pointer",
                  transition: "all 0.25s",
                  fontFamily: C.sans,
                }}
              >
                Découvrir la collection
              </motion.button>
              <motion.button
                whileHover={{ borderColor: C.gold, color: C.gold }}
                whileTap={{ scale: 0.96 }}
                style={{
                  padding: "17px 44px",
                  background: "transparent",
                  color: C.creamDim,
                  border: `1px solid ${C.borderLight}`,
                  fontSize: 14,
                  cursor: "pointer",
                  transition: "all 0.25s",
                  fontFamily: C.sans,
                }}
              >
                Voir les soldes →
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{
            position: "absolute",
            bottom: 32,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
          }}
        >
          <div style={{ width: 1, height: 48, background: `linear-gradient(to bottom, ${C.gold}, transparent)` }} />
        </motion.div>
      </section>

      {/* STATS BAR */}
      <section style={{ background: "#111", borderBottom: `1px solid ${C.border}`, borderTop: `1px solid ${C.border}` }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              style={{
                padding: "32px 40px",
                borderRight: i < 3 ? `1px solid ${C.border}` : undefined,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: C.serif,
                  fontSize: 36,
                  fontStyle: "italic",
                  color: C.gold,
                  letterSpacing: -1,
                  lineHeight: 1,
                  marginBottom: 4,
                }}
              >
                {s.val}
              </div>
              <div style={{ fontSize: 13, color: C.cream, fontWeight: 600, marginBottom: 2 }}>
                {s.label}
              </div>
              <div style={{ fontSize: 11, color: C.muted }}>{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* COLLECTIONS GRID */}
      <section style={{ padding: "100px 64px", borderBottom: `1px solid ${C.border}` }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 56,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 10,
                letterSpacing: 4,
                color: C.gold,
                textTransform: "uppercase",
                marginBottom: 12,
                fontFamily: C.sans,
              }}
            >
              Notre univers
            </div>
            <h2
              style={{
                fontFamily: C.serif,
                fontSize: "clamp(36px, 4vw, 56px)",
                fontStyle: "italic",
                fontWeight: 400,
                letterSpacing: -1,
                color: C.cream,
              }}
            >
              Collections
            </h2>
          </div>
          <a
            href="#"
            style={{
              fontSize: 13,
              color: C.gold,
              textDecoration: "none",
              letterSpacing: 0.5,
              fontWeight: 500,
              fontFamily: C.sans,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            Voir toutes les collections <ArrowRight size={14} />
          </a>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2 }}>
          {COLLECTIONS.map((col, i) => (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setActiveCollection(i)}
              whileHover={{ y: -4 }}
              style={{
                height: 340,
                background:
                  activeCollection === i
                    ? `linear-gradient(160deg, ${col.accent}44 0%, ${col.accent}22 100%)`
                    : C.bgCard,
                border: `1px solid ${activeCollection === i ? col.accent + "55" : C.borderLight}`,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: 28,
                cursor: "pointer",
                transition: "all 0.3s",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Background texture */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `radial-gradient(circle at 70% 30%, ${col.accent}15 0%, transparent 60%)`,
                }}
              />

              {/* Badge */}
              <div
                style={{
                  position: "absolute",
                  top: 18,
                  left: 18,
                  background: activeCollection === i ? col.accent : "rgba(255,255,255,0.06)",
                  color: activeCollection === i ? C.bg : C.muted,
                  padding: "4px 10px",
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  fontFamily: C.sans,
                  transition: "all 0.3s",
                }}
              >
                {col.badge}
              </div>

              <div style={{ position: "relative", zIndex: 1 }}>
                <div
                  style={{
                    fontFamily: C.serif,
                    fontSize: 22,
                    fontStyle: "italic",
                    color: activeCollection === i ? C.cream : C.creamDim,
                    marginBottom: 6,
                    transition: "color 0.3s",
                    letterSpacing: -0.5,
                  }}
                >
                  {col.name}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: activeCollection === i ? C.gold : C.muted,
                    marginBottom: 12,
                    fontFamily: C.sans,
                    letterSpacing: 0.5,
                    transition: "color 0.3s",
                  }}
                >
                  {col.subtitle} · {col.pieces} pièces
                </div>
                {activeCollection === i && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    style={{
                      fontSize: 12,
                      color: C.creamDim,
                      lineHeight: 1.6,
                      fontFamily: C.sans,
                    }}
                  >
                    {col.description}
                  </motion.p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PRODUCTS GRID — Bestsellers */}
      <section ref={productsRef} style={{ padding: "100px 64px", borderBottom: `1px solid ${C.border}` }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 48,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 10,
                letterSpacing: 4,
                color: C.gold,
                textTransform: "uppercase",
                marginBottom: 12,
                fontFamily: C.sans,
              }}
            >
              Sélection curatée
            </div>
            <h2
              style={{
                fontFamily: C.serif,
                fontSize: "clamp(32px, 4vw, 52px)",
                fontStyle: "italic",
                fontWeight: 400,
                letterSpacing: -1,
                color: C.cream,
              }}
            >
              Sélection du moment
            </h2>
          </div>

          {/* Filters */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                style={{
                  padding: "7px 16px",
                  background: activeFilter === f ? C.gold : "transparent",
                  color: activeFilter === f ? C.bg : C.muted,
                  border: `1px solid ${activeFilter === f ? C.gold : C.borderLight}`,
                  fontSize: 11,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  fontFamily: C.sans,
                  letterSpacing: 0.3,
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
          }}
        >
          {filteredProducts.map((p, i) => (
            <ProductCard key={p.name} p={p} i={i} onAddToCart={() => setCartCount(c => c + 1)} />
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 56 }}>
          <motion.button
            whileHover={{ background: C.gold, color: C.bg, borderColor: C.gold }}
            whileTap={{ scale: 0.96 }}
            style={{
              padding: "16px 48px",
              background: "transparent",
              color: C.cream,
              border: `1px solid ${C.borderLight}`,
              fontSize: 14,
              cursor: "pointer",
              transition: "all 0.25s",
              fontFamily: C.sans,
            }}
          >
            Voir toute la boutique
          </motion.button>
        </div>
      </section>

      {/* LOOKBOOK */}
      <section
        ref={lookbookRef}
        style={{
          padding: "100px 64px",
          borderBottom: `1px solid ${C.border}`,
          background: "#0A0A0A",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "center",
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={lookbookInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div
              style={{
                fontSize: 10,
                letterSpacing: 4,
                color: C.gold,
                textTransform: "uppercase",
                marginBottom: 16,
                fontFamily: C.sans,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Camera size={12} /> Lookbook Été 2025
            </div>
            <h2
              style={{
                fontFamily: C.serif,
                fontSize: "clamp(40px, 5vw, 68px)",
                fontStyle: "italic",
                fontWeight: 400,
                letterSpacing: -1.5,
                lineHeight: 1.05,
                color: C.cream,
                marginBottom: 28,
              }}
            >
              L'art de<br />s'habiller<br />
              <span style={{ color: C.gold }}>avec intention.</span>
            </h2>
            <p
              style={{
                fontSize: 16,
                color: C.creamDim,
                lineHeight: 1.8,
                marginBottom: 40,
                maxWidth: 440,
                fontWeight: 300,
              }}
            >
              34 looks photographiés sur les plages de Biarritz et les rues de Porto.
              Un carnet de voyage visuel qui réinvente la garde-robe estivale.
            </p>
            <motion.a
              href="#"
              whileHover={{ background: C.gold, color: C.bg }}
              whileTap={{ scale: 0.96 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "15px 36px",
                background: "transparent",
                color: C.gold,
                border: `1px solid ${C.gold}`,
                fontSize: 13,
                fontWeight: 600,
                textDecoration: "none",
                transition: "all 0.25s",
                fontFamily: C.sans,
                letterSpacing: 0.5,
              }}
            >
              Voir le lookbook complet <ArrowRight size={14} />
            </motion.a>
          </motion.div>

          {/* Lookbook mosaic */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={lookbookInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}
          >
            {[
              { h: 280, color: "#C9A87C", delay: 0 },
              { h: 200, color: "#D4896A", delay: 0.1 },
              { h: 200, color: "#B5C4B1", delay: 0.15 },
              { h: 280, color: "#7A9BB0", delay: 0.2 },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={lookbookInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: item.delay + 0.3 }}
                whileHover={{ scale: 1.02 }}
                style={{
                  height: item.h,
                  background: `linear-gradient(160deg, ${item.color}44, ${item.color}22)`,
                  border: `1px solid ${item.color}33`,
                  cursor: "pointer",
                  overflow: "hidden",
                }}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* LOYALTY PROGRAM */}
      <section style={{ padding: "100px 64px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div
            style={{
              fontSize: 10,
              letterSpacing: 4,
              color: C.gold,
              textTransform: "uppercase",
              marginBottom: 16,
              fontFamily: C.sans,
            }}
          >
            Programme exclusif
          </div>
          <h2
            style={{
              fontFamily: C.serif,
              fontSize: "clamp(36px, 4vw, 56px)",
              fontStyle: "italic",
              fontWeight: 400,
              letterSpacing: -1,
              color: C.cream,
              marginBottom: 16,
            }}
          >
            Éclat Fidélité
          </h2>
          <p style={{ fontSize: 16, color: C.creamDim, maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
            Plus vous achetez, plus vous accédez à des avantages exclusifs. Trois niveaux,
            des privilèges croissants.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, maxWidth: 900, margin: "0 auto" }}>
          {LOYALTY_TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              onClick={() => setActiveLoyaltyTier(i)}
              style={{
                border: `1px solid ${activeLoyaltyTier === i ? tier.color + "55" : C.borderLight}`,
                background: activeLoyaltyTier === i ? `${tier.color}08` : C.bgCard,
                padding: "44px 36px",
                cursor: "pointer",
                transition: "all 0.3s",
                position: "relative",
              }}
            >
              {activeLoyaltyTier === i && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: tier.color,
                  }}
                />
              )}
              <div
                style={{
                  fontFamily: C.serif,
                  fontSize: 28,
                  fontStyle: "italic",
                  color: tier.color,
                  marginBottom: 6,
                }}
              >
                {tier.name}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: C.muted,
                  letterSpacing: 1,
                  marginBottom: 28,
                  fontFamily: C.sans,
                }}
              >
                {tier.threshold} dépensés/an
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {tier.perks.map(perk => (
                  <div key={perk} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <Check
                      size={13}
                      style={{ color: tier.color, marginTop: 1, flexShrink: 0 }}
                    />
                    <span style={{ fontSize: 13, color: C.creamDim, lineHeight: 1.5 }}>{perk}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "100px 64px", borderBottom: `1px solid ${C.border}`, background: "#0A0A0A" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 64,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 10,
                letterSpacing: 4,
                color: C.gold,
                textTransform: "uppercase",
                marginBottom: 12,
                fontFamily: C.sans,
              }}
            >
              Avis vérifiés
            </div>
            <h2
              style={{
                fontFamily: C.serif,
                fontSize: "clamp(36px, 4vw, 56px)",
                fontStyle: "italic",
                fontWeight: 400,
                letterSpacing: -1,
                color: C.cream,
              }}
            >
              Ce qu'elles en pensent.
            </h2>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <button
              onClick={() => setTestimonialIdx(i => Math.max(0, i - 1))}
              style={{
                width: 44,
                height: 44,
                background: "transparent",
                border: `1px solid ${C.border}`,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: C.muted,
                transition: "all 0.2s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = C.gold; (e.currentTarget as HTMLElement).style.color = C.gold; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = C.border; (e.currentTarget as HTMLElement).style.color = C.muted as string; }}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => setTestimonialIdx(i => Math.min(TESTIMONIALS.length - 3, i + 1))}
              style={{
                width: 44,
                height: 44,
                background: "transparent",
                border: `1px solid ${C.border}`,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: C.muted,
                transition: "all 0.2s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = C.gold; (e.currentTarget as HTMLElement).style.color = C.gold; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = C.border; (e.currentTarget as HTMLElement).style.color = C.muted as string; }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, overflow: "hidden" }}>
          {TESTIMONIALS.slice(testimonialIdx, testimonialIdx + 3).map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{
                background: C.bgCard,
                border: `1px solid ${C.borderLight}`,
                padding: "36px 32px",
              }}
            >
              <div style={{ display: "flex", gap: 2, marginBottom: 20 }}>
                {[...Array(t.stars)].map((_, j) => (
                  <Star key={j} size={12} fill={C.gold} stroke="none" />
                ))}
              </div>
              <p
                style={{
                  fontFamily: C.serif,
                  fontSize: 16,
                  fontStyle: "italic",
                  color: C.cream,
                  lineHeight: 1.75,
                  marginBottom: 24,
                }}
              >
                « {t.quote} »
              </p>
              <div style={{ borderTop: `1px solid ${C.borderLight}`, paddingTop: 18 }}>
                <div style={{ fontSize: 13, color: C.cream, fontWeight: 600, fontFamily: C.sans }}>
                  {t.name}
                </div>
                <div style={{ fontSize: 11, color: C.muted, fontFamily: C.sans, marginTop: 2 }}>
                  {t.location} · {t.service}
                  {t.verified && (
                    <span
                      style={{ marginLeft: 8, color: C.gold, fontSize: 10, letterSpacing: 0.5 }}
                    >
                      ✓ Achat vérifié
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: 860, margin: "0 auto", padding: "100px 64px" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2
            style={{
              fontFamily: C.serif,
              fontSize: "clamp(36px, 4vw, 52px)",
              fontStyle: "italic",
              fontWeight: 400,
              letterSpacing: -1,
              color: C.cream,
              marginBottom: 12,
            }}
          >
            Questions & réponses
          </h2>
          <p style={{ fontSize: 15, color: C.muted, fontFamily: C.sans }}>
            Tout ce que vous devez savoir avant votre première commande.
          </p>
        </div>

        {FAQS.map((f, i) => (
          <div key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
            <button
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "22px 0",
                background: "none",
                border: "none",
                color: C.cream,
                cursor: "pointer",
                textAlign: "left",
                fontFamily: C.sans,
              }}
            >
              <span style={{ fontSize: 15, fontWeight: 600 }}>{f.q}</span>
              <motion.span
                animate={{ rotate: openFaq === i ? 45 : 0 }}
                style={{ fontSize: 22, color: C.gold, minWidth: 22, display: "block" }}
              >
                +
              </motion.span>
            </button>
            <AnimatePresence>
              {openFaq === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  style={{ overflow: "hidden" }}
                >
                  <p
                    style={{
                      paddingBottom: 22,
                      fontSize: 14,
                      color: C.muted,
                      lineHeight: 1.85,
                      fontFamily: C.sans,
                    }}
                  >
                    {f.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </section>

      {/* TRUST BADGES */}
      <section style={{ borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, background: "#111" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
          {[
            { icon: <Truck size={20} />, title: "Livraison offerte", sub: "Dès 150 € d'achat" },
            { icon: <RefreshCw size={20} />, title: "Retours 30 jours", sub: "Sans justification" },
            { icon: <Leaf size={20} />, title: "Matières certifiées", sub: "GOTS & OEKO-TEX" },
            { icon: <Package size={20} />, title: "Emballage cadeau", sub: "Offert sur demande" },
          ].map((badge, i) => (
            <div
              key={i}
              style={{
                padding: "28px 40px",
                borderRight: i < 3 ? `1px solid ${C.border}` : undefined,
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div style={{ color: C.gold, flexShrink: 0 }}>{badge.icon}</div>
              <div>
                <div style={{ fontSize: 14, color: C.cream, fontWeight: 600, fontFamily: C.sans, marginBottom: 2 }}>
                  {badge.title}
                </div>
                <div style={{ fontSize: 12, color: C.muted, fontFamily: C.sans }}>{badge.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER CTA */}
      <section
        style={{
          padding: "100px 64px",
          background: `linear-gradient(135deg, #1A1208 0%, #0D0D0D 60%, #1A1208 100%)`,
          borderBottom: `1px solid ${C.border}`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: C.serif,
            fontSize: 12,
            letterSpacing: 4,
            color: C.gold,
            textTransform: "uppercase" as const,
            marginBottom: 24,
            fontStyle: "italic",
          }}
        >
          Restez dans la boucle
        </div>
        <h2
          style={{
            fontFamily: C.serif,
            fontSize: "clamp(40px, 5vw, 72px)",
            fontStyle: "italic",
            fontWeight: 300,
            color: C.cream,
            marginBottom: 16,
            letterSpacing: -1.5,
          }}
        >
          –15% sur votre<br />première commande.
        </h2>
        <p
          style={{
            fontSize: 16,
            color: C.creamDim,
            marginBottom: 48,
            fontFamily: C.sans,
            fontWeight: 300,
          }}
        >
          Accès en avant-première aux nouvelles collections, ventes privées et offres exclusives.
        </p>
        <div
          style={{
            display: "flex",
            gap: 0,
            maxWidth: 500,
            margin: "0 auto",
            border: `1px solid ${C.border}`,
          }}
        >
          <input
            placeholder="votre@email.fr"
            type="email"
            style={{
              flex: 1,
              padding: "17px 24px",
              background: "transparent",
              border: "none",
              color: C.cream,
              fontSize: 14,
              outline: "none",
              fontFamily: C.sans,
            }}
          />
          <motion.button
            whileHover={{ background: C.cream, color: C.bg }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: "17px 28px",
              background: C.gold,
              color: C.bg,
              border: "none",
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer",
              transition: "all 0.2s",
              fontFamily: C.sans,
              letterSpacing: 0.5,
            }}
          >
            S'inscrire
          </motion.button>
        </div>
        <div
          style={{
            fontSize: 11,
            color: C.muted,
            marginTop: 16,
            fontFamily: C.sans,
          }}
        >
          +18 500 abonnées · Désabonnement en 1 clic · Aucun spam
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#050505", padding: "72px 64px 36px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2.5fr 1fr 1fr 1fr",
            gap: 60,
            marginBottom: 56,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: C.serif,
                fontSize: 28,
                fontStyle: "italic",
                color: C.gold,
                letterSpacing: 2,
                marginBottom: 20,
              }}
            >
              Éclat
            </div>
            <p
              style={{
                fontSize: 13,
                color: C.muted,
                lineHeight: 1.85,
                maxWidth: 280,
                fontFamily: C.sans,
                marginBottom: 24,
              }}
            >
              Mode durable et intemporelle. Des pièces qui traversent les saisons
              et les années. Certifié GOTS · OEKO-TEX.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              {["Camera", "MessageSquare", "Link2"].map(icon => (
                <div
                  key={icon}
                  style={{
                    width: 36,
                    height: 36,
                    border: `1px solid ${C.borderLight}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: C.muted,
                    fontSize: 12,
                    fontFamily: C.sans,
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = C.gold;
                    (e.currentTarget as HTMLElement).style.color = C.gold;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = C.borderLight;
                    (e.currentTarget as HTMLElement).style.color = C.muted as string;
                  }}
                >
                  ↗
                </div>
              ))}
            </div>
          </div>
          {[
            {
              title: "Boutique",
              links: ["Collections", "Nouveautés", "Soldes", "Gift Cards", "Lookbook"],
            },
            {
              title: "Info",
              links: ["Notre histoire", "Engagements", "Blog mode", "Presse", "B2B"],
            },
            {
              title: "Service",
              links: ["Guide des tailles", "Livraison & Retours", "FAQ", "Contact", "Programme fidélité"],
            },
          ].map((col, i) => (
            <div key={i}>
              <div
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: 3,
                  color: "#3D3D3D",
                  textTransform: "uppercase",
                  marginBottom: 20,
                  fontFamily: C.sans,
                }}
              >
                {col.title}
              </div>
              {col.links.map(l => (
                <div
                  key={l}
                  style={{
                    fontSize: 13,
                    color: C.muted,
                    marginBottom: 12,
                    cursor: "pointer",
                    fontFamily: C.sans,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = C.cream)}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = C.muted as string)}
                >
                  {l}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div
          style={{
            borderTop: `1px solid #111`,
            paddingTop: 24,
            fontSize: 11,
            color: "#333",
            display: "flex",
            justifyContent: "space-between",
            fontFamily: C.sans,
          }}
        >
          <span>© 2025 Éclat — Tous droits réservés</span>
          <span>Mentions légales · CGV · Confidentialité · Plan du site</span>
        </div>
      </footer>

      {/* CART SIDEBAR */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.7)",
                zIndex: 200,
              }}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                width: 420,
                background: C.bgCard,
                borderLeft: `1px solid ${C.border}`,
                zIndex: 201,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  padding: "24px 28px",
                  borderBottom: `1px solid ${C.border}`,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: C.serif,
                    fontSize: 20,
                    fontStyle: "italic",
                    color: C.cream,
                  }}
                >
                  Votre panier ({cartCount})
                </div>
                <button
                  onClick={() => setCartOpen(false)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: C.muted,
                  }}
                >
                  <X size={20} />
                </button>
              </div>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <ShoppingBag size={32} style={{ color: C.muted }} />
                <p style={{ fontSize: 14, color: C.muted, fontFamily: C.sans }}>
                  {cartCount === 0
                    ? "Votre panier est vide"
                    : `${cartCount} article${cartCount > 1 ? "s" : ""} ajouté${cartCount > 1 ? "s" : ""}`}
                </p>
              </div>
              <div style={{ padding: "24px 28px", borderTop: `1px solid ${C.border}` }}>
                <motion.button
                  whileHover={{ background: C.cream, color: C.bg }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    width: "100%",
                    padding: "16px",
                    background: C.gold,
                    color: C.bg,
                    border: "none",
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.2s",
                    fontFamily: C.sans,
                  }}
                >
                  Passer commande
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
