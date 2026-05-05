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
import { useState, useRef, useEffect } from "react";
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
import { Activity, Zap, Shield, ChevronRight, Star, Check, Menu, X, ArrowRight, Play, TrendingUp, Timer, Cpu, BarChart3, Bolt, Radio, Layers, Gauge, Globe, Database, Server, Smartphone, Search, ShoppingBag, Heart, Dna, Microscope, Binary, FlaskConical, Target, Award } from "lucide-react";

import "../premium.css";

/* ==========================================================================
   DATA STRUCTURES
   ========================================================================== */

const PRODUCTS = [
  {
    id: 1,
    name: "APEX PRO X1",
    category: "Exoskeleton",
    price: "$3,499",
    stat: "+34% Peak Power",
    badge: "FLAGSHIP",
    img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80",
    specs: [
      ["Sensor Rate", "1,200 Hz"],
      ["Weight", "380 g"],
      ["Battery", "8–14 hr"],
      ["Connectivity", "BLE 5.4"],
    ],
    desc: "Carbon-fibre actuators driven by our proprietary muscle-synergy algorithm. 1,200 data points per second. Real-time micro-force amplification that feels like an extension of your own nervous system.",
  },
  {
    id: 2,
    name: "NEURAL STRIDE",
    category: "Running Analysis",
    price: "$899",
    stat: "2ms Gait Latency",
    badge: "BEST SELLER",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
    specs: [
      ["Latency", "2 ms"],
      ["Sensors", "48 IMUs"],
      ["App Sync", "Real-time"],
      ["Water Rating", "IP68"],
    ],
    desc: "48 inertial measurement units capture every millisecond of your stride. Neural Stride translates raw biomechanical data into actionable coaching — in real time, mid-run.",
  },
  {
    id: 3,
    name: "CRYO RECOVERY",
    category: "Recovery Tech",
    price: "$1,250",
    stat: "−40% Recovery Time",
    badge: "NEW 2026",
    img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&q=80",
    specs: [
      ["Temp Range", "−5°C–15°C"],
      ["Cycle Time", "12 min"],
      ["Sessions", "Unlimited"],
      ["Control", "App + Voice"],
    ],
    desc: "Precision cryotherapy calibrated to your tissue temperature in real time. The only recovery system that adapts its protocol based on your current HRV and lactate proxy data.",
  },
];

const RESEARCH_MILESTONES = [
  {
    year: "2024",
    title: "Neural Link Alpha",
    desc: "First successful real-time motor neuron feedback loop in elite sprinters.",
    icon: <Binary className="w-5 h-5" />,
  },
  {
    year: "2025",
    title: "Carbon Actuation V2",
    desc: "Proprietary lightweight carbon actuators reach 94% efficiency rating.",
    icon: <Layers className="w-5 h-5" />,
  },
  {
    year: "2026",
    title: "Graphene Power Cell",
    desc: "Deployment of high-density solid-state batteries for 14-hour continuous assist.",
    icon: <Zap className="w-5 h-5" />,
  },
];

const LAB_SPECS = [
  {
    label: "Tissue Density Analysis",
    val: "99.2%",
    icon: <Microscope className="w-4 h-4" />,
  },
  {
    label: "Lactate Proxy Accuracy",
    val: "±0.02%",
    icon: <Dna className="w-4 h-4" />,
  },
  {
    label: "Neural Latency",
    val: "1.4ms",
    icon: <Binary className="w-4 h-4" />,
  },
  {
    label: "Material Fatigue Resistance",
    val: "800k Cycles",
    icon: <FlaskConical className="w-4 h-4" />,
  },
];

const PERFORMANCE_CENTERS = [
  { city: "Berlin", center: "Hub-01", status: "Active", latency: "0.8ms" },
  { city: "Seoul", center: "Hub-02", status: "Active", latency: "1.2ms" },
  { city: "Palo Alto", center: "Hub-03", status: "Active", latency: "0.9ms" },
  { city: "Tokyo", center: "Hub-04", status: "Standby", latency: "---" },
];

/* ==========================================================================
   UTILITY COMPONENTS
   ========================================================================== */

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
      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Counter({
  to,
  suffix = "",
  prefix = "",
}: {
  to: number;
  suffix?: string;
  prefix?: string;
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
      {count}
      {suffix}
    </span>
  );
}

