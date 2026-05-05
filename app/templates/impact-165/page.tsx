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
import { Menu, Zap, BarChart3, Mail, MessageSquare, Target, TrendingUp, Users, CheckCircle2, ArrowRight, Star, Globe, Workflow, Layers, RefreshCw, Bell, MousePointer, Calendar } from "lucide-react"

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  )
}

function Counter({ target, prefix = "", suffix = "", decimals = 0 }: { target: number; prefix?: string; suffix?: string; decimals?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    const step = target / 80
    const t = setInterval(() => setCount(c => { const n = c + step; if (n >= target) { clearInterval(t); return target; } return n; }), 16)
    return () => clearInterval(t)
  }, [inView, target])
  return <span ref={ref}>{prefix}{decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString()}{suffix}</span>
}

const TESTIMONIALS = [
  {
    name: "Priya Rajendran", role: "VP Marketing", company: "Vance Commerce",
    quote: "NovaPulse automated our entire email nurture sequence for 14 product lines. Revenue from automated flows went from $80K/month to $340K in 6 months. It's genuinely transformational.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80",
    rating: 5, metric: "+325% automated revenue"
  },
  {
    name: "James Ellison", role: "Head of Growth", company: "Petal Finance",
    quote: "We replaced 4 point tools (Klaviyo, Mailchimp, Intercom, and a custom attribution model) with NovaPulse. The platform does everything better, and we reduced our martech spend by $180K/year.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
    rating: 5, metric: "$180K annual savings"
  },
  {
    name: "Camille Rousseau", role: "CMO", company: "Aether Beauty",
    quote: "NovaPulse's predictive send-time optimization lifted our email open rates from 21% to 38% in 3 weeks. That's not incremental improvement — that's a different category of tool.",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80",
    rating: 5, metric: "21% → 38% email open rate"
  },
  {
    name: "Daniel Osei", role: "Director, Digital Marketing", company: "GreenLeaf Foods",
    quote: "The multi-channel orchestration is flawless. We run SMS, push, email, and paid retargeting from one canvas. Attribution is precise. Our customer LTV grew 42% in a single quarter.",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80",
    rating: 5, metric: "+42% customer LTV in Q1"
  },
  {
    name: "Yuki Tanaka", role: "Growth Engineer", company: "Synthex Labs",
    quote: "The API is excellent. We built a fully custom lead scoring model in 2 days using NovaPulse's Python SDK. No other platform has the extensibility and the ease of use simultaneously.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80",
    rating: 5, metric: "Custom lead model in 2 days"
  },
]

const FAQS = [
  {
    q: "How does NovaPulse differ from Klaviyo or HubSpot Marketing Hub?",
    a: "NovaPulse is built specifically for the modern multi-channel stack. Unlike Klaviyo (email/SMS focused) or HubSpot (CRM-centric), NovaPulse unifies email, SMS, push, in-app, and paid retargeting in a single real-time orchestration canvas. Our AI layer processes behavioral signals 10x faster than rule-based tools — enabling predictive personalization at the individual level, not segment level. We also offer native A/B testing with Bayesian optimization, not just 50/50 splits."
  },
  {
    q: "What does 'real-time behavioral segmentation' mean in practice?",
    a: "When a contact visits your pricing page three times in 48 hours, NovaPulse segments them instantly and triggers a personalized sequence — not after a nightly sync. Our event stream processes 25M+ behavioral events per hour with sub-500ms latency. You can build segments on any combination of page visits, purchase history, email engagement, product usage, custom attributes, and predicted behaviors without waiting for data warehouse exports."
  },
  {
    q: "How does NovaPulse handle multi-touch attribution?",
    a: "NovaPulse ships a native multi-touch attribution model that tracks the full customer journey across email, SMS, push, ads, and organic — with support for first-touch, last-touch, linear, time-decay, and data-driven (algorithmic) models. You can compare models side-by-side and slice attribution by campaign, channel, audience segment, and time period. No third-party attribution tool required."
  },
  {
    q: "Does NovaPulse integrate with our existing CRM and data stack?",
    a: "Yes. Native bidirectional integrations exist for Salesforce, HubSpot CRM, Pipedrive, Intercom, Segment, mParticle, Amplitude, Mixpanel, Snowflake, BigQuery, and Redshift. Our Zapier integration covers 5,000+ additional apps. Webhooks and a full REST + GraphQL API enable custom integrations in any language. Data syncs are real-time for CDP/CRM integrations, not batch."
  },
  {
    q: "What is the onboarding process and how long until we see results?",
    a: "Our dedicated onboarding team completes initial setup, data migration, and first automation launch within 10 business days. Most customers see measurable improvements within 30 days. Our Success Engineers provide a 90-day launch plan with specific KPI targets, weekly check-ins, and access to our library of 500+ pre-built automation templates covering e-commerce, SaaS, financial services, and healthcare."
  },
  {
    q: "How does contact-based pricing work and is there a free trial?",
    a: "Pricing is based on active contacts in your database, with unlimited email sends included at every tier. We offer a 14-day free trial with full feature access for up to 5,000 contacts and no credit card required. Annual plans receive a 20% discount versus monthly billing. Volume discounts apply automatically at 250K, 1M, and 5M contacts."
  },
  {
    q: "What deliverability support does NovaPulse provide?",
    a: "NovaPulse maintains a dedicated deliverability infrastructure with dedicated IP pools, real-time reputation monitoring across Gmail, Yahoo, and Outlook, automatic suppression management, and built-in warmup tools for new senders. Our average customer inbox placement rate is 98.2%. A deliverability specialist reviews high-volume sends and alerts you before potential reputation issues arise."
  },
]

