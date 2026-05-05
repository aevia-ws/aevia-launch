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
import { Menu, Scale, FileText, Users, Search, Clock, CheckCircle2, ArrowRight, Star, Globe, Shield, Building, TrendingUp, BookOpen, Gavel, Briefcase, Phone, Mail, Calendar, ChevronRight, AlertCircle } from "lucide-react"

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

const PRACTICE_AREAS = [
  {
    id: "corporate",
    icon: Building,
    name: "Corporate & M&A",
    tagline: "Structuring transactions that hold.",
    description: "End-to-end transactional counsel for mergers, acquisitions, divestitures, joint ventures, and corporate restructurings across all major industries and jurisdictions. From $10M bolt-ons to $2B strategic combinations.",
    stats: { deals: "340+", value: "$18B", jurisdictions: "42" },
    matters: ["Cross-border M&A", "Private equity & venture transactions", "Hostile takeover defense", "Board governance & fiduciary duties", "Shareholder agreements & buy-sell provisions"],
  },
  {
    id: "litigation",
    icon: Gavel,
    name: "Complex Litigation",
    tagline: "Winning positions before courts and arbiters.",
    description: "Trial-tested attorneys representing corporations, executives, and institutions in high-stakes commercial disputes, securities litigation, regulatory enforcement, and class action defense across federal and state courts.",
    stats: { cases: "180+", winRate: "94%", avgDamages: "$42M" },
    matters: ["Commercial contract disputes", "Securities fraud & enforcement defense", "Class action defense", "Trade secret & IP litigation", "White-collar criminal defense"],
  },
  {
    id: "employment",
    icon: Users,
    name: "Employment & HR",
    tagline: "Protecting your workforce and your business.",
    description: "Comprehensive employment law counsel covering executive compensation, non-competes, workforce reductions, discrimination defense, and NLRA compliance — guiding employers through an increasingly complex regulatory environment.",
    stats: { clients: "620+", matters: "2,100+", states: "50" },
    matters: ["Non-compete & restrictive covenant drafting", "Executive separation agreements", "Workforce RIF planning & WARN Act", "EEOC & NLRB response strategy", "Remote & hybrid workforce policies"],
  },
]

const ATTORNEYS = [
  {
    name: "Victoria Hargrove", title: "Managing Partner", practice: "M&A & Private Equity",
    bio: "30 years advising Fortune 500 boards on transformative transactions. Led counsel on 14 deals exceeding $1B. Former SDNY prosecutor. Harvard Law '94.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80",
    matters: ["$2.2B telecom acquisition", "Multi-jurisdiction carve-out", "SPAC de-SPAC transaction"],
    bar: ["New York", "Delaware", "California"],
  },
  {
    name: "Marcus Okafor", title: "Senior Partner", practice: "Complex Commercial Litigation",
    bio: "Tried 40+ cases to verdict. Specializes in securities class action defense and high-stakes arbitration. Adjunct faculty at Columbia Law. Chicago Law '98.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
    matters: ["$340M securities fraud defense", "Hostile takeover litigation", "International commercial arbitration"],
    bar: ["New York", "New Jersey", "S.D.N.Y.", "2nd Circuit"],
  },
  {
    name: "Sophia Lindqvist", title: "Partner", practice: "Regulatory & Government Affairs",
    bio: "Former senior counsel at the FTC. Deep expertise in antitrust merger review, government investigations, and regulatory strategy. Yale Law '06.",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80",
    matters: ["DOJ second request response", "FTC merger challenge defense", "CFIUS national security review"],
    bar: ["D.C.", "New York", "Virginia"],
  },
  {
    name: "David Park", title: "Partner", practice: "Employment & Executive Compensation",
    bio: "Advises boards, compensation committees, and C-suite executives on employment, equity, and severance matters. Former in-house GC at Fortune 100 company. Cornell Law '03.",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80",
    matters: ["CEO separation & clawback", "Section 409A compliance", "Mass RIF planning (WARN Act)"],
    bar: ["New York", "New Jersey", "Connecticut"],
  },
]

