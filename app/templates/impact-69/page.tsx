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
import { ArrowRight, ArrowUpRight, Star, Check, Menu, X, Globe, Clock, Quote, Search, ShoppingBag, Plus, Droplets, FlaskConical, Microscope, Sparkles, ShieldCheck, Leaf, Recycle, Wind, BarChart3, Activity, Beaker, Zap, Mail, MapPin, Phone } from "lucide-react";

import "../premium.css";

/* ==========================================================================
   DATA STRUCTURES
   ========================================================================= */

const PRODUCTS = [
  {
    id: 1,
    name: "Lumière Sérum",
    tag: "Bio-Active Brightening",
    price: "€148",
    img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1200&q=80",
    desc: "A cellular-level serum using cold-pressed pomegranate seed oil and botanical Vitamin C.",
  },
  {
    id: 2,
    name: "Velours Crème",
    tag: "Lipid Repair",
    price: "€196",
    img: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=1200&q=80",
    desc: "Intensive moisture barrier support with ceramides derived from alpine moss.",
  },
  {
    id: 3,
    name: "Éclat Oil",
    tag: "Phyto-Retinol",
    price: "€124",
    img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&q=80",
    desc: "A non-photosensitizing retinol alternative for overnight structural regeneration.",
  },
  {
    id: 4,
    name: "Doux Masque",
    tag: "Thermal Cleansing",
    price: "€88",
    img: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=1200&q=80",
    desc: "Active volcanic clay mask that self-heats to detoxify dermal pores.",
  },
];

const STATS = [
  {
    label: "Hydration Retention",
    val: 98,
    suffix: "%",
    desc: "Clinically proven increase in dermal water retention after 14 days.",
  },
  {
    label: "Bio-Active Purity",
    val: 100,
    suffix: "%",
    desc: "Zero synthetic fillers, silicones, or parabens in our formulations.",
  },
  {
    label: "Recycling Loop",
    val: 100,
    suffix: "%",
    desc: "All packaging is made from ocean-bound plastic and fully compostable.",
  },
];

