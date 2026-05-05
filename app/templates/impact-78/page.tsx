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
import { Coffee, Droplets, Thermometer, Wind, Zap, Globe, Activity, Terminal, Box, Share2, Layers, Maximize, Monitor, MousePointer2, Navigation, Wifi, Shield, Mail, Phone, Check, Menu, X, Star, MapPin, Clock, Lock, Plus, Search, Bell, Settings, ArrowRight, ArrowUpRight, ChevronRight, CupSoda, Flame } from "lucide-react";

import "../premium.css";

/* ==========================================================================
   DATA STRUCTURES
   ========================================================================= */

const BEANS = [
  {
    id: 1,
    name: "VOID_BREW",
    origin: "Ethiopia, Yirgacheffe",
    notes: ["Blueberry", "Bergamot", "Jasmine"],
    roast: "Light",
    process: "Washed",
    img: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&q=80",
  },
  {
    id: 2,
    name: "SOLAR_FLARE",
    origin: "Colombia, Huila",
    notes: ["Chocolate", "Caramel", "Orange"],
    roast: "Medium",
    process: "Natural",
    img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
  },
  {
    id: 3,
    name: "LUNAR_ROAST",
    origin: "Sumatra, Mandheling",
    notes: ["Earthy", "Spicy", "Tobacco"],
    roast: "Dark",
    process: "Giling Basah",
    img: "https://images.unsplash.com/photo-1497933321188-91189e3f7f77?w=800&q=80",
  },
];

