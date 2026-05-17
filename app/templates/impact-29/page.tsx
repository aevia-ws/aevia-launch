"use client"

import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { ArrowRight, Terminal, GitBranch, ExternalLink, ChevronRight, Code2 } from "lucide-react"

function useFonts() {
  useEffect(() => {
    if (document.getElementById("impact-29-fonts")) return
    const style = document.createElement("style")
    style.id = "impact-29-fonts"
    style.textContent = `@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap');`
    document.head.appendChild(style)
  }, [])
}

function ScrollImage({ src, alt, width, height, className = "", dir = 1, yRange = 50 }: {
  src: string; alt: string; width: number; height: number; className?: string; dir?: number; yRange?: number
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const rotate = useTransform(scrollYProgress, [0, 1], [-5 * dir, 5 * dir])
  const y = useTransform(scrollYProgress, [0, 1], [-yRange, yRange])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.0, 1.1])
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ rotate, y, scale }}>
        <Image src={src} alt={alt} width={width} height={height} className="w-full h-full object-cover" />
      </motion.div>
    </div>
  )
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  )
}

const projects = [
  {
    name: "noctua.dev",
    desc: "Real-time collaborative code editor. WebSockets, Monaco Editor, Y.js CRDT.",
    stack: ["Next.js", "Rust", "WebSockets", "PostgreSQL"],
    stars: "2.1k",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop&crop=center",
  },
  {
    name: "argos-cli",
    desc: "Terminal-based API testing framework with snapshot diffs and CI/CD integration.",
    stack: ["Node.js", "TypeScript", "Jest"],
    stars: "847",
    img: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&h=500&fit=crop&crop=center",
  },
  {
    name: "vaultkey",
    desc: "Zero-knowledge password manager. AES-256-GCM, argon2id key derivation, WASM crypto.",
    stack: ["Rust", "WASM", "React", "SQLite"],
    stars: "3.4k",
    img: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&h=500&fit=crop&crop=center",
  },
]

const skills = [
  { cat: "Languages", items: ["TypeScript", "Rust", "Go", "Python", "SQL"] },
  { cat: "Frontend", items: ["React 19", "Next.js 15", "Framer Motion", "Radix UI", "Tailwind"] },
  { cat: "Backend", items: ["Node.js", "Axum", "Gin", "tRPC", "GraphQL"] },
  { cat: "Infra", items: ["PostgreSQL", "Redis", "Docker", "Kubernetes", "Cloudflare"] },
]

const timeline = [
  { year: "2024", role: "Staff Engineer", co: "Stripe", desc: "Led infrastructure reliability for payment processing at scale." },
  { year: "2023", role: "Senior Frontend", co: "Vercel", desc: "Core contributor to Next.js App Router and Turbopack." },
  { year: "2021", role: "Founding Engineer", co: "Linear", desc: "Built the real-time sync engine from scratch (Yjs + CRDTs)." },
  { year: "2019", role: "Backend Engineer", co: "Algolia", desc: "Search indexing pipeline and distributed query routing." },
]

