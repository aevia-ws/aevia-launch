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
import { Play, Menu, ArrowRight, Star, ChevronRight, CheckCircle2, Gamepad2, Cpu, Trophy, Terminal, Shield, Crosshair, Users, Globe2, ShoppingCart } from "lucide-react"

// ─── REVEAL COMPONENT ────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number, className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── DATA ────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Games", href: "#games" },
  { label: "Engine", href: "#engine" },
  { label: "Esports", href: "#esports" },
  { label: "Store", href: "#store" },
]

const STATS = [
  { value: "120", label: "Concurrent Players", suffix: "M" },
  { value: "4.8", label: "Prize Pool", suffix: "$M" },
  { value: "5", label: "AAA Titles", suffix: "" },
  { value: "12", label: "Global Server Regions", suffix: "" },
  { value: "10", label: "Years Active", suffix: "+" },
]

const FEATURES = [
  {
    id: "games",
    title: "The Multiverse",
    icon: <Gamepad2 className="w-5 h-5" />,
    description: "Immersive AAA experiences built on proprietary technology. From hyper-realistic tactical shooters to massive open-world RPGs with persistent economies.",
    bullets: [
      "Cyber-Strike: Global Offensive",
      "Neon Horizon RPG",
      "Cross-platform progression",
      "Blockchain-verified assets"
    ],
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80"
  },
  {
    id: "engine",
    title: "Void Engine 5",
    icon: <Cpu className="w-5 h-5" />,
    description: "Our proprietary game engine capable of rendering 10 million polygons per frame with real-time ray tracing and advanced physics simulation.",
    bullets: [
      "Real-time global illumination",
      "Destructible environments",
      "AI-driven NPC behaviors",
      "Seamless loading architecture"
    ],
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80"
  },
  {
    id: "esports",
    title: "Pro Circuit",
    icon: <Trophy className="w-5 h-5" />,
    description: "The most competitive tier-1 esports ecosystem in the world. Franchised leagues spanning NA, EMEA, and APAC with multi-million dollar prize pools.",
    bullets: [
      "Franchised global leagues",
      "In-game tournament integration",
      "128-tick tournament servers",
      "Official coaching analytics"
    ],
    image: "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=800&q=80"
  }
]

const TESTIMONIALS = [
  {
    name: "IGN",
    role: "Editor's Choice 2026",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    content: "Nexus Gaming hasn't just released another shooter; they've completely redefined the tactical FPS genre. The Void Engine makes every firefight feel terrifyingly real.",
    rating: 5
  },
  {
    name: "Tenz",
    role: "Pro Player, Sentinels",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    content: "The hit registration is the best I've ever seen. The 128-tick servers combined with their custom netcode means that if you miss, it's actually your fault.",
    rating: 5
  },
  {
    name: "Polygon",
    role: "Tech Review",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    content: "The neon-drenched environments of Cyber-Strike showcase exactly what next-gen hardware is capable of. It's a visual masterpiece of cyberpunk design.",
    rating: 5
  },
  {
    name: "Alex_FPS",
    role: "Twitch Streamer",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    content: "The anti-cheat is actually intrusive enough to work. I haven't seen a single spin-botter in Radiant rank since the game launched. It's refreshing.",
    rating: 5
  }
]

const PRICING = [
  {
    id: "standard",
    title: "Base Game",
    subtitle: "Free to Play",
    price: "$0",
    duration: "Forever",
    description: "Full access to all unranked and competitive game modes, 10 base agents, and all maps.",
    features: [
      "Access to all 12 core maps",
      "10 starting agents unlocked",
      "Unranked & Competitive modes",
      "Standard anti-cheat client"
    ],
    recommended: false
  },
  {
    id: "battlepass",
    title: "Premium Battle Pass",
    subtitle: "Season 04: Neon Shadows",
    price: "$10",
    duration: "Per Season",
    description: "Unlock exclusive weapon skins, player cards, and Radianite points by playing the game.",
    features: [
      "50 tiers of exclusive rewards",
      "Glitch-FX Vandal Skin",
      "30% XP Boost all season",
      "Enough premium currency for next pass"
    ],
    recommended: true
  },
  {
    id: "bundle",
    title: "Champion's Bundle",
    subtitle: "Esports Supporter Edition",
    price: "$60",
    duration: "One-time",
    description: "Limited edition cosmetics. 50% of proceeds go directly to the VCT Champions prize pool.",
    features: [
      "Champions Aura Knife",
      "Reactive Phantom Skin",
      "Exclusive player title & card",
      "Supports pro players directly"
    ],
    recommended: false
  }
]

