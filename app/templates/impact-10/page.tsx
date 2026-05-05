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
import { Leaf, Droplets, Sun, Wind, ShieldCheck, Globe, Mail, MapPin, ChevronRight, ArrowRight, X, Menu, FlaskConical, Microscope, Thermometer, Sprout, Award, Settings2, Activity, Info, Share2, Heart, Search, ShoppingBag, Eye, Star, Zap } from "lucide-react"

import "../premium.css";

/* ==========================================================================
   DATA STRUCTURES
   ========================================================================= */

const STRAINS = [
  { 
    id: 1, 
    name: "Veridian Gold", 
    category: "Sativa Dominant", 
    thc: "28%", 
    terpenes: "Myrcene, Limonene",
    desc: "A bright, citrus-forward cultivar engineered for focus and creative flow states.",
    img: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=1200&q=80"
  },
  { 
    id: 2, 
    name: "Velvet Night", 
    category: "Indica Dominant", 
    thc: "24%", 
    terpenes: "Linalool, Caryophyllene",
    desc: "Deep floral notes with a heavy, sedating finish. Ideal for somatic recovery.",
    img: "https://images.unsplash.com/photo-1533630191539-0196fd0a4306?w=1200&q=80"
  },
  { 
    id: 3, 
    name: "Obsidian Bloom", 
    category: "Hybrid", 
    thc: "26%", 
    terpenes: "Pinene, Humulene",
    desc: "Earthbound and grounded. A balanced profile that bridges cerebral and physical clarity.",
    img: "https://images.unsplash.com/photo-1596431268681-30d8c0b62e43?w=1200&q=80"
  },
];

const BOTANICAL_PHILOSOPHY = [
  { 
    title: "Organic Integrity", 
    desc: "Cultivated in living soil without synthetic pesticides, honoring the plant's ancestral genetic memory.",
    icon: Sprout
  },
  { 
    title: "Precision Curing", 
    desc: "A proprietary 60-day cold-cure process that preserves the most volatile terpene and flavonoid profiles.",
    icon: Thermometer
  },
  { 
    title: "Lab Certification", 
    desc: "Full-panel testing for heavy metals, microbes, and potency, ensuring absolute purity in every bloom.",
    icon: FlaskConical
  },
];

