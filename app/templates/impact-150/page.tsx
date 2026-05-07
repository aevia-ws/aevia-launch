"use client"

import React, { useState, useEffect, useRef, useMemo } from "react"
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useTransform, 
  useInView, 
  useSpring 
} from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { 
  Gavel, Shield, Scale, Globe, 
  Search, Menu, X, ChevronRight, 
  ArrowRight, Activity, Lock, Eye, 
  BookOpen, Briefcase, Award, Landmark,
  FileText, ShieldCheck, UserCheck, MapPin,
  Phone, Mail, Globe2, AlertCircle,
  ExternalLink, Download, Archive, Hash,
  Database, Terminal, Key, Zap
} from "lucide-react"

/* ==========================================================================
   STATE-OF-THE-ART LEGAL DATASET
   ========================================================================== */

const DEPARTMENTS = [
  {
    id: "corp-01",
    name: "Sovereign M&A",
    lead: "Dr. Alistair Sterling",
    desc: "Fusion-acquisition transfrontalière pour entités souveraines et fonds d'investissement privés de premier plan.",
    details: ["Restructuration fiscale", "Arbitrage de haut niveau", "Due Diligence technologique"],
    metric: "124B+ USD Managed"
  },
  {
    id: "lit-02",
    name: "Global Litigation",
    lead: "Elena Vance, KC",
    desc: "Représentation dans les litiges commerciaux les plus complexes devant les cours internationales.",
    details: ["Protection des actifs", "Gestion de crise réputationnelle", "Cyber-criminalité"],
    metric: "98% Success Rate"
  },
  {
    id: "tech-03",
    name: "Regulatory Tech",
    lead: "Hiroshi Tanaka",
    desc: "Navigation dans les cadres réglementaires émergents : IA, Quantum Computing et actifs numériques.",
    details: ["Conformité RGPD v4", "Éthique algorithmique", "Propriété intellectuelle 3.0"],
    metric: "400+ Patents Secured"
  }
]

const CASE_STUDIES = [
  {
    id: "case-alpha",
    title: "The Berlin Infrastructure Accord",
    year: "2025",
    impact: "Energy Sovereignty",
    summary: "Négociation complexe pour la sécurisation des réseaux d'énergie européens face aux instabilités géopolitiques."
  },
  {
    id: "case-beta",
    title: "Global Tech Antitrust v. Solis",
    year: "2026",
    impact: "Market Stability",
    summary: "Défense d'un leader technologique dans le plus grand procès antitrust de la décennie à Singapour."
  }
]

const GLOBAL_OFFICES = [
  { city: "London", region: "EMEA", status: "Active", latency: "12ms" },
  { city: "New York", region: "AMER", status: "Active", latency: "24ms" },
  { city: "Singapore", region: "APAC", status: "Active", latency: "8ms" },
  { city: "Zurich", region: "CH", status: "Maintenance", latency: "--" }
]

/* ==========================================================================
   ADVANCED ANIMATION HOOKS & COMPONENTS
   ========================================================================== */

