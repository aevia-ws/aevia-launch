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
import { ArrowRight, ArrowUpRight, Star, Check, Menu, X, MapPin, Phone, Mail, ChevronDown, ChevronRight, ShieldCheck, Globe, Clock, Quote, Search, ShoppingBag, Building2, Camera, Palette, Ruler, Layers, Activity } from "lucide-react";

import "../premium.css";

/* ==========================================================================
   DATA STRUCTURES
   ========================================================================= */

const PROPERTIES = [
  {
    id: 1,
    name: "Maison Dorée",
    type: "Private Villa",
    location: "Saint-Tropez, Côte d'Azur",
    price: "€ 8,400,000",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
    sqm: "680 m²",
    rooms: "7 rooms",
    features: [
      "Infinity Pool",
      "Private Beach Access",
      "Wine Cellar",
      "Heliport",
    ],
  },
  {
    id: 2,
    name: "Le Palais Blanc",
    type: "Penthouse",
    location: "Monaco, Fontvieille",
    price: "€ 14,200,000",
    img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
    sqm: "420 m²",
    rooms: "5 rooms",
    features: [
      "Panoramic Terrace",
      "Smart Home OS",
      "24/7 Concierge",
      "Private Lift",
    ],
  },
  {
    id: 3,
    name: "Château Lumière",
    type: "Historic Estate",
    location: "Bordeaux, Aquitaine",
    price: "€ 22,800,000",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
    sqm: "1,240 m²",
    rooms: "18 rooms",
    features: ["Vineyard", "Equestrian Center", "Guest Wing", "Art Gallery"],
  },
];

const ATELIER_PROCESS = [
  {
    step: "01",
    title: "Mandate Scoping",
    desc: "We define the architectural, geographical, and fiscal boundaries of your search or sale.",
  },
  {
    step: "02",
    title: "Off-Market Sourcing",
    desc: "Accessing 65% of ultra-prime inventory that never hits public portals.",
  },
  {
    step: "03",
    title: "Architectural Audit",
    desc: "A full structural and aesthetic assessment by our partner design studios.",
  },
  {
    step: "04",
    title: "Fiscal Navigation",
    desc: "Coordinating with tax and legal specialists across multiple jurisdictions.",
  },
];

