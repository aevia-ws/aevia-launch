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
  Radar, Zap, Activity, Microscope, 
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
  Orbit, Atom, Satellite, Milestone, 
  FlaskConical, FlaskRound, Ghost, 
  Globe, MapPin, Database, Search, 
  Scan as ScanIcon, Map, Signal, 
  Crosshair, Monitor, Cpu
} from "lucide-react"

/* ==========================================================================
   THE PULSE ARRAY DATASET (ULTRA DENSITY)
   ========================================================================== */

const SATELLITE_ASSETS = [
  {
    id: "sat-sar-42",
    name: "Aegis Radar-1",
    type: "Synthetic Aperture Radar",
    resolution: "25cm / pixel",
    revisit: "1.2 Days",
    throughput: "4.2 Gbps",
    desc: "Satellite SAR haute résolution capable de pénétrer la couverture nuageuse et de détecter des déformations millimétriques de la surface terrestre.",
    status: "Operational"
  },
  {
    id: "sat-hs-08",
    name: "Spectra-Link X",
    type: "Hyperspectral Imaging",
    resolution: "1.2m / pixel",
    revisit: "4.5 Days",
    throughput: "2.8 Gbps",
    desc: "Capteur hyperspectral analysant 240 bandes spectrales pour la détection de minéraux et le suivi de la santé végétale globale.",
    status: "Scanning"
  },
  {
    id: "sat-ld-15",
    name: "Lidar-Forge v5",
    type: "Topographic LiDAR",
    resolution: "5cm / pixel",
    revisit: "12 Days",
    throughput: "8.5 Gbps",
    desc: "Array LiDAR de nouvelle génération pour la cartographie 3D ultra-précise des zones urbaines et forestières.",
    status: "Active Link"
  }
]

const RADAR_METRICS = [
  { label: "Scan Coverage", value: "98.4%", trend: "Stable" },
  { label: "Data Latency", value: "42ms", trend: "Optimal" },
  { label: "Target Lock", value: "Level 9", trend: "High" },
  { label: "Signal Purity", value: "99.98%", trend: "Constant" }
]

const TELEMETRY_LOGS = [
  { timestamp: "18:14:42", unit: "SAR-Array-01", status: "LOCKED", angle: "42.0°" },
  { timestamp: "18:14:45", unit: "Downlink-Node", status: "SYNCED", rate: "4.2 Gbps" },
  { timestamp: "18:14:48", unit: "Orbital-Bus", status: "STABLE", temp: "285K" }
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

function RadarSweepVisualizer() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY })
    window.addEventListener("mousemove", handleMouse)
    return () => window.removeEventListener("mousemove", handleMouse)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-10">
       <svg width="100%" height="100%" className="w-full h-full">
          <motion.line 
             x1="50%" 
             y1="50%" 
             x2={mousePos.x} 
             y2={mousePos.y} 
             stroke="cyan" 
             strokeWidth="1" 
             strokeDasharray="4 8"
          />
          {[...Array(6)].map((_, i) => (
            <circle 
               key={i}
               cx="50%" 
               cy="50%" 
               r={100 + i * 150} 
               stroke="cyan" 
               strokeWidth="0.5" 
               fill="none"
               opacity={0.3}
            />
          ))}
          <motion.div 
             animate={{ rotate: 360 }}
             transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
             className="absolute top-1/2 left-1/2 w-full h-1 bg-gradient-to-r from-cyan-400/0 to-cyan-400/50 origin-left"
          />
       </svg>
    </div>
  )
}

function SatelliteModel({ progress }: { progress: any }) {
  const rotate = useTransform(progress, [0, 1], [0, 360])
  const scale = useTransform(progress, [0, 0.5, 1], [1, 1.2, 1])

  return (
    <motion.div style={{ rotate, scale }} className="relative w-80 h-80 flex items-center justify-center">
       <div className="absolute inset-0 border border-cyan-500/10 rounded-full animate-spin-slow shadow-[0_0_80px_rgba(34,211,238,0.05)]" />
       <Satellite className="w-40 h-40 text-cyan-500/10 animate-pulse" />
       <div className="absolute inset-8 border border-cyan-500/5 rounded-full" />
    </motion.div>
  )
}

