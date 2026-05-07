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
  Brain, Zap, Cpu, Shield, 
  Target, Layers, Box, Hexagon, 
  Terminal, Settings, Power, Info, 
  AlertTriangle, ChevronRight, ArrowRight, 
  Share2, Maximize2, Download, ExternalLink, 
  Archive, Hash, Wifi, BarChart3, 
  Microscope, Fingerprint, Scan, 
  Activity, Server, ShieldCheck, 
  ShieldAlert, Award, Briefcase, 
  Eye, Zap as ZapIcon, Activity as ActivityIcon, 
  Database, Navigation, Code, Command, 
  Grid, Radar, Lightbulb, User, 
  Heart, Dna, Snowflake, Droplet, 
  Wind, Ghost, FlaskConical, FlaskRound, 
  Orbit, Atom, Satellite, Milestone, 
  Gauge, Timer, Signal, Search, 
  Headphones, MousePointer2, Move, 
  Smartphone, Monitor, Tablet, Watch
} from "lucide-react"

/* ==========================================================================
   THE NEURAL LINK DATASET (ULTRA DENSITY)
   ========================================================================== */

const NEURO_ASSETS = [
  {
    id: "link-c-42",
    name: "Cortex-Link v4",
    type: "Direct Brain Interface",
    latency: "0.2ms",
    bandwidth: "420 Gbps",
    integration: "99.98%",
    desc: "Interface corticale de haute fidélité permettant une communication bidirectionnelle entre le cerveau humain et les systèmes informatiques.",
    status: "Active"
  },
  {
    id: "link-h-09",
    name: "Haptic-Prosthesis Z",
    type: "Motor Cortex Link",
    latency: "1.2ms",
    bandwidth: "120 Gbps",
    integration: "98.42%",
    desc: "Bras robotique avancé avec retour haptique direct, synchronisé avec les commandes motrices du sujet.",
    status: "Testing"
  },
  {
    id: "link-o-15",
    name: "Optic-Augment X",
    type: "Visual Cortex Proxy",
    latency: "0.5ms",
    bandwidth: "800 Gbps",
    integration: "100%",
    desc: "Prothèse optique permettant une vision augmentée (IR, UV, Data-HUD) directement projetée dans le cortex visuel.",
    status: "Approved"
  }
]

const NEURAL_METRICS = [
  { label: "Synaptic Sync", value: "99.98%", trend: "Stable" },
  { label: "Cognitive Load", value: "42%", trend: "Optimal" },
  { label: "Data Throughput", value: "1.4 TB/h", trend: "High" },
  { label: "Neural Plasticity", value: "Level 8", trend: "Increasing" }
]

const SURGICAL_LOGS = [
  { timestamp: "22:14:42", unit: "Mapping-Node-01", status: "ACTIVE", resolution: "0.1nm" },
  { timestamp: "22:14:45", unit: "Insertion-Core-Z", status: "STABLE", depth: "12mm" },
  { timestamp: "22:14:48", unit: "Software-Sync", status: "SUCCESS", alignment: "100%" }
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

function SynapticGridVisualizer() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY })
    window.addEventListener("mousemove", handleMouse)
    return () => window.removeEventListener("mousemove", handleMouse)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-5">
       <svg width="100%" height="100%" className="w-full h-full">
          {[...Array(30)].map((_, i) => (
            <motion.circle 
               key={i}
               cx={`${Math.random() * 100}%`} 
               cy={`${Math.random() * 100}%`} 
               r={Math.random() * 2 + 1} 
               fill="white"
               animate={{ opacity: [0, 1, 0] }}
               transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 5 }}
            />
          ))}
          {/* Neural Connections */}
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

function NeuralHubModel({ progress }: { progress: any }) {
  const rotate = useTransform(progress, [0, 1], [0, 360])
  const scale = useTransform(progress, [0, 0.5, 1], [1, 1.1, 1])

  return (
    <motion.div style={{ rotate, scale }} className="relative w-80 h-80 flex items-center justify-center">
       <div className="absolute inset-0 border border-cyan-400/10 rounded-full animate-spin-slow shadow-[0_0_80px_rgba(34,211,238,0.05)]" />
       <Brain className="w-40 h-40 text-cyan-400/10 animate-pulse" />
       <div className="absolute inset-4 border border-cyan-400/5 rounded-full" />
    </motion.div>
  )
}

