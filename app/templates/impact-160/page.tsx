"use client"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Sparkles, ArrowRight, Menu, Star, Flower2, Wind, Heart, Droplets, ChevronRight, Play, ShoppingBag } from "lucide-react"
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
    <div ref={ref} className="relative w-full h-full overflow-hidden rounded-full">
      <motion.div style={{ y }} className="absolute inset-[-15%] w-[130%] h-[130%]">
        <Image src={src} alt={alt} fill className="object-cover" />
      </motion.div>
    </div>
  )
}

const SCENTS = [
  { name: "Oud Horizon", note: "Top: Saffron, Heart: Oud, Base: Leather", price: "€280", img: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=1200" },
  { name: "Rose Silk", note: "Top: Bergamot, Heart: Rose, Base: Musk", price: "€240", img: "https://images.unsplash.com/photo-1547637589-f54c34f5d7a4?auto=format&fit=crop&q=80&w=1200" },
  { name: "Sandalwood Void", note: "Top: Cardamom, Heart: Sandalwood, Base: Amber", price: "€310", img: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=1200" },
]

export default function AuraScentPage() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", h)
    return () => window.removeEventListener("scroll", h)
  }, [])

  return (
    <div className="bg-[#fcf8f5] text-[#4a4540] font-sans min-h-screen selection:bg-[#e6dbd1] selection:text-[#4a4540] overflow-x-hidden">
      
      {/* ── NAVBAR ────────────────── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-1000 ${scrolled ? "bg-white/70 backdrop-blur-2xl border-b border-[#e6dbd1]/30 py-4" : "bg-transparent py-10"}`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4 group">
            <div className="w-10 h-10 rounded-full border border-[#d4af37]/20 flex items-center justify-center group-hover:bg-[#fcf8f5] transition-all duration-700">
              <Wind className="w-5 h-5 text-[#d4af37]" />
            </div>
            <span className="text-xl font-light tracking-[0.4em] uppercase text-[#4a4540]">Aura <span className="font-bold">Scent</span></span>
          </Link>
          <div className="hidden lg:flex gap-12 text-[10px] font-bold uppercase tracking-[0.5em] text-[#4a4540]/30">
            {["The Distillery", "Essences", "Heritage", "Art"].map(l => (
              <Link key={l} href="#" className="hover:text-[#d4af37] transition-colors">{l}</Link>
            ))}
          </div>
          <div className="flex items-center gap-8">
            <button className="hidden md:block text-[10px] font-bold uppercase tracking-widest text-[#4a4540]/30 hover:text-[#d4af37] transition-colors underline underline-offset-8 decoration-[#d4af37]/20">The Maison</button>
            <button className="px-10 py-4 bg-[#4a4540] text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded-full hover:bg-white hover:text-[#4a4540] border border-transparent hover:border-[#4a4540]/20 transition-all duration-700">Explore Scent</button>
            <Sheet>
              <SheetTrigger asChild><button className="lg:hidden p-2"><Menu className="w-6 h-6 text-[#4a4540]" /></button></SheetTrigger>
              <SheetContent side="right" className="bg-[#fcf8f5] border-none p-12 text-[#4a4540]">
                <div className="flex flex-col gap-10 mt-16 text-left">
                  {["Collection", "Atelier", "Philosophy", "Shop"].map(l => (
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
             <Image src="https://images.unsplash.com/photo-1616949111833-2894b910e304?auto=format&fit=crop&q=80&w=2400" alt="Perfume Mist" fill className="object-cover opacity-10 scale-105" priority />
             <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fcf8f5]/20 to-[#fcf8f5]" />
          </div>

          <div className="relative z-10 max-w-[1200px] mx-auto px-6 text-center">
            <Reveal>
              <div className="flex items-center justify-center gap-8 mb-16 opacity-30">
                 <div className="w-16 h-[1px] bg-[#d4af37]" />
                 <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-[#4a4540]">Distilled Invisible Beauty</span>
                 <div className="w-16 h-[1px] bg-[#d4af37]" />
              </div>
            </Reveal>
            <Reveal delay={0.2} y={70}>
              <h1 className="text-7xl md:text-[12rem] font-light tracking-tighter leading-[0.8] text-[#4a4540] mb-16 uppercase italic" style={{ fontFamily: "serif" }}>
                Silent <br/> <span className="font-bold not-italic">Memory.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="flex flex-col items-center justify-center gap-16">
                <p className="text-2xl text-[#4a4540]/40 font-light max-w-2xl leading-relaxed italic">
                  Capturing the ephemeral through the world's most rare and uncompromised natural essences.
                </p>
                <div className="flex flex-wrap justify-center gap-12">
                  <button className="px-16 py-6 bg-[#4a4540] text-white font-bold uppercase tracking-widest text-[10px] rounded-full hover:px-20 transition-all duration-700 shadow-xl shadow-[#4a4540]/10">
                    Discover Collection
                  </button>
                  <button className="px-16 py-6 border border-[#4a4540]/10 text-[#4a4540]/40 font-bold uppercase tracking-widest text-[10px] hover:text-[#4a4540] transition-all flex items-center gap-4 rounded-full">
                    <Droplets className="w-4 h-4 text-[#d4af37]" /> The Alchemy
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
          
          <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end text-[9px] font-bold uppercase tracking-[0.4em] text-[#4a4540]/20 italic">
            <span>GRASSE / PARIS / KYOTO / MUSCAT</span>
            <div className="flex gap-6">
               <Sparkles className="w-4 h-4" />
               <span>SINCE 1922</span>
            </div>
          </div>
        </section>

        {/* ── THE ALCHEMY ────────────── */}
        <section className="py-60 bg-white relative overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                <Reveal>
                   <div className="relative aspect-square p-2 bg-[#fcf8f5] border border-[#e6dbd1]/40 rounded-full group overflow-hidden">
                      <ParallaxImg src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=1200" alt="Ingredients" />
                      <div className="absolute inset-0 bg-[#4a4540]/10 group-hover:bg-transparent transition-all duration-1000" />
                   </div>
                </Reveal>
                <div>
                   <Reveal>
                      <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#d4af37] block mb-12 italic">The Composition</span>
                      <h2 className="text-6xl md:text-8xl font-light uppercase tracking-tighter text-[#4a4540] leading-none mb-16 italic" style={{ fontFamily: "serif" }}>Absolute <br/> <span className="not-italic font-bold opacity-10">Essence.</span></h2>
                      <p className="text-2xl font-light text-[#4a4540]/40 leading-relaxed mb-20 italic">
                         We don't create perfumes. We distill emotions. Every bottle is a culmination of a six-month maceration process using hand-picked petals and cold-pressed oils.
                      </p>
                      <div className="space-y-16">
                         {[
                           { t: "TOP NOTES", d: "A momentary embrace of citrus and light florals that opens the senses." },
                           { t: "HEART NOTES", d: "The soul of the fragrance, evolving over hours into a complex floral heart." },
                           { t: "BASE NOTES", d: "A lingering shadow of wood and amber that remains for days on the skin." }
                         ].map((note, i) => (
                           <div key={i} className="group border-b border-[#e6dbd1]/40 pb-8 flex justify-between items-end cursor-pointer">
                              <div className="max-w-md">
                                 <h4 className="text-xs font-black uppercase tracking-widest mb-4 text-[#4a4540] italic group-hover:text-[#d4af37] transition-colors">{note.t}</h4>
                                 <p className="text-sm font-light leading-relaxed text-[#4a4540]/30 italic">{note.d}</p>
                              </div>
                              <ArrowRight className="w-5 h-5 text-[#4a4540]/20 group-hover:translate-x-2 transition-transform" />
                           </div>
                         ))}
                      </div>
                   </Reveal>
                </div>
             </div>
          </div>
        </section>

        {/* ── COLLECTION ─────────────── */}
        <section className="py-60 bg-[#fcf8f5]">
           <div className="max-w-[1400px] mx-auto px-6 md:px-12">
              <Reveal>
                 <div className="flex flex-col md:flex-row items-end justify-between mb-32 gap-8 border-b border-[#e6dbd1]/60 pb-16">
                    <div className="max-w-2xl">
                       <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#d4af37] block mb-6">Seasonal Curation</span>
                       <h2 className="text-7xl md:text-9xl font-black uppercase tracking-tighter text-[#4a4540] leading-none italic" style={{ fontFamily: "serif" }}>The <span className="font-light not-italic opacity-10 text-[#4a4540]">Registry.</span></h2>
                    </div>
                    <Link href="#" className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest hover:text-[#d4af37] text-[#4a4540]/30 transition-colors group italic">
                       View All Essences <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </Link>
                 </div>
              </Reveal>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                 {SCENTS.map((item, i) => (
                   <Reveal key={i} delay={i * 0.15}>
                      <div className="group cursor-pointer">
                         <div className="aspect-[3/4] relative mb-12 overflow-hidden rounded-[4rem] border border-[#e6dbd1]/40 p-10 bg-white">
                            <Image src={item.img} alt={item.name} fill className="object-cover scale-110 group-hover:scale-100 transition-all duration-[3000ms]" />
                            <div className="absolute inset-0 bg-[#4a4540]/5 group-hover:bg-transparent transition-all duration-1000" />
                            <div className="absolute top-10 right-10">
                               <div className="w-12 h-12 rounded-full bg-[#fcf8f5]/80 backdrop-blur-md flex items-center justify-center border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                                  <ShoppingBag className="w-5 h-5 text-[#4a4540]" />
                               </div>
                            </div>
                            <div className="absolute bottom-12 left-12 right-12">
                               <div className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37] mb-3 italic">Eau de Parfum</div>
                               <h3 className="text-4xl font-bold uppercase tracking-widest text-[#4a4540] leading-tight mb-2" style={{ fontFamily: "serif" }}>{item.name}</h3>
                               <p className="text-[10px] font-bold text-[#4a4540]/30 tracking-widest uppercase italic">{item.note}</p>
                            </div>
                         </div>
                         <div className="flex justify-between items-center px-6">
                            <button className="text-[10px] font-bold uppercase tracking-widest text-[#4a4540]/30 hover:text-[#4a4540] transition-colors underline underline-offset-4">Add to Collection</button>
                            <span className="text-2xl font-bold text-[#4a4540] tracking-tighter italic">{item.price}</span>
                         </div>
                      </div>
                   </Reveal>
                 ))}
              </div>
           </div>
        </section>

        {/* ── CTA ───────────────────── */}
        <section className="py-60 bg-[#4a4540] text-white text-center px-6 relative overflow-hidden">
           <div className="absolute inset-0 opacity-[0.05] pointer-events-none flex items-center justify-center">
              <Wind className="w-[800px] h-[800px]" />
           </div>
           <div className="max-w-4xl mx-auto relative z-10">
              <Reveal>
                 <div className="w-16 h-16 border border-[#d4af37]/40 rounded-full mx-auto mb-20 flex items-center justify-center text-[#d4af37] italic font-bold">A</div>
                 <h2 className="text-8xl md:text-[14vw] font-light uppercase tracking-tighter leading-[0.8] mb-16 italic" style={{ fontFamily: "serif" }}>
                    Hold The <br/> <span className="font-bold not-italic opacity-10 text-white">Ethereal.</span>
                 </h2>
                 <p className="text-2xl text-white/40 font-light mb-20 leading-relaxed italic max-w-2xl mx-auto">
                    We accept a limited number of bespoke commissions for private distillations. Crafted in Grasse, aged to perfection.
                 </p>
                 <div className="flex flex-col sm:flex-row items-center justify-center gap-12">
                    <button className="px-20 py-10 bg-white text-[#4a4540] font-bold uppercase text-[10px] tracking-[0.3em] rounded-full hover:bg-[#d4af37] hover:text-black transition-all duration-700 italic shadow-2xl">
                       Start Distillation
                    </button>
                    <button className="px-20 py-10 border border-white/10 text-white/40 font-bold uppercase text-[10px] tracking-[0.3em] rounded-full hover:bg-white/5 transition-all duration-700 italic">
                       View Samples
                    </button>
                 </div>
              </Reveal>
           </div>
        </section>
      </main>

      {/* ── FOOTER ────────────────── */}
      <footer className="bg-[#fcf8f5] pt-40 pb-12 px-6 border-t border-[#e6dbd1]/60">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-5 gap-20 mb-40">
           <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-4 mb-10 group">
                <div className="w-10 h-10 rounded-full border border-[#d4af37]/30 flex items-center justify-center">
                  <Wind className="w-5 h-5 text-[#d4af37]" />
                </div>
                <span className="text-xl font-light tracking-[0.4em] uppercase text-[#4a4540]">Aura Scent</span>
              </Link>
              <p className="text-[#4a4540]/30 max-w-sm leading-relaxed mb-12 text-sm font-light italic" style={{ fontFamily: "serif" }}>
                 "The fragrance of a memory is the only map that leads back to the soul. Mastered in Grasse since 1922."
              </p>
              <div className="flex gap-10">
                 {["Instagram", "Vogue", "Journal", "Atelier"].map(s => (
                   <Link key={s} href="#" className="text-[10px] font-bold uppercase tracking-widest text-[#4a4540]/30 hover:text-[#d4af37] transition-colors italic">{s}</Link>
                 ))}
              </div>
           </div>
           
           {[
             { t: "FRAGRANCE", l: ["The Originals", "Seasonal Lab", "Bespoke Scent", "Samples"] },
             { t: "MAISON", l: ["The Distillery", "Our Heritage", "Grasse Labs", "Journal"] },
             { t: "SERVICE", l: ["Account", "Shipping", "Contact", "Legal"] }
           ].map((col, i) => (
             <div key={i} className="space-y-12">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.6em] text-[#4a4540]/20">{col.t}</h4>
                <ul className="space-y-6">
                   {col.l.map(link => (
                     <li key={link} className="text-xs font-bold uppercase tracking-widest text-[#4a4540]/30 hover:text-[#4a4540] transition-colors italic">
                        <Link href="#">{link}</Link>
                     </li>
                   ))}
                </ul>
             </div>
           ))}
        </div>
        <div className="max-w-[1400px] mx-auto flex flex-col md:row justify-between items-center gap-8 border-t border-[#e6dbd1]/60 pt-12 text-[10px] font-bold uppercase tracking-[0.4em] text-[#4a4540]/10 italic">
           <span>© 2026 AURA SCENT MAISON DE PARFUM. ALL MEMORIES ARE DISTILLED.</span>
           <div className="flex gap-12">
              <Link href="#" className="hover:text-[#d4af37] transition-all">GRASSE</Link>
              <Link href="#" className="hover:text-[#d4af37] transition-all">PARIS</Link>
              <Link href="#" className="hover:text-[#d4af37] transition-all">TOKYO</Link>
           </div>
        </div>
      </footer>
    </div>
  )
}
