"use client"

import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Play, Menu, ArrowRight, Star, ChevronRight, CheckCircle2, Utensils, Wine, Clock, MapPin, Phone, Camera, Globe, } from "lucide-react"

// ─── REVEAL COMPONENT ────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number, className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── DATA ────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Menus", href: "#menus" },
  { label: "The Cellar", href: "#cellar" },
  { label: "Private Dining", href: "#private" },
  { label: "Reservations", href: "#reservations" },
]

const STATS = [
  { value: "2", label: "Michelin Stars", suffix: "" },
  { value: "3000", label: "Wine Labels", suffix: "+" },
  { value: "12", label: "Years of Excellence", suffix: "" },
  { value: "14", label: "Course Tasting", suffix: "" },
  { value: "5", label: "Gault & Millau Toques", suffix: "" },
]

const FEATURES = [
  {
    id: "culinary",
    title: "Culinary Vision",
    icon: <Utensils className="w-5 h-5" />,
    description: "Our philosophy is rooted in micro-seasonality and absolute respect for the ingredient. We source exclusively from local bio-dynamic farms and day-boat fishermen to create a narrative-driven tasting experience.",
    bullets: [
      "14-Course Signature Tasting Menu",
      "Daily Foraged Ingredients",
      "Dry-Aged Wagyu Selection",
      "Artisanal Cheese Trolley"
    ],
    image: "https://images.unsplash.com/photo-1544025162-8315ea07525f?w=800&q=80"
  },
  {
    id: "wine",
    title: "The Grand Cellar",
    icon: <Wine className="w-5 h-5" />,
    description: "Curated by our Head Sommelier over two decades, our cellar houses over 3,000 labels focusing on rare vintages from Burgundy, Bordeaux, and emerging natural wine producers.",
    bullets: [
      "Grand Cru Pairing Option",
      "Non-Alcoholic Botanical Pairing",
      "Private Cellar Tours",
      "Rare Vintage Collection"
    ],
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80"
  },
  {
    id: "atmosphere",
    title: "The Atmosphere",
    icon: <Star className="w-5 h-5" />,
    description: "Set within a restored 19th-century bank vault. Dark oak panelling, intimate booth seating, and dramatic spotlighting create an environment of hushed, romantic exclusivity.",
    bullets: [
      "Intimate seating for 40 guests",
      "Custom acoustic treatment",
      "Bespoke tableware & crystal",
      "Dedicated Captain service"
    ],
    image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&q=80"
  }
]

const TESTIMONIALS = [
  {
    name: "The Michelin Guide",
    role: "2026 Edition",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    content: "A masterclass in restraint and flavor balance. The chef's treatment of the local langoustine with fermented white asparagus is nothing short of transcendent. A destination dining experience.",
    rating: 5
  },
  {
    name: "Eater National",
    role: "Restaurant of the Year",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    content: "Aura strips away the pretension of fine dining while maintaining absolute perfection in its execution. The wine pairings are daring and universally brilliant.",
    rating: 5
  },
  {
    name: "James L.",
    role: "Verified Guest",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    content: "We celebrated our 10th anniversary here. The staff anticipated our every need without ever feeling intrusive. The progression of the 14 courses was a beautiful journey.",
    rating: 5
  },
  {
    name: "Wine Spectator",
    role: "Grand Award Winner",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    content: "The depth of their Burgundy selection is staggering. But it's the Sommelier's ability to pair these grand crus with the hyper-modern cuisine that truly impresses.",
    rating: 5
  }
]

