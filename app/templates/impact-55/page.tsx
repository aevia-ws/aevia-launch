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
import { ArrowRight, Menu, X, Star, Clock, Shield, Award, ChevronRight, Play, Watch, Compass, Diamond, Sparkles, MapPin, Phone, Mail, Camera, MessageCircle, Globe, Briefcase, } from "lucide-react"

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
  { label: "Collections", href: "#collections" },
  { label: "Savoir-Faire", href: "#savoir-faire" },
  { label: "Héritage", href: "#heritage" },
  { label: "Boutiques", href: "#boutiques" },
]

const STATS = [
  { value: "1894", label: "Fondation", suffix: "" },
  { value: "12", label: "Brevets Exclusifs", suffix: "+" },
  { value: "850", label: "Heures d'Assemblage", suffix: "h" },
  { value: "100", label: "Étanche", suffix: "m" },
  { value: "3", label: "Générations", suffix: "" },
]

const FEATURES = [
  {
    id: "heritage",
    title: "L'Héritage Aurum",
    icon: <Clock className="w-6 h-6" />,
    description: "Une tradition horlogère transmise de père en fils depuis plus d'un siècle. Chaque garde-temps est l'aboutissement d'une passion inébranlable pour la mesure du temps.",
    bullets: [
      "Fondation à Genève en 1894",
      "Archives conservées depuis la création",
      "Restauration de pièces historiques",
      "Musée privé Aurum"
    ],
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80"
  },
  {
    id: "precision",
    title: "Précision Absolue",
    icon: <Compass className="w-6 h-6" />,
    description: "Nos maîtres horlogers assemblent et ajustent chaque mouvement à la main, garantissant une précision qui dépasse les standards chronométriques les plus stricts du COSC.",
    bullets: [
      "Calibre exclusif Manufacture",
      "Réserve de marche de 72 heures",
      "Échappement anti-magnétique",
      "Tests rigoureux sur 1000 heures"
    ],
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80"
  },
  {
    id: "materials",
    title: "Matériaux Nobles",
    icon: <Diamond className="w-6 h-6" />,
    description: "Or gris 18 carats, platine 950 et saphir inrayable. Nous sélectionnons uniquement les métaux les plus purs pour forger des boîtiers d'une longévité exceptionnelle.",
    bullets: [
      "Or éthique certifié",
      "Céramique haute technologie",
      "Bracelets en alligator cousus main",
      "Sertissage par nos maîtres joailliers"
    ],
    image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800&q=80"
  }
]

const TESTIMONIALS = [
  {
    name: "Arthur de Rothschild",
    role: "Collectionneur privé",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    content: "La Maison Aurum ne crée pas de simples montres, elle sculpte le temps. Mon chronographe Tourbillon est sans conteste la pièce maîtresse de ma collection.",
    rating: 5
  },
  {
    name: "Elena Vostro",
    role: "Directrice de Galerie",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    content: "L'élégance intemporelle de la collection Céleste habille mon poignet avec une grâce infinie. Un véritable chef-d'œuvre de joaillerie et d'horlogerie.",
    rating: 5
  },
  {
    name: "Jonathan Sterling",
    role: "Rédacteur en chef, Horology Today",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    content: "Une finition exceptionnelle. Le calibre maison développé par Aurum rivalise avec les plus grandes manufactures genevoises historiques.",
    rating: 5
  },
  {
    name: "Marc Andreessen",
    role: "Investisseur",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80",
    content: "Un investissement autant émotionnel que patrimonial. Le soin apporté aux détails est tout simplement hypnotique.",
    rating: 5
  }
]

const PRICING = [
  {
    id: "classic",
    title: "L'Essentiel",
    price: "12 500 €",
    description: "L'élégance pure à l'état brut. Un cadran minimaliste abritant notre mouvement automatique de manufacture.",
    features: [
      "Boîtier en Acier Inoxydable 904L",
      "Mouvement Automatique Calibre 100",
      "Réserve de marche 48h",
      "Bracelet en cuir de veau barénia",
      "Garantie internationale 5 ans"
    ],
    recommended: false
  },
  {
    id: "chronograph",
    title: "Le Chronographe",
    price: "28 900 €",
    description: "Pour les passionnés de mécanique et de sportivité. Une complication chronographe avec roue à colonnes.",
    features: [
      "Boîtier en Or Rose 18k",
      "Calibre 400 Chronographe Flyback",
      "Réserve de marche 72h",
      "Bracelet en alligator cousu main",
      "Édition numérotée",
      "Service d'entretien premium inclus"
    ],
    recommended: true
  },
  {
    id: "tourbillon",
    title: "Le Tourbillon",
    price: "115 000 €",
    description: "Le sommet de l'art horloger. Un tourbillon volant fascinant, assemblé par un seul maître horloger.",
    features: [
      "Boîtier en Platine 950",
      "Calibre 900 Tourbillon Volant",
      "Finition Haute Horlogerie main",
      "Sertissage diamants baguette (option)",
      "Invitation exclusive aux ateliers",
      "Garantie à vie"
    ],
    recommended: false
  }
]

