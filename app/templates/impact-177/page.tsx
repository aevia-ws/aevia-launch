"use client"
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Mic2, Play, Pause, Headphones, Star, ArrowRight, Rss, Clock, Users, Menu, ChevronRight, Mail, Globe } from "lucide-react"
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

function AudioWave({ playing = false }: { playing?: boolean }) {
  return (
    <div className="flex items-center gap-[3px] h-8">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-[3px] rounded-full bg-amber-400"
          animate={playing
            ? { height: ["15%", "90%", "30%", "70%", "15%"] }
            : { height: "20%" }
          }
          transition={playing
            ? { duration: 1.2 + Math.random() * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.08 }
            : { duration: 0.3 }
          }
        />
      ))}
    </div>
  )
}

const EPISODES = [
  { num: "127", title: "The Loneliness Economy", guest: "Dr. Vivian Cross", duration: "1:42:15", date: "May 2, 2026", desc: "Why isolation became the biggest market opportunity of the decade — and what it means for society.", tags: ["Society", "Economy"] },
  { num: "126", title: "How CRISPR Rewrites History", guest: "Prof. Raj Patel", duration: "1:18:30", date: "Apr 25, 2026", desc: "Gene editing's leap from lab curiosity to civilization-altering tool. The ethics no one is discussing.", tags: ["Biotech", "Ethics"] },
  { num: "125", title: "The Architecture of Decisions", guest: "Sarah Blackwood", duration: "58:45", date: "Apr 18, 2026", desc: "Behavioral science in product design. How tech companies nudge billions of daily choices.", tags: ["Design", "Psychology"] },
  { num: "124", title: "Post-Internet Art", guest: "Kai Müller", duration: "1:05:10", date: "Apr 11, 2026", desc: "Digital-native artists redefining what it means to create when AI can generate anything.", tags: ["Art", "AI"] },
]

const STATS = [
  { value: "2.4M", label: "Weekly listeners" },
  { value: "127", label: "Episodes aired" },
  { value: "#3", label: "Global rank" },
  { value: "4.9★", label: "Average rating" },
]

