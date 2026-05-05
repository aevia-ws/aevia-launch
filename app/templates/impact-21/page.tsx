"use client";

import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, Suspense } from "react";
import Image from "next/image";
import { ArrowUpRight, Menu, X, Layers, ShieldCheck, Plus, Play, ArrowRight, ChevronDown, Monitor, LayoutGrid, Ruler, Anchor, Box, Construction, Scale, Maximize2, HardHat, Truck } from "lucide-react";
import "../premium.css";

// ─── DATA ──────────────────────────────────────────────────────────────────

const OBJECTS = [
  { 
    id: "OBJ_01",
    title: "MONOLITH_CHAIR", 
    material: "Forged Aluminum",
    weight: "42kg",
    img: "https://images.unsplash.com/photo-1592078615290-033ee584e226?w=1200&q=80",
    desc: "A singular volume of aircraft-grade aluminum, hand-polished to a mirror finish. No bolts, no seams, just structural logic."
  },
  { 
    id: "OBJ_02",
    title: "VOID_SHELF", 
    material: "Blackened Steel",
    weight: "18kg",
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80",
    desc: "Three cantilever arms project from a central vertical axis, creating a play of shadows and negative space."
  },
  { 
    id: "OBJ_03",
    title: "STRATUM_TABLE", 
    material: "Raw Travertine",
    weight: "120kg",
    img: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=1200&q=80",
    desc: "Stacked slabs of unrefined travertine, held together by gravitational force alone. A study in material weight."
  }
];

const SPECS = [
  { label: "Material_Purity", val: "99.8%", desc: "Sourcing only primary-smelt alloys for absolute structural integrity." },
  { label: "Form_Tolerance", val: "0.02mm", desc: "Machined with aerospace-grade CNC precision for seamless joins." },
  { label: "Longevity", val: "Life_Cycle", desc: "Designed for tectonic endurance across multi-generational cycles." }
];