const FAQS = [
  {
    question: "Is the game pay-to-win?",
    answer: "Absolutely not. Nexus Gaming strictly enforces a cosmetics-only monetization model. No weapon skins or battle pass items provide any in-game statistical advantage."
  },
  {
    question: "What are the minimum system requirements?",
    answer: "To run the game at 60fps (1080p), you need at least an Intel Core i3-4150, 4GB RAM, and a GTX 730. For the competitive 144Hz experience, we recommend an i5-9400F and a GTX 1050 Ti."
  },
  {
    question: "How does the Vanguard anti-cheat work?",
    answer: "Our proprietary kernel-level anti-cheat loads at boot to prevent cheat software from hiding its execution. It is highly optimized and uses machine learning to detect anomalous aiming patterns."
  },
  {
    question: "Is cross-play supported?",
    answer: "Yes, console players (PS5/Xbox) can play together. However, to maintain competitive integrity, PC players are kept in a separate matchmaking pool unless a console player queues specifically with a PC friend."
  },
  {
    question: "How often do you release new agents?",
    answer: "We aim for a balanced meta by releasing one new agent every episode (approximately every 6 months). This gives the competitive scene time to adapt to new utility."
  },
  {
    question: "Can I host my own custom tournaments?",
    answer: "Yes! The in-game tournament client allows anyone to organize brackets, set custom rules, and stream directly using our spectator client API."
  },
  {
    question: "What happens if I disconnect during a ranked match?",
    answer: "You have 3 minutes to reconnect before receiving an AFK penalty. Your team will receive a slight economy boost and ultimate orb to compensate for your absence."
  },
  {
    question: "Do you offer a bug bounty program?",
    answer: "Yes, we pay up to $100,000 for verified exploits found in our Vanguard anti-cheat, and up to $10,000 for game-breaking bugs reported through our HackerOne portal."
  },
  {
    question: "How do I report toxic players?",
    answer: "We take player behavior very seriously. Use the in-game scoreboard to report players for voice or text toxicity. Our automated system analyzes logs and applies voice bans or hardware bans for repeat offenders."
  },
  {
    question: "Can I play on MacOS or Linux?",
    answer: "Currently, our Vanguard anti-cheat only supports Windows 10/11 due to its kernel-level requirements. We are exploring cloud-gaming partnerships to bring the game to MacOS users in the future."
  }
]

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────
export default function NexusGamingTemplate() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  
  // Parallax Values
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"])

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050505] text-[#E0E0E0] font-sans selection:bg-[#00FF41] selection:text-[#050505]" style={{ overflowX: "hidden", scrollBehavior: "smooth" }}>
      
      {/* ─── 1. NAVBAR (CYBERPUNK GLITCH) ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/80 backdrop-blur-md border-b border-[#00FF41]/20 transition-all duration-300">
        <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group cursor-pointer relative">
            <div className="absolute -inset-2 bg-[#00FF41] opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300" />
            <Terminal className="w-6 h-6 text-[#00FF41]" />
            <span className="text-2xl font-black tracking-tighter uppercase text-white">
              NEXUS<span className="text-[#00FF41]">_</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.label} 
                href={link.href} 
                className="text-xs font-bold tracking-widest uppercase text-zinc-400 hover:text-[#00FF41] transition-colors duration-200 cursor-pointer relative group"
              >
                {link.label}
                <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-[#00FF41] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-6">
            <button className="text-xs font-bold tracking-widest uppercase text-white hover:text-[#00FF41] transition-colors cursor-pointer">
              Sign In
            </button>
            <button className="px-6 py-2.5 bg-[#00FF41] text-[#050505] text-xs font-black tracking-widest uppercase hover:bg-white transition-colors duration-300 shadow-[0_0_15px_rgba(0,255,65,0.3)] hover:shadow-[0_0_25px_rgba(0,255,65,0.6)] cursor-pointer clip-path-slant">
              Play Now
            </button>
          </div>

          {/* Mobile Nav */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="md:hidden p-2 text-[#00FF41] cursor-pointer">
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#050505] border-l border-[#00FF41]/20 text-[#E0E0E0] w-full sm:w-[400px]">
              <div className="flex flex-col gap-8 mt-12">
                <span className="text-3xl font-black tracking-tighter uppercase text-white mb-8 border-b border-[#00FF41]/20 pb-4">
                  NEXUS<span className="text-[#00FF41]">_</span>
                </span>
                {NAV_LINKS.map((link) => (
                  <Link 
                    key={link.label} 
                    href={link.href} 
                    className="text-xl font-bold tracking-widest uppercase text-zinc-300 hover:text-[#00FF41] transition-colors cursor-pointer"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-8">
                  <button className="w-full py-4 bg-[#00FF41] text-[#050505] text-sm font-black tracking-widest uppercase cursor-pointer clip-path-slant">
                    Download Client
                  </button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* ─── 2. HERO PARALLAX (NEON GRID & GLITCH) ─── */}
      <section className="relative pt-20 h-[100vh] flex flex-col items-center justify-center overflow-hidden bg-[#050505]">
        {/* Cyberpunk Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00FF4115_1px,transparent_1px),linear-gradient(to_bottom,#00FF4115_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] z-0" />
        
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=2000&q=80" 
            alt="Cyberpunk Gaming Landscape" 
            fill 
            className="object-cover opacity-30 mix-blend-screen"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent" />
        </motion.div>

        <motion.div style={{ y: textY }} className="relative z-10 w-full px-6 flex flex-col items-center text-center">
          <Reveal>
            <Badge className="bg-[#00FF41]/10 text-[#00FF41] border border-[#00FF41]/30 mb-8 px-4 py-1.5 rounded-none font-mono text-xs uppercase tracking-widest">
              &gt; EPISODE 4: NEON PROTOCOL IS LIVE
            </Badge>
          </Reveal>
          
          <Reveal delay={0.1}>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white mb-6 uppercase leading-[0.85] relative">
              <span className="absolute -inset-1 bg-[#00FF41] blur-2xl opacity-20" />
              DEFY THE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF41] to-[#00A3FF]">
                LIMITS.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-sm md:text-lg text-zinc-400 font-mono max-w-2xl mx-auto mb-12 leading-relaxed">
              A 5v5 character-based tactical shooter where precise gunplay meets unique agent abilities. Welcome to the future of competitive gaming.
            </p>
          </Reveal>

          <Reveal delay={0.3} className="flex flex-col sm:flex-row gap-6">
            <button className="px-10 py-5 bg-[#00FF41] text-[#050505] font-black uppercase tracking-[0.2em] text-sm hover:bg-white hover:scale-105 transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(0,255,65,0.4)] clip-path-slant flex items-center justify-center gap-3">
              Play For Free
            </button>
            <Dialog>
              <DialogTrigger asChild>
                <button className="px-10 py-5 bg-transparent border border-[#00FF41]/50 text-white font-bold uppercase tracking-[0.2em] text-sm hover:bg-[#00FF41]/10 transition-colors duration-300 cursor-pointer clip-path-slant flex items-center justify-center gap-3">
                  <Play className="w-4 h-4 text-[#00FF41]" /> Watch Trailer
                </button>
              </DialogTrigger>
              <DialogContent className="bg-[#050505] border-[#00FF41]/30 text-white sm:max-w-[1000px] p-0 rounded-none overflow-hidden">
                <div className="aspect-video relative w-full bg-black flex items-center justify-center">
                  <div className="w-16 h-16 border-t-2 border-[#00FF41] rounded-full animate-spin" />
                </div>
              </DialogContent>
            </Dialog>
          </Reveal>
        </motion.div>
      </section>

      {/* ─── 3. STATS BAR (HOLOGRAPHIC) ─── */}
      <section className="py-16 border-y border-[#00FF41]/20 bg-[#0A0A0A] relative z-10">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4">
            {STATS.map((stat, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="flex flex-col items-center text-center p-4 border border-[#00FF41]/10 bg-[#050505] hover:border-[#00FF41]/50 transition-colors duration-300">
                  <div className="text-4xl lg:text-5xl font-black text-white mb-2 tracking-tighter">
                    {stat.value}<span className="text-[#00FF41]">{stat.suffix}</span>
                  </div>
                  <div className="text-[10px] text-zinc-500 font-mono font-bold uppercase tracking-widest">
                    {stat.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. FEATURES (TABS) ─── */}
      <section id="games" className="py-32 relative bg-[#050505] border-b border-[#00FF41]/10">
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20">
            <Reveal className="max-w-2xl">
              <h2 className="text-xs font-mono font-bold text-[#00FF41] mb-4 uppercase tracking-[0.3em]">System Architecture</h2>
              <h3 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tighter">The Ecosystem.</h3>
            </Reveal>
          </div>

          <Tabs defaultValue="games" className="w-full flex flex-col lg:flex-row gap-12 lg:gap-16">
            <div className="lg:w-1/3">
              <TabsList className="flex flex-col h-auto bg-transparent gap-4 items-stretch">
                {FEATURES.map((feature) => (
                  <TabsTrigger 
                    key={feature.id} 
                    value={feature.id}
                    className="justify-start px-6 py-6 text-left data-[state=active]:bg-[#00FF41]/10 data-[state=active]:text-white text-zinc-500 hover:text-white transition-all duration-300 cursor-pointer rounded-none border border-transparent data-[state=active]:border-[#00FF41]/50 clip-path-slant"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-[#00FF41]">{feature.icon}</div>
                      <span className="text-sm font-black uppercase tracking-widest">{feature.title}</span>
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
                      transition={{ duration: 0.4 }}
                      className="border border-[#00FF41]/20 bg-[#0A0A0A] p-1 relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-64 h-64 bg-[#00FF41] opacity-5 blur-[100px] pointer-events-none" />
                      
                      <div className="aspect-video relative w-full overflow-hidden border-b border-[#00FF41]/20">
                        <Image src={feature.image} alt={feature.title} fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
                      </div>
                      
                      <div className="p-8 md:p-12 relative z-10">
                        <h4 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">{feature.title}</h4>
                        <p className="text-zinc-400 font-mono text-sm leading-relaxed mb-8">{feature.description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
                          {feature.bullets.map((bullet, i) => (
                            <div key={i} className="flex items-center gap-3">
                              <Crosshair className="w-4 h-4 text-[#00FF41]" />
                              <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">{bullet}</span>
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

      {/* ─── 5. TESTIMONIALS (TWITCH/PRESS) ─── */}
      <section className="py-32 bg-[#0A0A0A] overflow-hidden relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00FF4105_1px,transparent_1px)] bg-[size:2rem_2rem]" />
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <Reveal>
            <div className="mb-20 text-center">
              <h2 className="text-xs font-mono font-bold text-[#00FF41] mb-4 uppercase tracking-[0.3em]">Comm-Link</h2>
              <h3 className="text-5xl font-black text-white uppercase tracking-tighter">Transmission.</h3>
            </div>
          </Reveal>

          <Carousel className="w-full max-w-6xl mx-auto">
            <CarouselContent>
              {TESTIMONIALS.map((testi, i) => (
                <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/2 pl-6">
                  <Reveal delay={i * 0.1}>
                    <Card className="bg-[#050505] border border-[#00FF41]/20 hover:border-[#00FF41] transition-colors duration-300 cursor-pointer h-full rounded-none group relative">
                      <div className="absolute top-0 left-0 w-2 h-full bg-[#00FF41]/20 group-hover:bg-[#00FF41] transition-colors" />
                      <CardContent className="p-10 flex flex-col h-full justify-between pl-12">
                        <div>
                          <div className="flex gap-1 mb-6">
                            {[...Array(testi.rating)].map((_, j) => (
                              <Star key={j} className="w-4 h-4 fill-[#00FF41] text-[#00FF41]" />
                            ))}
                          </div>
                          <p className="text-zinc-300 font-mono text-sm leading-relaxed mb-8">
                            "{testi.content}"
                          </p>
                        </div>
                        <div className="flex items-center gap-4 pt-6 border-t border-[#00FF41]/10">
                          <Avatar className="w-12 h-12 rounded-none border border-[#00FF41]/50">
                            <AvatarImage src={testi.avatar} className="grayscale" />
                            <AvatarFallback>NX</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-white font-bold text-sm uppercase tracking-widest">{testi.name}</div>
                            <div className="text-[#00FF41] text-[10px] font-mono mt-1 uppercase">{testi.role}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Reveal>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-4 mt-12">
              <CarouselPrevious className="relative inset-auto translate-y-0 bg-[#050505] border-[#00FF41]/50 text-[#00FF41] hover:bg-[#00FF41] hover:text-black transition-colors rounded-none" />
              <CarouselNext className="relative inset-auto translate-y-0 bg-[#050505] border-[#00FF41]/50 text-[#00FF41] hover:bg-[#00FF41] hover:text-black transition-colors rounded-none" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* ─── 6. PRICING (STORE) ─── */}
      <section id="store" className="py-32 bg-[#050505] relative border-t border-[#00FF41]/10">
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <Reveal>
              <h2 className="text-xs font-mono font-bold text-[#00FF41] mb-4 uppercase tracking-[0.3em]">Armory</h2>
              <h3 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tighter">Loadouts.</h3>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {PRICING.map((tier, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <Card className={`relative bg-[#0A0A0A] border ${tier.recommended ? 'border-[#00FF41] shadow-[0_0_30px_rgba(0,255,65,0.15)] z-10 lg:scale-105' : 'border-[#00FF41]/20'} rounded-none transition-all duration-300 hover:border-[#00FF41]/50 clip-path-slant`}>
                  {tier.recommended && (
                    <div className="absolute top-0 inset-x-0 bg-[#00FF41] text-[#050505] text-[10px] font-black uppercase tracking-[0.3em] text-center py-2">
                      Active Protocol
                    </div>
                  )}
                  <CardContent className={`p-10 ${tier.recommended ? 'pt-14' : ''}`}>
                    <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-4">{tier.duration}</div>
                    <h4 className="text-2xl font-black text-white uppercase tracking-tight mb-2">{tier.title}</h4>
                    <div className="text-xs text-[#00FF41] uppercase font-bold tracking-widest mb-8">{tier.subtitle}</div>
                    
                    <div className="mb-8 pb-8 border-b border-[#00FF41]/20">
                      <span className="text-5xl font-black text-white tracking-tighter">{tier.price}</span>
                    </div>

                    <p className="text-sm font-mono text-zinc-400 mb-8 h-16 leading-relaxed">{tier.description}</p>
                    
                    <ul className="space-y-4 mb-10">
                      {tier.features.map((feat, j) => (
                        <li key={j} className="flex items-start gap-3 text-xs font-bold uppercase tracking-wider text-zinc-300">
                          <CheckCircle2 className="w-4 h-4 text-[#00FF41] shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    <button className={`w-full py-5 text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 clip-path-slant ${tier.recommended ? 'bg-[#00FF41] text-[#050505] hover:bg-white' : 'bg-transparent text-white border border-[#00FF41]/50 hover:bg-[#00FF41]/10'}`}>
                      Acquire
                    </button>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7. FAQ ACCORDION ─── */}
      <section className="py-32 bg-[#0A0A0A] border-t border-[#00FF41]/10">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-xs font-mono font-bold text-[#00FF41] mb-4 uppercase tracking-[0.3em]">Intel</h2>
              <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">Database.</h3>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-[#00FF41]/20">
                  <AccordionTrigger className="text-left text-white hover:text-[#00FF41] hover:no-underline font-bold text-lg py-6 transition-colors uppercase tracking-widest">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-zinc-400 font-mono leading-relaxed pb-6 text-sm">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* ─── 8. CTA BANNER ─── */}
      <section className="py-32 px-6 bg-[#050505]">
        <Reveal>
          <div className="max-w-[1400px] mx-auto border border-[#00FF41]/30 bg-[#0A0A0A] p-16 md:p-24 text-center relative overflow-hidden clip-path-slant group">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542751110-97427bbecf20?w=1600&q=80')] bg-cover bg-center opacity-[0.05] group-hover:opacity-[0.1] transition-opacity duration-700" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00FF41] opacity-[0.03] rounded-full blur-[120px]" />
            
            <div className="relative z-10">
              <Shield className="w-16 h-16 text-[#00FF41] mx-auto mb-8" />
              <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase">Join The Vanguard.</h2>
              <p className="text-sm font-mono text-zinc-400 max-w-xl mx-auto mb-10">
                Download the client now. It's free to play, and your hardware is definitely ready for the Neon Protocol.
              </p>
              <button className="px-12 py-5 bg-[#00FF41] text-[#050505] font-black uppercase tracking-[0.2em] text-sm hover:bg-white transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(0,255,65,0.3)] clip-path-slant">
                Download Client (24GB)
              </button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ─── 9. FOOTER ─── */}
      <footer className="bg-[#050505] pt-24 pb-12 border-t border-[#00FF41]/20">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-8 cursor-pointer">
                <Terminal className="w-5 h-5 text-[#00FF41]" />
                <span className="text-xl font-black tracking-tighter uppercase text-white">
                  NEXUS<span className="text-[#00FF41]">_</span>
                </span>
              </Link>
              <p className="text-zinc-500 font-mono text-xs leading-relaxed mb-8 max-w-sm">
                Nexus Gaming Studio. Building the future of competitive tactical shooters. Blood, sweat, and millions of polygons.
              </p>
            </div>

            <div>
              <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6">Network</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-zinc-500 hover:text-[#00FF41] transition-colors text-xs font-bold uppercase tracking-wider cursor-pointer">Download Client</a></li>
                <li><a href="#" className="text-zinc-500 hover:text-[#00FF41] transition-colors text-xs font-bold uppercase tracking-wider cursor-pointer">Esports Hub</a></li>
                <li><a href="#" className="text-zinc-500 hover:text-[#00FF41] transition-colors text-xs font-bold uppercase tracking-wider cursor-pointer">Merch Store</a></li>
                <li><a href="#" className="text-zinc-500 hover:text-[#00FF41] transition-colors text-xs font-bold uppercase tracking-wider cursor-pointer">Patch Notes</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6">Corp</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-zinc-500 hover:text-[#00FF41] transition-colors text-xs font-bold uppercase tracking-wider cursor-pointer">About Us</a></li>
                <li><a href="#" className="text-zinc-500 hover:text-[#00FF41] transition-colors text-xs font-bold uppercase tracking-wider cursor-pointer">Careers</a></li>
                <li><a href="#" className="text-zinc-500 hover:text-[#00FF41] transition-colors text-xs font-bold uppercase tracking-wider cursor-pointer">Press Kit</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6">Support</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-zinc-500 hover:text-[#00FF41] transition-colors text-xs font-bold uppercase tracking-wider cursor-pointer">Player Support</a></li>
                <li><a href="#" className="text-zinc-500 hover:text-[#00FF41] transition-colors text-xs font-bold uppercase tracking-wider cursor-pointer">Server Status</a></li>
                <li><a href="#" className="text-zinc-500 hover:text-[#00FF41] transition-colors text-xs font-bold uppercase tracking-wider cursor-pointer">Report a Bug</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#00FF41]/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
            <p>&copy; 2026 NEXUS GAMING INC. ALL SYSTEMS NOMINAL.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[#00FF41] transition-colors cursor-pointer">TOS</a>
              <a href="#" className="hover:text-[#00FF41] transition-colors cursor-pointer">Privacy</a>
              <a href="#" className="hover:text-[#00FF41] transition-colors cursor-pointer">EULA</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}
