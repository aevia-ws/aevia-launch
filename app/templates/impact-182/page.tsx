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
import { ArrowRight, Menu, X, Star, Clock, Shield, MapPin, Phone, Mail, Camera, Play, CheckCircle2, Bed, Coffee, Utensils, Wind, Calendar } from "lucide-react"

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
  { label: "L'Hôtel", href: "#hotel" },
  { label: "Expériences", href: "#experiences" },
  { label: "Chambres & Suites", href: "#suites" },
  { label: "Le Spa", href: "#spa" },
]

const STATS = [
  { value: "5", label: "Étoiles Palace", suffix: "" },
  { value: "120", label: "Chambres & Suites", suffix: "" },
  { value: "3", label: "Restaurants Étoilés", suffix: "" },
  { value: "2,000", label: "Mètres Carrés de Spa", suffix: "m²" },
  { value: "1905", label: "Année de Fondation", suffix: "" },
]

const FEATURES = [
  {
    id: "hebergement",
    title: "L'Art de Vivre",
    icon: <Bed className="w-6 h-6" />,
    description: "Chaque chambre et suite est une déclaration d'élégance parisienne classique, mêlant antiquités sélectionnées, soieries précieuses et technologie contemporaine discrète.",
    bullets: [
      "Vues imprenables sur la capitale",
      "Service majordome 24/7",
      "Linge de lit en satin de coton 600 fils",
      "Produits d'accueil sur-mesure"
    ],
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80"
  },
  {
    id: "gastronomie",
    title: "Haute Gastronomie",
    icon: <Utensils className="w-6 h-6" />,
    description: "Sous la direction de notre Chef triplement étoilé, découvrez une partition culinaire d'exception où le produit de saison est magnifié dans des écrins époustouflants.",
    bullets: [
      "Restaurant Gastronomique 3 étoiles",
      "Brasserie élégante & Jardin d'Hiver",
      "Bar à cocktails historique",
      "Cave comptant plus de 40 000 flacons"
    ],
    image: "https://images.unsplash.com/photo-1414235077428-338988a2e8c0?w=800&q=80"
  },
  {
    id: "bien-etre",
    title: "Le Spa Impérial",
    icon: <Wind className="w-6 h-6" />,
    description: "Un sanctuaire de sérénité au cœur de l'effervescence urbaine. Piscine de 25 mètres baignée de lumière naturelle, cabines de soins privatives et rituels signature exclusifs.",
    bullets: [
      "Piscine intérieure chauffée",
      "Parcours hydrothérapique",
      "Soins esthétiques d'exception",
      "Coaching sportif personnalisé"
    ],
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80"
  }
]

const TESTIMONIALS = [
  {
    name: "Eleanor Vance",
    role: "Auteure & Voyageuse",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    content: "Mon séjour à la Suite Impériale fut magique. Le niveau d'anticipation et d'attention aux détails par le personnel est sans égal dans l'hôtellerie mondiale.",
    rating: 5
  },
  {
    name: "Richard Sterling",
    role: "Éditeur, Luxury Travel",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    content: "Le Grand Hotel redéfinit la notion même de Palace. La rénovation récente a su préserver l'âme historique tout en insufflant une modernité absolue.",
    rating: 5
  },
  {
    name: "Sophie Laurent",
    role: "Collectionneuse d'Art",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    content: "Dîner au restaurant gastronomique est une expérience transcendantale. Le sommelier a su trouver l'accord parfait pour couronner une soirée inoubliable.",
    rating: 5
  },
  {
    name: "James Chen",
    role: "CEO, Horizon Group",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80",
    content: "L'intimité et la discrétion dont fait preuve l'équipe sont remarquables. Le spa est également le meilleur de la ville.",
    rating: 5
  }
]

