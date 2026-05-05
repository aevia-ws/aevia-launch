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
import { ArrowRight, Menu, X, Star, ChevronRight, Play, CheckCircle2, Ticket, MapPin, CalendarDays, Eye, BookOpen, Clock, Building, Brush } from "lucide-react"

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
  { label: "EXHIBITIONS", href: "#exhibitions" },
  { label: "COLLECTION", href: "#collection" },
  { label: "VISIT", href: "#visit" },
  { label: "PROGRAMS", href: "#programs" },
]

const STATS = [
  { value: "4.5", label: "MILLION VISITORS / YR", suffix: "M" },
  { value: "200", label: "ARTWORKS IN COLLECTION", suffix: "K+" },
  { value: "1929", label: "YEAR FOUNDED", suffix: "" },
  { value: "54", label: "GALLERIES", suffix: "" },
  { value: "12", label: "CURATORIAL DEPTS", suffix: "" },
]

const FEATURES = [
  {
    id: "contemporary",
    title: "CONTEMPORARY",
    icon: <Brush className="w-8 h-8" />,
    description: "Our sprawling contemporary wing features groundbreaking installations, radical conceptual art, and large-scale sculptures that challenge the boundaries of medium.",
    bullets: [
      "Rotating global commissions",
      "Interactive kinetic sculptures",
      "Performance art spaces",
      "Post-1980s retrospectives"
    ],
    image: "https://images.unsplash.com/photo-1572949645841-094f3a9c4c94?w=800&q=80"
  },
  {
    id: "modern",
    title: "MODERN MASTERS",
    icon: <Eye className="w-8 h-8" />,
    description: "The permanent collection houses the defining works of the 20th century. From Cubism and Surrealism to Abstract Expressionism and Pop Art.",
    bullets: [
      "The definitive Picasso collection",
      "Monet's immersive Water Lilies",
      "Mid-century design archives",
      "Early photography and film"
    ],
    image: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=800&q=80"
  },
  {
    id: "architecture",
    title: "ARCHITECTURE",
    icon: <Building className="w-8 h-8" />,
    description: "The building itself is a masterpiece of brutalist and modernist principles. Concrete, glass, and steel intersect to create dramatic voids and light wells.",
    bullets: [
      "The iconic atrium",
      "Sculpture garden by Philip Johnson",
      "Concrete floating staircases",
      "Architectural drawings archive"
    ],
    image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=800&q=80"
  }
]

const TESTIMONIALS = [
  {
    name: "JERRY SALTZ",
    role: "NEW YORK MAGAZINE",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    content: "The latest rehang of the permanent collection completely shatters the chronological canon. It's bold, deeply confrontational, and utterly necessary.",
    rating: 5
  },
  {
    name: "ROBERTA SMITH",
    role: "THE NEW YORK TIMES",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    content: "An architectural triumph. The expanded galleries allow the monumental works of the 1960s to finally breathe the way they were always intended to.",
    rating: 5
  },
  {
    name: "HAL FOSTER",
    role: "ARTFORUM",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    content: "There is no institution more vital to the understanding of modernism. Their archival exhibitions are routinely the most rigorous in the world.",
    rating: 5
  },
  {
    name: "ALICE G.",
    role: "VISITOR",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    content: "I spent 6 hours here and still didn't see everything. The spatial design pulls you from one gallery to the next effortlessly.",
    rating: 5
  }
]

const PRICING = [
  {
    id: "general",
    title: "GENERAL ADMISSION",
    subtitle: "FULL ACCESS",
    price: "$30",
    duration: "/ DAY",
    description: "Access to all permanent galleries and special exhibitions for a single day.",
    features: [
      "All permanent collection galleries",
      "Special exhibition access",
      "Free audio guide (via app)",
      "Sculpture garden entry",
      "Free coat check"
    ],
    recommended: false
  },
  {
    id: "guided",
    title: "CURATOR TOUR",
    subtitle: "GUIDED EXPERIENCE",
    price: "$85",
    duration: "/ DAY",
    description: "An intimate 90-minute tour led by a museum educator or assistant curator.",
    features: [
      "Includes General Admission",
      "Skip-the-line priority entry",
      "90-minute expert guided tour",
      "Post-tour Q&A session",
      "10% discount at design store"
    ],
    recommended: true
  },
  {
    id: "member",
    title: "ANNUAL MEMBER",
    subtitle: "SUPPORT THE ARTS",
    price: "$110",
    duration: "/ YEAR",
    description: "Unlimited yearly access and exclusive perks for art enthusiasts.",
    features: [
      "Unlimited free admission for 1 year",
      "Member-only preview days",
      "Access to the Member Lounge",
      "20% discount at design store",
      "Free tickets to film screenings",
      "Guest passes included"
    ],
    recommended: false
  }
]

