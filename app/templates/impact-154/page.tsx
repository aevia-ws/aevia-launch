"use client"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Sparkles, ArrowRight, Menu, Star, Users, Award, Briefcase, Layers, PenTool, Camera, Code, Megaphone, ChevronRight, Mail, Phone, MapPin } from "lucide-react"
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

const WORK = [
  { title: "Neon District", client: "Pulse Gaming", type: "Brand Identity", img: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&q=80&w=1200" },
  { title: "Aether Launch", client: "Aether Space", type: "Product Campaign", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200" },
  { title: "Silk & Stone", client: "Maison Versa", type: "Editorial Design", img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1200" },
  { title: "Digital Roots", client: "TerraFi", type: "Web Experience", img: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1200" },
]

const SERVICES = [
  { icon: PenTool, title: "Brand Strategy", desc: "Name, narrative, visual system. We build identities that create irrational loyalty." },
  { icon: Layers, title: "Web & Digital", desc: "Immersive websites and digital products that convert attention into action." },
  { icon: Camera, title: "Content Production", desc: "Photo, video, and motion graphics that stop the scroll and start conversations." },
  { icon: Megaphone, title: "Campaign Design", desc: "Integrated campaigns across channels that amplify your message exponentially." },
]

const TESTIMONIALS = [
  { text: "Obliq didn't just design our brand — they gave us a voice we didn't know we had. Revenue up 340% since the rebrand.", author: "Marcus Chen", role: "CEO, Pulse Gaming" },
  { text: "Working with Obliq feels like having a secret weapon. Their creative instincts are otherworldly.", author: "Elena Frost", role: "CMO, Aether Space" },
  { text: "The website they built us isn't a website — it's an experience. Our bounce rate dropped to 12%.", author: "Sophie Laurent", role: "Founder, Maison Versa" },
]

export default function ObliqServicesPage() {
  const [scrolled, setScrolled] = useState(false)
  const heroRef = useRef(null)

  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.2], ["0%", "40%"])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", h)
    return () => window.removeEventListener("scroll", h)
  }, [])

  return (
    <div className="bg-[#0a0508] text-white font-sans min-h-screen selection:bg-rose-500 selection:text-white overflow-x-hidden">

      {/* ── NAVBAR ───────────────────────────────────── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled ? "bg-[#0a0508]/90 backdrop-blur-xl border-b border-rose-500/10 py-4" : "bg-transparent py-8"}`}>
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="text-2xl font-black tracking-tighter">
            OBL<span className="text-rose-500">IQ</span><span className="text-rose-500">.</span>
          </Link>
          <div className="hidden lg:flex gap-10 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
            {["Work", "Services", "Studio", "Journal", "Contact"].map(l => (
              <Link key={l} href="#" className="hover:text-rose-400 transition-colors">{l}</Link>
            ))}
          </div>
          <div className="flex items-center gap-6">
            <button className="hidden md:block px-8 py-3 bg-rose-500 text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-white hover:text-black transition-all duration-500">
              Let's Talk
            </button>
            <Sheet>
              <SheetTrigger asChild><button className="lg:hidden"><Menu className="w-6 h-6 text-white" /></button></SheetTrigger>
              <SheetContent side="right" className="bg-[#0a0508] border-rose-500/10 p-12">
                <div className="flex flex-col gap-8 mt-16">
                  {["Work", "Services", "Studio", "Contact"].map(l => (
                    <Link key={l} href="#" className="text-3xl font-light uppercase tracking-widest hover:text-rose-400 transition-colors">{l}</Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      <main>
        {/* ── HERO ───────────────────────────────────── */}
        <section className="relative h-[110vh] min-h-[800px] flex items-center overflow-hidden" ref={heroRef}>
          <motion.div style={{ y: heroY }} className="absolute inset-0">
            <Image src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&q=80&w=2400" alt="Creative" fill className="object-cover opacity-40" priority />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0508] via-[#0a0508]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0508] via-transparent to-transparent" />
          </motion.div>

          <motion.div style={{ opacity: heroOpacity }} className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 w-full">
            <Reveal>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-[2px] bg-rose-500" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-rose-400">Creative Agency — Est. 2018</span>
              </div>
            </Reveal>
            <Reveal delay={0.1} y={70}>
              <h1 className="text-7xl md:text-[8rem] lg:text-[11rem] font-black tracking-tighter leading-[0.8] mb-10">
                We Make<br/>Brands<br/><span className="text-rose-500 italic">Unignorable.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="text-xl text-white/40 font-light max-w-lg leading-relaxed mb-10">
                Strategy, design, and production for companies that refuse to blend in. We don't do safe — we do unforgettable.
              </p>
            </Reveal>
            <Reveal delay={0.35}>
              <div className="flex flex-wrap gap-4">
                <button className="px-10 py-5 bg-rose-500 text-white font-bold rounded-full hover:bg-white hover:text-black transition-all duration-500 flex items-center gap-3">
                  View Our Work <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </Reveal>
          </motion.div>
        </section>

        {/* ── STATS ──────────────────────────────────── */}
        <section className="py-20 border-y border-white/5 bg-[#0a0508]">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { v: "86", l: "Brand launches" },
              { v: "4.2B", l: "Impressions generated" },
              { v: "24", l: "Industry awards" },
              { v: "97%", l: "Client retention" },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="text-center">
                  <div className="text-4xl font-black text-rose-400 mb-1">{s.v}</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-white/30">{s.l}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── SELECTED WORK ──────────────────────────── */}
        <section className="py-32 bg-[#0a0508]">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12">
            <Reveal>
              <div className="flex justify-between items-end mb-20">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-rose-400 block mb-4">Portfolio</span>
                  <h2 className="text-5xl md:text-7xl font-black tracking-tighter">Selected <span className="text-rose-400 italic">Work.</span></h2>
                </div>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {WORK.map((w, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="group cursor-pointer">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-xl mb-6">
                      <ParallaxImg src={w.img} alt={w.title} />
                      <div className="absolute inset-0 bg-rose-900/10 group-hover:bg-transparent transition-colors duration-700" />
                      <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-rose-300 mb-1">{w.type}</div>
                        <div className="text-sm text-white/60">Client: {w.client}</div>
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold group-hover:text-rose-400 transition-colors">{w.title}</h3>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES ───────────────────────────────── */}
        <section className="py-32 bg-[#0d080a]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <Reveal>
              <div className="text-center mb-24">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-rose-400 block mb-4">Capabilities</span>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter">What We <span className="text-rose-400 italic">Do.</span></h2>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SERVICES.map((s, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="group p-10 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-rose-500/30 transition-all duration-500 cursor-default">
                    <div className="flex items-start gap-6">
                      <div className="w-14 h-14 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0 group-hover:bg-rose-500 group-hover:border-rose-500 transition-all duration-500">
                        <s.icon className="w-6 h-6 text-rose-400 group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                        <p className="text-sm text-white/40 leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ───────────────────────────── */}
        <section className="py-32 bg-[#0a0508]">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12">
            <Reveal>
              <div className="text-center mb-20">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-rose-400 block mb-4">Praise</span>
                <h2 className="text-5xl font-black tracking-tighter">Client <span className="text-rose-400 italic">Words.</span></h2>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TESTIMONIALS.map((t, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="p-8 bg-white/[0.02] border border-white/5 rounded-2xl h-full flex flex-col">
                    <div className="flex gap-1 mb-6">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-rose-400 text-rose-400" />
                      ))}
                    </div>
                    <p className="text-white/60 leading-relaxed flex-1 mb-6 italic">"{t.text}"</p>
                    <div>
                      <div className="font-bold">{t.author}</div>
                      <div className="text-xs text-white/30">{t.role}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ────────────────────────────────────── */}
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=2400" alt="CTA" fill className="object-cover" />
            <div className="absolute inset-0 bg-rose-900/60 mix-blend-multiply" />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="relative z-10 text-center px-6">
            <Reveal>
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-8">
                Ready To Be<br/><span className="italic">Unignorable?</span>
              </h2>
              <button className="px-12 py-5 bg-white text-black font-bold rounded-full hover:bg-rose-500 hover:text-white transition-all duration-500">
                Start a Project
              </button>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ── FOOTER ───────────────────────────────────── */}
      <footer className="bg-[#050305] pt-24 pb-12 px-6">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div>
            <span className="text-2xl font-black tracking-tighter mb-6 block">OBL<span className="text-rose-500">IQ</span>.</span>
            <p className="text-sm text-white/30 leading-relaxed">Creative agency for brands that dare to be different.</p>
          </div>
          {[
            { title: "Studio", links: ["Work", "Services", "Team", "Culture"] },
            { title: "Connect", links: ["Contact", "Careers", "Press", "Newsletter"] },
            { title: "Social", links: ["Instagram", "Behance", "Dribbble", "LinkedIn"] },
          ].map((col, i) => (
            <div key={i}>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-rose-400 mb-6">{col.title}</h4>
              <ul className="space-y-3 text-sm text-white/30">
                {col.links.map(l => <li key={l}><Link href="#" className="hover:text-white transition-colors">{l}</Link></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-[1400px] mx-auto pt-8 border-t border-white/5 text-[10px] font-bold uppercase tracking-widest text-white/20 flex justify-between">
          <span>© 2026 OBLIQ CREATIVE.</span>
          <span>LONDON · NEW YORK · TOKYO</span>
        </div>
      </footer>
    </div>
  )
}