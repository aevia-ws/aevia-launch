"use client"

import React, { useState, useRef } from "react"
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"

// FRÉQUENCE — Independent newsletter/media. Bold yellow + black editorial, subscription-first, column layout.
// Unique: oversized rotating "F" logo, vertical tab navigation on left, issue-based structure.

const ISSUES = [
  { num: "047", date: "Semaine du 5 mai 2025", title: "L'IA va-t-elle tuer la créativité — ou la sauver ?", reads: "14 200", tag: "Tech & Culture" },
  { num: "046", date: "28 avril 2025", title: "Le retour du bureau : ce que les chiffres ne disent pas.", reads: "11 800", tag: "Business" },
  { num: "045", date: "21 avril 2025", title: "Quiet quitting 2025 : le mouvement s'est transformé.", reads: "16 400", tag: "Société" },
  { num: "044", date: "14 avril 2025", title: "Startup Winter — les levées de fonds à la loupe.", reads: "9 300", tag: "Finance" },
]

const CATEGORIES = ["Tech & Culture", "Business", "Société", "Finance", "Design", "Future du Travail"]

const TESTIMONIALS = [
  { quote: "Fréquence est la seule newsletter que j'ouvre en premier le lundi matin. Pas de bullshit, des idées qui tiennent.", name: "Alexandre M.", role: "Directeur Produit, Scale-up" },
  { quote: "J'ai lu 3 articles et j'ai restructuré toute ma stratégie Q3. Ça mérite largement l'abonnement.", name: "Cécile P.", role: "Founder, Studio indépendant" },
  { quote: "Enfin du contenu qui respecte l'intelligence du lecteur. C'est rare et précieux.", name: "Romain L.", role: "VC Partner, Paris" },
]

const PLANS = [
  { name: "Gratuit", price: "0 €", note: "pour toujours", features: ["1 article par semaine", "Archives des 3 derniers mois", "Newsletter hebdo résumée"] },
  { name: "Lecteur", price: "9 €", note: "/mois · sans engagement", features: ["Accès illimité à tous les articles", "Archives complètes (2019–)", "Newsletter complète sans pub", "Podcast hebdo inclus"], highlight: true },
  { name: "Studio", price: "49 €", note: "/mois · équipe jusqu'à 10", features: ["Tout Lecteur ×10 comptes", "Rapports thématiques mensuels", "Accès sessions live Q&A", "Usage commercial articles"] },
]

const FAQS = [
  { q: "À quelle fréquence publiez-vous ?", a: "Chaque lundi — une grande analyse (2 500 mots) + 3 brèves. Parfois un hors-série le jeudi sur un sujet brûlant." },
  { q: "Puis-je annuler mon abonnement ?", a: "Oui, à tout moment depuis votre espace abonné. Pas de rétention abusive, pas d'email de culpabilisation." },
  { q: "Acceptez-vous les articles invités ?", a: "Rarement. Nous publions des contributeurs de la communauté 2 fois par mois sur candidature." },
  { q: "Avez-vous des publicités ?", a: "Un seul sponsor par numéro, clairement identifié. Aucune donnée lecteur vendue. Jamais." },
  { q: "Y a-t-il un podcast ?", a: "Oui — disponible pour les abonnés Lecteur. L'éditeur commente l'édition en 20 min chaque lundi." },
]

