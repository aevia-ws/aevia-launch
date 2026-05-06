"use client"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Cpu, Zap, BarChart3, Shield, ArrowRight, Users, CheckCircle2, Menu, ChevronRight, Mail, Globe, Rocket, Target, Database } from "lucide-react"
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

const CAPABILITIES = [
  { icon: Cpu, title: "Systems Architecture", desc: "Mission-critical infrastructure design for enterprises processing 10M+ transactions per day." },
  { icon: Shield, title: "Security Engineering", desc: "Zero-trust architecture, SOC 2 compliance, and penetration testing across every layer of your stack." },
  { icon: Database, title: "Data Engineering", desc: "Real-time data pipelines, lakehouse architecture, and ML-ready feature stores at petabyte scale." },
  { icon: Rocket, title: "Platform Engineering", desc: "Internal developer platforms, CI/CD automation, and golden path tooling that 10x your team velocity." },
  { icon: Target, title: "Product Strategy", desc: "Technology roadmap advisory, build-vs-buy analysis, and CTO-level guidance for growth-stage startups." },
  { icon: BarChart3, title: "Observability", desc: "Full-stack monitoring, distributed tracing, and SLO frameworks that predict incidents before they happen." },
]

const PROJECTS = [
  { client: "FinGuard", type: "FinTech", result: "99.999% uptime for 14M daily users", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200" },
  { client: "MedCore AI", type: "HealthTech", result: "3.2s → 140ms API response time", img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200" },
  { client: "Atlas Logistics", type: "Supply Chain", result: "$4.2M annual infrastructure cost savings", img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200" },
]

const STATS = [
  { value: "147", label: "Projects shipped" },
  { value: "99.99", label: "% Uptime SLA", suffix: "%" },
  { value: "38", label: "Engineering team" },
  { value: "12", label: "Years of delivery" },
]

export default function VeloceTeamPage() {
  const [scrolled, setScrolled] = useState(false)

  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.2], ["0%", "30%"])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", h)
    return () => window.removeEventListener("scroll", h)
  }, [])

  return (
    <div className="bg-[#08080f] text-white font-sans min-h-screen selection:bg-violet-500 selection:text-white overflow-x-hidden">

      {/* ── NAVBAR ───────────────────────────────────────────── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled ? "bg-[#08080f]/90 backdrop-blur-xl border-b border-violet-500/10 py-4" : "bg-transparent py-8"}`}>
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black tracking-tight">VÉLOCE</span>
          </Link>
          <div className="hidden lg:flex gap-10 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
            {["Services", "Case Studies", "Team", "Blog", "Contact"].map(l => (
              <Link key={l} href="#" className="hover:text-violet-400 transition-colors">{l}</Link>
            ))}
          </div>
          <div className="flex items-center gap-6">
            <button className="hidden md:block px-8 py-3 bg-white text-black text-[10px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-violet-500 hover:text-white transition-all duration-500">
              Book a Call
            </button>
            <Sheet>
              <SheetTrigger asChild><button className="lg:hidden"><Menu className="w-6 h-6 text-white" /></button></SheetTrigger>
              <SheetContent side="right" className="bg-[#08080f] border-violet-500/10 p-12">
                <div className="flex flex-col gap-8 mt-16">
                  {["Services", "Case Studies", "Team", "Contact"].map(l => (
                    <Link key={l} href="#" className="text-3xl font-light uppercase tracking-widest hover:text-violet-400 transition-colors">{l}</Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      <main>
        {/* ── HERO ───────────────────────────────────────────── */}
        <section className="relative min-h-screen flex items-center overflow-hidden pt-32 pb-20">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:6rem_6rem]" />
            <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-violet-500/10 blur-[200px] rounded-full" />
          </div>

          <motion.div style={{ opacity: heroOpacity }} className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 w-full">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/20 bg-violet-500/10 text-violet-400 text-[10px] font-bold uppercase tracking-widest mb-8">
                <Cpu className="w-3 h-3" /> Engineering Agency — Since 2014
              </div>
            </Reveal>
            <Reveal delay={0.1} y={60}>
              <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-black tracking-tighter leading-[0.85] mb-8">
                We Build<br/>Systems That<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-violet-500">Scale.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-xl text-white/40 font-light max-w-xl leading-relaxed mb-10">
                From architecture to deployment — we engineer the infrastructure that powers the world's fastest-growing companies.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="flex flex-wrap gap-4">
                <button className="px-10 py-5 bg-white text-black text-[11px] font-bold uppercase tracking-widest rounded-full hover:bg-violet-500 hover:text-white transition-all duration-500">
                  Start a Project
                </button>
                <Link href="#" className="px-10 py-5 border border-white/10 text-white/60 text-[11px] font-bold uppercase tracking-widest rounded-full hover:border-violet-500/50 transition-all flex items-center gap-3">
                  View Case Studies <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Reveal>
          </motion.div>
        </section>

        {/* ── STATS ──────────────────────────────────────────── */}
        <section className="py-20 border-y border-white/5">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-black text-violet-400 mb-1">{s.value}{s.suffix || ""}</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-white/30">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── CAPABILITIES ───────────────────────────────────── */}
        <section className="py-32 bg-[#08080f]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <Reveal>
              <div className="text-center mb-24">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-violet-400 block mb-4">Capabilities</span>
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter">What We <span className="text-violet-400">Engineer.</span></h2>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CAPABILITIES.map((c, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="group p-8 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-violet-500/30 transition-all duration-500 cursor-default h-full">
                    <div className="w-14 h-14 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-6 group-hover:bg-violet-500 group-hover:border-violet-500 transition-all duration-500">
                      <c.icon className="w-6 h-6 text-violet-400 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{c.title}</h3>
                    <p className="text-sm text-white/40 leading-relaxed">{c.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── CASE STUDIES ────────────────────────────────────── */}
        <section className="py-32 bg-[#0d0d15]">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12">
            <Reveal>
              <div className="flex justify-between items-end mb-20">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-violet-400 block mb-4">Proven Results</span>
                  <h2 className="text-5xl md:text-7xl font-black tracking-tighter">Case <span className="text-violet-400">Studies.</span></h2>
                </div>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {PROJECTS.map((p, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="group cursor-pointer">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl mb-6">
                      <ParallaxImg src={p.img} alt={p.client} />
                      <div className="absolute inset-0 bg-violet-900/20 group-hover:bg-transparent transition-colors duration-500" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-violet-300 mb-1">{p.type}</div>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-violet-400 transition-colors">{p.client}</h3>
                    <p className="text-sm text-white/40 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400" /> {p.result}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ────────────────────────────────────────────── */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-transparent to-purple-600/10" />
          <div className="relative z-10 max-w-[800px] mx-auto px-6 text-center">
            <Reveal>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
                Ready to<br/><span className="text-violet-400">Ship?</span>
              </h2>
              <p className="text-lg text-white/40 font-light max-w-md mx-auto mb-10">
                Tell us about your project. We'll respond within 24 hours with a technical assessment and proposal.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-12 py-5 bg-white text-black font-bold rounded-full hover:bg-violet-500 hover:text-white transition-all duration-500">
                  Start a Conversation
                </button>
                <button className="px-12 py-5 border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-all">
                  View Documentation
                </button>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer className="bg-[#050508] pt-24 pb-12 px-6">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-black tracking-tight">VÉLOCE</span>
            </div>
            <p className="text-sm text-white/30 leading-relaxed">Engineering infrastructure for the world's most ambitious companies.</p>
          </div>
          {[
            { title: "Services", links: ["Architecture", "Security", "Data Eng.", "DevOps"] },
            { title: "Company", links: ["About", "Team", "Careers", "Blog"] },
            { title: "Resources", links: ["Case Studies", "Open Source", "Tech Radar", "Contact"] },
          ].map((col, i) => (
            <div key={i}>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-violet-400 mb-6">{col.title}</h4>
              <ul className="space-y-3 text-sm text-white/30">
                {col.links.map(l => <li key={l}><Link href="#" className="hover:text-white transition-colors">{l}</Link></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-[1400px] mx-auto pt-8 border-t border-white/5 text-[10px] font-bold uppercase tracking-widest text-white/20 flex justify-between">
          <span>© 2026 VÉLOCE ENGINEERING.</span>
          <span>ISO 27001 · SOC 2 TYPE II</span>
        </div>
      </footer>
    </div>
  )
}