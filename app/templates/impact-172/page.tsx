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
  Zap, Sun, Activity, Cpu, 
  Shield, Target, Layers, Box, 
  Hexagon, Terminal, Settings, Power, 
  Info, AlertTriangle, ChevronRight, 
  ArrowRight, Share2, Maximize2, 
  Download, ExternalLink, Archive, 
  Hash, Wifi, BarChart3, Fingerprint, 
  Scan, Brain, Server, ShieldCheck, 
  ShieldAlert, Award, Briefcase, 
  Wind, Thermometer, Droplets, 
  Flame, Battery, Radio, Gauge, 
  Timer, Lightbulb, Command, Grid, 
  Radar, Orbit, Atom, Satellite, 
  Milestone, FlaskConical, FlaskRound, 
  Ghost, Magnet, Hammer, Factory
} from "lucide-react"

/* ==========================================================================
   THE SOLAR FLARE DATASET (ULTRA DENSITY)
   ========================================================================== */

const FUSION_REACTORS = [
  {
    id: "reactor-tk-42",
    name: "Tokamak Alpha-9",
    type: "Magnetic Confinement",
    temp: "150M °C",
    q_factor: "Q=12.4",
    stability: "Optimal",
    desc: "Réacteur à fusion de nouvelle génération utilisant des aimants supraconducteurs à haute température pour un confinement plasma ultra-stable.",
    status: "Online"
  },
  {
    id: "reactor-st-08",
    name: "Stellarator-Z",
    type: "Helical Shield",
    temp: "120M °C",
    q_factor: "Q=8.2",
    stability: "High-Fidelity",
    desc: "Conception géométrique complexe éliminant le besoin de courant de plasma interne pour une exploitation continue et sécurisée.",
    status: "Maintenance"
  },
  {
    id: "reactor-ic-15",
    name: "Inertial Core X",
    type: "Laser Ignition",
    temp: "200M °C",
    q_factor: "Q=1.5 (Pulse)",
    stability: "Critical-Sync",
    desc: "Compression de cibles de deutérium-tritium par des faisceaux laser haute puissance pour une ignition instantanée.",
    status: "Approved"
  }
]

const PLASMA_METRICS = [
  { label: "Core Temp", value: "152.4M°C", trend: "Stable" },
  { label: "Magnetic Flux", value: "12.4 Tesla", trend: "Optimal" },
  { label: "Energy Output", value: "1.4 GW", trend: "High" },
  { label: "Tritium Ratio", value: "0.98", trend: "Constant" }
]

const REACTOR_LOGS = [
  { timestamp: "00:14:42", unit: "Confinement-Grid", status: "LOCKED", power: "98.4%" },
  { timestamp: "00:14:45", unit: "Helium-Exhaust", status: "NOMINAL", rate: "4.2 mg/s" },
  { timestamp: "00:14:48", unit: "Laser-Bank", status: "READY", charge: "100%" }
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

function PlasmaVisualizer() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY })
    window.addEventListener("mousemove", handleMouse)
    return () => window.removeEventListener("mousemove", handleMouse)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-10">
       <svg width="100%" height="100%" className="w-full h-full">
          {[...Array(15)].map((_, i) => (
            <motion.path 
               key={i}
               d={`M ${100 + i * 50} 0 Q ${200 + i * 100} 400 ${100 + i * 50} 800`}
               stroke="orange" 
               strokeWidth="0.5" 
               fill="none"
               animate={{ d: `M ${100 + i * 50} 0 Q ${mousePos.x + (i * 20)} ${mousePos.y} ${100 + i * 50} 800` }}
               transition={{ type: "spring", damping: 20, stiffness: 40 }}
            />
          ))}
       </svg>
    </div>
  )
}

