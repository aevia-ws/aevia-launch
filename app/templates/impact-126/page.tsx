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
import { ArrowRight, Utensils, Clock, MapPin, Phone, Globe, Calendar, ChefHat, Star, ChevronRight, Menu, X, Wine } from "lucide-react";

import "../premium.css";

/* ==========================================================================
   DATA STRUCTURES
   ========================================================================== */

const MENU_CATEGORIES = [
  "Antipasti",
  "Primi Piatti",
  "Secondi",
  "Dolci",
  "Vini",
];

const MENU_ITEMS = {
  Antipasti: [
    {
      name: "Burrata e Pomodorini",
      price: "€18",
      desc: "Fresh Apulian burrata, confit datterini tomatoes, basil emulsion, toasted pine nuts.",
      highlight: true,
    },
    {
      name: "Carpaccio di Manzo",
      price: "€22",
      desc: "Thinly sliced Fassona beef, 24-month Parmigiano Reggiano, wild rocket, white truffle oil.",
    },
    {
      name: "Vitello Tonnato",
      price: "€20",
      desc: "Slow-cooked veal loin, traditional tuna and caper sauce, cucunci.",
    },
    {
      name: "Fiori di Zucca",
      price: "€16",
      desc: "Crispy zucchini blossoms stuffed with ricotta and smoked provola, anchovy aioli.",
    },
  ],
  "Primi Piatti": [
    {
      name: "Cacio e Pepe",
      price: "€22",
      desc: "Tonnarelli pasta, Pecorino Romano DOP, toasted black pepper. Served from the cheese wheel.",
      highlight: true,
    },
    {
      name: "Agnolotti del Plin",
      price: "€26",
      desc: "Handmade Piedmontese ravioli stuffed with roasted meats, veal reduction, sage butter.",
    },
    {
      name: "Spaghetti alle Vongole",
      price: "€28",
      desc: "Artisanal spaghetti, Veraci clams, garlic, chili, parsley, white wine.",
    },
    {
      name: "Risotto allo Zafferano",
      price: "€30",
      desc: "Acquerello rice, Milanese saffron, bone marrow, 36-month Parmigiano.",
    },
  ],
  Secondi: [
    {
      name: "Ossobuco alla Milanese",
      price: "€38",
      desc: "Braised veal shank, traditional gremolata, served with saffron risotto.",
      highlight: true,
    },
    {
      name: "Branzino al Sale",
      price: "€42",
      desc: "Whole Mediterranean sea bass baked in sea salt crust, lemon emulsion, grilled asparagus.",
    },
    {
      name: "Bistecca alla Fiorentina",
      price: "€85",
      desc: "1.2kg Chianina beef T-bone, roasted potatoes, rosemary. (For 2 persons)",
    },
    {
      name: "Melanzane alla Parmigiana",
      price: "€24",
      desc: "Layered eggplant, San Marzano tomato sauce, mozzarella di bufala, fresh basil.",
    },
  ],
  Dolci: [
    {
      name: "Tiramisù Classico",
      price: "€12",
      desc: "Mascarpone cream, savoiardi dipped in espresso, bitter cocoa powder.",
      highlight: true,
    },
    {
      name: "Panna Cotta",
      price: "€10",
      desc: "Vanilla bean panna cotta, wild berry coulis, almond crumble.",
    },
    {
      name: "Cannolo Siciliano",
      price: "€11",
      desc: "Crispy pastry shell, sheep's milk ricotta, candied orange peel, pistachios.",
    },
  ],
  Vini: [
    {
      name: "Barolo DOCG 'Monfortino' 2013",
      price: "€450",
      desc: "Giacomo Conterno. Nebbiolo. Complex, structured, notes of tar and roses.",
    },
    {
      name: "Brunello di Montalcino 2016",
      price: "€120",
      desc: "Biondi-Santi. Sangiovese Grosso. Elegant, bright cherry, leather.",
    },
    {
      name: "Franciacorta Cuvée Prestige",
      price: "€85",
      desc: "Ca' del Bosco. Chardonnay, Pinot Bianco, Pinot Nero. Fine perlage, citrus notes.",
      highlight: true,
    },
  ],
};

