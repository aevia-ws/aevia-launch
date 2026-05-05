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
import { Utensils, MapPin, Clock, Star, Check, Globe, Mail, Phone, ChevronRight, ArrowRight, X, Menu, ShoppingBag, Heart, Zap, Coffee, Award, Flame, Leaf, Timer, Wind } from "lucide-react";

import "../premium.css";

/* ==========================================================================
   DATA STRUCTURES
   ========================================================================= */

const CATEGORIES = [
  "All",
  "Boulangerie",
  "Pâtisserie",
  "Viennoiserie",
  "Traiteur",
  "Épicerie",
];

const MENU_ITEMS = [
  {
    id: 1,
    cat: "Boulangerie",
    name: "La Tradition",
    price: "€1.30",
    desc: "Our signature baguette. Long fermentation, 100% French wheat, stone-baked.",
    img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80",
  },
  {
    id: 2,
    cat: "Pâtisserie",
    name: "Éclair au Chocolat",
    price: "€4.50",
    desc: "Valrhona dark chocolate cream, choux pastry, gold leaf finish.",
    img: "https://images.unsplash.com/photo-1612203985729-70726954388c?w=800&q=80",
  },
  {
    id: 3,
    cat: "Viennoiserie",
    name: "Croissant au Beurre",
    price: "€1.80",
    desc: "AOP Charentes-Poitou butter. 72 hours of lamination for perfect honeycomb.",
    img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80",
  },
  {
    id: 4,
    cat: "Boulangerie",
    name: "Pain au Levain",
    price: "€6.50",
    desc: "Wild yeast starter since 1924. Rye and wheat blend, thick caramelized crust.",
    img: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=800&q=80",
  },
  {
    id: 5,
    cat: "Pâtisserie",
    name: "Tarte au Citron",
    price: "€5.20",
    desc: "Menton lemons, sable crust, lightly torched Italian meringue.",
    img: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=800&q=80",
  },
  {
    id: 6,
    cat: "Viennoiserie",
    name: "Pain au Chocolat",
    price: "€1.95",
    desc: "Double bar of semi-sweet dark chocolate in flaky layers.",
    img: "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?w=800&q=80",
  },
];

const VALUES = [
  {
    icon: Flame,
    title: "Stone Baked",
    desc: "Our ovens are fire-brick lined to ensure a deep, caramelized crust and moist crumb.",
  },
  {
    icon: Leaf,
    title: "Sourcing",
    desc: "We exclusively use Label Rouge flour and seasonal fruits from local organic producers.",
  },
  {
    icon: Timer,
    title: "Time",
    desc: "We don't rush. Slow fermentation (24-48h) is the secret to flavor and digestibility.",
  },
  {
    icon: Award,
    title: "Mastery",
    desc: "Headed by Pierre Laval, Meilleur Ouvrier de France 2018 in Boulangerie.",
  },
];

