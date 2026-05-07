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
  Flame, Zap, Activity, Thermometer, 
  Droplets, Wind, Mountain, Compass, 
  ArrowRight, Menu, X, Plus, 
  Maximize2, Share2, Download, ExternalLink, 
  Archive, Hash, Wifi, BarChart3, 
  Microscope, Fingerprint, Scan, Brain,
  Layers, Frame, Box, Database, 
  Server, Cpu, Target, ShieldCheck, 
  Gauge, Timer, Orbit, Atom, 
  Satellite, Milestone, Power, Settings,
  AlertTriangle, Info, ChevronRight, Play,
  Lock, Key, BookOpen, PenTool, Radio
} from "lucide-react"

/* ==========================================================================
   VOLCANIC CORE DATASET (ULTRA DENSITY)
   ========================================================================== */

const EXTRACTION_SITES = [
  {
    id: "site-iceland-01",
    name: "Reykjanes Breach",
    depth: "4,500m",
    temp: "420°C",
    output: "1.2 GW",
    geology: "Basaltic Crust",
    status: "Optimal"
  },
  {
    id: "site-java-04",
    name: "Mount Merapi Node",
    depth: "6,200m",
    temp: "580°C",
    output: "2.4 GW",
    geology: "Andesitic Strata",
    status: "Active"
  },
  {
    id: "site-andes-09",
    name: "Cotopaxi Vent",
    depth: "3,800m",
    temp: "390°C",
    output: "0.8 GW",
    geology: "Rhyolitic Formation",
    status: "Maintenance"
  }
]

const THERMAL_METRICS = [
  { label: "Core Temperature", value: "1,200°C", trend: "Rising" },
  { label: "Vapor Pressure", value: "220 bar", trend: "Stable" },
  { label: "Seismic Activity", value: "1.2 Mw", trend: "Minimal" },
  { label: "Grid Efficiency", value: "98.4%", trend: "Optimal" }
]

