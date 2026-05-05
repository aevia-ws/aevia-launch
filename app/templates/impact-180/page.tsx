"use client"

import { motion, useScroll, useTransform, useInView, AnimatePresence, useMotionValue, useSpring } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, Menu, X, Star, Clock, Shield, Award, ChevronRight, Play, MapPin, Phone, Mail, Camera, Scissors, Wind, Sparkles, Map, Droplets, Droplet, User, Calendar, CheckCircle2 } from "lucide-react"

// ─── REVEAL COMPONENT ────────────────────────────────────────────────────────
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

// ─── DATA ────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Le Salon", href: "#salon" },
  { label: "Services", href: "#services" },
  { label: "Tarifs", href: "#tarifs" },
  { label: "Réservation", href: "#reservation" },
]

const STATS = [
  { value: "15", label: "Années d'Expertise", suffix: "" },
  { value: "4", label: "Salons Parisiens", suffix: "" },
  { value: "25", label: "Maîtres Barbiers", suffix: "+" },
  { value: "10", label: "Marques Premium", suffix: "" },
  { value: "4.9", label: "Note Clientèle", suffix: "/5" },
]

const FEATURES = [
  {
    id: "coupe",
    title: "La Coupe Signature",
    icon: <Scissors className="w-6 h-6" />,
    description: "Une maîtrise parfaite des techniques classiques et contemporaines. Nos maîtres barbiers analysent votre morphologie pour créer une coupe sur-mesure qui reflète votre style unique.",
    bullets: [
      "Consultation morphologique complète",
      "Shampoing et soin profond",
      "Coupe ciseaux et finition tondeuse",
      "Coiffage et conseils d'entretien"
    ],
    image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&q=80"
  },
  {
    id: "barbe",
    title: "Taille de Barbe",
    icon: <User className="w-6 h-6" />,
    description: "L'art du rasage traditionnel à l'ancienne. Un rituel de détente absolu combinant serviettes chaudes, huiles précieuses et précision au coupe-choux.",
    bullets: [
      "Rituel de la serviette chaude",
      "Application d'huiles essentielles pré-rasage",
      "Taille et tracé au coupe-choux",
      "Soin hydratant et massage facial"
    ],
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&q=80"
  },
  {
    id: "soin",
    title: "Soins Prémium",
    icon: <Droplets className="w-6 h-6" />,
    description: "Des rituels de soin profonds pour le cuir chevelu et la peau. Nous utilisons exclusivement des produits biologiques haut de gamme pour une vitalité restaurée.",
    bullets: [
      "Gommage exfoliant du cuir chevelu",
      "Masque à l'argile purifiant",
      "Soin de la barbe à l'huile d'argan",
      "Massage crânien relaxant (15 min)"
    ],
    image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&q=80"
  }
]

const TESTIMONIALS = [
  {
    name: "Arthur de Villepin",
    role: "Client fidèle depuis 5 ans",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    content: "Le seul salon à Paris où je confie ma barbe les yeux fermés. Le rituel de la serviette chaude est un moment d'évasion exceptionnel.",
    rating: 5
  },
  {
    name: "Lucas Mercer",
    role: "Directeur Artistique",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    content: "L'ambiance est incroyable. On s'y sent bien, la musique est bonne, et la coupe est toujours millimétrée. Une adresse incontournable.",
    rating: 5
  },
  {
    name: "Thomas Laurent",
    role: "Entrepreneur",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80",
    content: "Je viens toutes les semaines pour mon entretien régulier. Le service est toujours au top, et l'équipe est aux petits soins.",
    rating: 5
  },
  {
    name: "Mathieu V.",
    role: "Nouveau client",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    content: "Première expérience aujourd'hui et je suis conquis. Les conseils morphologiques m'ont fait adopter une toute nouvelle coupe qui me correspond bien mieux.",
    rating: 5
  }
]

