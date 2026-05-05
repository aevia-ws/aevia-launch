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
import { Code2, Zap, Shield, Globe, Terminal, GitBranch, Layers, Lock, ArrowRight, Menu, Check, Star, ChevronRight, Mail, Phone, MapPin, Activity, Clock, BookOpen, Package, Cpu, RefreshCw, BarChart3, Key, Server, Database, AlertTriangle, Copy } from "lucide-react"

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
  { value: "99.99%", label: "API Uptime SLA", icon: <Activity className="w-5 h-5" /> },
  { value: "18ms", label: "P99 Latency", icon: <Zap className="w-5 h-5" /> },
  { value: "4.2B+", label: "API Calls / Month", icon: <BarChart3 className="w-5 h-5" /> },
  { value: "190+", label: "Countries Served", icon: <Globe className="w-5 h-5" /> },
  { value: "42K+", label: "Developer Teams", icon: <Code2 className="w-5 h-5" /> },
  { value: "SOC 2", label: "Type II Certified", icon: <Shield className="w-5 h-5" /> },
]

const CODE_SNIPPETS = {
  node: `import Forge from "@forgeapi/sdk";

const forge = new Forge({
  apiKey: process.env.FORGE_API_KEY,
});

// Send a message in < 3 lines
const result = await forge.messages.send({
  to: "+1 415 555 0142",
  body: "Your order #4821 has shipped!",
  channel: "whatsapp",
});

console.log(result.messageId);
// → msg_01JK8P3R5X7YZ`,

  python: `import forge

client = forge.Client(
  api_key=os.environ["FORGE_API_KEY"]
)

# Verify a phone number
result = client.verify.send(
  phone_number="+44 20 7946 0321",
  channel="sms",
  locale="en-GB"
)

print(result.verification_id)
# → ver_09XK2M5T8QWL`,

  curl: `curl -X POST https://api.forgeapi.dev/v2/messages \\
  -H "Authorization: Bearer $FORGE_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "+1 415 555 0142",
    "body": "Hello from Forge!",
    "channel": "sms",
    "idempotency_key": "order_4821_notification"
  }'`,
}

const FEATURES_TABS = [
  {
    value: "messaging",
    label: "Messaging API",
    icon: <Package className="w-5 h-5" />,
    title: "One API. Every Messaging Channel. Global Reach.",
    description: "ForgeAPI unifies SMS, WhatsApp, Voice, Email, and Push Notifications under a single, consistent API surface. Swap channels without changing your integration. Deliver to 190 countries with a single API call.",
    items: [
      "Unified API for SMS, WhatsApp, Voice, Email, and Push — one SDK, all channels",
      "Smart channel fallback: auto-retry via alternate channel if primary fails",
      "Global carrier network: 800+ carrier direct connects for maximum deliverability",
      "Number intelligence: HLR lookup, carrier detection, and porting history",
      "Two-way messaging with webhook delivery and 99.97% delivery rate SLA",
      "Idempotency keys on every endpoint — safe to retry without duplicate sends",
      "Real-time delivery receipts with carrier-level status codes",
    ],
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80",
  },
  {
    value: "auth",
    label: "Auth & Verify",
    icon: <Key className="w-5 h-5" />,
    title: "Drop-in User Verification That Converts, Not Frustrates",
    description: "ForgeVerify handles OTP delivery, validation, and fraud scoring in a single API call. Our adaptive routing selects the fastest, cheapest channel automatically — cutting verification time by 61% and fraud by 94%.",
    items: [
      "OTP via SMS, WhatsApp, Voice, or Silent SIM authentication",
      "AI fraud scoring: device fingerprint, velocity, and VPN/proxy detection",
      "Adaptive channel selection: picks the fastest + cheapest option per user",
      "PSD2-compliant strong customer authentication (SCA) flows",
      "10-second OTP delivery in Tier 1 markets (P95 benchmark)",
      "TOTP / HOTP support for authenticator app compatibility",
      "Global number format normalization — no E.164 headaches",
    ],
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
  },
  {
    value: "infrastructure",
    label: "Infrastructure",
    icon: <Server className="w-5 h-5" />,
    title: "Enterprise-Grade Infrastructure With Zero Operational Overhead",
    description: "ForgeAPI runs on redundant infrastructure across 12 global regions with automatic failover, rate-limit isolation per team, and a 99.99% uptime SLA backed by financial credits. We handle the infrastructure so you ship faster.",
    items: [
      "12-region active-active deployment with < 200ms cross-region failover",
      "P99 API response latency of 18ms globally (2025 average)",
      "Per-team rate limit isolation — a noisy neighbor never impacts your throughput",
      "Webhook delivery with automatic retry, exponential backoff, and dead-letter queue",
      "SOC 2 Type II, ISO 27001, PCI DSS Level 1, GDPR, HIPAA-eligible",
      "Dedicated egress IPs with IP allowlisting support for enterprise firewalls",
      "Real-time status page + PagerDuty and OpsGenie integrations out-of-the-box",
    ],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
  },
]

