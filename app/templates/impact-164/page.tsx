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
import { Menu, Truck, Package, Globe, BarChart3, Zap, Shield, Clock, MapPin, AlertTriangle, CheckCircle2, ChevronRight, ArrowRight, TrendingDown, Layers, Bell, Settings, RefreshCw, Star, Building2, Boxes } from "lucide-react"

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  )
}

function Counter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  useEffect(() => {
    if (!isInView) return
    const step = target / 80
    const t = setInterval(() => {
      setCount(c => {
        const n = c + step
        if (n >= target) { clearInterval(t); return target }
        return n
      })
    }, 16)
    return () => clearInterval(t)
  }, [isInView, target])
  return <span ref={ref}>{prefix}{Math.floor(count).toLocaleString()}{suffix}</span>
}

const TESTIMONIALS = [
  {
    name: "Helena Brandt",
    role: "VP of Supply Chain",
    company: "Arcalon Manufacturing",
    avatar: "HB",
    avatarImg: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80",
    quote: "ChainOS gave us real-time visibility across 47 supplier tiers for the first time ever. We caught a critical material shortage 11 days before it would have shut down our production line.",
    rating: 5,
    metric: "11-day early warning on disruption"
  },
  {
    name: "Carlos Villanueva",
    role: "Director of Logistics",
    company: "Pacifica Retail Group",
    avatar: "CV",
    avatarImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    quote: "Our freight costs dropped 23% in the first year. The AI route optimization engine consistently finds savings our logistics team would never have spotted manually.",
    rating: 5,
    metric: "23% freight cost reduction"
  },
  {
    name: "Mei Takahashi",
    role: "Head of Operations",
    company: "Shizen Foods International",
    avatar: "MT",
    avatarImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80",
    quote: "Managing perishable goods across 12 countries used to mean constant firefighting. ChainOS's predictive alerts have driven our spoilage rate below 0.8% — an industry record for us.",
    rating: 5,
    metric: "Spoilage below 0.8% achieved"
  },
  {
    name: "Anthony Wells",
    role: "Chief Supply Chain Officer",
    company: "Vertex Pharma",
    avatar: "AW",
    avatarImg: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80",
    quote: "Regulatory compliance across the cold chain was our biggest headache. ChainOS automated our GDP documentation and cut audit prep time from 3 weeks to 2 days.",
    rating: 5,
    metric: "Audit prep time cut 95%"
  },
  {
    name: "Ingrid Sørensen",
    role: "Operations Director",
    company: "Nordic Build Materials",
    avatar: "IS",
    avatarImg: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80",
    quote: "Demand forecasting was always a guessing game. ChainOS's ML models now hit 94% accuracy on a 16-week horizon, transforming how we plan production and raw material orders.",
    rating: 5,
    metric: "94% demand forecast accuracy"
  }
]

const PRICING = [
  {
    name: "Essentials",
    price: "$299",
    period: "/month",
    description: "For growing businesses managing up to 500 SKUs across a single region.",
    features: [
      "Up to 500 active SKUs",
      "Real-time inventory tracking",
      "Basic demand forecasting",
      "3 warehouse locations",
      "Standard carrier integrations",
      "Email alert notifications",
      "Community support"
    ],
    cta: "Start Free Trial",
    highlight: false,
    badge: null
  },
  {
    name: "Scale",
    price: "$899",
    period: "/month",
    description: "The complete operations platform for mid-market supply chains.",
    features: [
      "Unlimited SKUs",
      "Multi-tier supplier visibility (3 levels)",
      "AI route optimization",
      "Predictive disruption alerts",
      "Customs & compliance automation",
      "10 warehouse locations",
      "ERP integration (SAP, Oracle, NetSuite)",
      "Dedicated onboarding manager",
      "8-hour support SLA"
    ],
    cta: "Start Free Trial",
    highlight: true,
    badge: "Best Value"
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For global operations with complex, multi-modal supply chains.",
    features: [
      "Everything in Scale",
      "Full N-tier supplier mapping",
      "Control tower dashboard",
      "Scenario planning & simulation",
      "Carbon footprint analytics",
      "Unlimited locations & warehouses",
      "Custom ML model training",
      "24/7 dedicated support",
      "On-premise deployment option"
    ],
    cta: "Contact Sales",
    highlight: false,
    badge: null
  }
]

