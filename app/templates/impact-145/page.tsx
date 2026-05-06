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
import { Play, Pause, FastForward, Rewind, Volume2, Mic2, Headphones, Star, ArrowRight, Rss, Share2, Download, Clock, Calendar, CheckCircle2, Menu, X, ChevronRight, Activity } from "lucide-react";

import "../premium.css";

/* ==========================================================================
   DATA STRUCTURES
   ========================================================================== */

const EPISODES = [
  {
    id: "ep-42",
    num: "42",
    title: "The Architecture of Artificial Consciousness",
    guest: "Dr. Elena Rostova",
    date: "Oct 12, 2024",
    duration: "1:24:10",
    desc: "We explore the terrifying and exhilarating implications of the new neural mesh framework. Will AGI dream of electric sheep, or something far more complex?",
    tags: ["AI", "Philosophy", "Future"],
  },
  {
    id: "ep-41",
    num: "41",
    title: "Quantum Computing for the Rest of Us",
    guest: "Dr. Arthur Vance",
    date: "Oct 05, 2024",
    duration: "58:45",
    desc: "Demystifying qubits, superposition, and entanglement. We discuss how quantum advantage will shatter current cryptography models in the next decade.",
    tags: ["Quantum", "Security", "Tech"],
  },
  {
    id: "ep-40",
    num: "40",
    title: "Building Sovereign Infrastructure",
    guest: "Marcus Chen",
    date: "Sep 28, 2024",
    duration: "1:12:30",
    desc: "How megacities of the future will generate their own power, grow their own food, and operate independently of legacy nation-state grids.",
    tags: ["Urbanism", "Energy", "Society"],
  },
  {
    id: "ep-39",
    num: "39",
    title: "The Death of the Traditional Internet",
    guest: "Sarah Jenkins",
    date: "Sep 21, 2024",
    duration: "1:05:20",
    desc: "Transitioning from the 2D web to immersive spatial computing. Why browsers will be obsolete by 2030.",
    tags: ["Web3", "Spatial", "Design"],
  },
];

const PLATFORMS = [
  { name: "Apple Podcasts", icon: "Apl" },
  { name: "Spotify", icon: "Spt" },
  { name: "Overcast", icon: "Ovc" },
  { name: "Pocket Casts", icon: "Pck" },
  { name: "YouTube", icon: "Ytb" },
];

const REVIEWS = [
  {
    text: "Easily the most insightful tech podcast available right now. The hosts manage to break down incredibly complex topics without talking down to the audience.",
    author: "TechInsider",
    rating: 5,
  },
  {
    text: "I've learned more about the future of computing from listening to 10 episodes of Deepcast than I did in my entire computer science degree.",
    author: "DevLife42",
    rating: 5,
  },
  {
    text: "Impeccable audio quality, fantastic guests, and questions that actually challenge the industry's status quo.",
    author: "Sarah M.",
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
      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Simulated Audio Activity
function Activity({ isPlaying }: { isPlaying: boolean }) {
  return (
    <div className="flex items-center gap-[2px] h-8 w-24">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="w-1 bg-yellow-400 rounded-full"
          animate={
            isPlaying
              ? {
                  height: ["20%", "100%", "40%", "80%", "20%"],
                }
              : {
                  height: "20%",
                }
          }
          transition={
            isPlaying
              ? {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.1,
                }
              : { duration: 0.3 }
          }
        />
      ))}
    </div>
  );
}

/* ==========================================================================
   MAIN PAGE COMPONENT
   ========================================================================== */

