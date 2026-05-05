"use client";

import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, Suspense } from "react";
import Image from "next/image";
import { ArrowUpRight, Menu, X, Layers, ShieldCheck, Plus, Play, ArrowRight, ChevronDown, Monitor, LayoutGrid, Sparkles, Gem, Hammer, History, Crown, Scale, Search, ChevronRight } from "lucide-react";
import "../premium.css";

// ─── DATA ──────────────────────────────────────────────────────────────────

const COLLECTIONS = [
  { 
    id: "01",
    title: "AURELIAN_CORE", 
    category: "High Jewelry",
    purity: "24K Solid Gold",
    img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&q=80",
    desc: "A masterwork of hand-forged auric textures, featuring rough-cut diamonds embedded in molten volcanic gold."
  },
  { 
    id: "02",
    title: "NEO_HERITAGE", 
    category: "Ancestral Synthesis",
    purity: "18K Rose & White",
    img: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=1200&q=80",
    desc: "Redefining classical filigree through 3D-printed titanium frameworks bonded with recycled oceanic gold."
  },
  { 
    id: "03",
    title: "VOID_SOLITAIRE", 
    category: "Bespoke Artifacts",
    purity: "Obsidian & Gold",
    img: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=1200&q=80",
    desc: "A singular expression of light and shadow, utilizing lab-grown black diamonds and matte-finished gold shells."
  }
];

const METRICS = [
  { label: "Purity_Audit", val: "99.99%", desc: "Absolute material integrity verified through mass-spectrometry synthesis." },
  { label: "Craft_Hours", val: "1200+", desc: "Average time dedicated to a single high-jewelry artifact in our atelier." },
  { label: "Heritage_Link", val: "EST. 1842", desc: "A century-long lineage of master smithing preserved in every joint." }
];

