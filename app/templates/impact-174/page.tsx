"use client"

import React, { useState, useRef } from "react"
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"

// FORGE GYM — Fitness & strength coaching. Dark almost-black + neon lime (#b5ff00), aggressive condensed type.
// Unique: full-height split hero, animated progress bars, intensity-based program cards.

const PROGRAMS = [
  { name: "FORGE STRENGTH", intensity: 5, sessions: "4×/semaine", goal: "Force & hypertrophie", desc: "Programme de musculation périodisé. Squat, bench, deadlift, assistance. Pour ceux qui veulent des résultats mesurables.", tag: "POPULAIRE", accent: "#b5ff00" },
  { name: "FORGE HIIT", intensity: 4, sessions: "3×/semaine", goal: "Cardio & endurance", desc: "Intervalles haute intensité, circuits fonctionnels. Brûle des calories encore 24h après la séance.", tag: null, accent: "#ff6b35" },
  { name: "FORGE ATHLETE", intensity: 5, sessions: "5×/semaine", goal: "Performance sportive", desc: "Programmation sport-spécifique. Travail explosif, mobilité, prévention blessures. Réservé niveaux avancés.", tag: "EXPERT", accent: "#00d4ff" },
  { name: "FORGE START", intensity: 2, sessions: "2×/semaine", goal: "Premiers pas", desc: "Découverte des fondamentaux. Technique parfaite avant tout. Accompagnement renforcé les 4 premières semaines.", tag: "DÉBUTANT", accent: "#a78bfa" },
]

const COACHES = [
  { name: "Maxime Durand", spec: "Force athlétique · Powerlifting", cert: "BPJEPS + CF-L2", exp: "8 ans", pr: "Squat 220kg" },
  { name: "Sarah Leclerc", spec: "HIIT · Nutrition sportive", cert: "BPJEPS + PN-L1", exp: "6 ans", pr: "Pull-ups 22 reps" },
  { name: "Antoine Moreau", spec: "Performance · Récupération", cert: "BPJEPS + NSCA-CSCS", exp: "11 ans", pr: "Ex-athlète national" },
]

const TESTIMONIALS = [
  { quote: "22 kg en 6 mois. Pas de magie — de la méthode et des coachs qui ne te laissent pas déconner avec ta technique.", name: "Romain, 34 ans", result: "+22 kg masse musculaire" },
  { quote: "Je m'entraînais depuis 5 ans sans progresser. Maxime a identifié mes erreurs en 1 semaine. Résultats en 1 mois.", name: "Julie, 28 ans", result: "Squat +40 kg en 3 mois" },
  { quote: "FORGE Athlete m'a préparé pour mes championnats régionaux. 3e place après 4 mois de programme. Incroyable.", name: "Thomas, 22 ans", result: "3e championnats régionaux" },
]

const PLANS = [
  { name: "ACCESS", price: "49 €", note: "/mois", features: ["Accès illimité salle", "Programme de base inclus", "1 bilan mensuel coach", "Application de suivi"] },
  { name: "COACHED", price: "129 €", note: "/mois", features: ["Tout ACCESS inclus", "Programme personnalisé", "4 séances coach/mois", "Nutrition de base", "Accès communauté FORGE"], highlight: true },
  { name: "ELITE", price: "299 €", note: "/mois", features: ["Tout COACHED inclus", "Coach dédié illimité", "Nutrition avancée", "Récupération & mobilité", "Accès hors horaires"] },
]

const FAQS = [
  { q: "Dois-je être déjà sportif pour rejoindre FORGE ?", a: "Non. Le programme FORGE START est conçu pour les débutants complets. Votre niveau actuel est notre point de départ, pas un obstacle." },
  { q: "Comment fonctionne l'abonnement ?", a: "Sans engagement minimum. Prélèvement mensuel. Résiliation à tout moment depuis votre espace membre, avant le 20 du mois." },
  { q: "Y a-t-il une période d'essai ?", a: "Oui — 7 jours gratuits, accès complet, aucune carte de crédit requise. Venez vous forger votre opinion." },
  { q: "Les coachs font-ils de la nutrition ?", a: "Oui, en formule COACHED et ELITE. Nos coachs sont certifiés en nutrition sportive de base. Pour les cas médicaux, nous orientons vers un diététicien partenaire." },
  { q: "Quels sont les horaires ?", a: "Lun–Ven 6h–23h · Sam 7h–21h · Dim 9h–18h. Accès badge 24/7 pour les membres ELITE." },
]

