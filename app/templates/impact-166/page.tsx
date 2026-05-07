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
  Thermometer, Shield, Zap, Activity, 
  ShieldCheck, Eye, Terminal, Lock, 
  Key, Eye as EyeIcon, Settings, Power, 
  Info, AlertTriangle, ChevronRight, 
  ArrowRight, Share2, Maximize2, 
  Download, ExternalLink, Archive, 
  Hash, Wifi, BarChart3, Microscope, 
  Fingerprint, Scan, Layers, Frame, 
  Box, Target, Orbit, Atom, Satellite, 
  Milestone, Gauge, Timer, Cloud, 
  Signal, Search, Navigation, Code, 
  Command, Grid, Radar, Lightbulb, 
  User, Heart, Dna, Snowflake, Droplet, 
  Wind, Ghost, FlaskConical, FlaskRound
} from "lucide-react"

/* ==========================================================================
   THE CRYO-RESERVE DATASET (ULTRA DENSITY)
   ========================================================================== */

const STASIS_SUBJECTS = [
  {
    id: "subject-h-42",
    name: "Human Prototype Alpha",
    category: "Biological",
    temp: "-196.2°C",
    vitrification: "99.98%",
    stasis_time: "4,242 Days",
    integrity: "Optimal",
    desc: "Premier sujet humain en conservation cryogénique complète. Paramètres neurologiques stabilisés à 0.001% d'activité.",
    status: "Stable"
  },
  {
    id: "subject-b-09",
    name: "Extinct Flora-Bank",
    category: "Botanical Heritage",
    temp: "-188.4°C",
    vitrification: "98.42%",
    stasis_time: "12,800 Days",
    integrity: "Nominal",
    desc: "Banque génétique de 1,200 espèces végétales disparues au 21ème siècle. Prêt pour une éventuelle réanimation.",
    status: "Secured"
  },
  {
    id: "subject-g-15",
    name: "Archeo-Genome X",
    category: "Genomic Library",
    temp: "-192.0°C",
    vitrification: "100%",
    stasis_time: "1,200 Days",
    integrity: "Cryo-Locked",
    desc: "Séquençage et conservation physique d'ADN ancien pour la reconstruction de la biodiversité primitive.",
    status: "Encrypted"
  }
]

const THERMAL_METRICS = [
  { label: "Cooling Load", value: "420 kW", trend: "Steady" },
  { label: "Nitrogen Reserves", value: "94.2%", trend: "Refilled" },
  { label: "Vitrification Avg.", value: "99.92%", trend: "High" },
  { label: "SLA Uptime", value: "100.00%", trend: "Infinite" }
]

const CHAMBER_LOGS = [
  { timestamp: "04:12:42", sensor: "Vault-A1", status: "NOMINAL", temp: "-196.21°C" },
  { timestamp: "04:12:45", sensor: "Perfusion-Z", status: "STABLE", flow: "0.2ml/s" },
  { timestamp: "04:12:48", sensor: "Safety-Core", status: "ACTIVE", level: "MAX" }
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

function FrostOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[100] opacity-20">
       <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white via-white/5 to-transparent blur-3xl" />
       <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white via-white/5 to-transparent blur-3xl" />
       <div className="absolute top-0 left-0 h-full w-32 bg-gradient-to-r from-white via-white/5 to-transparent blur-3xl" />
       <div className="absolute top-0 right-0 h-full w-32 bg-gradient-to-l from-white via-white/5 to-transparent blur-3xl" />
    </div>
  )
}

