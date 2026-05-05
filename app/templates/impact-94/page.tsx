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
import { Flower2, Heart, Star, Sparkles, Mail, Globe, Phone, ShoppingBag, ChevronRight, ArrowRight, X, Menu, Clock, MapPin, Search, Calendar, Award, Leaf, Sun, Wind, Droplets } from "lucide-react";

import "../premium.css";

/* ==========================================================================
   DATA STRUCTURES
   ========================================================================= */

const ARRANGEMENTS = [
  {
    id: 1,
    name: "The Velvet Peony",
    category: "Signature",
    price: "$185",
    desc: "Dutch peonies, ranunculus, and eucalyptus in a hand-blown glass vase.",
    img: "https://images.unsplash.com/photo-1522673607200-1648832cee98?w=800&q=80",
  },
  {
    id: 2,
    name: "Golden Hour Bloom",
    category: "Seasonal",
    price: "$145",
    desc: "A warm palette of garden roses, dried grasses, and amber-toned dahlias.",
    img: "https://images.unsplash.com/photo-1591886760670-71d4242e8626?w=800&q=80",
  },
  {
    id: 3,
    name: "Nocturnal Orchid",
    category: "Luxe",
    price: "$260",
    desc: "Rare black calla lilies, vanda orchids, and dark greenery in obsidian ceramic.",
    img: "https://images.unsplash.com/photo-1563241527-3004b7be0fab?w=800&q=80",
  },
];

const SERVICES = [
  {
    title: "Weekly Subscriptions",
    desc: "Curated seasonal arrangements delivered to your doorstep every Monday.",
    icon: Calendar,
  },
  {
    title: "Event Scenography",
    desc: "Transforming spaces through architectural floral installations and botanical art.",
    icon: Sparkles,
  },
  {
    title: "Bridal Bespoke",
    desc: "One-of-a-kind bridal bouquets and venue design for the modern visionary.",
    icon: Heart,
  },
];

