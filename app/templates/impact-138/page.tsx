// @ts-nocheck
"use client"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { BarChart3, ArrowRight, Menu, TrendingUp, Users, Globe, Shield, Zap, PieChart, Activity, Database, ChevronRight } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

function Reveal({ children, delay = 0, y = 40 }: { children: React.ReactNode; delay?: number; y?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y }} animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  )
}

const METRICS = [
  { label: "Active Users", value: "2.4M", change: "+12.3%", color: "#8b5cf6" },
  { label: "Revenue", value: "$847K", change: "+8.7%", color: "#06b6d4" },
  { label: "Conversion", value: "4.2%", change: "+1.1%", color: "#f59e0b" },
  { label: "Retention", value: "92%", change: "+3.2%", color: "#10b981" },
]

const FEATURES = [
  { icon: PieChart, title: "Real-Time Dashboards", desc: "Live metrics with sub-second latency. No more waiting for yesterday's data." },
  { icon: Database, title: "Data Lakehouse", desc: "Unified analytics across structured and unstructured data sources." },
  { icon: Shield, title: "SOC 2 Compliant", desc: "Enterprise-grade security with role-based access and audit trails." },
  { icon: Zap, title: "AI-Powered Insights", desc: "Anomaly detection and predictive forecasting built into every chart." },
  { icon: Globe, title: "Multi-Region", desc: "Data residency controls for GDPR, CCPA, and regional compliance." },
  { icon: Activity, title: "Custom Events", desc: "Track any user action with our SDK. 200+ integrations out of the box." },
]

const PLANS = [
  { name: "Startup", price: "$49", desc: "For teams getting started with analytics.", features: ["10K MAU", "5 Dashboards", "7-day retention", "Email support"] },
  { name: "Growth", price: "$199", desc: "For scaling teams that need real-time insights.", features: ["100K MAU", "Unlimited Dashboards", "90-day retention", "Priority support", "AI Insights"], popular: true },
  { name: "Enterprise", price: "Custom", desc: "For organizations with complex data needs.", features: ["Unlimited MAU", "Data Lakehouse", "Unlimited retention", "Dedicated CSM", "SSO/SAML", "SLA 99.99%"] },
]