const CAPABILITIES = [
  { icon: Ruler, title: "Dimensional Logic", desc: "Drafting objects through a lens of mathematical and structural purity." },
  { icon: Scale, title: "Mass Synthesis", desc: "Balancing extreme weight with visual lightness through cantilevered forms." },
  { icon: Box, title: "Volume Audit", desc: "Reducing complex spatial needs into singular, monolithic material bodies." },
  { icon: Construction, title: "Industrial Forge", desc: "Leveraging heavy-industry fabrication for furniture-scale artifacts." }
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

export default function NeoObjectSPA() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeObject, setActiveObject] = useState(0);
  const { scrollY } = useScroll();
  
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 800], [1, 1.1]);
  const masonryY = useTransform(scrollY, [0, 1000], [0, 100]);

  return (
    <div className="min-h-screen bg-[#f8f8f8] text-[#111] font-mono selection:bg-[#111] selection:text-white">
      
      {/* ── GRID OVERLAY ── */}
      <div className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="fixed inset-0 z-[0] opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)", backgroundSize: "100px 100px" }} />
      </div>

      {/* ── NAVIGATION ── */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-10 mix-blend-difference"
      >
        <div className="flex items-center gap-4">
          <Box className="w-10 h-10 text-white" />
          <span className="text-2xl font-black tracking-tighter uppercase italic text-white">NEO<span className="text-white/30">//</span>OBJECT</span>
        </div>
        
        <div className="hidden lg:flex items-center gap-16 text-[10px] font-bold uppercase tracking-[0.5em] text-white/40">
          {["Manifest", "Objects", "Atelier", "Inquiry"].map(item => (
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
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="fixed inset-0 z-[60] bg-[#111] text-white p-12 flex flex-col justify-between"
          >
            <div className="flex justify-between items-center border-b border-white/5 pb-12">
              <span className="text-xl font-black uppercase tracking-tighter italic">NEO//OBJECT</span>
              <button onClick={() => setMenuOpen(false)} className="w-12 h-12 flex items-center justify-center border border-white/10 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-col gap-12 text-center md:text-left">
              {["MATERIAL_MANIFEST", "OBJECT_ARCHIVE", "INDUSTRIAL_FORGE", "BESPOKE_STUDY", "INQUIRY"].map((item, i) => (
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
              <span>INDUSTRIAL_PRACTICE</span>
              <span>EST. 2018 // BERLIN</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO SECTION ── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#111]">
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale, y: masonryY }}
          className="absolute inset-0 z-0"
        >
          <Image 
            src="https://images.unsplash.com/photo-1592078615290-033ee584e226?w=1600&q=80" 
            alt="Hero Object" 
            fill 
            className="object-cover grayscale brightness-50 opacity-40" 
            unoptimized 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#f8f8f8]" />
        </motion.div>

        <div className="relative z-10 text-center px-6">
          <Reveal>
            <span className="text-[10px] font-bold uppercase tracking-[2em] text-white/40 mb-12 block">Material Honesty</span>
          </Reveal>
          <Reveal delay={0.2}>
            <h1 className="text-8xl md:text-[18rem] font-black tracking-tighter leading-[0.75] uppercase italic text-white mb-20">
              PURE <br/> <span className="not-italic text-white/10">FORM.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="max-w-2xl mx-auto flex flex-col items-center gap-16 border-t border-white/10 pt-20">
              <p className="text-white/40 text-xl leading-relaxed font-light uppercase tracking-[0.3em] italic leading-loose text-center">
                Refining the domestic environment through radical material reduction. Where industrial forge meets domestic sculpture.
              </p>
              <div className="flex gap-8">
                <button className="px-16 py-6 bg-white text-black font-black uppercase text-xs tracking-[0.4em] hover:bg-black hover:text-white transition-all">
                  Object_Archive
                </button>
                <button className="px-16 py-6 border border-white/20 text-white font-black uppercase text-xs tracking-[0.4em] hover:bg-white/5 transition-colors">
                  Material_Lab
                </button>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end text-[10px] font-bold uppercase tracking-[0.5em] text-[#111]/20">
          <div className="flex flex-col gap-2">
            <span>BERLIN // ATELIER</span>
            <div className="w-48 h-[1px] bg-[#111]/10" />
          </div>
          <div className="flex items-center gap-4 italic uppercase tracking-widest">
             <span className="animate-pulse">●</span> FORGE_STATUS: ACTIVE
          </div>
        </div>
      </section>

      {/* ── SPECS GRID ── */}
      <section className="py-40 bg-[#f8f8f8]">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-[#111]/5 border border-[#111]/5">
            {SPECS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1} className="bg-white p-24 group hover:bg-[#111] transition-all duration-700">
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#111]/30 mb-12 block group-hover:text-white/30">{s.label}</span>
                <h3 className="text-7xl font-black italic text-[#111] mb-8 group-hover:text-white transition-colors">{s.val}</h3>
                <p className="text-xs text-[#111]/30 font-light tracking-widest uppercase italic leading-loose group-hover:text-white/30">
                  {s.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── OBJECT SHOWCASE ── */}
      <section className="py-40 bg-white relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16">
          <Reveal className="mb-32">
             <div className="flex flex-col lg:flex-row justify-between items-end gap-12 border-b border-[#111]/10 pb-12">
               <h2 className="text-7xl md:text-[10rem] font-black italic tracking-tighter leading-[0.8] uppercase text-[#111]">
                 Object <br/> <span className="text-[#111]/20 not-italic">Archive.</span>
               </h2>
               <div className="text-right">
                  <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#111]/20 mb-4 block italic">Manifest_Sequence_2024</span>
                  <div className="flex gap-4">
                    {OBJECTS.map((_, i) => (
                      <button 
                        key={i} 
                        onClick={() => setActiveObject(i)}
                        className={`w-16 h-1 transition-all ${activeObject === i ? "bg-[#111] w-32" : "bg-[#111]/10"}`}
                      />
                    ))}
                  </div>
               </div>
             </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
            <div className="lg:col-span-8 relative aspect-video rounded-sm overflow-hidden border border-[#111]/5 group bg-[#f0f0f0]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeObject}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
                  className="absolute inset-0"
                >
                  <Image src={OBJECTS[activeObject].img} alt={OBJECTS[activeObject].title} fill className="object-cover grayscale brightness-110 group-hover:grayscale-0 transition-all duration-1000" unoptimized />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-60" />
                </motion.div>
              </AnimatePresence>
              <div className="absolute bottom-12 left-12 flex flex-col gap-4">
                 <span className="text-[10px] font-black uppercase tracking-widest bg-white/80 backdrop-blur-md px-6 py-2 border border-black/5">{OBJECTS[activeObject].material}</span>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-12">
               <motion.div
                  key={activeObject}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-12"
               >
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#111]/60">{OBJECTS[activeObject].id} // OBJECT_DATA</span>
                 <h3 className="text-6xl font-black italic uppercase text-[#111] tracking-tighter">{OBJECTS[activeObject].title}</h3>
                 <div className="space-y-6 border-y border-[#111]/10 py-12">
                    <div className="flex justify-between items-center">
                       <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#111]/30">Net_Weight</span>
                       <span className="text-sm font-black text-[#111] uppercase tracking-widest">{OBJECTS[activeObject].weight}</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#111]/30">Forge_Status</span>
                       <span className="text-sm font-black text-[#111] uppercase tracking-widest italic">Cured_Stable</span>
                    </div>
                 </div>
                 <p className="text-[#111]/40 text-lg font-light italic leading-loose uppercase tracking-wide">
                   {OBJECTS[activeObject].desc}
                 </p>
                 <button className="flex items-center gap-6 group">
                    <span className="text-[10px] font-bold uppercase tracking-[0.8em] text-[#111]">Request_Dossier</span>
                    <div className="w-16 h-16 border border-[#111]/10 rounded-full flex items-center justify-center group-hover:bg-[#111] transition-all">
                       <ArrowUpRight className="w-6 h-6 text-[#111] group-hover:text-white transition-colors" />
                    </div>
                 </button>
               </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES ── */}
      <section className="py-40 bg-[#f8f8f8] border-y border-[#111]/10">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16">
          <Reveal className="mb-32 text-center">
             <span className="text-[10px] font-bold uppercase tracking-[1em] text-[#111]/40 mb-8 block italic">Operational Scope</span>
             <h2 className="text-7xl md:text-[10rem] font-black italic tracking-tighter leading-[0.8] uppercase text-[#111]">
                Technical <br/> <span className="text-[#111]/20 not-italic">Expertise.</span>
             </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#111]/10 border border-[#111]/10">
            {CAPABILITIES.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1} className="bg-white p-12 group hover:bg-[#111] transition-all duration-700">
                 <item.icon className="w-12 h-12 text-[#111]/20 group-hover:text-white transition-colors mb-8" />
                 <h3 className="text-2xl font-black italic uppercase text-[#111] group-hover:text-white mb-6 transition-colors">{item.title}</h3>
                 <p className="text-xs text-[#111]/40 group-hover:text-white/40 font-light tracking-widest uppercase italic leading-loose transition-colors">
                   {item.desc}
                 </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ATELIER / LABORATORY ── */}
      <section className="py-40 bg-white overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <Reveal>
             <div className="relative aspect-square bg-[#f8f8f8] border border-[#111]/5 p-20 flex flex-col justify-center group overflow-hidden">
                <div className="absolute top-0 right-0 p-12">
                   <Maximize2 className="w-16 h-16 text-[#111]/5 group-hover:text-[#111]/10 transition-colors" />
                </div>
                <Box className="w-16 h-16 text-[#111] mb-12" />
                <h3 className="text-5xl font-black italic uppercase text-[#111] mb-8">Industrial <br/> <span className="text-[#111]/20 not-italic">Forge.</span></h3>
                <p className="text-[#111]/40 text-lg leading-relaxed mb-12 font-light uppercase tracking-wide italic leading-loose">
                  Our Berlin atelier leverages heavy-industry fabrication techniques for the production of domestic-scale artifacts. We push the limits of material density and structural gravity.
                </p>
                <div className="flex gap-12 text-[10px] font-bold uppercase tracking-[0.5em] text-[#111]/30">
                   <span>[01] VACUUM_CASTING</span>
                   <span>[02] TITANIUM_BOND</span>
                </div>
             </div>
          </Reveal>
          <div className="space-y-24">
             <Reveal delay={0.2}>
                <span className="text-[10px] font-bold uppercase tracking-[1em] text-[#111]/40 mb-8 block italic">Curation_Sequence</span>
                <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-none uppercase text-[#111]">Structural <br/> <span className="text-[#111]/20 not-italic">Manifesto.</span></h2>
             </Reveal>
             <div className="space-y-12">
                {[
                  { n: "01", t: "Sectional Audit", d: "Rigorous cutting of complex volumes to reveal material spatial potential." },
                  { n: "02", t: "Stress Simulation", d: "Analyzing object performance under extreme structural and domestic loads." },
                  { n: "03", t: "Aging Protocol", d: "Monitoring the interaction of raw alloys with multi-generational oxidation." }
                ].map((step, i) => (
                  <Reveal key={step.n} delay={i * 0.1 + 0.3} className="flex gap-12 group border-l border-[#111]/10 pl-8 hover:border-[#111] transition-colors">
                    <span className="text-4xl font-black italic text-[#111]/10 group-hover:text-[#111] transition-colors">{step.n}</span>
                    <div>
                      <h4 className="text-xl font-black uppercase italic text-[#111] mb-2">{step.t}</h4>
                      <p className="text-xs text-[#111]/40 font-light tracking-widest uppercase italic leading-loose">{step.d}</p>
                    </div>
                  </Reveal>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* ── CTA / INQUIRY ── */}
      <section className="py-40 bg-[#f8f8f8] relative">
         <div className="max-w-[1600px] mx-auto px-8 md:px-16">
            <div className="bg-[#111] text-white p-24 lg:p-40 relative overflow-hidden flex flex-col items-center text-center group">
               <div className="absolute inset-0 opacity-10 grayscale brightness-110 group-hover:opacity-20 transition-opacity">
                  <Image src="https://images.unsplash.com/photo-1592078615290-033ee584e226?w=1600&q=80" alt="CTA Object" fill className="object-cover" />
               </div>
               <Reveal>
                  <span className="text-[10px] font-bold uppercase tracking-[1em] text-white/50 mb-12 block italic">Commission Initiation</span>
                  <h2 className="text-7xl md:text-[12rem] font-black italic tracking-tighter leading-[0.8] uppercase mb-16">
                     Own <br/> <span className="text-white/30 not-italic">The Weight.</span>
                  </h2>
                  <div className="flex flex-wrap justify-center gap-12 relative z-10">
                     <button className="px-20 py-8 bg-white text-black font-black uppercase text-sm tracking-[0.5em] hover:italic transition-all">
                        Request_Selection
                     </button>
                     <button className="px-20 py-8 border border-white/20 text-white font-black uppercase text-sm tracking-[0.5em] hover:bg-white/5 transition-all">
                        Atelier_Dossier
                     </button>
                  </div>
               </Reveal>
            </div>
         </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-white pt-40 pb-20 px-8 md:px-16 border-t border-[#111]/10">
         <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-32 mb-40">
            <div className="lg:col-span-6">
               <div className="flex items-center gap-4 mb-12">
                 <Box className="w-10 h-10 text-[#111]" />
                 <span className="text-3xl font-black tracking-tighter uppercase italic text-[#111]">NEO<span className="text-[#111]/30">//</span>OBJECT</span>
               </div>
               <p className="text-[#111]/40 text-sm font-light leading-relaxed uppercase tracking-[0.3em] mb-12 italic max-w-md">
                 Securing the future of material objects through industrial forge techniques and radical reduction logic.
               </p>
               <div className="flex gap-12">
                 {["TERMINAL", "OBJECT", "FORGE", "ALPHA"].map(s => (
                   <a key={s} href="#" className="text-[10px] font-bold hover:text-[#111] text-[#111]/30 transition-colors tracking-[0.5em]">[{s}]</a>
                 ))}
               </div>
            </div>
            
            <div className="lg:col-span-2">
               <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#111]/40 mb-12">Atelier</h4>
               <ul className="space-y-6 text-xs font-bold uppercase tracking-[0.4em]">
                 {["Objects", "Materials", "Forge", "Journal"].map(item => (
                   <li key={item}><a href="#" className="hover:text-[#111] transition-colors">{item}</a></li>
                 ))}
               </ul>
            </div>

            <div className="lg:col-span-4">
               <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#111]/40 mb-12">Partner Inquiry</h4>
               <p className="text-sm text-[#111]/40 font-light mb-12 italic uppercase tracking-[0.2em] leading-loose">
                 For new commissions, material studies, or industrial collaborations, contact our primary command center in Berlin.
               </p>
               <a href="mailto:atelier@neo-object.de" className="text-3xl font-black italic hover:text-[#111] transition-colors block border-b border-[#111]/10 pb-8 uppercase tracking-tighter">
                  atelier@neo-object.de
               </a>
            </div>
         </div>

         <div className="max-w-[1600px] mx-auto flex flex-col md:row items-center justify-between gap-12 text-[9px] font-bold uppercase tracking-[0.8em] text-[#111]/20 border-t border-[#111]/5 pt-20">
            <p>© 2024 NEO OBJECT ATELIER AG. ALL RIGHTS RESERVED. BERLIN // GLOBAL.</p>
            <div className="flex gap-16">
               <a href="#" className="hover:text-[#111] transition-colors">[Material_Vault]</a>
               <a href="#" className="hover:text-[#111] transition-colors">[Terms_of_Form]</a>
            </div>
         </div>
      </footer>
    </div>
  );
}
