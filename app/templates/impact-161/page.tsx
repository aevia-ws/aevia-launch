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
import { Menu, MapPin, Home, Building2, TrendingUp, Star, Search, ArrowRight, CheckCircle2, Phone, Mail, Calendar, DollarSign, Users, Award, Globe, ChevronRight, Heart } from "lucide-react"

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  )
}

function Counter({ target, prefix = "", suffix = "" }: { target: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    const step = target / 80
    const t = setInterval(() => setCount(c => { const n = c + step; if (n >= target) { clearInterval(t); return target; } return n; }), 16)
    return () => clearInterval(t)
  }, [inView, target])
  return <span ref={ref}>{prefix}{Math.floor(count).toLocaleString()}{suffix}</span>
}

const LISTINGS = [
  {
    id: 1, title: "The Meridian Penthouse", address: "1240 Park Avenue, Upper East Side, NYC", price: "$8,450,000",
    beds: 5, baths: 4, sqft: "5,200", type: "Penthouse", status: "For Sale",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    features: ["360° City Views", "Private Rooftop", "Concierge Service", "Wine Cellar"],
    agent: "Victoria Harrington", cap: "42% below market peak"
  },
  {
    id: 2, title: "Lakefront Villa Reserve", address: "88 Lakeshore Drive, Greenwich, CT", price: "$4,200,000",
    beds: 6, baths: 5, sqft: "7,800", type: "Villa", status: "For Sale",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    features: ["Private Dock", "Heated Pool", "Smart Home", "3-Car Garage"],
    agent: "James Whitfield", cap: "Strong appreciation corridor"
  },
  {
    id: 3, title: "SoHo Industrial Loft", address: "340 Broadway, SoHo, NYC", price: "$3,875,000",
    beds: 3, baths: 3, sqft: "3,900", type: "Loft", status: "New Listing",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    features: ["Original Columns", "Chef's Kitchen", "Art Studio Space", "Private Elevator"],
    agent: "Elena Marchetti", cap: "Historic building, landmark protected"
  },
  {
    id: 4, title: "Brooklyn Heights Brownstone", address: "72 Pierrepont Street, Brooklyn, NY", price: "$6,100,000",
    beds: 7, baths: 6, sqft: "6,400", type: "Townhouse", status: "For Sale",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80",
    features: ["Garden Duplex", "Period Details", "Roof Deck", "Separate Guest Suite"],
    agent: "Marcus Bell", cap: "Promenade views, $450/sqft"
  },
  {
    id: 5, title: "Tribeca Full-Floor Loft", address: "22 Hudson Street, Tribeca, NYC", price: "$12,900,000",
    beds: 4, baths: 4, sqft: "8,100", type: "Full Floor", status: "Off Market",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
    features: ["Cast Iron Façade", "North & South Light", "Keyed Elevator", "2,000 sqft Terrace"],
    agent: "Victoria Harrington", cap: "Trophy asset, rarely available"
  },
  {
    id: 6, title: "Hamptons Beach Estate", address: "1 Ocean Road, Southampton, NY", price: "$22,500,000",
    beds: 9, baths: 8, sqft: "11,200", type: "Estate", status: "For Sale",
    image: "https://images.unsplash.com/photo-1613977257365-aaae5a9817ad?w=800&q=80",
    features: ["200ft Ocean Frontage", "Heated Gunite Pool", "Tennis Court", "Carriage House"],
    agent: "James Whitfield", cap: "Generational holding opportunity"
  },
]

const TESTIMONIALS = [
  {
    name: "Carolyn & David Whitmore", role: "Buyers", company: "Sold: Park Avenue Duplex",
    quote: "NexEstate found us a property that wasn't even listed publicly. Their network is unlike anything we'd encountered with other brokers. We closed $300K under asking on a $9M apartment.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80",
    rating: 5, stat: "Closed $300K under ask"
  },
  {
    name: "Alexander Fontaine", role: "Developer", company: "Fontaine Capital Group",
    quote: "We've worked with NexEstate on 14 transactions totaling $180M. Their market intelligence is institutional grade. They've never missed a valuation by more than 2%.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
    rating: 5, stat: "$180M in closed transactions"
  },
  {
    name: "Dr. Priya Anand", role: "Buyer", company: "Sold: Riverside Drive Condo",
    quote: "As an international buyer, navigating NYC real estate was daunting. NexEstate's concierge team handled everything from legal review to school district analysis. Exceptional.",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80",
    rating: 5, stat: "International buyer, closed in 22 days"
  },
  {
    name: "Thomas & Renée Bellamy", role: "Sellers", company: "Sold: Brooklyn Heights Townhouse",
    quote: "Listed on a Thursday, received 7 offers by Sunday, accepted 18% above ask. NexEstate's staging and marketing campaign was surgical. No one else comes close.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80",
    rating: 5, stat: "18% over asking price"
  },
  {
    name: "Ingrid Söderberg", role: "Investor", company: "Nordic Real Assets AB",
    quote: "NexEstate manages our entire NYC residential portfolio — 23 units. Their property management is proactive, their market reports are excellent, and occupancy stays above 97%.",
    img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&q=80",
    rating: 5, stat: "97%+ portfolio occupancy"
  },
]