const TESTIMONIALS = [
  {
    name: "Robert Kessler", role: "CEO", company: "Meridian Capital Partners",
    quote: "LexBridge guided us through a contested $1.2B acquisition with cross-border complications in four jurisdictions. Their team was relentless and the deal closed on time, on structure. I would not use another firm for transactions of this magnitude.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
    rating: 5, matter: "$1.2B cross-border M&A"
  },
  {
    name: "Jennifer Wai", role: "General Counsel", company: "NovaTech Systems",
    quote: "We faced a $340M securities fraud class action that threatened the company's existence. LexBridge's litigation team understood not just the law, but the business. They achieved a dismissal with prejudice at the pleading stage. Exceptional.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80",
    rating: 5, matter: "$340M class action defense"
  },
  {
    name: "Thomas Eriksson", role: "CFO", company: "Atlas Infrastructure REIT",
    quote: "LexBridge manages all of our transactional, employment, and regulatory work. The integrated approach — one firm, one relationship — has saved us enormous time and cost versus our previous multi-firm arrangement.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80",
    rating: 5, matter: "Full-scope enterprise counsel"
  },
  {
    name: "Amara Diallo", role: "Founder & Managing Director", company: "Crescendo Ventures",
    quote: "LexBridge has been our fund formation counsel through three raises totaling $840M. Their LP documentation is impeccable, their turnaround times are fast, and they actually understand the economics of our business.",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80",
    rating: 5, matter: "$840M fund formation"
  },
  {
    name: "Charles Manning", role: "President", company: "Beacon Consumer Goods",
    quote: "When the NLRB came knocking after our restructuring, LexBridge's employment team had a strategy in 24 hours. The investigation closed without a finding. Their institutional knowledge of our industry is unmatched.",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80",
    rating: 5, matter: "NLRB investigation defense"
  },
]

const FAQS = [
  {
    q: "What types of companies does LexBridge typically represent?",
    a: "LexBridge primarily represents mid-market and large-cap corporations, private equity funds, portfolio companies, and executives. Our clients range from growth-stage companies raising their first institutional round to Fortune 500 enterprises navigating complex multi-jurisdictional transactions. We also represent high-net-worth individuals in significant personal legal matters involving business interests, estate disputes, and executive employment."
  },
  {
    q: "How is LexBridge's fee structure determined?",
    a: "We offer several engagement models depending on client needs and matter type. Transactional matters typically operate on a fixed-fee or capped-fee basis with full transparency upfront. Litigation engagements can be structured as hourly, fixed-fee, or hybrid contingency arrangements. Ongoing general counsel relationships are available on a retainer basis with predictable monthly costs. We provide detailed fee estimates before engagement and never exceed agreed budgets without advance client approval."
  },
  {
    q: "How does LexBridge handle conflicts of interest in multi-client representations?",
    a: "We maintain a rigorous conflicts-checking protocol managed by dedicated conflict counsel. Before any engagement, we conduct a full database search of current and former clients, adverse parties, and related entities. Where a potential conflict exists, we implement ethical walls, obtain informed waivers where appropriate, or decline the representation. Our conflict procedures comply with the Model Rules and all applicable state bar requirements. Confidential conflict inquiries can be submitted before sharing any matter-specific information."
  },
  {
    q: "Does LexBridge operate outside the United States?",
    a: "Yes. We have active practices in 12 countries through our own offices in London, Frankfurt, Singapore, and Dubai, and through a vetted network of affiliated firms covering an additional 40+ jurisdictions. For cross-border transactions and international arbitration, our teams coordinate seamlessly across time zones. We regularly manage matters simultaneously under U.S., English, EU, and APAC law."
  },
  {
    q: "What is the LexBridge approach to matter staffing?",
    a: "Every engagement is led by a named partner who is personally accountable for quality and client communication. Associate and specialist counsel are added based on matter complexity and specialization — we do not over-staff to maximize billing. Our senior-to-junior ratio is among the highest in the industry, ensuring client matters receive experienced, efficient attention at every stage."
  },
  {
    q: "How does LexBridge handle urgent or emergency legal matters?",
    a: "We maintain a 24/7 client emergency line staffed by a senior attorney for all active client relationships. TRO applications, emergency injunctions, and regulatory crisis matters receive immediate response. Our litigation team has obtained emergency injunctive relief for clients within hours of initial contact on matters involving trade secret misappropriation, corporate governance crises, and hostile acquisition defenses."
  },
  {
    q: "Can LexBridge serve as interim General Counsel for companies without in-house legal teams?",
    a: "Absolutely. Our Embedded Counsel program places a dedicated LexBridge attorney on-site or virtually with companies that require full-time legal leadership without permanent headcount. This includes attending board meetings, managing vendor contracts, overseeing regulatory compliance, and coordinating specialist outside counsel for complex matters. Our embedded counsel clients gain Fortune 500-level legal sophistication at a fraction of the cost of a full in-house team."
  },
]

