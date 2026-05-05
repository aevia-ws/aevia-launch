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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Plane, Globe, Clock, ShieldCheck, Zap, Mail, Phone, ChevronRight, ArrowRight, X, Menu, Compass, Navigation, MapPin, Gauge, Users, Award, Calendar, Wind, Star } from "lucide-react";

import "../premium.css";

/* ==========================================================================
   DATA STRUCTURES
   ========================================================================= */

const FLEET = [
  {
    id: 1,
    name: "Global 7500",
    class: "Ultra Long Range",
    range: "7,700 nm",
    pax: "19",
    speed: "Mach 0.925",
    img: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&q=80",
    desc: "The world's largest and longest-range business jet. A masterclass in luxury and range.",
  },
  {
    id: 2,
    name: "Gulfstream G650ER",
    class: "Long Range",
    range: "7,500 nm",
    pax: "16",
    speed: "Mach 0.90",
    img: "https://images.unsplash.com/photo-1626245914562-68a392911c70?w=800&q=80",
    desc: "Speed and range redefined. The industry standard for international executive travel.",
  },
  {
    id: 3,
    name: "Cessna Citation Longitude",
    class: "Super-Midsize",
    range: "3,500 nm",
    pax: "12",
    speed: "Mach 0.84",
    img: "https://images.unsplash.com/photo-1521111998-1549419b44c3?w=800&q=80",
    desc: "Revolutionary comfort with the lowest cabin altitude in its class.",
  },
];

const VALUES = [
  {
    icon: Clock,
    title: "Zero Wait Time",
    desc: "Arrive 15 minutes before take-off. Skip the queues, the security, and the compromise.",
  },
  {
    icon: Globe,
    title: "Global Access",
    desc: "Access 5,000+ airports worldwide, including those inaccessible to commercial airlines.",
  },
  {
    icon: ShieldCheck,
    title: "Uncompromising Safety",
    desc: "Wyvern Wingman and ARGUS Gold rated. Every flight exceeds FAA Part 135 standards.",
  },
  {
    icon: Zap,
    title: "Instant Logistics",
    desc: "Charter a jet in as little as 4 hours. Our global fleet is always on standby for you.",
  },
];

const FLIGHT_LOGS = [
  { label: "Total Flights", value: "14,200+" },
  { label: "Countries Served", value: "120" },
  { label: "Fleet Availability", value: "99.8%" },
  { label: "Safety Rating", value: "Platinum" },
];

/* ==========================================================================
   UTILITY COMPONENTS
   ========================================================================= */

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
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
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
  const sx = useSpring(x, { stiffness: 150, damping: 20 });
  const sy = useSpring(y, { stiffness: 150, damping: 20 });

  const handleMouse = useCallback(
    (e: React.MouseEvent) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
      y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
    },
    [x, y],
  );

  return (
    <motion.button
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMouse}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
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