export default function Page() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)
  const [activeIssue, setActiveIssue] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState(0)
  const { scrollY } = useScroll()

  const logoRotate = useTransform(scrollY, [0, 1000], [0, 180])

  const pricingRef = useRef(null)
  const pricingInView = useInView(pricingRef, { once: true, margin: "-100px" })

  const C = {
    yellow: "#f5e642",
    bg: "#0d0d0d",
    white: "#f0ede6",
    muted: "#555",
    card: "#141414",
    border: "#1f1f1f",
    mono: "'JetBrains Mono', 'Courier New', monospace",
    serif: "'Times New Roman', Georgia, serif",
    sans: "system-ui, -apple-system, sans-serif",
  }

  return (
    <div style={{ background: C.bg, color: C.white, fontFamily: C.sans, overflowX: "hidden" }}>
      {/* NAV — newspaper style top bar */}
      <nav style={{ borderBottom: `2px solid ${C.border}`, padding: "0 60px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <div style={{ fontFamily: C.serif, fontSize: 28, fontWeight: 700, letterSpacing: -1, color: C.yellow }}>Fréquence</div>
          <div style={{ fontFamily: C.mono, fontSize: 10, letterSpacing: 2, color: C.muted, borderLeft: `1px solid ${C.border}`, paddingLeft: 24 }}>Numéro 047 · Lundi 5 mai 2025</div>
        </div>
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {["Archives", "Podcast", "À propos"].map(l => (
            <a key={l} href="#" style={{ fontFamily: C.mono, fontSize: 11, letterSpacing: 2, color: C.muted, textDecoration: "none", textTransform: "uppercase" }}>{l}</a>
          ))}
          <motion.button whileHover={{ background: C.yellow, color: C.bg }} whileTap={{ scale: 0.97 }}
            style={{ padding: "8px 20px", background: "transparent", color: C.yellow, border: `1px solid ${C.yellow}`, fontFamily: C.mono, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s" }}>
            S'abonner
          </motion.button>
        </div>
      </nav>

      {/* HERO — oversized rotating F + headline */}
      <section style={{ display: "grid", gridTemplateColumns: "240px 1fr", borderBottom: `1px solid ${C.border}`, minHeight: "80vh" }}>
        {/* Left sidebar with rotating F */}
        <div style={{ borderRight: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
          <motion.div style={{ rotate: logoRotate, fontSize: 240, fontFamily: C.serif, fontWeight: 700, color: C.yellow, lineHeight: 1, opacity: 0.15, position: "absolute" }}>
            F
          </motion.div>
          <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
            {CATEGORIES.map((cat, i) => (
              <motion.div key={i}
                onClick={() => setActiveCategory(i)}
                whileHover={{ x: 4 }}
                style={{ fontFamily: C.mono, fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: activeCategory === i ? C.yellow : C.muted, padding: "12px 0", cursor: "pointer", transition: "color 0.2s", borderBottom: `1px solid ${C.border}` }}>
                {cat}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Main hero content */}
        <div style={{ padding: "80px 80px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 48 }}>
              <div style={{ background: C.yellow, padding: "4px 12px", fontFamily: C.mono, fontSize: 10, letterSpacing: 3, color: C.bg, textTransform: "uppercase", fontWeight: 700 }}>
                {ISSUES[0].tag}
              </div>
              <div style={{ fontFamily: C.mono, fontSize: 10, letterSpacing: 2, color: C.muted }}>№ {ISSUES[0].num}</div>
            </div>
            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
              style={{ fontFamily: C.serif, fontSize: "clamp(44px, 6vw, 88px)", fontWeight: 700, letterSpacing: -2, lineHeight: 1.05, color: C.white, marginBottom: 36 }}>
              {ISSUES[0].title}
            </motion.h1>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
              <p style={{ fontFamily: C.serif, fontSize: 17, lineHeight: 1.85, color: "rgba(240,237,230,0.6)", borderTop: `1px solid ${C.border}`, paddingTop: 24 }}>
                Il y a trois ans, on nous promettait que l'IA allait tuer des millions de jobs créatifs. Aujourd'hui, les designers, écrivains et musiciens les plus influents utilisent tous des outils génératifs. Ce n'est pas la mort de la créativité — c'est sa mutation.
              </p>
              <p style={{ fontFamily: C.serif, fontSize: 17, lineHeight: 1.85, color: "rgba(240,237,230,0.6)", borderTop: `1px solid ${C.border}`, paddingTop: 24 }}>
                Mais à quel prix ? L'analyse de 400 créatifs professionnels sur leur rapport à ces outils révèle une fracture profonde — entre ceux qui se sont adaptés et ceux qui ont arrêté de créer.
              </p>
            </div>
          </div>
          <div style={{ display: "flex", gap: 24, alignItems: "center", borderTop: `1px solid ${C.border}`, paddingTop: 32, marginTop: 48 }}>
            <div style={{ fontFamily: C.mono, fontSize: 11, color: C.muted, letterSpacing: 2 }}>{ISSUES[0].reads} lectures</div>
            <motion.button whileHover={{ background: C.yellow, color: C.bg }} whileTap={{ scale: 0.97 }}
              style={{ padding: "12px 32px", background: "transparent", color: C.yellow, border: `1px solid ${C.yellow}`, fontFamily: C.mono, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s" }}>
              Lire l'article complet →
            </motion.button>
            <div style={{ fontFamily: C.mono, fontSize: 10, color: C.muted }}>Réservé aux abonnés</div>
          </div>
        </div>
      </section>

      {/* ARCHIVE — issue list */}
      <section style={{ borderBottom: `1px solid ${C.border}` }}>
        <div style={{ padding: "64px 60px 0", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40 }}>
          <div style={{ fontFamily: C.serif, fontSize: 36, fontWeight: 700, letterSpacing: -1 }}>Dernières éditions</div>
          <a href="#" style={{ fontFamily: C.mono, fontSize: 11, letterSpacing: 3, color: C.yellow, textDecoration: "none", textTransform: "uppercase" }}>Archives complètes →</a>
        </div>
        {ISSUES.map((issue, i) => (
          <motion.div key={i}
            onClick={() => setActiveIssue(i)}
            whileHover={{ background: "#111" }}
            style={{ borderTop: `1px solid ${C.border}`, padding: "28px 60px", cursor: "pointer", display: "flex", alignItems: "center", gap: 48, transition: "background 0.15s", background: activeIssue === i ? "#111" : "transparent" }}>
            <div style={{ fontFamily: C.mono, fontSize: 11, color: C.yellow, minWidth: 40 }}>#{issue.num}</div>
            <div style={{ fontFamily: C.mono, fontSize: 10, letterSpacing: 2, color: C.muted, minWidth: 140, textTransform: "uppercase" }}>{issue.tag}</div>
            <div style={{ fontFamily: C.serif, fontSize: 18, flex: 1, color: C.white }}>{issue.title}</div>
            <div style={{ fontFamily: C.mono, fontSize: 10, color: C.muted }}>{issue.reads} lectures</div>
            <div style={{ fontFamily: C.mono, fontSize: 10, color: C.muted, textAlign: "right", minWidth: 120 }}>{issue.date}</div>
          </motion.div>
        ))}
      </section>

      {/* SUBSCRIPTION BOX */}
      <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ borderRight: `1px solid ${C.border}`, padding: "80px 80px", background: C.yellow }}>
          <div style={{ fontFamily: C.mono, fontSize: 11, letterSpacing: 4, color: "#6b5e00", textTransform: "uppercase", marginBottom: 24 }}>Pour aller plus loin</div>
          <h2 style={{ fontFamily: C.serif, fontSize: "clamp(40px, 5vw, 64px)", fontWeight: 700, letterSpacing: -2, lineHeight: 1.1, color: C.bg, marginBottom: 24 }}>
            Lisez tout.<br />Pensez mieux.
          </h2>
          <p style={{ fontSize: 16, color: "#3d3000", lineHeight: 1.7 }}>
            9 €/mois. Archives complètes depuis 2019. Podcast inclus. Sans publicité.
          </p>
        </div>
        <div style={{ padding: "80px 80px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 20 }}>
          <div style={{ fontFamily: C.mono, fontSize: 11, letterSpacing: 3, color: C.muted, textTransform: "uppercase", marginBottom: 8 }}>Commencer gratuitement</div>
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="votre@email.fr"
            style={{ padding: "16px 20px", background: C.card, border: `1px solid ${C.border}`, color: C.white, fontFamily: C.mono, fontSize: 13, outline: "none", letterSpacing: 1 }} />
          {subscribed ? (
            <div style={{ fontFamily: C.mono, fontSize: 13, color: C.yellow, letterSpacing: 2 }}>Bienvenue dans la communauté Fréquence ✓</div>
          ) : (
            <motion.button whileHover={{ background: C.yellow, color: C.bg, borderColor: C.yellow }} whileTap={{ scale: 0.97 }}
              onClick={() => { if (email) setSubscribed(true) }}
              style={{ padding: "16px", background: "transparent", color: C.white, border: `1px solid ${C.border}`, fontFamily: C.mono, fontSize: 12, letterSpacing: 3, textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s" }}>
              Accès gratuit →
            </motion.button>
          )}
          <div style={{ fontFamily: C.mono, fontSize: 10, color: C.muted, letterSpacing: 1 }}>+15 200 abonnés · Aucun spam · Désabonnement en 1 clic</div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ borderBottom: `1px solid ${C.border}`, padding: "80px 60px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0 }}>
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.15 }}
              style={{ padding: "0 56px 0 0", borderRight: i < 2 ? `1px solid ${C.border}` : undefined, paddingLeft: i > 0 ? 56 : 0 }}>
              <div style={{ fontFamily: C.serif, fontSize: 48, color: C.yellow, lineHeight: 0.8, marginBottom: 24 }}>"</div>
              <p style={{ fontFamily: C.serif, fontSize: 17, lineHeight: 1.75, color: "rgba(240,237,230,0.75)", marginBottom: 24 }}>{t.quote}</p>
              <div style={{ fontFamily: C.mono, fontSize: 10, color: C.muted, letterSpacing: 2, textTransform: "uppercase" }}>{t.name} · {t.role}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section ref={pricingRef} style={{ borderBottom: `1px solid ${C.border}` }}>
        <div style={{ padding: "80px 60px 48px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ fontFamily: C.serif, fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 700, letterSpacing: -2 }}>Abonnements</div>
          <div style={{ fontFamily: C.mono, fontSize: 11, color: C.muted, letterSpacing: 3, textTransform: "uppercase" }}>Simple et transparent</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", borderTop: `1px solid ${C.border}` }}>
          {PLANS.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={pricingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15 }}
              style={{ borderRight: i < 2 ? `1px solid ${C.border}` : undefined, padding: "56px 48px", background: p.highlight ? "#0a0900" : "transparent" }}>
              {p.highlight && <div style={{ width: "100%", height: 2, background: C.yellow, marginBottom: 48, position: "absolute", top: 0, left: 0 }} />}
              <div style={{ fontFamily: C.mono, fontSize: 10, letterSpacing: 4, color: p.highlight ? C.yellow : C.muted, textTransform: "uppercase", marginBottom: 24 }}>{p.name}</div>
              <div style={{ fontFamily: C.serif, fontSize: 56, fontWeight: 700, letterSpacing: -2, lineHeight: 1, marginBottom: 6 }}>{p.price}</div>
              <div style={{ fontFamily: C.mono, fontSize: 11, color: C.muted, marginBottom: 40 }}>{p.note}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 40 }}>
                {p.features.map((f, j) => (
                  <div key={j} style={{ display: "flex", gap: 12, alignItems: "flex-start", fontFamily: C.mono, fontSize: 12, color: p.highlight ? "rgba(240,237,230,0.8)" : C.muted, lineHeight: 1.5 }}>
                    <span style={{ color: C.yellow, fontWeight: 700, marginTop: 1 }}>→</span> {f}
                  </div>
                ))}
              </div>
              <motion.button whileHover={{ background: C.yellow, color: C.bg, borderColor: C.yellow }} whileTap={{ scale: 0.97 }}
                style={{ width: "100%", padding: "14px", background: "transparent", color: p.highlight ? C.yellow : C.muted, border: `1px solid ${p.highlight ? C.yellow : C.border}`, fontFamily: C.mono, fontSize: 11, letterSpacing: 3, textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s" }}>
                {p.price === "0 €" ? "Accès gratuit" : "S'abonner →"}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: 840, margin: "0 auto", padding: "80px 60px" }}>
        <div style={{ fontFamily: C.serif, fontSize: 40, fontWeight: 700, letterSpacing: -1, marginBottom: 48 }}>Questions fréquentes</div>
        {FAQS.map((f, i) => (
          <div key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
            <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
              style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "22px 0", background: "none", border: "none", color: C.white, cursor: "pointer", textAlign: "left" }}>
              <span style={{ fontFamily: C.serif, fontSize: 17, fontWeight: 600 }}>{f.q}</span>
              <motion.span animate={{ rotate: openFaq === i ? 45 : 0 }} style={{ fontSize: 22, color: C.yellow, minWidth: 22 }}>+</motion.span>
            </button>
            <AnimatePresence>
              {openFaq === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                  <p style={{ paddingBottom: 22, fontFamily: C.mono, fontSize: 13, color: C.muted, lineHeight: 1.8 }}>{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${C.border}`, padding: "40px 60px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontFamily: C.serif, fontSize: 20, fontWeight: 700, color: C.yellow }}>Fréquence</div>
        <div style={{ fontFamily: C.mono, fontSize: 10, color: C.muted, letterSpacing: 2 }}>HEBDOMADAIRE · INDÉPENDANT · DEPUIS 2019</div>
        <div style={{ fontFamily: C.mono, fontSize: 10, color: C.muted, letterSpacing: 1 }}>© 2025 — Confidentialité · Désabonnement</div>
      </footer>
    </div>
  )
}
