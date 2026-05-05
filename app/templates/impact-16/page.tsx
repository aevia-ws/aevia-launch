"use client";

import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, Suspense } from "react";
import Image from "next/image";
import { ArrowUpRight, Menu, X, Layers, ShieldCheck, Plus, Play, ArrowRight, ChevronDown, Monitor, LayoutGrid, Sun, Moon, Zap, Eye, Camera } from "lucide-react";
import "../premium.css";

// ─── DATA ──────────────────────────────────────────────────────────────────

const EXHIBITIONS = [
  { 
    id: "01",
    title: "NEO_PHOTON", 
    category: "Atmospheric Installation",
    year: "2024",
    img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80",
    desc: "A generative light sculpture utilizing high-intensity laser arrays and synchronized atmospheric fog enclaves."
  },
  { 
    id: "02",
    title: "VOID_CHROMA", 
    category: "Digital Immersion",
    year: "2023",
    img: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=1200&q=80",
    desc: "Exploration of zero-light environments punctuated by single-pixel emission nodes in a vacuum chamber."
  },
  { 
    id: "03",
    title: "SILENT_BEAMS", 
    category: "Cinematic Research",
    year: "2024",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80",
    desc: "Documenting the interaction of architectural geometry and shifting solar angles in a brutalist monument."
  }
];

const METRICS = [
  { label: "Luminance", val: "1.2M nits", desc: "Peak brightness achieved via proprietary xenon-injection modules." },
  { label: "Fidelity", val: "12-bit RAW", desc: "Total color gamut coverage within the atmospheric spectrum." },
  { label: "Latency", val: "<0.1ms", desc: "Synchronized photon response for real-time spatial mapping." }
];

