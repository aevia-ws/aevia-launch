"use client"

import React, { useState, useRef } from "react"
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"

// LEGRAND & ASSOCIÉS — Law firm. Dark charcoal + gold, authoritative serif, formal column layout.
// Unique: sticky numbered sections, diagonal gold dividers, dense editorial feel.

const PRACTICES = [
  { num: "I", name: "Droit des Affaires", desc: "Fusions-acquisitions, due diligence, pactes d'associés, cessions de fonds de commerce. Conseils aux PME et ETI.", scope: ["M&A", "Contrats", "Sociétés", "Gouvernance"] },
  { num: "II", name: "Droit Social & RH", desc: "Relations individuelles et collectives, licenciements, accords d'entreprise, contentieux prud'homal.", scope: ["Licenciement", "CSE", "Accords", "Contentieux"] },
  { num: "III", name: "Droit Immobilier", desc: "Baux commerciaux, VEFA, copropriété, contentieux locatif, due diligence immobilière.", scope: ["Baux", "VEFA", "Copro", "Contentieux"] },
  { num: "IV", name: "Propriété Intellectuelle", desc: "Marques, brevets, droits d'auteur, contrats de licence, cybersécurité et protection des données.", scope: ["Marques", "Brevets", "RGPD", "Licences"] },
]

const ASSOCIATES = [
  { name: "Maître Henri Legrand", title: "Associé fondateur", bar: "Barreau de Paris", exp: "28 ans", spec: "Droit des affaires, M&A" },
  { name: "Maître Sophie Aubert", title: "Associée senior", bar: "Barreau de Lyon", exp: "16 ans", spec: "Droit social, RH" },
  { name: "Maître Thomas Villiers", title: "Collaborateur senior", bar: "Barreau de Paris", exp: "9 ans", spec: "Immobilier, Copropriété" },
]

const TESTIMONIALS = [
  { quote: "Legrand & Associés a géré l'acquisition de notre concurrent en 6 semaines. Une rigueur et une réactivité que je n'avais jamais vues.", name: "Laurent Bonneau", role: "PDG, Groupe Bonneau Industries" },
  { quote: "Nous avons fait face à un contentieux prud'homal complexe. Le cabinet a obtenu le classement de l'affaire en première instance.", name: "Isabelle Roux", role: "DRH, Retail Group SA" },
  { quote: "La rédaction de nos contrats de licence internationale est d'une précision qui nous protège efficacement depuis 5 ans.", name: "Marc Duhamel", role: "Directeur Juridique, SaaS Corp." },
]

const FAQS = [
  { q: "Comment se déroule une première consultation ?", a: "Consultation initiale de 45 minutes (250 € HT). Analyse de votre dossier, premier avis juridique et présentation de notre proposition d'honoraires." },
  { q: "Quels sont vos modes de facturation ?", a: "Honoraires au taux horaire (250–450 € HT/h selon l'avocat), forfait pour les actes standards, ou abonnement mensuel pour les entreprises en besoin récurrent." },
  { q: "Intervenez-vous en dehors de Paris et Lyon ?", a: "Oui, France entière. Présence physique à Paris (8e) et Lyon (2e). Audiences devant toutes les juridictions françaises." },
  { q: "Proposez-vous un abonnement pour les entreprises ?", a: "Oui — formule Conseil Permanent : accès illimité aux avis juridiques, revue mensuelle des contrats, alerte légale mensuelle. À partir de 1 500 € HT/mois." },
  { q: "Quel délai pour obtenir un avis juridique ?", a: "Avis express sous 48h (majoration 30%). Avis standard sous 5 jours ouvrés. Urgences traitées le jour même sur accord préalable." },
]

