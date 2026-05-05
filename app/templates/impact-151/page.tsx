"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Clock, Shield, Cpu, Zap, Activity, Crosshair, Eye, Lock, Terminal, Radio, Share2, ShoppingCart, Heart, Search, Menu, X, ChevronRight, Play, ArrowRight, Ruler, Hexagon, Layers, PenTool } from "lucide-react";

import "../premium.css";

/* ==========================================================================
   DATA STRUCTURES
   ========================================================================== */

const SPECS = [
  {
    label: "Movement",
    value: "Caliber CL-01 Tourbillon",
    desc: "Hand-wound mechanical movement with 72-hour power reserve.",
  },
  {
    label: "Case",
    value: "Grade 5 Titanium",
    desc: "Ultra-lightweight, aerospace-grade titanium with matte sandblasted finish.",
  },
  {
    label: "Crystal",
    value: "Double-Domed Sapphire",
    desc: "Scratch-resistant sapphire with 7 layers of anti-reflective coating.",
  },
  {
    label: "Water Resistance",
    value: "200M / 660FT",
    desc: "Equipped with a triple-gasket screw-down crown system.",
  },
];

const FEATURES = [
  {
    title: "Precision Engineering",
    icon: <Ruler className="w-5 h-5" />,
    desc: "Tolerance levels within 0.001mm for absolute mechanical harmony.",
  },
  {
    title: "Material Science",
    icon: <Hexagon className="w-5 h-5" />,
    desc: "Proprietary carbon-ceramic composite for extreme thermal stability.",
  },
  {
    title: "Luminescent Tech",
    icon: <Zap className="w-5 h-5" />,
    desc: "Super-LumiNova® X1 coating for unparalleled legibility in zero light.",
  },
  {
    title: "Bespoke Straps",
    icon: <Layers className="w-5 h-5" />,
    desc: "FKM fluoroelastomer with quick-release titanium hardware.",
  },
];

/* ==========================================================================
   UTILITY COMPONENTS
   ========================================================================== */

