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
import { Satellite, Globe, Menu, ArrowRight, ChevronDown, Rocket, Radio, Shield, Star, Check, Zap, Activity, Database, Plus, Terminal, Cpu, Box, Share2, Layers, Maximize, Monitor, MousePointer2, Navigation, Smartphone, MapPin, Wifi, Mail, Phone } from "lucide-react";

import "../premium.css";

/* ==========================================================================
   DATA STRUCTURES
   ========================================================================= */

const CONSTELLATION = [
  {
    id: "APEX-1",
    orbit: "LEO 550km",
    capacity: "2.8 TB/day",
    instruments: "SAR + Multispectral",
    status: "Operational",
    uptime: 99.9,
    launched: "Mar 2020",
    img: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&q=80",
    desc: "Primary SAR (Synthetic Aperture Radar) node providing all-weather, day/night imaging at 0.5m resolution.",
  },
  {
    id: "APEX-2",
    orbit: "GEO 35,786km",
    capacity: "1.9 TB/day",
    instruments: "Thermal IR + SAR",
    status: "Operational",
    uptime: 99.7,
    launched: "Sep 2021",
    img: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800&q=80",
    desc: "High-altitude node for continuous regional monitoring and early thermal signature detection.",
  },
  {
    id: "APEX-3",
    orbit: "LEO 480km",
    capacity: "3.4 TB/day",
    instruments: "Hyperspectral 240-band",
    status: "Operational",
    uptime: 99.8,
    launched: "Feb 2022",
    img: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&q=80",
    desc: "Specialized for material analysis, agricultural health tracking, and chemical signature mapping.",
  },
  {
    id: "APEX-4",
    orbit: "MEO 8,000km",
    capacity: "1.1 TB/day",
    instruments: "Radiation Monitor",
    status: "Commissioning",
    uptime: 98.2,
    launched: "Dec 2024",
    img: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80",
    desc: "Environmental monitoring node for orbital safety and radiation belt analysis.",
  },
];

const TELEMETRY_LOGS = [
  {
    ts: "14:22:01",
    node: "APEX-1",
    event: "SAR_PULSE_TX",
    status: "OK",
    val: "542.1 MHz",
  },
  {
    ts: "14:22:05",
    node: "APEX-3",
    event: "DOWNLINK_INIT",
    status: "OK",
    val: "GND_STATION_ALPHA",
  },
  {
    ts: "14:22:12",
    node: "APEX-2",
    event: "THERMAL_SYNC",
    status: "WARN",
    val: "BUS_TEMP_HIGH",
  },
  {
    ts: "14:22:18",
    node: "APEX-4",
    event: "BOOT_STRAP_C12",
    status: "OK",
    val: "SECURE_HANDSHAKE",
  },
];

