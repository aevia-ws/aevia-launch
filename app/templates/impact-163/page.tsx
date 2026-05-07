"use client"

import React, { useState, useEffect, useRef } from "react"
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
  Shield, Lock, Key, Eye, 
  BarChart3, PieChart, TrendingUp, Globe, 
  Zap, Database, Activity, Landmark, 
  ShieldCheck, ShieldAlert, Award, Briefcase, 
  Terminal, Settings, Power, Info, 
  AlertTriangle, ChevronRight, ArrowRight, 
  Share2, Maximize2, Download, ExternalLink, 
  Archive, Hash, Wifi, Microscope, 
  Fingerprint, Scan, Brain, Layers, 
  Frame, Box, Target, Orbit, 
  Atom, Satellite, Milestone, Gauge, 
  Timer, Cloud, Signal, Search,
  Navigation, Code, Command, Grid,
  Radar, Lightbulb, User, Heart,
  Dna, Smartphone, Bluetooth, Watch,
  CreditCard, Coins, DollarSign, Euro
} from "lucide-react"

/* ==========================================================================
   THE AEGIS VAULT DATASET (ULTRA DENSITY)
   ========================================================================== */

const ASSET_CLASSES = [
  {
    id: "asset-re-01",
    name: "Prime Real Estate",
    allocation: "35%",
    yield: "4.2%",
    risk: "Low",
    regions: "London, NYC, Singapore",
    desc: "Acquisition de biens immobiliers trophées dans les juridictions les plus stables au monde.",
    status: "Stable"
  },
  {
    id: "asset-pe-04",
    name: "Private Equity",
    allocation: "25%",
    yield: "14.8%",
    risk: "High",
    regions: "Silicon Valley, Tel Aviv",
    desc: "Investissements directs dans des licornes technologiques et des infrastructures de nouvelle génération.",
    status: "Growth"
  },
  {
    id: "asset-art-09",
    name: "Rare Collectibles",
    allocation: "15%",
    yield: "6.5%",
    risk: "Medium",
    regions: "Geneva Free Ports",
    desc: "Curateur de chefs-d'œuvre de l'art moderne et de manuscrits historiques à haute valeur de conservation.",
    status: "Curated"
  }
]

const PERFORMANCE_METRICS = [
  { label: "Intergenerational Growth", value: "+124%", trend: "Stable" },
  { label: "Liquidity Ratio", value: "18.4%", trend: "Nominal" },
  { label: "Tax Optimization", value: "94.2%", trend: "Maximum" },
  { label: "Security Health", value: "100%", trend: "Fortified" }
]

const SECURITY_LOGS = [
  { timestamp: "14:12:42", event: "Biometric Handshake: Level 5", status: "VERIFIED" },
  { timestamp: "14:12:45", event: "Quantum Encryption Sync", status: "ACTIVE" },
  { timestamp: "14:12:48", event: "Physical Vault Status: Zurich", status: "SECURE" }
]

/* ==========================================================================
   TECHNICAL COMPONENTS
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

function VaultDoorSVG({ progress }: { progress: any }) {
  const rotate = useTransform(progress, [0, 0.5], [0, 360])
  const scale = useTransform(progress, [0, 0.5], [1, 2.5])
  const opacity = useTransform(progress, [0, 0.3, 0.5], [1, 1, 0])

  return (
    <motion.div style={{ rotate, scale, opacity }} className="w-[600px] h-[600px] relative pointer-events-none opacity-20">
       <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-gold-500/20 stroke-[0.5]">
          <circle cx="50" cy="50" r="45" />
          <circle cx="50" cy="50" r="35" />
          {[...Array(12)].map((_, i) => (
            <line 
              key={i} 
              x1="50" y1="10" x2="50" y2="20" 
              transform={`rotate(${i * 30} 50 50)`} 
              stroke="white" 
              strokeWidth="0.2"
            />
          ))}
          <motion.path 
            d="M50 20 L50 30 M50 70 L50 80 M20 50 L30 50 M70 50 L80 50" 
            stroke="gold" 
            strokeWidth="0.5" 
          />
       </svg>
    </motion.div>
  )
}

function SectionTitle({ subtitle, title, alignment = "left" }: { subtitle: string, title: string, alignment?: "center" | "left" }) {
  return (
    <div className={`mb-32 ${alignment === "center" ? "text-center" : "text-left"}`}>
       <Reveal>
          <span className="text-[10px] font-black uppercase tracking-[0.6em] text-gold-500/60 mb-8 block italic underline underline-offset-8 decoration-gold-500/20 font-serif">
             {subtitle}
          </span>
          <h2 className="text-6xl md:text-[8vw] font-light tracking-tighter uppercase text-white italic font-serif leading-none">
             {title}
          </h2>
       </Reveal>
    </div>
  )
}

/* ==========================================
   THE AEGIS VAULT - MAIN INTERFACE
   ========================================== */

