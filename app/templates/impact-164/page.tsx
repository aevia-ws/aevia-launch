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
  Cpu, Zap, Activity, Microscope, 
  Zap as ZapIcon, Terminal, Settings, 
  Power, Info, AlertTriangle, ChevronRight, 
  ArrowRight, Share2, Maximize2, 
  Download, ExternalLink, Archive, 
  Hash, Wifi, BarChart3, Fingerprint, 
  Scan, Layers, Frame, Box, 
  Target, Orbit, Atom, Satellite, 
  Milestone, Gauge, Timer, Cloud, 
  Signal, Search, Navigation, Code, 
  Command, Grid, Radar, Lightbulb, 
  Layers as LayersIcon, Hexagon, Database,
  ShieldCheck, Brain, Server, Shield
} from "lucide-react"

/* ==========================================================================
   THE NEURAL FOUNDRY DATASET (ULTRA DENSITY)
   ========================================================================== */

const CHIP_ARCHITECTURES = [
  {
    id: "chip-neural-12",
    name: "Neural-Core v12",
    lithography: "2nm EUV",
    transistors: "142 Billion",
    clock: "5.4 GHz",
    efficiency: "98.2%",
    desc: "Architecture optimisée pour le traitement massif de réseaux neuronaux en temps réel, intégrant des unités de calcul quantique.",
    status: "Production"
  },
  {
    id: "chip-qsync-08",
    name: "Quantum-Sync 08",
    lithography: "Hybrid Optical",
    transistors: "85 Billion",
    clock: "N/A (Photonic)",
    efficiency: "99.8%",
    desc: "Processeur photonique hybride utilisant des impulsions lumineuses pour une latence proche de zéro dans les environnements de cloud distribué.",
    status: "R&D"
  },
  {
    id: "chip-biolink-04",
    name: "Bio-Link 04",
    lithography: "Synthetic Bio",
    transistors: "12 Billion",
    clock: "2.8 GHz",
    efficiency: "94.5%",
    desc: "Interface bionique conçue pour l'intégration directe avec les systèmes neuronaux biologiques, biocompatibilité de classe S.",
    status: "Testing"
  }
]

const FABRICATION_STEPS = [
  {
    step: "EUV Lithography",
    precision: "0.5nm",
    purity: "99.99999%",
    desc: "Utilisation de lumière ultraviolette extrême pour graver des circuits à l'échelle atomique sur le wafer de silicium."
  },
  {
    step: "Ion Implantation",
    precision: "10.2 eV",
    purity: "99.99995%",
    desc: "Bombardement contrôlé du wafer avec des ions pour modifier les propriétés électriques du silicium."
  },
  {
    step: "Plasma Etching",
    precision: "0.2nm Depth",
    purity: "99.99999%",
    desc: "Retrait sélectif de couches de matériaux à l'aide d'un plasma haute énergie pour définir la structure 3D du transistor."
  }
]

const FOUNDRY_METRICS = [
  { label: "Yield Rate", value: "94.2%", trend: "Stable" },
  { label: "Cleanroom Purity", value: "ISO 1", trend: "Nominal" },
  { label: "Daily Wafer Output", value: "1,240", trend: "High" },
  { label: "Energy Efficiency", value: "A+++", trend: "Optimal" }
]

const SENSOR_LOGS = [
  { timestamp: "18:04:42", sensor: "Litho-01", status: "STABLE", value: "0.52nm" },
  { timestamp: "18:04:45", sensor: "Vacuum-04", status: "NOMINAL", value: "10^-8 Pa" },
  { timestamp: "18:04:48", sensor: "Etch-09", status: "ACTIVE", value: "3.4 eV" }
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

function CircuitLines() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-5">
       <svg width="100%" height="100%" className="w-full h-full">
          <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
             <path d="M10 10 L90 10 L90 90 L10 90 Z" stroke="white" strokeWidth="0.5" fill="none" />
             <path d="M50 10 L50 90 M10 50 L90 50" stroke="white" strokeWidth="0.2" fill="none" />
             <circle cx="10" cy="10" r="1.5" fill="white" />
             <circle cx="90" cy="10" r="1.5" fill="white" />
             <circle cx="90" cy="90" r="1.5" fill="white" />
             <circle cx="10" cy="90" r="1.5" fill="white" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#circuit)" />
       </svg>
    </div>
  )
}