const ENERGY_LOGS = [
  { timestamp: "08:42:12", event: "Thermal Siphon Synchronized", status: "SECURE" },
  { timestamp: "08:42:15", event: "Turbine A-4 Speed: 3600 RPM", status: "STABLE" },
  { timestamp: "08:42:18", event: "Output Flux: +4.2%", status: "OPTIMIZING" }
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

function SeismicLine() {
  return (
    <div className="flex gap-1 h-12 items-end opacity-20">
       {[...Array(24)].map((_, i) => (
         <motion.div 
            key={i}
            animate={{ height: ["10%", "100%", "30%", "70%", "10%"] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.05 }}
            className="w-1 bg-[#ff4d00]"
         />
       ))}
    </div>
  )
}

/* ==========================================================================
   THE VOLCANIC CORE - MAIN INTERFACE
   ========================================================================== */

export default function VolcanicCorePremium() {
  const [activeSite, setActiveSite] = useState(0)
  const [powerActive, setPowerActive] = useState(false)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })

  // Thermal Gradient Effects
  const bgColor = useTransform(scrollYProgress, [0, 0.5, 1], ["#050505", "#1a0800", "#330f00"])
  const drillDepth = useTransform(scrollYProgress, [0, 1], [0, 10000])
  const drillTemp = useTransform(scrollYProgress, [0, 1], [20, 1200])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  return (
    <motion.div 
      ref={containerRef} 
      style={{ backgroundColor: bgColor }}
      className="text-[#e0e2e5] font-mono selection:bg-[#ff4d00]/30 selection:text-white min-h-screen overflow-x-hidden transition-colors duration-1000"
    >
      
      {/* GLOBAL HUD OVERLAY */}
      <HUD_Overlay />

      {/* ==========================================
          1. THERMAL IGNITION (HERO)
          ========================================== */}
      <section className="relative h-screen flex flex-col justify-center items-center px-8 md:px-24 overflow-hidden pt-20">
        {/* Background Heat Ripple */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,#ff4d0008_1px,transparent_1px)] bg-[size:60px_60px]" />
        
        <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
           <div className="w-[90vw] h-[90vw] border border-[#ff4d0010] rounded-full animate-spin-slow" />
           <div className="absolute w-[70vw] h-[70vw] border border-[#ff4d0005] rounded-full animate-reverse-spin" />
           <div className="absolute w-1/2 h-1/2 bg-[#ff4d0005] blur-[150px] rounded-full animate-pulse" />
        </motion.div>

        <div className="relative z-10 text-center max-w-7xl">
           <Reveal>
              <div className="inline-flex items-center gap-4 px-4 py-1 border border-[#ff4d0030] bg-[#ff4d0005] text-[10px] font-black uppercase tracking-[0.5em] text-[#ff4d00] mb-12 italic">
                 <Flame className="w-3 h-3" /> Core_Status: Critical_Heat_Flux
              </div>
              <h1 className="text-7xl md:text-[14vw] font-black tracking-tighter uppercase mb-16 leading-[0.75] italic">
                Volcanic <br/> <span className="text-white/5 italic">Energy.</span>
              </h1>
              <p className="max-w-2xl mx-auto text-sm md:text-base text-white/30 leading-relaxed uppercase tracking-widest font-light mb-16 italic">
                 Ingénierie géothermique de profondeur extrême. Nous exploitons l'énergie primaire de la Terre pour alimenter le futur sans émission.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                 <button className="px-12 py-5 bg-[#ff4d00] text-black text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_40px_rgba(255,77,0,0.3)] flex items-center gap-4">
                    <Power className="w-4 h-4" /> Initialize Drill
                 </button>
                 <button className="px-12 py-5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all flex items-center gap-4">
                    <Database className="w-4 h-4" /> Geological Archives
                 </button>
              </div>
           </Reveal>
        </div>

        {/* DEPTH METRICS */}
        <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end border-t border-white/5 pt-8">
           <div className="flex flex-col gap-4 text-left">
              <span className="text-[8px] font-black uppercase tracking-[0.5em] text-white/20 italic">Live_Borehole_Visualizer</span>
              <div className="flex items-center gap-8">
                 <div className="flex flex-col">
                    <motion.span className="text-4xl font-black italic text-[#ff4d00] leading-none">
                       {useSpring(drillDepth, { stiffness: 50 }).get().toFixed(0)}m
                    </motion.span>
                    <span className="text-[8px] font-black uppercase text-white/20 italic">Current Depth</span>
                 </div>
                 <div className="w-px h-12 bg-white/10" />
                 <div className="flex flex-col">
                    <motion.span className="text-4xl font-black italic text-[#ff4d00] leading-none">
                       {useSpring(drillTemp, { stiffness: 50 }).get().toFixed(0)}°C
                    </motion.span>
                    <span className="text-[8px] font-black uppercase text-white/20 italic">Internal Temp</span>
                 </div>
              </div>
           </div>
           <div className="text-right flex flex-col items-end gap-2">
              <span className="text-[8px] font-black uppercase tracking-[0.5em] text-[#ff4d00]">Seismic_Activity_Monitor</span>
              <SeismicLine />
           </div>
        </div>
      </section>

      {/* ==========================================
          2. EXTRACTION MATRIX (DENSE GRID)
          ========================================== */}
      <section className="py-60 bg-black/40 relative border-y border-white/5 overflow-hidden">
         <div className="max-w-[1600px] mx-auto px-8 md:px-24">
            <div className="flex flex-col md:flex-row items-end justify-between mb-40 gap-12">
               <Reveal>
                  <span className="text-[10px] font-black uppercase tracking-[0.6em] text-[#ff4d00] block mb-6 italic underline underline-offset-8">Geothermal // Sites</span>
                  <h2 className="text-6xl md:text-[9vw] font-black uppercase tracking-tighter italic leading-none">Extraction.</h2>
               </Reveal>
               <div className="text-right">
                  <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 block mb-4 italic">Registry // Global_Network</span>
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#ff4d00]">L'Architecture de la Terre</p>
               </div>
            </div>

            <div className="grid md:grid-cols-3 gap-px bg-white/5 border border-white/5">
               {EXTRACTION_SITES.map((site, i) => (
                 <Reveal key={site.id} delay={i * 0.1}>
                    <div className="bg-[#050505] p-16 flex flex-col h-full hover:bg-white/5 transition-all group cursor-crosshair">
                       <div className="flex justify-between items-start mb-16">
                          <div className="w-12 h-12 bg-white/5 flex items-center justify-center group-hover:bg-[#ff4d00] transition-all duration-500">
                             <Mountain className="w-6 h-6 text-[#ff4d00] group-hover:text-black" />
                          </div>
                          <span className="px-3 py-1 bg-[#ff4d0010] text-[#ff4d00] text-[8px] font-black uppercase tracking-widest">{site.status}</span>
                       </div>
                       
                       <h3 className="text-4xl font-black uppercase tracking-tighter mb-8 italic">{site.name}</h3>
                       <div className="text-[10px] font-black text-[#ff4d00]/60 uppercase tracking-widest mb-8">{site.geology}</div>
                       
                       <div className="space-y-6 mb-16 border-l border-[#ff4d0020] pl-6">
                          <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                             <span className="text-white/20">Depth</span>
                             <span className="text-white group-hover:text-[#ff4d00] transition-colors">{site.depth}</span>
                          </div>
                          <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                             <span className="text-white/20">Temperature</span>
                             <span className="text-white group-hover:text-[#ff4d00] transition-colors">{site.temp}</span>
                          </div>
                          <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                             <span className="text-white/20">Net Output</span>
                             <span className="text-white group-hover:text-[#ff4d00] transition-colors">{site.output}</span>
                          </div>
                       </div>

                       <div className="mt-auto flex justify-between items-center pt-8 border-t border-white/5">
                          <div className="flex items-center gap-3">
                             <Hash className="w-4 h-4 text-white/20" />
                             <span className="text-[9px] font-black uppercase tracking-widest text-white/40">Node_ID: {site.id}</span>
                          </div>
                          <ChevronRight className="w-6 h-6 text-white/10 group-hover:text-[#ff4d00] group-hover:translate-x-2 transition-all" />
                       </div>
                    </div>
                 </Reveal>
               ))}
            </div>
         </div>
      </section>

      {/* ==========================================
          3. POWER CONVERSION (INTERACTIVE)
          ========================================== */}
      <section className="py-60 bg-black/60 relative border-y border-white/5 overflow-hidden">
         <div className="max-w-[1400px] mx-auto px-8 md:px-24">
            <div className="grid lg:grid-cols-2 gap-32 items-center">
               <div>
                  <Reveal>
                     <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#ff4d00] block mb-12 italic underline underline-offset-8">Advanced // Conversion_Cycle</span>
                     <h2 className="text-6xl md:text-[8vw] font-light italic leading-none text-white mb-12 uppercase tracking-tighter">
                        The <br/> <span className="not-italic font-black text-white/5 italic">Primary_Power.</span>
                     </h2>
                     <p className="text-xl font-light text-white/20 leading-relaxed mb-20 italic uppercase tracking-widest">
                        Conversion thermodynamique à cycle binaire. Nous transformons la chaleur extrême du magma en une électricité stable et propre, alimentant des métropoles entières.
                     </p>
                     <div className="grid grid-cols-2 gap-8 mb-20">
                        {THERMAL_METRICS.map((stat, i) => (
                          <div key={i} className="p-10 bg-black/40 border border-[#ff4d0010] group hover:border-[#ff4d0030] transition-all">
                             <div className="text-[9px] font-black uppercase text-[#ff4d00] mb-4 tracking-[0.3em]">{stat.label}</div>
                             <div className="text-4xl font-light text-white italic">{stat.value}</div>
                             <div className="flex items-center gap-2 text-[8px] font-bold uppercase tracking-widest text-white/20 italic">
                                <Activity className="w-3 h-3" /> {stat.trend}
                             </div>
                          </div>
                        ))}
                     </div>
                     <button 
                      onClick={() => setPowerActive(!powerActive)}
                      className="w-full py-6 bg-[#ff4d00] text-black text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-2xl flex items-center justify-center gap-4"
                     >
                        <Power className="w-4 h-4" /> Toggle Heat Siphon
                     </button>
                  </Reveal>
               </div>
               
               <div className="relative">
                  <Reveal delay={0.3} x={40}>
                     <div className="aspect-square bg-black border border-white/10 p-16 flex flex-col justify-between relative group overflow-hidden">
                        <div className="absolute top-0 right-0 p-60 bg-[#ff4d00] opacity-[0.03] blur-[120px] rounded-full group-hover:opacity-[0.1] transition-opacity" />
                        
                        <div className="flex justify-between items-start z-10">
                           <div className="flex flex-col gap-2">
                              <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">System_ID // THERMAL-SYNC-v4</span>
                              <span className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Turbine_Flow_Analysis</span>
                           </div>
                           <Wifi className="w-5 h-5 text-[#ff4d00]" />
                        </div>
                        
                        <div className="relative z-10 flex flex-col items-center gap-12">
                           <div className="w-32 h-32 border-2 border-dashed border-[#ff4d0020] rounded-full flex items-center justify-center relative">
                              <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 border-t-2 border-[#ff4d00] rounded-full" 
                              />
                              <Atom className="w-12 h-12 text-[#ff4d00]" />
                           </div>
                           <div className="text-center space-y-4">
                              <div className={`text-4xl font-black italic tracking-tighter ${powerActive ? "text-[#ff4d00] animate-pulse" : "text-white/20"}`}>
                                 {powerActive ? "SIPHON_ACTIVE" : "STANDBY"}
                              </div>
                              <span className="text-[9px] font-bold text-white/10 uppercase tracking-[0.5em]">Auth_Node: ICELAND_CORE_RELAY</span>
                           </div>
                        </div>

                        <div className="relative z-10 flex gap-4">
                           <div className="flex-1 h-1 bg-white/5 overflow-hidden">
                              <motion.div 
                                animate={powerActive ? { x: ["-100%", "100%"] } : {}}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                className="w-1/2 h-full bg-[#ff4d00]"
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
          4. SEISMIC SAFETY (TECH STORYTELLING)
          ========================================== */}
      <section className="py-60 relative overflow-hidden">
         <div className="max-w-[1400px] mx-auto px-8 md:px-24">
            <div className="grid lg:grid-cols-2 gap-32 items-center">
               <div className="relative aspect-[4/5] overflow-hidden group border border-white/10 shadow-2xl">
                  <Image 
                     src="https://images.unsplash.com/photo-1518005020250-ee29de9d282e?q=80&w=1200&auto=format&fit=crop" 
                     alt="Magma Texture" 
                     fill 
                     className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-[#ff4d0020] mix-blend-color group-hover:opacity-0 transition-opacity" />
                  <div className="absolute inset-0 p-16 flex flex-col justify-end bg-gradient-to-t from-black via-black/40 to-transparent">
                     <div className="text-white">
                        <span className="text-[10px] font-black uppercase tracking-[0.6em] text-[#ff4d00] mb-6 block italic underline underline-offset-8">Critical // Seismic // Audit</span>
                        <h4 className="text-5xl font-black tracking-tighter uppercase italic mb-8">Structural <br/> Core Integrity.</h4>
                        <button className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest border-b border-[#ff4d00] pb-2">
                           Safety Protocols <ExternalLink className="w-4 h-4" />
                        </button>
                     </div>
                  </div>
               </div>

               <div>
                  <Reveal>
                     <div className="mb-24">
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#ff4d00] mb-8 block italic">Chapitre III // Safety</span>
                        <h2 className="text-6xl md:text-[8vw] font-black tracking-tighter uppercase text-white italic leading-none">Safe_Duct.</h2>
                     </div>
                     <p className="text-xl font-light text-white/30 leading-relaxed italic mb-16 uppercase tracking-widest">
                        L'extraction géothermique profonde exige une surveillance sismologique absolue. Nos capteurs nanométriques détectent les micro-fractures avant même qu'elles n'apparaissent.
                     </p>
                     <div className="space-y-16">
                        {[
                          { t: "Tectonic Locking", d: "Stabilisation hydrostatique des zones de faille pour prévenir tout déclenchement sismique accidentel." },
                          { t: "Pressure Shielding", d: "Revêtements de forage en titane-céramique capables de résister à des pressions de plus de 1000 bar." },
                          { t: "Predictive Shutdown", d: "Algorithmes d'IA coupant instantanément le flux en cas de divergence thermique anormale." }
                        ].map((step, i) => (
                          <div key={i} className="group flex gap-12 border-b border-white/5 pb-12 hover:border-[#ff4d0030] transition-all cursor-default">
                             <div className="text-5xl font-black text-white/5 group-hover:text-[#ff4d0020] transition-colors italic">0{i+1}</div>
                             <div>
                                <h5 className="text-2xl font-bold uppercase tracking-tight text-white mb-4 italic group-hover:text-[#ff4d00] transition-colors">{step.t}</h5>
                                <p className="text-[10px] text-white/20 uppercase tracking-[0.2em] font-bold leading-relaxed">{step.d}</p>
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
                  <div className="w-12 h-12 bg-[#ff4d00] flex items-center justify-center">
                    <Flame className="w-8 h-8 text-black" />
                  </div>
                  <span className="text-3xl font-black uppercase tracking-tighter italic">VOLCANIC<span className="text-[#ff4d00]">_CORE.</span></span>
               </div>
               <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.4em] leading-loose max-w-sm mb-16 italic">
                  "L'énergie est sous nos pieds, nous avons juste appris à l'écouter." — Archive Volcanic V.4
               </p>
               <div className="flex gap-12">
                  {["EnergyLog", "ThermalRegistry", "GitHub", "X_Protocol"].map(s => (
                    <Link key={s} href="#" className="text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-[#ff4d00] transition-colors italic">{s}</Link>
                  ))}
               </div>
            </div>

            {[
              { t: "EXTRACTION", l: ["Borehole Tech", "Magma Siphons", "Binary Cycles", "Coolant Systems"] },
              { t: "GEOLOGY", l: ["Seismic Monitoring", "Strata Mapping", "Crustal Audit", "Plate Dynamics"] },
              { t: "FACILITIES", l: ["Reykjanes Hub", "Andes Node", "Java Vent", "Global Command"] }
            ].map((col, i) => (
              <div key={i} className="flex flex-col gap-12">
                <h4 className="text-[10px] font-black text-[#ff4d00] uppercase tracking-[0.5em] italic">{col.t}</h4>
                <ul className="flex flex-col gap-6">
                  {col.l.map(link => (
                    <li key={link} className="text-[10px] font-bold text-white/20 hover:text-white transition-colors cursor-pointer uppercase tracking-widest italic">{link}</li>
                  ))}
                </ul>
              </div>
            ))}
         </div>

         <div className="max-w-[1600px] mx-auto border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-12 text-[8px] font-black text-white/10 uppercase tracking-[0.4em] italic">
            <span>© 2026 VOLCANIC CORE HEAVY ENERGY INDUSTRIES AG. // ALL_RIGHTS_RESERVED</span>
            <div className="flex gap-12">
               <span>STATUS: GEOTHERMAL_OPTIMAL</span>
               <span>GRID_LOAD: 42.4 GW</span>
               <span>v4.2.0-STABLE</span>
            </div>
         </div>
      </footer>
    </div>
  )
}

/* ==========================================
   TECHNICAL SUB-COMPONENTS
   ========================================== */

function HUD_Overlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
       {/* Corner Brackets */}
       <div className="absolute top-12 left-12 w-16 h-16 border-t border-l border-white/10" />
       <div className="absolute top-12 right-12 w-16 h-16 border-t border-r border-white/10" />
       <div className="absolute bottom-12 left-12 w-16 h-16 border-b border-l border-white/10" />
       <div className="absolute bottom-12 right-12 w-16 h-16 border-b border-r border-white/10" />

       {/* Top Status Bar */}
       <div className="absolute top-12 left-1/2 -translate-x-1/2 flex items-center gap-16 bg-black/40 backdrop-blur-md px-10 py-3 border border-white/5 rounded-full">
          <div className="flex items-center gap-4">
             <div className="w-2 h-2 rounded-full bg-[#ff4d00] animate-pulse" />
             <span className="text-[9px] font-black text-white/60 uppercase tracking-[0.2em]">Extraction_Active: Depth_Locked</span>
          </div>
          <div className="h-4 w-px bg-white/10" />
          <div className="flex items-center gap-4 text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">
             <Wifi className="w-3 h-3" /> Earth_Relay: Secure
          </div>
       </div>

       {/* Right Rotation Info */}
       <div className="absolute right-12 top-1/2 -translate-y-1/2 rotate-90 origin-right hidden lg:block">
          <span className="text-[8px] font-black uppercase tracking-[0.6em] text-white/5 italic">Unauthorized_Drilling_Beyond_Crustal_Boundary_Is_Strictly_Monitored_By_Global_Energy_Council</span>
       </div>
    </div>
  )
}
