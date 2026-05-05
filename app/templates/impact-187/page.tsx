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
import { ArrowRight, Menu, X, Star, ChevronRight, Play, CheckCircle2, ShieldCheck, Wallet, LineChart, Globe2, Fingerprint, Lock, Activity, Smartphone, CreditCard } from "lucide-react"

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
  { label: "Products", href: "#products" },
  { label: "Security", href: "#security" },
  { label: "Cards", href: "#cards" },
  { label: "Pricing", href: "#pricing" },
]

const STATS = [
  { value: "2.5", label: "Million Users", suffix: "M+" },
  { value: "140", label: "Countries Supported", suffix: "" },
  { value: "0", label: "Hidden Fees", suffix: "%" },
  { value: "12", label: "Billion Processed", suffix: "B$" },
  { value: "24/7", label: "Premium Support", suffix: "" },
]

const FEATURES = [
  {
    id: "invest",
    title: "Global Markets",
    icon: <LineChart className="w-5 h-5" />,
    description: "Access 10,000+ stocks, ETFs, and commodities from 25 global exchanges. Execute trades with zero commission and real-time market data directly in the Vault app.",
    bullets: [
      "Zero commission trading",
      "Fractional shares from $1",
      "Automated portfolio rebalancing",
      "Real-time institutional data"
    ],
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80"
  },
  {
    id: "spend",
    title: "Metal Cards",
    icon: <CreditCard className="w-5 h-5" />,
    description: "The heaviest metal card on the market, forged from 18g solid stainless steel. Earn up to 3% cashback on all purchases, automatically invested in your portfolio.",
    bullets: [
      "18g solid metal construction",
      "Zero foreign transaction fees",
      "Instant virtual card issuance",
      "Advanced fraud protection"
    ],
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&q=80"
  },
  {
    id: "crypto",
    title: "Digital Assets",
    icon: <Wallet className="w-5 h-5" />,
    description: "Buy, sell, and stake the top 50 cryptocurrencies with institutional-grade security. Your digital assets are stored in offline cold vaults insured up to $100M.",
    bullets: [
      "1-click crypto purchases",
      "Automated staking yields",
      "Cold storage security",
      "Real-time price alerts"
    ],
    image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=800&q=80"
  }
]

const TESTIMONIALS = [
  {
    name: "Financial Times",
    role: "FinTech Review 2026",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    content: "Vault has completely reimagined what a banking app should be. The interface is stunningly fast, and their zero-fee model is putting massive pressure on traditional banks.",
    rating: 5
  },
  {
    name: "Elena Rodriguez",
    role: "Freelance Designer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    content: "Getting paid in multiple currencies used to cost me hundreds in conversion fees. Vault handles everything at the interbank rate instantly. It's magic.",
    rating: 5
  },
  {
    name: "TechCrunch",
    role: "App of the Year",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    content: "The aesthetic alone is enough to download Vault. But beneath the gorgeous dark mode UI is an incredibly robust financial engine that never fails.",
    rating: 5
  },
  {
    name: "David Chen",
    role: "Day Trader",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    content: "The real-time market data is actually real-time. Execution speed is flawless. It's the only app I use to manage both my checking account and my investment portfolio.",
    rating: 5
  }
]

const PRICING = [
  {
    id: "standard",
    title: "Vault Standard",
    subtitle: "Everyday Banking",
    price: "$0",
    duration: "/ month",
    description: "A completely free account with a virtual card, zero-fee trading, and fee-free ATM withdrawals up to $200/month.",
    features: [
      "Free virtual debit card",
      "Zero commission stock trading",
      "Interbank exchange rates",
      "Basic budgeting tools",
      "Standard customer support"
    ],
    recommended: false
  },
  {
    id: "premium",
    title: "Vault Premium",
    subtitle: "For Global Citizens",
    price: "$9.99",
    duration: "/ month",
    description: "Our most popular plan. Includes the Space Grey Metal Card, higher limits, and priority 24/7 customer support.",
    features: [
      "18g Space Grey Metal Card",
      "1% cashback on all spending",
      "Fee-free ATM up to $800/month",
      "Priority 24/7 chat support",
      "Global medical insurance"
    ],
    recommended: true
  },
  {
    id: "infinite",
    title: "Vault Infinite",
    subtitle: "Wealth Management",
    price: "$29.99",
    duration: "/ month",
    description: "The ultimate financial tool. Obsidian Black Metal Card, airport lounge access, and dedicated wealth advisors.",
    features: [
      "Obsidian Black Metal Card",
      "3% cashback on all spending",
      "Unlimited fee-free ATM withdrawals",
      "Dedicated wealth advisor",
      "Unlimited airport lounge access",
      "Private concierge service"
    ],
    recommended: false
  }
]