export default function Impact29() {
  useFonts()
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeProject, setActiveProject] = useState(0)
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, -40])

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0A0E1A] text-[#E2E8F0]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
      <motion.div className="fixed top-0 left-0 right-0 h-0.5 bg-[#00F5D4] origin-left z-50" style={{ scaleX: scrollYProgress }} />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-[#0A0E1A]/90 backdrop-blur-md border-b border-[#00F5D4]/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Terminal className="w-5 h-5 text-[#00F5D4]" />
            <span className="font-bold text-[#00F5D4]">glitch</span>
            <span className="text-[#475569]">.dev</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-[#475569]">
            {["work", "skills", "timeline", "contact"].map(l => (
              <a key={l} href={`#${l}`} className="hover:text-[#00F5D4] transition-colors cursor-pointer">
                <span className="text-[#00F5D4]">// </span>{l}
              </a>
            ))}
          </div>
          <a href="#contact" className="hidden md:flex items-center gap-2 border border-[#00F5D4]/40 text-[#00F5D4] text-xs px-4 py-2 hover:bg-[#00F5D4]/10 transition-colors cursor-pointer">
            hire me <ArrowRight className="w-3 h-3" />
          </a>
          <button className="md:hidden text-[#00F5D4] cursor-pointer" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <Terminal className="w-5 h-5" />
          </button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="border-t border-[#00F5D4]/10 bg-[#0A0E1A] px-6 py-4 flex flex-col gap-3 text-sm"
            >
              {["work", "skills", "timeline", "contact"].map(l => (
                <a key={l} href={`#${l}`} onClick={() => setMenuOpen(false)} className="text-[#475569] hover:text-[#00F5D4] transition-colors cursor-pointer">
                  <span className="text-[#00F5D4]">// </span>{l}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex items-center relative overflow-hidden pt-20">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-[#00F5D4]/5 rounded-full blur-3xl" />
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `linear-gradient(rgba(0,245,212,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,212,1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px"
          }} />
        </div>
        <motion.div style={{ y: heroY }} className="max-w-6xl mx-auto px-6 relative w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-[#00F5D4] text-xs mb-4">
            <span className="text-[#475569]">$ </span>whoami
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-bold leading-[1.1] mb-6"
            style={{ fontSize: "clamp(42px, 8vw, 96px)" }}
          >
            // Raphaël Genet
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-2 mb-10 text-[#475569] text-base md:text-lg"
          >
            <div><span className="text-[#00F5D4]">const </span>role = <span className="text-emerald-400">"Staff Engineer & Open Source"</span></div>
            <div><span className="text-[#00F5D4]">const </span>location = <span className="text-emerald-400">"Paris, France"</span></div>
            <div><span className="text-[#00F5D4]">const </span>available = <span className="text-emerald-400">"Q3 2026 contracts"</span></div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-4 mb-16"
          >
            <a href="#work" className="bg-[#00F5D4] text-[#0A0E1A] font-bold text-sm px-6 py-3 hover:bg-[#00E5C4] transition-colors flex items-center gap-2 cursor-pointer">
              view work() <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#" className="border border-[#00F5D4]/30 text-[#00F5D4] text-sm px-6 py-3 hover:bg-[#00F5D4]/10 transition-colors flex items-center gap-2 cursor-pointer">
              <GitBranch className="w-4 h-4" /> github/glitchdev
            </a>
          </motion.div>

          {/* Terminal widget */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="bg-[#0D1323] border border-[#00F5D4]/20 rounded-lg overflow-hidden max-w-2xl"
          >
            <div className="flex items-center gap-2 px-4 py-3 bg-[#0F1729] border-b border-[#00F5D4]/10">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
              <span className="text-xs text-[#475569] ml-2">glitch.dev — terminal</span>
            </div>
            <div className="p-4 text-sm space-y-2">
              {[
                { p: "$ ", t: "git clone https://github.com/glitchdev/vaultkey", c: "text-[#00F5D4]" },
                { p: "✓ ", t: "Cloned in 0.8s", c: "text-emerald-400" },
                { p: "$ ", t: "cd vaultkey && cargo build --release", c: "text-[#00F5D4]" },
                { p: "  ", t: "Compiling vaultkey v2.1.0 (target/release)", c: "text-[#475569]" },
                { p: "✓ ", t: "Built in 4.2s (3.4k stars on GitHub)", c: "text-emerald-400" },
              ].map((line, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2 + i * 0.2 }} className="flex">
                  <span className={`${line.c} mr-2 shrink-0`}>{line.p}</span>
                  <span className="text-[#94A3B8]">{line.t}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Projects */}
      <section id="work" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal className="mb-12">
            <div className="text-[#00F5D4] text-xs mb-2"><span className="text-[#475569]">// </span>selected_projects</div>
            <h2 className="font-bold text-3xl md:text-4xl">Open Source Work</h2>
          </Reveal>
          <div className="flex gap-2 mb-8 flex-wrap">
            {projects.map((p, i) => (
              <button
                key={p.name}
                onClick={() => setActiveProject(i)}
                className={`px-4 py-2 text-sm font-semibold transition-all cursor-pointer border ${
                  activeProject === i
                    ? "bg-[#00F5D4] text-[#0A0E1A] border-[#00F5D4]"
                    : "border-[#00F5D4]/20 text-[#475569] hover:border-[#00F5D4]/50 hover:text-[#E2E8F0]"
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
            >
              <ScrollImage
                src={projects[activeProject].img}
                alt={projects[activeProject].name}
                width={800}
                height={500}
                className="w-full aspect-video border border-[#00F5D4]/20"
                dir={activeProject % 2 === 0 ? 1 : -1}
              />
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-2xl font-bold text-[#00F5D4]">{projects[activeProject].name}</h3>
                  <div className="text-yellow-400 text-sm">★ {projects[activeProject].stars}</div>
                </div>
                <p className="text-[#94A3B8] mb-6 leading-relaxed">{projects[activeProject].desc}</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {projects[activeProject].stack.map(s => (
                    <span key={s} className="border border-[#00F5D4]/20 text-[#00F5D4] text-xs px-3 py-1.5">{s}</span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a href="#" className="flex items-center gap-2 text-sm text-[#00F5D4] hover:opacity-70 transition-opacity cursor-pointer">
                    <GitBranch className="w-4 h-4" /> View source
                  </a>
                  <a href="#" className="flex items-center gap-2 text-sm text-[#94A3B8] hover:text-[#E2E8F0] transition-colors cursor-pointer">
                    <ExternalLink className="w-4 h-4" /> Live demo
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-24 px-6 bg-[#0D1323]">
        <div className="max-w-6xl mx-auto">
          <Reveal className="mb-12">
            <div className="text-[#00F5D4] text-xs mb-2"><span className="text-[#475569]">// </span>tech_stack</div>
            <h2 className="font-bold text-3xl md:text-4xl">Skills & Tools</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((s, i) => (
              <Reveal key={s.cat} delay={i * 0.1}>
                <div className="border border-[#00F5D4]/10 p-6 hover:border-[#00F5D4]/30 transition-colors">
                  <div className="text-[#00F5D4] text-xs mb-4 uppercase tracking-widest">{s.cat}</div>
                  <ul className="space-y-2">
                    {s.items.map(item => (
                      <li key={item} className="flex items-center gap-2 text-sm text-[#94A3B8]">
                        <ChevronRight className="w-3 h-3 text-[#00F5D4] shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery — scroll rotate images */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal className="mb-12">
            <div className="text-[#00F5D4] text-xs mb-2"><span className="text-[#475569]">// </span>the_setup</div>
            <h2 className="font-bold text-3xl">Environment</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ScrollImage src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop&crop=center" alt="Code" width={600} height={400} className="w-full aspect-video" dir={-1} yRange={40} />
            <ScrollImage src="https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?w=600&h=400&fit=crop&crop=center" alt="Terminal" width={600} height={400} className="w-full aspect-video mt-8" dir={1} yRange={40} />
            <ScrollImage src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=center" alt="Monitor" width={600} height={400} className="w-full aspect-video" dir={-1} yRange={40} />
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section id="timeline" className="py-24 px-6 bg-[#0D1323]">
        <div className="max-w-6xl mx-auto">
          <Reveal className="mb-12">
            <div className="text-[#00F5D4] text-xs mb-2"><span className="text-[#475569]">// </span>career_timeline</div>
            <h2 className="font-bold text-3xl md:text-4xl">Experience</h2>
          </Reveal>
          <div className="relative border-l border-[#00F5D4]/20 pl-8 space-y-10">
            {timeline.map((t, i) => (
              <Reveal key={t.year} delay={i * 0.1}>
                <div className="relative">
                  <div className="absolute -left-[2.6rem] w-3 h-3 border-2 border-[#00F5D4] bg-[#0D1323] rounded-full" />
                  <div className="text-[#00F5D4] text-xs mb-2">{t.year}</div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-lg">{t.role}</h3>
                    <span className="text-[#475569] text-sm">@ {t.co}</span>
                  </div>
                  <p className="text-[#94A3B8] text-sm leading-relaxed">{t.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <div className="text-[#00F5D4] text-xs mb-4"><span className="text-[#475569]">// </span>get_in_touch</div>
            <h2 className="font-bold text-4xl md:text-5xl mb-6">Let's build<br />something great.</h2>
            <p className="text-[#94A3B8] text-lg mb-10 leading-relaxed">
              Available for staff/principal engineering contracts, technical advisory, and open source. Based in Paris, remote-first.
            </p>
            <div className="space-y-4">
              <a href="mailto:raph@glitch.dev" className="block w-full bg-[#00F5D4] text-[#0A0E1A] font-bold text-sm py-4 hover:bg-[#00E5C4] transition-colors cursor-pointer">
                hello@glitch.dev →
              </a>
              <div className="grid grid-cols-2 gap-4">
                <a href="#" className="border border-[#00F5D4]/20 text-[#00F5D4] text-sm py-4 hover:bg-[#00F5D4]/10 transition-colors cursor-pointer flex items-center justify-center gap-2">
                  <GitBranch className="w-4 h-4" /> GitHub
                </a>
                <a href="#" className="border border-[#00F5D4]/20 text-[#00F5D4] text-sm py-4 hover:bg-[#00F5D4]/10 transition-colors cursor-pointer flex items-center justify-center gap-2">
                  <Code2 className="w-4 h-4" /> Resume PDF
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#00F5D4]/10 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm">
            <Terminal className="w-4 h-4 text-[#00F5D4]" />
            <span className="text-[#00F5D4]">glitch</span><span className="text-[#475569]">.dev</span>
          </div>
          <div className="text-[#475569] text-xs">© 2026 Raphaël Genet · Paris, France</div>
          <div className="text-[#475569] text-xs">built with Next.js & coffee</div>
        </div>
      </footer>
    </div>
  )
}