const PRICING_TIERS = [
  {
    name: "Starter",
    price: "$149",
    period: "/ month",
    contacts: "Up to 25,000 contacts",
    description: "For early-stage companies building their first automated marketing programs.",
    features: [
      "Unlimited email sends",
      "SMS marketing (pay per send)",
      "Visual automation builder",
      "5 automation workflows",
      "A/B split testing",
      "Basic analytics & reporting",
      "Standard templates library",
      "Email support",
    ],
    cta: "Start Free Trial",
    highlight: false,
    badge: null,
  },
  {
    name: "Growth",
    price: "$449",
    period: "/ month",
    contacts: "Up to 100,000 contacts",
    description: "For scaling marketing teams that need AI personalization and multi-channel orchestration.",
    features: [
      "Everything in Starter",
      "AI send-time optimization",
      "Predictive behavioral segmentation",
      "Multi-channel orchestration (email + SMS + push)",
      "Unlimited automation workflows",
      "Multi-touch attribution",
      "500+ pre-built templates",
      "Dedicated Success Engineer",
      "Priority support (2hr SLA)",
    ],
    cta: "Start Free Trial",
    highlight: true,
    badge: "Most Popular",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "pricing",
    contacts: "Unlimited contacts",
    description: "For enterprise marketing teams with advanced data, compliance, and white-glove requirements.",
    features: [
      "Everything in Growth",
      "Unlimited contacts & sends",
      "Custom AI model training",
      "Paid retargeting sync (Meta, Google, LinkedIn)",
      "SSO & SAML authentication",
      "Custom data residency (EU/US)",
      "HIPAA-compliant deployment option",
      "Dedicated account team",
      "SLA: 99.99% uptime, 1hr P1 response",
    ],
    cta: "Contact Sales",
    highlight: false,
    badge: null,
  },
]

const WORKFLOW_STEPS = [
  { step: "01", title: "Capture Every Signal", icon: MousePointer, desc: "NovaPulse tracks 150+ behavioral signals across your website, app, email, SMS, and paid channels — instantly building individual contact profiles that update in real time." },
  { step: "02", title: "Segment Intelligently", icon: Users, desc: "Build hyper-precise segments using any combination of behavioral, demographic, firmographic, and predictive attributes. Segments refresh continuously, not on a nightly batch schedule." },
  { step: "03", title: "Orchestrate Across Channels", icon: Workflow, desc: "Drag-and-drop automation canvas lets you sequence email, SMS, push, and ad audiences in a single workflow — with branching logic, wait conditions, and A/B test nodes built in." },
  { step: "04", title: "Personalize with AI", icon: Zap, desc: "Our AI layer recommends optimal send times, subject lines, content variants, and product recommendations for each individual contact — automatically, at any scale." },
  { step: "05", title: "Measure and Iterate", icon: BarChart3, desc: "Unified attribution, revenue analytics, and experiment tracking close the loop between campaigns and business outcomes. Know exactly which messages drove pipeline." },
]

