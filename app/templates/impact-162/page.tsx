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
import { Menu, Shield, Lock, Eye, Zap, Server, AlertTriangle, CheckCircle2, ArrowRight, Star, Users, Globe, TrendingUp, Terminal, Wifi, Database, Key, FileText, ChevronRight } from "lucide-react"

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

function LiveThreatTicker() {
  const threats = [
    "SQL Injection attempt blocked — 192.168.92.14",
    "Phishing domain flagged — malicious-bank-login.xyz",
    "Ransomware signature detected — quarantine initiated",
    "Zero-day CVE-2026-8841 — patch deployed in 0.4s",
    "Credential stuffing attack mitigated — 4,200 attempts/min",
    "Lateral movement detected — endpoint isolated automatically",
  ]
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % threats.length), 3000)
    return () => clearInterval(t)
  }, [])
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={idx}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35 }}
        className="text-emerald-400 font-mono text-xs font-bold"
      >
        <span className="text-emerald-500 mr-2">▶</span>{threats[idx]}
      </motion.div>
    </AnimatePresence>
  )
}

const TESTIMONIALS = [
  {
    name: "Darren Fleck", role: "CISO", company: "Meridian Financial Group",
    quote: "Sentinel Shield detected and contained a supply-chain compromise within 90 seconds. Our SOC team would have taken hours. The ROI on this platform is self-evident.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
    rating: 5, stat: "90s mean time to contain"
  },
  {
    name: "Rachel Okonkwo", role: "Head of Security", company: "NovaBioscience",
    quote: "We operate in a highly regulated environment. Sentinel Shield's compliance automation cut our SOC 2 audit prep from 14 weeks to under 3. A transformative product.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80",
    rating: 5, stat: "SOC 2 audit: 14 wks → 3 wks"
  },
  {
    name: "Tomasz Wielinski", role: "VP Engineering", company: "EuroCloud AG",
    quote: "We process 2B+ API calls per day. Sentinel Shield's real-time threat intelligence layer has blocked 140M malicious requests this quarter alone without a single false positive cascade.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80",
    rating: 5, stat: "140M threats blocked this quarter"
  },
  {
    name: "Sunita Kapoor", role: "CTO", company: "FinPath Technologies",
    quote: "Our insurers actually reduced our cyber premium by 34% after we deployed Sentinel Shield. The continuous compliance posture reporting is exactly what they needed to see.",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80",
    rating: 5, stat: "34% cyber insurance premium reduction"
  },
  {
    name: "Marcus Bell", role: "Director of IT", company: "Atlas Retail Group",
    quote: "We have 2,400 endpoints across 180 stores. Sentinel Shield manages every single one with zero agent overhead. The behavioral anomaly detection is years ahead of CrowdStrike.",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80",
    rating: 5, stat: "2,400 endpoints, zero agent overhead"
  },
]

