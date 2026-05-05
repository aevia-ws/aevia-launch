"use client";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Frame, Palette, Eye, Menu, X, Star, CheckCircle2, Sparkles, Image, Layers, Grid3X3 } from "lucide-react";
import "../premium.css";

const COLLECTIONS = [
  { title: "Chromatic Drift", artist: "Yuki Tanaka", medium: "DIGITAL", year: "2026" },
  { title: "Urban Decay", artist: "Marcus Cole", medium: "PHOTOGRAPHY", year: "2025" },
  { title: "Fluid State", artist: "Elena Voss", medium: "GENERATIVE", year: "2026" },
  { title: "Silent Grid", artist: "Amir Hassan", medium: "SCULPTURE", year: "2025" },
];

const FEATURES = [
  { icon: <Frame className="w-6 h-6" />, title: "Curated Collections", desc: "Hand-selected works from emerging and established digital artists worldwide." },
  { icon: <Eye className="w-6 h-6" />, title: "Virtual Gallery", desc: "Immersive 3D walkthroughs of every exhibition from anywhere in the world." },
  { icon: <Sparkles className="w-6 h-6" />, title: "Artist Residencies", desc: "Three-month funded programs for artists pushing digital boundaries." },
  { icon: <Image className="w-6 h-6" />, title: "Limited Editions", desc: "Authenticated prints and digital editions with provenance tracking." },
  { icon: <Layers className="w-6 h-6" />, title: "Collector Services", desc: "Advisory, framing, installation, and collection management." },
  { icon: <Grid3X3 className="w-6 h-6" />, title: "Exhibition Design", desc: "Full-service exhibition curation, design, and production." },
];

const TESTIMONIALS = [
  { name: "Sophie Laurent", role: "Collector, Paris", quote: "Art Index introduced me to artists I'd never have found. My collection has never been more exciting." },
  { name: "James Park", role: "Artist", quote: "The residency changed my practice. The support and exposure were transformative." },
  { name: "Dr. Amara Osei", role: "Museum Director", quote: "Their curation is exceptional. We've partnered on three exhibitions and each exceeded expectations." },
];

const PRICING = [
  { name: "VISITOR", price: "Free", period: "", features: ["Browse collections", "Artist profiles", "Exhibition calendar", "Newsletter"], cta: "Join_Free" },
  { name: "COLLECTOR", price: "$29", period: "/mo", features: ["Early access", "Virtual previews", "Advisory calls", "Priority purchasing", "Provenance docs"], cta: "Subscribe", featured: true },
  { name: "PATRON", price: "$199", period: "/mo", features: ["Private viewings", "Studio visits", "Custom commissions", "VIP events", "Tax advisory"], cta: "Become_Patron" },
];

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay }}>{children}</motion.div>;
}

