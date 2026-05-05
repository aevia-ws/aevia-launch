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
import { Dumbbell, Activity, Heart, Flame, Zap, Target, TrendingUp, CheckCircle, Star, Menu, ArrowRight, Play, Users, Award, Clock, Shield, ChevronRight, Globe, BarChart2, Calendar, Headphones } from "lucide-react"

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
  { value: "2.4M+", label: "Active Members", icon: <Users className="w-5 h-5" /> },
  { value: "98%", label: "Satisfaction Rate", icon: <Heart className="w-5 h-5" /> },
  { value: "47min", label: "Avg Session", icon: <Clock className="w-5 h-5" /> },
  { value: "840", label: "Calories / Workout", icon: <Flame className="w-5 h-5" /> },
  { value: "12K+", label: "Workouts Library", icon: <Dumbbell className="w-5 h-5" /> },
  { value: "4.9★", label: "App Store Rating", icon: <Star className="w-5 h-5" /> },
]

const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "Marathon Runner",
    company: "Nike Running Club",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    rating: 5,
    text: "PulseForge completely transformed how I train. The AI coach adapts my program every week based on my recovery scores and race schedule. I shaved 8 minutes off my marathon PR in just 4 months.",
  },
  {
    name: "Marcus Williams",
    role: "Strength & Conditioning Coach",
    company: "Elite Athletic Institute",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    rating: 5,
    text: "I use PulseForge with all 30 of my athletes. The team performance dashboard is incredible — I can see everyone's fatigue levels, volume load, and readiness scores in one view. Game changer for periodization.",
  },
  {
    name: "Priya Nair",
    role: "Yoga & Mobility Instructor",
    company: "Balanced Body Studio",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1eb1df?w=200&q=80",
    rating: 5,
    text: "The mindfulness and recovery modules are world-class. My clients love the guided breathwork sessions and HRV tracking integration. Retention at my studio went up 40% since I introduced the app.",
  },
  {
    name: "Tom Eriksson",
    role: "CrossFit Athlete",
    company: "CrossFit Invictus",
    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&q=80",
    rating: 5,
    text: "The programming intelligence is unlike anything I've used. It reads my wearable data and auto-adjusts load when I'm overtrained. I haven't had a serious injury in 18 months — that's a personal record.",
  },
  {
    name: "Aisha Robinson",
    role: "Triathlete",
    company: "Team USA Development",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80",
    rating: 5,
    text: "Nutrition tracking, swim/bike/run analytics, and race-day readiness scores — all in one app. My coach and I use it together during video calls to review my data. It's become essential to my performance.",
  },
]

const PRICING = [
  {
    name: "Starter",
    price: "$9",
    period: "/month",
    description: "Perfect for beginners building their foundation",
    features: [
      "200+ guided workouts",
      "Basic progress tracking",
      "Nutrition logging",
      "Community access",
      "Mobile app (iOS + Android)",
    ],
    cta: "Start Free Trial",
    highlighted: false,
    badge: null,
  },
  {
    name: "Performance",
    price: "$24",
    period: "/month",
    description: "For serious athletes who want data-driven results",
    features: [
      "12,000+ workout library",
      "AI-personalized programming",
      "HRV & wearable integration",
      "Nutrition coaching & meal plans",
      "1-on-1 coach messaging",
      "Advanced analytics dashboard",
      "Recovery & sleep optimization",
    ],
    cta: "Start 14-Day Trial",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Elite",
    price: "$79",
    period: "/month",
    description: "For professional athletes and teams",
    features: [
      "Everything in Performance",
      "Dedicated human coach",
      "Team management dashboard",
      "Biomechanics video analysis",
      "Custom program design",
      "Priority 24/7 support",
      "API access for integrations",
    ],
    cta: "Contact Sales",
    highlighted: false,
    badge: null,
  },
]

