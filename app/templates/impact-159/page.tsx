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
  Scissors, Zap, Activity, Thermometer, 
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
  BookOpen, Radio, PenTool, Sparkles,
  Heart, Sun, Moon, Wind as WindIcon,
  Shirt, Palette, Beaker, GitBranch
} from "lucide-react"

/* ==========================================================================
   NEURAL WEAVER DATASET (ULTRA DENSITY)
   ========================================================================== */

const FABRICS = [
  {
    id: "fb-graph-01",
    name: "Graphene-Silk v4",
    type: "Conductive Smart-Textile",
    conductivity: "420 S/m",
    tensile: "2.4 GPa",
    thermal: "Dynamic",
    desc: "Soie synthétique infusée de graphène pour une régulation thermique active et une surveillance biométrique.",
    status: "Production"
  },
  {
    id: "fb-bio-88",
    name: "Bioluminescent Mesh",
    type: "Photonic Fabric",
    conductivity: "N/A",
    tensile: "0.8 GPa",
    thermal: "Insulating",
    desc: "Maillage vivant capable d'émettre de la lumière en réponse aux niveaux de sérotonine du porteur.",
    status: "R&D"
  },
  {
    id: "fb-poly-09",
    name: "Shape-Memory Wool",
    type: "Structural Knit",
    conductivity: "Low",
    tensile: "1.2 GPa",
    thermal: "Adaptive",
    desc: "Laine à mémoire de forme capable d'ajuster son drapé et sa densité selon l'humidité ambiante.",
    status: "Prototype"
  }
]

const DESIGN_METRICS = [
  { label: "AI Iterations", value: "12,402", trend: "Optimizing" },
  { label: "Thread Density", value: "1.2M / cm²", trend: "Stable" },
  { label: "Pattern Complexity", value: "94.2%", trend: "Maximum" },
  { label: "Sustainability Score", value: "A++", trend: "Certified" }
]

const WEAVING_LOGS = [
  { step: "Loom Calibration", status: "COMPLETE", time: "0.2ms" },
  { step: "Neural Pattern Sync", status: "ACTIVE", time: "0.5ms" },
  { step: "Thread Tension Audit", status: "NOMINAL", time: "0.1ms" }
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

function WovenBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-10">
       <svg width="100%" height="100%" className="w-full h-full">
          <pattern id="weave" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
             <path d="M0 20 L40 20 M20 0 L20 40" stroke="white" strokeWidth="0.5" fill="none" />
             <circle cx="20" cy="20" r="1" fill="white" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#weave)" />
       </svg>
    </div>
  )
}

function ThreadLine({ vertical = false, delay = 0 }: { vertical?: boolean, delay?: number }) {
  return (
    <motion.div 
      initial={{ scaleX: 0, scaleY: 0 }}
      animate={{ scaleX: 1, scaleY: 1 }}
      transition={{ duration: 2, delay, ease: "circOut" }}
      className={`absolute bg-white/10 ${vertical ? "w-px h-full left-1/2" : "h-px w-full top-1/2"}`}
    />
  )
}

/* ==========================================================================
   THE NEURAL WEAVER - MAIN INTERFACE
   ========================================================================== */