const ATELIER = [
  { icon: Hammer, title: "Hand-Forged", desc: "Preserving the ancestral art of hammer-thinning gold for unique kinetic resonance." },
  { icon: Gem, title: "Gem Curation", desc: "Ethically sourced rare stones, hand-selected for their internal light architecture." },
  { icon: Scale, title: "Precision Casting", desc: "Vacuum-casting gold alloys to achieve sub-micron structural fidelity." },
  { icon: History, title: "Archive Restore", desc: "Restoring 19th-century gold artifacts with modern structural integrity." }
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

export default function HeritageGoldSPA() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCollection, setActiveCollection] = useState(0);
  const { scrollY } = useScroll();
  
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 800], [1, 1.1]);
  const macroRotate = useTransform(scrollY, [0, 1000], [0, 10]);

  return (
    <div className="min-h-screen bg-[#050505] text-[#d4af37] font-serif selection:bg-[#d4af37] selection:text-black">
      
      {/* ── GRAIN OVERLAY ── */}
      <div className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* ── NAVIGATION ── */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-10 mix-blend-difference"
      >
        <div className="flex items-center gap-4">
          <Crown className="w-10 h-10 text-[#d4af37]" />
          <span className="text-2xl font-black tracking-tighter uppercase italic text-white">HERITAGE<span className="text-[#d4af37]/30">//</span>GOLD</span>
        </div>
        
        <div className="hidden lg:flex items-center gap-16 text-[10px] font-bold uppercase tracking-[0.5em] text-white/40 font-mono">
          {["Maison", "Collections", "Atelier", "Archive"].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-[#d4af37] transition-colors">/{item}</a>
          ))}
        </div>

        <button 
          onClick={() => setMenuOpen(true)}
          className="w-16 h-16 flex items-center justify-center border border-[#d4af37]/20 bg-white/5 backdrop-blur-md group"
        >
          <Menu className="w-6 h-6 text-[#d4af37] group-hover:scale-y-50 transition-transform" />
        </button>
      </motion.nav>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[60] bg-[#050505] text-[#d4af37] p-12 flex flex-col justify-between"
          >
            <div className="flex justify-between items-center border-b border-[#d4af37]/10 pb-12">
              <span className="text-xl font-black uppercase tracking-tighter italic">HERITAGE//GOLD</span>
              <button onClick={() => setMenuOpen(false)} className="w-12 h-12 flex items-center justify-center border border-[#d4af37]/20 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-col gap-10 text-center">
              {["THE MAISON", "HIGH COLLECTIONS", "BESPOKE ATELIER", "HERITAGE ARCHIVE", "PRIVATE INQUIRY"].map((item, i) => (
                <motion.a 
                  key={item}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  href="#"
                  className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter hover:text-white transition-all leading-none"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </motion.a>
              ))}
            </div>
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.5em] border-t border-[#d4af37]/10 pt-12 font-mono">
              <span>AURIC_MANIFEST_GROUP</span>
              <span>EST. 1842 // GENÈVE</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO SECTION ── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#020202]">
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="absolute inset-0 z-0"
        >
          <Image 
            src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1600&q=80" 
            alt="Hero Gold" 
            fill 
            className="object-cover grayscale brightness-50 contrast-125 opacity-30" 
            unoptimized 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020202]/40 via-transparent to-[#050505]" />
        </motion.div>

        <div className="relative z-10 text-center px-6">
          <Reveal>
            <span className="text-[10px] font-bold uppercase tracking-[2em] text-[#d4af37]/60 mb-12 block font-mono">Ancestral Excellence</span>
          </Reveal>
          <Reveal delay={0.2}>
            <h1 className="text-8xl md:text-[18rem] font-black tracking-tighter leading-[0.75] uppercase italic text-white mb-20">
              PURE <br/> <span className="not-italic text-[#d4af37]">AURIC.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="max-w-2xl mx-auto flex flex-col items-center gap-16 border-t border-[#d4af37]/10 pt-20">
              <p className="text-[#d4af37]/40 text-xl leading-relaxed font-light uppercase tracking-[0.3em] italic leading-loose text-center">
                Engineering the ultimate expressions of wealth and heritage. Where ancestral gold smithing meets high-fidelity curation.
              </p>
              <div className="flex gap-8">
                <button className="px-16 py-6 bg-[#d4af37] text-black font-black uppercase text-xs tracking-[0.4em] hover:bg-white transition-all font-mono">
                  Explore_Collections
                </button>
                <button className="px-16 py-6 border border-[#d4af37]/20 text-[#d4af37] font-black uppercase text-xs tracking-[0.4em] hover:bg-[#d4af37]/5 transition-colors font-mono">
                  Maison_Dossier
                </button>
              </div>
            </div>
          </Reveal>
        </div>

        <motion.div 
          style={{ rotate: macroRotate }}
          className="absolute bottom-12 left-12 hidden lg:block"
        >
          <div className="p-12 bg-white/5 backdrop-blur-md border border-[#d4af37]/10 space-y-4">
             <History className="w-10 h-10 text-[#d4af37]/40" />
             <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#d4af37]/40 block font-mono">Since_1842</span>
          </div>
        </motion.div>
      </section>

      {/* ── METRICS GRID ── */}
      <section className="py-40 bg-[#050505]">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-[#d4af37]/10 border border-[#d4af37]/10">
            {METRICS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1} className="bg-[#020202] p-24 group hover:bg-[#d4af37]/5 transition-all duration-700">
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#d4af37]/30 mb-12 block font-mono group-hover:text-[#d4af37]">{s.label}</span>
                <h3 className="text-7xl font-black italic text-[#d4af37] mb-8 group-hover:text-white transition-colors">{s.val}</h3>
                <p className="text-xs text-[#d4af37]/30 font-light tracking-widest uppercase italic leading-loose group-hover:text-white/40">
                  {s.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── COLLECTIONS SHOWCASE ── */}
      <section className="py-40 bg-black relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16">
          <Reveal className="mb-32">
             <div className="flex flex-col lg:flex-row justify-between items-end gap-12 border-b border-[#d4af37]/10 pb-12">
               <h2 className="text-7xl md:text-[10rem] font-black italic tracking-tighter leading-[0.8] uppercase text-white">
                 High <br/> <span className="text-[#d4af37] not-italic">Jewelry.</span>
               </h2>
               <div className="text-right">
                  <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#d4af37]/30 mb-4 block italic font-mono">Manifest_Sequence_2024</span>
                  <div className="flex gap-4">
                    {COLLECTIONS.map((_, i) => (
                      <button 
                        key={i} 
                        onClick={() => setActiveCollection(i)}
                        className={`w-16 h-1 transition-all ${activeCollection === i ? "bg-[#d4af37] w-32" : "bg-[#d4af37]/10"}`}
                      />
                    ))}
                  </div>
               </div>
             </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
            <div className="lg:col-span-8 relative aspect-video rounded-sm overflow-hidden border border-[#d4af37]/10 group bg-[#0a0a0a]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCollection}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image src={COLLECTIONS[activeCollection].img} alt={COLLECTIONS[activeCollection].title} fill className="object-cover grayscale brightness-75 group-hover:grayscale-0 transition-all duration-[2s]" unoptimized />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                </motion.div>
              </AnimatePresence>
              <div className="absolute bottom-12 left-12 flex flex-col gap-4">
                 <span className="text-[10px] font-black uppercase tracking-widest bg-[#d4af37] text-black px-6 py-2 font-mono">{COLLECTIONS[activeCollection].purity}</span>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-12">
               <motion.div
                  key={activeCollection}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-12"
               >
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#d4af37]/60 font-mono">{COLLECTIONS[activeCollection].id} // MANIFEST</span>
                 <h3 className="text-6xl md:text-8xl font-black italic uppercase text-white tracking-tighter">{COLLECTIONS[activeCollection].title}</h3>
                 <div className="space-y-6 border-y border-[#d4af37]/10 py-12">
                    <div className="flex justify-between items-center">
                       <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#d4af37]/30 font-mono">Category</span>
                       <span className="text-sm font-black text-white uppercase tracking-widest">{COLLECTIONS[activeCollection].category}</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#d4af37]/30 font-mono">Archive_Status</span>
                       <span className="text-sm font-black text-[#d4af37] uppercase tracking-widest italic">In_Private_Vault</span>
                    </div>
                 </div>
                 <p className="text-[#d4af37]/30 text-lg font-light italic leading-loose uppercase tracking-wide">
                   {COLLECTIONS[activeCollection].desc}
                 </p>
                 <button className="flex items-center gap-6 group">
                    <span className="text-[10px] font-bold uppercase tracking-[0.8em] text-[#d4af37] font-mono">Request_Inquiry</span>
                    <div className="w-16 h-16 border border-[#d4af37]/10 rounded-full flex items-center justify-center group-hover:bg-[#d4af37] transition-all">
                       <ArrowUpRight className="w-6 h-6 text-white group-hover:text-black transition-colors" />
                    </div>
                 </button>
               </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ATELIER / CRAFT ── */}
      <section className="py-40 bg-[#050505] border-y border-[#d4af37]/10">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16">
          <Reveal className="mb-32 text-center">
             <span className="text-[10px] font-bold uppercase tracking-[1em] text-[#d4af37]/40 mb-8 block italic font-mono">Operational Scope</span>
             <h2 className="text-7xl md:text-[10rem] font-black italic tracking-tighter leading-[0.8] uppercase text-white">
                Bespoke <br/> <span className="text-[#d4af37] not-italic">Atelier.</span>
             </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#d4af37]/10 border border-[#d4af37]/10">
            {ATELIER.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1} className="bg-[#020202] p-12 group hover:bg-[#d4af37]/5 transition-all duration-700">
                 <item.icon className="w-12 h-12 text-[#d4af37]/20 group-hover:text-[#d4af37] transition-colors mb-8" />
                 <h3 className="text-2xl font-black italic uppercase text-white mb-6">{item.title}</h3>
                 <p className="text-xs text-[#d4af37]/30 font-light tracking-widest uppercase italic leading-loose">
                   {item.desc}
                 </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAISON HISTORY / ARCHIVE ── */}
      <section className="py-40 bg-black overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <Reveal>
             <div className="relative aspect-square bg-[#050505] border border-[#d4af37]/5 p-20 flex flex-col justify-center group overflow-hidden">
                <div className="absolute top-0 right-0 p-12">
                   <Monitor className="w-16 h-16 text-[#d4af37]/5 group-hover:text-[#d4af37]/10 transition-colors" />
                </div>
                <History className="w-16 h-16 text-[#d4af37] mb-12" />
                <h3 className="text-5xl font-black italic uppercase text-white mb-8">Auric <br/> <span className="text-[#d4af37] not-italic">Lineage.</span></h3>
                <p className="text-[#d4af37]/30 text-lg leading-relaxed mb-12 font-light uppercase tracking-wide italic leading-loose">
                  Our heritage archive preserves the secret alloy formulas and hand-forging techniques developed over six generations. We continue to engineer gold as a vehicle for eternal spatial value.
                </p>
                <div className="flex gap-12 text-[10px] font-bold uppercase tracking-[0.5em] text-[#d4af37]/30 font-mono">
                   <span>[01] ALLOY_SYNTHESIS</span>
                   <span>[02] FORGE_PROTOCOL</span>
                </div>
             </div>
          </Reveal>
          <div className="space-y-24">
             <Reveal delay={0.2}>
                <span className="text-[10px] font-bold uppercase tracking-[1em] text-[#d4af37]/40 mb-8 block italic font-mono">Curation_Sequence</span>
                <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-none uppercase text-white">Ancestral <br/> <span className="text-[#d4af37] not-italic">Synthetics.</span></h2>
             </Reveal>
             <div className="space-y-12">
                {[
                  { n: "01", t: "Light Audit", d: "Analyzing gem facet architecture for optimal light refraction and spatial dopamine." },
                  { n: "02", t: "Molecular Bond", d: "Utilizing laser-welding for seamless integration of gold and non-metallic artifacts." },
                  { n: "03", t: "Heritage Scan", d: "3D-scanning archival masterworks to preserve their geometry for future synthesis." }
                ].map((step, i) => (
                  <Reveal key={step.n} delay={i * 0.1 + 0.3} className="flex gap-12 group border-l border-[#d4af37]/10 pl-8 hover:border-[#d4af37] transition-colors">
                    <span className="text-4xl font-black italic text-[#d4af37]/10 group-hover:text-[#d4af37] transition-colors">{step.n}</span>
                    <div>
                      <h4 className="text-xl font-black uppercase italic text-white mb-2">{step.t}</h4>
                      <p className="text-xs text-[#d4af37]/30 font-light tracking-widest uppercase italic leading-loose">{step.d}</p>
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
            <div className="bg-[#d4af37] text-black p-24 lg:p-40 relative overflow-hidden flex flex-col items-center text-center group">
               <div className="absolute inset-0 opacity-10 grayscale brightness-110 group-hover:opacity-20 transition-opacity">
                  <Image src="https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=1600&q=80" alt="CTA Gold" fill className="object-cover" />
               </div>
               <Reveal>
                  <span className="text-[10px] font-bold uppercase tracking-[1em] text-black/50 mb-12 block font-mono">Mandatory Selection</span>
                  <h2 className="text-7xl md:text-[12rem] font-black italic tracking-tighter leading-[0.8] uppercase mb-16">
                     Commission <br/> <span className="text-black/30 not-italic">Immortal.</span>
                  </h2>
                  <div className="flex flex-wrap justify-center gap-12 relative z-10">
                     <button className="px-20 py-8 bg-black text-[#d4af37] font-black uppercase text-sm tracking-[0.5em] hover:italic transition-all font-mono">
                        Request_Consultation
                     </button>
                     <button className="px-20 py-8 border border-black/20 text-black font-black uppercase text-sm tracking-[0.5em] hover:bg-black/5 transition-all font-mono">
                        Heritage_Vault
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
                 <Crown className="w-10 h-10 text-[#d4af37]" />
                 <span className="text-3xl font-black tracking-tighter uppercase italic text-white">HERITAGE<span className="text-[#d4af37]/30">//</span>GOLD</span>
               </div>
               <p className="text-[#d4af37]/30 text-sm font-light leading-relaxed uppercase tracking-[0.3em] mb-12 italic max-w-md">
                 Preserving the future of auric excellence through ancestral gold smithing and high-fidelity curation.
               </p>
               <div className="flex gap-12 font-mono">
                 {["TERMINAL", "AURIC", "VAULT", "ALPHA"].map(s => (
                   <a key={s} href="#" className="text-[10px] font-bold hover:text-white text-[#d4af37]/30 transition-colors tracking-[0.5em]">[{s}]</a>
                 ))}
               </div>
            </div>
            
            <div className="lg:col-span-2">
               <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#d4af37]/40 mb-12 font-mono">Maison</h4>
               <ul className="space-y-6 text-xs font-bold uppercase tracking-[0.4em] font-mono">
                 {["History", "Atelier", "Ethics", "Journal"].map(item => (
                   <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
                 ))}
               </ul>
            </div>

            <div className="lg:col-span-4">
               <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#d4af37]/40 mb-12 font-mono">Private Inquiry</h4>
               <p className="text-sm text-[#d4af37]/40 font-light mb-12 italic uppercase tracking-[0.2em] leading-loose">
                 For new commissions, archival restorations, or bespoke artifacts, contact our primary command center in Genève.
               </p>
               <a href="mailto:bespoke@heritage-gold.ch" className="text-3xl font-black italic hover:text-white transition-colors block border-b border-[#d4af37]/10 pb-8 uppercase tracking-tighter">
                  bespoke@heritage.gold
               </a>
            </div>
         </div>

         <div className="max-w-[1600px] mx-auto flex flex-col md:row items-center justify-between gap-12 text-[9px] font-bold uppercase tracking-[0.8em] text-[#d4af37]/20 border-t border-[#d4af37]/5 pt-20 font-mono">
            <p>© 2024 HERITAGE GOLD SA. ALL RIGHTS RESERVED. GENÈVE // GLOBAL.</p>
            <div className="flex gap-16">
               <a href="#" className="hover:text-white transition-colors">[Vault_Access]</a>
               <a href="#" className="hover:text-white transition-colors">[Terms_of_Equity]</a>
            </div>
         </div>
      </footer>
    </div>
  );
}
