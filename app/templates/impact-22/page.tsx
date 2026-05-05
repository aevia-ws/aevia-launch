"use client";

import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, Suspense } from "react";
import Image from "next/image";
import { ArrowUpRight, Menu, X, Layers, ShieldCheck, Plus, Play, ArrowRight, ChevronDown, Monitor, LayoutGrid, Activity, Cpu, Globe, Zap, Terminal, Code, Box, Anchor, Minimize2 } from "lucide-react";
import "../premium.css";

// ─── DATA ──────────────────────────────────────────────────────────────────

const COLUMNS = [
  { 
    id: "KERNEL",
    title: "CORE_LOGIC", 
    category: "System Base",
    load: "84%",
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?w=1200&q=80",
    desc: "The primary computational layer managing all distributed enclaves and neural data routing."
  },
  { 
    id: "MESH",
    title: "FLUID_NET", 
    category: "Connectivity",
    load: "62%",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80",
    desc: "Planetary-scale mesh networking providing sub-millisecond sync across 42+ global data enclaves."
  },
  { 
    id: "SHELL",
    title: "VOID_UI", 
    category: "Interface",
    load: "99%",
    img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&q=80",
    desc: "A high-fidelity minimalist operating environment designed for absolute developer precision."
  }
];

const SPECS = [
  { label: "Sync_Latency", val: "<0.4ms", desc: "Real-time state synchronization across all global kernel nodes." },
  { label: "Throughput", val: "12 PB/s", desc: "Sustainable data flow through our dedicated multi-vector backbone." },
  { label: "Uptime_SLA", val: "99.999%", desc: "Immutable uptime guaranteed by redundant orbital compute enclaves." }
];

