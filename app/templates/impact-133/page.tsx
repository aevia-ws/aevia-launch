"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useInView,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Building2, MapPin, Activity, Shield, Users, Network, Maximize, Play, X, ChevronRight, Compass } from "lucide-react";

import "../premium.css";

/* ==========================================================================
   DATA STRUCTURES
   ========================================================================== */

const PROJECTS = [
  {
    id: "01",
    title: "Neo-Tokyo Spire",
    category: "Commercial",
    height: "850m",
    status: "Under Construction",
    year: "2028",
    image:
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "02",
    title: "Aether Gardens",
    category: "Residential",
    height: "420m",
    status: "Completed",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1545615468-b76abde695cb?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "03",
    title: "The Kinetic Hub",
    category: "Infrastructure",
    height: "150m",
    status: "Planning",
    year: "2030",
    image:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "04",
    title: "Aqua-City Sector 4",
    category: "Mixed Use",
    height: "300m",
    status: "Completed",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=1200&auto=format&fit=crop",
  },
];

const METRICS = [
  {
    label: "Active Developments",
    value: "42",
    suffix: "m²",
    icon: <Building2 className="w-5 h-5 text-sky-400" />,
  },
  {
    label: "Total Asset Value",
    value: "$14",
    suffix: "B",
    icon: <Activity className="w-5 h-5 text-sky-400" />,
  },
  {
    label: "Sustainable Energy",
    value: "1.2",
    suffix: "GW",
    icon: <Network className="w-5 h-5 text-sky-400" />,
  },
  {
    label: "Global Offices",
    value: "18",
    suffix: "",
    icon: <MapPin className="w-5 h-5 text-sky-400" />,
  },
];