const GROUND_STATIONS = [
  {
    city: "Tromsø, Norway",
    lat: "69.6N",
    lon: "18.9E",
    ping: "14ms",
    status: "Active",
  },
  {
    city: "Inuvik, Canada",
    lat: "68.3N",
    lon: "133.5W",
    ping: "22ms",
    status: "Active",
  },
  {
    city: "Punta Arenas, Chile",
    lat: "53.1S",
    lon: "70.9W",
    ping: "18ms",
    status: "Standby",
  },
  {
    city: "Rooisand, Namibia",
    lat: "23.3S",
    lon: "16.1E",
    ping: "29ms",
    status: "Active",
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

export default function ApexOrbitalPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSat, setActiveSat] = useState<number | null>(null);
  const [liveTB, setLiveTB] = useState(847293);

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
    const t = setInterval(
      () => setLiveTB((prev) => prev + Math.floor(Math.random() * 50)),
      1000,
    );
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(t);
    };
  }, []);

  return (
    <div
      className="premium-theme min-h-screen bg-[#030712] text-white font-mono selection:bg-[#3b82f6] selection:text-white overflow-x-hidden"
      style={{ scrollBehavior: "smooth" }}
    >
      {/* ==========================================
          NAVIGATION
          ========================================== */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-1000 ${scrolled ? "bg-[#030712]/95 backdrop-blur-md py-4 border-b border-blue-500/10 shadow-lg shadow-blue-500/5" : "bg-transparent py-10"}`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="flex flex-col items-start">
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-blue-400/40 mb-1">
              Orbital.
            </span>
            <span className="text-xl md:text-2xl font-black tracking-tighter uppercase text-white">
              APEX<span className="text-blue-500">.</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">
            <Link
              href="#constellation"
              className="hover:text-blue-400 transition-colors"
            >
              Constellation
            </Link>
            <Link
              href="#ground"
              className="hover:text-blue-400 transition-colors"
            >
              Ground_Segment
            </Link>
            <Link
              href="#telemetry"
              className="hover:text-blue-400 transition-colors"
            >
              Live_Telemetry
            </Link>
            <Link
              href="#missions"
              className="hover:text-blue-400 transition-colors"
            >
              Missions
            </Link>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden xl:flex flex-col items-end">
              <span className="text-[9px] font-bold text-white/10 uppercase tracking-widest">
                Active Data Feed
              </span>
              <span className="text-[11px] font-black text-blue-500 flex items-center gap-1">
                99.9% UPTIME <Activity className="w-3 h-3" />
              </span>
            </div>
            <MagneticBtn className="px-8 py-3 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-md hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20">
              REQUEST_DATA
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
            className="fixed inset-0 z-[100] bg-[#030712] p-8 pt-32 flex flex-col border-l border-blue-500/10"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-10 right-8"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="flex flex-col gap-10 text-5xl font-black tracking-tighter uppercase italic text-blue-500">
              <Link href="#constellation" onClick={() => setMenuOpen(false)}>
                Constellation
              </Link>
              <Link href="#ground" onClick={() => setMenuOpen(false)}>
                Ground
              </Link>
              <Link href="#telemetry" onClick={() => setMenuOpen(false)}>
                Telemetry
              </Link>
              <Link href="#missions" onClick={() => setMenuOpen(false)}>
                Missions
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==========================================
          1. HERO (Cyber-Space)
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
            src="https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=1600&q=80"
            alt="Apex Hero"
            fill
            className="object-cover brightness-[0.4] opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/40 to-transparent" />
        </motion.div>

        {/* BLUE GRID OVERLAY */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />

        {/* GLOW ORB */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none animate-pulse" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full">
          <Reveal>
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-blue-600/10 rounded-md border border-blue-600/30 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-10 shadow-sm">
              <Satellite className="w-3.5 h-3.5" />
              Apex Constellation: Operational
            </div>
            <h1 className="text-7xl md:text-9xl lg:text-[11rem] font-black leading-[0.85] tracking-tighter mb-12 uppercase">
              Orbital <br />{" "}
              <span className="text-blue-500 italic">Intel.</span>
            </h1>
            <p className="max-w-xl text-lg md:text-xl text-white/40 leading-relaxed font-bold mb-12 uppercase tracking-tight">
              Advanced satellite constellation management. 0.47m resolution.
              Real-time data fusion for mission-critical intelligence.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <MagneticBtn className="px-12 py-5 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-[0.4em] rounded-md hover:bg-blue-500 transition-all cursor-pointer shadow-2xl shadow-blue-600/20">
                Access Data Catalog
              </MagneticBtn>
              <button className="px-12 py-5 border border-white/10 text-white text-[10px] font-bold uppercase tracking-[0.4em] rounded-md hover:bg-white hover:text-[#030712] transition-all cursor-pointer">
                Mission_Dashboard
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
              APEX_V4 // ORBITAL_OS
            </span>
            <div className="w-32 h-[1px] bg-blue-500/40" />
          </div>
        </motion.div>
      </section>

      {/* ==========================================
          2. CONSTELLATION (Satellite Cards)
          ========================================== */}
      <section
        id="constellation"
        className="py-32 bg-[#030712] border-y border-white/5"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
            <Reveal>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9] text-white">
                Active <br />{" "}
                <span className="text-blue-500 italic">Nodes.</span>
              </h2>
            </Reveal>
            <p className="max-w-sm text-sm text-white/30 leading-relaxed font-bold uppercase tracking-widest italic text-right">
              Our multi-modal constellation provides continuous coverage across
              LEO, MEO, and GEO tiers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {CONSTELLATION.map((s, i) => (
              <Reveal key={s.id} delay={i * 0.1}>
                <div
                  onClick={() => setActiveSat(i)}
                  className="group cursor-pointer bg-white/[0.02] border border-white/5 hover:border-blue-500/40 transition-all rounded-2xl p-5 shadow-sm overflow-hidden"
                >
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-8">
                    <Image
                      src={s.img}
                      alt={s.id}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-blue-600/10 mix-blend-overlay" />
                  </div>
                  <div className="px-2 pb-2">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[10px] uppercase tracking-widest text-blue-500 font-black">
                        {s.id}
                      </span>
                      <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-[8px] uppercase tracking-widest">
                        {s.status}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-tight mb-4 text-white truncate">
                      {s.instruments}
                    </h3>
                    <div className="space-y-3 mb-8">
                      <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/20">
                        <span>Orbit</span>
                        <span className="text-white/60">{s.orbit}</span>
                      </div>
                      <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/20">
                        <span>Capacity</span>
                        <span className="text-white/60">{s.capacity}</span>
                      </div>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.uptime}%` }}
                        transition={{ duration: 1.5, delay: i * 0.1 }}
                        className="h-full bg-blue-500"
                      />
                    </div>
                    <div className="flex justify-between items-center mt-3 text-[9px] uppercase tracking-widest text-white/20">
                      <span>Uptime</span>
                      <span className="text-blue-500 font-black">
                        {s.uptime}%
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          3. GROUND SEGMENT (Global Network)
          ========================================== */}
      <section id="ground" className="py-32 bg-[#030712]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-32 items-center">
            <div className="lg:col-span-5">
              <Reveal>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-blue-500 mb-6 block">
                  Global Downlink
                </span>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight mb-12 text-white uppercase italic">
                  Ground <br /> <span className="text-blue-500">Segment.</span>
                </h2>
                <p className="text-lg text-white/30 leading-relaxed font-bold mb-16 uppercase tracking-tight italic">
                  Our globally distributed ground station network ensures
                  ultra-low latency data delivery from orbit to your terminal.
                </p>

                <div className="space-y-10">
                  {GROUND_STATIONS.map((st, i) => (
                    <div
                      key={i}
                      className="group border-l border-blue-500/20 pl-8 hover:border-blue-500 transition-all"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-bold uppercase tracking-tight text-white/60">
                          {st.city}
                        </h4>
                        <span
                          className={`text-[8px] uppercase tracking-widest font-black ${st.status === "Active" ? "text-emerald-500" : "text-blue-500/40"}`}
                        >
                          {st.status}
                        </span>
                      </div>
                      <div className="flex gap-6 text-[10px] text-white/20 font-black uppercase tracking-widest">
                        <span>
                          {st.lat} // {st.lon}
                        </span>
                        <span className="text-blue-500 italic">
                          Ping: {st.ping}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Reveal className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/5 bg-[#0a0a0a] p-1 group">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)] animate-pulse" />
                <div className="relative h-full w-full border border-white/5 bg-[#030712] p-8 flex flex-col justify-between overflow-hidden">
                  <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/5">
                    <div className="flex items-center gap-4">
                      <Globe className="w-5 h-5 text-blue-500" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-500">
                        Global_Network_Visualizer
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                      <div className="w-1.5 h-1.5 bg-blue-500/30 rounded-full" />
                    </div>
                  </div>

                  {/* SIMULATED MAP */}
                  <div className="relative flex-1 bg-blue-600/[0.03] rounded-xl border border-white/[0.03] flex items-center justify-center overflow-hidden">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 120,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute w-[600px] h-[600px] border border-blue-500/10 rounded-full"
                    />
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{
                        duration: 180,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute w-[400px] h-[400px] border border-blue-500/5 rounded-full"
                    />

                    {/* STATION DOTS */}
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.4,
                        }}
                        className="absolute w-2 h-2 bg-blue-500 rounded-full blur-sm"
                        style={{
                          top: `${20 + Math.random() * 60}%`,
                          left: `${20 + Math.random() * 60}%`,
                        }}
                      />
                    ))}

                    <div className="relative z-10 flex flex-col items-center">
                      <span className="text-[9px] font-bold text-blue-500 uppercase tracking-[0.5em] mb-4">
                        Network Status
                      </span>
                      <div className="text-4xl font-black text-white italic tabular-nums">
                        14 Active Nodes
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 flex justify-between items-end">
                    <div className="space-y-2">
                      <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">
                        Aggregate Throughput
                      </span>
                      <div className="text-2xl font-black text-white italic">
                        {liveTB.toLocaleString()} GB
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center">
                        <Wifi className="w-5 h-5 text-blue-500" />
                      </div>
                      <div className="w-10 h-10 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center">
                        <Navigation className="w-5 h-5 text-blue-500" />
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
          4. TELEMETRY (Live Terminal)
          ========================================== */}
      <section
        id="telemetry"
        className="py-32 bg-[#030712] border-y border-white/5"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <Reveal className="text-center mb-24 max-w-2xl mx-auto">
            <span className="text-[10px] uppercase tracking-[0.5em] font-black text-blue-500 mb-6 block">
              Real-Time Ops
            </span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic text-white">
              Live Index.
            </h2>
          </Reveal>

          <div className="bg-[#050914] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-6">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-500/50" />
                  <div className="w-2 h-2 rounded-full bg-amber-500/50" />
                  <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
                </div>
                <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">
                  mission_control_v4.2.sh
                </span>
              </div>
              <div className="flex items-center gap-4 text-[10px] font-black text-blue-500 uppercase tracking-widest">
                <span className="animate-pulse">RECORDING_TELEMETRY</span>
                <Terminal className="w-4 h-4" />
              </div>
            </div>

            <div className="p-8 font-mono space-y-4">
              <div className="flex gap-4 text-[11px] text-blue-500/40 border-b border-white/[0.02] pb-4 uppercase font-black tracking-widest">
                <span className="w-20">TIMESTAMP</span>
                <span className="w-24">NODE_ID</span>
                <span className="w-40">EVENT_ID</span>
                <span className="w-20">STATUS</span>
                <span>VALUE_LOG</span>
              </div>
              {TELEMETRY_LOGS.map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4 text-[11px] py-3 border-b border-white/[0.02] group hover:bg-white/[0.02] transition-colors"
                >
                  <span className="w-20 text-white/20">{log.ts}</span>
                  <span className="w-24 text-white/60 font-black">
                    {log.node}
                  </span>
                  <span className="w-40 text-blue-500 font-black">
                    {log.event}
                  </span>
                  <span
                    className={`w-20 font-black ${log.status === "OK" ? "text-emerald-500" : "text-amber-500"}`}
                  >
                    {log.status}
                  </span>
                  <span className="text-white/40 italic">{log.val}</span>
                </motion.div>
              ))}
              <div className="pt-8 flex items-center gap-4">
                <span className="text-blue-500 animate-pulse">_</span>
                <input
                  type="text"
                  placeholder="CMD_INPUT: Execute Priority Tasking..."
                  className="bg-transparent border-none outline-none text-[11px] text-white/20 font-black uppercase tracking-widest w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          5. STATS (Counters)
          ========================================== */}
      <section className="py-24 bg-[#030712] border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-2 lg:grid-cols-4 gap-16 text-center">
          {[
            { label: "Missions_Launched", val: 42, suffix: "+" },
            { label: "Success_Rate", val: 99, suffix: "%" },
            { label: "Data_Volume_Daily", val: 12, suffix: " TB" },
            { label: "Delivery_Latency", val: 23, suffix: "m" },
          ].map((stat, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="text-5xl md:text-7xl font-black text-blue-600 mb-4 italic tabular-nums">
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
          6. FAQ (Technical Buffer)
          ========================================== */}
      <section className="py-32 bg-[#030712]">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-none uppercase italic text-white">
              Platform_Logic
            </h2>
          </Reveal>

          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                q: "What is your ground sample distance?",
                a: "APEX-3 delivers 0.47m GSD in panchromatic mode and 2.1m multispectral. Our SAR sensor on APEX-1 achieves 0.5m Stripmap resolution in all weather conditions.",
              },
              {
                q: "What is your tasking latency?",
                a: "Standard tasking is confirmed within 4 hours. Enterprise priority queue guarantees satellite look-angle confirmation within 45 minutes of request.",
              },
              {
                q: "How do you handle data security?",
                a: "All data is encrypted via AES-256-GCM in transit and at rest. We operate sovereign data centers and are ITAR/EAR compliant for national security missions.",
              },
              {
                q: "Can I integrate with existing GIS?",
                a: "Yes. We provide native connectors for ArcGIS, QGIS, Palantir Foundry, and Google Earth Engine via our STAC-compliant REST API.",
              },
            ].map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b border-white/10"
              >
                <AccordionTrigger className="text-left text-sm uppercase font-bold tracking-widest py-8 hover:text-blue-500 hover:no-underline">
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
          7. MEGA FOOTER (Cyber-Military)
          ========================================== */}
      <footer className="bg-[#050914] pt-32 pb-12 px-6 md:px-12 border-t border-white/5 relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-32">
            <div className="lg:col-span-5">
              <Reveal>
                <div className="flex flex-col mb-10">
                  <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-white/20 mb-1">
                    Orbital.
                  </span>
                  <span className="text-2xl font-black tracking-tighter uppercase text-white">
                    APEX<span className="text-blue-500">.</span>
                  </span>
                </div>
                <p className="text-white/20 max-w-sm mb-12 uppercase tracking-widest text-[10px] font-bold leading-relaxed italic">
                  Strategic satellite intelligence for national security,
                  climate monitoring, and global commercial infrastructure.
                </p>
                <form
                  className="relative max-w-md"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="email"
                    placeholder="AUTHENTICATED_ACCESS_MAIL"
                    className="w-full bg-white/[0.02] border border-white/5 rounded-none px-6 py-4 text-xs font-bold outline-none focus:border-blue-600 text-white transition-all uppercase tracking-widest"
                  />
                  <button
                    type="submit"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-blue-500 hover:text-white transition-colors uppercase tracking-[0.3em]"
                  >
                    SECURE_ENROLL
                  </button>
                </form>
              </Reveal>
            </div>

            <div className="lg:col-span-2 lg:col-start-7">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-blue-500 mb-10">
                Constellation
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/20">
                <li>
                  <Link
                    href="#"
                    className="hover:text-blue-500 transition-colors"
                  >
                    LEO_Tier
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-blue-500 transition-colors"
                  >
                    GEO_Stationary
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-blue-500 transition-colors"
                  >
                    Payload_Specs
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-blue-500 transition-colors"
                  >
                    Launch_Manifest
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-blue-500 mb-10">
                Intelligence
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/20">
                <li>
                  <Link
                    href="#"
                    className="hover:text-blue-500 transition-colors"
                  >
                    SAR_Imaging
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-blue-500 transition-colors"
                  >
                    Hyperspectral_Data
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-blue-500 transition-colors"
                  >
                    Thermal_Monitoring
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-blue-500 transition-colors"
                  >
                    Change_Detection
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-blue-500 mb-10">
                Terminal
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/20">
                <li>
                  <Link
                    href="#"
                    className="hover:text-blue-500 transition-colors flex items-center gap-3"
                  >
                    <Globe className="w-3 h-3" /> X_Mission
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-blue-500 transition-colors flex items-center gap-3"
                  >
                    <Globe className="w-3 h-3" /> API_Docs
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-blue-500 transition-colors flex items-center gap-3"
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
                &copy; {new Date().getFullYear()} APEX Orbital Systems Inc.
              </span>
              <Link href="#" className="hover:text-white transition-colors">
                Regulatory_Terms
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                ITAR_Sovereignty
              </Link>
            </div>
            <div className="flex gap-10">
              <span>ISO 27001 // SOC 2 Type II</span>
              <span>Orbital OS v4.2</span>
            </div>
          </div>
        </div>
      </footer>

      {/* SATELLITE MODAL */}
      <AnimatePresence>
        {activeSat !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6"
            onClick={() => setActiveSat(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="bg-[#0e0f1a] border border-white/10 max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-3xl shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveSat(null)}
                className="absolute top-8 right-8 text-white/20 hover:text-blue-500 transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="relative aspect-square md:aspect-auto">
                <Image
                  src={CONSTELLATION[activeSat].img}
                  alt="Satellite"
                  fill
                  className="object-cover brightness-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0f1a] to-transparent" />
              </div>
              <div className="p-12 flex flex-col justify-between bg-[#0e0f1a]">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-blue-500 font-black mb-4">
                    Node detail // {CONSTELLATION[activeSat].id}
                  </div>
                  <h3 className="text-4xl font-black uppercase tracking-tighter italic text-white mb-6 leading-none">
                    {CONSTELLATION[activeSat].instruments}
                  </h3>
                  <p className="text-sm text-white/40 leading-relaxed font-bold mb-10 italic">
                    "{CONSTELLATION[activeSat].desc}"
                  </p>

                  <div className="grid grid-cols-1 gap-4 mb-10">
                    {[
                      {
                        label: "Orbit Tier",
                        val: CONSTELLATION[activeSat].orbit,
                      },
                      {
                        label: "Data Pipeline",
                        val: CONSTELLATION[activeSat].capacity,
                      },
                      {
                        label: "Launch Window",
                        val: CONSTELLATION[activeSat].launched,
                      },
                      {
                        label: "System Uptime",
                        val: CONSTELLATION[activeSat].uptime + "%",
                      },
                    ].map((s, i) => (
                      <div
                        key={i}
                        className="flex justify-between text-[10px] border-b border-white/5 pb-2 font-mono"
                      >
                        <span className="uppercase tracking-widest text-white/20 font-black">
                          {s.label}
                        </span>
                        <span className="font-black text-blue-500 italic">
                          {s.val}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <button className="w-full py-5 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-[#030712] transition-all cursor-pointer shadow-xl shadow-blue-600/10">
                    REQUEST_PRIORITY_TASKING
                  </button>
                  <button className="w-full py-5 border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-blue-600 transition-all cursor-pointer">
                    VIEW_TELEMETRY_STREAM
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`::-webkit-scrollbar{width:4px;background:#030712}::-webkit-scrollbar-thumb{background:rgba(59,130,246,0.2)}`}</style>
    </div>
  );
}
