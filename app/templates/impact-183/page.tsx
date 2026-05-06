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
import { ArrowRight, Menu, X, Star, ChevronRight, Play, Terminal, Cpu, Database, Network, Key, Layers, Globe, Zap, TerminalSquare, Lock, Server, CheckCircle2,  MessageCircle, MessageSquare, Brain, LineChart, Cpu as Chip, Sparkles } from "lucide-react"

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
  { label: "Platform", href: "#platform" },
  { label: "Models", href: "#models" },
  { label: "Solutions", href: "#solutions" },
  { label: "Pricing", href: "#pricing" },
]

const STATS = [
  { value: "99.99", label: "Uptime SLA", suffix: "%" },
  { value: "50", label: "API Requests / day", suffix: "M+" },
  { value: "<40", label: "Global Latency", suffix: "ms" },
  { value: "15", label: "Proprietary LLMs", suffix: "+" },
  { value: "256", label: "Bit Encryption", suffix: "" },
]

const FEATURES = [
  {
    id: "nlp",
    title: "Natural Language",
    icon: <Brain className="w-6 h-6" />,
    description: "Our core NLP engine understands context, nuance, and sentiment across 95 languages. Easily embed human-like reasoning into your existing applications.",
    bullets: [
      "Zero-shot classification",
      "Semantic search & RAG ready",
      "Real-time translation & sentiment",
      "Custom vocabulary fine-tuning"
    ],
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80"
  },
  {
    id: "predictive",
    title: "Predictive Analytics",
    icon: <LineChart className="w-6 h-6" />,
    description: "Ingest massive datasets and let Cognix generate high-accuracy predictive models automatically. Uncover hidden correlations in your business data without writing Python.",
    bullets: [
      "Automated feature engineering",
      "Time-series forecasting",
      "Anomaly detection engine",
      "Exportable ML pipelines"
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
  },
  {
    id: "automation",
    title: "Agentic Workflows",
    icon: <Chip className="w-6 h-6" />,
    description: "Deploy autonomous AI agents that can chain tools, read APIs, and complete complex multi-step tasks. Transform static scripts into dynamic, thinking workflows.",
    bullets: [
      "Visual agent builder",
      "Pre-built tool integrations",
      "Human-in-the-loop approvals",
      "Full execution audit logs"
    ],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80"
  }
]

const TESTIMONIALS = [
  {
    name: "David Schwartz",
    role: "CTO, FinTech Global",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    content: "We replaced our entire legacy NLP pipeline with Cognix's APIs. We saw a 40% reduction in cloud costs and a massive bump in entity extraction accuracy.",
    rating: 5
  },
  {
    name: "Dr. Amira Patel",
    role: "Lead Data Scientist",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    content: "The ability to spin up agentic workflows without worrying about underlying compute infrastructure is brilliant. Cognix handles the scaling seamlessly.",
    rating: 5
  },
  {
    name: "Michael Chang",
    role: "VP Engineering",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    content: "Security was our main concern. Cognix's VPC peering and SOC2 compliance made it the only generative AI platform our infosec team would approve.",
    rating: 5
  },
  {
    name: "Sarah Jenkins",
    role: "Product Manager",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    content: "The RAG (Retrieval-Augmented Generation) endpoint works out of the box. We built an internal knowledge bot in exactly 2 days.",
    rating: 5
  }
]

const PRICING = [
  {
    id: "startup",
    title: "Startup",
    subtitle: "For agile teams building MVPs",
    price: "$49",
    duration: "/ month",
    description: "Access to our base models and enough API credits to get your AI-powered application off the ground.",
    features: [
      "1M API Tokens included",
      "Access to standard NLP models",
      "Community Discord support",
      "5 Agentic workflows",
      "Standard rate limits"
    ],
    recommended: false
  },
  {
    id: "pro",
    title: "Professional",
    subtitle: "For scaling applications",
    price: "$199",
    duration: "/ month",
    description: "Higher rate limits, advanced predictive models, and RAG capabilities for production deployments.",
    features: [
      "10M API Tokens included",
      "Access to advanced & predictive models",
      "Priority email support",
      "Unlimited workflows",
      "Custom vector database integration"
    ],
    recommended: true
  },
  {
    id: "enterprise",
    title: "Enterprise",
    subtitle: "For security-first organizations",
    price: "Custom",
    duration: "Annual",
    description: "Dedicated instances, zero data retention policies, and custom model fine-tuning.",
    features: [
      "Unlimited Tokens (Volume pricing)",
      "Zero Data Retention (ZDR)",
      "VPC Peering & Single Tenant",
      "Dedicated Solutions Architect",
      "Custom model fine-tuning",
      "SOC2 & HIPAA Compliance"
    ],
    recommended: false
  }
]

const FAQS = [
  {
    question: "Do you train your models on customer data?",
    answer: "No. By default, customer data sent via the API is not used to train our base models. For Enterprise customers, we offer a strict Zero Data Retention (ZDR) policy."
  },
  {
    question: "How does the token pricing work?",
    answer: "A token is roughly equivalent to 4 characters of text. You are billed for both input (prompt) tokens and output (completion) tokens. Images and data files are converted to token equivalents based on size."
  },
  {
    question: "Can I deploy Cognix models on-premise?",
    answer: "Yes, our Enterprise tier offers Virtual Private Cloud (VPC) peering or fully air-gapped on-premise deployments for highly regulated industries like defense and healthcare."
  },
  {
    question: "What languages do your NLP models support?",
    answer: "Our latest models (Cognix-v4) natively understand and generate text in 95 languages, with near-human accuracy in English, Spanish, French, German, Mandarin, and Japanese."
  },
  {
    question: "Is there a rate limit on the APIs?",
    answer: "Startup plans are limited to 60 requests per minute (RPM). Professional plans increase this to 500 RPM. Enterprise plans have custom limits based on provisioned infrastructure."
  },
  {
    question: "Do you support RAG out of the box?",
    answer: "Yes, our platform includes built-in vector storage and retrieval endpoints. You can upload PDFs, connect your Notion, or sync your Confluence, and the API will automatically handle the chunking, embedding, and retrieval."
  }
]

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────
export default function CognixAITemplate() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  
  // Parallax Values
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"])
  const opacityHero = useTransform(scrollYProgress, [0, 0.25], [1, 0])

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
    <div ref={containerRef} className="min-h-screen bg-[#020204] text-[#E2E8F0] font-sans selection:bg-[#7000FF] selection:text-white" style={{ overflowX: "hidden", scrollBehavior: "smooth" }}>
      
      {/* ─── 1. NAVBAR STICKY ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#020204]/80 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7000FF] to-[#00F0FF] flex items-center justify-center shadow-[0_0_15px_rgba(112,0,255,0.4)] group-hover:shadow-[0_0_25px_rgba(112,0,255,0.6)] transition-all duration-300">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white transition-colors duration-300">
              Cognix AI
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.label} 
                href={link.href} 
                className="text-sm font-medium text-slate-400 hover:text-white transition-all duration-200 cursor-pointer"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button className="text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer">
              Login
            </button>
            <button className="px-5 py-2.5 bg-white text-black text-sm font-bold rounded-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 cursor-pointer">
              Get API Key
            </button>
          </div>

          {/* Mobile Nav */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="md:hidden p-2 text-slate-300 hover:text-white cursor-pointer">
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#0A0A0F] border-l border-white/10 text-white w-[300px]">
              <div className="flex flex-col gap-6 mt-12">
                {NAV_LINKS.map((link) => (
                  <Link 
                    key={link.label} 
                    href={link.href} 
                    className="text-lg font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {link.label}
                  </Link>
                ))}
                <Separator className="bg-white/10 my-4" />
                <button className="px-6 py-3 bg-white text-black text-sm font-bold rounded-lg cursor-pointer">
                  Get API Key
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* ─── 2. HERO PARALLAX ─── */}
      <section className="relative h-[100vh] flex items-center justify-center overflow-hidden">
        {/* Background Gradients */}
        <motion.div style={{ y: heroY, opacity: opacityHero }} className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[600px] bg-[#7000FF] opacity-[0.15] blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#00F0FF] opacity-[0.1] blur-[100px] rounded-full mix-blend-screen pointer-events-none" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
        </motion.div>

        <motion.div style={{ y: textY }} className="relative z-10 max-w-5xl mx-auto px-6 text-center mt-20">
          <Reveal>
            <Badge className="bg-white/5 text-[#00F0FF] hover:bg-white/10 border border-[#00F0FF]/30 mb-8 px-4 py-1.5 cursor-pointer transition-all duration-300 font-mono text-xs">
              <Sparkles className="w-3 h-3 mr-2 inline" /> Introducing Cognix-v4 Models
            </Badge>
          </Reveal>
          
          <Reveal delay={0.1}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-6 leading-[1.05]">
              Intelligence <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7000FF] to-[#00F0FF]">
                as an API.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-lg md:text-xl text-slate-400 font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
              Embed state-of-the-art NLP, predictive analytics, and autonomous agents into your software with just 3 lines of code. Enterprise-grade security out of the box.
            </p>
          </Reveal>

          <Reveal delay={0.3} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold text-sm rounded-lg hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2">
              Start for Free <ArrowRight className="w-4 h-4" />
            </button>
            <Dialog>
              <DialogTrigger asChild>
                <button className="w-full sm:w-auto px-8 py-4 border border-white/10 bg-white/5 backdrop-blur-md text-white font-bold text-sm rounded-lg hover:bg-white/10 transition-all duration-300 cursor-pointer flex items-center justify-center gap-3">
                  <Play className="w-4 h-4 text-[#7000FF]" /> Watch Demo
                </button>
              </DialogTrigger>
              <DialogContent className="bg-[#0A0A0F] border-white/10 text-white sm:max-w-[800px] p-0 overflow-hidden">
                <div className="aspect-video relative w-full bg-black flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full border-t-2 border-[#7000FF] animate-spin" />
                </div>
              </DialogContent>
            </Dialog>
          </Reveal>
        </motion.div>

        {/* Floating Code Snippet Card */}
        <motion.div 
          style={{ x: springX, y: springY }}
          className="hidden lg:block absolute bottom-20 left-20 z-20 p-5 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl shadow-2xl cursor-pointer hover:border-[#7000FF]/50 transition-colors duration-300"
        >
          <div className="flex gap-2 mb-3">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <pre className="font-mono text-xs text-slate-300">
            <span className="text-[#7000FF]">import</span> {"{ Cognix }"} <span className="text-[#7000FF]">from</span> "cognix-sdk";<br/><br/>
            <span className="text-[#7000FF]">const</span> ai = <span className="text-[#7000FF]">new</span> Cognix(API_KEY);<br/>
            <span className="text-[#7000FF]">const</span> res = <span className="text-[#7000FF]">await</span> ai.generate({"{"}<br/>
            {"  "}prompt: <span className="text-[#00F0FF]">"Analyze churn data"</span>,<br/>
            {"  "}model: <span className="text-[#00F0FF]">"cognix-v4-turbo"</span><br/>
            {"}"});
          </pre>
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
                    {stat.value}<span className="text-[#7000FF]">{stat.suffix}</span>
                  </div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-widest">
                    {stat.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. FEATURES (TABS) ─── */}
      <section id="platform" className="py-32 relative bg-[#020204]">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <Reveal>
              <h2 className="text-sm font-mono text-[#7000FF] font-bold mb-4 uppercase tracking-widest">Capabilities</h2>
              <h3 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">The AI Engine Room</h3>
              <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed text-lg">
                One unified API giving you access to the world's most advanced generative models, retrieval systems, and predictive algorithms.
              </p>
            </Reveal>
          </div>

          <Tabs defaultValue="nlp" className="w-full flex flex-col lg:flex-row gap-12 lg:gap-16">
            <div className="lg:w-1/3">
              <TabsList className="flex flex-col h-auto bg-transparent gap-3 items-stretch">
                {FEATURES.map((feature) => (
                  <TabsTrigger 
                    key={feature.id} 
                    value={feature.id}
                    className="justify-start px-6 py-5 text-left data-[state=active]:bg-[#7000FF]/10 data-[state=active]:text-[#7000FF] text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-300 cursor-pointer rounded-xl border border-transparent data-[state=active]:border-[#7000FF]/30"
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
                      <div className="absolute top-0 right-0 p-32 bg-[#00F0FF] opacity-[0.05] blur-[100px] rounded-full pointer-events-none" />
                      
                      <div className="aspect-[2/1] relative w-full overflow-hidden border-b border-white/10">
                        <Image src={feature.image} alt={feature.title} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] to-transparent opacity-90" />
                      </div>
                      
                      <div className="p-8 md:p-12 relative z-10 -mt-10">
                        <h4 className="text-2xl font-bold text-white mb-4">{feature.title}</h4>
                        <p className="text-slate-400 leading-relaxed mb-8">{feature.description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
                          {feature.bullets.map((bullet, i) => (
                            <div key={i} className="flex items-center gap-3">
                              <CheckCircle2 className="w-5 h-5 text-[#7000FF]" />
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
      <section className="py-32 bg-[#050508] border-y border-white/5 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-sm font-mono text-[#00F0FF] font-bold mb-4 uppercase tracking-widest">Case Studies</h2>
              <h3 className="text-4xl font-black text-white">Engineered for Production</h3>
            </div>
          </Reveal>

          <Carousel className="w-full max-w-6xl mx-auto">
            <CarouselContent>
              {TESTIMONIALS.map((testi, i) => (
                <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/2 pl-6">
                  <Reveal delay={i * 0.1}>
                    <Card className="bg-[#0A0A0F] border-white/10 hover:border-[#00F0FF]/40 transition-colors duration-300 cursor-pointer h-full rounded-2xl">
                      <CardContent className="p-8 flex flex-col h-full justify-between">
                        <div>
                          <div className="flex gap-1 mb-6">
                            {[...Array(testi.rating)].map((_, j) => (
                              <Star key={j} className="w-4 h-4 fill-[#7000FF] text-[#7000FF]" />
                            ))}
                          </div>
                          <p className="text-slate-300 text-lg leading-relaxed mb-8 font-medium">
                            "{testi.content}"
                          </p>
                        </div>
                        <div className="flex items-center gap-4 pt-6 mt-auto border-t border-white/5">
                          <Avatar className="w-12 h-12 border border-white/20">
                            <AvatarImage src={testi.avatar} />
                            <AvatarFallback>CX</AvatarFallback>
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
              <CarouselPrevious className="relative inset-auto translate-y-0 bg-white/5 border-white/10 text-white hover:bg-white hover:text-black transition-colors" />
              <CarouselNext className="relative inset-auto translate-y-0 bg-white/5 border-white/10 text-white hover:bg-white hover:text-black transition-colors" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* ─── 6. PRICING ─── */}
      <section id="pricing" className="py-32 bg-[#020204] relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <Reveal>
              <h2 className="text-sm font-mono text-[#7000FF] font-bold mb-4 uppercase tracking-widest">Pricing</h2>
              <h3 className="text-4xl md:text-5xl font-black text-white mb-6">Scale without limits</h3>
              <p className="text-slate-400 max-w-xl mx-auto">
                Transparent pricing based on compute and token usage. Start building for free, upgrade when you hit production.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {PRICING.map((tier, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <Card className={`relative bg-[#0A0A0F] border ${tier.recommended ? 'border-[#7000FF] shadow-[0_0_40px_rgba(112,0,255,0.15)] lg:scale-105 z-10' : 'border-white/10'} hover:border-[#7000FF]/50 transition-all duration-300 cursor-pointer overflow-hidden rounded-2xl`}>
                  {tier.recommended && (
                    <div className="absolute top-0 inset-x-0 bg-gradient-to-r from-[#7000FF] to-[#00F0FF] text-white text-[10px] font-bold uppercase tracking-widest text-center py-1.5">
                      Most Popular
                    </div>
                  )}
                  <CardContent className={`p-8 ${tier.recommended ? 'pt-10' : ''}`}>
                    <h4 className="text-2xl font-bold text-white mb-1">{tier.title}</h4>
                    <div className="text-sm text-slate-500 mb-6 font-medium">{tier.subtitle}</div>
                    <p className="text-sm text-slate-400 mb-8 h-10">{tier.description}</p>
                    
                    <div className="flex items-end gap-1 mb-8 border-b border-white/5 pb-8">
                      <span className="text-4xl font-black text-white">{tier.price}</span>
                      <span className="text-sm text-slate-500 mb-1">{tier.duration}</span>
                    </div>

                    <ul className="space-y-4 mb-10">
                      {tier.features.map((feat, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm text-slate-300 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-[#00F0FF] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    <button className={`w-full py-4 text-sm font-bold rounded-lg transition-all duration-300 ${tier.recommended ? 'bg-white text-black hover:bg-slate-200' : 'bg-transparent border border-white/20 text-white hover:bg-white hover:text-black'}`}>
                      {tier.price === "Custom" ? "Contact Sales" : "Get Started"}
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
              <h2 className="text-sm font-mono text-[#00F0FF] font-bold mb-4 uppercase tracking-widest">Support</h2>
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
      <section className="py-24 px-6 relative z-10 bg-[#020204]">
        <Reveal>
          <div className="max-w-6xl mx-auto bg-gradient-to-br from-[#100A20] to-[#050508] border border-[#7000FF]/30 rounded-3xl p-12 md:p-24 text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#7000FF] to-[#00F0FF]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#7000FF] opacity-[0.05] rounded-full blur-[100px] pointer-events-none" />
            
            <div className="relative z-10">
              <Brain className="w-16 h-16 text-white mx-auto mb-8 drop-shadow-[0_0_15px_rgba(112,0,255,0.8)]" />
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6">Build the future, today.</h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10">
                Get your free API key now and start integrating intelligent features into your product in minutes.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="px-10 py-4 bg-white text-black font-bold rounded-lg hover:scale-105 transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                  Generate API Key
                </button>
                <button className="px-10 py-4 bg-transparent text-white font-bold border border-white/20 rounded-lg hover:bg-white/5 transition-all duration-300 cursor-pointer">
                  View Documentation
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ─── 9. FOOTER ─── */}
      <footer className="bg-[#020204] pt-24 pb-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div>
              <Link href="/" className="flex items-center gap-3 mb-8 cursor-pointer">
                <div className="w-8 h-8 rounded bg-[#7000FF] flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold tracking-tight text-white">
                  Cognix AI
                </span>
              </Link>
              <p className="text-slate-500 text-sm leading-relaxed mb-8">
                Empowering developers with enterprise-grade artificial intelligence infrastructure and state-of-the-art predictive models.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"><MessageCircle className="w-4 h-4" /></a>
                <a href="#" className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"><TerminalSquare className="w-4 h-4" /></a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Platform</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-slate-500 hover:text-white transition-colors text-sm font-medium cursor-pointer">NLP API</a></li>
                <li><a href="#" className="text-slate-500 hover:text-white transition-colors text-sm font-medium cursor-pointer">Predictive Models</a></li>
                <li><a href="#" className="text-slate-500 hover:text-white transition-colors text-sm font-medium cursor-pointer">Agentic Workflows</a></li>
                <li><a href="#" className="text-slate-500 hover:text-white transition-colors text-sm font-medium cursor-pointer">Security & Compliance</a></li>
                <li><a href="#" className="text-slate-500 hover:text-white transition-colors text-sm font-medium cursor-pointer">Pricing</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Resources</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-slate-500 hover:text-white transition-colors text-sm font-medium cursor-pointer">Documentation</a></li>
                <li><a href="#" className="text-slate-500 hover:text-white transition-colors text-sm font-medium cursor-pointer">API Reference</a></li>
                <li><a href="#" className="text-slate-500 hover:text-white transition-colors text-sm font-medium cursor-pointer">Tutorials & Guides</a></li>
                <li><a href="#" className="text-slate-500 hover:text-white transition-colors text-sm font-medium cursor-pointer">Status Dashboard</a></li>
                <li><a href="#" className="text-slate-500 hover:text-white transition-colors text-sm font-medium cursor-pointer">Blog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-8">Company</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-slate-500 hover:text-white transition-colors text-sm font-medium cursor-pointer">About Us</a></li>
                <li><a href="#" className="text-slate-500 hover:text-white transition-colors text-sm font-medium cursor-pointer">Careers</a></li>
                <li><a href="#" className="text-slate-500 hover:text-white transition-colors text-sm font-medium cursor-pointer">Contact Sales</a></li>
                <li><a href="#" className="text-slate-500 hover:text-white transition-colors text-sm font-medium cursor-pointer">Partners</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-600">
            <p>&copy; 2026 Cognix AI, Inc. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors cursor-pointer">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors cursor-pointer">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors cursor-pointer">Security</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}
