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
import { Compass, Layout, Ruler, Hammer, Zap, Globe, Activity, Terminal, Box, Share2, Layers, Maximize, Monitor, MousePointer2, Navigation, Wifi, Shield, ShoppingBag, Search, Star, Mail, Phone, Check, Menu, X, MapPin, Clock, Lock, Plus, Bell, Settings, ArrowRight, ArrowUpRight, ChevronRight, Building2, HardHat, FileText } from "lucide-react";

import "../premium.css";

/* ==========================================================================
   DATA STRUCTURES
   ========================================================================= */

const PROJECTS = [
  {
    id: 1,
    name: "THE_QUARTZ_TOWER",
    location: "Dubai, UAE",
    stats: { height: "420m", units: "210", completion: "2027" },
    img: "https://images.unsplash.com/photo-1545333253-c7bc1ccf9e85?w=1200&q=80",
    desc: "A crystalline structure engineered with active seismic dampening and generative facade optimization.",
  },
  {
    id: 2,
    name: "NEO_HABITAT",
    location: "Berlin, Germany",
    stats: { area: "12,000sqm", units: "85", completion: "2026" },
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
    desc: "Modular timber-hybrid residential complex focused on carbon-negative structural integrity.",
  },
  {
    id: 3,
    name: "AETHER_PLAZA",
    location: "Singapore",
    stats: { height: "180m", offices: "45", completion: "2028" },
    img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1200&q=80",
    desc: "Mixed-use vertical forest utilizing vertical geothermal heating and automated solar tracking.",
  },
];

