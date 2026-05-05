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
import { Sparkles, Wand2, Zap, Globe, Activity, Terminal, Box, Share2, Layers, Maximize, Monitor, MousePointer2, Navigation, Wifi, Shield, ShoppingBag, Search, Star, Mail, Phone, Check, Menu, X, MapPin, Clock, Lock, Plus, Bell, Settings, ArrowRight, ArrowUpRight, ChevronRight, Eye, PenTool, FlaskConical, Droplets, HeartPulse, Microscope } from "lucide-react";

import "../premium.css";

/* ==========================================================================
   DATA STRUCTURES
   ========================================================================= */

const FORMULATIONS = [
  {
    id: 1,
    name: "AETHER_SERUM_V1",
    category: "Cellular Regeneration",
    molecularWeight: "4.5kDa",
    img: "https://images.unsplash.com/photo-1620916566398-39f1143f2c08?w=1200&q=80",
    desc: "A high-potency complex featuring 15% pure Vitamin C and bio-identical growth factors.",
  },
  {
    id: 2,
    name: "HYDRA_CORE_FLUID",
    category: "Deep Hydration",
    molecularWeight: "1.2kDa",
    img: "https://images.unsplash.com/photo-1556229167-da31d2394f0a?w=1200&q=80",
    desc: "Utilizing cross-linked hyaluronic acid for sustained moisture release across all dermal layers.",
  },
  {
    id: 3,
    name: "NIGHT_RETINOL_B2",
    category: "Structural Repair",
    molecularWeight: "8.9kDa",
    img: "https://images.unsplash.com/photo-1594465919760-441fe5908ab0?w=1200&q=80",
    desc: "Encapsulated retinol system designed for zero-irritation collagen synthesis stimulation.",
  },
];

