"use client";

import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, Suspense } from "react";
import Image from "next/image";
import { ArrowUpRight, Menu, X, Layers, ShieldCheck, Plus, Play, ArrowRight, ChevronDown, Monitor, LayoutGrid, Clock, Compass, Cpu, Gem } from "lucide-react";
import "../premium.css";

// ─── DATA ──────────────────────────────────────────────────────────────────

const COLLECTIONS = [
  { 
    id: "01",
    title: "VULCAN_CHRONO", 
    material: "Forged Carbon & Bronze",
    caliber: "Calibre V.01 Automatic",
    img: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=1200&q=80",
    desc: "A high-performance chronograph engineered for extreme thermal environments, featuring an open-heart escapement."
  },
  { 
    id: "02",
    title: "AETHER_TOURBILLON", 
    material: "Polished Grade 5 Titanium",
    caliber: "Calibre A.88 Manual",
    img: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=1200&q=80",
    desc: "The pinnacle of horological complexity, housed in a near-weightless titanium monoblock case."
  },
  { 
    id: "03",
    title: "NOIR_GMT", 
    material: "DLC Coated Steel",
    caliber: "Calibre N.12 GMT",
    img: "https://images.unsplash.com/photo-1522337360788-8b13df772650?w=1200&q=80",
    desc: "A minimalist dual-time masterpiece designed for the global traveler, with 72-hour power reserve."
  }
];

const SPECS = [
  { label: "Precision", val: "+/- 1s", desc: "COSC certified accuracy across all positions." },
  { label: "Reserve", val: "120h", desc: "Proprietary dual-barrel energy storage system." },
  { label: "Depth", val: "300m", desc: "Triple-lock crown system for extreme maritime integrity." }
];

