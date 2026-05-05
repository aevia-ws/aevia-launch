"use client";

import { motion } from "framer-motion";
import type { SessionData } from "@/lib/sessions";
import { ThemeWrapper } from "./ThemeWrapper";
import { Reveal, Stagger, StaggerItem, MagneticButton } from "./AnimationHelpers";
import { Shield, Clock, Heart, Users, Activity, PlusCircle, CheckCircle2, Stethoscope, Award, HelpCircle, MapPin, Star, ArrowRight, Quote } from "lucide-react";

export function HealthcareTheme({ session }: { session: SessionData }) {
  const { formData, generatedContent: c } = session;
  const brand = formData.brandColor || "#0ea5e9";

  return (
    <ThemeWrapper session={session} dark={false}>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center pt-20 bg-gradient-to-br from-white via-sky-50 to-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-100 text-blue-600 text-[10px] font-black uppercase tracking-widest mb-8">
              <PlusCircle className="w-4 h-4" /> Trusted Healthcare Solutions
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight text-slate-900">
              {c?.heroHeadline}
            </h1>
            <p className="text-xl text-slate-500 max-w-xl mb-12 leading-relaxed font-medium">
              {c?.heroSubline}
            </p>
            <div className="flex gap-6">
              <MagneticButton
                href="#appointment"
                style={{ background: brand, color: "#fff" }}
                className="px-10 py-4 rounded-xl font-bold text-lg shadow-xl shadow-blue-500/20"
              >
                Book Appointment
              </MagneticButton>
            </div>
          </Reveal>
          
          <Reveal delay={0.2} className="relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative">
              <img 
                src={formData.heroImageUrl || "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80"} 
                className="w-full h-full object-cover" 
              />
            </div>
            {/* Floating stats card */}
            <div className="absolute top-10 -left-10 bg-white p-6 rounded-2xl shadow-xl border hidden md:block">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-black leading-none">4.9/5</div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Patient Satisfaction</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <Reveal>
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-6 text-slate-900">Comprehensive Care</h2>
              <p className="text-lg text-slate-500 leading-relaxed font-light italic">
                Advanced medical services provided by world-class specialists in {formData.businessType}.
              </p>
            </Reveal>
          </div>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {c?.services.map((s, i) => (
              <StaggerItem key={i}>
                <div className="group h-full p-10 bg-slate-50 border border-slate-100 rounded-[32px] hover:bg-white hover:shadow-2xl hover:scale-[1.02] transition-all duration-500">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 bg-white shadow-sm" style={{ color: brand }}>
                    <Activity className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-slate-900">{s.title}</h3>
                  <p className="text-slate-500 leading-relaxed mb-8">{s.description}</p>
                  <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-900 transition-colors">
                    Learn More <PlusCircle className="w-4 h-4" />
                  </button>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Metrics Bar */}
      <section className="py-24 border-y bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { icon: <Users />, val: "10k+", label: "Patients Treated" },
            { icon: <Heart />, val: "25+", label: "Specialists" },
            { icon: <Shield />, val: "100%", label: "HIPAA Compliant" },
            { icon: <Clock />, val: "24/7", label: "Emergency" },
          ].map((m, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-white text-slate-400" style={{ color: i === 0 ? brand : undefined }}>{m.icon}</div>
                <div className="text-4xl font-black text-slate-900 mb-1">{m.val}</div>
                <div className="text-[10px] uppercase font-black tracking-widest text-slate-400">{m.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Expertise & Values */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <Reveal>
            <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl relative">
              <img src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=800&q=80" className="w-full h-full object-cover" />
            </div>
          </Reveal>
          
          <Reveal delay={0.2}>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-10 leading-tight text-slate-900">Your Health, <br/>Our Priority.</h2>
            <p className="text-lg text-slate-500 leading-relaxed mb-12">
              {c?.aboutText}
            </p>
            <div className="space-y-6">
              {formData.benefits.map((b, i) => (
                <div key={i} className="flex items-center gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center bg-white text-emerald-500 shadow-sm">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="font-bold text-sm text-slate-900 uppercase tracking-wide">{b}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ SECTION 7: DEPARTMENTS ═══ */}
      <section className="py-32 bg-slate-50 border-y">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="mb-20 text-center">
             <h2 className="text-4xl font-black uppercase tracking-tighter text-slate-900 mb-6">Our Departments</h2>
             <div className="w-16 h-1 mx-auto" style={{ background: brand }} />
          </Reveal>
          <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-8">
             {[
               { title: "Cardiology", icon: <Heart /> },
               { title: "Neurology", icon: <Activity /> },
               { title: "Pediatrics", icon: <PlusCircle /> },
               { title: "Orthopedics", icon: <Shield /> },
             ].map((d, i) => (
               <StaggerItem key={i}>
                 <div className="p-10 bg-white rounded-3xl text-center border border-slate-100 hover:shadow-xl transition-all cursor-pointer group">
                    <div className="w-12 h-12 mx-auto mb-6 flex items-center justify-center rounded-2xl bg-slate-50 group-hover:scale-110 transition-transform" style={{ color: brand }}>{d.icon}</div>
                    <div className="font-black uppercase tracking-tight text-sm text-slate-900">{d.title}</div>
                 </div>
               </StaggerItem>
             ))}
          </Stagger>
        </div>
      </section>

      {/* ═══ SECTION 8: MEDICAL TEAM ═══ */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <Reveal>
               <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-slate-900">Expert Specialists</h2>
            </Reveal>
            <button className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 transition-colors">
               Meet Entire Staff <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
             {[
               { name: "Dr. Sarah Miller", role: "Chief Cardiologist", img: "https://images.unsplash.com/photo-1559839734-2b71f1536783?w=400&q=80" },
               { name: "Dr. James Wilson", role: "Neurologist", img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80" },
               { name: "Dr. Elena Korr", role: "Pediatric Lead", img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80" },
             ].map((dr, i) => (
               <Reveal key={i} delay={i * 0.1}>
                 <div className="group relative rounded-[40px] overflow-hidden aspect-[4/5]">
                    <img src={dr.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-10 left-10 text-white">
                       <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-2">{dr.name}</h3>
                       <p className="text-xs uppercase tracking-widest text-slate-400">{dr.role}</p>
                    </div>
                 </div>
               </Reveal>
             ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 9: PATIENT TESTIMONIALS ═══ */}
      <section className="py-32 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <Reveal>
             <h2 className="text-5xl font-black uppercase tracking-tighter mb-12 italic leading-tight">Lives <br/>Changed.</h2>
             <p className="text-xl text-slate-400 font-light leading-relaxed max-w-md italic mb-16">
                Hear directly from our patients about their experiences and the quality of care they received at our facility.
             </p>
             <div className="flex gap-4">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />)}
             </div>
          </Reveal>
          <div className="relative">
             <Reveal className="p-12 bg-white/5 border border-white/10 rounded-[60px] backdrop-blur-3xl">
                <Quote className="w-12 h-12 text-white/10 mb-8" />
                <p className="text-2xl font-light italic leading-relaxed mb-10 text-slate-300">
                   &quot;The attention to detail and compassion shown by the staff was beyond anything I expected. They truly saved my life.&quot;
                </p>
                <div className="font-black uppercase tracking-widest text-sm">— Mark Henderson</div>
             </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 10: PARTNERS & INSURANCE ═══ */}
      <section className="py-24 bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Reveal className="mb-16">
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">Accepted Insurance Partners</span>
          </Reveal>
          <div className="flex flex-wrap justify-center gap-16 md:gap-32 opacity-20 grayscale hover:grayscale-0 transition-all duration-700">
             <div className="text-2xl font-black italic tracking-tighter text-slate-900 uppercase">AETNA</div>
             <div className="text-2xl font-black italic tracking-tighter text-slate-900 uppercase">CIGNA</div>
             <div className="text-2xl font-black italic tracking-tighter text-slate-900 uppercase">BLUE_CROSS</div>
             <div className="text-2xl font-black italic tracking-tighter text-slate-900 uppercase">KAISER</div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="appointment" className="py-40 bg-slate-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-8 italic">Taking The First Step.</h2>
            <p className="text-lg text-slate-400 mb-12 max-w-xl mx-auto font-light">
              We are accepting new patients. Schedule your first consultation with our team of specialists today.
            </p>
            <MagneticButton
              style={{ background: brand, color: "#fff" }}
              className="px-12 py-6 rounded-xl font-black uppercase tracking-[0.2em] text-sm shadow-2xl"
            >
              Request Appointment
            </MagneticButton>
            <div className="mt-12 flex justify-center gap-8 text-[10px] font-black uppercase tracking-widest text-slate-600">
              <span>Emergency: 911</span>
              <span>Front Desk: {formData.phone || "Call Us"}</span>
            </div>
          </Reveal>
        </div>
      </section>
    </ThemeWrapper>
  );
}
