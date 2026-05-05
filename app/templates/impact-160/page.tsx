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
import { Heart, Video, Shield, Clock, Users, Star, Check, ArrowRight, ChevronRight, Menu, Globe, TrendingUp, Zap, Activity, Stethoscope, Pill, Brain, FileText, Lock, Phone, Sparkles, CalendarDays } from "lucide-react"

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

const navLinks = ["How It Works", "Specialties", "Providers", "Pricing", "For Employers"]

const stats = [
  { value: 2800000, suffix: "+", label: "Patients Served", icon: Users },
  { value: 8400, suffix: "+", label: "Licensed Providers", icon: Stethoscope },
  { value: 12, suffix: " min", label: "Avg. Wait Time", icon: Clock },
  { value: 98, suffix: "%", label: "Patient Satisfaction", icon: Heart },
  { value: 50, suffix: "+", label: "States Covered", icon: Globe },
  { value: 4.9, suffix: "/5", label: "Provider Rating", icon: Star },
]

const specialtyTabs = [
  {
    id: "primary",
    label: "Primary Care",
    icon: Stethoscope,
    headline: "Your personal doctor — available 24/7 from anywhere",
    description: "CareConnect's primary care service pairs you with a board-certified physician who knows your full medical history. Unlimited visits, same-day appointments, and a dedicated care team who coordinates all your specialist referrals, prescriptions, and lab work — all in one place.",
    items: [
      "Unlimited same-day visits with a dedicated primary care physician",
      "Complete medical history maintained and accessible to your whole care team",
      "Prescription management with pharmacy network of 65,000+ locations",
      "Lab orders sent directly to Quest, LabCorp, or our in-home phlebotomy partners",
      "24/7 urgent care triage with escalation to ER when clinically needed",
      "Coordination with specialists, hospitals, and mental health providers",
    ],
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80",
    badge: "Most Visited",
  },
  {
    id: "mental",
    label: "Mental Health",
    icon: Brain,
    headline: "Evidence-based therapy and psychiatry in your pocket",
    description: "Access licensed therapists, clinical psychologists, and board-certified psychiatrists for individual therapy, medication management, and crisis support. Our HIPAA-secure platform offers video, voice, and asynchronous messaging — whatever feels most comfortable for you.",
    items: [
      "Licensed therapists specializing in CBT, DBT, EMDR, and trauma-informed care",
      "Board-certified psychiatrists for diagnosis, medication initiation, and management",
      "Same-week appointments for therapy; medication consultations within 48 hours",
      "Messaging between sessions for between-appointment support",
      "Specialized programs: anxiety, depression, OCD, ADHD, eating disorders, grief",
      "Couples and family therapy sessions via video conferencing",
    ],
    image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=800&q=80",
    badge: "High Demand",
  },
  {
    id: "chronic",
    label: "Chronic Care",
    icon: Activity,
    headline: "Proactive management for complex, long-term conditions",
    description: "Our chronic care team specializes in diabetes, hypertension, heart disease, autoimmune conditions, and more. AI-assisted monitoring flags concerning trends before they become crises — with human clinicians available to intervene within hours, not days.",
    items: [
      "Dedicated chronic care nurse practitioners and specialist physicians",
      "Continuous vitals monitoring with connected device integration (CGM, BP cuff, scale)",
      "Predictive risk alerts: AI flags decompensation signals 72 hours in advance",
      "Care plan management: medication adjustments, lifestyle coaching, specialist coordination",
      "Quarterly comprehensive review visits with full biomarker panel interpretation",
      "Condition-specific programs: diabetic retinopathy screening, cardiac rehab, COPD management",
    ],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&q=80",
    badge: "Specialist Team",
  },
  {
    id: "urgent",
    label: "Urgent Care",
    icon: Zap,
    headline: "Skip the ER — get treated fast for non-emergency conditions",
    description: "Sore throat at 2AM? Ear infection over the holidays? CareConnect urgent care connects you with a licensed provider in under 15 minutes — day, night, or weekend. Diagnose, prescribe, and have your medication at the pharmacy before you go to sleep.",
    items: [
      "Average connect time under 15 minutes, 24 hours a day, 7 days a week",
      "Diagnosis and treatment for 100+ acute conditions via telemedicine",
      "Prescription sent electronically to 65,000+ pharmacy locations nationwide",
      "Referral pathways to in-person care when physical exam or imaging is required",
      "Pediatric urgent care specialists for children ages 0–17",
      "E-prescribing for controlled substances where state law permits",
    ],
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&q=80",
    badge: "24/7 Available",
  },
]