export default function AegisVaultPremium() {
  const [activeAsset, setActiveAsset] = useState(0)
  const [isVaultLocked, setIsVaultLocked] = useState(true)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })

  return (
    <div ref={containerRef} className="bg-[#050505] text-[#e0e2e5] font-serif selection:bg-gold-500/30 selection:text-white min-h-screen overflow-x-hidden transition-colors duration-1000">
      
      {/* GLOBAL HUD OVERLAY */}
      <HUD_Overlay isVaultLocked={isVaultLocked} />

      <main>
        {/* ==========================================
            1. VAULT IGNITION (HERO)
            ========================================== */}
        <section className="relative h-screen flex flex-col justify-center items-center px-8 md:px-24 overflow-hidden pt-20">
          <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,#d4af3710_1px,transparent_1px)] bg-[size:60px_60px]" />
          
          <div className="absolute z-0 flex items-center justify-center">
             <VaultDoorSVG progress={scrollYProgress} />
          </div>

          <div className="relative z-10 text-center max-w-7xl">
             <Reveal>
                <div className="inline-flex items-center gap-4 px-6 py-2 border border-gold-500/30 bg-gold-500/5 text-[10px] font-black uppercase tracking-[0.5em] text-gold-500 mb-12 italic font-sans">
                   <ShieldCheck className="w-4 h-4" /> Security_Status: Multi_Layer_Fortified // v4.2.0
                </div>
                <h1 className="text-7xl md:text-[14vw] font-light tracking-tighter uppercase mb-16 leading-[0.75] italic">
                   Aegis <br/> <span className="text-white/5 italic">Vault.</span>
                </h1>
                <p className="max-w-3xl mx-auto text-sm md:text-lg text-white/30 leading-relaxed uppercase tracking-widest font-light mb-16 italic font-sans">
                   L'épicentre mondial de la préservation de fortune. Nous forgeons les structures de demain pour protéger le patrimoine des générations futures.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-8 justify-center items-center font-sans">
                   <button className="px-12 py-6 bg-gold-600 text-black text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_40px_rgba(212,175,55,0.2)] flex items-center gap-4 italic">
                      <Lock className="w-5 h-5" /> Access Portfolio
                   </button>
                   <button className="px-12 py-6 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all flex items-center gap-4 italic">
                      <Globe className="w-5 h-5" /> Global Jurisdictions
                   </button>
                </div>
             </Reveal>
          </div>

          <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end border-t border-white/5 pt-12 font-sans">
             <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4 text-[9px] font-bold text-white/20 uppercase tracking-widest italic">
                   <div className="w-16 h-px bg-white/10" />
                   Vault_ID: AEGIS-77-ZRH
                </div>
                <div className="flex items-center gap-4 text-[9px] font-bold text-white/20 uppercase tracking-widest italic">
                   <div className="w-16 h-px bg-white/10" />
                   Legacy_Status: Generational
                </div>
             </div>
             <div className="text-right flex flex-col items-end gap-4">
                <span className="text-[8px] font-black uppercase tracking-[0.5em] text-gold-500/60">Asset_Flux_Monitor</span>
                <div className="flex gap-2 h-12 items-end">
                   {[...Array(16)].map((_, i) => (
                     <motion.div 
                        key={i}
                        animate={{ height: ["20%", "100%", "40%", "90%", "20%"] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                        className="w-2 bg-gold-500/10"
                     />
                   ))}
                </div>
             </div>
          </div>
        </section>

        {/* ==========================================
            2. ASSET ALLOCATION (DENSE GRID)
            ========================================== */}
        <section className="py-60 bg-[#080808] relative border-y border-white/5 overflow-hidden font-sans">
           <div className="max-w-[1600px] mx-auto px-8 md:px-24">
              <div className="flex flex-col md:flex-row items-end justify-between mb-40 gap-12">
                 <Reveal>
                    <span className="text-[10px] font-black uppercase tracking-[0.6em] text-gold-500/60 block mb-6 italic underline underline-offset-8 decoration-gold-500/20">Portfolio // Matrix</span>
                    <h2 className="text-6xl md:text-[10vw] font-light uppercase tracking-tighter italic leading-none text-white font-serif">Allocations.</h2>
                 </Reveal>
                 <div className="text-right">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 block mb-4 italic">Registry // Wealth_Audit</span>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold-500/60">L'Architecture de la Préservation</p>
                 </div>
              </div>

              <div className="grid md:grid-cols-3 gap-px bg-white/5 border border-white/5 shadow-2xl">
                 {ASSET_CLASSES.map((asset, i) => (
                   <Reveal key={asset.id} delay={i * 0.1}>
                      <div className="bg-[#050505] p-20 flex flex-col h-full hover:bg-white/[0.02] transition-all group cursor-crosshair border-white/5 border-r last:border-r-0">
                         <div className="flex justify-between items-start mb-16">
                            <div className="w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-gold-600 group-hover:text-black transition-all duration-500">
                               <Briefcase className="w-8 h-8" />
                            </div>
                            <span className={`px-4 py-2 bg-white/5 text-[9px] font-black uppercase tracking-[0.3em] ${asset.status === "Growth" ? "text-gold-500" : "text-white/40"}`}>{asset.status}</span>
                         </div>
                         
                         <h3 className="text-5xl font-light uppercase tracking-tighter mb-8 italic text-white group-hover:translate-x-4 transition-transform font-serif">{asset.name}</h3>
                         <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] mb-12">{asset.regions}</div>
                         
                         <div className="space-y-8 mb-20 border-l border-gold-500/20 pl-8">
                            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
                               <span className="text-white/20">Allocation</span>
                               <span className="text-white group-hover:text-gold-500 transition-colors">{asset.allocation}</span>
                            </div>
                            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
                               <span className="text-white/20">Yield (Ann.)</span>
                               <span className="text-white group-hover:text-gold-500 transition-colors">{asset.yield}</span>
                            </div>
                            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
                               <span className="text-white/20">Risk Factor</span>
                               <span className="text-white group-hover:text-gold-500 transition-colors">{asset.risk}</span>
                            </div>
                         </div>

                         <p className="text-[12px] text-white/30 leading-loose uppercase tracking-[0.2em] font-bold italic mb-16">
                            {asset.desc}
                         </p>

                         <div className="mt-auto pt-10 border-t border-white/5 flex justify-between items-center">
                            <span className="text-[10px] font-black text-white/10 uppercase tracking-widest">Ref: {asset.id}</span>
                            <button className="text-[10px] font-black uppercase text-white/40 flex items-center gap-4 group-hover:text-gold-500 transition-all">
                               View Position <ChevronRight className="w-5 h-5" />
                            </button>
                         </div>
                      </div>
                   </Reveal>
                 ))}
              </div>
           </div>
        </section>

        {/* ==========================================
            3. PERFORMANCE TRACKER (INTERACTIVE DATA)
            ========================================== */}
        <section className="py-60 bg-black relative border-y border-white/5 overflow-hidden">
           <div className="max-w-[1400px] mx-auto px-8 md:px-24">
              <div className="grid lg:grid-cols-2 gap-40 items-center">
                 <div>
                    <Reveal>
                       <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gold-500/60 block mb-12 italic underline underline-offset-8 decoration-gold-500/20 font-sans">Legacy // Performance</span>
                       <h2 className="text-7xl md:text-[9vw] font-light italic leading-none text-white mb-16 uppercase tracking-tighter font-serif">
                          The <br/> <span className="not-italic font-black text-white/5 italic">Growth_Curve.</span>
                       </h2>
                       <p className="text-2xl font-light text-white/20 leading-relaxed mb-24 italic uppercase tracking-[0.2em] max-w-xl font-sans">
                          Visualisation de la croissance intergénérationnelle. Nos algorithmes de gestion de risque anticipent les cycles de marché pour garantir une stabilité perpétuelle du capital.
                       </p>
                       <div className="grid grid-cols-2 gap-px bg-white/5 border border-white/5 mb-24 shadow-2xl font-sans">
                          {PERFORMANCE_METRICS.map((metric, i) => (
                            <div key={i} className="p-16 bg-[#0a0a0c] group hover:bg-white/[0.02] transition-all border-r border-b last:border-r-0 border-white/5">
                               <div className="text-[10px] font-black uppercase text-gold-500/40 mb-6 tracking-[0.4em]">{metric.label}</div>
                               <div className="text-5xl font-black text-white italic mb-6 tracking-tighter group-hover:translate-x-4 transition-transform">{metric.value}</div>
                               <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.3em] text-white/10 italic">
                                  <Activity className="w-4 h-4 text-gold-500/60" /> {metric.trend}
                               </div>
                            </div>
                          ))}
                       </div>
                       <button 
                         onClick={() => setIsVaultLocked(!isVaultLocked)}
                         className="w-full py-8 bg-gold-600 text-black text-[11px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-2xl flex items-center justify-center gap-6 italic font-sans"
                       >
                          <Settings className="w-5 h-5" /> Simulate Legacy Scenario
                       </button>
                    </Reveal>
                 </div>
                 
                 <div className="relative">
                    <Reveal delay={0.3} x={40}>
                       <div className="aspect-square bg-[#0a0a0c] border border-white/10 p-20 flex flex-col justify-between relative group overflow-hidden shadow-2xl font-sans">
                          <div className="absolute top-0 right-0 p-80 bg-gold-500 opacity-[0.02] blur-[150px] rounded-full group-hover:opacity-[0.05] transition-opacity" />
                          
                          <div className="flex justify-between items-start z-10">
                             <div className="flex flex-col gap-3">
                                <span className="text-[10px] font-black text-white/10 uppercase tracking-[0.5em]">Vault_Link // AEGIS-SYNC-v4</span>
                                <span className="text-[12px] font-black text-white/40 uppercase tracking-[0.6em]">Capital_Density_Map</span>
                             </div>
                             <Wifi className="w-6 h-6 text-gold-500/60" />
                          </div>
                          
                          {/* VAULT VISUALIZER (SVG) */}
                          <div className="relative z-10 flex flex-col items-center justify-center h-full">
                             <div className="w-64 h-64 border border-gold-500/5 rounded-full flex items-center justify-center relative">
                                <motion.div 
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                  className="absolute inset-0 border-t-2 border-gold-500/20 rounded-full" 
                                />
                                <motion.div 
                                  animate={{ rotate: -360 }}
                                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                  className="absolute inset-8 border-b-2 border-gold-500/10 rounded-full" 
                                />
                                <Shield className={`w-24 h-24 transition-colors duration-1000 ${!isVaultLocked ? "text-gold-500 animate-pulse" : "text-white/5"}`} />
                             </div>
                             <div className="mt-16 text-center space-y-6">
                                <div className={`text-4xl font-black italic tracking-tighter ${!isVaultLocked ? "text-white" : "text-white/20"}`}>
                                   {!isVaultLocked ? "VAULT_ACCESSED" : "VAULT_LOCKED"}
                                </div>
                                <span className="text-[11px] font-bold text-white/10 uppercase tracking-[0.6em] block">Auth_Node: ZURICH_HEAD_01</span>
                             </div>
                          </div>

                          <div className="relative z-10 flex gap-6">
                             <div className="flex-1 h-1 bg-white/5 overflow-hidden">
                                <motion.div 
                                   animate={!isVaultLocked ? { x: ["-100%", "100%"] } : {}}
                                   transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                   className="w-1/2 h-full bg-gold-600"
                                />
                             </div>
                          </div>
                       </div>
                    </Reveal>
                 </div>
              </div>
           </div>
        </section>

        {/* ==========================================
            4. LEGACY STORY (TECH STORYTELLING)
            ========================================== */}
        <section className="py-60 bg-[#050505] relative overflow-hidden border-t border-white/5 font-sans">
           <div className="max-w-[1400px] mx-auto px-8 md:px-24">
              <div className="grid lg:grid-cols-2 gap-40 items-center">
                 <div className="relative aspect-[3/4] overflow-hidden group border border-white/5 shadow-2xl">
                    <Image 
                       src="https://images.unsplash.com/photo-1579621970795-87f9ac756557?q=80&w=1200&auto=format&fit=crop" 
                       alt="Golden Architecture" 
                       fill 
                       className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2000ms]"
                    />
                    <div className="absolute inset-0 bg-gold-900/10 mix-blend-color group-hover:opacity-0 transition-opacity" />
                    <div className="absolute inset-0 p-20 flex flex-col justify-end bg-gradient-to-t from-black via-black/40 to-transparent">
                       <div className="text-white">
                          <span className="text-[11px] font-black uppercase tracking-[0.6em] text-gold-500/60 mb-8 block italic underline underline-offset-8 decoration-gold-500/20">Family // Office // Unit</span>
                          <h4 className="text-6xl font-black tracking-tighter uppercase italic mb-12 mix-blend-difference font-serif text-white">Generational <br/> Trust.</h4>
                          <button className="flex items-center gap-6 text-[11px] font-black uppercase tracking-[0.4em] border-b border-white/20 pb-4 hover:border-gold-500 transition-all group">
                             Governance Protocols <ExternalLink className="w-5 h-5 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                          </button>
                       </div>
                    </div>
                 </div>

                 <div>
                    <Reveal>
                       <div className="mb-24 text-left">
                          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gold-500/60 mb-8 block italic font-serif">Chapitre III // Legacy</span>
                          <h2 className="text-7xl md:text-[10vw] font-black tracking-tighter uppercase text-white italic leading-none font-serif text-white">Gold_Net.</h2>
                       </div>
                       <p className="text-2xl font-light text-white/20 leading-relaxed italic mb-20 uppercase tracking-[0.2em]">
                          La gestion de fortune est un art de la discrétion et de la solidité. Nous ne gérons pas des chiffres, nous gérons des destins et des héritages historiques.
                       </p>
                       <div className="space-y-20">
                          {[
                            { t: "Asset Shielding", d: "Structures juridiques sophistiquées garantissant une protection absolue contre les aléas géopolitiques." },
                            { t: "Dynastic Transfer", d: "Protocoles de transition fluide pour assurer la continuité de la vision familiale à travers les siècles." },
                            { t: "Strategic Philanthropy", d: "Optimisation de l'impact social et caritatif pour un héritage qui transcende le simple capital financier." }
                          ].map((step, i) => (
                            <div key={i} className="group flex gap-12 border-b border-white/5 pb-16 hover:border-gold-500/20 transition-all cursor-default">
                               <div className="text-6xl font-black text-white/5 group-hover:text-gold-500/20 transition-colors italic leading-none font-serif">0{i+1}</div>
                               <div>
                                  <h5 className="text-3xl font-black uppercase tracking-tight text-white mb-6 italic group-hover:translate-x-4 transition-transform font-serif text-white">{step.t}</h5>
                                  <p className="text-[12px] text-white/20 uppercase tracking-[0.3em] font-bold leading-loose italic">{step.d}</p>
                               </div>
                            </div>
                          ))}
                       </div>
                    </Reveal>
                 </div>
              </div>
           </div>
        </section>

        {/* MEGA FOOTER */}
        <footer className="bg-black pt-60 pb-12 px-8 md:px-24 relative z-50 font-sans">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-32 mb-60 text-white">
              <div className="lg:col-span-2">
                 <div className="flex items-center gap-6 mb-16">
                    <div className="w-16 h-16 bg-gold-600 flex items-center justify-center">
                      <Landmark className="w-10 h-10 text-black" />
                    </div>
                    <span className="text-4xl font-black uppercase tracking-tighter italic font-serif">AEGIS<span className="text-white/20">_VAULT.</span></span>
                 </div>
                 <p className="text-white/20 text-[11px] font-black uppercase tracking-[0.5em] leading-loose max-w-sm mb-20 italic">
                    "La richesse est une responsabilité, le temps est le seul actif réel." — Archive Aegis V.4
                 </p>
                 <div className="flex gap-16">
                    {["VaultLog", "AssetRegistry", "GitHub", "X_Protocol"].map(s => (
                      <Link key={s} href="#" className="text-[11px] font-black uppercase tracking-widest text-white/20 hover:text-gold-500 transition-colors italic underline underline-offset-8 decoration-white/5">{s}</Link>
                    ))}
                 </div>
              </div>

              {[
                { t: "ALLOCATIONS", l: ["Prime Real Estate", "Private Equity", "Rare Art", "Digital Assets"] },
                { t: "SECURITY", l: ["Quantum Shield", "Swiss Vaults", "Legal Firewall", "Risk Matrix"] },
                { t: "MAISON", l: ["Our Legacy", "Advisory Council", "Locations", "Support"] }
              ].map((col, i) => (
                <div key={i} className="flex flex-col gap-12">
                  <h4 className="text-[11px] font-black text-gold-500/40 uppercase tracking-[0.6em] italic">{col.t}</h4>
                  <ul className="flex flex-col gap-8">
                    {col.l.map(link => (
                      <li key={link} className="text-[11px] font-bold text-white/20 hover:text-white transition-colors cursor-pointer uppercase tracking-[0.4em] italic">{link}</li>
                    ))}
                  </ul>
                </div>
              ))}
           </div>

           <div className="max-w-[1600px] mx-auto border-t border-white/5 pt-16 flex flex-col md:flex-row justify-between items-center gap-16 text-[10px] font-black text-white/10 uppercase tracking-[0.6em] italic">
              <span>© 2026 AEGIS VAULT PRIVATE FAMILY OFFICE AG. // ALL_RIGHTS_RESERVED</span>
              <div className="flex gap-16">
                 <span>STATUS: FORTIFIED</span>
                 <span>UPTIME: 100% (AVG)</span>
                 <span>v4.4.2-STABLE</span>
              </div>
           </div>
        </footer>
      </main>
    </div>
  )
}