const TESTIMONIALS = [
  {
    name: "Alex Petrov",
    role: "Principal Engineer",
    company: "Stripe (fmr.) · Now at NovaPay",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    initials: "AP",
    rating: 5,
    quote: "I've evaluated every communications API vendor. ForgeAPI has the best DX by a wide margin — the SDK is idiomatic, the error messages are actually useful, the docs have real runnable examples, and the reliability numbers they publish are honest. P99 of 18ms is real, not marketing.",
  },
  {
    name: "Mei-Lin Zhang",
    role: "Head of Platform Engineering",
    company: "Luminary Health",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
    initials: "MZ",
    rating: 5,
    quote: "HIPAA compliance was non-negotiable for us. ForgeAPI had their BAA signed and full audit documentation delivered within 24 hours of our enterprise contract. We've sent 180M patient notifications without a single breach, downtime event, or missed delivery SLA in 14 months.",
  },
  {
    name: "Carlos Mendez",
    role: "Co-Founder & CTO",
    company: "Blink Checkout",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    initials: "CM",
    rating: 5,
    quote: "We migrated from Twilio to ForgeAPI in one weekend. Same SDK surface area, 40% lower cost, and the smart channel fallback saved us $120K in failed SMS charges in Q4 alone by automatically routing to WhatsApp when SMS delivery failed in certain markets.",
  },
  {
    name: "Priya Krishnan",
    role: "Engineering Manager",
    company: "Rapid Commerce",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1eb1df?w=200&q=80",
    initials: "PK",
    rating: 5,
    quote: "The webhook system is phenomenal. Dead-letter queues, automatic retry with backoff, and per-endpoint delivery SLAs. Our ops team used to wake up at 3am to handle webhook failures. That literally doesn't happen anymore. ForgeAPI is the Stripe of communications APIs.",
  },
  {
    name: "Daniel Osei",
    role: "Senior Backend Engineer",
    company: "FleetOps Africa",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80",
    initials: "DO",
    rating: 5,
    quote: "Delivering SMS to 14 African markets was a nightmare with other vendors — inconsistent latency, poor delivery rates, and terrible support. ForgeAPI has direct carrier connections across West Africa. Our OTP delivery rate went from 71% to 99.2% overnight.",
  },
]

const PRICING = [
  {
    name: "Developer",
    price: "Free",
    period: "",
    description: "For indie developers and startups exploring the ForgeAPI platform.",
    highlight: false,
    badge: null,
    included: "10,000 API calls / month",
    features: [
      "10,000 free API calls / month",
      "Full API access (all endpoints)",
      "SMS, Email, and Voice channels",
      "Developer dashboard + logs",
      "Community Discord support",
      "Standard webhook delivery",
      "5 webhook endpoints",
    ],
    cta: "Start Building Free",
  },
  {
    name: "Growth",
    price: "$149",
    period: "/month",
    description: "For production applications that need volume, reliability, and priority support.",
    highlight: true,
    badge: "Most Popular",
    included: "500K API calls included",
    features: [
      "500,000 API calls / month",
      "All messaging channels incl. WhatsApp",
      "Smart channel fallback",
      "Number intelligence (HLR lookup)",
      "99.9% uptime SLA (financially backed)",
      "Priority email support (4h SLA)",
      "50 webhook endpoints",
      "Dedicated egress IPs",
      "Idempotency + retry APIs",
    ],
    cta: "Start 14-Day Trial",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For organizations with high volume, compliance requirements, and dedicated support needs.",
    highlight: false,
    badge: "Enterprise",
    included: "Unlimited calls",
    features: [
      "Unlimited API calls + volume pricing",
      "99.99% uptime SLA (financially backed)",
      "Dedicated account engineer",
      "SOC 2, HIPAA BAA, PCI DSS",
      "Custom data residency (EU/US/APAC)",
      "Private Globe channel + on-call support",
      "SLA breach credits (automatic)",
      "On-premise deployment option",
    ],
    cta: "Talk to Sales",
  },
]

