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
import { Wallet, Landmark, ArrowUpRight, ArrowDownRight, Activity, ShieldCheck, Globe, Zap, PieChart, CreditCard, Layers, BarChart3, Check, Menu, X, Star, MapPin, Clock, Smartphone, Mail, Phone, Lock, Plus, Terminal, Cpu, Box, Share2, Maximize, Monitor, MousePointer2, Navigation, Wifi } from "lucide-react";

import "../premium.css";

/* ==========================================================================
   DATA STRUCTURES
   ========================================================================= */

const ASSETS = [
  {
    id: "BTC",
    name: "Bitcoin",
    price: "64,281.00",
    change: "+2.4%",
    trend: "up",
    color: "#F7931A",
  },
  {
    id: "ETH",
    name: "Ethereum",
    price: "3,452.12",
    change: "+1.8%",
    trend: "up",
    color: "#627EEA",
  },
  {
    id: "SOL",
    name: "Solana",
    price: "142.85",
    change: "-0.4%",
    trend: "down",
    color: "#14F195",
  },
  {
    id: "AAPL",
    name: "Apple Inc.",
    price: "189.43",
    change: "+0.8%",
    trend: "up",
    color: "#A2AAAD",
  },
];

const TRANSACTIONS = [
  {
    id: "tx_9482",
    type: "OUT",
    label: "Amazon Web Services",
    date: "14:22:01",
    amount: "-$1,240.00",
    status: "CLEARED",
  },
  {
    id: "tx_9483",
    type: "IN",
    label: "Stripe Payout",
    date: "14:22:15",
    amount: "+$42,850.00",
    status: "CLEARED",
  },
  {
    id: "tx_9484",
    type: "OUT",
    label: "Apple Store",
    date: "14:22:42",
    amount: "-$3,499.00",
    status: "PENDING",
  },
  {
    id: "tx_9485",
    type: "OUT",
    label: "Equinox Gym",
    date: "14:23:10",
    amount: "-$250.00",
    status: "CLEARED",
  },
];