const FAQS = [
  {
    q: "How quickly can we get live data from our suppliers?",
    a: "Most suppliers can be onboarded in 48–72 hours using our supplier portal, which requires no technical integration on their end. For deeper data sharing, our EDI and API connectors typically go live within 2 weeks. We handle all the supplier onboarding communication on your behalf."
  },
  {
    q: "Which ERP and WMS systems does ChainOS integrate with?",
    a: "ChainOS connects natively to SAP S/4HANA, Oracle SCM Cloud, Microsoft Dynamics 365, NetSuite, Manhattan WMS, and Blue Yonder. We also offer a REST API and pre-built Zapier connectors for custom integrations. Our integration library spans 180+ supply chain and logistics platforms."
  },
  {
    q: "How does the disruption prediction engine work?",
    a: "Our disruption engine continuously monitors 12,000+ external signals — including port congestion data, weather events, geopolitical risk indices, supplier financial health scores, and news sentiment — and maps them against your specific supply network to surface probabilistic risk scores at the node level, typically 7–21 days ahead of impact."
  },
  {
    q: "Can ChainOS handle cold chain and temperature-sensitive logistics?",
    a: "Yes. ChainOS has a dedicated cold chain module that ingests IoT temperature sensor data, tracks HACCP compliance checkpoints, generates automatic deviation alerts, and produces GDP-compliant documentation. We're used by pharmaceutical, biotech, and fresh food companies across 40 countries."
  },
  {
    q: "What does onboarding look like for an enterprise deployment?",
    a: "Enterprise onboarding follows a structured 6-week program: weeks 1–2 cover data integration and master data setup; weeks 3–4 cover workflow configuration and user training; weeks 5–6 are parallel-run with full go-live support. You'll have a dedicated implementation manager and a technical solutions architect throughout."
  },
  {
    q: "How is ChainOS priced for large, multi-entity organizations?",
    a: "Enterprise pricing is based on transaction volume, number of supply chain nodes, and enabled modules. We typically work with procurement and finance teams to design a commercial structure that aligns cost with delivered value, including multi-year options with predictable scaling."
  },
  {
    q: "Does ChainOS provide carbon and ESG supply chain reporting?",
    a: "Yes. Our Sustainability module tracks Scope 3 emissions at the shipment and supplier level, generates CSRD-compliant reports, tracks supplier ESG certifications, and benchmarks your footprint against industry peers. The module includes a supplier sustainability scoring tool for category managers."
  }
]