const FAQS = [
  {
    q: "How does Sentinel Shield's AI threat detection differ from signature-based tools?",
    a: "Traditional signature-based detection requires a known threat pattern to exist in a database before it can flag it. Sentinel Shield's Behavioral AI engine models normal baseline activity for every user, device, and service in your environment — and flags statistical deviations in real time. This catches zero-day exploits, novel ransomware variants, and insider threats that signature databases will never see. Our detection-to-containment time averages 94 seconds."
  },
  {
    q: "What compliance frameworks does Sentinel Shield support out of the box?",
    a: "Sentinel Shield ships with pre-built control mappings for SOC 2 Type II, ISO 27001, NIST CSF 2.0, PCI-DSS 4.0, HIPAA, GDPR, FedRAMP Moderate, and CCPA. Automated evidence collection runs continuously, generating audit-ready reports on demand. Our compliance team has helped 200+ customers pass their first audit without a finding."
  },
  {
    q: "How long does deployment take, and does it require agents on endpoints?",
    a: "Agentless deployment via API integrations with your existing cloud infrastructure (AWS, Azure, GCP), identity providers (Okta, Azure AD), and SaaS tools (Salesforce, GitHub, Globe) is typically complete within 4 hours. For endpoint behavioral monitoring, our lightweight sensor (2MB RAM footprint) deploys via MDM in under 20 minutes across fleets of any size."
  },
  {
    q: "What is your uptime SLA and how do you handle false positives?",
    a: "Sentinel Shield maintains a 99.99% uptime SLA with financially backed credits. Our false positive rate is 0.003% — among the lowest in the industry — achieved through our three-stage validation pipeline: ML scoring, contextual enrichment, and human-in-the-loop review for high-ambiguity signals. Your SOC team only sees actionable alerts."
  },
  {
    q: "Can Sentinel Shield integrate with our existing SIEM and SOAR stack?",
    a: "Yes. Native integrations exist for Splunk, Microsoft Sentinel, IBM QRadar, Elastic SIEM, Palo Alto XSOAR, and ServiceNow Security. Bi-directional API and webhook support ensures threat intelligence enriches your existing workflows. We also offer professional services to build custom integrations on a fixed-fee basis."
  },
  {
    q: "How is customer data handled and where is it stored?",
    a: "All security telemetry is encrypted in transit (TLS 1.3) and at rest (AES-256). We operate a multi-region data residency model — EU customers' data never leaves EU data centers, US customers' data stays within AWS us-east / us-west. We are certified SOC 2 Type II, ISO 27001, and operate under a zero-knowledge architecture for sensitive log contents."
  },
  {
    q: "What support response times can enterprise customers expect?",
    a: "Enterprise plan customers receive a dedicated Customer Success Engineer and guaranteed 15-minute response on P1 incidents (active breach), 2-hour response on P2 (anomaly detected, no confirmed breach), and 4-hour on P3. Our 24/7 SOC-as-a-Service add-on provides around-the-clock human monitoring with direct Globe and phone escalation."
  },
]

const PRICING_TIERS = [
  {
    name: "Essentials",
    price: "$12",
    period: "/ endpoint / month",
    description: "For growing companies up to 500 endpoints needing core threat detection and compliance visibility.",
    features: [
      "Behavioral threat detection (AI)",
      "Cloud asset inventory & misconfiguration alerts",
      "SOC 2 & ISO 27001 control mapping",
      "Email & Globe alerting",
      "14-day threat history",
      "Community support portal",
    ],
    cta: "Start Free Trial",
    highlight: false,
    badge: null,
  },
  {
    name: "Enterprise",
    price: "$28",
    period: "/ endpoint / month",
    description: "For mid-market and enterprise security teams requiring full XDR, SIEM integration, and dedicated support.",
    features: [
      "Everything in Essentials",
      "Extended Detection & Response (XDR)",
      "Automated incident playbooks (SOAR)",
      "SIEM & SOAR native integrations",
      "Continuous compliance posture scoring",
      "90-day forensic log retention",
      "Dedicated Customer Success Engineer",
      "24/7 P1 incident response (15 min SLA)",
    ],
    cta: "Talk to Sales",
    highlight: true,
    badge: "Most Popular",
  },
  {
    name: "Sovereign",
    price: "Custom",
    period: "pricing",
    description: "For critical infrastructure, defense contractors, and regulated institutions with air-gap and FedRAMP requirements.",
    features: [
      "Everything in Enterprise",
      "On-premise / air-gapped deployment",
      "FedRAMP Moderate authorization",
      "Custom data residency & sovereignty",
      "Dedicated threat intelligence team",
      "Red team / adversarial simulation",
      "Executive threat briefings (quarterly)",
      "Zero SLA downtime guarantee",
    ],
    cta: "Contact Security Team",
    highlight: false,
    badge: null,
  },
]