const FAQS = [
  {
    q: "How is NexEstate different from other luxury brokerages?",
    a: "NexEstate operates a curated off-market network unavailable through the MLS. Over 60% of our transactions involve properties never publicly listed, giving our clients first access to trophy assets. We combine institutional-grade market intelligence with white-glove service — every client receives a dedicated senior advisor, not a rotating team of junior agents."
  },
  {
    q: "What is the typical commission structure?",
    a: "Our seller representation is typically 5-6% of the transaction value, split with the buyer's broker. For buyer representation, we are compensated by the seller in most transactions. For commercial and investment portfolio deals, custom fee structures are negotiated on a case-by-case basis. All fee arrangements are fully transparent and disclosed upfront."
  },
  {
    q: "How do you determine accurate property valuations?",
    a: "Our valuation methodology layers three data sources: granular comparable sales analysis from the past 90 days, a proprietary hedonic pricing model trained on 40,000+ NYC transactions, and qualitative factors (floor, views, light, building quality) scored by our senior advisors. We consistently achieve valuations within 1.8% of final sale price."
  },
  {
    q: "Do you work with international buyers and foreign investors?",
    a: "Absolutely. Approximately 35% of our buyer clients are international. We maintain partnerships with immigration attorneys, FIRPTA-specialist CPAs, and international title companies. We provide full acquisition support including entity structuring, LLC formation, currency exchange guidance, and post-closing property management."
  },
  {
    q: "What is your average days-on-market for listings?",
    a: "Our current portfolio averages 18 days on market, compared to a Manhattan market average of 67 days. This performance is driven by precision pricing, our proprietary buyer matching database of 12,000+ qualified purchasers, and our multi-channel marketing including targeted digital campaigns, broker previews, and editorial press placements."
  },
  {
    q: "Can NexEstate assist with property management after purchase?",
    a: "Yes. Our asset management division oversees 340+ residential and commercial units for investor clients. Services include tenant screening and placement, lease negotiation, monthly financial reporting, maintenance coordination, capital improvement oversight, and annual rental market analysis. We target 5-8% annual rent growth for managed portfolios."
  },
  {
    q: "What neighborhoods and markets do you cover?",
    a: "Our primary market is the New York Metro Area — Manhattan, Brooklyn, Queens, and the Hamptons. We have dedicated teams in Greenwich, CT, Palm Beach, FL, and Los Angeles. For international properties, we operate a referral network with curated partners in London, Paris, Dubai, Singapore, and Sydney."
  },
]

const PRICING_TIERS = [
  {
    name: "Starter",
    price: "$2,999",
    period: "/ listing",
    description: "For independent agents and small teams looking to list on the NexEstate platform.",
    features: [
      "1 active listing at a time",
      "Standard MLS syndication",
      "Basic analytics dashboard",
      "Email support",
      "30-day listing duration",
      "NexEstate buyer network access",
    ],
    cta: "List a Property",
    highlight: false,
    badge: null,
  },
  {
    name: "Professional",
    price: "$7,499",
    period: "/ month",
    description: "For boutique brokerages managing 5–25 active listings with premium marketing needs.",
    features: [
      "Unlimited active listings",
      "Off-market private network access",
      "Professional photography & staging consult",
      "Dedicated relationship manager",
      "Priority placement in search results",
      "Custom branded property pages",
      "Weekly performance reports",
      "Buyer matching algorithm access",
    ],
    cta: "Start Free Trial",
    highlight: true,
    badge: "Most Popular",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "pricing",
    description: "For institutional investors, developers, and large brokerages with portfolio-scale needs.",
    features: [
      "Everything in Professional",
      "Portfolio management dashboard",
      "Institutional buyer introductions",
      "Co-investment deal structuring",
      "Legal & title coordination",
      "International buyer pipeline",
      "White-label platform option",
      "Dedicated 24/7 deal desk",
    ],
    cta: "Contact Sales",
    highlight: false,
    badge: null,
  },
]