/* ==========================================
   TECHNICAL SUB-COMPONENTS
   ========================================== */

function HUD_Overlay({ isVaultLocked }: { isVaultLocked: boolean }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-[100] font-sans">
       {/* Corner Brackets */}
       <div className={`absolute top-12 left-12 w-20 h-20 border-t-2 border-l-2 transition-colors duration-1000 ${!isVaultLocked ? "border-gold-500" : "border-white/10"}`} />
       <div className={`absolute top-12 right-12 w-20 h-20 border-t-2 border-r-2 transition-colors duration-1000 ${!isVaultLocked ? "border-gold-500" : "border-white/10"}`} />
       <div className={`absolute bottom-12 left-12 w-20 h-20 border-b-2 border-l-2 transition-colors duration-1000 ${!isVaultLocked ? "border-gold-500" : "border-white/10"}`} />
       <div className={`absolute bottom-12 right-12 w-20 h-20 border-b-2 border-r-2 transition-colors duration-1000 ${!isVaultLocked ? "border-gold-500" : "border-white/10"}`} />

       {/* Top Status Bar */}
       <div className="absolute top-12 left-1/2 -translate-x-1/2 flex items-center gap-20 bg-black/60 backdrop-blur-2xl px-12 py-4 border border-white/10 rounded-none">
          <div className="flex items-center gap-6 text-white">
             <div className={`w-3 h-3 transition-colors duration-500 ${!isVaultLocked ? "bg-gold-500 animate-pulse" : "bg-white/20"}`} />
             <span className="text-[10px] font-black uppercase tracking-[0.4em] italic leading-none">Security_Link: {!isVaultLocked ? "OPEN" : "FORTIFIED"} // Status: NOMINAL</span>
          </div>
          <div className="h-4 w-px bg-white/20" />
          <div className="flex items-center gap-6 text-white/20">
             <Wifi className="w-4 h-4" /> 
             <span className="text-[10px] font-black uppercase tracking-[0.4em] italic leading-none">Global_Grid: SECURE</span>
          </div>
       </div>

       {/* Right Rotation Info */}
       <div className="absolute right-12 top-1/2 -translate-y-1/2 rotate-90 origin-right hidden lg:block">
          <span className="text-[10px] font-black uppercase tracking-[0.8em] text-white/5 italic">Unauthorized_Duplication_Of_Legacy_Patterns_Is_Strictly_Monitored_By_Global_Wealth_Security_Council</span>
       </div>
    </div>
  )
}
