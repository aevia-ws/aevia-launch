"use client"
import { motion, useScroll, useTransform, useInView, AnimatePresence, useMotionValue, useSpring } from "framer-motion"
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
import { Plane, Globe, Star, MapPin, Phone, Mail, Check, ChevronRight, Menu, X, ArrowRight, Shield, Clock, Award, Users, Heart, Compass, Mountain, Waves, Coffee, Sparkles, Crown, Gem, Calendar, Headphones } from "lucide-react"

// ─── Reveal Component ───────────────────────────────────────────────────────
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  )
}

// ─── Star Rating ─────────────────────────────────────────────────────────────
function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  )
}

// ─── Data ────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Destinations", href: "#destinations" },
  { label: "Services", href: "#services" },
  { label: "Expériences", href: "#experiences" },
  { label: "Tarifs", href: "#tarifs" },
  { label: "À Propos", href: "#about" },
]

const STATS = [
  { value: "1 247", label: "Voyages sur mesure", icon: Plane },
  { value: "98.7%", label: "Taux de satisfaction", icon: Heart },
  { value: "134", label: "Destinations exclusives", icon: Globe },
  { value: "€24 800", label: "Budget moyen par voyage", icon: Crown },
  { value: "12", label: "Compagnies jet privé", icon: Sparkles },
  { value: "18 ans", label: "D'excellence & savoir-faire", icon: Award },
]

const DESTINATIONS = [
  {
    name: "Maldives Privées",
    region: "Océan Indien",
    img: "https://images.unsplash.com/photo-1476514525405-70fb2a832dba?auto=format&fit=crop&q=80&w=800",
    tag: "Exclusif",
    description: "Villas sur pilotis privées, récifs coralliens préservés, dîners au coucher du soleil.",
  },
  {
    name: "Safari Kenya",
    region: "Afrique de l'Est",
    img: "https://images.unsplash.com/photo-1530521954074-e0a103cbe0c6?auto=format&fit=crop&q=80&w=800",
    tag: "Aventure Prestige",
    description: "Migration des gnous, camp de brousse 5 étoiles, guide expert dédié.",
  },
  {
    name: "Japon Impérial",
    region: "Asie",
    img: "https://images.unsplash.com/photo-1488085061851-e223e31e6d0c?auto=format&fit=crop&q=80&w=800",
    tag: "Culture & Luxe",
    description: "Ryokans ultra-exclusifs, cérémonies privées du thé, accès aux temples fermés au public.",
  },
  {
    name: "Patagonie Sauvage",
    region: "Amérique du Sud",
    img: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800",
    tag: "Rare",
    description: "Torres del Paine en hélicoptère, lodge isolé face aux glaciers, nature intacte.",
  },
]

const TESTIMONIALS = [
  {
    name: "Charlotte de Montfort",
    role: "Directrice artistique, Paris",
    avatar: "CM",
    text: "Évasion Dorée a transformé notre lune de miel en un rêve absolu. Chaque détail — du jet privé à la villa sur l'eau — était parfait. Nous ne confierons jamais nos voyages à quelqu'un d'autre.",
    stars: 5,
    destination: "Maldives & Sri Lanka",
  },
  {
    name: "Alexandre Bertrand",
    role: "PDG, Groupe Bertrand Industries",
    avatar: "AB",
    text: "Pour nos incentives d'entreprise au Japon, l'équipe a tout orchestré avec une précision remarquable. Nos 14 collaborateurs sont encore sous le charme, trois mois après.",
    stars: 5,
    destination: "Japon Impérial",
  },
  {
    name: "Isabelle & Marc Fontaine",
    role: "Clients fidèles depuis 9 ans",
    avatar: "IF",
    text: "Nous voyageons avec Évasion Dorée depuis notre premier safari en 2016. Chaque voyage surpasse le précédent. L'écoute, la créativité et le service conciergerie 24h sont incomparables.",
    stars: 5,
    destination: "Kenya, Tanzanie & Zanzibar",
  },
  {
    name: "Sophie Lecomte",
    role: "Chirurgienne, Lyon",
    avatar: "SL",
    text: "Je voyage seule et la sécurité est ma priorité. Évasion Dorée m'a accompagnée en Patagonie avec un guide dédié, un suivi constant et une sérénité totale. Expérience inoubliable.",
    stars: 5,
    destination: "Patagonie & Argentine",
  },
  {
    name: "Thierry Mercier",
    role: "Ambassadeur retraité",
    avatar: "TM",
    text: "Après 30 ans de voyages diplomatiques, je pensais avoir tout vu. Évasion Dorée m'a prouvé le contraire avec un accès exclusif à des sites que je n'aurais jamais pu découvrir seul.",
    stars: 5,
    destination: "Bhoutan & Népal Spirituel",
  },
]

