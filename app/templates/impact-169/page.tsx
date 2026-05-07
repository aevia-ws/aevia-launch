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
  Dna, Heart, Activity, Microscope, 
  Zap, Cpu, Shield, Target, Layers, 
  Box, Hexagon, Terminal, Settings, 
  Power, Info, AlertTriangle, ChevronRight, 
  ArrowRight, Share2, Maximize2, 
  Download, ExternalLink, Archive, 
  Hash, Wifi, BarChart3, Fingerprint, 
  Scan, Brain, Server, ShieldCheck, 
  ShieldAlert, Award, Briefcase, 
  Droplets, Thermometer, FlaskConical, 
  FlaskRound, Pill, Stethoscope, 
  Crosshair, Wind, Gauge, Timer, 
  Lightbulb, Command, Grid, Radar
} from "lucide-react"

/* ==========================================================================
   THE BIO-LOOM DATASET (ULTRA DENSITY)
   ========================================================================== */

const SYNTHETIC_ORGANS = [
  {
    id: "organ-ht-42",
    name: "Bioresorbable Heart",
    type: "Cardiac Unit",
    biocompatibility: "99.98%",
    vascularization: "Optimal",
    maturation: "24 Days",
    desc: "Cœur synthétique imprimé en 3D avec un polymère biodégradable, colonisé par les propres cellules souches du patient.",
    status: "Clinical Ready"
  },
  {
    id: "organ-lu-09",
    name: "Microfluidic Lung",
    type: "Respiratory Mesh",
    biocompatibility: "98.42%",
    vascularization: "High-Density",
    maturation: "18 Days",
    desc: "Matrice pulmonaire utilisant des canaux microfluidiques pour maximiser l'échange gazeux à l'échelle nanométrique.",
    status: "In Vitro"
  },
  {
    id: "organ-sk-15",
    name: "Cutaneous Matrix X",
    type: "Dermal Graft",
    biocompatibility: "100%",
    vascularization: "Rapid-Sync",
    maturation: "7 Days",
    desc: "Greffon cutané multi-couches avec intégration de follicules pileux et de glandes sudoripares synthétiques.",
    status: "Approved"
  }
]

const BIOMETRIC_METRICS = [
  { label: "Cell Density", value: "1.2M/ml", trend: "Increasing" },
  { label: "O2 Saturation", value: "98.8%", trend: "Stable" },
  { label: "pH Balance", value: "7.42", trend: "Optimal" },
  { label: "Scaffold Integrity", value: "99.9%", trend: "High" }
]

const LAB_LOGS = [
  { timestamp: "18:14:42", unit: "Bio-Printer-01", status: "ACTIVE", layer: "420/1200" },
  { timestamp: "18:14:45", unit: "Incubator-Z", status: "STABLE", temp: "37.2°C" },
  { timestamp: "18:14:48", unit: "Cell-Sync", status: "SUCCESS", alignment: "100%" }
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

function CellularMeshVisualizer() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY })
    window.addEventListener("mousemove", handleMouse)
    return () => window.removeEventListener("mousemove", handleMouse)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-10">
       <svg width="100%" height="100%" className="w-full h-full">
          {[...Array(20)].map((_, i) => (
            <motion.circle 
               key={i}
               cx={`${Math.random() * 100}%`} 
               cy={`${Math.random() * 100}%`} 
               r={Math.random() * 30 + 10} 
               fill="none"
               stroke="white"
               strokeWidth="0.5"
               animate={{ 
                 cx: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                 cy: [`${Math.random() * 100}%`, `${Math.random() * 100}%`]
               }}
               transition={{ duration: 20 + Math.random() * 10, repeat: Infinity, ease: "linear" }}
            />
          ))}
          {/* Neural Connections */}
          <motion.circle 
             animate={{ cx: mousePos.x, cy: mousePos.y }}
             transition={{ type: "spring", damping: 30, stiffness: 100 }}
             r="150" 
             fill="white" 
             className="opacity-20 blur-[100px]"
          />
       </svg>
    </div>
  )
}

