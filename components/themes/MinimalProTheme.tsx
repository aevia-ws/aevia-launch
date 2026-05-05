"use client";

import { motion } from "framer-motion";
import type { SessionData } from "@/lib/sessions";
import { ThemeWrapper } from "./ThemeWrapper";
import { Reveal, Stagger, StaggerItem, MagneticButton } from "./AnimationHelpers";
import { ArrowRight, ChevronRight, Globe, Shield, Zap, Award, HelpCircle, Activity, CheckCircle, TrendingUp, Quote, Phone, Mail, Search, Clock } from "lucide-react";

export function MinimalProTheme({ session }: { session: SessionData }) {
  const { formData, generatedContent: c } = session;
  const brand = formData.brandColor || "#000";

  return (
    <ThemeWrapper session={session} dark={false}>
      {/* Hero Section */}
      <section className="pt-48 pb-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="text-[10px] font-bold uppercase tracking-[0.5em] text-gray-300 mb-20">System 01 // Minimal Professional</div>
            <h1 className="text-6xl md:text-[8vw] font-medium leading-[0.9] tracking-tighter text-black mb-32 max-w-4xl">
              {c?.heroHeadline}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-32 items-end">
              <p className="text-2xl text-gray-400 font-light leading-relaxed max-w-lg">
                {c?.heroSubline}
              </p>
              <div className="flex md:justify-end">
                <MagneticButton
                  style={{ background: brand, color: "#fff" }}
                  className="px-10 py-4 rounded-full font-bold text-xs uppercase tracking-widest shadow-xl"
                >
                  Get Started
                </MagneticButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-40 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-start">
            <Reveal>
              <h2 className="text-4xl font-bold uppercase tracking-tighter mb-12">Core Expertise.</h2>
              <p className="text-xl text-gray-400 leading-relaxed font-light mb-16 italic">
                {c?.aboutText}
              </p>
            </Reveal>
            
            <div className="space-y-1">
              {c?.services.map((s, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="group py-12 border-b flex justify-between items-center hover:px-8 transition-all duration-500 cursor-pointer">
                    <div className="flex items-center gap-10">
                      <span className="text-xs font-bold text-gray-300">0{i+1}</span>
                      <h3 className="text-2xl font-bold uppercase tracking-tight group-hover:tracking-widest transition-all">{s.title}</h3>
                    </div>
                    <ArrowRight className="w-6 h-6 text-gray-200 group-hover:text-black transition-colors" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-40 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
          {formData.benefits.map((b, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="bg-white p-16 rounded-[40px] shadow-sm border border-gray-100 h-full flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 text-black mb-12 border border-gray-100">
                    {i === 0 ? <Zap className="w-4 h-4" /> : i === 1 ? <Shield className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
                  </div>
                  <h3 className="text-xl font-bold uppercase mb-6 tracking-tight">{b}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed italic">
                    Precision engineering meets thoughtful design to deliver exceptional value in {formData.businessType}.
                  </p>
                </div>
                <div className="mt-12 text-[10px] font-black uppercase tracking-widest text-gray-200">System_Module_{i+1}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured Project */}
      <section className="py-40">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="mb-24">
            <h2 className="text-5xl font-bold uppercase tracking-tighter">Case Study // Excellence</h2>
          </Reveal>
          
          <Reveal className="relative group overflow-hidden rounded-[60px]">
            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80" className="w-full h-[600px] object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
              <button className="px-12 py-5 bg-white text-black font-black uppercase tracking-widest text-xs">View Project Analysis</button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ SECTION 6: EFFICIENCY METRICS ═══ */}
      <section className="py-24 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
           {[
             { val: "100%", label: "Clarity" },
             { val: "0.0s", label: "Friction" },
             { val: "24/7", label: "Execution" },
             { val: "10x", label: "Output" },
           ].map((s, i) => (
             <Reveal key={i} delay={i * 0.1}>
                <div className="text-5xl font-bold text-black mb-2 tracking-tighter">{s.val}</div>
                <div className="text-[10px] uppercase font-bold tracking-widest text-gray-300">{s.label}</div>
             </Reveal>
           ))}
        </div>
      </section>

      {/* ═══ SECTION 7: THE PROCESS ═══ */}
      <section className="py-40 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
           <Reveal className="mb-24">
              <h2 className="text-4xl font-bold uppercase tracking-tighter">The Methodology.</h2>
           </Reveal>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {[
                { title: "Analysis", desc: "Deconstructing complexity into foundational truths." },
                { title: "Synthesis", desc: "Constructing elegant systems from raw components." },
                { title: "Optimization", desc: "Refining every vector for peak performance." },
              ].map((p, i) => (
                <Reveal key={i} delay={i * 0.1}>
                   <div className="flex gap-8 group">
                      <div className="text-4xl font-bold text-gray-100 group-hover:text-black transition-colors italic">0{i+1}</div>
                      <div>
                         <h3 className="text-lg font-bold uppercase tracking-tight text-black mb-4">{p.title}</h3>
                         <p className="text-sm text-gray-400 leading-relaxed font-light">{p.desc}</p>
                      </div>
                   </div>
                </Reveal>
              ))}
           </div>
        </div>
      </section>

      {/* ═══ SECTION 8: CLIENT FEEDBACK ═══ */}
      <section className="py-40 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
           <Reveal>
              <Quote className="w-12 h-12 mx-auto mb-16 text-gray-100" />
              <p className="text-3xl md:text-5xl font-light italic text-black leading-tight mb-20 uppercase tracking-tighter">
                 &quot;Precision is not a metric, it is a philosophy. Minimal Pro embodies this in every pixel.&quot;
              </p>
              <div className="text-[10px] font-bold uppercase tracking-[0.5em] text-gray-300">— Director of Engineering // Global Systems</div>
           </Reveal>
        </div>
      </section>

      {/* ═══ SECTION 9: RECOGNITION ═══ */}
      <section className="py-40 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {[
                { year: "2026", award: "Red Dot Award", rank: "Winner" },
                { year: "2025", award: "Awwwards SOTY", rank: "Nominee" },
                { year: "2024", award: "iF Design", rank: "Gold" },
                { year: "2023", award: "Cannes Lions", rank: "Silver" },
              ].map((a, i) => (
                <Reveal key={i} delay={i * 0.1}>
                   <div className="p-10 border border-gray-100 bg-white hover:border-black transition-all group rounded-3xl">
                      <div className="text-xs font-bold text-gray-300 mb-4">{a.year}</div>
                      <h3 className="text-lg font-bold uppercase tracking-tight text-black mb-2">{a.award}</h3>
                      <div className="text-[10px] uppercase font-bold tracking-widest text-gray-400 group-hover:text-black transition-colors">{a.rank}</div>
                   </div>
                </Reveal>
              ))}
           </div>
        </div>
      </section>

      {/* ═══ SECTION 10: PARTNER LOGOS ═══ */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
           <div className="flex flex-wrap justify-center gap-16 md:gap-32 opacity-20 grayscale hover:grayscale-0 transition-all duration-700">
              <div className="text-xl font-bold italic tracking-tighter text-black uppercase">IBM_SYST</div>
              <div className="text-xl font-bold italic tracking-tighter text-black uppercase">SAP_CORE</div>
              <div className="text-xl font-bold italic tracking-tighter text-black uppercase">ORACLE_ARC</div>
              <div className="text-xl font-bold italic tracking-tighter text-black uppercase">TESLA_OPS</div>
           </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="contact" className="py-60 bg-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <h2 className="text-6xl md:text-[8vw] font-bold uppercase tracking-tighter text-black mb-16 leading-[0.85]">Evolve Your <br/>Perspective.</h2>
            <div className="flex flex-col items-center gap-12">
              <MagneticButton
                style={{ background: brand, color: "#fff" }}
                className="px-12 py-6 rounded-full font-bold uppercase tracking-[0.4em] text-xs shadow-2xl"
              >
                Inquire About Availability
              </MagneticButton>
              <div className="text-[10px] font-bold uppercase tracking-[0.5em] text-gray-300">
                Precision // Clarity // Performance
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </ThemeWrapper>
  );
}