function WaferVisualizer({ progress }: { progress: any }) {
  const rotate = useTransform(progress, [0, 1], [0, 360])
  const scale = useTransform(progress, [0, 0.5, 1], [1, 1.2, 1])

  return (
    <motion.div style={{ rotate, scale }} className="relative w-96 h-96 flex items-center justify-center">
       <div className="absolute inset-0 border-[8px] border-cyan-400/10 rounded-full" />
       <div className="absolute inset-8 border-[1px] border-cyan-400/20 rounded-full" />
       <div className="absolute inset-16 border-[1px] border-cyan-400/5 rounded-full" />
       <Hexagon className="w-32 h-32 text-cyan-400/20 animate-pulse" />
       <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-px h-full bg-cyan-400/10 rotate-45" />
          <div className="w-px h-full bg-cyan-400/10 -rotate-45" />
       </div>
    </motion.div>
  )
}

/* ==========================================
   THE NEURAL FOUNDRY - MAIN INTERFACE
   ========================================== */

export default function NeuralFoundryPremium() {
  const [activeChip, setActiveChip] = useState(0)
  const [isLithoActive, setIsLithoActive] = useState(true)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })

  // Micro-Grid Scroll Effects
  const gridOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.1])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const textX = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  return (
    <div ref={containerRef} className="bg-[#05080a] text-[#e0e8ed] font-mono selection:bg-cyan-500/30 selection:text-white min-h-screen overflow-x-hidden transition-colors duration-1000">
      
      {/* GLOBAL HUD OVERLAY */}
      <HUD_Overlay isLithoActive={isLithoActive} />

      <main>
        {/* ==========================================
            1. MICRO-GRID IGNITION (HERO)
            ========================================== */}
        <section className="relative h-screen flex flex-col justify-center items-center px-8 md:px-24 overflow-hidden pt-20">
          <CircuitLines />
          <motion.div style={{ opacity: heroOpacity }} className="absolute z-0 pointer-events-none">
             <WaferVisualizer progress={scrollYProgress} />
          </motion.div>

          <div className="relative z-10 text-center max-w-7xl">
             <Reveal>
                <div className="inline-flex items-center gap-4 px-6 py-2 border border-cyan-400/30 bg-cyan-400/5 text-[10px] font-black uppercase tracking-[0.5em] text-cyan-400 mb-12 italic">
                   <Microscope className="w-4 h-4" /> System_Status: ISO_1_NOMINAL // v12.4.0
                </div>
                <motion.h1 style={{ x: textX }} className="text-7xl md:text-[14vw] font-black tracking-tighter uppercase mb-16 leading-[0.75] italic">
                   Neural <br/> <span className="text-white/5 italic">Foundry.</span>
                </motion.h1>
                <p className="max-w-3xl mx-auto text-sm md:text-lg text-white/30 leading-relaxed uppercase tracking-widest font-light mb-16 italic">
                   La précision à l'échelle atomique pour les architectures de demain. Nous forgeons les puces neuronales qui alimentent l'intelligence mondiale.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                   <button className="px-12 py-6 bg-cyan-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-[0_0_40px_rgba(8,145,178,0.3)] flex items-center gap-4 italic">
                      <Zap className="w-5 h-5" /> Start Fabrication
                   </button>
                   <button className="px-12 py-6 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all flex items-center gap-4 italic">
                      <Database className="w-5 h-5" /> Chip Registry
                   </button>
                </div>
             </Reveal>
          </div>

          {/* SENSOR TELEMETRY BAR */}
          <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end border-t border-white/5 pt-12">
             <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4 text-[9px] font-bold text-white/20 uppercase tracking-widest italic">
                   <div className="w-16 h-px bg-white/10" />
                   Fab_ID: NF-ZRH-42
                </div>
                <div className="flex items-center gap-4 text-[9px] font-bold text-white/20 uppercase tracking-widest italic">
                   <div className="w-16 h-px bg-white/10" />
                   Cleanroom_Class: ISO_1
                </div>
             </div>
             <div className="text-right flex flex-col items-end gap-4">
                <span className="text-[8px] font-black uppercase tracking-[0.5em] text-cyan-400">Atomic_Stability_Stream</span>
                <div className="flex gap-2 h-12 items-end">
                   {[...Array(16)].map((_, i) => (
                     <motion.div 
                        key={i}
                        animate={{ height: ["10%", "100%", "30%", "80%", "10%"] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                        className="w-2 bg-cyan-400/20"
                     />
                   ))}
                </div>
             </div>
          </div>
        </section>

        {/* ==========================================
            2. WAFER REGISTRY (DENSE TECHNICAL)
            ========================================== */}
        <section className="py-60 bg-[#080a0c] relative border-y border-white/5 overflow-hidden">
           <div className="max-w-[1600px] mx-auto px-8 md:px-24">
              <div className="flex flex-col md:flex-row items-end justify-between mb-40 gap-12">
                 <Reveal>
                    <span className="text-[10px] font-black uppercase tracking-[0.6em] text-cyan-400 block mb-6 italic underline underline-offset-8 decoration-cyan-400/20">Micro // Architectures</span>
                    <h2 className="text-6xl md:text-[10vw] font-black uppercase tracking-tighter italic leading-none text-white">Registry.</h2>
                 </Reveal>
                 <div className="text-right">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 block mb-4 italic">Registry // Fabrication_Audit</span>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-400">L'Architecture du Silicium</p>
                 </div>
              </div>

              <div className="grid md:grid-cols-3 gap-px bg-white/5 border border-white/5 shadow-2xl">
                 {CHIP_ARCHITECTURES.map((chip, i) => (
                   <Reveal key={chip.id} delay={i * 0.1}>
                      <div className="bg-[#05080a] p-20 flex flex-col h-full hover:bg-white/[0.02] transition-all group cursor-crosshair border-white/5 border-r last:border-r-0">
                         <div className="flex justify-between items-start mb-16">
                            <div className="w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-cyan-600 group-hover:text-black transition-all duration-500">
                               <Cpu className="w-8 h-8" />
                            </div>
                            <span className={`px-4 py-2 bg-white/5 text-[9px] font-black uppercase tracking-[0.3em] ${chip.status === "Production" ? "text-cyan-400" : "text-yellow-500"}`}>{chip.status}</span>
                         </div>
                         
                         <h3 className="text-4xl font-black uppercase tracking-tighter mb-8 italic text-white group-hover:translate-x-4 transition-transform">{chip.name}</h3>
                         <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] mb-12">{chip.lithography}</div>
                         
                         <div className="space-y-8 mb-20 border-l border-cyan-400/20 pl-8">
                            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
                               <span className="text-white/20">Transistors</span>
                               <span className="text-white group-hover:text-cyan-400 transition-colors">{chip.transistors}</span>
                            </div>
                            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
                               <span className="text-white/20">Clock Speed</span>
                               <span className="text-white group-hover:text-cyan-400 transition-colors">{chip.clock}</span>
                            </div>
                            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
                               <span className="text-white/20">Efficiency</span>
                               <span className="text-white group-hover:text-cyan-400 transition-colors">{chip.efficiency}</span>
                            </div>
                         </div>

                         <p className="text-[12px] text-white/30 leading-loose uppercase tracking-[0.2em] font-bold italic mb-16">
                            {chip.desc}
                         </p>

                         <div className="mt-auto pt-10 border-t border-white/5 flex justify-between items-center">
                            <span className="text-[10px] font-black text-white/10 uppercase tracking-widest">Ref: {chip.id}</span>
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
            3. FABRICATION PIPELINE (INTERACTIVE DATA)
            ========================================== */}
        <section className="py-60 bg-black relative border-y border-white/5 overflow-hidden">
           <div className="max-w-[1400px] mx-auto px-8 md:px-24">
              <div className="grid lg:grid-cols-2 gap-40 items-center">
                 <div>
                    <Reveal>
                       <span className="text-[10px] font-black uppercase tracking-[0.5em] text-cyan-400 block mb-12 italic underline underline-offset-8 decoration-cyan-400/20">Fabrication // Workflow</span>
                       <h2 className="text-7xl md:text-[9vw] font-light italic leading-none text-white mb-16 uppercase tracking-tighter">
                          The <br/> <span className="not-italic font-black text-white/5 italic">Atomic_Flow.</span>
                       </h2>
                       <p className="text-2xl font-light text-white/20 leading-relaxed mb-24 italic uppercase tracking-[0.2em] max-w-xl">
                          Surveillance du pipeline de fabrication en temps réel. Nos protocoles de lithographie EUV repoussent les limites de la physique pour créer des structures de 0.5nm.
                       </p>
                       <div className="grid grid-cols-1 gap-px bg-white/5 border border-white/5 mb-24 shadow-2xl">
                          {FOUNDRY_METRICS.map((metric, i) => (
                            <div key={i} className="p-16 bg-[#0a0c0e] group hover:bg-white/[0.02] transition-all border-b last:border-b-0 border-white/5 flex justify-between items-center">
                               <div>
                                  <div className="text-[10px] font-black uppercase text-cyan-400 mb-4 tracking-[0.4em]">{metric.label}</div>
                                  <div className="text-5xl font-black text-white italic tracking-tighter group-hover:translate-x-4 transition-transform">{metric.value}</div>
                               </div>
                               <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.3em] text-white/10 italic">
                                  <Activity className="w-5 h-5 text-cyan-400" /> {metric.trend}
                               </div>
                            </div>
                          ))}
                       </div>
                       <button 
                         onClick={() => setIsLithoActive(!isLithoActive)}
                         className="w-full py-8 bg-cyan-600 text-white text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-2xl flex items-center justify-center gap-6 italic"
                       >
                          <Settings className="w-5 h-5" /> Re-Calibrate EUV Source
                       </button>
                    </Reveal>
                 </div>
                 
                 <div className="relative">
                    <Reveal delay={0.3} x={40}>
                       <div className="aspect-square bg-[#0a0c0e] border border-white/10 p-20 flex flex-col justify-between relative group overflow-hidden shadow-2xl">
                          <div className="absolute top-0 right-0 p-80 bg-cyan-400 opacity-[0.02] blur-[150px] rounded-full group-hover:opacity-[0.05] transition-opacity" />
                          
                          <div className="flex justify-between items-start z-10">
                             <div className="flex flex-col gap-3">
                                <span className="text-[10px] font-black text-white/10 uppercase tracking-[0.5em]">Fab_Node // ZRH-CENTRAL-01</span>
                                <span className="text-[12px] font-black text-white/40 uppercase tracking-[0.6em]">Litho_Density_Map</span>
                             </div>
                             <Wifi className="w-6 h-6 text-cyan-400" />
                          </div>
                          
                          {/* FAB VISUALIZER (SVG) */}
                          <div className="relative z-10 flex flex-col items-center justify-center h-full">
                             <div className="w-64 h-64 border border-cyan-400/5 rounded-full flex items-center justify-center relative">
                                <motion.div 
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                  className="absolute inset-0 border-t-2 border-cyan-400/20 rounded-full" 
                                />
                                <motion.div 
                                  animate={{ rotate: -360 }}
                                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                  className="absolute inset-8 border-b-2 border-cyan-400/10 rounded-full" 
                                />
                                <Atom className={`w-24 h-24 transition-colors duration-1000 ${isLithoActive ? "text-cyan-400 animate-pulse" : "text-white/5"}`} />
                             </div>
                             <div className="mt-16 text-center space-y-6">
                                <div className={`text-4xl font-black italic tracking-tighter ${isLithoActive ? "text-white" : "text-white/20"}`}>
                                   {isLithoActive ? "LITHO_STABLE" : "LITHO_OFFLINE"}
                                </div>
                                <span className="text-[11px] font-bold text-white/10 uppercase tracking-[0.6em] block">Auth_Node: ATOMIC_SYNC_01</span>
                             </div>
                          </div>

                          <div className="relative z-10 flex gap-6">
                             <div className="flex-1 h-1 bg-white/5 overflow-hidden">
                                <motion.div 
                                   animate={isLithoActive ? { x: ["-100%", "100%"] } : {}}
                                   transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
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
            4. CLEANROOM PROTOCOLS (TECH STORYTELLING)
            ========================================== */}
        <section className="py-60 bg-[#05080a] relative overflow-hidden border-t border-white/5">
           <div className="max-w-[1400px] mx-auto px-8 md:px-24">
              <div className="grid lg:grid-cols-2 gap-40 items-center">
                 <div className="relative aspect-[3/4] overflow-hidden group border border-white/5 shadow-2xl">
                    <Image 
                       src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop" 
                       alt="Wafer Detail" 
                       fill 
                       className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2000ms]"
                    />
                    <div className="absolute inset-0 bg-cyan-900/10 mix-blend-color group-hover:opacity-0 transition-opacity" />
                    <div className="absolute inset-0 p-20 flex flex-col justify-end bg-gradient-to-t from-black via-black/40 to-transparent">
                       <div className="text-white">
                          <span className="text-[11px] font-black uppercase tracking-[0.6em] text-cyan-400 mb-8 block italic underline underline-offset-8 decoration-cyan-400/20">Foundry // Purity // Unit</span>
                          <h4 className="text-6xl font-black tracking-tighter uppercase italic mb-12 mix-blend-difference text-white">Silicon <br/> Heritage.</h4>
                          <button className="flex items-center gap-6 text-[11px] font-black uppercase tracking-[0.4em] border-b border-white/20 pb-4 hover:border-cyan-400 transition-all group">
                             Cleanroom Protocols <ExternalLink className="w-5 h-5 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                          </button>
                       </div>
                    </div>
                 </div>

                 <div>
                    <Reveal>
                       <div className="mb-24 text-left">
                          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-cyan-400 mb-8 block italic">Chapitre III // Precision</span>
                          <h2 className="text-7xl md:text-[10vw] font-black tracking-tighter uppercase text-white italic leading-none text-white">Nano_State.</h2>
                       </div>
                       <p className="text-2xl font-light text-white/20 leading-relaxed italic mb-20 uppercase tracking-[0.2em]">
                          La fabrication de semi-conducteurs est une danse avec les lois de la physique. Nous opérons dans un environnement où une seule particule de poussière peut ruiner un mois de travail.
                       </p>
                       <div className="space-y-20">
                          {[
                            { t: "EUV Lithography", d: "Gravure par lumière ultraviolette extrême pour une résolution nanométrique sans précédent." },
                            { t: "Molecular Purity", d: "Filtration de l'air et de l'eau atteignant des niveaux de pureté de 99.99999%." },
                            { t: "Quantum Integrity", d: "Protection contre les interférences cosmiques et magnétiques pour garantir la stabilité des transistors." }
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
                    <div className="w-16 h-16 bg-cyan-600 flex items-center justify-center">
                      <Hexagon className="w-10 h-10 text-black" />
                    </div>
                    <span className="text-4xl font-black uppercase tracking-tighter italic">NEURAL<span className="text-white/20">FOUNDRY.</span></span>
                 </div>
                 <p className="text-white/20 text-[11px] font-black uppercase tracking-[0.5em] leading-loose max-w-sm mb-20 italic">
                    "L'intelligence commence au niveau atomique." — Archive Foundry V.12
                 </p>
                 <div className="flex gap-16">
                    {["FabLog", "ChipRegistry", "GitHub", "X_Protocol"].map(s => (
                      <Link key={s} href="#" className="text-[11px] font-black uppercase tracking-widest text-white/20 hover:text-cyan-400 transition-colors italic underline underline-offset-8 decoration-white/5">{s}</Link>
                    ))}
                 </div>
              </div>

              {[
                { t: "ARCHITECTURES", l: ["Neural-Core", "Quantum-Sync", "Bio-Link", "Mobile-Edge"] },
                { t: "FABRICATION", l: ["EUV Litho", "Ion Implant", "Plasma Etch", "Wafer Test"] },
                { t: "FOUNDRY", l: ["Our Legacy", "Sustainability", "Locations", "Support"] }
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
              <span>© 2026 NEURAL FOUNDRY SEMICONDUCTOR AG. // ALL_RIGHTS_RESERVED</span>
              <div className="flex gap-16">
                 <span>STATUS: OPERATIONAL</span>
                 <span>PRECISION: 0.5nm (MIN)</span>
                 <span>v12.4.0-STABLE</span>
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

function HUD_Overlay({ isLithoActive }: { isLithoActive: boolean }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
       {/* Corner Brackets */}
       <div className={`absolute top-12 left-12 w-20 h-20 border-t-2 border-l-2 transition-colors duration-1000 ${isLithoActive ? "border-cyan-400" : "border-white/10"}`} />
       <div className={`absolute top-12 right-12 w-20 h-20 border-t-2 border-r-2 transition-colors duration-1000 ${isLithoActive ? "border-cyan-400" : "border-white/10"}`} />
       <div className={`absolute bottom-12 left-12 w-20 h-20 border-b-2 border-l-2 transition-colors duration-1000 ${isLithoActive ? "border-cyan-400" : "border-white/10"}`} />
       <div className={`absolute bottom-12 right-12 w-20 h-20 border-b-2 border-r-2 transition-colors duration-1000 ${isLithoActive ? "border-cyan-400" : "border-white/10"}`} />

       {/* Top Status Bar */}
       <div className="absolute top-12 left-1/2 -translate-x-1/2 flex items-center gap-20 bg-black/60 backdrop-blur-2xl px-12 py-4 border border-white/10 rounded-none">
          <div className="flex items-center gap-6 text-white">
             <div className={`w-3 h-3 transition-colors duration-500 ${isLithoActive ? "bg-cyan-400 animate-pulse" : "bg-red-500 animate-ping"}`} />
             <span className="text-[10px] font-black uppercase tracking-[0.4em] italic leading-none">Litho_Sync: {isLithoActive ? "NOMINAL" : "CRITICAL_ERROR"} // Status: ACTIVE</span>
          </div>
          <div className="h-4 w-px bg-white/20" />
          <div className="flex items-center gap-6 text-white/20">
             <Wifi className="w-4 h-4" /> 
             <span className="text-[10px] font-black uppercase tracking-[0.4em] italic leading-none">Cleanroom_Grid: SECURE</span>
          </div>
       </div>

       {/* Right Rotation Info */}
       <div className="absolute right-12 top-1/2 -translate-y-1/2 rotate-90 origin-right hidden lg:block">
          <span className="text-[10px] font-black uppercase tracking-[0.8em] text-white/5 italic">Unauthorized_Duplication_Of_Circuit_Patterns_Is_Strictly_Monitored_By_Global_Foundry_Alliance</span>
       </div>
    </div>
  )
}
