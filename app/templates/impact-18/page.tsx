"use client";

import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, Suspense } from "react";
import Image from "next/image";
import { ArrowUpRight, Menu, X, Layers, ShieldCheck, Plus, Play, ArrowRight, ChevronDown, Monitor, LayoutGrid, Cpu, Globe, Zap, Terminal, Activity, Code } from "lucide-react";
import "../premium.css";

// ─── DATA ──────────────────────────────────────────────────────────────────

const MODULES = [
  { 
    id: "01",
    title: "NEURAL_CORE", 
    category: "Edge Computing",
    load: "84%",
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?w=1200&q=80",
    desc: "A distributed intelligence engine capable of processing multi-vector data streams at sub-millisecond latency."
  },
  { 
    id: "02",
    title: "DATA_FLUIDITY", 
    category: "Real-time Mesh",
    load: "62%",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80",
    desc: "Dynamic data routing across a global mesh network, ensuring zero-packet-loss for high-fidelity operations."
  },
  { 
    id: "03",
    title: "SENTINEL_SHIELD", 
    category: "Quantum Security",
    load: "99%",
    img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&q=80",
    desc: "Immutable encryption layers designed to neutralize emerging quantum-based threat vectors."
  }
];

const METRICS = [
  { label: "Throughput", val: "12 PB/s", desc: "Sustained data transfer across our premium fiber backbone." },
  { label: "Availability", val: "99.999%", desc: "High-availability architecture with zero-single-point-of-failure." },
  { label: "Sync_Time", val: "<0.4ms", desc: "Synchronized state management for global concurrent users." }
];

