"use client";

import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, Suspense } from "react";
import Image from "next/image";
import { ArrowUpRight, Menu, X, Layers, ShieldCheck, Plus, Play, ArrowRight, ChevronDown, Monitor, LayoutGrid, Film, Camera, Music, Video, Award, Clapperboard, Mic2, Tv } from "lucide-react";
import "../premium.css";

// ─── DATA ──────────────────────────────────────────────────────────────────

const PRODUCTIONS = [
  { 
    id: "PRO_01",
    title: "NEON_REQUIEM", 
    category: "Feature Film",
    year: "2025",
    img: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&q=80",
    desc: "A midnight-dialled perpetual calendar tourbillon in 18k black gold. Movement visible through sapphire exhibition caseback."
  },
  { 
    id: "PRO_02",
    title: "THE_LONG_DARK", 
    category: "Cinematic Documentary",
    year: "2024",
    img: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1200&q=80",
    desc: "Sunburst dial in guilloché silver. 72-hour power reserve. Three-city time display at 6 o'clock."
  },
  { 
    id: "PRO_03",
    title: "CHROME_ANGEL", 
    category: "Noir Short",
    year: "2024",
    img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&q=80",
    desc: "3.7mm total thickness. Integrated bracelet in grade-5 titanium. The thinnest piece we have ever made."
  }
];

const METRICS = [
  { label: "Festivals_Won", val: "42", desc: "Global recognition across Cannes, Berlin, Venice, and Sundance enclaves." },
  { label: "Cinematics", val: "8K_RAW", desc: "Ultra-high fidelity acquisition systems for absolute visual endurance." },
  { label: "Heritage", val: "EST. 2012", desc: "A decade-long lineage of cinematic story-telling preserved in every frame." }
];

