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
import { Skull, Flame, Droplets, Shield, Clock, Check, Globe, Mail, Phone, ChevronRight, ArrowRight, X, Menu, Star, Box, PenTool, Scissors, Heart, Zap, Camera } from "lucide-react";

import "../premium.css";

/* ==========================================================================
   DATA STRUCTURES
   ========================================================================= */

const STYLES = [
  "All",
  "Blackwork",
  "Micro-Realism",
  "Fine-Line",
  "Traditional",
  "Neo-Traditional",
];

const PORTFOLIO = [
  {
    id: 1,
    style: "Blackwork",
    artist: "Marco",
    img: "https://images.unsplash.com/photo-1590208653897-da286f9f5926?w=800&q=80",
  },
  {
    id: 2,
    style: "Micro-Realism",
    artist: "Elena",
    img: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=800&q=80",
  },
  {
    id: 3,
    style: "Fine-Line",
    artist: "Sora",
    img: "https://images.unsplash.com/photo-1560707303-4e980ce876ad?w=800&q=80",
  },
  {
    id: 4,
    style: "Traditional",
    artist: "Viktor",
    img: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=800&q=80",
  },
  {
    id: 5,
    style: "Blackwork",
    artist: "Marco",
    img: "https://images.unsplash.com/photo-1550537687-c91072c4792d?w=800&q=80",
  },
  {
    id: 6,
    style: "Micro-Realism",
    artist: "Elena",
    img: "https://images.unsplash.com/photo-1590208653897-da286f9f5926?w=800&q=80",
  },
];

const ARTISTS = [
  {
    name: "Marco Vane",
    role: "Master Blackwork",
    bio: "15 years of needle-depth mastery. Specializing in geometric brutalism.",
    img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&q=80",
  },
  {
    name: "Elena Frost",
    role: "Realism Specialist",
    bio: "Capturing the soul in graphite tones. High-fidelity portraits and biological textures.",
    img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&q=80",
  },
  {
    name: "Sora Moon",
    role: "Fine-Line Architect",
    bio: "Precision defined by single-needle excellence. Minimalist structures.",
    img: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&q=80",
  },
];

