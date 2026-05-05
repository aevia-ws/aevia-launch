"use client";

import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Camera, Film, Sparkles, Wand2, Zap, Globe, Activity, Terminal, Box, Share2, Layers, Maximize, Monitor, MousePointer2, Navigation, Wifi, Shield, ShoppingBag, Search, Star, Mail, Phone, Check, Menu, X, MapPin, Clock, Lock, Plus, Bell, Settings, ArrowRight, ArrowUpRight, ChevronRight, Eye, PenTool } from "lucide-react";

import "../premium.css";

/* ==========================================================================
   DATA STRUCTURES
   ========================================================================= */

const EDITORIALS = [
  {
    id: 1,
    title: "NEO_CLASSIC",
    category: "Cover Story",
    img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=80",
    size: "lg",
  },
  {
    id: 2,
    title: "SHADOW_WALK",
    category: "Editorial",
    img: "https://images.unsplash.com/photo-1539109132304-391490211181?w=800&q=80",
    size: "sm",
  },
  {
    id: 3,
    title: "BRUTAL_FORM",
    category: "Lookbook",
    img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
    size: "sm",
  },
  {
    id: 4,
    title: "KINETIC_SILK",
    category: "Feature",
    img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=80",
    size: "md",
  },
  {
    id: 5,
    title: "VOID_FASHION",
    category: "Experimental",
    img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
    size: "sm",
  },
];

/* ==========================================================================
   UTILITY COMPONENTS
   ========================================================================= */

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

function Counter({
  to,
  prefix = "",
  suffix = "",
}: {
  to: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    let cur = 0;
    const step = to / 70;
    const t = setInterval(() => {
      cur += step;
      if (cur >= to) {
        setCount(to);
        clearInterval(t);
      } else {
        setCount(Math.floor(cur));
      }
    }, 16);
    return () => clearInterval(t);
  }, [isInView, to]);
  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

function MagneticBtn({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouse = useCallback(
    (e: React.MouseEvent) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
      y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
    },
    [x, y],
  );

  const reset = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.button
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.button>
  );
}

/* ==========================================================================
   MAIN PAGE COMPONENT
   ========================================================================= */

