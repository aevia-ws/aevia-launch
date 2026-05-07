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
  Mic, Volume2, Speaker, Wind, 
  Activity, Zap, Cpu, Shield, 
  Target, Layers, Box, Hexagon, 
  Terminal, Settings, Power, Info, 
  AlertTriangle, ChevronRight, ArrowRight, 
  Share2, Maximize2, Download, ExternalLink, 
  Archive, Hash, Wifi, BarChart3, 
  Microscope, Fingerprint, Scan, 
  Brain, Server, ShieldCheck, 
  ShieldAlert, Award, Briefcase, 
  Music, Waves, Radio, Ear, 
  Ghost, Gauge, Timer, Lightbulb, 
  Command, Grid, Radar
} from "lucide-react"

/* ==========================================================================
   THE ECHO HORIZON DATASET (ULTRA DENSITY)
   ========================================================================== */

const ACOUSTIC_MATERIALS = [
  {
    id: "mat-poly-92",
    name: "HD-Polymer Foam",
    type: "Absorption Layer",
    nrc: "0.95",
    density: "42 kg/m³",
    thickness: "50mm",
    desc: "Mousse polymère à cellules ouvertes conçue pour l'absorption maximale des fréquences moyennes et hautes.",
    status: "Optimal"
  },
  {
    id: "mat-wood-04",
    name: "Noble Oak Diffuser",
    type: "Diffusion Panel",
    nrc: "0.15",
    density: "720 kg/m³",
    thickness: "120mm",
    desc: "Diffuseur quadratique en chêne massif pour une dispersion uniforme du son sans perte d'énergie acoustique.",
    status: "Premium"
  },
  {
    id: "mat-helm-08",
    name: "Helmholtz Resonator",
    type: "Bass Trap",
    nrc: "0.85 (Low-Freq)",
    density: "N/A",
    thickness: "200mm",
    desc: "Résonateur accordé spécifiquement pour l'élimination des ondes stationnaires dans les basses fréquences.",
    status: "Custom"
  }
]

const SONIC_METRICS = [
  { label: "RT60 (Avg)", value: "0.42s", trend: "Controlled" },
  { label: "NRC Coefficient", value: "0.88", trend: "High" },
  { label: "Sound Isolation", value: "62 dB", trend: "Maximum" },
  { label: "Signal Purity", value: "99.9%", trend: "Stable" }
]

const ACOUSTIC_LOGS = [
  { timestamp: "16:14:42", unit: "Room-Audit-01", status: "STABLE", db: "12.4 dB" },
  { timestamp: "16:14:45", unit: "Freq-Sweep-Z", status: "ACTIVE", range: "20Hz-20kHz" },
  { timestamp: "16:14:48", unit: "Sync-Check", status: "SUCCESS", latency: "0.1ms" }
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

function SoundWaveVisualizer() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY })
    window.addEventListener("mousemove", handleMouse)
    return () => window.removeEventListener("mousemove", handleMouse)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-5">
       <svg width="100%" height="100%" className="w-full h-full">
          {[...Array(12)].map((_, i) => (
            <motion.path 
               key={i}
               d={`M 0 ${100 + i * 80} Q 400 ${50 + i * 20} 800 ${100 + i * 80} T 1600 ${100 + i * 80}`}
               stroke="white" 
               strokeWidth="0.5" 
               fill="none"
               animate={{ d: `M 0 ${100 + i * 80} Q ${mousePos.x} ${mousePos.y / (i+1)} 800 ${100 + i * 80} T 1600 ${100 + i * 80}` }}
               transition={{ type: "spring", damping: 20, stiffness: 50 }}
            />
          ))}
       </svg>
    </div>
  )
}

