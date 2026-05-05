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
import { ArrowRight, ArrowUpRight, Star, Check, Menu, X, Globe, Clock, Quote, Search, ShoppingBag, Zap, Shield, Cpu, Bluetooth, Battery, Activity, BarChart3, Binary, Blocks, Coins, Database, Fingerprint, Layers, Link2, Lock, Share2, Wallet, Mail, MapPin, Phone } from "lucide-react";

import "../premium.css";

/* ==========================================================================
   DATA STRUCTURES
   ========================================================================= */

const DROPS = [
  {
    id: 1,
    title: "Void Genesis #001",
    artist: "0xSerpentine",
    price: "2.4 ETH",
    edition: "1 of 1",
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80",
    gradient: "from-violet-600 via-fuchsia-500 to-pink-500",
    desc: "A singular exploration of digital entropy. Minted on Ethereum Mainnet.",
  },
  {
    id: 2,
    title: "Neural Bloom #042",
    artist: "Aiko.eth",
    price: "0.88 ETH",
    edition: "10 of 100",
    img: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=1200&q=80",
    gradient: "from-cyan-500 via-blue-600 to-indigo-700",
    desc: "Generative organic forms synthesized through custom GAN networks.",
  },
  {
    id: 3,
    title: "Chrome Epoch #007",
    artist: "MECHASOUL",
    price: "1.2 ETH",
    edition: "3 of 50",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
    gradient: "from-amber-400 via-orange-500 to-rose-600",
    desc: "Mechanical precision meets fluid dynamics in a high-density 3D render.",
  },
  {
    id: 4,
    title: "Prism Cascade #019",
    artist: "Lux Protocol",
    price: "0.44 ETH",
    edition: "22 of 200",
    img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&q=80",
    gradient: "from-emerald-400 via-teal-500 to-cyan-600",
    desc: "Refraction study using ray-tracing at extreme bit-depths.",
  },
];

const SPECS = [
  {
    label: "Blockchain Protocol",
    val: "ERC-721A",
    icon: <Blocks className="w-4 h-4" />,
  },
  {
    label: "Storage Layer",
    val: "IPFS + Arweave",
    icon: <Database className="w-4 h-4" />,
  },
  {
    label: "Royalty Engine",
    val: "EIP-2981",
    icon: <Coins className="w-4 h-4" />,
  },
  {
    label: "Provenance Check",
    val: "On-Chain Sig",
    icon: <Fingerprint className="w-4 h-4" />,
  },
];

