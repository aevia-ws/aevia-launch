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
import { Sparkles, Heart, ShieldCheck, Zap, Star, Globe, Mail, Phone, ChevronRight, ArrowRight, X, Menu, Stethoscope, Microscope, Droplets, Users, Award, Clock, MapPin, Search, Calendar, Activity, ZapIcon, Scan } from "lucide-react";

import "../premium.css";

/* ==========================================================================
   DATA STRUCTURES
   ========================================================================= */

const TREATMENTS = [
  {
    id: 1,
    name: "Cellular Rejuvenation",
    category: "Longevity",
    price: "From $1,200",
    desc: "Exosome therapy combined with hyperbaric oxygen to trigger deep tissue repair at a DNA level.",
    img: "https://images.unsplash.com/photo-1579152276506-5d5ef7ac9875?w=800&q=80",
  },
  {
    id: 2,
    name: "Architectural Sculpting",
    category: "Aesthetics",
    price: "From $850",
    desc: "A multi-modal approach using high-intensity ultrasound and targeted dermal fillers.",
    img: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&q=80",
  },
  {
    id: 3,
    name: "Lumière Glow Protocol",
    category: "Dermatology",
    price: "From $450",
    desc: "Our signature laser resurfacing combined with bespoke nutrient infusion for glass-like skin.",
    img: "https://images.unsplash.com/photo-1616391182219-e080b4d1043a?w=800&q=80",
  },
];

const SPECIALTIES = [
  {
    title: "Precision Diagnostics",
    desc: "AI-driven skin analysis and epigenetic profiling to build your biological blueprint.",
    icon: Scan,
  },
  {
    title: "Longevity Medicine",
    desc: "Biological age reversal through NAD+ infusion and customized peptide protocols.",
    icon: Activity,
  },
  {
    title: "Aesthetic Synergy",
    desc: "Combining clinical excellence with the art of subtle, natural enhancement.",
    icon: Sparkles,
  },
];

