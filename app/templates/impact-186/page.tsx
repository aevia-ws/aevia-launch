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
import { ArrowRight, Menu, X, Star, ChevronRight, Play, CheckCircle2, Building2, Ruler, PaintBucket, Layers, Home, MapPin, Mail, Phone, Camera, Briefcase, FileText } from "lucide-react"

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
  { label: "Selected Works", href: "#works" },
  { label: "Studio", href: "#studio" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
]

const STATS = [
  { value: "45", label: "Built Projects", suffix: "+" },
  { value: "12", label: "Design Awards", suffix: "" },
  { value: "2010", label: "Year Founded", suffix: "" },
  { value: "4", label: "Global Offices", suffix: "" },
  { value: "100", label: "Architects", suffix: "+" },
]

const FEATURES = [
  {
    id: "residential",
    title: "Residential Architecture",
    icon: <Home className="w-5 h-5" />,
    description: "Private residences that blur the boundary between shelter and landscape. We design monolithic, brutalist homes that prioritize light, air, and enduring materials.",
    bullets: [
      "Custom private homes",
      "Off-grid coastal retreats",
      "Adaptive reuse lofts",
      "Passive house certification"
    ],
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"
  },
  {
    id: "commercial",
    title: "Cultural & Commercial",
    icon: <Building2 className="w-5 h-5" />,
    description: "Public spaces designed to outlast their creators. Museums, galleries, and corporate headquarters constructed with exposed concrete, steel, and structural glass.",
    bullets: [
      "Museums & Galleries",
      "Corporate Headquarters",
      "Boutique Hospitality",
      "Urban master planning"
    ],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80"
  },
  {
    id: "interior",
    title: "Spatial Design",
    icon: <Layers className="w-5 h-5" />,
    description: "Interior architecture stripped to its essential geometries. We focus on raw textures, monumental forms, and the interplay of shadow across austere surfaces.",
    bullets: [
      "Bespoke furniture design",
      "Lighting choreography",
      "Material sourcing (stone/timber)",
      "Retail flagship interiors"
    ],
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80"
  }
]

const TESTIMONIALS = [
  {
    name: "Architectural Digest",
    role: "Review of The Concrete House",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    content: "ArchiTectura has managed to make brutalism feel intimate. The rigorous geometry of their latest residential project is softened by masterful light shafts.",
    rating: 5
  },
  {
    name: "Marcus T.",
    role: "Private Client",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    content: "Working with the studio was an exercise in reductive thinking. They stripped away all our preconceived notions of a house until only the pure essence remained.",
    rating: 5
  },
  {
    name: "Dezeen Magazine",
    role: "Studio Profile",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    content: "One of the few contemporary practices that actually understands mass and void. Their public buildings are already feeling like modern ruins in the best way possible.",
    rating: 5
  },
  {
    name: "Sarah Jenkins",
    role: "Director, Modern Art Foundation",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    content: "The museum gallery they designed for us is functionally perfect, yet aesthetically silent. It never competes with the art, it merely elevates it.",
    rating: 5
  }
]

const PRICING = [
  {
    id: "concept",
    title: "Concept Phase",
    subtitle: "Ideation & Feasibility",
    price: "From €25k",
    duration: "2-3 Months",
    description: "Initial volumetric studies, site analysis, and conceptual rendering. Establishing the architectural language of your project.",
    features: [
      "Topographical site analysis",
      "Zoning & code review",
      "Massing studies (physical & digital)",
      "Moodboards & material palettes",
      "Preliminary cost estimation"
    ],
    recommended: false
  },
  {
    id: "full",
    title: "Full Commission",
    subtitle: "Design to Completion",
    price: "12-15%",
    duration: "Of Construction Cost",
    description: "The complete architectural service. From the first sketch to the final punch list, we oversee every millimeter of the build.",
    features: [
      "All conceptual deliverables",
      "Complete construction documents",
      "Structural engineering coordination",
      "Contractor bidding & selection",
      "Weekly site supervision",
      "Bespoke interior detailing"
    ],
    recommended: true
  },
  {
    id: "consulting",
    title: "Design Advisory",
    subtitle: "For Developers",
    price: "Custom",
    duration: "Retainer",
    description: "High-level architectural direction and aesthetic oversight for large-scale developments or masterplans.",
    features: [
      "Masterplan review",
      "Facade design & detailing",
      "Public space choreography",
      "Design vocabulary guidelines",
      "Sustainability consulting"
    ],
    recommended: false
  }
]

