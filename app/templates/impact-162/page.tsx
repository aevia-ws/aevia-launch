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
  Activity, Cpu, Brain, Zap, 
  ShieldCheck, Eye, Zap as ZapIcon, 
  Terminal, Lock, Key, Eye as EyeIcon, 
  Activity as ActivityIcon, Settings, Power, 
  Info, AlertTriangle, ChevronRight, 
  ArrowRight, Share2, Maximize2, 
  Download, ExternalLink, Archive, 
  Hash, Wifi, BarChart3, Microscope, 
  Fingerprint, Scan, Layers, 
  Frame, Box, Target, Orbit, 
  Atom, Satellite, Milestone, Gauge, 
  Timer, Cloud, Signal, Search,
  Navigation, Code, Command, Grid,
  Radar, Lightbulb, User, Heart,
  Dna, Smartphone, Bluetooth, Watch
} from "lucide-react"

/* ==========================================================================
   THE BIO-SYNC DATASET (ULTRA DENSITY)
   ========================================================================== */

const AUGMENTATIONS = [
  {
    id: "aug-neural-01",
    name: "Neural Mesh v9",
    type: "Cognitive Processor",
    sync_rate: "98.4%",
    latency: "0.2ms",
    draw: "4.2W",
    bio_comp: "Class A+",
    desc: "Interface neuronale directe permettant une expansion cognitive de 400% et un accès instantané aux réseaux de données.",
    status: "Operational"
  },
  {
    id: "aug-optic-04",
    name: "Crystalline HUD",
    type: "Optical Overlay",
    sync_rate: "99.2%",
    latency: "0.1ms",
    draw: "2.1W",
    bio_comp: "Class S",
    desc: "Implant rétinien offrant une vision multi-spectrale et une analyse de données en temps réel sur le champ de vision.",
    status: "Secure"
  },
  {
    id: "aug-kinetic-09",
    name: "Titanium Servos",
    type: "Motor Enhancement",
    sync_rate: "96.8%",
    latency: "0.5ms",
    draw: "12.8W",
    bio_comp: "Class B+",
    desc: "Remplacement musculaire par des fibres synthétiques à haute densité pour une force et une endurance surhumaines.",
    status: "Testing"
  }
]

const NEURAL_METRICS = [
  { label: "Synaptic Load", value: "42.8%", trend: "Stable" },
  { label: "Neural Integration", value: "98.4%", trend: "High" },
  { label: "Metabolic Offset", value: "+12.4%", trend: "Elevated" },
  { label: "System Uptime", value: "420d", trend: "Infinite" }
]

const SURGICAL_LOGS = [
  { timestamp: "08:14:42", op: "Implant Sync: Node-42", status: "SUCCESS" },
  { timestamp: "08:14:45", op: "Neural Handshake: v9.4", status: "ACTIVE" },
  { timestamp: "08:14:48", op: "Biometric Audit: Clear", status: "VERIFIED" }
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

function HUDOverlay() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY })
    window.addEventListener("mousemove", handleMouse)
    return () => window.removeEventListener("mousemove", handleMouse)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] opacity-30 overflow-hidden">
       {/* Scanner Circle */}
       <motion.div 
         animate={{ x: mousePos.x - 100, y: mousePos.y - 100 }}
         transition={{ type: "spring", damping: 30, stiffness: 200 }}
         className="w-[200px] h-[200px] border border-cyan-400/40 rounded-full flex items-center justify-center relative"
       >
          <div className="w-[180px] h-[180px] border border-cyan-400/10 rounded-full animate-ping" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12 bg-cyan-400 px-2 py-0.5 text-[8px] font-black text-black uppercase">Scanning_Subject</div>
       </motion.div>
       
       {/* Data Streams */}
       <div className="absolute top-12 left-12 space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 text-[8px] font-bold text-cyan-400/40 uppercase tracking-widest italic">
               <div className="w-8 h-px bg-cyan-400/20" />
               TRK_SYNC_{i+102}: OK
            </div>
          ))}
       </div>
    </div>
  )
}

