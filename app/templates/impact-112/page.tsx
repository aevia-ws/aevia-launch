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
import { ShoppingBag, Menu, X, ArrowRight, Globe, Search, Heart, ChevronRight, Check, Plus, Minus, ArrowUpRight } from "lucide-react";

import "../premium.css";

/* ==========================================================================
   DATA STRUCTURES
   ========================================================================== */

const CATEGORIES = [
  "All",
  "Ceramics",
  "Textiles",
  "Woodwork",
  "Glass",
  "Objects",
];

const PRODUCTS = [
  {
    id: "p1",
    name: "Kinoko Vase",
    category: "Ceramics",
    price: 145,
    image:
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=800&auto=format&fit=crop",
    hoverImage:
      "https://images.unsplash.com/photo-1610701596082-8b4382570086?q=80&w=800&auto=format&fit=crop",
    material: "Stoneware",
    dimensions: "H: 24cm W: 15cm",
    badge: "New",
  },
  {
    id: "p2",
    name: "Aura Serving Bowl",
    category: "Ceramics",
    price: 85,
    image:
      "https://images.unsplash.com/photo-1610555356070-d0efb6505f81?q=80&w=800&auto=format&fit=crop",
    hoverImage:
      "https://images.unsplash.com/photo-1610555356262-6e27931f3e79?q=80&w=800&auto=format&fit=crop",
    material: "Porcelain",
    dimensions: "D: 30cm",
  },
  {
    id: "p3",
    name: "Loom Throw",
    category: "Textiles",
    price: 220,
    image:
      "https://images.unsplash.com/photo-1584950394333-a442e391bbf4?q=80&w=800&auto=format&fit=crop",
    hoverImage:
      "https://images.unsplash.com/photo-1584950393693-0105fb9017e9?q=80&w=800&auto=format&fit=crop",
    material: "Organic Cotton",
    dimensions: "130x180cm",
    badge: "Bestseller",
  },
  {
    id: "p4",
    name: "Walnut Serving Board",
    category: "Woodwork",
    price: 95,
    image:
      "https://images.unsplash.com/photo-1588661642878-cb9499806b02?q=80&w=800&auto=format&fit=crop",
    hoverImage:
      "https://images.unsplash.com/photo-1588661642921-2a1296c05eb7?q=80&w=800&auto=format&fit=crop",
    material: "European Walnut",
    dimensions: "L: 45cm W: 20cm",
  },
  {
    id: "p5",
    name: "Solstice Tumblers (Set of 2)",
    category: "Glass",
    price: 65,
    image:
      "https://images.unsplash.com/photo-1596021689366-4dcebc49666b?q=80&w=800&auto=format&fit=crop",
    hoverImage:
      "https://images.unsplash.com/photo-1596021689408-012abcfaf044?q=80&w=800&auto=format&fit=crop",
    material: "Borosilicate Glass",
    dimensions: "250ml",
  },
  {
    id: "p6",
    name: "Dune Sculptural Candle",
    category: "Objects",
    price: 45,
    image:
      "https://images.unsplash.com/photo-1603006905393-27e46e88fb7c?q=80&w=800&auto=format&fit=crop",
    hoverImage:
      "https://images.unsplash.com/photo-1603006905537-8b0244192ce0?q=80&w=800&auto=format&fit=crop",
    material: "Beeswax & Soy",
    dimensions: "H: 15cm",
  },
  {
    id: "p7",
    name: "Terra Pitcher",
    category: "Ceramics",
    price: 115,
    image:
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=800&auto=format&fit=crop",
    hoverImage:
      "https://images.unsplash.com/photo-1578749556608-8e8e7a08083f?q=80&w=800&auto=format&fit=crop",
    material: "Terracotta",
    dimensions: "Vol: 1.5L",
  },
  {
    id: "p8",
    name: "Ash Dining Chair",
    category: "Woodwork",
    price: 450,
    image:
      "https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=800&auto=format&fit=crop",
    hoverImage:
      "https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=800&auto=format&fit=crop",
    material: "Ash Wood & Linen",
    dimensions: "Standard",
    badge: "Made to order",
  },
];

