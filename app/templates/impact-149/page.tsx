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
import { ArrowRight, Box, Ruler, Tool, Hexagon, Layers, PenTool, Shield, Globe, Star, ShoppingBag, Search, Menu, X, ChevronRight, Play, ArrowLeft, ArrowUpRight } from "lucide-react";

import "../premium.css";

/* ==========================================================================
   DATA STRUCTURES
   ========================================================================== */

const PRODUCTS = [
  {
    id: "f-01",
    name: "The Bergen Lounge",
    designer: "Arne Østgard",
    price: "$2,850",
    desc: "A singular piece of steam-bent oak, upholstered in hand-dyed Scandinavian leather. Designed for deep reflection.",
    image:
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=1200&auto=format&fit=crop",
    stats: { material: "Solid Oak", leadTime: "8 Weeks", warranty: "25 Years" },
  },
  {
    id: "f-02",
    name: "Linear Console",
    designer: "Ingrid Nilsen",
    price: "$1,420",
    desc: "Minimalist geometry meets traditional joinery. A floating silhouette that defines the modern entryway.",
    image:
      "https://images.unsplash.com/photo-1581412340641-671428074617?q=80&w=1200&auto=format&fit=crop",
    stats: { material: "Walnut", leadTime: "6 Weeks", warranty: "Lifetime" },
  },
  {
    id: "f-03",
    name: "Oslo Dining Table",
    designer: "Lars Sorensen",
    price: "$4,200",
    desc: "A massive solid ash table, featuring a unique 'X' frame tension system. Built to host generations.",
    image:
      "https://images.unsplash.com/photo-1577145000247-a737d7c2b785?q=80&w=1200&auto=format&fit=crop",
    stats: { material: "Ash Wood", leadTime: "12 Weeks", warranty: "50 Years" },
  },
];

const COLLECTIONS = [
  {
    title: "Living Room",
    count: "12 Pieces",
    image:
      "https://images.unsplash.com/photo-1583847268964-b28dc2f51ac9?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Workspace",
    count: "08 Pieces",
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Bedroom",
    count: "06 Pieces",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7eaa511?q=80&w=800&auto=format&fit=crop",
  },
];

