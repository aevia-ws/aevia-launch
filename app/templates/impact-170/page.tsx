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
import { Menu, HardHat, ClipboardList, MapPin, Users, BarChart3, Wrench, CheckCircle2, ArrowRight, ChevronRight, Zap, Star, Shield, Clock, Globe, FileText, AlertTriangle, TrendingUp, Smartphone } from "lucide-react"

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

function Counter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    const step = target / 80
    const t = setInterval(() => {
      setCount(c => {
        const n = c + step
        if (n >= target) { clearInterval(t); return target }
        return n
      })
    }, 16)
    return () => clearInterval(t)
  }, [inView, target])
  return <span ref={ref}>{prefix}{Math.floor(count).toLocaleString()}{suffix}</span>
}

const STATS = [
  { value: 6200, suffix: "+", label: "Construction Firms" },
  { value: 41, suffix: "%", label: "Reduction in Project Delays" },
  { value: 2800, suffix: "+", label: "Active Worksites Managed" },
  { value: 18, suffix: "M", label: "Work Orders Completed" },
]

const FEATURES = {
  "Project Scheduling": {
    icon: <ClipboardList className="w-5 h-5" />,
    headline: "Gantt-Powered Project Scheduling",
    description: "Build complex multi-phase construction schedules with drag-and-drop Gantt charts, automatic critical path analysis, and real-time resource leveling. Sync schedules to every foreman's phone so the whole crew is always aligned.",
    items: [
      "Drag-and-drop Gantt with milestone dependencies",
      "Critical path method (CPM) auto-calculation",
      "Resource leveling to prevent crew over-allocation",
      "Phase and trade-based schedule breakdown",
      "Baseline tracking with variance analysis",
      "Two-week lookahead reports auto-emailed to PMs",
    ],
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
  },
  "Field Operations": {
    icon: <HardHat className="w-5 h-5" />,
    headline: "Real-Time Field Management",
    description: "Equip your foremen and crew with a mobile-first field app that works offline on job sites with no internet. Daily logs, safety inspections, punch lists, and RFI submissions — all captured in the field and synced instantly.",
    items: [
      "Offline-first mobile app for iOS and Android",
      "Daily construction reports with photo attachments",
      "Digital safety inspection checklists (OSHA-aligned)",
      "Punch list management with photo markup tools",
      "GPS-verified clock-in/out for field workers",
      "RFI and submittal workflow with auto-routing",
    ],
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80",
  },
  "Cost Management": {
    icon: <BarChart3 className="w-5 h-5" />,
    headline: "Job Cost Tracking & Budget Control",
    description: "Track every dollar from estimate to closeout. Monitor committed costs, actual expenses, and earned value in real time. Get instant alerts when job costs deviate from budget and forecast final costs before they become overruns.",
    items: [
      "Budget vs. actual tracking by cost code and phase",
      "Committed cost forecasting with EAC calculation",
      "Change order management with approval workflows",
      "Subcontractor invoice review and approval",
      "Labor cost reports from field time tracking",
      "QuickBooks, Sage, and Viewpoint integrations",
    ],
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
  },
  "Safety & Compliance": {
    icon: <Shield className="w-5 h-5" />,
    headline: "Safety Management & OSHA Compliance",
    description: "Make safety systematic. Build custom inspection templates, track near-misses, manage incident reports, and ensure every worker is trained and certified before they set foot on site. Maintain complete audit trails for any regulatory review.",
    items: [
      "Custom safety inspection templates by trade",
      "Incident and near-miss reporting with root cause analysis",
      "Worker certification and training record tracking",
      "Toolbox talk library with sign-off documentation",
      "Safety score dashboard with trend analysis",
      "OSHA 300 log auto-generation",
    ],
    image: "https://images.unsplash.com/photo-1583953765267-c6db2d7c9a94?w=800&q=80",
  },
}

