"use client"

import React, { useState, useRef } from "react"
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"

// PULSE APP — Mobile SaaS productivity. Light mode, violet accent, split hero with phone mockup, scale scroll on UI preview.

const FEATURES_TABS = [
  {
    label: "Focus Mode",
    headline: "Éliminez les distractions, pas votre élan.",
    body: "Un seul objectif à l'écran. Timer Pomodoro intégré. Notifications bloquées automatiquement pendant vos sessions.",
    points: ["Deep Work Timer", "Blocage apps distrayantes", "Rapport de concentration quotidien"],
  },
  {
    label: "Équipe",
    headline: "Synchronisez sans réunions inutiles.",
    body: "Statuts asynchrones, check-ins automatiques et tableau de bord partagé pour garder tout le monde aligné sans Slack frénétique.",
    points: ["Check-ins asynchrones", "Objectifs d'équipe partagés", "Dashboard en temps réel"],
  },
  {
    label: "Analytics",
    headline: "Comprenez où va votre temps.",
    body: "Rapports hebdomadaires automatiques, patterns de productivité et suggestions personnalisées basées sur vos habitudes réelles.",
    points: ["Graphiques hebdomadaires", "Score de productivité", "Recommandations IA"],
  },
]

const TESTIMONIALS = [
  { quote: "J'ai récupéré 2h par jour. Littéralement. Pulse m'a rendu compte que je perdais mes matinées sur Slack.", name: "Antoine D.", role: "Product Manager, Scale-up Paris" },
  { quote: "Notre équipe de 12 a arrêté les daily standups. Les check-ins asynchrones font le travail en 3 min.", name: "Marianne L.", role: "CTO, Remote-first startup" },
  { quote: "Le Focus Mode seul vaut l'abonnement. Je n'avais pas écrit autant de code en une journée depuis 3 ans.", name: "Sébastien R.", role: "Fullstack Developer, Freelance" },
]

const PLANS = [
  { name: "Solo", price: "0 €", note: "pour toujours", features: ["1 utilisateur", "Focus Mode basique", "7 jours d'historique", "App mobile iOS + Android"] },
  { name: "Pro", price: "12 €", note: "/mois par utilisateur", features: ["Tout Solo inclus", "Analytics avancées", "Blocage apps personnalisé", "Intégrations (Notion, Linear, Jira)", "Support prioritaire"], highlight: true },
  { name: "Équipe", price: "9 €", note: "/mois par utilisateur · min 5", features: ["Tout Pro inclus", "Dashboard équipe", "Check-ins asynchrones", "Rapports managers", "SSO + Administration"] },
]

const FAQS = [
  { q: "Y a-t-il une version gratuite ?", a: "Oui — Pulse Solo est gratuit à vie pour un utilisateur. Aucune carte de crédit requise pour commencer." },
  { q: "Fonctionne-t-il sur Android et iOS ?", a: "Oui. Applications natives iOS 16+ et Android 12+. L'extension Chrome est incluse dans Pro." },
  { q: "Puis-je annuler à tout moment ?", a: "Oui. Pas d'engagement minimum sur le plan mensuel. Pro annuel économise 20%." },
  { q: "Comment fonctionne le blocage d'applications ?", a: "Via l'extension Chrome + les permissions Focus sur mobile. Vous choisissez quelles apps bloquer pendant vos sessions." },
  { q: "Mes données sont-elles privées ?", a: "Vos données ne sont jamais vendues. Stockage EU (RGPD), chiffrement AES-256, export JSON à tout moment." },
]