const CAPABILITIES = [
  { icon: Camera, title: "Optic Synthesis", desc: "Acquiring visuals through a lens of mathematical and structural purity." },
  { icon: Clapperboard, title: "Scene Logic", desc: "Engineering narrative arcs that carry expressive and authorial weight." },
  { icon: Mic2, title: "Sonic Depth", desc: "Designing complex auditory volumes through radical multi-vector recording." },
  { icon: Video, title: "Kinetic Cut", desc: "Leveraging digital orchestration for non-standard cinematic geometries." }
];

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function Reveal({ children, className = "", delay = 0, y = 40 }: { children: React.ReactNode; className?: string; delay?: number; y?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.2, delay, ease: [0.19, 1, 0.22, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── MAIN SPA ────────────────────────────────────────────────────────────────

export default function NoirDirectSPA() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProd, setActiveProd] = useState(0);
  const { scrollY } = useScroll();
  
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 800], [1, 1.1]);
  const grainY = useTransform(scrollY, [0, 1000], [0, 100]);

  return (
    <div className="min-h-screen bg-[#050505] text-[#eee] font-mono selection:bg-[#eee] selection:text-black">
      
      {/* ── GRAIN OVERLAY ── */}
      <div className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.08] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="fixed inset-0 z-[0] opacity-[0.05] pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "100px 100px" }} />
      </div>

      {/* ── NAVIGATION ── */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-10 mix-blend-difference"
      >
        <div className="flex items-center gap-4">
          <Film className="w-10 h-10 text-white" />
          <span className="text-2xl font-black tracking-tighter uppercase italic text-white">NOIR<span className="text-white/30">//</span>DIRECT</span>
        </div>
        
        <div className="hidden lg:flex items-center gap-16 text-[10px] font-bold uppercase tracking-[0.4em] text-white/40">
          {["Manifest", "Archive", "Atelier", "Rights"].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors">/{item}</a>
          ))}
        </div>

        <button 
          onClick={() => setMenuOpen(true)}
          className="w-16 h-16 flex items-center justify-center border border-white/10 group bg-white/5 backdrop-blur-md"
        >
          <Menu className="w-6 h-6 text-white group-hover:rotate-90 transition-transform" />
        </button>
      </motion.nav>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="fixed inset-0 z-[60] bg-[#050505] text-white p-12 flex flex-col justify-between"
          >
            <div className="flex justify-between items-center border-b border-white/5 pb-12">
              <span className="text-xl font-black uppercase tracking-tighter italic">NOIR//DIRECT</span>
              <button onClick={() => setMenuOpen(false)} className="w-12 h-12 flex items-center justify-center border border-white/10 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-col gap-12 text-center">
              {["FILM_MANIFEST", "CINEMATIC_ARCHIVE", "SONIC_LAB", "BESPOKE_PRODUCTION", "DISTRIBUTION"].map((item, i) => (
                <motion.a 
                  key={item}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  href="#"
                  className="text-6xl md:text-9xl font-black uppercase italic tracking-tighter hover:text-white/40 transition-all leading-none"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </motion.a>
              ))}
            </div>
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.5em] border-t border-white/5 pt-12">
              <span>CINEMATIC_PRACTICE</span>
              <span>EST. 2012 // PARIS</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO SECTION ── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale, y: grainY }}
          className="absolute inset-0 z-0"
        >
          <Image 
            src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1600&q=80" 
            alt="Hero Film" 
            fill 
            className="object-cover grayscale brightness-50 opacity-40" 
            unoptimized 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505]" />
        </motion.div>

        <div className="relative z-10 text-center px-6">
          <Reveal>
            <span className="text-[10px] font-bold uppercase tracking-[2em] text-white/40 mb-12 block">Cinematic Endurance</span>
          </Reveal>
          <Reveal delay={0.2}>
            <h1 className="text-8xl md:text-[18rem] font-black tracking-tighter leading-[0.75] uppercase italic text-white mb-20">
              RAW <br/> <span className="not-italic text-white/10">CINEMA.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="max-w-2xl mx-auto flex flex-col items-center gap-16 border-t border-white/10 pt-20">
              <p className="text-white/40 text-xl leading-relaxed font-light uppercase tracking-[0.3em] italic leading-loose text-center">
                Refining the visual environment through narrative honesty. Where ancestral story-telling meets computational cinematography.
              </p>
              <div className="flex gap-8">
                <button className="px-16 py-6 bg-white text-black font-black uppercase text-xs tracking-[0.4em] hover:bg-black hover:text-white transition-all">
                  Archive_Access
                </button>
                <button className="px-16 py-6 border border-white/20 text-white font-black uppercase text-xs tracking-[0.4em] hover:bg-white/5 transition-colors">
                  Sonic_Manifest
                </button>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end text-[10px] font-bold uppercase tracking-[0.5em] text-white/20">
          <div className="flex flex-col gap-2">
            <span>PARIS // ATELIER</span>
            <div className="w-48 h-[1px] bg-white/10" />
          </div>
          <div className="flex items-center gap-4 italic uppercase tracking-widest">
             <span className="animate-pulse">●</span> FILM_STATUS: CAPTURING
          </div>
        </div>
      </section>

      {/* ── SPECS GRID ── */}
      <section className="py-40 bg-[#050505]">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-white/5 border border-white/5">
            {METRICS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1} className="bg-black p-24 group hover:bg-white/5 transition-all duration-700">
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/30 mb-12 block group-hover:text-white/60">{s.label}</span>
                <h3 className="text-7xl font-black italic text-white mb-8 group-hover:text-white transition-colors">{s.val}</h3>
                <p className="text-xs text-white/30 font-light tracking-widest uppercase italic leading-loose group-hover:text-white/60">
                  {s.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCTIONS SHOWCASE ── */}
      <section className="py-40 bg-black relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16">
          <Reveal className="mb-32">
             <div className="flex flex-col lg:flex-row justify-between items-end gap-12 border-b border-white/10 pb-12">
               <h2 className="text-7xl md:text-[10rem] font-black italic tracking-tighter leading-[0.8] uppercase text-white">
                 Cinematic <br/> <span className="text-white/20 not-italic">Archive.</span>
               </h2>
               <div className="text-right">
                  <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/20 mb-4 block italic">Manifest_Sequence_2024</span>
                  <div className="flex gap-4">
                    {PRODUCTIONS.map((_, i) => (
                      <button 
                        key={i} 
                        onClick={() => setActiveProd(i)}
                        className={`w-16 h-1 transition-all ${activeProd === i ? "bg-white w-32" : "bg-white/10"}`}
                      />
                    ))}
                  </div>
               </div>
             </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
            <div className="lg:col-span-8 relative aspect-video rounded-sm overflow-hidden border border-white/5 group bg-[#111]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProd}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
                  className="absolute inset-0"
                >
                  <Image src={PRODUCTIONS[activeProd].img} alt={PRODUCTIONS[activeProd].title} fill className="object-cover grayscale brightness-75 group-hover:grayscale-0 transition-all duration-[2s]" unoptimized />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                </motion.div>
              </AnimatePresence>
              <div className="absolute bottom-12 left-12 flex flex-col gap-4">
                 <span className="text-[10px] font-black uppercase tracking-widest bg-white/80 backdrop-blur-md text-black px-6 py-2 border border-black/5">{PRODUCTIONS[activeProd].year} // RELEASE</span>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-12">
               <motion.div
                  key={activeProd}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-12"
               >
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">{PRODUCTIONS[activeProd].id} // MANIFEST</span>
                 <h3 className="text-6xl md:text-8xl font-black italic uppercase text-white tracking-tighter">{PRODUCTIONS[activeProd].title}</h3>
                 <div className="space-y-6 border-y border-white/10 py-12">
                    <div className="flex justify-between items-center">
                       <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">Category</span>
                       <span className="text-sm font-black text-white uppercase tracking-widest">{PRODUCTIONS[activeProd].category}</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">Release_Status</span>
                       <span className="text-sm font-black text-white uppercase tracking-widest italic">Global_Distribution</span>
                    </div>
                 </div>
                 <p className="text-white/30 text-lg font-light italic leading-loose uppercase tracking-wide">
                   {PRODUCTIONS[activeProd].desc}
                 </p>
                 <button className="flex items-center gap-6 group">
                    <span className="text-[10px] font-bold uppercase tracking-[0.8em] text-white">Request_Dossier</span>
                    <div className="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center group-hover:bg-white transition-all">
                       <ArrowUpRight className="w-6 h-6 text-white group-hover:text-black transition-colors" />
                    </div>
                 </button>
               </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES ── */}
      <section className="py-40 bg-[#050505] border-y border-white/10">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16">
          <Reveal className="mb-32 text-center">
             <span className="text-[10px] font-bold uppercase tracking-[1em] text-white/40 mb-8 block italic">Operational Scope</span>
             <h2 className="text-7xl md:text-[10rem] font-black italic tracking-tighter leading-[0.8] uppercase text-white">
                Technical <br/> <span className="text-white/20 not-italic">Expertise.</span>
             </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
            {CAPABILITIES.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1} className="bg-black p-12 group hover:bg-white/5 transition-all duration-700">
                 <item.icon className="w-12 h-12 text-white/20 group-hover:text-white transition-colors mb-8" />
                 <h3 className="text-2xl font-black italic uppercase text-white mb-6">{item.title}</h3>
                 <p className="text-xs text-white/40 group-hover:text-white font-light tracking-widest uppercase italic leading-loose transition-colors">
                   {item.desc}
                 </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ATELIER / LABORATORY ── */}
      <section className="py-40 bg-black overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <Reveal>
             <div className="relative aspect-square bg-[#050505] border border-white/5 p-20 flex flex-col justify-center group overflow-hidden">
                <div className="absolute top-0 right-0 p-12">
                   <Clapperboard className="w-16 h-16 text-white/5 group-hover:text-white/10 transition-colors" />
                </div>
                <Video className="w-16 h-16 text-white mb-12" />
                <h3 className="text-5xl font-black italic uppercase text-white mb-8">Cinematic <br/> <span className="text-white/20 not-italic">Atelier.</span></h3>
                <p className="text-white/40 text-lg leading-relaxed mb-12 font-light uppercase tracking-wide italic leading-loose">
                  Our Paris atelier leverages aerospace-grade optics and 6-axis robotic stabilization for the production of non-standard cinematic visuals. We push the tectonic limits of narrative synthesis.
                </p>
                <div className="flex gap-12 text-[10px] font-bold uppercase tracking-[0.5em] text-white/30">
                   <span>[01] OPTIC_SYNTHESIS</span>
                   <span>[02] SCENE_LOGIC</span>
                </div>
             </div>
          </Reveal>
          <div className="space-y-24">
             <Reveal delay={0.2}>
                <span className="text-[10px] font-bold uppercase tracking-[1em] text-white/40 mb-8 block italic">Curation_Sequence</span>
                <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-none uppercase text-white">Narrative <br/> <span className="text-white/20 not-italic">Manifesto.</span></h2>
             </Reveal>
             <div className="space-y-12">
                {[
                  { n: "01", t: "Sectional Audit", d: "Rigorous cutting of complex scenes to reveal interior spatial potential." },
                  { n: "02", t: "Sonic Stress", d: "Simulation of high-fidelity auditory performance under extreme narrative loads." },
                  { n: "03", t: "Atmospheric Aging", d: "Analyzing the interaction of cinematic grain with digital weathering." }
                ].map((step, i) => (
                  <Reveal key={step.n} delay={i * 0.1 + 0.3} className="flex gap-12 group border-l border-white/10 pl-8 hover:border-white transition-colors">
                    <span className="text-4xl font-black italic text-white/10 group-hover:text-white transition-colors">{step.n}</span>
                    <div>
                      <h4 className="text-xl font-black uppercase italic text-white mb-2">{step.t}</h4>
                      <p className="text-xs text-white/40 font-light tracking-widest uppercase italic leading-loose">{step.d}</p>
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
               <div className="absolute inset-0 opacity-10 grayscale brightness-110 group-hover:opacity-20 transition-opacity">
                  <Image src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1600&q=80" alt="CTA Film" fill className="object-cover" />
               </div>
               <Reveal>
                  <span className="text-[10px] font-bold uppercase tracking-[1em] text-black/50 mb-12 block italic">Commission Initiation</span>
                  <h2 className="text-7xl md:text-[12rem] font-black italic tracking-tighter leading-[0.8] uppercase mb-16">
                     Cast <br/> <span className="text-black/30 not-italic">The Story.</span>
                  </h2>
                  <div className="flex flex-wrap justify-center gap-12 relative z-10">
                     <button className="px-20 py-8 bg-black text-white font-black uppercase text-sm tracking-[0.5em] hover:italic transition-all">
                        Request_Selection
                     </button>
                     <button className="px-20 py-8 border border-black/20 text-black font-black uppercase text-sm tracking-[0.5em] hover:bg-black/5 transition-all">
                        Atelier_Dossier
                     </button>
                  </div>
               </Reveal>
            </div>
         </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-black pt-40 pb-20 px-8 md:px-16 border-t border-white/10">
         <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-32 mb-40">
            <div className="lg:col-span-6">
               <div className="flex items-center gap-4 mb-12">
                 <Film className="w-10 h-10 text-white" />
                 <span className="text-3xl font-black tracking-tighter uppercase italic text-white">NOIR<span className="text-white/30">//</span>DIRECT</span>
               </div>
               <p className="text-white/40 text-sm font-light leading-relaxed uppercase tracking-[0.3em] mb-12 italic max-w-md">
                 Securing the future of cinematic objects through high-fidelity orchestration and narrative clarity.
               </p>
               <div className="flex gap-12">
                 {["TERMINAL", "CINEMA", "FORGE", "ALPHA"].map(s => (
                   <a key={s} href="#" className="text-[10px] font-bold hover:text-white text-white/30 transition-colors tracking-[0.5em]">[{s}]</a>
                 ))}
               </div>
            </div>
            
            <div className="lg:col-span-2">
               <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/40 mb-12">Atelier</h4>
               <ul className="space-y-6 text-xs font-bold uppercase tracking-[0.4em]">
                 {["Films", "Manifests", "Atelier", "Journal"].map(item => (
                   <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
                 ))}
               </ul>
            </div>

            <div className="lg:col-span-4">
               <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/40 mb-12">Partner Inquiry</h4>
               <p className="text-sm text-white/40 font-light mb-12 italic uppercase tracking-[0.2em] leading-loose">
                 For new commissions, cinematic studies, or distribution enclaves, contact our primary command center in Paris.
               </p>
               <a href="mailto:atelier@noir-direct.fr" className="text-3xl font-black italic hover:text-white transition-colors block border-b border-white/10 pb-8 uppercase tracking-tighter">
                  atelier@noir-direct.fr
               </a>
            </div>
         </div>

         <div className="max-w-[1600px] mx-auto flex flex-col md:row items-center justify-between gap-12 text-[9px] font-bold uppercase tracking-[0.8em] text-white/20 border-t border-white/5 pt-20">
            <p>© 2024 NOIR DIRECT PRODUCTION AG. ALL RIGHTS RESERVED. PARIS // GLOBAL.</p>
            <div className="flex gap-16">
               <a href="#" className="hover:text-white transition-colors">[Cinematic_Vault]</a>
               <a href="#" className="hover:text-white transition-colors">[Terms_of_Form]</a>
            </div>
         </div>
      </footer>
    </div>
  );
}
