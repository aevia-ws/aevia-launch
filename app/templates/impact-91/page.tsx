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
import { Diamond, Sparkles, Heart, Star, Check, Globe, Mail, Phone, ChevronRight, ArrowRight, X, Menu, ShoppingBag, Award, Clock, MapPin, PenTool, Scissors, Zap, Search, Plus } from "lucide-react";

import "../premium.css";

/* ==========================================================================
   DATA STRUCTURES
   ========================================================================= */

const COLLECTIONS = [
  {
    id: 1,
    name: "Celestial Silk",
    year: "2024",
    img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
    desc: "Hand-woven gold threads meeting ethical lab-grown diamonds.",
  },
  {
    id: 2,
    name: "Nocturnal Echo",
    year: "2024",
    img: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=800&q=80",
    desc: "Black opals and obsidian set in 18k white gold architectural frames.",
  },
  {
    id: 3,
    name: "The Alchemist",
    year: "2023",
    img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80",
    desc: "Raw gems and textured precious metals for the modern visionary.",
  },
];

const SERVICES = [
  {
    title: "Bespoke Creation",
    desc: "A collaborative journey from initial sketch to the final masterwork. Your vision, our artisan expertise.",
    icon: PenTool,
  },
  {
    title: "Gemological Sourcing",
    desc: "Direct access to ethical diamond mines and rare colored gemstone cutters worldwide.",
    icon: Search,
  },
  {
    title: "Heritage Restoration",
    desc: "Breathing new life into family heirlooms with modern structural integrity and original soul.",
    icon: Scissors,
  },
];