const INTERFACE = [
  { id: "OS.1", title: "Kinetic UI", desc: "Interactive interfaces that respond to user intent with physical fidelity." },
  { id: "OS.2", title: "API_SYNTAX", desc: "Unified development language for seamless hardware-software integration." },
  { id: "OS.3", title: "VOID_SHELL", desc: "A minimalist operating environment designed for absolute developer focus." },
  { id: "OS.4", title: "EDGE_RUNTIME", desc: "Executing complex computations at the physical edge of the network." }
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

export default function FluidOSSPA() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeModule, setActiveModule] = useState(0);
  const { scrollY } = useScroll();
  
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 800], [1, 1.05]);
  const gridX = useTransform(scrollY, [0, 1000], [0, -20]);

  return (
    <div className="min-h-screen bg-[#020205] text-[#e0e0ff] font-mono selection:bg-[#4d4dff] selection:text-white">
      
      {/* ── INTERFACE OVERLAY ── */}
      <div className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="fixed inset-0 z-[0] opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(77,77,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(77,77,255,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      </div>

      {/* ── NAVIGATION ── */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-10 mix-blend-difference"
      >
        <div className="flex items-center gap-4">
          <Activity className="w-10 h-10 text-[#4d4dff]" />
          <span className="text-2xl font-black tracking-tighter uppercase italic">FLUID<span className="text-[#4d4dff]/30">//</span>OS</span>
        </div>
        
        <div className="hidden lg:flex items-center gap-16 text-[10px] font-bold uppercase tracking-[0.4em] text-white/40">
          {["System", "Modules", "Dev_Kit", "Portal"].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-[#4d4dff] transition-colors">/{item}</a>
          ))}
        </div>

        <button 
          onClick={() => setMenuOpen(true)}
          className="px-6 py-2 border border-[#4d4dff]/20 bg-[#4d4dff]/5 backdrop-blur-md text-[10px] font-black uppercase tracking-widest hover:bg-[#4d4dff]/20 transition-all"
        >
          [MENU]
        </button>
      </motion.nav>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-0 z-[60] bg-[#020205] text-[#e0e0ff] p-12 flex flex-col justify-between"
          >
            <div className="flex justify-between items-center border-b border-[#4d4dff]/10 pb-12">
              <span className="text-xl font-black uppercase tracking-tighter italic text-[#4d4dff]">FLUID//OS</span>
              <button onClick={() => setMenuOpen(false)} className="w-12 h-12 flex items-center justify-center border border-[#4d4dff]/20 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-col gap-10">
              {["KERNEL_MANIFEST", "NODE_ARCHIVE", "DEVELOPER_SHELL", "NETWORK_TOPOLOGY", "SECURE_AUTH"].map((item, i) => (
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
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.5em] border-t border-[#4d4dff]/10 pt-12 text-[#4d4dff]/40">
              <span>CORE_v2.4.0_STABLE</span>
              <span>GLOBAL_MESH // ACTIVE</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO SECTION ── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale, x: gridX }}
          className="absolute inset-0 z-0"
        >
          <Image 
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80" 
            alt="Hero Tech" 
            fill 
            className="object-cover grayscale brightness-50 contrast-150 opacity-20" 
            unoptimized 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020205]/40 via-transparent to-[#020205]" />
        </motion.div>

        <div className="relative z-10 text-center px-6">
          <Reveal>
             <div className="flex items-center justify-center gap-4 mb-12">
               <span className="w-12 h-[1px] bg-[#4d4dff]" />
               <span className="text-[10px] font-bold uppercase tracking-[1.5em] text-[#4d4dff]">Reactive_Environment</span>
               <span className="w-12 h-[1px] bg-[#4d4dff]" />
             </div>
          </Reveal>
          <Reveal delay={0.2}>
            <h1 className="text-8xl md:text-[16rem] font-black tracking-tighter leading-[0.75] uppercase italic text-white mb-20">
              FLUID <br/> <span className="not-italic text-[#4d4dff]">FLOW.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="max-w-2xl mx-auto flex flex-col items-center gap-16 border-t border-[#4d4dff]/10 pt-20">
              <p className="text-[#e0e0ff]/40 text-xl leading-relaxed font-light uppercase tracking-[0.2em] italic leading-loose text-center">
                Engineering the next era of creative software enclaves. High-fidelity interfaces built for the speed of human thought.
              </p>
              <div className="flex gap-8">
                <button className="px-16 py-6 bg-[#4d4dff] text-white font-black uppercase text-xs tracking-[0.4em] hover:bg-white hover:text-black transition-all">
                  Launch_Shell
                </button>
                <button className="px-16 py-6 border border-[#4d4dff]/20 text-[#4d4dff] font-black uppercase text-xs tracking-[0.4em] hover:bg-[#4d4dff]/5 transition-colors">
                  Architecture_v2
                </button>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end text-[10px] font-bold uppercase tracking-[0.5em] text-[#4d4dff]/40">
          <div className="flex flex-col gap-2">
            <span>PACKET_LOSS: 0.00%</span>
            <div className="w-48 h-[1px] bg-[#4d4dff]/20" />
          </div>
          <div className="flex items-center gap-4">
             <div className="w-2 h-2 bg-[#4d4dff] rounded-full animate-pulse" /> SYSTEM_STATUS: NOMINAL
          </div>
        </div>
      </section>

      {/* ── METRICS GRID ── */}
      <section className="py-40 bg-[#04040a]">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-[#4d4dff]/10 border border-[#4d4dff]/10">
            {METRICS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1} className="bg-[#020205] p-24 group hover:bg-[#4d4dff]/5 transition-colors">
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#4d4dff]/30 mb-12 block">{s.label}</span>
                <h3 className="text-7xl font-black italic text-white mb-8 group-hover:text-[#4d4dff] transition-colors">{s.val}</h3>
                <p className="text-xs text-[#e0e0ff]/30 font-light tracking-widest uppercase italic leading-loose">
                  {s.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── MODULES SHOWCASE ── */}
      <section className="py-40 bg-black relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16">
          <Reveal className="mb-32">
             <div className="flex flex-col lg:flex-row justify-between items-end gap-12 border-b border-[#4d4dff]/10 pb-12">
               <h2 className="text-7xl md:text-[10rem] font-black italic tracking-tighter leading-[0.8] uppercase text-white">
                 Active <br/> <span className="text-[#4d4dff] not-italic">Nodes.</span>
               </h2>
               <div className="text-right">
                  <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#4d4dff]/30 mb-4 block italic">Module_Audit_Sequence</span>
                  <div className="flex gap-4">
                    {MODULES.map((_, i) => (
                      <button 
                        key={i} 
                        onClick={() => setActiveModule(i)}
                        className={`w-16 h-1 transition-all ${activeModule === i ? "bg-[#4d4dff] w-32" : "bg-[#4d4dff]/10"}`}
                      />
                    ))}
                  </div>
               </div>
             </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
            <div className="lg:col-span-8 relative aspect-video rounded-sm overflow-hidden border border-[#4d4dff]/10 group bg-[#050505]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeModule}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                  className="absolute inset-0"
                >
                  <Image src={MODULES[activeModule].img} alt={MODULES[activeModule].title} fill className="object-cover grayscale contrast-125 opacity-40 group-hover:opacity-60 transition-opacity duration-1000" unoptimized />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                </motion.div>
              </AnimatePresence>
              <div className="absolute bottom-12 left-12 flex flex-col gap-2">
                 <span className="text-[10px] font-bold uppercase tracking-widest text-[#4d4dff]">LOAD_CAPACITY</span>
                 <div className="w-64 h-1 bg-[#4d4dff]/10 relative overflow-hidden">
                    <motion.div 
                      key={activeModule}
                      initial={{ width: 0 }}
                      animate={{ width: MODULES[activeModule].load }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="absolute top-0 left-0 h-full bg-[#4d4dff] shadow-[0_0_15px_#4d4dff]"
                    />
                 </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-12">
               <motion.div
                  key={activeModule}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-12"
               >
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#4d4dff]">{MODULES[activeModule].id} // MODULE_DATA</span>
                 <h3 className="text-6xl font-black italic uppercase text-white tracking-tighter">{MODULES[activeModule].title}</h3>
                 <div className="space-y-6 border-y border-[#4d4dff]/10 py-12">
                    <div className="flex justify-between items-center">
                       <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#4d4dff]/30">Deployment_Category</span>
                       <span className="text-sm font-black text-white uppercase tracking-widest">{MODULES[activeModule].category}</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#4d4dff]/30">Current_Latency</span>
                       <span className="text-sm font-black text-[#4d4dff] uppercase tracking-widest">0.24ms</span>
                    </div>
                 </div>
                 <p className="text-[#e0e0ff]/30 text-lg font-light italic leading-loose uppercase tracking-wide">
                   {MODULES[activeModule].desc}
                 </p>
                 <button className="flex items-center gap-6 group">
                    <span className="text-[10px] font-bold uppercase tracking-[0.8em] text-[#4d4dff]">Deploy_Enclave</span>
                    <div className="w-16 h-16 border border-[#4d4dff]/10 rounded-full flex items-center justify-center group-hover:bg-[#4d4dff] transition-all">
                       <ArrowUpRight className="w-6 h-6 text-white" />
                    </div>
                 </button>
               </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INTERFACE ARCHITECTURE ── */}
      <section className="py-40 bg-[#04040a] border-y border-[#4d4dff]/10">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16">
          <Reveal className="mb-32 text-center">
             <span className="text-[10px] font-bold uppercase tracking-[1em] text-[#4d4dff]/40 mb-8 block">Tectonic Layering</span>
             <h2 className="text-7xl md:text-[10rem] font-black italic tracking-tighter leading-[0.8] uppercase text-white">
                Core <br/> <span className="text-[#4d4dff] not-italic">Interface.</span>
             </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {INTERFACE.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1} className="bg-[#020205] border border-[#4d4dff]/5 p-12 hover:border-[#4d4dff]/20 transition-all group">
                 <span className="text-xs font-black italic text-[#4d4dff] mb-8 block">{item.id}</span>
                 <h3 className="text-2xl font-black italic uppercase text-white mb-6">{item.title}</h3>
                 <p className="text-xs text-[#e0e0ff]/30 font-light tracking-widest uppercase italic leading-loose">
                   {item.desc}
                 </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEV CONSOLE / SHELL ── */}
      <section className="py-40 bg-black overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <Reveal>
             <div className="relative aspect-square bg-[#050505] border border-[#4d4dff]/10 p-12 flex flex-col justify-between overflow-hidden group">
                <div className="absolute top-0 right-0 p-12">
                   <Terminal className="w-16 h-16 text-[#4d4dff]/5 group-hover:text-[#4d4dff]/10 transition-colors" />
                </div>
                <div className="space-y-4">
                   <div className="flex gap-4 border-b border-[#4d4dff]/10 pb-4">
                      <div className="w-3 h-3 rounded-full bg-[#4d4dff]/20" />
                      <div className="w-3 h-3 rounded-full bg-[#4d4dff]/20" />
                      <div className="w-3 h-3 rounded-full bg-[#4d4dff]/20" />
                   </div>
                   <div className="font-mono text-[10px] space-y-2 text-[#4d4dff]/60">
                      <p>$ fluid-os initiate --shell</p>
                      <p className="text-white/40">{">"} Core_v2.4.0 verified</p>
                      <p className="text-white/40">{">"} Mesh_topology active</p>
                      <p className="text-white/40">{">"} Deploying neural_enclave...</p>
                      <motion.div 
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-2 h-4 bg-[#4d4dff]"
                      />
                   </div>
                </div>
                <div className="space-y-8">
                   <h3 className="text-5xl font-black italic uppercase text-white">Developer <br/> <span className="text-[#4d4dff] not-italic">Enclave.</span></h3>
                   <p className="text-[#e0e0ff]/30 text-lg leading-relaxed mb-12 font-light uppercase tracking-wide italic leading-loose">
                     A unified shell environment for the high-fidelity orchestration of distributed data enclaves. Built for those who build the future.
                   </p>
                </div>
             </div>
          </Reveal>
          <div className="space-y-24">
             <Reveal delay={0.2}>
                <span className="text-[10px] font-bold uppercase tracking-[1em] text-[#4d4dff]/40 mb-8 block italic">Protocol_Sequence</span>
                <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-none uppercase text-white">System <br/> <span className="text-[#4d4dff] not-italic">Logic.</span></h2>
             </Reveal>
             <div className="space-y-12">
                {[
                  { n: "01", t: "Mesh Synapse", d: "Connecting disparate data nodes into a unified reactive environment." },
                  { n: "02", t: "Entropy Zero", d: "Aggressive reduction of system noise for absolute computational clarity." },
                  { n: "03", t: "Fidelity Push", d: "Delivering high-fidelity visual and data outputs across all edge nodes." }
                ].map((step, i) => (
                  <Reveal key={step.n} delay={i * 0.1 + 0.3} className="flex gap-12 group border-l border-[#4d4dff]/10 pl-8 hover:border-[#4d4dff] transition-colors">
                    <span className="text-4xl font-black italic text-[#4d4dff]/10 group-hover:text-[#4d4dff] transition-colors">{step.n}</span>
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
      <section className="py-40 bg-[#020205] relative">
         <div className="max-w-[1600px] mx-auto px-8 md:px-16">
            <div className="bg-[#4d4dff] text-white p-24 lg:p-40 relative overflow-hidden flex flex-col items-center text-center group">
               <div className="absolute inset-0 opacity-10 grayscale brightness-50 group-hover:opacity-20 transition-opacity">
                  <Image src="https://images.unsplash.com/photo-1558494949-ef010cbdcc51?w=1600&q=80" alt="CTA OS" fill className="object-cover" />
               </div>
               <Reveal>
                  <span className="text-[10px] font-bold uppercase tracking-[1em] text-white/50 mb-12 block italic">Authorization_Required</span>
                  <h2 className="text-7xl md:text-[12rem] font-black italic tracking-tighter leading-[0.8] uppercase mb-16">
                     Enter <br/> <span className="text-white/30 not-italic">The Mesh.</span>
                  </h2>
                  <div className="flex flex-wrap justify-center gap-12 relative z-10">
                     <button className="px-20 py-8 bg-white text-black font-black uppercase text-sm tracking-[0.5em] hover:italic transition-all">
                        Request_Access
                     </button>
                     <button className="px-20 py-8 border border-white/20 text-white font-black uppercase text-sm tracking-[0.5em] hover:bg-white/5 transition-all">
                        API_Dossier
                     </button>
                  </div>
               </Reveal>
            </div>
         </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-black pt-40 pb-20 px-8 md:px-16 border-t border-[#4d4dff]/10">
         <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-32 mb-40">
            <div className="lg:col-span-6">
               <div className="flex items-center gap-4 mb-12">
                 <Activity className="w-10 h-10 text-[#4d4dff]" />
                 <span className="text-3xl font-black tracking-tighter uppercase italic">FLUID<span className="text-[#4d4dff]/30">//</span>OS</span>
               </div>
               <p className="text-[#e0e0ff]/20 text-sm font-light leading-relaxed uppercase tracking-[0.3em] mb-12 italic max-w-md">
                 Designing the next era of creative software enclaves through distributed intelligence and high-fidelity interfaces.
               </p>
               <div className="flex gap-12">
                 {["GITHUB", "TWITTER", "DISCORD", "LINKEDIN"].map(s => (
                   <a key={s} href="#" className="text-[10px] font-bold hover:text-white text-[#4d4dff]/30 transition-colors tracking-[0.5em]">[{s}]</a>
                 ))}
               </div>
            </div>
            
            <div className="lg:col-span-2">
               <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#4d4dff]/40 mb-12">System</h4>
               <ul className="space-y-6 text-xs font-bold uppercase tracking-[0.4em]">
                 {["Kernel", "Modules", "Dev_Kit", "Journal"].map(item => (
                   <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
                 ))}
               </ul>
            </div>

            <div className="lg:col-span-4">
               <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#4d4dff]/40 mb-12">Support Inquiry</h4>
               <p className="text-sm text-[#e0e0ff]/20 font-light mb-12 italic uppercase tracking-[0.2em] leading-loose">
                 For high-priority enclaves, API integrations, or architectural consultations, contact our core command center.
               </p>
               <a href="mailto:core@fluid-os.io" className="text-3xl font-black italic hover:text-white transition-colors block border-b border-[#4d4dff]/10 pb-8 uppercase tracking-tighter">
                  core@fluid-os.io
               </a>
            </div>
         </div>

         <div className="max-w-[1600px] mx-auto flex flex-col md:row items-center justify-between gap-12 text-[9px] font-bold uppercase tracking-[0.8em] text-[#4d4dff]/10 border-t border-[#4d4dff]/5 pt-20">
            <p>© 2024 FLUID OS SYSTEMS. ALL RIGHTS RESERVED. GLOBAL // MESH.</p>
            <div className="flex gap-16">
               <a href="#" className="hover:text-white transition-colors">[Kernel_Vault]</a>
               <a href="#" className="hover:text-white transition-colors">[Terms_of_Service]</a>
            </div>
         </div>
      </footer>
    </div>
  );
}
