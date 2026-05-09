"use client"

import React, { useState, useRef } from "react"
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"

// STRUCTURE BÂTISSEURS — Construction company. Industrial dark + safety orange, extra bold weight, count-up stats.
// Unique: massive number hero, diagonal stripe divider, project cards with progress bars.

const PROJECTS = [
  { name: "Résidence Les Cèdres", type: "Logements collectifs", location: "Grenoble", units: 84, progress: 100, status: "Livré — 2024" },
  { name: "Campus Tech Sud", type: "Bureaux & salles de formation", location: "Montpellier", units: null, progress: 73, status: "En cours" },
  { name: "Centre Commercial Avenir", type: "Commerce & loisirs", location: "Nantes", units: null, progress: 40, status: "En chantier" },
  { name: "Ilôt Vert — Phase 2", type: "Réhabilitation & extension", location: "Toulouse", units: 32, progress: 100, status: "Livré — 2023" },
]

const SERVICES = [
  { name: "Construction Neuve", desc: "Logements, bureaux, équipements publics. De la fondation à la remise des clés, clé en main ou en entreprise générale.", icon: "◼" },
  { name: "Réhabilitation", desc: "Mise aux normes, extension, surélévation. Respect du bâti existant et des riverains. Chantier propre garanti.", icon: "◫" },
  { name: "Gros Œuvre", desc: "Terrassement, fondations, béton armé, charpente. Équipes internes spécialisées, zéro sous-traitance non maîtrisée.", icon: "◧" },
  { name: "Promotion Immobilière", desc: "MOA, AMO, coordination de programmes. Partenariats avec promoteurs, bailleurs sociaux et collectivités.", icon: "◨" },
]

const TESTIMONIALS = [
  { quote: "Livré 3 semaines avant le délai contractuel. 84 logements, zéro malfaçon à la réception. Du jamais-vu sur un chantier de cette envergure.", name: "Laurent Duchamp", role: "Directeur de programmes, Foncière du Sud" },
  { quote: "La coordination intervenants a été exemplaire. Nous avons pu ouvrir le campus aux étudiants dès septembre, conformément à notre calendrier académique.", name: "Isabelle Renard", role: "Directrice immobilière, Campus Tech" },
  { quote: "Prix ferme tenu, interlocuteur unique tout au long du projet. C'est tout ce qu'on demande — et c'est rare.", name: "Pierre Moreau", role: "DAF, Groupe Avenir Retail" },
]

const FAQS = [
  { q: "Quel est votre rayon d'intervention ?", a: "Principalement Sud et Centre de la France (Rhône-Alpes, Occitanie, Pays de la Loire). Nous étudions tous les projets >10M€ sur l'ensemble du territoire." },
  { q: "Proposez-vous des contrats clé en main ?", a: "Oui — forfait global et définitif (GD), conception-réalisation, et contrats en entreprise générale selon la nature du projet." },
  { q: "Comment gérez-vous les délais ?", a: "Planning hebdomadaire partagé avec le maître d'ouvrage, réunion de chantier systématique, système d'alerte interne sur les écarts de planning >3 jours." },
  { q: "Vos matériaux sont-ils certifiés ?", a: "100% fournitures avec certificats CE et fiches techniques. Traçabilité complète disponible sur demande pour chaque lot." },
  { q: "Intervenez-vous sur les marchés publics ?", a: "Oui — références en marchés publics disponibles sur demande. Habilitations et attestations fiscales à jour, KBIS récent fourni." },
]

const PLANS = [
  { name: "AMO & Conseil", price: "Sur devis", note: "% du montant travaux", features: ["Assistance maîtrise d'ouvrage", "Montage opération", "Sélection intervenants", "Suivi de chantier"] },
  { name: "Entreprise Générale", price: "Forfait GD", note: "prix ferme & définitif", features: ["Mission complète corps d'état", "Coordination tous lots", "Garanties décennale + DO", "Interlocuteur unique MOA", "Planning hebdomadaire partagé"], highlight: true },
  { name: "Conception-Réalisation", price: "Sur mesure", note: "mission globale intégrée", features: ["Design + Construction en one-stop", "Optimisation coûts dès conception", "Délai réduit vs procédures classiques", "Référent projet dédié"] },
]