const PRICING_TIERS = [
  {
    name: "Retainer",
    price: "$8,500",
    period: "/ month",
    description: "For growth-stage companies needing predictable access to senior legal counsel without building an in-house team.",
    features: [
      "40 hours of senior attorney access/month",
      "Corporate governance & board matters",
      "Contract review & commercial agreements",
      "Employment policy & HR guidance",
      "Regulatory compliance advisory",
      "Priority scheduling (48hr response)",
      "Monthly legal health report",
    ],
    cta: "Schedule Consultation",
    highlight: false,
    badge: null,
  },
  {
    name: "Enterprise",
    price: "$24,000",
    period: "/ month",
    description: "For mid-market companies requiring full-scope legal partnership across transactions, litigation, and regulatory matters.",
    features: [
      "Unlimited access to attorney team",
      "Dedicated partner relationship manager",
      "M&A and transaction counsel",
      "Litigation monitoring & strategy",
      "Employment & executive compensation",
      "Regulatory & government affairs",
      "Board-level strategic counsel",
      "24/7 emergency response line",
    ],
    cta: "Talk to a Partner",
    highlight: true,
    badge: "Most Comprehensive",
  },
  {
    name: "Sovereign",
    price: "Custom",
    period: "engagement",
    description: "For large-cap corporations, PE-backed companies, and institutional clients with complex multi-matter requirements.",
    features: [
      "Everything in Enterprise",
      "Named partner for each practice area",
      "Embedded counsel option",
      "International multi-jurisdiction coverage",
      "Fixed-fee M&A packaging",
      "Litigation war-room staffing",
      "Executive crisis management",
      "Annual strategic legal audit",
    ],
    cta: "Request Proposal",
    highlight: false,
    badge: null,
  },
]

