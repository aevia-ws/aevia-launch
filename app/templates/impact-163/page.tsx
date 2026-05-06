"use client"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Wind, ArrowRight, Menu, Star, Flower2, Droplets, Leaf, Compass, ChevronRight, Play, ShoppingBag } from "lucide-react"
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
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"])
  return (
    <div ref={ref} className="relative w-full h-full overflow-hidden rounded-[2rem]">
      <motion.div style={{ y }} className="absolute inset-[-15%] w-[130%] h-[130%]">
        <Image src={src} alt={alt} fill className="object-cover" />
      </motion.div>
    </div>
  )
}

const TEAS = [
  { name: "Matcha Ceremonial", note: "Uji, Kyoto — Umami, Creamy, Vibrant", price: "€45", img: "https://images.unsplash.com/photo-1582793988951-9aed55099991?auto=format&fit=crop&q=80&w=1200" },
  { name: "Gyokuro Master", note: "Yame, Fukuoka — Sweet, Oceanic, Rich", price: "€65", img: "https://images.unsplash.com/photo-1563911191283-d48e0e7150ba?auto=format&fit=crop&q=80&w=1200" },
  { name: "Ancient Sencha", note: "Wazuka, Kyoto — Grassy, Nutty, Bright", price: "€35", img: "https://images.unsplash.com/photo-1544787210-229ef54582f3?auto=format&fit=crop&q=80&w=1200" },
]