function Reveal({
  children,
  delay = 0,
  y = 30,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ==========================================================================
   MAIN PAGE COMPONENT
   ========================================================================== */

export default function ChronosLabPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  // Hero Scroll Transformations
  const watchScale = useTransform(scrollYProgress, [0, 0.3], [1, 2.5]);
  const watchRotate = useTransform(scrollYProgress, [0, 0.3], [0, 15]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.3], [0, -200]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="premium-theme min-h-screen bg-[#050505] text-white font-sans selection:bg-white selection:text-black overflow-x-hidden"
      style={{ scrollBehavior: "smooth" }}
    >
      {/* ==========================================
          SCANLINE / HUD OVERLAY
          ========================================== */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

      {/* ==========================================
          NAVIGATION
          ========================================== */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${scrolled ? "bg-black/90 backdrop-blur-md py-4 border-b border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]" : "bg-transparent py-10"}`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link
            href="/"
            className="text-xl md:text-2xl font-black tracking-tighter uppercase flex items-center gap-3"
          >
            CHRONOS<span className="font-light italic text-white/40">.LAB</span>
          </Link>
          <div className="absolute top-[30%] left-[-10%] flex flex-col gap-4 text-[10px] font-bold text-white/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-[1px] bg-white/10" />
              FREQ: 28,800 VPH
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-[1px] bg-white/10" />
              JEWELS: 26
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">
            <Link href="#" className="hover:text-white transition-colors">
              Instruments
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Materials
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Heritage
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Concierge
            </Link>
          </div>

          <div className="flex items-center gap-8">
            <button className="hidden md:block hover:text-white transition-colors text-white/40">
              <Search className="w-5 h-5" />
            </button>
            <button className="px-6 py-2 border border-white/20 text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
              Reserve_Unit
            </button>
            <button onClick={() => setMenuOpen(true)} className="lg:hidden">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.5 }}
            className="fixed inset-0 z-[100] bg-black p-8 pt-32 flex flex-col border-l border-white/10"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-10 right-8"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="flex flex-col gap-10 text-4xl font-black italic tracking-tighter uppercase">
              <Link href="#" onClick={() => setMenuOpen(false)}>
                Instruments
              </Link>
              <Link href="#" onClick={() => setMenuOpen(false)}>
                Materials
              </Link>
              <Link href="#" onClick={() => setMenuOpen(false)}>
                Heritage
              </Link>
              <Link href="#" onClick={() => setMenuOpen(false)}>
                Access_Log
              </Link>
            </div>
            <div className="mt-auto pt-10 border-t border-white/10">
              <div className="text-[10px] uppercase tracking-widest text-white/40 mb-4">
                Clock_Sync: Stable
              </div>
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  animate={{ width: ["0%", "100%", "0%"] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="h-full bg-white"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==========================================
          1. HERO (Scroll-Linked Zoom)
          ========================================== */}
      <section className="relative w-full h-[200svh] bg-[#050505]">
        {/* Sticky Container */}
        <div className="sticky top-0 w-full h-[100svh] flex flex-col justify-center items-center overflow-hidden">
          {/* Background HUD Grid */}
          <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

          {/* Watch Reveal */}
          <motion.div
            style={{ scale: watchScale, rotate: watchRotate }}
            className="relative z-10 w-[300px] md:w-[600px] aspect-square flex items-center justify-center"
          >
            <Image
              src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=1200&auto=format&fit=crop"
              alt="Luxury Watch"
              fill
              className="object-contain"
              priority
            />

            {/* HUD Target Overlays */}
            <motion.div
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 border border-white/5 rounded-full pointer-events-none"
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center pointer-events-none">
              <div className="w-[110%] h-[1px] bg-white/5" />
              <div className="h-[110%] w-[1px] bg-white/5 absolute" />
            </div>
          </motion.div>

          {/* Hero Content (Fades out on scroll) */}
          <motion.div
            style={{ opacity: heroOpacity, y: contentY }}
            className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-6 pointer-events-none"
          >
            <span className="text-[10px] md:text-[12px] uppercase tracking-[0.5em] font-bold text-white/40 mb-8 block">
              Project // Titan-01
            </span>
            <h1 className="text-6xl md:text-[12rem] font-black italic leading-[0.8] tracking-tighter mb-12 uppercase">
              Temporal <br />{" "}
              <span className="text-white/20 not-italic">Engine.</span>
            </h1>
            <p className="max-w-xl mx-auto text-sm md:text-base text-white/50 leading-relaxed font-light mb-12 uppercase tracking-widest">
              A masterpiece of micro-engineering. 342 components working in
              absolute mechanical synchronization.
            </p>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            style={{ opacity: heroOpacity }}
            className="absolute bottom-10 flex flex-col items-center gap-4"
          >
            <span className="text-[8px] uppercase tracking-[0.3em] text-white/30">
              Initiate Deep Scan
            </span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* ==========================================
          2. TECHNICAL SPECS (Split View)
          ========================================== */}
      <section className="py-32 bg-black relative z-30">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-32 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <Reveal>
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40 mb-6 block">
                Analysis_Report
              </span>
              <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-[0.9] mb-12">
                Mechanical <br />{" "}
                <span className="text-white/20 not-italic">Integrity.</span>
              </h2>

              <div className="space-y-12">
                {SPECS.map((spec, i) => (
                  <div key={i} className="group">
                    <div className="flex items-center gap-6 mb-4">
                      <span className="text-[10px] font-black italic text-white/20 group-hover:text-white transition-colors">
                        0{i + 1} //
                      </span>
                      <h4 className="text-lg font-bold uppercase tracking-tight text-white">
                        {spec.label}
                      </h4>
                    </div>
                    <div className="pl-12">
                      <p className="text-xl font-light text-white mb-2">
                        {spec.value}
                      </p>
                      <p className="text-sm text-white/40 leading-relaxed max-w-sm">
                        {spec.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal className="lg:col-span-7 order-1 lg:order-2 relative aspect-square rounded-sm overflow-hidden border border-white/5">
            <Image
              src="https://images.unsplash.com/photo-1548171916-042bd9605a1d?q=80&w=1200&auto=format&fit=crop"
              alt="Mechanism"
              fill
              className="object-cover opacity-60 grayscale"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)]" />

            {/* Animated Scanline HUD */}
            <motion.div
              animate={{ y: ["0%", "100%", "0%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-[2px] bg-white/20 shadow-[0_0_15px_rgba(255,255,255,0.5)] z-10"
            />

            <div className="absolute top-8 right-8 text-[10px] font-bold text-white/40 flex flex-col items-end gap-2">
              <span>SCAN_V2: ACTIVE</span>
              <span>RESOLUTION: 0.1μm</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ==========================================
          3. EXPERTISE GRID
          ========================================== */}
      <section className="py-32 bg-[#050505] border-y border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <Reveal className="text-center mb-24">
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40 mb-6 block">
              Capability_Log
            </span>
            <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase mb-8">
              Uncompromising{" "}
              <span className="text-white/20 not-italic">Standards.</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((feat, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="p-10 bg-white/5 border border-white/5 hover:border-white/20 transition-all group cursor-pointer h-full flex flex-col">
                  <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-8 group-hover:bg-white group-hover:text-black transition-all">
                    {feat.icon}
                  </div>
                  <h4 className="text-xl font-bold uppercase mb-4 text-white">
                    {feat.title}
                  </h4>
                  <p className="text-sm text-white/40 leading-relaxed font-light">
                    {feat.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          4. THE WORKSHOP (Process Spotlight)
          ========================================== */}
      <section className="py-32 bg-black overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-center">
          <Reveal className="relative aspect-square md:aspect-[4/5] rounded-sm overflow-hidden group">
            <Image
              src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=1200&auto=format&fit=crop"
              alt="Workshop"
              fill
              className="object-cover opacity-80 grayscale group-hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute bottom-12 left-12 right-12">
              <h3 className="text-3xl font-black italic text-white uppercase mb-4">
                Hand-Finished <br /> by Masters.
              </h3>
              <button className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors">
                Watch the process <Play className="w-4 h-4 fill-current" />
              </button>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40 mb-6 block">
                Human_Factor
              </span>
              <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase leading-[0.9] mb-12">
                Artisanal <br />{" "}
                <span className="text-white/20 not-italic">Refinement.</span>
              </h2>
              <p className="text-xl text-white/50 font-light leading-relaxed mb-12 max-w-lg">
                While our tolerances are verified by machines, the final soul of
                a Chronos piece is imparted by the hand. Every bevel is
                hand-polished to a mirror finish.
              </p>

              <div className="flex flex-col gap-6 pt-12 border-t border-white/10">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden relative grayscale">
                    <Image
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
                      alt="Watchmaker"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-black uppercase text-white">
                      Alexander Vance
                    </h4>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                      Master Watchmaker
                    </span>
                  </div>
                </div>
                <p className="text-xs text-white/30 italic">
                  "We don't build watches. We build instruments for navigating
                  the fourth dimension."
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ==========================================
          5. MANIFESTO (Large Quote)
          ========================================== */}
      <section className="py-48 bg-[#050505] text-center relative overflow-hidden">
        {/* Animated Background Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02]">
          <h2 className="text-[30vw] font-black italic uppercase leading-none">
            TIMELESS
          </h2>
        </div>

        <div className="max-w-[1000px] mx-auto px-6 relative z-10">
          <Reveal>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-light leading-[1.1] tracking-tight uppercase">
              "Precision is not a metric. It is a{" "}
              <span className="font-black italic">philosophy</span>."
            </h2>
            <div className="mt-16 inline-flex items-center gap-4">
              <div className="w-12 h-px bg-white/20" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
                The Chronos Doctrine
              </span>
              <div className="w-12 h-px bg-white/20" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ==========================================
          6. MEGA FOOTER (Technical Data Layout)
          ========================================== */}
      <footer className="bg-black pt-32 pb-12 px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-24">
            <div className="lg:col-span-5">
              <Reveal>
                <div className="text-2xl font-black tracking-tighter uppercase mb-10">
                  CHRONOS
                  <span className="font-light italic text-white/40">.LAB</span>
                </div>
                <p className="text-white/40 max-w-sm mb-12">
                  A research-driven horological laboratory focused on the
                  extreme limits of mechanical timekeeping.
                </p>
                <form
                  className="relative max-w-md"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="email"
                    placeholder="ENCRYPTED_EMAIL"
                    className="w-full bg-[#0a0a0a] border border-white/10 rounded-sm px-6 py-4 text-xs font-bold outline-none focus:border-white text-white transition-all"
                  />
                  <button
                    type="submit"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-white/40 hover:text-white transition-colors"
                  >
                    AUTHENTICATE
                  </button>
                </form>
              </Reveal>
            </div>

            <div className="lg:col-span-2 lg:col-start-7">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-10">
                Directory
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/40">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Instruments
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Materials
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Research
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Access_Code
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-10">
                Logistics
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/40">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Deployment
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Maintenance
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Certification
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-10">
                Outlets
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/40">
                <li>
                  <Link
                    href="#"
                    className="hover:text-white transition-colors flex items-center gap-2"
                  >
                    <Radio className="w-3 h-3" /> Globe
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-white transition-colors flex items-center gap-2"
                  >
                    <Share2 className="w-3 h-3" /> X_Protocol
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-white transition-colors flex items-center gap-2"
                  >
                    <Zap className="w-3 h-3" /> Discord
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-10 border-t border-white/5 text-[9px] font-bold uppercase tracking-widest text-white/20">
            <div className="flex items-center gap-10">
              <span>
                &copy; {new Date().getFullYear()} Chronos Lab Instruments SA
              </span>
              <Link href="#" className="hover:text-white transition-colors">
                Privacy_Protocol
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Terms_of_Trade
              </Link>
            </div>
            <div className="flex gap-10">
              <span>Location: Switzerland</span>
              <span className="flex items-center gap-2">
                Status:{" "}
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />{" "}
                Synchronized
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
