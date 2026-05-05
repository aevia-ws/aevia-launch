"use client"

import { motion, useScroll, useTransform, useInView, AnimatePresence, useMotionValue, useSpring } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { BarChart2, TrendingUp, Users, Globe, Zap, Target, Activity, CheckCircle, Star, Menu, ArrowRight, ArrowUpRight, Eye, Heart, MessageSquare, Share2, Hash, Calendar, Bell, ChevronRight, PieChart, RefreshCw, Download, Filter, Clock } from "lucide-react"

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  )
}

const STATS = [
  { value: "14B+", label: "Data Points / Day", icon: <Activity className="w-5 h-5" /> },
  { value: "180+", label: "Platforms Tracked", icon: <Globe className="w-5 h-5" /> },
  { value: "97.3%", label: "Accuracy Rate", icon: <Target className="w-5 h-5" /> },
  { value: "8,200+", label: "Brands & Agencies", icon: <Users className="w-5 h-5" /> },
  { value: "< 2s", label: "Data Refresh Rate", icon: <RefreshCw className="w-5 h-5" /> },
  { value: "4.8★", label: "G2 Rating", icon: <Star className="w-5 h-5" /> },
]

const TESTIMONIALS = [
  {
    name: "Jordan Kim",
    role: "Head of Social Strategy",
    company: "Ogilvy Global",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    rating: 5,
    text: "Prism replaced six separate tools we were using. Competitor benchmarking, hashtag research, influencer analytics, and audience insights — all in one workspace. We closed a $2.1M client because of the reporting we produced with it.",
  },
  {
    name: "Felix Hartmann",
    role: "CMO",
    company: "Neon Commerce",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    rating: 5,
    text: "The predictive trend engine is genuinely ahead of anything else I've tried. It spotted a rising conversation in our space 3 weeks before it went mainstream. We built a campaign around it and got 4x our usual organic reach.",
  },
  {
    name: "Aisha Patel",
    role: "Social Media Director",
    company: "L'Oréal Paris",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80",
    rating: 5,
    text: "Managing social for 12 L'Oréal brands across 40 markets was chaos before Prism. Now I have unified dashboards per brand, automatic competitive reporting, and an AI that flags anomalies the moment they happen. Sleep better now.",
  },
  {
    name: "Carlos Mendez",
    role: "Founder & CEO",
    company: "SocialFlow Agency",
    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&q=80",
    rating: 5,
    text: "We grew our agency from 8 to 47 clients in 14 months. Prism's white-label reports are so polished that clients think we have a 10-person analytics team. It's the unfair advantage we needed to compete with the big agencies.",
  },
  {
    name: "Naomi Sterling",
    role: "Growth Lead",
    company: "Hinge Health",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1eb1df?w=200&q=80",
    rating: 5,
    text: "Healthcare social is tricky — compliance matters. Prism's approval workflow and audit trail features solved a real problem for us. And the sentiment analysis for health topics is remarkably nuanced compared to generic tools.",
  },
]

const PRICING = [
  {
    name: "Starter",
    price: "$49",
    period: "/month",
    description: "For growing brands getting serious about social",
    features: [
      "5 social profiles",
      "90-day historical data",
      "Competitor tracking (3 accounts)",
      "Automated weekly reports",
      "Hashtag analytics",
      "Standard email support",
    ],
    cta: "Start Free Trial",
    highlighted: false,
    badge: null,
  },
  {
    name: "Professional",
    price: "$149",
    period: "/month",
    description: "For marketing teams that live in data",
    features: [
      "25 social profiles",
      "2-year historical data",
      "Unlimited competitor tracking",
      "AI trend predictions",
      "Influencer discovery engine",
      "White-label PDF reports",
      "Audience demographics deep-dive",
      "Globe & Teams integration",
    ],
    cta: "Start 14-Day Trial",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Enterprise",
    price: "$499",
    period: "/month",
    description: "For agencies and enterprise marketing teams",
    features: [
      "Unlimited profiles & brands",
      "Full historical data",
      "Custom AI model training",
      "API access (1M calls/month)",
      "Dedicated account manager",
      "SSO & advanced permissions",
      "SLA 99.99% uptime guarantee",
      "Custom data integrations",
    ],
    cta: "Book a Demo",
    highlighted: false,
    badge: null,
  },
]