const STATS = [
  { label: "Sourced Globally", value: "32 Countries" },
  { label: "Master Florists", value: "8" },
  { label: "Arrangements Made", value: "20k+" },
  { label: "Same Day Delivery", value: "Guaranteed" },
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

export default function BotanicaFlowersPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<number | null>(null);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div className="premium-theme min-h-screen bg-[#fcf9f6] text-[#332e29] font-serif selection:bg-[#d4a373] selection:text-white overflow-x-hidden">
      {/* ── NAVIGATION ── */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${scrolled ? "bg-white/90 backdrop-blur-xl py-4 border-b border-[#d4a373]/10" : "bg-transparent py-8"}`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="group flex flex-col items-center">
            <span className="text-2xl font-black tracking-tighter uppercase italic text-[#332e29]">
              Botanica
            </span>
            <span className="text-[8px] font-bold uppercase tracking-[0.6em] text-[#d4a373] -mt-1 ml-1">
              Floral Atelier
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-[#332e29]/40">
            {[
              "Seasonal",
              "Subscription",
              "Events",
              "The_Atelier",
              "Bespoke",
            ].map((link) => (
              <Link
                key={link}
                href="#"
                className="hover:text-[#d4a373] transition-colors cursor-pointer"
              >
                {link}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-8">
            <button className="hidden md:flex items-center gap-3 group">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#332e29]/60 group-hover:text-[#d4a373] transition-colors">
                Track_Order
              </span>
              <div className="w-8 h-8 rounded-full border border-[#d4a373]/20 flex items-center justify-center text-[#d4a373] group-hover:bg-[#d4a373] group-hover:text-white transition-all">
                <ShoppingBag className="w-4 h-4" />
              </div>
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden text-[#d4a373]"
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
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            className="fixed inset-0 z-[100] bg-[#fcf9f6] p-12 flex flex-col justify-center gap-10"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-10 right-8 text-[#d4a373]"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="flex flex-col gap-6 text-5xl font-black italic uppercase text-[#332e29]/10">
              {["Seasonal", "Subscription", "Events", "Atelier", "Contact"].map(
                (l) => (
                  <Link
                    key={l}
                    href="#"
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-[#d4a373] transition-colors"
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
            src="https://images.unsplash.com/photo-1522673607200-1648832cee98?w=1600&q=80"
            alt="Floral Masterpiece"
            fill
            className="object-cover opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#fcf9f6] via-[#fcf9f6]/30 to-transparent" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full">
          <Reveal>
            <Badge className="bg-[#d4a373]/10 text-[#d4a373] border border-[#d4a373]/20 text-[10px] font-bold uppercase tracking-[0.5em] mb-10 px-4 py-1.5 rounded-full">
              Seasonal Blooms // Ethical Sourcing
            </Badge>
            <h1 className="text-7xl md:text-[10rem] font-black italic leading-[0.8] tracking-tighter mb-12 text-[#332e29]">
              Arranging <br />{" "}
              <span className="text-[#d4a373] not-italic font-thin font-sans tracking-widest">
                Poetry.
              </span>
            </h1>
            <p className="max-w-md text-lg text-[#332e29]/50 leading-relaxed font-light italic mb-12">
              Bespoke floral architecture for the world's most intimate moments.
              Hand-picked, seasonal, and sustainably grown.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <MagneticBtn className="px-12 py-5 bg-[#332e29] text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded-full hover:bg-[#d4a373] transition-all cursor-pointer">
                The Signature Collection
              </MagneticBtn>
              <Link
                href="#seasonal"
                className="px-12 py-5 border border-[#332e29]/10 text-[#332e29] text-[10px] font-bold uppercase tracking-[0.3em] rounded-full hover:bg-white transition-all flex items-center justify-center gap-3"
              >
                Seasonal Archive <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="absolute bottom-12 right-12 hidden lg:flex flex-col items-end gap-2 text-[#332e29]/20">
          <span className="text-[10px] font-bold uppercase tracking-widest">
            Hand-tied in Provence
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest">
            Biodegradable Packaging
          </span>
        </div>
      </section>

      {/* ── STATS SECTION ── */}
      <section className="py-20 border-y border-[#d4a373]/10 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {STATS.map((stat, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="text-center md:text-left">
                  <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#d4a373] mb-2">
                    {stat.label}
                  </div>
                  <div className="text-4xl font-black italic text-[#332e29]">
                    {stat.value}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SIGNATURE COLLECTION ── */}
      <section id="seasonal" className="py-32 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12 text-center md:text-left">
              <div>
                <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-none mb-6 text-[#332e29] uppercase">
                  The <br /> <span className="text-[#d4a373]">Anthology.</span>
                </h2>
                <p className="text-[#332e29]/30 text-[10px] font-bold uppercase tracking-[0.4em]">
                  Current Seasonal Favorites // Spring 2024
                </p>
              </div>
              <Link
                href="#"
                className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#d4a373] border-b border-[#d4a373] pb-2 hover:text-[#332e29] hover:border-[#332e29] transition-all"
              >
                View Full Menu
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ARRANGEMENTS.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.1}>
                <div
                  className="group space-y-8 cursor-pointer"
                  onMouseEnter={() => setActiveItem(item.id)}
                  onMouseLeave={() => setActiveItem(null)}
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
                    <Image
                      src={item.img}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />

                    <AnimatePresence>
                      {activeItem === item.id && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 flex items-center justify-center bg-white/20 backdrop-blur-sm"
                        >
                          <button className="px-8 py-3 bg-[#332e29] text-white text-[9px] font-black uppercase tracking-widest">
                            Shop Arrangement
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-3xl font-black italic uppercase text-[#332e29]">
                        {item.name}
                      </h3>
                      <span className="text-lg font-black text-[#d4a373]">
                        {item.price}
                      </span>
                    </div>
                    <p className="text-sm text-[#332e29]/40 italic font-light leading-relaxed">
                      {item.desc}
                    </p>
                    <div className="flex items-center gap-6">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-[#d4a373]">
                        {item.category} Edition
                      </span>
                      <div className="h-[1px] flex-1 bg-[#d4a373]/10" />
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE ATELIER SERVICES ── */}
      <section className="py-32 bg-[#1a1a1a] text-white overflow-hidden relative">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#d4a373]/10 blur-[100px] rounded-full" />
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <Reveal>
            <div className="text-center mb-24">
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#d4a373] mb-8 block">
                Our Services
              </span>
              <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase">
                Architectural <span className="text-[#d4a373]">Botany.</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {SERVICES.map((s, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="p-12 border border-white/5 bg-white/[0.02] hover:border-[#d4a373]/30 transition-all group cursor-pointer h-full flex flex-col">
                  <div className="w-14 h-14 rounded-full border border-[#d4a373]/20 flex items-center justify-center text-[#d4a373] mb-8 group-hover:bg-[#d4a373] group-hover:text-black transition-all">
                    <s.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-black italic uppercase mb-4 text-white/90">
                    {s.title}
                  </h3>
                  <p className="text-sm text-white/30 italic font-light leading-relaxed mb-10 flex-1">
                    {s.desc}
                  </p>
                  <button className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-widest text-[#d4a373] group-hover:gap-5 transition-all">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE PHILOSOPHY ── */}
      <section className="py-32 px-6 md:px-12 bg-white">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <Reveal>
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1591886760670-71d4242e8626?w=800&q=80"
                alt="Process"
                fill
                className="object-cover group-hover:scale-105 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-10 left-10 text-white">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] mb-2 block text-[#d4a373]">
                  Ethical Sourcing
                </span>
                <h4 className="text-3xl font-black italic uppercase">
                  From Earth to Vase.
                </h4>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#d4a373] mb-8 block">
              The Philosophy
            </span>
            <h2 className="text-5xl md:text-8xl font-black italic tracking-tighter leading-none mb-10 uppercase text-[#332e29]">
              Soul <br /> <span className="text-[#d4a373]">In Every Stem.</span>
            </h2>
            <p className="text-[#332e29]/40 text-lg leading-relaxed mb-12 italic font-light">
              We don't just arrange flowers; we compose visual symphonies. Every
              stem is inspected for its architectural contribution to the final
              masterpiece.
            </p>
            <div className="grid grid-cols-2 gap-8">
              {[
                { icon: Leaf, label: "Zero_Plastic", desc: "100% compostable" },
                {
                  icon: Droplets,
                  label: "Pure_Nutrients",
                  desc: "Enhanced vitality",
                },
                { icon: Wind, label: "Daily_Import", desc: "Global freshness" },
                { icon: Sun, label: "Regenerative", desc: "Soil health focus" },
              ].map((val, i) => (
                <div key={i} className="space-y-2">
                  <val.icon className="w-5 h-5 text-[#d4a373] mb-4" />
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-[#332e29]">
                    {val.label}
                  </h4>
                  <p className="text-[10px] italic font-light text-[#332e29]/40 uppercase tracking-widest">
                    {val.desc}
                  </p>
                </div>
              ))}
            </div>
            <MagneticBtn className="mt-16 px-12 py-5 border border-[#d4a373] text-[#d4a373] text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-[#d4a373] hover:text-white transition-all">
              Join The Subscription
            </MagneticBtn>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#fcf9f6] pt-32 pb-12 px-6 md:px-12 border-t border-[#d4a373]/10">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-24 mb-32">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="flex flex-col mb-10">
                <span className="text-3xl font-black tracking-tighter uppercase italic text-[#332e29]">
                  Botanica
                </span>
                <span className="text-[9px] font-bold uppercase tracking-[0.7em] text-[#d4a373] -mt-1 ml-1">
                  Floral Atelier
                </span>
              </div>
              <p className="text-[#332e29]/30 max-w-sm mb-12 text-[10px] font-bold uppercase tracking-widest leading-loose italic">
                Bespoke floral architecture. Sourcing from the world's most
                ethical regenerative flower farms.
              </p>
              <div className="flex gap-4">
                {[Globe, Globe, Mail].map((Icon, i) => (
                  <button
                    key={i}
                    className="w-12 h-12 rounded-full border border-[#d4a373]/20 flex items-center justify-center text-[#d4a373] hover:bg-[#d4a373] hover:text-white transition-all"
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-2 lg:col-start-7">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#d4a373] mb-10">
              Shop
            </h4>
            <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-[#332e29]/30">
              <li>
                <Link
                  href="#"
                  className="hover:text-[#d4a373] transition-colors"
                >
                  Seasonal_Bunches
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#d4a373] transition-colors"
                >
                  Luxe_Vases
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#d4a373] transition-colors"
                >
                  Gift_Cards
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#d4a373] transition-colors"
                >
                  Floral_Tools
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#d4a373] mb-10">
              Services
            </h4>
            <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-[#332e29]/30">
              <li>
                <Link
                  href="#"
                  className="hover:text-[#d4a373] transition-colors"
                >
                  Subscription
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#d4a373] transition-colors"
                >
                  Wedding_Design
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#d4a373] transition-colors"
                >
                  Corporate_Bloom
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#d4a373] transition-colors"
                >
                  Workshops
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#d4a373] mb-10">
              House
            </h4>
            <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-[#332e29]/30">
              <li>
                <Link
                  href="#"
                  className="hover:text-[#d4a373] transition-colors"
                >
                  Our_Story
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#d4a373] transition-colors"
                >
                  Sustainability
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#d4a373] transition-colors"
                >
                  Ateliers
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#d4a373] transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto pt-10 border-t border-[#d4a373]/10 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] font-bold uppercase tracking-widest text-[#332e29]/20">
          <div className="flex items-center gap-10">
            <span>&copy; {new Date().getFullYear()} BOTANICA ATELIER.</span>
            <div className="flex gap-6">
              <span>Sustainable Sourcing Cert V2.1</span>
              <span>Ethical Trading Initiative</span>
            </div>
          </div>
          <div className="flex gap-10 font-mono">
            <span>BLOOM_INDEX_4.2</span>
            <span>SECURE_DATA_ARCHIVE</span>
          </div>
        </div>
      </footer>

      <style>{`
        ::-webkit-scrollbar{width:4px;background:#fcf9f6}
        ::-webkit-scrollbar-thumb{background:#d4a373}
      `}</style>
    </div>
  );
}
