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
  Snowflake, ShieldCheck, Thermometer, 
  Droplets, Wind, Mountain, Compass, 
  ArrowRight, Menu, X, Plus, 
  Maximize2, Share2, Download, ExternalLink, 
  Archive, Hash, Wifi, BarChart3, 
  Microscope, Fingerprint, Scan, Brain,
  Layers, Frame, Box, Database, 
  Server, Cpu, Target, Orbit, 
  Atom, Satellite, Milestone, Power, 
  Settings, AlertTriangle, Info, 
  ChevronRight, Play, Lock, Key, 
  BookOpen, Radio, Activity, Zap,
  Dna, CloudSnow, MapPin, Gauge
} from "lucide-react"

/* ==========================================================================
   GLACIAL VAULT DATASET (ULTRA DENSITY)
   ========================================================================== */

const CRYO_ARCHIVES = [
  {
    id: "arch-dna-01",
    name: "Mammalian Genome Matrix",
    type: "Genetic Data",
    temp: "-82°C",
    integrity: "99.998%",
    duration: "10,000 Years",
    desc: "Séquençage complet des mammifères terrestres pour la restauration post-extinction.",
    status: "Secure"
  },
  {
    id: "arch-seed-42",
    name: "Global Seed Repository",
    type: "Biological Assets",
    temp: "-18°C",
    integrity: "100%",
    duration: "1,500 Years",
    desc: "Banque de semences mondiale assurant la sécurité alimentaire future.",
    status: "Nominal"
  },
  {
    id: "arch-data-99",
    name: "Civilization Ledger",
    type: "Digital Heritage",
    temp: "-25°C",
    integrity: "99.999%",
    duration: "PERPETUAL",
    desc: "Archives numériques de l'histoire humaine, stockées sur supports optiques inaltérables.",
    status: "Active"
  }
]

const VAULT_METRICS = [
  { label: "Internal Temp", value: "-80.4°C", trend: "Stable" },
  { label: "Permafrost Depth", value: "420m", trend: "Deepening" },
  { label: "Passive Cooling", value: "Active", trend: "Optimal" },
  { label: "Core Security", value: "Level 9", trend: "Maximum" }
]

const SYSTEM_LOGS = [
  { time: "02:14:02", entry: "CRYO_PUMP_A: OPTIMIZING_FLOW", level: "INFO" },
  { time: "02:14:08", entry: "BIOMETRIC_SCAN: NODE_ZUG_04", level: "ACCESS" },
  { time: "02:14:15", entry: "EXTERNAL_TEMP: -42°C", level: "ENV" }
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

function SnowParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
       {[...Array(50)].map((_, i) => (
         <motion.div 
           key={i}
           initial={{ y: -20, x: Math.random() * 2000, opacity: 0 }}
           animate={{ 
              y: 2000, 
              x: (Math.random() * 2000) + (Math.random() * 100 - 50),
              opacity: [0, 1, 0]
           }}
           transition={{ 
              duration: Math.random() * 10 + 5, 
              repeat: Infinity, 
              delay: Math.random() * 10 
           }}
           className="w-1 h-1 bg-white rounded-full absolute"
         />
       ))}
    </div>
  )
}

/* ==========================================================================
   THE GLACIAL VAULT - MAIN INTERFACE
   ========================================================================== */

