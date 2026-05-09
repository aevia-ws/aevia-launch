"use client"

import React, { useState, useRef } from "react"
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"

// CONFLUENCE EVENTS — Event agency. Warm terracotta + champagne + deep plum. Elegant serif.
// Unique: timeline-based service flow, event type selector, gallery masonry hover effect.

const EVENT_TYPES = [
  { name: "Mariages", icon: "◇", desc: "De la recherche de salle à la coordination jour J. Planning complet, gestion prestataires, direction artistique.", badge: "Notre spécialité", accent: "#b87c5a" },
  { name: "Séminaires", icon: "◈", desc: "Teambuilding, conventions, incentives. Lieux insolites, animations sur mesure, traiteur d'exception.", badge: null, accent: "#6b5a8a" },
  { name: "Galas & Soirées", icon: "◆", desc: "Dîners de gala, cérémonies de remise de prix, soirées de fin d'année. Scénographie complète.", badge: "Premium", accent: "#c4a96a" },
  { name: "Événements Privés", icon: "◉", desc: "Anniversaires, baptêmes, fêtes de famille. Du cocktail intime à la réception de 300 personnes.", badge: null, accent: "#7a9a6a" },
]

const STEPS = [
  { num: "01", title: "Découverte", desc: "Un premier appel de 30 min pour comprendre votre vision, vos contraintes et votre budget. Gratuit et sans engagement.", duration: "J-6 à 12 mois" },
  { num: "02", title: "Conception", desc: "Proposition créative détaillée : concept, scénographie, sélection de prestataires référencés et budget précis.", duration: "J-5 à 9 mois" },
  { num: "03", title: "Organisation", desc: "Négociation et coordination de tous les prestataires. Planning détaillé, rétro-planning, gestion administrative.", duration: "J-2 à 5 mois" },
  { num: "04", title: "Jour J", desc: "Direction artistique et coordination en temps réel. Vous profitez, on gère. Un interlocuteur sur place du début à la fin.", duration: "J-0" },
]

const TESTIMONIALS = [
  { quote: "Notre mariage était exactement ce qu'on avait imaginé — mais en mieux. Confluence a su aller au-delà de nos attentes sur chaque détail.", name: "Emma & Nicolas", event: "Mariage · 120 invités · Château de la Loire" },
  { quote: "Le séminaire annuel de notre groupe a enfin l'image qu'il mérite. Lieu bluffant, programme millimétré, retours unanimes.", name: "Marie-Claire Dupont", event: "Séminaire · 85 collaborateurs · Provence" },
  { quote: "Gala de prestige coordonné en 8 semaines. Impossible selon tout le monde — sauf Confluence.", name: "Laurent Tissier", event: "Gala · 240 convives · Paris 8e" },
]

const FAQS = [
  { q: "Quelle est votre zone d'intervention ?", a: "France entière. Principalement Île-de-France, Auvergne-Rhône-Alpes, et PACA. Destinations internationales sur demande (Europe, Méditerranée)." },
  { q: "Quel est votre budget minimum ?", a: "Nous travaillons à partir de 15 000 € pour les mariages et 8 000 € pour les événements d'entreprise. En dessous, nous proposons un accompagnement partiel." },
  { q: "Comment calculez-vous vos honoraires ?", a: "Forfait fixe pour la coordination complète (10–15% du budget événement) ou forfait à la carte pour des missions ponctuelles (recherche de lieu, direction artistique, jour J)." },
  { q: "Travaillez-vous avec vos propres prestataires ?", a: "Nous avons un réseau de partenaires sélectionnés, mais nous travaillons volontiers avec vos prestataires existants. Pas de commission cachée sur les fournisseurs." },
  { q: "Que se passe-t-il si un prestataire fait défaut le jour J ?", a: "Nous avons toujours des solutions de secours identifiées en amont. Notre réseau permet des remplacements en 24–48h dans presque tous les cas." },
]