const FAQS = [
  {
    question: "ARE TICKETS TIMED-ENTRY?",
    answer: "Yes, to ensure the best possible experience and avoid overcrowding, all tickets require a specific entry time. Once inside, you may stay as long as you like until closing."
  },
  {
    question: "IS PHOTOGRAPHY ALLOWED?",
    answer: "Still photography for personal, noncommercial use is permitted in the galleries unless otherwise noted. Flash, tripods, and selfie sticks are strictly prohibited."
  },
  {
    question: "DO YOU HAVE A BAG POLICY?",
    answer: "All bags larger than 11 x 15 x 5 inches must be checked at the cloakroom. Backpacks of any size must be worn on the front or carried by hand to protect the artworks."
  },
  {
    question: "IS THE MUSEUM WHEELCHAIR ACCESSIBLE?",
    answer: "Absolutely. All galleries, entrances, and facilities are fully accessible. We offer complimentary manual wheelchairs on a first-come, first-served basis at the coat check."
  },
  {
    question: "CAN I LEAVE AND RE-ENTER?",
    answer: "General admission tickets do not include re-entry. However, Annual Members may enter and exit the building freely throughout the day."
  },
  {
    question: "ARE THERE DINING OPTIONS INSIDE?",
    answer: "We offer three dining experiences: a two-Michelin-starred restaurant, a casual cafe overlooking the sculpture garden, and an espresso bar on the second floor."
  },
  {
    question: "CAN I BRING MY OWN SKETCHBOOK?",
    answer: "Yes, visitors are encouraged to sketch in the galleries! However, please use only pencils. Pens, markers, charcoal, and paints are strictly prohibited to protect the artworks."
  },
  {
    question: "DO YOU OFFER STUDENT DISCOUNTS?",
    answer: "We offer heavily discounted admission ($14) for full-time students with a valid ID. Additionally, students from select partner universities receive complimentary admission year-round."
  }
]

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────
export default function MoMAStructureTemplate() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  
  // Parallax Values
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

  return (
    <div ref={containerRef} className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white" style={{ overflowX: "hidden", scrollBehavior: "smooth" }}>
      
      {/* ─── 1. NAVBAR (BRUTALIST STICKY) ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b-[3px] border-black transition-all duration-300">
        <div className="flex h-20">
          <Link href="/" className="flex items-center justify-center border-r-[3px] border-black px-8 group cursor-pointer hover:bg-black transition-colors duration-300">
            <span className="text-3xl font-black tracking-tighter uppercase text-black group-hover:text-white transition-colors duration-300">
              MoMA.
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex flex-1">
            {NAV_LINKS.map((link, i) => (
              <Link 
                key={link.label} 
                href={link.href} 
                className={`flex items-center justify-center flex-1 border-black border-r-[3px] text-sm font-black tracking-widest uppercase hover:bg-black hover:text-white transition-all duration-200 cursor-pointer ${i === NAV_LINKS.length - 1 ? 'border-r-0' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex">
            <button className="px-10 bg-black text-white text-sm font-black tracking-widest uppercase hover:bg-zinc-800 transition-all duration-300 cursor-pointer">
              TICKETS
            </button>
          </div>

          {/* Mobile Nav */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="md:hidden flex-1 flex items-center justify-end px-6 text-black cursor-pointer">
                <Menu className="w-8 h-8" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-white border-l-[3px] border-black text-black w-[320px] p-0">
              <div className="flex flex-col h-full">
                <div className="h-20 border-b-[3px] border-black flex items-center px-8">
                  <span className="text-3xl font-black tracking-tighter uppercase">MoMA.</span>
                </div>
                {NAV_LINKS.map((link) => (
                  <Link 
                    key={link.label} 
                    href={link.href} 
                    className="flex-1 border-b-[3px] border-black flex items-center px-8 text-2xl font-black tracking-widest uppercase hover:bg-black hover:text-white transition-colors cursor-pointer"
                  >
                    {link.label}
                  </Link>
                ))}
                <button className="h-24 bg-black text-white text-xl font-black tracking-widest uppercase cursor-pointer">
                  BUY TICKETS
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* ─── 2. HERO PARALLAX (BRUTALIST TYPOGRAPHY) ─── */}
      <section className="relative pt-20 h-[100vh] flex flex-col overflow-hidden bg-white">
        <div className="flex-1 flex flex-col md:flex-row">
          {/* Left Text Block */}
          <div className="w-full md:w-[60%] flex flex-col justify-center p-8 md:p-16 lg:p-24 border-r-[3px] border-black relative z-10 bg-white">
            <motion.div style={{ y: textY }}>
              <Reveal>
                <div className="inline-block border-[3px] border-black px-4 py-2 font-black text-xs uppercase tracking-widest mb-12 bg-[#FF3333] text-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  CURRENT EXHIBITION : 24.10 — 12.02
                </div>
              </Reveal>
              
              <Reveal delay={0.1}>
                <h1 className="text-[12vw] md:text-[8vw] lg:text-[7vw] font-black tracking-tighter text-black mb-6 leading-[0.8] uppercase">
                  RADICAL<br />
                  STRUCTURES
                </h1>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="text-xl md:text-2xl text-black font-medium max-w-xl mb-12 leading-snug border-l-[6px] border-[#FF3333] pl-6">
                  A comprehensive survey of post-war architectural brutalism and its lasting impact on contemporary urban form.
                </p>
              </Reveal>

              <Reveal delay={0.3} className="flex flex-col sm:flex-row gap-6">
                <button className="px-10 py-5 bg-black text-white font-black uppercase tracking-widest text-sm hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_rgba(255,51,51,1)] transition-all duration-200 cursor-pointer border-[3px] border-black">
                  PLAN YOUR VISIT
                </button>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="px-10 py-5 bg-white text-black font-black uppercase tracking-widest text-sm hover:bg-zinc-100 transition-colors duration-200 cursor-pointer border-[3px] border-black flex items-center justify-center gap-3">
                      <Play className="w-5 h-5 fill-black" /> VIEW TRAILER
                    </button>
                  </DialogTrigger>
                  <DialogContent className="bg-black border-[3px] border-white text-white sm:max-w-[1000px] p-0 overflow-hidden rounded-none">
                    <div className="aspect-video relative w-full bg-black flex items-center justify-center">
                      <div className="w-16 h-16 border-t-[6px] border-white animate-spin" />
                    </div>
                  </DialogContent>
                </Dialog>
              </Reveal>
            </motion.div>
          </div>

          {/* Right Image Block */}
          <div className="w-full md:w-[40%] relative overflow-hidden hidden md:block border-b-[3px] md:border-b-0 border-black">
            <motion.div style={{ y: heroY, scale: imgScale }} className="absolute inset-[-20%] w-[140%] h-[140%]">
              <Image 
                src="https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=1600&q=80" 
                alt="Brutalist Architecture" 
                fill 
                className="object-cover grayscale contrast-125"
                priority
              />
              <div className="absolute inset-0 bg-red-500/10 mix-blend-multiply" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 3. STATS BAR (BRUTALIST GRID) ─── */}
      <section className="border-y-[3px] border-black bg-white relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-5 divide-x-[3px] divide-y-[3px] md:divide-y-0 divide-black">
          {STATS.map((stat, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="flex flex-col items-center justify-center text-center p-8 md:p-12 hover:bg-black hover:text-white transition-colors duration-300 group cursor-crosshair">
                <div className="text-5xl lg:text-7xl font-black mb-4 tracking-tighter">
                  {stat.value}<span className="text-[#FF3333]">{stat.suffix}</span>
                </div>
                <div className="text-xs font-black uppercase tracking-widest text-zinc-500 group-hover:text-zinc-400">
                  {stat.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── 4. FEATURES (TABS) ─── */}
      <section id="collection" className="relative bg-white border-b-[3px] border-black">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] divide-x-[3px] divide-black min-h-[80vh]">
          
          <div className="p-8 md:p-16 flex flex-col justify-center">
            <Reveal>
              <h2 className="text-xl font-black text-[#FF3333] mb-6 uppercase tracking-widest border-l-[6px] border-[#FF3333] pl-4">DISCOVER</h2>
              <h3 className="text-5xl md:text-7xl font-black text-black mb-8 leading-[0.9] tracking-tighter uppercase">THE<br/>COLLECTION</h3>
              <p className="text-xl font-medium text-black max-w-md leading-relaxed border-t-[3px] border-black pt-8">
                Explore thousands of works of modern and contemporary art, from the late 19th century to the present.
              </p>
            </Reveal>
          </div>

          <Tabs defaultValue="contemporary" className="w-full flex flex-col bg-zinc-100">
            <TabsList className="flex flex-col sm:flex-row h-auto bg-white border-b-[3px] border-black p-0 rounded-none gap-0">
              {FEATURES.map((feature, i) => (
                <TabsTrigger 
                  key={feature.id} 
                  value={feature.id}
                  className={`flex-1 justify-center px-6 py-8 text-center data-[state=active]:bg-black data-[state=active]:text-white text-black hover:bg-zinc-200 transition-all duration-300 cursor-pointer rounded-none border-none border-r-[3px] border-black last:border-r-0`}
                >
                  <span className="text-lg font-black uppercase tracking-widest">{feature.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="flex-1 bg-white">
              <AnimatePresence mode="wait">
                {FEATURES.map((feature) => (
                  <TabsContent key={feature.id} value={feature.id} className="h-full m-0 p-0 outline-none">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      className="grid grid-cols-1 md:grid-cols-2 h-full"
                    >
                      <div className="p-8 md:p-16 flex flex-col justify-center border-b-[3px] md:border-b-0 md:border-r-[3px] border-black">
                        <div className="w-16 h-16 bg-black text-white flex items-center justify-center mb-10">
                          {feature.icon}
                        </div>
                        <h4 className="text-4xl font-black uppercase tracking-tighter text-black mb-6">{feature.title}</h4>
                        <p className="text-xl font-medium leading-relaxed mb-10">{feature.description}</p>
                        <div className="space-y-4">
                          {feature.bullets.map((bullet, i) => (
                            <div key={i} className="flex items-center gap-4">
                              <div className="w-3 h-3 bg-[#FF3333]" />
                              <span className="text-lg font-bold uppercase tracking-wide">{bullet}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="relative h-[50vh] md:h-full w-full grayscale contrast-125 hover:grayscale-0 transition-all duration-700">
                        <Image src={feature.image} alt={feature.title} fill className="object-cover" />
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
      <section className="py-32 bg-black text-white border-b-[3px] border-black overflow-hidden relative">
        <div className="max-w-[1400px] mx-auto px-8 relative z-10">
          <Reveal>
            <div className="mb-20 flex flex-col md:flex-row justify-between items-end border-b-[3px] border-white pb-8">
              <div>
                <h2 className="text-xl font-black text-[#FF3333] mb-4 uppercase tracking-widest">CRITIC'S REVIEWS</h2>
                <h3 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">PRESS.</h3>
              </div>
              <div className="hidden md:flex gap-4">
                <CarouselPrevious className="relative inset-auto translate-y-0 bg-white text-black border-none hover:bg-[#FF3333] hover:text-white w-16 h-16 rounded-none transition-colors" />
                <CarouselNext className="relative inset-auto translate-y-0 bg-white text-black border-none hover:bg-[#FF3333] hover:text-white w-16 h-16 rounded-none transition-colors" />
              </div>
            </div>
          </Reveal>

          <Carousel className="w-full">
            <CarouselContent>
              {TESTIMONIALS.map((testi, i) => (
                <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/2 pl-8">
                  <Reveal delay={i * 0.1}>
                    <Card className="bg-transparent border-[3px] border-white hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer h-full rounded-none group">
                      <CardContent className="p-12 flex flex-col h-full justify-between">
                        <div>
                          <div className="flex gap-2 mb-8">
                            {[...Array(testi.rating)].map((_, j) => (
                              <Star key={j} className="w-6 h-6 fill-current" />
                            ))}
                          </div>
                          <p className="text-3xl font-black leading-tight mb-12 uppercase">
                            "{testi.content}"
                          </p>
                        </div>
                        <div className="flex items-center gap-6 pt-8 border-t-[3px] border-white group-hover:border-black transition-colors">
                          <Avatar className="w-16 h-16 rounded-none border-[3px] border-current">
                            <AvatarImage src={testi.avatar} className="grayscale" />
                            <AvatarFallback>CR</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-black text-xl tracking-widest uppercase mb-1">{testi.name}</div>
                            <div className="font-bold text-sm uppercase tracking-widest text-[#FF3333]">{testi.role}</div>
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

      {/* ─── 6. PRICING (TICKETS) ─── */}
      <section id="visit" className="bg-zinc-100 border-b-[3px] border-black relative">
        <div className="max-w-[1400px] mx-auto p-8 md:p-16">
          <div className="text-center mb-24">
            <Reveal>
              <h2 className="text-xl font-black text-[#FF3333] mb-4 uppercase tracking-widest">ADMISSION</h2>
              <h3 className="text-6xl md:text-8xl font-black text-black mb-6 tracking-tighter uppercase">PLAN YOUR VISIT</h3>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {PRICING.map((tier, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <Card className={`relative bg-white border-[3px] border-black rounded-none transition-transform duration-300 hover:-translate-y-4 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] ${tier.recommended ? 'bg-black text-white shadow-[12px_12px_0px_0px_rgba(255,51,51,1)]' : 'text-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'}`}>
                  {tier.recommended && (
                    <div className="absolute top-0 inset-x-0 bg-[#FF3333] text-white text-sm font-black uppercase tracking-widest text-center py-3 border-b-[3px] border-black">
                      MOST POPULAR
                    </div>
                  )}
                  <CardContent className={`p-10 ${tier.recommended ? 'pt-16' : ''}`}>
                    <h4 className="text-4xl font-black uppercase tracking-tighter mb-2">{tier.title}</h4>
                    <div className={`text-sm font-black uppercase tracking-widest mb-8 ${tier.recommended ? 'text-zinc-400' : 'text-zinc-500'}`}>{tier.subtitle}</div>
                    
                    <div className="flex items-end gap-2 mb-8 border-b-[3px] border-current pb-8">
                      <span className="text-6xl font-black tracking-tighter">{tier.price}</span>
                      <span className="text-xl font-bold mb-2">{tier.duration}</span>
                    </div>

                    <p className={`text-lg font-medium mb-10 h-16 leading-snug ${tier.recommended ? 'text-zinc-300' : 'text-zinc-700'}`}>{tier.description}</p>
                    
                    <ul className="space-y-6 mb-12">
                      {tier.features.map((feat, j) => (
                        <li key={j} className="flex items-center gap-4 text-lg font-bold uppercase tracking-wide">
                          <div className={`w-3 h-3 ${tier.recommended ? 'bg-[#FF3333]' : 'bg-black'}`} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    <button className={`w-full py-6 text-xl font-black uppercase tracking-widest transition-all duration-300 border-[3px] ${tier.recommended ? 'bg-white text-black border-white hover:bg-transparent hover:text-white' : 'bg-black text-white border-black hover:bg-white hover:text-black hover:border-black'}`}>
                      SELECT
                    </button>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7. FAQ ACCORDION ─── */}
      <section className="bg-white border-b-[3px] border-black">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] divide-y-[3px] lg:divide-y-0 lg:divide-x-[3px] divide-black min-h-[60vh]">
          <div className="p-8 md:p-16 bg-[#FF3333] text-white flex flex-col justify-center">
            <Reveal>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">QUESTIONS &<br/>ANSWERS.</h2>
            </Reveal>
          </div>

          <div className="p-8 md:p-16 flex items-center">
            <Reveal className="w-full">
              <Accordion type="single" collapsible className="w-full">
                {FAQS.map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border-b-[3px] border-black last:border-b-0">
                    <AccordionTrigger className="text-left font-black text-2xl md:text-3xl hover:no-underline py-8 hover:text-[#FF3333] transition-colors uppercase tracking-tight">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-xl font-medium leading-relaxed pb-8 pr-12 text-zinc-700">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── 8. CTA BANNER ─── */}
      <section className="border-b-[3px] border-black bg-white">
        <Reveal>
          <div className="relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=1600&q=80')] bg-cover bg-center grayscale opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
            
            <div className="relative z-10 p-16 md:p-32 text-center bg-black/10 backdrop-blur-sm mix-blend-multiply">
              <Ticket className="w-24 h-24 text-black mx-auto mb-8 stroke-[1.5]" />
              <h2 className="text-[8vw] md:text-[6vw] font-black uppercase tracking-tighter text-black mb-8 leading-[0.9]">EXPERIENCE THE<br/>EXTRAORDINARY</h2>
              <button className="px-16 py-8 bg-[#FF3333] text-white text-2xl font-black uppercase tracking-widest border-[3px] border-black hover:translate-x-[-8px] hover:translate-y-[-8px] hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 cursor-pointer">
                BUY TICKETS NOW
              </button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ─── 9. FOOTER ─── */}
      <footer className="bg-black text-white p-8 md:p-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24 border-b-[3px] border-white pb-16">
            <div>
              <Link href="/" className="inline-block mb-12 cursor-pointer">
                <span className="text-6xl font-black tracking-tighter uppercase text-white hover:text-[#FF3333] transition-colors">
                  MoMA.
                </span>
              </Link>
              <p className="text-xl font-bold leading-snug mb-8 max-w-sm">
                Museum of Modern Art.<br/>
                Dedicated to being the foremost museum of modern art in the world.
              </p>
            </div>

            <div>
              <h4 className="font-black uppercase tracking-widest text-xl mb-8 text-[#FF3333]">EXPLORE</h4>
              <ul className="space-y-6">
                <li><a href="#" className="font-bold text-lg hover:text-[#FF3333] transition-colors uppercase tracking-widest cursor-pointer">EXHIBITIONS</a></li>
                <li><a href="#" className="font-bold text-lg hover:text-[#FF3333] transition-colors uppercase tracking-widest cursor-pointer">ARTISTS</a></li>
                <li><a href="#" className="font-bold text-lg hover:text-[#FF3333] transition-colors uppercase tracking-widest cursor-pointer">AUDIO GUIDE</a></li>
                <li><a href="#" className="font-bold text-lg hover:text-[#FF3333] transition-colors uppercase tracking-widest cursor-pointer">MAGAZINE</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-black uppercase tracking-widest text-xl mb-8 text-[#FF3333]">VISIT</h4>
              <ul className="space-y-6">
                <li><a href="#" className="font-bold text-lg hover:text-[#FF3333] transition-colors uppercase tracking-widest cursor-pointer">TICKETS</a></li>
                <li><a href="#" className="font-bold text-lg hover:text-[#FF3333] transition-colors uppercase tracking-widest cursor-pointer">HOURS & LOCATION</a></li>
                <li><a href="#" className="font-bold text-lg hover:text-[#FF3333] transition-colors uppercase tracking-widest cursor-pointer">STORE</a></li>
                <li><a href="#" className="font-bold text-lg hover:text-[#FF3333] transition-colors uppercase tracking-widest cursor-pointer">MEMBERSHIP</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-black uppercase tracking-widest text-xl mb-8 text-[#FF3333]">HOURS</h4>
              <ul className="space-y-6 font-bold text-lg">
                <li className="flex justify-between border-b border-white/20 pb-2">
                  <span>SUN - THU</span>
                  <span>10:30A - 5:30P</span>
                </li>
                <li className="flex justify-between border-b border-white/20 pb-2">
                  <span>FRI - SAT</span>
                  <span>10:30A - 7:00P</span>
                </li>
                <li className="pt-4">
                  <a href="#" className="text-[#FF3333] hover:text-white transition-colors underline cursor-pointer">HOLIDAY HOURS</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8 font-black uppercase tracking-widest text-sm text-zinc-500">
            <p>&copy; 2026 MoMA. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors cursor-pointer">PRIVACY</a>
              <a href="#" className="hover:text-white transition-colors cursor-pointer">TERMS</a>
              <a href="#" className="hover:text-white transition-colors cursor-pointer">ACCESSIBILITY</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}