const STATS = [
  { label: "Successful Procedures", value: "15k+" },
  { label: "Clinical Specialists", value: "12" },
  { label: "Scientific Patents", value: "4" },
  { label: "Patient Satisfaction", value: "99%" },
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

export default function LumiereClinicPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTreatment, setActiveTreatment] = useState<number | null>(null);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div className="premium-theme min-h-screen bg-[#fdfdfd] text-[#2c3e50] font-sans selection:bg-[#9db2bf] selection:text-white overflow-x-hidden">
      {/* ── NAVIGATION ── */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${scrolled ? "bg-white/90 backdrop-blur-xl py-4 border-b border-[#9db2bf]/10" : "bg-transparent py-8"}`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-3">
            <div className="w-10 h-10 border-2 border-[#9db2bf] rounded-full flex items-center justify-center text-[#9db2bf] group-hover:bg-[#9db2bf] group-hover:text-white transition-all duration-500">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter uppercase leading-none">
                Lumière
              </span>
              <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-[#9db2bf] -mt-1">
                Clinical Excellence
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-[#2c3e50]/40">
            {["Treatments", "Longevity", "Science", "Atelier", "Consult"].map(
              (link) => (
                <Link
                  key={link}
                  href="#"
                  className="hover:text-[#9db2bf] transition-colors cursor-pointer"
                >
                  {link}
                </Link>
              ),
            )}
          </div>

          <div className="flex items-center gap-8">
            <button className="hidden md:flex items-center gap-3 group">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#2c3e50]/60 group-hover:text-[#9db2bf] transition-colors">
                Patient_Portal
              </span>
              <div className="w-8 h-8 rounded-full border border-[#9db2bf]/20 flex items-center justify-center text-[#9db2bf] group-hover:bg-[#9db2bf] group-hover:text-white transition-all">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden text-[#9db2bf]"
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
            className="fixed inset-0 z-[100] bg-[#fdfdfd] p-12 flex flex-col justify-center gap-10"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-10 right-8 text-[#9db2bf]"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="flex flex-col gap-6 text-5xl font-black italic uppercase text-[#2c3e50]/10">
              {["Treatments", "Longevity", "Science", "Consult", "Contact"].map(
                (l) => (
                  <Link
                    key={l}
                    href="#"
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-[#9db2bf] transition-colors"
                  >
                    {l}
                  </Link>
                ),
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO ── */}
      <section className="relative h-[100svh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1579152276506-5d5ef7ac9875?w=1600&q=80"
            alt="Clinical Precision"
            fill
            className="object-cover opacity-10 grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#fdfdfd] via-[#fdfdfd]/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full">
          <Reveal>
            <Badge className="bg-[#9db2bf]/10 text-[#9db2bf] border border-[#9db2bf]/20 text-[10px] font-bold uppercase tracking-[0.5em] mb-10 px-4 py-1.5 rounded-sm">
              Next-Gen Longevity // Aesthetic Mastery
            </Badge>
            <h1 className="text-7xl md:text-[9rem] font-black leading-[0.85] tracking-tighter mb-12 uppercase text-[#2c3e50]">
              The Science of <br />{" "}
              <span className="text-[#9db2bf] font-thin tracking-widest italic lowercase">
                Eternal.
              </span>
            </h1>
            <p className="max-w-xl text-lg text-[#2c3e50]/50 leading-relaxed font-light mb-12">
              Bridging the gap between clinical dermatology and biological
              longevity. A medical sanctuary dedicated to your absolute
              preservation.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <MagneticBtn className="px-12 py-5 bg-[#2c3e50] text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded-sm hover:bg-[#9db2bf] transition-all cursor-pointer">
                Request Private Consult
              </MagneticBtn>
              <Link
                href="#treatments"
                className="px-12 py-5 border border-[#2c3e50]/10 text-[#2c3e50] text-[10px] font-bold uppercase tracking-[0.3em] rounded-sm hover:bg-white transition-all flex items-center justify-center gap-3"
              >
                Explore Protocols <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="absolute bottom-12 right-12 hidden lg:flex flex-col items-end gap-2 text-[#2c3e50]/20">
          <span className="text-[10px] font-bold uppercase tracking-widest">
            Swiss Research Partnership
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest">
            FDA Approved Protocols
          </span>
        </div>
      </section>

      {/* ── STATS SECTION ── */}
      <section className="py-20 border-y border-[#9db2bf]/10 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {STATS.map((stat, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="text-center md:text-left">
                  <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#9db2bf] mb-2">
                    {stat.label}
                  </div>
                  <div className="text-4xl font-black text-[#2c3e50]">
                    {stat.value}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TREATMENT PROTOCOLS ── */}
      <section id="treatments" className="py-32 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
              <div>
                <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-6 uppercase text-[#2c3e50]">
                  Preservation <br />{" "}
                  <span className="text-[#9db2bf] italic lowercase font-thin">
                    Protocols.
                  </span>
                </h2>
                <p className="text-[#2c3e50]/30 text-[10px] font-bold uppercase tracking-[0.4em]">
                  Clinical Case Logs // 2024 Edition
                </p>
              </div>
              <Link
                href="#"
                className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#9db2bf] border-b border-[#9db2bf] pb-2 hover:text-[#2c3e50] hover:border-[#2c3e50] transition-all"
              >
                View Scientific Library
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TREATMENTS.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.1}>
                <div
                  className="group space-y-8 cursor-pointer"
                  onMouseEnter={() => setActiveTreatment(item.id)}
                  onMouseLeave={() => setActiveTreatment(null)}
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-sm grayscale group-hover:grayscale-0 transition-all duration-700">
                    <Image
                      src={item.img}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-[#2c3e50]/5 group-hover:bg-transparent transition-colors" />

                    <AnimatePresence>
                      {activeTreatment === item.id && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 flex items-center justify-center bg-white/20 backdrop-blur-sm"
                        >
                          <button className="px-8 py-3 bg-[#2c3e50] text-white text-[9px] font-black uppercase tracking-widest">
                            Protocol Detail
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-3xl font-black uppercase tracking-tighter text-[#2c3e50]">
                        {item.name}
                      </h3>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#9db2bf]">
                        {item.price}
                      </span>
                    </div>
                    <p className="text-sm text-[#2c3e50]/40 font-light leading-relaxed italic">
                      {item.desc}
                    </p>
                    <div className="flex items-center gap-6">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-[#9db2bf]">
                        {item.category} Module
                      </span>
                      <div className="h-[1px] flex-1 bg-[#9db2bf]/10" />
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE SCIENTIFIC FOUNDATION ── */}
      <section className="py-32 bg-[#1e293b] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 p-32 opacity-5">
          <Microscope className="w-[30rem] h-[30rem]" />
        </div>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <Reveal>
            <div className="text-center mb-24">
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#9db2bf] mb-8 block">
                Scientific Foundation
              </span>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic">
                Precision{" "}
                <span className="text-[#9db2bf] not-italic font-thin">
                  Biologicals.
                </span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {SPECIALTIES.map((s, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="p-12 border border-white/5 bg-white/[0.02] hover:border-[#9db2bf]/30 transition-all group h-full flex flex-col">
                  <div className="w-14 h-14 rounded-full border border-[#9db2bf]/20 flex items-center justify-center text-[#9db2bf] mb-8 group-hover:bg-[#9db2bf] group-hover:text-white transition-all">
                    <s.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-black uppercase mb-4 tracking-tighter text-white/90">
                    {s.title}
                  </h3>
                  <p className="text-sm text-white/30 font-light leading-relaxed mb-10 flex-1">
                    {s.desc}
                  </p>
                  <button className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-widest text-[#9db2bf] group-hover:gap-5 transition-all">
                    Read Abstract <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIAGNOSTIC SUITE ── */}
      <section className="py-32 px-6 md:px-12 bg-white">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <Reveal>
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&q=80"
                alt="Laboratory"
                fill
                className="object-cover group-hover:scale-105 transition-all duration-1000 grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2c3e50]/40 to-transparent" />
              <div className="absolute bottom-10 left-10 text-white">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] mb-2 block text-[#9db2bf]">
                  AI Diagnostics
                </span>
                <h4 className="text-3xl font-black uppercase tracking-tighter">
                  Visualizing Biomechanics.
                </h4>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#9db2bf] mb-8 block">
              Diagnostic Excellence
            </span>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-10 uppercase text-[#2c3e50]">
              Blueprint <br />{" "}
              <span className="text-[#9db2bf] italic lowercase font-thin">
                Prescription.
              </span>
            </h2>
            <p className="text-[#2c3e50]/40 text-lg leading-relaxed mb-12 font-light">
              We eliminate the guesswork through spectral imaging and epigenetic
              testing. Every treatment is backed by hard biological data.
            </p>
            <div className="grid grid-cols-2 gap-8">
              {[
                {
                  icon: Scan,
                  label: "Spectral_Mapping",
                  desc: "Dermal layer depth",
                },
                {
                  icon: Droplets,
                  label: "Biomarker_Sync",
                  desc: "Epigenetic analysis",
                },
                {
                  icon: ShieldCheck,
                  label: "Safety_Verified",
                  desc: "Clinical validation",
                },
                {
                  icon: Search,
                  label: "AI_Simulation",
                  desc: "Predictive results",
                },
              ].map((val, i) => (
                <div key={i} className="space-y-2">
                  <val.icon className="w-5 h-5 text-[#9db2bf] mb-4" />
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-[#2c3e50]">
                    {val.label}
                  </h4>
                  <p className="text-[10px] font-light text-[#2c3e50]/40 uppercase tracking-widest">
                    {val.desc}
                  </p>
                </div>
              ))}
            </div>
            <MagneticBtn className="mt-16 px-12 py-5 border border-[#9db2bf] text-[#9db2bf] text-[10px] font-bold uppercase tracking-widest rounded-sm hover:bg-[#9db2bf] hover:text-white transition-all">
              Book Initial Assessment
            </MagneticBtn>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#fdfdfd] pt-32 pb-12 px-6 md:px-12 border-t border-[#9db2bf]/10">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-24 mb-32">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 border-2 border-[#9db2bf] rounded-full flex items-center justify-center text-[#9db2bf]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-black tracking-tighter uppercase leading-none">
                    Lumière
                  </span>
                  <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-[#9db2bf] -mt-1">
                    Clinical Excellence
                  </span>
                </div>
              </div>
              <p className="text-[#2c3e50]/30 max-w-sm mb-12 text-[10px] font-bold uppercase tracking-widest leading-loose italic">
                Pioneering aesthetic medicine through biological integration.
                Private consultations in London, Zürich & New York.
              </p>
              <div className="flex gap-4">
                {[Globe, Globe, Mail].map((Icon, i) => (
                  <button
                    key={i}
                    className="w-12 h-12 rounded-full border border-[#9db2bf]/20 flex items-center justify-center text-[#9db2bf] hover:bg-[#9db2bf] hover:text-white transition-all"
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-2 lg:col-start-7">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#9db2bf] mb-10">
              Treatments
            </h4>
            <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-[#2c3e50]/30">
              <li>
                <Link
                  href="#"
                  className="hover:text-[#9db2bf] transition-colors"
                >
                  Longevity_Lab
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#9db2bf] transition-colors"
                >
                  Dermal_Sculpt
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#9db2bf] transition-colors"
                >
                  Laser_Refinement
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#9db2bf] transition-colors"
                >
                  Nutrient_Sync
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#9db2bf] mb-10">
              Diagnostics
            </h4>
            <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-[#2c3e50]/30">
              <li>
                <Link
                  href="#"
                  className="hover:text-[#9db2bf] transition-colors"
                >
                  Spectral_Analysis
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#9db2bf] transition-colors"
                >
                  Epigenetic_Testing
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#9db2bf] transition-colors"
                >
                  Bio_Blueprint
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#9db2bf] transition-colors"
                >
                  Risk_Assessment
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#9db2bf] mb-10">
              Clinic
            </h4>
            <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-[#2c3e50]/30">
              <li>
                <Link
                  href="#"
                  className="hover:text-[#9db2bf] transition-colors"
                >
                  Our_Specialists
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#9db2bf] transition-colors"
                >
                  Scientific_Ethics
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#9db2bf] transition-colors"
                >
                  Global_Ateliers
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#9db2bf] transition-colors"
                >
                  Consultation
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto pt-10 border-t border-[#9db2bf]/10 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] font-bold uppercase tracking-widest text-[#2c3e50]/20">
          <div className="flex items-center gap-10">
            <span>
              &copy; {new Date().getFullYear()} LUMIÈRE CLINICAL GROUP.
            </span>
            <div className="flex gap-6">
              <span>GMC_REGULATED_CLINIC</span>
              <span>ISO_9001_CERTIFIED</span>
            </div>
          </div>
          <div className="flex gap-10 font-mono">
            <span>L_OS_V2.9_STABLE</span>
            <span>SECURE_PATIENT_DATA</span>
          </div>
        </div>
      </footer>

      <style>{`
        ::-webkit-scrollbar{width:4px;background:#fdfdfd}
        ::-webkit-scrollbar-thumb{background:#9db2bf}
      `}</style>
    </div>
  );
}
