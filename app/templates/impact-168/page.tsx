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
import { Menu, X, CalendarDays, Users, BarChart3, Ticket, MapPin, Bell, Star, ChevronRight, CheckCircle2, Zap, Globe, Clock, ArrowRight, TrendingUp, Shield } from "lucide-react"

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
  { value: 12000, suffix: "+", label: "Events Managed Annually" },
  { value: 98, suffix: "%", label: "Organizer Satisfaction" },
  { value: 4200, suffix: "+", label: "Venues Worldwide" },
  { value: 340, suffix: "M", label: "Tickets Sold to Date" },
]

const FEATURES = {
  "Event Builder": {
    icon: <CalendarDays className="w-6 h-6" />,
    headline: "Drag-and-Drop Event Creation",
    description: "Build stunning event pages in minutes with our intuitive visual builder. Choose from 200+ professionally designed templates, customize branding, embed multimedia, and publish across web and mobile with a single click.",
    items: [
      "200+ customizable event templates for every industry",
      "Real-time collaborative editing with your team",
      "Multi-date, multi-session, and hybrid event support",
      "Custom domain mapping and white-label options",
      "One-click duplication for recurring events",
    ],
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
  },
  "Ticketing": {
    icon: <Ticket className="w-6 h-6" />,
    headline: "Powerful Ticketing & Registration",
    description: "Sell unlimited ticket types, manage capacity, set early-bird pricing, and automate waitlists. Our embedded checkout converts 40% higher than redirect-based solutions — keeping attendees in your experience.",
    items: [
      "Unlimited ticket tiers: GA, VIP, early-bird, group",
      "Automated waitlists with instant vacancy alerts",
      "Reserved seating maps with interactive floor plans",
      "Promo codes, referral discounts, and bundle deals",
      "Instant payouts with Stripe, PayPal, and 50+ gateways",
    ],
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80",
  },
  "Attendee Management": {
    icon: <Users className="w-6 h-6" />,
    headline: "360° Attendee Intelligence",
    description: "Know your audience before, during, and after the event. Collect custom registration data, segment attendees by type or interest, run personalized email campaigns, and export CRM-ready contact lists.",
    items: [
      "Custom registration forms with conditional logic",
      "NFC & QR check-in with offline fallback mode",
      "Real-time attendance tracking and occupancy alerts",
      "Post-event surveys with Net Promoter Score tracking",
      "Native integrations with Salesforce, HubSpot, Mailchimp",
    ],
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80",
  },
  "Analytics": {
    icon: <BarChart3 className="w-6 h-6" />,
    headline: "Real-Time Event Analytics",
    description: "Track every metric that matters — from first page view to last check-out. Our live dashboard gives organizers complete visibility into revenue, attendee demographics, marketing ROI, and post-event engagement.",
    items: [
      "Live revenue dashboards with forecast modeling",
      "Traffic source attribution and conversion funnels",
      "Geographic heatmaps of attendee locations",
      "Speaker and session performance scoring",
      "Exportable reports in PDF, CSV, and Looker formats",
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  },
}

const TESTIMONIALS = [
  {
    quote: "Eventora replaced five different tools we were juggling. Our team set up a 3,000-person conference in under 2 hours. The check-in experience alone saved us 4 staff members at the door.",
    name: "Sarah Lindström",
    role: "Director of Events",
    company: "Nordic Tech Summit",
    avatar: "SL",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=400&q=80",
  },
  {
    quote: "The ticketing conversion rate jumped from 22% to 61% after switching. Embedded checkout is a game-changer. We recouped the annual subscription in the first event alone.",
    name: "Marcus Okafor",
    role: "CEO",
    company: "Lagos Music Festival",
    avatar: "MO",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  },
  {
    quote: "Managing 80 corporate events a year used to require a team of 12. With Eventora's automation and templates, we handle the same volume with 7 people — and our clients are happier.",
    name: "Priya Nambiar",
    role: "Head of Corporate Events",
    company: "Pinnacle Group UK",
    avatar: "PN",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
  },
  {
    quote: "The analytics dashboard finally gave us ROI data we could show to the CFO. We proved our flagship event generates 6x return on spend. Budget approved for three more.",
    name: "James Whitfield",
    role: "VP Marketing",
    company: "FutureBuild Expo",
    avatar: "JW",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
  },
  {
    quote: "The hybrid event tools are the best I've tested. In-person and virtual attendees get the same quality experience. Our last summit had 1,200 in-room and 8,500 streaming simultaneously.",
    name: "Akemi Tanaka",
    role: "Founder",
    company: "Tokyo Design Week",
    avatar: "AT",
    rating: 5,
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80",
  },
]

const PRICING = [
  {
    name: "Starter",
    price: "$0",
    period: "forever",
    description: "Perfect for independent organizers running occasional events.",
    features: [
      "Up to 3 active events",
      "500 attendees per event",
      "Basic ticketing with 2% + $0.50 fee",
      "Email check-in management",
      "Standard analytics dashboard",
      "Community support forum",
    ],
    cta: "Get Started Free",
    highlighted: false,
    badge: null,
  },
  {
    name: "Professional",
    price: "$149",
    period: "per month",
    description: "For growing teams running regular events at scale.",
    features: [
      "Unlimited active events",
      "Up to 10,000 attendees per event",
      "Zero platform fee on ticketing",
      "Custom branded event pages",
      "NFC & QR check-in app",
      "Advanced analytics with exports",
      "Priority email + chat support",
      "CRM integrations (Salesforce, HubSpot)",
      "Waitlist and promo code engine",
    ],
    cta: "Start Free Trial",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "tailored to you",
    description: "For large organizations managing hundreds of events globally.",
    features: [
      "Unlimited events and attendees",
      "Dedicated account manager",
      "White-label platform with custom domain",
      "SLA-backed 99.99% uptime guarantee",
      "Custom API access and webhooks",
      "Advanced security (SSO, SAML, SOC 2)",
      "On-site check-in hardware support",
      "Custom reporting and BI integrations",
      "24/7 phone + Globe support",
    ],
    cta: "Contact Sales",
    highlighted: false,
    badge: null,
  },
]

const FAQS = [
  {
    q: "How quickly can I create and publish my first event?",
    a: "Most organizers publish their first event in under 15 minutes. Our step-by-step wizard walks you through event details, ticketing setup, and branding. If you use one of our 200+ templates, you can be live in under 5 minutes with a fully branded page.",
  },
  {
    q: "What payment gateways does Eventora support?",
    a: "Eventora integrates with Stripe, PayPal, Square, Braintree, and 50+ regional gateways globally. We support 135 currencies and handle all PCI compliance so you don't have to. Payouts are processed within 2 business days on Professional and Enterprise plans.",
  },
  {
    q: "Can I manage both in-person and virtual events on the same platform?",
    a: "Absolutely. Eventora was built for hybrid from the ground up. You can sell separate ticket tiers for in-person and virtual, stream live video through our built-in streaming engine or connect Zoom/Teams, and track attendance across both channels in real time.",
  },
  {
    q: "How does the NFC check-in system work?",
    a: "Attendees receive a unique QR code or NFC-enabled wristband. Our iOS and Android check-in app works fully offline — it syncs when connectivity resumes. You can deploy multiple check-in stations simultaneously and see real-time door counts on your organizer dashboard.",
  },
  {
    q: "Is my attendee data secure and GDPR compliant?",
    a: "Yes. Eventora is SOC 2 Type II certified, GDPR compliant, and CCPA compliant. All data is encrypted at rest (AES-256) and in transit (TLS 1.3). You own your attendee data — we never sell it. Enterprise plans include data residency options in the EU, US, or APAC.",
  },
  {
    q: "What happens if my event is cancelled or postponed?",
    a: "We provide a one-click refund engine for full or partial refunds to all attendees. You can also issue event credits automatically for postponements. Eventora's cancellation protection add-on covers platform fees in cases of force majeure — contact our team for details.",
  },
  {
    q: "Can I white-label the platform for my clients?",
    a: "Yes, on Enterprise plans you can deploy a fully white-labeled version with your own domain, logo, color scheme, and branded emails. Your clients will never see the Eventora name. We also offer reseller programs for event agencies managing multiple client accounts.",
  },
]

export default function EventoraPlatform() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [demoOpen, setDemoOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const heroY = useTransform(scrollYProgress, [0, 0.4], [0, -60])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.4])

  return (
    <div
      ref={containerRef}
      style={{ overflowX: "hidden", scrollBehavior: "smooth" }}
      className="min-h-screen bg-white text-slate-900"
    >
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-violet-600 origin-left z-[60]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Sticky Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="#" className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
              <CalendarDays className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-black text-slate-900 tracking-tight">Eventora</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {["Product", "Pricing", "Customers", "Resources", "Blog"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-sm font-semibold text-slate-600 hover:text-violet-600 cursor-pointer transition-all duration-200"
              >
                {item}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="#" className="hidden md:inline-flex text-sm font-semibold text-slate-700 hover:text-violet-600 cursor-pointer transition-all duration-200 px-4 py-2">
              Sign In
            </Link>
            <button
              onClick={() => setDemoOpen(true)}
              className="cursor-pointer hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-violet-600 text-white text-sm font-bold rounded-xl hover:bg-violet-700 transition-all duration-200 shadow-lg shadow-violet-200"
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
                  {["Product", "Pricing", "Customers", "Resources"].map((item) => (
                    <Link key={item} href="#" className="text-lg font-bold text-slate-800 hover:text-violet-600 cursor-pointer transition-all duration-200">
                      {item}
                    </Link>
                  ))}
                  <Separator />
                  <button className="cursor-pointer w-full py-3 bg-violet-600 text-white font-bold rounded-xl hover:bg-violet-700 transition-all duration-200">
                    Get Started Free
                  </button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-28 pb-24 overflow-hidden bg-gradient-to-br from-violet-50 via-white to-indigo-50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(139,92,246,0.15),transparent)]" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-violet-200 rounded-full blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-indigo-200 rounded-full blur-2xl opacity-40" />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative max-w-7xl mx-auto px-6 text-center">
          <Reveal delay={0.05}>
            <div className="flex items-center justify-center gap-3 mb-6">
              <Badge className="bg-violet-100 text-violet-700 border-violet-200 px-4 py-1.5 text-sm font-semibold cursor-pointer hover:bg-violet-200 transition-all duration-200">
                <Zap className="w-3.5 h-3.5 mr-1.5" />
                #1 Event Management Platform of 2026
              </Badge>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-tight mb-6 tracking-tight">
              Run Events That{" "}
              <span className="relative inline-block">
                <span className="text-violet-600">Actually Impress</span>
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-violet-400 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                />
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
              From intimate workshops to 50,000-person festivals — Eventora handles ticketing, check-in, attendee management, and analytics in one beautifully integrated platform.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <button
                onClick={() => setDemoOpen(true)}
                className="cursor-pointer inline-flex items-center gap-2 px-8 py-4 bg-violet-600 text-white text-lg font-bold rounded-2xl hover:bg-violet-700 transition-all duration-200 shadow-xl shadow-violet-200"
              >
                Start for Free
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="cursor-pointer inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-800 text-lg font-bold rounded-2xl border-2 border-slate-200 hover:border-violet-300 hover:text-violet-700 transition-all duration-200 shadow-md">
                Watch Demo
                <Zap className="w-5 h-5" />
              </button>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-semibold text-slate-500">
              {[
                { icon: <CheckCircle2 className="w-4 h-4 text-green-500" />, text: "Free forever plan" },
                { icon: <CheckCircle2 className="w-4 h-4 text-green-500" />, text: "No credit card required" },
                { icon: <CheckCircle2 className="w-4 h-4 text-green-500" />, text: "Set up in 15 minutes" },
                { icon: <Shield className="w-4 h-4 text-blue-500" />, text: "SOC 2 Type II certified" },
              ].map((badge, i) => (
                <div key={i} className="flex items-center gap-2 cursor-pointer">
                  {badge.icon}
                  {badge.text}
                </div>
              ))}
            </div>
          </Reveal>
        </motion.div>

        <Reveal delay={0.5}>
          <div className="relative max-w-5xl mx-auto px-6 mt-16">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
              <Image
                src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80"
                alt="Eventora dashboard"
                width={1200}
                height={600}
                className="w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-violet-900/20 to-transparent" />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Stats Bar */}
      <section className="py-16 bg-violet-600">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-black text-white mb-2">
                    <Counter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-violet-200 font-semibold text-sm">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <Badge className="bg-violet-50 text-violet-700 border-violet-100 mb-4 cursor-pointer">Platform Features</Badge>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 leading-tight">
                Everything you need to run world-class events
              </h2>
              <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">
                Replace 5 different tools with one unified platform. Built for event professionals who demand reliability at scale.
              </p>
            </div>
          </Reveal>

          <Tabs defaultValue="Event Builder" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-12 bg-slate-100 p-1 rounded-2xl gap-1">
              {Object.entries(FEATURES).map(([key, val]) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="cursor-pointer rounded-xl font-semibold text-sm data-[state=active]:bg-white data-[state=active]:text-violet-700 data-[state=active]:shadow-sm transition-all duration-200 flex items-center gap-2"
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
                      <div className="relative h-72 lg:h-auto min-h-[320px]">
                        <Image src={feat.image} alt={feat.headline} fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/5" />
                      </div>
                      <CardContent className="p-10 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center text-violet-600">
                            {feat.icon}
                          </div>
                          <Badge className="bg-violet-50 text-violet-700 border-violet-100">{key}</Badge>
                        </div>
                        <h3 className="text-3xl font-black text-slate-900 mb-4 leading-tight">{feat.headline}</h3>
                        <p className="text-slate-600 text-base leading-relaxed mb-8">{feat.description}</p>
                        <ul className="space-y-3">
                          {feat.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                              <CheckCircle2 className="w-5 h-5 text-violet-500 shrink-0 mt-0.5" />
                              {item}
                            </li>
                          ))}
                        </ul>
                        <button className="cursor-pointer mt-8 inline-flex items-center gap-2 text-violet-600 font-bold hover:text-violet-800 transition-all duration-200">
                          Learn more <ChevronRight className="w-4 h-4" />
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

      {/* Integrations Strip */}
      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <p className="text-center text-slate-500 font-semibold text-sm mb-8 uppercase tracking-wider">
              Integrates with the tools your team already uses
            </p>
          </Reveal>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
            {["Salesforce", "HubSpot", "Mailchimp", "Globe", "Zoom", "Google Analytics", "Stripe", "PayPal"].map((tool) => (
              <Reveal key={tool}>
                <div className="cursor-pointer px-6 py-3 bg-white rounded-xl border border-slate-200 font-bold text-slate-600 text-sm hover:opacity-100 hover:border-violet-300 hover:text-violet-700 transition-all duration-200 shadow-sm">
                  {tool}
                </div>
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
                4.9 / 5 from 3,200+ reviews
              </Badge>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
                Trusted by event professionals worldwide
              </h2>
              <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">
                From small meetups to mega-conferences, our customers run better events with Eventora.
              </p>
            </div>
          </Reveal>

          <Carousel className="w-full">
            <CarouselContent className="-ml-4">
              {TESTIMONIALS.map((t, i) => (
                <CarouselItem key={i} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <Reveal delay={i * 0.08}>
                    <Card className="cursor-pointer h-full border-slate-200 hover:border-violet-300 hover:shadow-lg transition-all duration-300 bg-white">
                      <CardContent className="p-8 flex flex-col h-full">
                        <div className="flex gap-1 mb-5">
                          {Array.from({ length: t.rating }).map((_, s) => (
                            <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <p className="text-slate-700 text-base leading-relaxed mb-6 flex-1 font-medium italic">
                          &ldquo;{t.quote}&rdquo;
                        </p>
                        <div className="flex items-center gap-4">
                          <Avatar className="w-12 h-12 ring-2 ring-violet-100">
                            <AvatarImage src={t.image} alt={t.name} />
                            <AvatarFallback className="bg-violet-100 text-violet-700 font-bold">{t.avatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-bold text-slate-900">{t.name}</p>
                            <p className="text-sm text-slate-500">{t.role} · {t.company}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Reveal>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="cursor-pointer -left-5 bg-white border-slate-200 hover:bg-violet-50 hover:border-violet-300 transition-all duration-200" />
            <CarouselNext className="cursor-pointer -right-5 bg-white border-slate-200 hover:bg-violet-50 hover:border-violet-300 transition-all duration-200" />
          </Carousel>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <Badge className="bg-violet-50 text-violet-700 border-violet-100 mb-4 cursor-pointer">Simple Pricing</Badge>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
                Plans that grow with your events
              </h2>
              <p className="text-xl text-slate-500 max-w-xl mx-auto font-medium">
                Start free. Scale as you grow. No surprise fees. Cancel anytime.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {PRICING.map((plan, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <Card
                  className={`cursor-pointer relative transition-all duration-300 ${
                    plan.highlighted
                      ? "border-2 border-violet-500 shadow-2xl shadow-violet-100 scale-105"
                      : "border-slate-200 hover:border-violet-300 hover:shadow-lg"
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="bg-violet-600 text-white px-4 py-1.5 text-sm font-bold shadow-lg">
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
                          <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${plan.highlighted ? "text-violet-500" : "text-green-500"}`} />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <button
                      className={`cursor-pointer w-full py-3.5 font-bold rounded-xl text-sm transition-all duration-200 ${
                        plan.highlighted
                          ? "bg-violet-600 text-white hover:bg-violet-700 shadow-lg shadow-violet-200"
                          : "bg-slate-100 text-slate-800 hover:bg-violet-600 hover:text-white"
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
                Frequently asked questions
              </h2>
              <p className="text-xl text-slate-500 font-medium">
                Everything you need to know before getting started.
              </p>
            </div>
          </Reveal>

          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border border-slate-200 rounded-2xl px-6 hover:border-violet-300 transition-all duration-200 cursor-pointer"
              >
                <AccordionTrigger className="cursor-pointer py-5 font-bold text-slate-900 hover:text-violet-700 hover:no-underline text-left transition-all duration-200">
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
      <section className="py-24 bg-gradient-to-br from-violet-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(255,255,255,0.1),transparent)]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-800/30 rounded-full blur-2xl" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="flex -space-x-3">
                {["SL", "MO", "PN", "JW"].map((av, i) => (
                  <Avatar key={i} className="w-10 h-10 ring-2 ring-violet-500">
                    <AvatarFallback className="bg-violet-800 text-white text-xs font-bold">{av}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <span className="text-violet-200 font-semibold text-sm">Join 45,000+ event organizers</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              Ready to run your best event yet?
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-xl text-violet-200 mb-10 font-medium max-w-2xl mx-auto leading-relaxed">
              Start free, launch your first event today, and see why the world&rsquo;s top event professionals trust Eventora.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="cursor-pointer inline-flex items-center gap-2 px-10 py-4 bg-white text-violet-700 font-black text-lg rounded-2xl hover:bg-violet-50 transition-all duration-200 shadow-2xl">
                Create Your First Event
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="cursor-pointer inline-flex items-center gap-2 px-8 py-4 border-2 border-white/40 text-white font-bold rounded-2xl hover:bg-white/10 transition-all duration-200">
                Schedule a Demo
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4 cursor-pointer">
                <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
                  <CalendarDays className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-black text-lg">Eventora</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">
                The complete event management platform for modern organizers.
              </p>
              <div className="flex gap-3">
                {[Globe, Globe, Globe, Globe].map((Icon, i) => (
                  <button key={i} className="cursor-pointer w-9 h-9 rounded-lg bg-slate-800 hover:bg-violet-600 flex items-center justify-center transition-all duration-200">
                    <Icon className="w-4 h-4 text-slate-400 hover:text-white" />
                  </button>
                ))}
              </div>
            </div>

            {[
              { title: "Product", links: ["Event Builder", "Ticketing", "Check-In App", "Analytics", "Integrations", "API Docs"] },
              { title: "Solutions", links: ["Conferences", "Music Festivals", "Corporate Events", "Charity Galas", "Sports Events"] },
              { title: "Company", links: ["About Us", "Careers", "Blog", "Press Kit", "Contact"] },
              { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Security", "GDPR"] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-white font-bold text-sm mb-5 uppercase tracking-wider">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <Link href="#" className="cursor-pointer text-sm text-slate-500 hover:text-violet-400 transition-all duration-200 font-medium">
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
              © 2026 Eventora Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <span className="flex items-center gap-2 text-slate-500 font-medium">
                <Globe className="w-4 h-4" />
                English (US)
              </span>
              <Link href="#" className="cursor-pointer text-slate-500 hover:text-violet-400 transition-all duration-200 font-medium">Status</Link>
              <Link href="#" className="cursor-pointer text-slate-500 hover:text-violet-400 transition-all duration-200 font-medium">Changelog</Link>
            </div>
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
            See Eventora in action with a personalized 30-minute demo. Our team will walk through features relevant to your event type and scale.
          </p>
          <div className="space-y-4">
            <input className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:border-violet-400 transition-all duration-200" placeholder="Your name" />
            <input className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:border-violet-400 transition-all duration-200" placeholder="Work email" />
            <select className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-600 font-medium focus:outline-none focus:border-violet-400 transition-all duration-200 cursor-pointer">
              <option>Type of events you run</option>
              <option>Conferences & summits</option>
              <option>Music & entertainment</option>
              <option>Corporate & trade shows</option>
              <option>Non-profit & charity</option>
            </select>
            <button className="cursor-pointer w-full py-4 bg-violet-600 text-white font-bold rounded-xl hover:bg-violet-700 transition-all duration-200 shadow-lg shadow-violet-200">
              Request Demo
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
