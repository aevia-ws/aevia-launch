"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useInView,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowDown, MapPin, AlignRight, X, ChevronRight, Ruler, Hexagon, Layers, PenTool } from "lucide-react";

import "../premium.css";

/* ==========================================================================
   DATA STRUCTURES
   ========================================================================== */

const PROJECTS = [
  {
    id: "01",
    title: "The Monolith",
    location: "Oslo, Norway",
    type: "Cultural Center",
    year: "2024",
    desc: "A monolithic structure of exposed concrete and black basalt, designed to weather harmoniously with the harsh Nordic elements. It houses the national gallery of brutalist art.",
    image:
      "https://images.unsplash.com/photo-1541888081622-48df9202a6ce?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "02",
    title: "Void Residence",
    location: "Kyoto, Japan",
    type: "Private Home",
    year: "2023",
    desc: "An exploration of negative space. The residence wraps around an internal courtyard of black sand, providing complete visual isolation from the dense urban surroundings.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "03",
    title: "Aether Tower",
    location: "New York, USA",
    type: "Commercial",
    year: "2025",
    desc: "A 40-story commercial tower challenging the glass-box paradigm. Deep set windows and brutalist concrete fins reduce solar gain while creating dramatic shadow play.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "04",
    title: "Silent Pavilion",
    location: "Swiss Alps",
    type: "Retreat",
    year: "2022",
    desc: "A meditation retreat carved directly into the mountainside. The boundary between the raw geology and the engineered structure is intentionally blurred.",
    image:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=1600&auto=format&fit=crop",
  },
];

const EXPERTISE = [
  {
    title: "Spatial Planning",
    icon: <Ruler className="w-5 h-5" />,
    desc: "Rigorous optimization of volume and flow.",
  },
  {
    title: "Material Science",
    icon: <Hexagon className="w-5 h-5" />,
    desc: "Pioneering use of ultra-high performance concrete.",
  },
  {
    title: "Urban Integration",
    icon: <Layers className="w-5 h-5" />,
    desc: "Structures that command presence yet respect context.",
  },
  {
    title: "Bespoke Details",
    icon: <PenTool className="w-5 h-5" />,
    desc: "Custom hardware and joinery designed in-house.",
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
      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Custom cursor component for B&W theme
function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button, .hover-target")) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-black pointer-events-none z-[100] mix-blend-difference hidden md:flex items-center justify-center bg-white"
      animate={{
        x: mousePosition.x - 16,
        y: mousePosition.y - 16,
        scale: isHovering ? 2 : 1,
      }}
      transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
    >
      {isHovering && <div className="w-1 h-1 bg-black rounded-full" />}
    </motion.div>
  );
}

/* ==========================================================================
   MAIN PAGE COMPONENT
   ========================================================================== */

