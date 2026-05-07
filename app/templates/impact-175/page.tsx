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
  Timer, Zap, Activity, Microscope, 
  Target, Layers, Box, Hexagon, 
  Terminal, Settings, Power, Info, 
  AlertTriangle, ChevronRight, ArrowRight, 
  Share2, Maximize2, Download, ExternalLink, 
  Archive, Hash, Wifi, BarChart3, 
  Fingerprint, Scan, Brain, Server, 
  ShieldCheck, ShieldAlert, Award, 
  Briefcase, Wind, Thermometer, 
  Flame, Battery, Radio, Gauge, 
  Lightbulb, Command, Grid, Radar, 
  Orbit, Atom, Satellite, Milestone, 
  FlaskConical, FlaskRound, Ghost, 
  Clock, Watch, Hourglass, History, 
  FastForward, Rewind, PlayCircle, 
  Database, Search, Milestone as MilestoneIcon, 
  Cpu
} from "lucide-react"

/* ==========================================================================
   THE CHRONOS ENGINE DATASET (ULTRA DENSITY)
   ========================================================================== */

const TEMPORAL_ASSETS = [
  {
    id: "clock-cs-42",
    name: "Cesium Master-Node",
    type: "Primary Atomic Standard",
    drift: "0.02 ns/day",
    precision: "10⁻¹⁶",
    stability: "99.9999%",
    desc: "Horloge atomique au césium-133 servant de référence primaire pour la synchronisation des réseaux de télécommunications mondiaux.",
    status: "Active"
  },
  {
    id: "clock-hm-08",
    name: "Hydrogen Maser v8",
    type: "Secondary Reference",
    drift: "0.12 ns/day",
    precision: "10⁻¹⁵",
    stability: "99.9842%",
    desc: "Maser à hydrogène passif offrant une stabilité à court terme exceptionnelle pour les mesures de physique fondamentale.",
    status: "Testing"
  },
  {
    id: "clock-io-15",
    name: "Ion-Trap Pulse",
    type: "Next-Gen Quantum Clock",
    drift: "0.001 ns/day",
    precision: "10⁻¹⁸",
    stability: "100%",
    desc: "Prototype d'horloge optique à ions piégés, capable de mesurer des variations temporelles dues à la relativité générale.",
    status: "Approved"
  }
]

const CHRONO_METRICS = [
  { label: "UTC Offset", value: "0.000000s", trend: "Synced" },
  { label: "Sync Nodes", value: "1,242", trend: "Optimal" },
  { label: "Leap Counter", value: "24", trend: "Stable" },
  { label: "Jitter Level", value: "0.01ps", trend: "Constant" }
]

const CHRONO_LOGS = [
  { timestamp: "12:14:42.000", unit: "Master-Sync", status: "LOCKED", drift: "0.00ns" },
  { timestamp: "12:14:45.004", unit: "Orbital-Link-A", status: "STABLE", latency: "1.2ms" },
  { timestamp: "12:14:48.012", unit: "Fin-Grid-Sync", status: "SUCCESS", alignment: "100%" }
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

function TemporalDriftVisualizer() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY })
    window.addEventListener("mousemove", handleMouse)
    return () => window.removeEventListener("mousemove", handleMouse)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-10">
       <svg width="100%" height="100%" className="w-full h-full">
          {[...Array(12)].map((_, i) => (
            <motion.circle 
               key={i}
               cx="50%" 
               cy="50%" 
               r={100 + i * 80} 
               stroke="peru" 
               strokeWidth="0.5" 
               fill="none"
               strokeDasharray="10 20"
               animate={{ rotate: 360 }}
               transition={{ duration: 30 + i * 10, repeat: Infinity, ease: "linear" }}
            />
          ))}
          <motion.circle 
             animate={{ cx: mousePos.x, cy: mousePos.y }}
             transition={{ type: "spring", damping: 30, stiffness: 100 }}
             r="200" 
             fill="peru" 
             className="opacity-20 blur-[120px]"
          />
       </svg>
    </div>
  )
}

