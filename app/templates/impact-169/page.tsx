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
import { Menu, ChefHat, Utensils, ShoppingBag, BarChart3, Bell, Star, CheckCircle2, ArrowRight, ChevronRight, Zap, Globe, Clock, TrendingUp, Shield, Smartphone, QrCode, Users, DollarSign } from "lucide-react"

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
  { value: 8500, suffix: "+", label: "Restaurants on Platform" },
  { value: 97, suffix: "%", label: "Order Accuracy Rate" },
  { value: 2.4, suffix: "M", label: "Orders Processed Daily" },
  { value: 32, suffix: "%", label: "Average Revenue Increase" },
]

const FEATURES = {
  "Digital Menu": {
    icon: <Utensils className="w-5 h-5" />,
    headline: "Dynamic Digital Menus That Sell",
    description: "Replace static PDFs with living menus that update in real time. Feature high-res food photography, embed allergen info, display live sold-out status, and let customers filter by dietary preference — all optimized for mobile conversion.",
    items: [
      "Drag-and-drop menu builder with 60+ design themes",
      "Real-time 86 alerts — sold-out items hide instantly",
      "Dietary filters: vegan, gluten-free, halal, nut-free",
      "Upsell prompts: recommended add-ons per item",
      "Multi-language support for international guests",
      "QR code generation with branded landing pages",
    ],
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
  },
  "Online Orders": {
    icon: <ShoppingBag className="w-5 h-5" />,
    headline: "Zero-Commission Online Ordering",
    description: "Own your online ordering channel completely. Accept delivery, pickup, and table-side orders through your branded app and website — with zero commission fees. Fully integrated with your kitchen display system and POS.",
    items: [
      "Zero platform commission on every order",
      "Delivery, curbside pickup, and dine-in ordering",
      "Estimated prep time engine with live updates",
      "Group ordering for large table bookings",
      "Scheduled orders up to 7 days in advance",
      "Integrated loyalty points redeemable at checkout",
    ],
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
  },
  "Table Management": {
    icon: <Users className="w-5 h-5" />,
    headline: "Intelligent Table & Reservation System",
    description: "Maximize covers with smart table rotation, waitlist management, and automated reservation confirmations. Reduce no-shows by 42% with SMS reminders and deposit requirements. Integrate seamlessly with Google Reserve and OpenTable.",
    items: [
      "Interactive floor plan with drag-and-drop table editor",
      "Automated SMS & email reservation reminders",
      "Waitlist management with real-time wait estimates",
      "Deposit requirements to eliminate no-shows",
      "Party size and preference tracking per reservation",
      "Google Reserve and OpenTable sync",
    ],
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
  },
  "Analytics": {
    icon: <BarChart3 className="w-5 h-5" />,
    headline: "Restaurant Intelligence Dashboard",
    description: "Make data-driven decisions with granular insights into sales, staff performance, menu profitability, and peak hours. Our AI identifies your most profitable dishes, suggests optimal pricing, and forecasts inventory needs.",
    items: [
      "Hourly sales breakdown by section and server",
      "Item-level profitability and food cost analysis",
      "Customer lifetime value and repeat visit tracking",
      "AI-powered menu engineering recommendations",
      "Inventory forecasting based on historical demand",
      "Competitor benchmarking for local market context",
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  },
}

const TESTIMONIALS = [
  {
    quote: "We added Tablio's online ordering in one afternoon. Within 90 days, direct orders grew to 35% of total revenue — saving us over $4,200/month in third-party delivery commissions. The math is undeniable.",
    name: "Marco Deluca",
    role: "Owner",
    company: "Osteria Cinque, Chicago",
    avatar: "MD",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
  },
  {
    quote: "The table management system cut our average wait time from 28 minutes to 14 minutes. Guests are happier, our servers earn more in tips, and we turn tables 20% faster on weekend service.",
    name: "Amara Kofi",
    role: "General Manager",
    company: "Spice Route, London",
    avatar: "AK",
    rating: 5,
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80",
  },
  {
    quote: "The menu analytics feature told us our truffle pasta had 68% margin — we had no idea. We repositioned it as our signature dish and it's now our #1 seller. That one insight paid for a year of the subscription.",
    name: "Chen Wei",
    role: "Executive Chef & Co-Owner",
    company: "Golden Leaf, Singapore",
    avatar: "CW",
    rating: 5,
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80",
  },
  {
    quote: "We run 12 locations and managing each one used to be a full-time job. With Tablio's multi-location dashboard I can see all 12 stores in one view — real-time sales, inventory alerts, and staff performance.",
    name: "Isabella Ferro",
    role: "Director of Operations",
    company: "Bella Vista Group",
    avatar: "IF",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=400&q=80",
  },
  {
    quote: "QR code menus and table-side ordering eliminated 80% of our back-and-forth. Our servers now spend more time delivering hospitality, less time running menus and processing payments. Staff satisfaction is at an all-time high.",
    name: "Luca Navarro",
    role: "Founder",
    company: "Planta House, Miami",
    avatar: "LN",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  },
]

const PRICING = [
  {
    name: "Solo",
    price: "$89",
    period: "per month",
    description: "Built for single-location independent restaurants just getting started with digital tools.",
    features: [
      "1 restaurant location",
      "Digital menu with QR codes",
      "Online ordering (zero commission)",
      "Up to 500 reservations/month",
      "Basic sales analytics",
      "Email support",
    ],
    cta: "Start Free Trial",
    highlighted: false,
    badge: null,
  },
  {
    name: "Growth",
    price: "$249",
    period: "per month",
    description: "For established restaurants ready to maximize covers, orders, and guest loyalty.",
    features: [
      "Up to 3 locations",
      "Everything in Solo",
      "Advanced table management with floor plans",
      "Loyalty program and digital gift cards",
      "Smart upsell engine",
      "POS integrations (Square, Toast, Clover)",
      "SMS reservation reminders",
      "Priority support + onboarding call",
    ],
    cta: "Start Free Trial",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "tailored pricing",
    description: "For restaurant groups and chains managing multiple brands across multiple cities.",
    features: [
      "Unlimited locations",
      "Everything in Growth",
      "Multi-brand, multi-location dashboard",
      "Custom white-label ordering app",
      "Advanced inventory management",
      "Enterprise API access",
      "Dedicated customer success manager",
      "24/7 phone support + SLA guarantee",
    ],
    cta: "Contact Sales",
    highlighted: false,
    badge: null,
  },
]

const FAQS = [
  {
    q: "Does Tablio charge commission on online orders?",
    a: "Never. Unlike third-party delivery marketplaces that take 15-30% per order, Tablio charges a flat monthly subscription fee. Every cent from your online orders goes directly to you. At typical order volumes, restaurants save $2,000–$8,000 per month by switching to direct ordering.",
  },
  {
    q: "How long does it take to set up the digital menu and QR ordering?",
    a: "Most restaurants go live within 3 hours. You enter your menu items, upload photos, set pricing, and we generate branded QR codes instantly. Our onboarding specialists can guide you through the setup in a live 1-hour video call, included free with every plan.",
  },
  {
    q: "Which POS systems does Tablio integrate with?",
    a: "We integrate natively with Square, Toast, Clover, Revel, Lightspeed, and Aloha. Orders flow directly into your POS and kitchen display system with no manual entry required. We also offer a REST API for custom integrations with proprietary systems.",
  },
  {
    q: "Can I use Tablio if I don't offer delivery?",
    a: "Absolutely. Many of our customers use Tablio exclusively for dine-in QR ordering, table management, and reservations without any delivery component. Each module is fully independent — use what serves your operation.",
  },
  {
    q: "How does the no-show protection work?",
    a: "You set a deposit amount per cover for reservations during peak hours. Tablio securely stores the guest's card and charges the deposit only if they cancel within your specified window or don't show. Average no-show rates drop from 18% to under 5% within the first month.",
  },
  {
    q: "Can I manage multiple locations from one account?",
    a: "Yes, the Growth plan supports up to 3 locations with a unified dashboard. Enterprise plans support unlimited locations across multiple brands, with granular permission controls so managers only see their assigned locations.",
  },
  {
    q: "Is there a free trial available?",
    a: "Yes — 30 days free with full access to every feature, no credit card required. We believe you'll see ROI within the first 2 weeks. If you don't love Tablio after 30 days, simply walk away with no charges.",
  },
]

export default function TablioFoodTech() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [demoOpen, setDemoOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const heroY = useTransform(scrollYProgress, [0, 0.4], [0, -50])
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 60, damping: 25 })
  const springY = useSpring(mouseY, { stiffness: 60, damping: 25 })

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      mouseX.set((e.clientX - window.innerWidth / 2) * 0.02)
      mouseY.set((e.clientY - window.innerHeight / 2) * 0.02)
    }
    window.addEventListener("mousemove", handle)
    return () => window.removeEventListener("mousemove", handle)
  }, [mouseX, mouseY])

  return (
    <div
      ref={containerRef}
      style={{ overflowX: "hidden", scrollBehavior: "smooth" }}
      className="min-h-screen bg-white text-slate-900"
    >
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-orange-500 origin-left z-[60]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-stone-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="#" className="flex items-center gap-2 cursor-pointer group">
            <div className="w-9 h-9 bg-orange-500 rounded-xl flex items-center justify-center group-hover:bg-orange-600 transition-all duration-200">
              <ChefHat className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black text-slate-900">Tablio</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {["Product", "Pricing", "Integrations", "Customers", "Blog"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-sm font-semibold text-slate-600 hover:text-orange-600 cursor-pointer transition-all duration-200"
              >
                {item}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="#" className="hidden md:inline-flex text-sm font-semibold text-slate-600 hover:text-orange-600 cursor-pointer transition-all duration-200 px-4 py-2">
              Log in
            </Link>
            <button
              onClick={() => setDemoOpen(true)}
              className="cursor-pointer hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 text-white text-sm font-bold rounded-xl hover:bg-orange-600 transition-all duration-200 shadow-lg shadow-orange-200"
            >
              Free Trial
              <ArrowRight className="w-4 h-4" />
            </button>
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button className="md:hidden cursor-pointer p-2 rounded-lg hover:bg-stone-100 transition-all duration-200">
                  <Menu className="w-5 h-5 text-slate-700" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-white w-80">
                <div className="flex flex-col gap-6 mt-10">
                  {["Product", "Pricing", "Integrations", "Customers"].map((item) => (
                    <Link key={item} href="#" className="text-lg font-bold text-slate-800 hover:text-orange-600 cursor-pointer transition-all duration-200">
                      {item}
                    </Link>
                  ))}
                  <Separator />
                  <button className="cursor-pointer w-full py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-all duration-200">
                    Start Free Trial
                  </button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-28 pb-20 overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_60%_40%,rgba(249,115,22,0.1),transparent)]" />
        <motion.div
          style={{ x: springX, y: springY }}
          className="absolute top-20 right-20 w-80 h-80 bg-orange-200 rounded-full blur-3xl opacity-30"
        />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-200 rounded-full blur-2xl opacity-30" />

        <motion.div style={{ y: heroY }} className="relative max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Reveal delay={0.05}>
                <Badge className="bg-orange-100 text-orange-700 border-orange-200 mb-6 px-4 py-1.5 text-sm font-semibold cursor-pointer hover:bg-orange-200 transition-all duration-200">
                  <TrendingUp className="w-3.5 h-3.5 mr-1.5" />
                  +32% average revenue for Tablio restaurants
                </Badge>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-tight mb-6 tracking-tight">
                  The All-in-One{" "}
                  <span className="text-orange-500">Restaurant Tech</span>{" "}
                  Platform
                </h1>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-xl text-slate-600 mb-8 leading-relaxed font-medium">
                  Digital menus, zero-commission online ordering, smart table management, and real-time analytics — built exclusively for restaurant operators who refuse to pay 30% to marketplaces.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="flex flex-col sm:flex-row gap-4 mb-10">
                  <button
                    onClick={() => setDemoOpen(true)}
                    className="cursor-pointer inline-flex items-center justify-center gap-2 px-8 py-4 bg-orange-500 text-white font-black rounded-2xl hover:bg-orange-600 transition-all duration-200 shadow-xl shadow-orange-200 text-base"
                  >
                    Start 30-Day Free Trial
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <button className="cursor-pointer inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-slate-200 text-slate-800 font-bold rounded-2xl hover:border-orange-300 hover:text-orange-600 transition-all duration-200 text-base">
                    Watch Demo
                  </button>
                </div>
              </Reveal>
              <Reveal delay={0.4}>
                <div className="flex flex-wrap gap-5">
                  {[
                    { icon: <CheckCircle2 className="w-4 h-4 text-green-500" />, text: "No credit card required" },
                    { icon: <CheckCircle2 className="w-4 h-4 text-green-500" />, text: "Zero commission forever" },
                    { icon: <Shield className="w-4 h-4 text-blue-500" />, text: "PCI DSS Level 1" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm font-semibold text-slate-500 cursor-pointer">
                      {item.icon}
                      {item.text}
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.2}>
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-stone-200">
                  <Image
                    src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
                    alt="Restaurant dashboard"
                    width={700}
                    height={500}
                    className="w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />
                </div>
                {/* Floating stat cards */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1, duration: 0.6 }}
                  className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl border border-stone-200 p-5 cursor-pointer hover:shadow-2xl transition-all duration-300"
                >
                  <p className="text-xs text-slate-500 font-semibold mb-1">Today's Revenue</p>
                  <p className="text-2xl font-black text-slate-900">$4,280</p>
                  <p className="text-xs text-green-600 font-bold mt-1">+18% vs last Tuesday</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                  className="absolute -top-6 -right-6 bg-orange-500 rounded-2xl shadow-xl p-5 cursor-pointer hover:shadow-2xl transition-all duration-300"
                >
                  <p className="text-xs text-orange-200 font-semibold mb-1">Orders Today</p>
                  <p className="text-2xl font-black text-white">147</p>
                  <p className="text-xs text-orange-200 font-bold mt-1">23 online • 124 in-house</p>
                </motion.div>
              </div>
            </Reveal>
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-black text-orange-400 mb-2">
                    <Counter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-slate-400 font-semibold text-sm">{stat.label}</p>
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
              <Badge className="bg-orange-50 text-orange-700 border-orange-100 mb-4 cursor-pointer">Full Platform</Badge>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 leading-tight">
                Every tool your restaurant needs, in one place
              </h2>
              <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">
                Stop duct-taping 6 different apps together. Tablio is the operating system for modern restaurants.
              </p>
            </div>
          </Reveal>

          <Tabs defaultValue="Digital Menu" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-stone-100 p-1 rounded-2xl gap-1 mb-12">
              {Object.entries(FEATURES).map(([key, val]) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="cursor-pointer rounded-xl font-semibold text-sm data-[state=active]:bg-white data-[state=active]:text-orange-600 data-[state=active]:shadow-sm transition-all duration-200 flex items-center gap-2"
                >
                  {val.icon}
                  <span className="hidden sm:inline">{key}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(FEATURES).map(([key, feat]) => (
              <TabsContent key={key} value={key}>
                <Reveal>
                  <Card className="border-stone-200 overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                      <div className="relative h-72 lg:h-auto min-h-[360px]">
                        <Image src={feat.image} alt={feat.headline} fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-900/10" />
                      </div>
                      <CardContent className="p-10 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
                            {feat.icon}
                          </div>
                          <Badge className="bg-orange-50 text-orange-700 border-orange-100">{key}</Badge>
                        </div>
                        <h3 className="text-3xl font-black text-slate-900 mb-4 leading-tight">{feat.headline}</h3>
                        <p className="text-slate-600 text-base leading-relaxed mb-8">{feat.description}</p>
                        <ul className="space-y-3">
                          {feat.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-slate-700 font-medium">
                              <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                              {item}
                            </li>
                          ))}
                        </ul>
                        <button className="cursor-pointer mt-8 inline-flex items-center gap-2 text-orange-600 font-bold hover:text-orange-800 transition-all duration-200">
                          See how it works <ChevronRight className="w-4 h-4" />
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

      {/* How It Works */}
      <section className="py-24 bg-stone-50 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <Badge className="bg-amber-50 text-amber-700 border-amber-100 mb-4 cursor-pointer">Quick Setup</Badge>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
                Live in 3 hours, not 3 weeks
              </h2>
              <p className="text-xl text-slate-500 max-w-xl mx-auto font-medium">
                Our onboarding team handles the heavy lifting. You focus on cooking.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: <ChefHat className="w-7 h-7 text-orange-600" />,
                title: "Build Your Digital Menu",
                desc: "Upload your menu items, add photos, set pricing, and configure dietary tags. Our team can migrate an existing menu in under 2 hours.",
                time: "~60 minutes",
              },
              {
                step: "02",
                icon: <QrCode className="w-7 h-7 text-orange-600" />,
                title: "Generate QR Codes & Links",
                desc: "We create branded QR codes for every table, a custom ordering URL, and embed scripts for your existing website — all automated.",
                time: "~30 minutes",
              },
              {
                step: "03",
                icon: <DollarSign className="w-7 h-7 text-orange-600" />,
                title: "Start Taking Orders",
                desc: "Go live and watch direct orders roll in. Connect your bank account, set payout schedule, and track everything from the dashboard.",
                time: "Same day",
              },
            ].map((step, i) => (
              <Reveal key={i} delay={i * 0.15}>
                <Card className="cursor-pointer border-stone-200 hover:border-orange-300 hover:shadow-lg transition-all duration-300 bg-white h-full">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4 mb-6">
                      <span className="text-5xl font-black text-stone-200 leading-none">{step.step}</span>
                      <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center shrink-0">
                        {step.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-3">{step.title}</h3>
                    <p className="text-slate-600 font-medium leading-relaxed mb-5">{step.desc}</p>
                    <Badge className="bg-green-50 text-green-700 border-green-100">
                      <Clock className="w-3.5 h-3.5 mr-1.5" />
                      {step.time}
                    </Badge>
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
                4.8 / 5 average from 2,800 restaurant operators
              </Badge>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
                Restaurant operators love Tablio
              </h2>
              <p className="text-xl text-slate-500 max-w-xl mx-auto font-medium">
                Real results from real restaurants, across every category and cuisine type.
              </p>
            </div>
          </Reveal>

          <Carousel className="w-full">
            <CarouselContent className="-ml-4">
              {TESTIMONIALS.map((t, i) => (
                <CarouselItem key={i} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <Reveal delay={i * 0.08}>
                    <Card className="cursor-pointer h-full border-stone-200 hover:border-orange-300 hover:shadow-lg transition-all duration-300">
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
                          <Avatar className="w-12 h-12 ring-2 ring-orange-100">
                            <AvatarImage src={t.image} alt={t.name} />
                            <AvatarFallback className="bg-orange-100 text-orange-700 font-bold text-sm">{t.avatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-bold text-slate-900 text-sm">{t.name}</p>
                            <p className="text-xs text-slate-500 font-medium">{t.role}</p>
                            <p className="text-xs text-orange-600 font-bold">{t.company}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Reveal>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="cursor-pointer bg-white border-stone-200 hover:bg-orange-50 hover:border-orange-300 transition-all duration-200" />
            <CarouselNext className="cursor-pointer bg-white border-stone-200 hover:bg-orange-50 hover:border-orange-300 transition-all duration-200" />
          </Carousel>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <Badge className="bg-orange-50 text-orange-700 border-orange-100 mb-4 cursor-pointer">Transparent Pricing</Badge>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
                One flat fee. Zero commission. Always.
              </h2>
              <p className="text-xl text-slate-500 max-w-xl mx-auto font-medium">
                No percentage cuts on your orders. No hidden fees. Just straightforward monthly pricing.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {PRICING.map((plan, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <Card
                  className={`cursor-pointer relative transition-all duration-300 ${
                    plan.highlighted
                      ? "border-2 border-orange-500 shadow-2xl shadow-orange-100 scale-105"
                      : "border-stone-200 hover:border-orange-300 hover:shadow-lg"
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="bg-orange-500 text-white px-4 py-1.5 text-sm font-bold shadow-lg">
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
                          <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${plan.highlighted ? "text-orange-500" : "text-green-500"}`} />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <button
                      className={`cursor-pointer w-full py-3.5 font-bold rounded-xl text-sm transition-all duration-200 ${
                        plan.highlighted
                          ? "bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-200"
                          : "bg-stone-100 text-slate-800 hover:bg-orange-500 hover:text-white"
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
              <Badge className="bg-stone-100 text-stone-700 border-stone-200 mb-4 cursor-pointer">FAQ</Badge>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
                Common questions from restaurant owners
              </h2>
              <p className="text-xl text-slate-500 font-medium">
                Straight answers to the questions we hear most.
              </p>
            </div>
          </Reveal>

          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border border-stone-200 rounded-2xl px-6 hover:border-orange-300 transition-all duration-200 cursor-pointer"
              >
                <AccordionTrigger className="cursor-pointer py-5 font-bold text-slate-900 hover:text-orange-600 hover:no-underline text-left transition-all duration-200">
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
      <section className="py-24 bg-gradient-to-br from-orange-500 to-amber-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(255,255,255,0.1),transparent)]" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              Stop paying commission.<br />Start owning your orders.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-xl text-orange-100 mb-10 font-medium max-w-2xl mx-auto leading-relaxed">
              Join 8,500+ restaurants that made the switch to Tablio and haven&rsquo;t looked back. 30-day free trial, no credit card needed.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setDemoOpen(true)}
                className="cursor-pointer inline-flex items-center gap-2 px-10 py-4 bg-white text-orange-600 font-black text-lg rounded-2xl hover:bg-orange-50 transition-all duration-200 shadow-2xl"
              >
                Start Free Trial — No Card
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="cursor-pointer inline-flex items-center gap-2 px-8 py-4 border-2 border-white/50 text-white font-bold rounded-2xl hover:bg-white/10 transition-all duration-200">
                Book a Demo
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
                <div className="w-9 h-9 bg-orange-500 rounded-xl flex items-center justify-center">
                  <ChefHat className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-black text-lg">Tablio</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">
                Restaurant tech that drives revenue, not commission bills.
              </p>
              <div className="flex gap-3">
                {[Globe, Globe, Globe, Globe].map((Icon, i) => (
                  <button key={i} className="cursor-pointer w-9 h-9 rounded-lg bg-slate-800 hover:bg-orange-500 flex items-center justify-center transition-all duration-200">
                    <Icon className="w-4 h-4 text-slate-400 hover:text-white" />
                  </button>
                ))}
              </div>
            </div>

            {[
              { title: "Product", links: ["Digital Menu", "Online Ordering", "Table Management", "Analytics", "Loyalty Program"] },
              { title: "Integrations", links: ["Square POS", "Toast POS", "Clover", "Stripe", "Mailchimp"] },
              { title: "Company", links: ["About Us", "Customers", "Blog", "Careers", "Press Kit"] },
              { title: "Support", links: ["Help Center", "Onboarding", "Status Page", "Privacy Policy", "Terms"] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-white font-bold text-sm mb-5 uppercase tracking-wider">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <Link href="#" className="cursor-pointer text-sm text-slate-500 hover:text-orange-400 transition-all duration-200 font-medium">
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
              © 2026 Tablio Inc. All rights reserved.
            </p>
            <p className="text-slate-600 text-sm font-medium">
              Zero commission. Zero compromise.
            </p>
          </div>
        </div>
      </footer>

      {/* Demo Dialog */}
      <Dialog open={demoOpen} onOpenChange={setDemoOpen}>
        <DialogContent className="bg-white max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-slate-900">Start Your Free Trial</DialogTitle>
          </DialogHeader>
          <p className="text-slate-600 mb-6 font-medium leading-relaxed">
            30 days free. Full platform access. No credit card required. Our team will reach out within 2 hours to help you get set up.
          </p>
          <div className="space-y-4">
            <input className="w-full px-4 py-3 border border-stone-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:border-orange-400 transition-all duration-200" placeholder="Restaurant name" />
            <input className="w-full px-4 py-3 border border-stone-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:border-orange-400 transition-all duration-200" placeholder="Your email" />
            <input className="w-full px-4 py-3 border border-stone-200 rounded-xl text-slate-900 font-medium focus:outline-none focus:border-orange-400 transition-all duration-200" placeholder="Phone number" />
            <select className="w-full px-4 py-3 border border-stone-200 rounded-xl text-slate-600 font-medium focus:outline-none focus:border-orange-400 transition-all duration-200 cursor-pointer">
              <option>Number of locations</option>
              <option>1 location</option>
              <option>2–5 locations</option>
              <option>6–20 locations</option>
              <option>20+ locations</option>
            </select>
            <button className="cursor-pointer w-full py-4 bg-orange-500 text-white font-black rounded-xl hover:bg-orange-600 transition-all duration-200 shadow-lg shadow-orange-200">
              Claim My Free Trial
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