const providers = [
  { name: "Dr. Amara Singh", specialty: "Internal Medicine", credentials: "MD, Johns Hopkins Medicine", experience: "14 years", avatar: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&q=80", rating: 4.98, reviews: 2341, languages: ["English", "Hindi"] },
  { name: "Dr. Michael Torres", specialty: "Psychiatry", credentials: "MD, Columbia University Medical", experience: "11 years", avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&q=80", rating: 4.96, reviews: 1872, languages: ["English", "Spanish"] },
  { name: "Dr. Yuki Nakamura", specialty: "Family Medicine", credentials: "MD, Stanford Medical School", experience: "9 years", avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&q=80", rating: 4.97, reviews: 3105, languages: ["English", "Japanese"] },
  { name: "Dr. Chidinma Obi", specialty: "Endocrinology", credentials: "MD, University of Chicago", experience: "16 years", avatar: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=200&q=80", rating: 4.99, reviews: 1543, languages: ["English", "Yoruba"] },
]

const testimonials = [
  {
    name: "Rebecca Hartman",
    role: "Elementary School Teacher",
    location: "Rural Montana",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    rating: 5,
    text: "Living 90 miles from the nearest specialist, CareConnect is genuinely life-changing. My rheumatologist is incredible — she manages my lupus with more precision than my previous in-person doctor. The 24/7 urgent care has saved my family countless ER trips and hundreds of dollars.",
  },
  {
    name: "James O'Brien",
    role: "Software Engineer",
    location: "Chicago, IL",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    rating: 5,
    text: "I was skeptical about telehealth for mental health, but my therapist is phenomenal. The flexibility to message between sessions is something I never had with in-person care. My anxiety has measurably improved over 4 months — I'm sleeping better and performing better at work.",
  },
  {
    name: "Maria Gonzalez",
    role: "Retired Nurse",
    location: "Miami, FL",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80",
    rating: 5,
    text: "Managing my husband's Type 2 diabetes and hypertension used to mean six appointments a month with four different providers who never talked to each other. CareConnect's chronic care team coordinates everything. His A1C dropped from 9.2 to 6.8 in eight months.",
  },
  {
    name: "David Kim",
    role: "Small Business Owner",
    location: "Austin, TX",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    rating: 5,
    text: "We switched our entire team of 45 to CareConnect for Business. Employee healthcare costs dropped 28%, and productivity increased because people are actually getting care instead of delaying it. The employer dashboard showing utilization metrics is incredibly valuable.",
  },
  {
    name: "Priya Nair",
    role: "New Mother",
    location: "Seattle, WA",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    rating: 5,
    text: "Having a newborn and a postpartum depression diagnosis, I needed help fast. CareConnect matched me with a perinatal psychiatrist within 36 hours — at 11pm when I was desperate. She prescribed a safe medication and helped me through the hardest months of my life.",
  },
]

const pricingTiers = [
  {
    name: "Individual",
    price: "$49",
    period: "per month",
    description: "Complete telehealth coverage for one person — unlimited primary care, urgent care, and mental health visits.",
    features: [
      "Unlimited primary care visits",
      "Unlimited urgent care access 24/7",
      "6 mental health sessions per month",
      "Prescription management",
      "Lab order service",
      "Medical records and care history",
      "Secure messaging with care team",
    ],
    cta: "Start Free Trial",
    recommended: false,
  },
  {
    name: "Family",
    price: "$129",
    period: "per month",
    description: "Full coverage for your entire household of up to 6 — adults, children, and seniors all included.",
    features: [
      "Everything in Individual",
      "Up to 6 household members",
      "Pediatric care specialists",
      "Senior care and geriatric consults",
      "Family health dashboard",
      "12 mental health sessions / member",
      "Chronic care management",
      "Health score tracking per member",
    ],
    cta: "Start Family Trial",
    recommended: true,
  },
  {
    name: "Business",
    price: "$19",
    period: "per employee / month",
    description: "Comprehensive employee health benefits with employer analytics, admin dashboard, and HRIS integration.",
    features: [
      "Everything in Family (per employee)",
      "Employer analytics dashboard",
      "HRIS and benefits portal integration",
      "Custom wellness programs",
      "Dedicated account manager",
      "Aggregate health reporting",
      "Mental health EAP module",
      "Volume pricing at 100+ employees",
    ],
    cta: "Request Demo",
    recommended: false,
  },
]

const faqItems = [
  {
    q: "Is CareConnect covered by my insurance?",
    a: "CareConnect works with most major insurance plans including Blue Cross Blue Shield, Aetna, Cigna, United Healthcare, and Humana. We also accept Medicare and Medicaid in participating states. Many of our plans are HSA/FSA-eligible. Enter your insurance information during signup and we'll show your real out-of-pocket costs before your first visit.",
  },
  {
    q: "Can CareConnect providers prescribe medications?",
    a: "Yes. Our licensed providers can prescribe most medications including antibiotics, antidepressants, SSRIs, blood pressure medications, diabetes medications, and more. Prescriptions are sent electronically to your preferred pharmacy from our network of 65,000+ locations. Controlled substance prescriptions are available where permitted by state law.",
  },
  {
    q: "Is my health data private and HIPAA-compliant?",
    a: "CareConnect is fully HIPAA-compliant and uses end-to-end encryption for all communications, video sessions, and stored health records. We are SOC 2 Type II certified. Your health data is never sold to third parties. You control data sharing, and can request full deletion at any time.",
  },
  {
    q: "What happens if I need in-person care or surgery?",
    a: "Our providers coordinate seamlessly with in-person care. When you need imaging, labs, surgery, or specialist care that requires physical examination, we provide detailed referrals and transfer your complete medical history to the receiving provider. We maintain your care coordination before and after any in-person visit.",
  },
  {
    q: "How quickly can I see a provider?",
    a: "For urgent care, average wait times are under 12 minutes, 24/7. For scheduled primary care appointments, most patients are seen same-day or next-day. Mental health intake appointments are typically available within 48 hours. Specialist consults vary by specialty — typically 3–7 days.",
  },
  {
    q: "What if I have a medical emergency?",
    a: "CareConnect is not designed for medical emergencies. If you're experiencing a life-threatening situation, call 911 immediately. Our providers can help determine if your symptoms are urgent and assist with ER preparation if needed, but we will always direct you to emergency services for true emergencies.",
  },
  {
    q: "Is telehealth effective for mental health treatment?",
    a: "Robust clinical evidence — including studies published in JAMA Psychiatry and The Lancet — shows telehealth mental health treatment is as effective as in-person care for most conditions including depression, anxiety, PTSD, and ADHD. In fact, many patients report higher adherence rates because of the convenience and reduced stigma of remote access.",
  },
]

export default function CareConnectTelemedicine() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const heroY = useTransform(scrollYProgress, [0, 0.4], [0, 100])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])
  const [bookingOpen, setBookingOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState<typeof providers[0] | null>(null)

  return (
    <div ref={containerRef} style={{ overflowX: "hidden", scrollBehavior: "smooth" }} className="min-h-screen bg-white text-slate-900 font-sans">

      {/* ── NAVBAR ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-black text-slate-900">CareConnect</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link key={link} href="#" className="text-sm font-medium text-slate-600 hover:text-teal-600 cursor-pointer transition-all duration-200">{link}</Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link href="#" className="text-sm font-semibold text-slate-700 hover:text-teal-600 cursor-pointer transition-all duration-200 px-4 py-2">Sign in</Link>
            <button onClick={() => setBookingOpen(true)} className="bg-teal-500 hover:bg-teal-600 text-white text-sm font-bold px-5 py-2.5 rounded-lg cursor-pointer transition-all duration-200 shadow-sm">
              See a Doctor Now
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
                  <Link key={link} href="#" className="text-base font-semibold text-slate-700 hover:text-teal-600 cursor-pointer transition-all duration-200 py-2 border-b border-slate-100">{link}</Link>
                ))}
                <button className="mt-4 bg-teal-500 text-white font-bold py-3 rounded-lg cursor-pointer hover:bg-teal-600 transition-all duration-200">See a Doctor Now</button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-6 overflow-hidden">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0">
          <Image src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80" alt="Telehealth care" fill className="object-cover opacity-10" priority />
          <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-white to-cyan-50" />
          <div className="absolute top-24 right-1/4 w-96 h-96 bg-teal-100 rounded-full blur-3xl opacity-50" />
        </motion.div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <Reveal>
            <Badge className="bg-teal-100 text-teal-700 border-teal-200 px-4 py-1.5 text-xs font-bold mb-6 cursor-pointer hover:bg-teal-200 transition-all duration-200">
              <Shield className="w-3 h-3 mr-1.5 inline" /> HIPAA Certified · SOC 2 Type II · All 50 States
            </Badge>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-tight tracking-tight mb-6">
              A doctor for you,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-600">whenever you need one.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-10">
              CareConnect brings board-certified physicians, therapists, and specialists to your phone or laptop in under 15 minutes. Primary care, mental health, urgent care, and chronic disease management — all in one place.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <MagneticBtn onClick={() => setBookingOpen(true)} className="bg-teal-500 hover:bg-teal-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-teal-100 transition-all duration-200 text-base flex items-center gap-2">
                <Video className="w-4 h-4" /> See a Doctor in 15 Minutes
              </MagneticBtn>
              <button className="flex items-center gap-2 text-slate-700 font-semibold px-6 py-4 rounded-xl border border-slate-200 hover:border-teal-300 hover:bg-teal-50 cursor-pointer transition-all duration-200">
                <CalendarDays className="w-4 h-4 text-teal-500" /> Schedule Appointment
              </button>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500 font-medium">
              {["Most insurance accepted", "Free 7-day trial", "HIPAA compliant", "No hidden fees"].map((item, i) => (
                <span key={i} className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-teal-500" />{item}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="py-16 bg-teal-700">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {stats.map((s, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="text-center">
                  <s.icon className="w-5 h-5 text-teal-200 mx-auto mb-2" />
                  <div className="text-3xl font-black text-white mb-1"><Counter target={s.value} suffix={s.suffix} /></div>
                  <p className="text-teal-200 text-xs font-medium">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPECIALTIES TABS ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <Badge className="bg-teal-100 text-teal-700 border-teal-200 mb-4">Our Specialties</Badge>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Comprehensive care, all in one platform</h2>
              <p className="text-lg text-slate-500 max-w-xl mx-auto">From routine checkups to complex chronic disease management — CareConnect covers your whole health.</p>
            </div>
          </Reveal>

          <Tabs defaultValue="primary" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-slate-50 p-2 rounded-xl h-auto mb-12 border border-slate-100">
              {specialtyTabs.map(tab => (
                <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-teal-700 text-slate-600 font-semibold text-sm">
                  <tab.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {specialtyTabs.map(tab => (
              <TabsContent key={tab.id} value={tab.id}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <Badge className="bg-teal-100 text-teal-700 border-teal-200 mb-4">{tab.badge}</Badge>
                    <h3 className="text-3xl font-black text-slate-900 mb-4">{tab.headline}</h3>
                    <p className="text-slate-600 leading-relaxed mb-8">{tab.description}</p>
                    <ul className="space-y-3">
                      {tab.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                          <div className="mt-0.5 w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-teal-600" />
                          </div>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <button onClick={() => setBookingOpen(true)} className="mt-8 flex items-center gap-2 text-teal-600 font-bold hover:text-teal-800 cursor-pointer transition-all duration-200">
                      Book with a specialist <ChevronRight className="w-4 h-4" />
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

      {/* ── PROVIDERS ── */}
      <section className="py-24 px-6 bg-teal-50">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <Badge className="bg-teal-100 text-teal-700 border-teal-200 mb-4">Our Providers</Badge>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">8,400+ board-certified providers</h2>
              <p className="text-lg text-slate-500 max-w-xl mx-auto">Every CareConnect provider is U.S. licensed, board-certified, and credentialed through our rigorous 14-step vetting process.</p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {providers.map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => setSelectedProvider(p)}
                  className="bg-white rounded-2xl border border-teal-200 overflow-hidden cursor-pointer hover:border-teal-400 hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image src={p.avatar} alt={p.name} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                    <div className="absolute bottom-3 left-3 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-white text-xs font-bold">{p.rating}</span>
                      <span className="text-white/70 text-xs">({p.reviews.toLocaleString()})</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-base font-black text-slate-900 mb-0.5">{p.name}</h3>
                    <p className="text-teal-600 text-sm font-bold mb-1">{p.specialty}</p>
                    <p className="text-slate-500 text-xs mb-2">{p.credentials}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400">{p.experience} exp.</span>
                      <button className="bg-teal-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg cursor-pointer hover:bg-teal-600 transition-all duration-200">
                        Book Visit
                      </button>
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <Badge className="bg-teal-100 text-teal-700 border-teal-200 mb-4">Patient Stories</Badge>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">2.8 million patients, millions of stories</h2>
              <p className="text-lg text-slate-500 max-w-lg mx-auto">98% patient satisfaction and 4.9/5 provider rating across 2 million completed visits.</p>
            </div>
          </Reveal>

          <Carousel className="w-full">
            <CarouselContent className="-ml-4">
              {testimonials.map((t, i) => (
                <CarouselItem key={i} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <Reveal delay={i * 0.08}>
                    <Card className="bg-slate-50 border border-slate-200 hover:border-teal-300 hover:shadow-md cursor-pointer transition-all duration-300 h-full">
                      <CardContent className="p-6 flex flex-col h-full">
                        <div className="flex gap-1 mb-4">
                          {Array.from({ length: t.rating }).map((_, j) => <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                        </div>
                        <p className="text-slate-700 text-sm leading-relaxed mb-4 flex-1">"{t.text}"</p>
                        <Separator className="mb-4" />
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={t.avatar} />
                            <AvatarFallback className="bg-teal-100 text-teal-700">{t.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-bold text-slate-900">{t.name}</p>
                            <p className="text-xs text-slate-500">{t.role} · {t.location}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Reveal>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="cursor-pointer -left-4 hover:bg-teal-50 hover:border-teal-300 transition-all duration-200" />
            <CarouselNext className="cursor-pointer -right-4 hover:bg-teal-50 hover:border-teal-300 transition-all duration-200" />
          </Carousel>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="py-24 px-6 bg-teal-50">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <Badge className="bg-teal-100 text-teal-700 border-teal-200 mb-4">Simple Pricing</Badge>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Transparent, affordable healthcare</h2>
              <p className="text-lg text-slate-500 max-w-xl mx-auto">No surprise bills. No copays per visit. One flat monthly rate — and most insurance plans reimburse a significant portion.</p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {pricingTiers.map((tier, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.25 }} className={`relative rounded-2xl border-2 p-8 flex flex-col cursor-pointer transition-all duration-200 h-full ${tier.recommended ? "border-teal-500 bg-teal-600 text-white shadow-2xl shadow-teal-100" : "border-slate-200 bg-white hover:border-teal-300 hover:shadow-lg"}`}>
                  {tier.recommended && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="bg-amber-400 text-amber-900 border-0 font-bold px-4 py-1 shadow-sm">Best Value</Badge>
                    </div>
                  )}
                  <div className="mb-6">
                    <h3 className={`text-xl font-black mb-2 ${tier.recommended ? "text-white" : "text-slate-900"}`}>{tier.name}</h3>
                    <div className="flex items-baseline gap-1 mb-3">
                      <span className={`text-5xl font-black ${tier.recommended ? "text-white" : "text-slate-900"}`}>{tier.price}</span>
                      <span className={`text-sm ${tier.recommended ? "text-teal-200" : "text-slate-400"}`}>{tier.period}</span>
                    </div>
                    <p className={`text-sm leading-relaxed ${tier.recommended ? "text-teal-100" : "text-slate-500"}`}>{tier.description}</p>
                  </div>
                  <ul className="space-y-3 flex-1 mb-8">
                    {tier.features.map((f, j) => (
                      <li key={j} className={`flex items-start gap-2.5 text-sm ${tier.recommended ? "text-teal-100" : "text-slate-700"}`}>
                        <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${tier.recommended ? "text-teal-200" : "text-teal-500"}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => setBookingOpen(true)} className={`w-full py-3 rounded-xl font-bold cursor-pointer transition-all duration-200 ${tier.recommended ? "bg-white text-teal-700 hover:bg-teal-50" : "bg-teal-500 text-white hover:bg-teal-600"}`}>
                    {tier.cta}
                  </button>
                </motion.div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="text-center text-slate-500 text-sm mt-8">Most insurance plans accepted. <Link href="#" className="text-teal-600 font-semibold hover:underline cursor-pointer">Check your coverage →</Link></p>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <Badge className="bg-teal-100 text-teal-700 border-teal-200 mb-4">FAQ</Badge>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Your questions answered</h2>
              <p className="text-slate-500">Have more questions? <Link href="#" className="text-teal-600 font-semibold hover:underline cursor-pointer">Chat with our team.</Link></p>
            </div>
          </Reveal>

          <Accordion type="single" collapsible className="space-y-3">
            {faqItems.map((item, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <AccordionItem value={`faq-${i}`} className="bg-slate-50 border border-slate-200 rounded-xl px-6 cursor-pointer hover:border-teal-300 transition-all duration-200">
                  <AccordionTrigger className="hover:text-teal-700 transition-colors duration-200 font-bold text-left text-slate-900 py-5 text-base">{item.q}</AccordionTrigger>
                  <AccordionContent className="text-slate-600 leading-relaxed pb-5 text-sm">{item.a}</AccordionContent>
                </AccordionItem>
              </Reveal>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-24 px-6 bg-gradient-to-br from-teal-600 via-teal-700 to-cyan-800">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <Badge className="bg-white/20 text-white border-white/30 mb-6"><Heart className="w-3 h-3 inline mr-1 fill-current" /> Free 7-Day Trial</Badge>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              Your health. On your schedule.
            </h2>
            <p className="text-teal-100 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              Join 2.8 million patients who trust CareConnect for their healthcare. See a board-certified doctor in under 15 minutes — starting today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticBtn onClick={() => setBookingOpen(true)} className="bg-white text-teal-700 font-bold px-8 py-4 rounded-xl cursor-pointer hover:bg-teal-50 transition-all duration-200 shadow-lg text-base flex items-center gap-2">
                <Video className="w-4 h-4" /> See a Doctor Now
              </MagneticBtn>
              <button className="text-white font-semibold px-6 py-4 rounded-xl border border-white/30 hover:bg-white/10 cursor-pointer transition-all duration-200">
                <Phone className="w-4 h-4 inline mr-2" /> Call 1-800-CARE-NOW
              </button>
            </div>
            <p className="text-teal-200 text-sm mt-6">7-day free trial · Most insurance accepted · HIPAA certified</p>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-slate-900 text-slate-300 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
            <div className="col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4 cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-black text-white">CareConnect</span>
              </Link>
              <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-xs">Board-certified telehealth for primary care, mental health, urgent care, and chronic disease management. Available in all 50 states.</p>
              <div className="flex gap-3">
                {[Globe, Globe, Globe].map((Icon, j) => (
                  <Link key={j} href="#" className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-teal-500 cursor-pointer transition-all duration-200"><Icon className="w-4 h-4" /></Link>
                ))}
              </div>
            </div>
            {[
              { heading: "Specialties", links: ["Primary Care", "Mental Health", "Urgent Care", "Chronic Care", "Pediatrics"] },
              { heading: "Company", links: ["About Us", "Careers", "Press", "Provider Portal", "Blog"] },
              { heading: "Legal", links: ["Privacy Policy", "HIPAA Notice", "Terms of Service", "Cookie Policy", "Accessibility"] },
            ].map(col => (
              <div key={col.heading}>
                <h4 className="text-white font-black text-sm mb-4">{col.heading}</h4>
                <ul className="space-y-2.5">
                  {col.links.map(link => (
                    <li key={link}><Link href="#" className="text-sm text-slate-400 hover:text-teal-400 cursor-pointer transition-all duration-200">{link}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Separator className="bg-slate-800 mb-8" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
            <p>© 2026 CareConnect Health Inc. HIPAA Compliant · SOC 2 Type II · Not for emergencies — call 911</p>
            <div className="flex gap-6">
              {["Privacy", "HIPAA", "Terms", "Accessibility"].map(link => (
                <Link key={link} href="#" className="hover:text-slate-300 cursor-pointer transition-all duration-200">{link}</Link>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ── BOOKING DIALOG ── */}
      <AnimatePresence>
        {bookingOpen && (
          <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
            <DialogContent className="bg-white border-slate-200 max-w-lg">
              <DialogHeader>
                <DialogTitle className="text-slate-900 text-2xl font-black">See a Provider Today</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-2">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">What type of care do you need?</label>
                  <select className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:border-teal-500 outline-none transition-all duration-200 cursor-pointer bg-white">
                    <option>Urgent Care (Available Now)</option>
                    <option>Primary Care (Same-Day)</option>
                    <option>Mental Health (Next 48h)</option>
                    <option>Chronic Care Management</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">First name</label>
                    <input type="text" placeholder="Jane" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:border-teal-500 outline-none transition-all duration-200 cursor-text" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Last name</label>
                    <input type="text" placeholder="Smith" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:border-teal-500 outline-none transition-all duration-200 cursor-text" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Date of birth</label>
                  <input type="date" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:border-teal-500 outline-none transition-all duration-200 cursor-pointer" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Insurance provider</label>
                  <select className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:border-teal-500 outline-none transition-all duration-200 cursor-pointer bg-white">
                    <option>Blue Cross Blue Shield</option>
                    <option>Aetna</option>
                    <option>Cigna</option>
                    <option>United Healthcare</option>
                    <option>Medicare</option>
                    <option>Pay Out of Pocket</option>
                  </select>
                </div>
                <div className="bg-teal-50 rounded-lg p-4 flex items-start gap-3">
                  <Lock className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-teal-700">Your information is encrypted and protected under HIPAA. CareConnect will never sell or share your medical data.</p>
                </div>
                <button className="w-full bg-teal-500 text-white font-bold py-3 rounded-xl cursor-pointer hover:bg-teal-600 transition-all duration-200">
                  Connect to a Provider
                </button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      {/* ── PROVIDER DETAIL DIALOG ── */}
      <AnimatePresence>
        {selectedProvider && (
          <Dialog open={!!selectedProvider} onOpenChange={() => setSelectedProvider(null)}>
            <DialogContent className="bg-white border-slate-200 max-w-md">
              <DialogHeader>
                <DialogTitle className="text-slate-900 text-xl font-black">{selectedProvider.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="relative rounded-xl overflow-hidden h-48">
                  <Image src={selectedProvider.avatar} alt={selectedProvider.name} fill className="object-cover" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 rounded-lg p-3">
                    <p className="text-xs text-slate-500 mb-1">Specialty</p>
                    <p className="font-black text-slate-900 text-sm">{selectedProvider.specialty}</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3">
                    <p className="text-xs text-slate-500 mb-1">Experience</p>
                    <p className="font-black text-slate-900 text-sm">{selectedProvider.experience}</p>
                  </div>
                  <div className="bg-teal-50 rounded-lg p-3">
                    <p className="text-xs text-teal-600 mb-1">Patient Rating</p>
                    <p className="font-black text-teal-700 text-sm flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />{selectedProvider.rating} ({selectedProvider.reviews.toLocaleString()} reviews)</p>
                  </div>
                  <div className="bg-teal-50 rounded-lg p-3">
                    <p className="text-xs text-teal-600 mb-1">Languages</p>
                    <p className="font-black text-teal-700 text-sm">{selectedProvider.languages.join(", ")}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600">{selectedProvider.credentials}</p>
                <button onClick={() => { setSelectedProvider(null); setBookingOpen(true) }} className="w-full bg-teal-500 text-white font-bold py-3 rounded-xl cursor-pointer hover:bg-teal-600 transition-all duration-200">
                  Book Visit with {selectedProvider.name.split(" ")[1]}
                </button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  )
}
