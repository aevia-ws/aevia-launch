"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Menu, X, MapPin, Camera, ExternalLink, Globe, ChevronDown, Compass, Calendar, Info } from "lucide-react";

import "../premium.css";

/* ==========================================================================
   DATA STRUCTURES
   ========================================================================== */

const SLIDES = [
  {
    id: "s1",
    title: "Svalbard",
    subtitle: "The Frozen Frontier",
    location: "Norway",
    coordinates: "77.8750° N, 20.9752° E",
    date: "March 2026",
    camera: "Hasselblad X2D 100C",
    lens: "XCD 2,5/38V",
    desc: "A three-week expedition into the high Arctic. Documenting the shifting ice structures and the profound silence of polar night giving way to endless summer days. The isolation here is absolute, stripping away all noise until only the primal rhythm of the earth remains.",
    image:
      "https://images.unsplash.com/photo-1463694038165-42777b7ccb2c?q=80&w=1600&auto=format&fit=crop",
    accent: "#64748b",
  },
  {
    id: "s2",
    title: "Atacama",
    subtitle: "Ocean of Sand",
    location: "Chile",
    coordinates: "23.8634° S, 69.1328° W",
    date: "November 2025",
    camera: "Leica M11 Monochrom",
    lens: "Summilux-M 35mm f/1.4",
    desc: "The driest non-polar desert in the world. Its Martian landscapes challenge the very concept of scale. Every dune is a monument, every salt flat a mirror to the cosmos. Photographing Atacama is an exercise in minimalist composition.",
    image:
      "https://images.unsplash.com/photo-1542408332-e19a6d09bb2e?q=80&w=1600&auto=format&fit=crop",
    accent: "#b45309",
  },
  {
    id: "s3",
    title: "Yakushima",
    subtitle: "Ancient Canopy",
    location: "Japan",
    coordinates: "30.3340° N, 130.5284° E",
    date: "May 2025",
    camera: "Phase One XT",
    lens: "Rodenstock HR 32mm",
    desc: "A primordial temperate rainforest where cedar trees have stood for over a thousand years. The humidity hangs heavy, painting everything in impossible shades of green. It's a place where time is measured not in hours, but in rings of wood.",
    image:
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1600&auto=format&fit=crop",
    accent: "#15803d",
  },
  {
    id: "s4",
    title: "Faroe",
    subtitle: "Edge of the World",
    location: "Denmark",
    coordinates: "61.8926° N, 6.9118° W",
    date: "August 2024",
    camera: "Sony A1",
    lens: "FE 12-24mm f/2.8 GM",
    desc: "Jagged cliffs rising violently from the North Atlantic. The weather here changes by the minute, offering a dramatic canvas of fleeting light and rolling fog. The sheep outnumber the people, and nature reigns undisputed.",
    image:
      "https://images.unsplash.com/photo-1510007849646-641559aa3d56?q=80&w=1600&auto=format&fit=crop",
    accent: "#0f766e",
  },
  {
    id: "s5",
    title: "Namib",
    subtitle: "Where Sand Meets Sea",
    location: "Namibia",
    coordinates: "24.7336° S, 15.3400° E",
    date: "January 2024",
    camera: "Hasselblad 907X",
    lens: "XCD 4/45P",
    desc: "The oldest desert in the world colliding abruptly with the violent Atlantic Ocean. The contrast between the towering, iron-rich red dunes and the cold blue water creates a surreal, dreamlike environment that defies logic.",
    image:
      "https://images.unsplash.com/photo-1518414441542-9905479dfc82?q=80&w=1600&auto=format&fit=crop",
    accent: "#c2410c",
  },
];

const EXHIBITIONS = [
  {
    year: "2026",
    title: "Edges of the Earth",
    gallery: "Gagosian",
    city: "London",
  },
  {
    year: "2025",
    title: "Silence & Scale",
    gallery: "Pace Gallery",
    city: "New York",
  },
  {
    year: "2024",
    title: "The Frozen Epoch",
    gallery: "Galerie Perrotin",
    city: "Paris",
  },
  {
    year: "2023",
    title: "Monochrome Deserts",
    gallery: "Taka Ishii",
    city: "Tokyo",
  },
];

const PUBLICATIONS = [
  { title: "Terra Incognita", publisher: "Phaidon", year: "2025" },
  {
    title: "National Geographic",
    publisher: "Feature Editorial",
    year: "2024",
  },
  { title: "The North Face", publisher: "Campaign Archive", year: "2023" },
  { title: "Light & Latitude", publisher: "Taschen", year: "2022" },
];

/* ==========================================================================
   MAIN PAGE COMPONENT
   ========================================================================== */