function AcousticModel({ progress }: { progress: any }) {
  const rotate = useTransform(progress, [0, 1], [0, 360])
  const scale = useTransform(progress, [0, 0.5, 1], [1, 1.2, 1])

  return (
    <motion.div style={{ rotate, scale }} className="relative w-80 h-80 flex items-center justify-center">
       <div className="absolute inset-0 border border-amber-400/10 rounded-full animate-spin-slow shadow-[0_0_80px_rgba(251,191,36,0.05)]" />
       <Ear className="w-32 h-32 text-amber-400/10" />
       <div className="absolute inset-8 border border-amber-400/5 rounded-full" />
    </motion.div>
  )
}

/* ==========================================
   THE ECHO HORIZON - MAIN INTERFACE
   ========================================== */

export default function EchoHorizonPremium() {
  const [activeMaterial, setActiveMaterial] = useState(0)
  const [isFreqSweepActive, setIsFreqSweepActive] = useState(true)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })

  // Acoustic Scroll Effects
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  return (
    <div ref={containerRef} className="bg-[#050505] text-[#e0e2e5] font-mono selection:bg-amber-500/30 selection:text-white min-h-screen overflow-x-hidden transition-colors duration-1000">
      
      {/* GLOBAL HUD OVERLAY */}
      <HUD_Overlay isFreqSweepActive={isFreqSweepActive} />

      <main>
        {/* ==========================================
            1. SONIC IGNITION (HERO)
            ========================================== */}
        <section className="relative h-screen flex flex-col justify-center items-center px-8 md:px-24 overflow-hidden pt-20">
          <SoundWaveVisualizer />
          <motion.div style={{ opacity: heroOpacity }} className="absolute z-0 pointer-events-none flex items-center justify-center">
             <AcousticModel progress={scrollYProgress} />
          </motion.div>

          <div className="relative z-10 text-center max-w-7xl">
             <Reveal>
                <div className="inline-flex items-center gap-4 px-6 py-2 border border-amber-400/30 bg-amber-400/5 text-[10px] font-black uppercase tracking-[0.5em] text-amber-400 mb-12 italic">
                   <ActivityIcon className="w-4 h-4" /> Acoustic_Link: STABLE // RT60_0.42s
                </div>
                <motion.h1 style={{ y: textY }} className="text-7xl md:text-[14vw] font-black tracking-tighter uppercase mb-16 leading-[0.75] italic">
                   Echo <br/> <span className="text-white/5 italic">Horizon.</span>
                </motion.h1>
                <p className="max-w-3xl mx-auto text-sm md:text-lg text-white/30 leading-relaxed uppercase tracking-widest font-light mb-16 italic">
                   L'ingénierie acoustique au service de l'architecture. Nous sculptons le silence et la clarté sonore pour créer des espaces immersifs de haute fidélité.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                   <button className="px-12 py-6 bg-amber-600 text-black text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_40px_rgba(251,191,36,0.2)] flex items-center gap-4 italic">
                      <Volume2 className="w-5 h-5" /> Start Audit
                   </button>
                   <button className="px-12 py-6 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all flex items-center gap-4 italic">
                      <Archive className="w-5 h-5" /> Material Registry
                   </button>
                </div>
             </Reveal>
          </div>

          <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end border-t border-white/5 pt-12">
             <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4 text-[9px] font-bold text-white/20 uppercase tracking-widest italic">
                   <div className="w-16 h-px bg-white/10" />
                   Studio_ID: ECHO-ZRH-42
                </div>
                <div className="flex items-center gap-4 text-[9px] font-bold text-white/20 uppercase tracking-widest italic">
                   <div className="w-16 h-px bg-white/10" />
                   Acoustic_Class: GRADE_A
                </div>
             </div>
             <div className="text-right flex flex-col items-end gap-4">
                <span className="text-[8px] font-black uppercase tracking-[0.5em] text-amber-400">Sonic_Wave_Stream</span>
                <div className="flex gap-2 h-12 items-end">
                   {[...Array(16)].map((_, i) => (
                     <motion.div 
                        key={i}
                        animate={{ height: ["10%", "100%", "30%", "80%", "10%"] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                        className="w-2 bg-amber-400/20"
                     />
                   ))}
                </div>
             </div>
          </div>
        </section>

        {/* ==========================================
            2. MATERIAL REGISTRY (DENSE TECHNICAL)
            ========================================== */}
        <section className="py-60 bg-[#080808] relative border-y border-white/5 overflow-hidden">
           <div className="max-w-[1600px] mx-auto px-8 md:px-24">
              <div className="flex flex-col md:flex-row items-end justify-between mb-40 gap-12">
                 <Reveal>
                    <span className="text-[10px] font-black uppercase tracking-[0.6em] text-amber-400 block mb-6 italic underline underline-offset-8 decoration-amber-400/20">Acoustic // Engineering</span>
                    <h2 className="text-6xl md:text-[10vw] font-black uppercase tracking-tighter italic leading-none text-white">Registry.</h2>
                 </Reveal>
                 <div className="text-right">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 block mb-4 italic">Registry // Sound_Audit</span>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-400">L'Architecture du Silence</p>
                 </div>
              </div>

              <div className="grid md:grid-cols-3 gap-px bg-white/5 border border-white/5 shadow-2xl">
                 {ACOUSTIC_MATERIALS.map((mat, i) => (
                   <Reveal key={mat.id} delay={i * 0.1}>
                      <div className="bg-[#050505] p-20 flex flex-col h-full hover:bg-white/[0.02] transition-all group cursor-crosshair border-white/5 border-r last:border-r-0">
                         <div className="flex justify-between items-start mb-16">
                            <div className="w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-black transition-all duration-500">
                               <Waves className="w-8 h-8" />
                            </div>
                            <span className={`px-4 py-2 bg-white/5 text-[9px] font-black uppercase tracking-[0.3em] ${mat.status === "Optimal" ? "text-amber-400" : "text-white/40"}`}>{mat.status}</span>
                         </div>
                         
                         <h3 className="text-4xl font-black uppercase tracking-tighter mb-8 italic text-white group-hover:translate-x-4 transition-transform">{mat.name}</h3>
                         <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] mb-12">{mat.type}</div>
                         
                         <div className="space-y-8 mb-20 border-l border-amber-400/20 pl-8">
                            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
                               <span className="text-white/20">NRC Coeff.</span>
                               <span className="text-white group-hover:text-amber-400 transition-colors">{mat.nrc}</span>
                            </div>
                            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
                               <span className="text-white/20">Density</span>
                               <span className="text-white group-hover:text-amber-400 transition-colors">{mat.density}</span>
                            </div>
                            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
                               <span className="text-white/20">Thickness</span>
                               <span className="text-white group-hover:text-amber-400 transition-colors">{mat.thickness}</span>
                            </div>
                         </div>

                         <p className="text-[12px] text-white/30 leading-loose uppercase tracking-[0.2em] font-bold italic mb-16">
                            {mat.desc}
                         </p>

                         <div className="mt-auto pt-10 border-t border-white/5 flex justify-between items-center">
                            <span className="text-[10px] font-black text-white/10 uppercase tracking-widest">Ref: {mat.id}</span>
                            <button className="text-[10px] font-black uppercase text-white/40 flex items-center gap-4 group-hover:text-white transition-all">
                               System_Specs <ChevronRight className="w-5 h-5" />
                            </button>
                         </div>
                      </div>
                   </Reveal>
                 ))}
              </div>
           </div>
        </section>

        {/* ==========================================
            3. SONIC MONITOR (INTERACTIVE DATA)
            ========================================== */}
        <section className="py-60 bg-black relative border-y border-white/5 overflow-hidden">
           <div className="max-w-[1400px] mx-auto px-8 md:px-24">
              <div className="grid lg:grid-cols-2 gap-40 items-center">
                 <div>
                    <Reveal>
                       <span className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-400 block mb-12 italic underline underline-offset-8 decoration-amber-400/20">Sonic // Performance</span>
                       <h2 className="text-7xl md:text-[9vw] font-light italic leading-none text-white mb-16 uppercase tracking-tighter">
                          The <br/> <span className="not-italic font-black text-white/5 italic">Echo_Link.</span>
                       </h2>
                       <p className="text-2xl font-light text-white/20 leading-relaxed mb-24 italic uppercase tracking-[0.2em] max-w-xl">
                          Surveillance des ondes stationnaires en temps réel. Nos algorithmes de simulation acoustique anticipent les réflexions parasites pour garantir une intelligibilité parfaite.
                       </p>
                       <div className="grid grid-cols-2 gap-px bg-white/5 border border-white/5 mb-24 shadow-2xl">
                          {SONIC_METRICS.map((metric, i) => (
                            <div key={i} className="p-16 bg-[#0a0a0a] group hover:bg-white/[0.02] transition-all border-r border-b last:border-r-0 border-white/5">
                               <div className="text-[10px] font-black uppercase text-amber-400 mb-6 tracking-[0.4em]">{metric.label}</div>
                               <div className="text-5xl font-black text-white italic mb-6 tracking-tighter group-hover:translate-x-4 transition-transform">{metric.value}</div>
                               <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.3em] text-white/10 italic">
                                  <Activity className="w-4 h-4 text-amber-400" /> {metric.trend}
                               </div>
                            </div>
                          ))}
                       </div>
                       <button 
                         onClick={() => setIsFreqSweepActive(!isFreqSweepActive)}
                         className="w-full py-8 bg-amber-600 text-black text-[11px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-2xl flex items-center justify-center gap-6 italic"
                       >
                          <Settings className="w-5 h-5" /> Re-Sync Frequency Nodes
                       </button>
                    </Reveal>
                 </div>
                 
                 <div className="relative">
                    <Reveal delay={0.3} x={40}>
                       <div className="aspect-square bg-[#0a0a0a] border border-white/10 p-20 flex flex-col justify-between relative group overflow-hidden shadow-2xl">
                          <div className="absolute top-0 right-0 p-80 bg-amber-400 opacity-[0.02] blur-[150px] rounded-full group-hover:opacity-[0.05] transition-opacity" />
                          
                          <div className="flex justify-between items-start z-10">
                             <div className="flex flex-col gap-3">
                                <span className="text-[10px] font-black text-white/10 uppercase tracking-[0.5em]">Echo_Link // SONIC-SYNC-v4</span>
                                <span className="text-[12px] font-black text-white/40 uppercase tracking-[0.6em]">Sound_Density_Map</span>
                             </div>
                             <Wifi className="w-6 h-6 text-amber-400" />
                          </div>
                          
                          {/* SONIC VISUALIZER (SVG) */}
                          <div className="relative z-10 flex flex-col items-center justify-center h-full">
                             <div className="w-64 h-64 border border-amber-400/5 rounded-full flex items-center justify-center relative">
                                <motion.div 
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                                  className="absolute inset-0 border-t-2 border-amber-400/20 rounded-full" 
                                />
                                <motion.div 
                                  animate={{ rotate: -360 }}
                                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                  className="absolute inset-8 border-b-2 border-amber-400/10 rounded-full" 
                                />
                                <Volume2 className={`w-24 h-24 transition-colors duration-1000 ${isFreqSweepActive ? "text-amber-400 animate-pulse" : "text-white/5"}`} />
                             </div>
                             <div className="mt-16 text-center space-y-6">
                                <div className={`text-4xl font-black italic tracking-tighter ${isFreqSweepActive ? "text-white" : "text-white/20"}`}>
                                   {isFreqSweepActive ? "FREQ_LOCKED" : "FREQ_UNSTABLE"}
                                </div>
                                <span className="text-[11px] font-bold text-white/10 uppercase tracking-[0.6em] block">Auth_Node: STUDIO_HEAD_01</span>
                             </div>
                          </div>

                          <div className="relative z-10 flex gap-6">
                             <div className="flex-1 h-1 bg-white/5 overflow-hidden">
                                <motion.div 
                                   animate={isFreqSweepActive ? { x: ["-100%", "100%"] } : {}}
                                   transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                   className="w-1/2 h-full bg-amber-600"
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
            4. ACOUSTIC STORY (TECH STORYTELLING)
            ========================================== */}
        <section className="py-60 bg-[#050505] relative overflow-hidden border-t border-white/5">
           <div className="max-w-[1400px] mx-auto px-8 md:px-24">
              <div className="grid lg:grid-cols-2 gap-40 items-center">
                 <div className="relative aspect-[3/4] overflow-hidden group border border-white/5 shadow-2xl">
                    <Image 
                       src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop" 
                       alt="Concert Hall" 
                       fill 
                       className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2000ms]"
                    />
                    <div className="absolute inset-0 bg-amber-900/10 mix-blend-color group-hover:opacity-0 transition-opacity" />
                    <div className="absolute inset-0 p-20 flex flex-col justify-end bg-gradient-to-t from-black via-black/40 to-transparent">
                       <div className="text-white">
                          <span className="text-[11px] font-black uppercase tracking-[0.6em] text-amber-400 mb-8 block italic underline underline-offset-8 decoration-amber-400/20">Atelier // Purity // Unit</span>
                          <h4 className="text-6xl font-black tracking-tighter uppercase italic mb-12 mix-blend-difference text-white">Sonic <br/> Architecture.</h4>
                          <button className="flex items-center gap-6 text-[11px] font-black uppercase tracking-[0.4em] border-b border-white/20 pb-4 hover:border-amber-400 transition-all group">
                             Acoustic Protocols <ExternalLink className="w-5 h-5 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                          </button>
                       </div>
                    </div>
                 </div>

                 <div>
                    <Reveal>
                       <div className="mb-24 text-left">
                          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-400 mb-8 block italic">Chapitre III // Precision</span>
                          <h2 className="text-7xl md:text-[10vw] font-black tracking-tighter uppercase text-white italic leading-none text-white">Pure_Echo.</h2>
                       </div>
                       <p className="text-2xl font-light text-white/20 leading-relaxed italic mb-20 uppercase tracking-[0.2em]">
                          L'espace acoustique est une extension de l'architecture. Nous concevons des environnements où le son devient une matière sculptable, garantissant une immersion totale.
                       </p>
                       <div className="space-y-20">
                          {[
                            { t: "Mechanical Decoupling", d: "Isolement structurel complet pour éviter la transmission des bruits solidiens et des vibrations." },
                            { t: "Quadratic Diffusion", d: "Calculs mathématiques précis pour une dispersion spatiale du son, évitant les échos flottants." },
                            { t: "Resonant Control", d: "Traitement sélectif des modes propres de la pièce pour une réponse en fréquence parfaitement linéaire." }
                          ].map((step, i) => (
                            <div key={i} className="group flex gap-12 border-b border-white/5 pb-16 hover:border-amber-400/20 transition-all cursor-default">
                               <div className="text-6xl font-black text-white/5 group-hover:text-amber-400/20 transition-colors italic leading-none">0{i+1}</div>
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
                    <div className="w-16 h-16 bg-amber-600 flex items-center justify-center">
                      <Speaker className="w-10 h-10 text-black" />
                    </div>
                    <span className="text-4xl font-black uppercase tracking-tighter italic">ECHO<span className="text-white/20">HORIZON.</span></span>
                 </div>
                 <p className="text-white/20 text-[11px] font-black uppercase tracking-[0.5em] leading-loose max-w-sm mb-20 italic">
                    "L'excellence sonore commence par le silence." — Archive Echo V.4
                 </p>
                 <div className="flex gap-16">
                    {["AcousticLog", "MaterialRegistry", "GitHub", "X_Protocol"].map(s => (
                      <Link key={s} href="#" className="text-[11px] font-black uppercase tracking-widest text-white/20 hover:text-amber-400 transition-colors italic underline underline-offset-8 decoration-white/5">{s}</Link>
                    ))}
                 </div>
              </div>

              {[
                { t: "MATERIALS", l: ["Polymer Foam", "Wood Diffusers", "Bass Traps", "Resonators"] },
                { t: "TECHNOLOGY", l: ["RT60 Simulation", "Sound Isolation", "NRC Metrics", "Acoustic Mapping"] },
                { t: "ATELIER", l: ["Our Legacy", "Sustainability", "Locations", "Support"] }
              ].map((col, i) => (
                <div key={i} className="flex flex-col gap-12">
                  <h4 className="text-[11px] font-black text-amber-400 uppercase tracking-[0.6em] italic">{col.t}</h4>
                  <ul className="flex flex-col gap-8">
                    {col.l.map(link => (
                      <li key={link} className="text-[11px] font-bold text-white/20 hover:text-white transition-colors cursor-pointer uppercase tracking-[0.4em] italic">{link}</li>
                    ))}
                  </ul>
                </div>
              ))}
           </div>

           <div className="max-w-[1600px] mx-auto border-t border-white/5 pt-16 flex flex-col md:flex-row justify-between items-center gap-16 text-[10px] font-black text-white/10 uppercase tracking-[0.6em] italic">
              <span>© 2026 ECHO HORIZON ARCHITECTURAL ACOUSTICS AG. // ALL_RIGHTS_RESERVED</span>
              <div className="flex gap-16">
                 <span>STATUS: OPERATIONAL</span>
                 <span>RT60: 0.42s (AVG)</span>
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

function HUD_Overlay({ isFreqSweepActive }: { isFreqSweepActive: boolean }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
       {/* Corner Brackets */}
       <div className={`absolute top-12 left-12 w-20 h-20 border-t-2 border-l-2 transition-colors duration-1000 ${isFreqSweepActive ? "border-amber-400" : "border-white/10"}`} />
       <div className={`absolute top-12 right-12 w-20 h-20 border-t-2 border-r-2 transition-colors duration-1000 ${isFreqSweepActive ? "border-amber-400" : "border-white/10"}`} />
       <div className={`absolute bottom-12 left-12 w-20 h-20 border-b-2 border-l-2 transition-colors duration-1000 ${isFreqSweepActive ? "border-amber-400" : "border-white/10"}`} />
       <div className={`absolute bottom-12 right-12 w-20 h-20 border-b-2 border-r-2 transition-colors duration-1000 ${isFreqSweepActive ? "border-amber-400" : "border-white/10"}`} />

       {/* Top Status Bar */}
       <div className="absolute top-12 left-1/2 -translate-x-1/2 flex items-center gap-20 bg-black/60 backdrop-blur-2xl px-12 py-4 border border-white/10 rounded-none">
          <div className="flex items-center gap-6 text-white">
             <div className={`w-3 h-3 transition-colors duration-500 ${isFreqSweepActive ? "bg-amber-400 animate-pulse" : "bg-red-500 animate-ping"}`} />
             <span className="text-[10px] font-black uppercase tracking-[0.4em] italic leading-none">Sonic_Sync: {isFreqSweepActive ? "LOCKED" : "UNSTABLE"} // Status: ACTIVE</span>
          </div>
          <div className="h-4 w-px bg-white/20" />
          <div className="flex items-center gap-6 text-white/20">
             <Wifi className="w-4 h-4" /> 
             <span className="text-[10px] font-black uppercase tracking-[0.4em] italic leading-none">Studio_Grid: SECURE</span>
          </div>
       </div>

       {/* Right Rotation Info */}
       <div className="absolute right-12 top-1/2 -translate-y-1/2 rotate-90 origin-right hidden lg:block">
          <span className="text-[10px] font-black uppercase tracking-[0.8em] text-white/5 italic">Unauthorized_Duplication_Of_Acoustic_Patterns_Is_Strictly_Monitored_By_Global_Sound_Alliance</span>
       </div>
    </div>
  )
}
