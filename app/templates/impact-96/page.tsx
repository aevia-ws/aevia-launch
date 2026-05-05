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
import { Camera, Film, Zap, Maximize, Play, Globe, Mail, MapPin, ChevronRight, ArrowRight, X, Menu, Layers, Users, Star, Award, Focus, Frame, Monitor, Share2, Lock, Search, ShoppingBag } from "lucide-react";

import "../premium.css";

/* ==========================================================================
   DATA STRUCTURES
   ========================================================================= */

const PROJECTS = [
  {
    id: 1,
    title: "Neon Nights",
    category: "Street",
    desc: "A long-exposure study of Tokyo's Shinjuku district at 2AM.",
    img: "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?w=1200&q=80",
  },
  {
    id: 2,
    title: "The Industrial Soul",
    category: "Cinematic",
    desc: "Capturing the raw rhythm of Berlin's abandoned factories.",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80",
  },
  {
    id: 3,
    title: "Urban Motion",
    category: "Lifestyle",
    desc: "High-speed pursuit of street culture in the heart of Brooklyn.",
    img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=80",
  },
];

const SERVICES = [
  {
    title: "Cinematic Narrative",
    desc: "Full-scale video production for brands that demand a visceral emotional response.",
    icon: Film,
  },
  {
    title: "Street Authenticity",
    desc: "Bespoke photography that captures the raw, unfiltered essence of urban life.",
    icon: Camera,
  },
  {
    title: "Visual Identity",
    desc: "Building visual languages for the next generation of lifestyle innovators.",
    icon: Layers,
  },
];