const FAQS = [
  {
    question: "Is my money safe with Vault?",
    answer: "Absolutely. Vault partners with Tier 1 banks to hold your funds. Your money is protected by the FDIC up to $250,000. For our European users, funds are protected by the FSCS up to £85,000."
  },
  {
    question: "How long does it take to open an account?",
    answer: "Less than 3 minutes. Download the app, scan your ID, take a quick selfie, and your account is instantly verified. Your virtual card is ready to use immediately with Apple Pay or Google Pay."
  },
  {
    question: "Are there really no hidden fees?",
    answer: "We hate hidden fees as much as you do. We don't charge account maintenance fees, overdraft fees, or minimum balance fees. We make money through merchant interchange fees and our premium subscriptions."
  },
  {
    question: "Can I transfer my existing portfolio to Vault?",
    answer: "Yes, you can initiate an automated ACATS transfer from within the app. We even reimburse any transfer fees charged by your old broker up to $100 if your portfolio is over $5,000."
  },
  {
    question: "How does the cashback work?",
    answer: "Cashback is deposited directly into your Vault investment account within 24 hours of a settled transaction. You can choose to keep it as cash or automatically invest it in your favorite stock or crypto."
  },
  {
    question: "What happens if I lose my Metal Card?",
    answer: "You can instantly freeze your card from the app with one tap. If it's permanently lost, you can order a replacement. Note that due to the manufacturing cost of the metal cards, replacement fees apply."
  },
  {
    question: "Do you offer joint accounts?",
    answer: "Yes, Vault Vaults (our joint accounts) allow you to seamlessly share expenses, track mutual budgets, and save together with up to 4 other people."
  },
  {
    question: "Can I use Vault for my business?",
    answer: "Currently, Vault is designed for personal use. However, Vault Business is launching in Q3 2026. Join the waitlist in the app to get early access."
  }
]

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────
export default function VaultFinTechTemplate() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  
  // Parallax Values
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"])

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
    <div ref={containerRef} className="min-h-screen bg-[#050B14] text-[#F8FAFC] font-sans selection:bg-[#00E6A0] selection:text-[#050B14]" style={{ overflowX: "hidden", scrollBehavior: "smooth" }}>
      
      {/* ─── 1. NAVBAR (GLASSMORPHISM) ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050B14]/60 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
        <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00E6A0] to-[#0088FF] flex items-center justify-center shadow-[0_0_15px_rgba(0,230,160,0.3)]">
              <ShieldCheck className="w-5 h-5 text-[#050B14]" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Vault.
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.label} 
                href={link.href} 
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button className="text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer">
              Log in
            </button>
            <button className="px-5 py-2.5 bg-[#00E6A0] text-[#050B14] text-sm font-bold rounded-full hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(0,230,160,0.2)] cursor-pointer">
              Get the App
            </button>
          </div>

          {/* Mobile Nav */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="md:hidden p-2 text-slate-300 cursor-pointer">
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#050B14] border-l border-white/10 text-white w-[300px]">
              <div className="flex flex-col gap-6 mt-12">
                {NAV_LINKS.map((link) => (
                  <Link 
                    key={link.label} 
                    href={link.href} 
                    className="text-lg font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
                  >
                    {link.label}
                  </Link>
                ))}
                <Separator className="bg-white/10 my-4" />
                <button className="w-full py-4 bg-[#00E6A0] text-[#050B14] text-sm font-bold rounded-xl cursor-pointer">
                  Download Vault
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* ─── 2. HERO PARALLAX (GLOWING GRADS & GLASS) ─── */}
      <section className="relative pt-20 h-[100vh] flex flex-col items-center justify-center overflow-hidden bg-[#050B14]">
        {/* Background Gradients */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#00E6A0] opacity-[0.15] blur-[150px] rounded-full mix-blend-screen" />
          <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-[#0088FF] opacity-[0.1] blur-[120px] rounded-full mix-blend-screen" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay" />
        </motion.div>

        <motion.div style={{ y: textY }} className="relative z-10 max-w-[1000px] mx-auto px-6 text-center">
          <Reveal>
            <Badge className="bg-white/5 text-[#00E6A0] hover:bg-white/10 border border-[#00E6A0]/30 mb-8 px-4 py-1.5 backdrop-blur-md rounded-full font-medium">
              <span className="w-2 h-2 rounded-full bg-[#00E6A0] mr-2 inline-block animate-pulse" /> Vault 3.0 is now available
            </Badge>
          </Reveal>
          
          <Reveal delay={0.1}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6 leading-[1.05]">
              Banking, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E6A0] to-[#0088FF]">
                reimagined.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-lg md:text-xl text-slate-400 font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
              Spend, save, and invest in one beautiful app. Zero hidden fees, real-time market data, and the heaviest metal card in the world.
            </p>
          </Reveal>

          <Reveal delay={0.3} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 bg-white text-[#050B14] font-bold rounded-full hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2">
              Open Free Account <ArrowRight className="w-4 h-4" />
            </button>
            <Dialog>
              <DialogTrigger asChild>
                <button className="w-full sm:w-auto px-8 py-4 border border-white/10 bg-white/5 backdrop-blur-xl text-white font-bold rounded-full hover:bg-white/10 transition-all duration-300 cursor-pointer flex items-center justify-center gap-3">
                  <Play className="w-4 h-4 text-[#00E6A0]" /> See how it works
                </button>
              </DialogTrigger>
              <DialogContent className="bg-[#050B14] border-white/10 text-white sm:max-w-[800px] p-0 overflow-hidden rounded-2xl">
                <div className="aspect-video relative w-full bg-black flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full border-t-2 border-[#00E6A0] animate-spin" />
                </div>
              </DialogContent>
            </Dialog>
          </Reveal>
        </motion.div>

        {/* Floating Glassmorphism Phone UI */}
        <motion.div 
          style={{ x: springX, y: springY }}
          className="hidden lg:flex flex-col absolute bottom-20 left-20 z-20 w-[300px] p-6 rounded-3xl border border-white/10 bg-[#050B14]/40 backdrop-blur-2xl shadow-2xl"
        >
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <AvatarImage src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&q=80" className="w-full h-full rounded-full object-cover" />
              </div>
              <div>
                <div className="text-xs text-slate-400">Total Balance</div>
                <div className="text-lg font-bold text-white">$124,592.00</div>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#00E6A0]/20 flex items-center justify-center text-[#00E6A0]">AAPL</div>
                <div className="text-sm font-medium text-white">Apple Inc.</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-white">+$420.50</div>
                <div className="text-xs text-[#00E6A0]">+2.4%</div>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#0088FF]/20 flex items-center justify-center text-[#0088FF]">BTC</div>
                <div className="text-sm font-medium text-white">Bitcoin</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-white">-$120.00</div>
                <div className="text-xs text-red-400">-1.2%</div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── 3. STATS BAR ─── */}
      <section className="py-16 border-y border-white/5 bg-[#03060A] relative z-10">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4 divide-x-0 md:divide-x divide-white/5">
            {STATS.map((stat, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="flex flex-col items-center text-center">
                  <div className="text-4xl lg:text-5xl font-bold text-white mb-2 tracking-tight">
                    {stat.value}<span className="text-[#00E6A0]">{stat.suffix}</span>
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
      <section id="products" className="py-32 relative bg-[#050B14]">
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <Reveal>
              <h2 className="text-sm font-medium text-[#0088FF] mb-4 uppercase tracking-widest">Ecosystem</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">One app for everything.</h3>
              <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed text-lg">
                Stop switching between five different apps to manage your money. Vault integrates everyday banking, global investments, and crypto into one seamless experience.
              </p>
            </Reveal>
          </div>

          <Tabs defaultValue="invest" className="w-full flex flex-col lg:flex-row gap-12 lg:gap-16">
            <div className="lg:w-1/3">
              <TabsList className="flex flex-col h-auto bg-transparent gap-3 items-stretch">
                {FEATURES.map((feature) => (
                  <TabsTrigger 
                    key={feature.id} 
                    value={feature.id}
                    className="justify-start px-6 py-5 text-left data-[state=active]:bg-white/5 data-[state=active]:text-white text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-300 cursor-pointer rounded-2xl border border-transparent data-[state=active]:border-white/10"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-xl bg-[#03060A] border border-white/5 text-[#00E6A0]">{feature.icon}</div>
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
                      className="bg-[#03060A] border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative"
                    >
                      <div className="absolute top-0 right-0 p-32 bg-[#0088FF] opacity-[0.05] blur-[100px] rounded-full pointer-events-none" />
                      
                      <div className="aspect-[2/1] relative w-full overflow-hidden border-b border-white/5">
                        <Image src={feature.image} alt={feature.title} fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#03060A] to-transparent opacity-90" />
                      </div>
                      
                      <div className="p-8 md:p-12 relative z-10 -mt-12">
                        <h4 className="text-3xl font-bold text-white mb-4">{feature.title}</h4>
                        <p className="text-slate-400 leading-relaxed mb-8">{feature.description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
                          {feature.bullets.map((bullet, i) => (
                            <div key={i} className="flex items-center gap-3">
                              <CheckCircle2 className="w-5 h-5 text-[#00E6A0]" />
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
      <section className="py-32 bg-[#03060A] border-y border-white/5 overflow-hidden relative">
        <div className="max-w-[1400px] mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-sm font-medium text-[#00E6A0] mb-4 uppercase tracking-widest">Reviews</h2>
              <h3 className="text-4xl font-bold text-white">Loved by millions.</h3>
            </div>
          </Reveal>

          <Carousel className="w-full max-w-6xl mx-auto">
            <CarouselContent>
              {TESTIMONIALS.map((testi, i) => (
                <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/2 pl-6">
                  <Reveal delay={i * 0.1}>
                    <Card className="bg-[#050B14] border-white/5 hover:border-white/20 transition-colors duration-300 cursor-pointer h-full rounded-3xl relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#00E6A0] opacity-[0.02] group-hover:opacity-[0.05] rounded-full blur-3xl transition-opacity" />
                      <CardContent className="p-10 flex flex-col h-full justify-between relative z-10">
                        <div>
                          <div className="flex gap-1 mb-6">
                            {[...Array(testi.rating)].map((_, j) => (
                              <Star key={j} className="w-4 h-4 fill-[#00E6A0] text-[#00E6A0]" />
                            ))}
                          </div>
                          <p className="text-slate-300 text-lg leading-relaxed mb-8">
                            "{testi.content}"
                          </p>
                        </div>
                        <div className="flex items-center gap-4 pt-6 mt-auto border-t border-white/5">
                          <Avatar className="w-12 h-12 border border-white/10">
                            <AvatarImage src={testi.avatar} />
                            <AvatarFallback>VA</AvatarFallback>
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
              <CarouselPrevious className="relative inset-auto translate-y-0 bg-[#050B14] border-white/10 text-white hover:bg-white hover:text-black transition-colors" />
              <CarouselNext className="relative inset-auto translate-y-0 bg-[#050B14] border-white/10 text-white hover:bg-white hover:text-black transition-colors" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* ─── 6. PRICING ─── */}
      <section id="pricing" className="py-32 bg-[#050B14] relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#0088FF] opacity-[0.05] blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <Reveal>
              <h2 className="text-sm font-medium text-[#0088FF] mb-4 uppercase tracking-widest">Plans</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">Choose your Vault.</h3>
              <p className="text-slate-400 max-w-xl mx-auto">
                Start for free, upgrade when you need more power. Change or cancel your plan at any time right from the app.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {PRICING.map((tier, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <Card className={`relative bg-[#03060A] border ${tier.recommended ? 'border-[#00E6A0] shadow-[0_0_30px_rgba(0,230,160,0.1)] lg:scale-105 z-10' : 'border-white/5'} hover:border-[#00E6A0]/50 transition-all duration-300 cursor-pointer overflow-hidden rounded-3xl`}>
                  {tier.recommended && (
                    <div className="absolute top-0 inset-x-0 bg-[#00E6A0] text-[#050B14] text-[10px] font-bold uppercase tracking-widest text-center py-2">
                      Most Popular
                    </div>
                  )}
                  <CardContent className={`p-10 ${tier.recommended ? 'pt-12' : ''}`}>
                    <h4 className="text-2xl font-bold text-white mb-1">{tier.title}</h4>
                    <div className="text-sm text-slate-500 mb-6">{tier.subtitle}</div>
                    
                    <div className="flex items-end gap-1 mb-8">
                      <span className="text-5xl font-bold text-white tracking-tight">{tier.price}</span>
                      <span className="text-sm text-slate-500 mb-2">{tier.duration}</span>
                    </div>

                    <p className="text-sm text-slate-400 mb-8 h-16">{tier.description}</p>
                    
                    <ul className="space-y-4 mb-10 border-t border-white/5 pt-8">
                      {tier.features.map((feat, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm text-slate-300 font-medium">
                          <CheckCircle2 className="w-5 h-5 text-[#00E6A0] shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    <button className={`w-full py-4 text-sm font-bold rounded-xl transition-all duration-300 ${tier.recommended ? 'bg-[#00E6A0] text-[#050B14] hover:bg-white hover:text-black' : 'bg-white/5 text-white border border-white/5 hover:bg-white/10'}`}>
                      Get {tier.title}
                    </button>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7. FAQ ACCORDION ─── */}
      <section className="py-32 bg-[#03060A] border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-sm font-medium text-[#00E6A0] mb-4 uppercase tracking-widest">Support</h2>
              <h3 className="text-4xl font-bold text-white">Any questions?</h3>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-white/5">
                  <AccordionTrigger className="text-left text-white hover:text-[#00E6A0] hover:no-underline font-medium text-lg py-6 transition-colors">
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
      <section className="py-24 px-6 relative z-10 bg-[#050B14]">
        <Reveal>
          <div className="max-w-[1400px] mx-auto bg-gradient-to-br from-[#00E6A0]/10 to-[#0088FF]/10 border border-[#00E6A0]/20 rounded-3xl p-12 md:p-24 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1600&q=80')] bg-cover bg-center opacity-5 group-hover:opacity-10 transition-opacity duration-700 mix-blend-screen" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00E6A0] opacity-[0.05] rounded-full blur-[100px]" />
            
            <div className="relative z-10">
              <Smartphone className="w-16 h-16 text-[#00E6A0] mx-auto mb-8" />
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">Ready to upgrade your wallet?</h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10">
                Join 2.5 million people who have already changed the way they manage their money. Setup takes less than 3 minutes.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="px-10 py-4 bg-[#00E6A0] text-[#050B14] font-bold rounded-full hover:bg-white hover:scale-105 transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(0,230,160,0.2)]">
                  Download the App
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ─── 9. FOOTER ─── */}
      <footer className="bg-[#03060A] pt-24 pb-12 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-8 cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-[#00E6A0] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-[#050B14]" />
                </div>
                <span className="text-xl font-bold tracking-tight text-white">
                  Vault.
                </span>
              </Link>
              <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-sm">
                Vault is a financial technology company, not a bank. Banking services provided by Coastal Community Bank, Member FDIC.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Products</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-slate-500 hover:text-white transition-colors text-sm font-medium cursor-pointer">Checking</a></li>
                <li><a href="#" className="text-slate-500 hover:text-white transition-colors text-sm font-medium cursor-pointer">Savings</a></li>
                <li><a href="#" className="text-slate-500 hover:text-white transition-colors text-sm font-medium cursor-pointer">Investments</a></li>
                <li><a href="#" className="text-slate-500 hover:text-white transition-colors text-sm font-medium cursor-pointer">Crypto</a></li>
                <li><a href="#" className="text-slate-500 hover:text-white transition-colors text-sm font-medium cursor-pointer">Metal Cards</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Company</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-slate-500 hover:text-white transition-colors text-sm font-medium cursor-pointer">About</a></li>
                <li><a href="#" className="text-slate-500 hover:text-white transition-colors text-sm font-medium cursor-pointer">Careers</a></li>
                <li><a href="#" className="text-slate-500 hover:text-white transition-colors text-sm font-medium cursor-pointer">Blog</a></li>
                <li><a href="#" className="text-slate-500 hover:text-white transition-colors text-sm font-medium cursor-pointer">Press</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Support</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-slate-500 hover:text-white transition-colors text-sm font-medium cursor-pointer">Help Center</a></li>
                <li><a href="#" className="text-slate-500 hover:text-white transition-colors text-sm font-medium cursor-pointer">Contact Us</a></li>
                <li><a href="#" className="text-slate-500 hover:text-white transition-colors text-sm font-medium cursor-pointer">Security</a></li>
                <li><a href="#" className="text-slate-500 hover:text-white transition-colors text-sm font-medium cursor-pointer">System Status</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-600">
            <p>&copy; 2026 Vault Financial Technologies Inc.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors cursor-pointer">Terms</a>
              <a href="#" className="hover:text-white transition-colors cursor-pointer">Privacy</a>
              <a href="#" className="hover:text-white transition-colors cursor-pointer">Legal Agreements</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}
