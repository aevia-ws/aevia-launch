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
import { ArrowRight, ArrowUpRight, Star, Check, Menu, X, Globe, Clock, Quote, Search, ShoppingBag, Heart, Scissors, Ruler, Palette, Layers, Camera, MapPin, Phone, Mail, ChevronDown, Plus, Minus } from "lucide-react";

import "../premium.css";

/* ==========================================================================
   DATA STRUCTURES
   ========================================================================= */

const COLLECTIONS = [
  {
    id: 1,
    name: "Éclat de Sable",
    season: "SS 2026",
    type: "Ready-to-Wear",
    price: "€ 1,240",
    img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=80",
    tag: "New Arrival",
    desc: "A structural linen coat inspired by the moving light of the Normandy coast.",
  },
  {
    id: 2,
    name: "Brume de Lin",
    season: "SS 2026",
    type: "Tailoring",
    price: "€ 2,180",
    img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=80",
    tag: "Bestseller",
    desc: "Precision tailoring in Italian virgin wool with hand-stitched silk lapels.",
  },
  {
    id: 3,
    name: "Voile d'Ivoire",
    season: "SS 2026",
    type: "Eveningwear",
    price: "€ 3,950",
    img: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=1200&q=80",
    tag: "Limited Edition",
    desc: "A floor-length gown in recycled silk crepe, limited to 50 numbered pieces.",
  },
  {
    id: 4,
    name: "Grain de Sel",
    season: "SS 2026",
    type: "Accessories",
    price: "€ 680",
    img: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1200&q=80",
    tag: "Exclusive",
    desc: "Hand-crafted leather tote featuring our signature raw-edge finishing.",
  },
];

const FABRICS = [
  {
    name: "Recycled Crepe de Chine",
    origin: "Lake Como, Italy",
    property: "Zero-water dyeing process",
    cert: "GRS Certified",
  },
  {
    name: "Organic Normandy Linen",
    origin: "Caen, France",
    property: "Carbon-neutral cultivation",
    cert: "Masters of Linen",
  },
  {
    name: "Virgin Merino Wool",
    origin: "Biella, Italy",
    property: "Mulesing-free ethical sourcing",
    cert: "RWS Standard",
  },
];

