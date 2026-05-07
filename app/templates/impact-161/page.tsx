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
  Anchor, Waves, Activity, Thermometer, 
  Droplets, Wind, Mountain, Compass, 
  ArrowRight, Menu, X, Plus, 
  Maximize2, Share2, Download, ExternalLink, 
  Archive, Hash, Wifi, BarChart3, 
  Microscope, Fingerprint, Scan, Brain,
  Layers, Frame, Box, Database, 
  Server, Cpu, Target, Orbit, 
  Atom, Satellite, Milestone, Power, 
  Settings, AlertTriangle, Info, 
  ChevronRight, Play, Lock, Key, 
  BookOpen, Radio, Zap, Dna,
  CloudSnow, MapPin, Gauge, Ship,
  Zap as ZapIcon, Shield, Search,
  Navigation, Code, Command, Grid,
  Radar, Lightbulb, Fish
} from "lucide-react"

/* ==========================================================================
   THE DEEP CORE DATASET (ULTRA DENSITY)
   ========================================================================== */

const MINERALS = [
  {
    id: "min-poly-01",
    name: "Polymetallic Nodules",
    composition: "Mn, Ni, Cu, Co",
    depth: "4,500m - 5,500m",
    density: "3.2 g/cm³",
    value: "$4,200/t",
    desc: "Concrétions rocheuses reposant sur le lit océanique, riches en métaux critiques pour les batteries haute performance.",
    status: "Extraction"
  },
  {
    id: "min-sulf-42",
    name: "Massive Sulfides",
    composition: "Cu, Zn, Au, Ag",
    depth: "1,500m - 3,500m",
    density: "4.8 g/cm³",
    value: "$12,800/t",
    desc: "Dépôts formés par l'activité hydrothermale, contenant des concentrations massives de métaux précieux.",
    status: "Active"
  },
  {
    id: "min-tell-09",
    name: "Cobalt-Rich Crusts",
    composition: "Co, Te, REE",
    depth: "800m - 2,500m",
    density: "2.9 g/cm³",
    value: "$18,500/t",
    desc: "Croûtes formées sur les flancs des monts sous-marins, cruciales pour les technologies de pointe.",
    status: "R&D"
  }
]

const ABYSS_METRICS = [
  { label: "External Pressure", value: "58.4 MPa", trend: "Increasing" },
  { label: "Water Temp", value: "2.4°C", trend: "Stable" },
  { label: "Oxygen Levels", value: "4.2 mg/L", trend: "Optimal" },
  { label: "Sonar Clarity", value: "94.2%", trend: "High" }
]

const MISSION_LOGS = [
  { time: "04:12:42", event: "ROV-Alpha: Deployment Initiated", level: "INFO" },
  { time: "04:12:55", event: "Pressure Seal Confirmed", level: "SECURE" },
  { time: "04:13:12", event: "Hydrothermal Vent Detected", level: "ALERT" }
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

function UnderwaterParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
       {[...Array(40)].map((_, i) => (
         <motion.div 
           key={i}
           initial={{ y: 2000, x: Math.random() * 2000, opacity: 0 }}
           animate={{ 
              y: -100, 
              x: (Math.random() * 2000) + (Math.random() * 200 - 100),
              opacity: [0, 0.8, 0]
           }}
           transition={{ 
              duration: Math.random() * 15 + 10, 
              repeat: Infinity, 
              delay: Math.random() * 15 
           }}
           className="w-1 h-1 bg-cyan-400 rounded-full absolute blur-[1px]"
         />
       ))}
    </div>
  )
}

function SonarPulse() {
  return (
    <div className="relative w-48 h-48 flex items-center justify-center">
       {[...Array(3)].map((_, i) => (
         <motion.div 
           key={i}
           initial={{ scale: 0.5, opacity: 0 }}
           animate={{ scale: 2, opacity: [0, 0.5, 0] }}
           transition={{ duration: 3, repeat: Infinity, delay: i * 1 }}
           className="absolute inset-0 border-2 border-cyan-400/30 rounded-full"
         />
       ))}
       <Radar className="w-12 h-12 text-cyan-400" />
    </div>
  )
}