const TESTIMONIALS = [
  {
    quote: "Fieldflow replaced four different tools we used for scheduling, cost tracking, RFIs, and safety. We cut project admin time by 60% and our project managers actually like their jobs now. ROI was realized in the first 90 days.",
    name: "Derek Harmon",
    role: "VP of Construction",
    company: "Harmon General Contracting",
    avatar: "DH",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
  },
  {
    quote: "Our OSHA recordable incident rate dropped 58% in 12 months after implementing Fieldflow's safety module. The inspection checklists and near-miss reporting system changed how our crews think about safety on site.",
    name: "Sandra Nguyen",
    role: "Safety Director",
    company: "Apex Infrastructure Partners",
    avatar: "SN",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
  },
  {
    quote: "We manage 23 active projects simultaneously. The executive dashboard gives me a real-time health score for every project — budget, schedule, safety, and quality. I can spot a problem on Tuesday morning before it becomes a crisis by Friday.",
    name: "James Okello",
    role: "COO",
    company: "Milestone Construction Group",
    avatar: "JO",
    rating: 5,
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80",
  },
  {
    quote: "The offline field app is a game-changer. Our sites have terrible LTE coverage but the foremen can still complete daily logs, safety inspections, and punch lists. Everything syncs perfectly when connectivity returns.",
    name: "Mike Delgado",
    role: "Senior Project Manager",
    company: "SunBelt Builders LLC",
    avatar: "MD",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  },
  {
    quote: "Budget forecasting finally works for us. We used to discover overruns at month-end. Now we get early warning alerts the moment a cost code starts trending over budget. We've saved over $2.1M in avoided overruns this year alone.",
    name: "Patricia Wolfe",
    role: "Controller",
    company: "Wolfe & Associates Builders",
    avatar: "PW",
    rating: 5,
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80",
  },
]

const PRICING = [
  {
    name: "Essential",
    price: "$299",
    period: "per month",
    description: "For small contractors managing 1–5 projects with a lean team.",
    features: [
      "Up to 5 active projects",
      "Project scheduling (Gantt)",
      "Daily field logs and photo uploads",
      "Basic safety inspection checklists",
      "Mobile app (iOS & Android)",
      "Email support",
    ],
    cta: "Start Free Trial",
    highlighted: false,
    badge: null,
  },
  {
    name: "Professional",
    price: "$799",
    period: "per month",
    description: "For mid-size GCs running multiple projects with multiple crews.",
    features: [
      "Up to 25 active projects",
      "Full cost management with job costing",
      "Change order and RFI workflows",
      "Advanced safety module (OSHA logs, incidents)",
      "Subcontractor portal access",
      "GPS time tracking for field workers",
      "QuickBooks and Sage integration",
      "Priority support + dedicated onboarding",
    ],
    cta: "Start Free Trial",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "tailored pricing",
    description: "For large construction firms managing portfolios of 25+ concurrent projects.",
    features: [
      "Unlimited projects and users",
      "Custom analytics and BI dashboards",
      "ERP integration (Viewpoint, Procore export)",
      "Owner/client portal with live project reporting",
      "Advanced resource management across portfolio",
      "Dedicated customer success engineer",
      "SLA-backed uptime guarantee",
      "On-site implementation support available",
    ],
    cta: "Contact Sales",
    highlighted: false,
    badge: null,
  },
]

const FAQS = [
  {
    q: "Does Fieldflow work on job sites without internet connectivity?",
    a: "Yes — it's a core design principle. The iOS and Android apps use local-first architecture. Foremen can complete daily logs, safety inspections, photo uploads, and punch lists with no signal. Data syncs automatically when connectivity returns. We've tested this in tunnels, basements, and remote rural sites.",
  },
  {
    q: "How does Fieldflow integrate with QuickBooks and Sage?",
    a: "Our QuickBooks and Sage integrations sync in both directions. Cost codes, vendor bills, subcontractor invoices, and labor entries flow into your accounting system automatically. Change orders approved in Fieldflow push to your GL with no double entry. Setup takes about 2 hours with our integration wizard.",
  },
  {
    q: "Can subcontractors access Fieldflow without a paid seat?",
    a: "Yes. Subcontractors get free limited access through our Subcontractor Portal. They can review and respond to RFIs, submit compliance documents, upload daily reports, and sign off on punch list items — without requiring a full license. You control exactly what each sub can see.",
  },
  {
    q: "How long does implementation typically take?",
    a: "Most firms are fully operational within 2–4 weeks. Week 1 covers account setup, project import, and admin training. Week 2 is field crew onboarding and mobile app training. Weeks 3–4 are live operations with our support team monitoring closely. Enterprise deployments may take 6–8 weeks for custom integrations.",
  },
  {
    q: "How does the safety module help with OSHA compliance?",
    a: "The safety module auto-generates OSHA 300 logs from incident reports, tracks recordable vs. non-recordable events, and stores all documentation with tamper-evident timestamps. During an OSHA inspection, you can pull a complete audit trail in seconds. Several clients have credited Fieldflow with passing inspections with zero citations.",
  },
  {
    q: "Can project owners and clients get live project visibility?",
    a: "Yes, the Owner Portal (Enterprise plan) gives project owners a real-time dashboard showing schedule progress, budget consumption, safety metrics, and photo documentation. Owners get the transparency they expect without direct access to your internal tools.",
  },
  {
    q: "What happens to our data if we cancel?",
    a: "Your data belongs to you. Upon cancellation, we provide a complete export of all project data in standard formats (CSV, PDF, DXF for drawings). We maintain your data in read-only format for 90 days post-cancellation so you have time to migrate at your own pace.",
  },
]

