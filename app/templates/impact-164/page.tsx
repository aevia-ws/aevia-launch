"use client"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Zap, ArrowRight, Menu, Star, Activity, Cpu, Globe, Share2, ChevronRight, Layout, Box, Sparkles, Megaphone } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

function Reveal({ children, delay = 0, y = 30 }: { children: React.ReactNode; delay?: number; y?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y }} animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  )
}

const SERVICES = [
  { id: "01", name: "Social Surge", cat: "Growth", d: "Hyper-localized content strategies that dominate the feed algorithm." },
  { id: "02", name: "Visual Pulse", cat: "Content", d: "High-octane video production and motion design for a digital-first world." },
  { id: "03", name: "Paid Alpha", cat: "Ads", d: "Data-driven performance marketing focused on absolute ROI and scale." },
]

export default function PulseAgencyPage() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", h)
    return () => window.removeEventListener("scroll", h)
  }, [])

  return (
    <div className="bg-[#0a0015] text-[#d1d1d1] font-sans min-h-screen selection:bg-[#ccff00] selection:text-black overflow-x-hidden">
      
      {/* ── AMBIENT GLOWS ────────── */}
      <div className="fixed top-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#ccff00]/5 blur-[150px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#ccff00]/5 blur-[150px] pointer-events-none z-0" />

      {/* ── NAVBAR ────────────────── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled ? "bg-[#0a0015]/90 backdrop-blur-2xl border-b border-white/5 py-4" : "bg-transparent py-10"}`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4 group">
            <div className="w-10 h-10 bg-[#ccff00] flex items-center justify-center group-hover:rotate-12 transition-transform duration-500 shadow-[0_0_20px_rgba(204,255,0,0.3)]">
              <Zap className="w-6 h-6 text-black" />
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase text-white italic">Pulse<span className="text-[#ccff00]">.</span></span>
          </Link>
          <div className="hidden lg:flex gap-12 text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">
            {["The Vibe", "Services", "Alpha", "Contact"].map(l => (
              <Link key={l} href="#" className="hover:text-[#ccff00] transition-colors">{l}</Link>
            ))}
          </div>
          <div className="flex items-center gap-8">
            <button className="hidden md:block text-[10px] font-bold uppercase tracking-widest text-white/20 hover:text-white transition-colors underline underline-offset-8 decoration-[#ccff00]/30">Client Login</button>
            <button className="px-10 py-3.5 bg-[#ccff00] text-black text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-500 italic shadow-lg">Scale Now</button>
            <Sheet>
              <SheetTrigger asChild><button className="lg:hidden p-2"><Menu className="w-6 h-6 text-white" /></button></SheetTrigger>
              <SheetContent side="right" className="bg-[#0a0015] border-white/5 p-12 text-white font-sans">
                <div className="flex flex-col gap-10 mt-16 text-left font-black uppercase tracking-tighter italic">
                  {["Growth", "Creative", "Alpha", "Contact"].map(l => (
                    <Link key={l} href="#" className="text-4xl hover:text-[#ccff00] transition-all">{l}</Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      <main>
        {/* ── HERO ──────────────────── */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
             <Image src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=2400" alt="Energy" fill className="object-cover opacity-20 scale-110 grayscale" priority />
             <div className="absolute inset-0 bg-gradient-to-t from-[#0a0015] via-transparent to-transparent" />
          </div>

          <div className="relative z-10 max-w-[1400px] mx-auto px-6 text-center">
            <Reveal>
              <div className="flex items-center justify-center gap-4 mb-12">
                 <div className="w-8 h-[2px] bg-[#ccff00]" />
                 <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-white">Dominate The Attention Economy</span>
                 <div className="w-8 h-[2px] bg-[#ccff00]" />
              </div>
            </Reveal>
            <Reveal delay={0.1} y={100}>
              <h1 className="text-8xl md:text-[16vw] font-black tracking-tighter leading-[0.75] uppercase mb-16 italic text-white">
                PURE <br/> <span className="text-[#ccff00]">ALPHA.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="flex flex-col items-center justify-center gap-16">
                <p className="text-2xl text-white/40 font-light max-w-2xl leading-relaxed italic uppercase">
                  We don't follow trends. We trigger them. High-octane growth strategies for brands that demand the spotlight.
                </p>
                <div className="flex flex-wrap justify-center gap-10">
                  <button className="px-20 py-8 bg-[#ccff00] text-black font-black uppercase tracking-widest text-[10px] hover:px-24 transition-all duration-700 italic shadow-[0_0_50px_rgba(204,255,0,0.2)]">
                     Ignite My Brand
                  </button>
                  <button className="px-20 py-8 border border-white/10 text-white/40 font-bold uppercase tracking-widest text-[10px] hover:text-white transition-all flex items-center gap-4 italic">
                    <Play className="w-4 h-4 fill-[#ccff00] text-[#ccff00]" /> The Showreel
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
          
          <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end text-[9px] font-bold uppercase tracking-[0.4em] text-white/10 italic">
             <div className="flex gap-10">
                <span>REVENUE DRIVEN</span>
                <span>DATA BACKED</span>
                <span>ALGO DOMINANT</span>
             </div>
             <Activity className="w-6 h-6 text-[#ccff00] animate-pulse" />
          </div>
        </section>

        {/* ── METRICS ────────────────── */}
        <section className="py-24 bg-[#ccff00] text-black border-y-4 border-black">
           <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-20">
              {[
                { v: "4.2B+", l: "TOTAL VIEWS" },
                { v: "142%", l: "AVG ROI BOOST" },
                { v: "12M+", l: "NEW FOLLOWERS" },
                { v: "24/7", l: "ALGO MONITOR" }
              ].map((m, i) => (
                <Reveal key={i} delay={i * 0.1}>
                   <div className="text-center md:text-left">
                      <div className="text-5xl font-black italic tracking-tighter mb-2">{m.v}</div>
                      <div className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-60">{m.l}</div>
                   </div>
                </Reveal>
              ))}
           </div>
        </section>

        {/* ── SERVICES ───────────────── */}
        <section className="py-60 bg-[#0a0015]">
           <div className="max-w-[1400px] mx-auto px-6 md:px-12">
              <Reveal>
                 <div className="flex flex-col md:flex-row items-end justify-between mb-32 gap-8 border-b-2 border-white/5 pb-16">
                    <div className="max-w-2xl">
                       <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#ccff00] block mb-6">Growth Modules</span>
                       <h2 className="text-7xl md:text-[9vw] font-black uppercase tracking-tighter text-white leading-none italic">Hard <br/> <span className="font-light not-italic opacity-10">Scale.</span></h2>
                    </div>
                    <button className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-[#ccff00] transition-colors group italic">
                       Full Protocol <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </button>
                 </div>
              </Reveal>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                 {SERVICES.map((item, i) => (
                   <Reveal key={i} delay={i * 0.1}>
                      <div className="p-16 bg-white/[0.02] border border-white/5 group hover:bg-[#ccff00] hover:text-black transition-all duration-700 cursor-crosshair">
                         <div className="w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center mb-12 group-hover:bg-black group-hover:text-white transition-all duration-700 shadow-xl">
                            {i === 0 ? <Megaphone className="w-7 h-7" /> : i === 1 ? <Sparkles className="w-7 h-7" /> : <Activity className="w-7 h-7" />}
                         </div>
                         <div className="text-[10px] font-bold uppercase tracking-widest opacity-20 mb-4 group-hover:opacity-40">{item.cat} Protocol</div>
                         <h3 className="text-3xl font-black uppercase mb-8 tracking-tighter italic">{item.name}</h3>
                         <p className="opacity-40 leading-relaxed text-sm font-light mb-12 italic group-hover:opacity-100 transition-opacity">{item.d}</p>
                         <Link href="#" className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest group-hover:gap-8 transition-all">
                            Examine Alpha <ChevronRight className="w-4 h-4" />
                         </Link>
                      </div>
                   </Reveal>
                 ))}
              </div>
           </div>
        </section>

        {/* ── CTA ───────────────────── */}
        <section className="py-60 bg-white text-black text-center relative overflow-hidden">
           <div className="absolute inset-0 opacity-[0.05] pointer-events-none text-[20vw] font-black whitespace-nowrap italic -rotate-12 select-none">
              PULSE PULSE PULSE PULSE PULSE
           </div>
           <div className="max-w-4xl mx-auto px-6 relative z-10">
              <Reveal>
                 <h2 className="text-8xl md:text-[15vw] font-black uppercase tracking-tighter leading-[0.8] mb-16 italic">
                    Scale <br/> <span className="font-light not-italic opacity-20 text-black">Infinite.</span>
                 </h2>
                 <p className="text-2xl text-black/40 font-light mb-20 leading-relaxed italic max-w-2xl mx-auto">
                    We only partner with 4 brands per quarter to ensure absolute dominance in their respective categories. Apply for the Q3 alpha slot.
                 </p>
                 <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
                    <button className="px-24 py-10 bg-[#ccff00] text-black font-black uppercase text-[10px] tracking-[0.3em] hover:px-28 transition-all duration-700 italic shadow-2xl">
                       Apply For Alpha
                    </button>
                    <button className="px-24 py-10 border-4 border-black text-black font-black uppercase text-[10px] tracking-[0.3em] hover:bg-black hover:text-white transition-all duration-700 italic">
                       View Case Files
                    </button>
                 </div>
              </Reveal>
           </div>
        </section>
      </main>

      {/* ── FOOTER ────────────────── */}
      <footer className="bg-[#0a0015] pt-32 pb-12 px-6 border-t border-white/5 font-sans relative z-[60]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-5 gap-20 mb-40">
           <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-4 mb-10 group">
                <div className="w-10 h-10 bg-[#ccff00] flex items-center justify-center">
                  <Zap className="w-6 h-6 text-black" />
                </div>
                <span className="text-2xl font-black tracking-tighter uppercase text-white italic">Pulse Agency.</span>
              </Link>
              <p className="text-white/20 max-w-sm leading-relaxed mb-12 text-[10px] font-bold uppercase italic">
                 "Growth is not a goal. It is a byproduct of absolute attention dominance. Master the feed."
              </p>
              <div className="flex gap-10">
                 {["Instagram", "Vimeo", "X", "Lens"].map(s => (
                   <Link key={s} href="#" className="text-[10px] font-bold uppercase tracking-widest text-white/20 hover:text-[#ccff00] transition-colors italic">{s}</Link>
                 ))}
              </div>
           </div>
           
           {[
             { t: "GROWTH", l: ["Social Surge", "Viral Creative", "Paid Performance", "Algo Audit"] },
             { t: "ENTITY", l: ["The Alpha", "Creative Lab", "Press Kit", "Journal"] },
             { t: "SUPPORT", l: ["Client Portal", "Status", "Manual", "Contact"] }
           ].map((col, i) => (
             <div key={i} className="space-y-12">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#ccff00]/40">{col.t}</h4>
                <ul className="space-y-6">
                   {col.l.map(link => (
                     <li key={link} className="text-xs font-bold uppercase tracking-widest text-white/20 hover:text-white transition-colors italic">
                        <Link href="#">{link}</Link>
                     </li>
                   ))}
                </ul>
             </div>
           ))}
        </div>
        <div className="max-w-[1400px] mx-auto flex flex-col md:row justify-between items-center gap-8 border-t border-white/5 pt-12 text-[10px] font-bold uppercase tracking-[0.4em] text-white/10 italic">
           <span>© 2026 PULSE GROWTH AGENCY LTD. THE ATTENTION ECONOMY IS OURS.</span>
           <div className="flex gap-12">
              <Link href="#" className="hover:text-white transition-all underline decoration-[#ccff00]/30">SYSTEM_NOMINAL</Link>
              <Link href="#" className="hover:text-white transition-all underline decoration-[#ccff00]/30">ALPHA_ENABLED</Link>
           </div>
        </div>
      </footer>
    </div>
  )
}
