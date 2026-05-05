"use client";

import { motion } from "framer-motion";
import type { SessionData } from "@/lib/sessions";
import { ThemeWrapper } from "./ThemeWrapper";
import { Reveal, Stagger, StaggerItem, MagneticButton } from "./AnimationHelpers";
import { Award, Target, TrendingUp, Users, CheckCircle2, MessageSquare, ArrowRight, Shield, Calendar, HelpCircle, Briefcase, FileText } from "lucide-react";

export function ConsultantTheme({ session }: { session: SessionData }) {
  const { formData, generatedContent: c } = session;
  const brand = formData.brandColor || "#1e293b";

  return (
    <ThemeWrapper session={session} dark={false}>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center pt-20 bg-slate-50 overflow-hidden">
        {/* Decorative background grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-white border text-[10px] font-black uppercase tracking-widest mb-10 shadow-sm text-slate-400">
              <Shield className="w-4 h-4 text-slate-900" /> Strategic Advisory // 2026
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-10 leading-[1] tracking-tighter text-slate-900">
              {c?.heroHeadline}
            </h1>
            <p className="text-xl text-slate-500 max-w-lg mb-16 leading-relaxed italic">
              {c?.heroSubline}
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <MagneticButton
                href="#contact"
                style={{ background: brand, color: "#fff" }}
                className="px-10 py-5 rounded-xl font-bold text-lg shadow-xl shadow-slate-500/10"
              >
                Schedule Strategy Session
              </MagneticButton>
            </div>
          </Reveal>
          
          <Reveal delay={0.2} className="relative">
            <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl relative z-10">
              <img src={formData.heroImageUrl || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80"} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-10 -right-10 p-8 bg-white rounded-3xl shadow-xl border z-20 hidden md:block">
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-4xl font-black text-slate-900 mb-1 italic">150+</div>
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Global Clients</div>
                </div>
                <div className="w-[1px] h-12 bg-slate-100" />
                <div className="text-center">
                  <div className="text-4xl font-black text-slate-900 mb-1 italic">12yr</div>
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Experience</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Expertise & Services */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8 text-slate-900">Specialized Expertise</h2>
              <p className="text-xl text-slate-500 font-light italic leading-relaxed">
                Driving measurable growth and operational excellence through data-driven strategies.
              </p>
            </Reveal>
          </div>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { icon: <Target />, label: "Strategy", desc: "Long-term positioning and market dominance." },
              { icon: <TrendingUp />, label: "Growth", desc: "Scaling operations and revenue streams." },
              { icon: <Users />, label: "Leadership", desc: "Executive coaching and team alignment." },
            ].map((s, i) => (
              <StaggerItem key={i}>
                <div className="group h-full p-12 bg-slate-50 border border-slate-100 rounded-[32px] hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-10 bg-white shadow-sm" style={{ color: brand }}>
                    {s.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-6 text-slate-900 uppercase tracking-tight">{s.label}</h3>
                  <p className="text-slate-500 leading-relaxed mb-10">{s.desc}</p>
                  <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-900 transition-colors">
                    View Methodology <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* About & Performance */}
      <section className="py-40 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <Reveal>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-12 leading-[0.85] italic text-white">Results <br/>Not Reports.</h2>
            <p className="text-xl text-slate-400 leading-relaxed italic mb-16 max-w-md">
              {c?.aboutText}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {formData.benefits.map((b, i) => (
                <div key={i} className="flex items-center gap-4 p-6 bg-white/5 rounded-2xl border border-white/5">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center bg-white/10 text-white">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="font-bold text-xs uppercase tracking-widest text-slate-300">{b}</div>
                </div>
              ))}
            </div>
          </Reveal>
          
          <Reveal delay={0.2} className="relative">
            <div className="aspect-square bg-slate-800 rounded-[80px] p-20 flex items-center justify-center border border-white/5">
              <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80')] bg-cover" />
              <div className="relative z-10 text-center">
                <div className="text-[10vw] font-black text-white italic leading-none">+40%</div>
                <div className="text-xs font-black uppercase tracking-[0.5em] text-slate-500 mt-6">Average ROI Increase</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-12">
              <MessageSquare className="w-8 h-8 text-slate-900" />
            </div>
            <p className="text-3xl md:text-4xl font-light italic text-slate-900 leading-relaxed mb-12">
              &quot;The insights provided by {formData.businessName} were pivotal in our successful Series B funding and subsequent market expansion.&quot;
            </p>
            <div className="flex flex-col items-center">
              <div className="font-black uppercase tracking-widest text-slate-900">David Henderson</div>
              <div className="text-[10px] uppercase font-bold text-slate-400 mt-2">CEO, Nexus Solutions</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ SECTION 6: PARTNER LOGOS ═══ */}
      <section className="py-20 bg-slate-50 border-y border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-16 md:gap-32 opacity-20 grayscale hover:grayscale-0 transition-all duration-700">
             <div className="text-2xl font-black italic tracking-tighter text-slate-900 uppercase">GOLDMAN</div>
             <div className="text-2xl font-black italic tracking-tighter text-slate-900 uppercase">MCKINSEY</div>
             <div className="text-2xl font-black italic tracking-tighter text-slate-900 uppercase">DELOITTE</div>
             <div className="text-2xl font-black italic tracking-tighter text-slate-900 uppercase">BOSTON</div>
             <div className="text-2xl font-black italic tracking-tighter text-slate-900 uppercase">BAIN_CO</div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 7: METHODOLOGY ═══ */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <Reveal>
               <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-12 italic leading-none text-slate-900">The Strategic <br/>Framework.</h2>
               <div className="space-y-12">
                  {[
                    { step: "01", title: "Diagnostic", desc: "In-depth audit of current systems and market positioning." },
                    { step: "02", title: "Architecture", desc: "Designing scalable frameworks tailored to your unique goals." },
                    { step: "03", title: "Execution", desc: "Rigorous implementation with continuous feedback loops." },
                  ].map((s, i) => (
                    <Reveal key={i} delay={i * 0.1} className="flex gap-8 group">
                       <div className="text-3xl font-black text-slate-200 group-hover:text-slate-900 transition-colors">{s.step}</div>
                       <div>
                          <h3 className="text-xl font-bold uppercase tracking-tight text-slate-900 mb-2">{s.title}</h3>
                          <p className="text-slate-500 text-sm leading-relaxed max-w-sm">{s.desc}</p>
                       </div>
                    </Reveal>
                  ))}
               </div>
            </Reveal>
            <Reveal delay={0.2} className="relative aspect-square bg-slate-900 rounded-[60px] overflow-hidden p-20 flex items-center justify-center">
               <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80')] bg-cover" />
               <div className="relative z-10 grid grid-cols-2 gap-4 w-full">
                  {[1, 2, 3, 4].map(i => (
                    <motion.div 
                       key={i} 
                       animate={{ scale: [1, 1.05, 1] }} 
                       transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                       className="aspect-square bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white"
                    >
                       <Shield className="w-8 h-8 opacity-20" />
                    </motion.div>
                  ))}
               </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 8: CASE STUDIES ═══ */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="mb-20">
             <h2 className="text-4xl font-black uppercase tracking-tighter text-slate-900">Proven Outcomes</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
             {[
               { title: "FinTech Scale-up", results: "300% Revenue Increase", tag: "Strategy" },
               { title: "Global Logistics", results: "25% Efficiency Gain", tag: "Ops" },
             ].map((c, i) => (
               <Reveal key={i} delay={i * 0.1}>
                 <div className="p-12 bg-white rounded-[40px] border border-slate-100 shadow-sm hover:shadow-2xl transition-all group cursor-pointer">
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">{c.tag} // Result_Verified</div>
                    <h3 className="text-3xl font-black uppercase tracking-tighter text-slate-900 mb-8">{c.title}</h3>
                    <div className="text-5xl font-black text-slate-900 italic tracking-tighter group-hover:translate-x-4 transition-transform">{c.results}</div>
                    <div className="mt-12 flex justify-end">
                       <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center"><ArrowRight className="w-5 h-5" /></div>
                    </div>
                 </div>
               </Reveal>
             ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 9: FAQ ═══ */}
      <section className="py-32 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal className="text-center mb-24">
             <h2 className="text-4xl font-black uppercase tracking-tighter text-slate-900 mb-6">Concierge Advisory</h2>
             <p className="text-slate-500 italic">Clarifying our engagement process and strategic approach.</p>
          </Reveal>
          <div className="space-y-6">
             {[
               { q: "What is the typical engagement length?", a: "Engagements typically range from 3 to 12 months, depending on the complexity of the transformation and the scale of the organization." },
               { q: "How do you measure success?", a: "We define clear KPIs at the diagnostic phase, ranging from revenue growth and market share to operational cost reduction." },
               { q: "Do you work with startups?", a: "We primarily work with Series B+ companies and established enterprises, but we have a dedicated track for high-potential early-stage ventures." },
             ].map((f, i) => (
               <Reveal key={i} delay={i * 0.1}>
                 <div className="p-8 border border-slate-100 rounded-3xl hover:bg-slate-50 transition-colors group cursor-pointer">
                    <div className="flex justify-between items-center mb-4">
                       <span className="text-sm font-black uppercase tracking-widest text-slate-900">{f.q}</span>
                       <HelpCircle className="w-4 h-4 text-slate-300 group-hover:text-slate-900 transition-colors" />
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed italic group-hover:text-slate-700 transition-colors">{f.a}</p>
                 </div>
               </Reveal>
             ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 10: CALENDAR INTEGRATION ═══ */}
      <section className="py-32 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-20">
          <Reveal className="max-w-xl">
             <h2 className="text-5xl font-black uppercase tracking-tighter mb-8 italic">Ready to Begin?</h2>
             <p className="text-xl text-slate-400 leading-relaxed mb-12">Select a time that works best for your team to discuss our potential partnership.</p>
             <div className="flex gap-6 items-center">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white"><Calendar className="w-6 h-6" /></div>
                <div className="text-sm font-black uppercase tracking-widest">Available Next Week</div>
             </div>
          </Reveal>
          <Reveal delay={0.2} className="w-full md:w-[400px] bg-white text-slate-900 p-10 rounded-[40px] shadow-2xl">
             <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-8 border-b pb-4">May 2026</div>
             <div className="grid grid-cols-7 gap-4 text-center mb-8">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(d => <div key={d} className="text-[10px] font-bold opacity-30">{d}</div>)}
                {Array.from({ length: 31 }).map((_, i) => (
                  <div key={i} className={`text-xs font-bold p-2 rounded-lg cursor-pointer transition-colors ${i+1 === 12 ? 'bg-slate-900 text-white' : 'hover:bg-slate-50'}`}>{i+1}</div>
                ))}
             </div>
             <button className="w-full py-5 bg-slate-900 text-white font-black uppercase text-[10px] tracking-widest rounded-xl hover:scale-105 transition-all">Confirm Time</button>
          </Reveal>
        </div>
      </section>

      {/* Final CTA */}
      <section id="contact" className="py-60 bg-slate-50 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <h2 className="text-7xl md:text-[10vw] font-black uppercase tracking-tighter text-slate-900 leading-none mb-16 italic">Evolve Your <br/>Perspective<span style={{ color: brand }}>.</span></h2>
            <div className="flex flex-col items-center gap-12 mt-20">
              <MagneticButton
                style={{ background: brand, color: "#fff" }}
                className="px-12 py-6 rounded-xl font-black uppercase tracking-[0.2em] text-sm shadow-2xl"
              >
                Inquire About Availability
              </MagneticButton>
              <div className="flex gap-12 text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">
                <span>London</span>
                <span>New York</span>
                <span>Dubai</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </ThemeWrapper>
  );
}