export default function SentinelShieldCyber() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const heroY = useTransform(scrollYProgress, [0, 0.4], [0, 100])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 50, damping: 25 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 25 })

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 60)
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 60)
    }
    window.addEventListener("mousemove", handler)
    return () => window.removeEventListener("mousemove", handler)
  }, [mouseX, mouseY])

  const [demoOpen, setDemoOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div ref={containerRef} style={{ overflowX: "hidden", scrollBehavior: "smooth" }} className="bg-[#070d19] text-white min-h-screen font-sans">

      {/* ── ANIMATED GRID BACKGROUND ── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,128,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,128,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        <motion.div style={{ x: springX, y: springY }} className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px]" />
        <motion.div style={{ x: springX, y: springY }} className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px]" />
      </div>

      {/* ── NAVBAR ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#070d19]/80 backdrop-blur-xl border-b border-emerald-500/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center">
              <Shield className="w-4 h-4 text-[#070d19]" />
            </div>
            <span className="text-xl font-black tracking-tight text-white">Sentinel<span className="text-emerald-400">Shield</span></span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {["Platform", "Solutions", "Compliance", "Pricing", "Docs"].map(item => (
              <Link key={item} href="#" className="cursor-pointer text-sm font-semibold text-slate-400 hover:text-white transition-all duration-200">{item}</Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link href="#" className="cursor-pointer text-sm font-semibold text-slate-300 hover:text-white transition-all duration-200 px-3 py-2">Sign In</Link>
            <button onClick={() => setDemoOpen(true)} className="cursor-pointer bg-emerald-500 text-[#070d19] text-sm font-black px-5 py-2.5 rounded-lg hover:bg-emerald-400 transition-all duration-200">
              Request Demo
            </button>
          </div>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button className="md:hidden cursor-pointer p-2 hover:bg-slate-800 rounded-lg transition-all duration-150">
                <Menu className="w-5 h-5 text-slate-300" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#0d1829] border-emerald-500/20 w-72">
              <div className="pt-8 flex flex-col gap-6">
                {["Platform", "Solutions", "Compliance", "Pricing", "Docs", "Sign In"].map(item => (
                  <Link key={item} href="#" className="cursor-pointer text-lg font-bold text-slate-300 hover:text-emerald-400 transition-colors duration-200">{item}</Link>
                ))}
                <button onClick={() => setDemoOpen(true)} className="cursor-pointer bg-emerald-500 text-[#070d19] font-black py-3 rounded-lg hover:bg-emerald-400 transition-all duration-200">
                  Request Demo
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-24">
          <div className="max-w-4xl">
            <Reveal delay={0}>
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-4 py-1.5 mb-8">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-emerald-400 text-xs font-black uppercase tracking-widest">Threat Engine Active — 2.4M events/sec</span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6 tracking-tight">
                Stop Breaches<br />
                <span className="text-emerald-400">Before They</span><br />
                Happen.
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-xl text-slate-300 mb-10 leading-relaxed font-light max-w-2xl">
                The AI-native cybersecurity platform that detects, investigates, and automatically responds to threats across cloud, endpoint, identity, and SaaS — in under 90 seconds.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 mb-14">
                <button onClick={() => setDemoOpen(true)} className="cursor-pointer bg-emerald-500 text-[#070d19] font-black px-8 py-4 rounded-xl hover:bg-emerald-400 transition-all duration-200 text-lg flex items-center gap-2 justify-center">
                  <Shield className="w-5 h-5" /> Request a Live Demo
                </button>
                <Link href="#" className="cursor-pointer border border-slate-600 text-slate-200 font-bold px-8 py-4 rounded-xl hover:border-emerald-500 hover:text-emerald-400 transition-all duration-200 text-lg flex items-center gap-2 justify-center">
                  <Terminal className="w-5 h-5" /> View Documentation
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              {/* Live Threat Feed */}
              <div className="bg-[#0d1829]/80 border border-emerald-500/20 rounded-xl p-4 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-slate-400 text-xs font-black uppercase tracking-widest">Live Global Threat Feed</span>
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs ml-auto cursor-default">Real-time</Badge>
                </div>
                <LiveThreatTicker />
              </div>
            </Reveal>
          </div>

          {/* Hero visual — right side */}
          <motion.div style={{ y: heroY }} className="hidden lg:block absolute right-6 top-1/2 -translate-y-1/2 w-[480px]">
            <div className="relative h-[560px] rounded-2xl overflow-hidden border border-emerald-500/20 bg-[#0d1829]/60 backdrop-blur-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <div className="w-3 h-3 bg-emerald-500 rounded-full" />
                <span className="text-slate-400 text-xs font-mono ml-4">sentinel-shield — threat-console</span>
              </div>
              <div className="space-y-2 font-mono text-xs">
                {[
                  { time: "14:23:01", type: "INFO", msg: "Baseline model updated — 4,892 entities", color: "text-slate-400" },
                  { time: "14:23:14", type: "WARN", msg: "Anomalous login pattern — user: j.smith", color: "text-yellow-400" },
                  { time: "14:23:14", type: "ALERT", msg: "Impossible travel detected — NYC→Moscow 4min", color: "text-orange-400" },
                  { time: "14:23:15", type: "ACTION", msg: "Session terminated — MFA re-auth enforced", color: "text-cyan-400" },
                  { time: "14:23:15", type: "BLOCK", msg: "Access revoked — policy: IMPOSSIBLE_TRAVEL", color: "text-red-400" },
                  { time: "14:23:22", type: "INFO", msg: "Ticket created — INC-8821, severity: HIGH", color: "text-slate-400" },
                  { time: "14:23:35", type: "ALERT", msg: "Lateral movement probe — 10.0.4.17→DB tier", color: "text-orange-400" },
                  { time: "14:23:36", type: "ACTION", msg: "Endpoint isolated — network quarantine active", color: "text-cyan-400" },
                  { time: "14:23:36", type: "BLOCK", msg: "Micro-segmentation rule applied — zone: DB", color: "text-red-400" },
                  { time: "14:23:48", type: "INFO", msg: "Threat contained — MTTR: 34 seconds", color: "text-emerald-400" },
                  { time: "14:23:50", type: "INFO", msg: "Report generated — forensic timeline complete", color: "text-slate-400" },
                ].map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15, duration: 0.3 }}
                    className={`flex gap-3 ${line.color}`}
                  >
                    <span className="text-slate-600 flex-shrink-0">{line.time}</span>
                    <span className="text-slate-500 flex-shrink-0 w-14">[{line.type}]</span>
                    <span>{line.msg}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="py-14 px-6 bg-[#0d1829] border-y border-emerald-500/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
            {[
              { label: "Threats Blocked Daily", value: 2400000, suffix: "+" },
              { label: "Mean Time to Contain", value: 94, suffix: "s" },
              { label: "Enterprise Customers", value: 1800, suffix: "+" },
              { label: "False Positive Rate", value: 0.003, suffix: "%" },
              { label: "Uptime SLA", value: 99.99, suffix: "%" },
            ].map((stat, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="cursor-default">
                  <div className="text-3xl md:text-4xl font-black text-emerald-400 mb-1">
                    <Counter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES TABS ── */}
      <section className="py-24 px-6 bg-[#070d19]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <Badge className="bg-emerald-500/10 border-emerald-500/30 text-emerald-400 mb-4 cursor-default">Platform Capabilities</Badge>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                One Platform. Every<br /><span className="text-emerald-400">Attack Surface.</span>
              </h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto font-light">From cloud misconfigurations to insider threats — Sentinel Shield covers the complete threat landscape with AI precision.</p>
            </div>
          </Reveal>

          <Tabs defaultValue="detection" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 max-w-2xl mx-auto mb-14 bg-[#0d1829] border border-emerald-500/10 p-1 rounded-xl">
              {["detection", "response", "compliance", "identity"].map(tab => (
                <TabsTrigger key={tab} value={tab} className="cursor-pointer rounded-lg font-bold capitalize transition-all duration-200 data-[state=active]:bg-emerald-500 data-[state=active]:text-[#070d19] text-slate-400">
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="detection">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: Eye, title: "Behavioral AI Engine", desc: "Models 800+ behavioral signals per entity to establish dynamic baselines. Deviations trigger multi-stage validation before surfacing as alerts — eliminating alert fatigue.", items: ["Zero-day exploit detection without signatures", "Insider threat behavioral modeling", "1ms latency on 2M+ events/second"] },
                  { icon: Globe, title: "Threat Intelligence Network", desc: "Aggregates IOCs from 240+ global threat intelligence feeds, dark web monitoring, and our own honeypot network — enriching every alert with full adversary context.", items: ["240+ threat feed integrations", "Dark web credential exposure monitoring", "Real-time IOC correlation & MITRE ATT&CK mapping"] },
                  { icon: Wifi, title: "Network Detection & Response", desc: "Agentless network traffic analysis identifies C2 communication, DNS exfiltration, and east-west lateral movement across on-prem and cloud environments in real time.", items: ["Encrypted traffic analysis (without decryption)", "Cloud VPC flow log analysis", "Sub-second C2 beacon detection"] },
                ].map((f, i) => {
                  const Icon = f.icon
                  return (
                    <Reveal key={i} delay={i * 0.1}>
                      <Card className="cursor-pointer bg-[#0d1829] border-emerald-500/10 hover:border-emerald-500/40 transition-all duration-300 h-full hover:shadow-xl hover:shadow-emerald-500/5">
                        <CardContent className="p-7">
                          <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-5 border border-emerald-500/20">
                            <Icon className="w-6 h-6 text-emerald-400" />
                          </div>
                          <h3 className="text-xl font-black text-white mb-3">{f.title}</h3>
                          <p className="text-slate-400 text-sm leading-relaxed mb-5">{f.desc}</p>
                          <ul className="space-y-2">
                            {f.items.map(item => (
                              <li key={item} className="flex items-start gap-2 text-xs text-slate-400 font-semibold">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />{item}
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

            <TabsContent value="response">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: Zap, title: "Automated Response Playbooks", desc: "350+ pre-built response playbooks execute containment actions in milliseconds — isolating endpoints, revoking sessions, blocking IPs, and notifying stakeholders automatically.", items: ["350+ pre-built SOAR playbooks", "Custom playbook builder (no-code)", "Human approval gates for high-risk actions"] },
                  { icon: Server, title: "Forensic Investigation Suite", desc: "Full forensic timeline reconstruction from memory dumps, process trees, network flows, and log correlation — enabling root cause analysis without external tools.", items: ["90-day forensic log retention", "DFIR-ready evidence export", "Chain of custody documentation"] },
                  { icon: AlertTriangle, title: "Incident War Room", desc: "Centralized incident command interface with real-time collaboration, stakeholder communication templates, regulatory notification drafts, and post-incident report generation.", items: ["Real-time cross-team collaboration", "Automated regulatory notification drafts", "Post-incident report with board summary"] },
                ].map((f, i) => {
                  const Icon = f.icon
                  return (
                    <Reveal key={i} delay={i * 0.1}>
                      <Card className="cursor-pointer bg-[#0d1829] border-emerald-500/10 hover:border-emerald-500/40 transition-all duration-300 h-full hover:shadow-xl hover:shadow-emerald-500/5">
                        <CardContent className="p-7">
                          <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-5 border border-emerald-500/20">
                            <Icon className="w-6 h-6 text-emerald-400" />
                          </div>
                          <h3 className="text-xl font-black text-white mb-3">{f.title}</h3>
                          <p className="text-slate-400 text-sm leading-relaxed mb-5">{f.desc}</p>
                          <ul className="space-y-2">
                            {f.items.map(item => (
                              <li key={item} className="flex items-start gap-2 text-xs text-slate-400 font-semibold">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />{item}
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

            <TabsContent value="compliance">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <Reveal>
                  <div className="space-y-5">
                    <h3 className="text-3xl font-black text-white">Continuous Compliance, Zero Manual Effort</h3>
                    <p className="text-slate-400 leading-relaxed">Sentinel Shield continuously maps your security posture against 12 major frameworks. Evidence is collected automatically, gaps are flagged with remediation steps, and audit reports generate in one click.</p>
                    <div className="space-y-4">
                      {["SOC 2 Type II", "ISO 27001", "PCI-DSS 4.0", "HIPAA", "NIST CSF 2.0", "FedRAMP Moderate"].map((fw, i) => (
                        <div key={fw} className="flex items-center gap-4">
                          <div className="w-24 text-xs font-black text-emerald-400 flex-shrink-0">{fw}</div>
                          <div className="flex-1">
                            <Progress value={[94, 98, 91, 97, 88, 82][i]} className="h-2 bg-slate-800" />
                          </div>
                          <span className="text-sm font-black text-slate-300 w-10 text-right">{[94, 98, 91, 97, 88, 82][i]}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
                <Reveal delay={0.2}>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "Audit Prep Time", before: "14 weeks", after: "2 weeks", icon: FileText },
                      { label: "Control Coverage", before: "61%", after: "98%", icon: CheckCircle2 },
                      { label: "Evidence Collection", before: "Manual", after: "Automated", icon: Database },
                      { label: "Policy Violations", before: "Discovered late", after: "Real-time", icon: AlertTriangle },
                    ].map(({ label, before, after, icon: Icon }) => (
                      <Card key={label} className="cursor-pointer bg-[#0d1829] border-emerald-500/10 hover:border-emerald-500/30 transition-all duration-200">
                        <CardContent className="p-5">
                          <Icon className="w-5 h-5 text-emerald-400 mb-3" />
                          <p className="text-xs text-slate-500 font-black uppercase tracking-widest mb-2">{label}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-red-400 text-xs font-bold line-through">{before}</span>
                            <ArrowRight className="w-3 h-3 text-slate-500" />
                            <span className="text-emerald-400 text-sm font-black">{after}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </Reveal>
              </div>
            </TabsContent>

            <TabsContent value="identity">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: Key, title: "Identity Threat Detection", desc: "Continuous monitoring of user, service account, and machine identities for credential abuse, privilege escalation, and impossible travel patterns across every identity provider.", items: ["Okta, Azure AD, Ping Identity native integrations", "Privilege escalation path visualization", "Service account anomaly detection"] },
                  { icon: Lock, title: "Privileged Access Governance", desc: "Just-in-time access provisioning, standing privilege elimination, and session recording for all privileged activities — with automated de-provisioning on policy violations.", items: ["Zero standing privilege enforcement", "Just-in-time PAM for cloud & on-prem", "Full privileged session video recording"] },
                  { icon: Shield, title: "SaaS Security Posture", desc: "Continuous visibility into permission sprawl, shadow IT, misconfigured OAuth apps, and over-privileged integrations across your entire SaaS stack — including Salesforce, GitHub, Globe, and 120+ more.", items: ["120+ SaaS application integrations", "OAuth permission risk scoring", "Automated SaaS app revocation workflows"] },
                ].map((f, i) => {
                  const Icon = f.icon
                  return (
                    <Reveal key={i} delay={i * 0.1}>
                      <Card className="cursor-pointer bg-[#0d1829] border-emerald-500/10 hover:border-emerald-500/40 transition-all duration-300 h-full">
                        <CardContent className="p-7">
                          <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-5 border border-emerald-500/20">
                            <Icon className="w-6 h-6 text-emerald-400" />
                          </div>
                          <h3 className="text-xl font-black text-white mb-3">{f.title}</h3>
                          <p className="text-slate-400 text-sm leading-relaxed mb-5">{f.desc}</p>
                          <ul className="space-y-2">
                            {f.items.map(item => (
                              <li key={item} className="flex items-start gap-2 text-xs text-slate-400 font-semibold">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />{item}
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

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 px-6 bg-[#0d1829]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <Badge className="bg-emerald-500/10 border-emerald-500/30 text-emerald-400 mb-4 cursor-default">Customer Proof</Badge>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                Security Teams<br /><span className="text-emerald-400">Trust Sentinel Shield</span>
              </h2>
            </div>
          </Reveal>
          <Carousel className="w-full">
            <CarouselContent className="-ml-4">
              {TESTIMONIALS.map((t, idx) => (
                <CarouselItem key={idx} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <Reveal delay={idx * 0.07}>
                    <Card className="cursor-pointer bg-[#070d19] border-emerald-500/10 hover:border-emerald-500/30 transition-all duration-300 h-full">
                      <CardContent className="p-7">
                        <div className="flex gap-0.5 mb-4">
                          {Array(t.rating).fill(0).map((_, i) => <Star key={i} className="w-4 h-4 fill-emerald-400 text-emerald-400" />)}
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed mb-5 italic">"{t.quote}"</p>
                        <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg px-3 py-2 mb-5">
                          <p className="text-emerald-400 text-xs font-black">{t.stat}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10 ring-2 ring-emerald-500/20">
                            <AvatarImage src={t.img} />
                            <AvatarFallback className="bg-emerald-500/20 text-emerald-400 font-bold text-xs">{t.name.split(" ").map(n => n[0]).join("").slice(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-white font-bold text-sm">{t.name}</p>
                            <p className="text-emerald-400 text-xs font-semibold">{t.role} · {t.company}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Reveal>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="cursor-pointer border-slate-700 text-white hover:bg-slate-800 transition-all duration-200" />
            <CarouselNext className="cursor-pointer border-slate-700 text-white hover:bg-slate-800 transition-all duration-200" />
          </Carousel>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="py-24 px-6 bg-[#070d19]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <Badge className="bg-emerald-500/10 border-emerald-500/30 text-emerald-400 mb-4 cursor-default">Pricing</Badge>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                Security That Scales<br /><span className="text-emerald-400">With Your Business</span>
              </h2>
              <p className="text-slate-400 text-lg max-w-xl mx-auto font-light">All plans include a 30-day free trial. No credit card required.</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {PRICING_TIERS.map((tier, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className={`cursor-pointer relative h-full rounded-2xl border-2 p-8 flex flex-col transition-all duration-300 hover:shadow-2xl ${tier.highlight ? "border-emerald-500 bg-[#0d1829] shadow-xl shadow-emerald-500/10" : "border-slate-700 bg-[#0a1221] hover:border-emerald-500/40"}`}>
                  {tier.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <Badge className="bg-emerald-500 text-[#070d19] border-0 px-4 py-1 text-xs font-black">{tier.badge}</Badge>
                    </div>
                  )}
                  <h3 className={`text-2xl font-black mb-1 ${tier.highlight ? "text-white" : "text-slate-200"}`}>{tier.name}</h3>
                  <div className="flex items-end gap-1 mb-3">
                    <span className={`text-4xl font-black ${tier.highlight ? "text-emerald-400" : "text-white"}`}>{tier.price}</span>
                    <span className="text-slate-500 text-sm font-semibold mb-1">{tier.period}</span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">{tier.description}</p>
                  <ul className="space-y-3 mb-8 flex-1">
                    {tier.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${tier.highlight ? "text-emerald-400" : "text-slate-500"}`} />
                        <span className="text-slate-300 text-sm font-medium">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => setDemoOpen(true)} className={`cursor-pointer w-full py-3 rounded-xl font-black text-sm transition-all duration-200 ${tier.highlight ? "bg-emerald-500 text-[#070d19] hover:bg-emerald-400" : "border border-slate-600 text-slate-200 hover:border-emerald-500 hover:text-emerald-400"}`}>
                    {tier.cta}
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 px-6 bg-[#0d1829]">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <Badge className="bg-emerald-500/10 border-emerald-500/30 text-emerald-400 mb-4 cursor-default">FAQ</Badge>
              <h2 className="text-4xl font-black text-white tracking-tight">Common Questions</h2>
            </div>
          </Reveal>
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((faq, idx) => (
              <Reveal key={idx} delay={idx * 0.04}>
                <AccordionItem value={`faq-${idx}`} className="cursor-pointer bg-[#070d19] border border-emerald-500/10 rounded-xl px-6 hover:border-emerald-500/30 transition-all duration-200">
                  <AccordionTrigger className="cursor-pointer hover:text-emerald-400 font-bold text-slate-200 py-5 text-left transition-colors duration-200">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-400 pb-5 leading-relaxed text-sm">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              </Reveal>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-24 px-6 bg-[#070d19] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-cyan-500/5" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,128,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,128,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <Reveal>
            <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-emerald-500/20">
              <Shield className="w-8 h-8 text-emerald-400" />
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
              Your Next Breach<br />
              <span className="text-emerald-400">Won't Happen on Our Watch.</span>
            </h2>
            <p className="text-slate-300 text-xl mb-10 font-light max-w-2xl mx-auto leading-relaxed">
              Join 1,800+ security teams who've eliminated breaches with Sentinel Shield. See a live demo of your environment — no commitment required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => setDemoOpen(true)} className="cursor-pointer bg-emerald-500 text-[#070d19] font-black px-10 py-4 rounded-xl hover:bg-emerald-400 transition-all duration-200 text-lg">
                Get a Live Demo
              </button>
              <Link href="#" className="cursor-pointer border border-slate-600 text-slate-200 font-bold px-10 py-4 rounded-xl hover:border-emerald-500 hover:text-emerald-400 transition-all duration-200 text-lg flex items-center justify-center gap-2">
                <Terminal className="w-5 h-5" /> Read Case Studies
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#040810] border-t border-emerald-500/10 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center">
                  <Shield className="w-4 h-4 text-[#070d19]" />
                </div>
                <span className="text-xl font-black text-white">Sentinel<span className="text-emerald-400">Shield</span></span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 max-w-xs">
                The AI-native cybersecurity platform trusted by 1,800+ enterprise security teams to stop breaches in under 90 seconds.
              </p>
              <div className="flex gap-3">
                {[Globe, Globe, Globe, Globe].map((Icon, i) => (
                  <a key={i} href="#" className="cursor-pointer w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-emerald-500/20 hover:border-emerald-500/30 border border-transparent transition-all duration-200">
                    <Icon className="w-4 h-4 text-slate-400" />
                  </a>
                ))}
              </div>
            </div>
            {[
              { title: "Platform", links: ["Threat Detection", "Incident Response", "Compliance", "Identity Security", "Cloud Security"] },
              { title: "Solutions", links: ["Financial Services", "Healthcare", "Government", "Technology", "Retail"] },
              { title: "Company", links: ["About Us", "Security Blog", "Press", "Careers", "Contact"] },
            ].map(col => (
              <div key={col.title}>
                <h4 className="text-slate-300 font-black text-sm uppercase tracking-widest mb-5">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map(link => (
                    <li key={link}><Link href="#" className="cursor-pointer text-slate-500 text-sm hover:text-emerald-400 transition-colors duration-200 font-medium">{link}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Separator className="bg-slate-800 mb-8" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-600 text-sm">© 2026 SentinelShield Inc. All rights reserved. SOC 2 Type II · ISO 27001 · FedRAMP Authorized</p>
            <div className="flex gap-6">
              {["Privacy Policy", "Terms of Service", "Security"].map(link => (
                <Link key={link} href="#" className="cursor-pointer text-slate-600 text-sm hover:text-slate-300 transition-colors duration-200">{link}</Link>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ── DEMO DIALOG ── */}
      <Dialog open={demoOpen} onOpenChange={setDemoOpen}>
        <DialogContent className="bg-[#0d1829] border-emerald-500/20 max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-white">Request a Live Demo</DialogTitle>
          </DialogHeader>
          <p className="text-slate-400 text-sm mb-6">Our security engineers will walk you through a demo using your actual environment data — no generic slides.</p>
          <form className="space-y-4" onSubmit={e => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1 block">First Name</label>
                <input className="cursor-text w-full px-4 py-3 bg-[#070d19] border border-slate-700 rounded-xl text-sm text-white outline-none focus:border-emerald-500 transition-colors duration-200" placeholder="Darren" />
              </div>
              <div>
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1 block">Last Name</label>
                <input className="cursor-text w-full px-4 py-3 bg-[#070d19] border border-slate-700 rounded-xl text-sm text-white outline-none focus:border-emerald-500 transition-colors duration-200" placeholder="Fleck" />
              </div>
            </div>
            <div>
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1 block">Work Email</label>
              <input type="email" className="cursor-text w-full px-4 py-3 bg-[#070d19] border border-slate-700 rounded-xl text-sm text-white outline-none focus:border-emerald-500 transition-colors duration-200" placeholder="darren@company.com" />
            </div>
            <div>
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1 block">Company & Role</label>
              <input className="cursor-text w-full px-4 py-3 bg-[#070d19] border border-slate-700 rounded-xl text-sm text-white outline-none focus:border-emerald-500 transition-colors duration-200" placeholder="CISO at Meridian Financial" />
            </div>
            <div>
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1 block">Endpoints / Cloud Workloads</label>
              <select className="cursor-pointer w-full px-4 py-3 bg-[#070d19] border border-slate-700 rounded-xl text-sm text-white outline-none focus:border-emerald-500 transition-colors duration-200">
                <option>1–100</option>
                <option>101–500</option>
                <option>501–2,000</option>
                <option>2,001–10,000</option>
                <option>10,000+</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1 block">Primary Security Challenge</label>
              <textarea rows={3} className="cursor-text w-full px-4 py-3 bg-[#070d19] border border-slate-700 rounded-xl text-sm text-white outline-none focus:border-emerald-500 transition-colors duration-200 resize-none" placeholder="e.g. Ransomware prevention, insider threats, compliance automation…" />
            </div>
            <button type="submit" className="cursor-pointer w-full bg-emerald-500 text-[#070d19] font-black py-4 rounded-xl hover:bg-emerald-400 transition-all duration-200">
              Book My Demo
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