const FAQS = [
  {
    q: "How does the AI coach personalize my training program?",
    a: "Our AI analyzes your fitness history, goals, wearable data (HRV, sleep, resting heart rate), workout performance, and recovery metrics. It updates your program weekly — adjusting volume, intensity, and exercise selection to match your current fitness state and long-term goals. The more you use it, the smarter it gets.",
  },
  {
    q: "What wearables does PulseForge integrate with?",
    a: "PulseForge integrates with Apple Watch, Garmin, Whoop, Oura Ring, Fitbit, Polar, Suunto, and all devices that sync with Apple Health or Google Fit. We pull heart rate, HRV, sleep stages, VO2 max, and activity data automatically — no manual logging required.",
  },
  {
    q: "Can I use PulseForge without gym equipment?",
    a: "Absolutely. We have 3,000+ bodyweight and home workouts that require zero equipment. Our adaptive algorithms create fully effective programs around whatever you have access to — whether that's a full commercial gym, a pair of dumbbells, or just your body weight.",
  },
  {
    q: "How is the 14-day free trial structured?",
    a: "You get full access to all Performance plan features for 14 days. No credit card required. After the trial, you choose your plan or stay on the free tier. We'll remind you 3 days before the trial ends. You keep all your logged data regardless of which plan you choose.",
  },
  {
    q: "Can my coach or personal trainer access my data?",
    a: "Yes. With the Performance plan, you can share your full analytics dashboard with any coach via a secure link. With the Elite plan, your dedicated coach has direct access and can modify your program in real time. You control exactly what data is shared and can revoke access anytime.",
  },
  {
    q: "Is my health and biometric data secure and private?",
    a: "We take data privacy extremely seriously. All health data is encrypted at rest and in transit using AES-256. We are HIPAA-compliant and GDPR-ready. We never sell your data to third parties. You can export or permanently delete all your data at any time from your account settings.",
  },
  {
    q: "What's the difference between the mobile app and the web platform?",
    a: "The mobile app (iOS and Android) is optimized for in-workout use — guided sessions, real-time heart rate display, rest timers, and quick logging. The web platform gives you the full analytics dashboard, program builder, nutrition planning, and coach communication tools. Both sync in real time.",
  },
]

