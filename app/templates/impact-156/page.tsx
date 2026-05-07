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
  Rocket, Globe, Zap, Radio, 
  Activity, Terminal, Lock, Eye, 
  Crosshair, Settings, Power, Info, 
  AlertTriangle, ChevronRight, ArrowRight, 
  Share2, Maximize2, Download, ExternalLink, 
  Archive, Hash, Wifi, BarChart3, 
  Microscope, Fingerprint, Scan, Brain,
  Layers, Frame, Droplets, Landmark,
  Wind, Mountain, Compass, Map, 
  CloudRain, Thermometer, Sun, Moon,
  Box, Database, Server, Cpu,
  Target, ShieldCheck, Gauge, Timer,
  Orbit, Atom, Satellite, Milestone
} from "lucide-react"

/* ==========================================================================
   ORBITAL HABITAT DATASET (ULTRA DENSITY)
   ========================================================================== */

const MODULES = [
  {
    id: "mod-bio",
    name: "Hydroponic Ring Alpha",
    purpose: "Life Support & Nutrition",
    capacity: "4,200kg/cycle",
    shielding: "Graphene-Lead Composite",
    desc: "Noyau de production de biomasse et recyclage d'O2 pour 50 résidents permanents.",
    status: "Optimal"
  },
  {
    id: "mod-hab",
    name: "Habitation Node 04",
    purpose: "Residential & Recreation",
    capacity: "24 Personnel",
    shielding: "Lunar Regolith Sintered",
    desc: "Unités d'habitation pressurisées avec simulation de cycle circadien intégré.",
    status: "Active"
  },
  {
    id: "mod-sci",
    name: "Deep Space Lab",
    purpose: "Research & Synthesis",
    capacity: "12 Scientists",
    shielding: "Magnetic Field Active",
    desc: "Laboratoire de microgravité pour la synthèse de matériaux supra-conducteurs.",
    status: "Standby"
  }
]

const TELEMETRY = [
  { label: "Internal Pressure", value: "101.3 kPa", status: "Stable" },
  { label: "O2 Concentration", value: "21.4%", status: "Nominal" },
  { label: "Power Output", value: "1.4 MW", status: "Solar Max" },
  { label: "Shield Integrity", value: "99.98%", status: "Secure" }
]

const TRANSIT_LOGS = [
  { launch: "T-Minus 12d", payload: "Water Ice 40t", destination: "Mars Node B" },
  { launch: "T-Minus 24d", payload: "Bio-Seeds v4", destination: "Orbital Hub" },
  { launch: "T-Minus 45d", payload: "Nuclear Core", destination: "Titan Colony" }
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

function GridLine({ vertical = false, position = "50%" }: { vertical?: boolean, position?: string }) {
  return (
    <div 
      className={`absolute bg-white/5 pointer-events-none ${vertical ? "w-[1px] top-0 bottom-0" : "h-[1px] left-0 right-0"}`}
      style={{ [vertical ? "left" : "top"]: position }}
    />
  )
}

function InertialScroll({ children, factor = 0.1 }: { children: React.ReactNode, factor?: number }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref })
  const y = useTransform(scrollYProgress, [0, 1], [0, 100 * factor])
  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  )
}

/* ==========================================================================
   THE ORBITAL HABITAT - MAIN APPLICATION
   ========================================================================== */

