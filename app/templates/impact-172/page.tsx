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
import { Plane, MapPin, Star, Hotel, Calendar, Users, Globe, Shield, Clock, ArrowRight, Menu, Check, ChevronRight, Mail, Phone, Zap, TrendingUp, Headphones, Compass, Wifi, Coffee, Car, CreditCard, Award, Search, Heart } from "lucide-react"

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
  { value: "2.1M+", label: "Trips Booked", icon: <Plane className="w-5 h-5" /> },
  { value: "190+", label: "Countries", icon: <Globe className="w-5 h-5" /> },
  { value: "4.91★", label: "Average Rating", icon: <Star className="w-5 h-5" /> },
  { value: "48h", label: "Avg. Response", icon: <Clock className="w-5 h-5" /> },
  { value: "$2.8B", label: "Bookings Processed", icon: <CreditCard className="w-5 h-5" /> },
  { value: "18K+", label: "Hotel Partners", icon: <Hotel className="w-5 h-5" /> },
]

const DESTINATIONS = [
  { name: "Amalfi Coast", country: "Italy", price: "from $1,890", nights: "7 nights", category: "Coastal", img: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80", rating: 4.9, reviews: 842 },
  { name: "Kyoto", country: "Japan", price: "from $2,340", nights: "10 nights", category: "Cultural", img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80", rating: 4.8, reviews: 1203 },
  { name: "Santorini", country: "Greece", price: "from $2,100", nights: "8 nights", category: "Island", img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80", rating: 4.9, reviews: 2187 },
  { name: "Banff", country: "Canada", price: "from $1,640", nights: "6 nights", category: "Adventure", img: "https://images.unsplash.com/photo-1472791108553-c9405341e398?w=800&q=80", rating: 4.8, reviews: 659 },
]

const FEATURES_TABS = [
  {
    value: "booking",
    label: "Smart Booking",
    icon: <Zap className="w-5 h-5" />,
    title: "AI-Powered Itinerary Planning That Knows You",
    description: "VoyageIQ learns your travel style, budget, and preferences to curate bespoke itineraries in minutes. Our proprietary matching algorithm has planned over 2 million trips with a 96.3% satisfaction rate.",
    items: [
      "Natural language trip builder — describe your dream trip in plain English",
      "Real-time pricing from 400+ airline, hotel, and activity partners",
      "Dynamic rebooking engine monitors prices 24/7 and re-books if cheaper",
      "Group travel coordinator handles split payments and shared itineraries",
      "Visa and entry requirement tracker with auto-alert for changes",
      "Offline-first mobile app with maps, tickets, and reservations synced",
    ],
    image: "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800&q=80",
  },
  {
    value: "concierge",
    label: "Elite Concierge",
    icon: <Headphones className="w-5 h-5" />,
    title: "A World-Class Concierge Team in Your Pocket",
    description: "Our 800-strong concierge network operates in 47 languages, 24 hours a day. From securing a table at a Michelin-starred restaurant to emergency passport replacement — we handle every detail.",
    items: [
      "24/7 live human concierge via chat, call, or WhatsApp",
      "Restaurant reservations at 50,000+ partner venues worldwide",
      "Private transfers, yacht charters, and helicopter bookings",
      "Emergency assistance: medical, legal, lost documents",
      "Insider access to sold-out experiences and private tours",
      "VIP lounge access at 1,200+ airports globally",
    ],
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
  },
  {
    value: "protection",
    label: "Trip Protection",
    icon: <Shield className="w-5 h-5" />,
    title: "The Most Comprehensive Travel Protection in the Industry",
    description: "VoyageIQ Shield covers everything from missed connections and natural disasters to medical emergencies and trip interruption. If your trip goes wrong, we make it right — guaranteed.",
    items: [
      "Cancel for any reason (CFAR) coverage up to $50,000 per trip",
      "Medical evacuation with air ambulance up to $500,000",
      "Baggage protection: up to $5,000 in lost or delayed luggage",
      "Flight delay compensation starting at 2-hour delays",
      "Terrorism and natural disaster rebooking at no extra cost",
      "Identity theft assistance while traveling abroad",
    ],
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
  },
]

const TESTIMONIALS = [
  {
    name: "Camille Rousseau",
    role: "Frequent Traveler",
    company: "Paris, France",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
    initials: "CR",
    rating: 5,
    quote: "I've used every major travel platform and VoyageIQ isn't even in the same category. The AI planned my 3-week Japan itinerary in 20 minutes, hit every detail perfectly, and the concierge rebooked my connection when a typhoon hit — while I was still in the air.",
  },
  {
    name: "James Whitfield",
    role: "Corporate Travel Manager",
    company: "Apex Consulting Group",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    initials: "JW",
    rating: 5,
    quote: "We manage travel for 340 consultants who fly constantly. VoyageIQ's enterprise portal saved us $1.2M in the first year through dynamic rebooking alone. The duty-of-care dashboard gives us real-time location data for every traveler in the field.",
  },
  {
    name: "Priya Nair",
    role: "Honeymoon Planner",
    company: "Mumbai, India",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1eb1df?w=200&q=80",
    initials: "PN",
    rating: 5,
    quote: "Our Maldives honeymoon was completely customized — the AI even synced with my Pinterest board. Our concierge arranged a private sandbank dinner with 24 hours notice. Every resort, every transfer, every activity was seamless.",
  },
  {
    name: "Daniel Ochoa",
    role: "Adventure Traveler",
    company: "Mexico City, Mexico",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    initials: "DO",
    rating: 5,
    quote: "I trekked to Everest Base Camp and VoyageIQ handled every logistic: permits, porters, acclimatization schedule, and emergency helicopter contact. When altitude sickness hit my partner on day 8, the Shield coverage had us evacuated within 90 minutes.",
  },
  {
    name: "Sophie Laurent",
    role: "Travel Blogger",
    company: "1.8M Followers · @sophietravels",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80",
    initials: "SL",
    rating: 5,
    quote: "I travel 280 days a year and VoyageIQ is the only platform I recommend to my audience without hesitation. The photography location suggestions it adds to itineraries are better than anything I'd find researching for hours on my own.",
  },
]

const PRICING = [
  {
    name: "Explorer",
    price: "$0",
    period: "",
    description: "For occasional travelers who want intelligent booking and basic protection on every trip.",
    highlight: false,
    badge: null,
    features: [
      "AI itinerary builder (3 trips/year)",
      "Real-time pricing comparison",
      "Basic trip protection ($5K coverage)",
      "Email concierge support",
      "Mobile app with offline maps",
      "Standard rebooking tools",
    ],
    cta: "Start Free",
  },
  {
    name: "Voyager",
    price: "$19",
    period: "/month",
    description: "For frequent travelers who demand seamless experiences and premium support anywhere in the world.",
    highlight: true,
    badge: "Most Popular",
    features: [
      "Unlimited AI itinerary planning",
      "Dynamic 24/7 price monitoring & rebooking",
      "VoyageIQ Shield ($25K coverage)",
      "Live concierge 24/7 (chat + call)",
      "VIP airport lounge access (Priority Pass)",
      "Early access to exclusive deals & flash sales",
      "Group travel coordination tools",
      "Visa tracker with push notifications",
    ],
    cta: "Start Free Trial",
  },
  {
    name: "Elite",
    price: "$79",
    period: "/month",
    description: "For luxury travelers and business accounts requiring white-glove service and maximum protection.",
    highlight: false,
    badge: "Premium",
    features: [
      "Everything in Voyager",
      "VoyageIQ Shield MAX ($50K coverage)",
      "Dedicated personal travel advisor",
      "Medical evacuation ($500K)",
      "Private transfer & yacht booking",
      "Michelin restaurant reservations",
      "Global entry & TSA pre-check fast-track",
      "Corporate duty-of-care dashboard",
    ],
    cta: "Go Elite",
  },
]

const FAQS = [
  {
    q: "How does VoyageIQ's AI itinerary builder work?",
    a: "You describe your ideal trip in plain English — destination, duration, budget, travel style, and interests. Our AI cross-references 400+ supplier databases, real-time availability, local event calendars, and weather patterns to generate a complete day-by-day itinerary in under 60 seconds. You can tweak any element and it adjusts the rest dynamically.",
  },
  {
    q: "What does dynamic rebooking mean and how much can it save me?",
    a: "After you book a flight or hotel, our system monitors prices continuously. If the same itinerary becomes available cheaper (even from a different supplier), we automatically rebook you and refund the difference to your wallet. On average, Voyager members save $340 per trip through dynamic rebooking alone.",
  },
  {
    q: "How does VoyageIQ Shield compare to standard travel insurance?",
    a: "Standard travel insurance requires you to submit claims weeks after your trip with mountains of documentation. Shield works in real-time — our system detects your flight delay and automatically triggers compensation before you even land. For medical emergencies, our team coordinates evacuation and handles all paperwork directly with hospitals and carriers.",
  },
  {
    q: "Can I use VoyageIQ for business travel?",
    a: "Yes. Our Enterprise tier includes a corporate travel portal with approval workflows, spending policy enforcement, duty-of-care tracking, and real-time location dashboards for traveling employees. We integrate with Concur, SAP, and most major expense management platforms. Contact our enterprise team for custom pricing.",
  },
  {
    q: "What happens if I need to cancel my trip?",
    a: "With our Cancel For Any Reason (CFAR) coverage (included in Voyager and Elite), you can cancel up to 24 hours before departure and receive 80% of non-refundable costs as a travel credit. Our concierge team handles all cancellation calls, negotiations, and paperwork on your behalf.",
  },
  {
    q: "How quickly can your concierge team respond in an emergency?",
    a: "Our Elite and Voyager concierge teams have a guaranteed 3-minute response time for emergencies, 24/7. In 2025, our average response to declared emergencies was 97 seconds. We maintain on-call relationships with medical providers, embassies, and emergency services in 190 countries.",
  },
  {
    q: "Does VoyageIQ work for group travel?",
    a: "Absolutely. Our group coordinator tool lets you invite travel companions, vote on destinations and activities, split costs automatically, and maintain a shared real-time itinerary. It supports groups of 2 to 500 people and handles corporate offsites, destination weddings, and family reunions.",
  },
]

export default function VoyageIQPlatform() {
  const [searchQuery, setSearchQuery] = useState("")
  const [bookingOpen, setBookingOpen] = useState(false)
  const [selectedDest, setSelectedDest] = useState<typeof DESTINATIONS[0] | null>(null)

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const yHero = useTransform(scrollYProgress, [0, 0.4], ["0%", "18%"])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 40, damping: 25 })
  const springY = useSpring(mouseY, { stiffness: 40, damping: 25 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX - window.innerWidth / 2) * 0.02)
      mouseY.set((e.clientY - window.innerHeight / 2) * 0.02)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

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
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center">
              <Compass className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">Voyage<span className="text-sky-500">IQ</span></span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {["Destinations", "AI Planner", "Concierge", "Shield", "Enterprise"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-sm font-medium text-slate-600 hover:text-sky-600 transition-all duration-150 cursor-pointer"
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
              onClick={() => setBookingOpen(true)}
              className="bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-sky-200 hover:shadow-lg cursor-pointer"
            >
              Plan a Trip
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
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center">
                      <Compass className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg font-bold">VoyageIQ</span>
                  </div>
                  {["Destinations", "AI Planner", "Concierge", "Shield", "Enterprise", "Sign In"].map((item) => (
                    <Link key={item} href="#" className="text-base font-medium text-slate-700 hover:text-sky-600 transition-all duration-150 cursor-pointer">
                      {item}
                    </Link>
                  ))}
                  <button
                    onClick={() => setBookingOpen(true)}
                    className="bg-gradient-to-r from-sky-500 to-indigo-600 text-white py-3 rounded-full font-semibold hover:opacity-90 transition-all duration-200 cursor-pointer"
                  >
                    Plan a Trip
                  </button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.header>

      {/* BOOKING DIALOG */}
      <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-slate-900">Where Are You Going?</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Destination, hotel, or 'surprise me'"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-sky-400 outline-none transition-all duration-200 text-slate-800 placeholder:text-slate-400"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Departure", placeholder: "City or airport" },
                { label: "Dates", placeholder: "Add dates" },
                { label: "Travelers", placeholder: "2 adults" },
                { label: "Budget", placeholder: "$2,000–$5,000" },
              ].map((field) => (
                <div key={field.label} className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{field.label}</label>
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    className="w-full px-3 py-2.5 border-2 border-slate-200 rounded-lg focus:border-sky-400 outline-none text-sm text-slate-700 placeholder:text-slate-400 transition-all duration-200"
                  />
                </div>
              ))}
            </div>
            <button className="w-full bg-gradient-to-r from-sky-500 to-indigo-600 hover:opacity-90 text-white py-4 rounded-xl font-bold text-base transition-all duration-200 cursor-pointer flex items-center justify-center gap-2">
              <Zap className="w-5 h-5" /> Generate AI Itinerary
            </button>
            <p className="text-xs text-slate-400 text-center">Free for Explorer plan · Upgrading gives unlimited planning + 24/7 concierge</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
        <motion.div style={{ y: yHero }} className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=800&q=80"
            alt="Travel hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-slate-900/60 to-sky-900/40" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="max-w-3xl">
            <Reveal>
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/30 px-3 py-1 text-xs font-semibold">
                  AI-Powered Travel Intelligence
                </Badge>
                <Badge className="bg-white/10 text-white/80 border-white/20 px-3 py-1 text-xs font-semibold">
                  #1 in Customer Satisfaction 2025
                </Badge>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
                Travel Smarter.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">
                  Live Bigger.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-xl text-slate-300 leading-relaxed mb-10 max-w-2xl">
                VoyageIQ combines AI-powered itinerary planning, a 24/7 elite concierge, and the industry's most comprehensive trip protection into a single platform trusted by 2 million travelers.
              </p>
            </Reveal>

            {/* Search Bar */}
            <Reveal delay={0.3}>
              <div className="bg-white rounded-2xl shadow-2xl p-3 flex flex-col sm:flex-row gap-3 mb-10 max-w-2xl">
                <div className="flex items-center gap-2 flex-1 px-3">
                  <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Where do you want to go?"
                    className="flex-1 outline-none text-slate-800 placeholder:text-slate-400 text-sm"
                  />
                </div>
                <div className="hidden sm:block w-px bg-slate-200" />
                <div className="flex items-center gap-2 px-3">
                  <Calendar className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Add dates"
                    className="w-28 outline-none text-slate-800 placeholder:text-slate-400 text-sm"
                  />
                </div>
                <button
                  onClick={() => setBookingOpen(true)}
                  className="bg-gradient-to-r from-sky-500 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition-all duration-200 cursor-pointer flex items-center gap-2 flex-shrink-0"
                >
                  <Zap className="w-4 h-4" /> Plan Trip
                </button>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="flex flex-wrap gap-3 text-sm text-slate-300">
                {["Amalfi Coast", "Kyoto, Japan", "Maldives", "Patagonia", "Santorini"].map((dest) => (
                  <button
                    key={dest}
                    className="bg-white/10 hover:bg-white/20 border border-white/20 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150 cursor-pointer"
                  >
                    {dest}
                  </button>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        {/* Floating social proof */}
        <motion.div
          style={{ x: springX, y: springY }}
          className="absolute bottom-12 right-8 lg:right-16 hidden lg:flex flex-col gap-4"
        >
          <div className="bg-white rounded-2xl shadow-xl p-4 max-w-xs">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center">
                <Star className="w-4 h-4 text-sky-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-900">Just booked</p>
                <p className="text-xs text-slate-500">Amalfi Coast · 7 nights · $2,140</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
              <span className="text-xs text-slate-500 ml-1">4.91 avg rating</span>
            </div>
          </div>
          <div className="bg-gradient-to-r from-sky-500 to-indigo-600 rounded-2xl shadow-xl p-4 max-w-xs text-white">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-4 h-4" />
              <p className="text-xs font-bold">Price Alert Triggered</p>
            </div>
            <p className="text-xs text-sky-100">London → Tokyo dropped $340. Auto-reBooked. You saved $340.</p>
          </div>
        </motion.div>
      </section>

      {/* STATS BAR */}
      <section className="bg-gradient-to-r from-sky-600 to-indigo-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {STATS.map((stat, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="text-center text-white">
                  <div className="flex justify-center mb-2 text-sky-200">{stat.icon}</div>
                  <div className="text-3xl font-extrabold mb-1">{stat.value}</div>
                  <div className="text-sm text-sky-100 font-medium">{stat.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED DESTINATIONS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex items-end justify-between mb-12">
              <div>
                <Badge className="bg-sky-100 text-sky-700 border-sky-200 mb-3">Top Destinations</Badge>
                <h2 className="text-4xl font-extrabold text-slate-900">Trending This Season</h2>
              </div>
              <Link href="#" className="text-sky-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all duration-200 cursor-pointer hidden sm:flex">
                View all destinations <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DESTINATIONS.map((dest, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <Card
                  onClick={() => { setSelectedDest(dest); setBookingOpen(true) }}
                  className="border border-slate-200 hover:border-sky-300 hover:shadow-xl transition-all duration-200 cursor-pointer group overflow-hidden"
                >
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={dest.img}
                      alt={dest.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
                    <Badge className="absolute top-3 left-3 bg-white/90 text-slate-700 border-0 text-xs font-semibold">
                      {dest.category}
                    </Badge>
                    <button className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-all duration-150 cursor-pointer">
                      <Heart className="w-3.5 h-3.5 text-white" />
                    </button>
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-white font-bold text-lg leading-tight">{dest.name}</p>
                      <p className="text-sky-200 text-xs font-medium">{dest.country}</p>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-slate-500 text-xs mb-0.5">{dest.nights}</p>
                        <p className="text-slate-900 font-bold text-sm">{dest.price}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 justify-end">
                          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs font-bold text-slate-900">{dest.rating}</span>
                        </div>
                        <p className="text-xs text-slate-400">{dest.reviews} reviews</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES / TABS */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-14">
              <Badge className="bg-sky-100 text-sky-700 border-sky-200 mb-4">Platform Features</Badge>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">
                The Complete Travel Intelligence Platform
              </h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
                Smart booking, elite concierge, and bulletproof trip protection — built into one seamless experience.
              </p>
            </div>
          </Reveal>

          <Tabs defaultValue="booking" className="w-full">
            <TabsList className="grid grid-cols-3 max-w-xl mx-auto mb-12 bg-white border border-slate-200 p-1 rounded-xl shadow-sm">
              {FEATURES_TABS.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="flex items-center gap-2 rounded-lg cursor-pointer data-[state=active]:bg-gradient-to-r data-[state=active]:from-sky-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200"
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
                    <Badge className="bg-sky-100 text-sky-700 border-sky-200 mb-4">{tab.label}</Badge>
                    <h3 className="text-3xl font-extrabold text-slate-900 mb-4">{tab.title}</h3>
                    <p className="text-slate-500 leading-relaxed mb-8">{tab.description}</p>
                    <ul className="space-y-3">
                      {tab.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="mt-0.5 w-5 h-5 rounded-full bg-sky-100 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-sky-600" />
                          </div>
                          <span className="text-sm text-slate-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => setBookingOpen(true)}
                      className="mt-8 bg-gradient-to-r from-sky-500 to-indigo-600 hover:opacity-90 text-white px-6 py-3 rounded-full font-semibold text-sm flex items-center gap-2 transition-all duration-200 cursor-pointer shadow-md"
                    >
                      Plan Your Trip <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative h-[440px] rounded-2xl overflow-hidden shadow-2xl"
                  >
                    <Image src={tab.image} alt={tab.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center">
                            {tab.icon}
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 font-medium">{tab.label}</p>
                            <p className="text-sm font-bold text-slate-900">{tab.title.split(" ").slice(0, 5).join(" ")}...</p>
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

      {/* TESTIMONIALS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-14">
              <Badge className="bg-sky-100 text-sky-700 border-sky-200 mb-4">Traveler Reviews</Badge>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">
                2 Million Trips. 4.91 Stars.
              </h2>
              <p className="text-lg text-slate-500 max-w-xl mx-auto">
                From solo backpackers to luxury honeymooners to corporate travel managers — hear what they say.
              </p>
            </div>
          </Reveal>

          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {TESTIMONIALS.map((t, i) => (
                <CarouselItem key={i} className="md:basis-1/2 pl-4">
                  <Card className="border border-slate-200 hover:border-sky-200 hover:shadow-lg transition-all duration-200 cursor-pointer h-full">
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
                          <AvatarFallback className="bg-sky-100 text-sky-700 text-sm font-bold">{t.initials}</AvatarFallback>
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

      {/* PRICING */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-14">
              <Badge className="bg-sky-100 text-sky-700 border-sky-200 mb-4">Pricing</Badge>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">
                Plans for Every Kind of Traveler
              </h2>
              <p className="text-lg text-slate-500 max-w-xl mx-auto">
                Start free. Upgrade when you need more. Cancel any time.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {PRICING.map((plan, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <Card
                  className={`relative border-2 transition-all duration-200 cursor-pointer h-full flex flex-col ${
                    plan.highlight
                      ? "border-sky-500 shadow-xl shadow-sky-100"
                      : "border-slate-200 hover:border-sky-200 hover:shadow-md"
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <Badge className={plan.highlight ? "bg-gradient-to-r from-sky-500 to-indigo-600 text-white border-0 px-4 py-1" : "bg-slate-800 text-white border-slate-800 px-4 py-1"}>
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
                          <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.highlight ? "text-sky-500" : "text-slate-400"}`} />
                          <span className="text-sm text-slate-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => setBookingOpen(true)}
                      className={`w-full py-3 rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer ${
                        plan.highlight
                          ? "bg-gradient-to-r from-sky-500 to-indigo-600 hover:opacity-90 text-white shadow-md"
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

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-14">
              <Badge className="bg-sky-100 text-sky-700 border-sky-200 mb-4">FAQ</Badge>
              <h2 className="text-4xl font-extrabold text-slate-900 mb-4">
                Everything You Need to Know
              </h2>
              <p className="text-slate-500 leading-relaxed">
                Straight answers to the questions travelers ask us most before booking their first VoyageIQ trip.
              </p>
            </div>
          </Reveal>

          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-slate-50 border border-slate-200 rounded-xl px-6 hover:border-sky-200 transition-all duration-200 cursor-pointer shadow-sm"
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
      <section className="py-24 bg-gradient-to-br from-sky-600 via-indigo-600 to-purple-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80" alt="Travel CTA" fill className="object-cover" />
        </div>
        <motion.div
          className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-sky-400/30 blur-3xl"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 7, repeat: Infinity }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-6">
              <Compass className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
              Your Next Adventure<br />Is 60 Seconds Away
            </h2>
            <p className="text-xl text-sky-100 max-w-xl mx-auto mb-10 leading-relaxed">
              Tell our AI where you want to go. Get a complete itinerary, the best prices, full protection, and a concierge team ready to make it perfect.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => setBookingOpen(true)}
                className="bg-white hover:bg-sky-50 text-indigo-700 px-8 py-4 rounded-full font-bold text-lg transition-all duration-200 shadow-xl cursor-pointer flex items-center gap-2"
              >
                <Zap className="w-5 h-5" /> Plan Your Trip Free
              </button>
              <Link
                href="#"
                className="bg-transparent border-2 border-white/40 hover:bg-white/10 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-200 cursor-pointer"
              >
                See How It Works
              </Link>
            </div>
            <p className="text-sky-200 text-sm mt-8">
              No credit card required · Free Explorer plan forever · Upgrade any time
            </p>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center">
                  <Compass className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold">Voyage<span className="text-sky-400">IQ</span></span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
                AI-powered travel planning, elite concierge, and bulletproof trip protection for 2 million travelers worldwide.
              </p>
              <div className="flex gap-3">
                {[Globe, Globe, Globe, Globe].map((Icon, i) => (
                  <a key={i} href="#" className="w-9 h-9 rounded-full bg-slate-800 hover:bg-sky-600 flex items-center justify-center transition-all duration-200 cursor-pointer">
                    <Icon className="w-4 h-4 text-slate-400" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4 text-sm">Explore</h4>
              <ul className="space-y-3">
                {["Top Destinations", "Last-Minute Deals", "Group Travel", "Honeymoons", "Adventure Trips"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-slate-400 hover:text-sky-400 text-sm transition-all duration-150 cursor-pointer">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4 text-sm">Platform</h4>
              <ul className="space-y-3">
                {["AI Planner", "Concierge", "Shield Protection", "Enterprise", "API Access"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-slate-400 hover:text-sky-400 text-sm transition-all duration-150 cursor-pointer">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4 text-sm">Support</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-sky-500" /><span>hello@voyageiq.com</span></li>
                <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-sky-500" /><span>+1 (888) 869-0042</span></li>
                <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-sky-500" /><span>SF · London · Singapore</span></li>
              </ul>
              <button
                onClick={() => setBookingOpen(true)}
                className="mt-6 bg-gradient-to-r from-sky-500 to-indigo-600 hover:opacity-90 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer w-full"
              >
                Plan a Trip
              </button>
            </div>
          </div>

          <Separator className="bg-slate-800 mb-8" />

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>© 2026 VoyageIQ Technologies, Inc. All rights reserved.</p>
            <div className="flex gap-6">
              {["Privacy Policy", "Terms of Service", "Cookie Policy", "Accessibility"].map((item) => (
                <Link key={item} href="#" className="hover:text-slate-300 transition-all duration-150 cursor-pointer">{item}</Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
