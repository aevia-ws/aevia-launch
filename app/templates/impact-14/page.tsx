"use client";

import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, Suspense } from "react";
import Image from "next/image";
import { ArrowUpRight, Menu, X, Layers, ShieldCheck, Plus, Play, ArrowRight, ChevronDown, Monitor, LayoutGrid, Compass, Anchor, Wind, Droplets } from "lucide-react";
import "../premium.css";

// ─── DATA ──────────────────────────────────────────────────────────────────

const FLEET = [
  { 
    id: "01",
    title: "OCEAN_PHANTOM", 
    length: "88m",
    hull: "High-Tensile Steel",
    img: "https://images.unsplash.com/photo-1567899378494-47b22a28c6ad?w=1200&q=80",
    desc: "A stealth-inspired explorer vessel designed for trans-oceanic autonomy and extreme Arctic conditions."
  },
  { 
    id: "02",
    title: "SILVER_WAVE", 
    length: "62m",
    hull: "Lightweight Aluminum",
    img: "https://images.unsplash.com/photo-1544462242-94585e5ca8d2?w=1200&q=80",
    desc: "A performance-focused superyacht featuring a semi-displacement hull and hybrid propulsion systems."
  },
  { 
    id: "03",
    title: "AZURE_NOMAD", 
    length: "45m",
    hull: "Carbon Fiber Composite",
    img: "https://images.unsplash.com/photo-1605281317010-fe5ffe798156?w=1200&q=80",
    desc: "The ultimate lifestyle catamaran, offering unprecedented interior volume and panoramic glass architecture."
  }
];

const SPECS = [
  { label: "Range", val: "6500nm", desc: "Global autonomy without refuelling at 12 knots." },
  { label: "Speed", val: "28kts", desc: "Top velocity achieved via aero-hydrodynamic optimization." },
  { label: "Guests", val: "12+6", desc: "Luxurious accommodation with separate crew logistics." }
];

