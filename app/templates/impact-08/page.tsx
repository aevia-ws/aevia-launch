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
import { Zap, Gauge, Fuel, ShieldAlert, Cpu, Globe, Mail, MapPin, ChevronRight, ArrowRight, X, Menu, Settings, PenTool, Wind, Trophy, Activity, Info, Share2, Heart, Search, ShoppingBag, Eye, ZapOff } from "lucide-react"

import "../premium.css";

/* ==========================================================================
   DATA STRUCTURES
   ========================================================================= */

const FLEET = [
  { 
    id: 1, 
    name: "Vulcan Tyrant", 
    category: "Hyper-Grand Tourer", 
    specs: { power: "1,400 HP", top: "420 KM/H", zero: "2.1s" },
    desc: "A carbon-monocoque masterpiece powered by a quad-turbo hybrid V12. Perfection without compromise.",
    img: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=80"
  },
  { 
    id: 2, 
    name: "Apex Evo", 
    category: "Track Focused", 
    specs: { power: "1,100 HP", top: "350 KM/H", zero: "1.9s" },
    desc: "Active aerodynamics and pushrod suspension derived from Formula 1 engineering. The ultimate track weapon.",
    img: "https://images.unsplash.com/photo-1592193660027-290025d3cd0a?w=1200&q=80"
  },
  { 
    id: 3, 
    name: "Stratos E", 
    category: "Pure Electric", 
    specs: { power: "2,000 HP", top: "380 KM/H", zero: "1.8s" },
    desc: "Tri-motor axial flux technology providing instant torque vectoring and unprecedented electric soul.",
    img: "https://images.unsplash.com/photo-1617469767053-d3b508a0d84d?w=1200&q=80"
  },
];

const CRAFTSMANSHIP = [
  { 
    title: "Carbon Monocoque", 
    desc: "Ultra-lightweight chassis woven from high-modulus T1000 carbon fiber for maximum torsional rigidity.",
    icon: ShieldAlert
  },
  { 
    title: "Active Aero", 
    desc: "Continuously variable wing profiles that adjust based on downforce requirements and braking loads.",
    icon: Wind
  },
  { 
    title: "Bespoke Interior", 
    desc: "Aniline leathers, machined magnesium, and zero-gravity seating tailored to your exact biomechanics.",
    icon: PenTool
  },
];

