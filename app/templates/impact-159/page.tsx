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
import { BookOpen, Play, Award, Users, BarChart2, Star, Clock, Check, ArrowRight, ChevronRight, Menu, Globe, TrendingUp, Zap, GraduationCap, Layers, Monitor, FileText, Trophy, Sparkles, Headphones } from "lucide-react"

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

const navLinks = ["Courses", "Paths", "For Teams", "Instructors", "Pricing"]

const stats = [
  { value: 4200000, suffix: "+", label: "Active Learners", icon: Users },
  { value: 12800, suffix: "+", label: "Expert-Led Courses", icon: BookOpen },
  { value: 96, suffix: "%", label: "Job Placement Rate", icon: TrendingUp },
  { value: 4.8, suffix: "/5", label: "Learner Rating", icon: Star },
  { value: 180, suffix: "+", label: "Countries Reached", icon: Globe },
  { value: 520, suffix: "+", label: "Industry Experts", icon: Award },
]

const courseTabs = [
  {
    id: "tech",
    label: "Technology",
    icon: Monitor,
    headline: "Master in-demand tech skills faster than a bootcamp",
    description: "From Python fundamentals to advanced machine learning pipelines, NexLearn's technology catalog covers 2,400+ courses taught by engineers from Google, Netflix, Meta, and top startups. Every course includes hands-on projects, live coding environments, and peer code reviews.",
    items: [
      "Python, JavaScript, TypeScript, Go, Rust — beginner to expert tracks",
      "Machine Learning, Deep Learning, LLMOps, and AI Engineering paths",
      "Full-stack web development: React, Next.js, Node, PostgreSQL, Redis",
      "Cloud certifications: AWS, GCP, Azure — exam prep included",
      "DevOps and platform engineering: Kubernetes, Terraform, CI/CD",
      "Hands-on cloud sandboxes with real infrastructure — no setup required",
    ],
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
    badge: "Most Popular",
    courseCount: "2,400+ courses",
  },
  {
    id: "business",
    label: "Business",
    icon: BarChart2,
    headline: "Build strategic skills that advance your career",
    description: "NexLearn's business curriculum covers everything from startup strategy and product management to financial modeling and executive communication. Courses are taught by Fortune 500 executives, Harvard MBAs, and seasoned founders who've built category-defining companies.",
    items: [
      "Product management: roadmapping, OKRs, and stakeholder alignment",
      "Financial modeling, startup funding, and VC pitch preparation",
      "Data-driven marketing: SEO, paid acquisition, and growth loops",
      "Leadership and management: from IC to Director and VP tracks",
      "Operations management: supply chain, logistics, and lean methodologies",
      "MBA-style case studies from Amazon, Apple, and McKinsey frameworks",
    ],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    badge: "Career-Changing",
    courseCount: "1,800+ courses",
  },
  {
    id: "design",
    label: "Design & UX",
    icon: Layers,
    headline: "Go from wireframe to pixel-perfect in record time",
    description: "Comprehensive design education from UI fundamentals to motion design. Learn Globe, Framer, Adobe Creative Suite, and Webflow from working designers at Airbnb, Spotify, and leading product agencies. Build a portfolio that lands your next design role.",
    items: [
      "UI/UX design: research, wireframing, prototyping, and usability testing",
      "Globe mastery: components, auto-layout, design systems, and variables",
      "Motion design and micro-interactions with After Effects and Framer",
      "Graphic design and brand identity: typography, color, and layout",
      "Design systems: building and scaling component libraries at enterprise level",
      "Portfolio building workshops with live critique sessions from senior designers",
    ],
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    badge: "Portfolio-Focused",
    courseCount: "960+ courses",
  },
  {
    id: "data",
    label: "Data & Analytics",
    icon: BarChart2,
    headline: "Turn raw data into decisions that move companies forward",
    description: "Data science and analytics education covering the full stack from SQL and Excel to advanced statistical modeling and MLOps. Industry-recognized certificates included with every completed learning path. Connect with a network of 180,000+ data professionals.",
    items: [
      "SQL, Python for data analysis, and R programming fundamentals",
      "Data visualization: Tableau, Power BI, and D3.js for custom charts",
      "Statistics and A/B testing: experimental design and inference",
      "Business intelligence: building executive dashboards and data pipelines",
      "Advanced analytics: cohort analysis, LTV modeling, and churn prediction",
      "Capstone projects using real datasets from Kaggle and industry partners",
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    badge: "High ROI",
    courseCount: "1,100+ courses",
  },
]

const testimonials = [
  {
    name: "Aisha Okafor",
    role: "Software Engineer",
    company: "Google (hired after NexLearn)",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    rating: 5,
    text: "I landed my Google offer six months after starting the Python and Machine Learning path. The hands-on projects and code reviews were what set NexLearn apart — I was writing real production-quality code from week three. Best investment I've made in my career.",
    course: "ML Engineering Path",
    completionTime: "5 months",
  },
  {
    name: "Thomas Mueller",
    role: "Product Manager",
    company: "Spotify",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    rating: 5,
    text: "The Product Management certification genuinely transformed how I approach product work. The OKR frameworks, stakeholder communication templates, and the roadmap prioritization workshops are immediately applicable. I got promoted within 3 months of completing the path.",
    course: "Product Management Certificate",
    completionTime: "4 months",
  },
  {
    name: "Sofia Petrov",
    role: "UX Designer",
    company: "Airbnb",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80",
    rating: 5,
    text: "I came in with zero design experience. NexLearn's UX path took me from beginner to job-ready in 6 months. The portfolio workshops were priceless — having senior Airbnb designers critique my work and help me frame my case studies made all the difference.",
    course: "UX Design Path",
    completionTime: "6 months",
  },
  {
    name: "Carlos Ramirez",
    role: "Data Analyst",
    company: "Stripe",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    rating: 5,
    text: "Started with SQL basics and 8 months later I'm doing advanced A/B testing and LTV modeling at Stripe. The real dataset projects are what sold me — by the time I interviewed, I had three substantial data projects in my portfolio. Interviewers were genuinely impressed.",
    course: "Data Analytics Path",
    completionTime: "8 months",
  },
  {
    name: "Yuki Yamamoto",
    role: "Full-Stack Engineer",
    company: "Vercel",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    rating: 5,
    text: "The React and Next.js content is miles ahead of anything on YouTube. The instructors are engineers at top companies who explain the why behind patterns, not just the what. I built a production app during the course that I now use as a live demo in every interview.",
    course: "Full-Stack Web Development",
    completionTime: "7 months",
  },
]

const pricingTiers = [
  {
    name: "Explorer",
    price: "$0",
    period: "forever free",
    description: "Access hundreds of free preview lessons and sample courses to test our teaching style before committing.",
    features: [
      "Access to 500+ free course previews",
      "Limited-access to 3 free full courses",
      "Community forum access",
      "Course completion certificates (3 max)",
      "Mobile and desktop access",
    ],
    cta: "Start Learning Free",
    recommended: false,
    highlight: "",
  },
  {
    name: "Pro Learner",
    price: "$29",
    period: "per month",
    description: "Unlimited access to all 12,800+ courses, learning paths, certificates, and career support.",
    features: [
      "Unlimited access to all 12,800+ courses",
      "All learning paths and certificates",
      "Downloadable resources and exercises",
      "AI-powered learning recommendations",
      "1-on-1 mentorship sessions (4/month)",
      "Live instructor Q&A sessions",
      "Job board access and career coaching",
      "Offline access via mobile app",
    ],
    cta: "Start 7-Day Free Trial",
    recommended: true,
    highlight: "Most chosen by career changers",
  },
  {
    name: "Teams",
    price: "$22",
    period: "per seat / month",
    description: "For companies investing in employee upskilling with team dashboards, analytics, and custom paths.",
    features: [
      "Everything in Pro Learner",
      "Centralized team learning dashboard",
      "Custom learning path creation",
      "Progress tracking and reporting",
      "Manager insights and skill gap reports",
      "SSO and SCIM provisioning",
      "Dedicated customer success manager",
      "Volume discounts at 50+ seats",
    ],
    cta: "Get Team Demo",
    recommended: false,
    highlight: "",
  },
]

const faqItems = [
  {
    q: "How is NexLearn different from free resources like YouTube or Coursera?",
    a: "NexLearn courses are structured, project-driven learning paths — not a library of disconnected videos. Every path has a clear outcome (a job, a promotion, a specific skill), built-in accountability tools like progress tracking and peer accountability groups, and live instructor support. Our 96% job placement rate reflects the difference between passive watching and active, structured learning.",
  },
  {
    q: "Can I really get a job after completing a NexLearn path?",
    a: "Our data says yes: 96% of learners who complete a full learning path and engage with our career coaching services report a job placement or promotion within 12 months. We offer personalized resume reviews, mock interview sessions with industry professionals, and a job board with 4,000+ partner companies actively hiring NexLearn graduates.",
  },
  {
    q: "How long does it take to complete a learning path?",
    a: "Most paths are designed for learners dedicating 10–15 hours per week. At that pace, a typical 6-month path takes 5–6 months. Many learners complete in 4 months by moving faster. Every path is fully self-paced — there are no deadlines, and you keep access to all content you've unlocked even after completing.",
  },
  {
    q: "Are NexLearn certificates recognized by employers?",
    a: "NexLearn certificates are recognized by 3,200+ hiring partner companies including Google, Amazon, Salesforce, and McKinsey. We're accredited by the International Association of Online Education (IAOE). Many learners add certificates to LinkedIn and report significantly higher recruiter contact rates within 30 days.",
  },
  {
    q: "What if I'm completely new to a topic?",
    a: "Every learning path starts with a skills assessment that places you at the right level — from absolute beginner to advanced. You're never dropped into the deep end. Our beginner-friendly paths have been completed by career changers with zero prior background in tech, design, and data science.",
  },
  {
    q: "Is there a student or income-share option?",
    a: "Yes. NexLearn offers income-share agreements (ISA) for full learning paths in software engineering and data science — you pay nothing upfront and a percentage of salary only after you land a job above $60K. Student discounts of 50% are available with a valid .edu email. Contact our team for details.",
  },
  {
    q: "Can my company pay for my subscription?",
    a: "Absolutely. We provide invoicing for corporate reimbursement and have a Teams plan with volume pricing, centralized billing, and a learning management dashboard. Many learners get their employers to cover the cost as a professional development benefit — we provide a one-page ROI document for HR teams.",
  },
]

const learningPaths = [
  { title: "Software Engineering", duration: "6 months", level: "Beginner–Advanced", jobs: "3,400+ open roles", img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80", salary: "$115K avg" },
  { title: "Data Science & ML", duration: "8 months", level: "Intermediate–Expert", jobs: "2,100+ open roles", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80", salary: "$128K avg" },
  { title: "Product Management", duration: "4 months", level: "Mid-Career", jobs: "1,800+ open roles", img: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&q=80", salary: "$108K avg" },
  { title: "UX & Product Design", duration: "6 months", level: "Beginner–Mid", jobs: "2,600+ open roles", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80", salary: "$96K avg" },
]

export default function NexLearnPlatform() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const heroY = useTransform(scrollYProgress, [0, 0.4], [0, 100])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])
  const [demoOpen, setDemoOpen] = useState(false)
  const [selectedPath, setSelectedPath] = useState<typeof learningPaths[0] | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div ref={containerRef} style={{ overflowX: "hidden", scrollBehavior: "smooth" }} className="min-h-screen bg-white text-slate-900 font-sans">

      {/* ── NAVBAR ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-black text-slate-900">NexLearn</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link key={link} href="#" className="text-sm font-medium text-slate-600 hover:text-emerald-600 cursor-pointer transition-all duration-200">{link}</Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link href="#" className="text-sm font-semibold text-slate-700 hover:text-emerald-600 cursor-pointer transition-all duration-200 px-4 py-2">Log in</Link>
            <button onClick={() => setDemoOpen(true)} className="bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold px-5 py-2.5 rounded-lg cursor-pointer transition-all duration-200 shadow-sm">
              Start Learning Free
            </button>
          </div>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button className="md:hidden p-2 cursor-pointer hover:bg-slate-100 rounded-lg transition-all duration-200">
                <Menu className="w-5 h-5 text-slate-700" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-white">
              <div className="flex flex-col gap-4 mt-8">
                {navLinks.map(link => (
                  <Link key={link} href="#" className="text-base font-semibold text-slate-700 hover:text-emerald-600 cursor-pointer transition-all duration-200 py-2 border-b border-slate-100">{link}</Link>
                ))}
                <button className="mt-4 bg-emerald-500 text-white font-bold py-3 rounded-lg cursor-pointer hover:bg-emerald-600 transition-all duration-200">Start Learning Free</button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-6 overflow-hidden">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-cyan-50" />
          <div className="absolute top-24 right-1/4 w-96 h-96 bg-emerald-200 rounded-full blur-3xl opacity-25" />
          <div className="absolute bottom-16 left-1/4 w-72 h-72 bg-cyan-200 rounded-full blur-3xl opacity-20" />
        </motion.div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <Reveal>
            <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 px-4 py-1.5 text-xs font-bold mb-6 cursor-pointer hover:bg-emerald-200 transition-all duration-200">
              <Trophy className="w-3 h-3 mr-1.5 inline" />
              #1 Online Learning Platform for Career Changers — 2025
            </Badge>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-tight tracking-tight mb-6">
              Learn the skills that
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500">get you hired.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-10">
              4.2 million learners have used NexLearn to master technology, design, data, and business skills — and land roles at Google, Stripe, Airbnb, and beyond. Join them today.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <MagneticBtn onClick={() => setDemoOpen(true)} className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-emerald-100 transition-all duration-200 text-base flex items-center gap-2">
                Start for Free <ArrowRight className="w-4 h-4" />
              </MagneticBtn>
              <button className="flex items-center gap-2 text-slate-700 font-semibold px-6 py-4 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 cursor-pointer transition-all duration-200">
                <Play className="w-4 h-4 text-emerald-500" /> Browse All Courses
              </button>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500 font-medium">
              {["7-day free trial", "No credit card needed", "Self-paced learning", "Job placement guarantee"].map((item, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500" /> {item}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.5}>
            <div className="mt-16 relative rounded-2xl overflow-hidden shadow-2xl border border-slate-100">
              <Image src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80" alt="NexLearn learning interface" width={1200} height={680} className="w-full object-cover" />
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
                  <s.icon className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
                  <div className="text-3xl font-black text-white mb-1"><Counter target={s.value} suffix={s.suffix} /></div>
                  <p className="text-slate-400 text-xs font-medium">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEARNING PATHS SPOTLIGHT ── */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 mb-4">Career Paths</Badge>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Start your path to a new career</h2>
              <p className="text-lg text-slate-500 max-w-xl mx-auto">Structured, outcome-driven learning paths with job placement support. Real skills, real projects, real results.</p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {learningPaths.map((path, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => setSelectedPath(path)}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden cursor-pointer hover:border-emerald-300 hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative h-44 overflow-hidden">
                    <Image src={path.img} alt={path.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                    <Badge className="absolute top-3 left-3 bg-emerald-500 text-white border-0 text-xs">{path.salary}</Badge>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-black text-slate-900 mb-2">{path.title}</h3>
                    <div className="flex flex-col gap-1.5 mb-4">
                      <span className="flex items-center gap-1.5 text-xs text-slate-500"><Clock className="w-3.5 h-3.5" />{path.duration} · {path.level}</span>
                      <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold"><TrendingUp className="w-3.5 h-3.5" />{path.jobs}</span>
                    </div>
                    <button className="w-full py-2 bg-emerald-50 text-emerald-700 font-bold text-sm rounded-lg cursor-pointer hover:bg-emerald-100 transition-all duration-200">
                      Explore Path
                    </button>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── COURSE CATALOG TABS ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 mb-4">Course Catalog</Badge>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">12,800+ courses across every discipline</h2>
              <p className="text-lg text-slate-500 max-w-xl mx-auto">Expert-led, project-based, and always up to date with the latest industry standards and tooling.</p>
            </div>
          </Reveal>

          <Tabs defaultValue="tech" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-slate-50 p-2 rounded-xl h-auto mb-12 border border-slate-100">
              {courseTabs.map(tab => (
                <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-emerald-700 text-slate-600 font-semibold text-sm">
                  <tab.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {courseTabs.map(tab => (
              <TabsContent key={tab.id} value={tab.id}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">{tab.badge}</Badge>
                      <span className="text-sm text-slate-400 font-medium">{tab.courseCount}</span>
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 mb-4">{tab.headline}</h3>
                    <p className="text-slate-600 leading-relaxed mb-8">{tab.description}</p>
                    <ul className="space-y-3">
                      {tab.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                          <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-emerald-600" />
                          </div>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <button className="mt-8 flex items-center gap-2 text-emerald-600 font-bold hover:text-emerald-800 cursor-pointer transition-all duration-200">
                      Browse all {tab.label} courses <ChevronRight className="w-4 h-4" />
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

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 bg-emerald-900 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <Badge className="bg-emerald-700 text-emerald-100 border-emerald-600 mb-4">Student Success</Badge>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Real learners. Real outcomes.</h2>
              <p className="text-emerald-200 text-lg max-w-lg mx-auto">4.2 million learners trust NexLearn to change their careers. Here are some of their stories.</p>
            </div>
          </Reveal>

          <Carousel className="w-full">
            <CarouselContent className="-ml-4">
              {testimonials.map((t, i) => (
                <CarouselItem key={i} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <Reveal delay={i * 0.08}>
                    <Card className="bg-emerald-800/50 border border-emerald-700/50 hover:border-emerald-500 cursor-pointer transition-all duration-300 h-full">
                      <CardContent className="p-6 flex flex-col h-full">
                        <div className="flex gap-1 mb-4">
                          {Array.from({ length: t.rating }).map((_, j) => (
                            <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <p className="text-emerald-100 text-sm leading-relaxed mb-4 flex-1">"{t.text}"</p>
                        <div className="flex gap-2 mb-4">
                          <Badge className="bg-emerald-700 text-emerald-200 border-0 text-xs">{t.course}</Badge>
                          <Badge className="bg-emerald-700/50 text-emerald-300 border-0 text-xs"><Clock className="w-3 h-3 inline mr-1" />{t.completionTime}</Badge>
                        </div>
                        <Separator className="bg-emerald-700 mb-4" />
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={t.avatar} />
                            <AvatarFallback className="bg-emerald-700 text-emerald-200">{t.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-bold text-white">{t.name}</p>
                            <p className="text-xs text-emerald-300">{t.role} · {t.company}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Reveal>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="cursor-pointer -left-4 bg-emerald-800 border-emerald-600 text-white hover:bg-emerald-700 transition-all duration-200" />
            <CarouselNext className="cursor-pointer -right-4 bg-emerald-800 border-emerald-600 text-white hover:bg-emerald-700 transition-all duration-200" />
          </Carousel>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 mb-4">Pricing</Badge>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Invest in your future — starting at $0</h2>
              <p className="text-lg text-slate-500 max-w-xl mx-auto">Cancel anytime. Annual Pro saves you $118/year. Teams get volume pricing at 10+ seats.</p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {pricingTiers.map((tier, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.25 }} className={`relative rounded-2xl border-2 p-8 flex flex-col cursor-pointer transition-all duration-200 h-full ${tier.recommended ? "border-emerald-500 bg-emerald-600 text-white shadow-2xl shadow-emerald-100" : "border-slate-200 bg-white hover:border-emerald-300 hover:shadow-lg"}`}>
                  {tier.recommended && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="bg-amber-400 text-amber-900 border-0 font-bold px-4 py-1 shadow-sm">Most Popular</Badge>
                    </div>
                  )}
                  <div className="mb-6">
                    <h3 className={`text-xl font-black mb-2 ${tier.recommended ? "text-white" : "text-slate-900"}`}>{tier.name}</h3>
                    <div className="flex items-baseline gap-1 mb-3">
                      <span className={`text-5xl font-black ${tier.recommended ? "text-white" : "text-slate-900"}`}>{tier.price}</span>
                      <span className={`text-sm ${tier.recommended ? "text-emerald-200" : "text-slate-400"}`}>{tier.period}</span>
                    </div>
                    {tier.highlight && <p className={`text-xs font-bold mb-2 ${tier.recommended ? "text-emerald-200" : "text-emerald-600"}`}>{tier.highlight}</p>}
                    <p className={`text-sm leading-relaxed ${tier.recommended ? "text-emerald-100" : "text-slate-500"}`}>{tier.description}</p>
                  </div>
                  <ul className="space-y-3 flex-1 mb-8">
                    {tier.features.map((f, j) => (
                      <li key={j} className={`flex items-start gap-2.5 text-sm ${tier.recommended ? "text-emerald-100" : "text-slate-700"}`}>
                        <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${tier.recommended ? "text-emerald-200" : "text-emerald-500"}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-3 rounded-xl font-bold cursor-pointer transition-all duration-200 ${tier.recommended ? "bg-white text-emerald-700 hover:bg-emerald-50" : "bg-emerald-500 text-white hover:bg-emerald-600"}`}>
                    {tier.cta}
                  </button>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 mb-4">FAQ</Badge>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Questions? We have answers.</h2>
            </div>
          </Reveal>

          <Accordion type="single" collapsible className="space-y-3">
            {faqItems.map((item, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <AccordionItem value={`faq-${i}`} className="bg-white border border-slate-200 rounded-xl px-6 cursor-pointer hover:border-emerald-300 transition-all duration-200">
                  <AccordionTrigger className="hover:text-emerald-700 transition-colors duration-200 font-bold text-left text-slate-900 py-5 text-base">{item.q}</AccordionTrigger>
                  <AccordionContent className="text-slate-600 leading-relaxed pb-5 text-sm">{item.a}</AccordionContent>
                </AccordionItem>
              </Reveal>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-24 px-6 bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <Badge className="bg-white/20 text-white border-white/30 mb-6"><Sparkles className="w-3 h-3 inline mr-1" />7-day free trial</Badge>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">Your next career move starts today.</h2>
            <p className="text-emerald-100 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              Join 4.2 million learners who chose NexLearn to build skills that employers actually want. Free to start. Results guaranteed.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticBtn onClick={() => setDemoOpen(true)} className="bg-white text-emerald-700 font-bold px-8 py-4 rounded-xl cursor-pointer hover:bg-emerald-50 transition-all duration-200 shadow-lg text-base">
                Start Learning Free
              </MagneticBtn>
              <button className="text-white font-semibold px-6 py-4 rounded-xl border border-white/30 hover:bg-white/10 cursor-pointer transition-all duration-200">
                <Headphones className="w-4 h-4 inline mr-2" /> Talk to an Advisor
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-slate-900 text-slate-300 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
            <div className="col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4 cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-black text-white">NexLearn</span>
              </Link>
              <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-xs">The online learning platform that turns ambitious learners into hired professionals. 4.2M learners. 96% job placement. Real outcomes.</p>
              <div className="flex gap-3">
                {[Globe, Globe, Globe, Globe].map((Icon, j) => (
                  <Link key={j} href="#" className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-emerald-500 cursor-pointer transition-all duration-200"><Icon className="w-4 h-4" /></Link>
                ))}
              </div>
            </div>
            {[
              { heading: "Learn", links: ["Technology", "Business", "Design", "Data Science", "Soft Skills"] },
              { heading: "Company", links: ["About Us", "Careers", "Press", "Blog", "Investors"] },
              { heading: "Support", links: ["Help Center", "Community", "Contact Us", "Accessibility", "Status"] },
            ].map(col => (
              <div key={col.heading}>
                <h4 className="text-white font-black text-sm mb-4">{col.heading}</h4>
                <ul className="space-y-2.5">
                  {col.links.map(link => (
                    <li key={link}><Link href="#" className="text-sm text-slate-400 hover:text-emerald-400 cursor-pointer transition-all duration-200">{link}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Separator className="bg-slate-800 mb-8" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
            <p>© 2026 NexLearn Inc. IAOE Accredited · SOC 2 Type II · GDPR Compliant</p>
            <div className="flex gap-6">
              {["Privacy", "Terms", "Cookies", "Accessibility"].map(link => (
                <Link key={link} href="#" className="hover:text-slate-300 cursor-pointer transition-all duration-200">{link}</Link>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ── DIALOG: ENROLL ── */}
      <AnimatePresence>
        {demoOpen && (
          <Dialog open={demoOpen} onOpenChange={setDemoOpen}>
            <DialogContent className="bg-white border-slate-200 max-w-lg">
              <DialogHeader>
                <DialogTitle className="text-slate-900 text-2xl font-black">Create your free account</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-2">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Email address</label>
                  <input type="email" placeholder="you@email.com" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:border-emerald-500 outline-none transition-all duration-200 cursor-text" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">What do you want to learn?</label>
                  <select className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:border-emerald-500 outline-none transition-all duration-200 cursor-pointer bg-white">
                    <option>Software Engineering</option>
                    <option>Data Science & ML</option>
                    <option>Product Management</option>
                    <option>UX Design</option>
                    <option>Business & Leadership</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Your experience level</label>
                  <select className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:border-emerald-500 outline-none transition-all duration-200 cursor-pointer bg-white">
                    <option>Complete Beginner</option>
                    <option>Some experience</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
                <Progress value={50} className="h-1.5 bg-slate-100" />
                <button className="w-full bg-emerald-500 text-white font-bold py-3 rounded-xl cursor-pointer hover:bg-emerald-600 transition-all duration-200">
                  Start Free — 7 Days on Us
                </button>
                <p className="text-xs text-slate-400 text-center">No credit card. Cancel anytime. 96% job placement rate.</p>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      {/* ── DIALOG: LEARNING PATH ── */}
      <AnimatePresence>
        {selectedPath && (
          <Dialog open={!!selectedPath} onOpenChange={() => setSelectedPath(null)}>
            <DialogContent className="bg-white border-slate-200 max-w-md">
              <DialogHeader>
                <DialogTitle className="text-slate-900 text-xl font-black">{selectedPath.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="relative rounded-xl overflow-hidden h-40">
                  <Image src={selectedPath.img} alt={selectedPath.title} fill className="object-cover" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 rounded-lg p-3">
                    <p className="text-xs text-slate-500 mb-1">Duration</p>
                    <p className="font-black text-slate-900 text-sm">{selectedPath.duration}</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3">
                    <p className="text-xs text-slate-500 mb-1">Level</p>
                    <p className="font-black text-slate-900 text-sm">{selectedPath.level}</p>
                  </div>
                  <div className="bg-emerald-50 rounded-lg p-3">
                    <p className="text-xs text-emerald-600 mb-1">Avg. Salary</p>
                    <p className="font-black text-emerald-700 text-sm">{selectedPath.salary}</p>
                  </div>
                  <div className="bg-emerald-50 rounded-lg p-3">
                    <p className="text-xs text-emerald-600 mb-1">Open Roles</p>
                    <p className="font-black text-emerald-700 text-sm">{selectedPath.jobs}</p>
                  </div>
                </div>
                <button className="w-full bg-emerald-500 text-white font-bold py-3 rounded-xl cursor-pointer hover:bg-emerald-600 transition-all duration-200">
                  Enroll in This Path
                </button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  )
}
