"use client";

import { motion } from "framer-motion";
import type { SessionData } from "@/lib/sessions";
import { ThemeWrapper } from "./ThemeWrapper";
import { Reveal, Stagger, StaggerItem, MagneticButton } from "./AnimationHelpers";
import { Sparkles, ArrowRight, Layers, Layout, MousePointer2, Smartphone, Activity, Cpu, Globe, Shield, Star, Award, HelpCircle, Quote, Phone, Mail, Search, CheckCircle } from "lucide-react";

export function VitrineModernTheme({ session }: { session: SessionData }) {
  const { formData, generatedContent: c } = session;
  const brand = formData.brandColor || "#7c3aed";

  return (
    <ThemeWrapper session={session} dark={false}>
      {/* Vibrant Background Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] opacity-20" style={{ background: brand }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] opacity-20" style={{ background: '#f43f5e' }} />
      </div>

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/50 backdrop-blur-xl border border-white text-[10px] font-black uppercase tracking-widest mb-10 shadow-sm">
                <Sparkles className="w-3 h-3 text-amber-500" /> Shaping The Future
              </div>
              <h1 className="text-6xl md:text-8xl font-black mb-10 leading-[1] tracking-tighter text-black">
                {c?.heroHeadline}
              </h1>
              <p className="text-xl text-gray-500 max-w-lg mb-16 leading-relaxed font-medium">
                {c?.heroSubline}
              </p>
              <div className="flex gap-6">
                <MagneticButton
                  style={{ background: brand, color: "#fff" }}
                  className="px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl shadow-indigo-500/20"
                >
                  Get Started <ArrowRight className="inline-block ml-2 w-5 h-5" />
                </MagneticButton>
              </div>
            </Reveal>
            
            <Reveal delay={0.3} className="relative">
              <div className="relative z-10 p-4 bg-white/30 backdrop-blur-3xl rounded-[40px] border border-white shadow-2xl overflow-hidden group">
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  src={formData.heroImageUrl || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80"} 
                  className="w-full rounded-[32px] shadow-lg transition-all duration-700" 
                />
              </div>
              {/* Floating glass element */}
              <motion.div 
                animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute -top-10 -right-10 w-40 h-40 bg-white/40 backdrop-blur-2xl rounded-3xl border border-white/50 shadow-xl z-20 hidden lg:flex items-center justify-center p-6 text-center"
              >
                <div className="text-xs font-black uppercase tracking-widest leading-tight">Next Gen Solution</div>
              </motion.div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Services Grid (Modern) */}
      <section className="py-32 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <Reveal>
              <h2 className="text-5xl font-black uppercase tracking-tighter mb-8 leading-none">Modern Capabilities</h2>
              <p className="text-xl text-gray-500 font-light italic">
                Pushing the boundaries of what&apos;s possible in {formData.businessType}.
              </p>
            </Reveal>
          </div>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Layout />, label: "Interface Systems" },
              { icon: <MousePointer2 />, label: "Interactivity" },
              { icon: <Smartphone />, label: "Mobile First" },
              { icon: <Layers />, label: "Architecture" },
            ].map((s, i) => (
              <StaggerItem key={i}>
                <div className="group h-full p-10 rounded-[32px] bg-white border border-transparent hover:border-white hover:shadow-2xl hover:scale-105 transition-all duration-500 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 bg-gray-50 group-hover:bg-white group-hover:shadow-lg transition-all" style={{ color: brand }}>
                    {s.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4 uppercase tracking-tight">{s.label}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    High-end implementation with focus on premium quality and performance.
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* About Section with Big Text */}
      <section className="py-40 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <Reveal className="relative">
              <div className="aspect-square rounded-[60px] bg-gray-100 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200&q=80" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white rounded-full flex items-center justify-center animate-spin-slow">
                <div className="text-[10px] font-black uppercase tracking-widest">Premium Quality · Excellence ·</div>
              </div>
            </Reveal>
            
            <Reveal delay={0.2}>
              <h2 className="text-6xl font-black uppercase tracking-tighter mb-12 leading-[0.9]">
                Redefining the <br/><span style={{ color: brand }}>Standards</span>.
              </h2>
              <p className="text-xl text-gray-500 leading-relaxed mb-16 italic">
                {c?.aboutText}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {formData.benefits.map((b, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: brand + '20', color: brand }}>
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-xs font-black uppercase tracking-widest leading-tight">{b}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 5: DASHBOARD SHOWCASE ═══ */}
      <section className="py-40 bg-gray-50 border-y border-white">
        <div className="max-w-7xl mx-auto px-6">
           <Reveal className="mb-24 text-center">
              <h2 className="text-5xl font-black uppercase tracking-tighter italic">Unified Intelligence.</h2>
           </Reveal>
           <Reveal delay={0.2} className="p-8 bg-white/40 backdrop-blur-3xl rounded-[60px] border border-white shadow-2xl overflow-hidden group">
              <div className="aspect-video bg-indigo-50 rounded-[40px] overflow-hidden flex items-center justify-center relative">
                 <img src="https://images.unsplash.com/photo-1551288049-bbda446b17ad?w=1200&q=80" className="w-full h-full object-cover grayscale opacity-20" />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                       {[1, 2, 3].map(i => (
                         <div key={i} className="w-40 h-40 bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg flex flex-col items-center justify-center p-6 border border-white">
                            <Activity className="w-8 h-8 text-indigo-500 mb-4" />
                            <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">Node_0{i}</div>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
           </Reveal>
        </div>
      </section>

      {/* ═══ SECTION 6: GLASS STATS ═══ */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
           {[
             { val: "99.9%", label: "System Uptime" },
             { val: "250ms", label: "Core Latency" },
             { val: "1.2M", label: "Active Nodes" },
             { val: "Secured", label: "Protocol V2" },
           ].map((s, i) => (
             <Reveal key={i} delay={i * 0.1}>
                <div className="p-10 rounded-[32px] bg-white/20 backdrop-blur-xl border border-white text-center shadow-sm hover:shadow-xl transition-all group">
                   <div className="text-4xl font-black text-black mb-2 group-hover:scale-110 transition-transform italic">{s.val}</div>
                   <div className="text-[10px] uppercase font-black tracking-widest text-gray-400">{s.label}</div>
                </div>
             </Reveal>
           ))}
        </div>
      </section>

      {/* ═══ SECTION 7: CLIENT ECOSYSTEM ═══ */}
      <section className="py-24 bg-white/50 backdrop-blur-sm border-y border-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
           <div className="flex flex-wrap justify-center gap-16 md:gap-32 opacity-20 grayscale hover:grayscale-0 transition-all duration-700">
              <div className="text-2xl font-black italic tracking-tighter text-black uppercase">ALPHA_TECH</div>
              <div className="text-2xl font-black italic tracking-tighter text-black uppercase">VANTAGE_CO</div>
              <div className="text-2xl font-black italic tracking-tighter text-black uppercase">ZEPHYR_LABS</div>
              <div className="text-2xl font-black italic tracking-tighter text-black uppercase">ORION_SYS</div>
           </div>
        </div>
      </section>

      {/* ═══ SECTION 8: JOURNEY TIMELINE ═══ */}
      <section className="py-40 bg-white">
        <div className="max-w-4xl mx-auto px-6">
           <Reveal className="mb-24">
              <h2 className="text-5xl font-black uppercase tracking-tighter italic text-center">The Evolution.</h2>
           </Reveal>
           <div className="space-y-4">
              {[
                { stage: "Phase 01", title: "Core Integration", desc: "Seamlessly connecting legacy systems with modern cloud infrastructure." },
                { stage: "Phase 02", title: "Linear Scaling", desc: "Achieving horizontal scalability across distributed global clusters." },
                { stage: "Phase 03", title: "Autonomous Ops", stageColor: brand, desc: "Implementing AI-driven orchestration for zero-touch maintenance." },
              ].map((step, i) => (
                <Reveal key={i} delay={i * 0.1}>
                   <div className="p-12 bg-gray-50 border border-white hover:bg-white hover:shadow-2xl transition-all group flex flex-col md:flex-row justify-between items-start md:items-center gap-12 rounded-[3rem]">
                      <div className="text-xl font-black italic text-gray-200 group-hover:text-black transition-colors">{step.stage}</div>
                      <div className="flex-1">
                         <h3 className="text-2xl font-black uppercase tracking-tight text-black mb-2">{step.title}</h3>
                         <p className="text-sm text-gray-400 max-w-sm italic leading-tight">{step.desc}</p>
                      </div>
                      <div className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                         <ArrowRight className="w-5 h-5" />
                      </div>
                   </div>
                </Reveal>
              ))}
           </div>
        </div>
      </section>

      {/* ═══ SECTION 9: CASE STUDIES ═══ */}
      <section className="py-40 bg-gray-50 border-y border-white">
        <div className="max-w-7xl mx-auto px-6">
           <div className="flex flex-col md:flex-row justify-between items-end mb-24">
              <Reveal>
                 <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic">Proof of Scale.</h2>
              </Reveal>
              <div className="text-[10px] font-black text-gray-300 uppercase tracking-widest hidden md:block pb-2 italic">Live Implementations // 2026</div>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <Reveal key={i} delay={i * 0.1}>
                   <div className="group cursor-pointer">
                      <div className="aspect-[4/3] rounded-[40px] overflow-hidden mb-8 border border-white shadow-lg">
                         <img src={`https://images.unsplash.com/photo-${1500000000000 + i * 10000}?w=800&q=80`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                      </div>
                      <h3 className="text-2xl font-black uppercase tracking-tight mb-2 italic">Enterprise_{i}</h3>
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Digital Transformation</div>
                   </div>
                </Reveal>
              ))}
           </div>
        </div>
      </section>

      {/* ═══ SECTION 10: MODERN FAQ ═══ */}
      <section className="py-40 bg-white">
        <div className="max-w-4xl mx-auto px-6">
           <Reveal className="text-center mb-24">
              <h2 className="text-4xl font-black uppercase tracking-tighter italic">Common Queries</h2>
           </Reveal>
           <div className="space-y-4">
              {[
                { q: "How long is the integration process?", a: "Most enterprise systems are fully migrated within 4 to 6 weeks using our proprietary bridge-protocol." },
                { q: "Is the architecture future-proof?", a: "Our platform utilizes a modular, micro-services based architecture that allows for hot-swapping core components as technology evolves." },
                { q: "Do you offer global support?", a: "Yes, our engineering teams operate in follow-the-sun cycles across 3 continents to ensure 24/7 coverage." },
              ].map((f, i) => (
                <Reveal key={i} delay={i * 0.1}>
                   <div className="p-10 border border-gray-100 hover:bg-gray-50 transition-all group cursor-pointer rounded-[2.5rem]">
                      <div className="flex justify-between items-center mb-6">
                         <span className="text-sm font-black uppercase tracking-widest text-gray-600 group-hover:text-black transition-colors">{f.q}</span>
                         <HelpCircle className="w-5 h-5 text-gray-200 group-hover:text-black transition-colors" />
                      </div>
                      <p className="text-sm text-gray-400 leading-relaxed italic group-hover:text-gray-600 transition-colors">{f.a}</p>
                   </div>
                </Reveal>
              ))}
           </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-60 bg-white text-center relative overflow-hidden">
        {/* Background Text Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none">
          <div className="text-[30vw] font-black uppercase tracking-tighter whitespace-nowrap">CONTACT</div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <Reveal>
            <h2 className="text-7xl md:text-9xl font-black uppercase tracking-tighter mb-16 italic">Let&apos;s Build.</h2>
            <p className="text-xl text-gray-400 mb-20 max-w-xl mx-auto">
              Ready to elevate your digital presence to the next level?
            </p>
            <MagneticButton
              style={{ background: brand, color: "#fff" }}
              className="px-12 py-6 rounded-full font-black uppercase tracking-[0.2em] text-sm shadow-2xl"
            >
              Start The Project
            </MagneticButton>
          </Reveal>
        </div>
      </section>

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}</style>
    </ThemeWrapper>
  );
}
