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
  Rocket, Map, Compass, Shield, 
  Globe, Zap, Database, Activity, 
  Target, Orbit, Atom, Satellite, 
  Milestone, Gauge, Timer, Cloud, 
  Signal, Search, Navigation, Code, 
  Command, Grid, Radar, Lightbulb, 
  Layers, Box, Hexagon, Terminal, 
  Settings, Power, Info, AlertTriangle, 
  ChevronRight, ArrowRight, Share2, 
  Maximize2, Download, ExternalLink, 
  Archive, Hash, Wifi, BarChart3, 
  Microscope, Fingerprint, Scan, 
  Brain, Server, ShieldCheck, 
  ShieldAlert, Award, Briefcase, 
  Star, Send, Wind, Flame, Sun, Moon
} from "lucide-react"

/* ==========================================================================
   THE ORBITAL HUB DATASET (ULTRA DENSITY)
   ========================================================================== */

const FLEET_ASSETS = [
  {
    id: "vessel-at-92",
    name: "Atlas-V9 Heavy",
    type: "Heavy-Lift Carrier",
    propulsion: "Nuclear Thermal",
    delta_v: "14.2 km/s",
    payload: "420 Tons",
    destination: "Mars Transfer",
    status: "In Transit"
  },
  {
    id: "vessel-ic-04",
    name: "Ion-Carrier Zenith",
    type: "Long-Range Scout",
    propulsion: "Xenon Ion Drive",
    delta_v: "45.8 km/s",
    payload: "25 Tons",
    destination: "Belt Asteroids",
    status: "Docked"
  },
  {
    id: "vessel-lp-08",
    name: "Lander-Probe Echo",
    type: "Planetary Descent",
    propulsion: "Methane/LOX",
    delta_v: "3.2 km/s",
    payload: "12 Tons",
    destination: "Europa Surface",
    status: "Pre-Launch"
  }
]

const ORBITAL_METRICS = [
  { label: "Fleet Uptime", value: "99.98%", trend: "Stable" },
  { label: "Active Nodes", value: "142", trend: "Increasing" },
  { label: "Energy Harvest", value: "4.2 GW", trend: "Optimal" },
  { label: "Signal Latency", value: "420ms", trend: "High (Mars Dist.)" }
]

const MISSION_LOGS = [
  { timestamp: "22:14:42", event: "Node-42 Sync Established", status: "SUCCESS" },
  { timestamp: "22:14:45", event: "Delta-V Correction: Atlas-V9", status: "ACTIVE" },
  { timestamp: "22:14:48", event: "Radiation Shielding: Nominal", status: "VERIFIED" }
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

function StarMapVisualizer() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-10">
       <svg width="100%" height="100%" className="w-full h-full">
          {[...Array(100)].map((_, i) => (
            <circle 
               key={i}
               cx={`${Math.random() * 100}%`} 
               cy={`${Math.random() * 100}%`} 
               r={Math.random() * 1.5} 
               fill="white"
               className="animate-pulse"
               style={{ animationDelay: `${Math.random() * 5}s` }}
            />
          ))}
          {/* Orbital Lines */}
          <circle cx="50%" cy="50%" r="20%" stroke="white" strokeWidth="0.5" fill="none" strokeDasharray="10 10" />
          <circle cx="50%" cy="50%" r="35%" stroke="white" strokeWidth="0.5" fill="none" strokeDasharray="5 5" />
          <circle cx="50%" cy="50%" r="45%" stroke="white" strokeWidth="0.5" fill="none" strokeDasharray="2 2" />
       </svg>
    </div>
  )
}

function SpaceShipModel({ progress }: { progress: any }) {
  const rotate = useTransform(progress, [0, 1], [0, 360])
  const y = useTransform(progress, [0, 1], [0, -200])

  return (
    <motion.div style={{ rotate, y }} className="relative w-64 h-64 flex items-center justify-center">
       <div className="absolute inset-0 border border-cyan-400/10 rounded-full animate-spin-slow" />
       <Rocket className="w-32 h-32 text-cyan-400/20" />
       <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="w-px h-16 bg-gradient-to-t from-cyan-400 to-transparent" />
          <span className="text-[8px] font-black text-cyan-400 uppercase tracking-widest">Traj_Sync</span>
       </div>
    </motion.div>
  )
}