export default function NexEstateRealEstate() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const heroY = useTransform(scrollYProgress, [0, 0.4], [0, 120])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  const [activeTab, setActiveTab] = useState("buy")
  const [selectedListing, setSelectedListing] = useState<typeof LISTINGS[0] | null>(null)
  const [contactOpen, setContactOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div ref={containerRef} style={{ overflowX: "hidden", scrollBehavior: "smooth" }} className="bg-white text-slate-900 min-h-screen font-sans">

      {/* ── NAVBAR ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 bg-slate-900 rounded flex items-center justify-center">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-black tracking-tight text-slate-900">Nex<span className="text-amber-500">Estate</span></span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {["Buy", "Sell", "Rent", "Commercial", "About"].map(item => (
              <Link key={item} href="#" className="cursor-pointer text-sm font-semibold text-slate-600 hover:text-slate-900 transition-all duration-200">{item}</Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => setContactOpen(true)} className="cursor-pointer text-sm font-semibold text-slate-700 px-4 py-2 hover:bg-slate-100 rounded-lg transition-all duration-200">
              <Phone className="w-4 h-4 inline mr-2" />Call Us
            </button>
            <button onClick={() => setContactOpen(true)} className="cursor-pointer bg-slate-900 text-white text-sm font-bold px-5 py-2.5 rounded-lg hover:bg-amber-500 transition-all duration-200">
              List Property
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
                {["Buy", "Sell", "Rent", "Commercial", "About", "Contact"].map(item => (
                  <Link key={item} href="#" className="cursor-pointer text-lg font-bold text-slate-800 hover:text-amber-500 transition-colors duration-200">{item}</Link>
                ))}
                <button onClick={() => setContactOpen(true)} className="cursor-pointer bg-slate-900 text-white font-bold py-3 rounded-lg hover:bg-amber-500 transition-all duration-200">
                  List Your Property
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"
            alt="Luxury Real Estate"
            fill className="object-cover" priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/50 to-transparent" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-32">
          <motion.div style={{ opacity: heroOpacity }} className="max-w-2xl">
            <Reveal delay={0}>
              <Badge className="bg-amber-500/20 border-amber-500 text-amber-300 mb-6 cursor-default">
                NYC's #1 Luxury Real Estate Platform
              </Badge>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6 tracking-tight">
                Find Your<br />
                <span className="text-amber-400">Extraordinary</span><br />
                Home.
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-xl text-slate-200 mb-10 leading-relaxed font-light max-w-lg">
                Curated luxury properties across New York's most sought-after neighborhoods. Off-market access, institutional-grade intelligence, and white-glove service.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              {/* Search Bar */}
              <div className="bg-white rounded-xl p-4 shadow-2xl mb-8">
                <div className="flex gap-2 mb-3">
                  {["buy", "rent", "sell"].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`cursor-pointer px-4 py-1.5 rounded-lg text-sm font-bold capitalize transition-all duration-200 ${activeTab === tab ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-100"}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="flex gap-3 items-center">
                  <div className="flex-1 flex items-center gap-3 bg-slate-50 rounded-lg px-4 py-3">
                    <Search className="w-4 h-4 text-slate-400" />
                    <input className="bg-transparent text-slate-900 text-sm font-medium placeholder:text-slate-400 outline-none w-full cursor-text" placeholder="Search neighborhood, address, or zip code…" />
                  </div>
                  <button className="cursor-pointer bg-amber-500 hover:bg-amber-600 text-white font-bold px-5 py-3 rounded-lg transition-all duration-200 flex items-center gap-2">
                    <Search className="w-4 h-4" /> Search
                  </button>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="flex gap-6 items-center">
                <div className="flex -space-x-2">
                  {["photo-1494790108377-be9c29b29330", "photo-1507003211169-0a1dd7228f2d", "photo-1438761681033-6461ffad8d80"].map((id, i) => (
                    <div key={i} className="w-9 h-9 rounded-full border-2 border-white overflow-hidden relative">
                      <Image src={`https://images.unsplash.com/${id}?w=80&q=80`} alt="Client" fill className="object-cover" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5 mb-0.5">
                    {Array(5).fill(0).map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
                  </div>
                  <p className="text-slate-200 text-xs font-semibold">Trusted by 4,200+ buyers & sellers</p>
                </div>
              </div>
            </Reveal>
          </motion.div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-slate-900 py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
            {[
              { label: "Total Sales Volume", value: 4800, prefix: "$", suffix: "M+" },
              { label: "Properties Sold", value: 2400, suffix: "+" },
              { label: "Active Listings", value: 380, suffix: "+" },
              { label: "Off-Market Network", value: 1200, suffix: " units" },
              { label: "Avg Days on Market", value: 18, suffix: " days" },
            ].map((stat, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="cursor-default">
                  <div className="text-3xl md:text-4xl font-black text-amber-400 mb-1">
                    <Counter target={stat.value} prefix={stat.prefix ?? ""} suffix={stat.suffix ?? ""} />
                  </div>
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED LISTINGS ── */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
              <div>
                <Badge className="bg-amber-100 text-amber-700 border-amber-200 mb-3 cursor-default">Featured Listings</Badge>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Exceptional Properties,<br /><span className="text-amber-500">Curated for You</span></h2>
              </div>
              <Link href="#" className="cursor-pointer flex items-center gap-2 text-slate-700 font-bold text-sm hover:text-amber-500 transition-colors duration-200">
                View All Listings <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {LISTINGS.map((listing, idx) => (
              <Reveal key={listing.id} delay={idx * 0.07}>
                <motion.div
                  whileHover={{ y: -6 }}
                  onClick={() => setSelectedListing(listing)}
                  className="cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 group"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image src={listing.image} alt={listing.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <Badge className={`${listing.status === "New Listing" ? "bg-emerald-500" : listing.status === "Off Market" ? "bg-purple-600" : "bg-amber-500"} text-white border-0 text-xs font-bold cursor-default`}>
                        {listing.status}
                      </Badge>
                    </div>
                    <button className="cursor-pointer absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200">
                      <Heart className="w-4 h-4 text-slate-600" />
                    </button>
                    <div className="absolute bottom-3 left-3">
                      <div className="bg-slate-900/80 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded-lg">
                        <MapPin className="w-3 h-3 inline mr-1" />{listing.type}
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-black text-lg text-slate-900 leading-tight">{listing.title}</h3>
                    </div>
                    <p className="text-slate-500 text-sm mb-3 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />{listing.address}
                    </p>
                    <div className="flex gap-4 text-sm text-slate-600 mb-4 font-semibold">
                      <span><Home className="w-3.5 h-3.5 inline mr-1" />{listing.beds} bed</span>
                      <span>{listing.baths} bath</span>
                      <span>{listing.sqft} sqft</span>
                    </div>
                    <Separator className="mb-4" />
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs text-slate-400 font-semibold mb-0.5">Listed at</p>
                        <p className="text-xl font-black text-slate-900">{listing.price}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-400 font-semibold mb-0.5">Agent</p>
                        <p className="text-sm font-bold text-amber-600">{listing.agent}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES TABS ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <Badge className="bg-slate-100 text-slate-700 border-slate-200 mb-4 cursor-default">Platform Capabilities</Badge>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Everything You Need to<br /><span className="text-amber-500">Close with Confidence</span></h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto font-light">NexEstate combines deep local expertise with technology-powered tools for buyers, sellers, and investors.</p>
            </div>
          </Reveal>

          <Tabs defaultValue="buyers" className="w-full">
            <TabsList className="grid grid-cols-3 max-w-lg mx-auto mb-12 bg-slate-100 p-1 rounded-xl">
              <TabsTrigger value="buyers" className="cursor-pointer rounded-lg font-bold transition-all duration-200 data-[state=active]:bg-white data-[state=active]:shadow-sm">For Buyers</TabsTrigger>
              <TabsTrigger value="sellers" className="cursor-pointer rounded-lg font-bold transition-all duration-200 data-[state=active]:bg-white data-[state=active]:shadow-sm">For Sellers</TabsTrigger>
              <TabsTrigger value="investors" className="cursor-pointer rounded-lg font-bold transition-all duration-200 data-[state=active]:bg-white data-[state=active]:shadow-sm">For Investors</TabsTrigger>
            </TabsList>

            <TabsContent value="buyers" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <Reveal>
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                          <Search className="w-5 h-5 text-amber-600" />
                        </div>
                        <h3 className="text-xl font-black text-slate-900">Off-Market Access</h3>
                      </div>
                      <p className="text-slate-500 ml-13 leading-relaxed">Browse 1,200+ properties before they ever hit the MLS. Our exclusive seller network gives you first-mover advantage on the most desirable inventory.</p>
                      <ul className="mt-3 space-y-2 ml-13">
                        {["Private listings unavailable elsewhere", "Seller intent alerts in your target zip codes", "Price history and negotiation intelligence"].map(f => (
                          <li key={f} className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />{f}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Separator />
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 text-amber-600" />
                        </div>
                        <h3 className="text-xl font-black text-slate-900">AI Valuation Engine</h3>
                      </div>
                      <p className="text-slate-500 leading-relaxed">Know fair value before you offer. Our proprietary valuation model processes 40,000+ comparable transactions, building-level quality scores, and real-time market momentum to give you a precise buying range.</p>
                    </div>
                    <Separator />
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                          <Users className="w-5 h-5 text-amber-600" />
                        </div>
                        <h3 className="text-xl font-black text-slate-900">Dedicated Buyer's Agent</h3>
                      </div>
                      <p className="text-slate-500 leading-relaxed">Every buyer receives a senior advisor with 10+ years of experience in their target market. From first showing to closing day, your agent is reachable 7 days a week with a 2-hour response guarantee.</p>
                    </div>
                  </div>
                </Reveal>
                <Reveal delay={0.2}>
                  <div className="relative h-96 md:h-[520px] rounded-2xl overflow-hidden shadow-2xl">
                    <Image src="https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=800&q=80" alt="Buyers" fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-xs text-slate-500 font-semibold mb-0.5">Buyer Success Rate</p>
                            <p className="text-2xl font-black text-slate-900">94.2%</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-slate-500 font-semibold mb-0.5">Avg Under Ask</p>
                            <p className="text-2xl font-black text-emerald-600">-3.8%</p>
                          </div>
                        </div>
                        <Progress value={94} className="mt-3 h-2" />
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </TabsContent>

            <TabsContent value="sellers" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <Reveal>
                  <div className="relative h-96 md:h-[520px] rounded-2xl overflow-hidden shadow-2xl">
                    <Image src="https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80" alt="Sellers" fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-xs text-slate-500 font-semibold mb-0.5">Avg Sale-to-List</p>
                            <p className="text-2xl font-black text-slate-900">101.4%</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-slate-500 font-semibold mb-0.5">Days on Market</p>
                            <p className="text-2xl font-black text-amber-600">18 days</p>
                          </div>
                        </div>
                        <Progress value={88} className="mt-3 h-2" />
                      </div>
                    </div>
                  </div>
                </Reveal>
                <Reveal delay={0.2}>
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                          <Award className="w-5 h-5 text-amber-600" />
                        </div>
                        <h3 className="text-xl font-black text-slate-900">Premium Marketing Package</h3>
                      </div>
                      <p className="text-slate-500 leading-relaxed">Your property deserves more than MLS photos. Every NexEstate listing includes professional architectural photography, 3D Matterport tours, drone footage, and placement in 8 premium lifestyle publications.</p>
                    </div>
                    <Separator />
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                          <DollarSign className="w-5 h-5 text-amber-600" />
                        </div>
                        <h3 className="text-xl font-black text-slate-900">Strategic Pricing Intelligence</h3>
                      </div>
                      <p className="text-slate-500 leading-relaxed">List at the right price from day one. Our pricing strategy has delivered an average sale-to-list ratio of 101.4% across 2,400+ transactions — meaning sellers consistently receive more than asking.</p>
                    </div>
                    <Separator />
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                          <Globe className="w-5 h-5 text-amber-600" />
                        </div>
                        <h3 className="text-xl font-black text-slate-900">Global Buyer Reach</h3>
                      </div>
                      <p className="text-slate-500 leading-relaxed">Tap into our 12,000+ pre-qualified buyer database and global partner network spanning 38 countries. International buyers represent 35% of our transactions and frequently transact above ask in competitive situations.</p>
                    </div>
                  </div>
                </Reveal>
              </div>
            </TabsContent>

            <TabsContent value="investors" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: TrendingUp, title: "Portfolio Analytics", desc: "Real-time NOI tracking, cap rate analysis, and hold/sell recommendations for your entire residential and commercial portfolio. Integrated with StreetEasy, CoStar, and ACRIS data feeds.", items: ["Automated monthly P&L per unit", "Cap rate benchmarking vs. market", "Vacancy risk scoring model"] },
                  { icon: Building2, title: "Deal Sourcing", desc: "First look at distressed assets, bulk dispositions, and off-market multifamily packages. Our acquisition team underwrites 200+ deals per month to surface only the highest-conviction opportunities.", items: ["Multifamily packages 4–100 units", "Tax lien and foreclosure pipeline", "1031 exchange matching service"] },
                  { icon: DollarSign, title: "Asset Management", desc: "Full-service property management for investor portfolios. We handle tenant relations, lease renewals, capital planning, vendor management, and monthly reporting — you collect checks.", items: ["97.2% average occupancy rate", "5-8% annual rent growth target", "Sub-15 day vacancy turnaround"] },
                ].map((feature, idx) => {
                  const Icon = feature.icon
                  return (
                    <Reveal key={idx} delay={idx * 0.1}>
                      <Card className="cursor-pointer border-slate-200 hover:border-amber-300 hover:shadow-lg transition-all duration-300 h-full">
                        <CardContent className="p-6">
                          <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                            <Icon className="w-6 h-6 text-amber-600" />
                          </div>
                          <h3 className="text-xl font-black text-slate-900 mb-3">{feature.title}</h3>
                          <p className="text-slate-500 text-sm leading-relaxed mb-4">{feature.desc}</p>
                          <ul className="space-y-2">
                            {feature.items.map(item => (
                              <li key={item} className="flex items-center gap-2 text-xs text-slate-600 font-semibold">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />{item}
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

      {/* ── TESTIMONIALS CAROUSEL ── */}
      <section className="py-24 px-6 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <Badge className="bg-amber-500/20 border-amber-500 text-amber-300 mb-4 cursor-default">Client Stories</Badge>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                Trusted by New York's<br /><span className="text-amber-400">Most Discerning Buyers</span>
              </h2>
              <p className="text-slate-400 text-lg max-w-xl mx-auto font-light">Over 4,200 successful transactions. Here's what our clients say.</p>
            </div>
          </Reveal>
          <Carousel className="w-full">
            <CarouselContent className="-ml-4">
              {TESTIMONIALS.map((t, idx) => (
                <CarouselItem key={idx} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <Reveal delay={idx * 0.06}>
                    <Card className="cursor-pointer bg-slate-800 border-slate-700 hover:border-amber-500/50 transition-all duration-300 h-full">
                      <CardContent className="p-7">
                        <div className="flex gap-0.5 mb-4">
                          {Array(t.rating).fill(0).map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                        </div>
                        <p className="text-slate-200 text-sm leading-relaxed mb-6 italic">"{t.quote}"</p>
                        <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2 mb-5">
                          <p className="text-amber-400 text-xs font-black">{t.stat}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10 ring-2 ring-amber-500/30">
                            <AvatarImage src={t.img} alt={t.name} />
                            <AvatarFallback className="bg-amber-500 text-white font-bold text-xs">{t.name.split(" ").map(n => n[0]).join("").slice(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-white font-bold text-sm">{t.name}</p>
                            <p className="text-amber-400 text-xs font-semibold">{t.role} · {t.company}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Reveal>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="cursor-pointer border-slate-600 text-white hover:bg-slate-700 hover:border-slate-500 transition-all duration-200" />
            <CarouselNext className="cursor-pointer border-slate-600 text-white hover:bg-slate-700 hover:border-slate-500 transition-all duration-200" />
          </Carousel>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <Badge className="bg-amber-100 text-amber-700 border-amber-200 mb-4 cursor-default">Transparent Pricing</Badge>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
                Choose the Right<br /><span className="text-amber-500">Partnership Level</span>
              </h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto font-light">Whether you're an independent agent or a portfolio institution, we have a plan built for you.</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {PRICING_TIERS.map((tier, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className={`cursor-pointer relative h-full rounded-2xl border-2 p-8 flex flex-col transition-all duration-300 hover:shadow-xl ${tier.highlight ? "border-amber-500 bg-slate-900 shadow-xl shadow-amber-500/10" : "border-slate-200 bg-white hover:border-amber-200"}`}>
                  {tier.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <Badge className="bg-amber-500 text-white border-0 px-4 py-1 text-xs font-black">{tier.badge}</Badge>
                    </div>
                  )}
                  <div className="mb-6">
                    <h3 className={`text-2xl font-black mb-1 ${tier.highlight ? "text-white" : "text-slate-900"}`}>{tier.name}</h3>
                    <div className="flex items-end gap-1 mb-3">
                      <span className={`text-4xl font-black ${tier.highlight ? "text-amber-400" : "text-slate-900"}`}>{tier.price}</span>
                      <span className={`text-sm font-semibold mb-1 ${tier.highlight ? "text-slate-400" : "text-slate-400"}`}>{tier.period}</span>
                    </div>
                    <p className={`text-sm leading-relaxed ${tier.highlight ? "text-slate-400" : "text-slate-500"}`}>{tier.description}</p>
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {tier.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${tier.highlight ? "text-amber-400" : "text-emerald-500"}`} />
                        <span className={`text-sm font-medium ${tier.highlight ? "text-slate-300" : "text-slate-600"}`}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => setContactOpen(true)} className={`cursor-pointer w-full py-3 rounded-xl font-bold text-sm transition-all duration-200 ${tier.highlight ? "bg-amber-500 text-white hover:bg-amber-400" : "bg-slate-900 text-white hover:bg-amber-500"}`}>
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
              <Badge className="bg-slate-200 text-slate-700 border-slate-300 mb-4 cursor-default">FAQ</Badge>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                Questions We Hear<br /><span className="text-amber-500">Every Day</span>
              </h2>
            </div>
          </Reveal>
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((faq, idx) => (
              <Reveal key={idx} delay={idx * 0.04}>
                <AccordionItem value={`faq-${idx}`} className="cursor-pointer bg-white border border-slate-200 rounded-xl px-6 hover:border-amber-300 transition-all duration-200">
                  <AccordionTrigger className="cursor-pointer hover:text-amber-600 font-bold text-slate-900 py-5 text-left transition-colors duration-200">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-500 pb-5 leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              </Reveal>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-24 px-6 bg-amber-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80" alt="NYC Skyline" fill className="object-cover" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <Reveal>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
              Your Next Chapter<br />Starts with a Conversation.
            </h2>
            <p className="text-slate-800 text-xl mb-10 font-light max-w-2xl mx-auto leading-relaxed">
              Whether buying, selling, or investing — our advisors are available now. No obligation, no pressure. Just expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => setContactOpen(true)} className="cursor-pointer bg-slate-900 text-white font-black px-10 py-4 rounded-xl hover:bg-slate-800 transition-all duration-200 text-lg shadow-xl">
                <Calendar className="w-5 h-5 inline mr-2" />Book a Consultation
              </button>
              <button onClick={() => setContactOpen(true)} className="cursor-pointer bg-white text-slate-900 font-black px-10 py-4 rounded-xl hover:bg-slate-100 transition-all duration-200 text-lg border-2 border-slate-900">
                <Phone className="w-5 h-5 inline mr-2" />Call (212) 555-0190
              </button>
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
                <div className="w-8 h-8 bg-amber-500 rounded flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-black text-white">Nex<span className="text-amber-400">Estate</span></span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
                New York's premier luxury real estate platform. Connecting discerning buyers, sellers, and investors with exceptional properties since 2008.
              </p>
              <div className="flex gap-3">
                {[Globe, Globe, Globe, Globe].map((Icon, i) => (
                  <a key={i} href="#" className="cursor-pointer w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-amber-500 transition-all duration-200">
                    <Icon className="w-4 h-4 text-slate-300" />
                  </a>
                ))}
              </div>
            </div>
            {[
              { title: "Properties", links: ["Buy a Home", "Rent an Apartment", "Commercial Space", "Off-Market Listings", "New Developments"] },
              { title: "Services", links: ["Buyer's Agency", "Seller Representation", "Portfolio Management", "1031 Exchanges", "International Buyers"] },
              { title: "Company", links: ["About NexEstate", "Our Agents", "Press Room", "Careers", "Contact Us"] },
            ].map(col => (
              <div key={col.title}>
                <h4 className="text-white font-black text-sm uppercase tracking-widest mb-5">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map(link => (
                    <li key={link}><Link href="#" className="cursor-pointer text-slate-400 text-sm hover:text-amber-400 transition-colors duration-200 font-medium">{link}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Separator className="bg-slate-800 mb-8" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">© 2026 NexEstate. All rights reserved. Licensed Real Estate Broker in NY, CT, FL.</p>
            <div className="flex gap-6">
              {["Privacy Policy", "Terms of Service", "Fair Housing"].map(link => (
                <Link key={link} href="#" className="cursor-pointer text-slate-500 text-sm hover:text-slate-300 transition-colors duration-200">{link}</Link>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ── LISTING DIALOG ── */}
      <Dialog open={!!selectedListing} onOpenChange={(o) => !o && setSelectedListing(null)}>
        <DialogContent className="bg-white max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedListing && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-black text-slate-900">{selectedListing.title}</DialogTitle>
              </DialogHeader>
              <div className="relative h-64 rounded-xl overflow-hidden mb-5">
                <Image src={selectedListing.image} alt={selectedListing.title} fill className="object-cover" />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-amber-500 text-white border-0 font-bold">{selectedListing.status}</Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-5">
                {[
                  { label: "Price", value: selectedListing.price },
                  { label: "Type", value: selectedListing.type },
                  { label: "Bedrooms", value: `${selectedListing.beds} beds` },
                  { label: "Bathrooms", value: `${selectedListing.baths} baths` },
                  { label: "Size", value: `${selectedListing.sqft} sqft` },
                  { label: "Agent", value: selectedListing.agent },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-slate-50 rounded-xl p-4">
                    <p className="text-xs text-slate-400 font-black uppercase tracking-widest mb-1">{label}</p>
                    <p className="text-slate-900 font-black">{value}</p>
                  </div>
                ))}
              </div>
              <div className="mb-5">
                <p className="text-xs text-slate-400 font-black uppercase tracking-widest mb-3">Key Features</p>
                <div className="flex flex-wrap gap-2">
                  {selectedListing.features.map(f => <Badge key={f} className="bg-amber-100 text-amber-700 border-amber-200 cursor-default font-semibold">{f}</Badge>)}
                </div>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 mb-5">
                <p className="text-xs text-slate-400 font-semibold mb-1">Investment Note</p>
                <p className="text-slate-700 text-sm font-medium">{selectedListing.cap}</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setContactOpen(true)} className="cursor-pointer flex-1 bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-amber-500 transition-all duration-200">
                  Schedule Viewing
                </button>
                <button onClick={() => setContactOpen(true)} className="cursor-pointer flex-1 border-2 border-slate-200 text-slate-700 font-bold py-3 rounded-xl hover:border-amber-300 hover:text-amber-600 transition-all duration-200">
                  Request Info
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* ── CONTACT DIALOG ── */}
      <Dialog open={contactOpen} onOpenChange={setContactOpen}>
        <DialogContent className="bg-white max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-slate-900">Speak with an Advisor</DialogTitle>
          </DialogHeader>
          <p className="text-slate-500 text-sm mb-6">Our senior real estate advisors are available Mon–Sun, 8am–9pm ET.</p>
          <form className="space-y-4" onSubmit={e => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-black text-slate-600 uppercase tracking-widest mb-1 block">First Name</label>
                <input className="cursor-text w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-amber-400 transition-colors duration-200 font-medium" placeholder="James" />
              </div>
              <div>
                <label className="text-xs font-black text-slate-600 uppercase tracking-widest mb-1 block">Last Name</label>
                <input className="cursor-text w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-amber-400 transition-colors duration-200 font-medium" placeholder="Whitfield" />
              </div>
            </div>
            <div>
              <label className="text-xs font-black text-slate-600 uppercase tracking-widest mb-1 block">Email</label>
              <input type="email" className="cursor-text w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-amber-400 transition-colors duration-200 font-medium" placeholder="james@example.com" />
            </div>
            <div>
              <label className="text-xs font-black text-slate-600 uppercase tracking-widest mb-1 block">Phone</label>
              <input type="tel" className="cursor-text w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-amber-400 transition-colors duration-200 font-medium" placeholder="+1 (212) 555-0000" />
            </div>
            <div>
              <label className="text-xs font-black text-slate-600 uppercase tracking-widest mb-1 block">I am interested in</label>
              <select className="cursor-pointer w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-amber-400 transition-colors duration-200 font-medium bg-white">
                <option>Buying a Property</option>
                <option>Selling a Property</option>
                <option>Renting</option>
                <option>Investment / Portfolio</option>
                <option>Commercial Real Estate</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-black text-slate-600 uppercase tracking-widest mb-1 block">Budget / Message</label>
              <textarea rows={3} className="cursor-text w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-amber-400 transition-colors duration-200 font-medium resize-none" placeholder="e.g. Looking for a 4-bed in Tribeca, budget $5–8M…" />
            </div>
            <button type="submit" className="cursor-pointer w-full bg-slate-900 text-white font-black py-4 rounded-xl hover:bg-amber-500 transition-all duration-200 text-sm">
              Request Consultation
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
