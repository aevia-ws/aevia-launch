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
import { ArrowRight, ArrowUpRight, Star, Check, Menu, X, Globe, Clock, Quote, Search, ShoppingBag, Activity, Mic2, Headphones, Speaker, Music, Volume2, Zap, Shield, Cpu, Bluetooth, Battery, Mail, MapPin, Phone, Plus } from "lucide-react";

import "../premium.css";

/* ==========================================================================
   DATA STRUCTURES
   ========================================================================= */

const PRODUCTS = [
  {
    id: 1,
    name: "AuraX Pro",
    tag: "Flagship Over-Ear",
    price: "$349",
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&q=80",
    color: "#ff5500",
    desc: "Reference-grade audio with 40mm beryllium-coated drivers.",
  },
  {
    id: 2,
    name: "NovaBuds",
    tag: "True Wireless",
    price: "$179",
    img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=1200&q=80",
    color: "#ff7733",
    desc: "Discrete excellence. ANC Pro with 24-bit studio sound.",
  },
  {
    id: 3,
    name: "PulseStudio",
    tag: "Studio Monitor",
    price: "$499",
    img: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=1200&q=80",
    color: "#cc3300",
    desc: "Flat response for professional mixing and mastering.",
  },
  {
    id: 4,
    name: "VoidAir",
    tag: "Open-Back",
    price: "$279",
    img: "https://images.unsplash.com/photo-1546435770-a3e736a8f706?w=1200&q=80",
    color: "#ff8844",
    desc: "Natural soundstage for home hi-fi enthusiasts.",
  },
];