export default function PulseForgeApp() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const [videoOpen, setVideoOpen] = useState(false)
  const [billingAnnual, setBillingAnnual] = useState(false)

  const heroY = useTransform(scrollYProgress, [0, 0.3], ["0%", "20%"])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 50, damping: 25 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 25 })

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseX.set((e.clientX - window.innerWidth / 2) * 0.03)
      mouseY.set((e.clientY - window.innerHeight / 2) * 0.03)
    }
    window.addEventListener("mousemove", handler)
    return () => window.removeEventListener("mousemove", handler)
  }, [mouseX, mouseY])

  return (
    <div
      ref={containerRef}
      style={{ overflowX: "hidden", scrollBehavior: "smooth" }}
      className="bg-slate-950 text-white min-h-screen font-sans antialiased"
    >
      {/* ── AMBIENT GLOW ── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          style={{ x: springX, y: springY }}
          className="absolute top-[-20%] left-[10%] w-[60vw] h-[60vw] bg-emerald-500 opacity-[0.06] blur-[140px] rounded-full"
        />
        <motion.div
          style={{ x: springX, y: springY }}
          className="absolute bottom-[-10%] right-[5%] w-[40vw] h-[40vw] bg-teal-400 opacity-[0.05] blur-[120px] rounded-full"
        />
      </div>

      {/* ── NAVBAR ── */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">PulseForge</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {["Features", "Programs", "Coaches", "Pricing", "Stories"].map((item) => (
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
              Log in
            </Link>
            <button className="bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all duration-200 cursor-pointer shadow-lg shadow-emerald-500/20">
              Start Free Trial
            </button>
            <Sheet>
              <SheetTrigger asChild>
                <button className="md:hidden p-2 text-slate-400 hover:text-white transition-all duration-150 cursor-pointer">
                  <Menu className="w-5 h-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-slate-900 border-slate-800 text-white w-72">
                <div className="flex items-center gap-2.5 mb-10 mt-4">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-lg font-bold">PulseForge</span>
                </div>
                <nav className="flex flex-col gap-4">
                  {["Features", "Programs", "Coaches", "Pricing", "Stories", "Log in"].map((item) => (
                    <Link key={item} href="#" className="text-slate-300 hover:text-white text-base font-medium transition-all duration-150 cursor-pointer py-1">
                      {item}
                    </Link>
                  ))}
                  <button className="mt-4 bg-emerald-500 text-white font-semibold py-3 rounded-lg cursor-pointer hover:bg-emerald-400 transition-all duration-200">
                    Start Free Trial
                  </button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80"
            alt="Athlete training"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/40 to-slate-950" />
        </motion.div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <Badge className="mb-6 bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-xs font-semibold px-4 py-1.5 rounded-full">
              Trusted by 2.4 million athletes worldwide
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl font-extrabold text-white leading-[1.05] tracking-tight mb-6"
          >
            Train smarter.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              Perform better.
            </span>
            <br />
            Recover faster.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            PulseForge is the AI-powered fitness platform that learns your body, adapts your program in real time, and coaches you to peak performance — whether you're chasing a PR or just starting out.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <button className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-8 py-4 rounded-xl text-base transition-all duration-200 cursor-pointer shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2">
              Start Free — No Credit Card <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setVideoOpen(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-3 text-white font-semibold px-8 py-4 rounded-xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-200 cursor-pointer"
            >
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
                <Play className="w-3 h-3 fill-white text-white ml-0.5" />
              </div>
              Watch 2-min demo
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap items-center justify-center gap-6"
          >
            {[
              { icon: <Shield className="w-4 h-4 text-emerald-400" />, text: "14-day free trial" },
              { icon: <CheckCircle className="w-4 h-4 text-emerald-400" />, text: "Cancel anytime" },
              { icon: <Star className="w-4 h-4 text-emerald-400" />, text: "4.9 App Store rating" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-slate-400">
                {item.icon}
                <span>{item.text}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
          <DialogContent className="bg-slate-900 border-slate-700 max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-white text-lg font-bold">PulseForge in Action</DialogTitle>
            </DialogHeader>
            <div className="aspect-video bg-slate-800 rounded-lg flex items-center justify-center">
              <Play className="w-16 h-16 text-emerald-400 opacity-60" />
            </div>
          </DialogContent>
        </Dialog>
      </section>

      {/* ── STATS BAR ── */}
      <section className="py-16 border-y border-white/[0.06] bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {STATS.map((stat, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 text-emerald-400 mb-2">
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
              <Badge className="mb-4 bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-xs font-semibold px-3 py-1 rounded-full">
                Platform Features
              </Badge>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-5 tracking-tight">
                Everything you need to
                <br />
                <span className="text-emerald-400">reach your peak</span>
              </h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
                From beginner-friendly guided workouts to elite-level performance analytics — PulseForge scales with every athlete.
              </p>
            </div>
          </Reveal>

          <Tabs defaultValue="training" className="w-full">
            <Reveal delay={0.1}>
              <TabsList className="grid grid-cols-4 w-full max-w-2xl mx-auto mb-12 bg-white/5 border border-white/10 p-1 rounded-xl h-auto">
                {[
                  { value: "training", label: "Training AI", icon: <Dumbbell className="w-4 h-4" /> },
                  { value: "analytics", label: "Analytics", icon: <BarChart2 className="w-4 h-4" /> },
                  { value: "recovery", label: "Recovery", icon: <Heart className="w-4 h-4" /> },
                  { value: "nutrition", label: "Nutrition", icon: <Target className="w-4 h-4" /> },
                ].map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="flex items-center gap-2 text-sm font-semibold py-2.5 rounded-lg data-[state=active]:bg-emerald-500 data-[state=active]:text-white text-slate-400 cursor-pointer transition-all duration-200"
                  >
                    {tab.icon}
                    <span className="hidden sm:inline">{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Reveal>

            <TabsContent value="training">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <Reveal>
                  <div>
                    <div className="inline-flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-2 mb-6">
                      <Dumbbell className="w-5 h-5 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold text-sm">Adaptive AI Training</span>
                    </div>
                    <h3 className="text-3xl font-extrabold text-white mb-5 leading-tight">
                      A coach that never stops learning — about you
                    </h3>
                    <p className="text-slate-400 text-base leading-relaxed mb-8">
                      Our training engine ingests over 200 biometric signals per session. It understands your fatigue, your strengths, your weak points, and your goals — then writes your next workout automatically.
                    </p>
                    <ul className="space-y-4">
                      {[
                        "12,000+ exercises across every training modality",
                        "Auto-regulation based on daily readiness score",
                        "Progressive overload calculated per muscle group",
                        "Injury prevention through movement pattern analysis",
                        "Integration with 30+ wearable devices",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                          <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
                <Reveal delay={0.15}>
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-white/10">
                    <Image
                      src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80"
                      alt="Training dashboard"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="bg-slate-900/90 backdrop-blur rounded-xl p-4 border border-white/10">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-bold text-slate-400">TODAY'S READINESS</span>
                          <span className="text-xs font-bold text-emerald-400">87 / 100</span>
                        </div>
                        <Progress value={87} className="h-2 bg-white/10" />
                        <p className="text-xs text-slate-400 mt-2">High intensity training recommended</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </TabsContent>

            <TabsContent value="analytics">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <Reveal>
                  <div>
                    <div className="inline-flex items-center gap-3 bg-blue-500/10 border border-blue-500/20 rounded-xl px-4 py-2 mb-6">
                      <BarChart2 className="w-5 h-5 text-blue-400" />
                      <span className="text-blue-400 font-semibold text-sm">Performance Analytics</span>
                    </div>
                    <h3 className="text-3xl font-extrabold text-white mb-5 leading-tight">
                      Data that drives decisions, not just dashboards
                    </h3>
                    <p className="text-slate-400 text-base leading-relaxed mb-8">
                      Track every metric that matters — from 1RM trends and lactate threshold estimates to long-term body composition changes and training load distribution across all muscle groups.
                    </p>
                    <ul className="space-y-4">
                      {[
                        "Real-time performance benchmarking vs your cohort",
                        "Weekly training stress score and monotony index",
                        "VO2 max estimation from workout data",
                        "Strength curve analysis per exercise",
                        "Exportable reports for coaches and healthcare providers",
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
                      src="https://images.unsplash.com/photo-1550963295-019d8a8a61c5?w=800&q=80"
                      alt="Analytics"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-slate-950/50" />
                  </div>
                </Reveal>
              </div>
            </TabsContent>

            <TabsContent value="recovery">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <Reveal>
                  <div>
                    <div className="inline-flex items-center gap-3 bg-purple-500/10 border border-purple-500/20 rounded-xl px-4 py-2 mb-6">
                      <Heart className="w-5 h-5 text-purple-400" />
                      <span className="text-purple-400 font-semibold text-sm">Recovery Science</span>
                    </div>
                    <h3 className="text-3xl font-extrabold text-white mb-5 leading-tight">
                      Recovery isn't rest — it's where gains happen
                    </h3>
                    <p className="text-slate-400 text-base leading-relaxed mb-8">
                      PulseForge uses HRV trends, sleep architecture data, and perceived exertion logs to build a complete recovery picture. Know exactly when your body is ready to push hard again.
                    </p>
                    <ul className="space-y-4">
                      {[
                        "HRV baseline tracking with personalized zones",
                        "Sleep stage integration via Oura, Whoop, Garmin",
                        "Guided breathwork and meditation sessions",
                        "Cold/heat therapy protocol recommendations",
                        "Muscle soreness mapping and foam rolling guidance",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                          <CheckCircle className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
                <Reveal delay={0.15}>
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-white/10">
                    <Image
                      src="https://images.unsplash.com/photo-1599058917232-d750c185967c?w=800&q=80"
                      alt="Recovery"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-slate-950/50" />
                  </div>
                </Reveal>
              </div>
            </TabsContent>

            <TabsContent value="nutrition">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <Reveal>
                  <div>
                    <div className="inline-flex items-center gap-3 bg-orange-500/10 border border-orange-500/20 rounded-xl px-4 py-2 mb-6">
                      <Target className="w-5 h-5 text-orange-400" />
                      <span className="text-orange-400 font-semibold text-sm">Precision Nutrition</span>
                    </div>
                    <h3 className="text-3xl font-extrabold text-white mb-5 leading-tight">
                      Fuel your performance with data-backed nutrition
                    </h3>
                    <p className="text-slate-400 text-base leading-relaxed mb-8">
                      Calorie and macro targets that adjust daily based on your activity level, training goals, and biometric feedback. No more guessing — eat with precision.
                    </p>
                    <ul className="space-y-4">
                      {[
                        "Dynamic macro targets based on training load",
                        "Barcode scanning for 8M+ food database",
                        "Pre and post-workout nutrition timing guides",
                        "Hydration tracking with sweat rate estimates",
                        "Integration with MyFitnessPal and Cronometer",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                          <CheckCircle className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
                <Reveal delay={0.15}>
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-white/10">
                    <Image
                      src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80"
                      alt="Nutrition"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-slate-950/50" />
                  </div>
                </Reveal>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-28 px-6 bg-white/[0.02] border-y border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-xs font-semibold px-3 py-1 rounded-full">
                Athlete Stories
              </Badge>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-5 tracking-tight">
                Real results from real athletes
              </h2>
              <p className="text-slate-400 text-lg max-w-xl mx-auto">
                From first-time gym-goers to Olympic-level athletes — PulseForge works for every body.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Carousel opts={{ align: "start", loop: true }} className="w-full">
              <CarouselContent className="-ml-4">
                {TESTIMONIALS.map((t, i) => (
                  <CarouselItem key={i} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <Card className="bg-white/[0.03] border border-white/[0.08] rounded-2xl hover:border-emerald-500/20 transition-all duration-300 cursor-pointer h-full">
                      <CardContent className="p-7 flex flex-col h-full">
                        <div className="flex items-center gap-1 mb-5">
                          {Array.from({ length: t.rating }).map((_, j) => (
                            <Star key={j} className="w-4 h-4 fill-emerald-400 text-emerald-400" />
                          ))}
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed mb-6 flex-1">"{t.text}"</p>
                        <Separator className="bg-white/[0.08] mb-5" />
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10 border border-white/10">
                            <AvatarImage src={t.avatar} />
                            <AvatarFallback className="bg-emerald-500/20 text-emerald-400 font-bold text-xs">
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
              <Badge className="mb-4 bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-xs font-semibold px-3 py-1 rounded-full">
                Simple Pricing
              </Badge>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-5 tracking-tight">
                Invest in your performance
              </h2>
              <p className="text-slate-400 text-lg max-w-xl mx-auto mb-8">
                No hidden fees. Cancel anytime. Start with a 14-day free trial on any paid plan.
              </p>
              <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-1">
                <button
                  onClick={() => setBillingAnnual(false)}
                  className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${!billingAnnual ? "bg-emerald-500 text-white" : "text-slate-400 hover:text-white"}`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingAnnual(true)}
                  className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${billingAnnual ? "bg-emerald-500 text-white" : "text-slate-400 hover:text-white"}`}
                >
                  Annual <span className="text-xs ml-1 opacity-70">Save 30%</span>
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
                      ? "bg-emerald-500/5 border-emerald-500/40 shadow-xl shadow-emerald-500/10"
                      : "bg-white/[0.02] border-white/[0.08] hover:border-white/20"
                  }`}
                >
                  {plan.badge && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white border-none text-xs font-bold px-4 py-1 rounded-full">
                      {plan.badge}
                    </Badge>
                  )}
                  <div className="mb-8">
                    <h3 className="text-xl font-extrabold text-white mb-2">{plan.name}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-5">{plan.description}</p>
                    <div className="flex items-end gap-1">
                      <span className="text-5xl font-extrabold text-white">
                        {billingAnnual
                          ? plan.price === "$9" ? "$6" : plan.price === "$24" ? "$17" : "$55"
                          : plan.price}
                      </span>
                      <span className="text-slate-400 text-sm mb-2">{plan.period}</span>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm text-slate-300">
                        <CheckCircle className={`w-4 h-4 mt-0.5 shrink-0 ${plan.highlighted ? "text-emerald-400" : "text-slate-500"}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer ${
                      plan.highlighted
                        ? "bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-500/25"
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
      <section className="py-28 px-6 bg-white/[0.02] border-y border-white/[0.06]">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <Badge className="mb-4 bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-xs font-semibold px-3 py-1 rounded-full">
                FAQ
              </Badge>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                Got questions?
              </h2>
              <p className="text-slate-400 text-lg">We've answered the ones we get most.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Accordion type="single" collapsible className="space-y-3">
              {FAQS.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="bg-white/[0.03] border border-white/[0.08] rounded-xl px-6 data-[state=open]:border-emerald-500/20 transition-all duration-200"
                >
                  <AccordionTrigger className="text-white font-semibold text-sm py-5 hover:no-underline cursor-pointer hover:text-emerald-400 transition-all duration-200 text-left">
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
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-800 p-12 md:p-20 text-center">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80')] bg-cover bg-center opacity-10" />
              <div className="relative z-10">
                <Badge className="mb-6 bg-white/20 text-white border-none text-xs font-bold px-4 py-1.5 rounded-full">
                  Start Today — Free for 14 Days
                </Badge>
                <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
                  Your best performance
                  <br />
                  starts right now
                </h2>
                <p className="text-emerald-100 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                  Join 2.4 million athletes already training smarter with PulseForge. No credit card required. Cancel any time.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button className="w-full sm:w-auto bg-white text-emerald-700 hover:bg-emerald-50 font-bold px-10 py-4 rounded-xl text-base transition-all duration-200 cursor-pointer shadow-xl">
                    Start Free Trial
                  </button>
                  <button className="w-full sm:w-auto flex items-center justify-center gap-2 text-white font-semibold px-8 py-4 rounded-xl border border-white/30 hover:bg-white/10 transition-all duration-200 cursor-pointer">
                    Talk to a coach <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/[0.06] bg-slate-950 pt-20 pb-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-5 cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold text-white">PulseForge</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-6">
                The AI-powered fitness platform for athletes who refuse to leave performance to chance.
              </p>
              <div className="flex items-center gap-4">
                {[
                  { icon: <Globe className="w-4 h-4" />, href: "#" },
                  { icon: <Globe className="w-4 h-4" />, href: "#" },
                  { icon: <Globe className="w-4 h-4" />, href: "#" },
                  { icon: <Globe className="w-4 h-4" />, href: "#" },
                ].map((s, i) => (
                  <Link
                    key={i}
                    href={s.href}
                    className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200 cursor-pointer"
                  >
                    {s.icon}
                  </Link>
                ))}
              </div>
            </div>

            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Integrations", "Changelog", "Roadmap"],
              },
              {
                title: "Athletes",
                links: ["Programs Library", "Find a Coach", "Community", "Challenges", "Leaderboards"],
              },
              {
                title: "Company",
                links: ["About", "Blog", "Careers", "Press Kit", "Contact"],
              },
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

          <Separator className="bg-white/[0.06] mb-8" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">© 2026 PulseForge, Inc. All rights reserved.</p>
            <div className="flex items-center gap-6">
              {["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR"].map((item) => (
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