/* ==========================================================================
   MAIN PAGE COMPONENT
   ========================================================================== */

export default function StrydePerformancePage() {
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
      className="premium-theme min-h-screen bg-[#060810] text-white font-mono selection:bg-[#00e5ff] selection:text-black overflow-x-hidden"
      style={{ scrollBehavior: "smooth" }}
    >
      {/* ==========================================
          SCANLINE / HUD OVERLAY
          ========================================== */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

      {/* ==========================================
          NAVIGATION
          ========================================== */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${scrolled ? "bg-[#060810]/95 backdrop-blur-md py-4 border-b border-white/5 shadow-[0_0_20px_rgba(0,229,255,0.05)]" : "bg-transparent py-10"}`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link
            href="/"
            className="text-xl md:text-2xl font-black tracking-tighter uppercase flex items-center gap-2"
          >
            STRYDE<span className="text-[#00e5ff]">TECH</span>
          </Link>

          <div className="hidden lg:flex items-center gap-10 text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">
            <Link href="#" className="hover:text-[#00e5ff] transition-colors">
              Systems
            </Link>
            <Link href="#" className="hover:text-[#00e5ff] transition-colors">
              Research
            </Link>
            <Link href="#" className="hover:text-[#00e5ff] transition-colors">
              Performance_Log
            </Link>
            <Link href="#" className="hover:text-[#00e5ff] transition-colors">
              Pricing
            </Link>
          </div>

          <div className="flex items-center gap-6">
            <button className="hidden md:block hover:text-[#00e5ff] transition-colors text-white/40">
              <Search className="w-5 h-5" />
            </button>
            <button className="px-6 py-2 bg-[#00e5ff] text-[#060810] text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all">
              Request_Access
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
            className="fixed inset-0 z-[100] bg-[#060810] p-8 pt-32 flex flex-col border-l border-[#00e5ff]/10"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-10 right-8"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="flex flex-col gap-10 text-4xl font-black tracking-tighter uppercase">
              <Link href="#" onClick={() => setMenuOpen(false)}>
                Systems
              </Link>
              <Link href="#" onClick={() => setMenuOpen(false)}>
                Research
              </Link>
              <Link href="#" onClick={() => setMenuOpen(false)}>
                Performance_Log
              </Link>
              <Link href="#" onClick={() => setMenuOpen(false)}>
                Pricing
              </Link>
            </div>
            <div className="mt-auto pt-10 border-t border-white/5">
              <div className="text-[10px] uppercase tracking-widest text-[#00e5ff] mb-4">
                Uptime: 99.998%
              </div>
              <div className="w-full h-0.5 bg-white/10 overflow-hidden">
                <motion.div
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="h-full w-1/3 bg-[#00e5ff]"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==========================================
          1. HERO (HUD Aesthetic)
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
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1600&q=80"
            alt="Sports Performance Hero"
            fill
            className="object-cover grayscale brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060810] via-[#060810]/40 to-transparent" />
        </motion.div>

        {/* HUD Graphics */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] border border-[#00e5ff]/5 flex items-center justify-center">
            <div className="w-full h-[1px] bg-[#00e5ff]/5" />
            <div className="h-full w-[1px] bg-[#00e5ff]/5 absolute" />
            {/* Circular HUD Elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute w-[500px] h-[500px] border border-dashed border-[#00e5ff]/10 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute w-[300px] h-[300px] border border-dotted border-[#00e5ff]/20 rounded-full"
            />
          </div>
        </div>

        <div className="relative z-20 max-w-[1400px] mx-auto px-6 md:px-12 w-full">
          <Reveal>
            <div className="flex items-center gap-4 mb-8">
              <Badge className="bg-[#00e5ff]/10 border border-[#00e5ff]/30 text-[#00e5ff] rounded-none px-4 py-1 text-[10px] tracking-widest font-bold">
                ALPHA_UNIT // 2026
              </Badge>
              <span className="text-[10px] text-white/30 tracking-[0.3em] font-bold">
                LATENCY: 1.4MS
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-black leading-[0.82] tracking-tighter mb-10 uppercase">
              Human <br /> <span className="text-[#00e5ff]">Optimized.</span>
            </h1>
            <p className="max-w-2xl text-lg md:text-xl text-white/50 leading-relaxed font-light mb-12 uppercase tracking-widest">
              Carbon-fibre exoskeletons. Neural gait analysis. Cryogenic
              recovery. We don't just measure performance; we engineer it.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <button className="px-12 py-5 bg-[#00e5ff] text-[#060810] text-[10px] uppercase tracking-[0.4em] font-black hover:bg-white transition-all cursor-pointer shadow-[0_0_30px_rgba(0,229,255,0.2)]">
                Initialize Systems
              </button>
              <button className="px-12 py-5 border border-white/20 text-white text-[10px] uppercase tracking-[0.4em] font-black hover:bg-white hover:text-[#060810] transition-all cursor-pointer">
                View Performance_Log
              </button>
            </div>
          </Reveal>
        </div>

        {/* Data Stream Sidebar */}
        <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-10 z-20">
          {[
            { label: "VO2_MAX_DELTA", val: "+14.2%" },
            { label: "LACTATE_PROXY", val: "0.82 mmol/L" },
            { label: "NEURAL_SYNC", val: "99.4%" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + i * 0.2 }}
              className="text-right border-r-2 border-[#00e5ff] pr-6"
            >
              <div className="text-[9px] text-white/30 tracking-widest mb-1 font-bold">
                {stat.label}
              </div>
              <div className="text-2xl font-black text-[#00e5ff]">
                {stat.val}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ==========================================
          2. THE RESEARCH (The Lab)
          ========================================== */}
      <section className="py-32 bg-[#080a14] border-y border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-32 items-center">
            <div className="lg:col-span-5">
              <Reveal>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#00e5ff] mb-6 block">
                  Research_Facility // Hub_03
                </span>
                <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-tight mb-12 uppercase">
                  Biological <br />{" "}
                  <span className="text-white/20">Validation.</span>
                </h2>

                <div className="space-y-12">
                  {RESEARCH_MILESTONES.map((milestone, i) => (
                    <div key={i} className="group flex gap-8">
                      <div className="w-14 h-14 bg-white/5 border border-white/10 flex items-center justify-center text-[#00e5ff] group-hover:bg-[#00e5ff] group-hover:text-black transition-all">
                        {milestone.icon}
                      </div>
                      <div>
                        <div className="text-[10px] font-black text-[#00e5ff] mb-1">
                          {milestone.year}
                        </div>
                        <h4 className="text-lg font-bold uppercase tracking-tight mb-2">
                          {milestone.title}
                        </h4>
                        <p className="text-sm text-white/40 leading-relaxed font-light">
                          {milestone.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
              {LAB_SPECS.map((spec, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="p-10 bg-[#060810] border border-white/5 hover:border-[#00e5ff]/30 transition-all group">
                    <div className="text-[#00e5ff]/40 mb-8 group-hover:text-[#00e5ff]">
                      {spec.icon}
                    </div>
                    <div className="text-4xl font-black text-white mb-4">
                      {spec.val}
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold">
                      {spec.label}
                    </div>
                  </div>
                </Reveal>
              ))}

              <Reveal className="md:col-span-2 relative aspect-[21/9] rounded-sm overflow-hidden border border-white/5">
                <Image
                  src="https://images.unsplash.com/photo-1530124560677-bdaea92c5a3b?q=80&w=1200&auto=format&fit=crop"
                  alt="Lab Scan"
                  fill
                  className="object-cover opacity-40 grayscale"
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#060810_100%)]" />
                <div className="absolute bottom-6 left-6 text-[8px] font-bold text-[#00e5ff] flex gap-8 uppercase tracking-widest">
                  <span>BIO_FEEDBACK: STABLE</span>
                  <span>SYNC_RATE: 99.98%</span>
                  <span>ENCRYPTION: AES-256</span>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          3. SYSTEMS GRID
          ========================================== */}
      <section className="py-32 bg-[#060810]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
            <Reveal>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
                Integrated <br />{" "}
                <span className="text-[#00e5ff]">Ecosystem.</span>
              </h2>
            </Reveal>
            <p className="max-w-sm text-sm text-white/40 leading-relaxed uppercase tracking-widest font-light">
              Our suite of hardware and software works in absolute mechanical
              harmony, providing a 360-degree performance overview.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {PRODUCTS.map((product, i) => (
              <Reveal key={product.id} delay={i * 0.1}>
                <div
                  onClick={() => setActiveProduct(i)}
                  className="group cursor-pointer bg-[#0c0f1d] border border-white/5 hover:border-[#00e5ff]/20 transition-all p-1"
                >
                  <div className="relative aspect-[4/5] overflow-hidden mb-8">
                    <Image
                      src={product.img}
                      alt={product.name}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0f1d] to-transparent" />
                    <div className="absolute top-6 left-6">
                      <Badge className="bg-[#00e5ff] text-[#060810] rounded-none px-4 py-1 text-[9px] font-black uppercase tracking-widest">
                        {product.badge}
                      </Badge>
                    </div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="text-[9px] uppercase tracking-[0.4em] text-white/40 mb-2">
                        {product.category}
                      </div>
                      <h3 className="text-3xl font-black uppercase tracking-tighter group-hover:text-[#00e5ff] transition-colors">
                        {product.name}
                      </h3>
                    </div>
                  </div>
                  <div className="p-8 pt-0">
                    <p className="text-sm text-white/40 leading-relaxed font-light mb-8 italic">
                      "{product.desc.slice(0, 100)}..."
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-black text-white">
                        {product.price}
                      </span>
                      <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-[#00e5ff] group-hover:translate-x-2 transition-transform">
                        Initialize <ChevronRight className="w-4 h-4" />
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
          4. PERFORMANCE CENTERS (Global Hubs)
          ========================================== */}
      <section className="py-32 bg-[#080a14] border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <Reveal>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#00e5ff] mb-6 block">
                  Global_Network
                </span>
                <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-tight mb-12 uppercase">
                  Performance <br />{" "}
                  <span className="text-white/20">Centres.</span>
                </h2>
                <p className="text-lg text-white/50 leading-relaxed font-light mb-12 max-w-lg">
                  Our physical infrastructure provides the ultra-low latency
                  compute required for real-time neural processing. Every center
                  is equipped with Tier-1 medical biomechanics labs.
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[10px] uppercase tracking-widest font-bold">
                    <thead className="border-b border-white/10">
                      <tr>
                        <th className="pb-6 text-white/30 font-bold">
                          Location
                        </th>
                        <th className="pb-6 text-white/30 font-bold">
                          Center_ID
                        </th>
                        <th className="pb-6 text-white/30 font-bold">Status</th>
                        <th className="pb-6 text-white/30 font-bold">
                          Latency
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {PERFORMANCE_CENTERS.map((hub, i) => (
                        <tr
                          key={i}
                          className="hover:bg-white/2 transition-colors"
                        >
                          <td className="py-6 text-white">{hub.city}</td>
                          <td className="py-6 text-white/50">{hub.center}</td>
                          <td className="py-6">
                            <span
                              className={`inline-flex items-center gap-2 ${hub.status === "Active" ? "text-green-400" : "text-red-400"}`}
                            >
                              <div
                                className={`w-1.5 h-1.5 rounded-full ${hub.status === "Active" ? "bg-green-400 animate-pulse" : "bg-red-400"}`}
                              />
                              {hub.status}
                            </span>
                          </td>
                          <td className="py-6 text-[#00e5ff]">{hub.latency}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Reveal>
            </div>

            <Reveal className="relative aspect-square md:aspect-video rounded-sm overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1544450173-8c87924045cc?q=80&w=1200&auto=format&fit=crop"
                alt="Center"
                fill
                className="object-cover grayscale brightness-75 group-hover:scale-105 transition-transform duration-[2s]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080a14] via-transparent to-transparent" />
              <div className="absolute top-10 left-10">
                <div className="flex items-center gap-4 text-[10px] font-bold text-[#00e5ff] uppercase tracking-widest">
                  <Globe className="w-4 h-4" /> Network: Active
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ==========================================
          5. STATS COUNTER BAR
          ========================================== */}
      <section className="py-24 bg-[#00e5ff] text-[#060810]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-2 lg:grid-cols-4 gap-16 text-center">
          {[
            { label: "Elite_Athletes", val: 12400, suffix: "+" },
            { label: "Data_Points_Sec", val: 1200, suffix: "" },
            { label: "Perf_Delta_Avg", val: 34, suffix: "%" },
            { label: "Scientific_Pubs", val: 127, suffix: "+" },
          ].map((stat, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="text-5xl md:text-7xl font-black mb-4">
                <Counter to={stat.val} suffix={stat.suffix} />
              </div>
              <div className="text-[10px] font-black uppercase tracking-[0.4em]">
                {stat.label}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ==========================================
          6. PROFESSIONAL INTEGRATION
          ========================================== */}
      <section className="py-32 bg-[#060810]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <Reveal className="relative aspect-square md:aspect-[4/5] rounded-sm overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop"
                alt="Pro Integration"
                fill
                className="object-cover opacity-60 grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060810] via-transparent to-transparent" />
              <div className="absolute bottom-12 left-12 right-12">
                <h3 className="text-3xl font-black uppercase tracking-tighter italic text-white mb-6">
                  Built for <br /> Organizations.
                </h3>
                <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-[#00e5ff] hover:translate-x-2 transition-transform">
                  Enterprise_Solutions <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </Reveal>

            <div>
              <Reveal>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#00e5ff] mb-6 block">
                  Organization_Log
                </span>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-12 uppercase">
                  Pro-Grade <br />{" "}
                  <span className="text-white/20">Deployment.</span>
                </h2>
                <div className="space-y-10">
                  {[
                    {
                      title: "Centralized Fleet Management",
                      desc: "Monitor entire rosters in real time from a single encrypted dashboard.",
                      icon: <Server className="w-5 h-5" />,
                    },
                    {
                      title: "Secure Data Protocol",
                      desc: "HIPAA and GDPR compliant data processing for athlete privacy.",
                      icon: <Shield className="w-5 h-5" />,
                    },
                    {
                      title: "Bespoke Algorithm Tuning",
                      desc: "Customized feedback parameters based on specific sport biomechanics.",
                      icon: <Binary className="w-5 h-5" />,
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-8 group">
                      <div className="text-white/20 group-hover:text-[#00e5ff] transition-colors">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold uppercase mb-2 text-white">
                          {item.title}
                        </h4>
                        <p className="text-sm text-white/40 leading-relaxed font-light">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          7. FAQ (Technical Data)
          ========================================== */}
      <section className="py-32 bg-[#080a14] border-y border-white/5">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
              Intel_Buffer
            </h2>
          </Reveal>

          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                q: "How is data processed in real-time?",
                a: "Every STRYDE unit contains an on-board neural processor performing edge computing to reduce latency to under 1.4ms. Secondary high-density data is offloaded to our global performance centers for deep biomechanical analysis.",
              },
              {
                q: "Is the hardware water resistant?",
                a: "Yes. All NEURAL STRIDE and APEX PRO X1 units are rated IP68, allowing for training in all weather conditions, including extreme moisture and dust exposure.",
              },
              {
                q: "What is the expected lifespan of the actuators?",
                a: "Our Grade 5 carbon actuators are stress-tested for 800,000 cycles, equivalent to approximately 5 years of professional-grade daily training. We offer a full replacement program at 600,000 cycles.",
              },
              {
                q: "Do you offer private server installations?",
                a: "For Tier-1 national programs and professional franchises, we offer on-site private server installations for absolute data sovereignty.",
              },
            ].map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b border-white/5"
              >
                <AccordionTrigger className="text-left text-sm uppercase font-bold tracking-widest py-6 hover:text-[#00e5ff] hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-white/40 leading-relaxed font-light italic pb-8">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ==========================================
          8. MEGA FOOTER (Technical Layout)
          ========================================== */}
      <footer className="bg-[#060810] pt-32 pb-12 px-6 md:px-12 border-t border-white/5 relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-32">
            <div className="lg:col-span-5">
              <Reveal>
                <div className="text-2xl font-black tracking-tighter uppercase mb-10">
                  STRYDE<span className="text-[#00e5ff]">TECH</span>
                </div>
                <p className="text-white/40 max-w-sm mb-12 uppercase tracking-widest text-[11px] leading-relaxed">
                  The only integrated performance system trusted by the world's
                  elite athletic organizations. Neural biomechanics. Carbon
                  actuation. Cryogenic recovery.
                </p>
                <form
                  className="relative max-w-md"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="email"
                    placeholder="ENCRYPTED_EMAIL"
                    className="w-full bg-white/2 border border-white/10 rounded-none px-6 py-4 text-xs font-bold outline-none focus:border-[#00e5ff] text-white transition-all uppercase tracking-widest"
                  />
                  <button
                    type="submit"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-[#00e5ff] hover:text-white transition-colors uppercase tracking-[0.3em]"
                  >
                    AUTHENTICATE
                  </button>
                </form>
              </Reveal>
            </div>

            <div className="lg:col-span-2 lg:col-start-7">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-10">
                Directory
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/40">
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#00e5ff] transition-colors"
                  >
                    Exoskeletons
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#00e5ff] transition-colors"
                  >
                    Neural_Stride
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#00e5ff] transition-colors"
                  >
                    Recovery_Lab
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#00e5ff] transition-colors"
                  >
                    Pricing_Access
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-10">
                Intel
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/40">
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#00e5ff] transition-colors"
                  >
                    Research_Docs
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#00e5ff] transition-colors"
                  >
                    Safety_Protocol
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#00e5ff] transition-colors"
                  >
                    API_Reference
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#00e5ff] transition-colors"
                  >
                    FAQ_Buffer
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-10">
                Social_Log
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/40">
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#00e5ff] transition-colors flex items-center gap-3"
                  >
                    <Globe className="w-3 h-3" /> Globe
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#00e5ff] transition-colors flex items-center gap-3"
                  >
                    <Globe className="w-3 h-3" /> X_Protocol
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#00e5ff] transition-colors flex items-center gap-3"
                  >
                    <Globe className="w-3 h-3" /> Neural_Link
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-10 border-t border-white/5 text-[9px] font-bold uppercase tracking-widest text-white/20">
            <div className="flex items-center gap-10">
              <span>
                &copy; {new Date().getFullYear()} Stryde Performance Systems
                Inc.
              </span>
              <Link href="#" className="hover:text-white transition-colors">
                Privacy_Protocol
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Terms_of_Trade
              </Link>
            </div>
            <div className="flex gap-10">
              <span>Location: Palo Alto // Hub_03</span>
              <span className="flex items-center gap-2">
                Status:{" "}
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />{" "}
                Fully Optimized
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* PRODUCT MODAL (Placeholder logic) */}
      <AnimatePresence>
        {activeProduct !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setActiveProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="bg-[#0c1020] border border-[#00e5ff]/20 max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-square md:aspect-auto">
                <Image
                  src={PRODUCTS[activeProduct].img}
                  alt="Product"
                  fill
                  className="object-cover grayscale"
                />
              </div>
              <div className="p-12 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-[#00e5ff] font-black mb-4">
                    {PRODUCTS[activeProduct].category} //{" "}
                    {PRODUCTS[activeProduct].badge}
                  </div>
                  <h3 className="text-4xl font-black uppercase tracking-tight text-white mb-6">
                    {PRODUCTS[activeProduct].name}
                  </h3>
                  <p className="text-sm text-white/40 leading-relaxed font-light mb-10 italic">
                    "{PRODUCTS[activeProduct].desc}"
                  </p>

                  <div className="grid grid-cols-1 gap-4 mb-10">
                    {PRODUCTS[activeProduct].specs.map(([k, v]) => (
                      <div
                        key={k}
                        className="flex justify-between text-xs border-b border-white/10 pb-2"
                      >
                        <span className="uppercase tracking-widest text-white/30">
                          {k}
                        </span>
                        <span className="font-bold text-white">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <button className="w-full py-5 bg-[#00e5ff] text-[#060810] text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all cursor-pointer">
                  Initialize Acquisition &mdash; {PRODUCTS[activeProduct].price}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`::-webkit-scrollbar{width:4px;background:#060810}::-webkit-scrollbar-thumb{background:#00e5ff10}`}</style>
    </div>
  );
}