const PRICING = [
  {
    id: "deluxe",
    title: "Chambre Deluxe",
    subtitle: "Élégance Parisienne",
    price: "850 €",
    duration: "/ nuit",
    description: "Un écrin de raffinement de 45m² avec vue sur la cour intérieure marbrée. Le confort absolu pour une escapade citadine.",
    features: [
      "Lit King-size avec surmatelas",
      "Salle de bain en marbre de Carrare",
      "Accès illimité au Spa Impérial",
      "Mini-bar de courtoisie (sans alcool)",
      "Service en chambre 24h/24"
    ],
    recommended: false
  },
  {
    id: "prestige",
    title: "Suite Prestige",
    subtitle: "L'Espace et la Lumière",
    price: "2 200 €",
    duration: "/ nuit",
    description: "75m² de pur luxe avec salon séparé et vue panoramique sur les toits de la capitale. L'expérience Palace par excellence.",
    features: [
      "Espace salon privé de 30m²",
      "Vue directe sur les monuments",
      "Petit-déjeuner américain inclus",
      "Transferts aéroport en limousine",
      "Accueil VIP et champagne en chambre"
    ],
    recommended: true
  },
  {
    id: "imperiale",
    title: "Suite Impériale",
    subtitle: "Le Sommet du Luxe",
    price: "8 500 €",
    duration: "/ nuit",
    description: "Une résidence somptueuse de 200m² au dernier étage. Terrasse privée, salle à manger et œuvres d'art exclusives.",
    features: [
      "Terrasse paysagée de 50m²",
      "Service d'un majordome dédié",
      "Salle à manger pour 8 convives",
      "Cuisine privée équipée",
      "Accès prioritaire aux restaurants étoilés",
      "Soins quotidiens au Spa inclus"
    ],
    recommended: false
  }
]

