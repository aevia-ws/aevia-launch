"use client"

import React, { useState, useRef } from "react"
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"

// RIVE GAUCHE IMMOBILIER — Real estate. Light ivory + deep navy, Didot-style serif, vertical stagger scroll, property cards.

const PROPERTIES = [
  { ref: "RG-0041", name: "Haussmannien Marais", surface: "187 m²", rooms: "5 pièces", floor: "3e étage avec ascenseur", price: "2 450 000 €", tag: "Exclusivité", accent: "#1e3a5f" },
  { ref: "RG-0038", name: "Loft Saint-Germain", surface: "142 m²", rooms: "3 pièces", floor: "Dernier étage", price: "1 890 000 €", tag: "Nouveau", accent: "#7c3aed" },
  { ref: "RG-0035", name: "Penthouse Trocadéro", surface: "260 m²", rooms: "6 pièces", floor: "10e étage · Vue Tour Eiffel", price: "5 200 000 €", tag: "Prestige", accent: "#c4a96a" },
  { ref: "RG-0029", name: "Appartement République", surface: "98 m²", rooms: "4 pièces", floor: "2e étage", price: "1 190 000 €", tag: "Vendu", accent: "#6b7280" },
]

const STATS = [
  { val: "312", label: "Biens vendus en 2024" },
  { val: "98 j", label: "Délai moyen de vente" },
  { val: "102%", label: "Prix demandé atteint" },
  { val: "18 ans", label: "D'expérience Paris intra-muros" },
]

const SERVICES = [
  { name: "Estimation Gratuite", desc: "Estimation basée sur 15 000 transactions réelles dans votre arrondissement. Sans engagement, sans pression.", icon: "≈" },
  { name: "Mise en Valeur", desc: "Home staging, photographie professionnelle HDR, visite virtuelle 3D. On présente votre bien sous son meilleur angle.", icon: "◎" },
  { name: "Diffusion Maximale", desc: "Portails premium (SeLoger, Logic-Immo, Belles Demeures) + réseau d'acheteurs qualifiés en base propriétaire.", icon: "⊕" },
  { name: "Accompagnement Notaire", desc: "Suivi complet jusqu'à la signature chez le notaire. Coordination administrative incluse.", icon: "◻" },
]

const TESTIMONIALS = [
  { quote: "Notre appartement était à la vente depuis 8 mois avec une autre agence. Rive Gauche l'a vendu en 3 semaines, au prix.", name: "Isabelle & Marc F.", role: "Vendeurs, Paris 6e" },
  { quote: "Ils ont trouvé notre appartement avant même qu'il soit publié. Un carnet d'adresses vraiment exceptionnel.", name: "Laurent Dupuy", role: "Acheteur, Paris 7e" },
  { quote: "Estimation juste, process transparent, zéro mauvaise surprise. Ce n'est pas si courant.", name: "Nathalie Roux", role: "Vendeuse, Paris 16e" },
]

const FAQS = [
  { q: "Quels sont vos honoraires ?", a: "4,5% TTC du prix de vente, à la charge du vendeur. Inclus : estimation, mise en valeur, diffusion, accompagnement notaire." },
  { q: "Comment se déroule une estimation ?", a: "Visite sur place (1h), analyse comparative de marché, rapport écrit sous 48h. Gratuit et sans engagement." },
  { q: "Travaillez-vous uniquement à Paris ?", a: "Principalement Paris 6e, 7e, 14e, 15e, 16e. Nous acceptons quelques mandats en petite couronne sur dossiers exceptionnels." },
  { q: "Gérez-vous la location également ?", a: "Oui — gestion locative complète avec garantie loyers impayés optionnelle. Contactez-nous pour un mandat de gestion." },
  { q: "Combien de temps pour vendre ?", a: "Moyenne 2024 : 98 jours. Les biens bien estimés et mis en valeur se vendent souvent en moins de 30 jours." },
]

