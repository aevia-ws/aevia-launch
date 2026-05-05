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
import { ArrowRight, ArrowUpRight, Star, Check, Menu, X, Globe, Clock, Quote, Search, ShoppingBag, Box, Cpu, Eye, Layers, Maximize, Monitor, MousePointer2, Navigation, Radio, Shield, Smartphone, Terminal, Zap, MapPin, Phone, Mail } from "lucide-react";

import "../premium.css";

/* ==========================================================================
   DATA STRUCTURES
   ========================================================================= */

const ROOMS = [
  {
    id: 1,
    name: "The Obsidian Atrium",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80",
    area: "120m²",
    tech: "LiDAR Scan 4.0",
  },
  {
    id: 2,
    name: "Lumina Gallery",
    img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1600&q=80",
    area: "85m²",
    tech: "Neural Rendering",
  },
  {
    id: 3,
    name: "Skyline Suite",
    img: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=1600&q=80",
    area: "65m²",
    tech: "Digital Twin v2",
  },
  {
    id: 4,
    name: "Zenith Lounge",
    img: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1600&q=80",
    area: "45m²",
    tech: "360° Volumetric",
  },
];

const SPECS = [
  { label: "Scan Precision", val: "±1mm", icon: <Radio className="w-4 h-4" /> },
  { label: "Polygon Density", val: "1.2B", icon: <Box className="w-4 h-4" /> },
  { label: "Latency Buffer", val: "<20ms", icon: <Zap className="w-4 h-4" /> },
  {
    label: "Rendering Engine",
    val: "RTX v5",
    icon: <Cpu className="w-4 h-4" />,
  },
];

