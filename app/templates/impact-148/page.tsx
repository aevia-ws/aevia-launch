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
import { Leaf, Droplets, Sparkles, Wind, Sun, ArrowRight, Star, Heart, Globe, Menu, X, ChevronRight, Check, Play, Volume2, Search, ShoppingBag } from "lucide-react";

import "../premium.css";

/* ==========================================================================
   DATA STRUCTURES
   ========================================================================== */

const PRODUCTS = [
  {
    id: "p-01",
    name: "Botanical Elixir",
    category: "Serums",
    price: "$82",
    desc: "A concentrated blend of cold-pressed botanicals and bio-available vitamin C. Designed to illuminate and repair.",
    image:
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=800&auto=format&fit=crop",
    ingredients: ["Kakadu Plum", "Rosehip Oil", "Squalane"],
  },
  {
    id: "p-02",
    name: "Cloud Dew",
    category: "Moisturizers",
    price: "$64",
    desc: "Lightweight hydration that locks in moisture for 24 hours. Infused with alpine moss and hyaluronic acid.",
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop",
    ingredients: ["Hyaluronic Acid", "Alpine Moss", "Aloe Vera"],
  },
  {
    id: "p-03",
    name: "Midnight Recovery",
    category: "Balms",
    price: "$78",
    desc: "An overnight treatment that works with your body's natural circadian rhythm to restore the skin barrier.",
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop",
    ingredients: ["Bakuchiol", "Ceramides", "Lavender"],
  },
];

const INGREDIENTS = [
  {
    name: "Bakuchiol",
    role: "Retinol Alternative",
    desc: "A plant-based powerhouse that provides the same age-defying benefits as retinol without the irritation.",
  },
  {
    name: "Squalane",
    role: "Hydration Hero",
    desc: "Derived from olives, this lightweight oil mimics your skin's natural sebum to deeply moisturize.",
  },
  {
    name: "Kakadu Plum",
    role: "Vitamin C Source",
    desc: "The world's richest source of Vitamin C, promoting collagen production and radiance.",
  },
  {
    name: "Rosehip Oil",
    role: "Repair Specialist",
    desc: "Packed with essential fatty acids and vitamins to heal scarred or sun-damaged tissue.",
  },
];

const REVIEWS = [
  {
    text: "My skin has never felt more resilient. The Botanical Elixir is now a non-negotiable part of my morning ritual.",
    author: "Julianne V.",
    rating: 5,
  },
  {
    text: "Pureté is exactly what I've been looking for—clean, effective, and beautifully packaged. A true luxury experience.",
    author: "Sophia R.",
    rating: 5,
  },
  {
    text: "The scents are so subtle and natural. It feels like I'm giving my skin a deep breath of fresh air every day.",
    author: "Eleanor M.",
    rating: 5,
  },
];

/* ==========================================================================
   UTILITY COMPONENTS
   ========================================================================== */

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

/* ==========================================================================
   MAIN PAGE COMPONENT
   ========================================================================== */

