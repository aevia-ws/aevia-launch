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
import { Sparkles, Heart, Star, Check, Menu, X, Globe, Clock, Quote, Search, ShoppingBag, Leaf, Wind, Droplets, Sun, Moon, Activity, Mail, MapPin, Phone, Plus, ArrowRight, ArrowUpRight, ChevronRight, Camera, Scissors, Gift, ShieldCheck } from "lucide-react";

import "../premium.css";

/* ==========================================================================
   DATA STRUCTURES
   ========================================================================= */

const SERVICES = [
  {
    id: "nails",
    title: "Nail Artistry",
    items: [
      { name: "Russian Manicure", price: "€75", duration: "90 min" },
      { name: "Gel Extensions", price: "€95", duration: "120 min" },
      { name: "Signature Nail Art", price: "from €20", duration: "+30 min" },
      { name: "Spa Pedicure", price: "€65", duration: "60 min" },
    ],
    img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80",
  },
  {
    id: "lashes",
    title: "Lash & Brow",
    items: [
      { name: "Volume Lash Set", price: "€120", duration: "150 min" },
      { name: "Lash Lift & Tint", price: "€85", duration: "60 min" },
      { name: "Brow Lamination", price: "€70", duration: "45 min" },
      { name: "Microblading", price: "€350", duration: "180 min" },
    ],
    img: "https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=800&q=80",
  },
  {
    id: "facials",
    title: "Aesthetics",
    items: [
      { name: "HydraFacial Pro", price: "€150", duration: "60 min" },
      { name: "Chemical Peel", price: "€110", duration: "45 min" },
      { name: "Microneedling", price: "€200", duration: "90 min" },
      { name: "Dermaplaning", price: "€90", duration: "45 min" },
    ],
    img: "https://images.unsplash.com/photo-1570172619274-d39d968f9b97?w=800&q=80",
  },
];