const PERFORMANCE = [
  { label: "Max Power", value: "2,000 HP" },
  { label: "Weight", value: "1,240 KG" },
  { label: "Lateral G", value: "2.4 G" },
  { label: "Hand-Assembled", value: "100%" },
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

export default function VulcanMotorsPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCar, setActiveCar] = useState<number | null>(null);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div className="premium-theme min-h-screen bg-[#050505] text-[#d1d1d1] font-sans selection:bg-[#3b82f6] selection:text-white overflow-x-hidden">

      {/* ── NAVIGATION ── */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${scrolled ? "bg-black/95 backdrop-blur-3xl py-4 border-b border-white/5" : "bg-transparent py-8"}`}>
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="group flex flex-col items-center">
             <span className="text-3xl font-black tracking-[-0.05em] uppercase leading-none italic">Vulcan</span>
             <span className="text-[8px] font-bold uppercase tracking-[0.6em] text-[#3b82f6] -mt-1 ml-1">Motor Group</span>
          </Link>

          <div className="hidden lg:flex items-center gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
            {["Fleet", "Customization", "Engineering", "Atelier", "Heritage"].map(link => (
              <Link key={link} href="#" className="hover:text-[#3b82f6] transition-colors cursor-pointer">{link}</Link>
            ))}
          </div>

          <div className="flex items-center gap-8">
             <button className="hidden md:flex items-center gap-3 group">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/60 group-hover:text-[#3b82f6] transition-colors">Configurator</span>
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 group-hover:bg-[#3b82f6] group-hover:text-white group-hover:border-[#3b82f6] transition-all">
                   <Settings className="w-4 h-4" />
                </div>
             </button>
             <button onClick={() => setMenuOpen(true)} className="lg:hidden text-[#3b82f6]"><Menu className="w-6 h-6" /></button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="fixed inset-0 z-[100] bg-black p-12 flex flex-col justify-center gap-10 text-center">
             <button onClick={() => setMenuOpen(false)} className="absolute top-10 right-8 text-white/40 hover:text-[#3b82f6]"><X className="w-10 h-10"/></button>
             <div className="flex flex-col gap-6 text-5xl font-black uppercase italic text-white/5">
                {["The Fleet", "Engineering", "Configurator", "Labs"].map(l => (
                   <Link key={l} href="#" onClick={() => setMenuOpen(false)} className="hover:text-[#3b82f6] transition-all">{l}</Link>
                ))}
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO ── */}
      <section className="relative h-[100svh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1600&q=80" alt="Supercar" fill className="object-cover opacity-60 mix-blend-overlay grayscale contrast-125" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 w-full">
          <Reveal>
             <Badge className="bg-[#3b82f6]/10 text-[#3b82f6] border border-[#3b82f6]/30 text-[10px] font-bold uppercase tracking-[0.5em] mb-10 px-4 py-1.5 rounded-full">
                Hand-Assembled in Modena // Limitless Customization
             </Badge>
             <h1 className="text-8xl md:text-[14rem] font-black leading-[0.8] tracking-tighter mb-12 uppercase text-white italic">
               Defy <br/> <span className="text-[#3b82f6] not-italic">Physics.</span>
             </h1>
             <p className="max-w-md text-xl text-white/30 leading-relaxed font-light mb-12 uppercase tracking-widest italic">
               The ultimate expression of automotive performance. Engineering without compromise for the world's elite drivers.
             </p>
             <div className="flex flex-col sm:flex-row gap-6">
                <MagneticBtn className="px-12 py-5 bg-[#3b82f6] text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full hover:scale-105 transition-all cursor-pointer shadow-[0_0_50px_rgba(59,130,246,0.3)]">
                  Launch Configurator
                </MagneticBtn>
                <Link href="#fleet" className="px-12 py-5 border border-white/10 text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded-full hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3">
                  Current Fleet <ArrowRight className="w-4 h-4" />
                </Link>
             </div>
          </Reveal>
        </div>

        <div className="absolute bottom-12 right-12 flex flex-col gap-8 text-right hidden lg:flex">
           <Reveal delay={0.4}>
              <div className="space-y-2 border-r-2 border-[#3b82f6] pr-8">
                 <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 block">Performance Metric</span>
                 <span className="text-6xl font-black italic text-white tracking-tighter">0-100 IN 1.8s</span>
              </div>
           </Reveal>
           <Reveal delay={0.6}>
              <div className="space-y-2 border-r-2 border-white/5 pr-8">
                 <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 block">Downforce</span>
                 <span className="text-6xl font-black italic text-white tracking-tighter">800 KG @ 250 KM/H</span>
              </div>
           </Reveal>
        </div>
      </section>

      {/* ── PERFORMANCE STATS ── */}
      <section className="py-24 border-y border-white/5 bg-[#080808]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              {PERFORMANCE.map((stat, i) => (
                <Reveal key={i} delay={i * 0.1}>
                   <div className="text-center md:text-left">
                      <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#3b82f6] mb-2">{stat.label}</div>
                      <div className="text-5xl font-black italic text-white tracking-tighter">{stat.value}</div>
                   </div>
                </Reveal>
              ))}
           </div>
        </div>
      </section>

      {/* ── FLEET ── */}
      <section id="fleet" className="py-32 px-6 md:px-12">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
               <div>
                  <h2 className="text-7xl md:text-[10rem] font-black italic tracking-tighter leading-none mb-6 uppercase text-white">The <br/> <span className="text-[#3b82f6]">Stable.</span></h2>
                  <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.4em]">Current Manifest // 2024 Release // Limited to 25 Units</p>
               </div>
               <Link href="#" className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#3b82f6] border-b border-[#3b82f6] pb-2 hover:text-white hover:border-white transition-all">Download Technical Ledger</Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {FLEET.map((car, i) => (
              <Reveal key={car.id} delay={i * 0.1}>
                 <div className="group space-y-10 cursor-pointer" onMouseEnter={() => setActiveCar(car.id)} onMouseLeave={() => setActiveCar(null)}>
                    <div className="relative aspect-[4/5] overflow-hidden rounded-sm grayscale group-hover:grayscale-0 transition-all duration-[1s]">
                       <Image src={car.img} alt={car.name} fill className="object-cover transition-transform duration-[2s] group-hover:scale-125" />
                       <div className="absolute inset-0 bg-black/60 group-hover:bg-transparent transition-colors duration-700" />
                       
                       <div className="absolute top-6 left-6">
                          <Badge className="bg-black/60 backdrop-blur-md text-white border-white/10 text-[9px] font-bold uppercase tracking-widest px-3 py-1">
                             {car.category}
                          </Badge>
                       </div>

                       <AnimatePresence>
                          {activeCar === car.id && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center bg-[#3b82f6]/10 backdrop-blur-[2px]">
                               <button className="px-10 py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:scale-110 transition-all shadow-2xl tracking-[0.3em]">Configure Unit</button>
                            </motion.div>
                          )}
                       </AnimatePresence>
                    </div>
                    <div className="space-y-8">
                       <div className="flex justify-between items-baseline">
                          <h3 className="text-4xl font-black uppercase tracking-tighter text-white italic group-hover:text-[#3b82f6] transition-colors">{car.name}</h3>
                          <div className="flex gap-4 text-[10px] font-black text-[#3b82f6] tracking-tighter">
                             <span>{car.specs.power}</span>
                             <span className="opacity-20 text-white">|</span>
                             <span>{car.specs.zero}</span>
                          </div>
                       </div>
                       <p className="text-sm text-white/30 font-light leading-relaxed uppercase tracking-widest italic leading-loose">{car.desc}</p>
                       <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/5">
                          {Object.entries(car.specs).map(([k, v]) => (
                            <div key={k} className="text-center">
                               <span className="text-[8px] font-bold uppercase tracking-widest text-white/20 block mb-1">{k}</span>
                               <span className="text-[10px] font-black text-white italic tracking-widest">{v}</span>
                            </div>
                          ))}
                       </div>
                    </div>
                 </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ENGINEERING PHILOSOPHY ── */}
      <section className="py-40 bg-[#080808] overflow-hidden relative border-t border-white/5">
         <div className="absolute -top-32 -right-32 w-[40rem] h-[40rem] bg-[#3b82f6]/5 blur-[120px] rounded-full" />
         <div className="max-w-[1600px] mx-auto px-6 md:px-12">
            <Reveal>
               <div className="text-center mb-32">
                  <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#3b82f6] mb-8 block">Structural Mastery</span>
                  <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase">Obsessive <span className="text-[#3b82f6] not-italic">Engineering.</span></h2>
               </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
               {CRAFTSMANSHIP.map((s, i) => (
                 <Reveal key={i} delay={i * 0.1}>
                    <div className="p-16 border border-white/5 bg-white/[0.01] hover:border-[#3b82f6]/30 transition-all group h-full flex flex-col relative overflow-hidden">
                       <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-[#3b82f6] mb-10 group-hover:bg-[#3b82f6] group-hover:text-white transition-all duration-500">
                          <s.icon className="w-8 h-8" />
                       </div>
                       <h3 className="text-3xl font-black uppercase italic mb-6 tracking-tighter text-white group-hover:translate-x-2 transition-transform">{s.title}</h3>
                       <p className="text-sm text-white/30 font-light leading-relaxed mb-12 flex-1 tracking-wide uppercase italic leading-loose">{s.desc}</p>
                       <button className="flex items-center gap-4 text-[9px] font-bold uppercase tracking-[0.3em] text-[#3b82f6] group-hover:gap-6 transition-all">
                          Technical Whitepaper <ArrowRight className="w-4 h-4" />
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
                  <Image src="https://images.unsplash.com/photo-1592193660027-290025d3cd0a?w=1200&q=80" alt="Supercar Cockpit" fill className="object-cover group-hover:scale-110 transition-all duration-[3s] grayscale hover:grayscale-0 opacity-60" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  <div className="absolute bottom-16 left-16 text-white">
                     <span className="text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block text-[#3b82f6]">The Atelier</span>
                     <h4 className="text-5xl font-black italic uppercase tracking-tighter leading-none">Carbon Monocoque <br/> Architecture.</h4>
                  </div>
               </div>
            </Reveal>

            <Reveal delay={0.2}>
               <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#3b82f6] mb-8 block">The Protocol</span>
               <h2 className="text-6xl md:text-9xl font-black italic tracking-tighter leading-[0.8] mb-12 uppercase text-white">
                 Pure <br/> <span className="text-[#3b82f6] not-italic">Grip.</span>
               </h2>
               <p className="text-white/40 text-xl leading-relaxed mb-16 font-light uppercase tracking-wide italic leading-loose">
                 Beyond the limit. We design automotive instruments that merge the visceral energy of a high-revving internal combustion heart with the clinical precision of 21st-century aerospace technology.
               </p>
               <div className="grid grid-cols-2 gap-12">
                  {[
                    { icon: Gauge, label: "Telemetry_Link", desc: "Live track analysis" },
                    { icon: Cpu, label: "Drive_Logic", desc: "AI Vectoring 4.0" },
                    { icon: Trophy, label: "Racing_DNA", desc: "F1 Derived Aero" },
                    { icon: Zap, label: "Hybrid_Boost", desc: "2.0MJ Energy Recovery" },
                  ].map((val, i) => (
                    <div key={i} className="space-y-4">
                       <val.icon className="w-6 h-6 text-[#3b82f6]" />
                       <h4 className="text-[11px] font-black uppercase tracking-widest text-white">{val.label}</h4>
                       <p className="text-[10px] font-light text-white/30 uppercase tracking-widest leading-loose">{val.desc}</p>
                    </div>
                  ))}
               </div>
               <MagneticBtn className="mt-20 px-14 py-6 bg-white text-black text-[10px] font-black uppercase tracking-[0.4em] rounded-full hover:bg-[#3b82f6] hover:text-white transition-all shadow-2xl">
                  Request Build Slot
               </MagneticBtn>
            </Reveal>
         </div>
      </section>

      {/* ── DESIGN HERITAGE ── */}
      <section className="py-40 bg-black relative overflow-hidden">
         <div className="absolute top-0 left-0 w-[60rem] h-[60rem] bg-[#3b82f6]/5 blur-[180px] rounded-full" />
         <div className="max-w-[1600px] mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
               <Reveal>
                  <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#3b82f6] mb-8 block">The Lineage</span>
                  <h2 className="text-6xl md:text-9xl font-black italic tracking-tighter leading-[0.8] mb-12 uppercase text-white">
                    Evolution of <br/> <span className="text-[#3b82f6] not-italic">Speed.</span>
                  </h2>
                  <p className="text-white/40 text-xl leading-relaxed mb-16 font-light uppercase tracking-wide italic leading-loose">
                    From our first wind-tunnel prototype in 2002 to the quad-turbo hybrid powerplants of today, Vulcan has remained obsessed with a single metric: the visceral connection between driver and asphalt.
                  </p>
                  <div className="space-y-12">
                     {[
                       { year: "2002", event: "Project Vulcan Alpha: The first carbon-monocoque prototype breaks the 350 KM/H barrier." },
                       { year: "2010", event: "The Tyrant V1 is born. First commercial application of active-venturi aerodynamics." },
                       { year: "2022", event: "Vulcan E-Labs achieves 2,000 HP with the Stratos axial-flux tri-motor setup." },
                       { year: "2024", event: "Bespoke Atelier opens in Modena, offering 1-of-1 customization for global collectors." },
                     ].map((item, i) => (
                        <div key={i} className="flex gap-12 group">
                           <span className="text-3xl font-black italic text-[#3b82f6] opacity-40 group-hover:opacity-100 transition-opacity">{item.year}</span>
                           <p className="text-[11px] font-bold uppercase tracking-widest text-white/30 leading-loose">{item.event}</p>
                        </div>
                     ))}
                  </div>
               </Reveal>
               <Reveal delay={0.2}>
                  <div className="relative aspect-square grayscale opacity-50 hover:opacity-100 transition-opacity duration-1000 border border-white/5">
                     <Image src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=80" alt="Vulcan Heritage" fill className="object-cover" />
                  </div>
               </Reveal>
            </div>
         </div>
      </section>

      {/* ── TECHNICAL SPECIFICATIONS ── */}
      <section className="py-40 bg-[#080808]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
           <Reveal>
              <div className="mb-32">
                 <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#3b82f6] mb-8 block">Mechanical Manifest</span>
                 <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase text-white">The <br/> <span className="text-[#3b82f6] not-italic">Ledger.</span></h2>
              </div>
           </Reveal>

           <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="border-b border-white/10">
                       <th className="py-8 text-[10px] font-bold uppercase tracking-[0.5em] text-white/20">Metric</th>
                       <th className="py-8 text-[10px] font-bold uppercase tracking-[0.5em] text-white/20">Tyrant_GT</th>
                       <th className="py-8 text-[10px] font-bold uppercase tracking-[0.5em] text-white/20">Apex_EVO</th>
                       <th className="py-8 text-[10px] font-bold uppercase tracking-[0.5em] text-white/20">Stratos_E</th>
                    </tr>
                 </thead>
                 <tbody className="text-[11px] font-bold uppercase tracking-[0.2em]">
                    {[
                      { m: "Engine / Motor", v1: "6.5L V12 Hybrid", v2: "4.0L V8 Twin-Turbo", v3: "Tri-Axial Flux Electric" },
                      { m: "Transmission", v1: "8-Speed Dual-Clutch", v2: "7-Speed Sequential", v3: "Direct Drive Vectoring" },
                      { m: "Chassis", v1: "Carbon T1000", v2: "Carbon/Titanium", v3: "Composite Monocoque" },
                      { m: "Downforce @ 250", v1: "650 KG", v2: "1,200 KG", v3: "800 KG" },
                      { m: "Stopping Distance", v1: "30m (100-0)", v2: "28m (100-0)", v3: "31m (100-0)" },
                    ].map((row, i) => (
                       <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                          <td className="py-8 text-white/40 italic">{row.m}</td>
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

      {/* ── PERFORMANCE DATA ── */}
      <section className="py-40 bg-black">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
           <Reveal>
              <div className="mb-32 text-center">
                 <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#3b82f6] mb-8 block">Dynamic Analysis</span>
                 <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase text-white">Track <span className="text-[#3b82f6] not-italic">Logic.</span></h2>
              </div>
           </Reveal>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-32">
              {[
                { name: "Marco V.", role: "Chief Test Pilot", text: "The Tyrant is the only GT I've driven that maintains its composure at 400 KM/H while providing the luxury of a private jet. It's a dual-purpose monster.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
                { name: "Julian S.", role: "Aerodynamicist", text: "We didn't just design a car; we designed a shape that manipulates the atmosphere. Every vent, every curve is dedicated to high-speed stability and thermal efficiency.", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80" },
              ].map((item, i) => (
                <Reveal key={i} delay={i * 0.2}>
                   <div className="space-y-12">
                      <div className="relative w-24 h-24 rounded-full overflow-hidden grayscale border border-[#3b82f6]/30">
                         <Image src={item.img} alt={item.name} fill className="object-cover" />
                      </div>
                      <blockquote className="text-3xl font-light italic text-white/60 leading-relaxed uppercase tracking-widest leading-loose">
                         "{item.text}"
                      </blockquote>
                      <div>
                         <span className="text-xl font-black text-white italic block mb-1">{item.name}</span>
                         <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#3b82f6]">{item.role}</span>
                      </div>
                   </div>
                </Reveal>
              ))}
           </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-40 bg-[#080808]">
        <div className="max-w-4xl mx-auto px-6">
           <Reveal>
              <div className="mb-24 text-center">
                 <h2 className="text-5xl font-black italic uppercase tracking-tighter text-white mb-8">Bespoke <span className="text-[#3b82f6] not-italic">Inquiry.</span></h2>
                 <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">Acquisition // Maintenance // customization</p>
              </div>
           </Reveal>

           <Accordion type="single" collapsible className="w-full space-y-4">
              {[
                { q: "What is the typical wait time for a bespoke unit?", a: "Each Vulcan unit is hand-assembled in Modena. Depending on the level of customization, production typically takes between 14 to 22 months from design freeze." },
                { q: "Do you offer international delivery and servicing?", a: "Yes. Every Vulcan owner is assigned a dedicated Flying Technician and global concierge who manages white-glove transport and on-site maintenance anywhere in the world." },
                { q: "Can I choose my own materials for the interior?", a: "Our Atelier offers an 'Open Specification' program. If a material meets our safety and durability standards, we can integrate it—from rare woods to bespoke textiles." },
                { q: "Is the Stratos E road-legal?", a: "The Stratos E is currently homologated for road use in the EU, UK, and USA. Certain track-only variants (Stratos-R) are available for private circuits only." },
                { q: "What is the warranty on the hybrid powerplants?", a: "We provide a 5-year unlimited mileage warranty on all mechanical components and a 10-year performance guarantee on the energy recovery systems and batteries." },
              ].map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border border-white/5 bg-white/[0.02] px-8 rounded-sm">
                   <AccordionTrigger className="text-[11px] font-black uppercase tracking-[0.3em] text-white hover:text-[#3b82f6] py-8 no-underline italic">
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
      <footer className="bg-[#050505] pt-40 pb-16 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-32 mb-40">
           
           <div className="lg:col-span-6">
              <Reveal>
                 <div className="flex flex-col mb-12">
                    <span className="text-4xl font-black tracking-[-0.05em] uppercase leading-none italic">Vulcan</span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#3b82f6] -mt-1 ml-1">Motor Group</span>
                 </div>
                 <p className="text-white/20 max-w-md mb-16 text-[11px] font-bold uppercase tracking-[0.2em] leading-loose italic">
                    The absolute mastery of automotive performance. Engineered for the evolutionary elite in our Modena sanctuary.
                 </p>
                 <div className="flex gap-6">
                    {[Globe, Globe, Mail].map((Icon, i) => (
                      <button key={i} className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:bg-[#3b82f6] hover:text-white hover:border-[#3b82f6] transition-all">
                         <Icon className="w-5 h-5" />
                      </button>
                    ))}
                 </div>
              </Reveal>
           </div>

           <div className="lg:col-span-2">
              <h4 className="text-[11px] font-black uppercase tracking-widest text-[#3b82f6] mb-12">The Fleet</h4>
              <ul className="space-y-6 text-[10px] font-bold uppercase tracking-widest text-white/30">
                 <li><Link href="#" className="hover:text-white transition-colors">Tyrant_GT</Link></li>
                 <li><Link href="#" className="hover:text-white transition-colors">Apex_EVO</Link></li>
                 <li><Link href="#" className="hover:text-white transition-colors">Stratos_E</Link></li>
                 <li><Link href="#" className="hover:text-white transition-colors">Pre-Owned</Link></li>
              </ul>
           </div>

           <div className="lg:col-span-2">
              <h4 className="text-[11px] font-black uppercase tracking-widest text-[#3b82f6] mb-12">Engineering</h4>
              <ul className="space-y-6 text-[10px] font-bold uppercase tracking-widest text-white/30">
                 <li><Link href="#" className="hover:text-white transition-colors">Lab_Reports</Link></li>
                 <li><Link href="#" className="hover:text-white transition-colors">Carbon_Science</Link></li>
                 <li><Link href="#" className="hover:text-white transition-colors">Aero_Dynamics</Link></li>
                 <li><Link href="#" className="hover:text-white transition-colors">Propulsion</Link></li>
              </ul>
           </div>

           <div className="lg:col-span-2">
              <h4 className="text-[11px] font-black uppercase tracking-widest text-[#3b82f6] mb-12">Studio</h4>
              <ul className="space-y-6 text-[10px] font-bold uppercase tracking-widest text-white/30">
                 <li><Link href="#" className="hover:text-white transition-colors">The_Atelier</Link></li>
                 <li><Link href="#" className="hover:text-white transition-colors">Global_Units</Link></li>
                 <li><Link href="#" className="hover:text-white transition-colors">Press_Kit</Link></li>
                 <li><Link href="#" className="hover:text-white transition-colors">Archives</Link></li>
              </ul>
           </div>
        </div>

        <div className="max-w-[1600px] mx-auto pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12 text-[10px] font-bold uppercase tracking-[0.4em] text-white/10">
           <div className="flex items-center gap-12">
              <span>&copy; {new Date().getFullYear()} VULCAN MOTOR GROUP MODENA.</span>
              <div className="flex gap-8">
                <span>FIA_GT_CERTIFIED</span>
                <span>ISO_9001_PREMIUM</span>
              </div>
           </div>
           <div className="flex gap-12 font-mono">
              <span>TORQUE_VEC_STABLE</span>
              <span>THERMAL_NOMINAL_44%</span>
           </div>
        </div>
      </footer>

      <style>{`
        ::-webkit-scrollbar{width:4px;background:#050505}
        ::-webkit-scrollbar-thumb{background:#3b82f6}
      `}</style>
    </div>
  );
}