export default function Page() {
  const [activeProgram, setActiveProgram] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const { scrollY } = useScroll()

  const heroBgY = useTransform(scrollY, [0, 600], [0, 80])
  const heroTextY = useTransform(scrollY, [0, 600], [0, -40])

  const pricingRef = useRef(null)
  const pricingInView = useInView(pricingRef, { once: true, margin: "-100px" })

  const C = {
    bg: "#090909",
    lime: "#b5ff00",
    text: "#f0f0f0",
    muted: "#555",
    card: "#111",
    border: "#1a1a1a",
    sans: "system-ui, -apple-system, sans-serif",
  }

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: C.sans, overflowX: "hidden" }}>
      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(9,9,9,0.97)", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 60px", height: 56 }}>
        <div style={{ fontWeight: 900, fontSize: 22, letterSpacing: -1, color: C.lime }}>FORGE</div>
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {["Programmes", "Coachs", "Tarifs", "Essai"].map(l => (
            <a key={l} href="#" style={{ fontSize: 12, color: C.muted, letterSpacing: 2, textTransform: "uppercase", textDecoration: "none", transition: "color 0.15s" }}
              onMouseEnter={e => (e.currentTarget.style.color = C.lime)}
              onMouseLeave={e => (e.currentTarget.style.color = C.muted)}>
              {l}
            </a>
          ))}
          <motion.button whileHover={{ background: C.lime, color: C.bg }} whileTap={{ scale: 0.97 }}
            style={{ padding: "8px 24px", background: "transparent", color: C.lime, border: `2px solid ${C.lime}`, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", transition: "all 0.15s", fontFamily: C.sans, fontWeight: 700 }}>
            7j gratuits
          </motion.button>
        </div>
      </nav>

      {/* HERO — split left dark / right lime */}
      <section style={{ minHeight: "100vh", paddingTop: 56, display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <motion.div style={{ y: heroTextY, background: C.bg, padding: "80px 60px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div style={{ fontSize: 10, letterSpacing: 5, color: C.lime, textTransform: "uppercase", marginBottom: 32 }}>Lyon · Grenoble · En ligne</div>
            <h1 style={{ fontSize: "clamp(64px, 9vw, 130px)", fontWeight: 900, letterSpacing: "-3px", lineHeight: 0.88, textTransform: "uppercase", color: C.text, marginBottom: 48 }}>
              NE<br />CHERCHE<br />PAS<br /><span style={{ color: C.lime }}>FACILE.</span>
            </h1>
            <p style={{ fontSize: 17, color: C.muted, lineHeight: 1.7, marginBottom: 48, maxWidth: 420 }}>
              Programmes de force, HIIT, et coaching personnalisé. Pour ceux qui savent que la progression est un choix quotidien.
            </p>
            <div style={{ display: "flex", gap: 16 }}>
              <motion.button whileHover={{ background: "#a0e600" }} whileTap={{ scale: 0.97 }}
                style={{ padding: "18px 40px", background: C.lime, color: C.bg, border: "none", fontWeight: 900, fontSize: 14, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s", fontFamily: C.sans }}>
                7 jours gratuits
              </motion.button>
              <motion.button whileHover={{ borderColor: C.lime, color: C.lime }} whileTap={{ scale: 0.97 }}
                style={{ padding: "18px 40px", background: "transparent", color: C.muted, border: `2px solid ${C.border}`, fontWeight: 700, fontSize: 14, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s", fontFamily: C.sans }}>
                Voir les programmes
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Right lime panel */}
        <motion.div style={{ y: heroBgY, background: C.lime, padding: "80px 60px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ fontSize: 10, letterSpacing: 5, color: "rgba(0,0,0,0.5)", textTransform: "uppercase" }}>Stats membres actifs</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {[{ label: "Transformations documentées", val: "1 240+" }, { label: "Séances délivrées en 2024", val: "48 000" }, { label: "Note Google (847 avis)", val: "4.94 ★" }].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.15 }}>
                <div style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 900, color: C.bg, letterSpacing: -2, lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontSize: 12, color: "rgba(0,0,0,0.5)", letterSpacing: 1, marginTop: 4 }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
          <div style={{ fontSize: 11, color: "rgba(0,0,0,0.4)", letterSpacing: 2, textTransform: "uppercase" }}>Fondé en 2018 · Certifié BPJEPS</div>
        </motion.div>
      </section>

      {/* PROGRAMS */}
      <section style={{ padding: "80px 60px", borderTop: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
          <h2 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 900, letterSpacing: -2, textTransform: "uppercase", lineHeight: 1 }}>PROGRAMMES</h2>
          <div style={{ display: "flex", gap: 8 }}>
            {PROGRAMS.map((p, i) => (
              <button key={i} onClick={() => setActiveProgram(i)}
                style={{ padding: "6px 16px", background: activeProgram === i ? p.accent : "transparent", color: activeProgram === i ? C.bg : C.muted, border: `1px solid ${activeProgram === i ? p.accent : C.border}`, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", transition: "all 0.15s", fontFamily: C.sans, fontWeight: 700 }}>
                0{i + 1}
              </button>
            ))}
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={activeProgram} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}
            style={{ border: `2px solid ${PROGRAMS[activeProgram].accent}`, padding: "56px 60px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 24 }}>
                {PROGRAMS[activeProgram].tag && (
                  <span style={{ padding: "4px 12px", background: PROGRAMS[activeProgram].accent, color: C.bg, fontSize: 10, fontWeight: 900, letterSpacing: 2 }}>{PROGRAMS[activeProgram].tag}</span>
                )}
                <span style={{ fontSize: 11, color: C.muted, letterSpacing: 2 }}>{PROGRAMS[activeProgram].sessions} · {PROGRAMS[activeProgram].goal}</span>
              </div>
              <h3 style={{ fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 900, letterSpacing: -1, textTransform: "uppercase", color: C.text, marginBottom: 20 }}>{PROGRAMS[activeProgram].name}</h3>
              <p style={{ fontSize: 16, color: C.muted, lineHeight: 1.75, marginBottom: 36 }}>{PROGRAMS[activeProgram].desc}</p>
              <motion.button whileHover={{ background: PROGRAMS[activeProgram].accent, color: C.bg }} whileTap={{ scale: 0.97 }}
                style={{ padding: "14px 32px", background: "transparent", color: PROGRAMS[activeProgram].accent, border: `2px solid ${PROGRAMS[activeProgram].accent}`, fontWeight: 900, fontSize: 13, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s", fontFamily: C.sans }}>
                Commencer ce programme
              </motion.button>
            </div>
            <div>
              <div style={{ fontSize: 11, color: C.muted, letterSpacing: 3, textTransform: "uppercase", marginBottom: 28 }}>Intensité</div>
              {["Force", "Cardio", "Technique", "Récupération"].map((dim, j) => {
                const vals = [[5, 2, 4, 2], [2, 5, 2, 3], [5, 4, 5, 4], [1, 2, 2, 4]]
                const val = vals[activeProgram][j]
                return (
                  <div key={dim} style={{ marginBottom: 20 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 12, color: C.muted }}>
                      <span>{dim}</span><span style={{ color: PROGRAMS[activeProgram].accent }}>{val}/5</span>
                    </div>
                    <div style={{ height: 4, background: C.border }}>
                      <motion.div initial={{ width: 0 }} animate={{ width: `${(val / 5) * 100}%` }} transition={{ duration: 0.8, ease: "easeOut" }}
                        style={{ height: "100%", background: PROGRAMS[activeProgram].accent }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* COACHES */}
      <section style={{ padding: "80px 60px", borderTop: `1px solid ${C.border}` }}>
        <h2 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 900, letterSpacing: -2, textTransform: "uppercase", marginBottom: 48, lineHeight: 1 }}>LES COACHS</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {COACHES.map((c, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              whileHover={{ borderColor: C.lime }}
              style={{ border: `1px solid ${C.border}`, padding: "40px", transition: "border-color 0.2s", cursor: "pointer" }}>
              <div style={{ width: 60, height: 60, background: C.lime + "22", border: `2px solid ${C.lime}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 900, color: C.lime, marginBottom: 24 }}>
                {c.name.split(" ").map(w => w[0]).join("")}
              </div>
              <div style={{ fontSize: 18, fontWeight: 800, color: C.text, marginBottom: 4, letterSpacing: -0.3 }}>{c.name}</div>
              <div style={{ fontSize: 13, color: C.lime, marginBottom: 16, letterSpacing: 0.5 }}>{c.spec}</div>
              <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.7 }}>
                {c.cert}<br />{c.exp} d'expérience<br />Record : {c.pr}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "80px 60px", background: "#050505", borderTop: `1px solid ${C.border}` }}>
        <h2 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 900, letterSpacing: -2, textTransform: "uppercase", marginBottom: 56, lineHeight: 1, color: C.lime }}>RÉSULTATS RÉELS</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
              style={{ background: C.card, border: `1px solid ${C.border}`, padding: "36px" }}>
              <div style={{ fontSize: 11, fontWeight: 900, color: C.lime, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>{t.result}</div>
              <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.75, marginBottom: 24 }}>« {t.quote} »</p>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{t.name}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section ref={pricingRef} style={{ padding: "80px 60px", borderTop: `1px solid ${C.border}` }}>
        <h2 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 900, letterSpacing: -2, textTransform: "uppercase", marginBottom: 56, lineHeight: 1 }}>ABONNEMENTS</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {PLANS.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 36 }} animate={pricingInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.15 }}
              style={{ background: p.highlight ? "#0f1a00" : C.card, border: `2px solid ${p.highlight ? C.lime : C.border}`, padding: "48px 40px", position: "relative" }}>
              {p.highlight && <div style={{ position: "absolute", top: -2, left: 0, right: 0, height: 3, background: C.lime }} />}
              <div style={{ fontSize: 11, color: p.highlight ? C.lime : C.muted, letterSpacing: 4, textTransform: "uppercase", marginBottom: 20 }}>{p.name}</div>
              <div style={{ fontSize: 48, fontWeight: 900, color: C.text, letterSpacing: -2, lineHeight: 1, marginBottom: 4 }}>{p.price}</div>
              <div style={{ fontSize: 13, color: C.muted, marginBottom: 36 }}>{p.note}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 40 }}>
                {p.features.map((f, j) => (
                  <div key={j} style={{ display: "flex", gap: 10, fontSize: 13, color: p.highlight ? "rgba(240,240,240,0.8)" : C.muted, alignItems: "flex-start" }}>
                    <span style={{ color: C.lime, fontWeight: 900, marginTop: 1 }}>→</span> {f}
                  </div>
                ))}
              </div>
              <motion.button whileHover={{ background: C.lime, color: C.bg, borderColor: C.lime }} whileTap={{ scale: 0.97 }}
                style={{ width: "100%", padding: "16px", background: p.highlight ? C.lime : "transparent", color: p.highlight ? C.bg : C.lime, border: `2px solid ${p.highlight ? C.lime : C.border}`, fontWeight: 900, fontSize: 13, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s", fontFamily: C.sans }}>
                Commencer
              </motion.button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: 800, margin: "0 auto", padding: "0 60px 80px" }}>
        <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 900, letterSpacing: -2, textTransform: "uppercase", marginBottom: 48 }}>FAQ</h2>
        {FAQS.map((f, i) => (
          <div key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
            <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
              style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 0", background: "none", border: "none", color: C.text, cursor: "pointer", textAlign: "left" }}>
              <span style={{ fontSize: 15, fontWeight: 700 }}>{f.q}</span>
              <motion.span animate={{ rotate: openFaq === i ? 45 : 0 }} style={{ fontSize: 24, color: C.lime, minWidth: 24 }}>+</motion.span>
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

      {/* CTA */}
      <section style={{ background: C.lime, padding: "80px 60px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ fontSize: "clamp(48px, 7vw, 96px)", fontWeight: 900, letterSpacing: -3, textTransform: "uppercase", color: C.bg, lineHeight: 0.92 }}>
          7 JOURS.<br />GRATUIT.<br />SANS BS.
        </h2>
        <div>
          <div style={{ fontSize: 18, color: "rgba(0,0,0,0.5)", marginBottom: 24 }}>Commencez maintenant. Annulez à tout moment.</div>
          <div style={{ display: "flex", gap: 0 }}>
            <input placeholder="Email" style={{ padding: "18px 24px", background: "rgba(0,0,0,0.1)", border: "2px solid rgba(0,0,0,0.2)", color: C.bg, fontSize: 15, outline: "none", minWidth: 260, fontFamily: C.sans }} />
            <motion.button whileHover={{ background: C.bg, color: C.lime }} whileTap={{ scale: 0.97 }}
              style={{ padding: "18px 32px", background: C.bg, color: C.lime, border: "none", fontWeight: 900, fontSize: 14, letterSpacing: 1, textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s", fontFamily: C.sans }}>
              GO →
            </motion.button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: C.bg, padding: "36px 60px", borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 20, fontWeight: 900, color: C.lime }}>FORGE</div>
        <div style={{ fontSize: 12, color: C.muted }}>© 2025 · Lyon & Grenoble · Mentions légales</div>
      </footer>
    </div>
  )
}
