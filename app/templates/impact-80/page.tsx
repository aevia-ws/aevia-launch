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
import { Droplets, Waves, Zap, Flame, Globe, Activity, Terminal, Box, Share2, Layers, Maximize, Monitor, MousePointer2, Navigation, Wifi, Shield, ShoppingBag, Search, Star, Mail, Phone, Check, Menu, X, MapPin, Clock, Lock, Plus, Bell, Settings, ArrowRight, ArrowUpRight, ChevronRight, Sparkles, Wand2 } from "lucide-react";

import "../premium.css";

/* ==========================================================================
   DATA STRUCTURES
   ========================================================================= */

const PROJECTS = [
  {
    id: 1,
    title: "FLUID_IDENTITY",
    category: "Branding",
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80",
    desc: "A visceral visual identity system built on fluid dynamics and organic interpolation.",
  },
  {
    id: 2,
    title: "LIQUID_OS",
    category: "Interface",
    img: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?w=1200&q=80",
    desc: "Experimental operating system concept utilizing gooey SVG filters for all UI transitions.",
  },
  {
    id: 3,
    title: "MOLTEN_TYPE",
    category: "Typography",
    img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1200&q=80",
    desc: "Variable typeface system that reacts to real-time sonic inputs and ambient noise.",
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

function LiquidTrail() {
  const [points, setPoints] = useState<{ x: number; y: number; id: number }[]>(
    [],
  );
  const nextId = useRef(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const newPoint = { x: e.clientX, y: e.clientY, id: nextId.current++ };
    setPoints((prev) => [...prev.slice(-15), newPoint]);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden mix-blend-difference filter url(#goo)">
      <svg className="hidden">
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="15"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -15"
              result="goo"
            />
          </filter>
        </defs>
      </svg>
      {points.map((p, i) => (
        <motion.div
          key={p.id}
          initial={{ scale: 1, opacity: 0.8 }}
          animate={{ scale: 0, opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute w-20 h-20 bg-rose-600 rounded-full"
          style={{ left: p.x - 40, top: p.y - 40 }}
        />
      ))}
    </div>
  );
}

/* ==========================================================================
   MAIN PAGE COMPONENT
   ========================================================================= */

export default function LavaOSPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<number | null>(null);

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
      className="premium-theme min-h-screen bg-[#080808] text-[#f8fafc] font-mono selection:bg-rose-600 selection:text-white overflow-x-hidden"
      style={{ scrollBehavior: "smooth" }}
    >
      <LiquidTrail />

      {/* ==========================================
          NAVIGATION
          ========================================== */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-1000 ${scrolled ? "bg-black/95 backdrop-blur-xl py-4 border-b border-white/5" : "bg-transparent py-10"}`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="flex flex-col items-start">
            <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-rose-600/40 mb-1">
              Visceral.
            </span>
            <span className="text-xl md:text-2xl font-black tracking-tighter uppercase text-white">
              LAVA<span className="text-rose-900">.OS</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">
            <Link
              href="#fluid"
              className="hover:text-rose-500 transition-colors"
            >
              Fluid
            </Link>
            <Link
              href="#molten"
              className="hover:text-rose-500 transition-colors"
            >
              Molten
            </Link>
            <Link
              href="#visceral"
              className="hover:text-rose-500 transition-colors"
            >
              Visceral
            </Link>
            <Link
              href="#protocol"
              className="hover:text-rose-500 transition-colors"
            >
              Protocol
            </Link>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden xl:flex flex-col items-end">
              <span className="text-[9px] font-bold text-white/10 uppercase tracking-widest">
                Molecular Rendering
              </span>
              <span className="text-[11px] font-black text-rose-500 flex items-center gap-1">
                FLOW_ACTIVE <Activity className="w-3 h-3" />
              </span>
            </div>
            <MagneticBtn className="px-8 py-3 bg-white text-black text-[10px] font-bold uppercase tracking-widest rounded-none hover:bg-rose-600 hover:text-white transition-all">
              START_FLOW
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
            className="fixed inset-0 z-[100] bg-black p-8 pt-32 flex flex-col border-l border-white/5"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-10 right-8 text-stone-500"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="flex flex-col gap-10 text-5xl font-black tracking-tighter uppercase italic text-rose-900/50">
              <Link href="#fluid" onClick={() => setMenuOpen(false)}>
                Fluid
              </Link>
              <Link href="#molten" onClick={() => setMenuOpen(false)}>
                Molten
              </Link>
              <Link href="#visceral" onClick={() => setMenuOpen(false)}>
                Visceral
              </Link>
              <Link href="#protocol" onClick={() => setMenuOpen(false)}>
                Protocol
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==========================================
          1. HERO (Liquid Motion)
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
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&q=80"
            alt="Lava Hero"
            fill
            className="object-cover brightness-50 contrast-125 grayscale-[0.3]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
        </motion.div>

        {/* DISTORTION FILTER HUD */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none opacity-20">
          <svg width="100%" height="100%">
            <filter id="displacementFilter">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.01"
                numOctaves="3"
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="50"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
            <motion.circle
              animate={{ r: [300, 320, 300] }}
              transition={{ duration: 5, repeat: Infinity }}
              cx="50%"
              cy="50%"
              r="300"
              fill="none"
              stroke="white"
              strokeWidth="1"
              filter="url(#displacementFilter)"
            />
          </svg>
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full">
          <Reveal>
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-rose-900/20 rounded-none border border-rose-900/40 text-rose-500 text-[10px] font-bold uppercase tracking-widest mb-10 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              Experimental Design // Liquid Motion Systems
            </div>
            <h1 className="text-7xl md:text-9xl lg:text-[11rem] font-black leading-[0.85] tracking-tighter mb-12 uppercase">
              Visceral <br />{" "}
              <span className="text-rose-900 italic">Distortion.</span>
            </h1>
            <p className="max-w-xl text-lg md:text-xl text-white/20 leading-relaxed font-bold mb-12 uppercase tracking-tight italic">
              Creative studio specialized in high-fidelity liquid interaction.
              We build digital surfaces that breathe, bleed, and bond.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <MagneticBtn className="px-12 py-5 bg-white text-black text-[10px] font-bold uppercase tracking-[0.4em] rounded-none hover:bg-rose-900 hover:text-white transition-all cursor-pointer shadow-2xl">
                Analyze Projects
              </MagneticBtn>
              <button className="px-12 py-5 border border-white/10 text-white text-[10px] font-bold uppercase tracking-[0.4em] rounded-none hover:bg-white hover:text-black transition-all cursor-pointer">
                Technical_Flow_Log
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
              AEVIA_LAVA_OS // KERNEL_080
            </span>
            <div className="w-32 h-[1px] bg-rose-900/40" />
          </div>
        </motion.div>
      </section>

      {/* ==========================================
          2. FLUID PROJECTS (Grid)
          ========================================== */}
      <section
        id="fluid"
        className="py-32 bg-[#080808] border-y border-white/5"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
            <Reveal>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9] text-white">
                Fluid <br />{" "}
                <span className="text-rose-900 italic">Archive.</span>
              </h2>
            </Reveal>
            <p className="max-w-sm text-sm text-white/10 leading-relaxed font-bold uppercase tracking-widest italic text-right">
              A non-exhaustive list of our molecular explorations. Pushing
              interfaces to their absolute liquid limit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.1}>
                <div
                  onClick={() => setActiveProject(i)}
                  className="group cursor-pointer bg-white/[0.01] border border-white/5 hover:border-rose-900/40 transition-all rounded-none p-8 shadow-sm h-full flex flex-col justify-between overflow-hidden"
                >
                  <div>
                    <div className="relative aspect-video mb-10 overflow-hidden">
                      <Image
                        src={p.img}
                        alt={p.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-1000 grayscale-[0.3] group-hover:grayscale-0"
                      />
                      <div className="absolute inset-0 bg-rose-900/10 mix-blend-overlay" />
                      <div className="absolute top-6 left-6">
                        <Badge className="bg-rose-900 text-white border-none text-[8px] font-black tracking-widest uppercase px-3 py-1">
                          {p.category}
                        </Badge>
                      </div>
                    </div>
                    <h3 className="text-2xl font-black uppercase tracking-tighter text-white italic mb-4">
                      {p.title}
                    </h3>
                    <p className="text-[10px] text-white/20 leading-relaxed font-bold uppercase tracking-widest mb-10 italic">
                      {p.desc}
                    </p>
                  </div>
                  <button className="flex items-center gap-4 text-[9px] font-black uppercase tracking-widest text-stone-500 group-hover:text-white transition-colors">
                    INITIALIZE_SCAN <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          3. VISCERAL UI (Gooey Components)
          ========================================== */}
      <section id="visceral" className="py-32 bg-[#080808]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-32 items-center">
            <div className="lg:col-span-5">
              <Reveal>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-rose-900 mb-6 block">
                  Surface Tension Logic
                </span>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight mb-12 text-white uppercase italic">
                  Visceral <br />{" "}
                  <span className="text-rose-900 not-italic">UI.</span>
                </h2>
                <p className="text-lg text-white/20 leading-relaxed font-bold mb-16 uppercase tracking-tight italic">
                  Interfaces should feel alive. Our 'Lava' protocol utilizes
                  organic interpolation to create components that bond and
                  react.
                </p>

                <div className="space-y-6">
                  {[
                    {
                      label: "Viscosity Index",
                      val: 0.85,
                      suffix: "",
                      desc: "Simulated liquid density for UI element bonding.",
                    },
                    {
                      label: "Bonding Latency",
                      val: 12,
                      suffix: " MS",
                      desc: "Ultra-low latency rendering for real-time visceral feedback.",
                    },
                    {
                      label: "Molecular Nodes",
                      val: 4096,
                      suffix: "",
                      desc: "Individual particles tracked per interaction session.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="group border-l border-rose-900/20 pl-8 hover:border-rose-900 transition-all"
                    >
                      <h4 className="text-sm font-bold uppercase tracking-tight mb-2 text-white/40">
                        {item.label}
                      </h4>
                      <div className="text-3xl font-black text-rose-900 mb-2 uppercase italic tabular-nums">
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
              <Reveal className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    title: "MOLTEN_NAV",
                    icon: <Navigation className="w-6 h-6" />,
                  },
                  {
                    title: "GLOW_SENSORS",
                    icon: <Activity className="w-6 h-6" />,
                  },
                  {
                    title: "DROP_BUFFERS",
                    icon: <Droplets className="w-6 h-6" />,
                  },
                  { title: "PULSE_SYNC", icon: <Zap className="w-6 h-6" /> },
                ].map((t, i) => (
                  <div
                    key={i}
                    className="p-12 bg-white/[0.02] border border-white/5 rounded-none hover:border-rose-900 transition-all group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-rose-900/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="text-rose-900 mb-8">{t.icon}</div>
                    <h4 className="text-xl font-black uppercase text-white italic mb-4">
                      {t.title}
                    </h4>
                    <div className="h-1 w-0 bg-rose-900 group-hover:w-full transition-all duration-700" />
                  </div>
                ))}
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          4. STATS (Counters)
          ========================================== */}
      <section className="py-24 bg-[#080808] border-y border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-2 lg:grid-cols-4 gap-16 text-center">
          {[
            { label: "Visceral_Projects", val: 124, suffix: "" },
            { label: "Molecular_Renders", val: 42, suffix: "K" },
            { label: "Protocol_Awards", val: 18, suffix: "" },
            { label: "Entropy_Rating", val: 99.8, suffix: "%" },
          ].map((stat, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="text-5xl md:text-7xl font-black text-rose-900 mb-4 italic tabular-nums">
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
      <section id="protocol" className="py-32 bg-[#080808]">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-none uppercase italic text-white">
              Flow_Buffer
            </h2>
          </Reveal>

          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                q: "What defines 'Visceral Design' at Lava?",
                a: "Visceral design is our commitment to digital textures that feel physical. We utilize advanced SVG filters and custom-physics engines to create UI that reacts like liquid matter.",
              },
              {
                q: "How do you handle performance with complex filters?",
                a: "Our proprietary 'Entropy-Sync' engine offloads molecular calculations to the GPU, ensuring consistent 60FPS even with thousands of active bonding nodes.",
              },
              {
                q: "Can Lava OS be integrated into existing SaaS?",
                a: "Yes. Our protocol is built on a modular 'Lava Kernel' that can be injected into any modern web architecture as a stylistic layer or core UI system.",
              },
              {
                q: "What is your project initialization timeline?",
                a: "Standard discovery and molecular auditing take 4-6 weeks. Full implementation of a custom visceral identity typically ranges from 3 to 5 months.",
              },
            ].map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b border-white/5"
              >
                <AccordionTrigger className="text-left text-sm uppercase font-bold tracking-widest py-8 hover:text-rose-600 hover:no-underline">
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
      <footer className="bg-[#050505] pt-32 pb-12 px-6 md:px-12 border-t border-white/5 relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-32">
            <div className="lg:col-span-5">
              <Reveal>
                <div className="flex flex-col mb-10">
                  <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-white/20 mb-1">
                    Visceral.
                  </span>
                  <span className="text-2xl font-black tracking-tighter uppercase text-white">
                    LAVA<span className="text-rose-900">.OS</span>
                  </span>
                </div>
                <p className="text-white/20 max-w-sm mb-12 uppercase tracking-widest text-[10px] font-bold leading-relaxed italic">
                  The infrastructure for the next generation of creative
                  interaction. Est. 2026. Precision distilled. Molecularly
                  bonded.
                </p>
                <form
                  className="relative max-w-md"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="email"
                    placeholder="ENROLL_IN_THE_FLOW"
                    className="w-full bg-white/[0.02] border border-white/5 rounded-none px-6 py-4 text-xs font-bold outline-none focus:border-rose-900 text-white transition-all uppercase tracking-widest"
                  />
                  <button
                    type="submit"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-rose-900 hover:text-white transition-colors uppercase tracking-[0.3em]"
                  >
                    ENROLL
                  </button>
                </form>
              </Reveal>
            </div>

            <div className="lg:col-span-2 lg:col-start-7">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-rose-900 mb-10">
                Projects
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/20">
                <li>
                  <Link
                    href="#"
                    className="hover:text-rose-500 transition-colors"
                  >
                    Fluid_Identity
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-rose-500 transition-colors"
                  >
                    Molten_Type
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-rose-500 transition-colors"
                  >
                    Visceral_Web
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-rose-500 transition-colors"
                  >
                    Entropy_Labs
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-rose-900 mb-10">
                Protocol
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/20">
                <li>
                  <Link
                    href="#"
                    className="hover:text-rose-500 transition-colors"
                  >
                    Bonding_Logic
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-rose-500 transition-colors"
                  >
                    Molecular_Audit
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-rose-500 transition-colors"
                  >
                    Bespoke_Flows
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-rose-500 transition-colors"
                  >
                    Concierge
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-rose-900 mb-10">
                Network
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/20">
                <li>
                  <Link
                    href="#"
                    className="hover:text-rose-500 transition-colors flex items-center gap-3"
                  >
                    <Globe className="w-3 h-3" /> Globe
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-rose-500 transition-colors flex items-center gap-3"
                  >
                    <Globe className="w-3 h-3" /> X_Entropy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-rose-500 transition-colors flex items-center gap-3"
                  >
                    <Mail className="w-3 h-3" /> Headquarters
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-10 border-t border-white/5 text-[9px] font-bold uppercase tracking-widest text-white/10">
            <div className="flex items-center gap-10">
              <span>
                &copy; {new Date().getFullYear()} LAVA OS Creative Ltd.
              </span>
              <Link href="#" className="hover:text-white transition-colors">
                Regulatory_Terms
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Privacy_Buffer
              </Link>
            </div>
            <div className="flex gap-10">
              <span>London // Berlin // Tokyo</span>
              <span>In Entropy We Trust</span>
            </div>
          </div>
        </div>
      </footer>

      {/* PROJECT MODAL */}
      <AnimatePresence>
        {activeProject !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/98 backdrop-blur-3xl flex items-center justify-center p-6"
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="bg-[#0e0e11] border border-white/10 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 overflow-hidden rounded-none shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-8 right-8 text-white/20 hover:text-rose-900 transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>

              {/* IMAGE AREA */}
              <div className="lg:col-span-8 relative aspect-video lg:aspect-auto bg-black">
                <Image
                  src={PROJECTS[activeProject].img}
                  alt="Project"
                  fill
                  className="object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <h3 className="text-4xl font-black text-white italic">
                    {PROJECTS[activeProject].title}
                  </h3>
                </div>
              </div>

              {/* SIDEBAR AREA */}
              <div className="lg:col-span-4 p-8 flex flex-col justify-between bg-[#0e0e11] border-l border-white/5">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-rose-900 mb-6 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-rose-900" />
                    Molecular Rendering Report
                  </div>
                  <div className="space-y-6 mb-12">
                    {[
                      {
                        label: "Category",
                        val: PROJECTS[activeProject].category,
                      },
                      { label: "Entropy Rating", val: "99.2%" },
                      { label: "Rendering", val: "Visceral-X3" },
                      { label: "Status", val: "LIVE_BOND" },
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
                    {PROJECTS[activeProject].desc}
                  </p>
                </div>

                <button className="w-full py-5 bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-rose-900 hover:text-white transition-all cursor-pointer shadow-xl">
                  INITIALIZE_FULL_SCAN
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        ::-webkit-scrollbar{width:4px;background:#080808}
        ::-webkit-scrollbar-thumb{background:rgba(225,29,72,0.2)}
      `}</style>
    </div>
  );
}