/* ==========================================
   THE ORBITAL HUB - MAIN INTERFACE
   ========================================== */

export default function OrbitalHubPremium() {
  const [activeVessel, setActiveVessel] = useState(0)
  const [isEngineActive, setIsEngineActive] = useState(true)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })

  // Trajectory Scroll Effects
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.5])

  return (
    <div ref={containerRef} className="bg-[#020408] text-[#e0e8ed] font-mono selection:bg-cyan-500/30 selection:text-white min-h-screen overflow-x-hidden transition-colors duration-1000">
      
      {/* GLOBAL HUD OVERLAY */}
      <HUD_Overlay isEngineActive={isEngineActive} />

      <main>
        {/* ==========================================
            1. ORBITAL IGNITION (HERO)
            ========================================== */}
        <section className="relative h-screen flex flex-col justify-center items-center px-8 md:px-24 overflow-hidden pt-20">
          <StarMapVisualizer />
          <motion.div style={{ scale: bgScale, opacity: heroOpacity }} className="absolute z-0 pointer-events-none">
             <SpaceShipModel progress={scrollYProgress} />
          </motion.div>

          <div className="relative z-10 text-center max-w-7xl">
             <Reveal>
                <div className="inline-flex items-center gap-4 px-6 py-2 border border-cyan-400/30 bg-cyan-400/5 text-[10px] font-black uppercase tracking-[0.5em] text-cyan-400 mb-12 italic">
                   <Signal className="w-4 h-4" /> Trajectory_Lock: SECURE // DEEP_SPACE_NODE_01
                </div>
                <h1 className="text-7xl md:text-[14vw] font-black tracking-tighter uppercase mb-16 leading-[0.75] italic">
                   Orbital <br/> <span className="text-white/5 italic">Hub.</span>
                </h1>
                <p className="max-w-3xl mx-auto text-sm md:text-lg text-white/30 leading-relaxed uppercase tracking-widest font-light mb-16 italic">
                   Logistique interplanétaire de nouvelle génération. Nous gérons le flux de ressources et d'infrastructure à travers le système solaire.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                   <button className="px-12 py-6 bg-cyan-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-[0_0_40px_rgba(8,145,178,0.3)] flex items-center gap-4 italic">
                      <Navigation className="w-5 h-5" /> Plot Trajectory
                   </button>
                   <button className="px-12 py-6 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all flex items-center gap-4 italic">
                      <Database className="w-5 h-5" /> Fleet Registry
                   </button>
                </div>
             </Reveal>
          </div>

          <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end border-t border-white/5 pt-12">
             <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4 text-[9px] font-bold text-white/20 uppercase tracking-widest italic">
                   <div className="w-16 h-px bg-white/10" />
                   Station_ID: LEO-HUB-04
                </div>
                <div className="flex items-center gap-4 text-[9px] font-bold text-white/20 uppercase tracking-widest italic">
                   <div className="w-16 h-px bg-white/10" />
                   Orbital_Velocity: 7.8 km/s
                </div>
             </div>
             <div className="text-right flex flex-col items-end gap-4">
                <span className="text-[8px] font-black uppercase tracking-[0.5em] text-cyan-400">Deep_Space_Pulse</span>
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
            2. FLEET REGISTRY (DENSE TECHNICAL)
            ========================================== */}
        <section className="py-60 bg-[#04060a] relative border-y border-white/5 overflow-hidden">
           <div className="max-w-[1600px] mx-auto px-8 md:px-24">
              <div className="flex flex-col md:flex-row items-end justify-between mb-40 gap-12">
                 <Reveal>
                    <span className="text-[10px] font-black uppercase tracking-[0.6em] text-cyan-400 block mb-6 italic underline underline-offset-8 decoration-cyan-400/20">Fleet // Assets</span>
                    <h2 className="text-6xl md:text-[10vw] font-black uppercase tracking-tighter italic leading-none text-white">Vessels.</h2>
                 </Reveal>
                 <div className="text-right">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 block mb-4 italic">Registry // Orbital_Audit</span>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-400">L'Architecture de la Flotte</p>
                 </div>
              </div>

              <div className="grid md:grid-cols-3 gap-px bg-white/5 border border-white/5 shadow-2xl">
                 {FLEET_ASSETS.map((vessel, i) => (
                   <Reveal key={vessel.id} delay={i * 0.1}>
                      <div className="bg-[#020408] p-20 flex flex-col h-full hover:bg-white/[0.02] transition-all group cursor-crosshair border-white/5 border-r last:border-r-0">
                         <div className="flex justify-between items-start mb-16">
                            <div className="w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-cyan-600 group-hover:text-black transition-all duration-500">
                               <Rocket className="w-8 h-8" />
                            </div>
                            <span className={`px-4 py-2 bg-white/5 text-[9px] font-black uppercase tracking-[0.3em] ${vessel.status === "In Transit" ? "text-cyan-400" : "text-yellow-500"}`}>{vessel.status}</span>
                         </div>
                         
                         <h3 className="text-4xl font-black uppercase tracking-tighter mb-8 italic text-white group-hover:translate-x-4 transition-transform">{vessel.name}</h3>
                         <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] mb-12">{vessel.type}</div>
                         
                         <div className="space-y-8 mb-20 border-l border-cyan-400/20 pl-8">
                            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
                               <span className="text-white/20">Propulsion</span>
                               <span className="text-white group-hover:text-cyan-400 transition-colors">{vessel.propulsion}</span>
                            </div>
                            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
                               <span className="text-white/20">Delta-V</span>
                               <span className="text-white group-hover:text-cyan-400 transition-colors">{vessel.delta_v}</span>
                            </div>
                            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
                               <span className="text-white/20">Payload</span>
                               <span className="text-white group-hover:text-cyan-400 transition-colors">{vessel.payload}</span>
                            </div>
                         </div>

                         <div className="flex items-center gap-4 text-[10px] font-black text-cyan-400/40 uppercase tracking-widest italic mb-16">
                            <Target className="w-4 h-4" /> Destination: {vessel.destination}
                         </div>

                         <div className="mt-auto pt-10 border-t border-white/5 flex justify-between items-center">
                            <span className="text-[10px] font-black text-white/10 uppercase tracking-widest">Ref: {vessel.id}</span>
                            <button className="text-[10px] font-black uppercase text-white/40 flex items-center gap-4 group-hover:text-white transition-all">
                               Telemetry_Link <ChevronRight className="w-5 h-5" />
                            </button>
                         </div>
                      </div>
                   </Reveal>
                 ))}
              </div>
           </div>
        </section>

        {/* ==========================================
            3. ORBITAL TELEMETRY (INTERACTIVE DATA)
            ========================================== */}
        <section className="py-60 bg-black relative border-y border-white/5 overflow-hidden">
           <div className="max-w-[1400px] mx-auto px-8 md:px-24">
              <div className="grid lg:grid-cols-2 gap-40 items-center">
                 <div>
                    <Reveal>
                       <span className="text-[10px] font-black uppercase tracking-[0.5em] text-cyan-400 block mb-12 italic underline underline-offset-8 decoration-cyan-400/20">Telemetry // Stream</span>
                       <h2 className="text-7xl md:text-[9vw] font-light italic leading-none text-white mb-16 uppercase tracking-tighter">
                          The <br/> <span className="not-italic font-black text-white/5 italic">Mission_Link.</span>
                       </h2>
                       <p className="text-2xl font-light text-white/20 leading-relaxed mb-24 italic uppercase tracking-[0.2em] max-w-xl">
                          Surveillance de la flotte en temps réel. Nos réseaux de communication Deep Space assurent une connectivité continue, même lors des transits interplanétaires les plus longs.
                       </p>
                       <div className="grid grid-cols-2 gap-px bg-white/5 border border-white/5 mb-24 shadow-2xl">
                          {ORBITAL_METRICS.map((metric, i) => (
                            <div key={i} className="p-16 bg-[#040608] group hover:bg-white/[0.02] transition-all border-r border-b last:border-r-0 border-white/5">
                               <div className="text-[10px] font-black uppercase text-cyan-400 mb-6 tracking-[0.4em]">{metric.label}</div>
                               <div className="text-5xl font-black text-white italic mb-6 tracking-tighter group-hover:translate-x-4 transition-transform">{metric.value}</div>
                               <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.3em] text-white/10 italic">
                                  <Activity className="w-4 h-4 text-cyan-400" /> {metric.trend}
                               </div>
                            </div>
                          ))}
                       </div>
                       <button 
                         onClick={() => setIsEngineActive(!isEngineActive)}
                         className="w-full py-8 bg-cyan-600 text-white text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-2xl flex items-center justify-center gap-6 italic"
                       >
                          <Settings className="w-5 h-5" /> Re-Sync Mission Nodes
                       </button>
                    </Reveal>
                 </div>
                 
                 <div className="relative">
                    <Reveal delay={0.3} x={40}>
                       <div className="aspect-square bg-[#040608] border border-white/10 p-20 flex flex-col justify-between relative group overflow-hidden shadow-2xl">
                          <div className="absolute top-0 right-0 p-80 bg-cyan-400 opacity-[0.02] blur-[150px] rounded-full group-hover:opacity-[0.05] transition-opacity" />
                          
                          <div className="flex justify-between items-start z-10">
                             <div className="flex flex-col gap-3">
                                <span className="text-[10px] font-black text-white/10 uppercase tracking-[0.5em]">Orbit_Link // STATION-SYNC-v12</span>
                                <span className="text-[12px] font-black text-white/40 uppercase tracking-[0.6em]">Trajectory_Map_01</span>
                             </div>
                             <Wifi className="w-6 h-6 text-cyan-400" />
                          </div>
                          
                          {/* ORBITAL VISUALIZER (SVG) */}
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
                                <Globe className={`w-24 h-24 transition-colors duration-1000 ${isEngineActive ? "text-cyan-400 animate-pulse" : "text-white/5"}`} />
                             </div>
                             <div className="mt-16 text-center space-y-6">
                                <div className={`text-4xl font-black italic tracking-tighter ${isEngineActive ? "text-white" : "text-white/20"}`}>
                                   {isEngineActive ? "LINK_STABLE" : "LINK_LOST"}
                                </div>
                                <span className="text-[11px] font-bold text-white/10 uppercase tracking-[0.6em] block">Auth_Node: EARTH_RELAY_04</span>
                             </div>
                          </div>

                          <div className="relative z-10 flex gap-6">
                             <div className="flex-1 h-1 bg-white/5 overflow-hidden">
                                <motion.div 
                                   animate={isEngineActive ? { x: ["-100%", "100%"] } : {}}
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
            4. MISSION STORYTELLING (TECH STORYTELLING)
            ========================================== */}
        <section className="py-60 bg-[#020408] relative overflow-hidden border-t border-white/5">
           <div className="max-w-[1400px] mx-auto px-8 md:px-24">
              <div className="grid lg:grid-cols-2 gap-40 items-center">
                 <div className="relative aspect-[3/4] overflow-hidden group border border-white/5 shadow-2xl">
                    <Image 
                       src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1200&auto=format&fit=crop" 
                       alt="Earth from Space" 
                       fill 
                       className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2000ms]"
                    />
                    <div className="absolute inset-0 bg-cyan-900/10 mix-blend-color group-hover:opacity-0 transition-opacity" />
                    <div className="absolute inset-0 p-20 flex flex-col justify-end bg-gradient-to-t from-black via-black/40 to-transparent">
                       <div className="text-white">
                          <span className="text-[11px] font-black uppercase tracking-[0.6em] text-cyan-400 mb-8 block italic underline underline-offset-8 decoration-cyan-400/20">Orbital // Heritage // Unit</span>
                          <h4 className="text-6xl font-black tracking-tighter uppercase italic mb-12 mix-blend-difference text-white">Stellar <br/> Frontier.</h4>
                          <button className="flex items-center gap-6 text-[11px] font-black uppercase tracking-[0.4em] border-b border-white/20 pb-4 hover:border-cyan-400 transition-all group">
                             Launch Protocols <ExternalLink className="w-5 h-5 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                          </button>
                       </div>
                    </div>
                 </div>

                 <div>
                    <Reveal>
                       <div className="mb-24 text-left">
                          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-cyan-400 mb-8 block italic">Chapitre III // Logistics</span>
                          <h2 className="text-7xl md:text-[10vw] font-black tracking-tighter uppercase text-white italic leading-none text-white">Deep_Step.</h2>
                       </div>
                       <p className="text-2xl font-light text-white/20 leading-relaxed italic mb-20 uppercase tracking-[0.2em]">
                          L'espace n'est plus une frontière, c'est une autoroute logistique. Nous gérons chaque kilo envoyé vers les étoiles avec une précision chirurgicale.
                       </p>
                       <div className="space-y-20">
                          {[
                            { t: "Propellant Integrity", d: "Gestion avancée des stocks de carburant nucléaire et ionique à travers les stations-relais." },
                            { t: "Trajectory Mastery", d: "Calculs d'orbites de transfert optimisés par IA pour minimiser le delta-V et maximiser la charge utile." },
                            { t: "Radiation Shielding", d: "Protocoles de protection magnétique actifs pour garantir l'intégrité des cargaisons sensibles." }
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
                      <Satellite className="w-10 h-10 text-black" />
                    </div>
                    <span className="text-4xl font-black uppercase tracking-tighter italic">ORBITAL<span className="text-white/20">HUB.</span></span>
                 </div>
                 <p className="text-white/20 text-[11px] font-black uppercase tracking-[0.5em] leading-loose max-w-sm mb-20 italic">
                    "La logistique du futur commence ici." — Archive Orbital V.42
                 </p>
                 <div className="flex gap-16">
                    {["MissionLog", "FleetRegistry", "GitHub", "X_Protocol"].map(s => (
                      <Link key={s} href="#" className="text-[11px] font-black uppercase tracking-widest text-white/20 hover:text-cyan-400 transition-colors italic underline underline-offset-8 decoration-white/5">{s}</Link>
                    ))}
                 </div>
              </div>

              {[
                { t: "VESSELS", l: ["Atlas Heavy", "Ion Scout", "Lander Probe", "Cargo Shell"] },
                { t: "LOGISTICS", l: ["Trajectory Plot", "Fueling Hub", "Cargo Manifest", "SLA Reports"] },
                { t: "ENTITY", l: ["Our Legacy", "Sustainability", "Locations", "Support"] }
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
              <span>© 2026 ORBITAL HUB SPACE LOGISTICS SA. // ALL_RIGHTS_RESERVED</span>
              <div className="flex gap-16">
                 <span>STATUS: NOMINAL</span>
                 <span>DELTA-V: 14.2 km/s (AVG)</span>
                 <span>v4.42.0-STABLE</span>
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

function HUD_Overlay({ isEngineActive }: { isEngineActive: boolean }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
       {/* Corner Brackets */}
       <div className={`absolute top-12 left-12 w-20 h-20 border-t-2 border-l-2 transition-colors duration-1000 ${isEngineActive ? "border-cyan-400" : "border-white/10"}`} />
       <div className={`absolute top-12 right-12 w-20 h-20 border-t-2 border-r-2 transition-colors duration-1000 ${isEngineActive ? "border-cyan-400" : "border-white/10"}`} />
       <div className={`absolute bottom-12 left-12 w-20 h-20 border-b-2 border-l-2 transition-colors duration-1000 ${isEngineActive ? "border-cyan-400" : "border-white/10"}`} />
       <div className={`absolute bottom-12 right-12 w-20 h-20 border-b-2 border-r-2 transition-colors duration-1000 ${isEngineActive ? "border-cyan-400" : "border-white/10"}`} />

       {/* Top Status Bar */}
       <div className="absolute top-12 left-1/2 -translate-x-1/2 flex items-center gap-20 bg-black/60 backdrop-blur-2xl px-12 py-4 border border-white/10 rounded-none">
          <div className="flex items-center gap-6 text-white">
             <div className={`w-3 h-3 transition-colors duration-500 ${isEngineActive ? "bg-cyan-400 animate-pulse" : "bg-red-500 animate-ping"}`} />
             <span className="text-[10px] font-black uppercase tracking-[0.4em] italic leading-none">Mission_Sync: {isEngineActive ? "NOMINAL" : "SYNC_LOST"} // Status: ACTIVE</span>
          </div>
          <div className="h-4 w-px bg-white/20" />
          <div className="flex items-center gap-6 text-white/20">
             <Wifi className="w-4 h-4" /> 
             <span className="text-[10px] font-black uppercase tracking-[0.4em] italic leading-none">Global_Relay: SECURE</span>
          </div>
       </div>

       {/* Right Rotation Info */}
       <div className="absolute right-12 top-1/2 -translate-y-1/2 rotate-90 origin-right hidden lg:block">
          <span className="text-[10px] font-black uppercase tracking-[0.8em] text-white/5 italic">Unauthorized_Duplication_Of_Orbital_Patterns_Is_Strictly_Monitored_By_Global_Space_Alliance</span>
       </div>
    </div>
  )
}
