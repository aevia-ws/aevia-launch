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
import { ArrowRight, ArrowUpRight, Star, Check, Menu, X, FlaskConical, Dna, Microscope, Heart, BarChart2, Shield, Globe, Clock, Quote, Search, ShoppingBag, Activity, Zap, BookOpen, UserCheck, TrendingUp, Cpu } from "lucide-react";

import "../premium.css";

/* ==========================================================================
   DATA STRUCTURES
   ========================================================================= */

const PIPELINES = [
  {
    id: 1,
    code: "NXV-401",
    name: "Nexavir",
    indication: "Oncology — NSCLC",
    phase: "Phase III",
    progress: 82,
    img: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1200&q=80",
    desc: "Next-generation mRNA immunotherapy targeting PD-L1/CTLA-4 axis in non-small cell lung carcinoma.",
    milestones: [
      "Target Identified Q1 2024",
      "Phase I Safety Cleared Q3 2024",
      "Phase II Efficacy Confirmed Q2 2025",
    ],
  },
  {
    id: 2,
    code: "GEN-217",
    name: "Genova",
    indication: "Rare Disease — SMA",
    phase: "Phase II",
    progress: 55,
    img: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1200&q=80",
    desc: "CRISPR-based gene editing platform for spinal muscular atrophy with precision delivery via lipid nanoparticles.",
    milestones: [
      "IND Approval Q4 2024",
      "First Patient Dosed Q1 2025",
      "Interim Data Q4 2025",
    ],
  },
  {
    id: 3,
    code: "CAR-088",
    name: "Cardiosyne",
    indication: "Cardiovascular — HFrEF",
    phase: "Phase I",
    progress: 28,
    img: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=1200&q=80",
    desc: "Small molecule ROCK-2 inhibitor addressing cardiac fibrosis in heart failure with reduced ejection fraction.",
    milestones: [
      "Lead Optimization 2024",
      "GLP Tox Complete Q1 2025",
      "Phase I Launch Q3 2025",
    ],
  },
];

const PLATFORM_PILLARS = [
  {
    title: "mRNA Dynamics",
    desc: "Proprietary nucleoside modifications that extend protein expression by 3.4x vs standard mRNA.",
    icon: <Microscope className="w-5 h-5" />,
  },
  {
    title: "LNP Target-X",
    desc: "Organ-selective lipid nanoparticles achieving 92% liver bypass for systemic delivery.",
    icon: <Zap className="w-5 h-5" />,
  },
  {
    title: "CRISPR-Fine",
    desc: "Single-base resolution editing with zero detectable off-target effects in primary human cells.",
    icon: <Dna className="w-5 h-5" />,
  },
  {
    title: "Bio-Sim AI",
    desc: "Machine learning models trained on 12PB of proprietary clinical data to predict phase II success.",
    icon: <Cpu className="w-5 h-5" />,
  },
];