export default function Page() {
  const [activeTab, setActiveTab] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const { scrollY } = useScroll()

  const phoneScale = useTransform(scrollY, [0, 600], [1, 0.88])
  const phoneY = useTransform(scrollY, [0, 600], [0, 40])

  const featRef = useRef(null)
  const pricingRef = useRef(null)
  const featInView = useInView(featRef, { once: true, margin: "-100px" })
  const pricingInView = useInView(pricingRef, { once: true, margin: "-100px" })

  const C = {
    bg: "#f8f7ff",
    dark: "#0f0a2e",
    violet: "#6d28d9",
    violet2: "#a78bfa",
    muted: "#6b7280",
    card: "#ffffff",
    border: "#e5e7eb",
    mono: "'JetBrains Mono', monospace",
    sans: "system-ui, -apple-system, sans-serif",
  }

  const STATS = [
    { val: "47K+", label: "Utilisateurs actifs" },
    { val: "2.1h", label: "Économisées/jour en moy." },
    { val: "98%", label: "Satisfaction client" },
    { val: "4.9", label: "Note App Store" },
  ]

  return (
    <div style={{ background: C.bg, color: C.dark, fontFamily: C.sans, overflowX: "hidden" }}>
      {/* NAV — floating pill */}
      <nav style={{
        position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)", zIndex: 100,
        background: "rgba(255,255,255,0.9)", backdropFilter: "blur(16px)",
        border: `1px solid ${C.border}`,
        borderRadius: 50, padding: "12px 32px",
        display: "flex", alignItems: "center", gap: 40,
        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
        whiteSpace: "nowrap",
      }}>
        <span style={{ fontWeight: 800, fontSize: 16, color: C.violet, letterSpacing: -0.5 }}>Pulse</span>
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {["Fonctionnalités", "Tarifs", "Blog"].map(l => (
            <a key={l} href="#" style={{ fontSize: 14, color: C.muted, textDecoration: "none", fontWeight: 500 }}>{l}</a>
          ))}
        </div>
        <motion.button whileHover={{ background: C.violet, color: "#fff" }} whileTap={{ scale: 0.96 }}
          style={{ padding: "8px 20px", background: C.violet, color: "#fff", border: "none", borderRadius: 50, fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}>
          Essayer gratuitement
        </motion.button>
      </nav>

      {/* HERO — left text + right floating phone */}
      <section style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center", maxWidth: 1280, margin: "0 auto", padding: "120px 60px 80px", gap: 80 }}>
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#ede9fe", color: C.violet, padding: "6px 16px", borderRadius: 50, fontSize: 12, fontWeight: 600, marginBottom: 32, letterSpacing: 1 }}>
            v2.4 — Maintenant avec Focus IA
          </div>
          <h1 style={{ fontSize: "clamp(44px, 5.5vw, 76px)", fontWeight: 900, letterSpacing: "-2px", lineHeight: 1.05, marginBottom: 24, color: C.dark }}>
            Travaillez moins.<br />
            <span style={{ color: C.violet }}>Accomplissez plus.</span>
          </h1>
          <p style={{ fontSize: 18, color: C.muted, lineHeight: 1.7, marginBottom: 48, maxWidth: 460 }}>
            Pulse est l'app de productivité qui comprend comment votre cerveau fonctionne réellement — pas comment vous pensez qu'il fonctionne.
          </p>
          <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
            <motion.button whileHover={{ background: "#5b21b6" }} whileTap={{ scale: 0.97 }}
              style={{ padding: "16px 36px", background: C.violet, color: "#fff", border: "none", borderRadius: 50, fontSize: 16, fontWeight: 700, cursor: "pointer", transition: "background 0.2s" }}>
              Démarrer gratuitement
            </motion.button>
            <motion.button whileHover={{ borderColor: C.violet, color: C.violet }} whileTap={{ scale: 0.97 }}
              style={{ padding: "16px 36px", background: "transparent", color: C.dark, border: `2px solid ${C.border}`, borderRadius: 50, fontSize: 16, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}>
              Voir la démo →
            </motion.button>
          </div>
          <div style={{ display: "flex", gap: 32, marginTop: 48 }}>
            {["App Store 4.9", "RGPD", "No credit card"].map(t => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: C.muted, fontWeight: 500 }}>
                <div style={{ width: 6, height: 6, background: "#10b981", borderRadius: "50%" }} />
                {t}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Phone mockup */}
        <motion.div style={{ scale: phoneScale, y: phoneY, display: "flex", justifyContent: "center" }}
          initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
          <div style={{
            width: 300, height: 600,
            background: C.dark,
            borderRadius: 44,
            border: "8px solid #1a1040",
            boxShadow: "0 40px 80px rgba(109,40,217,0.25), 0 0 0 1px rgba(255,255,255,0.05)",
            overflow: "hidden",
            position: "relative",
          }}>
            {/* Status bar */}
            <div style={{ height: 40, background: "#1a1040", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 20px", fontSize: 11, color: "#fff", fontFamily: C.mono }}>
              <span>9:41</span><span>●●●●</span>
            </div>
            {/* App content */}
            <div style={{ padding: 20, background: "#13102a" }}>
              <div style={{ fontSize: 12, color: C.violet2, fontFamily: C.mono, marginBottom: 4 }}>Focus Session</div>
              <div style={{ fontSize: 32, fontWeight: 900, color: "#fff", letterSpacing: -1, marginBottom: 16 }}>25:00</div>
              <div style={{ height: 4, background: "#2d2a4a", borderRadius: 2, marginBottom: 20 }}>
                <motion.div animate={{ width: ["0%", "68%"] }} transition={{ duration: 2, delay: 0.8 }}
                  style={{ height: "100%", background: `linear-gradient(90deg, ${C.violet}, ${C.violet2})`, borderRadius: 2 }} />
              </div>
              {["Finaliser rapport Q2", "Revue code PR #47", "Email équipe"].map((task, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: "1px solid #2d2a4a" }}>
                  <div style={{ width: 16, height: 16, borderRadius: 4, border: i === 0 ? "none" : "2px solid #4a4670", background: i === 0 ? C.violet : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#fff" }}>
                    {i === 0 && "✓"}
                  </div>
                  <span style={{ fontSize: 12, color: i === 0 ? "#6b7280" : "#c4b5fd", textDecoration: i === 0 ? "line-through" : "none" }}>{task}</span>
                </div>
              ))}
              <motion.div animate={{ scale: [1, 1.02, 1] }} transition={{ repeat: Infinity, duration: 2.5 }}
                style={{ marginTop: 20, padding: "14px", background: C.violet, borderRadius: 12, textAlign: "center", fontSize: 13, fontWeight: 700, color: "#fff", cursor: "pointer" }}>
                En session — 42 min restantes
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* STATS */}
      <section style={{ borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, background: C.card }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
          {STATS.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              style={{ padding: "48px 40px", borderRight: i < 3 ? `1px solid ${C.border}` : undefined, textAlign: "center" }}>
              <div style={{ fontSize: 44, fontWeight: 900, color: C.violet, letterSpacing: -1 }}>{s.val}</div>
              <div style={{ fontSize: 13, color: C.muted, marginTop: 8, fontWeight: 500 }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURES — tabs */}
      <section ref={featRef} style={{ maxWidth: 1280, margin: "0 auto", padding: "120px 60px" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={featInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ display: "inline-block", background: "#ede9fe", color: C.violet, padding: "6px 18px", borderRadius: 50, fontSize: 12, fontWeight: 600, marginBottom: 20 }}>Fonctionnalités</div>
            <h2 style={{ fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 900, letterSpacing: -1.5, color: C.dark }}>Tout ce dont vous avez besoin.</h2>
          </div>
          {/* Tab buttons */}
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 60, background: "#f3f4f6", borderRadius: 50, padding: 6, width: "fit-content", margin: "0 auto 60px" }}>
            {FEATURES_TABS.map((t, i) => (
              <motion.button key={i} onClick={() => setActiveTab(i)}
                style={{ padding: "10px 28px", borderRadius: 50, border: "none", fontWeight: 600, fontSize: 14, cursor: "pointer", transition: "all 0.2s", background: activeTab === i ? C.violet : "transparent", color: activeTab === i ? "#fff" : C.muted }}>
                {t.label}
              </motion.button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
              <div>
                <h3 style={{ fontSize: "clamp(28px, 3vw, 44px)", fontWeight: 800, letterSpacing: -1, lineHeight: 1.2, marginBottom: 20, color: C.dark }}>
                  {FEATURES_TABS[activeTab].headline}
                </h3>
                <p style={{ fontSize: 17, color: C.muted, lineHeight: 1.75, marginBottom: 36 }}>{FEATURES_TABS[activeTab].body}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {FEATURES_TABS[activeTab].points.map((pt, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 20, height: 20, background: "#ede9fe", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: C.violet, fontWeight: 700 }}>✓</div>
                      <span style={{ fontSize: 15, color: C.dark, fontWeight: 500 }}>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ background: C.dark, borderRadius: 24, padding: 40, minHeight: 280, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ textAlign: "center", color: C.violet2, fontFamily: C.mono, fontSize: 13 }}>
                  [Aperçu {FEATURES_TABS[activeTab].label}]
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ background: C.dark, padding: "100px 60px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 900, letterSpacing: -1.5, color: "#fff", textAlign: "center", marginBottom: 64 }}>
            Ils ont repris le contrôle.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                style={{ background: "#1a1040", borderRadius: 20, padding: 36, border: "1px solid #2d2a4a" }}>
                <div style={{ fontSize: 32, color: C.violet, fontWeight: 900, marginBottom: 16 }}>"</div>
                <p style={{ fontSize: 15, color: "#c4b5fd", lineHeight: 1.75, marginBottom: 28 }}>{t.quote}</p>
                <div style={{ fontSize: 13, color: "#6b7280", fontWeight: 500 }}>— {t.name}<br /><span style={{ color: "#4a4670" }}>{t.role}</span></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section ref={pricingRef} style={{ maxWidth: 1280, margin: "0 auto", padding: "120px 60px" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <h2 style={{ fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 900, letterSpacing: -1.5, color: C.dark, marginBottom: 16 }}>
            Simple. Transparent. Juste.
          </h2>
          <p style={{ fontSize: 18, color: C.muted }}>Commencez gratuitement. Scalez quand vous êtes prêt.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {PLANS.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 40 }} animate={pricingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15 }}
              style={{ background: p.highlight ? C.violet : C.card, borderRadius: 24, padding: 40, border: p.highlight ? "none" : `1px solid ${C.border}`, boxShadow: p.highlight ? "0 20px 60px rgba(109,40,217,0.3)" : "none", transform: p.highlight ? "scale(1.04)" : "none" }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: p.highlight ? "rgba(255,255,255,0.7)" : C.muted, textTransform: "uppercase", marginBottom: 16 }}>{p.name}</div>
              <div style={{ fontSize: 48, fontWeight: 900, color: p.highlight ? "#fff" : C.dark, letterSpacing: -2, lineHeight: 1 }}>{p.price}</div>
              <div style={{ fontSize: 13, color: p.highlight ? "rgba(255,255,255,0.6)" : C.muted, marginBottom: 36, marginTop: 6 }}>{p.note}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 36 }}>
                {p.features.map((f, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: p.highlight ? "rgba(255,255,255,0.9)" : C.dark }}>
                    <span style={{ color: p.highlight ? "#c4b5fd" : C.violet, fontWeight: 700 }}>✓</span> {f}
                  </div>
                ))}
              </div>
              <motion.button whileHover={{ opacity: 0.9 }} whileTap={{ scale: 0.97 }}
                style={{ width: "100%", padding: "14px", background: p.highlight ? "#fff" : C.violet, color: p.highlight ? C.violet : "#fff", border: "none", borderRadius: 50, fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
                {p.price === "0 €" ? "Créer un compte" : "Commencer"}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: 800, margin: "0 auto", padding: "0 60px 120px" }}>
        <h2 style={{ fontSize: 40, fontWeight: 900, letterSpacing: -1.5, color: C.dark, marginBottom: 48, textAlign: "center" }}>Questions fréquentes</h2>
        {FAQS.map((f, i) => (
          <div key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
            <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
              style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "22px 0", background: "none", border: "none", color: C.dark, cursor: "pointer", textAlign: "left", fontSize: 16, fontWeight: 600 }}>
              {f.q}
              <motion.span animate={{ rotate: openFaq === i ? 45 : 0 }} style={{ fontSize: 22, color: C.violet, minWidth: 22 }}>+</motion.span>
            </button>
            <AnimatePresence>
              {openFaq === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                  <p style={{ paddingBottom: 22, fontSize: 15, color: C.muted, lineHeight: 1.75 }}>{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section style={{ background: C.violet, padding: "100px 60px", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(40px, 5vw, 72px)", fontWeight: 900, letterSpacing: -2, color: "#fff", marginBottom: 24 }}>
          Prêt à reprendre le contrôle ?
        </h2>
        <p style={{ fontSize: 18, color: "rgba(255,255,255,0.7)", marginBottom: 48 }}>Rejoignez 47 000 professionnels qui ont repris 2 heures par jour.</p>
        <motion.button whileHover={{ background: "#fff", color: C.violet }} whileTap={{ scale: 0.97 }}
          style={{ padding: "18px 48px", background: C.dark, color: "#fff", border: "2px solid transparent", borderRadius: 50, fontSize: 17, fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}>
          Commencer gratuitement — sans CB
        </motion.button>
      </section>

      {/* FOOTER */}
      <footer style={{ background: C.dark, padding: "60px 60px 40px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 60, marginBottom: 48 }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: C.violet2, marginBottom: 16 }}>Pulse</div>
            <div style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.8 }}>L'application de productivité qui s'adapte à votre façon de travailler.</div>
          </div>
          {[
            { title: "Produit", links: ["Fonctionnalités", "Tarifs", "Changelog", "Roadmap"] },
            { title: "Entreprise", links: ["À propos", "Blog", "Presse", "Carrières"] },
            { title: "Support", links: ["Documentation", "Status", "Contact", "RGPD"] },
          ].map((col, i) => (
            <div key={i}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "#4b5563", textTransform: "uppercase", marginBottom: 16 }}>{col.title}</div>
              {col.links.map(l => <div key={l} style={{ fontSize: 14, color: "#6b7280", marginBottom: 10 }}>{l}</div>)}
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid #1f2937", paddingTop: 24, fontSize: 13, color: "#374151", textAlign: "center" }}>
          © 2025 Pulse App — Tous droits réservés
        </div>
      </footer>
    </div>
  )
}