const FAQS = [
  {
    q: "Which social platforms does Prism track?",
    a: "Prism currently tracks Globe, TikTok, X (Globe), LinkedIn, Globe, YouTube, Pinterest, Snapchat, Threads, and Reddit. We also monitor 170+ niche platforms and forums through our web listening module. New platform integrations are added within 30 days of significant adoption.",
  },
  {
    q: "How does the AI trend prediction work?",
    a: "Our trend engine analyzes velocity patterns across 14 billion daily data points — looking at conversation growth rates, cross-platform signal correlation, influencer seeding behavior, and historical analogues. It identifies emerging trends 2-4 weeks before they peak, giving your team a meaningful first-mover advantage.",
  },
  {
    q: "Can I track competitor accounts that block me?",
    a: "Yes. Our data collection operates independently of your social accounts. As long as a competitor's content is publicly accessible, we can track it regardless of your relationship with them. We track their follower growth, engagement rates, posting cadence, top content, and audience growth trends.",
  },
  {
    q: "How does white-label reporting work?",
    a: "On Professional and Enterprise plans, you can add your agency logo, custom colors, and domain to all exported reports. PDFs are publication-ready with pixel-perfect charts. You can also set up automated email delivery so reports go directly to clients on a schedule you define — weekly, monthly, or event-triggered.",
  },
  {
    q: "What's included in the Influencer Discovery Engine?",
    a: "The engine lets you search 85 million indexed creator profiles by niche, audience demographics, engagement rate, follower count, location, and audience authenticity score. You can shortlist creators, compare side-by-side, and export a deck for client presentations — all without leaving Prism.",
  },
  {
    q: "How fresh is the data? What's the refresh rate?",
    a: "Most metrics update within 2 seconds of being posted or engaged with. Follower counts and aggregate metrics refresh every 60 seconds. Historical trend data is finalized within 4 hours. During live events and crises, our system automatically shifts to real-time mode for tracked keywords and accounts.",
  },
  {
    q: "Can multiple team members use the same account?",
    a: "Every plan includes unlimited team seats. You can set role-based permissions so analysts see different data than executives, and clients only see their own brand's data. The Professional and Enterprise plans include an activity log so you can see exactly who accessed or exported what.",
  },
]