const AFTERCARE = [
  {
    q: "How long should I keep the bandage on?",
    a: "We use hospital-grade 'Second Skin' adhesive film. Keep it on for 3-5 days. If using traditional wrap, remove after 2-4 hours and follow the wash protocol.",
  },
  {
    q: "When can I exercise again?",
    a: "Avoid heavy sweating and friction on the area for at least 7-10 days. For large pieces, wait until the initial peeling phase is complete.",
  },
  {
    q: "Is the studio sterile?",
    a: "We operate a medical-grade sterilization suite. Every needle is single-use, and all equipment is autoclaved or bio-wrapped before each session.",
  },
  {
    q: "Do you offer touch-ups?",
    a: "Yes. Every original piece includes one complimentary touch-up within the first 6 months to ensure ink longevity and saturation.",
  },
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
  const sx = useSpring(x, { stiffness: 150, damping: 15 });
  const sy = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouse = useCallback(
    (e: React.MouseEvent) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      x.set((e.clientX - rect.left - rect.width / 2) * 0.4);
      y.set((e.clientY - rect.top - rect.height / 2) * 0.4);
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

export default function InkAndIronPage() {
  const [scrolled, setScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const filteredPortfolio =
    activeFilter === "All"
      ? PORTFOLIO
      : PORTFOLIO.filter((p) => p.style === activeFilter);

  return (
    <div className="premium-theme min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-[#ff3e3e] selection:text-white overflow-x-hidden">
      {/* ── NAVIGATION ── */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${scrolled ? "bg-black/90 backdrop-blur-xl py-4 border-b border-white/5" : "bg-transparent py-8"}`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-3">
            <div className="w-10 h-10 bg-white flex items-center justify-center rounded-sm group-hover:bg-[#ff3e3e] transition-colors">
              <Skull className="w-6 h-6 text-black" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase italic">
              Ink<span className="text-[#ff3e3e]">&</span>Iron
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
            {["Gallery", "Artists", "Sterilization", "Studio", "Journal"].map(
              (link) => (
                <Link
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {link}
                </Link>
              ),
            )}
          </div>

          <div className="flex items-center gap-8">
            <MagneticBtn
              onClick={() => setBookingOpen(true)}
              className="px-8 py-3 bg-[#ff3e3e] text-white text-[10px] font-bold uppercase tracking-widest rounded-sm hover:bg-white hover:text-black transition-all"
            >
              Initiate_Session
            </MagneticBtn>
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
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 z-[100] bg-black p-12 flex flex-col justify-center gap-10"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-10 right-8 text-white"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="flex flex-col gap-8 text-6xl font-black italic uppercase text-white/20">
              <Link
                href="#"
                onClick={() => setMenuOpen(false)}
                className="hover:text-[#ff3e3e] transition-colors"
              >
                Gallery
              </Link>
              <Link
                href="#"
                onClick={() => setMenuOpen(false)}
                className="hover:text-[#ff3e3e] transition-colors"
              >
                Artists
              </Link>
              <Link
                href="#"
                onClick={() => setMenuOpen(false)}
                className="hover:text-[#ff3e3e] transition-colors"
              >
                Studio
              </Link>
              <Link
                href="#"
                onClick={() => setMenuOpen(false)}
                className="hover:text-[#ff3e3e] transition-colors"
              >
                Booking
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO ── */}
      <section className="relative h-screen flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1590208653897-da286f9f5926?w=1600&q=80"
            alt="Tattoo Studio"
            fill
            className="object-cover opacity-30 grayscale brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full">
          <Reveal>
            <Badge className="bg-[#ff3e3e]/10 text-[#ff3e3e] border border-[#ff3e3e]/20 text-[10px] font-bold uppercase tracking-[0.4em] mb-10 px-4 py-1.5">
              Berlin // London // Tokyo
            </Badge>
            <h1 className="text-7xl md:text-[9rem] font-black italic leading-[0.85] tracking-tighter mb-12 uppercase">
              Permanent <br />{" "}
              <span className="text-white opacity-20 not-italic font-sans font-thin tracking-widest">
                Architects.
              </span>
            </h1>
            <p className="max-w-xl text-lg text-white/50 leading-relaxed font-light italic mb-12">
              Precision ink delivery for the discerning individual. We do not
              copy. We do not compromise. We define the intersection of skin and
              machine.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <MagneticBtn
                onClick={() => setBookingOpen(true)}
                className="px-12 py-5 bg-white text-black text-[10px] font-bold uppercase tracking-[0.3em] rounded-sm hover:bg-[#ff3e3e] hover:text-white transition-all cursor-pointer"
              >
                Request Consult
              </MagneticBtn>
              <Link
                href="#gallery"
                className="px-12 py-5 border border-white/10 text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded-sm hover:bg-white/5 transition-all flex items-center justify-center gap-3"
              >
                Inspect_Archive <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="absolute bottom-12 right-12 hidden lg:flex flex-col items-end gap-2 text-white/20">
          <span className="text-[10px] font-bold uppercase tracking-widest font-mono">
            X: 52.5200 // Y: 13.4050
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest font-mono">
            Status: INK_DELIVERY_ACTIVE
          </span>
        </div>
      </section>

      {/* ── GALLERY SECTION ── */}
      <section id="gallery" className="py-32 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
              <div>
                <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-none mb-6">
                  Archive <br /> <span className="text-[#ff3e3e]">2026.</span>
                </h2>
                <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.4em]">
                  Filter by Technical Discipline
                </p>
              </div>
              <div className="flex gap-3 flex-wrap">
                {STYLES.map((style) => (
                  <button
                    key={style}
                    onClick={() => setActiveFilter(style)}
                    className={`px-6 py-2.5 rounded-sm text-[10px] font-bold uppercase tracking-widest border transition-all 
                      ${activeFilter === style ? "bg-[#ff3e3e] border-[#ff3e3e] text-white" : "border-white/10 text-white/30 hover:border-white/30"}`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredPortfolio.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="group relative aspect-square overflow-hidden cursor-pointer"
                >
                  <Image
                    src={item.img}
                    alt={item.style}
                    fill
                    className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-10">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#ff3e3e] mb-2">
                      {item.style}
                    </span>
                    <h3 className="text-3xl font-black italic uppercase">
                      Artist: {item.artist}
                    </h3>
                    <button className="mt-6 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── ARTISTS SECTION ── */}
      <section id="artists" className="py-32 bg-[#0d0d0d]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <Reveal>
            <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter mb-24 text-center">
              Master <span className="text-[#ff3e3e]">Needles.</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {ARTISTS.map((artist, i) => (
              <Reveal key={artist.name} delay={i * 0.1}>
                <div className="group space-y-8">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-sm grayscale group-hover:grayscale-0 transition-all duration-700">
                    <Image
                      src={artist.img}
                      alt={artist.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 border-[15px] border-black/10 group-hover:border-black/0 transition-all duration-500" />
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <h3 className="text-3xl font-black italic uppercase">
                        {artist.name}
                      </h3>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#ff3e3e] mb-1">
                        {artist.role}
                      </span>
                    </div>
                    <p className="text-sm text-white/40 italic font-light leading-relaxed">
                      {artist.bio}
                    </p>
                    <div className="pt-6 flex gap-4">
                      <Globe className="w-4 h-4 text-white/20 hover:text-[#ff3e3e] cursor-pointer transition-colors" />
                      <Globe className="w-4 h-4 text-white/20 hover:text-[#ff3e3e] cursor-pointer transition-colors" />
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── STERILIZATION AUDIT ── */}
      <section
        id="sterilization"
        className="py-32 px-6 md:px-12 bg-white text-black"
      >
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <Reveal>
            <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter leading-tight mb-10 uppercase">
              Clinical <br /> <span className="text-[#ff3e3e]">Integrity.</span>
            </h2>
            <p className="text-black/60 text-lg leading-relaxed mb-12 italic">
              Sterility is not a suggestion; it is the foundation of our craft.
              Ink & Iron operates at the intersection of aesthetic brilliance
              and medical hygiene.
            </p>
            <div className="space-y-8">
              {[
                {
                  label: "Autoclave Sterilization",
                  val: "100%",
                  desc: "Class-B medical vacuum sterilization cycles for all tools.",
                },
                {
                  label: "Single-Use Bio-Wraps",
                  val: "Daily",
                  desc: "Every workstation is wrapped and disposed of after each session.",
                },
                {
                  label: "V-Select Needles",
                  val: "Verified",
                  desc: "Individually blister-packed, membrane-sealed cartridges only.",
                },
              ].map((spec, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="w-12 h-12 shrink-0 border border-black/10 flex items-center justify-center font-black italic text-[#ff3e3e]">
                    0{i + 1}
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest">
                        {spec.label}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#ff3e3e]">
                        {spec.val}
                      </span>
                    </div>
                    <p className="text-xs text-black/40 italic font-light">
                      {spec.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="relative aspect-square bg-[#0a0a0a] p-12 overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=800&q=80"
                alt="Sterile Kit"
                fill
                className="object-cover opacity-50 group-hover:scale-110 transition-transform duration-[4s]"
              />
              <div className="relative z-10 h-full flex flex-col justify-between border border-white/10 p-10">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#ff3e3e]">
                  Sterile_Suite_V2.0
                </span>
                <div className="space-y-4">
                  <div className="w-full h-1 bg-white/10 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 2 }}
                      className="h-full bg-[#ff3e3e]"
                    />
                  </div>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-white/40">
                    Real-time Bio-Status: SECURE
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── AFTERCARE ACCORDION ── */}
      <section className="py-32 bg-[#0a0a0a] px-6">
        <div className="max-w-3xl mx-auto">
          <Reveal className="text-center mb-24">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#ff3e3e] mb-6 block">
              Healing Protocol
            </span>
            <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase">
              The_Aftercare_Dossier
            </h2>
          </Reveal>

          <Accordion type="single" collapsible className="space-y-6">
            {AFTERCARE.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b border-white/10 px-4"
              >
                <AccordionTrigger className="text-left text-[11px] font-bold uppercase tracking-widest text-white/50 py-8 hover:text-[#ff3e3e] hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm font-light text-white/30 italic leading-relaxed pb-8">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── MEGA FOOTER ── */}
      <footer className="bg-black pt-32 pb-12 px-6 md:px-12 border-t border-white/5 relative">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-24 mb-32">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 bg-[#ff3e3e] flex items-center justify-center rounded-sm">
                  <Skull className="w-6 h-6 text-white" />
                </div>
                <span className="text-3xl font-black italic uppercase tracking-tighter italic">
                  Ink<span className="text-[#ff3e3e]">&</span>Iron
                </span>
              </div>
              <p className="text-white/20 max-w-sm mb-12 text-[11px] font-bold uppercase tracking-widest leading-loose italic">
                The intersection of skin architecture and biological machine.
                Built for the permanent collector. Est. 2026.
              </p>
              <div className="flex gap-4">
                {[Globe, Globe, Mail].map((Icon, i) => (
                  <button
                    key={i}
                    className="w-12 h-12 rounded-sm border border-white/10 flex items-center justify-center text-white/40 hover:bg-[#ff3e3e] hover:text-white transition-all"
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-2 lg:col-start-7">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-white mb-10">
              Disciplines
            </h4>
            <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/20">
              <li>
                <Link
                  href="#"
                  className="hover:text-[#ff3e3e] transition-colors"
                >
                  Blackwork_Void
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#ff3e3e] transition-colors"
                >
                  Realism_Audit
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#ff3e3e] transition-colors"
                >
                  Fine_Line_Ops
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#ff3e3e] transition-colors"
                >
                  Brutalist_Ink
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-white mb-10">
              Studio
            </h4>
            <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/20">
              <li>
                <Link
                  href="#"
                  className="hover:text-[#ff3e3e] transition-colors"
                >
                  Burbank_Suite
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#ff3e3e] transition-colors"
                >
                  London_Vault
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#ff3e3e] transition-colors"
                >
                  Tokyo_Engine
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#ff3e3e] transition-colors"
                >
                  Sanctity_Log
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-white mb-10">
              Legal
            </h4>
            <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/20">
              <li>
                <Link
                  href="#"
                  className="hover:text-[#ff3e3e] transition-colors"
                >
                  Release_Forms
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#ff3e3e] transition-colors"
                >
                  Sterile_SLA
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#ff3e3e] transition-colors"
                >
                  Privacy_Shell
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#ff3e3e] transition-colors"
                >
                  Institutional
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] font-bold uppercase tracking-widest text-white/10">
          <div className="flex items-center gap-10">
            <span>
              &copy; {new Date().getFullYear()} INK & IRON COLLECTIVE.
            </span>
            <span>Berlin // London // Tokyo // Los Angeles</span>
          </div>
          <div className="flex gap-10">
            <span>Bio-Secure Facility</span>
            <span>Institutional Standard</span>
          </div>
        </div>
      </footer>

      {/* BOOKING MODAL */}
      <AnimatePresence>
        {bookingOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6"
            onClick={() => setBookingOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="bg-[#0a0a0a] border border-white/10 max-w-xl w-full p-16 rounded-sm shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setBookingOpen(false)}
                className="absolute top-10 right-10 text-white/40 hover:text-[#ff3e3e] transition-colors"
              >
                <X className="w-8 h-8" />
              </button>

              <div className="space-y-12">
                <div className="text-center">
                  <h3 className="text-4xl font-black italic uppercase italic mb-4">
                    Initiate_Session
                  </h3>
                  <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#ff3e3e]">
                    Booking Queue: 4-6 Months Wait
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-white/20 ml-2">
                      Collector_Name
                    </label>
                    <input
                      type="text"
                      className="w-full bg-white/5 border border-white/10 px-6 py-4 text-xs font-bold uppercase tracking-widest outline-none focus:border-[#ff3e3e] transition-all"
                      placeholder="Enter_Identity"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-white/20 ml-2">
                      Digital_Contact
                    </label>
                    <input
                      type="email"
                      className="w-full bg-white/5 border border-white/10 px-6 py-4 text-xs font-bold uppercase tracking-widest outline-none focus:border-[#ff3e3e] transition-all"
                      placeholder="Email_Archive"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-white/20 ml-2">
                      Discipline_Interest
                    </label>
                    <select className="w-full bg-white/5 border border-white/10 px-6 py-4 text-xs font-bold uppercase tracking-widest outline-none focus:border-[#ff3e3e] transition-all appearance-none">
                      {STYLES.map((s) => (
                        <option key={s} className="bg-black">
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button className="w-full py-6 bg-[#ff3e3e] text-white text-[11px] font-black uppercase tracking-[0.4em] rounded-sm hover:bg-white hover:text-black transition-all shadow-xl">
                  SUBMIT_CONSULTATION
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        ::-webkit-scrollbar{width:4px;background:#0a0a0a}
        ::-webkit-scrollbar-thumb{background:#ff3e3e}
      `}</style>
    </div>
  );
}