export default function MosaicOSPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeEditorial, setActiveEditorial] = useState<number | null>(null);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="premium-theme min-h-screen bg-[#fcfcfc] text-[#0a0a0a] font-serif selection:bg-stone-900 selection:text-white overflow-x-hidden"
      style={{ scrollBehavior: "smooth" }}
    >
      {/* ==========================================
          NAVIGATION
          ========================================== */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-1000 ${scrolled ? "bg-white/95 backdrop-blur-xl py-4 border-b border-black/5 shadow-sm" : "bg-transparent py-10"}`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="flex flex-col items-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-stone-400 mb-1 italic">
              Edition.081
            </span>
            <span className="text-xl md:text-3xl font-black tracking-tighter uppercase text-black italic">
              VOGUE<span className="text-stone-300">.NOIRE</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">
            <Link
              href="#editorials"
              className="hover:text-black transition-colors"
            >
              Editorials
            </Link>
            <Link
              href="#archive"
              className="hover:text-black transition-colors"
            >
              Archive
            </Link>
            <li>
              <Link
                href="#culture"
                className="hover:text-black transition-colors"
              >
                Culture
              </Link>
            </li>
            <li>
              <Link
                href="#boutique"
                className="hover:text-black transition-colors"
              >
                Shop
              </Link>
            </li>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden xl:flex flex-col items-end">
              <span className="text-[9px] font-bold text-stone-300 uppercase tracking-widest">
                Paris // 14:48
              </span>
              <span className="text-[11px] font-black text-black flex items-center gap-1">
                LIVE_ISSUE <Activity className="w-3 h-3" />
              </span>
            </div>
            <MagneticBtn className="px-8 py-3 bg-black text-white text-[10px] font-bold uppercase tracking-widest rounded-none hover:bg-stone-800 transition-all shadow-xl">
              SUBSCRIBE
            </MagneticBtn>
            <button onClick={() => setMenuOpen(true)} className="lg:hidden">
              <Menu className="w-6 h-6 text-stone-500" />
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
            className="fixed inset-0 z-[100] bg-white p-8 pt-32 flex flex-col border-l border-black/5"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-10 right-8 text-stone-300"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="flex flex-col gap-10 text-6xl font-black tracking-tighter uppercase italic text-stone-100">
              <Link href="#editorials" onClick={() => setMenuOpen(false)}>
                Editorials
              </Link>
              <Link href="#archive" onClick={() => setMenuOpen(false)}>
                Archive
              </Link>
              <Link href="#culture" onClick={() => setMenuOpen(false)}>
                Culture
              </Link>
              <Link href="#boutique" onClick={() => setMenuOpen(false)}>
                Shop
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==========================================
          1. HERO (Editorial Cover)
          ========================================== */}
      <section
        ref={heroRef}
        className="relative w-full h-[100svh] flex flex-col justify-center overflow-hidden"
      >
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1600&q=80"
            alt="Vogue Hero"
            fill
            className="object-cover grayscale-[0.5] contrast-125"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#fcfcfc] via-transparent to-transparent" />
        </motion.div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full">
          <Reveal>
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/40 backdrop-blur-md rounded-none border border-black/5 text-black text-[10px] font-bold uppercase tracking-widest mb-10 shadow-sm italic">
              <Camera className="w-3.5 h-3.5" />
              Featured: The Neo-Classical Shift
            </div>
            <h1 className="text-8xl md:text-[12rem] lg:text-[15rem] font-black leading-[0.8] tracking-tighter mb-12 uppercase italic text-black">
              High <br />{" "}
              <span className="text-stone-300 not-italic">Fashion.</span>
            </h1>
            <p className="max-w-xl text-xl md:text-2xl text-black/40 leading-relaxed font-bold mb-12 uppercase tracking-tight italic">
              Unveiling the structural future of luxury. A visceral exploration
              of form, shadow, and kinetic silk.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <MagneticBtn className="px-12 py-5 bg-black text-white text-[10px] font-bold uppercase tracking-[0.4em] rounded-none hover:bg-stone-800 transition-all cursor-pointer shadow-2xl">
                Read Cover Story
              </MagneticBtn>
              <button className="px-12 py-5 border border-black/10 text-black text-[10px] font-bold uppercase tracking-[0.4em] rounded-none hover:bg-black hover:text-white transition-all cursor-pointer">
                Browse_Gallery
              </button>
            </div>
          </Reveal>
        </div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute bottom-10 left-12 hidden md:block"
        >
          <div className="flex flex-col items-start gap-3">
            <span className="text-[9px] font-bold text-stone-300 uppercase tracking-[0.5em]">
              VOGUE_NOIRE_INTL // ISSUE_081
            </span>
            <div className="w-32 h-[1px] bg-black/10" />
          </div>
        </motion.div>
      </section>

      {/* ==========================================
          2. ASYMMETRIC MOSAIC (Grid)
          ========================================== */}
      <section
        id="editorials"
        className="py-32 bg-[#fcfcfc] border-y border-black/5"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-12">
            <Reveal>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9] text-black italic">
                Recent <br />{" "}
                <span className="text-stone-300 not-italic">Editorials.</span>
              </h2>
            </Reveal>
            <p className="max-w-sm text-sm text-stone-400 leading-relaxed font-bold uppercase tracking-widest italic text-right">
              Our non-exhaustive exploration of the modern silhouette. Pushing
              materials to their absolute aesthetic limit.
            </p>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-12 space-y-12">
            {EDITORIALS.map((e, i) => (
              <Reveal key={e.id} delay={i * 0.1}>
                <div
                  onClick={() => setActiveEditorial(i)}
                  className="group cursor-pointer bg-white border border-black/5 p-4 shadow-sm hover:shadow-2xl transition-all duration-1000"
                >
                  <div className="relative aspect-[3/4] mb-8 overflow-hidden bg-stone-100">
                    <Image
                      src={e.img}
                      alt={e.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-1000 grayscale-[0.2] group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all duration-1000" />
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-stone-300 mb-2 block">
                        {e.category}
                      </span>
                      <h3 className="text-2xl font-black uppercase tracking-tighter text-black italic">
                        {e.title}
                      </h3>
                    </div>
                    <button className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          3. CULTURE (Magazine Content)
          ========================================== */}
      <section id="culture" className="py-32 bg-[#fcfcfc]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-32 items-start">
            <div className="lg:col-span-5 sticky top-32">
              <Reveal>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-stone-400 mb-6 block">
                  Editorial Manifest
                </span>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight mb-12 text-black uppercase italic">
                  Cultural <br />{" "}
                  <span className="text-stone-300 not-italic">Entropy.</span>
                </h2>
                <p className="text-lg text-stone-500 leading-relaxed font-bold mb-16 uppercase tracking-tight italic">
                  Nous croyons que la mode est une science de la déconstruction.
                  Chaque numéro explore la tension entre l'ordre classique et le
                  chaos moderne.
                </p>

                <div className="space-y-12">
                  {[
                    {
                      label: "Global Readership",
                      val: 1.2,
                      suffix: "M",
                      desc: "Our network spans 42 countries, connecting visionaries across every timezone.",
                    },
                    {
                      label: "Annual Issues",
                      val: 4,
                      suffix: "",
                      desc: "Four seasonal deep-dives into the heart of the industry's evolution.",
                    },
                    {
                      label: "Archive Depth",
                      val: 15000,
                      suffix: "+",
                      desc: "Decades of structural fashion photography digitized for the new era.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="group border-l border-black/5 pl-8 hover:border-black transition-all"
                    >
                      <h4 className="text-sm font-bold uppercase tracking-tight mb-2 text-stone-400">
                        {item.label}
                      </h4>
                      <div className="text-3xl font-black text-black mb-2 uppercase italic tabular-nums">
                        <Counter to={item.val} suffix={item.suffix} />
                      </div>
                      <p className="text-[10px] text-stone-300 leading-relaxed font-bold uppercase tracking-widest">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-7 space-y-32">
              {[
                {
                  title: "THE_ALCHEMIST",
                  date: "FEB 2026",
                  desc: "Exploring the chemical relationship between raw textiles and human sweat.",
                  img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&q=80",
                },
                {
                  title: "SILICON_SILK",
                  date: "APR 2026",
                  desc: "The integration of wearable computing into high-end Parisian couture.",
                  img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=80",
                },
              ].map((post, i) => (
                <Reveal key={i}>
                  <div className="group cursor-pointer">
                    <div className="relative aspect-video mb-12 overflow-hidden shadow-xl">
                      <Image
                        src={post.img}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-1000"
                      />
                    </div>
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-[10px] font-black uppercase tracking-widest text-stone-300">
                        {post.date}
                      </span>
                      <div className="h-[1px] flex-grow mx-8 bg-black/5" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-black">
                        Featured_Article
                      </span>
                    </div>
                    <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-black mb-8 group-hover:text-stone-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-xl text-stone-500 leading-relaxed font-bold uppercase tracking-tight italic mb-12">
                      {post.desc}
                    </p>
                    <button className="px-10 py-4 border border-black/10 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-black hover:text-white transition-all">
                      READ_ARTICLE
                    </button>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          4. BOUTIQUE (Product)
          ========================================== */}
      <section
        id="boutique"
        className="py-32 bg-[#fcfcfc] border-t border-black/5"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-32 items-center">
            <div className="lg:col-span-7">
              <Reveal className="relative aspect-square bg-stone-100 flex items-center justify-center p-24 group">
                <Image
                  src="https://images.unsplash.com/photo-1539109132304-391490211181?w=800&q=80"
                  alt="Magazine"
                  width={500}
                  height={700}
                  className="shadow-2xl group-hover:-translate-y-4 transition-transform duration-1000"
                />
                <div className="absolute top-12 left-12">
                  <span className="text-[8vw] font-black text-black/5 italic select-none">
                    EDITION.081
                  </span>
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-5">
              <Reveal>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-stone-400 mb-6 block">
                  Print Archive
                </span>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight mb-12 text-black uppercase italic">
                  Physical <br />{" "}
                  <span className="text-stone-300 not-italic">Manifest.</span>
                </h2>
                <p className="text-lg text-stone-500 leading-relaxed font-bold mb-16 uppercase tracking-tight italic">
                  Possédez un morceau de l'histoire du design. Nos éditions
                  limitées sont imprimées sur du papier italien 250g avec une
                  finition mat-profond.
                </p>
                <div className="space-y-6">
                  {[
                    {
                      name: "Edition 081: Neo-Classic",
                      price: "€45",
                      stock: "LOW_STOCK",
                    },
                    {
                      name: "The Anthology Box (V1-V10)",
                      price: "€350",
                      stock: "AVAILABLE",
                    },
                    {
                      name: "Vogue Noire Manifesto Tote",
                      price: "€28",
                      stock: "LIMITED",
                    },
                  ].map((p, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-8 border border-black/5 hover:border-black transition-all cursor-pointer group"
                    >
                      <div>
                        <span className="text-[10px] font-black uppercase text-black tracking-widest block mb-2">
                          {p.name}
                        </span>
                        <span className="text-[8px] font-bold text-stone-300 uppercase tracking-widest">
                          {p.stock}
                        </span>
                      </div>
                      <span className="text-xl font-black text-black italic">
                        {p.price}
                      </span>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-12 py-6 bg-black text-white text-[10px] font-bold uppercase tracking-widest rounded-none hover:bg-stone-800 transition-all shadow-2xl">
                  VISIT_FULL_BOUTIQUE
                </button>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          5. MEGA FOOTER (Premium Minimal)
          ========================================== */}
      <footer className="bg-white pt-32 pb-12 px-6 md:px-12 border-t border-black/5 relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-32">
            <div className="lg:col-span-5">
              <Reveal>
                <div className="flex flex-col mb-10">
                  <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-stone-300 mb-1 italic">
                    Edition.081
                  </span>
                  <span className="text-2xl font-black tracking-tighter uppercase text-black italic">
                    VOGUE<span className="text-stone-300">.NOIRE</span>
                  </span>
                </div>
                <p className="text-stone-300 max-w-sm mb-12 uppercase tracking-widest text-[10px] font-bold leading-relaxed italic">
                  The infrastructure for the next generation of fashion media.
                  Est. 2026. Precision distilled. Globally distributed.
                </p>
                <form
                  className="relative max-w-md"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="email"
                    placeholder="JOIN_THE_MANIFESTO"
                    className="w-full bg-stone-50 border border-black/5 rounded-none px-6 py-4 text-xs font-bold outline-none focus:border-black text-black transition-all uppercase tracking-widest"
                  />
                  <button
                    type="submit"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-stone-300 hover:text-black transition-colors uppercase tracking-[0.3em]"
                  >
                    JOIN
                  </button>
                </form>
              </Reveal>
            </div>

            <div className="lg:col-span-2 lg:col-start-7">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-black mb-10">
                Editorials
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-stone-300">
                <li>
                  <Link href="#" className="hover:text-black transition-colors">
                    Cover_Stories
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black transition-colors">
                    Lookbooks
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black transition-colors">
                    Fashion_Films
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black transition-colors">
                    Archive_Labs
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-black mb-10">
                Culture
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-stone-300">
                <li>
                  <Link href="#" className="hover:text-black transition-colors">
                    Art_Design
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black transition-colors">
                    Architecture
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black transition-colors">
                    Sustainability
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black transition-colors">
                    Contact_Control
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-black mb-10">
                Network
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-stone-300">
                <li>
                  <Link
                    href="#"
                    className="hover:text-black transition-colors flex items-center gap-3"
                  >
                    <Globe className="w-3 h-3" /> Globe
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-black transition-colors flex items-center gap-3"
                  >
                    <Globe className="w-3 h-3" /> X_Mission
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-black transition-colors flex items-center gap-3"
                  >
                    <Mail className="w-3 h-3" /> Headquarters
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-10 border-t border-black/5 text-[9px] font-bold uppercase tracking-widest text-stone-200">
            <div className="flex items-center gap-10">
              <span>
                &copy; {new Date().getFullYear()} VOGUE NOIRE Media Group.
              </span>
              <Link href="#" className="hover:text-black transition-colors">
                Regulatory_Terms
              </Link>
              <Link href="#" className="hover:text-black transition-colors">
                Privacy_Buffer
              </Link>
            </div>
            <div className="flex gap-10">
              <span>Paris // Milan // Tokyo</span>
              <span>In Form We Trust</span>
            </div>
          </div>
        </div>
      </footer>

      {/* EDITORIAL MODAL */}
      <AnimatePresence>
        {activeEditorial !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-white/98 backdrop-blur-3xl flex items-center justify-center p-6"
            onClick={() => setActiveEditorial(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="bg-white border border-black/5 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 overflow-hidden rounded-none shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveEditorial(null)}
                className="absolute top-8 right-8 text-stone-300 hover:text-black transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>

              {/* IMAGE AREA */}
              <div className="lg:col-span-8 relative aspect-video lg:aspect-auto bg-stone-50">
                <Image
                  src={EDITORIALS[activeEditorial].img}
                  alt="Editorial"
                  fill
                  className="object-cover grayscale-[0.2]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <h3 className="text-4xl font-black text-black italic">
                    {EDITORIALS[activeEditorial].title}
                  </h3>
                </div>
              </div>

              {/* SIDEBAR AREA */}
              <div className="lg:col-span-4 p-8 flex flex-col justify-between bg-white border-l border-black/5">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-stone-300 mb-6 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-stone-300" />
                    Editorial Specification Report
                  </div>
                  <div className="space-y-6 mb-12">
                    {[
                      {
                        label: "Category",
                        val: EDITORIALS[activeEditorial].category,
                      },
                      { label: "Photographer", val: "Aevia Lens" },
                      { label: "Stylist", val: "Julian Vane" },
                      { label: "Status", val: "ARCHIVED_V1" },
                    ].map((spec, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center border-b border-black/5 pb-4"
                      >
                        <span className="text-[9px] font-bold text-stone-300 uppercase tracking-widest">
                          {spec.label}
                        </span>
                        <span className="text-[10px] font-black text-black uppercase italic">
                          {spec.val}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-stone-400 leading-relaxed font-bold uppercase tracking-tight italic mb-10">
                    An exploration of the modern silhouette, captured under
                    high-contrast studio conditions.
                  </p>
                </div>

                <button className="w-full py-5 bg-black text-white text-[10px] font-bold uppercase tracking-widest hover:bg-stone-800 transition-all cursor-pointer shadow-xl">
                  REQUEST_FULL_ASSETS
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        ::-webkit-scrollbar{width:4px;background:#fcfcfc}
        ::-webkit-scrollbar-thumb{background:#000}
      `}</style>
    </div>
  );
}
