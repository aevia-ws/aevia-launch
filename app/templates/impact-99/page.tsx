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
import { Flame, UtensilsCrossed, Wine, Star, Award, Globe, Mail, MapPin, ChevronRight, ArrowRight, X, Menu, Clock, Phone, Search, ShoppingBag, ChefHat, Beef, Droplets, GlassWater } from "lucide-react";

import "../premium.css";

/* ==========================================================================
   DATA STRUCTURES
   ========================================================================= */

const MENU_HIGHLIGHTS = [
  {
    id: 1,
    name: "Dry-Aged Wagyu",
    category: "Signature",
    price: "$185",
    desc: "45-day dry-aged A5 Wagyu, seared over Japanese white oak charcoal and finished with smoked sea salt.",
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&q=80",
  },
  {
    id: 2,
    name: "Smoked Ember Octopus",
    category: "Appetizer",
    price: "$34",
    desc: "Wood-fired octopus tentacle with chorizo emulsion, squid ink tuile, and pickled mustard seeds.",
    img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=1200&q=80",
  },
  {
    id: 3,
    name: "The Ember Cellar Selection",
    category: "Pairing",
    price: "$95",
    desc: "A curated flight of rare vintage reds, hand-selected to complement the intensity of wood-fired smoke.",
    img: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200&q=80",
  },
];

const PHILOSOPHY = [
  {
    title: "The Fire Lab",
    desc: "We utilize three distinct wood types—Hickory, Cherry, and Oak—to create a complex smoke profile unique to every cut.",
    icon: Flame,
  },
  {
    title: "Ancestral Sourcing",
    desc: "Our cattle are raised on high-altitude pastures, following ethical farming lineages that span three generations.",
    icon: Beef,
  },
  {
    title: "Culinary Alchemy",
    desc: "Precision temperature control meets raw elemental fire, guided by our Executive Chef's 20-year mastery.",
    icon: ChefHat,
  },
];