const FAQS = [
  {
    q: "How does ForgeAPI's pricing work after the free tier?",
    a: "The Developer plan includes 10,000 API calls per month at no cost — forever, no credit card required. Growth plans include 500,000 calls/month at $149, with additional calls billed at $0.25 per 1,000. SMS rates vary by country (starting at $0.0065 per SMS in the US). WhatsApp messaging is billed at Meta's published rates plus a $0.001 per-message platform fee. Volume discounts apply automatically from 10M calls/month.",
  },
  {
    q: "How does the 99.99% uptime SLA work in practice?",
    a: "We publish live uptime data at status.forgeapi.dev updated every 30 seconds. If monthly uptime falls below 99.99%, affected Growth and Enterprise customers receive automatic service credits — no ticket required. Credits are calculated as 10× the value of downtime minutes and applied to your next invoice. In 2025, we delivered 99.997% actual uptime across all regions.",
  },
  {
    q: "Can I switch from Twilio or Vonage without rewriting my integration?",
    a: "For most common use cases (SMS send, OTP verify, voice calls), migration takes under a day. Our compatibility layer supports Twilio's TwiML format, and our migration guide includes side-by-side API mapping with code examples in Node, Python, Ruby, Java, Go, and PHP. We offer free white-glove migration support for accounts spending $1K+/month on Twilio.",
  },
  {
    q: "What compliance certifications does ForgeAPI hold?",
    a: "ForgeAPI holds SOC 2 Type II, ISO 27001, and PCI DSS Level 1 certifications. For healthcare customers, we offer a HIPAA-eligible environment with a signed BAA included in Enterprise plans. For EU customers, we operate a dedicated EU-residency deployment in Frankfurt with no data transfer outside the EEA. Our full compliance documentation is available at forgeapi.dev/security.",
  },
  {
    q: "How does smart channel fallback work?",
    a: "When you send a message, you specify a channel priority list (e.g., ['whatsapp', 'sms']). If delivery on the primary channel fails after 3 attempts (or within a configurable timeout), ForgeAPI automatically retries on the next channel in your priority list using the same message body and idempotency key. You receive a single webhook notification with the final delivery status and the channel that succeeded. No additional code required.",
  },
  {
    q: "What SDKs and languages does ForgeAPI support?",
    a: "Official SDKs for Node.js, Python, Ruby, Java, Go, PHP, and .NET — all maintained by the ForgeAPI engineering team and published on npm, PyPI, RubyGems, Maven, pkg.go.dev, Packagist, and NuGet. Our SDKs are open-source (MIT license), fully typed with TypeScript / type stubs, and include OpenAPI-generated client code that matches our API spec exactly. Community SDKs exist for Rust, Elixir, Swift, and Kotlin.",
  },
  {
    q: "How are API keys and secrets managed securely?",
    a: "API keys are issued per-environment (test and live) and scoped by permission set (read, write, admin). Keys can be rotated without downtime using our key versioning system — the old key remains valid for a configurable overlap period. We support webhook signing secrets (HMAC-SHA256), IP allowlisting, and OAuth 2.0 for enterprise SSO environments. All key material is encrypted at rest using AES-256 and never stored in plaintext.",
  },
]

