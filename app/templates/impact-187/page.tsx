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
  Zap, Activity, Microscope, 
  Target, Layers, Box, Hexagon, 
  Terminal, Settings, Power, Info, 
  AlertTriangle, ChevronRight, ArrowRight, 
  Share2, Maximize2, Download, ExternalLink, 
  Archive, Hash, Wifi, BarChart3, 
  Fingerprint, Scan, Brain, Server, 
  ShieldCheck, ShieldAlert, Award, 
  Briefcase, Wind, Thermometer, 
  Flame, Battery, Radio, Gauge, 
  Timer, Lightbulb, Command, Grid, 
  Radar, Orbit, Atom, Satellite, 
  Milestone, FlaskConical, FlaskRound, 
  Ghost, Binary, Database, Search, 
  Cpu, HeartPulse, Sun, Magnet, 
  CircleDot, Waves, Pickaxe, Mountain, 
  Gem, Rocket, Drill, PlaneTakeoff, 
  Dna, Lock, DatabaseIcon, HardDrive, 
  Library, BookOpen, Shield, ThermometerSnowflake, 
  Pipette, FlaskRoundIcon
} from "lucide-react"

/* ==========================================================================
   THE BIO-DIGITAL CRYPT DATASET (ULTRA DENSITY)
   ========================================================================== */

const GENOMIC_ARCHIVES = [
  {
    id: "arc-hum-42",
    name: "Humanity's Heritage v4",
    type: "Global Knowledge Archive",
    density: "215 PB / gram",
    lifespan: "2,000 Years",
    integrity: "99.9999%",
    desc: "Stockage de l'intégralité de la connaissance humaine (littérature, art, science) encodé dans des brins d'ADN synthétique ultra-stables.",
    status: "Vaulted"
  },
  {
    id: "arc-gen-08",
    name: "Seed Genome Vault",
    type: "Biological Backup",
    density: "18 PB / gram",
    lifespan: "5,000 Years",
    integrity: "99.99999%",
    desc: "Sauvegarde numérique haute fidélité des génomes de toutes les espèces terrestres, protégée contre les radiations et le temps.",
    status: "Syncing"
  },
  {
    id: "arc-key-15",
    name: "Post-Quantum Keys",
    type: "Cryptographic Core",
    density: "42 PB / gram",
    lifespan: "1,000 Years",
    integrity: "99.99%",
    desc: "Clés de chiffrement universelles stockées biologiquement, indétectables par les scanners électromagnétiques conventionnels.",
    status: "Active Link"
  }
]

const BIO_STORAGE_METRICS = [
  { label: "Storage Temp", value: "77 K", trend: "Cryo-Stable" },
  { label: "Data Density", value: "215 PB/g", trend: "Max" },
  { label: "Synthesis Fid.", value: "99.99%", trend: "Optimal" },
  { label: "Error Correction", value: "LDPC-v4", trend: "Active" }
]

const STORAGE_LOGS = [
  { timestamp: "11:14:42", unit: "Synth-Module-01", status: "ENCODING", gene: "BTC-PRV" },
  { timestamp: "11:14:45", unit: "Cryo-Vault-X", status: "STABLE", temp: "77K" },
  { timestamp: "11:14:48", unit: "Read-Pulse", status: "SUCCESS", match: "100%" }
]

/* ==========================================
   TECHNICAL COMPONENTS
   ========================================== */

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

function NucleoStreamVisualizer() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY })
    window.addEventListener("mousemove", handleMouse)
    return () => window.removeEventListener("mousemove", handleMouse)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-10">
       <svg width="100%" height="100%" className="w-full h-full">
          {[...Array(20)].map((_, i) => (
            <motion.text 
               key={i}
               x={`${5 + i * 5}%`} 
               y="0" 
               fill="#a855f7" 
               fontSize="12" 
               fontWeight="bold"
               animate={{ y: [0, 1000] }}
               transition={{ duration: 5 + Math.random() * 5, repeat: Infinity, ease: "linear", delay: Math.random() * 5 }}
            >
               {["A", "T", "C", "G"][Math.floor(Math.random() * 4)]}
            </motion.text>
          ))}
          {[...Array(30)].map((_, i) => (
            <motion.path 
               key={`helix-${i}`}
               d={`M ${Math.random() * 2000} 0 Q ${Math.random() * 2000} 500 ${Math.random() * 2000} 1000`}
               stroke="#a855f7" 
               strokeWidth="0.5" 
               fill="none"
               animate={{ d: `M ${mousePos.x + (i * 20)} 0 Q ${mousePos.x - (i * 10)} 500 ${mousePos.x + (i * 20)} 1000` }}
               transition={{ type: "spring", damping: 30, stiffness: 50 }}
            />
          ))}
       </svg>
    </div>
  )
}