const SECURITY_NODES = [
  {
    title: "AES-256-GCM",
    desc: "Military-grade encryption for all data at rest.",
    icon: <Lock className="w-4 h-4" />,
  },
  {
    title: "MPC Wallets",
    desc: "Multi-party computation for institutional security.",
    icon: <ShieldCheck className="w-4 h-4" />,
  },
  {
    title: "Zero Knowledge",
    desc: "Verify transactions without revealing metadata.",
    icon: <Cpu className="w-4 h-4" />,
  },
  {
    title: "Cold Storage",
    desc: "98% of assets stored in offline air-gapped vaults.",
    icon: <Box className="w-4 h-4" />,
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

export default function FinTechPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("assets");
  const [tickerOffset, setTickerOffset] = useState(0);

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
    const t = setInterval(() => setTickerOffset((prev) => prev - 1), 50);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(t);
    };
  }, []);

  return (
    <div
      className="premium-theme min-h-screen bg-[#05060a] text-white font-sans selection:bg-[#3b82f6] selection:text-white overflow-x-hidden"
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
            <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-blue-500/40 mb-1">
              Institutional.
            </span>
            <span className="text-xl md:text-2xl font-black tracking-tighter uppercase text-white">
              QUANTUM<span className="text-blue-500">PAY.</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">
            <Link
              href="#market"
              className="hover:text-blue-400 transition-colors"
            >
              Market
            </Link>
            <Link
              href="#security"
              className="hover:text-blue-400 transition-colors"
            >
              Security
            </Link>
            <Link
              href="#cards"
              className="hover:text-blue-400 transition-colors"
            >
              Cards
            </Link>
            <Link
              href="#pricing"
              className="hover:text-blue-400 transition-colors"
            >
              Pricing
            </Link>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden xl:flex flex-col items-end">
              <span className="text-[9px] font-bold text-white/10 uppercase tracking-widest">
                Global Liquidity
              </span>
              <span className="text-[11px] font-black text-emerald-500 flex items-center gap-1">
                $4.2T VOLUME <Activity className="w-3 h-3" />
              </span>
            </div>
            <MagneticBtn className="px-8 py-3 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-md hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20">
              OPEN_ACCOUNT
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
            <div className="flex flex-col gap-10 text-5xl font-black tracking-tighter uppercase italic text-blue-500">
              <Link href="#market" onClick={() => setMenuOpen(false)}>
                Market
              </Link>
              <Link href="#security" onClick={() => setMenuOpen(false)}>
                Security
              </Link>
              <Link href="#cards" onClick={() => setMenuOpen(false)}>
                Cards
              </Link>
              <Link href="#pricing" onClick={() => setMenuOpen(false)}>
                Pricing
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==========================================
          1. HERO (Cyber-Finance)
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
            src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1600&q=80"
            alt="FinTech Hero"
            fill
            className="object-cover brightness-[0.2] opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05060a] via-[#05060a]/40 to-transparent" />
        </motion.div>

        {/* BLUE GRID OVERLAY */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full">
          <Reveal>
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-blue-600/10 rounded-md border border-blue-600/30 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-10 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5" />
              SIPC & FDIC Insured up to $5M
            </div>
            <h1 className="text-7xl md:text-9xl lg:text-[11rem] font-black leading-[0.85] tracking-tighter mb-12 uppercase">
              The Future <br />{" "}
              <span className="text-blue-500 italic">Of Capital.</span>
            </h1>
            <p className="max-w-xl text-lg md:text-xl text-white/30 leading-relaxed font-bold mb-12 uppercase tracking-tight italic">
              Unified banking, crypto, and stocks for the institutional era.
              Instant settlement. Zero fees. Real-time auditing.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <MagneticBtn className="px-12 py-5 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-[0.4em] rounded-md hover:bg-blue-500 transition-all cursor-pointer shadow-2xl shadow-blue-600/20">
                Open Private Account
              </MagneticBtn>
              <button className="px-12 py-5 border border-white/10 text-white text-[10px] font-bold uppercase tracking-[0.4em] rounded-md hover:bg-white hover:text-black transition-all cursor-pointer">
                Institutional_Deck
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
              QUANTUM_OS // BUILD_2026.04
            </span>
            <div className="w-32 h-[1px] bg-blue-500/40" />
          </div>
        </motion.div>
      </section>

      {/* ==========================================
          2. TICKER (Live Data)
          ========================================== */}
      <div
        id="market"
        className="bg-[#0a0c14] border-y border-white/5 py-4 overflow-hidden"
      >
        <motion.div
          animate={{ x: [0, -2000] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex gap-20 whitespace-nowrap px-10"
        >
          {[...ASSETS, ...ASSETS, ...ASSETS].map((asset, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">
                {asset.id}
              </span>
              <span className="text-sm font-black text-white tabular-nums">
                ${asset.price}
              </span>
              <span
                className={`text-[10px] font-bold ${asset.trend === "up" ? "text-emerald-500" : "text-red-500"}`}
              >
                {asset.change}
              </span>
              <div className="w-1 h-1 bg-white/5 rounded-full mx-4" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* ==========================================
          3. DASHBOARD PREVIEW (Modular UI)
          ========================================== */}
      <section className="py-32 bg-[#05060a]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-32 items-center">
            <div className="lg:col-span-5">
              <Reveal>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-blue-500 mb-6 block">
                  Unified Console
                </span>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight mb-12 text-white uppercase italic">
                  Wealth <br />{" "}
                  <span className="text-blue-500">Engineering.</span>
                </h2>
                <p className="text-lg text-white/20 leading-relaxed font-bold mb-16 uppercase tracking-tight italic">
                  Manage multiple asset classes from a single high-performance
                  interface designed for speed and clarity.
                </p>

                <div className="space-y-6">
                  {[
                    {
                      label: "Execution Speed",
                      val: 14,
                      suffix: "ms",
                      desc: "Proprietary HFT engine with direct exchange connectivity.",
                    },
                    {
                      label: "Assets Under Custody",
                      val: 42,
                      suffix: "B+",
                      desc: "Bespoke security for the world's largest family offices.",
                    },
                    {
                      label: "Global Coverage",
                      val: 180,
                      suffix: "+",
                      desc: "Full banking support in 180 countries and 40 currencies.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="group border-l border-blue-500/20 pl-8 hover:border-blue-500 transition-all"
                    >
                      <h4 className="text-sm font-bold uppercase tracking-tight mb-2 text-white/60">
                        {item.label}
                      </h4>
                      <div className="text-3xl font-black text-blue-500 mb-2 uppercase italic tabular-nums">
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
              <Reveal className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/5 bg-[#0a0c14] p-1 group">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)] animate-pulse" />
                <div className="relative h-full w-full border border-white/5 bg-[#05060a] p-8 flex flex-col justify-between overflow-hidden">
                  <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/5">
                    <div className="flex items-center gap-4">
                      <Wallet className="w-5 h-5 text-blue-500" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-500">
                        PORTFOLIO_DASHBOARD_LIVE
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                      <div className="w-1.5 h-1.5 bg-blue-500/30 rounded-full" />
                    </div>
                  </div>

                  <div className="space-y-6">
                    {TRANSACTIONS.map((tx, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/[0.03] rounded-xl hover:bg-white/[0.04] transition-all cursor-pointer"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center ${tx.type === "IN" ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"}`}
                          >
                            {tx.type === "IN" ? (
                              <ArrowDownRight className="w-4 h-4" />
                            ) : (
                              <ArrowUpRight className="w-4 h-4" />
                            )}
                          </div>
                          <div>
                            <h4 className="text-[10px] font-black uppercase text-white">
                              {tx.label}
                            </h4>
                            <span className="text-[8px] font-bold text-white/20 uppercase">
                              {tx.date} // {tx.id}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div
                            className={`text-xs font-black ${tx.type === "IN" ? "text-emerald-500" : "text-white"}`}
                          >
                            {tx.amount}
                          </div>
                          <span className="text-[8px] font-bold text-white/10 uppercase">
                            {tx.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-12 flex justify-between items-end">
                    <div className="space-y-1">
                      <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">
                        Total Asset Value
                      </span>
                      <div className="text-4xl font-black text-white italic tabular-nums">
                        $2,847,293.00
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center">
                        <PieChart className="w-5 h-5 text-blue-500" />
                      </div>
                      <div className="w-10 h-10 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center">
                        <Layers className="w-5 h-5 text-blue-500" />
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
          4. SECURITY (Node Architecture)
          ========================================== */}
      <section
        id="security"
        className="py-32 bg-[#05060a] border-y border-white/5"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
            <Reveal>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9] text-white">
                Zero <br /> <span className="text-blue-500 italic">Trust.</span>
              </h2>
            </Reveal>
            <p className="max-w-sm text-sm text-white/20 leading-relaxed font-bold uppercase tracking-widest italic text-right">
              Our infrastructure is built on the most advanced security
              protocols ever deployed in commercial finance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SECURITY_NODES.map((node, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="group bg-white/[0.02] border border-white/5 hover:border-blue-500/40 transition-all rounded-2xl p-8 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                    <div className="text-blue-500">{node.icon}</div>
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-tight mb-4 text-white italic">
                    {node.title}
                  </h3>
                  <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest leading-relaxed">
                    {node.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          5. CARDS (Customizer)
          ========================================== */}
      <section id="cards" className="py-32 bg-[#05060a]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-32 items-center">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <Reveal className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/5 bg-[#0a0c14] p-1 group">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)] animate-pulse" />
                <div className="relative h-full w-full border border-white/5 bg-[#05060a] p-8 flex items-center justify-center overflow-hidden">
                  {/* CARD PREVIEW */}
                  <motion.div
                    initial={{ rotateY: 0 }}
                    whileHover={{ rotateY: 180 }}
                    transition={{ duration: 1.5 }}
                    className="relative w-[400px] h-[250px] preserve-3d"
                  >
                    {/* FRONT */}
                    <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-stone-300 to-stone-500 rounded-2xl p-8 flex flex-col justify-between shadow-2xl border border-white/20">
                      <div className="flex justify-between items-start">
                        <div className="text-[10px] font-black uppercase tracking-widest text-black/40">
                          QUANTUM_PRESTIGE
                        </div>
                        <Zap className="w-6 h-6 text-black/60" />
                      </div>
                      <div>
                        <div className="text-xl font-mono text-black/80 tracking-widest mb-2">
                          •••• •••• •••• 9482
                        </div>
                        <div className="flex justify-between items-end">
                          <div>
                            <div className="text-[8px] font-black uppercase tracking-widest text-black/40">
                              CARDHOLDER
                            </div>
                            <div className="text-xs font-black text-black/80 uppercase">
                              MARCUS_STERLING
                            </div>
                          </div>
                          <div className="w-12 h-8 bg-black/10 rounded-md backdrop-blur-sm" />
                        </div>
                      </div>
                    </div>
                    {/* BACK (HIDDEN) */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180 bg-stone-500 rounded-2xl p-8 flex flex-col justify-between shadow-2xl border border-white/20">
                      <div className="w-full h-12 bg-black/80 mt-4" />
                      <div className="text-right">
                        <div className="text-[8px] font-black text-black/40 uppercase mb-1">
                          CVV
                        </div>
                        <div className="text-xs font-mono text-black/80 tracking-widest">
                          •••
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* DECORATIVE ELEMENTS */}
                  <div className="absolute top-8 right-8 flex flex-col items-end">
                    <span className="text-[9px] font-bold text-blue-500 uppercase tracking-widest">
                      Material: Brushed Titanium
                    </span>
                    <span className="text-[9px] font-bold text-white/10 uppercase tracking-widest italic">
                      Weight: 22g Precision Weighted
                    </span>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5 order-1 lg:order-2 text-right lg:text-left">
              <Reveal>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-blue-500 mb-6 block">
                  Physical Asset
                </span>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight mb-12 text-white uppercase italic">
                  Bespoke <br /> <span className="text-blue-500">Metal.</span>
                </h2>
                <p className="text-lg text-white/20 leading-relaxed font-bold mb-16 uppercase tracking-tight italic">
                  Your card is more than a tool. It's a statement. Crafted from
                  solid brushed titanium, laser-engraved with your unique
                  digital signature.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-end lg:justify-start">
                  <MagneticBtn className="px-12 py-5 bg-white text-black text-[10px] font-bold uppercase tracking-[0.4em] rounded-md hover:bg-blue-500 hover:text-white transition-all cursor-pointer shadow-2xl">
                    Customize Card
                  </MagneticBtn>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          6. PRICING (SaaS Tiers)
          ========================================== */}
      <section
        id="pricing"
        className="py-32 bg-[#05060a] border-y border-white/5"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <Reveal className="text-center mb-24 max-w-2xl mx-auto">
            <span className="text-[10px] uppercase tracking-[0.5em] font-black text-blue-500 mb-6 block">
              Service Tiers
            </span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic text-white">
              Tier_Select.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Standard",
                price: "$0",
                desc: "For individual traders and hobbyists.",
                features: [
                  "Global Banking",
                  "Standard Metal Card",
                  "2.5% FX Fee",
                  "SIPC Coverage",
                ],
              },
              {
                title: "Quantum",
                price: "$99",
                desc: "For professional traders and family offices.",
                features: [
                  "Direct HFT Access",
                  "Titanium Card",
                  "0% FX Fee",
                  "24/7 Dedicated Rep",
                  "MPC Wallet Suite",
                ],
              },
              {
                title: "Black",
                price: "INVITE",
                desc: "For institutional liquidity and sovereign funds.",
                features: [
                  "OTC Desk Access",
                  "24K Gold Card",
                  "Custom Risk Engine",
                  "Global Concierge",
                  "White-glove Custody",
                ],
              },
            ].map((tier, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div
                  className={`p-12 border ${tier.title === "Quantum" ? "bg-blue-600/5 border-blue-500/40 shadow-2xl shadow-blue-500/5" : "bg-white/[0.02] border-white/5"} rounded-3xl flex flex-col h-full hover:border-blue-500/20 transition-all`}
                >
                  <div className="text-3xl font-black text-blue-500 mb-6 italic tabular-nums">
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
                        <Check className="w-3.5 h-3.5 text-blue-500" /> {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full py-5 text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer ${tier.title === "Quantum" ? "bg-blue-600 text-white hover:bg-blue-500 shadow-xl shadow-blue-600/20" : "border border-white/10 text-white hover:bg-white hover:text-black"}`}
                  >
                    {tier.title === "Black" ? "REQUEST_INVITE" : "GET_STARTED"}
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          7. FAQ (The Buffer)
          ========================================== */}
      <section className="py-32 bg-[#05060a]">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-none uppercase italic text-white">
              Quantum_Buffer
            </h2>
          </Reveal>

          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                q: "Is QuantumPay a bank?",
                a: "QuantumPay is a financial technology company, not a bank. Banking services provided by our global network of regulated banking partners.",
              },
              {
                q: "How secure is my data?",
                a: "We use AES-256-GCM encryption for all data at rest and TLS 1.3 for data in transit. We are SOC 2 Type II compliant and PCI-DSS Level 1 certified.",
              },
              {
                q: "What assets can I trade?",
                a: "You can trade over 10,000 stocks, ETFs, options, and a curated selection of 50+ institutional-grade cryptocurrencies.",
              },
              {
                q: "Are there any hidden fees?",
                a: "No. Our pricing is transparent. Standard accounts pay zero commission on US stocks. Quantum and Black tiers pay a fixed monthly fee with zero hidden spreads.",
              },
            ].map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b border-white/5"
              >
                <AccordionTrigger className="text-left text-sm uppercase font-bold tracking-widest py-8 hover:text-blue-500 hover:no-underline">
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
          8. MEGA FOOTER (Premium Tech)
          ========================================== */}
      <footer className="bg-[#0a0c14] pt-32 pb-12 px-6 md:px-12 border-t border-white/5 relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-32">
            <div className="lg:col-span-5">
              <Reveal>
                <div className="flex flex-col mb-10">
                  <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-white/20 mb-1">
                    Institutional.
                  </span>
                  <span className="text-2xl font-black tracking-tighter uppercase text-white">
                    QUANTUM<span className="text-blue-500">PAY.</span>
                  </span>
                </div>
                <p className="text-white/20 max-w-sm mb-12 uppercase tracking-widest text-[10px] font-bold leading-relaxed italic">
                  Unified financial engineering for the digital age. Est. 2026.
                  Member of the Global FinTech Council.
                </p>
                <form
                  className="relative max-w-md"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="email"
                    placeholder="ENROLL_IN_THE_TERMINAL"
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
                Terminal
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/20">
                <li>
                  <Link
                    href="#"
                    className="hover:text-blue-500 transition-colors"
                  >
                    Market_Pulse
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-blue-500 transition-colors"
                  >
                    Wealth_Portal
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-blue-500 transition-colors"
                  >
                    API_Reference
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-blue-500 transition-colors"
                  >
                    Security_Vault
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-blue-500 mb-10">
                Resources
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/20">
                <li>
                  <Link
                    href="#"
                    className="hover:text-blue-500 transition-colors"
                  >
                    Whitepapers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-blue-500 transition-colors"
                  >
                    Help_Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-blue-500 transition-colors"
                  >
                    Fee_Schedule
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-blue-500 transition-colors"
                  >
                    Legal_Audit
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-blue-500 mb-10">
                Network
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/20">
                <li>
                  <Link
                    href="#"
                    className="hover:text-blue-500 transition-colors flex items-center gap-3"
                  >
                    <Globe className="w-3 h-3" /> Globe
                  </Link>
                </li>
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
                    <Mail className="w-3 h-3" /> Contact_Control
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-10 border-t border-white/5 text-[9px] font-bold uppercase tracking-widest text-white/10">
            <div className="flex items-center gap-10">
              <span>
                &copy; {new Date().getFullYear()} QUANTUM PAY Financial Inc.
              </span>
              <Link href="#" className="hover:text-white transition-colors">
                Privacy_Protocol
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Sovereign_Terms
              </Link>
            </div>
            <div className="flex gap-10">
              <span>London // New York // Singapore</span>
              <span>Quantum OS v4.2</span>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        ::-webkit-scrollbar{width:4px;background:#05060a}
        ::-webkit-scrollbar-thumb{background:rgba(59,130,246,0.2)}
      `}</style>
    </div>
  );
}
