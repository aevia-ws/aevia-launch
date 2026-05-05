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
import { Sparkles, Wand2, Zap, Globe, Activity, Terminal, Box, Share2, Layers, Maximize, Monitor, MousePointer2, Navigation, Wifi, Shield, ShoppingBag, Search, Star, Mail, Phone, Check, Menu, X, MapPin, Clock, Lock, Plus, Bell, Settings, ArrowRight, ArrowUpRight, ChevronRight, Eye, PenTool, Heart, Microscope, Stethoscope, Syringe } from "lucide-react";

import "../premium.css";

/* ==========================================================================
   DATA STRUCTURES
   ========================================================================= */

const TREATMENTS = [
  {
    id: 1,
    name: "CYPHER_SCULPT",
    category: "Facial Aesthetics",
    stats: { complexity: "High", duration: "45m", recovery: "0 days" },
    img: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=1200&q=80",
    desc: "A non-invasive structural re-definition utilizing high-density molecular fillers and neural inhibitors.",
  },
  {
    id: 2,
    name: "DERMAL_SYNC",
    category: "Skin Rejuvenation",
    stats: { complexity: "Medium", duration: "60m", recovery: "2 days" },
    img: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=1200&q=80",
    desc: "Laser-driven cellular regeneration and pigment synchronization for a clinically flawless canvas.",
  },
  {
    id: 3,
    name: "VITAMIN_DRIP_V3",
    category: "Wellness",
    stats: { complexity: "Low", duration: "30m", recovery: "0 days" },
    img: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1200&q=80",
    desc: "Intravenous molecular infusion optimized for neuro-luminosity and systemic biological vitality.",
  },
];