const FAQS = [
  {
    question: "Quelle est la durée de la garantie internationale ?",
    answer: "Toutes nos pièces d'horlogerie bénéficient d'une garantie internationale de 5 ans. Pour la collection Tourbillon, nous offrons une garantie à vie, sous réserve d'un entretien régulier dans nos ateliers certifiés."
  },
  {
    question: "Où sont fabriquées vos montres ?",
    answer: "Chaque montre Maison Aurum est entièrement conçue, développée, assemblée et contrôlée dans notre manufacture située à Genève, en Suisse. Nous sommes fiers de détenir le prestigieux Poinçon de Genève sur nos modèles haut de gamme."
  },
  {
    question: "Puis-je commander un bracelet sur mesure ?",
    answer: "Absolument. Nos boutiques proposent un service de personnalisation (Atelier Sur-Mesure) vous permettant de choisir parmi plus de 50 teintes de cuirs précieux, les surpiqûres, et la gravure de la boucle déployante."
  },
  {
    question: "À quelle fréquence dois-je faire réviser ma montre ?",
    answer: "Pour garantir une précision optimale et préserver la fluidité du mouvement mécanique, nous recommandons une révision complète tous les 5 à 7 ans."
  },
  {
    question: "Livrez-vous à l'international de manière sécurisée ?",
    answer: "Oui, nous expédions nos garde-temps dans le monde entier via des coursiers hautement sécurisés et spécialisés dans les objets de grande valeur. L'expédition est entièrement assurée par la Maison."
  },
  {
    question: "Comment authentifier une montre Maison Aurum ?",
    answer: "Chaque montre est livrée avec un certificat d'authenticité contenant un numéro de série unique crypté sur la blockchain. Vous pouvez le vérifier à tout moment sur notre portail sécurisé."
  }
]

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────
export default function MaisonAurumTemplate() {
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
    <div ref={containerRef} className="min-h-screen bg-[#0A0A0A] text-[#F5F5F0] font-sans" style={{ overflowX: "hidden", scrollBehavior: "smooth" }}>
      
      {/* ─── 1. NAVBAR STICKY ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-white/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 bg-gradient-to-br from-[#D4AF37] to-[#AA8C2C] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.4)] group-hover:shadow-[0_0_25px_rgba(212,175,55,0.6)] transition-all duration-300">
              <Watch className="w-5 h-5 text-black" />
            </div>
            <span className="text-xl font-serif tracking-widest uppercase text-white group-hover:text-[#D4AF37] transition-colors duration-300">
              Maison Aurum
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.label} 
                href={link.href} 
                className="text-sm tracking-widest uppercase text-zinc-400 hover:text-[#D4AF37] transition-all duration-200 cursor-pointer"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button className="text-sm font-medium tracking-widest uppercase text-white hover:text-[#D4AF37] transition-colors cursor-pointer">
              Se Connecter
            </button>
            <button className="px-6 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#AA8C2C] text-black text-sm font-bold tracking-widest uppercase rounded hover:scale-105 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-300 cursor-pointer">
              Boutique
            </button>
          </div>

          {/* Mobile Nav */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="md:hidden p-2 text-zinc-300 hover:text-white cursor-pointer">
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#0A0A0A] border-l border-white/10 text-white w-[300px]">
              <div className="flex flex-col gap-8 mt-12">
                {NAV_LINKS.map((link) => (
                  <Link 
                    key={link.label} 
                    href={link.href} 
                    className="text-lg tracking-widest uppercase text-zinc-400 hover:text-[#D4AF37] transition-colors cursor-pointer"
                  >
                    {link.label}
                  </Link>
                ))}
                <Separator className="bg-white/10" />
                <button className="px-6 py-3 bg-[#D4AF37] text-black text-sm font-bold tracking-widest uppercase rounded cursor-pointer">
                  Boutique en ligne
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
            src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=2000&q=80" 
            alt="Maison Aurum Montre de luxe" 
            fill 
            className="object-cover brightness-[0.4] contrast-125"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]/40" />
        </motion.div>

        <motion.div style={{ y: textY }} className="relative z-10 max-w-5xl mx-auto px-6 text-center mt-20">
          <Reveal>
            <Badge className="bg-[#D4AF37]/10 text-[#D4AF37] hover:bg-[#D4AF37]/20 border border-[#D4AF37]/30 mb-8 uppercase tracking-widest px-4 py-1.5 cursor-pointer transition-all duration-300">
              <Sparkles className="w-3 h-3 mr-2 inline" /> Nouvelle Collection 2026
            </Badge>
          </Reveal>
          
          <Reveal delay={0.1}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light tracking-tighter text-white mb-6 leading-tight">
              L'Éternité au <br className="hidden md:block" />
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#AA8C2C]">
                creux du poignet.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-lg md:text-xl text-zinc-400 font-light tracking-wide max-w-2xl mx-auto mb-10 leading-relaxed">
              Depuis 1894, la Maison Aurum sculpte le temps. Découvrez nos garde-temps de Haute Horlogerie, assemblés à la main à Genève.
            </p>
          </Reveal>

          <Reveal delay={0.3} className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#AA8C2C] text-black font-bold uppercase tracking-widest text-sm rounded hover:scale-105 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2">
              Découvrir <ArrowRight className="w-4 h-4" />
            </button>
            <Dialog>
              <DialogTrigger asChild>
                <button className="w-full sm:w-auto px-8 py-4 border border-white/20 bg-white/5 backdrop-blur-md text-white font-medium uppercase tracking-widest text-sm rounded hover:bg-white/10 transition-all duration-300 cursor-pointer flex items-center justify-center gap-3">
                  <Play className="w-4 h-4 text-[#D4AF37]" /> Voir le film
                </button>
              </DialogTrigger>
              <DialogContent className="bg-[#0A0A0A] border-white/10 text-white sm:max-w-[800px] p-0 overflow-hidden">
                <div className="aspect-video relative w-full bg-black flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full border-t-2 border-[#D4AF37] animate-spin" />
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=1600&q=80')] bg-cover opacity-50 mix-blend-screen" />
                </div>
              </DialogContent>
            </Dialog>
          </Reveal>
        </motion.div>

        {/* Floating Glassmorphism Card */}
        <motion.div 
          style={{ x: springX, y: springY }}
          className="hidden lg:flex absolute bottom-20 right-20 z-20 items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl cursor-pointer hover:border-[#D4AF37]/50 transition-colors duration-300"
        >
          <div className="relative w-16 h-16 rounded-lg overflow-hidden">
            <Image src="https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=200&q=80" alt="Watch Tourbillon" fill className="object-cover" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold mb-1">En vedette</div>
            <div className="text-sm font-serif text-white">Chronographe Royal</div>
          </div>
        </motion.div>
      </section>

      {/* ─── 3. STATS BAR ─── */}
      <section className="py-16 border-y border-white/5 bg-[#0A0A0A]/50 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4 divide-x-0 md:divide-x divide-white/10">
            {STATS.map((stat, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="flex flex-col items-center text-center cursor-pointer group">
                  <div className="text-4xl lg:text-5xl font-serif text-white mb-2 group-hover:text-[#D4AF37] transition-colors duration-300">
                    {stat.value}<span className="text-[#D4AF37]">{stat.suffix}</span>
                  </div>
                  <div className="text-xs uppercase tracking-widest text-zinc-500 font-medium">
                    {stat.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. FEATURES (TABS) ─── */}
      <section id="savoir-faire" className="py-32 relative bg-[#0F0F0F]">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <Reveal>
              <h2 className="text-sm uppercase tracking-widest text-[#D4AF37] font-bold mb-4">Le Savoir-Faire</h2>
              <h3 className="text-4xl md:text-5xl font-serif text-white mb-6">L'Excellence Horlogère</h3>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                Chaque composant est minutieusement décoré, anglé et poli à la main, honorant la tradition séculaire genevoise.
              </p>
            </Reveal>
          </div>

          <Tabs defaultValue="precision" className="w-full flex flex-col lg:flex-row gap-12 lg:gap-20">
            <div className="lg:w-1/3">
              <TabsList className="flex flex-col h-auto bg-transparent gap-2 items-stretch">
                {FEATURES.map((feature) => (
                  <TabsTrigger 
                    key={feature.id} 
                    value={feature.id}
                    className="justify-start px-6 py-4 text-left data-[state=active]:bg-[#D4AF37]/10 data-[state=active]:text-[#D4AF37] text-zinc-400 hover:text-white hover:bg-white/5 transition-all duration-300 cursor-pointer rounded-lg border border-transparent data-[state=active]:border-[#D4AF37]/30"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded bg-black/50">{feature.icon}</div>
                      <span className="text-sm font-bold uppercase tracking-widest">{feature.title}</span>
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
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="bg-[#141414] border border-white/5 rounded-2xl overflow-hidden shadow-2xl"
                    >
                      <div className="aspect-[21/9] relative w-full overflow-hidden">
                        <Image src={feature.image} alt={feature.title} fill className="object-cover hover:scale-105 transition-transform duration-1000" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent" />
                      </div>
                      <div className="p-8 md:p-12">
                        <h4 className="text-2xl font-serif text-white mb-4">{feature.title}</h4>
                        <p className="text-zinc-400 leading-relaxed mb-8">{feature.description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {feature.bullets.map((bullet, i) => (
                            <div key={i} className="flex items-center gap-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                              <span className="text-sm text-zinc-300">{bullet}</span>
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
      <section className="py-32 bg-[#0A0A0A] border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-sm uppercase tracking-widest text-[#D4AF37] font-bold mb-4">Témoignages</h2>
              <h3 className="text-4xl font-serif text-white">Le Club des Collectionneurs</h3>
            </div>
          </Reveal>

          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {TESTIMONIALS.map((testi, i) => (
                <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/2 pl-4">
                  <Reveal delay={i * 0.1}>
                    <Card className="bg-[#121212] border-white/10 hover:border-[#D4AF37]/30 transition-colors duration-300 cursor-pointer h-full">
                      <CardContent className="p-8 flex flex-col h-full justify-between">
                        <div>
                          <div className="flex gap-1 mb-6">
                            {[...Array(testi.rating)].map((_, j) => (
                              <Star key={j} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                            ))}
                          </div>
                          <p className="text-zinc-300 text-lg leading-relaxed font-serif italic mb-8">
                            "{testi.content}"
                          </p>
                        </div>
                        <div className="flex items-center gap-4 border-t border-white/5 pt-6 mt-auto">
                          <Avatar className="w-12 h-12 border-2 border-white/10">
                            <AvatarImage src={testi.avatar} />
                            <AvatarFallback>MA</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-white font-bold text-sm">{testi.name}</div>
                            <div className="text-[#D4AF37] text-xs uppercase tracking-widest mt-1">{testi.role}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Reveal>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-4 mt-12">
              <CarouselPrevious className="relative inset-auto translate-y-0 bg-[#121212] border-white/10 text-white hover:bg-[#D4AF37] hover:text-black transition-colors" />
              <CarouselNext className="relative inset-auto translate-y-0 bg-[#121212] border-white/10 text-white hover:bg-[#D4AF37] hover:text-black transition-colors" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* ─── 6. PRICING ─── */}
      <section id="collections" className="py-32 bg-[#0F0F0F] relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[500px] bg-[#D4AF37]/5 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <Reveal>
              <h2 className="text-sm uppercase tracking-widest text-[#D4AF37] font-bold mb-4">Acquisition</h2>
              <h3 className="text-4xl md:text-5xl font-serif text-white mb-6">Collections Exclusives</h3>
              <p className="text-zinc-400 max-w-xl mx-auto">
                Des pièces d'exception disponibles en quantités limitées. Devenez dépositaire de l'héritage Aurum.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {PRICING.map((tier, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <Card className={`relative bg-[#141414] border ${tier.recommended ? 'border-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.15)] scale-105 z-10' : 'border-white/10'} hover:border-[#D4AF37]/50 transition-all duration-300 cursor-pointer overflow-hidden`}>
                  {tier.recommended && (
                    <div className="absolute top-0 inset-x-0 bg-gradient-to-r from-[#D4AF37] to-[#AA8C2C] text-black text-[10px] font-bold uppercase tracking-widest text-center py-1.5">
                      Chef d'œuvre Maison
                    </div>
                  )}
                  <CardContent className={`p-8 ${tier.recommended ? 'pt-10' : ''}`}>
                    <h4 className="text-2xl font-serif text-white mb-2">{tier.title}</h4>
                    <p className="text-sm text-zinc-500 mb-8 h-10">{tier.description}</p>
                    <div className="text-3xl font-light text-white mb-8 border-b border-white/5 pb-8">
                      {tier.price}
                    </div>
                    <ul className="space-y-4 mb-10">
                      {tier.features.map((feat, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm text-zinc-300">
                          <Shield className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                    <button className={`w-full py-4 text-sm font-bold uppercase tracking-widest rounded transition-all duration-300 ${tier.recommended ? 'bg-[#D4AF37] text-black hover:bg-white hover:text-black' : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'}`}>
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
      <section className="py-32 bg-[#0A0A0A]">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-sm uppercase tracking-widest text-[#D4AF37] font-bold mb-4">Informations</h2>
              <h3 className="text-4xl font-serif text-white">Questions Fréquentes</h3>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-white/10">
                  <AccordionTrigger className="text-left text-white hover:text-[#D4AF37] hover:no-underline font-medium text-lg py-6 transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-zinc-400 leading-relaxed pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* ─── 8. CTA BANNER ─── */}
      <section className="py-24 px-6 relative z-10">
        <Reveal>
          <div className="max-w-6xl mx-auto bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border border-[#D4AF37]/30 rounded-3xl p-10 md:p-20 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1600&q=80')] bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity duration-700 mix-blend-luminosity" />
            
            <div className="relative z-10">
              <Watch className="w-12 h-12 text-[#D4AF37] mx-auto mb-8" />
              <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">Prêt à acquérir l'Exception ?</h2>
              <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-10">
                Nos conseillers privés sont à votre disposition pour vous guider dans le choix de votre garde-temps Maison Aurum ou organiser une visite privée de la manufacture.
              </p>
              <button className="px-10 py-5 bg-[#D4AF37] text-black font-bold uppercase tracking-widest text-sm rounded hover:bg-white hover:scale-105 transition-all duration-300 cursor-pointer">
                Contacter un Conseiller
              </button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ─── 9. FOOTER ─── */}
      <footer className="bg-[#050505] pt-24 pb-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div>
              <Link href="/" className="flex items-center gap-2 mb-8 cursor-pointer">
                <Watch className="w-6 h-6 text-[#D4AF37]" />
                <span className="text-2xl font-serif tracking-widest uppercase text-white">
                  Aurum
                </span>
              </Link>
              <p className="text-zinc-500 text-sm leading-relaxed mb-8">
                L'artisanat d'art genevois au service de l'éternité. Haute Horlogerie indépendante depuis 1894.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-[#D4AF37] hover:bg-white/10 transition-all cursor-pointer"><Camera className="w-4 h-4" /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-[#D4AF37] hover:bg-white/10 transition-all cursor-pointer"><MessageCircle className="w-4 h-4" /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-[#D4AF37] hover:bg-white/10 transition-all cursor-pointer"><Briefcase className="w-4 h-4" /></a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Collections</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-zinc-500 hover:text-[#D4AF37] transition-colors text-sm cursor-pointer">L'Essentiel</a></li>
                <li><a href="#" className="text-zinc-500 hover:text-[#D4AF37] transition-colors text-sm cursor-pointer">Le Chronographe</a></li>
                <li><a href="#" className="text-zinc-500 hover:text-[#D4AF37] transition-colors text-sm cursor-pointer">Le Tourbillon</a></li>
                <li><a href="#" className="text-zinc-500 hover:text-[#D4AF37] transition-colors text-sm cursor-pointer">Séries Limitées</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">La Maison</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-zinc-500 hover:text-[#D4AF37] transition-colors text-sm cursor-pointer">Histoire</a></li>
                <li><a href="#" className="text-zinc-500 hover:text-[#D4AF37] transition-colors text-sm cursor-pointer">Savoir-Faire</a></li>
                <li><a href="#" className="text-zinc-500 hover:text-[#D4AF37] transition-colors text-sm cursor-pointer">Manufacture</a></li>
                <li><a href="#" className="text-zinc-500 hover:text-[#D4AF37] transition-colors text-sm cursor-pointer">Carrières</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Contact</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-sm text-zinc-500">
                  <MapPin className="w-4 h-4 text-[#D4AF37]" /> Place de Longemalle 1, Genève
                </li>
                <li className="flex items-center gap-3 text-sm text-zinc-500">
                  <Phone className="w-4 h-4 text-[#D4AF37]" /> +41 22 000 00 00
                </li>
                <li className="flex items-center gap-3 text-sm text-zinc-500">
                  <Mail className="w-4 h-4 text-[#D4AF37]" /> concierge@maisonaurum.ch
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium uppercase tracking-widest text-zinc-600">
            <p>&copy; 2026 Maison Aurum. Tous droits réservés.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors cursor-pointer">Mentions Légales</a>
              <a href="#" className="hover:text-white transition-colors cursor-pointer">Politique de Confidentialité</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}
