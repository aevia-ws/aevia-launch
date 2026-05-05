"use client";

import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, Suspense } from "react";
import Image from "next/image";
import { ArrowUpRight, Menu, X, Layers, ShieldCheck, Plus, Play, ArrowRight, ChevronDown, Monitor, LayoutGrid, TrendingUp, Target, BarChart, Users, Compass, PieChart, ArrowRightCircle } from "lucide-react";
import "../premium.css";

// ─── DATA ──────────────────────────────────────────────────────────────────

const VENTURES = [
  { 
    id: "01",
    title: "NEURAL_CAPITAL", 
    category: "Venture Equity",
    metric: "$2.4B AUM",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
    desc: "A high-growth venture fund specializing in early-stage neural network infrastructure and decentralized computing."
  },
  { 
    id: "02",
    title: "SABLE_VENTURES", 
    category: "Strategic Growth",
    metric: "42% Exit Rate",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
    desc: "Strategic advisory and capital deployment for luxury consumer brands transitioning to digital-first models."
  },
  { 
    id: "03",
    title: "DEEP_CORE_LP", 
    category: "Asset Management",
    metric: "12% Alpha",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80",
    desc: "Algorithmic asset management utilizing predictive spatial modeling to identify emerging global market enclaves."
  }
];

const METRICS = [
  { label: "Assets_Under_Mgmt", val: "$12.8B", desc: "Global capital deployed across high-fidelity venture and equity enclaves." },
  { label: "Partner_Network", val: "420+", desc: "Industry-leading operators providing strategic depth to our portfolio." },
  { label: "Historical_Yield", val: "24.2%", desc: "Consistent alpha generation across diverse market cycles and geographies." }
];