/* ==========================================
   THE NEURAL LINK - MAIN INTERFACE
   ========================================== */

export default function NeuralLinkPremium() {
  const [activeLink, setActiveLink] = useState(0)
  const [isNeuralSyncActive, setIsNeuralSyncActive] = useState(true)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })

  // Neural Scroll Effects
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const textX = useTransform(scrollYProgress, [0, 0.5], [0, -100])

  return (
    <div ref={containerRef} className="bg-[#020408] text-[#e0e8ed] font-mono selection:bg-cyan-500/30 selection:text-white min-h-screen overflow-x-hidden transition-colors duration-1000">
      
      {/* GLOBAL HUD OVERLAY */}
      <HUD_Overlay isNeuralSyncActive={isNeuralSyncActive} />

      <main>
        {/* ==========================================
            1. NEURAL IGNITION (HERO)
            ========================================== */}
        <section className="relative h-screen flex flex-col justify-center items-center px-8 md:px-24 overflow-hidden pt-20">
          <SynapticGridVisualizer />
          <motion.div style={{ opacity: heroOpacity }} className="absolute z-0 pointer-events-none flex items-center justify-center">
             <NeuralHubModel progress={scrollYProgress} />
          </motion.div>

          <div className="relative z-10 text-center max-w-7xl">
             <Reveal>
                <div className="inline-flex items-center gap-4 px-6 py-2 border border-cyan-400/30 bg-cyan-400/5 text-[10px] font-black uppercase tracking-[0.5em] text-cyan-400 mb-12 italic">
                   <ActivityIcon className="w-4 h-4" /> Neural_Sync: NOMINAL // Bandwidth: 1.4 TB/h
                </div>
                <motion.h1 style={{ x: textX }} className="text-7xl md:text-[14vw] font-black tracking-tighter uppercase mb-16 leading-[0.75] italic">
                   Neural <br/> <span className="text-white/5 italic">Link.</span>
                </motion.h1>
                <p className="max-w-3xl mx-auto text-sm md:text-lg text-white/30 leading-relaxed uppercase tracking-widest font-light mb-16 italic">
                   L'évolution de l'interface humaine par le design neuro-numérique. Nous fusionnons la pensée et le silicium pour transcender les limites de l'esprit.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                   <button className="px-12 py-6 bg-cyan-700 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-[0_0_40px_rgba(34,211,238,0.2)] flex items-center gap-4 italic">
                      <ZapIcon className="w-5 h-5" /> Initialize Link
                   </button>
                   <button className="px-12 py-6 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all flex items-center gap-4 italic">
                      <Database className="w-5 h-5" /> Neuro Registry
                   </button>
                </div>
             </Reveal>
          </div>

          <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end border-t border-white/5 pt-12">
             <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4 text-[9px] font-bold text-white/20 uppercase tracking-widest italic">
                   <div className="w-16 h-px bg-white/10" />
                   Subject_ID: NEURAL-42-ALP
                </div>
                <div className="flex items-center gap-4 text-[9px] font-bold text-white/20 uppercase tracking-widest italic">
                   <div className="w-16 h-px bg-white/10" />
                   Sync_Condition: DEEP_INTEGRATION
                </div>
             </div>
             <div className="text-right flex flex-col items-end gap-4">
                <span className="text-[8px] font-black uppercase tracking-[0.5em] text-cyan-400">Synaptic_Vibration_Stream</span>
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
            2. NEURO REGISTRY (DENSE TECHNICAL)
            ========================================== */}
        <section className="py-60 bg-[#04060a] relative border-y border-white/5 overflow-hidden">
           <div className="max-w-[1600px] mx-auto px-8 md:px-24">
              <div className="flex flex-col md:flex-row items-end justify-between mb-40 gap-12">
                 <Reveal>
                    <span className="text-[10px] font-black uppercase tracking-[0.6em] text-cyan-400 block mb-6 italic underline underline-offset-8 decoration-cyan-400/20">Neuro // Assets</span>
                    <h2 className="text-6xl md:text-[10vw] font-black uppercase tracking-tighter italic leading-none text-white">Archives.</h2>
                 </Reveal>
                 <div className="text-right">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 block mb-4 italic">Registry // Neural_Audit</span>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-400">L'Architecture de l'Esprit</p>
                 </div>
              </div>

              <div className="grid md:grid-cols-3 gap-px bg-white/5 border border-white/5 shadow-2xl">
                 {NEURO_ASSETS.map((asset, i) => (
                   <Reveal key={asset.id} delay={i * 0.1}>
                      <div className="bg-[#020408] p-20 flex flex-col h-full hover:bg-white/[0.02] transition-all group cursor-crosshair border-white/5 border-r last:border-r-0">
                         <div className="flex justify-between items-start mb-16">
                            <div className="w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-cyan-700 group-hover:text-black transition-all duration-500">
                               <Cpu className="w-8 h-8" />
                            </div>
                            <span className={`px-4 py-2 bg-white/5 text-[9px] font-black uppercase tracking-[0.3em] ${asset.status === "Approved" ? "text-cyan-400" : "text-white/40"}`}>{asset.status}</span>
                         </div>
                         
                         <h3 className="text-4xl font-black uppercase tracking-tighter mb-8 italic text-white group-hover:translate-x-4 transition-transform">{asset.name}</h3>
                         <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] mb-12">{asset.type}</div>
                         
                         <div className="space-y-8 mb-20 border-l border-cyan-400/20 pl-8">
                            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
                               <span className="text-white/20">Latency</span>
                               <span className="text-white group-hover:text-cyan-400 transition-colors">{asset.latency}</span>
                            </div>
                            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
                               <span className="text-white/20">Bandwidth</span>
                               <span className="text-white group-hover:text-cyan-400 transition-colors">{asset.bandwidth}</span>
                            </div>
                            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
                               <span className="text-white/20">Integration</span>
                               <span className="text-white group-hover:text-cyan-400 transition-colors">{asset.integration}</span>
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
            3. COGNITIVE MONITOR (INTERACTIVE DATA)
            ========================================== */}
        <section className="py-60 bg-black relative border-y border-white/5 overflow-hidden">
           <div className="max-w-[1400px] mx-auto px-8 md:px-24">
              <div className="grid lg:grid-cols-2 gap-40 items-center">
                 <div>
                    <Reveal>
                       <span className="text-[10px] font-black uppercase tracking-[0.5em] text-cyan-400 block mb-12 italic underline underline-offset-8 decoration-cyan-400/20">Neural // Performance</span>
                       <h2 className="text-7xl md:text-[9vw] font-light italic leading-none text-white mb-16 uppercase tracking-tighter">
                          The <br/> <span className="not-italic font-black text-white/5 italic">Cognitive_Hub.</span>
                       </h2>
                       <p className="text-2xl font-light text-white/20 leading-relaxed mb-24 italic uppercase tracking-[0.2em] max-w-xl">
                          Surveillance synaptique en temps réel. Nos interfaces capturent chaque impulsion neuronale et optimisent le flux de données pour une symbiose parfaite entre l'homme et la machine.
                       </p>
                       <div className="grid grid-cols-2 gap-px bg-white/5 border border-white/5 mb-24 shadow-2xl">
                          {NEURAL_METRICS.map((metric, i) => (
                            <div key={i} className="p-16 bg-[#0a0c0e] group hover:bg-white/[0.02] transition-all border-r border-b last:border-r-0 border-white/5">
                               <div className="text-[10px] font-black uppercase text-cyan-400 mb-6 tracking-[0.4em]">{metric.label}</div>
                               <div className="text-5xl font-black text-white italic mb-6 tracking-tighter group-hover:translate-x-4 transition-transform">{metric.value}</div>
                               <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.3em] text-white/10 italic">
                                  <ActivityIcon className="w-4 h-4 text-cyan-400" /> {metric.trend}
                               </div>
                            </div>
                          ))}
                       </div>
                       <button 
                         onClick={() => setIsNeuralSyncActive(!isNeuralSyncActive)}
                         className="w-full py-8 bg-cyan-700 text-white text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-2xl flex items-center justify-center gap-6 italic"
                       >
                          <Settings className="w-5 h-5" /> Re-Sync Neural Nodes
                       </button>
                    </Reveal>
                 </div>
                 
                 <div className="relative">
                    <Reveal delay={0.3} x={40}>
                       <div className="aspect-square bg-[#0a0c0e] border border-white/10 p-20 flex flex-col justify-between relative group overflow-hidden shadow-2xl">
                          <div className="absolute top-0 right-0 p-80 bg-cyan-400 opacity-[0.02] blur-[150px] rounded-full group-hover:opacity-[0.05] transition-opacity" />
                          
                          <div className="flex justify-between items-start z-10">
                             <div className="flex flex-col gap-3">
                                <span className="text-[10px] font-black text-white/10 uppercase tracking-[0.5em]">Neural_Link // SYNC-v42</span>
                                <span className="text-[12px] font-black text-white/40 uppercase tracking-[0.6em]">Synaptic_Vibration_Map</span>
                             </div>
                             <Wifi className="w-6 h-6 text-cyan-400" />
                          </div>
                          
                          {/* NEURAL VISUALIZER (SVG) */}
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
                                <Brain className={`w-24 h-24 transition-colors duration-1000 ${isNeuralSyncActive ? "text-cyan-400 animate-pulse" : "text-white/5"}`} />
                             </div>
                             <div className="mt-16 text-center space-y-6">
                                <div className={`text-4xl font-black italic tracking-tighter ${isNeuralSyncActive ? "text-white" : "text-white/20"}`}>
                                   {isNeuralSyncActive ? "SYNC_ACTIVE" : "SYNC_LOST"}
                                </div>
                                <span className="text-[11px] font-bold text-white/10 uppercase tracking-[0.6em] block">Auth_Node: CORTEX_UNIT_01</span>
                             </div>
                          </div>

                          <div className="relative z-10 flex gap-6">
                             <div className="flex-1 h-1 bg-white/5 overflow-hidden">
                                <motion.div 
                                   animate={isNeuralSyncActive ? { x: ["-100%", "100%"] } : {}}
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
            4. NEURAL STORYTELLING (TECH STORYTELLING)
            ========================================== */}
        <section className="py-60 bg-[#020408] relative overflow-hidden border-t border-white/5">
           <div className="max-w-[1400px] mx-auto px-8 md:px-24">
              <div className="grid lg:grid-cols-2 gap-40 items-center">
                 <div className="relative aspect-[3/4] overflow-hidden group border border-white/5 shadow-2xl">
                    <Image 
                       src="https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=1200&auto=format&fit=crop" 
                       alt="Neural Infrastructure" 
                       fill 
                       className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2000ms]"
                    />
                    <div className="absolute inset-0 bg-cyan-900/10 mix-blend-color group-hover:opacity-0 transition-opacity" />
                    <div className="absolute inset-0 p-20 flex flex-col justify-end bg-gradient-to-t from-black via-black/40 to-transparent">
                       <div className="text-white">
                          <span className="text-[11px] font-black uppercase tracking-[0.6em] text-cyan-400 mb-8 block italic underline underline-offset-8 decoration-cyan-400/20">Atelier // Purity // Unit</span>
                          <h4 className="text-6xl font-black tracking-tighter uppercase italic mb-12 mix-blend-difference text-white">Neural <br/> Fabric.</h4>
                          <button className="flex items-center gap-6 text-[11px] font-black uppercase tracking-[0.4em] border-b border-white/20 pb-4 hover:border-cyan-400 transition-all group">
                             Link Protocols <ExternalLink className="w-5 h-5 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                          </button>
                       </div>
                    </div>
                 </div>

                 <div>
                    <Reveal>
                       <div className="mb-24 text-left">
                          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-cyan-400 mb-8 block italic">Chapitre III // Synthesis</span>
                          <h2 className="text-7xl md:text-[10vw] font-black tracking-tighter uppercase text-white italic leading-none text-white">Pure_Sync.</h2>
                       </div>
                       <p className="text-2xl font-light text-white/20 leading-relaxed italic mb-20 uppercase tracking-[0.2em]">
                          L'avenir de l'humanité est une interface. Nous concevons des micro-électrodes capables de s'intégrer harmonieusement à l'architecture neuronale naturelle.
                       </p>
                       <div className="space-y-20">
                          {[
                            { t: "Synaptic Mapping", d: "Cartographie haute résolution des réseaux neuronaux pour une insertion précise des interfaces." },
                            { t: "Signal Amplification", d: "Traitement et amplification des signaux synaptiques faibles pour une communication sans perte." },
                            { t: "Neural Integration", d: "Protocoles d'intégration tissulaire biocompatibles pour une longévité maximale des implants." }
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
                    <div className="w-16 h-16 bg-cyan-700 flex items-center justify-center">
                      <Brain className="w-10 h-10 text-white" />
                    </div>
                    <span className="text-4xl font-black uppercase tracking-tighter italic">NEURAL<span className="text-white/20">LINK.</span></span>
                 </div>
                 <p className="text-white/20 text-[11px] font-black uppercase tracking-[0.5em] leading-loose max-w-sm mb-20 italic">
                    "L'esprits et la machine, enfin unis." — Archive Neural V.42
                 </p>
                 <div className="flex gap-16">
                    {["LinkLog", "NeuroRegistry", "GitHub", "X_Protocol"].map(s => (
                      <Link key={s} href="#" className="text-[11px] font-black uppercase tracking-widest text-white/20 hover:text-cyan-400 transition-colors italic underline underline-offset-8 decoration-white/5">{s}</Link>
                    ))}
                 </div>
              </div>

              {[
                { t: "IMPLANTS", l: ["Cortex-Link", "Haptic-Prosthesis", "Optic-Augment", "Neural Hub"] },
                { t: "TECHNOLOGY", l: ["Synaptic Mapping", "Signal Processing", "Tissue Integration", "SLA Reports"] },
                { t: "ATELIER", l: ["Our Legacy", "Sustainability", "Locations", "Support"] }
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
              <span>© 2026 NEURAL LINK HUMAN INTERFACE AG. // ALL_RIGHTS_RESERVED</span>
              <div className="flex gap-16">
                 <span>STATUS: OPERATIONAL</span>
                 <span>BANDWIDTH: 1.4 TB/h (AVG)</span>
                 <span>v4.2.0-STABLE</span>
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

function HUD_Overlay({ isNeuralSyncActive }: { isNeuralSyncActive: boolean }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
       {/* Corner Brackets */}
       <div className={`absolute top-12 left-12 w-20 h-20 border-t-2 border-l-2 transition-colors duration-1000 ${isNeuralSyncActive ? "border-cyan-400" : "border-white/10"}`} />
       <div className={`absolute top-12 right-12 w-20 h-20 border-t-2 border-r-2 transition-colors duration-1000 ${isNeuralSyncActive ? "border-cyan-400" : "border-white/10"}`} />
       <div className={`absolute bottom-12 left-12 w-20 h-20 border-b-2 border-l-2 transition-colors duration-1000 ${isNeuralSyncActive ? "border-cyan-400" : "border-white/10"}`} />
       <div className={`absolute bottom-12 right-12 w-20 h-20 border-b-2 border-r-2 transition-colors duration-1000 ${isNeuralSyncActive ? "border-cyan-400" : "border-white/10"}`} />

       {/* Top Status Bar */}
       <div className="absolute top-12 left-1/2 -translate-x-1/2 flex items-center gap-20 bg-black/60 backdrop-blur-2xl px-12 py-4 border border-white/10 rounded-none">
          <div className="flex items-center gap-6 text-white">
             <div className={`w-3 h-3 transition-colors duration-500 ${isNeuralSyncActive ? "bg-cyan-400 animate-pulse" : "bg-red-500 animate-ping"}`} />
             <span className="text-[10px] font-black uppercase tracking-[0.4em] italic leading-none">Neural_Sync: {isNeuralSyncActive ? "NOMINAL" : "DATA_LOSS"} // Status: ACTIVE</span>
          </div>
          <div className="h-4 w-px bg-white/20" />
          <div className="flex items-center gap-6 text-white/20">
             <Wifi className="w-4 h-4" /> 
             <span className="text-[10px] font-black uppercase tracking-[0.4em] italic leading-none">Neural_Grid: SECURE</span>
          </div>
       </div>

       {/* Right Rotation Info */}
       <div className="absolute right-12 top-1/2 -translate-y-1/2 rotate-90 origin-right hidden lg:block">
          <span className="text-[10px] font-black uppercase tracking-[0.8em] text-white/5 italic">Unauthorized_Duplication_Of_Neural_Patterns_Is_Strictly_Monitored_By_Global_Neuro_Alliance</span>
       </div>
    </div>
  )
}