/* ==========================================================================
   THE DEEP CORE - MAIN INTERFACE
   ========================================================================== */

export default function DeepCorePremium() {
  const [activeLog, setActiveLog] = useState(0)
  const [isSealActive, setIsSealActive] = useState(true)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })

  // Pressure Depth Effects
  const bgColor = useTransform(scrollYProgress, [0, 0.5, 1], ["#050a14", "#02050a", "#000000"])
  const depthValue = useTransform(scrollYProgress, [0, 1], [0, 6000])
  const pressureValue = useTransform(scrollYProgress, [0, 1], [0.1, 60.5])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLog(prev => (prev + 1) % MISSION_LOGS.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div 
      ref={containerRef} 
      style={{ backgroundColor: bgColor }}
      className="text-[#d1d9e0] font-mono selection:bg-cyan-500/30 selection:text-white min-h-screen overflow-x-hidden transition-colors duration-1000"
    >
      
      {/* GLOBAL HUD OVERLAY */}
      <HUD_Overlay activeLog={activeLog} isSealActive={isSealActive} />

      <main>
        {/* ==========================================
            1. ABYSSAL IGNITION (HERO)
            ========================================== */}
        <section className="relative h-screen flex flex-col justify-center items-center px-8 md:px-24 overflow-hidden pt-20">
          <UnderwaterParticles />
          <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
             <div className="w-[80vw] h-[80vw] border border-cyan-900/10 rounded-full animate-spin-slow" />
             <div className="absolute w-[60vw] h-[60vw] border border-cyan-900/5 rounded-full animate-reverse-spin" />
             <div className="absolute w-1/2 h-1/2 bg-cyan-900/5 blur-[120px] rounded-full animate-pulse" />
          </motion.div>

          <div className="relative z-10 text-center max-w-7xl">
             <Reveal>
                <div className="inline-flex items-center gap-4 px-4 py-1 border border-cyan-400/30 bg-cyan-400/5 text-[10px] font-black uppercase tracking-[0.5em] text-cyan-400 mb-12 italic">
                   <Anchor className="w-3 h-3" /> Mission_Status: Deep_Sync_Active
                </div>
                <h1 className="text-7xl md:text-[14vw] font-black tracking-tighter uppercase mb-16 leading-[0.75] italic">
                   Deep <br/> <span className="text-white/5 italic">Core_Infra.</span>
                </h1>
                <p className="max-w-2xl mx-auto text-sm md:text-base text-white/30 leading-relaxed uppercase tracking-widest font-light mb-16 italic">
                   Ingénierie de l'extrême pour les abysses océaniques. Nous forgeons les technologies qui permettent de récolter les métaux critiques de demain à 6000 mètres sous la surface.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                   <button className="px-12 py-5 bg-cyan-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-[0_0_40px_rgba(8,145,178,0.3)] flex items-center gap-4 italic">
                      <Waves className="w-4 h-4" /> Start Descent
                   </button>
                   <button className="px-12 py-5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all flex items-center gap-4 italic">
                      <Database className="w-4 h-4" /> Mineral Database
                   </button>
                </div>
             </Reveal>
          </div>

          {/* DEPTH METRICS */}
          <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end border-t border-white/5 pt-8">
             <div className="flex flex-col gap-4 text-left">
                <span className="text-[8px] font-black uppercase tracking-[0.5em] text-white/20 italic">Live_Submarine_Telemetry</span>
                <div className="flex items-center gap-8">
                   <div className="flex flex-col">
                      <motion.span className="text-4xl font-black italic text-cyan-400 leading-none">
                         {useSpring(depthValue, { stiffness: 40 }).get().toFixed(0)}m
                      </motion.span>
                      <span className="text-[8px] font-black uppercase text-white/20 italic">Current Depth</span>
                   </div>
                   <div className="w-px h-12 bg-white/10" />
                   <div className="flex flex-col">
                      <motion.span className="text-4xl font-black italic text-cyan-400 leading-none">
                         {useSpring(pressureValue, { stiffness: 40 }).get().toFixed(1)} MPa
                      </motion.span>
                      <span className="text-[8px] font-black uppercase text-white/20 italic">External Pressure</span>
                   </div>
                </div>
             </div>
             <div className="text-right flex flex-col items-end gap-2">
                <span className="text-[8px] font-black uppercase tracking-[0.5em] text-cyan-400">Sonar_Echo_Registry</span>
                <div className="flex gap-1 h-10 items-end">
                   {[...Array(12)].map((_, i) => (
                     <motion.div 
                        key={i}
                        animate={{ height: ["10%", "100%", "30%", "70%", "10%"] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                        className="w-1.5 bg-cyan-400/20"
                     />
                   ))}
                </div>
             </div>
          </div>
        </section>

        {/* ==========================================
            2. MINERAL MATRIX (DENSE GRID)
            ========================================== */}
        <section className="py-60 bg-black/40 relative border-y border-white/5 overflow-hidden">
           <div className="max-w-[1600px] mx-auto px-8 md:px-24">
              <div className="flex flex-col md:flex-row items-end justify-between mb-40 gap-12">
                 <Reveal>
                    <span className="text-[10px] font-black uppercase tracking-[0.6em] text-cyan-400 block mb-6 italic underline underline-offset-8 decoration-cyan-400/20">Abyssal // Resources</span>
                    <h2 className="text-6xl md:text-[9vw] font-black uppercase tracking-tighter italic leading-none text-white">Registry.</h2>
                 </Reveal>
                 <div className="text-right">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 block mb-4 italic">Registry // Deep_Sea_Audit</span>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-400">L'Architecture des Abysses</p>
                 </div>
              </div>

              <div className="grid md:grid-cols-3 gap-px bg-white/5 border border-white/5 shadow-2xl">
                 {MINERALS.map((min, i) => (
                   <Reveal key={min.id} delay={i * 0.1}>
                      <div className="bg-[#02050a] p-16 flex flex-col h-full hover:bg-white/[0.02] transition-all group cursor-crosshair border-white/5 border-r last:border-r-0">
                         <div className="flex justify-between items-start mb-16">
                            <div className="w-12 h-12 bg-white/5 flex items-center justify-center group-hover:bg-cyan-600 transition-all duration-500">
                               <Atom className="w-6 h-6 text-cyan-400 group-hover:text-white" />
                            </div>
                            <span className="px-3 py-1 bg-cyan-400/10 text-cyan-400 text-[8px] font-black uppercase tracking-widest">{min.status}</span>
                         </div>
                         
                         <h3 className="text-4xl font-black uppercase tracking-tighter mb-8 italic text-white group-hover:translate-x-4 transition-transform">{min.name}</h3>
                         <div className="text-[10px] font-black text-cyan-400/60 uppercase tracking-widest mb-8">{min.composition}</div>
                         
                         <div className="space-y-6 mb-16 border-l border-cyan-400/20 pl-6">
                            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                               <span className="text-white/20">Extraction Depth</span>
                               <span className="text-white group-hover:text-cyan-400 transition-colors">{min.depth}</span>
                            </div>
                            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                               <span className="text-white/20">Molecular Density</span>
                               <span className="text-white group-hover:text-cyan-400 transition-colors">{min.density}</span>
                            </div>
                            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                               <span className="text-white/20">Market Value</span>
                               <span className="text-white group-hover:text-cyan-400 transition-colors">{min.value}</span>
                            </div>
                         </div>

                         <p className="text-[11px] text-white/20 leading-loose uppercase tracking-[0.2em] font-bold italic mb-12">
                            {min.desc}
                         </p>

                         <div className="mt-auto pt-8 border-t border-white/5 flex justify-between items-center">
                            <span className="text-[9px] font-black text-white/10 uppercase tracking-widest">Ref: {min.id}</span>
                            <button className="text-[9px] font-black uppercase text-cyan-400 flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                               Resource Analysis <ChevronRight className="w-4 h-4" />
                            </button>
                         </div>
                      </div>
                   </Reveal>
                 ))}
              </div>
           </div>
        </section>

        {/* ==========================================
            3. TELEMETRY HUD (INTERACTIVE DATA)
            ========================================== */}
        <section className="py-60 bg-black/60 relative border-y border-white/5 overflow-hidden">
           <div className="max-w-[1400px] mx-auto px-8 md:px-24">
              <div className="grid lg:grid-cols-2 gap-32 items-center">
                 <div>
                    <Reveal>
                       <span className="text-[10px] font-black uppercase tracking-[0.5em] text-cyan-400 block mb-12 italic underline underline-offset-8 decoration-cyan-400/20">Advanced // Underwater // Telemetry</span>
                       <h2 className="text-6xl md:text-[8vw] font-light italic leading-none text-white mb-12 uppercase tracking-tighter text-white">
                          The <br/> <span className="not-italic font-black text-white/5 italic">Pressure_Seal.</span>
                       </h2>
                       <p className="text-xl font-light text-white/20 leading-relaxed mb-20 italic uppercase tracking-widest">
                          Surveillance biométrique et mécanique en temps réel. Nos systèmes de survie sont certifiés pour opérer dans les environnements les plus hostiles de la planète.
                       </p>
                       <div className="grid grid-cols-2 gap-8 mb-20">
                          {ABYSS_METRICS.map((metric, i) => (
                            <div key={i} className="p-10 bg-[#02050a] border border-cyan-900/20 group hover:border-cyan-400/30 transition-all">
                               <div className="text-[9px] font-black uppercase text-cyan-400 mb-4 tracking-[0.3em]">{metric.label}</div>
                               <div className="text-4xl font-light text-white italic">{metric.value}</div>
                               <div className="flex items-center gap-2 text-[8px] font-bold uppercase tracking-widest text-white/20 italic">
                                  <Activity className="w-3 h-3" /> {metric.trend}
                               </div>
                            </div>
                          ))}
                       </div>
                       <button 
                         onClick={() => setIsSealActive(!isSealActive)}
                         className="w-full py-6 bg-cyan-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-2xl flex items-center justify-center gap-4 italic"
                       >
                          <Power className="w-4 h-4" /> Toggle Pressure Seal
                       </button>
                    </Reveal>
                 </div>
                 
                 <div className="relative">
                    <Reveal delay={0.3} x={40}>
                       <div className="aspect-square bg-[#02050a] border border-white/10 p-16 flex flex-col justify-between relative group overflow-hidden shadow-2xl">
                          <div className="absolute top-0 right-0 p-60 bg-cyan-600 opacity-[0.03] blur-[120px] rounded-full group-hover:opacity-[0.1] transition-opacity" />
                          
                          <div className="flex justify-between items-start z-10">
                             <div className="flex flex-col gap-2">
                                <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">Drone_ID // ABYSS-SYNC-v8</span>
                                <span className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Sonar_Flow_Analysis</span>
                             </div>
                             <Wifi className="w-5 h-5 text-cyan-400" />
                          </div>
                          
                          {/* SONAR VISUALIZER */}
                          <div className="relative z-10 flex flex-col items-center justify-center h-full">
                             <SonarPulse />
                             <div className="text-center space-y-4 mt-8">
                                <div className={`text-4xl font-black italic tracking-tighter ${isSealActive ? "text-cyan-400 animate-pulse" : "text-white/20"}`}>
                                   {isSealActive ? "SEAL_NOMINAL" : "SEAL_WARNING"}
                                </div>
                                <span className="text-[9px] font-bold text-white/10 uppercase tracking-[0.5em]">Auth_Node: CHALLENGER_DEEP_01</span>
                             </div>
                          </div>

                          <div className="relative z-10 flex gap-4">
                             <div className="w-full h-1 bg-white/5 overflow-hidden">
                                <motion.div 
                                   animate={isSealActive ? { x: ["-100%", "100%"] } : {}}
                                   transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
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
            4. BIODIVERSITY LOG (TECH STORYTELLING)
            ========================================== */}
        <section className="py-60 bg-black relative overflow-hidden">
           <div className="max-w-[1400px] mx-auto px-8 md:px-24">
              <div className="grid lg:grid-cols-2 gap-32 items-center">
                 <div className="relative aspect-[4/5] overflow-hidden group border border-white/5 shadow-2xl">
                    <Image 
                       src="https://images.unsplash.com/photo-1544919934-807e47d1217e?q=80&w=1200&auto=format&fit=crop" 
                       alt="Deep Sea Bioluminescence" 
                       fill 
                       className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2000ms]"
                    />
                    <div className="absolute inset-0 bg-cyan-900/20 mix-blend-color group-hover:opacity-0 transition-opacity" />
                    <div className="absolute inset-0 p-16 flex flex-col justify-end bg-gradient-to-t from-black via-black/40 to-transparent">
                       <div className="text-white">
                          <span className="text-[10px] font-black uppercase tracking-[0.6em] text-cyan-400 mb-6 block italic underline underline-offset-8 decoration-cyan-400/20">Ecological // Impact // Unit</span>
                          <h4 className="text-5xl font-black tracking-tighter uppercase italic mb-8">Abyssal <br/> Heritage.</h4>
                          <button className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest border-b border-cyan-400 pb-2 hover:border-white transition-all group">
                             Environment Protocols <ExternalLink className="w-4 h-4 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                          </button>
                       </div>
                    </div>
                 </div>

                 <div>
                    <Reveal>
                       <div className="mb-24 text-left">
                          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-cyan-400 mb-8 block italic">Chapitre III // Ecology</span>
                          <h2 className="text-6xl md:text-[8vw] font-black tracking-tighter uppercase text-white italic leading-none text-white">Blue_Deep.</h2>
                       </div>
                       <p className="text-xl font-light text-white/20 leading-relaxed italic mb-16 uppercase tracking-widest">
                          L'extraction minière sous-marine exige une responsabilité écologique absolue. Nos drones cartographient chaque centimètre carré de l'habitat abyssal pour minimiser notre empreinte physique.
                       </p>
                       <div className="space-y-16">
                          {[
                            { t: "Plume Containment", d: "Technologie de sédimentation contrôlée pour prévenir la dispersion des particules lors de l'extraction." },
                            { t: "Bioluminescence Guard", d: "Protocoles d'éclairage à basse intensité pour ne pas perturber les cycles naturels de la faune abyssale." },
                            { t: "Habitat Restoration", d: "Programmes de réhabilitation post-extraction basés sur l'ensemencement de coraux de profondeur." }
                          ].map((step, i) => (
                            <div key={i} className="group flex gap-12 border-b border-white/5 pb-12 hover:border-cyan-400/30 transition-all cursor-default">
                               <div className="text-5xl font-black text-white/5 group-hover:text-cyan-400/20 transition-colors italic leading-none">0{i+1}</div>
                               <div>
                                  <h5 className="text-2xl font-bold uppercase tracking-tight text-white mb-4 italic group-hover:translate-x-2 transition-transform text-white">{step.t}</h5>
                                  <p className="text-[10px] text-white/20 uppercase tracking-[0.2em] font-bold leading-relaxed italic">{step.d}</p>
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
                 <div className="flex items-center gap-4 mb-12">
                    <div className="w-12 h-12 bg-cyan-600 flex items-center justify-center">
                      <Anchor className="w-8 h-8 text-white" />
                    </div>
                    <span className="text-3xl font-black uppercase tracking-tighter italic">DEEP<span className="text-cyan-400">_CORE.</span></span>
                 </div>
                 <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.4em] leading-loose max-w-sm mb-16 italic">
                    "Les Abysses sont le dernier bastion de l'inconnu sur Terre." — Archive Core V.8
                 </p>
                 <div className="flex gap-12">
                    {["DiveLog", "MineralRegistry", "GitHub", "X_Protocol"].map(s => (
                      <Link key={s} href="#" className="text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-cyan-400 transition-colors italic underline underline-offset-8 decoration-white/5">{s}</Link>
                    ))}
                 </div>
              </div>

              {[
                { t: "EXPLORATION", l: ["ROV Systems", "Deep Submersibles", "Sonar Mapping", "Thermal Vents"] },
                { t: "RESOURCES", l: ["Mineral Registry", "Extraction Tech", "Market Index", "Storage"] },
                { t: "ECOLOGY", l: ["Plume Control", "Biodiversity", "Restoration", "Deep Ethics"] }
              ].map((col, i) => (
                <div key={i} className="flex flex-col gap-12">
                  <h4 className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.5em] italic">{col.t}</h4>
                  <ul className="flex flex-col gap-6">
                    {col.l.map(link => (
                      <li key={link} className="text-[10px] font-bold text-white/20 hover:text-white transition-colors cursor-pointer uppercase tracking-widest italic">{link}</li>
                    ))}
                  </ul>
                </div>
              ))}
           </div>

           <div className="max-w-[1600px] mx-auto border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-12 text-[8px] font-black text-white/10 uppercase tracking-[0.4em] italic">
              <span>© 2026 DEEP CORE OCEANIC INFRASTRUCTURE AG. // ALL_RIGHTS_RESERVED</span>
              <div className="flex gap-12">
                 <span>STATUS: PRESSURE_SECURE</span>
                 <span>DEPTH: 6,000m (MAX)</span>
                 <span>v8.4.0-STABLE</span>
              </div>
           </div>
        </footer>
      </main>
    </motion.div>
  )
}