/* ==========================================
   THE PULSE ARRAY - MAIN INTERFACE
   ========================================== */

export default function PulseArrayPremium() {
  const [activeSat, setActiveSat] = useState(0)
  const [isRadarLockActive, setIsRadarLockActive] = useState(true)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })

  // Pulse Scroll Effects
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const textX = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  return (
    <div ref={containerRef} className="bg-[#020508] text-[#e0e8ed] font-mono selection:bg-cyan-500/30 selection:text-white min-h-screen overflow-x-hidden transition-colors duration-1000">
      
      {/* GLOBAL HUD OVERLAY */}
      <HUD_Overlay isRadarLockActive={isRadarLockActive} />

      <main>
        {/* ==========================================
            1. RADAR IGNITION (HERO)
            ========================================== */}
        <section className="relative h-screen flex flex-col justify-center items-center px-8 md:px-24 overflow-hidden pt-20">
          <RadarSweepVisualizer />
          <motion.div style={{ opacity: heroOpacity }} className="absolute z-0 pointer-events-none flex items-center justify-center">
             <SatelliteModel progress={scrollYProgress} />
          </motion.div>

          <div className="relative z-10 text-center max-w-7xl">
             <Reveal>
                <div className="inline-flex items-center gap-4 px-6 py-2 border border-cyan-500/30 bg-cyan-500/5 text-[10px] font-black uppercase tracking-[0.5em] text-cyan-500 mb-12 italic">
                   <Radar className="w-4 h-4" /> Radar_Sync: NOMINAL // Resol: 25cm/px
                </div>
                <motion.h1 style={{ x: textX }} className="text-7xl md:text-[14vw] font-black tracking-tighter uppercase mb-16 leading-[0.75] italic">
                   Pulse <br/> <span className="text-white/5 italic">Array.</span>
                </motion.h1>
                <p className="max-w-3xl mx-auto text-sm md:text-lg text-white/30 leading-relaxed uppercase tracking-widest font-light mb-16 italic">
                   La télédétection par satellite de nouvelle génération. Nous capturons chaque pulsation de la Terre avec une précision radar inégalée pour une analyse globale en temps réel.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                   <button className="px-12 py-6 bg-cyan-800 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-[0_0_40px_rgba(34,211,238,0.2)] flex items-center gap-4 italic">
                      <Signal className="w-5 h-5" /> Initialize Scan
                   </button>
                   <button className="px-12 py-6 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all flex items-center gap-4 italic">
                      <Database className="w-5 h-5" /> Satellite Registry
                   </button>
                </div>
             </Reveal>
          </div>

          <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end border-t border-white/5 pt-12">
             <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4 text-[9px] font-bold text-white/20 uppercase tracking-widest italic">
                   <div className="w-16 h-px bg-white/10" />
                   Station_ID: PULSE-MASTER-01
                </div>
                <div className="flex items-center gap-4 text-[9px] font-bold text-white/20 uppercase tracking-widest italic">
                   <div className="w-16 h-px bg-white/10" />
                   Lock_Status: SAR_STABLE
                </div>
             </div>
             <div className="text-right flex flex-col items-end gap-4">
                <span className="text-[8px] font-black uppercase tracking-[0.5em] text-cyan-500">Radar_Reflectivity_Stream</span>
                <div className="flex gap-2 h-12 items-end">
                   {[...Array(16)].map((_, i) => (
                     <motion.div 
                        key={i}
                        animate={{ height: ["10%", "100%", "30%", "80%", "10%"] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                        className="w-2 bg-cyan-500/20"
                     />
                   ))}
                </div>
             </div>
          </div>
        </section>

        {/* ==========================================
            2. SATELLITE REGISTRY (DENSE TECHNICAL)
            ========================================== */}
        <section className="py-60 bg-[#04080c] relative border-y border-white/5 overflow-hidden">
           <div className="max-w-[1600px] mx-auto px-8 md:px-24">
              <div className="flex flex-col md:flex-row items-end justify-between mb-40 gap-12">
                 <Reveal>
                    <span className="text-[10px] font-black uppercase tracking-[0.6em] text-cyan-500 block mb-6 italic underline underline-offset-8 decoration-cyan-400/20">Satellite // Assets</span>
                    <h2 className="text-6xl md:text-[10vw] font-black uppercase tracking-tighter italic leading-none text-white">Archives.</h2>
                 </Reveal>
                 <div className="text-right">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 block mb-4 italic">Registry // Orbital_Audit</span>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-400">L'Architecture de la Surveillance</p>
                 </div>
              </div>

              <div className="grid md:grid-cols-3 gap-px bg-white/5 border border-white/5 shadow-2xl">
                 {SATELLITE_ASSETS.map((sat, i) => (
                   <Reveal key={sat.id} delay={i * 0.1}>
                      <div className="bg-[#020508] p-20 flex flex-col h-full hover:bg-white/[0.02] transition-all group cursor-crosshair border-white/5 border-r last:border-r-0">
                         <div className="flex justify-between items-start mb-16">
                            <div className="w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-cyan-800 group-hover:text-white transition-all duration-500">
                               <Radar className="w-8 h-8" />
                            </div>
                            <span className={`px-4 py-2 bg-white/5 text-[9px] font-black uppercase tracking-[0.3em] ${sat.status === "Operational" ? "text-cyan-500" : "text-white/40"}`}>{sat.status}</span>
                         </div>
                         
                         <h3 className="text-4xl font-black uppercase tracking-tighter mb-8 italic text-white group-hover:translate-x-4 transition-transform">{sat.name}</h3>
                         <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] mb-12">{sat.type}</div>
                         
                         <div className="space-y-8 mb-20 border-l border-cyan-500/20 pl-8">
                            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
                               <span className="text-white/20">Resolution</span>
                               <span className="text-white group-hover:text-cyan-400 transition-colors">{sat.resolution}</span>
                            </div>
                            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
                               <span className="text-white/20">Revisit</span>
                               <span className="text-white group-hover:text-cyan-400 transition-colors">{sat.revisit}</span>
                            </div>
                            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
                               <span className="text-white/20">Throughput</span>
                               <span className="text-white group-hover:text-cyan-400 transition-colors">{sat.throughput}</span>
                            </div>
                         </div>

                         <p className="text-[12px] text-white/30 leading-loose uppercase tracking-[0.2em] font-bold italic mb-16">
                            {sat.desc}
                         </p>

                         <div className="mt-auto pt-10 border-t border-white/5 flex justify-between items-center">
                            <span className="text-[10px] font-black text-white/10 uppercase tracking-widest">Ref: {sat.id}</span>
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
            3. PULSE MONITOR (INTERACTIVE DATA)
            ========================================== */}
        <section className="py-60 bg-black relative border-y border-white/5 overflow-hidden">
           <div className="max-w-[1400px] mx-auto px-8 md:px-24">
              <div className="grid lg:grid-cols-2 gap-40 items-center">
                 <div>
                    <Reveal>
                       <span className="text-[10px] font-black uppercase tracking-[0.5em] text-cyan-500 block mb-12 italic underline underline-offset-8 decoration-cyan-400/20">Pulse // Performance</span>
                       <h2 className="text-7xl md:text-[9vw] font-light italic leading-none text-white mb-16 uppercase tracking-tighter">
                          The <br/> <span className="not-italic font-black text-white/5 italic">Scan_Link.</span>
                       </h2>
                       <p className="text-2xl font-light text-white/20 leading-relaxed mb-24 italic uppercase tracking-[0.2em] max-w-xl">
                          Surveillance radar en temps réel. Nos flottes SAR balaient la planète toutes les heures pour détecter des changements de surface et surveiller les infrastructures critiques.
                       </p>
                       <div className="grid grid-cols-2 gap-px bg-white/5 border border-white/5 mb-24 shadow-2xl">
                          {RADAR_METRICS.map((metric, i) => (
                            <div key={i} className="p-16 bg-[#0a100c] group hover:bg-white/[0.02] transition-all border-r border-b last:border-r-0 border-white/5">
                               <div className="text-[10px] font-black uppercase text-cyan-400 mb-6 tracking-[0.4em]">{metric.label}</div>
                               <div className="text-5xl font-black text-white italic mb-6 tracking-tighter group-hover:translate-x-4 transition-transform">{metric.value}</div>
                               <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.3em] text-white/10 italic">
                                  <Activity className="w-4 h-4 text-cyan-400" /> {metric.trend}
                               </div>
                            </div>
                          ))}
                       </div>
                       <button 
                         onClick={() => setIsRadarLockActive(!isRadarLockActive)}
                         className="w-full py-8 bg-cyan-900 text-white text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-2xl flex items-center justify-center gap-6 italic"
                       >
                          <Settings className="w-5 h-5" /> Re-Sync Orbital Nodes
                       </button>
                    </Reveal>
                 </div>
                 
                 <div className="relative">
                    <Reveal delay={0.3} x={40}>
                       <div className="aspect-square bg-[#0a100c] border border-white/10 p-20 flex flex-col justify-between relative group overflow-hidden shadow-2xl">
                          <div className="absolute top-0 right-0 p-80 bg-cyan-400 opacity-[0.02] blur-[150px] rounded-full group-hover:opacity-[0.05] transition-opacity" />
                          
                          <div className="flex justify-between items-start z-10">
                             <div className="flex flex-col gap-3">
                                <span className="text-[10px] font-black text-white/10 uppercase tracking-[0.5em]">Pulse_Link // SAR-SYNC-v42</span>
                                <span className="text-[12px] font-black text-white/40 uppercase tracking-[0.6em]">Orbital_Ground_Map</span>
                             </div>
                             <Wifi className="w-6 h-6 text-cyan-400" />
                          </div>
                          
                          {/* RADAR VISUALIZER (SVG) */}
                          <div className="relative z-10 flex flex-col items-center justify-center h-full">
                             <div className="w-64 h-64 border border-cyan-400/5 rounded-full flex items-center justify-center relative">
                                <motion.div 
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                                  className="absolute inset-0 border-t-2 border-cyan-400/20 rounded-full" 
                                />
                                <motion.div 
                                  animate={{ rotate: -360 }}
                                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                  className="absolute inset-8 border-b-2 border-cyan-400/10 rounded-full" 
                                />
                                <Crosshair className={`w-24 h-24 transition-colors duration-1000 ${isRadarLockActive ? "text-cyan-400 animate-pulse" : "text-white/5"}`} />
                             </div>
                             <div className="mt-16 text-center space-y-6">
                                <div className={`text-4xl font-black italic tracking-tighter ${isRadarLockActive ? "text-white" : "text-white/20"}`}>
                                   {isRadarLockActive ? "TARGET_LOCKED" : "TARGET_LOST"}
                                </div>
                                <span className="text-[11px] font-bold text-white/10 uppercase tracking-[0.6em] block">Auth_Node: PULSE_UNIT_01</span>
                             </div>
                          </div>

                          <div className="relative z-10 flex gap-6">
                             <div className="flex-1 h-1 bg-white/5 overflow-hidden">
                                <motion.div 
                                   animate={isRadarLockActive ? { x: ["-100%", "100%"] } : {}}
                                   transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                   className="w-1/2 h-full bg-cyan-700"
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
            4. PULSE STORY (TECH STORYTELLING)
            ========================================== */}
        <section className="py-60 bg-[#020508] relative overflow-hidden border-t border-white/5">
           <div className="max-w-[1400px] mx-auto px-8 md:px-24">
              <div className="grid lg:grid-cols-2 gap-40 items-center">
                 <div className="relative aspect-[3/4] overflow-hidden group border border-white/5 shadow-2xl">
                    <Image 
                       src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop" 
                       alt="Orbital Radar Infrastructure" 
                       fill 
                       className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2000ms]"
                    />
                    <div className="absolute inset-0 bg-cyan-900/10 mix-blend-color group-hover:opacity-0 transition-opacity" />
                    <div className="absolute inset-0 p-20 flex flex-col justify-end bg-gradient-to-t from-black via-black/40 to-transparent">
                       <div className="text-white">
                          <span className="text-[11px] font-black uppercase tracking-[0.6em] text-cyan-400 mb-8 block italic underline underline-offset-8 decoration-cyan-400/20">Atelier // Purity // Unit</span>
                          <h4 className="text-6xl font-black tracking-tighter uppercase italic mb-12 mix-blend-difference text-white">Orbital <br/> Fabric.</h4>
                          <button className="flex items-center gap-6 text-[11px] font-black uppercase tracking-[0.4em] border-b border-white/20 pb-4 hover:border-cyan-400 transition-all group">
                             Scan Protocols <ExternalLink className="w-5 h-5 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                          </button>
                       </div>
                    </div>
                 </div>

                 <div>
                    <Reveal>
                       <div className="mb-24 text-left">
                          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-cyan-500 mb-8 block italic">Chapitre III // Analyse</span>
                          <h2 className="text-7xl md:text-[10vw] font-black tracking-tighter uppercase text-white italic leading-none text-white">Pure_Scan.</h2>
                       </div>
                       <p className="text-2xl font-light text-white/20 leading-relaxed italic mb-20 uppercase tracking-[0.2em]">
                          L'espace est notre point de vue. Nous utilisons des micro-ondes pour voir à travers la nuit et les nuages, offrant une clarté absolue sur l'évolution de notre planète.
                       </p>
                       <div className="space-y-20">
                          {[
                            { t: "SAR Signal Capture", d: "Réception de l'écho radar et traitement par synthèse d'ouverture pour une résolution spatiale extrême." },
                            { t: "Geometric Correction", d: "Alignement précis des données orbitales avec les modèles de terrain globaux via des éphémérides GNSS." },
                            { t: "AI Classification", d: "Extraction automatique de caractéristiques (bâtiments, eau, végétation) par réseaux de neurones profonds." }
                          ].map((step, i) => (
                            <div key={i} className="group flex gap-12 border-b border-white/5 pb-16 hover:border-cyan-400/20 transition-all cursor-default">
                               <div className="text-6xl font-black text-white/5 group-hover:text-cyan-400/20 transition-colors italic leading-none">0{i+1}</div>
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
                    <div className="w-16 h-16 bg-cyan-800 flex items-center justify-center">
                      <Satellite className="w-10 h-10 text-white" />
                    </div>
                    <span className="text-4xl font-black uppercase tracking-tighter italic">PULSE<span className="text-white/20">ARRAY.</span></span>
                 </div>
                 <p className="text-white/20 text-[11px] font-black uppercase tracking-[0.5em] leading-loose max-w-sm mb-20 italic">
                    "La vision orbitale au service de la précision terrestre." — Archive Pulse V.42
                 </p>
                 <div className="flex gap-16">
                    {["ScanLog", "SatelliteRegistry", "GitHub", "X_Protocol"].map(s => (
                      <Link key={s} href="#" className="text-[11px] font-black uppercase tracking-widest text-white/20 hover:text-cyan-400 transition-colors italic underline underline-offset-8 decoration-white/5">{s}</Link>
                    ))}
                 </div>
              </div>

              {[
                { t: "FLEET", l: ["Aegis Radar-1", "Spectra-Link X", "Lidar-Forge v5", "Orbital Bus"] },
                { t: "TECHNOLOGY", l: ["SAR Processing", "Geometric Sync", "AI Classification", "SLA Reports"] },
                { t: "ATELIER", l: ["Our Legacy", "Orbital Mapping", "Locations", "Support"] }
              ].map((col, i) => (
                <div key={i} className="flex flex-col gap-12">
                  <h4 className="text-[11px] font-black text-cyan-400 uppercase tracking-[0.6em] italic">{col.t}</h4>
                  <ul className="flex flex-col gap-8">
                    {col.l.map(link => (
                      <li key={link} className="text-[11px] font-bold text-white/20 hover:text-white transition-colors cursor-pointer uppercase tracking-[0.4em] italic">{link}</li>
                    ))}
                  </ul>
                </div>
              ))}
           </div>

           <div className="max-w-[1600px] mx-auto border-t border-white/5 pt-16 flex flex-col md:flex-row justify-between items-center gap-16 text-[10px] font-black text-white/10 uppercase tracking-[0.6em] italic">
              <span>© 2026 PULSE ARRAY ORBITAL REMOTE SENSING AG. // ALL_RIGHTS_RESERVED</span>
              <div className="flex gap-16">
                 <span>STATUS: OPERATIONAL</span>
                 <span>RESOL: 25CM (SAR)</span>
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

function HUD_Overlay({ isRadarLockActive }: { isRadarLockActive: boolean }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
       {/* Corner Brackets */}
       <div className={`absolute top-12 left-12 w-20 h-20 border-t-2 border-l-2 transition-colors duration-1000 ${isRadarLockActive ? "border-cyan-400" : "border-white/10"}`} />
       <div className={`absolute top-12 right-12 w-20 h-20 border-t-2 border-r-2 transition-colors duration-1000 ${isRadarLockActive ? "border-cyan-400" : "border-white/10"}`} />
       <div className={`absolute bottom-12 left-12 w-20 h-20 border-b-2 border-l-2 transition-colors duration-1000 ${isRadarLockActive ? "border-cyan-400" : "border-white/10"}`} />
       <div className={`absolute bottom-12 right-12 w-20 h-20 border-b-2 border-r-2 transition-colors duration-1000 ${isRadarLockActive ? "border-cyan-400" : "border-white/10"}`} />

       {/* Top Status Bar */}
       <div className="absolute top-12 left-1/2 -translate-x-1/2 flex items-center gap-20 bg-black/60 backdrop-blur-2xl px-12 py-4 border border-white/10 rounded-none">
          <div className="flex items-center gap-6 text-white">
             <div className={`w-3 h-3 transition-colors duration-500 ${isRadarLockActive ? "bg-cyan-400 animate-pulse" : "bg-red-500 animate-ping"}`} />
             <span className="text-[10px] font-black uppercase tracking-[0.4em] italic leading-none">Radar_Sync: {isRadarLockActive ? "NOMINAL" : "SYNC_LOSS"} // Status: ACTIVE</span>
          </div>
          <div className="h-4 w-px bg-white/20" />
          <div className="flex items-center gap-6 text-white/20">
             <Wifi className="w-4 h-4" /> 
             <span className="text-[10px] font-black uppercase tracking-[0.4em] italic leading-none">Pulse_Grid: SECURE</span>
          </div>
       </div>

       {/* Right Rotation Info */}
       <div className="absolute right-12 top-1/2 -translate-y-1/2 rotate-90 origin-right hidden lg:block">
          <span className="text-[10px] font-black uppercase tracking-[0.8em] text-white/5 italic">Unauthorized_Duplication_Of_Orbital_Patterns_Is_Strictly_Monitored_By_Global_Pulse_Alliance</span>
       </div>
    </div>
  )
}