const EXPERTISE = [
  {
    title: "Parametric Design",
    desc: "Utilizing advanced algorithms to generate structures that are optimized for both aesthetic impact and environmental efficiency.",
  },
  {
    title: "Urban Integration",
    desc: "Seamlessly connecting mega-structures into existing public transit grids, ensuring vertical cities remain accessible.",
  },
  {
    title: "Biomimetic Systems",
    desc: "Implementing cooling and structural support systems modeled on complex biological organisms.",
  },
  {
    title: "Quantum Analytics",
    desc: "Simulating 50-year traffic and weather patterns to stress-test designs before breaking ground.",
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

/* ==========================================================================
   MAIN PAGE COMPONENT
   ========================================================================== */

export default function AtlasZoomPage() {
  const [videoOpen, setVideoOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Ref for the massive hero section
  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Dramatic Zoom Transform
  // Start at scale 8 (very zoomed in), end at scale 1 (full image)
  const scale = useTransform(heroProgress, [0, 1], [8, 1]);
  // Opacity for the grid overlay
  const gridOpacity = useTransform(heroProgress, [0, 0.5, 1], [0, 0.5, 1]);
  // Title fades out as we zoom
  const titleOpacity = useTransform(heroProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="premium-theme min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-sky-500/30 selection:text-white">
      {/* ==========================================
          VIDEO OVERLAY
          ========================================== */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-6"
          >
            <button
              onClick={() => setVideoOpen(false)}
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="w-full max-w-6xl aspect-video bg-slate-900 border border-sky-500/20 relative overflow-hidden rounded-xl flex items-center justify-center">
              <span className="text-sky-500 font-mono text-sm">
                [Video Player Placeholder]
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==========================================
          NAVIGATION
          ========================================== */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-[#020617]/80 backdrop-blur-xl border-b border-sky-500/10 py-4" : "bg-transparent py-8"}`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link
            href="/"
            className="text-xl md:text-2xl font-bold tracking-tighter flex items-center gap-2"
          >
            <div className="w-6 h-6 bg-sky-500 rounded-sm" />
            ATLAS<span className="font-light text-slate-500">CORP</span>
          </Link>

          <div className="hidden lg:flex items-center gap-10 text-xs font-bold uppercase tracking-widest text-slate-400">
            <Link href="#" className="hover:text-sky-400 transition-colors">
              Portfolio
            </Link>
            <Link href="#" className="hover:text-sky-400 transition-colors">
              Infrastructure
            </Link>
            <Link href="#" className="hover:text-sky-400 transition-colors">
              Intelligence
            </Link>
            <Link href="#" className="hover:text-sky-400 transition-colors">
              Company
            </Link>
          </div>

          <button className="px-6 py-2.5 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-bold uppercase tracking-widest hover:bg-sky-500 hover:text-slate-900 transition-colors rounded-sm hidden md:block">
            Client Portal
          </button>
        </div>
      </nav>

      {/* ==========================================
          1. DRAMATIC ZOOM HERO
          ========================================== */}
      <section ref={heroRef} className="relative w-full h-[300vh]">
        {/* Sticky Container holds the zooming visual */}
        <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center bg-[#020617]">
          <motion.div
            style={{ scale }}
            className="absolute inset-0 z-0 origin-[50%_70%] md:origin-center"
          >
            <Image
              src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=2000&auto=format&fit=crop"
              alt="Mega City Skyline"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-[#020617]/40 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/20 to-transparent" />
          </motion.div>

          {/* Sci-Fi Grid Overlay that fades in as we zoom out */}
          <motion.div
            style={{ opacity: gridOpacity }}
            className="absolute inset-0 z-10 pointer-events-none bg-[linear-gradient(rgba(56,189,248,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"
          />

          {/* Initial Title (Fades out quickly) */}
          <motion.div
            style={{ opacity: titleOpacity }}
            className="relative z-20 text-center px-6 max-w-4xl"
          >
            <span className="text-sky-500 font-mono text-xs md:text-sm uppercase tracking-[0.3em] mb-6 block">
              Global Infrastructure Matrix
            </span>
            <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-bold tracking-tighter leading-none mb-6">
              SCALE
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">
                THE FUTURE
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-light">
              Scroll to reveal the true magnitude of our urban interventions.
            </p>
          </motion.div>

          {/* HUD Elements (Always visible) */}
          <div className="absolute top-1/2 left-6 md:left-12 -translate-y-1/2 flex flex-col gap-8 z-30 hidden md:flex font-mono text-[10px] text-sky-500/50">
            <div className="flex flex-col items-center gap-2">
              <span className="h-16 w-[1px] bg-sky-500/20" />
              <span>ALT: 4,500m</span>
              <span className="h-16 w-[1px] bg-sky-500/20" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="h-16 w-[1px] bg-sky-500/20" />
              <span>Z: +800%</span>
              <span className="h-16 w-[1px] bg-sky-500/20" />
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          2. DATA DASHBOARD / INTRO
          ========================================== */}
      <section className="py-32 bg-[#020617] border-y border-white/5 relative z-20 -mt-[100vh]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-slate-900/50 to-[#020617]" />

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 pt-[100vh]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
            <div>
              <Reveal>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">
                  Engineering <br />
                  <span className="text-sky-400">Megacities.</span>
                </h2>
              </Reveal>
            </div>
            <div>
              <Reveal delay={0.2}>
                <p className="text-xl text-slate-400 leading-relaxed font-light mb-8">
                  AtlasCorp isn't a traditional development firm. We are a
                  sovereign infrastructure partner, designing and executing
                  self-sustaining urban ecosystems capable of supporting
                  millions.
                </p>
                <button
                  onClick={() => setVideoOpen(true)}
                  className="flex items-center gap-4 text-sky-400 font-bold uppercase tracking-widest text-xs hover:text-white transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full border border-sky-500/30 flex items-center justify-center bg-sky-500/10 group-hover:bg-sky-500 group-hover:text-[#020617] transition-all">
                    <Play className="w-4 h-4 ml-0.5" />
                  </div>
                  Watch the 2030 Vision
                </button>
              </Reveal>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {METRICS.map((metric, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="p-8 border border-white/5 bg-slate-900/50 backdrop-blur-sm rounded-2xl">
                  <div className="mb-6">{metric.icon}</div>
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 flex items-end gap-1">
                    {metric.value}
                    <span className="text-xl text-sky-500">
                      {metric.suffix}
                    </span>
                  </div>
                  <div className="text-xs uppercase tracking-widest text-slate-500 font-bold">
                    {metric.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          2.5 LEADERSHIP / VISION
          ========================================== */}
      <section className="py-32 bg-[#020617] relative z-10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <span className="text-sky-500 font-mono text-xs uppercase tracking-[0.3em] mb-4 block">
                Command
              </span>
              <h2 className="text-4xl font-bold mb-8">
                The Architects of Tomorrow.
              </h2>
              <p className="text-slate-400 font-light leading-relaxed mb-8">
                Our executive board consists of former heads of state, leading
                quantum physicists, and visionary urban planners. We do not just
                design buildings; we architect society.
              </p>
              <button className="flex items-center gap-3 text-xs uppercase tracking-widest font-bold text-sky-400 hover:text-white transition-colors">
                Meet the Board <ArrowRight className="w-4 h-4" />
              </button>
            </Reveal>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <Reveal delay={0.2}>
              <div className="relative aspect-square md:aspect-[3/4] rounded-2xl overflow-hidden group">
                <Image
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop"
                  alt="CEO"
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/50 to-transparent opacity-80" />
                <div className="absolute bottom-8 left-8">
                  <h4 className="text-2xl font-bold mb-2">Arthur Vance</h4>
                  <span className="text-sky-500 font-mono text-xs uppercase tracking-widest">
                    Chief Executive Officer
                  </span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="relative aspect-square md:aspect-[3/4] rounded-2xl overflow-hidden group md:-mt-16">
                <Image
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
                  alt="CTO"
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/50 to-transparent opacity-80" />
                <div className="absolute bottom-8 left-8">
                  <h4 className="text-2xl font-bold mb-2">Dr. Elena Rostova</h4>
                  <span className="text-sky-500 font-mono text-xs uppercase tracking-widest">
                    Chief Systems Architect
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ==========================================
          3. EXPERTISE GRID
          ========================================== */}
      <section className="py-32 bg-[#020617] overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <Reveal className="mb-16">
            <span className="text-sky-500 font-mono text-xs uppercase tracking-[0.3em] mb-4 block">
              Methodology
            </span>
            <h2 className="text-4xl md:text-5xl font-bold">
              Technological Edge
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {EXPERTISE.map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="group relative p-10 md:p-12 border border-white/5 bg-slate-900/30 hover:bg-slate-900/80 transition-colors rounded-2xl overflow-hidden h-full">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 blur-[50px] rounded-full group-hover:bg-sky-500/10 transition-colors pointer-events-none" />

                  <div className="text-sky-500 font-mono text-sm mb-6">
                    0{i + 1} //
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          4. PROJECT PORTFOLIO (Interactive List)
          ========================================== */}
      <section className="py-32 bg-[#020617] border-t border-white/5 relative">
        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sky-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
            <Reveal>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">
                Live <span className="text-sky-400">Assets.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <button className="flex items-center gap-3 text-xs uppercase tracking-widest font-bold hover:text-sky-400 transition-colors">
                View Global Map <ArrowRight className="w-4 h-4" />
              </button>
            </Reveal>
          </div>

          <div className="border-t border-white/10">
            {PROJECTS.map((project, i) => (
              <Reveal key={project.id} delay={i * 0.1}>
                <div className="group border-b border-white/10 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 hover:bg-white/[0.02] transition-colors px-6 -mx-6 rounded-xl cursor-pointer">
                  {/* Left: ID & Title */}
                  <div className="flex items-center gap-8 md:w-1/3">
                    <span className="text-sky-500 font-mono text-sm block">
                      {project.id}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold group-hover:text-sky-400 transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  {/* Middle: Specs */}
                  <div className="grid grid-cols-2 gap-8 md:w-1/3 font-mono text-xs uppercase tracking-widest text-slate-400">
                    <div>
                      <span className="block text-slate-600 mb-1">Height</span>
                      <span className="text-white">{project.height}</span>
                    </div>
                    <div>
                      <span className="block text-slate-600 mb-1">Status</span>
                      <span className="text-white">{project.status}</span>
                    </div>
                  </div>

                  {/* Right: Image Reveal */}
                  <div className="hidden md:flex items-center justify-end md:w-1/3 gap-8">
                    <div className="relative w-32 h-20 rounded-lg overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-sky-500 group-hover:text-[#020617] group-hover:border-sky-500 transition-all">
                      <ArrowRight className="w-5 h-5 -rotate-45" />
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          5. MEGA FOOTER
          ========================================== */}
      <footer className="bg-[#0f172a] pt-32 pb-12 px-6 md:px-12 border-t border-sky-500/20 relative overflow-hidden">
        {/* Architectural wireframe background element */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="max-w-[1600px] mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-32">
            <div className="lg:col-span-1">
              <Link
                href="/"
                className="text-2xl font-bold tracking-tighter flex items-center gap-2 mb-8"
              >
                <div className="w-6 h-6 bg-sky-500 rounded-sm" />
                ATLAS<span className="font-light text-slate-500">CORP</span>
              </Link>
              <p className="text-slate-400 text-sm leading-relaxed mb-8 pr-8">
                Engineering the sovereign infrastructure of tomorrow. We build
                cities that breathe, adapt, and endure.
              </p>
            </div>

            <div>
              <h4 className="text-[10px] text-sky-500 font-mono uppercase tracking-[0.2em] mb-6">
                Sectors
              </h4>
              <ul className="space-y-4 text-sm text-slate-300 font-bold">
                <li>
                  <Link
                    href="#"
                    className="hover:text-sky-400 transition-colors"
                  >
                    Residential Arcologies
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-sky-400 transition-colors"
                  >
                    Commercial Hubs
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-sky-400 transition-colors"
                  >
                    Energy Grid Integration
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-sky-400 transition-colors"
                  >
                    Orbital Logistics
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] text-sky-500 font-mono uppercase tracking-[0.2em] mb-6">
                Global Nodes
              </h4>
              <ul className="space-y-4 text-sm text-slate-300 font-bold">
                <li>
                  <Link
                    href="#"
                    className="hover:text-sky-400 transition-colors"
                  >
                    Tokyo, JP
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-sky-400 transition-colors"
                  >
                    Dubai, UAE
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-sky-400 transition-colors"
                  >
                    London, UK
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-sky-400 transition-colors"
                  >
                    New York, USA
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] text-sky-500 font-mono uppercase tracking-[0.2em] mb-6">
                Command Center
              </h4>
              <p className="text-sm text-slate-400 mb-6">
                Secure access to project telemetrics and live site feeds for
                verified partners.
              </p>
              <button className="w-full py-4 bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-bold uppercase tracking-widest hover:bg-sky-500 hover:text-slate-900 transition-colors rounded-sm">
                Initialize Secure Login
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/10 text-[10px] uppercase tracking-widest text-slate-500 font-mono">
            <span>
              &copy; {new Date().getFullYear()} Atlas Corporation. All rights
              reserved.
            </span>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-white transition-colors">
                Data Privacy
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Terms of Use
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Compliance
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