/* ==========================================
   TECHNICAL SUB-COMPONENTS
   ========================================== */

function HUD_Overlay({ activeLog, isSealActive }: { activeLog: number, isSealActive: boolean }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
       {/* Corner Brackets */}
       <div className={`absolute top-12 left-12 w-16 h-16 border-t border-l transition-colors duration-1000 ${isSealActive ? "border-cyan-400/20" : "border-red-500"}`} />
       <div className={`absolute top-12 right-12 w-16 h-16 border-t border-r transition-colors duration-1000 ${isSealActive ? "border-cyan-400/20" : "border-red-500"}`} />
       <div className={`absolute bottom-12 left-12 w-16 h-16 border-b border-l transition-colors duration-1000 ${isSealActive ? "border-cyan-400/20" : "border-red-500"}`} />
       <div className={`absolute bottom-12 right-12 w-16 h-16 border-b border-r transition-colors duration-1000 ${isSealActive ? "border-cyan-400/20" : "border-red-500"}`} />

       {/* Top Status Bar */}
       <div className="absolute top-12 left-1/2 -translate-x-1/2 flex items-center gap-16 bg-black/60 backdrop-blur-md px-10 py-3 border border-white/5 rounded-full">
          <div className="flex items-center gap-4">
             <div className={`w-2 h-2 rounded-full transition-colors duration-500 ${isSealActive ? "bg-cyan-400 animate-pulse" : "bg-red-500 animate-ping"}`} />
             <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${isSealActive ? "text-white/60" : "text-red-500"}`}>
                {isSealActive ? "Pressure_Status: SEALED" : "CRITICAL_SEAL_FAILURE"}
             </span>
          </div>
          <div className="h-4 w-px bg-white/10" />
          <div className="flex items-center gap-4 text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">
             <Wifi className="w-3 h-3" /> Earth_Relay: Secure
          </div>
       </div>

       {/* Left Live Logs */}
       <div className="absolute left-12 top-1/2 -translate-y-1/2 flex flex-col gap-2 hidden lg:flex">
          {MISSION_LOGS.map((log, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: i === activeLog ? 1 : 0.1, x: i === activeLog ? 0 : -10 }}
              className={`text-[8px] font-mono font-bold ${i === activeLog ? (log.level === "ALERT" ? "text-red-500" : "text-cyan-400") : "text-white"}`}
            >
              [{log.time}] {log.event}
            </motion.div>
          ))}
       </div>

       {/* Right Rotation Info */}
       <div className="absolute right-12 top-1/2 -translate-y-1/2 rotate-90 origin-right hidden lg:block">
          <span className="text-[8px] font-black uppercase tracking-[0.6em] text-white/5 italic">Unauthorized_Dumping_Of_Tailing_Waste_Into_Deep_Ocean_Is_Strictly_Prohibited_By_Maritime_Council_Law</span>
       </div>
    </div>
  )
}