export default function PureteSkincarePage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Face");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="premium-theme min-h-screen bg-[#fdfcf7] text-[#2c2c2c] font-serif selection:bg-[#8a9a5b]/20 selection:text-[#2c2c2c] overflow-x-hidden"
      style={{ scrollBehavior: "smooth" }}
    >
      {/* ==========================================
          NAVIGATION
          ========================================== */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${scrolled ? "bg-[#fdfcf7]/90 backdrop-blur-md py-4 border-b border-[#8a9a5b]/10" : "bg-transparent py-10"}`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="hidden lg:flex items-center gap-10 text-[10px] uppercase tracking-[0.2em] font-medium text-[#2c2c2c]/60">
            <Link
              href="#"
              className="hover:text-[#8a9a5b] transition-colors cursor-pointer"
            >
              Ritual
            </Link>
            <Link
              href="#"
              className="hover:text-[#8a9a5b] transition-colors cursor-pointer"
            >
              Science
            </Link>
            <Link
              href="#"
              className="hover:text-[#8a9a5b] transition-colors cursor-pointer"
            >
              Journal
            </Link>
          </div>

          <Link
            href="/"
            className="text-2xl md:text-3xl font-light tracking-[0.1em] uppercase cursor-pointer"
          >
            PURETÉ
          </Link>

          <div className="flex items-center gap-6 md:gap-10">
            <button className="text-[#2c2c2c]/60 hover:text-[#2c2c2c] transition-colors cursor-pointer hidden md:block">
              <Search className="w-4 h-4" />
            </button>
            <button className="text-[#2c2c2c]/60 hover:text-[#2c2c2c] transition-colors cursor-pointer relative">
              <ShoppingBag className="w-4 h-4" />
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-[#8a9a5b] text-white text-[8px] flex items-center justify-center rounded-full font-sans font-bold">
                2
              </span>
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden text-[#2c2c2c] cursor-pointer"
            >
              <Menu className="w-5 h-5" />
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
            className="fixed inset-0 z-[100] bg-[#fdfcf7] p-8 pt-32 flex flex-col"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-10 right-8 text-[#2c2c2c] cursor-pointer"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="flex flex-col gap-10 text-4xl font-light">
              <Link
                href="#"
                onClick={() => setMenuOpen(false)}
                className="cursor-pointer"
              >
                Ritual
              </Link>
              <Link
                href="#"
                onClick={() => setMenuOpen(false)}
                className="cursor-pointer"
              >
                Science
              </Link>
              <Link
                href="#"
                onClick={() => setMenuOpen(false)}
                className="cursor-pointer"
              >
                Journal
              </Link>
              <Link
                href="#"
                onClick={() => setMenuOpen(false)}
                className="cursor-pointer"
              >
                About Us
              </Link>
            </div>
            <div className="mt-auto border-t border-[#8a9a5b]/20 pt-10">
              <p className="text-xs uppercase tracking-widest text-[#2c2c2c]/40 mb-4">
                Newsletter
              </p>
              <div className="flex border-b border-[#2c2c2c] pb-2">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="bg-transparent flex-1 text-sm outline-none"
                />
                <button className="cursor-pointer">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==========================================
          1. HERO (Soft Storytelling)
          ========================================== */}
      <section className="relative w-full h-[100svh] flex flex-col justify-center items-center px-6 text-center overflow-hidden">
        {/* Background botanical overlay */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[80%] rounded-full bg-gradient-to-br from-[#8a9a5b] to-transparent blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[70%] rounded-full bg-gradient-to-tr from-[#d4b483] to-transparent blur-[100px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="absolute inset-0 z-[-1] opacity-20"
        >
          <Image
            src="https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1600&auto=format&fit=crop"
            alt="Botanical Background"
            fill
            className="object-cover grayscale"
          />
        </motion.div>

        <Reveal>
          <span className="text-[10px] md:text-[12px] uppercase tracking-[0.4em] font-medium text-[#8a9a5b] mb-8 block">
            Organic Skin Storytelling
          </span>
          <h1 className="text-5xl md:text-8xl lg:text-[10rem] font-light leading-[0.9] tracking-tighter mb-12">
            The Art <br /> of{" "}
            <span className="italic font-normal">Purity.</span>
          </h1>
          <p className="max-w-xl mx-auto text-lg md:text-xl text-[#2c2c2c]/70 leading-relaxed font-light mb-12">
            Harnessing the silent resilience of plants to restore your skin's
            natural balance. Clean chemistry, botanical heritage.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="px-10 py-4 bg-[#8a9a5b] text-white text-[10px] uppercase tracking-widest font-bold rounded-full hover:bg-[#7a8a4b] transition-all cursor-pointer shadow-lg shadow-[#8a9a5b]/20">
              Shop the Collection
            </button>
            <button className="px-10 py-4 border border-[#2c2c2c]/10 text-[#2c2c2c] text-[10px] uppercase tracking-widest font-bold rounded-full hover:bg-[#2c2c2c] hover:text-white transition-all cursor-pointer">
              Our Philosophy
            </button>
          </div>
        </Reveal>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-4">
            <span className="text-[9px] uppercase tracking-[0.3em] opacity-40">
              Discover Ritual
            </span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-[#2c2c2c]/40 to-transparent" />
          </div>
        </motion.div>
      </section>

      {/* ==========================================
          2. PHILOSOPHY / INTRO
          ========================================== */}
      <section className="py-32 bg-[#f5f2e8] relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-center">
          <Reveal className="relative aspect-[3/4] md:aspect-square w-full rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1200&auto=format&fit=crop"
              alt="Skin Texture"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[#8a9a5b]/10 mix-blend-multiply" />
          </Reveal>

          <div>
            <Reveal>
              <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-[#8a9a5b] mb-6 block">
                Our Essence
              </span>
              <h2 className="text-4xl md:text-6xl font-light tracking-tighter leading-tight mb-10">
                Skin as a living <br />{" "}
                <span className="italic font-normal">landscape.</span>
              </h2>
              <p className="text-xl text-[#2c2c2c]/70 leading-relaxed font-light mb-12">
                We believe skin is not a problem to be solved, but a landscape
                to be nurtured. Our formulations respect the biological rhythms
                of the epidermis, providing the nutrients needed to thrive in an
                urban world.
              </p>

              <div className="grid grid-cols-2 gap-8 mb-12">
                <div>
                  <h4 className="text-2xl font-normal mb-2">100%</h4>
                  <p className="text-xs uppercase tracking-widest text-[#2c2c2c]/50">
                    Botanical Actives
                  </p>
                </div>
                <div>
                  <h4 className="text-2xl font-normal mb-2">Zero</h4>
                  <p className="text-xs uppercase tracking-widest text-[#2c2c2c]/50">
                    Synthetic Dyes
                  </p>
                </div>
              </div>

              <Link
                href="#"
                className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] font-bold border-b border-[#2c2c2c]/20 pb-2 hover:border-[#8a9a5b] transition-colors group cursor-pointer"
              >
                The Science of Softness{" "}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ==========================================
          3. FEATURED PRODUCTS (Soft Slider)
          ========================================== */}
      <section className="py-32 bg-[#fdfcf7]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <Reveal>
              <h2 className="text-4xl md:text-6xl font-light tracking-tighter uppercase">
                The Essentials
              </h2>
            </Reveal>
            <div className="flex gap-4 md:gap-12 text-[10px] uppercase tracking-widest font-bold text-[#2c2c2c]/40">
              {["Face", "Body", "Sun", "Sets"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 border-b-2 transition-all cursor-pointer ${activeTab === tab ? "border-[#8a9a5b] text-[#2c2c2c]" : "border-transparent hover:text-[#2c2c2c]/70"}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {PRODUCTS.map((prod, i) => (
              <Reveal key={prod.id} delay={i * 0.1}>
                <div className="group cursor-pointer">
                  <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[#f5f2e8] mb-8">
                    <Image
                      src={prod.image}
                      alt={prod.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
                    />
                    <div className="absolute top-6 right-6">
                      <button className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-[#2c2c2c] hover:bg-[#8a9a5b] hover:text-white transition-all shadow-sm cursor-pointer">
                        <Heart className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-white/40 backdrop-blur-md border-t border-white/20">
                      <button className="w-full py-4 bg-[#2c2c2c] text-white text-[10px] uppercase tracking-widest font-bold rounded-lg hover:bg-[#000] transition-colors cursor-pointer">
                        Quick Add &mdash; {prod.price}
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-[9px] uppercase tracking-widest text-[#2c2c2c]/40 mb-1 block">
                        {prod.category}
                      </span>
                      <h3 className="text-2xl font-normal group-hover:text-[#8a9a5b] transition-colors">
                        {prod.name}
                      </h3>
                    </div>
                    <span className="text-lg font-light text-[#2c2c2c]/80">
                      {prod.price}
                    </span>
                  </div>
                  <p className="text-sm text-[#2c2c2c]/60 leading-relaxed font-light line-clamp-2">
                    {prod.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          4. INGREDIENT GLOSSARY (Interactive)
          ========================================== */}
      <section className="py-32 bg-[#8a9a5b] text-[#fdfcf7] relative overflow-hidden">
        {/* Animated leaf patterns in bg */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <Leaf className="absolute top-10 right-20 w-64 h-64 rotate-45" />
          <Leaf className="absolute bottom-10 left-10 w-48 h-48 -rotate-12" />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5">
              <Reveal>
                <h2 className="text-4xl md:text-6xl font-light tracking-tighter leading-tight mb-10 uppercase">
                  Honest <br />{" "}
                  <span className="italic font-normal">Ingredients.</span>
                </h2>
                <p className="text-xl text-[#fdfcf7]/80 leading-relaxed font-light mb-12">
                  We disclose every component of our formulas. No hidden
                  fillers, no ambiguous "fragrance." Only the raw, powerful
                  components of nature.
                </p>
                <div className="flex items-center gap-6 text-[10px] uppercase tracking-widest font-bold">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4" /> Cruelty Free
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4" /> Vegan
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4" /> Eco-Cert
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {INGREDIENTS.map((ing, i) => (
                  <Reveal key={ing.name} delay={i * 0.1}>
                    <div className="p-8 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors group cursor-pointer">
                      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        {i === 0 ? (
                          <Sparkles className="w-5 h-5" />
                        ) : i === 1 ? (
                          <Droplets className="w-5 h-5" />
                        ) : i === 2 ? (
                          <Sun className="w-5 h-5" />
                        ) : (
                          <Wind className="w-5 h-5" />
                        )}
                      </div>
                      <h4 className="text-xl font-normal mb-1">{ing.name}</h4>
                      <span className="text-[10px] uppercase tracking-widest opacity-60 mb-4 block">
                        {ing.role}
                      </span>
                      <p className="text-xs text-[#fdfcf7]/70 leading-relaxed font-light">
                        {ing.desc}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          5. TESTIMONIALS / QUOTES
          ========================================== */}
      <section className="py-32 bg-[#f5f2e8] overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="relative flex whitespace-nowrap">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="flex gap-12 px-6"
            >
              {[...REVIEWS, ...REVIEWS].map((rev, i) => (
                <div
                  key={i}
                  className="w-[400px] md:w-[600px] bg-white p-12 md:p-20 rounded-[40px] whitespace-normal shrink-0 flex flex-col justify-center border border-[#8a9a5b]/10 shadow-xl shadow-[#8a9a5b]/5"
                >
                  <div className="flex gap-1 mb-8">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className="w-4 h-4 fill-[#d4b483] text-[#d4b483]"
                      />
                    ))}
                  </div>
                  <p className="text-2xl md:text-3xl font-light italic leading-relaxed text-[#2c2c2c] mb-10">
                    "{rev.text}"
                  </p>
                  <div>
                    <span className="text-sm font-bold uppercase tracking-widest text-[#2c2c2c]">
                      {rev.author}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-[#2c2c2c]/40 ml-4">
                      Verified Customer
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==========================================
          6. JOURNAL / STORYTELLING GRID
          ========================================== */}
      <section className="py-32 bg-[#fdfcf7]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <Reveal className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-[#8a9a5b] mb-6 block">
              The Journal
            </span>
            <h2 className="text-4xl md:text-6xl font-light tracking-tighter mb-8 uppercase">
              Rituals for the Soul.
            </h2>
            <p className="text-lg text-[#2c2c2c]/60 font-light">
              Deep dives into botanical lore, seasonal skincare transitions, and
              the mindfulness of beauty.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 h-full">
            <Reveal className="md:col-span-7 relative h-[500px] rounded-3xl overflow-hidden group cursor-pointer shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecee?q=80&w=1200&auto=format&fit=crop"
                alt="Journal"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2c2c2c]/80 via-transparent to-transparent" />
              <div className="absolute bottom-10 left-10 right-10">
                <span className="text-[10px] uppercase tracking-widest text-white/60 mb-4 block">
                  Sustainability
                </span>
                <h3 className="text-3xl md:text-4xl font-normal text-white mb-6 leading-tight">
                  The Lifecycle of a Glass Bottle.
                </h3>
                <button className="text-[10px] uppercase tracking-widest font-bold text-white border-b border-white/30 pb-1 hover:border-white transition-colors cursor-pointer">
                  Read Article
                </button>
              </div>
            </Reveal>

            <div className="md:col-span-5 flex flex-col gap-8 h-full">
              <Reveal
                delay={0.2}
                className="flex-1 relative rounded-3xl overflow-hidden group cursor-pointer bg-[#f5f2e8] p-10 flex flex-col justify-end border border-[#8a9a5b]/10"
              >
                <div className="mb-auto">
                  <span className="text-[10px] uppercase tracking-widest text-[#2c2c2c]/40 mb-4 block">
                    Seasonal
                  </span>
                  <h3 className="text-2xl font-normal text-[#2c2c2c] mb-6">
                    Transitioning your ritual into the winter months.
                  </h3>
                </div>
                <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest font-bold text-[#8a9a5b] cursor-pointer">
                  Read More <ChevronRight className="w-4 h-4" />
                </div>
              </Reveal>

              <Reveal
                delay={0.4}
                className="flex-1 relative rounded-3xl overflow-hidden group cursor-pointer shadow-lg"
              >
                <Image
                  src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=800&auto=format&fit=crop"
                  alt="Journal"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center p-10">
                  <div className="text-center">
                    <span className="text-[10px] uppercase tracking-widest text-white/80 mb-4 block">
                      Video Series
                    </span>
                    <h3 className="text-2xl font-normal text-white mb-6 uppercase">
                      Behind the harvest.
                    </h3>
                    <div className="w-12 h-12 rounded-full border border-white flex items-center justify-center mx-auto group-hover:bg-white group-hover:text-[#2c2c2c] transition-all">
                      <Play className="w-4 h-4 fill-current ml-1" />
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          7. MEGA FOOTER
          ========================================== */}
      <footer className="bg-[#2c2c2c] text-[#fdfcf7] pt-32 pb-12 px-6 md:px-12 relative overflow-hidden">
        {/* Subtle botanical patterns in footer */}
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] opacity-5 pointer-events-none">
          <Leaf className="w-full h-full rotate-45" />
        </div>

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start mb-32 gap-16">
            <div className="max-w-xl">
              <Reveal>
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tighter uppercase leading-[0.9] mb-10">
                  Join the <br />{" "}
                  <span className="italic font-normal">Movement.</span>
                </h2>
                <p className="text-xl text-[#fdfcf7]/60 font-light mb-12 leading-relaxed">
                  Subscribe to our journal for botanical insights, early access
                  to new rituals, and exclusive events.
                </p>
                <form
                  className="flex border-b border-[#fdfcf7]/20 pb-4 w-full md:w-[400px]"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="bg-transparent flex-1 text-lg font-light outline-none text-[#fdfcf7] placeholder-[#fdfcf7]/30"
                  />
                  <button
                    type="submit"
                    className="text-[10px] uppercase tracking-[0.3em] font-bold hover:text-[#8a9a5b] transition-colors cursor-pointer"
                  >
                    Submit
                  </button>
                </form>
              </Reveal>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-16 md:gap-24">
              <div>
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-[#8a9a5b] mb-10">
                  Rituals
                </h4>
                <ul className="space-y-4 text-sm font-light text-[#fdfcf7]/60">
                  <li>
                    <Link
                      href="#"
                      className="hover:text-white transition-colors cursor-pointer"
                    >
                      Face
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-white transition-colors cursor-pointer"
                    >
                      Body
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-white transition-colors cursor-pointer"
                    >
                      Sun
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-white transition-colors cursor-pointer"
                    >
                      Sets
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-white transition-colors cursor-pointer"
                    >
                      Gifting
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-[#8a9a5b] mb-10">
                  Science
                </h4>
                <ul className="space-y-4 text-sm font-light text-[#fdfcf7]/60">
                  <li>
                    <Link
                      href="#"
                      className="hover:text-white transition-colors cursor-pointer"
                    >
                      Ingredients
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-white transition-colors cursor-pointer"
                    >
                      Transparency
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-white transition-colors cursor-pointer"
                    >
                      Clinical Studies
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-white transition-colors cursor-pointer"
                    >
                      Sustainability
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-[#8a9a5b] mb-10">
                  Social
                </h4>
                <ul className="space-y-4 text-sm font-light text-[#fdfcf7]/60">
                  <li>
                    <Link
                      href="#"
                      className="hover:text-white transition-colors cursor-pointer flex items-center gap-3"
                    >
                      <Globe className="w-3 h-3" /> Globe
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-white transition-colors cursor-pointer flex items-center gap-3"
                    >
                      <Globe className="w-3 h-3" /> Globe
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-white transition-colors cursor-pointer flex items-center gap-3"
                    >
                      <Globe className="w-3 h-3" /> Pinterest
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-10 border-t border-[#fdfcf7]/10">
            <div className="text-[20px] font-light tracking-[0.2em] uppercase">
              PURETÉ
            </div>
            <div className="flex gap-8 text-[9px] uppercase tracking-widest text-[#fdfcf7]/40 font-bold">
              <span>
                &copy; {new Date().getFullYear()} Pureté Skincare Studio
              </span>
              <Link
                href="#"
                className="hover:text-white transition-colors cursor-pointer"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="hover:text-white transition-colors cursor-pointer"
              >
                Terms of Use
              </Link>
            </div>
            <div className="text-[9px] uppercase tracking-widest text-[#fdfcf7]/30">
              Designed for Resilience
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
