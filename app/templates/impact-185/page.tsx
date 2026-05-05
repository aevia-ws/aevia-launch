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
import { ArrowRight, Menu, X, Star, ChevronRight, Play, CheckCircle2, Scissors, Shirt, Diamond, Eye, Camera, ShoppingBag, MapPin, Phone } from "lucide-react"

// ─── REVEAL COMPONENT ────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number, className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── DATA ────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Lookbook", href: "#lookbook" },
  { label: "Collections", href: "#collections" },
  { label: "Maison", href: "#maison" },
  { label: "Boutiques", href: "#boutiques" },
]

const STATS = [
  { value: "1982", label: "Année de Création", suffix: "" },
  { value: "14", label: "Collections Annuelles", suffix: "" },
  { value: "45", label: "Boutiques dans le Monde", suffix: "" },
  { value: "100", label: "Artisans d'Exception", suffix: "+" },
  { value: "0", label: "Plastique dans nos Ateliers", suffix: "%" },
]

const FEATURES = [
  {
    id: "couture",
    title: "Haute Couture",
    icon: <Scissors className="w-5 h-5" />,
    description: "L'expression ultime de notre savoir-faire. Chaque pièce est sculptée à la main dans nos ateliers parisiens, nécessitant des centaines d'heures de travail minutieux.",
    bullets: [
      "Créations uniques sur-mesure",
      "Broderies faites main",
      "Soieries exclusives",
      "Essayages privés en salon"
    ],
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80"
  },
  {
    id: "rtw",
    title: "Prêt-à-Porter",
    icon: <Shirt className="w-5 h-5" />,
    description: "L'allure Velma au quotidien. Des coupes architecturales, des tombés parfaits et des matières nobles sourcées de manière responsable en Europe.",
    bullets: [
      "Tailoring structuré",
      "Mailles en cachemire upcyclé",
      "Denim éthique japonais",
      "Pièces intemporelles"
    ],
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80"
  },
  {
    id: "accessories",
    title: "Accessoires",
    icon: <Diamond className="w-5 h-5" />,
    description: "La touche finale qui définit une silhouette. Maroquinerie sculpturale et joaillerie contemporaine s'allient pour sublimer chaque tenue.",
    bullets: [
      "Cuirs au tannage végétal",
      "Bijoux en or recyclé",
      "Lunettes artisanales",
      "Sacs iconiques numérotés"
    ],
    image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=800&q=80"
  }
]

const TESTIMONIALS = [
  {
    name: "Vogue Paris",
    role: "Revue de Collection Printemps",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    content: "Velma réussit le tour de force de redéfinir le minimalisme. La rigueur des coupes contraste divinement avec la sensualité des drapés. Une masterclass.",
    rating: 5
  },
  {
    name: "Clara D.",
    role: "Cliente VIP",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    content: "Le service en boutique est exceptionnel. La styliste a su composer une garde-robe capsule qui me correspond parfaitement. Les matières sont divines.",
    rating: 5
  },
  {
    name: "GQ Magazine",
    role: "Éditorial",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    content: "Leur nouvelle ligne de tailoring détendu capture exactement l'air du temps. C'est l'uniforme parfait pour la nouvelle génération de créatifs.",
    rating: 5
  },
  {
    name: "Business of Fashion",
    role: "Rapport Annuel",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    content: "L'engagement de Velma envers un sourcing transparent et éthique n'est pas un simple discours marketing. C'est inscrit dans l'ADN même de leurs vêtements.",
    rating: 5
  }
]

