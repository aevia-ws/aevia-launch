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
import { Menu, Users, BriefcaseIcon, Search, Star, CheckCircle2, ChevronRight, BarChart3, Zap, Shield, Target, Clock, ArrowRight, Globe, Bell, UserCheck, FileText, TrendingUp, Building2, Mail } from "lucide-react"

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
    name: "Alicia Morgan",
    role: "Head of Talent Acquisition",
    company: "Meridian Financial Group",
    avatar: "AM",
    avatarImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80",
    quote: "TalentFlow cut our time-to-hire from 47 days down to 18. The AI screening alone saved our team over 200 hours last quarter. I can't imagine going back to manual shortlisting.",
    rating: 5,
    metric: "Time-to-hire reduced 62%"
  },
  {
    name: "James Okonkwo",
    role: "VP of People Operations",
    company: "Nexus Technologies",
    avatar: "JO",
    avatarImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    quote: "We scaled from 80 to 340 employees in 14 months using TalentFlow. The pipeline management and automated interview scheduling made hyper-growth feel manageable.",
    rating: 5,
    metric: "300% headcount growth supported"
  },
  {
    name: "Sara Lindström",
    role: "Recruiting Manager",
    company: "Boreal Health Systems",
    avatar: "SL",
    avatarImg: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80",
    quote: "The diversity analytics dashboard is a game-changer. We've improved representation at the senior level by 34% in two hiring cycles. Real data, real accountability.",
    rating: 5,
    metric: "34% improvement in D&I metrics"
  },
  {
    name: "David Rao",
    role: "Director of HR",
    company: "Crestwood Logistics",
    avatar: "DR",
    avatarImg: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80",
    quote: "Candidate experience scores jumped from 3.1 to 4.7 stars after switching to TalentFlow. The automated updates and seamless communication tools make every applicant feel valued.",
    rating: 5,
    metric: "Candidate NPS +52 points"
  },
  {
    name: "Priya Mehta",
    role: "Chief People Officer",
    company: "Strata SaaS",
    avatar: "PM",
    avatarImg: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80",
    quote: "The predictive retention scoring flagged three at-risk hires in our first month. We were able to intervene early and retain all three. The ROI on that alone was extraordinary.",
    rating: 5,
    metric: "3 retention risks intercepted"
  }
]

const PRICING = [
  {
    name: "Starter",
    price: "$149",
    period: "/month",
    description: "Perfect for small teams hiring up to 10 roles simultaneously.",
    features: [
      "Up to 10 active job postings",
      "AI-powered resume screening",
      "Branded careers page",
      "Email & SMS candidate communication",
      "Basic analytics dashboard",
      "2 recruiter seats included",
      "Standard integrations (LinkedIn, Indeed)"
    ],
    cta: "Start Free Trial",
    highlight: false,
    badge: null
  },
  {
    name: "Growth",
    price: "$449",
    period: "/month",
    description: "The complete recruiting stack for scaling teams.",
    features: [
      "Unlimited active job postings",
      "Advanced AI screening & ranking",
      "Video interview scheduling",
      "Diversity & inclusion analytics",
      "Custom hiring workflows",
      "10 recruiter seats included",
      "ATS integrations + API access",
      "Priority support (4-hour SLA)",
      "Candidate pipeline analytics"
    ],
    cta: "Start Free Trial",
    highlight: true,
    badge: "Most Popular"
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large organizations with complex, global hiring needs.",
    features: [
      "Everything in Growth",
      "Unlimited recruiter seats",
      "Predictive retention analytics",
      "Executive search module",
      "Global compliance toolkit",
      "Dedicated customer success manager",
      "SSO & advanced security",
      "Custom SLAs & uptime guarantees",
      "White-label option"
    ],
    cta: "Contact Sales",
    highlight: false,
    badge: null
  }
]

