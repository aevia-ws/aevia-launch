"use client";

import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, Suspense } from "react";
import Image from "next/image";
import { ArrowUpRight, ChevronDown, Menu, X, LayoutGrid, Maximize2, Layers, Compass, Monitor, ShieldCheck, MousePointer2, Plus, Play } from "lucide-react";
import "../premium.css";

// ─── DATA ──────────────────────────────────────────────────────────────────

const ARCHIVE = [
  { 
    id: "01",
    title: "Vortex Pavilion", 
    location: "Zurich, CH",
    year: "2024",
    category: "Commercial",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
    desc: "A fluid-form commercial landmark exploring the boundaries of structural glass and carbon fiber composites."
  },
  { 
    id: "02",
    title: "Monolith House", 
    location: "Oslo, NO",
    year: "2023",
    category: "Residential",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
    desc: "Brutalist concrete dwelling integrated into the rocky coastline, featuring subterranean thermal management."
  },
  { 
    id: "03",
    title: "Aether Tower", 
    location: "Dubai, UAE",
    year: "2025",
    category: "Hospitality",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
    desc: "Ultra-luxury hotel concept utilizing reflective titanium cladding and vertical botanical sanctuaries."
  },
  { 
    id: "04",
    title: "Silent Atrium", 
    location: "Kyoto, JP",
    year: "2024",
    category: "Cultural",
    img: "https://images.unsplash.com/photo-1518005020250-68a377a747e9?w=1200&q=80",
    desc: "Minimalist meditation center focusing on acoustic transparency and natural light modulation."
  }
];

const SERVICES = [
  { icon: Maximize2, title: "CGI Synthesis", desc: "Photorealistic spatial rendering using proprietary light-path algorithms." },
  { icon: Layers, title: "BIM Integration", desc: "Full architectural data layering for seamless construction transitions." },
  { icon: Monitor, title: "Digital Twins", desc: "Interactive real-time simulations of atmospheric and structural performance." },
  { icon: Compass, title: "Site Analysis", desc: "Environmental data mapping including solar tracking and acoustic audits." }
];

const PHILOSOPHY = [
  { label: "Precision", val: "0.01mm", desc: "Absolute accuracy in structural replication." },
  { label: "Rendering", val: "8K Native", desc: "Ultra-high fidelity visual outputs for large-scale displays." },
  { label: "Sync", val: "Real-Time", desc: "Live-update workflows across all design stakeholders." }
];

const STATS = [
  { val: 120, label: "Global Projects", suffix: "+" },
  { val: 15, label: "Design Awards", suffix: "" },
  { val: 98, label: "Client Satisfaction", suffix: "%" },
  { val: 24, label: "Hour Support", suffix: "h" }
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
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function MagneticButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLButtonElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.35;
    const y = (clientY - (top + height / 2)) * 0.35;
    setPos({ x, y });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      className={`relative group ${className}`}
    >
      <span className="relative z-10">{children}</span>
      <motion.div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 rounded-full transition-opacity" />
    </motion.button>
  );
}

// ─── MAIN SPA ────────────────────────────────────────────────────────────────