const SPECS = [
  {
    label: "Structural Integrity",
    val: 99.9,
    suffix: "%",
    desc: "Military-grade reinforcement and real-time stress monitoring.",
  },
  {
    label: "Thermal Efficiency",
    val: 0.12,
    suffix: " U",
    desc: "Triple-glazed molecular glass for absolute temperature control.",
  },
  {
    label: "Seismic Rating",
    val: 9.2,
    suffix: " MAG",
    desc: "Designed to withstand catastrophic geological events.",
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

export default function BlueprintOSPage() {
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
      className="premium-theme min-h-screen bg-[#050507] text-[#e2e8f0] font-mono selection:bg-cyan-900 selection:text-white overflow-x-hidden"
      style={{ scrollBehavior: "smooth" }}
    >
      {/* ==========================================
          NAVIGATION
          ========================================== */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-1000 ${scrolled ? "bg-[#050507]/95 backdrop-blur-xl py-4 border-b border-white/5" : "bg-transparent py-10"}`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="flex flex-col items-start">
            <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-cyan-600/40 mb-1">
              Architectural.
            </span>
            <span className="text-xl md:text-2xl font-black tracking-tighter uppercase text-white">
              BLUEPRINT<span className="text-cyan-900">.DEV</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">
            <Link
              href="#masterplan"
              className="hover:text-cyan-500 transition-colors"
            >
              Masterplan
            </Link>
            <Link
              href="#audit"
              className="hover:text-cyan-500 transition-colors"
            >
              Audit
            </Link>
            <Link
              href="#portfolio"
              className="hover:text-cyan-500 transition-colors"
            >
              Portfolio
            </Link>
            <Link
              href="#investor"
              className="hover:text-cyan-500 transition-colors"
            >
              Investor
            </Link>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden xl:flex flex-col items-end">
              <span className="text-[9px] font-bold text-white/10 uppercase tracking-widest">
                Global Operations
              </span>
              <span className="text-[11px] font-black text-cyan-500 flex items-center gap-1">
                SYSTEMS_GREEN <Activity className="w-3 h-3" />
              </span>
            </div>
            <MagneticBtn className="px-8 py-3 bg-white text-black text-[10px] font-bold uppercase tracking-widest rounded-none hover:bg-cyan-600 hover:text-white transition-all">
              START_AUDIT
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
            className="fixed inset-0 z-[100] bg-[#050507] p-8 pt-32 flex flex-col border-l border-white/5"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-10 right-8 text-stone-500"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="flex flex-col gap-10 text-5xl font-black tracking-tighter uppercase italic text-cyan-900/50">
              <Link href="#masterplan" onClick={() => setMenuOpen(false)}>
                Masterplan
              </Link>
              <Link href="#audit" onClick={() => setMenuOpen(false)}>
                Audit
              </Link>
              <Link href="#portfolio" onClick={() => setMenuOpen(false)}>
                Portfolio
              </Link>
              <Link href="#investor" onClick={() => setMenuOpen(false)}>
                Investor
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==========================================
          1. HERO (Blueprint HUD)
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
            src="https://images.unsplash.com/photo-1545333253-c7bc1ccf9e85?w=1600&q=80"
            alt="Blueprint Hero"
            fill
            className="object-cover brightness-50 contrast-125 grayscale-[0.8]"
            priority
          />
          <div className="absolute inset-0 bg-[#050507]/60 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-transparent" />
        </motion.div>

        {/* BLUEPRINT GRID OVERLAY */}
        <div
          className="absolute inset-0 z-1 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div
          className="absolute inset-0 z-1 pointer-events-none opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "100px 100px",
          }}
        />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full">
          <Reveal>
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-cyan-900/20 rounded-none border border-cyan-900/40 text-cyan-500 text-[10px] font-bold uppercase tracking-widest mb-10 shadow-sm">
              <Compass className="w-3.5 h-3.5" />
              Structural Engineering // Institutional Development
            </div>
            <h1 className="text-7xl md:text-9xl lg:text-[11rem] font-black leading-[0.85] tracking-tighter mb-12 uppercase">
              The Science <br />{" "}
              <span className="text-cyan-900 italic">of Stature.</span>
            </h1>
            <p className="max-w-xl text-lg md:text-xl text-white/20 leading-relaxed font-bold mb-12 uppercase tracking-tight italic">
              Developing the world's most resilient architectural assets. From
              molecular material science to vertical habitability.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <MagneticBtn className="px-12 py-5 bg-white text-black text-[10px] font-bold uppercase tracking-[0.4em] rounded-none hover:bg-cyan-900 hover:text-white transition-all cursor-pointer shadow-2xl">
                Analyze Portfolio
              </MagneticBtn>
              <button className="px-12 py-5 border border-white/10 text-white text-[10px] font-bold uppercase tracking-[0.4em] rounded-none hover:bg-white hover:text-black transition-all cursor-pointer">
                Technical_Audit_Log
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
              AEVIA_BLUEPRINT_SYS // NODE_082
            </span>
            <div className="w-32 h-[1px] bg-cyan-900/40" />
          </div>
        </motion.div>
      </section>

      {/* ==========================================
          2. THE MASTERPLAN (Portfolio Grid)
          ========================================== */}
      <section
        id="portfolio"
        className="py-32 bg-[#050507] border-y border-white/5"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
            <Reveal>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9] text-white">
                Active <br />{" "}
                <span className="text-cyan-900 italic">Manifests.</span>
              </h2>
            </Reveal>
            <p className="max-w-sm text-sm text-white/10 leading-relaxed font-bold uppercase tracking-widest italic text-right">
              Our active construction manifests. Each project is a structural
              evolution in urban resilience and vertical luxury.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.1}>
                <div
                  onClick={() => setActiveProject(i)}
                  className="group cursor-pointer bg-white/[0.01] border border-white/5 hover:border-cyan-900/40 transition-all rounded-none p-8 shadow-sm h-full flex flex-col justify-between overflow-hidden"
                >
                  <div>
                    <div className="relative aspect-[4/5] mb-10 overflow-hidden">
                      <Image
                        src={p.img}
                        alt={p.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-1000 grayscale-[0.8] group-hover:grayscale-0"
                      />
                      <div className="absolute inset-0 bg-cyan-900/10 mix-blend-overlay" />
                      <div className="absolute top-6 left-6">
                        <Badge className="bg-cyan-900 text-white border-none text-[8px] font-black tracking-widest uppercase px-3 py-1">
                          IN_DEVELOPMENT
                        </Badge>
                      </div>
                    </div>
                    <h3 className="text-2xl font-black uppercase tracking-tighter text-white italic mb-4">
                      {p.name}
                    </h3>
                    <div className="text-[10px] font-black text-cyan-900 uppercase tracking-widest mb-6">
                      {p.location}
                    </div>
                    <p className="text-[10px] text-white/20 leading-relaxed font-bold uppercase tracking-widest mb-10 italic">
                      {p.desc}
                    </p>
                  </div>
                  <button className="flex items-center gap-4 text-[9px] font-black uppercase tracking-widest text-stone-500 group-hover:text-white transition-colors">
                    OPEN_TECHNICAL_SHEET <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          3. STRUCTURAL AUDIT (Interactive Stats)
          ========================================== */}
      <section id="audit" className="py-32 bg-[#050507]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-32 items-center">
            <div className="lg:col-span-5">
              <Reveal>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-cyan-900 mb-6 block">
                  Material Audit
                </span>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight mb-12 text-white uppercase italic">
                  Structural <br />{" "}
                  <span className="text-cyan-900 not-italic">Integrity.</span>
                </h2>
                <p className="text-lg text-white/20 leading-relaxed font-bold mb-16 uppercase tracking-tight italic">
                  We don't build buildings; we engineer geological constants.
                  Every Blueprint project undergoes a 4-phase molecular stress
                  audit.
                </p>

                <div className="space-y-6">
                  {SPECS.map((item, i) => (
                    <div
                      key={i}
                      className="group border-l border-cyan-900/20 pl-8 hover:border-cyan-900 transition-all"
                    >
                      <h4 className="text-sm font-bold uppercase tracking-tight mb-2 text-white/40">
                        {item.label}
                      </h4>
                      <div className="text-3xl font-black text-cyan-900 mb-2 uppercase italic tabular-nums">
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
                    title: "FOUNDATION_SYNC",
                    icon: <Layers className="w-6 h-6" />,
                  },
                  {
                    title: "FACADE_DYNAMICS",
                    icon: <Layout className="w-6 h-6" />,
                  },
                  {
                    title: "THERMAL_SHIELD",
                    icon: <Shield className="w-6 h-6" />,
                  },
                  {
                    title: "ENERGY_RECLAMATION",
                    icon: <Zap className="w-6 h-6" />,
                  },
                ].map((t, i) => (
                  <div
                    key={i}
                    className="p-12 bg-white/[0.02] border border-white/5 rounded-none hover:border-cyan-900 transition-all group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-cyan-900/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="text-cyan-900 mb-8">{t.icon}</div>
                    <h4 className="text-xl font-black uppercase text-white italic mb-4">
                      {t.title}
                    </h4>
                    <div className="h-1 w-0 bg-cyan-900 group-hover:w-full transition-all duration-700" />
                  </div>
                ))}
                <div className="md:col-span-2 p-12 bg-cyan-900/5 border border-cyan-900/20 rounded-none mt-4 text-center">
                  <HardHat className="w-8 h-8 text-cyan-900 mx-auto mb-6" />
                  <h3 className="text-xl font-black uppercase tracking-tight text-white mb-4 italic">
                    Institutional Safety Protocol
                  </h3>
                  <p className="text-[10px] text-white/20 uppercase tracking-widest mb-8 leading-relaxed">
                    All Blueprint developments exceed International Building
                    Code (IBC) standards by a minimum of 40% across all
                    structural metrics.
                  </p>
                  <button className="px-12 py-4 bg-cyan-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-none hover:bg-cyan-800 transition-all shadow-xl">
                    DOWNLOAD_SAFETY_REPORT
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
      <section className="py-24 bg-[#050507] border-y border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-2 lg:grid-cols-4 gap-16 text-center">
          {[
            { label: "Developed_SQM", val: 850, suffix: "K" },
            { label: "Global_Assets", val: 42, suffix: "" },
            { label: "Engineering_Awards", val: 124, suffix: "" },
            { label: "Portfolio_Value", val: 8.4, suffix: " B" },
          ].map((stat, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="text-5xl md:text-7xl font-black text-cyan-900 mb-4 italic tabular-nums">
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
      <section id="investor" className="py-32 bg-[#050507]">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-none uppercase italic text-white">
              Investor_Buffer
            </h2>
          </Reveal>

          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                q: "What is your acquisition strategy?",
                a: "We focus exclusively on ultra-prime urban nodes with high geological stability and long-term appreciation potential. Every acquisition is backed by an 18-month institutional audit.",
              },
              {
                q: "How do you ensure construction transparency?",
                a: "Investors gain 24/7 access to our 'Blueprint Portal', providing real-time HD site feeds, BIM model progress tracking, and detailed material expenditure audits.",
              },
              {
                q: "What are your sustainability benchmarks?",
                a: "All Blueprint projects must achieve LEED Platinum and WELL Platinum certification. We integrate proprietary vertical geothermal systems and carbon-capture facades as standard.",
              },
              {
                q: "Do you offer private residential opportunities?",
                a: "Yes. Our vertical residential towers offer a limited number of 'Bespoke Units' which can be molecularly customized by the owner during the shell-and-core phase.",
              },
            ].map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b border-white/5"
              >
                <AccordionTrigger className="text-left text-sm uppercase font-bold tracking-widest py-8 hover:text-cyan-500 hover:no-underline">
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
      <footer className="bg-[#030305] pt-32 pb-12 px-6 md:px-12 border-t border-white/5 relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-32">
            <div className="lg:col-span-5">
              <Reveal>
                <div className="flex flex-col mb-10">
                  <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-white/20 mb-1">
                    Architectural.
                  </span>
                  <span className="text-2xl font-black tracking-tighter uppercase text-white">
                    BLUEPRINT<span className="text-cyan-900">.DEV</span>
                  </span>
                </div>
                <p className="text-white/20 max-w-sm mb-12 uppercase tracking-widest text-[10px] font-bold leading-relaxed italic">
                  The infrastructure for the next generation of urban
                  resilience. Est. 2026. Precision engineered. Globally
                  deployed.
                </p>
                <form
                  className="relative max-w-md"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="email"
                    placeholder="ACCESS_THE_MANIFESTO"
                    className="w-full bg-white/[0.02] border border-white/5 rounded-none px-6 py-4 text-xs font-bold outline-none focus:border-cyan-900 text-white transition-all uppercase tracking-widest"
                  />
                  <button
                    type="submit"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-cyan-900 hover:text-white transition-colors uppercase tracking-[0.3em]"
                  >
                    ACCESS
                  </button>
                </form>
              </Reveal>
            </div>

            <div className="lg:col-span-2 lg:col-start-7">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-cyan-900 mb-10">
                Portfolio
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/20">
                <li>
                  <Link
                    href="#"
                    className="hover:text-cyan-500 transition-colors"
                  >
                    Residential_Towers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-cyan-500 transition-colors"
                  >
                    Office_Manifests
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-cyan-500 transition-colors"
                  >
                    Mixed_Use_Nodes
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-cyan-500 transition-colors"
                  >
                    Resilience_Labs
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-cyan-900 mb-10">
                Institutional
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/20">
                <li>
                  <Link
                    href="#"
                    className="hover:text-cyan-500 transition-colors"
                  >
                    Investor_Portal
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-cyan-500 transition-colors"
                  >
                    Safety_Audits
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-cyan-500 transition-colors"
                  >
                    Sustainability
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-cyan-500 transition-colors"
                  >
                    Headquarters
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-cyan-900 mb-10">
                Network
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/20">
                <li>
                  <Link
                    href="#"
                    className="hover:text-cyan-500 transition-colors flex items-center gap-3"
                  >
                    <Globe className="w-3 h-3" /> Globe
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-cyan-500 transition-colors flex items-center gap-3"
                  >
                    <Globe className="w-3 h-3" /> X_Mission
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-cyan-500 transition-colors flex items-center gap-3"
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
                &copy; {new Date().getFullYear()} BLUEPRINT DEVELOPMENTS Group.
              </span>
              <Link href="#" className="hover:text-white transition-colors">
                Regulatory_Terms
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Privacy_Buffer
              </Link>
            </div>
            <div className="flex gap-10">
              <span>Dubai // Singapore // London</span>
              <span>In Structure We Trust</span>
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
                className="absolute top-8 right-8 text-white/20 hover:text-cyan-900 transition-colors z-10"
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
                    {PROJECTS[activeProject].name}
                  </h3>
                </div>
              </div>

              {/* SIDEBAR AREA */}
              <div className="lg:col-span-4 p-8 flex flex-col justify-between bg-[#0e0e11] border-l border-white/5">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-cyan-900 mb-6 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-900" />
                    Institutional Asset Specification
                  </div>
                  <div className="space-y-6 mb-12">
                    {Object.entries(PROJECTS[activeProject].stats).map(
                      ([key, val], i) => (
                        <div
                          key={i}
                          className="flex justify-between items-center border-b border-white/5 pb-4"
                        >
                          <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">
                            {key}
                          </span>
                          <span className="text-[10px] font-black text-white uppercase italic">
                            {val}
                          </span>
                        </div>
                      ),
                    )}
                  </div>
                  <p className="text-xs text-white/40 leading-relaxed font-bold uppercase tracking-tight italic mb-10">
                    {PROJECTS[activeProject].desc}
                  </p>
                </div>

                <button className="w-full py-5 bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-cyan-900 hover:text-white transition-all cursor-pointer shadow-xl">
                  REQUEST_INVESTOR_PACK
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        ::-webkit-scrollbar{width:4px;background:#050507}
        ::-webkit-scrollbar-thumb{background:rgba(8,145,178,0.2)}
      `}</style>
    </div>
  );
}
