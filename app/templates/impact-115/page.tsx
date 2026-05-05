"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, Waves, Wind, Sun, Menu, X, Globe, ArrowUpRight, Play, Compass, MapPin } from "lucide-react";

import "../premium.css";

/* ==========================================================================
   DATA STRUCTURES
   ========================================================================== */

const PROJECTS = [
  {
    id: "p1",
    title: "Verdant Canopy",
    category: "Architecture",
    location: "Singapore",
    year: "2025",
    desc: "A residential complex redefining biophilic design. The structure breathes with the environment, capturing rainwater and optimizing natural wind flows to reduce ambient temperature by 4 degrees.",
    image:
      "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1200&auto=format&fit=crop",
    speed: 0.1,
  },
  {
    id: "p2",
    title: "The Glass House",
    category: "Interior",
    location: "Kyoto, Japan",
    year: "2024",
    desc: "Seamlessly blending indoor and outdoor spaces, this sanctuary uses refractive materials to scatter sunlight, creating a living painting that changes every hour.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    speed: 0.25,
  },
  {
    id: "p3",
    title: "Moss Pavilion",
    category: "Public Space",
    location: "Oslo, Norway",
    year: "2023",
    desc: "An acoustic dampening structure built entirely from sustainably harvested moss and reclaimed timber, providing a silent retreat in the heart of the bustling city.",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop",
    speed: 0.15,
  },
  {
    id: "p4",
    title: "Thermal Baths",
    category: "Wellness",
    location: "Vals, Switzerland",
    year: "2026",
    desc: "Carved directly into the mountainside, these baths utilize geothermal energy to maintain perfect temperatures year-round, wrapped in local quartzite.",
    image:
      "https://images.unsplash.com/photo-1542314831-c6a4d14faaf2?q=80&w=1200&auto=format&fit=crop",
    speed: 0.3,
  },
  {
    id: "p5",
    title: "Bamboo Node",
    category: "Infrastructure",
    location: "Bali, Indonesia",
    year: "2024",
    desc: "A sprawling community center utilizing structural bamboo to create sweeping, organic arches that withstand severe weather while remaining entirely biodegradable.",
    image:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=1200&auto=format&fit=crop",
    speed: 0.2,
  },
];

const PHILOSOPHY = [
  {
    icon: <Leaf className="w-6 h-6" />,
    title: "Biophilic Core",
    desc: "We design structures that do not just exist in nature, but actively participate in the local ecosystem.",
  },
  {
    icon: <Waves className="w-6 h-6" />,
    title: "Fluid Dynamics",
    desc: "Harnessing natural air and water flows to passively regulate temperature, reducing energy reliance.",
  },
  {
    icon: <Sun className="w-6 h-6" />,
    title: "Solar Sculpting",
    desc: "Using algorithmic modeling to maximize natural light penetration while minimizing thermal gain.",
  },
  {
    icon: <Wind className="w-6 h-6" />,
    title: "Breathable Materials",
    desc: "Prioritizing porous, locally sourced materials that age gracefully and sequester carbon.",
  },
];

const TEAM = [
  {
    name: "Elena Rostova",
    role: "Principal Architect",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "David Chen",
    role: "Head of Biophilic Design",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Sarah Jenkins",
    role: "Material Scientist",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
  },
];

/* ==========================================================================
   UTILITY COMPONENTS
   ========================================================================== */

function ParallaxImage({
  src,
  alt,
  speed,
  className,
}: {
  src: string;
  alt: string;
  speed: number;
  className: string;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={{ y, scale: 1.1 }}
        className="absolute inset-0 w-full h-full"
      >
        <Image src={src} alt={alt} fill className="object-cover" />
      </motion.div>
    </div>
  );
}