const DESIGNERS = [
  {
    name: "Arne Østgard",
    role: "Creative Director",
    bio: "Former student of the Copenhagen School of Design, Arne focuses on the intersection of mass and lightness.",
  },
  {
    name: "Ingrid Nilsen",
    role: "Master Joiner",
    bio: "With 20 years of experience in traditional Japanese and Nordic joinery, Ingrid ensures structural permanence.",
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
      transition={{ duration: 1, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ==========================================================================
   MAIN PAGE COMPONENT
   ========================================================================== */

export default function NordicFurniturePage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(0);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="premium-theme min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-stone-900 selection:text-white overflow-x-hidden"
      style={{ scrollBehavior: "smooth" }}
    >
      {/* ==========================================
          NAVIGATION
          ========================================== */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${scrolled ? "bg-white/90 backdrop-blur-md py-4 border-b border-stone-200" : "bg-transparent py-10"}`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link
            href="/"
            className="text-xl md:text-2xl font-black tracking-tighter uppercase group"
          >
            NØRDIC
            <span className="font-light italic group-hover:pl-1 transition-all duration-500">
              .STUDIO
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-12 text-[10px] font-bold uppercase tracking-[0.2em]">
            <Link href="#" className="hover:text-stone-400 transition-colors">
              Catalog
            </Link>
            <Link href="#" className="hover:text-stone-400 transition-colors">
              Designers
            </Link>
            <Link href="#" className="hover:text-stone-400 transition-colors">
              Process
            </Link>
            <Link href="#" className="hover:text-stone-400 transition-colors">
              Showroom
            </Link>
          </div>

          <div className="flex items-center gap-8">
            <button className="hidden md:block text-stone-400 hover:text-stone-900 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="relative text-stone-900 hover:text-stone-400 transition-colors">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-stone-900 text-white text-[8px] flex items-center justify-center rounded-full font-bold">
                0
              </span>
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden text-stone-900"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "tween", duration: 0.6 }}
            className="fixed inset-0 z-[100] bg-white p-8 pt-32 flex flex-col items-center text-center"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-10 right-8 text-stone-900"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="flex flex-col gap-12 text-5xl font-black italic tracking-tighter uppercase">
              <Link href="#" onClick={() => setMenuOpen(false)}>
                Catalog
              </Link>
              <Link href="#" onClick={() => setMenuOpen(false)}>
                Designers
              </Link>
              <Link href="#" onClick={() => setMenuOpen(false)}>
                Process
              </Link>
              <Link href="#" onClick={() => setMenuOpen(false)}>
                Showroom
              </Link>
            </div>
            <div className="mt-auto mb-10 text-[10px] uppercase tracking-widest font-bold text-stone-400">
              Stockholm &mdash; Copenhagen &mdash; Oslo
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==========================================
          1. HERO (3D Product Spotlight)
          ========================================== */}
      <section className="relative w-full h-[100svh] flex flex-col justify-center overflow-hidden bg-white">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center h-full pt-20">
          <div className="lg:col-span-6 z-10">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <span className="text-[10px] md:text-[12px] uppercase tracking-[0.4em] font-bold text-stone-400 mb-8 block">
                Autumn Collection '24
              </span>
              <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black italic leading-[0.85] tracking-tighter mb-12">
                Honest <br />{" "}
                <span className="text-stone-300 not-italic">Material.</span>
              </h1>
              <p className="max-w-md text-lg text-stone-500 leading-relaxed font-light mb-12">
                Sculptural furniture that respects the biological intelligence
                of wood. Designed to be lived in, built to be remembered.
              </p>
              <div className="flex items-center gap-10">
                <button className="px-12 py-5 bg-stone-900 text-white text-[10px] uppercase tracking-widest font-bold rounded-full hover:bg-stone-700 transition-all cursor-pointer shadow-xl shadow-stone-900/10">
                  Explore Collection
                </button>
                <button className="text-[10px] uppercase tracking-widest font-bold border-b border-stone-200 pb-2 hover:border-stone-900 transition-colors flex items-center gap-2 group">
                  The Workshop{" "}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-6 h-full relative perspective-[1500px] hidden lg:block">
            <motion.div
              style={{
                rotateX: useTransform(scrollYProgress, [0, 0.2], [10, 0]),
                rotateY: useTransform(scrollYProgress, [0, 0.2], [-20, 0]),
                translateY: useTransform(scrollYProgress, [0, 0.2], [100, 0]),
                scale: useTransform(scrollYProgress, [0, 0.2], [0.8, 1]),
              }}
              className="relative w-full h-[80%] mt-auto"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-square bg-stone-100 rounded-full blur-[100px] z-0" />
              <Image
                src="https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=1200&auto=format&fit=crop"
                alt="Hero Chair"
                fill
                className="object-contain z-10"
                priority
              />
            </motion.div>

            {/* Floating Spec Tags */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[20%] right-0 bg-white/80 backdrop-blur-md border border-stone-100 p-6 rounded-2xl shadow-xl z-20"
            >
              <div className="text-[10px] uppercase tracking-widest text-stone-400 mb-1">
                Material
              </div>
              <div className="font-bold text-sm">Solid American Walnut</div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute bottom-[20%] left-0 bg-white/80 backdrop-blur-md border border-stone-100 p-6 rounded-2xl shadow-xl z-20"
            >
              <div className="text-[10px] uppercase tracking-widest text-stone-400 mb-1">
                Detail
              </div>
              <div className="font-bold text-sm">Hand-Stitched Leather</div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-10 left-12 hidden md:block">
          <div className="flex items-center gap-10">
            <div className="flex flex-col gap-2">
              <span className="text-3xl font-black italic">01</span>
              <span className="text-[8px] uppercase tracking-[0.3em] font-bold text-stone-300">
                Section
              </span>
            </div>
            <div className="w-px h-10 bg-stone-100" />
            <div className="max-w-[150px] text-[10px] leading-relaxed text-stone-400 uppercase tracking-widest">
              A new paradigm in sustainable luxury.
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          2. THE PHILOSOPHY (Split Reveal)
          ========================================== */}
      <section className="py-32 bg-stone-900 text-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-center">
          <Reveal>
            <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter leading-[0.9] mb-12 uppercase">
              The radical <br />{" "}
              <span className="text-stone-500 not-italic">
                silence of form.
              </span>
            </h2>
            <p className="text-xl text-stone-400 font-light leading-relaxed mb-12 max-w-lg">
              We reject the noise of disposability. Our pieces are designed for
              a 50-year lifecycle, utilizing traditional Nordic joinery that
              strengthens with age.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-stone-800 pt-12">
              <div>
                <h4 className="text-lg font-bold mb-4 uppercase flex items-center gap-3">
                  <Shield className="w-5 h-5 text-stone-500" /> Lifetime Support
                </h4>
                <p className="text-sm text-stone-500 leading-relaxed">
                  Every joint and surface is repairable. We provide lifetime
                  maintenance kits for every piece sold.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-4 uppercase flex items-center gap-3">
                  <Globe className="w-5 h-5 text-stone-500" /> Earth Trace
                </h4>
                <p className="text-sm text-stone-500 leading-relaxed">
                  Every cubic meter of wood harvested is tracked and offset by
                  3x reforestation in Swedish forests.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal className="relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1544450173-8c87924045cc?q=80&w=1200&auto=format&fit=crop"
              alt="Wood Texture"
              fill
              className="object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent" />
            <div className="absolute bottom-12 left-12 right-12">
              <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-4">
                <span className="w-10 h-px bg-stone-700" /> Materials Study 04
              </div>
              <h3 className="text-3xl font-black italic">
                Smoked Ash & Solid Brass.
              </h3>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ==========================================
          3. PRODUCT CAROUSEL (Interactive Specs)
          ========================================== */}
      <section className="py-32 bg-stone-50">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <Reveal>
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter uppercase">
                Selected pieces
              </h2>
            </Reveal>
            <div className="flex gap-4">
              <button className="w-14 h-14 rounded-full border border-stone-200 flex items-center justify-center hover:bg-stone-900 hover:text-white transition-all cursor-pointer">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button className="w-14 h-14 rounded-full border border-stone-200 flex items-center justify-center hover:bg-stone-900 hover:text-white transition-all cursor-pointer">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRODUCTS.map((prod, i) => (
              <Reveal key={prod.id} delay={i * 0.1}>
                <div className="group cursor-pointer">
                  <div className="relative aspect-[4/5] bg-white rounded-[40px] overflow-hidden mb-10 p-12 flex items-center justify-center group-hover:shadow-2xl transition-all duration-700">
                    <Image
                      src={prod.image}
                      alt={prod.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-stone-900/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-8 left-8 right-8 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <button className="w-full py-5 bg-white text-stone-900 text-[10px] font-bold uppercase tracking-widest rounded-full shadow-xl">
                        Request Quotation
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-3xl font-black italic tracking-tighter mb-2 group-hover:text-stone-500 transition-colors">
                        {prod.name}
                      </h3>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
                        Design by {prod.designer}
                      </span>
                    </div>
                    <span className="text-xl font-bold">{prod.price}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-stone-200 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div>
                      <div className="text-[8px] uppercase tracking-widest text-stone-400 mb-1">
                        Material
                      </div>
                      <div className="text-[10px] font-bold uppercase">
                        {prod.stats.material}
                      </div>
                    </div>
                    <div>
                      <div className="text-[8px] uppercase tracking-widest text-stone-400 mb-1">
                        Lead Time
                      </div>
                      <div className="text-[10px] font-bold uppercase">
                        {prod.stats.leadTime}
                      </div>
                    </div>
                    <div>
                      <div className="text-[8px] uppercase tracking-widest text-stone-400 mb-1">
                        Warranty
                      </div>
                      <div className="text-[10px] font-bold uppercase">
                        {prod.stats.warranty}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          4. THE WORKSHOP (Process Marquee)
          ========================================== */}
      <section className="py-32 bg-white overflow-hidden border-y border-stone-100">
        <div className="mb-20 text-center px-6">
          <Reveal>
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-stone-400 mb-6 block">
              The Atelier
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-8">
              Craft as a <span className="italic">Manifesto.</span>
            </h2>
          </Reveal>
        </div>

        <div className="flex overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="flex gap-12 whitespace-nowrap"
          >
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div
                key={idx}
                className="relative w-[300px] md:w-[450px] aspect-[4/3] rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700"
              >
                <Image
                  src={`https://images.unsplash.com/photo-${1500000000000 + idx * 10000000}?q=80&w=600&auto=format&fit=crop`}
                  alt="Workshop"
                  fill
                  className="object-cover"
                />
              </div>
            ))}
            {/* Repeat for seamless loop */}
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div
                key={`dup-${idx}`}
                className="relative w-[300px] md:w-[450px] aspect-[4/3] rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700"
              >
                <Image
                  src={`https://images.unsplash.com/photo-${1500000000000 + idx * 10000000}?q=80&w=600&auto=format&fit=crop`}
                  alt="Workshop"
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </motion.div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 mt-20 grid grid-cols-1 md:grid-cols-4 gap-12">
          {[
            {
              title: "Sourcing",
              desc: "We only use timber from managed Scandinavian forests where trees are individually marked for selective harvest.",
            },
            {
              title: "Drafting",
              desc: "Every dimension is derived from the human anatomy, ensuring ergonomic perfection without visual bulk.",
            },
            {
              title: "Milling",
              desc: "State-of-the-art precision cutting meets the final hand-finishing by master joiners.",
            },
            {
              title: "Oiling",
              desc: "We finish our wood with natural organic oils that allow the timber to breathe and develop a deep patina.",
            },
          ].map((step, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="flex flex-col gap-4">
                <span className="text-[10px] font-black italic text-stone-300">
                  0{i + 1}
                </span>
                <h4 className="text-lg font-bold uppercase tracking-tight">
                  {step.title}
                </h4>
                <p className="text-sm text-stone-500 leading-relaxed font-light">
                  {step.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ==========================================
          5. COLLECTION GRID (Large Visuals)
          ========================================== */}
      <section className="py-32 bg-stone-50">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[800px]">
            <Reveal className="lg:col-span-8 relative rounded-3xl overflow-hidden group shadow-2xl">
              <Image
                src={COLLECTIONS[0].image}
                alt="Collection"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-stone-900/30 transition-colors" />
              <div className="absolute bottom-12 left-12">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/70 mb-4 block">
                  {COLLECTIONS[0].count}
                </span>
                <h3 className="text-6xl font-black italic text-white tracking-tighter mb-8 uppercase">
                  {COLLECTIONS[0].title}
                </h3>
                <button className="px-8 py-4 bg-white text-stone-900 text-[10px] font-bold uppercase tracking-widest rounded-full flex items-center gap-2">
                  View Collection <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </Reveal>

            <div className="lg:col-span-4 flex flex-col gap-8 h-full">
              {COLLECTIONS.slice(1).map((col, i) => (
                <Reveal
                  key={i}
                  delay={0.2 + i * 0.1}
                  className="flex-1 relative rounded-3xl overflow-hidden group shadow-xl"
                >
                  <Image
                    src={col.image}
                    alt="Collection"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-stone-900/30 transition-colors" />
                  <div className="absolute bottom-10 left-10">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/70 mb-2 block">
                      {col.count}
                    </span>
                    <h3 className="text-3xl font-black italic text-white tracking-tighter uppercase">
                      {col.title}
                    </h3>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          6. DESIGNER SPOTLIGHT
          ========================================== */}
      <section className="py-32 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <Reveal className="text-center mb-24">
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-stone-400 mb-6 block">
              The Minds
            </span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic">
              Visionaries.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
            {DESIGNERS.map((designer, i) => (
              <Reveal key={i} delay={i * 0.2}>
                <div className="group">
                  <div className="relative aspect-[3/4] rounded-3xl overflow-hidden mb-10 shadow-2xl">
                    <Image
                      src={`https://images.unsplash.com/photo-${1500000000000 + (i + 10) * 10000000}?q=80&w=800&auto=format&fit=crop`}
                      alt={designer.name}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                    />
                  </div>
                  <h4 className="text-3xl font-black italic tracking-tighter mb-4 uppercase">
                    {designer.name}
                  </h4>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-6 block">
                    {designer.role}
                  </span>
                  <p className="text-stone-500 leading-relaxed font-light">
                    {designer.bio}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          7. MEGA FOOTER
          ========================================== */}
      <footer className="bg-stone-900 text-white pt-32 pb-12 px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-24">
            <div className="lg:col-span-5">
              <Reveal>
                <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter mb-12 uppercase leading-[0.85]">
                  Sculpt <br />{" "}
                  <span className="text-stone-600 not-italic">your space.</span>
                </h2>
                <div className="flex flex-col gap-6">
                  <p className="text-stone-400 max-w-sm">
                    Receive our limited-edition catalog featuring the 'Nordic
                    Light' collection and insights from our lead roasters.
                  </p>
                  <form
                    className="flex border-b border-stone-800 pb-4 max-w-md"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="bg-transparent flex-1 text-lg font-light outline-none text-white placeholder-stone-700"
                    />
                    <button
                      type="submit"
                      className="text-[10px] uppercase tracking-widest font-bold hover:text-stone-400 transition-colors"
                    >
                      Join
                    </button>
                  </form>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-2 lg:col-start-7">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-stone-600 mb-10">
                Collections
              </h4>
              <ul className="space-y-4 text-sm font-light text-stone-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Living Room
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Workspace
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Bedroom
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Archive Pieces
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    New Arrivals
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-stone-600 mb-10">
                Studio
              </h4>
              <ul className="space-y-4 text-sm font-light text-stone-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Our Practice
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Designers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Showrooms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Press
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-stone-600 mb-10">
                Support
              </h4>
              <ul className="space-y-4 text-sm font-light text-stone-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Shipping & Freight
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Returns
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Maintenance
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Custom Projects
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-10 border-t border-stone-800 text-[9px] uppercase tracking-widest font-bold text-stone-700">
            <div className="flex items-center gap-10">
              <span>
                &copy; {new Date().getFullYear()} Nordic Studio Sweden AB
              </span>
              <Link href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Terms of Trade
              </Link>
            </div>
            <div className="flex gap-10">
              <span>Global Freight Enabled</span>
              <span>Crafted in Malmö</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
