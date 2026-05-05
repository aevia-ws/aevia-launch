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
import { ArrowRight, ArrowUpRight, Star, Check, Menu, X, Globe, Clock, Quote, Search, ShoppingBag, Activity, Zap, BookOpen, Terminal, Shield, Lock, TrendingUp, TrendingDown, BarChart2, Cpu, Database, Server, AlertTriangle, MousePointer2, Smartphone, Code2 } from "lucide-react";

import "../premium.css";

/* ==========================================================================
   DATA STRUCTURES
   ========================================================================= */

const ASSETS = [
  {
    symbol: "BTC/USD",
    price: "67,432.80",
    change: "+3.24%",
    up: true,
    vol: "42.1B",
  },
  {
    symbol: "ETH/USD",
    price: "3,891.55",
    change: "+1.87%",
    up: true,
    vol: "18.6B",
  },
  {
    symbol: "SOL/USD",
    price: "182.40",
    change: "-0.93%",
    up: false,
    vol: "4.2B",
  },
  { symbol: "ARB/USD", price: "1.24", change: "+8.11%", up: true, vol: "920M" },
  {
    symbol: "AVAX/USD",
    price: "38.72",
    change: "-1.55%",
    up: false,
    vol: "2.1B",
  },
];

const SECURITY_STACK = [
  {
    title: "MPC Cold Storage",
    desc: "Multi-party computation with threshold signing ensuring zero single-point failure.",
    icon: <Shield className="w-5 h-5" />,
  },
  {
    title: "Proof of Reserve",
    desc: "Real-time on-chain attestations published every 4 hours for 100% transparency.",
    icon: <Database className="w-5 h-5" />,
  },
  {
    title: "Hardware Isolation",
    desc: "FIPS 140-2 Level 3 HSMs protecting all primary key material and execution logic.",
    icon: <Lock className="w-5 h-5" />,
  },
  {
    title: "Audit Protocol",
    desc: "Continuous security audits by Tier 1 firms (SOC2 Type II, ISO 27001).",
    icon: <Check className="w-5 h-5" />,
  },
];

