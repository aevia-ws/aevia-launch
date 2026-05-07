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
  Dna, Heart, Stethoscope, Syringe, 
  Tablets, Crosshair, Sparkle
} from "lucide-react"

/* ==========================================================================
   THE BIO-SYNC DATASET (ULTRA DENSITY)
   ========================================================================== */

const BIOLOGICAL_ASSETS = [
  {
    id: "bio-v4-42",
    name: "Bio-v4 Printer",
    type: "3D Tissue Sculptor",
    viability: "99.8%",
    density: "1.4B cells/cm³",
    maturation: "12 Days",
    desc: "Unité de bio-impression haute résolution capable de structurer des tissus multicellulaires avec une précision micrométrique.",
    status: "Printing"
  },
  {
    id: "bio-tis-08",
    name: "Tissue Link Alpha",
    type: "Nutrient Perfusion Hub",
    viability: "99.99%",
    density: "850M cells/cm³",
    maturation: "24 Days",
    desc: "Système de perfusion automatisé garantissant l'apport optimal en nutriments et oxygène lors de la maturation tissulaire.",
    status: "Stable Flow"
  },
  {
    id: "bio-org-15",
    name: "Organ Grid v5",
    type: "Synthetic Organ Incubator",
    viability: "99.4%",
    density: "2.8B cells/cm³",
    maturation: "45 Days",
    desc: "Incubateur à grande échelle pour la croissance d'organes de synthèse complexes (cœurs, reins, poumons) à partir de cellules autologues.",
    status: "Maturing"
  }
]

const TISSUE_METRICS = [
  { label: "Oxygenation", value: "98.2%", trend: "Optimal" },
  { label: "Proliferation", value: "12.4%", trend: "Stable" },
  { label: "Nutrient Flow", value: "45 ml/h", trend: "Peak" },
  { label: "Viability", value: "99.8%", trend: "Constant" }
]