const FAQS = [
  {
    question: "Quelles sont vos politiques d'annulation ?",
    answer: "Pour les réservations flexibles, l'annulation est sans frais jusqu'à 48 heures avant l'arrivée (15h, heure locale). Au-delà, la première nuit sera facturée. Pour les Suites Signatures, des conditions spécifiques s'appliquent."
  },
  {
    question: "Le Spa est-il accessible aux clients de l'extérieur ?",
    answer: "Oui, notre Spa Impérial accueille les clients non-résidents sur réservation préalable. Cependant, l'accès à la piscine intérieure est réservé exclusivement aux clients séjournant à l'hôtel ou ayant réservé un soin de plus de 2 heures."
  },
  {
    question: "Acceptez-vous les animaux de compagnie ?",
    answer: "Nous sommes ravis d'accueillir vos chiens ou chats de petite taille (moins de 10 kg). Un supplément de 50€ par jour s'applique, incluant un lit sur-mesure, des gamelles et des friandises confectionnées par notre Chef Pâtissier."
  },
  {
    question: "Proposez-vous un service de transfert depuis l'aéroport ?",
    answer: "Notre flotte de limousines avec chauffeurs privés est à votre disposition pour assurer vos transferts depuis et vers tous les aéroports et gares. Ce service est offert pour toute réservation d'une Suite."
  },
  {
    question: "À quelle heure le check-in et le check-out s'effectuent-ils ?",
    answer: "L'enregistrement s'effectue à partir de 15h00 et le départ jusqu'à 12h00. Selon les disponibilités, nous serons ravis d'organiser un check-in anticipé ou un départ tardif sur simple demande."
  },
  {
    question: "Existe-t-il un code vestimentaire pour les restaurants ?",
    answer: "Pour notre restaurant gastronomique 3 étoiles, la veste est exigée pour les messieurs et une tenue de soirée est recommandée. Pour la brasserie, une tenue élégante décontractée (smart casual) est parfaitement adaptée."
  },
  {
    question: "Disposez-vous d'un parking privé pour les clients ?",
    answer: "Oui, un parking privé et sécurisé en sous-sol est à la disposition exclusive de nos clients. Un service de voiturier est inclus, ainsi que des bornes de recharge ultra-rapides pour les véhicules électriques."
  }
]

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────
export default function GrandHotelTemplate() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  
  // Parallax Values
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "45%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const opacityHero = useTransform(scrollYProgress, [0, 0.25], [1, 0])

  return (
    <div ref={containerRef} className="min-h-screen bg-[#1A1A1A] text-[#F9F6F0] font-serif selection:bg-[#D4AF37] selection:text-black" style={{ overflowX: "hidden", scrollBehavior: "smooth" }}>
      
      {/* ─── 1. NAVBAR STICKY ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1A1A1A]/80 backdrop-blur-xl border-b border-white/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <Link href="/" className="flex flex-col items-center group cursor-pointer">
            <span className="text-2xl font-serif tracking-[0.15em] uppercase text-white group-hover:text-[#D4AF37] transition-colors duration-300">
              Le Grand Hotel
            </span>
            <span className="text-[9px] tracking-[0.4em] uppercase text-[#D4AF37] font-sans mt-1">Paris 1905</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.label} 
                href={link.href} 
                className="text-xs font-sans tracking-[0.2em] uppercase text-zinc-400 hover:text-[#D4AF37] transition-all duration-200 cursor-pointer"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-6">
            <button className="text-xs font-sans tracking-widest uppercase text-white hover:text-[#D4AF37] transition-colors cursor-pointer">
              EN / FR
            </button>
            <button className="px-8 py-3.5 bg-[#D4AF37] text-black text-xs font-sans font-bold tracking-[0.2em] uppercase hover:bg-white transition-all duration-300 cursor-pointer rounded-sm">
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
            <SheetContent side="right" className="bg-[#1A1A1A] border-l border-white/10 text-white w-[300px]">
              <div className="flex flex-col gap-8 mt-16 font-serif">
                {NAV_LINKS.map((link) => (
                  <Link 
                    key={link.label} 
                    href={link.href} 
                    className="text-xl tracking-widest uppercase text-zinc-400 hover:text-[#D4AF37] transition-colors cursor-pointer"
                  >
                    {link.label}
                  </Link>
                ))}
                <Separator className="bg-white/10 my-4" />
                <button className="px-6 py-4 bg-[#D4AF37] text-black text-sm font-sans font-bold tracking-widest uppercase rounded-sm cursor-pointer">
                  Vérifier les disponibilités
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* ─── 2. HERO PARALLAX ─── */}
      <section className="relative h-[100vh] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY, opacity: opacityHero }} className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1542314831-c6a4d1409e50?w=2000&q=80" 
            alt="Le Grand Hotel Facade" 
            fill 
            className="object-cover brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent" />
        </motion.div>

        <motion.div style={{ y: textY }} className="relative z-10 max-w-5xl mx-auto px-6 text-center mt-20">
          <Reveal>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-16 h-px bg-[#D4AF37]" />
              <div className="flex gap-1">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />)}
              </div>
              <div className="w-16 h-px bg-[#D4AF37]" />
            </div>
          </Reveal>
          
          <Reveal delay={0.1}>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tighter text-white mb-8 leading-[0.9] drop-shadow-2xl">
              L'Élégance <br />
              <span className="italic text-[#D4AF37]">Intemporelle.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-lg md:text-xl text-zinc-300 font-sans font-light tracking-wide max-w-2xl mx-auto mb-12 leading-relaxed">
              Un joyau architectural où se rencontrent l'histoire de la capitale et le luxe contemporain. Vivez la véritable hospitalité parisienne.
            </p>
          </Reveal>

          <Reveal delay={0.3} className="flex flex-col sm:flex-row items-center justify-center gap-6 font-sans">
            <button className="w-full sm:w-auto px-10 py-5 bg-[#D4AF37] text-black font-bold uppercase tracking-[0.2em] text-sm hover:scale-105 transition-all duration-300 cursor-pointer rounded-sm shadow-[0_10px_30px_rgba(212,175,55,0.2)]">
              Réserver votre Séjour
            </button>
            <Dialog>
              <DialogTrigger asChild>
                <button className="w-full sm:w-auto px-10 py-5 border border-white/30 bg-black/30 backdrop-blur-md text-white font-bold uppercase tracking-[0.2em] text-sm hover:bg-white/10 transition-all duration-300 cursor-pointer flex items-center justify-center gap-3 rounded-sm">
                  <Play className="w-4 h-4 text-[#D4AF37]" /> Découvrir l'Hôtel
                </button>
              </DialogTrigger>
              <DialogContent className="bg-[#1A1A1A] border-white/10 text-white sm:max-w-[1000px] p-0 overflow-hidden">
                <div className="aspect-video relative w-full bg-black flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full border-t-2 border-[#D4AF37] animate-spin" />
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1600&q=80')] bg-cover opacity-60 mix-blend-screen" />
                </div>
              </DialogContent>
            </Dialog>
          </Reveal>
        </motion.div>
      </section>

      {/* ─── 3. STATS BAR ─── */}
      <section className="py-20 border-b border-white/5 bg-[#141414] relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12 md:gap-4 divide-x-0 md:divide-x divide-white/10">
            {STATS.map((stat, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="flex flex-col items-center text-center cursor-pointer group">
                  <div className="text-4xl lg:text-5xl font-light text-white mb-3 group-hover:text-[#D4AF37] transition-colors duration-300">
                    {stat.value}<span className="text-[#D4AF37] font-sans text-2xl">{stat.suffix}</span>
                  </div>
                  <div className="text-[10px] font-sans uppercase tracking-[0.2em] text-zinc-500 font-bold">
                    {stat.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. FEATURES (TABS) ─── */}
      <section id="experiences" className="py-32 relative bg-[#1A1A1A]">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <Reveal>
              <h2 className="text-xs font-sans uppercase tracking-[0.3em] text-[#D4AF37] font-bold mb-4">L'Expérience</h2>
              <h3 className="text-4xl md:text-6xl font-light text-white mb-6">Un Art de Recevoir</h3>
              <p className="text-zinc-400 font-sans max-w-2xl mx-auto leading-relaxed text-lg">
                Au-delà de l'hébergement, nous créons des moments rares. Gastronomie, bien-être et services sur-mesure s'accordent pour sublimer votre séjour.
              </p>
            </Reveal>
          </div>

          <Tabs defaultValue="hebergement" className="w-full flex flex-col lg:flex-row gap-16">
            <div className="lg:w-1/3">
              <TabsList className="flex flex-col h-auto bg-transparent gap-4 items-stretch font-sans">
                {FEATURES.map((feature) => (
                  <TabsTrigger 
                    key={feature.id} 
                    value={feature.id}
                    className="justify-start px-8 py-6 text-left data-[state=active]:bg-[#222] data-[state=active]:text-white text-zinc-500 hover:text-white transition-all duration-300 cursor-pointer rounded-none border-l-2 border-transparent data-[state=active]:border-[#D4AF37]"
                  >
                    <div className="flex items-center gap-6">
                      <div className="opacity-70">{feature.icon}</div>
                      <span className="text-sm font-bold uppercase tracking-[0.1em]">{feature.title}</span>
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
                      className="bg-[#222] border border-white/5 overflow-hidden shadow-2xl group"
                    >
                      <div className="aspect-[16/9] relative w-full overflow-hidden">
                        <Image src={feature.image} alt={feature.title} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#222] to-transparent opacity-90" />
                      </div>
                      <div className="p-10 md:p-14 relative z-10 -mt-20">
                        <h4 className="text-4xl font-light text-white mb-6 italic">{feature.title}</h4>
                        <p className="text-zinc-400 font-sans leading-relaxed mb-10 text-lg">{feature.description}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 font-sans">
                          {feature.bullets.map((bullet, i) => (
                            <div key={i} className="flex items-start gap-4">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-2 shrink-0" />
                              <span className="text-sm text-zinc-300 tracking-wide">{bullet}</span>
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
      <section className="py-32 bg-[#141414] border-y border-white/5 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Reveal>
            <div className="text-center mb-20">
              <h2 className="text-xs font-sans uppercase tracking-[0.3em] text-[#D4AF37] font-bold mb-4">Livre d'Or</h2>
              <h3 className="text-4xl md:text-5xl font-light text-white">Mémoires de Voyage</h3>
            </div>
          </Reveal>

          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {TESTIMONIALS.map((testi, i) => (
                <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/2 pl-6">
                  <Reveal delay={i * 0.1}>
                    <Card className="bg-[#1A1A1A] border border-white/10 hover:border-[#D4AF37]/40 transition-colors duration-500 cursor-pointer h-full rounded-none">
                      <CardContent className="p-10 flex flex-col h-full justify-between">
                        <div>
                          <div className="flex gap-1 mb-8">
                            {[...Array(testi.rating)].map((_, j) => (
                              <Star key={j} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                            ))}
                          </div>
                          <p className="text-zinc-300 text-xl leading-relaxed font-light italic mb-10">
                            "{testi.content}"
                          </p>
                        </div>
                        <div className="flex items-center gap-6 pt-6 border-t border-white/10 mt-auto font-sans">
                          <Avatar className="w-14 h-14 border border-white/20">
                            <AvatarImage src={testi.avatar} />
                            <AvatarFallback>GH</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-white font-bold text-sm tracking-widest uppercase mb-1">{testi.name}</div>
                            <div className="text-[#D4AF37] text-xs uppercase tracking-[0.1em]">{testi.role}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Reveal>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-6 mt-16">
              <CarouselPrevious className="relative inset-auto translate-y-0 bg-transparent border-white/30 text-white hover:bg-white hover:text-black w-12 h-12 transition-colors rounded-full" />
              <CarouselNext className="relative inset-auto translate-y-0 bg-transparent border-white/30 text-white hover:bg-white hover:text-black w-12 h-12 transition-colors rounded-full" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* ─── 6. PRICING ─── */}
      <section id="suites" className="py-32 bg-[#1A1A1A] relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <Reveal>
              <h2 className="text-xs font-sans uppercase tracking-[0.3em] text-[#D4AF37] font-bold mb-4">Réservation</h2>
              <h3 className="text-4xl md:text-5xl font-light text-white mb-6">Chambres & Suites</h3>
              <p className="text-zinc-400 font-sans max-w-xl mx-auto text-lg leading-relaxed">
                Une collection de résidences parisiennes pensées pour offrir un confort absolu et une intimité préservée.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end font-sans">
            {PRICING.map((tier, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <Card className={`relative bg-[#141414] border ${tier.recommended ? 'border-[#D4AF37] shadow-[0_0_40px_rgba(212,175,55,0.15)] z-10 lg:-translate-y-4' : 'border-white/10'} hover:border-[#D4AF37]/50 transition-all duration-500 cursor-pointer overflow-hidden rounded-none`}>
                  {tier.recommended && (
                    <div className="absolute top-0 inset-x-0 bg-[#D4AF37] text-black text-xs font-bold uppercase tracking-[0.2em] text-center py-2">
                      L'Expérience Recommandée
                    </div>
                  )}
                  <CardContent className={`p-10 ${tier.recommended ? 'pt-14' : ''}`}>
                    <h4 className="text-3xl font-serif text-white mb-2">{tier.title}</h4>
                    <div className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold mb-6">{tier.subtitle}</div>
                    <p className="text-sm text-zinc-400 mb-10 h-16 leading-relaxed">{tier.description}</p>
                    
                    <div className="flex items-baseline gap-2 mb-10 border-b border-white/10 pb-10">
                      <span className="text-4xl font-light text-white font-serif">{tier.price}</span>
                      <span className="text-sm text-zinc-500">{tier.duration}</span>
                    </div>

                    <ul className="space-y-5 mb-12">
                      {tier.features.map((feat, j) => (
                        <li key={j} className="flex items-start gap-4 text-sm text-zinc-300">
                          <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    <button className={`w-full py-5 text-sm font-bold uppercase tracking-[0.1em] transition-colors duration-300 rounded-sm ${tier.recommended ? 'bg-[#D4AF37] text-black hover:bg-white hover:text-black' : 'bg-transparent border border-white/30 text-white hover:bg-white hover:text-black'}`}>
                      Vérifier les disponibilités
                    </button>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7. FAQ ACCORDION ─── */}
      <section className="py-32 bg-[#141414]">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-20">
              <h2 className="text-xs font-sans uppercase tracking-[0.3em] text-[#D4AF37] font-bold mb-4">Informations</h2>
              <h3 className="text-4xl font-light text-white">Préparer votre Séjour</h3>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <Accordion type="single" collapsible className="w-full font-sans">
              {FAQS.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-white/10">
                  <AccordionTrigger className="text-left text-white hover:text-[#D4AF37] hover:no-underline font-medium text-lg py-8 transition-colors">
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
      <section className="py-24 px-6 relative z-10 bg-[#1A1A1A]">
        <Reveal>
          <div className="max-w-6xl mx-auto bg-[#141414] border border-[#D4AF37]/30 p-12 md:p-24 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1600&q=80')] bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity duration-1000" />
            
            <div className="relative z-10 font-sans">
              <div className="w-12 h-12 border border-[#D4AF37] rotate-45 mx-auto mb-12 flex items-center justify-center">
                <div className="w-8 h-8 border border-[#D4AF37] -rotate-45" />
              </div>
              <h2 className="text-4xl md:text-6xl font-light text-white mb-8 font-serif italic">Rendez-vous à Paris</h2>
              <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
                Nos concierges Clefs d'Or se tiennent à votre entière disposition pour organiser chaque détail de votre prochaine escapade parisienne.
              </p>
              <button className="px-14 py-6 bg-[#D4AF37] text-black font-bold uppercase tracking-[0.2em] text-sm hover:bg-white transition-colors duration-300 cursor-pointer rounded-sm">
                Contacter la Conciergerie
              </button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ─── 9. FOOTER ─── */}
      <footer className="bg-[#0A0A0A] pt-32 pb-12 font-sans border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            <div>
              <Link href="/" className="flex flex-col items-start gap-1 mb-8 cursor-pointer">
                <span className="text-2xl font-serif tracking-[0.1em] uppercase text-white">
                  Le Grand Hotel
                </span>
                <span className="text-[9px] tracking-[0.4em] uppercase text-[#D4AF37]">Paris 1905</span>
              </Link>
              <p className="text-sm leading-relaxed mb-8 text-zinc-500 font-medium">
                Une institution parisienne. L'élégance à la française sublimée par un service d'une attention constante depuis plus d'un siècle.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] transition-all cursor-pointer text-white"><Camera className="w-4 h-4" /></a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-[0.2em] text-xs mb-8">L'Hôtel</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-zinc-500 hover:text-[#D4AF37] transition-colors text-sm cursor-pointer">L'Histoire</a></li>
                <li><a href="#" className="text-zinc-500 hover:text-[#D4AF37] transition-colors text-sm cursor-pointer">Chambres & Suites</a></li>
                <li><a href="#" className="text-zinc-500 hover:text-[#D4AF37] transition-colors text-sm cursor-pointer">Restaurants & Bars</a></li>
                <li><a href="#" className="text-zinc-500 hover:text-[#D4AF37] transition-colors text-sm cursor-pointer">Le Spa Impérial</a></li>
                <li><a href="#" className="text-zinc-500 hover:text-[#D4AF37] transition-colors text-sm cursor-pointer">Événements Privés</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-[0.2em] text-xs mb-8">Découvrir</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-zinc-500 hover:text-[#D4AF37] transition-colors text-sm cursor-pointer">Offres Spéciales</a></li>
                <li><a href="#" className="text-zinc-500 hover:text-[#D4AF37] transition-colors text-sm cursor-pointer">Guide de Paris</a></li>
                <li><a href="#" className="text-zinc-500 hover:text-[#D4AF37] transition-colors text-sm cursor-pointer">Cartes Cadeaux</a></li>
                <li><a href="#" className="text-zinc-500 hover:text-[#D4AF37] transition-colors text-sm cursor-pointer">Carrières</a></li>
                <li><a href="#" className="text-zinc-500 hover:text-[#D4AF37] transition-colors text-sm cursor-pointer">Presse</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-[0.2em] text-xs mb-8">Contact & Accès</h4>
              <ul className="space-y-6">
                <li className="flex items-start gap-4 text-sm text-zinc-400">
                  <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0" />
                  <span>1 Place du Grand Palace<br/>75008 Paris, France</span>
                </li>
                <li className="flex items-center gap-4 text-sm text-zinc-400">
                  <Phone className="w-5 h-5 text-[#D4AF37]" /> +33 (0)1 40 00 00 00
                </li>
                <li className="flex items-center gap-4 text-sm text-zinc-400">
                  <Mail className="w-5 h-5 text-[#D4AF37]" /> reservations@grandhotel.com
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">
            <p>&copy; 2026 LE GRAND HOTEL PARIS. TOUS DROITS RÉSERVÉS.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors cursor-pointer">Mentions Légales</a>
              <a href="#" className="hover:text-white transition-colors cursor-pointer">Données Personnelles</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}