const ARCHITECTURE = [
  { id: "SYS.1", title: "Kinetic Routing", desc: "Dynamic packet pathing based on real-time neural network stress." },
  { id: "SYS.2", title: "API_SYNTAX", desc: "Unified development language for seamless hardware-software synthesis." },
  { id: "SYS.3", title: "Void_Runtime", desc: "A clean-room execution environment designed for zero-leak operations." },
  { id: "SYS.4", title: "Edge_Orchestra", desc: "Coordinating 100k+ edge nodes into a singular harmonic compute body." }
];

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function Reveal({ children, className = "", delay = 0, y = 30 }: { children: React.ReactNode; className?: string; delay?: number; y?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay, ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── MAIN SPA ────────────────────────────────────────────────────────────────

export default function SplitOSSPA() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCol, setActiveCol] = useState(0);
  const { scrollY } = useScroll();
  
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 800], [1, 1.05]);
  const splitX = useTransform(scrollY, [0, 1000], [0, 50]);

  return (
    <div className="min-h-screen bg-[#04040a] text-[#e0e0ff] font-mono selection:bg-[#ff3b3b] selection:text-white">
      
      {/* ── INTERFACE OVERLAY ── */}
      <div className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="fixed inset-0 z-[0] opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(255,59,59,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,59,59,0.1) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      </div>

      {/* ── NAVIGATION ── */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-10 mix-blend-difference"
      >
        <div className="flex items-center gap-4">
          <Activity className="w-10 h-10 text-[#ff3b3b]" />
          <span className="text-2xl font-black tracking-tighter uppercase italic text-white">SPLIT<span className="text-[#ff3b3b]/30">//</span>OS</span>
        </div>
        
        <div className="hidden lg:flex items-center gap-16 text-[10px] font-bold uppercase tracking-[0.4em] text-white/40">
          {["Kernel", "Mesh", "Shell", "Portal"].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-[#ff3b3b] transition-colors">/{item}</a>
          ))}
        </div>

        <button 
          onClick={() => setMenuOpen(true)}
          className="px-6 py-2 border border-[#ff3b3b]/20 bg-[#ff3b3b]/5 backdrop-blur-md text-[10px] font-black uppercase tracking-widest hover:bg-[#ff3b3b]/20 transition-all text-white"
        >
          [SYSTEM_MENU]
        </button>
      </motion.nav>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-0 z-[60] bg-[#04040a] text-[#e0e0ff] p-12 flex flex-col justify-between"
          >
            <div className="flex justify-between items-center border-b border-[#ff3b3b]/10 pb-12">
              <span className="text-xl font-black uppercase tracking-tighter italic text-[#ff3b3b]">SPLIT//OS</span>
              <button onClick={() => setMenuOpen(false)} className="w-12 h-12 flex items-center justify-center border border-[#ff3b3b]/20 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-col gap-10">
              {["KERNEL_MANIFEST", "MESH_ARCHIVE", "SHELL_TERMINAL", "NETWORK_TOPOLOGY", "SECURE_AUTH"].map((item, i) => (
                <motion.a 
                  key={item}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  href="#"
                  className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter hover:text-white transition-all leading-none"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </motion.a>
              ))}
            </div>
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.5em] border-t border-[#ff3b3b]/10 pt-12 text-[#ff3b3b]/40">
              <span>CORE_v4.2.0_STABLE</span>
              <span>GLOBAL_MESH // ACTIVE</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO SECTION ── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale, x: splitX }}
          className="absolute inset-0 z-0"
        >
          <Image 
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1600&q=80" 
            alt="Hero OS" 
            fill 
            className="object-cover grayscale brightness-50 contrast-125 opacity-20" 
            unoptimized 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#04040a]" />
        </motion.div>

        <div className="relative z-10 text-center px-6">
          <Reveal>
             <div className="flex items-center justify-center gap-4 mb-12">
               <span className="w-12 h-[1px] bg-[#ff3b3b]" />
               <span className="text-[10px] font-bold uppercase tracking-[1.5em] text-[#ff3b3b]">Distributed_Intelligence</span>
               <span className="w-12 h-[1px] bg-[#ff3b3b]" />
             </div>
          </Reveal>
          <Reveal delay={0.2}>
            <h1 className="text-8xl md:text-[16rem] font-black tracking-tighter leading-[0.75] uppercase italic text-white mb-20">
              SPLIT <br/> <span className="not-italic text-[#ff3b3b]">CORE.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="max-w-2xl mx-auto flex flex-col items-center gap-16 border-t border-[#ff3b3b]/10 pt-20">
              <p className="text-[#e0e0ff]/40 text-xl leading-relaxed font-light uppercase tracking-[0.2em] italic leading-loose text-center">
                Engineering the ultimate creative software enclaves through distributed data orchestration. High-fidelity systems built for absolute precision.
              </p>
              <div className="flex gap-8">
                <button className="px-16 py-6 bg-[#ff3b3b] text-white font-black uppercase text-xs tracking-[0.4em] hover:bg-white hover:text-black transition-all">
                  Launch_Enclave
                </button>
                <button className="px-16 py-6 border border-[#ff3b3b]/20 text-[#ff3b3b] font-black uppercase text-xs tracking-[0.4em] hover:bg-[#ff3b3b]/5 transition-colors">
                  System_Specs
                </button>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end text-[10px] font-bold uppercase tracking-[0.5em] text-[#ff3b3b]/40">
          <div className="flex flex-col gap-2">
            <span>PACKET_SYN_v2</span>
            <div className="w-48 h-[1px] bg-[#ff3b3b]/20" />
          </div>
          <div className="flex items-center gap-4 italic tracking-widest">
             <div className="w-2 h-2 bg-[#ff3b3b] rounded-full animate-pulse" /> CORE_STATUS: NOMINAL
          </div>
        </div>
      </section>

      {/* ── SPECS GRID ── */}
      <section className="py-40 bg-[#06060f]">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-[#ff3b3b]/10 border border-[#ff3b3b]/10">
            {SPECS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1} className="bg-[#04040a] p-24 group hover:bg-[#ff3b3b]/5 transition-colors">
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#ff3b3b]/30 mb-12 block group-hover:text-[#ff3b3b]">{s.label}</span>
                <h3 className="text-7xl font-black italic text-white mb-8 group-hover:text-[#ff3b3b] transition-colors">{s.val}</h3>
                <p className="text-xs text-[#e0e0ff]/30 font-light tracking-widest uppercase italic leading-loose">
                  {s.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPLIT COLUMNS SHOWCASE ── */}
      <section className="py-40 bg-black relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16">
          <Reveal className="mb-32">
             <div className="flex flex-col lg:flex-row justify-between items-end gap-12 border-b border-[#ff3b3b]/10 pb-12">
               <h2 className="text-7xl md:text-[10rem] font-black italic tracking-tighter leading-[0.8] uppercase text-white">
                 System <br/> <span className="text-[#ff3b3b] not-italic">Nodes.</span>
               </h2>
               <div className="text-right">
                  <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#ff3b3b]/30 mb-4 block italic">Module_Sequence_v4</span>
                  <div className="flex gap-4">
                    {COLUMNS.map((_, i) => (
                      <button 
                        key={i} 
                        onClick={() => setActiveCol(i)}
                        className={`w-16 h-1 transition-all ${activeCol === i ? "bg-[#ff3b3b] w-32" : "bg-[#ff3b3b]/10"}`}
                      />
                    ))}
                  </div>
               </div>
             </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
            <div className="lg:col-span-8 relative aspect-video rounded-sm overflow-hidden border border-[#ff3b3b]/10 group bg-[#08080f]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCol}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                  className="absolute inset-0"
                >
                  <Image src={COLUMNS[activeCol].img} alt={COLUMNS[activeCol].title} fill className="object-cover grayscale contrast-125 opacity-40 group-hover:opacity-60 transition-opacity duration-1000" unoptimized />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                </motion.div>
              </AnimatePresence>
              <div className="absolute bottom-12 left-12 flex flex-col gap-2">
                 <span className="text-[10px] font-bold uppercase tracking-widest text-[#ff3b3b]">LOAD_STATUS</span>
                 <div className="w-64 h-1 bg-[#ff3b3b]/10 relative overflow-hidden">
                    <motion.div 
                      key={activeCol}
                      initial={{ width: 0 }}
                      animate={{ width: COLUMNS[activeCol].load }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="absolute top-0 left-0 h-full bg-[#ff3b3b] shadow-[0_0_15px_#ff3b3b]"
                    />
                 </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-12">
               <motion.div
                  key={activeCol}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-12"
               >
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#ff3b3b]">{COLUMNS[activeCol].id} // SYSTEM_DATA</span>
                 <h3 className="text-6xl font-black italic uppercase text-white tracking-tighter">{COLUMNS[activeCol].title}</h3>
                 <div className="space-y-6 border-y border-[#ff3b3b]/10 py-12">
                    <div className="flex justify-between items-center">
                       <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#ff3b3b]/30">Deployment_Category</span>
                       <span className="text-sm font-black text-white uppercase tracking-widest">{COLUMNS[activeCol].category}</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#ff3b3b]/30">Node_Stability</span>
                       <span className="text-sm font-black text-[#ff3b3b] uppercase tracking-widest">99.8%</span>
                    </div>
                 </div>
                 <p className="text-[#e0e0ff]/30 text-lg font-light italic leading-loose uppercase tracking-wide">
                   {COLUMNS[activeCol].desc}
                 </p>
                 <button className="flex items-center gap-6 group">
                    <span className="text-[10px] font-bold uppercase tracking-[0.8em] text-[#ff3b3b]">Access_Node</span>
                    <div className="w-16 h-16 border border-[#ff3b3b]/10 rounded-full flex items-center justify-center group-hover:bg-[#ff3b3b] transition-all">
                       <ArrowUpRight className="w-6 h-6 text-white" />
                    </div>
                 </button>
               </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ARCHITECTURE ── */}
      <section className="py-40 bg-[#06060f] border-y border-[#ff3b3b]/10">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16">
          <Reveal className="mb-32 text-center">
             <span className="text-[10px] font-bold uppercase tracking-[1em] text-[#ff3b3b]/40 mb-8 block italic">System Topology</span>
             <h2 className="text-7xl md:text-[10rem] font-black italic tracking-tighter leading-[0.8] uppercase text-white">
                Core <br/> <span className="text-[#ff3b3b] not-italic">Infrastructure.</span>
             </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ARCHITECTURE.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1} className="bg-[#04040a] border border-[#ff3b3b]/5 p-12 hover:border-[#ff3b3b]/20 transition-all group">
                 <span className="text-xs font-black italic text-[#ff3b3b] mb-8 block">{item.id}</span>
                 <h3 className="text-2xl font-black italic uppercase text-white mb-6">{item.title}</h3>
                 <p className="text-xs text-[#e0e0ff]/30 font-light tracking-widest uppercase italic leading-loose">
                   {item.desc}
                 </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TERMINAL / SHELL ── */}
      <section className="py-40 bg-black overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <Reveal>
             <div className="relative aspect-square bg-[#08080f] border border-[#ff3b3b]/10 p-12 flex flex-col justify-between overflow-hidden group">
                <div className="absolute top-0 right-0 p-12">
                   <Terminal className="w-16 h-16 text-[#ff3b3b]/5 group-hover:text-[#ff3b3b]/10 transition-colors" />
                </div>
                <div className="space-y-4">
                   <div className="flex gap-4 border-b border-[#ff3b3b]/10 pb-4">
                      <div className="w-3 h-3 rounded-full bg-[#ff3b3b]/20" />
                      <div className="w-3 h-3 rounded-full bg-[#ff3b3b]/20" />
                      <div className="w-3 h-3 rounded-full bg-[#ff3b3b]/20" />
                   </div>
                   <div className="font-mono text-[10px] space-y-2 text-[#ff3b3b]/60">
                      <p>$ split-os initiate --shell</p>
                      <p className="text-white/40">{">"} Kernel_v4.2.0 verified</p>
                      <p className="text-white/40">{">"} Distributed_sync active</p>
                      <p className="text-white/40">{">"} Orchestrating global nodes...</p>
                      <motion.div 
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-2 h-4 bg-[#ff3b3b]"
                      />
                   </div>
                </div>
                <div className="space-y-8">
                   <h3 className="text-5xl font-black italic uppercase text-white">System <br/> <span className="text-[#ff3b3b] not-italic">Enclave.</span></h3>
                   <p className="text-[#e0e0ff]/30 text-lg leading-relaxed mb-12 font-light uppercase tracking-wide italic leading-loose">
                     A unified shell environment for the high-fidelity orchestration of planetary-scale data enclaves. Built for those who build the systems.
                   </p>
                </div>
             </div>
          </Reveal>
          <div className="space-y-24">
             <Reveal delay={0.2}>
                <span className="text-[10px] font-bold uppercase tracking-[1em] text-[#ff3b3b]/40 mb-8 block italic">Protocol_Sequence</span>
                <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-none uppercase text-white">Logic <br/> <span className="text-[#ff3b3b] not-italic">Synthesis.</span></h2>
             </Reveal>
             <div className="space-y-12">
                {[
                  { n: "01", t: "Mesh Synapse", d: "Connecting disparate data nodes into a unified reactive environment." },
                  { n: "02", t: "Entropy Zero", d: "Aggressive reduction of system noise for absolute computational clarity." },
                  { n: "03", t: "Fidelity Push", d: "Delivering high-fidelity visual and data outputs across all edge nodes." }
                ].map((step, i) => (
                  <Reveal key={step.n} delay={i * 0.1 + 0.3} className="flex gap-12 group border-l border-[#ff3b3b]/10 pl-8 hover:border-[#ff3b3b] transition-colors">
                    <span className="text-4xl font-black italic text-[#ff3b3b]/10 group-hover:text-[#ff3b3b] transition-colors">{step.n}</span>
                    <div>
                      <h4 className="text-xl font-black uppercase italic text-white mb-2">{step.t}</h4>
                      <p className="text-xs text-[#e0e0ff]/30 font-light tracking-widest uppercase italic leading-loose">{step.d}</p>
                    </div>
                  </Reveal>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* ── CTA / ACCESS ── */}
      <section className="py-40 bg-[#04040a] relative">
         <div className="max-w-[1600px] mx-auto px-8 md:px-16">
            <div className="bg-[#ff3b3b] text-white p-24 lg:p-40 relative overflow-hidden flex flex-col items-center text-center group">
               <div className="absolute inset-0 opacity-10 grayscale brightness-50 group-hover:opacity-20 transition-opacity">
                  <Image src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1600&q=80" alt="CTA OS" fill className="object-cover" />
               </div>
               <Reveal>
                  <span className="text-[10px] font-bold uppercase tracking-[1em] text-white/50 mb-12 block italic">Authorization_Required</span>
                  <h2 className="text-7xl md:text-[12rem] font-black italic tracking-tighter leading-[0.8] uppercase mb-16">
                     Initiate <br/> <span className="text-white/30 not-italic">The Shell.</span>
                  </h2>
                  <div className="flex flex-wrap justify-center gap-12 relative z-10">
                     <button className="px-20 py-8 bg-white text-black font-black uppercase text-sm tracking-[0.5em] hover:italic transition-all">
                        Request_Access
                     </button>
                     <button className="px-20 py-8 border border-white/20 text-white font-black uppercase text-sm tracking-[0.5em] hover:bg-white/5 transition-all">
                        System_Dossier
                     </button>
                  </div>
               </Reveal>
            </div>
         </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-black pt-40 pb-20 px-8 md:px-16 border-t border-[#ff3b3b]/10">
         <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-32 mb-40">
            <div className="lg:col-span-6">
               <div className="flex items-center gap-4 mb-12">
                 <Activity className="w-10 h-10 text-[#ff3b3b]" />
                 <span className="text-3xl font-black tracking-tighter uppercase italic text-white">SPLIT<span className="text-[#ff3b3b]/30">//</span>OS</span>
               </div>
               <p className="text-[#e0e0ff]/20 text-sm font-light leading-relaxed uppercase tracking-[0.3em] mb-12 italic max-w-md">
                 Securing the future of distributed systems through high-fidelity orchestration and radical computational clarity.
               </p>
               <div className="flex gap-12">
                 {["GITHUB", "TWITTER", "DISCORD", "LINKEDIN"].map(s => (
                   <a key={s} href="#" className="text-[10px] font-bold hover:text-white text-[#ff3b3b]/30 transition-colors tracking-[0.5em]">[{s}]</a>
                 ))}
               </div>
            </div>
            
            <div className="lg:col-span-2">
               <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#ff3b3b]/40 mb-12">Systems</h4>
               <ul className="space-y-6 text-xs font-bold uppercase tracking-[0.4em]">
                 {["Kernel", "Mesh", "Shell", "Journal"].map(item => (
                   <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
                 ))}
               </ul>
            </div>

            <div className="lg:col-span-4">
               <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#ff3b3b]/40 mb-12">Support Inquiry</h4>
               <p className="text-sm text-[#e0e0ff]/20 font-light mb-12 italic uppercase tracking-[0.2em] leading-loose">
                 For high-priority enclaves, API integrations, or architectural consultations, contact our core command center.
               </p>
               <a href="mailto:ops@split-os.io" className="text-3xl font-black italic hover:text-white transition-colors block border-b border-[#ff3b3b]/10 pb-8 uppercase tracking-tighter">
                  ops@split-os.io
               </a>
            </div>
         </div>

         <div className="max-w-[1600px] mx-auto flex flex-col md:row items-center justify-between gap-12 text-[9px] font-bold uppercase tracking-[0.8em] text-[#ff3b3b]/10 border-t border-[#ff3b3b]/5 pt-20">
            <p>© 2024 SPLIT OS SYSTEMS. ALL RIGHTS RESERVED. GLOBAL // MESH.</p>
            <div className="flex gap-16">
               <a href="#" className="hover:text-white transition-colors">[Kernel_Vault]</a>
               <a href="#" className="hover:text-white transition-colors">[Terms_of_Service]</a>
            </div>
         </div>
      </footer>
    </div>
  );
}
