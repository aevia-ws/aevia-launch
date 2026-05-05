"use client"

import { motion, useScroll, useTransform, useInView, AnimatePresence, useMotionValue, useSpring } from "framer-motion"
import { useState, useRef, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Rocket, Globe, Moon, Sun, Star, Mail, MapPin, ChevronRight, ArrowRight, X, Menu, Compass, Shield, Timer, Zap, Navigation, Telescope, Microscope, Settings2, Activity, Info, Share2, Heart, Search, ShoppingBag, Eye, CloudMoon, Orbit } from "lucide-react"

import "../premium.css";

/* ==========================================================================
   DATA STRUCTURES
   ========================================================================= */

const MISSIONS = [
  { 
    id: 1, 
    name: "Lunar Descent", 
    category: "Deep Space", 
    price: "$2.5M / seat",
    desc: "A 10-day expedition to the Shackleton Crater, including lunar surface traversal and orbital photography.",
    img: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1200&q=80"
  },
  { 
    id: 2, 
    name: "Orbital Halo", 
    category: "Low Earth Orbit", 
    price: "$450k / seat",
    desc: "Experience 48 hours of weightlessness aboard our luxury glass-canopy station with panoramic Earth views.",
    img: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=1200&q=80"
  },
  { 
    id: 3, 
    name: "Mars Catalyst", 
    category: "Interplanetary", 
    price: "Inquire for Tier 1",
    desc: "The first commercial research expedition to the Valles Marineris. Limited to certified specialist pioneers.",
    img: "https://images.unsplash.com/photo-1614726365954-5233df6d610c?w=1200&q=80"
  },
];

const INFRASTRUCTURE = [
  { 
    title: "Quantum Navigation", 
    desc: "Sub-millisecond trajectory adjustments powered by orbital quantum-compute arrays.",
    icon: Compass
  },
  { 
    title: "Bio-Seal 9", 
    desc: "Advanced life support systems maintaining 100% atmospheric purity through molecular recycling.",
    icon: Shield
  },
  { 
    title: "Propulsion X", 
    desc: "Ion-drive technology providing sustained acceleration with zero chemical exhaust or vibration.",
    icon: Zap
  },
];

const LOGISTICS = [
  { label: "Active Craft", value: "12" },
  { label: "Flight Hours", value: "145k" },
  { label: "Safety Rating", value: "AAAA+" },
  { label: "Destinations", value: "08" },
];

/* ==========================================================================
   UTILITY COMPONENTS
   ========================================================================= */

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

function MagneticBtn({ children, className = "", onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 20 });
  const sy = useSpring(y, { stiffness: 150, damping: 20 });

  const handleMouse = useCallback((e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  }, [x, y]);

  return (
    <motion.button ref={ref} style={{ x: sx, y: sy }} onMouseMove={handleMouse} onMouseLeave={() => { x.set(0); y.set(0); }} onClick={onClick} className={className}>
      {children}
    </motion.button>
  );
}

/* ==========================================================================
   MAIN PAGE COMPONENT
   ========================================================================= */

