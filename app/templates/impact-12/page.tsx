"use client";

import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, Suspense } from "react";
import Image from "next/image";
import { ArrowUpRight, Menu, X, Layers, ShieldCheck, Plus, Play, ArrowRight, ChevronDown, Monitor, LayoutGrid } from "lucide-react";
import "../premium.css";

// ─── DATA ──────────────────────────────────────────────────────────────────

const PROJECTS = [
  { 
    id: "01",
    title: "NEO_KINETICS", 
    category: "Creative Direction",
    year: "2024",
    img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80",
    desc: "A digital-first identity for a robotic choreography studio, focusing on motion-mapped typography."
  },
  { 
    id: "02",
    title: "VIRTUAL_VOGUE", 
    category: "Digital Fashion",
    year: "2023",
    img: "https://images.unsplash.com/photo-1537832816519-689ad163238b?w=1200&q=80",
    desc: "Exploration of procedural fabric shaders and real-time cloth physics for luxury avatars."
  },
  { 
    id: "03",
    title: "SILICON_SOUL", 
    category: "Aesthetic Research",
    year: "2024",
    img: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=1200&q=80",
    desc: "Documenting the intersection of organic form and industrial precision via large-scale projections."
  },
  { 
    id: "04",
    title: "MONO_ARCHIVE", 
    category: "System Design",
    year: "2024",
    img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80",
    desc: "A unified design language for an architecture-focused publishing house in Berlin."
  }
];

const PHILOSOPHY = [
  { label: "Concept", val: "Raw", desc: "Stripping away the superfluous to find the core message." },
  { label: "Execution", val: "Brutal", desc: "Unapologetic grids and massive typographic presence." },
  { label: "Output", val: "Premium", desc: "High-fidelity digital experiences that define the next era." }
];

