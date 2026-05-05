"use client";

import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, Suspense } from "react";
import Image from "next/image";
import { ArrowUpRight, Menu, X, Layers, ShieldCheck, Plus, Play, ArrowRight, ChevronDown, Monitor, LayoutGrid, Ruler, Anchor, Box, Construction } from "lucide-react";
import "../premium.css";

// ─── DATA ──────────────────────────────────────────────────────────────────

const PROJECTS = [
  { 
    id: "01",
    title: "MONOLITH_X", 
    category: "Structural Masonry",
    year: "2024",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
    desc: "A vertical study in cast-in-place concrete, featuring cantilevered slabs and raw textured aggregates."
  },
  { 
    id: "02",
    title: "BRUTAL_ENCLAVE", 
    category: "Urban Intervention",
    year: "2023",
    img: "https://images.unsplash.com/photo-1541829070764-84a7d30dee62?w=1200&q=80",
    desc: "Redefining urban density through massive concrete volumes punctuated by rhythmic geometric voids."
  },
  { 
    id: "03",
    title: "SILENT_GRID", 
    category: "Residential Architecture",
    year: "2024",
    img: "https://images.unsplash.com/photo-1555636222-cae831e670b3?w=1200&q=80",
    desc: "A minimalist retreat where concrete walls serve as canvases for the shifting play of solar light."
  }
];

const SPECS = [
  { label: "Compressive", val: "85 MPa", desc: "Ultra-high performance concrete mix for extreme structural loads." },
  { label: "Longevity", val: "100+ Yrs", desc: "Designed for tectonic endurance across century-long environmental cycles." },
  { label: "Fidelity", val: "0.5mm", desc: "Formwork precision achieved via robotic milling and CNC fabrication." }
];