const ENGINEERING = [
  { id: "A", title: "Hydrodynamic Synthesis", desc: "Computational fluid dynamics (CFD) used to minimize drag and optimize stability." },
  { id: "B", title: "Zero-G Interior", desc: "Vibration-dampening floor systems and acoustic insulation for silent cruising." },
  { id: "C", title: "Sustainable Propulsion", desc: "Hydrogen-ready battery arrays and low-emission diesel-electric turbines." },
  { id: "D", title: "Tactical Navigation", desc: "Augmented reality bridge systems for safer maritime operations." }
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

export default function AethelMaritimeSPA() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeVessel, setActiveVessel] = useState(0);
  const { scrollY } = useScroll();
  
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 800], [1, 1.05]);
  const oceanY = useTransform(scrollY, [0, 1000], [0, 150]);

  return (
    <div className="min-h-screen bg-[#020408] text-[#e2e8f0] font-sans selection:bg-[#38bdf8] selection:text-white">
      
      {/* ── NAVIGATION ── */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-10 mix-blend-difference"
      >
        <div className="flex items-center gap-4">
          <Anchor className="w-10 h-10 text-[#38bdf8]" />
          <span className="text-2xl font-black tracking-tighter uppercase italic">AETHEL<span className="text-[#38bdf8]">//</span>MARITIME</span>
        </div>
        
        <div className="hidden lg:flex items-center gap-16 text-[10px] font-bold uppercase tracking-[0.5em] text-white/40">
          {["Fleet", "Engineering", "Atelier", "Inquiry"].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-[#38bdf8] transition-colors">/{item}</a>
          ))}
        </div>

        <button 
          onClick={() => setMenuOpen(true)}
          className="w-12 h-12 flex flex-col items-center justify-center gap-1.5 group"
        >
          <span className="w-8 h-[2px] bg-white group-hover:w-10 transition-all" />
          <span className="w-10 h-[2px] bg-white group-hover:w-8 transition-all" />
        </button>
      </motion.nav>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[60] bg-[#020408] text-white p-12 flex flex-col justify-between"
          >
            <div className="flex justify-between items-center border-b border-white/5 pb-12">
              <span className="text-xl font-black uppercase tracking-tighter italic">AETHEL//MARITIME</span>
              <button onClick={() => setMenuOpen(false)} className="w-12 h-12 flex items-center justify-center border border-white/10 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-col gap-12">
              {["THE FLEET", "ENGINEERING", "INTERIOR ATELIER", "GLOBAL SUPPORT", "INQUIRY"].map((item, i) => (
                <motion.a 
                  key={item}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  href="#"
                  className="text-6xl md:text-9xl font-black uppercase italic tracking-tighter hover:text-[#38bdf8] transition-all leading-none"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </motion.a>
              ))}
            </div>
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.5em] border-t border-white/5 pt-12">
              <span>MASTERS OF THE DEEP</span>
              <span>EST. 1988 // MONACO</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO SECTION ── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale, y: oceanY }}
          className="absolute inset-0 z-0"
        >
          <Image 
            src="https://images.unsplash.com/photo-1567899378494-47b22a28c6ad?w=1600&q=80" 
            alt="Hero Yacht" 
            fill 
            className="object-cover brightness-50 contrast-125" 
            unoptimized 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020408]/40 via-transparent to-[#020408]" />
        </motion.div>

        <div className="relative z-10 text-center px-6">
          <Reveal>
            <span className="text-[10px] font-bold uppercase tracking-[1.5em] text-[#38bdf8] mb-12 block">Maritime Supremacy</span>
          </Reveal>
          <Reveal delay={0.2}>
            <h1 className="text-8xl md:text-[16rem] font-black tracking-tighter leading-[0.75] uppercase italic text-white mb-20">
              DEEP <br/> <span className="not-italic text-[#38bdf8]">EXCELLENCE.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="max-w-2xl mx-auto flex flex-col items-center gap-16 border-t border-white/10 pt-20">
              <p className="text-white/40 text-xl leading-relaxed font-light uppercase tracking-[0.2em] italic leading-loose text-center">
                Engineering the ultimate vessels for global exploration. Where high-speed performance meets architectural luxury.
              </p>
              <div className="flex gap-8">
                <button className="px-16 py-6 bg-white text-black font-black uppercase text-xs tracking-[0.4em] hover:bg-[#38bdf8] hover:text-white transition-colors">
                  View_Fleet
                </button>
                <button className="px-16 py-6 border border-white/20 text-white font-black uppercase text-xs tracking-[0.4em] hover:bg-white/5 transition-colors">
                  The_Atelier
                </button>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end text-[10px] font-bold uppercase tracking-[0.5em] text-white/20">
          <div className="flex flex-col gap-2">
            <span>Coordinates: 43.731° N, 7.420° E</span>
            <div className="w-48 h-[1px] bg-white/20" />
          </div>
          <div className="flex items-center gap-4">
             <Wind className="w-4 h-4 text-[#38bdf8]" /> 12 KNOTS // SSW
          </div>
        </div>
      </section>

      {/* ── SPECS ── */}
      <section className="py-40 bg-[#020408]">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-white/5 border border-white/5">
            {SPECS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1} className="bg-[#020408] p-24 group hover:bg-[#38bdf8]/5 transition-colors">
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#38bdf8]/40 mb-12 block">{s.label}</span>
                <h3 className="text-7xl font-black italic text-white mb-8 group-hover:text-[#38bdf8] transition-colors">{s.val}</h3>
                <p className="text-xs text-white/30 font-light tracking-widest uppercase italic leading-loose">
                  {s.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FLEET SHOWCASE ── */}
      <section className="py-40 bg-[#010204] relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16">
          <Reveal className="mb-32">
             <div className="flex flex-col lg:flex-row justify-between items-end gap-12 border-b border-white/5 pb-12">
               <h2 className="text-7xl md:text-[10rem] font-black italic tracking-tighter leading-[0.8] uppercase text-white">
                 The <br/> <span className="text-[#38bdf8] not-italic">Vessels.</span>
               </h2>
               <div className="text-right">
                  <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/20 mb-4 block italic">Portfolio_2024</span>
                  <div className="flex gap-4">
                    {FLEET.map((_, i) => (
                      <button 
                        key={i} 
                        onClick={() => setActiveVessel(i)}
                        className={`w-16 h-1 transition-all ${activeVessel === i ? "bg-[#38bdf8] w-32" : "bg-white/10"}`}
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
                  key={activeVessel}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image src={FLEET[activeVessel].img} alt={FLEET[activeVessel].title} fill className="object-cover grayscale brightness-75 group-hover:grayscale-0 transition-all duration-1000" unoptimized />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#010204] via-transparent to-transparent opacity-80" />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="lg:col-span-4 space-y-12">
               <motion.div
                  key={activeVessel}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-12"
               >
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#38bdf8]">{FLEET[activeVessel].id} // MANIFEST</span>
                 <h3 className="text-6xl font-black italic uppercase text-white tracking-tighter">{FLEET[activeVessel].title}</h3>
                 <div className="space-y-6 border-y border-white/5 py-12">
                    <div className="flex justify-between items-center">
                       <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">Total_Length</span>
                       <span className="text-sm font-black text-white uppercase tracking-widest">{FLEET[activeVessel].length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">Hull_Material</span>
                       <span className="text-sm font-black text-white uppercase tracking-widest">{FLEET[activeVessel].hull}</span>
                    </div>
                 </div>
                 <p className="text-white/30 text-lg font-light italic leading-loose uppercase tracking-wide">
                   {FLEET[activeVessel].desc}
                 </p>
                 <button className="flex items-center gap-6 group">
                    <span className="text-[10px] font-bold uppercase tracking-[0.8em] text-[#38bdf8]">Request_Specs</span>
                    <div className="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center group-hover:bg-[#38bdf8] group-hover:border-[#38bdf8] transition-all">
                       <ArrowUpRight className="w-6 h-6 text-white transition-colors" />
                    </div>
                 </button>
               </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ENGINEERING ── */}
      <section className="py-40 bg-[#020408] border-y border-white/5">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16">
          <Reveal className="mb-32 text-center">
             <span className="text-[10px] font-bold uppercase tracking-[1em] text-[#38bdf8]/40 mb-8 block">Structural Logic</span>
             <h2 className="text-7xl md:text-[10rem] font-black italic tracking-tighter leading-[0.8] uppercase text-white">
                Fluid <br/> <span className="text-[#38bdf8] not-italic">Synthesis.</span>
             </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5">
            {ENGINEERING.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1} className="bg-[#020408] p-12 group hover:bg-[#38bdf8]/5 transition-colors">
                 <span className="text-4xl font-black italic text-white/10 mb-8 block group-hover:text-[#38bdf8] transition-colors">{item.id}</span>
                 <h3 className="text-xl font-black italic uppercase text-white mb-6">{item.title}</h3>
                 <p className="text-xs text-white/30 font-light tracking-widest uppercase italic leading-loose">
                   {item.desc}
                 </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ATELIER / INTERIOR ── */}
      <section className="py-40 bg-black overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <Reveal>
             <div className="relative aspect-square bg-[#050505] border border-white/5 p-20 flex flex-col justify-center group overflow-hidden">
                <div className="absolute top-0 right-0 p-12">
                   <Monitor className="w-16 h-16 text-white/5 group-hover:text-[#38bdf8]/20 transition-colors" />
                </div>
                <Droplets className="w-16 h-16 text-[#38bdf8] mb-12" />
                <h3 className="text-5xl font-black italic uppercase text-white mb-8">Atmospheric <br/> <span className="text-[#38bdf8] not-italic">Atelier.</span></h3>
                <p className="text-white/30 text-lg leading-relaxed mb-12 font-light uppercase tracking-wide italic leading-loose">
                  Our interiors are conceived as private sanctuaries. We utilize exotic timbers, precious metals, and advanced acoustic dampening to ensure a total disconnect from the external environment.
                </p>
                <div className="flex gap-12 text-[10px] font-bold uppercase tracking-[0.5em] text-white/20">
                   <span>[01] RARE_TIMBERS</span>
                   <span>[02] ACOUSTIC_ZERO</span>
                </div>
             </div>
          </Reveal>
          <div className="space-y-24">
             <Reveal delay={0.2}>
                <span className="text-[10px] font-bold uppercase tracking-[1em] text-[#38bdf8]/40 mb-8 block italic">Curation_Process</span>
                <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-none uppercase text-white">Bespoke <br/> <span className="text-[#38bdf8] not-italic">Manifesto.</span></h2>
             </Reveal>
             <div className="space-y-12">
                {[
                  { n: "01", t: "Material Audit", d: "Rigorous sourcing of raw materials from certified sustainable ecosystems." },
                  { n: "02", t: "Spatial Logic", d: "Maximizing volume and natural light through innovative structural engineering." },
                  { n: "03", t: "Artisan Build", d: "Hand-finished details by world-class cabinet makers and leather smiths." }
                ].map((step, i) => (
                  <Reveal key={step.n} delay={i * 0.1 + 0.3} className="flex gap-12 group border-l border-white/5 pl-8 hover:border-[#38bdf8] transition-colors">
                    <span className="text-4xl font-black italic text-white/10 group-hover:text-[#38bdf8] transition-colors">{step.n}</span>
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
      <section className="py-40 bg-[#020408] relative">
         <div className="max-w-[1600px] mx-auto px-8 md:px-16">
            <div className="bg-white text-black p-24 lg:p-40 relative overflow-hidden flex flex-col items-center text-center group">
               <div className="absolute inset-0 opacity-10 grayscale brightness-50 group-hover:opacity-20 transition-opacity">
                  <Image src="https://images.unsplash.com/photo-1544462242-94585e5ca8d2?w=1600&q=80" alt="CTA Yacht" fill className="object-cover" />
               </div>
               <Reveal>
                  <span className="text-[10px] font-bold uppercase tracking-[1em] text-black/50 mb-12 block">Secure Initiation</span>
                  <h2 className="text-7xl md:text-[12rem] font-black italic tracking-tighter leading-[0.8] uppercase mb-16">
                     Command <br/> <span className="text-black/30 not-italic">The Deep.</span>
                  </h2>
                  <div className="flex flex-wrap justify-center gap-8 relative z-10">
                     <button className="px-20 py-8 bg-black text-white font-black uppercase text-sm tracking-[0.5em] hover:italic transition-all">
                        Initiate_Dialogue
                     </button>
                     <button className="px-20 py-8 border border-black/20 text-black font-black uppercase text-sm tracking-[0.5em] hover:bg-black/5 transition-all">
                        Fleet_Manifest
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
                 <Anchor className="w-10 h-10 text-[#38bdf8]" />
                 <span className="text-3xl font-black tracking-tighter uppercase italic">AETHEL<span className="text-[#38bdf8]">//</span>MARITIME</span>
               </div>
               <p className="text-white/20 text-sm font-light leading-relaxed uppercase tracking-[0.3em] mb-12 italic max-w-md">
                 Designing the future of maritime exploration through high-fidelity engineering and architectural supremacy.
               </p>
               <div className="flex gap-12">
                 {["INSTAGRAM", "LINKEDIN", "VIMEO", "BEHANCE"].map(s => (
                   <a key={s} href="#" className="text-[10px] font-bold hover:text-white text-white/20 transition-colors tracking-[0.5em]">[{s}]</a>
                 ))}
               </div>
            </div>
            
            <div className="lg:col-span-2">
               <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/40 mb-12">Atelier</h4>
               <ul className="space-y-6 text-xs font-bold uppercase tracking-[0.5em]">
                 {["The Fleet", "Engineering", "Interior", "Journal"].map(item => (
                   <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
                 ))}
               </ul>
            </div>

            <div className="lg:col-span-4">
               <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/40 mb-12">Bespoke Inquiry</h4>
               <p className="text-sm text-white/20 font-light mb-12 italic uppercase tracking-[0.2em] leading-loose">
                 For acquisitions, charter inquiries, or architectural commissions, contact our global command center.
               </p>
               <a href="mailto:command@aethel-maritime.com" className="text-3xl font-black italic hover:text-[#38bdf8] transition-colors block border-b border-white/10 pb-8 uppercase tracking-tighter">
                  command@aethel.maritime
               </a>
            </div>
         </div>

         <div className="max-w-[1600px] mx-auto flex flex-col md:row items-center justify-between gap-12 text-[9px] font-bold uppercase tracking-[0.8em] text-white/10 border-t border-white/5 pt-20">
            <p>© 2024 AETHEL MARITIME GROUP. ALL RIGHTS RESERVED. MONACO // GLOBAL.</p>
            <div className="flex gap-16">
               <a href="#" className="hover:text-white transition-colors">[Logistics_Protocol]</a>
               <a href="#" className="hover:text-white transition-colors">[Terms_of_Command]</a>
            </div>
         </div>
      </footer>
    </div>
  );
}