const SERVICES = [
  { id: "A", title: "Creative Direction", desc: "Complete visual ecosystem design from strategy to execution." },
  { id: "B", title: "Digital Craft", desc: "Interactive experiences built on the bleeding edge of WebGL/Three.js." },
  { id: "C", title: "Aesthetic Research", desc: "Deep-dives into cultural trends and visual anthropology." },
  { id: "D", title: "Identity Systems", desc: "Scalable design languages that evolve with the brand." }
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
      transition={{ duration: 1, delay, ease: [0.19, 1, 0.22, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── MAIN SPA ────────────────────────────────────────────────────────────────

export default function ArchiveStudioSPA() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const { scrollY } = useScroll();
  
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 800], [1, 1.2]);

  return (
    <div className="min-h-screen bg-[#000] text-white font-mono selection:bg-white selection:text-black">
      
      {/* ── GRAIN OVERLAY ── */}
      <div className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* ── NAVIGATION ── */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-8 mix-blend-difference"
      >
        <div className="flex items-center gap-4">
          <span className="text-2xl font-black tracking-tighter uppercase italic">ARCHIVE<span className="text-white/40">//</span>STUDIO</span>
        </div>
        
        <div className="hidden lg:flex items-center gap-16 text-[10px] font-bold uppercase tracking-[0.4em] text-white/40">
          {["Work", "Research", "Studio", "Contact"].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors">[{item}]</a>
          ))}
        </div>

        <button 
          onClick={() => setMenuOpen(true)}
          className="flex items-center gap-4 group"
        >
          <span className="hidden md:block text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 group-hover:text-white transition-colors">Menu</span>
          <div className="w-12 h-12 flex flex-col items-center justify-center gap-2">
            <span className="w-8 h-[3px] bg-white" />
            <span className="w-8 h-[3px] bg-white" />
          </div>
        </button>
      </motion.nav>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="fixed inset-0 z-[60] bg-white text-black p-12 flex flex-col justify-between"
          >
            <div className="flex justify-between items-center">
              <span className="text-lg font-black uppercase tracking-tighter italic">ARCHIVE//STUDIO</span>
              <button onClick={() => setMenuOpen(false)} className="w-12 h-12 flex items-center justify-center">
                <X className="w-8 h-8" />
              </button>
            </div>
            <div className="flex flex-col">
              {["WORKS", "RESEARCH", "MANIFESTO", "CLIENTS", "CONTACT"].map((item, i) => (
                <motion.a 
                  key={item}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  href="#"
                  className="text-7xl md:text-[10rem] font-black uppercase tracking-tighter hover:italic transition-all leading-[0.8]"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </motion.a>
              ))}
            </div>
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.5em] border-t border-black/10 pt-12">
              <span>EST. 2024</span>
              <span>Based in Berlin // Global</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO SECTION ── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden border-b border-white/10">
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="absolute inset-0 z-0"
        >
          <Image 
            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1600&q=80" 
            alt="Hero Raw" 
            fill 
            className="object-cover grayscale opacity-20" 
            unoptimized 
          />
        </motion.div>

        <div className="relative z-10 text-center px-6 mt-20">
          <Reveal>
            <span className="text-[10px] font-bold uppercase tracking-[1em] text-white/40 mb-12 block">Aesthetic Intelligence</span>
          </Reveal>
          <Reveal delay={0.2}>
            <h1 className="text-8xl md:text-[18rem] font-black tracking-tighter leading-[0.75] uppercase italic text-white mb-20">
              RAW <br/> <span className="not-italic">BRUTAL.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12 border-t border-white/10 pt-20">
              <p className="text-white/30 text-lg leading-relaxed font-light uppercase tracking-wide italic leading-loose text-left max-w-md">
                Defining the intersection of raw brutality and digital premium. We build the interfaces that matter.
              </p>
              <button className="w-32 h-32 rounded-full border border-white/20 flex items-center justify-center group hover:bg-white transition-all">
                <ArrowRight className="w-8 h-8 group-hover:text-black group-hover:rotate-45 transition-all" />
              </button>
            </div>
          </Reveal>
        </div>

        <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end text-[10px] font-bold uppercase tracking-[0.5em] text-white/20">
          <div className="flex flex-col gap-2">
            <span>Scroll_to_Explore</span>
            <div className="w-32 h-1 bg-white/10 relative overflow-hidden">
              <motion.div 
                animate={{ x: [-128, 128] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-0 h-full w-1/2 bg-white"
              />
            </div>
          </div>
          <span>BERLIN // 52.5200° N</span>
        </div>
      </section>

      {/* ── PHILOSOPHY ── */}
      <section className="py-40 bg-[#000]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start mb-40">
            <Reveal className="lg:col-span-8">
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/40 mb-12 block">Manifesto</span>
              <h2 className="text-7xl md:text-[10rem] font-black italic tracking-tighter leading-[0.8] uppercase text-white">
                FUNCTION <br/> OVER <span className="text-white/20 not-italic">NOISE.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2} className="lg:col-span-4 mt-12">
              <p className="text-white/40 text-xl leading-relaxed font-light uppercase tracking-wide italic leading-loose">
                We reject the decorative. We embrace the structure. Our design language is a response to the digital fatigue of our era.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-1px bg-white/10 border border-white/10">
            {PHILOSOPHY.map((p, i) => (
              <Reveal key={p.label} delay={i * 0.1} className="bg-black p-20 group hover:bg-white transition-colors">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20 mb-12 block group-hover:text-black/40">{p.label}</span>
                <h3 className="text-6xl font-black italic text-white mb-8 group-hover:text-black transition-colors">{p.val}</h3>
                <p className="text-xs text-white/30 font-light tracking-widest uppercase italic leading-loose group-hover:text-black/60">{p.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WORKS GRID (BRUTALIST) ── */}
      <section className="bg-white text-black py-40">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
          <Reveal className="mb-32">
            <div className="flex justify-between items-end border-b-8 border-black pb-12">
              <h2 className="text-8xl md:text-[12rem] font-black tracking-tighter uppercase leading-none">WORKS</h2>
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] mb-4">[SELECTED_04]</span>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-px bg-black border border-black overflow-hidden">
            {PROJECTS.map((project, i) => (
              <div key={project.id} className={`${i % 3 === 0 ? "lg:col-span-8" : "lg:col-span-4"} bg-white group cursor-pointer`}>
                <div className="relative aspect-[16/10] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000">
                  <Image src={project.img} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-[2s]" unoptimized />
                </div>
                <div className="p-12">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest mb-4 block text-black/40">{project.id} // {project.year}</span>
                      <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.8] mb-6 italic">{project.title}</h3>
                    </div>
                    <ArrowUpRight className="w-12 h-12" />
                  </div>
                  <div className="flex justify-between items-end border-t border-black/10 pt-8">
                    <span className="text-[10px] font-black uppercase tracking-widest bg-black text-white px-3 py-1">{project.category}</span>
                    <p className="text-[10px] text-black/40 font-bold uppercase tracking-widest max-w-[200px] text-right">{project.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-40 bg-[#000]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
            <Reveal>
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/40 mb-12 block">Capabilities</span>
              <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-[0.8] uppercase text-white mb-20">
                SYSTEM <br/> <span className="not-italic">SOLUTIONS.</span>
              </h2>
              <div className="space-y-12">
                {SERVICES.map((s, i) => (
                  <div key={s.id} className="group border-b border-white/10 pb-12 hover:border-white transition-colors cursor-default">
                    <div className="flex items-center gap-8 mb-6">
                      <span className="text-xl font-black text-white/20 italic group-hover:text-white transition-colors">{s.id} //</span>
                      <h3 className="text-3xl md:text-5xl font-black tracking-tighter uppercase group-hover:italic transition-all">{s.title}</h3>
                    </div>
                    <p className="text-sm text-white/30 font-light tracking-widest uppercase italic leading-loose max-w-xl pl-20">
                      {s.desc}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.3} className="relative hidden lg:block">
              <div className="sticky top-40 aspect-[4/5] bg-white/[0.02] border border-white/5 p-16 flex flex-col justify-between overflow-hidden group">
                <div className="absolute top-0 right-0 p-8">
                  <Monitor className="w-16 h-16 text-white/10 group-hover:text-white/40 transition-colors" />
                </div>
                <div>
                  <h3 className="text-5xl font-black italic uppercase text-white mb-8">Digital <br/> Supremacy.</h3>
                  <p className="text-white/20 text-lg leading-relaxed mb-12 font-light uppercase tracking-wide italic leading-loose">
                    We deliver the interfaces of the future by respecting the constraints of the present. Performance is our primary aesthetic.
                  </p>
                </div>
                <div className="space-y-12">
                  <div className="h-[2px] bg-white/10 relative overflow-hidden">
                    <motion.div 
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="absolute top-0 left-0 h-full w-full bg-white/40 shadow-[0_0_20px_white]"
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-white/20">
                    <span>STATUS: OPTIMIZED</span>
                    <span>CORE_VERSION: 1.0.4</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── TECHNICAL AUDIT ── */}
      <section className="py-40 border-y border-white/10 bg-white text-black">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { l: "Uptime", v: "100%", d: "Guaranteed availability for all deployed ecosystems." },
              { l: "Speed", v: "<0.8s", d: "Average page load across our premium SPA portfolio." },
              { l: "Fidelity", v: "8K Native", d: "Pixel-perfect rendering for large-format displays." },
              { l: "Security", v: "AES-512", d: "Military-grade encryption for all client data nodes." },
            ].map((stat, i) => (
              <Reveal key={stat.l} delay={i * 0.1} className="border-l-8 border-black pl-8">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-black/40 mb-6 block">{stat.l}</span>
                <h3 className="text-6xl font-black italic mb-4">{stat.v}</h3>
                <p className="text-[10px] font-bold uppercase tracking-widest text-black/40 leading-loose">{stat.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA / CONTACT ── */}
      <section className="py-40 bg-black relative">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 text-center">
          <Reveal>
            <h2 className="text-7xl md:text-[15rem] font-black italic tracking-tighter leading-[0.8] uppercase text-white mb-20">
              INITIATE <br/> <span className="not-italic text-white/20">PROJECT.</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-8">
              <button className="px-16 py-8 bg-white text-black font-black uppercase text-sm tracking-widest hover:italic transition-all">
                Send_Brieffing
              </button>
              <button className="px-16 py-8 border border-white/20 text-white font-black uppercase text-sm tracking-widest hover:bg-white/5 transition-all">
                The_Portal
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-black pt-40 pb-16 px-6 md:px-12 lg:px-24 border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-32 mb-40">
          <div className="lg:col-span-6">
            <span className="text-4xl font-black tracking-tighter uppercase italic block mb-12">ARCHIVE<span className="text-white/40">//</span>STUDIO</span>
            <p className="text-white/20 text-sm font-light leading-relaxed uppercase tracking-widest mb-12 italic max-w-md">
              A creative laboratory focused on the synthesis of raw brutality and digital premium. We define the aesthetic of the new era.
            </p>
            <div className="flex gap-8">
              {["IG", "TW", "BE", "LN", "FB"].map(s => (
                <a key={s} href="#" className="text-xs font-black hover:text-white text-white/20 transition-colors tracking-widest">[{s}]</a>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 mb-10">Studio</h4>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-widest">
              {["Works", "Research", "Manifesto", "Clients"].map(item => (
                <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 mb-10">Inquiry</h4>
            <p className="text-sm text-white/20 font-light mb-8 italic uppercase tracking-widest leading-loose">
              For new projects and research collaborations, initiate contact via our secure server.
            </p>
            <a href="mailto:hello@archive-studio.com" className="text-3xl font-black italic hover:text-white transition-colors block border-b-4 border-white/10 pb-6 uppercase tracking-tighter">
              hello@archive.studio
            </a>
          </div>
        </div>

        <div className="flex flex-col md:row items-center justify-between gap-8 text-[9px] font-bold uppercase tracking-[0.5em] text-white/10 border-t border-white/5 pt-16">
          <p>© 2024 ARCHIVE STUDIO LABS. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-12">
            <a href="#" className="hover:text-white transition-colors">[Privacy_Policy]</a>
            <a href="#" className="hover:text-white transition-colors">[Terms_of_Service]</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