const ASSETS = [
  {
    city: "New York",
    name: "Tribeca Penthouse",
    price: "$24M",
    status: "Available",
  },
  {
    city: "London",
    name: "The Knightsbridge",
    price: "£18M",
    status: "In Escrow",
  },
  {
    city: "Dubai",
    name: "Palm Jumeirah",
    price: "AED 90M",
    status: "Off Market",
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

export default function VisionRealEstatePage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeRoom, setActiveRoom] = useState(0);
  const [tourOpen, setTourOpen] = useState(false);

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
      className="premium-theme min-h-screen bg-[#050505] text-white font-mono selection:bg-rose-600 selection:text-white overflow-x-hidden"
      style={{ scrollBehavior: "smooth" }}
    >
      {/* ==========================================
          NAVIGATION
          ========================================== */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-1000 ${scrolled ? "bg-[#050505]/95 backdrop-blur-md py-4 border-b border-white/5 shadow-lg" : "bg-transparent py-10"}`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="flex flex-col items-start">
            <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-white/40 mb-1">
              Plan.
            </span>
            <span className="text-xl md:text-2xl font-black tracking-[-0.04em] uppercase text-rose-600 italic">
              VISION<span className="text-white">.067</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">
            <Link
              href="#portfolio"
              className="hover:text-rose-600 transition-colors"
            >
              Portfolio
            </Link>
            <Link
              href="#technology"
              className="hover:text-rose-600 transition-colors"
            >
              The_Engine
            </Link>
            <Link
              href="#spaces"
              className="hover:text-rose-600 transition-colors"
            >
              Spatial_Anatomy
            </Link>
            <Link
              href="#contact"
              className="hover:text-rose-600 transition-colors"
            >
              Consultation
            </Link>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/20">
              <Radio className="w-3.5 h-3.5 animate-pulse text-rose-600" />
              <span>Lat: 45.322 // Lon: 0.127</span>
            </div>
            <MagneticBtn
              onClick={() => setTourOpen(true)}
              className="px-8 py-3 bg-rose-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-none hover:bg-white hover:text-black transition-all shadow-xl shadow-rose-600/20"
            >
              START_SCAN
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
            className="fixed inset-0 z-[100] bg-[#050505] p-8 pt-32 flex flex-col border-l border-white/5"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-10 right-8"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="flex flex-col gap-10 text-5xl font-black tracking-tighter uppercase italic">
              <Link href="#portfolio" onClick={() => setMenuOpen(false)}>
                Portfolio
              </Link>
              <Link href="#technology" onClick={() => setMenuOpen(false)}>
                Engine
              </Link>
              <Link href="#spaces" onClick={() => setMenuOpen(false)}>
                Anatomy
              </Link>
              <Link href="#contact" onClick={() => setMenuOpen(false)}>
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==========================================
          1. HERO (Cyber HUD Real Estate)
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
            alt="Vision Hero"
            fill
            className="object-cover brightness-[0.4] grayscale-[80%]"
            priority
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(225,29,72,0.1)_0%,transparent_70%)]" />
        </motion.div>

        {/* HUD GRID */}
        <div
          className="absolute inset-0 z-1 opacity-5 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
            backgroundSize: "100px 100px",
          }}
        />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full">
          <Reveal>
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-rose-600/10 rounded-none border border-rose-600/30 text-rose-600 text-[10px] font-bold uppercase tracking-widest mb-10 shadow-sm">
              <span className="w-2 h-2 bg-rose-600 rounded-full animate-pulse" />
              Live: Volumetric Stream 0x074F
            </div>
            <h1 className="text-7xl md:text-9xl lg:text-[11rem] font-black leading-[0.85] tracking-tighter mb-12 uppercase italic">
              Space <br /> <span className="text-rose-600">As Data.</span>
            </h1>
            <p className="max-w-xl text-lg md:text-xl text-white/30 leading-relaxed font-bold mb-12 uppercase tracking-tight">
              Sub-millimeter LiDAR scanning and neural radiance fields for
              immersive real estate experiences at the speed of thought.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <MagneticBtn
                onClick={() => setTourOpen(true)}
                className="px-12 py-5 bg-rose-600 text-white text-[10px] font-bold uppercase tracking-[0.4em] rounded-none hover:bg-white hover:text-black transition-all cursor-pointer shadow-2xl shadow-rose-600/20"
              >
                Enter Property
              </MagneticBtn>
              <button className="px-12 py-5 border border-white/10 text-white text-[10px] font-bold uppercase tracking-[0.4em] rounded-none hover:bg-white hover:text-black transition-all cursor-pointer">
                Portfolio_Manifesto
              </button>
            </div>
          </Reveal>
        </div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute bottom-10 right-12 hidden md:block"
        >
          <div className="flex flex-col items-end gap-3 text-right">
            <span className="text-[9px] font-bold text-white/10 uppercase tracking-[0.5em]">
              TETRAHEDRON // SCAN_MODE_EN
            </span>
            <div className="w-32 h-[1px] bg-rose-600/40" />
          </div>
        </motion.div>
      </section>

      {/* ==========================================
          2. THE SPATIAL ENGINE (Tech Protocol)
          ========================================== */}
      <section
        id="technology"
        className="py-32 bg-[#050505] border-y border-white/5"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-32 items-center">
            <div className="lg:col-span-5">
              <Reveal>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-rose-600 mb-6 block">
                  Spatial Protocol
                </span>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight mb-12 text-white uppercase italic">
                  Neural <br />{" "}
                  <span className="text-rose-600">Rendering.</span>
                </h2>
                <p className="text-lg text-white/30 leading-relaxed font-bold mb-16 uppercase tracking-tight italic">
                  Our proprietary engine digitizes physical assets into
                  interactive volumetric twins with sub-millimeter precision.
                </p>

                <div className="space-y-10">
                  {[
                    {
                      label: "LiDAR Precision",
                      val: "±1",
                      suffix: "mm",
                      desc: "Military-grade sensors capturing every architectural nuance.",
                    },
                    {
                      label: "Polygon Count",
                      val: "1.2",
                      suffix: "B+",
                      desc: "Extreme density rendering for true photorealism.",
                    },
                    {
                      label: "Stream Latency",
                      val: "20",
                      suffix: "ms",
                      desc: "Instant response on any device, from VR to Mobile.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="group border-l border-rose-600/20 pl-8 hover:border-rose-600 transition-all"
                    >
                      <h4 className="text-sm font-bold uppercase tracking-tight mb-2 text-white/60">
                        {item.label}
                      </h4>
                      <div className="text-3xl font-black text-rose-600 mb-2 uppercase italic tabular-nums">
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
              <Reveal className="relative aspect-video rounded-none overflow-hidden shadow-2xl border border-white/5 bg-[#0a0a0a] p-1 group">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(225,29,72,0.1)_0%,transparent_70%)] animate-pulse" />
                <div className="relative h-full w-full border border-white/5 bg-[#050505] p-8 flex flex-col justify-between overflow-hidden">
                  <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/5">
                    <div className="flex items-center gap-4">
                      <Terminal className="w-5 h-5 text-rose-600" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-rose-600">
                        Engine_Output_Live
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-1.5 h-1.5 bg-rose-600 rounded-full animate-pulse" />
                      <div className="w-1.5 h-1.5 bg-rose-600/30 rounded-full" />
                    </div>
                  </div>

                  <div className="space-y-4 font-mono">
                    {[
                      {
                        time: "14:22:01.002",
                        op: "INIT",
                        val: "LOAD_GEOMETRY_0x77A",
                        status: "ACK",
                      },
                      {
                        time: "14:22:01.003",
                        op: "SCAN",
                        val: "RECONSTRUCTING_POINTS_1.2B",
                        status: "DONE",
                      },
                      {
                        time: "14:22:01.004",
                        op: "MESH",
                        val: "OPTIMIZING_POLY_DENSITY",
                        status: "DONE",
                      },
                      {
                        time: "14:22:01.005",
                        op: "PUBL",
                        val: "STREAMING_VOLUMETRIC_V2",
                        status: "LIVE",
                      },
                    ].map((log, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-6 text-[10px] py-2 border-b border-white/[0.02]"
                      >
                        <span className="text-white/20 italic">{log.time}</span>
                        <span className="text-rose-600 font-black uppercase tracking-widest">
                          {log.op}
                        </span>
                        <span className="text-white/40 flex-1 truncate">
                          {log.val}
                        </span>
                        <span className="text-rose-600/40">[{log.status}]</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-12 p-8 bg-rose-600/5 border border-rose-600/10">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.3em] mb-4">
                      <span className="text-white/40 italic">Buffer Load</span>
                      <span className="text-rose-600">92%</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-none overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "92%" }}
                        transition={{ duration: 2 }}
                        className="h-full bg-rose-600"
                      />
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          3. SPACES (Immersive Multi-Grid)
          ========================================== */}
      <section id="spaces" className="py-32 bg-[#050505]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
            <Reveal>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9] text-white italic">
                Spatial <br /> <span className="text-rose-600">Anatomy.</span>
              </h2>
            </Reveal>
            <p className="max-w-sm text-sm text-white/30 leading-relaxed font-bold uppercase tracking-widest italic text-right">
              Explore individual zones of our flagship property. Sub-millimeter
              detail in every shadow.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* LEFT: ROOM LIST */}
            <div className="lg:col-span-4 space-y-6">
              {ROOMS.map((room, i) => (
                <Reveal key={room.id} delay={i * 0.1}>
                  <div
                    onClick={() => setActiveRoom(i)}
                    className={`p-8 border transition-all cursor-pointer rounded-none group ${activeRoom === i ? "border-rose-600 bg-rose-600/5" : "border-white/5 bg-white/[0.02] hover:border-white/20"}`}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/20">
                        0{i + 1}
                      </span>
                      <Maximize
                        className={`w-4 h-4 transition-all ${activeRoom === i ? "text-rose-600" : "text-white/10 group-hover:text-white/40"}`}
                      />
                    </div>
                    <h4 className="text-2xl font-black uppercase tracking-tighter italic mb-4">
                      {room.name}
                    </h4>
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-white/30">
                      <span>{room.area}</span>
                      <span>{room.tech}</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* RIGHT: VIEWPORT */}
            <div className="lg:col-span-8 relative aspect-video rounded-none overflow-hidden shadow-2xl border border-white/5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeRoom}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.1, opacity: 0 }}
                  transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={ROOMS[activeRoom].img}
                    alt={ROOMS[activeRoom].name}
                    fill
                    className="object-cover brightness-[0.6] grayscale-[20%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
                </motion.div>
              </AnimatePresence>

              <div className="absolute inset-0 p-12 flex flex-col justify-between pointer-events-none">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-rose-600">
                      SCAN_SEQUENCE_ENABLED
                    </span>
                    <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">
                      Property ID: 0x074F_MK2
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-none border border-white/20 flex items-center justify-center">
                    <Box className="w-5 h-5 text-white/40" />
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-black text-white italic mb-2 tabular-nums">
                    {ROOMS[activeRoom].area}
                  </div>
                  <div className="text-[10px] font-bold text-rose-600 uppercase tracking-[0.3em]">
                    Computed Net Space
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          4. GLOBAL PORTFOLIO (Map/List)
          ========================================== */}
      <section
        id="portfolio"
        className="py-32 bg-[#050505] border-y border-white/5 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <Globe className="w-full h-full text-rose-600" />
        </div>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          <Reveal className="text-center max-w-2xl mx-auto mb-24">
            <span className="text-[10px] uppercase tracking-[0.5em] font-black text-rose-600 mb-6 block">
              Asset Registry
            </span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic text-white">
              Global Nodes.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ASSETS.map((asset, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="p-10 bg-white/[0.02] border border-white/5 hover:border-rose-600/40 transition-all rounded-none group text-left">
                  <div className="flex justify-between items-start mb-10">
                    <h3 className="text-xl font-black uppercase tracking-widest text-rose-600 italic">
                      {asset.city}
                    </h3>
                    <Radio className="w-4 h-4 text-white/10 group-hover:text-rose-600 transition-colors" />
                  </div>
                  <h4 className="text-3xl font-black uppercase tracking-tighter mb-4 text-white">
                    {asset.name}
                  </h4>
                  <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest mb-10">
                    <span className="text-white/40">{asset.status}</span>
                    <span className="text-white italic">{asset.price}</span>
                  </div>
                  <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-rose-600 hover:text-white transition-colors">
                    REQUEST_SCAN <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          5. STATS (Counter)
          ========================================== */}
      <section className="py-24 bg-[#050505] border-y border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-2 lg:grid-cols-4 gap-16 text-center">
          {[
            { label: "Assets_Scanned", val: 1240, suffix: " Units" },
            { label: "Polygon_Mass", val: 840, suffix: " B+" },
            { label: "Network_Nodes", val: 32, suffix: " Nodes" },
            {
              label: "User_Throughput",
              val: 1000000,
              suffix: "/sec",
              prefix: "",
            },
          ].map((stat, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="text-5xl md:text-7xl font-black text-rose-600 mb-4 italic tabular-nums">
                <Counter
                  to={stat.val}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </div>
              <div className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/20">
                {stat.label}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ==========================================
          6. FAQ (Accordion)
          ========================================== */}
      <section className="py-32 bg-[#050505]">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-none uppercase italic text-white">
              Intel_Buffer
            </h2>
          </Reveal>

          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                q: "What hardware is required?",
                a: "Vision.067 runs in-browser on any modern GPU. For the full immersive experience, we recommend Meta Quest 3 or Apple Vision Pro.",
              },
              {
                q: "How long does a full scan take?",
                a: "A typical 500m² penthouse can be digitized in 48 hours using our automated drone LiDAR arrays.",
              },
              {
                q: "Can we integrate into our website?",
                a: "Yes, our Spatial SDK provides a simple iframe or React component for seamless site integration.",
              },
              {
                q: "How is data security handled?",
                a: "All scans are stored on encrypted private nodes with FIPS 140-2 Level 3 compliance.",
              },
            ].map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b border-white/10"
              >
                <AccordionTrigger className="text-left text-sm uppercase font-bold tracking-widest py-8 hover:text-rose-600 hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-white/30 leading-relaxed font-bold uppercase tracking-widest pb-8 italic">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ==========================================
          7. MEGA FOOTER (Cyber-Minimal)
          ========================================== */}
      <footer className="bg-[#0a0a0a] pt-32 pb-12 px-6 md:px-12 border-t border-white/5 relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-32">
            <div className="lg:col-span-5">
              <Reveal>
                <div className="flex flex-col mb-10">
                  <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-white/30 mb-1">
                    Plan.
                  </span>
                  <span className="text-2xl font-black tracking-[-0.04em] uppercase text-rose-600 italic">
                    VISION<span className="text-white">.067</span>
                  </span>
                </div>
                <p className="text-white/20 max-w-sm mb-12 uppercase tracking-widest text-[10px] font-bold leading-relaxed italic">
                  Digitizing the physical world into volumetric data streams.
                  Built for the next era of luxury real estate.
                </p>
                <form
                  className="relative max-w-md"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="email"
                    placeholder="AUTHENTICATED_EMAIL"
                    className="w-full bg-white/[0.02] border border-white/5 rounded-none px-6 py-4 text-xs font-bold outline-none focus:border-rose-600 text-white transition-all uppercase tracking-widest"
                  />
                  <button
                    type="submit"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-rose-600 hover:text-white transition-colors uppercase tracking-[0.3em]"
                  >
                    CONNECT
                  </button>
                </form>
              </Reveal>
            </div>

            <div className="lg:col-span-2 lg:col-start-7">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-rose-600 mb-10">
                Nodes
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/20">
                <li>
                  <Link
                    href="#"
                    className="hover:text-rose-600 transition-colors"
                  >
                    NYC_Cluster
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-rose-600 transition-colors"
                  >
                    LDN_Hub
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-rose-600 transition-colors"
                  >
                    DXB_Node
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-rose-600 transition-colors"
                  >
                    SGP_Gateway
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-rose-600 mb-10">
                The_Engine
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/20">
                <li>
                  <Link
                    href="#"
                    className="hover:text-rose-600 transition-colors"
                  >
                    Spatial_SDK
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-rose-600 transition-colors"
                  >
                    LiDAR_Manifesto
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-rose-600 transition-colors"
                  >
                    Neural_Rendering
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-rose-600 transition-colors"
                  >
                    API_Status
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-rose-600 mb-10">
                Terminal
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/20">
                <li>
                  <Link
                    href="#"
                    className="hover:text-rose-600 transition-colors flex items-center gap-3"
                  >
                    <Globe className="w-3 h-3" /> Globe
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-rose-600 transition-colors flex items-center gap-3"
                  >
                    <Globe className="w-3 h-3" /> X_Protocol
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-rose-600 transition-colors flex items-center gap-3"
                  >
                    <Mail className="w-3 h-3" /> Contact_IRL
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-10 border-t border-white/5 text-[9px] font-bold uppercase tracking-widest text-white/10">
            <div className="flex items-center gap-10">
              <span>
                &copy; {new Date().getFullYear()} Vision Real Estate SA.
              </span>
              <Link href="#" className="hover:text-white transition-colors">
                Regulatory_Terms
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Privacy_Buffer
              </Link>
            </div>
            <div className="flex gap-10">
              <span>NYC // London // Dubai</span>
              <span>Space As Data</span>
            </div>
          </div>
        </div>
      </footer>

      {/* SCAN MODAL */}
      <Dialog open={tourOpen} onOpenChange={setTourOpen}>
        <DialogContent className="bg-[#050505] border border-rose-600/20 max-w-lg p-12 rounded-none shadow-2xl relative text-white">
          <button
            onClick={() => setTourOpen(false)}
            className="absolute top-8 right-8 text-white/20 hover:text-rose-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="text-center mb-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-rose-600 mb-4 block">
              Secure Access
            </span>
            <h3 className="text-4xl font-black uppercase tracking-tighter italic">
              Initialize Node.
            </h3>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-widest text-white/30">
                Authentication_Key
              </label>
              <input
                type="text"
                placeholder="NODE_ACCESS_0x00"
                className="w-full bg-white/[0.02] border border-white/5 p-4 text-xs font-bold outline-none focus:border-rose-600 transition-all text-white uppercase tracking-widest"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-widest text-white/30">
                Target_Property
              </label>
              <select className="w-full bg-[#0a0a0a] border border-white/5 p-4 text-xs font-bold outline-none focus:border-rose-600 transition-all text-white uppercase tracking-widest">
                <option>Tribeca Penthouse</option>
                <option>Knightsbridge Suite</option>
                <option>Palm Jumeirah</option>
              </select>
            </div>
            <div className="pt-4 flex items-center gap-4 text-[9px] font-bold uppercase tracking-widest text-white/20 italic">
              <Shield className="w-4 h-4 text-rose-600" />
              Encrypted Stream Enabled
            </div>
            <button className="w-full py-5 bg-rose-600 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all cursor-pointer">
              Initialize_Scan_Session
            </button>
            <p className="text-[9px] text-center text-white/20 uppercase tracking-widest font-bold">
              Node activation requires FIPS 140-2 verification.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <style>{`::-webkit-scrollbar{width:4px;background:#050505}::-webkit-scrollbar-thumb{background:rgba(225,29,72,0.2)}`}</style>
    </div>
  );
}
