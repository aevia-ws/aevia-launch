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
import { Sparkles, Wand2, Zap, Globe, Activity, Terminal, Box, Share2, Layers, Maximize, Monitor, MousePointer2, Navigation, Wifi, Shield, ShoppingBag, Search, Star, Mail, Phone, Check, Menu, X, MapPin, Clock, Lock, Plus, Bell, Settings, ArrowRight, ArrowUpRight, ChevronRight, Eye, PenTool, FlaskConical, Droplets, HeartPulse, Microscope, Wind, Trees, Flower2, Heart, Moon, Sun, Waves } from "lucide-react";

import "../premium.css";

/* ==========================================================================
   DATA STRUCTURES
   ========================================================================= */

const TREATMENTS = [
  {
    id: "rituals",
    label: "Signature Rituals",
    items: [
      {
        name: "Celestial Alignment",
        duration: "120m",
        price: "$450",
        desc: "A full-body rejuvenation combining volcanic stone therapy and sound bath immersion.",
        img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80",
      },
      {
        name: "Lumina Detox",
        duration: "90m",
        price: "$320",
        desc: "Infrared thermal wrapping followed by botanical lymph drainage.",
        img: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&q=80",
      },
      {
        name: "Oceanic Stillness",
        duration: "150m",
        price: "$580",
        desc: "Cold-pressed algae wrap and marine collagen facial in our private water suite.",
        img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",
      },
    ],
  },
  {
    id: "facials",
    label: "Advanced Facials",
    items: [
      {
        name: "Molecular Glow",
        duration: "60m",
        price: "$280",
        desc: "High-frequency ultrasound infusion of bio-identical growth factors.",
        img: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80",
      },
      {
        name: "Sculpt & Lift",
        duration: "75m",
        price: "$350",
        desc: "Manual buccal massage and micro-current stimulation for instant structural definition.",
        img: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&q=80",
      },
      {
        name: "Oxygen Infusion",
        duration: "60m",
        price: "$240",
        desc: "Hyperbaric oxygen delivery with customized vitamin cocktails.",
        img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
      },
    ],
  },
];

const AMENITIES = [
  {
    name: "Therapeutic Garden",
    desc: "Biophilic meditation spaces.",
    img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80",
  },
  {
    name: "Hydro Suite",
    desc: "Vitality pools and thermal circuits.",
    img: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=800&q=80",
  },
  {
    name: "Oxygen Bar",
    desc: "Refined respiratory rejuvenation.",
    img: "https://images.unsplash.com/photo-1527515545081-5db817172677?w=800&q=80",
  },
  {
    name: "Tea Lounge",
    desc: "Hand-blended botanical infusions.",
    img: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80",
  },
];

/* ==========================================================================
   UTILITY COMPONENTS
   ========================================================================= */

