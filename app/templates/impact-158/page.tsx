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
import { LayoutDashboard, CheckSquare, Users, BarChart2, Zap, Shield, Clock, ArrowRight, Star, ChevronRight, Menu, X, Globe, TrendingUp, Calendar, Bell, FileText, Settings, Play, Check, Sparkles } from "lucide-react"

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
    const t = setInterval(() => setCount(c => { const n = c + step; if (n >= target) { clearInterval(t); return target } return n }), 16)
    return () => clearInterval(t)
  }, [isInView, target])
  return <span ref={ref}>{prefix}{Math.floor(count).toLocaleString()}{suffix}</span>
}

function MagneticBtn({ children, className = "", onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  const x = useMotionValue(0); const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 400, damping: 20 })
  const sy = useSpring(y, { stiffness: 400, damping: 20 })
  const ref = useRef<HTMLButtonElement>(null)
  const handleMouse = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.3)
    y.set((e.clientY - r.top - r.height / 2) * 0.3)
  }
  return (
    <motion.button ref={ref} style={{ x: sx, y: sy }} onMouseMove={handleMouse} onMouseLeave={() => { x.set(0); y.set(0) }} onClick={onClick} className={`cursor-pointer ${className}`}>
      {children}
    </motion.button>
  )
}

const navLinks = ["Features", "Pricing", "Integrations", "Enterprise", "Blog"]

const stats = [
  { value: 120000, suffix: "+", label: "Teams Onboarded", icon: Users },
  { value: 98, suffix: "%", label: "On-Time Delivery Rate", icon: CheckSquare },
  { value: 40, suffix: "%", label: "Faster Project Completion", icon: TrendingUp },
  { value: 4.9, suffix: "/5", label: "Average User Rating", icon: Star },
  { value: 99.9, suffix: "%", label: "Platform Uptime SLA", icon: Shield },
  { value: 3, suffix: "M+", label: "Tasks Completed Daily", icon: Zap },
]

