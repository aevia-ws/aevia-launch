"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { SessionData } from "@/lib/sessions";
import { ThemeWrapper } from "./ThemeWrapper";
import { Reveal, Stagger, StaggerItem, MagneticButton } from "./AnimationHelpers";
import { Calendar, MapPin, Ticket, Users, Zap, Clock, Mic, Star, Layout, Award, HelpCircle, Phone, Mail, Globe, ArrowRight, PlayCircle, Quote, Map } from "lucide-react";

export function EventTheme({ session }: { session: SessionData }) {
  const { formData, generatedContent: c } = session;
  const brand = formData.brandColor || "#f43f5e"; // Event Red/Pink
  
  const [timeLeft, setTimeLeft] = useState({ days: 12, hours: 8, minutes: 45, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        return { ...prev, seconds: 59, minutes: prev.minutes - 1 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <ThemeWrapper session={session} dark={true}>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0 opacity-40">
          <img 
            src={formData.heroImageUrl || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&q=80"} 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
        
        {/* Animated Shapes */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px] opacity-20 animate-pulse" style={{ background: brand }} />

        <div className="relative z-10 max-w-5xl px-6 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-black uppercase tracking-[0.4em] mb-12 text-white">
              <Zap className="w-4 h-4 text-amber-400" /> Tickets On Sale Now
            </div>
            <h1 className="text-6xl md:text-[10vw] font-black uppercase tracking-tighter leading-[0.8] mb-12 text-white italic">
              {c?.heroHeadline}
            </h1>
            <div className="flex flex-wrap justify-center gap-12 mb-16 text-white/60 font-bold uppercase text-sm tracking-widest">
              <div className="flex items-center gap-3"><Calendar className="w-5 h-5" /> May 24-26, 2026</div>
              <div className="flex items-center gap-3"><MapPin className="w-5 h-5" /> {formData.city}</div>
            </div>
            
            {/* Countdown */}
            <div className="flex justify-center gap-8 mb-20">
              {[
                { val: timeLeft.days, label: "Days" },
                { val: timeLeft.hours, label: "Hours" },
                { val: timeLeft.minutes, label: "Mins" },
                { val: timeLeft.seconds, label: "Secs" },
              ].map((t, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="text-4xl md:text-6xl font-black text-white italic tracking-tighter">{String(t.val).padStart(2, '0')}</div>
                  <div className="text-[10px] uppercase font-bold text-white/30 tracking-widest">{t.label}</div>
                </div>
              ))}
            </div>

            <MagneticButton
              style={{ background: brand, color: "#fff" }}
              className="px-16 py-6 rounded-none font-black uppercase tracking-[0.4em] text-sm shadow-[0_0_50px_rgba(244,63,94,0.3)]"
            >
              Get Your Tickets <Ticket className="inline-block ml-3 w-5 h-5" />
            </MagneticButton>
          </Reveal>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-20 border-y border-white/5 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { val: "2500+", label: "Attendees" },
            { val: "50+", label: "Speakers" },
            { val: "3", label: "Days" },
            { val: "12", label: "Workshops" },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="text-4xl font-black text-white mb-2 italic">{s.val}</div>
              <div className="text-[10px] uppercase font-bold text-white/20 tracking-widest">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Speakers Section */}
      <section className="py-40 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24">
            <Reveal>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white italic">The Lineup<span style={{ color: brand }}>.</span></h2>
            </Reveal>
            <div className="text-xs font-black text-white/20 uppercase tracking-widest hidden md:block pb-2">
              Filtering by: All Sessions
            </div>
          </div>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((s, i) => (
              <StaggerItem key={i}>
                <div className="group cursor-pointer">
                  <div className="aspect-[4/5] overflow-hidden bg-zinc-900 border border-white/5 mb-8 grayscale group-hover:grayscale-0 transition-all duration-700 relative">
                    <img src={`https://images.unsplash.com/photo-${1500000000000 + i * 9000}?w=800&q=80`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
                    <div className="absolute bottom-6 left-6">
                      <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center"><Mic className="w-4 h-4 text-white" /></div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-black uppercase text-white mb-2 group-hover:italic transition-all">Speaker Name {i+1}</h3>
                  <div className="text-xs font-bold text-white/30 uppercase tracking-widest">Industry Leader // Tech</div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* About Section */}
      <section className="py-40 bg-zinc-950 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <Reveal>
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-12 leading-[0.85] italic text-white">Why Attend <br/>This Year<span style={{ color: brand }}>?</span></h2>
            <p className="text-xl text-white/40 leading-relaxed italic mb-16">
              {c?.aboutText}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {formData.benefits.map((b, i) => (
                <div key={i} className="flex gap-4 items-start group">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-white/5 text-white group-hover:bg-white group-hover:text-black transition-all">
                    <Star className="w-4 h-4" />
                  </div>
                  <div className="text-xs font-black uppercase tracking-widest leading-tight text-white/60">{b}</div>
                </div>
              ))}
            </div>
          </Reveal>
          
          <Reveal delay={0.2} className="relative">
            <div className="aspect-square bg-zinc-900 p-4 border border-white/5 rounded-full overflow-hidden rotate-12">
              <img src="https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?w=1200&q=80" className="w-full h-full object-cover rounded-full opacity-50" />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="text-6xl font-black text-white italic">LIVE</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-white/30 mt-2">Performance Focus</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ SECTION 6: EVENT SCHEDULE ═══ */}
      <section className="py-40 bg-black">
        <div className="max-w-7xl mx-auto px-6">
           <Reveal className="mb-24">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white italic">The Agenda.</h2>
           </Reveal>
           <div className="space-y-4">
              {[
                { time: "09:00 AM", title: "Opening Keynote", speaker: "Dr. Aris Thorne", type: "Main Stage" },
                { time: "11:30 AM", title: "Quantum Computing Lab", speaker: "Elena Korr", type: "Workshop" },
                { time: "02:00 PM", title: "The Future of Mesh", speaker: "Marcus Vane", type: "Panel" },
                { time: "05:00 PM", title: "Networking Mixer", speaker: "All Attendees", type: "Social" },
              ].map((row, i) => (
                <Reveal key={i} delay={i * 0.1}>
                   <div className="p-10 bg-zinc-900/30 border border-white/5 rounded-[40px] hover:bg-zinc-900/50 transition-all group flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                      <div className="text-2xl font-black text-white/10 group-hover:text-white transition-colors italic">{row.time}</div>
                      <div className="flex-1">
                         <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-2">{row.title}</h3>
                         <div className="text-xs font-bold text-white/30 uppercase tracking-widest">{row.speaker} // {row.type}</div>
                      </div>
                      <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                         <ArrowRight className="w-5 h-5" />
                      </div>
                   </div>
                </Reveal>
              ))}
           </div>
        </div>
      </section>

      {/* ═══ SECTION 7: TICKET TIERS ═══ */}
      <section className="py-40 bg-zinc-950 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { name: "Standard", price: "299", perks: ["Access to all talks", "Networking lunch", "Digital recordings"] },
                { name: "VIP Elite", price: "899", perks: ["Priority seating", "Speaker dinner", "Backstage access", "Limited swag"] },
                { name: "All Access", price: "1499", perks: ["Everything in VIP", "Personal concierge", "Lifetime recordings", "Workshop access"] },
              ].map((tier, i) => (
                <Reveal key={i} delay={i * 0.1}>
                   <div className="p-12 border border-white/5 rounded-[40px] bg-black/50 backdrop-blur-xl hover:border-white/20 transition-all relative group overflow-hidden">
                      {i === 1 && <div className="absolute top-0 right-0 px-6 py-2 bg-rose-500 text-white font-black text-[8px] uppercase tracking-widest">Most Popular</div>}
                      <h3 className="text-2xl font-black uppercase text-white mb-8 italic">{tier.name}</h3>
                      <div className="text-6xl font-black text-white mb-12 tracking-tighter italic">${tier.price}</div>
                      <ul className="space-y-6 mb-12">
                         {tier.perks.map((p, j) => (
                           <li key={j} className="flex items-center gap-4 text-xs font-bold text-white/40 uppercase tracking-widest">
                              <Zap className="w-3 h-3 text-white/20" /> {p}
                           </li>
                         ))}
                      </ul>
                      <button className="w-full py-5 border border-white/10 font-black uppercase text-[10px] tracking-widest group-hover:bg-white group-hover:text-black transition-all">Purchase Now</button>
                   </div>
                </Reveal>
              ))}
           </div>
        </div>
      </section>

      {/* ═══ SECTION 8: VENUE & LOCATION ═══ */}
      <section className="py-40 bg-black overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
           <Reveal>
              <h2 className="text-5xl font-black uppercase tracking-tighter mb-12 leading-[0.85] italic text-white">The Epicenter <br/>Of Innovation.</h2>
              <div className="space-y-12">
                 <div>
                    <div className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 mb-4">The Grand Hall // {formData.city}</div>
                    <p className="text-xl text-white/60 font-light leading-relaxed italic">12 Innovation Way, <br/>{formData.city}, TX 75001</p>
                 </div>
                 <div className="flex gap-12 pt-12 border-t border-white/5">
                    <div className="flex items-center gap-4 group cursor-pointer">
                       <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                          <Map className="w-5 h-5" />
                       </div>
                       <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Open Maps</span>
                    </div>
                    <div className="flex items-center gap-4 group cursor-pointer">
                       <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                          <Phone className="w-5 h-5" />
                       </div>
                       <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Concierge</span>
                    </div>
                 </div>
              </div>
           </Reveal>
           <Reveal delay={0.2} className="relative aspect-square">
              <div className="absolute inset-0 bg-rose-500/10 rounded-full blur-[120px] animate-pulse" />
              <div className="relative h-full w-full bg-zinc-900 rounded-[80px] overflow-hidden grayscale opacity-40 border border-white/10">
                 <img src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=80" className="w-full h-full object-cover" />
              </div>
           </Reveal>
        </div>
      </section>

      {/* ═══ SECTION 9: FAQ ═══ */}
      <section className="py-40 bg-zinc-950 border-y border-white/5">
        <div className="max-w-4xl mx-auto px-6">
           <Reveal className="text-center mb-24">
              <h2 className="text-4xl font-black uppercase tracking-tighter italic text-white">Logistics Protocol</h2>
           </Reveal>
           <div className="space-y-4">
              {[
                { q: "Is on-site parking available?", a: "Yes, we provide complimentary valet parking for all VIP ticket holders and a dedicated shuttle service from the downtown core." },
                { q: "What is the dress code?", a: "The event is business casual. However, we encourage expressive and futuristic attire for the evening mixers." },
                { q: "Are international visas supported?", a: "Our concierge team can provide official invitation letters for visa applications after ticket purchase." },
              ].map((f, i) => (
                <Reveal key={i} delay={i * 0.1}>
                   <div className="p-10 border border-white/5 hover:bg-white/5 transition-all group cursor-pointer rounded-[2rem]">
                      <div className="flex justify-between items-center mb-6">
                         <span className="text-sm font-black uppercase tracking-widest text-white/70 group-hover:text-white transition-colors">{f.q}</span>
                         <HelpCircle className="w-5 h-5 text-white/10 group-hover:text-white transition-colors" />
                      </div>
                      <p className="text-sm text-white/20 leading-relaxed italic group-hover:text-white/40 transition-colors">{f.a}</p>
                   </div>
                </Reveal>
              ))}
           </div>
        </div>
      </section>

      {/* ═══ SECTION 10: SPONSORS ═══ */}
      <section className="py-24 bg-black border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
           <div className="flex flex-wrap justify-center gap-16 md:gap-32 opacity-20 grayscale hover:grayscale-0 transition-all duration-700">
              <div className="text-2xl font-black italic tracking-tighter text-white uppercase">TECH_GLOBAL</div>
              <div className="text-2xl font-black italic tracking-tighter text-white uppercase">FUTURE_LABS</div>
              <div className="text-2xl font-black italic tracking-tighter text-white uppercase">VANTAGE_CO</div>
              <div className="text-2xl font-black italic tracking-tighter text-white uppercase">ZEN_CORP</div>
           </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="contact" className="py-60 bg-black text-center">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <h2 className="text-7xl md:text-[10vw] font-black uppercase tracking-tighter text-white leading-none mb-16 italic">Secure Your<br/>Legacy<span style={{ color: brand }}>.</span></h2>
            <MagneticButton
              style={{ background: brand, color: "#fff" }}
              className="px-16 py-8 rounded-none font-black uppercase tracking-[0.4em] text-sm shadow-[0_0_80px_rgba(244,63,94,0.4)]"
            >
              Buy Tickets Now
            </MagneticButton>
            <div className="mt-16 flex justify-center gap-12 text-[10px] font-black uppercase tracking-[0.6em] text-white/20">
              <span>Standard</span>
              <span>VIP Elite</span>
              <span>All Access</span>
            </div>
          </Reveal>
        </div>
      </section>
    </ThemeWrapper>
  );
}
