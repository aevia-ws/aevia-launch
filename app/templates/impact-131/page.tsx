"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown, Grape, Droplets, MapPin, Award, ShieldCheck, Sun, Wind, ChevronRight, X, Menu, ShoppingBag, Plus, Minus } from "lucide-react";

import "../premium.css";

/* ==========================================================================
   DATA STRUCTURES
   ========================================================================== */

const WINE_DATA = {
  name: "Cuvée Prestige",
  vintage: "2018",
  appellation: "AOC Margaux, Grand Cru Classé",
  price: "€240",
  varietals: "70% Cabernet Sauvignon, 25% Merlot, 5% Petit Verdot",
  abv: "13.5%",
  aging: "24 months in new French oak",
  production: "12,000 bottles",
  desc: "The pinnacle of our estate. A wine of profound elegance and architectural structure, balancing the power of our oldest Cabernet vines with the silkiness of Merlot. 2018 yielded a vintage of extraordinary concentration, promising decades of graceful evolution.",
};

const TASTING_NOTES = [
  {
    phase: "Nose",
    notes:
      "Crème de cassis, dried violet, graphite, and subtle hints of humidor and black truffle.",
    icon: <Droplets className="w-5 h-5 text-[#8b1c31]" />,
  },
  {
    phase: "Palate",
    notes:
      "Full-bodied with a velvet texture. Layers of black cherry, espresso, and crushed stone. The tannins are exceptionally fine-grained, coating the mouth without aggression.",
    icon: <Grape className="w-5 h-5 text-[#8b1c31]" />,
  },
  {
    phase: "Finish",
    notes:
      "Minutes-long, oscillating between dark fruit and savory minerality. A hallmark of the terroir.",
    icon: <Wind className="w-5 h-5 text-[#8b1c31]" />,
  },
];

const TERROIR = [
  {
    title: "Soil",
    desc: "Deep Günzian gravel over clay-limestone. Excellent drainage forces roots deep into the earth, extracting complex minerality.",
    icon: <MapPin className="w-6 h-6" />,
  },
  {
    title: "Climate",
    desc: "Maritime influence from the Gironde estuary moderates extreme temperatures, ensuring a long, slow ripening period.",
    icon: <Sun className="w-6 h-6" />,
  },
  {
    title: "Farming",
    desc: "100% biodynamic practices. No synthetic chemicals, horse-plowed rows, and lunar-guided harvest dates.",
    icon: <ShieldCheck className="w-6 h-6" />,
  },
];

const AWARDS = [
  {
    score: "100",
    critic: "Robert Parker",
    publication: "Wine Advocate",
    text: "A monumental achievement. It takes the breath away with its seamless perfection.",
  },
  {
    score: "99",
    critic: "James Suckling",
    publication: "JamesSuckling.com",
    text: "Phenomenal density and yet weightless. The length is eternal.",
  },
  {
    score: "19.5/20",
    critic: "Jancis Robinson",
    publication: "JancisRobinson.com",
    text: "Aristocratic, intellectual, and hedonistic all at once.",
  },
];

const HISTORY = [
  {
    year: "1742",
    title: "The Foundation",
    desc: "The estate is established by the Marquis de la Tour, planting the first Cabernet vines on the gravel plateau.",
  },
  {
    year: "1855",
    title: "Grand Cru Classé",
    desc: "Recognized in the historic 1855 classification ordered by Napoleon III, sealing its status among the elite.",
  },
  {
    year: "1988",
    title: "The Modern Renaissance",
    desc: "Complete renovation of the cuvier, introducing gravity-fed fermentation tanks to preserve fruit purity.",
  },
  {
    year: "2012",
    title: "Biodynamic Transition",
    desc: "The entire 45-hectare vineyard is converted to biodynamic viticulture, prioritizing soil health and biodiversity.",
  },
];

/* ==========================================================================
   UTILITY COMPONENTS
   ========================================================================== */