export default function ForgeAPIDevTools() {
  const [activeTab, setActiveTab] = useState<keyof typeof CODE_SNIPPETS>("node")
  const [copied, setCopied] = useState(false)
  const [demoOpen, setDemoOpen] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const yHero = useTransform(scrollYProgress, [0, 0.4], ["0%", "12%"])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 40, damping: 25 })
  const springY = useSpring(mouseY, { stiffness: 40, damping: 25 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX - window.innerWidth / 2) * 0.01)
      mouseY.set((e.clientY - window.innerHeight / 2) * 0.01)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  const handleCopy = () => {
    navigator.clipboard.writeText(CODE_SNIPPETS[activeTab])
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

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
        className="fixed top-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
              <Terminal className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Forge<span className="text-orange-400">API</span></span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {["Docs", "APIs", "SDKs", "Pricing", "Status", "Blog"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-sm font-medium text-slate-400 hover:text-white transition-all duration-150 cursor-pointer"
              >
                {item}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="#" className="hidden sm:block text-sm font-medium text-slate-400 hover:text-white transition-all duration-150 cursor-pointer">
              Sign In
            </Link>
            <button
              onClick={() => setDemoOpen(true)}
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-orange-500/30 hover:shadow-lg cursor-pointer"
            >
              Start Building Free
            </button>
            <Sheet>
              <SheetTrigger asChild>
                <button className="lg:hidden p-2 rounded-md hover:bg-slate-800 transition-all duration-150 cursor-pointer">
                  <Menu className="w-5 h-5 text-slate-400" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 bg-slate-950 border-slate-800">
                <div className="flex flex-col gap-6 mt-8">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                      <Terminal className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg font-bold text-white">ForgeAPI</span>
                  </div>
                  {["Docs", "APIs", "SDKs", "Pricing", "Status", "Blog", "Sign In"].map((item) => (
                    <Link key={item} href="#" className="text-base font-medium text-slate-300 hover:text-orange-400 transition-all duration-150 cursor-pointer">
                      {item}
                    </Link>
                  ))}
                  <button
                    onClick={() => setDemoOpen(true)}
                    className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 rounded-full font-semibold hover:opacity-90 transition-all duration-200 cursor-pointer"
                  >
                    Start Building Free
                  </button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.header>

      {/* GET STARTED DIALOG */}
      <Dialog open={demoOpen} onOpenChange={setDemoOpen}>
        <DialogContent className="max-w-md bg-slate-950 border-slate-800">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">Create Your Free Account</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <p className="text-sm text-slate-400">Get 10,000 free API calls every month. No credit card. API key in 30 seconds.</p>
            {[
              { label: "Work Email", placeholder: "dev@yourcompany.com", type: "email" },
              { label: "Password", placeholder: "Min. 12 characters", type: "password" },
              { label: "Company / Project Name", placeholder: "Acme Corp", type: "text" },
            ].map((field) => (
              <div key={field.label} className="space-y-1">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{field.label}</label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl focus:border-orange-500 outline-none text-sm text-white placeholder:text-slate-600 transition-all duration-200"
                />
              </div>
            ))}
            <button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:opacity-90 text-white py-4 rounded-xl font-bold text-base transition-all duration-200 cursor-pointer flex items-center justify-center gap-2">
              <Key className="w-5 h-5" /> Get My API Key →
            </button>
            <div className="flex gap-4">
              <button className="flex-1 bg-slate-900 border border-slate-700 hover:border-slate-500 text-white py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer">
                <Globe className="w-4 h-4" /> GitHub
              </button>
              <button className="flex-1 bg-slate-900 border border-slate-700 hover:border-slate-500 text-white py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer">
                <Globe className="w-4 h-4" /> Google
              </button>
            </div>
            <p className="text-xs text-slate-600 text-center">By signing up, you agree to our Terms of Service and Privacy Policy.</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16 bg-slate-950">
        <motion.div style={{ y: yHero }} className="absolute inset-0 z-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80"
            alt="Code"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950" />

        {/* Glow */}
        <motion.div
          style={{ x: springX, y: springY }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-orange-600/10 blur-[120px] pointer-events-none"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Copy */}
            <div>
              <Reveal>
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 px-3 py-1 text-xs font-semibold font-mono">
                    v2.8.0 · Now GA
                  </Badge>
                  <Badge className="bg-white/5 text-slate-400 border-slate-700 px-3 py-1 text-xs font-semibold">
                    G2 Leader · CPaaS · 2025
                  </Badge>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <h1 className="text-5xl sm:text-6xl font-extrabold text-white leading-tight mb-6">
                  The{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                    Communications API
                  </span>{" "}
                  That Doesn't Let You Down.
                </h1>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="text-xl text-slate-400 leading-relaxed mb-10">
                  SMS, WhatsApp, Voice, Email, and OTP verification — unified under one API with P99 latency of 18ms, 99.99% SLA, and developer experience engineers actually respect.
                </p>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="flex flex-wrap gap-4 mb-10">
                  <button
                    onClick={() => setDemoOpen(true)}
                    className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 text-white px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2 transition-all duration-200 shadow-xl hover:shadow-orange-500/30 cursor-pointer"
                  >
                    Start Building Free <ArrowRight className="w-5 h-5" />
                  </button>
                  <Link
                    href="#"
                    className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2 transition-all duration-200 cursor-pointer"
                  >
                    <BookOpen className="w-5 h-5 text-orange-400" /> Read the Docs
                  </Link>
                </div>
              </Reveal>

              <Reveal delay={0.4}>
                <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                  {[
                    "10K free calls/month · forever",
                    "No credit card required",
                    "API key in 30 seconds",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-orange-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Right: Code window */}
            <Reveal delay={0.2}>
              <div className="bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden">
                {/* Window chrome */}
                <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="flex gap-1 bg-slate-900 rounded-lg p-1">
                    {(["node", "python", "curl"] as const).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setActiveTab(lang)}
                        className={`px-3 py-1 rounded-md text-xs font-mono font-semibold transition-all duration-150 cursor-pointer ${
                          activeTab === lang
                            ? "bg-orange-500 text-white"
                            : "text-slate-500 hover:text-slate-300"
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-all duration-150 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  <motion.pre
                    key={activeTab}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="p-6 text-sm font-mono text-slate-300 leading-relaxed overflow-x-auto whitespace-pre"
                  >
                    <code>{CODE_SNIPPETS[activeTab]}</code>
                  </motion.pre>
                </AnimatePresence>

                <div className="px-6 py-4 bg-slate-950/50 border-t border-slate-800 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs text-slate-500 font-mono">Response: 200 OK · 14ms · delivered to carrier</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-gradient-to-r from-orange-600 to-red-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {STATS.map((stat, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="text-center text-white">
                  <div className="flex justify-center mb-2 text-orange-200">{stat.icon}</div>
                  <div className="text-3xl font-extrabold mb-1 font-mono">{stat.value}</div>
                  <div className="text-sm text-orange-100 font-medium">{stat.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* INTEGRATIONS LOGOS */}
      <section className="py-16 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-center text-slate-500 text-sm font-medium uppercase tracking-widest mb-10">
              Trusted by engineering teams at
            </p>
          </Reveal>
          <div className="flex flex-wrap justify-center gap-8 items-center opacity-40">
            {["Stripe", "Notion", "Linear", "Vercel", "Globe", "Supabase", "PlanetScale", "Railway"].map((brand, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="text-xl font-bold text-slate-400 font-mono tracking-tight">
                  {brand}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES / TABS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-14">
              <Badge className="bg-orange-100 text-orange-700 border-orange-200 mb-4">Platform</Badge>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">
                Everything You Need to Build<br />Communications Into Any Product
              </h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
                From a single SMS to 4 billion API calls per month — ForgeAPI scales with you, without configuration changes or re-architecture.
              </p>
            </div>
          </Reveal>

          <Tabs defaultValue="messaging" className="w-full">
            <TabsList className="grid grid-cols-3 max-w-xl mx-auto mb-12 bg-slate-100 p-1 rounded-xl">
              {FEATURES_TABS.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="flex items-center gap-2 rounded-lg cursor-pointer data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200"
                >
                  {tab.icon}
                  <span className="hidden sm:block text-xs font-semibold">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {FEATURES_TABS.map((tab) => (
              <TabsContent key={tab.value} value={tab.value}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                    <Badge className="bg-orange-100 text-orange-700 border-orange-200 mb-4">{tab.label}</Badge>
                    <h3 className="text-3xl font-extrabold text-slate-900 mb-4">{tab.title}</h3>
                    <p className="text-slate-500 leading-relaxed mb-8">{tab.description}</p>
                    <ul className="space-y-3">
                      {tab.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="mt-0.5 w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-orange-600" />
                          </div>
                          <span className="text-sm text-slate-700 font-mono leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex gap-3 mt-8">
                      <button
                        onClick={() => setDemoOpen(true)}
                        className="bg-gradient-to-r from-orange-500 to-red-600 hover:opacity-90 text-white px-6 py-3 rounded-full font-semibold text-sm flex items-center gap-2 transition-all duration-200 cursor-pointer shadow-md"
                      >
                        Get API Key <ArrowRight className="w-4 h-4" />
                      </button>
                      <Link
                        href="#"
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3 rounded-full font-semibold text-sm flex items-center gap-2 transition-all duration-200 cursor-pointer"
                      >
                        <BookOpen className="w-4 h-4" /> View Docs
                      </Link>
                    </div>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="relative h-[440px] rounded-2xl overflow-hidden shadow-2xl">
                    <Image src={tab.image} alt={tab.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-4 border border-slate-700">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                          <span className="text-xs text-green-400 font-mono font-semibold">API healthy · All systems operational</span>
                        </div>
                        <div className="font-mono text-xs text-slate-400">
                          <span className="text-orange-400">POST</span>{" "}
                          <span className="text-slate-300">/v2/{tab.value === "messaging" ? "messages" : tab.value === "auth" ? "verify" : "infra"}</span>{" "}
                          <span className="text-green-400">200 OK</span>{" "}
                          <span className="text-slate-500">· 14ms</span>
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
      <section className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-14">
              <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 mb-4">Developer Reviews</Badge>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">
                Engineers Trust ForgeAPI
              </h2>
              <p className="text-lg text-slate-400 max-w-xl mx-auto">
                From indie developers to principal engineers at publicly traded companies — hear what they build with ForgeAPI.
              </p>
            </div>
          </Reveal>

          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {TESTIMONIALS.map((t, i) => (
                <CarouselItem key={i} className="md:basis-1/2 pl-4">
                  <Card className="border border-slate-800 bg-slate-900 hover:border-orange-500/40 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-200 cursor-pointer h-full">
                    <CardContent className="p-8 flex flex-col h-full">
                      <div className="flex items-center gap-1 mb-4">
                        {Array.from({ length: t.rating }).map((_, j) => (
                          <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-slate-300 leading-relaxed flex-1 mb-6 text-sm">"{t.quote}"</p>
                      <Separator className="bg-slate-800 mb-5" />
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={t.avatar} alt={t.name} />
                          <AvatarFallback className="bg-orange-900 text-orange-400 text-sm font-bold">{t.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-bold text-white">{t.name}</p>
                          <p className="text-xs text-slate-500">{t.role} · {t.company}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="cursor-pointer border-slate-700 bg-slate-900 text-white hover:bg-slate-800" />
            <CarouselNext className="cursor-pointer border-slate-700 bg-slate-900 text-white hover:bg-slate-800" />
          </Carousel>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-14">
              <Badge className="bg-orange-100 text-orange-700 border-orange-200 mb-4">Pricing</Badge>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">
                Transparent Pricing. No Surprises.
              </h2>
              <p className="text-lg text-slate-500 max-w-xl mx-auto">
                Start free. Scale as you grow. Never pay for infrastructure you don't use.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {PRICING.map((plan, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <Card
                  className={`relative border-2 transition-all duration-200 cursor-pointer h-full flex flex-col ${
                    plan.highlight
                      ? "border-orange-500 shadow-xl shadow-orange-100"
                      : "border-slate-200 hover:border-orange-200 hover:shadow-md"
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <Badge className={plan.highlight ? "bg-gradient-to-r from-orange-500 to-red-600 text-white border-0 px-4 py-1" : "bg-slate-800 text-white border-slate-800 px-4 py-1"}>
                        {plan.badge}
                      </Badge>
                    </div>
                  )}
                  <CardContent className="p-8 flex flex-col flex-1">
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-slate-900 mb-1">{plan.name}</h3>
                      <p className="text-xs text-orange-600 font-semibold font-mono mb-3">{plan.included}</p>
                      <div className="flex items-end gap-1 mb-3">
                        <span className="text-4xl font-extrabold text-slate-900">{plan.price}</span>
                        <span className="text-slate-400 pb-1 font-medium">{plan.period}</span>
                      </div>
                      <p className="text-sm text-slate-500 leading-relaxed">{plan.description}</p>
                    </div>
                    <ul className="space-y-3 flex-1 mb-8">
                      {plan.features.map((feature, j) => (
                        <li key={j} className="flex items-start gap-2.5">
                          <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.highlight ? "text-orange-500" : "text-slate-400"}`} />
                          <span className="text-sm text-slate-700 font-mono">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => setDemoOpen(true)}
                      className={`w-full py-3 rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer ${
                        plan.highlight
                          ? "bg-gradient-to-r from-orange-500 to-red-600 hover:opacity-90 text-white shadow-md"
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

          <Reveal delay={0.3}>
            <div className="mt-12 bg-white border border-slate-200 rounded-2xl p-8 max-w-3xl mx-auto text-center shadow-sm">
              <h4 className="text-lg font-bold text-slate-900 mb-2">Enterprise volume pricing starts at 10M+ calls/month</h4>
              <p className="text-sm text-slate-500 mb-4">Custom per-message rates, dedicated infrastructure, and a committed spend discount of up to 40% vs. standard rates.</p>
              <button
                onClick={() => setDemoOpen(true)}
                className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-full font-semibold text-sm transition-all duration-200 cursor-pointer"
              >
                Talk to Enterprise Sales →
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-14">
              <Badge className="bg-orange-100 text-orange-700 border-orange-200 mb-4">FAQ</Badge>
              <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Developer FAQ</h2>
              <p className="text-slate-500 leading-relaxed">Real answers to real questions engineers ask before integrating a new API.</p>
            </div>
          </Reveal>
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-slate-50 border border-slate-200 rounded-xl px-6 hover:border-orange-200 transition-all duration-200 cursor-pointer shadow-sm"
              >
                <AccordionTrigger className="text-left font-semibold text-slate-900 py-5 hover:no-underline text-sm leading-snug cursor-pointer">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed pb-5 text-sm">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-24 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <motion.div
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-orange-600/15 blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/30 rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
              <span className="text-xs text-orange-300 font-mono font-semibold">99.99% uptime · P99 18ms · 4.2B+ calls/month</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
              Your First 10,000 API Calls<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                Are On Us. Forever.
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed">
              Get your API key in 30 seconds. Send your first message in under 3 minutes. No credit card, no setup fees, no infra to manage.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => setDemoOpen(true)}
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-200 shadow-xl cursor-pointer flex items-center gap-2"
              >
                <Terminal className="w-5 h-5" /> Get API Key Free
              </button>
              <Link href="#" className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-200 cursor-pointer flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-orange-400" /> Read the Docs
              </Link>
            </div>
            <div className="flex flex-wrap gap-8 justify-center mt-10 text-sm text-slate-500">
              {["No credit card", "API key in 30s", "10K calls free forever", "Cancel any time"].map((item, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-orange-500" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-white pt-20 pb-10 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                  <Terminal className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold">Forge<span className="text-orange-400">API</span></span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 max-w-xs">
                The communications API platform trusted by 42,000+ developer teams. SMS, WhatsApp, Voice, OTP — one API.
              </p>
              <div className="flex gap-3">
                {[Globe, Globe, Globe].map((Icon, i) => (
                  <a key={i} href="#" className="w-9 h-9 rounded-full bg-slate-800 hover:bg-orange-600 flex items-center justify-center transition-all duration-200 cursor-pointer">
                    <Icon className="w-4 h-4 text-slate-400" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4 text-sm">APIs</h4>
              <ul className="space-y-3">
                {["Messaging API", "Verify API", "Voice API", "Email API", "Number Lookup"].map((item) => (
                  <li key={item}><Link href="#" className="text-slate-500 hover:text-orange-400 text-sm transition-all duration-150 cursor-pointer font-mono">{item}</Link></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4 text-sm">Developers</h4>
              <ul className="space-y-3">
                {["Documentation", "API Reference", "SDKs & Libraries", "Status Page", "Changelog"].map((item) => (
                  <li key={item}><Link href="#" className="text-slate-500 hover:text-orange-400 text-sm transition-all duration-150 cursor-pointer">{item}</Link></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4 text-sm">Contact</h4>
              <ul className="space-y-3 text-sm text-slate-500">
                <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-orange-500" /><span>support@forgeapi.dev</span></li>
                <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-orange-500" /><span>+1 (415) 900-4422</span></li>
                <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-orange-500" /><span>SF · London · Amsterdam</span></li>
              </ul>
              <button
                onClick={() => setDemoOpen(true)}
                className="mt-6 bg-gradient-to-r from-orange-500 to-red-600 hover:opacity-90 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer w-full"
              >
                Get API Key
              </button>
            </div>
          </div>

          <Separator className="bg-slate-800 mb-8" />

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-600">
            <p>© 2026 ForgeAPI, Inc. SOC 2 Type II · ISO 27001 · PCI DSS Level 1 · GDPR</p>
            <div className="flex gap-6">
              {["Privacy Policy", "Terms of Service", "Security", "SLA"].map((item) => (
                <Link key={item} href="#" className="hover:text-slate-400 transition-all duration-150 cursor-pointer">{item}</Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
