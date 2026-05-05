"use client";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Rocket, Users, Code, Menu, X, Star, CheckCircle2, Zap, Shield, BarChart3, Cpu } from "lucide-react";
import "../premium.css";

const FEATURES = [
  { icon: <Code className="w-6 h-6" />, title: "Full-Stack Engineers", desc: "React, Node, Go, Rust — deep expertise across the modern stack." },
  { icon: <Zap className="w-6 h-6" />, title: "Rapid Delivery", desc: "Ship MVPs in 4 weeks. Scale features in sprints, not quarters." },
  { icon: <Shield className="w-6 h-6" />, title: "Security First", desc: "SOC 2 compliant processes. Pen-tested before every release." },
  { icon: <BarChart3 className="w-6 h-6" />, title: "Data Engineering", desc: "Real-time pipelines, ML infra, and analytics dashboards." },
  { icon: <Cpu className="w-6 h-6" />, title: "AI / ML Integration", desc: "LLM fine-tuning, RAG systems, and production ML ops." },
  { icon: <Users className="w-6 h-6" />, title: "Embedded Teams", desc: "Engineers that integrate with your culture, not just your codebase." },
];

const TESTIMONIALS = [
  { name: "Sarah Kim", role: "CTO, Finley", quote: "Véloce delivered our payment infra 3 weeks ahead of schedule. They feel like an extension of our team." },
  { name: "Marcus Chen", role: "CEO, Orbital", quote: "We went from idea to Series A with Véloce building our entire backend. Couldn't have done it without them." },
  { name: "Anna Bergström", role: "VP Eng, Klarna", quote: "Their engineers are senior, opinionated, and fast. Exactly what we needed for our migration." },
];

const PRICING = [
  { name: "SPRINT", price: "$15K", period: "/mo", features: ["1 senior engineer", "40h / week", "Async standup", "Code reviews"], cta: "Start_Sprint" },
  { name: "SQUAD", price: "$45K", period: "/mo", features: ["3 engineers", "Tech lead included", "Sprint planning", "CI/CD setup", "Weekly demos"], cta: "Build_Squad", featured: true },
  { name: "FLEET", price: "Custom", period: "", features: ["5+ engineers", "PM + Design", "Architecture", "SLA guarantee", "Dedicated Globe"], cta: "Contact_Sales" },
];

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay }}>{children}</motion.div>;
}