export default function DeepcastPage() {
  const [activeEpisode, setActiveEpisode] = useState(EPISODES[0].id);
  const [isPlaying, setIsPlaying] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const togglePlay = (id: string) => {
    if (activeEpisode === id) {
      setIsPlaying(!isPlaying);
    } else {
      setActiveEpisode(id);
      setIsPlaying(true);
    }
  };

  return (
    <div className="premium-theme min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-yellow-500/30 selection:text-white overflow-x-hidden">
      {/* ==========================================
          GLOBAL AUDIO BAR (Sticky Bottom)
          ========================================== */}
      <AnimatePresence>
        {(activeEpisode || isPlaying) && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            className="fixed bottom-0 left-0 w-full z-[100] bg-[#0f172a]/95 backdrop-blur-xl border-t border-slate-800 p-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"
          >
            {/* Progress Bar (Absolute top) */}
            <div className="absolute top-0 left-0 w-full h-1 bg-slate-800">
              <motion.div
                className="h-full bg-yellow-400 relative"
                animate={{ width: isPlaying ? "100%" : "35%" }}
                transition={{
                  duration: isPlaying ? 3600 : 0.5,
                  ease: "linear",
                }}
              />
            </div>

            <div className="flex items-center gap-4 w-full md:w-1/3">
              <div className="w-12 h-12 rounded-md overflow-hidden relative shrink-0">
                <Image
                  src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=200&auto=format&fit=crop"
                  alt="Cover"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs text-yellow-400 font-bold mb-1">
                  Now Playing
                </div>
                <div className="text-sm font-bold truncate text-white">
                  {EPISODES.find((e) => e.id === activeEpisode)?.title}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 w-full md:w-1/3 justify-center">
              <button className="text-slate-400 hover:text-white transition-colors">
                <Rewind className="w-5 h-5 fill-current" />
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-12 h-12 rounded-full bg-yellow-400 text-slate-900 flex items-center justify-center hover:scale-105 transition-transform"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 fill-current" />
                ) : (
                  <Play className="w-5 h-5 fill-current ml-1" />
                )}
              </button>
              <button className="text-slate-400 hover:text-white transition-colors">
                <FastForward className="w-5 h-5 fill-current" />
              </button>
            </div>

            <div className="hidden md:flex items-center gap-4 w-1/3 justify-end text-slate-400">
              <Volume2 className="w-4 h-4" />
              <div className="w-24 h-1.5 bg-slate-800 rounded-full">
                <div className="w-2/3 h-full bg-slate-400 rounded-full" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==========================================
          NAVIGATION
          ========================================== */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-[#020617]/90 backdrop-blur-md border-b border-slate-800 py-4" : "bg-transparent py-8"}`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-black tracking-tighter flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-yellow-400 text-slate-900 flex items-center justify-center">
              <Mic2 className="w-5 h-5" />
            </div>
            DEEP<span className="font-light text-slate-500">CAST</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-slate-400">
            <Link href="#" className="hover:text-yellow-400 transition-colors">
              Episodes
            </Link>
            <Link href="#" className="hover:text-yellow-400 transition-colors">
              About Hosts
            </Link>
            <Link href="#" className="hover:text-yellow-400 transition-colors">
              Sponsors
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            {PLATFORMS.slice(0, 3).map((p, i) => (
              <button
                key={i}
                className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center text-slate-400 hover:text-yellow-400 hover:border-yellow-400 transition-all text-xs font-bold"
              >
                {p.icon}
              </button>
            ))}
            <div className="w-[1px] h-6 bg-slate-800 mx-2" />
            <button className="px-6 py-2.5 bg-white text-slate-900 text-[10px] font-bold uppercase tracking-widest hover:bg-yellow-400 transition-colors rounded-full">
              Subscribe
            </button>
          </div>

          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden text-white"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* ==========================================
          1. HERO SECTION
          ========================================== */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden bg-[#0f172a] border-b border-slate-800">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-yellow-400/5 blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-400/20 bg-yellow-400/10 text-yellow-400 text-[10px] font-bold uppercase tracking-widest mb-8">
                <Star className="w-3 h-3 fill-current" /> Top 10 Technology
                Podcast 2024
              </div>

              <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.1] mb-8">
                Decoding the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-200">
                  Signals of the Future.
                </span>
              </h1>

              <p className="text-lg md:text-xl text-slate-400 mb-10 leading-relaxed max-w-xl font-light">
                Join industry veterans as they deconstruct the technologies,
                philosophies, and paradigms that will shape the next hundred
                years of human evolution.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button
                  onClick={() => togglePlay(EPISODES[0].id)}
                  className="px-8 py-4 bg-yellow-400 text-slate-900 font-bold rounded-full hover:bg-white transition-colors flex items-center justify-center gap-3"
                >
                  {isPlaying && activeEpisode === EPISODES[0].id ? (
                    <Pause className="w-5 h-5 fill-current" />
                  ) : (
                    <Play className="w-5 h-5 fill-current" />
                  )}
                  Listen to Latest
                </button>
                <button className="px-8 py-4 border border-slate-700 text-white font-bold rounded-full hover:bg-slate-800 transition-colors flex items-center justify-center gap-3">
                  <Rss className="w-5 h-5" /> All Platforms
                </button>
              </div>

              <div className="flex items-center gap-6 text-sm text-slate-500 font-bold">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-[#0f172a] bg-slate-800 overflow-hidden relative"
                    >
                      <Image
                        src={`https://images.unsplash.com/photo-${1500000000000 + i * 100000}?q=80&w=100&auto=format&fit=crop`}
                        alt="User"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div>Join 500,000+ weekly listeners</div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5 relative hidden md:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative aspect-square w-full max-w-[500px] mx-auto rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-slate-700"
            >
              <Image
                src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1000&auto=format&fit=crop"
                alt="Podcast Cover"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="text-yellow-400 font-black text-4xl tracking-tighter mb-2">
                  DEEPCAST
                </div>
                <div className="text-white text-sm font-bold uppercase tracking-widest opacity-80">
                  Hosted by Alex Chen
                </div>
              </div>
            </motion.div>

            {/* Floating element */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 bg-slate-900 border border-slate-700 p-6 rounded-2xl shadow-2xl flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-yellow-400/20 flex items-center justify-center">
                <Mic2 className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <div className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">
                  Studio Grade
                </div>
                <div className="font-mono text-sm text-white">
                  48kHz / 24-bit Audio
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==========================================
          2. EPISODE LIST
          ========================================== */}
      <section className="py-32 bg-[#020617] relative z-20">
        <div className="max-w-[1000px] mx-auto px-6 md:px-12">
          <div className="flex justify-between items-end mb-16 border-b border-slate-800 pb-8">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
                Recent Transmissions
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <button className="hidden sm:flex items-center gap-2 text-yellow-400 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors">
                View All Episodes <ArrowRight className="w-4 h-4" />
              </button>
            </Reveal>
          </div>

          <div className="space-y-8">
            {EPISODES.map((ep, i) => {
              const isCurrentlyPlaying = isPlaying && activeEpisode === ep.id;

              return (
                <Reveal key={ep.id} delay={i * 0.1}>
                  <div
                    className={`p-8 rounded-2xl border transition-all duration-300 group ${activeEpisode === ep.id ? "bg-[#0f172a] border-yellow-400/30 shadow-[0_0_30px_rgba(234,179,8,0.05)]" : "bg-[#0f172a]/50 border-slate-800 hover:border-slate-600"}`}
                  >
                    <div className="flex flex-col md:flex-row gap-8">
                      {/* Left: Play Button & Info */}
                      <div className="md:w-1/4 flex flex-row md:flex-col justify-between items-start">
                        <div className="flex flex-col gap-2 mb-6">
                          <span className="text-[10px] font-mono text-slate-500">
                            EPISODE {ep.num}
                          </span>
                          <span className="text-xs font-bold text-slate-400">
                            {ep.date}
                          </span>
                          <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {ep.duration}
                          </span>
                        </div>

                        <button
                          onClick={() => togglePlay(ep.id)}
                          className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-lg shrink-0 ${activeEpisode === ep.id ? "bg-yellow-400 text-slate-900" : "bg-slate-800 text-white group-hover:bg-yellow-400 group-hover:text-slate-900"}`}
                        >
                          {isCurrentlyPlaying ? (
                            <Pause className="w-6 h-6 fill-current" />
                          ) : (
                            <Play className="w-6 h-6 fill-current ml-1" />
                          )}
                        </button>
                      </div>

                      {/* Right: Content */}
                      <div className="md:w-3/4">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {ep.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-slate-800 text-slate-300 text-[10px] font-bold uppercase tracking-widest rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <h3
                          className={`text-2xl md:text-3xl font-bold mb-4 ${activeEpisode === ep.id ? "text-yellow-400" : "text-white group-hover:text-yellow-400 transition-colors"}`}
                        >
                          {ep.title}
                        </h3>

                        <div className="text-sm font-bold text-slate-400 mb-6 flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-slate-700 overflow-hidden relative">
                            <Image
                              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop"
                              alt="Guest"
                              fill
                              className="object-cover"
                            />
                          </div>
                          Guest: {ep.guest}
                        </div>

                        <p className="text-slate-400 leading-relaxed font-light mb-8">
                          {ep.desc}
                        </p>

                        <div className="flex items-center gap-6 pt-6 border-t border-slate-800">
                          {activeEpisode === ep.id && (
                            <Activity isPlaying={isPlaying} />
                          )}
                          <div className="flex items-center gap-4 ml-auto">
                            <button className="text-slate-500 hover:text-white transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                              <Share2 className="w-4 h-4" /> Share
                            </button>
                            <button className="text-slate-500 hover:text-white transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                              <Download className="w-4 h-4" /> DL
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <div className="mt-16 text-center">
            <button className="px-8 py-4 border border-slate-700 text-white font-bold rounded-full hover:bg-slate-800 transition-colors inline-flex items-center justify-center gap-3">
              Load Older Episodes <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* ==========================================
          3. ABOUT THE HOST / MANIFESTO
          ========================================== */}
      <section className="py-32 bg-[#0f172a] overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <Reveal className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1200&auto=format&fit=crop"
              alt="Host Studio"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-slate-900/40 mix-blend-multiply" />
            <div className="absolute bottom-6 left-6 bg-slate-900/80 backdrop-blur-md border border-slate-700 p-4 rounded-xl flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
              <span className="font-mono text-sm font-bold">
                LIVE RECORDING STUDIO 01
              </span>
            </div>
          </Reveal>

          <div>
            <Reveal delay={0.2}>
              <span className="text-[10px] text-yellow-400 uppercase tracking-[0.3em] font-bold block mb-4">
                The Mission
              </span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-8">
                Cutting through the noise.
              </h2>
              <p className="text-lg text-slate-400 leading-relaxed font-light mb-8">
                The tech industry is drowning in hype cycles and superficial
                analysis. Deepcast was founded on a simple premise: invite the
                smartest people in the world, and let them speak without
                soundbites or artificial time limits.
              </p>

              <ul className="space-y-4 mb-12">
                {[
                  "No sponsor reads interrupting the flow.",
                  "Long-form, unedited conversations.",
                  "Deep dives into whitepapers, not press releases.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                    <span className="text-slate-300 font-bold">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-6 p-6 border border-slate-700 rounded-2xl bg-[#020617]">
                <div className="w-16 h-16 rounded-full overflow-hidden relative shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop"
                    alt="Host"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-1">
                    Alex Chen
                  </h4>
                  <p className="text-sm text-slate-400">
                    Former Staff Engineer at DeepMind. Host & Producer.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ==========================================
          4. REVIEWS
          ========================================== */}
      <section className="py-32 bg-[#020617] border-y border-slate-800">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <Reveal className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter">
              Listener Verdict
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS.map((r, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="p-8 rounded-2xl border border-slate-800 bg-[#0f172a] h-full flex flex-col">
                  <div className="flex gap-1 mb-6">
                    {[...Array(r.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-lg text-slate-300 leading-relaxed mb-8 flex-1 font-light">
                    "{r.text}"
                  </p>
                  <div className="font-bold text-white flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs text-slate-500 uppercase">
                      {r.author.substring(0, 2)}
                    </div>
                    {r.author}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          5. MEGA FOOTER
          ========================================== */}
      <footer className="bg-[#0f172a] pt-32 pb-12 px-6 md:px-12 relative overflow-hidden pb-32 md:pb-12">
        {" "}
        {/* Extra padding bottom for global player */}
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            <div className="lg:col-span-1">
              <Link
                href="/"
                className="text-2xl font-black tracking-tighter mb-6 flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-yellow-400 text-slate-900 flex items-center justify-center">
                  <Mic2 className="w-5 h-5" />
                </div>
                DEEP<span className="font-light text-slate-500">CAST</span>
              </Link>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                Independent technology journalism through long-form
                conversation.
              </p>
              <div className="flex gap-4">
                {PLATFORMS.slice(0, 4).map((p, i) => (
                  <button
                    key={i}
                    className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-yellow-400 hover:text-slate-900 transition-all font-bold text-xs"
                    title={p.name}
                  >
                    {p.icon}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Directory</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li>
                  <Link
                    href="#"
                    className="hover:text-yellow-400 transition-colors"
                  >
                    All Episodes
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-yellow-400 transition-colors"
                  >
                    Guests (A-Z)
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-yellow-400 transition-colors"
                  >
                    Topics
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-yellow-400 transition-colors"
                  >
                    Transcripts
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Network</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li>
                  <Link
                    href="#"
                    className="hover:text-yellow-400 transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-yellow-400 transition-colors"
                  >
                    Sponsorship
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-yellow-400 transition-colors"
                  >
                    Pitch a Guest
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-yellow-400 transition-colors"
                  >
                    Merch Store
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Newsletter</h4>
              <p className="text-sm text-slate-400 mb-4">
                Get the show notes, further reading, and exclusive content
                delivered weekly.
              </p>
              <form
                className="flex flex-col gap-3"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full bg-[#020617] border border-slate-800 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 text-white transition-colors"
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-slate-800 text-white font-bold rounded-lg hover:bg-yellow-400 hover:text-slate-900 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-slate-800 text-[10px] uppercase tracking-widest font-bold text-slate-500">
            <span>
              &copy; {new Date().getFullYear()} Deepcast Media. All rights
              reserved.
            </span>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