function ChronosHubModel({ progress }: { progress: any }) {
  const rotate = useTransform(progress, [0, 1], [0, 360])
  const scale = useTransform(progress, [0, 0.5, 1], [1, 1.2, 1])

  return (
    <motion.div style={{ rotate, scale }} className="relative w-80 h-80 flex items-center justify-center">
       <div className="absolute inset-0 border border-peru/10 rounded-full animate-spin-slow shadow-[0_0_80px_rgba(205,133,63,0.05)]" />
       <Clock className="w-40 h-40 text-peru/10 animate-pulse" />
       <div className="absolute inset-8 border border-peru/5 rounded-full" />
    </motion.div>
  )
}

/* ==========================================
   THE CHRONOS ENGINE - MAIN INTERFACE
   ========================================== */

export default function ChronosEnginePremium() {
  const [activeClock, setActiveClock] = useState(0)
  const [isTimeLocked, setIsTimeLocked] = useState(true)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })

  // Chrono Scroll Effects
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const textX = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  return (
    <div ref={containerRef} className="bg-[#0a0806] text-[#e5e0dc] font-mono selection:bg-peru/30 selection:text-white min-h-screen overflow-x-hidden transition-colors duration-1000">
      
      {/* GLOBAL HUD OVERLAY */}
      <HUD_Overlay isTimeLocked={isTimeLocked} />

      <main>
        {/* ==========================================
            1. CHRONO IGNITION (HERO)
            ========================================== */}
        <section className="relative h-screen flex flex-col justify-center items-center px-8 md:px-24 overflow-hidden pt-20">
          <TemporalDriftVisualizer />
          <motion.div style={{ opacity: heroOpacity }} className="absolute z-0 pointer-events-none flex items-center justify-center">
             <ChronosHubModel progress={scrollYProgress} />
          </motion.div>

          <div className="relative z-10 text-center max-w-7xl">
             <Reveal>
                <div className="inline-flex items-center gap-4 px-6 py-2 border border-peru/30 bg-peru/5 text-[10px] font-black uppercase tracking-[0.5em] text-peru mb-12 italic">
                   <Timer className="w-4 h-4" /> Atomic_Sync: NOMINAL // Drift_Rate: 0.02ns/d
                </div>
                <motion.h1 style={{ x: textX }} className="text-7xl md:text-[14vw] font-black tracking-tighter uppercase mb-16 leading-[0.75] italic">
                   Chronos <br/> <span className="text-white/5 italic">Engine.</span>
                </motion.h1>
                <p className="max-w-3xl mx-auto text-sm md:text-lg text-white/30 leading-relaxed uppercase tracking-widest font-light mb-16 italic">
                   L'ingénierie de la précision temporelle absolue. Nous synchronisons les réseaux financiers, spatiaux et de télécommunications par la maîtrise de la seconde atomique.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                   <button className="px-12 py-6 bg-peru text-black text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-[0_0_40px_rgba(205,133,63,0.2)] flex items-center gap-4 italic">
                      <Zap className="w-5 h-5" /> Initialize Sync
                   </button>
                   <button className="px-12 py-6 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all flex items-center gap-4 italic">
                      <Database className="w-5 h-5" /> Atomic Registry
                   </button>
                </div>
             </Reveal>
          </div>

          <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end border-t border-white/5 pt-12">
             <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4 text-[9px] font-bold text-white/20 uppercase tracking-widest italic">
                   <div className="w-16 h-px bg-white/10" />
                   Sync_ID: CHRONO-NODE-42
                </div>
                <div className="flex items-center gap-4 text-[9px] font-bold text-white/20 uppercase tracking-widest italic">
                   <div className="w-16 h-px bg-white/10" />
                   Time_Condition: ATOMIC_LOCK
                </div>
             </div>
             <div className="text-right flex flex-col items-end gap-4">
                <span className="text-[8px] font-black uppercase tracking-[0.5em] text-peru">Chronometric_Pulse_Stream</span>
                <div className="flex gap-2 h-12 items-end">
                   {[...Array(16)].map((_, i) => (
                     <motion.div 
                        key={i}
                        animate={{ height: ["10%", "100%", "30%", "80%", "10%"] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                        className="w-2 bg-peru/20"
                     />
                   ))}
                </div>
             </div>
          </div>
        </section>

        {/* ==========================================
            2. ATOMIC REGISTRY (DENSE TECHNICAL)
            ========================================== */}
        <section className="py-60 bg-[#060402] relative border-y border-white/5 overflow-hidden">
           <div className="max-w-[1600px] mx-auto px-8 md:px-24">
              <div className="flex flex-col md:flex-row items-end justify-between mb-40 gap-12">
                 <Reveal>
                    <span className="text-[10px] font-black uppercase tracking-[0.6em] text-peru block mb-6 italic underline underline-offset-8 decoration-peru/20">Temporal // Assets</span>
                    <h2 className="text-6xl md:text-[10vw] font-black uppercase tracking-tighter italic leading-none text-white">Archives.</h2>
                 </Reveal>
                 <div className="text-right">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 block mb-4 italic">Registry // Chrono_Audit</span>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-peru">L'Architecture de la Seconde</p>
                 </div>
              </div>

              <div className="grid md:grid-cols-3 gap-px bg-white/5 border border-white/5 shadow-2xl">
                 {TEMPORAL_ASSETS.map((clock, i) => (
                   <Reveal key={clock.id} delay={i * 0.1}>
                      <div className="bg-[#0a0806] p-20 flex flex-col h-full hover:bg-white/[0.02] transition-all group cursor-crosshair border-white/5 border-r last:border-r-0">
                         <div className="flex justify-between items-start mb-16">
                            <div className="w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-peru group-hover:text-black transition-all duration-500">
                               <Cpu className="w-8 h-8" />
                            </div>
                            <span className={`px-4 py-2 bg-white/5 text-[9px] font-black uppercase tracking-[0.3em] ${clock.status === "Active" ? "text-peru" : "text-white/40"}`}>{clock.status}</span>
                         </div>
                         
                         <h3 className="text-4xl font-black uppercase tracking-tighter mb-8 italic text-white group-hover:translate-x-4 transition-transform">{clock.name}</h3>
                         <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] mb-12">{clock.type}</div>
                         
                         <div className="space-y-8 mb-20 border-l border-peru/20 pl-8">
                            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
                               <span className="text-white/20">Temporal Drift</span>
                               <span className="text-white group-hover:text-peru transition-colors">{clock.drift}</span>
                            </div>
                            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
                               <span className="text-white/20">Precision</span>
                               <span className="text-white group-hover:text-peru transition-colors">{clock.precision}</span>
                            </div>
                            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
                               <span className="text-white/20">Stability</span>
                               <span className="text-white group-hover:text-peru transition-colors">{clock.stability}</span>
                            </div>
                         </div>

                         <p className="text-[12px] text-white/30 leading-loose uppercase tracking-[0.2em] font-bold italic mb-16">
                            {clock.desc}
                         </p>

                         <div className="mt-auto pt-10 border-t border-white/5 flex justify-between items-center">
                            <span className="text-[10px] font-black text-white/10 uppercase tracking-widest">Ref: {clock.id}</span>
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
            3. CHRONO MONITOR (INTERACTIVE DATA)
            ========================================== */}
        <section className="py-60 bg-black relative border-y border-white/5 overflow-hidden">
           <div className="max-w-[1400px] mx-auto px-8 md:px-24">
              <div className="grid lg:grid-cols-2 gap-40 items-center">
                 <div>
                    <Reveal>
                       <span className="text-[10px] font-black uppercase tracking-[0.5em] text-peru block mb-12 italic underline underline-offset-8 decoration-peru/20">Chrono // Performance</span>
                       <h2 className="text-7xl md:text-[9vw] font-light italic leading-none text-white mb-16 uppercase tracking-tighter">
                          The <br/> <span className="not-italic font-black text-white/5 italic">Temporal_Link.</span>
                       </h2>
                       <p className="text-2xl font-light text-white/20 leading-relaxed mb-24 italic uppercase tracking-[0.2em] max-w-xl">
                          Surveillance chronométrique en temps réel. Nos nœuds UTC synchronisent les horloges atomiques mondiales pour garantir une intégrité temporelle absolue sur tous les continents.
                       </p>
                       <div className="grid grid-cols-2 gap-px bg-white/5 border border-white/5 mb-24 shadow-2xl">
                          {CHRONO_METRICS.map((metric, i) => (
                            <div key={i} className="p-16 bg-[#0a0806] group hover:bg-white/[0.02] transition-all border-r border-b last:border-r-0 border-white/5">
                               <div className="text-[10px] font-black uppercase text-peru mb-6 tracking-[0.4em]">{metric.label}</div>
                               <div className="text-5xl font-black text-white italic mb-6 tracking-tighter group-hover:translate-x-4 transition-transform">{metric.value}</div>
                               <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.3em] text-white/10 italic">
                                  <Activity className="w-4 h-4 text-peru" /> {metric.trend}
                               </div>
                            </div>
                          ))}
                       </div>
                       <button 
                         onClick={() => setIsTimeLocked(!isTimeLocked)}
                         className="w-full py-8 bg-peru text-black text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-2xl flex items-center justify-center gap-6 italic"
                       >
                          <Settings className="w-5 h-5" /> Re-Sync Temporal Nodes
                       </button>
                    </Reveal>
                 </div>
                 
                 <div className="relative">
                    <Reveal delay={0.3} x={40}>
                       <div className="aspect-square bg-[#0a0806] border border-white/10 p-20 flex flex-col justify-between relative group overflow-hidden shadow-2xl">
                          <div className="absolute top-0 right-0 p-80 bg-peru opacity-[0.02] blur-[150px] rounded-full group-hover:opacity-[0.05] transition-opacity" />
                          
                          <div className="flex justify-between items-start z-10">
                             <div className="flex flex-col gap-3">
                                <span className="text-[10px] font-black text-white/10 uppercase tracking-[0.5em]">Chrono_Link // SYNC-v42</span>
                                <span className="text-[12px] font-black text-white/40 uppercase tracking-[0.6em]">Temporal_Jitter_Map</span>
                             </div>
                             <Wifi className="w-6 h-6 text-peru" />
                          </div>
                          
                          {/* CHRONO VISUALIZER (SVG) */}
                          <div className="relative z-10 flex flex-col items-center justify-center h-full">
                             <div className="w-64 h-64 border border-peru/5 rounded-full flex items-center justify-center relative">
                                <motion.div 
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                                  className="absolute inset-0 border-t-2 border-peru/20 rounded-full" 
                                />
                                <motion.div 
                                  animate={{ rotate: -360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                  className="absolute inset-8 border-b-2 border-peru/10 rounded-full" 
                                />
                                <Clock className={`w-24 h-24 transition-colors duration-1000 ${isTimeLocked ? "text-peru animate-pulse" : "text-white/5"}`} />
                             </div>
                             <div className="mt-16 text-center space-y-6">
                                <div className={`text-4xl font-black italic tracking-tighter ${isTimeLocked ? "text-white" : "text-white/20"}`}>
                                   {isTimeLocked ? "TIME_LOCKED" : "TIME_DRIFT"}
                                </div>
                                <span className="text-[11px] font-bold text-white/10 uppercase tracking-[0.6em] block">Auth_Node: CHRONO_UNIT_01</span>
                             </div>
                          </div>

                          <div className="relative z-10 flex gap-6">
                             <div className="flex-1 h-1 bg-white/5 overflow-hidden">
                                <motion.div 
                                   animate={isTimeLocked ? { x: ["-100%", "100%"] } : {}}
                                   transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                   className="w-1/2 h-full bg-peru"
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
            4. CHRONO STORY (TECH STORYTELLING)
            ========================================== */}
        <section className="py-60 bg-[#0a0806] relative overflow-hidden border-t border-white/5">
           <div className="max-w-[1400px] mx-auto px-8 md:px-24">
              <div className="grid lg:grid-cols-2 gap-40 items-center">
                 <div className="relative aspect-[3/4] overflow-hidden group border border-white/5 shadow-2xl">
                    <Image 
                       src="https://images.unsplash.com/photo-1508962914676-139429cf6978?q=80&w=1200&auto=format&fit=crop" 
                       alt="Atomic Clock Infrastructure" 
                       fill 
                       className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2000ms]"
                    />
                    <div className="absolute inset-0 bg-peru/10 mix-blend-color group-hover:opacity-0 transition-opacity" />
                    <div className="absolute inset-0 p-20 flex flex-col justify-end bg-gradient-to-t from-black via-black/40 to-transparent">
                       <div className="text-white">
                          <span className="text-[11px] font-black uppercase tracking-[0.6em] text-peru mb-8 block italic underline underline-offset-8 decoration-peru/20">Atelier // Purity // Unit</span>
                          <h4 className="text-6xl font-black tracking-tighter uppercase italic mb-12 mix-blend-difference text-white">Chrono <br/> Fabric.</h4>
                          <button className="flex items-center gap-6 text-[11px] font-black uppercase tracking-[0.4em] border-b border-white/20 pb-4 hover:border-peru transition-all group">
                             Sync Protocols <ExternalLink className="w-5 h-5 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                          </button>
                       </div>
                    </div>
                 </div>

                 <div>
                    <Reveal>
                       <div className="mb-24 text-left">
                          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-peru mb-8 block italic">Chapitre III // Synchronisation</span>
                          <h2 className="text-7xl md:text-[10vw] font-black tracking-tighter uppercase text-white italic leading-none text-white">Pure_Time.</h2>
                       </div>
                       <p className="text-2xl font-light text-white/20 leading-relaxed italic mb-20 uppercase tracking-[0.2em]">
                          Le temps est notre fondation. Nous synchronisons les impulsions atomiques pour créer une grille temporelle globale immuable, essentielle à l'économie moderne.
                       </p>
                       <div className="space-y-20">
                          {[
                            { t: "Atomic Oscillation", d: "Mesure ultra-précise de la fréquence de transition électronique du césium pour définir la seconde." },
                            { t: "Orbital Sync Link", d: "Coordination temporelle par satellite pour corriger les effets de la dilatation temporelle relativiste." },
                            { t: "Network Propagation", d: "Distribution du signal horaire via fibre optique à compensation de phase pour les infrastructures critiques." }
                          ].map((step, i) => (
                            <div key={i} className="group flex gap-12 border-b border-white/5 pb-16 hover:border-peru/20 transition-all cursor-default">
                               <div className="text-6xl font-black text-white/5 group-hover:text-peru/20 transition-colors italic leading-none">0{i+1}</div>
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
                    <div className="w-16 h-16 bg-peru flex items-center justify-center">
                      <Timer className="w-10 h-10 text-black" />
                    </div>
                    <span className="text-4xl font-black uppercase tracking-tighter italic">CHRONOS<span className="text-white/20">ENGINE.</span></span>
                 </div>
                 <p className="text-white/20 text-[11px] font-black uppercase tracking-[0.5em] leading-loose max-w-sm mb-20 italic">
                    "La maîtrise du temps, à la nanoseconde près." — Archive Chronos V.42
                 </p>
                 <div className="flex gap-16">
                    {["SyncLog", "AtomicRegistry", "GitHub", "X_Protocol"].map(s => (
                      <Link key={s} href="#" className="text-[11px] font-black uppercase tracking-widest text-white/20 hover:text-peru transition-colors italic underline underline-offset-8 decoration-white/5">{s}</Link>
                    ))}
                 </div>
              </div>

              {[
                { t: "STANDARDS", l: ["Cesium Master", "Hydrogen Maser", "Ion-Trap Pulse", "Crystal Ref"] },
                { t: "TECHNOLOGY", l: ["Orbital Sync", "Phase Compensation", "Relativity Correction", "SLA Reports"] },
                { t: "ATELIER", l: ["Our Legacy", "UTC Definition", "Locations", "Support"] }
              ].map((col, i) => (
                <div key={i} className="flex flex-col gap-12">
                  <h4 className="text-[11px] font-black text-peru uppercase tracking-[0.6em] italic">{col.t}</h4>
                  <ul className="flex flex-col gap-8">
                    {col.l.map(link => (
                      <li key={link} className="text-[11px] font-bold text-white/20 hover:text-white transition-colors cursor-pointer uppercase tracking-[0.4em] italic">{link}</li>
                    ))}
                  </ul>
                </div>
              ))}
           </div>

           <div className="max-w-[1600px] mx-auto border-t border-white/5 pt-16 flex flex-col md:flex-row justify-between items-center gap-16 text-[10px] font-black text-white/10 uppercase tracking-[0.6em] italic">
              <span>© 2026 CHRONOS ENGINE TEMPORAL ENGINEERING AG. // ALL_RIGHTS_RESERVED</span>
              <div className="flex gap-16">
                 <span>STATUS: OPERATIONAL</span>
                 <span>DRIFT: 0.02ns/d (AVG)</span>
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

function HUD_Overlay({ isTimeLocked }: { isTimeLocked: boolean }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
       {/* Corner Brackets */}
       <div className={`absolute top-12 left-12 w-20 h-20 border-t-2 border-l-2 transition-colors duration-1000 ${isTimeLocked ? "border-peru" : "border-white/10"}`} />
       <div className={`absolute top-12 right-12 w-20 h-20 border-t-2 border-r-2 transition-colors duration-1000 ${isTimeLocked ? "border-peru" : "border-white/10"}`} />
       <div className={`absolute bottom-12 left-12 w-20 h-20 border-b-2 border-l-2 transition-colors duration-1000 ${isTimeLocked ? "border-peru" : "border-white/10"}`} />
       <div className={`absolute bottom-12 right-12 w-20 h-20 border-b-2 border-r-2 transition-colors duration-1000 ${isTimeLocked ? "border-peru" : "border-white/10"}`} />

       {/* Top Status Bar */}
       <div className="absolute top-12 left-1/2 -translate-x-1/2 flex items-center gap-20 bg-black/60 backdrop-blur-2xl px-12 py-4 border border-white/10 rounded-none">
          <div className="flex items-center gap-6 text-white">
             <div className={`w-3 h-3 transition-colors duration-500 ${isTimeLocked ? "bg-peru animate-pulse" : "bg-red-500 animate-ping"}`} />
             <span className="text-[10px] font-black uppercase tracking-[0.4em] italic leading-none">Chrono_Sync: {isTimeLocked ? "NOMINAL" : "DRIFT_LOSS"} // Status: ACTIVE</span>
          </div>
          <div className="h-4 w-px bg-white/20" />
          <div className="flex items-center gap-6 text-white/20">
             <Wifi className="w-4 h-4" /> 
             <span className="text-[10px] font-black uppercase tracking-[0.4em] italic leading-none">Sync_Grid: SECURE</span>
          </div>
       </div>

       {/* Right Rotation Info */}
       <div className="absolute right-12 top-1/2 -translate-y-1/2 rotate-90 origin-right hidden lg:block">
          <span className="text-[10px] font-black uppercase tracking-[0.8em] text-white/5 italic">Unauthorized_Duplication_Of_Temporal_Patterns_Is_Strictly_Monitored_By_Global_Chrono_Alliance</span>
       </div>
    </div>
  )
}
