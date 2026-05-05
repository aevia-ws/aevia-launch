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
import { Zap, Shield, Cpu, Terminal, Radio, Share2, ShoppingCart, Heart, Search, Menu, X, ChevronRight, Play, ArrowRight, Activity, Crosshair, Eye, Lock } from "lucide-react";

import "../premium.css";

/* ==========================================================================
   DATA STRUCTURES
   ========================================================================== */

const PRODUCTS = [
  {
    id: "unit-01",
    name: "Aegis Shell v2.0",
    category: "Outerwear",
    price: "Ξ 0.42",
    desc: "Triple-layered nanoweave with active thermoregulation. Rated for Acid Rain and EM Interference.",
    image:
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=800&auto=format&fit=crop",
    specs: ["Waterproof: IPX7", "Thermal: -40°C", "Signal Blocking"],
  },
  {
    id: "unit-02",
    name: "Neural Mesh Tee",
    category: "Basics",
    price: "Ξ 0.15",
    desc: "Pressure-sensitive fibers that change opacity based on biometrics. Fully breathable, zero-friction seams.",
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop",
    specs: ["Bio-feedback", "Odor Resistant", "Ultra-light"],
  },
  {
    id: "unit-03",
    name: "Proxy Cargoes",
    category: "Trousers",
    price: "Ξ 0.28",
    desc: "14-pocket modular system with hidden holster points. Ripstop Cordura with stretch panels.",
    image:
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop",
    specs: ["Modular Pockets", "Reinforced Knees", "Hidden Zipper"],
  },
  {
    id: "unit-04",
    name: "Static Balaclava",
    category: "Accessories",
    price: "Ξ 0.08",
    desc: "Facial recognition scrambling weave. Protect your identity in the surveillance state.",
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop",
    specs: ["Privacy Shield", "One Size", "Breathable"],
  },
];

const ANNOUNCEMENTS = [
  "SYSTEM_UPGRADE: NEW_DROP_DETECTED",
  "IDENTITY_VERIFIED: WELCOME_CITIZEN_402",
  "GLOBAL_SHIPPING_ENABLED: NEURAL_LINK_ONLY",
  "PROTOCOL_X: INITIALIZING_SCAN",
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

function GlitchText({ text }: { text: string }) {
  return (
    <motion.span
      animate={{
        skewX: [0, -10, 10, 0, 5, -5, 0],
        opacity: [1, 0.8, 1, 0.9, 1, 0.7, 1],
      }}
      transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 5 }}
      className="inline-block"
    >
      {text}
    </motion.span>
  );
}

/* ==========================================================================
   MAIN PAGE COMPONENT
   ========================================================================== */