const REVIEWS = [
  {
    name: "Marc Aubert",
    stars: 5,
    text: "The baguette Tradition here is life-changing. Crispy, airy, and smells like heaven. Best in Paris.",
  },
  {
    name: "Sophie Laurent",
    stars: 5,
    text: "The pastries are actual works of art. The Lemon Tart is perfectly balanced between sweet and acidic.",
  },
  {
    name: "Jean-Pierre",
    stars: 5,
    text: "Worth the queue every Sunday morning. Their Pain au Levain stays fresh for 4 days!",
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
      initial={{ opacity: 0, y: 25 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
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
      x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
      y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
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

export default function ArtisanBakeryPage() {
  const [scrolled, setScrolled] = useState(false);
  const [filter, setFilter] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const filteredItems =
    filter === "All" ? MENU_ITEMS : MENU_ITEMS.filter((i) => i.cat === filter);

  return (
    <div className="min-h-screen bg-[#fdfcf9] text-[#3e2b1f] font-serif selection:bg-[#c9a66b] selection:text-white overflow-x-hidden">
      {/* ── NAVIGATION ── */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-700 ${scrolled ? "bg-white/95 backdrop-blur-xl border-b border-[#c9a66b]/20 py-4" : "bg-transparent py-8"} px-6 md:px-12 flex items-center justify-between`}
      >
        <div className="flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#c9a66b]">
            Maison Laval
          </span>
          <span className="text-xl font-black tracking-tighter uppercase italic text-[#3e2b1f]">
            Boulangerie
            <span className="text-[#c9a66b] not-italic font-thin">
              {" "}
              Artisanale
            </span>
          </span>
        </div>

        <div className="hidden lg:flex gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-[#3e2b1f]/50">
          {["Savoir-Faire", "Menu", "Histoire", "Contact"].map((l) => (
            <Link
              key={l}
              href={`#${l.toLowerCase()}`}
              className="hover:text-[#c9a66b] transition-colors"
            >
              {l}
            </Link>
          ))}
        </div>

        <div className="flex gap-6 items-center">
          <button onClick={() => setCartOpen(true)} className="relative group">
            <ShoppingBag className="w-5 h-5 text-[#3e2b1f] group-hover:text-[#c9a66b] transition-colors" />
            <span className="absolute -top-2 -right-2 w-4 h-4 bg-[#c9a66b] text-white text-[9px] flex items-center justify-center rounded-full">
              0
            </span>
          </button>
          <MagneticBtn className="px-8 py-3 bg-[#3e2b1f] text-white text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-[#c9a66b] transition-all hidden md:block">
            Pre-Order
          </MagneticBtn>
          <button
            onClick={() => setMenuOpen(true)}
            className="lg:hidden text-[#c9a66b]"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 z-[100] bg-[#fdfcf9] p-12 flex flex-col justify-center gap-10"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-8 right-8 text-[#c9a66b]"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="flex flex-col gap-6 text-5xl font-black italic text-[#3e2b1f]/30">
              {["Savoir-Faire", "Menu", "Histoire", "Contact"].map((l) => (
                <Link
                  key={l}
                  href={`#${l.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-[#c9a66b] transition-colors"
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
            src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1600&q=80"
            alt="Bakery Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#fdfcf9] via-[#fdfcf9]/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full">
          <Reveal>
            <Badge className="mb-10 bg-[#c9a66b]/10 text-[#c9a66b] border border-[#c9a66b]/20 text-[10px] font-bold uppercase tracking-[0.4em] px-4 py-1.5">
              Established 1924 // Paris
            </Badge>
            <h1 className="text-7xl md:text-[8rem] font-black leading-[0.85] tracking-tighter mb-10 text-[#3e2b1f]">
              L'Art du <br />
              <span className="italic font-thin text-[#c9a66b]">
                Vrai Pain.
              </span>
            </h1>
            <p className="text-[#3e2b1f]/60 text-lg max-w-md mb-12 font-light leading-relaxed italic">
              A heritage of slow-fermented, stone-baked sourdough and artisanal
              French pastries. Crafted with time, passion, and French Label
              Rouge flour.
            </p>
            <div className="flex gap-6 flex-wrap">
              <MagneticBtn
                onClick={() => setCartOpen(true)}
                className="px-10 py-4 bg-[#c9a66b] text-white text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-[#3e2b1f] transition-all"
              >
                Today's Batch
              </MagneticBtn>
              <Link
                href="#menu"
                className="px-10 py-4 border border-[#3e2b1f]/20 text-[#3e2b1f] text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-white transition-all flex items-center gap-3"
              >
                Full Menu <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="absolute bottom-12 left-12 hidden lg:flex flex-col gap-4 text-[#3e2b1f]/20">
          <div className="flex items-center gap-3">
            <Flame className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              Oven Status: 240°C
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              Next Batch: 04:30 AM
            </span>
          </div>
        </div>
      </section>

      {/* ── VALUES SECTION ── */}
      <section id="savoir-faire" className="py-32 px-6 md:px-12 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <div className="text-center mb-24">
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#c9a66b] mb-4 block">
                Notre Philosophie
              </span>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter italic">
                L'Excellence du{" "}
                <span className="not-italic font-thin text-[#c9a66b]">
                  Geste.
                </span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {VALUES.map((v, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="p-8 border border-[#c9a66b]/10 rounded-2xl bg-[#fdfcf9] hover:border-[#c9a66b] transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-[#c9a66b]/10 flex items-center justify-center text-[#c9a66b] mb-6 group-hover:bg-[#c9a66b] group-hover:text-white transition-all">
                    <v.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black italic mb-4">{v.title}</h3>
                  <p className="text-sm text-[#3e2b1f]/50 leading-relaxed font-light italic">
                    {v.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE MENU ── */}
      <section id="menu" className="py-32 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-10">
              <div>
                <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter">
                  Le <span className="text-[#c9a66b]">Comptoir.</span>
                </h2>
                <p className="text-[#3e2b1f]/30 text-[10px] font-bold uppercase tracking-[0.4em] mt-4">
                  Available for Collection Today
                </p>
              </div>
              <div className="flex gap-3 flex-wrap">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all 
                    ${filter === cat ? "bg-[#3e2b1f] border-[#3e2b1f] text-white" : "border-[#3e2b1f]/10 text-[#3e2b1f]/40 hover:border-[#c9a66b]"}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="group relative aspect-[4/5] rounded-3xl overflow-hidden cursor-pointer shadow-xl shadow-black/5"
                >
                  <Image
                    src={item.img}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3e2b1f] via-transparent to-transparent opacity-90" />
                  <div className="absolute inset-0 p-10 flex flex-col justify-end text-white">
                    <div className="flex justify-between items-end mb-4">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#c9a66b] mb-2 block">
                          {item.cat}
                        </span>
                        <h3 className="text-3xl font-black italic">
                          {item.name}
                        </h3>
                      </div>
                      <span className="text-2xl font-thin text-[#c9a66b]">
                        {item.price}
                      </span>
                    </div>
                    <p className="text-sm text-white/60 font-light italic leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all duration-500">
                      {item.desc}
                    </p>
                    <button className="mt-8 flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest bg-[#c9a66b] text-white w-fit px-6 py-3 rounded-full hover:bg-white hover:text-[#3e2b1f] transition-all opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 duration-500">
                      Add to Basket <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS SECTION ── */}
      <section className="py-32 px-6 md:px-12 bg-[#3e2b1f] text-white">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
          <div className="lg:col-span-5">
            <Reveal>
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#c9a66b] mb-6 block">
                Témoignages
              </span>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter italic leading-tight mb-12 uppercase">
                A Daily <br /> <span className="text-[#c9a66b]">Ritual.</span>
              </h2>
              <div className="space-y-12">
                {REVIEWS.map((r, i) => (
                  <div
                    key={i}
                    className="border-l border-[#c9a66b]/30 pl-8 space-y-4"
                  >
                    <div className="flex gap-1">
                      {[...Array(r.stars)].map((_, j) => (
                        <Star
                          key={j}
                          className="w-3 h-3 fill-[#c9a66b] text-[#c9a66b]"
                        />
                      ))}
                    </div>
                    <p className="text-lg italic font-light leading-relaxed text-white/70">
                      "{r.text}"
                    </p>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#c9a66b]">
                      — {r.name}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-7 relative aspect-square rounded-3xl overflow-hidden grayscale">
            <Image
              src="https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=1000&q=80"
              alt="Bread Detail"
              fill
              className="object-cover opacity-60 group-hover:scale-110 transition-transform duration-[6s]"
            />
            <div className="absolute inset-0 bg-[#3e2b1f]/20" />
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        id="contact"
        className="bg-[#fdfcf9] pt-32 pb-12 px-6 md:px-12 border-t border-[#c9a66b]/20"
      >
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-20 mb-32">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="flex flex-col mb-10">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#c9a66b]">
                  Maison Laval
                </span>
                <span className="text-4xl font-black italic uppercase text-[#3e2b1f]">
                  Boulangerie
                  <span className="text-[#c9a66b] not-italic font-thin">
                    {" "}
                    Artisanale
                  </span>
                </span>
              </div>
              <p className="text-[#3e2b1f]/40 max-w-sm mb-12 text-sm italic font-light leading-relaxed">
                Celebrating the French tradition of baking. Every loaf, every
                pastry, is a testament to time, patience, and high-quality
                ingredients.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <MapPin className="w-5 h-5 text-[#c9a66b]" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    14 Rue des Archives, 75004 Paris
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="w-5 h-5 text-[#c9a66b]" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    +33 1 42 78 45 10
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-2 lg:col-start-7">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#c9a66b] mb-10">
              La Carte
            </h4>
            <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-[#3e2b1f]/40">
              {[
                "Pains de Campagne",
                "Baguettes",
                "Croissants",
                "Tortes & Tartes",
                "Épicerie Fine",
              ].map((l) => (
                <li key={l}>
                  <Link
                    href="#"
                    className="hover:text-[#c9a66b] transition-colors"
                  >
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#c9a66b] mb-10">
              Horaires
            </h4>
            <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-[#3e2b1f]/40 italic">
              <li>Lun - Ven: 07h00 - 20h00</li>
              <li>Samedi: 08h00 - 19h00</li>
              <li>Dimanche: 08h00 - 13h00</li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#c9a66b] mb-10">
              Maison
            </h4>
            <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-[#3e2b1f]/40">
              {["Histoire", "Équipe", "Presse", "Engagements", "Contact"].map(
                (l) => (
                  <li key={l}>
                    <Link
                      href="#"
                      className="hover:text-[#c9a66b] transition-colors"
                    >
                      {l}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto pt-10 border-t border-[#c9a66b]/20 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] font-bold uppercase tracking-widest text-[#3e2b1f]/20">
          <div className="flex items-center gap-10">
            <span>
              &copy; {new Date().getFullYear()} MAISON LAVAL. ALL RIGHTS
              RESERVED.
            </span>
            <div className="flex gap-6">
              <Globe className="w-4 h-4 hover:text-[#c9a66b] cursor-pointer" />
              <Globe className="w-4 h-4 hover:text-[#c9a66b] cursor-pointer" />
            </div>
          </div>
          <div className="flex gap-10">
            <span>Mentions Légales</span>
            <span>Politique de Confidentialité</span>
          </div>
        </div>
      </footer>

      {/* CART OVERLAY */}
      <AnimatePresence>
        {cartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-[200] bg-[#3e2b1f]/60 backdrop-blur-md flex justify-end"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#fdfcf9] w-full max-w-md h-full shadow-2xl p-12 flex flex-col"
            >
              <div className="flex justify-between items-center mb-12">
                <h3 className="text-3xl font-black italic uppercase">
                  Votre Panier
                </h3>
                <button
                  onClick={() => setCartOpen(false)}
                  className="text-[#c9a66b]"
                >
                  <X className="w-8 h-8" />
                </button>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <ShoppingBag className="w-16 h-16 text-[#c9a66b]/20 mb-6" />
                <p className="text-lg italic font-light text-[#3e2b1f]/30">
                  Your basket is currently empty.
                </p>
                <button
                  onClick={() => setCartOpen(false)}
                  className="mt-8 text-[10px] font-bold uppercase tracking-widest text-[#c9a66b] border-b border-[#c9a66b] pb-1"
                >
                  Start Browsing
                </button>
              </div>

              <div className="pt-10 border-t border-[#c9a66b]/20">
                <div className="flex justify-between mb-8 text-[10px] font-bold uppercase tracking-widest">
                  <span>Total</span>
                  <span>€0.00</span>
                </div>
                <button className="w-full py-6 bg-[#3e2b1f] text-white text-[11px] font-black uppercase tracking-[0.4em] rounded-full hover:bg-[#c9a66b] transition-all">
                  Checkout Now
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        ::-webkit-scrollbar{width:4px;background:#fdfcf9}
        ::-webkit-scrollbar-thumb{background:#c9a66b}
      `}</style>
    </div>
  );
}