function Reveal({
  children,
  className = "",
  delay = 0,
  y = 30,
}: {
  children: React.ReactNode;
  className?: string;
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
      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ==========================================================================
   MAIN PAGE COMPONENT
   ========================================================================== */

export default function CuveePrestigePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [qty, setQty] = useState(1);
  const [format, setFormat] = useState("750ml");

  const { scrollY } = useScroll();

  // Parallax effects
  const heroY = useTransform(scrollY, [0, 1000], [0, 300]);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const bottleY = useTransform(scrollY, [0, 800], [0, -100]);
  const bottleScale = useTransform(scrollY, [0, 800], [1, 0.9]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const priceMultiplier = format === "1.5L" ? 2.1 : format === "3.0L" ? 4.5 : 1;
  const basePriceNum = parseInt(WINE_DATA.price.replace("€", ""));
  const currentPrice = `€${Math.floor(basePriceNum * priceMultiplier)}`;

  return (
    <div className="premium-theme min-h-screen bg-[#0a0607] text-[#f8f5f0] font-serif selection:bg-[#8b1c31]/40 selection:text-white">
      {/* ==========================================
          CART SIDEBAR
          ========================================== */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
              onClick={() => setCartOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.4 }}
              className="fixed top-0 right-0 w-full md:w-[450px] h-full bg-[#140b0d] border-l border-white/5 z-[110] flex flex-col shadow-2xl"
            >
              <div className="p-8 flex justify-between items-center border-b border-white/5">
                <span className="text-[10px] font-sans uppercase tracking-[0.2em] font-bold text-[#8b1c31]">
                  Your Cellar
                </span>
                <button
                  onClick={() => setCartOpen(false)}
                  className="text-white/50 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8">
                <div className="flex gap-6">
                  <div className="w-24 h-32 relative bg-[#0a0607] rounded-sm overflow-hidden flex-shrink-0">
                    <Image
                      src="https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=800&auto=format&fit=crop"
                      alt="Wine bottle silhouette"
                      fill
                      className="object-cover opacity-80 mix-blend-screen"
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <h3 className="text-lg font-medium mb-1">
                      {WINE_DATA.name}
                    </h3>
                    <p className="font-sans text-[10px] text-white/50 uppercase tracking-widest mb-2">
                      Vintage {WINE_DATA.vintage} • {format}
                    </p>
                    <div className="mt-auto flex justify-between items-end">
                      <div className="flex items-center gap-4 border border-white/20 rounded-full px-3 py-1 font-sans">
                        <button
                          onClick={() => setQty(Math.max(1, qty - 1))}
                          className="text-white/50 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs w-4 text-center">{qty}</span>
                        <button
                          onClick={() => setQty(qty + 1)}
                          className="text-white/50 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-lg text-[#8b1c31] font-medium">
                        €{Math.floor(basePriceNum * priceMultiplier * qty)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-[#0a0607] border-t border-white/5">
                <div className="flex justify-between items-center mb-6 text-xl">
                  <span>Total</span>
                  <span className="text-[#8b1c31] font-medium">
                    €{Math.floor(basePriceNum * priceMultiplier * qty)}
                  </span>
                </div>
                <button className="w-full py-4 bg-[#8b1c31] text-white font-sans text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#6b1526] transition-colors">
                  Proceed to Checkout
                </button>
                <p className="text-center font-sans text-[10px] text-white/40 mt-4">
                  Shipping and taxes calculated at checkout.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ==========================================
          NAVIGATION
          ========================================== */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-[#0a0607]/90 backdrop-blur-md border-b border-[#8b1c31]/20 py-4" : "bg-transparent py-8"}`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setMenuOpen(true)}
              className="text-white hover:text-[#8b1c31] transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden lg:flex items-center gap-8 font-sans text-[10px] uppercase tracking-[0.2em] font-bold text-white/50">
              <Link href="#" className="hover:text-white transition-colors">
                The Estate
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Vintages
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Terroir
              </Link>
            </div>
          </div>

          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 text-2xl md:text-3xl font-medium tracking-widest uppercase"
          >
            Château <span className="text-[#8b1c31] italic">Lumina</span>
          </Link>

          <div className="flex items-center gap-8">
            <div className="hidden lg:flex items-center gap-6 font-sans text-[10px] uppercase tracking-[0.2em] font-bold text-white/50">
              <Link href="#" className="hover:text-white transition-colors">
                Visit
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Account
              </Link>
            </div>
            <button
              onClick={() => setCartOpen(true)}
              className="relative text-white hover:text-[#8b1c31] transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#8b1c31] flex items-center justify-center font-sans text-[9px] font-bold">
                {qty}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#0a0607]/98 backdrop-blur-xl flex flex-col p-6"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6 text-white/50 hover:text-white"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="flex-1 flex flex-col justify-center items-center gap-8 text-4xl font-light">
              <Link href="#" onClick={() => setMenuOpen(false)}>
                The Estate
              </Link>
              <Link href="#" onClick={() => setMenuOpen(false)}>
                Vintages
              </Link>
              <Link href="#" onClick={() => setMenuOpen(false)}>
                Terroir
              </Link>
              <Link href="#" onClick={() => setMenuOpen(false)}>
                Visit Us
              </Link>
              <Link href="#" onClick={() => setMenuOpen(false)}>
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==========================================
          1. HERO SECTION
          ========================================== */}
      <section className="relative w-full h-[100svh] overflow-hidden flex items-center bg-[#0a0607]">
        {/* Background Image Parallax */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0 w-full lg:w-[60%] lg:left-auto lg:right-0"
        >
          <Image
            src="https://images.unsplash.com/photo-1590453535970-22c6085a6ac1?q=80&w=1600&auto=format&fit=crop"
            alt="Vineyard"
            fill
            className="object-cover opacity-40 mix-blend-luminosity"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0607] via-[#0a0607]/80 to-transparent lg:via-[#0a0607]/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0607] via-transparent to-[#0a0607]" />
        </motion.div>

        {/* Content Container */}
        <div className="relative z-20 w-full max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center pt-20 h-full">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left pt-20 lg:pt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <span className="font-sans text-[10px] text-[#8b1c31] uppercase tracking-[0.3em] font-bold block mb-4 flex items-center justify-center lg:justify-start gap-3">
                <Award className="w-4 h-4" /> 100 Points - Robert Parker
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-6xl md:text-8xl lg:text-[7rem] font-light leading-[0.9] mb-4"
            >
              Cuvée <br />
              <span className="italic font-medium text-[#8b1c31]">
                Prestige.
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mb-12"
            >
              <span className="font-sans text-xs uppercase tracking-widest text-white/50 block mb-1">
                Vintage
              </span>
              <span className="text-4xl font-light">{WINE_DATA.vintage}</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex flex-col lg:flex-row items-center gap-6"
            >
              <button
                onClick={() => setCartOpen(true)}
                className="w-full lg:w-auto px-10 py-4 bg-[#8b1c31] text-white font-sans text-[10px] uppercase tracking-widest font-bold hover:bg-[#6b1526] transition-colors"
              >
                Acquire Allocation
              </button>
              <button className="flex items-center gap-3 font-sans text-[10px] uppercase tracking-widest font-bold text-white/60 hover:text-white transition-colors pb-1 border-b border-white/20 hover:border-white">
                Read Tasting Notes <ArrowRight className="w-3 h-3" />
              </button>
            </motion.div>
          </div>

          {/* Bottle Parallax Element */}
          <div className="flex-1 w-full h-[60vh] lg:h-full relative flex items-center justify-center mt-12 lg:mt-0 pointer-events-none">
            {/* Ambient glow behind bottle */}
            <div className="absolute w-[300px] h-[600px] bg-[#8b1c31]/20 blur-[100px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

            <motion.div
              style={{ y: bottleY, scale: bottleScale }}
              className="relative w-[150px] md:w-[200px] lg:w-[250px] h-[80%] max-h-[800px] z-30 drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
            >
              {/* Note: Using a mockup image for the bottle, styling it to look cut out */}
              <Image
                src="https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=600&auto=format&fit=crop"
                alt="Wine Bottle"
                fill
                className="object-contain mix-blend-screen opacity-90"
                priority
              />
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/40 z-20"
        >
          <span className="font-sans text-[9px] uppercase tracking-[0.3em]">
            Discover
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
        </motion.div>
      </section>

      {/* ==========================================
          2. E-COMMERCE / WINE DETAILS
          ========================================== */}
      <section className="py-24 border-y border-white/5 bg-[#0e080a] relative z-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-light mb-8">
              The Expression of{" "}
              <span className="italic text-[#8b1c31]">Excellence.</span>
            </h2>
            <p className="font-sans text-white/60 text-lg leading-relaxed mb-12">
              {WINE_DATA.desc}
            </p>

            <div className="grid grid-cols-2 gap-y-8 gap-x-12 font-sans mb-12 pb-12 border-b border-white/10">
              <div>
                <span className="block text-[10px] uppercase tracking-widest text-[#8b1c31] mb-1">
                  Appellation
                </span>
                <span className="block text-sm text-white/80">
                  {WINE_DATA.appellation}
                </span>
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-widest text-[#8b1c31] mb-1">
                  Blend
                </span>
                <span className="block text-sm text-white/80">
                  {WINE_DATA.varietals}
                </span>
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-widest text-[#8b1c31] mb-1">
                  Aging
                </span>
                <span className="block text-sm text-white/80">
                  {WINE_DATA.aging}
                </span>
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-widest text-[#8b1c31] mb-1">
                  Alcohol
                </span>
                <span className="block text-sm text-white/80">
                  {WINE_DATA.abv}
                </span>
              </div>
            </div>

            {/* Purchase Form */}
            <div className="flex flex-col sm:flex-row items-end gap-6 font-sans">
              <div className="w-full sm:w-1/3">
                <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-3">
                  Format
                </label>
                <div className="relative">
                  <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    className="w-full bg-[#140b0d] border border-white/20 text-white text-sm px-4 py-3.5 focus:outline-none focus:border-[#8b1c31] appearance-none"
                  >
                    <option value="750ml">Standard (750ml)</option>
                    <option value="1.5L">Magnum (1.5L)</option>
                    <option value="3.0L">Double Mag. (3.0L)</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 pointer-events-none" />
                </div>
              </div>

              <div className="w-full sm:w-1/4">
                <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-3">
                  Quantity
                </label>
                <div className="flex items-center justify-between border border-white/20 px-4 py-3.5 bg-[#140b0d]">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="text-white/50 hover:text-[#8b1c31] transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-sm font-medium">{qty}</span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="text-white/50 hover:text-[#8b1c31] transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="w-full sm:flex-1">
                <button
                  onClick={() => setCartOpen(true)}
                  className="w-full flex items-center justify-center gap-3 bg-[#8b1c31] text-white px-6 py-4 text-[10px] uppercase tracking-widest font-bold hover:bg-[#6b1526] transition-colors"
                >
                  Add to Cart — {currentPrice}
                </button>
              </div>
            </div>
          </Reveal>

          {/* Tasting Notes */}
          <div className="relative">
            <div className="absolute -inset-8 bg-[#8b1c31]/5 rounded-3xl border border-[#8b1c31]/10 -z-10" />
            <Reveal delay={0.2}>
              <h3 className="font-sans text-[10px] text-[#8b1c31] uppercase tracking-[0.3em] font-bold mb-8">
                Tasting Profile
              </h3>
              <div className="space-y-8">
                {TASTING_NOTES.map((note, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="w-12 h-12 rounded-full border border-white/10 bg-[#0a0607] flex items-center justify-center shrink-0">
                      {note.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-medium mb-2">{note.phase}</h4>
                      <p className="font-sans text-sm text-white/60 leading-relaxed">
                        {note.notes}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ==========================================
          3. CRITIC AWARDS
          ========================================== */}
      <section className="py-24 bg-[#0a0607] border-b border-white/5 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6">
          <Reveal className="text-center mb-16">
            <span className="font-sans text-[10px] text-white/40 uppercase tracking-[0.3em] font-bold">
              Critical Acclaim
            </span>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {AWARDS.map((award, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="border border-white/10 bg-white/[0.02] p-10 text-center h-full flex flex-col items-center">
                  <span className="text-5xl font-light text-[#8b1c31] mb-6 block">
                    {award.score}
                  </span>
                  <p className="text-lg italic text-white/70 mb-8 leading-relaxed flex-1">
                    "{award.text}"
                  </p>
                  <div className="font-sans">
                    <span className="block text-sm font-bold text-white/90">
                      {award.critic}
                    </span>
                    <span className="block text-[10px] uppercase tracking-widest text-white/40">
                      {award.publication}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          4. TERROIR & VITICULTURE
          ========================================== */}
      <section className="py-32 bg-[#140b0d] relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          <Reveal className="mb-20">
            <h2 className="text-4xl md:text-6xl font-light mb-6">
              Born from the{" "}
              <span className="italic text-[#8b1c31]">Gravel.</span>
            </h2>
            <p className="font-sans text-lg text-white/60 max-w-2xl">
              Great wine is made in the vineyard. Our obsession with soil health
              and biodiversity creates the canvas upon which the vintage paints
              its character.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-12">
              {TERROIR.map((t, i) => (
                <Reveal key={i} delay={i * 0.1} className="flex gap-6 group">
                  <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-[#8b1c31] shrink-0 group-hover:bg-[#8b1c31] group-hover:text-white group-hover:border-[#8b1c31] transition-all duration-500">
                    {t.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-medium mb-3">{t.title}</h3>
                    <p className="font-sans text-white/50 leading-relaxed text-sm">
                      {t.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal
              delay={0.3}
              className="relative aspect-[3/4] lg:aspect-square overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1504279577054-acfeccf8fc52?q=80&w=1200&auto=format&fit=crop"
                alt="Vineyard soil"
                fill
                className="object-cover opacity-80 mix-blend-luminosity"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#140b0d] via-transparent to-[#140b0d]" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ==========================================
          5. ESTATE HISTORY
          ========================================== */}
      <section className="py-32 bg-[#0a0607] border-t border-white/5">
        <div className="max-w-[1000px] mx-auto px-6 md:px-12">
          <Reveal className="text-center mb-20">
            <span className="font-sans text-[10px] text-[#8b1c31] uppercase tracking-[0.3em] font-bold block mb-4">
              La Storia
            </span>
            <h2 className="text-4xl md:text-5xl font-light">
              Three Centuries of Craft
            </h2>
          </Reveal>

          <div className="relative border-l border-white/10 ml-4 md:ml-1/2">
            {HISTORY.map((event, i) => (
              <Reveal
                key={i}
                delay={0.1}
                y={50}
                className="relative pl-12 md:pl-16 md:w-1/2 mb-16 last:mb-0 even:md:ml-auto even:md:pl-16 odd:md:pl-0 odd:md:pr-16 odd:md:text-right odd:md:-ml-[1px]"
              >
                {/* Dot */}
                <div
                  className={`absolute top-0 w-3 h-3 rounded-full bg-[#8b1c31] shadow-[0_0_15px_rgba(139,28,49,0.8)] ${i % 2 === 0 ? "left-[-6.5px] md:right-[-6.5px] md:left-auto" : "left-[-6.5px]"}`}
                />

                <span className="text-4xl md:text-6xl font-light text-white/10 block mb-4 leading-none">
                  {event.year}
                </span>
                <h3 className="text-xl md:text-2xl font-medium mb-4">
                  {event.title}
                </h3>
                <p className="font-sans text-white/50 text-sm leading-relaxed max-w-sm ml-0 odd:md:ml-auto">
                  {event.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          6. MEGA FOOTER
          ========================================== */}
      <footer className="bg-[#140b0d] pt-32 pb-12 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-24">
            <div className="lg:col-span-2">
              <Link
                href="/"
                className="text-3xl font-medium tracking-widest uppercase block mb-8"
              >
                Château <span className="text-[#8b1c31] italic">Lumina</span>
              </Link>
              <p className="font-sans text-white/40 text-sm leading-relaxed max-w-sm mb-10">
                Producing wines of uncompromising quality since 1742. A
                testament to terroir, patience, and passion.
              </p>
              <div className="font-sans text-[10px] uppercase tracking-widest text-white/30">
                L'abus d'alcool est dangereux pour la santé. <br />À consommer
                avec modération.
              </div>
            </div>

            <div className="font-sans">
              <h4 className="text-[10px] text-[#8b1c31] uppercase tracking-widest font-bold mb-6">
                Wines
              </h4>
              <ul className="space-y-4 text-sm text-white/60">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Cuvée Prestige
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Le Second Vin
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Blanc de Blancs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Large Formats
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Library Vintages
                  </Link>
                </li>
              </ul>
            </div>

            <div className="font-sans">
              <h4 className="text-[10px] text-[#8b1c31] uppercase tracking-widest font-bold mb-6">
                The Estate
              </h4>
              <ul className="space-y-4 text-sm text-white/60">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Our History
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    The Terroir
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Sustainability
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Book a Tasting
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Private Events
                  </Link>
                </li>
              </ul>
            </div>

            <div className="font-sans">
              <h4 className="text-[10px] text-[#8b1c31] uppercase tracking-widest font-bold mb-6">
                Newsletter
              </h4>
              <p className="text-xs text-white/50 mb-4 leading-relaxed">
                Join our allocation list for access to rare vintages and private
                events.
              </p>
              <form className="relative" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-sm focus:outline-none focus:border-[#8b1c31] text-white transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-[#8b1c31] hover:text-white transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/5 font-sans text-[10px] text-white/30 uppercase tracking-widest">
            <span>
              &copy; {new Date().getFullYear()} Château Lumina. All rights
              reserved.
            </span>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Terms & Conditions
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Shipping Info
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