export default function NeonUnitApparelPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeAnnouncement, setActiveAnnouncement] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveAnnouncement((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="premium-theme min-h-screen bg-[#050505] text-[#00f3ff] font-mono selection:bg-[#00f3ff]/20 selection:text-white overflow-x-hidden"
      style={{ scrollBehavior: "smooth" }}
    >
      {/* ==========================================
          SCANLINE OVERLAY
          ========================================== */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

      {/* ==========================================
          NAVIGATION
          ========================================== */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-black/90 backdrop-blur-md py-4 border-b border-[#00f3ff]/20 shadow-[0_0_20px_rgba(0,243,255,0.1)]" : "bg-transparent py-8"}`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link
            href="/"
            className="text-xl md:text-2xl font-black tracking-tighter flex items-center gap-3"
          >
            <Zap className="w-6 h-6 animate-pulse" />
            NEON<span className="text-white">UNIT.</span>
          </Link>

          <div className="hidden lg:flex items-center gap-10 text-[10px] font-bold uppercase tracking-[0.2em]">
            <Link href="#" className="hover:text-white transition-colors">
              Catalog
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Archive
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Syndicate
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-6">
            <button className="hidden md:block hover:text-white transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="relative hover:text-white transition-colors">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-white text-black text-[8px] flex items-center justify-center rounded-full font-bold">
                4
              </span>
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
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ type: "tween", duration: 0.5 }}
            className="fixed inset-0 z-[100] bg-black p-8 pt-32 flex flex-col border-r border-[#00f3ff]/20"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-10 right-8"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="flex flex-col gap-8 text-4xl font-black tracking-tighter">
              <Link href="#" onClick={() => setMenuOpen(false)}>
                <GlitchText text="Catalog" />
              </Link>
              <Link href="#" onClick={() => setMenuOpen(false)}>
                Archive
              </Link>
              <Link href="#" onClick={() => setMenuOpen(false)}>
                Syndicate
              </Link>
              <Link href="#" onClick={() => setMenuOpen(false)}>
                Access_Log
              </Link>
            </div>
            <div className="mt-auto pt-10 border-t border-[#00f3ff]/10">
              <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-4">
                Network_Status: Optimal
              </div>
              <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
                <motion.div
                  animate={{ width: ["0%", "100%", "0%"] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="h-full bg-[#00f3ff]"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==========================================
          1. HERO (HUD Aesthetic)
          ========================================== */}
      <section className="relative w-full h-[100svh] flex flex-col justify-center items-center px-6 overflow-hidden pt-20">
        {/* Background Grid */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        {/* Animated HUD Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-[#00f3ff]/5 rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border-t-2 border-[#00f3ff]/10 rounded-full"
          />
        </div>

        <div className="relative z-10 text-center max-w-5xl">
          <Reveal>
            <div className="inline-flex items-center gap-3 px-4 py-1 rounded-full border border-[#00f3ff]/30 bg-[#00f3ff]/5 text-[10px] font-bold uppercase tracking-widest mb-10">
              <Activity className="w-3 h-3" />{" "}
              {ANNOUNCEMENTS[activeAnnouncement]}
            </div>
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] mb-12">
              EQUIP FOR <br />{" "}
              <span className="text-white italic">SURVIVAL.</span>
            </h1>
            <p className="max-w-xl mx-auto text-sm md:text-base text-slate-500 leading-relaxed font-light mb-12 uppercase tracking-wider">
              High-performance apparel for the metropolitan wasteland.
              Engineered with active nanoweave and ballistic ripstop.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="px-12 py-5 bg-[#00f3ff] text-black text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_30px_rgba(0,243,255,0.3)] flex items-center justify-center gap-3">
                <Terminal className="w-4 h-4" /> Initialize Shop
              </button>
              <button className="px-12 py-5 border border-[#00f3ff]/30 text-[#00f3ff] text-[10px] font-black uppercase tracking-widest hover:bg-[#00f3ff]/10 transition-all flex items-center justify-center gap-3">
                <Crosshair className="w-4 h-4" /> View Manifesto
              </button>
            </div>
          </Reveal>
        </div>

        <div className="absolute bottom-10 left-10 hidden lg:block">
          <div className="flex flex-col gap-4 text-[10px] font-bold text-slate-600">
            <div className="flex items-center gap-4">
              <div className="w-8 h-[1px] bg-slate-800" />
              LAT: 35.6895° N
            </div>
            <div className="flex items-center gap-4">
              <div className="w-8 h-[1px] bg-slate-800" />
              LNG: 139.6917° E
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 right-10 hidden lg:block">
          <div className="text-[10px] font-bold text-slate-600 flex flex-col items-end gap-2">
            <span>ENCRYPTION: AES-256</span>
            <span>CONNECTION: SECURE_V3</span>
          </div>
        </div>
      </section>

      {/* ==========================================
          2. THE GEAR (Catalog Grid)
          ========================================== */}
      <section className="py-32 bg-black relative z-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <Reveal>
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#00f3ff] mb-4 block">
                Deployment // 004
              </span>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
                Technical <br />
                <span className="text-white italic">Hardware.</span>
              </h2>
            </Reveal>
            <div className="flex gap-4">
              <button className="px-6 py-2 border border-[#00f3ff]/20 text-[10px] font-bold uppercase tracking-widest text-[#00f3ff] hover:bg-[#00f3ff]/10 transition-all">
                Filter: All
              </button>
              <button className="px-6 py-2 border border-slate-800 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-all">
                Sort: Price
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PRODUCTS.map((prod, i) => (
              <Reveal key={prod.id} delay={i * 0.1}>
                <div className="group relative bg-[#111] border border-slate-900 overflow-hidden hover:border-[#00f3ff]/50 transition-all duration-500">
                  {/* Scanline Effect on hover */}
                  <div className="absolute inset-0 pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,243,255,0.05)_50%)] bg-[length:100%_4px]" />

                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={prod.image}
                      alt={prod.name}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-2 py-1 bg-black/80 text-[8px] font-black uppercase text-[#00f3ff] border border-[#00f3ff]/30">
                        {prod.category}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 translate-x-12 group-hover:translate-x-0 transition-transform duration-500">
                      <button className="w-10 h-10 bg-[#00f3ff] text-black flex items-center justify-center hover:bg-white transition-colors">
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="p-6 relative z-20">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-black uppercase tracking-tight text-white group-hover:text-[#00f3ff] transition-colors">
                          {prod.name}
                        </h3>
                        <span className="text-[10px] font-bold text-slate-500">
                          {prod.id}
                        </span>
                      </div>
                      <span className="text-lg font-black">{prod.price}</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed mb-6 font-light">
                      {prod.desc}
                    </p>
                    <div className="space-y-2">
                      {prod.specs.map((spec) => (
                        <div
                          key={spec}
                          className="flex items-center gap-2 text-[9px] uppercase tracking-widest text-slate-600"
                        >
                          <div className="w-1 h-1 bg-[#00f3ff]/40 rounded-full" />
                          {spec}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          3. THE SYNDICATE (Full Width Reveal)
          ========================================= */}
      <section className="py-32 bg-[#050505] overflow-hidden border-y border-[#00f3ff]/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-center">
          <Reveal className="relative aspect-square md:aspect-[4/3] rounded-sm overflow-hidden border border-[#00f3ff]/20">
            <Image
              src="https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?q=80&w=1200&auto=format&fit=crop"
              alt="Syndicate"
              fill
              className="object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-[#00f3ff]/5 mix-blend-color" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
              <Lock className="w-12 h-12 text-[#00f3ff] animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold">
                Access_Restricted
              </span>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] mb-12">
                Shadow <br />{" "}
                <span className="text-white italic">Protocols.</span>
              </h2>
              <p className="text-xl text-slate-400 font-light leading-relaxed mb-12 max-w-lg">
                Neon Unit was born in the neon-lit back alleys of the megacity.
                We build tools for those who operate outside the grid.
              </p>

              <div className="grid grid-cols-1 gap-6 mb-12">
                {[
                  {
                    icon: <Shield className="w-5 h-5" />,
                    title: "Ballistic Weave",
                    desc: "Our ripstop is infused with carbon nanotubes for extreme durability.",
                  },
                  {
                    icon: <Cpu className="w-5 h-5" />,
                    title: "Neural Link Ready",
                    desc: "Every unit includes integrated cable management for cybernetic interfaces.",
                  },
                  {
                    icon: <Eye className="w-5 h-5" />,
                    title: "Surveillance Proof",
                    desc: "Anti-IR coatings to scramble drone-based thermal imaging.",
                  },
                ].map((feat, i) => (
                  <div
                    key={i}
                    className="flex gap-6 p-6 bg-slate-900/30 border border-slate-800 hover:border-[#00f3ff]/30 transition-colors"
                  >
                    <div className="text-[#00f3ff] shrink-0">{feat.icon}</div>
                    <div>
                      <h4 className="text-sm font-black uppercase mb-1 text-white">
                        {feat.title}
                      </h4>
                      <p className="text-xs text-slate-500">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="text-[10px] uppercase tracking-widest font-black text-[#00f3ff] border-b border-[#00f3ff]/30 pb-2 hover:border-white hover:text-white transition-all flex items-center gap-3">
                Download Operations Log <ArrowRight className="w-4 h-4" />
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ==========================================
          4. MEGA FOOTER (Cyberpunk Grid)
          ========================================== */}
      <footer className="bg-black pt-32 pb-12 px-6 md:px-12 relative overflow-hidden">
        {/* Animated HUD line */}
        <motion.div
          animate={{ scaleX: [0, 1, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00f3ff] to-transparent"
        />

        <div className="max-w-[1600px] mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-24">
            <div className="lg:col-span-5">
              <Reveal>
                <div className="text-3xl font-black tracking-tighter uppercase mb-10 flex items-center gap-3">
                  <Zap className="w-8 h-8 text-[#00f3ff]" />
                  NEON<span className="text-white">UNIT.</span>
                </div>
                <p className="text-slate-500 max-w-sm mb-12">
                  Survival isn't a state, it's a protocol. Join the network for
                  priority drop access and mission briefings.
                </p>
                <form
                  className="relative max-w-md"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="email"
                    placeholder="ENTER_IDENT_EMAIL"
                    className="w-full bg-[#0a0a0a] border border-slate-800 rounded-sm px-6 py-4 text-xs font-bold outline-none focus:border-[#00f3ff] text-white transition-all"
                  />
                  <button
                    type="submit"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-[#00f3ff] hover:text-white transition-colors"
                  >
                    AUTHENTICATE
                  </button>
                </form>
              </Reveal>
            </div>

            <div className="lg:col-span-2 lg:col-start-7">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-700 mb-10">
                Network_Map
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#00f3ff] transition-colors"
                  >
                    Catalog_v4
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#00f3ff] transition-colors"
                  >
                    Archive_Data
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#00f3ff] transition-colors"
                  >
                    Syndicate_Info
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#00f3ff] transition-colors"
                  >
                    Mission_Logs
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-700 mb-10">
                Support_Protocol
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#00f3ff] transition-colors"
                  >
                    Shipping_Route
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#00f3ff] transition-colors"
                  >
                    Exchange_Code
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#00f3ff] transition-colors"
                  >
                    Care_Manual
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#00f3ff] transition-colors"
                  >
                    Size_Matrix
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-700 mb-10">
                Neural_Outlets
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#00f3ff] transition-colors flex items-center gap-2"
                  >
                    <Radio className="w-3 h-3" /> Instagram_v2
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#00f3ff] transition-colors flex items-center gap-2"
                  >
                    <Share2 className="w-3 h-3" /> Terminal_X
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#00f3ff] transition-colors flex items-center gap-2"
                  >
                    <Zap className="w-3 h-3" /> Discord_Link
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-10 border-t border-slate-900 text-[9px] font-bold uppercase tracking-widest text-slate-700">
            <div className="flex items-center gap-10">
              <span>
                &copy; {new Date().getFullYear()} Neon Unit Heavy Industries
              </span>
              <Link href="#" className="hover:text-[#00f3ff] transition-colors">
                Privacy_Override
              </Link>
              <Link href="#" className="hover:text-[#00f3ff] transition-colors">
                Service_Terms
              </Link>
            </div>
            <div className="flex gap-10">
              <span>Location: REDACTED</span>
              <span className="flex items-center gap-2">
                Status:{" "}
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />{" "}
                Active
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