const FAQS = [
  {
    question: "Do you take on international projects?",
    answer: "Yes. While our headquarters are in Berlin, we have completed projects in Switzerland, Japan, the US, and Mexico. We frequently partner with local Architects of Record to ensure code compliance."
  },
  {
    question: "What is your typical project timeline?",
    answer: "For a custom private residence, the design and permitting phase typically takes 6-9 months, followed by 12-18 months of construction. Large cultural projects span 3-5 years."
  },
  {
    question: "Do you offer interior design services?",
    answer: "We view interior design and architecture as an inseparable discipline. All our full commissions include comprehensive spatial design, custom millwork, and lighting design."
  },
  {
    question: "What is your stance on sustainable architecture?",
    answer: "True sustainability means building something that lasts 200 years. We prioritize passive thermal mass (concrete/stone), natural ventilation, and hyper-local material sourcing over complex mechanical solutions."
  },
  {
    question: "Do you work with existing structures?",
    answer: "Adaptive reuse is one of our core passions. We love the tension between an old industrial shell and a razor-sharp modern intervention."
  },
  {
    question: "How do we start the process?",
    answer: "It begins with a conversation. Contact our studio to arrange an initial meeting where we discuss your site, your program, and your budget to determine if we are the right fit."
  },
  {
    question: "Are your fees negotiable?",
    answer: "Our fee structure is based on the rigorous amount of time and detail we invest into every project. While we don't negotiate our percentage, we can adjust the scope of services to fit specific budgets."
  },
  {
    question: "Do you provide physical models?",
    answer: "Yes, physical modeling is a cornerstone of our design process. We craft concrete, wood, and plaster models in our in-house workshop for every major project phase."
  },
  {
    question: "Do you handle the construction management?",
    answer: "We act as the owner's representative during construction. While we do not hire the sub-contractors directly, we strictly oversee the general contractor to ensure absolute fidelity to our design intent."
  },
  {
    question: "Can we visit one of your completed projects?",
    answer: "Many of our cultural and commercial projects are open to the public. For private residences, we can arrange guided walk-throughs of select properties with permission from our past clients."
  }
]

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────
export default function ArchitecturaTemplate() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  
  // Parallax Values
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"])

  // Hover states for grid
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div ref={containerRef} className="min-h-screen bg-[#111] text-[#EFEFEF] font-sans selection:bg-[#EFEFEF] selection:text-[#111]" style={{ overflowX: "hidden", scrollBehavior: "smooth" }}>
      
      {/* ─── 1. NAVBAR (STRUCTURAL GRID) ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#111]/80 backdrop-blur-md border-b border-white/10 transition-all duration-300">
        <div className="flex h-20 max-w-[1800px] mx-auto">
          <Link href="/" className="flex items-center px-8 border-r border-white/10 group cursor-pointer w-64 shrink-0">
            <span className="text-xl font-bold tracking-widest uppercase text-white group-hover:text-zinc-400 transition-colors duration-300">
              ArchiTectura<span className="text-zinc-600">.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex flex-1">
            {NAV_LINKS.map((link, i) => (
              <Link 
                key={link.label} 
                href={link.href} 
                className="flex items-center justify-center flex-1 border-r border-white/10 text-xs font-bold tracking-[0.2em] uppercase text-zinc-400 hover:bg-white hover:text-[#111] transition-all duration-300 cursor-pointer"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex shrink-0 w-64">
            <button className="w-full h-full bg-white text-[#111] text-xs font-bold tracking-[0.2em] uppercase hover:bg-zinc-200 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2">
              <FileText className="w-4 h-4" /> Start Project
            </button>
          </div>

          {/* Mobile Nav */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="md:hidden flex-1 flex items-center justify-end px-6 text-white cursor-pointer">
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#111] border-l border-white/10 text-white w-full sm:w-[400px] p-0">
              <div className="flex flex-col h-full">
                <div className="h-20 border-b border-white/10 flex items-center px-8">
                  <span className="text-xl font-bold tracking-widest uppercase">ArchiTectura.</span>
                </div>
                {NAV_LINKS.map((link) => (
                  <Link 
                    key={link.label} 
                    href={link.href} 
                    className="flex-1 border-b border-white/10 flex items-center px-8 text-xl font-light tracking-widest uppercase hover:bg-white hover:text-[#111] transition-colors cursor-pointer"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* ─── 2. HERO PARALLAX (BRUTALIST GRID) ─── */}
      <section className="relative pt-20 h-[100vh] flex flex-col overflow-hidden bg-[#111]">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] h-full max-w-[1800px] mx-auto w-full border-x border-white/10">
          
          {/* Left Text Block */}
          <div className="flex flex-col justify-end p-8 md:p-16 border-b md:border-b-0 md:border-r border-white/10 relative z-10 bg-[#111]">
            <motion.div style={{ y: textY }}>
              <Reveal>
                <div className="w-12 h-1 bg-white mb-12" />
              </Reveal>
              
              <Reveal delay={0.1}>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white mb-8 leading-[1.1] uppercase">
                  Form <br />
                  <span className="text-zinc-500">Follows</span> <br />
                  Material.
                </h1>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="text-sm md:text-base text-zinc-400 font-medium max-w-sm mb-12 leading-relaxed tracking-wide">
                  An architecture studio dedicated to the poetics of raw materials, rigorous geometry, and the interplay of light and shadow.
                </p>
              </Reveal>

              <Reveal delay={0.3} className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-white text-[#111] font-bold uppercase tracking-widest text-xs hover:bg-zinc-200 transition-colors duration-300 cursor-pointer">
                  View Projects
                </button>
              </Reveal>
            </motion.div>
          </div>

          {/* Right Image Grid Block */}
          <div className="relative overflow-hidden hidden md:block">
            <motion.div style={{ y: heroY }} className="absolute inset-[-10%] w-[120%] h-[120%]">
              <Image 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80" 
                alt="Brutalist concrete house" 
                fill 
                className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                priority
              />
              <div className="absolute inset-0 bg-black/20" />
            </motion.div>
          </div>

        </div>
      </section>

      {/* ─── 3. STATS BAR ─── */}
      <section className="border-y border-white/10 bg-[#111] relative z-10 max-w-[1800px] mx-auto w-full border-x">
        <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-y md:divide-y-0 divide-white/10">
          {STATS.map((stat, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="flex flex-col items-center justify-center text-center p-12 hover:bg-white hover:text-[#111] transition-colors duration-500 group cursor-default">
                <div className="text-4xl lg:text-5xl font-light mb-2">
                  {stat.value}<span className="text-zinc-500 group-hover:text-zinc-400">{stat.suffix}</span>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 group-hover:text-zinc-800">
                  {stat.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── 4. FEATURES (SERVICES TABS) ─── */}
      <section id="services" className="relative bg-[#111] border-b border-white/10 max-w-[1800px] mx-auto w-full border-x">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] divide-x divide-white/10 min-h-[80vh]">
          
          <div className="p-8 md:p-16 flex flex-col justify-center">
            <Reveal>
              <h2 className="text-[10px] font-bold text-zinc-500 mb-6 uppercase tracking-[0.3em]">Practice</h2>
              <h3 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-[1.1] tracking-tighter uppercase">Disci<br/>plines.</h3>
              <p className="text-sm font-medium text-zinc-400 max-w-sm leading-relaxed border-t border-white/10 pt-8">
                We operate across multiple scales, from bespoke furniture to urban masterplans, applying the same rigorous methodology to every commission.
              </p>
            </Reveal>
          </div>

          <Tabs defaultValue="residential" className="w-full flex flex-col bg-[#111]">
            <TabsList className="flex flex-col sm:flex-row h-auto bg-[#111] border-b border-white/10 p-0 rounded-none gap-0">
              {FEATURES.map((feature, i) => (
                <TabsTrigger 
                  key={feature.id} 
                  value={feature.id}
                  className={`flex-1 justify-center px-6 py-8 text-center data-[state=active]:bg-white data-[state=active]:text-[#111] text-zinc-500 hover:bg-white/5 transition-all duration-300 cursor-pointer rounded-none border-none border-r border-white/10 last:border-r-0`}
                >
                  <span className="text-xs font-bold uppercase tracking-widest">{feature.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="flex-1 bg-[#111]">
              <AnimatePresence mode="wait">
                {FEATURES.map((feature) => (
                  <TabsContent key={feature.id} value={feature.id} className="h-full m-0 p-0 outline-none">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="grid grid-cols-1 md:grid-cols-2 h-full divide-y md:divide-y-0 md:divide-x divide-white/10"
                    >
                      <div className="p-8 md:p-16 flex flex-col justify-center">
                        <div className="w-12 h-12 border border-white/20 flex items-center justify-center mb-10 text-white rounded-full">
                          {feature.icon}
                        </div>
                        <h4 className="text-3xl font-bold uppercase tracking-tighter text-white mb-6">{feature.title}</h4>
                        <p className="text-sm text-zinc-400 leading-relaxed mb-10">{feature.description}</p>
                        <div className="space-y-4">
                          {feature.bullets.map((bullet, i) => (
                            <div key={i} className="flex items-center gap-4 text-sm font-medium tracking-widest text-white uppercase">
                              <div className="w-1 h-1 bg-white" />
                              <span>{bullet}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="relative h-[40vh] md:h-full w-full grayscale hover:grayscale-0 transition-all duration-700">
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
      <section className="py-32 bg-[#0A0A0A] text-white border-b border-white/10 overflow-hidden relative max-w-[1800px] mx-auto border-x">
        <div className="px-8 md:px-16 relative z-10">
          <Reveal>
            <div className="mb-20 flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-8">
              <div>
                <h2 className="text-[10px] font-bold text-zinc-500 mb-4 uppercase tracking-[0.3em]">Critical Acclaim</h2>
                <h3 className="text-5xl md:text-6xl font-bold uppercase tracking-tighter">Perspectives.</h3>
              </div>
              <div className="hidden md:flex gap-4">
                <CarouselPrevious className="relative inset-auto translate-y-0 bg-transparent text-white border border-white/20 hover:bg-white hover:text-[#111] w-12 h-12 rounded-full transition-colors" />
                <CarouselNext className="relative inset-auto translate-y-0 bg-transparent text-white border border-white/20 hover:bg-white hover:text-[#111] w-12 h-12 rounded-full transition-colors" />
              </div>
            </div>
          </Reveal>

          <Carousel className="w-full">
            <CarouselContent>
              {TESTIMONIALS.map((testi, i) => (
                <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/2 pl-8">
                  <Reveal delay={i * 0.1}>
                    <Card className="bg-transparent border border-white/10 hover:border-white/40 transition-colors duration-500 cursor-pointer h-full rounded-none">
                      <CardContent className="p-10 md:p-14 flex flex-col h-full justify-between">
                        <div>
                          <div className="flex gap-2 mb-8">
                            {[...Array(testi.rating)].map((_, j) => (
                              <Star key={j} className="w-4 h-4 fill-white" />
                            ))}
                          </div>
                          <p className="text-2xl font-light leading-relaxed mb-12 text-zinc-300">
                            "{testi.content}"
                          </p>
                        </div>
                        <div className="flex items-center gap-6 pt-8 border-t border-white/10">
                          <Avatar className="w-14 h-14 rounded-full border border-white/20">
                            <AvatarImage src={testi.avatar} className="grayscale" />
                            <AvatarFallback>AT</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-bold text-sm tracking-widest uppercase mb-1">{testi.name}</div>
                            <div className="font-medium text-[10px] uppercase tracking-widest text-zinc-500">{testi.role}</div>
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

      {/* ─── 6. PRICING (COMMISSIONS) ─── */}
      <section id="studio" className="bg-[#111] border-b border-white/10 relative max-w-[1800px] mx-auto border-x">
        <div className="p-8 md:p-16">
          <div className="text-center mb-24 max-w-2xl mx-auto">
            <Reveal>
              <h2 className="text-[10px] font-bold text-zinc-500 mb-4 uppercase tracking-[0.3em]">Engagement</h2>
              <h3 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tighter uppercase">Commissions</h3>
              <p className="text-sm font-medium text-zinc-400 leading-relaxed">
                We accept a limited number of commissions each year to ensure the highest level of detail and partner involvement on every project.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {PRICING.map((tier, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <Card className={`relative bg-transparent border border-white/10 rounded-none transition-all duration-500 hover:border-white/50 ${tier.recommended ? 'bg-white/5' : ''}`}>
                  {tier.recommended && (
                    <div className="absolute top-0 inset-x-0 bg-white text-[#111] text-[10px] font-bold uppercase tracking-[0.3em] text-center py-2">
                      Typical Engagement
                    </div>
                  )}
                  <CardContent className={`p-10 md:p-12 ${tier.recommended ? 'pt-14' : ''}`}>
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-4">{tier.duration}</div>
                    <h4 className="text-2xl font-bold uppercase tracking-tighter mb-2">{tier.title}</h4>
                    <div className="text-xs uppercase tracking-widest text-zinc-400 mb-8">{tier.subtitle}</div>
                    
                    <div className="mb-8 pb-8 border-b border-white/10">
                      <span className="text-4xl font-light tracking-tighter">{tier.price}</span>
                    </div>

                    <p className="text-sm font-medium text-zinc-400 mb-10 h-16 leading-relaxed">{tier.description}</p>
                    
                    <ul className="space-y-4 mb-12">
                      {tier.features.map((feat, j) => (
                        <li key={j} className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-zinc-300">
                          <div className="w-1.5 h-1.5 bg-white" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    <button className={`w-full py-5 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 border ${tier.recommended ? 'bg-white text-[#111] border-white hover:bg-transparent hover:text-white' : 'bg-transparent text-white border-white/20 hover:border-white'}`}>
                      Inquire
                    </button>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7. FAQ ACCORDION ─── */}
      <section className="bg-[#111] border-b border-white/10 max-w-[1800px] mx-auto border-x">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] divide-y lg:divide-y-0 lg:divide-x divide-white/10 min-h-[60vh]">
          <div className="p-8 md:p-16 flex flex-col justify-center">
            <Reveal>
              <h2 className="text-[10px] font-bold text-zinc-500 mb-6 uppercase tracking-[0.3em]">Information</h2>
              <h3 className="text-5xl md:text-6xl font-bold uppercase tracking-tighter leading-[1.1]">Process &<br/>Parameters.</h3>
            </Reveal>
          </div>

          <div className="p-8 md:p-16 flex items-center">
            <Reveal className="w-full">
              <Accordion type="single" collapsible className="w-full">
                {FAQS.map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border-b border-white/10 last:border-b-0">
                    <AccordionTrigger className="text-left font-bold text-lg hover:no-underline py-6 hover:text-zinc-400 transition-colors uppercase tracking-widest">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm font-medium leading-relaxed pb-6 text-zinc-400 pr-8">
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
      <section className="border-b border-white/10 bg-[#111] max-w-[1800px] mx-auto border-x">
        <Reveal>
          <div className="relative overflow-hidden group border-t border-white/10">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1600&q=80')] bg-cover bg-center grayscale opacity-20 group-hover:opacity-30 transition-opacity duration-1000" />
            
            <div className="relative z-10 p-16 md:p-32 text-center bg-black/40 backdrop-blur-sm">
              <Ruler className="w-12 h-12 text-white mx-auto mb-8 stroke-[1]" />
              <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-white mb-8 leading-[1.1]">Build Something<br/>Permanent.</h2>
              <button className="px-12 py-5 bg-white text-[#111] text-xs font-bold uppercase tracking-[0.2em] hover:bg-transparent hover:text-white border hover:border-white transition-all duration-300 cursor-pointer">
                Start a Conversation
              </button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ─── 9. FOOTER ─── */}
      <footer className="bg-[#0A0A0A] text-white p-8 md:p-16 max-w-[1800px] mx-auto border-x border-white/10">
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24 border-b border-white/10 pb-16">
            <div>
              <Link href="/" className="inline-block mb-8 cursor-pointer">
                <span className="text-2xl font-bold tracking-widest uppercase text-white">
                  ArchiTectura.
                </span>
              </Link>
              <p className="text-sm font-medium text-zinc-500 leading-relaxed mb-8 max-w-sm">
                A multidisciplinary architecture studio based in Berlin, creating rigorous, timeless spaces worldwide.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#111] transition-colors rounded-full"><Camera className="w-4 h-4" /></a>
                <a href="#" className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#111] transition-colors rounded-full"><Briefcase className="w-4 h-4" /></a>
              </div>
            </div>

            <div>
              <h4 className="font-bold uppercase tracking-[0.2em] text-[10px] mb-8 text-zinc-400">Offices</h4>
              <ul className="space-y-6">
                <li className="text-sm font-medium text-zinc-500 leading-relaxed">
                  <span className="text-white block mb-1">Berlin (HQ)</span>
                  Mitte District 12<br/>10115 Berlin, DE
                </li>
                <li className="text-sm font-medium text-zinc-500 leading-relaxed">
                  <span className="text-white block mb-1">New York</span>
                  Tribeca St 45<br/>10013 NY, USA
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold uppercase tracking-[0.2em] text-[10px] mb-8 text-zinc-400">Studio</h4>
              <ul className="space-y-4">
                <li><a href="#" className="font-bold text-xs hover:text-white text-zinc-500 transition-colors uppercase tracking-widest cursor-pointer">Profile</a></li>
                <li><a href="#" className="font-bold text-xs hover:text-white text-zinc-500 transition-colors uppercase tracking-widest cursor-pointer">Selected Works</a></li>
                <li><a href="#" className="font-bold text-xs hover:text-white text-zinc-500 transition-colors uppercase tracking-widest cursor-pointer">Publications</a></li>
                <li><a href="#" className="font-bold text-xs hover:text-white text-zinc-500 transition-colors uppercase tracking-widest cursor-pointer">Careers</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold uppercase tracking-[0.2em] text-[10px] mb-8 text-zinc-400">Contact</h4>
              <ul className="space-y-4 font-medium text-sm text-zinc-500">
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-white" /> studio@architectura.com
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-white" /> +49 30 1234 5678
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8 font-bold uppercase tracking-[0.2em] text-[10px] text-zinc-600">
            <p>&copy; 2026 ARCHITECTURA STUDIO. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors cursor-pointer">Imprint</a>
              <a href="#" className="hover:text-white transition-colors cursor-pointer">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}
