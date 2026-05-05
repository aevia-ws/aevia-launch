"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, TrendingUp, TrendingDown, Activity, Shield, Zap, Globe, Lock, Bell, Search, Menu, X, ChevronRight, BarChart3, PieChart, LineChart } from "lucide-react";

import "../premium.css";

/* ==========================================================================
   DATA STRUCTURES
   ========================================================================== */

const INITIAL_ASSETS = [
  {
    symbol: "BTC/USD",
    name: "Bitcoin",
    price: 64230.5,
    change: 2.4,
    volume: "32B",
  },
  {
    symbol: "ETH/USD",
    name: "Ethereum",
    price: 3450.2,
    change: -1.2,
    volume: "15B",
  },
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 173.5,
    change: 0.8,
    volume: "52M",
  },
  {
    symbol: "TSLA",
    name: "Tesla Inc.",
    price: 180.2,
    change: -3.4,
    volume: "120M",
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corp.",
    price: 880.1,
    change: 5.2,
    volume: "85M",
  },
  {
    symbol: "SOL/USD",
    name: "Solana",
    price: 145.3,
    change: 8.4,
    volume: "4B",
  },
];

const FEATURES = [
  {
    title: "Quantum Execution",
    desc: "Trade execution under 5ms, directly routed to Tier-1 liquidity providers.",
    icon: <Zap className="w-6 h-6 text-[#00ff9d]" />,
  },
  {
    title: "Institutional Grade Security",
    desc: "Multi-party computation (MPC) wallets with hardware isolation and $150M insurance.",
    icon: <Shield className="w-6 h-6 text-[#00ff9d]" />,
  },
  {
    title: "Global Market Access",
    desc: "Access 120+ markets globally from a single unified margin account.",
    icon: <Globe className="w-6 h-6 text-[#00ff9d]" />,
  },
  {
    title: "Advanced Analytics",
    desc: "Real-time order book flow, sentiment analysis, and predictive AI modeling.",
    icon: <Activity className="w-6 h-6 text-[#00ff9d]" />,
  },
];

const METRICS = [
  { label: "Quarterly Volume", value: "$4.2T" },
  { label: "Active Traders", value: "2.8M" },
  { label: "Uptime (99.99%)", value: "100%" },
  { label: "Supported Assets", value: "10,000+" },
];

const TESTIMONIALS = [
  {
    quote:
      "The latency is unmatched. Since switching to Trade OS, our algorithmic models have seen a 12% increase in successful arbitrage execution.",
    author: "David Chen",
    role: "Quant Lead, Vertex Capital",
  },
  {
    quote:
      "The most intuitive professional trading interface I've used in 15 years. The customizability of the workspace is a game-changer.",
    author: "Sarah Jenkins",
    role: "Independent Prop Trader",
  },
  {
    quote:
      "Their API documentation and support are flawless. We integrated our internal systems with Trade OS in under a week.",
    author: "Michael Ross",
    role: "CTO, Zenith Financial",
  },
];

/* ==========================================================================
   UTILITY COMPONENTS
   ========================================================================== */