const PLANS = [
  { name: "Ponctuel", price: "Taux horaire", note: "250–450 € HT/h", features: ["Consultation initiale 45 min", "Rédaction d'actes à l'acte", "Représentation en justice", "Avis juridiques circonstanciés"] },
  { name: "Conseil Permanent", price: "À partir de 1 500 €", note: "HT / mois", features: ["Avis juridiques illimités", "Revue mensuelle des contrats", "Veille légale et alertes", "Interlocuteur dédié", "Tarif préférentiel contentieux"], highlight: true },
  { name: "Sur Mesure", price: "Forfait", note: "à définir ensemble", features: ["Due diligence M&A", "Projets complexes multi-phases", "Équipe dédiée", "Reporting régulier dirigeants"] },
]

export default function Page() {
  const [activePractice, setActivePractice] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const { scrollY } = useScroll()

  const heroTitleY = useTransform(scrollY, [0, 500], [0, -50])

  const assocRef = useRef(null)
  const pricingRef = useRef(null)
  const assocInView = useInView(assocRef, { once: true, margin: "-100px" })
  const pricingInView = useInView(pricingRef, { once: true, margin: "-100px" })

  const C = {
    bg: "#0f0e0c",
    cream: "#f0ece4",
    gold: "#c4a96a",
    goldDim: "#8a7245",
    text: "#e8e4dc",
    muted: "#6b6454",
    card: "#141210",
    border: "#1f1c18",
    serif: "'Cormorant Garamond', 'Garamond', Georgia, serif",
    sans: "system-ui, -apple-system, sans-serif",
  }

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: C.sans, overflowX: "hidden" }}>
      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(15,14,12,0.97)", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 60px", height: 64 }}>
        <div>
          <div style={{ fontFamily: C.serif, fontSize: 17, letterSpacing: 2, color: C.gold, fontStyle: "italic" }}>Legrand & Associés</div>
          <div style={{ fontSize: 9, letterSpacing: 4, color: C.muted, textTransform: "uppercase" }}>Avocats · Paris · Lyon</div>
        </div>
        <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
          {["Expertises", "Équipe", "Honoraires", "Contact"].map(l => (
            <a key={l} href="#" style={{ fontSize: 11, color: C.muted, letterSpacing: 3, textTransform: "uppercase", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = C.gold)}
              onMouseLeave={e => (e.currentTarget.style.color = C.muted)}>
              {l}
            </a>
          ))}
          <motion.button whileHover={{ background: C.gold, color: C.bg }} whileTap={{ scale: 0.97 }}
            style={{ padding: "10px 24px", background: "transparent", color: C.gold, border: `1px solid ${C.gold}`, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s", fontFamily: C.sans }}>
            Consultation
          </motion.button>
        </div>
      </nav>

      {/* HERO — full width, left-heavy editorial */}
      <section style={{ minHeight: "100vh", paddingTop: 64, display: "grid", gridTemplateColumns: "3fr 2fr" }}>
        <motion.div style={{ y: heroTitleY, padding: "100px 80px", display: "flex", flexDirection: "column", justifyContent: "flex-end", borderRight: `1px solid ${C.border}` }}>
          <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }}>
            <div style={{ fontFamily: C.serif, fontSize: 11, letterSpacing: 6, color: C.gold, textTransform: "uppercase", marginBottom: 48 }}>
              Fondé en 1997 · Barreau de Paris
            </div>
            <h1 style={{ fontFamily: C.serif, fontSize: "clamp(60px, 9vw, 140px)", fontWeight: 400, letterSpacing: "-2px", lineHeight: 0.92, color: C.cream, fontStyle: "italic", marginBottom: 56 }}>
              La loi<br />
              comme<br />
              <span style={{ color: C.gold }}>bouclier.</span>
            </h1>
            <div style={{ display: "flex", gap: 48, alignItems: "center" }}>
              <motion.button whileHover={{ background: C.cream, color: C.bg }} whileTap={{ scale: 0.97 }}
                style={{ padding: "18px 48px", background: C.gold, color: C.bg, border: "none", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", fontFamily: C.sans, fontWeight: 600, transition: "all 0.25s" }}>
                Prendre rendez-vous
              </motion.button>
              <div style={{ fontFamily: C.serif, fontSize: 14, color: C.muted, fontStyle: "italic" }}>
                Première consultation · 250 € HT
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right column — vertical list */}
        <div style={{ padding: "100px 60px", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 40 }}>
          {[
            { val: "28", label: "années d'exercice" },
            { val: "1 400+", label: "dossiers traités" },
            { val: "94%", label: "taux de succès contentieux" },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.15 }}
              style={{ borderLeft: `2px solid ${C.gold}`, paddingLeft: 28 }}>
              <div style={{ fontFamily: C.serif, fontSize: 52, fontStyle: "italic", color: C.gold, lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontSize: 12, color: C.muted, letterSpacing: 2, textTransform: "uppercase", marginTop: 6 }}>{s.label}</div>
            </motion.div>
          ))}
          <div style={{ width: "100%", height: 1, background: C.border, marginTop: 20 }} />
          <div style={{ fontFamily: C.serif, fontSize: 14, color: C.muted, fontStyle: "italic", lineHeight: 1.7 }}>
            "La précision du droit est notre première obligation envers le client."<br />
            — Maître Henri Legrand
          </div>
        </div>
      </section>

      {/* PRACTICES */}
      <section style={{ borderTop: `1px solid ${C.border}` }}>
        <div style={{ padding: "80px 60px 0", display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
          <h2 style={{ fontFamily: C.serif, fontSize: "clamp(36px, 4vw, 56px)", fontStyle: "italic", fontWeight: 400, color: C.cream }}>Domaines d'expertise</h2>
          <span style={{ fontSize: 11, color: C.muted, letterSpacing: 3, textTransform: "uppercase" }}>4 pôles</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr" }}>
          <div style={{ borderRight: `1px solid ${C.border}` }}>
            {PRACTICES.map((p, i) => (
              <button key={i} onClick={() => setActivePractice(i)}
                style={{ width: "100%", display: "flex", alignItems: "center", gap: 20, padding: "28px 40px", background: activePractice === i ? C.card : "transparent", borderBottom: `1px solid ${C.border}`, borderLeft: activePractice === i ? `3px solid ${C.gold}` : "3px solid transparent", cursor: "pointer", textAlign: "left", transition: "all 0.2s", border: "none" }}>
                <span style={{ fontFamily: C.serif, fontSize: 18, fontStyle: "italic", color: C.gold, minWidth: 20 }}>{p.num}</span>
                <span style={{ fontSize: 14, color: activePractice === i ? C.cream : C.muted, fontWeight: activePractice === i ? 600 : 400, transition: "color 0.2s" }}>{p.name}</span>
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={activePractice} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
              style={{ padding: "60px 80px" }}>
              <div style={{ fontFamily: C.serif, fontSize: 11, letterSpacing: 5, color: C.gold, textTransform: "uppercase", marginBottom: 20 }}>Pôle {PRACTICES[activePractice].num}</div>
              <h3 style={{ fontFamily: C.serif, fontSize: "clamp(32px, 4vw, 52px)", fontStyle: "italic", fontWeight: 400, color: C.cream, marginBottom: 24, letterSpacing: -1 }}>{PRACTICES[activePractice].name}</h3>
              <p style={{ fontSize: 16, color: C.muted, lineHeight: 1.85, marginBottom: 40, maxWidth: 560 }}>{PRACTICES[activePractice].desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 48 }}>
                {PRACTICES[activePractice].scope.map(s => (
                  <span key={s} style={{ padding: "6px 16px", border: `1px solid ${C.gold}40`, fontSize: 12, color: C.gold, letterSpacing: 1 }}>{s}</span>
                ))}
              </div>
              <motion.button whileHover={{ background: C.gold, color: C.bg }} whileTap={{ scale: 0.97 }}
                style={{ padding: "14px 32px", background: "transparent", color: C.gold, border: `1px solid ${C.gold}`, fontSize: 11, letterSpacing: 3, textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s", fontFamily: C.sans }}>
                Consulter un avocat →
              </motion.button>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ASSOCIATES */}
      <section ref={assocRef} style={{ padding: "80px 60px", borderTop: `1px solid ${C.border}` }}>
        <h2 style={{ fontFamily: C.serif, fontSize: "clamp(36px, 4vw, 56px)", fontStyle: "italic", fontWeight: 400, color: C.cream, marginBottom: 56 }}>L'équipe.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
          {ASSOCIATES.map((a, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={assocInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.15 }}
              style={{ border: `1px solid ${C.border}`, padding: "48px 40px", position: "relative" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: C.gold, opacity: 0.4 }} />
              <div style={{ width: 56, height: 56, background: C.card, border: `1px solid ${C.gold}40`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: C.serif, fontSize: 20, fontStyle: "italic", color: C.gold, marginBottom: 28 }}>
                {a.name.split(" ").filter(w => w.length > 2).slice(0, 2).map(w => w[0]).join("")}
              </div>
              <div style={{ fontFamily: C.serif, fontSize: 20, fontStyle: "italic", color: C.cream, marginBottom: 6 }}>{a.name}</div>
              <div style={{ fontSize: 12, color: C.gold, letterSpacing: 1, marginBottom: 16 }}>{a.title}</div>
              <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.7 }}>
                {a.bar} · {a.exp} d'exercice<br />{a.spec}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "80px 60px", borderTop: `1px solid ${C.border}`, background: "#0a0908" }}>
        <h2 style={{ fontFamily: C.serif, fontSize: "clamp(36px, 4vw, 56px)", fontStyle: "italic", fontWeight: 400, color: C.cream, textAlign: "center", marginBottom: 64 }}>Ils nous font confiance.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40, maxWidth: 1280, margin: "0 auto" }}>
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
              <div style={{ fontFamily: C.serif, fontSize: 48, color: C.gold, lineHeight: 0.8, marginBottom: 24, fontStyle: "italic" }}>"</div>
              <p style={{ fontFamily: C.serif, fontSize: 17, fontStyle: "italic", color: "rgba(232,228,220,0.7)", lineHeight: 1.8, marginBottom: 28 }}>{t.quote}</p>
              <div style={{ width: 32, height: 1, background: C.gold, marginBottom: 16 }} />
              <div style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>{t.name}<br /><span style={{ color: C.goldDim }}>{t.role}</span></div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section ref={pricingRef} style={{ borderTop: `1px solid ${C.border}` }}>
        <div style={{ padding: "80px 60px 56px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <h2 style={{ fontFamily: C.serif, fontSize: "clamp(36px, 4vw, 56px)", fontStyle: "italic", fontWeight: 400, color: C.cream }}>Honoraires</h2>
          <div style={{ fontSize: 11, color: C.muted, letterSpacing: 3, textTransform: "uppercase" }}>Transparents & justifiés</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", borderTop: `1px solid ${C.border}` }}>
          {PLANS.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={pricingInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.15 }}
              style={{ borderRight: i < 2 ? `1px solid ${C.border}` : undefined, padding: "56px 48px", background: p.highlight ? "#141008" : "transparent", position: "relative" }}>
              {p.highlight && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: C.gold }} />}
              <div style={{ fontSize: 10, letterSpacing: 4, color: p.highlight ? C.gold : C.muted, textTransform: "uppercase", marginBottom: 24 }}>{p.name}</div>
              <div style={{ fontFamily: C.serif, fontSize: 36, fontStyle: "italic", color: C.cream, marginBottom: 4, lineHeight: 1 }}>{p.price}</div>
              <div style={{ fontSize: 12, color: C.muted, marginBottom: 40 }}>{p.note}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 44 }}>
                {p.features.map((f, j) => (
                  <div key={j} style={{ display: "flex", gap: 10, fontSize: 13, color: p.highlight ? "rgba(232,228,220,0.7)" : C.muted, alignItems: "flex-start" }}>
                    <span style={{ color: C.gold, marginTop: 1 }}>—</span> {f}
                  </div>
                ))}
              </div>
              <motion.button whileHover={{ background: C.gold, color: C.bg, borderColor: C.gold }} whileTap={{ scale: 0.97 }}
                style={{ width: "100%", padding: "14px", background: "transparent", color: p.highlight ? C.gold : C.muted, border: `1px solid ${p.highlight ? C.gold : C.border}`, fontSize: 11, letterSpacing: 3, textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s", fontFamily: C.sans }}>
                Nous contacter
              </motion.button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: 800, margin: "0 auto", padding: "80px 60px", borderTop: `1px solid ${C.border}` }}>
        <h2 style={{ fontFamily: C.serif, fontSize: 48, fontStyle: "italic", fontWeight: 400, color: C.cream, marginBottom: 48 }}>Questions.</h2>
        {FAQS.map((f, i) => (
          <div key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
            <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
              style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 0", background: "none", border: "none", color: C.text, cursor: "pointer", textAlign: "left" }}>
              <span style={{ fontFamily: C.serif, fontSize: 17, fontStyle: "italic", color: C.cream }}>{f.q}</span>
              <motion.span animate={{ rotate: openFaq === i ? 45 : 0 }} style={{ fontSize: 22, color: C.gold, minWidth: 22 }}>+</motion.span>
            </button>
            <AnimatePresence>
              {openFaq === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                  <p style={{ paddingBottom: 24, fontSize: 14, color: C.muted, lineHeight: 1.85 }}>{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section style={{ background: "#0a0908", borderTop: `1px solid ${C.border}`, display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <div style={{ borderRight: `1px solid ${C.border}`, padding: "80px 80px" }}>
          <h2 style={{ fontFamily: C.serif, fontSize: "clamp(40px, 6vw, 80px)", fontStyle: "italic", fontWeight: 300, color: C.cream, lineHeight: 1.05, marginBottom: 32 }}>
            Votre dossier<br />mérite les<br /><span style={{ color: C.gold }}>meilleurs.</span>
          </h2>
          <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.8 }}>Cabinet Legrand & Associés<br />12 rue du Faubourg Saint-Honoré, Paris 8e<br />+33 1 XX XX XX XX</div>
        </div>
        <div style={{ padding: "80px 60px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 16 }}>
          {[{ ph: "Nom & Prénom", type: "text" }, { ph: "Email professionnel", type: "email" }, { ph: "Société / Organisation", type: "text" }].map((inp, i) => (
            <input key={i} placeholder={inp.ph} type={inp.type}
              style={{ padding: "16px 20px", background: C.card, border: `1px solid ${C.border}`, color: C.text, fontFamily: C.sans, fontSize: 14, outline: "none", transition: "border-color 0.2s" }}
              onFocus={e => (e.currentTarget.style.borderColor = C.gold)}
              onBlur={e => (e.currentTarget.style.borderColor = C.border)} />
          ))}
          <textarea placeholder="Décrivez brièvement votre situation juridique…" rows={4}
            style={{ padding: "16px 20px", background: C.card, border: `1px solid ${C.border}`, color: C.text, fontFamily: C.sans, fontSize: 14, outline: "none", resize: "none", transition: "border-color 0.2s" }}
            onFocus={e => (e.currentTarget.style.borderColor = C.gold)}
            onBlur={e => (e.currentTarget.style.borderColor = C.border)} />
          <motion.button whileHover={{ background: C.cream, color: C.bg, borderColor: C.cream }} whileTap={{ scale: 0.97 }}
            style={{ padding: "16px", background: C.gold, color: C.bg, border: `1px solid ${C.gold}`, fontSize: 12, letterSpacing: 3, textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s", fontFamily: C.sans, fontWeight: 700 }}>
            Demander une consultation
          </motion.button>
          <div style={{ fontSize: 11, color: C.muted, textAlign: "center" }}>Première consultation · 250 € HT · Réponse sous 24h</div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "36px 60px", borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontFamily: C.serif, fontSize: 15, fontStyle: "italic", color: C.goldDim }}>Legrand & Associés</div>
        <div style={{ fontSize: 11, color: C.muted, letterSpacing: 2 }}>© 2025 · Barreaux de Paris et Lyon · Mentions légales · RGPD</div>
      </footer>
    </div>
  )
}
