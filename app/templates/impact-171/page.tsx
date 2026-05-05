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
import { Heart, Globe, Users, HandHeart, TreePine, Droplets, BookOpen, ShieldCheck, Star, ArrowRight, Menu, X, Check, ChevronRight, Mail, Phone, MapPin, TrendingUp, Award, Clock, DollarSign, Leaf, Sun, Waves, Home } from "lucide-react"

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
  { value: "4.2M+", label: "Lives Impacted", icon: <Heart className="w-5 h-5" /> },
  { value: "$380M", label: "Funds Distributed", icon: <DollarSign className="w-5 h-5" /> },
  { value: "142", label: "Countries Reached", icon: <Globe className="w-5 h-5" /> },
  { value: "98.3%", label: "Fund Utilization", icon: <TrendingUp className="w-5 h-5" /> },
  { value: "62K+", label: "Active Donors", icon: <Users className="w-5 h-5" /> },
  { value: "15 Yrs", label: "Of Impact", icon: <Award className="w-5 h-5" /> },
]

const FEATURES_TABS = [
  {
    value: "transparency",
    label: "Full Transparency",
    icon: <ShieldCheck className="w-5 h-5" />,
    title: "Radical Financial Transparency",
    description: "Every dollar you give is tracked in real time on our public ledger. We publish monthly financial reports, independent audits, and beneficiary outcome data so you always know exactly where your contribution goes.",
    items: [
      "Public real-time donation ledger updated every 6 hours",
      "Annual third-party audits published in full",
      "Per-project cost-per-beneficiary breakdowns",
      "Blockchain-verified fund allocation records",
      "Instant donation receipts with impact projections",
      "Quarterly impact reports delivered to every donor",
    ],
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
  },
  {
    value: "programs",
    label: "Our Programs",
    icon: <HandHeart className="w-5 h-5" />,
    title: "Programs Built for Lasting Change",
    description: "We run four flagship programs across clean water, education, climate resilience, and emergency relief — each designed with local communities, not just for them. Every program has a 5-year sustainability roadmap.",
    items: [
      "Clean Water Initiative: 2,400 wells funded across Sub-Saharan Africa",
      "Education First: 180,000 children enrolled in funded schools",
      "Climate Resilience Fund: reforestation across 3.2M hectares",
      "Emergency Relief Network: 72-hour deployment guarantee",
      "Women Empowerment Grants: 14,000 micro-loans disbursed",
      "Community Health Workers: 8,500 trained and deployed",
    ],
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
  },
  {
    value: "technology",
    label: "Impact Tech",
    icon: <TrendingUp className="w-5 h-5" />,
    title: "Technology That Amplifies Every Dollar",
    description: "Our proprietary ImpactOS platform uses satellite imagery, mobile data, and AI to validate that aid reaches its intended destination and measures real-world outcomes with scientific rigor.",
    items: [
      "Satellite-verified project completion tracking",
      "Mobile-first beneficiary feedback system (24 languages)",
      "AI-powered needs assessment and fund allocation",
      "Fraud detection engine with 99.7% accuracy",
      "Donor-facing impact dashboard with live updates",
      "Open API for corporate CSR platform integration",
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  },
]

const TESTIMONIALS = [
  {
    name: "Sarah Okonkwo",
    role: "Major Donor",
    company: "Okonkwo Family Foundation",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1eb1df?w=200&q=80",
    initials: "SO",
    rating: 5,
    quote: "I've donated to dozens of organizations over 20 years. Kindred is the only one where I can see exactly what happens to every dollar within hours of giving. The transparency is genuinely unprecedented — and the impact is real.",
  },
  {
    name: "Dr. Marcus Webb",
    role: "Chief Philanthropy Officer",
    company: "Webb & Associates",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    initials: "MW",
    rating: 5,
    quote: "The ImpactOS dashboard gives our foundation the visibility we need to justify large multi-year commitments. We moved $2.4M through Kindred last fiscal year with complete confidence in utilization rates.",
  },
  {
    name: "Amara Diallo",
    role: "Community Leader",
    company: "Kayes Region, Mali",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80",
    initials: "AD",
    rating: 5,
    quote: "The well Kindred built in our village in 2022 changed everything. Before it, women walked 6 hours daily for water. Now our daughters go to school. I can tell you the exact donor whose gift paid for the pump.",
  },
  {
    name: "Jennifer Hartley",
    role: "Head of ESG",
    company: "Meridian Capital Group",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
    initials: "JH",
    rating: 5,
    quote: "We integrated Kindred's API into our corporate giving portal in under two days. Now 3,200 Meridian employees donate monthly with full transparency. Employee engagement with our CSR program jumped 340%.",
  },
  {
    name: "Thomas Eriksson",
    role: "Recurring Donor",
    company: "Private Individual",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    initials: "TE",
    rating: 5,
    quote: "I give $50/month. Kindred sends me a photo update and GPS-verified progress report on my assigned project every 30 days. I've watched a school in Bangladesh go from groundbreaking to graduation over 3 years.",
  },
]

const PRICING = [
  {
    name: "Individual",
    price: "Free",
    period: "",
    description: "Start your giving journey with full access to all donation tools and transparency features.",
    highlight: false,
    badge: null,
    features: [
      "Real-time donation tracking dashboard",
      "Monthly impact reports",
      "Choose from 60+ active projects",
      "Tax receipt automation",
      "Donor community access",
      "Mobile app (iOS & Android)",
    ],
    cta: "Start Giving",
  },
  {
    name: "Champion",
    price: "$29",
    period: "/month",
    description: "For dedicated supporters who want deeper engagement, matching tools, and exclusive program access.",
    highlight: true,
    badge: "Most Impactful",
    features: [
      "Everything in Individual",
      "2x donation matching on select campaigns",
      "Dedicated impact advisor",
      "Quarterly video calls with field teams",
      "Named beneficiary updates (photos + stories)",
      "Early access to emergency relief campaigns",
      "Annual impact statement for tax purposes",
      "Champion-exclusive project votes",
    ],
    cta: "Become a Champion",
  },
  {
    name: "Foundation",
    price: "Custom",
    period: "",
    description: "For family foundations and corporate partners moving $50K+ annually with full white-glove service.",
    highlight: false,
    badge: "Enterprise",
    features: [
      "Everything in Champion",
      "Dedicated relationship manager",
      "Custom API integration",
      "Named project sponsorship rights",
      "On-site field visits (1/year)",
      "Co-branded impact reports",
      "Priority emergency fund deployment",
      "Board-level impact presentations",
    ],
    cta: "Contact Us",
  },
]

const FAQS = [
  {
    q: "How do I know my donation actually reaches the people who need it?",
    a: "Every donation is tracked on our blockchain-verified ledger. You receive GPS-tagged project updates, satellite-verified completion photos, and beneficiary feedback collected via our mobile app. We also publish full independent audits quarterly. Our fund utilization rate is 98.3% — one of the highest in the sector.",
  },
  {
    q: "What percentage of my donation goes to overhead versus programs?",
    a: "On average, 91.7 cents of every dollar goes directly to programs. The remaining 8.3 cents covers essential operational costs including our technology platform, compliance, and donor services. This is fully disclosed in our annual financial statements, which are freely available on our website.",
  },
  {
    q: "Can I direct my donation to a specific project or region?",
    a: "Yes, absolutely. You can browse our full catalog of 60+ active projects filtered by country, program type, urgency level, and funding gap. You can dedicate 100% of your gift to a specific project, or choose our 'Best Use' option and let our team allocate to highest-need areas.",
  },
  {
    q: "Are donations tax-deductible?",
    a: "Yes. Kindred Global is registered as a 501(c)(3) nonprofit in the United States and holds equivalent charitable status in the UK, EU, Canada, and Australia. We automatically generate and email official tax receipts for every donation. For gifts over $250, we provide a comprehensive annual giving statement.",
  },
  {
    q: "How quickly does emergency relief funding get deployed?",
    a: "Our Emergency Relief Network guarantees fund deployment within 72 hours of a declared crisis. We maintain a $5M pre-positioned emergency reserve that allows us to respond immediately while donor campaigns ramp up. Average time from crisis declaration to boots-on-the-ground is 18 hours.",
  },
  {
    q: "What is the Champion matching program and how does it work?",
    a: "Champion members get access to 2x matching on select campaigns funded by our corporate partners. When you donate to an eligible campaign, a corporate partner matches your gift dollar-for-dollar, effectively doubling your impact. Matching campaigns are clearly labeled in the dashboard and limited by partner budgets, so we recommend acting quickly.",
  },
  {
    q: "Can my company integrate Kindred into our corporate giving platform?",
    a: "Yes. We offer a full REST API and Zapier integration that lets companies embed Kindred's donation flow, project catalog, and impact reporting directly into internal platforms, intranets, or HR systems. Our integration team handles onboarding and most companies are live within 5 business days.",
  },
]

export default function KindredNonProfit() {
  const [donationAmount, setDonationAmount] = useState(50)
  const [customAmount, setCustomAmount] = useState("")
  const [donateOpen, setDonateOpen] = useState(false)
  const [progressValues] = useState([78, 45, 92, 61])

  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const yHero = useTransform(scrollYProgress, [0, 0.4], ["0%", "20%"])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 50, damping: 25 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 25 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX - window.innerWidth / 2) * 0.03)
      mouseY.set((e.clientY - window.innerHeight / 2) * 0.03)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  const presetAmounts = [25, 50, 100, 250]

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
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">Kindred<span className="text-emerald-500">Global</span></span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {["Our Mission", "Programs", "Transparency", "Stories", "Corporate"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-all duration-150 cursor-pointer"
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
              onClick={() => setDonateOpen(true)}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-emerald-200 hover:shadow-lg cursor-pointer"
            >
              Donate Now
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
                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                      <Heart className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg font-bold text-slate-900">KindredGlobal</span>
                  </div>
                  {["Our Mission", "Programs", "Transparency", "Stories", "Corporate", "Sign In"].map((item) => (
                    <Link key={item} href="#" className="text-base font-medium text-slate-700 hover:text-emerald-600 transition-all duration-150 cursor-pointer">
                      {item}
                    </Link>
                  ))}
                  <button
                    onClick={() => setDonateOpen(true)}
                    className="bg-emerald-500 text-white py-3 rounded-full font-semibold hover:bg-emerald-600 transition-all duration-200 cursor-pointer"
                  >
                    Donate Now
                  </button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.header>

      {/* DONATION DIALOG */}
      <Dialog open={donateOpen} onOpenChange={setDonateOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-slate-900">Make a Donation</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-2">
            <div>
              <p className="text-sm text-slate-500 mb-3 font-medium">Select amount</p>
              <div className="grid grid-cols-4 gap-2">
                {presetAmounts.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => { setDonationAmount(amt); setCustomAmount("") }}
                    className={`py-2 rounded-lg text-sm font-semibold border-2 transition-all duration-200 cursor-pointer ${donationAmount === amt && !customAmount ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-slate-200 text-slate-700 hover:border-emerald-300"}`}
                  >
                    ${amt}
                  </button>
                ))}
              </div>
              <input
                type="number"
                placeholder="Custom amount"
                value={customAmount}
                onChange={(e) => { setCustomAmount(e.target.value); setDonationAmount(0) }}
                className="mt-3 w-full border-2 border-slate-200 rounded-lg px-4 py-2 text-slate-800 placeholder:text-slate-400 focus:border-emerald-400 outline-none transition-all duration-200"
              />
            </div>
            <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
              <p className="text-sm text-emerald-800 font-medium">
                Your ${customAmount || donationAmount} donation provides clean water to <strong>{Math.round((Number(customAmount) || donationAmount) * 2.4)} people</strong> for one year.
              </p>
            </div>
            <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg transition-all duration-200 cursor-pointer shadow-lg">
              Donate ${customAmount || donationAmount} Now
            </button>
            <p className="text-xs text-slate-400 text-center">Secure. Tax-deductible. 91.7% goes directly to programs.</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* HERO SECTION */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden pt-16">
        <motion.div style={{ y: yHero }} className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80"
            alt="Children at school"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/30" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <Reveal>
              <div className="flex items-center gap-2 mb-6">
                <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 px-3 py-1 text-xs font-semibold">
                  Verified Non-Profit · 501(c)(3)
                </Badge>
                <Badge className="bg-white/10 text-white/80 border-white/20 px-3 py-1 text-xs font-semibold">
                  4-Star Charity Navigator
                </Badge>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
                Give with{" "}
                <span className="text-emerald-400">Complete</span>{" "}
                Confidence
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-xl text-slate-300 leading-relaxed mb-10 max-w-2xl">
                Kindred Global is the world's most transparent donation platform. Track every dollar in real time, meet your beneficiaries by name, and watch verified satellite imagery confirm your impact on the ground.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex flex-wrap gap-4 mb-12">
                <button
                  onClick={() => setDonateOpen(true)}
                  className="bg-emerald-500 hover:bg-emerald-400 text-white px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2 transition-all duration-200 shadow-xl hover:shadow-emerald-500/30 cursor-pointer"
                >
                  Start Giving <Heart className="w-5 h-5" />
                </button>
                <Link
                  href="#programs"
                  className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2 transition-all duration-200 border border-white/20 cursor-pointer"
                >
                  See Our Impact <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="flex flex-wrap gap-6 items-center">
                <div className="flex -space-x-2">
                  {["SO", "MW", "AD", "JH", "TE"].map((initials, i) => (
                    <div key={i} className="w-9 h-9 rounded-full border-2 border-white bg-emerald-500 flex items-center justify-center text-xs font-bold text-white">
                      {initials}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <p className="text-sm text-slate-300">Trusted by <strong className="text-white">62,000+</strong> donors worldwide</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Floating impact card */}
        <motion.div
          style={{ x: springX, y: springY }}
          className="absolute bottom-12 right-8 lg:right-16 bg-white rounded-2xl shadow-2xl p-5 hidden lg:block max-w-xs"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
              <Droplets className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Clean Water Initiative</p>
              <p className="text-sm font-bold text-slate-900">Well #2,401 — Kayes, Mali</p>
            </div>
          </div>
          <Progress value={87} className="h-2 mb-2" />
          <div className="flex justify-between text-xs text-slate-500">
            <span>$87,240 raised</span>
            <span className="text-emerald-600 font-semibold">87% funded</span>
          </div>
        </motion.div>
      </section>

      {/* STATS BAR */}
      <section className="bg-emerald-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {STATS.map((stat, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="text-center text-white">
                  <div className="flex justify-center mb-2 text-emerald-200">{stat.icon}</div>
                  <div className="text-3xl font-extrabold mb-1">{stat.value}</div>
                  <div className="text-sm text-emerald-100 font-medium">{stat.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ACTIVE CAMPAIGNS PROGRESS */}
      <section className="py-16 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-10">
              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 mb-3">Live Campaigns</Badge>
              <h2 className="text-2xl font-bold text-slate-900">Campaigns Needing Your Support Right Now</h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "Schools in Bangladesh", icon: <BookOpen className="w-5 h-5" />, progress: 78, raised: "$156K", goal: "$200K", region: "Asia" },
              { name: "Reforestation Brazil", icon: <TreePine className="w-5 h-5" />, progress: 45, raised: "$89K", goal: "$200K", region: "Americas" },
              { name: "Water Wells Sudan", icon: <Droplets className="w-5 h-5" />, progress: 92, raised: "$184K", goal: "$200K", region: "Africa" },
              { name: "Solar for Kenya", icon: <Sun className="w-5 h-5" />, progress: 61, raised: "$122K", goal: "$200K", region: "Africa" },
            ].map((campaign, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <Card className="border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all duration-200 cursor-pointer">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                        {campaign.icon}
                      </div>
                      <Badge className="text-xs bg-slate-100 text-slate-600 border-slate-200">{campaign.region}</Badge>
                    </div>
                    <h3 className="font-semibold text-slate-900 text-sm mb-3">{campaign.name}</h3>
                    <Progress value={progressValues[i]} className="h-2 mb-2" />
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>{campaign.raised}</span>
                      <span className="font-semibold text-emerald-600">{progressValues[i]}%</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Goal: {campaign.goal}</p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES / TABS */}
      <section id="programs" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-14">
              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 mb-4">Why Kindred</Badge>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">
                Built Different. Accountable By Design.
              </h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
                From real-time fund tracking to satellite-verified outcomes, we've reinvented what it means to give with confidence.
              </p>
            </div>
          </Reveal>

          <Tabs defaultValue="transparency" className="w-full">
            <TabsList className="grid grid-cols-3 max-w-xl mx-auto mb-12 bg-slate-100 p-1 rounded-xl">
              {FEATURES_TABS.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="flex items-center gap-2 rounded-lg cursor-pointer data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-emerald-700 transition-all duration-200"
                >
                  {tab.icon}
                  <span className="hidden sm:block text-xs font-semibold">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {FEATURES_TABS.map((tab) => (
              <TabsContent key={tab.value} value={tab.value}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 mb-4">{tab.label}</Badge>
                    <h3 className="text-3xl font-extrabold text-slate-900 mb-4">{tab.title}</h3>
                    <p className="text-slate-500 leading-relaxed mb-8">{tab.description}</p>
                    <ul className="space-y-3">
                      {tab.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-emerald-600" />
                          </div>
                          <span className="text-sm text-slate-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => setDonateOpen(true)}
                      className="mt-8 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-full font-semibold text-sm flex items-center gap-2 transition-all duration-200 cursor-pointer shadow-md"
                    >
                      Donate Now <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative h-[420px] rounded-2xl overflow-hidden shadow-2xl"
                  >
                    <Image src={tab.image} alt={tab.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center">
                            <ShieldCheck className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="text-xs text-slate-500">Verified Impact</p>
                            <p className="text-sm font-bold text-slate-900">98.3% Fund Utilization Rate</p>
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

      {/* TESTIMONIALS CAROUSEL */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-14">
              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 mb-4">Donor Stories</Badge>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">
                Stories from Our Community
              </h2>
              <p className="text-lg text-slate-500 max-w-xl mx-auto">
                Donors, foundations, and beneficiaries share why Kindred changed how they think about giving.
              </p>
            </div>
          </Reveal>

          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {TESTIMONIALS.map((t, i) => (
                <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/2 pl-4">
                  <Card className="border border-slate-200 hover:border-emerald-200 hover:shadow-lg transition-all duration-200 cursor-pointer h-full">
                    <CardContent className="p-8 flex flex-col h-full">
                      <div className="flex items-center gap-1 mb-4">
                        {Array.from({ length: t.rating }).map((_, j) => (
                          <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-slate-700 leading-relaxed flex-1 mb-6 text-sm">
                        "{t.quote}"
                      </p>
                      <Separator className="mb-5" />
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={t.avatar} alt={t.name} />
                          <AvatarFallback className="bg-emerald-100 text-emerald-700 text-sm font-bold">{t.initials}</AvatarFallback>
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

      {/* PRICING SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-14">
              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 mb-4">Giving Plans</Badge>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">
                Choose Your Level of Impact
              </h2>
              <p className="text-lg text-slate-500 max-w-xl mx-auto">
                From your first $25 to multi-million-dollar foundation partnerships — we have a path for every donor.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {PRICING.map((plan, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <Card
                  className={`relative border-2 transition-all duration-200 cursor-pointer h-full flex flex-col ${
                    plan.highlight
                      ? "border-emerald-500 shadow-xl shadow-emerald-100"
                      : "border-slate-200 hover:border-emerald-200 hover:shadow-md"
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <Badge className={plan.highlight ? "bg-emerald-500 text-white border-emerald-500 px-4 py-1" : "bg-slate-800 text-white border-slate-800 px-4 py-1"}>
                        {plan.badge}
                      </Badge>
                    </div>
                  )}
                  <CardContent className="p-8 flex flex-col flex-1">
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                      <div className="flex items-end gap-1 mb-3">
                        <span className="text-4xl font-extrabold text-slate-900">{plan.price}</span>
                        <span className="text-slate-400 pb-1 font-medium">{plan.period}</span>
                      </div>
                      <p className="text-sm text-slate-500 leading-relaxed">{plan.description}</p>
                    </div>

                    <ul className="space-y-3 flex-1 mb-8">
                      {plan.features.map((feature, j) => (
                        <li key={j} className="flex items-start gap-2.5">
                          <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.highlight ? "text-emerald-500" : "text-slate-400"}`} />
                          <span className="text-sm text-slate-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => setDonateOpen(true)}
                      className={`w-full py-3 rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer ${
                        plan.highlight
                          ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-md"
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

      {/* FAQ ACCORDION */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-14">
              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 mb-4">FAQ</Badge>
              <h2 className="text-4xl font-extrabold text-slate-900 mb-4">
                Your Questions, Answered Honestly
              </h2>
              <p className="text-slate-500 leading-relaxed">
                We believe transparency starts with how we talk about ourselves. Here are the real answers to the questions donors ask most.
              </p>
            </div>
          </Reveal>

          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-white border border-slate-200 rounded-xl px-6 hover:border-emerald-200 transition-all duration-200 cursor-pointer shadow-sm"
              >
                <AccordionTrigger className="text-left font-semibold text-slate-900 py-5 hover:no-underline text-sm leading-snug cursor-pointer">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed pb-5 text-sm">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-24 bg-emerald-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80" alt="Impact" fill className="object-cover" />
        </div>
        <motion.div
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-emerald-400/30 blur-3xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
              Every Dollar You Give <br />Changes a Real Life
            </h2>
            <p className="text-xl text-emerald-100 max-w-xl mx-auto mb-10 leading-relaxed">
              Join 62,000 donors who give with total transparency. See your impact. Know your beneficiary. Measure the change you create.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => setDonateOpen(true)}
                className="bg-white hover:bg-emerald-50 text-emerald-700 px-8 py-4 rounded-full font-bold text-lg transition-all duration-200 shadow-xl cursor-pointer"
              >
                Donate Today
              </button>
              <Link
                href="#"
                className="bg-transparent border-2 border-white/40 hover:bg-white/10 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-200 cursor-pointer"
              >
                Learn About Our Work
              </Link>
            </div>
            <p className="text-emerald-200 text-sm mt-8">
              Rated 4 stars on Charity Navigator · 100% tax-deductible · Cancel any time
            </p>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold">Kindred<span className="text-emerald-400">Global</span></span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
                The world's most transparent donation platform. Verified impact. Real beneficiaries. Every dollar tracked.
              </p>
              <div className="flex gap-3">
                {[Globe, Globe, Globe, Globe].map((Icon, i) => (
                  <a key={i} href="#" className="w-9 h-9 rounded-full bg-slate-800 hover:bg-emerald-600 flex items-center justify-center transition-all duration-200 cursor-pointer">
                    <Icon className="w-4 h-4 text-slate-400 hover:text-white transition-colors duration-200" />
                  </a>
                ))}
              </div>
            </div>

            {/* Programs */}
            <div>
              <h4 className="font-semibold text-white mb-4 text-sm">Programs</h4>
              <ul className="space-y-3">
                {["Clean Water", "Education", "Climate Action", "Emergency Relief", "Women's Empowerment"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-slate-400 hover:text-emerald-400 text-sm transition-all duration-150 cursor-pointer">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* About */}
            <div>
              <h4 className="font-semibold text-white mb-4 text-sm">About</h4>
              <ul className="space-y-3">
                {["Our Mission", "Financial Reports", "Leadership Team", "Press & Media", "Careers"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-slate-400 hover:text-emerald-400 text-sm transition-all duration-150 cursor-pointer">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-white mb-4 text-sm">Contact</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-emerald-500" />
                  <span>hello@kindredglobal.org</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-500" />
                  <span>+1 (800) 554-2290</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-500" />
                  <span>New York · London · Nairobi</span>
                </li>
              </ul>
              <button
                onClick={() => setDonateOpen(true)}
                className="mt-6 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer w-full"
              >
                Donate Now
              </button>
            </div>
          </div>

          <Separator className="bg-slate-800 mb-8" />

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>© 2026 Kindred Global Foundation. 501(c)(3) · EIN 47-1234567</p>
            <div className="flex gap-6">
              {["Privacy Policy", "Terms of Use", "Cookie Settings", "Accessibility"].map((item) => (
                <Link key={item} href="#" className="hover:text-slate-300 transition-all duration-150 cursor-pointer">
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