const STATS = [
  { label: "Frames Captured", value: "1.2M+" },
  { label: "Global Projects", value: "340" },
  { label: "Award Nominations", value: "28" },
  { label: "Client Retention", value: "94%" },
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

export default function UrbanPulsePage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<number | null>(null);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div className="premium-theme min-h-screen bg-[#050505] text-[#fafafa] font-sans selection:bg-[#ff003c] selection:text-white overflow-x-hidden">
      {/* ── NAVIGATION ── */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${scrolled ? "bg-black/80 backdrop-blur-2xl py-4 border-b border-white/5" : "bg-transparent py-8"}`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-4">
            <div className="w-12 h-12 bg-[#ff003c] rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-500">
              <Zap className="w-6 h-6 fill-current" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter uppercase leading-none">
                Urban Pulse
              </span>
              <span className="text-[8px] font-bold uppercase tracking-[0.6em] text-[#ff003c] -mt-1 ml-1">
                Cinematic Studio
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
            {["Showreel", "The_Work", "Studio", "Labs", "Contact"].map(
              (link) => (
                <Link
                  key={link}
                  href="#"
                  className="hover:text-[#ff003c] transition-colors cursor-pointer"
                >
                  {link}
                </Link>
              ),
            )}
          </div>

          <div className="flex items-center gap-8">
            <button className="hidden md:flex items-center gap-3 group">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/60 group-hover:text-[#ff003c] transition-colors">
                Start_Project
              </span>
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 group-hover:bg-[#ff003c] group-hover:text-white group-hover:border-[#ff003c] transition-all">
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden text-white"
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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-[100] bg-black p-12 flex flex-col justify-center gap-10"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-10 right-8 text-white/40 hover:text-[#ff003c]"
            >
              <X className="w-10 h-10" />
            </button>
            <div className="flex flex-col gap-4 text-7xl font-black uppercase text-white/10">
              {["Work", "Studio", "Pricing", "About", "Contact"].map((l) => (
                <Link
                  key={l}
                  href="#"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-[#ff003c] hover:translate-x-4 transition-all"
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
            src="https://images.unsplash.com/photo-1542281286-9e0a16bb7366?w=1600&q=80"
            alt="Urban Texture"
            fill
            className="object-cover opacity-50 contrast-125"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent" />
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 items-center">
          <Reveal>
            <Badge className="bg-[#ff003c]/20 text-[#ff003c] border border-[#ff003c]/30 text-[10px] font-bold uppercase tracking-[0.5em] mb-10 px-4 py-1.5 rounded-full">
              Independent Visual Studio // NYC - BERLIN
            </Badge>
            <h1 className="text-8xl md:text-[14rem] font-black leading-[0.75] tracking-tighter mb-12 uppercase text-white italic">
              Visual <br />{" "}
              <span className="text-[#ff003c] not-italic">Entropy.</span>
            </h1>
            <p className="max-w-md text-xl text-white/50 leading-relaxed font-light mb-12 uppercase tracking-wide">
              Capturing the raw energy of urban transition through high-fidelity
              cinematic storytelling.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <MagneticBtn className="px-12 py-5 bg-[#ff003c] text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded-full hover:scale-105 transition-all cursor-pointer shadow-[0_0_40px_rgba(255,0,60,0.3)]">
                Watch 2024 Showreel
              </MagneticBtn>
              <Link
                href="#work"
                className="px-12 py-5 border border-white/20 text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded-full hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3"
              >
                The Archive <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>

          <div className="hidden lg:flex justify-end pr-12">
            <Reveal delay={0.4}>
              <div className="relative w-80 h-80 rounded-full border border-white/5 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0 border-t border-[#ff003c] rounded-full"
                />
                <div className="text-center">
                  <span className="text-5xl font-black italic block">8K</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">
                    Native Capture
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── STATS SECTION ── */}
      <section className="py-24 border-y border-white/5 bg-[#0a0a0a]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {STATS.map((stat, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="text-center md:text-left">
                  <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#ff003c] mb-2">
                    {stat.label}
                  </div>
                  <div className="text-5xl font-black italic text-white">
                    {stat.value}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE WORK ── */}
      <section id="work" className="py-32 px-6 md:px-12">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
              <div>
                <h2 className="text-7xl md:text-[10rem] font-black italic tracking-tighter leading-none mb-6 uppercase text-white">
                  The <br /> <span className="text-[#ff003c]">Grit.</span>
                </h2>
                <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.4em]">
                  Project Logs // Vertical Cinema // 2024
                </p>
              </div>
              <Link
                href="#"
                className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#ff003c] border-b border-[#ff003c] pb-2 hover:text-white hover:border-white transition-all"
              >
                Full Portfolio Archive
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {PROJECTS.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.1}>
                <div
                  className="group space-y-10 cursor-pointer"
                  onMouseEnter={() => setActiveProject(item.id)}
                  onMouseLeave={() => setActiveProject(null)}
                >
                  <div className="relative aspect-video overflow-hidden rounded-sm">
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-[1.5s] group-hover:scale-125"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-700" />

                    <div className="absolute top-6 left-6">
                      <Badge className="bg-black/50 backdrop-blur-md text-white border-white/10 text-[9px] font-bold uppercase tracking-widest px-3 py-1">
                        {item.category}
                      </Badge>
                    </div>

                    <AnimatePresence>
                      {activeProject === item.id && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 flex items-center justify-center bg-[#ff003c]/10 backdrop-blur-[2px]"
                        >
                          <button className="w-20 h-20 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-all shadow-2xl">
                            <Play className="w-8 h-8 fill-current ml-1" />
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="space-y-6">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-4xl font-black uppercase tracking-tighter text-white italic group-hover:text-[#ff003c] transition-colors">
                        {item.title}
                      </h3>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white/20 group-hover:text-white/60 transition-colors">
                        Project_0{item.id}
                      </span>
                    </div>
                    <p className="text-sm text-white/30 font-light leading-relaxed uppercase tracking-widest">
                      {item.desc}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="h-[1px] flex-1 bg-white/5 group-hover:bg-[#ff003c]/20 transition-all" />
                      <button className="text-[9px] font-black uppercase tracking-[0.3em] text-white group-hover:text-[#ff003c] transition-colors">
                        Case_Study
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── STUDIO SERVICES ── */}
      <section className="py-40 bg-[#0a0a0a] overflow-hidden relative">
        <div className="absolute -bottom-32 -left-32 w-[40rem] h-[40rem] bg-[#ff003c]/5 blur-[120px] rounded-full" />
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <Reveal>
            <div className="text-center mb-32">
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#ff003c] mb-8 block">
                Visual Engineering
              </span>
              <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase">
                High{" "}
                <span className="text-[#ff003c] not-italic">Production.</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {SERVICES.map((s, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="p-16 border border-white/5 bg-white/[0.01] hover:border-[#ff003c]/30 transition-all group h-full flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                    <s.icon className="w-24 h-24" />
                  </div>
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-[#ff003c] mb-10 group-hover:bg-[#ff003c] group-hover:text-white transition-all duration-500">
                    <s.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-black uppercase italic mb-6 tracking-tighter text-white group-hover:translate-x-2 transition-transform">
                    {s.title}
                  </h3>
                  <p className="text-sm text-white/30 font-light leading-relaxed mb-12 flex-1 tracking-wide">
                    {s.desc}
                  </p>
                  <button className="flex items-center gap-4 text-[9px] font-bold uppercase tracking-[0.3em] text-[#ff003c] group-hover:gap-6 transition-all">
                    Capabilities <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE PHILOSOPHY ── */}
      <section className="py-40 px-6 md:px-12 bg-black">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <Reveal>
            <div className="relative aspect-square rounded-sm overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80"
                alt="Studio"
                fill
                className="object-cover group-hover:scale-110 transition-all duration-[2s] contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute bottom-16 left-16 text-white">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block text-[#ff003c]">
                  Our Labs
                </span>
                <h4 className="text-5xl font-black italic uppercase tracking-tighter leading-none">
                  The Future <br /> Is Analog.
                </h4>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#ff003c] mb-8 block">
              The Philosophy
            </span>
            <h2 className="text-6xl md:text-9xl font-black italic tracking-tighter leading-[0.8] mb-12 uppercase text-white">
              Capture <br />{" "}
              <span className="text-[#ff003c] not-italic">Raw.</span>
            </h2>
            <p className="text-white/40 text-xl leading-relaxed mb-16 font-light uppercase tracking-wide">
              We reject the sterile perfection of modern digital capture. Our
              process introduces planned entropy—leaking light, organic grain,
              and the visceral imperfection of real life.
            </p>
            <div className="grid grid-cols-2 gap-12">
              {[
                { icon: Focus, label: "Deep_Focus", desc: "Optic precision" },
                { icon: Frame, label: "Celluloid_Tone", desc: "Organic grain" },
                { icon: Monitor, label: "Mastering", desc: "Grade v4.1" },
                { icon: Share2, label: "Distribution", desc: "Global reach" },
              ].map((val, i) => (
                <div key={i} className="space-y-4">
                  <val.icon className="w-6 h-6 text-[#ff003c]" />
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-white">
                    {val.label}
                  </h4>
                  <p className="text-[10px] font-light text-white/30 uppercase tracking-widest">
                    {val.desc}
                  </p>
                </div>
              ))}
            </div>
            <MagneticBtn className="mt-20 px-14 py-6 bg-white text-black text-[10px] font-black uppercase tracking-[0.4em] rounded-full hover:bg-[#ff003c] hover:text-white transition-all shadow-2xl">
              Collaborate With Us
            </MagneticBtn>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#050505] pt-40 pb-16 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-32 mb-40">
          <div className="lg:col-span-6">
            <Reveal>
              <div className="flex items-center gap-6 mb-12">
                <div className="w-16 h-16 bg-[#ff003c] rounded-full flex items-center justify-center text-white">
                  <Zap className="w-8 h-8 fill-current" />
                </div>
                <div className="flex flex-col">
                  <span className="text-4xl font-black tracking-tighter uppercase leading-none">
                    Urban Pulse
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#ff003c] -mt-1 ml-1">
                    Cinematic Studio
                  </span>
                </div>
              </div>
              <p className="text-white/20 max-w-md mb-16 text-[11px] font-bold uppercase tracking-[0.2em] leading-loose italic">
                A visual narrative collective specialized in high-energy
                cinematic production and raw street photography. Operating
                between NYC and the digital void.
              </p>
              <div className="flex gap-6">
                {[Globe, Globe, Mail].map((Icon, i) => (
                  <button
                    key={i}
                    className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:bg-[#ff003c] hover:text-white hover:border-[#ff003c] transition-all"
                  >
                    <Icon className="w-5 h-5" />
                  </button>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-black uppercase tracking-widest text-[#ff003c] mb-12">
              Showcase
            </h4>
            <ul className="space-y-6 text-[10px] font-bold uppercase tracking-widest text-white/30">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  2024_Reel
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Street_Series
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Commercial_Work
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  NFT_Archive
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-black uppercase tracking-widest text-[#ff003c] mb-12">
              Capabilities
            </h4>
            <ul className="space-y-6 text-[10px] font-bold uppercase tracking-widest text-white/30">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Production
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Color_Grading
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  VFX_Labs
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Sound_Design
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-black uppercase tracking-widest text-[#ff003c] mb-12">
              Studio
            </h4>
            <ul className="space-y-6 text-[10px] font-bold uppercase tracking-widest text-white/30">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Our_Process
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  The_Equipment
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Career_Openings
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Legal_Notice
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-[1600px] mx-auto pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12 text-[10px] font-bold uppercase tracking-[0.4em] text-white/10">
          <div className="flex items-center gap-12">
            <span>&copy; {new Date().getFullYear()} URBAN PULSE VISUALS.</span>
            <div className="flex gap-8">
              <span>NYC_FLATIRON_HQ</span>
              <span>BERLIN_M_STUDIO</span>
            </div>
          </div>
          <div className="flex gap-12 font-mono">
            <span>FRAME_RATE_24.00</span>
            <span>BUFFER_STATUS_OPTIMAL</span>
          </div>
        </div>
      </footer>

      <style>{`
        ::-webkit-scrollbar{width:4px;background:#050505}
        ::-webkit-scrollbar-thumb{background:#ff003c}
      `}</style>
    </div>
  );
}