const GLOBAL_HUBS = [
  {
    city: "Paris",
    region: "Western Europe",
    status: "Active",
    lead: "Jean-Luc Moreau",
  },
  {
    city: "Monaco",
    region: "Mediterranean",
    status: "Active",
    lead: "Sasha Volkov",
  },
  {
    city: "New York",
    region: "North America",
    status: "Active",
    lead: "Elena Vance",
  },
  {
    city: "Tokyo",
    region: "Asia Pacific",
    status: "Active",
    lead: "Kenji Sato",
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

export default function LumiereEstatesPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProperty, setActiveProperty] = useState<number | null>(null);

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
      className="premium-theme min-h-screen bg-[#fcfbf9] text-[#1a1a1a] font-serif selection:bg-[#c9a96e] selection:text-white overflow-x-hidden"
      style={{ scrollBehavior: "smooth" }}
    >
      {/* ==========================================
          NAVIGATION
          ========================================== */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${scrolled ? "bg-white/90 backdrop-blur-md py-4 border-b border-black/5" : "bg-transparent py-10"}`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link
            href="/"
            className="text-xl md:text-2xl font-bold tracking-[0.2em] uppercase flex items-center gap-4"
          >
            <div className="w-8 h-8 bg-[#c9a96e] flex items-center justify-center text-white">
              <Building2 className="w-4 h-4" />
            </div>
            LUMIÈRE
          </Link>

          <div className="hidden lg:flex items-center gap-10 text-[10px] font-bold uppercase tracking-[0.3em] text-black/40">
            <Link href="#" className="hover:text-[#c9a96e] transition-colors">
              Portfolio
            </Link>
            <Link href="#" className="hover:text-[#c9a96e] transition-colors">
              Atelier
            </Link>
            <Link href="#" className="hover:text-[#c9a96e] transition-colors">
              Hubs
            </Link>
            <Link href="#" className="hover:text-[#c9a96e] transition-colors">
              Reports
            </Link>
          </div>

          <div className="flex items-center gap-8">
            <button className="hidden md:block hover:text-[#c9a96e] transition-colors text-black/30">
              <Search className="w-5 h-5" />
            </button>
            <button className="px-8 py-3 bg-[#1a1a1a] text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#c9a96e] transition-all">
              Private_Access
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
            className="fixed inset-0 z-[100] bg-[#fcfbf9] p-8 pt-32 flex flex-col border-l border-black/5"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-10 right-8"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="flex flex-col gap-10 text-5xl font-light italic tracking-tighter uppercase">
              <Link href="#" onClick={() => setMenuOpen(false)}>
                Portfolio
              </Link>
              <Link href="#" onClick={() => setMenuOpen(false)}>
                Atelier
              </Link>
              <Link href="#" onClick={() => setMenuOpen(false)}>
                Hubs
              </Link>
              <Link href="#" onClick={() => setMenuOpen(false)}>
                Reports
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==========================================
          1. HERO (Cinematic)
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
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80"
            alt="Luxury Real Estate Hero"
            fill
            className="object-cover grayscale brightness-90"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#fcfbf9] via-[#fcfbf9]/20 to-transparent" />
        </motion.div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full">
          <Reveal>
            <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-[#c9a96e] mb-8 block">
              Exclusive Real Estate Atelier
            </span>
            <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-bold leading-[0.85] tracking-tighter mb-12">
              Architecture <br />{" "}
              <span className="italic font-light text-[#c9a96e]">
                of Desire.
              </span>
            </h1>
            <p className="max-w-xl text-lg md:text-xl text-black/50 leading-relaxed font-light mb-12 italic">
              Ultra-prime properties curated for those who understand that a
              home is more than an address — it is a declaration.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <MagneticBtn className="px-12 py-5 bg-[#1a1a1a] text-white text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-[#c9a96e] transition-all cursor-pointer shadow-xl">
                View Portfolio
              </MagneticBtn>
              <button className="px-12 py-5 border border-black/10 text-black text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-black hover:text-white transition-all cursor-pointer">
                Private Mandates
              </button>
            </div>
          </Reveal>
        </div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute bottom-10 right-12 hidden md:block"
        >
          <div className="flex items-center gap-8 text-[9px] font-bold uppercase tracking-[0.3em] text-black/30">
            <span>Saint-Tropez</span>
            <span>•</span>
            <span>Monaco</span>
            <span>•</span>
            <span>Positano</span>
          </div>
        </motion.div>
      </section>

      {/* ==========================================
          2. THE ATELIER (Process)
          ========================================== */}
      <section className="py-32 bg-[#fcfbf9] border-y border-black/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-32 items-center">
            <div className="lg:col-span-5">
              <Reveal>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#c9a96e] mb-6 block">
                  Our Approach
                </span>
                <h2 className="text-5xl md:text-7xl font-light tracking-tighter leading-tight mb-12 uppercase">
                  The <br />{" "}
                  <span className="italic font-normal text-[#c9a96e]">
                    Protocol.
                  </span>
                </h2>
                <p className="text-lg text-black/50 leading-relaxed font-light mb-16">
                  We operate with the silence and precision of a Swiss watch.
                  Our atelier doesn't just list properties; we manage the entire
                  architectural and fiscal lifecycle of a mandate.
                </p>

                <div className="space-y-12">
                  {ATELIER_PROCESS.map((item, i) => (
                    <div key={i} className="group flex gap-8">
                      <div className="text-4xl font-light italic text-[#c9a96e]/20 group-hover:text-[#c9a96e] transition-colors">
                        {item.step}
                      </div>
                      <div className="border-b border-black/5 pb-8 flex-1 group-last:border-0">
                        <h4 className="text-lg font-bold uppercase tracking-tight mb-2">
                          {item.title}
                        </h4>
                        <p className="text-sm text-black/40 leading-relaxed font-light italic">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Reveal className="relative aspect-square md:aspect-[4/5] rounded-sm overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80"
                  alt="Estates Detail"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-[#c9a96e]/5 mix-blend-multiply" />
                <div className="absolute bottom-10 left-10 right-10">
                  <div className="bg-white/95 backdrop-blur-md p-10 border border-black/5">
                    <Quote className="w-8 h-8 text-[#c9a96e] mb-6" />
                    <p className="text-2xl italic text-black/70 leading-relaxed font-light">
                      "Every mandate is handled with absolute discretion. We
                      specialize in the properties that the world never sees."
                    </p>
                    <div className="mt-8 flex items-center justify-between">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-[#c9a96e]">
                        Lumière Estates // Est. 2006
                      </div>
                      <div className="flex gap-2">
                        <div className="w-1.5 h-1.5 bg-[#c9a96e] rounded-full" />
                        <div className="w-1.5 h-1.5 bg-[#c9a96e]/30 rounded-full" />
                        <div className="w-1.5 h-1.5 bg-[#c9a96e]/30 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          3. FEATURED PORTFOLIO
          ========================================== */}
      <section className="py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
            <Reveal>
              <h2 className="text-5xl md:text-8xl font-light tracking-tighter uppercase leading-[0.9]">
                Exceptional <br /> <span className="italic">Inventory.</span>
              </h2>
            </Reveal>
            <p className="max-w-sm text-sm text-black/40 leading-relaxed italic font-light">
              A hand-picked selection of estates representing the pinnacle of
              architectural achievement across Europe and the Americas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {PROPERTIES.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.1}>
                <div
                  onClick={() => setActiveProperty(i)}
                  className="group cursor-pointer bg-[#fcfbf9] border border-black/5 hover:border-[#c9a96e]/40 transition-all p-1"
                >
                  <div className="relative aspect-[4/5] overflow-hidden mb-8">
                    <Image
                      src={p.img}
                      alt={p.name}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#fcfbf9] via-transparent to-transparent" />
                    <div className="absolute top-6 left-6">
                      <Badge className="bg-[#c9a96e] text-white rounded-none px-4 py-1 text-[9px] font-bold uppercase tracking-widest">
                        {p.type}
                      </Badge>
                    </div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="text-[9px] uppercase tracking-[0.4em] text-black/40 mb-2">
                        {p.location}
                      </div>
                      <h3 className="text-3xl font-bold uppercase tracking-tighter group-hover:text-[#c9a96e] transition-colors">
                        {p.name}
                      </h3>
                    </div>
                  </div>
                  <div className="p-8 pt-0">
                    <div className="flex items-center gap-6 mb-8 overflow-x-auto no-scrollbar">
                      {p.features.slice(0, 3).map((f, idx) => (
                        <span
                          key={idx}
                          className="text-[8px] uppercase tracking-widest text-black/30 font-bold whitespace-nowrap"
                        >
                          • {f}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between border-t border-black/5 pt-6">
                      <span className="text-xl font-bold text-black italic">
                        {p.price}
                      </span>
                      <button className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-[#c9a96e] group-hover:border-[#c9a96e] transition-all">
                        <ArrowUpRight className="w-4 h-4 group-hover:text-white transition-colors" />
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          4. GLOBAL HUBS (Locations)
          ========================================== */}
      <section className="py-32 bg-[#fcfbf9] border-y border-black/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <Reveal className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-[10px] uppercase tracking-[0.5em] font-black text-[#c9a96e] mb-6 block">
              Our Network
            </span>
            <h2 className="text-5xl md:text-7xl font-light tracking-tighter uppercase italic">
              Global Hubs.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {GLOBAL_HUBS.map((hub, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="p-10 bg-white border border-black/5 hover:border-[#c9a96e]/30 transition-all group">
                  <div className="flex items-center justify-between mb-10">
                    <h4 className="text-2xl font-bold uppercase tracking-tighter italic">
                      {hub.city}
                    </h4>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  </div>
                  <p className="text-[10px] uppercase tracking-widest text-black/40 font-bold mb-8">
                    {hub.region}
                  </p>
                  <div className="border-t border-black/5 pt-8">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-black/30 block mb-1">
                      Regional Lead
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest group-hover:text-[#c9a96e] transition-colors">
                      {hub.lead}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          5. ARTISAN PARTNERSHIPS
          ========================================== */}
      <section className="py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <Reveal>
                <span className="text-[10px] uppercase tracking-[0.5em] font-black text-[#c9a96e] mb-6 block">
                  The Collective
                </span>
                <h2 className="text-5xl md:text-7xl font-light tracking-tighter leading-tight mb-12 uppercase">
                  Beyond <br /> <span className="italic">Transaction.</span>
                </h2>
                <p className="text-lg text-black/50 leading-relaxed font-light mb-16 max-w-lg">
                  We partner with the world's most innovative architectural
                  studios and interior artisans to ensure that your acquisition
                  is optimized for its future potential.
                </p>

                <div className="grid grid-cols-2 gap-8">
                  {[
                    {
                      label: "Structural Audit",
                      icon: <Ruler className="w-5 h-5" />,
                    },
                    {
                      label: "Interior Curation",
                      icon: <Palette className="w-5 h-5" />,
                    },
                    {
                      label: "Aerial Survey",
                      icon: <Camera className="w-5 h-5" />,
                    },
                    {
                      label: "Legal Buffer",
                      icon: <ShieldCheck className="w-5 h-5" />,
                    },
                  ].map((feat, i) => (
                    <div
                      key={i}
                      className="flex flex-col gap-4 p-6 bg-[#fcfbf9] border border-black/5 hover:border-[#c9a96e]/30 transition-all"
                    >
                      <div className="text-[#c9a96e]">{feat.icon}</div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                        {feat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <Reveal className="relative aspect-square rounded-sm overflow-hidden shadow-2xl group">
              <Image
                src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80"
                alt="Partnerships"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-700" />
              <div className="absolute inset-0 p-12 flex flex-col justify-end">
                <div className="bg-white/10 backdrop-blur-lg p-10 border border-white/20 text-white">
                  <h3 className="text-3xl font-light uppercase tracking-tighter italic mb-4">
                    Market Intelligence.
                  </h3>
                  <p className="text-sm font-light leading-relaxed mb-8 opacity-70">
                    Access our quarterly H1 2026 report on ultra-prime European
                    residential trends.
                  </p>
                  <button className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest hover:text-[#c9a96e] transition-colors">
                    Download_Report <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ==========================================
          6. STATS (Counter)
          ========================================== */}
      <section className="py-24 bg-[#1a1a1a] text-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-2 lg:grid-cols-4 gap-16 text-center">
          {[
            { label: "Properties_Sold", val: 340, suffix: "+" },
            { label: "Transactions", val: 2, prefix: "€", suffix: "B+" },
            { label: "Years_Excellence", val: 18, suffix: "" },
            { label: "Client_Retention", val: 97, suffix: "%" },
          ].map((stat, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="text-5xl md:text-7xl font-bold text-[#c9a96e] mb-4">
                <Counter
                  to={stat.val}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </div>
              <div className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/40">
                {stat.label}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ==========================================
          7. FAQ (Accordion)
          ========================================== */}
      <section className="py-32 bg-[#fcfbf9]">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-light tracking-tighter leading-none uppercase italic">
              Intel_Buffer
            </h2>
          </Reveal>

          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                q: "What markets do you specialize in?",
                a: "We specialize in ultra-prime residential markets across the French Riviera, Monaco, Tuscany, and select Swiss Alpine destinations.",
              },
              {
                q: "How do you ensure privacy for high-profile clients?",
                a: "All transactions are handled with full NDA coverage and handled through our private off-market portfolio.",
              },
              {
                q: "Do you offer architectural visualization?",
                a: "Our atelier partners with leading studios to provide photorealistic renders and bespoke interior design consultations.",
              },
              {
                q: "What is your transaction timeline?",
                a: "For off-market properties, the process typically spans 60–90 days from initial inquiry to notarial signing.",
              },
            ].map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b border-black/5"
              >
                <AccordionTrigger className="text-left text-sm uppercase font-bold tracking-widest py-8 hover:text-[#c9a96e] hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-black/40 leading-relaxed font-light italic pb-8">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ==========================================
          8. MEGA FOOTER (Premium)
          ========================================== */}
      <footer className="bg-white pt-32 pb-12 px-6 md:px-12 border-t border-black/5 relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-32">
            <div className="lg:col-span-5">
              <Reveal>
                <div className="text-2xl font-bold tracking-[0.2em] uppercase mb-10 flex items-center gap-4">
                  <div className="w-7 h-7 bg-[#c9a96e] flex items-center justify-center text-white">
                    <Building2 className="w-3.5 h-3.5" />
                  </div>
                  LUMIÈRE
                </div>
                <p className="text-black/40 max-w-sm mb-12 uppercase tracking-[0.2em] text-[10px] font-bold leading-relaxed italic">
                  Exclusive Real Estate Atelier specializing in ultra-prime
                  properties and architectural mandates.
                </p>
                <form
                  className="relative max-w-md"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="email"
                    placeholder="AUTHENTICATED_EMAIL"
                    className="w-full bg-[#fcfbf9] border border-black/5 rounded-none px-6 py-4 text-xs font-bold outline-none focus:border-[#c9a96e] text-black transition-all uppercase tracking-widest"
                  />
                  <button
                    type="submit"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-[#c9a96e] hover:text-black transition-colors uppercase tracking-[0.3em]"
                  >
                    CONNECT
                  </button>
                </form>
              </Reveal>
            </div>

            <div className="lg:col-span-2 lg:col-start-7">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#c9a96e] mb-10">
                Inventory
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-black/30">
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#c9a96e] transition-colors"
                  >
                    Villas_Collection
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#c9a96e] transition-colors"
                  >
                    Penthouses_Luxury
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#c9a96e] transition-colors"
                  >
                    Historic_Estates
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#c9a96e] transition-colors"
                  >
                    Off_Market_Atlas
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#c9a96e] mb-10">
                Atelier
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-black/30">
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#c9a96e] transition-colors"
                  >
                    Our_Protocol
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#c9a96e] transition-colors"
                  >
                    Artisan_Network
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#c9a96e] transition-colors"
                  >
                    Market_Intel
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#c9a96e] transition-colors"
                  >
                    Privacy_Buffer
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#c9a96e] mb-10">
                Connect
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-black/30">
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#c9a96e] transition-colors flex items-center gap-3"
                  >
                    <Mail className="w-3 h-3" /> Paris_Studio
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#c9a96e] transition-colors flex items-center gap-3"
                  >
                    <Phone className="w-3 h-3" /> Monaco_Hub
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#c9a96e] transition-colors flex items-center gap-3"
                  >
                    <Globe className="w-3 h-3" /> NY_Gateway
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-10 border-t border-black/5 text-[9px] font-bold uppercase tracking-widest text-black/20">
            <div className="flex items-center gap-10">
              <span>&copy; {new Date().getFullYear()} Lumière Estates SA.</span>
              <Link href="#" className="hover:text-black transition-colors">
                Legal_Protocols
              </Link>
              <Link href="#" className="hover:text-black transition-colors">
                Mandate_Terms
              </Link>
            </div>
            <div className="flex gap-10">
              <span>Paris // Monaco // NY // Tokyo</span>
              <span>Crafted with Precision</span>
            </div>
          </div>
        </div>
      </footer>

      {/* PROPERTY MODAL */}
      <AnimatePresence>
        {activeProperty !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setActiveProperty(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="bg-[#fcfbf9] border border-black/10 max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-sm shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-square md:aspect-auto">
                <Image
                  src={PROPERTIES[activeProperty].img}
                  alt="Property"
                  fill
                  className="object-cover grayscale brightness-75 hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="p-12 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-[#c9a96e] font-bold mb-4">
                    {PROPERTIES[activeProperty].location} //{" "}
                    {PROPERTIES[activeProperty].type}
                  </div>
                  <h3 className="text-4xl font-bold uppercase tracking-tighter text-black mb-6 leading-none">
                    {PROPERTIES[activeProperty].name}
                  </h3>
                  <p className="text-sm text-black/40 leading-relaxed font-light mb-10 italic">
                    "An exceptional architectural statement offering
                    unparalleled views and the finest finishes by partner
                    artisans."
                  </p>

                  <div className="grid grid-cols-1 gap-4 mb-10">
                    {PROPERTIES[activeProperty].features.map((f, i) => (
                      <div
                        key={i}
                        className="flex justify-between text-xs border-b border-black/5 pb-2"
                      >
                        <span className="uppercase tracking-widest text-black/20 font-bold">
                          SPEC_0{i + 1}
                        </span>
                        <span className="font-bold text-black/60">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <button className="w-full py-5 bg-[#1a1a1a] text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#c9a96e] transition-all cursor-pointer">
                  Initialize_Mandate &mdash; {PROPERTIES[activeProperty].price}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`::-webkit-scrollbar{width:4px;background:#fcfbf9}::-webkit-scrollbar-thumb{background:#c9a96e20}`}</style>
    </div>
  );
}