export default function NeuralWeaverPremium() {
  const [activeFabric, setActiveFabric] = useState(0)
  const [loomSpeed, setLoomSpeed] = useState(1)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })

  // Woven Transition Effects
  const threadSpread = useTransform(scrollYProgress, [0, 1], [0, 200])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const loomRotate = useTransform(scrollYProgress, [0, 1], [0, 45])

  return (
    <div ref={containerRef} className="bg-[#0a0a0c] text-[#e0e2e5] font-serif selection:bg-white selection:text-black min-h-screen overflow-x-hidden">
      
      {/* GLOBAL HUD OVERLAY */}
      <HUD_Overlay loomSpeed={loomSpeed} />

      <main>
        {/* ==========================================
            1. SILK IGNITION (HERO)
            ========================================== */}
        <section className="relative h-screen flex flex-col justify-center items-center px-8 md:px-24 overflow-hidden pt-20">
          <WovenBackground />
          <motion.div style={{ rotate: loomRotate, opacity: heroOpacity }} className="absolute inset-0 z-0 pointer-events-none">
             {[...Array(12)].map((_, i) => (
               <ThreadLine key={i} vertical={i % 2 === 0} delay={i * 0.1} />
             ))}
          </motion.div>

          <div className="relative z-10 text-center max-w-7xl">
             <Reveal>
                <div className="inline-flex items-center gap-4 px-4 py-1 border border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-[0.5em] text-white/40 mb-12 italic font-sans">
                   <Palette className="w-3 h-3" /> Season: 2026_Winter // AI_Model: SILK_GEN_v8
                </div>
                <h1 className="text-7xl md:text-[14vw] font-light tracking-tighter uppercase mb-16 leading-[0.75] italic">
                   Neural <br/> <span className="font-bold not-italic text-white opacity-5 italic">Weaver.</span>
                </h1>
                <p className="max-w-2xl mx-auto text-sm md:text-lg text-white/30 leading-relaxed uppercase tracking-widest font-light mb-16 italic font-sans">
                   L'intersection de la haute couture et du calcul neuronal. Nous tissons les textiles de demain avec une précision algorithmique et une âme artisanale.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-8 justify-center items-center font-sans">
                   <button className="px-12 py-5 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-2xl flex items-center gap-4">
                      <Scissors className="w-4 h-4" /> Enter Atelier
                   </button>
                   <button className="px-12 py-5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all flex items-center gap-4">
                      <Beaker className="w-4 h-4" /> Material Archive
                   </button>
                </div>
             </Reveal>
          </div>

          {/* BOTTOM TELEMETRY BAR */}
          <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end border-t border-white/5 pt-8 font-sans">
             <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 text-[9px] font-bold text-white/20 uppercase tracking-widest italic">
                   <div className="w-12 h-px bg-white/10" />
                   Pattern_Seed: 0x4f2a7
                </div>
                <div className="flex items-center gap-4 text-[9px] font-bold text-white/20 uppercase tracking-widest italic">
                   <div className="w-12 h-px bg-white/10" />
                   Weave_Status: Nominal
                </div>
             </div>
             <div className="text-right flex flex-col items-end gap-4">
                <span className="text-[8px] font-black uppercase tracking-[0.5em] text-white/20">Thread_Sync_Stream</span>
                <div className="flex gap-1 h-8 items-end">
                   {[...Array(16)].map((_, i) => (
                     <motion.div 
                        key={i}
                        animate={{ height: ["20%", "100%", "40%", "80%", "20%"] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                        className="w-1 bg-white/20"
                     />
                   ))}
                </div>
             </div>
          </div>
        </section>

        {/* ==========================================
            2. FABRIC REGISTRY (DENSE TECHNICAL)
            ========================================== */}
        <section className="py-60 bg-[#08080a] relative border-y border-white/5 overflow-hidden font-sans">
           <div className="max-w-[1600px] mx-auto px-8 md:px-24">
              <div className="flex flex-col md:flex-row items-end justify-between mb-40 gap-12">
                 <Reveal>
                    <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/40 block mb-6 italic underline underline-offset-8">Material // Registry</span>
                    <h2 className="text-6xl md:text-[9vw] font-light uppercase tracking-tighter italic leading-none font-serif text-white">Archives.</h2>
                 </Reveal>
                 <div className="text-right">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 block mb-4 italic">Registry // Textile_Audit</span>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">L'Architecture de la Fibre</p>
                 </div>
              </div>

              <div className="grid md:grid-cols-3 gap-px bg-white/5 border border-white/5">
                 {FABRICS.map((fab, i) => (
                   <Reveal key={fab.id} delay={i * 0.1}>
                      <div className="bg-[#0a0a0c] p-16 flex flex-col h-full hover:bg-white/[0.02] transition-all group cursor-crosshair border-white/5 border-r last:border-r-0">
                         <div className="flex justify-between items-start mb-16">
                            <div className="w-12 h-12 bg-white/5 flex items-center justify-center group-hover:bg-white transition-all duration-500">
                               <Shirt className="w-6 h-6 text-white/40 group-hover:text-black" />
                            </div>
                            <span className="px-3 py-1 bg-white/5 text-white/40 text-[8px] font-black uppercase tracking-widest">{fab.status}</span>
                         </div>
                         
                         <h3 className="text-4xl font-light uppercase tracking-tighter mb-8 italic font-serif text-white">{fab.name}</h3>
                         <div className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-8">{fab.type}</div>
                         
                         <div className="space-y-6 mb-16 border-l border-white/10 pl-6">
                            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                               <span className="text-white/20">Conductivity</span>
                               <span className="text-white/60 group-hover:text-white transition-colors">{fab.conductivity}</span>
                            </div>
                            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                               <span className="text-white/20">Tensile</span>
                               <span className="text-white/60 group-hover:text-white transition-colors">{fab.tensile}</span>
                            </div>
                            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                               <span className="text-white/20">Thermal</span>
                               <span className="text-white/60 group-hover:text-white transition-colors">{fab.thermal}</span>
                            </div>
                         </div>

                         <p className="text-[11px] text-white/20 leading-loose uppercase tracking-[0.2em] font-bold italic mb-12">
                            {fab.desc}
                         </p>

                         <div className="mt-auto pt-8 border-t border-white/5 flex justify-between items-center">
                            <span className="text-[9px] font-black text-white/10 uppercase">Ref: {fab.id}</span>
                            <button className="text-[9px] font-black uppercase text-white/40 flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                               Material Analysis <ChevronRight className="w-4 h-4" />
                            </button>
                         </div>
                      </div>
                   </Reveal>
                 ))}
              </div>
           </div>
        </section>

        {/* ==========================================
            3. DESIGN LAB (INTERACTIVE PATTERNS)
            ========================================== */}
        <section className="py-60 bg-black relative border-y border-white/5 overflow-hidden">
           <div className="max-w-[1400px] mx-auto px-8 md:px-24">
              <div className="grid lg:grid-cols-2 gap-32 items-center">
                 <div>
                    <Reveal>
                       <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40 block mb-12 italic underline underline-offset-8 font-sans">Generative // Drafting</span>
                       <h2 className="text-6xl md:text-[8vw] font-light italic leading-none text-white mb-12 uppercase tracking-tighter">
                          The <br/> <span className="not-italic font-black text-white/5 italic">Pattern_Loop.</span>
                       </h2>
                       <p className="text-xl font-light text-white/20 leading-relaxed mb-20 italic uppercase tracking-widest font-sans">
                          Nos algorithmes de drafting génèrent des patrons optimisés pour la réduction maximale des déchets textiles, tout en repoussant les limites de l'ergonomie humaine.
                       </p>
                       <div className="grid grid-cols-2 gap-8 mb-20 font-sans">
                          {DESIGN_METRICS.map((metric, i) => (
                            <div key={i} className="p-10 bg-[#0a0a0c] border border-white/5 group hover:border-white transition-all">
                               <div className="text-[9px] font-black uppercase text-white/40 mb-4 tracking-[0.3em]">{metric.label}</div>
                               <div className="text-4xl font-light text-white italic">{metric.value}</div>
                               <div className="flex items-center gap-2 text-[8px] font-bold uppercase tracking-widest text-white/10 italic">
                                  <Activity className="w-3 h-3" /> {metric.trend}
                               </div>
                            </div>
                          ))}
                       </div>
                       <button 
                         onClick={() => setLoomSpeed(prev => prev === 1 ? 2 : 1)}
                         className="w-full py-6 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-2xl flex items-center justify-center gap-4 italic font-sans"
                       >
                          <Settings className="w-4 h-4" /> Calibrate Neural Loom
                       </button>
                    </Reveal>
                 </div>
                 
                 <div className="relative">
                    <Reveal delay={0.3} x={40}>
                       <div className="aspect-[3/4] bg-[#0a0a0c] border border-white/10 p-16 flex flex-col justify-between relative group overflow-hidden">
                          <div className="absolute top-0 right-0 p-60 bg-white opacity-[0.03] blur-[120px] rounded-full group-hover:opacity-[0.1] transition-opacity" />
                          
                          <div className="flex justify-between items-start z-10 font-sans">
                             <div className="flex flex-col gap-2">
                                <span className="text-[8px] font-black text-white/10 uppercase tracking-widest">Model_ID // WEAVE-SYNC-v12</span>
                                <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">Drafting_Flow_Analysis</span>
                             </div>
                             <Wifi className="w-5 h-5 text-white/20" />
                          </div>
                          
                          {/* PATTERN VISUALIZER (SVG) */}
                          <div className="relative z-10 flex flex-col items-center justify-center h-full">
                             <svg width="300" height="400" viewBox="0 0 300 400" className="opacity-40">
                                <motion.path 
                                   d="M50 50 Q150 0 250 50 L280 350 Q150 400 20 350 Z" 
                                   stroke="white" 
                                   strokeWidth="1" 
                                   fill="none" 
                                   animate={{ d: [
                                      "M50 50 Q150 0 250 50 L280 350 Q150 400 20 350 Z",
                                      "M60 40 Q150 10 240 40 L270 360 Q150 390 30 360 Z",
                                      "M50 50 Q150 0 250 50 L280 350 Q150 400 20 350 Z"
                                   ] }}
                                   transition={{ duration: 4, repeat: Infinity }}
                                />
                                <motion.line 
                                   x1="50" y1="150" x2="250" y2="150" 
                                   stroke="white" 
                                   strokeDasharray="5,5" 
                                   animate={{ y1: [150, 160, 150], y2: [150, 140, 150] }}
                                   transition={{ duration: 3, repeat: Infinity }}
                                />
                             </svg>
                             <div className="text-center space-y-4 font-sans mt-8">
                                <div className="text-2xl font-light italic tracking-tighter text-white/60">GENERATING_DRAFT_42</div>
                                <span className="text-[9px] font-bold text-white/10 uppercase tracking-[0.5em]">Auth_Node: PARIS_ATELIER_01</span>
                             </div>
                          </div>

                          <div className="relative z-10 flex gap-4 font-sans">
                             <div className="w-full h-px bg-white/10 overflow-hidden">
                                <motion.div 
                                   animate={{ x: ["-100%", "100%"] }} 
                                   transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                   className="w-1/2 h-full bg-white/60"
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
            4. ATELIER STORY (TECH NARRATIVE)
            ========================================== */}
        <section className="py-60 bg-[#0a0a0c] relative overflow-hidden font-sans">
           <div className="max-w-[1400px] mx-auto px-8 md:px-24">
              <div className="grid lg:grid-cols-2 gap-32 items-center">
                 <div className="relative aspect-[4/5] overflow-hidden group border border-white/5 shadow-2xl">
                    <Image 
                       src="https://images.unsplash.com/photo-1558278226-96a23e593264?q=80&w=1200&auto=format&fit=crop" 
                       alt="Macro Textile Texture" 
                       fill 
                       className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                    />
                    <div className="absolute inset-0 bg-white/5 mix-blend-color group-hover:opacity-0 transition-opacity" />
                    <div className="absolute inset-0 p-16 flex flex-col justify-end bg-gradient-to-t from-black via-black/40 to-transparent">
                       <div className="text-white">
                          <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/40 mb-6 block italic underline underline-offset-8">Atelier // Philosophy // Unit</span>
                          <h4 className="text-5xl font-light tracking-tighter uppercase italic mb-8 font-serif">Structural <br/> Elegance.</h4>
                          <button className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest border-b border-white/20 pb-2">
                             Atelier Protocols <ExternalLink className="w-4 h-4" />
                          </button>
                       </div>
                    </div>
                 </div>

                 <div>
                    <Reveal>
                       <div className="mb-24 text-left">
                          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40 mb-8 block italic">Chapitre III // Craft</span>
                          <h2 className="text-6xl md:text-[8vw] font-light tracking-tighter uppercase text-white italic leading-none font-serif">Silk_Net.</h2>
                       </div>
                       <p className="text-xl font-light text-white/20 leading-relaxed italic mb-16 uppercase tracking-widest">
                          Le tissage neural n'est pas seulement une technique de production, c'est une nouvelle sémantique du vêtement. Chaque fibre est une information, chaque couture est un calcul.
                       </p>
                       <div className="space-y-16">
                          {[
                            { t: "Neural Drafting", d: "Optimisation géométrique par IA pour une adaptation morphologique parfaite sans essayage." },
                            { t: "Sustainable Weave", d: "Suppression totale des chutes de coupe par tissage direct en forme." },
                            { t: "Smart Integration", d: "Fusion invisible des composants électroniques directement au sein de la structure fibreuse." }
                          ].map((step, i) => (
                            <div key={i} className="group flex gap-12 border-b border-white/5 pb-12 hover:border-white/20 transition-all cursor-default">
                               <div className="text-5xl font-light text-white/5 group-hover:text-white/20 transition-colors italic font-serif">0{i+1}</div>
                               <div>
                                  <h5 className="text-2xl font-bold uppercase tracking-tight text-white mb-4 italic group-hover:text-white transition-colors font-serif">{step.t}</h5>
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
        <footer className="bg-black pt-60 pb-12 px-8 md:px-24 relative z-50 font-sans">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-32 mb-60 text-white">
              <div className="lg:col-span-2">
                 <div className="flex items-center gap-4 mb-12">
                    <div className="w-12 h-12 bg-white flex items-center justify-center">
                      <Palette className="w-8 h-8 text-black" />
                    </div>
                    <span className="text-3xl font-light uppercase tracking-tighter italic font-serif">NEURAL<span className="font-bold not-italic">_WEAVER.</span></span>
                 </div>
                 <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.4em] leading-loose max-w-sm mb-16 italic">
                    "La mode est la programmation de la présence." — Archive Weaver V.12
                 </p>
                 <div className="flex gap-12">
                    {["AtelierLog", "FabricRegistry", "GitHub", "X_Protocol"].map(s => (
                      <Link key={s} href="#" className="text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-white transition-colors italic">{s}</Link>
                    ))}
                 </div>
              </div>

              {[
                { t: "TEXTILES", l: ["Smart Silks", "Conductive Mesh", "Adaptive Wool", "Bio Lumens"] },
                { t: "SYSTEMS", l: ["Neural Drafting", "Loom Sync", "Tension Audit", "Waste Zero"] },
                { t: "ATELIERS", l: ["Paris Node", "Tokyo Hub", "Milan Lab", "Zürich Synthesis"] }
              ].map((col, i) => (
                <div key={i} className="flex flex-col gap-12">
                  <h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em] italic">{col.t}</h4>
                  <ul className="flex flex-col gap-6">
                    {col.l.map(link => (
                      <li key={link} className="text-[10px] font-bold text-white/20 hover:text-white transition-colors cursor-pointer uppercase tracking-widest italic">{link}</li>
                    ))}
                  </ul>
                </div>
              ))}
           </div>

           <div className="max-w-[1600px] mx-auto border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-12 text-[8px] font-black text-white/10 uppercase tracking-[0.4em] italic">
              <span>© 2026 NEURAL WEAVER GENERATIVE ATELIER AG. // ALL_RIGHTS_RESERVED</span>
              <div className="flex gap-12">
                 <span>STATUS: WEAVE_NOMINAL</span>
                 <span>ITERATIONS: 12.4M</span>
                 <span>v12.0.1-STABLE</span>
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

function HUD_Overlay({ loomSpeed }: { loomSpeed: number }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-[100] font-sans">
       {/* Corner Brackets */}
       <div className="absolute top-12 left-12 w-16 h-16 border-t border-l border-white/10" />
       <div className="absolute top-12 right-12 w-16 h-16 border-t border-r border-white/10" />
       <div className="absolute bottom-12 left-12 w-16 h-16 border-b border-l border-white/10" />
       <div className="absolute bottom-12 right-12 w-16 h-16 border-b border-r border-white/10" />

       {/* Top Status Bar */}
       <div className="absolute top-12 left-1/2 -translate-x-1/2 flex items-center gap-16 bg-black/40 backdrop-blur-md px-10 py-3 border border-white/5 rounded-full">
          <div className="flex items-center gap-4">
             <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
             <span className="text-[9px] font-black text-white/60 uppercase tracking-[0.2em]">Loom_Speed: {loomSpeed}x // Sync: SECURE</span>
          </div>
          <div className="h-4 w-px bg-white/10" />
          <div className="flex items-center gap-4 text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">
             <Wifi className="w-3 h-3" /> Paris_Relay: Active
          </div>
       </div>

       {/* Right Rotation Info */}
       <div className="absolute right-12 top-1/2 -translate-y-1/2 rotate-90 origin-right hidden lg:block">
          <span className="text-[8px] font-black uppercase tracking-[0.6em] text-white/5 italic">Unauthorized_Duplication_Of_Neural_Patterns_Is_Strictly_Prohibited_By_Atelier_Consortium_Law</span>
       </div>
    </div>
  )
}
