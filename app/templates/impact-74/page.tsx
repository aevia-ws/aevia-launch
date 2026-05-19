// @ts-nocheck
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
import { Shield, ShieldCheck, ShieldAlert, Lock, Zap, Activity, Terminal, Cpu, Box, Share2, Layers, Maximize, Monitor, MousePointer2, Navigation, Globe, Smartphone, MapPin, Wifi, Mail, Phone, Check, Menu, X, Star, Plus, Search, Clock, Bell, Settings, Database, Server, ArrowRight, ArrowUpRight, ChevronRight, Eye } from "lucide-react";

import "../premium.css";

/* ==========================================================================
   DATA STRUCTURES
   ========================================================================= */

const THREATS = [
  {
    id: "TR-942",
    source: "Moscow, RU",
    target: "London, UK",
    type: "DDoS",
    intensity: "CRITICAL",
    timestamp: "14:22:01",
  },
  {
    id: "TR-943",
    source: "Beijing, CN",
    target: "New York, US",
    type: "Phishing",
    intensity: "HIGH",
    timestamp: "14:22:15",
  },
  {
    id: "TR-944",
    source: "Unknown",
    target: "Frankfurt, DE",
    type: "Ransomware",
    intensity: "MEDIUM",
    timestamp: "14:22:42",
  },
  {
    id: "TR-945",
    source: "Kiev, UA",
    target: "Paris, FR",
    type: "Infiltration",
    intensity: "CRITICAL",
    timestamp: "14:23:10",
  },
];

const AUDIT_LOGS = [
  {
    event: "Kernel Integrity Check",
    status: "PASSED",
    latency: "2ms",
    node: "CORE_ALPHA",
  },
  {
    event: "Inbound traffic filtered",
    status: "SECURE",
    latency: "14ms",
    node: "EDGE_04",
  },
  {
    event: "Authentication attempt",
    status: "DENIED",
    latency: "42ms",
    node: "AUTH_GATE",
  },
  {
    event: "Database sync",
    status: "SYNCED",
    latency: "112ms",
    node: "DB_CLU_01",
  },
];