const featureTabs = [
  {
    id: "tasks",
    label: "Task Management",
    icon: CheckSquare,
    headline: "Ship work faster with intelligent task boards",
    description: "FlowDesk's task engine is built for modern engineering teams. Drag-and-drop kanban views, list and timeline modes, nested subtasks up to 5 levels deep, and AI-powered priority scoring that surfaces the work that matters most — so nothing slips through the cracks.",
    items: [
      "Nested subtasks & dependencies with critical path visualization",
      "AI-based priority scoring from deadlines, blockers, and team load",
      "Custom fields, labels, and multi-dimensional filtering",
      "Bulk actions: assign, reschedule, or close dozens of tasks at once",
      "Automated recurring tasks and smart deadline reminders",
      "Two-way GitHub & Jira sync — link commits to tasks in real time",
    ],
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80",
    badge: "Core Feature",
  },
  {
    id: "analytics",
    label: "Analytics & Reporting",
    icon: BarChart2,
    headline: "Data-driven insights for high-performing teams",
    description: "Replace your weekly status meeting with live dashboards. FlowDesk tracks velocity, cycle time, burndown, and resource utilization in real time — giving every stakeholder the visibility they need without the manual reporting overhead.",
    items: [
      "Live sprint velocity, cycle time, and throughput charts",
      "Team capacity heatmaps with vacation and focus-time blocking",
      "Custom report builder with CSV and PDF export",
      "Portfolio-level rollups across unlimited projects",
      "Predictive delivery forecasting using ML trend analysis",
      "Automated weekly digest emails to stakeholders",
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    badge: "Pro Feature",
  },
  {
    id: "automation",
    label: "Automations",
    icon: Zap,
    headline: "Eliminate repetitive work with no-code automations",
    description: "Build powerful workflows without writing a single line of code. FlowDesk's automation engine connects triggers, conditions, and actions across your project board, your team's calendar, and 200+ external apps — from Globe to Salesforce.",
    items: [
      "Visual no-code automation builder with 50+ pre-built templates",
      "Cross-project triggers: status changes, deadline breaches, or custom events",
      "Native Globe, Teams, and email notification routing",
      "Webhook support for custom integrations and internal tooling",
      "Conditional branching: different actions based on data conditions",
      "Audit log: every automation run logged with success/failure status",
    ],
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&q=80",
    badge: "Automation",
  },
  {
    id: "collaboration",
    label: "Team Collaboration",
    icon: Users,
    headline: "Keep every team member aligned and unblocked",
    description: "Async-first collaboration tools built for distributed and hybrid teams. Threaded comments directly on tasks, rich-text wikis attached to projects, real-time live cursors in boards, and a daily standup digest powered by your task activity.",
    items: [
      "Threaded task comments with @mentions, reactions, and file attachments",
      "Project wikis: rich text, embeds, tables, and nested pages",
      "Live multiplayer boards with presence indicators",
      "Daily standup bot: auto-generated from yesterday's task updates",
      "Guest access with granular permission controls",
      "Video and voice calls embedded directly within tasks",
    ],
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
    badge: "Collaboration",
  },
]

const testimonials = [
  {
    name: "Sarah Chen",
    role: "VP of Engineering",
    company: "Vercel",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    rating: 5,
    text: "FlowDesk cut our sprint planning time by 60%. The AI priority scoring is eerily accurate — it identified our most at-risk tasks two sprints before we would have noticed ourselves. It's the first project tool our engineers actually enjoy using.",
  },
  {
    name: "Marcus Johnson",
    role: "Head of Product",
    company: "Linear",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    rating: 5,
    text: "We migrated 200 active projects from Jira in under 4 hours. The import tool is flawless and the FlowDesk interface is so much faster. Our team's velocity metric improved 38% in the first month — no exaggeration.",
  },
  {
    name: "Priya Nair",
    role: "Director of Operations",
    company: "Stripe",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    rating: 5,
    text: "The analytics dashboard replaced three separate tools we were paying for. Our C-suite now gets live portfolio updates instead of waiting for my Friday report. The predictive forecasting alone paid for the annual plan in two months.",
  },
  {
    name: "David Park",
    role: "CTO",
    company: "Notion",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    rating: 5,
    text: "Automations are transformative. We set up 23 custom workflows on day one — automatic escalation for blocked tasks, Globe pings for overdue sprints, and daily standup briefs generated from task data. The no-code builder is genuinely powerful.",
  },
  {
    name: "Elena Rodriguez",
    role: "Agile Coach",
    company: "Shopify",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80",
    rating: 5,
    text: "I've evaluated 14 project management tools over the past 3 years. FlowDesk wins on speed, feature depth, and — most importantly — the fact that actual engineers use it willingly. The keyboard shortcut system is exceptional.",
  },
]

const pricingTiers = [
  {
    name: "Starter",
    price: "$0",
    period: "per seat / month",
    description: "Perfect for small teams and solo freelancers getting started with structured project management.",
    color: "slate",
    features: [
      "Up to 5 team members",
      "Unlimited tasks and subtasks",
      "3 active projects",
      "Basic kanban & list views",
      "2GB file storage per workspace",
      "Community support",
    ],
    cta: "Start Free",
    recommended: false,
  },
  {
    name: "Pro",
    price: "$18",
    period: "per seat / month",
    description: "For growing teams that need advanced analytics, automations, and unlimited projects.",
    color: "violet",
    features: [
      "Unlimited team members",
      "Unlimited active projects",
      "Advanced analytics & reporting",
      "50 automation runs / month",
      "Timeline, Gantt & board views",
      "Custom fields & workflows",
      "Priority email & chat support",
      "50GB file storage",
    ],
    cta: "Start 14-Day Trial",
    recommended: true,
  },
  {
    name: "Enterprise",
    price: "$42",
    period: "per seat / month",
    description: "Full-scale deployment for large engineering orgs with SSO, audit logs, and dedicated support.",
    color: "slate",
    features: [
      "Everything in Pro",
      "SSO / SAML 2.0 integration",
      "Advanced security & audit logs",
      "Unlimited automations",
      "Custom SLA & dedicated CSM",
      "On-premise deployment option",
      "Portfolio-level reporting",
      "Unlimited storage",
    ],
    cta: "Contact Sales",
    recommended: false,
  },
]

const faqItems = [
  {
    q: "Can I migrate from Jira or Asana?",
    a: "Yes. FlowDesk provides a one-click importer for Jira, Asana, Trello, Monday, ClickUp, and Basecamp. The importer preserves tasks, assignees, due dates, attachments, and comment history. Most migrations complete in under 10 minutes for teams under 500 tasks. Larger imports are handled by our onboarding team with white-glove migration support included on Pro and Enterprise plans.",
  },
  {
    q: "How does the AI priority scoring work?",
    a: "Our priority engine is trained on over 50 million completed tasks across anonymized workspace data. It weighs deadline proximity, dependency count, assignee workload, historical delivery patterns, and stakeholder impact score to surface a real-time priority rank for every task. Teams can tune the weighting or turn off AI suggestions entirely — full control stays with you.",
  },
  {
    q: "Is FlowDesk GDPR and SOC 2 Type II compliant?",
    a: "FlowDesk is SOC 2 Type II certified and fully GDPR-compliant. All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We offer EU-only data residency on Enterprise plans and a dedicated Data Processing Agreement (DPA) for EU customers. Annual third-party penetration testing reports are available on request.",
  },
  {
    q: "What integrations does FlowDesk support?",
    a: "FlowDesk has 200+ native integrations including GitHub, GitLab, Bitbucket, Globe, Microsoft Teams, Globe, Notion, Google Drive, Salesforce, HubSpot, Zendesk, and Intercom. Our Zapier and Make.com connectors unlock 5,000+ additional tools. A public REST API and GraphQL endpoint are available for custom integrations.",
  },
  {
    q: "Can we use FlowDesk for non-engineering teams?",
    a: "Absolutely. FlowDesk is used by marketing, design, finance, and operations teams globally. Custom fields, workflow templates, and view types adapt to any business process. Marketing campaign planning, product launch checklists, legal matter management — FlowDesk's flexible data model handles them all without needing to reconfigure from scratch.",
  },
  {
    q: "How does billing work for growing teams?",
    a: "Billing is seat-based and prorated to the day. When you add a team member mid-cycle, you're charged only for the remaining days in that billing period. Annual plans receive a 20% discount versus monthly. You can upgrade, downgrade, or cancel at any time — no contracts required on Starter or Pro plans.",
  },
  {
    q: "What does the Enterprise SLA guarantee?",
    a: "Enterprise SLA guarantees 99.99% monthly uptime with financial credits if we miss. Dedicated customer success management, 24/7 priority support with <1-hour initial response time, and a named technical account manager. Custom onboarding programs for teams over 200 seats.",
  },
]

const integrationLogos = [
  { name: "GitHub", img: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=200&q=80" },
  { name: "Globe", img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=200&q=80" },
  { name: "Globe", img: "https://images.unsplash.com/photo-1612539465636-4dc0f9af36c9?w=200&q=80" },
  { name: "Notion", img: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=200&q=80" },
]

export default function FlowDeskProjectManagement() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const heroY = useTransform(scrollYProgress, [0, 0.4], [0, 120])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const [activeTab, setActiveTab] = useState("tasks")
  const [demoOpen, setDemoOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div ref={containerRef} style={{ overflowX: "hidden", scrollBehavior: "smooth" }} className="min-h-screen bg-white text-slate-900 font-sans">

      {/* ── NAVBAR ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
              <LayoutDashboard className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-black text-slate-900 tracking-tight">FlowDesk</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link key={link} href="#" className="text-sm font-medium text-slate-600 hover:text-violet-600 transition-all duration-200 cursor-pointer">
                {link}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link href="#" className="text-sm font-semibold text-slate-700 hover:text-violet-600 transition-all duration-200 cursor-pointer px-4 py-2">
              Sign in
            </Link>
            <button onClick={() => setDemoOpen(true)} className="bg-violet-600 hover:bg-violet-700 text-white text-sm font-bold px-5 py-2.5 rounded-lg cursor-pointer transition-all duration-200 shadow-sm">
              Get Started Free
            </button>
          </div>

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <button className="md:hidden p-2 cursor-pointer hover:bg-slate-100 rounded-lg transition-all duration-200">
                <Menu className="w-5 h-5 text-slate-700" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-white">
              <div className="flex flex-col gap-4 mt-8">
                {navLinks.map(link => (
                  <Link key={link} href="#" className="text-base font-semibold text-slate-700 hover:text-violet-600 transition-all duration-200 cursor-pointer py-2 border-b border-slate-100">
                    {link}
                  </Link>
                ))}
                <button className="mt-4 bg-violet-600 text-white font-bold py-3 rounded-lg cursor-pointer hover:bg-violet-700 transition-all duration-200">
                  Get Started Free
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-6 overflow-hidden">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-white to-indigo-50" />
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-violet-200 rounded-full blur-3xl opacity-30" />
          <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-indigo-200 rounded-full blur-3xl opacity-25" />
        </motion.div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <Reveal delay={0}>
            <Badge className="bg-violet-100 text-violet-700 border-violet-200 px-4 py-1.5 text-xs font-bold mb-6 cursor-pointer hover:bg-violet-200 transition-all duration-200">
              <Sparkles className="w-3 h-3 mr-1.5 inline" />
              Now with AI Priority Scoring — Beta
            </Badge>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-tight tracking-tight mb-6">
              The project workspace
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">your team will love.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-10">
              FlowDesk unifies tasks, timelines, analytics, and automations in a single, blazing-fast interface — helping engineering and product teams ship 40% faster from day one.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <MagneticBtn
                onClick={() => setDemoOpen(true)}
                className="bg-violet-600 hover:bg-violet-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-violet-200 transition-all duration-200 text-base flex items-center gap-2"
              >
                Start for Free <ArrowRight className="w-4 h-4" />
              </MagneticBtn>
              <button onClick={() => setDemoOpen(true)} className="flex items-center gap-2 text-slate-700 font-semibold px-6 py-4 rounded-xl border border-slate-200 hover:border-violet-300 hover:bg-violet-50 cursor-pointer transition-all duration-200">
                <Play className="w-4 h-4 text-violet-600" /> Watch Demo
              </button>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500 font-medium">
              {["No credit card required", "Free 14-day trial", "SOC 2 certified", "Cancel anytime"].map((item, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-violet-500" /> {item}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.5}>
            <div className="mt-16 relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
              <Image
                src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80"
                alt="FlowDesk dashboard preview"
                width={1200}
                height={680}
                className="w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {stats.map((s, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="text-center">
                  <s.icon className="w-6 h-6 text-violet-400 mx-auto mb-2" />
                  <div className="text-3xl font-black text-white mb-1">
                    <Counter target={s.value} suffix={s.suffix} />
                  </div>
                  <p className="text-slate-400 text-xs font-medium leading-snug">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES TABS ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <Badge className="bg-violet-100 text-violet-700 border-violet-200 mb-4">Platform Features</Badge>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Everything your team needs to ship</h2>
              <p className="text-lg text-slate-500 max-w-xl mx-auto">Built for engineering teams who move fast and can't afford context-switching between five different tools.</p>
            </div>
          </Reveal>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-slate-50 p-2 rounded-xl h-auto mb-12 border border-slate-100">
              {featureTabs.map(tab => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-violet-700 text-slate-600 font-semibold"
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="hidden sm:inline text-sm">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {featureTabs.map(tab => (
              <TabsContent key={tab.id} value={tab.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="grid md:grid-cols-2 gap-12 items-center"
                >
                  <div>
                    <Badge className="bg-violet-100 text-violet-700 border-violet-200 mb-4">{tab.badge}</Badge>
                    <h3 className="text-3xl font-black text-slate-900 mb-4">{tab.headline}</h3>
                    <p className="text-slate-600 leading-relaxed mb-8">{tab.description}</p>
                    <ul className="space-y-3">
                      {tab.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                          <div className="mt-0.5 w-5 h-5 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-violet-600" />
                          </div>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <button className="mt-8 flex items-center gap-2 text-violet-600 font-bold hover:text-violet-800 cursor-pointer transition-all duration-200">
                      Learn more <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-100">
                    <Image src={tab.image} alt={tab.headline} width={700} height={480} className="w-full object-cover" />
                  </div>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* ── TESTIMONIALS CAROUSEL ── */}
      <section className="py-24 bg-slate-50 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <Badge className="bg-violet-100 text-violet-700 border-violet-200 mb-4">Customer Stories</Badge>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Loved by 120,000+ teams</h2>
              <p className="text-lg text-slate-500 max-w-lg mx-auto">From fast-moving startups to Fortune 500 engineering orgs — FlowDesk earns a 4.9/5 rating across 14,000+ reviews.</p>
            </div>
          </Reveal>

          <Carousel className="w-full">
            <CarouselContent className="-ml-4">
              {testimonials.map((t, i) => (
                <CarouselItem key={i} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <Reveal delay={i * 0.08}>
                    <Card className="bg-white border border-slate-200 hover:border-violet-300 hover:shadow-lg cursor-pointer transition-all duration-300 h-full">
                      <CardContent className="p-6 flex flex-col h-full">
                        <div className="flex gap-1 mb-4">
                          {Array.from({ length: t.rating }).map((_, j) => (
                            <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <p className="text-slate-700 text-sm leading-relaxed mb-6 flex-1">"{t.text}"</p>
                        <Separator className="mb-4" />
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={t.avatar} />
                            <AvatarFallback className="bg-violet-100 text-violet-700">{t.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-bold text-slate-900">{t.name}</p>
                            <p className="text-xs text-slate-500">{t.role} · {t.company}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Reveal>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="cursor-pointer -left-4 hover:bg-violet-50 hover:border-violet-300 transition-all duration-200" />
            <CarouselNext className="cursor-pointer -right-4 hover:bg-violet-50 hover:border-violet-300 transition-all duration-200" />
          </Carousel>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <Badge className="bg-violet-100 text-violet-700 border-violet-200 mb-4">Transparent Pricing</Badge>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Start free. Scale confidently.</h2>
              <p className="text-lg text-slate-500 max-w-lg mx-auto">No hidden fees. No seat minimums on Starter. Annual plans save 20% versus monthly billing.</p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {pricingTiers.map((tier, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25 }}
                  className={`relative rounded-2xl border-2 p-8 flex flex-col cursor-pointer transition-all duration-200 h-full ${
                    tier.recommended
                      ? "border-violet-600 bg-violet-600 text-white shadow-2xl shadow-violet-200"
                      : "border-slate-200 bg-white hover:border-violet-300 hover:shadow-lg"
                  }`}
                >
                  {tier.recommended && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="bg-amber-400 text-amber-900 border-0 font-bold px-4 py-1 shadow-sm">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <div className="mb-6">
                    <h3 className={`text-xl font-black mb-2 ${tier.recommended ? "text-white" : "text-slate-900"}`}>{tier.name}</h3>
                    <div className="flex items-baseline gap-1 mb-3">
                      <span className={`text-5xl font-black ${tier.recommended ? "text-white" : "text-slate-900"}`}>{tier.price}</span>
                      <span className={`text-sm ${tier.recommended ? "text-violet-200" : "text-slate-400"}`}>{tier.period}</span>
                    </div>
                    <p className={`text-sm leading-relaxed ${tier.recommended ? "text-violet-100" : "text-slate-500"}`}>{tier.description}</p>
                  </div>
                  <ul className="space-y-3 flex-1 mb-8">
                    {tier.features.map((f, j) => (
                      <li key={j} className={`flex items-start gap-2.5 text-sm ${tier.recommended ? "text-violet-100" : "text-slate-700"}`}>
                        <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${tier.recommended ? "text-violet-200" : "text-violet-500"}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-3 rounded-xl font-bold cursor-pointer transition-all duration-200 ${
                    tier.recommended
                      ? "bg-white text-violet-700 hover:bg-violet-50"
                      : "bg-violet-600 text-white hover:bg-violet-700"
                  }`}>
                    {tier.cta}
                  </button>
                </motion.div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-12 text-center">
              <p className="text-slate-500 text-sm">Need a custom enterprise deal? <Link href="#" className="text-violet-600 font-semibold hover:underline cursor-pointer">Talk to our sales team →</Link></p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <Badge className="bg-violet-100 text-violet-700 border-violet-200 mb-4">FAQ</Badge>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Common questions, answered</h2>
              <p className="text-slate-500">Can't find what you need? <Link href="#" className="text-violet-600 font-semibold hover:underline cursor-pointer">Chat with our team.</Link></p>
            </div>
          </Reveal>

          <Accordion type="single" collapsible className="space-y-3">
            {faqItems.map((item, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <AccordionItem value={`faq-${i}`} className="bg-white border border-slate-200 rounded-xl px-6 cursor-pointer hover:border-violet-300 transition-all duration-200 data-[state=open]:border-violet-400 data-[state=open]:shadow-sm">
                  <AccordionTrigger className="hover:text-violet-700 transition-colors duration-200 font-bold text-left text-slate-900 py-5 text-base">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 leading-relaxed pb-5 text-sm">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              </Reveal>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-24 px-6 bg-gradient-to-br from-violet-600 via-violet-700 to-indigo-700">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <Badge className="bg-white/20 text-white border-white/30 mb-6">Start Today</Badge>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              Your team deserves better than spreadsheets.
            </h2>
            <p className="text-violet-100 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              Join 120,000+ teams already shipping faster with FlowDesk. Free to start — no credit card, no setup fees, no BS.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticBtn
                onClick={() => setDemoOpen(true)}
                className="bg-white text-violet-700 font-bold px-8 py-4 rounded-xl cursor-pointer hover:bg-violet-50 transition-all duration-200 shadow-lg text-base"
              >
                Get Started Free
              </MagneticBtn>
              <button className="text-white font-semibold px-6 py-4 rounded-xl border border-white/30 hover:bg-white/10 cursor-pointer transition-all duration-200">
                Schedule a Demo
              </button>
            </div>
            <p className="text-violet-200 text-sm mt-6">14-day free trial · No credit card required · Cancel anytime</p>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-slate-900 text-slate-300 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
            <div className="col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4 cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
                  <LayoutDashboard className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-black text-white">FlowDesk</span>
              </Link>
              <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-xs">The project management platform built for modern engineering teams. Ship faster, stay aligned, and keep stakeholders happy.</p>
              <div className="flex gap-3">
                <Link href="#" className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-violet-600 cursor-pointer transition-all duration-200"><Globe className="w-4 h-4" /></Link>
                <Link href="#" className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-violet-600 cursor-pointer transition-all duration-200"><Globe className="w-4 h-4" /></Link>
                <Link href="#" className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-violet-600 cursor-pointer transition-all duration-200"><Globe className="w-4 h-4" /></Link>
                <Link href="#" className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-violet-600 cursor-pointer transition-all duration-200"><Globe className="w-4 h-4" /></Link>
              </div>
            </div>
            {[
              { heading: "Product", links: ["Features", "Pricing", "Changelog", "Roadmap", "Status"] },
              { heading: "Solutions", links: ["Engineering Teams", "Product Management", "Marketing", "Enterprise", "Startups"] },
              { heading: "Resources", links: ["Documentation", "API Reference", "Integrations", "Templates", "Blog"] },
            ].map(col => (
              <div key={col.heading}>
                <h4 className="text-white font-black text-sm mb-4">{col.heading}</h4>
                <ul className="space-y-2.5">
                  {col.links.map(link => (
                    <li key={link}><Link href="#" className="text-sm text-slate-400 hover:text-violet-400 cursor-pointer transition-all duration-200">{link}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Separator className="bg-slate-800 mb-8" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
            <p>© 2026 FlowDesk Inc. All rights reserved. SOC 2 Type II · GDPR Compliant</p>
            <div className="flex gap-6">
              {["Privacy Policy", "Terms of Service", "Cookies", "Security"].map(link => (
                <Link key={link} href="#" className="hover:text-slate-300 cursor-pointer transition-all duration-200">{link}</Link>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ── DEMO DIALOG ── */}
      <AnimatePresence>
        {demoOpen && (
          <Dialog open={demoOpen} onOpenChange={setDemoOpen}>
            <DialogContent className="bg-white border-slate-200 max-w-lg">
              <DialogHeader>
                <DialogTitle className="text-slate-900 text-2xl font-black">Start your free trial</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-2">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Work email</label>
                  <input type="email" placeholder="you@company.com" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:border-violet-500 outline-none transition-all duration-200 cursor-text" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Full name</label>
                  <input type="text" placeholder="Your name" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:border-violet-500 outline-none transition-all duration-200 cursor-text" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Company size</label>
                  <select className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:border-violet-500 outline-none transition-all duration-200 cursor-pointer bg-white">
                    <option>1–10 people</option>
                    <option>11–50 people</option>
                    <option>51–200 people</option>
                    <option>200+ people</option>
                  </select>
                </div>
                <Progress value={66} className="h-1.5 bg-slate-100" />
                <p className="text-xs text-slate-400 text-center">2 of 3 steps complete</p>
                <button className="w-full bg-violet-600 text-white font-bold py-3 rounded-xl cursor-pointer hover:bg-violet-700 transition-all duration-200">
                  Create Free Account
                </button>
                <p className="text-xs text-slate-400 text-center">No credit card. 14-day trial. Cancel anytime.</p>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  )
}
