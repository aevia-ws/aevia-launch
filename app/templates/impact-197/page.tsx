"use client"
import { motion, useScroll, useTransform, useInView, AnimatePresence, useSpring } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Plane, Globe, Star, MapPin, Menu, ArrowRight, Heart, Crown, Sparkles, Compass, Search } from "lucide-react"

// ─── UTILS & ANIMATION COMPONENTS ─────────────────────────────────────────────

function Reveal({ children, delay = 0, y = 30 }: { children: React.ReactNode; delay?: number; y?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

function MagneticButton({ children, className = "", onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  const ref = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e
    const { height, width, left, top } = ref.current!.getBoundingClientRect()
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 })
  }

  const reset = () => {
    setPosition({ x: 0, y: 0 })
  }

  const { x, y } = position

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.button>
  )
}

function ParallaxImg({ src, alt, speed = 0.5 }: { src: string; alt: string; speed?: number }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"])
  
  return (
    <div ref={ref} className="relative w-full h-full overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-[-20%] w-[140%] h-[140%]">
        <Image src={src} alt={alt} fill className="object-cover" />
      </motion.div>
    </div>
  )
}

// ─── DATA MANIFESTS ─────────────────────────────────────────────────────────

const MANIFEST = {
  hero: {
    subtitle: "Agence de voyages de luxe — Fondée en 2007",
    title: "L'Évasion Dorée.",
    desc: "Des itinéraires sur mesure pensés jusqu'au dernier détail — jets privés, villas exclusives, expériences introuvables. Votre monde, réinventé."
  },
  destinations: [
    { name: "Maldives Privées", region: "Océan Indien", img: "https://images.unsplash.com/photo-1476514525405-70fb2a832dba?auto=format&fit=crop&q=80&w=1200", tag: "Exclusif" },
    { name: "Safari Kenya", region: "Afrique de l'Est", img: "https://images.unsplash.com/photo-1530521954074-e0a103cbe0c6?auto=format&fit=crop&q=80&w=1200", tag: "Aventure" },
    { name: "Japon Impérial", region: "Asie", img: "https://images.unsplash.com/photo-1488085061851-e223e31e6d0c?auto=format&fit=crop&q=80&w=1200", tag: "Culture" },
    { name: "Patagonie", region: "Amérique du Sud", img: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=1200", tag: "Rare" },
    { name: "Santorin", region: "Mer Égée", img: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=1200", tag: "Romance" }
  ],
  services: [
    { num: "01", title: "Transport Prestige", desc: "Jets privés de dernière génération, hélicoptères pour liaisons locales et transferts VIP sur le tarmac." },
    { num: "02", title: "Domaines Privés", desc: "Accès exclusif à des îles privées, des châteaux historiques et des résidences ultra-sécurisées hors marché." },
    { num: "03", title: "Conciergerie 24/7", desc: "Une équipe dédiée disponible jour et nuit pour répondre à vos moindres désirs pendant votre séjour." }
  ],
  philosophy: "Nous ne vendons pas des voyages. Nous orchestrons des moments suspendus dans le temps où l'impossible devient votre quotidien.",
  footer: {
    address: "24 Avenue Montaigne, 75008 Paris",
    phone: "+33 1 84 25 36 90"
  }
}

// ─── MAIN PAGE ──────────────────────────────────────────────────────────────

export default function EvasionDoree() {
  const [scrolled, setScrolled] = useState(false)
  const heroRef = useRef(null)
  
  // Parallax hooks
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.2], ["0%", "40%"])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1])

  // Horizontal Scroll Section
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: horizontalScrollProgress } = useScroll({ target: targetRef })
  const x = useTransform(horizontalScrollProgress, [0, 1], ["0%", "-65%"])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="bg-[#0a0a09] text-[#fcfbf9] font-sans min-h-screen selection:bg-[#c9a96e] selection:text-black overflow-x-hidden">
      
      {/* ─── NAVBAR ────────────────────────────────────────────────────── */}
      <motion.nav 
        initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled ? "bg-[#0a0a09]/80 backdrop-blur-md py-4 border-b border-[#c9a96e]/10" : "bg-transparent py-8"}`}
      >
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full border border-[#c9a96e]/30 flex items-center justify-center group-hover:bg-[#c9a96e] transition-colors duration-500">
              <Plane className="w-4 h-4 text-[#c9a96e] group-hover:text-black transition-colors" />
            </div>
            <span className="text-xl font-light tracking-widest uppercase">Évasion<span className="text-[#c9a96e]">Dorée</span></span>
          </Link>

          <div className="hidden lg:flex items-center gap-12 text-[10px] font-bold tracking-[0.3em] uppercase">
            {["Destinations", "L'Art de Voyager", "Nos Villas", "Conciergerie"].map((link) => (
              <Link key={link} href="#" className="text-white/60 hover:text-[#c9a96e] transition-colors">
                {link}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <MagneticButton className="hidden md:flex items-center justify-center px-8 py-3 bg-white text-black text-[10px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-[#c9a96e] hover:text-white transition-colors duration-500">
              Contactez-nous
            </MagneticButton>
            <Sheet>
              <SheetTrigger asChild>
                <button className="lg:hidden w-12 h-12 flex items-center justify-center border border-white/20 rounded-full">
                  <Menu className="w-5 h-5 text-white" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#0a0a09] border-[#c9a96e]/20 p-12">
                <div className="flex flex-col gap-8 mt-20">
                  {["Destinations", "L'Art de Voyager", "Nos Villas", "Contact"].map((link) => (
                    <Link key={link} href="#" className="text-3xl font-light uppercase tracking-widest hover:text-[#c9a96e] transition-colors">
                      {link}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.nav>

      <main>
        {/* ─── IMMERSIVE PARALLAX HERO ───────────────────────────────────── */}
        <section className="relative h-[120vh] min-h-[900px] overflow-hidden" ref={heroRef}>
          <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0 origin-center">
            <Image 
              src="https://images.unsplash.com/photo-1476514525405-70fb2a832dba?auto=format&fit=crop&q=80&w=2400" 
              alt="Luxury Travel" 
              fill 
              className="object-cover opacity-60"
              priority
            />
          </motion.div>
          
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#0a0a09]" />

          <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <Reveal y={50}>
              <div className="flex items-center gap-4 justify-center mb-8">
                <div className="h-[1px] w-12 bg-[#c9a96e]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#c9a96e]">
                  {MANIFEST.hero.subtitle}
                </span>
                <div className="h-[1px] w-12 bg-[#c9a96e]" />
              </div>
            </Reveal>

            <Reveal delay={0.2} y={80}>
              <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-light tracking-tighter uppercase mb-8 leading-none" style={{ fontFamily: "Georgia, serif" }}>
                L'Évasion<br/><span className="text-[#c9a96e] italic">Dorée.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.4} y={40}>
              <p className="max-w-2xl mx-auto text-sm md:text-lg font-light leading-relaxed text-white/70 mb-12">
                {MANIFEST.hero.desc}
              </p>
            </Reveal>

            <Reveal delay={0.6}>
              <MagneticButton className="px-10 py-5 bg-[#c9a96e] text-black text-[10px] font-bold uppercase tracking-[0.3em] rounded-full hover:bg-white transition-colors duration-500">
                Explorer Le Monde
              </MagneticButton>
            </Reveal>
          </motion.div>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
            <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/40">Scroll</div>
            <motion.div 
              animate={{ y: [0, 10, 0] }} 
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent"
            />
          </div>
        </section>

        {/* ─── PHILOSOPHY (SPLIT PARALLAX) ───────────────────────────────── */}
        <section className="py-32 relative z-10 bg-[#0a0a09]">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <Reveal>
                <h2 className="text-4xl md:text-6xl font-light leading-tight mb-10" style={{ fontFamily: "Georgia, serif" }}>
                  {MANIFEST.philosophy}
                </h2>
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center">
                    <Crown className="w-6 h-6 text-[#c9a96e]" />
                  </div>
                  <div>
                    <div className="text-xl font-light">Service Ultra-Premium</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-white/40">Adhésion sur invitation</div>
                  </div>
                </div>
              </Reveal>
            </div>
            <div className="order-1 lg:order-2">
              <Reveal delay={0.2}>
                <div className="aspect-[4/5] md:aspect-[3/4] relative rounded-t-full overflow-hidden">
                  <ParallaxImg src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=1200" alt="Resort" />
                  <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ─── HORIZONTAL SCROLL DESTINATIONS ────────────────────────────── */}
        <section ref={targetRef} className="relative h-[300vh] bg-[#0a0a09]">
          <div className="sticky top-0 h-screen flex items-center overflow-hidden">
            <div className="absolute top-20 left-12 z-20 hidden md:block">
              <Reveal>
                <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#c9a96e] mb-2">Portfolio</div>
                <h2 className="text-5xl font-light tracking-widest uppercase" style={{ fontFamily: "Georgia, serif" }}>Destinations</h2>
              </Reveal>
            </div>

            <motion.div style={{ x }} className="flex gap-12 px-6 md:px-[20vw] items-center">
              {MANIFEST.destinations.map((dest, i) => (
                <div key={i} className="relative w-[85vw] md:w-[40vw] shrink-0 h-[60vh] md:h-[70vh] group cursor-pointer">
                  <div className="absolute inset-0 overflow-hidden rounded-3xl">
                    <Image src={dest.img} alt={dest.name} fill className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  </div>
                  <div className="absolute inset-0 p-10 flex flex-col justify-end">
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <MapPin className="w-4 h-4 text-[#c9a96e]" />
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c9a96e]">{dest.region}</span>
                        </div>
                        <h3 className="text-4xl md:text-5xl font-light text-white" style={{ fontFamily: "Georgia, serif" }}>{dest.name}</h3>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-[#c9a96e] group-hover:border-[#c9a96e] group-hover:text-black transition-all duration-500">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─── SERVICES (STICKY STACK) ───────────────────────────────────── */}
        <section className="py-40 bg-[#111111] relative z-10 border-t border-white/10">
          <div className="max-w-[1200px] mx-auto px-6">
            <Reveal>
              <div className="text-center mb-32">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#c9a96e] mb-4 block">L'Excellence</span>
                <h2 className="text-5xl md:text-7xl font-light uppercase" style={{ fontFamily: "Georgia, serif" }}>Services Privés</h2>
              </div>
            </Reveal>

            <div className="flex flex-col gap-12">
              {MANIFEST.services.map((service, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="group relative bg-[#0a0a09] border border-white/10 p-12 md:p-16 rounded-[3rem] hover:border-[#c9a96e]/50 transition-colors duration-500 overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#c9a96e]/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-[#c9a96e]/20 transition-colors duration-700" />
                    
                    <div className="grid md:grid-cols-12 gap-8 items-center relative z-10">
                      <div className="md:col-span-3 text-6xl md:text-8xl font-light text-white/10 group-hover:text-[#c9a96e]/20 transition-colors duration-500" style={{ fontFamily: "Georgia, serif" }}>
                        {service.num}
                      </div>
                      <div className="md:col-span-9">
                        <h3 className="text-3xl md:text-4xl font-light mb-4 text-white group-hover:text-[#c9a96e] transition-colors duration-500">{service.title}</h3>
                        <p className="text-white/50 text-lg leading-relaxed max-w-2xl">{service.desc}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─── MASSIVE CTA BANNER ────────────────────────────────────────── */}
        <section className="h-screen relative flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image src="https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&q=80&w=2400" alt="CTA" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          
          <div className="relative z-10 text-center px-6">
            <Reveal>
              <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-light uppercase tracking-tighter mb-8" style={{ fontFamily: "Georgia, serif" }}>
                Prêt à <span className="italic text-[#c9a96e]">Partir ?</span>
              </h2>
              <p className="text-xl font-light text-white/80 max-w-xl mx-auto mb-12">
                Confiez-nous vos rêves, nous en ferons une réalité tangible.
              </p>
              <MagneticButton className="px-12 py-6 bg-white text-black text-[10px] font-bold uppercase tracking-[0.3em] rounded-full hover:bg-[#c9a96e] hover:text-white transition-colors duration-500">
                Demander une consultation
              </MagneticButton>
            </Reveal>
          </div>
        </section>

      </main>

      {/* ─── FOOTER ──────────────────────────────────────────────────────── */}
      <footer className="bg-[#050505] pt-32 pb-12 px-6 relative z-20">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="md:col-span-2">
            <h1 className="text-3xl font-light tracking-[0.2em] uppercase mb-8" style={{ fontFamily: "Georgia, serif" }}>
              Évasion<span className="text-[#c9a96e] italic">Dorée.</span>
            </h1>
            <p className="max-w-md text-sm text-white/50 leading-relaxed font-light mb-8">
              Créateurs de voyages extraordinaires pour une clientèle exigeante, depuis plus d'une décennie.
            </p>
            <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 space-y-2">
              <p>{MANIFEST.footer.address}</p>
              <p>{MANIFEST.footer.phone}</p>
            </div>
          </div>
          
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c9a96e] mb-8">Découvrir</h4>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-white/60">
              <li><Link href="#" className="hover:text-white transition-colors">Destinations</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Expériences</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Jets Privés</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Villas Exclusives</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c9a96e] mb-8">Maison</h4>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-white/60">
              <li><Link href="#" className="hover:text-white transition-colors">Notre Philosophie</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">L'Équipe</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Presse</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="max-w-[1600px] mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">
          <div>© 2026 ÉVASION DORÉE. TOUS DROITS RÉSERVÉS.</div>
          <div className="flex items-center gap-8">
            <Link href="#" className="hover:text-white transition-colors">Instagram</Link>
            <Link href="#" className="hover:text-white transition-colors">Pinterest</Link>
            <Link href="#" className="hover:text-white transition-colors">LinkedIn</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