const STRATEGIES = [
  { icon: Target, title: "Precision Deployment", desc: "Identifying high-potential founders at the physical edge of innovation." },
  { icon: Compass, title: "Global Advisory", desc: "Navigating complex regulatory landscapes for cross-border venture scale." },
  { icon: BarChart, title: "Alpha Synthesis", desc: "Proprietary data models that predict market shifts before they manifest." },
  { icon: Users, title: "Operator Access", desc: "Direct access to our network of seasoned founders and industry titans." }
];

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function Reveal({ children, className = "", delay = 0, y = 20 }: { children: React.ReactNode; className?: string; delay?: number; y?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── MAIN SPA ────────────────────────────────────────────────────────────────

export default function AeviaAgencySPA() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeVenture, setActiveVenture] = useState(0);
  const { scrollY } = useScroll();
  
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 800], [1, 1.1]);
  const statsRotate = useTransform(scrollY, [0, 1000], [0, 15]);

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#1a1a1a] font-sans selection:bg-[#1a1a1a] selection:text-white">
      
      {/* ── GRAIN OVERLAY ── */}
      <div className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* ── NAVIGATION ── */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-10 mix-blend-difference"
      >
        <div className="flex items-center gap-4">
          <TrendingUp className="w-10 h-10 text-white" />
          <span className="text-2xl font-black tracking-tighter uppercase italic text-white">AEVIA<span className="text-white/30">//</span>AGENCY</span>
        </div>
        
        <div className="hidden lg:flex items-center gap-16 text-[10px] font-bold uppercase tracking-[0.5em] text-white/40">
          {["Ventures", "Metrics", "Strategy", "Portal"].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors">/{item}</a>
          ))}
        </div>

        <button 
          onClick={() => setMenuOpen(true)}
          className="w-16 h-16 flex items-center justify-center bg-white text-black group"
        >
          <Menu className="w-6 h-6 group-hover:scale-x-50 transition-transform" />
        </button>
      </motion.nav>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[60] bg-[#1a1a1a] text-white p-12 flex flex-col justify-between"
          >
            <div className="flex justify-between items-center border-b border-white/5 pb-12">
              <span className="text-xl font-black uppercase tracking-tighter italic">AEVIA//AGENCY</span>
              <button onClick={() => setMenuOpen(false)} className="w-12 h-12 flex items-center justify-center border border-white/10 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-col gap-12">
              {["VENTURE EQUITY", "GROWTH CAPITAL", "STRATEGIC ADVISORY", "PORTFOLIO ARCHIVE", "PARTNER PORTAL"].map((item, i) => (
                <motion.a 
                  key={item}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  href="#"
                  className="text-6xl md:text-9xl font-black uppercase italic tracking-tighter hover:text-white/40 transition-all leading-none"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </motion.a>
              ))}
            </div>
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.5em] border-t border-white/5 pt-12">
              <span>ALPHA_SYNTHESIS_GROUP</span>
              <span>EST. 2018 // SINGAPORE</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO SECTION ── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#1a1a1a]">
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="absolute inset-0 z-0"
        >
          <Image 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80" 
            alt="Hero Agency" 
            fill 
            className="object-cover grayscale brightness-50 opacity-40" 
            unoptimized 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#f8f9fa]" />
        </motion.div>

        <div className="relative z-10 text-center px-6">
          <Reveal>
            <span className="text-[10px] font-bold uppercase tracking-[1.5em] text-white/40 mb-12 block">Strategic Growth Enclave</span>
          </Reveal>
          <Reveal delay={0.2}>
            <h1 className="text-8xl md:text-[18rem] font-black tracking-tighter leading-[0.75] uppercase italic text-white mb-20">
              HIGH <br/> <span className="not-italic text-white/20">ALPHA.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="max-w-2xl mx-auto flex flex-col items-center gap-16 border-t border-white/10 pt-20">
              <p className="text-white/60 text-xl leading-relaxed font-light uppercase tracking-[0.2em] italic leading-loose text-center">
                Engineering high-growth ventures through strategic capital synthesis. Where venture equity meets operator-driven intelligence.
              </p>
              <div className="flex gap-8">
                <button className="px-16 py-6 bg-white text-black font-black uppercase text-xs tracking-[0.4em] hover:bg-black hover:text-white transition-all">
                  Access_Portal
                </button>
                <button className="px-16 py-6 border border-white/20 text-white font-black uppercase text-xs tracking-[0.4em] hover:bg-white/5 transition-colors">
                  Strategy_Manifest
                </button>
              </div>
            </div>
          </Reveal>
        </div>

        <motion.div 
          style={{ rotate: statsRotate }}
          className="absolute bottom-12 right-12 hidden lg:block"
        >
          <div className="p-12 bg-white/5 backdrop-blur-md border border-white/10 text-right space-y-4">
             <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 block">Market_Index</span>
             <h3 className="text-5xl font-black italic text-white">+14.2%</h3>
             <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Global_Ventures_Aggregate</p>
          </div>
        </motion.div>
      </section>

      {/* ── METRICS ── */}
      <section className="py-40 bg-[#f8f9fa]">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-[#1a1a1a]/5 border border-[#1a1a1a]/5">
            {METRICS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1} className="bg-white p-24 group hover:bg-[#1a1a1a] transition-all duration-700">
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#1a1a1a]/30 mb-12 block group-hover:text-white/30">{s.label}</span>
                <h3 className="text-7xl font-black italic text-[#1a1a1a] mb-8 group-hover:text-white transition-colors">{s.val}</h3>
                <p className="text-xs text-[#1a1a1a]/30 font-light tracking-widest uppercase italic leading-loose group-hover:text-white/30">
                  {s.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── VENTURE SHOWCASE ── */}
      <section className="py-40 bg-white relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16">
          <Reveal className="mb-32">
             <div className="flex flex-col lg:flex-row justify-between items-end gap-12 border-b border-[#1a1a1a]/10 pb-12">
               <h2 className="text-7xl md:text-[10rem] font-black italic tracking-tighter leading-[0.8] uppercase text-[#1a1a1a]">
                 Portfolio <br/> <span className="text-[#1a1a1a]/20 not-italic">Archive.</span>
               </h2>
               <div className="text-right">
                  <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#1a1a1a]/20 mb-4 block italic">Venture_Audit_Sequence</span>
                  <div className="flex gap-4">
                    {VENTURES.map((_, i) => (
                      <button 
                        key={i} 
                        onClick={() => setActiveVenture(i)}
                        className={`w-16 h-1 transition-all ${activeVenture === i ? "bg-[#1a1a1a] w-32" : "bg-[#1a1a1a]/10"}`}
                      />
                    ))}
                  </div>
               </div>
             </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
            <div className="lg:col-span-8 relative aspect-video rounded-sm overflow-hidden border border-[#1a1a1a]/5 group bg-[#f0f0f0]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeVenture}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image src={VENTURES[activeVenture].img} alt={VENTURES[activeVenture].title} fill className="object-cover grayscale brightness-110 group-hover:grayscale-0 transition-all duration-1000" unoptimized />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-60" />
                </motion.div>
              </AnimatePresence>
              <div className="absolute top-12 left-12 flex flex-col gap-4">
                 <span className="text-[10px] font-black uppercase tracking-widest bg-white/80 backdrop-blur-md px-6 py-2 border border-black/5">{VENTURES[activeVenture].metric}</span>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-12">
               <motion.div
                  key={activeVenture}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-12"
               >
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#1a1a1a]/60">{VENTURES[activeVenture].id} // VENTURE_TAG</span>
                 <h3 className="text-6xl font-black italic uppercase text-[#1a1a1a] tracking-tighter">{VENTURES[activeVenture].title}</h3>
                 <div className="space-y-6 border-y border-[#1a1a1a]/10 py-12">
                    <div className="flex justify-between items-center">
                       <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#1a1a1a]/30">Asset_Category</span>
                       <span className="text-sm font-black text-[#1a1a1a] uppercase tracking-widest">{VENTURES[activeVenture].category}</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#1a1a1a]/30">Strategy_Status</span>
                       <span className="text-sm font-black text-[#1a1a1a] uppercase tracking-widest italic">Hedge_Active</span>
                    </div>
                 </div>
                 <p className="text-[#1a1a1a]/40 text-lg font-light italic leading-loose uppercase tracking-wide">
                   {VENTURES[activeVenture].desc}
                 </p>
                 <button className="flex items-center gap-6 group">
                    <span className="text-[10px] font-bold uppercase tracking-[0.8em] text-[#1a1a1a]">Venture_Audit</span>
                    <div className="w-16 h-16 border border-[#1a1a1a]/10 rounded-full flex items-center justify-center group-hover:bg-[#1a1a1a] transition-all">
                       <ArrowUpRight className="w-6 h-6 text-[#1a1a1a] group-hover:text-white transition-colors" />
                    </div>
                 </button>
               </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STRATEGY ── */}
      <section className="py-40 bg-[#f8f9fa] border-y border-[#1a1a1a]/10">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16">
          <Reveal className="mb-32 text-center">
             <span className="text-[10px] font-bold uppercase tracking-[1em] text-[#1a1a1a]/40 mb-8 block italic">Operational Scope</span>
             <h2 className="text-7xl md:text-[10rem] font-black italic tracking-tighter leading-[0.8] uppercase text-[#1a1a1a]">
                Strategy <br/> <span className="text-[#1a1a1a]/20 not-italic">Synthesis.</span>
             </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#1a1a1a]/10 border border-[#1a1a1a]/10">
            {STRATEGIES.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1} className="bg-white p-12 group hover:bg-[#1a1a1a] transition-all duration-700">
                 <item.icon className="w-12 h-12 text-[#1a1a1a]/20 group-hover:text-white transition-colors mb-8" />
                 <h3 className="text-2xl font-black italic uppercase text-[#1a1a1a] group-hover:text-white mb-6 transition-colors">{item.title}</h3>
                 <p className="text-xs text-[#1a1a1a]/40 group-hover:text-white/40 font-light tracking-widest uppercase italic leading-loose transition-colors">
                   {item.desc}
                 </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARTNER PORTAL / ALPHA ── */}
      <section className="py-40 bg-white overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-8 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <Reveal>
             <div className="relative aspect-square bg-[#f8f9fa] border border-[#1a1a1a]/5 p-20 flex flex-col justify-center group overflow-hidden">
                <div className="absolute top-0 right-0 p-12">
                   <PieChart className="w-16 h-16 text-[#1a1a1a]/5 group-hover:text-[#1a1a1a]/10 transition-colors" />
                </div>
                <ArrowRightCircle className="w-16 h-16 text-[#1a1a1a] mb-12" />
                <h3 className="text-5xl font-black italic uppercase text-[#1a1a1a] mb-8">Partner <br/> <span className="text-[#1a1a1a]/20 not-italic">Access.</span></h3>
                <p className="text-[#1a1a1a]/40 text-lg leading-relaxed mb-12 font-light uppercase tracking-wide italic leading-loose">
                  Our strategic portal provides partners with real-time visibility into venture performance, capital deployment, and emerging market alpha. Vetting is mandatory for all access requests.
                </p>
                <div className="flex gap-12 text-[10px] font-bold uppercase tracking-[0.5em] text-[#1a1a1a]/30">
                   <span>[01] EQUITY_LEDGER</span>
                   <span>[02] ALPHA_DASHBOARD</span>
                </div>
             </div>
          </Reveal>
          <div className="space-y-24">
             <Reveal delay={0.2}>
                <span className="text-[10px] font-bold uppercase tracking-[1em] text-[#1a1a1a]/40 mb-8 block italic">Curation_Sequence</span>
                <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-none uppercase text-[#1a1a1a]">Alpha <br/> <span className="text-[#1a1a1a]/20 not-italic">Protocols.</span></h2>
             </Reveal>
             <div className="space-y-12">
                {[
                  { n: "01", t: "Asset Synthesis", d: "Merging algorithmic predictive models with seasoned operator intuition." },
                  { n: "02", t: "Risk Insulation", d: "High-fidelity hedging strategies to protect capital across volatile cycles." },
                  { n: "03", t: "Strategic Depth", d: "Leveraging our network for unparalleled access to private equity enclaves." }
                ].map((step, i) => (
                  <Reveal key={step.n} delay={i * 0.1 + 0.3} className="flex gap-12 group border-l border-[#1a1a1a]/10 pl-8 hover:border-[#1a1a1a] transition-colors">
                    <span className="text-4xl font-black italic text-[#1a1a1a]/10 group-hover:text-[#1a1a1a] transition-colors">{step.n}</span>
                    <div>
                      <h4 className="text-xl font-black uppercase italic text-[#1a1a1a] mb-2">{step.t}</h4>
                      <p className="text-xs text-[#1a1a1a]/40 font-light tracking-widest uppercase italic leading-loose">{step.d}</p>
                    </div>
                  </Reveal>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* ── CTA / INQUIRY ── */}
      <section className="py-40 bg-[#f8f9fa] relative">
         <div className="max-w-[1600px] mx-auto px-8 md:px-16">
            <div className="bg-[#1a1a1a] text-white p-24 lg:p-40 relative overflow-hidden flex flex-col items-center text-center group">
               <div className="absolute inset-0 opacity-10 grayscale brightness-110 group-hover:opacity-20 transition-opacity">
                  <Image src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80" alt="CTA Agency" fill className="object-cover" />
               </div>
               <Reveal>
                  <span className="text-[10px] font-bold uppercase tracking-[1em] text-white/50 mb-12 block italic">Mandatory Vetting</span>
                  <h2 className="text-7xl md:text-[12rem] font-black italic tracking-tighter leading-[0.8] uppercase mb-16">
                     Partner <br/> <span className="text-white/30 not-italic">Selection.</span>
                  </h2>
                  <div className="flex flex-wrap justify-center gap-12 relative z-10">
                     <button className="px-20 py-8 bg-white text-black font-black uppercase text-sm tracking-[0.5em] hover:italic transition-all">
                        Request_Selection
                     </button>
                     <button className="px-20 py-8 border border-white/20 text-white font-black uppercase text-sm tracking-[0.5em] hover:bg-white/5 transition-all">
                        Venture_Ledger
                     </button>
                  </div>
               </Reveal>
            </div>
         </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-white pt-40 pb-20 px-8 md:px-16 border-t border-[#1a1a1a]/10">
         <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-32 mb-40">
            <div className="lg:col-span-6">
               <div className="flex items-center gap-4 mb-12">
                 <TrendingUp className="w-10 h-10 text-[#1a1a1a]" />
                 <span className="text-3xl font-black tracking-tighter uppercase italic text-[#1a1a1a]">AEVIA<span className="text-[#1a1a1a]/30">//</span>AGENCY</span>
               </div>
               <p className="text-[#1a1a1a]/40 text-sm font-light leading-relaxed uppercase tracking-[0.3em] mb-12 italic max-w-md">
                 Securing the future of high-growth ventures through algorithmic alpha synthesis and strategic operator depth.
               </p>
               <div className="flex gap-12">
                 {["TERMINAL", "VENTURE", "LEDGER", "ALPHA"].map(s => (
                   <a key={s} href="#" className="text-[10px] font-bold hover:text-[#1a1a1a] text-[#1a1a1a]/30 transition-colors tracking-[0.5em]">[{s}]</a>
                 ))}
               </div>
            </div>
            
            <div className="lg:col-span-2">
               <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#1a1a1a]/40 mb-12">Capital</h4>
               <ul className="space-y-6 text-xs font-bold uppercase tracking-[0.4em]">
                 {["Ventures", "Metrics", "Strategy", "Journal"].map(item => (
                   <li key={item}><a href="#" className="hover:text-[#1a1a1a] transition-colors">{item}</a></li>
                 ))}
               </ul>
            </div>

            <div className="lg:col-span-4">
               <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#1a1a1a]/40 mb-12">Partner Inquiry</h4>
               <p className="text-sm text-[#1a1a1a]/40 font-light mb-12 italic uppercase tracking-[0.2em] leading-loose">
                 For new partner selection, strategic advisory, or capital orchestration, contact our primary command center.
               </p>
               <a href="mailto:partners@aevia.capital" className="text-3xl font-black italic hover:text-[#1a1a1a] transition-colors block border-b border-[#1a1a1a]/10 pb-8 uppercase tracking-tighter">
                  partners@aevia.capital
               </a>
            </div>
         </div>

         <div className="max-w-[1600px] mx-auto flex flex-col md:row items-center justify-between gap-12 text-[9px] font-bold uppercase tracking-[0.8em] text-[#1a1a1a]/20 border-t border-[#1a1a1a]/5 pt-20">
            <p>© 2024 AEVIA CAPITAL GROUP. ALL RIGHTS RESERVED. SINGAPORE // GLOBAL.</p>
            <div className="flex gap-16">
               <a href="#" className="hover:text-[#1a1a1a] transition-colors">[Alpha_Vault]</a>
               <a href="#" className="hover:text-[#1a1a1a] transition-colors">[Terms_of_Equity]</a>
            </div>
         </div>
      </footer>
    </div>
  );
}