export default function KyotoTeaPage() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", h)
    return () => window.removeEventListener("scroll", h)
  }, [])

  return (
    <div className="bg-[#f7f5f2] text-[#4a4a4a] font-sans min-h-screen selection:bg-[#e0e4d9] selection:text-[#4a4a4a] overflow-x-hidden">
      
      {/* ── WASHI OVERLAY ────────── */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.05] z-0" 
           style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/natural-paper.png')` }} />

      {/* ── NAVBAR ────────────────── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-1000 ${scrolled ? "bg-[#f7f5f2]/80 backdrop-blur-xl border-b border-black/5 py-4" : "bg-transparent py-10"}`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4 group">
            <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-[#e0e4d9] transition-all duration-700">
              <Leaf className="w-5 h-5 text-[#8b9d83]" />
            </div>
            <span className="text-xl font-light tracking-[0.3em] uppercase">Kyoto <span className="font-bold">Tea</span></span>
          </Link>
          <div className="hidden lg:flex gap-12 text-[10px] font-bold uppercase tracking-[0.4em] text-black/30">
            {["The Atelier", "Ceremony", "Origins", "Journal"].map(l => (
              <Link key={l} href="#" className="hover:text-black transition-colors">{l}</Link>
            ))}
          </div>
          <div className="flex items-center gap-8">
            <button className="hidden md:block text-[10px] font-bold uppercase tracking-widest text-black/40 hover:text-black transition-colors underline underline-offset-8 decoration-black/5">The Maison</button>
            <button className="px-10 py-4 bg-[#4a4a4a] text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded-full hover:bg-transparent hover:text-black border border-transparent hover:border-black/20 transition-all duration-700">Explore Tea</button>
            <Sheet>
              <SheetTrigger asChild><button className="lg:hidden p-2"><Menu className="w-6 h-6 text-black" /></button></SheetTrigger>
              <SheetContent side="right" className="bg-[#f7f5f2] border-none p-12 text-black">
                <div className="flex flex-col gap-10 mt-16 text-left">
                  {["Experience", "Collection", "Philosophy", "Shop"].map(l => (
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
             <Image src="https://images.unsplash.com/photo-1544787210-229ef54582f3?auto=format&fit=crop&q=80&w=2400" alt="Tea Ceremony" fill className="object-cover opacity-10 scale-105" priority />
             <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#f7f5f2]/20 to-[#f7f5f2]" />
          </div>

          <div className="relative z-10 max-w-[1200px] mx-auto px-6 text-center">
            <Reveal>
              <div className="flex items-center justify-center gap-6 mb-12 opacity-30">
                 <div className="w-12 h-[1px] bg-black" />
                 <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-black">Mindfulness In Every Steep</span>
                 <div className="w-12 h-[1px] bg-black" />
              </div>
            </Reveal>
            <Reveal delay={0.2} y={70}>
              <h1 className="text-7xl md:text-[11vw] font-light tracking-tighter leading-[0.8] text-[#1a1a1a] mb-12 uppercase italic" style={{ fontFamily: "serif" }}>
                Pure <br/> <span className="font-bold not-italic">Silence.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="flex flex-col items-center justify-center gap-12">
                <p className="text-2xl text-black/40 font-light max-w-xl leading-relaxed italic">
                  Sourcing the rarest ceremonial grade teas from the untouched hills of Uji. A ritual of absolute presence.
                </p>
                <div className="flex flex-wrap justify-center gap-10">
                  <button className="px-16 py-6 bg-[#4a4a4a] text-white font-bold uppercase tracking-widest text-[10px] rounded-full hover:px-20 transition-all duration-700">
                    Discover The Collection
                  </button>
                  <button className="px-16 py-6 border border-black/10 text-black/60 font-bold uppercase tracking-widest text-[10px] hover:bg-black/5 transition-all flex items-center gap-4 rounded-full">
                    <Play className="w-3 h-3 fill-current" /> The Tea Way
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
          
          <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end text-[9px] font-bold uppercase tracking-[0.4em] text-black/20 italic">
            <span>KYOTO / UJI / WAZUKA / YAME</span>
            <div className="flex gap-4">
               <Flower2 className="w-4 h-4" />
               <Wind className="w-4 h-4" />
            </div>
          </div>
        </section>

        {/* ── PHILOSOPHY ────────────── */}
        <section className="py-40 bg-white relative overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                <Reveal>
                   <div className="relative aspect-square p-2 bg-[#f7f5f2] border border-black/5 rounded-full group overflow-hidden">
                      <ParallaxImg src="https://images.unsplash.com/photo-1582793988951-9aed55099991?auto=format&fit=crop&q=80&w=1200" alt="Matcha Bowl" />
                      <div className="absolute inset-0 bg-[#8b9d83]/10 group-hover:bg-transparent transition-all duration-1000" />
                   </div>
                </Reveal>
                <div>
                   <Reveal>
                      <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#8b9d83] block mb-12 italic">The Way of Tea</span>
                      <h2 className="text-6xl md:text-8xl font-light uppercase tracking-tighter text-[#1a1a1a] leading-none mb-16 italic" style={{ fontFamily: "serif" }}>Savor <br/> <span className="not-italic font-bold opacity-10">Stillness.</span></h2>
                      <p className="text-2xl font-light text-black/40 leading-relaxed mb-20 italic">
                         We don't sell tea. We offer a pause. Every harvest is hand-selected and shade-grown to ensure the highest umami profile and ceremonial fidelity.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                         {[
                           { icon: Leaf, t: "ORIGIN FOCUS", d: "Sourced exclusively from family-run estates in Uji and Yame." },
                           { icon: Droplets, t: "COLD PRESS", d: "Cold-distilled and shade-dried to preserve absolute nutrient density." }
                         ].map((p, i) => (
                           <div key={i} className="group">
                              <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center mb-6 group-hover:bg-[#e0e4d9] transition-all">
                                 <p.icon className="w-5 h-5 opacity-40 group-hover:opacity-100" />
                              </div>
                              <h4 className="text-xs font-black uppercase tracking-widest mb-4 text-[#1a1a1a] italic">{p.t}</h4>
                              <p className="text-sm font-light leading-relaxed text-black/30 italic">{p.d}</p>
                           </div>
                         ))}
                      </div>
                   </Reveal>
                </div>
             </div>
          </div>
        </section>

        {/* ── COLLECTION ─────────────── */}
        <section className="py-60 bg-[#f7f5f2]">
           <div className="max-w-[1400px] mx-auto px-6 md:px-12">
              <Reveal>
                 <div className="flex flex-col md:flex-row items-end justify-between mb-32 gap-8 border-b border-black/5 pb-16">
                    <div className="max-w-2xl">
                       <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#8b9d83] block mb-6">Seasonal Harvest</span>
                       <h2 className="text-7xl md:text-[9vw] font-black uppercase tracking-tighter text-[#1a1a1a] leading-none italic" style={{ fontFamily: "serif" }}>The <span className="font-light not-italic opacity-10 text-black">Garden.</span></h2>
                    </div>
                    <Link href="#" className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest hover:text-black text-black/40 transition-colors group italic">
                       View All Teas <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </Link>
                 </div>
              </Reveal>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                 {TEAS.map((item, i) => (
                   <Reveal key={i} delay={i * 0.15}>
                      <div className="group cursor-pointer">
                         <div className="aspect-[3/4] relative mb-12 overflow-hidden rounded-[3rem] border border-black/5 p-10 bg-white">
                            <Image src={item.img} alt={item.name} fill className="object-cover scale-110 group-hover:scale-100 transition-all duration-[3000ms]" />
                            <div className="absolute inset-0 bg-[#8b9d83]/5 group-hover:bg-transparent transition-all duration-1000" />
                            <div className="absolute top-10 right-10">
                               <div className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center border border-black/5 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 shadow-sm">
                                  <ShoppingBag className="w-5 h-5 text-[#4a4a4a]" />
                               </div>
                            </div>
                            <div className="absolute bottom-12 left-12 right-12">
                               <div className="text-[10px] font-bold uppercase tracking-widest text-[#8b9d83] mb-3 italic">Uji Series</div>
                               <h3 className="text-4xl font-bold uppercase tracking-widest text-[#1a1a1a] leading-tight mb-2" style={{ fontFamily: "serif" }}>{item.name}</h3>
                               <p className="text-[10px] font-bold text-black/30 tracking-widest uppercase italic">{item.note}</p>
                            </div>
                         </div>
                         <div className="flex justify-between items-center px-6">
                            <button className="text-[10px] font-bold uppercase tracking-widest text-black/20 hover:text-black transition-colors underline underline-offset-4">Add to Ceremony</button>
                            <span className="text-2xl font-bold text-[#1a1a1a] tracking-tighter italic">{item.price}</span>
                         </div>
                      </div>
                   </Reveal>
                 ))}
              </div>
           </div>
        </section>

        {/* ── CTA ───────────────────── */}
        <section className="py-60 bg-[#4a4a4a] text-white text-center px-6 relative overflow-hidden">
           <div className="absolute inset-0 opacity-[0.05] pointer-events-none flex items-center justify-center">
              <Leaf className="w-[800px] h-[800px]" />
           </div>
           <div className="max-w-4xl mx-auto relative z-10">
              <Reveal>
                 <div className="w-16 h-16 border border-[#8b9d83]/40 rounded-full mx-auto mb-20 flex items-center justify-center text-[#8b9d83] italic font-bold">K</div>
                 <h2 className="text-8xl md:text-[14vw] font-light uppercase tracking-tighter leading-[0.8] mb-16 italic" style={{ fontFamily: "serif" }}>
                    Find The <br/> <span className="font-bold not-italic opacity-10 text-white">Quiet.</span>
                 </h2>
                 <p className="text-2xl text-white/40 font-light mb-20 leading-relaxed italic max-w-2xl mx-auto">
                    Limited edition harvest releases. Experience the evolution of the garden with our seasonal subscription.
                 </p>
                 <div className="flex flex-col sm:flex-row items-center justify-center gap-12">
                    <button className="px-20 py-10 bg-white text-[#4a4a4a] font-bold uppercase text-[10px] tracking-[0.3em] rounded-full hover:px-24 transition-all duration-700 italic shadow-2xl">
                       Join The Garden
                    </button>
                    <button className="px-20 py-10 border border-white/10 text-white/40 font-bold uppercase text-[10px] tracking-[0.3em] rounded-full hover:bg-white/5 transition-all duration-700 italic">
                       The Brewing Way
                    </button>
                 </div>
              </Reveal>
           </div>
        </section>
      </main>

      {/* ── FOOTER ────────────────── */}
      <footer className="bg-[#f7f5f2] pt-40 pb-12 px-6 border-t border-black/5">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-5 gap-20 mb-40">
           <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-4 mb-10 group">
                <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-[#8b9d83]" />
                </div>
                <span className="text-xl font-light tracking-[0.3em] uppercase text-black">Kyoto Tea</span>
              </Link>
              <p className="text-black/30 max-w-sm leading-relaxed mb-12 text-sm font-light italic" style={{ fontFamily: "serif" }}>
                 "In a cup of tea, we find the entire universe. Hand-picked with absolute presence in Kyoto."
              </p>
              <div className="flex gap-10">
                 {["Instagram", "Journal", "Kyoto Hub", "Atelier"].map(s => (
                   <Link key={s} href="#" className="text-[10px] font-bold uppercase tracking-widest text-black/30 hover:text-black transition-colors italic">{s}</Link>
                 ))}
              </div>
           </div>
           
           {[
             { t: "TEA SERIES", l: ["Ceremonial Matcha", "Ancient Sencha", "Gyokuro Master", "Hojicha Dark"] },
             { t: "ATELIER", l: ["The Ceremony", "Uji Garden", "Our Sourcing", "Brewing Guide"] },
             { t: "SERVICE", l: ["Subscription", "Shipping", "Contact", "Legal"] }
           ].map((col, i) => (
             <div key={i} className="space-y-12">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.6em] text-black/20">{col.t}</h4>
                <ul className="space-y-6">
                   {col.l.map(link => (
                     <li key={link} className="text-xs font-bold uppercase tracking-widest text-black/30 hover:text-black transition-colors italic">
                        <Link href="#">{link}</Link>
                     </li>
                   ))}
                </ul>
             </div>
           ))}
        </div>
        <div className="max-w-[1400px] mx-auto flex flex-col md:row justify-between items-center gap-8 border-t border-black/5 pt-12 text-[10px] font-bold uppercase tracking-[0.4em] text-black/10 italic">
           <span>© 2026 KYOTO TEA ATELIER AG. THE GARDEN IS ETERNAL.</span>
           <div className="flex gap-12">
              <Link href="#" className="hover:text-black transition-all">KYOTO</Link>
              <Link href="#" className="hover:text-black transition-all">TOKYO</Link>
              <Link href="#" className="hover:text-black transition-all">NEW YORK</Link>
           </div>
        </div>
      </footer>
    </div>
  )
}