export default function AetherArchSPA() {
  const [activeArchive, setActiveArchive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 600], [1, 1.1]);
  const heroY = useTransform(scrollY, [0, 600], [0, 100]);

  return (
    <div className="min-h-screen bg-[#080808] text-[#e0e0e0] font-sans selection:bg-[#c9a84c] selection:text-black">
      
      {/* ── CUSTOM CURSOR ── */}
      <motion.div 
        className="fixed top-0 left-0 w-8 h-8 border border-[#c9a84c]/50 rounded-full pointer-events-none z-[9999] hidden lg:block"
        animate={{ x: -16, y: -16 }}
        style={{ x: 0, y: 0 }}
      />

      {/* ── NAVIGATION ── */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 mix-blend-difference"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-black rotate-45" />
          </div>
          <span className="text-xl font-bold tracking-tighter uppercase italic">Aether <span className="text-[#c9a84c]">Visuals.</span></span>
        </div>
        
        <div className="hidden md:flex items-center gap-12 text-[10px] font-bold uppercase tracking-[0.3em]">
          {["Archives", "Philosophy", "Lab", "Contact"].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-[#c9a84c] transition-colors">/{item}</a>
          ))}
        </div>

        <button 
          onClick={() => setMenuOpen(true)}
          className="w-12 h-12 flex flex-col items-center justify-center gap-1.5 group"
        >
          <span className="w-6 h-[2px] bg-white group-hover:w-8 transition-all" />
          <span className="w-8 h-[2px] bg-white group-hover:w-6 transition-all" />
        </button>
      </motion.nav>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-[#c9a84c] text-black p-12 flex flex-col justify-between"
          >
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold uppercase tracking-widest">Navigation</span>
              <button onClick={() => setMenuOpen(false)} className="w-12 h-12 flex items-center justify-center">
                <X className="w-8 h-8" />
              </button>
            </div>
            <div className="flex flex-col gap-8">
              {["Archives", "Philosophy", "Lab", "Journal", "Contact"].map((item, i) => (
                <motion.a 
                  key={item}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  href="#"
                  className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter hover:italic transition-all leading-none"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </motion.a>
              ))}
            </div>
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest border-t border-black/20 pt-8">
              <span>Aether Visuals // 2024</span>
              <span>Based in Zurich</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO SECTION ── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="absolute inset-0 z-0"
        >
          <Image 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80" 
            alt="Hero Arch" 
            fill 
            className="object-cover grayscale opacity-30" 
            unoptimized 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#080808]/50 to-[#080808]" />
        </motion.div>

        <div className="relative z-10 text-center px-6">
          <Reveal delay={0.2}>
            <span className="text-[10px] font-bold uppercase tracking-[1em] text-[#c9a84c] mb-8 block">Synthetic Realities</span>
          </Reveal>
          <Reveal delay={0.4}>
            <h1 className="text-7xl md:text-[14rem] font-black italic tracking-tighter leading-[0.75] uppercase text-white mb-12">
              Beyond <br/> <span className="text-[#c9a84c] not-italic">Matter.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.6} className="max-w-2xl mx-auto mb-16">
            <p className="text-white/40 text-xl leading-relaxed font-light uppercase tracking-wide italic leading-loose">
              Synthesizing architectural vision into photorealistic precision. We don't just render space; we simulate light, texture, and time.
            </p>
          </Reveal>
          <Reveal delay={0.8}>
            <div className="flex flex-wrap justify-center gap-6">
              <MagneticButton className="px-10 py-5 bg-white text-black font-black uppercase text-xs tracking-widest flex items-center gap-3">
                View Archives <ArrowUpRight className="w-4 h-4" />
              </MagneticButton>
              <button className="px-10 py-5 border border-white/10 font-black uppercase text-xs tracking-widest hover:bg-white/5 transition-colors">
                The Process
              </button>
            </div>
          </Reveal>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/20">
          <span className="text-[8px] font-bold uppercase tracking-[0.5em] rotate-90 mb-8">Scroll</span>
          <div className="w-px h-12 bg-white/20 relative overflow-hidden">
            <motion.div 
              animate={{ y: [0, 48] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-1/2 bg-[#c9a84c]"
            />
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY GRID ── */}
      <section className="py-40 bg-[#0a0a0a] border-y border-white/5">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-end mb-32">
            <Reveal>
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#c9a84c] mb-8 block">Technical Core</span>
              <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase text-white">The Precision <br/> <span className="text-[#c9a84c] not-italic">Engine.</span></h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-white/30 text-lg leading-relaxed max-w-xl font-light italic">
                Our methodology rests at the intersection of high-end CGI and structural engineering. We utilize proprietary light-path synthesis to ensure that every photon behaves according to the laws of physical reality.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-1px bg-white/5 border border-white/5">
            {PHILOSOPHY.map((item, i) => (
              <Reveal key={item.label} delay={i * 0.1} className="bg-[#080808] p-16 group hover:bg-[#c9a84c]/5 transition-colors">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20 mb-8 block">{item.label}</span>
                <h3 className="text-6xl font-black italic text-white mb-6 group-hover:text-[#c9a84c] transition-colors">{item.val}</h3>
                <p className="text-sm text-white/30 font-light tracking-widest uppercase italic leading-loose">{item.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE ARCHIVE ── */}
      <section className="py-40 bg-black overflow-hidden relative">
        <div className="absolute top-0 left-0 w-[50rem] h-[50rem] bg-[#c9a84c]/5 blur-[150px] rounded-full -translate-x-1/2 -translate-y-1/2" />
        
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
          <Reveal className="mb-32">
            <div className="flex justify-between items-end">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#c9a84c] mb-8 block">Project Manifest</span>
                <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase text-white">Visual <br/> <span className="text-[#c9a84c] not-italic">Ledger.</span></h2>
              </div>
              <div className="hidden lg:flex gap-12 text-[10px] font-bold uppercase tracking-[0.4em] text-white/20">
                <span>Total Archives: 084</span>
                <span>Active Projects: 12</span>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* List */}
            <div className="lg:col-span-4 space-y-4">
              {ARCHIVE.map((project, i) => (
                <button 
                  key={project.id}
                  onMouseEnter={() => setActiveArchive(i)}
                  className={`w-full text-left p-8 border transition-all flex justify-between items-center group ${activeArchive === i ? "bg-white text-black border-white" : "bg-transparent text-white/40 border-white/5 hover:border-white/20"}`}
                >
                  <div>
                    <span className="text-[10px] font-bold mb-2 block tracking-widest opacity-40">{project.id} //</span>
                    <h3 className="text-2xl font-black uppercase italic tracking-tighter">{project.title}</h3>
                  </div>
                  <ArrowUpRight className={`w-6 h-6 transition-transform ${activeArchive === i ? "translate-x-0" : "-translate-x-4 opacity-0"}`} />
                </button>
              ))}
            </div>

            {/* Preview */}
            <div className="lg:col-span-8 relative aspect-[16/10] bg-white/5 rounded-sm overflow-hidden border border-white/5">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeArchive}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0"
                >
                  <Image 
                    src={ARCHIVE[activeArchive].img} 
                    alt={ARCHIVE[activeArchive].title} 
                    fill 
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-1000" 
                    unoptimized 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end">
                    <div className="max-w-md">
                      <div className="flex gap-4 mb-6">
                        <span className="px-3 py-1 bg-[#c9a84c] text-black text-[9px] font-black uppercase tracking-widest">{ARCHIVE[activeArchive].category}</span>
                        <span className="px-3 py-1 bg-white/10 text-white text-[9px] font-black uppercase tracking-widest">{ARCHIVE[activeArchive].location}</span>
                      </div>
                      <p className="text-white/60 text-sm font-light italic leading-loose uppercase tracking-widest">
                        {ARCHIVE[activeArchive].desc}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-4xl font-black text-white italic block mb-1">{ARCHIVE[activeArchive].year}</span>
                      <span className="text-[9px] font-bold text-[#c9a84c] uppercase tracking-[0.4em]">Completion_Date</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES SECTION ── */}
      <section className="py-40 bg-[#080808]">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
          <Reveal className="mb-32 text-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#c9a84c] mb-8 block">Operational Scope</span>
            <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase text-white">Expertise <br/> <span className="text-[#c9a84c] not-italic">Synthesis.</span></h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1} className="p-12 bg-white/[0.02] border border-white/5 hover:border-[#c9a84c]/30 transition-all group">
                <s.icon className="w-10 h-10 text-[#c9a84c] mb-12 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-black italic uppercase text-white mb-6">{s.title}</h3>
                <p className="text-sm text-white/30 font-light tracking-widest uppercase italic leading-loose">
                  {s.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── LAB / TECHNICAL SPECS ── */}
      <section className="py-40 border-y border-white/5 bg-[#0a0a0a]">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <Reveal>
            <div className="relative aspect-square bg-white/[0.02] border border-white/5 p-16 flex flex-col justify-center overflow-hidden group">
               <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
                  <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
               </div>
               <ShieldCheck className="w-20 h-20 text-[#c9a84c] mb-12" />
               <h3 className="text-5xl font-black italic uppercase text-white mb-8">Structural <br/> Integrity <span className="text-[#c9a84c] not-italic">Audit.</span></h3>
               <p className="text-white/30 text-lg leading-relaxed mb-12 font-light uppercase tracking-wide italic leading-loose">
                 Every visualization undergoes a rigorous material audit. We ensure that textures reflect physical IOR values and that light bounces align with the Kelvin scale of the intended site.
               </p>
               <div className="grid grid-cols-2 gap-12">
                  <div className="space-y-2">
                     <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/20">Render Node Status</span>
                     <span className="text-sm font-black text-white uppercase tracking-widest block">ONLINE // 124 NODES</span>
                  </div>
                  <div className="space-y-2">
                     <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/20">Encryption Protocol</span>
                     <span className="text-sm font-black text-white uppercase tracking-widest block">AES-512-VULCAN</span>
                  </div>
               </div>
            </div>
          </Reveal>
          <div className="space-y-24">
            <Reveal delay={0.2}>
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#c9a84c] mb-8 block">Project Lifecyle</span>
              <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-none uppercase text-white">Atomic <br/> <span className="text-[#c9a84c] not-italic">Workflows.</span></h2>
            </Reveal>
            <div className="space-y-12">
              {[
                { n: "01", t: "Geometry Ingestion", d: "Deep analysis of CAD/BIM data for structural fidelity." },
                { n: "02", t: "Material Synthesis", d: "Creation of physical-based shaders following real-world specs." },
                { n: "03", t: "Atmospheric Simulation", d: "Dynamic lighting based on GPS coordinates and time-series data." },
              ].map((step, i) => (
                <Reveal key={step.n} delay={i * 0.1 + 0.3} className="flex gap-12 group">
                  <span className="text-4xl font-black italic text-[#c9a84c]/20 group-hover:text-[#c9a84c] transition-colors">{step.n}</span>
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

      {/* ── STATS SECTION ── */}
      <section className="py-24 bg-black">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16 grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-1px bg-white/5 border border-white/5 overflow-hidden">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1} className="bg-black py-20 px-8 text-center group">
              <span className="text-5xl font-black italic text-white mb-4 block group-hover:text-[#c9a84c] transition-colors">
                {s.val}{s.suffix}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20 group-hover:text-white/40 transition-colors">
                {s.label}
              </span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── CTA / CONTACT ── */}
      <section className="py-40 bg-[#080808] relative">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
          <div className="bg-white text-black p-24 lg:p-40 relative overflow-hidden flex flex-col items-center text-center">
            <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none grayscale">
              <Image src="https://images.unsplash.com/photo-1518005020250-68a377a747e9?w=1200&q=80" alt="CTA Arch" fill className="object-cover" />
            </div>
            <Reveal>
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-black/40 mb-8 block">Project Initiation</span>
              <h2 className="text-6xl md:text-9xl font-black italic tracking-tighter leading-[0.8] uppercase mb-16">
                Start Your <br/> <span className="text-black/30 not-italic">Synthesis.</span>
              </h2>
              <div className="flex flex-wrap justify-center gap-6">
                <button className="px-12 py-6 bg-black text-white font-black uppercase text-sm tracking-widest hover:bg-[#c9a84c] transition-colors">
                  Contact Studio
                </button>
                <button className="px-12 py-6 border border-black/10 font-black uppercase text-sm tracking-widest hover:bg-black/5 transition-colors">
                  Bespoke Portal
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#050505] pt-40 pb-16 px-8 lg:px-16 border-t border-white/5">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-32 mb-40">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-12">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-black rotate-45" />
              </div>
              <span className="text-xl font-bold tracking-tighter uppercase italic">Aether <span className="text-[#c9a84c]">Visuals.</span></span>
            </div>
            <p className="text-white/20 text-sm font-light leading-relaxed uppercase tracking-widest mb-12 italic">
              Zurich-based architectural synthesis atelier. <br/> Defining the next era of photorealistic precision.
            </p>
            <div className="flex gap-6">
              {["IG", "TW", "BE", "LN"].map(social => (
                <a key={social} href="#" className="w-10 h-10 border border-white/10 flex items-center justify-center text-[10px] font-bold hover:bg-white hover:text-black transition-all">
                  {social}
                </a>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 mb-10">Atelier</h4>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-widest">
              {["Archives", "Philosophy", "Lab", "Journal"].map(item => (
                <li key={item}><a href="#" className="hover:text-[#c9a84c] transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 mb-10">Expertise</h4>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-white/20">
              {["CGI Synthesis", "BIM Layering", "Digital Twins", "Site Audits"].map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 mb-10">Bespoke Inquiry</h4>
            <p className="text-sm text-white/20 font-light mb-8 italic uppercase tracking-widest leading-loose">
              For high-scale residential and commercial syntheses, contact our lead curator directly.
            </p>
            <a href="mailto:studio@aether-visuals.arch" className="text-xl font-black italic hover:text-[#c9a84c] transition-colors block border-b border-white/10 pb-4">
              studio@aether.arch
            </a>
          </div>
        </div>

        <div className="max-w-[1600px] mx-auto flex flex-col md:row items-center justify-between gap-8 text-[9px] font-bold uppercase tracking-[0.5em] text-white/10 border-t border-white/5 pt-16">
          <p>© 2024 Aether Visuals Atelier. All rights reserved.</p>
          <div className="flex gap-12">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Synthesis</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