const METRIC_CARDS = [
  { label: "Follower Growth", value: "+18.4%", change: "+3.2%", color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/20" },
  { label: "Engagement Rate", value: "6.7%", change: "+0.8%", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  { label: "Impressions", value: "2.4M", change: "+22%", color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
  { label: "Share of Voice", value: "34.1%", change: "+5.6%", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
]

export default function PrismAnalyticsSaaS() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const [demoOpen, setDemoOpen] = useState(false)
  const [billingAnnual, setBillingAnnual] = useState(false)

  const heroY = useTransform(scrollYProgress, [0, 0.3], ["0%", "15%"])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 50, damping: 25 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 25 })

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseX.set((e.clientX - window.innerWidth / 2) * 0.02)
      mouseY.set((e.clientY - window.innerHeight / 2) * 0.02)
    }
    window.addEventListener("mousemove", handler)
    return () => window.removeEventListener("mousemove", handler)
  }, [mouseX, mouseY])

  return (
    <div
      ref={containerRef}
      style={{ overflowX: "hidden", scrollBehavior: "smooth" }}
      className="bg-[#0d0d14] text-white min-h-screen font-sans antialiased"
    >
      {/* ── AMBIENT GLOW ── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          style={{ x: springX, y: springY }}
          className="absolute top-[-15%] left-[20%] w-[55vw] h-[55vw] bg-violet-600 opacity-[0.07] blur-[130px] rounded-full"
        />
        <motion.div
          style={{ x: springX, y: springY }}
          className="absolute bottom-[-5%] right-[10%] w-[35vw] h-[35vw] bg-blue-500 opacity-[0.05] blur-[110px] rounded-full"
        />
      </div>

      {/* ── NAVBAR ── */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.07] bg-[#0d0d14]/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
              <PieChart className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">Prism</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {["Features", "Analytics", "Integrations", "Pricing", "Customers"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-sm text-slate-400 hover:text-white transition-all duration-200 cursor-pointer font-medium"
              >
                {item}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="#"
              className="hidden md:block text-sm text-slate-400 hover:text-white transition-all duration-200 cursor-pointer font-medium px-4 py-2"
            >
              Sign in
            </Link>
            <button className="bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-400 hover:to-blue-400 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all duration-200 cursor-pointer shadow-lg shadow-violet-500/20">
              Start Free Trial
            </button>
            <Sheet>
              <SheetTrigger asChild>
                <button className="md:hidden p-2 text-slate-400 hover:text-white transition-all duration-150 cursor-pointer">
                  <Menu className="w-5 h-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#13131f] border-white/10 text-white w-72">
                <div className="flex items-center gap-2.5 mb-10 mt-4">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
                    <PieChart className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-lg font-bold">Prism</span>
                </div>
                <nav className="flex flex-col gap-4">
                  {["Features", "Analytics", "Integrations", "Pricing", "Customers", "Sign in"].map((item) => (
                    <Link key={item} href="#" className="text-slate-300 hover:text-white text-base font-medium transition-all duration-150 cursor-pointer py-1">
                      {item}
                    </Link>
                  ))}
                  <button className="mt-4 bg-gradient-to-r from-violet-500 to-blue-500 text-white font-semibold py-3 rounded-lg cursor-pointer">
                    Start Free Trial
                  </button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0 opacity-30">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.08)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </motion.div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <Badge className="mb-6 bg-violet-500/10 text-violet-300 border-violet-500/20 text-xs font-semibold px-4 py-1.5 rounded-full">
              14 billion data points processed daily — and counting
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl font-extrabold text-white leading-[1.05] tracking-tight mb-6"
          >
            Social analytics that
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400">
              actually predict
            </span>
            <br />
            what comes next
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Prism is the social media intelligence platform that turns raw data from 180+ platforms into competitive advantage. Track, benchmark, and predict — in real time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <button className="w-full sm:w-auto bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-400 hover:to-blue-400 text-white font-bold px-8 py-4 rounded-xl text-base transition-all duration-200 cursor-pointer shadow-xl shadow-violet-500/25 flex items-center justify-center gap-2">
              Start 14-Day Free Trial <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDemoOpen(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 text-white font-semibold px-8 py-4 rounded-xl border border-white/10 hover:border-violet-500/30 bg-white/5 hover:bg-white/8 transition-all duration-200 cursor-pointer"
            >
              <BarChart2 className="w-4 h-4 text-violet-400" />
              See live demo dashboard
            </button>
          </motion.div>

          {/* Live metric preview cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto"
          >
            {METRIC_CARDS.map((m, i) => (
              <div
                key={i}
                className={`${m.bg} ${m.border} border rounded-2xl p-4 text-left backdrop-blur-sm`}
              >
                <div className="text-xs text-slate-500 font-medium mb-2">{m.label}</div>
                <div className={`text-2xl font-extrabold ${m.color} mb-1`}>{m.value}</div>
                <div className="flex items-center gap-1 text-xs text-slate-400">
                  <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400">{m.change}</span>
                  <span className="text-slate-500">vs last month</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <Dialog open={demoOpen} onOpenChange={setDemoOpen}>
          <DialogContent className="bg-[#13131f] border-white/10 max-w-4xl">
            <DialogHeader>
              <DialogTitle className="text-white text-lg font-bold">Prism Analytics Dashboard</DialogTitle>
            </DialogHeader>
            <div className="aspect-video bg-[#0d0d14] rounded-xl flex items-center justify-center border border-white/10">
              <BarChart2 className="w-16 h-16 text-violet-400 opacity-40" />
            </div>
          </DialogContent>
        </Dialog>
      </section>

      {/* ── STATS BAR ── */}
      <section className="py-16 border-y border-white/[0.07] bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {STATS.map((stat, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 text-violet-400 mb-2">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-extrabold text-white mb-1">{stat.value}</div>
                  <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES TABS ── */}
      <section className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-violet-500/10 text-violet-300 border-violet-500/20 text-xs font-semibold px-3 py-1 rounded-full">
                Intelligence Modules
              </Badge>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-5 tracking-tight">
                One platform.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
                  Every social signal.
                </span>
              </h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
                From real-time monitoring to predictive trend intelligence — Prism consolidates your entire social data stack into one powerful workspace.
              </p>
            </div>
          </Reveal>

          <Tabs defaultValue="listening" className="w-full">
            <Reveal delay={0.1}>
              <TabsList className="flex flex-wrap justify-center gap-1 mb-12 bg-white/[0.03] border border-white/[0.08] p-1.5 rounded-2xl h-auto max-w-3xl mx-auto">
                {[
                  { value: "listening", label: "Social Listening", icon: <Bell className="w-4 h-4" /> },
                  { value: "benchmarking", label: "Benchmarking", icon: <BarChart2 className="w-4 h-4" /> },
                  { value: "trends", label: "Trend Engine", icon: <TrendingUp className="w-4 h-4" /> },
                  { value: "influencers", label: "Influencers", icon: <Users className="w-4 h-4" /> },
                ].map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="flex items-center gap-2 text-sm font-semibold py-2.5 px-4 rounded-xl data-[state=active]:bg-violet-500 data-[state=active]:text-white text-slate-400 cursor-pointer transition-all duration-200"
                  >
                    {tab.icon}
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Reveal>

            <TabsContent value="listening">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <Reveal>
                  <div>
                    <div className="inline-flex items-center gap-3 bg-violet-500/10 border border-violet-500/20 rounded-xl px-4 py-2 mb-6">
                      <Bell className="w-5 h-5 text-violet-400" />
                      <span className="text-violet-400 font-semibold text-sm">Real-Time Social Listening</span>
                    </div>
                    <h3 className="text-3xl font-extrabold text-white mb-5 leading-tight">
                      Never miss a mention, a movement, or a moment
                    </h3>
                    <p className="text-slate-400 text-base leading-relaxed mb-8">
                      Monitor every conversation about your brand, competitors, and industry across 180+ platforms — with sub-2-second latency. Set smart alerts and get notified before a mention becomes a crisis.
                    </p>
                    <ul className="space-y-4">
                      {[
                        "Boolean query builder with 40+ filter operators",
                        "Sentiment analysis in 54 languages",
                        "Spike detection and crisis alerting",
                        "Author influence scoring and reachability metrics",
                        "Historical replay up to 2 years back",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                          <CheckCircle className="w-4 h-4 text-violet-400 mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
                <Reveal delay={0.15}>
                  <div className="bg-[#13131f] border border-white/[0.08] rounded-2xl p-6 space-y-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-white">Live Mention Stream</span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                        <span className="text-xs text-emerald-400 font-semibold">LIVE</span>
                      </div>
                    </div>
                    {[
                      { platform: "Globe", user: "@techcrunch", text: "This product is genuinely the best social tool we've tried all year.", sentiment: "positive", time: "2s ago" },
                      { platform: "LinkedIn", user: "Sarah Chen", text: "Our Q3 social report using Prism was a massive hit with the board.", sentiment: "positive", time: "8s ago" },
                      { platform: "Reddit", user: "u/marketingpro99", text: "Anyone else using this for competitive intel? The benchmarking is crazy good.", sentiment: "positive", time: "15s ago" },
                    ].map((mention, i) => (
                      <div key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 hover:border-violet-500/20 transition-all duration-200 cursor-pointer">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Badge className="bg-violet-500/10 text-violet-300 border-violet-500/20 text-[10px] px-2 py-0.5">{mention.platform}</Badge>
                            <span className="text-xs font-semibold text-slate-300">{mention.user}</span>
                          </div>
                          <span className="text-[10px] text-slate-500">{mention.time}</span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">{mention.text}</p>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>
            </TabsContent>

            <TabsContent value="benchmarking">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <Reveal>
                  <div>
                    <div className="inline-flex items-center gap-3 bg-blue-500/10 border border-blue-500/20 rounded-xl px-4 py-2 mb-6">
                      <BarChart2 className="w-5 h-5 text-blue-400" />
                      <span className="text-blue-400 font-semibold text-sm">Competitive Benchmarking</span>
                    </div>
                    <h3 className="text-3xl font-extrabold text-white mb-5 leading-tight">
                      Know exactly where you stand against your competition
                    </h3>
                    <p className="text-slate-400 text-base leading-relaxed mb-8">
                      Track any public account on any platform without limits. Compare follower growth trajectories, content performance, posting cadence, and audience engagement — side by side in one dashboard.
                    </p>
                    <ul className="space-y-4">
                      {[
                        "Head-to-head competitor comparison charts",
                        "Share of voice tracking across platforms",
                        "Content type performance breakdown",
                        "Hashtag strategy reverse engineering",
                        "Publishing cadence and timing analysis",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                          <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
                <Reveal delay={0.15}>
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-white/10">
                    <Image
                      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
                      alt="Benchmarking dashboard"
                      fill
                      className="object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d14]/90 to-transparent" />
                  </div>
                </Reveal>
              </div>
            </TabsContent>

            <TabsContent value="trends">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <Reveal>
                  <div>
                    <div className="inline-flex items-center gap-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl px-4 py-2 mb-6">
                      <TrendingUp className="w-5 h-5 text-cyan-400" />
                      <span className="text-cyan-400 font-semibold text-sm">AI Trend Prediction</span>
                    </div>
                    <h3 className="text-3xl font-extrabold text-white mb-5 leading-tight">
                      See trends 2-4 weeks before they peak — consistently
                    </h3>
                    <p className="text-slate-400 text-base leading-relaxed mb-8">
                      Our proprietary trend engine has an 89% accuracy rate on trend arrival forecasting. It's the difference between leading conversations and chasing them.
                    </p>
                    <ul className="space-y-4">
                      {[
                        "Emerging topic velocity tracking across 14B daily signals",
                        "Trend lifecycle stage classification",
                        "Industry-specific trend filtering and alerts",
                        "Brand safety scoring for trend participation",
                        "Competitive trend adoption monitoring",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                          <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
                <Reveal delay={0.15}>
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-white/10">
                    <Image
                      src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
                      alt="Trend engine"
                      fill
                      className="object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d14]/90 to-transparent" />
                  </div>
                </Reveal>
              </div>
            </TabsContent>

            <TabsContent value="influencers">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <Reveal>
                  <div>
                    <div className="inline-flex items-center gap-3 bg-pink-500/10 border border-pink-500/20 rounded-xl px-4 py-2 mb-6">
                      <Users className="w-5 h-5 text-pink-400" />
                      <span className="text-pink-400 font-semibold text-sm">Influencer Intelligence</span>
                    </div>
                    <h3 className="text-3xl font-extrabold text-white mb-5 leading-tight">
                      Find the right creators — not just the biggest ones
                    </h3>
                    <p className="text-slate-400 text-base leading-relaxed mb-8">
                      Discover and vet 85 million indexed creators across all platforms. Our authenticity scoring filters out fake followers and engagement pods so every partnership is built on real data.
                    </p>
                    <ul className="space-y-4">
                      {[
                        "85M creator profiles with audience demographic breakdowns",
                        "Fake follower and engagement fraud detection",
                        "Audience overlap analysis across creator portfolios",
                        "Historical campaign performance tracking",
                        "Direct outreach management and CRM integration",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                          <CheckCircle className="w-4 h-4 text-pink-400 mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
                <Reveal delay={0.15}>
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-white/10">
                    <Image
                      src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80"
                      alt="Influencer discovery"
                      fill
                      className="object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d14]/90 to-transparent" />
                  </div>
                </Reveal>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-28 px-6 bg-white/[0.02] border-y border-white/[0.07]">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-violet-500/10 text-violet-300 border-violet-500/20 text-xs font-semibold px-3 py-1 rounded-full">
                Customer Stories
              </Badge>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-5 tracking-tight">
                Trusted by the world's
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
                  sharpest social teams
                </span>
              </h2>
              <p className="text-slate-400 text-lg max-w-xl mx-auto">
                From boutique agencies to Fortune 500 marketing departments — they all trust Prism.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Carousel opts={{ align: "start", loop: true }} className="w-full">
              <CarouselContent className="-ml-4">
                {TESTIMONIALS.map((t, i) => (
                  <CarouselItem key={i} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <Card className="bg-white/[0.03] border border-white/[0.08] rounded-2xl hover:border-violet-500/20 transition-all duration-300 cursor-pointer h-full">
                      <CardContent className="p-7 flex flex-col h-full">
                        <div className="flex items-center gap-1 mb-5">
                          {Array.from({ length: t.rating }).map((_, j) => (
                            <Star key={j} className="w-4 h-4 fill-violet-400 text-violet-400" />
                          ))}
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed mb-6 flex-1">"{t.text}"</p>
                        <Separator className="bg-white/[0.08] mb-5" />
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10 border border-white/10">
                            <AvatarImage src={t.avatar} />
                            <AvatarFallback className="bg-violet-500/20 text-violet-400 font-bold text-xs">
                              {t.name.slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-sm font-bold text-white">{t.name}</div>
                            <div className="text-xs text-slate-500">{t.role} · {t.company}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0 bg-white/5 border-white/10 text-white hover:bg-white/10 cursor-pointer" />
              <CarouselNext className="right-0 bg-white/5 border-white/10 text-white hover:bg-white/10 cursor-pointer" />
            </Carousel>
          </Reveal>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-violet-500/10 text-violet-300 border-violet-500/20 text-xs font-semibold px-3 py-1 rounded-full">
                Transparent Pricing
              </Badge>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-5 tracking-tight">
                Scale your social intelligence
              </h2>
              <p className="text-slate-400 text-lg max-w-xl mx-auto mb-8">
                Every plan includes full onboarding, unlimited team seats, and free migrations from competitors.
              </p>
              <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-1">
                <button
                  onClick={() => setBillingAnnual(false)}
                  className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${!billingAnnual ? "bg-violet-500 text-white" : "text-slate-400 hover:text-white"}`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingAnnual(true)}
                  className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${billingAnnual ? "bg-violet-500 text-white" : "text-slate-400 hover:text-white"}`}
                >
                  Annual <span className="text-xs ml-1 opacity-70">Save 25%</span>
                </button>
              </div>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {PRICING.map((plan, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div
                  className={`relative rounded-2xl p-8 border flex flex-col h-full transition-all duration-300 cursor-pointer ${
                    plan.highlighted
                      ? "bg-gradient-to-b from-violet-500/10 to-blue-500/5 border-violet-500/40 shadow-xl shadow-violet-500/10"
                      : "bg-white/[0.02] border-white/[0.08] hover:border-white/20"
                  }`}
                >
                  {plan.badge && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-violet-500 to-blue-500 text-white border-none text-xs font-bold px-4 py-1 rounded-full">
                      {plan.badge}
                    </Badge>
                  )}
                  <div className="mb-8">
                    <h3 className="text-xl font-extrabold text-white mb-2">{plan.name}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-5">{plan.description}</p>
                    <div className="flex items-end gap-1">
                      <span className="text-5xl font-extrabold text-white">
                        {billingAnnual
                          ? plan.price === "$49" ? "$37" : plan.price === "$149" ? "$112" : "$374"
                          : plan.price}
                      </span>
                      <span className="text-slate-400 text-sm mb-2">{plan.period}</span>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm text-slate-300">
                        <CheckCircle className={`w-4 h-4 mt-0.5 shrink-0 ${plan.highlighted ? "text-violet-400" : "text-slate-500"}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer ${
                      plan.highlighted
                        ? "bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-400 hover:to-blue-400 text-white shadow-lg shadow-violet-500/25"
                        : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-28 px-6 bg-white/[0.02] border-y border-white/[0.07]">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <Badge className="mb-4 bg-violet-500/10 text-violet-300 border-violet-500/20 text-xs font-semibold px-3 py-1 rounded-full">
                FAQ
              </Badge>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                Everything you need to know
              </h2>
              <p className="text-slate-400 text-lg">Straight answers to the questions we get every day.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Accordion type="single" collapsible className="space-y-3">
              {FAQS.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="bg-white/[0.03] border border-white/[0.08] rounded-xl px-6 data-[state=open]:border-violet-500/20 transition-all duration-200"
                >
                  <AccordionTrigger className="text-white font-semibold text-sm py-5 hover:no-underline cursor-pointer hover:text-violet-400 transition-all duration-200 text-left">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-400 text-sm leading-relaxed pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="relative rounded-3xl overflow-hidden border border-violet-500/20 bg-gradient-to-br from-violet-900/40 via-blue-900/30 to-slate-900/40 p-12 md:p-20 text-center">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.05)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
              <div className="relative z-10">
                <Badge className="mb-6 bg-violet-500/20 text-violet-300 border-violet-500/30 text-xs font-bold px-4 py-1.5 rounded-full">
                  Free 14-Day Trial — No Credit Card
                </Badge>
                <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
                  Stop guessing.
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
                    Start knowing.
                  </span>
                </h2>
                <p className="text-slate-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                  Join 8,200+ marketing teams using Prism to track, benchmark, and predict the social landscape. Start free — no credit card, no commitment.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button className="w-full sm:w-auto bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-400 hover:to-blue-400 text-white font-bold px-10 py-4 rounded-xl text-base transition-all duration-200 cursor-pointer shadow-xl shadow-violet-500/25">
                    Start Free Trial
                  </button>
                  <button className="w-full sm:w-auto flex items-center justify-center gap-2 text-white font-semibold px-8 py-4 rounded-xl border border-white/15 hover:bg-white/5 transition-all duration-200 cursor-pointer">
                    Book a demo <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/[0.07] bg-[#0d0d14] pt-20 pb-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-5 cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
                  <PieChart className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold text-white">Prism</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-6">
                The social media intelligence platform that turns noise into signal — and signal into competitive advantage.
              </p>
              <div className="flex items-center gap-4">
                {[
                  { icon: <Globe className="w-4 h-4" />, href: "#" },
                  { icon: <Globe className="w-4 h-4" />, href: "#" },
                  { icon: <Globe className="w-4 h-4" />, href: "#" },
                ].map((s, i) => (
                  <Link
                    key={i}
                    href={s.href}
                    className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 hover:border-violet-500/30 transition-all duration-200 cursor-pointer"
                  >
                    {s.icon}
                  </Link>
                ))}
              </div>
            </div>

            {[
              { title: "Product", links: ["Features", "Pricing", "Changelog", "Roadmap", "Status"] },
              { title: "Solutions", links: ["Agencies", "Enterprise", "Startups", "Creators", "Nonprofits"] },
              { title: "Company", links: ["About", "Blog", "Careers", "Press", "Legal"] },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="text-sm font-bold text-white mb-5">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <Link href="#" className="text-sm text-slate-400 hover:text-white transition-all duration-150 cursor-pointer">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <Separator className="bg-white/[0.07] mb-8" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">© 2026 Prism Analytics, Inc. All rights reserved.</p>
            <div className="flex items-center gap-6">
              {["Privacy", "Terms", "Security", "GDPR", "Cookies"].map((item) => (
                <Link key={item} href="#" className="text-xs text-slate-500 hover:text-slate-300 transition-all duration-150 cursor-pointer">
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
