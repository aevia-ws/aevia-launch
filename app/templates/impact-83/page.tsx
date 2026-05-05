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
import { Gem, Sparkles, Wand2, Zap, Globe, Activity, Terminal, Box, Share2, Layers, Maximize, Monitor, MousePointer2, Navigation, Wifi, Shield, ShoppingBag, Search, Star, Mail, Phone, Check, Menu, X, MapPin, Clock, Lock, Plus, Bell, Settings, ArrowRight, ArrowUpRight, ChevronRight, Eye, PenTool, Clock3, History, Award } from "lucide-react";

import "../premium.css";

/* ==========================================================================
   DATA STRUCTURES
   ========================================================================= */

const PIECES = [
  {
    id: 1,
    name: "AURELIUS_NOIRE",
    category: "High Jewelry",
    price: "€85,000",
    img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&q=80",
    desc: "18k white gold necklace featuring a central 5-carat ethically sourced black diamond.",
  },
  {
    id: 2,
    name: "LUNAR_ORBIT",
    category: "Timepiece",
    price: "€120,000",
    img: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=1200&q=80",
    desc: "Manual-wind mechanical movement with a hand-engraved lunar phase complication.",
  },
  {
    id: 3,
    name: "SOLAR_BAND",
    category: "Bespoke",
    price: "€12,500",
    img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&q=80",
    desc: "Recycled yellow gold band with pavé-set solar-spectrum yellow sapphires.",
  },
];