export default function VeloceTeamPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 50); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);

  return (
    <div className="premium-theme min-h-screen bg-[#08090c] text-white font-mono selection:bg-[#7c3aed] selection:text-white overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-0"><div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,#7c3aed15_0%,transparent_50%)]" /></div>

      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-[#08090c]/90 backdrop-blur-xl py-4 border-b border-white/5" : "bg-transparent py-10"}`}>
        <div className="max-w-[1500px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-3 text-xl font-black tracking-tighter"><div className="w-8 h-8 bg-[#7c3aed] rounded-lg flex items-center justify-center text-white"><Rocket className="w-4 h-4" /></div><span className="group-hover:text-[#7c3aed] transition-colors">VÉLOCE // <span className="text-white/30">TEAM</span></span></Link>
          <div className="hidden lg:flex items-center gap-10 text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">{["Services", "Work", "Pricing", "Contact"].map(l => <Link key={l} href="#" className="hover:text-[#7c3aed] transition-colors">{l}</Link>)}</div>
          <button className="px-6 py-2.5 bg-[#7c3aed] text-white text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all hidden md:block">Hire_Us</button>
          <button onClick={() => setMenuOpen(true)} className="lg:hidden"><Menu className="w-6 h-6" /></button>
        </div>
      </nav>

      <AnimatePresence>{menuOpen && (
        <motion.div initial={{ opacity: 0, x: "100%" }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: "100%" }} className="fixed inset-0 z-[100] bg-[#08090c] p-8 flex flex-col pt-32">
          <button onClick={() => setMenuOpen(false)} className="absolute top-10 right-8"><X className="w-10 h-10" /></button>
          {["Services", "Work", "Pricing", "Contact"].map(l => <Link key={l} href="#" onClick={() => setMenuOpen(false)} className="text-5xl font-black tracking-tighter uppercase mb-10">{l}</Link>)}
        </motion.div>
      )}</AnimatePresence>

      <section className="relative min-h-screen flex flex-col justify-center pt-20">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12 relative z-10">
          <Reveal>
            <div className="px-3 py-1 bg-[#7c3aed]/10 border border-[#7c3aed]/30 text-[#7c3aed] text-[9px] font-bold uppercase tracking-widest inline-block mb-8">HIRING_ENGINEERS</div>
            <h1 className="text-7xl md:text-9xl lg:text-[10rem] font-black leading-[0.8] tracking-tighter uppercase mb-10">Build <br /> <span className="text-[#7c3aed]">Faster.</span></h1>
            <p className="max-w-xl text-lg text-white/30 leading-relaxed font-light uppercase tracking-widest italic mb-12">Elite engineering teams on demand. Ship products, not promises.</p>
            <div className="flex flex-col sm:flex-row gap-6">
              <button className="px-12 py-5 bg-[#7c3aed] text-white text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all shadow-[0_0_50px_rgba(124,58,237,0.2)]">Hire_Engineers</button>
              <button className="px-12 py-5 border border-white/10 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all">See_Work</button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-40 bg-[#0a0b10] border-y border-white/5">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12">
          <Reveal><h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-24">What We <span className="text-[#7c3aed]">Build.</span></h2></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">{FEATURES.map((f, i) => <Reveal key={i} delay={i * 0.05}><div className="group p-10 bg-[#0d0e14] border border-white/5 hover:border-[#7c3aed]/30 rounded-3xl transition-all"><div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-[#7c3aed] mb-8 group-hover:bg-[#7c3aed] group-hover:text-white transition-all">{f.icon}</div><h3 className="text-xl font-black uppercase tracking-tighter mb-4 group-hover:text-[#7c3aed] transition-colors">{f.title}</h3><p className="text-sm text-white/30">{f.desc}</p></div></Reveal>)}</div>
        </div>
      </section>

      <section className="py-40 bg-[#08090c] text-center">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12">
          <Reveal><div className="grid grid-cols-2 md:grid-cols-4 gap-16">{[{ val: "120+", label: "PROJECTS" }, { val: "98%", label: "RETENTION" }, { val: "4.2", label: "AVG_WEEKS_TO_MVP" }, { val: "32", label: "ENGINEERS" }].map((s, i) => <div key={i} className="group"><div className="text-4xl md:text-5xl font-black text-white mb-2 group-hover:text-[#7c3aed] transition-colors">{s.val}</div><div className="text-[9px] font-black text-white/15 uppercase tracking-widest">{s.label}</div></div>)}</div></Reveal>
        </div>
      </section>

      <section className="py-40 bg-[#0a0b10] border-y border-white/5">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12">
          <Reveal><h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-24">Client <span className="text-[#7c3aed]">Voices.</span></h2></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">{TESTIMONIALS.map((t, i) => <Reveal key={i} delay={i * 0.1}><div className="p-10 bg-[#0d0e14] border border-white/5 rounded-3xl h-full flex flex-col"><div className="flex gap-1 mb-6">{[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 text-[#7c3aed] fill-[#7c3aed]" />)}</div><p className="text-base text-white/40 italic leading-relaxed flex-1 mb-8">&ldquo;{t.quote}&rdquo;</p><div className="pt-6 border-t border-white/5"><div className="font-black uppercase text-sm">{t.name}</div><div className="text-[10px] text-white/20 uppercase tracking-widest">{t.role}</div></div></div></Reveal>)}</div>
        </div>
      </section>

      <section className="py-40 bg-[#08090c]">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12">
          <Reveal><h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-24 uppercase text-center">Simple <span className="text-[#7c3aed]">Pricing.</span></h2></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">{PRICING.map((p, i) => <Reveal key={i} delay={i * 0.1}><div className={`group p-10 border rounded-3xl transition-all ${p.featured ? "bg-[#7c3aed]/5 border-[#7c3aed]/30 scale-105" : "bg-[#0d0e14] border-white/5"}`}><div className="text-[9px] font-bold text-[#7c3aed] uppercase tracking-widest mb-2">{p.name}</div><div className="text-4xl font-black mb-1">{p.price}<span className="text-lg text-white/30">{p.period}</span></div><div className="space-y-4 mt-8 pt-8 border-t border-white/5">{p.features.map((f, j) => <div key={j} className="flex items-center gap-3 text-[10px] text-white/40"><CheckCircle2 className="w-3.5 h-3.5 text-[#7c3aed]" />{f}</div>)}</div><button className={`mt-8 w-full py-3 text-[10px] font-black uppercase tracking-widest transition-all rounded-lg ${p.featured ? "bg-[#7c3aed] text-white hover:bg-white hover:text-black" : "border border-white/10 hover:bg-[#7c3aed] hover:text-white"}`}>{p.cta}</button></div></Reveal>)}</div>
        </div>
      </section>

      <section className="py-40 bg-[#0a0b10] text-center border-t border-white/5">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12">
          <Reveal>
            <h2 className="text-6xl md:text-9xl font-black tracking-tighter uppercase mb-12">Let&apos;s <span className="text-[#7c3aed]">Build.</span></h2>
            <p className="max-w-xl mx-auto text-sm text-white/30 mb-16 uppercase tracking-widest italic">Tell us what you&apos;re building. We&apos;ll assemble the perfect team.</p>
            <button className="px-16 py-6 bg-[#7c3aed] text-white text-[12px] font-black uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all shadow-[0_0_60px_rgba(124,58,237,0.15)]">Start_Conversation</button>
          </Reveal>
        </div>
      </section>

      <footer className="bg-[#08090c] border-t border-white/5 py-32 px-6 md:px-12">
        <div className="max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-24">
          <div className="col-span-1 md:col-span-2"><Link href="/" className="flex items-center gap-3 text-xl font-black tracking-tighter mb-10"><div className="w-8 h-8 bg-[#7c3aed] text-white rounded-lg flex items-center justify-center"><Rocket className="w-4 h-4" /></div><span>VÉLOCE // TEAM</span></Link><p className="text-[11px] text-white/15 uppercase tracking-[0.2em] max-w-sm italic">Elite engineering teams on demand.</p></div>
          <div><h4 className="text-[10px] font-black uppercase tracking-widest mb-10 text-[#7c3aed]">Company</h4><ul className="space-y-5 text-[10px] font-bold text-white/20 uppercase tracking-widest">{["Services", "Work", "Team", "Blog"].map(l => <li key={l}><Link href="#">{l}</Link></li>)}</ul></div>
          <div><h4 className="text-[10px] font-black uppercase tracking-widest mb-10 text-[#7c3aed]">Connect</h4><ul className="space-y-5 text-[10px] font-bold text-white/20 uppercase tracking-widest">{["LinkedIn", "Globe", "GitHub", "Contact"].map(l => <li key={l}><Link href="#">{l}</Link></li>)}</ul></div>
        </div>
        <div className="max-w-[1500px] mx-auto mt-32 pt-16 border-t border-white/5 text-center text-[9px] font-bold text-white/10 uppercase tracking-widest">&copy; 2026 VÉLOCE TEAM</div>
      </footer>
    </div>
  );
}