const HERITAGE = [
  { year: "1892", event: "Foundation", desc: "The Chronos family establishes its first workshop in Le Locle, Switzerland." },
  { year: "1944", event: "Military Spec", desc: "Commissioned to build navigational chronometers for trans-Atlantic flight." },
  { year: "2024", event: "Quantum Era", desc: "Introduction of the first silicon-escpaement with zero friction technology." }
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
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── MAIN SPA ────────────────────────────────────────────────────────────────

export default function ChronosAtelierSPA() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCollection, setActiveCollection] = useState(0);
  const { scrollY } = useScroll();
  
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 800], [1, 1.1]);
  const heroRotate = useTransform(scrollY, [0, 800], [0, 5]);

  return (
    <div className="min-h-screen bg-[#050505] text-[#d4af37] font-sans selection:bg-[#d4af37] selection:text-black">
      
      {/* ── NAVIGATION ── */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-10 mix-blend-difference"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 border border-[#d4af37]/40 rounded-full flex items-center justify-center relative overflow-hidden group">
            <Clock className="w-6 h-6 text-[#d4af37] group-hover:rotate-180 transition-transform duration-1000" />
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-t border-[#d4af37] rounded-full"
            />
          </div>
          <span className="text-2xl font-black tracking-[0.2em] uppercase italic">CHRONOS<span className="text-[#d4af37]/30">//</span>ATELIER</span>
        </div>
        
        <div className="hidden lg:flex items-center gap-16 text-[10px] font-bold uppercase tracking-[0.4em] text-[#d4af37]/40">
          {["Collections", "Heritage", "Calibre", "Bespoke"].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-[#d4af37] transition-colors tracking-[0.6em]">/{item}</a>
          ))}
        </div>

        <button 
          onClick={() => setMenuOpen(true)}
          className="flex items-center gap-4 group"
        >
          <div className="w-16 h-1 bg-[#d4af37]/20 relative overflow-hidden">
            <motion.div 
              animate={{ x: [-64, 64] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 h-full w-1/2 bg-[#d4af37]"
            />
          </div>
        </button>
      </motion.nav>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[60] bg-[#000] text-[#d4af37] p-12 flex flex-col justify-between"
          >
            <div className="flex justify-between items-center border-b border-[#d4af37]/10 pb-12">
              <span className="text-xl font-black uppercase tracking-[0.4em] italic">CHRONOS//ATELIER</span>
              <button onClick={() => setMenuOpen(false)} className="w-12 h-12 flex items-center justify-center border border-[#d4af37]/20 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-col gap-12">
              {["COLLECTIONS", "HERITAGE", "CALIBRE", "MANUFACTURE", "CONTACT"].map((item, i) => (
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
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.5em] border-t border-[#d4af37]/10 pt-12">
              <span>EST. 1892</span>
              <span>SWITZERLAND // LE LOCLE</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO SECTION ── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden border-b border-[#d4af37]/10">
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale, rotate: heroRotate }}
          className="absolute inset-0 z-0"
        >
          <Image 
            src="https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=1600&q=80" 
            alt="Hero Watch" 
            fill 
            className="object-cover grayscale opacity-30 brightness-50" 
            unoptimized 
          />
        </motion.div>

        <div className="relative z-10 text-center px-6">
          <Reveal>
            <span className="text-[10px] font-bold uppercase tracking-[1.5em] text-[#d4af37]/60 mb-12 block">Absolute Chronometry</span>
          </Reveal>
          <Reveal delay={0.2}>
            <h1 className="text-8xl md:text-[16rem] font-black tracking-tighter leading-[0.75] uppercase italic text-white mb-20">
              TIME <br/> <span className="not-italic text-[#d4af37]">CAPTURED.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="max-w-2xl mx-auto flex flex-col items-center gap-16 border-t border-[#d4af37]/10 pt-20">
              <p className="text-white/40 text-xl leading-relaxed font-light uppercase tracking-[0.2em] italic leading-loose text-center">
                Engineering precision that transcends generations. A symphony of high-tech materials and ancestral Swiss craftsmanship.
              </p>
              <div className="flex gap-8">
                <button className="px-16 py-6 bg-[#d4af37] text-black font-black uppercase text-xs tracking-[0.4em] hover:bg-white transition-colors">
                  Explore_Atelier
                </button>
                <button className="px-16 py-6 border border-[#d4af37]/20 text-[#d4af37] font-black uppercase text-xs tracking-[0.4em] hover:bg-[#d4af37]/5 transition-colors">
                  Technical_Vault
                </button>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end text-[10px] font-bold uppercase tracking-[0.5em] text-[#d4af37]/20">
          <div className="flex flex-col gap-2">
            <span>GMT_+1_LE_LOCLE</span>
            <div className="w-48 h-[1px] bg-[#d4af37]/20" />
          </div>
          <div className="flex items-center gap-4">
             <span className="animate-pulse">●</span> LIVE_DIAGNOSTICS: NOMINAL
          </div>
        </div>
      </section>

      {/* ── SPECS GRID ── */}
      <section className="py-40 bg-[#080808]">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-1px bg-[#d4af37]/10 border border-[#d4af37]/10">
            {SPECS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1} className="bg-[#050505] p-24 group hover:bg-[#d4af37]/5 transition-colors">
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#d4af37]/30 mb-12 block">{s.label}</span>
                <h3 className="text-7xl font-black italic text-white mb-8 group-hover:text-[#d4af37] transition-colors">{s.val}</h3>
                <p className="text-xs text-white/30 font-light tracking-widest uppercase italic leading-loose">
                  {s.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── COLLECTIONS SLIDER ── */}
      <section className="py-40 bg-black relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16">
          <Reveal className="mb-32">
             <div className="flex flex-col lg:flex-row justify-between items-end gap-12 border-b border-[#d4af37]/10 pb-12">
               <h2 className="text-7xl md:text-[10rem] font-black italic tracking-tighter leading-[0.8] uppercase text-white">
                 Selected <br/> <span className="text-[#d4af37] not-italic">Atoms.</span>
               </h2>
               <div className="text-right">
                  <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#d4af37]/40 mb-4 block italic">Curated_Manifest_2024</span>
                  <div className="flex gap-4">
                    {COLLECTIONS.map((_, i) => (
                      <button 
                        key={i} 
                        onClick={() => setActiveCollection(i)}
                        className={`w-16 h-2 transition-all ${activeCollection === i ? "bg-[#d4af37] w-32" : "bg-[#d4af37]/10"}`}
                      />
                    ))}
                  </div>
               </div>
             </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
            <div className="lg:col-span-7 relative aspect-[4/5] lg:aspect-video rounded-sm overflow-hidden border border-[#d4af37]/10 group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCollection}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image src={COLLECTIONS[activeCollection].img} alt={COLLECTIONS[activeCollection].title} fill className="object-cover brightness-75 group-hover:scale-105 transition-transform duration-[3s]" unoptimized />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                </motion.div>
              </AnimatePresence>
              <div className="absolute top-12 left-12 flex gap-4">
                 <span className="px-4 py-1 bg-[#d4af37] text-black text-[10px] font-black uppercase tracking-widest">{COLLECTIONS[activeCollection].id}</span>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-12">
               <motion.div
                  key={activeCollection}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="space-y-12"
               >
                 <h3 className="text-6xl md:text-8xl font-black italic uppercase text-white tracking-tighter">{COLLECTIONS[activeCollection].title}</h3>
                 <div className="grid grid-cols-2 gap-12 border-y border-[#d4af37]/10 py-12">
                    <div className="space-y-2">
                       <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#d4af37]/30">Material_Logic</span>
                       <span className="text-sm font-black text-white uppercase tracking-widest block">{COLLECTIONS[activeCollection].material}</span>
                    </div>
                    <div className="space-y-2">
                       <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#d4af37]/30">Heart_Calibre</span>
                       <span className="text-sm font-black text-white uppercase tracking-widest block">{COLLECTIONS[activeCollection].caliber}</span>
                    </div>
                 </div>
                 <p className="text-white/40 text-xl font-light italic leading-loose uppercase tracking-wide">
                   {COLLECTIONS[activeCollection].desc}
                 </p>
                 <button className="flex items-center gap-6 group">
                    <span className="text-[10px] font-bold uppercase tracking-[0.8em] text-[#d4af37]">Inquire_Collection</span>
                    <div className="w-16 h-16 border border-[#d4af37]/20 rounded-full flex items-center justify-center group-hover:bg-[#d4af37] transition-all">
                       <ArrowUpRight className="w-6 h-6 text-[#d4af37] group-hover:text-black transition-colors" />
                    </div>
                 </button>
               </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CALIBRE / MOVEMENT ── */}
      <section className="py-40 bg-[#080808] border-y border-[#d4af37]/10">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <div className="order-2 lg:order-1 space-y-24">
             <Reveal>
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#d4af37]/40 mb-8 block">Mechanical Heart</span>
                <h2 className="text-7xl md:text-[10rem] font-black italic tracking-tighter leading-[0.8] uppercase text-white">
                   The Kinetic <br/> <span className="text-[#d4af37] not-italic">Calibre.</span>
                </h2>
             </Reveal>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {[
                  { icon: Cpu, title: "Silicon Logic", desc: "Anti-magnetic escapement utilizing proprietary silicon crystal synthesis." },
                  { icon: Gem, title: "Jewelled Integrity", desc: "48 functional rubies ensuring zero-friction energy transfer." },
                  { icon: Layers, title: "Modular Architecture", desc: "Easily serviceable sub-plates designed for millimetric precision." },
                  { icon: ShieldCheck, title: "Stress Audited", desc: "5000G shock resistance rating via orbital-dampening cage." }
                ].map((item, i) => (
                  <Reveal key={item.title} delay={i * 0.1} className="p-12 bg-[#050505] border border-[#d4af37]/5 hover:border-[#d4af37]/20 transition-all group">
                     <item.icon className="w-10 h-10 text-[#d4af37] mb-8 group-hover:scale-110 transition-transform" />
                     <h3 className="text-xl font-black italic uppercase text-white mb-4">{item.title}</h3>
                     <p className="text-[10px] text-white/30 font-bold uppercase tracking-[0.2em] leading-loose italic">{item.desc}</p>
                  </Reveal>
                ))}
             </div>
          </div>
          <Reveal className="order-1 lg:order-2">
             <div className="relative aspect-square bg-[#0a0a0a] border border-[#d4af37]/10 p-24 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                   <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, #d4af37 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
                </div>
                <div className="relative z-10 w-full h-full border-2 border-[#d4af37]/20 rounded-full flex items-center justify-center">
                   <div className="w-3/4 h-3/4 border border-[#d4af37]/40 rounded-full animate-spin-slow flex items-center justify-center">
                      <Compass className="w-16 h-16 text-[#d4af37]" />
                   </div>
                </div>
                <div className="absolute bottom-12 right-12 text-right">
                   <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#d4af37]/20 block mb-2 italic">Calibre_V.01_Render</span>
                   <span className="text-4xl font-black text-white italic">28,800 VPH</span>
                </div>
             </div>
          </Reveal>
        </div>
      </section>

      {/* ── HERITAGE TIMELINE ── */}
      <section className="py-40 bg-black">
        <div className="max-w-[1200px] mx-auto px-8 md:px-16">
          <Reveal className="text-center mb-40">
             <span className="text-[10px] font-bold uppercase tracking-[1em] text-[#d4af37]/40 mb-12 block">Ancestral Roots</span>
             <h2 className="text-7xl md:text-9xl font-black italic tracking-tighter leading-[0.8] uppercase text-white">Heritage <br/> <span className="text-[#d4af37] not-italic">Ledger.</span></h2>
          </Reveal>

          <div className="space-y-px bg-[#d4af37]/10 border border-[#d4af37]/10">
             {HERITAGE.map((item, i) => (
               <Reveal key={item.year} delay={i * 0.1} className="bg-[#050505] p-16 grid grid-cols-1 md:grid-cols-12 gap-12 items-center group hover:bg-[#d4af37]/5 transition-colors">
                  <div className="md:col-span-3">
                     <span className="text-6xl font-black italic text-white group-hover:text-[#d4af37] transition-colors">{item.year}</span>
                  </div>
                  <div className="md:col-span-4">
                     <h3 className="text-xl font-black uppercase tracking-[0.2em] italic text-white">{item.event}</h3>
                  </div>
                  <div className="md:col-span-5">
                     <p className="text-white/40 text-sm font-light italic leading-loose uppercase tracking-widest">{item.desc}</p>
                  </div>
               </Reveal>
             ))}
          </div>
        </div>
      </section>

      {/* ── BESPOKE PORTAL / CTA ── */}
      <section className="py-40 bg-[#080808] relative">
         <div className="max-w-[1600px] mx-auto px-8 md:px-16">
            <div className="bg-[#d4af37] text-black p-24 lg:p-40 relative overflow-hidden flex flex-col items-center text-center">
               <div className="absolute inset-0 opacity-10 grayscale brightness-50">
                  <Image src="https://images.unsplash.com/photo-1522337360788-8b13df772650?w=1600&q=80" alt="CTA Watch" fill className="object-cover" />
               </div>
               <Reveal>
                  <span className="text-[10px] font-bold uppercase tracking-[1em] text-black/50 mb-12 block italic">One of One</span>
                  <h2 className="text-7xl md:text-[12rem] font-black italic tracking-tighter leading-[0.8] uppercase mb-16">
                     Bespoke <br/> <span className="text-black/30 not-italic">Atelier.</span>
                  </h2>
                  <div className="flex flex-wrap justify-center gap-12">
                     <button className="px-20 py-8 bg-black text-white font-black uppercase text-sm tracking-[0.4em] hover:italic transition-all">
                        Initiate_Inquiry
                     </button>
                     <button className="px-20 py-8 border border-black/20 text-black font-black uppercase text-sm tracking-[0.4em] hover:bg-black/5 transition-all">
                        Visit_Manifacture
                     </button>
                  </div>
               </Reveal>
            </div>
         </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-black pt-40 pb-20 px-8 md:px-16 border-t border-[#d4af37]/10">
         <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-32 mb-40">
            <div className="lg:col-span-6">
               <div className="flex items-center gap-4 mb-12">
                 <Clock className="w-10 h-10 text-[#d4af37]" />
                 <span className="text-3xl font-black tracking-[0.2em] uppercase italic">CHRONOS<span className="text-[#d4af37]/30">//</span>ATELIER</span>
               </div>
               <p className="text-[#d4af37]/30 text-sm font-light leading-relaxed uppercase tracking-[0.3em] mb-12 italic max-w-md">
                 Preserving the art of mechanical timekeeping through ancestral craftsmanship and high-tech material logic.
               </p>
               <div className="flex gap-12">
                 {["INSTAGRAM", "TWITTER", "YOUTUBE", "LINKEDIN"].map(s => (
                   <a key={s} href="#" className="text-[10px] font-bold hover:text-white text-[#d4af37]/30 transition-colors tracking-[0.4em]">[{s}]</a>
                 ))}
               </div>
            </div>
            
            <div className="lg:col-span-2">
               <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#d4af37]/40 mb-12">Manifacture</h4>
               <ul className="space-y-6 text-xs font-bold uppercase tracking-[0.4em]">
                 {["Collections", "Calibre", "Heritage", "Bespoke"].map(item => (
                   <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
                 ))}
               </ul>
            </div>

            <div className="lg:col-span-4">
               <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#d4af37]/40 mb-12">Atelier Inquiry</h4>
               <p className="text-sm text-[#d4af37]/20 font-light mb-12 italic uppercase tracking-[0.2em] leading-loose">
                 For acquisitions of our limited editions or to start a bespoke commission, contact our lead curator.
               </p>
               <a href="mailto:curator@chronos.ch" className="text-3xl font-black italic hover:text-white transition-colors block border-b border-[#d4af37]/10 pb-8 uppercase tracking-tighter">
                  curator@chronos.atelier
               </a>
            </div>
         </div>

         <div className="max-w-[1600px] mx-auto flex flex-col md:row items-center justify-between gap-12 text-[9px] font-bold uppercase tracking-[0.8em] text-[#d4af37]/10 border-t border-[#d4af37]/5 pt-20">
            <p>© 2024 CHRONOS ATELIER SA. ALL RIGHTS RESERVED. SWISS MADE.</p>
            <div className="flex gap-16">
               <a href="#" className="hover:text-white transition-colors">[Privacy_Vault]</a>
               <a href="#" className="hover:text-white transition-colors">[Terms_of_Sale]</a>
            </div>
         </div>
      </footer>
    </div>
  );
}