const CRAFT_STATS = [
  { label: "Hand-Set Stones", value: "100%" },
  { label: "Master Artisans", value: "12" },
  { label: "Ethical Sourcing", value: "Certified" },
  { label: "Hours per Piece", value: "48+" },
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

export default function AureliaJewelsPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [consultOpen, setConsultOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div className="premium-theme min-h-screen bg-[#fdfcfb] text-[#2a2a2a] font-serif selection:bg-[#c9a96e] selection:text-white overflow-x-hidden">
      {/* ── NAVIGATION ── */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${scrolled ? "bg-white/90 backdrop-blur-xl py-4 border-b border-[#c9a96e]/10" : "bg-transparent py-8"}`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="group flex flex-col items-center">
            <span className="text-2xl font-black tracking-tighter uppercase italic text-[#2a2a2a]">
              Aurelia
            </span>
            <span className="text-[8px] font-bold uppercase tracking-[0.6em] text-[#c9a96e] -mt-1 ml-1">
              Atelier
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-[#2a2a2a]/40">
            {[
              "Collections",
              "Bespoke",
              "Artisanship",
              "Archives",
              "Ateliers",
            ].map((link) => (
              <Link
                key={link}
                href={`#${link.toLowerCase()}`}
                className="hover:text-[#c9a96e] transition-colors cursor-pointer"
              >
                {link}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-8">
            <button
              onClick={() => setConsultOpen(true)}
              className="hidden md:flex items-center gap-3 group"
            >
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#2a2a2a]/60 group-hover:text-[#c9a96e] transition-colors">
                Request_Consult
              </span>
              <div className="w-8 h-8 rounded-full border border-[#c9a96e]/20 flex items-center justify-center text-[#c9a96e] group-hover:bg-[#c9a96e] group-hover:text-white transition-all">
                <ChevronRight className="w-4 h-4" />
              </div>
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden text-[#c9a96e]"
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
            className="fixed inset-0 z-[100] bg-[#fdfcfb] p-12 flex flex-col justify-center gap-10"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-10 right-8 text-[#c9a96e]"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="flex flex-col gap-6 text-5xl font-black italic uppercase text-[#2a2a2a]/20">
              {[
                "Collections",
                "Bespoke",
                "Artisanship",
                "Archives",
                "Contact",
              ].map((l) => (
                <Link
                  key={l}
                  href="#"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-[#c9a96e] transition-colors"
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
            src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1600&q=80"
            alt="Jewelry Masterpiece"
            fill
            className="object-cover opacity-90"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#fdfcfb] via-[#fdfcfb]/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full">
          <Reveal>
            <Badge className="bg-[#c9a96e]/10 text-[#c9a96e] border border-[#c9a96e]/20 text-[10px] font-bold uppercase tracking-[0.5em] mb-12 px-4 py-1.5 rounded-full">
              Place Vendôme // Paris
            </Badge>
            <h1 className="text-7xl md:text-[9rem] font-black italic leading-[0.85] tracking-tighter mb-12 text-[#2a2a2a]">
              Sculpting <br />{" "}
              <span className="text-[#c9a96e] not-italic font-thin font-sans tracking-widest">
                Eternity.
              </span>
            </h1>
            <p className="max-w-md text-lg text-[#2a2a2a]/60 leading-relaxed font-light italic mb-12">
              A heritage of artisanal jewelry design where architectural
              precision meets the organic soul of the world's rarest gemstones.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <MagneticBtn
                onClick={() => setConsultOpen(true)}
                className="px-12 py-5 bg-[#2a2a2a] text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded-full hover:bg-[#c9a96e] transition-all cursor-pointer"
              >
                The Bespoke Journey
              </MagneticBtn>
              <Link
                href="#collections"
                className="px-12 py-5 border border-[#2a2a2a]/10 text-[#2a2a2a] text-[10px] font-bold uppercase tracking-[0.3em] rounded-full hover:bg-white transition-all flex items-center justify-center gap-3"
              >
                Examine Collections <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="absolute bottom-12 right-12 hidden lg:flex flex-col items-end gap-2 text-[#2a2a2a]/20">
          <span className="text-[10px] font-bold uppercase tracking-widest font-sans">
            Crafted with Single-Needle Precision
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest font-sans">
            Verified GIA Ethics Compliant
          </span>
        </div>
      </section>

      {/* ── CRAFT STATS ── */}
      <section className="py-20 border-y border-[#c9a96e]/10 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {CRAFT_STATS.map((stat, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="text-center md:text-left">
                  <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#c9a96e] mb-2">
                    {stat.label}
                  </div>
                  <div className="text-4xl font-black italic text-[#2a2a2a]">
                    {stat.value}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── COLLECTIONS SECTION ── */}
      <section id="collections" className="py-32 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
              <div>
                <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-none mb-6 text-[#2a2a2a]">
                  Current <br />{" "}
                  <span className="text-[#c9a96e]">Chapters.</span>
                </h2>
                <p className="text-[#2a2a2a]/30 text-[10px] font-bold uppercase tracking-[0.4em]">
                  Seasonal Masterworks 2024
                </p>
              </div>
              <Link
                href="#"
                className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c9a96e] border-b border-[#c9a96e] pb-2 hover:text-[#2a2a2a] hover:border-[#2a2a2a] transition-all"
              >
                View Full Catalogue
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {COLLECTIONS.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.1}>
                <div className="group space-y-8 cursor-pointer">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
                    <Image
                      src={item.img}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                    <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100">
                      <Plus className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-3xl font-black italic uppercase text-[#2a2a2a]">
                        {item.name}
                      </h3>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#c9a96e]">
                        {item.year}
                      </span>
                    </div>
                    <p className="text-sm text-[#2a2a2a]/40 italic font-light leading-relaxed">
                      {item.desc}
                    </p>
                    <button className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-[#c9a96e] group-hover:gap-5 transition-all">
                      Inspect Collection <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── BESPOKE JOURNEY ── */}
      <section id="bespoke" className="py-32 bg-[#0d0d0d] text-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <Reveal>
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#c9a96e] mb-8 block">
              The Bespoke Journey
            </span>
            <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter leading-tight mb-10 uppercase">
              A Narrative <br />{" "}
              <span className="text-[#c9a96e]">In Gold.</span>
            </h2>
            <p className="text-white/40 text-lg leading-relaxed mb-12 italic font-light">
              We believe jewelry should not just be worn; it should be lived.
              Every bespoke piece begins with a story, a memory, or an ambition.
            </p>
            <div className="space-y-12">
              {SERVICES.map((s, i) => (
                <div key={i} className="flex gap-8 group">
                  <div className="w-16 h-16 shrink-0 rounded-full border border-white/10 flex items-center justify-center text-[#c9a96e] group-hover:bg-[#c9a96e] group-hover:text-black transition-all">
                    <s.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black italic uppercase mb-2 text-white/90">
                      {s.title}
                    </h3>
                    <p className="text-sm text-white/30 italic font-light leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden grayscale group">
              <Image
                src="https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=800&q=80"
                alt="Craftsmanship"
                fill
                className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-10 left-10">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#c9a96e] mb-4 block">
                  Atelier View
                </span>
                <h4 className="text-3xl font-black italic uppercase">
                  Precision Hand-Setting
                </h4>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SAVOIR-FAIRE ── */}
      <section id="artisanship" className="py-32 px-6 md:px-12 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <div className="text-center mb-24">
              <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter mb-6 uppercase text-[#2a2a2a]">
                Savoir <span className="text-[#c9a96e]">Faire.</span>
              </h2>
              <p className="text-[#2a2a2a]/30 text-[10px] font-bold uppercase tracking-[0.4em]">
                The Architecture of Adornment
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <Reveal>
              <div className="space-y-12">
                <div>
                  <h3 className="text-2xl font-black italic uppercase mb-4 text-[#2a2a2a]">
                    Ethical Gemology
                  </h3>
                  <p className="text-sm text-[#2a2a2a]/40 leading-relaxed font-light italic">
                    Every diamond exceeding 0.5 carats is laser-inscribed and
                    tracked via blockchain to ensure its origin is as pure as
                    its clarity. We partner exclusively with RJC-certified
                    mines.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-black italic uppercase mb-4 text-[#2a2a2a]">
                    Micro-Architectural Casting
                  </h3>
                  <p className="text-sm text-[#2a2a2a]/40 leading-relaxed font-light italic">
                    Our casting process involves vacuum-pressure systems that
                    eliminate all porosity, resulting in gold that is denser,
                    stronger, and more resilient to the test of time.
                  </p>
                </div>
                <MagneticBtn
                  onClick={() => setConsultOpen(true)}
                  className="px-10 py-4 border border-[#c9a96e] text-[#c9a96e] text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-[#c9a96e] hover:text-white transition-all"
                >
                  Request Private Viewing
                </MagneticBtn>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="relative aspect-square">
                <Image
                  src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80"
                  alt="Process"
                  fill
                  className="object-cover rounded-full"
                />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0 border border-[#c9a96e]/20 rounded-full scale-110 flex items-start justify-center"
                >
                  <div className="w-2 h-2 bg-[#c9a96e] rounded-full -mt-1" />
                </motion.div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#fdfcfb] pt-32 pb-12 px-6 md:px-12 border-t border-[#c9a96e]/10">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-24 mb-32">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="flex flex-col mb-10">
                <span className="text-3xl font-black tracking-tighter uppercase italic text-[#2a2a2a]">
                  Aurelia
                </span>
                <span className="text-[9px] font-bold uppercase tracking-[0.7em] text-[#c9a96e] -mt-1 ml-1">
                  Atelier
                </span>
              </div>
              <p className="text-[#2a2a2a]/30 max-w-sm mb-12 text-[11px] font-bold uppercase tracking-widest leading-loose italic">
                Precision jewelry architecture. Appointment-only viewings.
                Paris, London & New York.
              </p>
              <div className="flex gap-4">
                {[Globe, Globe, Mail].map((Icon, i) => (
                  <button
                    key={i}
                    className="w-12 h-12 rounded-full border border-[#c9a96e]/20 flex items-center justify-center text-[#c9a96e] hover:bg-[#c9a96e] hover:text-white transition-all"
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-2 lg:col-start-7">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#c9a96e] mb-10">
              Collections
            </h4>
            <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-[#2a2a2a]/30">
              <li>
                <Link
                  href="#"
                  className="hover:text-[#c9a96e] transition-colors"
                >
                  Celestial_Silk
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#c9a96e] transition-colors"
                >
                  Nocturnal_Echo
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#c9a96e] transition-colors"
                >
                  The_Alchemist
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#c9a96e] transition-colors"
                >
                  Heritage_Vault
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#c9a96e] mb-10">
              The Atelier
            </h4>
            <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-[#2a2a2a]/30">
              <li>
                <Link
                  href="#"
                  className="hover:text-[#c9a96e] transition-colors"
                >
                  Bespoke_Lab
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#c9a96e] transition-colors"
                >
                  Gem_Sourcing
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#c9a96e] transition-colors"
                >
                  Restoration
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#c9a96e] transition-colors"
                >
                  Valuations
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#c9a96e] mb-10">
              House
            </h4>
            <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-[#2a2a2a]/30">
              <li>
                <Link
                  href="#"
                  className="hover:text-[#c9a96e] transition-colors"
                >
                  Our_Story
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#c9a96e] transition-colors"
                >
                  Appointments
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#c9a96e] transition-colors"
                >
                  Press_Room
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#c9a96e] transition-colors"
                >
                  Institutional
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto pt-10 border-t border-[#c9a96e]/10 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] font-bold uppercase tracking-widest text-[#2a2a2a]/20">
          <div className="flex items-center gap-10">
            <span>&copy; {new Date().getFullYear()} AURELIA ATELIER.</span>
            <div className="flex gap-6">
              <span>Place Vendôme, Paris</span>
              <span>Bond Street, London</span>
            </div>
          </div>
          <div className="flex gap-10 font-mono">
            <span>INSTITUTIONAL_SLA_V2.4</span>
            <span>SECURE_DATA_ARCHIVE</span>
          </div>
        </div>
      </footer>

      {/* CONSULTATION MODAL */}
      <AnimatePresence>
        {consultOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-white/95 backdrop-blur-xl flex items-center justify-center p-6"
            onClick={() => setConsultOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="bg-[#fdfcfb] border border-[#c9a96e]/20 max-w-2xl w-full p-16 rounded-sm shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setConsultOpen(false)}
                className="absolute top-10 right-10 text-[#2a2a2a]/20 hover:text-[#c9a96e] transition-colors"
              >
                <X className="w-8 h-8" />
              </button>

              <div className="space-y-12">
                <div className="text-center">
                  <h3 className="text-4xl font-black italic uppercase mb-4 text-[#2a2a2a]">
                    Private Consultation
                  </h3>
                  <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#c9a96e]">
                    Our current lead time is 8-12 weeks.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-[#2a2a2a]/20 ml-2">
                      Full_Name
                    </label>
                    <input
                      type="text"
                      className="w-full bg-white border border-[#c9a96e]/10 px-6 py-4 text-xs font-bold uppercase tracking-widest outline-none focus:border-[#c9a96e] transition-all"
                      placeholder="Enter_Identity"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-[#2a2a2a]/20 ml-2">
                      Email_Address
                    </label>
                    <input
                      type="email"
                      className="w-full bg-white border border-[#c9a96e]/10 px-6 py-4 text-xs font-bold uppercase tracking-widest outline-none focus:border-[#c9a96e] transition-all"
                      placeholder="Archive_Sync"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[9px] font-bold uppercase tracking-widest text-[#2a2a2a]/20 ml-2">
                      Inquiry_Discipline
                    </label>
                    <select className="w-full bg-white border border-[#c9a96e]/10 px-6 py-4 text-xs font-bold uppercase tracking-widest outline-none focus:border-[#c9a96e] transition-all appearance-none">
                      <option>Bespoke_Creation</option>
                      <option>Gem_Sourcing</option>
                      <option>Heritage_Restoration</option>
                      <option>Private_Viewing</option>
                    </select>
                  </div>
                </div>

                <button className="w-full py-6 bg-[#2a2a2a] text-white text-[11px] font-black uppercase tracking-[0.5em] rounded-full hover:bg-[#c9a96e] transition-all shadow-xl">
                  Request Formal Invitation
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        ::-webkit-scrollbar{width:4px;background:#fdfcfb}
        ::-webkit-scrollbar-thumb{background:#c9a96e}
      `}</style>
    </div>
  );
}

function Plus({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
      />
    </svg>
  );
}