const BIO_LOGS = [
  { timestamp: "22:14:42", unit: "Cell-Module-01", status: "MITOSIS", rate: "1.2%" },
  { timestamp: "22:14:45", unit: "Scaffold-Sync", status: "PRINTING", layer: "442/1200" },
  { timestamp: "22:14:48", unit: "Bio-Guard", status: "SECURE", temp: "37.2°C" }
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

function OrganFlowVisualizer() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY })
    window.addEventListener("mousemove", handleMouse)
    return () => window.removeEventListener("mousemove", handleMouse)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
       <svg width="100%" height="100%" className="w-full h-full">
          {[...Array(20)].map((_, i) => (
            <motion.circle 
               key={i}
               cx={mousePos.x + (Math.random() - 0.5) * 600}
               cy={mousePos.y + (Math.random() - 0.5) * 600}
               r={Math.random() * 20}
               fill="#f472b6"
               animate={{ 
                  opacity: [0, 0.3, 0], 
                  scale: [0.5, 1.5, 0.5],
                  filter: ["blur(4px)", "blur(12px)", "blur(4px)"]
               }}
               transition={{ duration: 4, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
          {[...Array(10)].map((_, i) => (
            <motion.path 
               key={`tissue-${i}`}
               d={`M ${Math.random() * 2000} ${Math.random() * 1000} Q ${Math.random() * 2000} ${Math.random() * 1000} ${Math.random() * 2000} ${Math.random() * 1000}`}
               stroke="#f472b6" 
               strokeWidth="0.5" 
               fill="none"
               animate={{ d: `M ${mousePos.x} ${mousePos.y} Q ${mousePos.x + 200} ${mousePos.y - 200} ${Math.random() * 2000} ${Math.random() * 1000}` }}
               transition={{ type: "spring", damping: 30, stiffness: 50 }}
            />
          ))}
       </svg>
    </div>
  )
}

function BioSyncModel({ progress }: { progress: any }) {
  const rotate = useTransform(progress, [0, 1], [0, 360])
  const scale = useTransform(progress, [0, 0.5, 1], [1, 1.2, 1])

  return (
    <motion.div style={{ rotate, scale }} className="relative w-80 h-80 flex items-center justify-center">
       <div className="absolute inset-0 border border-pink-500/10 rounded-full animate-spin-slow shadow-[0_0_80px_rgba(244,114,182,0.05)]" />
       <HeartPulse className="w-40 h-40 text-pink-500/10 animate-pulse" />
       <div className="absolute inset-8 border border-pink-500/5 rounded-full" />
    </motion.div>
  )
}

/* ==========================================
   THE BIO-SYNC - MAIN INTERFACE
   ========================================== */

export default function BioSyncPremium() {
  const [activeAsset, setActiveAsset] = useState(0)
  const [isViabilityStable, setIsViabilityStable] = useState(true)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })

  // Bio Scroll Effects
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const textX = useTransform(scrollYProgress, [0, 0.5], [0, -100])

  return (
    <div ref={containerRef} className="bg-[#0c0206] text-[#e0e8ed] font-mono selection:bg-pink-500/30 selection:text-white min-h-screen overflow-x-hidden transition-colors duration-1000">
      
      {/* GLOBAL HUD OVERLAY */}
      <HUD_Overlay isViabilityStable={isViabilityStable} />

      <main>
        {/* ==========================================
            1. BIO IGNITION (HERO)
            ========================================== */}
        <section className="relative h-screen flex flex-col justify-center items-center px-8 md:px-24 overflow-hidden pt-20">
          <OrganFlowVisualizer />
          <motion.div style={{ opacity: heroOpacity }} className="absolute z-0 pointer-events-none flex items-center justify-center">
             <BioSyncModel progress={scrollYProgress} />
          </motion.div>

          <div className="relative z-10 text-center max-w-7xl">
             <Reveal>
                <div className="inline-flex items-center gap-4 px-6 py-2 border border-pink-500/30 bg-pink-500/5 text-[10px] font-black uppercase tracking-[0.5em] text-pink-500 mb-12 italic">
                   <HeartPulse className="w-4 h-4" /> Hub_Sync: NOMINAL // Viability: 99.8%
                </div>
                <motion.h1 style={{ x: textX }} className="text-7xl md:text-[14vw] font-black tracking-tighter uppercase mb-16 leading-[0.75] italic">
                   Bio <br/> <span className="text-white/5 italic">Sync.</span>
                </motion.h1>
                <p className="max-w-3xl mx-auto text-sm md:text-lg text-white/30 leading-relaxed uppercase tracking-widest font-light mb-16 italic">
                   L'ingénierie de la vie. Nous sculptons des tissus et des organes de synthèse via des technologies de bio-impression haute résolution, offrant des solutions de transplantation personnalisées et durables.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                   <button className="px-12 py-6 bg-pink-800 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-[0_0_40px_rgba(244,114,182,0.2)] flex items-center gap-4 italic">
                      <Microscope className="w-5 h-5" /> Initialize Printing
                   </button>
                   <button className="px-12 py-6 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all flex items-center gap-4 italic">
                      <Database className="w-5 h-5" /> Biological Registry
                   </button>
                </div>
             </Reveal>
          </div>

          <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end border-t border-white/5 pt-12">
             <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4 text-[9px] font-bold text-white/20 uppercase tracking-widest italic">
                   <div className="w-16 h-px bg-white/10" />
                   Bio_ID: BIO-SYNC-01
                </div>
                <div className="flex items-center gap-4 text-[9px] font-bold text-white/20 uppercase tracking-widest italic">
                   <div className="w-16 h-px bg-white/10" />
                   Status: MATURATION_LOCKED_ACTIVE
                </div>
             </div>
             <div className="text-right flex flex-col items-end gap-4">
                <span className="text-[8px] font-black uppercase tracking-[0.5em] text-pink-500">Tissue_Proliferation_Stream</span>
                <div className="flex gap-2 h-12 items-end">
                   {[...Array(16)].map((_, i) => (
                     <motion.div 
                        key={i}
                        animate={{ height: ["10%", "100%", "30%", "80%", "10%"] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                        className="w-2 bg-pink-500/20"
                     />
                   ))}
                </div>
             </div>
          </div>
        </section>

        {/* ==========================================
            2. BIOLOGICAL REGISTRY (DENSE TECHNICAL)
            ========================================== */}
        <section className="py-60 bg-[#14040c] relative border-y border-white/5 overflow-hidden">
           <div className="max-w-[1600px] mx-auto px-8 md:px-24">
              <div className="flex flex-col md:flex-row items-end justify-between mb-40 gap-12">
                 <Reveal>
                    <span className="text-[10px] font-black uppercase tracking-[0.6em] text-pink-500 block mb-6 italic underline underline-offset-8 decoration-pink-400/20">Biological // Assets</span>
                    <h2 className="text-6xl md:text-[10vw] font-black uppercase tracking-tighter italic leading-none text-white">Archives.</h2>
                 </Reveal>
                 <div className="text-right">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 block mb-4 italic">Registry // Bio_Audit</span>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-pink-500">L'Architecture de la Sculpture Cellulaire</p>
                 </div>
              </div>

              <div className="grid md:grid-cols-3 gap-px bg-white/5 border border-white/5 shadow-2xl">
                 {BIOLOGICAL_ASSETS.map((asset, i) => (
                   <Reveal key={asset.id} delay={i * 0.1}>
                      <div className="bg-[#0c0206] p-20 flex flex-col h-full hover:bg-white/[0.02] transition-all group cursor-crosshair border-white/5 border-r last:border-r-0">
                         <div className="flex justify-between items-start mb-16">
                            <div className="w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-pink-800 group-hover:text-white transition-all duration-500">
                               <Dna className="w-8 h-8" />
                            </div>
                            <span className={`px-4 py-2 bg-white/5 text-[9px] font-black uppercase tracking-[0.3em] ${asset.status === "Printing" ? "text-pink-500" : "text-white/40"}`}>{asset.status}</span>
                         </div>
                         
                         <h3 className="text-4xl font-black uppercase tracking-tighter mb-8 italic text-white group-hover:translate-x-4 transition-transform">{asset.name}</h3>
                         <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] mb-12">{asset.type}</div>
                         
                         <div className="space-y-8 mb-20 border-l border-pink-500/20 pl-8">
                            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
                               <span className="text-white/20">Viability</span>
                               <span className="text-white group-hover:text-pink-400 transition-colors">{asset.viability}</span>
                            </div>
                            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
                               <span className="text-white/20">Cell Density</span>
                               <span className="text-white group-hover:text-pink-400 transition-colors">{asset.density}</span>
                            </div>
                            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
                               <span className="text-white/20">Maturation</span>
                               <span className="text-white group-hover:text-pink-400 transition-colors">{asset.maturation}</span>
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
            3. TISSUE MONITOR (INTERACTIVE DATA)
            ========================================== */}
        <section className="py-60 bg-black relative border-y border-white/5 overflow-hidden">
           <div className="max-w-[1400px] mx-auto px-8 md:px-24">
              <div className="grid lg:grid-cols-2 gap-40 items-center">
                 <div>
                    <Reveal>
                       <span className="text-[10px] font-black uppercase tracking-[0.5em] text-pink-500 block mb-12 italic underline underline-offset-8 decoration-pink-500/20">Tissue // Performance</span>
                       <h2 className="text-7xl md:text-[9vw] font-light italic leading-none text-white mb-16 uppercase tracking-tighter">
                          The <br/> <span className="not-italic font-black text-white/5 italic">Bio_Link.</span>
                       </h2>
                       <p className="text-2xl font-light text-white/20 leading-relaxed mb-24 italic uppercase tracking-[0.2em] max-w-xl">
                          Surveillance de l'intégrité tissulaire en temps réel. Nos capteurs biologiques analysent l'oxygénation et la prolifération cellulaire pour garantir une maturation parfaite des organes.
                       </p>
                       <div className="grid grid-cols-2 gap-px bg-white/5 border border-white/5 mb-24 shadow-2xl">
                          {TISSUE_METRICS.map((metric, i) => (
                            <div key={i} className="p-16 bg-[#1c0a10] group hover:bg-white/[0.02] transition-all border-r border-b last:border-r-0 border-white/5">
                               <div className="text-[10px] font-black uppercase text-pink-500 mb-6 tracking-[0.4em]">{metric.label}</div>
                               <div className="text-5xl font-black text-white italic mb-6 tracking-tighter group-hover:translate-x-4 transition-transform">{metric.value}</div>
                               <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.3em] text-white/10 italic">
                                  <Activity className="w-4 h-4 text-pink-500" /> {metric.trend}
                               </div>
                            </div>
                          ))}
                       </div>
                       <button 
                         onClick={() => setIsViabilityStable(!isViabilityStable)}
                         className="w-full py-8 bg-pink-950 text-white text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-2xl flex items-center justify-center gap-6 italic"
                       >
                          <Settings className="w-5 h-5" /> Re-Sync Biological Nodes
                       </button>
                    </Reveal>
                 </div>
                 
                 <div className="relative">
                    <Reveal delay={0.3} x={40}>
                       <div className="aspect-square bg-[#1c0a10] border border-white/10 p-20 flex flex-col justify-between relative group overflow-hidden shadow-2xl">
                          <div className="absolute top-0 right-0 p-80 bg-pink-400 opacity-[0.02] blur-[150px] rounded-full group-hover:opacity-[0.05] transition-opacity" />
                          
                          <div className="flex justify-between items-start z-10">
                             <div className="flex flex-col gap-3">
                                <span className="text-[10px] font-black text-white/10 uppercase tracking-[0.5em]">Bio_Link // SYNC-v42</span>
                                <span className="text-[12px] font-black text-white/40 uppercase tracking-[0.6em]">Tissue_Stability_Telemetry</span>
                             </div>
                             <Wifi className="w-6 h-6 text-pink-400" />
                          </div>
                          
                          {/* BIO VISUALIZER (SVG) */}
                          <div className="relative z-10 flex flex-col items-center justify-center h-full">
                             <div className="w-64 h-64 border border-pink-400/5 rounded-full flex items-center justify-center relative">
                                <motion.div 
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                  className="absolute inset-0 border-t-2 border-pink-400/20 rounded-full" 
                                />
                                <motion.div 
                                  animate={{ rotate: -360 }}
                                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                  className="absolute inset-8 border-b-2 border-pink-400/10 rounded-full" 
                                />
                                <HeartPulse className={`w-24 h-24 transition-colors duration-1000 ${isViabilityStable ? "text-pink-400 animate-pulse" : "text-white/5"}`} />
                             </div>
                             <div className="mt-16 text-center space-y-6">
                                <div className={`text-4xl font-black italic tracking-tighter ${isViabilityStable ? "text-white" : "text-white/20"}`}>
                                   {isViabilityStable ? "TISSUE_SECURE" : "VIABILITY_DISRUPTION"}
                                </div>
                                <span className="text-[11px] font-bold text-white/10 uppercase tracking-[0.6em] block">Auth_Node: BIO_UNIT_01</span>
                             </div>
                          </div>

                          <div className="relative z-10 flex gap-6">
                             <div className="flex-1 h-1 bg-white/5 overflow-hidden">
                                <motion.div 
                                   animate={isViabilityStable ? { x: ["-100%", "100%"] } : {}}
                                   transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                   className="w-1/2 h-full bg-pink-700"
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
            4. BIO STORY (TECH STORYTELLING)
            ========================================== */}
        <section className="py-60 bg-[#0c0206] relative overflow-hidden border-t border-white/5">
           <div className="max-w-[1400px] mx-auto px-8 md:px-24">
              <div className="grid lg:grid-cols-2 gap-40 items-center">
                 <div className="relative aspect-[3/4] overflow-hidden group border border-white/5 shadow-2xl">
                    <Image 
                       src="https://images.unsplash.com/photo-1579154235602-3c2c2aa9502a?q=80&w=1200&auto=format&fit=crop" 
                       alt="Bio Sync Infrastructure" 
                       fill 
                       className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2000ms]"
                    />
                    <div className="absolute inset-0 bg-pink-900/10 mix-blend-color group-hover:opacity-0 transition-opacity" />
                    <div className="absolute inset-0 p-20 flex flex-col justify-end bg-gradient-to-t from-black via-black/40 to-transparent">
                       <div className="text-white">
                          <span className="text-[11px] font-black uppercase tracking-[0.6em] text-pink-500 mb-8 block italic underline underline-offset-8 decoration-pink-400/20">Atelier // Biological // Unit</span>
                          <h4 className="text-6xl font-black tracking-tighter uppercase italic mb-12 mix-blend-difference text-white">Tissue <br/> Fabric.</h4>
                          <button className="flex items-center gap-6 text-[11px] font-black uppercase tracking-[0.4em] border-b border-white/20 pb-4 hover:border-pink-400 transition-all group">
                             Growth Protocols <ExternalLink className="w-5 h-5 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                          </button>
                       </div>
                    </div>
                 </div>

                 <div>
                    <Reveal>
                       <div className="mb-24 text-left">
                          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-pink-500 mb-8 block italic">Chapitre III // Ingénierie Tissulaire</span>
                          <h2 className="text-7xl md:text-[10vw] font-black tracking-tighter uppercase text-white italic leading-none text-white">Pure_Life.</h2>
                       </div>
                       <p className="text-2xl font-light text-white/20 leading-relaxed italic mb-20 uppercase tracking-[0.2em]">
                          La vie est une architecture de précision. Nous utilisons des technologies de bio-impression et de perfusion automatisée pour construire des tissus et des organes de synthèse d'une complexité sans précédent, offrant une nouvelle vie à ceux qui en ont le plus besoin.
                       </p>
                       <div className="space-y-20">
                          {[
                            { t: "Cell Sourcing", d: "Récolte et amplification de cellules souches autologues pour garantir une compatibilité immunologique totale sans risque de rejet." },
                            { t: "Scaffold Printing", d: "Impression 3D de structures bio-compatibles poreuses servant de support à la croissance et à la différenciation cellulaire." },
                            { t: "Organ Maturation", d: "Maturation dirigée des tissus imprimés dans des incubateurs simulant les conditions physiologiques exactes du corps humain." }
                          ].map((step, i) => (
                            <div key={i} className="group flex gap-12 border-b border-white/5 pb-16 hover:border-pink-400/20 transition-all cursor-default">
                               <div className="text-6xl font-black text-white/5 group-hover:text-pink-400/20 transition-colors italic leading-none">0{i+1}</div>
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
                    <div className="w-16 h-16 bg-pink-800 flex items-center justify-center">
                      <HeartPulse className="w-10 h-10 text-white" />
                    </div>
                    <span className="text-4xl font-black uppercase tracking-tighter italic">BIO<span className="text-white/20">SYNC.</span></span>
                 </div>
                 <p className="text-white/20 text-[11px] font-black uppercase tracking-[0.5em] leading-loose max-w-sm mb-20 italic">
                    "L'avenir de la santé est biologique." — Archive Sync V.42
                 </p>
                 <div className="flex gap-16">
                    {["BioLog", "TissueRegistry", "GitHub", "X_Protocol"].map(s => (
                      <Link key={s} href="#" className="text-[11px] font-black uppercase tracking-widest text-white/20 hover:text-pink-400 transition-colors italic underline underline-offset-8 decoration-white/5">{s}</Link>
                    ))}
                 </div>
              </div>

              {[
                { t: "BIOTICS", l: ["Bio-v4 Printer", "Tissue Link Alpha", "Organ Grid v5", "Cell-Amplifier"] },
                { t: "TECHNOLOGY", l: ["Cell Sourcing", "Scaffold Tech", "Organ Maturation", "SLA Reports"] },
                { t: "ATELIER", l: ["Our Legacy", "Bio-Ethics Policy", "Locations", "Support"] }
              ].map((col, i) => (
                <div key={i} className="flex flex-col gap-12">
                  <h4 className="text-[11px] font-black text-pink-400 uppercase tracking-[0.6em] italic">{col.t}</h4>
                  <ul className="flex flex-col gap-8">
                    {col.l.map(link => (
                      <li key={link} className="text-[11px] font-bold text-white/20 hover:text-white transition-colors cursor-pointer uppercase tracking-[0.4em] italic">{link}</li>
                    ))}
                  </ul>
                </div>
              ))}
           </div>

           <div className="max-w-[1600px] mx-auto border-t border-white/5 pt-16 flex flex-col md:flex-row justify-between items-center gap-16 text-[10px] font-black text-white/10 uppercase tracking-[0.6em] italic">
              <span>© 2026 BIO SYNC TISSUE ENGINEERING SYSTEMS AG. // ALL_RIGHTS_RESERVED</span>
              <div className="flex gap-16">
                 <span>STATUS: OPERATIONAL</span>
                 <span>VIABILITY: 99.8% (AVG)</span>
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

function HUD_Overlay({ isViabilityStable }: { isViabilityStable: boolean }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
       {/* Corner Brackets */}
       <div className={`absolute top-12 left-12 w-20 h-20 border-t-2 border-l-2 transition-colors duration-1000 ${isViabilityStable ? "border-pink-400" : "border-white/10"}`} />
       <div className={`absolute top-12 right-12 w-20 h-20 border-t-2 border-r-2 transition-colors duration-1000 ${isViabilityStable ? "border-pink-400" : "border-white/10"}`} />
       <div className={`absolute bottom-12 left-12 w-20 h-20 border-b-2 border-l-2 transition-colors duration-1000 ${isViabilityStable ? "border-pink-400" : "border-white/10"}`} />
       <div className={`absolute bottom-12 right-12 w-20 h-20 border-b-2 border-r-2 transition-colors duration-1000 ${isViabilityStable ? "border-pink-400" : "border-white/10"}`} />

       {/* Top Status Bar */}
       <div className="absolute top-12 left-1/2 -translate-x-1/2 flex items-center gap-20 bg-black/60 backdrop-blur-2xl px-12 py-4 border border-white/10 rounded-none">
          <div className="flex items-center gap-6 text-white">
             <div className={`w-3 h-3 transition-colors duration-500 ${isViabilityStable ? "bg-pink-400 animate-pulse" : "bg-red-500 animate-ping"}`} />
             <span className="text-[10px] font-black uppercase tracking-[0.4em] italic leading-none">Bio_Sync: {isViabilityStable ? "NOMINAL" : "VIABILITY_DISRUPTION"} // Status: ACTIVE</span>
          </div>
          <div className="h-4 w-px bg-white/20" />
          <div className="flex items-center gap-6 text-white/20">
             <Wifi className="w-4 h-4" /> 
             <span className="text-[10px] font-black uppercase tracking-[0.4em] italic leading-none">Biological_Grid: SECURE</span>
          </div>
       </div>

       {/* Right Rotation Info */}
       <div className="absolute right-12 top-1/2 -translate-y-1/2 rotate-90 origin-right hidden lg:block">
          <span className="text-[10px] font-black uppercase tracking-[0.8em] text-white/5 italic">Unauthorized_Duplication_Of_Biological_Patterns_Is_Strictly_Monitored_By_Global_Bio_Alliance</span>
       </div>
    </div>
  )
}
