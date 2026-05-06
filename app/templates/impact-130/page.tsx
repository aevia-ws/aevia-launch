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
import { ArrowRight, ArrowLeft, Globe, Mail, ArrowUpRight, Compass, Maximize2, Play, Pause, Camera, Award, Star, ChevronDown, ChevronRight, Minimize2, MapPin, X } from "lucide-react";

import "../premium.css";

/* ==========================================================================
   DATA STRUCTURES
   ========================================================================== */

const SLIDES = [
  {
    id: "01",
    title: "The Emerald Coast",
    subtitle: "Coastal Conservation",
    location: "Sardinia, Italy",
    year: "2025",
    desc: "A sprawling photographic essay documenting the fragile intersection of luxury tourism and marine conservation. By utilizing underwater medium format systems, the project captures the unseen biomes fighting for survival just meters beneath the yachts. The juxtaposition of human excess and natural vulnerability forms the core narrative tension.",
    metrics: {
      depth: "45m",
      duration: "12 Weeks",
      species: "142 Catalogued",
      equipment: "Phase One XF IQ4",
    },
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1600&auto=format&fit=crop",
    accent: "#059669", // emerald-600
  },
  {
    id: "02",
    title: "Silent Giants",
    subtitle: "Old Growth Forests",
    location: "Vancouver Island, Canada",
    year: "2024",
    desc: "An immersive study into the last remaining old-growth cedar forests of the Pacific Northwest. The scale of these ancient organisms forces a recalibration of human perspective, highlighting our fleeting existence within deep time. Mist and low light create an ethereal atmosphere where scale becomes ambiguous.",
    metrics: {
      age: "800+ Years",
      altitude: "1,200m",
      scale: "Macro/Micro",
      equipment: "Hasselblad H6D-100c",
    },
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1600&auto=format&fit=crop",
    accent: "#047857", // emerald-700
  },
  {
    id: "03",
    title: "Tectonic Veins",
    subtitle: "Geological Patterns",
    location: "Vatnajökull, Iceland",
    year: "2023",
    desc: "Abstract aerial topographies revealing the violent, shifting nature of glacial meltwater carving through volcanic rock. The patterns mirror biological cardiovascular systems, suggesting the earth itself operates as a living, breathing entity undergoing constant, microscopic trauma and regeneration.",
    metrics: {
      altitude: "15,000ft",
      temp: "-12°C",
      medium: "Aerial Infra",
      equipment: "DJI Inspire 3 w/ X9",
    },
    image:
      "https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=1600&auto=format&fit=crop",
    accent: "#0f766e", // teal-700
  },
  {
    id: "04",
    title: "Nocturnal Monsoon",
    subtitle: "Urban Ecosystems",
    location: "Kyoto, Japan",
    year: "2024",
    desc: "Documenting the transformation of a hyper-structured urban environment during extreme weather events. The monsoon strips away the neon artificiality, returning the ancient capital to its elemental state of water and stone. Shadows deepen, reflections multiply, and the grid dissolves into chaos.",
    metrics: {
      rainfall: "300mm/h",
      hours: "Midnight-4am",
      format: "B&W 35mm",
      equipment: "Leica M11 Monochrom",
    },
    image:
      "https://images.unsplash.com/photo-1493780474015-ba834fd0ce2f?q=80&w=1600&auto=format&fit=crop",
    accent: "#115e59", // teal-800
  },
];

const EXHIBITIONS = [
  {
    year: "2026",
    title: "Biomes in Flux",
    venue: "Tate Modern",
    location: "London",
    desc: "A retrospective spanning a decade of environmental documentation.",
  },
  {
    year: "2025",
    title: "The Emerald Coast",
    venue: "Pace Gallery",
    location: "New York",
    desc: "Solo exhibition featuring large-scale underwater prints.",
  },
  {
    year: "2024",
    title: "Anthropocene",
    venue: "Venice Biennale",
    location: "Venice",
    desc: "Group exhibition representing the intersection of art and climate science.",
  },
  {
    year: "2023",
    title: "Silent Giants",
    venue: "National Gallery",
    location: "Ottawa",
    desc: "Immersive installation utilizing soundscapes recorded in old-growth forests.",
  },
  {
    year: "2022",
    title: "Tectonic Veins",
    venue: "Reykjavik Art Museum",
    location: "Reykjavik",
    desc: "Aerial photography series contrasting fire and ice.",
  },
];

