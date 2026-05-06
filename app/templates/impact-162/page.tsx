"use client"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Zap, ArrowRight, Menu, Star, Shield, Activity, Dumbbell, Target, Gauge, ChevronRight, Play, Flame } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

function Reveal({ children, delay = 0, y = 30 }: { children: React.ReactNode; delay?: number; y?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y }} animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  )
}

function ParallaxImg({ src, alt }: { src: string; alt: string }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"])
  return (
    <div ref={ref} className="relative w-full h-full overflow-hidden grayscale contrast-125">
      <motion.div style={{ y }} className="absolute inset-[-15%] w-[130%] h-[130%]">
        <Image src={src} alt={alt} fill className="object-cover opacity-60" />
      </motion.div>
    </div>
  )
}

export default function SteelGymPage() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", h)
    return () => window.removeEventListener("scroll", h)
  }, [])

  return (
    <div className="bg-[#050505] text-[#888] font-sans min-h-screen selection:bg-red-600 selection:text-white overflow-x-hidden">
      
      {/* ── GRAIN OVERLAY ────────── */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

      {/* ── NAVBAR ────────────────── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled ? "bg-black/95 backdrop-blur-xl border-b border-white/5 py-4" : "bg-transparent py-10"}`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4 group">
            <div className="w-10 h-10 bg-red-600 flex items-center justify-center group-hover:-skew-x-12 transition-transform duration-500">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase italic text-white">Steel<span className="text-red-600">Gym.</span></span>
          </Link>
          <div className="hidden lg:flex gap-10 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
            {["The Forge", "Protocols", "Athletes", "Gear"].map(l => (
              <Link key={l} href="#" className="hover:text-red-600 transition-colors">{l}</Link>
            ))}
          </div>
          <div className="flex items-center gap-8">
            <button className="hidden md:block text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors underline underline-offset-8 decoration-red-600/30">Member Portal</button>
            <button className="px-10 py-3.5 bg-white text-black text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-red-600 hover:text-white transition-all duration-500 italic">Enroll Now</button>
            <Sheet>
              <SheetTrigger asChild><button className="lg:hidden p-2"><Menu className="w-6 h-6 text-white" /></button></SheetTrigger>
              <SheetContent side="right" className="bg-black border-white/5 p-12 text-white font-sans">
                <div className="flex flex-col gap-8 mt-16 text-left font-black uppercase tracking-tighter italic">
                  {["Forge", "System", "Record", "Contact"].map(l => (
                    <Link key={l} href="#" className="text-4xl hover:text-red-600 transition-all">{l}</Link>
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
             <Image src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=2400" alt="Heavy Gym" fill className="object-cover opacity-10 scale-110" priority />
             <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/50" />
          </div>

          <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-end">
              <div>
                <Reveal>
                  <div className="inline-flex items-center gap-4 mb-10 px-5 py-2 bg-red-600 text-white text-[10px] font-black uppercase tracking-[0.4em] -skew-x-12">
                    Human Performance v10.0
                  </div>
                </Reveal>
                <Reveal delay={0.1} y={100}>
                  <h1 className="text-7xl md:text-[14vw] font-black tracking-tighter leading-[0.75] uppercase mb-16 italic text-white">
                    Raw <br/> <span className="text-white/10 not-italic">Power.</span>
                  </h1>
                </Reveal>
                <Reveal delay={0.3}>
                  <div className="flex flex-col sm:flex-row gap-12 items-center">
                    <p className="text-xl text-white/30 font-light max-w-sm leading-relaxed uppercase italic">
                      Uncompromising physical engineering. We provide the tools; you provide the resolve.
                    </p>
                    <div className="h-px w-20 bg-red-600 hidden sm:block" />
                    <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white flex flex-col gap-2 italic">
                       <span>Iron Only</span>
                       <span>No Excuses</span>
                    </div>
                  </div>
                </Reveal>
                <Reveal delay={0.4}>
                  <div className="mt-16 flex flex-wrap gap-8">
                     <button className="px-12 py-5 bg-red-600 text-white font-black uppercase text-[10px] tracking-widest hover:px-16 transition-all duration-700 italic">
                        Mobilize Now
                     </button>
                     <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-white/40 group cursor-pointer hover:text-white transition-colors">
                        <Play className="w-5 h-5 text-red-600 fill-current" /> Witness The Iron
                     </div>
                  </div>
                </Reveal>
              </div>
              
              <Reveal delay={0.5} y={0}>
                 <div className="relative p-1 bg-white/5 border border-white/10 rounded-sm">
                    <div className="bg-[#111] p-10 font-mono text-[10px] text-white/20 space-y-8">
                       <div className="flex justify-between border-b border-white/5 pb-4">
                          <span className="text-red-600">SYSTEM: CAPACITY_AUDIT</span>
                          <span>NOMINAL</span>
                       </div>
                       <div className="grid grid-cols-2 gap-10">
                          <div>
                             <div className="text-[8px] uppercase tracking-widest mb-1">Active Members</div>
                             <div className="text-2xl font-black text-white italic">442</div>
                          </div>
                          <div>
                             <div className="text-[8px] uppercase tracking-widest mb-1">Iron Weight</div>
                             <div className="text-2xl font-black text-white italic">14.2 Tons</div>
                          </div>
                       </div>
                       <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                          <motion.div animate={{ x: ["-100%", "100%"] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} className="w-[40%] h-full bg-red-600" />
                       </div>
                    </div>
                 </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── TICKER ────────────────── */}
        <section className="py-12 bg-red-600 text-white overflow-hidden flex items-center border-y-4 border-black">
           <motion.div 
             animate={{ x: ["0%", "-50%"] }} 
             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
             className="flex gap-20 whitespace-nowrap text-5xl font-black uppercase italic tracking-tighter"
           >
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="flex items-center gap-10">
                   <span>Bodybuilding</span>
                   <div className="w-4 h-4 bg-white rotate-45" />
                   <span>Powerlifting</span>
                   <div className="w-4 h-4 bg-white rotate-45" />
                   <span>Conditioning</span>
                   <div className="w-4 h-4 bg-white rotate-45" />
                </div>
              ))}
           </motion.div>
        </section>

        {/* ── THE FORGE ─────────────── */}
        <section className="py-40 bg-[#050505]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <Reveal>
              <div className="flex flex-col md:flex-row items-end justify-between mb-32 gap-8 border-b-2 border-white/5 pb-16">
                <div className="max-w-2xl">
                  <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-red-600 block mb-6">Operational Grounds</span>
                  <h2 className="text-7xl md:text-[9vw] font-black uppercase tracking-tighter text-white leading-none italic text-left">The <br/> <span className="font-light not-italic opacity-10">Forge.</span></h2>
                </div>
                <button className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-red-600 transition-colors group italic">
                  Explore Training <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/5">
              {[
                { icon: Flame, t: "Atmosphere", d: "A high-intensity sanctuary designed for focus. Zero distraction, absolute resolve." },
                { icon: Gauge, t: "Performance", d: "Elite-grade conditioning protocols monitored by real-time biometrics." },
                { icon: Target, t: "Precision", d: "Surgical approach to bodybuilding with bio-mechanically optimal equipment." }
              ].map((item, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className={`p-16 flex flex-col h-full border-white/5 group hover:bg-white/[0.02] transition-colors ${i < 2 ? "md:border-r" : ""}`}>
                    <div className="w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center mb-12 group-hover:bg-red-600 group-hover:text-white transition-all duration-700 -skew-x-12 shadow-xl">
                      <item.icon className="w-7 h-7" />
                    </div>
                    <div className="text-[9px] font-bold uppercase tracking-widest text-white/20 mb-4 italic">Protocol: S-0{i+1}</div>
                    <h3 className="text-3xl font-black uppercase mb-8 tracking-tighter italic text-white">{item.t}</h3>
                    <p className="text-white/30 leading-relaxed text-sm font-light mb-12 italic">{item.d}</p>
                    <Link href="#" className="mt-auto flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest group-hover:gap-8 transition-all hover:text-red-600">
                       Examine System <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────── */}
        <section className="py-60 bg-white text-black text-center relative overflow-hidden">
           {/* Abstract Geometric Background */}
           <div className="absolute inset-0 opacity-[0.05] pointer-events-none text-[20vw] font-black whitespace-nowrap italic -rotate-12 select-none">
              IRON IRON IRON IRON IRON
           </div>
          <div className="max-w-4xl mx-auto px-6 relative z-10">
            <Reveal>
              <h2 className="text-8xl md:text-[15vw] font-black uppercase tracking-tighter leading-[0.8] mb-16 italic">
                Become <br/> <span className="font-light not-italic opacity-20 text-black">Steel.</span>
              </h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
                <button className="px-24 py-10 bg-black text-white font-black uppercase tracking-widest text-[10px] hover:px-28 transition-all duration-700 italic -skew-x-12 shadow-2xl">
                   Join The Collective
                </button>
                <button className="px-24 py-10 border-4 border-black text-black font-black uppercase tracking-widest text-[10px] hover:bg-black hover:text-white transition-all duration-700 italic -skew-x-12">
                   View Membership
                </button>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ── FOOTER ────────────────── */}
      <footer className="bg-[#050505] pt-32 pb-12 px-6 border-t border-white/5 font-sans relative z-[60]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-5 gap-20 mb-40">
           <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-4 mb-10 group">
                <div className="w-10 h-10 bg-red-600 flex items-center justify-center -skew-x-12">
                  <Dumbbell className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-black tracking-tighter uppercase text-white italic">Steel Gym.</span>
              </Link>
              <p className="text-white/20 max-w-sm leading-relaxed mb-12 text-[10px] font-bold uppercase italic">
                 "Strength is the only variable that defines the hierarchy of resolve. We provide the iron; you provide the soul."
              </p>
              <div className="flex gap-10">
                 {["Instagram", "Journal", "Reports", "Athletes"].map(s => (
                   <Link key={s} href="#" className="text-[10px] font-bold uppercase tracking-widest text-white/20 hover:text-red-600 transition-colors italic">{s}</Link>
                 ))}
              </div>
           </div>
           
           {[
             { t: "TRAINING", l: ["Bodybuilding", "Powerlifting", "Strongman", "Conditioning"] },
             { t: "THE FORGE", l: ["Our Legacy", "Equipment", "Athletes", "Journal"] },
             { t: "ENTITY", l: ["Membership", "Legal", "SLA", "Contact"] }
           ].map((col, i) => (
             <div key={i} className="space-y-12">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-red-600/40">{col.t}</h4>
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
           <span>© 2026 STEEL GYM PERFORMANCE GROUP. BUILT WITH IRON.</span>
           <div className="flex gap-12">
              <Link href="#" className="hover:text-white transition-all underline decoration-red-600/30">SYSTEM_NOMINAL</Link>
              <Link href="#" className="hover:text-white transition-all underline decoration-red-600/30">CAPACITY: 92%</Link>
           </div>
        </div>
      </footer>
    </div>
  )
}