const PRICING = [
  {
    id: "style",
    title: "Session Styling",
    subtitle: "Rendez-vous Conseil",
    price: "Offert",
    duration: "1 Heure",
    description: "Prenez rendez-vous avec l'un de nos stylistes experts pour découvrir la nouvelle collection et trouver les pièces qui sublimeront votre silhouette.",
    features: [
      "Styliste dédié en boutique",
      "Sélection de pièces préparée à l'avance",
      "Conseils morphologiques",
      "Rafraîchissements offerts",
      "Sans obligation d'achat"
    ],
    recommended: false
  },
  {
    id: "capsule",
    title: "Garde-Robe Capsule",
    subtitle: "Accompagnement Complet",
    price: "À p. de 2500€",
    duration: "Demi-journée",
    description: "Une refonte complète de votre vestiaire saisonnier. Notre équipe construit avec vous une capsule de 10 à 15 pièces parfaitement coordonnées.",
    features: [
      "Entretien préalable par téléphone",
      "Salon privé réservé (3 heures)",
      "Service de retouches express",
      "Livraison à domicile ou à l'hôtel",
      "Suivi personnalisé par votre conseiller"
    ],
    recommended: true
  },
  {
    id: "surmesure",
    title: "Le Sur-Mesure",
    subtitle: "L'Expérience Ultime",
    price: "Sur Devis",
    duration: "3-4 Semaines",
    description: "Pour les grandes occasions ou l'exigence absolue. Création d'une pièce unique moulée sur vous dans nos ateliers de Haute Couture.",
    features: [
      "Rencontre avec la Directrice de Création",
      "Choix des tissus exclusifs (archives)",
      "Prise de mesures complète",
      "3 essayages (toile, bâti, final)",
      "Patronage conservé à votre nom"
    ],
    recommended: false
  }
]