const CULTIVATION_METRICS = [
  { label: "Strain Lineage", value: "Landrace+" },
  { label: "Cure Duration", value: "60 Days" },
  { label: "Terpene Retention", value: "98.4%" },
  { label: "Small Batch", value: "Limited" },
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

export default function VeridianPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeStrain, setActiveStrain] = useState<number | null>(null);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div className="premium-theme min-h-screen bg-[#0a0f0a] text-[#d4d4d4] font-sans selection:bg-[#c4a45e] selection:text-black overflow-x-hidden">

      {/* ── NAVIGATION ── */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${scrolled ? "bg-[#0a0f0a]/95 backdrop-blur-3xl py-4 border-b border-white/5" : "bg-transparent py-8"}`}>
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="group flex flex-col items-center">
             <span className="text-3xl font-black tracking-[0.1em] uppercase leading-none italic text-[#c4a45e]">Veridian</span>
             <span className="text-[8px] font-bold uppercase tracking-[0.5em] text-white/40 -mt-1 ml-1">Botanical Atelier</span>
          </Link>

          <div className="hidden lg:flex items-center gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
            {["Strain_Library", "Philosophy", "Lab_Results", "Member_Portal", "Archives"].map(link => (
              <Link key={link} href="#" className="hover:text-[#c4a45e] transition-colors cursor-pointer">{link}</Link>
            ))}
          </div>

          <div className="flex items-center gap-8">
             <button className="hidden md:flex items-center gap-3 group">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/60 group-hover:text-[#c4a45e] transition-colors">Client_Concierge</span>
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 group-hover:bg-[#c4a45e] group-hover:text-black group-hover:border-[#c4a45e] transition-all">
                   <Leaf className="w-4 h-4" />
                </div>
             </button>
             <button onClick={() => setMenuOpen(true)} className="lg:hidden text-[#c4a45e]"><Menu className="w-6 h-6" /></button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, x: "100%" }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: "100%" }} className="fixed inset-0 z-[100] bg-[#0a0f0a] p-12 flex flex-col justify-center gap-10">
             <button onClick={() => setMenuOpen(false)} className="absolute top-10 right-8 text-white/40 hover:text-[#c4a45e]"><X className="w-10 h-10"/></button>
             <div className="flex flex-col gap-6 text-6xl font-black uppercase italic text-white/5">
                {["Library", "Science", "Atelier", "Contact"].map(l => (
                   <Link key={l} href="#" onClick={() => setMenuOpen(false)} className="hover:text-[#c4a45e] transition-all">{l}</Link>
                ))}
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO ── */}
      <section className="relative h-[100svh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=1600&q=80" alt="Botanical" fill className="object-cover opacity-40 mix-blend-overlay grayscale contrast-125" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0a] via-[#0a0f0a]/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 w-full">
          <Reveal>
             <Badge className="bg-[#c4a45e]/10 text-[#c4a45e] border border-[#c4a45e]/30 text-[10px] font-bold uppercase tracking-[0.5em] mb-10 px-4 py-1.5 rounded-full">
                Certified Craft Cultivation // Small Batch Only
             </Badge>
             <h1 className="text-8xl md:text-[14rem] font-black leading-[0.8] tracking-tighter mb-12 uppercase text-white italic">
               Refined <br/> <span className="text-[#c4a45e] not-italic">Bloom.</span>
             </h1>
             <p className="max-w-md text-xl text-white/30 leading-relaxed font-light mb-12 uppercase tracking-widest italic leading-loose">
               The apex of luxury botanical craft. Precision-cured cultivars engineered for the most discerning connoisseurs.
             </p>
             <div className="flex flex-col sm:flex-row gap-6">
                <MagneticBtn className="px-12 py-5 bg-[#c4a45e] text-black text-[10px] font-black uppercase tracking-[0.3em] rounded-full hover:scale-105 transition-all cursor-pointer shadow-[0_0_50px_rgba(196,164,94,0.3)]">
                  Explore Strain Library
                </MagneticBtn>
                <Link href="#science" className="px-12 py-5 border border-white/10 text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded-full hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3">
                  Technical Data <ArrowRight className="w-4 h-4" />
                </Link>
             </div>
          </Reveal>
        </div>

        <div className="absolute bottom-12 right-12 flex flex-col gap-8 text-right hidden lg:flex">
           <Reveal delay={0.4}>
              <div className="space-y-2 border-r-2 border-[#c4a45e] pr-8">
                 <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 block">Terpene Profile</span>
                 <span className="text-6xl font-black italic text-white tracking-tighter">98.4% RETENTION</span>
              </div>
           </Reveal>
           <Reveal delay={0.6}>
              <div className="space-y-2 border-r-2 border-white/5 pr-8">
                 <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 block">Purity Standard</span>
                 <span className="text-6xl font-black italic text-white tracking-tighter">ZERO SYNTHETIC</span>
              </div>
           </Reveal>
        </div>
      </section>

      {/* ── CULTIVATION STATS ── */}
      <section className="py-24 border-y border-white/5 bg-[#0d120d]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              {CULTIVATION_METRICS.map((stat, i) => (
                <Reveal key={i} delay={i * 0.1}>
                   <div className="text-center md:text-left">
                      <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#c4a45e] mb-2">{stat.label}</div>
                      <div className="text-5xl font-black italic text-white tracking-tighter">{stat.value}</div>
                   </div>
                </Reveal>
              ))}
           </div>
        </div>
      </section>

      {/* ── LIBRARY ── */}
      <section id="library" className="py-32 px-6 md:px-12">
        <div className="max-w-[1600px] mx-auto">
          <Reveal>
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
               <div>
                  <h2 className="text-7xl md:text-[10rem] font-black italic tracking-tighter leading-none mb-6 uppercase text-white">The <br/> <span className="text-[#c4a45e]">Vault.</span></h2>
                  <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.4em]">Active Harvest // Q4 2024 // Small Batch Exclusive</p>
               </div>
               <Link href="#" className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c4a45e] border-b border-[#c4a45e] pb-2 hover:text-white hover:border-white transition-all">Download Terpene Archive</Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {STRAINS.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.1}>
                 <div className="group space-y-10 cursor-pointer" onMouseEnter={() => setActiveStrain(item.id)} onMouseLeave={() => setActiveStrain(null)}>
                    <div className="relative aspect-[3/4] overflow-hidden rounded-sm grayscale group-hover:grayscale-0 transition-all duration-[1s]">
                       <Image src={item.img} alt={item.name} fill className="object-cover transition-transform duration-[2s] group-hover:scale-125" />
                       <div className="absolute inset-0 bg-[#0a0f0a]/60 group-hover:bg-transparent transition-colors duration-700" />
                       
                       <div className="absolute top-6 left-6">
                          <Badge className="bg-black/60 backdrop-blur-md text-white border-white/10 text-[9px] font-bold uppercase tracking-widest px-3 py-1">
                             {item.category}
                          </Badge>
                       </div>

                       <AnimatePresence>
                          {activeStrain === item.id && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex items-center justify-center bg-[#c4a45e]/10 backdrop-blur-[2px]">
                               <button className="px-10 py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:scale-110 transition-all shadow-2xl tracking-[0.3em]">View Lab Report</button>
                            </motion.div>
                          )}
                       </AnimatePresence>
                    </div>
                    <div className="space-y-6">
                       <div className="flex justify-between items-baseline">
                          <h3 className="text-4xl font-black uppercase tracking-tighter text-white italic group-hover:text-[#c4a45e] transition-colors">{item.name}</h3>
                          <span className="text-lg font-black text-[#c4a45e] tracking-tighter">{item.thc} THC</span>
                       </div>
                       <p className="text-sm text-white/30 font-light leading-relaxed uppercase tracking-widest italic leading-loose">{item.desc}</p>
                       <div className="flex items-center gap-4">
                          <div className="h-[1px] flex-1 bg-white/5" />
                          <Settings2 className="w-5 h-5 text-white/10 group-hover:text-[#c4a45e] transition-all" />
                       </div>
                       <div className="flex gap-4 text-[9px] font-bold uppercase tracking-widest text-[#c4a45e]/60 italic">
                          <span>Terpenes: {item.terpenes}</span>
                       </div>
                    </div>
                 </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTANICAL PHILOSOPHY ── */}
      <section id="science" className="py-40 bg-[#0d120d] overflow-hidden relative border-t border-white/5">
         <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-[#c4a45e]/5 blur-[120px] rounded-full" />
         <div className="max-w-[1600px] mx-auto px-6 md:px-12">
            <Reveal>
               <div className="text-center mb-32">
                  <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#c4a45e] mb-8 block">Scientific Craft</span>
                  <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase text-white">Botanical <span className="text-[#c4a45e] not-italic">Integrity.</span></h2>
               </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
               {BOTANICAL_PHILOSOPHY.map((s, i) => (
                 <Reveal key={i} delay={i * 0.1}>
                    <div className="p-16 border border-white/5 bg-white/[0.01] hover:border-[#c4a45e]/30 transition-all group h-full flex flex-col relative overflow-hidden">
                       <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-[#c4a45e] mb-10 group-hover:bg-[#c4a45e] group-hover:text-black transition-all duration-500">
                          <s.icon className="w-8 h-8" />
                       </div>
                       <h3 className="text-3xl font-black uppercase italic mb-6 tracking-tighter text-white group-hover:translate-x-2 transition-transform">{s.title}</h3>
                       <p className="text-sm text-white/30 font-light leading-relaxed mb-12 flex-1 tracking-wide uppercase italic leading-loose">{s.desc}</p>
                       <button className="flex items-center gap-4 text-[9px] font-bold uppercase tracking-[0.3em] text-[#c4a45e] group-hover:gap-6 transition-all">
                          Cultivation Log <ArrowRight className="w-4 h-4" />
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
                  <Image src="https://images.unsplash.com/photo-1596431268681-30d8c0b62e43?w=1200&q=80" alt="Cannabis Bloom" fill className="object-cover group-hover:scale-110 transition-all duration-[3s] grayscale hover:grayscale-0 opacity-60" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  <div className="absolute bottom-16 left-16 text-white text-left">
                     <span className="text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block text-[#c4a45e]">The Atelier</span>
                     <h4 className="text-5xl font-black italic uppercase tracking-tighter leading-none">Craft Curing <br/> Architecture.</h4>
                  </div>
               </div>
            </Reveal>

            <Reveal delay={0.2}>
               <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#c4a45e] mb-8 block text-left">The Protocol</span>
               <h2 className="text-6xl md:text-9xl font-black italic tracking-tighter leading-[0.8] mb-12 uppercase text-white text-left">
                 Pure <br/> <span className="text-[#c4a45e] not-italic">Strain.</span>
               </h2>
               <p className="text-white/40 text-xl leading-relaxed mb-16 font-light uppercase tracking-wide italic leading-loose text-left">
                 Beyond the harvest. We design botanical experiences that merge the elemental power of organic soil cultivation with the clinical precision of modern laboratory analysis.
               </p>
               <div className="grid grid-cols-2 gap-12">
                  {[
                    { icon: FlaskConical, label: "Lab_Verified", desc: "Purity Tier 1" },
                    { icon: Thermometer, label: "Cold_Cure", desc: "60 Day Cycle" },
                    { icon: Sprout, label: "Living_Soil", desc: "Ancestral Genetics" },
                    { icon: ShieldCheck, label: "Clean_Green", desc: "Zero Pesticide" },
                  ].map((val, i) => (
                    <div key={i} className="space-y-4 text-left">
                       <val.icon className="w-6 h-6 text-[#c4a45e]" />
                       <h4 className="text-[11px] font-black uppercase tracking-widest text-white">{val.label}</h4>
                       <p className="text-[10px] font-light text-white/30 uppercase tracking-widest leading-loose">{val.desc}</p>
                    </div>
                  ))}
               </div>
               <div className="text-left mt-20">
                  <MagneticBtn className="px-14 py-6 bg-white text-black text-[10px] font-black uppercase tracking-[0.4em] rounded-full hover:bg-[#c4a45e] hover:text-black transition-all shadow-2xl">
                    Request Membership Access
                  </MagneticBtn>
               </div>
            </Reveal>
         </div>
      </section>

      {/* ── DESIGN HERITAGE ── */}
      <section className="py-40 bg-black relative overflow-hidden">
         <div className="absolute top-0 right-0 w-[60rem] h-[60rem] bg-[#c4a45e]/5 blur-[180px] rounded-full" />
         <div className="max-w-[1600px] mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
               <Reveal>
                  <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#c4a45e] mb-8 block">The Chronology</span>
                  <h2 className="text-6xl md:text-9xl font-black italic tracking-tighter leading-[0.8] mb-12 uppercase text-white">
                    Rooted in <br/> <span className="text-[#c4a45e] not-italic">Legacy.</span>
                  </h2>
                  <p className="text-white/40 text-xl leading-relaxed mb-16 font-light uppercase tracking-wide italic leading-loose">
                    Veridian was born from a pursuit of botanical perfection. What started as a clandestine collection of landrace genetics has evolved into a world-class cultivation atelier dedicated to the preservation of rare terpene profiles and organic integrity.
                  </p>
                  <div className="space-y-12">
                     {[
                       { year: "2008", event: "The genetic library is established. Initial collection of Hindu Kush and Thai landrace seeds begins." },
                       { year: "2015", event: "Veridian Gold stabilizes. Our signature cultivar wins the Emerald Cup for terpene complexity." },
                       { year: "2021", event: "Cold-Cure facility opens. First implementation of 60-day cryo-preservation protocols." },
                       { year: "2024", event: "Veridian membership portal launches, offering direct access to small-batch archives for global collectors." },
                     ].map((item, i) => (
                        <div key={i} className="flex gap-12 group">
                           <span className="text-3xl font-black italic text-[#c4a45e] opacity-40 group-hover:opacity-100 transition-opacity">{item.year}</span>
                           <p className="text-[11px] font-bold uppercase tracking-widest text-white/30 leading-loose">{item.event}</p>
                        </div>
                     ))}
                  </div>
               </Reveal>
               <Reveal delay={0.2}>
                  <div className="relative aspect-square grayscale opacity-50 hover:opacity-100 transition-opacity duration-1000 border border-white/5">
                     <Image src="https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=1200&q=80" alt="Veridian Heritage" fill className="object-cover" />
                  </div>
               </Reveal>
            </div>
         </div>
      </section>

      {/* ── TECHNICAL SPECIFICATIONS ── */}
      <section className="py-40 bg-[#0d120d]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
           <Reveal>
              <div className="mb-32">
                 <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#c4a45e] mb-8 block">Cultivation Manifest</span>
                 <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase text-white">Full <br/> <span className="text-[#c4a45e] not-italic">Ledger.</span></h2>
              </div>
           </Reveal>

           <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="border-b border-white/10">
                       <th className="py-8 text-[10px] font-bold uppercase tracking-[0.5em] text-white/20">Parameter</th>
                       <th className="py-8 text-[10px] font-bold uppercase tracking-[0.5em] text-white/20">Veridian_Gold</th>
                       <th className="py-8 text-[10px] font-bold uppercase tracking-[0.5em] text-white/20">Velvet_Night</th>
                       <th className="py-8 text-[10px] font-bold uppercase tracking-[0.5em] text-white/20">Obsidian_Bloom</th>
                    </tr>
                 </thead>
                 <tbody className="text-[11px] font-bold uppercase tracking-[0.2em]">
                    {[
                      { p: "THC / CBD Ratio", v1: "28:1", v2: "24:2", v3: "26:1" },
                      { p: "Primary Terpene", v1: "Limonene (0.8%)", v2: "Linalool (1.2%)", v3: "Pinene (0.9%)", },
                      { p: "Flowering Cycle", v1: "72 Days", v2: "64 Days", v3: "68 Days" },
                      { p: "Soil Composition", v1: "Volcanic Mineral", v2: "Oceanic Humus", v3: "Alpine Loam" },
                      { p: "Potency Level", v1: "Tier 1", v2: "Tier 1", v3: "Tier 1" },
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

      {/* ── ARTISAN PROFILES ── */}
      <section className="py-40 bg-black">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
           <Reveal>
              <div className="mb-32 text-center">
                 <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#c4a45e] mb-8 block">The Cultivators</span>
                 <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase text-white">Human <span className="text-[#c4a45e] not-italic">Element.</span></h2>
              </div>
           </Reveal>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-32">
              {[
                { name: "Julian Thorne", role: "Master Cultivator", text: "The plant is a communicator. My role is to listen to the soil and the moisture levels to ensure the genetic potential of each strain is fully realized without the interference of synthetic accelerants.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
                { name: "Sasha Grey", role: "Head of Lab Science", text: "Potency is only one part of the story. We focus on the synergy between cannabinoids and terpenes—the 'entourage effect'—to ensure that every Veridian product delivers a precise, clinical experience.", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80" },
              ].map((item, i) => (
                <Reveal key={i} delay={i * 0.2}>
                   <div className="space-y-12">
                      <div className="relative w-24 h-24 rounded-full overflow-hidden grayscale border border-[#c4a45e]/30 text-left">
                         <Image src={item.img} alt={item.name} fill className="object-cover" />
                      </div>
                      <blockquote className="text-3xl font-light italic text-white/60 leading-relaxed uppercase tracking-widest leading-loose text-left">
                         "{item.text}"
                      </blockquote>
                      <div className="text-left">
                         <span className="text-xl font-black text-white italic block mb-1">{item.name}</span>
                         <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#c4a45e]">{item.role}</span>
                      </div>
                   </div>
                </Reveal>
              ))}
           </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-40 bg-[#0a0f0a]">
        <div className="max-w-4xl mx-auto px-6">
           <Reveal>
              <div className="mb-24 text-center">
                 <h2 className="text-5xl font-black italic uppercase tracking-tighter text-white mb-8">Dispensary <span className="text-[#c4a45e] not-italic">Dialogues.</span></h2>
                 <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">Acquisition // Storage // Integrity</p>
              </div>
           </Reveal>

           <Accordion type="single" collapsible className="w-full space-y-4 text-left">
              {[
                { q: "What is the shelf-life of Veridian blooms?", a: "Due to our cold-cure process and nitrogen-sealed packaging, Veridian blooms maintain peak terpene potency for up to 12 months when stored in a cool, dark environment." },
                { q: "Do you ship internationally?", a: "Veridian operates strictly within compliant jurisdictions. We offer discreet concierge delivery to members within legal territories, but we do not ship across international borders." },
                { q: "Can I visit the cultivation atelier?", a: "Our facilities are high-security environments focused on biological integrity. Private tours are available strictly for Tier 1 members and certified research partners by appointment only." },
                { q: "What is your testing protocol?", a: "Every batch undergoes a full-panel 3rd party laboratory audit covering 104 different parameters, including heavy metals, 64 pesticides, and complete terpene profiling." },
                { q: "How do I become a member?", a: "Membership is currently by invitation or referral. You can submit a request for the waitlist through our portal; every application is vetted by our client concierge team." },
              ].map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border border-white/5 bg-white/[0.02] px-8 rounded-sm">
                   <AccordionTrigger className="text-[11px] font-black uppercase tracking-[0.3em] text-white hover:text-[#c4a45e] py-8 no-underline italic">
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
      <footer className="bg-[#0a0f0a] pt-40 pb-16 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-32 mb-40">
           
           <div className="lg:col-span-6">
              <Reveal>
                 <div className="flex flex-col mb-12">
                    <span className="text-4xl font-black tracking-[0.1em] uppercase leading-none italic text-[#c4a45e]">Veridian</span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/40 -mt-1 ml-1">Botanical Atelier</span>
                 </div>
                 <p className="text-white/20 max-w-md mb-16 text-[11px] font-bold uppercase tracking-[0.2em] leading-loose italic">
                    The absolute mastery of botanical craft. Engineered for the evolutionary elite in our California sanctuary.
                 </p>
                 <div className="flex gap-6">
                    {[Globe, Globe, Mail].map((Icon, i) => (
                      <button key={i} className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:bg-[#c4a45e] hover:text-black hover:border-[#c4a45e] transition-all">
                         <Icon className="w-5 h-5" />
                      </button>
                    ))}
                 </div>
              </Reveal>
           </div>

           <div className="lg:col-span-2">
              <h4 className="text-[11px] font-black uppercase tracking-widest text-[#c4a45e] mb-12 text-left">Library</h4>
              <ul className="space-y-6 text-[10px] font-bold uppercase tracking-widest text-white/30 text-left">
                 <li><Link href="#" className="hover:text-white transition-colors">Veridian_Gold</Link></li>
                 <li><Link href="#" className="hover:text-white transition-colors">Velvet_Night</Link></li>
                 <li><Link href="#" className="hover:text-white transition-colors">Obsidian_Bloom</Link></li>
                 <li><Link href="#" className="hover:text-white transition-colors">Small_Batch</Link></li>
              </ul>
           </div>

           <div className="lg:col-span-2">
              <h4 className="text-[11px] font-black uppercase tracking-widest text-[#c4a45e] mb-12 text-left">Science</h4>
              <ul className="space-y-6 text-[10px] font-bold uppercase tracking-widest text-white/30 text-left">
                 <li><Link href="#" className="hover:text-white transition-colors">Lab_Results</Link></li>
                 <li><Link href="#" className="hover:text-white transition-colors">Terpene_Archive</Link></li>
                 <li><Link href="#" className="hover:text-white transition-colors">Curing_Process</Link></li>
                 <li><Link href="#" className="hover:text-white transition-colors">Consultation</Link></li>
              </ul>
           </div>

           <div className="lg:col-span-2">
              <h4 className="text-[11px] font-black uppercase tracking-widest text-[#c4a45e] mb-12 text-left">Studio</h4>
              <ul className="space-y-6 text-[10px] font-bold uppercase tracking-widest text-white/30 text-left">
                 <li><Link href="#" className="hover:text-white transition-colors">The_Maison</Link></li>
                 <li><Link href="#" className="hover:text-white transition-colors">Global_Units</Link></li>
                 <li><Link href="#" className="hover:text-white transition-colors">Technical_Kit</Link></li>
                 <li><Link href="#" className="hover:text-white transition-colors">Archives</Link></li>
              </ul>
           </div>
        </div>

        <div className="max-w-[1600px] mx-auto pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12 text-[10px] font-bold uppercase tracking-[0.4em] text-white/10">
           <div className="flex items-center gap-12">
              <span>&copy; {new Date().getFullYear()} VERIDIAN BOTANICAL ATELIER GROUP.</span>
              <div className="flex gap-8">
                <span>CRAFT_CURE_CERTIFIED</span>
                <span>ORGANIC_SOIL_NOMINAL</span>
              </div>
           </div>
           <div className="flex gap-12 font-mono">
              <span>TERPENE_RETAINED_98%</span>
              <span>PH_STABLE_6.2_NOMINAL</span>
           </div>
        </div>
      </footer>

      <style>{`
        ::-webkit-scrollbar{width:4px;background:#0a0f0a}
        ::-webkit-scrollbar-thumb{background:#c4a45e}
      `}</style>
    </div>
  );
}
