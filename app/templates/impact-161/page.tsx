"use client"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Anchor, ArrowRight, Menu, Star, Shield, Compass, Waves, Ship, MapPin, ChevronRight, Play, ShipWheel } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

function Reveal({ children, delay = 0, y = 30 }: { children: React.ReactNode; delay?: number; y?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y }} animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.5, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  )
}

function ParallaxImg({ src, alt }: { src: string; alt: string }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"])
  return (
    <div ref={ref} className="relative w-full h-full overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-[-20%] w-[140%] h-[140%]">
        <Image src={src} alt={alt} fill className="object-cover" />
      </motion.div>
    </div>
  )
}

const FLEET = [
  { name: "The Aetheris 80", length: "80m / 262ft", guests: "12 Guests", img: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&q=80&w=1200" },
  { name: "Azurea Super", length: "65m / 213ft", guests: "10 Guests", img: "https://images.unsplash.com/photo-1621275471769-e6aa344546d5?auto=format&fit=crop&q=80&w=1200" },
  { name: "Nova Legacy", length: "92m / 302ft", guests: "16 Guests", img: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1200" },
]

export default function NovaYachtPage() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", h)
    return () => window.removeEventListener("scroll", h)
  }, [])

  return (
    <div className="bg-[#050a14] text-[#d1d5db] font-sans min-h-screen selection:bg-white selection:text-black overflow-x-hidden">
      
      {/* ── NAVBAR ────────────────── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-1000 ${scrolled ? "bg-[#050a14]/90 backdrop-blur-2xl border-b border-white/5 py-4" : "bg-transparent py-10"}`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4 group">
            <div className="w-10 h-10 border border-white/20 flex items-center justify-center group-hover:bg-white transition-all duration-700">
              <ShipWheel className="w-5 h-5 group-hover:text-black transition-colors" />
            </div>
            <span className="text-xl font-light tracking-[0.4em] uppercase text-white">Nova <span className="font-bold">Yacht</span></span>
          </Link>
          <div className="hidden lg:flex gap-12 text-[10px] font-bold uppercase tracking-[0.5em] text-white/30">
            {["The Fleet", "Destinations", "Experience", "Legacy"].map(l => (
              <Link key={l} href="#" className="hover:text-white transition-colors">{l}</Link>
            ))}
          </div>
          <div className="flex items-center gap-8">
            <button className="hidden md:block text-[10px] font-bold uppercase tracking-widest text-white/20 hover:text-white transition-colors underline underline-offset-8 decoration-white/10">Member Access</button>
            <button className="px-10 py-3.5 bg-white text-black text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-transparent hover:text-white border border-transparent hover:border-white transition-all duration-700">Charter Now</button>
            <Sheet>
              <SheetTrigger asChild><button className="lg:hidden p-2"><Menu className="w-6 h-6 text-white" /></button></SheetTrigger>
              <SheetContent side="right" className="bg-[#050a14] border-white/5 p-12 text-white">
                <div className="flex flex-col gap-10 mt-16 text-left">
                  {["Vessels", "Journeys", "Cuisine", "Contact"].map(l => (
                    <Link key={l} href="#" className="text-4xl font-light uppercase tracking-widest hover:italic transition-all">{l}</Link>
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
             <Image src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=2400" alt="Yacht Panorama" fill className="object-cover opacity-30 scale-105" priority />
             <div className="absolute inset-0 bg-gradient-to-t from-[#050a14] via-transparent to-transparent" />
          </div>

          <div className="relative z-10 max-w-[1200px] mx-auto px-6 text-center">
            <Reveal>
              <div className="flex items-center justify-center gap-8 mb-16 opacity-30">
                 <div className="w-16 h-[1px] bg-white" />
                 <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-white">Uncompromised Maritime Luxury</span>
                 <div className="w-16 h-[1px] bg-white" />
              </div>
            </Reveal>
            <Reveal delay={0.2} y={70}>
              <h1 className="text-8xl md:text-[14vw] font-light tracking-tighter leading-[0.8] text-white mb-16 uppercase italic">
                Infinite <br/> <span className="font-bold not-italic">Horizon.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="flex flex-col items-center justify-center gap-16">
                <p className="text-2xl text-white/40 font-light max-w-2xl leading-relaxed italic">
                  Curating the world's most exclusive superyacht charters. A sanctuary of freedom, masterfully engineered for the global few.
                </p>
                <div className="flex flex-wrap justify-center gap-12">
                  <button className="px-16 py-6 border border-white/20 text-white font-bold uppercase tracking-widest text-[10px] hover:bg-white hover:text-black transition-all duration-700 italic shadow-2xl">
                    Explore The Fleet
                  </button>
                  <button className="px-16 py-6 bg-white text-black font-bold uppercase tracking-widest text-[10px] hover:px-20 transition-all flex items-center gap-4">
                    <Play className="w-3 h-3 fill-current" /> Witness The Voyage
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
          
          <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end text-[9px] font-bold uppercase tracking-[0.4em] text-white/10 italic">
            <span>MONACO / ST. BARTS / MALDIVES / AMALFI</span>
            <div className="flex gap-6 items-center">
               <Waves className="w-4 h-4 text-white animate-pulse" />
               <span>EST. 1994</span>
            </div>
          </div>
        </section>

        {/* ── THE FLEET ─────────────── */}
        <section className="py-60 bg-[#050a14] relative overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
             <Reveal>
                <div className="flex flex-col lg:flex-row items-end justify-between mb-32 gap-8 border-b border-white/5 pb-16">
                   <div className="max-w-2xl">
                      <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/30 block mb-6">Marine Excellence</span>
                      <h2 className="text-7xl md:text-[9vw] font-light uppercase tracking-tighter text-white leading-none italic">The <span className="not-italic font-bold opacity-10">Vessels.</span></h2>
                   </div>
                   <Link href="#" className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest hover:text-white text-white/30 transition-colors group italic">
                      View Availability <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                   </Link>
                </div>
             </Reveal>

             <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                {FLEET.map((yacht, i) => (
                  <Reveal key={i} delay={i * 0.15}>
                     <div className="group cursor-pointer">
                        <div className="aspect-[4/5] relative mb-12 overflow-hidden border border-white/5 p-2 bg-white/[0.02]">
                           <ParallaxImg src={yacht.img} alt={yacht.name} />
                           <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-1000" />
                           <div className="absolute bottom-10 left-10">
                              <div className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2 italic">{yacht.guests} // {yacht.length}</div>
                              <h3 className="text-4xl font-bold uppercase tracking-widest text-white leading-tight">{yacht.name}</h3>
                           </div>
                        </div>
                        <div className="flex justify-between items-center px-2">
                           <span className="text-xs font-light text-white/20 uppercase tracking-widest italic">Luxury Superyacht</span>
                           <button className="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors underline underline-offset-4 decoration-white/10">Examine Specs</button>
                        </div>
                     </div>
                  </Reveal>
                ))}
             </div>
          </div>
        </section>

        {/* ── THE EXPERIENCE ────────── */}
        <section className="py-60 bg-black relative border-y border-white/5">
           <div className="max-w-[1400px] mx-auto px-6 md:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                 <Reveal>
                    <div className="aspect-square relative grayscale group overflow-hidden border border-white/10 p-2">
                       <ParallaxImg src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1200" alt="Onboard Lunch" />
                       <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-1000" />
                    </div>
                 </Reveal>
                 <div>
                    <Reveal>
                       <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-white block mb-12 italic">Bespoke Concierge</span>
                       <h2 className="text-6xl md:text-8xl font-light uppercase tracking-tighter text-white leading-tight mb-16 italic">Absolute <br/> <span className="not-italic font-bold opacity-30">Freedom.</span></h2>
                       <p className="text-2xl font-light text-white/40 leading-relaxed mb-20 italic">
                          From private Michelin-starred chefs to hidden cove discovery, our onboard experience is engineered to the highest fidelity of luxury.
                       </p>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                          {[
                            { icon: Compass, t: "HIDDEN ROUTES", d: "Secret mediterranean coves accessible only by our shallow-draft fleet." },
                            { icon: Ship, t: "ELITE CREW", d: "Highly-trained international crew maintaining an absolute 1:1 guest ratio." }
                          ].map((item, i) => (
                            <div key={i} className="group">
                               <div className="w-12 h-12 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-white group-hover:text-black transition-all">
                                  <item.icon className="w-5 h-5" />
                               </div>
                               <h4 className="text-xs font-black uppercase tracking-widest mb-4 text-white italic">{item.t}</h4>
                               <p className="text-sm font-light leading-relaxed text-white/20 italic">{item.d}</p>
                            </div>
                          ))}
                       </div>
                    </Reveal>
                 </div>
              </div>
           </div>
        </section>

        {/* ── CTA ───────────────────── */}
        <section className="py-60 bg-white text-black text-center px-6 relative overflow-hidden">
           <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
              <ShipWheel className="w-[800px] h-[800px]" />
           </div>
           <div className="max-w-4xl mx-auto relative z-10">
              <Reveal>
                 <div className="w-16 h-16 border-2 border-black mx-auto mb-20 flex items-center justify-center font-black text-black text-2xl italic">N</div>
                 <h2 className="text-8xl md:text-[14vw] font-black uppercase tracking-tighter leading-[0.8] mb-16 italic">
                    CHART THE <br/> <span className="font-light not-italic opacity-20 text-black">UNKNOWN.</span>
                 </h2>
                 <p className="text-2xl text-black/40 font-light mb-20 leading-relaxed italic max-w-2xl mx-auto">
                    We accept a limited number of high-season charters. Book your passage to the world's most guarded horizons.
                 </p>
                 <div className="flex flex-col sm:flex-row items-center justify-center gap-12">
                    <button className="px-20 py-10 bg-black text-white font-bold uppercase text-[10px] tracking-[0.3em] hover:px-24 transition-all duration-700 italic shadow-2xl">
                       Inquire Now
                    </button>
                    <button className="px-20 py-10 border-4 border-black text-black font-bold uppercase text-[10px] tracking-[0.3em] hover:bg-black hover:text-white transition-all duration-700 italic">
                       View Itineraries
                    </button>
                 </div>
              </Reveal>
           </div>
        </section>
      </main>

      {/* ── FOOTER ────────────────── */}
      <footer className="bg-[#050a14] pt-40 pb-12 px-6 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-5 gap-20 mb-40">
           <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-4 mb-10 group">
                <div className="w-10 h-10 border border-white/20 flex items-center justify-center">
                  <ShipWheel className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-light tracking-[0.4em] uppercase text-white">Nova Yacht</span>
              </Link>
              <p className="text-white/20 max-w-sm leading-relaxed mb-12 text-sm font-light italic">
                 "Freedom is the only luxury that matters. We provide the vessels and the routes to claim it."
              </p>
              <div className="flex gap-10">
                 {["Instagram", "Journal", "Destinations", "Contact"].map(s => (
                   <Link key={s} href="#" className="text-[10px] font-bold uppercase tracking-widest text-white/20 hover:text-white transition-colors italic">{s}</Link>
                 ))}
              </div>
           </div>
           
           {[
             { t: "THE FLEET", l: ["Superyachts", "Sailing Vessels", "Explorer Series", "New Builds"] },
             { t: "EXPERIENCE", l: ["Concierge", "Private Chef", "Water Sports", "Security"] },
             { t: "SERVICE", l: ["Charter Inquire", "Locations", "Partner Hub", "Legal"] }
           ].map((col, i) => (
             <div key={i} className="space-y-12">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.6em] text-white/20">{col.t}</h4>
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
           <span>© 2026 NOVA YACHT GLOBAL CHARTERS AG. BORN FOR THE OCEAN.</span>
           <div className="flex gap-12">
              <Link href="#" className="hover:text-white transition-all underline decoration-white/20">MONACO</Link>
              <Link href="#" className="hover:text-white transition-all underline decoration-white/20">ST. BARTS</Link>
              <Link href="#" className="hover:text-white transition-all underline decoration-white/20">BALI</Link>
           </div>
        </div>
      </footer>
    </div>
  )
}