const LOGS = [
  {
    event: "MINT",
    user: "0x4f...7a",
    asset: "Void Genesis",
    time: "2m ago",
    val: "2.4 ETH",
  },
  {
    event: "BID",
    user: "0x12...3b",
    asset: "Neural Bloom",
    time: "5m ago",
    val: "0.9 ETH",
  },
  {
    event: "SALE",
    user: "0x9e...f1",
    asset: "Chrome Epoch",
    time: "12m ago",
    val: "1.2 ETH",
  },
  {
    event: "LIST",
    user: "0xbc...d4",
    asset: "Prism Cascade",
    time: "18m ago",
    val: "0.5 ETH",
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

export default function NexusMarketPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDrop, setActiveDrop] = useState<number | null>(null);
  const [walletConnected, setWalletConnected] = useState(false);

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
      className="premium-theme min-h-screen bg-[#05030f] text-white font-mono selection:bg-fuchsia-600 selection:text-white overflow-x-hidden"
      style={{ scrollBehavior: "smooth" }}
    >
      {/* ==========================================
          NAVIGATION
          ========================================== */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-1000 ${scrolled ? "bg-[#05030f]/95 backdrop-blur-md py-4 border-b border-white/5 shadow-lg" : "bg-transparent py-10"}`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="flex flex-col items-start">
            <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-white/20 mb-1">
              Marketplace.
            </span>
            <span className="text-xl md:text-2xl font-black tracking-tighter uppercase text-white">
              NEXUS<span className="text-fuchsia-600">.</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">
            <Link
              href="#drops"
              className="hover:text-fuchsia-600 transition-colors"
            >
              Drops
            </Link>
            <Link
              href="#engine"
              className="hover:text-fuchsia-600 transition-colors"
            >
              The_Engine
            </Link>
            <Link
              href="#activity"
              className="hover:text-fuchsia-600 transition-colors"
            >
              Live_Activity
            </Link>
            <Link
              href="#artists"
              className="hover:text-fuchsia-600 transition-colors"
            >
              Artists
            </Link>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden xl:flex flex-col items-end">
              <span className="text-[9px] font-bold text-white/10 uppercase tracking-widest">
                Multi-Chain Protocol
              </span>
              <span className="text-[11px] font-black text-fuchsia-600 flex items-center gap-1">
                ETHEREUM // BASE <Blocks className="w-3 h-3" />
              </span>
            </div>
            <MagneticBtn
              onClick={() => setWalletConnected(!walletConnected)}
              className={`px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all shadow-xl ${walletConnected ? "bg-white text-black" : "bg-fuchsia-600 text-white shadow-fuchsia-600/20"}`}
            >
              {walletConnected ? "0x4F...7A42" : "CONNECT_WALLET"}
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
            className="fixed inset-0 z-[100] bg-[#05030f] p-8 pt-32 flex flex-col border-l border-white/5"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-10 right-8"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="flex flex-col gap-10 text-5xl font-black tracking-tighter uppercase italic">
              <Link href="#drops" onClick={() => setMenuOpen(false)}>
                Drops
              </Link>
              <Link href="#engine" onClick={() => setMenuOpen(false)}>
                Engine
              </Link>
              <Link href="#activity" onClick={() => setMenuOpen(false)}>
                Activity
              </Link>
              <Link href="#artists" onClick={() => setMenuOpen(false)}>
                Artists
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==========================================
          1. HERO (Cyber Web3)
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
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&q=80"
            alt="Nexus Hero"
            fill
            className="object-cover brightness-[0.3]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05030f] via-[#05030f]/40 to-transparent" />
        </motion.div>

        {/* GLOW ORBS */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[150px] pointer-events-none animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-fuchsia-600/10 rounded-full blur-[150px] pointer-events-none animate-pulse"
          style={{ animationDelay: "2s" }}
        />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full">
          <Reveal>
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-fuchsia-600/10 rounded-full border border-fuchsia-600/30 text-fuchsia-600 text-[10px] font-bold uppercase tracking-widest mb-10 shadow-sm">
              <span className="w-2 h-2 bg-fuchsia-600 rounded-full animate-pulse" />
              Live Drop: 0xSerpentine Genesis
            </div>
            <h1 className="text-7xl md:text-9xl lg:text-[11rem] font-black leading-[0.85] tracking-tighter mb-12 uppercase italic">
              Own The <br /> <span className="text-fuchsia-600">Future.</span>
            </h1>
            <p className="max-w-xl text-lg md:text-xl text-white/30 leading-relaxed font-bold mb-12 uppercase tracking-tight">
              The curated marketplace for rare digital artifacts, on-chain
              provenance, and immutable creator royalties.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <MagneticBtn className="px-12 py-5 bg-fuchsia-600 text-white text-[10px] font-bold uppercase tracking-[0.4em] rounded-full hover:bg-white hover:text-black transition-all cursor-pointer shadow-2xl shadow-fuchsia-600/20">
                Explore Marketplace
              </MagneticBtn>
              <button className="px-12 py-5 border border-white/10 text-white text-[10px] font-bold uppercase tracking-[0.4em] rounded-full hover:bg-white hover:text-black transition-all cursor-pointer">
                Artist_Portal
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
              NEXUS_V2 // WEB3_CORE
            </span>
            <div className="w-32 h-[1px] bg-fuchsia-600/40" />
          </div>
        </motion.div>
      </section>

      {/* ==========================================
          2. THE MINTING ENGINE (Protocol Details)
          ========================================== */}
      <section
        id="engine"
        className="py-32 bg-[#05030f] border-y border-white/5"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-32 items-center">
            <div className="lg:col-span-5">
              <Reveal>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-fuchsia-600 mb-6 block">
                  The Nexus Protocol
                </span>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight mb-12 text-white uppercase italic">
                  Immutable <br />{" "}
                  <span className="text-fuchsia-600">Assets.</span>
                </h2>
                <p className="text-lg text-white/30 leading-relaxed font-bold mb-16 uppercase tracking-tight italic">
                  Every artifact is secured via ERC-721A with decentralized
                  storage on IPFS and Arweave, ensuring permanence beyond the
                  marketplace.
                </p>

                <div className="space-y-10">
                  {SPECS.map((item, i) => (
                    <div
                      key={i}
                      className="group border-l border-fuchsia-600/20 pl-8 hover:border-fuchsia-600 transition-all"
                    >
                      <div className="text-fuchsia-600 mb-4">{item.icon}</div>
                      <h4 className="text-sm font-bold uppercase tracking-tight mb-2 text-white/60">
                        {item.label}
                      </h4>
                      <div className="text-3xl font-black text-white mb-2 uppercase italic tabular-nums">
                        {item.val}
                      </div>
                      <p className="text-[10px] text-white/20 leading-relaxed font-bold uppercase tracking-widest">
                        Protocol Verified
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Reveal className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/5 bg-[#0a0a0a] p-1 group">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(162,28,175,0.1)_0%,transparent_70%)] animate-pulse" />
                <div className="relative h-full w-full border border-white/5 bg-[#05030f] p-8 flex flex-col justify-between overflow-hidden">
                  <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/5">
                    <div className="flex items-center gap-4">
                      <Binary className="w-5 h-5 text-fuchsia-600" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-fuchsia-600">
                        Blockchain_Logs_Live
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-1.5 h-1.5 bg-fuchsia-600 rounded-full animate-pulse" />
                      <div className="w-1.5 h-1.5 bg-fuchsia-600/30 rounded-full" />
                    </div>
                  </div>

                  <div className="space-y-4 font-mono">
                    {LOGS.map((log, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-6 text-[10px] py-2 border-b border-white/[0.02] group/log"
                      >
                        <span className="text-white/20 italic">{log.time}</span>
                        <span className="text-fuchsia-600 font-black uppercase tracking-widest">
                          {log.event}
                        </span>
                        <span className="text-white/40 flex-1 truncate">
                          {log.user} purchased {log.asset}
                        </span>
                        <span className="text-fuchsia-600/40 font-black">
                          [{log.val}]
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-12 flex justify-between items-end">
                    <div className="space-y-2">
                      <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">
                        Network Load
                      </span>
                      <div className="text-2xl font-black text-white italic">
                        4.2 Gwei
                      </div>
                    </div>
                    <div className="h-10 w-32 flex items-end gap-1">
                      {[4, 7, 5, 9, 4, 6, 8, 5, 7, 3, 6, 9].map((h, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height: `${h * 10}%` }}
                          transition={{
                            repeat: Infinity,
                            duration: 1,
                            delay: i * 0.1,
                            repeatType: "reverse",
                          }}
                          className="w-full bg-fuchsia-600/40 rounded-t-sm"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          3. DROPS (Vertical Grid)
          ========================================== */}
      <section id="drops" className="py-32 bg-[#05030f]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
            <Reveal>
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9] text-white italic">
                Active <br /> <span className="text-fuchsia-600">Drops.</span>
              </h2>
            </Reveal>
            <p className="max-w-sm text-sm text-white/30 leading-relaxed font-bold uppercase tracking-widest italic text-right">
              Explore the latest artifacts from verified NEXUS creators. Direct
              mint enabled.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {DROPS.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.1}>
                <div
                  onClick={() => setActiveDrop(i)}
                  className="group cursor-pointer bg-white/[0.02] border border-white/5 hover:border-fuchsia-600/40 transition-all rounded-3xl p-4 shadow-sm overflow-hidden"
                >
                  <div className="relative aspect-square rounded-2xl overflow-hidden mb-8">
                    <Image
                      src={p.img}
                      alt={p.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-1000"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${p.gradient} opacity-20 mix-blend-overlay`}
                    />
                  </div>
                  <div className="px-4 pb-4">
                    <span className="text-[10px] uppercase tracking-widest text-fuchsia-600 font-black mb-2 block">
                      {p.artist}
                    </span>
                    <h3 className="text-xl font-black uppercase tracking-tight mb-4 text-white truncate">
                      {p.title}
                    </h3>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-black text-white/40 italic">
                        {p.price}
                      </span>
                      <button className="p-3 bg-fuchsia-600 text-white rounded-full hover:bg-white hover:text-black transition-all">
                        <ArrowUpRight className="w-4 h-4" />
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
          4. SECONDARY MARKET (Stats Table)
          ========================================== */}
      <section
        id="activity"
        className="py-32 bg-[#05030f] border-y border-white/5"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <Reveal className="max-w-2xl mx-auto mb-20">
            <span className="text-[10px] uppercase tracking-[0.5em] font-black text-fuchsia-600 mb-6 block">
              Market Liquidity
            </span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic text-white">
              Live Index.
            </h2>
          </Reveal>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono">
              <thead>
                <tr className="border-b border-white/5 text-[10px] uppercase tracking-widest text-white/20">
                  <th className="pb-8 font-black">Asset_Name</th>
                  <th className="pb-8 font-black">Floor_Price</th>
                  <th className="pb-8 font-black">24h_Volume</th>
                  <th className="pb-8 font-black">Holders</th>
                  <th className="pb-8 font-black">Market_Cap</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[
                  {
                    name: "Void Genesis",
                    floor: "2.4 ETH",
                    vol: "142 ETH",
                    holders: "420",
                    cap: "1,200 ETH",
                    trend: "+",
                  },
                  {
                    name: "Neural Bloom",
                    floor: "0.8 ETH",
                    vol: "88 ETH",
                    holders: "1,200",
                    cap: "8,800 ETH",
                    trend: "-",
                  },
                  {
                    name: "Chrome Epoch",
                    floor: "1.2 ETH",
                    vol: "64 ETH",
                    holders: "500",
                    cap: "2,400 ETH",
                    trend: "+",
                  },
                  {
                    name: "Prism Cascade",
                    floor: "0.4 ETH",
                    vol: "32 ETH",
                    holders: "2,400",
                    cap: "4,200 ETH",
                    trend: "+",
                  },
                ].map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-white/[0.02] hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="py-8 font-black text-white group-hover:text-fuchsia-600 transition-colors uppercase italic">
                      {row.name}
                    </td>
                    <td className="py-8 text-white/60 tabular-nums">
                      {row.floor}
                    </td>
                    <td className="py-8 text-white/60 tabular-nums">
                      {row.vol}
                    </td>
                    <td className="py-8 text-white/60 tabular-nums">
                      {row.holders}
                    </td>
                    <td className="py-8 flex items-center justify-between">
                      <span className="text-white/60 tabular-nums">
                        {row.cap}
                      </span>
                      <span
                        className={
                          row.trend === "+"
                            ? "text-emerald-500"
                            : "text-rose-500"
                        }
                      >
                        {row.trend}12.4%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ==========================================
          5. STATS (Counter)
          ========================================== */}
      <section className="py-24 bg-[#05030f] border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-2 lg:grid-cols-4 gap-16 text-center">
          {[
            { label: "Total_Traded", val: 142000, suffix: " ETH" },
            { label: "Verified_Artists", val: 840, suffix: " Creators" },
            { label: "NFT_Circulation", val: 12000, suffix: " Assets" },
            { label: "Royalty_Paid", val: 12400, suffix: " ETH" },
          ].map((stat, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="text-5xl md:text-7xl font-black text-fuchsia-600 mb-4 italic tabular-nums">
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
          6. FAQ (Accordion)
          ========================================== */}
      <section className="py-32 bg-[#05030f]">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-none uppercase italic text-white">
              Market_Protocol
            </h2>
          </Reveal>

          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                q: "How are royalties enforced?",
                a: "NEXUS implements EIP-2981, ensuring that 10% of every secondary sale is automatically routed to the creator's wallet on-chain.",
              },
              {
                q: "What chains are supported?",
                a: "We currently support Ethereum Mainnet and Base (L2). Multi-chain bridge for Solana and Polygon is in private beta.",
              },
              {
                q: "Is the art stored on-chain?",
                a: "Artifact metadata is on-chain, while media files are stored on IPFS and Arweave for long-term decentralized permanence.",
              },
              {
                q: "How do I apply as a creator?",
                a: "Artist applications are reviewed monthly. We prioritize high-density digital craftsmanship and clear on-chain history.",
              },
            ].map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b border-white/10"
              >
                <AccordionTrigger className="text-left text-sm uppercase font-bold tracking-widest py-8 hover:text-fuchsia-600 hover:no-underline">
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
          7. MEGA FOOTER (Cyber-Web3)
          ========================================== */}
      <footer className="bg-[#0a0a0a] pt-32 pb-12 px-6 md:px-12 border-t border-white/5 relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-32">
            <div className="lg:col-span-5">
              <Reveal>
                <div className="flex flex-col mb-10">
                  <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-white/20 mb-1">
                    Marketplace.
                  </span>
                  <span className="text-2xl font-black tracking-tighter uppercase text-white">
                    NEXUS<span className="text-fuchsia-600">.</span>
                  </span>
                </div>
                <p className="text-white/20 max-w-sm mb-12 uppercase tracking-widest text-[10px] font-bold leading-relaxed italic">
                  Immutable digital artifacts for the next generation of
                  collectors. Secured by the Nexus Protocol.
                </p>
                <form
                  className="relative max-w-md"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="email"
                    placeholder="AUTHENTICATED_EMAIL"
                    className="w-full bg-white/[0.02] border border-white/5 rounded-none px-6 py-4 text-xs font-bold outline-none focus:border-fuchsia-600 text-white transition-all uppercase tracking-widest"
                  />
                  <button
                    type="submit"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-fuchsia-600 hover:text-white transition-colors uppercase tracking-[0.3em]"
                  >
                    ENROLL
                  </button>
                </form>
              </Reveal>
            </div>

            <div className="lg:col-span-2 lg:col-start-7">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-fuchsia-600 mb-10">
                Protocol
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/20">
                <li>
                  <Link
                    href="#"
                    className="hover:text-fuchsia-600 transition-colors"
                  >
                    Drops_Live
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-fuchsia-600 transition-colors"
                  >
                    Secondary_Market
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-fuchsia-600 transition-colors"
                  >
                    Auction_Nodes
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-fuchsia-600 transition-colors"
                  >
                    Artist_Portal
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-fuchsia-600 mb-10">
                Network
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/20">
                <li>
                  <Link
                    href="#"
                    className="hover:text-fuchsia-600 transition-colors"
                  >
                    Nexus_SDK
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-fuchsia-600 transition-colors"
                  >
                    Validator_Stats
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-fuchsia-600 transition-colors"
                  >
                    Governance_DAO
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-fuchsia-600 transition-colors"
                  >
                    Permanence_Vault
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-fuchsia-600 mb-10">
                Terminal
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/20">
                <li>
                  <Link
                    href="#"
                    className="hover:text-fuchsia-600 transition-colors flex items-center gap-3"
                  >
                    <Globe className="w-3 h-3" /> Globe
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-fuchsia-600 transition-colors flex items-center gap-3"
                  >
                    <Globe className="w-3 h-3" /> X_Protocol
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-fuchsia-600 transition-colors flex items-center gap-3"
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
                &copy; {new Date().getFullYear()} NEXUS Protocol Labs.
              </span>
              <Link href="#" className="hover:text-white transition-colors">
                Regulatory_Terms
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Privacy_Buffer
              </Link>
            </div>
            <div className="flex gap-10">
              <span>Ethereum Mainnet // Base L2</span>
              <span>Provenance as Art</span>
            </div>
          </div>
        </div>
      </footer>

      {/* DROP MODAL */}
      <AnimatePresence>
        {activeDrop !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6"
            onClick={() => setActiveDrop(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="bg-[#0e0a1a] border border-white/10 max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-3xl shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveDrop(null)}
                className="absolute top-8 right-8 text-white/20 hover:text-fuchsia-600 transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="relative aspect-square md:aspect-auto">
                <Image
                  src={DROPS[activeDrop].img}
                  alt="Drop"
                  fill
                  className="object-cover brightness-75"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${DROPS[activeDrop].gradient} opacity-40 mix-blend-overlay`}
                />
              </div>
              <div className="p-12 flex flex-col justify-between bg-[#0e0a1a]">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-fuchsia-600 font-black mb-4">
                    On-Chain Artifact // {DROPS[activeDrop].edition}
                  </div>
                  <h3 className="text-4xl font-black uppercase tracking-tighter italic text-white mb-6 leading-none">
                    {DROPS[activeDrop].title}
                  </h3>
                  <p className="text-sm text-white/40 leading-relaxed font-bold mb-10 italic">
                    "{DROPS[activeDrop].desc}"
                  </p>

                  <div className="grid grid-cols-1 gap-4 mb-10">
                    {SPECS.map((s, i) => (
                      <div
                        key={i}
                        className="flex justify-between text-[10px] border-b border-white/5 pb-2 font-mono"
                      >
                        <div className="flex items-center gap-2">
                          <div className="text-fuchsia-600">{s.icon}</div>
                          <span className="uppercase tracking-widest text-white/20 font-black">
                            {s.label}
                          </span>
                        </div>
                        <span className="font-black text-white/60 italic">
                          {s.val}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <button className="w-full py-5 bg-fuchsia-600 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all cursor-pointer shadow-xl shadow-fuchsia-600/10">
                    PLACE_BID — {DROPS[activeDrop].price}
                  </button>
                  <button className="w-full py-5 border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-fuchsia-600 transition-all cursor-pointer">
                    VIEW_ON_ETHERSCAN
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`::-webkit-scrollbar{width:4px;background:#05030f}::-webkit-scrollbar-thumb{background:rgba(162,28,175,0.2)}`}</style>
    </div>
  );
}
