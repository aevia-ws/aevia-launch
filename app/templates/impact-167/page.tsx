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
import { Menu, TrendingUp, DollarSign, PieChart, BarChart3, Shield, Target, CheckCircle2, ArrowRight, Star, Globe, RefreshCw, Zap, Calendar, Clock, Users, Building, Lock, Phone, ChevronRight } from "lucide-react"

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

function PortfolioDonut({ allocations }: { allocations: { label: string; pct: number; color: string }[] }) {
  const [hovered, setHovered] = useState<number | null>(null)
  return (
    <div className="flex flex-col md:flex-row items-center gap-6">
      <div className="relative w-40 h-40 flex-shrink-0">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          {allocations.reduce((acc, alloc, i) => {
            const offset = acc.offset
            const dashLen = (alloc.pct / 100) * 283
            const el = (
              <circle
                key={i}
                cx="50" cy="50" r="45"
                fill="none"
                stroke={alloc.color}
                strokeWidth="10"
                strokeDasharray={`${dashLen} ${283 - dashLen}`}
                strokeDashoffset={-offset}
                className="cursor-pointer transition-all duration-200"
                opacity={hovered === null || hovered === i ? 1 : 0.3}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              />
            )
            return { offset: offset + dashLen, elements: [...acc.elements, el] }
          }, { offset: 0, elements: [] as React.ReactNode[] }).elements}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-2xl font-black text-slate-900">{hovered !== null ? `${allocations[hovered].pct}%` : "100%"}</p>
            <p className="text-xs text-slate-400 font-semibold">{hovered !== null ? allocations[hovered].label : "Allocated"}</p>
          </div>
        </div>
      </div>
      <div className="space-y-2 w-full">
        {allocations.map((alloc, i) => (
          <div key={i} className="cursor-pointer flex items-center gap-3 hover:bg-slate-50 rounded-lg p-1.5 transition-all duration-200" onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
            <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: alloc.color }} />
            <span className="text-sm text-slate-600 font-semibold flex-1">{alloc.label}</span>
            <span className="text-sm font-black text-slate-900">{alloc.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const TESTIMONIALS = [
  {
    name: "Francesca Bellini", role: "Retired Physician", company: "Client since 2019",
    quote: "I inherited $2.4M and had no idea how to manage it responsibly. Meridian Wealth built a comprehensive plan in 6 weeks — tax-optimized, with a clearly defined drawdown strategy for my retirement. For the first time, I feel financially secure.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80",
    rating: 5, result: "Portfolio grew 28% in 3 years"
  },
  {
    name: "Alistair McGregor", role: "Founder & CEO", company: "Cairn Technology (acquired)",
    quote: "Post-exit, I needed to deploy $14M thoughtfully. Meridian's team understood the emotional complexity of liquidity events — not just the technical side. Their wealth structuring advice saved me over $900K in capital gains tax.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
    rating: 5, result: "$900K tax savings at liquidity event"
  },
  {
    name: "Yolanda & James Carter", role: "High-Net-Worth Couple", company: "Client since 2016",
    quote: "Our previous advisor put us in funds that were clearly beneficial to his commissions, not our retirement. Meridian is fiduciary-only. The difference is night and day. Our portfolio outperformed benchmarks by 4.2% annualized over 8 years.",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80",
    rating: 5, result: "+4.2% annualized alpha over 8 years"
  },
  {
    name: "Kenji Nakamura", role: "Partner", company: "NovaBridge Capital LP",
    quote: "Our partnership uses Meridian for all partner-level wealth planning. The estate planning integrations across our multi-generational families — trusts, dynasty planning, charitable vehicles — are exceptionally sophisticated.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80",
    rating: 5, result: "Multi-generational estate structured"
  },
  {
    name: "Dr. Amara Diallo", role: "Academic & Author", company: "Client since 2021",
    quote: "As someone who writes about inequality, I wanted an advisor who shared my values — ESG investing, community impact, and long-term wealth sustainability. Meridian built a fully values-aligned portfolio that has outperformed the S&P by 2.1% annually.",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80",
    rating: 5, result: "+2.1% vs S&P, ESG-aligned portfolio"
  },
]

const FAQS = [
  {
    q: "What is the minimum asset level to work with Meridian Wealth?",
    a: "Our standard private wealth management service begins at $500,000 in investable assets. For clients with $5M+ we offer our Apex Wealth tier with a dedicated senior advisor, tax strategy integration, estate planning coordination, and family governance services. For clients approaching $500K, we offer our Meridian Foundations program at a flat $199/month — a full financial plan plus quarterly advisor sessions with no AUM requirement."
  },
  {
    q: "Are Meridian advisors fiduciaries?",
    a: "Yes, unconditionally. Every Meridian advisor is a fee-only, registered investment advisor fiduciary. This means we are legally and ethically required to act in your best interest at all times. We earn no commissions, receive no referral fees, and have no revenue relationship with any fund company or insurance provider. Our only revenue comes from the advisory fees our clients pay us — ensuring our interests are perfectly aligned with yours."
  },
  {
    q: "How does Meridian's investment approach differ from traditional wealth management?",
    a: "Traditional wealth management often relies on expensive, actively managed funds that underperform their benchmark over 10+ year periods after fees. Meridian's core portfolio engine uses evidence-based, factor-tilted index investing at institutional cost structures — typically 8-18 basis points per year in fund costs versus an industry average of 80+. We then overlay tax-loss harvesting, direct indexing (for accounts over $500K), and tactical alternative exposures for qualified investors seeking additional diversification."
  },
  {
    q: "How is Meridian's performance measured and reported?",
    a: "Every Meridian client receives a personal performance portal showing real-time account values, transaction history, asset allocation drift, and benchmark-adjusted returns versus your chosen comparison index (S&P 500, 60/40 blend, or custom). Quarterly performance reports include tax-adjusted return calculations, Sharpe ratio, and a personalized progress-toward-goals metric. Annual comprehensive reviews are conducted in person or via video with your lead advisor."
  },
  {
    q: "Does Meridian provide tax planning and estate planning?",
    a: "Tax optimization is embedded in our investment management — we run tax-loss harvesting algorithms daily and use asset location strategies to minimize your lifetime tax burden. For estate planning, we work alongside your attorney to implement trust structures, beneficiary optimization, charitable giving vehicles (DAFs, CLATs, CRUTs), and business succession plans. Our in-house CPA team provides tax projection analysis and coordinates with external advisors for return preparation."
  },
  {
    q: "What happens to my investments if Meridian ceases operations?",
    a: "Client assets are held in custody at Schwab Institutional or Fidelity Institutional — two of the world's largest and most financially stable custodians. Meridian has no claim on or access to these assets beyond trading authority. If Meridian were to close, your assets would remain safely held at your custodian, fully accessible to you. Our SIPC-eligible accounts also carry standard SIPC protection of up to $500K per account."
  },
  {
    q: "Can Meridian work with business owners on business financial planning?",
    a: "Absolutely. A significant portion of our client base are business owners and entrepreneurs. We provide business valuation analysis, buy-sell funding strategies, defined benefit and cash balance plan design for tax deferral, entity structure advisory (S-corp vs. LLC vs. C-corp considerations), and pre-exit planning to maximize after-tax proceeds. We also specialize in liquidity event planning — helping founders navigate IPO lock-ups, concentrated stock positions, and post-acquisition wealth deployment."
  },
]

const PRICING_TIERS = [
  {
    name: "Foundations",
    price: "$199",
    period: "/ month",
    aum: "No minimum AUM",
    description: "For individuals building their financial foundation with guidance, a comprehensive plan, and ongoing support.",
    features: [
      "Comprehensive financial plan",
      "Annual advisor review session",
      "Quarterly portfolio checkups",
      "Tax-optimized investment portfolio",
      "Net worth & goal tracking dashboard",
      "Educational webinars & resources",
      "Email & chat advisor access",
    ],
    cta: "Start Free Month",
    highlight: false,
    badge: null,
  },
  {
    name: "Private Wealth",
    price: "0.75%",
    period: "AUM annually",
    aum: "$500K – $5M",
    description: "For high-net-worth clients seeking fully personalized investment management, tax integration, and planning.",
    features: [
      "Everything in Foundations",
      "Dedicated senior financial advisor",
      "Tax-loss harvesting (automated)",
      "Direct indexing (accounts $500K+)",
      "Estate planning coordination",
      "Insurance needs analysis",
      "Priority support (same-day response)",
      "Quarterly in-person or video reviews",
    ],
    cta: "Schedule Consultation",
    highlight: true,
    badge: "Most Popular",
  },
  {
    name: "Apex Wealth",
    price: "0.50%",
    period: "AUM annually",
    aum: "$5M+ minimum",
    description: "For ultra-high-net-worth families requiring multi-generational planning, alternative investments, and concierge service.",
    features: [
      "Everything in Private Wealth",
      "Dedicated wealth management team (3 advisors)",
      "Access to alternative investments (PE, hedge funds)",
      "Family governance & education",
      "Dynasty trust & charitable structure planning",
      "Business succession advisory",
      "CPA tax return coordination",
      "24/7 advisor accessibility",
    ],
    cta: "Request Private Consultation",
    highlight: false,
    badge: null,
  },
]

const PORTFOLIO_ALLOCATIONS = [
  { label: "Global Equities", pct: 42, color: "#3b82f6" },
  { label: "Fixed Income", pct: 28, color: "#10b981" },
  { label: "Real Assets", pct: 12, color: "#f59e0b" },
  { label: "Alternatives", pct: 10, color: "#8b5cf6" },
  { label: "Cash & Equivalents", pct: 8, color: "#64748b" },
]

const INVESTMENT_PHILOSOPHY = [
  { step: "01", title: "Evidence-Based Foundation", desc: "We build portfolios on 70+ years of academic research — prioritizing factor exposures (value, size, profitability, momentum) that have historically generated superior risk-adjusted returns across all market conditions." },
  { step: "02", title: "Tax Efficiency First", desc: "Investment decisions are made through a tax lens from day one. Asset location, tax-loss harvesting, direct indexing, and Roth conversion strategies are integrated into every portfolio — not added as afterthoughts." },
  { step: "03", title: "Risk-Calibrated Allocation", desc: "We model your complete balance sheet — not just your investment account. Your human capital, business interests, real estate, and Social Security timing all factor into your optimal investment allocation." },
  { step: "04", title: "Cost Minimization", desc: "We source institutional share classes and index funds at 8–18 basis points average cost — versus an industry average of 80+ bps. On a $1M portfolio, this difference compounds to $820,000 over 30 years." },
]

export default function MeridianWealthFintech() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const heroY = useTransform(scrollYProgress, [0, 0.4], [0, 100])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 50, damping: 25 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 25 })

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 60)
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 60)
    }
    window.addEventListener("mousemove", handler)
    return () => window.removeEventListener("mousemove", handler)
  }, [mouseX, mouseY])

  const [consultOpen, setConsultOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeGoal, setActiveGoal] = useState("retirement")

  return (
    <div ref={containerRef} style={{ overflowX: "hidden", scrollBehavior: "smooth" }} className="bg-white text-slate-900 min-h-screen font-sans">

      {/* ── BACKGROUND GRADIENTS ── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div style={{ x: springX, y: springY }} className="absolute top-0 right-0 w-[800px] h-[600px] bg-gradient-to-bl from-blue-50 via-indigo-50/50 to-transparent" />
      </div>

      {/* ── NAVBAR ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 bg-blue-700 rounded flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-black tracking-tight text-slate-900">Meridian<span className="text-blue-600">Wealth</span></span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {["How It Works", "Services", "Performance", "Pricing", "Resources"].map(item => (
              <Link key={item} href="#" className="cursor-pointer text-sm font-semibold text-slate-600 hover:text-blue-700 transition-all duration-200">{item}</Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link href="#" className="cursor-pointer text-sm font-semibold text-slate-600 hover:text-slate-900 transition-all duration-200 px-3 py-2">Log In</Link>
            <button onClick={() => setConsultOpen(true)} className="cursor-pointer bg-blue-700 text-white text-sm font-black px-5 py-2.5 rounded-lg hover:bg-blue-600 transition-all duration-200 shadow-lg shadow-blue-700/25">
              Get Started Free
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
                {["How It Works", "Services", "Performance", "Pricing", "Resources"].map(item => (
                  <Link key={item} href="#" className="cursor-pointer text-lg font-bold text-slate-700 hover:text-blue-600 transition-colors duration-200">{item}</Link>
                ))}
                <button onClick={() => setConsultOpen(true)} className="cursor-pointer bg-blue-700 text-white font-black py-3 rounded-lg hover:bg-blue-600 transition-all duration-200">
                  Get Started Free
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-28">
          <div className="max-w-3xl">
            <Reveal delay={0}>
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-1.5 mb-8 cursor-default">
                <Shield className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-blue-700 text-xs font-black uppercase tracking-widest">SEC-Registered · Fiduciary Only · No Commissions</span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-tight mb-6 tracking-tight">
                Wealth Planning<br />
                <span className="text-blue-700">Built for Your</span><br />
                Entire Life.
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-xl text-slate-500 mb-10 leading-relaxed font-light max-w-2xl">
                Evidence-based investing, tax optimization, and fiduciary financial planning — delivered by advisors who work exclusively for you. No conflicts. No commissions. Just results.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button onClick={() => setConsultOpen(true)} className="cursor-pointer bg-blue-700 text-white font-black px-8 py-4 rounded-xl hover:bg-blue-600 transition-all duration-200 text-lg shadow-xl shadow-blue-700/20 flex items-center gap-2 justify-center">
                  <Calendar className="w-5 h-5" /> Start Free Month
                </button>
                <Link href="#" className="cursor-pointer border border-slate-200 text-slate-700 font-bold px-8 py-4 rounded-xl hover:border-blue-300 hover:text-blue-700 transition-all duration-200 text-lg flex items-center gap-2 justify-center">
                  <BarChart3 className="w-5 h-5" /> See How We Invest
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="flex flex-wrap gap-6">
                {[
                  { icon: Shield, text: "100% Fiduciary" },
                  { icon: Lock, text: "Assets held at Schwab" },
                  { icon: CheckCircle2, text: "No investment minimums on Foundations" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-sm font-semibold text-slate-500">
                    <Icon className="w-4 h-4 text-blue-500" />{text}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Hero widget */}
          <motion.div style={{ y: heroY }} className="hidden xl:block absolute right-6 top-28 w-[440px]">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-700 to-blue-500 p-5">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-white font-black">Portfolio Overview</span>
                  <Badge className="bg-white/20 text-white border-0 text-xs cursor-default">Live</Badge>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <p className="text-blue-200 text-xs font-semibold mb-0.5">Total Value</p>
                    <p className="text-white font-black text-lg">$842,400</p>
                  </div>
                  <div>
                    <p className="text-blue-200 text-xs font-semibold mb-0.5">YTD Return</p>
                    <p className="text-emerald-300 font-black text-lg">+14.2%</p>
                  </div>
                  <div>
                    <p className="text-blue-200 text-xs font-semibold mb-0.5">vs Benchmark</p>
                    <p className="text-emerald-300 font-black text-lg">+2.8%</p>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Asset Allocation</p>
                <PortfolioDonut allocations={PORTFOLIO_ALLOCATIONS} />
              </div>
              <div className="px-5 pb-5">
                <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                    <p className="text-blue-700 text-xs font-bold">Tax-loss harvest opportunity: -$2,840 today</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="py-14 px-6 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
            {[
              { label: "Assets Under Management", value: 4200, prefix: "$", suffix: "M+" },
              { label: "Client Households", value: 12400, suffix: "+" },
              { label: "Average Annualized Alpha", value: 2.4, suffix: "%", decimals: 1 },
              { label: "Client Retention Rate", value: 97, suffix: "%" },
              { label: "Tax Saved for Clients (2025)", value: 28, prefix: "$", suffix: "M+" },
            ].map((stat, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="cursor-default">
                  <div className="text-3xl md:text-4xl font-black text-blue-400 mb-1">
                    <Counter target={stat.value} prefix={stat.prefix ?? ""} suffix={stat.suffix} decimals={stat.decimals ?? 0} />
                  </div>
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── GOAL-BASED PLANNING ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <Badge className="bg-blue-100 text-blue-700 border-blue-200 mb-4 cursor-default">Goal-Based Planning</Badge>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
                Your Money. Your Goals.<br /><span className="text-blue-700">Your Timeline.</span>
              </h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto font-light">We build every financial plan around the outcomes that matter to you — not generic benchmarks or asset-gathering targets.</p>
            </div>
          </Reveal>

          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {["retirement", "home", "education", "business", "legacy"].map(goal => (
              <button
                key={goal}
                onClick={() => setActiveGoal(goal)}
                className={`cursor-pointer px-5 py-2.5 rounded-xl font-bold text-sm capitalize transition-all duration-200 ${activeGoal === goal ? "bg-blue-700 text-white shadow-lg shadow-blue-700/20" : "bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-700"}`}
              >
                {goal === "home" ? "Home Purchase" : goal === "business" ? "Business Exit" : goal === "legacy" ? "Legacy / Estate" : goal.charAt(0).toUpperCase() + goal.slice(1)}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeGoal}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
            >
              {activeGoal === "retirement" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                  <div className="space-y-6">
                    <h3 className="text-3xl font-black text-slate-900">Retire When You Want. Not When the Math Forces You.</h3>
                    <p className="text-slate-500 leading-relaxed">We model your retirement readiness across 10,000 Monte Carlo simulations to give you probability-weighted confidence that your money will last as long as you do. Social Security optimization alone saves our clients an average of $67,000 in lifetime benefits.</p>
                    <div className="space-y-4">
                      {["Retirement income gap analysis and closure strategy", "Social Security claiming optimization (average +$67K lifetime)", "Safe withdrawal rate modeling at 95% confidence", "Healthcare cost projection and HSA maximization strategy", "Roth conversion ladder for lifetime tax minimization"].map(item => (
                        <div key={item} className="flex gap-3 cursor-default">
                          <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-600 text-sm font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                    <button onClick={() => setConsultOpen(true)} className="cursor-pointer bg-blue-700 text-white font-black px-6 py-3 rounded-xl hover:bg-blue-600 transition-all duration-200 inline-flex items-center gap-2">
                      Get My Retirement Analysis <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
                    <p className="text-sm font-black text-slate-400 uppercase tracking-widest mb-5">Retirement Readiness Projection</p>
                    <div className="space-y-4 mb-6">
                      {[
                        { label: "Projected at Age 65", val: "$2,840,000", good: true },
                        { label: "Annual Income Need (today's $)", val: "$112,000", good: null },
                        { label: "Social Security at 70", val: "+$48,200/yr", good: true },
                        { label: "Portfolio Survival Probability", val: "97.4%", good: true },
                        { label: "Target Retirement Age", val: "62 (current trajectory)", good: true },
                      ].map(item => (
                        <div key={item.label} className="flex justify-between items-center py-3 border-b border-slate-200">
                          <span className="text-slate-500 text-sm font-semibold">{item.label}</span>
                          <span className={`font-black text-sm ${item.good === true ? "text-emerald-600" : item.good === false ? "text-red-500" : "text-slate-900"}`}>{item.val}</span>
                        </div>
                      ))}
                    </div>
                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                      <p className="text-blue-700 text-xs font-bold">Increasing your savings rate by 2% now would push your target retirement age from 62 to 59. <span className="underline cursor-pointer">Run this scenario →</span></p>
                    </div>
                  </div>
                </div>
              )}

              {activeGoal === "home" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { icon: Target, title: "Down Payment Acceleration", desc: "We create a dedicated savings sub-portfolio with a target timeline, optimal investment mix, and monthly savings targets — with automated rebalancing as you approach your purchase date. Includes first-time buyer grant identification for your area.", metric: "Average client saves 18% faster vs savings account" },
                    { icon: DollarSign, title: "Mortgage Optimization", desc: "We model the rent vs. buy decision for your specific situation, analyze 30yr vs. 15yr payoff scenarios, and coordinate with mortgage advisors to structure your purchase in the most tax-efficient way. Points vs. rate tradeoff analysis included.", metric: "Average mortgage rate savings: 0.38% through optimization" },
                    { icon: Shield, title: "Home as a Balance Sheet Asset", desc: "We integrate your primary residence into your overall wealth plan — analyzing concentration risk, using home equity strategically, and planning for eventual sale or estate transfer to maximize lifetime wealth.", metric: "Home equity integrated with investment allocation model" },
                  ].map((f, i) => {
                    const Icon = f.icon
                    return (
                      <Card key={i} className="cursor-pointer border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 h-full">
                        <CardContent className="p-7">
                          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-5">
                            <Icon className="w-6 h-6 text-blue-700" />
                          </div>
                          <h3 className="text-xl font-black text-slate-900 mb-3">{f.title}</h3>
                          <p className="text-slate-500 text-sm leading-relaxed mb-4">{f.desc}</p>
                          <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                            <p className="text-blue-700 text-xs font-bold">{f.metric}</p>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              )}

              {["education", "business", "legacy"].includes(activeGoal) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                  <div className="space-y-5">
                    <h3 className="text-3xl font-black text-slate-900">
                      {activeGoal === "education" ? "College Planning Done Right" : activeGoal === "business" ? "Exit Planning for Maximum Value" : "Build a Legacy That Lasts"}
                    </h3>
                    <p className="text-slate-500 leading-relaxed">
                      {activeGoal === "education" ? "529 plan optimization, FAFSA strategy, and tax-efficient college funding analysis — saving families an average of $40,000 in higher education costs through strategic planning." : activeGoal === "business" ? "Business valuation, deal structure optimization, capital gains minimization strategies, and post-exit wealth deployment — our M&A-adjacent planning has saved business owners $900K+ in taxes at exit." : "Estate plan design, charitable giving vehicle structuring, trust implementation, and generational wealth education — preserving family wealth across multiple generations with the right legal and financial architecture."}
                    </p>
                    <div className="space-y-3">
                      {(activeGoal === "education" ? ["529 and Coverdell optimal contribution strategy", "FAFSA EFC minimization tactics", "Scholarship search and application strategy integration", "Comparison modeling: 529 vs. UTMA vs. Roth IRA"] : activeGoal === "business" ? ["Business valuation and sale readiness audit", "Installment sale, ESOP, and gifting strategy modeling", "Deal structure: asset vs. stock sale tax analysis", "Post-exit wealth deployment in 90 days"] : ["Revocable and irrevocable trust design", "Charitable vehicles: DAF, CLAT, CRUT", "Annual gifting program management", "Generation-skipping transfer (GST) planning"]).map(item => (
                        <div key={item} className="flex gap-3 cursor-default">
                          <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-600 text-sm font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                    <button onClick={() => setConsultOpen(true)} className="cursor-pointer bg-blue-700 text-white font-black px-6 py-3 rounded-xl hover:bg-blue-600 transition-all duration-200 inline-flex items-center gap-2">
                      Discuss Your Situation <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                    <Image src={activeGoal === "education" ? "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80" : activeGoal === "business" ? "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80" : "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80"} alt={activeGoal} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── INVESTMENT PHILOSOPHY ── */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <Badge className="bg-blue-100 text-blue-700 border-blue-200 mb-4 cursor-default">Investment Philosophy</Badge>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
                How We Build and<br /><span className="text-blue-700">Manage Your Portfolio</span>
              </h2>
            </div>
          </Reveal>

          <div className="space-y-5 mb-16">
            {INVESTMENT_PHILOSOPHY.map((item, idx) => (
              <Reveal key={idx} delay={idx * 0.07}>
                <div className="cursor-pointer group bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/5 p-8 flex flex-col md:flex-row gap-6 items-start md:items-center transition-all duration-300">
                  <span className="text-5xl font-black text-slate-100 group-hover:text-blue-100 transition-colors duration-300 flex-shrink-0 w-16">{item.step}</span>
                  <div className="flex-1">
                    <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-blue-700 transition-colors duration-200">{item.title}</h3>
                    <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-200 group-hover:text-blue-500 flex-shrink-0 transition-colors duration-200" />
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-8">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Sample Model Portfolio</p>
                <p className="text-lg font-black text-slate-900 mb-1">Balanced Growth</p>
                <p className="text-slate-500 text-xs mb-5">60/40 equity/bond blend, globally diversified</p>
                <PortfolioDonut allocations={PORTFOLIO_ALLOCATIONS} />
              </div>
              <div className="md:col-span-2 bg-blue-700 rounded-2xl p-8 text-white">
                <p className="text-xs font-black text-blue-200 uppercase tracking-widest mb-6">10-Year Hypothetical Performance</p>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { label: "Gross Return", val: "+142.8%", sub: "10 yr cumulative" },
                    { label: "Net of Fees", val: "+138.4%", sub: "after 0.75% AUM" },
                    { label: "vs. 60/40 Index", val: "+22.1%", sub: "alpha generated" },
                  ].map(metric => (
                    <div key={metric.label} className="bg-white/10 rounded-xl p-4">
                      <p className="text-blue-200 text-xs font-bold mb-1">{metric.label}</p>
                      <p className="text-white font-black text-xl">{metric.val}</p>
                      <p className="text-blue-300 text-xs mt-0.5">{metric.sub}</p>
                    </div>
                  ))}
                </div>
                <p className="text-blue-300 text-xs">Hypothetical performance. Past results do not guarantee future returns. Based on factor-tilted index portfolio, 2015-2025. Does not include taxes. Individual results vary based on portfolio customization, tax situation, and timing of contributions.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FEATURES TABS ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <Badge className="bg-blue-100 text-blue-700 border-blue-200 mb-4 cursor-default">Services</Badge>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
                Comprehensive Wealth Services<br /><span className="text-blue-700">in One Relationship</span>
              </h2>
            </div>
          </Reveal>

          <Tabs defaultValue="investments" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 max-w-2xl mx-auto mb-14 bg-slate-100 p-1 rounded-xl">
              {["investments", "tax", "estate", "insurance"].map(tab => (
                <TabsTrigger key={tab} value={tab} className="cursor-pointer rounded-lg font-bold capitalize transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm text-slate-500">
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="investments">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: BarChart3, title: "Portfolio Construction", desc: "Factor-tilted global portfolios built on 70+ years of academic evidence. Institutional pricing at 8–18bps vs. industry average 80+bps. Rebalanced automatically to maintain your target allocation.", items: ["Global diversification across 15,000+ securities", "Factor tilts: value, quality, size, momentum", "Institutional cost structure (avg. 12bps)"] },
                  { icon: RefreshCw, title: "Tax-Loss Harvesting", desc: "Our algorithms scan your portfolio daily for tax-loss harvesting opportunities — realizing losses to offset gains elsewhere while maintaining your investment exposure through similar-but-not-substantially-identical securities.", items: ["Daily automated TLH scanning", "Average annual tax alpha: 0.8–1.2%", "Wash-sale rule compliance guaranteed"] },
                  { icon: Target, title: "Direct Indexing", desc: "For accounts over $500K, we build a custom index by holding individual securities directly — enabling personalized TLH at the stock level, ESG exclusions, and concentrated position management unavailable in ETFs.", items: ["Tax-loss harvest individual securities daily", "Exclude specific stocks or sectors (ESG)", "Concentrated position integration"] },
                ].map((f, i) => {
                  const Icon = f.icon
                  return (
                    <Reveal key={i} delay={i * 0.1}>
                      <Card className="cursor-pointer border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 h-full">
                        <CardContent className="p-7">
                          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-5">
                            <Icon className="w-6 h-6 text-blue-700" />
                          </div>
                          <h3 className="text-xl font-black text-slate-900 mb-3">{f.title}</h3>
                          <p className="text-slate-500 text-sm leading-relaxed mb-5">{f.desc}</p>
                          <ul className="space-y-2">
                            {f.items.map(item => (
                              <li key={item} className="flex items-start gap-2 text-xs text-slate-500 font-semibold">
                                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 mt-0.5 flex-shrink-0" />{item}
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

            <TabsContent value="tax">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <Reveal>
                  <div className="space-y-5">
                    <h3 className="text-3xl font-black text-slate-900">Tax Planning That Works Year-Round, Not Just April</h3>
                    <p className="text-slate-500 leading-relaxed">Most advisors think about taxes once a year. We integrate tax strategy into every investment decision, every quarter — because tax minimization is the highest-return, lowest-risk improvement available to most investors.</p>
                    {[
                      { title: "Asset Location Optimization", desc: "Strategically placing tax-inefficient assets (bonds, REITs) in tax-advantaged accounts and tax-efficient assets (index ETFs, growth stocks) in taxable accounts — reducing your effective tax drag by 0.3–0.8% annually." },
                      { title: "Roth Conversion Ladder", desc: "Year-by-year Roth conversion modeling using low-income years and marginal rate thresholds to shift funds from pre-tax to tax-free — reducing lifetime RMDs and estate tax exposure." },
                      { title: "Qualified Opportunity Zone Investing", desc: "For clients with large capital gains, we evaluate QOZ funds as a tool for deferral and potential exclusion — with full underwriting on underlying real estate quality before any recommendation." },
                    ].map((item, i) => (
                      <div key={i} className="cursor-pointer p-5 bg-blue-50 rounded-xl border border-blue-100 hover:border-blue-300 transition-all duration-200">
                        <h4 className="font-black text-slate-900 mb-1">{item.title}</h4>
                        <p className="text-slate-500 text-sm">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </Reveal>
                <Reveal delay={0.2}>
                  <div className="bg-slate-900 rounded-2xl p-8">
                    <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-6">Tax Savings — Meridian vs. DIY Investor</p>
                    <p className="text-white text-xs mb-6">On a $1,000,000 balanced portfolio over 30 years</p>
                    {[
                      { label: "Tax-Loss Harvesting", saving: "$142,000" },
                      { label: "Asset Location", saving: "$96,000" },
                      { label: "Social Security Timing", saving: "$67,000" },
                      { label: "Roth Conversion Strategy", saving: "$83,000" },
                      { label: "Lower Fund Costs (vs. 80bps)", saving: "$820,000" },
                    ].map(item => (
                      <div key={item.label} className="flex justify-between items-center py-3 border-b border-slate-800">
                        <span className="text-slate-400 text-sm font-medium">{item.label}</span>
                        <span className="text-emerald-400 font-black text-sm">{item.saving}</span>
                      </div>
                    ))}
                    <div className="flex justify-between items-center pt-4 mt-2">
                      <span className="text-white font-black">Total Advantage</span>
                      <span className="text-emerald-400 font-black text-xl">$1,208,000</span>
                    </div>
                  </div>
                </Reveal>
              </div>
            </TabsContent>

            <TabsContent value="estate">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: Building, title: "Trust Design & Implementation", desc: "Revocable living trusts, irrevocable trusts, dynasty trusts, SLATs, and ILITs — we design the right trust architecture for your family's assets, relationships, and transfer goals. We coordinate directly with your estate attorney.", items: ["Revocable living trust (probate avoidance)", "Irrevocable trusts for estate tax reduction", "Dynasty trust (multi-generational planning)"] },
                  { icon: DollarSign, title: "Charitable Giving Strategy", desc: "Donor-Advised Funds, Charitable Remainder Trusts, Charitable Lead Annuity Trusts, and Qualified Charitable Distributions — we design giving vehicles that satisfy your philanthropic intent while maximizing tax efficiency.", items: ["DAF for appreciated asset gifting", "CLAT/CRUT for income + charitable legacy", "QCD from IRAs (tax-free at 70½)"] },
                  { icon: Users, title: "Family Governance & Education", desc: "Family wealth education workshops, beneficiary financial literacy programs, family investment policy statements, and multi-generational communication frameworks — ensuring the next generation is prepared to steward what you've built.", items: ["Annual family wealth meeting facilitation", "Beneficiary financial education program", "Family investment policy statement design"] },
                ].map((f, i) => {
                  const Icon = f.icon
                  return (
                    <Reveal key={i} delay={i * 0.1}>
                      <Card className="cursor-pointer border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 h-full">
                        <CardContent className="p-7">
                          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-5">
                            <Icon className="w-6 h-6 text-blue-700" />
                          </div>
                          <h3 className="text-xl font-black text-slate-900 mb-3">{f.title}</h3>
                          <p className="text-slate-500 text-sm leading-relaxed mb-5">{f.desc}</p>
                          <ul className="space-y-2">
                            {f.items.map(item => (
                              <li key={item} className="flex items-start gap-2 text-xs text-slate-500 font-semibold">
                                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 mt-0.5 flex-shrink-0" />{item}
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

            <TabsContent value="insurance">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <Reveal delay={0.1}>
                  <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                    <Image src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80" alt="Insurance" fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 bg-white rounded-xl p-5">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Insurance Review Findings</p>
                      <div className="space-y-2">
                        {["Life coverage: adequate ✓", "Disability: undercovered by $8,400/mo ✗", "Liability umbrella: recommended ($2M) ✗", "LTC: planning conversation scheduled"].map((item, i) => (
                          <p key={i} className={`text-xs font-bold ${item.includes("✓") ? "text-emerald-600" : item.includes("✗") ? "text-red-500" : "text-blue-600"}`}>{item}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
                <Reveal>
                  <div className="space-y-5">
                    <h3 className="text-3xl font-black text-slate-900">Insurance as a Financial Planning Tool, Not a Sale</h3>
                    <p className="text-slate-500 leading-relaxed">We receive zero commissions from insurance products. Our insurance analysis is purely advisory — we identify gaps in your protection strategy and help you shop the market independently for the best coverage at the lowest cost.</p>
                    {[
                      { title: "Life Insurance Analysis", desc: "Human capital replacement modeling, coverage gap calculation, and term vs. permanent decision framework. We compare quotes across 20+ carriers without any commission bias." },
                      { title: "Disability Coverage Review", desc: "Own-occupation vs. any-occupation definitions, elimination period optimization, and employer group coverage supplement analysis. The most underinsured risk for working professionals." },
                      { title: "Long-Term Care Planning", desc: "LTC insurance, self-insurance feasibility modeling, hybrid life/LTC policies, and Medicaid spend-down planning — evaluated in the context of your complete financial plan." },
                    ].map((item, i) => (
                      <div key={i} className="cursor-pointer flex gap-4 p-4 hover:bg-blue-50 rounded-xl transition-all duration-200 border border-transparent hover:border-blue-200">
                        <div className="w-2 bg-blue-400 rounded-full flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-black text-slate-900 mb-1 text-sm">{item.title}</h4>
                          <p className="text-slate-500 text-sm">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <Badge className="bg-blue-100 text-blue-700 border-blue-200 mb-4 cursor-default">Client Stories</Badge>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
                Wealth Built. Lives Changed.
              </h2>
            </div>
          </Reveal>
          <Carousel className="w-full">
            <CarouselContent className="-ml-4">
              {TESTIMONIALS.map((t, idx) => (
                <CarouselItem key={idx} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <Reveal delay={idx * 0.07}>
                    <Card className="cursor-pointer border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 h-full bg-white">
                      <CardContent className="p-7">
                        <div className="flex gap-0.5 mb-4">
                          {Array(t.rating).fill(0).map((_, i) => <Star key={i} className="w-4 h-4 fill-blue-500 text-blue-500" />)}
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed mb-5 italic">"{t.quote}"</p>
                        <div className="bg-blue-50 border border-blue-100 rounded-lg px-3 py-2 mb-5">
                          <p className="text-blue-700 text-xs font-black">{t.result}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10 ring-2 ring-blue-200">
                            <AvatarImage src={t.img} />
                            <AvatarFallback className="bg-blue-100 text-blue-700 font-bold text-xs">{t.name.split(" ").map(n => n[0]).join("").slice(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-slate-900 font-bold text-sm">{t.name}</p>
                            <p className="text-blue-600 text-xs font-semibold">{t.role} · {t.company}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Reveal>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="cursor-pointer border-slate-300 text-slate-600 hover:bg-slate-100 transition-all duration-200" />
            <CarouselNext className="cursor-pointer border-slate-300 text-slate-600 hover:bg-slate-100 transition-all duration-200" />
          </Carousel>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <Badge className="bg-blue-100 text-blue-700 border-blue-200 mb-4 cursor-default">Pricing</Badge>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
                Transparent, Aligned,<br /><span className="text-blue-700">Zero Conflicts.</span>
              </h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto font-light">Fee-only advisory. No commissions. No hidden charges. Your success is our success.</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {PRICING_TIERS.map((tier, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className={`cursor-pointer relative h-full rounded-2xl border-2 p-8 flex flex-col transition-all duration-300 hover:shadow-2xl ${tier.highlight ? "border-blue-700 bg-blue-700 shadow-xl shadow-blue-700/15" : "border-slate-200 bg-white hover:border-blue-200"}`}>
                  {tier.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <Badge className="bg-blue-700 text-white border-0 px-4 py-1 text-xs font-black">{tier.badge}</Badge>
                    </div>
                  )}
                  <div className="mb-6">
                    <h3 className={`text-2xl font-black mb-1 ${tier.highlight ? "text-white" : "text-slate-900"}`}>{tier.name}</h3>
                    <div className="flex items-end gap-1 mb-1">
                      <span className={`text-4xl font-black ${tier.highlight ? "text-white" : "text-slate-900"}`}>{tier.price}</span>
                      <span className={`text-sm font-semibold mb-1 ${tier.highlight ? "text-blue-200" : "text-slate-400"}`}>{tier.period}</span>
                    </div>
                    <p className={`text-xs font-black uppercase tracking-widest mb-3 ${tier.highlight ? "text-blue-200" : "text-blue-600"}`}>{tier.aum}</p>
                    <p className={`text-sm leading-relaxed ${tier.highlight ? "text-blue-100" : "text-slate-500"}`}>{tier.description}</p>
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {tier.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${tier.highlight ? "text-white" : "text-blue-500"}`} />
                        <span className={`text-sm font-medium ${tier.highlight ? "text-blue-100" : "text-slate-600"}`}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => setConsultOpen(true)} className={`cursor-pointer w-full py-3 rounded-xl font-black text-sm transition-all duration-200 ${tier.highlight ? "bg-white text-blue-700 hover:bg-blue-50" : "bg-blue-700 text-white hover:bg-blue-600 shadow-lg shadow-blue-700/20"}`}>
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
              <Badge className="bg-blue-100 text-blue-700 border-blue-200 mb-4 cursor-default">FAQ</Badge>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">
                Your Questions, Answered Honestly
              </h2>
            </div>
          </Reveal>
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((faq, idx) => (
              <Reveal key={idx} delay={idx * 0.04}>
                <AccordionItem value={`faq-${idx}`} className="cursor-pointer bg-white border border-slate-200 rounded-xl px-6 hover:border-blue-300 transition-all duration-200">
                  <AccordionTrigger className="cursor-pointer hover:text-blue-700 font-bold text-slate-900 py-5 text-left transition-colors duration-200">
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
      <section className="py-24 px-6 bg-blue-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <Reveal>
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-white/20">
              <TrendingUp className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
              Your Financial Future<br />
              <span className="text-blue-200">Starts With One Conversation.</span>
            </h2>
            <p className="text-blue-100 text-xl mb-10 font-light max-w-2xl mx-auto">
              Schedule a complimentary 60-minute financial planning consultation with a fiduciary advisor. No sales pitch. No obligation. Just an honest assessment of where you are and where you want to be.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => setConsultOpen(true)} className="cursor-pointer bg-white text-blue-700 font-black px-10 py-4 rounded-xl hover:bg-blue-50 transition-all duration-200 text-lg shadow-xl">
                <Calendar className="w-5 h-5 inline mr-2" />Schedule Free Consultation
              </button>
              <Link href="#" className="cursor-pointer border-2 border-white/30 text-white font-bold px-10 py-4 rounded-xl hover:bg-white/10 transition-all duration-200 text-lg flex items-center justify-center gap-2">
                <BarChart3 className="w-5 h-5" /> Get a Free Portfolio Review
              </Link>
            </div>
            <p className="text-blue-200 text-sm mt-8">SEC-registered investment advisor · Fiduciary at all times · No commissions, ever</p>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-slate-900 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 bg-blue-700 rounded flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-black text-white">Meridian<span className="text-blue-400">Wealth</span></span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
                SEC-registered, fiduciary-only wealth management for high-net-worth individuals, families, and business owners. No commissions. No conflicts. Just results.
              </p>
              <div className="flex gap-3">
                {[Globe, Globe, Globe].map((Icon, i) => (
                  <a key={i} href="#" className="cursor-pointer w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-all duration-200">
                    <Icon className="w-4 h-4 text-slate-400" />
                  </a>
                ))}
              </div>
            </div>
            {[
              { title: "Services", links: ["Investment Management", "Financial Planning", "Tax Strategy", "Estate Planning", "Insurance Review"] },
              { title: "Solutions", links: ["High-Net-Worth", "Business Owners", "Pre-Retirees", "Young Professionals", "Foundations"] },
              { title: "Company", links: ["About Us", "Our Advisors", "Blog & Insights", "Careers", "ADV Form 2A"] },
            ].map(col => (
              <div key={col.title}>
                <h4 className="text-slate-300 font-black text-sm uppercase tracking-widest mb-5">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map(link => (
                    <li key={link}><Link href="#" className="cursor-pointer text-slate-500 text-sm hover:text-blue-400 transition-colors duration-200 font-medium">{link}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Separator className="bg-slate-800 mb-8" />
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
              <p className="text-slate-500 text-sm mb-2">© 2026 Meridian Wealth Advisors LLC. All rights reserved. SEC-Registered Investment Advisor.</p>
              <p className="text-slate-700 text-xs max-w-2xl">Past performance is not a guarantee of future results. All investing involves risk, including possible loss of principal. This website is for informational purposes only and does not constitute investment, tax, or legal advice. Meridian Wealth is an SEC-registered investment advisor. Registration does not imply a certain level of skill or training.</p>
            </div>
            <div className="flex gap-6 flex-shrink-0">
              {["Privacy", "Terms", "ADV", "Disclosures"].map(link => (
                <Link key={link} href="#" className="cursor-pointer text-slate-600 text-sm hover:text-slate-300 transition-colors duration-200">{link}</Link>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ── CONSULTATION DIALOG ── */}
      <Dialog open={consultOpen} onOpenChange={setConsultOpen}>
        <DialogContent className="bg-white max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-slate-900">Schedule Your Free Consultation</DialogTitle>
          </DialogHeader>
          <p className="text-slate-500 text-sm mb-6">A fiduciary advisor will reach out within 2 business hours to confirm your session.</p>
          <form className="space-y-4" onSubmit={e => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1 block">First Name</label>
                <input className="cursor-text w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-400 transition-colors duration-200" placeholder="Francesca" />
              </div>
              <div>
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1 block">Last Name</label>
                <input className="cursor-text w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-400 transition-colors duration-200" placeholder="Bellini" />
              </div>
            </div>
            <div>
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1 block">Email</label>
              <input type="email" className="cursor-text w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-400 transition-colors duration-200" placeholder="francesca@example.com" />
            </div>
            <div>
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1 block">Phone</label>
              <input type="tel" className="cursor-text w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-400 transition-colors duration-200" placeholder="+1 (212) 555-0000" />
            </div>
            <div>
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1 block">Approximate Investable Assets</label>
              <select className="cursor-pointer w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-400 transition-colors duration-200 bg-white">
                <option>Under $250,000</option>
                <option>$250K – $500K</option>
                <option>$500K – $1M</option>
                <option>$1M – $5M</option>
                <option>$5M – $10M</option>
                <option>$10M+</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1 block">Primary Planning Goal</label>
              <select className="cursor-pointer w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-400 transition-colors duration-200 bg-white">
                <option>Retirement Planning</option>
                <option>Investment Management</option>
                <option>Tax Optimization</option>
                <option>Estate Planning</option>
                <option>Business / Exit Planning</option>
                <option>General Financial Plan</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1 block">Anything Else? (Optional)</label>
              <textarea rows={3} className="cursor-text w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-400 transition-colors duration-200 resize-none" placeholder="Current situation, urgent concerns, or preferred meeting times…" />
            </div>
            <button type="submit" className="cursor-pointer w-full bg-blue-700 text-white font-black py-4 rounded-xl hover:bg-blue-600 transition-all duration-200 shadow-lg shadow-blue-700/20">
              Request My Free Consultation
            </button>
            <p className="text-slate-400 text-xs text-center">No sales pressure. Fiduciary at all times. Your information is never shared.</p>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