const PROCESS_STEPS = [
  {
    num: "01",
    title: "Material Sourcing",
    desc: "We partner directly with small-scale farmers, clay quarries, and sustainable forests across Europe.",
  },
  {
    num: "02",
    title: "The Craft",
    desc: "Every piece is shaped, fired, woven, or carved by hand in our studios by master artisans.",
  },
  {
    num: "03",
    title: "Quality Check",
    desc: "Imperfections are celebrated, but structural integrity is rigorously tested before any item ships.",
  },
  {
    num: "04",
    title: "Conscious Packaging",
    desc: "Plastic-free, biodegradable, and beautiful packaging designed to minimize our carbon footprint.",
  },
];

const FAQS = [
  {
    question: "How should I care for my ceramics?",
    answer:
      "All our stoneware and porcelain pieces are dishwasher and microwave safe, unless they feature gold luster. Hand washing is always gentler and will extend the life of the piece.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes, we ship worldwide. Shipping costs are calculated at checkout based on weight and destination. Please note that customs duties may apply for non-EU deliveries.",
  },
  {
    question: "Can I commission a custom piece?",
    answer:
      "We take on a limited number of bespoke commissions each quarter for interior designers and private clients. Please reach out via our contact page to discuss your project.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We accept returns within 14 days of delivery. Items must be unused and in their original packaging. Return shipping costs are the responsibility of the customer.",
  },
  {
    question: "Are your glazes food-safe?",
    answer:
      "Absolutely. All functional ceramics are glazed with 100% lead-free, food-safe glazes formulated in-house at our studio.",
  },
];