const STYLISTS = [
  {
    name: "Sasha Vane",
    role: "Master Nail Artist",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
  },
  {
    name: "Elena Rossi",
    role: "Lash Architect",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
  },
  {
    name: "Julian Pierce",
    role: "Aesthetic Specialist",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
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

export default function LuminaBeautyPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("nails");

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="premium-theme min-h-screen bg-[#fffcf9] text-[#2d2a26] font-sans selection:bg-[#f3e8ff] selection:text-[#7c3aed] overflow-x-hidden"
      style={{ scrollBehavior: "smooth" }}
    >
      {/* ==========================================
          NAVIGATION
          ========================================== */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-1000 ${scrolled ? "bg-[#fffcf9]/95 backdrop-blur-md py-4 border-b border-purple-100 shadow-sm" : "bg-transparent py-10"}`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="flex flex-col items-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-purple-400 mb-1">
              Aesthetic.
            </span>
            <span className="text-xl md:text-2xl font-light tracking-[0.4em] uppercase text-[#2d2a26]">
              LUMINA<span className="text-purple-600">BEAUTY</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">
            <Link
              href="#rituals"
              className="hover:text-purple-600 transition-colors"
            >
              Rituals
            </Link>
            <Link
              href="#services"
              className="hover:text-purple-600 transition-colors"
            >
              Menu
            </Link>
            <Link
              href="#stylists"
              className="hover:text-purple-600 transition-colors"
            >
              Artists
            </Link>
            <Link
              href="#boutique"
              className="hover:text-purple-600 transition-colors"
            >
              Shop
            </Link>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden xl:flex flex-col items-end">
              <span className="text-[9px] font-bold text-stone-300 uppercase tracking-widest">
                Next Opening
              </span>
              <span className="text-[11px] font-bold text-purple-600 flex items-center gap-1">
                TOMORROW 09:00 <Clock className="w-3 h-3" />
              </span>
            </div>
            <MagneticBtn className="px-8 py-3 bg-[#2d2a26] text-[#fffcf9] text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-purple-600 transition-all">
              BOOK_NOW
            </MagneticBtn>
            <button onClick={() => setMenuOpen(true)} className="lg:hidden">
              <Menu className="w-6 h-6 text-stone-500" />
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
            className="fixed inset-0 z-[100] bg-[#fffcf9] p-8 pt-32 flex flex-col border-l border-purple-100"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-10 right-8 text-stone-400"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="flex flex-col gap-10 text-5xl font-light tracking-tighter uppercase italic text-stone-300">
              <Link href="#rituals" onClick={() => setMenuOpen(false)}>
                Rituals
              </Link>
              <Link href="#services" onClick={() => setMenuOpen(false)}>
                Menu
              </Link>
              <Link href="#stylists" onClick={() => setMenuOpen(false)}>
                Artists
              </Link>
              <Link href="#boutique" onClick={() => setMenuOpen(false)}>
                Shop
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==========================================
          1. HERO (Luxury Beauty)
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
            src="https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1600&q=80"
            alt="Beauty Hero"
            fill
            className="object-cover opacity-20 grayscale-[0.3]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#fffcf9] via-transparent to-[#fffcf9]" />
        </motion.div>

        {/* SOFT RADIANT GLOWS */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-100/40 rounded-full blur-[150px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-rose-100/30 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full">
          <Reveal>
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-purple-50/50 backdrop-blur-md rounded-full border border-purple-100 text-purple-600 text-[10px] font-bold uppercase tracking-widest mb-10 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              Voted Best Aesthetic Studio 2026
            </div>
            <h1 className="text-7xl md:text-9xl lg:text-[11rem] font-light leading-[0.8] tracking-tighter mb-12 uppercase italic text-[#2d2a26]">
              Radiate <br />{" "}
              <span className="text-purple-600 not-italic">Elegance.</span>
            </h1>
            <p className="max-w-xl text-lg md:text-xl text-stone-400 leading-relaxed font-light mb-12 italic tracking-tight">
              Precision nail artistry, bespoke lash architectures, and advanced
              clinical aesthetics. A private sanctuary for the modern
              silhouette.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <MagneticBtn className="px-12 py-5 bg-[#2d2a26] text-[#fffcf9] text-[10px] font-bold uppercase tracking-[0.4em] rounded-full hover:bg-purple-600 transition-all cursor-pointer shadow-2xl">
                Book Your Ritual
              </MagneticBtn>
              <button className="px-12 py-5 border border-purple-100 text-purple-400 text-[10px] font-bold uppercase tracking-[0.4em] rounded-full hover:bg-purple-50 transition-all cursor-pointer">
                View_Lookbook
              </button>
            </div>
          </Reveal>
        </div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute bottom-10 right-12 hidden md:block"
        >
          <div className="flex flex-col items-end gap-3 text-right">
            <span className="text-[9px] font-bold text-stone-300 uppercase tracking-[0.5em]">
              PARIS // MILAN // LONDON
            </span>
            <div className="w-32 h-[1px] bg-purple-200" />
          </div>
        </motion.div>
      </section>

      {/* ==========================================
          2. THE RITUAL (Process)
          ========================================== */}
      <section
        id="rituals"
        className="py-32 bg-[#fffcf9] border-y border-purple-100/50"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-32 items-center">
            <div className="lg:col-span-5">
              <Reveal>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-purple-600 mb-6 block">
                  The Lumina Method
                </span>
                <h2 className="text-5xl md:text-7xl font-light tracking-tighter leading-tight mb-12 text-[#2d2a26] uppercase italic">
                  Bespoke <br />{" "}
                  <span className="text-purple-600 not-italic">Curation.</span>
                </h2>
                <p className="text-lg text-stone-400 leading-relaxed font-light mb-16 uppercase tracking-tight italic">
                  Nous croyons que la beauté est une science de la précision.
                  Chaque traitement commence par une analyse structurelle pour
                  garantir un résultat harmonieux et durable.
                </p>

                <div className="space-y-10">
                  {[
                    {
                      label: "Client Satisfaction",
                      val: 99,
                      suffix: "%",
                      desc: "Consistency is our signature. Our return rate speaks for our obsession with detail.",
                    },
                    {
                      label: "Organic Formulations",
                      val: 100,
                      suffix: "%",
                      desc: "We only use medical-grade, cruelty-free, and ethically sourced products.",
                    },
                    {
                      label: "Annual Rituals",
                      val: 12000,
                      suffix: "+",
                      desc: "Over twelve thousand transformations performed since our opening.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="group border-l border-purple-100 pl-8 hover:border-purple-600 transition-all"
                    >
                      <h4 className="text-sm font-bold uppercase tracking-tight mb-2 text-stone-500">
                        {item.label}
                      </h4>
                      <div className="text-3xl font-black text-purple-600 mb-2 uppercase italic tabular-nums">
                        <Counter to={item.val} suffix={item.suffix} />
                      </div>
                      <p className="text-[10px] text-stone-300 leading-relaxed font-bold uppercase tracking-widest">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Reveal className="relative aspect-[4/5] md:aspect-video rounded-3xl overflow-hidden shadow-2xl border border-purple-100 bg-white p-1 group">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.05)_0%,transparent_70%)] animate-pulse" />
                <div className="relative h-full w-full border border-purple-50 bg-[#fffcf9] p-8 flex flex-col justify-between overflow-hidden">
                  <div className="flex items-center justify-between mb-10 pb-6 border-b border-purple-100">
                    <div className="flex items-center gap-4">
                      <Scissors className="w-5 h-5 text-purple-600" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-purple-600">
                        Studio_Sterilization_Log
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-600 rounded-full animate-pulse" />
                      <div className="w-1.5 h-1.5 bg-purple-600/30 rounded-full" />
                    </div>
                  </div>

                  <div className="space-y-6">
                    {[
                      {
                        label: "Tool Hygiene",
                        val: "Autoclave Grade",
                        icon: <Check className="w-4 h-4" />,
                      },
                      {
                        label: "Air Filtration",
                        val: "HEPA-13 Plasma",
                        icon: <Wind className="w-4 h-4" />,
                      },
                      {
                        label: "Surface Protocol",
                        val: "Medical Shield",
                        icon: <ShieldCheck className="w-4 h-4" />,
                      },
                      {
                        label: "Lighting",
                        val: "CRI 98 Studio",
                        icon: <Sun className="w-4 h-4" />,
                      },
                    ].map((spec, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-4 bg-white/50 border border-purple-100/30 rounded-xl hover:border-purple-600/30 transition-all"
                      >
                        <div className="flex items-center gap-4">
                          <div className="text-purple-600">{spec.icon}</div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-stone-500">
                            {spec.label}
                          </span>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-purple-600 italic">
                          {spec.val}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-12 flex justify-between items-end">
                    <div className="space-y-1">
                      <span className="text-[9px] font-bold text-stone-300 uppercase tracking-widest">
                        Current Studio Tempo
                      </span>
                      <div className="text-2xl font-black text-stone-500 italic">
                        8 Artists Active
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="flex flex-col items-end">
                        <span className="text-[8px] font-bold text-purple-600 uppercase">
                          Certified
                        </span>
                        <span className="text-[10px] font-black uppercase text-stone-500">
                          Master Academy
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          3. SERVICE MENU (Menu)
          ========================================== */}
      <section id="services" className="py-32 bg-[#fffcf9]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
            <Reveal>
              <h2 className="text-5xl md:text-8xl font-light tracking-tighter uppercase leading-[0.9] text-[#2d2a26] italic">
                Service <br />{" "}
                <span className="text-purple-600 not-italic">Menu.</span>
              </h2>
            </Reveal>
            <p className="max-w-sm text-sm text-stone-400 leading-relaxed font-bold uppercase tracking-widest italic text-right">
              Explore our curated selection of high-fidelity treatments. Each
              ritual is customizable to your specific biology.
            </p>
          </div>

          <Tabs defaultValue="nails" className="w-full">
            <TabsList className="flex gap-8 mb-16 border-b border-purple-100 w-full overflow-x-auto pb-4 scrollbar-hide">
              {SERVICES.map((s) => (
                <TabsTrigger
                  key={s.id}
                  value={s.id}
                  className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-300 data-[state=active]:text-purple-600 transition-colors pb-4 border-b-2 border-transparent data-[state=active]:border-purple-600 rounded-none bg-transparent shadow-none"
                >
                  {s.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {SERVICES.map((s) => (
              <TabsContent key={s.id} value={s.id}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-start">
                  <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-purple-100">
                    <Image
                      src={s.img}
                      alt={s.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-purple-900/10 mix-blend-overlay" />
                  </div>
                  <div className="space-y-12">
                    {s.items.map((item, i) => (
                      <Reveal key={i} delay={i * 0.1}>
                        <div className="group flex justify-between items-end pb-8 border-b border-purple-100 hover:border-purple-600 transition-all cursor-pointer">
                          <div>
                            <h4 className="text-xl md:text-2xl font-light tracking-tight text-[#2d2a26] uppercase italic group-hover:text-purple-600 transition-colors mb-2">
                              {item.name}
                            </h4>
                            <span className="text-[10px] font-bold text-stone-300 uppercase tracking-widest">
                              {item.duration}
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-black text-purple-600 italic mb-2">
                              {item.price}
                            </div>
                            <button className="text-[9px] font-black uppercase tracking-widest text-stone-300 group-hover:text-purple-600 transition-colors">
                              Book_Slot
                            </button>
                          </div>
                        </div>
                      </Reveal>
                    ))}
                    <div className="pt-12">
                      <button className="w-full py-5 border border-[#2d2a26] text-[#2d2a26] text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-[#2d2a26] hover:text-[#fffcf9] transition-all">
                        DOWNLOAD_FULL_BROCHURE
                      </button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* ==========================================
          4. ARTISTS (Stylists)
          ========================================== */}
      <section
        id="stylists"
        className="py-32 bg-[#fffcf9] border-y border-purple-100/50"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <Reveal className="mb-24 text-center">
            <span className="text-[10px] uppercase tracking-[0.5em] font-black text-purple-600 mb-6 block">
              Master Artisans
            </span>
            <h2 className="text-5xl md:text-7xl font-light tracking-tighter uppercase italic text-[#2d2a26]">
              The Artists.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {STYLISTS.map((t, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="group text-center">
                  <div className="relative aspect-[3/4] rounded-3xl overflow-hidden mb-8 border border-purple-100">
                    <Image
                      src={t.img}
                      alt={t.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-1000 grayscale-[0.2]"
                    />
                    <div className="absolute inset-0 bg-purple-900/10 mix-blend-overlay" />
                  </div>
                  <h4 className="text-xl font-light tracking-tight text-[#2d2a26] uppercase italic mb-2">
                    {t.name}
                  </h4>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-purple-600">
                    {t.role}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          5. BOUTIQUE (Product)
          ========================================== */}
      <section id="boutique" className="py-32 bg-[#fffcf9]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-32 items-center">
            <div className="lg:col-span-7">
              <Reveal className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl bg-white p-12 flex items-center justify-center border border-purple-100 group">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 40,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="relative w-full h-full opacity-10"
                >
                  <div className="absolute inset-0 border-[40px] border-purple-600 rounded-full border-dashed" />
                </motion.div>
                <Image
                  src="https://images.unsplash.com/photo-1599447421416-3414500d18a5?w=600&q=80"
                  alt="Product"
                  width={400}
                  height={400}
                  className="relative z-10 drop-shadow-2xl"
                />
                <div className="absolute bottom-12 right-12 text-right">
                  <span className="text-[10px] font-black uppercase text-purple-600 mb-2 block tracking-widest">
                    New Arrival
                  </span>
                  <div className="text-3xl font-black text-[#2d2a26] italic">
                    Aevia Repair Serum
                  </div>
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-5">
              <Reveal>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-purple-600 mb-6 block">
                  The Boutique
                </span>
                <h2 className="text-5xl md:text-7xl font-light tracking-tighter leading-tight mb-12 text-[#2d2a26] uppercase italic">
                  Home <br />{" "}
                  <span className="text-purple-600 not-italic">Protocols.</span>
                </h2>
                <p className="text-lg text-stone-400 leading-relaxed font-light mb-16 uppercase tracking-tight italic">
                  Prolongez l'expérience Lumina chez vous avec notre gamme
                  exclusive de soins cliniques. Des formulations pures pour des
                  résultats professionnels.
                </p>
                <div className="space-y-6">
                  {[
                    {
                      name: "Sérum Réparateur",
                      price: "€85",
                      icon: <Droplets className="w-4 h-4" />,
                    },
                    {
                      name: "Huile Cuticule Gold",
                      price: "€32",
                      icon: <Sun className="w-4 h-4" />,
                    },
                    {
                      name: "Masque Illuminateur",
                      price: "€64",
                      icon: <Sparkles className="w-4 h-4" />,
                    },
                  ].map((p, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-6 border border-purple-100 rounded-2xl hover:border-purple-600 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-purple-600 group-hover:scale-110 transition-transform">
                          {p.icon}
                        </div>
                        <span className="text-[10px] font-black uppercase text-stone-500 tracking-widest">
                          {p.name}
                        </span>
                      </div>
                      <span className="text-lg font-black text-[#2d2a26] italic">
                        {p.price}
                      </span>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-12 py-5 bg-[#2d2a26] text-[#fffcf9] text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-purple-600 transition-all shadow-xl">
                  VISIT_FULL_BOUTIQUE
                </button>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          6. FAQ (The Buffer)
          ========================================== */}
      <section className="py-32 bg-[#fffcf9] border-t border-purple-100/50">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-light tracking-tighter leading-none uppercase italic text-[#2d2a26]">
              Beauty_Buffer
            </h2>
          </Reveal>

          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                q: "Comment préparer mon rendez-vous ?",
                a: "Pour les soins du visage, nous recommandons de venir démaquillée. Pour les ongles, merci de nous informer si vous portez une dépose d'un autre salon pour prévoir le temps nécessaire.",
              },
              {
                q: "Quelle est votre politique de retard ?",
                a: "Nous tolérons un retard de 15 minutes maximum. Au-delà, nous devrons peut-être écourter ou annuler la prestation pour respecter les rendez-vous suivants.",
              },
              {
                q: "Utilisez-vous des produits testés sur les animaux ?",
                a: "Absolument pas. Tous nos produits sont certifiés Leaping Bunny et sélectionnés pour leur éthique autant que pour leur efficacité.",
              },
              {
                q: "Proposez-vous des cartes cadeaux ?",
                a: "Oui, nos cartes Lumina sont disponibles en studio ou en ligne. Elles sont valables 1 an sur toutes nos prestations et produits.",
              },
            ].map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b border-purple-100/50"
              >
                <AccordionTrigger className="text-left text-sm uppercase font-bold tracking-widest py-8 hover:text-purple-600 hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-stone-400 leading-relaxed font-bold uppercase tracking-widest pb-8 italic">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ==========================================
          7. MEGA FOOTER (Premium Minimal)
          ========================================== */}
      <footer className="bg-[#1a1814] pt-32 pb-12 px-6 md:px-12 border-t border-white/5 relative overflow-hidden text-white">
        <div className="max-w-[1600px] mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-32">
            <div className="lg:col-span-5">
              <Reveal>
                <div className="flex flex-col mb-10">
                  <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-white/20 mb-1">
                    Aesthetic.
                  </span>
                  <span className="text-2xl font-light tracking-[0.4em] uppercase text-white">
                    LUMINA<span className="text-purple-600">BEAUTY</span>
                  </span>
                </div>
                <p className="text-white/20 max-w-sm mb-12 uppercase tracking-widest text-[10px] font-bold leading-relaxed italic">
                  A high-fidelity sanctuary designed for the precision curation
                  of beauty. Est. 2026. Member of the Global Aesthetic Council.
                </p>
                <form
                  className="relative max-w-md"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="email"
                    placeholder="JOIN_THE_CIRCLE"
                    className="w-full bg-white/[0.02] border border-white/5 rounded-none px-6 py-4 text-xs font-bold outline-none focus:border-purple-600 text-white transition-all uppercase tracking-widest"
                  />
                  <button
                    type="submit"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-purple-600 hover:text-white transition-colors uppercase tracking-[0.3em]"
                  >
                    JOIN
                  </button>
                </form>
              </Reveal>
            </div>

            <div className="lg:col-span-2 lg:col-start-7">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-purple-600 mb-10">
                Rituals
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/20">
                <li>
                  <Link
                    href="#"
                    className="hover:text-purple-600 transition-colors"
                  >
                    Nail_Artistry
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-purple-600 transition-colors"
                  >
                    Lash_Architect
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-purple-600 transition-colors"
                  >
                    Dermal_Repair
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-purple-600 transition-colors"
                  >
                    Brow_Sculpt
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-purple-600 mb-10">
                Studio
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/20">
                <li>
                  <Link
                    href="#"
                    className="hover:text-purple-600 transition-colors"
                  >
                    The_Artists
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-purple-600 transition-colors"
                  >
                    Process_Ethics
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-purple-600 transition-colors"
                  >
                    Boutique
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-purple-600 transition-colors"
                  >
                    Careers
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-purple-600 mb-10">
                Network
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/20">
                <li>
                  <Link
                    href="#"
                    className="hover:text-purple-600 transition-colors flex items-center gap-3"
                  >
                    <Globe className="w-3 h-3" /> Globe
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-purple-600 transition-colors flex items-center gap-3"
                  >
                    <Camera className="w-3 h-3" /> Pinterest
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-purple-600 transition-colors flex items-center gap-3"
                  >
                    <Mail className="w-3 h-3" /> Contact_Control
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-10 border-t border-white/5 text-[9px] font-bold uppercase tracking-widest text-white/10">
            <div className="flex items-center gap-10">
              <span>
                &copy; {new Date().getFullYear()} LUMINA BEAUTY Systems Ltd.
              </span>
              <Link href="#" className="hover:text-white transition-colors">
                Regulatory_Terms
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Privacy_Buffer
              </Link>
            </div>
            <div className="flex gap-10">
              <span>Paris // Milan // London</span>
              <span>In Beauty We Trust</span>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        ::-webkit-scrollbar{width:4px;background:#fffcf9}
        ::-webkit-scrollbar-thumb{background:#f3e8ff}
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
