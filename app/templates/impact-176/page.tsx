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
  Rocket, Zap, Activity, Microscope, 
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
  Ghost, Ship, Anchor, Globe, 
  MapPin, Database, Search, Cpu, 
  BoxSelect, Construction, Move
} from "lucide-react"

/* ==========================================================================
   THE ORBITAL FORGE DATASET (ULTRA DENSITY)
   ========================================================================== */

const ORBITAL_ASSETS = [
  {
    id: "asset-hm-42",
    name: "Habitation Module v4",
    type: "Deep Space Life Support",
    mass: "420 Tons",
    integrity: "98.4 MPa",
    shielding: "Class-A (Solar)",
    desc: "Module d'habitation autonome avec systèmes de support de vie régénératifs et blindage multicouche contre les radiations cosmiques.",
    status: "Docked"
  },
  {
    id: "asset-sf-08",
    name: "Solar Farm Alpha",
    type: "Energy Generation",
    mass: "1,240 Tons",
    integrity: "84.2 MPa",
    shielding: "Class-B (Thermal)",
    desc: "Vaste réseau de panneaux solaires à haut rendement déployés en orbite géostationnaire pour alimenter les colonies lunaires.",
    status: "Under Construction"
  },
  {
    id: "asset-se-15",
    name: "Space Elevator Link",
    type: "Planetary Logistics",
    mass: "4,800 Tons",
    integrity: "240.5 MPa",
    shielding: "Class-S (Ion)",
    desc: "Segment de câble en nanotubes de carbone reliant l'orbite basse à la station de surface, optimisé pour le transport lourd.",
    status: "Operational"
  }
]

const ORBITAL_METRICS = [
  { label: "Orbital Speed", value: "7.8 km/s", trend: "Constant" },
  { label: "Structural Sync", value: "99.98%", trend: "Optimal" },
  { label: "Radiation Level", value: "0.02 mSv/h", trend: "Safe" },
  { label: "Module Alignment", value: "0.01mm", trend: "Precise" }
]

const FABRICATION_LOGS = [
  { timestamp: "14:14:42", unit: "Assembly-Drone-01", status: "LOCKED", torque: "420 Nm" },
  { timestamp: "14:14:45", unit: "Shielding-Infuser", status: "ACTIVE", flow: "1.2 L/s" },
  { timestamp: "14:14:48", unit: "Vacuum-Sync", status: "SUCCESS", pressure: "10^-11 Pa" }
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

function ZeroGMeshVisualizer() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY })
    window.addEventListener("mousemove", handleMouse)
    return () => window.removeEventListener("mousemove", handleMouse)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-5">
       <svg width="100%" height="100%" className="w-full h-full">
          {[...Array(20)].map((_, i) => (
            <motion.line 
               key={i}
               x1={`${Math.random() * 100}%`} 
               y1={`${Math.random() * 100}%`} 
               x2={`${Math.random() * 100}%`} 
               y2={`${Math.random() * 100}%`} 
               stroke="white" 
               strokeWidth="0.5" 
               animate={{ opacity: [0, 0.5, 0] }}
               transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 5 }}
            />
          ))}
          <motion.circle 
             animate={{ cx: mousePos.x, cy: mousePos.y }}
             transition={{ type: "spring", damping: 30, stiffness: 100 }}
             r="200" 
             fill="white" 
             className="opacity-20 blur-[120px]"
          />
       </svg>
    </div>
  )
}

function OrbitalHubModel({ progress }: { progress: any }) {
  const rotate = useTransform(progress, [0, 1], [0, 360])
  const scale = useTransform(progress, [0, 0.5, 1], [1, 1.2, 1])

  return (
    <motion.div style={{ rotate, scale }} className="relative w-80 h-80 flex items-center justify-center">
       <div className="absolute inset-0 border border-white/10 rounded-full animate-spin-slow shadow-[0_0_80px_rgba(255,255,255,0.05)]" />
       <Satellite className="w-40 h-40 text-white/10 animate-pulse" />
       <div className="absolute inset-8 border border-white/5 rounded-full" />
    </motion.div>
  )
}

/* ==========================================
   THE ORBITAL FORGE - MAIN INTERFACE
   ========================================== */