const NODES = [
  {
    title: "Quantum Shield",
    desc: "Hardware-level encryption using quantum random number generators.",
    icon: <Zap className="w-4 h-4" />,
  },
  {
    title: "Neural Audit",
    desc: "AI-driven behavioral analysis for zero-day threat detection.",
    icon: <Activity className="w-4 h-4" />,
  },
  {
    title: "Air-Gap Vault",
    desc: "Physical data isolation for critical institutional assets.",
    icon: <Box className="w-4 h-4" />,
  },
  {
    title: "Edge Sentinel",
    desc: "Global CDN with integrated WAF and sub-millisecond filtering.",
    icon: <Globe className="w-4 h-4" />,
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

export default function CyberSecurityPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("map");
  const [systemHealth, setSystemHealth] = useState(99);

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
      () =>
        setSystemHealth((prev) =>
          Math.max(95, Math.min(100, prev + (Math.random() > 0.5 ? 1 : -1))),
        ),
      3000,
    );
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(t);
    };
  }, []);

  return (
    <div
      className="premium-theme min-h-screen bg-[#05060a] text-white font-mono selection:bg-emerald-500 selection:text-white overflow-x-hidden"
      style={{ scrollBehavior: "smooth" }}
    >
      {/* ==========================================
          NAVIGATION
          ========================================== */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-1000 ${scrolled ? "bg-[#05060a]/95 backdrop-blur-md py-4 border-b border-white/5" : "bg-transparent py-10"}`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="flex flex-col items-start">
            <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-emerald-500/40 mb-1">
              Defensive.
            </span>
            <span className="text-xl md:text-2xl font-black tracking-tighter uppercase text-white">
              AEVIA<span className="text-emerald-500">CYBER.</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">
            <Link
              href="#monitoring"
              className="hover:text-emerald-400 transition-colors"
            >
              Monitoring
            </Link>
            <Link
              href="#audits"
              className="hover:text-emerald-400 transition-colors"
            >
              Audits
            </Link>
            <Link
              href="#solutions"
              className="hover:text-emerald-400 transition-colors"
            >
              Solutions
            </Link>
            <Link
              href="#pricing"
              className="hover:text-emerald-400 transition-colors"
            >
              Pricing
            </Link>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden xl:flex flex-col items-end">
              <span className="text-[9px] font-bold text-white/10 uppercase tracking-widest">
                Global Integrity
              </span>
              <span className="text-[11px] font-black text-emerald-500 flex items-center gap-1">
                SYSTEM_{systemHealth}%_READY <Activity className="w-3 h-3" />
              </span>
            </div>
            <MagneticBtn className="px-8 py-3 bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-md hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-600/20">
              INITIATE_AUDIT
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
            className="fixed inset-0 z-[100] bg-[#05060a] p-8 pt-32 flex flex-col border-l border-white/5"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-10 right-8 text-white/20"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="flex flex-col gap-10 text-5xl font-black tracking-tighter uppercase italic text-emerald-500">
              <Link href="#monitoring" onClick={() => setMenuOpen(false)}>
                Monitoring
              </Link>
              <Link href="#audits" onClick={() => setMenuOpen(false)}>
                Audits
              </Link>
              <Link href="#solutions" onClick={() => setMenuOpen(false)}>
                Solutions
              </Link>
              <Link href="#pricing" onClick={() => setMenuOpen(false)}>
                Pricing
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==========================================
          1. HERO (Cyber-Defensive)
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
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1600&q=80"
            alt="Cyber Hero"
            fill
            className="object-cover brightness-[0.2] opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05060a] via-[#05060a]/40 to-transparent" />
        </motion.div>

        {/* EMERALD GRID OVERLAY */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full">
          <Reveal>
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-emerald-600/10 rounded-md border border-emerald-600/30 text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-10 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5" />
              DHS & CISA COMPLIANT INFRASTRUCTURE
            </div>
            <h1 className="text-7xl md:text-9xl lg:text-[11rem] font-black leading-[0.85] tracking-tighter mb-12 uppercase">
              Defense <br />{" "}
              <span className="text-emerald-500 italic">In Depth.</span>
            </h1>
            <p className="max-w-xl text-lg md:text-xl text-white/30 leading-relaxed font-bold mb-12 uppercase tracking-tight italic">
              Institutional-grade cybersecurity for the digital perimeter.
              Real-time threat detection. Automated auditing. Immutable logs.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <MagneticBtn className="px-12 py-5 bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-[0.4em] rounded-md hover:bg-emerald-500 transition-all cursor-pointer shadow-2xl shadow-emerald-600/20">
                Secure Onboarding
              </MagneticBtn>
              <button className="px-12 py-5 border border-white/10 text-white text-[10px] font-bold uppercase tracking-[0.4em] rounded-md hover:bg-white hover:text-black transition-all cursor-pointer">
                Technical_Specs
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
              AEVIA_PROTOCOL // CORE_V4.7.4
            </span>
            <div className="w-32 h-[1px] bg-emerald-500/40" />
          </div>
        </motion.div>
      </section>

      {/* ==========================================
          2. MONITORING (Live Map)
          ========================================== */}
      <section
        id="monitoring"
        className="py-32 bg-[#05060a] border-y border-white/5"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
            <Reveal>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9] text-white">
                Threat <br />{" "}
                <span className="text-emerald-500 italic">Matrix.</span>
              </h2>
            </Reveal>
            <p className="max-w-sm text-sm text-white/20 leading-relaxed font-bold uppercase tracking-widest italic text-right">
              Global monitoring of institutional perimeters. Real-time
              visualization of attempted breaches.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* THREAT LIST */}
            <div className="lg:col-span-4 space-y-4">
              {THREATS.map((t, i) => (
                <Reveal key={t.id} delay={i * 0.1}>
                  <div className="group bg-white/[0.02] border border-white/5 hover:border-emerald-500/40 transition-all rounded-xl p-6 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-2 h-2 rounded-full ${t.intensity === "CRITICAL" ? "bg-red-500 animate-pulse" : "bg-orange-500"}`}
                        />
                        <span className="text-[10px] font-black uppercase text-white">
                          {t.type}
                        </span>
                      </div>
                      <span className="text-[8px] font-bold text-white/20 uppercase">
                        {t.timestamp}
                      </span>
                    </div>
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-[9px] font-black text-white/40 uppercase tracking-widest mb-1">
                          Source: {t.source}
                        </div>
                        <div className="text-[10px] font-black text-white uppercase italic">
                          Target: {t.target}
                        </div>
                      </div>
                      <div className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">
                        ID_{t.id}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* MAP VISUALIZER */}
            <div className="lg:col-span-8">
              <Reveal className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/5 bg-[#0a0c14] p-1 group">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1)_0%,transparent_70%)] animate-pulse" />
                <div className="relative h-full w-full border border-white/5 bg-[#05060a] p-8 flex flex-col justify-between overflow-hidden">
                  <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/5">
                    <div className="flex items-center gap-4">
                      <Globe className="w-5 h-5 text-emerald-500" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-500">
                        GLOBAL_ATTACK_SURFACE_MONITOR
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                      <div className="w-1.5 h-1.5 bg-emerald-500/30 rounded-full" />
                    </div>
                  </div>

                  {/* PSEUDO MAP */}
                  <div className="flex-1 flex items-center justify-center relative">
                    <div className="w-[80%] h-[80%] border border-white/5 rounded-full relative">
                      <div className="absolute inset-0 border border-white/5 rounded-full animate-[ping_4s_linear_infinite]" />
                      <div className="absolute inset-0 border border-emerald-500/10 rounded-full animate-[ping_6s_linear_infinite]" />

                      {/* NODES */}
                      <div className="absolute top-[20%] left-[30%] w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,1)]" />
                      <div className="absolute bottom-[40%] right-[20%] w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,1)]" />
                      <div className="absolute top-[60%] right-[50%] w-2 h-2 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,1)] animate-pulse" />

                      {/* CONNECTION LINES */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        <line
                          x1="30%"
                          y1="20%"
                          x2="50%"
                          y2="60%"
                          stroke="rgba(16,185,129,0.2)"
                          strokeWidth="1"
                        />
                        <line
                          x1="80%"
                          y1="60%"
                          x2="50%"
                          y2="60%"
                          stroke="rgba(239,68,68,0.2)"
                          strokeWidth="1"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="mt-12 flex justify-between items-end">
                    <div className="space-y-1">
                      <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">
                        Aggregate Daily Blocks
                      </span>
                      <div className="text-4xl font-black text-white italic tabular-nums">
                        4.8M EVENTS
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-lg bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center">
                        <Terminal className="w-5 h-5 text-emerald-500" />
                      </div>
                      <div className="w-10 h-10 rounded-lg bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center">
                        <Database className="w-5 h-5 text-emerald-500" />
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
          3. AUDITS (Ledger)
          ========================================== */}
      <section id="audits" className="py-32 bg-[#05060a]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-32 items-center">
            <div className="lg:col-span-5">
              <Reveal>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-emerald-500 mb-6 block">
                  Immutable Integrity
                </span>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight mb-12 text-white uppercase italic">
                  Neural <br /> <span className="text-emerald-500">Audit.</span>
                </h2>
                <p className="text-lg text-white/20 leading-relaxed font-bold mb-16 uppercase tracking-tight italic">
                  Every internal system event is cross-referenced against 12
                  separate integrity nodes to ensure zero unauthorized
                  manipulation.
                </p>

                <div className="space-y-6">
                  {[
                    {
                      label: "Audit Latency",
                      val: 2,
                      suffix: "ms",
                      desc: "Real-time verification of kernel-level instructions.",
                    },
                    {
                      label: "Compliance Score",
                      val: 100,
                      suffix: "%",
                      desc: "Always-on auditing for SOC2, HIPAA, and PCI-DSS.",
                    },
                    {
                      label: "Active Perimeters",
                      val: 840,
                      suffix: "+",
                      desc: "Institutional networks monitored by Aevia Neural Hub.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="group border-l border-emerald-500/20 pl-8 hover:border-emerald-500 transition-all"
                    >
                      <h4 className="text-sm font-bold uppercase tracking-tight mb-2 text-white/60">
                        {item.label}
                      </h4>
                      <div className="text-3xl font-black text-emerald-500 mb-2 uppercase italic tabular-nums">
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
              <Reveal className="space-y-4">
                {AUDIT_LOGS.map((log, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-10 h-10 rounded-lg bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-black uppercase text-white mb-1">
                          {log.event}
                        </h4>
                        <span className="text-[9px] font-bold text-white/20 uppercase">
                          Node: {log.node}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">
                        {log.status}
                      </div>
                      <span className="text-[9px] font-bold text-white/10 uppercase italic">
                        Response: {log.latency}
                      </span>
                    </div>
                  </div>
                ))}
                <div className="p-12 bg-emerald-600/5 border border-emerald-500/20 rounded-3xl mt-12 text-center">
                  <Terminal className="w-8 h-8 text-emerald-500 mx-auto mb-6" />
                  <h3 className="text-xl font-black uppercase tracking-tight text-white mb-4 italic">
                    Request Protocol Audit
                  </h3>
                  <p className="text-[10px] text-white/20 uppercase tracking-widest mb-8 leading-relaxed">
                    Full system integrity check across all global sectors.
                    Duration: ~140ms.
                  </p>
                  <button className="px-12 py-4 bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-md hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-600/20">
                    INITIATE_FULL_SCAN
                  </button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          4. SOLUTIONS (Grid)
          ========================================== */}
      <section
        id="solutions"
        className="py-32 bg-[#05060a] border-y border-white/5"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <Reveal className="mb-20 text-center">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic text-white">
              The <span className="text-emerald-500">Solutions.</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {NODES.map((node, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="group bg-white/[0.02] border border-white/5 hover:border-emerald-500/40 transition-all rounded-2xl p-8 shadow-sm h-full flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                      <div className="text-emerald-500">{node.icon}</div>
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-tight mb-4 text-white italic">
                      {node.title}
                    </h3>
                    <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest leading-relaxed mb-10">
                      {node.desc}
                    </p>
                  </div>
                  <button className="text-[9px] font-black uppercase tracking-widest text-emerald-500 group-hover:text-white transition-colors flex items-center gap-2">
                    View_Documentation <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          5. PRICING (SaaS Tiers)
          ========================================== */}
      <section id="pricing" className="py-32 bg-[#05060a]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <Reveal className="text-center mb-24 max-w-2xl mx-auto">
            <span className="text-[10px] uppercase tracking-[0.5em] font-black text-emerald-500 mb-6 block">
              Infrastructure Tiers
            </span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic text-white">
              Tier_Select.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Standard",
                price: "$1,400",
                desc: "For SME networks and emerging tech stacks.",
                features: [
                  "Edge Sentinel WAF",
                  "Standard Neural Audit",
                  "12h Log Retention",
                  "Shared Integrity Node",
                ],
              },
              {
                title: "Institutional",
                price: "$8,500",
                desc: "For high-volume financial and healthcare perimeters.",
                features: [
                  "Quantum Shield Layer",
                  "Real-time Neural Audit",
                  "Infinite Log Retention",
                  "Dedicated Integrity Node",
                  "24/7 Red Team Support",
                ],
              },
              {
                title: "Sovereign",
                price: "CUSTOM",
                desc: "For government and critical national infrastructure.",
                features: [
                  "Full Air-Gap Vaults",
                  "Bespoke Neural Models",
                  "Physical HSM Deployment",
                  "On-Prem Control Plane",
                  "Tactical Response Unit",
                ],
              },
            ].map((tier, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div
                  className={`p-12 border ${tier.title === "Institutional" ? "bg-emerald-600/5 border-emerald-500/40 shadow-2xl shadow-emerald-500/5" : "bg-white/[0.02] border-white/5"} rounded-3xl flex flex-col h-full hover:border-emerald-500/20 transition-all`}
                >
                  <div className="text-3xl font-black text-emerald-500 mb-6 italic tabular-nums">
                    {tier.price}
                  </div>
                  <h4 className="text-lg font-black uppercase tracking-widest text-white mb-6 italic">
                    {tier.title}
                  </h4>
                  <p className="text-[11px] text-white/20 leading-relaxed font-bold uppercase tracking-widest italic mb-10 flex-1">
                    {tier.desc}
                  </p>
                  <ul className="space-y-4 mb-12">
                    {tier.features.map((f, j) => (
                      <li
                        key={j}
                        className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-white/40"
                      >
                        <Check className="w-3.5 h-3.5 text-emerald-500" /> {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full py-5 text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer ${tier.title === "Institutional" ? "bg-emerald-600 text-white hover:bg-emerald-500 shadow-xl shadow-emerald-600/20" : "border border-white/10 text-white hover:bg-white hover:text-black"}`}
                  >
                    {tier.title === "Sovereign"
                      ? "REQUEST_BRIEFING"
                      : "INITIALIZE_DEPLOY"}
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          6. FAQ (The Buffer)
          ========================================== */}
      <section className="py-32 bg-[#05060a] border-y border-white/5">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-none uppercase italic text-white">
              Cyber_Buffer
            </h2>
          </Reveal>

          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                q: "How does Neural Audit differ from standard logging?",
                a: "Neural Audit uses behavioral models to identify anomalies in system calls, even if the user has legitimate credentials. It detects 'intent' rather than just 'actions'.",
              },
              {
                q: "Can Aevia Cyber be deployed on-premise?",
                a: "Yes. Our Sovereign tier is specifically designed for air-gapped, on-premise environments with local control planes and physical security modules.",
              },
              {
                q: "What is the deployment timeframe?",
                a: "Standard and Institutional tiers can be deployed in under 2 hours via our automated CloudFormation or Terraform modules. Sovereign deployments require a physical site audit.",
              },
              {
                q: "How do you handle zero-day vulnerabilities?",
                a: "Our Quantum Shield layer uses proactive memory isolation to prevent unauthorized instruction execution, mitigating vulnerabilities before they are even discovered.",
              },
            ].map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b border-white/5"
              >
                <AccordionTrigger className="text-left text-sm uppercase font-bold tracking-widest py-8 hover:text-emerald-500 hover:no-underline">
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
          7. MEGA FOOTER (Premium Tech)
          ========================================== */}
      <footer className="bg-[#0a0c14] pt-32 pb-12 px-6 md:px-12 border-t border-white/5 relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-32">
            <div className="lg:col-span-5">
              <Reveal>
                <div className="flex flex-col mb-10">
                  <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-white/20 mb-1">
                    Defensive.
                  </span>
                  <span className="text-2xl font-black tracking-tighter uppercase text-white">
                    AEVIA<span className="text-emerald-500">CYBER.</span>
                  </span>
                </div>
                <p className="text-white/20 max-w-sm mb-12 uppercase tracking-widest text-[10px] font-bold leading-relaxed italic">
                  Defensive engineering for the digital perimeter. Est. 2026.
                  Member of the Global Cybersecurity Alliance.
                </p>
                <form
                  className="relative max-w-md"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="email"
                    placeholder="ENROLL_IN_THE_TERMINAL"
                    className="w-full bg-white/[0.02] border border-white/5 rounded-none px-6 py-4 text-xs font-bold outline-none focus:border-emerald-600 text-white transition-all uppercase tracking-widest"
                  />
                  <button
                    type="submit"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-emerald-500 hover:text-white transition-colors uppercase tracking-[0.3em]"
                  >
                    SECURE_ENROLL
                  </button>
                </form>
              </Reveal>
            </div>

            <div className="lg:col-span-2 lg:col-start-7">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 mb-10">
                Terminal
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/20">
                <li>
                  <Link
                    href="#"
                    className="hover:text-emerald-500 transition-colors"
                  >
                    Threat_Map
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-emerald-500 transition-colors"
                  >
                    Audit_Ledger
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-emerald-500 transition-colors"
                  >
                    Security_Vault
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-emerald-500 transition-colors"
                  >
                    API_Status
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 mb-10">
                Compliance
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/20">
                <li>
                  <Link
                    href="#"
                    className="hover:text-emerald-500 transition-colors"
                  >
                    SOC2_Audit
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-emerald-500 transition-colors"
                  >
                    GDPR_Protocol
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-emerald-500 transition-colors"
                  >
                    HIPAA_Vault
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-emerald-500 transition-colors"
                  >
                    CISA_Direct
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 mb-10">
                Network
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/20">
                <li>
                  <Link
                    href="#"
                    className="hover:text-emerald-500 transition-colors flex items-center gap-3"
                  >
                    <Globe className="w-3 h-3" /> LinkedIn
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-emerald-500 transition-colors flex items-center gap-3"
                  >
                    <Globe className="w-3 h-3" /> X_Mission
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-emerald-500 transition-colors flex items-center gap-3"
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
                &copy; {new Date().getFullYear()} AEVIA CYBER SYSTEMS Inc.
              </span>
              <Link href="#" className="hover:text-white transition-colors">
                Privacy_Protocol
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Sovereign_Terms
              </Link>
            </div>
            <div className="flex gap-10">
              <span>Washington // London // Tel Aviv</span>
              <span>Aevia Protocol v4.7.4</span>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        ::-webkit-scrollbar{width:4px;background:#05060a}
        ::-webkit-scrollbar-thumb{background:rgba(16,185,129,0.2)}
      `}</style>
    </div>
  );
}