export default function GlacialVaultPremium() {
  const [activeLog, setActiveLog] = useState(0)
  const [vaultUnlocked, setVaultUnlocked] = useState(false)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })

  // Parallax & Depth Effects
  const iceOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.2])
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.2])
  const textBlur = useTransform(scrollYProgress, [0, 0.1], ["blur(0px)", "blur(10px)"])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLog(prev => (prev + 1) % SYSTEM_LOGS.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div ref={containerRef} className="bg-[#0a0c0f] text-[#d1d9e0] font-sans selection:bg-cyan-500/30 selection:text-white min-h-screen overflow-x-hidden">
      
      {/* GLOBAL HUD OVERLAY */}
      <HUD_Overlay activeLog={activeLog} />

      <main>
        {/* ==========================================
            1. FROST IGNITION (HERO)
            ========================================== */}
        <section className="relative h-screen flex flex-col justify-center items-center px-8 md:px-24 overflow-hidden pt-20">
          <SnowParticles />
          <motion.div style={{ opacity: iceOpacity, scale: heroScale }} className="absolute inset-0 z-0">
             <Image 
                src="https://images.unsplash.com/photo-1478719059408-592965723cbc?q=80&w=2400&auto=format&fit=crop" 
                alt="Arctic Ice Cave" 
                fill 
                className="object-cover opacity-30 grayscale blur-sm"
                priority
             />
             <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c0f] via-transparent to-[#0a0c0f]" />
          </motion.div>

          <div className="relative z-10 text-center max-w-7xl">
             <Reveal>
                <div className="inline-flex items-center gap-4 px-4 py-1 border border-cyan-400/30 bg-cyan-400/5 text-[10px] font-bold uppercase tracking-[0.5em] text-cyan-400 mb-12 italic">
                   <ShieldCheck className="w-3 h-3" /> Integrity_Status: 100% // Thermal_Lock_Engaged
                </div>
                <motion.h1 style={{ filter: textBlur }} className="text-7xl md:text-[14vw] font-black tracking-tighter uppercase mb-16 leading-[0.75] italic">
                   Deep <br/> <span className="text-white/5 italic">Time_Archive.</span>
                </motion.h1>
                <div className="grid md:grid-cols-3 gap-12 md:gap-24 text-left max-w-5xl mx-auto border-t border-white/5 pt-16">
                   <div className="space-y-4">
                      <h3 className="text-[10px] font-black uppercase tracking-widest text-cyan-400">The Directive</h3>
                      <p className="text-[11px] text-white/20 leading-loose uppercase tracking-widest font-bold italic">
                         Nous assurons la préservation éternelle du patrimoine biologique et numérique de l'humanité dans le permafrost arctique.
                      </p>
                   </div>
                   <div className="flex flex-col justify-end">
                      <span className="text-5xl font-light tracking-tighter italic text-white/60">-80°C</span>
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Operational Temperature</span>
                   </div>
                   <div className="flex flex-col justify-end">
                      <span className="text-5xl font-light tracking-tighter italic text-white/60">10K</span>
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Years Guarantee</span>
                   </div>
                </div>
             </Reveal>
          </div>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
             <span className="text-[8px] font-black uppercase tracking-[0.5em] text-white/10">Descend_To_Archives</span>
             <div className="h-20 w-px bg-gradient-to-b from-cyan-400/50 to-transparent" />
          </div>
        </section>

        {/* ==========================================
            2. CRYO REGISTRY (DENSE TECHNICAL)
            ========================================== */}
        <section className="py-60 bg-[#080a0c] relative border-y border-white/5 overflow-hidden">
           <div className="max-w-[1600px] mx-auto px-8 md:px-24">
              <div className="flex flex-col md:flex-row items-end justify-between mb-40 gap-12">
                 <Reveal>
                    <span className="text-[10px] font-black uppercase tracking-[0.6em] text-cyan-400 block mb-6 italic underline underline-offset-8">Storage // Matrix</span>
                    <h2 className="text-6xl md:text-[9vw] font-black uppercase tracking-tighter italic leading-none">Archives.</h2>
                 </Reveal>
                 <div className="text-right">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 block mb-4 italic">Registry // Deep_Vault_Audit</span>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-400">L'Architecture de la Conservation</p>
                 </div>
              </div>

              <div className="grid md:grid-cols-3 gap-px bg-white/5 border border-white/5">
                 {CRYO_ARCHIVES.map((arch, i) => (
                   <Reveal key={arch.id} delay={i * 0.1}>
                      <div className="bg-[#0a0c0f] p-16 flex flex-col h-full hover:bg-white/5 transition-all group cursor-crosshair">
                         <div className="flex justify-between items-start mb-16">
                            <div className="w-12 h-12 bg-white/5 flex items-center justify-center group-hover:bg-cyan-600 transition-all duration-500">
                               <Dna className="w-6 h-6 text-cyan-400 group-hover:text-white" />
                            </div>
                            <span className="px-3 py-1 bg-cyan-400/10 text-cyan-400 text-[8px] font-black uppercase tracking-widest">{arch.status}</span>
                         </div>
                         
                         <h3 className="text-3xl font-black uppercase tracking-tighter mb-8 italic">{arch.name}</h3>
                         <div className="text-[10px] font-black text-cyan-400/60 uppercase tracking-widest mb-8">{arch.type}</div>
                         
                         <div className="space-y-6 mb-16 border-l border-white/10 pl-6">
                            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                               <span className="text-white/20">Temp</span>
                               <span className="text-white group-hover:text-cyan-400 transition-colors">{arch.temp}</span>
                            </div>
                            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                               <span className="text-white/20">Duration</span>
                               <span className="text-white group-hover:text-cyan-400 transition-colors">{arch.duration}</span>
                            </div>
                            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                               <span className="text-white/20">Integrity</span>
                               <span className="text-white group-hover:text-cyan-400 transition-colors">{arch.integrity}</span>
                            </div>
                         </div>

                         <p className="text-[11px] text-white/30 leading-loose uppercase tracking-[0.2em] font-bold italic mb-12">
                            {arch.desc}
                         </p>

                         <div className="mt-auto pt-8 border-t border-white/5 flex justify-between items-center">
                            <span className="text-[9px] font-black text-white/20 uppercase">Ref: {arch.id}</span>
                            <button className="text-[9px] font-black uppercase text-cyan-400 flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                               View Log <ChevronRight className="w-4 h-4" />
                            </button>
                         </div>
                      </div>
                   </Reveal>
                 ))}
              </div>
           </div>
        </section>

        {/* ==========================================
            3. THERMAL MONITORING (INTERACTIVE DATA)
            ========================================== */}
        <section className="py-60 bg-black relative border-y border-white/5 overflow-hidden">
           <div className="max-w-[1400px] mx-auto px-8 md:px-24">
              <div className="grid lg:grid-cols-2 gap-32 items-center">
                 <div>
                    <Reveal>
                       <span className="text-[10px] font-black uppercase tracking-[0.5em] text-cyan-400 block mb-12 italic underline underline-offset-8">Thermal // Dynamics</span>
                       <h2 className="text-6xl md:text-[8vw] font-light italic leading-none text-white mb-12 uppercase tracking-tighter">
                          The <br/> <span className="not-italic font-black text-white/5 italic">Permafrost_Sync.</span>
                       </h2>
                       <p className="text-xl font-light text-white/20 leading-relaxed mb-20 italic uppercase tracking-widest">
                          Le maintien de la stabilité thermique est critique. Nos systèmes de refroidissement passif utilisent la température naturelle de l'arctique pour garantir une isolation absolue sans énergie externe.
                       </p>
                       <div className="grid grid-cols-2 gap-8 mb-20">
                          {VAULT_METRICS.map((metric, i) => (
                            <div key={i} className="p-10 bg-[#080a0c] border border-white/5 group hover:border-cyan-400/30 transition-all">
                               <div className="text-[9px] font-black uppercase text-cyan-400 mb-4 tracking-[0.3em]">{metric.label}</div>
                               <div className="text-4xl font-light text-white italic">{metric.value}</div>
                               <div className="flex items-center gap-2 text-[8px] font-bold uppercase tracking-widest text-white/20 italic">
                                  <Activity className="w-3 h-3" /> {metric.trend}
                               </div>
                            </div>
                          ))}
                       </div>
                       <button className="w-full py-6 bg-cyan-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-2xl flex items-center justify-center gap-4 italic">
                          <Thermometer className="w-4 h-4" /> Calibrate Thermal Sensors
                       </button>
                    </Reveal>
                 </div>
                 
                 <div className="relative">
                    <Reveal delay={0.3} x={40}>
                       <div className="aspect-square bg-[#080a0c] border border-white/10 p-16 flex flex-col justify-between relative group overflow-hidden">
                          <div className="absolute top-0 right-0 p-60 bg-cyan-600 opacity-[0.03] blur-[120px] rounded-full group-hover:opacity-[0.1] transition-opacity" />
                          
                          <div className="flex justify-between items-start z-10">
                             <div className="flex flex-col gap-2">
                                <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">System_ID // FROST-LOCK-v4</span>
                                <span className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Passive_Flow_Monitoring</span>
                             </div>
                             <Wifi className="w-5 h-5 text-cyan-400" />
                          </div>
                          
                          <div className="relative z-10 flex flex-col items-center gap-12">
                             <div className="w-32 h-32 border-2 border-dashed border-cyan-400/20 rounded-full flex items-center justify-center relative">
                                <motion.div 
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                  className="absolute inset-0 border-t-2 border-cyan-600 rounded-full" 
                                />
                                <CloudSnow className="w-12 h-12 text-cyan-600" />
                             </div>
                             <div className="text-center space-y-4">
                                <div className="text-4xl font-black italic tracking-tighter text-white">CRYOGENIC_STABLE</div>
                                <span className="text-[9px] font-bold text-white/10 uppercase tracking-[0.5em]">Auth_Node: SVALBARD_MAIN</span>
                             </div>
                          </div>

                          <div className="relative z-10 flex gap-4">
                             <div className="w-full h-1 bg-white/5 overflow-hidden">
                                <motion.div 
                                   animate={{ x: ["-100%", "100%"] }} 
                                   transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                                   className="w-1/2 h-full bg-cyan-600"
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
            4. CONSERVATION PROTOCOLS (TECH STORYTELLING)
            ========================================== */}
        <section className="py-60 bg-[#0a0c0f] relative overflow-hidden">
           <div className="max-w-[1400px] mx-auto px-8 md:px-24">
              <div className="grid lg:grid-cols-2 gap-32 items-center">
                 <div className="relative aspect-[4/5] overflow-hidden group border border-white/10 shadow-2xl">
                    <Image 
                       src="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=1200&auto=format&fit=crop" 
                       alt="Night Sky Over Arctic" 
                       fill 
                       className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                    />
                    <div className="absolute inset-0 bg-cyan-900/10 mix-blend-color group-hover:opacity-0 transition-opacity" />
                    <div className="absolute inset-0 p-16 flex flex-col justify-end bg-gradient-to-t from-black via-black/40 to-transparent">
                       <div className="text-white">
                          <span className="text-[10px] font-black uppercase tracking-[0.6em] text-cyan-400 mb-6 block italic underline underline-offset-8">Global // Ethics // Council</span>
                          <h4 className="text-5xl font-black tracking-tighter uppercase italic mb-8">Heritage <br/> Deep Shield.</h4>
                          <button className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest border-b border-cyan-400 pb-2">
                             Full Protocols <ExternalLink className="w-4 h-4" />
                          </button>
                       </div>
                    </div>
                 </div>

                 <div>
                    <Reveal>
                       <div className="mb-24 text-left">
                          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-cyan-400 mb-8 block italic">Chapitre III // Ethics</span>
                          <h2 className="text-6xl md:text-[8vw] font-black tracking-tighter uppercase text-white italic leading-none">Safe_Passage.</h2>
                       </div>
                       <p className="text-xl font-light text-white/30 leading-relaxed italic mb-16 uppercase tracking-widest">
                          La préservation sur le long terme soulève des questions éthiques fondamentales. Nos protocoles garantissent l'accès universel et l'intégrité des archives face aux fluctuations politiques du futur.
                       </p>
                       <div className="space-y-16">
                          {[
                            { t: "Temporal Neutrality", d: "Indépendance absolue vis-à-vis des juridictions nationales pour garantir la sécurité des archives." },
                            { t: "Genetic Sovereignty", d: "Protection rigoureuse de la propriété biologique et des séquences ADN archivées." },
                            { t: "Digital Continuity", d: "Systèmes de lecture universels conçus pour être décodés sans technologie spécifique dans 5000 ans." }
                          ].map((step, i) => (
                            <div key={i} className="group flex gap-12 border-b border-white/5 pb-12 hover:border-cyan-400/30 transition-all cursor-default">
                               <div className="text-5xl font-black text-white/5 group-hover:text-cyan-400/20 transition-colors italic">0{i+1}</div>
                               <div>
                                  <h5 className="text-2xl font-bold uppercase tracking-tight text-white mb-4 italic group-hover:text-cyan-400 transition-colors">{step.t}</h5>
                                  <p className="text-[10px] text-white/20 uppercase tracking-[0.2em] font-bold leading-relaxed">{step.d}</p>
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
                 <div className="flex items-center gap-4 mb-12">
                    <div className="w-12 h-12 bg-cyan-600 flex items-center justify-center">
                      <Snowflake className="w-8 h-8 text-white" />
                    </div>
                    <span className="text-3xl font-black uppercase tracking-tighter italic">GLACIAL<span className="text-cyan-400">_VAULT.</span></span>
                 </div>
                 <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.4em] leading-loose max-w-sm mb-16 italic">
                    "Nous construisons le futur en préservant le passé." — Archive Glacial V.12
                 </p>
                 <div className="flex gap-12">
                    {["ArchiveLog", "BioRegistry", "GitHub", "X_Protocol"].map(s => (
                      <Link key={s} href="#" className="text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-cyan-400 transition-colors italic">{s}</Link>
                    ))}
                 </div>
              </div>

              {[
                { t: "ARCHIVES", l: ["Genetic Bank", "Seed Vault", "Digital Ledger", "Cultural Art"] },
                { t: "OPERATIONS", l: ["Thermal Sync", "Security Lvl 9", "Biometric Audit", "Network Status"] },
                { t: "FACILITIES", l: ["Svalbard Main", "Antarctic Node", "Alpine Vault", "Greenland Hub"] }
              ].map((col, i) => (
                <div key={i} className="flex flex-col gap-12">
                  <h4 className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.5em] italic">{col.t}</h4>
                  <ul className="flex flex-col gap-6">
                    {col.l.map(link => (
                      <li key={link} className="text-[10px] font-bold text-white/20 hover:text-white transition-colors cursor-pointer uppercase tracking-widest italic">{link}</li>
                    ))}
                  </ul>
                </div>
              ))}
           </div>

           <div className="max-w-[1600px] mx-auto border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-12 text-[8px] font-black text-white/10 uppercase tracking-[0.4em] italic">
              <span>© 2026 GLACIAL VAULT CONSERVATION GROUP. // ALL_RIGHTS_RESERVED</span>
              <div className="flex gap-12">
                 <span>STATUS: CRYOGENIC_OPTIMAL</span>
                 <span>LATENCY: 18ms</span>
                 <span>v12.4.0-STABLE</span>
              </div>
           </div>
        </footer>
      </main>

      {/* ACCESS OVERLAY (SIMULATED) */}
      <AnimatePresence>
        {vaultUnlocked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-8"
          >
             <div className="max-w-md w-full border border-cyan-400/30 p-12 relative bg-[#0a0c0f]">
                <button onClick={() => setVaultUnlocked(false)} className="absolute top-4 right-4 text-white/20 hover:text-white transition-colors">
                   <X className="w-8 h-8" />
                </button>
                <div className="flex flex-col items-center gap-12">
                   <div className="w-20 h-20 bg-cyan-400/10 flex items-center justify-center rounded-full">
                      <Fingerprint className="w-10 h-10 text-cyan-400" />
                   </div>
                   <div className="text-center">
                      <h2 className="text-2xl font-black uppercase tracking-tighter mb-4 italic">Deep_Vault_Auth</h2>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-white/20 leading-relaxed">
                         Veuillez scanner votre accréditation biométrique ou entrer votre clé de déchiffrement pour accéder aux archives sensibles.
                      </p>
                   </div>
                   <div className="w-full space-y-4">
                      <input 
                         type="text" 
                         placeholder="AUTH_ACCESS_KEY"
                         className="w-full bg-white/5 border border-white/10 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.3em] outline-none focus:border-cyan-400 text-white"
                      />
                      <button className="w-full py-4 bg-cyan-600 text-white text-[10px] font-black uppercase tracking-widest">
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

/* ==========================================
   TECHNICAL SUB-COMPONENTS
   ========================================== */

function HUD_Overlay({ activeLog }: { activeLog: number }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
       {/* Corner Brackets */}
       <div className="absolute top-12 left-12 w-16 h-16 border-t border-l border-white/10" />
       <div className="absolute top-12 right-12 w-16 h-16 border-t border-r border-white/10" />
       <div className="absolute bottom-12 left-12 w-16 h-16 border-b border-l border-white/10" />
       <div className="absolute bottom-12 right-12 w-16 h-16 border-b border-r border-white/10" />

       {/* Top Status Bar */}
       <div className="absolute top-12 left-1/2 -translate-x-1/2 flex items-center gap-16 bg-black/40 backdrop-blur-md px-10 py-3 border border-white/5 rounded-full">
          <div className="flex items-center gap-4">
             <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
             <span className="text-[9px] font-black text-white/60 uppercase tracking-[0.2em]">Archive_Link: SECURE</span>
          </div>
          <div className="h-4 w-px bg-white/10" />
          <div className="flex items-center gap-4 text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">
             <Wifi className="w-3 h-3" /> Relay: Stable
          </div>
       </div>

       {/* Left Live Logs */}
       <div className="absolute left-12 top-1/2 -translate-y-1/2 flex flex-col gap-2 hidden lg:flex">
          {SYSTEM_LOGS.map((log, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: i === activeLog ? 1 : 0.1, x: i === activeLog ? 0 : -10 }}
              className={`text-[8px] font-mono font-bold ${i === activeLog ? "text-cyan-400" : "text-white"}`}
            >
              [{log.time}] {log.entry}
            </motion.div>
          ))}
       </div>

       {/* Right Rotation Info */}
       <div className="absolute right-12 top-1/2 -translate-y-1/2 rotate-90 origin-right hidden lg:block">
          <span className="text-[8px] font-black uppercase tracking-[0.6em] text-white/5 italic">Unauthorized_Dumping_Of_Biological_Material_Is_Strictly_Prohibited_By_Arctic_Consortium_Law</span>
       </div>
    </div>
  )
}