const SPECS = [
  {
    label: "Frequency Range",
    val: "5Hz – 40kHz",
    icon: <Activity className="w-4 h-4" />,
  },
  {
    label: "Signal-Noise Ratio",
    val: "97dB",
    icon: <Volume2 className="w-4 h-4" />,
  },
  {
    label: "Total Harmonic Distortion",
    val: "<0.1%",
    icon: <Zap className="w-4 h-4" />,
  },
  {
    label: "Driver Density",
    val: "40mm Beryllium",
    icon: <Cpu className="w-4 h-4" />,
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

export default function SoniqAudioPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState<number | null>(null);

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
      className="premium-theme min-h-screen bg-black text-white font-sans selection:bg-[#ff5500] selection:text-white overflow-x-hidden"
      style={{ scrollBehavior: "smooth" }}
    >
      {/* ==========================================
          NAVIGATION
          ========================================== */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${scrolled ? "bg-black/95 backdrop-blur-md py-4 border-b border-white/5 shadow-lg" : "bg-transparent py-10"}`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#ff5500] flex items-center justify-center text-white shadow-[0_0_20px_rgba(255,85,0,0.5)]">
              <Volume2 className="w-4.5 h-4.5" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase text-white">
              SONIQ<span className="text-[#ff5500]">.</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-10 text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">
            <Link href="#" className="hover:text-[#ff5500] transition-colors">
              Sound
            </Link>
            <Link href="#" className="hover:text-[#ff5500] transition-colors">
              Products
            </Link>
            <Link href="#" className="hover:text-[#ff5500] transition-colors">
              Technology
            </Link>
            <Link href="#" className="hover:text-[#ff5500] transition-colors">
              Studio
            </Link>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden xl:flex flex-col items-end">
              <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">
                Hi-Res Audio Certified
              </span>
              <span className="text-[11px] font-bold text-[#ff5500] flex items-center gap-1">
                24-bit / 96kHz <Zap className="w-3 h-3" />
              </span>
            </div>
            <button className="px-8 py-3 bg-[#ff5500] text-white text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-white hover:text-black transition-all shadow-xl shadow-[#ff5500]/20">
              SHOP_NOW
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
            className="fixed inset-0 z-[100] bg-black p-8 pt-32 flex flex-col border-l border-white/5"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-10 right-8"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="flex flex-col gap-10 text-5xl font-black tracking-tighter uppercase">
              <Link href="#" onClick={() => setMenuOpen(false)}>
                Sound
              </Link>
              <Link href="#" onClick={() => setMenuOpen(false)}>
                Products
              </Link>
              <Link href="#" onClick={() => setMenuOpen(false)}>
                Tech
              </Link>
              <Link href="#" onClick={() => setMenuOpen(false)}>
                Studio
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==========================================
          1. HERO (Dark High-Contrast Audio)
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
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1600&q=80"
            alt="Audio Hero"
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/80" />
        </motion.div>

        {/* ORANGE GLOW */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#ff5500]/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full">
          <Reveal>
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#ff5500]/10 rounded-full border border-[#ff5500]/30 text-[#ff5500] text-[10px] font-bold uppercase tracking-widest mb-10 shadow-sm">
              <span className="w-2 h-2 bg-[#ff5500] rounded-full animate-pulse" />
              2026 Studio Collection — Drop 01
            </div>
            <h1 className="text-7xl md:text-9xl lg:text-[12rem] font-black leading-[0.8] tracking-tighter mb-12 uppercase">
              Pure <br /> <span className="text-[#ff5500]">Silence.</span>
            </h1>
            <p className="max-w-xl text-lg md:text-xl text-white/30 leading-relaxed font-bold mb-12 uppercase tracking-tight">
              Reference-grade wireless audio instruments engineered for purists
              who refuse to compromise on soundstage and fidelity.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <MagneticBtn className="px-12 py-5 bg-[#ff5500] text-white text-[10px] font-bold uppercase tracking-[0.4em] rounded-full hover:bg-white hover:text-black transition-all cursor-pointer shadow-2xl shadow-[#ff5500]/20">
                Shop the Collection
              </MagneticBtn>
              <button className="px-12 py-5 border border-white/10 text-white text-[10px] font-bold uppercase tracking-[0.4em] rounded-full hover:bg-white hover:text-black transition-all cursor-pointer">
                Watch Film
              </button>
            </div>
          </Reveal>
        </div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute bottom-10 right-12 hidden md:block"
        >
          <div className="flex flex-col items-end gap-3">
            <span className="text-[9px] font-bold text-white/10 uppercase tracking-[0.5em]">
              Berlin // London // Tokyo
            </span>
            <div className="w-32 h-[1px] bg-[#ff5500]/20" />
          </div>
        </motion.div>
      </section>

      {/* ==========================================
          2. THE SONIC CORE (Driver Deep Dive)
          ========================================== */}
      <section className="py-32 bg-black border-y border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-32 items-center">
            <div className="lg:col-span-5">
              <Reveal>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#ff5500] mb-6 block">
                  Acoustic Science
                </span>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight mb-12 text-white uppercase">
                  Beryllium <br />{" "}
                  <span className="text-[#ff5500]">Fidelity.</span>
                </h2>
                <p className="text-lg text-white/30 leading-relaxed font-bold mb-16 uppercase tracking-tight italic">
                  Our 40mm beryllium-coated dynamic drivers deliver a frequency
                  response of 5Hz–40kHz, hand-tuned in our Berlin lab.
                </p>

                <div className="space-y-10">
                  {[
                    {
                      label: "Driver Density",
                      val: "40mm",
                      suffix: " Beryllium",
                      desc: "Proprietary coating for extreme stiffness and zero distortion.",
                    },
                    {
                      label: "Frequency Range",
                      val: "5-40k",
                      suffix: " Hz",
                      desc: "Hear beyond human range for ultimate harmonic detail.",
                    },
                    {
                      label: "Total Distortion",
                      val: "<0.1",
                      suffix: "%",
                      desc: "Purity levels that redefine wireless expectations.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="group border-l border-[#ff5500]/20 pl-8 hover:border-[#ff5500] transition-all"
                    >
                      <h4 className="text-sm font-bold uppercase tracking-tight mb-2 text-white/60">
                        {item.label}
                      </h4>
                      <div className="text-3xl font-black text-[#ff5500] mb-2 uppercase italic">
                        {item.val}
                        {item.suffix}
                      </div>
                      <p className="text-[10px] text-white/20 leading-relaxed font-bold uppercase tracking-widest">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Reveal className="relative aspect-square rounded-full overflow-hidden shadow-2xl border-8 border-white/5 bg-[#0a0a0a] p-12 group">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,85,0,0.1)_0%,transparent_70%)] animate-pulse" />
                <div className="relative h-full w-full border border-white/5 rounded-full flex items-center justify-center overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1546435770-a3e736a8f706?w=1200&q=80"
                    alt="Driver Detail"
                    fill
                    className="object-cover opacity-40 group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="relative z-10 text-center">
                    <div className="text-5xl font-black text-[#ff5500] mb-2 italic">
                      ANC PRO
                    </div>
                    <div className="text-[10px] font-bold text-white uppercase tracking-[0.5em]">
                      -42dB NOISE FLOOR
                    </div>
                  </div>
                </div>

                {/* ORBITING STATS */}
                <div className="absolute inset-0 animate-spin-slow pointer-events-none">
                  <div className="absolute top-10 left-1/2 -translate-x-1/2 p-4 bg-black border border-[#ff5500]/30 text-[#ff5500] text-[9px] font-bold uppercase tracking-widest rounded-full">
                    Tuned in Berlin
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          3. PRODUCTS (Vertical Scroll)
          ========================================== */}
      <section className="py-32 bg-black">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
            <Reveal>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9] text-white">
                The <br /> <span className="text-[#ff5500]">Instruments.</span>
              </h2>
            </Reveal>
            <p className="max-w-sm text-sm text-white/30 leading-relaxed font-bold uppercase tracking-widest italic">
              From the studio to the street. Every Soniq product is a
              masterclass in acoustic architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PRODUCTS.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.1}>
                <div
                  onClick={() => setActiveProduct(i)}
                  className="group cursor-pointer bg-[#0a0a0a] border border-white/5 hover:border-[#ff5500]/40 transition-all rounded-3xl p-4 shadow-sm overflow-hidden"
                >
                  <div className="relative aspect-square rounded-2xl overflow-hidden mb-8">
                    <Image
                      src={p.img}
                      alt={p.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="px-4 pb-4">
                    <span className="text-[10px] uppercase tracking-widest text-[#ff5500] font-black mb-2 block">
                      {p.tag}
                    </span>
                    <h3 className="text-2xl font-black uppercase tracking-tight mb-4">
                      {p.name}
                    </h3>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-black text-white/40 italic">
                        {p.price}
                      </span>
                      <button className="p-3 bg-[#ff5500] text-black rounded-full hover:bg-white transition-all">
                        <Plus className="w-4 h-4" />
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
          4. WIRELESS PROTOCOL (Tech Section)
          ========================================== */}
      <section className="py-32 bg-[#0a0a0a] border-y border-white/5 relative">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <Zap className="w-full h-full text-[#ff5500]" />
        </div>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <Reveal className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/5 bg-black p-1">
              <div className="relative h-full w-full overflow-hidden rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=1200&q=80"
                  alt="Tech"
                  fill
                  className="object-cover brightness-50"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Bluetooth className="w-16 h-16 text-[#ff5500] mx-auto mb-6 animate-pulse" />
                    <h4 className="text-3xl font-black uppercase tracking-tighter text-white">
                      Lossless Link.
                    </h4>
                  </div>
                </div>
              </div>
            </Reveal>

            <div>
              <Reveal>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#ff5500] mb-6 block">
                  Connectivity Engine
                </span>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight mb-12 uppercase text-white">
                  Zero <br /> <span className="text-[#ff5500]">Lag.</span>
                </h2>
                <p className="text-lg text-white/30 leading-relaxed font-bold mb-16 max-w-lg italic uppercase tracking-tight">
                  Supporting aptX Adaptive and LDAC for 24-bit/96kHz wireless
                  streaming. Latency compressed to 40ms for real-time
                  monitoring.
                </p>

                <div className="space-y-6">
                  {[
                    {
                      label: "Streaming Protocol",
                      icon: <Bluetooth className="w-4 h-4" />,
                      val: "LDAC 990kbps",
                    },
                    {
                      label: "Battery Endurance",
                      icon: <Battery className="w-4 h-4" />,
                      val: "38h (ANC On)",
                    },
                    {
                      label: "Signal Integrity",
                      icon: <Shield className="w-4 h-4" />,
                      val: "FIPS 140-2",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-6 bg-white/[0.02] border border-white/5 hover:border-[#ff5500]/30 transition-all rounded-xl"
                    >
                      <div className="flex items-center gap-6">
                        <div className="text-[#ff5500]">{item.icon}</div>
                        <div>
                          <h4 className="text-sm font-black uppercase tracking-tight text-white">
                            {item.label}
                          </h4>
                          <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">
                            Active System
                          </span>
                        </div>
                      </div>
                      <span className="text-[11px] font-black text-[#ff5500] italic uppercase">
                        {item.val}
                      </span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          5. CUSTOMIZATION SUITE (Replaceable Parts)
          ========================================== */}
      <section className="py-32 bg-black">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <Reveal className="max-w-2xl mx-auto mb-20">
            <span className="text-[10px] uppercase tracking-[0.5em] font-black text-[#ff5500] mb-6 block">
              The Atelier
            </span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic mb-8">
              User Modular.
            </h2>
            <p className="text-white/20 italic font-medium leading-relaxed">
              Every component of Soniq headphones is replaceable. From the
              carbon fiber headband to the lambskin pads — built for a lifetime.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Carbon Fiber Band",
                img: "https://images.unsplash.com/photo-1546435770-a3e736a8f706?w=800&q=80",
                tag: "Structural",
              },
              {
                title: "Lambskin Pads",
                img: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80",
                tag: "Comfort",
              },
              {
                title: "Ceramic Shells",
                img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
                tag: "Acoustics",
              },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden group">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all" />
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <span className="text-[9px] font-bold text-[#ff5500] uppercase tracking-widest mb-2">
                      {item.tag}
                    </span>
                    <h4 className="text-3xl font-black uppercase tracking-tighter italic text-white">
                      {item.title}
                    </h4>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          6. STATS (Counter)
          ========================================== */}
      <section className="py-24 bg-[#0a0a0a] border-y border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-2 lg:grid-cols-4 gap-16 text-center">
          {[
            { label: "Frequency_Res", val: 40000, suffix: " Hz" },
            { label: "Signal_Purity", val: 97, suffix: " dB" },
            { label: "Battery_Life", val: 38, suffix: " H" },
            { label: "Driver_Size", val: 40, suffix: " mm" },
          ].map((stat, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="text-5xl md:text-7xl font-black text-[#ff5500] mb-4 italic tabular-nums">
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
          7. FAQ (Accordion)
          ========================================== */}
      <section className="py-32 bg-black">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-none uppercase italic text-white">
              Sonic_Buffer
            </h2>
          </Reveal>

          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                q: "What codecs are supported?",
                a: "Soniq supports aptX Adaptive, LDAC, AAC, and SBC for universal hi-res compatibility.",
              },
              {
                q: "How long is the warranty?",
                a: "Every product includes a 2-year international warranty, extendable to 5 years via Soniq+.",
              },
              {
                q: "Are the ear pads replaceable?",
                a: "Yes, our modular design allows for user-level replacement of pads, cables, and headbands.",
              },
              {
                q: "Is there a studio discount?",
                a: "Verified professionals and students can apply for the Soniq Studio program for exclusive pricing.",
              },
            ].map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b border-white/10"
              >
                <AccordionTrigger className="text-left text-sm uppercase font-bold tracking-widest py-8 hover:text-[#ff5500] hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-white/40 leading-relaxed font-bold uppercase tracking-widest pb-8 italic">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ==========================================
          8. MEGA FOOTER (Cyber-Premium)
          ========================================== */}
      <footer className="bg-[#0a0a0a] pt-32 pb-12 px-6 md:px-12 border-t border-white/5 relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-32">
            <div className="lg:col-span-5">
              <Reveal>
                <div className="text-xl font-black tracking-tighter uppercase mb-10 flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#ff5500] flex items-center justify-center text-white shadow-[0_0_20px_rgba(255,85,0,0.3)]">
                    <Volume2 className="w-4 h-4" />
                  </div>
                  SONIQ<span className="text-[#ff5500]">.</span>
                </div>
                <p className="text-white/20 max-w-sm mb-12 uppercase tracking-widest text-[10px] font-bold leading-relaxed italic">
                  Reference-grade audio instruments for those who refuse to
                  compromise on soundstage and fidelity.
                </p>
                <form
                  className="relative max-w-md"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="email"
                    placeholder="AUTHENTICATE_EMAIL"
                    className="w-full bg-white/[0.02] border border-white/5 rounded-none px-6 py-4 text-xs font-bold outline-none focus:border-[#ff5500] text-white transition-all uppercase tracking-widest"
                  />
                  <button
                    type="submit"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-[#ff5500] hover:text-white transition-colors uppercase tracking-[0.3em]"
                  >
                    ENROLL
                  </button>
                </form>
              </Reveal>
            </div>

            <div className="lg:col-span-2 lg:col-start-7">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#ff5500] mb-10">
                Instruments
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/20">
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#ff5500] transition-colors"
                  >
                    AuraX_Series
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#ff5500] transition-colors"
                  >
                    NovaBuds_Wireless
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#ff5500] transition-colors"
                  >
                    PulseStudio_Refs
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#ff5500] transition-colors"
                  >
                    Accessory_Vault
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#ff5500] mb-10">
                Studio
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/20">
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#ff5500] transition-colors"
                  >
                    Pro_Inquiry
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#ff5500] transition-colors"
                  >
                    Acoustic_Labs
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#ff5500] transition-colors"
                  >
                    Artist_Manifesto
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#ff5500] transition-colors"
                  >
                    Legacy_Support
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#ff5500] mb-10">
                Connect
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/20">
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#ff5500] transition-colors flex items-center gap-3"
                  >
                    <Globe className="w-3 h-3" /> Globe
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#ff5500] transition-colors flex items-center gap-3"
                  >
                    <Globe className="w-3 h-3" /> X_Protocol
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#ff5500] transition-colors flex items-center gap-3"
                  >
                    <Mail className="w-3 h-3" /> Contact_IR
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-10 border-t border-white/5 text-[9px] font-bold uppercase tracking-widest text-white/10">
            <div className="flex items-center gap-10">
              <span>&copy; {new Date().getFullYear()} Soniq Audio GmbH.</span>
              <Link href="#" className="hover:text-white transition-colors">
                Regulatory_Terms
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Privacy_Buffer
              </Link>
            </div>
            <div className="flex gap-10">
              <span>Berlin // London // Tokyo</span>
              <span>Feel the Silence</span>
            </div>
          </div>
        </div>
      </footer>

      {/* PRODUCT MODAL */}
      <AnimatePresence>
        {activeProduct !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6"
            onClick={() => setActiveProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="bg-[#0a0a0a] border border-white/10 max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-3xl shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveProduct(null)}
                className="absolute top-8 right-8 text-white/20 hover:text-[#ff5500] transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="relative aspect-square md:aspect-auto">
                <Image
                  src={PRODUCTS[activeProduct].img}
                  alt="Product"
                  fill
                  className="object-cover brightness-75"
                />
              </div>
              <div className="p-12 flex flex-col justify-between bg-[#0a0a0a]">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-[#ff5500] font-black mb-4">
                    Studio Gear // {PRODUCTS[activeProduct].tag}
                  </div>
                  <h3 className="text-4xl font-black uppercase tracking-tighter italic text-white mb-6 leading-none">
                    {PRODUCTS[activeProduct].name}
                  </h3>
                  <p className="text-sm text-white/30 leading-relaxed font-bold mb-10 italic">
                    "{PRODUCTS[activeProduct].desc}"
                  </p>

                  <div className="grid grid-cols-1 gap-4 mb-10">
                    {SPECS.map((s, i) => (
                      <div
                        key={i}
                        className="flex justify-between text-xs border-b border-white/5 pb-2"
                      >
                        <div className="flex items-center gap-2">
                          <div className="text-[#ff5500]">{s.icon}</div>
                          <span className="uppercase tracking-widest text-white/20 font-bold">
                            {s.label}
                          </span>
                        </div>
                        <span className="font-bold text-white/60">{s.val}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <button className="w-full py-5 bg-[#ff5500] text-black text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-all cursor-pointer">
                    Add_To_Bag — {PRODUCTS[activeProduct].price}
                  </button>
                  <button className="w-full py-5 border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#ff5500] hover:text-black transition-all cursor-pointer">
                    Find_In_Store
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`::-webkit-scrollbar{width:4px;background:black}::-webkit-scrollbar-thumb{background:#ff550020}`}</style>
    </div>
  );
}