function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Mock Graph Component
function MiniGraph({
  data,
  isPositive,
}: {
  data: number[];
  isPositive: boolean;
}) {
  const color = isPositive ? "#00ff9d" : "#ff3366";
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;

  const points = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - ((d - min) / range) * 100;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="w-full h-full overflow-visible"
    >
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="3"
        points={points}
        vectorEffect="non-scaling-stroke"
      />
      <path
        d={`M 0 100 L 0 ${100 - ((data[0] - min) / range) * 100} ${points} L 100 100 Z`}
        fill={`url(#gradient-${isPositive ? "pos" : "neg"})`}
        opacity="0.2"
      />
      <defs>
        <linearGradient id="gradient-pos" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00ff9d" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        <linearGradient id="gradient-neg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff3366" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ==========================================================================
   MAIN PAGE COMPONENT
   ========================================================================== */

export default function TradeOSPage() {
  const [assets, setAssets] = useState(INITIAL_ASSETS);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Simulate Live Data Updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAssets((prev) =>
        prev.map((asset) => {
          // Random price fluctuation between -0.5% and +0.5%
          const fluctuation = (Math.random() - 0.5) * 0.01;
          const newPrice = asset.price * (1 + fluctuation);
          const newChange = asset.change + fluctuation * 100;
          return {
            ...asset,
            price: newPrice,
            change: newChange,
          };
        }),
      );
    }, 2000); // Update every 2 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="premium-theme min-h-screen bg-[#050914] text-slate-200 font-sans selection:bg-[#00ff9d]/30 selection:text-white overflow-x-hidden">
      {/* ==========================================
          LIVE TICKER MARQUEE (Global Top)
          ========================================== */}
      <div className="fixed top-0 left-0 w-full z-[60] bg-[#02040a] border-b border-[#00ff9d]/10 h-8 flex items-center overflow-hidden text-[10px] font-mono whitespace-nowrap">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
          className="flex items-center gap-8 px-4"
        >
          {[...assets, ...assets, ...assets].map((asset, i) => {
            const isPositive = asset.change >= 0;
            return (
              <div key={i} className="flex items-center gap-3">
                <span className="text-slate-400">{asset.symbol}</span>
                <span className="font-bold">
                  $
                  {asset.price.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
                <span
                  className={isPositive ? "text-[#00ff9d]" : "text-[#ff3366]"}
                >
                  {isPositive ? "+" : ""}
                  {asset.change.toFixed(2)}%
                </span>
                <span className="w-1 h-1 rounded-full bg-slate-700 mx-4" />
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* ==========================================
          NAVIGATION
          ========================================== */}
      <nav
        className={`fixed top-8 left-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-[#050914]/90 backdrop-blur-md border-b border-[#00ff9d]/10 py-4" : "bg-transparent py-6"}`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <Link
              href="/"
              className="text-xl font-bold tracking-tighter flex items-center gap-2"
            >
              <div className="w-5 h-5 bg-[#00ff9d] rounded-[4px] shadow-[0_0_15px_rgba(0,255,157,0.5)]" />
              TRADE<span className="text-slate-500 font-light">OS</span>
            </Link>

            <div className="hidden lg:flex items-center gap-8 text-xs font-semibold text-slate-400">
              <Link href="#" className="hover:text-white transition-colors">
                Markets
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Trading
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Derivatives
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Institutional
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <button className="text-slate-400 hover:text-white transition-colors">
              <Search className="w-4 h-4" />
            </button>
            <button className="text-slate-400 hover:text-white transition-colors">
              <Bell className="w-4 h-4" />
            </button>
            <div className="w-[1px] h-4 bg-slate-700" />
            <Link
              href="#"
              className="text-xs font-bold hover:text-[#00ff9d] transition-colors"
            >
              Log In
            </Link>
            <button className="px-5 py-2.5 bg-[#00ff9d] text-[#050914] text-xs font-bold rounded-md hover:bg-white transition-colors shadow-[0_0_20px_rgba(0,255,157,0.2)]">
              Sign Up
            </button>
          </div>

          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden text-white"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[100] bg-[#050914] p-6 pt-24"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-10 right-6 text-slate-400"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="flex flex-col gap-6 text-2xl font-bold">
              <Link href="#" onClick={() => setMenuOpen(false)}>
                Markets
              </Link>
              <Link href="#" onClick={() => setMenuOpen(false)}>
                Trading
              </Link>
              <Link href="#" onClick={() => setMenuOpen(false)}>
                Derivatives
              </Link>
              <Link href="#" onClick={() => setMenuOpen(false)}>
                Institutional
              </Link>
            </div>
            <div className="mt-12 flex flex-col gap-4">
              <button className="w-full py-4 border border-slate-700 rounded-md font-bold">
                Log In
              </button>
              <button className="w-full py-4 bg-[#00ff9d] text-[#050914] rounded-md font-bold">
                Sign Up
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==========================================
          1. HERO DASHBOARD MOCKUP
          ========================================== */}
      <section className="relative pt-48 pb-20 overflow-hidden min-h-screen flex items-center">
        {/* Abstract Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#00ff9d]/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-[#3b82f6]/5 blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-[1600px] mx-auto px-6 md:px-12 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#00ff9d]/20 bg-[#00ff9d]/5 text-[#00ff9d] text-[10px] font-mono uppercase tracking-widest font-bold mb-8">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00ff9d] animate-pulse" />{" "}
                  Trade OS v4.0 is live
                </div>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
                  Professional <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff9d] to-blue-500">
                    Trading Engine.
                  </span>
                </h1>
                <p className="text-lg text-slate-400 mb-10 leading-relaxed">
                  Institutional liquidity, sub-millisecond execution, and
                  advanced charting tools. The ultimate terminal for serious
                  traders and quantitative funds.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="px-8 py-4 bg-[#00ff9d] text-[#050914] font-bold rounded-md hover:bg-white transition-colors shadow-[0_0_20px_rgba(0,255,157,0.2)]">
                    Start Trading
                  </button>
                  <button className="px-8 py-4 border border-slate-700 rounded-md font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                    View API Docs <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Right Dashboard UI Mockup */}
            <div className="lg:col-span-7 perspective-[2000px]">
              <motion.div
                initial={{ opacity: 0, rotateY: 15, rotateX: 5, x: 50 }}
                animate={{ opacity: 1, rotateY: 0, rotateX: 0, x: 0 }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                className="w-full bg-[#0a0f1c] border border-slate-800 rounded-xl overflow-hidden shadow-2xl relative"
              >
                {/* Dashboard Header */}
                <div className="h-12 border-b border-slate-800 flex items-center px-4 justify-between bg-[#070b14]">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-slate-700" />
                    <div className="w-3 h-3 rounded-full bg-slate-700" />
                    <div className="w-3 h-3 rounded-full bg-slate-700" />
                  </div>
                  <div className="flex gap-6 text-xs text-slate-500 font-mono">
                    <span className="text-[#00ff9d]">BTC/USD</span>
                    <span>ETH/USD</span>
                    <span>SOL/USD</span>
                  </div>
                </div>

                {/* Dashboard Body */}
                <div className="p-4 grid grid-cols-12 gap-4 h-[500px]">
                  {/* Sidebar Book */}
                  <div className="col-span-3 border-r border-slate-800 pr-4 flex flex-col font-mono text-[10px]">
                    <h4 className="text-slate-500 mb-2 uppercase">
                      Order Book
                    </h4>
                    <div className="flex-1 overflow-hidden flex flex-col gap-1 text-[#ff3366]">
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={`sell-${i}`}
                          className="flex justify-between relative"
                        >
                          <div
                            className="absolute right-0 top-0 h-full bg-[#ff3366]/10"
                            style={{ width: `${Math.random() * 100}%` }}
                          />
                          <span>{(64250.5 + i * 10).toFixed(2)}</span>
                          <span>{(Math.random() * 5).toFixed(3)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="py-2 text-lg font-bold text-[#00ff9d] text-center border-y border-slate-800 my-2">
                      64,240.50
                    </div>
                    <div className="flex-1 overflow-hidden flex flex-col gap-1 text-[#00ff9d]">
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={`buy-${i}`}
                          className="flex justify-between relative"
                        >
                          <div
                            className="absolute right-0 top-0 h-full bg-[#00ff9d]/10"
                            style={{ width: `${Math.random() * 100}%` }}
                          />
                          <span>{(64230.5 - i * 10).toFixed(2)}</span>
                          <span>{(Math.random() * 5).toFixed(3)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Main Chart Area */}
                  <div className="col-span-9 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="text-2xl font-bold">
                          Bitcoin{" "}
                          <span className="text-slate-500 text-sm">
                            BTC/USD
                          </span>
                        </h2>
                        <div className="flex items-center gap-4 text-sm mt-1">
                          <span className="text-[#00ff9d] font-mono">
                            +2.45%
                          </span>
                          <span className="text-slate-500">Vol: 32.4B</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-1 bg-slate-800 rounded text-xs">
                          1H
                        </button>
                        <button className="px-3 py-1 bg-slate-800 text-[#00ff9d] border border-[#00ff9d]/30 rounded text-xs">
                          1D
                        </button>
                        <button className="px-3 py-1 bg-slate-800 rounded text-xs">
                          1W
                        </button>
                      </div>
                    </div>

                    <div className="flex-1 relative border border-slate-800 rounded-lg p-4">
                      <MiniGraph
                        data={[40, 50, 45, 60, 55, 70, 65, 80, 75, 90, 85, 100]}
                        isPositive={true}
                      />

                      {/* Floating UI Element */}
                      <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#050914]/80 backdrop-blur-md border border-[#00ff9d]/30 p-4 rounded-lg flex items-center gap-4 shadow-[0_0_30px_rgba(0,255,157,0.15)]"
                      >
                        <div className="w-10 h-10 rounded-full bg-[#00ff9d]/20 flex items-center justify-center text-[#00ff9d]">
                          <TrendingUp className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs text-slate-400 mb-1">
                            Buy Signal Detected
                          </div>
                          <div className="font-mono text-sm font-bold text-[#00ff9d]">
                            Confidence: 94.2%
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="h-16 mt-4 grid grid-cols-2 gap-4">
                      <button className="bg-[#00ff9d] text-[#050914] font-bold rounded-lg flex items-center justify-center">
                        Buy BTC
                      </button>
                      <button className="bg-[#ff3366] text-white font-bold rounded-lg flex items-center justify-center">
                        Sell BTC
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          2. LIVE MARKET GRID
          ========================================== */}
      <section className="py-24 bg-[#0a0f1c] border-y border-slate-800 relative z-20">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <Reveal>
              <h2 className="text-3xl font-bold">Live Markets</h2>
            </Reveal>
            <Reveal delay={0.2}>
              <Link
                href="#"
                className="text-sm font-bold text-[#00ff9d] hover:text-white transition-colors flex items-center gap-2"
              >
                View All Markets <ArrowRight className="w-4 h-4" />
              </Link>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {assets.map((asset, i) => {
                const isPositive = asset.change >= 0;
                // Generate random data for the mini graph based on current trend
                const graphData = Array.from(
                  { length: 10 },
                  () => Math.random() * 100,
                ).sort((a, b) => (isPositive ? a - b : b - a));

                return (
                  <Reveal key={asset.symbol} delay={i * 0.1}>
                    <div className="p-6 bg-[#050914] border border-slate-800 rounded-xl hover:border-[#00ff9d]/30 transition-colors group relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                      <div className="flex justify-between items-start mb-6 relative z-10">
                        <div>
                          <h3 className="font-bold text-lg mb-1">
                            {asset.name}
                          </h3>
                          <span className="text-xs text-slate-500 font-mono">
                            {asset.symbol}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="font-mono font-bold text-lg mb-1">
                            $
                            {asset.price.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </div>
                          <div
                            className={`text-xs font-bold font-mono px-2 py-1 rounded inline-block ${isPositive ? "bg-[#00ff9d]/10 text-[#00ff9d]" : "bg-[#ff3366]/10 text-[#ff3366]"}`}
                          >
                            {isPositive ? "+" : ""}
                            {asset.change.toFixed(2)}%
                          </div>
                        </div>
                      </div>

                      <div className="h-16 mb-4 relative z-10">
                        <MiniGraph data={graphData} isPositive={isPositive} />
                      </div>

                      <div className="flex justify-between items-center text-xs text-slate-500 font-mono border-t border-slate-800 pt-4 relative z-10">
                        <span>Vol: {asset.volume}</span>
                        <button className="text-white hover:text-[#00ff9d] transition-colors">
                          Trade {asset.symbol.split("/")[0]}
                        </button>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ==========================================
          3. METRICS / STATS
          ========================================== */}
      <section className="py-24 bg-[#050914]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x divide-slate-800">
          {METRICS.map((metric, i) => (
            <Reveal key={i} delay={i * 0.1} className="text-center px-4">
              <div className="text-4xl md:text-5xl font-bold text-white mb-4">
                {metric.value}
              </div>
              <div className="text-xs uppercase tracking-widest text-slate-500 font-bold">
                {metric.label}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ==========================================
          4. PRO FEATURES (Glassmorphism Cards)
          ========================================== */}
      <section className="py-32 bg-[#02040a] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,rgba(0,255,157,0.05)_0%,rgba(0,0,0,0)_50%)] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Engineered for <span className="text-[#00ff9d]">Alphas.</span>
              </h2>
              <p className="text-slate-400 text-lg">
                We stripped out the noise and focused entirely on speed,
                security, and actionable intelligence.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {FEATURES.map((feature, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="p-10 rounded-2xl bg-[#0a0f1c]/80 backdrop-blur-md border border-slate-800 hover:border-[#00ff9d]/30 transition-all group">
                  <div className="w-14 h-14 rounded-xl bg-[#050914] border border-slate-800 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-[#00ff9d] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          5. TESTIMONIALS
          ========================================== */}
      <section className="py-32 bg-[#050914] border-t border-slate-800">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <Reveal className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Trusted by Institutions
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="p-8 rounded-xl border border-slate-800 bg-[#0a0f1c] h-full flex flex-col">
                  <div className="flex gap-1 mb-8">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <div
                        key={star}
                        className="w-1.5 h-1.5 rounded-full bg-[#00ff9d]"
                      />
                    ))}
                  </div>
                  <p className="text-lg text-slate-300 leading-relaxed mb-8 flex-1">
                    "{t.quote}"
                  </p>
                  <div>
                    <div className="font-bold text-white mb-1">{t.author}</div>
                    <div className="text-xs text-slate-500">{t.role}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          6. MEGA FOOTER
          ========================================== */}
      <footer className="bg-[#02040a] pt-32 pb-12 px-6 md:px-12 border-t border-slate-800">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-24">
            <div className="lg:col-span-2">
              <Link
                href="/"
                className="text-2xl font-bold tracking-tighter flex items-center gap-2 mb-8"
              >
                <div className="w-6 h-6 bg-[#00ff9d] rounded-[4px]" />
                TRADE<span className="text-slate-500 font-light">OS</span>
              </Link>
              <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-sm">
                The next-generation trading operating system for digital assets
                and traditional equities.
              </p>
              <div className="flex gap-4">
                {/* Social Icons Placeholders */}
                <div className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center text-slate-400 hover:text-[#00ff9d] hover:border-[#00ff9d] transition-all cursor-pointer">
                  X
                </div>
                <div className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center text-slate-400 hover:text-[#00ff9d] hover:border-[#00ff9d] transition-all cursor-pointer">
                  In
                </div>
                <div className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center text-slate-400 hover:text-[#00ff9d] hover:border-[#00ff9d] transition-all cursor-pointer">
                  Gh
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Products</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#00ff9d] transition-colors"
                  >
                    Spot Trading
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#00ff9d] transition-colors"
                  >
                    Margin Trading
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#00ff9d] transition-colors"
                  >
                    Derivatives
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#00ff9d] transition-colors"
                  >
                    API Documentation
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Company</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#00ff9d] transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#00ff9d] transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#00ff9d] transition-colors"
                  >
                    Press
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#00ff9d] transition-colors"
                  >
                    Security
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Support</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#00ff9d] transition-colors"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#00ff9d] transition-colors"
                  >
                    Fee Schedule
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#00ff9d] transition-colors"
                  >
                    System Status
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#00ff9d] transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-slate-800 text-xs text-slate-500">
            <span>
              &copy; {new Date().getFullYear()} Trade OS Technologies Inc. All
              rights reserved.
            </span>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Cookie Preferences
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
