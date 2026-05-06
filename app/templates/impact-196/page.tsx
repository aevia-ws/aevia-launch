"use client"
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, ArrowRight, Gauge, ShieldAlert, Cpu, Activity, MoveRight, ChevronRight, Zap } from "lucide-react"

function Reveal({ children, delay = 0, y = 40 }: { children: React.ReactNode; delay?: number; y?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

function ParallaxImg({ src, alt, speed = 0.5 }: { src: string; alt: string; speed?: number }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"])
  return (
    <div ref={ref} className="relative w-full h-full overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-[-15%] w-[130%] h-[130%]">
        <Image src={src} alt={alt} fill className="object-cover" />
      </motion.div>
    </div>
  )
}

const CARS = [
  { name: "V12 OMEGA", type: "Hypercar", img: "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&q=80&w=1200", hp: "1080", aero: "0.24", accel: "2.1s" },
  { name: "APEX R", type: "Track Focus", img: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=1200", hp: "950", aero: "0.21", accel: "1.9s" },
  { name: "ECHO GT", type: "Grand Tourer", img: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&q=80&w=1200", hp: "720", aero: "0.26", accel: "2.8s" },
]

export default function VulcanAtelier() {
  const [scrolled, setScrolled] = useState(false)
  const heroRef = useRef(null)
  
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.2], ["0%", "50%"])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="bg-[#050505] text-white font-sans min-h-screen selection:bg-red-600 selection:text-white overflow-x-hidden">
      
      {/* ── NAVBAR ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled ? "bg-[#050505]/90 backdrop-blur-xl border-b border-red-600/20 py-4" : "bg-transparent py-8"}`}>
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4">
            <div className="w-8 h-8 bg-red-600 flex items-center justify-center transform -skew-x-12">
              <Zap className="w-4 h-4 text-black" />
            </div>
            <span className="text-xl font-bold tracking-[0.3em] uppercase">Vulcan<span className="text-red-600">.</span></span>
          </Link>
          <div className="hidden lg:flex items-center gap-12 text-[10px] font-bold tracking-[0.3em] uppercase">
            {["Models", "Engineering", "Motorsport", "Atelier"].map((link) => (
              <Link key={link} href="#" className="hover:text-red-600 transition-colors">{link}</Link>
            ))}
          </div>
          <button className="hidden md:flex items-center gap-2 px-8 py-3 bg-white text-black text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-red-600 hover:text-white transition-colors duration-500 transform -skew-x-12">
            Configure
          </button>
        </div>
      </nav>

      <main>
        {/* ── HERO ── */}
        <section className="relative h-[120vh] min-h-[900px] flex items-center justify-center overflow-hidden" ref={heroRef}>
          <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0">
            <Image src="https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&q=80&w=2400" alt="Hypercar" fill className="object-cover opacity-60" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
          </motion.div>
          
          <motion.div style={{ opacity: heroOpacity }} className="relative z-10 w-full max-w-[1800px] px-6 md:px-12 pt-32">
            <Reveal y={50}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-1 bg-red-600" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-red-600">Engineering Beyond Limits</span>
              </div>
            </Reveal>
            <Reveal delay={0.2} y={80}>
              <h1 className="text-[5rem] md:text-[8rem] lg:text-[12rem] font-black uppercase tracking-tighter leading-[0.8] mb-12">
                Apex<br/><span className="text-transparent" style={{ WebkitTextStroke: "2px white" }}>Predator.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.4} y={40}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl border-l border-red-600/30 pl-8">
                <div>
                  <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Power Output</div>
                  <div className="text-3xl font-light">1,080 <span className="text-red-600 text-lg">HP</span></div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Top Speed</div>
                  <div className="text-3xl font-light">236 <span className="text-red-600 text-lg">MPH</span></div>
                </div>
              </div>
            </Reveal>
          </motion.div>
        </section>

        {/* ── ENGINEERING SPLIT ── */}
        <section className="py-32 relative bg-[#050505]">
          <div className="max-w-[1800px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <Reveal>
                <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-none mb-10">
                  Aerodynamic<br/>Supremacy.
                </h2>
                <p className="text-lg text-white/50 font-light leading-relaxed mb-12 max-w-lg">
                  Every curve, every vent, and every plane is dictated by the laws of physics. We don't design cars; we sculpt the air around them.
                </p>
                <div className="space-y-6">
                  {[
                    { icon: Gauge, t: "Active Aero System", d: "Adjusts downforce dynamically in 10ms." },
                    { icon: Cpu, t: "Carbon Monocoque", d: "F1-grade composite structure weighing only 85kg." },
                    { icon: Activity, t: "Telemetry Link", d: "Real-time track data streamed to your engineer." }
                  ].map((f, i) => (
                    <div key={i} className="flex gap-6 items-start">
                      <div className="w-12 h-12 bg-red-600/10 border border-red-600/20 flex items-center justify-center shrink-0">
                        <f.icon className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold uppercase tracking-widest mb-1">{f.t}</h4>
                        <p className="text-sm text-white/40">{f.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
            <div className="h-[80vh] relative">
              <Reveal delay={0.2}>
                <ParallaxImg src="https://images.unsplash.com/photo-1544636331-e26879cd3d92?auto=format&fit=crop&q=80&w=1200" alt="Engineering" />
                <div className="absolute top-10 left-10 p-4 bg-black/50 backdrop-blur-md border border-white/10 font-mono text-xs">
                  <div className="text-red-600 font-bold mb-2">WIND TUNNEL DATA</div>
                  <div>DRAG COEF: 0.24</div>
                  <div>DOWNFORCE: 1200KG @ 200MPH</div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── HORIZONTAL GARAGE ── */}
        <section className="py-32 bg-[#0a0a0a] border-y border-white/5">
          <div className="max-w-[1800px] mx-auto px-6 md:px-12 mb-20 flex justify-between items-end">
            <Reveal>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-red-600 block mb-4">The Bloodline</span>
              <h2 className="text-6xl font-black uppercase tracking-tighter">Current Models</h2>
            </Reveal>
          </div>
          
          <div className="flex gap-12 px-6 md:px-12 overflow-x-auto pb-12 snap-x snap-mandatory hide-scrollbar">
            {CARS.map((car, i) => (
              <div key={i} className="w-[85vw] md:w-[40vw] shrink-0 snap-center group cursor-pointer">
                <Reveal delay={i * 0.1}>
                  <div className="relative aspect-[16/9] overflow-hidden mb-6">
                    <Image src={car.img} alt={car.name} fill className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-6 left-6 flex gap-4">
                      <div className="bg-white/10 backdrop-blur-md px-4 py-2 text-[10px] font-bold uppercase tracking-widest">{car.hp} HP</div>
                      <div className="bg-white/10 backdrop-blur-md px-4 py-2 text-[10px] font-bold uppercase tracking-widest">{car.accel}</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <h3 className="text-3xl font-bold uppercase tracking-widest mb-1">{car.name}</h3>
                      <div className="text-red-600 text-xs font-bold uppercase tracking-[0.2em]">{car.type}</div>
                    </div>
                    <div className="w-12 h-12 bg-red-600 flex items-center justify-center transform -skew-x-12 group-hover:bg-white transition-colors duration-300">
                      <ChevronRight className="w-6 h-6 text-black" />
                    </div>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </section>

        {/* ── BIG CTA ── */}
        <section className="h-screen relative flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=2400" alt="CTA" fill className="object-cover grayscale" />
            <div className="absolute inset-0 bg-red-600/80 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent" />
          </div>
          
          <div className="relative z-10 text-center">
            <Reveal>
              <h2 className="text-[5rem] md:text-[8rem] font-black uppercase tracking-tighter leading-none mb-10">
                Command<br/>The Track.
              </h2>
              <button className="px-12 py-5 bg-white text-black text-xs font-bold uppercase tracking-[0.3em] transform -skew-x-12 hover:bg-black hover:text-white transition-colors duration-500 border border-transparent hover:border-white">
                Build Your Vulcan
              </button>
            </Reveal>
          </div>
        </section>

      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-[#050505] pt-32 pb-12 px-6 border-t border-white/10 relative z-20">
        <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="md:col-span-2">
            <div className="text-3xl font-black tracking-[0.3em] uppercase mb-8">Vulcan<span className="text-red-600">.</span></div>
            <p className="max-w-sm text-sm text-white/40 leading-relaxed mb-8">
              Pushing the boundaries of automotive engineering. Built for the track, unleashed on the road.
            </p>
          </div>
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white mb-8">Vehicles</h4>
            <ul className="space-y-4 text-xs uppercase tracking-widest text-white/50">
              <li><Link href="#" className="hover:text-red-600 transition-colors">V12 Omega</Link></li>
              <li><Link href="#" className="hover:text-red-600 transition-colors">Apex R</Link></li>
              <li><Link href="#" className="hover:text-red-600 transition-colors">Echo GT</Link></li>
              <li><Link href="#" className="hover:text-red-600 transition-colors">Concept Lab</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white mb-8">Company</h4>
            <ul className="space-y-4 text-xs uppercase tracking-widest text-white/50">
              <li><Link href="#" className="hover:text-red-600 transition-colors">Engineering</Link></li>
              <li><Link href="#" className="hover:text-red-600 transition-colors">Motorsport</Link></li>
              <li><Link href="#" className="hover:text-red-600 transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-red-600 transition-colors">Press</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-[1800px] mx-auto pt-8 border-t border-white/10 text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 flex justify-between">
          <span>© 2026 VULCAN AUTOMOTIVE.</span>
          <span>SYSTEM OF APEX PERFORMANCE.</span>
        </div>
      </footer>
    </div>
  )
}