const BREW_METHODS = [
  { name: "V60", temp: "92°C", time: "3:30", ratio: "1:15" },
  { name: "AEROPRESS", temp: "85°C", time: "2:00", ratio: "1:12" },
  { name: "CHEMEX", temp: "94°C", time: "5:00", ratio: "1:16" },
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

export default function AetherRoasteryPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeBean, setActiveBean] = useState<number | null>(null);

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
      className="premium-theme min-h-screen bg-[#0c0a09] text-[#e7e5e4] font-mono selection:bg-orange-900 selection:text-white overflow-x-hidden"
      style={{ scrollBehavior: "smooth" }}
    >
      {/* ==========================================
          NAVIGATION
          ========================================== */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-1000 ${scrolled ? "bg-[#0c0a09]/95 backdrop-blur-md py-4 border-b border-white/5" : "bg-transparent py-10"}`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="flex flex-col items-start">
            <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-orange-500/40 mb-1">
              Artisanal.
            </span>
            <span className="text-xl md:text-2xl font-black tracking-tighter uppercase text-white">
              AETHER<span className="text-orange-900">.ROAST</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">
            <Link
              href="#collection"
              className="hover:text-orange-500 transition-colors"
            >
              Collection
            </Link>
            <Link
              href="#brew"
              className="hover:text-orange-500 transition-colors"
            >
              Brewing
            </Link>
            <Link
              href="#origin"
              className="hover:text-orange-500 transition-colors"
            >
              Origins
            </Link>
            <Link
              href="#subscribe"
              className="hover:text-orange-500 transition-colors"
            >
              Subscribe
            </Link>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden xl:flex flex-col items-end">
              <span className="text-[9px] font-bold text-white/10 uppercase tracking-widest">
                Global Sourcing
              </span>
              <span className="text-[11px] font-black text-orange-500 flex items-center gap-1">
                100% ETHICAL_TRACE <Globe className="w-3 h-3" />
              </span>
            </div>
            <MagneticBtn className="px-8 py-3 bg-white text-black text-[10px] font-bold uppercase tracking-widest rounded-none hover:bg-orange-500 hover:text-white transition-all">
              SHOP_BEANS
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
            className="fixed inset-0 z-[100] bg-[#0c0a09] p-8 pt-32 flex flex-col border-l border-white/5"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-10 right-8 text-stone-500"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="flex flex-col gap-10 text-5xl font-black tracking-tighter uppercase italic text-orange-900/50">
              <Link href="#collection" onClick={() => setMenuOpen(false)}>
                Collection
              </Link>
              <Link href="#brew" onClick={() => setMenuOpen(false)}>
                Brewing
              </Link>
              <Link href="#origin" onClick={() => setMenuOpen(false)}>
                Origins
              </Link>
              <Link href="#subscribe" onClick={() => setMenuOpen(false)}>
                Subscribe
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==========================================
          1. HERO (Cinematic Coffee)
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
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1600&q=80"
            alt="Aether Hero"
            fill
            className="object-cover brightness-50 contrast-125 grayscale-[0.3]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a09] via-transparent to-transparent" />
        </motion.div>

        {/* ORANGE PARTICLE GLOW */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-orange-900/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full">
          <Reveal>
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-orange-900/20 rounded-none border border-orange-900/40 text-orange-500 text-[10px] font-bold uppercase tracking-widest mb-10 shadow-sm">
              <Coffee className="w-3.5 h-3.5" />
              Specialty Grade // 90+ SCA Points
            </div>
            <h1 className="text-7xl md:text-9xl lg:text-[11rem] font-black leading-[0.85] tracking-tighter mb-12 uppercase">
              The Alchemy <br />{" "}
              <span className="text-orange-900 italic">of Extraction.</span>
            </h1>
            <p className="max-w-xl text-lg md:text-xl text-white/20 leading-relaxed font-bold mb-12 uppercase tracking-tight italic">
              Precision-roasted molecular coffee. Sourced at origin. Analyzed in
              lab. Delivered in spectrum.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <MagneticBtn className="px-12 py-5 bg-white text-black text-[10px] font-bold uppercase tracking-[0.4em] rounded-none hover:bg-orange-900 hover:text-white transition-all cursor-pointer shadow-2xl">
                Explore Roast Spectrum
              </MagneticBtn>
              <button className="px-12 py-5 border border-white/10 text-white text-[10px] font-bold uppercase tracking-[0.4em] rounded-none hover:bg-white hover:text-black transition-all cursor-pointer">
                Technical_Brew_Log
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
              AETHER_ROAST_OS // NODE_078
            </span>
            <div className="w-32 h-[1px] bg-orange-900/40" />
          </div>
        </motion.div>
      </section>

      {/* ==========================================
          2. THE COLLECTION (Roast Profiles)
          ========================================== */}
      <section
        id="collection"
        className="py-32 bg-[#0c0a09] border-y border-white/5"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
            <Reveal>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9] text-white">
                Roast <br />{" "}
                <span className="text-orange-900 italic">Spectrum.</span>
              </h2>
            </Reveal>
            <p className="max-w-sm text-sm text-white/10 leading-relaxed font-bold uppercase tracking-widest italic text-right">
              Our selection of rotating micro-lots. Each bean is a unique
              genetic sequence of flavor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {BEANS.map((b, i) => (
              <Reveal key={b.id} delay={i * 0.1}>
                <div
                  onClick={() => setActiveBean(i)}
                  className="group cursor-pointer bg-white/[0.02] border border-white/5 hover:border-orange-900/40 transition-all rounded-none p-8 shadow-sm h-full flex flex-col justify-between overflow-hidden"
                >
                  <div>
                    <div className="relative aspect-[4/5] mb-10 overflow-hidden">
                      <Image
                        src={b.img}
                        alt={b.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-1000 grayscale-[0.2] group-hover:grayscale-0"
                      />
                      <div className="absolute inset-0 bg-orange-900/10 mix-blend-overlay" />
                      <div className="absolute top-6 left-6">
                        <Badge className="bg-orange-900 text-white border-none text-[8px] font-black tracking-widest uppercase px-3 py-1">
                          {b.roast}_ROAST
                        </Badge>
                      </div>
                    </div>
                    <h3 className="text-2xl font-black uppercase tracking-tighter text-white italic mb-4">
                      {b.name}
                    </h3>
                    <div className="text-[10px] font-black text-orange-900 uppercase tracking-widest mb-6">
                      {b.origin}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-10">
                      {b.notes.map((n) => (
                        <span
                          key={n}
                          className="text-[8px] font-black uppercase tracking-widest text-white/20 bg-white/[0.02] px-2 py-1 border border-white/5"
                        >
                          {n}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button className="w-full py-4 border border-white/10 text-[9px] font-black uppercase tracking-widest text-stone-500 group-hover:bg-white group-hover:text-black transition-all">
                    RESERVE_BAG
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          3. BREW LOGIC (Interactive Guide)
          ========================================== */}
      <section id="brew" className="py-32 bg-[#0c0a09]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-32 items-center">
            <div className="lg:col-span-5">
              <Reveal>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-orange-900 mb-6 block">
                  Extraction Physics
                </span>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight mb-12 text-white uppercase italic">
                  Brew <br />{" "}
                  <span className="text-orange-900 not-italic">Logic.</span>
                </h2>
                <p className="text-lg text-white/20 leading-relaxed font-bold mb-16 uppercase tracking-tight italic">
                  Maximize the genetic potential of your beans. Our
                  laboratory-tested protocols ensure peak extraction efficiency.
                </p>

                <div className="space-y-6">
                  {[
                    {
                      label: "Extraction Yield",
                      val: 21.4,
                      suffix: "%",
                      desc: "The sweet spot of soluble solids. Balancing acidity and body.",
                    },
                    {
                      label: "Water Purity",
                      val: 80,
                      suffix: " PPM",
                      desc: "Calibrated mineral content for optimal molecular bonding.",
                    },
                    {
                      label: "Brew Precision",
                      val: 0.1,
                      suffix: " G",
                      desc: "Institutional-grade scaling for every single dose.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="group border-l border-orange-900/20 pl-8 hover:border-orange-900 transition-all"
                    >
                      <h4 className="text-sm font-bold uppercase tracking-tight mb-2 text-white/40">
                        {item.label}
                      </h4>
                      <div className="text-3xl font-black text-orange-900 mb-2 uppercase italic tabular-nums">
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
              <Reveal className="space-y-6">
                {BREW_METHODS.map((m, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-8 bg-white/[0.02] border border-white/5 hover:border-orange-900/40 transition-all rounded-none group cursor-pointer"
                  >
                    <div className="flex items-center gap-8">
                      <div className="w-12 h-12 rounded-full bg-orange-900/10 border border-orange-900/20 flex items-center justify-center text-orange-900 group-hover:bg-orange-900 group-hover:text-white transition-all">
                        <Thermometer className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-xl font-black uppercase text-white italic">
                          {m.name}
                        </h4>
                        <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">
                          Protocol_{i + 1}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-12 text-right">
                      <div>
                        <div className="text-[9px] font-bold text-white/10 uppercase mb-1 tracking-widest">
                          TEMP
                        </div>
                        <div className="text-sm font-black text-orange-900">
                          {m.temp}
                        </div>
                      </div>
                      <div>
                        <div className="text-[9px] font-bold text-white/10 uppercase mb-1 tracking-widest">
                          TIME
                        </div>
                        <div className="text-sm font-black text-orange-900">
                          {m.time}
                        </div>
                      </div>
                      <div>
                        <div className="text-[9px] font-bold text-white/10 uppercase mb-1 tracking-widest">
                          RATIO
                        </div>
                        <div className="text-sm font-black text-orange-900">
                          {m.ratio}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="p-12 bg-orange-900/5 border border-orange-900/20 rounded-none mt-12 text-center">
                  <CupSoda className="w-8 h-8 text-orange-900 mx-auto mb-6" />
                  <h3 className="text-xl font-black uppercase tracking-tight text-white mb-4 italic">
                    Request Custom Profile
                  </h3>
                  <p className="text-[10px] text-white/20 uppercase tracking-widest mb-8 leading-relaxed">
                    Our roasters will calculate a custom brew profile based on
                    your local water hardness and equipment.
                  </p>
                  <button className="px-12 py-4 bg-orange-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-none hover:bg-orange-800 transition-all shadow-xl">
                    CALCULATE_PROFILE
                  </button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          4. STATS (Counters)
          ========================================== */}
      <section className="py-24 bg-[#0c0a09] border-y border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-2 lg:grid-cols-4 gap-16 text-center">
          {[
            { label: "Active_Origins", val: 24, suffix: "" },
            { label: "Monthly_Roasts", val: 1.2, suffix: " T" },
            { label: "Flavor_Compounds", val: 840, suffix: "+" },
            { label: "SCA_Cup_Score", val: 92, suffix: " AVG" },
          ].map((stat, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="text-5xl md:text-7xl font-black text-orange-900 mb-4 italic tabular-nums">
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
      <section id="subscribe" className="py-32 bg-[#0c0a09]">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-none uppercase italic text-white">
              Extraction_Buffer
            </h2>
          </Reveal>

          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                q: "What is your ethical sourcing protocol?",
                a: "We pay on average 3.5x the Fairtrade price directly to producers. Our Aevia Trace OS allows you to see the exact transaction and harvest date for every bag.",
              },
              {
                q: "How do you handle roast consistency?",
                a: "We use Loring Smart Roasters connected to our central AI hub. Every roast is profiled against a molecular benchmark to ensure less than 0.5% variance.",
              },
              {
                q: "Can I manage my subscription frequency?",
                a: "Yes. Our Subscription Portal allows for sub-weekly, weekly, or bi-weekly shipments, with instant 'Pause' or 'Flash' options for high-demand periods.",
              },
              {
                q: "What is the shelf-life of your beans?",
                a: "For peak extraction, we recommend brewing between 7 and 28 days post-roast. Every bag is nitrogen-flushed and shipped in recyclable vacuum-seal units.",
              },
            ].map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b border-white/5"
              >
                <AccordionTrigger className="text-left text-sm uppercase font-bold tracking-widest py-8 hover:text-orange-500 hover:no-underline">
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
                    Artisanal.
                  </span>
                  <span className="text-2xl font-black tracking-tighter uppercase text-white">
                    AETHER<span className="text-orange-900">.ROAST</span>
                  </span>
                </div>
                <p className="text-white/20 max-w-sm mb-12 uppercase tracking-widest text-[10px] font-bold leading-relaxed italic">
                  The infrastructure for the next generation of specialty
                  coffee. Est. 2026. Precision roasted. Globally sourced.
                </p>
                <form
                  className="relative max-w-md"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="email"
                    placeholder="ENROLL_IN_THE_MANIFESTO"
                    className="w-full bg-white/[0.02] border border-white/5 rounded-none px-6 py-4 text-xs font-bold outline-none focus:border-orange-900 text-white transition-all uppercase tracking-widest"
                  />
                  <button
                    type="submit"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-orange-900 hover:text-white transition-colors uppercase tracking-[0.3em]"
                  >
                    ENROLL
                  </button>
                </form>
              </Reveal>
            </div>

            <div className="lg:col-span-2 lg:col-start-7">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-orange-900 mb-10">
                Shop
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/20">
                <li>
                  <Link
                    href="#"
                    className="hover:text-orange-500 transition-colors"
                  >
                    Light_Roasts
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-orange-500 transition-colors"
                  >
                    Medium_Roasts
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-orange-500 transition-colors"
                  >
                    Dark_Roasts
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-orange-500 transition-colors"
                  >
                    Sample_Packs
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-orange-900 mb-10">
                Learn
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/20">
                <li>
                  <Link
                    href="#"
                    className="hover:text-orange-500 transition-colors"
                  >
                    Brew_Guides
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-orange-500 transition-colors"
                  >
                    Origins_Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-orange-500 transition-colors"
                  >
                    Roast_Science
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-orange-500 transition-colors"
                  >
                    Subscription
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-orange-900 mb-10">
                Network
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/20">
                <li>
                  <Link
                    href="#"
                    className="hover:text-orange-500 transition-colors flex items-center gap-3"
                  >
                    <Globe className="w-3 h-3" /> Globe
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-orange-500 transition-colors flex items-center gap-3"
                  >
                    <Globe className="w-3 h-3" /> X_Mission
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-orange-500 transition-colors flex items-center gap-3"
                  >
                    <Mail className="w-3 h-3" /> Contact_Control
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-10 border-t border-white/5 text-[9px] font-bold uppercase tracking-widest text-white/10">
            <div className="flex items-center gap-10">
              <span>
                &copy; {new Date().getFullYear()} AETHER ROASTS Technologies
                Inc.
              </span>
              <Link href="#" className="hover:text-white transition-colors">
                Regulatory_Terms
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Privacy_Buffer
              </Link>
            </div>
            <div className="flex gap-10">
              <span>Addis Ababa // Bogota // Berlin</span>
              <span>In Caffeine We Trust</span>
            </div>
          </div>
        </div>
      </footer>

      {/* BEAN MODAL */}
      <AnimatePresence>
        {activeBean !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/98 backdrop-blur-3xl flex items-center justify-center p-6"
            onClick={() => setActiveBean(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="bg-[#0e0e11] border border-white/10 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 overflow-hidden rounded-none shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveBean(null)}
                className="absolute top-8 right-8 text-white/20 hover:text-orange-900 transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>

              {/* IMAGE AREA */}
              <div className="lg:col-span-8 relative aspect-video lg:aspect-auto bg-black">
                <Image
                  src={BEANS[activeBean].img}
                  alt="Bean"
                  fill
                  className="object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <h3 className="text-4xl font-black text-white italic">
                    {BEANS[activeBean].name}
                  </h3>
                </div>
              </div>

              {/* SIDEBAR AREA */}
              <div className="lg:col-span-4 p-8 flex flex-col justify-between bg-[#0e0e11] border-l border-white/5">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-orange-900 mb-6 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-900" />
                    Roast Profile Technical Sheet
                  </div>
                  <div className="space-y-6 mb-12">
                    {[
                      { label: "Origin", val: BEANS[activeBean].origin },
                      { label: "Process", val: BEANS[activeBean].process },
                      { label: "Roast Level", val: BEANS[activeBean].roast },
                      { label: "SCA Score", val: "91.5" },
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
                  <div className="flex flex-wrap gap-3 mb-10">
                    {BEANS[activeBean].notes.map((n) => (
                      <Badge
                        key={n}
                        className="bg-orange-900/20 text-orange-500 border-none text-[8px] font-black uppercase tracking-widest px-3 py-1"
                      >
                        {n}
                      </Badge>
                    ))}
                  </div>
                </div>

                <button className="w-full py-5 bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-orange-900 hover:text-white transition-all cursor-pointer shadow-xl">
                  ADD_TO_CART_ENVELOPE
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        ::-webkit-scrollbar{width:4px;background:#0c0a09}
        ::-webkit-scrollbar-thumb{background:rgba(124,45,18,0.2)}
      `}</style>
    </div>
  );
}