const PLANS = [
  { name: "Essentiel", price: "À partir de 1 800 €", note: "mission partielle", features: ["Recherche & réservation du lieu", "Sélection 3 prestataires clés", "Budget et rétro-planning", "Assistance email J-6 à J-1"] },
  { name: "Confluent", price: "10–15%", note: "du budget événement", features: ["Mission complète clé en main", "Direction artistique incluse", "Coordination tous prestataires", "Présence jour J full-day", "Bilan post-événement"], highlight: true },
  { name: "Signature", price: "Sur devis", note: "événements de prestige", features: ["Tout Confluent inclus", "Déplacements internationaux", "Relations presse & influence", "Scénographie exclusive", "Support 24/7 J-30 à J+7"] },
]

export default function Page() {
  const [activeType, setActiveType] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const { scrollY } = useScroll()

  const heroY = useTransform(scrollY, [0, 500], [0, -60])

  const stepsRef = useRef(null)
  const pricingRef = useRef(null)
  const stepsInView = useInView(stepsRef, { once: true, margin: "-100px" })
  const pricingInView = useInView(pricingRef, { once: true, margin: "-100px" })

  const C = {
    bg: "#faf6f0",
    plum: "#3d2645",
    terracotta: "#b87c5a",
    champagne: "#e8d4b8",
    text: "#1a1208",
    muted: "#8b7a6b",
    card: "#ffffff",
    border: "#e8ddd0",
    serif: "'Cormorant Garamond', Georgia, serif",
    sans: "system-ui, -apple-system, sans-serif",
  }

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: C.sans, overflowX: "hidden" }}>
      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(250,246,240,0.97)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 60px", height: 68 }}>
        <div>
          <div style={{ fontFamily: C.serif, fontSize: 20, letterSpacing: 2, fontStyle: "italic", color: C.plum }}>Confluence</div>
          <div style={{ fontSize: 9, letterSpacing: 4, color: C.muted, textTransform: "uppercase" }}>Agence Événementielle</div>
        </div>
        <div style={{ display: "flex", gap: 40, alignItems: "center" }}>
          {["Événements", "Notre approche", "Réalisations", "Contact"].map(l => (
            <a key={l} href="#" style={{ fontSize: 12, color: C.muted, letterSpacing: 1, textDecoration: "none", fontWeight: 500 }}>{l}</a>
          ))}
          <motion.button whileHover={{ background: C.plum }} whileTap={{ scale: 0.97 }}
            style={{ padding: "10px 28px", background: C.terracotta, color: "#fff", border: "none", fontSize: 12, letterSpacing: 1, cursor: "pointer", fontFamily: C.sans, fontWeight: 600, transition: "background 0.2s" }}>
            Nous contacter
          </motion.button>
        </div>
      </nav>

      {/* HERO — centered serif, warm gradient */}
      <section style={{ minHeight: "100vh", paddingTop: 68, background: `linear-gradient(to bottom, ${C.bg}, #f0e8d8)`, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", position: "relative", overflow: "hidden" }}>
        {/* Decorative circles */}
        <div style={{ position: "absolute", top: "15%", left: "8%", width: 200, height: 200, border: `1px solid ${C.champagne}`, borderRadius: "50%", opacity: 0.5 }} />
        <div style={{ position: "absolute", bottom: "20%", right: "6%", width: 300, height: 300, border: `1px solid ${C.champagne}`, borderRadius: "50%", opacity: 0.3 }} />

        <motion.div style={{ y: heroY, position: "relative", zIndex: 1, maxWidth: 900, padding: "0 60px" }}>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <div style={{ fontFamily: C.serif, fontSize: 12, letterSpacing: 6, color: C.terracotta, textTransform: "uppercase", marginBottom: 36, fontStyle: "italic" }}>
              Vos instants. Notre expertise.
            </div>
            <h1 style={{ fontFamily: C.serif, fontSize: "clamp(56px, 9vw, 130px)", fontWeight: 400, letterSpacing: -2, lineHeight: 0.95, color: C.plum, fontStyle: "italic", marginBottom: 40 }}>
              Chaque<br />
              événement<br />
              <span style={{ color: C.terracotta }}>mérite</span><br />
              l'exceptionnel.
            </h1>
            <p style={{ fontSize: 18, color: C.muted, lineHeight: 1.75, maxWidth: 560, margin: "0 auto 56px" }}>
              Mariages, séminaires, galas et fêtes privées. Nous orchestrons vos moments les plus importants avec précision et passion.
            </p>
            <div style={{ display: "flex", gap: 20, justifyContent: "center" }}>
              <motion.button whileHover={{ background: C.plum }} whileTap={{ scale: 0.97 }}
                style={{ padding: "18px 48px", background: C.terracotta, color: "#fff", border: "none", fontSize: 15, fontWeight: 600, letterSpacing: 0.5, cursor: "pointer", transition: "background 0.2s" }}>
                Parler de mon projet
              </motion.button>
              <motion.button whileHover={{ borderColor: C.terracotta, color: C.terracotta }} whileTap={{ scale: 0.97 }}
                style={{ padding: "18px 48px", background: "transparent", color: C.muted, border: `1.5px solid ${C.border}`, fontSize: 15, cursor: "pointer", transition: "all 0.2s" }}>
                Voir nos réalisations
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* STATS */}
      <section style={{ background: C.plum }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", maxWidth: 1280, margin: "0 auto" }}>
          {[{ val: "340+", label: "Événements réalisés" }, { val: "98%", label: "Clients satisfaits" }, { val: "12 ans", label: "D'expérience" }, { val: "France & Europe", label: "Zone d'intervention" }].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              style={{ padding: "52px 40px", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.1)" : undefined, textAlign: "center" }}>
              <div style={{ fontFamily: C.serif, fontSize: 48, fontStyle: "italic", color: C.champagne, lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontSize: 12, color: "rgba(232,212,184,0.5)", marginTop: 10, letterSpacing: 1 }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* EVENT TYPES */}
      <section style={{ padding: "100px 60px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2 style={{ fontFamily: C.serif, fontSize: "clamp(36px, 4vw, 56px)", fontStyle: "italic", fontWeight: 400, color: C.plum }}>Nos événements</h2>
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 56, flexWrap: "wrap" }}>
          {EVENT_TYPES.map((t, i) => (
            <button key={i} onClick={() => setActiveType(i)}
              style={{ padding: "10px 28px", border: `1.5px solid ${activeType === i ? t.accent : C.border}`, background: activeType === i ? t.accent : "transparent", color: activeType === i ? "#fff" : C.muted, fontSize: 14, cursor: "pointer", transition: "all 0.2s", fontFamily: C.sans, fontWeight: activeType === i ? 600 : 400 }}>
              {t.name}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={activeType} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            style={{ background: C.card, border: `1px solid ${C.border}`, padding: "56px 80px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center", maxWidth: 1100, margin: "0 auto" }}>
            <div>
              {EVENT_TYPES[activeType].badge && (
                <div style={{ display: "inline-block", background: EVENT_TYPES[activeType].accent + "22", color: EVENT_TYPES[activeType].accent, padding: "4px 16px", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", marginBottom: 24, fontWeight: 600 }}>
                  {EVENT_TYPES[activeType].badge}
                </div>
              )}
              <h3 style={{ fontFamily: C.serif, fontSize: "clamp(32px, 4vw, 52px)", fontStyle: "italic", fontWeight: 400, color: C.plum, marginBottom: 24 }}>{EVENT_TYPES[activeType].name}</h3>
              <p style={{ fontSize: 17, color: C.muted, lineHeight: 1.8, marginBottom: 40 }}>{EVENT_TYPES[activeType].desc}</p>
              <motion.button whileHover={{ background: EVENT_TYPES[activeType].accent, color: "#fff", borderColor: EVENT_TYPES[activeType].accent }} whileTap={{ scale: 0.97 }}
                style={{ padding: "14px 36px", background: "transparent", color: EVENT_TYPES[activeType].accent, border: `1.5px solid ${EVENT_TYPES[activeType].accent}`, fontSize: 13, letterSpacing: 1, cursor: "pointer", transition: "all 0.2s", fontFamily: C.sans, fontWeight: 600 }}>
                En savoir plus →
              </motion.button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {["Sélection du lieu", "Scénographie", "Gestion prestataires", "Coordination jour J"].map((feat, j) => (
                <div key={j} style={{ background: C.bg, border: `1px solid ${C.border}`, padding: "20px 20px", textAlign: "center" }}>
                  <div style={{ fontSize: 20, color: EVENT_TYPES[activeType].accent, marginBottom: 8, fontFamily: C.serif, fontStyle: "italic" }}>{EVENT_TYPES[activeType].icon}</div>
                  <div style={{ fontSize: 12, color: C.muted, fontWeight: 500 }}>{feat}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* TIMELINE / PROCESS */}
      <section ref={stepsRef} style={{ padding: "100px 60px", background: "#f5ede2", borderBottom: `1px solid ${C.border}` }}>
        <h2 style={{ fontFamily: C.serif, fontSize: "clamp(36px, 4vw, 56px)", fontStyle: "italic", fontWeight: 400, color: C.plum, textAlign: "center", marginBottom: 80 }}>Notre méthode.</h2>
        <div style={{ position: "relative", maxWidth: 900, margin: "0 auto" }}>
          <div style={{ position: "absolute", left: 48, top: 0, bottom: 0, width: 1, background: C.border }} />
          {STEPS.map((step, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -30 }} animate={stepsInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: i * 0.15, duration: 0.6 }}
              style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: 40, marginBottom: 56, position: "relative" }}>
              <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
                <div style={{ width: 40, height: 40, background: C.terracotta, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: C.serif, fontSize: 16, fontStyle: "italic", color: "#fff", margin: "0 auto 12px" }}>{step.num}</div>
                <div style={{ fontSize: 10, color: C.muted, letterSpacing: 1, lineHeight: 1.4 }}>{step.duration}</div>
              </div>
              <div style={{ paddingTop: 8 }}>
                <div style={{ fontFamily: C.serif, fontSize: 24, fontStyle: "italic", color: C.plum, marginBottom: 12 }}>{step.title}</div>
                <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.75 }}>{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "100px 60px", borderBottom: `1px solid ${C.border}` }}>
        <h2 style={{ fontFamily: C.serif, fontSize: "clamp(36px, 4vw, 56px)", fontStyle: "italic", fontWeight: 400, color: C.plum, textAlign: "center", marginBottom: 64 }}>Ils nous ont fait confiance.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40, maxWidth: 1280, margin: "0 auto" }}>
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
              <div style={{ fontFamily: C.serif, fontSize: 48, color: C.terracotta, lineHeight: 0.8, marginBottom: 20, fontStyle: "italic" }}>"</div>
              <p style={{ fontFamily: C.serif, fontSize: 18, fontStyle: "italic", color: C.plum, lineHeight: 1.7, marginBottom: 24 }}>{t.quote}</p>
              <div style={{ fontSize: 12, color: C.muted, letterSpacing: 0.5 }}>{t.name} · {t.event}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section ref={pricingRef} style={{ padding: "100px 60px", background: "#f5ede2", borderBottom: `1px solid ${C.border}` }}>
        <h2 style={{ fontFamily: C.serif, fontSize: "clamp(36px, 4vw, 56px)", fontStyle: "italic", fontWeight: 400, color: C.plum, textAlign: "center", marginBottom: 64 }}>Formules & honoraires.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, maxWidth: 1100, margin: "0 auto" }}>
          {PLANS.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 36 }} animate={pricingInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.15 }}
              style={{ background: p.highlight ? C.plum : C.card, border: p.highlight ? "none" : `1px solid ${C.border}`, padding: "48px 40px", boxShadow: p.highlight ? "0 20px 60px rgba(61,38,69,0.25)" : "none", transform: p.highlight ? "scale(1.03)" : "none" }}>
              <div style={{ fontSize: 11, letterSpacing: 3, color: p.highlight ? "rgba(232,212,184,0.7)" : C.muted, textTransform: "uppercase", marginBottom: 20 }}>{p.name}</div>
              <div style={{ fontFamily: C.serif, fontSize: 32, fontStyle: "italic", color: p.highlight ? C.champagne : C.plum, lineHeight: 1, marginBottom: 6 }}>{p.price}</div>
              <div style={{ fontSize: 13, color: p.highlight ? "rgba(232,212,184,0.5)" : C.muted, marginBottom: 40 }}>{p.note}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 40 }}>
                {p.features.map((f, j) => (
                  <div key={j} style={{ display: "flex", gap: 10, fontSize: 14, color: p.highlight ? "rgba(232,212,184,0.8)" : C.text, alignItems: "flex-start" }}>
                    <span style={{ color: C.terracotta, marginTop: 1 }}>—</span> {f}
                  </div>
                ))}
              </div>
              <motion.button whileHover={{ background: p.highlight ? C.champagne : C.terracotta, color: C.plum }} whileTap={{ scale: 0.97 }}
                style={{ width: "100%", padding: "14px", background: p.highlight ? C.terracotta : "transparent", color: p.highlight ? "#fff" : C.terracotta, border: `1.5px solid ${p.highlight ? C.terracotta : C.border}`, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s", fontFamily: C.sans, fontWeight: 600 }}>
                Nous contacter
              </motion.button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: 800, margin: "0 auto", padding: "100px 60px" }}>
        <h2 style={{ fontFamily: C.serif, fontSize: 48, fontStyle: "italic", fontWeight: 400, color: C.plum, textAlign: "center", marginBottom: 56 }}>Questions fréquentes.</h2>
        {FAQS.map((f, i) => (
          <div key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
            <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
              style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "22px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
              <span style={{ fontFamily: C.serif, fontSize: 17, fontStyle: "italic", color: C.plum }}>{f.q}</span>
              <motion.span animate={{ rotate: openFaq === i ? 45 : 0 }} style={{ fontSize: 22, color: C.terracotta, minWidth: 22 }}>+</motion.span>
            </button>
            <AnimatePresence>
              {openFaq === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                  <p style={{ paddingBottom: 22, fontSize: 14, color: C.muted, lineHeight: 1.85 }}>{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section style={{ background: C.plum, padding: "100px 60px", textAlign: "center" }}>
        <div style={{ fontFamily: C.serif, fontSize: 12, letterSpacing: 6, color: "rgba(232,212,184,0.6)", textTransform: "uppercase", marginBottom: 32 }}>Parlons de votre projet</div>
        <h2 style={{ fontFamily: C.serif, fontSize: "clamp(48px, 7vw, 96px)", fontStyle: "italic", fontWeight: 300, color: "#faf6f0", lineHeight: 1.0, marginBottom: 48 }}>
          Votre grand jour<br />commence ici.
        </h2>
        <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
          <motion.button whileHover={{ background: "#fff", color: C.plum }} whileTap={{ scale: 0.97 }}
            style={{ padding: "18px 48px", background: C.terracotta, color: "#fff", border: "none", fontSize: 15, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}>
            Premier appel gratuit →
          </motion.button>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#1a0f22", padding: "48px 60px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontFamily: C.serif, fontSize: 18, fontStyle: "italic", color: C.champagne }}>Confluence Events</div>
        <div style={{ fontSize: 12, color: "#4a3a5a" }}>© 2025 · Paris, France · SIRET 123 456 789 00010</div>
      </footer>
    </div>
  )
}
