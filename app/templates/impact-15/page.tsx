"use client";

import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, Suspense } from "react";
import Image from "next/image";
import { ArrowUpRight, Menu, X, Layers, ShieldCheck, Plus, Play, ArrowRight, ChevronDown, Monitor, LayoutGrid, Lock, Cpu, Ghost, Eye, Network, Zap, Terminal } from "lucide-react";
import "../premium.css";

// ─── DATA ──────────────────────────────────────────────────────────────────

const DEFENSE_VECTORS = [
  { 
    id: "01",
    title: "PHANTOM_NODES", 
    category: "Network Isolation",
    status: "ACTIVE",
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80",
    desc: "Self-healing network topology that isolates compromised nodes within 200ms of any detection event."
  },
  { 
    id: "02",
    title: "SHADOW_VAULT", 
    category: "Data Integrity",
    status: "ENCRYPTED",
    img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&q=80",
    desc: "Decentralized storage nodes utilizing post-quantum cryptography to protect high-value tactical assets."
  },
  { 
    id: "03",
    title: "ZERO_FOOTPRINT", 
    category: "Covert Ops",
    status: "NOMINAL",
    img: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=1200&q=80",
    desc: "Operational doctrine ensuring all system actions leave no traces in memory, logs, or network traffic."
  }
];

const CAPABILITIES = [
  { icon: ShieldCheck, title: "Neural Defense", desc: "AI-driven countermeasures that adapt to attacker behavior in real-time." },
  { icon: Eye, title: "Deep Recon", desc: "Passive intelligence gathering across surface, deep, and dark web sectors." },
  { icon: Cpu, title: "Quantum Shell", desc: "Encryption layers designed to withstand future quantum-computing based attacks." },
  { icon: Lock, title: "Void Protocol", desc: "Automated self-destruct failsafes for compromised tactical environments." }
];