const PRICING = [
  {
    tier: "Essentiel",
    price: "4 900",
    period: "par voyage / personne",
    description: "L'entrée dans le monde du voyage d'exception, pour les escapades courtes et soignées.",
    recommended: false,
    features: [
      "Séjour 5 à 7 nuits, hôtels 5 étoiles sélectionnés",
      "Transferts privés aller-retour",
      "Itinéraire sur mesure personnalisé",
      "Assistance téléphonique 7j/7",
      "Assurance voyage premium incluse",
      "Guide local francophone",
    ],
  },
  {
    tier: "Prestige",
    price: "12 400",
    period: "par voyage / personne",
    description: "L'expérience complète pour ceux qui refusent de faire des compromis sur quoi que ce soit.",
    recommended: true,
    features: [
      "Séjour 10 à 14 nuits, suites et villas exclusives",
      "Vols business class ou charter privé",
      "Conciergerie dédiée 24h/24 7j/7",
      "Expériences privées & accès VIP",
      "Chef privé sur demande",
      "Photographe de voyage (3 jours)",
      "Couverture médicale internationale premium",
      "Rapport qualité-expérience inégalé",
    ],
  },
  {
    tier: "Signature",
    price: "29 900",
    period: "par voyage / personne",
    description: "Le summum du luxe absolu — jet privé, résidences ultra-exclusives, expériences uniques au monde.",
    recommended: false,
    features: [
      "Jet privé aller-retour inclus",
      "Résidences 7 étoiles ou propriétés privées",
      "Conciergerie Ultra-Prestige permanente",
      "Accès aux lieux les plus rares du monde",
      "Chef étoilé pour tout le séjour",
      "Équipe médicale & sécurité dédiée",
      "Photographe & vidéaste professionnel",
      "Cadeaux et surprises exclusifs à chaque étape",
    ],
  },
]

const FAQS = [
  {
    q: "Combien de temps à l'avance dois-je réserver mon voyage ?",
    a: "Pour les destinations les plus exclusives (Maldives, Japon, safari en saison de migration), nous recommandons de nous contacter 6 à 12 mois à l'avance. Pour les destinations moins contraintes, 3 mois suffisent généralement. En cas d'urgence ou de voyage de dernière minute, notre réseau nous permet souvent de réaliser des miracles.",
  },
  {
    q: "Proposez-vous des voyages de noces et anniversaires ?",
    a: "Absolument — c'est l'une de nos spécialités. Nous créons des lunes de miel qui resteront gravées dans votre mémoire à jamais : arrivées en catamaran privé, dîners sur la plage au flambeau, surprises orchestrées à chaque étape. Chaque voyage romantique est unique et traité avec une attention exceptionnelle.",
  },
  {
    q: "Comment fonctionne le service conciergerie 24h/24 ?",
    a: "Dès votre départ, vous avez accès à une ligne directe vers votre conseiller dédié, disponible à toute heure. Besoin d'un médecin à 3h du matin à Tokyo ? D'une table dans un restaurant étoilé complet à Paris ? D'un changement de vol d'urgence ? Notre équipe gère tout, immédiatement, sans exception.",
  },
  {
    q: "Puis-je modifier mon itinéraire après la réservation ?",
    a: "Oui, la flexibilité est au cœur de notre philosophie. Nos voyages sont conçus comme des partitions qui peuvent être réorchestrées jusqu'à 48h avant le départ. Sur place, votre guide ou conciergerie peut adapter le programme en temps réel selon vos envies du moment.",
  },
  {
    q: "Vos voyages sont-ils adaptés aux familles avec enfants ?",
    a: "Nous créons régulièrement des itinéraires famille d'exception — safaris pédagogiques, plongée avec moniteur certifié, camps d'aventure 5 étoiles. Chaque voyage est adapté aux âges et intérêts de vos enfants, avec baby-sitters certifiés et activités spécifiques incluses dans les formules Prestige et Signature.",
  },
  {
    q: "Que comprend exactement votre assurance voyage premium ?",
    a: "Notre assurance couvre l'annulation pour tout motif, les frais médicaux jusqu'à 2 000 000 €, le rapatriement sanitaire, les pertes de bagages et retards de vols. Pour les formules Signature, une couverture médicale avec médecin de garde dédié est incluse.",
  },
  {
    q: "Proposez-vous des voyages de groupe ou incentives d'entreprise ?",
    a: "Oui, nous organisons des voyages pour des groupes de 4 à 50 personnes, que ce soit pour des séminaires, incentives ou anniversaires de groupe. Des tarifs sur mesure sont disponibles. Nos références incluent des entreprises du CAC 40 et des délégations diplomatiques.",
  },
]