export default function AstrumReachPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMission, setActiveMission] = useState<number | null>(null);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div className="premium-theme min-h-screen bg-[#020205] text-[#e0e0e0] font-sans selection:bg-[#4f46e5] selection:text-white overflow-x-hidden">

      {/* ── NAVIGATION ── */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${scrolled ? "bg-black/90 backdrop-blur-3xl py-4 border-b border-white/5" : "bg-transparent py-8"}`}>
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="group flex flex-col items-center">
             <span className="text-3xl font-black tracking-[-0.05em] uppercase leading-none">Astrum</span>
             <span className="text-[8px] font-bold uppercase tracking-[0.5em] text-[#4f46e5] -mt-1 ml-1">Reach Orbital</span>
          </Link>

          <div className="hidden lg:flex items-center gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
            {["Manifest", "Logistics", "Science", "Training", "Support"].map(link => (
              <Link key={link} href="#" className="hover:text-[#4f46e5] transition-colors cursor-pointer">{link}</Link>
            ))}
          </div>

          <div className="flex items-center gap-8">
             <button className="hidden md:flex items-center gap-3 group">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/60 group-hover:text-[#4f46e5] transition-colors">Flight_Portal</span>
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 group-hover:bg-[#4f46e5] group-hover:text-white group-hover:border-[#4f46e5] transition-all">
                   <Navigation className="w-4 h-4" />
                </div>
             </button>
             <button onClick={() => setMenuOpen(true)} className="lg:hidden text-[#4f46e5]"><Menu className="w-6 h-6" /></button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, x: "100%" }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: "100%" }} className="fixed inset-0 z-[100] bg-black p-12 flex flex-col justify-center gap-10">
             <button onClick={() => setMenuOpen(false)} className="absolute top-10 right-8 text-white/40 hover:text-[#4f46e5]"><X className="w-10 h-10"/></button>
             <div className="flex flex-col gap-6 text-6xl font-black uppercase text-white/5 italic">
                {["Manifest", "Training", "Science", "Contact"].map(l => (
                   <Link key={l} href="#" onClick={() => setMenuOpen(false)} className="hover:text-[#4f46e5] transition-all">{l}</Link>
                ))}
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO ── */}
      <section className="relative h-[100svh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1600&q=80" alt="Space" fill className="object-cover opacity-30 mix-blend-screen grayscale contrast-150" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020205] via-transparent to-[#020205]" />
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-20">
          <Reveal>
             <Badge className="bg-[#4f46e5]/10 text-[#4f46e5] border border-[#4f46e5]/30 text-[10px] font-bold uppercase tracking-[0.5em] mb-10 px-4 py-1.5 rounded-full">
                Orbital Logistics // Sector 09 // Q1 2025
             </Badge>
             <h1 className="text-8xl md:text-[14rem] font-black leading-[0.75] tracking-tighter mb-12 uppercase text-white">
               Leave <br/> <span className="text-[#4f46e5]">Earth.</span>
             </h1>
             <p className="max-w-md text-xl text-white/30 leading-relaxed font-light mb-12 uppercase tracking-widest italic leading-loose">
               The apex of commercial orbital transit. Engineering the bridge to the stars for those who look beyond.
             </p>
             <div className="flex flex-col sm:flex-row gap-6">
                <MagneticBtn className="px-12 py-5 bg-[#4f46e5] text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full hover:scale-105 transition-all cursor-pointer shadow-[0_0_50px_rgba(79,70,229,0.3)]">
                  Reserve Build Slot
                </MagneticBtn>
                <Link href="#manifest" className="px-12 py-5 border border-white/10 text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded-full hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3">
                  Flight Manifest <ArrowRight className="w-4 h-4" />
                </Link>
             </div>
          </Reveal>

          <div className="hidden lg:flex justify-end relative">
             <Reveal delay={0.4}>
                <div className="relative w-[500px] h-[500px] flex items-center justify-center">
                   <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border border-white/5 rounded-full" />
                   <motion.div animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute inset-12 border border-[#4f46e5]/20 rounded-full" />
                   <div className="text-center space-y-4">
                      <Orbit className="w-12 h-12 text-[#4f46e5] mx-auto animate-pulse" />
                      <span className="text-6xl font-black italic text-white tracking-tighter block">1.4G</span>
                      <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 block">Launch Pressure Tolerance</span>
                   </div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#4f46e5] rounded-full blur-[120px] opacity-10" />
             </Reveal>
          </div>
        </div>
      </section>

      {/* ── LOGISTICS STATS ── */}
      <section className="py-24 border-y border-white/5 bg-[#050508]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              {LOGISTICS.map((stat, i) => (
                <Reveal key={i} delay={i * 0.1}>
                   <div className="text-center md:text-left">
                      <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#4f46e5] mb-2">{stat.label}</div>
                      <div className="text-5xl font-black italic text-white tracking-tighter">{stat.value}</div>
                   </div>
                </Reveal>
              ))}
           </div>
        </div>
      </section>

      {/* ── MANIFEST ── */}
      <section id="manifest" className="py-32 px-6 md:px-12">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
               <div>
                  <h2 className="text-7xl md:text-[10rem] font-black italic tracking-tighter leading-none mb-6 uppercase text-white">The <br/> <span className="text-[#4f46e5]">Flight.</span></h2>
                  <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.4em]">Active Manifest // Sector 09 // Certified Safe</p>
               </div>
               <Link href="#" className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#4f46e5] border-b border-[#4f46e5] pb-2 hover:text-white hover:border-white transition-all">Download Logistical Ledger</Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {MISSIONS.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.1}>
                 <div className="group space-y-10 cursor-pointer" onMouseEnter={() => setActiveMission(item.id)} onMouseLeave={() => setActiveMission(null)}>
                    <div className="relative aspect-[3/4] overflow-hidden rounded-sm grayscale group-hover:grayscale-0 transition-all duration-[1s]">
                       <Image src={item.img} alt={item.name} fill className="object-cover transition-transform duration-[2s] group-hover:scale-125" />
                       <div className="absolute inset-0 bg-black/60 group-hover:bg-transparent transition-colors duration-700" />
                       
                       <div className="absolute top-6 left-6">
                          <Badge className="bg-black/60 backdrop-blur-md text-white border-white/10 text-[9px] font-bold uppercase tracking-widest px-3 py-1">
                             {item.category}
                          </Badge>
                       </div>

                       <AnimatePresence>
                          {activeMission === item.id && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center bg-[#4f46e5]/10 backdrop-blur-[2px]">
                               <button className="px-10 py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:scale-110 transition-all shadow-2xl tracking-[0.3em]">View Trajectory</button>
                            </motion.div>
                          )}
                       </AnimatePresence>
                    </div>
                    <div className="space-y-6">
                       <div className="flex justify-between items-baseline">
                          <h3 className="text-4xl font-black uppercase tracking-tighter text-white italic group-hover:text-[#4f46e5] transition-colors">{item.name}</h3>
                          <span className="text-lg font-black text-[#4f46e5] tracking-tighter">{item.price}</span>
                       </div>
                       <p className="text-sm text-white/30 font-light leading-relaxed uppercase tracking-widest italic leading-loose">{item.desc}</p>
                       <div className="flex items-center gap-4">
                          <div className="h-[1px] flex-1 bg-white/5" />
                          <Star className="w-5 h-5 text-white/10 group-hover:text-[#4f46e5] transition-all" />
                       </div>
                    </div>
                 </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ENGINEERING PHILOSOPHY ── */}
      <section className="py-40 bg-[#050508] overflow-hidden relative border-t border-white/5">
         <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-[#4f46e5]/5 blur-[120px] rounded-full" />
         <div className="max-w-[1600px] mx-auto px-6 md:px-12">
            <Reveal>
               <div className="text-center mb-32">
                  <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#4f46e5] mb-8 block">Orbital Integrity</span>
                  <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase">Space <span className="text-[#4f46e5] not-italic">Logistics.</span></h2>
               </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
               {INFRASTRUCTURE.map((s, i) => (
                 <Reveal key={i} delay={i * 0.1}>
                    <div className="p-16 border border-white/5 bg-white/[0.01] hover:border-[#4f46e5]/30 transition-all group h-full flex flex-col relative overflow-hidden">
                       <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-[#4f46e5] mb-10 group-hover:bg-[#4f46e5] group-hover:text-white transition-all duration-500">
                          <s.icon className="w-8 h-8" />
                       </div>
                       <h3 className="text-3xl font-black uppercase italic mb-6 tracking-tighter text-white group-hover:translate-x-2 transition-transform">{s.title}</h3>
                       <p className="text-sm text-white/30 font-light leading-relaxed mb-12 flex-1 tracking-wide uppercase italic leading-loose">{s.desc}</p>
                       <button className="flex items-center gap-4 text-[9px] font-bold uppercase tracking-[0.3em] text-[#4f46e5] group-hover:gap-6 transition-all">
                          Safety Protocol <ArrowRight className="w-4 h-4" />
                       </button>
                    </div>
                 </Reveal>
               ))}
            </div>
         </div>
      </section>

      {/* ── THE ATELIER ── */}
      <section className="py-40 px-6 md:px-12 bg-black">
         <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <Reveal>
               <div className="relative aspect-square rounded-sm overflow-hidden group border border-white/5">
                  <Image src="https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=1200&q=80" alt="Spacecraft" fill className="object-cover group-hover:scale-110 transition-all duration-[3s] grayscale hover:grayscale-0 opacity-60" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  <div className="absolute bottom-16 left-16 text-white">
                     <span className="text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block text-[#4f46e5]">The Atelier</span>
                     <h4 className="text-5xl font-black italic uppercase tracking-tighter leading-none">Orbital Habitat <br/> Engineering.</h4>
                  </div>
               </div>
            </Reveal>

            <Reveal delay={0.2}>
               <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#4f46e5] mb-8 block">The Protocol</span>
               <h2 className="text-6xl md:text-9xl font-black italic tracking-tighter leading-[0.8] mb-12 uppercase text-white">
                 Pure <br/> <span className="text-[#4f46e5] not-italic">Void.</span>
               </h2>
               <p className="text-white/40 text-xl leading-relaxed mb-16 font-light uppercase tracking-wide italic leading-loose">
                 Beyond the atmosphere. We design orbital experiences that merge the raw power of propulsion technology with the clinical precision of life-support engineering.
               </p>
               <div className="grid grid-cols-2 gap-12">
                  {[
                    { icon: Telescope, label: "Deep_Space", desc: "Shackleton Crater" },
                    { icon: Globe, label: "Orbital_Hub", desc: "Halo 1 station" },
                    { icon: Microscope, label: "Bio_Safe", desc: "Medical Tier A" },
                    { icon: Activity, label: "Live_Comms", desc: "Quantum Relay" },
                  ].map((val, i) => (
                    <div key={i} className="space-y-4">
                       <val.icon className="w-6 h-6 text-[#4f46e5]" />
                       <h4 className="text-[11px] font-black uppercase tracking-widest text-white">{val.label}</h4>
                       <p className="text-[10px] font-light text-white/30 uppercase tracking-widest leading-loose">{val.desc}</p>
                    </div>
                  ))}
               </div>
               <MagneticBtn className="mt-20 px-14 py-6 bg-white text-black text-[10px] font-black uppercase tracking-[0.4em] rounded-full hover:bg-[#4f46e5] hover:text-white transition-all shadow-2xl">
                  Request Launch Window
               </MagneticBtn>
            </Reveal>
         </div>
      </section>

      {/* ── DESIGN HERITAGE ── */}
      <section className="py-40 bg-black relative overflow-hidden">
         <div className="absolute top-0 right-0 w-[60rem] h-[60rem] bg-[#4f46e5]/5 blur-[180px] rounded-full" />
         <div className="max-w-[1600px] mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
               <Reveal>
                  <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#4f46e5] mb-8 block">The Chronology</span>
                  <h2 className="text-6xl md:text-9xl font-black italic tracking-tighter leading-[0.8] mb-12 uppercase text-white">
                    Age of <br/> <span className="text-[#4f46e5] not-italic">Reach.</span>
                  </h2>
                  <p className="text-white/40 text-xl leading-relaxed mb-16 font-light uppercase tracking-wide italic leading-loose">
                    Astrum Reach was founded on the belief that humanity's destiny lies among the stars. From our first sub-orbital flight in 2011 to the establishment of the Halo station, we have consistently pushed the limits of commercial space travel.
                  </p>
                  <div className="space-y-12">
                     {[
                       { year: "2011", event: "Project Reach Alpha: The first successful sub-orbital commercial flight reaches 100km." },
                       { year: "2018", event: "Orbital Halo Station launched. First permanent luxury residence in low Earth orbit." },
                       { year: "2023", event: "Mars Catalyst Program initiated. Specialist teams begin Valles Marineris simulation." },
                       { year: "2025", event: "Sector 09 expansion. Commercial lunar descent programs officially open for public reservation." },
                     ].map((item, i) => (
                        <div key={i} className="flex gap-12 group">
                           <span className="text-3xl font-black italic text-[#4f46e5] opacity-40 group-hover:opacity-100 transition-opacity">{item.year}</span>
                           <p className="text-[11px] font-bold uppercase tracking-widest text-white/30 leading-loose">{item.event}</p>
                        </div>
                     ))}
                  </div>
               </Reveal>
               <Reveal delay={0.2}>
                  <div className="relative aspect-square grayscale opacity-50 hover:opacity-100 transition-opacity duration-1000 border border-white/5">
                     <Image src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1200&q=80" alt="Astrum Heritage" fill className="object-cover" />
                  </div>
               </Reveal>
            </div>
         </div>
      </section>

      {/* ── TECHNICAL SPECIFICATIONS ── */}
      <section className="py-40 bg-[#050508]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
           <Reveal>
              <div className="mb-32">
                 <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#4f46e5] mb-8 block">Orbital Manifest</span>
                 <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase text-white">Full <br/> <span className="text-[#4f46e5] not-italic">Schematic.</span></h2>
              </div>
           </Reveal>

           <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="border-b border-white/10">
                       <th className="py-8 text-[10px] font-bold uppercase tracking-[0.5em] text-white/20">Parameter</th>
                       <th className="py-8 text-[10px] font-bold uppercase tracking-[0.5em] text-white/20">Lunar_Descent</th>
                       <th className="py-8 text-[10px] font-bold uppercase tracking-[0.5em] text-white/20">Orbital_Halo</th>
                       <th className="py-8 text-[10px] font-bold uppercase tracking-[0.5em] text-white/20">Mars_Catalyst</th>
                    </tr>
                 </thead>
                 <tbody className="text-[11px] font-bold uppercase tracking-[0.2em]">
                    {[
                      { p: "Propulsion Type", v1: "Nuclear Thermal", v2: "Electric Ion", v3: "Antimatter Injection" },
                      { p: "Max Acceleration", v1: "1.2G", v2: "0.2G (Sustained)", v3: "2.4G" },
                      { p: "Life Support", v1: "Tier 1 Bio-Seal", v2: "Tier 2 Recycle", v3: "Closed-Loop Alpha" },
                      { p: "Radiation Shield", v1: "Magnetic Dipole", v2: "Passive Ceramic", v3: "Active Plasma" },
                      { p: "Crew Capacity", v1: "8 Guests", v2: "24 Guests", v3: "6 Specialists" },
                    ].map((row, i) => (
                       <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                          <td className="py-8 text-white/40 italic">{row.p}</td>
                          <td className="py-8 text-white">{row.v1}</td>
                          <td className="py-8 text-white">{row.v2}</td>
                          <td className="py-8 text-white">{row.v3}</td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      </section>

      {/* ── SPECIALIST PROFILES ── */}
      <section className="py-40 bg-black">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
           <Reveal>
              <div className="mb-32 text-center">
                 <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#4f46e5] mb-8 block">Mission Command</span>
                 <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase text-white">Expert <span className="text-[#4f46e5] not-italic">Guidance.</span></h2>
              </div>
           </Reveal>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-32">
              {[
                { name: "Dr. Aris Thorne", role: "Chief Orbital Pilot", text: "Flying in low Earth orbit isn't just about physics—it's about the emotional transition. We ensure our guests don't just reach the destination; they experience the overview effect in its purest form.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
                { name: "Sarah Jenkins", role: "Head of Bio-Logistics", text: "Sustainability in space is a closed-loop challenge. Our systems are designed to mimic Earth's natural cycles, ensuring that every breath taken aboard an Astrum craft is as pure as the first.", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80" },
              ].map((item, i) => (
                <Reveal key={i} delay={i * 0.2}>
                   <div className="space-y-12">
                      <div className="relative w-24 h-24 rounded-full overflow-hidden grayscale border border-[#4f46e5]/30">
                         <Image src={item.img} alt={item.name} fill className="object-cover" />
                      </div>
                      <blockquote className="text-3xl font-light italic text-white/60 leading-relaxed uppercase tracking-widest leading-loose">
                         "{item.text}"
                      </blockquote>
                      <div>
                         <span className="text-xl font-black text-white italic block mb-1">{item.name}</span>
                         <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#4f46e5]">{item.role}</span>
                      </div>
                   </div>
                </Reveal>
              ))}
           </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-40 bg-[#050508]">
        <div className="max-w-4xl mx-auto px-6">
           <Reveal>
              <div className="mb-24 text-center">
                 <h2 className="text-5xl font-black italic uppercase tracking-tighter text-white mb-8">Mission <span className="text-[#4f46e5] not-italic">Briefing.</span></h2>
                 <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">Training // Safety // Logistics</p>
              </div>
           </Reveal>

           <Accordion type="single" collapsible className="w-full space-y-4">
              {[
                { q: "What level of training is required for orbital flight?", a: "Guests for the Orbital Halo mission require a 2-week intensive training program at our Tokyo facility, covering zero-G movement, emergency protocols, and bio-adaptation." },
                { q: "Is commercial space travel safe?", a: "Astrum Reach maintains an AAAA+ safety rating. Every craft is equipped with redundant life-support systems and autonomous descent modules certified by the Global Space Council." },
                { q: "Can I bring personal items aboard the craft?", a: "Personal allowance is restricted to 2kg per guest. Items must be certified for high-G launch and zero-G containment. We provide bespoke flight kits for every mission." },
                { q: "How long is the Mars Catalyst mission?", a: "The Catalyst research mission is a 180-day engagement. It is currently restricted to specialist contractors and vetted research partners." },
                { q: "What happens in case of a launch delay?", a: "Orbital dynamics are precise. In the event of a weather-related delay, guests are accommodated at our exclusive launch sanctuary until the next optimal window opens." },
              ].map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border border-white/5 bg-white/[0.02] px-8 rounded-sm">
                   <AccordionTrigger className="text-[11px] font-black uppercase tracking-[0.3em] text-white hover:text-[#4f46e5] py-8 no-underline italic">
                      {item.q}
                   </AccordionTrigger>
                   <AccordionContent className="text-[11px] font-light text-white/30 tracking-widest uppercase italic leading-loose pb-8">
                      {item.a}
                   </AccordionContent>
                </AccordionItem>
              ))}
           </Accordion>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#020205] pt-40 pb-16 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-32 mb-40">
           
           <div className="lg:col-span-6">
              <Reveal>
                 <div className="flex flex-col mb-12">
                    <span className="text-4xl font-black tracking-[-0.05em] uppercase leading-none">Astrum</span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#4f46e5] -mt-1 ml-1">Reach Orbital</span>
                 </div>
                 <p className="text-white/20 max-w-md mb-16 text-[11px] font-bold uppercase tracking-[0.2em] leading-loose italic">
                    The absolute mastery of commercial orbital transit. Engineered for the evolutionary elite in our Tokyo sanctuary.
                 </p>
                 <div className="flex gap-6">
                    {[Globe, Globe, Mail].map((Icon, i) => (
                      <button key={i} className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:bg-[#4f46e5] hover:text-black hover:border-[#4f46e5] transition-all">
                         <Icon className="w-5 h-5" />
                      </button>
                    ))}
                 </div>
              </Reveal>
           </div>

           <div className="lg:col-span-2">
              <h4 className="text-[11px] font-black uppercase tracking-widest text-[#4f46e5] mb-12">Manifest</h4>
              <ul className="space-y-6 text-[10px] font-bold uppercase tracking-widest text-white/30">
                 <li><Link href="#" className="hover:text-white transition-colors">Lunar_Descent</Link></li>
                 <li><Link href="#" className="hover:text-white transition-colors">Orbital_Halo</Link></li>
                 <li><Link href="#" className="hover:text-white transition-colors">Mars_Catalyst</Link></li>
                 <li><Link href="#" className="hover:text-white transition-colors">Support</Link></li>
              </ul>
           </div>

           <div className="lg:col-span-2">
              <h4 className="text-[11px] font-black uppercase tracking-widest text-[#4f46e5] mb-12">Logistics</h4>
              <ul className="space-y-6 text-[10px] font-bold uppercase tracking-widest text-white/30">
                 <li><Link href="#" className="hover:text-white transition-colors">Fleet_Status</Link></li>
                 <li><Link href="#" className="hover:text-white transition-colors">Navigation</Link></li>
                 <li><Link href="#" className="hover:text-white transition-colors">Bio_Safe_9</Link></li>
                 <li><Link href="#" className="hover:text-white transition-colors">Consultation</Link></li>
              </ul>
           </div>

           <div className="lg:col-span-2">
              <h4 className="text-[11px] font-black uppercase tracking-widest text-[#4f46e5] mb-12">Studio</h4>
              <ul className="space-y-6 text-[10px] font-bold uppercase tracking-widest text-white/30">
                 <li><Link href="#" className="hover:text-white transition-colors">The_Maison</Link></li>
                 <li><Link href="#" className="hover:text-white transition-colors">Global_Units</Link></li>
                 <li><Link href="#" className="hover:text-white transition-colors">Technical_Kit</Link></li>
                 <li><Link href="#" className="hover:text-white transition-colors">Archives</Link></li>
              </ul>
           </div>
        </div>

        <div className="max-w-[1600px] mx-auto pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12 text-[10px] font-bold uppercase tracking-[0.4em] text-white/10">
           <div className="flex items-center gap-12">
              <span>&copy; {new Date().getFullYear()} ASTRUM REACH ORBITAL GROUP.</span>
              <div className="flex gap-8">
                <span>FAA_SPACE_CERTIFIED</span>
                <span>ISO_ORBITAL_NOMINAL</span>
              </div>
           </div>
           <div className="flex gap-12 font-mono">
              <span>LAUNCH_NOMINAL</span>
              <span>PRESSURE_STABLE_1.2G</span>
           </div>
        </div>
      </footer>

      <style>{`
        ::-webkit-scrollbar{width:4px;background:#020205}
        ::-webkit-scrollbar-thumb{background:#4f46e5}
      `}</style>
    </div>
  );
}
