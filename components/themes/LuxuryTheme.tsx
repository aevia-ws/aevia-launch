"use client";

import { motion } from "framer-motion";
import type { SessionData } from "@/lib/sessions";
import { ThemeWrapper } from "./ThemeWrapper";
import { Reveal, Stagger, StaggerItem, MagneticButton } from "./AnimationHelpers";
import { Star, ArrowRight, ShieldCheck, Globe, Award, Quote, Phone, Mail, Clock, MapPin } from "lucide-react";

export function LuxuryTheme({ session }: { session: SessionData }) {
  const { formData, generatedContent: c } = session;
  const brand = formData.brandColor || "#c9a84c";

  return (
    <ThemeWrapper session={session} dark={true}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,900;1,6..96,400&family=Inter:wght@100;300;600&display=swap');
        .bodoni { font-family: 'Bodoni Moda', serif; }
        .inter { font-family: 'Inter', sans-serif; }
      `}</style>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#050505]">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0.3 }}
          animate={{ scale: 1, opacity: 0.5 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 z-0"
        >
          <img src={formData.heroImageUrl || "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1600&q=80"} className="w-full h-full object-cover grayscale" />
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/40 to-[#050505]" />

        <div className="relative z-10 max-w-5xl px-6 text-center">
          <Reveal>
            <div className="inline-block px-10 py-1 border border-white/10 rounded-full text-[10px] inter uppercase tracking-[0.6em] mb-16 text-white/30">
              Private Label // 2026
            </div>
            <h1 className="text-7xl md:text-[12vw] bodoni italic text-white mb-16 leading-[0.8] tracking-tighter">
              {c?.heroHeadline}
            </h1>
            <p className="text-xl md:text-2xl text-white/40 inter font-light tracking-[0.1em] max-w-2xl mx-auto mb-20 italic">
              {c?.heroSubline}
            </p>
            <div className="flex justify-center">
              <MagneticButton
                style={{ border: `1px solid ${brand}`, color: brand }}
                className="px-16 py-6 inter uppercase text-[10px] font-bold tracking-[0.5em] hover:bg-white hover:text-black hover:border-white transition-all duration-1000"
              >
                Inquire Within
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-40 bg-[#050505] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <Reveal>
            <span className="text-[10px] inter text-white/20 uppercase tracking-[0.4em] mb-8 block">The Philosophy</span>
            <h2 className="text-6xl md:text-8xl bodoni text-white mb-16 italic leading-[0.85]">Elegance In <br/>Every Detail.</h2>
            <p className="text-xl text-white/30 inter font-light leading-relaxed mb-20 max-w-md">
              {c?.aboutText}
            </p>
            <div className="space-y-12">
              {formData.benefits.map((b, i) => (
                <div key={i} className="flex gap-10 items-center">
                  <div className="text-[10px] inter text-white/10">0{i+1}</div>
                  <div className="h-[1px] w-20 bg-white/5" />
                  <div className="text-xs inter uppercase tracking-[0.3em] text-white/60">{b}</div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.2} className="relative">
            <div className="aspect-[3/4] border border-white/5 p-4 bg-white/[0.02] backdrop-blur-3xl">
              <img src="https://images.unsplash.com/photo-1511556820780-d912e42b4980?w=800&q=80" className="w-full h-full object-cover grayscale opacity-60" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Legacy Metrics */}
      <section className="py-32 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-20">
          {[
            { val: "25yr", label: "Heritage" },
            { val: "12", label: "Ateliers" },
            { val: "Elite", label: "Service" },
            { val: "Pure", label: "Craft" },
          ].map((m, i) => (
            <Reveal key={i} delay={i * 0.1} className="text-center">
              <div className="text-4xl md:text-5xl bodoni italic text-white mb-4">{m.val}</div>
              <div className="text-[10px] inter uppercase tracking-[0.3em] text-white/20">{m.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-32">
            <Reveal>
              <h2 className="text-6xl md:text-8xl bodoni text-white italic">Curated Works</h2>
            </Reveal>
            <div className="text-white/10 inter text-[10px] uppercase tracking-[0.5em] hidden md:block">
              Archive_Collection_2026
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            {[1, 2].map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="group cursor-pointer">
                  <div className="aspect-[16/10] overflow-hidden mb-12 border border-white/5">
                    <img src={`https://images.unsplash.com/photo-${1500000000000 + i * 5000}?w=1200&q=80`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
                  </div>
                  <div className="flex justify-between items-center">
                    <h3 className="text-3xl bodoni italic text-white">Project // Essence 0{i+1}</h3>
                    <ArrowRight className="w-8 h-8 text-white/20 group-hover:text-white transition-all" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 6: THE ATELIER ═══ */}
      <section className="py-40 bg-[#050505] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
           <Reveal className="relative aspect-square border border-white/5 p-4">
              <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80" className="w-full h-full object-cover grayscale opacity-40" />
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-px h-60 bg-white/20" />
              </div>
           </Reveal>
           <Reveal delay={0.2}>
              <span className="text-[10px] inter text-white/20 uppercase tracking-[0.5em] mb-8 block">The Hands Behind</span>
              <h2 className="text-5xl md:text-7xl bodoni text-white mb-12 italic leading-tight">Mastery of <br/>The Craft.</h2>
              <p className="text-lg text-white/30 inter font-light leading-relaxed mb-16 italic">Every detail is hand-finished in our atelier, preserving centuries-old techniques for the modern vanguard.</p>
              <button className="flex items-center gap-4 text-[10px] inter uppercase tracking-[0.4em] text-white/50 hover:text-white transition-colors group">
                 Watch The Process <ArrowRight className="w-4 h-4 group-hover:translate-x-4 transition-transform" />
              </button>
           </Reveal>
        </div>
      </section>

      {/* ═══ SECTION 7: EDITORIAL TESTIMONIALS ═══ */}
      <section className="py-60 bg-[#050505] border-y border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
           <Reveal>
              <Quote className="w-12 h-12 mx-auto mb-20 text-white/10" />
              <p className="text-4xl md:text-6xl bodoni text-white italic leading-tight mb-20">
                 &quot;To possess a piece from {formData.businessName} is to own a fragment of history, refined for the future.&quot;
              </p>
              <div className="inter text-[10px] uppercase tracking-[0.5em] text-white/40 italic">— HRH Princess Julianna von Berg</div>
           </Reveal>
        </div>
      </section>

      {/* ═══ SECTION 8: BRAND HERITAGE ═══ */}
      <section className="py-40 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
           <Reveal>
              <h2 className="text-5xl md:text-7xl bodoni text-white mb-12 italic">A Century of <br/>Refinement.</h2>
              <div className="space-y-16">
                 {[
                   { year: "1926", title: "Atelier I", desc: "The foundation of our first workshop in the heart of Florence." },
                   { year: "1974", title: "Global Mesh", desc: "Expanding our vision to the fashion capitals of the world." },
                   { year: "2026", title: "The New Era", desc: "Redefining luxury for the digital and physical avant-garde." },
                 ].map((h, i) => (
                   <div key={i} className="flex gap-12 group">
                      <div className="text-2xl bodoni italic text-white/10 group-hover:text-white transition-colors">{h.year}</div>
                      <div>
                         <h3 className="text-lg inter uppercase tracking-widest text-white mb-2">{h.title}</h3>
                         <p className="text-sm inter text-white/30 font-light max-w-sm">{h.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </Reveal>
           <Reveal delay={0.2} className="relative aspect-[4/5] border border-white/5 p-4">
              <img src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e12?w=800&q=80" className="w-full h-full object-cover grayscale opacity-40" />
           </Reveal>
        </div>
      </section>

      {/* ═══ SECTION 9: THE INNER CIRCLE ═══ */}
      <section className="py-40 bg-[#050505] border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-20">
           <Reveal className="max-w-xl">
              <h2 className="text-5xl md:text-7xl bodoni text-white italic mb-10 leading-tight">The Inner Circle.</h2>
              <p className="text-lg text-white/30 inter font-light mb-16 italic">Join our private registry for early access to limited collections and private viewing invites.</p>
              <div className="flex border-b border-white/20 pb-4">
                 <input type="email" placeholder="Private Email Address" className="bg-transparent inter text-sm outline-none flex-1 text-white placeholder:text-white/10" />
                 <button className="inter text-[10px] font-black uppercase tracking-widest text-white hover:opacity-50">Apply</button>
              </div>
           </Reveal>
           <Reveal delay={0.2} className="relative w-64 h-64 border border-white/5 p-8 flex flex-col items-center justify-center text-center">
              <Award className="w-12 h-12 text-white/20 mb-6" />
              <div className="text-[10px] inter text-white/50 uppercase tracking-[0.3em]">Bespoke <br/>Membership</div>
           </Reveal>
        </div>
      </section>

      {/* ═══ SECTION 10: PRESS MENTIONS ═══ */}
      <section className="py-24 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6">
           <div className="flex flex-wrap justify-center gap-20 opacity-10 grayscale hover:grayscale-0 transition-all duration-1000">
              <div className="text-2xl bodoni italic text-white uppercase tracking-tighter">VOGUE</div>
              <div className="text-2xl bodoni italic text-white uppercase tracking-tighter">ELLE_LUXE</div>
              <div className="text-2xl bodoni italic text-white uppercase tracking-tighter">GQ_ELITE</div>
              <div className="text-2xl bodoni italic text-white uppercase tracking-tighter">FORBES</div>
              <div className="text-2xl bodoni italic text-white uppercase tracking-tighter">TATLER</div>
           </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-60 bg-white text-black text-center relative overflow-hidden">
        {/* Background Italic Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02] select-none">
          <div className="text-[40vw] bodoni italic tracking-tighter">Luxury</div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <Reveal>
            <h2 className="text-7xl md:text-[10vw] bodoni font-black uppercase tracking-tighter leading-none mb-16 italic">Evolve Your <br/>Legacy.</h2>
            <div className="flex flex-col items-center gap-12 mt-20">
              <MagneticButton
                style={{ background: brand, color: "#fff" }}
                className="px-16 py-8 rounded-full inter font-black uppercase tracking-[0.4em] text-xs shadow-2xl"
              >
                Request Consultation
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </ThemeWrapper>
  );
}