export default function VoidArchPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="premium-theme min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white cursor-none">
      <CustomCursor />

      {/* ==========================================
          NAVIGATION
          ========================================== */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-white/90 backdrop-blur-md py-4" : "bg-transparent py-8"}`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between mix-blend-difference text-white">
          <Link
            href="/"
            className="text-xl md:text-2xl font-bold tracking-tighter uppercase hover-target"
          >
            VOID<span className="font-light">ARCH</span>
          </Link>

          <div className="hidden lg:flex items-center gap-12 text-[10px] font-bold uppercase tracking-widest">
            <Link
              href="#"
              className="hover-target hover:opacity-50 transition-opacity"
            >
              Projects
            </Link>
            <Link
              href="#"
              className="hover-target hover:opacity-50 transition-opacity"
            >
              Practice
            </Link>
            <Link
              href="#"
              className="hover-target hover:opacity-50 transition-opacity"
            >
              Publications
            </Link>
            <Link
              href="#"
              className="hover-target hover:opacity-50 transition-opacity"
            >
              Contact
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen(true)}
            className="lg:hidden hover-target"
          >
            <AlignRight className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black text-white p-6 pt-24 flex flex-col"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-8 right-6 hover-target text-white/50 hover:text-white transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="flex flex-col gap-8 text-4xl font-light uppercase tracking-tighter">
              <Link
                href="#"
                onClick={() => setMenuOpen(false)}
                className="hover-target"
              >
                Projects
              </Link>
              <Link
                href="#"
                onClick={() => setMenuOpen(false)}
                className="hover-target"
              >
                Practice
              </Link>
              <Link
                href="#"
                onClick={() => setMenuOpen(false)}
                className="hover-target"
              >
                Publications
              </Link>
              <Link
                href="#"
                onClick={() => setMenuOpen(false)}
                className="hover-target"
              >
                Contact
              </Link>
            </div>
            <div className="mt-auto mb-8 font-mono text-sm text-white/50">
              hello@voidarch.studio <br />
              +47 400 500 600
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==========================================
          1. HERO TYPOGRAPHY
          ========================================== */}
      <section className="relative w-full min-h-[90svh] flex flex-col justify-between pt-32 pb-12 px-6 md:px-12 bg-white">
        <div className="max-w-[1600px] mx-auto w-full flex-1 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h1 className="text-[12vw] leading-[0.85] font-bold tracking-tighter uppercase mb-8">
              Absolute <br />
              <span className="font-light italic text-black/30">Form.</span>
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="md:col-start-7 md:col-span-5 text-xl md:text-2xl font-light leading-relaxed text-black/70"
            >
              We design uncompromising structures through the radical
              elimination of the unessential. Architecture reduced to its purest
              geometric essence.
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="max-w-[1600px] mx-auto w-full flex justify-between items-end border-t border-black/10 pt-8"
        >
          <div className="text-[10px] font-bold uppercase tracking-widest text-black/50">
            Oslo &mdash; Tokyo &mdash; New York
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
            <ArrowDown className="w-4 h-4 animate-bounce" /> Scroll to explore
          </div>
        </motion.div>
      </section>

      {/* ==========================================
          2. PROJECT ARCHIVE (Grayscale to Color Reveal)
          ========================================== */}
      <section className="py-24 bg-[#050505] text-white rounded-t-[40px] md:rounded-t-[80px] -mt-10 relative z-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-12">
          <Reveal className="mb-24 md:mb-32">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase">
              Selected Works
            </h2>
          </Reveal>

          <div className="flex flex-col gap-32 md:gap-48">
            {PROJECTS.map((project, i) => (
              <div
                key={project.id}
                className={`flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 md:gap-16 items-center`}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Image Area */}
                <Reveal delay={0.1} className="w-full md:w-3/5 hover-target">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-black group">
                    {/* The image is grayscale by default, reveals color on hover */}
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className={`object-cover transition-all duration-[1.5s] ease-out group-hover:scale-105 ${hoveredProject === project.id ? "grayscale-0" : "grayscale opacity-70"}`}
                    />
                    {/* Hover overlay text */}
                    <div
                      className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-500 ${hoveredProject === project.id ? "opacity-100" : "opacity-0"}`}
                    >
                      <span className="px-6 py-3 border border-white text-xs font-bold uppercase tracking-widest">
                        View Project
                      </span>
                    </div>
                  </div>
                </Reveal>

                {/* Text Area */}
                <div className="w-full md:w-2/5 flex flex-col">
                  <Reveal delay={0.2}>
                    <div className="font-mono text-sm text-white/50 mb-6">
                      {project.id} &mdash; {project.year}
                    </div>
                    <h3 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase mb-6">
                      {project.title}
                    </h3>

                    <div className="flex flex-wrap gap-4 mb-8">
                      <span className="px-3 py-1 border border-white/20 text-[10px] font-bold uppercase tracking-widest rounded-full">
                        {project.type}
                      </span>
                      <span className="px-3 py-1 border border-white/20 text-[10px] font-bold uppercase tracking-widest rounded-full flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {project.location}
                      </span>
                    </div>

                    <p className="text-white/60 text-lg leading-relaxed font-light mb-8">
                      {project.desc}
                    </p>

                    <button className="self-start pb-1 border-b border-white/30 text-[10px] font-bold uppercase tracking-widest hover:border-white transition-colors hover-target flex items-center gap-2">
                      Case Study <ArrowRight className="w-3 h-3" />
                    </button>
                  </Reveal>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          3. THE FIRM & EXPERTISE
          ========================================== */}
      <section className="py-32 bg-white text-black border-t border-black/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <h2 className="text-5xl md:text-6xl font-bold tracking-tighter uppercase mb-8">
                  The Practice
                </h2>
                <p className="text-xl text-black/60 font-light leading-relaxed mb-12">
                  Founded in 2012, VOID ARCH operates at the intersection of
                  brutalist heritage and contemporary parametric design. We
                  believe that architecture should be imposing, permanent, and
                  fiercely honest in its materiality.
                </p>
                <button className="px-8 py-4 bg-black text-white text-[10px] font-bold uppercase tracking-widest hover:bg-black/80 transition-colors hover-target">
                  About the Studio
                </button>
              </Reveal>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12 border-t border-black/10 pt-8">
                {EXPERTISE.map((exp, i) => (
                  <Reveal key={i} delay={i * 0.1}>
                    <div className="w-12 h-12 bg-black text-white flex items-center justify-center mb-6">
                      {exp.icon}
                    </div>
                    <h4 className="text-xl font-bold uppercase tracking-tight mb-3">
                      {exp.title}
                    </h4>
                    <p className="text-black/60 text-sm leading-relaxed">
                      {exp.desc}
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          3.5 THE PROCESS & METHODOLOGY
          ========================================== */}
      <section className="py-32 bg-[#050505] text-white border-y border-white/5 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <Reveal>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 block mb-6">
                  Workflow
                </span>
                <h2 className="text-4xl font-bold tracking-tighter uppercase mb-8">
                  From Concept to Permanence.
                </h2>
                <p className="text-white/50 font-light leading-relaxed mb-12">
                  Our process is a rigorous cycle of reduction and refinement.
                  We do not stop when there is nothing left to add, but when
                  there is nothing left to take away.
                </p>
                <button className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-white hover:text-white/60 transition-colors hover-target">
                  Download Protocol <ArrowRight className="w-4 h-4" />
                </button>
              </Reveal>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
              {[
                {
                  step: "01",
                  title: "Site Analysis",
                  desc: "Understanding the raw geology, light patterns, and cultural context of the location.",
                },
                {
                  step: "02",
                  title: "Volumetric Study",
                  desc: "Exploring the interaction of mass and void through physical scale models.",
                },
                {
                  step: "03",
                  title: "Technical Drafting",
                  desc: "Precision engineering of monolithic structures and custom material compositions.",
                },
                {
                  step: "04",
                  title: "Execution",
                  desc: "On-site oversight to ensure the purity of form is maintained during construction.",
                },
              ].map((item, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="border-l border-white/10 pl-8">
                    <span className="font-mono text-xs text-white/30 block mb-4">
                      {item.step} //
                    </span>
                    <h4 className="text-xl font-bold uppercase mb-4">
                      {item.title}
                    </h4>
                    <p className="text-white/40 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          4. MANIFESTO QUOTE
          ========================================== */}
      <section className="py-32 md:py-48 bg-[#f5f5f5] text-black border-y border-black/5">
        <div className="max-w-[1000px] mx-auto px-6 md:px-12 text-center">
          <Reveal>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-light leading-[1.2] tracking-tight">
              "We do not design buildings to blend in. We design interventions
              that force a dialogue between the observer and the environment."
            </h2>
            <div className="mt-12 text-[10px] font-bold uppercase tracking-widest text-black/40">
              — Manifesto, 2024
            </div>
          </Reveal>
        </div>
      </section>

      {/* ==========================================
          4.5 LEADERSHIP / PARTNERS
          ========================================== */}
      <section className="py-32 bg-white text-black">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <Reveal className="mb-20">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase">
              The Directors
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
            <Reveal delay={0.1}>
              <div className="group hover-target">
                <div className="relative aspect-[3/4] w-full overflow-hidden mb-8">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"
                    alt="Partner"
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <h4 className="text-2xl font-bold uppercase mb-2">
                  Erik Vance
                </h4>
                <span className="text-[10px] font-bold uppercase tracking-widest text-black/40">
                  Founding Partner / Oslo
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="group hover-target">
                <div className="relative aspect-[3/4] w-full overflow-hidden mb-8">
                  <Image
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
                    alt="Partner"
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <h4 className="text-2xl font-bold uppercase mb-2">
                  Dr. Sarah Tanaka
                </h4>
                <span className="text-[10px] font-bold uppercase tracking-widest text-black/40">
                  Design Director / Tokyo
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ==========================================
          5. MEGA FOOTER
          ========================================== */}
      <footer className="bg-black text-white pt-32 pb-12 px-6 md:px-12 rounded-t-[40px] md:rounded-t-[80px] -mt-10 relative z-20">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-24">
            <div className="lg:col-span-5">
              <Reveal>
                <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-8">
                  Initiate <br />
                  <span className="font-light text-white/50">Dialogue.</span>
                </h2>
                <a
                  href="mailto:inquiries@voidarch.studio"
                  className="text-xl md:text-2xl font-light hover:text-white/60 transition-colors border-b border-white/20 pb-2 hover-target"
                >
                  inquiries@voidarch.studio
                </a>
              </Reveal>
            </div>

            <div className="lg:col-span-2 lg:col-start-7">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-6">
                Oslo HQ
              </h4>
              <p className="text-sm text-white/70 leading-relaxed">
                Aker Brygge 12
                <br />
                0250 Oslo
                <br />
                Norway
                <br />
                +47 400 500 600
              </p>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-6">
                Network
              </h4>
              <ul className="space-y-4 text-sm text-white/70">
                <li>
                  <Link
                    href="#"
                    className="hover:text-white transition-colors hover-target"
                  >
                    Globe
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-white transition-colors hover-target"
                  >
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-white transition-colors hover-target"
                  >
                    ArchDaily
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-white transition-colors hover-target"
                  >
                    Dezeen
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-6">
                Legal
              </h4>
              <ul className="space-y-4 text-sm text-white/70">
                <li>
                  <Link
                    href="#"
                    className="hover:text-white transition-colors hover-target"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-white transition-colors hover-target"
                  >
                    Terms of Use
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-white transition-colors hover-target"
                  >
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/30">
            <span>
              &copy; {new Date().getFullYear()} VOID ARCHITECTURE. All rights
              reserved.
            </span>
            <div className="flex items-center gap-2">
              Designed in Oslo{" "}
              <div className="w-1.5 h-1.5 bg-white rounded-full ml-1" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
