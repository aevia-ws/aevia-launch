"use client";

import { motion } from "framer-motion";
import type { SessionData } from "@/lib/sessions";
import { ThemeWrapper } from "./ThemeWrapper";
import { Reveal, Stagger, StaggerItem, MagneticButton } from "./AnimationHelpers";
import { ArrowUpRight, Check, Users, Globe, Zap, ArrowRight, Award, HelpCircle, Activity, CheckCircle, TrendingUp, Quote, Search, Mail, Phone, Shield, Calendar } from "lucide-react";

export function AgencyMinimalTheme({ session }: { session: SessionData }) {
  const { formData, generatedContent: c } = session;
  const brand = formData.brandColor || "#111";

  return (
    <ThemeWrapper session={session} dark={false}>
      {/* Hero Section */}
      <section className="pt-40 pb-32 border-b bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-300 mb-12">Established 2026 // Global Studio</div>
            <h1 className="text-6xl md:text-8xl font-bold mb-20 leading-[1.1] tracking-tighter text-black">
              {c?.heroHeadline}
            </h1>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-end">
            <Reveal delay={0.2}>
              <p className="text-2xl text-gray-400 font-medium leading-tight max-w-xl">
                {c?.heroSubline}
              </p>
            </Reveal>
            <Reveal delay={0.4} className="flex md:justify-end">
              <MagneticButton
                style={{ background: brand, color: "#fff" }}
                className="px-10 py-5 rounded-none font-black uppercase tracking-widest text-xs shadow-lg"
              >
                Start A Project
              </MagneticButton>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Grid Portfolio */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b pb-12">
            <Reveal>
              <h2 className="text-4xl font-bold uppercase tracking-tighter">The Portfolio</h2>
            </Reveal>
            <div className="text-xs font-bold text-gray-300 uppercase tracking-widest hidden md:block">
              Filtering by: All Industries
            </div>
          </div>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-1 px-1 bg-gray-100 border">
            {[
              { title: "Aether Labs", cat: "Digital Ecosystem", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80" },
              { title: "Noir Studio", cat: "Branding", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80" },
              { title: "Prisme App", cat: "Development", img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80" },
              { title: "Lumina", cat: "Healthcare", img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80" },
            ].map((p, i) => (
              <StaggerItem key={i}>
                <div className="group bg-white p-12 hover:bg-gray-50 transition-all cursor-pointer h-full">
                  <div className="aspect-video overflow-hidden mb-12">
                    <motion.img 
                      whileHover={{ scale: 1.05 }}
                      src={p.img} 
                      className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" 
                    />
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest block mb-4">{p.cat}</span>
                      <h3 className="text-3xl font-bold uppercase tracking-tight">{p.title}</h3>
                    </div>
                    <div className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-32">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-12 leading-tight">Strategic design<br/>meets technical<br/>precision.</h2>
            <p className="text-lg text-gray-400 leading-relaxed max-w-md">
              {c?.aboutText}
            </p>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { icon: <Zap />, label: "Strategy", val: "Market analysis and positioning." },
              { icon: <Users />, label: "UX Design", val: "User-centric interface systems." },
              { icon: <Globe />, label: "Web Dev", val: "High-performance codebases." },
              { icon: <Check />, label: "Consulting", val: "Ongoing growth and optimization." },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="p-8 bg-white border rounded-2xl shadow-sm">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-gray-50" style={{ color: brand }}>{s.icon}</div>
                  <h4 className="text-lg font-bold uppercase mb-4">{s.label}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{s.val}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 5: AGENCY STATS ═══ */}
      <section className="py-24 bg-white border-y">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
           {[
             { val: "10yr", label: "Studio History" },
             { val: "250+", label: "Success Nodes" },
             { val: "15", label: "Industry Awards" },
             { val: "Global", label: "Operations" },
           ].map((s, i) => (
             <Reveal key={i} delay={i * 0.1}>
                <div className="text-5xl font-black text-black mb-2 tracking-tighter">{s.val}</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-gray-300">{s.label}</div>
             </Reveal>
           ))}
        </div>
      </section>

      {/* ═══ SECTION 6: CLIENT LOGOS ═══ */}
      <section className="py-24 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-6 text-center">
           <div className="flex flex-wrap justify-center gap-16 md:gap-32 opacity-20 grayscale hover:grayscale-0 transition-all duration-700">
              <div className="text-2xl font-black italic tracking-tighter text-black uppercase">ALPHA_CORP</div>
              <div className="text-2xl font-black italic tracking-tighter text-black uppercase">VERTEX_ARC</div>
              <div className="text-2xl font-black italic tracking-tighter text-black uppercase">NEXUS_SYS</div>
              <div className="text-2xl font-black italic tracking-tighter text-black uppercase">PRISM_LABS</div>
           </div>
        </div>
      </section>

      {/* ═══ SECTION 7: THE PROCESS ═══ */}
      <section className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
           <Reveal>
              <h2 className="text-5xl font-black uppercase tracking-tighter mb-12 leading-[0.85] italic">The Studio <br/>Protocol.</h2>
              <div className="space-y-12">
                 {[
                   { step: "01", title: "Strategic Audit", desc: "Deconstructing current challenges to define the new core objective." },
                   { step: "02", title: "Creative Sprints", desc: "High-intensity design cycles focused on rapid prototyping and refinement." },
                   { step: "03", title: "System Deployment", desc: "Final implementation of the architectural system across all touchpoints." },
                 ].map((p, i) => (
                   <div key={i} className="flex gap-8 group">
                      <div className="text-2xl font-black italic text-gray-200 group-hover:text-black transition-colors">{p.step}</div>
                      <div>
                         <h3 className="text-lg font-black uppercase tracking-tight text-black mb-2">{p.title}</h3>
                         <p className="text-sm text-gray-400 max-w-sm leading-tight italic">{p.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </Reveal>
           <Reveal delay={0.2} className="relative aspect-square border border-gray-100 p-4 bg-gray-50">
              <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&q=80" className="w-full h-full object-cover grayscale opacity-20" />
              <div className="absolute inset-0 flex items-center justify-center">
                 <Activity className="w-16 h-16 text-black/5 animate-pulse" />
              </div>
           </Reveal>
        </div>
      </section>

      {/* ═══ SECTION 8: TESTIMONIALS ═══ */}
      <section className="py-40 bg-gray-50 border-y">
        <div className="max-w-4xl mx-auto px-6 text-center">
           <Reveal>
              <Quote className="w-16 h-16 mx-auto mb-16 text-gray-200" />
              <p className="text-3xl md:text-5xl font-black italic text-black leading-tight mb-20 uppercase tracking-tighter">
                 &quot;{formData.businessName.split(' ')[0]} doesn&apos;t just design interfaces; they construct architectural experiences that define industries.&quot;
              </p>
              <div className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-300 italic">— Julian Vance // CTO @ ALPHA_SYSTEMS</div>
           </Reveal>
        </div>
      </section>

      {/* ═══ SECTION 9: AWARDS ═══ */}
      <section className="py-40 bg-white border-b">
        <div className="max-w-7xl mx-auto px-6">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {[
                { year: "2026", award: "Webby Award", rank: "Best Agency" },
                { year: "2025", award: "Red Dot", rank: "Interface Design" },
                { year: "2024", award: "Awwwards", rank: "Site of the Year" },
                { year: "2023", award: "FWA", rank: "Innovation" },
              ].map((a, i) => (
                <Reveal key={i} delay={i * 0.1}>
                   <div className="p-10 border border-gray-100 hover:border-black transition-all group rounded-2xl">
                      <div className="text-xs font-bold text-gray-300 mb-4">{a.year}</div>
                      <h3 className="text-lg font-bold uppercase tracking-tight text-black mb-2">{a.award}</h3>
                      <div className="text-[10px] uppercase font-bold tracking-widest text-gray-400 group-hover:text-black transition-colors">{a.rank}</div>
                   </div>
                </Reveal>
              ))}
           </div>
        </div>
      </section>

      {/* ═══ SECTION 10: STUDIO UPDATES ═══ */}
      <section className="py-40 bg-white border-b text-center">
        <div className="max-w-3xl mx-auto px-6">
           <Reveal>
              <div className="w-20 h-20 rounded-full border border-gray-100 flex items-center justify-center mx-auto mb-12">
                 <Mail className="w-8 h-8 text-black" />
              </div>
              <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-12 italic">Studio Dispatch.</h2>
              <p className="text-xl text-gray-400 mb-16 max-w-xl mx-auto italic font-medium">Monthly insights on architectural design, studio culture, and the evolution of the web.</p>
              <div className="flex border-b-4 border-black pb-4 max-w-md mx-auto group">
                 <input type="email" placeholder="Email Address" className="bg-transparent font-black uppercase tracking-widest text-sm outline-none flex-1 text-black placeholder:text-gray-200" />
                 <button className="font-black uppercase tracking-widest text-xs hover:opacity-50 transition-opacity">Apply</button>
              </div>
           </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-48 bg-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <h2 className="text-6xl font-bold uppercase tracking-tighter mb-16">Ready to talk?</h2>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <button 
                style={{ background: brand }}
                className="px-12 py-6 text-white font-black uppercase tracking-widest text-xs shadow-2xl"
              >
                Send Us An Email
              </button>
              <button className="px-12 py-6 border border-gray-200 font-black uppercase tracking-widest text-xs hover:bg-gray-50 transition-colors">
                Book A Discovery Call
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </ThemeWrapper>
  );
}