export default function TerraSliderPage() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for prev
  const [isAnimating, setIsAnimating] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const slide = SLIDES[currentIdx];

  // Custom Cursor
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cursorX = useSpring(mouseX, { stiffness: 150, damping: 25 });
  const cursorY = useSpring(mouseY, { stiffness: 150, damping: 25 });
  const [cursorState, setCursorState] = useState<
    "default" | "prev" | "next" | "view"
  >("default");

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Determine cursor state based on position (if not interacting with UI elements)
      if (aboutOpen || menuOpen || infoOpen) {
        setCursorState("default");
        return;
      }

      const width = window.innerWidth;
      const height = window.innerHeight;

      // If hovering bottom or top areas, default cursor
      if (e.clientY < 100 || e.clientY > height - 100) {
        setCursorState("default");
      } else if (e.clientX < width / 3) {
        setCursorState("prev");
      } else if (e.clientX > (width / 3) * 2) {
        setCursorState("next");
      } else {
        setCursorState("view");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, aboutOpen, menuOpen, infoOpen]);

  const paginate = (newDirection: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(newDirection);

    setTimeout(() => {
      let newIdx = currentIdx + newDirection;
      if (newIdx < 0) newIdx = SLIDES.length - 1;
      if (newIdx >= SLIDES.length) newIdx = 0;
      setCurrentIdx(newIdx);

      // Reset animation lock after duration
      setTimeout(() => setIsAnimating(false), 1200);
    }, 50);
  };

  const handleGlobalClick = (e: React.MouseEvent) => {
    // Don't trigger slider if clicking on UI elements
    if (aboutOpen || menuOpen || infoOpen) return;

    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest("a")) return;

    if (cursorState === "prev") paginate(-1);
    else if (cursorState === "next") paginate(1);
    else if (cursorState === "view") setInfoOpen(true);
  };

  // Variants for Curtain Reveal
  const imageVariants = {
    enter: (direction: number) => ({
      clipPath: direction > 0 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)",
      scale: 1.1,
    }),
    center: {
      clipPath: "inset(0 0 0 0)",
      scale: 1,
      transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] },
    },
    exit: (direction: number) => ({
      clipPath: direction > 0 ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)",
      scale: 0.9,
      transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] },
    }),
  };

  const textVariants = {
    enter: (direction: number) => ({
      y: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, delay: 0.4, ease: [0.25, 1, 0.5, 1] },
    },
    exit: (direction: number) => ({
      y: direction > 0 ? -100 : 100,
      opacity: 0,
      transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
    }),
  };

  return (
    <div
      className="premium-theme min-h-screen bg-[#0a0a0a] text-[#f4f4f5] font-serif overflow-hidden selection:bg-white/20"
      onClick={handleGlobalClick}
    >
      {/* ==========================================
          LOADING SCREEN
          ========================================== */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[200] bg-[#0a0a0a] flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="w-48 h-[1px] bg-white/40 mb-8 origin-left"
            />
            <div className="overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  ease: [0.76, 0, 0.24, 1],
                }}
                className="text-sm font-sans tracking-[0.5em] uppercase text-white/50"
              >
                Terra <span className="text-white">Incognita</span>
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==========================================
          CUSTOM CURSOR
          ========================================== */}
      <motion.div
        style={{ x: cursorX, y: cursorY }}
        className="fixed top-0 left-0 pointer-events-none z-[150] hidden md:flex items-center justify-center -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      >
        <motion.div
          animate={{
            width: cursorState !== "default" ? 64 : 12,
            height: cursorState !== "default" ? 64 : 12,
            backgroundColor:
              cursorState !== "default"
                ? "rgba(255,255,255,1)"
                : "rgba(255,255,255,1)",
          }}
          className="rounded-full flex items-center justify-center transition-all duration-300 ease-out"
        >
          <AnimatePresence mode="wait">
            {cursorState === "prev" && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="text-black"
              >
                <ArrowLeft className="w-5 h-5" />
              </motion.div>
            )}
            {cursorState === "next" && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="text-black"
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            )}
            {cursorState === "view" && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="text-black text-[9px] uppercase tracking-widest font-bold font-sans"
              >
                Info
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* ==========================================
          HEADER / NAVIGATION
          ========================================== */}
      <header className="fixed top-0 left-0 w-full z-50 mix-blend-difference px-6 md:px-12 py-8 flex justify-between items-center pointer-events-none">
        <div className="pointer-events-auto">
          <Link
            href="/"
            className="text-xl md:text-2xl font-light tracking-widest uppercase"
          >
            Terra<span className="font-bold opacity-60">Archive</span>
          </Link>
        </div>

        <div className="pointer-events-auto flex items-center gap-8">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setAboutOpen(true);
            }}
            className="hidden md:block text-[10px] font-sans uppercase tracking-[0.2em] hover:opacity-60 transition-opacity"
          >
            About Studio
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(true);
            }}
            className="flex items-center gap-3 hover:opacity-60 transition-opacity"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* ==========================================
          SLIDER TRACKER (BOTTOM)
          ========================================== */}
      <div className="fixed bottom-0 left-0 w-full z-40 mix-blend-difference px-6 md:px-12 py-8 flex justify-between items-end pointer-events-none">
        {/* Pagination Dots */}
        <div className="flex gap-3 pointer-events-auto">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                if (i !== currentIdx) paginate(i > currentIdx ? 1 : -1);
              }}
              className="w-10 h-10 flex items-center justify-center group"
            >
              <div
                className={`h-[1px] transition-all duration-500 bg-white ${i === currentIdx ? "w-8 opacity-100" : "w-3 opacity-30 group-hover:w-5 group-hover:opacity-60"}`}
              />
            </button>
          ))}
        </div>

        {/* Current Info Toggle */}
        <div className="pointer-events-auto flex items-center gap-6 text-right">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-[10px] font-sans uppercase tracking-[0.2em] opacity-60 mb-1">
              {slide.location}
            </span>
            <span className="text-xs font-mono">{slide.coordinates}</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setInfoOpen(!infoOpen);
            }}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all"
          >
            {infoOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Info className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* ==========================================
          MAIN SLIDER
          ========================================== */}
      <main className="relative w-full h-[100svh] overflow-hidden bg-[#050505]">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIdx}
            custom={direction}
            variants={imageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority
              quality={100}
            />
            {/* Vignette overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_20%,rgba(0,0,0,0.6)_100%)]" />
            <div className="absolute inset-0 bg-black/20" />
          </motion.div>
        </AnimatePresence>

        {/* Centered Typography */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none mix-blend-overlay z-10">
          <AnimatePresence mode="wait">
            <motion.h1
              key={currentIdx}
              custom={direction}
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="text-[12vw] leading-none font-bold tracking-tighter text-white opacity-80 select-none text-center"
            >
              {slide.title}
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Subtitle */}
        <div className="absolute inset-x-0 top-[60%] flex items-center justify-center pointer-events-none z-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIdx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center gap-4"
            >
              <div className="w-12 h-[1px] bg-white/50" />
              <span className="text-lg md:text-2xl font-light italic text-white/90">
                {slide.subtitle}
              </span>
              <div className="w-12 h-[1px] bg-white/50" />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* ==========================================
          INFO PANEL (SLIDE DETAILS)
          ========================================== */}
      <AnimatePresence>
        {infoOpen && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="fixed inset-x-0 bottom-0 h-[60vh] md:h-[50vh] bg-[#0a0a0a]/95 backdrop-blur-2xl z-40 border-t border-white/10 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex-1 overflow-y-auto p-6 md:p-12 pb-32 max-w-[1600px] mx-auto w-full">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                {/* Title & Desc */}
                <div className="md:col-span-7 lg:col-span-8">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="px-3 py-1 bg-white/10 text-white text-[10px] font-sans uppercase tracking-widest rounded-full">
                      {slide.location}
                    </span>
                    <span className="text-sm font-sans text-white/40">
                      {slide.date}
                    </span>
                  </div>
                  <h2 className="text-4xl md:text-6xl font-light mb-8">
                    {slide.title}.
                  </h2>
                  <p className="text-lg md:text-xl text-white/60 font-sans font-light leading-relaxed max-w-3xl">
                    {slide.desc}
                  </p>
                </div>

                {/* Metadata */}
                <div className="md:col-span-5 lg:col-span-4 border-t md:border-t-0 md:border-l border-white/10 pt-8 md:pt-0 md:pl-12 flex flex-col gap-8 font-sans">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-2 flex items-center gap-2">
                      <Compass className="w-3 h-3" /> Coordinates
                    </span>
                    <span className="text-lg font-mono">
                      {slide.coordinates}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-2 flex items-center gap-2">
                      <Camera className="w-3 h-3" /> Equipment
                    </span>
                    <span className="text-lg block">{slide.camera}</span>
                    <span className="text-sm text-white/60 block mt-1">
                      {slide.lens}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-2 flex items-center gap-2">
                      <Calendar className="w-3 h-3" /> Expedition
                    </span>
                    <span className="text-lg block">{slide.date}</span>
                  </div>
                  <button className="mt-auto px-6 py-4 bg-white text-black text-[10px] uppercase tracking-widest font-bold hover:bg-white/90 transition-colors w-full flex items-center justify-between group">
                    Purchase Fine Art Print{" "}
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==========================================
          FULLSCREEN ABOUT OVERLAY
          ========================================== */}
      <AnimatePresence>
        {aboutOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] bg-[#050505] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setAboutOpen(false)}
              className="fixed top-8 right-8 z-[110] w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all backdrop-blur-md bg-black/20"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-32 md:py-48">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center mb-32">
                <div>
                  <h2 className="text-5xl md:text-7xl font-light mb-12 leading-tight">
                    Documenting the{" "}
                    <span className="italic opacity-70">
                      edges of the earth.
                    </span>
                  </h2>
                  <div className="font-sans font-light text-white/60 text-lg md:text-xl leading-relaxed space-y-8 max-w-2xl">
                    <p>
                      Terra Archive is the collected works of landscape and
                      expedition photographer Marcus Vane. Operating at the
                      intersection of fine art and documentary, Vane spends
                      months embedded in the world's most hostile and remote
                      environments.
                    </p>
                    <p>
                      By utilizing large-format and medium-format digital
                      systems, the resulting images capture an impossible level
                      of detail—transforming vast, chaotic landscapes into
                      structured, minimalist studies of geology, climate, and
                      time.
                    </p>
                  </div>
                </div>
                <div className="relative aspect-[3/4] bg-white/5 rounded-sm overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=1200&auto=format&fit=crop"
                    alt="Marcus Vane"
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-[3s]"
                  />
                </div>
              </div>

              {/* Data Grids */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 font-sans pt-16 border-t border-white/10">
                {/* Exhibitions */}
                <div>
                  <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-10">
                    Selected Exhibitions
                  </h3>
                  <div className="space-y-6">
                    {EXHIBITIONS.map((ex, i) => (
                      <div
                        key={i}
                        className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/5 pb-6 gap-2"
                      >
                        <div>
                          <div className="text-xl font-serif italic mb-1">
                            {ex.title}
                          </div>
                          <div className="text-sm text-white/60">
                            {ex.gallery}, {ex.city}
                          </div>
                        </div>
                        <span className="text-sm font-mono text-white/40">
                          {ex.year}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Publications */}
                <div>
                  <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-10">
                    Monographs & Press
                  </h3>
                  <div className="space-y-6">
                    {PUBLICATIONS.map((pub, i) => (
                      <div
                        key={i}
                        className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/5 pb-6 gap-2"
                      >
                        <div>
                          <div className="text-xl font-serif italic mb-1">
                            {pub.title}
                          </div>
                          <div className="text-sm text-white/60">
                            {pub.publisher}
                          </div>
                        </div>
                        <span className="text-sm font-mono text-white/40">
                          {pub.year}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Footer */}
              <div className="mt-32 pt-16 border-t border-white/10 flex flex-col items-center text-center">
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-6 font-sans">
                  Inquiries & Print Sales
                </span>
                <a
                  href="mailto:studio@terra-archive.com"
                  className="text-3xl md:text-5xl font-light hover:italic transition-all duration-300"
                >
                  studio@terra-archive.com
                </a>
                <div className="flex gap-6 mt-12">
                  <a
                    href="#"
                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                  >
                    <Globe className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors text-[10px] font-sans font-bold uppercase tracking-wider"
                  >
                    X
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==========================================
          FULLSCREEN MENU OVERLAY
          ========================================== */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-[#050505]/95 backdrop-blur-xl flex flex-col p-6 md:p-12"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center w-full max-w-[1600px] mx-auto">
              <span className="text-sm font-sans uppercase tracking-[0.3em] opacity-50">
                Menu
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center items-center gap-8 md:gap-12 text-center">
              {[
                "Expeditions",
                "Fine Art Prints",
                "Journal",
                "About Studio",
                "Contact",
              ].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <Link
                    href="#"
                    onClick={() => {
                      setMenuOpen(false);
                      if (item === "About Studio") setAboutOpen(true);
                    }}
                    className="text-4xl md:text-7xl font-light hover:italic transition-all duration-300"
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="w-full max-w-[1600px] mx-auto flex justify-between items-end text-xs font-sans text-white/40 uppercase tracking-widest mt-auto pt-8 border-t border-white/10">
              <div className="flex flex-col gap-2">
                <span>Terra Archive</span>
                <span>All rights reserved &copy; 2026</span>
              </div>
              <div className="flex gap-6">
                <a href="#" className="hover:text-white transition-colors">
                  Globe
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Globe
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