export default function OrbitalForgePremium() {
  const [activeAsset, setActiveAsset] = useState(0)
  const [isOrbitalLockActive, setIsOrbitalLockActive] = useState(true)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })

  // Orbital Scroll Effects
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const textX = useTransform(scrollYProgress, [0, 0.5], [0, -100])

  return (
    <div ref={containerRef} className="bg-[#020408] text-[#e0e8ed] font-mono selection:bg-white/10 selection:text-white min-h-screen overflow-x-hidden transition-colors duration-1000">
      
      {/* GLOBAL HUD OVERLAY */}
      <HUD_Overlay isOrbitalLockActive={isOrbitalLockActive} />

      <main>
        {/* ==========================================
            1. VACUUM IGNITION (HERO)
            ========================================== */}
        <section className="relative h-screen flex flex-col justify-center items-center px-8 md:px-24 overflow-hidden pt-20">
          <ZeroGMeshVisualizer />
          <motion.div style={{ opacity: heroOpacity }} className="absolute z-0 pointer-events-none flex items-center justify-center">
             <OrbitalHubModel progress={scrollYProgress} />
          </motion.div>

          <div className="relative z-10 text-center max-w-7xl">
             <Reveal>
                <div className="inline-flex items-center gap-4 px-6 py-2 border border-white/30 bg-white/5 text-[10px] font-black uppercase tracking-[0.5em] text-white mb-12 italic">
                   <Orbit className="w-4 h-4" /> Orbital_Sync: NOMINAL // Velocity: 7.8 km/s
                </div>
                <motion.h1 style={{ x: textX }} className="text-7xl md:text-[14vw] font-black tracking-tighter uppercase mb-16 leading-[0.75] italic">
                   Orbital <br/> <span className="text-white/5 italic">Forge.</span>
                </motion.h1>
                <p className="max-w-3xl mx-auto text-sm md:text-lg text-white/30 leading-relaxed uppercase tracking-widest font-light mb-16 italic">
                   L'ingénierie des méga-structures par l'assemblage en micro-gravité. Nous construisons les infrastructures de demain en orbite basse et au-delà.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                   <button className="px-12 py-6 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-transparent hover:text-white border border-transparent hover:border-white transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)] flex items-center gap-4 italic">
                      <Construction className="w-5 h-5" /> Initialize Forge
                   </button>
                   <button className="px-12 py-6 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all flex items-center gap-4 italic">
                      <Archive className="w-5 h-5" /> Asset Registry
                   </button>
                </div>
             </Reveal>
          </div>

          <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end border-t border-white/5 pt-12">
             <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4 text-[9px] font-bold text-white/20 uppercase tracking-widest italic">
                   <div className="w-16 h-px bg-white/10" />
                   Station_ID: FORGE-CORE-42
                </div>
                <div className="flex items-center gap-4 text-[9px] font-bold text-white/20 uppercase tracking-widest italic">
                   <div className="w-16 h-px bg-white/10" />
                   Docking_Status: ZERO-G_STABLE
                </div>
             </div>
             <div className="text-right flex flex-col items-end gap-4">
                <span className="text-[8px] font-black uppercase tracking-[0.5em] text-white/40">Structural_Gigue_Stream</span>
                <div className="flex gap-2 h-12 items-end">
                   {[...Array(16)].map((_, i) => (
                     <motion.div 
                        key={i}
                        animate={{ height: ["10%", "100%", "30%", "80%", "10%"] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                        className="w-2 bg-white/20"
                     />
                   ))}
                </div>
             </div>
          </div>
        </section>

        {/* ==========================================
            2. ORBITAL REGISTRY (DENSE TECHNICAL)
            ========================================== */}
        <section className="py-60 bg-[#04060a] relative border-y border-white/5 overflow-hidden">
           <div className="max-w-[1600px] mx-auto px-8 md:px-24">
              <div className="flex flex-col md:flex-row items-end justify-between mb-40 gap-12">
                 <Reveal>
                    <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/40 block mb-6 italic underline underline-offset-8 decoration-white/20">Orbital // Assets</span>
                    <h2 className="text-6xl md:text-[10vw] font-black uppercase tracking-tighter italic leading-none text-white">Archives.</h2>
                 </Reveal>
                 <div className="text-right">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 block mb-4 italic">Registry // Orbital_Audit</span>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">L'Architecture du Vide</p>
                 </div>
              </div>

              <div className="grid md:grid-cols-3 gap-px bg-white/5 border border-white/5 shadow-2xl">
                 {ORBITAL_ASSETS.map((asset, i) => (
                   <Reveal key={asset.id} delay={i * 0.1}>
                      <div className="bg-[#020408] p-20 flex flex-col h-full hover:bg-white/[0.02] transition-all group cursor-crosshair border-white/5 border-r last:border-r-0">
                         <div className="flex justify-between items-start mb-16">
                            <div className="w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                               <BoxSelect className="w-8 h-8" />
                            </div>
                            <span className={`px-4 py-2 bg-white/5 text-[9px] font-black uppercase tracking-[0.3em] ${asset.status === "Operational" ? "text-white" : "text-white/40"}`}>{asset.status}</span>
                         </div>
                         
                         <h3 className="text-4xl font-black uppercase tracking-tighter mb-8 italic text-white group-hover:translate-x-4 transition-transform">{asset.name}</h3>
                         <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] mb-12">{asset.type}</div>
                         
                         <div className="space-y-8 mb-20 border-l border-white/20 pl-8">
                            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
                               <span className="text-white/20">Mass</span>
                               <span className="text-white group-hover:text-white transition-colors">{asset.mass}</span>
                            </div>
                            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
                               <span className="text-white/20">Integrity</span>
                               <span className="text-white group-hover:text-white transition-colors">{asset.integrity}</span>
                            </div>
                            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
                               <span className="text-white/20">Shielding</span>
                               <span className="text-white group-hover:text-white transition-colors">{asset.shielding}</span>
                            </div>
                         </div>

                         <p className="text-[12px] text-white/30 leading-loose uppercase tracking-[0.2em] font-bold italic mb-16">
                            {asset.desc}
                         </p>

                         <div className="mt-auto pt-10 border-t border-white/5 flex justify-between items-center">
                            <span className="text-[10px] font-black text-white/10 uppercase tracking-widest">Ref: {asset.id}</span>
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
            3. ORBITAL MONITOR (INTERACTIVE DATA)
            ========================================== */}
        <section className="py-60 bg-black relative border-y border-white/5 overflow-hidden">
           <div className="max-w-[1400px] mx-auto px-8 md:px-24">
              <div className="grid lg:grid-cols-2 gap-40 items-center">
                 <div>
                    <Reveal>
                       <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40 block mb-12 italic underline underline-offset-8 decoration-white/20">Forge // Performance</span>
                       <h2 className="text-7xl md:text-[9vw] font-light italic leading-none text-white mb-16 uppercase tracking-tighter">
                          The <br/> <span className="not-italic font-black text-white/5 italic">Stability_Link.</span>
                       </h2>
                       <p className="text-2xl font-light text-white/20 leading-relaxed mb-24 italic uppercase tracking-[0.2em] max-w-xl">
                          Surveillance structurelle en temps réel. Nos capteurs analysent les contraintes mécaniques et l'alignement orbital pour garantir l'intégrité de chaque module assemblé.
                       </p>
                       <div className="grid grid-cols-2 gap-px bg-white/5 border border-white/5 mb-24 shadow-2xl">
                          {ORBITAL_METRICS.map((metric, i) => (
                            <div key={i} className="p-16 bg-[#0a0c0e] group hover:bg-white/[0.02] transition-all border-r border-b last:border-r-0 border-white/5">
                               <div className="text-[10px] font-black uppercase text-white/40 mb-6 tracking-[0.4em]">{metric.label}</div>
                               <div className="text-5xl font-black text-white italic mb-6 tracking-tighter group-hover:translate-x-4 transition-transform">{metric.value}</div>
                               <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.3em] text-white/10 italic">
                                  <Activity className="w-4 h-4 text-white" /> {metric.trend}
                               </div>
                            </div>
                          ))}
                       </div>
                       <button 
                         onClick={() => setIsOrbitalLockActive(!isOrbitalLockActive)}
                         className="w-full py-8 bg-white text-black text-[11px] font-black uppercase tracking-widest hover:bg-transparent hover:text-white border border-transparent hover:border-white transition-all shadow-2xl flex items-center justify-center gap-6 italic"
                       >
                          <Settings className="w-5 h-5" /> Re-Sync Orbital Nodes
                       </button>
                    </Reveal>
                 </div>
                 
                 <div className="relative">
                    <Reveal delay={0.3} x={40}>
                       <div className="aspect-square bg-[#0a0c0e] border border-white/10 p-20 flex flex-col justify-between relative group overflow-hidden shadow-2xl">
                          <div className="absolute top-0 right-0 p-80 bg-white opacity-[0.02] blur-[150px] rounded-full group-hover:opacity-[0.05] transition-opacity" />
                          
                          <div className="flex justify-between items-start z-10">
                             <div className="flex flex-col gap-3">
                                <span className="text-[10px] font-black text-white/10 uppercase tracking-[0.5em]">Forge_Link // ORB-SYNC-v42</span>
                                <span className="text-[12px] font-black text-white/40 uppercase tracking-[0.6em]">Zero-G_Stability_Map</span>
                             </div>
                             <Wifi className="w-6 h-6 text-white" />
                          </div>
                          
                          {/* ORBITAL VISUALIZER (SVG) */}
                          <div className="relative z-10 flex flex-col items-center justify-center h-full">
                             <div className="w-64 h-64 border border-white/5 rounded-full flex items-center justify-center relative">
                                <motion.div 
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                  className="absolute inset-0 border-t-2 border-white/20 rounded-full" 
                                />
                                <motion.div 
                                  animate={{ rotate: -360 }}
                                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                  className="absolute inset-8 border-b-2 border-white/10 rounded-full" 
                                />
                                <Target className={`w-24 h-24 transition-colors duration-1000 ${isOrbitalLockActive ? "text-white animate-pulse" : "text-white/5"}`} />
                             </div>
                             <div className="mt-16 text-center space-y-6">
                                <div className={`text-4xl font-black italic tracking-tighter ${isOrbitalLockActive ? "text-white" : "text-white/20"}`}>
                                   {isOrbitalLockActive ? "LOCK_STABLE" : "LOCK_WARNING"}
                                </div>
                                <span className="text-[11px] font-bold text-white/10 uppercase tracking-[0.6em] block">Auth_Node: FORGE_CORE_01</span>
                             </div>
                          </div>

                          <div className="relative z-10 flex gap-6">
                             <div className="flex-1 h-1 bg-white/5 overflow-hidden">
                                <motion.div 
                                   animate={isOrbitalLockActive ? { x: ["-100%", "100%"] } : {}}
                                   transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                   className="w-1/2 h-full bg-white"
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
            4. FORGE STORY (TECH STORYTELLING)
            ========================================== */}
        <section className="py-60 bg-[#020408] relative overflow-hidden border-t border-white/5">
           <div className="max-w-[1400px] mx-auto px-8 md:px-24">
              <div className="grid lg:grid-cols-2 gap-40 items-center">
                 <div className="relative aspect-[3/4] overflow-hidden group border border-white/5 shadow-2xl">
                    <Image 
                       src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1200&auto=format&fit=crop" 
                       alt="Orbital Station Construction" 
                       fill 
                       className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2000ms]"
                    />
                    <div className="absolute inset-0 bg-white/5 mix-blend-color group-hover:opacity-0 transition-opacity" />
                    <div className="absolute inset-0 p-20 flex flex-col justify-end bg-gradient-to-t from-black via-black/40 to-transparent">
                       <div className="text-white">
                          <span className="text-[11px] font-black uppercase tracking-[0.6em] text-white/40 mb-8 block italic underline underline-offset-8 decoration-white/20">Atelier // Purity // Unit</span>
                          <h4 className="text-6xl font-black tracking-tighter uppercase italic mb-12 mix-blend-difference text-white">Orbital <br/> Fabric.</h4>
                          <button className="flex items-center gap-6 text-[11px] font-black uppercase tracking-[0.4em] border-b border-white/20 pb-4 hover:border-white transition-all group">
                             Forge Protocols <ExternalLink className="w-5 h-5 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                          </button>
                       </div>
                    </div>
                 </div>

                 <div>
                    <Reveal>
                       <div className="mb-24 text-left">
                          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40 mb-8 block italic">Chapitre III // Construction</span>
                          <h2 className="text-7xl md:text-[10vw] font-black tracking-tighter uppercase text-white italic leading-none text-white">Pure_Sync.</h2>
                       </div>
                       <p className="text-2xl font-light text-white/20 leading-relaxed italic mb-20 uppercase tracking-[0.2em]">
                          Le vide est notre chantier. Nous assemblons des structures modulaires d'une complexité sans précédent, ouvrant la voie à une présence humaine permanente dans l'espace.
                       </p>
                       <div className="space-y-20">
                          {[
                            { t: "Modular Assembly", d: "Docking automatisé de segments de station avec une précision millimétrique en apesanteur." },
                            { t: "Structural Infusion", d: "Injection de polymères de renforcement dans les treillis structurels pour une rigidité maximale." },
                            { t: "Radiation Hardening", d: "Application de couches de protection multicouches pour protéger les équipements et les équipages." }
                          ].map((step, i) => (
                            <div key={i} className="group flex gap-12 border-b border-white/5 pb-16 hover:border-white/20 transition-all cursor-default">
                               <div className="text-6xl font-black text-white/5 group-hover:text-white/10 transition-colors italic leading-none">0{i+1}</div>
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
                    <div className="w-16 h-16 bg-white flex items-center justify-center">
                      <Satellite className="w-10 h-10 text-black" />
                    </div>
                    <span className="text-4xl font-black uppercase tracking-tighter italic">ORBITAL<span className="text-white/20">FORGE.</span></span>
                 </div>
                 <p className="text-white/20 text-[11px] font-black uppercase tracking-[0.5em] leading-loose max-w-sm mb-20 italic">
                    "La construction spatiale au service de l'humanité." — Archive Forge V.42
                 </p>
                 <div className="flex gap-16">
                    {["ForgeLog", "AssetRegistry", "GitHub", "X_Protocol"].map(s => (
                      <Link key={s} href="#" className="text-[11px] font-black uppercase tracking-widest text-white/20 hover:text-white transition-colors italic underline underline-offset-8 decoration-white/5">{s}</Link>
                    ))}
                 </div>
              </div>

              {[
                { t: "ASSETS", l: ["Habitation Module", "Solar Farm Alpha", "Space Elevator", "Hybrid Shield"] },
                { t: "TECHNOLOGY", l: ["Modular Assembly", "Zero-G Stability", "Radiation Shielding", "SLA Reports"] },
                { t: "ATELIER", l: ["Our Legacy", "Orbital Mapping", "Locations", "Support"] }
              ].map((col, i) => (
                <div key={i} className="flex flex-col gap-12">
                  <h4 className="text-[11px] font-black text-white/40 uppercase tracking-[0.6em] italic">{col.t}</h4>
                  <ul className="flex flex-col gap-8">
                    {col.l.map(link => (
                      <li key={link} className="text-[11px] font-bold text-white/20 hover:text-white transition-colors cursor-pointer uppercase tracking-[0.4em] italic">{link}</li>
                    ))}
                  </ul>
                </div>
              ))}
           </div>

           <div className="max-w-[1600px] mx-auto border-t border-white/5 pt-16 flex flex-col md:flex-row justify-between items-center gap-16 text-[10px] font-black text-white/10 uppercase tracking-[0.6em] italic">
              <span>© 2026 ORBITAL FORGE SPACE CONSTRUCTION AG. // ALL_RIGHTS_RESERVED</span>
              <div className="flex gap-16">
                 <span>STATUS: OPERATIONAL</span>
                 <span>VELOCITY: 7.8 km/s (AVG)</span>
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

function HUD_Overlay({ isOrbitalLockActive }: { isOrbitalLockActive: boolean }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
       {/* Corner Brackets */}
       <div className={`absolute top-12 left-12 w-20 h-20 border-t-2 border-l-2 transition-colors duration-1000 ${isOrbitalLockActive ? "border-white" : "border-white/10"}`} />
       <div className={`absolute top-12 right-12 w-20 h-20 border-t-2 border-r-2 transition-colors duration-1000 ${isOrbitalLockActive ? "border-white" : "border-white/10"}`} />
       <div className={`absolute bottom-12 left-12 w-20 h-20 border-b-2 border-l-2 transition-colors duration-1000 ${isOrbitalLockActive ? "border-white" : "border-white/10"}`} />
       <div className={`absolute bottom-12 right-12 w-20 h-20 border-b-2 border-r-2 transition-colors duration-1000 ${isOrbitalLockActive ? "border-white" : "border-white/10"}`} />

       {/* Top Status Bar */}
       <div className="absolute top-12 left-1/2 -translate-x-1/2 flex items-center gap-20 bg-black/60 backdrop-blur-2xl px-12 py-4 border border-white/10 rounded-none">
          <div className="flex items-center gap-6 text-white">
             <div className={`w-3 h-3 transition-colors duration-500 ${isOrbitalLockActive ? "bg-white animate-pulse" : "bg-red-500 animate-ping"}`} />
             <span className="text-[10px] font-black uppercase tracking-[0.4em] italic leading-none">Orbital_Sync: {isOrbitalLockActive ? "NOMINAL" : "SYNC_LOSS"} // Status: ACTIVE</span>
          </div>
          <div className="h-4 w-px bg-white/20" />
          <div className="flex items-center gap-6 text-white/20">
             <Wifi className="w-4 h-4" /> 
             <span className="text-[10px] font-black uppercase tracking-[0.4em] italic leading-none">Forge_Grid: SECURE</span>
          </div>
       </div>

       {/* Right Rotation Info */}
       <div className="absolute right-12 top-1/2 -translate-y-1/2 rotate-90 origin-right hidden lg:block">
          <span className="text-[10px] font-black uppercase tracking-[0.8em] text-white/5 italic">Unauthorized_Duplication_Of_Orbital_Patterns_Is_Strictly_Monitored_By_Global_Forge_Alliance</span>
       </div>
    </div>
  )
}