const FAQS = [
  {
    question: "Où vos vêtements sont-ils fabriqués ?",
    answer: "Plus de 85% de nos collections sont fabriquées en Europe (France, Italie et Portugal) dans des ateliers partenaires de longue date. Notre ligne Haute Couture est entièrement réalisée dans nos ateliers parisiens historiques."
  },
  {
    question: "Quelle est votre politique de retours ?",
    answer: "Vous disposez de 30 jours pour retourner toute pièce non portée, dans son emballage d'origine avec étiquettes. Les retours sont offerts en boutique ou via notre service de coursier dédié pour Paris intra-muros."
  },
  {
    question: "Proposez-vous un service de retouches ?",
    answer: "Oui, un service de retouches gratuit est inclus pour tout achat de prêt-à-porter (ourlets, ajustements de manches ou de taille) pendant la première année suivant votre achat, dans l'ensemble de nos boutiques."
  },
  {
    question: "Vos cuirs sont-ils d'origine éthique ?",
    answer: "Absolument. Nous n'utilisons que des cuirs issus de l'industrie alimentaire (upcycling), traités avec un tannage végétal sans métaux lourds. Nous proposons également une gamme d'accessoires en matériaux alternatifs innovants (mycélium)."
  },
  {
    question: "Comment entretenir les pièces en soie ?",
    answer: "Pour préserver l'éclat de nos soieries, nous recommandons exclusivement un nettoyage à sec par un professionnel. Évitez toute vaporisation directe de parfum sur le vêtement."
  },
  {
    question: "Puis-je privatiser un salon pour un essayage ?",
    answer: "Les salons privés de nos boutiques Flagships peuvent être réservés pour vous et vos invités (jusqu'à 4 personnes). Merci de contacter notre conciergerie avec un préavis de 48 heures."
  },
  {
    question: "Comment authentifier une pièce Velma ?",
    answer: "Toutes nos pièces de maroquinerie et de Haute Couture sont livrées avec un certificat d'authenticité intégrant une puce NFC invisible. Il vous suffit de l'approcher de votre smartphone pour vérifier son origine."
  },
  {
    question: "Proposez-vous des facilités de paiement ?",
    answer: "Pour les commandes exceptionnelles (Garde-robe capsule ou Sur-Mesure), nous proposons des paiements échelonnés sécurisés. Nos conseillers en boutique se feront un plaisir de vous détailler ces options."
  }
]

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────
export default function VelmaEditorialTemplate() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  
  // Parallax Values
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

  return (
    <div ref={containerRef} className="min-h-screen bg-[#F5F5F0] text-[#1A1A1A] font-sans selection:bg-[#1A1A1A] selection:text-white" style={{ overflowX: "hidden", scrollBehavior: "smooth" }}>
      
      {/* ─── 1. NAVBAR (ELEGANT MINIMALIST) ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 mix-blend-difference text-white">
        <div className="max-w-[1600px] mx-auto px-6 h-24 flex items-center justify-between">
          <Link href="/" className="group cursor-pointer">
            <span className="text-3xl font-serif italic tracking-tighter">
              Velma.
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-12">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.label} 
                href={link.href} 
                className="text-xs font-medium tracking-[0.2em] uppercase hover:opacity-50 transition-opacity duration-300 cursor-pointer"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button className="flex items-center gap-2 text-xs font-medium tracking-[0.2em] uppercase hover:opacity-50 transition-opacity cursor-pointer">
              <ShoppingBag className="w-4 h-4" /> (0)
            </button>
            <button className="text-xs font-medium tracking-[0.2em] uppercase hover:opacity-50 transition-opacity cursor-pointer">
              Rechercher
            </button>
          </div>

          {/* Mobile Nav */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="md:hidden p-2 cursor-pointer">
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#1A1A1A] text-white w-full sm:w-[400px] border-none">
              <div className="flex flex-col h-full py-12">
                <span className="text-4xl font-serif italic tracking-tighter mb-16">Velma.</span>
                <div className="flex flex-col gap-8">
                  {NAV_LINKS.map((link) => (
                    <Link 
                      key={link.label} 
                      href={link.href} 
                      className="text-3xl font-light tracking-tight hover:opacity-50 transition-opacity cursor-pointer"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* ─── 2. HERO PARALLAX (OVERSIZED TEXT & BLEND MODE) ─── */}
      <section className="relative h-[100vh] flex items-center justify-center overflow-hidden bg-[#F5F5F0]">
        <motion.div style={{ y: heroY, scale: imageScale }} className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=2000&q=80" 
            alt="Editorial Fashion Campaign" 
            fill 
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Massive Text Overlay with Blend Mode */}
        <motion.div 
          style={{ y: textY }} 
          className="relative z-10 w-full px-4 mix-blend-exclusion text-white text-center pointer-events-none"
        >
          <Reveal>
            <h1 className="text-[18vw] md:text-[15vw] font-serif italic tracking-tighter leading-[0.8]">
              Automne
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-[18vw] md:text-[15vw] font-serif italic tracking-tighter leading-[0.8] ml-12 md:ml-32">
              Hiver
            </h1>
          </Reveal>
        </motion.div>

        <div className="absolute bottom-12 left-0 right-0 flex justify-center z-20">
          <Reveal delay={0.4}>
            <button className="flex flex-col items-center gap-2 text-white mix-blend-difference">
              <span className="text-[10px] font-medium tracking-[0.3em] uppercase">Découvrir la collection</span>
              <motion.div 
                animate={{ y: [0, 8, 0] }} 
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <ArrowRight className="w-4 h-4 rotate-90" />
              </motion.div>
            </button>
          </Reveal>
        </div>
      </section>

      {/* ─── 3. STATS BAR (EDITORIAL LIST) ─── */}
      <section className="py-24 bg-[#1A1A1A] text-white relative z-10">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12 md:gap-4">
            {STATS.map((stat, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="flex flex-col group cursor-pointer border-l border-white/20 pl-6 hover:border-white transition-colors duration-500">
                  <div className="text-4xl md:text-5xl font-serif italic mb-4">
                    {stat.value}<span className="text-xl font-sans not-italic">{stat.suffix}</span>
                  </div>
                  <div className="text-[10px] font-sans font-medium uppercase tracking-[0.2em] text-zinc-400">
                    {stat.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. FEATURES (TABS) ─── */}
      <section id="collections" className="py-32 relative bg-[#F5F5F0]">
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24">
            <Reveal className="max-w-2xl">
              <h2 className="text-[10px] font-medium uppercase tracking-[0.3em] text-zinc-500 mb-6">Le Vestiaire</h2>
              <h3 className="text-5xl md:text-7xl font-serif italic tracking-tighter mb-8">L'Art de l'Allure.</h3>
              <p className="text-lg text-zinc-600 leading-relaxed font-light">
                Chaque pièce est pensée comme une sculpture en mouvement. Nous ne créons pas des vêtements, nous construisons des attitudes.
              </p>
            </Reveal>
          </div>

          <Tabs defaultValue="rtw" className="w-full">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
              <div className="lg:w-1/3">
                <TabsList className="flex flex-col h-auto bg-transparent gap-0 items-start">
                  {FEATURES.map((feature) => (
                    <TabsTrigger 
                      key={feature.id} 
                      value={feature.id}
                      className="w-full justify-start px-0 py-8 text-left text-zinc-400 data-[state=active]:text-[#1A1A1A] hover:text-[#1A1A1A] transition-all duration-300 cursor-pointer rounded-none border-b border-zinc-300 data-[state=active]:border-[#1A1A1A] shadow-none bg-transparent"
                    >
                      <span className="text-2xl md:text-3xl font-serif italic tracking-tight">{feature.title}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                <div className="mt-16 p-8 bg-zinc-100 hidden lg:block">
                  <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4">Le Manifeste</h5>
                  <p className="text-sm leading-relaxed text-zinc-600 mb-6">
                    "La mode passe, le style reste." Nous croyons en une mode lente, réfléchie, où chaque couture a une raison d'être.
                  </p>
                  <Link href="#" className="text-xs font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-zinc-500 transition-colors">
                    Lire notre engagement éthique
                  </Link>
                </div>
              </div>

              <div className="lg:w-2/3">
                <AnimatePresence mode="wait">
                  {FEATURES.map((feature) => (
                    <TabsContent key={feature.id} value={feature.id} className="mt-0 outline-none">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="aspect-[3/4] md:aspect-[16/9] relative w-full overflow-hidden mb-12">
                          <Image src={feature.image} alt={feature.title} fill className="object-cover" />
                        </div>
                        <div className="max-w-2xl">
                          <h4 className="text-3xl font-serif italic mb-6">{feature.title}</h4>
                          <p className="text-lg text-zinc-600 font-light leading-relaxed mb-10">{feature.description}</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                            {feature.bullets.map((bullet, i) => (
                              <div key={i} className="flex items-center gap-4 border-b border-zinc-200 pb-4">
                                <div className="w-1 h-1 bg-[#1A1A1A] rounded-full" />
                                <span className="text-sm font-medium tracking-wide text-zinc-800">{bullet}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </TabsContent>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </Tabs>
        </div>
      </section>

      {/* ─── 5. TESTIMONIALS CAROUSEL ─── */}
      <section className="py-32 bg-zinc-200 overflow-hidden relative">
        <div className="max-w-[1600px] mx-auto px-6 relative z-10">
          <Reveal>
            <div className="mb-20 flex justify-between items-end">
              <div>
                <h2 className="text-[10px] font-medium uppercase tracking-[0.3em] text-zinc-500 mb-4">Revue de Presse</h2>
                <h3 className="text-5xl font-serif italic tracking-tighter">Ils en parlent.</h3>
              </div>
              <div className="hidden md:flex gap-4">
                <CarouselPrevious className="relative inset-auto translate-y-0 bg-transparent border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white w-12 h-12 rounded-full transition-colors" />
                <CarouselNext className="relative inset-auto translate-y-0 bg-transparent border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white w-12 h-12 rounded-full transition-colors" />
              </div>
            </div>
          </Reveal>

          <Carousel className="w-full">
            <CarouselContent>
              {TESTIMONIALS.map((testi, i) => (
                <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3 pl-6">
                  <Reveal delay={i * 0.1}>
                    <Card className="bg-transparent border-none shadow-none cursor-grab active:cursor-grabbing">
                      <CardContent className="p-0 flex flex-col h-full">
                        <div className="flex gap-1 mb-8">
                          {[...Array(testi.rating)].map((_, j) => (
                            <Star key={j} className="w-4 h-4 fill-[#1A1A1A] text-[#1A1A1A]" />
                          ))}
                        </div>
                        <p className="text-2xl font-serif italic leading-relaxed mb-12 text-[#1A1A1A]">
                          "{testi.content}"
                        </p>
                        <div className="flex items-center gap-4 mt-auto">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={testi.avatar} className="grayscale" />
                            <AvatarFallback>VE</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-bold text-sm tracking-wide text-[#1A1A1A]">{testi.name}</div>
                            <div className="text-xs uppercase tracking-widest text-zinc-500">{testi.role}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Reveal>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      {/* ─── 6. PRICING (STYLING SESSIONS) ─── */}
      <section id="services" className="py-32 bg-[#F5F5F0] relative">
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <Reveal>
              <h2 className="text-[10px] font-medium uppercase tracking-[0.3em] text-zinc-500 mb-6">Services Exclusifs</h2>
              <h3 className="text-5xl md:text-7xl font-serif italic tracking-tighter mb-8">Personal Shopper.</h3>
              <p className="text-zinc-600 max-w-xl mx-auto text-lg font-light leading-relaxed">
                Une expérience d'achat intime et sur-mesure. Confiez-nous vos envies, nous concevrons la silhouette parfaite.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {PRICING.map((tier, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <Card className={`relative bg-transparent border ${tier.recommended ? 'border-[#1A1A1A]' : 'border-zinc-300'} rounded-none transition-all duration-300 hover:border-[#1A1A1A] group`}>
                  <CardContent className="p-10 md:p-12">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold mb-4">{tier.duration}</div>
                    <h4 className="text-3xl font-serif italic mb-2">{tier.title}</h4>
                    <div className="text-xs uppercase tracking-widest text-zinc-600 mb-8">{tier.subtitle}</div>
                    
                    <p className="text-sm font-light text-zinc-600 mb-10 h-20 leading-relaxed">{tier.description}</p>
                    
                    <div className="mb-10 pb-10 border-b border-zinc-200">
                      <span className="text-3xl font-medium tracking-tight">{tier.price}</span>
                    </div>

                    <ul className="space-y-4 mb-12">
                      {tier.features.map((feat, j) => (
                        <li key={j} className="flex items-start gap-4 text-sm font-light text-zinc-800">
                          <CheckCircle2 className="w-4 h-4 text-[#1A1A1A] shrink-0 mt-0.5 opacity-50" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    <button className={`w-full py-4 text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-300 ${tier.recommended ? 'bg-[#1A1A1A] text-white hover:bg-zinc-800' : 'bg-transparent border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white'}`}>
                      Prendre Rendez-vous
                    </button>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7. FAQ ACCORDION ─── */}
      <section className="py-32 bg-[#1A1A1A] text-white">
        <div className="max-w-[1000px] mx-auto px-6">
          <Reveal>
            <div className="text-center mb-20">
              <h2 className="text-[10px] font-medium uppercase tracking-[0.3em] text-zinc-400 mb-6">Conciergerie</h2>
              <h3 className="text-5xl font-serif italic tracking-tighter">Vos Questions.</h3>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-white/20">
                  <AccordionTrigger className="text-left font-serif italic text-2xl hover:no-underline py-8 hover:text-zinc-300 transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-lg font-light leading-relaxed pb-8 text-zinc-400">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* ─── 8. CTA BANNER ─── */}
      <section className="py-32 px-6 bg-[#F5F5F0]">
        <Reveal>
          <div className="max-w-[1400px] mx-auto">
            <div className="relative aspect-[21/9] md:aspect-[21/7] overflow-hidden group">
              <Image 
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1600&q=80" 
                alt="Velma Lookbook" 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <h2 className="text-5xl md:text-7xl font-serif italic text-white mb-10">La Nouvelle Collection</h2>
                <button className="px-12 py-5 bg-white text-[#1A1A1A] text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#1A1A1A] hover:text-white transition-colors duration-300">
                  Explorer la boutique
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ─── 9. FOOTER ─── */}
      <footer className="bg-[#F5F5F0] pt-20 pb-12 border-t border-zinc-300">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            <div>
              <Link href="/" className="inline-block mb-10">
                <span className="text-4xl font-serif italic tracking-tighter">
                  Velma.
                </span>
              </Link>
              <p className="text-sm font-light leading-relaxed mb-8 text-zinc-600 max-w-xs">
                Maison de création fondée à Paris. Redéfinir l'élégance contemporaine par la pureté des lignes et l'exigence des matières.
              </p>
            </div>

            <div>
              <h4 className="font-bold uppercase tracking-[0.2em] text-[10px] mb-8 text-[#1A1A1A]">La Maison</h4>
              <ul className="space-y-5">
                <li><a href="#" className="font-light text-sm hover:text-zinc-500 transition-colors cursor-pointer">Notre Histoire</a></li>
                <li><a href="#" className="font-light text-sm hover:text-zinc-500 transition-colors cursor-pointer">Nos Engagements Éthiques</a></li>
                <li><a href="#" className="font-light text-sm hover:text-zinc-500 transition-colors cursor-pointer">Carrières</a></li>
                <li><a href="#" className="font-light text-sm hover:text-zinc-500 transition-colors cursor-pointer">Presse & Éditoriaux</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold uppercase tracking-[0.2em] text-[10px] mb-8 text-[#1A1A1A]">Service Client</h4>
              <ul className="space-y-5">
                <li><a href="#" className="font-light text-sm hover:text-zinc-500 transition-colors cursor-pointer">Livraison & Retours</a></li>
                <li><a href="#" className="font-light text-sm hover:text-zinc-500 transition-colors cursor-pointer">Guide des Tailles</a></li>
                <li><a href="#" className="font-light text-sm hover:text-zinc-500 transition-colors cursor-pointer">Entretien des Pièces</a></li>
                <li><a href="#" className="font-light text-sm hover:text-zinc-500 transition-colors cursor-pointer">Prendre Rendez-vous</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold uppercase tracking-[0.2em] text-[10px] mb-8 text-[#1A1A1A]">Nous Contacter</h4>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <MapPin className="w-4 h-4 text-zinc-400 mt-1 shrink-0" />
                  <span className="text-sm font-light text-zinc-600">32 Rue de la Couture<br/>75008 Paris, France</span>
                </li>
                <li className="flex items-center gap-4">
                  <Phone className="w-4 h-4 text-zinc-400" />
                  <span className="text-sm font-light text-zinc-600">+33 (0)1 40 20 00 00</span>
                </li>
                <li className="flex items-center gap-4 pt-4">
                  <a href="#" className="w-10 h-10 border border-zinc-300 flex items-center justify-center hover:bg-[#1A1A1A] hover:text-white transition-colors"><Camera className="w-4 h-4" /></a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8 pt-8 border-t border-zinc-300 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
            <p>&copy; 2026 MAISON VELMA PARIS. TOUS DROITS RÉSERVÉS.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-[#1A1A1A] transition-colors cursor-pointer">Mentions Légales</a>
              <a href="#" className="hover:text-[#1A1A1A] transition-colors cursor-pointer">Politique de Confidentialité</a>
              <a href="#" className="hover:text-[#1A1A1A] transition-colors cursor-pointer">CGV</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}