export default function Page() {
  const [activeProperty, setActiveProperty] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const { scrollY } = useScroll()

  // Parallax for hero text and background elements
  const heroBgY = useTransform(scrollY, [0, 600], [0, 100])
  const heroTextY = useTransform(scrollY, [0, 600], [0, -60])

  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" })

  const C = {
    bg: "#f9f7f2",
    navy: "#1e3a5f",
    gold: "#c4a96a",
    text: "#1a1a1a",
    muted: "#8b7d6b",
    card: "#ffffff",
    border: "#e8e0d4",
    serif: "'Cormorant Garamond', Georgia, serif",
    sans: "system-ui, -apple-system, sans-serif",
  }

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: C.sans, overflowX: "hidden" }}>
      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(249,247,242,0.95)", backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${C.border}`,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 60px", height: 72,
      }}>
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
          <span style={{ fontFamily: C.serif, fontSize: 18, letterSpacing: 1, color: C.navy, fontStyle: "italic" }}>Rive Gauche</span>
          <span style={{ fontSize: 9, letterSpacing: 4, color: C.muted, textTransform: "uppercase" }}>Immobilier de Prestige</span>
        </div>
        <div style={{ display: "flex", gap: 40, alignItems: "center" }}>
          {["Annonces", "Estimation", "Services", "L'agence"].map(l => (
            <a key={l} href="#" style={{ fontSize: 12, color: C.muted, letterSpacing: 2, textTransform: "uppercase", textDecoration: "none" }}>{l}</a>
          ))}
          <motion.button whileHover={{ background: C.navy }} whileTap={{ scale: 0.97 }}
            style={{ padding: "10px 24px", background: C.gold, color: "#fff", border: "none", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", fontFamily: C.sans, transition: "background 0.2s" }}>
            Estimation gratuite
          </motion.button>
        </div>
      </nav>

      {/* HERO — split, left navy panel / right light */}
      <section style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", paddingTop: 72 }}>
        <motion.div style={{ y: heroTextY, background: C.navy, padding: "100px 80px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <div style={{ fontSize: 10, letterSpacing: 5, color: "rgba(196,169,106,0.8)", textTransform: "uppercase", marginBottom: 40 }}>Paris — Agence de Prestige</div>
            <h1 style={{ fontFamily: C.serif, fontSize: "clamp(52px, 7vw, 96px)", fontWeight: 400, letterSpacing: -1, lineHeight: 1.0, color: "#f9f7f2", marginBottom: 36, fontStyle: "italic" }}>
              L'immobilier<br />
              comme<br />
              un art.
            </h1>
            <div style={{ width: 48, height: 1, background: C.gold, marginBottom: 36 }} />
            <p style={{ fontSize: 16, color: "rgba(249,247,242,0.6)", lineHeight: 1.8, marginBottom: 48, maxWidth: 380 }}>
              18 ans sur les beaux quartiers parisiens. Nous connaissons chaque immeuble, chaque gardien, chaque acheteur sérieux de notre base.
            </p>
            <div style={{ display: "flex", gap: 16 }}>
              <motion.button whileHover={{ background: "#fff", color: C.navy }} whileTap={{ scale: 0.97 }}
                style={{ padding: "16px 36px", background: C.gold, color: "#fff", border: "none", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", fontFamily: C.sans, fontWeight: 600, transition: "all 0.2s" }}>
                Voir les biens
              </motion.button>
              <motion.button whileHover={{ borderColor: C.gold, color: C.gold }} whileTap={{ scale: 0.97 }}
                style={{ padding: "16px 36px", background: "transparent", color: "rgba(249,247,242,0.6)", border: "1px solid rgba(249,247,242,0.2)", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", fontFamily: C.sans, transition: "all 0.2s" }}>
                Nous contacter
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Right — animated property card preview */}
        <motion.div style={{ y: heroBgY, background: C.bg, padding: "100px 60px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 24 }}>
          {PROPERTIES.slice(0, 3).map((p, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.15, duration: 0.7 }}
              whileHover={{ x: 8, boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}
              style={{ background: C.card, border: `1px solid ${C.border}`, padding: "24px 28px", cursor: "pointer", transition: "box-shadow 0.2s" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <div>
                  <div style={{ fontSize: 9, letterSpacing: 3, color: C.muted, textTransform: "uppercase", marginBottom: 4 }}>{p.ref} — {p.tag}</div>
                  <div style={{ fontFamily: C.serif, fontSize: 18, fontStyle: "italic", color: C.navy }}>{p.name}</div>
                </div>
                <div style={{ fontFamily: C.serif, fontSize: 16, fontStyle: "italic", color: C.gold, whiteSpace: "nowrap" }}>{p.price}</div>
              </div>
              <div style={{ fontSize: 12, color: C.muted }}>{p.surface} · {p.rooms} · {p.floor}</div>
            </motion.div>
          ))}
          <motion.a href="#" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            style={{ fontSize: 12, color: C.gold, letterSpacing: 2, textTransform: "uppercase", textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
            Voir toutes les annonces →
          </motion.a>
        </motion.div>
      </section>

      {/* STATS */}
      <section ref={statsRef} style={{ background: C.navy }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
          {STATS.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              style={{ padding: "64px 48px", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.08)" : undefined, textAlign: "center" }}>
              <div style={{ fontFamily: C.serif, fontSize: 56, fontStyle: "italic", color: C.gold, lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontSize: 12, color: "rgba(249,247,242,0.5)", marginTop: 12, letterSpacing: 1, lineHeight: 1.5 }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PROPERTY LISTINGS */}
      <section style={{ padding: "100px 60px", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56 }}>
          <h2 style={{ fontFamily: C.serif, fontSize: "clamp(36px, 4vw, 56px)", fontStyle: "italic", fontWeight: 400, letterSpacing: -1 }}>Sélection du moment.</h2>
          <a href="#" style={{ fontSize: 12, color: C.gold, letterSpacing: 3, textTransform: "uppercase", textDecoration: "none" }}>Toutes les annonces →</a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 2 }}>
          {PROPERTIES.map((p, i) => (
            <motion.div key={i}
              onClick={() => setActiveProperty(i)}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              style={{ background: C.card, border: `1px solid ${activeProperty === i ? C.gold : C.border}`, padding: "40px", cursor: "pointer", transition: "all 0.2s", position: "relative" }}>
              {activeProperty === i && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: C.gold }} />}
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <div style={{ fontSize: 10, letterSpacing: 3, color: p.tag === "Vendu" ? "#9ca3af" : p.accent, textTransform: "uppercase" }}>{p.tag}</div>
                <div style={{ fontSize: 10, letterSpacing: 2, color: C.muted, textTransform: "uppercase" }}>{p.ref}</div>
              </div>
              <div style={{ fontFamily: C.serif, fontSize: 26, fontStyle: "italic", color: C.navy, marginBottom: 12 }}>{p.name}</div>
              <div style={{ fontSize: 13, color: C.muted, marginBottom: 24, lineHeight: 1.6 }}>{p.surface} · {p.rooms} · {p.floor}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                <div style={{ fontFamily: C.serif, fontSize: 28, fontStyle: "italic", color: p.tag === "Vendu" ? C.muted : C.navy }}>{p.price}</div>
                <motion.button whileHover={{ background: C.navy, color: "#fff" }} whileTap={{ scale: 0.97 }}
                  style={{ padding: "10px 20px", background: "transparent", color: C.navy, border: `1px solid ${C.navy}`, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s", fontFamily: C.sans }}>
                  {p.tag === "Vendu" ? "Voir références" : "Demander visite"}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section style={{ background: "#f5f0e8", padding: "100px 60px", borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <h2 style={{ fontFamily: C.serif, fontSize: "clamp(36px, 4vw, 56px)", fontStyle: "italic", fontWeight: 400, textAlign: "center", marginBottom: 64 }}>Notre méthode.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2 }}>
            {SERVICES.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                style={{ background: C.card, padding: "48px 36px", border: `1px solid ${C.border}` }}>
                <div style={{ fontFamily: C.serif, fontSize: 32, color: C.gold, marginBottom: 24 }}>{s.icon}</div>
                <div style={{ fontFamily: C.serif, fontSize: 20, fontStyle: "italic", color: C.navy, marginBottom: 16 }}>{s.name}</div>
                <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.8 }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "100px 60px", maxWidth: 1280, margin: "0 auto" }}>
        <h2 style={{ fontFamily: C.serif, fontSize: "clamp(36px, 4vw, 56px)", fontStyle: "italic", fontWeight: 400, marginBottom: 64, textAlign: "center" }}>Ils nous ont confié leur projet.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40 }}>
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.15 }}
              style={{ padding: "0 24px", borderLeft: `2px solid ${C.gold}` }}>
              <p style={{ fontFamily: C.serif, fontSize: 18, fontStyle: "italic", color: C.navy, lineHeight: 1.7, marginBottom: 24 }}>« {t.quote} »</p>
              <div style={{ fontSize: 11, color: C.muted, letterSpacing: 2, textTransform: "uppercase" }}>{t.name} · {t.role}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "#f5f0e8", padding: "100px 60px", borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 style={{ fontFamily: C.serif, fontSize: 48, fontStyle: "italic", textAlign: "center", marginBottom: 56, color: C.navy }}>Questions fréquentes.</h2>
          {FAQS.map((f, i) => (
            <div key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                <span style={{ fontFamily: C.serif, fontSize: 18, fontStyle: "italic", color: C.navy }}>{f.q}</span>
                <motion.span animate={{ rotate: openFaq === i ? 45 : 0 }} style={{ fontSize: 20, color: C.gold, minWidth: 20 }}>+</motion.span>
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                    <p style={{ paddingBottom: 24, fontSize: 14, color: C.muted, lineHeight: 1.8 }}>{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: C.navy, padding: "100px 60px", textAlign: "center" }}>
        <div style={{ fontFamily: C.serif, fontSize: 13, letterSpacing: 5, color: "rgba(196,169,106,0.7)", textTransform: "uppercase", marginBottom: 32 }}>Estimation offerte</div>
        <h2 style={{ fontFamily: C.serif, fontSize: "clamp(48px, 7vw, 96px)", fontStyle: "italic", fontWeight: 300, color: "#f9f7f2", marginBottom: 48, lineHeight: 1 }}>
          Quelle est la vraie<br />valeur de votre bien ?
        </h2>
        <motion.button whileHover={{ background: "#fff", color: C.navy }} whileTap={{ scale: 0.97 }}
          style={{ padding: "18px 56px", background: C.gold, color: "#fff", border: "2px solid transparent", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s", fontFamily: C.sans, fontWeight: 600 }}>
          Obtenir mon estimation →
        </motion.button>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#0f1e30", padding: "48px 60px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontFamily: C.serif, fontSize: 16, fontStyle: "italic", color: "#f9f7f2", marginBottom: 4 }}>Rive Gauche Immobilier</div>
          <div style={{ fontSize: 11, color: "#4b5563", letterSpacing: 2 }}>Paris, France · Carte Pro T: 12345</div>
        </div>
        <div style={{ fontSize: 12, color: "#374151" }}>© 2025 — Mentions légales · Confidentialité</div>
      </footer>
    </div>
  )
}