export default function VelocityJetsPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeJet, setActiveJet] = useState<number | null>(null);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div className="premium-theme min-h-screen bg-[#050505] text-[#ffffff] font-sans selection:bg-[#00f2ff] selection:text-black overflow-x-hidden">
      {/* ── NAVIGATION ── */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${scrolled ? "bg-black/80 backdrop-blur-xl py-4 border-b border-white/5" : "bg-transparent py-8"}`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative">
              <Plane className="w-8 h-8 text-[#00f2ff] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" />
              <div className="absolute inset-0 bg-[#00f2ff]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter uppercase leading-none italic">
                Velocity
              </span>
              <span className="text-[8px] font-bold uppercase tracking-[0.6em] text-[#00f2ff] -mt-1">
                Jet Charter
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
            {["Fleet", "Empty_Legs", "Memberships", "Corporate", "Safety"].map(
              (link) => (
                <Link
                  key={link}
                  href="#"
                  className="hover:text-[#00f2ff] transition-colors cursor-pointer"
                >
                  {link}
                </Link>
              ),
            )}
          </div>

          <div className="flex items-center gap-8">
            <button className="hidden md:flex items-center gap-3 group">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/60 group-hover:text-[#00f2ff] transition-colors">
                Track_Flight
              </span>
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/20 group-hover:border-[#00f2ff] group-hover:text-[#00f2ff] transition-all">
                <Navigation className="w-4 h-4" />
              </div>
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden text-[#00f2ff]"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 z-[100] bg-black p-12 flex flex-col justify-center gap-10"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-10 right-8 text-[#00f2ff]"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="flex flex-col gap-6 text-5xl font-black italic uppercase text-white/5">
              {["Fleet", "Legs", "Members", "Safety", "Contact"].map((l) => (
                <Link
                  key={l}
                  href="#"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-[#00f2ff] transition-colors"
                >
                  {l}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO ── */}
      <section className="relative h-[100svh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1600&q=80"
            alt="Private Jet"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_100%)] opacity-60" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full">
          <Reveal>
            <Badge className="bg-[#00f2ff]/10 text-[#00f2ff] border border-[#00f2ff]/20 text-[10px] font-bold uppercase tracking-[0.5em] mb-10 px-4 py-1.5 rounded-sm">
              Next-Generation Aviation // Mach 0.9+
            </Badge>
            <h1 className="text-6xl md:text-[9rem] font-black italic leading-[0.8] tracking-tighter mb-10 uppercase">
              Redefining <br />{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2ff] via-white to-[#00f2ff]">
                Air Superiority.
              </span>
            </h1>
            <p className="max-w-2xl text-lg text-white/40 leading-relaxed font-light italic mb-12">
              Access the world's most advanced fleet of private aircraft. From
              rapid super-midsize charters to ultra-long-range executive suites.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <MagneticBtn className="px-12 py-5 bg-[#00f2ff] text-black text-[10px] font-bold uppercase tracking-[0.3em] rounded-sm hover:bg-white transition-all cursor-pointer shadow-2xl shadow-[#00f2ff]/20">
                Instant_Quote
              </MagneticBtn>
              <Link
                href="#fleet"
                className="px-12 py-5 border border-white/10 text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded-sm hover:bg-white/5 transition-all flex items-center justify-center gap-3"
              >
                Explore The Fleet <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="absolute bottom-12 right-12 hidden lg:flex flex-col items-end gap-6">
          {FLIGHT_LOGS.map((log, i) => (
            <div key={i} className="text-right">
              <div className="text-[8px] font-bold uppercase tracking-widest text-white/30">
                {log.label}
              </div>
              <div className="text-2xl font-black text-white italic">
                {log.value}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── VALUES SECTION ── */}
      <section className="py-32 px-6 md:px-12 border-y border-white/5 bg-[#080808]">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <div className="text-center mb-24">
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#00f2ff] mb-4 block">
                The Velocity Standard
              </span>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic">
                Aerodynamic{" "}
                <span className="not-italic font-thin text-white">
                  Efficiency.
                </span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {VALUES.map((v, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="group p-10 border border-white/5 bg-black/40 hover:border-[#00f2ff]/30 transition-all relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 text-white/5 group-hover:text-[#00f2ff]/10 transition-colors">
                    <v.icon className="w-24 h-24" />
                  </div>
                  <div className="w-12 h-12 rounded-sm bg-[#00f2ff]/10 flex items-center justify-center text-[#00f2ff] mb-8 group-hover:bg-[#00f2ff] group-hover:text-black transition-all">
                    <v.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-black uppercase mb-4 italic tracking-tight">
                    {v.title}
                  </h3>
                  <p className="text-sm text-white/30 leading-relaxed font-light italic mb-8">
                    {v.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FLEET SECTION ── */}
      <section id="fleet" className="py-32 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
              <div>
                <h2 className="text-6xl md:text-9xl font-black italic tracking-tighter leading-[0.8] mb-6 uppercase">
                  The <br /> <span className="text-[#00f2ff]">Fleet.</span>
                </h2>
                <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.4em]">
                  Curated Aircraft for Global Reach
                </p>
              </div>
              <div className="flex gap-4">
                <button className="px-8 py-4 border border-white/10 text-white text-[9px] font-bold uppercase tracking-widest hover:border-[#00f2ff] hover:text-[#00f2ff] transition-all">
                  Download_Spec_Sheets
                </button>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {FLEET.map((jet, i) => (
              <Reveal key={jet.id} delay={i * 0.1}>
                <div
                  className="group relative aspect-[4/5] overflow-hidden rounded-sm cursor-pointer border border-white/5"
                  onMouseEnter={() => setActiveJet(jet.id)}
                  onMouseLeave={() => setActiveJet(null)}
                >
                  <Image
                    src={jet.img}
                    alt={jet.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  <div className="absolute inset-0 p-10 flex flex-col justify-end">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#00f2ff] mb-2">
                      {jet.class}
                    </span>
                    <h3 className="text-4xl font-black italic uppercase mb-8 tracking-tighter leading-none">
                      {jet.name}
                    </h3>

                    <AnimatePresence>
                      {activeJet === jet.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          className="space-y-8 pt-8 border-t border-white/10"
                        >
                          <div className="grid grid-cols-2 gap-6">
                            <div>
                              <div className="text-[8px] font-bold uppercase tracking-widest text-white/30 mb-1">
                                Max_Speed
                              </div>
                              <div className="text-lg font-black text-white italic">
                                {jet.speed}
                              </div>
                            </div>
                            <div>
                              <div className="text-[8px] font-bold uppercase tracking-widest text-white/30 mb-1">
                                Range
                              </div>
                              <div className="text-lg font-black text-white italic">
                                {jet.range}
                              </div>
                            </div>
                            <div>
                              <div className="text-[8px] font-bold uppercase tracking-widest text-white/30 mb-1">
                                Capacity
                              </div>
                              <div className="text-lg font-black text-white italic">
                                {jet.pax} PAX
                              </div>
                            </div>
                            <div className="flex items-end justify-end">
                              <button className="w-10 h-10 rounded-full bg-[#00f2ff] flex items-center justify-center text-black">
                                <ArrowRight className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                          <p className="text-xs text-white/40 italic leading-relaxed">
                            {jet.desc}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PERFORMANCE HUD ── */}
      <section className="py-32 bg-[#00f2ff] text-black">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <Reveal>
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-black/40 mb-8 block">
              Live Network Status
            </span>
            <h2 className="text-5xl md:text-8xl font-black italic tracking-tighter leading-[0.8] mb-10 uppercase">
              Terminal <br /> <span className="text-white">Telemetry.</span>
            </h2>
            <p className="text-black/60 text-lg leading-relaxed mb-12 italic font-light">
              Our proprietary dispatch AI monitors 2,800 aircraft across 5
              partner networks to ensure 100% mission readiness at any
              coordinate.
            </p>
            <div className="space-y-6">
              {[
                { label: "Dispatch Reliability", val: "99.8%" },
                { label: "Avg_Activation_Time", val: "4.2 Hours" },
                { label: "Safety_Audit_Pass_Rate", val: "100%" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="flex justify-between items-end border-b border-black/10 pb-4"
                >
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                    {stat.label}
                  </span>
                  <span className="text-3xl font-black italic">{stat.val}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="relative aspect-video bg-black rounded-sm overflow-hidden p-1 border border-white/10 group">
              <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(0,242,255,0.05)_50%,transparent_100%)] bg-[length:200%_100%] animate-pulse" />
              <div className="relative z-10 h-full flex flex-col justify-between p-8">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <span className="text-[8px] font-bold uppercase tracking-widest text-[#00f2ff]">
                      Network_Feed_Live
                    </span>
                    <span className="text-[12px] font-black text-white/50 tracking-tighter font-mono italic">
                      ALPHA_SECTOR_GRID_4.2
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-1.5 h-1.5 bg-[#00f2ff] rounded-full animate-ping" />
                    <div className="w-1.5 h-1.5 bg-[#00f2ff] rounded-full" />
                  </div>
                </div>

                <div className="flex justify-center">
                  <Gauge className="w-32 h-32 text-[#00f2ff] opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000" />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-1 bg-white/5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "70%" }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse",
                          delay: i * 0.5,
                        }}
                        className="h-full bg-[#00f2ff]"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#050505] pt-32 pb-12 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-24 mb-32">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="flex items-center gap-3 mb-10">
                <Plane className="w-10 h-10 text-[#00f2ff]" />
                <div className="flex flex-col">
                  <span className="text-2xl font-black tracking-tighter uppercase leading-none italic">
                    Velocity
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-[0.6em] text-[#00f2ff] -mt-1">
                    Jet Charter
                  </span>
                </div>
              </div>
              <p className="text-white/20 max-w-sm mb-12 text-[10px] font-bold uppercase tracking-[0.3em] leading-relaxed italic">
                The edge of aviation. Unlocking global movement with precision,
                speed, and absolute discretion.
              </p>
              <div className="flex gap-6">
                {[Globe, Globe, Globe].map((Icon, i) => (
                  <button
                    key={i}
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/20 hover:bg-[#00f2ff] hover:text-black transition-all"
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-2 lg:col-start-7">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#00f2ff] mb-10">
              Capabilities
            </h4>
            <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/20">
              <li>
                <Link
                  href="#"
                  className="hover:text-[#00f2ff] transition-colors"
                >
                  Charter_Search
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#00f2ff] transition-colors"
                >
                  Empty_Leg_Deals
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#00f2ff] transition-colors"
                >
                  Group_Charters
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#00f2ff] transition-colors"
                >
                  Medical_Evac
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#00f2ff] mb-10">
              Experience
            </h4>
            <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/20">
              <li>
                <Link
                  href="#"
                  className="hover:text-[#00f2ff] transition-colors"
                >
                  Jet_Card_Login
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#00f2ff] transition-colors"
                >
                  Concierge_Desk
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#00f2ff] transition-colors"
                >
                  Catering_Menu
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#00f2ff] transition-colors"
                >
                  Ground_Logistics
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#00f2ff] mb-10">
              Institutional
            </h4>
            <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/20">
              <li>
                <Link
                  href="#"
                  className="hover:text-[#00f2ff] transition-colors"
                >
                  Safety_Audit
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#00f2ff] transition-colors"
                >
                  Our_Team
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#00f2ff] transition-colors"
                >
                  Sustainability
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#00f2ff] transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] font-bold uppercase tracking-widest text-white/10">
          <div className="flex items-center gap-10">
            <span>
              &copy; {new Date().getFullYear()} VELOCITY AVIATION GROUP.
            </span>
            <div className="flex gap-6">
              <span>ICAO_REGULATORY_SYNC</span>
              <span>PLATINUM_ARGUS_SAFETY</span>
            </div>
          </div>
          <div className="flex gap-10 font-mono">
            <span>V_LOG_492.0</span>
            <span>SECURE_DATA_FEED</span>
          </div>
        </div>
      </footer>

      <style>{`
        ::-webkit-scrollbar{width:4px;background:#050505}
        ::-webkit-scrollbar-thumb{background:#00f2ff}
      `}</style>
    </div>
  );
}