function BioVaultModel({ progress }: { progress: any }) {
  const rotate = useTransform(progress, [0, 1], [0, 360])
  const scale = useTransform(progress, [0, 0.5, 1], [1, 1.2, 1])

  return (
    <motion.div style={{ rotate, scale }} className="relative w-80 h-80 flex items-center justify-center">
       <div className="absolute inset-0 border border-purple-500/10 rounded-full animate-spin-slow shadow-[0_0_80px_rgba(168,85,247,0.05)]" />
       <DatabaseIcon className="w-40 h-40 text-purple-500/10 animate-pulse" />
       <div className="absolute inset-8 border border-purple-500/5 rounded-full" />
    </motion.div>
  )
}

/* ==========================================
   THE BIO-DIGITAL CRYPT - MAIN INTERFACE
   ========================================== */

export default function BioDigitalCryptPremium() {
  const [activeArchive, setActiveArchive] = useState(0)
  const [isCryoLockActive, setIsCryoLockActive] = useState(true)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })

  // Vault Scroll Effects
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const textX = useTransform(scrollYProgress, [0, 0.5], [0, -100])

  return (
    <div ref={containerRef} className="bg-[#050208] text-[#e0e8ed] font-mono selection:bg-purple-500/30 selection:text-white min-h-screen overflow-x-hidden transition-colors duration-1000">
      
      {/* GLOBAL HUD OVERLAY */}
      <HUD_Overlay isCryoLockActive={isCryoLockActive} />

      <main>
        {/* ==========================================
            1. CRYPT IGNITION (HERO)
            ========================================== */}
        <section className="relative h-screen flex flex-col justify-center items-center px-8 md:px-24 overflow-hidden pt-20">
          <NucleoStreamVisualizer />
          <motion.div style={{ opacity: heroOpacity }} className="absolute z-0 pointer-events-none flex items-center justify-center">
             <BioVaultModel progress={scrollYProgress} />
          </motion.div>

          <div className="relative z-10 text-center max-w-7xl">
             <Reveal>
                <div className="inline-flex items-center gap-4 px-6 py-2 border border-purple-500/30 bg-purple-500/5 text-[10px] font-black uppercase tracking-[0.5em] text-purple-500 mb-12 italic">
                   <Dna className="w-4 h-4" /> Storage_Sync: NOMINAL // Density: 215 PB/g
                </div>
                <motion.h1 style={{ x: textX }} className="text-7xl md:text-[14vw] font-black tracking-tighter uppercase mb-16 leading-[0.75] italic">
                   Bio-Digital <br/> <span className="text-white/5 italic">Crypt.</span>
                </motion.h1>
                <p className="max-w-3xl mx-auto text-sm md:text-lg text-white/30 leading-relaxed uppercase tracking-widest font-light mb-16 italic">
                   La préservation éternelle de l'information. Nous codons les archives de l'humanité dans l'ADN synthétique, créant une bibliothèque millénaire résistante au temps et aux effondrements technologiques.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                   <button className="px-12 py-6 bg-purple-800 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-[0_0_40px_rgba(168,85,247,0.2)] flex items-center gap-4 italic">
                      <Lock className="w-5 h-5" /> Initialize Encoding
                   </button>
                   <button className="px-12 py-6 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all flex items-center gap-4 italic">
                      <Archive className="w-5 h-5" /> Global Registry
                   </button>
                </div>
             </Reveal>
          </div>

          <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end border-t border-white/5 pt-12">
             <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4 text-[9px] font-bold text-white/20 uppercase tracking-widest italic">
                   <div className="w-16 h-px bg-white/10" />
                   Vault_ID: NUCLEO-CRYPT-01
                </div>
                <div className="flex items-center gap-4 text-[9px] font-bold text-white/20 uppercase tracking-widest italic">
                   <div className="w-16 h-px bg-white/10" />
                   Status: CRYO_LOCKED_STABLE
                </div>
             </div>
             <div className="text-right flex flex-col items-end gap-4">
                <span className="text-[8px] font-black uppercase tracking-[0.5em] text-purple-500">Molecular_Data_Stream</span>
                <div className="flex gap-2 h-12 items-end">
                   {[...Array(16)].map((_, i) => (
                     <motion.div 
                        key={i}
                        animate={{ height: ["10%", "100%", "30%", "80%", "10%"] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                        className="w-2 bg-purple-500/20"
                     />
                   ))}
                </div>
             </div>
          </div>
        </section>

        {/* ==========================================
            2. GENOMIC REGISTRY (DENSE TECHNICAL)
            ========================================== */}
        <section className="py-60 bg-[#08040c] relative border-y border-white/5 overflow-hidden">
           <div className="max-w-[1600px] mx-auto px-8 md:px-24">
              <div className="flex flex-col md:flex-row items-end justify-between mb-40 gap-12">
                 <Reveal>
                    <span className="text-[10px] font-black uppercase tracking-[0.6em] text-purple-500 block mb-6 italic underline underline-offset-8 decoration-purple-400/20">Genomic // Assets</span>
                    <h2 className="text-6xl md:text-[10vw] font-black uppercase tracking-tighter italic leading-none text-white">Archives.</h2>
                 </Reveal>
                 <div className="text-right">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 block mb-4 italic">Registry // Bio_Audit</span>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-purple-500">L'Architecture du Stockage Moléculaire</p>
                 </div>
              </div>

              <div className="grid md:grid-cols-3 gap-px bg-white/5 border border-white/5 shadow-2xl">
                 {GENOMIC_ARCHIVES.map((arc, i) => (
                   <Reveal key={arc.id} delay={i * 0.1}>
                      <div className="bg-[#050208] p-20 flex flex-col h-full hover:bg-white/[0.02] transition-all group cursor-crosshair border-white/5 border-r last:border-r-0">
                         <div className="flex justify-between items-start mb-16">
                            <div className="w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-purple-800 group-hover:text-white transition-all duration-500">
                               <Library className="w-8 h-8" />
                            </div>
                            <span className={`px-4 py-2 bg-white/5 text-[9px] font-black uppercase tracking-[0.3em] ${arc.status === "Vaulted" ? "text-purple-500" : "text-white/40"}`}>{arc.status}</span>
                         </div>
                         
                         <h3 className="text-4xl font-black uppercase tracking-tighter mb-8 italic text-white group-hover:translate-x-4 transition-transform">{arc.name}</h3>
                         <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] mb-12">{arc.type}</div>
                         
                         <div className="space-y-8 mb-20 border-l border-purple-500/20 pl-8">
                            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
                               <span className="text-white/20">Data Density</span>
                               <span className="text-white group-hover:text-purple-400 transition-colors">{arc.density}</span>
                            </div>
                            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
                               <span className="text-white/20">Lifespan</span>
                               <span className="text-white group-hover:text-purple-400 transition-colors">{arc.lifespan}</span>
                            </div>
                            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
                               <span className="text-white/20">Integrity</span>
                               <span className="text-white group-hover:text-purple-400 transition-colors">{arc.integrity}</span>
                            </div>
                         </div>

                         <p className="text-[12px] text-white/30 leading-loose uppercase tracking-[0.2em] font-bold italic mb-16">
                            {arc.desc}
                         </p>

                         <div className="mt-auto pt-10 border-t border-white/5 flex justify-between items-center">
                            <span className="text-[10px] font-black text-white/10 uppercase tracking-widest">Ref: {arc.id}</span>
                            <button className="text-[10px] font-black uppercase text-white/40 flex items-center gap-4 group-hover:text-white transition-all">
                               Technical_Specs <ChevronRight className="w-5 h-5" />
                            </button>
                         </div>
                      </div>
                   </Reveal>
                 ))}
              </div>
           </div>
        </section>

        {/* ==========================================
            3. CRYO MONITOR (INTERACTIVE DATA)
            ========================================== */}
        <section className="py-60 bg-black relative border-y border-white/5 overflow-hidden">
           <div className="max-w-[1400px] mx-auto px-8 md:px-24">
              <div className="grid lg:grid-cols-2 gap-40 items-center">
                 <div>
                    <Reveal>
                       <span className="text-[10px] font-black uppercase tracking-[0.5em] text-purple-500 block mb-12 italic underline underline-offset-8 decoration-purple-400/20">Cryo // Performance</span>
                       <h2 className="text-7xl md:text-[9vw] font-light italic leading-none text-white mb-16 uppercase tracking-tighter">
                          The <br/> <span className="not-italic font-black text-white/5 italic">Bio_Vault_Link.</span>
                       </h2>
                       <p className="text-2xl font-light text-white/20 leading-relaxed mb-24 italic uppercase tracking-[0.2em] max-w-xl">
                          Surveillance de la stabilité moléculaire en temps réel. Nos capteurs cryogéniques analysent la température et la fidélité de synthèse pour garantir une préservation sans faille.
                       </p>
                       <div className="grid grid-cols-2 gap-px bg-white/5 border border-white/5 mb-24 shadow-2xl">
                          {BIO_STORAGE_METRICS.map((metric, i) => (
                            <div key={i} className="p-16 bg-[#0c0a10] group hover:bg-white/[0.02] transition-all border-r border-b last:border-r-0 border-white/5">
                               <div className="text-[10px] font-black uppercase text-purple-500 mb-6 tracking-[0.4em]">{metric.label}</div>
                               <div className="text-5xl font-black text-white italic mb-6 tracking-tighter group-hover:translate-x-4 transition-transform">{metric.value}</div>
                               <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.3em] text-white/10 italic">
                                  <Activity className="w-4 h-4 text-purple-500" /> {metric.trend}
                               </div>
                            </div>
                          ))}
                       </div>
                       <button 
                         onClick={() => setIsCryoLockActive(!isCryoLockActive)}
                         className="w-full py-8 bg-purple-950 text-white text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-2xl flex items-center justify-center gap-6 italic"
                       >
                          <Settings className="w-5 h-5" /> Re-Sync Cryo Nodes
                       </button>
                    </Reveal>
                 </div>
                 
                 <div className="relative">
                    <Reveal delay={0.3} x={40}>
                       <div className="aspect-square bg-[#0c0a10] border border-white/10 p-20 flex flex-col justify-between relative group overflow-hidden shadow-2xl">
                          <div className="absolute top-0 right-0 p-80 bg-purple-400 opacity-[0.02] blur-[150px] rounded-full group-hover:opacity-[0.05] transition-opacity" />
                          
                          <div className="flex justify-between items-start z-10">
                             <div className="flex flex-col gap-3">
                                <span className="text-[10px] font-black text-white/10 uppercase tracking-[0.5em]">Bio_Link // NUC-CRYPT-v42</span>
                                <span className="text-[12px] font-black text-white/40 uppercase tracking-[0.6em]">Molecular_Stability_Telemetry</span>
                             </div>
                             <Wifi className="w-6 h-6 text-purple-400" />
                          </div>
                          
                          {/* VAULT VISUALIZER (SVG) */}
                          <div className="relative z-10 flex flex-col items-center justify-center h-full">
                             <div className="w-64 h-64 border border-purple-400/5 rounded-full flex items-center justify-center relative">
                                <motion.div 
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                  className="absolute inset-0 border-t-2 border-purple-400/20 rounded-full" 
                                />
                                <motion.div 
                                  animate={{ rotate: -360 }}
                                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                  className="absolute inset-8 border-b-2 border-purple-400/10 rounded-full" 
                                />
                                <Lock className={`w-24 h-24 transition-colors duration-1000 ${isCryoLockActive ? "text-purple-400 animate-pulse" : "text-white/5"}`} />
                             </div>
                             <div className="mt-16 text-center space-y-6">
                                <div className={`text-4xl font-black italic tracking-tighter ${isCryoLockActive ? "text-white" : "text-white/20"}`}>
                                   {isCryoLockActive ? "CRYO_LOCKED" : "CRYO_LEAK_DETECTED"}
                                </div>
                                <span className="text-[11px] font-bold text-white/10 uppercase tracking-[0.6em] block">Auth_Node: CRYPT_UNIT_01</span>
                             </div>
                          </div>

                          <div className="relative z-10 flex gap-6">
                             <div className="flex-1 h-1 bg-white/5 overflow-hidden">
                                <motion.div 
                                   animate={isCryoLockActive ? { x: ["-100%", "100%"] } : {}}
                                   transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                   className="w-1/2 h-full bg-purple-700"
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
            4. CRYPT STORY (TECH STORYTELLING)
            ========================================== */}
        <section className="py-60 bg-[#050208] relative overflow-hidden border-t border-white/5">
           <div className="max-w-[1400px] mx-auto px-8 md:px-24">
              <div className="grid lg:grid-cols-2 gap-40 items-center">
                 <div className="relative aspect-[3/4] overflow-hidden group border border-white/5 shadow-2xl">
                    <Image 
                       src="https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=1200&auto=format&fit=crop" 
                       alt="Bio-Digital Crypt Infrastructure" 
                       fill 
                       className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2000ms]"
                    />
                    <div className="absolute inset-0 bg-purple-900/10 mix-blend-color group-hover:opacity-0 transition-opacity" />
                    <div className="absolute inset-0 p-20 flex flex-col justify-end bg-gradient-to-t from-black via-black/40 to-transparent">
                       <div className="text-white">
                          <span className="text-[11px] font-black uppercase tracking-[0.6em] text-purple-500 mb-8 block italic underline underline-offset-8 decoration-purple-400/20">Atelier // Molecular // Unit</span>
                          <h4 className="text-6xl font-black tracking-tighter uppercase italic mb-12 mix-blend-difference text-white">Nucleo <br/> Fabric.</h4>
                          <button className="flex items-center gap-6 text-[11px] font-black uppercase tracking-[0.4em] border-b border-white/20 pb-4 hover:border-purple-400 transition-all group">
                             Encoding Protocols <ExternalLink className="w-5 h-5 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                          </button>
                       </div>
                    </div>
                 </div>

                 <div>
                    <Reveal>
                       <div className="mb-24 text-left">
                          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-purple-500 mb-8 block italic">Chapitre III // Encodage</span>
                          <h2 className="text-7xl md:text-[10vw] font-black tracking-tighter uppercase text-white italic leading-none text-white">Pure_Code.</h2>
                       </div>
                       <p className="text-2xl font-light text-white/20 leading-relaxed italic mb-20 uppercase tracking-[0.2em]">
                          L'ADN est le support de données ultime. Nous utilisons les outils de la biologie synthétique pour traduire le binaire en bases nucléiques, offrant un stockage d'une densité et d'une longévité inégalées.
                       </p>
                       <div className="space-y-20">
                          {[
                            { t: "Binary Mapping", d: "Traduction des octets numériques en séquences de nucléotides A-T-C-G via des algorithmes propriétaires d'évitement de répétitions." },
                            { t: "DNA Synthesis", d: "Synthèse chimique de haute précision des brins d'ADN porteurs de l'information, assemblés base par base." },
                            { t: "Silica Encapsulation", d: "Protection des brins synthétisés dans des micro-capsules de silice, imitant la fossilisation naturelle pour une stabilité millénaire." }
                          ].map((step, i) => (
                            <div key={i} className="group flex gap-12 border-b border-white/5 pb-16 hover:border-purple-400/20 transition-all cursor-default">
                               <div className="text-6xl font-black text-white/5 group-hover:text-purple-400/20 transition-colors italic leading-none">0{i+1}</div>
                               <div>
                                  <h5 className="text-3xl font-black uppercase tracking-tight text-white mb-6 italic group-hover:translate-x-4 transition-transform text-white">{step.t}</h5>
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
        <footer className="bg-black pt-60 pb-12 px-8 md:px-24 relative z-50">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-32 mb-60 text-white">
              <div className="lg:col-span-2">
                 <div className="flex items-center gap-6 mb-16">
                    <div className="w-16 h-16 bg-purple-800 flex items-center justify-center">
                      <Dna className="w-10 h-10 text-white" />
                    </div>
                    <span className="text-4xl font-black uppercase tracking-tighter italic">BIO-DIGITAL<span className="text-white/20">CRYPT.</span></span>
                 </div>
                 <p className="text-white/20 text-[11px] font-black uppercase tracking-[0.5em] leading-loose max-w-sm mb-20 italic">
                    "L'avenir de l'information est biologique." — Archive Crypt V.42
                 </p>
                 <div className="flex gap-16">
                    {["StorageLog", "ArchiveRegistry", "GitHub", "X_Protocol"].map(s => (
                      <Link key={s} href="#" className="text-[11px] font-black uppercase tracking-widest text-white/20 hover:text-purple-400 transition-colors italic underline underline-offset-8 decoration-white/5">{s}</Link>
                    ))}
                 </div>
              </div>

              {[
                { t: "ARCHIVES", l: ["Humanity's Heritage v4", "Seed Genome Vault", "Post-Quantum Keys", "Cultural Legacy"] },
                { t: "TECHNOLOGY", l: ["DNA Synthesis", "Silica Encap", "Cryo-Storage", "SLA Reports"] },
                { t: "ATELIER", l: ["Our Legacy", "Data Ethics", "Locations", "Support"] }
              ].map((col, i) => (
                <div key={i} className="flex flex-col gap-12">
                  <h4 className="text-[11px] font-black text-purple-400 uppercase tracking-[0.6em] italic">{col.t}</h4>
                  <ul className="flex flex-col gap-8">
                    {col.l.map(link => (
                      <li key={link} className="text-[11px] font-bold text-white/20 hover:text-white transition-colors cursor-pointer uppercase tracking-[0.4em] italic">{link}</li>
                    ))}
                  </ul>
                </div>
              ))}
           </div>

           <div className="max-w-[1600px] mx-auto border-t border-white/5 pt-16 flex flex-col md:flex-row justify-between items-center gap-16 text-[10px] font-black text-white/10 uppercase tracking-[0.6em] italic">
              <span>© 2026 BIO-DIGITAL CRYPT MOLECULAR SYSTEMS AG. // ALL_RIGHTS_RESERVED</span>
              <div className="flex gap-16">
                 <span>STATUS: OPERATIONAL</span>
                 <span>DENSITY: 215 PB/G (AVG)</span>
                 <span>v4.12.0-STABLE</span>
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

function HUD_Overlay({ isCryoLockActive }: { isCryoLockActive: boolean }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
       {/* Corner Brackets */}
       <div className={`absolute top-12 left-12 w-20 h-20 border-t-2 border-l-2 transition-colors duration-1000 ${isCryoLockActive ? "border-purple-400" : "border-white/10"}`} />
       <div className={`absolute top-12 right-12 w-20 h-20 border-t-2 border-r-2 transition-colors duration-1000 ${isCryoLockActive ? "border-purple-400" : "border-white/10"}`} />
       <div className={`absolute bottom-12 left-12 w-20 h-20 border-b-2 border-l-2 transition-colors duration-1000 ${isCryoLockActive ? "border-purple-400" : "border-white/10"}`} />
       <div className={`absolute bottom-12 right-12 w-20 h-20 border-b-2 border-r-2 transition-colors duration-1000 ${isCryoLockActive ? "border-purple-400" : "border-white/10"}`} />

       {/* Top Status Bar */}
       <div className="absolute top-12 left-1/2 -translate-x-1/2 flex items-center gap-20 bg-black/60 backdrop-blur-2xl px-12 py-4 border border-white/10 rounded-none">
          <div className="flex items-center gap-6 text-white">
             <div className={`w-3 h-3 transition-colors duration-500 ${isCryoLockActive ? "bg-purple-400 animate-pulse" : "bg-red-500 animate-ping"}`} />
             <span className="text-[10px] font-black uppercase tracking-[0.4em] italic leading-none">Storage_Sync: {isCryoLockActive ? "NOMINAL" : "CRYO_LEAK_DETECTED"} // Status: ACTIVE</span>
          </div>
          <div className="h-4 w-px bg-white/20" />
          <div className="flex items-center gap-6 text-white/20">
             <Wifi className="w-4 h-4" /> 
             <span className="text-[10px] font-black uppercase tracking-[0.4em] italic leading-none">Molecular_Grid: SECURE</span>
          </div>
       </div>

       {/* Right Rotation Info */}
       <div className="absolute right-12 top-1/2 -translate-y-1/2 rotate-90 origin-right hidden lg:block">
          <span className="text-[10px] font-black uppercase tracking-[0.8em] text-white/5 italic">Unauthorized_Duplication_Of_Molecular_Patterns_Is_Strictly_Monitored_By_Global_Crypt_Alliance</span>
       </div>
    </div>
  )
}
