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
import { ArrowRight, Menu, X, Star, Shield, ChevronRight, Play, Terminal, Cpu, Database, Network, Key, Layers, Globe, Zap, TerminalSquare, Lock, Server, CheckCircle2,  MessageCircle, MessageSquare } from "lucide-react"

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
  { label: "Protocol", href: "#protocol" },
  { label: "Infrastructure", href: "#infrastructure" },
  { label: "Ecosystem", href: "#ecosystem" },
  { label: "Developers", href: "#developers" },
]

const STATS = [
  { value: "0.2", label: "Time to Finality", suffix: "s" },
  { value: "100", label: "Transactions / sec", suffix: "k" },
  { value: "0.001", label: "Average Fee", suffix: "$" },
  { value: "1.2", label: "Total Value Locked", suffix: "B+" },
  { value: "2,500", label: "Active Nodes", suffix: "+" },
]

const FEATURES = [
  {
    id: "consensus",
    title: "PoS Consensus",
    icon: <Network className="w-6 h-6" />,
    description: "Our proprietary Proof-of-Stake consensus algorithm delivers sub-second finality while maintaining absolute Byzantine fault tolerance across a globally distributed validator set.",
    bullets: [
      "Sub-second deterministic finality",
      "Slashing conditions for malicious actors",
      "Dynamic validator rotation",
      "Energy efficient architecture"
    ],
    image: "https://images.unsplash.com/photo-1639762681485-074b7f4ec651?w=800&q=80"
  },
  {
    id: "security",
    title: "Quantum Security",
    icon: <Shield className="w-6 h-6" />,
    description: "Future-proof cryptographic primitives. Nexus Protocol implements post-quantum signatures to ensure state security against next-generation computational threats.",
    bullets: [
      "Lattice-based cryptography",
      "Formal verification of smart contracts",
      "Multi-party computation (MPC) wallets",
      "Continuous runtime monitoring"
    ],
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80"
  },
  {
    id: "interoperability",
    title: "Cross-Chain Matrix",
    icon: <Globe className="w-6 h-6" />,
    description: "Native cross-chain communication without vulnerable third-party bridges. Transfer assets and arbitrary data across all major L1s with zero slippage.",
    bullets: [
      "Trustless token bridging",
      "Cross-chain smart contract calls",
      "Shared security pool",
      "Unified liquidity routing"
    ],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80"
  }
]

const TESTIMONIALS = [
  {
    name: "Dr. Elena Rostova",
    role: "Lead Cryptographer, QuantumSec",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    content: "The post-quantum cryptographic implementation on Nexus is the most robust we have audited to date. Their lattice-based signature scheme is truly enterprise-ready.",
    rating: 5
  },
  {
    name: "Marcus Chen",
    role: "CTO, DeFi Liquid",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    content: "Migrating our DEX to Nexus dropped our latency by 90% and completely eliminated MEV sandwich attacks. The native orderbook primitives are game-changing.",
    rating: 5
  },
  {
    name: "Sarah Williams",
    role: "Founder, NFT Matrix",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    content: "Minting 100k NFTs cost us less than $10 and took under a minute. The infrastructure scale of Nexus is unmatched in the current Web3 landscape.",
    rating: 5
  },
  {
    name: "Alex V.",
    role: "Validator Operator",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    content: "Running a node is incredibly straightforward. The hardware requirements are reasonable, and the automated slashing protection gives us peace of mind.",
    rating: 5
  }
]

const PRICING = [
  {
    id: "developer",
    title: "Testnet / Dev",
    subtitle: "For independent builders",
    price: "Free",
    duration: "Forever",
    description: "Everything you need to build, test, and deploy dApps on the Nexus Testnet environment.",
    features: [
      "10,000 RPC requests / day",
      "Access to DevNet & Testnet",
      "Community Discord support",
      "Standard indexer access",
      "Free faucet tokens"
    ],
    recommended: false
  },
  {
    id: "protocol",
    title: "Protocol",
    subtitle: "For live dApps & DAOs",
    price: "$499",
    duration: "/ month",
    description: "Dedicated infrastructure for production-grade decentralized applications.",
    features: [
      "1,000,000 RPC requests / day",
      "Dedicated RPC endpoints",
      "24/7 Priority technical support",
      "Custom graph indexer deployment",
      "SLA guarantee 99.99%"
    ],
    recommended: true
  },
  {
    id: "enterprise",
    title: "Enterprise Node",
    subtitle: "For institutional operators",
    price: "Custom",
    duration: "Annual contract",
    description: "Run your own validator or highly-available enterprise infrastructure.",
    features: [
      "Unlimited RPC requests",
      "Bare-metal node deployment",
      "Dedicated solutions architect",
      "White-glove validator setup",
      "Institutional custody integration",
      "On-premise deployment options"
    ],
    recommended: false
  }
]