export default function LexBridgeLegalTech() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const heroY = useTransform(scrollYProgress, [0, 0.4], [0, 100])

  const [selectedPractice, setSelectedPractice] = useState<string | null>(null)
  const [selectedAttorney, setSelectedAttorney] = useState<typeof ATTORNEYS[0] | null>(null)
  const [contactOpen, setContactOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const practice = PRACTICE_AREAS.find(p => p.id === selectedPractice)

  return (
    <div ref={containerRef} style={{ overflowX: "hidden", scrollBehavior: "smooth" }} className="bg-white text-slate-900 min-h-screen font-sans">

      {/* ── NAVBAR ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 bg-slate-900 rounded flex items-center justify-center">
              <Scale className="w-4 h-4 text-amber-400" />
            </div>
            <span className="text-xl font-black tracking-tight text-slate-900">Lex<span className="text-amber-600">Bridge</span></span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {["Practice Areas", "Our Attorneys", "Insights", "About", "Contact"].map(item => (
              <Link key={item} href="#" className="cursor-pointer text-sm font-semibold text-slate-600 hover:text-slate-900 transition-all duration-200">{item}</Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a href="tel:+12125550149" className="cursor-pointer flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-slate-900 transition-all duration-200 px-3 py-2">
              <Phone className="w-4 h-4" />(212) 555-0149
            </a>
            <button onClick={() => setContactOpen(true)} className="cursor-pointer bg-slate-900 text-white text-sm font-black px-5 py-2.5 rounded-lg hover:bg-amber-600 transition-all duration-200">
              Request Consultation
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
                {["Practice Areas", "Our Attorneys", "Insights", "About", "Contact"].map(item => (
                  <Link key={item} href="#" className="cursor-pointer text-lg font-bold text-slate-800 hover:text-amber-600 transition-colors duration-200">{item}</Link>
                ))}
                <button onClick={() => setContactOpen(true)} className="cursor-pointer bg-slate-900 text-white font-black py-3 rounded-lg hover:bg-amber-600 transition-all duration-200">
                  Request Consultation
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80"
            alt="LexBridge Law Firm"
            fill className="object-cover" priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/92 via-slate-900/70 to-slate-900/30" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-32">
          <div className="max-w-2xl">
            <Reveal delay={0}>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-0.5 bg-amber-400" />
                <span className="text-amber-400 text-xs font-black uppercase tracking-widest">Established 1987 · New York · London · Singapore</span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-6 tracking-tight">
                Counsel That<br />
                <span className="text-amber-400">Holds Up</span><br />
                Under Pressure.
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-xl text-slate-200 mb-10 leading-relaxed font-light max-w-lg">
                LexBridge delivers senior-level legal counsel across M&A, complex litigation, employment, and regulatory matters. When the stakes are high, our clients don't compromise on their legal team.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button onClick={() => setContactOpen(true)} className="cursor-pointer bg-amber-500 text-slate-900 font-black px-8 py-4 rounded-xl hover:bg-amber-400 transition-all duration-200 text-lg shadow-xl flex items-center gap-2 justify-center">
                  <Calendar className="w-5 h-5" /> Schedule a Consultation
                </button>
                <Link href="#" className="cursor-pointer border border-white/30 text-white font-bold px-8 py-4 rounded-xl hover:bg-white/10 hover:border-white/50 transition-all duration-200 text-lg flex items-center gap-2 justify-center">
                  <BookOpen className="w-5 h-5" /> Our Practice Areas
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="grid grid-cols-3 gap-6">
                {[
                  { value: "37", label: "Years of Practice" },
                  { value: "94%", label: "Litigation Win Rate" },
                  { value: "$18B+", label: "Transactions Advised" },
                ].map(stat => (
                  <div key={stat.label} className="border-l border-amber-400/30 pl-4">
                    <p className="text-2xl font-black text-amber-400 mb-0.5">{stat.value}</p>
                    <p className="text-slate-300 text-xs font-semibold">{stat.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="py-14 px-6 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
            {[
              { label: "Active Client Relationships", value: 840, suffix: "+" },
              { label: "Attorneys & Specialists", value: 120, suffix: "+" },
              { label: "Countries with Coverage", value: 54, suffix: "" },
              { label: "Deals Closed — Avg Annual", value: 340, suffix: "+" },
              { label: "Client Retention Rate", value: 96, suffix: "%" },
            ].map((stat, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="cursor-default">
                  <div className="text-3xl md:text-4xl font-black text-amber-400 mb-1">
                    <Counter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRACTICE AREAS ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-4">
              <div>
                <Badge className="bg-amber-100 text-amber-700 border-amber-200 mb-3 cursor-default">Practice Areas</Badge>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                  Senior Counsel Across<br /><span className="text-amber-600">Every Critical Matter</span>
                </h2>
              </div>
              <p className="text-slate-500 max-w-sm leading-relaxed text-sm">Deep expertise across the legal challenges that define your business — handled by named partners, not associates.</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {PRACTICE_AREAS.map((area, idx) => {
              const Icon = area.icon
              return (
                <Reveal key={area.id} delay={idx * 0.1}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    onClick={() => setSelectedPractice(area.id)}
                    className="cursor-pointer group bg-slate-50 border border-slate-200 rounded-2xl p-8 hover:border-amber-300 hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-300 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
                    <div className="relative z-10">
                      <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-amber-500 transition-all duration-300">
                        <Icon className="w-7 h-7 text-amber-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <h3 className="text-xl font-black text-slate-900 mb-2">{area.name}</h3>
                      <p className="text-amber-600 text-sm font-bold italic mb-4">{area.tagline}</p>
                      <p className="text-slate-500 text-sm leading-relaxed mb-6">{area.description}</p>
                      <div className="grid grid-cols-3 gap-3 mb-6">
                        {Object.entries(area.stats).map(([key, val]) => (
                          <div key={key} className="text-center">
                            <p className="text-lg font-black text-slate-900">{val}</p>
                            <p className="text-xs text-slate-400 capitalize font-semibold">{key}</p>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 text-amber-600 font-bold text-sm group-hover:gap-3 transition-all duration-200">
                        <span>View Practice Details</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </motion.div>
                </Reveal>
              )
            })}
          </div>

          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["Real Estate & Finance", "Tax Advisory", "Intellectual Property", "Private Client & Trusts"].map((area, i) => (
                <Link key={area} href="#" className="cursor-pointer flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-amber-200 hover:bg-amber-50 transition-all duration-200 group">
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-500 transition-colors duration-200" />
                  <span className="text-slate-700 text-sm font-semibold group-hover:text-amber-700 transition-colors duration-200">{area}</span>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FEATURES TABS ── */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <Badge className="bg-slate-200 text-slate-700 border-slate-300 mb-4 cursor-default">The LexBridge Difference</Badge>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
                What Separates LexBridge<br /><span className="text-amber-600">from Every Other Firm</span>
              </h2>
            </div>
          </Reveal>

          <Tabs defaultValue="approach" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 max-w-2xl mx-auto mb-14 bg-white border border-slate-200 p-1 rounded-xl shadow-sm">
              {["approach", "technology", "global", "clients"].map(tab => (
                <TabsTrigger key={tab} value={tab} className="cursor-pointer rounded-lg font-bold capitalize transition-all duration-200 data-[state=active]:bg-slate-900 data-[state=active]:text-white text-slate-500">
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="approach">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <Reveal>
                  <div className="space-y-6">
                    <h3 className="text-3xl font-black text-slate-900">Partners Lead. Partners Deliver.</h3>
                    <p className="text-slate-500 leading-relaxed">At LexBridge, the attorney who pitches your matter is the attorney who runs it. We don't use senior partners as rainmakers and hand work to associates. Every client relationship is owned by a named partner who is personally accountable for quality, speed, and outcomes.</p>
                    {[
                      { title: "Senior-Weighted Staffing", desc: "70% of matter work performed by attorneys with 10+ years experience. Our senior-to-junior ratio is 3:1, versus an industry average of 1:4." },
                      { title: "Fixed-Fee Predictability", desc: "We offer fixed-fee or capped-fee engagements for all transactional matters. No surprise invoices. Budget certainty before you commit to a transaction." },
                      { title: "48-Hour Onboarding", desc: "New engagement matters are fully activated within 48 hours of engagement letter execution. Our client portal, document room, and team introduction are ready from day one." },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4 p-5 bg-white rounded-xl border border-slate-200 hover:border-amber-200 transition-all duration-200 cursor-pointer group">
                        <div className="w-2 bg-amber-400 rounded-full flex-shrink-0 group-hover:bg-amber-500 transition-colors duration-200" />
                        <div>
                          <h4 className="font-black text-slate-900 mb-1">{item.title}</h4>
                          <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Reveal>
                <Reveal delay={0.2}>
                  <div className="relative h-[480px] rounded-2xl overflow-hidden shadow-2xl">
                    <Image src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80" alt="Legal Approach" fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="bg-white rounded-xl p-5 shadow-xl">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-slate-400 font-black uppercase tracking-widest mb-1">Partner-Led Hours</p>
                            <p className="text-2xl font-black text-slate-900">72%</p>
                            <Progress value={72} className="mt-2 h-1.5" />
                          </div>
                          <div>
                            <p className="text-xs text-slate-400 font-black uppercase tracking-widest mb-1">Fixed-Fee Clients</p>
                            <p className="text-2xl font-black text-slate-900">68%</p>
                            <Progress value={68} className="mt-2 h-1.5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </TabsContent>

            <TabsContent value="technology">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: Search, title: "LexIQ Document Review", desc: "Our proprietary AI-powered document review platform processes millions of pages 60% faster than standard review — with 99.2% accuracy on issue-coding. Used in every M&A and litigation matter above $5M.", items: ["60% faster review vs. linear human review", "Issue-coding accuracy: 99.2%", "Privilege detection with zero attorney waiver risk"] },
                  { icon: FileText, title: "Contract Intelligence Suite", desc: "Automated contract analysis, redlining, and deviation flagging across all major agreement types. Our NLP engine understands jurisdiction-specific market terms and flags non-standard provisions instantly.", items: ["Market standard deviation flagging", "Cross-portfolio obligation tracking", "Renewal & expiration auto-alert system"] },
                  { icon: Globe, title: "Client Matter Portal", desc: "Real-time matter tracking, document sharing, billing transparency, and secure attorney communication — all in one client dashboard. No more chasing status updates by email.", items: ["Real-time matter milestones & status", "Itemized invoice transparency portal", "256-bit encrypted document vault"] },
                ].map((f, i) => {
                  const Icon = f.icon
                  return (
                    <Reveal key={i} delay={i * 0.1}>
                      <Card className="cursor-pointer border-slate-200 hover:border-amber-300 hover:shadow-lg transition-all duration-300 h-full bg-white">
                        <CardContent className="p-7">
                          <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-5">
                            <Icon className="w-6 h-6 text-amber-600" />
                          </div>
                          <h3 className="text-xl font-black text-slate-900 mb-3">{f.title}</h3>
                          <p className="text-slate-500 text-sm leading-relaxed mb-5">{f.desc}</p>
                          <ul className="space-y-2">
                            {f.items.map(item => (
                              <li key={item} className="flex items-start gap-2 text-xs text-slate-500 font-semibold">
                                <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 mt-0.5 flex-shrink-0" />{item}
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

            <TabsContent value="global">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <Reveal delay={0.1}>
                  <div className="relative h-[480px] rounded-2xl overflow-hidden shadow-2xl">
                    <Image src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80" alt="Global" fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-slate-900/20" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { city: "New York", since: "HQ since 1987" },
                          { city: "London", since: "Office since 1999" },
                          { city: "Singapore", since: "Office since 2008" },
                          { city: "Dubai", since: "Office since 2015" },
                        ].map(office => (
                          <div key={office.city} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3">
                            <p className="text-white font-black text-sm">{office.city}</p>
                            <p className="text-white/60 text-xs">{office.since}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
                <Reveal>
                  <div className="space-y-5">
                    <h3 className="text-3xl font-black text-slate-900">Cross-Border Fluency Without Cross-Border Complexity</h3>
                    <p className="text-slate-500 leading-relaxed">Managing multi-jurisdictional legal matters shouldn't require coordinating six different firms across six time zones. LexBridge's integrated global platform delivers consistent quality, unified billing, and single-partner accountability across all 54 countries we cover.</p>
                    {[
                      { label: "Own Offices", value: "4 Continents, 8 Cities" },
                      { label: "Affiliated Network", value: "54 Jurisdictions" },
                      { label: "Languages Served", value: "18+ Languages" },
                      { label: "Cross-Border Deals (2025)", value: "180+ Transactions" },
                      { label: "Dual-Qualified Attorneys", value: "38 Attorneys" },
                    ].map(stat => (
                      <div key={stat.label} className="flex justify-between items-center py-3 border-b border-slate-100">
                        <span className="text-slate-600 font-semibold text-sm">{stat.label}</span>
                        <span className="text-slate-900 font-black text-sm">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>
            </TabsContent>

            <TabsContent value="clients">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                <Reveal>
                  <div className="space-y-4">
                    <h3 className="text-3xl font-black text-slate-900 mb-6">Our Clients Expect Excellence. We Deliver It.</h3>
                    {[
                      { sector: "Private Equity & Venture Capital", desc: "Fund formation, portfolio company counsel, deal execution, and exit transactions. We serve 80+ PE and VC sponsors." },
                      { sector: "Public Companies & Boards", desc: "Securities compliance, corporate governance, executive compensation, and SEC reporting. 45+ public company clients." },
                      { sector: "Financial Institutions", desc: "Regulatory compliance, enforcement defense, lending transactions, and structured products across banking and asset management." },
                      { sector: "Technology & Life Sciences", desc: "IP licensing, FDA regulatory strategy, M&A, and employment matters for high-growth tech and biotech companies." },
                    ].map((item, i) => (
                      <div key={i} className="cursor-pointer flex gap-4 p-5 bg-slate-50 rounded-xl border border-slate-200 hover:border-amber-200 hover:bg-amber-50 transition-all duration-200">
                        <div className="w-2 h-2 mt-2 bg-amber-400 rounded-full flex-shrink-0" />
                        <div>
                          <h4 className="font-black text-slate-900 mb-1">{item.sector}</h4>
                          <p className="text-slate-500 text-sm">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Reveal>
                <Reveal delay={0.2}>
                  <div className="bg-slate-900 rounded-2xl p-8">
                    <h4 className="text-white font-black text-xl mb-6">Client Satisfaction Metrics</h4>
                    {[
                      { label: "Overall Satisfaction", pct: 97 },
                      { label: "Partner Accessibility", pct: 96 },
                      { label: "Matter Outcomes", pct: 94 },
                      { label: "Fee Predictability", pct: 91 },
                      { label: "Communication Quality", pct: 98 },
                    ].map(metric => (
                      <div key={metric.label} className="mb-5">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-slate-300 font-semibold">{metric.label}</span>
                          <span className="text-amber-400 font-black">{metric.pct}%</span>
                        </div>
                        <Progress value={metric.pct} className="h-2 bg-slate-700" />
                      </div>
                    ))}
                    <p className="text-slate-500 text-xs mt-4">Based on 2025 annual client satisfaction survey, n=640 respondents</p>
                  </div>
                </Reveal>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* ── ATTORNEYS ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <Badge className="bg-amber-100 text-amber-700 border-amber-200 mb-4 cursor-default">Our Attorneys</Badge>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
                Proven at the Highest Stakes.
              </h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ATTORNEYS.map((attorney, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  onClick={() => setSelectedAttorney(attorney)}
                  className="cursor-pointer group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-amber-300 hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-56 overflow-hidden bg-slate-100">
                    <Image src={attorney.img} alt={attorney.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <Badge className="bg-amber-500 text-slate-900 border-0 text-xs font-black cursor-default">{attorney.practice}</Badge>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-black text-slate-900 mb-0.5">{attorney.name}</h3>
                    <p className="text-amber-600 text-sm font-bold mb-3">{attorney.title}</p>
                    <p className="text-slate-500 text-xs leading-relaxed mb-4 line-clamp-3">{attorney.bio}</p>
                    <div className="flex items-center gap-2 text-amber-600 text-xs font-bold group-hover:gap-3 transition-all duration-200">
                      <span>View Profile</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 px-6 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <Badge className="bg-amber-500/20 border-amber-500/40 text-amber-400 mb-4 cursor-default">Client Testimonials</Badge>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                In Their Own Words.
              </h2>
            </div>
          </Reveal>
          <Carousel className="w-full">
            <CarouselContent className="-ml-4">
              {TESTIMONIALS.map((t, idx) => (
                <CarouselItem key={idx} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <Reveal delay={idx * 0.07}>
                    <Card className="cursor-pointer bg-slate-800 border-slate-700 hover:border-amber-500/50 transition-all duration-300 h-full">
                      <CardContent className="p-7">
                        <div className="flex gap-0.5 mb-4">
                          {Array(t.rating).fill(0).map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                        </div>
                        <p className="text-slate-200 text-sm leading-relaxed mb-5 italic">"{t.quote}"</p>
                        <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2 mb-5">
                          <p className="text-amber-400 text-xs font-black">{t.matter}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10 ring-2 ring-amber-500/30">
                            <AvatarImage src={t.img} />
                            <AvatarFallback className="bg-amber-500 text-slate-900 font-black text-xs">{t.name.split(" ").map(n => n[0]).join("").slice(0, 2)}</AvatarFallback>
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
            <CarouselPrevious className="cursor-pointer border-slate-600 text-white hover:bg-slate-700 transition-all duration-200" />
            <CarouselNext className="cursor-pointer border-slate-600 text-white hover:bg-slate-700 transition-all duration-200" />
          </Carousel>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <Badge className="bg-amber-100 text-amber-700 border-amber-200 mb-4 cursor-default">Engagement Models</Badge>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
                Predictable Counsel.<br /><span className="text-amber-600">Exceptional Outcomes.</span>
              </h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto font-light">All engagements begin with a complimentary 60-minute strategy consultation with a named partner.</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {PRICING_TIERS.map((tier, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className={`cursor-pointer relative h-full rounded-2xl border-2 p-8 flex flex-col transition-all duration-300 hover:shadow-2xl ${tier.highlight ? "border-amber-500 bg-slate-900 shadow-xl shadow-amber-500/10" : "border-slate-200 bg-white hover:border-amber-200"}`}>
                  {tier.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <Badge className="bg-amber-500 text-slate-900 border-0 px-4 py-1 text-xs font-black">{tier.badge}</Badge>
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
                        <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${tier.highlight ? "text-amber-400" : "text-amber-500"}`} />
                        <span className={`text-sm font-medium ${tier.highlight ? "text-slate-300" : "text-slate-600"}`}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => setContactOpen(true)} className={`cursor-pointer w-full py-3 rounded-xl font-black text-sm transition-all duration-200 ${tier.highlight ? "bg-amber-500 text-slate-900 hover:bg-amber-400" : "bg-slate-900 text-white hover:bg-amber-500 hover:text-slate-900"}`}>
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
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">Questions Clients Ask Before Engaging</h2>
            </div>
          </Reveal>
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((faq, idx) => (
              <Reveal key={idx} delay={idx * 0.04}>
                <AccordionItem value={`faq-${idx}`} className="cursor-pointer bg-white border border-slate-200 rounded-xl px-6 hover:border-amber-300 transition-all duration-200">
                  <AccordionTrigger className="cursor-pointer hover:text-amber-600 font-bold text-slate-900 py-5 text-left transition-colors duration-200">
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
      <section className="py-24 px-6 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image src="https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?w=800&q=80" alt="Background" fill className="object-cover" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <Reveal>
            <div className="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-amber-500/20">
              <Scale className="w-7 h-7 text-amber-400" />
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
              Your Matter Deserves<br />
              <span className="text-amber-400">Senior Counsel from Day One.</span>
            </h2>
            <p className="text-slate-300 text-xl mb-10 font-light max-w-2xl mx-auto">
              Schedule a confidential 60-minute consultation with a named LexBridge partner. No junior associates, no boilerplate — just direct, strategic legal guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => setContactOpen(true)} className="cursor-pointer bg-amber-500 text-slate-900 font-black px-10 py-4 rounded-xl hover:bg-amber-400 transition-all duration-200 text-lg shadow-xl">
                <Calendar className="w-5 h-5 inline mr-2" />Schedule Consultation
              </button>
              <a href="tel:+12125550149" className="cursor-pointer border border-slate-600 text-slate-200 font-bold px-10 py-4 rounded-xl hover:border-amber-500 hover:text-amber-400 transition-all duration-200 text-lg flex items-center justify-center gap-2">
                <Phone className="w-5 h-5" />(212) 555-0149
              </a>
            </div>
            <p className="text-slate-500 text-sm mt-8">All initial consultations are fully confidential and subject to attorney-client privilege.</p>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#040810] border-t border-slate-800 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 bg-slate-800 rounded flex items-center justify-center border border-amber-500/20">
                  <Scale className="w-4 h-4 text-amber-400" />
                </div>
                <span className="text-xl font-black text-white">Lex<span className="text-amber-400">Bridge</span></span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 max-w-xs">
                Senior-led legal counsel across M&A, litigation, employment, and regulatory matters. Est. 1987. New York · London · Singapore · Dubai.
              </p>
              <div className="flex gap-3">
                {[Globe, Globe, Globe].map((Icon, i) => (
                  <a key={i} href="#" className="cursor-pointer w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-amber-500/20 border border-transparent hover:border-amber-500/30 transition-all duration-200">
                    <Icon className="w-4 h-4 text-slate-400" />
                  </a>
                ))}
              </div>
            </div>
            {[
              { title: "Practice Areas", links: ["Corporate & M&A", "Complex Litigation", "Employment", "Real Estate", "Tax Advisory"] },
              { title: "About", links: ["Our History", "Our Attorneys", "Alumni Network", "Pro Bono", "Careers"] },
              { title: "Contact", links: ["New York HQ", "London Office", "Singapore Office", "Dubai Office", "Emergency Line"] },
            ].map(col => (
              <div key={col.title}>
                <h4 className="text-slate-300 font-black text-sm uppercase tracking-widest mb-5">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map(link => (
                    <li key={link}><Link href="#" className="cursor-pointer text-slate-500 text-sm hover:text-amber-400 transition-colors duration-200 font-medium">{link}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Separator className="bg-slate-800 mb-8" />
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
              <p className="text-slate-600 text-sm mb-2">© 2026 LexBridge LLP. All rights reserved. Attorney advertising.</p>
              <p className="text-slate-700 text-xs max-w-lg">Prior results do not guarantee a similar outcome. This website is for informational purposes only and does not constitute legal advice or create an attorney-client relationship.</p>
            </div>
            <div className="flex gap-6 flex-shrink-0">
              {["Privacy Policy", "Terms", "Disclaimer"].map(link => (
                <Link key={link} href="#" className="cursor-pointer text-slate-600 text-sm hover:text-slate-300 transition-colors duration-200">{link}</Link>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ── PRACTICE AREA DIALOG ── */}
      <Dialog open={!!selectedPractice} onOpenChange={o => !o && setSelectedPractice(null)}>
        <DialogContent className="bg-white max-w-2xl">
          {practice && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-black text-slate-900">{practice.name}</DialogTitle>
              </DialogHeader>
              <p className="text-amber-600 font-bold italic mb-4">{practice.tagline}</p>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">{practice.description}</p>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {Object.entries(practice.stats).map(([key, val]) => (
                  <div key={key} className="bg-slate-50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-black text-slate-900 mb-1">{val}</p>
                    <p className="text-xs text-slate-400 font-black uppercase tracking-widest capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                  </div>
                ))}
              </div>
              <div className="mb-6">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Representative Matters</p>
                <ul className="space-y-2">
                  {practice.matters.map(m => (
                    <li key={m} className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0" />{m}
                    </li>
                  ))}
                </ul>
              </div>
              <button onClick={() => { setSelectedPractice(null); setContactOpen(true) }} className="cursor-pointer w-full bg-slate-900 text-white font-black py-3 rounded-xl hover:bg-amber-500 hover:text-slate-900 transition-all duration-200">
                Discuss a {practice.name} Matter
              </button>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* ── ATTORNEY DIALOG ── */}
      <Dialog open={!!selectedAttorney} onOpenChange={o => !o && setSelectedAttorney(null)}>
        <DialogContent className="bg-white max-w-lg">
          {selectedAttorney && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-black text-slate-900">{selectedAttorney.name}</DialogTitle>
              </DialogHeader>
              <div className="flex gap-4 mb-5">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                  <Image src={selectedAttorney.img} alt={selectedAttorney.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="text-amber-600 font-bold">{selectedAttorney.title}</p>
                  <p className="text-slate-500 text-sm">{selectedAttorney.practice}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {selectedAttorney.bar.map(b => <Badge key={b} className="bg-slate-100 text-slate-600 border-slate-200 text-xs cursor-default">{b}</Badge>)}
                  </div>
                </div>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mb-5">{selectedAttorney.bio}</p>
              <div className="mb-5">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Select Matters</p>
                <ul className="space-y-2">
                  {selectedAttorney.matters.map(m => (
                    <li key={m} className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                      <Briefcase className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />{m}
                    </li>
                  ))}
                </ul>
              </div>
              <button onClick={() => { setSelectedAttorney(null); setContactOpen(true) }} className="cursor-pointer w-full bg-slate-900 text-white font-black py-3 rounded-xl hover:bg-amber-500 hover:text-slate-900 transition-all duration-200">
                Request a Consultation
              </button>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* ── CONTACT DIALOG ── */}
      <Dialog open={contactOpen} onOpenChange={setContactOpen}>
        <DialogContent className="bg-white max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-slate-900">Request a Consultation</DialogTitle>
          </DialogHeader>
          <p className="text-slate-500 text-sm mb-6">All consultations are confidential. A senior partner will respond within 4 business hours.</p>
          <form className="space-y-4" onSubmit={e => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1 block">First Name</label>
                <input className="cursor-text w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-amber-400 transition-colors duration-200" placeholder="Robert" />
              </div>
              <div>
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1 block">Last Name</label>
                <input className="cursor-text w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-amber-400 transition-colors duration-200" placeholder="Kessler" />
              </div>
            </div>
            <div>
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1 block">Email</label>
              <input type="email" className="cursor-text w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-amber-400 transition-colors duration-200" placeholder="robert@meridiancp.com" />
            </div>
            <div>
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1 block">Company / Organization</label>
              <input className="cursor-text w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-amber-400 transition-colors duration-200" placeholder="Meridian Capital Partners" />
            </div>
            <div>
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1 block">Practice Area of Interest</label>
              <select className="cursor-pointer w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-amber-400 transition-colors duration-200 bg-white">
                <option>Corporate & M&A</option>
                <option>Complex Litigation</option>
                <option>Employment & HR</option>
                <option>Real Estate & Finance</option>
                <option>Tax Advisory</option>
                <option>General / Multiple Areas</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1 block">Describe Your Matter (Confidential)</label>
              <textarea rows={4} className="cursor-text w-full px-4 py-3 border border-slate-200 rounded-xl text-sm outline-none focus:border-amber-400 transition-colors duration-200 resize-none" placeholder="Brief description of the matter, timeline, and any urgency…" />
            </div>
            <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-xl border border-amber-200">
              <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-amber-700 text-xs font-medium">This form does not create an attorney-client relationship. Submitting does not constitute legal advice.</p>
            </div>
            <button type="submit" className="cursor-pointer w-full bg-slate-900 text-white font-black py-4 rounded-xl hover:bg-amber-500 hover:text-slate-900 transition-all duration-200">
              Submit Consultation Request
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