const REVIEWS = [
  {
    text: "The most authentic Cacio e Pepe outside of Rome. The atmosphere is undeniably warm and inviting.",
    author: "Alexander P.",
    rating: 5,
    date: "October 2025",
  },
  {
    text: "Impeccable service and an outstanding wine list. The Ossobuco transported me straight to Milan.",
    author: "Sophia R.",
    rating: 5,
    date: "September 2025",
  },
  {
    text: "A hidden gem. The Burrata was incredibly fresh, and the handmade Agnolotti were to die for.",
    author: "James M.",
    rating: 5,
    date: "August 2025",
  },
  {
    text: "Perfect for an anniversary dinner. They made us feel like family from the moment we walked in.",
    author: "Elena C.",
    rating: 5,
    date: "July 2025",
  },
];

const GALLERY = [
  "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1582296726210-67c9c0f99478?q=80&w=800&auto=format&fit=crop",
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

export default function TrattoriaMenuPage() {
  const [activeCategory, setActiveCategory] = useState("Primi Piatti");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [reservationOpen, setReservationOpen] = useState(false);

  // Parallax
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], [0, 300]);
  const heroOpacity = useTransform(scrollY, [0, 800], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="premium-theme min-h-screen bg-[#1c1815] text-[#f4ecd8] font-serif selection:bg-[#d97736]/30 selection:text-white">
      {/* ==========================================
          RESERVATION MODAL
          ========================================== */}
      <AnimatePresence>
        {reservationOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setReservationOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-[#1c1815] border border-[#d97736]/30 p-8 md:p-12 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#d97736]/10 blur-[50px] rounded-full pointer-events-none" />

              <button
                onClick={() => setReservationOpen(false)}
                className="absolute top-6 right-6 text-white/50 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>

              <h3 className="text-3xl font-medium mb-2 text-[#d97736]">
                Reserve a Table
              </h3>
              <p className="text-white/60 font-sans text-sm mb-8">
                Join us for an unforgettable culinary journey.
              </p>

              <form
                className="space-y-6 font-sans"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      className="w-full bg-[#110e0c] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#d97736] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">
                      Time
                    </label>
                    <select className="w-full bg-[#110e0c] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#d97736] transition-colors appearance-none">
                      <option>19:00</option>
                      <option>19:30</option>
                      <option>20:00</option>
                      <option>20:30</option>
                      <option>21:00</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">
                    Guests
                  </label>
                  <select className="w-full bg-[#110e0c] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#d97736] transition-colors appearance-none">
                    <option>2 Guests</option>
                    <option>3 Guests</option>
                    <option>4 Guests</option>
                    <option>5+ Guests (Call Us)</option>
                  </select>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-[#d97736] text-white py-4 text-xs font-bold uppercase tracking-widest hover:bg-[#b85b20] transition-colors"
                  >
                    Confirm Reservation
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==========================================
          NAVIGATION
          ========================================== */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-[#1c1815]/90 backdrop-blur-md border-b border-[#d97736]/20 py-4" : "bg-transparent py-8"}`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden text-[#f4ecd8]"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="hidden md:flex items-center gap-8 text-[11px] font-sans uppercase tracking-[0.2em] font-medium text-[#f4ecd8]/70">
            <Link href="#" className="hover:text-[#d97736] transition-colors">
              Il Menu
            </Link>
            <Link href="#" className="hover:text-[#d97736] transition-colors">
              La Storia
            </Link>
            <Link href="#" className="hover:text-[#d97736] transition-colors">
              Gallery
            </Link>
          </div>

          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 text-2xl md:text-3xl font-medium tracking-widest uppercase text-[#d97736]"
          >
            Sartoria
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <a
              href="tel:+39021234567"
              className="text-[11px] font-sans uppercase tracking-widest text-[#f4ecd8]/70 hover:text-[#d97736] transition-colors hidden lg:block"
            >
              +39 02 1234 567
            </a>
            <button
              onClick={() => setReservationOpen(true)}
              className="px-6 py-2 border border-[#d97736] text-[#d97736] text-[10px] font-sans uppercase tracking-widest hover:bg-[#d97736] hover:text-white transition-colors"
            >
              Prenota
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ type: "tween", duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-[#1c1815] flex flex-col p-6"
          >
            <div className="flex justify-end mb-16">
              <button onClick={() => setMenuOpen(false)}>
                <X className="w-8 h-8 text-[#d97736]" />
              </button>
            </div>
            <div className="flex flex-col gap-8 text-3xl font-light items-center">
              <Link href="#" onClick={() => setMenuOpen(false)}>
                Il Menu
              </Link>
              <Link href="#" onClick={() => setMenuOpen(false)}>
                La Vigna
              </Link>
              <Link href="#" onClick={() => setMenuOpen(false)}>
                La Storia
              </Link>
              <Link href="#" onClick={() => setMenuOpen(false)}>
                Contatti
              </Link>
            </div>
            <button
              onClick={() => {
                setMenuOpen(false);
                setReservationOpen(true);
              }}
              className="mt-auto mb-12 w-full py-4 bg-[#d97736] text-white text-xs font-sans font-bold uppercase tracking-widest text-center"
            >
              Prenota un Tavolo
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==========================================
          1. HERO SECTION
          ========================================== */}
      <section className="relative w-full h-[90svh] overflow-hidden flex items-center justify-center">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2000&auto=format&fit=crop"
            alt="Restaurant Interior"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1c1815] via-black/50 to-black/20" />
        </motion.div>

        <div className="relative z-10 text-center px-6 mt-20 max-w-4xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="flex items-center justify-center gap-4 text-[#d97736] text-[10px] font-sans uppercase tracking-[0.3em] font-bold mb-6">
              <div className="w-8 h-[1px] bg-[#d97736]" /> Milano{" "}
              <div className="w-8 h-[1px] bg-[#d97736]" />
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-6xl md:text-8xl lg:text-[8rem] font-medium leading-[0.9] mb-8"
          >
            Cucina <br />
            <span className="italic text-[#d97736]">Autentica.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <p className="text-lg text-white/70 max-w-xl mx-auto font-sans font-light mb-10">
              A celebration of Italian culinary heritage. Sourced locally,
              crafted passionately, and served with familial warmth.
            </p>
            <button
              onClick={() => setReservationOpen(true)}
              className="px-10 py-4 bg-[#d97736] text-white text-[10px] font-sans uppercase tracking-widest font-bold hover:bg-[#b85b20] transition-colors"
            >
              Reserve Your Experience
            </button>
          </motion.div>
        </div>
      </section>

      {/* ==========================================
          2. THE CHEF'S MESSAGE
          ========================================== */}
      <section className="py-24 md:py-32 px-6 bg-[#1c1815] relative z-10 border-b border-white/5">
        <div className="max-w-[1000px] mx-auto text-center">
          <Reveal>
            <ChefHat className="w-12 h-12 text-[#d97736] mx-auto mb-8" />
            <h2 className="text-3xl md:text-5xl font-light leading-relaxed mb-8">
              "We don't cook to impress. We cook to{" "}
              <span className="italic text-[#d97736]">remember</span>. Every
              recipe carries the history of our ancestors, passed down from
              hands to hands."
            </h2>
            <span className="font-sans text-[11px] uppercase tracking-widest text-white/50 block mb-2">
              Marco Rossi
            </span>
            <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-[#d97736]">
              Executive Chef
            </span>
          </Reveal>
        </div>
      </section>

      {/* ==========================================
          3. THE MENU (Interactive Tabs)
          ========================================== */}
      <section className="py-24 md:py-32 bg-[#110e0c] relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#d97736]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
          <Reveal className="text-center mb-16">
            <span className="font-sans text-[10px] text-[#d97736] uppercase tracking-[0.3em] font-bold block mb-4">
              La Carta
            </span>
            <h2 className="text-4xl md:text-6xl font-medium">Our Menu</h2>
          </Reveal>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-16 font-sans">
            {MENU_CATEGORIES.map((cat, i) => (
              <Reveal key={cat} delay={i * 0.1}>
                <button
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[11px] md:text-xs uppercase tracking-widest pb-2 border-b-2 transition-all ${activeCategory === cat ? "border-[#d97736] text-[#d97736] font-bold" : "border-transparent text-white/50 hover:text-white"}`}
                >
                  {cat}
                </button>
              </Reveal>
            ))}
          </div>

          {/* Menu Items List */}
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-10"
              >
                {MENU_ITEMS[activeCategory as keyof typeof MENU_ITEMS].map(
                  (item, i) => (
                    <div
                      key={i}
                      className="group flex flex-col sm:flex-row sm:items-end justify-between gap-4"
                    >
                      <div className="flex-1 pr-0 sm:pr-8">
                        <div className="flex items-center gap-4 mb-2">
                          <h3
                            className={`text-2xl font-medium ${item.highlight ? "text-[#d97736]" : "text-white"}`}
                          >
                            {item.name}
                          </h3>
                          {item.highlight && (
                            <span className="px-2 py-0.5 border border-[#d97736] text-[#d97736] text-[8px] font-sans uppercase tracking-widest rounded-full">
                              Chef's Pick
                            </span>
                          )}
                        </div>
                        <p className="font-sans text-sm text-white/60 leading-relaxed max-w-xl">
                          {item.desc}
                        </p>
                      </div>

                      {/* Dotted line for desktop */}
                      <div className="hidden sm:block flex-1 border-b border-white/10 mb-2 border-dashed group-hover:border-[#d97736]/50 transition-colors" />

                      <span className="text-xl font-medium text-[#d97736] shrink-0 sm:mb-2">
                        {item.price}
                      </span>
                    </div>
                  ),
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-20 text-center flex flex-col items-center">
            <p className="font-sans text-xs text-white/40 max-w-md mx-auto mb-8">
              Please inform your server of any allergies or dietary
              requirements. A 12.5% discretionary service charge will be added
              to your bill.
            </p>
            <button className="flex items-center gap-3 font-sans text-[11px] text-[#d97736] uppercase tracking-widest font-bold hover:text-white transition-colors">
              Download Full PDF Menu <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ==========================================
          4. GALLERY BENTO GRID
          ========================================== */}
      <section className="py-24 bg-[#1c1815] px-6">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 h-[800px]">
          <Reveal className="md:col-span-2 h-full relative group overflow-hidden">
            <Image
              src={GALLERY[0]}
              alt="Restaurant"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-[2s]"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
            <div className="absolute bottom-8 left-8">
              <span className="text-[#d97736] font-sans text-[10px] uppercase tracking-widest font-bold mb-2 block">
                Atmosphere
              </span>
              <h3 className="text-3xl">The Main Dining Room</h3>
            </div>
          </Reveal>

          <div className="grid grid-rows-2 gap-4 h-full">
            <Reveal delay={0.1} className="relative group overflow-hidden">
              <Image
                src={GALLERY[1]}
                alt="Wine"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-[2s]"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
            </Reveal>
            <Reveal
              delay={0.2}
              className="relative group overflow-hidden bg-[#d97736] p-8 flex flex-col justify-center text-[#1c1815]"
            >
              <Wine className="w-12 h-12 mb-6" />
              <h3 className="text-3xl font-medium mb-4">La Cantina</h3>
              <p className="font-sans text-sm font-medium opacity-80 leading-relaxed">
                Explore our curated selection of over 400 labels, focusing
                heavily on Piedmont and Tuscany's finest estates.
              </p>
              <button className="mt-8 self-start w-10 h-10 border border-[#1c1815] rounded-full flex items-center justify-center hover:bg-[#1c1815] hover:text-[#d97736] transition-colors">
                <ArrowRight className="w-4 h-4" />
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ==========================================
          5. REVIEWS MARQUEE
          ========================================== */}
      <section className="py-32 bg-[#110e0c] border-y border-white/5 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 mb-16 text-center">
          <span className="font-sans text-[10px] text-[#d97736] uppercase tracking-[0.3em] font-bold block mb-4">
            Dicono Di Noi
          </span>
          <h2 className="text-4xl md:text-5xl font-medium">
            Guest Experiences
          </h2>
        </div>

        <div className="relative flex whitespace-nowrap">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#110e0c] to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#110e0c] to-transparent z-10" />

          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="flex gap-8 px-4"
          >
            {[...REVIEWS, ...REVIEWS].map((r, i) => (
              <div
                key={i}
                className="w-[350px] md:w-[400px] bg-[#1c1815] border border-white/5 p-8 whitespace-normal shrink-0"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(r.rating)].map((_, j) => (
                    <Star
                      key={j}
                      className="w-4 h-4 fill-[#d97736] text-[#d97736]"
                    />
                  ))}
                </div>
                <p className="text-lg italic text-white/80 leading-relaxed mb-8">
                  "{r.text}"
                </p>
                <div className="font-sans">
                  <div className="text-sm font-bold text-[#d97736]">
                    {r.author}
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-white/40">
                    {r.date}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==========================================
          6. MEGA FOOTER & INFO
          ========================================== */}
      <footer className="bg-[#1c1815] pt-32 pb-12 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#d97736]/5 blur-[150px] rounded-t-full pointer-events-none" />

        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
            <div className="lg:col-span-2">
              <h2 className="text-4xl md:text-6xl font-medium mb-8">
                Sartoria
              </h2>
              <p className="font-sans text-sm text-white/60 max-w-sm leading-relaxed mb-8">
                Bringing the soul of Italian culinary tradition to the heart of
                the city. A place for family, friends, and unforgettable
                flavors.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-[#d97736] hover:text-[#d97736] transition-colors"
                >
                  <Globe className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-[#d97736] hover:text-[#d97736] transition-colors"
                >
                  <Globe className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="font-sans">
              <h4 className="text-[10px] text-[#d97736] uppercase tracking-[0.2em] font-bold mb-6">
                Orari di Apertura
              </h4>
              <ul className="space-y-4 text-sm text-white/70">
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span>Mon - Thu</span>
                  <span>18:00 - 23:00</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span>Fri - Sat</span>
                  <span>18:00 - 00:00</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-2 text-[#d97736]">
                  <span>Sunday</span>
                  <span>12:00 - 16:00 (Pranzo)</span>
                </li>
              </ul>
            </div>

            <div className="font-sans">
              <h4 className="text-[10px] text-[#d97736] uppercase tracking-[0.2em] font-bold mb-6">
                Contatti
              </h4>
              <ul className="space-y-4 text-sm text-white/70">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#d97736] shrink-0 mt-1" />
                  <span>
                    Via Brera, 24
                    <br />
                    20121 Milano MI
                    <br />
                    Italy
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#d97736]" />
                  <span>+39 02 1234 567</span>
                </li>
                <li className="pt-4">
                  <button
                    onClick={() => setReservationOpen(true)}
                    className="w-full py-3 bg-[#d97736] text-white text-[10px] uppercase tracking-widest font-bold hover:bg-[#b85b20] transition-colors"
                  >
                    Prenota Subito
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/10 font-sans text-[10px] text-white/40 uppercase tracking-widest">
            <span>
              &copy; {new Date().getFullYear()} Ristorante Sartoria. All rights
              reserved.
            </span>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Press
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
