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
import { TrendingUp, Users, MessageSquare, BarChart3, Zap, Target, Bell, Shield, ArrowRight, Menu, Check, Star, ChevronRight, Globe, Mail, Phone, MapPin, Activity, Clock, HeartHandshake, Layers, RefreshCw, Award, BookOpen, Headphones, Play, AlertTriangle, CheckCircle2 } from "lucide-react"

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

const STATS = [
  { value: "94%", label: "Avg. Retention Rate", icon: <TrendingUp className="w-5 h-5" /> },
  { value: "3.8×", label: "Faster Time-to-Value", icon: <Zap className="w-5 h-5" /> },
  { value: "68%", label: "Churn Reduction", icon: <Activity className="w-5 h-5" /> },
  { value: "12K+", label: "CS Teams", icon: <Users className="w-5 h-5" /> },
  { value: "$2.1B", label: "ARR Protected", icon: <Shield className="w-5 h-5" /> },
  { value: "28 Min", label: "Avg. NPS Recovery Time", icon: <Clock className="w-5 h-5" /> },
]

const FEATURES_TABS = [
  {
    value: "health",
    label: "Health Scoring",
    icon: <BarChart3 className="w-5 h-5" />,
    title: "Real-Time Customer Health Scoring at Account Scale",
    description: "PulseCS aggregates 40+ behavioral, product, and support signals into a live health score for every account. Catch churn risk weeks before it becomes a decision — and act on it automatically.",
    items: [
      "40-signal composite health score updated every 15 minutes",
      "Predictive churn probability model (87% accuracy, 60-day horizon)",
      "Product adoption depth scoring by feature tier",
      "Support ticket sentiment and volume trend analysis",
      "Stakeholder engagement tracking across all contacts",
      "QBR readiness score with auto-prepared deck generation",
      "Expansion opportunity scoring based on usage ceiling",
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  },
  {
    value: "playbooks",
    label: "Playbooks",
    icon: <Target className="w-5 h-5" />,
    title: "Automated Playbooks That Run CS at Scale Without Headcount",
    description: "Build once, deploy to thousands of accounts. PulseCS playbooks trigger personalized outreach, in-app nudges, and internal escalations automatically — so your CSMs focus on relationships, not repetitive tasks.",
    items: [
      "Visual no-code playbook builder with 80+ pre-built templates",
      "Trigger conditions: health score drops, feature non-adoption, NPS detractor, contract renewal",
      "Multi-channel outreach: email, Globe, in-app, SMS, calendar invite",
      "A/B test playbook variants with statistical significance alerts",
      "CSM override workflow with audit log for compliance",
      "Playbook performance analytics: engagement rate, time-to-outcome",
      "AI-written outreach copy powered by account context",
    ],
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80",
  },
  {
    value: "insights",
    label: "Revenue Intelligence",
    icon: <TrendingUp className="w-5 h-5" />,
    title: "Turn CS Into a Revenue-Generating Machine",
    description: "PulseCS connects customer health to revenue impact. See churn risk in dollars, identify expansion signals before they go to sales, and prove CS ROI with board-ready reports in one click.",
    items: [
      "Churn risk quantified in ARR (not just accounts)",
      "Expansion pipeline: identifies upsell-ready accounts automatically",
      "CS ROI dashboard: revenue saved, revenue created, cost per outcome",
      "Net Revenue Retention (NRR) forecasting with confidence intervals",
      "CRM sync: Salesforce, HubSpot, and Pipedrive bi-directional",
      "Executive stakeholder digest: weekly automated board-level summary",
      "Benchmarking: compare your KPIs against 12,000 CS org dataset",
    ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  },
]

const TESTIMONIALS = [
  {
    name: "Rachel Chen",
    role: "VP of Customer Success",
    company: "Fathom Analytics",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
    initials: "RC",
    rating: 5,
    quote: "We reduced churn by 41% in our first six months with PulseCS. The health scoring model flagged 23 at-risk accounts that our CSMs had no idea were struggling. We saved $880K in ARR in Q3 alone. It's the best investment we've made in CS infrastructure.",
  },
  {
    name: "Marcus Thompson",
    role: "Chief Customer Officer",
    company: "Nexus HR Platform",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    initials: "MT",
    rating: 5,
    quote: "Our CSMs were spending 60% of their time on manual reporting and task management. PulseCS automated all of that. Now they spend that time actually talking to customers. NPS jumped 18 points in two quarters without hiring a single new CSM.",
  },
  {
    name: "Aisha Patel",
    role: "Director of Customer Success",
    company: "CloudWork B2B",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1eb1df?w=200&q=80",
    initials: "AP",
    rating: 5,
    quote: "The playbook engine is phenomenal. We built an onboarding sequence that automatically adapts based on each customer's feature adoption pace. Time-to-first-value dropped from 38 days to 11 days. Expansion ARR is up 34% year-over-year.",
  },
  {
    name: "James Whitmore",
    role: "Co-Founder & CEO",
    company: "Launchpad SaaS",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    initials: "JW",
    rating: 5,
    quote: "As a Series A startup, we couldn't afford to hire a 10-person CS team. PulseCS let our 2 CSMs operate like 8. We manage 400 accounts with the same quality of service that our enterprise competitors offer with 3x the headcount.",
  },
  {
    name: "Sophia Nakamura",
    role: "Head of Revenue Operations",
    company: "Meridian Cloud",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80",
    initials: "SN",
    rating: 5,
    quote: "The Salesforce integration is flawless. PulseCS health scores live inside our CRM, our CSMs see risk alerts in Globe, and our board gets a real-time NRR forecast every week. We finally have CS and Sales operating from the same data layer.",
  },
]

const PRICING = [
  {
    name: "Startup",
    price: "$399",
    period: "/month",
    description: "For early-stage SaaS teams managing up to 200 accounts with 2–3 CSMs.",
    highlight: false,
    badge: null,
    accounts: "Up to 200 accounts",
    features: [
      "Real-time health scoring (20 signals)",
      "10 automated playbook templates",
      "Globe + email alerting",
      "Churn risk dashboard",
      "HubSpot integration",
      "2 CSM seats included",
      "Standard onboarding (2 weeks)",
    ],
    cta: "Start 14-Day Trial",
  },
  {
    name: "Growth",
    price: "$1,199",
    period: "/month",
    description: "For scaling CS teams managing 200–2,000 accounts who need full automation and revenue intelligence.",
    highlight: true,
    badge: "Most Popular",
    accounts: "Up to 2,000 accounts",
    features: [
      "Full 40-signal health scoring",
      "Unlimited playbooks + A/B testing",
      "AI-generated outreach copy",
      "Expansion pipeline scoring",
      "Salesforce + HubSpot bi-directional",
      "NRR forecasting model",
      "10 CSM seats included",
      "Dedicated onboarding CSM (4 weeks)",
      "Executive reporting suite",
    ],
    cta: "Start 14-Day Trial",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For enterprise CS organizations with 2,000+ accounts, complex hierarchies, and compliance requirements.",
    highlight: false,
    badge: "Enterprise",
    accounts: "Unlimited accounts",
    features: [
      "Everything in Growth",
      "Unlimited CSM seats",
      "Custom health score model training",
      "SSO + SCIM provisioning",
      "SOC 2 Type II + GDPR compliance",
      "Custom SLA with 99.9% uptime",
      "On-site implementation team",
      "Dedicated Customer Success Architect",
    ],
    cta: "Talk to Sales",
  },
]

const FAQS = [
  {
    q: "How long does it take to get value from PulseCS?",
    a: "Most Growth-tier customers see their first meaningful health score alerts within 48 hours of connecting their product data. Full playbook automation is typically running within 2 weeks. Our onboarding CSM works with you to configure your health score model, import your account data, and set up your first five playbooks before you touch anything yourself.",
  },
  {
    q: "What integrations does PulseCS support?",
    a: "PulseCS integrates natively with Salesforce, HubSpot, Pipedrive, Intercom, Zendesk, Gainsight (data import), Mixpanel, Amplitude, Segment, Globe, Microsoft Teams, Jira, and 40+ other tools via our Zapier connector. We also offer a fully documented REST API for custom product data ingestion.",
  },
  {
    q: "How does the predictive churn model work and how accurate is it?",
    a: "Our churn prediction model is trained on behavioral data from 12,000+ CS organizations. For each account, it evaluates 40 behavioral, sentiment, engagement, and product usage signals and outputs a churn probability score with a 60-day horizon. Across our customer base, the model predicts churn with 87% accuracy at the 60-day mark — improving to 94% at 30 days.",
  },
  {
    q: "Can I build custom health score models for my product?",
    a: "Yes. On Growth and Enterprise plans, you can weight any combination of signals in your health score, add custom signals via our API, and train the model against your own historical churn data. Our Customer Success Architects can help you calibrate the model during onboarding and quarterly business reviews.",
  },
  {
    q: "How does PulseCS handle customer segmentation?",
    a: "PulseCS supports unlimited custom segments based on any combination of account attributes, health signals, contract data, and behavioral metrics. You can create segments like 'Enterprise accounts in EMEA with adoption score below 60 and renewal in 90 days' and attach dedicated playbooks and CSM assignments to each segment.",
  },
  {
    q: "Is PulseCS compliant with GDPR and SOC 2?",
    a: "Yes. PulseCS is SOC 2 Type II certified and fully GDPR compliant. We support data residency in the EU (Frankfurt) and US (Virginia). Enterprise plans include a Data Processing Agreement (DPA), custom data retention policies, and audit logs for all data access. Our security whitepaper is available on request.",
  },
  {
    q: "What does 'AI-generated outreach copy' mean in practice?",
    a: "When a playbook triggers an outreach email or Globe message, PulseCS uses GPT-4-class models to draft personalized copy based on the account's name, industry, CSM name, specific health signals that triggered the playbook, recent activity, and their product usage context. Your CSM reviews and approves before send, or you can set high-trust accounts to auto-send. Open rates on AI-drafted messages are 31% higher than manual templates across our customer base.",
  },
]

const RISK_SIGNALS = [
  { label: "Login frequency drop > 40%", severity: "high", icon: <AlertTriangle className="w-4 h-4" /> },
  { label: "Key feature adoption below 20%", severity: "high", icon: <AlertTriangle className="w-4 h-4" /> },
  { label: "Support tickets up 2× MoM", severity: "medium", icon: <Activity className="w-4 h-4" /> },
  { label: "Champion contact gone dark 30 days", severity: "high", icon: <AlertTriangle className="w-4 h-4" /> },
  { label: "NPS score dropped to Detractor", severity: "high", icon: <AlertTriangle className="w-4 h-4" /> },
  { label: "QBR not scheduled (renewal in 90 days)", severity: "medium", icon: <Activity className="w-4 h-4" /> },
]

export default function PulseCSPlatform() {
  const [demoOpen, setDemoOpen] = useState(false)
  const [activeRisk, setActiveRisk] = useState<number | null>(null)

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const yHero = useTransform(scrollYProgress, [0, 0.4], ["0%", "15%"])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 40, damping: 25 })
  const springY = useSpring(mouseY, { stiffness: 40, damping: 25 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX - window.innerWidth / 2) * 0.015)
      mouseY.set((e.clientY - window.innerHeight / 2) * 0.015)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <div
      ref={containerRef}
      style={{ overflowX: "hidden", scrollBehavior: "smooth" }}
      className="bg-white text-slate-900 min-h-screen font-sans"
    >
      {/* STICKY NAVBAR */}
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">Pulse<span className="text-violet-600">CS</span></span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {["Platform", "Playbooks", "Integrations", "Pricing", "Resources"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-sm font-medium text-slate-600 hover:text-violet-600 transition-all duration-150 cursor-pointer"
              >
                {item}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="#" className="hidden sm:block text-sm font-medium text-slate-600 hover:text-slate-900 transition-all duration-150 cursor-pointer">
              Sign In
            </Link>
            <button
              onClick={() => setDemoOpen(true)}
              className="bg-gradient-to-r from-violet-600 to-purple-700 hover:from-violet-700 hover:to-purple-800 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-violet-200 hover:shadow-lg cursor-pointer"
            >
              Get a Demo
            </button>
            <Sheet>
              <SheetTrigger asChild>
                <button className="lg:hidden p-2 rounded-md hover:bg-slate-100 transition-all duration-150 cursor-pointer">
                  <Menu className="w-5 h-5 text-slate-700" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <div className="flex flex-col gap-6 mt-8">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center">
                      <Activity className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg font-bold">PulseCS</span>
                  </div>
                  {["Platform", "Playbooks", "Integrations", "Pricing", "Resources", "Sign In"].map((item) => (
                    <Link key={item} href="#" className="text-base font-medium text-slate-700 hover:text-violet-600 transition-all duration-150 cursor-pointer">
                      {item}
                    </Link>
                  ))}
                  <button
                    onClick={() => setDemoOpen(true)}
                    className="bg-gradient-to-r from-violet-600 to-purple-700 text-white py-3 rounded-full font-semibold hover:opacity-90 transition-all duration-200 cursor-pointer"
                  >
                    Get a Demo
                  </button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.header>

      {/* DEMO DIALOG */}
      <Dialog open={demoOpen} onOpenChange={setDemoOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-slate-900">Book a Live Demo</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <p className="text-sm text-slate-500">See how PulseCS can reduce your churn rate by 40%+ in 90 days. A senior CS Architect will walk you through your specific use case.</p>
            {[
              { label: "Work Email", placeholder: "you@company.com", type: "email" },
              { label: "Full Name", placeholder: "Jane Smith", type: "text" },
              { label: "Company Name", placeholder: "Acme Corp", type: "text" },
              { label: "Number of Accounts", placeholder: "e.g. 500", type: "number" },
            ].map((field) => (
              <div key={field.label} className="space-y-1">
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">{field.label}</label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-violet-400 outline-none text-sm text-slate-800 placeholder:text-slate-400 transition-all duration-200"
                />
              </div>
            ))}
            <button className="w-full bg-gradient-to-r from-violet-600 to-purple-700 hover:opacity-90 text-white py-4 rounded-xl font-bold text-base transition-all duration-200 cursor-pointer">
              Book My Demo →
            </button>
            <p className="text-xs text-slate-400 text-center">30-minute session · No sales pressure · Same-week availability</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16 bg-gradient-to-br from-slate-950 via-violet-950 to-slate-900">
        <motion.div style={{ y: yHero }} className="absolute inset-0 z-0 opacity-30">
          <Image
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
            alt="Dashboard"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-violet-950/80 to-slate-900/90" />

        {/* Animated grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.05)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="max-w-3xl">
            <Reveal>
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge className="bg-violet-500/20 text-violet-300 border-violet-500/30 px-3 py-1 text-xs font-semibold">
                  Customer Success Intelligence
                </Badge>
                <Badge className="bg-white/10 text-white/80 border-white/20 px-3 py-1 text-xs font-semibold">
                  G2 Leader · Customer Success · 2025
                </Badge>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
                Stop Churn Before<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">
                  It Starts.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-xl text-slate-300 leading-relaxed mb-10 max-w-2xl">
                PulseCS gives your Customer Success team real-time account health scoring, AI-powered playbook automation, and revenue intelligence — so you can protect ARR, drive expansion, and prove CS ROI at board level.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex flex-wrap gap-4 mb-12">
                <button
                  onClick={() => setDemoOpen(true)}
                  className="bg-gradient-to-r from-violet-600 to-purple-700 hover:from-violet-500 hover:to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2 transition-all duration-200 shadow-xl hover:shadow-violet-500/30 cursor-pointer"
                >
                  Get a Live Demo <ArrowRight className="w-5 h-5" />
                </button>
                <button className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2 transition-all duration-200 cursor-pointer">
                  <Play className="w-5 h-5" /> Watch 3-Min Overview
                </button>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="flex flex-wrap gap-6 items-center">
                <div className="flex -space-x-2">
                  {["RC", "MT", "AP", "JW", "SN"].map((initials, i) => (
                    <div key={i} className="w-9 h-9 rounded-full border-2 border-slate-800 bg-violet-600 flex items-center justify-center text-xs font-bold text-white">
                      {initials}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                    <span className="text-white font-bold text-sm ml-1">4.9/5</span>
                  </div>
                  <p className="text-sm text-slate-400">From <strong className="text-white">1,800+</strong> reviews on G2 and Capterra</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Live health score card */}
          <motion.div
            style={{ x: springX, y: springY }}
            className="absolute right-6 top-1/2 -translate-y-1/2 hidden xl:block"
          >
            <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-700 rounded-2xl p-6 shadow-2xl w-80">
              <div className="flex justify-between items-center mb-4">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Account Health</p>
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">At Risk</Badge>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center">
                  <Layers className="w-5 h-5 text-slate-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Nexus Corp — Enterprise</p>
                  <p className="text-xs text-slate-500">$184K ARR · Renewal in 67 days</p>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-slate-400">Health Score</span>
                  <span className="text-red-400 font-bold">32 / 100</span>
                </div>
                <Progress value={32} className="h-2" />
              </div>
              {RISK_SIGNALS.slice(0, 3).map((signal, i) => (
                <div key={i} className="flex items-center gap-2 text-xs py-1.5 border-b border-slate-800 last:border-0">
                  <span className={signal.severity === "high" ? "text-red-400" : "text-amber-400"}>{signal.icon}</span>
                  <span className="text-slate-400">{signal.label}</span>
                </div>
              ))}
              <button
                onClick={() => setDemoOpen(true)}
                className="mt-4 w-full bg-violet-600 hover:bg-violet-700 text-white py-2 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer"
              >
                Run Rescue Playbook →
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-gradient-to-r from-violet-700 to-purple-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {STATS.map((stat, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="text-center text-white">
                  <div className="flex justify-center mb-2 text-violet-200">{stat.icon}</div>
                  <div className="text-3xl font-extrabold mb-1">{stat.value}</div>
                  <div className="text-sm text-violet-100 font-medium">{stat.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* RISK SIGNALS DEMO SECTION */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <Badge className="bg-violet-100 text-violet-700 border-violet-200 mb-4">Live Health Intelligence</Badge>
              <h2 className="text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
                Know Which Accounts Are at Risk Right Now — Not in 3 Months
              </h2>
              <p className="text-slate-500 leading-relaxed mb-8">
                PulseCS monitors 40 risk signals across every account in real time. When signals cross thresholds, your CSM gets an alert, a playbook fires automatically, and the at-risk ARR is quantified instantly.
              </p>
              <div className="space-y-3">
                {RISK_SIGNALS.map((signal, i) => (
                  <div
                    key={i}
                    onMouseEnter={() => setActiveRisk(i)}
                    onMouseLeave={() => setActiveRisk(null)}
                    className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                      activeRisk === i
                        ? "border-violet-300 bg-violet-50 shadow-md"
                        : "border-slate-200 bg-white hover:border-violet-200"
                    }`}
                  >
                    <span className={signal.severity === "high" ? "text-red-500" : "text-amber-500"}>{signal.icon}</span>
                    <span className="text-sm font-medium text-slate-800 flex-1">{signal.label}</span>
                    <Badge className={`text-xs ${signal.severity === "high" ? "bg-red-100 text-red-600 border-red-200" : "bg-amber-100 text-amber-600 border-amber-200"}`}>
                      {signal.severity === "high" ? "High Risk" : "Medium Risk"}
                    </Badge>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setDemoOpen(true)}
                className="mt-8 bg-gradient-to-r from-violet-600 to-purple-700 hover:opacity-90 text-white px-6 py-3 rounded-full font-semibold text-sm flex items-center gap-2 transition-all duration-200 cursor-pointer shadow-md"
              >
                See Your Risk Signals Live <ArrowRight className="w-4 h-4" />
              </button>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="bg-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-700">
                <div className="flex justify-between items-center mb-5">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">At-Risk Accounts · Live</p>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs text-green-400 font-medium">Live</span>
                  </div>
                </div>
                {[
                  { name: "Nexus Corp", arr: "$184K", score: 32, risk: "Critical", days: 67 },
                  { name: "Vertex SaaS", arr: "$96K", score: 48, risk: "High", days: 45 },
                  { name: "Cloudmine", arr: "$220K", score: 61, risk: "Medium", days: 120 },
                  { name: "DataLayer Inc.", arr: "$52K", score: 29, risk: "Critical", days: 22 },
                ].map((account, i) => (
                  <div key={i} className="flex items-center gap-4 py-3 border-b border-slate-800 last:border-0 group cursor-pointer hover:bg-slate-800/50 rounded-lg px-2 transition-all duration-150">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0">
                      <Layers className="w-4 h-4 text-slate-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-white">{account.name}</p>
                      <p className="text-xs text-slate-500">{account.arr} ARR · Renewal in {account.days}d</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1.5 justify-end mb-1">
                        <span className={`text-xs font-bold ${account.score < 35 ? "text-red-400" : account.score < 60 ? "text-amber-400" : "text-green-400"}`}>
                          {account.score}
                        </span>
                        <span className="text-xs text-slate-600">/ 100</span>
                      </div>
                      <Badge className={`text-xs ${account.risk === "Critical" ? "bg-red-500/20 text-red-400 border-red-500/30" : account.risk === "High" ? "bg-amber-500/20 text-amber-400 border-amber-500/30" : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"}`}>
                        {account.risk}
                      </Badge>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => setDemoOpen(true)}
                  className="mt-4 w-full bg-violet-600/20 hover:bg-violet-600/30 border border-violet-500/30 text-violet-400 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer"
                >
                  View All 47 At-Risk Accounts →
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FEATURES / TABS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-14">
              <Badge className="bg-violet-100 text-violet-700 border-violet-200 mb-4">Platform Deep Dive</Badge>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">
                Everything Your CS Team Needs. Nothing It Doesn't.
              </h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
                Health scoring, playbook automation, and revenue intelligence — built for CS teams who need to do more with less.
              </p>
            </div>
          </Reveal>

          <Tabs defaultValue="health" className="w-full">
            <TabsList className="grid grid-cols-3 max-w-xl mx-auto mb-12 bg-slate-100 p-1 rounded-xl">
              {FEATURES_TABS.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="flex items-center gap-2 rounded-lg cursor-pointer data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-600 data-[state=active]:to-purple-700 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200"
                >
                  {tab.icon}
                  <span className="hidden sm:block text-xs font-semibold">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {FEATURES_TABS.map((tab) => (
              <TabsContent key={tab.value} value={tab.value}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                    <Badge className="bg-violet-100 text-violet-700 border-violet-200 mb-4">{tab.label}</Badge>
                    <h3 className="text-3xl font-extrabold text-slate-900 mb-4">{tab.title}</h3>
                    <p className="text-slate-500 leading-relaxed mb-8">{tab.description}</p>
                    <ul className="space-y-3">
                      {tab.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="mt-0.5 w-5 h-5 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-violet-600" />
                          </div>
                          <span className="text-sm text-slate-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => setDemoOpen(true)}
                      className="mt-8 bg-gradient-to-r from-violet-600 to-purple-700 hover:opacity-90 text-white px-6 py-3 rounded-full font-semibold text-sm flex items-center gap-2 transition-all duration-200 cursor-pointer shadow-md"
                    >
                      See This in Action <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="relative h-[440px] rounded-2xl overflow-hidden shadow-2xl">
                    <Image src={tab.image} alt={tab.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center">
                            <CheckCircle2 className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 font-medium">{tab.label}</p>
                            <p className="text-sm font-bold text-slate-900">Trusted by 12,000+ CS teams</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-14">
              <Badge className="bg-violet-100 text-violet-700 border-violet-200 mb-4">Customer Stories</Badge>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">
                CS Teams Love PulseCS
              </h2>
              <p className="text-lg text-slate-500 max-w-xl mx-auto">
                See why 12,000+ customer success organizations trust PulseCS to protect and grow their ARR.
              </p>
            </div>
          </Reveal>

          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {TESTIMONIALS.map((t, i) => (
                <CarouselItem key={i} className="md:basis-1/2 pl-4">
                  <Card className="border border-slate-200 hover:border-violet-200 hover:shadow-lg transition-all duration-200 cursor-pointer h-full">
                    <CardContent className="p-8 flex flex-col h-full">
                      <div className="flex items-center gap-1 mb-4">
                        {Array.from({ length: t.rating }).map((_, j) => (
                          <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-slate-700 leading-relaxed flex-1 mb-6 text-sm">"{t.quote}"</p>
                      <Separator className="mb-5" />
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={t.avatar} alt={t.name} />
                          <AvatarFallback className="bg-violet-100 text-violet-700 text-sm font-bold">{t.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{t.name}</p>
                          <p className="text-xs text-slate-500">{t.role} · {t.company}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="cursor-pointer" />
            <CarouselNext className="cursor-pointer" />
          </Carousel>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-14">
              <Badge className="bg-violet-100 text-violet-700 border-violet-200 mb-4">Pricing</Badge>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">Pricing That Scales With Your ARR</h2>
              <p className="text-lg text-slate-500 max-w-xl mx-auto">
                All plans include a 14-day free trial. No credit card required. Cancel any time.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {PRICING.map((plan, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <Card
                  className={`relative border-2 transition-all duration-200 cursor-pointer h-full flex flex-col ${
                    plan.highlight
                      ? "border-violet-500 shadow-xl shadow-violet-100"
                      : "border-slate-200 hover:border-violet-200 hover:shadow-md"
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <Badge className={plan.highlight ? "bg-gradient-to-r from-violet-600 to-purple-700 text-white border-0 px-4 py-1" : "bg-slate-800 text-white border-slate-800 px-4 py-1"}>
                        {plan.badge}
                      </Badge>
                    </div>
                  )}
                  <CardContent className="p-8 flex flex-col flex-1">
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-slate-900 mb-1">{plan.name}</h3>
                      <p className="text-xs text-violet-600 font-semibold mb-3">{plan.accounts}</p>
                      <div className="flex items-end gap-1 mb-3">
                        <span className="text-4xl font-extrabold text-slate-900">{plan.price}</span>
                        <span className="text-slate-400 pb-1 font-medium">{plan.period}</span>
                      </div>
                      <p className="text-sm text-slate-500 leading-relaxed">{plan.description}</p>
                    </div>
                    <ul className="space-y-3 flex-1 mb-8">
                      {plan.features.map((feature, j) => (
                        <li key={j} className="flex items-start gap-2.5">
                          <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.highlight ? "text-violet-500" : "text-slate-400"}`} />
                          <span className="text-sm text-slate-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => setDemoOpen(true)}
                      className={`w-full py-3 rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer ${
                        plan.highlight
                          ? "bg-gradient-to-r from-violet-600 to-purple-700 hover:opacity-90 text-white shadow-md"
                          : "bg-slate-100 hover:bg-slate-200 text-slate-800"
                      }`}
                    >
                      {plan.cta}
                    </button>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-14">
              <Badge className="bg-violet-100 text-violet-700 border-violet-200 mb-4">FAQ</Badge>
              <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Questions CS Teams Ask Before Signing Up</h2>
              <p className="text-slate-500 leading-relaxed">Straight answers from the team that's reduced churn for 12,000+ organizations.</p>
            </div>
          </Reveal>
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-white border border-slate-200 rounded-xl px-6 hover:border-violet-200 transition-all duration-200 cursor-pointer shadow-sm"
              >
                <AccordionTrigger className="text-left font-semibold text-slate-900 py-5 hover:no-underline text-sm leading-snug cursor-pointer">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed pb-5 text-sm">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-24 bg-gradient-to-br from-violet-700 via-purple-800 to-indigo-900 relative overflow-hidden">
        <motion.div
          className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-violet-500/30 blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-6">
              <HeartHandshake className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
              Ready to Stop Churn Before It Happens?
            </h2>
            <p className="text-xl text-violet-100 max-w-xl mx-auto mb-10 leading-relaxed">
              Join 12,000+ CS teams using PulseCS to protect $2.1B in ARR. See the platform live in 30 minutes — same-week availability.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => setDemoOpen(true)}
                className="bg-white hover:bg-violet-50 text-violet-700 px-8 py-4 rounded-full font-bold text-lg transition-all duration-200 shadow-xl cursor-pointer flex items-center gap-2"
              >
                <Activity className="w-5 h-5" /> Book a Live Demo
              </button>
              <Link href="#" className="bg-transparent border-2 border-white/40 hover:bg-white/10 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-200 cursor-pointer">
                Start Free Trial
              </Link>
            </div>
            <p className="text-violet-200 text-sm mt-8">14-day free trial · No credit card · Setup in under 48 hours</p>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center">
                  <Activity className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold">Pulse<span className="text-violet-400">CS</span></span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
                The Customer Success intelligence platform that stops churn before it starts. Trusted by 12,000+ CS teams.
              </p>
              <div className="flex gap-3">
                {[Globe, Globe, Globe].map((Icon, i) => (
                  <a key={i} href="#" className="w-9 h-9 rounded-full bg-slate-800 hover:bg-violet-600 flex items-center justify-center transition-all duration-200 cursor-pointer">
                    <Icon className="w-4 h-4 text-slate-400" />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4 text-sm">Platform</h4>
              <ul className="space-y-3">
                {["Health Scoring", "Playbooks", "Revenue Intelligence", "Integrations", "Security"].map((item) => (
                  <li key={item}><Link href="#" className="text-slate-400 hover:text-violet-400 text-sm transition-all duration-150 cursor-pointer">{item}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4 text-sm">Resources</h4>
              <ul className="space-y-3">
                {["Documentation", "CS Blog", "Benchmark Report", "Webinars", "Community"].map((item) => (
                  <li key={item}><Link href="#" className="text-slate-400 hover:text-violet-400 text-sm transition-all duration-150 cursor-pointer">{item}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4 text-sm">Contact</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-violet-500" /><span>hello@pulsecs.io</span></li>
                <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-violet-500" /><span>+1 (415) 802-3340</span></li>
                <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-violet-500" /><span>San Francisco · New York</span></li>
              </ul>
              <button
                onClick={() => setDemoOpen(true)}
                className="mt-6 bg-gradient-to-r from-violet-600 to-purple-700 hover:opacity-90 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer w-full"
              >
                Get a Demo
              </button>
            </div>
          </div>
          <Separator className="bg-slate-800 mb-8" />
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>© 2026 PulseCS, Inc. All rights reserved. SOC 2 Type II · GDPR Compliant</p>
            <div className="flex gap-6">
              {["Privacy Policy", "Terms of Service", "Security", "Accessibility"].map((item) => (
                <Link key={item} href="#" className="hover:text-slate-300 transition-all duration-150 cursor-pointer">{item}</Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
