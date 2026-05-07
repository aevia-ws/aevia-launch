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
  Activity, Zap, Cpu, Shield, 
  Target, Layers, Box, Hexagon, 
  Terminal, Settings, Power, Info, 
  AlertTriangle, ChevronRight, ArrowRight, 
  Share2, Maximize2, Download, ExternalLink, 
  Archive, Hash, Wifi, BarChart3, 
  Microscope, Fingerprint, Scan, 
  Brain, Server, ShieldCheck, 
  ShieldAlert, Award, Briefcase, 
  Wind, Flame, Droplets, Magnet, 
  RefreshCcw, Move, Gauge, Timer, 
  Lightbulb, Zap as ZapIcon, 
  Activity as ActivityIcon, Code, 
  Command, Grid, Radar
} from "lucide-react"

/* ==========================================================================
   THE KINETIC MESH DATASET (ULTRA DENSITY)
   ========================================================================== */

const FIBER_ASSETS = [
  {
    id: "fiber-gr-92",
    name: "Graphene-Core v9",
    type: "Conductive Thread",
    elasticity: "420%",
    thermal_cond: "5300 W/mK",
    durability: "10k Cycles",
    desc: "Fibre infusée au graphène permettant une régulation thermique active et une transmission de données biométriques sans latence.",
    status: "Production"
  },
  {
    id: "fiber-cn-04",
    name: "Carbon-Nanotube Mesh",
    type: "Structural Support",
    elasticity: "120%",
    thermal_cond: "3000 W/mK",
    durability: "50k Cycles",
    desc: "Maillage de nanotubes de carbone offrant une protection contre les impacts tout en conservant une légèreté absolue.",
    status: "Testing"
  },
  {
    id: "fiber-sm-08",
    name: "Shape-Memory Poly",
    type: "Adaptive Textile",
    elasticity: "800%",
    thermal_cond: "12 W/mK",
    durability: "5k Cycles",
    desc: "Polymère à mémoire de forme réagissant à la température corporelle pour ajuster la compression et la ventilation en temps réel.",
    status: "R&D"
  }
]

const PERFORMANCE_METRICS = [
  { label: "Moisture Wick", value: "99.8%", trend: "Optimal" },
  { label: "Thermal Offset", value: "-2.4°C", trend: "Cooling" },
  { label: "Compression", value: "Level 4", trend: "Adaptive" },
  { label: "Sensor Uptime", value: "100%", trend: "Stable" }
]

const FABRICATION_LOGS = [
  { timestamp: "12:14:42", unit: "Knitting-Node-01", status: "ACTIVE", density: "420 ppi" },
  { timestamp: "12:14:45", unit: "Vapor-Coating-Z", status: "STABLE", thickness: "12nm" },
  { timestamp: "12:14:48", unit: "Biometric-Test", status: "SUCCESS", sync: "100%" }
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

function WovenGridVisualizer() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY })
    window.addEventListener("mousemove", handleMouse)
    return () => window.removeEventListener("mousemove", handleMouse)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-5">
       <svg width="100%" height="100%" className="w-full h-full">
          <pattern id="woven-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
             <path d="M 0 20 L 40 20 M 20 0 L 20 40" stroke="white" strokeWidth="0.5" fill="none" />
             <circle cx="20" cy="20" r="1" fill="white" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#woven-grid)" />
          {/* Reactive Interaction */}
          <motion.circle 
             animate={{ cx: mousePos.x, cy: mousePos.y }}
             transition={{ type: "spring", damping: 30, stiffness: 200 }}
             r="100" 
             fill="white" 
             className="opacity-20 blur-3xl"
          />
       </svg>
    </div>
  )
}

