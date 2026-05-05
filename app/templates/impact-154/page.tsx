"use client";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Pen, Megaphone, Film, Menu, X, Star, CheckCircle2, Layers, Eye, Target, Sparkles } from "lucide-react";
import "../premium.css";

const SERVICES = [
  { icon: <Pen className="w-6 h-6" />, title: "Brand Identity", desc: "Logo, typography, color systems, and brand guidelines that resonate." },
  { icon: <Layers className="w-6 h-6" />, title: "Web Design", desc: "Responsive websites with motion, micro-interactions, and CMS." },
  { icon: <Film className="w-6 h-6" />, title: "Motion & Video", desc: "Brand films, product demos, and social content that converts." },
  { icon: <Megaphone className="w-6 h-6" />, title: "Digital Strategy", desc: "SEO, paid media, and content strategy aligned with business goals." },
  { icon: <Eye className="w-6 h-6" />, title: "UI/UX Design", desc: "User research, wireframes, prototypes, and design systems." },
  { icon: <Target className="w-6 h-6" />, title: "Conversion Optimization", desc: "A/B testing, funnel analysis, and landing page optimization." },
];

const PROJECTS = [
  { title: "Luma Rebrand", cat: "BRAND", desc: "Complete identity overhaul for AI startup." },
  { title: "Norde E-Commerce", cat: "WEB", desc: "Headless Shopify for Scandinavian furniture." },
  { title: "Axis Campaign", cat: "STRATEGY", desc: "Launch campaign generating 2M impressions in 48h." },
  { title: "Prism App", cat: "UI/UX", desc: "FinTech dashboard used by 50K daily active users." },
];

const TESTIMONIALS = [
  { name: "Leo Andersen", role: "CEO, Luma AI", quote: "Obliq understood our vision before we could articulate it. The rebrand doubled our inbound leads." },
  { name: "Hana Yoshida", role: "CMO, Norde", quote: "Our conversion rate tripled after the redesign. The ROI speaks for itself." },
  { name: "Jules Martin", role: "Founder, Axis", quote: "They don't just design — they think strategically. Every pixel has a purpose." },
];

const PRICING = [
  { name: "PROJECT", price: "$8K", period: "+", features: ["Single deliverable", "2 revisions", "30-day timeline", "Source files"], cta: "Start" },
  { name: "RETAINER", price: "$5K", period: "/mo", features: ["40h monthly", "Priority queue", "Globe access", "Strategy calls", "All formats"], cta: "Retain", featured: true },
  { name: "PARTNERSHIP", price: "Custom", period: "", features: ["Embedded team", "Quarterly planning", "Full brand ownership", "SLA", "Equity option"], cta: "Talk" },
];

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay }}>{children}</motion.div>;
}