function BioOrganModel({ progress }: { progress: any }) {
  const rotate = useTransform(progress, [0, 1], [0, 360])
  const scale = useTransform(progress, [0, 0.5, 1], [1, 1.1, 1])

  return (
    <motion.div style={{ rotate, scale }} className="relative w-80 h-80 flex items-center justify-center">
       <div className="absolute inset-0 border border-red-500/10 rounded-full animate-pulse shadow-[0_0_80px_rgba(239,68,68,0.05)]" />
       <Heart className="w-40 h-40 text-red-500/10 animate-bounce-slow" />
       <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[120%] h-px bg-gradient-to-r from-transparent via-red-500/10 to-transparent rotate-45" />
          <div className="w-[120%] h-px bg-gradient-to-r from-transparent via-red-500/10 to-transparent -rotate-45" />
       </div>
    </motion.div>
  )
}

/* ==========================================
   THE BIO-LOOM - MAIN INTERFACE
   ========================================== */

export default function BioLoomPremium() {
  const [activeOrgan, setActiveOrgan] = useState(0)
  const [isIncubatorActive, setIsIncubatorActive] = useState(true)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })

  // Bio Scroll Effects
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const textX = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  return (
    <div ref={containerRef} className="bg-[#080505] text-[#e5e0e0] font-mono selection:bg-red-500/30 selection:text-white min-h-screen overflow-x-hidden transition-colors duration-1000">
      
      {/* GLOBAL HUD OVERLAY */}
      <HUD_Overlay isIncubatorActive={isIncubatorActive} />

      <main>
        {/* ==========================================
            1. CELLULAR IGNITION (HERO)
            ========================================== */}
        <section className="relative h-screen flex flex-col justify-center items-center px-8 md:px-24 overflow-hidden pt-20">
          <CellularMeshVisualizer />
          <motion.div style={{ opacity: heroOpacity }} className="absolute z-0 pointer-events-none flex items-center justify-center">
             <BioOrganModel progress={scrollYProgress} />
          </motion.div>

          <div className="relative z-10 text-center max-w-7xl">
             <Reveal>
                <div className="inline-flex items-center gap-4 px-6 py-2 border border-red-500/30 bg-red-500/5 text-[10px] font-black uppercase tracking-[0.5em] text-red-500 mb-12 italic">
                   <Activity className="w-4 h-4" /> Biocompatibility_Link: SECURE // Vascular_Sync: OPTIMAL
                </div>
                <motion.h1 style={{ x: textX }} className="text-7xl md:text-[14vw] font-black tracking-tighter uppercase mb-16 leading-[0.75] italic">
                   Bio <br/> <span className="text-white/5 italic">Loom.</span>
                </motion.h1>
                <p className="max-w-3xl mx-auto text-sm md:text-lg text-white/30 leading-relaxed uppercase tracking-widest font-light mb-16 italic">
                   L'ingénierie de la vie par le design moléculaire. Nous tissons les organes de demain pour transcender les limites biologiques du corps humain.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                   <button className="px-12 py-6 bg-red-700 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-[0_0_40px_rgba(239,68,68,0.2)] flex items-center gap-4 italic">
                      <Microscope className="w-5 h-5" /> Start Synthesis
                   </button>
                   <button className="px-12 py-6 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all flex items-center gap-4 italic">
                      <Archive className="w-5 h-5" /> Organ Registry
                   </button>
                </div>
             </Reveal>
          </div>

          <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end border-t border-white/5 pt-12">
             <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4 text-[9px] font-bold text-white/20 uppercase tracking-widest italic">
                   <div className="w-16 h-px bg-white/10" />
                   Lab_ID: BIO-LOOM-42
                </div>
                <div className="flex items-center gap-4 text-[9px] font-bold text-white/20 uppercase tracking-widest italic">
                   <div className="w-16 h-px bg-white/10" />
                   Growth_Status: ACCELERATED
                </div>
             </div>
             <div className="text-right flex flex-col items-end gap-4">
                <span className="text-[8px] font-black uppercase tracking-[0.5em] text-red-500">Cellular_Pulse_Stream</span>
                <div className="flex gap-2 h-12 items-end">
                   {[...Array(16)].map((_, i) => (
                     <motion.div 
                        key={i}
                        animate={{ height: ["10%", "100%", "30%", "80%", "10%"] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                        className="w-2 bg-red-500/20"
                     />
                   ))}
                </div>
             </div>
          </div>
        </section>

        {/* ==========================================
            2. ORGAN REGISTRY (DENSE TECHNICAL)
            ========================================== */}
        <section className="py-60 bg-[#0a0808] relative border-y border-white/5 overflow-hidden">
           <div className="max-w-[1600px] mx-auto px-8 md:px-24">
              <div className="flex flex-col md:flex-row items-end justify-between mb-40 gap-12">
                 <Reveal>
                    <span className="text-[10px] font-black uppercase tracking-[0.6em] text-red-500 block mb-6 italic underline underline-offset-8 decoration-red-500/20">Bio // Engineering</span>
                    <h2 className="text-6xl md:text-[10vw] font-black uppercase tracking-tighter italic leading-none text-white">Registry.</h2>
                 </Reveal>
                 <div className="text-right">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 block mb-4 italic">Registry // Biological_Audit</span>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-500">L'Architecture du Vivant</p>
                 </div>
              </div>

              <div className="grid md:grid-cols-3 gap-px bg-white/5 border border-white/5 shadow-2xl">
                 {SYNTHETIC_ORGANS.map((organ, i) => (
                   <Reveal key={organ.id} delay={i * 0.1}>
                      <div className="bg-[#080505] p-20 flex flex-col h-full hover:bg-white/[0.02] transition-all group cursor-crosshair border-white/5 border-r last:border-r-0">
                         <div className="flex justify-between items-start mb-16">
                            <div className="w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-red-700 group-hover:text-white transition-all duration-500">
                               <Dna className="w-8 h-8" />
                            </div>
                            <span className={`px-4 py-2 bg-white/5 text-[9px] font-black uppercase tracking-[0.3em] ${organ.status === "Approved" ? "text-red-500" : "text-white/40"}`}>{organ.status}</span>
                         </div>
                         
                         <h3 className="text-4xl font-black uppercase tracking-tighter mb-8 italic text-white group-hover:translate-x-4 transition-transform">{organ.name}</h3>
                         <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] mb-12">{organ.type}</div>
                         
                         <div className="space-y-8 mb-20 border-l border-red-500/20 pl-8">
                            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
                               <span className="text-white/20">Biocompatibility</span>
                               <span className="text-white group-hover:text-red-500 transition-colors">{organ.biocompatibility}</span>
                            </div>
                            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
                               <span className="text-white/20">Vascularization</span>
                               <span className="text-white group-hover:text-red-500 transition-colors">{organ.vascularization}</span>
                            </div>
                            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
                               <span className="text-white/20">Maturation</span>
                               <span className="text-white group-hover:text-red-500 transition-colors">{organ.maturation}</span>
                            </div>
                         </div>

                         <p className="text-[12px] text-white/30 leading-loose uppercase tracking-[0.2em] font-bold italic mb-16">
                            {organ.desc}
                         </p>

                         <div className="mt-auto pt-10 border-t border-white/5 flex justify-between items-center">
                            <span className="text-[10px] font-black text-white/10 uppercase tracking-widest">Ref: {organ.id}</span>
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
                       <span className="text-[10px] font-black uppercase tracking-[0.5em] text-red-500 block mb-12 italic underline underline-offset-8 decoration-red-500/20">Bio // Monitoring</span>
                       <h2 className="text-7xl md:text-[9vw] font-light italic leading-none text-white mb-16 uppercase tracking-tighter">
                          The <br/> <span className="not-italic font-black text-white/5 italic">Maturation_Link.</span>
                       </h2>
                       <p className="text-2xl font-light text-white/20 leading-relaxed mb-24 italic uppercase tracking-[0.2em] max-w-xl">
                          Surveillance des tissus en bioréacteur. Nos capteurs moléculaires analysent la division cellulaire et la formation des réseaux capillaires en temps réel.
                       </p>
                       <div className="grid grid-cols-2 gap-px bg-white/5 border border-white/5 mb-24 shadow-2xl">
                          {BIOMETRIC_METRICS.map((metric, i) => (
                            <div key={i} className="p-16 bg-[#0a0808] group hover:bg-white/[0.02] transition-all border-r border-b last:border-r-0 border-white/5">
                               <div className="text-[10px] font-black uppercase text-red-500 mb-6 tracking-[0.4em]">{metric.label}</div>
                               <div className="text-5xl font-black text-white italic mb-6 tracking-tighter group-hover:translate-x-4 transition-transform">{metric.value}</div>
                               <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.3em] text-white/10 italic">
                                  <Activity className="w-4 h-4 text-red-500" /> {metric.trend}
                               </div>
                            </div>
                          ))}
                       </div>
                       <button 
                         onClick={() => setIsIncubatorActive(!isIncubatorActive)}
                         className="w-full py-8 bg-red-700 text-white text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-2xl flex items-center justify-center gap-6 italic"
                       >
                          <Settings className="w-5 h-5" /> Re-Sync Bioréacteur Nodes
                       </button>
                    </Reveal>
                 </div>
                 
                 <div className="relative">
                    <Reveal delay={0.3} x={40}>
                       <div className="aspect-square bg-[#0a0808] border border-white/10 p-20 flex flex-col justify-between relative group overflow-hidden shadow-2xl">
                          <div className="absolute top-0 right-0 p-80 bg-red-500 opacity-[0.02] blur-[150px] rounded-full group-hover:opacity-[0.05] transition-opacity" />
                          
                          <div className="flex justify-between items-start z-10">
                             <div className="flex flex-col gap-3">
                                <span className="text-[10px] font-black text-white/10 uppercase tracking-[0.5em]">Bio_Link // CELL-SYNC-v12</span>
                                <span className="text-[12px] font-black text-white/40 uppercase tracking-[0.6em]">Cellular_Density_Map</span>
                             </div>
                             <Wifi className="w-6 h-6 text-red-500" />
                          </div>
                          
                          {/* BIO VISUALIZER (SVG) */}
                          <div className="relative z-10 flex flex-col items-center justify-center h-full">
                             <div className="w-64 h-64 border border-red-500/5 rounded-full flex items-center justify-center relative">
                                <motion.div 
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                  className="absolute inset-0 border-t-2 border-red-500/20 rounded-full" 
                                />
                                <motion.div 
                                  animate={{ rotate: -360 }}
                                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                  className="absolute inset-8 border-b-2 border-red-500/10 rounded-full" 
                                />
                                <Activity className={`w-24 h-24 transition-colors duration-1000 ${isIncubatorActive ? "text-red-500 animate-pulse" : "text-white/5"}`} />
                             </div>
                             <div className="mt-16 text-center space-y-6">
                                <div className={`text-4xl font-black italic tracking-tighter ${isIncubatorActive ? "text-white" : "text-white/20"}`}>
                                   {isIncubatorActive ? "SYNC_ACTIVE" : "SYNC_LOST"}
                                </div>
                                <span className="text-[11px] font-bold text-white/10 uppercase tracking-[0.6em] block">Auth_Node: INCUBATOR_UNIT_01</span>
                             </div>
                          </div>

                          <div className="relative z-10 flex gap-6">
                             <div className="flex-1 h-1 bg-white/5 overflow-hidden">
                                <motion.div 
                                   animate={isIncubatorActive ? { x: ["-100%", "100%"] } : {}}
                                   transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                   className="w-1/2 h-full bg-red-600"
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
            4. BIO-STORYTELLING (TECH STORYTELLING)
            ========================================== */}
        <section className="py-60 bg-[#080505] relative overflow-hidden border-t border-white/5">
           <div className="max-w-[1400px] mx-auto px-8 md:px-24">
              <div className="grid lg:grid-cols-2 gap-40 items-center">
                 <div className="relative aspect-[3/4] overflow-hidden group border border-white/5 shadow-2xl">
                    <Image 
                       src="https://images.unsplash.com/photo-1532187863486-abf9d39d9992?q=80&w=1200&auto=format&fit=crop" 
                       alt="Laboratory" 
                       fill 
                       className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2000ms]"
                    />
                    <div className="absolute inset-0 bg-red-900/10 mix-blend-color group-hover:opacity-0 transition-opacity" />
                    <div className="absolute inset-0 p-20 flex flex-col justify-end bg-gradient-to-t from-black via-black/40 to-transparent">
                       <div className="text-white">
                          <span className="text-[11px] font-black uppercase tracking-[0.6em] text-red-500 mb-8 block italic underline underline-offset-8 decoration-red-500/20">Atelier // Purity // Unit</span>
                          <h4 className="text-6xl font-black tracking-tighter uppercase italic mb-12 mix-blend-difference text-white">Biological <br/> Fabric.</h4>
                          <button className="flex items-center gap-6 text-[11px] font-black uppercase tracking-[0.4em] border-b border-white/20 pb-4 hover:border-red-500 transition-all group">
                             Lab Protocols <ExternalLink className="w-5 h-5 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                          </button>
                       </div>
                    </div>
                 </div>

                 <div>
                    <Reveal>
                       <div className="mb-24 text-left">
                          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-red-500 mb-8 block italic">Chapitre III // Synthesis</span>
                          <h2 className="text-7xl md:text-[10vw] font-black tracking-tighter uppercase text-white italic leading-none text-white">Pure_Tissue.</h2>
                       </div>
                       <p className="text-2xl font-light text-white/20 leading-relaxed italic mb-20 uppercase tracking-[0.2em]">
                          L'organe du futur n'est pas mécanique, il est biologique. Nous utilisons des imprimantes 3D à haute résolution pour disposer les cellules couche par couche.
                       </p>
                       <div className="space-y-20">
                          {[
                            { t: "Cellular Deposition", d: "Placement précis des cellules souches au sein d'une matrice biocompatible pour recréer l'architecture tissulaire." },
                            { t: "Vascular Induction", d: "Stimulation de la croissance des vaisseaux sanguins par l'apport contrôlé de facteurs de croissance angiogéniques." },
                            { t: "Functional Maturation", d: "Entraînement mécanique et électrique des tissus en bioréacteur pour garantir une performance post-greffe." }
                          ].map((step, i) => (
                            <div key={i} className="group flex gap-12 border-b border-white/5 pb-16 hover:border-red-500/20 transition-all cursor-default">
                               <div className="text-6xl font-black text-white/5 group-hover:text-red-500/20 transition-colors italic leading-none">0{i+1}</div>
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
                    <div className="w-16 h-16 bg-red-700 flex items-center justify-center">
                      <Dna className="w-10 h-10 text-white" />
                    </div>
                    <span className="text-4xl font-black uppercase tracking-tighter italic">BIO<span className="text-white/20">LOOM.</span></span>
                 </div>
                 <p className="text-white/20 text-[11px] font-black uppercase tracking-[0.5em] leading-loose max-w-sm mb-20 italic">
                    "La vie est un tissu que nous apprenons à tisser." — Archive Bio V.42
                 </p>
                 <div className="flex gap-16">
                    {["LabLog", "OrganRegistry", "GitHub", "X_Protocol"].map(s => (
                      <Link key={s} href="#" className="text-[11px] font-black uppercase tracking-widest text-white/20 hover:text-red-500 transition-colors italic underline underline-offset-8 decoration-white/5">{s}</Link>
                    ))}
                 </div>
              </div>

              {[
                { t: "ORGANS", l: ["Cardiac Unit", "Respiratory Mesh", "Dermal Graft", "Neural Hub"] },
                { t: "TECHNOLOGY", l: ["3D Bio-Printing", "Incubator Sync", "Vascular Induction", "SLA Reports"] },
                { t: "ATELIER", l: ["Our Legacy", "Sustainability", "Locations", "Support"] }
              ].map((col, i) => (
                <div key={i} className="flex flex-col gap-12">
                  <h4 className="text-[11px] font-black text-red-500 uppercase tracking-[0.6em] italic">{col.t}</h4>
                  <ul className="flex flex-col gap-8">
                    {col.l.map(link => (
                      <li key={link} className="text-[11px] font-bold text-white/20 hover:text-white transition-colors cursor-pointer uppercase tracking-[0.4em] italic">{link}</li>
                    ))}
                  </ul>
                </div>
              ))}
           </div>

           <div className="max-w-[1600px] mx-auto border-t border-white/5 pt-16 flex flex-col md:flex-row justify-between items-center gap-16 text-[10px] font-black text-white/10 uppercase tracking-[0.6em] italic">
              <span>© 2026 BIO-LOOM SYNTHETIC ORGAN ENGINEERING AG. // ALL_RIGHTS_RESERVED</span>
              <div className="flex gap-16">
                 <span>STATUS: OPERATIONAL</span>
                 <span>GROWTH: ACCELERATED</span>
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

function HUD_Overlay({ isIncubatorActive }: { isIncubatorActive: boolean }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
       {/* Corner Brackets */}
       <div className={`absolute top-12 left-12 w-20 h-20 border-t-2 border-l-2 transition-colors duration-1000 ${isIncubatorActive ? "border-red-500" : "border-white/10"}`} />
       <div className={`absolute top-12 right-12 w-20 h-20 border-t-2 border-r-2 transition-colors duration-1000 ${isIncubatorActive ? "border-red-500" : "border-white/10"}`} />
       <div className={`absolute bottom-12 left-12 w-20 h-20 border-b-2 border-l-2 transition-colors duration-1000 ${isIncubatorActive ? "border-red-500" : "border-white/10"}`} />
       <div className={`absolute bottom-12 right-12 w-20 h-20 border-b-2 border-r-2 transition-colors duration-1000 ${isIncubatorActive ? "border-red-500" : "border-white/10"}`} />

       {/* Top Status Bar */}
       <div className="absolute top-12 left-1/2 -translate-x-1/2 flex items-center gap-20 bg-black/60 backdrop-blur-2xl px-12 py-4 border border-white/10 rounded-none">
          <div className="flex items-center gap-6 text-white">
             <div className={`w-3 h-3 transition-colors duration-500 ${isIncubatorActive ? "bg-red-500 animate-pulse" : "bg-red-900 animate-ping"}`} />
             <span className="text-[10px] font-black uppercase tracking-[0.4em] italic leading-none">Bio_Sync: {isIncubatorActive ? "NOMINAL" : "UNSTABLE"} // Status: ACTIVE</span>
          </div>
          <div className="h-4 w-px bg-white/20" />
          <div className="flex items-center gap-6 text-white/20">
             <Wifi className="w-4 h-4" /> 
             <span className="text-[10px] font-black uppercase tracking-[0.4em] italic leading-none">Lab_Grid: SECURE</span>
          </div>
       </div>

       {/* Right Rotation Info */}
       <div className="absolute right-12 top-1/2 -translate-y-1/2 rotate-90 origin-right hidden lg:block">
          <span className="text-[10px] font-black uppercase tracking-[0.8em] text-white/5 italic">Unauthorized_Duplication_Of_Biological_Patterns_Is_Strictly_Monitored_By_Global_Bio_Alliance</span>
       </div>
    </div>
  )
}