export default function ArtIndexPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 50); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);

  return (
    <div className="premium-theme min-h-screen bg-[#0a0a0a] text-white font-mono selection:bg-[#a855f7] selection:text-black overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-0"><div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,#a855f715_0%,transparent_50%)]" /></div>

      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-[#0a0a0a]/90 backdrop-blur-xl py-4 border-b border-white/5" : "bg-transparent py-10"}`}>
        <div className="max-w-[1500px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-3 text-xl font-black tracking-tighter"><div className="w-8 h-8 bg-[#a855f7] rounded-full flex items-center justify-center text-white"><Palette className="w-4 h-4" /></div><span className="group-hover:text-[#a855f7] transition-colors">ART // <span className="text-white/30">INDEX</span></span></Link>
          <div className="hidden lg:flex items-center gap-10 text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">{["Collections", "Artists", "Events", "Join"].map(l => <Link key={l} href="#" className="hover:text-[#a855f7] transition-colors">{l}</Link>)}</div>
          <button className="px-6 py-2.5 bg-[#a855f7] text-white text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all hidden md:block">Join_Now</button>
          <button onClick={() => setMenuOpen(true)} className="lg:hidden"><Menu className="w-6 h-6" /></button>
        </div>
      </nav>

      <AnimatePresence>{menuOpen && (
        <motion.div initial={{ opacity: 0, x: "100%" }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: "100%" }} className="fixed inset-0 z-[100] bg-[#0a0a0a] p-8 flex flex-col pt-32">
          <button onClick={() => setMenuOpen(false)} className="absolute top-10 right-8"><X className="w-10 h-10" /></button>
          {["Collections", "Artists", "Events", "Join"].map(l => <Link key={l} href="#" onClick={() => setMenuOpen(false)} className="text-5xl font-black tracking-tighter uppercase mb-10">{l}</Link>)}
        </motion.div>
      )}</AnimatePresence>

      <section className="relative min-h-screen flex flex-col justify-center pt-20">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12 relative z-10">
          <Reveal>
            <div className="px-3 py-1 bg-[#a855f7]/10 border border-[#a855f7]/30 text-[#a855f7] text-[9px] font-bold uppercase tracking-widest inline-block mb-8">NOW_EXHIBITING</div>
            <h1 className="text-7xl md:text-9xl lg:text-[10rem] font-black leading-[0.8] tracking-tighter uppercase mb-10">Art <br /> Without <br /> <span className="text-[#a855f7]">Borders.</span></h1>
            <p className="max-w-xl text-lg text-white/30 leading-relaxed font-light uppercase tracking-widest italic mb-12">Digital art gallery and collector platform. Discover, collect, and commission extraordinary work.</p>
            <div className="flex flex-col sm:flex-row gap-6">
              <button className="px-12 py-5 bg-[#a855f7] text-white text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all shadow-[0_0_50px_rgba(168,85,247,0.2)]">View_Collections</button>
              <button className="px-12 py-5 border border-white/10 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all">Meet_Artists</button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-40 bg-[#0c0c0c] border-y border-white/5">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12">
          <Reveal><h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-24">Current <span className="text-[#a855f7]">Shows.</span></h2></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{COLLECTIONS.map((c, i) => <Reveal key={i} delay={i * 0.05}><div className="group cursor-pointer"><div className="w-full aspect-[16/10] bg-gradient-to-br from-[#a855f7]/10 to-[#a855f7]/5 rounded-2xl flex items-center justify-center mb-6 group-hover:from-[#a855f7]/20 transition-all"><Frame className="w-12 h-12 text-[#a855f7]/15" /></div><div className="flex items-center gap-4 mb-2"><span className="text-[9px] font-bold text-[#a855f7] uppercase tracking-widest">{c.medium}</span><span className="text-[9px] text-white/20 uppercase tracking-widest">{c.year}</span></div><h3 className="text-2xl font-black uppercase tracking-tighter group-hover:text-[#a855f7] transition-colors mb-1">{c.title}</h3><p className="text-sm text-white/30">{c.artist}</p></div></Reveal>)}</div>
        </div>
      </section>

      <section className="py-40 bg-[#0a0a0a]">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12">
          <Reveal><h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-24">What We <span className="text-[#a855f7]">Offer.</span></h2></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">{FEATURES.map((f, i) => <Reveal key={i} delay={i * 0.05}><div className="group p-10 bg-[#0c0c0c] border border-white/5 hover:border-[#a855f7]/30 rounded-3xl transition-all"><div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-[#a855f7] mb-8 group-hover:bg-[#a855f7] group-hover:text-white transition-all">{f.icon}</div><h3 className="text-xl font-black uppercase tracking-tighter mb-4 group-hover:text-[#a855f7] transition-colors">{f.title}</h3><p className="text-sm text-white/30">{f.desc}</p></div></Reveal>)}</div>
        </div>
      </section>

      <section className="py-40 bg-[#0c0c0c] border-y border-white/5">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12">
          <Reveal><h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-24">Collector <span className="text-[#a855f7]">Voices.</span></h2></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">{TESTIMONIALS.map((t, i) => <Reveal key={i} delay={i * 0.1}><div className="p-10 bg-[#111] border border-white/5 rounded-3xl h-full flex flex-col"><div className="flex gap-1 mb-6">{[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 text-[#a855f7] fill-[#a855f7]" />)}</div><p className="text-base text-white/40 italic leading-relaxed flex-1 mb-8">&ldquo;{t.quote}&rdquo;</p><div className="pt-6 border-t border-white/5"><div className="font-black uppercase text-sm">{t.name}</div><div className="text-[10px] text-white/20 uppercase tracking-widest">{t.role}</div></div></div></Reveal>)}</div>
        </div>
      </section>

      <section className="py-40 bg-[#0a0a0a]">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12">
          <Reveal><h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-24 uppercase text-center">Membership <span className="text-[#a855f7]">Plans.</span></h2></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">{PRICING.map((p, i) => <Reveal key={i} delay={i * 0.1}><div className={`group p-10 border rounded-3xl transition-all ${p.featured ? "bg-[#a855f7]/5 border-[#a855f7]/30 scale-105" : "bg-[#0c0c0c] border-white/5"}`}><div className="text-[9px] font-bold text-[#a855f7] uppercase tracking-widest mb-2">{p.name}</div><div className="text-4xl font-black mb-1">{p.price}<span className="text-lg text-white/30">{p.period}</span></div><div className="space-y-4 mt-8 pt-8 border-t border-white/5">{p.features.map((f, j) => <div key={j} className="flex items-center gap-3 text-[10px] text-white/40"><CheckCircle2 className="w-3.5 h-3.5 text-[#a855f7]" />{f}</div>)}</div><button className={`mt-8 w-full py-3 text-[10px] font-black uppercase tracking-widest transition-all rounded-lg ${p.featured ? "bg-[#a855f7] text-white" : "border border-white/10 hover:bg-[#a855f7] hover:text-white"}`}>{p.cta}</button></div></Reveal>)}</div>
        </div>
      </section>

      <section className="py-40 bg-[#0c0c0c] text-center border-t border-white/5">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12"><Reveal>
          <h2 className="text-6xl md:text-9xl font-black tracking-tighter uppercase mb-12">See The <span className="text-[#a855f7]">Art.</span></h2>
          <button className="px-16 py-6 bg-[#a855f7] text-white text-[12px] font-black uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all shadow-[0_0_60px_rgba(168,85,247,0.15)]">Enter_Gallery</button>
        </Reveal></div>
      </section>

      <footer className="bg-[#0a0a0a] border-t border-white/5 py-32 px-6 md:px-12">
        <div className="max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-24">
          <div className="col-span-1 md:col-span-2"><Link href="/" className="flex items-center gap-3 text-xl font-black tracking-tighter mb-10"><div className="w-8 h-8 bg-[#a855f7] text-white rounded-full flex items-center justify-center"><Palette className="w-4 h-4" /></div><span>ART // INDEX</span></Link><p className="text-[11px] text-white/15 uppercase tracking-[0.2em] max-w-sm italic">Digital art gallery & collector platform.</p></div>
          <div><h4 className="text-[10px] font-black uppercase tracking-widest mb-10 text-[#a855f7]">Gallery</h4><ul className="space-y-5 text-[10px] font-bold text-white/20 uppercase tracking-widest">{["Collections", "Artists", "Events"].map(l => <li key={l}><Link href="#">{l}</Link></li>)}</ul></div>
          <div><h4 className="text-[10px] font-black uppercase tracking-widest mb-10 text-[#a855f7]">Connect</h4><ul className="space-y-5 text-[10px] font-bold text-white/20 uppercase tracking-widest">{["Instagram", "Twitter", "Contact"].map(l => <li key={l}><Link href="#">{l}</Link></li>)}</ul></div>
        </div>
        <div className="max-w-[1500px] mx-auto mt-32 pt-16 border-t border-white/5 text-center text-[9px] font-bold text-white/10 uppercase tracking-widest">&copy; 2026 ART INDEX</div>
      </footer>
    </div>
  );
}