const STATS = [
  { label: "Wood Species", value: "3" },
  { label: "Dry Aging Days", value: "45-90" },
  { label: "Michelin Stars", value: "2" },
  { label: "Wine Labels", value: "850+" },
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

export default function EmberGrillPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDish, setActiveDish] = useState<number | null>(null);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div className="premium-theme min-h-screen bg-[#050505] text-[#dcdcdc] font-sans selection:bg-[#ff4d00] selection:text-white overflow-x-hidden">
      {/* ── NAVIGATION ── */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${scrolled ? "bg-[#050505]/95 backdrop-blur-2xl py-4 border-b border-white/5" : "bg-transparent py-8"}`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="group flex flex-col items-center">
            <span className="text-3xl font-black tracking-[-0.05em] uppercase leading-none italic">
              Ember
            </span>
            <span className="text-[8px] font-bold uppercase tracking-[0.5em] text-[#ff4d00] -mt-1 ml-1">
              Grill & Cellar
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
            {[
              "The_Menu",
              "The_Flame",
              "Wine_Cellar",
              "Private_Dining",
              "Reservations",
            ].map((link) => (
              <Link
                key={link}
                href="#"
                className="hover:text-[#ff4d00] transition-colors cursor-pointer"
              >
                {link}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-8">
            <button className="hidden md:flex items-center gap-3 group">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/60 group-hover:text-[#ff4d00] transition-colors">
                Book_Table
              </span>
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 group-hover:bg-[#ff4d00] group-hover:text-white group-hover:border-[#ff4d00] transition-all">
                <Clock className="w-4 h-4" />
              </div>
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden text-[#ff4d00]"
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
            className="fixed inset-0 z-[100] bg-[#050505] p-12 flex flex-col justify-center gap-10"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-10 right-8 text-[#ff4d00]"
            >
              <X className="w-10 h-10" />
            </button>
            <div className="flex flex-col gap-6 text-6xl font-black italic uppercase text-white/10">
              {["Menu", "Fire", "Wine", "Contact"].map((l) => (
                <Link
                  key={l}
                  href="#"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-[#ff4d00] transition-colors"
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
            src="https://images.unsplash.com/photo-1544025162-d76694265947?w=1600&q=80"
            alt="Fire & Smoke"
            fill
            className="object-cover opacity-50 contrast-125"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-[#050505]" />
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 w-full">
          <Reveal>
            <Badge className="bg-[#ff4d00]/10 text-[#ff4d00] border border-[#ff4d00]/30 text-[10px] font-bold uppercase tracking-[0.5em] mb-10 px-4 py-1.5 rounded-full">
              Awarded Two Michelin Stars // 2024
            </Badge>
            <h1 className="text-8xl md:text-[14rem] font-black leading-[0.75] tracking-tighter mb-12 uppercase text-white italic">
              Primitive <br />{" "}
              <span className="text-[#ff4d00] not-italic">Refinement.</span>
            </h1>
            <p className="max-w-md text-xl text-white/50 leading-relaxed font-light mb-12 uppercase tracking-widest italic">
              Where wood-fired alchemy meets contemporary culinary precision.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <MagneticBtn className="px-12 py-5 bg-[#ff4d00] text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full hover:scale-105 transition-all cursor-pointer shadow-[0_0_40px_rgba(255,77,0,0.3)]">
                Explore The Menu
              </MagneticBtn>
              <Link
                href="#menu"
                className="px-12 py-5 border border-white/20 text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded-full hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3"
              >
                Our Philosophy <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/20 animate-bounce">
          <span className="text-[10px] font-bold uppercase tracking-widest">
            Scroll
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#ff4d00] to-transparent" />
        </div>
      </section>

      {/* ── STATS SECTION ── */}
      <section className="py-24 border-y border-white/5 bg-[#0a0a0a]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {STATS.map((stat, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="text-center md:text-left">
                  <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#ff4d00] mb-2">
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

      {/* ── THE MENU ── */}
      <section id="menu" className="py-32 px-6 md:px-12">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
              <div>
                <h2 className="text-7xl md:text-[10rem] font-black italic tracking-tighter leading-none mb-6 uppercase text-white">
                  The <br /> <span className="text-[#ff4d00]">Cuts.</span>
                </h2>
                <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.4em]">
                  Seasonal Manifest // Wood-Fired Daily // Summer 2024
                </p>
              </div>
              <Link
                href="#"
                className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#ff4d00] border-b border-[#ff4d00] pb-2 hover:text-white hover:border-white transition-all"
              >
                View Full Wine List
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {MENU_HIGHLIGHTS.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.1}>
                <div
                  className="group space-y-10 cursor-pointer"
                  onMouseEnter={() => setActiveDish(item.id)}
                  onMouseLeave={() => setActiveDish(null)}
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-sm grayscale group-hover:grayscale-0 transition-all duration-[1s]">
                    <Image
                      src={item.img}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-[2s] group-hover:scale-125"
                    />
                    <div className="absolute inset-0 bg-[#050505]/40 group-hover:bg-transparent transition-colors duration-700" />

                    <div className="absolute top-6 left-6">
                      <Badge className="bg-black/60 backdrop-blur-md text-white border-white/10 text-[9px] font-bold uppercase tracking-widest px-3 py-1">
                        {item.category}
                      </Badge>
                    </div>

                    <AnimatePresence>
                      {activeDish === item.id && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 flex items-center justify-center bg-[#ff4d00]/10 backdrop-blur-[2px]"
                        >
                          <button className="px-10 py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:scale-110 transition-all shadow-2xl">
                            View Provenance
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="space-y-6">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-4xl font-black uppercase tracking-tighter text-white italic group-hover:text-[#ff4d00] transition-colors">
                        {item.name}
                      </h3>
                      <span className="text-lg font-black text-[#ff4d00] tracking-tighter">
                        {item.price}
                      </span>
                    </div>
                    <p className="text-sm text-white/30 font-light leading-relaxed uppercase tracking-widest italic leading-loose">
                      {item.desc}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="h-[1px] flex-1 bg-white/5" />
                      <Flame className="w-5 h-5 text-white/10 group-hover:text-[#ff4d00] transition-all" />
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FIRE PHILOSOPHY ── */}
      <section className="py-40 bg-[#0a0a0a] overflow-hidden relative border-t border-white/5">
        <div className="absolute -bottom-32 -left-32 w-[40rem] h-[40rem] bg-[#ff4d00]/5 blur-[120px] rounded-full" />
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <Reveal>
            <div className="text-center mb-32">
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#ff4d00] mb-8 block">
                The Fire Lab
              </span>
              <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase">
                Elemental{" "}
                <span className="text-[#ff4d00] not-italic">Mastery.</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {PHILOSOPHY.map((s, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="p-16 border border-white/5 bg-white/[0.01] hover:border-[#ff4d00]/30 transition-all group h-full flex flex-col relative overflow-hidden">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-[#ff4d00] mb-10 group-hover:bg-[#ff4d00] group-hover:text-white transition-all duration-500">
                    <s.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-black uppercase italic mb-6 tracking-tighter text-white group-hover:translate-x-2 transition-transform">
                    {s.title}
                  </h3>
                  <p className="text-sm text-white/30 font-light leading-relaxed mb-12 flex-1 tracking-wide uppercase italic leading-loose">
                    {s.desc}
                  </p>
                  <button className="flex items-center gap-4 text-[9px] font-bold uppercase tracking-[0.3em] text-[#ff4d00] group-hover:gap-6 transition-all">
                    Sourcing Integrity <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE CELLAR ── */}
      <section className="py-40 px-6 md:px-12 bg-black">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <Reveal>
            <div className="relative aspect-square rounded-sm overflow-hidden group border border-white/5">
              <Image
                src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200&q=80"
                alt="Wine Cellar"
                fill
                className="object-cover group-hover:scale-110 transition-all duration-[2s] contrast-125 grayscale hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute bottom-16 left-16 text-white">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block text-[#ff4d00]">
                  The Cellar
                </span>
                <h4 className="text-5xl font-black italic uppercase tracking-tighter leading-none">
                  Rare Vintages. <br /> Smoked Pairings.
                </h4>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#ff4d00] mb-8 block">
              The Experience
            </span>
            <h2 className="text-6xl md:text-9xl font-black italic tracking-tighter leading-[0.8] mb-12 uppercase text-white">
              Deep <br />{" "}
              <span className="text-[#ff4d00] not-italic">Immersion.</span>
            </h2>
            <p className="text-white/40 text-xl leading-relaxed mb-16 font-light uppercase tracking-wide italic">
              Beyond the palate. We design sensory journeys that merge the
              primal intensity of wood-smoke with the delicate complexity of
              world-class viticulture.
            </p>
            <div className="grid grid-cols-2 gap-12">
              {[
                { icon: Wine, label: "Cellar_Master", desc: "Rare vintages" },
                {
                  icon: UtensilsCrossed,
                  label: "Private_Chef",
                  desc: "Bespoke menu",
                },
                { icon: Droplets, label: "Dry_Aging", desc: "Internal lab" },
                { icon: Star, label: "Michelin", desc: "2-Star rated" },
              ].map((val, i) => (
                <div key={i} className="space-y-4">
                  <val.icon className="w-6 h-6 text-[#ff4d00]" />
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-white">
                    {val.label}
                  </h4>
                  <p className="text-[10px] font-light text-white/30 uppercase tracking-widest leading-loose">
                    {val.desc}
                  </p>
                </div>
              ))}
            </div>
            <MagneticBtn className="mt-20 px-14 py-6 bg-white text-black text-[10px] font-black uppercase tracking-[0.4em] rounded-full hover:bg-[#ff4d00] hover:text-white transition-all shadow-2xl">
              Request Private Dining
            </MagneticBtn>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#050505] pt-40 pb-16 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-32 mb-40">
          <div className="lg:col-span-6">
            <Reveal>
              <div className="flex flex-col mb-12">
                <span className="text-5xl font-black tracking-[-0.05em] uppercase leading-none italic">
                  Ember
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#ff4d00] -mt-1 ml-1">
                  Grill & Cellar
                </span>
              </div>
              <p className="text-white/20 max-w-md mb-16 text-[11px] font-bold uppercase tracking-[0.2em] leading-loose italic">
                The primal alchemy of wood, fire, and time. An uncompromising
                pursuit of culinary intensity.
              </p>
              <div className="flex gap-6">
                {[Globe, Globe, Mail].map((Icon, i) => (
                  <button
                    key={i}
                    className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:bg-[#ff4d00] hover:text-white hover:border-[#ff4d00] transition-all"
                  >
                    <Icon className="w-5 h-5" />
                  </button>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-black uppercase tracking-widest text-[#ff4d00] mb-12">
              Cuisine
            </h4>
            <ul className="space-y-6 text-[10px] font-bold uppercase tracking-widest text-white/30">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  The_Menu
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Wine_Archive
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Dry_Aging_Program
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Provenance
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-black uppercase tracking-widest text-[#ff4d00] mb-12">
              Experience
            </h4>
            <ul className="space-y-6 text-[10px] font-bold uppercase tracking-widest text-white/30">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Private_Dining
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Chef_Table
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Reservations
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Boutique
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-black uppercase tracking-widest text-[#ff4d00] mb-12">
              Studio
            </h4>
            <ul className="space-y-6 text-[10px] font-bold uppercase tracking-widest text-white/30">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  The_Maison
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Global_Locations
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Press_Kit
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-[1600px] mx-auto pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12 text-[10px] font-bold uppercase tracking-[0.4em] text-white/10">
          <div className="flex items-center gap-12">
            <span>
              &copy; {new Date().getFullYear()} EMBER GRILL & CELLAR GROUP.
            </span>
            <div className="flex gap-8">
              <span>USDA_PRIME_CERTIFIED</span>
              <span>WINE_SPECTATOR_GRAND_AWARD</span>
            </div>
          </div>
          <div className="flex gap-12 font-mono">
            <span>TEMP_22.5C</span>
            <span>SMOKE_DENSITY_NOMINAL</span>
          </div>
        </div>
      </footer>

      <style>{`
        ::-webkit-scrollbar{width:4px;background:#050505}
        ::-webkit-scrollbar-thumb{background:#ff4d00}
      `}</style>
    </div>
  );
}
