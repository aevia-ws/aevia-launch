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
import { ArrowRight, Menu, X, Star, ChevronRight, Play, CheckCircle2, Film, Video, MonitorPlay, Clapperboard, Award, Camera, Scissors, Headphones, Volume2, Mic } from "lucide-react"

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
  { label: "Roster", href: "#roster" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Studios", href: "#studios" },
  { label: "Contact", href: "#contact" },
]

const STATS = [
  { value: "48", label: "Feature Films", suffix: "" },
  { value: "12", label: "Academy Awards", suffix: "" },
  { value: "2.4", label: "Billion Box Office", suffix: "B$" },
  { value: "35", label: "Years Active", suffix: "" },
  { value: "150", label: "Commercials", suffix: "+" },
]

const FEATURES = [
  {
    id: "pre",
    title: "Pre-Production",
    icon: <Clapperboard className="w-5 h-5" />,
    description: "The foundation of every great film. We provide comprehensive script development, storyboarding, and world-class casting services.",
    bullets: [
      "Script Analysis & Doctoring",
      "Global Casting Network",
      "Location Scouting",
      "Concept Art & Storyboarding"
    ],
    image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=800&q=80"
  },
  {
    id: "production",
    title: "Production",
    icon: <Camera className="w-5 h-5" />,
    description: "State-of-the-art equipment and elite crews. From intimate indie dramas to massive blockbuster action sequences.",
    bullets: [
      "ARRI Alexa 65 & IMAX cameras",
      "Elite DGA Directors",
      "Stunt coordination",
      "Virtual Production LED Volumes"
    ],
    image: "https://images.unsplash.com/photo-1599839619722-39751411ea63?w=800&q=80"
  },
  {
    id: "post",
    title: "Post-Production",
    icon: <MonitorPlay className="w-5 h-5" />,
    description: "Where the magic truly happens. Our post houses offer Dolby Vision color grading, VFX compositing, and Dolby Atmos sound mixing.",
    bullets: [
      "Dolby Vision Color Grading",
      "CGI & VFX Compositing",
      "Dolby Atmos Sound Mixing",
      "Original Score Composition"
    ],
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80"
  }
]

const TESTIMONIALS = [
  {
    name: "Denis V.",
    role: "Director",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    content: "The virtual production stage they built for our sci-fi epic saved us months of location shooting. The technical expertise of their crew is unmatched in Hollywood.",
    rating: 5
  },
  {
    name: "Sarah G.",
    role: "Executive Producer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    content: "Working with Cinema Roster means total peace of mind. They handled a 300-person crew across 4 countries without a single budget overrun.",
    rating: 5
  },
  {
    name: "Christopher N.",
    role: "Writer / Director",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    content: "Their commitment to shooting on real film and their mastery of IMAX formats allowed us to capture the sheer scale we needed for this project.",
    rating: 5
  },
  {
    name: "Emma Stone",
    role: "Lead Actress",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    content: "The environment they create on set is so incredibly supportive. It allowed me to take risks with my performance I wouldn't have otherwise taken.",
    rating: 5
  }
]

const PRICING = [
  {
    id: "commercial",
    title: "Commercial",
    subtitle: "Brand Campaigns",
    price: "Custom",
    duration: "Per Project",
    description: "High-end commercial production for global brands. We handle everything from concept to final broadcast delivery.",
    features: [
      "Access to commercial roster directors",
      "Full production crew & equipment",
      "Casting & talent negotiation",
      "Post-production & VFX",
      "Broadcast clearance"
    ],
    recommended: false
  },
  {
    id: "feature",
    title: "Feature Film",
    subtitle: "Co-Production",
    price: "Tier 1",
    duration: "Partnership",
    description: "Full service co-production for independent and studio feature films with budgets ranging from $5M to $100M+.",
    features: [
      "Development financing",
      "A-List director attachment",
      "Studio distribution packaging",
      "Global tax incentive management",
      "Turnkey physical production"
    ],
    recommended: true
  },
  {
    id: "virtual",
    title: "Virtual Stage",
    subtitle: "LED Volume Rental",
    price: "$25k",
    duration: "/ day",
    description: "Rent our state-of-the-art 360° LED volume stage powered by Unreal Engine 5 for real-time in-camera VFX.",
    features: [
      "100ft x 24ft curved LED wall",
      "Unreal Engine 5 brain bar",
      "Motion tracking cameras",
      "On-set Unreal operators",
      "Pre-viz lighting setup"
    ],
    recommended: false
  }
]