const INSTAGRAM_FEED = [
  "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1584950394333-a442e391bbf4?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1603006905393-27e46e88fb7c?q=80&w=400&auto=format&fit=crop",
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
  const inView = useInView(ref, { once: true, margin: "-100px" });
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

function Accordion({ items }: { items: typeof FAQS }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="w-full border-t border-[#3e3a35]/20">
      {items.map((item, i) => (
        <div key={i} className="border-b border-[#3e3a35]/20">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full py-6 md:py-8 flex items-center justify-between text-left group"
          >
            <span
              className={`text-lg md:text-xl font-medium transition-colors ${openIndex === i ? "text-[#3e3a35]" : "text-[#3e3a35]/60 group-hover:text-[#3e3a35]"}`}
            >
              {item.question}
            </span>
            <div className="relative w-6 h-6 flex items-center justify-center shrink-0">
              <motion.div
                animate={{ rotate: openIndex === i ? 180 : 0 }}
                className="absolute w-full h-[1.5px] bg-[#3e3a35] transition-colors"
              />
              <motion.div
                animate={{ rotate: openIndex === i ? 180 : 90 }}
                className="absolute w-full h-[1.5px] bg-[#3e3a35] transition-colors"
              />
            </div>
          </button>
          <AnimatePresence>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="overflow-hidden"
              >
                <p className="pb-8 text-[#3e3a35]/70 text-base leading-relaxed max-w-3xl">
                  {item.answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

/* ==========================================================================
   MAIN PAGE COMPONENT
   ========================================================================== */

export default function ArtisanMinimalPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartItems, setCartItems] = useState<
    { product: (typeof PRODUCTS)[0]; qty: number }[]
  >([]);

  // Parallax
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 800], [0, 250]);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredProducts =
    activeCategory === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  const addToCart = (product: (typeof PRODUCTS)[0]) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.product.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item,
        );
      }
      return [...prev, { product, qty: 1 }];
    });
    setCartOpen(true);
  };

  const updateQty = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === id) {
            const newQty = Math.max(0, item.qty + delta);
            return { ...item, qty: newQty };
          }
          return item;
        })
        .filter((item) => item.qty > 0),
    );
  };

  const cartTotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.qty,
    0,
  );

  return (
    <div className="premium-theme min-h-screen bg-[#f9f7f4] text-[#3e3a35] selection:bg-[#3e3a35] selection:text-[#f9f7f4] font-sans">
      {/* ==========================================
          ANNOUNCEMENT BAR
          ========================================== */}
      <div className="bg-[#3e3a35] text-[#f9f7f4] text-center py-2 text-[10px] uppercase tracking-widest font-medium">
        Free worldwide shipping on orders over €200
      </div>

      {/* ==========================================
          NAVIGATION
          ========================================== */}
      <header
        className={`sticky top-0 z-40 transition-all duration-500 ${scrolled ? "bg-[#f9f7f4]/90 backdrop-blur-md border-b border-[#3e3a35]/10 py-4" : "bg-transparent py-6"}`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-6 md:hidden">
            <button onClick={() => setMenuOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
            <Search className="w-5 h-5 opacity-60" />
          </div>

          <div className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-widest font-medium">
            <Link href="#" className="hover:opacity-60 transition-opacity">
              Shop
            </Link>
            <Link href="#" className="hover:opacity-60 transition-opacity">
              Studio
            </Link>
            <Link href="#" className="hover:opacity-60 transition-opacity">
              Journal
            </Link>
          </div>

          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 text-2xl tracking-[0.2em] font-medium uppercase text-center"
          >
            Atelier
            <br />
            <span className="text-xs font-light tracking-[0.4em] opacity-60">
              Minimal
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <Search className="w-5 h-5 hidden md:block opacity-60 hover:opacity-100 transition-opacity cursor-pointer" />
            <button
              className="relative opacity-60 hover:opacity-100 transition-opacity group"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#3e3a35] text-[#f9f7f4] text-[9px] flex items-center justify-center font-bold">
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ==========================================
          MOBILE MENU
          ========================================== */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ type: "tween", duration: 0.4 }}
            className="fixed inset-0 z-50 bg-[#f9f7f4] flex flex-col p-6"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="text-xl tracking-widest uppercase font-medium">
                Menu
              </span>
              <button onClick={() => setMenuOpen(false)}>
                <X className="w-8 h-8 opacity-60" />
              </button>
            </div>
            <div className="flex flex-col gap-8 text-3xl font-light">
              <Link href="#" onClick={() => setMenuOpen(false)}>
                Shop
              </Link>
              <Link href="#" onClick={() => setMenuOpen(false)}>
                Collections
              </Link>
              <Link href="#" onClick={() => setMenuOpen(false)}>
                Studio
              </Link>
              <Link href="#" onClick={() => setMenuOpen(false)}>
                Journal
              </Link>
              <Link href="#" onClick={() => setMenuOpen(false)}>
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 z-50 bg-[#3e3a35]/20 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.4 }}
              className="fixed top-0 right-0 w-full md:w-[450px] h-full bg-[#f9f7f4] z-[60] shadow-2xl flex flex-col"
            >
              <div className="p-6 md:p-8 flex justify-between items-center border-b border-[#3e3a35]/10 bg-[#f9f7f4]">
                <span className="text-sm uppercase tracking-widest font-medium">
                  Cart ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                </span>
                <button onClick={() => setCartOpen(false)}>
                  <X className="w-6 h-6 opacity-60 hover:opacity-100" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 md:p-8">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                    <ShoppingBag className="w-12 h-12 mb-4 stroke-[1px]" />
                    <p>Your cart is empty.</p>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {cartItems.map((item) => (
                      <div key={item.product.id} className="flex gap-6">
                        <div className="relative w-24 h-32 bg-[#eae7e0]">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 flex flex-col">
                          <div className="flex justify-between mb-1">
                            <h4 className="font-medium">{item.product.name}</h4>
                            <span>€{item.product.price}</span>
                          </div>
                          <span className="text-xs text-[#3e3a35]/50 mb-auto">
                            {item.product.material}
                          </span>

                          <div className="flex items-center gap-4 mt-4 border border-[#3e3a35]/20 w-fit rounded-full px-3 py-1">
                            <button
                              onClick={() => updateQty(item.product.id, -1)}
                              className="opacity-50 hover:opacity-100"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-medium w-4 text-center">
                              {item.qty}
                            </span>
                            <button
                              onClick={() => updateQty(item.product.id, 1)}
                              className="opacity-50 hover:opacity-100"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="p-6 md:p-8 border-t border-[#3e3a35]/10 bg-[#f9f7f4]">
                  <div className="flex justify-between mb-6 text-lg font-medium">
                    <span>Subtotal</span>
                    <span>€{cartTotal}</span>
                  </div>
                  <p className="text-xs text-[#3e3a35]/50 mb-6">
                    Taxes and shipping calculated at checkout.
                  </p>
                  <button className="w-full bg-[#3e3a35] text-[#f9f7f4] py-4 text-[11px] uppercase tracking-widest font-medium hover:bg-black transition-colors">
                    Checkout
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ==========================================
          1. HERO SECTION
          ========================================== */}
      <section className="relative w-full h-[85vh] overflow-hidden flex flex-col items-center justify-center p-6 bg-[#eae7e0]">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-4 md:inset-8 z-0 overflow-hidden rounded-2xl"
        >
          <Image
            src="https://images.unsplash.com/photo-1610701596082-8b4382570086?q=80&w=1600&auto=format&fit=crop"
            alt="Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/10" />
        </motion.div>

        <div className="relative z-10 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-[7rem] text-[#f9f7f4] font-medium tracking-tight mb-6">
              Objects of Meaning
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <p className="text-[#f9f7f4]/90 text-lg md:text-xl max-w-lg mb-10 font-light">
              Elevate your everyday rituals with sustainably crafted, timeless
              artisan goods.
            </p>
            <button className="bg-[#f9f7f4] text-[#3e3a35] px-8 py-3.5 rounded-full text-[11px] uppercase tracking-widest font-semibold hover:scale-105 transition-transform">
              Shop the Collection
            </button>
          </motion.div>
        </div>
      </section>

      {/* ==========================================
          2. FEATURED CATEGORIES (Marquee)
          ========================================== */}
      <section className="py-12 border-b border-[#3e3a35]/10 overflow-hidden bg-[#f9f7f4]">
        <div className="relative flex whitespace-nowrap">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex gap-16 px-8 items-center text-2xl md:text-4xl font-light"
          >
            {[...CATEGORIES, ...CATEGORIES, ...CATEGORIES].map((cat, i) => (
              <div key={i} className="flex items-center gap-16">
                <span className="hover:italic cursor-pointer transition-all">
                  {cat}
                </span>
                <span className="text-[#3e3a35]/20">/</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==========================================
          3. FULL PRODUCT GRID
          ========================================== */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight">
            New Arrivals
          </h2>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 justify-center">
            {CATEGORIES.slice(0, 4).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[11px] uppercase tracking-widest font-medium pb-1 border-b-2 transition-all ${activeCategory === cat ? "border-[#3e3a35] text-[#3e3a35]" : "border-transparent text-[#3e3a35]/50 hover:text-[#3e3a35]"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group relative"
              >
                {/* Image Container */}
                <Link
                  href="#"
                  className="block relative aspect-[3/4] bg-[#eae7e0] overflow-hidden mb-5"
                >
                  {product.badge && (
                    <span className="absolute top-4 left-4 z-20 px-3 py-1 bg-[#3e3a35] text-[#f9f7f4] text-[9px] uppercase tracking-widest font-bold">
                      {product.badge}
                    </span>
                  )}
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-opacity duration-500 group-hover:opacity-0"
                  />
                  <Image
                    src={product.hoverImage || product.image}
                    alt={product.name}
                    fill
                    className="object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-105 group-hover:scale-100"
                  />

                  {/* Hover Add to Cart Button */}
                  <div className="absolute inset-x-4 bottom-4 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(product);
                      }}
                      className="w-full bg-[#f9f7f4]/90 backdrop-blur-sm text-[#3e3a35] py-3 text-[11px] uppercase tracking-widest font-semibold hover:bg-[#3e3a35] hover:text-[#f9f7f4] transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </Link>

                {/* Details */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium mb-1">
                      <Link href="#">{product.name}</Link>
                    </h3>
                    <p className="text-sm text-[#3e3a35]/50">
                      {product.material}
                    </p>
                  </div>
                  <span className="text-lg">€{product.price}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-20 text-center">
          <button className="border border-[#3e3a35] px-10 py-3.5 text-[11px] uppercase tracking-widest font-semibold hover:bg-[#3e3a35] hover:text-[#f9f7f4] transition-colors">
            View All Products
          </button>
        </div>
      </section>

      {/* ==========================================
          4. BRAND PHILOSOPHY / PROCESS
          ========================================== */}
      <section className="py-24 md:py-32 bg-[#eae7e0]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <Reveal className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-tl-full rounded-tr-full overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1610555356070-d0efb6505f81?q=80&w=1200&auto=format&fit=crop"
              alt="Process"
              fill
              className="object-cover"
            />
          </Reveal>

          <div>
            <Reveal>
              <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-8">
                Crafted with Intention.
              </h2>
              <p className="text-lg md:text-xl text-[#3e3a35]/70 font-light leading-relaxed mb-16">
                We believe in fewer, better things. Every object in our
                collection is created slowly, deliberately, and respectfully by
                independent artisans who have mastered their craft over
                generations.
              </p>
            </Reveal>

            <div className="space-y-10">
              {PROCESS_STEPS.map((step, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="flex gap-6 group">
                    <span className="text-sm font-medium opacity-40">
                      {step.num}
                    </span>
                    <div>
                      <h4 className="text-xl font-medium mb-2">{step.title}</h4>
                      <p className="text-[#3e3a35]/60 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.4}>
              <button className="mt-12 flex items-center gap-3 text-[11px] uppercase tracking-widest font-semibold border-b border-[#3e3a35] pb-1 hover:opacity-60 transition-opacity">
                Read our full story <ArrowRight className="w-4 h-4" />
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ==========================================
          5. BENTO GRID (Highlight features)
          ========================================== */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <Reveal className="md:col-span-2 lg:col-span-2 relative aspect-square md:aspect-[2/1] bg-[#eae7e0] p-10 flex flex-col justify-between overflow-hidden group">
            <Image
              src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=800&auto=format&fit=crop"
              alt="Ceramics"
              fill
              className="object-cover opacity-30 group-hover:scale-105 transition-transform duration-1000 mix-blend-multiply"
            />
            <div className="relative z-10">
              <span className="px-3 py-1 bg-white text-[#3e3a35] text-[9px] uppercase tracking-widest font-bold rounded-full mb-6 inline-block">
                Collection
              </span>
              <h3 className="text-3xl md:text-4xl font-medium">
                The Terra Series
              </h3>
            </div>
            <div className="relative z-10">
              <button className="bg-[#3e3a35] text-[#f9f7f4] w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </Reveal>

          <Reveal
            delay={0.1}
            className="relative aspect-square bg-[#3e3a35] text-[#f9f7f4] p-10 flex flex-col justify-center items-center text-center"
          >
            <Heart className="w-8 h-8 mb-6 opacity-80" />
            <h3 className="text-2xl font-medium mb-4">Ethically Made</h3>
            <p className="opacity-70 text-sm leading-relaxed">
              Fair wages, safe conditions, and traditional techniques preserved.
            </p>
          </Reveal>

          <Reveal
            delay={0.2}
            className="relative aspect-square bg-[#eae7e0] p-10 flex flex-col justify-between group overflow-hidden"
          >
            <Image
              src="https://images.unsplash.com/photo-1584950394333-a442e391bbf4?q=80&w=800&auto=format&fit=crop"
              alt="Textiles"
              fill
              className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            />
            <div className="relative z-10 group-hover:opacity-0 transition-opacity">
              <h3 className="text-2xl font-medium">Textiles</h3>
              <p className="opacity-60 text-sm mt-2">Organic cotton & linen</p>
            </div>
            <div className="relative z-10 flex justify-end group-hover:opacity-0 transition-opacity">
              <ArrowUpRight className="w-6 h-6 opacity-40" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ==========================================
          6. INSTAGRAM FEED
          ========================================== */}
      <section className="py-24 border-t border-[#3e3a35]/10">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 mb-12 flex justify-between items-end">
          <Reveal>
            <h2 className="text-3xl font-medium">Follow the Studio</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <a
              href="#"
              className="flex items-center gap-2 text-[11px] uppercase tracking-widest font-semibold hover:opacity-60 transition-opacity"
            >
              <Globe className="w-4 h-4" /> @atelierminimal
            </a>
          </Reveal>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-4 px-2 md:px-6">
          {INSTAGRAM_FEED.map((img, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <a
                href="#"
                className="block relative aspect-square bg-[#eae7e0] group overflow-hidden"
              >
                <Image
                  src={img}
                  alt="Globe post"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-[#3e3a35]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Globe className="w-8 h-8 text-white" />
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ==========================================
          7. FAQ
          ========================================== */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-[1000px] mx-auto border-t border-[#3e3a35]/10">
        <Reveal className="text-center mb-16">
          <h2 className="text-4xl font-medium tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-[#3e3a35]/60 text-lg">
            Everything you need to know about our products and policies.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <Accordion items={FAQS} />
        </Reveal>
      </section>

      {/* ==========================================
          8. NEWSLETTER
          ========================================== */}
      <section className="py-24 md:py-32 bg-[#3e3a35] text-[#f9f7f4] text-center px-6">
        <Reveal>
          <h2 className="text-4xl md:text-5xl font-medium mb-6">
            Join the Atelier
          </h2>
          <p className="text-[#f9f7f4]/70 max-w-md mx-auto mb-10">
            Subscribe to receive 10% off your first order, early access to new
            collections, and stories from our artisans.
          </p>
          <form
            className="max-w-md mx-auto flex gap-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-transparent border border-[#f9f7f4]/20 px-4 py-3 rounded-none focus:outline-none focus:border-[#f9f7f4] transition-colors"
            />
            <button
              type="submit"
              className="bg-[#f9f7f4] text-[#3e3a35] px-8 py-3 text-[11px] uppercase tracking-widest font-semibold hover:bg-white transition-colors"
            >
              Subscribe
            </button>
          </form>
        </Reveal>
      </section>

      {/* ==========================================
          9. MEGA FOOTER
          ========================================== */}
      <footer className="pt-24 pb-12 px-6 md:px-12 bg-[#eae7e0] border-t border-[#3e3a35]/10">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div className="lg:col-span-1">
              <span className="text-2xl tracking-[0.2em] font-medium uppercase mb-6 block">
                Atelier
              </span>
              <p className="text-[#3e3a35]/60 text-sm leading-relaxed mb-6">
                Curating timeless, functional art for the modern home.
                Sustainable, ethical, and beautiful.
              </p>
            </div>

            <div>
              <h4 className="text-[10px] uppercase tracking-widest font-semibold mb-6">
                Shop
              </h4>
              <ul className="space-y-4 text-sm text-[#3e3a35]/70">
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#3e3a35] transition-colors"
                  >
                    All Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#3e3a35] transition-colors"
                  >
                    Ceramics
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#3e3a35] transition-colors"
                  >
                    Textiles
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#3e3a35] transition-colors"
                  >
                    Gift Cards
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] uppercase tracking-widest font-semibold mb-6">
                About
              </h4>
              <ul className="space-y-4 text-sm text-[#3e3a35]/70">
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#3e3a35] transition-colors"
                  >
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#3e3a35] transition-colors"
                  >
                    Journal
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#3e3a35] transition-colors"
                  >
                    Sustainability
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#3e3a35] transition-colors"
                  >
                    Stockists
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] uppercase tracking-widest font-semibold mb-6">
                Support
              </h4>
              <ul className="space-y-4 text-sm text-[#3e3a35]/70">
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#3e3a35] transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#3e3a35] transition-colors"
                  >
                    Shipping & Returns
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#3e3a35] transition-colors"
                  >
                    Care Guide
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#3e3a35] transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-[#3e3a35]/10 text-[10px] text-[#3e3a35]/50 uppercase tracking-widest font-medium">
            <span>&copy; {new Date().getFullYear()} Atelier Minimal.</span>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-[#3e3a35] transition-colors">
                Privacy
              </Link>
              <Link href="#" className="hover:text-[#3e3a35] transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
