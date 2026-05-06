"use client"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Leaf, TreePine, Ruler, ArrowRight, Award, Recycle, Sun, Wind, Menu, ChevronRight, MapPin, Phone, Mail, Eye } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

function Reveal({ children, delay = 0, y = 40 }: { children: React.ReactNode; delay?: number; y?: number }) {
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
    <div ref={ref} className="relative w-full h-full overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-[-12%] w-[124%] h-[124%]">
        <Image src={src} alt={alt} fill className="object-cover" />
      </motion.div>
    </div>
  )
}

const PROJECTS = [
  { name: "Canopy House", loc: "Kyoto, Japan", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200", type: "Residential", year: "2024", award: "RIBA Gold" },
  { name: "The Living Wall", loc: "Copenhagen, DK", img: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=1200", type: "Commercial", year: "2023", award: "Pritzker Nominee" },
  { name: "Zero Pavilion", loc: "Milan, Italy", img: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=80&w=1200", type: "Cultural", year: "2024", award: "Net Zero Cert." },
  { name: "Biome Tower", loc: "Singapore", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1200", type: "Mixed Use", year: "2025", award: "Green Star 6" },
]

const SERVICES = [
  { icon: TreePine, title: "Biophilic Design", desc: "Architecture that breathes. Living walls, natural ventilation, and circadian lighting woven into every structure." },
  { icon: Sun, title: "Net-Zero Engineering", desc: "From passive solar orientation to on-site renewables — we engineer buildings that generate more energy than they consume." },
  { icon: Recycle, title: "Material Audit", desc: "Full lifecycle carbon analysis of every material. We source reclaimed timber, recycite concrete, and bio-based insulation." },
  { icon: Wind, title: "Climate Resilience", desc: "Flood-proofing, heat-island mitigation, and adaptive facades that respond to seasonal change autonomously." },
]

const STATS = [
  { value: "127", label: "Projects Completed", suffix: "" },
  { value: "94", label: "Carbon Reduction", suffix: "%" },
  { value: "38", label: "International Awards", suffix: "" },
  { value: "0", label: "Waste to Landfill", suffix: "kg" },
]

export default function BioFormArchPage() {
  const [scrolled, setScrolled] = useState(false)
  const heroRef = useRef(null)

  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.2], ["0%", "30%"])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", h)
    return () => window.removeEventListener("scroll", h)
  }, [])

  return (
    <div className="bg-[#f7f5f0] text-[#2a2a2a] font-sans min-h-screen selection:bg-[#3d6b4f] selection:text-white overflow-x-hidden">

      {/* ── NAVBAR ─────────────────────────────────────────────────── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled ? "bg-[#f7f5f0]/90 backdrop-blur-xl border-b border-[#3d6b4f]/10 py-4" : "bg-transparent py-8"}`}>
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full border-2 border-[#3d6b4f] flex items-center justify-center group-hover:bg-[#3d6b4f] transition-colors duration-500">
              <Leaf className="w-4 h-4 text-[#3d6b4f] group-hover:text-white transition-colors" />
            </div>
            <span className="text-xl font-light tracking-[0.2em] uppercase">Bio<span className="font-bold text-[#3d6b4f]">Form</span></span>
          </Link>
          <div className="hidden lg:flex gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-[#2a2a2a]/40">
            {["Projects", "Philosophy", "Services", "Journal", "Contact"].map((l) => (
              <Link key={l} href="#" className="hover:text-[#3d6b4f] transition-colors">{l}</Link>
            ))}
          </div>
          <div className="flex items-center gap-6">
            <button className="hidden md:block px-8 py-3 border border-[#3d6b4f] text-[#3d6b4f] text-[10px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-[#3d6b4f] hover:text-white transition-all duration-500">
              Start a Project
            </button>
            <Sheet>
              <SheetTrigger asChild>
                <button className="lg:hidden"><Menu className="w-6 h-6" /></button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#f7f5f0] p-12">
                <div className="flex flex-col gap-8 mt-16">
                  {["Projects", "Philosophy", "Services", "Contact"].map((l) => (
                    <Link key={l} href="#" className="text-3xl font-light uppercase tracking-widest hover:text-[#3d6b4f] transition-colors">{l}</Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      <main>
        {/* ── HERO ─────────────────────────────────────────────────── */}
        <section className="relative h-[110vh] min-h-[800px] flex items-end overflow-hidden" ref={heroRef}>
          <motion.div style={{ y: heroY }} className="absolute inset-0">
            <Image src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2400" alt="Bio Architecture" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[#f7f5f0] via-[#f7f5f0]/20 to-transparent" />
          </motion.div>

          <motion.div style={{ opacity: heroOpacity }} className="relative z-10 max-w-[1600px] w-full mx-auto px-6 md:px-12 pb-24">
            <Reveal y={60}>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-[1px] w-12 bg-[#3d6b4f]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#3d6b4f]">Sustainable Architecture Studio</span>
              </div>
            </Reveal>
            <Reveal delay={0.15} y={80}>
              <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-light tracking-tighter leading-[0.85] mb-8" style={{ fontFamily: "Georgia, serif" }}>
                Building<br/><em className="text-[#3d6b4f]">With</em> Nature.
              </h1>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="max-w-lg text-lg text-[#2a2a2a]/60 font-light leading-relaxed">
                Award-winning regenerative architecture that harmonizes structure with ecosystem. Carbon-negative by design.
              </p>
            </Reveal>
          </motion.div>
        </section>

        {/* ── STATS ────────────────────────────────────────────────── */}
        <section className="py-24 bg-[#3d6b4f] text-white">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-12">
            {STATS.map((s, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="text-center">
                  <div className="text-5xl md:text-6xl font-light mb-2">{s.value}<span className="text-white/60 text-2xl">{s.suffix}</span></div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── PROJECTS ─────────────────────────────────────────────── */}
        <section className="py-32 bg-[#f7f5f0]">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12">
            <Reveal>
              <div className="flex justify-between items-end mb-20">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#3d6b4f] block mb-4">Selected Works</span>
                  <h2 className="text-5xl md:text-7xl font-light tracking-tighter" style={{ fontFamily: "Georgia, serif" }}>
                    Living <em className="text-[#3d6b4f]">Structures.</em>
                  </h2>
                </div>
                <Link href="#" className="hidden md:flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#3d6b4f] border-b border-[#3d6b4f] pb-1">
                  View All <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {PROJECTS.map((p, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="group cursor-pointer">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-sm mb-6">
                      <ParallaxImg src={p.img} alt={p.name} />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-700" />
                      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                          <Eye className="w-5 h-5 text-[#2a2a2a]" />
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="flex gap-4 text-[10px] font-bold uppercase tracking-widest text-white/80">
                          <span>{p.type}</span>
                          <span>·</span>
                          <span>{p.year}</span>
                          <span>·</span>
                          <span className="text-[#a8d5ba]">{p.award}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <div>
                        <h3 className="text-2xl md:text-3xl font-light tracking-tight group-hover:text-[#3d6b4f] transition-colors" style={{ fontFamily: "Georgia, serif" }}>{p.name}</h3>
                        <div className="flex items-center gap-2 mt-1 text-sm text-[#2a2a2a]/40">
                          <MapPin className="w-3 h-3" />{p.loc}
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-[#3d6b4f] opacity-0 group-hover:opacity-100 translate-x-[-8px] group-hover:translate-x-0 transition-all duration-500" />
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── PHILOSOPHY SPLIT ─────────────────────────────────────── */}
        <section className="py-32 bg-white">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <Reveal>
              <div className="aspect-[3/4] relative overflow-hidden rounded-t-full">
                <ParallaxImg src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=80&w=1200" alt="Philosophy" />
              </div>
            </Reveal>
            <div>
              <Reveal delay={0.15}>
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#3d6b4f] block mb-6">Our Philosophy</span>
                <h2 className="text-4xl md:text-6xl font-light tracking-tighter leading-tight mb-8" style={{ fontFamily: "Georgia, serif" }}>
                  Every building is a<br/><em className="text-[#3d6b4f]">living organism.</em>
                </h2>
                <p className="text-lg text-[#2a2a2a]/50 font-light leading-relaxed mb-12">
                  We reject the separation between architecture and nature. Our structures breathe, adapt, and regenerate — integrating with their ecosystem rather than displacing it. Carbon is not just offset; it is sequestered within the very walls we build.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { v: "100%", l: "Renewable Energy" },
                    { v: "85%", l: "Recycled Materials" },
                    { v: "40yr", l: "Avg. Lifecycle" },
                    { v: "B-Corp", l: "Certified" },
                  ].map((s, i) => (
                    <div key={i} className="border-l-2 border-[#3d6b4f]/20 pl-4">
                      <div className="text-2xl font-bold text-[#3d6b4f]">{s.v}</div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-[#2a2a2a]/40">{s.l}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── SERVICES ─────────────────────────────────────────────── */}
        <section className="py-32 bg-[#f7f5f0]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <Reveal>
              <div className="text-center mb-24">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#3d6b4f] block mb-4">Capabilities</span>
                <h2 className="text-5xl md:text-7xl font-light tracking-tighter" style={{ fontFamily: "Georgia, serif" }}>
                  Design <em className="text-[#3d6b4f]">Services.</em>
                </h2>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {SERVICES.map((s, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="group p-10 bg-white border border-[#3d6b4f]/10 rounded-sm hover:border-[#3d6b4f]/40 transition-colors duration-500 cursor-default">
                    <div className="w-14 h-14 rounded-full border border-[#3d6b4f]/20 flex items-center justify-center mb-6 group-hover:bg-[#3d6b4f] group-hover:border-[#3d6b4f] transition-all duration-500">
                      <s.icon className="w-6 h-6 text-[#3d6b4f] group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                    <p className="text-sm text-[#2a2a2a]/50 leading-relaxed">{s.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────── */}
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=2400" alt="CTA" fill className="object-cover" />
            <div className="absolute inset-0 bg-[#3d6b4f]/70" />
          </div>
          <div className="relative z-10 text-center text-white px-6">
            <Reveal>
              <h2 className="text-5xl md:text-8xl font-light tracking-tighter mb-8" style={{ fontFamily: "Georgia, serif" }}>
                Let's Build<br/><em>Together.</em>
              </h2>
              <p className="text-lg text-white/70 font-light max-w-md mx-auto mb-12">
                Every great building starts with a conversation about the world you want to live in.
              </p>
              <button className="px-12 py-5 bg-white text-[#3d6b4f] text-[10px] font-bold uppercase tracking-[0.3em] rounded-full hover:bg-[#2a2a2a] hover:text-white transition-all duration-500">
                Schedule a Consultation
              </button>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ── FOOTER ─────────────────────────────────────────────────── */}
      <footer className="bg-[#2a2a2a] text-white pt-24 pb-12 px-6">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Leaf className="w-5 h-5 text-[#a8d5ba]" />
              <span className="text-xl font-light tracking-[0.2em] uppercase">Bio<span className="font-bold text-[#a8d5ba]">Form</span></span>
            </div>
            <p className="text-sm text-white/40 max-w-sm leading-relaxed mb-8">
              Award-winning sustainable architecture studio based in Copenhagen, with projects spanning four continents.
            </p>
            <div className="space-y-2 text-[10px] font-bold uppercase tracking-widest text-white/30">
              <div className="flex items-center gap-2"><MapPin className="w-3 h-3" /> Nørrebrogade 42, Copenhagen</div>
              <div className="flex items-center gap-2"><Phone className="w-3 h-3" /> +45 32 14 78 90</div>
              <div className="flex items-center gap-2"><Mail className="w-3 h-3" /> studio@bioform.arch</div>
            </div>
          </div>
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#a8d5ba] mb-8">Studio</h4>
            <ul className="space-y-4 text-xs uppercase tracking-widest text-white/40">
              {["Projects", "Philosophy", "Team", "Journal", "Careers"].map(l => (
                <li key={l}><Link href="#" className="hover:text-white transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#a8d5ba] mb-8">Services</h4>
            <ul className="space-y-4 text-xs uppercase tracking-widest text-white/40">
              {["Biophilic Design", "Net-Zero Eng.", "Material Audit", "Masterplanning"].map(l => (
                <li key={l}><Link href="#" className="hover:text-white transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="max-w-[1600px] mx-auto pt-8 border-t border-white/10 text-[10px] font-bold uppercase tracking-[0.3em] text-white/20 flex justify-between">
          <span>© 2026 BIOFORM ARCHITECTURE.</span>
          <span>CARBON-NEGATIVE BY DESIGN.</span>
        </div>
      </footer>
    </div>
  )
}