const CLINICAL_OUTCOMES = [
  { metric: "Elasticity Increase", val: 84, suffix: "%", delay: 0 },
  { metric: "Luminosity Index", val: 92, suffix: "/100", delay: 0.1 },
  { metric: "Fine Line Reduction", val: 67, suffix: "%", delay: 0.2 },
  { metric: "Barrier Strength", val: 120, suffix: "%", delay: 0.3 },
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

export default function SkincareLabPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFormulation, setActiveFormulation] = useState<number | null>(
    null,
  );

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
      className="premium-theme min-h-screen bg-[#fafafa] text-[#111111] font-sans selection:bg-slate-900 selection:text-white overflow-x-hidden"
      style={{ scrollBehavior: "smooth" }}
    >
      {/* ==========================================
          NAVIGATION
          ========================================== */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-1000 ${scrolled ? "bg-white/95 backdrop-blur-xl py-4 border-b border-black/5" : "bg-transparent py-10"}`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="flex flex-col items-start">
            <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-slate-400 mb-1">
              Laboratory.
            </span>
            <span className="text-xl md:text-2xl font-black tracking-tighter uppercase text-black">
              AETHER<span className="text-slate-300">.LABS</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-black/30">
            <Link
              href="#archive"
              className="hover:text-black transition-colors"
            >
              Archive
            </Link>
            <Link
              href="#clinical"
              className="hover:text-black transition-colors"
            >
              Clinical
            </Link>
            <Link
              href="#formulation"
              className="hover:text-black transition-colors"
            >
              Formulation
            </Link>
            <Link
              href="#concierge"
              className="hover:text-black transition-colors"
            >
              Concierge
            </Link>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden xl:flex flex-col items-end">
              <span className="text-[9px] font-bold text-black/10 uppercase tracking-widest">
                Molecular Science // Est. 2026
              </span>
              <span className="text-[11px] font-black text-slate-800 flex items-center gap-1">
                LAB_VERIFIED <FlaskConical className="w-3 h-3" />
              </span>
            </div>
            <MagneticBtn className="px-8 py-3 bg-black text-white text-[10px] font-bold uppercase tracking-widest rounded-none hover:bg-slate-800 transition-all shadow-xl">
              SHOP_COLLECTION
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
              className="absolute top-10 right-8 text-stone-500"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="flex flex-col gap-10 text-5xl font-black tracking-tighter uppercase italic text-slate-100">
              <Link href="#archive" onClick={() => setMenuOpen(false)}>
                Archive
              </Link>
              <Link href="#clinical" onClick={() => setMenuOpen(false)}>
                Clinical
              </Link>
              <Link href="#formulation" onClick={() => setMenuOpen(false)}>
                Formulation
              </Link>
              <Link href="#concierge" onClick={() => setMenuOpen(false)}>
                Concierge
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==========================================
          1. HERO (Cinematic Reveal)
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
            src="https://images.unsplash.com/photo-1620916566398-39f1143f2c08?w=1600&q=80"
            alt="Lab Hero"
            fill
            className="object-cover grayscale-[0.5] contrast-110 brightness-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#fafafa] via-transparent to-transparent" />
        </motion.div>

        {/* SOFT SLATE GLOW */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-slate-200/30 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full">
          <Reveal>
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white rounded-none border border-black/5 text-slate-800 text-[10px] font-bold uppercase tracking-widest mb-10 shadow-sm">
              <Microscope className="w-3.5 h-3.5" />
              Pure Molecular Infrastructure // Clinically Verified
            </div>
            <h1 className="text-7xl md:text-9xl lg:text-[11rem] font-black leading-[0.85] tracking-tighter mb-12 uppercase">
              The Serum <br />{" "}
              <span className="text-slate-300 italic">of Origin.</span>
            </h1>
            <p className="max-w-xl text-lg md:text-xl text-black/20 leading-relaxed font-bold mb-12 uppercase tracking-tight italic">
              Mastering the molecular architecture of luminosity. Advanced
              skincare engineered for cellular synchronization.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <MagneticBtn className="px-12 py-5 bg-black text-white text-[10px] font-bold uppercase tracking-[0.4em] rounded-none hover:bg-slate-800 transition-all cursor-pointer shadow-2xl">
                Explore Lab Archive
              </MagneticBtn>
              <button className="px-12 py-5 border border-black/10 text-black text-[10px] font-bold uppercase tracking-[0.4em] rounded-none hover:bg-black hover:text-white transition-all cursor-pointer">
                Molecular_Audit
              </button>
            </div>
          </Reveal>
        </div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute bottom-10 left-12 hidden md:block"
        >
          <div className="flex flex-col items-start gap-3">
            <span className="text-[9px] font-bold text-black/10 uppercase tracking-[0.5em]">
              AETHER_LABS_SYS // CORE_085
            </span>
            <div className="w-32 h-[1px] bg-slate-200" />
          </div>
        </motion.div>
      </section>

      {/* ==========================================
          2. THE ARCHIVE (Product Grid)
          ========================================== */}
      <section
        id="archive"
        className="py-32 bg-[#fafafa] border-y border-black/5"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
            <Reveal>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9] text-black">
                Lab <br />{" "}
                <span className="text-slate-300 italic">Archive.</span>
              </h2>
            </Reveal>
            <p className="max-w-sm text-sm text-black/20 leading-relaxed font-bold uppercase tracking-widest italic text-right">
              Our active formulation directory. Each product represents a
              milestone in molecular skin engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {FORMULATIONS.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.1}>
                <div
                  onClick={() => setActiveFormulation(i)}
                  className="group cursor-pointer bg-white border border-black/5 hover:border-black transition-all rounded-none p-8 shadow-sm h-full flex flex-col justify-between overflow-hidden"
                >
                  <div>
                    <div className="relative aspect-[4/5] mb-10 overflow-hidden">
                      <Image
                        src={p.img}
                        alt={p.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-1000 grayscale-[0.2] group-hover:grayscale-0"
                      />
                      <div className="absolute inset-0 bg-slate-100/10 mix-blend-overlay" />
                      <div className="absolute top-6 left-6">
                        <Badge className="bg-black text-white border-none text-[8px] font-black tracking-widest uppercase px-3 py-1">
                          {p.molecularWeight}
                        </Badge>
                      </div>
                    </div>
                    <h3 className="text-2xl font-black uppercase tracking-tighter text-black italic mb-4">
                      {p.name}
                    </h3>
                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">
                      {p.category}
                    </div>
                    <p className="text-[10px] text-black/30 leading-relaxed font-bold uppercase tracking-widest mb-10 italic">
                      {p.desc}
                    </p>
                  </div>
                  <button className="flex items-center gap-4 text-[9px] font-black uppercase tracking-widest text-stone-500 group-hover:text-black transition-colors">
                    VIEW_CLINICAL_SHEET <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          3. CLINICAL OUTCOMES (Stats)
          ========================================== */}
      <section id="clinical" className="py-32 bg-[#fafafa]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-32 items-center">
            <div className="lg:col-span-6">
              <Reveal>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-slate-500 mb-6 block">
                  Clinical Audit
                </span>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight mb-12 text-black uppercase italic">
                  Proven <br />{" "}
                  <span className="text-slate-300 not-italic">Luminosity.</span>
                </h2>
                <p className="text-lg text-black/20 leading-relaxed font-bold mb-16 uppercase tracking-tight italic">
                  Our formulations are verified through independent multi-center
                  clinical trials. We measure biological impact, not just
                  superficial aesthetics.
                </p>
              </Reveal>

              <div className="grid grid-cols-2 gap-8">
                {CLINICAL_OUTCOMES.map((item, i) => (
                  <Reveal key={i} delay={item.delay}>
                    <div className="p-8 border border-black/5 bg-white rounded-none">
                      <div className="text-4xl font-black text-black mb-2 uppercase italic tabular-nums">
                        <Counter to={item.val} suffix={item.suffix} />
                      </div>
                      <p className="text-[9px] text-black/40 font-bold uppercase tracking-widest">
                        {item.metric}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <Reveal className="space-y-8">
                {[
                  {
                    title: "MOLECULAR_HYDRATION",
                    icon: <Droplets className="w-6 h-6" />,
                    desc: "Targeting the structural water balance of the stratum corneum.",
                  },
                  {
                    title: "CELLULAR_AUTOPHAGY",
                    icon: <HeartPulse className="w-6 h-6" />,
                    desc: "Stimulating cellular recycling for accelerated dermal repair.",
                  },
                  {
                    title: "INGREDIENT_SYNERGY",
                    icon: <Layers className="w-6 h-6" />,
                    desc: "Combining bio-active compounds for exponentially increased efficacy.",
                  },
                ].map((t, i) => (
                  <div
                    key={i}
                    className="p-10 bg-white border border-black/5 rounded-none hover:border-black transition-all group flex items-start gap-8"
                  >
                    <div className="text-slate-400 group-hover:text-black transition-colors">
                      {t.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-black uppercase text-black italic mb-3">
                        {t.title}
                      </h4>
                      <p className="text-[10px] text-black/30 leading-relaxed font-bold uppercase tracking-widest italic">
                        {t.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          4. THE CONCIERGE (Form/CTA)
          ========================================== */}
      <section
        id="concierge"
        className="py-32 bg-[#fafafa] border-y border-black/5"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <Reveal>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9] text-black mb-12">
              Skin <br />{" "}
              <span className="text-slate-300 italic">Concierge.</span>
            </h2>
            <p className="text-lg text-black/20 leading-relaxed font-bold mb-12 uppercase tracking-tight italic">
              Unlock your bespoke molecular profile. Our concierge utilizes
              AI-driven skin analysis to recommend a unique Aether protocol.
            </p>
            <div className="flex gap-10 items-center">
              <div className="flex flex-col">
                <span className="text-2xl font-black text-black italic">
                  94%
                </span>
                <span className="text-[9px] font-bold text-black/20 uppercase tracking-widest">
                  Protocol Accuracy
                </span>
              </div>
              <div className="w-[1px] h-12 bg-black/5" />
              <div className="flex flex-col">
                <span className="text-2xl font-black text-black italic">
                  14 Day
                </span>
                <span className="text-[9px] font-bold text-black/20 uppercase tracking-widest">
                  Visible Change
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="p-12 bg-white border border-black/5 shadow-2xl rounded-none relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-100 -z-10 translate-x-4 -translate-y-4" />
              <h3 className="text-xl font-black uppercase text-black italic mb-8">
                Access Protocol Analysis
              </h3>
              <div className="space-y-6 mb-10">
                <input
                  type="text"
                  placeholder="FULL_NAME"
                  className="w-full bg-slate-50 border border-black/5 rounded-none px-6 py-4 text-xs font-bold outline-none focus:border-black text-black transition-all uppercase tracking-widest"
                />
                <input
                  type="email"
                  placeholder="EMAIL_ADDRESS"
                  className="w-full bg-slate-50 border border-black/5 rounded-none px-6 py-4 text-xs font-bold outline-none focus:border-black text-black transition-all uppercase tracking-widest"
                />
                <select className="w-full bg-slate-50 border border-black/5 rounded-none px-6 py-4 text-xs font-bold outline-none focus:border-black text-black transition-all uppercase tracking-widest appearance-none">
                  <option>SELECT_PRIMARY_CONCERN</option>
                  <option>REGENERATION</option>
                  <option>HYDRATION</option>
                  <option>SYNCHRONIZATION</option>
                </select>
              </div>
              <button className="w-full py-5 bg-black text-white text-[10px] font-bold uppercase tracking-widest rounded-none hover:bg-slate-800 transition-all shadow-xl">
                START_ANALYSIS
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ==========================================
          5. FAQ (The Buffer)
          ========================================== */}
      <section id="formulation" className="py-32 bg-[#fafafa]">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-none uppercase italic text-black">
              Molecular_Buffer
            </h2>
          </Reveal>

          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                q: "What is your 'Zero Irritation' guarantee?",
                a: "We utilize multi-stage encapsulation for active ingredients like Retinol and Vitamin C. This ensures the molecules trigger cellular responses only at the optimal dermal depth, bypassing superficial inflammation.",
              },
              {
                q: "How do I store Aether formulations?",
                a: "For maximum molecular stability, store in a cool, dark environment. Our UV-resistant glass vials protect the integrity of the active growth factors for up to 12 months.",
              },
              {
                q: "Can I combine multiple serums?",
                a: "Yes. Our formulations are built on a modular infrastructure. We recommend the 'Thin-to-Thick' layering protocol, starting with AETHER_SERUM_V1 as your structural base.",
              },
              {
                q: "Are your ingredients ethically sourced?",
                a: "100%. We utilize bio-identical synthetic alternatives for all traditionally animal-derived compounds. Our lab is carbon-neutral and operates under the highest Swiss manufacturing standards.",
              },
            ].map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b border-black/5"
              >
                <AccordionTrigger className="text-left text-sm uppercase font-bold tracking-widest py-8 hover:text-slate-500 hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-black/30 leading-relaxed font-bold uppercase tracking-widest pb-8 italic">
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
      <footer className="bg-white pt-32 pb-12 px-6 md:px-12 border-t border-black/5 relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-32">
            <div className="lg:col-span-5">
              <Reveal>
                <div className="flex flex-col mb-10">
                  <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-black/20 mb-1">
                    Laboratory.
                  </span>
                  <span className="text-2xl font-black tracking-tighter uppercase text-black">
                    AETHER<span className="text-slate-300">.LABS</span>
                  </span>
                </div>
                <p className="text-black/20 max-w-sm mb-12 uppercase tracking-widest text-[10px] font-bold leading-relaxed italic">
                  The molecular infrastructure for the next generation of skin
                  perfection. Est. 2026. Precision distilled. Globally
                  distributed.
                </p>
                <form
                  className="relative max-w-md"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="email"
                    placeholder="ACCESS_THE_MANIFESTO"
                    className="w-full bg-slate-50 border border-black/5 rounded-none px-6 py-4 text-xs font-bold outline-none focus:border-black text-black transition-all uppercase tracking-widest"
                  />
                  <button
                    type="submit"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-500 hover:text-black transition-colors uppercase tracking-[0.3em]"
                  >
                    JOIN
                  </button>
                </form>
              </Reveal>
            </div>

            <div className="lg:col-span-2 lg:col-start-7">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-black mb-10">
                Archive
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-black/30">
                <li>
                  <Link href="#" className="hover:text-black transition-colors">
                    Serum_V1
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black transition-colors">
                    Hydra_Fluid
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black transition-colors">
                    Retinol_B2
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black transition-colors">
                    All_Products
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-black mb-10">
                Science
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-black/30">
                <li>
                  <Link href="#" className="hover:text-black transition-colors">
                    Clinical_Audit
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black transition-colors">
                    Molecular_Data
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black transition-colors">
                    Ingredients
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black transition-colors">
                    Headquarters
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-black mb-10">
                Network
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-black/30">
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
                    <Mail className="w-3 h-3" /> Contact_Control
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-10 border-t border-black/5 text-[9px] font-bold uppercase tracking-widest text-black/10">
            <div className="flex items-center gap-10">
              <span>&copy; {new Date().getFullYear()} AETHER LABS Group.</span>
              <Link href="#" className="hover:text-black transition-colors">
                Regulatory_Terms
              </Link>
              <Link href="#" className="hover:text-black transition-colors">
                Privacy_Buffer
              </Link>
            </div>
            <div className="flex gap-10">
              <span>Zurich // Paris // NYC</span>
              <span>In Data We Trust</span>
            </div>
          </div>
        </div>
      </footer>

      {/* FORMULATION MODAL */}
      <AnimatePresence>
        {activeFormulation !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-white/98 backdrop-blur-3xl flex items-center justify-center p-6"
            onClick={() => setActiveFormulation(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="bg-white border border-black/10 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 overflow-hidden rounded-none shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveFormulation(null)}
                className="absolute top-8 right-8 text-black/20 hover:text-black transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>

              {/* IMAGE AREA */}
              <div className="lg:col-span-8 relative aspect-video lg:aspect-auto bg-stone-50">
                <Image
                  src={FORMULATIONS[activeFormulation].img}
                  alt="Formulation"
                  fill
                  className="object-cover grayscale-[0.2]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <h3 className="text-4xl font-black text-black italic">
                    {FORMULATIONS[activeFormulation].name}
                  </h3>
                </div>
              </div>

              {/* SIDEBAR AREA */}
              <div className="lg:col-span-4 p-8 flex flex-col justify-between bg-white border-l border-black/5">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-800 mb-6 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-slate-800" />
                    Molecular Asset Specification
                  </div>
                  <div className="space-y-6 mb-12">
                    {[
                      {
                        label: "Category",
                        val: FORMULATIONS[activeFormulation].category,
                      },
                      {
                        label: "Weight",
                        val: FORMULATIONS[activeFormulation].molecularWeight,
                      },
                      { label: "Certification", val: "Lab Verified" },
                      { label: "Status", val: "IN_THE_ARCHIVE" },
                    ].map((spec, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center border-b border-black/5 pb-4"
                      >
                        <span className="text-[9px] font-bold text-black/20 uppercase tracking-widest">
                          {spec.label}
                        </span>
                        <span className="text-[10px] font-black text-black uppercase italic">
                          {spec.val}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-black/40 leading-relaxed font-bold uppercase tracking-tight italic mb-10">
                    {FORMULATIONS[activeFormulation].desc}
                  </p>
                </div>

                <button className="w-full py-5 bg-black text-white text-[10px] font-bold uppercase tracking-widest rounded-none hover:bg-slate-800 transition-all cursor-pointer shadow-xl">
                  ADD_TO_PROTOCOL
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        ::-webkit-scrollbar{width:4px;background:#fafafa}
        ::-webkit-scrollbar-thumb{background:rgba(15,23,42,0.1)}
      `}</style>
    </div>
  );
}
