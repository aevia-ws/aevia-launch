"use client";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Compass, MapPin, Camera, Menu, X, Star, Globe, Plane, Mountain, Sun, BookOpen, CheckCircle2 } from "lucide-react";
import "../premium.css";

const DESTINATIONS = [
  { title: "Kyoto, Japan", tag: "CULTURE", desc: "Ancient temples meet modern minimalism." },
  { title: "Santorini, Greece", tag: "ISLANDS", desc: "Whitewashed cliffs and sapphire waters." },
  { title: "Marrakech, Morocco", tag: "ADVENTURE", desc: "Spice-scented souks and desert luxury." },
  { title: "Patagonia, Argentina", tag: "WILDERNESS", desc: "Glaciers and peaks at the end of the world." },
];

const SERVICES = [
  { icon: <Plane className="w-6 h-6" />, title: "Custom Itineraries", desc: "Handcrafted plans tailored to your style." },
  { icon: <Mountain className="w-6 h-6" />, title: "Adventure Expeditions", desc: "Guided treks with certified local experts." },
  { icon: <Camera className="w-6 h-6" />, title: "Photography Tours", desc: "Capture the world with pro photographers." },
  { icon: <Globe className="w-6 h-6" />, title: "Cultural Immersion", desc: "Homestays and ceremonies with locals." },
  { icon: <Sun className="w-6 h-6" />, title: "Luxury Retreats", desc: "Five-star wellness in exclusive destinations." },
  { icon: <BookOpen className="w-6 h-6" />, title: "Travel Journal", desc: "Stories and insider tips from our team." },
];

const TESTIMONIALS = [
  { name: "Claire Dubois", role: "Solo Traveler", quote: "Wanderer planned the most incredible three weeks of my life." },
  { name: "Raj Mehta", role: "Honeymoon", quote: "Our Santorini trip was flawless. Hidden spots you won't find on Instagram." },
  { name: "Emily Chen", role: "Family Trip", quote: "Traveling with two kids seemed daunting. Wanderer made it effortless." },
];

const PRICING = [
  { name: "EXPLORER", price: "$1,200", period: "/trip", features: ["3-day itinerary", "Hotel recs", "Dining guide", "Chat support"], cta: "Plan_Trip" },
  { name: "VOYAGER", price: "$3,500", period: "/trip", features: ["7-14 day plan", "Boutique bookings", "Private guides", "Transfers", "Concierge"], cta: "Start", featured: true },
  { name: "ODYSSEY", price: "Custom", period: "", features: ["Multi-country", "Private jet", "Luxury lodges", "Trip director", "Insurance"], cta: "Contact" },
];

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay }}>{children}</motion.div>;
}