export default function ObliqServicesPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 50); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);

  return (
    <div className="premium-theme min-h-screen bg-[#0a0a0a] text-white font-mono selection:bg-[#e11d48] selection:text-white overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-0"><div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,#e11d4812_0%,transparent_50%)]" /></div>

      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-[#0a0a0a]/90 backdrop-blur-xl py-4 border-b border-white/5" : "bg-transparent py-10"}`}>
        <div className="max-w-[1500px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-3 text-xl font-black tracking-tighter"><div className="w-8 h-8 bg-[#e11d48] rounded-sm flex items-center justify-center text-white"><Sparkles className="w-4 h-4" /></div><span className="group-hover:text-[#e11d48] transition-colors">OBLIQ // <span className="text-white/30">STUDIO</span></span></Link>
          <div className="hidden lg:flex items-center gap-10 text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">{["Services", "Work", "About", "Contact"].map(l => <Link key={l} href="#" className="hover:text-[#e11d48] transition-colors">{l}</Link>)}</div>
          <button className="px-6 py-2.5 bg-[#e11d48] text-white text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all hidden md:block">Get_Quote</button>
          <button onClick={() => setMenuOpen(true)} className="lg:hidden"><Menu className="w-6 h-6" /></button>
        </div>
      </nav>

      <AnimatePresence>{menuOpen && (
        <motion.div initial={{ opacity: 0, x: "100%" }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: "100%" }} className="fixed inset-0 z-[100] bg-[#0a0a0a] p-8 flex flex-col pt-32">
          <button onClick={() => setMenuOpen(false)} className="absolute top-10 right-8"><X className="w-10 h-10" /></button>
          {["Services", "Work", "About", "Contact"].map(l => <Link key={l} href="#" onClick={() => setMenuOpen(false)} className="text-5xl font-black tracking-tighter uppercase mb-10">{l}</Link>)}
        </motion.div>
      )}</AnimatePresence>

      <section className="relative min-h-screen flex flex-col justify-center pt-20">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12 relative z-10">
          <Reveal>
            <div className="px-3 py-1 bg-[#e11d48]/10 border border-[#e11d48]/30 text-[#e11d48] text-[9px] font-bold uppercase tracking-widest inline-block mb-8">CREATIVE_AGENCY</div>
            <h1 className="text-7xl md:text-9xl lg:text-[10rem] font-black leading-[0.8] tracking-tighter uppercase mb-10">Design <br /> That <br /> <span className="text-[#e11d48]">Converts.</span></h1>
            <p className="max-w-xl text-lg text-white/30 leading-relaxed font-light uppercase tracking-widest italic mb-12">Brand, web, motion, and strategy. We build brands that people remember.</p>
            <div className="flex flex-col sm:flex-row gap-6">
              <button className="px-12 py-5 bg-[#e11d48] text-white text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all">View_Work</button>
              <button className="px-12 py-5 border border-white/10 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all">Get_Quote</button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-40 bg-[#0c0c0c] border-y border-white/5">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <Reveal>
            <span className="text-[10px] text-[#e11d48] font-bold uppercase tracking-[0.4em] mb-6 block">About</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.85] mb-8 uppercase">Oblique <span className="text-[#e11d48]">Thinking.</span></h2>
            <p className="text-base text-white/30 leading-relaxed mb-12">Founded in Berlin, Obliq is a 15-person creative studio that blends strategy with craft. We work with startups and enterprise brands to create work that moves needles — not just pixels.</p>
            <div className="flex gap-16">{[{ val: "80+", label: "BRANDS" }, { val: "12", label: "AWARDS" }, { val: "15", label: "TEAM" }].map((s, i) => <div key={i}><div className="text-3xl font-black text-[#e11d48]">{s.val}</div><div className="text-[9px] font-bold text-white/15 uppercase tracking-widest">{s.label}</div></div>)}</div>
          </Reveal>
          <Reveal delay={0.15}><div className="w-full aspect-square bg-gradient-to-br from-[#e11d48]/10 to-transparent rounded-3xl flex items-center justify-center"><Sparkles className="w-20 h-20 text-[#e11d48]/15" /></div></Reveal>
        </div>
      </section>

      <section className="py-40 bg-[#0a0a0a]">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12">
          <Reveal><h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-24">Our <span className="text-[#e11d48]">Services.</span></h2></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">{SERVICES.map((s, i) => <Reveal key={i} delay={i * 0.05}><div className="group p-10 bg-[#0c0c0c] border border-white/5 hover:border-[#e11d48]/30 rounded-3xl transition-all"><div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-[#e11d48] mb-8 group-hover:bg-[#e11d48] group-hover:text-white transition-all">{s.icon}</div><h3 className="text-xl font-black uppercase tracking-tighter mb-4 group-hover:text-[#e11d48] transition-colors">{s.title}</h3><p className="text-sm text-white/30">{s.desc}</p></div></Reveal>)}</div>
        </div>
      </section>

      <section className="py-40 bg-[#0c0c0c] border-y border-white/5">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12">
          <Reveal><h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-24">Selected <span className="text-[#e11d48]">Work.</span></h2></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{PROJECTS.map((p, i) => <Reveal key={i} delay={i * 0.05}><div className="group cursor-pointer"><div className="w-full aspect-[16/10] bg-gradient-to-br from-[#e11d48]/10 to-transparent rounded-2xl flex items-center justify-center mb-6 group-hover:from-[#e11d48]/20 transition-all"><Pen className="w-12 h-12 text-[#e11d48]/15" /></div><span className="text-[9px] font-bold text-[#e11d48] uppercase tracking-widest">{p.cat}</span><h3 className="text-2xl font-black uppercase tracking-tighter group-hover:text-[#e11d48] transition-colors mb-2">{p.title}</h3><p className="text-sm text-white/30">{p.desc}</p></div></Reveal>)}</div>
        </div>
      </section>

      <section className="py-40 bg-[#0a0a0a]">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12">
          <Reveal><h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-24">Client <span className="text-[#e11d48]">Words.</span></h2></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">{TESTIMONIALS.map((t, i) => <Reveal key={i} delay={i * 0.1}><div className="p-10 bg-[#0c0c0c] border border-white/5 rounded-3xl h-full flex flex-col"><div className="flex gap-1 mb-6">{[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 text-[#e11d48] fill-[#e11d48]" />)}</div><p className="text-base text-white/40 italic leading-relaxed flex-1 mb-8">&ldquo;{t.quote}&rdquo;</p><div className="pt-6 border-t border-white/5"><div className="font-black uppercase text-sm">{t.name}</div><div className="text-[10px] text-white/20 uppercase tracking-widest">{t.role}</div></div></div></Reveal>)}</div>
        </div>
      </section>

      <section className="py-40 bg-[#0c0c0c] border-y border-white/5">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12">
          <Reveal><h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-24 uppercase text-center">Our <span className="text-[#e11d48]">Pricing.</span></h2></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">{PRICING.map((p, i) => <Reveal key={i} delay={i * 0.1}><div className={`group p-10 border rounded-3xl transition-all ${p.featured ? "bg-[#e11d48]/5 border-[#e11d48]/30 scale-105" : "bg-[#111] border-white/5"}`}><div className="text-[9px] font-bold text-[#e11d48] uppercase tracking-widest mb-2">{p.name}</div><div className="text-4xl font-black mb-1">{p.price}<span className="text-lg text-white/30">{p.period}</span></div><div className="space-y-4 mt-8 pt-8 border-t border-white/5">{p.features.map((f, j) => <div key={j} className="flex items-center gap-3 text-[10px] text-white/40"><CheckCircle2 className="w-3.5 h-3.5 text-[#e11d48]" />{f}</div>)}</div><button className={`mt-8 w-full py-3 text-[10px] font-black uppercase tracking-widest transition-all rounded-lg ${p.featured ? "bg-[#e11d48] text-white" : "border border-white/10 hover:bg-[#e11d48] hover:text-white"}`}>{p.cta}</button></div></Reveal>)}</div>
        </div>
      </section>

      <section className="py-40 bg-[#0a0a0a] text-center">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12"><Reveal>
          <h2 className="text-6xl md:text-9xl font-black tracking-tighter uppercase mb-12">Start A <span className="text-[#e11d48]">Project.</span></h2>
          <button className="px-16 py-6 bg-[#e11d48] text-white text-[12px] font-black uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all">Get_In_Touch</button>
        </Reveal></div>
      </section>

      <footer className="bg-[#0a0a0a] border-t border-white/5 py-32 px-6 md:px-12">
        <div className="max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-24">
          <div className="col-span-1 md:col-span-2"><Link href="/" className="flex items-center gap-3 text-xl font-black tracking-tighter mb-10"><div className="w-8 h-8 bg-[#e11d48] text-white rounded-sm flex items-center justify-center"><Sparkles className="w-4 h-4" /></div><span>OBLIQ // STUDIO</span></Link><p className="text-[11px] text-white/15 uppercase tracking-[0.2em] max-w-sm italic">Creative agency. Berlin.</p></div>
          <div><h4 className="text-[10px] font-black uppercase tracking-widest mb-10 text-[#e11d48]">Studio</h4><ul className="space-y-5 text-[10px] font-bold text-white/20 uppercase tracking-widest">{["Services", "Work", "About"].map(l => <li key={l}><Link href="#">{l}</Link></li>)}</ul></div>
          <div><h4 className="text-[10px] font-black uppercase tracking-widest mb-10 text-[#e11d48]">Social</h4><ul className="space-y-5 text-[10px] font-bold text-white/20 uppercase tracking-widest">{["Globe", "Globe", "LinkedIn"].map(l => <li key={l}><Link href="#">{l}</Link></li>)}</ul></div>
        </div>
        <div className="max-w-[1500px] mx-auto mt-32 pt-16 border-t border-white/5 text-center text-[9px] font-bold text-white/10 uppercase tracking-widest">&copy; 2026 OBLIQ STUDIO</div>
      </footer>
    </div>
  );
}