const INGREDIENTS = [
  {
    name: "Squalane",
    source: "Mediterranean Olives",
    function: "Barrier Support",
  },
  { name: "Bakuchiol", source: "Babchi Seeds", function: "Collagen Induction" },
  {
    name: "Hyaluronic Acid",
    source: "Fermented Wheat",
    function: "Deep Hydration",
  },
  {
    name: "Niacinamide",
    source: "Isolated Vitamin B3",
    function: "Tone Correction",
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

export default function AuraBiotechPage() {
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
      className="premium-theme min-h-screen bg-[#faf9f6] text-[#2c2a26] font-sans selection:bg-[#d4c3b3] selection:text-white overflow-x-hidden"
      style={{ scrollBehavior: "smooth" }}
    >
      {/* ==========================================
          NAVIGATION
          ========================================== */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-1000 ${scrolled ? "bg-[#faf9f6]/95 backdrop-blur-md py-4 border-b border-black/5 shadow-sm" : "bg-transparent py-10"}`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="flex flex-col items-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#2c2a26]/40 mb-1">
              Ritual.
            </span>
            <span className="text-xl md:text-2xl font-light tracking-[0.4em] uppercase text-[#2c2a26]">
              AURA<span className="text-[#d4c3b3]">.</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-[#2c2a26]/30">
            <Link
              href="#collection"
              className="hover:text-[#2c2a26] transition-colors"
            >
              Collection
            </Link>
            <Link
              href="#science"
              className="hover:text-[#2c2a26] transition-colors"
            >
              The_Lab
            </Link>
            <Link
              href="#philosophy"
              className="hover:text-[#2c2a26] transition-colors"
            >
              Philosophy
            </Link>
            <Link
              href="#sustainability"
              className="hover:text-[#2c2a26] transition-colors"
            >
              Impact
            </Link>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden xl:flex flex-col items-end">
              <span className="text-[9px] font-bold text-[#2c2a26]/20 uppercase tracking-widest">
                Biotech Formulation
              </span>
              <span className="text-[11px] font-bold text-[#d4c3b3] flex items-center gap-1">
                COSMOS CERTIFIED <Leaf className="w-3 h-3" />
              </span>
            </div>
            <MagneticBtn className="px-8 py-3 bg-[#2c2a26] text-white text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-[#d4c3b3] transition-all shadow-xl shadow-black/5">
              SHOP_NOW
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
            className="fixed inset-0 z-[100] bg-[#faf9f6] p-8 pt-32 flex flex-col border-l border-black/5"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-10 right-8"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="flex flex-col gap-10 text-5xl font-light tracking-tighter uppercase italic">
              <Link href="#collection" onClick={() => setMenuOpen(false)}>
                Collection
              </Link>
              <Link href="#science" onClick={() => setMenuOpen(false)}>
                The_Lab
              </Link>
              <Link href="#philosophy" onClick={() => setMenuOpen(false)}>
                Philosophy
              </Link>
              <Link href="#sustainability" onClick={() => setMenuOpen(false)}>
                Impact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==========================================
          1. HERO (Luxury Biotech)
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
            src="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1600&q=80"
            alt="Aura Hero"
            fill
            className="object-cover brightness-95 opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#faf9f6] via-transparent to-[#faf9f6]" />
        </motion.div>

        {/* SOFT GLOW */}
        <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-[#d4c3b3]/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full">
          <Reveal>
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/60 backdrop-blur-md rounded-full border border-black/5 text-[#2c2a26]/60 text-[10px] font-bold uppercase tracking-widest mb-10 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#d4c3b3]" />
              L'Excellence du Soin Biotech
            </div>
            <h1 className="text-7xl md:text-9xl lg:text-[11rem] font-light leading-[0.8] tracking-tighter mb-12 uppercase italic">
              Skin As <br /> <span className="text-[#d4c3b3]">Ritual.</span>
            </h1>
            <p className="max-w-xl text-lg md:text-xl text-[#2c2a26]/40 leading-relaxed font-light mb-12 italic tracking-tight">
              Des formules bio-actives certifiées COSMOS, conçues pour une
              régénération structurelle profonde sans aucun compromis
              synthétique.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <MagneticBtn className="px-12 py-5 bg-[#2c2a26] text-white text-[10px] font-bold uppercase tracking-[0.4em] rounded-full hover:bg-[#d4c3b3] transition-all cursor-pointer shadow-2xl">
                Découvrir la Collection
              </MagneticBtn>
              <button className="px-12 py-5 border border-black/10 text-[#2c2a26] text-[10px] font-bold uppercase tracking-[0.4em] rounded-full hover:bg-white transition-all cursor-pointer">
                Notre Manifeste
              </button>
            </div>
          </Reveal>
        </div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute bottom-10 right-12 hidden md:block"
        >
          <div className="flex flex-col items-end gap-3 text-right">
            <span className="text-[9px] font-bold text-[#2c2a26]/20 uppercase tracking-[0.5em]">
              PARIS // GRASSE // CASABLANCA
            </span>
            <div className="w-32 h-[1px] bg-[#d4c3b3]/40" />
          </div>
        </motion.div>
      </section>

      {/* ==========================================
          2. THE BIO-LAB (Scientific Protocol)
          ========================================== */}
      <section
        id="science"
        className="py-32 bg-[#faf9f6] border-y border-black/5"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-32 items-center">
            <div className="lg:col-span-5">
              <Reveal>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#d4c3b3] mb-6 block">
                  Molecular Science
                </span>
                <h2 className="text-5xl md:text-7xl font-light tracking-tighter leading-tight mb-12 text-[#2c2a26] uppercase">
                  Cold <br />{" "}
                  <span className="italic text-[#d4c3b3]">Processing.</span>
                </h2>
                <p className="text-lg text-[#2c2a26]/40 leading-relaxed font-light mb-16 uppercase tracking-tight italic">
                  Chaque ingrédient est extrait à froid pour préserver
                  l'intégrité moléculaire des phyto-nutriments, garantissant une
                  efficacité multipliée par 5.
                </p>

                <div className="space-y-10">
                  {STATS.map((item, i) => (
                    <div
                      key={i}
                      className="group border-l border-[#d4c3b3]/20 pl-8 hover:border-[#d4c3b3] transition-all"
                    >
                      <h4 className="text-sm font-bold uppercase tracking-tight mb-2 text-[#2c2a26]/60">
                        {item.label}
                      </h4>
                      <div className="text-3xl font-black text-[#d4c3b3] mb-2 uppercase italic tabular-nums">
                        <Counter to={item.val} suffix={item.suffix} />
                      </div>
                      <p className="text-[10px] text-[#2c2a26]/20 leading-relaxed font-bold uppercase tracking-widest">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Reveal className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-black/5 bg-white p-1 group">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,195,179,0.1)_0%,transparent_70%)] animate-pulse" />
                <div className="relative h-full w-full border border-black/5 bg-[#faf9f6] p-8 flex flex-col justify-between overflow-hidden">
                  <div className="flex items-center justify-between mb-10 pb-6 border-b border-black/5">
                    <div className="flex items-center gap-4">
                      <Microscope className="w-5 h-5 text-[#d4c3b3]" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#d4c3b3]">
                        Bio-Analysis_Live
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-1.5 h-1.5 bg-[#d4c3b3] rounded-full animate-pulse" />
                      <div className="w-1.5 h-1.5 bg-[#d4c3b3]/30 rounded-full" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {INGREDIENTS.map((ing, i) => (
                      <div
                        key={i}
                        className="p-6 bg-white border border-black/[0.02] rounded-2xl hover:border-[#d4c3b3]/30 transition-all"
                      >
                        <h4 className="text-xs font-black uppercase tracking-widest text-[#2c2a26] mb-1">
                          {ing.name}
                        </h4>
                        <span className="text-[9px] font-bold text-[#d4c3b3] uppercase tracking-widest block mb-4">
                          {ing.source}
                        </span>
                        <div className="h-0.5 w-full bg-black/5">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            transition={{ duration: 1.5, delay: i * 0.1 }}
                            className="h-full bg-[#d4c3b3]"
                          />
                        </div>
                        <span className="text-[8px] font-bold text-[#2c2a26]/20 uppercase tracking-tighter mt-2 block">
                          {ing.function}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-12 flex justify-between items-end">
                    <div className="space-y-1">
                      <span className="text-[9px] font-bold text-[#2c2a26]/20 uppercase tracking-widest">
                        Formula Stability
                      </span>
                      <div className="text-2xl font-black text-[#2c2a26] italic">
                        99.9% Alpha
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="flex flex-col items-end">
                        <span className="text-[8px] font-bold text-[#d4c3b3] uppercase">
                          Certified
                        </span>
                        <span className="text-[10px] font-black uppercase text-[#2c2a26]">
                          Ecocert Greenlife
                        </span>
                      </div>
                      <ShieldCheck className="w-10 h-10 text-[#d4c3b3] opacity-20" />
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          3. COLLECTION (Horizontal Scroller)
          ========================================== */}
      <section id="collection" className="py-32 bg-[#faf9f6]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
            <Reveal>
              <h2 className="text-5xl md:text-8xl font-light tracking-tighter uppercase leading-[0.9] text-[#2c2a26] italic">
                The <br /> <span className="text-[#d4c3b3]">Collection.</span>
              </h2>
            </Reveal>
            <p className="max-w-sm text-sm text-[#2c2a26]/30 leading-relaxed font-bold uppercase tracking-widest italic text-right">
              Une sélection rigoureuse de soins ciblés pour une routine
              minimaliste mais puissante.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PRODUCTS.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.1}>
                <div
                  onClick={() => setActiveProduct(i)}
                  className="group cursor-pointer bg-white border border-black/[0.03] hover:border-[#d4c3b3]/40 transition-all rounded-3xl p-4 shadow-sm overflow-hidden"
                >
                  <div className="relative aspect-square rounded-2xl overflow-hidden mb-8">
                    <Image
                      src={p.img}
                      alt={p.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                  <div className="px-4 pb-4">
                    <span className="text-[10px] uppercase tracking-widest text-[#d4c3b3] font-black mb-2 block">
                      {p.tag}
                    </span>
                    <h3 className="text-xl font-light tracking-tight mb-4 text-[#2c2a26] truncate uppercase italic">
                      {p.name}
                    </h3>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-black text-[#2c2a26]/40 italic">
                        {p.price}
                      </span>
                      <button className="p-3 bg-[#2c2a26] text-white rounded-full hover:bg-[#d4c3b3] transition-all">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          4. SUSTAINABILITY (Impact Track)
          ========================================== */}
      <section
        id="sustainability"
        className="py-32 bg-[#2c2a26] text-white overflow-hidden relative"
      >
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <Recycle className="w-full h-full text-white" />
        </div>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 text-center">
          <Reveal className="max-w-2xl mx-auto mb-24">
            <span className="text-[10px] uppercase tracking-[0.5em] font-black text-[#d4c3b3] mb-6 block">
              Our Impact
            </span>
            <h2 className="text-5xl md:text-8xl font-light tracking-tighter uppercase italic mb-8 text-white">
              Ethical <br /> <span className="text-[#d4c3b3]">Loop.</span>
            </h2>
            <p className="text-white/40 italic font-medium leading-relaxed uppercase tracking-tight">
              Nous ne prenons à la terre que ce que nous pouvons lui rendre.
              Packaging 100% compostable, logistique carbone neutre.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
            {[
              {
                title: "Ocean Bound Plastic",
                val: "100%",
                desc: "Tous nos flacons sont issus de plastique recyclé collecté dans les zones côtières.",
              },
              {
                title: "Carbon Neutral",
                val: "Zero",
                desc: "Nous compensons chaque gramme de CO2 via des projets de reforestation en Amazonie.",
              },
              {
                title: "Traceability",
                val: "Farm2Face",
                desc: "Un QR code sur chaque produit permet de tracer chaque ingrédient jusqu'à sa source.",
              },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="p-10 bg-white/5 border border-white/10 hover:border-[#d4c3b3]/40 transition-all rounded-3xl">
                  <div className="text-4xl font-black text-[#d4c3b3] mb-4 italic">
                    {item.val}
                  </div>
                  <h4 className="text-sm font-black uppercase tracking-widest text-white mb-4">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-white/40 leading-relaxed font-bold uppercase tracking-widest italic">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          5. FAQ (Accordion)
          ========================================== */}
      <section className="py-32 bg-[#faf9f6]">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-light tracking-tighter leading-none uppercase italic text-[#2c2a26]">
              Intel_Buffer
            </h2>
          </Reveal>

          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                q: "Quelle est la durée de conservation ?",
                a: "Grâce à notre extraction à froid et nos conservateurs naturels (radis fermenté), nos produits se conservent 6 mois après ouverture.",
              },
              {
                q: "Vos produits sont-ils testés sur les animaux ?",
                a: "Jamais. Aura est certifié Leaping Bunny et 100% Vegan. Nous testons nos formules sur des modèles cellulaires en laboratoire.",
              },
              {
                q: "Peut-on utiliser le sérum le matin ?",
                a: "Oui, notre Lumière Sérum est stable à la lumière. Nous recommandons toutefois l'application d'un SPF30 après votre routine du matin.",
              },
              {
                q: "Où sont fabriqués les produits ?",
                a: "Toutes nos formules sont développées dans notre laboratoire à Grasse et conditionnées dans notre atelier éco-conçu en Provence.",
              },
            ].map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b border-black/[0.05]"
              >
                <AccordionTrigger className="text-left text-sm uppercase font-bold tracking-widest py-8 hover:text-[#d4c3b3] hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-[#2c2a26]/40 leading-relaxed font-bold uppercase tracking-widest pb-8 italic">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ==========================================
          6. MEGA FOOTER (Premium Minimal)
          ========================================== */}
      <footer className="bg-[#1a1814] pt-32 pb-12 px-6 md:px-12 border-t border-white/5 relative overflow-hidden text-white">
        <div className="max-w-[1600px] mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-32">
            <div className="lg:col-span-5">
              <Reveal>
                <div className="flex flex-col mb-10">
                  <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-white/20 mb-1">
                    Ritual.
                  </span>
                  <span className="text-2xl font-light tracking-[0.4em] uppercase text-white">
                    AURA<span className="text-[#d4c3b3]">.</span>
                  </span>
                </div>
                <p className="text-white/20 max-w-sm mb-12 uppercase tracking-widest text-[10px] font-bold leading-relaxed italic">
                  Luxury skincare for the conscious collector. Cold-processed
                  biotech formulas designed for permanence.
                </p>
                <form
                  className="relative max-w-md"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="email"
                    placeholder="EMAIL_AUTHENTICATION"
                    className="w-full bg-white/[0.02] border border-white/5 rounded-none px-6 py-4 text-xs font-bold outline-none focus:border-[#d4c3b3] text-white transition-all uppercase tracking-widest"
                  />
                  <button
                    type="submit"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-[#d4c3b3] hover:text-white transition-colors uppercase tracking-[0.3em]"
                  >
                    ENROLL
                  </button>
                </form>
              </Reveal>
            </div>

            <div className="lg:col-span-2 lg:col-start-7">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#d4c3b3] mb-10">
                Collection
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/20">
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#d4c3b3] transition-colors"
                  >
                    Serums_Bio
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#d4c3b3] transition-colors"
                  >
                    Moisturizers_Lipid
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#d4c3b3] transition-colors"
                  >
                    Oils_Botanical
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#d4c3b3] transition-colors"
                  >
                    Masks_Thermal
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#d4c3b3] mb-10">
                The_Lab
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/20">
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#d4c3b3] transition-colors"
                  >
                    Science_Manifesto
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#d4c3b3] transition-colors"
                  >
                    Ingredient_Index
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#d4c3b3] transition-colors"
                  >
                    Clinical_Trials
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#d4c3b3] transition-colors"
                  >
                    Supply_Chain
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#d4c3b3] mb-10">
                Terminal
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/20">
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#d4c3b3] transition-colors flex items-center gap-3"
                  >
                    <Globe className="w-3 h-3" /> Globe
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#d4c3b3] transition-colors flex items-center gap-3"
                  >
                    <Globe className="w-3 h-3" /> X_Protocol
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#d4c3b3] transition-colors flex items-center gap-3"
                  >
                    <Mail className="w-3 h-3" /> Contact_IRL
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-10 border-t border-white/5 text-[9px] font-bold uppercase tracking-widest text-white/10">
            <div className="flex items-center gap-10">
              <span>&copy; {new Date().getFullYear()} AURA Skincare SAS.</span>
              <Link href="#" className="hover:text-white transition-colors">
                Regulatory_Terms
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Privacy_Buffer
              </Link>
            </div>
            <div className="flex gap-10">
              <span>Paris // Grasse // Provence</span>
              <span>Skin as Ritual</span>
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
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6"
            onClick={() => setActiveProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="bg-[#faf9f6] border border-black/10 max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-3xl shadow-2xl relative text-[#2c2a26]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveProduct(null)}
                className="absolute top-8 right-8 text-[#2c2a26]/20 hover:text-[#d4c3b3] transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="relative aspect-square md:aspect-auto">
                <Image
                  src={PRODUCTS[activeProduct].img}
                  alt="Product"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-12 flex flex-col justify-between bg-white">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-[#d4c3b3] font-black mb-4">
                    Bio-Active Formula // {PRODUCTS[activeProduct].tag}
                  </div>
                  <h3 className="text-4xl font-light uppercase tracking-tighter italic text-[#2c2a26] mb-6 leading-none">
                    {PRODUCTS[activeProduct].name}
                  </h3>
                  <p className="text-sm text-[#2c2a26]/40 leading-relaxed font-bold mb-10 italic">
                    "{PRODUCTS[activeProduct].desc}"
                  </p>

                  <div className="grid grid-cols-1 gap-4 mb-10">
                    {[
                      { label: "Storage", val: "Cold-Pressed" },
                      { label: "Potency", val: "High-Density" },
                      { label: "Purity", val: "100% Organic" },
                    ].map((s, i) => (
                      <div
                        key={i}
                        className="flex justify-between text-[10px] border-b border-black/5 pb-2 font-mono"
                      >
                        <span className="uppercase tracking-widest text-[#2c2a26]/20 font-black">
                          {s.label}
                        </span>
                        <span className="font-black text-[#2c2a26]/60 italic">
                          {s.val}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <button className="w-full py-5 bg-[#2c2a26] text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#d4c3b3] transition-all cursor-pointer shadow-xl">
                    ADD_TO_BAG — {PRODUCTS[activeProduct].price}
                  </button>
                  <button className="w-full py-5 border border-black/10 text-[#2c2a26] text-[10px] font-bold uppercase tracking-widest hover:bg-[#2c2a26] hover:text-white transition-all cursor-pointer">
                    VIEW_CLINICAL_TRIAL
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`::-webkit-scrollbar{width:4px;background:#faf9f6}::-webkit-scrollbar-thumb{background:rgba(212,195,179,0.2)}`}</style>
    </div>
  );
}
