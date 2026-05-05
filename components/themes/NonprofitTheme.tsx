"use client";

import { motion } from "framer-motion";
import type { SessionData } from "@/lib/sessions";
import { ThemeWrapper } from "./ThemeWrapper";
import { Reveal, Stagger, StaggerItem, MagneticButton } from "./AnimationHelpers";
import { Heart, Globe, Users, Shield, ArrowRight, CheckCircle, Award, HelpCircle, Activity, TrendingUp, PieChart, Star, Quote, Phone, Mail, Calendar } from "lucide-react";

export function NonprofitTheme({ session }: { session: SessionData }) {
  const { formData, generatedContent: c } = session;
  const brand = formData.brandColor || "#10b981";

  return (
    <ThemeWrapper session={session} dark={false}>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest mb-10">
              <Heart className="w-4 h-4 fill-current" /> Driven by Purpose
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-10 leading-[1] tracking-tighter text-slate-900">
              {c?.heroHeadline}
            </h1>
            <p className="text-xl text-slate-500 max-w-lg mb-16 leading-relaxed font-light italic">
              {c?.heroSubline}
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <MagneticButton
                style={{ background: brand, color: "#fff" }}
                className="px-10 py-5 rounded-2xl font-bold text-lg shadow-xl shadow-emerald-500/20"
              >
                Donate Now
              </MagneticButton>
              <button className="px-10 py-5 rounded-2xl border border-slate-200 font-bold hover:bg-slate-50 transition-all">
                Our Mission
              </button>
            </div>
          </Reveal>
          
          <Reveal delay={0.2} className="relative">
            <div className="aspect-square rounded-[60px] overflow-hidden shadow-2xl rotate-2 relative">
              <img src={formData.heroImageUrl || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&q=80"} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-xl border hidden md:block">
              <div className="text-3xl font-black mb-1 text-slate-900">$1.2M+</div>
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Raised for Impact</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-24 bg-slate-50 mt-32 border-y">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { icon: <Globe />, val: "15+", label: "Countries" },
            { icon: <Users />, val: "50k+", label: "Lives Impacted" },
            { icon: <Shield />, val: "100%", label: "Transparency" },
            { icon: <Heart />, val: "12k", label: "Volunteers" },
          ].map((m, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-white text-slate-400" style={{ color: i === 3 ? brand : undefined }}>{m.icon}</div>
                <div className="text-4xl font-black text-slate-900 mb-1">{m.val}</div>
                <div className="text-[10px] uppercase font-bold tracking-widest text-slate-400">{m.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Focus Areas */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8 text-slate-900">Our Focus Areas</h2>
              <p className="text-xl text-slate-500 font-light italic leading-relaxed">
                Directing resources where they are needed most to create sustainable change.
              </p>
            </Reveal>
          </div>

          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {c?.services.map((s, i) => (
              <StaggerItem key={i}>
                <div className="group h-full p-10 bg-white border border-slate-100 rounded-[40px] hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 bg-slate-50 group-hover:bg-white group-hover:shadow-lg transition-all" style={{ color: brand }}>
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-slate-900">{s.title}</h3>
                  <p className="text-slate-500 leading-relaxed mb-8">{s.description}</p>
                  <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-900 transition-colors">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Testimonial / Story Section */}
      <section className="py-32 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <Reveal>
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-12 leading-[0.9] italic">Stories of <br/>Transformation.</h2>
            <div className="relative p-12 bg-white/5 border border-white/10 rounded-[40px] backdrop-blur-xl">
              <p className="text-2xl font-light italic leading-relaxed mb-12">
                &quot;The support from {formData.businessName} didn&apos;t just provide a temporary fix; it gave us the tools to build a future.&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-800" />
                <div>
                  <div className="font-bold">Sarah J.</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-500">Community Leader</div>
                </div>
              </div>
            </div>
          </Reveal>
          
          <Reveal delay={0.2} className="grid grid-cols-2 gap-6">
            <div className="aspect-[3/4] rounded-3xl overflow-hidden pt-12">
              <img src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=800&q=80" className="w-full h-full object-cover grayscale" />
            </div>
            <div className="aspect-[3/4] rounded-3xl overflow-hidden pb-12">
              <img src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&q=80" className="w-full h-full object-cover grayscale" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ SECTION 6: OUR HISTORY ═══ */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
           <Reveal delay={0.2} className="order-2 lg:order-1">
              <div className="aspect-video bg-slate-50 rounded-[40px] overflow-hidden border border-slate-100 p-4">
                 <img src="https://images.unsplash.com/photo-1531206715517-5ca079f5bb5a?w=800&q=80" className="w-full h-full object-cover grayscale opacity-40 rounded-[32px]" />
              </div>
           </Reveal>
           <Reveal className="order-1 lg:order-2">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-slate-900 mb-12 italic">A Decade of <br/>Purpose.</h2>
              <div className="space-y-12">
                 {[
                   { year: "2016", title: "The Foundation", desc: "Started as a local initiative in the heart of the community." },
                   { year: "2020", title: "Rapid Expansion", desc: "Extended our reach to over 10 countries during the global crisis." },
                   { year: "2026", title: "Modern Impact", desc: "Utilizing digital infrastructure to maximize every contribution." },
                 ].map((h, i) => (
                   <div key={i} className="flex gap-8 group">
                      <div className="text-2xl font-black italic text-slate-200 group-hover:text-emerald-500 transition-colors">{h.year}</div>
                      <div>
                         <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 mb-2">{h.title}</h3>
                         <p className="text-sm text-slate-500 max-w-sm leading-relaxed">{h.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </Reveal>
        </div>
      </section>

      {/* ═══ SECTION 7: TRANSPARENCY ═══ */}
      <section className="py-32 bg-slate-50 border-y">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
           <Reveal>
              <h2 className="text-5xl font-black uppercase tracking-tighter text-slate-900 mb-10 italic leading-[0.85]">Where Your <br/>Money Goes.</h2>
              <p className="text-xl text-slate-500 leading-relaxed italic mb-12">We believe in absolute transparency. 95% of every donation goes directly to our field programs, ensuring maximum impact.</p>
              <div className="space-y-6">
                 {[
                   { label: "Field Programs", val: "95%" },
                   { label: "Administration", val: "3%" },
                   { label: "Fundraising", val: "2%" },
                 ].map((stat, i) => (
                   <div key={i} className="flex items-center gap-6">
                      <div className="text-xs font-black uppercase tracking-widest text-slate-400 w-32">{stat.label}</div>
                      <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                         <motion.div initial={{ width: 0 }} whileInView={{ width: stat.val }} transition={{ duration: 1.5, ease: "easeOut" }} className="h-full" style={{ background: brand }} />
                      </div>
                      <div className="text-sm font-black text-slate-900">{stat.val}</div>
                   </div>
                 ))}
              </div>
           </Reveal>
           <Reveal delay={0.2} className="relative aspect-square flex items-center justify-center">
              <div className="w-64 h-64 border-[20px] border-emerald-500/10 rounded-full flex items-center justify-center relative">
                 <PieChart className="w-20 h-20 text-emerald-500/40" />
                 <div className="absolute inset-0 border-[20px] border-emerald-500 border-t-transparent border-r-transparent rounded-full rotate-45" />
              </div>
           </Reveal>
        </div>
      </section>

      {/* ═══ SECTION 8: COMMUNITY ═══ */}
      <section className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6">
           <div className="flex flex-col md:flex-row justify-between items-end mb-24">
              <Reveal>
                 <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-slate-900 italic">Our People.</h2>
              </Reveal>
              <div className="text-xs font-black text-slate-300 uppercase tracking-[0.3em] hidden md:block pb-2">Meet the heart of our mission</div>
           </div>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
                "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
                "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",
                "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=400&q=80",
              ].map((img, i) => (
                <Reveal key={i} delay={i * 0.1}>
                   <div className="aspect-[3/4] rounded-3xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 relative group border border-slate-100">
                      <img src={img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                      <div className="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                         <div className="text-sm font-bold">Volunteers</div>
                         <div className="text-[10px] uppercase tracking-widest text-white/60">Field Team 2026</div>
                      </div>
                   </div>
                </Reveal>
              ))}
           </div>
        </div>
      </section>

      {/* ═══ SECTION 9: FAQ ═══ */}
      <section className="py-40 bg-slate-50 border-y">
        <div className="max-w-4xl mx-auto px-6">
           <Reveal className="text-center mb-24">
              <h2 className="text-4xl font-black uppercase tracking-tighter text-slate-900 italic">Support FAQ</h2>
           </Reveal>
           <div className="space-y-4">
              {[
                { q: "Is my donation tax-deductible?", a: "Yes, we are a registered 501(c)(3) nonprofit. You will receive an official tax receipt via email immediately after your contribution." },
                { q: "How can I volunteer my time?", a: "We have various remote and on-site opportunities. Visit our portal or contact our coordinator to find a match for your skills." },
                { q: "Can I donate on behalf of someone else?", a: "Absolutely. We offer commemorative gift cards for honorary donations made in the name of a loved one or colleague." },
              ].map((f, i) => (
                <Reveal key={i} delay={i * 0.1}>
                   <div className="p-10 bg-white border border-slate-200 hover:shadow-xl transition-all group cursor-pointer rounded-3xl">
                      <div className="flex justify-between items-center mb-6">
                         <span className="text-sm font-black uppercase tracking-widest text-slate-600 group-hover:text-emerald-600 transition-colors">{f.q}</span>
                         <HelpCircle className="w-5 h-5 text-slate-300 group-hover:text-emerald-600 transition-colors" />
                      </div>
                      <p className="text-sm text-slate-400 leading-relaxed italic group-hover:text-slate-600 transition-colors">{f.a}</p>
                   </div>
                </Reveal>
              ))}
           </div>
        </div>
      </section>

      {/* ═══ SECTION 10: PARTNERS ═══ */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
           <div className="flex flex-wrap justify-center gap-16 md:gap-32 opacity-20 grayscale hover:grayscale-0 transition-all duration-700">
              <div className="text-2xl font-black italic tracking-tighter text-slate-900 uppercase">UNICEF_GIFT</div>
              <div className="text-2xl font-black italic tracking-tighter text-slate-900 uppercase">RED_CROSS</div>
              <div className="text-2xl font-black italic tracking-tighter text-slate-900 uppercase">SAVE_PLANET</div>
              <div className="text-2xl font-black italic tracking-tighter text-slate-900 uppercase">TRUST_AID</div>
           </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-48 bg-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <h2 className="text-6xl md:text-[8vw] font-black uppercase tracking-tighter text-slate-900 leading-none mb-16 italic">Your Contribution <br/>Changes Everything.</h2>
            <div className="flex flex-col items-center gap-12 mt-20">
              <MagneticButton
                style={{ background: brand, color: "#fff" }}
                className="px-16 py-8 rounded-full font-black uppercase tracking-[0.3em] text-sm shadow-2xl"
              >
                Become a Partner
              </MagneticButton>
              <div className="text-xs font-black uppercase tracking-[0.5em] text-slate-300">
                Small Acts // Huge Impact
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </ThemeWrapper>
  );
}
