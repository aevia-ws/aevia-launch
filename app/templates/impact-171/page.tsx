"use client"

import React, { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"

// VITALITÉ MÉDICAL — Health clinic. Light mode, teal accent, clean trustworthy layout.
// Unique: floating card hero with doctor credentials, specialty tabs, appointment booking CTA.

const SPECIALTIES = [
  { label: "Médecine Générale", desc: "Consultations, bilans annuels, suivi chronique, prescriptions. Prise en charge Sécu 100%.", duration: "20 min", price: "Secteur 1 · 26 €" },
  { label: "Cardiologie", desc: "ECG, holter, écho doppler, suivi tensionnel. Cardiologue diplômé de Paris VI.", duration: "45 min", price: "Secteur 2 · 80 €" },
  { label: "Dermatologie", desc: "Consultations acné, eczéma, psoriasis, naevi. Cryothérapie en cabinet.", duration: "30 min", price: "Secteur 2 · 65 €" },
  { label: "Nutrition", desc: "Bilan nutritionnel, plan alimentaire personnalisé, suivi mensuel inclus.", duration: "60 min", price: "Non remboursé · 90 €" },
]

const DOCTORS = [
  { name: "Dr. Claire Moreau", title: "Médecin généraliste", exp: "18 ans", univ: "Faculté Paris V", initials: "CM", accent: "#0d9488" },
  { name: "Dr. Antoine Berger", title: "Cardiologue", exp: "12 ans", univ: "Faculté Paris VI", initials: "AB", accent: "#6366f1" },
  { name: "Dr. Sophie Renaud", title: "Dermatologue", exp: "9 ans", univ: "Faculté Lyon I", initials: "SR", accent: "#f59e0b" },
]

const TESTIMONIALS = [
  { quote: "Enfin un cabinet qui répond le jour même et qui ne vous fait pas attendre 45 min en salle d'attente. Révolutionnaire.", name: "Pierre M.", service: "Médecine générale" },
  { quote: "Dr. Berger m'a diagnostiqué une arythmie que mon cardiologue précédent avait manquée pendant 3 ans.", name: "Marie-Hélène F.", service: "Cardiologie" },
  { quote: "Le suivi nutritionnel a changé ma vie. 14 kg en 8 mois, sans régime draconien.", name: "Thomas L.", service: "Nutrition" },
]

const FAQS = [
  { q: "Prenez-vous les nouveaux patients ?", a: "Oui — en médecine générale et nutrition. Cardiologie et dermatologie sur liste d'attente (2–4 semaines)." },
  { q: "Les consultations sont-elles remboursées ?", a: "Médecine générale secteur 1 : 100% Sécu. Cardiologie et dermatologie secteur 2 : remboursement partiel selon mutuelle." },
  { q: "Proposez-vous des consultations en ligne ?", a: "Oui — téléconsultation disponible pour les patients déjà suivis au cabinet. Via la plateforme sécurisée Doctolib." },
  { q: "Quelle est votre politique de rendez-vous urgents ?", a: "Créneaux urgents réservés chaque matin de 8h à 9h. Pas de tri téléphonique pour les urgences réelles." },
  { q: "Y a-t-il un parking ?", a: "Oui — parking gratuit 2h juste en face du cabinet. Accès PMR par l'entrée latérale rue Lamartine." },
]

const PLANS = [
  { name: "Ponctuel", price: "Acte unique", note: "sans engagement", features: ["Consultation classique", "Ordonnance e-prescrite", "Compte-rendu PDF 48h", "Prise en charge habituelle"] },
  { name: "Suivi Annuel", price: "149 €/an", note: "sans CB à chaque visite", features: ["Bilan santé annuel complet", "Accès prioritaire créneaux", "Consultation téléphonique incluse", "Carnet de santé numérique", "Rappels préventifs personnalisés"], highlight: true },
  { name: "Famille", price: "299 €/an", note: "jusqu'à 4 personnes", features: ["Tout Suivi Annuel ×4", "Pédiatre en réseau", "Urgences nuit coordinées", "Dossier famille centralisé"] },
]

export default function Page() {
  const [activeSpec, setActiveSpec] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const statsRef = useRef(null)
  const pricingRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" })
  const pricingInView = useInView(pricingRef, { once: true, margin: "-100px" })

  const C = {
    bg: "#f8fffe",
    teal: "#0d9488",
    tealLight: "#ccfbf1",
    text: "#0f2820",
    muted: "#6b7280",
    card: "#ffffff",
    border: "#e2f0ee",
    sans: "system-ui, -apple-system, sans-serif",
    serif: "'Cormorant Garamond', Georgia, serif",
  }

  const STATS = [
    { val: "4 200+", label: "Patients suivis" },
    { val: "48h", label: "Délai moyen RDV" },
    { val: "97%", label: "Satisfaction patients" },
    { val: "2009", label: "Ouverture du cabinet" },
  ]

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: C.sans, overflowX: "hidden" }}>
      {/* NAV */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(248,255,254,0.95)", backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${C.border}`,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 60px", height: 68,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, background: C.teal, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: C.text, letterSpacing: -0.3 }}>Vitalité Médical</div>
            <div style={{ fontSize: 10, color: C.muted, letterSpacing: 1 }}>Cabinet pluridisciplinaire</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
          {["Spécialités", "Médecins", "Tarifs", "Contact"].map(l => (
            <a key={l} href="#" style={{ fontSize: 14, color: C.muted, textDecoration: "none", fontWeight: 500 }}>{l}</a>
          ))}
          <motion.a href="tel:+33123456789" whileHover={{ background: "#0a7a70" }} whileTap={{ scale: 0.97 }}
            style={{ padding: "10px 24px", background: C.teal, color: "#fff", borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.9 1.18 2 2 0 012.88 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            Prendre RDV
          </motion.a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 60px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center", minHeight: "calc(100vh - 68px)" }}>
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: C.tealLight, color: C.teal, padding: "6px 16px", borderRadius: 50, fontSize: 12, fontWeight: 600, marginBottom: 32 }}>
            <div style={{ width: 6, height: 6, background: C.teal, borderRadius: "50%" }} /> Cabinet ouvert — RDV disponibles
          </div>
          <h1 style={{ fontSize: "clamp(44px, 5.5vw, 72px)", fontWeight: 800, letterSpacing: -2, lineHeight: 1.05, marginBottom: 24, color: C.text }}>
            Votre santé,<br />
            <span style={{ color: C.teal }}>prise en charge</span><br />
            avec soin.
          </h1>
          <p style={{ fontSize: 18, color: C.muted, lineHeight: 1.75, marginBottom: 48, maxWidth: 440 }}>
            Cabinet pluridisciplinaire au cœur de Lyon. Médecins généralistes, cardiologues et dermatologues disponibles sous 48h.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <motion.a href="#" whileHover={{ background: "#0a7a70" }} whileTap={{ scale: 0.97 }}
              style={{ padding: "16px 36px", background: C.teal, color: "#fff", borderRadius: 10, fontSize: 16, fontWeight: 700, textDecoration: "none", display: "inline-block", transition: "background 0.2s" }}>
              Prendre rendez-vous
            </motion.a>
            <motion.a href="tel:+33123456789" whileHover={{ borderColor: C.teal, color: C.teal }} whileTap={{ scale: 0.97 }}
              style={{ padding: "16px 36px", background: "transparent", color: C.text, border: `2px solid ${C.border}`, borderRadius: 10, fontSize: 16, fontWeight: 600, textDecoration: "none", transition: "all 0.2s" }}>
              04 XX XX XX XX
            </motion.a>
          </div>
          <div style={{ display: "flex", gap: 24, marginTop: 40, flexWrap: "wrap" }}>
            {["Secteur 1 disponible", "Accès PMR", "Parking gratuit", "Téléconsultation"].map(t => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: C.muted }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.teal} strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                {t}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Doctor cards */}
        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {DOCTORS.map((doc, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.12 }}
              whileHover={{ y: -3, boxShadow: "0 8px 32px rgba(13,148,136,0.12)" }}
              style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: "24px 28px", display: "flex", alignItems: "center", gap: 20, cursor: "pointer", transition: "all 0.2s" }}>
              <div style={{ width: 52, height: 52, background: doc.accent + "22", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, color: doc.accent, flexShrink: 0 }}>
                {doc.initials}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 16, color: C.text, marginBottom: 2 }}>{doc.name}</div>
                <div style={{ fontSize: 13, color: C.muted }}>{doc.title} · {doc.exp} d'expérience</div>
              </div>
              <div style={{ fontSize: 12, color: C.teal, fontWeight: 600 }}>RDV →</div>
            </motion.div>
          ))}
          {/* Appointment urgency */}
          <div style={{ background: C.tealLight, borderRadius: 16, padding: "20px 24px", border: `1px solid ${C.teal}30` }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.teal, marginBottom: 4 }}>Créneaux urgents disponibles</div>
            <div style={{ fontSize: 12, color: "#047a70" }}>Lun-Ven 8h–9h · Sans rendez-vous · Salle d'attente prioritaire</div>
          </div>
        </motion.div>
      </section>

      {/* STATS */}
      <section ref={statsRef} style={{ background: C.teal }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", maxWidth: 1280, margin: "0 auto" }}>
          {STATS.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={statsInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1 }}
              style={{ padding: "52px 40px", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.15)" : undefined, textAlign: "center" }}>
              <div style={{ fontSize: 44, fontWeight: 900, color: "#fff", letterSpacing: -1, lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", marginTop: 10 }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SPECIALTIES */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "100px 60px" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2 style={{ fontSize: "clamp(36px, 4vw, 54px)", fontWeight: 800, letterSpacing: -1.5, color: C.text }}>Nos spécialités</h2>
          <p style={{ fontSize: 17, color: C.muted, marginTop: 16 }}>Prise en charge pluridisciplinaire dans un seul et même cabinet.</p>
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 48, flexWrap: "wrap" }}>
          {SPECIALTIES.map((s, i) => (
            <button key={i} onClick={() => setActiveSpec(i)}
              style={{ padding: "10px 24px", borderRadius: 50, border: `1.5px solid ${activeSpec === i ? C.teal : C.border}`, background: activeSpec === i ? C.teal : "transparent", color: activeSpec === i ? "#fff" : C.muted, fontSize: 14, fontWeight: 500, cursor: "pointer", transition: "all 0.2s", fontFamily: C.sans }}>
              {s.label}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={activeSpec} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}
            style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 20, padding: "48px 60px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
            <div>
              <h3 style={{ fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 700, letterSpacing: -1, marginBottom: 16, color: C.text }}>{SPECIALTIES[activeSpec].label}</h3>
              <p style={{ fontSize: 17, color: C.muted, lineHeight: 1.75, marginBottom: 32 }}>{SPECIALTIES[activeSpec].desc}</p>
              <motion.a href="#" whileHover={{ background: "#0a7a70" }} whileTap={{ scale: 0.97 }}
                style={{ display: "inline-block", padding: "14px 32px", background: C.teal, color: "#fff", borderRadius: 10, fontSize: 15, fontWeight: 700, textDecoration: "none", transition: "background 0.2s" }}>
                Prendre rendez-vous
              </motion.a>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[{ label: "Durée consultation", val: SPECIALTIES[activeSpec].duration }, { label: "Tarif", val: SPECIALTIES[activeSpec].price }].map((info, j) => (
                <div key={j} style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 12, padding: "24px 28px" }}>
                  <div style={{ fontSize: 12, color: C.muted, marginBottom: 6, fontWeight: 500, letterSpacing: 0.5 }}>{info.label}</div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: C.text }}>{info.val}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ background: C.tealLight, padding: "80px 60px", borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 800, letterSpacing: -1, textAlign: "center", marginBottom: 56, color: C.text }}>Ce que nos patients disent.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }}>
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                style={{ background: C.card, borderRadius: 16, padding: "32px", border: `1px solid ${C.border}` }}>
                <div style={{ display: "flex", gap: 2, marginBottom: 16 }}>
                  {[...Array(5)].map((_, j) => <span key={j} style={{ fontSize: 14, color: C.teal }}>★</span>)}
                </div>
                <p style={{ fontSize: 15, color: C.text, lineHeight: 1.75, marginBottom: 20 }}>« {t.quote} »</p>
                <div style={{ fontSize: 12, color: C.muted, fontWeight: 600 }}>{t.name} · <span style={{ color: C.teal }}>{t.service}</span></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section ref={pricingRef} style={{ maxWidth: 1280, margin: "0 auto", padding: "100px 60px" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2 style={{ fontSize: "clamp(36px, 4vw, 54px)", fontWeight: 800, letterSpacing: -1.5, color: C.text }}>Nos formules de suivi</h2>
          <p style={{ fontSize: 17, color: C.muted, marginTop: 16 }}>Soins ponctuels ou suivi annuel — à vous de choisir.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {PLANS.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 36 }} animate={pricingInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.15 }}
              style={{ background: p.highlight ? C.teal : C.card, borderRadius: 20, padding: "40px 36px", border: p.highlight ? "none" : `1px solid ${C.border}`, boxShadow: p.highlight ? "0 16px 48px rgba(13,148,136,0.3)" : "none", transform: p.highlight ? "scale(1.03)" : "none" }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: p.highlight ? "rgba(255,255,255,0.7)" : C.muted, textTransform: "uppercase", marginBottom: 16 }}>{p.name}</div>
              <div style={{ fontSize: 36, fontWeight: 900, color: p.highlight ? "#fff" : C.text, letterSpacing: -1, lineHeight: 1, marginBottom: 4 }}>{p.price}</div>
              <div style={{ fontSize: 13, color: p.highlight ? "rgba(255,255,255,0.6)" : C.muted, marginBottom: 32 }}>{p.note}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
                {p.features.map((f, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: p.highlight ? "rgba(255,255,255,0.9)" : C.text }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={p.highlight ? "#fff" : C.teal} strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    {f}
                  </div>
                ))}
              </div>
              <motion.button whileHover={{ opacity: 0.85 }} whileTap={{ scale: 0.97 }}
                style={{ width: "100%", padding: "14px", background: p.highlight ? "#fff" : C.teal, color: p.highlight ? C.teal : "#fff", border: "none", borderRadius: 10, fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: C.sans }}>
                Choisir cette formule
              </motion.button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: 800, margin: "0 auto", padding: "0 60px 100px" }}>
        <h2 style={{ fontSize: 40, fontWeight: 800, letterSpacing: -1.5, textAlign: "center", marginBottom: 48, color: C.text }}>Questions fréquentes</h2>
        {FAQS.map((f, i) => (
          <div key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
            <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
              style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 0", background: "none", border: "none", color: C.text, cursor: "pointer", textAlign: "left" }}>
              <span style={{ fontSize: 15, fontWeight: 600 }}>{f.q}</span>
              <motion.span animate={{ rotate: openFaq === i ? 45 : 0 }} style={{ fontSize: 22, color: C.teal, minWidth: 22 }}>+</motion.span>
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
      <section style={{ background: C.teal, padding: "80px 60px", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 800, letterSpacing: -2, color: "#fff", marginBottom: 20 }}>Prendre soin de vous<br />commence ici.</h2>
        <p style={{ fontSize: 17, color: "rgba(255,255,255,0.7)", marginBottom: 40 }}>Rendez-vous disponibles sous 48h. Sans dépassement d'honoraires en médecine générale.</p>
        <motion.a href="#" whileHover={{ background: C.text }} whileTap={{ scale: 0.97 }}
          style={{ display: "inline-block", padding: "18px 48px", background: "#fff", color: C.teal, borderRadius: 10, fontSize: 17, fontWeight: 700, textDecoration: "none", transition: "background 0.2s" }}>
          Réserver une consultation
        </motion.a>
      </section>

      {/* FOOTER */}
      <footer style={{ background: C.text, padding: "60px 60px 36px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 60, marginBottom: 48 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 12 }}>Vitalité Médical</div>
            <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.8 }}>12 avenue des Fleurs, 69002 Lyon<br />Lun–Ven 8h–19h · Sam 9h–13h</div>
          </div>
          {[{ t: "Spécialités", ls: ["Médecine générale", "Cardiologie", "Dermatologie", "Nutrition"] },
            { t: "Cabinet", ls: ["Notre équipe", "Accès & parking", "Urgences", "Téléconsultation"] },
            { t: "Contact", ls: ["04 XX XX XX XX", "contact@vitalite.fr", "Doctolib", "Urgences : 15"] }].map((col, i) => (
            <div key={i}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: "#4b5563", textTransform: "uppercase", marginBottom: 16 }}>{col.t}</div>
              {col.ls.map(l => <div key={l} style={{ fontSize: 13, color: "#6b7280", marginBottom: 10 }}>{l}</div>)}
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid #1f2937", paddingTop: 24, fontSize: 12, color: "#374151", textAlign: "center" }}>
          © 2025 Vitalité Médical — Mentions légales · RGPD · Ordre des médecins
        </div>
      </footer>
    </div>
  )
}