export default function WandererMagPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  useEffect(() => { const h = () => setScrolled(window.scrollY > 50); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);

  return (
    <div className="premium-theme min-h-screen bg-[#faf8f4] text-[#1a1a18] font-mono selection:bg-[#c8956c] selection:text-white overflow-x-hidden">
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-[#faf8f4]/90 backdrop-blur-xl py-4 border-b border-[#1a1a18]/5" : "bg-transparent py-10"}`}>
        <div className="max-w-[1500px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-3 text-xl font-black tracking-tighter"><div className="w-8 h-8 bg-[#c8956c] rounded-full flex items-center justify-center text-white"><Compass className="w-4 h-4" /></div><span className="group-hover:text-[#c8956c] transition-colors">WANDERER // <span className="text-[#1a1a18]/30">MAG</span></span></Link>
          <div className="hidden lg:flex items-center gap-10 text-[10px] font-bold uppercase tracking-[0.3em] text-[#1a1a18]/30">{["Destinations", "Services", "Journal", "Contact"].map(l => <Link key={l} href="#" className="hover:text-[#c8956c] transition-colors">{l}</Link>)}</div>
          <button className="px-6 py-2.5 bg-[#1a1a18] text-[#faf8f4] text-[10px] font-black uppercase tracking-widest hover:bg-[#c8956c] transition-all hidden md:block">Plan_Trip</button>
          <button onClick={() => setMenuOpen(true)} className="lg:hidden"><Menu className="w-6 h-6" /></button>
        </div>
      </nav>

      <AnimatePresence>{menuOpen && (
        <motion.div initial={{ opacity: 0, x: "100%" }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: "100%" }} className="fixed inset-0 z-[100] bg-[#faf8f4] p-8 flex flex-col pt-32">
          <button onClick={() => setMenuOpen(false)} className="absolute top-10 right-8"><X className="w-10 h-10" /></button>
          {["Destinations", "Services", "Journal", "Contact"].map(l => <Link key={l} href="#" onClick={() => setMenuOpen(false)} className="text-5xl font-black tracking-tighter uppercase mb-10">{l}</Link>)}
        </motion.div>
      )}</AnimatePresence>

      <section className="relative min-h-screen flex flex-col justify-center pt-20">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12 w-full relative z-10">
          <Reveal>
            <div className="px-3 py-1 bg-[#c8956c]/10 border border-[#c8956c]/30 text-[#c8956c] text-[9px] font-bold uppercase tracking-widest inline-block mb-8">ISSUE_47 // SPRING 2026</div>
            <h1 className="text-7xl md:text-9xl lg:text-[10rem] font-black leading-[0.8] tracking-tighter uppercase mb-10">Travel <br /> With <br /> <span className="text-[#c8956c]">Purpose.</span></h1>
            <p className="max-w-xl text-lg text-[#1a1a18]/40 leading-relaxed font-light uppercase tracking-widest italic mb-12">Curated journeys and transformative experiences. Travel that changes you.</p>
            <div className="flex flex-col sm:flex-row gap-6">
              <button className="px-12 py-5 bg-[#c8956c] text-white text-[10px] font-black uppercase tracking-[0.4em] hover:bg-[#1a1a18] transition-all">Explore</button>
              <button className="px-12 py-5 border border-[#1a1a18]/10 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-[#1a1a18] hover:text-white transition-all">Read_Journal</button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-40 bg-white border-y border-[#1a1a18]/5">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <Reveal>
            <span className="text-[10px] text-[#c8956c] font-bold uppercase tracking-[0.4em] mb-6 block">About</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.85] mb-8 uppercase">Stories Worth <span className="text-[#c8956c]">Living.</span></h2>
            <p className="text-base text-[#1a1a18]/40 leading-relaxed mb-12">Founded by travel journalists, Wanderer connects curious travelers with transformative experiences. We don&apos;t sell packages — we craft journeys.</p>
            <div className="flex gap-16">{[{ val: "12K+", label: "TRIPS" }, { val: "84", label: "COUNTRIES" }, { val: "4.9", label: "RATING" }].map((s, i) => <div key={i}><div className="text-3xl font-black text-[#c8956c]">{s.val}</div><div className="text-[9px] font-bold text-[#1a1a18]/20 uppercase tracking-widest">{s.label}</div></div>)}</div>
          </Reveal>
          <Reveal delay={0.15}><div className="w-full aspect-square bg-gradient-to-br from-[#c8956c]/10 to-[#c8956c]/5 rounded-3xl flex items-center justify-center"><Compass className="w-20 h-20 text-[#c8956c]/15" /></div></Reveal>
        </div>
      </section>

      <section className="py-40 bg-[#faf8f4]">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12">
          <Reveal><h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-24">Featured <span className="text-[#c8956c]">Destinations.</span></h2></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{DESTINATIONS.map((d, i) => <Reveal key={i} delay={i * 0.05}><div className="group cursor-pointer"><div className="w-full aspect-[16/10] bg-gradient-to-br from-[#c8956c]/10 to-[#c8956c]/5 rounded-2xl flex items-center justify-center mb-6 group-hover:from-[#c8956c]/20 transition-all"><MapPin className="w-12 h-12 text-[#c8956c]/15" /></div><span className="text-[9px] font-bold text-[#c8956c] uppercase tracking-widest">{d.tag}</span><h3 className="text-2xl font-black uppercase tracking-tighter group-hover:text-[#c8956c] transition-colors mb-2">{d.title}</h3><p className="text-sm text-[#1a1a18]/30">{d.desc}</p></div></Reveal>)}</div>
        </div>
      </section>

      <section className="py-40 bg-white border-y border-[#1a1a18]/5">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12">
          <Reveal><h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-24">Our <span className="text-[#c8956c]">Services.</span></h2></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">{SERVICES.map((s, i) => <Reveal key={i} delay={i * 0.05}><div className="group p-10 bg-[#faf8f4] border border-[#1a1a18]/5 hover:border-[#c8956c]/30 rounded-3xl transition-all"><div className="w-14 h-14 bg-[#c8956c]/10 rounded-2xl flex items-center justify-center text-[#c8956c] mb-8 group-hover:bg-[#c8956c] group-hover:text-white transition-all">{s.icon}</div><h3 className="text-xl font-black uppercase tracking-tighter mb-4 group-hover:text-[#c8956c] transition-colors">{s.title}</h3><p className="text-sm text-[#1a1a18]/40">{s.desc}</p></div></Reveal>)}</div>
        </div>
      </section>

      <section className="py-40 bg-[#faf8f4]">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12">
          <Reveal><h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-24">Traveler <span className="text-[#c8956c]">Stories.</span></h2></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">{TESTIMONIALS.map((t, i) => <Reveal key={i} delay={i * 0.1}><div className="p-10 bg-white border border-[#1a1a18]/5 rounded-3xl h-full flex flex-col"><div className="flex gap-1 mb-6">{[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 text-[#c8956c] fill-[#c8956c]" />)}</div><p className="text-base text-[#1a1a18]/50 italic leading-relaxed flex-1 mb-8">&ldquo;{t.quote}&rdquo;</p><div className="pt-6 border-t border-[#1a1a18]/5"><div className="font-black uppercase text-sm">{t.name}</div><div className="text-[10px] text-[#1a1a18]/30 uppercase tracking-widest">{t.role}</div></div></div></Reveal>)}</div>
        </div>
      </section>

      <section className="py-40 bg-white border-y border-[#1a1a18]/5">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12">
          <Reveal><h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-24 uppercase text-center">Trip <span className="text-[#c8956c]">Plans.</span></h2></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">{PRICING.map((p, i) => <Reveal key={i} delay={i * 0.1}><div className={`group p-10 border rounded-3xl transition-all ${p.featured ? "bg-[#c8956c]/5 border-[#c8956c]/30 scale-105" : "bg-[#faf8f4] border-[#1a1a18]/5"}`}><div className="text-[9px] font-bold text-[#c8956c] uppercase tracking-widest mb-2">{p.name}</div><div className="text-4xl font-black mb-1">{p.price}<span className="text-lg text-[#1a1a18]/30">{p.period}</span></div><div className="space-y-4 mt-8 pt-8 border-t border-[#1a1a18]/5">{p.features.map((f, j) => <div key={j} className="flex items-center gap-3 text-[10px] text-[#1a1a18]/50"><CheckCircle2 className="w-3.5 h-3.5 text-[#c8956c]" />{f}</div>)}</div><button className={`mt-8 w-full py-3 text-[10px] font-black uppercase tracking-widest transition-all rounded-lg ${p.featured ? "bg-[#c8956c] text-white" : "border border-[#1a1a18]/10 hover:bg-[#c8956c] hover:text-white"}`}>{p.cta}</button></div></Reveal>)}</div>
        </div>
      </section>

      <section className="py-40 bg-[#1a1a18] text-[#faf8f4] text-center">
        <div className="max-w-[1500px] mx-auto px-6 md:px-12">
          <Reveal>
            <h2 className="text-6xl md:text-9xl font-black tracking-tighter uppercase mb-12">Your Next <span className="text-[#c8956c]">Journey.</span></h2>
            <p className="max-w-xl mx-auto text-sm text-[#faf8f4]/40 mb-16 uppercase tracking-widest italic">Subscribe for curated travel inspiration weekly.</p>
            <div className="max-w-md mx-auto flex gap-4">
              <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} className="flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-sm font-mono focus:border-[#c8956c] focus:outline-none" />
              <button className="px-8 py-4 bg-[#c8956c] text-white text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-[#1a1a18] transition-all rounded-xl">Subscribe</button>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="bg-[#1a1a18] border-t border-[#faf8f4]/5 py-32 px-6 md:px-12 text-[#faf8f4]">
        <div className="max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-24">
          <div className="col-span-1 md:col-span-2"><Link href="/" className="flex items-center gap-3 text-xl font-black tracking-tighter mb-10"><div className="w-8 h-8 bg-[#c8956c] text-white rounded-full flex items-center justify-center"><Compass className="w-4 h-4" /></div><span>WANDERER // MAG</span></Link><p className="text-[11px] text-[#faf8f4]/15 uppercase tracking-[0.2em] max-w-sm italic">Travel magazine & journey planner. Since 2018.</p></div>
          <div><h4 className="text-[10px] font-black uppercase tracking-widest mb-10 text-[#c8956c]">Explore</h4><ul className="space-y-5 text-[10px] font-bold text-[#faf8f4]/20 uppercase tracking-widest">{["Destinations", "Guides", "Journal"].map(l => <li key={l}><Link href="#">{l}</Link></li>)}</ul></div>
          <div><h4 className="text-[10px] font-black uppercase tracking-widest mb-10 text-[#c8956c]">Company</h4><ul className="space-y-5 text-[10px] font-bold text-[#faf8f4]/20 uppercase tracking-widest">{["About", "Team", "Contact"].map(l => <li key={l}><Link href="#">{l}</Link></li>)}</ul></div>
        </div>
        <div className="max-w-[1500px] mx-auto mt-32 pt-16 border-t border-[#faf8f4]/5 text-center text-[9px] font-bold text-[#faf8f4]/10 uppercase tracking-widest">&copy; 2026 WANDERER MAG</div>
      </footer>
    </div>
  );
}