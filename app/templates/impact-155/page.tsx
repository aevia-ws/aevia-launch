"use client"
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Palette, Eye, ArrowRight, Heart, Share2, Menu, Filter, Grid, Columns, ChevronRight, Star, Download, Maximize2 } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

function Reveal({ children, delay = 0, y = 40 }: { children: React.ReactNode; delay?: number; y?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y }} animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  )
}

const ARTWORKS = [
  { title: "Neural Bloom", artist: "Yuki Tanaka", img: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=800", medium: "AI Generated", price: "2.4 ETH", likes: 847 },
  { title: "Chromatic Drift", artist: "Alex Rivera", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800", medium: "Generative", price: "1.8 ETH", likes: 623 },
  { title: "Void Architecture", artist: "Mira Volkov", img: "https://images.unsplash.com/photo-1633186710895-309db2eca9e4?auto=format&fit=crop&q=80&w=800", medium: "3D Render", price: "5.2 ETH", likes: 1204 },
  { title: "Data Sonata", artist: "Chen Wei", img: "https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?auto=format&fit=crop&q=80&w=800", medium: "Data Art", price: "3.1 ETH", likes: 956 },
  { title: "Pixel Cathedral", artist: "Sofia Martens", img: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80&w=800", medium: "Pixel Art", price: "0.8 ETH", likes: 412 },
  { title: "Entropy Garden", artist: "Kai Müller", img: "https://images.unsplash.com/photo-1604076913837-52ab5f7c2ba8?auto=format&fit=crop&q=80&w=800", medium: "Procedural", price: "4.7 ETH", likes: 1089 },
]

const CATEGORIES = ["All", "AI Generated", "Generative", "3D Render", "Data Art", "Pixel Art", "Procedural"]

const FEATURED_ARTISTS = [
  { name: "Yuki Tanaka", works: 47, followers: "12.4K", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200" },
  { name: "Mira Volkov", works: 32, followers: "8.9K", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200" },
  { name: "Chen Wei", works: 61, followers: "15.2K", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200" },
]

export default function ArtIndexPage() {
  const [scrolled, setScrolled] = useState(false)
  const [activeFilter, setActiveFilter] = useState("All")
  const [hoveredArt, setHoveredArt] = useState<number | null>(null)

  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0])

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", h)
    return () => window.removeEventListener("scroll", h)
  }, [])

  const filteredArt = activeFilter === "All" ? ARTWORKS : ARTWORKS.filter(a => a.medium === activeFilter)

  return (
    <div className="bg-[#0a0a0f] text-white font-sans min-h-screen selection:bg-fuchsia-500 selection:text-white overflow-x-hidden">

      {/* ── NAVBAR ───────────────────────────────────────── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled ? "bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-fuchsia-500/10 py-4" : "bg-transparent py-8"}`}>
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center">
              <Palette className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black tracking-tight">ART<span className="text-fuchsia-400">INDEX</span></span>
          </Link>
          <div className="hidden lg:flex gap-10 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
            {["Explore", "Artists", "Collections", "About"].map(l => (
              <Link key={l} href="#" className="hover:text-fuchsia-400 transition-colors">{l}</Link>
            ))}
          </div>
          <div className="flex items-center gap-6">
            <button className="hidden md:block px-8 py-3 bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full hover:opacity-90 transition-opacity">
              Submit Work
            </button>
            <Sheet>
              <SheetTrigger asChild><button className="lg:hidden"><Menu className="w-6 h-6 text-white" /></button></SheetTrigger>
              <SheetContent side="right" className="bg-[#0a0a0f] border-fuchsia-500/10 p-12">
                <div className="flex flex-col gap-8 mt-16">
                  {["Explore", "Artists", "Collections", "Submit"].map(l => (
                    <Link key={l} href="#" className="text-3xl font-light uppercase tracking-widest hover:text-fuchsia-400 transition-colors">{l}</Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      <main>
        {/* ── HERO ───────────────────────────────────────── */}
        <section className="relative min-h-[80vh] flex items-center pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-fuchsia-500/10 blur-[200px] rounded-full" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/10 blur-[200px] rounded-full" />
          </div>

          <motion.div style={{ opacity: heroOpacity }} className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 w-full text-center">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-fuchsia-500/20 bg-fuchsia-500/10 text-fuchsia-400 text-[10px] font-bold uppercase tracking-widest mb-8">
                <Star className="w-3 h-3 fill-current" /> Curated Digital Art Platform
              </div>
            </Reveal>
            <Reveal delay={0.1} y={60}>
              <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-black tracking-tighter leading-[0.85] mb-8">
                Where Art<br/>Meets <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-purple-300 to-fuchsia-500">Code.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-xl text-white/40 font-light max-w-lg mx-auto leading-relaxed mb-10">
                Discover, collect, and exhibit the finest generative and AI-driven artworks from creators worldwide.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <button className="px-12 py-5 bg-white text-black font-bold rounded-full hover:bg-fuchsia-500 hover:text-white transition-all duration-500">
                Explore the Gallery
              </button>
            </Reveal>
          </motion.div>
        </section>

        {/* ── GALLERY WITH FILTERS ───────────────────────── */}
        <section className="py-20 bg-[#0a0a0f]">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12">
            <Reveal>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Featured <span className="text-fuchsia-400">Works</span></h2>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveFilter(cat)}
                      className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-full transition-all ${activeFilter === cat ? "bg-fuchsia-500 text-white" : "bg-white/5 text-white/40 hover:bg-white/10"}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>

            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredArt.map((art, i) => (
                  <motion.div
                    key={art.title}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                  >
                    <div
                      className="group relative cursor-pointer"
                      onMouseEnter={() => setHoveredArt(i)}
                      onMouseLeave={() => setHoveredArt(null)}
                    >
                      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                        <Image src={art.img} alt={art.title} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        {/* Hover overlay */}
                        <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="flex justify-between items-end">
                            <div>
                              <div className="text-[10px] font-bold uppercase tracking-widest text-fuchsia-300 mb-1">{art.medium}</div>
                              <h3 className="text-2xl font-bold mb-1">{art.title}</h3>
                              <div className="text-sm text-white/60">by {art.artist}</div>
                            </div>
                            <div className="flex gap-2">
                              <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors">
                                <Heart className="w-4 h-4" />
                              </button>
                              <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors">
                                <Maximize2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-fuchsia-400">{art.price}</span>
                          <span className="flex items-center gap-1 text-xs text-white/30">
                            <Heart className="w-3 h-3" /> {art.likes}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* ── FEATURED ARTISTS ───────────────────────────── */}
        <section className="py-32 bg-[#0d0d15]">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12">
            <Reveal>
              <div className="text-center mb-20">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-fuchsia-400 block mb-4">Spotlight</span>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter">Featured <span className="text-fuchsia-400">Artists</span></h2>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {FEATURED_ARTISTS.map((a, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="group text-center p-8 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-fuchsia-500/30 transition-all duration-500 cursor-pointer">
                    <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-6 relative border-2 border-fuchsia-500/30 group-hover:border-fuchsia-500 transition-colors">
                      <Image src={a.img} alt={a.name} fill className="object-cover" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{a.name}</h3>
                    <div className="flex justify-center gap-6 text-[10px] font-bold uppercase tracking-widest text-white/30">
                      <span>{a.works} works</span>
                      <span>{a.followers} followers</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ────────────────────────────────────────── */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600/20 via-transparent to-purple-600/10" />
          <div className="relative z-10 max-w-[800px] mx-auto px-6 text-center">
            <Reveal>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
                Create.<br/><span className="text-fuchsia-400">Exhibit. Collect.</span>
              </h2>
              <p className="text-lg text-white/40 font-light max-w-md mx-auto mb-10">
                Join a curated community of 2,000+ digital artists pushing the boundaries of computational creativity.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-12 py-5 bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white font-bold rounded-full hover:opacity-90 transition-opacity">
                  Join as Artist
                </button>
                <button className="px-12 py-5 border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-all">
                  Start Collecting
                </button>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <footer className="bg-[#050508] pt-24 pb-12 px-6">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center">
                <Palette className="w-4 h-4 text-white" />
              </div>
              <span className="font-black tracking-tight">ART<span className="text-fuchsia-400">INDEX</span></span>
            </div>
            <p className="text-sm text-white/30 leading-relaxed">The premier platform for curated digital and generative art.</p>
          </div>
          {[
            { title: "Platform", links: ["Explore", "Collections", "Artists", "Submit"] },
            { title: "Community", links: ["Discord", "Twitter", "Blog", "Events"] },
            { title: "Support", links: ["Help Center", "Terms", "Privacy", "Contact"] },
          ].map((col, i) => (
            <div key={i}>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-fuchsia-400 mb-6">{col.title}</h4>
              <ul className="space-y-3 text-sm text-white/30">
                {col.links.map(l => <li key={l}><Link href="#" className="hover:text-white transition-colors">{l}</Link></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-[1400px] mx-auto pt-8 border-t border-white/5 text-[10px] font-bold uppercase tracking-widest text-white/20 flex justify-between">
          <span>© 2026 ARTINDEX.</span>
          <span>CURATED DIGITAL ART.</span>
        </div>
      </footer>
    </div>
  )
}