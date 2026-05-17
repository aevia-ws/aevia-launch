"use client"

import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react"

function useFonts() {
  useEffect(() => {
    if (document.getElementById("impact-28-fonts")) return
    const style = document.createElement("style")
    style.id = "impact-28-fonts"
    style.textContent = `@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@400;500;600&display=swap');`
    document.head.appendChild(style)
  }, [])
}

function ScrollImage({ src, alt, width, height, className = "", dir = 1, yRange = 60 }: {
  src: string; alt: string; width: number; height: number; className?: string; dir?: number; yRange?: number
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const rotate = useTransform(scrollYProgress, [0, 1], [-6 * dir, 6 * dir])
  const y = useTransform(scrollYProgress, [0, 1], [-yRange, yRange])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1.0, 1.12])
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ rotate, y, scale }}>
        <Image src={src} alt={alt} width={width} height={height} className="w-full h-full object-cover" />
      </motion.div>
    </div>
  )
}

function Reveal({ children, className = "", delay = 0, from = "bottom" }: {
  children: React.ReactNode; className?: string; delay?: number; from?: "bottom" | "left" | "right"
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const initial = from === "left" ? { opacity: 0, x: -40 } : from === "right" ? { opacity: 0, x: 40 } : { opacity: 0, y: 32 }
  return (
    <motion.div ref={ref} initial={initial} animate={inView ? { opacity: 1, x: 0, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  )
}

const projects = [
  { name: "BLOC K — Social Housing Complex", loc: "Paris 19ème", year: "2024", type: "Residential", img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=600&fit=crop&crop=center" },
  { name: "BUNKER OFFICE — HQ Renovation", loc: "La Défense", year: "2023", type: "Commercial", img: "https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?w=800&h=600&fit=crop&crop=center" },
  { name: "CONCRETE CHAPEL", loc: "Marseille", year: "2023", type: "Cultural", img: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=800&h=600&fit=crop&crop=center" },
  { name: "SILOS — Mixed Use Development", loc: "Lyon", year: "2022", type: "Mixed Use", img: "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&h=600&fit=crop&crop=center" },
  { name: "RAW TOWER — Office Tower", loc: "Bordeaux", year: "2022", type: "Commercial", img: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=800&h=600&fit=crop&crop=center" },
]

const services = [
  { n: "01", title: "Architecture", desc: "New construction from concept to delivery. We design buildings that endure." },
  { n: "02", title: "Urban Planning", desc: "Master plans for districts, campuses, and large-scale developments." },
  { n: "03", title: "Interior Architecture", desc: "Raw material interiors — concrete, steel, glass. No compromise." },
  { n: "04", title: "Heritage Renovation", desc: "Transforming industrial heritage into contemporary programme." },
  { n: "05", title: "Competition", desc: "Architectural competition strategy. We win because we think differently." },
]

const team = [
  { name: "Viktor Brunel", role: "Founding Partner", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" },
  { name: "Anaïs Cornet", role: "Associate Architect", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face" },
  { name: "Marc Delvaux", role: "Urban Planning", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face" },
  { name: "Sonia Lehmann", role: "Project Director", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face" },
]

export default function Impact28() {
  useFonts()
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeProject, setActiveProject] = useState<number | null>(null)
  const [openService, setOpenService] = useState<number | null>(null)

  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 80])
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.15])

  return (
    <div ref={containerRef} className="min-h-screen bg-white text-black" style={{ fontFamily: "'Barlow', sans-serif" }}>
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-black origin-left z-50" style={{ scaleX: scrollYProgress }} />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="font-black text-xl tracking-[0.15em] uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.4rem", letterSpacing: "0.2em" }}>
            BRUTCO
          </div>
          <div className="hidden md:flex items-center gap-10 text-sm font-semibold uppercase tracking-widest">
            {["Work", "Services", "Studio", "Contact"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="hover:underline hover:underline-offset-4 transition-all cursor-pointer">{l}</a>
            ))}
          </div>
          <a href="#contact" className="hidden md:block bg-black text-white text-xs font-bold tracking-widest uppercase px-6 py-3 hover:bg-gray-900 transition-colors cursor-pointer">
            Get in touch →
          </a>
          <button className="md:hidden font-black text-xl cursor-pointer" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              className="overflow-hidden border-t-4 border-black bg-white"
            >
              <div className="px-6 py-4 flex flex-col gap-4 text-sm font-bold uppercase tracking-widest">
                {["Work", "Services", "Studio", "Contact"].map(l => (
                  <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="hover:ml-2 transition-all cursor-pointer">{l}</a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex flex-col relative pt-[72px] overflow-hidden">
        <div className="flex-1 relative overflow-hidden">
          <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&h=900&fit=crop&crop=center"
              alt="Brutco Architecture"
              fill
              className="object-cover grayscale"
            />
            <div className="absolute inset-0 bg-black/30" />
          </motion.div>
          <div className="relative h-full flex items-end pb-12 px-6 max-w-7xl mx-auto w-full">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-white"
              >
                <div className="text-xs font-bold tracking-[0.4em] uppercase mb-6 opacity-70">Paris · Founded 2008</div>
                <h1 className="font-black leading-[0.85] text-white mb-8" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(64px, 12vw, 160px)", letterSpacing: "-0.02em" }}>
                  WE BUILD<br />WHAT<br />MATTERS.
                </h1>
              </motion.div>
            </div>
          </div>
        </div>
        {/* Black bar stats */}
        <div className="bg-black text-white px-6 py-8">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { val: "140+", label: "Projects built" },
              { val: "16", label: "Years active" },
              { val: "8", label: "National awards" },
              { val: "€800M+", label: "Construction value" },
            ].map(({ val, label }) => (
              <div key={label}>
                <div className="font-black text-4xl" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{val}</div>
                <div className="text-white/50 text-xs uppercase tracking-widest mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-16">
            <div className="flex items-end justify-between">
              <h2 className="font-black text-5xl md:text-7xl uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                SELECTED<br />WORK
              </h2>
              <div className="text-sm font-semibold uppercase tracking-widest text-gray-400 hidden md:block">2019 — 2024</div>
            </div>
          </Reveal>

          <div className="space-y-4">
            {projects.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.06}>
                <div
                  className="border-t-4 border-black cursor-pointer group overflow-hidden"
                  onClick={() => setActiveProject(activeProject === i ? null : i)}
                >
                  <div className="flex items-center justify-between py-6 gap-4">
                    <div className="flex items-center gap-6">
                      <span className="text-gray-300 font-bold text-sm" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>0{i + 1}</span>
                      <h3 className="font-black text-xl md:text-2xl uppercase tracking-tight group-hover:translate-x-2 transition-transform" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                        {p.name}
                      </h3>
                    </div>
                    <div className="flex items-center gap-6 shrink-0">
                      <span className="text-sm text-gray-400 font-semibold hidden md:block">{p.type}</span>
                      <span className="text-sm text-gray-400">{p.loc}</span>
                      <span className="font-black text-sm">{p.year}</span>
                      <motion.div animate={{ rotate: activeProject === i ? 45 : 0 }} transition={{ duration: 0.2 }}>
                        <ArrowUpRight className="w-5 h-5" />
                      </motion.div>
                    </div>
                  </div>
                  <AnimatePresence>
                    {activeProject === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 320, opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <ScrollImage
                          src={p.img}
                          alt={p.name}
                          width={800}
                          height={320}
                          className="w-full h-80"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            ))}
            <div className="border-t-4 border-black" />
          </div>
        </div>
      </section>

      {/* Split section */}
      <section className="py-0 bg-black text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 min-h-[600px]">
          <ScrollImage
            src="https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?w=800&h=600&fit=crop&crop=center"
            alt="Brutco studio"
            width={800}
            height={600}
            className="w-full h-full min-h-[400px]"
            dir={-1}
          />
          <div className="flex items-center px-12 py-16">
            <div>
              <Reveal from="right">
                <div className="text-xs font-bold tracking-[0.4em] uppercase text-white/40 mb-6">Our approach</div>
                <h2 className="font-black text-4xl md:text-5xl uppercase leading-[0.9] mb-8" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                  CONCRETE IS HONEST.<br />WE ARE BRUTAL.
                </h2>
                <p className="text-white/60 leading-relaxed mb-8 text-lg">
                  We don't design for awards. We design for people and cities. Brutalism is not a style — it's a conviction that architecture should be truthful about its materials and its purpose.
                </p>
                <a href="#services" className="inline-flex items-center gap-2 bg-white text-black font-bold text-sm uppercase tracking-widest px-8 py-4 hover:bg-gray-100 transition-colors cursor-pointer">
                  Our methodology <ArrowRight className="w-4 h-4" />
                </a>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-16">
            <h2 className="font-black text-5xl md:text-7xl uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              SERVICES
            </h2>
          </Reveal>
          <div className="space-y-0">
            {services.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.06}>
                <div
                  className="border-t-4 border-black cursor-pointer group"
                  onClick={() => setOpenService(openService === i ? null : i)}
                >
                  <div className="flex items-start justify-between py-8 gap-4">
                    <div className="flex items-baseline gap-6">
                      <span className="text-gray-200 font-black text-6xl" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{s.n}</span>
                      <h3 className="font-black text-2xl md:text-3xl uppercase tracking-tight group-hover:underline" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                        {s.title}
                      </h3>
                    </div>
                    <motion.div animate={{ rotate: openService === i ? 180 : 0 }} transition={{ duration: 0.25 }} className="mt-2">
                      <ChevronDown className="w-6 h-6" />
                    </motion.div>
                  </div>
                  <AnimatePresence>
                    {openService === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="pb-8 text-gray-500 text-lg max-w-2xl leading-relaxed pl-24">{s.desc}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            ))}
            <div className="border-t-4 border-black" />
          </div>
        </div>
      </section>

      {/* Gallery — 3 scroll-rotated images */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-16">
            <h2 className="font-black text-5xl md:text-7xl uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              MATERIAL<br />TRUTH
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ScrollImage src="https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=600&h=800&fit=crop&crop=center" alt="Concrete" width={600} height={800} className="rounded-none w-full aspect-[3/4]" dir={-1} yRange={80} />
            <ScrollImage src="https://images.unsplash.com/photo-1460317442991-0ec209397118?w=600&h=800&fit=crop&crop=center" alt="Structure" width={600} height={800} className="rounded-none w-full aspect-[3/4] mt-16" dir={1} yRange={60} />
            <ScrollImage src="https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=600&h=800&fit=crop&crop=center" alt="Space" width={600} height={800} className="rounded-none w-full aspect-[3/4]" dir={-1} yRange={80} />
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="studio" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-16">
            <h2 className="font-black text-5xl md:text-7xl uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              THE<br />STUDIO
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.1}>
                <div className="group cursor-default">
                  <div className="aspect-square overflow-hidden mb-4 border-4 border-black">
                    <Image
                      src={m.img}
                      alt={m.name}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="font-black text-lg uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{m.name}</div>
                  <div className="text-sm text-gray-500 font-semibold uppercase tracking-widest">{m.role}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section className="py-32 px-6 bg-black text-white">
        <div className="max-w-5xl mx-auto text-center">
          <Reveal>
            <div className="text-xs font-bold tracking-[0.4em] uppercase text-white/30 mb-8">Manifesto</div>
            <p className="font-black leading-[0.9] uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(36px, 6vw, 80px)" }}>
              "BUILDINGS ARE NOT OBJECTS. THEY ARE THE INFRASTRUCTURE OF HUMAN LIFE."
            </p>
            <div className="text-white/30 text-sm font-semibold uppercase tracking-widest mt-8">— Viktor Brunel, Founding Partner</div>
          </Reveal>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="border-4 border-black p-12 md:p-16">
            <Reveal>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div>
                  <h2 className="font-black text-5xl md:text-6xl uppercase mb-8" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                    START A<br />PROJECT.
                  </h2>
                  <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                    Every project starts with a conversation. Tell us what you want to build and we'll tell you if we're the right firm.
                  </p>
                  <div className="space-y-2 text-sm font-semibold">
                    <div>contact@brutco-architecture.com</div>
                    <div>+33 1 42 78 91 00</div>
                    <div>14 Rue des Récollets, 75010 Paris</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <input type="text" placeholder="YOUR NAME" className="w-full border-4 border-black px-5 py-4 font-bold uppercase tracking-widest text-sm focus:outline-none placeholder:text-gray-300" />
                  <input type="email" placeholder="YOUR EMAIL" className="w-full border-4 border-black px-5 py-4 font-bold uppercase tracking-widest text-sm focus:outline-none placeholder:text-gray-300" />
                  <textarea placeholder="DESCRIBE YOUR PROJECT" rows={4} className="w-full border-4 border-black px-5 py-4 font-bold uppercase tracking-widest text-sm focus:outline-none placeholder:text-gray-300 resize-none" />
                  <button className="w-full bg-black text-white font-black uppercase tracking-widest text-sm py-5 hover:bg-gray-900 transition-colors cursor-pointer" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.1rem" }}>
                    SEND MESSAGE →
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 px-6 border-t-4 border-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="font-black text-xl uppercase tracking-[0.2em]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>BRUTCO</div>
          <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-white/40">
            {["Work", "Services", "Studio", "Privacy"].map(l => (
              <a key={l} href="#" className="hover:text-white transition-colors cursor-pointer">{l}</a>
            ))}
          </div>
          <div className="text-white/30 text-xs uppercase tracking-widest">© 2026 Brutco Architecture</div>
        </div>
      </footer>
    </div>
  )
}