const PRICING = [
  {
    id: "coupe",
    title: "L'Essentiel",
    subtitle: "Coupe & Coiffage",
    price: "45 €",
    duration: "45 min",
    description: "Le classique indémodable. Une coupe millimétrée adaptée à votre style.",
    features: [
      "Consultation personnalisée",
      "Shampoing traitant",
      "Coupe sur-mesure",
      "Coiffage & finitions",
      "Boisson offerte"
    ],
    recommended: false
  },
  {
    id: "complet",
    title: "Le Complet",
    subtitle: "Coupe & Barbe",
    price: "75 €",
    duration: "1h 15min",
    description: "L'expérience signature. L'association parfaite d'une coupe de cheveux et d'un rituel barbe.",
    features: [
      "Tous les services de L'Essentiel",
      "Taille de barbe personnalisée",
      "Rituel serviette chaude",
      "Tracé au coupe-choux",
      "Soin hydratant barbe & visage"
    ],
    recommended: true
  },
  {
    id: "vip",
    title: "L'Absolu VIP",
    subtitle: "Soin Complet",
    price: "120 €",
    duration: "2h",
    description: "Le summum du raffinement. Un moment de détente absolue pour une mise en beauté totale.",
    features: [
      "Tous les services du Complet",
      "Soin exfoliant du visage",
      "Masque noir purifiant",
      "Massage crânien prolongé",
      "Épilation sourcils/nez/oreilles",
      "Coupe de champagne"
    ],
    recommended: false
  }
]