function FusionModel({ progress }: { progress: any }) {
  const rotate = useTransform(progress, [0, 1], [0, 360])
  const scale = useTransform(progress, [0, 0.5, 1], [1, 1.2, 1])

  return (
    <motion.div style={{ rotate, scale }} className="relative w-80 h-80 flex items-center justify-center">
       <div className="absolute inset-0 border border-orange-500/10 rounded-full animate-spin-slow shadow-[0_0_80px_rgba(249,115,22,0.05)]" />
       <Sun className="w-40 h-40 text-orange-500/10 animate-pulse" />
       <div className="absolute inset-8 border border-orange-500/5 rounded-full" />
    </motion.div>
  )
}

/* ==========================================
   THE SOLAR FLARE - MAIN INTERFACE
   ========================================== */

export default function SolarFlarePremium() {
  const [activeReactor, setActiveReactor] = useState(0)
  const [isPlasmaLocked, setIsPlasmaLocked] = useState(true)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })

  // Fusion Scroll Effects
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const textX = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  return (
    <div ref={containerRef} className="bg-[#050402] text-[#e5e0dc] font-mono selection:bg-orange-500/30 selection:text-white min-h-screen overflow-x-hidden transition-colors duration-1000">
      
      {/* GLOBAL HUD OVERLAY */}
      <HUD_Overlay isPlasmaLocked={isPlasmaLocked} />

      <main>
        {/* ==========================================
            1. PLASMA IGNITION (HERO)
            ========================================== */}
        <section className="relative h-screen flex flex-col justify-center items-center px-8 md:px-24 overflow-hidden pt-20">
          <PlasmaVisualizer />
          <motion.div style={{ opacity: heroOpacity }} className="absolute z-0 pointer-events-none flex items-center justify-center">
             <FusionModel progress={scrollYProgress} />
          </motion.div>

          <div className="relative z-10 text-center max-w-7xl">
             <Reveal>
                <div className="inline-flex items-center gap-4 px-6 py-2 border border-orange-500/30 bg-orange-500/5 text-[10px] font-black uppercase tracking-[0.5em] text-orange-500 mb-12 italic">
                   <Flame className="w-4 h-4" /> Fusion_Link: NOMINAL // Core_Temp: 152.4M°C
                </div>
                <motion.h1 style={{ x: textX }} className="text-7xl md:text-[14vw] font-black tracking-tighter uppercase mb-16 leading-[0.75] italic">
                   Solar <br/> <span className="text-white/5 italic">Flare.</span>
                </motion.h1>
                <p className="max-w-3xl mx-auto text-sm md:text-lg text-white/30 leading-relaxed uppercase tracking-widest font-light mb-16 italic">
                   La maîtrise de l'énergie stellaire pour un futur durable. Nous concevons les réacteurs à fusion les plus avancés au monde pour alimenter l'humanité sans carbone.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                   <button className="px-12 py-6 bg-orange-700 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-[0_0_40px_rgba(249,115,22,0.2)] flex items-center gap-4 italic">
                      <Power className="w-5 h-5" /> Ignite Reactor
                   </button>
                   <button className="px-12 py-6 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all flex items-center gap-4 italic">
                      <Archive className="w-5 h-5" /> Reactor Registry
                   </button>
                </div>
             </Reveal>
          </div>

          <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end border-t border-white/5 pt-12">
             <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4 text-[9px] font-bold text-white/20 uppercase tracking-widest italic">
                   <div className="w-16 h-px bg-white/10" />
                   Station_ID: FLARE-HUB-42
                </div>
                <div className="flex items-center gap-4 text-[9px] font-bold text-white/20 uppercase tracking-widest italic">
                   <div className="w-16 h-px bg-white/10" />
                   Output_Status: HIGH_STABILITY
                </div>
             </div>
             <div className="text-right flex flex-col items-end gap-4">
                <span className="text-[8px] font-black uppercase tracking-[0.5em] text-orange-500">Magnetic_Flux_Stream</span>
                <div className="flex gap-2 h-12 items-end">
                   {[...Array(16)].map((_, i) => (
                     <motion.div 
                        key={i}
                        animate={{ height: ["10%", "100%", "30%", "80%", "10%"] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                        className="w-2 bg-orange-500/20"
                     />
                   ))}
                </div>
             </div>
          </div>
        </section>

        {/* ==========================================
            2. REACTOR REGISTRY (DENSE TECHNICAL)
            ========================================== */}
        <section className="py-60 bg-[#0a0806] relative border-y border-white/5 overflow-hidden">
           <div className="max-w-[1600px] mx-auto px-8 md:px-24">
              <div className="flex flex-col md:flex-row items-end justify-between mb-40 gap-12">
                 <Reveal>
                    <span className="text-[10px] font-black uppercase tracking-[0.6em] text-orange-500 block mb-6 italic underline underline-offset-8 decoration-orange-500/20">Fusion // Engineering</span>
                    <h2 className="text-6xl md:text-[10vw] font-black uppercase tracking-tighter italic leading-none text-white">Registry.</h2>
                 </Reveal>
                 <div className="text-right">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 block mb-4 italic">Registry // Energy_Audit</span>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange-500">L'Architecture du Plasma</p>
                 </div>
              </div>

              <div className="grid md:grid-cols-3 gap-px bg-white/5 border border-white/5 shadow-2xl">
                 {FUSION_REACTORS.map((reactor, i) => (
                   <Reveal key={reactor.id} delay={i * 0.1}>
                      <div className="bg-[#050402] p-20 flex flex-col h-full hover:bg-white/[0.02] transition-all group cursor-crosshair border-white/5 border-r last:border-r-0">
                         <div className="flex justify-between items-start mb-16">
                            <div className="w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-orange-700 group-hover:text-white transition-all duration-500">
                               <Atom className="w-8 h-8" />
                            </div>
                            <span className={`px-4 py-2 bg-white/5 text-[9px] font-black uppercase tracking-[0.3em] ${reactor.status === "Online" ? "text-orange-500" : "text-white/40"}`}>{reactor.status}</span>
                         </div>
                         
                         <h3 className="text-4xl font-black uppercase tracking-tighter mb-8 italic text-white group-hover:translate-x-4 transition-transform">{reactor.name}</h3>
                         <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] mb-12">{reactor.type}</div>
                         
                         <div className="space-y-8 mb-20 border-l border-orange-500/20 pl-8">
                            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
                               <span className="text-white/20">Temperature</span>
                               <span className="text-white group-hover:text-orange-400 transition-colors">{reactor.temp}</span>
                            </div>
                            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
                               <span className="text-white/20">Efficiency</span>
                               <span className="text-white group-hover:text-orange-400 transition-colors">{reactor.q_factor}</span>
                            </div>
                            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
                               <span className="text-white/20">Stability</span>
                               <span className="text-white group-hover:text-orange-400 transition-colors">{reactor.stability}</span>
                            </div>
                         </div>

                         <p className="text-[12px] text-white/30 leading-loose uppercase tracking-[0.2em] font-bold italic mb-16">
                            {reactor.desc}
                         </p>

                         <div className="mt-auto pt-10 border-t border-white/5 flex justify-between items-center">
                            <span className="text-[10px] font-black text-white/10 uppercase tracking-widest">Ref: {reactor.id}</span>
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
            3. PLASMA MONITOR (INTERACTIVE DATA)
            ========================================== */}
        <section className="py-60 bg-black relative border-y border-white/5 overflow-hidden">
           <div className="max-w-[1400px] mx-auto px-8 md:px-24">
              <div className="grid lg:grid-cols-2 gap-40 items-center">
                 <div>
                    <Reveal>
                       <span className="text-[10px] font-black uppercase tracking-[0.5em] text-orange-500 block mb-12 italic underline underline-offset-8 decoration-orange-500/20">Plasma // Performance</span>
                       <h2 className="text-7xl md:text-[9vw] font-light italic leading-none text-white mb-16 uppercase tracking-tighter">
                          The <br/> <span className="not-italic font-black text-white/5 italic">Confinement_Link.</span>
                       </h2>
                       <p className="text-2xl font-light text-white/20 leading-relaxed mb-24 italic uppercase tracking-[0.2em] max-w-xl">
                          Surveillance magnétique en temps réel. Nos capteurs analysent la stabilité du plasma et ajustent les courants de bobines pour garantir un confinement parfait à 150 millions de degrés.
                       </p>
                       <div className="grid grid-cols-2 gap-px bg-white/5 border border-white/5 mb-24 shadow-2xl">
                          {PLASMA_METRICS.map((metric, i) => (
                            <div key={i} className="p-16 bg-[#0a0806] group hover:bg-white/[0.02] transition-all border-r border-b last:border-r-0 border-white/5">
                               <div className="text-[10px] font-black uppercase text-orange-500 mb-6 tracking-[0.4em]">{metric.label}</div>
                               <div className="text-5xl font-black text-white italic mb-6 tracking-tighter group-hover:translate-x-4 transition-transform">{metric.value}</div>
                               <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.3em] text-white/10 italic">
                                  <Activity className="w-4 h-4 text-orange-500" /> {metric.trend}
                               </div>
                            </div>
                          ))}
                       </div>
                       <button 
                         onClick={() => setIsPlasmaLocked(!isPlasmaLocked)}
                         className="w-full py-8 bg-orange-700 text-white text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-2xl flex items-center justify-center gap-6 italic"
                       >
                          <Settings className="w-5 h-5" /> Re-Sync Magnetic Nodes
                       </button>
                    </Reveal>
                 </div>
                 
                 <div className="relative">
                    <Reveal delay={0.3} x={40}>
                       <div className="aspect-square bg-[#0a0806] border border-white/10 p-20 flex flex-col justify-between relative group overflow-hidden shadow-2xl">
                          <div className="absolute top-0 right-0 p-80 bg-orange-500 opacity-[0.02] blur-[150px] rounded-full group-hover:opacity-[0.05] transition-opacity" />
                          
                          <div className="flex justify-between items-start z-10">
                             <div className="flex flex-col gap-3">
                                <span className="text-[10px] font-black text-white/10 uppercase tracking-[0.5em]">Fusion_Link // SYNC-v42</span>
                                <span className="text-[12px] font-black text-white/40 uppercase tracking-[0.6em]">Magnetic_Flux_Map</span>
                             </div>
                             <Wifi className="w-6 h-6 text-orange-500" />
                          </div>
                          
                          {/* PLASMA VISUALIZER (SVG) */}
                          <div className="relative z-10 flex flex-col items-center justify-center h-full">
                             <div className="w-64 h-64 border border-orange-400/5 rounded-full flex items-center justify-center relative">
                                <motion.div 
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                                  className="absolute inset-0 border-t-2 border-orange-400/20 rounded-full" 
                                />
                                <motion.div 
                                  animate={{ rotate: -360 }}
                                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                  className="absolute inset-8 border-b-2 border-orange-400/10 rounded-full" 
                                />
                                <Magnet className={`w-24 h-24 transition-colors duration-1000 ${isPlasmaLocked ? "text-orange-400 animate-pulse" : "text-white/5"}`} />
                             </div>
                             <div className="mt-16 text-center space-y-6">
                                <div className={`text-4xl font-black italic tracking-tighter ${isPlasmaLocked ? "text-white" : "text-white/20"}`}>
                                   {isPlasmaLocked ? "FLUX_LOCKED" : "FLUX_WARNING"}
                                </div>
                                <span className="text-[11px] font-bold text-white/10 uppercase tracking-[0.6em] block">Auth_Node: CORE_HEAD_01</span>
                             </div>
                          </div>

                          <div className="relative z-10 flex gap-6">
                             <div className="flex-1 h-1 bg-white/5 overflow-hidden">
                                <motion.div 
                                   animate={isPlasmaLocked ? { x: ["-100%", "100%"] } : {}}
                                   transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                   className="w-1/2 h-full bg-orange-600"
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
            4. ENERGY STORY (TECH STORYTELLING)
            ========================================== */}
        <section className="py-60 bg-[#050402] relative overflow-hidden border-t border-white/5">
           <div className="max-w-[1400px] mx-auto px-8 md:px-24">
              <div className="grid lg:grid-cols-2 gap-40 items-center">
                 <div className="relative aspect-[3/4] overflow-hidden group border border-white/5 shadow-2xl">
                    <Image 
                       src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop" 
                       alt="Fusion Reactor" 
                       fill 
                       className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2000ms]"
                    />
                    <div className="absolute inset-0 bg-orange-900/10 mix-blend-color group-hover:opacity-0 transition-opacity" />
                    <div className="absolute inset-0 p-20 flex flex-col justify-end bg-gradient-to-t from-black via-black/40 to-transparent">
                       <div className="text-white">
                          <span className="text-[11px] font-black uppercase tracking-[0.6em] text-orange-500 mb-8 block italic underline underline-offset-8 decoration-orange-500/20">Atelier // Purity // Unit</span>
                          <h4 className="text-6xl font-black tracking-tighter uppercase italic mb-12 mix-blend-difference text-white">Solar <br/> Fabric.</h4>
                          <button className="flex items-center gap-6 text-[11px] font-black uppercase tracking-[0.4em] border-b border-white/20 pb-4 hover:border-orange-400 transition-all group">
                             Reactor Protocols <ExternalLink className="w-5 h-5 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                          </button>
                       </div>
                    </div>
                 </div>

                 <div>
                    <Reveal>
                       <div className="mb-24 text-left">
                          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-orange-400 mb-8 block italic">Chapitre III // Fusion</span>
                          <h2 className="text-7xl md:text-[10vw] font-black tracking-tighter uppercase text-white italic leading-none text-white">Pure_Power.</h2>
                       </div>
                       <p className="text-2xl font-light text-white/20 leading-relaxed italic mb-20 uppercase tracking-[0.2em]">
                          L'énergie du futur est celle des étoiles. Nous reproduisons les conditions extrêmes du cœur du soleil pour créer une source d'énergie infinie et propre.
                       </p>
                       <div className="space-y-20">
                          {[
                            { t: "Magnetic Confinement", d: "Utilisation de champs magnétiques ultra-puissants pour maintenir le plasma à distance des parois du réacteur." },
                            { t: "Isotope Separation", d: "Extraction et purification du deutérium et du tritium pour alimenter le cycle de fusion continue." },
                            { t: "Heat Exchange Unit", d: "Conversion de l'énergie cinétique des neutrons en chaleur pour alimenter les turbines à vapeur haute pression." }
                          ].map((step, i) => (
                            <div key={i} className="group flex gap-12 border-b border-white/5 pb-16 hover:border-orange-500/20 transition-all cursor-default">
                               <div className="text-6xl font-black text-white/5 group-hover:text-orange-400/20 transition-colors italic leading-none">0{i+1}</div>
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
                    <div className="w-16 h-16 bg-orange-700 flex items-center justify-center">
                      <Zap className="w-10 h-10 text-white" />
                    </div>
                    <span className="text-4xl font-black uppercase tracking-tighter italic">SOLAR<span className="text-white/20">FLARE.</span></span>
                 </div>
                 <p className="text-white/20 text-[11px] font-black uppercase tracking-[0.5em] leading-loose max-w-sm mb-20 italic">
                    "L'énergie des étoiles, à la portée de l'humanité." — Archive Solar V.42
                 </p>
                 <div className="flex gap-16">
                    {["FusionLog", "ReactorRegistry", "GitHub", "X_Protocol"].map(s => (
                      <Link key={s} href="#" className="text-[11px] font-black uppercase tracking-widest text-white/20 hover:text-orange-500 transition-colors italic underline underline-offset-8 decoration-white/5">{s}</Link>
                    ))}
                 </div>
              </div>

              {[
                { t: "REACTORS", l: ["Tokamak Alpha-9", "Stellarator-Z", "Inertial Core X", "Hybrid Shield"] },
                { t: "TECHNOLOGY", l: ["Magnetic Confinement", "Plasma Stability", "Heat Exchange", "SLA Reports"] },
                { t: "ATELIER", l: ["Our Legacy", "Sustainability", "Locations", "Support"] }
              ].map((col, i) => (
                <div key={i} className="flex flex-col gap-12">
                  <h4 className="text-[11px] font-black text-orange-500 uppercase tracking-[0.6em] italic">{col.t}</h4>
                  <ul className="flex flex-col gap-8">
                    {col.l.map(link => (
                      <li key={link} className="text-[11px] font-bold text-white/20 hover:text-white transition-colors cursor-pointer uppercase tracking-[0.4em] italic">{link}</li>
                    ))}
                  </ul>
                </div>
              ))}
           </div>

           <div className="max-w-[1600px] mx-auto border-t border-white/5 pt-16 flex flex-col md:flex-row justify-between items-center gap-16 text-[10px] font-black text-white/10 uppercase tracking-[0.6em] italic">
              <span>© 2026 SOLAR FLARE FUSION ENERGY AG. // ALL_RIGHTS_RESERVED</span>
              <div className="flex gap-16">
                 <span>STATUS: OPERATIONAL</span>
                 <span>TEMP: 152.4M°C (AVG)</span>
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

function HUD_Overlay({ isPlasmaLocked }: { isPlasmaLocked: boolean }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
       {/* Corner Brackets */}
       <div className={`absolute top-12 left-12 w-20 h-20 border-t-2 border-l-2 transition-colors duration-1000 ${isPlasmaLocked ? "border-orange-400" : "border-white/10"}`} />
       <div className={`absolute top-12 right-12 w-20 h-20 border-t-2 border-r-2 transition-colors duration-1000 ${isPlasmaLocked ? "border-orange-400" : "border-white/10"}`} />
       <div className={`absolute bottom-12 left-12 w-20 h-20 border-b-2 border-l-2 transition-colors duration-1000 ${isPlasmaLocked ? "border-orange-400" : "border-white/10"}`} />
       <div className={`absolute bottom-12 right-12 w-20 h-20 border-b-2 border-r-2 transition-colors duration-1000 ${isPlasmaLocked ? "border-orange-400" : "border-white/10"}`} />

       {/* Top Status Bar */}
       <div className="absolute top-12 left-1/2 -translate-x-1/2 flex items-center gap-20 bg-black/60 backdrop-blur-2xl px-12 py-4 border border-white/10 rounded-none">
          <div className="flex items-center gap-6 text-white">
             <div className={`w-3 h-3 transition-colors duration-500 ${isPlasmaLocked ? "bg-orange-400 animate-pulse" : "bg-red-500 animate-ping"}`} />
             <span className="text-[10px] font-black uppercase tracking-[0.4em] italic leading-none">Plasma_Sync: {isPlasmaLocked ? "NOMINAL" : "STABILITY_LOSS"} // Status: ACTIVE</span>
          </div>
          <div className="h-4 w-px bg-white/20" />
          <div className="flex items-center gap-6 text-white/20">
             <Wifi className="w-4 h-4" /> 
             <span className="text-[10px] font-black uppercase tracking-[0.4em] italic leading-none">Fusion_Grid: SECURE</span>
          </div>
       </div>

       {/* Right Rotation Info */}
       <div className="absolute right-12 top-1/2 -translate-y-1/2 rotate-90 origin-right hidden lg:block">
          <span className="text-[10px] font-black uppercase tracking-[0.8em] text-white/5 italic">Unauthorized_Duplication_Of_Fusion_Patterns_Is_Strictly_Monitored_By_Global_Energy_Alliance</span>
       </div>
    </div>
  )
}