export default function NovaPulseMarketing() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const heroY = useTransform(scrollYProgress, [0, 0.4], [0, 100])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 60, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 60, damping: 30 })

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 80)
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 80)
    }
    window.addEventListener("mousemove", handler)
    return () => window.removeEventListener("mousemove", handler)
  }, [mouseX, mouseY])

  const [trialOpen, setTrialOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div ref={containerRef} style={{ overflowX: "hidden", scrollBehavior: "smooth" }} className="bg-white text-slate-900 min-h-screen font-sans">

      {/* ── NAVBAR ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-fuchsia-500 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-black tracking-tight text-slate-900">Nova<span className="text-violet-600">Pulse</span></span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {["Product", "Solutions", "Integrations", "Pricing", "Blog"].map(item => (
              <Link key={item} href="#" className="cursor-pointer text-sm font-semibold text-slate-600 hover:text-violet-600 transition-all duration-200">{item}</Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link href="#" className="cursor-pointer text-sm font-semibold text-slate-600 hover:text-slate-900 transition-all duration-200 px-3 py-2">Sign In</Link>
            <button onClick={() => setTrialOpen(true)} className="cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white text-sm font-black px-5 py-2.5 rounded-lg hover:opacity-90 transition-all duration-200 shadow-lg shadow-violet-500/25">
              Start Free Trial
            </button>
          </div>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button className="md:hidden cursor-pointer p-2 hover:bg-slate-100 rounded-lg transition-all duration-150">
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-white w-72">
              <div className="pt-8 flex flex-col gap-6">
                {["Product", "Solutions", "Integrations", "Pricing", "Blog", "Sign In"].map(item => (
                  <Link key={item} href="#" className="cursor-pointer text-lg font-bold text-slate-700 hover:text-violet-600 transition-colors duration-200">{item}</Link>
                ))}
                <button onClick={() => setTrialOpen(true)} className="cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-black py-3 rounded-lg hover:opacity-90 transition-all duration-200">
                  Start Free Trial
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-gradient-to-b from-violet-50/50 to-white">
        <motion.div style={{ x: springX, y: springY }} className="absolute top-20 right-0 w-[700px] h-[700px] bg-gradient-to-br from-violet-400/15 to-fuchsia-400/10 rounded-full blur-[120px] pointer-events-none" />
        <motion.div style={{ x: springX, y: springY }} className="absolute -bottom-20 -left-40 w-[500px] h-[500px] bg-gradient-to-tr from-blue-400/10 to-violet-400/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-28">
          <div className="max-w-3xl">
            <Reveal delay={0}>
              <div className="inline-flex items-center gap-2 bg-violet-100 border border-violet-200 rounded-full px-4 py-1.5 mb-8 cursor-default">
                <TrendingUp className="w-3.5 h-3.5 text-violet-600" />
                <span className="text-violet-700 text-xs font-black uppercase tracking-widest">Trusted by 8,400+ Marketing Teams</span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-tight mb-6 tracking-tight">
                Marketing<br />
                Automation That<br />
                <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">Actually Converts.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-xl text-slate-500 mb-10 leading-relaxed font-light max-w-2xl">
                Orchestrate personalized customer journeys across email, SMS, push, and paid ads — powered by real-time behavioral AI. Stop guessing. Start growing.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button onClick={() => setTrialOpen(true)} className="cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-black px-8 py-4 rounded-xl hover:opacity-90 transition-all duration-200 text-lg shadow-xl shadow-violet-500/25 flex items-center gap-2 justify-center">
                  <Zap className="w-5 h-5" /> Start Free Trial — 14 Days
                </button>
                <Link href="#" className="cursor-pointer border border-slate-200 text-slate-700 font-bold px-8 py-4 rounded-xl hover:border-violet-300 hover:text-violet-600 transition-all duration-200 text-lg flex items-center gap-2 justify-center">
                  <BarChart3 className="w-5 h-5" /> See Live Demo
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="flex flex-wrap gap-6">
                {[
                  { icon: CheckCircle2, text: "No credit card required" },
                  { icon: CheckCircle2, text: "Free migration support" },
                  { icon: CheckCircle2, text: "Setup in under 2 hours" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                    <Icon className="w-4 h-4 text-emerald-500" />{text}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Hero dashboard mockup */}
          <motion.div style={{ y: heroY }} className="hidden lg:block absolute right-6 top-24 w-[520px]">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
              <div className="bg-gradient-to-r from-violet-600 to-fuchsia-500 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-white font-black text-sm">Campaign Performance</span>
                  <Badge className="bg-white/20 text-white border-0 text-xs cursor-default">Live</Badge>
                </div>
              </div>
              <div className="p-5 space-y-4">
                {[
                  { label: "Q2 Nurture Sequence — SaaS Trials", opens: "38.4%", clicks: "12.1%", revenue: "$84,200", trend: "+22%" },
                  { label: "Abandoned Cart Recovery — E-comm", opens: "51.2%", clicks: "28.3%", revenue: "$192,400", trend: "+41%" },
                  { label: "Win-Back Campaign — Churn Risk", opens: "29.7%", clicks: "9.8%", revenue: "$31,600", trend: "+18%" },
                ].map((row, i) => (
                  <div key={i} className="bg-slate-50 rounded-xl p-4">
                    <div className="flex justify-between items-start mb-3">
                      <p className="text-slate-700 text-xs font-bold max-w-[200px]">{row.label}</p>
                      <span className="text-emerald-600 text-xs font-black bg-emerald-50 px-2 py-0.5 rounded-full">{row.trend}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <p className="text-slate-400 text-xs font-semibold mb-0.5">Opens</p>
                        <p className="text-slate-900 font-black text-sm">{row.opens}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-xs font-semibold mb-0.5">Clicks</p>
                        <p className="text-slate-900 font-black text-sm">{row.clicks}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-xs font-semibold mb-0.5">Revenue</p>
                        <p className="text-violet-600 font-black text-sm">{row.revenue}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SOCIAL PROOF LOGOS ── */}
      <section className="py-10 px-6 border-y border-slate-100 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-slate-400 text-xs font-black uppercase tracking-widest mb-6">Trusted by high-growth teams at</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-14 items-center opacity-40">
            {["Acme Corp", "Vance Commerce", "Petal Finance", "Aether Beauty", "GreenLeaf Foods", "Synthex Labs"].map(company => (
              <span key={company} className="text-slate-600 font-black text-sm tracking-tight">{company}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Marketing Emails Sent Monthly", value: 2400000000, suffix: "+" },
              { label: "Average Open Rate Lift", value: 68, suffix: "%" },
              { label: "Revenue Attributed Monthly", value: 480, prefix: "$", suffix: "M+" },
              { label: "Customer Retention Rate", value: 96, suffix: "%" },
            ].map((stat, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="cursor-default">
                  <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent mb-1">
                    <Counter target={stat.value} prefix={stat.prefix ?? ""} suffix={stat.suffix} />
                  </div>
                  <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <Badge className="bg-violet-100 text-violet-700 border-violet-200 mb-4 cursor-default">How It Works</Badge>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
                From Signal to Revenue<br /><span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">in Five Steps.</span>
              </h2>
            </div>
          </Reveal>

          <div className="space-y-6">
            {WORKFLOW_STEPS.map((step, idx) => {
              const Icon = step.icon
              return (
                <Reveal key={idx} delay={idx * 0.08}>
                  <div className="cursor-pointer group bg-white rounded-2xl border border-slate-200 hover:border-violet-300 hover:shadow-xl hover:shadow-violet-500/5 p-8 flex flex-col md:flex-row gap-6 items-start md:items-center transition-all duration-300">
                    <div className="flex-shrink-0 flex items-center gap-5">
                      <span className="text-4xl font-black text-slate-100 group-hover:text-violet-100 transition-colors duration-300 w-12">{step.step}</span>
                      <div className="w-14 h-14 bg-violet-100 group-hover:bg-violet-600 rounded-xl flex items-center justify-center transition-all duration-300">
                        <Icon className="w-7 h-7 text-violet-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-violet-700 transition-colors duration-200">{step.title}</h3>
                      <p className="text-slate-500 leading-relaxed">{step.desc}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-violet-500 flex-shrink-0 transition-colors duration-200" />
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── FEATURES TABS ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <Badge className="bg-violet-100 text-violet-700 border-violet-200 mb-4 cursor-default">Platform Capabilities</Badge>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
                Every Channel. Every<br /><span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">Customer Journey.</span>
              </h2>
            </div>
          </Reveal>

          <Tabs defaultValue="email" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 max-w-2xl mx-auto mb-14 bg-slate-100 p-1 rounded-xl">
              {["email", "sms", "analytics", "ai"].map(tab => (
                <TabsTrigger key={tab} value={tab} className="cursor-pointer rounded-lg font-bold uppercase text-xs transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-violet-700 data-[state=active]:shadow-sm">
                  {tab === "ai" ? "AI Engine" : tab.toUpperCase()}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="email">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <Reveal>
                  <div className="space-y-6">
                    {[
                      { icon: Mail, title: "Drag & Drop Email Builder", desc: "Create pixel-perfect emails with our visual editor — 500+ pre-built blocks, custom fonts, dark mode preview, and AMP email support. No developer needed. Render-tested across 40+ clients." },
                      { icon: Target, title: "Predictive Send-Time AI", desc: "Our ML model analyzes each contact's historical engagement patterns to identify their optimal send window — down to the 30-minute slot. Average open rate lift: +68% versus fixed-time sends." },
                      { icon: RefreshCw, title: "Lifecycle Automation", desc: "Welcome series, abandoned cart, post-purchase, win-back, anniversary — all built and running in your account from day one. Fully customizable with our visual flow builder." },
                    ].map((f, i) => {
                      const Icon = f.icon
                      return (
                        <div key={i} className="cursor-pointer flex gap-4 p-4 rounded-xl hover:bg-violet-50 transition-all duration-200 group">
                          <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-violet-600 transition-all duration-200">
                            <Icon className="w-5 h-5 text-violet-600 group-hover:text-white transition-colors duration-200" />
                          </div>
                          <div>
                            <h3 className="font-black text-slate-900 mb-1">{f.title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </Reveal>
                <Reveal delay={0.2}>
                  <div className="relative h-[440px] rounded-2xl overflow-hidden shadow-2xl border border-slate-100">
                    <Image src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80" alt="Email Marketing" fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="bg-white rounded-xl p-4 shadow-lg">
                        <div className="flex justify-between items-center mb-3">
                          <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Email Performance — 30 days</p>
                          <Badge className="bg-emerald-100 text-emerald-700 border-0 text-xs cursor-default">+68% vs benchmark</Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <p className="text-slate-400 text-xs font-semibold mb-0.5">Open Rate</p>
                            <p className="text-slate-900 font-black">38.4%</p>
                          </div>
                          <div>
                            <p className="text-slate-400 text-xs font-semibold mb-0.5">Click Rate</p>
                            <p className="text-slate-900 font-black">12.8%</p>
                          </div>
                          <div>
                            <p className="text-slate-400 text-xs font-semibold mb-0.5">Revenue</p>
                            <p className="text-violet-600 font-black">$84K</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </TabsContent>

            <TabsContent value="sms">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: MessageSquare, title: "SMS & MMS Campaigns", desc: "Send personalized SMS and MMS messages at scale with dynamic content, personalization tokens, and link tracking. Compliance-first design with TCPA and GDPR guardrails built in.", items: ["Two-way SMS conversations", "MMS image and GIF support", "Short code and toll-free number provisioning"] },
                  { icon: Bell, title: "Push Notifications", desc: "Deliver rich web and mobile push notifications with images, action buttons, and deep links. Segment by behavior, location, device type, and predicted intent for maximum relevance.", items: ["Web push (Chrome, Safari, Firefox)", "iOS & Android native push", "Rich push with image + action buttons"] },
                  { icon: Layers, title: "Cross-Channel Orchestration", desc: "Build unified journeys that intelligently switch channels based on contact preference, engagement history, and message urgency — ensuring every message reaches its recipient.", items: ["Channel preference detection", "Intelligent channel switching logic", "Unified contact timeline view"] },
                ].map((f, i) => {
                  const Icon = f.icon
                  return (
                    <Reveal key={i} delay={i * 0.1}>
                      <Card className="cursor-pointer border-slate-200 hover:border-violet-300 hover:shadow-lg transition-all duration-300 h-full">
                        <CardContent className="p-7">
                          <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center mb-5">
                            <Icon className="w-6 h-6 text-violet-600" />
                          </div>
                          <h3 className="text-xl font-black text-slate-900 mb-3">{f.title}</h3>
                          <p className="text-slate-500 text-sm leading-relaxed mb-5">{f.desc}</p>
                          <ul className="space-y-2">
                            {f.items.map(item => (
                              <li key={item} className="flex items-start gap-2 text-xs text-slate-500 font-semibold">
                                <CheckCircle2 className="w-3.5 h-3.5 text-violet-500 mt-0.5 flex-shrink-0" />{item}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </Reveal>
                  )
                })}
              </div>
            </TabsContent>

            <TabsContent value="analytics">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <Reveal delay={0.2}>
                  <div className="relative h-[440px] rounded-2xl overflow-hidden shadow-2xl border border-slate-100">
                    <Image src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80" alt="Analytics" fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 space-y-3">
                      {[
                        { label: "Email Attribution", val: "$284,000", pct: 84 },
                        { label: "SMS Attribution", val: "$96,000", pct: 58 },
                        { label: "Push Attribution", val: "$42,000", pct: 32 },
                      ].map(row => (
                        <div key={row.label}>
                          <div className="flex justify-between text-xs font-bold text-white mb-1">
                            <span>{row.label}</span><span>{row.val}</span>
                          </div>
                          <Progress value={row.pct} className="h-1.5 bg-white/20" />
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
                <Reveal>
                  <div className="space-y-5">
                    <h3 className="text-3xl font-black text-slate-900">Revenue Attribution That Actually Closes the Loop</h3>
                    <p className="text-slate-500 leading-relaxed">Stop wondering which campaigns drive revenue. NovaPulse tracks the full multi-touch journey from first open to closed deal — across every channel, every campaign, every cohort.</p>
                    {[
                      { label: "Multi-Touch Attribution Models", desc: "Compare first-touch, last-touch, linear, time-decay, and algorithmic models side by side." },
                      { label: "Revenue Forecasting", desc: "ML-powered revenue predictions based on pipeline health, engagement trends, and historical seasonality." },
                      { label: "Cohort & Funnel Analysis", desc: "Track retention, conversion rates, and LTV by acquisition source, campaign, and customer segment." },
                      { label: "Custom Dashboards & Reporting", desc: "Build any report in 60 seconds. Export to CSV, PDF, or push to your data warehouse automatically." },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-3 p-4 rounded-xl bg-violet-50 hover:bg-violet-100 transition-colors duration-200 cursor-pointer">
                        <CheckCircle2 className="w-5 h-5 text-violet-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-black text-slate-900 text-sm mb-0.5">{item.label}</p>
                          <p className="text-slate-500 text-xs">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>
            </TabsContent>

            <TabsContent value="ai">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: Zap, title: "AI Subject Line Optimizer", desc: "Generate and test unlimited subject line variants. Our AI scores each on predicted open rate, spam risk, sentiment, and brand alignment — before you send a single email.", items: ["100+ subject line variants per prompt", "Spam score check (SpamAssassin + Gmail)", "Brand tone analysis and alignment"] },
                  { icon: Users, title: "Predictive Lead Scoring", desc: "Score every contact on purchase intent, churn risk, and upsell readiness — updated continuously as behavior changes. Route high-intent leads to sales instantly via CRM sync.", items: ["Intent score (0–100) per contact", "Churn risk flag with 30-day horizon", "Real-time CRM sync on threshold breach"] },
                  { icon: Globe, title: "AI Content Personalization", desc: "Dynamically insert personalized product recommendations, content blocks, and offers into every email and SMS based on each contact's purchase history, browse behavior, and predicted preferences.", items: ["1:1 product recommendation engine", "Dynamic content block insertion", "Predicted next-best-offer per contact"] },
                ].map((f, i) => {
                  const Icon = f.icon
                  return (
                    <Reveal key={i} delay={i * 0.1}>
                      <Card className="cursor-pointer border-slate-200 hover:border-violet-300 hover:shadow-lg transition-all duration-300 h-full bg-gradient-to-b from-white to-violet-50/30">
                        <CardContent className="p-7">
                          <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-fuchsia-500 rounded-xl flex items-center justify-center mb-5">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="text-xl font-black text-slate-900 mb-3">{f.title}</h3>
                          <p className="text-slate-500 text-sm leading-relaxed mb-5">{f.desc}</p>
                          <ul className="space-y-2">
                            {f.items.map(item => (
                              <li key={item} className="flex items-start gap-2 text-xs text-slate-500 font-semibold">
                                <CheckCircle2 className="w-3.5 h-3.5 text-violet-500 mt-0.5 flex-shrink-0" />{item}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </Reveal>
                  )
                })}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 px-6 bg-gradient-to-b from-violet-600 to-fuchsia-600">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <Badge className="bg-white/10 border-white/20 text-white mb-4 cursor-default">Customer Results</Badge>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                Real Teams. Real Results.<br />Not Hypotheticals.
              </h2>
            </div>
          </Reveal>
          <Carousel className="w-full">
            <CarouselContent className="-ml-4">
              {TESTIMONIALS.map((t, idx) => (
                <CarouselItem key={idx} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <Reveal delay={idx * 0.07}>
                    <Card className="cursor-pointer bg-white/10 border-white/20 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 h-full">
                      <CardContent className="p-7">
                        <div className="flex gap-0.5 mb-4">
                          {Array(t.rating).fill(0).map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-300 text-yellow-300" />)}
                        </div>
                        <p className="text-white/90 text-sm leading-relaxed mb-5 italic">"{t.quote}"</p>
                        <div className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 mb-5">
                          <p className="text-yellow-300 text-xs font-black">{t.metric}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10 ring-2 ring-white/30">
                            <AvatarImage src={t.img} />
                            <AvatarFallback className="bg-white/20 text-white font-bold text-xs">{t.name.split(" ").map(n => n[0]).join("").slice(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-white font-bold text-sm">{t.name}</p>
                            <p className="text-white/60 text-xs font-semibold">{t.role} · {t.company}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Reveal>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="cursor-pointer border-white/30 text-white hover:bg-white/20 transition-all duration-200" />
            <CarouselNext className="cursor-pointer border-white/30 text-white hover:bg-white/20 transition-all duration-200" />
          </Carousel>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <Badge className="bg-violet-100 text-violet-700 border-violet-200 mb-4 cursor-default">Pricing</Badge>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
                Start Free. Scale Fast.<br /><span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">Pay as You Grow.</span>
              </h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto font-light">14-day free trial on all plans. No credit card. Full feature access.</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {PRICING_TIERS.map((tier, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className={`cursor-pointer relative h-full rounded-2xl border-2 p-8 flex flex-col transition-all duration-300 hover:shadow-2xl ${tier.highlight ? "border-violet-500 bg-gradient-to-b from-violet-600 to-fuchsia-600 shadow-xl shadow-violet-500/20" : "border-slate-200 bg-white hover:border-violet-200"}`}>
                  {tier.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <Badge className="bg-violet-600 text-white border-0 px-4 py-1 text-xs font-black">{tier.badge}</Badge>
                    </div>
                  )}
                  <div className="mb-6">
                    <h3 className={`text-2xl font-black mb-1 ${tier.highlight ? "text-white" : "text-slate-900"}`}>{tier.name}</h3>
                    <div className="flex items-end gap-1 mb-1">
                      <span className={`text-4xl font-black ${tier.highlight ? "text-white" : "text-slate-900"}`}>{tier.price}</span>
                      <span className={`text-sm font-semibold mb-1 ${tier.highlight ? "text-white/70" : "text-slate-400"}`}>{tier.period}</span>
                    </div>
                    <p className={`text-xs font-black uppercase tracking-widest mb-3 ${tier.highlight ? "text-white/70" : "text-violet-600"}`}>{tier.contacts}</p>
                    <p className={`text-sm leading-relaxed ${tier.highlight ? "text-white/80" : "text-slate-500"}`}>{tier.description}</p>
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {tier.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${tier.highlight ? "text-white" : "text-violet-500"}`} />
                        <span className={`text-sm font-medium ${tier.highlight ? "text-white/90" : "text-slate-600"}`}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => setTrialOpen(true)} className={`cursor-pointer w-full py-3 rounded-xl font-black text-sm transition-all duration-200 ${tier.highlight ? "bg-white text-violet-700 hover:bg-white/90" : "bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white hover:opacity-90"}`}>
                    {tier.cta}
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <Badge className="bg-violet-100 text-violet-700 border-violet-200 mb-4 cursor-default">FAQ</Badge>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">Everything You Want to Know</h2>
            </div>
          </Reveal>
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((faq, idx) => (
              <Reveal key={idx} delay={idx * 0.04}>
                <AccordionItem value={`faq-${idx}`} className="cursor-pointer bg-white border border-slate-200 rounded-xl px-6 hover:border-violet-300 transition-all duration-200">
                  <AccordionTrigger className="cursor-pointer hover:text-violet-600 font-bold text-slate-900 py-5 text-left transition-colors duration-200">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-500 pb-5 leading-relaxed text-sm">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              </Reveal>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-3xl p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:2rem_2rem]" />
              </div>
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
                  Ready to Grow Your<br />Revenue with Automation?
                </h2>
                <p className="text-white/80 text-xl mb-10 font-light max-w-xl mx-auto">
                  Join 8,400+ marketing teams using NovaPulse to orchestrate personalized journeys that convert.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button onClick={() => setTrialOpen(true)} className="cursor-pointer bg-white text-violet-700 font-black px-10 py-4 rounded-xl hover:bg-white/90 transition-all duration-200 text-lg shadow-xl">
                    Start Free Trial — 14 Days
                  </button>
                  <Link href="#" className="cursor-pointer border-2 border-white/30 text-white font-bold px-10 py-4 rounded-xl hover:bg-white/10 transition-all duration-200 text-lg flex items-center justify-center gap-2">
                    <Calendar className="w-5 h-5" /> Book a Demo
                  </Link>
                </div>
                <p className="text-white/50 text-sm mt-6 font-semibold">No credit card required · Free migration support · Cancel anytime</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-slate-900 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-fuchsia-500 rounded-lg flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-black text-white">Nova<span className="text-violet-400">Pulse</span></span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
                The AI-native marketing automation platform powering personalized customer journeys for 8,400+ high-growth teams.
              </p>
              <div className="flex gap-3">
                {[Globe, Globe, Globe, Globe].map((Icon, i) => (
                  <a key={i} href="#" className="cursor-pointer w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-violet-600 transition-all duration-200">
                    <Icon className="w-4 h-4 text-slate-400" />
                  </a>
                ))}
              </div>
            </div>
            {[
              { title: "Product", links: ["Email Marketing", "SMS Marketing", "Push Notifications", "AI Engine", "Analytics"] },
              { title: "Solutions", links: ["E-commerce", "SaaS", "Financial Services", "Healthcare", "Agencies"] },
              { title: "Company", links: ["About Us", "Blog", "Case Studies", "Careers", "Contact"] },
            ].map(col => (
              <div key={col.title}>
                <h4 className="text-white font-black text-sm uppercase tracking-widest mb-5">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map(link => (
                    <li key={link}><Link href="#" className="cursor-pointer text-slate-400 text-sm hover:text-violet-400 transition-colors duration-200 font-medium">{link}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Separator className="bg-slate-800 mb-8" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">© 2026 NovaPulse Inc. All rights reserved. SOC 2 Type II Certified.</p>
            <div className="flex gap-6">
              {["Privacy Policy", "Terms of Service", "GDPR"].map(link => (
                <Link key={link} href="#" className="cursor-pointer text-slate-500 text-sm hover:text-slate-300 transition-colors duration-200">{link}</Link>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ── TRIAL DIALOG ── */}
      <Dialog open={trialOpen} onOpenChange={setTrialOpen}>
        <DialogContent className="bg-white max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-slate-900">Start Your Free Trial</DialogTitle>
          </DialogHeader>
          <p className="text-slate-500 text-sm mb-6">14 days free, full access, no credit card required. Our team will reach out within 30 minutes to get you set up.</p>
          <form className="space-y-4" onSubmit={e => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1 block">First Name</label>
                <input className="cursor-text w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-violet-400 transition-colors duration-200" placeholder="Priya" />
              </div>
              <div>
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1 block">Last Name</label>
                <input className="cursor-text w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-violet-400 transition-colors duration-200" placeholder="Rajendran" />
              </div>
            </div>
            <div>
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1 block">Work Email</label>
              <input type="email" className="cursor-text w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-violet-400 transition-colors duration-200" placeholder="priya@company.com" />
            </div>
            <div>
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1 block">Company Name</label>
              <input className="cursor-text w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-violet-400 transition-colors duration-200" placeholder="Vance Commerce" />
            </div>
            <div>
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1 block">Current Marketing Tools</label>
              <input className="cursor-text w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-violet-400 transition-colors duration-200" placeholder="e.g. Klaviyo, HubSpot, Mailchimp…" />
            </div>
            <div>
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1 block">Contact Database Size</label>
              <select className="cursor-pointer w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-violet-400 transition-colors duration-200 bg-white">
                <option>Under 10,000</option>
                <option>10,000 – 50,000</option>
                <option>50,000 – 250,000</option>
                <option>250,000 – 1,000,000</option>
                <option>1M+</option>
              </select>
            </div>
            <button type="submit" className="cursor-pointer w-full bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white font-black py-4 rounded-xl hover:opacity-90 transition-all duration-200 shadow-lg shadow-violet-500/25">
              Start Free Trial
            </button>
            <p className="text-slate-400 text-xs text-center">No credit card · Free migration · Cancel anytime</p>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