export default function OrbitalHabitatPremium() {
  const [activeTab, setActiveTab] = useState("telemetry")
  const [isAlertActive, setIsAlertActive] = useState(false)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })

  // Parallax & Rotation Effects
  const orbitRotate = useTransform(scrollYProgress, [0, 1], [0, 360])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -200])

  return (
    <div ref={containerRef} className="bg-[#050507] text-[#e0e2e5] font-mono selection:bg-cyan-500/30 selection:text-white min-h-screen overflow-x-hidden">
      
      {/* GLOBAL HUD OVERLAY */}
      <HUD_Overlay isAlertActive={isAlertActive} />

      {/* ==========================================
          1. LAUNCH SEQUENCE (HERO)
          ========================================== */}
      <section className="relative h-screen flex flex-col justify-center items-center px-8 md:px-24 overflow-hidden pt-20">
        {/* Background Starfield & Orbit Animation */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        <motion.div style={{ rotate: orbitRotate, opacity: heroOpacity }} className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
           <div className="w-[80vw] h-[80vw] border border-white/5 rounded-full" />
           <div className="absolute w-[60vw] h-[60vw] border border-white/5 rounded-full" />
           <div className="absolute top-0 w-8 h-8 bg-cyan-400 rounded-full blur-xl animate-pulse" />
           <div className="absolute bottom-1/4 left-1/4 w-4 h-4 bg-red-500 rounded-full blur-lg animate-ping" />
        </motion.div>

        <div className="relative z-10 text-center max-w-7xl">
           <Reveal>
              <div className="inline-flex items-center gap-4 px-4 py-1 border border-cyan-400/30 bg-cyan-400/5 text-[10px] font-bold uppercase tracking-[0.5em] text-cyan-400 mb-12 italic">
                 <Orbit className="w-3 h-3" /> Station_Status: Geostationary_Sync
              </div>
              <motion.h1 style={{ y: textY }} className="text-7xl md:text-[14vw] font-black tracking-tighter uppercase mb-16 leading-[0.75] italic">
                Orbital <br/> <span className="text-white/5 italic">Habitats.</span>
              </motion.h1>
              <p className="max-w-2xl mx-auto text-sm md:text-base text-white/30 leading-relaxed uppercase tracking-widest font-light mb-16 italic">
                 Ingénierie de survie pour l'expansion multi-planétaire. Nous forgeons les structures pressurisées qui abriteront le prochain siècle de l'humanité.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                 <button className="px-12 py-5 bg-cyan-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-[0_0_40px_rgba(8,145,178,0.3)] flex items-center gap-4">
                    <Rocket className="w-4 h-4" /> Begin Docking
                 </button>
                 <button className="px-12 py-5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all flex items-center gap-4">
                    <Database className="w-4 h-4" /> Technical Blueprint
                 </button>
              </div>
           </Reveal>
        </div>

        {/* BOTTOM TELEMETRY BAR */}
        <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end border-t border-white/5 pt-8">
           <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 text-[9px] font-bold text-white/20 uppercase tracking-widest italic">
                 <div className="w-12 h-px bg-white/10" />
                 Coord: 0.0000° N, 0.0000° E
              </div>
              <div className="flex items-center gap-4 text-[9px] font-bold text-white/20 uppercase tracking-widest italic">
                 <div className="w-12 h-px bg-white/10" />
                 Velocity: 7.67 km/s
              </div>
           </div>
           <div className="text-right flex flex-col items-end gap-2">
              <span className="text-[8px] font-black uppercase tracking-[0.5em] text-cyan-400">Live_Oxygen_Stream</span>
              <div className="flex gap-2 h-10 items-end">
                 {[...Array(12)].map((_, i) => (
                   <motion.div 
                    key={i}
                    animate={{ height: ["20%", "100%", "40%", "80%", "20%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                    className="w-1.5 bg-cyan-400/20"
                   />
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* ==========================================
          2. MODULES REGISTRY (DENSE TECHNICAL)
          ========================================== */}
      <section className="py-60 bg-[#08080a] relative border-y border-white/5 overflow-hidden">
         <div className="max-w-[1600px] mx-auto px-8 md:px-24">
            <div className="flex flex-col md:flex-row items-end justify-between mb-40 gap-12">
               <Reveal>
                  <span className="text-[10px] font-black uppercase tracking-[0.6em] text-cyan-400 block mb-6 italic underline underline-offset-8">Pressurized // Modules</span>
                  <h2 className="text-6xl md:text-[9vw] font-black uppercase tracking-tighter italic leading-none">Registry.</h2>
               </Reveal>
               <div className="text-right">
                  <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 block mb-4 italic">Registry // Structural_Audit</span>
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-400">L'Architecture du Vide</p>
               </div>
            </div>

            <div className="grid md:grid-cols-3 gap-px bg-white/5 border border-white/5">
               {MODULES.map((mod, i) => (
                 <Reveal key={mod.id} delay={i * 0.1}>
                    <div className="bg-[#050507] p-16 flex flex-col h-full hover:bg-white/5 transition-all group cursor-crosshair">
                       <div className="flex justify-between items-start mb-16">
                          <div className="w-12 h-12 bg-white/5 flex items-center justify-center group-hover:bg-cyan-600 transition-all">
                             <Box className="w-6 h-6 text-cyan-400 group-hover:text-white" />
                          </div>
                          <span className="text-[10px] font-black text-white/20 group-hover:text-cyan-400 transition-colors">{mod.id}</span>
                       </div>
                       
                       <h3 className="text-4xl font-black uppercase tracking-tighter mb-8 italic">{mod.name}</h3>
                       <div className="text-[10px] font-black text-cyan-400/60 uppercase tracking-widest mb-8">{mod.purpose}</div>
                       <p className="text-sm font-light text-white/40 leading-relaxed uppercase tracking-widest italic mb-12">
                          {mod.desc}
                       </p>

                       <div className="space-y-6 mb-16 border-l border-white/10 pl-6">
                          <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest">
                             <span className="text-white/20">Capacity</span>
                             <span className="text-white group-hover:text-cyan-400 transition-colors">{mod.capacity}</span>
                          </div>
                          <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest">
                             <span className="text-white/20">Shielding</span>
                             <span className="text-white group-hover:text-cyan-400 transition-colors">{mod.shielding}</span>
                          </div>
                       </div>

                       <div className="mt-auto flex justify-between items-center pt-8 border-t border-white/5">
                          <div className="flex items-center gap-3">
                             <div className={`w-2 h-2 rounded-full ${mod.status === "Optimal" ? "bg-cyan-400" : "bg-yellow-500"} animate-pulse`} />
                             <span className="text-[9px] font-black uppercase tracking-widest">{mod.status}</span>
                          </div>
                          <button className="text-white/20 group-hover:text-cyan-400 transition-colors">
                             <Maximize2 className="w-4 h-4" />
                          </button>
                       </div>
                    </div>
                 </Reveal>
               ))}
            </div>
         </div>
      </section>

      {/* ==========================================
          3. LIFE SUPPORT HUB (INTERACTIVE)
          ========================================== */}
      <section className="py-60 bg-black relative border-y border-white/5 overflow-hidden">
         <div className="max-w-[1400px] mx-auto px-8 md:px-24">
            <div className="grid lg:grid-cols-2 gap-32 items-center">
               <div>
                  <Reveal>
                     <span className="text-[10px] font-black uppercase tracking-[0.5em] text-cyan-400 block mb-12 italic underline underline-offset-8">Critical // Survival_Systems</span>
                     <h2 className="text-6xl md:text-[8vw] font-light italic leading-none text-white mb-12 uppercase tracking-tighter">
                        The <br/> <span className="not-italic font-black text-white/5 italic">Vital_Core.</span>
                     </h2>
                     <p className="text-xl font-light text-white/20 leading-relaxed mb-20 italic uppercase tracking-widest">
                        Gestion centralisée des ressources. Nos algorithmes prédictifs optimisent la consommation d'O2 et d'énergie solaire pour garantir une autonomie perpétuelle.
                     </p>
                     <div className="grid grid-cols-2 gap-8 mb-20">
                        {TELEMETRY.map((stat, i) => (
                          <div key={i} className="p-10 bg-[#08080a] border border-white/5 group hover:border-cyan-600/30 transition-all">
                             <div className="text-[9px] font-black uppercase text-cyan-400 mb-4 tracking-[0.3em]">{stat.label}</div>
                             <div className="text-4xl font-light text-white italic">{stat.value}</div>
                             <div className="flex items-center gap-2 text-[8px] font-bold uppercase tracking-widest text-white/20 italic">
                                <Activity className="w-3 h-3" /> {stat.status}
                             </div>
                          </div>
                        ))}
                     </div>
                     <button 
                      onClick={() => setIsAlertActive(!isAlertActive)}
                      className="w-full py-6 bg-cyan-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-2xl flex items-center justify-center gap-4"
                     >
                        <Settings className="w-4 h-4" /> Calibrate Life Support
                     </button>
                  </Reveal>
               </div>
               
               <div className="relative">
                  <Reveal delay={0.3} x={40}>
                     <div className="aspect-square bg-[#08080a] border border-white/10 p-16 flex flex-col justify-between relative group overflow-hidden">
                        <div className="absolute top-0 right-0 p-60 bg-cyan-600 opacity-[0.03] blur-[120px] rounded-full group-hover:opacity-[0.1] transition-opacity" />
                        
                        <div className="flex justify-between items-start z-10">
                           <div className="flex flex-col gap-2">
                              <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">Station_ID // HAB-OMEGA</span>
                              <span className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Atmospheric_Synthesis</span>
                           </div>
                           <Wifi className="w-5 h-5 text-cyan-400" />
                        </div>
                        
                        <div className="relative z-10 flex flex-col items-center gap-12">
                           <div className="w-32 h-32 border-2 border-dashed border-cyan-400/20 rounded-full flex items-center justify-center relative">
                              <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 border-t-2 border-cyan-600 rounded-full" 
                              />
                              <Droplets className="w-12 h-12 text-cyan-600" />
                           </div>
                           <div className="text-center space-y-4">
                              <div className="text-4xl font-black italic tracking-tighter text-white">RECYCLING_ACTIVE</div>
                              <span className="text-[9px] font-bold text-white/10 uppercase tracking-[0.5em]">Auth_Node: EARTH_RELAY_ALPHA</span>
                           </div>
                        </div>

                        <div className="relative z-10 flex gap-4">
                           <div className="flex-1 h-1 bg-white/5 overflow-hidden">
                              <motion.div 
                                animate={{ x: ["-100%", "100%"] }} 
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
          4. TRANSIT LOG (TIMELINE DENSITY)
          ========================================== */}
      <section className="py-60 bg-[#050507] relative border-y border-white/5 overflow-hidden">
         <div className="max-w-[1400px] mx-auto px-8 md:px-24">
            <div className="grid lg:grid-cols-2 gap-32 items-center">
               <div className="relative aspect-[4/5] overflow-hidden group border border-white/10">
                  <Image 
                     src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1200&auto=format&fit=crop" 
                     alt="Earth from Orbit" 
                     fill 
                     className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-cyan-900/20 mix-blend-color group-hover:opacity-0 transition-opacity" />
                  <div className="absolute inset-0 p-16 flex flex-col justify-end bg-gradient-to-t from-black to-transparent">
                     <div className="text-white">
                        <span className="text-[10px] font-black uppercase tracking-[0.6em] text-cyan-400 mb-6 block italic underline underline-offset-8">Orbital // Logistics // Unit</span>
                        <h4 className="text-5xl font-black tracking-tighter uppercase italic mb-8">Supply <br/> Chain Zero.</h4>
                        <button className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest border-b border-cyan-400 pb-2">
                           Launch Protocols <ExternalLink className="w-4 h-4" />
                        </button>
                     </div>
                  </div>
               </div>

               <div>
                  <Reveal>
                     <SectionTitle subtitle="Chapitre III // Logistics" title="Transit_Log." alignment="left" />
                     <p className="text-xl font-light text-white/30 leading-relaxed italic mb-16 uppercase tracking-widest">
                        La survie spatiale repose sur une chaîne d'approvisionnement millimétrée. Chaque transit est une fenêtre critique pour le maintien de l'habitat et l'expansion des nœuds.
                     </p>
                     <div className="space-y-16">
                        {TRANSIT_LOGS.map((log, i) => (
                          <div key={i} className="group flex gap-12 border-b border-white/5 pb-12 hover:border-cyan-600/30 transition-all">
                             <div className="text-5xl font-black text-white/5 group-hover:text-cyan-400/20 transition-colors italic">0{i+1}</div>
                             <div>
                                <h5 className="text-2xl font-bold uppercase tracking-tight text-white mb-4 italic group-hover:text-cyan-400 transition-colors">{log.launch}</h5>
                                <div className="flex gap-8 text-[9px] font-bold text-white/20 uppercase tracking-widest italic">
                                   <span>Payload: {log.payload}</span>
                                   <ArrowRight className="w-3 h-3 text-cyan-400" />
                                   <span>Target: {log.destination}</span>
                                </div>
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
                    <Orbit className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-3xl font-black uppercase tracking-tighter italic">ORBITAL<span className="text-cyan-400">_HABITATS.</span></span>
               </div>
               <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.4em] leading-loose max-w-sm mb-16 italic">
                  "L'espace n'est pas une frontière, c'est notre prochain domicile." — Archive Orbital V.9
               </p>
               <div className="flex gap-12">
                  {["DeepSpaceNet", "MarsRelay", "GitHub", "X_Protocol"].map(s => (
                    <Link key={s} href="#" className="text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-cyan-400 transition-colors italic">{s}</Link>
                  ))}
               </div>
            </div>

            {[
              { t: "ARCHITECT", l: ["Pressurized Domes", "Centrifugal Hubs", "Lunar Habitats", "Titan Nodes"] },
              { t: "SYSTEMS", l: ["Life Support", "Solar Arrays", "Shield Gen", "Airlock v8"] },
              { t: "FACILITIES", l: ["Station Omega", "Luna Base 1", "Mars Outpost", "Europa Lab"] }
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
            <span>© 2026 ORBITAL HABITAT HEAVY INDUSTRIES AG. // ALL_RIGHTS_RESERVED</span>
            <div className="flex gap-12">
               <span>STATUS: PRESSURIZED</span>
               <span>GRAVITY: 1.0G (CENTRIFUGAL)</span>
               <span>v9.4.0-STABLE</span>
            </div>
         </div>
      </footer>
    </div>
  )
}

/* ==========================================
   TECHNICAL SUB-COMPONENTS
   ========================================== */

function HUD_Overlay({ isAlertActive }: { isAlertActive: boolean }) {
  return (
    <div className={`fixed inset-0 pointer-events-none z-[100] transition-all duration-1000 ${isAlertActive ? "bg-red-500/5" : ""}`}>
       {/* Corner Brackets */}
       <div className={`absolute top-12 left-12 w-16 h-16 border-t border-l transition-colors duration-1000 ${isAlertActive ? "border-red-500" : "border-white/10"}`} />
       <div className={`absolute top-12 right-12 w-16 h-16 border-t border-r transition-colors duration-1000 ${isAlertActive ? "border-red-500" : "border-white/10"}`} />
       <div className={`absolute bottom-12 left-12 w-16 h-16 border-b border-l transition-colors duration-1000 ${isAlertActive ? "border-red-500" : "border-white/10"}`} />
       <div className={`absolute bottom-12 right-12 w-16 h-16 border-b border-r transition-colors duration-1000 ${isAlertActive ? "border-red-500" : "border-white/10"}`} />

       {/* Top Status Bar */}
       <div className="absolute top-12 left-1/2 -translate-x-1/2 flex items-center gap-16 bg-black/40 backdrop-blur-md px-10 py-3 border border-white/5 rounded-full">
          <div className="flex items-center gap-4">
             <div className={`w-2 h-2 rounded-full transition-colors duration-500 ${isAlertActive ? "bg-red-500 animate-ping" : "bg-cyan-400 animate-pulse"}`} />
             <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${isAlertActive ? "text-red-500" : "text-white/60"}`}>
                {isAlertActive ? "SYSTEM_ALERT: O2_LEAK_SIMULATED" : "Habitat_Status: Optimal"}
             </span>
          </div>
          <div className="h-4 w-px bg-white/10" />
          <div className="flex items-center gap-4 text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">
             <Compass className="w-3 h-3" /> Earth_Relay: Active
          </div>
       </div>

       {/* Bottom Countdown */}
       <div className="absolute bottom-12 left-12 flex flex-col gap-2">
          <span className="text-[8px] font-black text-white/10 uppercase tracking-widest italic">Next_Supply_Transit</span>
          <div className="flex gap-4">
             {["12d", "14h", "02m", "55s"].map((t, i) => (
               <div key={i} className="text-xl font-black text-white italic">{t}</div>
             ))}
          </div>
       </div>

       {/* Right Rotation Info */}
       <div className="absolute right-12 top-1/2 -translate-y-1/2 rotate-90 origin-right hidden lg:block">
          <span className="text-[8px] font-black uppercase tracking-[0.6em] text-white/5 italic">Unauthorized_Dumping_Of_Waste_Into_Orbit_Is_Strictly_Prohibited_By_Intergalactic_Law</span>
       </div>
    </div>
  )
}

function SectionTitle({ subtitle, title, alignment = "center" }: { subtitle: string, title: string, alignment?: "center" | "left" }) {
  return (
    <div className={`mb-32 ${alignment === "center" ? "text-center" : "text-left"}`}>
       <Reveal>
          <span className="text-[10px] font-black uppercase tracking-[0.6em] text-cyan-400 mb-8 block italic underline underline-offset-8">
             {subtitle}
          </span>
          <h2 className="text-6xl md:text-[8vw] font-black tracking-tighter uppercase text-white italic">
             {title}
          </h2>
       </Reveal>
    </div>
  )
}