export default function ChainOSLogisticsPage() {
  const [demoOpen, setDemoOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const heroY = useTransform(scrollYProgress, [0, 0.4], ["0%", "20%"])
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 50, damping: 25 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 25 })

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 40)
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 40)
    }
    window.addEventListener("mousemove", handler)
    return () => window.removeEventListener("mousemove", handler)
  }, [mouseX, mouseY])

  return (
    <div ref={containerRef} style={{ overflowX: "hidden", scrollBehavior: "smooth" }} className="min-h-screen bg-white text-slate-900 font-sans">

      {/* ── NAVBAR ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center">
              <Boxes className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-black text-slate-900 tracking-tight">ChainOS</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {["Platform", "Industries", "Integrations", "Pricing", "Customers"].map(item => (
              <Link key={item} href="#" className="text-sm font-semibold text-slate-600 hover:text-sky-600 transition-all duration-200 cursor-pointer">
                {item}
              </Link>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <Link href="#" className="text-sm font-semibold text-slate-700 hover:text-sky-600 transition-all duration-200 cursor-pointer px-4 py-2">
              Sign in
            </Link>
            <button
              onClick={() => setDemoOpen(true)}
              className="cursor-pointer px-5 py-2.5 bg-sky-600 text-white text-sm font-bold rounded-lg hover:bg-sky-700 transition-all duration-200 shadow-lg shadow-sky-500/25"
            >
              Request Demo
            </button>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <button className="md:hidden cursor-pointer p-2 rounded-lg hover:bg-slate-100 transition-all duration-200">
                <Menu className="w-5 h-5 text-slate-700" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-white w-72">
              <div className="flex flex-col gap-6 mt-10">
                {["Platform", "Industries", "Integrations", "Pricing", "Customers"].map(item => (
                  <Link key={item} href="#" className="text-lg font-bold text-slate-800 hover:text-sky-600 cursor-pointer transition-all duration-200">{item}</Link>
                ))}
                <Separator />
                <button className="cursor-pointer w-full py-3 bg-sky-600 text-white font-bold rounded-lg hover:bg-sky-700 transition-all duration-200">
                  Request Demo
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative pt-16 overflow-hidden bg-gradient-to-br from-slate-950 via-sky-950 to-slate-900 min-h-screen flex items-center">
        <motion.div style={{ x: springX, y: springY }} className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/5 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/8 rounded-full blur-3xl" />
        </motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.04)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div style={{ y: heroY }} className="space-y-8">
            <Reveal delay={0.05}>
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 hover:bg-sky-500/20">
                  <Globe className="w-3 h-3 mr-1" /> Global Supply Chain Intelligence
                </Badge>
                <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20">
                  ISO 27001 Certified
                </Badge>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-5xl md:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight text-white">
                Total visibility{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">
                  across every node
                </span>{" "}
                of your supply chain.
              </h1>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="text-xl text-slate-300 leading-relaxed max-w-lg">
                ChainOS is the command center for modern supply chains. Predict disruptions before they hit, optimize freight in real time, and achieve the end-to-end visibility your operations have always needed.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setDemoOpen(true)}
                  className="cursor-pointer flex items-center gap-2 px-7 py-4 bg-sky-500 text-white font-bold rounded-xl hover:bg-sky-400 transition-all duration-200 shadow-2xl shadow-sky-500/30 text-lg"
                >
                  See a live demo <ArrowRight className="w-5 h-5" />
                </button>
                <button className="cursor-pointer flex items-center gap-2 px-7 py-4 border border-white/20 text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-200 text-lg">
                  Explore the platform
                </button>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                {[
                  { icon: <Truck className="w-4 h-4" />, text: "Real-time tracking" },
                  { icon: <AlertTriangle className="w-4 h-4" />, text: "Risk intelligence" },
                  { icon: <RefreshCw className="w-4 h-4" />, text: "180+ integrations" },
                  { icon: <Shield className="w-4 h-4" />, text: "SOC 2 + ISO 27001" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sky-300 text-xs font-semibold">
                    {item.icon} {item.text}
                  </div>
                ))}
              </div>
            </Reveal>
          </motion.div>
          <Reveal delay={0.15}>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-sky-500/20">
                <Image
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80"
                  alt="ChainOS logistics control tower"
                  width={800}
                  height={560}
                  className="w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              </div>
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-5 -left-5 bg-slate-900 border border-sky-500/30 rounded-xl p-4 shadow-2xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                    <TrendingDown className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Freight savings this month</p>
                    <p className="text-sm font-black text-white">$184,200 <span className="text-emerald-400 text-xs">↓23%</span></p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                animate={{ y: [0, 7, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
                className="absolute -top-5 -right-5 bg-slate-900 border border-amber-500/30 rounded-xl p-4 shadow-2xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Disruption alert</p>
                    <p className="text-sm font-black text-white">Port delay — <span className="text-amber-400">11 days out</span></p>
                  </div>
                </div>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-sky-700 py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {[
              { value: 2100, suffix: "+", label: "Global customers" },
              { value: 23, suffix: "%", label: "Avg. freight savings" },
              { value: 94, suffix: "%", label: "Forecast accuracy" },
              { value: 180, suffix: "+", label: "System integrations" },
              { value: 12, suffix: "K", label: "Disruption signals monitored" },
              { value: 99, suffix: ".97%", label: "Platform uptime" },
            ].map((stat, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-black text-white mb-1">
                    <Counter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-sm text-sky-200 font-medium">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES TABS ── */}
      <section className="py-28 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-sky-100 text-sky-700 border-sky-200 hover:bg-sky-100">Platform Capabilities</Badge>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 leading-tight">
                From raw materials to last-mile delivery
              </h2>
              <p className="text-xl text-slate-500 max-w-2xl mx-auto">
                ChainOS gives operations teams a single pane of glass across every supplier, carrier, warehouse, and distribution center.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Tabs defaultValue="visibility" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-12 h-auto gap-2 bg-white border border-slate-200 p-2 rounded-xl">
                {[
                  { value: "visibility", label: "Control Tower", icon: <Globe className="w-4 h-4" /> },
                  { value: "risk", label: "Risk & Alerts", icon: <AlertTriangle className="w-4 h-4" /> },
                  { value: "freight", label: "Freight Optimization", icon: <Truck className="w-4 h-4" /> },
                  { value: "inventory", label: "Inventory AI", icon: <Package className="w-4 h-4" /> },
                ].map(tab => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="cursor-pointer flex items-center gap-2 py-3 px-4 rounded-lg data-[state=active]:bg-sky-600 data-[state=active]:text-white font-semibold transition-all duration-200"
                  >
                    {tab.icon} <span className="hidden sm:inline">{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="visibility">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <h3 className="text-3xl font-black text-slate-900">A living map of your entire supply network</h3>
                    <p className="text-lg text-slate-600 leading-relaxed">
                      ChainOS's Control Tower ingests data from every touchpoint — EDI feeds, IoT sensors, carrier APIs, and ERP systems — to give you a real-time, interactive map of every shipment, inventory position, and supplier status across your entire network.
                    </p>
                    <ul className="space-y-4">
                      {[
                        "Interactive N-tier supplier network visualization",
                        "Live shipment tracking across 400+ carriers",
                        "Automated milestone-based exception alerts",
                        "Delivery performance scorecards per carrier",
                        "Purchase order lifecycle tracking with ETA accuracy",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700 font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <Image src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=800&q=80" alt="Control tower" width={700} height={480} className="w-full object-cover" />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="risk">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <h3 className="text-3xl font-black text-slate-900">Know about disruptions 7–21 days before they hit</h3>
                    <p className="text-lg text-slate-600 leading-relaxed">
                      Our risk intelligence engine monitors 12,000+ external signals and maps them against your supply network nodes to produce probabilistic risk scores, recommended mitigation actions, and supplier-level financial health dashboards.
                    </p>
                    <div className="space-y-3">
                      {[
                        { risk: "Port congestion — Shanghai", severity: "High", days: 14, color: "bg-red-500" },
                        { risk: "Supplier financial stress — Tier 2", severity: "Medium", days: 21, color: "bg-amber-500" },
                        { risk: "Weather delay — Gulf routes", severity: "Low", days: 7, color: "bg-sky-500" },
                      ].map((alert, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-200 hover:border-sky-300 transition-all duration-200 cursor-pointer">
                          <div className={`w-3 h-3 rounded-full flex-shrink-0 ${alert.color}`} />
                          <div className="flex-1">
                            <p className="font-bold text-slate-900 text-sm">{alert.risk}</p>
                            <p className="text-xs text-slate-500">Predicted impact in {alert.days} days</p>
                          </div>
                          <Badge className={`text-xs ${alert.severity === "High" ? "bg-red-50 text-red-700 border-red-200" : alert.severity === "Medium" ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-sky-50 text-sky-700 border-sky-200"} hover:bg-current`}>
                            {alert.severity}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <Image src="https://images.unsplash.com/photo-1569098644584-210bcd375b59?w=800&q=80" alt="Risk monitoring" width={700} height={480} className="w-full object-cover" />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="freight">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <h3 className="text-3xl font-black text-slate-900">Cut freight costs without cutting corners</h3>
                    <p className="text-lg text-slate-600 leading-relaxed">
                      The ChainOS route optimization engine evaluates thousands of carrier, mode, and routing combinations in seconds — factoring in cost, transit time, carbon footprint, and risk — to surface the objectively best option for every shipment.
                    </p>
                    <ul className="space-y-4">
                      {[
                        "Multi-modal optimization (road, rail, sea, air)",
                        "Dynamic carrier rate benchmarking",
                        "Carbon footprint tracking per lane",
                        "Spot vs. contract rate recommendations",
                        "Automated freight audit and payment processing",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700 font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <Image src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80" alt="Freight optimization" width={700} height={480} className="w-full object-cover" />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="inventory">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <h3 className="text-3xl font-black text-slate-900">Right stock, right place, right time</h3>
                    <p className="text-lg text-slate-600 leading-relaxed">
                      ChainOS's inventory AI continuously optimizes safety stock levels, replenishment triggers, and distribution network assignments — using demand signals, lead time variability, and cost parameters to minimize both stockouts and excess.
                    </p>
                    <div className="space-y-4">
                      {[
                        { label: "Inventory accuracy rate", value: 98 },
                        { label: "Fill rate vs. target", value: 96 },
                        { label: "Excess inventory reduction", value: 84 },
                      ].map((m, i) => (
                        <div key={i} className="space-y-1.5">
                          <div className="flex justify-between text-sm font-semibold text-slate-700">
                            <span>{m.label}</span><span>{m.value}%</span>
                          </div>
                          <Progress value={m.value} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <Image src="https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80" alt="Inventory management" width={700} height={480} className="w-full object-cover" />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Reveal>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-50">Customer Results</Badge>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Trusted by global operations teams</h2>
              <p className="text-xl text-slate-500">From consumer goods to pharmaceutical, supply chains of every kind run on ChainOS.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Carousel className="w-full">
              <CarouselContent>
                {TESTIMONIALS.map((t, i) => (
                  <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3 pl-6">
                    <Card className="cursor-pointer h-full hover:shadow-xl hover:border-sky-200 transition-all duration-300 border-slate-200">
                      <CardContent className="p-7 flex flex-col h-full">
                        <div className="flex gap-1 mb-4">
                          {[...Array(t.rating)].map((_, j) => (
                            <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <p className="text-slate-700 leading-relaxed mb-6 flex-1 text-[15px] italic">"{t.quote}"</p>
                        <Badge className="mb-5 bg-sky-50 text-sky-700 border-sky-100 self-start hover:bg-sky-50 text-xs font-bold">
                          {t.metric}
                        </Badge>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-11 h-11">
                            <AvatarImage src={t.avatarImg} alt={t.name} />
                            <AvatarFallback className="bg-sky-100 text-sky-700 font-bold text-sm">{t.avatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-black text-slate-900 text-sm">{t.name}</p>
                            <p className="text-xs text-slate-500">{t.role} · {t.company}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="cursor-pointer -left-4 bg-white border-slate-200 hover:bg-sky-50 hover:border-sky-300 transition-all duration-200" />
              <CarouselNext className="cursor-pointer -right-4 bg-white border-slate-200 hover:bg-sky-50 hover:border-sky-300 transition-all duration-200" />
            </Carousel>
          </Reveal>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="py-28 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-sky-100 text-sky-700 border-sky-200 hover:bg-sky-100">Pricing</Badge>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Simple pricing for complex operations</h2>
              <p className="text-xl text-slate-500 max-w-xl mx-auto">All plans include onboarding support, data migration, and unlimited carrier connections.</p>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {PRICING.map((plan, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <Card className={`cursor-pointer relative h-full flex flex-col transition-all duration-300 hover:shadow-2xl ${plan.highlight ? "border-2 border-sky-500 shadow-xl shadow-sky-500/15 scale-[1.02]" : "border-slate-200 hover:border-sky-300"}`}>
                  {plan.badge && (
                    <div className="absolute -top-4 left-0 right-0 flex justify-center">
                      <Badge className="bg-sky-600 text-white border-sky-600 px-4 py-1 text-sm font-bold hover:bg-sky-600">{plan.badge}</Badge>
                    </div>
                  )}
                  <CardContent className="p-8 flex flex-col flex-1">
                    <h3 className="text-xl font-black text-slate-900 mb-1">{plan.name}</h3>
                    <p className="text-sm text-slate-500 mb-5">{plan.description}</p>
                    <div className="mb-6">
                      <span className="text-5xl font-black text-slate-900">{plan.price}</span>
                      <span className="text-slate-500 text-base">{plan.period}</span>
                    </div>
                    <Separator className="mb-6" />
                    <ul className="space-y-3 flex-1 mb-8">
                      {plan.features.map((f, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.highlight ? "text-sky-600" : "text-slate-400"}`} />
                          <span className="text-sm text-slate-700">{f}</span>
                        </li>
                      ))}
                    </ul>
                    <button className={`cursor-pointer w-full py-3.5 font-bold rounded-xl transition-all duration-200 text-sm ${plan.highlight ? "bg-sky-600 text-white hover:bg-sky-700 shadow-lg shadow-sky-500/25" : "border-2 border-slate-300 text-slate-800 hover:border-sky-400 hover:text-sky-700"}`}>
                      {plan.cta}
                    </button>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-28 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <Badge className="mb-4 bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-100">FAQ</Badge>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900">Common questions about ChainOS</h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Accordion type="single" collapsible className="space-y-3">
              {FAQS.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border border-slate-200 rounded-xl px-6 hover:border-sky-300 transition-all duration-200">
                  <AccordionTrigger className="cursor-pointer font-bold text-slate-900 hover:text-sky-700 py-5 text-left transition-all duration-200 hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 leading-relaxed pb-5 text-[15px]">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-28 px-6 bg-gradient-to-br from-sky-700 via-sky-800 to-slate-900">
        <div className="max-w-5xl mx-auto text-center">
          <Reveal>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              See your supply chain in a new light.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-xl text-sky-200 mb-10 max-w-2xl mx-auto leading-relaxed">
              Get a personalized demo built around your industry, your systems, and your specific operational challenges. No canned slides — just answers.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => setDemoOpen(true)}
                className="cursor-pointer flex items-center gap-2 px-8 py-4 bg-white text-sky-700 font-black rounded-xl hover:bg-sky-50 transition-all duration-200 shadow-2xl text-lg"
              >
                Request a personalized demo <ArrowRight className="w-5 h-5" />
              </button>
              <button className="cursor-pointer flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-200 text-lg">
                <Building2 className="w-5 h-5" /> Talk to Enterprise Sales
              </button>
            </div>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="flex flex-wrap items-center justify-center gap-8 mt-12 text-sky-200">
              {["No credit card required", "30-minute live session", "Industry-specific scenarios", "Full team access during trial"].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-sky-300" /> {item}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-slate-950 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-14">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center">
                  <Boxes className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-black">ChainOS</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                The supply chain intelligence platform for companies that can't afford surprises.
              </p>
              <div className="flex items-center gap-3 mt-5">
                {[Globe, Globe, Globe].map((Icon, i) => (
                  <Link key={i} href="#" className="cursor-pointer w-9 h-9 rounded-lg bg-slate-800 hover:bg-sky-600 flex items-center justify-center transition-all duration-200">
                    <Icon className="w-4 h-4 text-slate-300" />
                  </Link>
                ))}
              </div>
            </div>
            {[
              { heading: "Platform", links: ["Control Tower", "Risk Intelligence", "Freight Optimizer", "Inventory AI", "Sustainability", "API & Integrations"] },
              { heading: "Industries", links: ["Manufacturing", "Retail & CPG", "Pharmaceutical", "Food & Beverage", "Automotive", "High-Tech"] },
              { heading: "Company", links: ["About", "Careers", "Blog", "Press", "Contact", "Security"] },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="font-black text-sm text-slate-300 uppercase tracking-wider mb-4">{col.heading}</h4>
                <ul className="space-y-2.5">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <Link href="#" className="cursor-pointer text-sm text-slate-500 hover:text-sky-400 transition-all duration-200">{link}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Separator className="bg-slate-800 mb-8" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">© 2026 ChainOS Inc. All rights reserved.</p>
            <div className="flex items-center gap-6">
              {["Privacy Policy", "Terms of Service", "Security", "GDPR"].map((item, i) => (
                <Link key={i} href="#" className="cursor-pointer text-xs text-slate-500 hover:text-sky-400 transition-all duration-200">{item}</Link>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ── DEMO DIALOG ── */}
      <Dialog open={demoOpen} onOpenChange={setDemoOpen}>
        <DialogContent className="bg-white max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-slate-900">Request a personalized demo</DialogTitle>
          </DialogHeader>
          <p className="text-slate-500 text-sm mb-4">Tell us about your supply chain and we'll prepare a demo tailored to your industry and specific challenges.</p>
          <div className="space-y-3">
            <input type="text" placeholder="Your full name" className="cursor-text w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500 transition-all duration-200" />
            <input type="email" placeholder="Work email" className="cursor-text w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500 transition-all duration-200" />
            <input type="text" placeholder="Company name" className="cursor-text w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500 transition-all duration-200" />
            <select className="cursor-pointer w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-sky-500 bg-white transition-all duration-200 text-slate-600">
              <option>Your industry</option>
              <option>Manufacturing</option>
              <option>Retail / CPG</option>
              <option>Pharmaceutical</option>
              <option>Food & Beverage</option>
              <option>Logistics / 3PL</option>
            </select>
            <button className="cursor-pointer w-full py-3.5 bg-sky-600 text-white font-bold rounded-xl hover:bg-sky-700 transition-all duration-200 shadow-lg shadow-sky-500/25 text-sm">
              Schedule My Demo
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
