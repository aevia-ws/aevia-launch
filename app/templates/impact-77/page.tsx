"use client";

import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
  useMotionValue,
  useSpring,
  MotionValue,
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
import { Watch, Clock, Shield, Star, Heart, Share2, ShoppingBag, Search, Compass, Zap, Activity, Globe, Monitor, Smartphone, Terminal, Mail, Phone, Check, Menu, X, MapPin, Lock, Plus, Bell, Settings, ArrowRight, ArrowUpRight, ChevronRight, Eye, Layers, Box } from "lucide-react";

import "../premium.css";

/* ==========================================================================
   DATA STRUCTURES
   ========================================================================= */

const WATCHES = [
  {
    id: 1,
    name: "AETHER_G1",
    collection: "Celestial",
    price: "€14,200",
    movement: "Calibre V8.4",
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    desc: "Titanium chassis with meteorite dial. 72-hour power reserve.",
  },
  {
    id: 2,
    name: "CHRONO_VOID",
    collection: "Dark Matter",
    price: "€28,500",
    movement: "Quantum Tourbillon",
    img: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800&q=80",
    desc: "Forged carbon case. Nanoparticle black finish.",
  },
  {
    id: 3,
    name: "LUMINA_ROYAL",
    collection: "Ecliptic",
    price: "€42,000",
    movement: "Eternal Perpetual",
    img: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=800&q=80",
    desc: "18K White Gold. Moonphase complication with ceramic inlay.",
  },
  {
    id: 4,
    name: "STELLAR_X",
    collection: "Celestial",
    price: "€18,900",
    movement: "Flux Automatic",
    img: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=80",
    desc: "Skeletonized movement. Grade 5 titanium components.",
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

function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["7.5deg", "-7.5deg"],
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["-7.5deg", "7.5deg"],
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ==========================================================================
   MAIN PAGE COMPONENT
   ========================================================================= */

export default function HorologsLuxePage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeWatch, setActiveWatch] = useState<number | null>(null);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="premium-theme min-h-screen bg-[#050505] text-[#d4d4d8] font-mono selection:bg-stone-500 selection:text-white overflow-x-hidden"
      style={{ scrollBehavior: "smooth" }}
    >
      {/* ==========================================
          NAVIGATION
          ========================================== */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-1000 ${scrolled ? "bg-black/95 backdrop-blur-xl py-4 border-b border-white/5" : "bg-transparent py-10"}`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="flex flex-col items-start">
            <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-stone-500 mb-1">
              Celestial.
            </span>
            <span className="text-xl md:text-2xl font-black tracking-tighter uppercase text-white">
              HOROLOGS<span className="text-stone-600">.LUXE</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">
            <Link
              href="#collection"
              className="hover:text-white transition-colors"
            >
              Collection
            </Link>
            <Link
              href="#anatomy"
              className="hover:text-white transition-colors"
            >
              Anatomy
            </Link>
            <Link
              href="#heritage"
              className="hover:text-white transition-colors"
            >
              Heritage
            </Link>
            <Link
              href="#boutique"
              className="hover:text-white transition-colors"
            >
              Boutique
            </Link>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden xl:flex flex-col items-end">
              <span className="text-[9px] font-bold text-white/10 uppercase tracking-widest">
                Global Inventory
              </span>
              <span className="text-[11px] font-black text-stone-500 flex items-center gap-1">
                SYNC_ACTIVE <Activity className="w-3 h-3" />
              </span>
            </div>
            <MagneticBtn className="px-8 py-3 bg-white text-black text-[10px] font-bold uppercase tracking-widest rounded-none hover:bg-stone-200 transition-all">
              RESERVE_PIECE
            </MagneticBtn>
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
            className="fixed inset-0 z-[100] bg-black p-8 pt-32 flex flex-col border-l border-white/5"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-10 right-8 text-white/20"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="flex flex-col gap-10 text-5xl font-black tracking-tighter uppercase italic text-stone-700">
              <Link href="#collection" onClick={() => setMenuOpen(false)}>
                Collection
              </Link>
              <Link href="#anatomy" onClick={() => setMenuOpen(false)}>
                Anatomy
              </Link>
              <Link href="#heritage" onClick={() => setMenuOpen(false)}>
                Heritage
              </Link>
              <Link href="#boutique" onClick={() => setMenuOpen(false)}>
                Boutique
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==========================================
          1. HERO (Cinematic Luxury)
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
            src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=1600&q=80"
            alt="Horologs Hero"
            fill
            className="object-cover brightness-50 grayscale-[0.5]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
        </motion.div>

        {/* RADIANT GOLDEN LIGHTS */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-stone-900/40 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full">
          <Reveal>
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-md rounded-none border border-white/10 text-stone-400 text-[10px] font-bold uppercase tracking-widest mb-10 shadow-sm">
              <Watch className="w-3.5 h-3.5" />
              Institutional Horology // Excellence Since 1924
            </div>
            <h1 className="text-7xl md:text-9xl lg:text-[11rem] font-black leading-[0.85] tracking-tighter mb-12 uppercase">
              Mastery of <br />{" "}
              <span className="text-stone-600 italic">Duration.</span>
            </h1>
            <p className="max-w-xl text-lg md:text-xl text-white/20 leading-relaxed font-bold mb-12 uppercase tracking-tight italic">
              Advanced mechanical engineering for the discerning collector.
              Calibrating the infinite through structural precision.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <MagneticBtn className="px-12 py-5 bg-white text-black text-[10px] font-bold uppercase tracking-[0.4em] rounded-none hover:bg-stone-200 transition-all cursor-pointer shadow-2xl">
                Browse Collection
              </MagneticBtn>
              <button className="px-12 py-5 border border-white/10 text-white text-[10px] font-bold uppercase tracking-[0.4em] rounded-none hover:bg-white hover:text-black transition-all cursor-pointer">
                Technical_Manifesto
              </button>
            </div>
          </Reveal>
        </div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute bottom-10 left-12 hidden md:block"
        >
          <div className="flex flex-col items-start gap-3">
            <span className="text-[9px] font-bold text-white/10 uppercase tracking-[0.5em]">
              AEVIA_CHRONOS // SERIAL_V77
            </span>
            <div className="w-32 h-[1px] bg-white/10" />
          </div>
        </motion.div>
      </section>

      {/* ==========================================
          2. THE COLLECTION (Tilt Grid)
          ========================================== */}
      <section
        id="collection"
        className="py-32 bg-[#050505] border-y border-white/5"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
            <Reveal>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9] text-white">
                The <br />{" "}
                <span className="text-stone-600 italic">Archive.</span>
              </h2>
            </Reveal>
            <p className="max-w-sm text-sm text-white/10 leading-relaxed font-bold uppercase tracking-widest italic text-right">
              Filter by complication, material, or heritage. Each piece is a
              unique mechanical identity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {WATCHES.map((w, i) => (
              <Reveal key={w.id} delay={i * 0.1}>
                <TiltCard className="group cursor-pointer bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all rounded-none p-6 shadow-sm overflow-hidden">
                  <div
                    onClick={() => setActiveWatch(i)}
                    className="relative aspect-[3/4] mb-8 overflow-hidden"
                  >
                    <Image
                      src={w.img}
                      alt={w.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-1000 grayscale-[0.3] group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-stone-900/10 mix-blend-overlay" />
                  </div>
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-black uppercase tracking-tighter text-white italic">
                        {w.name}
                      </h3>
                      <span className="text-[10px] font-bold text-stone-500 uppercase">
                        {w.collection}
                      </span>
                    </div>
                    <p className="text-[9px] text-white/30 leading-relaxed font-bold uppercase tracking-widest mb-6 italic">
                      {w.desc}
                    </p>
                    <div className="flex justify-between items-end">
                      <span className="text-lg font-black text-white italic">
                        {w.price}
                      </span>
                      <button className="text-[9px] font-black uppercase tracking-widest text-stone-500 group-hover:text-white transition-colors">
                        Inquire_Now
                      </button>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          3. ANATOMY (Interactive Breakdown)
          ========================================== */}
      <section id="anatomy" className="py-32 bg-[#050505]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-32 items-center">
            <div className="lg:col-span-5">
              <Reveal>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-stone-600 mb-6 block">
                  Mechanical Integrity
                </span>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight mb-12 text-white uppercase italic">
                  Structural <br />{" "}
                  <span className="text-stone-600 not-italic">Anatomy.</span>
                </h2>
                <p className="text-lg text-white/20 leading-relaxed font-bold mb-16 uppercase tracking-tight italic">
                  Every Horologs piece consists of over 420 individual
                  components, assembled by hand under high-resolution
                  magnification.
                </p>

                <div className="space-y-6">
                  {[
                    {
                      label: "Tourbillon Precision",
                      val: 99.99,
                      suffix: "%",
                      desc: "Gravity-corrected escapement for absolute temporal accuracy.",
                    },
                    {
                      label: "Power Reserve",
                      val: 72,
                      suffix: " HR",
                      desc: "Dual-barrel system providing 3 days of autonomous energy.",
                    },
                    {
                      label: "Depth Rating",
                      val: 300,
                      suffix: " M",
                      desc: "Reinforced sapphire casing with structural integrity monitoring.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="group border-l border-white/5 pl-8 hover:border-stone-600 transition-all"
                    >
                      <h4 className="text-sm font-bold uppercase tracking-tight mb-2 text-white/40">
                        {item.label}
                      </h4>
                      <div className="text-3xl font-black text-stone-500 mb-2 uppercase italic tabular-nums">
                        <Counter to={item.val} suffix={item.suffix} />
                      </div>
                      <p className="text-[10px] text-white/10 leading-relaxed font-bold uppercase tracking-widest">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Reveal className="relative aspect-square rounded-full border border-white/5 p-12 flex items-center justify-center group overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,162,158,0.05)_0%,transparent_70%)] animate-pulse" />
                {/* PSEUDO ANATOMY VISUAL */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 60,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0 border border-white/5 rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 40,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-12 border border-white/5 rounded-full border-dashed"
                />

                <div className="relative z-10 text-center">
                  <Watch className="w-32 h-32 text-stone-600 mb-8 mx-auto opacity-20" />
                  <div className="text-[10px] font-black text-white/20 uppercase tracking-[1em] mb-4">
                    Internal_View_Enabled
                  </div>
                  <div className="space-y-2">
                    <div className="h-1 w-32 bg-stone-600 mx-auto rounded-full" />
                    <div className="h-1 w-20 bg-stone-800 mx-auto rounded-full" />
                  </div>
                </div>

                {/* CALLOUTS */}
                <div className="absolute top-1/4 right-0 flex items-center gap-4">
                  <div className="w-12 h-[1px] bg-stone-600" />
                  <span className="text-[8px] font-black text-stone-500 uppercase tracking-widest">
                    Sapphire_Inlay
                  </span>
                </div>
                <div className="absolute bottom-1/4 left-0 flex items-center gap-4">
                  <span className="text-[8px] font-black text-stone-500 uppercase tracking-widest">
                    Titanium_Core
                  </span>
                  <div className="w-12 h-[1px] bg-stone-600" />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          4. STATS (Counters)
          ========================================== */}
      <section className="py-24 bg-[#050505] border-y border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-2 lg:grid-cols-4 gap-16 text-center">
          {[
            { label: "Boutiques_Global", val: 14, suffix: "" },
            { label: "Pieces_Annual", val: 450, suffix: "" },
            { label: "Master_Watchmakers", val: 8, suffix: "" },
            { label: "Patent_Inventions", val: 124, suffix: "" },
          ].map((stat, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="text-5xl md:text-7xl font-black text-stone-600 mb-4 italic tabular-nums">
                <Counter to={stat.val} suffix={stat.suffix} />
              </div>
              <div className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/20">
                {stat.label}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ==========================================
          5. FAQ (The Buffer)
          ========================================== */}
      <section className="py-32 bg-[#050505]">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-none uppercase italic text-white">
              Chronos_Buffer
            </h2>
          </Reveal>

          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                q: "What is your global service protocol?",
                a: "Every Horologs piece includes a lifetime global service plan. You can drop your timepiece at any authorized boutique in Paris, Tokyo, or New York for a full calibration audit.",
              },
              {
                q: "Do you offer bespoke dial commissions?",
                a: "Yes. Our 'Sovereign' tier allows for full customization of dials, hands, and engraving, coordinated directly with our master watchmakers at our Swiss headquarters.",
              },
              {
                q: "What is the lead time for a new reservation?",
                a: "Due to our extremely limited annual production of 450 pieces, standard lead times are currently 6 to 18 months depending on the collection.",
              },
              {
                q: "Are your timepieces cryptocurrency compatible?",
                a: "Every Horologs watch features a discrete NFC chip in the casing that can be linked to your digital identity or secure hardware wallet for authentication.",
              },
            ].map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b border-white/5"
              >
                <AccordionTrigger className="text-left text-sm uppercase font-bold tracking-widest py-8 hover:text-stone-500 hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-white/20 leading-relaxed font-bold uppercase tracking-widest pb-8 italic">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ==========================================
          6. MEGA FOOTER (Premium Minimal)
          ========================================== */}
      <footer className="bg-[#0a0a0a] pt-32 pb-12 px-6 md:px-12 border-t border-white/5 relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-32">
            <div className="lg:col-span-5">
              <Reveal>
                <div className="flex flex-col mb-10">
                  <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-white/20 mb-1">
                    Celestial.
                  </span>
                  <span className="text-2xl font-black tracking-tighter uppercase text-white">
                    HOROLOGS<span className="text-stone-600">.LUXE</span>
                  </span>
                </div>
                <p className="text-white/20 max-w-sm mb-12 uppercase tracking-widest text-[10px] font-bold leading-relaxed italic">
                  Institutional horology for the next century of timekeepers.
                  Est. 1924. Calibrating the infinite through structural
                  precision.
                </p>
                <form
                  className="relative max-w-md"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="email"
                    placeholder="ENROLL_IN_THE_MANIFESTO"
                    className="w-full bg-white/[0.02] border border-white/5 rounded-none px-6 py-4 text-xs font-bold outline-none focus:border-stone-500 text-white transition-all uppercase tracking-widest"
                  />
                  <button
                    type="submit"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-stone-500 hover:text-white transition-colors uppercase tracking-[0.3em]"
                  >
                    ENROLL
                  </button>
                </form>
              </Reveal>
            </div>

            <div className="lg:col-span-2 lg:col-start-7">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-stone-600 mb-10">
                Collection
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/20">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Celestial_Series
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Dark_Matter_Chrono
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Ecliptic_Lumina
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Bespoke_Lab
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-stone-600 mb-10">
                Boutique
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/20">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Private_Viewing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Certified_Pre_Owned
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Service_Ledger
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Concierge
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-stone-600 mb-10">
                Network
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/20">
                <li>
                  <Link
                    href="#"
                    className="hover:text-white transition-colors flex items-center gap-3"
                  >
                    <Globe className="w-3 h-3" /> Globe
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-white transition-colors flex items-center gap-3"
                  >
                    <Globe className="w-3 h-3" /> LinkedIn
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-white transition-colors flex items-center gap-3"
                  >
                    <Mail className="w-3 h-3" /> Headquarters
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-10 border-t border-white/5 text-[9px] font-bold uppercase tracking-widest text-white/10">
            <div className="flex items-center gap-10">
              <span>&copy; {new Date().getFullYear()} HOROLOGS LUXE Inc.</span>
              <Link href="#" className="hover:text-white transition-colors">
                Regulatory_Terms
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Privacy_Buffer
              </Link>
            </div>
            <div className="flex gap-10">
              <span>Geneva // Tokyo // Dubai</span>
              <span>In Mastery We Trust</span>
            </div>
          </div>
        </div>
      </footer>

      {/* WATCH MODAL */}
      <AnimatePresence>
        {activeWatch !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/98 backdrop-blur-3xl flex items-center justify-center p-6"
            onClick={() => setActiveWatch(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="bg-[#0e0e11] border border-white/10 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 overflow-hidden rounded-none shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveWatch(null)}
                className="absolute top-8 right-8 text-white/20 hover:text-stone-500 transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>

              {/* IMAGE AREA */}
              <div className="lg:col-span-8 relative aspect-video lg:aspect-auto bg-black">
                <Image
                  src={WATCHES[activeWatch].img}
                  alt="Watch"
                  fill
                  className="object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <h3 className="text-4xl font-black text-white italic">
                    {WATCHES[activeWatch].name}
                  </h3>
                </div>
              </div>

              {/* SIDEBAR AREA */}
              <div className="lg:col-span-4 p-8 flex flex-col justify-between bg-[#0e0e11] border-l border-white/5">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-stone-500 mb-6 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-stone-500" />
                    Technical Specification Sheet
                  </div>
                  <div className="space-y-6 mb-12">
                    {[
                      { label: "Movement", val: WATCHES[activeWatch].movement },
                      { label: "Water Resistance", val: "30 Bar / 300M" },
                      { label: "Material", val: "Titanium Grade 5" },
                      {
                        label: "Certification",
                        val: "METAS / Master Chronometer",
                      },
                    ].map((spec, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center border-b border-white/5 pb-4"
                      >
                        <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">
                          {spec.label}
                        </span>
                        <span className="text-[10px] font-black text-white uppercase italic">
                          {spec.val}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-white/40 leading-relaxed font-bold uppercase tracking-tight italic mb-10">
                    {WATCHES[activeWatch].desc}
                  </p>
                </div>

                <button className="w-full py-5 bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-stone-200 transition-all cursor-pointer shadow-xl">
                  RESERVE_SERIAL_UNIT
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        ::-webkit-scrollbar{width:4px;background:#050505}
        ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1)}
      `}</style>
    </div>
  );
}