// ─── Main Component ───────────────────────────────────────────────────────────
export default function EvasionDoree() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])

  return (
    <div style={{ overflowX: "hidden", scrollBehavior: "smooth" }} className="bg-[#0d1117] text-white">

      {/* ── 1. NAVBAR ─────────────────────────────────────────────────────── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-[#0d1117]/90 backdrop-blur-xl border-b border-[#c9a96e]/20"
      >
        {/* Logo */}
        <Link href="#" className="flex items-center gap-3 cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#c9a96e] to-[#e8d5a3] flex items-center justify-center">
            <Plane className="w-4 h-4 text-[#0d1117]" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-[#f5f0e8]">Évasion</span>
            <span className="text-lg font-bold tracking-tight text-[#c9a96e] ml-1">Dorée</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link key={link.label} href={link.href}
              className="text-sm text-[#c5bfb0] hover:text-[#c9a96e] transition-all duration-200 cursor-pointer tracking-wide">
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => setContactOpen(true)}
            className="px-5 py-2.5 bg-gradient-to-r from-[#c9a96e] to-[#e8d5a3] text-[#0d1117] text-sm font-semibold rounded-full hover:shadow-lg hover:shadow-[#c9a96e]/30 transition-all duration-200 cursor-pointer"
          >
            Planifier mon voyage
          </button>
        </div>

        {/* Mobile */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <button className="md:hidden cursor-pointer p-2">
              <Menu className="w-6 h-6 text-[#c9a96e]" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-[#0d1117] border-[#c9a96e]/20 w-72">
            <div className="flex flex-col gap-6 pt-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c9a96e] to-[#e8d5a3] flex items-center justify-center">
                  <Plane className="w-3.5 h-3.5 text-[#0d1117]" />
                </div>
                <span className="font-bold text-[#f5f0e8]">Évasion <span className="text-[#c9a96e]">Dorée</span></span>
              </div>
              <Separator className="bg-[#c9a96e]/20" />
              {NAV_LINKS.map((link) => (
                <Link key={link.label} href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[#c5bfb0] hover:text-[#c9a96e] transition-all duration-200 cursor-pointer font-medium py-1">
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => { setContactOpen(true); setMobileMenuOpen(false) }}
                className="mt-4 w-full py-3 bg-gradient-to-r from-[#c9a96e] to-[#e8d5a3] text-[#0d1117] font-semibold rounded-full cursor-pointer transition-all duration-200"
              >
                Planifier mon voyage
              </button>
            </div>
          </SheetContent>
        </Sheet>
      </motion.nav>

      {/* ── 2. HERO ───────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Parallax BG */}
        <motion.div className="absolute inset-0 z-0" style={{ y: bgY, scale: heroScale }}>
          <Image
            src="https://images.unsplash.com/photo-1476514525405-70fb2a832dba?auto=format&fit=crop&q=80&w=1920"
            alt="Luxury travel destination"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d1117]/70 via-[#0d1117]/40 to-[#0d1117]/90" />
        </motion.div>

        {/* Hero content */}
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Badge className="mb-6 bg-[#c9a96e]/20 text-[#c9a96e] border-[#c9a96e]/40 px-4 py-1.5 text-xs tracking-widest uppercase">
              Agence de voyages de luxe — Fondée en 2007
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl font-bold leading-tight mb-6"
          >
            <span className="text-[#f5f0e8]">Voyagez comme</span>
            <br />
            <span className="bg-gradient-to-r from-[#c9a96e] via-[#e8d5a3] to-[#c9a96e] bg-clip-text text-transparent">
              jamais auparavant.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-lg md:text-xl text-[#c5bfb0] max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Des itinéraires sur mesure pensés jusqu'au dernier détail — jets privés, villas exclusives,
            expériences introuvables. Votre monde, réinventé.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => setContactOpen(true)}
              className="px-8 py-4 bg-gradient-to-r from-[#c9a96e] to-[#e8d5a3] text-[#0d1117] font-bold rounded-full text-base hover:shadow-xl hover:shadow-[#c9a96e]/40 hover:scale-105 transition-all duration-200 cursor-pointer"
            >
              Créer mon voyage de rêve
            </button>
            <Link href="#destinations"
              className="px-8 py-4 bg-white/10 backdrop-blur-md text-[#f5f0e8] font-semibold rounded-full text-base border border-white/20 hover:bg-white/20 transition-all duration-200 cursor-pointer">
              Découvrir nos destinations
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating stat cards */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 1.0 }}
          className="absolute bottom-16 left-6 md:left-12 z-10 hidden md:block"
        >
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#c9a96e]/20 flex items-center justify-center">
              <Heart className="w-5 h-5 text-[#c9a96e]" />
            </div>
            <div>
              <p className="text-xl font-bold text-[#f5f0e8]">98.7%</p>
              <p className="text-xs text-[#c5bfb0]">Clients satisfaits</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="absolute bottom-16 right-6 md:right-12 z-10 hidden md:block"
        >
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#c9a96e]/20 flex items-center justify-center">
              <Globe className="w-5 h-5 text-[#c9a96e]" />
            </div>
            <div>
              <p className="text-xl font-bold text-[#f5f0e8]">134</p>
              <p className="text-xs text-[#c5bfb0]">Destinations exclusives</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── 3. STATS BAR ──────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#0f1520] border-y border-[#c9a96e]/20">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {STATS.map((stat, i) => (
                <Reveal key={stat.label} delay={i * 0.08}>
                  <div className="text-center group cursor-default">
                    <div className="w-12 h-12 rounded-2xl bg-[#c9a96e]/10 border border-[#c9a96e]/20 flex items-center justify-center mx-auto mb-3 group-hover:bg-[#c9a96e]/20 transition-all duration-200">
                      <stat.icon className="w-5 h-5 text-[#c9a96e]" />
                    </div>
                    <p className="text-2xl font-bold text-[#f5f0e8] mb-1">{stat.value}</p>
                    <p className="text-xs text-[#8a8070] leading-tight">{stat.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 4. FEATURES WITH TABS ─────────────────────────────────────────── */}
      <section id="destinations" className="py-24 bg-[#0d1117]">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-[#c9a96e]/10 text-[#c9a96e] border-[#c9a96e]/30 px-3 py-1 text-xs tracking-widest uppercase">
                Nos Univers
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-[#f5f0e8] mb-4">
                Un service conçu pour<br />
                <span className="text-[#c9a96e]">l'excellence absolue</span>
              </h2>
              <p className="text-[#8a8070] max-w-xl mx-auto text-base leading-relaxed">
                Chaque aspect de votre voyage est orchestré avec une précision horlogère,
                de la première consultation jusqu'au retour chez vous.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <Tabs defaultValue="destinations" className="w-full">
              <TabsList className="grid grid-cols-3 w-full max-w-lg mx-auto mb-12 bg-[#1a2235] border border-[#c9a96e]/20 p-1 rounded-xl">
                <TabsTrigger value="destinations" className="data-[state=active]:bg-[#c9a96e] data-[state=active]:text-[#0d1117] text-[#8a8070] rounded-lg cursor-pointer transition-all duration-200">
                  Destinations
                </TabsTrigger>
                <TabsTrigger value="services" className="data-[state=active]:bg-[#c9a96e] data-[state=active]:text-[#0d1117] text-[#8a8070] rounded-lg cursor-pointer transition-all duration-200">
                  Services
                </TabsTrigger>
                <TabsTrigger value="experiences" className="data-[state=active]:bg-[#c9a96e] data-[state=active]:text-[#0d1117] text-[#8a8070] rounded-lg cursor-pointer transition-all duration-200">
                  Expériences
                </TabsTrigger>
              </TabsList>

              {/* Tab: Destinations */}
              <TabsContent value="destinations">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {DESTINATIONS.map((dest, i) => (
                    <motion.div
                      key={dest.name}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.08 }}
                    >
                      <Card className="bg-[#1a2235] border-[#c9a96e]/10 overflow-hidden group cursor-pointer hover:border-[#c9a96e]/40 transition-all duration-200">
                        <div className="relative h-48 overflow-hidden">
                          <Image src={dest.img} alt={dest.name} fill className="object-cover group-hover:scale-105 transition-all duration-500" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#1a2235] via-transparent to-transparent" />
                          <Badge className="absolute top-3 right-3 bg-[#c9a96e]/90 text-[#0d1117] text-xs border-0 font-semibold">
                            {dest.tag}
                          </Badge>
                        </div>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-1.5 mb-1">
                            <MapPin className="w-3 h-3 text-[#c9a96e]" />
                            <span className="text-xs text-[#8a8070]">{dest.region}</span>
                          </div>
                          <h3 className="font-bold text-[#f5f0e8] mb-2">{dest.name}</h3>
                          <p className="text-xs text-[#8a8070] leading-relaxed">{dest.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              {/* Tab: Services */}
              <TabsContent value="services">
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      icon: Plane,
                      title: "Transport Prestige",
                      desc: "Des vols qui font partie du voyage.",
                      items: [
                        "Jet privé avec sélection d'appareils parmi 12 compagnies",
                        "Business class sur vols commerciaux avec lounge privé",
                        "Hélicoptère pour les liaisons locales",
                        "Yacht de luxe pour les archipels",
                        "Train de nuit grande classe (Orient-Express, etc.)",
                      ],
                    },
                    {
                      icon: Crown,
                      title: "Hébergement d'Exception",
                      desc: "Des adresses que vous ne trouverez pas sur Internet.",
                      items: [
                        "Villas privées avec personnel dédié",
                        "Suites présidentielles dans les palaces mondiaux",
                        "Camps de luxe en pleine nature",
                        "Châteaux et propriétés historiques privatisées",
                        "Ryokans impériaux au Japon",
                      ],
                    },
                    {
                      icon: Headphones,
                      title: "Conciergerie 24/7",
                      desc: "Votre équipe dédiée, où que vous soyez dans le monde.",
                      items: [
                        "Conseiller personnel dédié sur toute la durée du voyage",
                        "Réservations de restaurants étoilés en dernière minute",
                        "Assistance médicale d'urgence internationale",
                        "Gestion des imprévus et changements de programme",
                        "Communication dans 18 langues disponibles",
                      ],
                    },
                  ].map((service, i) => (
                    <motion.div
                      key={service.title}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                    >
                      <Card className="bg-[#1a2235] border-[#c9a96e]/10 p-6 h-full hover:border-[#c9a96e]/40 transition-all duration-200 cursor-default">
                        <CardContent className="p-0">
                          <div className="w-12 h-12 rounded-2xl bg-[#c9a96e]/10 flex items-center justify-center mb-4 border border-[#c9a96e]/20">
                            <service.icon className="w-6 h-6 text-[#c9a96e]" />
                          </div>
                          <h3 className="text-lg font-bold text-[#f5f0e8] mb-2">{service.title}</h3>
                          <p className="text-sm text-[#8a8070] mb-4 leading-relaxed">{service.desc}</p>
                          <ul className="space-y-2">
                            {service.items.map((item) => (
                              <li key={item} className="flex items-start gap-2 text-sm text-[#c5bfb0]">
                                <Check className="w-4 h-4 text-[#c9a96e] mt-0.5 flex-shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              {/* Tab: Experiences */}
              <TabsContent value="experiences">
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      icon: Waves,
                      title: "Mer & Archipels",
                      desc: "Plongez dans les univers aquatiques les plus préservés de la planète.",
                      items: [
                        "Plongée en apnée avec biologistes marins, Maldives",
                        "Croisière privée en Méditerranée (Grèce, Croatie)",
                        "Exploration des fonds marins en sous-marin de luxe",
                        "Pêche au gros sportive avec capitaine expert",
                      ],
                    },
                    {
                      icon: Mountain,
                      title: "Aventure & Nature",
                      desc: "L'adrénaline et la beauté sauvage, sans aucun compromis sur le confort.",
                      items: [
                        "Safari privé avec ranger dédié (Kenya, Tanzanie)",
                        "Trek en Himalaya avec camp de base de luxe",
                        "Survol en hélicoptère des volcans actifs d'Islande",
                        "Nuit sous les étoiles en camp glamping 5 étoiles",
                      ],
                    },
                    {
                      icon: Coffee,
                      title: "Gastronomie & Culture",
                      desc: "Rencontres authentiques avec les traditions culinaires et artistiques mondiales.",
                      items: [
                        "Dîner privé chez des chefs étoilés dans leur cuisine",
                        "Cours de cuisine avec maîtres artisans locaux",
                        "Accès privatisé aux musées et monuments fermés au public",
                        "Masterclass oenologie dans les plus grands domaines viticoles",
                      ],
                    },
                    {
                      icon: Sparkles,
                      title: "Bien-être & Sérénité",
                      desc: "La régénération profonde, dans les cadres les plus apaisants du monde.",
                      items: [
                        "Retraite Ayurveda dans un ashram privé au Kerala",
                        "Spa thermal à Bali avec soins traditionnels",
                        "Yoga en altitude face aux sommets himalayens",
                        "Hammam impérial privatisé à Marrakech",
                      ],
                    },
                  ].map((exp, i) => (
                    <motion.div
                      key={exp.title}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.08 }}
                    >
                      <Card className="bg-[#1a2235] border-[#c9a96e]/10 p-6 hover:border-[#c9a96e]/40 transition-all duration-200 cursor-default">
                        <CardContent className="p-0">
                          <div className="flex items-start gap-4">
                            <div className="w-11 h-11 rounded-xl bg-[#c9a96e]/10 border border-[#c9a96e]/20 flex items-center justify-center flex-shrink-0">
                              <exp.icon className="w-5 h-5 text-[#c9a96e]" />
                            </div>
                            <div>
                              <h3 className="font-bold text-[#f5f0e8] mb-1">{exp.title}</h3>
                              <p className="text-sm text-[#8a8070] mb-3 leading-relaxed">{exp.desc}</p>
                              <ul className="space-y-1.5">
                                {exp.items.map((item) => (
                                  <li key={item} className="flex items-start gap-2 text-sm text-[#c5bfb0]">
                                    <ChevronRight className="w-3.5 h-3.5 text-[#c9a96e] mt-0.5 flex-shrink-0" />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </Reveal>
        </div>
      </section>

      {/* ── 5. TESTIMONIALS CAROUSEL ──────────────────────────────────────── */}
      <section className="py-24 bg-[#0f1520]" id="about">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-14">
              <Badge className="mb-4 bg-[#c9a96e]/10 text-[#c9a96e] border-[#c9a96e]/30 px-3 py-1 text-xs tracking-widest uppercase">
                Témoignages
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-[#f5f0e8] mb-4">
                Ce que disent nos voyageurs
              </h2>
              <p className="text-[#8a8070] max-w-md mx-auto">
                Ils nous ont fait confiance. Voici ce qu'ils vivent avec Évasion Dorée.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Carousel className="w-full">
              <CarouselContent>
                {TESTIMONIALS.map((t, i) => (
                  <CarouselItem key={t.name} className="md:basis-1/2 lg:basis-1/3 pl-4">
                    <Card className="bg-[#1a2235] border-[#c9a96e]/10 p-6 h-full hover:border-[#c9a96e]/30 transition-all duration-200 cursor-default">
                      <CardContent className="p-0 flex flex-col h-full">
                        <StarRating count={t.stars} />
                        <p className="text-[#c5bfb0] text-sm leading-relaxed mt-4 flex-1 italic">
                          "{t.text}"
                        </p>
                        <div className="mt-5 pt-4 border-t border-[#c9a96e]/10">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10 border border-[#c9a96e]/30">
                              <AvatarFallback className="bg-[#c9a96e]/10 text-[#c9a96e] text-xs font-bold">
                                {t.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-semibold text-[#f5f0e8]">{t.name}</p>
                              <p className="text-xs text-[#8a8070]">{t.role}</p>
                            </div>
                          </div>
                          <div className="mt-2 flex items-center gap-1.5">
                            <MapPin className="w-3 h-3 text-[#c9a96e]" />
                            <span className="text-xs text-[#c9a96e]/70">{t.destination}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="bg-[#1a2235] border-[#c9a96e]/30 text-[#c9a96e] hover:bg-[#c9a96e]/10 cursor-pointer -left-4" />
              <CarouselNext className="bg-[#1a2235] border-[#c9a96e]/30 text-[#c9a96e] hover:bg-[#c9a96e]/10 cursor-pointer -right-4" />
            </Carousel>
          </Reveal>
        </div>
      </section>

      {/* ── 6. PRICING ────────────────────────────────────────────────────── */}
      <section id="tarifs" className="py-24 bg-[#0d1117]">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-14">
              <Badge className="mb-4 bg-[#c9a96e]/10 text-[#c9a96e] border-[#c9a96e]/30 px-3 py-1 text-xs tracking-widest uppercase">
                Nos Formules
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-[#f5f0e8] mb-4">
                L'investissement dans<br />
                <span className="text-[#c9a96e]">des souvenirs inoubliables</span>
              </h2>
              <p className="text-[#8a8070] max-w-lg mx-auto">
                Chaque formule est un point de départ. Votre voyage final sera toujours entièrement personnalisé.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {PRICING.map((plan, i) => (
              <Reveal key={plan.tier} delay={i * 0.1}>
                <div className={`relative rounded-2xl p-6 h-full flex flex-col border transition-all duration-200 cursor-default
                  ${plan.recommended
                    ? "bg-gradient-to-b from-[#c9a96e]/15 to-[#1a2235] border-[#c9a96e]/60 shadow-xl shadow-[#c9a96e]/10"
                    : "bg-[#1a2235] border-[#c9a96e]/10 hover:border-[#c9a96e]/30"
                  }`}>
                  {plan.recommended && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-[#c9a96e] text-[#0d1117] font-bold px-4 py-1 text-xs border-0">
                        Recommandé
                      </Badge>
                    </div>
                  )}
                  <div className="mb-5">
                    <h3 className="text-xl font-bold text-[#f5f0e8] mb-1">{plan.tier}</h3>
                    <p className="text-xs text-[#8a8070] leading-relaxed mb-4">{plan.description}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-[#c9a96e]">€{plan.price}</span>
                      <span className="text-xs text-[#8a8070]">{plan.period}</span>
                    </div>
                  </div>
                  <Separator className="bg-[#c9a96e]/15 mb-5" />
                  <ul className="space-y-3 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm text-[#c5bfb0]">
                        <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.recommended ? "text-[#c9a96e]" : "text-[#c9a96e]/60"}`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setContactOpen(true)}
                    className={`mt-6 w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer
                      ${plan.recommended
                        ? "bg-gradient-to-r from-[#c9a96e] to-[#e8d5a3] text-[#0d1117] hover:shadow-lg hover:shadow-[#c9a96e]/30 hover:scale-105"
                        : "bg-[#c9a96e]/10 text-[#c9a96e] border border-[#c9a96e]/30 hover:bg-[#c9a96e]/20"
                      }`}
                  >
                    Commencer ici
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. FAQ ACCORDION ──────────────────────────────────────────────── */}
      <section className="py-24 bg-[#0f1520]">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-14">
              <Badge className="mb-4 bg-[#c9a96e]/10 text-[#c9a96e] border-[#c9a96e]/30 px-3 py-1 text-xs tracking-widest uppercase">
                Questions Fréquentes
              </Badge>
              <h2 className="text-4xl font-bold text-[#f5f0e8] mb-4">
                Tout ce que vous souhaitez savoir
              </h2>
              <p className="text-[#8a8070]">
                Avant votre première consultation, voici les réponses aux questions les plus posées.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Accordion type="single" collapsible className="space-y-3">
              {FAQS.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="bg-[#1a2235] border border-[#c9a96e]/10 rounded-xl px-5 data-[state=open]:border-[#c9a96e]/40 transition-all duration-200"
                >
                  <AccordionTrigger className="text-[#f5f0e8] font-medium text-sm py-4 hover:text-[#c9a96e] cursor-pointer transition-all duration-200 hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#8a8070] text-sm leading-relaxed pb-4">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* ── 8. CTA BANNER ─────────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1530521954074-e0a103cbe0c6?auto=format&fit=crop&q=80&w=1920"
            alt="Luxury destination"
            fill
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d1117] via-[#0d1117]/80 to-[#0d1117]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <Badge className="mb-6 bg-[#c9a96e]/15 text-[#c9a96e] border-[#c9a96e]/40 px-4 py-1.5 text-xs tracking-widest uppercase">
              Consultation Gratuite
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold text-[#f5f0e8] mb-6 leading-tight">
              Votre prochain voyage<br />
              <span className="bg-gradient-to-r from-[#c9a96e] via-[#e8d5a3] to-[#c9a96e] bg-clip-text text-transparent">
                commence ici.
              </span>
            </h2>
            <p className="text-[#c5bfb0] text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              En 30 minutes, nous comprenons vos envies et construisons avec vous
              l'itinéraire qui vous ressemble — sans engagement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setContactOpen(true)}
                className="px-10 py-4 bg-gradient-to-r from-[#c9a96e] to-[#e8d5a3] text-[#0d1117] font-bold rounded-full text-base hover:shadow-2xl hover:shadow-[#c9a96e]/40 hover:scale-105 transition-all duration-200 cursor-pointer inline-flex items-center gap-2"
              >
                Réserver ma consultation <ArrowRight className="w-4 h-4" />
              </button>
              <a href="tel:+33142601234"
                className="px-10 py-4 bg-white/10 backdrop-blur-md text-[#f5f0e8] font-semibold rounded-full text-base border border-white/20 hover:bg-white/20 transition-all duration-200 cursor-pointer inline-flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#c9a96e]" />
                +33 1 42 60 12 34
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 9. FOOTER ─────────────────────────────────────────────────────── */}
      <footer className="bg-[#080d14] border-t border-[#c9a96e]/15 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#c9a96e] to-[#e8d5a3] flex items-center justify-center">
                  <Plane className="w-4 h-4 text-[#0d1117]" />
                </div>
                <div>
                  <span className="text-base font-bold text-[#f5f0e8]">Évasion</span>
                  <span className="text-base font-bold text-[#c9a96e] ml-1">Dorée</span>
                </div>
              </div>
              <p className="text-sm text-[#8a8070] leading-relaxed mb-4">
                Agence de voyages de luxe, fondée en 2007. Spécialistes des itinéraires sur mesure, jets privés et expériences exclusives.
              </p>
              <div className="flex gap-3">
                {[Globe, Globe, Globe, Globe].map((Icon, i) => (
                  <a key={i} href="#"
                    className="w-9 h-9 rounded-xl bg-[#1a2235] border border-[#c9a96e]/15 flex items-center justify-center hover:bg-[#c9a96e]/10 hover:border-[#c9a96e]/40 transition-all duration-200 cursor-pointer">
                    <Icon className="w-4 h-4 text-[#c9a96e]" />
                  </a>
                ))}
              </div>
            </div>

            {/* Destinations */}
            <div>
              <h4 className="text-sm font-semibold text-[#f5f0e8] mb-4 tracking-wide">Destinations</h4>
              <ul className="space-y-2.5">
                {["Maldives & Océan Indien", "Afrique & Safaris", "Asie Impériale", "Amériques Sauvages", "Europe Secrète", "Arctique & Antarctique"].map(d => (
                  <li key={d}>
                    <Link href="#" className="text-sm text-[#8a8070] hover:text-[#c9a96e] transition-all duration-200 cursor-pointer">{d}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-sm font-semibold text-[#f5f0e8] mb-4 tracking-wide">Services</h4>
              <ul className="space-y-2.5">
                {["Jets Privés", "Villas & Palaces", "Voyages de Noces", "Incentives Entreprise", "Voyages Famille", "Conciergerie 24/7"].map(s => (
                  <li key={s}>
                    <Link href="#" className="text-sm text-[#8a8070] hover:text-[#c9a96e] transition-all duration-200 cursor-pointer">{s}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-sm font-semibold text-[#f5f0e8] mb-4 tracking-wide">Contact</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#c9a96e] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-[#8a8070]">12 Avenue Montaigne<br />75008 Paris, France</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#c9a96e] flex-shrink-0" />
                  <a href="tel:+33142601234" className="text-sm text-[#8a8070] hover:text-[#c9a96e] transition-all duration-200 cursor-pointer">+33 1 42 60 12 34</a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#c9a96e] flex-shrink-0" />
                  <a href="mailto:contact@evasion-doree.fr" className="text-sm text-[#8a8070] hover:text-[#c9a96e] transition-all duration-200 cursor-pointer">contact@evasion-doree.fr</a>
                </li>
                <li className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#c9a96e] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-[#8a8070]">Lun–Ven 9h–19h<br />Sam 10h–16h</span>
                </li>
              </ul>
            </div>
          </div>

          <Separator className="bg-[#c9a96e]/10 mb-8" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#8a8070]">
              © 2024 Évasion Dorée. Tous droits réservés. Agence agréée IATA & APST.
            </p>
            <div className="flex gap-6">
              {["Mentions légales", "Confidentialité", "CGV", "Assurance voyage"].map(l => (
                <Link key={l} href="#" className="text-xs text-[#8a8070] hover:text-[#c9a96e] transition-all duration-200 cursor-pointer">{l}</Link>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ── Contact Dialog ─────────────────────────────────────────────────── */}
      <Dialog open={contactOpen} onOpenChange={setContactOpen}>
        <DialogContent className="bg-[#1a2235] border-[#c9a96e]/20 text-white max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-[#f5f0e8] text-xl font-bold">Planifier votre voyage de rêve</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <p className="text-[#8a8070] text-sm">Nos conseillers vous rappellent sous 24h pour une consultation gratuite et sans engagement.</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-[#8a8070] mb-1.5 block">Prénom</label>
                <input className="w-full bg-[#0d1117] border border-[#c9a96e]/20 rounded-lg px-3 py-2.5 text-sm text-white placeholder-[#8a8070] focus:outline-none focus:border-[#c9a96e]/60 transition-all duration-200" placeholder="Marie" />
              </div>
              <div>
                <label className="text-xs text-[#8a8070] mb-1.5 block">Nom</label>
                <input className="w-full bg-[#0d1117] border border-[#c9a96e]/20 rounded-lg px-3 py-2.5 text-sm text-white placeholder-[#8a8070] focus:outline-none focus:border-[#c9a96e]/60 transition-all duration-200" placeholder="Dupont" />
              </div>
            </div>
            <div>
              <label className="text-xs text-[#8a8070] mb-1.5 block">Email</label>
              <input type="email" className="w-full bg-[#0d1117] border border-[#c9a96e]/20 rounded-lg px-3 py-2.5 text-sm text-white placeholder-[#8a8070] focus:outline-none focus:border-[#c9a96e]/60 transition-all duration-200" placeholder="marie@exemple.com" />
            </div>
            <div>
              <label className="text-xs text-[#8a8070] mb-1.5 block">Destination souhaitée</label>
              <input className="w-full bg-[#0d1117] border border-[#c9a96e]/20 rounded-lg px-3 py-2.5 text-sm text-white placeholder-[#8a8070] focus:outline-none focus:border-[#c9a96e]/60 transition-all duration-200" placeholder="Maldives, Japon, Afrique..." />
            </div>
            <div>
              <label className="text-xs text-[#8a8070] mb-1.5 block">Budget approximatif</label>
              <select className="w-full bg-[#0d1117] border border-[#c9a96e]/20 rounded-lg px-3 py-2.5 text-sm text-[#8a8070] focus:outline-none focus:border-[#c9a96e]/60 transition-all duration-200 cursor-pointer">
                <option>Moins de €5 000 / personne</option>
                <option>€5 000 – €15 000 / personne</option>
                <option>€15 000 – €30 000 / personne</option>
                <option>Plus de €30 000 / personne</option>
              </select>
            </div>
            <button className="w-full py-3 bg-gradient-to-r from-[#c9a96e] to-[#e8d5a3] text-[#0d1117] font-bold rounded-xl hover:shadow-lg hover:shadow-[#c9a96e]/30 transition-all duration-200 cursor-pointer">
              Envoyer ma demande
            </button>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  )
}