function KineticTextileModel({ progress }: { progress: any }) {
  const rotate = useTransform(progress, [0, 1], [0, 360])
  const scale = useTransform(progress, [0, 0.5, 1], [1, 1.2, 1])

  return (
    <motion.div style={{ rotate, scale }} className="relative w-80 h-80 flex items-center justify-center">
       <div className="absolute inset-0 border-[2px] border-lime-400/10 rounded-xl animate-pulse" />
       <Move className="w-40 h-40 text-lime-400/10 animate-pulse" />
       <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[110%] h-[110%] border border-lime-400/5 rounded-full" />
          <div className="w-[130%] h-[130%] border border-lime-400/2 rounded-full" />
       </div>
    </motion.div>
  )
}

/* ==========================================
   THE KINETIC MESH - MAIN INTERFACE
   ========================================== */

export default function KineticMeshPremium() {
  const [activeFiber, setActiveFiber] = useState(0)
  const [isSensorActive, setIsSensorActive] = useState(true)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })

  // Performance Scroll Effects
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const textX = useTransform(scrollYProgress, [0, 0.5], [0, -100])

  return (
    <div ref={containerRef} className="bg-[#050608] text-[#e0e8ed] font-mono selection:bg-lime-500/30 selection:text-white min-h-screen overflow-x-hidden transition-colors duration-1000">
      
      {/* GLOBAL HUD OVERLAY */}
      <HUD_Overlay isSensorActive={isSensorActive} />

      <main>
        {/* ==========================================
            1. KINETIC IGNITION (HERO)
            ========================================== */}
        <section className="relative h-screen flex flex-col justify-center items-center px-8 md:px-24 overflow-hidden pt-20">
          <WovenGridVisualizer />
          <motion.div style={{ opacity: heroOpacity }} className="absolute z-0 pointer-events-none">
             <KineticTextileModel progress={scrollYProgress} />
          </motion.div>

          <div className="relative z-10 text-center max-w-7xl">
             <Reveal>
                <div className="inline-flex items-center gap-4 px-6 py-2 border border-lime-400/30 bg-lime-400/5 text-[10px] font-black uppercase tracking-[0.5em] text-lime-400 mb-12 italic">
                   <ActivityIcon className="w-4 h-4" /> Biometric_Link: ACTIVE // SIGNAL_99%
                </div>
                <motion.h1 style={{ x: textX }} className="text-7xl md:text-[14vw] font-black tracking-tighter uppercase mb-16 leading-[0.75] italic">
                   Kinetic <br/> <span className="text-white/5 italic">Mesh.</span>
                </motion.h1>
                <p className="max-w-3xl mx-auto text-sm md:text-lg text-white/30 leading-relaxed uppercase tracking-widest font-light mb-16 italic">
                   L'ingénierie textile au service de la performance humaine. Nous créons des vêtements qui respirent, réagissent et communiquent avec votre corps.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                   <button className="px-12 py-6 bg-lime-600 text-black text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_40px_rgba(163,230,53,0.3)] flex items-center gap-4 italic">
                      <ZapIcon className="w-5 h-5" /> Start Performance
                   </button>
                   <button className="px-12 py-6 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all flex items-center gap-4 italic">
                      <Database className="w-5 h-5" /> Fiber Registry
                   </button>
                </div>
             </Reveal>
          </div>

          <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end border-t border-white/5 pt-12">
             <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4 text-[9px] font-bold text-white/20 uppercase tracking-widest italic">
                   <div className="w-16 h-px bg-white/10" />
                   Subject_ID: KINETIC-42-X
                </div>
                <div className="flex items-center gap-4 text-[9px] font-bold text-white/20 uppercase tracking-widest italic">
                   <div className="w-16 h-px bg-white/10" />
                   Mesh_Status: NOMINAL
                </div>
             </div>
             <div className="text-right flex flex-col items-end gap-4">
                <span className="text-[8px] font-black uppercase tracking-[0.5em] text-lime-400">Sensor_Pulse_Stream</span>
                <div className="flex gap-2 h-12 items-end">
                   {[...Array(16)].map((_, i) => (
                     <motion.div 
                        key={i}
                        animate={{ height: ["10%", "100%", "30%", "80%", "10%"] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                        className="w-2 bg-lime-400/20"
                     />
                   ))}
                </div>
             </div>
          </div>
        </section>

        {/* ==========================================
            2. FIBER REGISTRY (DENSE TECHNICAL)
            ========================================== */}
        <section className="py-60 bg-[#080a0c] relative border-y border-white/5 overflow-hidden">
           <div className="max-w-[1600px] mx-auto px-8 md:px-24">
              <div className="flex flex-col md:flex-row items-end justify-between mb-40 gap-12">
                 <Reveal>
                    <span className="text-[10px] font-black uppercase tracking-[0.6em] text-lime-400 block mb-6 italic underline underline-offset-8 decoration-lime-400/20">Fiber // Engineering</span>
                    <h2 className="text-6xl md:text-[10vw] font-black uppercase tracking-tighter italic leading-none text-white">Registry.</h2>
                 </Reveal>
                 <div className="text-right">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 block mb-4 italic">Registry // Material_Audit</span>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-lime-400">L'Architecture du Textile</p>
                 </div>
              </div>

              <div className="grid md:grid-cols-3 gap-px bg-white/5 border border-white/5 shadow-2xl">
                 {FIBER_ASSETS.map((fiber, i) => (
                   <Reveal key={fiber.id} delay={i * 0.1}>
                      <div className="bg-[#050608] p-20 flex flex-col h-full hover:bg-white/[0.02] transition-all group cursor-crosshair border-white/5 border-r last:border-r-0">
                         <div className="flex justify-between items-start mb-16">
                            <div className="w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-lime-600 group-hover:text-black transition-all duration-500">
                               <Layers className="w-8 h-8" />
                            </div>
                            <span className={`px-4 py-2 bg-white/5 text-[9px] font-black uppercase tracking-[0.3em] ${fiber.status === "Production" ? "text-lime-400" : "text-yellow-500"}`}>{fiber.status}</span>
                         </div>
                         
                         <h3 className="text-4xl font-black uppercase tracking-tighter mb-8 italic text-white group-hover:translate-x-4 transition-transform">{fiber.name}</h3>
                         <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] mb-12">{fiber.type}</div>
                         
                         <div className="space-y-8 mb-20 border-l border-lime-400/20 pl-8">
                            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
                               <span className="text-white/20">Elasticity</span>
                               <span className="text-white group-hover:text-lime-400 transition-colors">{fiber.elasticity}</span>
                            </div>
                            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
                               <span className="text-white/20">Thermal Cond.</span>
                               <span className="text-white group-hover:text-lime-400 transition-colors">{fiber.thermal_cond}</span>
                            </div>
                            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
                               <span className="text-white/20">Durability</span>
                               <span className="text-white group-hover:text-lime-400 transition-colors">{fiber.durability}</span>
                            </div>
                         </div>

                         <p className="text-[12px] text-white/30 leading-loose uppercase tracking-[0.2em] font-bold italic mb-16">
                            {fiber.desc}
                         </p>

                         <div className="mt-auto pt-10 border-t border-white/5 flex justify-between items-center">
                            <span className="text-[10px] font-black text-white/10 uppercase tracking-widest">Ref: {fiber.id}</span>
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
            3. BIOMETRIC MONITOR (INTERACTIVE DATA)
            ========================================== */}
        <section className="py-60 bg-black relative border-y border-white/5 overflow-hidden">
           <div className="max-w-[1400px] mx-auto px-8 md:px-24">
              <div className="grid lg:grid-cols-2 gap-40 items-center">
                 <div>
                    <Reveal>
                       <span className="text-[10px] font-black uppercase tracking-[0.5em] text-lime-400 block mb-12 italic underline underline-offset-8 decoration-lime-400/20">Biometric // Feedback</span>
                       <h2 className="text-7xl md:text-[9vw] font-light italic leading-none text-white mb-16 uppercase tracking-tighter">
                          The <br/> <span className="not-italic font-black text-white/5 italic">Neural_Suit.</span>
                       </h2>
                       <p className="text-2xl font-light text-white/20 leading-relaxed mb-24 italic uppercase tracking-[0.2em] max-w-xl">
                          Surveillance des données corporelles en temps réel. Nos fibres conductrices capturent chaque micro-mouvement et ajustent la structure du textile pour une performance optimale.
                       </p>
                       <div className="grid grid-cols-2 gap-px bg-white/5 border border-white/5 mb-24 shadow-2xl">
                          {PERFORMANCE_METRICS.map((metric, i) => (
                            <div key={i} className="p-16 bg-[#0a0c0e] group hover:bg-white/[0.02] transition-all border-r border-b last:border-r-0 border-white/5">
                               <div className="text-[10px] font-black uppercase text-lime-400 mb-6 tracking-[0.4em]">{metric.label}</div>
                               <div className="text-5xl font-black text-white italic mb-6 tracking-tighter group-hover:translate-x-4 transition-transform">{metric.value}</div>
                               <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.3em] text-white/10 italic">
                                  <ActivityIcon className="w-4 h-4 text-lime-400" /> {metric.trend}
                               </div>
                            </div>
                          ))}
                       </div>
                       <button 
                         onClick={() => setIsSensorActive(!isSensorActive)}
                         className="w-full py-8 bg-lime-600 text-black text-[11px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-2xl flex items-center justify-center gap-6 italic"
                       >
                          <Settings className="w-5 h-5" /> Re-Calibrate Biometric Nodes
                       </button>
                    </Reveal>
                 </div>
                 
                 <div className="relative">
                    <Reveal delay={0.3} x={40}>
                       <div className="aspect-square bg-[#0a0c0e] border border-white/10 p-20 flex flex-col justify-between relative group overflow-hidden shadow-2xl">
                          <div className="absolute top-0 right-0 p-80 bg-lime-400 opacity-[0.02] blur-[150px] rounded-full group-hover:opacity-[0.05] transition-opacity" />
                          
                          <div className="flex justify-between items-start z-10">
                             <div className="flex flex-col gap-3">
                                <span className="text-[10px] font-black text-white/10 uppercase tracking-[0.5em]">Mesh_Link // KINETIC-SYNC-v9</span>
                                <span className="text-[12px] font-black text-white/40 uppercase tracking-[0.6em]">Biometric_Heat_Map</span>
                             </div>
                             <Wifi className="w-6 h-6 text-lime-400" />
                          </div>
                          
                          {/* BIOMETRIC VISUALIZER (SVG) */}
                          <div className="relative z-10 flex flex-col items-center justify-center h-full">
                             <div className="w-64 h-64 border border-lime-400/5 rounded-full flex items-center justify-center relative">
                                <motion.div 
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                  className="absolute inset-0 border-t-2 border-lime-400/20 rounded-full" 
                                />
                                <motion.div 
                                  animate={{ rotate: -360 }}
                                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                  className="absolute inset-8 border-b-2 border-lime-400/10 rounded-full" 
                                />
                                <ActivityIcon className={`w-24 h-24 transition-colors duration-1000 ${isSensorActive ? "text-lime-400 animate-pulse" : "text-white/5"}`} />
                             </div>
                             <div className="mt-16 text-center space-y-6">
                                <div className={`text-4xl font-black italic tracking-tighter ${isSensorActive ? "text-white" : "text-white/20"}`}>
                                   {isSensorActive ? "BIO_SYNC_ACTIVE" : "BIO_SYNC_LOST"}
                                </div>
                                <span className="text-[11px] font-bold text-white/10 uppercase tracking-[0.6em] block">Auth_Node: BODY_UNIT_01</span>
                             </div>
                          </div>

                          <div className="relative z-10 flex gap-6">
                             <div className="flex-1 h-1 bg-white/5 overflow-hidden">
                                <motion.div 
                                   animate={isSensorActive ? { x: ["-100%", "100%"] } : {}}
                                   transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                   className="w-1/2 h-full bg-lime-600"
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
            4. KNITTING PROTOCOLS (TECH STORYTELLING)
            ========================================== */}
        <section className="py-60 bg-[#050608] relative overflow-hidden border-t border-white/5">
           <div className="max-w-[1400px] mx-auto px-8 md:px-24">
              <div className="grid lg:grid-cols-2 gap-40 items-center">
                 <div className="relative aspect-[3/4] overflow-hidden group border border-white/5 shadow-2xl">
                    <Image 
                       src="https://images.unsplash.com/photo-1551219059-b5f8e7acee56?q=80&w=1200&auto=format&fit=crop" 
                       alt="Technical Fabric" 
                       fill 
                       className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2000ms]"
                    />
                    <div className="absolute inset-0 bg-lime-900/10 mix-blend-color group-hover:opacity-0 transition-opacity" />
                    <div className="absolute inset-0 p-20 flex flex-col justify-end bg-gradient-to-t from-black via-black/40 to-transparent">
                       <div className="text-white">
                          <span className="text-[11px] font-black uppercase tracking-[0.6em] text-lime-400 mb-8 block italic underline underline-offset-8 decoration-lime-400/20">Atelier // Purity // Unit</span>
                          <h4 className="text-6xl font-black tracking-tighter uppercase italic mb-12 mix-blend-difference text-white">Woven <br/> Intelligence.</h4>
                          <button className="flex items-center gap-6 text-[11px] font-black uppercase tracking-[0.4em] border-b border-white/20 pb-4 hover:border-lime-400 transition-all group">
                             Fabrication Protocols <ExternalLink className="w-5 h-5 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                          </button>
                       </div>
                    </div>
                 </div>

                 <div>
                    <Reveal>
                       <div className="mb-24 text-left">
                          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-lime-400 mb-8 block italic">Chapitre III // Performance</span>
                          <h2 className="text-7xl md:text-[10vw] font-black tracking-tighter uppercase text-white italic leading-none text-white">Synthetic_Pulse.</h2>
                       </div>
                       <p className="text-2xl font-light text-white/20 leading-relaxed italic mb-20 uppercase tracking-[0.2em]">
                          Le vêtement du futur est une interface vivante. Nous tricotons des fibres intelligentes pour créer une seconde peau capable de s'adapter à votre effort.
                       </p>
                       <div className="space-y-20">
                          {[
                            { t: "Multi-Axis Knitting", d: "Tricotage 3D complexe permettant une répartition précise de la compression et de la respirabilité." },
                            { t: "Molecular Coating", d: "Dépôt de couches fonctionnelles par vapeur pour une protection thermique et antibactérienne permanente." },
                            { t: "Neural Integration", d: "Connectivité invisible entre les capteurs textiles et votre écosystème de données personnel." }
                          ].map((step, i) => (
                            <div key={i} className="group flex gap-12 border-b border-white/5 pb-16 hover:border-lime-400/20 transition-all cursor-default">
                               <div className="text-6xl font-black text-white/5 group-hover:text-lime-400/20 transition-colors italic leading-none">0{i+1}</div>
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
                    <div className="w-16 h-16 bg-lime-600 flex items-center justify-center">
                      <Grid className="w-10 h-10 text-black" />
                    </div>
                    <span className="text-4xl font-black uppercase tracking-tighter italic">KINETIC<span className="text-white/20">MESH.</span></span>
                 </div>
                 <p className="text-white/20 text-[11px] font-black uppercase tracking-[0.5em] leading-loose max-w-sm mb-20 italic">
                    "La peau de demain est programmée ici." — Archive Mesh V.9
                 </p>
                 <div className="flex gap-16">
                    {["AtelierLog", "FiberRegistry", "GitHub", "X_Protocol"].map(s => (
                      <Link key={s} href="#" className="text-[11px] font-black uppercase tracking-widest text-white/20 hover:text-lime-400 transition-colors italic underline underline-offset-8 decoration-white/5">{s}</Link>
                    ))}
                 </div>
              </div>

              {[
                { t: "MATERIALS", l: ["Graphene-Core", "Carbon Nanotube", "Shape Memory", "Bio-Mesh"] },
                { t: "TECHNOLOGY", l: ["3D Knitting", "Vapor Coating", "Neural Sync", "Thermal Offset"] },
                { t: "ATELIER", l: ["Our Legacy", "Sustainability", "Locations", "Support"] }
              ].map((col, i) => (
                <div key={i} className="flex flex-col gap-12">
                  <h4 className="text-[11px] font-black text-lime-400 uppercase tracking-[0.6em] italic">{col.t}</h4>
                  <ul className="flex flex-col gap-8">
                    {col.l.map(link => (
                      <li key={link} className="text-[11px] font-bold text-white/20 hover:text-white transition-colors cursor-pointer uppercase tracking-[0.4em] italic">{link}</li>
                    ))}
                  </ul>
                </div>
              ))}
           </div>

           <div className="max-w-[1600px] mx-auto border-t border-white/5 pt-16 flex flex-col md:flex-row justify-between items-center gap-16 text-[10px] font-black text-white/10 uppercase tracking-[0.6em] italic">
              <span>© 2026 KINETIC MESH PERFORMANCE ENGINEERING AG. // ALL_RIGHTS_RESERVED</span>
              <div className="flex gap-16">
                 <span>STATUS: OPERATIONAL</span>
                 <span>LATENCY: 0.5ms (AVG)</span>
                 <span>v9.4.0-STABLE</span>
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

function HUD_Overlay({ isSensorActive }: { isSensorActive: boolean }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
       {/* Corner Brackets */}
       <div className={`absolute top-12 left-12 w-20 h-20 border-t-2 border-l-2 transition-colors duration-1000 ${isSensorActive ? "border-lime-400" : "border-white/10"}`} />
       <div className={`absolute top-12 right-12 w-20 h-20 border-t-2 border-r-2 transition-colors duration-1000 ${isSensorActive ? "border-lime-400" : "border-white/10"}`} />
       <div className={`absolute bottom-12 left-12 w-20 h-20 border-b-2 border-l-2 transition-colors duration-1000 ${isSensorActive ? "border-lime-400" : "border-white/10"}`} />
       <div className={`absolute bottom-12 right-12 w-20 h-20 border-b-2 border-r-2 transition-colors duration-1000 ${isSensorActive ? "border-lime-400" : "border-white/10"}`} />

       {/* Top Status Bar */}
       <div className="absolute top-12 left-1/2 -translate-x-1/2 flex items-center gap-20 bg-black/60 backdrop-blur-2xl px-12 py-4 border border-white/10 rounded-none">
          <div className="flex items-center gap-6 text-white">
             <div className={`w-3 h-3 transition-colors duration-500 ${isSensorActive ? "bg-lime-400 animate-pulse" : "bg-red-500 animate-ping"}`} />
             <span className="text-[10px] font-black uppercase tracking-[0.4em] italic leading-none">Sensor_Sync: {isSensorActive ? "NOMINAL" : "DATA_LOSS"} // Status: ACTIVE</span>
          </div>
          <div className="h-4 w-px bg-white/20" />
          <div className="flex items-center gap-6 text-white/20">
             <Wifi className="w-4 h-4" /> 
             <span className="text-[10px] font-black uppercase tracking-[0.4em] italic leading-none">Network_Grid: SECURE</span>
          </div>
       </div>

       {/* Right Rotation Info */}
       <div className="absolute right-12 top-1/2 -translate-y-1/2 rotate-90 origin-right hidden lg:block">
          <span className="text-[10px] font-black uppercase tracking-[0.8em] text-white/5 italic">Unauthorized_Duplication_Of_Woven_Patterns_Is_Strictly_Monitored_By_Global_Textile_Alliance</span>
       </div>
    </div>
  )
}