function Reveal({
  children,
  delay = 0,
  y = 40,
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
      transition={{ duration: 1.2, delay, ease: [0.25, 0.1, 0.25, 1] }}
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
  const sx = useSpring(x, { stiffness: 150, damping: 15 });
  const sy = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouse = useCallback(
    (e: React.MouseEvent) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      x.set((e.clientX - rect.left - rect.width / 2) * 0.4);
      y.set((e.clientY - rect.top - rect.height / 2) * 0.4);
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

export default function AuraWellnessPage() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTreatment, setActiveTreatment] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="premium-theme min-h-screen bg-[#fdfcf9] text-[#2a2a2a] font-sans selection:bg-[#c9b7a2] selection:text-white overflow-x-hidden">
      {/* ==========================================
          NAVIGATION
          ========================================== */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-1000 ${scrolled ? "bg-white/90 backdrop-blur-xl py-4 border-b border-[#c9b7a2]/20" : "bg-transparent py-10"}`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="group flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#c9b7a2] mb-0.5">
              Sanctuary.
            </span>
            <span className="text-xl md:text-2xl font-serif italic tracking-tighter text-[#2a2a2a]">
              AURA<span className="text-[#c9b7a2]">WELLNESS</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-[#2a2a2a]/40">
            {["The Experience", "Treatments", "Amenities", "About"].map(
              (link) => (
                <Link
                  key={link}
                  href={`#${link.toLowerCase().replace(" ", "-")}`}
                  className="hover:text-[#c9b7a2] transition-colors"
                >
                  {link}
                </Link>
              ),
            )}
          </div>

          <div className="flex items-center gap-8">
            <MagneticBtn className="px-8 py-3 bg-[#c9b7a2] text-white text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-[#b8a691] transition-all shadow-lg shadow-[#c9b7a2]/20">
              RESERVE_RITUAL
            </MagneticBtn>
            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden text-[#c9b7a2]"
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
            className="fixed inset-0 z-[100] bg-[#fdfcf9] p-12 flex flex-col justify-center"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-10 right-8 text-[#c9b7a2]"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="flex flex-col gap-8 text-5xl font-serif italic text-[#c9b7a2]">
              <Link href="#" onClick={() => setMenuOpen(false)}>
                Experience
              </Link>
              <Link href="#" onClick={() => setMenuOpen(false)}>
                Treatments
              </Link>
              <Link href="#" onClick={() => setMenuOpen(false)}>
                Amenities
              </Link>
              <Link href="#" onClick={() => setMenuOpen(false)}>
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==========================================
          1. HERO (Atmospheric)
          ========================================== */}
      <section
        ref={heroRef}
        className="relative w-full h-[100svh] flex flex-col justify-center overflow-hidden"
      >
        <motion.div
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1600&q=80"
            alt="Spa Sanctuary"
            fill
            className="object-cover brightness-95"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#fdfcf9]" />
        </motion.div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full text-center">
          <Reveal>
            <span className="inline-block px-4 py-1.5 rounded-full border border-white/30 text-white text-[10px] font-bold uppercase tracking-[0.4em] mb-10 backdrop-blur-sm">
              Quietude // Restoration // Flow
            </span>
            <h1 className="text-7xl md:text-9xl lg:text-[10rem] font-serif italic leading-[0.9] tracking-tighter mb-12 text-white">
              The Art <br />{" "}
              <span className="not-italic font-sans font-thin tracking-[0.2em] uppercase opacity-80">
                of Being.
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/70 leading-relaxed font-light mb-12 italic">
              A high-fidelity sanctuary designed for the profound restoration of
              the human spirit. Experience the confluence of botanical
              intelligence and scientific precision.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <MagneticBtn className="px-12 py-5 bg-white text-[#2a2a2a] text-[10px] font-bold uppercase tracking-[0.3em] rounded-full hover:bg-[#c9b7a2] hover:text-white transition-all cursor-pointer">
                Explore Rituals
              </MagneticBtn>
            </div>
          </Reveal>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/40">
          <span className="text-[9px] font-bold uppercase tracking-widest">
            Discover Stillness
          </span>
          <div className="w-[1px] h-12 bg-white/20" />
        </div>
      </section>

      {/* ==========================================
          2. THE EXPERIENCE (Intro)
          ========================================== */}
      <section id="the-experience" className="py-32 bg-[#fdfcf9]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <Reveal>
              <div className="relative aspect-[4/5] overflow-hidden group">
                <Image
                  src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1000&q=80"
                  alt="Experience"
                  fill
                  className="object-cover transition-transform duration-[3s] group-hover:scale-110"
                />
                <div className="absolute inset-0 border-[20px] border-[#fdfcf9]/30" />
              </div>
            </Reveal>

            <div className="space-y-12">
              <Reveal delay={0.2}>
                <h2 className="text-5xl md:text-7xl font-serif italic tracking-tighter leading-[1.1] text-[#2a2a2a]">
                  A Confluence of <br />{" "}
                  <span className="not-italic font-sans font-thin text-[#c9b7a2] uppercase tracking-widest">
                    Earth & Mind.
                  </span>
                </h2>
                <p className="text-lg text-[#2a2a2a]/60 leading-relaxed font-light">
                  At Aura, we believe wellness is a technical discipline as much
                  as a spiritual one. Our sanctuary integrates ancient
                  hydrotherapy circuits with state-of-the-art molecular skincare
                  protocols.
                </p>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="grid grid-cols-2 gap-12 pt-12 border-t border-[#c9b7a2]/20">
                  {[
                    { val: "15+", label: "Ritual Specialists" },
                    { val: "24k", label: "Monthly Restoration" },
                    { val: "100%", label: "Botanical Sourcing" },
                    { val: "3", label: "Michelin Wellness Awards" },
                  ].map((stat, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-4xl font-serif italic text-[#c9b7a2] mb-2">
                        {stat.val}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#2a2a2a]/40">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          3. TREATMENT MENU (Interactive Tabs)
          ========================================== */}
      <section id="treatments" className="py-32 bg-[#faf7f2]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <Reveal className="text-center mb-24">
            <h2 className="text-6xl md:text-8xl font-serif italic tracking-tighter text-[#2a2a2a] mb-6">
              The Ritual{" "}
              <span className="not-italic font-sans font-thin text-[#c9b7a2] uppercase tracking-widest">
                Menu.
              </span>
            </h2>
            <p className="text-[#2a2a2a]/40 text-[11px] font-bold uppercase tracking-[0.4em]">
              Precision Restorative Protocols
            </p>
          </Reveal>

          <Tabs defaultValue="rituals" className="w-full">
            <div className="flex justify-center mb-16">
              <TabsList className="bg-transparent border-b border-[#c9b7a2]/20 rounded-none w-full max-w-lg flex justify-center gap-12">
                {TREATMENTS.map((cat) => (
                  <TabsTrigger
                    key={cat.id}
                    value={cat.id}
                    className="pb-4 text-[10px] font-bold uppercase tracking-[0.3em] data-[state=active]:text-[#c9b7a2] data-[state=active]:border-b-2 data-[state=active]:border-[#c9b7a2] rounded-none bg-transparent"
                  >
                    {cat.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {TREATMENTS.map((cat) => (
              <TabsContent key={cat.id} value={cat.id}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                  {cat.items.map((item, i) => (
                    <Reveal key={item.name} delay={i * 0.1}>
                      <div
                        onClick={() => setActiveTreatment(item)}
                        className="group cursor-pointer bg-white p-8 rounded-[2rem] border border-[#c9b7a2]/10 hover:border-[#c9b7a2] transition-all shadow-sm"
                      >
                        <div className="relative aspect-video mb-8 rounded-[1.5rem] overflow-hidden">
                          <Image
                            src={item.img}
                            alt={item.name}
                            fill
                            className="object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                          />
                          <div className="absolute inset-0 bg-[#c9b7a2]/10 mix-blend-overlay" />
                        </div>
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-2xl font-serif italic text-[#2a2a2a]">
                            {item.name}
                          </h3>
                          <span className="text-[10px] font-bold text-[#c9b7a2]">
                            {item.price}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-[#2a2a2a]/30 mb-6">
                          <Clock className="w-3.5 h-3.5" /> {item.duration}
                          <div className="w-1 h-1 rounded-full bg-[#c9b7a2]" />
                          Protocol_Verified
                        </div>
                        <p className="text-xs text-[#2a2a2a]/50 leading-relaxed font-light mb-8 italic">
                          {item.desc}
                        </p>
                        <button className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-widest text-[#c9b7a2] group-hover:gap-5 transition-all">
                          View_Clinical_Summary{" "}
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* ==========================================
          4. AMENITIES (Carousel)
          ========================================== */}
      <section id="amenities" className="py-32 bg-[#fdfcf9] overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-20">
          <Reveal>
            <h2 className="text-5xl md:text-7xl font-serif italic tracking-tighter text-[#2a2a2a]">
              Institutional <br />{" "}
              <span className="not-italic font-sans font-thin text-[#c9b7a2] uppercase tracking-widest">
                Grounds.
              </span>
            </h2>
          </Reveal>
        </div>

        <div className="px-6 md:px-12">
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent className="-ml-8">
              {AMENITIES.map((amenity, i) => (
                <CarouselItem
                  key={i}
                  className="pl-8 basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <Reveal delay={i * 0.1}>
                    <div className="group relative aspect-[4/5] rounded-[3rem] overflow-hidden">
                      <Image
                        src={amenity.img}
                        alt={amenity.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-[4s]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2a2a2a]/80 via-transparent to-transparent" />
                      <div className="absolute bottom-10 left-10 text-white">
                        <h4 className="text-2xl font-serif italic mb-2">
                          {amenity.name}
                        </h4>
                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">
                          {amenity.desc}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex gap-4 mt-12 justify-center">
              <CarouselPrevious className="static translate-y-0 border-[#c9b7a2]/30 text-[#c9b7a2]" />
              <CarouselNext className="static translate-y-0 border-[#c9b7a2]/30 text-[#c9b7a2]" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* ==========================================
          5. BOTANICAL AUDIT (FAQ)
          ========================================== */}
      <section className="py-32 bg-[#faf7f2]">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal className="text-center mb-24">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#c9b7a2] mb-6 block">
              Sourcing & Ethics
            </span>
            <h2 className="text-4xl md:text-5xl font-serif italic text-[#2a2a2a]">
              Botanical_Audit
            </h2>
          </Reveal>

          <Accordion type="single" collapsible className="space-y-6">
            {[
              {
                q: "How are your essential oils verified?",
                a: "Every batch undergoes Gas Chromatography (GC-MS) testing to ensure 100% purity. We source exclusively from high-altitude estates in Grasse and the Bulgarian Valley.",
              },
              {
                q: "What is your water filtration protocol?",
                a: "Our hydrotherapy circuits utilize a 7-stage proprietary filtration system, including molecular restructuring and crystalline mineralization, replicating high-altitude spring water.",
              },
              {
                q: "Are treatments customized to my skin type?",
                a: "Yes. Every Aura ritual begins with a molecular dermal analysis. We adjust formulation ratios and mechanical intensity based on your cellular data.",
              },
              {
                q: "What is the Aura noise protocol?",
                a: "Our sanctuary is a verified 'Zero Decibel' zone. All architectural elements are acoustic-grade, and we utilize active noise neutralization in private suites.",
              },
            ].map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b border-[#c9b7a2]/20 px-4"
              >
                <AccordionTrigger className="text-left font-sans font-bold uppercase tracking-widest text-[11px] text-[#2a2a2a] py-8 hover:text-[#c9b7a2] hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm font-light text-[#2a2a2a]/60 leading-relaxed pb-8 italic">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ==========================================
          6. MEGA FOOTER (Luxury Minimal)
          ========================================== */}
      <footer className="bg-white pt-32 pb-12 px-6 md:px-12 border-t border-[#c9b7a2]/10 relative">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-24 mb-32">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="flex flex-col mb-10">
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#c9b7a2] mb-1">
                  Sanctuary.
                </span>
                <span className="text-3xl font-serif italic text-[#2a2a2a]">
                  Aura Wellness
                </span>
              </div>
              <p className="text-[#2a2a2a]/40 max-w-sm mb-12 text-[11px] font-bold uppercase tracking-widest leading-loose italic">
                The intersection of deep botanical wisdom and institutional
                medical precision. Est. 2026. A global sanctuary for the
                restored mind.
              </p>
              <div className="flex gap-4">
                {[Globe, Globe, Mail].map((Icon, i) => (
                  <button
                    key={i}
                    className="w-12 h-12 rounded-full border border-[#c9b7a2]/20 flex items-center justify-center text-[#c9b7a2] hover:bg-[#c9b7a2] hover:text-white transition-all"
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-2 lg:col-start-7">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#2a2a2a] mb-10">
              Experience
            </h4>
            <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-[#2a2a2a]/30">
              <li>
                <Link
                  href="#"
                  className="hover:text-[#c9b7a2] transition-colors"
                >
                  The_Sanctuary
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#c9b7a2] transition-colors"
                >
                  Hydro_Circuit
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#c9b7a2] transition-colors"
                >
                  Tea_Library
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#c9b7a2] transition-colors"
                >
                  Garden_Gallery
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#2a2a2a] mb-10">
              Rituals
            </h4>
            <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-[#2a2a2a]/30">
              <li>
                <Link
                  href="#"
                  className="hover:text-[#c9b7a2] transition-colors"
                >
                  Facial_Science
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#c9b7a2] transition-colors"
                >
                  Body_Alchemy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#c9b7a2] transition-colors"
                >
                  Sound_Baths
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#c9b7a2] transition-colors"
                >
                  Seasonal_Detox
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#2a2a2a] mb-10">
              Legal
            </h4>
            <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-[#2a2a2a]/30">
              <li>
                <Link
                  href="#"
                  className="hover:text-[#c9b7a2] transition-colors"
                >
                  Privacy_Buffer
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#c9b7a2] transition-colors"
                >
                  Terms_of_Being
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#c9b7a2] transition-colors"
                >
                  Medical_Disclaimer
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#c9b7a2] transition-colors"
                >
                  Institutional_Ops
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto pt-10 border-t border-[#c9b7a2]/10 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] font-bold uppercase tracking-widest text-[#2a2a2a]/10">
          <div className="flex items-center gap-10">
            <span>&copy; {new Date().getFullYear()} AURA WELLNESS GROUP.</span>
            <span>Geneva // Aspen // Kyoto</span>
          </div>
          <div className="flex gap-10">
            <span>Verified Sanctuary</span>
            <span>Restoration as Standard</span>
          </div>
        </div>
      </footer>

      {/* TREATMENT DETAIL MODAL */}
      <AnimatePresence>
        {activeTreatment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-[#fdfcf9]/98 backdrop-blur-xl flex items-center justify-center p-6"
            onClick={() => setActiveTreatment(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="bg-white border border-[#c9b7a2]/20 max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-[3rem] shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveTreatment(null)}
                className="absolute top-10 right-10 text-[#c9b7a2] hover:text-[#2a2a2a] transition-colors z-10"
              >
                <X className="w-8 h-8" />
              </button>

              <div className="relative aspect-square lg:aspect-auto">
                <Image
                  src={activeTreatment.img}
                  alt={activeTreatment.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-12 left-12 text-white">
                  <h3 className="text-5xl font-serif italic">
                    {activeTreatment.name}
                  </h3>
                </div>
              </div>

              <div className="p-16 flex flex-col justify-between">
                <div className="space-y-10">
                  <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#c9b7a2] flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#c9b7a2]" />
                    Protocol Specification
                  </div>

                  <div className="space-y-6">
                    <div className="flex justify-between items-center border-b border-[#c9b7a2]/10 pb-4">
                      <span className="text-[10px] font-bold text-[#2a2a2a]/30 uppercase tracking-widest">
                        Duration
                      </span>
                      <span className="text-xl font-serif italic text-[#c9b7a2]">
                        {activeTreatment.duration}
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-b border-[#c9b7a2]/10 pb-4">
                      <span className="text-[10px] font-bold text-[#2a2a2a]/30 uppercase tracking-widest">
                        Investment
                      </span>
                      <span className="text-xl font-serif italic text-[#c9b7a2]">
                        {activeTreatment.price}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm font-light text-[#2a2a2a]/60 leading-relaxed italic">
                    {activeTreatment.desc} Our signature protocol includes a
                    personalized botanical blend and a synchronized vibrational
                    sound bath for total dermal and cognitive restoration.
                  </p>
                </div>

                <MagneticBtn className="w-full py-6 bg-[#c9b7a2] text-white text-[11px] font-bold uppercase tracking-[0.4em] rounded-full hover:bg-[#b8a691] transition-all shadow-xl mt-12">
                  REQUEST_RITUAL
                </MagneticBtn>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        ::-webkit-scrollbar{width:4px;background:#fdfcf9}
        ::-webkit-scrollbar-thumb{background:#c9b7a2}
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
      `}</style>
    </div>
  );
}