const PRICING = [
  {
    id: "lunch",
    title: "Le Déjeuner",
    subtitle: "5-Course Discovery",
    price: "$145",
    duration: "Per Guest",
    description: "A condensed expression of our culinary philosophy, designed for a leisurely afternoon. Available Thursday through Saturday.",
    features: [
      "5 progressive courses",
      "Artisanal sourdough service",
      "Petit fours",
      "Standard wine pairing (+$95)"
    ],
    recommended: false
  },
  {
    id: "dinner",
    title: "The Aura Experience",
    subtitle: "14-Course Tasting",
    price: "$325",
    duration: "Per Guest",
    description: "The complete journey through our micro-seasons. A 3-hour immersive dining experience that represents our highest level of craft.",
    features: [
      "14 meticulously crafted courses",
      "Welcome Champagne",
      "Tableside preparations",
      "Take-home pastry gift",
      "Grand Cru pairing (+$250)"
    ],
    recommended: true
  },
  {
    id: "private",
    title: "The Vault Room",
    subtitle: "Exclusive Private Dining",
    price: "$5,000",
    duration: "Minimum Spend",
    description: "Total privacy for up to 12 guests in our historic bank vault. Features a dedicated chef and sommelier team.",
    features: [
      "Bespoke customized menu",
      "Dedicated service team",
      "Private entrance & cloakroom",
      "Pre-dinner cocktail reception",
      "Floral arrangements included"
    ],
    recommended: false
  }
]