const CAPABILITIES = [
  { icon: Ruler, title: "Structural Logic", desc: "Developing load-bearing systems that carry expressive and authorial weight." },
  { icon: Box, title: "Material Synthesis", desc: "Researching aggregate combinations for unique tactile and thermal performance." },
  { icon: Layers, title: "Sectional Depth", desc: "Designing complex interior volumes through radical sectional cutting." },
  { icon: Construction, title: "Robotic Formwork", desc: "Leveraging digital fabrication for non-standard concrete geometries." }
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

export default function ConcreteAtelierSPA() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const { scrollY } = useScroll();
  
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 800], [1, 1.1]);
  const masonryY = useTransform(scrollY, [0, 1000], [0, 100]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#d1d5db] font-mono selection:bg-[#fff] selection:text-black">
      
      {/* ── GRID OVERLAY ── */}
      <div className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="fixed inset-0 z-[0] opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "100px 100px" }} />
      </div>

      {/* ── NAVIGATION ── */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-10 mix-blend-difference"
      >
        <div className="flex items-center gap-4">
          <Box className="w-10 h-10 text-white" />
          <span className="text-2xl font-black tracking-tighter uppercase italic">CONCRETE<span className="text-white/30">//</span>ATELIER</span>
        </div>
        
        <div className="hidden lg:flex items-center gap-16 text-[10px] font-bold uppercase tracking-[0.4em] text-white/40">
          {["Manifest", "Projects", "Atelier", "Contact"].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors">/{item}</a>
          ))}
        </div>

        <button 
          onClick={() => setMenuOpen(true)}
          className="w-16 h-16 flex items-center justify-center border border-white/10 group bg-white/5 backdrop-blur-md"
        >
          <Menu className="w-6 h-6 group-hover:rotate-90 transition-transform" />
        </button>
      </motion.nav>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="fixed inset-0 z-[60] bg-[#000] text-white p-12 flex flex-col justify-between"
          >
            <div className="flex justify-between items-center border-b border-white/5 pb-12">
              <span className="text-xl font-black uppercase tracking-tighter italic">CONCRETE//ATELIER</span>
              <button onClick={() => setMenuOpen(false)} className="w-12 h-12 flex items-center justify-center border border-white/10 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-col gap-12 text-center md:text-left">
              {["THE MANIFEST", "PROJECTS ARCHIVE", "ROBOTIC FABRICATION", "MATERIAL LAB", "INQUIRY"].map((item, i) => (
                <motion.a 
                  key={item}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
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
              <span>BRUTALIST_PRACTICE</span>
              <span>EST. 2013 // ZURICH</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO SECTION ── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale, y: masonryY }}
          className="absolute inset-0 z-0"
        >
          <Image 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80" 
            alt="Hero Concrete" 
            fill 
            className="object-cover grayscale brightness-50 opacity-40" 
            unoptimized 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/40 via-transparent to-[#0a0a0a]" />
        </motion.div>

        <div className="relative z-10 text-center px-6">
          <Reveal>
            <span className="text-[10px] font-bold uppercase tracking-[2em] text-white/40 mb-12 block">Tectonic Endurance</span>
          </Reveal>
          <Reveal delay={0.2}>
            <h1 className="text-8xl md:text-[18rem] font-black tracking-tighter leading-[0.75] uppercase italic text-white mb-20">
              RAW <br/> <span className="not-italic text-white/10">POWER.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="max-w-2xl mx-auto flex flex-col items-center gap-16 border-t border-white/10 pt-20">
              <p className="text-white/40 text-xl leading-relaxed font-light uppercase tracking-[0.3em] italic leading-loose text-center">
                Refining the built environment through structural honesty. Where ancestral masonry meets computational engineering.
              </p>
              <div className="flex gap-8">
                <button className="px-16 py-6 bg-white text-black font-black uppercase text-xs tracking-[0.4em] hover:bg-white/90 transition-colors">
                  View_Projects
                </button>
                <button className="px-16 py-6 border border-white/20 text-white font-black uppercase text-xs tracking-[0.4em] hover:bg-white/5 transition-colors">
                  Material_Lab
                </button>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end text-[10px] font-bold uppercase tracking-[0.5em] text-white/20">
          <div className="flex flex-col gap-2">
            <span>GMT_+1_ZURICH</span>
            <div className="w-48 h-[1px] bg-white/10" />
          </div>
          <div className="flex items-center gap-4 italic uppercase tracking-widest">
             <span className="animate-pulse">●</span> MATERIAL_STATUS: CURED
          </div>
        </div>
      </section>

      {/* ── SPECS GRID ── */}
      <section className="py-40 bg-[#050505]">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-white/5 border border-white/5">
            {SPECS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1} className="bg-[#0a0a0a] p-24 group hover:bg-white/5 transition-colors">
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/20 mb-12 block">{s.label}</span>
                <h3 className="text-7xl font-black italic text-white mb-8 group-hover:text-white transition-colors">{s.val}</h3>
                <p className="text-xs text-white/30 font-light tracking-widest uppercase italic leading-loose">
                  {s.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS SHOWCASE ── */}
      <section className="py-40 bg-black relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16">
          <Reveal className="mb-32">
             <div className="flex flex-col lg:flex-row justify-between items-end gap-12 border-b border-white/5 pb-12">
               <h2 className="text-7xl md:text-[10rem] font-black italic tracking-tighter leading-[0.8] uppercase text-white">
                 Structural <br/> <span className="text-white/20 not-italic">Archive.</span>
               </h2>
               <div className="text-right">
                  <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/20 mb-4 block italic">Manifest_Sequence_2024</span>
                  <div className="flex gap-4">
                    {PROJECTS.map((_, i) => (
                      <button 
                        key={i} 
                        onClick={() => setActiveProject(i)}
                        className={`w-16 h-1 transition-all ${activeProject === i ? "bg-white w-32" : "bg-white/10"}`}
                      />
                    ))}
                  </div>
               </div>
             </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
            <div className="lg:col-span-7 relative aspect-video rounded-sm overflow-hidden border border-white/5 group bg-[#111]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
                  className="absolute inset-0"
                >
                  <Image src={PROJECTS[activeProject].img} alt={PROJECTS[activeProject].title} fill className="object-cover grayscale brightness-75 group-hover:grayscale-0 transition-all duration-[2s]" unoptimized />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="lg:col-span-5 space-y-12">
               <motion.div
                  key={activeProject}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="space-y-12"
               >
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">{PROJECTS[activeProject].id} // MANIFEST</span>
                 <h3 className="text-6xl md:text-8xl font-black italic uppercase text-white tracking-tighter">{PROJECTS[activeProject].title}</h3>
                 <div className="grid grid-cols-2 gap-12 border-y border-white/5 py-12">
                    <div className="space-y-2">
                       <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20">Category</span>
                       <span className="text-sm font-black text-white uppercase tracking-widest block">{PROJECTS[activeProject].category}</span>
                    </div>
                    <div className="space-y-2">
                       <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20">Release_Year</span>
                       <span className="text-sm font-black text-white uppercase tracking-widest block">{PROJECTS[activeProject].year}</span>
                    </div>
                 </div>
                 <p className="text-white/30 text-lg font-light italic leading-loose uppercase tracking-wide">
                   {PROJECTS[activeProject].desc}
                 </p>
                 <button className="flex items-center gap-6 group">
                    <span className="text-[10px] font-bold uppercase tracking-[0.8em] text-white/60">Request_Dossier</span>
                    <div className="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all">
                       <ArrowUpRight className="w-6 h-6 text-white group-hover:text-black transition-colors" />
                    </div>
                 </button>
               </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES ── */}
      <section className="py-40 bg-[#050505] border-y border-white/5">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16">
          <Reveal className="mb-32 text-center">
             <span className="text-[10px] font-bold uppercase tracking-[1em] text-white/40 mb-8 block">Operational Scope</span>
             <h2 className="text-7xl md:text-[10rem] font-black italic tracking-tighter leading-[0.8] uppercase text-white">
                Technical <br/> <span className="text-white/20 not-italic">Expertise.</span>
             </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5">
            {CAPABILITIES.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1} className="bg-[#0a0a0a] p-12 group hover:bg-white/5 transition-colors">
                 <item.icon className="w-12 h-12 text-white/20 group-hover:text-white transition-colors mb-8" />
                 <h3 className="text-xl font-black italic uppercase text-white mb-6">{item.title}</h3>
                 <p className="text-xs text-white/30 font-light tracking-widest uppercase italic leading-loose">
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
                   <Monitor className="w-16 h-16 text-white/5 group-hover:text-white/10 transition-colors" />
                </div>
                <Layers className="w-16 h-16 text-white mb-12" />
                <h3 className="text-5xl font-black italic uppercase text-white mb-8">Robotic <br/> <span className="text-white/20 not-italic">Masonry.</span></h3>
                <p className="text-white/30 text-lg leading-relaxed mb-12 font-light uppercase tracking-wide italic leading-loose">
                  Our atelier leverages 6-axis robotic arms for the fabrication of non-standard concrete formwork. We push the tectonic limits of aggregate synthesis through computational material logic.
                </p>
                <div className="flex gap-12 text-[10px] font-bold uppercase tracking-[0.5em] text-white/20">
                   <span>[01] DIGITAL_FORMWORK</span>
                   <span>[02] AGGREGATE_SYNTH</span>
                </div>
             </div>
          </Reveal>
          <div className="space-y-24">
             <Reveal delay={0.2}>
                <span className="text-[10px] font-bold uppercase tracking-[1em] text-white/40 mb-8 block italic">Curation_Sequence</span>
                <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-none uppercase text-white">Structural <br/> <span className="text-white/20 not-italic">Manifesto.</span></h2>
             </Reveal>
             <div className="space-y-12">
                {[
                  { n: "01", t: "Sectional Audit", d: "Rigorous cutting of complex volumes to reveal interior spatial potential." },
                  { n: "02", t: "Material Stress", d: "Simulation of high-MPa performance under extreme tectonic loads." },
                  { n: "03", t: "Atmospheric Aging", d: "Analyzing the interaction of concrete texture with century-long weathering." }
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
      <section className="py-40 bg-[#0a0a0a] relative">
         <div className="max-w-[1600px] mx-auto px-8 md:px-16">
            <div className="bg-white text-black p-24 lg:p-40 relative overflow-hidden flex flex-col items-center text-center group">
               <div className="absolute inset-0 opacity-10 grayscale brightness-50 group-hover:opacity-20 transition-opacity">
                  <Image src="https://images.unsplash.com/photo-1541829070764-84a7d30dee62?w=1600&q=80" alt="CTA Concrete" fill className="object-cover" />
               </div>
               <Reveal>
                  <span className="text-[10px] font-bold uppercase tracking-[1em] text-black/50 mb-12 block">Commission Initiation</span>
                  <h2 className="text-7xl md:text-[12rem] font-black italic tracking-tighter leading-[0.8] uppercase mb-16">
                     Cast <br/> <span className="text-black/30 not-italic">The Future.</span>
                  </h2>
                  <div className="flex flex-wrap justify-center gap-12 relative z-10">
                     <button className="px-20 py-8 bg-black text-white font-black uppercase text-sm tracking-[0.5em] hover:italic transition-all">
                        Initiate_Dialogue
                     </button>
                     <button className="px-20 py-8 border border-black/20 text-black font-black uppercase text-sm tracking-[0.5em] hover:bg-black/5 transition-all">
                        Material_Manifest
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
                 <Box className="w-10 h-10 text-white" />
                 <span className="text-3xl font-black tracking-tighter uppercase italic">CONCRETE<span className="text-white/30">//</span>ATELIER</span>
               </div>
               <p className="text-white/20 text-sm font-light leading-relaxed uppercase tracking-[0.3em] mb-12 italic max-w-md">
                 Defining the future of tectonic architecture through raw material honesty and robotic fabrication logic.
               </p>
               <div className="flex gap-12">
                 {["INSTAGRAM", "LINKEDIN", "ARCHILOVERS", "BEHANCE"].map(s => (
                   <a key={s} href="#" className="text-[10px] font-bold hover:text-white text-white/20 transition-colors tracking-[0.5em]">[{s}]</a>
                 ))}
               </div>
            </div>
            
            <div className="lg:col-span-2">
               <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/40 mb-12">Practice</h4>
               <ul className="space-y-6 text-xs font-bold uppercase tracking-[0.5em]">
                 {["The Manifest", "Projects", "Atelier", "Journal"].map(item => (
                   <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
                 ))}
               </ul>
            </div>

            <div className="lg:col-span-4">
               <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/40 mb-12">Inquiry</h4>
               <p className="text-sm text-white/20 font-light mb-12 italic uppercase tracking-[0.2em] leading-loose">
                 For new commissions, structural consultations, or research enclaves, contact our global command center.
               </p>
               <a href="mailto:command@concrete-atelier.ch" className="text-3xl font-black italic hover:text-white transition-colors block border-b border-white/10 pb-8 uppercase tracking-tighter">
                  command@concrete.atelier
               </a>
            </div>
         </div>

         <div className="max-w-[1600px] mx-auto flex flex-col md:row items-center justify-between gap-12 text-[9px] font-bold uppercase tracking-[0.8em] text-white/10 border-t border-white/5 pt-20">
            <p>© 2024 CONCRETE ATELIER AG. ALL RIGHTS RESERVED. ZURICH // GLOBAL.</p>
            <div className="flex gap-16">
               <a href="#" className="hover:text-white transition-colors">[Tectonic_Protocol]</a>
               <a href="#" className="hover:text-white transition-colors">[Terms_of_Form]</a>
            </div>
         </div>
      </footer>
    </div>
  );
}
