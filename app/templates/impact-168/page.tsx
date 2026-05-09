"use client"

import React, { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"

// ÉCLAT — Premium e-commerce fashion boutique. Warm white + terracotta + forest green. Product-first grid, conversion optimized.

const COLLECTIONS = [
  { name: "Été Brûlant", items: 34, badge: "Nouvelle collection", accent: "#c45c3a" },
  { name: "Essentiels Neutres", items: 28, badge: "Bestseller", accent: "#6b7a5c" },
  { name: "Nuit Dorée", items: 19, badge: "Édition limitée", accent: "#c4a96a" },
]

const PRODUCTS = [
  { name: "Robe Lin Biarritz", price: "189 €", oldPrice: null, tag: "Nouveau", color: "#c4a96a", size: "XS–XL", material: "100% Lin" },
  { name: "Top Soie Côte d'Azur", price: "134 €", oldPrice: "189 €", tag: "–29%", color: "#c45c3a", size: "XS–L", material: "100% Soie" },
  { name: "Pantalon Wide-Leg", price: "165 €", oldPrice: null, tag: null, color: "#6b7a5c", size: "34–44", material: "Tencel Lyocell" },
  { name: "Blazer Sable", price: "295 €", oldPrice: null, tag: "Exclusivité", color: "#9e8e78", size: "34–44", material: "Laine Vierge" },
  { name: "Robe Dos-Nu Riviera", price: "215 €", oldPrice: null, tag: "Quasi épuisé", color: "#d4a0a0", size: "XS–M", material: "Viscose" },
  { name: "Chemise Portuense", price: "98 €", oldPrice: "145 €", tag: "–32%", color: "#b5c4b1", size: "XS–XL", material: "Coton Égyptien" },
]

const TESTIMONIALS = [
  { quote: "La qualité est incomparable. J'ai la Robe Lin depuis 2 ans — elle est toujours parfaite après chaque lavage.", name: "Pauline M.", location: "Paris", stars: 5 },
  { quote: "Livraison le lendemain, emballage cadeau inclus. J'offre Éclat à toutes mes amies maintenant.", name: "Juliette D.", location: "Lyon", stars: 5 },
  { quote: "Enfin une boutique qui a des tailles pour les vraies femmes. Les coupes sont d'une précision rare.", name: "Amélie R.", location: "Bordeaux", stars: 5 },
]

const FAQS = [
  { q: "Quels sont les délais de livraison ?", a: "Livraison standard 3–5 jours ouvrés. Express J+1 disponible (avant 14h). Gratuit dès 120€ d'achat." },
  { q: "Puis-je retourner un article ?", a: "30 jours de retour, sans justification. Le colis de retour est prépayé inclus dans votre commande." },
  { q: "Les tailles sont-elles fidèles ?", a: "Oui — notre guide des tailles détaillé (tour de poitrine, hanches, longueurs) est disponible sur chaque fiche produit." },
  { q: "Vos matières sont-elles durables ?", a: "Nous travaillons uniquement avec des fournisseurs certifiés GOTS et OEKO-TEX. Aucune matière synthétique issue du pétrole." },
  { q: "Proposez-vous un emballage cadeau ?", a: "Oui — boîte cartonnée, ruban et carte message manuscrite, offerts sur demande à la commande." },
]

export default function Page() {
  const [cartCount, setCartCount] = useState(0)
  const [wishlist, setWishlist] = useState<number[]>([])
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [activeCollection, setActiveCollection] = useState(0)

  const productsRef = useRef(null)
  const testimonialsRef = useRef(null)
  const productsInView = useInView(productsRef, { once: true, margin: "-100px" })
  const testimonialsInView = useInView(testimonialsRef, { once: true, margin: "-100px" })

  const C = {
    bg: "#faf8f5",
    text: "#1a1512",
    terracotta: "#c45c3a",
    forest: "#6b7a5c",
    sand: "#c4a96a",
    muted: "#8b7d6b",
    card: "#ffffff",
    border: "#e8e0d4",
    serif: "'Cormorant Garamond', Georgia, serif",
    sans: "system-ui, -apple-system, sans-serif",
  }

  const STATS = [
    { val: "4.92", label: "Note moyenne (2 840 avis)" },
    { val: "J+1", label: "Livraison express" },
    { val: "30 j", label: "Retours gratuits" },
    { val: "Bio", label: "Matières certifiées GOTS" },
  ]

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: C.sans, overflowX: "hidden" }}>
      {/* ANNOUNCEMENT BAR */}
      <div style={{ background: C.terracotta, padding: "10px", textAlign: "center", fontSize: 12, letterSpacing: 2, color: "#fff", textTransform: "uppercase" }}>
        Livraison offerte dès 120 € — Code ÉCLAT20 : –20% sur la nouvelle collection
      </div>

      {/* NAV */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(250,248,245,0.97)", backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${C.border}`,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 60px", height: 64,
      }}>
        <div style={{ fontFamily: C.serif, fontSize: 22, letterSpacing: 3, fontStyle: "italic", color: C.text }}>Éclat</div>
        <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
          {["Collections", "Nouveautés", "Soldes", "Notre histoire"].map(l => (
            <a key={l} href="#" style={{ fontSize: 13, color: C.muted, textDecoration: "none", letterSpacing: 0.5, fontWeight: 500 }}>{l}</a>
          ))}
        </div>
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          <span style={{ fontSize: 13, color: C.muted, cursor: "pointer" }}>Recherche</span>
          <span style={{ fontSize: 13, color: C.muted, cursor: "pointer" }}>Compte</span>
          <motion.button whileHover={{ background: C.terracotta, borderColor: C.terracotta }} whileTap={{ scale: 0.97 }}
            onClick={() => setCartCount(c => c + 1)}
            style={{ position: "relative", padding: "8px 20px", background: "transparent", color: C.text, border: `1.5px solid ${C.text}`, fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.2s", color: cartCount > 0 ? C.terracotta : C.text, borderColor: cartCount > 0 ? C.terracotta : C.text }}>
            Panier {cartCount > 0 ? `(${cartCount})` : ""}
          </motion.button>
        </div>
      </nav>

      {/* HERO — full width editorial */}
      <section style={{ position: "relative", height: "85vh", background: "#1a1512", overflow: "hidden", display: "flex", alignItems: "flex-end" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 60%, rgba(196,92,58,0.15) 0%, transparent 60%)" }} />
        <div style={{ position: "relative", zIndex: 10, padding: "0 80px 80px", maxWidth: 720 }}>
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <div style={{ fontSize: 11, letterSpacing: 5, color: C.sand, textTransform: "uppercase", marginBottom: 28 }}>Été 2025</div>
            <h1 style={{ fontFamily: C.serif, fontSize: "clamp(56px, 8vw, 112px)", fontWeight: 400, letterSpacing: -2, lineHeight: 0.95, color: "#f9f7f2", fontStyle: "italic", marginBottom: 36 }}>
              La chaleur<br />comme<br /><span style={{ color: C.terracotta }}>philosophie.</span>
            </h1>
            <p style={{ fontSize: 16, color: "rgba(249,247,242,0.6)", lineHeight: 1.7, marginBottom: 48, maxWidth: 440 }}>
              Lin, soie, tencel. Des matières qui respirent, des coupes qui durent. La nouvelle collection Éclat est là.
            </p>
            <div style={{ display: "flex", gap: 16 }}>
              <motion.button whileHover={{ background: "#fff", color: C.text }} whileTap={{ scale: 0.97 }}
                style={{ padding: "16px 40px", background: C.terracotta, color: "#fff", border: "none", fontSize: 14, fontWeight: 600, letterSpacing: 0.5, cursor: "pointer", transition: "all 0.2s" }}>
                Découvrir la collection
              </motion.button>
              <motion.button whileHover={{ borderColor: "#fff", color: "#fff" }} whileTap={{ scale: 0.97 }}
                style={{ padding: "16px 40px", background: "transparent", color: "rgba(249,247,242,0.6)", border: "1px solid rgba(249,247,242,0.3)", fontSize: 14, cursor: "pointer", transition: "all 0.2s" }}>
                Soldes →
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS BAR */}
      <section style={{ background: C.forest }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ padding: "28px 40px", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.1)" : undefined, textAlign: "center" }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", letterSpacing: -0.5 }}>{s.val}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* COLLECTIONS */}
      <section style={{ padding: "80px 60px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
          <h2 style={{ fontFamily: C.serif, fontSize: "clamp(32px, 4vw, 52px)", fontStyle: "italic", fontWeight: 400, letterSpacing: -1 }}>Collections</h2>
          <a href="#" style={{ fontSize: 13, color: C.terracotta, textDecoration: "none", letterSpacing: 0.5, fontWeight: 600 }}>Voir tout →</a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {COLLECTIONS.map((col, i) => (
            <motion.div key={i} whileHover={{ y: -6 }} transition={{ duration: 0.2 }}
              onClick={() => setActiveCollection(i)}
              style={{ height: 280, background: activeCollection === i ? col.accent : "#ede8e1", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 32, cursor: "pointer", transition: "background 0.3s", position: "relative" }}>
              <div style={{ position: "absolute", top: 20, right: 20, background: "#fff", padding: "4px 12px", fontSize: 11, fontWeight: 600, letterSpacing: 1, color: activeCollection === i ? col.accent : C.muted }}>
                {col.badge}
              </div>
              <div style={{ fontFamily: C.serif, fontSize: 28, fontStyle: "italic", color: activeCollection === i ? "#fff" : C.text, marginBottom: 8, transition: "color 0.3s" }}>{col.name}</div>
              <div style={{ fontSize: 12, color: activeCollection === i ? "rgba(255,255,255,0.7)" : C.muted, transition: "color 0.3s" }}>{col.items} pièces</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section ref={productsRef} style={{ padding: "80px 60px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
          <h2 style={{ fontFamily: C.serif, fontSize: "clamp(32px, 4vw, 52px)", fontStyle: "italic", fontWeight: 400, letterSpacing: -1 }}>Sélection du moment</h2>
          <div style={{ display: "flex", gap: 16 }}>
            {["Récents", "Bestsellers", "Soldes"].map((f, i) => (
              <button key={f} style={{ padding: "8px 20px", background: i === 0 ? C.text : "transparent", color: i === 0 ? "#fff" : C.muted, border: `1px solid ${i === 0 ? C.text : C.border}`, fontSize: 12, cursor: "pointer", transition: "all 0.2s", fontFamily: C.sans }}>
                {f}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {PRODUCTS.map((p, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 30 }} animate={productsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              style={{ background: C.card, border: `1px solid ${C.border}`, overflow: "hidden" }}>
              {/* Product image area */}
              <div style={{ height: 280, background: p.color + "22", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.4 }}
                  style={{ width: 100, height: 180, background: p.color + "66", borderRadius: 8 }} />
                {p.tag && (
                  <div style={{ position: "absolute", top: 16, left: 16, background: p.tag.includes("%") ? C.terracotta : C.text, color: "#fff", padding: "4px 10px", fontSize: 11, fontWeight: 700 }}>
                    {p.tag}
                  </div>
                )}
                <button
                  onClick={() => setWishlist(w => w.includes(i) ? w.filter(x => x !== i) : [...w, i])}
                  style={{ position: "absolute", top: 16, right: 16, width: 36, height: 36, background: "#fff", border: "none", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%" }}>
                  {wishlist.includes(i) ? "♥" : "♡"}
                </button>
              </div>
              <div style={{ padding: "20px 24px 24px" }}>
                <div style={{ fontSize: 11, color: C.muted, marginBottom: 4 }}>{p.material}</div>
                <div style={{ fontFamily: C.serif, fontSize: 18, fontStyle: "italic", color: C.text, marginBottom: 8 }}>{p.name}</div>
                <div style={{ fontSize: 12, color: C.muted, marginBottom: 12 }}>Tailles: {p.size}</div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ fontSize: 18, fontWeight: 700, color: C.text }}>{p.price}</span>
                    {p.oldPrice && <span style={{ fontSize: 14, color: C.muted, textDecoration: "line-through" }}>{p.oldPrice}</span>}
                  </div>
                  <motion.button whileHover={{ background: C.terracotta, borderColor: C.terracotta, color: "#fff" }} whileTap={{ scale: 0.96 }}
                    onClick={() => setCartCount(c => c + 1)}
                    style={{ padding: "8px 18px", background: "transparent", color: C.text, border: `1.5px solid ${C.text}`, fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all 0.2s", fontFamily: C.sans }}>
                    + Panier
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section ref={testimonialsRef} style={{ background: "#f0ece6", padding: "80px 60px", borderBottom: `1px solid ${C.border}` }}>
        <h2 style={{ fontFamily: C.serif, fontSize: "clamp(32px, 4vw, 52px)", fontStyle: "italic", fontWeight: 400, textAlign: "center", marginBottom: 56 }}>Ce qu'elles en pensent.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15 }}
              style={{ background: C.card, padding: "36px", border: `1px solid ${C.border}` }}>
              <div style={{ display: "flex", gap: 2, marginBottom: 20 }}>
                {[...Array(t.stars)].map((_, j) => <span key={j} style={{ fontSize: 14, color: C.sand }}>★</span>)}
              </div>
              <p style={{ fontFamily: C.serif, fontSize: 17, fontStyle: "italic", color: C.text, lineHeight: 1.7, marginBottom: 24 }}>« {t.quote} »</p>
              <div style={{ fontSize: 12, color: C.muted, fontWeight: 600 }}>{t.name} · {t.location}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: 800, margin: "0 auto", padding: "80px 60px" }}>
        <h2 style={{ fontFamily: C.serif, fontSize: 44, fontStyle: "italic", fontWeight: 400, textAlign: "center", marginBottom: 48 }}>Questions & réponses</h2>
        {FAQS.map((f, i) => (
          <div key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
            <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
              style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 0", background: "none", border: "none", color: C.text, cursor: "pointer", textAlign: "left" }}>
              <span style={{ fontSize: 15, fontWeight: 600 }}>{f.q}</span>
              <motion.span animate={{ rotate: openFaq === i ? 45 : 0 }} style={{ fontSize: 22, color: C.terracotta, minWidth: 22 }}>+</motion.span>
            </button>
            <AnimatePresence>
              {openFaq === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                  <p style={{ paddingBottom: 20, fontSize: 14, color: C.muted, lineHeight: 1.8 }}>{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </section>

      {/* CTA NEWSLETTER */}
      <section style={{ background: C.terracotta, padding: "80px 60px", textAlign: "center" }}>
        <div style={{ fontFamily: C.serif, fontSize: 13, letterSpacing: 4, color: "rgba(255,255,255,0.7)", textTransform: "uppercase", marginBottom: 24 }}>Restez dans la boucle</div>
        <h2 style={{ fontFamily: C.serif, fontSize: "clamp(36px, 5vw, 64px)", fontStyle: "italic", fontWeight: 300, color: "#fff", marginBottom: 16 }}>
          –15% sur votre première commande.
        </h2>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.7)", marginBottom: 40 }}>Accès en avant-première aux nouvelles collections et offres exclusives.</p>
        <div style={{ display: "flex", gap: 0, maxWidth: 480, margin: "0 auto" }}>
          <input placeholder="votre@email.fr" style={{ flex: 1, padding: "16px 24px", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", fontSize: 14, outline: "none", fontFamily: C.sans }} />
          <motion.button whileHover={{ background: C.text }} whileTap={{ scale: 0.97 }}
            style={{ padding: "16px 28px", background: "#fff", color: C.terracotta, border: "none", fontWeight: 700, fontSize: 14, cursor: "pointer", transition: "all 0.2s", fontFamily: C.sans }}>
            S'inscrire
          </motion.button>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: C.text, padding: "64px 60px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 60, marginBottom: 48 }}>
          <div>
            <div style={{ fontFamily: C.serif, fontSize: 22, fontStyle: "italic", color: "#f9f7f2", marginBottom: 16 }}>Éclat</div>
            <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.8, maxWidth: 260 }}>Mode durable et intemporelle. Des pièces qui traversent les saisons et les années.</div>
          </div>
          {[
            { title: "Boutique", links: ["Collections", "Nouveautés", "Soldes", "Gift Cards"] },
            { title: "Info", links: ["Notre histoire", "Engagements", "Blog", "Presse"] },
            { title: "Service", links: ["Livraison & Retours", "Guide des tailles", "FAQ", "Contact"] },
          ].map((col, i) => (
            <div key={i}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "#4b5563", textTransform: "uppercase", marginBottom: 16 }}>{col.title}</div>
              {col.links.map(l => <div key={l} style={{ fontSize: 14, color: "#6b7280", marginBottom: 10, cursor: "pointer" }}>{l}</div>)}
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid #1f2937", paddingTop: 24, fontSize: 12, color: "#374151", display: "flex", justifyContent: "space-between" }}>
          <span>© 2025 Éclat — Tous droits réservés</span>
          <span>Mentions légales · CGV · Confidentialité</span>
        </div>
      </footer>
    </div>
  )
}