function SectionTitle({ subtitle, title, alignment = "left" }: { subtitle: string, title: string, alignment?: "center" | "left" }) {
  return (
    <div className={`mb-32 ${alignment === "center" ? "text-center" : "text-left"}`}>
       <Reveal>
          <span className="text-[10px] font-black uppercase tracking-[0.6em] text-cyan-400 mb-8 block italic underline underline-offset-8 decoration-cyan-400/20 font-mono">
             {subtitle}
          </span>
          <h2 className="text-6xl md:text-[8vw] font-black tracking-tighter uppercase text-white italic font-mono leading-none">
             {title}
          </h2>
       </Reveal>
    </div>
  )
}

/* ==========================================
   THE BIO-SYNC - MAIN INTERFACE
   ========================================== */

export default function BioSyncPremium() {
  const [activeTab, setActiveTab] = useState("neural")
  const [isSyncActive, setIsSyncActive] = useState(true)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })

  // Augmented Scroll Effects
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const bodyScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.2])
  const hudRotate = useTransform(scrollYProgress, [0, 1], [0, 360])

  return (
    <div ref={containerRef} className="bg-[#050505] text-[#e0e2e5] font-mono selection:bg-cyan-500/30 selection:text-white min-h-screen overflow-x-hidden transition-colors duration-1000">
      
      {/* GLOBAL HUD OVERLAY */}
      <HUDOverlay />
      <Header isSyncActive={isSyncActive} />

      <main>
        {/* ==========================================
            1. NEURAL IGNITION (HERO)
            ========================================== */}
        <section className="relative h-screen flex flex-col justify-center items-center px-8 md:px-24 overflow-hidden pt-20">
          <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,#06b6d410_1px,transparent_1px)] bg-[size:40px_40px]" />
          
          <motion.div style={{ scale: bodyScale, rotate: hudRotate, opacity: heroOpacity }} className="absolute z-0 pointer-events-none flex items-center justify-center opacity-20">
             <div className="w-[70vw] h-[70vw] border border-cyan-400/10 rounded-full flex items-center justify-center">
                <div className="w-[50vw] h-[50vw] border border-cyan-400/5 rounded-full flex items-center justify-center">
                   <Dna className="w-48 h-48 text-cyan-400/20" />
                </div>
             </div>
          </motion.div>

          <div className="relative z-10 text-center max-w-7xl">
             <Reveal>
                <div className="inline-flex items-center gap-4 px-6 py-2 border border-cyan-400/30 bg-cyan-400/5 text-[10px] font-black uppercase tracking-[0.5em] text-cyan-400 mb-12 italic">
                   <ActivityIcon className="w-4 h-4" /> System_Link: Biometric_Secure // v9.4.0
                </div>
                <h1 className="text-7xl md:text-[14vw] font-black tracking-tighter uppercase mb-16 leading-[0.75] italic">
                   Bio <br/> <span className="text-white/5 italic">Sync.</span>
                </h1>
                <p className="max-w-3xl mx-auto text-sm md:text-lg text-white/30 leading-relaxed uppercase tracking-widest font-light mb-16 italic">
                   L'évolution dirigée par l'ingénierie. Nous redéfinissons les limites de l'humain à travers une intégration bionique et neuronale de haute fidélité.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                   <button className="px-12 py-6 bg-cyan-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-[0_0_40px_rgba(8,145,178,0.3)] flex items-center gap-4 italic">
                      <Scan className="w-5 h-5" /> Initialize Sync
                   </button>
                   <button className="px-12 py-6 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all flex items-center gap-4 italic">
                      <Database className="w-5 h-5" /> Augmentation Registry
                   </button>
                </div>
             </Reveal>
          </div>

          <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end border-t border-white/5 pt-12">
             <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4 text-[9px] font-bold text-white/20 uppercase tracking-widest italic">
                   <div className="w-16 h-px bg-white/10" />
                   Subject_ID: BIO-HASH-42
                </div>
                <div className="flex items-center gap-4 text-[9px] font-bold text-white/20 uppercase tracking-widest italic">
                   <div className="w-16 h-px bg-white/10" />
                   Sync_Level: 98.4%
                </div>
             </div>
             <div className="text-right flex flex-col items-end gap-4">
                <span className="text-[8px] font-black uppercase tracking-[0.5em] text-cyan-400">Neural_Pulse_Stream</span>
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
            2. AUGMENTATION MATRIX (DENSE GRID)
            ========================================== */}
        <section className="py-60 bg-[#080808] relative border-y border-white/5 overflow-hidden">
           <div className="max-w-[1600px] mx-auto px-8 md:px-24">
              <div className="flex flex-col md:flex-row items-end justify-between mb-40 gap-12">
                 <Reveal>
                    <span className="text-[10px] font-black uppercase tracking-[0.6em] text-cyan-400 block mb-6 italic underline underline-offset-8 decoration-cyan-400/20">Implant // Registry</span>
                    <h2 className="text-6xl md:text-[10vw] font-black uppercase tracking-tighter italic leading-none text-white">Augments.</h2>
                 </Reveal>
                 <div className="text-right">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 block mb-4 italic">Registry // Biometric_Audit</span>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-400">L'Architecture du Surhomme</p>
                 </div>
              </div>

              <div className="grid md:grid-cols-3 gap-px bg-white/5 border border-white/5 shadow-2xl">
                 {AUGMENTATIONS.map((aug, i) => (
                   <Reveal key={aug.id} delay={i * 0.1}>
                      <div className="bg-[#050505] p-20 flex flex-col h-full hover:bg-white/[0.02] transition-all group cursor-crosshair border-white/5 border-r last:border-r-0">
                         <div className="flex justify-between items-start mb-16">
                            <div className="w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-cyan-600 group-hover:text-black transition-all duration-500">
                               <Cpu className="w-8 h-8" />
                            </div>
                            <span className={`px-4 py-2 bg-white/5 text-[9px] font-black uppercase tracking-[0.3em] ${aug.status === "Operational" ? "text-cyan-400" : "text-yellow-500"}`}>{aug.status}</span>
                         </div>
                         
                         <h3 className="text-5xl font-black uppercase tracking-tighter mb-8 italic text-white group-hover:translate-x-4 transition-transform">{aug.name}</h3>
                         <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] mb-12">{aug.type}</div>
                         
                         <div className="space-y-8 mb-20 border-l border-cyan-400/20 pl-8">
                            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
                               <span className="text-white/20">Sync Rate</span>
                               <span className="text-white group-hover:text-cyan-400 transition-colors">{aug.sync_rate}</span>
                            </div>
                            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
                               <span className="text-white/20">Latency</span>
                               <span className="text-white group-hover:text-cyan-400 transition-colors">{aug.latency}</span>
                            </div>
                            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
                               <span className="text-white/20">Bio-Comp</span>
                               <span className="text-white group-hover:text-cyan-400 transition-colors">{aug.bio_comp}</span>
                            </div>
                         </div>

                         <p className="text-[12px] text-white/30 leading-loose uppercase tracking-[0.2em] font-bold italic mb-16">
                            {aug.desc}
                         </p>

                         <div className="mt-auto pt-10 border-t border-white/5 flex justify-between items-center">
                            <span className="text-[10px] font-black text-white/10 uppercase tracking-widest">Ref: {aug.id}</span>
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
            3. SYNAPTIC MONITOR (INTERACTIVE DATA)
            ========================================== */}
        <section className="py-60 bg-black relative border-y border-white/5 overflow-hidden">
           <div className="max-w-[1400px] mx-auto px-8 md:px-24">
              <div className="grid lg:grid-cols-2 gap-40 items-center">
                 <div>
                    <Reveal>
                       <span className="text-[10px] font-black uppercase tracking-[0.5em] text-cyan-400 block mb-12 italic underline underline-offset-8 decoration-cyan-400/20">Synaptic // Performance</span>
                       <h2 className="text-7xl md:text-[9vw] font-light italic leading-none text-white mb-16 uppercase tracking-tighter">
                          The <br/> <span className="not-italic font-black text-white/5 italic">Neural_Load.</span>
                       </h2>
                       <p className="text-2xl font-light text-white/20 leading-relaxed mb-24 italic uppercase tracking-[0.2em] max-w-xl">
                          Surveillance de l'activité cérébrale en temps réel. Nos protocoles de synchronisation optimisent l'intégration des implants pour une symbiose parfaite entre l'homme et la machine.
                       </p>
                       <div className="grid grid-cols-2 gap-px bg-white/5 border border-white/5 mb-24 shadow-2xl">
                          {NEURAL_METRICS.map((metric, i) => (
                            <div key={i} className="p-16 bg-[#0a0a0c] group hover:bg-white/[0.02] transition-all border-r border-b last:border-r-0 border-white/5">
                               <div className="text-[10px] font-black uppercase text-cyan-400 mb-6 tracking-[0.4em]">{metric.label}</div>
                               <div className="text-5xl font-black text-white italic mb-6 tracking-tighter group-hover:translate-x-4 transition-transform">{metric.value}</div>
                               <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.3em] text-white/10 italic">
                                  <ActivityIcon className="w-4 h-4 text-cyan-400" /> {metric.trend}
                               </div>
                            </div>
                          ))}
                       </div>
                       <button 
                         onClick={() => setIsSyncActive(!isSyncActive)}
                         className="w-full py-8 bg-cyan-600 text-white text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-2xl flex items-center justify-center gap-6 italic"
                       >
                          <Settings className="w-5 h-5" /> Re-Calibrate Neural Mesh
                       </button>
                    </Reveal>
                 </div>
                 
                 <div className="relative">
                    <Reveal delay={0.3} x={40}>
                       <div className="aspect-square bg-[#0a0a0c] border border-white/10 p-20 flex flex-col justify-between relative group overflow-hidden shadow-2xl">
                          <div className="absolute top-0 right-0 p-80 bg-cyan-400 opacity-[0.02] blur-[150px] rounded-full group-hover:opacity-[0.05] transition-opacity" />
                          
                          <div className="flex justify-between items-start z-10">
                             <div className="flex flex-col gap-3">
                                <span className="text-[10px] font-black text-white/10 uppercase tracking-[0.5em]">Subject_Link // SYNC-HASH-v9</span>
                                <span className="text-[12px] font-black text-white/40 uppercase tracking-[0.6em]">Neural_Density_Map</span>
                             </div>
                             <Wifi className="w-6 h-6 text-cyan-400" />
                          </div>
                          
                          {/* NEURAL VISUALIZER (SVG) */}
                          <div className="relative z-10 flex flex-col items-center justify-center h-full">
                             <div className="w-64 h-64 border border-cyan-400/5 rounded-full flex items-center justify-center relative">
                                <motion.div 
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                                  className="absolute inset-0 border-t-2 border-cyan-400/20 rounded-full" 
                                />
                                <motion.div 
                                  animate={{ rotate: -360 }}
                                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                  className="absolute inset-8 border-b-2 border-cyan-400/10 rounded-full" 
                                />
                                <Brain className={`w-24 h-24 transition-colors duration-1000 ${isSyncActive ? "text-cyan-400 animate-pulse" : "text-white/5"}`} />
                             </div>
                             <div className="mt-16 text-center space-y-6">
                                <div className={`text-4xl font-black italic tracking-tighter ${isSyncActive ? "text-white" : "text-white/20"}`}>
                                   {isSyncActive ? "SYNC_ESTABLISHED" : "SYNC_INTERRUPTED"}
                                </div>
                                <span className="text-[11px] font-bold text-white/10 uppercase tracking-[0.6em] block">Auth_Node: NEURAL_CENTRAL_01</span>
                             </div>
                          </div>

                          <div className="relative z-10 flex gap-6">
                             <div className="flex-1 h-1 bg-white/5 overflow-hidden">
                                <motion.div 
                                   animate={isSyncActive ? { x: ["-100%", "100%"] } : {}}
                                   transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
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
            4. AUGMENTATION LAB (TECH STORYTELLING)
            ========================================== */}
        <section className="py-60 bg-[#050505] relative overflow-hidden border-t border-white/5">
           <div className="max-w-[1400px] mx-auto px-8 md:px-24">
              <div className="grid lg:grid-cols-2 gap-40 items-center">
                 <div className="relative aspect-[3/4] overflow-hidden group border border-white/5 shadow-2xl">
                    <Image 
                       src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop" 
                       alt="Robotic Lab" 
                       fill 
                       className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2000ms]"
                    />
                    <div className="absolute inset-0 bg-cyan-900/10 mix-blend-color group-hover:opacity-0 transition-opacity" />
                    <div className="absolute inset-0 p-20 flex flex-col justify-end bg-gradient-to-t from-black via-black/40 to-transparent">
                       <div className="text-white">
                          <span className="text-[11px] font-black uppercase tracking-[0.6em] text-cyan-400 mb-8 block italic underline underline-offset-8 decoration-cyan-400/20">Atelier // Bio // Ethics</span>
                          <h4 className="text-6xl font-black tracking-tighter uppercase italic mb-12 mix-blend-difference text-white">Augmented <br/> Future.</h4>
                          <button className="flex items-center gap-6 text-[11px] font-black uppercase tracking-[0.4em] border-b border-white/20 pb-4 hover:border-cyan-400 transition-all group">
                             Ethical Protocols <ExternalLink className="w-5 h-5 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                          </button>
                       </div>
                    </div>
                 </div>

                 <div>
                    <Reveal>
                       <div className="mb-24 text-left">
                          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-cyan-400 mb-8 block italic">Chapitre III // Evolution</span>
                          <h2 className="text-7xl md:text-[10vw] font-black tracking-tighter uppercase text-white italic leading-none text-white">Next_Step.</h2>
                       </div>
                       <p className="text-2xl font-light text-white/20 leading-relaxed italic mb-20 uppercase tracking-[0.2em]">
                          L'augmentation bionique n'est pas une simple amélioration, c'est une transition vers une nouvelle forme d'existence. Nous garantissons la sécurité et l'éthique de chaque transition.
                       </p>
                       <div className="space-y-20">
                          {[
                            { t: "Neural Sovereignty", d: "Protection absolue de l'intégrité cognitive et de la vie privée neurale de chaque utilisateur." },
                            { t: "Bio-Compatibility", d: "Matériaux nanostructurés garantissant une intégration sans rejet et une longévité perpétuelle." },
                            { t: "Sync Mastery", d: "Optimisation logicielle de haut niveau pour une réponse motrice et cognitive sans latence." }
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
                      <Atom className="w-10 h-10 text-black" />
                    </div>
                    <span className="text-4xl font-black uppercase tracking-tighter italic">BIO<span className="text-white/20">_SYNC.</span></span>
                 </div>
                 <p className="text-white/20 text-[11px] font-black uppercase tracking-[0.5em] leading-loose max-w-sm mb-20 italic">
                    "L'avenir de l'humanité est écrit en code et en bionique." — Archive Bio-Sync V.9
                 </p>
                 <div className="flex gap-16">
                    {["NeuralLog", "AugmentRegistry", "GitHub", "X_Protocol"].map(s => (
                      <Link key={s} href="#" className="text-[11px] font-black uppercase tracking-widest text-white/20 hover:text-cyan-400 transition-colors italic underline underline-offset-8 decoration-white/5">{s}</Link>
                    ))}
                 </div>
              </div>

              {[
                { t: "AUGMENTATIONS", l: ["Neural Mesh", "Optical HUD", "Kinetic Servos", "Bio Filters"] },
                { t: "SERVICES", l: ["Neural Sync", "Bio Audit", "System Repair", "Uptime S9"] },
                { t: "FIRM", l: ["Our Legacy", "Ethics Council", "Locations", "Support"] }
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
              <span>© 2026 BIO-SYNC BIONIC ENGINEERING AG. // ALL_RIGHTS_RESERVED</span>
              <div className="flex gap-16">
                 <span>STATUS: SYNCED</span>
                 <span>LATENCY: 0.12ms (AVG)</span>
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

function Header({ isSyncActive }: { isSyncActive: boolean }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[200] p-8 md:px-24 flex justify-between items-center">
       <Link href="/" className="flex items-center gap-4 group">
          <div className="w-12 h-12 bg-white flex items-center justify-center group-hover:bg-cyan-600 transition-colors duration-500">
             <Atom className="w-8 h-8 text-black" />
          </div>
          <span className="text-2xl font-black uppercase tracking-tighter italic text-white">Bio<span className="text-white/20">_Sync.</span></span>
       </Link>
       
       <div className="hidden lg:flex gap-16 text-[11px] font-black uppercase tracking-[0.4em] text-white/40">
          {["Implants", "Sync", "Archives", "Atelier"].map(l => (
            <Link key={l} href="#" className="hover:text-cyan-400 transition-colors italic">{l}</Link>
          ))}
       </div>

       <div className="flex items-center gap-12">
          <div className="hidden md:flex items-center gap-4">
             <div className={`w-3 h-3 rounded-full transition-colors duration-500 ${isSyncActive ? "bg-cyan-400" : "bg-red-500"}`} />
             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 italic">Link_{isSyncActive ? "Nominal" : "Interrupted"}</span>
          </div>
          <button className="px-10 py-4 bg-white text-black text-[11px] font-black uppercase tracking-[0.3em] hover:bg-cyan-600 hover:text-white transition-all italic">Inquire_Augment</button>
       </div>
    </nav>
  )
}