const FAQS = [
  {
    question: "Dois-je obligatoirement prendre rendez-vous ?",
    answer: "Nous fonctionnons principalement sur rendez-vous pour vous garantir un service ponctuel et sans précipitation. Toutefois, nous acceptons les clients sans rendez-vous (walk-ins) selon nos disponibilités du jour."
  },
  {
    question: "Quelle est votre politique en cas de retard ?",
    answer: "Nous accordons un délai de grâce de 10 minutes. Au-delà, pour respecter les clients suivants, nous pourrons être amenés à raccourcir votre prestation ou à vous proposer de reprogrammer le rendez-vous."
  },
  {
    question: "Quels types de produits utilisez-vous ?",
    answer: "Nous sommes fiers de travailler avec des marques premium et respectueuses de l'environnement (Aveda, Proraso, et notre propre ligne bio). Tous nos produits sont garantis sans sulfates et non testés sur les animaux."
  },
  {
    question: "Proposez-vous des cartes cadeaux ?",
    answer: "Oui, des cartes cadeaux sont disponibles en salon et sur notre site web. Elles sont valables 1 an dans l'ensemble de nos établissements pour tous nos services et produits."
  },
  {
    question: "Les enfants sont-ils acceptés ?",
    answer: "Bien sûr. Nous accueillons les jeunes gentlemen à partir de 8 ans, avec un tarif réduit du mardi au jeudi (voir notre carte des tarifs en salon)."
  },
  {
    question: "Comment puis-je modifier ou annuler mon rendez-vous ?",
    answer: "Vous pouvez modifier ou annuler votre rendez-vous via le lien reçu dans votre email de confirmation, ou en nous appelant directement. Nous demandons un préavis de 24h pour toute annulation."
  }
]

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────
export default function EssentialSalonTemplate() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  
  // Parallax Values
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  // Mouse Parallax for Floating Card
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      mouseX.set((e.clientX - innerWidth / 2) / 25)
      mouseY.set((e.clientY - innerHeight / 2) / 25)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0A0A0A] text-[#EFEFEF] font-sans" style={{ overflowX: "hidden", scrollBehavior: "smooth" }}>
      
      {/* ─── 1. NAVBAR STICKY ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <Link href="/" className="flex flex-col group cursor-pointer">
            <span className="text-2xl font-black tracking-tighter uppercase text-white group-hover:text-[#D4AF37] transition-colors duration-300">
              ESSENTIAL<span className="text-[#D4AF37]">.</span>
            </span>
            <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-bold">Barbershop</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.label} 
                href={link.href} 
                className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-400 hover:text-white transition-all duration-200 cursor-pointer"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-6">
            <button className="px-8 py-3 bg-white text-black text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#D4AF37] hover:text-black transition-all duration-300 cursor-pointer">
              Réserver
            </button>
          </div>

          {/* Mobile Nav */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="md:hidden p-2 text-white cursor-pointer">
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#0A0A0A] border-l border-white/10 text-white w-[300px]">
              <div className="flex flex-col gap-8 mt-16">
                {NAV_LINKS.map((link) => (
                  <Link 
                    key={link.label} 
                    href={link.href} 
                    className="text-xl font-black tracking-widest uppercase text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {link.label}
                  </Link>
                ))}
                <Separator className="bg-white/10 my-4" />
                <button className="px-6 py-4 bg-white text-black text-sm font-bold tracking-widest uppercase cursor-pointer">
                  Prendre Rendez-vous
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* ─── 2. HERO PARALLAX (SPLIT SCREEN EFFECT) ─── */}
      <section className="relative h-[100vh] flex flex-col md:flex-row items-center overflow-hidden bg-[#0A0A0A]">
        {/* Left Side (Text) */}
        <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-6 md:px-16 pt-32 md:pt-0 relative z-10">
          <motion.div style={{ y: textY }}>
            <Reveal>
              <Badge className="bg-white/5 text-[#D4AF37] hover:bg-white/10 border border-[#D4AF37]/30 mb-8 uppercase tracking-[0.2em] px-4 py-2 cursor-pointer transition-all duration-300">
                <Star className="w-3 h-3 mr-2 inline fill-current" /> Élu meilleur salon de l'année
              </Badge>
            </Reveal>
            
            <Reveal delay={0.1}>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-6 leading-[0.9] uppercase">
                L'Art du <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 to-zinc-600">
                  Grooming.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-lg text-zinc-400 font-light tracking-wide max-w-md mb-12 leading-relaxed">
                Bien plus qu'une simple coupe. Un sanctuaire dédié à l'élégance masculine, alliant techniques traditionnelles et tendances contemporaines.
              </p>
            </Reveal>

            <Reveal delay={0.3} className="flex flex-col sm:flex-row items-center gap-6">
              <button className="w-full sm:w-auto px-10 py-5 bg-white text-black font-black uppercase tracking-[0.2em] text-sm hover:scale-105 hover:bg-[#D4AF37] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-300 cursor-pointer">
                Réserver
              </button>
              <Dialog>
                <DialogTrigger asChild>
                  <button className="w-full sm:w-auto px-10 py-5 border border-white/20 bg-white/5 text-white font-bold uppercase tracking-[0.2em] text-sm hover:bg-white/10 transition-all duration-300 cursor-pointer flex items-center justify-center gap-3">
                    <Play className="w-4 h-4" /> La Visite
                  </button>
                </DialogTrigger>
                <DialogContent className="bg-[#0A0A0A] border-white/10 text-white sm:max-w-[800px] p-0 overflow-hidden">
                  <div className="aspect-video relative w-full bg-black flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full border-t-2 border-[#D4AF37] animate-spin" />
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=1600&q=80')] bg-cover opacity-50 mix-blend-screen" />
                  </div>
                </DialogContent>
              </Dialog>
            </Reveal>
          </motion.div>
        </div>

        {/* Right Side (Image Parallax) */}
        <div className="w-full md:w-1/2 h-full absolute md:relative right-0 top-0 opacity-30 md:opacity-100">
          <motion.div style={{ y: heroY, opacity: opacityHero }} className="absolute inset-[-10%] w-[120%] h-[120%]">
            <Image 
              src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1600&q=80" 
              alt="Barbershop intérieur" 
              fill 
              className="object-cover grayscale contrast-125"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-transparent to-transparent hidden md:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent md:hidden" />
          </motion.div>
        </div>

        {/* Floating Glassmorphism Card */}
        <motion.div 
          style={{ x: springX, y: springY }}
          className="hidden lg:flex absolute bottom-20 right-20 z-20 items-center gap-5 p-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl cursor-pointer hover:border-white/30 transition-colors duration-300"
        >
          <div className="flex -space-x-4">
            <Avatar className="w-12 h-12 border-2 border-black">
              <AvatarImage src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80" />
            </Avatar>
            <Avatar className="w-12 h-12 border-2 border-black">
              <AvatarImage src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80" />
            </Avatar>
            <Avatar className="w-12 h-12 border-2 border-black">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80" />
            </Avatar>
          </div>
          <div>
            <div className="flex items-center gap-1 mb-1">
              <Star className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
              <Star className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
              <Star className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
              <Star className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
              <Star className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
            </div>
            <div className="text-xs uppercase tracking-widest text-white font-bold">1,200+ Avis vérifiés</div>
          </div>
        </motion.div>
      </section>

      {/* ─── 3. STATS BAR ─── */}
      <section className="py-20 border-y border-white/10 bg-black relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12 md:gap-4 divide-x-0 md:divide-x divide-white/10">
            {STATS.map((stat, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="flex flex-col items-center text-center cursor-pointer group">
                  <div className="text-4xl lg:text-5xl font-black text-white mb-3 group-hover:text-[#D4AF37] transition-colors duration-300">
                    {stat.value}<span className="text-[#D4AF37]">{stat.suffix}</span>
                  </div>
                  <div className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-bold">
                    {stat.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. FEATURES (TABS) ─── */}
      <section id="services" className="py-32 relative bg-[#0F0F0F]">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <Reveal>
              <h2 className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-bold mb-4">Notre Expertise</h2>
              <h3 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter">Nos Services</h3>
              <p className="text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                Des prestations haut de gamme réalisées par des artisans passionnés, maîtrisant l'art classique et moderne.
              </p>
            </Reveal>
          </div>

          <Tabs defaultValue="coupe" className="w-full flex flex-col lg:flex-row gap-12 lg:gap-20">
            <div className="lg:w-1/3">
              <TabsList className="flex flex-col h-auto bg-transparent gap-4 items-stretch">
                {FEATURES.map((feature) => (
                  <TabsTrigger 
                    key={feature.id} 
                    value={feature.id}
                    className="justify-start px-8 py-6 text-left data-[state=active]:bg-white data-[state=active]:text-black text-zinc-500 hover:text-white hover:bg-white/5 transition-all duration-300 cursor-pointer rounded-none border border-transparent"
                  >
                    <div className="flex items-center gap-6">
                      <div>{feature.icon}</div>
                      <span className="text-sm font-black uppercase tracking-[0.1em]">{feature.title}</span>
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <div className="lg:w-2/3">
              <AnimatePresence mode="wait">
                {FEATURES.map((feature) => (
                  <TabsContent key={feature.id} value={feature.id} className="mt-0 outline-none">
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.5 }}
                      className="bg-[#141414] border border-white/5 overflow-hidden shadow-2xl group"
                    >
                      <div className="aspect-[16/9] relative w-full overflow-hidden">
                        <Image src={feature.image} alt={feature.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent opacity-80" />
                      </div>
                      <div className="p-10 md:p-14 relative z-10 -mt-20">
                        <h4 className="text-3xl font-black uppercase tracking-tighter text-white mb-6">{feature.title}</h4>
                        <p className="text-zinc-400 leading-relaxed mb-10 text-lg">{feature.description}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                          {feature.bullets.map((bullet, i) => (
                            <div key={i} className="flex items-center gap-4">
                              <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0" />
                              <span className="text-sm text-zinc-300 font-bold tracking-wide">{bullet}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </TabsContent>
                ))}
              </AnimatePresence>
            </div>
          </Tabs>
        </div>
      </section>

      {/* ─── 5. TESTIMONIALS CAROUSEL ─── */}
      <section className="py-32 bg-black border-y border-white/5 overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40rem] font-black opacity-5 text-white pointer-events-none whitespace-nowrap">
          REVIEWS
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Reveal>
            <div className="text-center mb-20">
              <h2 className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-bold mb-4">Testimonials</h2>
              <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">Ce qu'ils disent</h3>
            </div>
          </Reveal>

          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {TESTIMONIALS.map((testi, i) => (
                <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/2 pl-6">
                  <Reveal delay={i * 0.1}>
                    <Card className="bg-[#111] border-white/10 hover:border-white/30 transition-colors duration-300 cursor-pointer h-full rounded-none">
                      <CardContent className="p-10 flex flex-col h-full justify-between">
                        <div>
                          <div className="flex gap-1 mb-8">
                            {[...Array(testi.rating)].map((_, j) => (
                              <Star key={j} className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />
                            ))}
                          </div>
                          <p className="text-zinc-300 text-lg leading-relaxed font-serif italic mb-10">
                            "{testi.content}"
                          </p>
                        </div>
                        <div className="flex items-center gap-6 border-t border-white/10 pt-8 mt-auto">
                          <Avatar className="w-14 h-14 border border-white/20">
                            <AvatarImage src={testi.avatar} />
                            <AvatarFallback>ES</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-white font-bold text-sm tracking-wider uppercase mb-1">{testi.name}</div>
                            <div className="text-zinc-500 text-xs uppercase tracking-[0.2em]">{testi.role}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Reveal>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-6 mt-16">
              <CarouselPrevious className="relative inset-auto translate-y-0 bg-transparent border-white/20 text-white hover:bg-white hover:text-black w-12 h-12 transition-colors rounded-none" />
              <CarouselNext className="relative inset-auto translate-y-0 bg-transparent border-white/20 text-white hover:bg-white hover:text-black w-12 h-12 transition-colors rounded-none" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* ─── 6. PRICING ─── */}
      <section id="tarifs" className="py-32 bg-[#0A0A0A] relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-[#0A0A0A] to-[#0A0A0A] opacity-50" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <Reveal>
              <h2 className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-bold mb-4">Investissement</h2>
              <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-6">Carte des Soins</h3>
              <p className="text-zinc-500 max-w-xl mx-auto text-lg leading-relaxed">
                Des forfaits transparents, un service sans compromis. L'excellence a un prix juste.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end">
            {PRICING.map((tier, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <Card className={`relative bg-[#111] border ${tier.recommended ? 'border-white shadow-[0_0_50px_rgba(255,255,255,0.1)] lg:-translate-y-8 z-10' : 'border-white/10'} hover:border-white/50 transition-all duration-300 cursor-pointer overflow-hidden rounded-none`}>
                  {tier.recommended && (
                    <div className="absolute top-0 inset-x-0 bg-white text-black text-xs font-black uppercase tracking-[0.2em] text-center py-2">
                      Le Plus Populaire
                    </div>
                  )}
                  <CardContent className={`p-10 ${tier.recommended ? 'pt-14' : ''}`}>
                    <div className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-bold mb-2">{tier.duration}</div>
                    <h4 className="text-3xl font-black uppercase tracking-tighter text-white mb-2">{tier.title}</h4>
                    <div className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-8">{tier.subtitle}</div>
                    
                    <p className="text-sm text-zinc-400 mb-10 h-10 leading-relaxed">{tier.description}</p>
                    
                    <div className="flex items-baseline gap-2 mb-10 border-b border-white/10 pb-10">
                      <span className="text-5xl font-black text-white">{tier.price}</span>
                    </div>

                    <ul className="space-y-5 mb-12">
                      {tier.features.map((feat, j) => (
                        <li key={j} className="flex items-start gap-4 text-sm text-zinc-300 font-medium">
                          <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    <button className={`w-full py-5 text-sm font-black uppercase tracking-[0.2em] transition-all duration-300 rounded-none ${tier.recommended ? 'bg-white text-black hover:bg-[#D4AF37]' : 'bg-transparent border border-white/20 text-white hover:bg-white hover:text-black'}`}>
                      Réserver ce soin
                    </button>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7. FAQ ACCORDION ─── */}
      <section className="py-32 bg-[#0F0F0F] border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-20">
              <h2 className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-bold mb-4">Guide</h2>
              <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">Foire aux questions</h3>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-white/10">
                  <AccordionTrigger className="text-left text-white hover:text-[#D4AF37] hover:no-underline font-bold text-lg py-8 transition-colors uppercase tracking-wider">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-zinc-400 leading-relaxed pb-8 text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* ─── 8. CTA BANNER ─── */}
      <section className="py-24 px-6 relative z-10 bg-[#0A0A0A]">
        <Reveal>
          <div className="max-w-6xl mx-auto bg-white text-black p-12 md:p-24 text-center relative overflow-hidden group shadow-2xl">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=1600&q=80')] bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity duration-1000 grayscale" />
            
            <div className="relative z-10">
              <Scissors className="w-16 h-16 text-black mx-auto mb-10" />
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">Prêt pour la<br/>transformation ?</h2>
              <p className="text-lg text-zinc-700 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
                Réservez votre créneau dès maintenant. Nos maîtres barbiers vous attendent pour une expérience hors du commun.
              </p>
              <button className="px-14 py-6 bg-black text-white font-black uppercase tracking-[0.2em] text-sm hover:scale-105 hover:bg-[#D4AF37] transition-all duration-300 cursor-pointer shadow-xl">
                Prendre Rendez-vous
              </button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ─── 9. FOOTER ─── */}
      <footer className="bg-[#050505] pt-32 pb-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            <div>
              <Link href="/" className="flex flex-col items-start gap-1 mb-8 cursor-pointer">
                <span className="text-3xl font-black tracking-tighter uppercase text-white">
                  ESSENTIAL<span className="text-[#D4AF37]">.</span>
                </span>
                <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-600 font-bold">Barbershop</span>
              </Link>
              <p className="text-sm leading-relaxed mb-8 text-zinc-500 font-medium">
                L'artisanat du grooming poussé à son paroxysme. L'adresse de référence pour les gentlemen exigeants.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 bg-white/5 flex items-center justify-center hover:text-black hover:bg-white transition-colors cursor-pointer"><Camera className="w-5 h-5" /></a>
                <a href="#" className="w-12 h-12 bg-white/5 flex items-center justify-center hover:text-black hover:bg-white transition-colors cursor-pointer"><Wind className="w-5 h-5" /></a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-black uppercase tracking-[0.2em] text-sm mb-8">Navigation</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-zinc-500 hover:text-white font-bold uppercase tracking-widest text-xs transition-colors cursor-pointer">Le Salon</a></li>
                <li><a href="#" className="text-zinc-500 hover:text-white font-bold uppercase tracking-widest text-xs transition-colors cursor-pointer">Nos Services</a></li>
                <li><a href="#" className="text-zinc-500 hover:text-white font-bold uppercase tracking-widest text-xs transition-colors cursor-pointer">L'Équipe</a></li>
                <li><a href="#" className="text-zinc-500 hover:text-white font-bold uppercase tracking-widest text-xs transition-colors cursor-pointer">Réserver</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-black uppercase tracking-[0.2em] text-sm mb-8">Horaires</h4>
              <ul className="space-y-4 text-sm font-medium text-zinc-500">
                <li className="flex justify-between">
                  <span>Lundi - Vendredi</span>
                  <span className="text-white">09:00 - 20:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Samedi</span>
                  <span className="text-white">09:00 - 19:00</span>
                </li>
                <li className="flex justify-between text-[#D4AF37]">
                  <span>Dimanche</span>
                  <span>Fermé</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-black uppercase tracking-[0.2em] text-sm mb-8">Contact</h4>
              <ul className="space-y-5">
                <li className="flex items-start gap-4 text-sm text-zinc-400 font-medium">
                  <MapPin className="w-5 h-5 text-white shrink-0" />
                  <span>14 Rue de la Paix<br/>75002 Paris<br/>France</span>
                </li>
                <li className="flex items-center gap-4 text-sm text-zinc-400 font-medium">
                  <Phone className="w-5 h-5 text-white" /> +33 (0)1 42 00 00 00
                </li>
                <li className="flex items-center gap-4 text-sm text-zinc-400 font-medium">
                  <Mail className="w-5 h-5 text-white" /> hello@essential-barber.com
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">
            <p>&copy; 2026 ESSENTIAL BARBERSHOP. TOUS DROITS RÉSERVÉS.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors cursor-pointer">Mentions Légales</a>
              <a href="#" className="hover:text-white transition-colors cursor-pointer">Confidentialité</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}