function Reveal({ children, delay = 0, y = 40, x = 0 }: { children: React.ReactNode, delay?: number, y?: number, x?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, x }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

function Counter({ value, label }: { value: string, label: string }) {
  return (
    <div className="flex flex-col gap-2">
      <motion.span 
        initial={{ opacity: 0 }} 
        whileInView={{ opacity: 1 }} 
        className="text-5xl font-light tracking-tighter"
      >
        {value}
      </motion.span>
      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">{label}</span>
    </div>
  )
}

/* ==========================================================================
   THE SOVEREIGN COUNSEL - MAIN APPLICATION
   ========================================================================== */

export default function SovereignCounselPremium() {
  const [activeTab, setActiveTab] = useState(0)
  const [vaultAccess, setVaultAccess] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })

  // Parallax effects
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100])
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1])
  const opacityFade = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  // Custom Cursor Spring
  const mouseX = useSpring(0, { stiffness: 500, damping: 50 })
  const mouseY = useSpring(0, { stiffness: 500, damping: 50 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <div ref={containerRef} className="bg-[#0a0a0b] text-[#f8f9fa] font-sans selection:bg-[#c4a661] selection:text-white min-h-screen overflow-x-hidden">
      
      {/* CUSTOM CURSOR */}
      <motion.div 
        style={{ x: mouseX, y: mouseY }}
        className="fixed top-0 left-0 w-8 h-8 border border-[#c4a661] rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block -ml-4 -mt-4"
      />

      {/* ==========================================
          LEFT COMMAND PANEL (FIXED)
          ========================================== */}
      <aside className="fixed top-0 left-0 bottom-0 w-24 md:w-32 bg-black border-r border-white/5 z-[100] flex flex-col items-center py-12">
        <Link href="/" className="mb-20">
          <div className="w-12 h-12 bg-[#c4a661] flex items-center justify-center rounded-sm group overflow-hidden">
            <motion.div
              animate={{ rotate: [0, 90, 0] }}
              transition={{ duration: 10, repeat: Infinity }}
            >
              <Landmark className="w-6 h-6 text-black" />
            </motion.div>
          </div>
        </Link>

        <div className="flex-1 flex flex-col gap-12 text-[10px] font-black uppercase tracking-[0.4em] rotate-[-90deg] origin-center whitespace-nowrap text-white/20">
          <button className="hover:text-[#c4a661] transition-colors">Expertise</button>
          <button className="hover:text-[#c4a661] transition-colors">Jurisdictions</button>
          <button className="hover:text-[#c4a661] transition-colors">Vault</button>
          <button className="hover:text-[#c4a661] transition-colors">Archive</button>
        </div>

        <div className="mt-auto flex flex-col gap-6 items-center">
          <div className="w-1 h-1 bg-[#c4a661] rounded-full animate-pulse" />
          <div className="h-20 w-px bg-white/10" />
          <button className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </aside>

      {/* ==========================================
          MAIN CONTENT WRAPPER
          ========================================== */}
      <main className="pl-24 md:pl-32">
        
        {/* TOP HUD BAR */}
        <header className="sticky top-0 w-full h-20 bg-[#0a0a0b]/80 backdrop-blur-xl border-b border-white/5 z-[90] px-8 md:px-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="hidden lg:flex items-center gap-4 px-4 py-2 bg-white/5 rounded-full border border-white/10">
              <Activity className="w-3 h-3 text-[#c4a661]" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-white/40">Market_Status: Closed // GMT 20:08</span>
            </div>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-[#c4a661] transition-colors" />
              <input 
                type="text" 
                placeholder="Search Cases, Laws, Patents..."
                className="bg-transparent border border-white/10 pl-12 pr-6 py-2 text-[10px] font-bold uppercase tracking-widest outline-none focus:border-[#c4a661] w-64 md:w-96 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-8">
            <button 
              onClick={() => setVaultAccess(true)}
              className="flex items-center gap-3 px-8 py-3 bg-[#c4a661] text-black text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-xl"
            >
              <Lock className="w-3 h-3" /> Secure Vault
            </button>
            <div className="hidden sm:block text-right">
              <div className="text-[10px] font-black uppercase text-white/20 italic">Sovereign_Counsel</div>
              <div className="text-[10px] font-bold uppercase text-[#c4a661]">v4.2.18</div>
            </div>
          </div>
        </header>

        {/* HERO SECTION */}
        <section className="relative h-[90vh] flex items-center justify-center overflow-hidden px-8 md:px-20">
          <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0 z-0">
             <Image 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2400&auto=format&fit=crop" 
                alt="Corporate Architecture" 
                fill 
                className="object-cover opacity-20 grayscale"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-transparent to-[#0a0a0b]" />
          </motion.div>

          <div className="relative z-10 text-center max-w-7xl">
            <Reveal>
              <span className="text-[10px] font-black uppercase tracking-[0.8em] text-[#c4a661] mb-12 block italic underline underline-offset-8">International Law & Strategic Lobbying</span>
              <h1 className="text-6xl md:text-[12vw] font-light tracking-tighter leading-[0.8] mb-16 uppercase italic">
                Authority <br/> <span className="not-italic font-black text-white/5 italic">In_Sovereignty.</span>
              </h1>
              <div className="grid md:grid-cols-3 gap-12 md:gap-24 text-left max-w-5xl mx-auto border-t border-white/10 pt-16">
                 <div className="space-y-4">
                    <h3 className="text-sm font-black uppercase tracking-widest text-[#c4a661]">Our Creed</h3>
                    <p className="text-xs text-white/40 leading-loose uppercase tracking-wider font-light italic">
                       Nous protégeons les intérêts des nations et des corporations là où le droit rencontre le pouvoir géopolitique.
                    </p>
                 </div>
                 <div className="flex flex-col justify-end">
                    <Counter value="124" label="Global Jurisdictions" />
                 </div>
                 <div className="flex flex-col justify-end">
                    <Counter value="1.2T" label="Aggregated Asset Value" />
                 </div>
              </div>
            </Reveal>
          </div>

          <motion.div 
            style={{ opacity: opacityFade }}
            className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
          >
             <span className="text-[8px] font-black uppercase tracking-[0.5em] text-white/20">Elevate_to_Discover</span>
             <div className="h-20 w-px bg-gradient-to-b from-[#c4a661] to-transparent" />
          </motion.div>
        </section>

        {/* JURISDICTION MATRIX (DENSE GRID) */}
        <section className="py-60 bg-black/40 relative overflow-hidden">
          <div className="max-w-[1600px] mx-auto px-8 md:px-20">
            <div className="flex flex-col md:flex-row items-end justify-between mb-40 gap-12 border-b border-white/5 pb-20">
               <Reveal>
                  <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter italic leading-none">Matrix.</h2>
               </Reveal>
               <div className="text-right">
                  <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#c4a661] block mb-4 italic">Strategic // Departments</span>
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20 italic">L'Architecture du Droit</p>
               </div>
            </div>

            <div className="grid md:grid-cols-3 gap-px bg-white/5 border border-white/5">
               {DEPARTMENTS.map((dept, i) => (
                 <Reveal key={dept.id} delay={i * 0.1}>
                    <div className="bg-black p-16 flex flex-col h-full hover:bg-white/5 transition-all group cursor-pointer">
                       <div className="w-12 h-12 bg-white/5 flex items-center justify-center mb-16 group-hover:bg-[#c4a661] transition-all">
                          <Gavel className="w-6 h-6 text-[#c4a661] group-hover:text-black" />
                       </div>
                       <h3 className="text-4xl font-black uppercase tracking-tighter mb-8 italic">{dept.name}</h3>
                       <p className="text-sm font-light text-white/40 leading-relaxed uppercase tracking-widest italic mb-12">
                          {dept.desc}
                       </p>
                       <ul className="space-y-4 mb-16">
                          {dept.details.map((detail, idx) => (
                            <li key={idx} className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">
                               <div className="w-1 h-1 bg-[#c4a661] rounded-full" />
                               {detail}
                            </li>
                          ))}
                       </ul>
                       <div className="mt-auto flex justify-between items-end">
                          <div className="flex flex-col">
                             <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">Performance</span>
                             <span className="text-xl font-bold text-[#c4a661]">{dept.metric}</span>
                          </div>
                          <ChevronRight className="w-6 h-6 text-white/10 group-hover:text-[#c4a661] group-hover:translate-x-2 transition-all" />
                       </div>
                    </div>
                 </Reveal>
               ))}
            </div>
          </div>
        </section>

        {/* CASE STUDIES (IMAGE + STORYTELLING) */}
        <section className="py-60 bg-[#0a0a0b]">
           <div className="max-w-[1400px] mx-auto px-8 md:px-20">
              <div className="grid lg:grid-cols-2 gap-32 items-center">
                 <div className="relative aspect-[4/5] overflow-hidden group">
                    <Image 
                       src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop" 
                       alt="Executive Meeting" 
                       fill 
                       className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                    />
                    <div className="absolute inset-0 bg-black/60 group-hover:bg-black/20 transition-all" />
                    <div className="absolute inset-0 p-16 flex flex-col justify-end">
                       <div className="text-white">
                          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#c4a661] mb-4 block italic">Featured Case // 2026</span>
                          <h4 className="text-5xl font-black tracking-tighter uppercase italic mb-8">The Global <br/> Tech Trust.</h4>
                          <button className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest border-b border-[#c4a661] pb-2">
                             Full Report <ExternalLink className="w-4 h-4" />
                          </button>
                       </div>
                    </div>
                 </div>

                 <div className="space-y-32">
                    <Reveal>
                       <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#c4a661] mb-8 block italic underline underline-offset-8">Briefings // Archive</span>
                       <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic leading-none mb-12">Insights.</h2>
                       <p className="text-xl font-light text-white/40 leading-relaxed italic mb-16">
                          Notre analyse prospective des tendances législatives permet à nos clients de devancer les changements structurels majeurs.
                       </p>
                       <div className="space-y-12">
                          {CASE_STUDIES.map((cs) => (
                            <div key={cs.id} className="group border-l border-white/10 pl-12 hover:border-[#c4a661] transition-all cursor-pointer">
                               <div className="flex justify-between items-center mb-4">
                                  <span className="text-[10px] font-black text-[#c4a661] uppercase tracking-widest">{cs.year} // {cs.impact}</span>
                                  <ArrowRight className="w-4 h-4 text-white/10 group-hover:text-white group-hover:translate-x-2 transition-all" />
                               </div>
                               <h5 className="text-2xl font-bold uppercase tracking-tight text-white mb-4 italic">{cs.title}</h5>
                               <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold leading-relaxed">{cs.summary}</p>
                            </div>
                          ))}
                       </div>
                    </Reveal>
                 </div>
              </div>
           </div>
        </section>

        {/* VAULT SIMULATOR (TECHNICAL DENSITY) */}
        <section className="py-60 bg-black relative border-y border-white/5">
           <div className="max-w-[1400px] mx-auto px-8 md:px-20">
              <div className="grid lg:grid-cols-2 gap-32 items-center">
                 <div>
                    <Reveal>
                       <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#c4a661] block mb-12 italic underline underline-offset-8">Secure // Client_Portal</span>
                       <h2 className="text-6xl md:text-8xl font-light italic leading-none text-white mb-12 uppercase tracking-tighter">
                          The <br/> <span className="not-italic font-black text-white/5 italic">Sovereign_Vault.</span>
                       </h2>
                       <p className="text-xl font-light text-white/20 leading-relaxed mb-20 italic">
                          Un accès chiffré à vos actifs documentaires, rapports de lobbying et communications sécurisées. Protégé par cryptographie post-quantique.
                       </p>
                       <div className="grid grid-cols-2 gap-8 mb-20">
                          <div className="p-6 bg-white/5 border border-white/10">
                             <Key className="w-6 h-6 text-[#c4a661] mb-4" />
                             <h6 className="text-[10px] font-black uppercase text-white mb-2">Multi-Factor</h6>
                             <p className="text-[8px] text-white/30 uppercase font-bold tracking-widest">Biometric & Quantum Auth</p>
                          </div>
                          <div className="p-6 bg-white/5 border border-white/10">
                             <Database className="w-6 h-6 text-[#c4a661] mb-4" />
                             <h6 className="text-[10px] font-black uppercase text-white mb-2">Encrypted Data</h6>
                             <p className="text-[8px] text-white/30 uppercase font-bold tracking-widest">On-Chain Document Storage</p>
                          </div>
                       </div>
                       <button className="w-full py-6 border-2 border-[#c4a661] text-[#c4a661] text-[10px] font-black uppercase tracking-widest hover:bg-[#c4a661] hover:text-black transition-all">
                          Initialize Handshake Protocol
                       </button>
                    </Reveal>
                 </div>
                 <div className="relative">
                    <Reveal delay={0.3} x={40}>
                       <div className="aspect-square bg-[#0a0a0b] border border-white/10 p-12 flex flex-col justify-between relative group overflow-hidden">
                          <div className="absolute top-0 right-0 p-40 bg-[#c4a661] opacity-[0.03] blur-[100px] rounded-full group-hover:opacity-[0.1] transition-opacity" />
                          <div className="flex justify-between items-start z-10">
                             <div className="flex flex-col gap-2">
                                <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">System_ID // ARCH-X</span>
                                <span className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Vault_Access_Point</span>
                             </div>
                             <Terminal className="w-5 h-5 text-[#c4a661]" />
                          </div>
                          
                          <div className="flex flex-col gap-6 relative z-10">
                             {[
                               { label: "ENCRYPTION_LAYER", value: "AES-512_QUANTUM" },
                               { label: "LAST_ENTRY", value: "TOKYO_NODE_12:04" },
                               { label: "THREAT_LEVEL", value: "ZERO_DETECTION" }
                             ].map((data, i) => (
                               <div key={i} className="flex justify-between items-end border-b border-white/5 pb-2">
                                  <span className="text-[8px] font-bold text-white/20 uppercase tracking-widest">{data.label}</span>
                                  <span className="text-[10px] font-black text-[#c4a661] uppercase tracking-widest">{data.value}</span>
                               </div>
                             ))}
                          </div>

                          <div className="flex gap-4 relative z-10">
                             <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                <motion.div 
                                   animate={{ x: ["-100%", "100%"] }} 
                                   transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                   className="w-1/2 h-full bg-[#c4a661]"
                                />
                             </div>
                          </div>
                       </div>
                    </Reveal>
                 </div>
              </div>
           </div>
        </section>

        {/* OFFICE NETWORK (INTERACTIVE) */}
        <section className="py-60 bg-white text-black relative">
           <div className="max-w-[1600px] mx-auto px-8 md:px-20">
              <div className="grid lg:grid-cols-2 gap-32 items-center">
                 <div>
                    <Reveal>
                       <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#c4a661] block mb-12 italic underline underline-offset-8">Global // Presence</span>
                       <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic leading-none mb-12">Nodes.</h2>
                       <p className="text-xl font-light text-black/40 leading-relaxed italic mb-16">
                          Notre réseau d'influence s'étend sur les principaux centres financiers et politiques mondiaux.
                       </p>
                       <div className="grid grid-cols-2 gap-px bg-black/5 border border-black/5">
                          {GLOBAL_OFFICES.map((office, i) => (
                            <div key={i} className="bg-white p-10 group hover:bg-black transition-all">
                               <div className="flex justify-between items-start mb-8">
                                  <h6 className="text-2xl font-black uppercase tracking-tighter group-hover:text-white transition-colors">{office.city}</h6>
                                  <div className={`w-2 h-2 rounded-full ${office.status === "Active" ? "bg-green-500" : "bg-red-500"} animate-pulse`} />
                               </div>
                               <div className="flex justify-between items-center">
                                  <span className="text-[8px] font-black text-black/20 group-hover:text-white/20 uppercase tracking-widest">{office.region}</span>
                                  <span className="text-[10px] font-bold text-[#c4a661] italic">{office.latency}</span>
                               </div>
                            </div>
                          ))}
                       </div>
                    </Reveal>
                 </div>
                 <div className="relative aspect-square">
                    <Reveal delay={0.4}>
                       <Image 
                          src="https://images.unsplash.com/photo-1449153074468-d713a434d204?q=80&w=1200&auto=format&fit=crop" 
                          alt="World Map Silhouette" 
                          fill 
                          className="object-cover grayscale"
                       />
                       <div className="absolute inset-0 bg-white/40 mix-blend-overlay" />
                    </Reveal>
                 </div>
              </div>
           </div>
        </section>

        {/* MEGA FOOTER */}
        <footer className="bg-black pt-60 pb-12 px-8 md:px-20 relative z-50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-32 mb-60 text-white">
            <div className="lg:col-span-2">
               <div className="flex items-center gap-4 mb-12">
                  <div className="w-10 h-10 bg-[#c4a661] flex items-center justify-center">
                    <Landmark className="w-6 h-6 text-black" />
                  </div>
                  <span className="text-3xl font-black uppercase tracking-tighter italic">Sovereign<span className="text-[#c4a661]">_Counsel.</span></span>
               </div>
               <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.4em] leading-loose max-w-sm mb-16 italic">
                  "L'autorité ne se délègue pas, elle s'organise." — Archive Sovereign V.4
               </p>
               <div className="flex gap-12">
                  {["LinkedIn", "Bloomberg", "FT", "Economist"].map(s => (
                    <Link key={s} href="#" className="text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-[#c4a661] transition-colors italic">{s}</Link>
                  ))}
               </div>
            </div>

            {[
              { t: "EXPERTISE", l: ["Sovereign M&A", "Litigation", "Regulatory Tech", "Arbitration"] },
              { t: "FIRM", l: ["Our Nodes", "Leadership", "Career Path", "Contact"] },
              { t: "RESOURCES", l: ["Insights", "Vault Access", "Press Office", "Legal Notice"] }
            ].map((col, i) => (
              <div key={i} className="flex flex-col gap-12">
                <h4 className="text-[10px] font-black text-[#c4a661] uppercase tracking-[0.5em] italic">{col.t}</h4>
                <ul className="flex flex-col gap-6">
                  {col.l.map(link => (
                    <li key={link} className="text-[10px] font-bold text-white/20 hover:text-white transition-colors cursor-pointer uppercase tracking-widest italic">{link}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="max-w-[1600px] mx-auto border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-12 text-[8px] font-black text-white/10 uppercase tracking-[0.4em] italic">
             <span>© 2026 SOVEREIGN EXECUTIVE COUNSEL GROUP AG. // ALL_RIGHTS_RESERVED</span>
             <div className="flex gap-12">
                <span>SECURITY: LEVEL_5</span>
                <span>LATENCY: 12ms</span>
                <span>ENCRYPT: AES-512</span>
             </div>
          </div>
        </footer>
      </main>

      {/* VAULT ACCESS OVERLAY (SIMULATED) */}
      <AnimatePresence>
        {vaultAccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-8"
          >
            <div className="max-w-md w-full border border-[#c4a661]/30 p-12 relative">
               <button 
                 onClick={() => setVaultAccess(false)}
                 className="absolute top-4 right-4 text-white/20 hover:text-white transition-colors"
               >
                 <X className="w-6 h-6" />
               </button>
               <div className="flex flex-col items-center gap-12">
                  <div className="w-20 h-20 bg-[#c4a661]/10 flex items-center justify-center rounded-full">
                     <Lock className="w-10 h-10 text-[#c4a661]" />
                  </div>
                  <div className="text-center">
                     <h2 className="text-2xl font-black uppercase tracking-tighter mb-4 italic">Initialize Vault_Handshake</h2>
                     <p className="text-[10px] font-bold uppercase tracking-widest text-white/20 leading-relaxed">
                        Entrez vos identifiants de sécurité biométrique ou votre clé quantique pour accéder aux documents classifiés.
                     </p>
                  </div>
                  <div className="w-full space-y-4">
                     <input 
                        type="text" 
                        placeholder="IDENT_ID"
                        className="w-full bg-white/5 border border-white/10 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.3em] outline-none focus:border-[#c4a661]"
                     />
                     <button className="w-full py-4 bg-[#c4a661] text-black text-[10px] font-black uppercase tracking-widest">
                        Authenticate Access
                     </button>
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