const FAQS = [
  {
    question: "How far in advance can I make a reservation?",
    answer: "Reservations open precisely 60 days in advance at 10:00 AM local time. We recommend booking early, as our dining room accommodates only 40 guests per evening and tables fill quickly."
  },
  {
    question: "Do you accommodate dietary restrictions?",
    answer: "We are happy to accommodate most allergies and dietary restrictions, including vegetarian and pescatarian diets, with at least 72 hours' advance notice. Unfortunately, due to the nature of our menu, we cannot accommodate strict vegan or allium-free diets."
  },
  {
    question: "What is your dress code?",
    answer: "Our dress code is Elegant. Jackets are preferred for gentlemen. We kindly ask guests to refrain from wearing sportswear, shorts, t-shirts, or open-toed shoes for men. We reserve the right to refuse entry to guests who do not respect the dress code."
  },
  {
    question: "What is your cancellation policy?",
    answer: "Due to our small size and the extensive preparation required for our tasting menu, all reservations require a deposit of $100 per person. Cancellations or reductions in party size must be made at least 72 hours in advance to receive a full refund of the deposit."
  },
  {
    question: "Can I bring my own wine?",
    answer: "Our cellar is extensive, but we understand you may have a special bottle. We allow up to two 750ml bottles per table, provided the wine is not currently on our list. Corkage is $100 per bottle."
  },
  {
    question: "Are children permitted in the restaurant?",
    answer: "While we do not have a strict age limit, our tasting menu spans 3 hours and is designed for adults. We do not offer a children's menu or high chairs. Children joining us must partake in the full tasting menu."
  },
  {
    question: "Do you offer parking?",
    answer: "We offer complimentary valet parking for all dinner guests. Please pull up to the main entrance where our attendants will assist you."
  },
  {
    question: "How long does the tasting menu take?",
    answer: "We ask guests to allow approximately 2.5 to 3 hours to fully experience the 14-course tasting menu. The lunch service typically takes 1.5 to 2 hours."
  },
  {
    question: "Do you host private events or weddings?",
    answer: "Yes, the entire restaurant can be bought out for private events of up to 40 guests. For larger weddings, we offer off-site catering services with a dedicated culinary team."
  },
  {
    question: "Is there a waitlist for fully booked dates?",
    answer: "Yes, you can join the waitlist via our reservation platform. If a cancellation occurs, the system will automatically notify waitlisted guests on a first-come, first-served basis."
  }
]

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────
export default function AuraDiningTemplate() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  
  // Parallax Values
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"])

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0C0B0A] text-[#F4F1EB] font-serif selection:bg-[#B38B59] selection:text-[#0C0B0A]" style={{ overflowX: "hidden", scrollBehavior: "smooth" }}>
      
      {/* ─── 1. NAVBAR (ELEGANT DARK) ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-[#0C0B0A]/90 to-transparent backdrop-blur-sm transition-all duration-300">
        <div className="max-w-[1400px] mx-auto px-6 h-28 flex items-center justify-between">
          <Link href="/" className="group cursor-pointer">
            <span className="text-3xl font-light tracking-[0.15em] uppercase text-[#F4F1EB]">
              Aura.
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-12">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.label} 
                href={link.href} 
                className="text-xs font-light tracking-[0.2em] uppercase text-[#D1C9B8] hover:text-[#B38B59] transition-colors duration-500 cursor-pointer"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center">
            <button className="px-8 py-3 border border-[#B38B59] text-[#B38B59] text-xs font-light tracking-[0.2em] uppercase hover:bg-[#B38B59] hover:text-[#0C0B0A] transition-colors duration-500 cursor-pointer">
              Book a Table
            </button>
          </div>

          {/* Mobile Nav */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="md:hidden p-2 text-[#F4F1EB] cursor-pointer">
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#0C0B0A] border-l border-[#B38B59]/20 text-[#F4F1EB] w-full sm:w-[400px]">
              <div className="flex flex-col items-center justify-center h-full gap-10">
                <span className="text-3xl font-light tracking-[0.15em] uppercase mb-8">Aura.</span>
                {NAV_LINKS.map((link) => (
                  <Link 
                    key={link.label} 
                    href={link.href} 
                    className="text-lg font-light tracking-[0.3em] uppercase text-[#D1C9B8] hover:text-[#B38B59] transition-colors cursor-pointer"
                  >
                    {link.label}
                  </Link>
                ))}
                <button className="mt-8 px-10 py-4 border border-[#B38B59] text-[#B38B59] text-xs font-light tracking-[0.2em] uppercase hover:bg-[#B38B59] hover:text-[#0C0B0A] transition-colors duration-500 cursor-pointer">
                  Book a Table
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* ─── 2. HERO PARALLAX (ROMANTIC DARK MASK) ─── */}
      <section className="relative h-[100vh] flex items-center justify-center overflow-hidden bg-[#0C0B0A]">
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=2000&q=80" 
            alt="Elegant fine dining cocktail" 
            fill 
            className="object-cover opacity-50 mix-blend-luminosity"
            priority
          />
          {/* Elegant Vignette Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0C0B0A_100%)] opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0B0A] via-transparent to-[#0C0B0A] opacity-80" />
        </motion.div>

        <motion.div style={{ y: textY }} className="relative z-10 w-full px-6 flex flex-col items-center text-center mt-20">
          <Reveal>
            <div className="flex items-center gap-2 mb-8 opacity-80">
              <Star className="w-4 h-4 text-[#B38B59] fill-[#B38B59]" />
              <Star className="w-4 h-4 text-[#B38B59] fill-[#B38B59]" />
            </div>
          </Reveal>
          
          <Reveal delay={0.2}>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tight text-[#F4F1EB] mb-8 leading-[1.1]">
              A symphony <br />
              <span className="italic text-[#D1C9B8] font-serif">of the senses.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.4}>
            <p className="text-sm md:text-base text-[#B38B59] font-light max-w-lg mx-auto mb-12 tracking-[0.1em] uppercase">
              A Two-Michelin-Star Experience.
            </p>
          </Reveal>

          <Reveal delay={0.6}>
            <Dialog>
              <DialogTrigger asChild>
                <button className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-12 h-12 rounded-full border border-[#B38B59]/50 flex items-center justify-center group-hover:border-[#B38B59] transition-colors duration-500">
                    <Play className="w-3 h-3 text-[#B38B59] ml-1" />
                  </div>
                  <span className="text-xs font-light tracking-[0.2em] uppercase text-[#D1C9B8] group-hover:text-[#F4F1EB] transition-colors">
                    The Film
                  </span>
                </button>
              </DialogTrigger>
              <DialogContent className="bg-[#0C0B0A] border-[#B38B59]/20 p-1 sm:max-w-[1000px] overflow-hidden rounded-none">
                <div className="aspect-video relative w-full bg-black flex items-center justify-center">
                  <div className="w-10 h-10 border-t border-[#B38B59] rounded-full animate-spin relative z-10" />
                </div>
              </DialogContent>
            </Dialog>
          </Reveal>
        </motion.div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce opacity-50">
          <div className="w-[1px] h-16 bg-gradient-to-b from-[#B38B59] to-transparent" />
        </div>
      </section>

      {/* ─── 3. STATS BAR ─── */}
      <section className="py-24 border-b border-[#B38B59]/10 bg-[#0C0B0A] relative z-10">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12 md:gap-4 divide-x-0 md:divide-x divide-[#B38B59]/10">
            {STATS.map((stat, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="flex flex-col items-center text-center">
                  <div className="text-4xl lg:text-5xl font-light text-[#F4F1EB] mb-4">
                    {stat.value}<span className="text-[#B38B59] text-3xl ml-1">{stat.suffix}</span>
                  </div>
                  <div className="text-[9px] text-[#D1C9B8] font-light uppercase tracking-[0.3em]">
                    {stat.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. FEATURES (TABS WITH TALL IMAGES) ─── */}
      <section id="menus" className="py-32 relative bg-[#0C0B0A]">
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <Reveal>
              <h2 className="text-[10px] font-light text-[#B38B59] mb-6 uppercase tracking-[0.4em]">Philosophy</h2>
              <h3 className="text-4xl md:text-6xl font-light text-[#F4F1EB] mb-8 italic">The Elements.</h3>
            </Reveal>
          </div>

          <Tabs defaultValue="culinary" className="w-full">
            <TabsList className="flex flex-row justify-center h-auto bg-transparent gap-8 md:gap-16 items-center mb-16 p-0 border-b border-[#B38B59]/20 pb-4">
              {FEATURES.map((feature) => (
                <TabsTrigger 
                  key={feature.id} 
                  value={feature.id}
                  className="px-0 py-2 text-center data-[state=active]:bg-transparent data-[state=active]:text-[#F4F1EB] text-[#D1C9B8] hover:text-[#F4F1EB] transition-colors duration-500 cursor-pointer rounded-none border-b border-transparent data-[state=active]:border-[#B38B59] data-[state=active]:shadow-none"
                >
                  <span className="text-xs md:text-sm font-light uppercase tracking-[0.2em]">{feature.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="w-full">
              <AnimatePresence mode="wait">
                {FEATURES.map((feature) => (
                  <TabsContent key={feature.id} value={feature.id} className="mt-0 outline-none">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-24 items-center"
                    >
                      <div className="order-2 lg:order-1">
                        <div className="flex items-center gap-4 mb-8 text-[#B38B59]">
                          {feature.icon}
                        </div>
                        <h4 className="text-3xl md:text-4xl font-light text-[#F4F1EB] mb-8 italic">{feature.title}</h4>
                        <p className="text-[#D1C9B8] leading-loose mb-12 text-lg font-light">{feature.description}</p>
                        <div className="space-y-6">
                          {feature.bullets.map((bullet, i) => (
                            <div key={i} className="flex items-center gap-4">
                              <div className="w-1 h-1 rounded-full bg-[#B38B59] shrink-0" />
                              <span className="text-sm text-[#F4F1EB] font-light tracking-wide">{bullet}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="order-1 lg:order-2">
                        {/* Tall elegant image mask */}
                        <div className="aspect-[3/4] relative w-full overflow-hidden rounded-t-[1000px] border border-[#B38B59]/20 p-2">
                          <div className="relative w-full h-full rounded-t-[1000px] overflow-hidden">
                            <Image src={feature.image} alt={feature.title} fill className="object-cover scale-105 hover:scale-100 transition-transform duration-[2s] ease-out mix-blend-luminosity hover:mix-blend-normal" />
                          </div>
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

      {/* ─── 5. TESTIMONIALS (CRITICS) ─── */}
      <section className="py-32 bg-[#080808] border-y border-[#B38B59]/10 overflow-hidden relative">
        <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center">
          <Reveal>
            <div className="mb-20">
              <h2 className="text-[10px] font-light text-[#B38B59] mb-6 uppercase tracking-[0.4em]">Acclaim</h2>
              <h3 className="text-4xl md:text-5xl font-light text-[#F4F1EB] italic">Critical Voices.</h3>
            </div>
          </Reveal>

          <Carousel className="w-full">
            <CarouselContent>
              {TESTIMONIALS.map((testi, i) => (
                <CarouselItem key={i} className="md:basis-full pl-0">
                  <Reveal delay={i * 0.1}>
                    <div className="max-w-3xl mx-auto flex flex-col items-center">
                      <div className="flex gap-2 mb-10">
                        {[...Array(testi.rating)].map((_, j) => (
                          <Star key={j} className="w-4 h-4 fill-[#B38B59] text-[#B38B59]" />
                        ))}
                      </div>
                      <p className="text-2xl md:text-3xl font-light leading-relaxed mb-12 text-[#F4F1EB] italic">
                        "{testi.content}"
                      </p>
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-[1px] bg-[#B38B59]/50 mb-2" />
                        <div className="font-light tracking-[0.2em] uppercase text-sm text-[#F4F1EB]">{testi.name}</div>
                        <div className="font-light text-[10px] uppercase tracking-[0.3em] text-[#B38B59]">{testi.role}</div>
                      </div>
                    </div>
                  </Reveal>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-8 mt-20">
              <CarouselPrevious className="relative inset-auto translate-y-0 bg-transparent text-[#B38B59] border-none hover:bg-transparent hover:text-[#F4F1EB] transition-colors" />
              <CarouselNext className="relative inset-auto translate-y-0 bg-transparent text-[#B38B59] border-none hover:bg-transparent hover:text-[#F4F1EB] transition-colors" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* ─── 6. PRICING (TASTING MENUS) ─── */}
      <section id="reservations" className="py-32 bg-[#0C0B0A] relative">
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <Reveal>
              <h2 className="text-[10px] font-light text-[#B38B59] mb-6 uppercase tracking-[0.4em]">Offerings</h2>
              <h3 className="text-4xl md:text-5xl font-light text-[#F4F1EB] mb-8 italic">The Experiences.</h3>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRICING.map((tier, i) => (
              <Reveal key={i} delay={i * 0.2}>
                <Card className={`relative bg-transparent border-t border-b ${tier.recommended ? 'border-[#B38B59]' : 'border-[#B38B59]/20'} border-x-0 rounded-none transition-all duration-700 hover:bg-[#B38B59]/5`}>
                  <CardContent className="p-10 flex flex-col items-center text-center h-full">
                    <div className="text-[9px] font-light uppercase tracking-[0.3em] text-[#B38B59] mb-6">{tier.duration}</div>
                    <h4 className="text-2xl font-light text-[#F4F1EB] mb-2">{tier.title}</h4>
                    <div className="text-xs italic text-[#D1C9B8] mb-8">{tier.subtitle}</div>
                    
                    <div className="mb-8">
                      <span className="text-3xl font-light text-[#B38B59]">{tier.price}</span>
                    </div>

                    <p className="text-sm font-light text-[#D1C9B8] mb-12 leading-relaxed">{tier.description}</p>
                    
                    <div className="w-12 h-[1px] bg-[#B38B59]/30 mb-8 mx-auto" />

                    <ul className="space-y-4 mb-12 flex-1">
                      {tier.features.map((feat, j) => (
                        <li key={j} className="text-xs font-light text-[#D1C9B8] tracking-wider">
                          {feat}
                        </li>
                      ))}
                    </ul>

                    <button className={`px-8 py-3 text-[10px] font-light uppercase tracking-[0.2em] transition-all duration-500 border ${tier.recommended ? 'bg-[#B38B59] text-[#0C0B0A] border-[#B38B59] hover:bg-transparent hover:text-[#B38B59]' : 'bg-transparent text-[#B38B59] border-[#B38B59] hover:bg-[#B38B59] hover:text-[#0C0B0A]'}`}>
                      Reserve
                    </button>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7. FAQ ACCORDION ─── */}
      <section className="bg-[#0C0B0A] py-32 border-t border-[#B38B59]/10">
        <div className="max-w-[800px] mx-auto px-6">
          <Reveal>
            <div className="text-center mb-20">
              <h2 className="text-[10px] font-light text-[#B38B59] mb-6 uppercase tracking-[0.4em]">Information</h2>
              <h3 className="text-4xl font-light text-[#F4F1EB] italic">Guest Details.</h3>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-[#B38B59]/20">
                  <AccordionTrigger className="text-left font-light text-lg hover:no-underline py-8 hover:text-[#B38B59] transition-colors text-[#F4F1EB]">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm font-light leading-loose pb-8 text-[#D1C9B8]">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* ─── 8. CTA BANNER ─── */}
      <section className="bg-[#0C0B0A] py-24">
        <Reveal>
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="relative overflow-hidden border border-[#B38B59]/30 p-2">
              <div className="relative px-8 py-32 md:py-48 text-center bg-[#0C0B0A] overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=1600&q=80')] bg-cover bg-center opacity-[0.03]" />
                
                <div className="relative z-10 flex flex-col items-center">
                  <h2 className="text-4xl md:text-6xl font-light text-[#F4F1EB] mb-10 italic">Begin the Journey.</h2>
                  <button className="px-12 py-4 bg-transparent border border-[#B38B59] text-[#B38B59] text-[10px] font-light uppercase tracking-[0.3em] hover:bg-[#B38B59] hover:text-[#0C0B0A] transition-colors duration-700 cursor-pointer">
                    Check Availability
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ─── 9. FOOTER ─── */}
      <footer className="bg-[#080808] text-[#F4F1EB] pt-32 pb-16 border-t border-[#B38B59]/20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            <div>
              <Link href="/" className="inline-block mb-10 cursor-pointer">
                <span className="text-2xl font-light tracking-[0.2em] uppercase text-[#F4F1EB]">
                  Aura.
                </span>
              </Link>
              <p className="text-sm font-light text-[#D1C9B8] leading-loose max-w-xs">
                A sanctuary of culinary artistry. Awarded Two Michelin Stars for excellence in modern gastronomy.
              </p>
            </div>

            <div>
              <h4 className="font-light uppercase tracking-[0.3em] text-[9px] mb-8 text-[#B38B59]">Location</h4>
              <ul className="space-y-6">
                <li className="flex items-start gap-3 text-sm font-light text-[#D1C9B8] leading-loose">
                  <MapPin className="w-4 h-4 text-[#B38B59] mt-1 shrink-0" />
                  <span>The Historic Bank Bldg.<br/>124 Fine Arts Ave<br/>New York, NY 10012</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-light uppercase tracking-[0.3em] text-[9px] mb-8 text-[#B38B59]">Contact</h4>
              <ul className="space-y-6 font-light text-sm text-[#D1C9B8]">
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#B38B59]" /> 
                  <span className="tracking-widest">+1 (212) 555-AURA</span>
                </li>
                <li>
                  <a href="mailto:reservations@aura.com" className="hover:text-[#B38B59] transition-colors">reservations@aura.com</a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-light uppercase tracking-[0.3em] text-[9px] mb-8 text-[#B38B59]">Hours</h4>
              <ul className="space-y-4 font-light text-sm text-[#D1C9B8]">
                <li className="flex justify-between border-b border-[#B38B59]/20 pb-2">
                  <span>Dinner</span>
                  <span>Tue - Sat: 5:30pm - 10pm</span>
                </li>
                <li className="flex justify-between border-b border-[#B38B59]/20 pb-2">
                  <span>Lunch</span>
                  <span>Thu - Sat: 12pm - 2pm</span>
                </li>
                <li className="pt-2 text-[#B38B59] italic text-xs">
                  Closed Sunday & Monday
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8 pt-12 border-t border-[#B38B59]/20">
            <p className="font-light tracking-[0.2em] text-[9px] text-[#D1C9B8] uppercase">
              &copy; 2026 Aura Dining Group.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 rounded-full border border-[#B38B59]/30 flex items-center justify-center hover:bg-[#B38B59] hover:text-[#0C0B0A] transition-colors"><Camera className="w-3 h-3" /></a>
              <a href="#" className="w-8 h-8 rounded-full border border-[#B38B59]/30 flex items-center justify-center hover:bg-[#B38B59] hover:text-[#0C0B0A] transition-colors"><Globe className="w-3 h-3" /></a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}