function RevealText({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay, ease: [0.76, 0, 0.24, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ==========================================================================
   MAIN PAGE COMPONENT
   ========================================================================== */

export default function VerdaParallaxPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 20,
    stiffness: 100,
  });
  const progressBarHeight = useTransform(
    smoothProgress,
    [0, 1],
    ["0%", "100%"],
  );

  return (
    <div
      ref={containerRef}
      className="premium-theme min-h-screen bg-[#021008] text-[#e2e8f0] font-sans selection:bg-[#10b981]/30 selection:text-white"
    >
      {/* Scroll Progress Bar */}
      <div className="fixed right-0 top-0 w-1 h-full bg-white/5 z-50">
        <motion.div
          style={{ height: progressBarHeight }}
          className="w-full bg-[#10b981]"
        />
      </div>

      {/* ==========================================
          NAVIGATION
          ========================================== */}
      <nav
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 px-6 md:px-12 ${scrolled ? "bg-[#021008]/80 backdrop-blur-xl py-4 border-b border-white/5" : "bg-transparent py-8"}`}
      >
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="text-xl md:text-2xl font-medium tracking-widest uppercase flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-[#10b981] flex items-center justify-center">
              <Leaf className="w-4 h-4 text-[#021008]" />
            </div>
            Verda
          </Link>

          <div className="hidden lg:flex items-center gap-12 text-xs uppercase tracking-[0.2em] font-semibold text-white/60">
            <Link href="#" className="hover:text-[#10b981] transition-colors">
              Projects
            </Link>
            <Link href="#" className="hover:text-[#10b981] transition-colors">
              Philosophy
            </Link>
            <Link href="#" className="hover:text-[#10b981] transition-colors">
              Studio
            </Link>
            <Link href="#" className="hover:text-[#10b981] transition-colors">
              Journal
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-white hover:text-[#10b981] transition-colors"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          <div className="hidden lg:block">
            <button className="px-6 py-2.5 border border-white/20 rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-white hover:text-[#021008] transition-colors">
              Start a Project
            </button>
          </div>
        </div>
      </nav>

      {/* ==========================================
          MOBILE MENU
          ========================================== */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-30 bg-[#021008] pt-32 px-6 flex flex-col"
          >
            <div className="flex flex-col gap-6 text-4xl font-light">
              <Link href="#" onClick={() => setMenuOpen(false)}>
                Projects
              </Link>
              <Link href="#" onClick={() => setMenuOpen(false)}>
                Philosophy
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
          1. HERO SECTION (Immersive Video/Image)
          ========================================== */}
      <section className="relative w-full h-[100svh] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2000&auto=format&fit=crop"
            alt="Hero background"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#021008]/40 via-transparent to-[#021008]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.1)_0%,rgba(0,0,0,0)_80%)]" />
        </div>

        <div className="relative z-10 text-center px-6 mt-16 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#10b981]/30 bg-[#10b981]/10 text-[#10b981] text-[10px] uppercase tracking-widest font-bold mb-8 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />{" "}
              Architecture for the Anthropocene
            </span>
          </motion.div>

          <RevealText>
            <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-medium tracking-tighter leading-[0.9] mb-8">
              Living <br className="hidden md:block" />
              <span className="italic font-light text-[#10b981]">
                Structures.
              </span>
            </h1>
          </RevealText>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
              We design spaces that breathe, adapt, and regenerate. Blending
              advanced parametric modeling with ancient biomimetic principles.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/40 z-10"
        >
          <span className="text-[9px] uppercase tracking-[0.3em]">
            Scroll to Explore
          </span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-white/40 to-transparent" />
        </motion.div>
      </section>

      {/* ==========================================
          2. PHILOSOPHY
          ========================================== */}
      <section className="py-32 md:py-48 px-6 md:px-12 bg-[#021008] relative z-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-32">
            <div className="lg:col-span-5">
              <RevealText>
                <h2 className="text-4xl md:text-6xl font-medium tracking-tight leading-tight">
                  Design that <br />
                  <span className="italic text-[#10b981]">responds</span> to
                  life.
                </h2>
              </RevealText>
            </div>
            <div className="lg:col-span-7 lg:pl-16">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl md:text-2xl text-white/60 font-light leading-relaxed"
              >
                The era of static, energy-consuming boxes is over. We believe
                buildings should act as living organisms—generating their own
                energy, managing their own water, and actively improving the
                health of their occupants and the surrounding ecosystem.
              </motion.p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PHILOSOPHY.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-white/[0.02] border border-[#10b981]/10 hover:bg-white/[0.04] transition-colors group"
              >
                <div className="w-14 h-14 rounded-full bg-[#10b981]/10 flex items-center justify-center text-[#10b981] mb-8 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-medium mb-4">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          3. MULTI-SPEED PARALLAX GALLERY
          ========================================== */}
      <section className="py-24 md:py-32 bg-[#010a05] border-y border-white/5 relative overflow-hidden">
        {/* Background typographic watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-[0.03] z-0">
          <span className="text-[20vw] font-bold tracking-tighter whitespace-nowrap">
            ARCHIVE
          </span>
        </div>

        <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
          <div className="flex justify-between items-end mb-24">
            <RevealText>
              <h2 className="text-5xl md:text-7xl font-medium tracking-tight">
                Selected <br />
                <span className="italic text-[#10b981]">Works.</span>
              </h2>
            </RevealText>
            <Link
              href="#"
              className="hidden md:flex items-center gap-2 text-xs uppercase tracking-widest font-bold hover:text-[#10b981] transition-colors pb-2 border-b border-white/20"
            >
              View All Projects <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-32 md:space-y-48">
            {PROJECTS.map((project, i) => {
              const isEven = i % 2 === 0;
              return (
                <div
                  key={project.id}
                  className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-12 lg:gap-24 items-center`}
                >
                  {/* Image with Parallax */}
                  <div className="w-full md:w-3/5 lg:w-2/3">
                    <ParallaxImage
                      src={project.image}
                      alt={project.title}
                      speed={project.speed}
                      className="aspect-[4/3] md:aspect-[16/10] rounded-3xl"
                    />
                  </div>

                  {/* Content */}
                  <div className="w-full md:w-2/5 lg:w-1/3">
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8 }}
                    >
                      <div className="flex gap-3 mb-6">
                        <span className="px-3 py-1 border border-white/10 rounded-full text-[9px] uppercase tracking-widest text-white/60">
                          {project.category}
                        </span>
                        <span className="px-3 py-1 border border-white/10 rounded-full text-[9px] uppercase tracking-widest text-white/60">
                          {project.year}
                        </span>
                      </div>
                      <h3 className="text-3xl md:text-5xl font-medium mb-6">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-2 text-[#10b981] text-sm font-medium mb-6">
                        <MapPin className="w-4 h-4" /> {project.location}
                      </div>
                      <p className="text-white/50 text-lg font-light leading-relaxed mb-8">
                        {project.desc}
                      </p>
                      <button className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#10b981] hover:border-[#10b981] hover:text-[#021008] transition-all group">
                        <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </button>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==========================================
          4. THE STUDIO / TEAM
          ========================================== */}
      <section className="py-32 md:py-48 px-6 md:px-12 bg-[#021008]">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-24">
            <RevealText>
              <span className="text-[#10b981] text-[10px] uppercase tracking-[0.3em] font-bold mb-4 block">
                Our Studio
              </span>
              <h2 className="text-4xl md:text-6xl font-medium tracking-tight">
                The minds behind <br />
                <span className="italic">the matter.</span>
              </h2>
            </RevealText>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {TEAM.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[3/4] rounded-3xl overflow-hidden mb-6">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#021008] via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h4 className="text-2xl font-medium mb-1">{member.name}</h4>
                    <p className="text-[#10b981] text-sm uppercase tracking-widest font-semibold">
                      {member.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          5. MANIFESTO / VIDEO CTA
          ========================================== */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2000&auto=format&fit=crop"
            alt="Manifesto"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#021008]/80 backdrop-blur-sm" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <RevealText>
            <button className="w-24 h-24 rounded-full bg-[#10b981] text-[#021008] flex items-center justify-center mx-auto mb-12 hover:scale-110 transition-transform">
              <Play className="w-8 h-8 ml-1" />
            </button>
            <h2 className="text-3xl md:text-5xl font-light leading-relaxed mb-12">
              "We cannot build our way out of the climate crisis using the same
              thinking that got us into it. Architecture must become a mechanism
              for healing."
            </h2>
            <span className="text-sm font-bold uppercase tracking-widest text-[#10b981]">
              Watch our Manifesto
            </span>
          </RevealText>
        </div>
      </section>

      {/* ==========================================
          6. MEGA FOOTER
          ========================================== */}
      <footer className="bg-[#010a05] pt-32 pb-12 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mb-32">
            <div>
              <h2 className="text-5xl md:text-7xl font-medium tracking-tight mb-6">
                Let's build <br />
                <span className="italic text-[#10b981]">tomorrow.</span>
              </h2>
              <a
                href="mailto:hello@verda.studio"
                className="text-xl md:text-2xl text-white/60 hover:text-white transition-colors border-b border-white/20 pb-2 inline-block"
              >
                hello@verda.studio
              </a>
            </div>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#10b981] hover:border-[#10b981] hover:text-[#021008] transition-all"
              >
                <Globe className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#10b981] hover:border-[#10b981] hover:text-[#021008] transition-all text-xs font-bold uppercase tracking-wider"
              >
                In
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20 border-t border-white/5 pt-16">
            <div>
              <Link
                href="/"
                className="text-2xl font-medium tracking-widest uppercase flex items-center gap-3 mb-8"
              >
                <div className="w-6 h-6 rounded-full bg-[#10b981] flex items-center justify-center">
                  <Leaf className="w-3 h-3 text-[#021008]" />
                </div>
                Verda
              </Link>
              <p className="text-white/40 text-sm leading-relaxed max-w-xs">
                Biophilic architecture and sustainable design studio based in
                Oslo, Norway. Operating globally.
              </p>
            </div>

            <div>
              <h4 className="text-[10px] text-white/50 uppercase tracking-widest font-bold mb-6">
                Studios
              </h4>
              <ul className="space-y-4 text-sm text-white/70">
                <li>
                  <strong className="block text-white mb-1">Oslo (HQ)</strong>
                  Dronning Eufemias gate 16
                  <br />
                  0191 Oslo, Norway
                </li>
                <li className="pt-4">
                  <strong className="block text-white mb-1">Singapore</strong>
                  18 Robinson Road
                  <br />
                  Singapore 048547
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] text-white/50 uppercase tracking-widest font-bold mb-6">
                Index
              </h4>
              <ul className="space-y-4 text-sm text-white/70">
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#10b981] transition-colors"
                  >
                    All Projects
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#10b981] transition-colors"
                  >
                    Our Philosophy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#10b981] transition-colors"
                  >
                    Team & Culture
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#10b981] transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#10b981] transition-colors"
                  >
                    Press
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] text-white/50 uppercase tracking-widest font-bold mb-6">
                Newsletter
              </h4>
              <p className="text-sm text-white/60 mb-6">
                Insights on sustainable design and biophilic architecture,
                delivered monthly.
              </p>
              <form
                className="flex border-b border-white/20 pb-2"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  placeholder="Email address"
                  className="bg-transparent flex-1 text-sm focus:outline-none text-white placeholder-white/30"
                />
                <button
                  type="submit"
                  className="text-[10px] uppercase tracking-widest font-bold text-[#10b981] hover:text-white transition-colors"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/5 text-[10px] text-white/30 uppercase tracking-widest font-bold">
            <span>
              &copy; {new Date().getFullYear()} Verda Architecture Studio. All
              Rights Reserved.
            </span>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