function CryoPodVisualizer({ progress }: { progress: any }) {
  const rotate = useTransform(progress, [0, 1], [0, 360])
  const scale = useTransform(progress, [0, 0.5, 1], [1, 1.1, 1])
  const opacity = useTransform(progress, [0, 0.2], [1, 0.2])

  return (
    <motion.div style={{ rotate, scale, opacity }} className="relative w-80 h-80 flex items-center justify-center">
       <div className="absolute inset-0 border-[2px] border-white/10 rounded-full animate-spin-slow shadow-[0_0_80px_rgba(255,255,255,0.05)]" />
       <Snowflake className="w-40 h-40 text-white/5 animate-pulse" />
       <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[120%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-45" />
          <div className="w-[120%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent -rotate-45" />
       </div>
    </motion.div>
  )
}

/* ==========================================
   THE CRYO-RESERVE - MAIN INTERFACE
   ========================================== */

export default function CryoReservePremium() {
  const [activeSubject, setActiveSubject] = useState(0)
  const [isPerfusionActive, setIsPerfusionActive] = useState(true)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })

  // Thermal Scroll Effects
  const frostOpacity = useTransform(scrollYProgress, [0, 0.5], [0.1, 1])
  const chamberScale = useTransform(scrollYProgress, [0, 1], [1, 1.3])

  return (
    <div ref={containerRef} className="bg-[#050505] text-[#e0e5ea] font-mono selection:bg-white/10 selection:text-white min-h-screen overflow-x-hidden transition-colors duration-1000">
      
      {/* GLOBAL FROST OVERLAY */}
      <FrostOverlay />
      <HUD_Overlay isPerfusionActive={isPerfusionActive} />

      <main>
        {/* ==========================================
            1. FROZEN IGNITION (HERO)
            ========================================== */}
        <section className="relative h-screen flex flex-col justify-center items-center px-8 md:px-24 overflow-hidden pt-20">
          <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,#ffffff05_1px,transparent_1px)] bg-[size:50px_50px]" />
          
          <div className="absolute z-0 pointer-events-none flex items-center justify-center">
             <CryoPodVisualizer progress={scrollYProgress} />
          </div>

          <div className="relative z-10 text-center max-w-7xl">
             <Reveal>
                <div className="inline-flex items-center gap-4 px-6 py-2 border border-white/20 bg-white/5 text-[10px] font-black uppercase tracking-[0.5em] text-white/60 mb-12 italic">
                   <Thermometer className="w-4 h-4" /> Thermal_SLA: -196.2°C // Vault_Secure
                </div>
                <h1 className="text-7xl md:text-[14vw] font-black tracking-tighter uppercase mb-16 leading-[0.75] italic">
                   Cryo <br/> <span className="text-white/5 italic">Reserve.</span>
                </h1>
                <p className="max-w-3xl mx-auto text-sm md:text-lg text-white/20 leading-relaxed uppercase tracking-widest font-light mb-16 italic">
                   La préservation éternelle par la science moléculaire. Nous suspendons le temps pour protéger l'héritage biologique de l'humanité.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                   <button className="px-12 py-6 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white border border-transparent hover:border-white/20 transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)] flex items-center gap-4 italic">
                      <Lock className="w-5 h-5" /> Initialize Stasis
                   </button>
                   <button className="px-12 py-6 border border-white/10 text-white/60 text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all flex items-center gap-4 italic">
                      <Archive className="w-5 h-5" /> Archive Registry
                   </button>
                </div>
             </Reveal>
          </div>

          <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end border-t border-white/5 pt-12">
             <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4 text-[9px] font-bold text-white/10 uppercase tracking-widest italic">
                   <div className="w-16 h-px bg-white/5" />
                   Vault_ID: CRYO-77-ALP
                </div>
                <div className="flex items-center gap-4 text-[9px] font-bold text-white/10 uppercase tracking-widest italic">
                   <div className="w-16 h-px bg-white/5" />
                   Stasis_Status: NOMINAL
                </div>
             </div>
             <div className="text-right flex flex-col items-end gap-4">
                <span className="text-[8px] font-black uppercase tracking-[0.5em] text-white/40">Molecular_Vibration_Stream</span>
                <div className="flex gap-2 h-12 items-end">
                   {[...Array(16)].map((_, i) => (
                     <motion.div 
                        key={i}
                        animate={{ height: ["5%", "40%", "10%", "30%", "5%"] }}
                        transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
                        className="w-2 bg-white/5"
                     />
                   ))}
                </div>
             </div>
          </div>
        </section>

        {/* ==========================================
            2. STASIS REGISTRY (DENSE TECHNICAL)
            ========================================== */}
        <section className="py-60 bg-[#080808] relative border-y border-white/5 overflow-hidden">
           <div className="max-w-[1600px] mx-auto px-8 md:px-24">
              <div className="flex flex-col md:flex-row items-end justify-between mb-40 gap-12">
                 <Reveal>
                    <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/40 block mb-6 italic underline underline-offset-8 decoration-white/10">Stasis // Subjects</span>
                    <h2 className="text-6xl md:text-[10vw] font-black uppercase tracking-tighter italic leading-none text-white">Archives.</h2>
                 </Reveal>
                 <div className="text-right">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 block mb-4 italic">Registry // Molecular_Audit</span>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">L'Architecture de la Suspension</p>
                 </div>
              </div>

              <div className="grid md:grid-cols-3 gap-px bg-white/5 border border-white/5 shadow-2xl">
                 {STASIS_SUBJECTS.map((subject, i) => (
                   <Reveal key={subject.id} delay={i * 0.1}>
                      <div className="bg-[#050505] p-20 flex flex-col h-full hover:bg-white/[0.02] transition-all group cursor-crosshair border-white/5 border-r last:border-r-0">
                         <div className="flex justify-between items-start mb-16">
                            <div className="w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                               <Dna className="w-8 h-8" />
                            </div>
                            <span className={`px-4 py-2 bg-white/5 text-[9px] font-black uppercase tracking-[0.3em] ${subject.status === "Stable" ? "text-white" : "text-white/40"}`}>{subject.status}</span>
                         </div>
                         
                         <h3 className="text-4xl font-black uppercase tracking-tighter mb-8 italic text-white group-hover:translate-x-4 transition-transform">{subject.name}</h3>
                         <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] mb-12">{subject.category}</div>
                         
                         <div className="space-y-8 mb-20 border-l border-white/10 pl-8">
                            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
                               <span className="text-white/20">Temperature</span>
                               <span className="text-white group-hover:text-cyan-400 transition-colors">{subject.temp}</span>
                            </div>
                            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
                               <span className="text-white/20">Vitrification</span>
                               <span className="text-white group-hover:text-cyan-400 transition-colors">{subject.vitrification}</span>
                            </div>
                            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
                               <span className="text-white/20">Stasis Time</span>
                               <span className="text-white group-hover:text-cyan-400 transition-colors">{subject.stasis_time}</span>
                            </div>
                         </div>

                         <p className="text-[12px] text-white/30 leading-loose uppercase tracking-[0.2em] font-bold italic mb-16">
                            {subject.desc}
                         </p>

                         <div className="mt-auto pt-10 border-t border-white/5 flex justify-between items-center">
                            <span className="text-[10px] font-black text-white/10 uppercase tracking-widest">Ref: {subject.id}</span>
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
            3. MOLECULAR MONITOR (INTERACTIVE DATA)
            ========================================== */}
        <section className="py-60 bg-black relative border-y border-white/5 overflow-hidden">
           <div className="max-w-[1400px] mx-auto px-8 md:px-24">
              <div className="grid lg:grid-cols-2 gap-40 items-center">
                 <div>
                    <Reveal>
                       <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40 block mb-12 italic underline underline-offset-8 decoration-white/10">Thermal // Stability</span>
                       <h2 className="text-7xl md:text-[9vw] font-light italic leading-none text-white mb-16 uppercase tracking-tighter">
                          The <br/> <span className="not-italic font-black text-white/5 italic">Zero_Point.</span>
                       </h2>
                       <p className="text-2xl font-light text-white/20 leading-relaxed mb-24 italic uppercase tracking-[0.2em] max-w-xl">
                          Surveillance thermique en temps réel. Nos protocoles de vitrification garantissent l'absence totale de formation de cristaux de glace, préservant l'intégrité cellulaire à 100%.
                       </p>
                       <div className="grid grid-cols-2 gap-px bg-white/5 border border-white/5 mb-24 shadow-2xl">
                          {THERMAL_METRICS.map((metric, i) => (
                            <div key={i} className="p-16 bg-[#0a0a0a] group hover:bg-white/[0.02] transition-all border-r border-b last:border-r-0 border-white/5">
                               <div className="text-[10px] font-black uppercase text-white/40 mb-6 tracking-[0.4em]">{metric.label}</div>
                               <div className="text-5xl font-black text-white italic mb-6 tracking-tighter group-hover:translate-x-4 transition-transform">{metric.value}</div>
                               <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.3em] text-white/10 italic">
                                  <Activity className="w-4 h-4 text-white/40" /> {metric.trend}
                               </div>
                            </div>
                          ))}
                       </div>
                       <button 
                         onClick={() => setIsPerfusionActive(!isPerfusionActive)}
                         className="w-full py-8 bg-white text-black text-[11px] font-black uppercase tracking-widest hover:bg-white/90 transition-all shadow-2xl flex items-center justify-center gap-6 italic"
                       >
                          <Settings className="w-5 h-5" /> Re-Calibrate Perfusion Source
                       </button>
                    </Reveal>
                 </div>
                 
                 <div className="relative">
                    <Reveal delay={0.3} x={40}>
                       <div className="aspect-square bg-[#0a0a0a] border border-white/10 p-20 flex flex-col justify-between relative group overflow-hidden shadow-2xl">
                          <div className="absolute top-0 right-0 p-80 bg-white opacity-[0.01] blur-[150px] rounded-full group-hover:opacity-[0.03] transition-opacity" />
                          
                          <div className="flex justify-between items-start z-10">
                             <div className="flex flex-col gap-3">
                                <span className="text-[10px] font-black text-white/10 uppercase tracking-[0.5em]">Vault_Link // CRYO-SYNC-v4</span>
                                <span className="text-[12px] font-black text-white/40 uppercase tracking-[0.6em]">Molecular_Density_Map</span>
                             </div>
                             <Wifi className="w-6 h-6 text-white/20" />
                          </div>
                          
                          {/* CRYO VISUALIZER (SVG) */}
                          <div className="relative z-10 flex flex-col items-center justify-center h-full">
                             <div className="w-64 h-64 border border-white/5 rounded-full flex items-center justify-center relative">
                                <motion.div 
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                  className="absolute inset-0 border-t-2 border-white/20 rounded-full" 
                                />
                                <motion.div 
                                  animate={{ rotate: -360 }}
                                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                  className="absolute inset-8 border-b-2 border-white/10 rounded-full" 
                                />
                                <Snowflake className={`w-24 h-24 transition-colors duration-1000 ${isPerfusionActive ? "text-white animate-pulse" : "text-white/5"}`} />
                             </div>
                             <div className="mt-16 text-center space-y-6">
                                <div className={`text-4xl font-black italic tracking-tighter ${isPerfusionActive ? "text-white" : "text-white/20"}`}>
                                   {isPerfusionActive ? "THERMAL_LOCKED" : "THERMAL_WARNING"}
                                </div>
                                <span className="text-[11px] font-bold text-white/10 uppercase tracking-[0.6em] block">Auth_Node: ARCTIC_HEAD_01</span>
                             </div>
                          </div>

                          <div className="relative z-10 flex gap-6">
                             <div className="flex-1 h-1 bg-white/5 overflow-hidden">
                                <motion.div 
                                   animate={isPerfusionActive ? { x: ["-100%", "100%"] } : {}}
                                   transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                   className="w-1/2 h-full bg-white/40"
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
            4. CONSERVATION STORY (TECH STORYTELLING)
            ========================================== */}
        <section className="py-60 bg-[#050505] relative overflow-hidden border-t border-white/5">
           <div className="max-w-[1400px] mx-auto px-8 md:px-24">
              <div className="grid lg:grid-cols-2 gap-40 items-center">
                 <div className="relative aspect-[3/4] overflow-hidden group border border-white/5 shadow-2xl">
                    <Image 
                       src="https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?q=80&w=1200&auto=format&fit=crop" 
                       alt="Cryogenic Facility" 
                       fill 
                       className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2000ms]"
                    />
                    <div className="absolute inset-0 bg-white/5 mix-blend-overlay group-hover:opacity-0 transition-opacity" />
                    <div className="absolute inset-0 p-20 flex flex-col justify-end bg-gradient-to-t from-black via-black/40 to-transparent">
                       <div className="text-white">
                          <span className="text-[11px] font-black uppercase tracking-[0.6em] text-white/60 mb-8 block italic underline underline-offset-8 decoration-white/20">Conservation // Heritage // Unit</span>
                          <h4 className="text-6xl font-black tracking-tighter uppercase italic mb-12 mix-blend-difference text-white">Frozen <br/> Heritage.</h4>
                          <button className="flex items-center gap-6 text-[11px] font-black uppercase tracking-[0.4em] border-b border-white/20 pb-4 hover:border-white transition-all group">
                             Security Protocols <ExternalLink className="w-5 h-5 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                          </button>
                       </div>
                    </div>
                 </div>

                 <div>
                    <Reveal>
                       <div className="mb-24 text-left">
                          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40 mb-8 block italic">Chapitre III // Suspension</span>
                          <h2 className="text-7xl md:text-[10vw] font-black tracking-tighter uppercase text-white italic leading-none text-white">Stasis_Log.</h2>
                       </div>
                       <p className="text-2xl font-light text-white/20 leading-relaxed italic mb-20 uppercase tracking-[0.2em]">
                          La cryogénie n'est pas seulement une technique de froid, c'est l'art de la suspension métabolique. Nous combattons l'entropie à l'échelle atomique.
                       </p>
                       <div className="space-y-20">
                          {[
                            { t: "Vitrification Mastery", d: "Remplacement complet de l'eau cellulaire par des solutions cryoprotectrices pour éviter la cristallisation." },
                            { t: "Thermal Redundancy", d: "Huit couches de protection thermique et alimentation en azote liquide redondante pour une sécurité absolue." },
                            { t: "Genomic Integrity", d: "Surveillance constante des mutations induites par les rayonnements cosmiques pendant la stase prolongée." }
                          ].map((step, i) => (
                            <div key={i} className="group flex gap-12 border-b border-white/5 pb-16 hover:border-white/20 transition-all cursor-default">
                               <div className="text-6xl font-black text-white/5 group-hover:text-white/10 transition-colors italic leading-none">0{i+1}</div>
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
                    <div className="w-16 h-16 bg-white flex items-center justify-center">
                      <FlaskConical className="w-10 h-10 text-black" />
                    </div>
                    <span className="text-4xl font-black uppercase tracking-tighter italic">CRYO<span className="text-white/20">_RESERVE.</span></span>
                 </div>
                 <p className="text-white/20 text-[11px] font-black uppercase tracking-[0.5em] leading-loose max-w-sm mb-20 italic">
                    "L'avenir est une question de conservation." — Archive Cryo V.42
                 </p>
                 <div className="flex gap-16">
                    {["StasisLog", "ArchiveRegistry", "GitHub", "X_Protocol"].map(s => (
                      <Link key={s} href="#" className="text-[11px] font-black uppercase tracking-widest text-white/20 hover:text-white transition-colors italic underline underline-offset-8 decoration-white/5">{s}</Link>
                    ))}
                 </div>
              </div>

              {[
                { t: "CONSERVATION", l: ["Biological Stasis", "Genomic Bank", "Botanical Vault", "Archeo-Genome"] },
                { t: "TECHNOLOGY", l: ["Vitrification", "Perfusion Hub", "Thermal Shield", "SLA Reports"] },
                { t: "FACILITY", l: ["Our Legacy", "Arctic Station", "Locations", "Support"] }
              ].map((col, i) => (
                <div key={i} className="flex flex-col gap-12">
                  <h4 className="text-[11px] font-black text-white/40 uppercase tracking-[0.6em] italic">{col.t}</h4>
                  <ul className="flex flex-col gap-8">
                    {col.l.map(link => (
                      <li key={link} className="text-[11px] font-bold text-white/20 hover:text-white transition-colors cursor-pointer uppercase tracking-[0.4em] italic">{link}</li>
                    ))}
                  </ul>
                </div>
              ))}
           </div>

           <div className="max-w-[1600px] mx-auto border-t border-white/5 pt-16 flex flex-col md:flex-row justify-between items-center gap-16 text-[10px] font-black text-white/10 uppercase tracking-[0.6em] italic">
              <span>© 2026 CRYO-RESERVE BIONIC CONSERVATION AG. // ALL_RIGHTS_RESERVED</span>
              <div className="flex gap-16">
                 <span>STATUS: FROZEN</span>
                 <span>TEMPERATURE: -196.2°C (AVG)</span>
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

function HUD_Overlay({ isPerfusionActive }: { isPerfusionActive: boolean }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
       {/* Corner Brackets */}
       <div className={`absolute top-12 left-12 w-20 h-20 border-t-2 border-l-2 transition-colors duration-1000 ${isPerfusionActive ? "border-white" : "border-white/10"}`} />
       <div className={`absolute top-12 right-12 w-20 h-20 border-t-2 border-r-2 transition-colors duration-1000 ${isPerfusionActive ? "border-white" : "border-white/10"}`} />
       <div className={`absolute bottom-12 left-12 w-20 h-20 border-b-2 border-l-2 transition-colors duration-1000 ${isPerfusionActive ? "border-white" : "border-white/10"}`} />
       <div className={`absolute bottom-12 right-12 w-20 h-20 border-b-2 border-r-2 transition-colors duration-1000 ${isPerfusionActive ? "border-white" : "border-white/10"}`} />

       {/* Top Status Bar */}
       <div className="absolute top-12 left-1/2 -translate-x-1/2 flex items-center gap-20 bg-black/60 backdrop-blur-2xl px-12 py-4 border border-white/10 rounded-none">
          <div className="flex items-center gap-6 text-white">
             <div className={`w-3 h-3 transition-colors duration-500 ${isPerfusionActive ? "bg-white animate-pulse" : "bg-red-500 animate-ping"}`} />
             <span className="text-[10px] font-black uppercase tracking-[0.4em] italic leading-none">Thermal_Sync: {isPerfusionActive ? "LOCKED" : "UNSTABLE"} // Status: ACTIVE</span>
          </div>
          <div className="h-4 w-px bg-white/20" />
          <div className="flex items-center gap-6 text-white/20">
             <Wifi className="w-4 h-4" /> 
             <span className="text-[10px] font-black uppercase tracking-[0.4em] italic leading-none">Arctic_Relay: SECURE</span>
          </div>
       </div>

       {/* Right Rotation Info */}
       <div className="absolute right-12 top-1/2 -translate-y-1/2 rotate-90 origin-right hidden lg:block">
          <span className="text-[10px] font-black uppercase tracking-[0.8em] text-white/5 italic">Unauthorized_Duplication_Of_Stasis_Patterns_Is_Strictly_Monitored_By_Global_Cryo_Alliance</span>
       </div>
    </div>
  )
}