export default function Page() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const { scrollY } = useScroll()

  const heroScale = useTransform(scrollY, [0, 400], [1, 1.04])

  const statsRef = useRef(null)
  const projectsRef = useRef(null)
  const pricingRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" })
  const projectsInView = useInView(projectsRef, { once: true, margin: "-100px" })
  const pricingInView = useInView(pricingRef, { once: true, margin: "-100px" })

  const C = {
    bg: "#111210",
    orange: "#f97316",
    orangeDark: "#c45f0a",
    text: "#e8e6e0",
    muted: "#6b6a64",
    card: "#18170f",
    border: "#222218",
    sans: "system-ui, -apple-system, sans-serif",
  }

  const STATS = [
    { val: "340+", label: "Projets réalisés" },
    { val: "2.4B€", label: "Volume construit depuis 1989" },
    { val: "98%", label: "Délais tenus" },
    { val: "35 ans", label: "D'expertise" },
  ]

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: C.sans, overflowX: "hidden" }}>
      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(17,18,16,0.97)", borderBottom: `2px solid ${C.orange}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 60px", height: 60 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 32, height: 32, background: C.orange, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 16, color: "#fff" }}>S</div>
          <div style={{ fontWeight: 900, fontSize: 15, letterSpacing: 2, textTransform: "uppercase" }}>Structure Bâtisseurs</div>
        </div>
        <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
          {["Projets", "Services", "Équipe", "Contact"].map(l => (
            <a key={l} href="#" style={{ fontSize: 12, color: C.muted, letterSpacing: 2, textTransform: "uppercase", textDecoration: "none", transition: "color 0.15s" }}
              onMouseEnter={e => (e.currentTarget.style.color = C.orange)}
              onMouseLeave={e => (e.currentTarget.style.color = C.muted)}>
              {l}
            </a>
          ))}
          <motion.button whileHover={{ background: C.orange }} whileTap={{ scale: 0.97 }}
            style={{ padding: "10px 24px", background: "transparent", color: C.orange, border: `2px solid ${C.orange}`, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s", fontFamily: C.sans, fontWeight: 700 }}>
            Devis →
          </motion.button>
        </div>
      </nav>

      {/* HERO — oversized bold numbers + diagonal stripe */}
      <section style={{ minHeight: "100vh", paddingTop: 60, position: "relative", overflow: "hidden", display: "flex", alignItems: "center" }}>
        {/* Diagonal stripe */}
        <div style={{ position: "absolute", top: 0, right: 0, width: "45%", height: "100%", background: C.orange, clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0% 100%)", zIndex: 0 }} />

        <div style={{ position: "relative", zIndex: 1, padding: "0 60px", width: "100%" }}>
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <div style={{ fontSize: 11, letterSpacing: 5, color: C.orange, textTransform: "uppercase", marginBottom: 32 }}>Depuis 1989 · Construire l'avenir</div>
            <h1 style={{ fontSize: "clamp(64px, 11vw, 160px)", fontWeight: 900, letterSpacing: "-4px", lineHeight: 0.88, textTransform: "uppercase", color: C.text, marginBottom: 0 }}>
              ON<br />BÂTIT.
            </h1>
            <div style={{ fontSize: "clamp(64px, 11vw, 160px)", fontWeight: 900, letterSpacing: "-4px", lineHeight: 0.88, textTransform: "uppercase", color: "#fff", WebkitTextStroke: `3px ${C.orange}`, WebkitTextFillColor: "transparent" }}>
              SOLIDE.
            </div>
            <div style={{ marginTop: 56, display: "flex", gap: 20 }}>
              <motion.button whileHover={{ background: "#fff", color: C.bg }} whileTap={{ scale: 0.97 }}
                style={{ padding: "18px 48px", background: C.orange, color: "#fff", border: "none", fontWeight: 900, fontSize: 14, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s", fontFamily: C.sans }}>
                Voir nos chantiers
              </motion.button>
              <motion.button whileHover={{ borderColor: "#fff", color: "#fff" }} whileTap={{ scale: 0.97 }}
                style={{ padding: "18px 48px", background: "transparent", color: C.muted, border: `2px solid ${C.border}`, fontWeight: 700, fontSize: 14, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s", fontFamily: C.sans }}>
                Demander un devis
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS — count-up on scroll */}
      <section ref={statsRef} style={{ background: C.orange }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
          {STATS.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={statsInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1 }}
              style={{ padding: "60px 48px", borderRight: i < 3 ? "2px solid rgba(255,255,255,0.2)" : undefined, textAlign: "center" }}>
              <div style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 900, color: "#fff", letterSpacing: -2, lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", marginTop: 10, letterSpacing: 1, textTransform: "uppercase" }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section ref={projectsRef} style={{ padding: "80px 60px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56 }}>
          <h2 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 900, letterSpacing: -2, textTransform: "uppercase", lineHeight: 1 }}>NOS CHANTIERS</h2>
          <a href="#" style={{ fontSize: 12, color: C.orange, letterSpacing: 2, textTransform: "uppercase", textDecoration: "none", fontWeight: 700 }}>Voir tous →</a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {PROJECTS.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={projectsInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.12 }}
              whileHover={{ borderColor: C.orange }}
              style={{ border: `1px solid ${C.border}`, padding: "40px", cursor: "pointer", transition: "border-color 0.2s" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 11, color: p.status.includes("Livré") ? C.muted : C.orange, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>{p.status}</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: C.text, letterSpacing: -0.5 }}>{p.name}</div>
                </div>
                {p.units && <div style={{ fontSize: 32, fontWeight: 900, color: C.orange, letterSpacing: -1 }}>{p.units}<span style={{ fontSize: 14, fontWeight: 400, color: C.muted }}>u</span></div>}
              </div>
              <div style={{ fontSize: 13, color: C.muted, marginBottom: 24 }}>{p.type} · {p.location}</div>
              <div style={{ height: 4, background: C.border, borderRadius: 2 }}>
                <motion.div initial={{ width: 0 }} animate={projectsInView ? { width: `${p.progress}%` } : {}} transition={{ duration: 1.5, delay: i * 0.12 + 0.3, ease: "easeOut" }}
                  style={{ height: "100%", background: p.progress === 100 ? C.muted : C.orange, borderRadius: 2 }} />
              </div>
              <div style={{ fontSize: 11, color: C.muted, marginTop: 8, letterSpacing: 1 }}>{p.progress}% réalisé</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section style={{ padding: "80px 60px", borderBottom: `1px solid ${C.border}` }}>
        <h2 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 900, letterSpacing: -2, textTransform: "uppercase", marginBottom: 56, lineHeight: 1 }}>NOS MÉTIERS</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2 }}>
          {SERVICES.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              whileHover={{ borderColor: C.orange, background: "#1a1910" }}
              style={{ border: `1px solid ${C.border}`, padding: "40px 32px", transition: "all 0.2s", cursor: "pointer" }}>
              <div style={{ fontSize: 28, color: C.orange, marginBottom: 24, fontWeight: 900 }}>{s.icon}</div>
              <div style={{ fontSize: 17, fontWeight: 800, color: C.text, marginBottom: 16, letterSpacing: -0.3 }}>{s.name}</div>
              <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.75 }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "80px 60px", borderBottom: `1px solid ${C.border}`, background: "#0d0c0a" }}>
        <h2 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 900, letterSpacing: -2, textTransform: "uppercase", marginBottom: 56, lineHeight: 1 }}>ILS NOUS FONT<br />CONFIANCE</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
              style={{ borderTop: `3px solid ${C.orange}`, paddingTop: 32 }}>
              <p style={{ fontSize: 15, color: "rgba(232,230,224,0.75)", lineHeight: 1.75, marginBottom: 24 }}>« {t.quote} »</p>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{t.name}</div>
              <div style={{ fontSize: 12, color: C.muted }}>{t.role}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section ref={pricingRef} style={{ padding: "80px 60px", borderBottom: `1px solid ${C.border}` }}>
        <h2 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 900, letterSpacing: -2, textTransform: "uppercase", marginBottom: 56, lineHeight: 1 }}>NOS FORMULES</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {PLANS.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 36 }} animate={pricingInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.15 }}
              style={{ background: p.highlight ? "#1a1910" : C.card, border: `2px solid ${p.highlight ? C.orange : C.border}`, padding: "48px 40px", position: "relative" }}>
              {p.highlight && <div style={{ position: "absolute", top: -1, left: 0, right: 0, height: 3, background: C.orange }} />}
              <div style={{ fontSize: 11, color: p.highlight ? C.orange : C.muted, letterSpacing: 3, textTransform: "uppercase", marginBottom: 20 }}>{p.name}</div>
              <div style={{ fontSize: 32, fontWeight: 900, color: C.text, letterSpacing: -1, lineHeight: 1, marginBottom: 6 }}>{p.price}</div>
              <div style={{ fontSize: 12, color: C.muted, marginBottom: 36 }}>{p.note}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 40 }}>
                {p.features.map((f, j) => (
                  <div key={j} style={{ display: "flex", gap: 10, fontSize: 13, color: p.highlight ? "rgba(232,230,224,0.8)" : C.muted, alignItems: "flex-start" }}>
                    <span style={{ color: C.orange, fontWeight: 900, marginTop: 1 }}>→</span> {f}
                  </div>
                ))}
              </div>
              <motion.button whileHover={{ background: C.orange, color: "#fff", borderColor: C.orange }} whileTap={{ scale: 0.97 }}
                style={{ width: "100%", padding: "16px", background: p.highlight ? C.orange : "transparent", color: p.highlight ? "#fff" : C.orange, border: `2px solid ${p.highlight ? C.orange : C.border}`, fontWeight: 900, fontSize: 13, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s", fontFamily: C.sans }}>
                Demander un devis
              </motion.button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: 860, margin: "0 auto", padding: "80px 60px" }}>
        <h2 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, letterSpacing: -2, textTransform: "uppercase", marginBottom: 48 }}>FAQ</h2>
        {FAQS.map((f, i) => (
          <div key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
            <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
              style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "22px 0", background: "none", border: "none", color: C.text, cursor: "pointer", textAlign: "left" }}>
              <span style={{ fontSize: 15, fontWeight: 700 }}>{f.q}</span>
              <motion.span animate={{ rotate: openFaq === i ? 45 : 0 }} style={{ fontSize: 24, color: C.orange, minWidth: 24 }}>+</motion.span>
            </button>
            <AnimatePresence>
              {openFaq === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                  <p style={{ paddingBottom: 22, fontSize: 14, color: C.muted, lineHeight: 1.8 }}>{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section style={{ background: C.orange, padding: "80px 60px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ fontSize: "clamp(40px, 6vw, 80px)", fontWeight: 900, letterSpacing: -3, textTransform: "uppercase", color: "#fff", lineHeight: 0.95 }}>
          VOTRE PROJET,<br />NOTRE CHANTIER.
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, minWidth: 320 }}>
          <input placeholder="Email ou téléphone" style={{ padding: "16px 20px", background: "rgba(255,255,255,0.15)", border: "2px solid rgba(255,255,255,0.4)", color: "#fff", fontSize: 15, outline: "none", fontFamily: C.sans }} />
          <motion.button whileHover={{ background: C.bg, color: C.orange }} whileTap={{ scale: 0.97 }}
            style={{ padding: "18px", background: "#fff", color: C.orange, border: "none", fontWeight: 900, fontSize: 15, letterSpacing: 1, textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s", fontFamily: C.sans }}>
            Être rappelé sous 24h →
          </motion.button>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#0a0908", padding: "40px 60px", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: `2px solid ${C.border}` }}>
        <div style={{ fontSize: 14, fontWeight: 900, letterSpacing: 2, textTransform: "uppercase", color: C.text }}>Structure Bâtisseurs · Depuis 1989</div>
        <div style={{ fontSize: 12, color: C.muted }}>© 2025 · Mentions légales · RGPD · Kbis disponible sur demande</div>
      </footer>
    </div>
  )
}