export default function EssentialPodcastPage() {
  const [scrolled, setScrolled] = useState(false)
  const [playing, setPlaying] = useState<string | null>(null)
  const heroRef = useRef(null)

  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.2], ["0%", "30%"])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0])

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", h)
    return () => window.removeEventListener("scroll", h)
  }, [])

  return (
    <div className="bg-[#0c0c0c] text-white font-sans min-h-screen selection:bg-amber-400 selection:text-black overflow-x-hidden">

      {/* ── NAVBAR ─────────────────────────────────────────────── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled ? "bg-[#0c0c0c]/90 backdrop-blur-xl border-b border-amber-400/10 py-4" : "bg-transparent py-8"}`}>
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center">
              <Mic2 className="w-5 h-5 text-black" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tight">SIGNAL</span>
              <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-amber-400 -mt-1">Podcast</span>
            </div>
          </Link>
          <div className="hidden lg:flex gap-10 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
            {["Episodes", "About", "Guests", "Subscribe"].map(l => (
              <Link key={l} href="#" className="hover:text-amber-400 transition-colors">{l}</Link>
            ))}
          </div>
          <div className="flex items-center gap-6">
            <button className="hidden md:block px-8 py-3 bg-amber-400 text-black text-[10px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-white transition-colors duration-500">
              Subscribe Free
            </button>
            <Sheet>
              <SheetTrigger asChild>
                <button className="lg:hidden"><Menu className="w-6 h-6 text-white" /></button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#0c0c0c] border-amber-400/10 p-12">
                <div className="flex flex-col gap-8 mt-16">
                  {["Episodes", "About", "Guests", "Subscribe"].map(l => (
                    <Link key={l} href="#" className="text-3xl font-light uppercase tracking-widest hover:text-amber-400 transition-colors">{l}</Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      <main>
        {/* ── HERO ─────────────────────────────────────────────── */}
        <section className="relative min-h-screen flex items-center overflow-hidden pt-32 pb-20" ref={heroRef}>
          <div className="absolute inset-0 bg-gradient-to-b from-amber-400/5 via-transparent to-transparent pointer-events-none" />
          
          <motion.div style={{ opacity: heroOpacity }} className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Reveal>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-400/20 bg-amber-400/10 text-amber-400 text-[10px] font-bold uppercase tracking-widest mb-8">
                  <Star className="w-3 h-3 fill-current" /> #3 Technology Podcast Worldwide
                </div>
              </Reveal>
              <Reveal delay={0.1} y={60}>
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
                  Cut Through<br/>The <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-300">Noise.</span>
                </h1>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-xl text-white/50 font-light leading-relaxed mb-10 max-w-lg">
                  Long-form conversations with the minds shaping our future. No ads, no fluff — just the signal.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="flex flex-wrap gap-4">
                  <button onClick={() => setPlaying(playing ? null : "127")} className="px-8 py-4 bg-amber-400 text-black font-bold rounded-full hover:bg-white transition-colors flex items-center gap-3">
                    {playing ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
                    Listen to Latest
                  </button>
                  <button className="px-8 py-4 border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-colors flex items-center gap-3">
                    <Rss className="w-5 h-5" /> All Platforms
                  </button>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.2}>
              <div className="relative hidden lg:block">
                <div className="aspect-square relative rounded-3xl overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.8)] border border-white/10">
                  <Image src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=800" alt="Podcast Studio" fill className="object-cover" priority />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="text-amber-400 font-black text-3xl tracking-tighter mb-2">SIGNAL</div>
                    <div className="text-white/60 text-sm font-bold uppercase tracking-widest">Hosted by Alex Chen</div>
                    <div className="mt-4"><AudioWave playing={!!playing} /></div>
                  </div>
                </div>
                <motion.div animate={{ y: [-8, 8, -8] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-6 -left-6 bg-[#1a1a1a] border border-white/10 p-5 rounded-2xl shadow-2xl flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-amber-400/20 flex items-center justify-center">
                    <Headphones className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-xs text-white/40 uppercase tracking-widest font-bold">Audio Quality</div>
                    <div className="font-mono text-sm font-bold">48kHz / 24-bit</div>
                  </div>
                </motion.div>
              </div>
            </Reveal>
          </motion.div>
        </section>

        {/* ── STATS ────────────────────────────────────────────── */}
        <section className="py-16 border-y border-white/5">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-black text-amber-400 mb-1">{s.value}</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-white/30">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── EPISODES ─────────────────────────────────────────── */}
        <section className="py-32 bg-[#0c0c0c]">
          <div className="max-w-[1000px] mx-auto px-6 md:px-12">
            <Reveal>
              <div className="flex justify-between items-end mb-16 border-b border-white/10 pb-8">
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Recent Episodes</h2>
                <Link href="#" className="hidden md:flex items-center gap-2 text-amber-400 text-[10px] font-bold uppercase tracking-widest">
                  View All <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Reveal>

            <div className="space-y-6">
              {EPISODES.map((ep, i) => {
                const isPlaying = playing === ep.num
                return (
                  <Reveal key={ep.num} delay={i * 0.08}>
                    <div className={`p-8 rounded-2xl border transition-all duration-300 group ${isPlaying ? "bg-[#1a1a1a] border-amber-400/30" : "bg-[#1a1a1a]/50 border-white/5 hover:border-white/20"}`}>
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-24 flex md:flex-col justify-between items-start shrink-0">
                          <div className="text-[10px] font-mono text-white/30 mb-2">EP {ep.num}</div>
                          <button onClick={() => setPlaying(isPlaying ? null : ep.num)}
                            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-lg ${isPlaying ? "bg-amber-400 text-black" : "bg-white/10 text-white group-hover:bg-amber-400 group-hover:text-black"}`}>
                            {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
                          </button>
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-wrap gap-2 mb-3">
                            {ep.tags.map(t => (
                              <span key={t} className="px-3 py-1 bg-white/5 text-white/50 text-[10px] font-bold uppercase tracking-widest rounded-full">{t}</span>
                            ))}
                          </div>
                          <h3 className={`text-xl md:text-2xl font-bold mb-2 transition-colors ${isPlaying ? "text-amber-400" : "group-hover:text-amber-400"}`}>{ep.title}</h3>
                          <div className="text-sm text-white/30 mb-4 flex items-center gap-4">
                            <span>Guest: {ep.guest}</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {ep.duration}</span>
                          </div>
                          <p className="text-sm text-white/40 leading-relaxed">{ep.desc}</p>
                          {isPlaying && <div className="mt-4"><AudioWave playing /></div>}
                        </div>
                      </div>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── SUBSCRIBE CTA ────────────────────────────────────── */}
        <section className="py-32 bg-gradient-to-b from-[#0c0c0c] to-[#1a1a1a]">
          <div className="max-w-[800px] mx-auto px-6 text-center">
            <Reveal>
              <div className="w-20 h-20 rounded-2xl bg-amber-400 flex items-center justify-center mx-auto mb-8">
                <Mic2 className="w-10 h-10 text-black" />
              </div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">Never Miss<br/>An <span className="text-amber-400">Episode.</span></h2>
              <p className="text-lg text-white/40 font-light max-w-md mx-auto mb-10">
                Subscribe for free and get new episodes, show notes, and exclusive content delivered weekly.
              </p>
              <form onSubmit={e => e.preventDefault()} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input type="email" placeholder="Your email address" className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-4 text-sm outline-none focus:border-amber-400 transition-colors" />
                <button className="px-8 py-4 bg-amber-400 text-black font-bold rounded-full hover:bg-white transition-colors">Subscribe</button>
              </form>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ── FOOTER ─────────────────────────────────────────────── */}
      <footer className="bg-[#050505] pt-24 pb-12 px-6">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center">
                <Mic2 className="w-4 h-4 text-black" />
              </div>
              <span className="font-black tracking-tight">SIGNAL</span>
            </div>
            <p className="text-sm text-white/30 leading-relaxed">Independent long-form journalism through conversation.</p>
          </div>
          {[
            { title: "Show", links: ["All Episodes", "Guests A-Z", "Topics", "Transcripts"] },
            { title: "Network", links: ["About Us", "Sponsorship", "Pitch a Guest", "Merch"] },
            { title: "Listen On", links: ["Apple Podcasts", "Spotify", "YouTube", "Overcast"] },
          ].map((col, i) => (
            <div key={i}>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-400 mb-6">{col.title}</h4>
              <ul className="space-y-3 text-sm text-white/30">
                {col.links.map(l => <li key={l}><Link href="#" className="hover:text-white transition-colors">{l}</Link></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-[1400px] mx-auto pt-8 border-t border-white/5 text-[10px] font-bold uppercase tracking-widest text-white/20 flex justify-between">
          <span>© 2026 SIGNAL MEDIA.</span>
          <span>48KHZ / 24-BIT AUDIO.</span>
        </div>
      </footer>

      {/* ── STICKY PLAYER ──────────────────────────────────────── */}
      <AnimatePresence>
        {playing && (
          <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            className="fixed bottom-0 left-0 right-0 z-[100] bg-[#1a1a1a]/95 backdrop-blur-xl border-t border-white/10 p-4 flex items-center justify-between gap-4">
            <div className="absolute top-0 left-0 h-1 bg-white/5 w-full">
              <motion.div className="h-full bg-amber-400" animate={{ width: "100%" }} transition={{ duration: 3600, ease: "linear" }} />
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-amber-400/20 flex items-center justify-center shrink-0">
                <Mic2 className="w-5 h-5 text-amber-400" />
              </div>
              <div className="min-w-0">
                <div className="text-xs text-amber-400 font-bold">Now Playing</div>
                <div className="text-sm font-bold truncate">{EPISODES.find(e => e.num === playing)?.title}</div>
              </div>
            </div>
            <button onClick={() => setPlaying(null)} className="w-10 h-10 rounded-full bg-amber-400 text-black flex items-center justify-center shrink-0">
              <Pause className="w-4 h-4 fill-current" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