const LIQUIDITY_VENUES = [
  { name: "Frankfurt Hub", roundtrip: "0.18ms", status: "Nominal" },
  { name: "Singapore Gateway", roundtrip: "0.24ms", status: "Nominal" },
  { name: "New York Bridge", roundtrip: "0.21ms", status: "Nominal" },
  { name: "Tokyo Nexus", roundtrip: "0.19ms", status: "Nominal" },
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

export default function KryptaXProPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

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
      className="premium-theme min-h-screen bg-[#060c08] text-[#e8f5e9] font-mono selection:bg-[#00ff9d] selection:text-black overflow-x-hidden"
      style={{ scrollBehavior: "smooth" }}
    >
      {/* ==========================================
          NAVIGATION
          ========================================== */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${scrolled ? "bg-[#060c08]/98 backdrop-blur-md py-4 border-b border-[#00ff9d]/10 shadow-lg" : "bg-transparent py-10"}`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#00ff9d] flex items-center justify-center text-black shadow-[0_0_20px_rgba(0,255,157,0.3)]">
              <Activity className="w-4.5 h-4.5" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase text-white">
              KRYPTA<span className="text-[#00ff9d]">X</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-10 text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">
            <Link href="#" className="hover:text-[#00ff9d] transition-colors">
              Markets
            </Link>
            <Link href="#" className="hover:text-[#00ff9d] transition-colors">
              Institution
            </Link>
            <Link href="#" className="hover:text-[#00ff9d] transition-colors">
              API_Docs
            </Link>
            <Link href="#" className="hover:text-[#00ff9d] transition-colors">
              Custody
            </Link>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden xl:flex flex-col items-end">
              <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">
                BTC / USD
              </span>
              <span className="text-[11px] font-bold text-[#00ff9d] flex items-center gap-1">
                67,432.80 <TrendingUp className="w-3 h-3" />
              </span>
            </div>
            <button
              onClick={() => setSignupOpen(true)}
              className="px-8 py-3 bg-[#00ff9d] text-black text-[10px] font-bold uppercase tracking-widest rounded-sm hover:bg-white transition-all shadow-xl"
            >
              START_TRADING
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
            className="fixed inset-0 z-[100] bg-[#060c08] p-8 pt-32 flex flex-col border-l border-[#00ff9d]/10"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-10 right-8"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="flex flex-col gap-10 text-4xl font-black tracking-tighter uppercase">
              <Link href="#" onClick={() => setMenuOpen(false)}>
                Markets
              </Link>
              <Link href="#" onClick={() => setMenuOpen(false)}>
                Trade
              </Link>
              <Link href="#" onClick={() => setMenuOpen(false)}>
                API
              </Link>
              <Link href="#" onClick={() => setMenuOpen(false)}>
                Security
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==========================================
          1. HERO (Cyber-Institutional)
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
            src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1600&q=80"
            alt="Exchange Hero"
            fill
            className="object-cover opacity-[0.08]"
            priority
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#060c08_80%)]" />
        </motion.div>

        {/* GRID OVERLAY */}
        <div
          className="absolute inset-0 z-1 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#00ff9d 1px, transparent 1px), linear-gradient(90deg, #00ff9d 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full">
          <Reveal>
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#00ff9d]/5 rounded border border-[#00ff9d]/20 text-[#00ff9d] text-[10px] font-bold uppercase tracking-widest mb-10 shadow-sm">
              <span className="w-2 h-2 bg-[#00ff9d] rounded-full animate-pulse" />
              Live: 1.2M Orders/sec matching deterministic
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black leading-[0.85] tracking-tighter mb-12 text-white">
              Institutional <br />{" "}
              <span className="text-[#00ff9d]">Edge Tier.</span>
            </h1>
            <p className="max-w-xl text-lg md:text-xl text-white/30 leading-relaxed font-bold mb-12 uppercase tracking-tight">
              Built for the top 1%. Sub-millisecond co-location, deterministic
              sequencing, and zero-compromise MPC custody.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <MagneticBtn
                onClick={() => setSignupOpen(true)}
                className="px-12 py-5 bg-[#00ff9d] text-black text-[10px] font-bold uppercase tracking-[0.4em] rounded-sm hover:bg-white transition-all cursor-pointer shadow-2xl shadow-[#00ff9d]/20"
              >
                Open Account
              </MagneticBtn>
              <button className="px-12 py-5 border border-white/10 text-white text-[10px] font-bold uppercase tracking-[0.4em] rounded-sm hover:bg-white hover:text-black transition-all cursor-pointer">
                Institutional_API
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
              FRK // SGP // NY // TYO
            </span>
            <div className="w-32 h-[1px] bg-[#00ff9d]/20" />
          </div>
        </motion.div>
      </section>

      {/* ==========================================
          2. THE LEDGER ENGINE (Performance)
          ========================================== */}
      <section className="py-32 bg-[#060c08] border-y border-[#00ff9d]/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-32 items-center">
            <div className="lg:col-span-5">
              <Reveal>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#00ff9d] mb-6 block">
                  Low-Latency Core
                </span>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight mb-12 text-white uppercase">
                  Deterministic <br />{" "}
                  <span className="text-[#00ff9d]">Execution.</span>
                </h2>
                <p className="text-lg text-white/30 leading-relaxed font-bold mb-16 uppercase tracking-tight italic">
                  Our matching engine processes 1.2M orders per second with
                  sub-millisecond round-trips. No slippage, no lag, no
                  exceptions.
                </p>

                <div className="space-y-10">
                  {[
                    {
                      label: "Throughput",
                      val: "1.2M+",
                      suffix: " orders/s",
                      desc: "Horizontal scaling with zero performance degradation.",
                    },
                    {
                      label: "Deterministic",
                      val: "100",
                      suffix: "%",
                      desc: "Every order sequence is verified and immutable.",
                    },
                    {
                      label: "Availability",
                      val: "99.999",
                      suffix: "%",
                      desc: "Multi-region failover with zero downtime history.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="group border-l border-[#00ff9d]/10 pl-8 hover:border-[#00ff9d] transition-all"
                    >
                      <h4 className="text-sm font-bold uppercase tracking-tight mb-2 text-white/60">
                        {item.label}
                      </h4>
                      <div className="text-3xl font-black text-[#00ff9d] mb-2 uppercase italic">
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
              <Reveal className="relative aspect-square rounded-sm overflow-hidden shadow-2xl border border-[#00ff9d]/10 bg-[#030806] p-8 group">
                <div className="flex items-center justify-between mb-10 pb-6 border-b border-[#00ff9d]/10">
                  <div className="flex items-center gap-4">
                    <Terminal className="w-5 h-5 text-[#00ff9d]" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#00ff9d]">
                      Matching_Core_Live
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-1.5 h-1.5 bg-[#00ff9d] rounded-full animate-pulse" />
                    <div className="w-1.5 h-1.5 bg-[#00ff9d]/30 rounded-full" />
                  </div>
                </div>

                <div className="space-y-4 font-mono">
                  {[
                    {
                      time: "14:32:01.002",
                      op: "RECV",
                      val: "BUY 12.4 BTC @ 67432.80",
                      status: "ACK",
                    },
                    {
                      time: "14:32:01.003",
                      op: "MTCH",
                      val: "ORD_774x -> ORD_881y",
                      status: "FILL",
                    },
                    {
                      time: "14:32:01.004",
                      op: "LDGR",
                      val: "SETTLE_BATCH_0x99",
                      status: "CONF",
                    },
                    {
                      time: "14:32:01.005",
                      op: "PUSH",
                      val: "WS_PUBLISH_MD_TICK",
                      status: "DONE",
                    },
                  ].map((log, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-6 text-[10px] py-2 border-b border-white/[0.02]"
                    >
                      <span className="text-white/20">{log.time}</span>
                      <span className="text-[#00ff9d] font-black">
                        {log.op}
                      </span>
                      <span className="text-white/50 flex-1 truncate">
                        {log.val}
                      </span>
                      <span className="text-[#00ff9d]/40">[{log.status}]</span>
                    </div>
                  ))}
                </div>

                <div className="mt-12 p-8 bg-[#00ff9d]/5 border border-[#00ff9d]/10">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.3em] mb-4">
                    <span className="text-white/40">Latency Buffer</span>
                    <span className="text-[#00ff9d]">0.18ms</span>
                  </div>
                  <div className="h-1 bg-[#00ff9d]/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "88%" }}
                      transition={{ duration: 2 }}
                      className="h-full bg-[#00ff9d]"
                    />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          3. ASSET ARCHIVE
          ========================================== */}
      <section className="py-32 bg-[#060c08]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
            <Reveal>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9] text-white">
                Market <br /> <span className="text-[#00ff9d]">Atlas.</span>
              </h2>
            </Reveal>
            <p className="max-w-sm text-sm text-white/30 leading-relaxed font-bold uppercase tracking-widest italic">
              Real-time liquidity across 300+ pairs. Deterministic price feeds
              with sub-second accuracy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {ASSETS.map((a, i) => (
              <Reveal key={a.symbol} delay={i * 0.05}>
                <div className="group p-8 bg-[#030806] border border-white/[0.05] hover:border-[#00ff9d]/40 transition-all rounded shadow-sm">
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-white/20">
                      {a.symbol}
                    </span>
                    {a.up ? (
                      <TrendingUp className="w-4 h-4 text-[#00ff9d]" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                  <div className="text-2xl font-black text-white mb-2 italic">
                    ${a.price}
                  </div>
                  <div
                    className={`text-[10px] font-black ${a.up ? "text-[#00ff9d]" : "text-red-500"} mb-8`}
                  >
                    {a.change}
                  </div>
                  <div className="border-t border-white/[0.05] pt-6 flex items-center justify-between">
                    <span className="text-[8px] font-bold text-white/10 uppercase tracking-widest">
                      Vol: {a.vol}
                    </span>
                    <button className="text-[10px] font-bold text-[#00ff9d] hover:text-white transition-colors uppercase tracking-[0.2em]">
                      Trade
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          4. SECURITY STACK
          ========================================== */}
      <section className="py-32 bg-[#030806] border-y border-[#00ff9d]/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <Reveal className="text-center max-w-2xl mx-auto mb-24">
            <span className="text-[10px] uppercase tracking-[0.5em] font-black text-[#00ff9d] mb-6 block">
              Safety Protocol
            </span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic text-white">
              Trust Buffer.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SECURITY_STACK.map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="group p-10 bg-[#060c08] border border-white/[0.03] hover:border-[#00ff9d]/40 transition-all text-left">
                  <div className="w-12 h-12 bg-[#00ff9d]/5 rounded flex items-center justify-center text-[#00ff9d] mb-8 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h4 className="text-xl font-black uppercase tracking-tight mb-4 text-white">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-white/30 leading-relaxed font-bold uppercase tracking-widest italic">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          5. LIQUIDITY NETWORK
          ========================================== */}
      <section className="py-32 bg-[#060c08] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <Globe className="w-full h-full text-[#00ff9d]" />
        </div>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <Reveal>
                <span className="text-[10px] uppercase tracking-[0.5em] font-black text-[#00ff9d] mb-6 block">
                  Global Nodes
                </span>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight mb-12 uppercase text-white">
                  Liquid <br /> <span className="text-[#00ff9d]">Bridge.</span>
                </h2>
                <p className="text-lg text-white/30 leading-relaxed font-bold mb-16 max-w-lg italic uppercase tracking-tight">
                  Access aggregated liquidity from top-tier institutional
                  providers through our proprietary cross-venue routing logic.
                </p>

                <div className="space-y-6">
                  {LIQUIDITY_VENUES.map((venue, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-6 bg-white/[0.02] border border-white/[0.05] hover:border-[#00ff9d]/30 transition-all"
                    >
                      <div className="flex items-center gap-6">
                        <Server className="w-5 h-5 text-[#00ff9d]" />
                        <div>
                          <h4 className="text-sm font-black uppercase tracking-tight text-white">
                            {venue.name}
                          </h4>
                          <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">
                            Co-location Available
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-black text-[#00ff9d] block mb-1">
                          {venue.roundtrip}
                        </span>
                        <span className="text-[9px] font-bold text-green-500 uppercase tracking-widest">
                          {venue.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <Reveal className="bg-white/[0.01] border border-white/[0.05] p-12 rounded backdrop-blur-3xl shadow-2xl">
              <div className="flex items-center justify-between mb-12">
                <h3 className="text-2xl font-black uppercase tracking-tighter text-[#00ff9d]">
                  Institutional_SDK
                </h3>
                <Code2 className="w-6 h-6 text-white/20" />
              </div>
              <div className="space-y-6 mb-12">
                {[
                  {
                    title: "KryptaX FIX 4.4 Spec",
                    size: "1.2 MB",
                    type: "PDF",
                  },
                  {
                    title: "WebSocket MD Stream v2",
                    size: "0.8 MB",
                    type: "JSON",
                  },
                  { title: "Python SDK for HFT", size: "4.5 MB", type: "GZIP" },
                ].map((file, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between group cursor-pointer border-b border-white/[0.05] pb-4"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-white/40 group-hover:bg-[#00ff9d] group-hover:text-black transition-all">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold uppercase tracking-tight text-white group-hover:text-[#00ff9d] transition-colors">
                          {file.title}
                        </h4>
                        <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">
                          {file.size} // {file.type}
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-[#00ff9d] transition-all" />
                  </div>
                ))}
              </div>
              <button className="w-full py-5 bg-[#00ff9d] text-black text-[10px] font-bold uppercase tracking-[0.4em] rounded hover:bg-white transition-all cursor-pointer">
                Access_Documentation
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ==========================================
          6. STATS (Counter)
          ========================================== */}
      <section className="py-24 bg-[#030806] border-y border-[#00ff9d]/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-2 lg:grid-cols-4 gap-16 text-center">
          {[
            { label: "Monthly_Flow", val: 400, suffix: "B+" },
            { label: "Registered_Desks", val: 1200, suffix: "+" },
            { label: "Pair_Density", val: 312, suffix: "+" },
            { label: "Uptime_SLA", val: 99.99, suffix: "%" },
          ].map((stat, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="text-5xl md:text-7xl font-black text-[#00ff9d] mb-4 italic tabular-nums">
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
      <section className="py-32 bg-[#060c08]">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-none uppercase italic text-white">
              Intel_Buffer
            </h2>
          </Reveal>

          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                q: "What asset classes are supported?",
                a: "KryptaX supports 312+ spot pairs, 180+ perpetual futures, quarterly futures, and European-style options.",
              },
              {
                q: "How is institutional custody handled?",
                a: "Assets are held in MPC cold wallets with 3-of-5 threshold signing and $500M insurance coverage.",
              },
              {
                q: "What API protocols are available?",
                a: "FIX 4.4, REST (OpenAPI 3.1), and WebSocket (up to 200 streams per connection).",
              },
              {
                q: "How do you handle compliance?",
                a: "Registered with FINMA, FCA, and MAS. Full KYC/AML pipeline with real-time Chainalysis integration.",
              },
            ].map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b border-[#00ff9d]/10"
              >
                <AccordionTrigger className="text-left text-sm uppercase font-bold tracking-widest py-8 hover:text-[#00ff9d] hover:no-underline">
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
          8. MEGA FOOTER (Cyber-Minimal)
          ========================================== */}
      <footer className="bg-[#030806] pt-32 pb-12 px-6 md:px-12 border-t border-[#00ff9d]/10 relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-32">
            <div className="lg:col-span-5">
              <Reveal>
                <div className="text-xl font-black tracking-tighter uppercase mb-10 flex items-center gap-3">
                  <div className="w-7 h-7 rounded bg-[#00ff9d] flex items-center justify-center text-black shadow-[0_0_20px_rgba(0,255,157,0.3)]">
                    <Activity className="w-4 h-4" />
                  </div>
                  KRYPTA<span className="text-[#00ff9d]">X</span>
                </div>
                <p className="text-white/20 max-w-sm mb-12 uppercase tracking-widest text-[10px] font-bold leading-relaxed italic">
                  Institutional-grade crypto infrastructure. Built for
                  sub-millisecond execution and total security.
                </p>
                <form
                  className="relative max-w-md"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="email"
                    placeholder="AUTHENTICATED_EMAIL"
                    className="w-full bg-white/[0.02] border border-white/5 rounded-none px-6 py-4 text-xs font-bold outline-none focus:border-[#00ff9d] text-white transition-all uppercase tracking-widest"
                  />
                  <button
                    type="submit"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-[#00ff9d] hover:text-white transition-colors uppercase tracking-[0.3em]"
                  >
                    CONNECT
                  </button>
                </form>
              </Reveal>
            </div>

            <div className="lg:col-span-2 lg:col-start-7">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#00ff9d] mb-10">
                Markets
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/20">
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#00ff9d] transition-colors"
                  >
                    Spot_Trading
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#00ff9d] transition-colors"
                  >
                    Perpetual_Futures
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#00ff9d] transition-colors"
                  >
                    Options_Vault
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#00ff9d] transition-colors"
                  >
                    Yield_Strategies
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#00ff9d] mb-10">
                Institutional
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/20">
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#00ff9d] transition-colors"
                  >
                    Co-location
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#00ff9d] transition-colors"
                  >
                    OTC_Direct
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#00ff9d] transition-colors"
                  >
                    Custody_MPC
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#00ff9d] transition-colors"
                  >
                    Market_Making
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#00ff9d] mb-10">
                Terminal
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/20">
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#00ff9d] transition-colors flex items-center gap-3"
                  >
                    <Terminal className="w-3 h-3" /> API_Docs
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#00ff9d] transition-colors flex items-center gap-3"
                  >
                    <Shield className="w-3 h-3" /> Status_Log
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#00ff9d] transition-colors flex items-center gap-3"
                  >
                    <Smartphone className="w-3 h-3" /> Mobile_Pro
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-10 border-t border-white/5 text-[9px] font-bold uppercase tracking-widest text-white/10">
            <div className="flex items-center gap-10">
              <span>&copy; {new Date().getFullYear()} KryptaX Pro SA.</span>
              <Link href="#" className="hover:text-white transition-colors">
                Risk_Protocols
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Privacy_Buffer
              </Link>
            </div>
            <div className="flex gap-10">
              <span>Frankfurt // Singapore // NY // Tokyo</span>
              <span>Sub-Millisecond Edge</span>
            </div>
          </div>
        </div>
      </footer>

      {/* SIGNUP DIALOG */}
      <Dialog open={signupOpen} onOpenChange={setSignupOpen}>
        <DialogContent className="bg-[#060c08] border border-[#00ff9d]/20 max-w-lg p-12 rounded shadow-2xl relative text-white">
          <button
            onClick={() => setSignupOpen(false)}
            className="absolute top-8 right-8 text-white/20 hover:text-[#00ff9d] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="text-center mb-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#00ff9d] mb-4 block">
              Secure Access
            </span>
            <h3 className="text-4xl font-black uppercase tracking-tighter italic">
              Initialize Desk.
            </h3>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-widest text-white/30">
                Authentication_Email
              </label>
              <input
                type="email"
                placeholder="desk@fund.com"
                className="w-full bg-white/[0.02] border border-white/5 p-4 text-xs font-bold outline-none focus:border-[#00ff9d] transition-all text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-widest text-white/30">
                Access_Key
              </label>
              <input
                type="password"
                placeholder="••••••••••••"
                className="w-full bg-white/[0.02] border border-white/5 p-4 text-xs font-bold outline-none focus:border-[#00ff9d] transition-all text-white"
              />
            </div>
            <div className="pt-4 flex items-center gap-4 text-[9px] font-bold uppercase tracking-widest text-white/20 italic">
              <Shield className="w-4 h-4 text-[#00ff9d]" />
              Encrypted with FIPS 140-2 Level 3
            </div>
            <button className="w-full py-5 bg-[#00ff9d] text-black text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-all cursor-pointer">
              Initialize_Authentication
            </button>
            <p className="text-[9px] text-center text-white/20 uppercase tracking-widest font-bold">
              Desk activation requires 2FA and hardware key verification.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <style>{`::-webkit-scrollbar{width:4px;background:#060c08}::-webkit-scrollbar-thumb{background:#00ff9d20}`}</style>
    </div>
  );
}