const ARCHIVE = [
  { id: "A", title: "Photon Synthesis", desc: "Computational light design for large-scale urban interventions." },
  { id: "B", title: "Atmospheric Logic", desc: "Simulating weather systems within contained architectural volumes." },
  { id: "C", title: "Cinematic Audit", desc: "High-fidelity lighting strategy for premium motion picture enclaves." },
  { id: "D", title: "Neural Optics", desc: "Shaping light to influence psychological spatial perception." }
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
      transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── MAIN SPA ────────────────────────────────────────────────────────────────

export default function LuminaArchiveSPA() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeExhibition, setActiveExhibition] = useState(0);
  const { scrollY } = useScroll();
  
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 800], [1, 1.1]);
  const beamRotate = useTransform(scrollY, [0, 1000], [0, 45]);

  return (
    <div className="min-h-screen bg-[#050505] text-[#f8fafc] font-sans selection:bg-white selection:text-black">
      
      {/* ── LIGHT BEAM OVERLAY ── */}
      <motion.div 
        style={{ rotate: beamRotate }}
        className="fixed top-[-20%] left-[-20%] w-[140%] h-[140%] z-[0] pointer-events-none opacity-20"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)]" />
        <div className="absolute top-[10%] left-[50%] w-[1px] h-[80%] bg-gradient-to-b from-transparent via-white/40 to-transparent blur-md" />
        <div className="absolute top-[30%] left-[20%] w-[1px] h-[50%] bg-gradient-to-b from-transparent via-white/20 to-transparent blur-sm" />
      </motion.div>

      {/* ── NAVIGATION ── */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-10 mix-blend-difference"
      >
        <div className="flex items-center gap-4">
          <Sun className="w-10 h-10 text-white animate-pulse" />
          <span className="text-2xl font-black tracking-tighter uppercase italic">LUMINA<span className="text-white/30">//</span>ARCHIVE</span>
        </div>
        
        <div className="hidden lg:flex items-center gap-16 text-[10px] font-bold uppercase tracking-[0.5em] text-white/40">
          {["Manifest", "Archive", "Optics", "Inquiry"].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors">/{item}</a>
          ))}
        </div>

        <button 
          onClick={() => setMenuOpen(true)}
          className="w-16 h-16 flex items-center justify-center border border-white/10 rounded-full group"
        >
          <Menu className="w-6 h-6 group-hover:rotate-90 transition-transform" />
        </button>
      </motion.nav>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[60] bg-[#000] text-white p-12 flex flex-col justify-between"
          >
            <div className="flex justify-between items-center border-b border-white/5 pb-12">
              <span className="text-xl font-black uppercase tracking-tighter italic">LUMINA//ARCHIVE</span>
              <button onClick={() => setMenuOpen(false)} className="w-12 h-12 flex items-center justify-center border border-white/10 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-col gap-12">
              {["THE MANIFEST", "RESEARCH ARCHIVE", "NEURAL OPTICS", "CULTURAL SYNTHESIS", "INQUIRY"].map((item, i) => (
                <motion.a 
                  key={item}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  href="#"
                  className="text-6xl md:text-9xl font-black uppercase italic tracking-tighter hover:text-white transition-all leading-none"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </motion.a>
              ))}
            </div>
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.5em] border-t border-white/5 pt-12">
              <span>ATMOSPHERIC INTELLIGENCE</span>
              <span>EST. 2012 // TOKYO</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO SECTION ── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="absolute inset-0 z-0"
        >
          <Image 
            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1600&q=80" 
            alt="Hero Light" 
            fill 
            className="object-cover grayscale brightness-50 opacity-30" 
            unoptimized 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-transparent to-[#050505]" />
        </motion.div>

        <div className="relative z-10 text-center px-6">
          <Reveal>
            <span className="text-[10px] font-bold uppercase tracking-[2em] text-white/40 mb-12 block">Absolute Luminosity</span>
          </Reveal>
          <Reveal delay={0.2}>
            <h1 className="text-8xl md:text-[16rem] font-black tracking-tighter leading-[0.75] uppercase italic text-white mb-20">
              PURE <br/> <span className="not-italic text-white/20">PHOTON.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="max-w-2xl mx-auto flex flex-col items-center gap-16 border-t border-white/10 pt-20">
              <p className="text-white/40 text-xl leading-relaxed font-light uppercase tracking-[0.3em] italic leading-loose text-center">
                Engineering the ultimate atmospheric interventions. Where computational light design meets ancestral spatial logic.
              </p>
              <div className="flex gap-8">
                <button className="px-16 py-6 bg-white text-black font-black uppercase text-xs tracking-[0.4em] hover:bg-white/90 transition-colors">
                  Explore_Archive
                </button>
                <button className="px-16 py-6 border border-white/20 text-white font-black uppercase text-xs tracking-[0.4em] hover:bg-white/5 transition-colors">
                  Technical_Specs
                </button>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end text-[10px] font-bold uppercase tracking-[0.5em] text-white/20">
          <div className="flex flex-col gap-2">
            <span>GMT_+9_TOKYO</span>
            <div className="w-48 h-[1px] bg-white/10" />
          </div>
          <div className="flex items-center gap-4">
             <Moon className="w-4 h-4" /> DARK_MODE: ENGAGED
          </div>
        </div>
      </section>

      {/* ── METRICS ── */}
      <section className="py-40 bg-[#050505]">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-white/5 border border-white/5">
            {METRICS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1} className="bg-[#050505] p-24 group hover:bg-white/5 transition-colors">
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/30 mb-12 block">{s.label}</span>
                <h3 className="text-7xl font-black italic text-white mb-8 group-hover:text-white transition-colors">{s.val}</h3>
                <p className="text-xs text-white/30 font-light tracking-widest uppercase italic leading-loose">
                  {s.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXHIBITION SHOWCASE ── */}
      <section className="py-40 bg-[#020202] relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16">
          <Reveal className="mb-32">
             <div className="flex flex-col lg:flex-row justify-between items-end gap-12 border-b border-white/5 pb-12">
               <h2 className="text-7xl md:text-[10rem] font-black italic tracking-tighter leading-[0.8] uppercase text-white">
                 The <br/> <span className="text-white/20 not-italic">Manifest.</span>
               </h2>
               <div className="text-right">
                  <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/20 mb-4 block italic">Archive_Sequence_2024</span>
                  <div className="flex gap-4">
                    {EXHIBITIONS.map((_, i) => (
                      <button 
                        key={i} 
                        onClick={() => setActiveExhibition(i)}
                        className={`w-16 h-1 transition-all ${activeExhibition === i ? "bg-white w-32" : "bg-white/10"}`}
                      />
                    ))}
                  </div>
               </div>
             </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
            <div className="lg:col-span-8 relative aspect-video rounded-sm overflow-hidden border border-white/5 group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeExhibition}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image src={EXHIBITIONS[activeExhibition].img} alt={EXHIBITIONS[activeExhibition].title} fill className="object-cover grayscale brightness-75 group-hover:grayscale-0 transition-all duration-1000" unoptimized />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent opacity-80" />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="lg:col-span-4 space-y-12">
               <motion.div
                  key={activeExhibition}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-12"
               >
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">{EXHIBITIONS[activeExhibition].id} // LOG</span>
                 <h3 className="text-6xl font-black italic uppercase text-white tracking-tighter">{EXHIBITIONS[activeExhibition].title}</h3>
                 <div className="space-y-6 border-y border-white/5 py-12">
                    <div className="flex justify-between items-center">
                       <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">Category</span>
                       <span className="text-sm font-black text-white uppercase tracking-widest">{EXHIBITIONS[activeExhibition].category}</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">Release_Year</span>
                       <span className="text-sm font-black text-white uppercase tracking-widest">{EXHIBITIONS[activeExhibition].year}</span>
                    </div>
                 </div>
                 <p className="text-white/30 text-lg font-light italic leading-loose uppercase tracking-wide">
                   {EXHIBITIONS[activeExhibition].desc}
                 </p>
                 <button className="flex items-center gap-6 group">
                    <span className="text-[10px] font-bold uppercase tracking-[0.8em] text-white/60">View_Full_Dossier</span>
                    <div className="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all">
                       <ArrowUpRight className="w-6 h-6 text-white group-hover:text-black transition-colors" />
                    </div>
                 </button>
               </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ARCHIVE GRID ── */}
      <section className="py-40 bg-[#050505] border-y border-white/5">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16">
          <Reveal className="mb-32 text-center">
             <span className="text-[10px] font-bold uppercase tracking-[1em] text-white/40 mb-8 block">Operational Scope</span>
             <h2 className="text-7xl md:text-[10rem] font-black italic tracking-tighter leading-[0.8] uppercase text-white">
                Technical <br/> <span className="text-white/20 not-italic">Archive.</span>
             </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5">
            {ARCHIVE.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1} className="bg-[#050505] p-12 group hover:bg-white/5 transition-colors">
                 <span className="text-4xl font-black italic text-white/10 mb-8 block group-hover:text-white transition-colors">{item.id}</span>
                 <h3 className="text-xl font-black italic uppercase text-white mb-6">{item.title}</h3>
                 <p className="text-xs text-white/30 font-light tracking-widest uppercase italic leading-loose">
                   {item.desc}
                 </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── OPTICS / RESEARCH ── */}
      <section className="py-40 bg-black overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <Reveal>
             <div className="relative aspect-square bg-[#050505] border border-white/5 p-20 flex flex-col justify-center group overflow-hidden">
                <div className="absolute top-0 right-0 p-12">
                   <Monitor className="w-16 h-16 text-white/5 group-hover:text-white/20 transition-colors" />
                </div>
                <Eye className="w-16 h-16 text-white mb-12" />
                <h3 className="text-5xl font-black italic uppercase text-white mb-8">Neural <br/> <span className="text-white/20 not-italic">Optics.</span></h3>
                <p className="text-white/30 text-lg leading-relaxed mb-12 font-light uppercase tracking-wide italic leading-loose">
                  Our research explores the biological response to controlled luminosity. We utilize high-fidelity photon emission to reshape psychological spatial perception within architectural enclaves.
                </p>
                <div className="flex gap-12 text-[10px] font-bold uppercase tracking-[0.5em] text-white/20">
                   <span>[01] RETINAL_INTEGRITY</span>
                   <span>[02] SPATIAL_DOPAMINE</span>
                </div>
             </div>
          </Reveal>
          <div className="space-y-24">
             <Reveal delay={0.2}>
                <span className="text-[10px] font-bold uppercase tracking-[1em] text-white/40 mb-8 block italic">Curation_Sequence</span>
                <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-none uppercase text-white">Atmospheric <br/> <span className="text-white/20 not-italic">Synthesis.</span></h2>
             </Reveal>
             <div className="space-y-12">
                {[
                  { n: "01", t: "Photon Mapping", d: "High-density simulation of light interaction with atmospheric particulates." },
                  { n: "02", t: "Structural Audit", d: "Analyzing architectural geometry for optimal bounce and shadow enclaves." },
                  { n: "03", t: "Emission Control", d: "Precision calibration of laser and LED arrays for zero-latency response." }
                ].map((step, i) => (
                  <Reveal key={step.n} delay={i * 0.1 + 0.3} className="flex gap-12 group border-l border-white/5 pl-8 hover:border-white transition-colors">
                    <span className="text-4xl font-black italic text-white/10 group-hover:text-white transition-colors">{step.n}</span>
                    <div>
                      <h4 className="text-xl font-black uppercase italic text-white mb-2">{step.t}</h4>
                      <p className="text-xs text-white/30 font-light tracking-widest uppercase italic leading-loose">{step.d}</p>
                    </div>
                  </Reveal>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* ── CTA / INQUIRY ── */}
      <section className="py-40 bg-[#050505] relative">
         <div className="max-w-[1600px] mx-auto px-8 md:px-16">
            <div className="bg-white text-black p-24 lg:p-40 relative overflow-hidden flex flex-col items-center text-center group">
               <div className="absolute inset-0 opacity-10 grayscale brightness-50 group-hover:opacity-20 transition-opacity">
                  <Image src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80" alt="CTA Light" fill className="object-cover" />
               </div>
               <Reveal>
                  <span className="text-[10px] font-bold uppercase tracking-[1em] text-black/50 mb-12 block italic">Secure Initiation</span>
                  <h2 className="text-7xl md:text-[12rem] font-black italic tracking-tighter leading-[0.8] uppercase mb-16">
                     Command <br/> <span className="text-black/30 not-italic">The Light.</span>
                  </h2>
                  <div className="flex flex-wrap justify-center gap-8 relative z-10">
                     <button className="px-20 py-8 bg-black text-white font-black uppercase text-sm tracking-[0.5em] hover:italic transition-all">
                        Initiate_Dialogue
                     </button>
                     <button className="px-20 py-8 border border-black/20 text-black font-black uppercase text-sm tracking-[0.5em] hover:bg-black/5 transition-all">
                        Manifest_Dossier
                     </button>
                  </div>
               </Reveal>
            </div>
         </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-black pt-40 pb-20 px-8 md:px-16 border-t border-white/5">
         <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-32 mb-40">
            <div className="lg:col-span-6">
               <div className="flex items-center gap-4 mb-12">
                 <Sun className="w-10 h-10 text-white" />
                 <span className="text-3xl font-black tracking-tighter uppercase italic">LUMINA<span className="text-white/30">//</span>ARCHIVE</span>
               </div>
               <p className="text-white/20 text-sm font-light leading-relaxed uppercase tracking-[0.3em] mb-12 italic max-w-md">
                 Engineering the future of atmospheric intelligence through high-fidelity photon synthesis and neural optics.
               </p>
               <div className="flex gap-12">
                 {["INSTAGRAM", "LINKEDIN", "VIMEO", "BEHANCE"].map(s => (
                   <a key={s} href="#" className="text-[10px] font-bold hover:text-white text-white/20 transition-colors tracking-[0.5em]">[{s}]</a>
                 ))}
               </div>
            </div>
            
            <div className="lg:col-span-2">
               <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/40 mb-12">Archive</h4>
               <ul className="space-y-6 text-xs font-bold uppercase tracking-[0.5em]">
                 {["The Manifest", "Research", "Optics", "Journal"].map(item => (
                   <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
                 ))}
               </ul>
            </div>

            <div className="lg:col-span-4">
               <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/40 mb-12">Inquiry</h4>
               <p className="text-sm text-white/20 font-light mb-12 italic uppercase tracking-[0.2em] leading-loose">
                 For acquisitions, research collaborations, or architectural commissions, contact our global command center.
               </p>
               <a href="mailto:command@lumina-archive.com" className="text-3xl font-black italic hover:text-white transition-colors block border-b border-white/10 pb-8 uppercase tracking-tighter">
                  command@lumina.archive
               </a>
            </div>
         </div>

         <div className="max-w-[1600px] mx-auto flex flex-col md:row items-center justify-between gap-12 text-[9px] font-bold uppercase tracking-[0.8em] text-white/10 border-t border-white/5 pt-20">
            <p>© 2024 LUMINA ARCHIVE GROUP. ALL RIGHTS RESERVED. TOKYO // GLOBAL.</p>
            <div className="flex gap-16">
               <a href="#" className="hover:text-white transition-colors">[Photon_Protocol]</a>
               <a href="#" className="hover:text-white transition-colors">[Terms_of_Light]</a>
            </div>
         </div>
      </footer>
    </div>
  );
}