const FAQS = [
  {
    q: "How does TalentFlow's AI screening work?",
    a: "Our AI analyzes resumes and applications against your job requirements using natural language processing and structured scoring. It evaluates skills match, experience relevance, and role-specific signals — without using demographic data. Every decision is auditable and explainable to ensure compliance with EEOC guidelines."
  },
  {
    q: "Can TalentFlow integrate with our existing HRIS?",
    a: "Yes. TalentFlow integrates natively with Workday, SAP SuccessFactors, BambooHR, Rippling, and 40+ other platforms via our REST API and pre-built connectors. Our implementation team handles the configuration at no extra charge for Growth and Enterprise plans."
  },
  {
    q: "How long does onboarding typically take?",
    a: "Most teams are fully operational within 5 business days. Starter plans self-serve in under 2 hours. Enterprise implementations with custom workflows and HRIS integrations typically take 2–3 weeks, with a dedicated implementation manager assigned from day one."
  },
  {
    q: "Is candidate data stored securely and in compliance with GDPR?",
    a: "Absolutely. TalentFlow is SOC 2 Type II certified and fully GDPR compliant. Candidate data is encrypted at rest and in transit, stored in region-specific data centers, and automatically purged according to your configurable retention policies."
  },
  {
    q: "Does TalentFlow support structured interviews and scorecards?",
    a: "Yes. You can build custom interview scorecards for any role, assign them to interviewers, and collect structured feedback directly within the platform. Results are aggregated automatically for collaborative hiring decisions, with full audit trails."
  },
  {
    q: "What reporting and analytics are available?",
    a: "TalentFlow provides 30+ out-of-the-box reports covering pipeline velocity, source effectiveness, diversity metrics, interviewer performance, offer acceptance rates, and cost-per-hire. Enterprise plans include custom report builder and Looker/Tableau integration."
  },
  {
    q: "Can we post to multiple job boards from TalentFlow?",
    a: "Yes. One-click job distribution reaches LinkedIn, Indeed, Glassdoor, ZipRecruiter, and 80+ niche boards simultaneously. Job posts are automatically optimized with SEO best practices and tracked for performance analytics."
  }
]