export default function PrismAnalyticsPage() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", h)
    return () => window.removeEventListener("scroll", h)
  }, [])

  return (
    <div className="bg-[#0a0a12] text-white font-sans min-h-screen selection:bg-violet-500 selection:text-white overflow-x-hidden">

      {/* ── NAVBAR ──────────────────────── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled ? "bg-[#0a0a12]/90 backdrop-blur-xl border-b border-violet-500/10 py-4" : "bg-transparent py-8"}`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-black tracking-tight">Prism</span>
          </Link>
          <div className="hidden lg:flex gap-10 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
            {["Product", "Pricing", "Docs", "Blog"].map(l => (
              <Link key={l} href="#" className="hover:text-violet-400 transition-colors">{l}</Link>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <button className="hidden md:block px-6 py-2.5 text-white/60 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors">Log In</button>
            <button className="hidden md:block px-6 py-2.5 bg-gradient-to-r from-violet-500 to-cyan-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-full hover:opacity-90 transition-opacity">Start Free</button>
            <Sheet>
              <SheetTrigger asChild><button className="lg:hidden"><Menu className="w-6 h-6 text-white" /></button></SheetTrigger>
              <SheetContent side="right" className="bg-[#0a0a12] border-violet-500/10 p-12">
                <div className="flex flex-col gap-8 mt-16">
                  {["Product", "Pricing", "Docs", "Log In"].map(l => (
                    <Link key={l} href="#" className="text-2xl font-light uppercase tracking-widest hover:text-violet-400 transition-colors">{l}</Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      <main>
        {/* ── HERO ──────────────────────── */}
        <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-violet-500/10 to-cyan-500/10 blur-[200px] rounded-full" />
          </div>

          <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12 w-full text-center">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/20 bg-violet-500/10 text-violet-400 text-[10px] font-bold uppercase tracking-widest mb-8">
                <TrendingUp className="w-3 h-3" /> Now with AI-Powered Anomaly Detection
              </div>
            </Reveal>
            <Reveal delay={0.1} y={60}>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
                Analytics That<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-cyan-300 to-violet-500">See Everything.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-xl text-white/40 font-light max-w-lg mx-auto leading-relaxed mb-10">
                Real-time product analytics with AI-powered insights. Understand your users in milliseconds, not days.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="flex flex-wrap gap-4 justify-center">
                <button className="px-10 py-4 bg-white text-black font-bold rounded-full hover:bg-gradient-to-r hover:from-violet-500 hover:to-cyan-500 hover:text-white transition-all duration-500">
                  Start Free Trial
                </button>
                <button className="px-10 py-4 border border-white/10 text-white/60 font-bold rounded-full hover:border-violet-500/50 transition-all flex items-center gap-2">
                  Watch Demo <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </Reveal>

            {/* Dashboard Preview */}
            <Reveal delay={0.4} y={30}>
              <div className="mt-20 p-6 bg-white/[0.03] border border-white/5 rounded-2xl backdrop-blur-sm">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {METRICS.map((m, i) => (
                    <div key={i} className="p-4 bg-white/[0.03] border border-white/5 rounded-xl text-left">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2">{m.label}</div>
                      <div className="text-2xl font-black mb-1">{m.value}</div>
                      <div className="text-xs font-bold" style={{ color: m.color }}>{m.change}</div>
                      <div className="mt-3 h-8 flex items-end gap-[2px]">
                        {Array.from({ length: 12 }).map((_, j) => (
                          <motion.div
                            key={j}
                            className="flex-1 rounded-sm"
                            style={{ background: m.color }}
                            initial={{ height: "20%" }}
                            animate={{ height: `${30 + Math.random() * 70}%` }}
                            transition={{ duration: 2, delay: j * 0.1, repeat: Infinity, repeatType: "reverse" }}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── FEATURES ──────────────────── */}
        <section className="py-32 bg-[#0d0d18]">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12">
            <Reveal>
              <div className="text-center mb-24">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-violet-400 block mb-4">Platform</span>
                <h2 className="text-5xl md:text-6xl font-black tracking-tighter">Everything You <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">Need.</span></h2>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {FEATURES.map((f, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="group p-8 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-violet-500/30 transition-all duration-500 cursor-default h-full">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-violet-500/20 flex items-center justify-center mb-6 group-hover:from-violet-500 group-hover:to-cyan-500 group-hover:border-transparent transition-all duration-500">
                      <f.icon className="w-5 h-5 text-violet-400 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-lg font-bold mb-3">{f.title}</h3>
                    <p className="text-sm text-white/40 leading-relaxed">{f.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRICING ──────────────────── */}
        <section className="py-32 bg-[#0a0a12]">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12">
            <Reveal>
              <div className="text-center mb-24">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-violet-400 block mb-4">Pricing</span>
                <h2 className="text-5xl md:text-6xl font-black tracking-tighter">Simple, <span className="text-violet-400">Transparent.</span></h2>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PLANS.map((p, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className={`p-8 rounded-2xl border h-full flex flex-col ${p.popular ? "bg-gradient-to-b from-violet-500/10 to-cyan-500/5 border-violet-500/30 relative" : "bg-white/[0.02] border-white/5"}`}>
                    {p.popular && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-gradient-to-r from-violet-500 to-cyan-500 text-[10px] font-bold uppercase tracking-widest rounded-full">Most Popular</div>}
                    <div className="mb-8">
                      <h3 className="text-xl font-bold mb-2">{p.name}</h3>
                      <div className="text-4xl font-black mb-2">{p.price}<span className="text-lg text-white/30 font-normal">{p.price !== "Custom" ? "/mo" : ""}</span></div>
                      <p className="text-sm text-white/40">{p.desc}</p>
                    </div>
                    <ul className="space-y-3 flex-1 mb-8">
                      {p.features.map((f, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm text-white/60">
                          <div className="w-1.5 h-1.5 rounded-full bg-violet-400" /> {f}
                        </li>
                      ))}
                    </ul>
                    <button className={`w-full py-4 font-bold rounded-full transition-all duration-500 ${p.popular ? "bg-white text-black hover:bg-violet-500 hover:text-white" : "bg-white/5 text-white hover:bg-white/10"}`}>
                      {p.price === "Custom" ? "Contact Sales" : "Start Free Trial"}
                    </button>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ─────────────────────── */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-transparent to-cyan-600/10" />
          <div className="relative z-10 max-w-[700px] mx-auto px-6 text-center">
            <Reveal>
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-6">
                See Your Data<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">Differently.</span>
              </h2>
              <p className="text-lg text-white/40 font-light max-w-md mx-auto mb-10">
                14-day free trial. No credit card required. Set up in 5 minutes.
              </p>
              <button className="px-12 py-5 bg-gradient-to-r from-violet-500 to-cyan-500 text-white font-bold rounded-full hover:opacity-90 transition-opacity">
                Get Started Free
              </button>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ── FOOTER ──────────────────────── */}
      <footer className="bg-[#050508] pt-24 pb-12 px-6">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-white" />
              </div>
              <span className="font-black tracking-tight">Prism</span>
            </div>
            <p className="text-sm text-white/30 leading-relaxed">Real-time product analytics for modern teams.</p>
          </div>
          {[
            { title: "Product", links: ["Features", "Pricing", "Integrations", "API"] },
            { title: "Resources", links: ["Docs", "Blog", "Changelog", "Status"] },
            { title: "Company", links: ["About", "Careers", "Security", "Contact"] },
          ].map((col, i) => (
            <div key={i}>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-violet-400 mb-6">{col.title}</h4>
              <ul className="space-y-3 text-sm text-white/30">
                {col.links.map(l => <li key={l}><Link href="#" className="hover:text-white transition-colors">{l}</Link></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-[1200px] mx-auto pt-8 border-t border-white/5 text-[10px] font-bold uppercase tracking-widest text-white/20 flex justify-between">
          <span>© 2026 PRISM ANALYTICS.</span>
          <span>SOC 2 TYPE II CERTIFIED</span>
        </div>
      </footer>
    </div>
  )
}