export default function FieldflowConstruction() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [demoOpen, setDemoOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const heroY = useTransform(scrollYProgress, [0, 0.4], [0, -50])

  return (
    <div
      ref={containerRef}
      style={{ overflowX: "hidden", scrollBehavior: "smooth" }}
      className="min-h-screen bg-white text-slate-900"
    >
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-yellow-500 origin-left z-[60]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="#" className="flex items-center gap-2 cursor-pointer group">
            <div className="w-9 h-9 bg-yellow-500 rounded-xl flex items-center justify-center group-hover:bg-yellow-600 transition-all duration-200">
              <HardHat className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black text-slate-900">Fieldflow</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {["Platform", "Pricing", "Integrations", "Customers", "Resources"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-sm font-semibold text-slate-600 hover:text-yellow-600 cursor-pointer transition-all duration-200"
              >
                {item}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="#" className="hidden md:inline-flex text-sm font-semibold text-slate-600 hover:text-yellow-600 cursor-pointer transition-all duration-200 px-4 py-2">
              Sign In
            </Link>
            <button
              onClick={() => setDemoOpen(true)}
              className="cursor-pointer hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-yellow-500 text-slate-900 text-sm font-black rounded-xl hover:bg-yellow-600 transition-all duration-200 shadow-lg shadow-yellow-200"
            >
              Get Demo
              <ArrowRight className="w-4 h-4" />
            </button>
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button className="md:hidden cursor-pointer p-2 rounded-lg hover:bg-slate-100 transition-all duration-200">
                  <Menu className="w-5 h-5 text-slate-700" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-white w-80">
                <div className="flex flex-col gap-6 mt-10">
                  {["Platform", "Pricing", "Integrations", "Customers"].map((item) => (
                    <Link key={item} href="#" className="text-lg font-bold text-slate-800 hover:text-yellow-600 cursor-pointer transition-all duration-200">
                      {item}
                    </Link>
                  ))}
                  <Separator />
                  <button className="cursor-pointer w-full py-3 bg-yellow-500 text-slate-900 font-black rounded-xl hover:bg-yellow-600 transition-all duration-200">
                    Get Demo
                  </button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-28 pb-24 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
            alt="Construction site"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-slate-900/90" />
        </div>
        <div className="absolute top-20 right-20 w-96 h-96 bg-yellow-500 rounded-full blur-3xl opacity-10" />

        <motion.div style={{ y: heroY }} className="relative max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[70vh]">
            <div className="py-16">
              <Reveal delay={0.05}>
                <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 mb-6 px-4 py-1.5 text-sm font-semibold cursor-pointer hover:bg-yellow-500/30 transition-all duration-200">
                  <HardHat className="w-3.5 h-3.5 mr-1.5" />
                  Construction & Field Management Platform
                </Badge>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-6 tracking-tight">
                  Build Smarter.<br />
                  <span className="text-yellow-400">Deliver on Time.</span><br />
                  Stay Under Budget.
                </h1>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-xl text-slate-400 mb-8 leading-relaxed font-medium">
                  Fieldflow connects your office and field teams in real time. Project scheduling, job costing, field logs, safety compliance, and subcontractor management — built for construction the way you actually work.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="flex flex-col sm:flex-row gap-4 mb-10">
                  <button
                    onClick={() => setDemoOpen(true)}
                    className="cursor-pointer inline-flex items-center justify-center gap-2 px-8 py-4 bg-yellow-500 text-slate-900 font-black rounded-2xl hover:bg-yellow-400 transition-all duration-200 shadow-xl shadow-yellow-900/30 text-base"
                  >
                    Book Live Demo
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <button className="cursor-pointer inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/20 text-white font-bold rounded-2xl hover:border-yellow-400 hover:text-yellow-400 transition-all duration-200 text-base">
                    Watch Product Tour
                  </button>
                </div>
              </Reveal>
              <Reveal delay={0.4}>
                <div className="flex flex-wrap gap-6">
                  {[
                    { icon: <CheckCircle2 className="w-4 h-4 text-green-400" />, text: "Works offline on any job site" },
                    { icon: <CheckCircle2 className="w-4 h-4 text-green-400" />, text: "30-day free trial" },
                    { icon: <Shield className="w-4 h-4 text-blue-400" />, text: "SOC 2 Type II" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm font-semibold text-slate-400 cursor-pointer">
                      {item.icon}
                      {item.text}
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.2}>
              <div className="hidden lg:block">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Active Projects", value: "23", change: "+3 this week", color: "yellow" },
                    { label: "Budget Health", value: "96%", change: "On target", color: "green" },
                    { label: "Safety Score", value: "98.4", change: "Industry avg: 87", color: "blue" },
                    { label: "Open RFIs", value: "14", change: "6 due today", color: "red" },
                  ].map((card, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                      className="cursor-pointer bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-yellow-500/30 transition-all duration-300"
                    >
                      <p className="text-slate-400 text-xs font-semibold mb-2 uppercase tracking-wider">{card.label}</p>
                      <p className="text-3xl font-black text-white mb-1">{card.value}</p>
                      <p className={`text-xs font-medium ${
                        card.color === "green" ? "text-green-400" :
                        card.color === "red" ? "text-red-400" :
                        card.color === "yellow" ? "text-yellow-400" : "text-blue-400"
                      }`}>{card.change}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-yellow-500">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-black text-slate-900 mb-2">
                    <Counter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-slate-800 font-semibold text-sm">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <Badge className="bg-yellow-50 text-yellow-700 border-yellow-100 mb-4 cursor-pointer">Platform Modules</Badge>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 leading-tight">
                One platform for the entire project lifecycle
              </h2>
              <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">
                From bid to closeout — scheduling, field ops, cost control, and safety compliance in one connected system.
              </p>
            </div>
          </Reveal>

          <Tabs defaultValue="Project Scheduling" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-slate-100 p-1 rounded-2xl gap-1 mb-12">
              {Object.entries(FEATURES).map(([key, val]) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="cursor-pointer rounded-xl font-semibold text-sm data-[state=active]:bg-white data-[state=active]:text-yellow-700 data-[state=active]:shadow-sm transition-all duration-200 flex items-center gap-2"
                >
                  {val.icon}
                  <span className="hidden sm:inline">{key}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(FEATURES).map(([key, feat]) => (
              <TabsContent key={key} value={key}>
                <Reveal>
                  <Card className="border-slate-200 overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                      <div className="relative h-72 lg:h-auto min-h-[360px]">
                        <Image src={feat.image} alt={feat.headline} fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-900/5" />
                      </div>
                      <CardContent className="p-10 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center text-yellow-700">
                            {feat.icon}
                          </div>
                          <Badge className="bg-yellow-50 text-yellow-700 border-yellow-100">{key}</Badge>
                        </div>
                        <h3 className="text-3xl font-black text-slate-900 mb-4 leading-tight">{feat.headline}</h3>
                        <p className="text-slate-600 text-base leading-relaxed mb-8">{feat.description}</p>
                        <ul className="space-y-3">
                          {feat.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                              <CheckCircle2 className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                              {item}
                            </li>
                          ))}
                        </ul>
                        <button className="cursor-pointer mt-8 inline-flex items-center gap-2 text-yellow-600 font-bold hover:text-yellow-800 transition-all duration-200">
                          Explore module <ChevronRight className="w-4 h-4" />
                        </button>
                      </CardContent>
                    </div>
                  </Card>
                </Reveal>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Why Fieldflow */}
      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <Badge className="bg-slate-200 text-slate-700 border-slate-300 mb-4 cursor-pointer">Why Fieldflow</Badge>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
                Built for the way construction actually works
              </h2>
              <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">
                Not a generic project management tool retrofitted for construction — purpose-built for the trade from day one.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Smartphone className="w-7 h-7 text-yellow-600" />,
                title: "Offline-First Mobile",
                desc: "Full functionality with zero signal. Built for tunnels, basements, and rural sites where other tools fail.",
              },
              {
                icon: <AlertTriangle className="w-7 h-7 text-yellow-600" />,
                title: "Early Warning Alerts",
                desc: "Get notified before a schedule slip or budget overrun becomes a crisis. Proactive intelligence, not reactive reports.",
              },
              {
                icon: <FileText className="w-7 h-7 text-yellow-600" />,
                title: "Contract-Grade Docs",
                desc: "RFIs, submittals, change orders, and punch lists that hold up in arbitration — with complete audit trails.",
              },
              {
                icon: <Users className="w-7 h-7 text-yellow-600" />,
                title: "Sub & Owner Portals",
                desc: "Give subcontractors and owners the visibility they need without granting access to your internal data.",
              },
            ].map((card, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <Card className="cursor-pointer border-slate-200 hover:border-yellow-400 hover:shadow-lg transition-all duration-300 bg-white h-full">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 bg-yellow-50 rounded-2xl flex items-center justify-center mb-6">
                      {card.icon}
                    </div>
                    <h3 className="text-lg font-black text-slate-900 mb-3">{card.title}</h3>
                    <p className="text-slate-600 font-medium leading-relaxed text-sm">{card.desc}</p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <Badge className="bg-amber-50 text-amber-700 border-amber-100 mb-4 cursor-pointer">
                <Star className="w-3.5 h-3.5 mr-1.5 fill-amber-500 text-amber-500" />
                4.8 / 5 from 1,900+ construction firms
              </Badge>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
                Results from the field
              </h2>
              <p className="text-xl text-slate-500 max-w-xl mx-auto font-medium">
                Contractors, project managers, and safety directors share their Fieldflow experience.
              </p>
            </div>
          </Reveal>

          <Carousel className="w-full">
            <CarouselContent className="-ml-4">
              {TESTIMONIALS.map((t, i) => (
                <CarouselItem key={i} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <Reveal delay={i * 0.08}>
                    <Card className="cursor-pointer h-full border-slate-200 hover:border-yellow-400 hover:shadow-lg transition-all duration-300 bg-white">
                      <CardContent className="p-8 flex flex-col h-full">
                        <div className="flex gap-1 mb-5">
                          {Array.from({ length: t.rating }).map((_, s) => (
                            <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <p className="text-slate-700 text-sm leading-relaxed mb-6 flex-1 font-medium italic">
                          &ldquo;{t.quote}&rdquo;
                        </p>
                        <div className="flex items-center gap-4">
                          <Avatar className="w-12 h-12 ring-2 ring-yellow-100">
                            <AvatarImage src={t.image} alt={t.name} />
                            <AvatarFallback className="bg-yellow-100 text-yellow-800 font-bold text-sm">{t.avatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-bold text-slate-900 text-sm">{t.name}</p>
                            <p className="text-xs text-slate-500 font-medium">{t.role}</p>
                            <p className="text-xs text-yellow-700 font-bold">{t.company}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Reveal>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="cursor-pointer bg-white border-slate-200 hover:bg-yellow-50 hover:border-yellow-300 transition-all duration-200" />
            <CarouselNext className="cursor-pointer bg-white border-slate-200 hover:bg-yellow-50 hover:border-yellow-300 transition-all duration-200" />
          </Carousel>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <Badge className="bg-yellow-50 text-yellow-700 border-yellow-100 mb-4 cursor-pointer">Pricing</Badge>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
                Pricing that scales with your projects
              </h2>
              <p className="text-xl text-slate-500 max-w-xl mx-auto font-medium">
                No per-user fees. No per-project fees. Just one predictable monthly price.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {PRICING.map((plan, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <Card
                  className={`cursor-pointer relative transition-all duration-300 ${
                    plan.highlighted
                      ? "border-2 border-yellow-500 shadow-2xl shadow-yellow-100 scale-105"
                      : "border-slate-200 hover:border-yellow-400 hover:shadow-lg"
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="bg-yellow-500 text-slate-900 px-4 py-1.5 text-sm font-black shadow-lg">
                        {plan.badge}
                      </Badge>
                    </div>
                  )}
                  <CardContent className="p-8">
                    <h3 className="text-xl font-black text-slate-900 mb-2">{plan.name}</h3>
                    <p className="text-slate-500 text-sm mb-6 font-medium leading-relaxed">{plan.description}</p>
                    <div className="mb-8">
                      <span className="text-5xl font-black text-slate-900">{plan.price}</span>
                      <span className="text-slate-400 font-medium ml-2 text-sm">/{plan.period}</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((f, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                          <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${plan.highlighted ? "text-yellow-600" : "text-green-500"}`} />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <button
                      className={`cursor-pointer w-full py-3.5 font-bold rounded-xl text-sm transition-all duration-200 ${
                        plan.highlighted
                          ? "bg-yellow-500 text-slate-900 hover:bg-yellow-400 shadow-lg shadow-yellow-200"
                          : "bg-slate-100 text-slate-800 hover:bg-yellow-500 hover:text-slate-900"
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
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <Badge className="bg-slate-100 text-slate-700 border-slate-200 mb-4 cursor-pointer">FAQ</Badge>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
                Questions from construction teams
              </h2>
              <p className="text-xl text-slate-500 font-medium">
                Honest answers to the questions GCs ask us most.
              </p>
            </div>
          </Reveal>

          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border border-slate-200 rounded-2xl px-6 hover:border-yellow-400 transition-all duration-200 cursor-pointer"
              >
                <AccordionTrigger className="cursor-pointer py-5 font-bold text-slate-900 hover:text-yellow-700 hover:no-underline text-left transition-all duration-200">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 pb-5 leading-relaxed font-medium">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
            alt="Construction background"
            fill
            className="object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-slate-900/80" />
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500 rounded-full blur-3xl opacity-10" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              Ready to bring your job sites under control?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-xl text-slate-400 mb-10 font-medium max-w-2xl mx-auto leading-relaxed">
              Join 6,200+ construction firms that use Fieldflow to deliver projects on time and under budget. Start your 30-day free trial today — no credit card required.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setDemoOpen(true)}
                className="cursor-pointer inline-flex items-center gap-2 px-10 py-4 bg-yellow-500 text-slate-900 font-black text-lg rounded-2xl hover:bg-yellow-400 transition-all duration-200 shadow-2xl shadow-yellow-900/30"
              >
                Book a Live Demo
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="cursor-pointer inline-flex items-center gap-2 px-8 py-4 border-2 border-white/20 text-white font-bold rounded-2xl hover:border-yellow-400 hover:text-yellow-400 transition-all duration-200">
                Start Free Trial
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4 cursor-pointer">
                <div className="w-9 h-9 bg-yellow-500 rounded-xl flex items-center justify-center">
                  <HardHat className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-black text-lg">Fieldflow</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">
                Construction management built for the field, not the boardroom.
              </p>
              <div className="flex gap-3">
                {[Globe, Globe, Globe].map((Icon, i) => (
                  <button key={i} className="cursor-pointer w-9 h-9 rounded-lg bg-slate-800 hover:bg-yellow-500 flex items-center justify-center transition-all duration-200">
                    <Icon className="w-4 h-4 text-slate-400" />
                  </button>
                ))}
              </div>
            </div>

            {[
              { title: "Platform", links: ["Project Scheduling", "Field Operations", "Cost Management", "Safety Module", "Subcontractor Portal"] },
              { title: "Integrations", links: ["QuickBooks", "Sage 100", "Procore Export", "Autodesk BIM 360", "Viewpoint"] },
              { title: "Company", links: ["About", "Customers", "Blog", "Careers", "Contact"] },
              { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Security", "GDPR", "Status"] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-white font-bold text-sm mb-5 uppercase tracking-wider">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <Link href="#" className="cursor-pointer text-sm text-slate-500 hover:text-yellow-400 transition-all duration-200 font-medium">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <Separator className="bg-slate-800 mb-8" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-600 text-sm font-medium">
              © 2026 Fieldflow Technologies Inc. All rights reserved.
            </p>
            <p className="text-slate-600 text-sm font-medium">
              Built for builders.
            </p>
          </div>
        </div>
      </footer>

      {/* Demo Dialog */}
      <Dialog open={demoOpen} onOpenChange={setDemoOpen}>
        <DialogContent className="bg-white max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-slate-900">Book a Live Demo</DialogTitle>
          </DialogHeader>
          <p className="text-slate-600 mb-6 font-medium leading-relaxed">
            A Fieldflow construction specialist will walk through the platform with your team, focusing on your specific project types and workflows.
          </p>
          <div className="space-y-4">
            <input className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:border-yellow-400 transition-all duration-200" placeholder="Your full name" />
            <input className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:border-yellow-400 transition-all duration-200" placeholder="Company email" />
            <input className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:border-yellow-400 transition-all duration-200" placeholder="Company name" />
            <select className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-600 font-medium focus:outline-none focus:border-yellow-400 transition-all duration-200 cursor-pointer">
              <option>Type of construction</option>
              <option>Commercial GC</option>
              <option>Residential Builder</option>
              <option>Industrial / Heavy Civil</option>
              <option>Specialty Contractor</option>
              <option>Construction Manager</option>
            </select>
            <button className="cursor-pointer w-full py-4 bg-yellow-500 text-slate-900 font-black rounded-xl hover:bg-yellow-400 transition-all duration-200 shadow-lg shadow-yellow-200">
              Request Demo
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