const LOGS = [
  { time: "02:14:01", event: "SYSTEM_BOOT", status: "OK", detail: "Ghost Shell Kernel v4.2.0 loaded" },
  { time: "02:14:04", event: "NET_SCAN", status: "OK", detail: "Zero-latency mesh established" },
  { time: "02:14:08", event: "VAULT_SYNC", status: "OK", detail: "AES-512-VULCAN keys rotated" },
  { time: "02:14:15", event: "THREAT_DET", status: "NOMINAL", detail: "No unauthorized ingress detected" }
];

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function Reveal({ children, className = "", delay = 0, y = 20 }: { children: React.ReactNode; className?: string; delay?: number; y?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── MAIN SPA ────────────────────────────────────────────────────────────────

export default function GhostShellDefenseSPA() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeVector, setActiveVector] = useState(0);
  const { scrollY } = useScroll();
  
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 800], [1, 1.1]);
  const glitchX = useTransform(scrollY, [0, 1000], [0, 20]);

  return (
    <div className="min-h-screen bg-[#020202] text-[#00ff41] font-mono selection:bg-[#00ff41] selection:text-black">
      
      {/* ── SCANLINE OVERLAY ── */}
      <div className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />

      {/* ── NAVIGATION ── */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-10 mix-blend-difference"
      >
        <div className="flex items-center gap-4">
          <Ghost className="w-10 h-10 text-[#00ff41]" />
          <span className="text-2xl font-black tracking-tighter uppercase italic">GHOST_SHELL<span className="text-[#00ff41]/30">//</span>DEFENSE</span>
        </div>
        
        <div className="hidden lg:flex items-center gap-16 text-[10px] font-bold uppercase tracking-[0.4em] text-[#00ff41]/40">
          {["Vectors", "Capabilities", "Terminal", "Auth"].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-[#00ff41] transition-colors">/{item}</a>
          ))}
        </div>

        <button 
          onClick={() => setMenuOpen(true)}
          className="w-12 h-12 flex flex-col items-center justify-center gap-1.5 group"
        >
          <span className="w-6 h-[2px] bg-[#00ff41] group-hover:w-10 transition-all" />
          <span className="w-10 h-[2px] bg-[#00ff41] group-hover:w-6 transition-all" />
        </button>
      </motion.nav>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[60] bg-[#000] text-[#00ff41] p-12 flex flex-col justify-between"
          >
            <div className="flex justify-between items-center border-b border-[#00ff41]/10 pb-12">
              <span className="text-xl font-black uppercase tracking-[0.4em] italic">GHOST_SHELL//DEFENSE</span>
              <button onClick={() => setMenuOpen(false)} className="w-12 h-12 flex items-center justify-center border border-[#00ff41]/20 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-col gap-12">
              {["DEFENSE VECTORS", "TACTICAL CAPABILITIES", "TERMINAL CONSOLE", "OPERATOR LOGS", "SECURE ACCESS"].map((item, i) => (
                <motion.a 
                  key={item}
                  initial={{ opacity: 0, x: 50 }}
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
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.5em] border-t border-[#00ff41]/10 pt-12">
              <span>ZERO_FOOTPRINT_DOCTRINE</span>
              <span>CLASSIFIED_ENCLAVE // DARK_MESH</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO SECTION ── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale, x: glitchX }}
          className="absolute inset-0 z-0"
        >
          <Image 
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1600&q=80" 
            alt="Hero Cyber" 
            fill 
            className="object-cover grayscale brightness-50 contrast-150 opacity-20" 
            unoptimized 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020202]/40 via-transparent to-[#020202]" />
        </motion.div>

        <div className="relative z-10 text-center px-6">
          <Reveal>
            <span className="text-[10px] font-bold uppercase tracking-[1.5em] text-[#00ff41]/60 mb-12 block">Vulnerability: 0.00%</span>
          </Reveal>
          <Reveal delay={0.2}>
            <h1 className="text-8xl md:text-[16rem] font-black tracking-tighter leading-[0.75] uppercase italic text-white mb-20">
              GO <br/> <span className="not-italic text-[#00ff41]">GHOST.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="max-w-2xl mx-auto flex flex-col items-center gap-16 border-t border-[#00ff41]/10 pt-20">
              <p className="text-[#00ff41]/40 text-xl leading-relaxed font-light uppercase tracking-[0.2em] italic leading-loose text-center">
                The ultimate cyber-defense platform for high-value enclaves. Zero footprint. Zero detection. Absolute integrity.
              </p>
              <div className="flex gap-8">
                <button className="px-16 py-6 bg-[#00ff41] text-black font-black uppercase text-xs tracking-[0.4em] hover:bg-white transition-colors">
                  Initiate_Scan
                </button>
                <button className="px-16 py-6 border border-[#00ff41]/20 text-[#00ff41] font-black uppercase text-xs tracking-[0.4em] hover:bg-[#00ff41]/5 transition-colors">
                  Read_Protocol
                </button>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end text-[10px] font-bold uppercase tracking-[0.5em] text-[#00ff41]/20">
          <div className="flex flex-col gap-2">
            <span>Uptime: 99.9997%</span>
            <div className="w-48 h-[1px] bg-[#00ff41]/20" />
          </div>
          <div className="flex items-center gap-4">
             <span className="animate-pulse">●</span> STATUS: NOMINAL // SESSION_ID: GX-772
          </div>
        </div>
      </section>

      {/* ── VECTORS GRID ── */}
      <section className="py-40 bg-[#050505] relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16">
          <Reveal className="mb-32">
             <div className="flex flex-col lg:flex-row justify-between items-end gap-12 border-b border-[#00ff41]/10 pb-12">
               <h2 className="text-7xl md:text-[10rem] font-black italic tracking-tighter leading-[0.8] uppercase text-white">
                 Defense <br/> <span className="text-[#00ff41] not-italic">Vectors.</span>
               </h2>
               <div className="text-right">
                  <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#00ff41]/40 mb-4 block italic">Audit_Manifest_v4.2</span>
                  <div className="flex gap-4">
                    {DEFENSE_VECTORS.map((_, i) => (
                      <button 
                        key={i} 
                        onClick={() => setActiveVector(i)}
                        className={`w-16 h-1 transition-all ${activeVector === i ? "bg-[#00ff41] w-32" : "bg-[#00ff41]/10"}`}
                      />
                    ))}
                  </div>
               </div>
             </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
            <div className="lg:col-span-8 relative aspect-video rounded-sm overflow-hidden border border-[#00ff41]/10 group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeVector}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image src={DEFENSE_VECTORS[activeVector].img} alt={DEFENSE_VECTORS[activeVector].title} fill className="object-cover grayscale contrast-125 opacity-40 group-hover:opacity-60 transition-opacity duration-1000" unoptimized />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-90" />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="lg:col-span-4 space-y-12">
               <motion.div
                  key={activeVector}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-12"
               >
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#00ff41]">{DEFENSE_VECTORS[activeVector].id} // VECTOR_LOG</span>
                 <h3 className="text-6xl font-black italic uppercase text-white tracking-tighter">{DEFENSE_VECTORS[activeVector].title}</h3>
                 <div className="space-y-6 border-y border-[#00ff41]/10 py-12">
                    <div className="flex justify-between items-center">
                       <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#00ff41]/30">Vector_Category</span>
                       <span className="text-sm font-black text-white uppercase tracking-widest">{DEFENSE_VECTORS[activeVector].category}</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#00ff41]/30">Operational_Status</span>
                       <span className="text-sm font-black text-[#00ff41] uppercase tracking-widest">{DEFENSE_VECTORS[activeVector].status}</span>
                    </div>
                 </div>
                 <p className="text-[#00ff41]/30 text-lg font-light italic leading-loose uppercase tracking-wide">
                   {DEFENSE_VECTORS[activeVector].desc}
                 </p>
                 <button className="flex items-center gap-6 group">
                    <span className="text-[10px] font-bold uppercase tracking-[0.8em] text-[#00ff41]">Audit_Vector</span>
                    <div className="w-16 h-16 border border-[#00ff41]/10 rounded-full flex items-center justify-center group-hover:bg-[#00ff41] transition-all">
                       <ArrowUpRight className="w-6 h-6 text-white" />
                    </div>
                 </button>
               </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES ── */}
      <section className="py-40 bg-black border-y border-[#00ff41]/10">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16">
          <Reveal className="mb-32 text-center">
             <span className="text-[10px] font-bold uppercase tracking-[1em] text-[#00ff41]/40 mb-8 block">Operational Scope</span>
             <h2 className="text-7xl md:text-[10rem] font-black italic tracking-tighter leading-[0.8] uppercase text-white">
                Technical <br/> <span className="text-[#00ff41] not-italic">Prowess.</span>
             </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {CAPABILITIES.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1} className="bg-[#050505] border border-[#00ff41]/5 p-12 hover:border-[#00ff41]/20 transition-all group">
                 <item.icon className="w-12 h-12 text-[#00ff41] mb-12 group-hover:scale-110 transition-transform" />
                 <h3 className="text-2xl font-black italic uppercase text-white mb-6">{item.title}</h3>
                 <p className="text-xs text-[#00ff41]/30 font-light tracking-widest uppercase italic leading-loose">
                   {item.desc}
                 </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TERMINAL LOGS ── */}
      <section className="py-40 bg-[#020202]">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <Reveal>
             <div className="relative aspect-square bg-[#0a0a0a] border border-[#00ff41]/10 p-12 flex flex-col justify-between overflow-hidden group">
                <div className="absolute top-0 right-0 p-12">
                   <Terminal className="w-16 h-16 text-[#00ff41]/5 group-hover:text-[#00ff41]/20 transition-colors" />
                </div>
                <div className="space-y-4">
                   <div className="flex gap-4 border-b border-[#00ff41]/10 pb-4">
                      <span className="w-3 h-3 rounded-full bg-red-500/40" />
                      <span className="w-3 h-3 rounded-full bg-yellow-500/40" />
                      <span className="w-3 h-3 rounded-full bg-[#00ff41]/40" />
                   </div>
                   <div className="space-y-2 font-mono text-[10px] tracking-widest">
                      {LOGS.map((log, i) => (
                         <div key={i} className="flex gap-4">
                            <span className="text-[#00ff41]/30">[{log.time}]</span>
                            <span className="text-[#00ff41]">{log.event}</span>
                            <span className="text-white/20 italic">{log.detail}</span>
                            <span className="ml-auto text-[#00ff41]/60 font-black">{log.status}</span>
                         </div>
                      ))}
                      <motion.div 
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-2 h-4 bg-[#00ff41]"
                      />
                   </div>
                </div>
                <div className="space-y-6">
                   <h3 className="text-4xl font-black italic uppercase text-white">Kernel <br/> <span className="text-[#00ff41] not-italic">Integrity.</span></h3>
                   <p className="text-[#00ff41]/30 text-sm font-light uppercase tracking-widest italic leading-loose">
                     All system actions are verified against the Ghost Shell immutable ledger. Any deviation triggers an immediate Cascade Protocol lockdown.
                   </p>
                </div>
             </div>
          </Reveal>
          <div className="space-y-24">
             <Reveal delay={0.2}>
                <span className="text-[10px] font-bold uppercase tracking-[1em] text-[#00ff41]/40 mb-8 block italic">Operational Doctrine</span>
                <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-none uppercase text-white">Ghost <br/> <span className="text-[#00ff41] not-italic">Protocol.</span></h2>
             </Reveal>
             <div className="space-y-12">
                {[
                  { n: "01", t: "Ingress Scrub", d: "Filtering all incoming traffic through a multi-layered neural scrubbing station." },
                  { n: "02", t: "Shadow Execution", d: "Running tactical processes in encrypted memory-only enclaves." },
                  { n: "03", t: "Trace Erasure", d: "Active byte-level overwriting of all ephemeral session data post-execution." }
                ].map((step, i) => (
                  <Reveal key={step.n} delay={i * 0.1 + 0.3} className="flex gap-12 group border-l border-[#00ff41]/10 pl-8 hover:border-[#00ff41] transition-colors">
                    <span className="text-4xl font-black italic text-[#00ff41]/10 group-hover:text-[#00ff41] transition-colors">{step.n}</span>
                    <div>
                      <h4 className="text-xl font-black uppercase italic text-white mb-2">{step.t}</h4>
                      <p className="text-xs text-[#00ff41]/30 font-light tracking-widest uppercase italic leading-loose">{step.d}</p>
                    </div>
                  </Reveal>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* ── CTA / ACCESS ── */}
      <section className="py-40 bg-[#020202] relative">
         <div className="max-w-[1600px] mx-auto px-8 md:px-16">
            <div className="bg-[#00ff41] text-black p-24 lg:p-40 relative overflow-hidden flex flex-col items-center text-center group">
               <div className="absolute inset-0 opacity-10 grayscale brightness-50 group-hover:opacity-20 transition-opacity">
                  <Image src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1600&q=80" alt="CTA Cyber" fill className="object-cover" />
               </div>
               <Reveal>
                  <span className="text-[10px] font-bold uppercase tracking-[1em] text-black/50 mb-12 block italic">Vetting Required</span>
                  <h2 className="text-7xl md:text-[12rem] font-black italic tracking-tighter leading-[0.8] uppercase mb-16">
                     Initiate <br/> <span className="text-black/30 not-italic">Access.</span>
                  </h2>
                  <div className="flex flex-wrap justify-center gap-8 relative z-10">
                     <button className="px-20 py-8 bg-black text-[#00ff41] font-black uppercase text-sm tracking-[0.5em] hover:italic transition-all">
                        Request_Authorization
                     </button>
                     <button className="px-20 py-8 border border-black/20 text-black font-black uppercase text-sm tracking-[0.5em] hover:bg-black/5 transition-all">
                        Technical_Vault
                     </button>
                  </div>
               </Reveal>
            </div>
         </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-black pt-40 pb-20 px-8 md:px-16 border-t border-[#00ff41]/10">
         <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-32 mb-40">
            <div className="lg:col-span-6">
               <div className="flex items-center gap-4 mb-12">
                 <Ghost className="w-10 h-10 text-[#00ff41]" />
                 <span className="text-3xl font-black tracking-tighter uppercase italic">GHOST_SHELL<span className="text-[#00ff41]/30">//</span>DEFENSE</span>
               </div>
               <p className="text-[#00ff41]/30 text-sm font-light leading-relaxed uppercase tracking-[0.3em] mb-12 italic max-w-md">
                 Securing high-value enclaves through zero-footprint operational doctrine and post-quantum cryptographic synthesis.
               </p>
               <div className="flex gap-12">
                 {["TERMINAL", "NETWORK", "ENCLAVE", "DECRYPT"].map(s => (
                   <a key={s} href="#" className="text-[10px] font-bold hover:text-white text-[#00ff41]/30 transition-colors tracking-[0.5em]">[{s}]</a>
                 ))}
               </div>
            </div>
            
            <div className="lg:col-span-2">
               <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#00ff41]/40 mb-12">System</h4>
               <ul className="space-y-6 text-xs font-bold uppercase tracking-[0.4em]">
                 {["Vectors", "Capabilities", "Terminal", "Protocol"].map(item => (
                   <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
                 ))}
               </ul>
            </div>

            <div className="lg:col-span-4">
               <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#00ff41]/40 mb-12">Access Inquiry</h4>
               <p className="text-sm text-[#00ff41]/20 font-light mb-12 italic uppercase tracking-[0.2em] leading-loose">
                 Vetting is mandatory for all access requests. Ensure your session is encrypted before initiating dialogue.
               </p>
               <a href="mailto:access@ghost-shell.defense" className="text-3xl font-black italic hover:text-white transition-colors block border-b border-[#00ff41]/10 pb-8 uppercase tracking-tighter">
                  access@ghost.shell
               </a>
            </div>
         </div>

         <div className="max-w-[1600px] mx-auto flex flex-col md:row items-center justify-between gap-12 text-[9px] font-bold uppercase tracking-[0.8em] text-[#00ff41]/10 border-t border-[#00ff41]/5 pt-20">
            <p>© 2024 GHOST SHELL SYSTEMS. ALL RIGHTS RESERVED. [CLASSIFIED].</p>
            <div className="flex gap-16">
               <a href="#" className="hover:text-white transition-colors">[Privacy_Scrub]</a>
               <a href="#" className="hover:text-white transition-colors">[Terms_of_Shadow]</a>
            </div>
         </div>
      </footer>
    </div>
  );
}