const FAQS = [
  {
    question: "How does Nexus achieve 100k TPS without sharding?",
    answer: "Nexus utilizes a novel parallel execution engine (NexusVM) that processes non-overlapping state transitions concurrently. Combined with our localized fee markets, this eliminates global state bottlenecks."
  },
  {
    question: "Is Nexus EVM compatible?",
    answer: "Yes, Nexus features full EVM equivalence. You can deploy your existing Solidity or Vyper smart contracts without any modifications, using the same developer tools like Hardhat or Foundry."
  },
  {
    question: "What are the hardware requirements to run a Validator?",
    answer: "To run a full validator node, we recommend 16 cores (3.0GHz+), 64GB RAM, and a 2TB NVMe SSD. A standard RPC node requires significantly less overhead."
  },
  {
    question: "How is the network secured against 51% attacks?",
    answer: "Our Delegated Proof of Stake (DPoS) model is augmented with a multi-layered slashing mechanism. Additionally, the finality gadget requires a 66% supermajority, making reorganization attacks mathematically prohibitive."
  },
  {
    question: "Has the core protocol been audited?",
    answer: "Absolutely. The Nexus core protocol, cryptography primitives, and consensus mechanism have undergone 4 rigorous audits by industry leaders including Trail of Bits, CertiK, and ConsenSys Diligence."
  },
  {
    question: "How do cross-chain messages work?",
    answer: "We use a native relayer network secured by the same validator set as the L1. Messages are batched, cryptographically signed by the quorum, and executed on the destination chain without centralized bridges."
  }
]

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────
export default function NexusWeb3Template() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  
  // Parallax Values
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
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
    <div ref={containerRef} className="min-h-screen bg-[#030305] text-[#E2E8F0] font-sans selection:bg-[#00F0FF] selection:text-black" style={{ overflowX: "hidden", scrollBehavior: "smooth" }}>
      
      {/* ─── 1. NAVBAR STICKY ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#030305]/70 backdrop-blur-xl border-b border-[#00F0FF]/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group cursor-pointer">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-[#00F0FF] to-[#7000FF] flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.4)] group-hover:shadow-[0_0_25px_rgba(0,240,255,0.6)] transition-all duration-300">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-[#00F0FF] transition-colors duration-300">
              Nexus.
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.label} 
                href={link.href} 
                className="text-sm font-medium text-slate-400 hover:text-[#00F0FF] transition-all duration-200 cursor-pointer"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button className="text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-2">
              <TerminalSquare className="w-4 h-4" /> Docs
            </button>
            <button className="px-5 py-2.5 bg-white text-black text-sm font-bold rounded-md hover:bg-[#00F0FF] hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-300 cursor-pointer">
              Launch App
            </button>
          </div>

          {/* Mobile Nav */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="md:hidden p-2 text-slate-300 hover:text-white cursor-pointer">
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#0A0A0F] border-l border-[#00F0FF]/10 text-white w-[300px]">
              <div className="flex flex-col gap-6 mt-12">
                {NAV_LINKS.map((link) => (
                  <Link 
                    key={link.label} 
                    href={link.href} 
                    className="text-lg font-medium text-slate-400 hover:text-[#00F0FF] transition-colors cursor-pointer"
                  >
                    {link.label}
                  </Link>
                ))}
                <Separator className="bg-[#00F0FF]/10 my-4" />
                <button className="px-6 py-3 bg-[#00F0FF] text-black text-sm font-bold rounded-md cursor-pointer">
                  Launch App
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* ─── 2. HERO PARALLAX ─── */}
      <section className="relative h-[100vh] flex items-center justify-center overflow-hidden">
        {/* Background Gradients & Grid */}
        <motion.div style={{ y: heroY, opacity: opacityHero }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00F0FF] opacity-[0.08] rounded-full blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#7000FF] opacity-[0.08] rounded-full blur-[100px]" />
        </motion.div>

        <motion.div style={{ y: textY }} className="relative z-10 max-w-5xl mx-auto px-6 text-center mt-20">
          <Reveal>
            <Badge className="bg-[#00F0FF]/10 text-[#00F0FF] hover:bg-[#00F0FF]/20 border border-[#00F0FF]/30 mb-8 px-4 py-1.5 cursor-pointer transition-all duration-300 font-mono text-xs">
              <span className="w-2 h-2 rounded-full bg-[#00F0FF] mr-2 inline-block animate-pulse" /> Nexus Mainnet v2.4 is Live
            </Badge>
          </Reveal>
          
          <Reveal delay={0.1}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-6 leading-[1.1]">
              The Internet of <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-[#7000FF] to-[#FF007A]">
                Infinite Value.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-lg md:text-xl text-slate-400 font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
              A high-performance Layer 1 blockchain engineered for global scale. Sub-second finality, quantum-secure cryptography, and native cross-chain interoperability.
            </p>
          </Reveal>

          <Reveal delay={0.3} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold text-sm rounded-md hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2">
              Start Building <ArrowRight className="w-4 h-4" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 border border-white/10 bg-white/5 backdrop-blur-md text-white font-bold text-sm rounded-md hover:bg-white/10 transition-all duration-300 cursor-pointer flex items-center justify-center gap-3">
              <Terminal className="w-4 h-4" /> Read Documentation
            </button>
          </Reveal>
        </motion.div>

        {/* Floating Glassmorphism Status Card */}
        <motion.div 
          style={{ x: springX, y: springY }}
          className="hidden lg:flex absolute bottom-24 right-24 z-20 items-center gap-4 p-4 rounded-xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl cursor-pointer hover:border-[#00F0FF]/50 transition-colors duration-300"
        >
          <div className="w-12 h-12 rounded-full bg-[#00F0FF]/10 flex items-center justify-center border border-[#00F0FF]/30">
            <Cpu className="w-5 h-5 text-[#00F0FF]" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-mono mb-1">Current Block</div>
            <div className="text-sm font-bold text-white font-mono flex items-center gap-2">
              #14,892,044 <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── 3. STATS BAR ─── */}
      <section className="py-16 border-y border-white/5 bg-[#050508] relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4 divide-x-0 md:divide-x divide-white/5">
            {STATS.map((stat, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="flex flex-col items-center text-center cursor-pointer group">
                  <div className="text-4xl lg:text-5xl font-black text-white mb-2 font-mono group-hover:text-[#00F0FF] transition-colors duration-300">
                    {stat.value}<span className="text-[#00F0FF]">{stat.suffix}</span>
                  </div>
                  <div className="text-xs text-slate-500 font-medium uppercase tracking-widest">
                    {stat.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. FEATURES (TABS) ─── */}
      <section id="infrastructure" className="py-32 relative bg-[#030305]">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <Reveal>
              <h2 className="text-sm font-mono text-[#00F0FF] font-bold mb-4 uppercase tracking-widest">Infrastructure</h2>
              <h3 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">Built for Web-Scale</h3>
              <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Nexus redefines blockchain architecture from the ground up, utilizing parallel processing and localized state to eliminate global bottlenecks.
              </p>
            </Reveal>
          </div>

          <Tabs defaultValue="consensus" className="w-full flex flex-col lg:flex-row gap-12 lg:gap-16">
            <div className="lg:w-1/3">
              <TabsList className="flex flex-col h-auto bg-transparent gap-3 items-stretch">
                {FEATURES.map((feature) => (
                  <TabsTrigger 
                    key={feature.id} 
                    value={feature.id}
                    className="justify-start px-6 py-5 text-left data-[state=active]:bg-[#00F0FF]/10 data-[state=active]:text-[#00F0FF] text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-300 cursor-pointer rounded-xl border border-transparent data-[state=active]:border-[#00F0FF]/30"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-black/50 border border-white/5">{feature.icon}</div>
                      <span className="text-base font-bold">{feature.title}</span>
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
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.4 }}
                      className="bg-[#0A0A0F] border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative group"
                    >
                      <div className="absolute top-0 right-0 p-32 bg-[#00F0FF] opacity-[0.03] blur-[100px] rounded-full pointer-events-none group-hover:opacity-[0.06] transition-opacity" />
                      
                      <div className="aspect-[2/1] relative w-full overflow-hidden border-b border-white/10">
                        <Image src={feature.image} alt={feature.title} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] to-transparent" />
                      </div>
                      
                      <div className="p-8 md:p-12 relative z-10">
                        <h4 className="text-2xl font-bold text-white mb-4">{feature.title}</h4>
                        <p className="text-slate-400 leading-relaxed mb-8">{feature.description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
                          {feature.bullets.map((bullet, i) => (
                            <div key={i} className="flex items-center gap-3">
                              <CheckCircle2 className="w-5 h-5 text-[#00F0FF]" />
                              <span className="text-sm text-slate-300 font-medium">{bullet}</span>
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
      <section id="ecosystem" className="py-32 bg-[#050508] border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-sm font-mono text-[#7000FF] font-bold mb-4 uppercase tracking-widest">Ecosystem</h2>
              <h3 className="text-4xl font-black text-white">Trusted by Builders</h3>
            </div>
          </Reveal>

          <Carousel className="w-full max-w-6xl mx-auto">
            <CarouselContent>
              {TESTIMONIALS.map((testi, i) => (
                <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/2 pl-6">
                  <Reveal delay={i * 0.1}>
                    <Card className="bg-[#0A0A0F] border-white/10 hover:border-[#7000FF]/50 transition-colors duration-300 cursor-pointer h-full rounded-2xl relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#7000FF] opacity-[0.02] group-hover:opacity-[0.05] rounded-full blur-3xl transition-opacity" />
                      <CardContent className="p-8 flex flex-col h-full justify-between relative z-10">
                        <div>
                          <div className="flex gap-1 mb-6">
                            {[...Array(testi.rating)].map((_, j) => (
                              <Star key={j} className="w-4 h-4 fill-[#00F0FF] text-[#00F0FF]" />
                            ))}
                          </div>
                          <p className="text-slate-300 text-lg leading-relaxed mb-8">
                            "{testi.content}"
                          </p>
                        </div>
                        <div className="flex items-center gap-4 pt-6 mt-auto border-t border-white/5">
                          <Avatar className="w-12 h-12 border border-white/10">
                            <AvatarImage src={testi.avatar} />
                            <AvatarFallback>NX</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-white font-bold text-sm">{testi.name}</div>
                            <div className="text-slate-500 text-xs mt-1">{testi.role}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Reveal>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-4 mt-12">
              <CarouselPrevious className="relative inset-auto translate-y-0 bg-[#0A0A0F] border-white/10 text-white hover:bg-white hover:text-black transition-colors" />
              <CarouselNext className="relative inset-auto translate-y-0 bg-[#0A0A0F] border-white/10 text-white hover:bg-white hover:text-black transition-colors" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* ─── 6. PRICING ─── */}
      <section id="developers" className="py-32 bg-[#030305] relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#00F0FF] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <Reveal>
              <h2 className="text-sm font-mono text-[#00F0FF] font-bold mb-4 uppercase tracking-widest">RPC Endpoints</h2>
              <h3 className="text-4xl md:text-5xl font-black text-white mb-6">Infrastructure Plans</h3>
              <p className="text-slate-400 max-w-xl mx-auto">
                Scale your application from a weekend hackathon project to a globally distributed enterprise dApp.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {PRICING.map((tier, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <Card className={`relative bg-[#0A0A0F] border ${tier.recommended ? 'border-[#00F0FF] shadow-[0_0_30px_rgba(0,240,255,0.1)] lg:scale-105 z-10' : 'border-white/10'} hover:border-[#00F0FF]/50 transition-all duration-300 cursor-pointer overflow-hidden rounded-2xl`}>
                  {tier.recommended && (
                    <div className="absolute top-0 inset-x-0 bg-gradient-to-r from-[#00F0FF] to-[#7000FF] text-white text-[10px] font-bold uppercase tracking-widest text-center py-1.5">
                      Recommended for dApps
                    </div>
                  )}
                  <CardContent className={`p-8 ${tier.recommended ? 'pt-10' : ''}`}>
                    <h4 className="text-2xl font-bold text-white mb-1">{tier.title}</h4>
                    <div className="text-sm text-[#00F0FF] mb-6">{tier.subtitle}</div>
                    <p className="text-sm text-slate-400 mb-8 h-10">{tier.description}</p>
                    
                    <div className="flex items-end gap-1 mb-8 border-b border-white/5 pb-8">
                      <span className="text-4xl font-black text-white">{tier.price}</span>
                      <span className="text-sm text-slate-500 mb-1">{tier.duration}</span>
                    </div>

                    <ul className="space-y-4 mb-10">
                      {tier.features.map((feat, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm text-slate-300 font-medium">
                          <Terminal className="w-4 h-4 text-[#00F0FF] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    <button className={`w-full py-4 text-sm font-bold rounded-lg transition-all duration-300 ${tier.recommended ? 'bg-[#00F0FF] text-black hover:bg-white hover:text-black' : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'}`}>
                      Get Started
                    </button>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7. FAQ ACCORDION ─── */}
      <section className="py-32 bg-[#050508] border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-sm font-mono text-[#7000FF] font-bold mb-4 uppercase tracking-widest">Knowledge Base</h2>
              <h3 className="text-4xl font-black text-white">Frequently Asked Questions</h3>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-white/10">
                  <AccordionTrigger className="text-left text-white hover:text-[#00F0FF] hover:no-underline font-bold text-lg py-6 transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-400 leading-relaxed pb-6 text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* ─── 8. CTA BANNER ─── */}
      <section className="py-24 px-6 relative z-10 bg-[#030305]">
        <Reveal>
          <div className="max-w-6xl mx-auto bg-gradient-to-br from-[#0A0A0F] to-[#050508] border border-[#00F0FF]/20 rounded-3xl p-10 md:p-20 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1600&q=80')] bg-cover bg-center opacity-5 group-hover:opacity-10 transition-opacity duration-700 mix-blend-luminosity" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00F0FF] opacity-[0.05] rounded-full blur-[100px]" />
            
            <div className="relative z-10">
              <Layers className="w-16 h-16 text-[#00F0FF] mx-auto mb-8" />
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6">Ready to scale your dApp?</h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10">
                Join thousands of developers building the next generation of decentralized applications on the Nexus Protocol.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="px-10 py-4 bg-white text-black font-bold rounded-lg hover:bg-[#00F0FF] hover:scale-105 transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                  Start Building Now
                </button>
                <button className="px-10 py-4 bg-transparent text-white font-bold border border-white/20 rounded-lg hover:bg-white/5 transition-all duration-300 cursor-pointer">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ─── 9. FOOTER ─── */}
      <footer className="bg-[#030305] pt-24 pb-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div>
              <Link href="/" className="flex items-center gap-3 mb-8 cursor-pointer">
                <div className="w-8 h-8 rounded bg-[#00F0FF] flex items-center justify-center">
                  <Layers className="w-5 h-5 text-black" />
                </div>
                <span className="text-xl font-bold tracking-tight text-white">
                  Nexus.
                </span>
              </Link>
              <p className="text-slate-500 text-sm leading-relaxed mb-8">
                The most performant, secure, and decentralized Layer 1 blockchain network designed for Web3 builders.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-[#00F0FF] hover:bg-white/10 transition-all cursor-pointer"><MessageCircle className="w-4 h-4" /></a>
                <a href="#" className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-[#00F0FF] hover:bg-white/10 transition-all cursor-pointer"><TerminalSquare className="w-4 h-4" /></a>
                <a href="#" className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-[#00F0FF] hover:bg-white/10 transition-all cursor-pointer"><MessageSquare className="w-4 h-4" /></a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Developers</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-slate-500 hover:text-[#00F0FF] transition-colors text-sm font-medium cursor-pointer">Documentation</a></li>
                <li><a href="#" className="text-slate-500 hover:text-[#00F0FF] transition-colors text-sm font-medium cursor-pointer">GitHub Repository</a></li>
                <li><a href="#" className="text-slate-500 hover:text-[#00F0FF] transition-colors text-sm font-medium cursor-pointer">Whitepaper</a></li>
                <li><a href="#" className="text-slate-500 hover:text-[#00F0FF] transition-colors text-sm font-medium cursor-pointer">Bug Bounty</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Ecosystem</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-slate-500 hover:text-[#00F0FF] transition-colors text-sm font-medium cursor-pointer">Explorer</a></li>
                <li><a href="#" className="text-slate-500 hover:text-[#00F0FF] transition-colors text-sm font-medium cursor-pointer">Wallets</a></li>
                <li><a href="#" className="text-slate-500 hover:text-[#00F0FF] transition-colors text-sm font-medium cursor-pointer">Grants Program</a></li>
                <li><a href="#" className="text-slate-500 hover:text-[#00F0FF] transition-colors text-sm font-medium cursor-pointer">Brand Assets</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Network Status</h4>
              <ul className="space-y-4">
                <li className="flex items-center justify-between text-sm text-slate-500 border-b border-white/5 pb-2">
                  <span>Mainnet</span>
                  <span className="flex items-center gap-2 text-green-500"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Operational</span>
                </li>
                <li className="flex items-center justify-between text-sm text-slate-500 border-b border-white/5 pb-2">
                  <span>Testnet</span>
                  <span className="flex items-center gap-2 text-green-500"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Operational</span>
                </li>
                <li className="flex items-center justify-between text-sm text-slate-500 pb-2">
                  <span>Devnet</span>
                  <span className="flex items-center gap-2 text-yellow-500"><div className="w-2 h-2 rounded-full bg-yellow-500" /> Maintenance</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-600">
            <p>&copy; 2026 Nexus Protocol Foundation. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors cursor-pointer">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors cursor-pointer">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}