const HERITAGE_TIMELINE = [
  {
    year: "1882",
    event: "Foundation of the Aurelius Atelier in Geneva by Marcus Aurelius.",
  },
  {
    year: "1924",
    event: "Invention of the 'Floating Set' technique for rare gemstones.",
  },
  {
    year: "1978",
    event: "Opening of the flagship boutique on Place Vendôme, Paris.",
  },
  {
    year: "2026",
    event: "Introduction of the Ethical Blockchain Provenance Protocol.",
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

export default function HeritageOSPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePiece, setActivePiece] = useState<number | null>(null);

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
      className="premium-theme min-h-screen bg-[#0a0a0c] text-[#f4f4f5] font-serif selection:bg-amber-900 selection:text-white overflow-x-hidden"
      style={{ scrollBehavior: "smooth" }}
    >
      {/* ==========================================
          NAVIGATION
          ========================================== */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-1000 ${scrolled ? "bg-black/95 backdrop-blur-xl py-4 border-b border-white/5" : "bg-transparent py-10"}`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="flex flex-col items-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-amber-600/40 mb-1">
              Maison.
            </span>
            <span className="text-xl md:text-2xl font-black tracking-tighter uppercase text-white">
              AURELIUS<span className="text-amber-900">.HERITAGE</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">
            <Link
              href="#collection"
              className="hover:text-amber-500 transition-colors"
            >
              Collection
            </Link>
            <Link
              href="#heritage"
              className="hover:text-amber-500 transition-colors"
            >
              Heritage
            </Link>
            <Link
              href="#provenance"
              className="hover:text-amber-500 transition-colors"
            >
              Provenance
            </Link>
            <Link
              href="#bespoke"
              className="hover:text-amber-500 transition-colors"
            >
              Bespoke
            </Link>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden xl:flex flex-col items-end">
              <span className="text-[9px] font-bold text-white/10 uppercase tracking-widest">
                Geneva // Paris // NYC
              </span>
              <span className="text-[11px] font-black text-amber-500 flex items-center gap-1">
                CERTIFIED_ATELIER <Award className="w-3 h-3" />
              </span>
            </div>
            <MagneticBtn className="px-8 py-3 bg-white text-black text-[10px] font-bold uppercase tracking-widest rounded-none hover:bg-amber-900 hover:text-white transition-all shadow-xl">
              BOOK_VIEWING
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
              className="absolute top-10 right-8 text-stone-300"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="flex flex-col gap-10 text-5xl font-black tracking-tighter uppercase italic text-amber-900/50">
              <Link href="#collection" onClick={() => setMenuOpen(false)}>
                Collection
              </Link>
              <Link href="#heritage" onClick={() => setMenuOpen(false)}>
                Heritage
              </Link>
              <Link href="#provenance" onClick={() => setMenuOpen(false)}>
                Provenance
              </Link>
              <Link href="#bespoke" onClick={() => setMenuOpen(false)}>
                Bespoke
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
            src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1600&q=80"
            alt="Heritage Hero"
            fill
            className="object-cover brightness-50 contrast-125"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent" />
        </motion.div>

        {/* AMBER RADIANT GLOW */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-amber-900/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full">
          <Reveal>
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-amber-900/20 rounded-none border border-amber-900/40 text-amber-500 text-[10px] font-bold uppercase tracking-widest mb-10 shadow-sm">
              <Gem className="w-3.5 h-3.5" />
              Maison de Haute Joaillerie // Est. 1882
            </div>
            <h1 className="text-7xl md:text-9xl lg:text-[11rem] font-black leading-[0.85] tracking-tighter mb-12 uppercase">
              The Weight <br />{" "}
              <span className="text-amber-900 italic">of Legacy.</span>
            </h1>
            <p className="max-w-xl text-lg md:text-xl text-white/20 leading-relaxed font-bold mb-12 uppercase tracking-tight italic">
              Mastering the molecular brilliance of rare earth minerals. A
              century of artisanal precision, refined for the modern elite.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <MagneticBtn className="px-12 py-5 bg-white text-black text-[10px] font-bold uppercase tracking-[0.4em] rounded-none hover:bg-amber-900 hover:text-white transition-all cursor-pointer shadow-2xl">
                Explore The Vault
              </MagneticBtn>
              <button className="px-12 py-5 border border-white/10 text-white text-[10px] font-bold uppercase tracking-[0.4em] rounded-none hover:bg-white hover:text-black transition-all cursor-pointer">
                Provenance_Report
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
              AURELIUS_HERITAGE_OS // CORE_083
            </span>
            <div className="w-32 h-[1px] bg-amber-900/40" />
          </div>
        </motion.div>
      </section>

      {/* ==========================================
          2. THE VAULT (Collection Grid)
          ========================================== */}
      <section
        id="collection"
        className="py-32 bg-[#0a0a0c] border-y border-white/5"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
            <Reveal>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9] text-white">
                The <br /> <span className="text-amber-900 italic">Vault.</span>
              </h2>
            </Reveal>
            <p className="max-w-sm text-sm text-white/10 leading-relaxed font-bold uppercase tracking-widest italic text-right">
              Our non-exhaustive collection of high-jewelry artifacts. Each
              piece is a unique geological certificate of prestige.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {PIECES.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.1}>
                <div
                  onClick={() => setActivePiece(i)}
                  className="group cursor-pointer bg-white/[0.01] border border-white/5 hover:border-amber-900/40 transition-all rounded-none p-8 shadow-sm h-full flex flex-col justify-between overflow-hidden"
                >
                  <div>
                    <div className="relative aspect-[4/5] mb-10 overflow-hidden">
                      <Image
                        src={p.img}
                        alt={p.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-1000 grayscale-[0.2] group-hover:grayscale-0"
                      />
                      <div className="absolute inset-0 bg-amber-900/10 mix-blend-overlay" />
                      <div className="absolute top-6 left-6">
                        <Badge className="bg-amber-900 text-white border-none text-[8px] font-black tracking-widest uppercase px-3 py-1">
                          {p.category}
                        </Badge>
                      </div>
                    </div>
                    <h3 className="text-2xl font-black uppercase tracking-tighter text-white italic mb-4">
                      {p.name}
                    </h3>
                    <div className="text-[10px] font-black text-amber-900 uppercase tracking-widest mb-6">
                      {p.price}
                    </div>
                    <p className="text-[10px] text-white/20 leading-relaxed font-bold uppercase tracking-widest mb-10 italic">
                      {p.desc}
                    </p>
                  </div>
                  <button className="flex items-center gap-4 text-[9px] font-black uppercase tracking-widest text-stone-500 group-hover:text-white transition-colors">
                    INSPECT_SPECIMEN <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          3. HERITAGE (Timeline)
          ========================================== */}
      <section id="heritage" className="py-32 bg-[#0a0a0c]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-32 items-center">
            <div className="lg:col-span-5">
              <Reveal>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-amber-900 mb-6 block">
                  Artisan Lineage
                </span>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight mb-12 text-white uppercase italic">
                  Chronicle <br />{" "}
                  <span className="text-amber-900 not-italic">Heritage.</span>
                </h2>
                <p className="text-lg text-white/20 leading-relaxed font-bold mb-16 uppercase tracking-tight italic">
                  Since 1882, Maison Aurelius has defined the upper echelon of
                  gemstone architecture. A legacy of precision, born in Geneva.
                </p>

                <div className="space-y-12">
                  {HERITAGE_TIMELINE.map((item, i) => (
                    <div
                      key={i}
                      className="group border-l border-amber-900/20 pl-8 hover:border-amber-900 transition-all"
                    >
                      <h4 className="text-xl font-black uppercase tracking-tight mb-2 text-amber-900 italic">
                        {item.year}
                      </h4>
                      <p className="text-[11px] text-white/30 leading-relaxed font-bold uppercase tracking-widest">
                        {item.event}
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
                    title: "GOLCONDA_AUDIT",
                    icon: <Gem className="w-6 h-6" />,
                  },
                  {
                    title: "CARAT_METRICS",
                    icon: <Activity className="w-6 h-6" />,
                  },
                  {
                    title: "FACET_OPTIMIZATION",
                    icon: <Layers className="w-6 h-6" />,
                  },
                  {
                    title: "GENEVA_SEAL",
                    icon: <Shield className="w-6 h-6" />,
                  },
                ].map((t, i) => (
                  <div
                    key={i}
                    className="p-12 bg-white/[0.02] border border-white/5 rounded-none hover:border-amber-900 transition-all group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-amber-900/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="text-amber-900 mb-8">{t.icon}</div>
                    <h4 className="text-xl font-black uppercase text-white italic mb-4">
                      {t.title}
                    </h4>
                    <div className="h-1 w-0 bg-amber-900 group-hover:w-full transition-all duration-700" />
                  </div>
                ))}
                <div className="md:col-span-2 p-12 bg-amber-900/5 border border-amber-900/20 rounded-none mt-4 text-center">
                  <Clock3 className="w-8 h-8 text-amber-900 mx-auto mb-6" />
                  <h3 className="text-xl font-black uppercase tracking-tight text-white mb-4 italic">
                    Bespoke Concierge Protocol
                  </h3>
                  <p className="text-[10px] text-white/20 uppercase tracking-widest mb-8 leading-relaxed">
                    Appointments are strictly limited to verified collectors.
                    Our atelier in Geneva operates by institutional invitation
                    only.
                  </p>
                  <button className="px-12 py-4 bg-amber-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-none hover:bg-amber-800 transition-all shadow-xl">
                    REQUEST_INVITATION
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
      <section
        id="provenance"
        className="py-24 bg-[#0a0a0c] border-y border-white/5"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-2 lg:grid-cols-4 gap-16 text-center">
          {[
            { label: "Active_Ateliers", val: 3, suffix: "" },
            { label: "Gemstone_Archive", val: 1250, suffix: "+" },
            { label: "Artisans_Intern", val: 12, suffix: "" },
            { label: "Atelier_Valuation", val: 4.2, suffix: " B" },
          ].map((stat, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="text-5xl md:text-7xl font-black text-amber-900 mb-4 italic tabular-nums">
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
      <section id="bespoke" className="py-32 bg-[#0a0a0c]">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-none uppercase italic text-white">
              Heritage_Buffer
            </h2>
          </Reveal>

          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                q: "What is your ethical sourcing protocol?",
                a: "Every gemstone in the Aurelius Vault is backed by our 'Ethical Blockchain Provenance Protocol'. We track each stone from the mine to the final setting, ensuring zero environmental or human conflict.",
              },
              {
                q: "Do you offer international viewings?",
                a: "We operate secure viewings in our Geneva, Paris, and New York ateliers. For high-value acquisitions, our 'Aurelius Fly-In' concierge can arrange private viewings in your preferred global location.",
              },
              {
                q: "What is the process for bespoke commissions?",
                a: "Bespoke projects begin with a molecular audit of the client's preferred gemstone profile. Our master artisans then draft three architectural concepts before moving into 1:1 wax modeling and final gold-smithing.",
              },
              {
                q: "How are high-jewelry pieces appraised?",
                a: "All pieces are appraised by the GIA (Gemological Institute of America) and our internal 'Heritage Council'. We provide a multi-layered certificate of authenticity and institutional valuation reports.",
              },
            ].map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b border-white/5"
              >
                <AccordionTrigger className="text-left text-sm uppercase font-bold tracking-widest py-8 hover:text-amber-500 hover:no-underline">
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
                    Maison.
                  </span>
                  <span className="text-2xl font-black tracking-tighter uppercase text-white">
                    AURELIUS<span className="text-amber-900">.HERITAGE</span>
                  </span>
                </div>
                <p className="text-white/20 max-w-sm mb-12 uppercase tracking-widest text-[10px] font-bold leading-relaxed italic">
                  The structural infrastructure for the next generation of
                  high-jewelry. Est. 1882. Precision distilled. Globally
                  distributed.
                </p>
                <form
                  className="relative max-w-md"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="email"
                    placeholder="ACCESS_THE_MANIFESTO"
                    className="w-full bg-white/[0.02] border border-white/5 rounded-none px-6 py-4 text-xs font-bold outline-none focus:border-amber-900 text-white transition-all uppercase tracking-widest"
                  />
                  <button
                    type="submit"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-amber-900 hover:text-white transition-colors uppercase tracking-[0.3em]"
                  >
                    ACCESS
                  </button>
                </form>
              </Reveal>
            </div>

            <div className="lg:col-span-2 lg:col-start-7">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-amber-900 mb-10">
                The Vault
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/20">
                <li>
                  <Link
                    href="#"
                    className="hover:text-amber-500 transition-colors"
                  >
                    High_Jewelry
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-amber-500 transition-colors"
                  >
                    Master_Watches
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-amber-500 transition-colors"
                  >
                    Bespoke_Atelier
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-amber-500 transition-colors"
                  >
                    Rare_Specimens
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-amber-900 mb-10">
                Heritage
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/20">
                <li>
                  <Link
                    href="#"
                    className="hover:text-amber-500 transition-colors"
                  >
                    Geneva_Lineage
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-amber-500 transition-colors"
                  >
                    Ethical_Protocol
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-amber-500 transition-colors"
                  >
                    Atelier_Tour
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-amber-500 transition-colors"
                  >
                    Concierge
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-amber-900 mb-10">
                Network
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/20">
                <li>
                  <Link
                    href="#"
                    className="hover:text-amber-500 transition-colors flex items-center gap-3"
                  >
                    <Globe className="w-3 h-3" /> Globe
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-amber-500 transition-colors flex items-center gap-3"
                  >
                    <Globe className="w-3 h-3" /> X_Entropy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-amber-500 transition-colors flex items-center gap-3"
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
                &copy; {new Date().getFullYear()} AURELIUS HERITAGE Group.
              </span>
              <Link href="#" className="hover:text-white transition-colors">
                Regulatory_Terms
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Privacy_Buffer
              </Link>
            </div>
            <div className="flex gap-10">
              <span>Geneva // Paris // NYC</span>
              <span>In Craft We Trust</span>
            </div>
          </div>
        </div>
      </footer>

      {/* PIECE MODAL */}
      <AnimatePresence>
        {activePiece !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/98 backdrop-blur-3xl flex items-center justify-center p-6"
            onClick={() => setActivePiece(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="bg-[#0e0e11] border border-white/10 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 overflow-hidden rounded-none shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActivePiece(null)}
                className="absolute top-8 right-8 text-white/20 hover:text-amber-900 transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>

              {/* IMAGE AREA */}
              <div className="lg:col-span-8 relative aspect-video lg:aspect-auto bg-black">
                <Image
                  src={PIECES[activePiece].img}
                  alt="Piece"
                  fill
                  className="object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <h3 className="text-4xl font-black text-white italic">
                    {PIECES[activePiece].name}
                  </h3>
                </div>
              </div>

              {/* SIDEBAR AREA */}
              <div className="lg:col-span-4 p-8 flex flex-col justify-between bg-[#0e0e11] border-l border-white/5">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-amber-900 mb-6 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-900" />
                    Molecular Provenance Report
                  </div>
                  <div className="space-y-6 mb-12">
                    {[
                      { label: "Category", val: PIECES[activePiece].category },
                      { label: "Metal", val: "18K White Gold" },
                      { label: "Certification", val: "GIA Certified" },
                      { label: "Status", val: "IN_THE_VAULT" },
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
                    {PIECES[activePiece].desc}
                  </p>
                </div>

                <button className="w-full py-5 bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-amber-900 hover:text-white transition-all cursor-pointer shadow-xl">
                  REQUEST_PRIVATE_AUDIT
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        ::-webkit-scrollbar{width:4px;background:#0a0a0c}
        ::-webkit-scrollbar-thumb{background:rgba(120,53,15,0.2)}
      `}</style>
    </div>
  );
}