const BOARD = [
  {
    name: "Dr. Elena Vance",
    role: "Chief Scientific Officer",
    org: "Ex-Genentech",
    avatar: "EV",
  },
  {
    name: "Prof. Hans Schmidt",
    role: "Clinical Lead",
    org: "Basel University",
    avatar: "HS",
  },
  {
    name: "Sarah Jenkins",
    role: "Head of R&D",
    org: "MIT Whitehead Institute",
    avatar: "SJ",
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

export default function NexavirBioPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePipeline, setActivePipeline] = useState<number | null>(null);

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
      className="premium-theme min-h-screen bg-white text-[#0a1a2f] font-sans selection:bg-[#0066cc] selection:text-white overflow-x-hidden"
      style={{ scrollBehavior: "smooth" }}
    >
      {/* ==========================================
          NAVIGATION
          ========================================== */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${scrolled ? "bg-white/95 backdrop-blur-md py-4 border-b border-[#0066cc]/10 shadow-sm" : "bg-transparent py-8"}`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#0066cc] flex items-center justify-center text-white">
              <Dna className="w-4 h-4" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase text-[#0a1a2f]">
              NEXAVIR<span className="text-[#0066cc]">BIO</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-10 text-[10px] font-bold uppercase tracking-[0.2em] text-[#0a1a2f]/40">
            <Link href="#" className="hover:text-[#0066cc] transition-colors">
              Pipeline
            </Link>
            <Link href="#" className="hover:text-[#0066cc] transition-colors">
              Platform
            </Link>
            <Link href="#" className="hover:text-[#0066cc] transition-colors">
              Clinical_Data
            </Link>
            <Link href="#" className="hover:text-[#0066cc] transition-colors">
              Investors
            </Link>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden xl:flex flex-col items-end">
              <span className="text-[9px] font-bold text-[#0a1a2f]/30 uppercase tracking-widest">
                NASDAQ: NXVB
              </span>
              <span className="text-[11px] font-bold text-green-600 flex items-center gap-1">
                142.40 <TrendingUp className="w-3 h-3" />
              </span>
            </div>
            <button className="px-8 py-3 bg-[#0066cc] text-white text-[10px] font-bold uppercase tracking-widest rounded-md hover:bg-[#001a3d] transition-all shadow-lg shadow-[#0066cc]/20">
              Contact_IR
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
            className="fixed inset-0 z-[100] bg-white p-8 pt-32 flex flex-col border-l border-black/5"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-10 right-8"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="flex flex-col gap-10 text-4xl font-black tracking-tighter uppercase">
              <Link href="#" onClick={() => setMenuOpen(false)}>
                Pipeline
              </Link>
              <Link href="#" onClick={() => setMenuOpen(false)}>
                Platform
              </Link>
              <Link href="#" onClick={() => setMenuOpen(false)}>
                Science
              </Link>
              <Link href="#" onClick={() => setMenuOpen(false)}>
                Investors
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==========================================
          1. HERO (Tech-Scientific)
          ========================================== */}
      <section
        ref={heroRef}
        className="relative w-full h-[100svh] flex flex-col justify-center overflow-hidden bg-[#f4f7fa]"
      >
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1600&q=80"
            alt="Biotech Hero"
            fill
            className="object-cover opacity-10"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#f4f7fa] via-[#f4f7fa]/80 to-transparent" />
        </motion.div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full">
          <Reveal>
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white rounded-full border border-[#0066cc]/20 text-[#0066cc] text-[10px] font-bold uppercase tracking-widest mb-10 shadow-sm">
              <span className="w-2 h-2 bg-[#0066cc] rounded-full animate-pulse" />
              Phase III Data Update Released Q2 2026
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-black leading-[0.95] tracking-tighter mb-10 text-[#0a1a2f]">
              Precision Medicine <br />{" "}
              <span className="text-[#0066cc]">Re-engineered.</span>
            </h1>
            <p className="max-w-xl text-lg md:text-xl text-[#0a1a2f]/60 leading-relaxed font-medium mb-12">
              Advancing a deep pipeline of curative mRNA and gene-editing
              therapies targeting oncology, rare disease, and cardiovascular
              failure.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <MagneticBtn className="px-12 py-5 bg-[#0066cc] text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded-md hover:bg-[#001a3d] transition-all cursor-pointer shadow-2xl">
                Explore Pipeline
              </MagneticBtn>
              <button className="px-12 py-5 border border-[#0066cc]/20 text-[#0a1a2f] text-[10px] font-bold uppercase tracking-[0.3em] rounded-md hover:bg-white transition-all cursor-pointer">
                Platform Overview
              </button>
            </div>
          </Reveal>
        </div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute bottom-10 left-12 hidden md:block"
        >
          <div className="flex flex-col gap-2">
            <span className="text-[9px] font-bold text-[#0a1a2f]/30 uppercase tracking-[0.4em]">
              Basel // Boston // Singapore
            </span>
            <div className="w-32 h-[1px] bg-[#0066cc]/20" />
          </div>
        </motion.div>
      </section>

      {/* ==========================================
          2. PLATFORM ENGINE (Deeper Dive)
          ========================================== */}
      <section className="py-32 bg-white border-y border-black/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-32 items-center">
            <div className="lg:col-span-6">
              <Reveal>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#0066cc] mb-6 block">
                  The Discovery Engine
                </span>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight mb-12 text-[#0a1a2f] uppercase">
                  Built on the <br />{" "}
                  <span className="text-[#0066cc]">Language</span> of Biology.
                </h2>
                <p className="text-lg text-[#0a1a2f]/50 leading-relaxed font-medium mb-16 italic">
                  Our integrated platform compresses the discovery-to-IND
                  timeline by 40% through AI-guided target identification and
                  proprietary delivery chemistry.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {PLATFORM_PILLARS.map((pillar, i) => (
                    <div
                      key={i}
                      className="p-8 bg-[#f4f7fa] border border-[#0066cc]/10 hover:border-[#0066cc]/40 transition-all group"
                    >
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-[#0066cc] mb-6 shadow-sm group-hover:scale-110 transition-transform">
                        {pillar.icon}
                      </div>
                      <h4 className="text-sm font-bold uppercase tracking-tight mb-3">
                        {pillar.title}
                      </h4>
                      <p className="text-xs text-[#0a1a2f]/40 leading-relaxed font-medium">
                        {pillar.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-6">
              <Reveal className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl border-8 border-white group">
                <Image
                  src="https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1200&q=80"
                  alt="Science Detail"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-[#0066cc]/10 mix-blend-multiply" />
                <div className="absolute inset-0 p-12 flex flex-col justify-end">
                  <div className="bg-white/95 backdrop-blur-md p-10 shadow-2xl border border-black/5">
                    <h3 className="text-3xl font-black uppercase tracking-tighter mb-6 text-[#0a1a2f]">
                      Target Identified.
                    </h3>
                    <div className="space-y-4 mb-8">
                      {[
                        { label: "Molecular Fidelity", val: 99.8 },
                        { label: "LNP Encapsulation", val: 95.4 },
                        { label: "Cellular Uptake", val: 88.2 },
                      ].map((stat, i) => (
                        <div key={i}>
                          <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-[#0a1a2f]/40 mb-2">
                            <span>{stat.label}</span>
                            <span className="text-[#0066cc]">{stat.val}%</span>
                          </div>
                          <Progress
                            value={stat.val}
                            className="h-1 bg-[#0066cc]/10 [&>div]:bg-[#0066cc]"
                          />
                        </div>
                      ))}
                    </div>
                    <button className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-[#0066cc] hover:text-[#0a1a2f] transition-colors">
                      View_Structural_Reports <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          3. CLINICAL PIPELINE
          ========================================== */}
      <section className="py-32 bg-[#f4f7fa]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
            <Reveal>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9] text-[#0a1a2f]">
                Clinical <br />{" "}
                <span className="text-[#0066cc]">Pipeline.</span>
              </h2>
            </Reveal>
            <p className="max-w-sm text-sm text-[#0a1a2f]/40 leading-relaxed font-bold uppercase tracking-widest italic">
              Advancing three lead candidates through adaptive clinical trials
              with embedded biomarker stratification.
            </p>
          </div>

          <div className="space-y-6">
            {PIPELINES.map((pipeline, i) => (
              <Reveal key={pipeline.id} delay={i * 0.1}>
                <div
                  onClick={() => setActivePipeline(i)}
                  className="group cursor-pointer bg-white border border-[#0066cc]/10 hover:border-[#0066cc]/40 transition-all p-8 flex flex-col lg:flex-row items-center gap-12 rounded-xl shadow-sm"
                >
                  <div className="w-32 h-32 bg-[#f4f7fa] rounded-xl flex items-center justify-center text-[#0066cc] flex-shrink-0 group-hover:scale-110 transition-transform">
                    <FlaskConical className="w-12 h-12" />
                  </div>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#0066cc] mb-2">
                        {pipeline.code} // {pipeline.phase}
                      </div>
                      <h3 className="text-3xl font-black uppercase tracking-tighter text-[#0a1a2f]">
                        {pipeline.name}
                      </h3>
                      <span className="text-xs font-bold text-[#0a1a2f]/40">
                        {pipeline.indication}
                      </span>
                    </div>
                    <div className="hidden md:block">
                      <span className="text-[9px] uppercase tracking-widest text-[#0a1a2f]/30 block mb-4">
                        Pipeline Status
                      </span>
                      <div className="flex items-center gap-4">
                        <div className="flex-1 h-2 bg-[#f4f7fa] rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${pipeline.progress}%` }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                            className="h-full bg-[#0066cc]"
                          />
                        </div>
                        <span className="text-xs font-bold text-[#0a1a2f]">
                          {pipeline.progress}%
                        </span>
                      </div>
                    </div>
                    <div className="hidden lg:block">
                      <span className="text-[9px] uppercase tracking-widest text-[#0a1a2f]/30 block mb-4">
                        Latest Milestones
                      </span>
                      <div className="flex flex-col gap-1">
                        {pipeline.milestones.slice(0, 2).map((m, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-bold text-[#0a1a2f]/60 flex items-center gap-2"
                          >
                            <Check className="w-3 h-3 text-green-500" /> {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <button className="w-14 h-14 rounded-full border border-[#0066cc]/20 flex items-center justify-center group-hover:bg-[#0066cc] group-hover:border-[#0066cc] transition-all">
                      <ArrowUpRight className="w-6 h-6 group-hover:text-white transition-colors" />
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          4. SCIENTIFIC GOVERNANCE (Board)
          ========================================== */}
      <section className="py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <Reveal className="text-center max-w-2xl mx-auto mb-24">
            <span className="text-[10px] uppercase tracking-[0.5em] font-black text-[#0066cc] mb-6 block">
              The Custodians
            </span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic text-[#0a1a2f]">
              Board of Inquiry.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {BOARD.map((member, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="group p-10 bg-[#f4f7fa] border border-[#0066cc]/10 hover:border-[#0066cc]/40 transition-all text-center">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden mx-auto mb-8 shadow-xl border-4 border-white">
                    <div className="absolute inset-0 bg-[#0066cc] flex items-center justify-center text-3xl font-black text-white italic">
                      {member.avatar}
                    </div>
                  </div>
                  <h4 className="text-2xl font-black uppercase tracking-tight mb-2 text-[#0a1a2f]">
                    {member.name}
                  </h4>
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#0066cc] mb-6 block">
                    {member.role}
                  </span>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-[9px] font-bold uppercase tracking-widest text-[#0a1a2f]/40 border border-black/5">
                    {member.org}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          5. INVESTOR HUB (Financials)
          ========================================== */}
      <section className="py-32 bg-[#0a1a2f] text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=1600&q=80"
            alt="Financials"
            fill
            className="object-cover"
          />
        </div>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <Reveal>
                <span className="text-[10px] uppercase tracking-[0.5em] font-black text-[#0066cc] mb-6 block">
                  Market Position
                </span>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight mb-12 uppercase">
                  Capital <br />{" "}
                  <span className="text-[#0066cc]">Efficiency.</span>
                </h2>
                <p className="text-lg text-white/40 leading-relaxed font-medium mb-16 max-w-lg italic">
                  We maintain a robust balance sheet with a multi-year cash
                  runway, enabling the completion of all lead Phase III trials
                  without dilutive financing.
                </p>

                <div className="grid grid-cols-2 gap-8">
                  {[
                    { label: "Market_Cap", val: 4.8, prefix: "$", suffix: "B" },
                    { label: "Cash_Runway", val: 24, suffix: " Mo" },
                    { label: "Clinical_Candidates", val: 12, suffix: "" },
                    { label: "Patent_Families", val: 23, suffix: "" },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="p-8 bg-white/5 border border-white/10 hover:border-[#0066cc]/40 transition-all"
                    >
                      <div className="text-4xl font-black mb-2 text-white">
                        <Counter
                          to={stat.val}
                          prefix={stat.prefix}
                          suffix={stat.suffix}
                        />
                      </div>
                      <span className="text-[9px] font-bold uppercase tracking-widest text-[#0066cc]">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <Reveal className="bg-white/5 backdrop-blur-xl p-12 border border-white/10 rounded-2xl">
              <div className="flex items-center justify-between mb-12">
                <h3 className="text-2xl font-black uppercase tracking-tighter text-[#0066cc]">
                  Investor Relations
                </h3>
                <div className="px-3 py-1 bg-green-500/20 text-green-500 text-[10px] font-bold uppercase rounded-md tracking-widest">
                  Market Open
                </div>
              </div>
              <div className="space-y-8 mb-12">
                {[
                  { title: "2025 Annual Report", size: "4.2 MB", type: "PDF" },
                  {
                    title: "Clinical Update Presentation",
                    size: "12.8 MB",
                    type: "PPTX",
                  },
                  {
                    title: "Quarterly Earnings Deck",
                    size: "2.1 MB",
                    type: "PDF",
                  },
                ].map((file, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white/40 group-hover:bg-[#0066cc] group-hover:text-white transition-all">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold uppercase tracking-tight text-white group-hover:text-[#0066cc] transition-colors">
                          {file.title}
                        </h4>
                        <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">
                          {file.size} // {file.type}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white transition-all translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
                  </div>
                ))}
              </div>
              <button className="w-full py-5 bg-[#0066cc] text-white text-[10px] font-bold uppercase tracking-[0.4em] rounded-md hover:bg-white hover:text-[#0a1a2f] transition-all cursor-pointer">
                Enter_Investor_Portal
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ==========================================
          6. FAQ (Accordion)
          ========================================== */}
      <section className="py-32 bg-[#f4f7fa]">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-none uppercase italic text-[#0a1a2f]">
              Science_Buffer
            </h2>
          </Reveal>

          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                q: "What is your primary research focus?",
                a: "Our research spans oncology, rare genetic diseases, and cardiovascular medicine, leveraging mRNA and gene-editing platforms.",
              },
              {
                q: "How do you approach clinical trials?",
                a: "We design adaptive trials that embed biomarker stratification from Phase I onward, reducing late-stage risk.",
              },
              {
                q: "What is your technology transfer policy?",
                a: "We maintain an open collaboration model with academic centers while protecting core platform innovations.",
              },
              {
                q: "How is patient safety monitored?",
                a: "All trials operate under independent DSMBs with real-time pharmacovigilance integration.",
              },
            ].map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b border-[#0066cc]/10"
              >
                <AccordionTrigger className="text-left text-sm uppercase font-bold tracking-widest py-8 hover:text-[#0066cc] hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-[#0a1a2f]/40 leading-relaxed font-bold uppercase tracking-widest pb-8">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ==========================================
          7. MEGA FOOTER (Structural)
          ========================================== */}
      <footer className="bg-white pt-32 pb-12 px-6 md:px-12 border-t border-black/5 relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-32">
            <div className="lg:col-span-5">
              <Reveal>
                <div className="text-xl font-black tracking-tighter uppercase mb-10 flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#0066cc] flex items-center justify-center text-white">
                    <Dna className="w-3.5 h-3.5" />
                  </div>
                  NEXAVIR<span className="text-[#0066cc]">BIO</span>
                </div>
                <p className="text-[#0a1a2f]/40 max-w-sm mb-12 uppercase tracking-widest text-[10px] font-bold leading-relaxed italic">
                  Advancing the frontier of precision medicine through molecular
                  engineering and AI-driven clinical development.
                </p>
                <form
                  className="relative max-w-md"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="email"
                    placeholder="AUTHENTICATE_IR_EMAIL"
                    className="w-full bg-[#f4f7fa] border border-black/5 rounded-none px-6 py-4 text-xs font-bold outline-none focus:border-[#0066cc] text-[#0a1a2f] transition-all uppercase tracking-widest"
                  />
                  <button
                    type="submit"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-[#0066cc] hover:text-[#0a1a2f] transition-colors uppercase tracking-[0.3em]"
                  >
                    ACCESS
                  </button>
                </form>
              </Reveal>
            </div>

            <div className="lg:col-span-2 lg:col-start-7">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#0066cc] mb-10">
                Pipeline
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-[#0a1a2f]/30">
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#0066cc] transition-colors"
                  >
                    Oncology_Assets
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#0066cc] transition-colors"
                  >
                    Rare_Genetic_Hub
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#0066cc] transition-colors"
                  >
                    Cardiovascular_Prog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#0066cc] transition-colors"
                  >
                    Clinical_Trials_Log
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#0066cc] mb-10">
                Platform
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-[#0a1a2f]/30">
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#0066cc] transition-colors"
                  >
                    mRNA_Dynamics
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#0066cc] transition-colors"
                  >
                    Target_X_Delivery
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#0066cc] transition-colors"
                  >
                    AI_Predictive_Tox
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#0066cc] transition-colors"
                  >
                    Structural_Biology
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#0066cc] mb-10">
                Network
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-[#0a1a2f]/30">
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#0066cc] transition-colors flex items-center gap-3"
                  >
                    <Globe className="w-3 h-3" /> Basel_HQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#0066cc] transition-colors flex items-center gap-3"
                  >
                    <Globe className="w-3 h-3" /> X_Protocol
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#0066cc] transition-colors flex items-center gap-3"
                  >
                    <TrendingUp className="w-3 h-3" /> Investor_Relations
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-10 border-t border-black/5 text-[9px] font-bold uppercase tracking-widest text-[#0a1a2f]/20">
            <div className="flex items-center gap-10">
              <span>&copy; {new Date().getFullYear()} NexavirBio AG.</span>
              <Link href="#" className="hover:text-[#0a1a2f] transition-colors">
                Clinical_Protocols
              </Link>
              <Link href="#" className="hover:text-[#0a1a2f] transition-colors">
                Regulatory_Terms
              </Link>
            </div>
            <div className="flex gap-10">
              <span>Basel // Boston // Singapore</span>
              <span>Crafted for Humanity</span>
            </div>
          </div>
        </div>
      </footer>

      {/* PIPELINE MODAL */}
      <AnimatePresence>
        {activePipeline !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-[#0a1a2f]/80 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setActivePipeline(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="bg-white border border-[#0066cc]/10 max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-md shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-square md:aspect-auto">
                <Image
                  src={PIPELINES[activePipeline].img}
                  alt="Pipeline"
                  fill
                  className="object-cover grayscale brightness-75 hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="p-12 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-[#0066cc] font-bold mb-4">
                    {PIPELINES[activePipeline].code} //{" "}
                    {PIPELINES[activePipeline].phase}
                  </div>
                  <h3 className="text-4xl font-black uppercase tracking-tighter text-[#0a1a2f] mb-6 leading-none">
                    {PIPELINES[activePipeline].name}
                  </h3>
                  <p className="text-sm text-[#0a1a2f]/40 leading-relaxed font-bold mb-10 italic">
                    "{PIPELINES[activePipeline].desc}"
                  </p>

                  <div className="grid grid-cols-1 gap-4 mb-10">
                    {PIPELINES[activePipeline].milestones.map((m, i) => (
                      <div
                        key={i}
                        className="flex justify-between text-xs border-b border-black/5 pb-2"
                      >
                        <span className="uppercase tracking-widest text-[#0a1a2f]/20 font-bold">
                          MILESTONE_0{i + 1}
                        </span>
                        <span className="font-bold text-[#0a1a2f]/60">{m}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <button className="w-full py-5 bg-[#0066cc] text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#0a1a2f] transition-all cursor-pointer">
                  Download_Full_Data_Package
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`::-webkit-scrollbar{width:4px;background:#f4f7fa}::-webkit-scrollbar-thumb{background:#0066cc20}`}</style>
    </div>
  );
}