const PRESS = [
  {
    quote:
      "Hayes' work doesn't just document nature; it forces us into a profound, often uncomfortable confrontation with scale and time.",
    publication: "The New York Times",
    reviewer: "Alice G.",
  },
  {
    quote:
      "The defining environmental photographer of this decade. The Emerald Coast series is a masterclass in tension.",
    publication: "National Geographic",
    reviewer: "Thomas R.",
  },
  {
    quote:
      "Breathtaking technical mastery paired with an uncompromising ecological conscience.",
    publication: "Aperture Magazine",
    reviewer: "Sarah L.",
  },
];

const FAQS = [
  {
    question: "Are fine art prints available for purchase?",
    answer:
      "Yes, limited edition prints are available for all projects. Editions are strictly limited to 10 per image, printed on museum-grade Hahnemühle baryta paper, signed and numbered. Contact the studio for the current catalog and pricing.",
  },
  {
    question: "Do you accept commercial commissions?",
    answer:
      "I accept a very limited number of commercial commissions per year, strictly aligning with brands and organizations that demonstrate a verifiable commitment to environmental sustainability and ethical practices.",
  },
  {
    question: "What is your typical post-production workflow?",
    answer:
      "The ethos of the studio relies on capturing the image as perfectly as possible in-camera. Post-production is limited to basic tonal adjustments, dodging, and burning. We do not composite elements or alter the fundamental reality of the captured scene.",
  },
  {
    question: "Do you offer workshops or portfolio reviews?",
    answer:
      "Currently, I lead one masterclass per year in conjunction with the Leica Akademie. Portfolio reviews are occasionally available for emerging photographers focused on conservation. Subscribe to the newsletter for announcements.",
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

function Accordion({ items }: { items: typeof FAQS }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="w-full border-t border-white/10">
      {items.map((item, i) => (
        <div key={i} className="border-b border-white/10">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full py-6 md:py-8 flex items-center justify-between text-left group"
          >
            <span
              className={`text-lg md:text-xl font-medium transition-colors ${openIndex === i ? "text-emerald-400" : "text-white/60 group-hover:text-white"}`}
            >
              {item.question}
            </span>
            <div className="relative w-6 h-6 flex items-center justify-center shrink-0">
              <motion.div
                animate={{ rotate: openIndex === i ? 180 : 0 }}
                className="absolute w-full h-[1.5px] bg-white transition-colors"
              />
              <motion.div
                animate={{ rotate: openIndex === i ? 180 : 90 }}
                className="absolute w-full h-[1.5px] bg-white transition-colors"
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
                <p className="pb-8 text-white/50 text-base leading-relaxed max-w-3xl">
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

export default function SplitRevealPage() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [autoplay, setAutoplay] = useState(true);

  const currentSlide = SLIDES[currentIdx];

  // Autoplay Logic
  useEffect(() => {
    if (!autoplay || aboutOpen || isFullscreen) return;

    const timer = setInterval(() => {
      paginate(1);
    }, 6000);

    return () => clearInterval(timer);
  }, [currentIdx, autoplay, aboutOpen, isFullscreen]);

  const paginate = (newDirection: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(newDirection);

    setTimeout(() => {
      let newIdx = currentIdx + newDirection;
      if (newIdx < 0) newIdx = SLIDES.length - 1;
      if (newIdx >= SLIDES.length) newIdx = 0;
      setCurrentIdx(newIdx);

      setTimeout(() => setIsAnimating(false), 1000);
    }, 50);
  };

  // Variants for Image Split
  const imageVariants = {
    enter: (direction: number) => ({
      y: direction > 0 ? "100%" : "-100%",
      scale: 1.1,
      opacity: 0.5,
    }),
    center: {
      y: 0,
      scale: 1,
      opacity: 1,
      transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
    },
    exit: (direction: number) => ({
      y: direction > 0 ? "-100%" : "100%",
      scale: 0.9,
      opacity: 0.5,
      transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
    }),
  };

  // Variants for Content Split
  const contentVariants = {
    enter: (direction: number) => ({
      y: direction > 0 ? "-20%" : "20%",
      opacity: 0,
    }),
    center: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, delay: 0.2, ease: [0.25, 1, 0.5, 1] },
    },
    exit: (direction: number) => ({
      y: direction > 0 ? "20%" : "-20%",
      opacity: 0,
      transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
    }),
  };

  return (
    <div className="premium-theme min-h-screen bg-[#050505] text-[#f4f4f5] font-sans overflow-hidden selection:bg-emerald-500/30">
      {/* ==========================================
          HEADER (Global)
          ========================================== */}
      <header className="fixed top-0 left-0 w-full z-40 px-6 md:px-12 py-8 flex justify-between items-center pointer-events-none mix-blend-difference text-white">
        <Link
          href="/"
          className="pointer-events-auto text-xl tracking-[0.3em] uppercase font-medium"
        >
          Split<span className="opacity-50 font-light">Rev</span>
        </Link>

        <div className="pointer-events-auto flex gap-8 text-[10px] uppercase tracking-widest font-bold">
          <button
            onClick={() => setAboutOpen(true)}
            className="hover:text-emerald-400 transition-colors"
          >
            Information
          </button>
          <button
            onClick={() => setAboutOpen(true)}
            className="hover:text-emerald-400 transition-colors hidden md:block"
          >
            Exhibitions
          </button>
        </div>
      </header>

      {/* ==========================================
          MAIN SPLIT VIEW
          ========================================== */}
      <main className="w-full h-[100svh] flex flex-col lg:flex-row relative">
        {/* LEFT: IMAGE SLIDER */}
        <div
          className={`relative w-full h-1/2 lg:h-full transition-all duration-700 ease-[0.76,0,0.24,1] ${isFullscreen ? "lg:w-[100%]" : "lg:w-[55%]"}`}
        >
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
                src={currentSlide.image}
                alt={currentSlide.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/20" />

              {/* Image Number Overlay */}
              <div className="absolute bottom-6 md:bottom-12 left-6 md:left-12 text-white/50 text-[8rem] md:text-[15rem] lg:text-[20rem] font-medium leading-none tracking-tighter mix-blend-overlay pointer-events-none select-none">
                {currentSlide.id}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="absolute top-6 md:top-8 right-6 md:right-8 w-12 h-12 rounded-full bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/40 transition-colors z-20 hidden lg:flex"
          >
            {isFullscreen ? (
              <Minimize2 className="w-5 h-5" />
            ) : (
              <Maximize2 className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* RIGHT: CONTENT SLIDER */}
        <div
          className={`relative w-full h-1/2 lg:h-full bg-[#0a0a0a] border-t lg:border-t-0 lg:border-l border-white/5 flex flex-col transition-all duration-700 ease-[0.76,0,0.24,1] ${isFullscreen ? "lg:w-[0%] overflow-hidden" : "lg:w-[45%]"}`}
        >
          <AnimatePresence mode="wait">
            {!isFullscreen && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
                className="flex-1 flex flex-col justify-center p-8 md:p-16 lg:p-20 overflow-y-auto"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIdx}
                    custom={direction}
                    variants={contentVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="max-w-xl"
                  >
                    <div className="flex items-center gap-4 mb-8">
                      <span className="px-3 py-1 rounded-full border border-emerald-900/50 bg-emerald-900/20 text-emerald-400 text-[10px] uppercase tracking-widest font-bold">
                        {currentSlide.location}
                      </span>
                      <span className="text-white/40 text-sm">
                        {currentSlide.year}
                      </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-4">
                      {currentSlide.title}
                    </h1>
                    <h2 className="text-xl text-white/50 font-light italic mb-8">
                      {currentSlide.subtitle}
                    </h2>

                    <p className="text-white/70 text-lg leading-relaxed mb-12">
                      {currentSlide.desc}
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/10">
                      {Object.entries(currentSlide.metrics).map(
                        ([key, value], i) => (
                          <div key={i}>
                            <span className="block text-[10px] uppercase tracking-widest text-white/40 mb-2">
                              {key}
                            </span>
                            <span className="block text-sm font-medium text-white/80">
                              {value}
                            </span>
                          </div>
                        ),
                      )}
                    </div>

                    <div className="mt-16">
                      <button
                        onClick={() => setAboutOpen(true)}
                        className="flex items-center gap-3 text-xs uppercase tracking-widest font-bold hover:text-emerald-400 transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-emerald-400 group-hover:bg-emerald-400/10 transition-all">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                        Read Full Story
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Controls (Bottom Right) */}
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 flex justify-between items-center border-t border-white/5 bg-[#0a0a0a] z-20">
            <div className="flex gap-4">
              <button
                onClick={() => setAutoplay(!autoplay)}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-colors"
              >
                {autoplay ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4 ml-0.5" />
                )}
              </button>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xs font-mono text-white/40 hidden md:block mr-4">
                0{currentIdx + 1} / 0{SLIDES.length}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => paginate(-1)}
                  className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => paginate(1)}
                  className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ==========================================
          ABOUT / INFO OVERLAY (FULL PAGE SCROLL)
          ========================================== */}
      <AnimatePresence>
        {aboutOpen && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-[#050505] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 left-0 w-full z-50 px-6 md:px-12 py-8 flex justify-between items-center bg-[#050505]/80 backdrop-blur-xl border-b border-white/5">
              <span className="text-xs uppercase tracking-widest font-bold text-emerald-400">
                Julian Hayes Studio
              </span>
              <button
                onClick={() => setAboutOpen(false)}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all bg-black/50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-w-[1400px] mx-auto">
              {/* Intro Hero */}
              <section className="px-6 md:px-12 py-24 md:py-48 grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32">
                <div>
                  <Reveal>
                    <h2 className="text-5xl md:text-7xl font-light mb-12 leading-tight">
                      Documenting the <br />
                      <span className="italic text-emerald-400">
                        shifting paradigms
                      </span>
                      <br />
                      of natural spaces.
                    </h2>
                  </Reveal>
                </div>
                <div>
                  <Reveal delay={0.2}>
                    <p className="text-xl md:text-2xl text-white/60 font-light leading-relaxed mb-8">
                      SplitRev is the creative practice of environmental
                      photographer and director Julian Hayes. Operating at the
                      boundary between fine art and photojournalism, the studio
                      focuses on long-form documentary projects that explore
                      humanity's relationship with extreme environments.
                    </p>
                    <p className="text-xl md:text-2xl text-white/60 font-light leading-relaxed">
                      By utilizing large-format analog film and cutting-edge
                      digital cinema systems, the resulting body of work demands
                      to be viewed at scale—forcing the viewer to confront the
                      sublime and terrifying beauty of a planet in flux.
                    </p>
                  </Reveal>
                </div>
              </section>

              {/* Press / Marquee */}
              <section className="py-24 border-y border-white/5 bg-[#0a0a0a] overflow-hidden">
                <div className="mb-16 text-center px-6">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-emerald-400 block mb-4">
                    Critical Acclaim
                  </span>
                  <h3 className="text-3xl font-medium">Selected Press</h3>
                </div>

                <div className="relative flex whitespace-nowrap">
                  <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10" />
                  <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10" />

                  <motion.div
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                      duration: 40,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="flex gap-8 px-4"
                  >
                    {[...PRESS, ...PRESS].map((p, i) => (
                      <div
                        key={i}
                        className="w-[400px] md:w-[500px] border border-white/10 p-10 bg-[#050505] whitespace-normal shrink-0"
                      >
                        <Star className="w-6 h-6 text-emerald-400 mb-8" />
                        <p className="text-xl italic text-white/80 leading-relaxed mb-8">
                          "{p.quote}"
                        </p>
                        <div>
                          <div className="font-bold text-sm">
                            {p.publication}
                          </div>
                          <div className="text-xs text-white/40">
                            {p.reviewer}
                          </div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </section>

              {/* Exhibitions */}
              <section className="py-24 md:py-48 px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16">
                <div className="lg:col-span-4">
                  <Reveal>
                    <h3 className="text-4xl font-medium mb-6">Exhibitions</h3>
                    <p className="text-white/50">
                      A comprehensive list of solo and group exhibitions
                      spanning the last decade.
                    </p>
                  </Reveal>
                </div>

                <div className="lg:col-span-8">
                  <div className="border-t border-white/10">
                    {EXHIBITIONS.map((ex, i) => (
                      <Reveal key={i} delay={i * 0.1}>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-8 border-b border-white/5 group hover:bg-white/[0.02] transition-colors -mx-6 px-6 sm:-mx-8 sm:px-8">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-16 mb-4 sm:mb-0">
                            <span className="font-mono text-white/40 text-sm">
                              {ex.year}
                            </span>
                            <div>
                              <span className="text-2xl font-light block mb-2">
                                {ex.title}
                              </span>
                              <span className="text-sm text-white/50">
                                {ex.desc}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-8 w-full sm:w-auto justify-between sm:justify-end shrink-0">
                            <span className="text-sm text-white/60">
                              {ex.venue}
                            </span>
                            <span className="text-xs uppercase tracking-widest bg-emerald-900/30 text-emerald-400 border border-emerald-900/50 px-3 py-1 rounded-full">
                              {ex.location}
                            </span>
                          </div>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </div>
              </section>

              {/* FAQ */}
              <section className="py-24 md:py-32 px-6 md:px-12 bg-[#0a0a0a] border-y border-white/5">
                <div className="max-w-[1000px] mx-auto">
                  <Reveal className="text-center mb-16">
                    <h3 className="text-4xl font-medium mb-4">
                      Inquiries & Policy
                    </h3>
                    <p className="text-white/50">
                      Details regarding prints, commissions, and methodology.
                    </p>
                  </Reveal>
                  <Reveal delay={0.2}>
                    <Accordion items={FAQS} />
                  </Reveal>
                </div>
              </section>

              {/* Contact Footer */}
              <section className="py-32 px-6 md:px-12 text-center">
                <Reveal>
                  <Compass className="w-16 h-16 text-emerald-400 mx-auto mb-10" />
                  <h2 className="text-4xl md:text-6xl font-light mb-8">
                    Commission a Project
                  </h2>
                  <p className="text-xl text-white/50 max-w-lg mx-auto mb-12">
                    Available for editorial assignments, commercial campaigns,
                    and fine art commissions globally.
                  </p>

                  <a
                    href="mailto:studio@splitrev.com"
                    className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black text-xs uppercase tracking-widest font-bold rounded-full hover:bg-emerald-400 transition-colors group"
                  >
                    <Mail className="w-5 h-5" /> studio@splitrev.com
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>

                  <div className="flex justify-center gap-8 mt-24">
                    <a
                      href="#"
                      className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-emerald-400 hover:text-black hover:border-emerald-400 transition-colors"
                    >
                      <Globe className="w-5 h-5" />
                    </a>
                    <a
                      href="#"
                      className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-emerald-400 hover:text-black hover:border-emerald-400 transition-colors"
                    >
                      <Globe className="w-5 h-5" />
                    </a>
                    <a
                      href="#"
                      className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-emerald-400 hover:text-black hover:border-emerald-400 transition-colors"
                    >
                      <Globe className="w-5 h-5" />
                    </a>
                  </div>
                </Reveal>
              </section>

              {/* Copyright Bar */}
              <div className="py-8 px-6 md:px-12 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-white/40">
                <span>
                  &copy; {new Date().getFullYear()} Julian Hayes Studio. All
                  rights reserved.
                </span>
                <div className="flex gap-6">
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy
                  </a>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