const FAQS = [
  {
    question: "Do you accept unsolicited scripts?",
    answer: "Due to legal reasons, we cannot accept or read unsolicited scripts or treatments. Submissions must come through a licensed literary agent or entertainment attorney."
  },
  {
    question: "Can we rent your equipment without crew?",
    answer: "No, our proprietary camera packages (including our custom IMAX rigs) and lighting equipment are reserved exclusively for projects produced or co-produced by Cinema Roster."
  },
  {
    question: "Do you offer post-production services à la carte?",
    answer: "Yes, our post-production facilities in Los Angeles and London offer color grading, sound mixing, and VFX services to external productions based on availability."
  },
  {
    question: "How do you handle international tax incentives?",
    answer: "Our in-house finance team handles all international tax rebates, gap financing, and local production services. We have active partnerships in the UK, Canada, Hungary, and Australia."
  },
  {
    question: "Do you shoot on film or digital?",
    answer: "We support both. We maintain one of the largest private inventories of 35mm and 65mm film cameras in the world, alongside the latest digital cinema cameras from ARRI and RED."
  },
  {
    question: "How do we hire a director from your roster?",
    answer: "Please contact our commercial or feature representation teams with your creative brief, budget, and timeline. We will curate a list of available directors that fit your project's aesthetic."
  },
  {
    question: "Do you offer music supervision?",
    answer: "Yes. Our in-house music department handles licensing, original score composition, and sound design. We have direct relationships with major labels and independent composers globally."
  },
  {
    question: "Are your virtual stages available globally?",
    answer: "Our primary LED volumes are located in Los Angeles and London. However, we have partnered stages in Vancouver and Sydney that meet our technical specifications for remote shooting."
  }
]

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────
export default function CinemaRosterTemplate() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  
  // Parallax Values
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"])

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5] font-sans selection:bg-[#E50914] selection:text-white" style={{ overflowX: "hidden", scrollBehavior: "smooth" }}>
      
      {/* ─── 1. NAVBAR (CINEMATIC) ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent transition-all duration-300">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 h-24 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group cursor-pointer">
            <span className="text-2xl font-black tracking-[0.2em] uppercase text-white">
              Roster<span className="text-[#E50914]">.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.label} 
                href={link.href} 
                className="text-[11px] font-bold tracking-[0.3em] uppercase text-zinc-300 hover:text-white transition-colors duration-200 cursor-pointer"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button className="text-[11px] font-bold tracking-[0.3em] uppercase text-white hover:text-[#E50914] transition-colors cursor-pointer flex items-center gap-2">
              <Play className="w-3 h-3" /> Showreel
            </button>
          </div>

          {/* Mobile Nav */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="md:hidden p-2 text-white cursor-pointer">
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#0A0A0A] border-l border-white/10 text-white w-full sm:w-[400px]">
              <div className="flex flex-col gap-8 mt-16">
                {NAV_LINKS.map((link) => (
                  <Link 
                    key={link.label} 
                    href={link.href} 
                    className="text-2xl font-black tracking-[0.2em] uppercase text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {link.label}
                  </Link>
                ))}
                <Separator className="bg-white/10 my-4" />
                <button className="py-4 border border-white text-white text-[11px] font-bold tracking-[0.3em] uppercase cursor-pointer">
                  Play Showreel
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* ─── 2. HERO PARALLAX (FULLSCREEN CINEMATIC) ─── */}
      <section className="relative h-[100vh] flex items-center justify-center overflow-hidden bg-black">
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=2000&q=80" 
            alt="Cinematic production set" 
            fill 
            className="object-cover opacity-60 mix-blend-screen"
            priority
          />
          {/* Cinematic aspect ratio bars overlay */}
          <div className="absolute inset-x-0 top-0 h-[10vh] bg-black z-10" />
          <div className="absolute inset-x-0 bottom-0 h-[10vh] bg-black z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80" />
        </motion.div>

        <motion.div style={{ y: textY }} className="relative z-20 w-full px-6 md:px-12 flex flex-col items-center text-center mt-20">
          <Reveal>
            <div className="flex items-center gap-4 mb-8 opacity-80">
              <Award className="w-6 h-6 text-[#E50914]" />
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-white">Palme d'Or Winner 2026</span>
              <Award className="w-6 h-6 text-[#E50914]" />
            </div>
          </Reveal>
          
          <Reveal delay={0.1}>
            <h1 className="text-6xl md:text-8xl lg:text-[10vw] font-black tracking-tighter text-white mb-6 leading-[0.85] uppercase">
              Visual <br />
              Storytelling.
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-lg md:text-xl text-zinc-300 font-medium max-w-2xl mx-auto mb-12 leading-relaxed">
              A premium production company representing the world's most visionary directors for feature films, television, and commercials.
            </p>
          </Reveal>

          <Reveal delay={0.3} className="flex flex-col sm:flex-row gap-6">
            <Dialog>
              <DialogTrigger asChild>
                <button className="w-full sm:w-auto px-10 py-5 bg-[#E50914] text-white font-black uppercase tracking-[0.2em] text-[11px] hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer flex items-center justify-center gap-3">
                  <Play className="w-4 h-4 fill-current" /> Play 2026 Reel
                </button>
              </DialogTrigger>
              <DialogContent className="bg-black border-white/10 text-white sm:max-w-[1200px] p-0 overflow-hidden">
                <div className="aspect-[2.35/1] relative w-full bg-black flex items-center justify-center">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1600&q=80')] bg-cover opacity-50" />
                  <div className="w-16 h-16 rounded-full border-t-[3px] border-[#E50914] animate-spin relative z-10" />
                </div>
              </DialogContent>
            </Dialog>
            <button className="w-full sm:w-auto px-10 py-5 bg-transparent border border-white text-white font-black uppercase tracking-[0.2em] text-[11px] hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer">
              View Roster
            </button>
          </Reveal>
        </motion.div>
      </section>

      {/* ─── 3. STATS BAR ─── */}
      <section className="py-20 border-y border-white/10 bg-[#0A0A0A] relative z-10">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12 md:gap-4 divide-x-0 md:divide-x divide-white/10">
            {STATS.map((stat, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="flex flex-col items-center text-center">
                  <div className="text-4xl lg:text-5xl font-black text-white mb-3 tracking-tighter">
                    {stat.value}<span className="text-[#E50914] text-3xl ml-1">{stat.suffix}</span>
                  </div>
                  <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.3em]">
                    {stat.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. FEATURES (TABS) ─── */}
      <section id="capabilities" className="py-32 relative bg-[#111]">
        <div className="max-w-[1600px] mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <Reveal>
              <h2 className="text-[10px] font-bold text-[#E50914] mb-4 uppercase tracking-[0.4em]">Capabilities</h2>
              <h3 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter">End-to-End.</h3>
              <p className="text-zinc-400 max-w-2xl mx-auto leading-relaxed text-lg">
                We control every aspect of the pipeline. From acquiring the underlying IP to the final Dolby Vision color grade.
              </p>
            </Reveal>
          </div>

          <Tabs defaultValue="production" className="w-full flex flex-col lg:flex-row gap-16 lg:gap-24">
            <div className="lg:w-1/3">
              <TabsList className="flex flex-col h-auto bg-transparent gap-0 items-stretch border-l-2 border-white/10">
                {FEATURES.map((feature) => (
                  <TabsTrigger 
                    key={feature.id} 
                    value={feature.id}
                    className="justify-start px-8 py-8 text-left data-[state=active]:border-l-2 data-[state=active]:border-[#E50914] data-[state=active]:bg-white/5 data-[state=active]:text-white text-zinc-500 hover:text-white transition-all duration-300 cursor-pointer rounded-none border-l-2 border-transparent -ml-[2px]"
                  >
                    <div className="flex items-center gap-6">
                      <div className="text-current">{feature.icon}</div>
                      <span className="text-sm font-black uppercase tracking-[0.2em]">{feature.title}</span>
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
                      className="group"
                    >
                      <div className="aspect-[2.35/1] relative w-full overflow-hidden mb-12 bg-black">
                        <Image src={feature.image} alt={feature.title} fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent" />
                      </div>
                      
                      <div className="max-w-2xl">
                        <h4 className="text-3xl font-black uppercase tracking-tighter text-white mb-6">{feature.title}</h4>
                        <p className="text-zinc-400 leading-relaxed mb-10 text-lg">{feature.description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                          {feature.bullets.map((bullet, i) => (
                            <div key={i} className="flex items-start gap-4">
                              <CheckCircle2 className="w-5 h-5 text-[#E50914] shrink-0" />
                              <span className="text-sm text-zinc-300 font-bold uppercase tracking-wider">{bullet}</span>
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
      <section className="py-32 bg-[#0A0A0A] border-y border-white/10 overflow-hidden relative">
        <div className="max-w-[1600px] mx-auto px-6 relative z-10">
          <Reveal>
            <div className="mb-20 flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-8">
              <div>
                <h2 className="text-[10px] font-bold text-[#E50914] mb-4 uppercase tracking-[0.4em]">Testimonials</h2>
                <h3 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-white">Collaborators.</h3>
              </div>
              <div className="hidden md:flex gap-4">
                <CarouselPrevious className="relative inset-auto translate-y-0 bg-transparent text-white border border-white/20 hover:bg-white hover:text-black w-16 h-16 rounded-full transition-colors" />
                <CarouselNext className="relative inset-auto translate-y-0 bg-transparent text-white border border-white/20 hover:bg-white hover:text-black w-16 h-16 rounded-full transition-colors" />
              </div>
            </div>
          </Reveal>

          <Carousel className="w-full">
            <CarouselContent>
              {TESTIMONIALS.map((testi, i) => (
                <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/2 pl-8">
                  <Reveal delay={i * 0.1}>
                    <Card className="bg-[#111] border-white/5 hover:border-[#E50914]/50 transition-colors duration-500 cursor-pointer h-full rounded-none">
                      <CardContent className="p-12 flex flex-col h-full justify-between">
                        <div>
                          <div className="flex gap-2 mb-8">
                            {[...Array(testi.rating)].map((_, j) => (
                              <Star key={j} className="w-5 h-5 fill-[#E50914] text-[#E50914]" />
                            ))}
                          </div>
                          <p className="text-2xl font-light leading-relaxed mb-12 text-zinc-300 font-serif italic">
                            "{testi.content}"
                          </p>
                        </div>
                        <div className="flex items-center gap-6 pt-8 border-t border-white/10">
                          <Avatar className="w-16 h-16 rounded-full border-2 border-[#E50914]/30">
                            <AvatarImage src={testi.avatar} className="grayscale" />
                            <AvatarFallback>CR</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-black text-sm tracking-widest uppercase mb-1 text-white">{testi.name}</div>
                            <div className="font-bold text-[10px] uppercase tracking-[0.2em] text-zinc-500">{testi.role}</div>
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

      {/* ─── 6. PRICING / SERVICES ─── */}
      <section id="studios" className="py-32 bg-[#111] relative">
        <div className="max-w-[1600px] mx-auto px-6 relative z-10">
          <div className="text-center mb-24 max-w-2xl mx-auto">
            <Reveal>
              <h2 className="text-[10px] font-bold text-[#E50914] mb-4 uppercase tracking-[0.4em]">Divisions</h2>
              <h3 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tighter uppercase">Our Services</h3>
              <p className="text-sm font-medium text-zinc-400 leading-relaxed">
                Operating across three distinct divisions to serve every scale of visual storytelling.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {PRICING.map((tier, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <Card className={`relative bg-black border ${tier.recommended ? 'border-[#E50914]' : 'border-white/10'} rounded-none transition-all duration-500 hover:border-white/50 group`}>
                  {tier.recommended && (
                    <div className="absolute top-0 inset-x-0 bg-[#E50914] text-white text-[10px] font-black uppercase tracking-[0.3em] text-center py-2">
                      Core Division
                    </div>
                  )}
                  <CardContent className={`p-10 md:p-12 ${tier.recommended ? 'pt-14' : ''}`}>
                    <h4 className="text-3xl font-black uppercase tracking-tighter mb-2 text-white">{tier.title}</h4>
                    <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#E50914] mb-8">{tier.subtitle}</div>
                    
                    <p className="text-sm font-medium text-zinc-400 mb-10 h-20 leading-relaxed">{tier.description}</p>
                    
                    <ul className="space-y-5 mb-12 border-t border-white/10 pt-10">
                      {tier.features.map((feat, j) => (
                        <li key={j} className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-zinc-300">
                          <CheckCircle2 className="w-4 h-4 text-[#E50914] shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    <button className={`w-full py-5 text-xs font-black uppercase tracking-[0.3em] transition-all duration-300 border ${tier.recommended ? 'bg-white text-black border-white hover:bg-transparent hover:text-white' : 'bg-transparent text-white border-white/30 hover:border-white'}`}>
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
      <section className="bg-[#0A0A0A] border-y border-white/10">
        <div className="max-w-[1000px] mx-auto px-6 py-32">
          <Reveal>
            <div className="text-center mb-20">
              <h2 className="text-[10px] font-bold text-[#E50914] mb-6 uppercase tracking-[0.4em]">Information</h2>
              <h3 className="text-5xl font-black uppercase tracking-tighter text-white">Production FAQ.</h3>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-b border-white/10">
                  <AccordionTrigger className="text-left font-black text-xl hover:no-underline py-8 hover:text-[#E50914] transition-colors uppercase tracking-widest text-white">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-lg font-medium leading-relaxed pb-8 text-zinc-400">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* ─── 8. CTA BANNER ─── */}
      <section className="bg-black">
        <Reveal>
          <div className="relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=1600&q=80')] bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
            
            <div className="relative z-10 p-20 md:p-40 text-center">
              <Film className="w-16 h-16 text-white mx-auto mb-10" />
              <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white mb-10 leading-[0.9]">Ready to <br/>Shoot.</h2>
              <button className="px-14 py-6 bg-[#E50914] text-white text-[11px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer">
                Contact Production
              </button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ─── 9. FOOTER ─── */}
      <footer className="bg-[#0A0A0A] text-white pt-24 pb-12 border-t border-white/10">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24 border-b border-white/10 pb-16">
            <div>
              <Link href="/" className="inline-block mb-8 cursor-pointer">
                <span className="text-3xl font-black tracking-[0.2em] uppercase text-white">
                  Roster<span className="text-[#E50914]">.</span>
                </span>
              </Link>
              <p className="text-sm font-medium text-zinc-500 leading-relaxed max-w-sm">
                Los Angeles based premium production company. We create culture-defining films, television, and commercials.
              </p>
            </div>

            <div>
              <h4 className="font-bold uppercase tracking-[0.3em] text-[10px] mb-8 text-[#E50914]">Offices</h4>
              <ul className="space-y-6">
                <li className="text-sm font-bold text-zinc-400 leading-relaxed uppercase tracking-widest">
                  <span className="text-white block mb-1">Los Angeles</span>
                  West Hollywood, CA
                </li>
                <li className="text-sm font-bold text-zinc-400 leading-relaxed uppercase tracking-widest">
                  <span className="text-white block mb-1">London</span>
                  Soho, UK
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold uppercase tracking-[0.3em] text-[10px] mb-8 text-[#E50914]">Links</h4>
              <ul className="space-y-4">
                <li><a href="#" className="font-bold text-xs hover:text-white text-zinc-400 transition-colors uppercase tracking-widest cursor-pointer">Directors</a></li>
                <li><a href="#" className="font-bold text-xs hover:text-white text-zinc-400 transition-colors uppercase tracking-widest cursor-pointer">Work</a></li>
                <li><a href="#" className="font-bold text-xs hover:text-white text-zinc-400 transition-colors uppercase tracking-widest cursor-pointer">News</a></li>
                <li><a href="#" className="font-bold text-xs hover:text-white text-zinc-400 transition-colors uppercase tracking-widest cursor-pointer">Careers</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold uppercase tracking-[0.3em] text-[10px] mb-8 text-[#E50914]">Representation</h4>
              <ul className="space-y-6 font-bold text-xs text-zinc-400 uppercase tracking-widest">
                <li>
                  <span className="text-white block mb-1 text-[10px] text-[#E50914]">Features</span>
                  features@roster.com
                </li>
                <li>
                  <span className="text-white block mb-1 text-[10px] text-[#E50914]">Commercials</span>
                  commercials@roster.com
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8 font-bold uppercase tracking-[0.3em] text-[10px] text-zinc-600">
            <p>&copy; 2026 ROSTER FILMS LLC.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors cursor-pointer">Privacy</a>
              <a href="#" className="hover:text-white transition-colors cursor-pointer">Terms</a>
              <a href="#" className="hover:text-white transition-colors cursor-pointer">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}