const CLINICAL_SPECS = [
  {
    label: "Patient Satisfaction",
    val: 99.8,
    suffix: "%",
    desc: "Based on 12,000+ clinical outcome audits.",
  },
  {
    label: "Practitioner Experience",
    val: 15,
    suffix: "+ Yrs",
    desc: "Our surgeons are international board-certified leaders.",
  },
  {
    label: "Clinical Precision",
    val: 0.1,
    suffix: "mm",
    desc: "Utilization of robotic-assisted surgical alignment tools.",
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

export default function AestheticClinicPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTreatment, setActiveTreatment] = useState<number | null>(null);

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
      className="premium-theme min-h-screen bg-[#fcfcfc] text-[#0a0a0a] font-sans selection:bg-rose-900 selection:text-white overflow-x-hidden"
      style={{ scrollBehavior: "smooth" }}
    >
      {/* ==========================================
          NAVIGATION
          ========================================== */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-1000 ${scrolled ? "bg-white/95 backdrop-blur-xl py-4 border-b border-black/5 shadow-sm" : "bg-transparent py-10"}`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="flex flex-col items-start">
            <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-rose-400 mb-1">
              Aesthetic.
            </span>
            <span className="text-xl md:text-2xl font-black tracking-tighter uppercase text-black">
              CYPHER<span className="text-rose-200">.CLINIC</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-black/40">
            <Link
              href="#treatments"
              className="hover:text-rose-500 transition-colors"
            >
              Treatments
            </Link>
            <Link
              href="#clinical"
              className="hover:text-rose-500 transition-colors"
            >
              Clinical
            </Link>
            <Link
              href="#specialists"
              className="hover:text-rose-500 transition-colors"
            >
              Specialists
            </Link>
            <Link
              href="#dossier"
              className="hover:text-rose-500 transition-colors"
            >
              Dossier
            </Link>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden xl:flex flex-col items-end">
              <span className="text-[9px] font-bold text-black/10 uppercase tracking-widest">
                Beverly Hills // London
              </span>
              <span className="text-[11px] font-black text-rose-500 flex items-center gap-1">
                CLINIC_OPEN <Activity className="w-3 h-3" />
              </span>
            </div>
            <MagneticBtn className="px-8 py-3 bg-black text-white text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-rose-600 transition-all shadow-xl">
              BOOK_SESSION
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
            <div className="flex flex-col gap-10 text-5xl font-black tracking-tighter uppercase italic text-rose-200/50">
              <Link href="#treatments" onClick={() => setMenuOpen(false)}>
                Treatments
              </Link>
              <Link href="#clinical" onClick={() => setMenuOpen(false)}>
                Clinical
              </Link>
              <Link href="#specialists" onClick={() => setMenuOpen(false)}>
                Specialists
              </Link>
              <Link href="#dossier" onClick={() => setMenuOpen(false)}>
                Dossier
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
            src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=1600&q=80"
            alt="Clinic Hero"
            fill
            className="object-cover grayscale-[0.2] contrast-125 brightness-90"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#fcfcfc] via-transparent to-transparent" />
        </motion.div>

        {/* SOFT ROSE GLOW */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-rose-200/20 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full">
          <Reveal>
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-rose-100 rounded-full border border-rose-200 text-rose-600 text-[10px] font-bold uppercase tracking-widest mb-10 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              Medical Grade Aesthetics // Board Certified Excellence
            </div>
            <h1 className="text-7xl md:text-9xl lg:text-[11rem] font-black leading-[0.85] tracking-tighter mb-12 uppercase">
              The Art <br />{" "}
              <span className="text-rose-300 italic">of Precision.</span>
            </h1>
            <p className="max-w-xl text-lg md:text-xl text-black/20 leading-relaxed font-bold mb-12 uppercase tracking-tight italic">
              Sculpting the biological form through advanced molecular
              engineering. Non-surgical excellence for the modern visage.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <MagneticBtn className="px-12 py-5 bg-black text-white text-[10px] font-bold uppercase tracking-[0.4em] rounded-full hover:bg-rose-600 transition-all cursor-pointer shadow-2xl">
                Analyze Treatments
              </MagneticBtn>
              <button className="px-12 py-5 border border-black/10 text-black text-[10px] font-bold uppercase tracking-[0.4em] rounded-full hover:bg-black hover:text-white transition-all cursor-pointer">
                Clinical_Audit
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
              CYPHER_CLINICAL_SYS // NODE_084
            </span>
            <div className="w-32 h-[1px] bg-rose-200/40" />
          </div>
        </motion.div>
      </section>

      {/* ==========================================
          2. TREATMENTS (Portfolio Grid)
          ========================================== */}
      <section
        id="treatments"
        className="py-32 bg-[#fcfcfc] border-y border-black/5"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
            <Reveal>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9] text-black">
                Active <br />{" "}
                <span className="text-rose-300 italic">Protocols.</span>
              </h2>
            </Reveal>
            <p className="max-w-sm text-sm text-black/20 leading-relaxed font-bold uppercase tracking-widest italic text-right">
              Our curated clinical protocols. Each treatment is a bespoke
              engineering project focused on symmetrical perfection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {TREATMENTS.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.1}>
                <div
                  onClick={() => setActiveTreatment(i)}
                  className="group cursor-pointer bg-white border border-black/5 hover:border-rose-300 transition-all rounded-none p-8 shadow-sm h-full flex flex-col justify-between overflow-hidden"
                >
                  <div>
                    <div className="relative aspect-[4/5] mb-10 overflow-hidden">
                      <Image
                        src={p.img}
                        alt={p.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-1000 grayscale-[0.2] group-hover:grayscale-0"
                      />
                      <div className="absolute inset-0 bg-rose-100/10 mix-blend-overlay" />
                      <div className="absolute top-6 left-6">
                        <Badge className="bg-black text-white border-none text-[8px] font-black tracking-widest uppercase px-3 py-1">
                          CERTIFIED_TECH
                        </Badge>
                      </div>
                    </div>
                    <h3 className="text-2xl font-black uppercase tracking-tighter text-black italic mb-4">
                      {p.name}
                    </h3>
                    <div className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-6">
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
          3. CLINICAL AUDIT (Interactive Stats)
          ========================================== */}
      <section id="clinical" className="py-32 bg-[#fcfcfc]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-32 items-center">
            <div className="lg:col-span-5">
              <Reveal>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-rose-600 mb-6 block">
                  Treatment Audit
                </span>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight mb-12 text-black uppercase italic">
                  Medical <br />{" "}
                  <span className="text-rose-300 not-italic">Standards.</span>
                </h2>
                <p className="text-lg text-black/20 leading-relaxed font-bold mb-16 uppercase tracking-tight italic">
                  We operate at the intersection of medical science and artistic
                  mastery. Each protocol is verified by our internal medical
                  council.
                </p>

                <div className="space-y-6">
                  {CLINICAL_SPECS.map((item, i) => (
                    <div
                      key={i}
                      className="group border-l border-rose-200 pl-8 hover:border-rose-600 transition-all"
                    >
                      <h4 className="text-sm font-bold uppercase tracking-tight mb-2 text-black/40">
                        {item.label}
                      </h4>
                      <div className="text-3xl font-black text-rose-500 mb-2 uppercase italic tabular-nums">
                        <Counter to={item.val} suffix={item.suffix} />
                      </div>
                      <p className="text-[10px] text-black/20 leading-relaxed font-bold uppercase tracking-widest">
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
                    title: "DERMAL_DYNAMICS",
                    icon: <PenTool className="w-6 h-6" />,
                  },
                  {
                    title: "MOLECULAR_SYNC",
                    icon: <Microscope className="w-6 h-6" />,
                  },
                  {
                    title: "STRUCTURAL_FACE",
                    icon: <Maximize className="w-6 h-6" />,
                  },
                  {
                    title: "CELLULAR_GLOW",
                    icon: <Heart className="w-6 h-6" />,
                  },
                ].map((t, i) => (
                  <div
                    key={i}
                    className="p-12 bg-white border border-black/5 rounded-none hover:border-rose-300 transition-all group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-rose-100/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="text-rose-500 mb-8">{t.icon}</div>
                    <h4 className="text-xl font-black uppercase text-black italic mb-4">
                      {t.title}
                    </h4>
                    <div className="h-1 w-0 bg-rose-500 group-hover:w-full transition-all duration-700" />
                  </div>
                ))}
                <div className="md:col-span-2 p-12 bg-rose-50 border border-rose-200 rounded-none mt-4 text-center">
                  <Stethoscope className="w-8 h-8 text-rose-500 mx-auto mb-6" />
                  <h3 className="text-xl font-black uppercase tracking-tight text-black mb-4 italic">
                    Institutional Safety Protocol
                  </h3>
                  <p className="text-[10px] text-black/30 uppercase tracking-widest mb-8 leading-relaxed">
                    All Cypher treatments are administered by board-certified
                    practitioners utilizing FDA-approved molecular compounds
                    only.
                  </p>
                  <button className="px-12 py-4 bg-black text-white text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-rose-600 transition-all shadow-xl">
                    DOWNLOAD_SAFETY_DOSSIER
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
      <section className="py-24 bg-[#fcfcfc] border-y border-black/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-2 lg:grid-cols-4 gap-16 text-center">
          {[
            { label: "Successful_Treatments", val: 24, suffix: "K+" },
            { label: "Board_Practitioners", val: 18, suffix: "" },
            { label: "Clinical_Awards", val: 42, suffix: "" },
            { label: "Global_Clinics", val: 5, suffix: "" },
          ].map((stat, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="text-5xl md:text-7xl font-black text-rose-500 mb-4 italic tabular-nums">
                <Counter to={stat.val} suffix={stat.suffix} />
              </div>
              <div className="text-[10px] font-bold uppercase tracking-[0.5em] text-black/20">
                {stat.label}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ==========================================
          5. FAQ (The Buffer)
          ========================================== */}
      <section id="dossier" className="py-32 bg-[#fcfcfc]">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-none uppercase italic text-black">
              Clinical_Buffer
            </h2>
          </Reveal>

          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                q: "What is your pre-treatment audit process?",
                a: "Every patient undergoes a 45-minute clinical audit featuring 3D facial mapping and skin-density analysis. We do not proceed with any protocol without 100% molecular compatibility.",
              },
              {
                q: "How do you ensure non-surgical longevity?",
                a: "We utilize multi-layer placement techniques and hybrid fillers that integrate with your biological tissue for natural, 12-18 month results.",
              },
              {
                q: "What are the post-treatment protocols?",
                a: "Cypher Clinic provides a bespoke 'Recovery Kit' and 24/7 access to our medical concierge. We perform a follow-up audit 14 days post-procedure as standard.",
              },
              {
                q: "Do you offer private VIP sessions?",
                a: "Yes. Our London and Beverly Hills nodes feature private 'Cypher Suites' with direct medical-grade air filtration and anonymous ingress/egress for high-profile patients.",
              },
            ].map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b border-black/5"
              >
                <AccordionTrigger className="text-left text-sm uppercase font-bold tracking-widest py-8 hover:text-rose-500 hover:no-underline">
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
                    Aesthetic.
                  </span>
                  <span className="text-2xl font-black tracking-tighter uppercase text-black">
                    CYPHER<span className="text-rose-300">.CLINIC</span>
                  </span>
                </div>
                <p className="text-black/20 max-w-sm mb-12 uppercase tracking-widest text-[10px] font-bold leading-relaxed italic">
                  The clinical infrastructure for the next generation of
                  aesthetic perfection. Est. 2026. Precision engineered.
                  Globally deployed.
                </p>
                <form
                  className="relative max-w-md"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="email"
                    placeholder="ACCESS_THE_DOSSIER"
                    className="w-full bg-stone-50 border border-black/5 rounded-full px-6 py-4 text-xs font-bold outline-none focus:border-rose-500 text-black transition-all uppercase tracking-widest"
                  />
                  <button
                    type="submit"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-rose-500 hover:text-black transition-colors uppercase tracking-[0.3em]"
                  >
                    JOIN
                  </button>
                </form>
              </Reveal>
            </div>

            <div className="lg:col-span-2 lg:col-start-7">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-black mb-10">
                Treatments
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-black/30">
                <li>
                  <Link
                    href="#"
                    className="hover:text-rose-500 transition-colors"
                  >
                    Facial_Sculpt
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-rose-500 transition-colors"
                  >
                    Dermal_Fillers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-rose-500 transition-colors"
                  >
                    Laser_Dynamics
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-rose-500 transition-colors"
                  >
                    Wellness_Infusions
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-black mb-10">
                Clinical
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-black/30">
                <li>
                  <Link
                    href="#"
                    className="hover:text-rose-500 transition-colors"
                  >
                    Specialist_Roster
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-rose-500 transition-colors"
                  >
                    Safety_Audit
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-rose-500 transition-colors"
                  >
                    Technology
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-rose-500 transition-colors"
                  >
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
                    <Globe className="w-3 h-3" /> X_Mission
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-rose-500 transition-colors flex items-center gap-3"
                  >
                    <Mail className="w-3 h-3" /> Contact_Control
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-10 border-t border-black/5 text-[9px] font-bold uppercase tracking-widest text-black/10">
            <div className="flex items-center gap-10">
              <span>
                &copy; {new Date().getFullYear()} CYPHER AESTHETICS Group.
              </span>
              <Link href="#" className="hover:text-black transition-colors">
                Regulatory_Terms
              </Link>
              <Link href="#" className="hover:text-black transition-colors">
                Privacy_Buffer
              </Link>
            </div>
            <div className="flex gap-10">
              <span>Beverly Hills // London // Singapore</span>
              <span>In Form We Trust</span>
            </div>
          </div>
        </div>
      </footer>

      {/* TREATMENT MODAL */}
      <AnimatePresence>
        {activeTreatment !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-white/98 backdrop-blur-3xl flex items-center justify-center p-6"
            onClick={() => setActiveTreatment(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="bg-white border border-black/10 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 overflow-hidden rounded-none shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveTreatment(null)}
                className="absolute top-8 right-8 text-black/20 hover:text-rose-500 transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>

              {/* IMAGE AREA */}
              <div className="lg:col-span-8 relative aspect-video lg:aspect-auto bg-stone-50">
                <Image
                  src={TREATMENTS[activeTreatment].img}
                  alt="Treatment"
                  fill
                  className="object-cover grayscale-[0.2]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <h3 className="text-4xl font-black text-black italic">
                    {TREATMENTS[activeTreatment].name}
                  </h3>
                </div>
              </div>

              {/* SIDEBAR AREA */}
              <div className="lg:col-span-4 p-8 flex flex-col justify-between bg-white border-l border-black/5">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-rose-500 mb-6 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-rose-500" />
                    Clinical Asset Specification
                  </div>
                  <div className="space-y-6 mb-12">
                    {Object.entries(TREATMENTS[activeTreatment].stats).map(
                      ([key, val], i) => (
                        <div
                          key={i}
                          className="flex justify-between items-center border-b border-black/5 pb-4"
                        >
                          <span className="text-[9px] font-bold text-black/20 uppercase tracking-widest">
                            {key}
                          </span>
                          <span className="text-[10px] font-black text-black uppercase italic">
                            {val}
                          </span>
                        </div>
                      ),
                    )}
                  </div>
                  <p className="text-xs text-black/40 leading-relaxed font-bold uppercase tracking-tight italic mb-10">
                    {TREATMENTS[activeTreatment].desc}
                  </p>
                </div>

                <button className="w-full py-5 bg-black text-white text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-rose-600 transition-all cursor-pointer shadow-xl">
                  REQUEST_CONSULTATION
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        ::-webkit-scrollbar{width:4px;background:#fcfcfc}
        ::-webkit-scrollbar-thumb{background:rgba(225,29,72,0.2)}
      `}</style>
    </div>
  );
}