const FLAGSHIPS = [
  {
    city: "Paris",
    street: "8 Rue de l'Amiral",
    contact: "+33 1 47 20 00 00",
    hours: "Mon–Sat: 10h–19h",
  },
  {
    city: "London",
    street: "22 Savile Row",
    contact: "+44 20 7434 2000",
    hours: "Mon–Sat: 10h–18h",
  },
  {
    city: "Tokyo",
    street: "Minami-Aoyama 5-11",
    contact: "+81 3 5468 0000",
    hours: "Daily: 11h–20h",
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

export default function AtelierMarePage() {
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
      className="premium-theme min-h-screen bg-[#f7f4ef] text-[#1a1814] font-sans selection:bg-[#1a1814] selection:text-[#f7f4ef] overflow-x-hidden"
      style={{ scrollBehavior: "smooth" }}
    >
      {/* ==========================================
          NAVIGATION
          ========================================== */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-1000 ${scrolled ? "bg-[#f7f4ef]/95 backdrop-blur-md py-4 border-b border-[#1a1814]/5 shadow-sm" : "bg-transparent py-10"}`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="flex flex-col items-center">
            <span className="text-[10px] md:text-[12px] font-light uppercase tracking-[0.6em] text-[#1a1814]/40 mb-1">
              Atelier
            </span>
            <span className="text-xl md:text-3xl font-light tracking-[0.4em] uppercase">
              MARÉ
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-[#1a1814]/30">
            <Link
              href="#collections"
              className="hover:text-[#1a1814] transition-colors"
            >
              Collections
            </Link>
            <Link
              href="#atelier"
              className="hover:text-[#1a1814] transition-colors"
            >
              The_Atelier
            </Link>
            <Link
              href="#world"
              className="hover:text-[#1a1814] transition-colors"
            >
              World_Of_Mare
            </Link>
            <Link
              href="#contact"
              className="hover:text-[#1a1814] transition-colors"
            >
              Stockists
            </Link>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#1a1814]/20">
              <Globe className="w-3.5 h-3.5" />
              <span>EN / EU</span>
            </div>
            <MagneticBtn className="p-3 border border-[#1a1814]/10 rounded-full hover:bg-[#1a1814] hover:text-white transition-all shadow-xl">
              <ShoppingBag className="w-4 h-4" />
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
            className="fixed inset-0 z-[100] bg-[#f7f4ef] p-8 pt-32 flex flex-col border-l border-black/5"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-10 right-8"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="flex flex-col gap-10 text-5xl font-light tracking-tighter uppercase italic">
              <Link href="#collections" onClick={() => setMenuOpen(false)}>
                Collections
              </Link>
              <Link href="#atelier" onClick={() => setMenuOpen(false)}>
                Atelier
              </Link>
              <Link href="#world" onClick={() => setMenuOpen(false)}>
                World
              </Link>
              <Link href="#contact" onClick={() => setMenuOpen(false)}>
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==========================================
          1. HERO (Editorial Fashion)
          ========================================== */}
      <section
        ref={heroRef}
        className="relative w-full h-[100svh] flex flex-col justify-end overflow-hidden pb-32"
      >
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="https://images.unsplash.com/photo-1629236?w=1600&q=80"
            alt="Fashion Hero"
            fill
            className="object-cover object-top brightness-90 grayscale-[20%]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f7f4ef] via-[#f7f4ef]/30 to-transparent" />
        </motion.div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full">
          <Reveal>
            <h1 className="text-7xl md:text-9xl lg:text-[11rem] font-light leading-[0.8] tracking-tighter mb-12">
              Éclat <br />{" "}
              <span className="italic font-normal text-[#1a1814]/40">
                de Lumière.
              </span>
            </h1>
            <p className="max-w-xl text-lg md:text-xl text-[#1a1814]/40 leading-relaxed font-light mb-12 italic">
              Spring-Summer 2026. A structural dialogue between organic linen
              and the morning light of the Normandy coast.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <MagneticBtn className="px-12 py-5 bg-[#1a1814] text-white text-[10px] font-bold uppercase tracking-[0.4em] rounded hover:bg-[#2d2820] transition-all cursor-pointer shadow-2xl">
                Shop SS26
              </MagneticBtn>
              <button className="px-12 py-5 border border-[#1a1814]/10 text-[#1a1814] text-[10px] font-bold uppercase tracking-[0.4em] rounded hover:bg-white transition-all cursor-pointer">
                The Editorial
              </button>
            </div>
          </Reveal>
        </div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute bottom-10 right-12 hidden md:block"
        >
          <div className="flex flex-col items-end gap-3">
            <span className="text-[9px] font-bold text-[#1a1814]/20 uppercase tracking-[0.5em]">
              Lyon // Paris // Milan
            </span>
            <div className="w-24 h-[1px] bg-[#1a1814]/10" />
          </div>
        </motion.div>
      </section>

      {/* ==========================================
          2. COLLECTIONS (Minimalist Grid)
          ========================================== */}
      <section
        id="collections"
        className="py-32 bg-[#f7f4ef] border-y border-[#1a1814]/5"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
            <Reveal>
              <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-[#1a1814]/40 mb-6 block">
                Selection SS26
              </span>
              <h2 className="text-5xl md:text-8xl font-light tracking-tighter uppercase leading-[0.9]">
                The <br />{" "}
                <span className="italic text-[#1a1814]/30">Pieces.</span>
              </h2>
            </Reveal>
            <p className="max-w-xs text-[10px] font-bold uppercase tracking-widest text-[#1a1814]/30 leading-relaxed italic">
              Every garment is limited to 200 units, crafted by hand in our Lyon
              workshop using only traceable organic textiles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {COLLECTIONS.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.1}>
                <div
                  onClick={() => setActiveProduct(i)}
                  className="group cursor-pointer bg-white p-2 rounded shadow-sm border border-[#1a1814]/5 hover:shadow-2xl transition-all"
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded mb-6">
                    <Image
                      src={item.img}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-1000"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-white text-[9px] font-bold uppercase tracking-widest shadow-sm">
                      {item.tag}
                    </div>
                    <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur rounded-full text-[#1a1814]/40 hover:text-red-500 transition-colors">
                      <Heart className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="px-4 pb-4">
                    <div className="text-[9px] uppercase tracking-[0.3em] text-[#1a1814]/20 mb-2">
                      {item.type}
                    </div>
                    <h3 className="text-xl font-light tracking-tight mb-2 group-hover:text-[#1a1814]/60 transition-colors">
                      {item.name}
                    </h3>
                    <span className="text-sm font-bold text-[#1a1814]">
                      {item.price}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          3. THE FABRIC ARCHIVE (Tracing Origins)
          ========================================== */}
      <section className="py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <Reveal className="relative aspect-square md:aspect-[4/5] rounded overflow-hidden group shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1200&q=80"
                alt="Fabric Detail"
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-[#1a1814]/5 mix-blend-multiply" />
              <div className="absolute inset-0 p-12 flex flex-col justify-end">
                <div className="bg-white/95 backdrop-blur-md p-10 shadow-2xl border border-black/5">
                  <h3 className="text-3xl font-light italic mb-6 text-[#1a1814] uppercase tracking-tighter">
                    The Archive.
                  </h3>
                  <div className="space-y-6">
                    {FABRICS.map((f, i) => (
                      <div
                        key={i}
                        className="border-b border-black/5 pb-4 last:border-0"
                      >
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-[#1a1814] mb-1">
                          <span>{f.name}</span>
                          <span className="text-[#1a1814]/30">{f.cert}</span>
                        </div>
                        <p className="text-[9px] font-bold uppercase tracking-widest text-[#1a1814]/40">
                          {f.origin} // {f.property}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            <div>
              <Reveal>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#1a1814]/40 mb-6 block">
                  Transparency Protocol
                </span>
                <h2 className="text-5xl md:text-7xl font-light tracking-tighter leading-tight mb-12 uppercase">
                  Grown <br /> <span className="italic">to Wear.</span>
                </h2>
                <p className="text-lg text-[#1a1814]/40 leading-relaxed font-light mb-16 italic max-w-lg">
                  We trace every fiber back to its soil. Our SS26 collection
                  utilizes Normandy linen cultivated under carbon-neutral
                  standards, woven in a family-run mill in Caen.
                </p>

                <div className="grid grid-cols-2 gap-8 mb-16">
                  {[
                    { label: "Traceable_Units", val: 100, suffix: "%" },
                    { label: "Organic_Mass", val: 92, suffix: "%" },
                    { label: "Water_Neutrality", val: 2024, prefix: "Est " },
                    { label: "Atelier_Units", val: 200, prefix: "Max " },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="flex flex-col gap-2 p-8 border border-black/5 bg-[#f7f4ef]/50 hover:bg-white hover:border-[#1a1814]/20 transition-all"
                    >
                      <div className="text-4xl font-light text-[#1a1814]">
                        <Counter
                          to={stat.val}
                          prefix={stat.prefix}
                          suffix={stat.suffix}
                        />
                      </div>
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#1a1814]/30">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
                <button className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-[#1a1814] hover:text-[#1a1814]/60 transition-colors">
                  View_Sourcing_Manifesto <ArrowRight className="w-4 h-4" />
                </button>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          4. THE ATELIER (Craftsmanship Matrix)
          ========================================== */}
      <section
        id="atelier"
        className="py-32 bg-[#f7f4ef] border-y border-[#1a1814]/5"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <Reveal>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#1a1814]/40 mb-6 block">
                  The Manual Era
                </span>
                <h2 className="text-5xl md:text-8xl font-light tracking-tighter leading-tight mb-12 uppercase">
                  Craft as <br /> <span className="italic">Conviction.</span>
                </h2>
                <p className="text-lg text-[#1a1814]/30 leading-relaxed font-light mb-12 italic">
                  MARÉ is built on the belief that fashion is at its most
                  beautiful when it is also at its most considered.
                </p>

                <div className="space-y-6">
                  {[
                    {
                      title: "Precision Patterning",
                      icon: <Ruler className="w-4 h-4" />,
                      prog: 100,
                    },
                    {
                      title: "Manual Extraction",
                      icon: <Scissors className="w-4 h-4" />,
                      prog: 100,
                    },
                    {
                      title: "Hand-Stitched Finish",
                      icon: <Palette className="w-4 h-4" />,
                      prog: 100,
                    },
                    {
                      title: "Quality Authentication",
                      icon: <Layers className="w-4 h-4" />,
                      prog: 100,
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="p-8 border border-black/5 bg-white/50"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="text-[#1a1814]/30">{item.icon}</div>
                          <span className="text-[10px] font-bold uppercase tracking-widest">
                            {item.title}
                          </span>
                        </div>
                        <span className="text-[10px] font-bold text-[#1a1814]/20">
                          STEP_0{i + 1}
                        </span>
                      </div>
                      <Progress
                        value={item.prog}
                        className="h-0.5 bg-black/[0.05] [&>div]:bg-[#1a1814]/20"
                      />
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2">
              <Reveal className="relative aspect-square md:aspect-[16/9] rounded overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&q=80"
                  alt="Atelier Work"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[#1a1814]/10 mix-blend-overlay" />
                <div className="absolute bottom-10 right-10 flex gap-4">
                  <div className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest">
                    Est. 2024
                  </div>
                  <div className="px-6 py-3 bg-[#1a1814] text-white text-[10px] font-bold uppercase tracking-widest shadow-xl">
                    Lyon Atelier
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          5. PRESS & MEDIA (Editorial)
          ========================================== */}
      <section id="world" className="py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <Reveal className="max-w-2xl mx-auto mb-20">
            <span className="text-[10px] uppercase tracking-[0.5em] font-black text-[#1a1814]/30 mb-6 block">
              The Perspective
            </span>
            <h2 className="text-5xl md:text-7xl font-light tracking-tighter uppercase italic mb-8">
              World of Maré.
            </h2>
            <p className="text-[#1a1814]/40 italic font-medium leading-relaxed">
              A structural exploration of space and garment through the lens of
              modern minimalism.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {[
              "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80",
              "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1200&q=80",
              "https://images.unsplash.com/photo-1629236?w=1200&q=80",
            ].map((src, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="relative aspect-[3/4] overflow-hidden group border border-black/5">
                  <Image
                    src={src}
                    alt={`Editorial ${i + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-[#1a1814]/0 group-hover:bg-[#1a1814]/20 transition-colors" />
                  <div className="absolute bottom-8 left-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] font-bold text-white uppercase tracking-widest">
                      Look_0{i + 1}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          6. STOCKISTS (Locator)
          ========================================== */}
      <section id="contact" className="py-32 bg-[#f7f4ef]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
            <div className="lg:col-span-4">
              <Reveal>
                <span className="text-[10px] uppercase tracking-[0.5em] font-black text-[#1a1814]/30 mb-6 block">
                  Global Presence
                </span>
                <h2 className="text-5xl font-light tracking-tighter uppercase italic mb-8">
                  Stockists.
                </h2>
                <p className="text-[#1a1814]/40 italic font-medium leading-relaxed mb-12">
                  Visit our flagship boutiques for a personalized atelier
                  experience.
                </p>
                <button className="w-full py-5 border border-[#1a1814]/10 text-[#1a1814] text-[10px] font-bold uppercase tracking-widest hover:bg-[#1a1814] hover:text-white transition-all cursor-pointer">
                  Book_Atelier_Visit
                </button>
              </Reveal>
            </div>

            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {FLAGSHIPS.map((shop, i) => (
                  <Reveal key={i} delay={i * 0.1}>
                    <div className="p-10 bg-white border border-black/[0.03] group hover:shadow-2xl transition-all">
                      <div className="flex justify-between items-start mb-10">
                        <h3 className="text-3xl font-light tracking-tighter uppercase italic group-hover:text-[#1a1814]/40 transition-colors">
                          {shop.city}
                        </h3>
                        <MapPin className="w-4 h-4 text-[#1a1814]/20 group-hover:text-[#1a1814] transition-colors" />
                      </div>
                      <div className="space-y-4 mb-10">
                        <p className="text-[11px] font-bold uppercase tracking-widest text-[#1a1814]/60">
                          {shop.street}
                        </p>
                        <p className="text-[11px] font-bold uppercase tracking-widest text-[#1a1814]/60">
                          {shop.contact}
                        </p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#1a1814]/30 italic">
                          {shop.hours}
                        </p>
                      </div>
                      <button className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] hover:text-[#1a1814] transition-colors">
                        Get_Directions <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          7. FAQ (Accordion)
          ========================================== */}
      <section className="py-32 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-light tracking-tighter leading-none uppercase italic">
              Intel_Buffer
            </h2>
          </Reveal>

          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                q: "Where are your garments produced?",
                a: "Every piece is crafted in our atelier in Lyon, France, and in a network of family-run Italian workshops.",
              },
              {
                q: "What is your sustainability approach?",
                a: "We source exclusively from certified organic and recycled fabric suppliers. Packaging is 100% compostable.",
              },
              {
                q: "Do you offer made-to-measure?",
                a: "Our Atelier Service offers bespoke tailoring for all ready-to-wear shapes. Appointments available in major hubs.",
              },
              {
                q: "What is the return policy?",
                a: "We offer free returns within 30 days of delivery, with complimentary alteration on full-price purchases.",
              },
            ].map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b border-black/[0.05]"
              >
                <AccordionTrigger className="text-left text-sm uppercase font-bold tracking-widest py-8 hover:text-[#1a1814]/60 hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-[#1a1814]/30 leading-relaxed font-bold uppercase tracking-widest pb-8 italic">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ==========================================
          8. MEGA FOOTER (Premium Minimal)
          ========================================== */}
      <footer className="bg-[#f7f4ef] pt-32 pb-12 px-6 md:px-12 border-t border-black/5 relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-32">
            <div className="lg:col-span-5">
              <Reveal>
                <div className="flex flex-col mb-10">
                  <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-[#1a1814]/40 mb-1">
                    Atelier
                  </span>
                  <span className="text-2xl font-light tracking-[0.4em] uppercase">
                    MARÉ
                  </span>
                </div>
                <p className="text-[#1a1814]/20 max-w-sm mb-12 uppercase tracking-widest text-[10px] font-bold leading-relaxed italic">
                  Advancing the manual era through architectural garment
                  exploration and organic material mastery.
                </p>
                <form
                  className="relative max-w-md"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="email"
                    placeholder="AUTHENTICATE_EMAIL"
                    className="w-full bg-white border border-black/5 rounded-none px-6 py-4 text-xs font-bold outline-none focus:border-[#1a1814] text-[#1a1814] transition-all uppercase tracking-widest"
                  />
                  <button
                    type="submit"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-[#1a1814] hover:text-[#1a1814]/60 transition-colors uppercase tracking-[0.3em]"
                  >
                    ENROLL
                  </button>
                </form>
              </Reveal>
            </div>

            <div className="lg:col-span-2 lg:col-start-7">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#1a1814]/40 mb-10">
                Collections
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-[#1a1814]/20">
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#1a1814] transition-colors"
                  >
                    SS26_Ready_To_Wear
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#1a1814] transition-colors"
                  >
                    Atelier_Tailoring
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#1a1814] transition-colors"
                  >
                    Recycled_Silk_Series
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#1a1814] transition-colors"
                  >
                    Seasonal_Archives
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#1a1814]/40 mb-10">
                The_Atelier
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-[#1a1814]/20">
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#1a1814] transition-colors"
                  >
                    Sourcing_Manifesto
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#1a1814] transition-colors"
                  >
                    Craft_Matrix
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#1a1814] transition-colors"
                  >
                    Repair_Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#1a1814] transition-colors"
                  >
                    Atelier_Appointments
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#1a1814]/40 mb-10">
                Network
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-[#1a1814]/20">
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#1a1814] transition-colors flex items-center gap-3"
                  >
                    <Globe className="w-3 h-3" /> Globe
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#1a1814] transition-colors flex items-center gap-3"
                  >
                    <Globe className="w-3 h-3" /> X_Protocol
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#1a1814] transition-colors flex items-center gap-3"
                  >
                    <Mail className="w-3 h-3" /> Press_Buffer
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-10 border-t border-black/5 text-[9px] font-bold uppercase tracking-widest text-[#1a1814]/10">
            <div className="flex items-center gap-10">
              <span>&copy; {new Date().getFullYear()} Atelier Maré SAS.</span>
              <Link href="#" className="hover:text-[#1a1814] transition-colors">
                Legal_Protocols
              </Link>
              <Link href="#" className="hover:text-[#1a1814] transition-colors">
                Privacy_Buffer
              </Link>
            </div>
            <div className="flex gap-10">
              <span>Lyon // Paris // Milan</span>
              <span>Worn with Intention</span>
            </div>
          </div>
        </div>
      </footer>

      {/* PRODUCT MODAL */}
      <AnimatePresence>
        {activeProduct !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-[#1a1814]/80 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setActiveProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="bg-[#f7f4ef] border border-black/5 max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveProduct(null)}
                className="absolute top-8 right-8 text-[#1a1814]/20 hover:text-[#1a1814] transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="relative aspect-square md:aspect-auto">
                <Image
                  src={COLLECTIONS[activeProduct].img}
                  alt="Product"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-12 flex flex-col justify-between bg-white">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-[#1a1814]/30 font-bold mb-4">
                    {COLLECTIONS[activeProduct].season} //{" "}
                    {COLLECTIONS[activeProduct].type}
                  </div>
                  <h3 className="text-4xl font-light uppercase tracking-tighter italic text-[#1a1814] mb-6 leading-none">
                    {COLLECTIONS[activeProduct].name}
                  </h3>
                  <p className="text-sm text-[#1a1814]/40 leading-relaxed font-bold mb-10 italic">
                    "{COLLECTIONS[activeProduct].desc}"
                  </p>

                  <div className="grid grid-cols-1 gap-4 mb-10">
                    {[
                      { l: "Composition", v: "72% Organic Linen, 28% Silk" },
                      { l: "Origin", v: "Lyon, France" },
                      { l: "Care", v: "Dry Clean Only" },
                    ].map((spec, i) => (
                      <div
                        key={i}
                        className="flex justify-between text-xs border-b border-black/5 pb-2"
                      >
                        <span className="uppercase tracking-widest text-[#1a1814]/20 font-bold">
                          {spec.l}
                        </span>
                        <span className="font-bold text-[#1a1814]/60">
                          {spec.v}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <button className="w-full py-5 bg-[#1a1814] text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#2d2820] transition-all cursor-pointer">
                    Add_To_Bag — {COLLECTIONS[activeProduct].price}
                  </button>
                  <button className="w-full py-5 border border-black/10 text-[#1a1814] text-[10px] font-bold uppercase tracking-widest hover:bg-[#f7f4ef] transition-all cursor-pointer">
                    Save_To_Wishlist
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`::-webkit-scrollbar{width:4px;background:#f7f4ef}::-webkit-scrollbar-thumb{background:#1a181410}`}</style>
    </div>
  );
}