export default function TalentFlowHRPage() {
  const [demoOpen, setDemoOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const heroY = useTransform(scrollYProgress, [0, 0.4], ["0%", "25%"])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0])
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
            <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-black text-slate-900 tracking-tight">TalentFlow</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {["Product", "Solutions", "Pricing", "Customers", "Resources"].map(item => (
              <Link key={item} href="#" className="text-sm font-semibold text-slate-600 hover:text-violet-600 transition-all duration-200 cursor-pointer">
                {item}
              </Link>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <Link href="#" className="text-sm font-semibold text-slate-700 hover:text-violet-600 transition-all duration-200 cursor-pointer px-4 py-2">
              Sign in
            </Link>
            <button
              onClick={() => setDemoOpen(true)}
              className="cursor-pointer px-5 py-2.5 bg-violet-600 text-white text-sm font-bold rounded-lg hover:bg-violet-700 transition-all duration-200 shadow-lg shadow-violet-500/25"
            >
              Get a Demo
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
                {["Product", "Solutions", "Pricing", "Customers", "Resources"].map(item => (
                  <Link key={item} href="#" className="text-lg font-bold text-slate-800 hover:text-violet-600 cursor-pointer transition-all duration-200">{item}</Link>
                ))}
                <Separator />
                <button className="cursor-pointer w-full py-3 bg-violet-600 text-white font-bold rounded-lg hover:bg-violet-700 transition-all duration-200">
                  Get a Demo
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative pt-24 pb-0 overflow-hidden bg-gradient-to-br from-slate-950 via-violet-950 to-slate-900 min-h-[92vh] flex items-center">
        <motion.div style={{ x: springX, y: springY }} className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-violet-500/15 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-3xl" />
        </motion.div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="space-y-8">
            <Reveal delay={0.05}>
              <div className="flex items-center gap-3">
                <Badge className="bg-violet-500/20 text-violet-300 border-violet-500/30 hover:bg-violet-500/20">
                  <Zap className="w-3 h-3 mr-1" /> AI-Powered Recruiting
                </Badge>
                <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20">
                  SOC 2 Certified
                </Badge>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-5xl md:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight text-white">
                Hire the best people,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-300">
                  twice as fast.
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="text-xl text-slate-300 leading-relaxed max-w-lg">
                TalentFlow is the AI-native recruiting platform that automates candidate screening, coordinates interviews, and delivers analytics that actually move the needle on time-to-hire and team diversity.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setDemoOpen(true)}
                  className="cursor-pointer flex items-center gap-2 px-7 py-4 bg-violet-500 text-white font-bold rounded-xl hover:bg-violet-400 transition-all duration-200 shadow-2xl shadow-violet-500/30 text-lg"
                >
                  Book a free demo <ArrowRight className="w-5 h-5" />
                </button>
                <button className="cursor-pointer flex items-center gap-2 px-7 py-4 border border-white/20 text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-200 text-lg">
                  See how it works
                </button>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="flex flex-wrap items-center gap-6 pt-2">
                <div className="flex -space-x-2">
                  {["AM","JO","SL","DR","PM"].map((initials, i) => (
                    <div key={i} className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 border-2 border-slate-900 flex items-center justify-center text-xs font-bold text-white">
                      {initials}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                  </div>
                  <p className="text-sm text-slate-400 mt-0.5">Trusted by <span className="text-white font-bold">4,800+</span> HR teams worldwide</p>
                </div>
              </div>
            </Reveal>
          </motion.div>
          <Reveal delay={0.2}>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <Image
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80"
                  alt="TalentFlow dashboard"
                  width={800}
                  height={560}
                  className="w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
              </div>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-2xl border border-slate-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <UserCheck className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">New match</p>
                    <p className="text-sm font-black text-slate-900">Senior Engineer — 94% fit</p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -top-6 -right-6 bg-white rounded-xl p-4 shadow-2xl border border-slate-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-violet-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Time-to-hire</p>
                    <p className="text-sm font-black text-slate-900">18 days avg. <span className="text-emerald-600">↓62%</span></p>
                  </div>
                </div>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-slate-900 py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {[
              { value: 4800, suffix: "+", label: "Companies hiring" },
              { value: 62, suffix: "%", label: "Faster time-to-hire" },
              { value: 2.3, suffix: "M", label: "Candidates screened" },
              { value: 98, suffix: "%", label: "Customer retention" },
              { value: 340, suffix: "+", label: "Job board integrations" },
              { value: 34, suffix: "%", label: "Better D&I outcomes" },
            ].map((stat, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-black text-violet-400 mb-1">
                    {stat.suffix === "M" ? (
                      <span><Counter target={stat.value} />M</span>
                    ) : (
                      <Counter target={stat.value} suffix={stat.suffix} />
                    )}
                  </div>
                  <p className="text-sm text-slate-400 font-medium">{stat.label}</p>
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
              <Badge className="mb-4 bg-violet-100 text-violet-700 border-violet-200 hover:bg-violet-100">Platform Features</Badge>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 leading-tight">
                Every tool your recruiting team needs
              </h2>
              <p className="text-xl text-slate-500 max-w-2xl mx-auto">
                From sourcing to onboarding, TalentFlow handles the entire hiring lifecycle in one unified platform.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Tabs defaultValue="sourcing" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-12 h-auto gap-2 bg-white border border-slate-200 p-2 rounded-xl">
                {[
                  { value: "sourcing", label: "AI Sourcing", icon: <Search className="w-4 h-4" /> },
                  { value: "screening", label: "Smart Screening", icon: <UserCheck className="w-4 h-4" /> },
                  { value: "interviews", label: "Interviews", icon: <Clock className="w-4 h-4" /> },
                  { value: "analytics", label: "Analytics", icon: <BarChart3 className="w-4 h-4" /> },
                ].map(tab => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="cursor-pointer flex items-center gap-2 py-3 px-4 rounded-lg data-[state=active]:bg-violet-600 data-[state=active]:text-white font-semibold transition-all duration-200"
                  >
                    {tab.icon} {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="sourcing">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <h3 className="text-3xl font-black text-slate-900">Find qualified candidates before they apply</h3>
                    <p className="text-lg text-slate-600 leading-relaxed">
                      TalentFlow's AI sourcing engine continuously scans LinkedIn, GitHub, Globe, and 80+ professional networks to surface passive candidates who match your exact role requirements — before they ever hit the job boards.
                    </p>
                    <ul className="space-y-4">
                      {[
                        "AI-driven candidate discovery across 200M+ profiles",
                        "Personalized outreach sequences with 3x reply rates",
                        "Boolean search builder with natural language input",
                        "Duplicate detection and candidate deduplication",
                        "Chrome extension for one-click LinkedIn imports",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700 font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <button className="cursor-pointer flex items-center gap-2 px-6 py-3 bg-violet-600 text-white font-bold rounded-xl hover:bg-violet-700 transition-all duration-200">
                      Explore AI Sourcing <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80"
                      alt="AI Sourcing"
                      width={700}
                      height={480}
                      className="w-full object-cover"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="screening">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <h3 className="text-3xl font-black text-slate-900">Screen 500 resumes in the time it takes to read 5</h3>
                    <p className="text-lg text-slate-600 leading-relaxed">
                      Our AI reads every application against your custom scoring rubric, identifying top-fit candidates and flagging potential concerns — all with full explainability so your team understands every recommendation.
                    </p>
                    <ul className="space-y-4">
                      {[
                        "Custom scoring rubrics per job role",
                        "Skills extraction with proficiency inference",
                        "Bias-mitigation controls and blind review mode",
                        "Knockout question logic with instant disqualification",
                        "Auto-generated candidate summaries for hiring managers",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700 font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <button className="cursor-pointer flex items-center gap-2 px-6 py-3 bg-violet-600 text-white font-bold rounded-xl hover:bg-violet-700 transition-all duration-200">
                      See screening demo <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    {[
                      { name: "Marcus T.", role: "Senior Product Designer", score: 94, label: "Excellent match" },
                      { name: "Elena K.", role: "Lead Frontend Engineer", score: 88, label: "Strong match" },
                      { name: "Omar S.", role: "Full-Stack Developer", score: 76, label: "Good match" },
                    ].map((candidate, i) => (
                      <Card key={i} className="cursor-pointer hover:border-violet-300 transition-all duration-200 hover:shadow-md">
                        <CardContent className="p-4 flex items-center gap-4">
                          <Avatar className="w-12 h-12">
                            <AvatarFallback className="bg-violet-100 text-violet-700 font-bold text-sm">
                              {candidate.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-slate-900">{candidate.name}</p>
                            <p className="text-sm text-slate-500">{candidate.role}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-black text-violet-600">{candidate.score}</p>
                            <Badge className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50">{candidate.label}</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="interviews">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <h3 className="text-3xl font-black text-slate-900">Coordinate complex interview loops without the chaos</h3>
                    <p className="text-lg text-slate-600 leading-relaxed">
                      TalentFlow's interview scheduling engine syncs with every interviewer's calendar, finds optimal slots, sends automated reminders, and collects structured scorecards — end-to-end, without a single back-and-forth email.
                    </p>
                    <ul className="space-y-4">
                      {[
                        "Auto-scheduling based on interviewer availability",
                        "Zoom, Google Meet, and Microsoft Teams native integration",
                        "Structured scorecard builder with rating scales",
                        "Automated reminders for candidates and interviewers",
                        "Video interview recording and transcript storage",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700 font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src="https://images.unsplash.com/photo-1516321318423-f06f70e504fe?w=800&q=80"
                      alt="Interview coordination"
                      width={700}
                      height={480}
                      className="w-full object-cover"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="analytics">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <h3 className="text-3xl font-black text-slate-900">Analytics that tell you where the bottlenecks are</h3>
                    <p className="text-lg text-slate-600 leading-relaxed">
                      Real-time dashboards give you visibility into every stage of your hiring funnel. Track source ROI, interviewer scorecards, pipeline velocity, and diversity trends — then act on the data with built-in workflow recommendations.
                    </p>
                    <div className="space-y-4">
                      {[
                        { label: "Pipeline conversion rate", value: 78, color: "bg-violet-500" },
                        { label: "Offer acceptance rate", value: 91, color: "bg-emerald-500" },
                        { label: "Interviewer response time", value: 65, color: "bg-amber-500" },
                      ].map((metric, i) => (
                        <div key={i} className="space-y-1.5">
                          <div className="flex justify-between text-sm font-semibold text-slate-700">
                            <span>{metric.label}</span><span>{metric.value}%</span>
                          </div>
                          <Progress value={metric.value} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
                      alt="Analytics dashboard"
                      width={700}
                      height={480}
                      className="w-full object-cover"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Reveal>
        </div>
      </section>

      {/* ── TESTIMONIALS CAROUSEL ── */}
      <section className="py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-50">Customer Stories</Badge>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">What HR leaders are saying</h2>
              <p className="text-xl text-slate-500">Real results from real teams who transformed their recruiting with TalentFlow.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Carousel className="w-full">
              <CarouselContent>
                {TESTIMONIALS.map((t, i) => (
                  <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3 pl-6">
                    <Card className="cursor-pointer h-full hover:shadow-xl hover:border-violet-200 transition-all duration-300 border-slate-200">
                      <CardContent className="p-7 flex flex-col h-full">
                        <div className="flex gap-1 mb-4">
                          {[...Array(t.rating)].map((_, j) => (
                            <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <p className="text-slate-700 leading-relaxed mb-6 flex-1 text-[15px] italic">"{t.quote}"</p>
                        <Badge className="mb-5 bg-violet-50 text-violet-700 border-violet-100 self-start hover:bg-violet-50 text-xs font-bold">
                          {t.metric}
                        </Badge>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-11 h-11">
                            <AvatarImage src={t.avatarImg} alt={t.name} />
                            <AvatarFallback className="bg-violet-100 text-violet-700 font-bold text-sm">{t.avatar}</AvatarFallback>
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
              <CarouselPrevious className="cursor-pointer -left-4 bg-white border-slate-200 hover:bg-violet-50 hover:border-violet-300 transition-all duration-200" />
              <CarouselNext className="cursor-pointer -right-4 bg-white border-slate-200 hover:bg-violet-50 hover:border-violet-300 transition-all duration-200" />
            </Carousel>
          </Reveal>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="py-28 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-violet-100 text-violet-700 border-violet-200 hover:bg-violet-100">Transparent Pricing</Badge>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Plans that grow with your team</h2>
              <p className="text-xl text-slate-500 max-w-xl mx-auto">No per-seat surprises. No hidden fees. Cancel anytime.</p>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {PRICING.map((plan, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <Card className={`cursor-pointer relative h-full flex flex-col transition-all duration-300 hover:shadow-2xl ${plan.highlight ? "border-2 border-violet-500 shadow-xl shadow-violet-500/15 scale-[1.02]" : "border-slate-200 hover:border-violet-300"}`}>
                  {plan.badge && (
                    <div className="absolute -top-4 left-0 right-0 flex justify-center">
                      <Badge className="bg-violet-600 text-white border-violet-600 px-4 py-1 text-sm font-bold hover:bg-violet-600">
                        {plan.badge}
                      </Badge>
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
                          <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.highlight ? "text-violet-600" : "text-slate-400"}`} />
                          <span className="text-sm text-slate-700">{f}</span>
                        </li>
                      ))}
                    </ul>
                    <button className={`cursor-pointer w-full py-3.5 font-bold rounded-xl transition-all duration-200 text-sm ${plan.highlight ? "bg-violet-600 text-white hover:bg-violet-700 shadow-lg shadow-violet-500/25" : "border-2 border-slate-300 text-slate-800 hover:border-violet-400 hover:text-violet-700"}`}>
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
              <h2 className="text-4xl md:text-5xl font-black text-slate-900">Everything you need to know</h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Accordion type="single" collapsible className="space-y-3">
              {FAQS.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border border-slate-200 rounded-xl px-6 hover:border-violet-300 transition-all duration-200">
                  <AccordionTrigger className="cursor-pointer font-bold text-slate-900 hover:text-violet-700 py-5 text-left transition-all duration-200 hover:no-underline">
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
      <section className="py-28 px-6 bg-gradient-to-br from-violet-600 via-violet-700 to-indigo-800">
        <div className="max-w-5xl mx-auto text-center">
          <Reveal>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              Ready to hire smarter?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-xl text-violet-200 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join 4,800+ companies using TalentFlow to build exceptional teams faster. Your first 14 days are completely free — no credit card required.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => setDemoOpen(true)}
                className="cursor-pointer flex items-center gap-2 px-8 py-4 bg-white text-violet-700 font-black rounded-xl hover:bg-violet-50 transition-all duration-200 shadow-2xl text-lg"
              >
                Start Free Trial <ArrowRight className="w-5 h-5" />
              </button>
              <button className="cursor-pointer flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-200 text-lg">
                <BriefcaseIcon className="w-5 h-5" /> Talk to Sales
              </button>
            </div>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="flex flex-wrap items-center justify-center gap-8 mt-12 text-violet-200">
              {["No credit card required", "14-day free trial", "Cancel anytime", "Setup in minutes"].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-violet-300" /> {item}
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
                <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-black">TalentFlow</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                The AI-native recruiting platform that helps companies hire the best people, twice as fast.
              </p>
              <div className="flex items-center gap-3 mt-5">
                {[Globe, Globe, Globe].map((Icon, i) => (
                  <Link key={i} href="#" className="cursor-pointer w-9 h-9 rounded-lg bg-slate-800 hover:bg-violet-600 flex items-center justify-center transition-all duration-200">
                    <Icon className="w-4 h-4 text-slate-300" />
                  </Link>
                ))}
              </div>
            </div>
            {[
              { heading: "Product", links: ["AI Sourcing", "Smart Screening", "Interview Scheduling", "Analytics", "Integrations", "API"] },
              { heading: "Solutions", links: ["Startups", "Enterprise", "Agencies", "High-Volume Hiring", "Technical Recruiting"] },
              { heading: "Company", links: ["About", "Careers", "Blog", "Press", "Contact", "Partners"] },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="font-black text-sm text-slate-300 uppercase tracking-wider mb-4">{col.heading}</h4>
                <ul className="space-y-2.5">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <Link href="#" className="cursor-pointer text-sm text-slate-500 hover:text-violet-400 transition-all duration-200">{link}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Separator className="bg-slate-800 mb-8" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">© 2026 TalentFlow Inc. All rights reserved.</p>
            <div className="flex items-center gap-6">
              {["Privacy Policy", "Terms of Service", "Cookie Settings", "GDPR"].map((item, i) => (
                <Link key={i} href="#" className="cursor-pointer text-xs text-slate-500 hover:text-violet-400 transition-all duration-200">{item}</Link>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ── DEMO DIALOG ── */}
      <Dialog open={demoOpen} onOpenChange={setDemoOpen}>
        <DialogContent className="bg-white max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-slate-900">Book your free demo</DialogTitle>
          </DialogHeader>
          <p className="text-slate-500 text-sm mb-4">A TalentFlow expert will walk you through the platform and answer your questions in a 30-minute live session.</p>
          <div className="space-y-3">
            <input type="text" placeholder="Your full name" className="cursor-text w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-violet-500 transition-all duration-200" />
            <input type="email" placeholder="Work email address" className="cursor-text w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-violet-500 transition-all duration-200" />
            <input type="text" placeholder="Company name" className="cursor-text w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-violet-500 transition-all duration-200" />
            <select className="cursor-pointer w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-violet-500 bg-white transition-all duration-200 text-slate-600">
              <option>Company size</option>
              <option>1–50 employees</option>
              <option>51–200 employees</option>
              <option>201–1,000 employees</option>
              <option>1,000+ employees</option>
            </select>
            <button className="cursor-pointer w-full py-3.5 bg-violet-600 text-white font-bold rounded-xl hover:bg-violet-700 transition-all duration-200 shadow-lg shadow-violet-500/25 text-sm">
              Schedule My Demo
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
