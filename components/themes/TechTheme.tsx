"use client";

import { motion } from "framer-motion";
import type { SessionData } from "@/lib/sessions";
import { ThemeWrapper } from "./ThemeWrapper";
import { Reveal, Stagger, StaggerItem, MagneticButton } from "./AnimationHelpers";
import { Cpu, Zap, Shield, BarChart3, ChevronRight, Binary, Fingerprint, Database, Network, Award, HelpCircle, Activity, Star, Quote, Globe, Phone, Mail, ArrowRight } from "lucide-react";

export function TechTheme({ session }: { session: SessionData }) {
  const { formData, generatedContent: c } = session;
  const brand = formData.brandColor || "#3b82f6"; // Tech Blue fallback

  return (
    <ThemeWrapper session={session} dark={true}>
      {/* Mesh Gradient Background */}
      <div className="fixed inset-0 z-0 bg-[#050505]">
        <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full opacity-20 blur-[150px] mix-blend-screen animate-pulse" style={{ background: brand }} />
        <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] rounded-full opacity-10 blur-[150px] mix-blend-screen" style={{ background: '#f43f5e' }} />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] mb-12 text-zinc-400">
              <Binary className="w-4 h-4 text-white" /> Decentralized Infrastructure 3.0
            </div>
            <h1 className="text-6xl md:text-[9vw] font-black mb-12 leading-[0.8] tracking-tighter text-white uppercase italic">
              {c?.heroHeadline}
            </h1>
            <p className="text-xl md:text-2xl text-zinc-500 max-w-3xl mx-auto mb-16 leading-relaxed font-light">
              {c?.heroSubline}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <MagneticButton
                style={{ background: brand, color: "#fff" }}
                className="px-12 py-5 rounded-none font-black uppercase tracking-[0.2em] text-xs shadow-[0_0_50px_rgba(59,130,246,0.3)]"
              >
                Launch Protocol
              </MagneticButton>
              <button className="px-12 py-5 border border-white/10 rounded-none font-black uppercase tracking-[0.2em] text-xs hover:bg-white/5 transition-all">
                Whitepaper
              </button>
            </div>
          </Reveal>
        </div>

        {/* 3D Bobbing Asset */}
        <Reveal delay={0.4} className="max-w-4xl mx-auto px-6 mt-32 relative">
          <motion.div 
            animate={{ y: [0, -20, 0], rotate: [0, 2, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative aspect-video rounded-[40px] border border-white/10 bg-zinc-900 overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)]"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
            <img src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&q=80" className="w-full h-full object-cover grayscale opacity-40" />
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="w-40 h-40 rounded-full border border-white/20 flex items-center justify-center animate-spin-slow">
                <div className="text-[8px] font-black uppercase tracking-[0.5em] text-white">SYSTEM ACTIVE · SYSTEM ACTIVE ·</div>
              </div>
            </div>
          </motion.div>
          {/* Decorative scanner line */}
          <motion.div 
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent z-30 opacity-50"
          />
        </Reveal>
      </section>

      {/* Feature Grid */}
      <section className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Cpu />, label: "Edge Computing", desc: "Low-latency processing at the global network edge." },
              { icon: <Shield />, label: "Encrypted Core", desc: "End-to-end security protocols for data integrity." },
              { icon: <BarChart3 />, label: "Real-time Metrics", desc: "Deep analytical insights with zero lag." },
            ].map((f, i) => (
              <StaggerItem key={i}>
                <div className="group h-full p-12 bg-zinc-900/50 backdrop-blur-xl border border-white/5 rounded-[32px] hover:border-white/20 transition-all duration-500">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 bg-zinc-800 text-white group-hover:scale-110 transition-transform" style={{ color: brand }}>
                    {f.icon}
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tight mb-4 text-white">{f.label}</h3>
                  <p className="text-zinc-500 leading-relaxed text-sm">{f.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Kinetic Typography Section */}
      <section className="py-40 bg-white text-black relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <Reveal>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-12 leading-[0.85] italic">High Performance<br/>By Design.</h2>
            <p className="text-xl text-zinc-500 leading-relaxed mb-16 font-light">
              {c?.aboutText}
            </p>
            <div className="space-y-8">
              {formData.benefits.map((b, i) => (
                <div key={i} className="flex items-center gap-6 group cursor-pointer">
                  <div className="w-12 h-12 rounded-full border border-zinc-100 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                    <Fingerprint className="w-5 h-5" />
                  </div>
                  <div className="text-lg font-black uppercase tracking-tight">{b}</div>
                </div>
              ))}
            </div>
          </Reveal>
          
          <Reveal delay={0.2} className="relative">
            <div className="aspect-square bg-zinc-900 rounded-[80px] p-20 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80')] bg-cover" />
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-full h-full border border-white/10 rounded-full flex items-center justify-center"
              >
                <div className="w-[80%] h-[80%] border border-white/10 rounded-full" />
              </motion.div>
              <div className="absolute text-center z-10">
                <div className="text-7xl font-black text-white italic leading-none">V2</div>
                <div className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30 mt-4">Protocol Version</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ SECTION 5: PROTOCOL STATS ═══ */}
      <section className="py-24 relative z-10 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
           {[
             { val: "1.2ms", label: "Global Sync" },
             { val: "100%", label: "Uptime SLA" },
             { val: "Petabyte", label: "Scaleable" },
             { val: "0.001%", label: "Failure Rate" },
           ].map((s, i) => (
             <Reveal key={i} delay={i * 0.1}>
                <div className="text-4xl md:text-5xl font-black text-white mb-2 italic tracking-tighter">{s.val}</div>
                <div className="text-[10px] uppercase font-black tracking-widest text-zinc-500">{s.label}</div>
             </Reveal>
           ))}
        </div>
      </section>

      {/* ═══ SECTION 6: ARCHITECTURE ═══ */}
      <section className="py-40 relative z-10 overflow-hidden bg-white/5 backdrop-blur-3xl">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
           <Reveal delay={0.2} className="relative order-2 lg:order-1">
              <div className="aspect-square bg-zinc-950 rounded-[40px] border border-white/10 p-12 flex flex-col justify-center gap-12 overflow-hidden">
                 <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80')] bg-cover" />
                 {[
                   { label: "Application Layer", color: brand },
                   { label: "Consensus Engine", color: "#f43f5e" },
                   { label: "Persistent Storage", color: "#10b981" },
                 ].map((layer, i) => (
                   <div key={i} className="relative z-10 p-8 border border-white/10 rounded-2xl bg-black/40 backdrop-blur-md">
                      <div className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-40">{layer.label}</div>
                      <div className="h-1 w-full bg-zinc-800 overflow-hidden"><motion.div animate={{ x: ["-100%", "100%"] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="h-full w-1/2" style={{ background: layer.color }} /></div>
                   </div>
                 ))}
              </div>
           </Reveal>
           <Reveal className="order-1 lg:order-2">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white italic mb-10 leading-none">Modular <br/>Intelligence.</h2>
              <p className="text-xl text-zinc-500 leading-relaxed italic mb-12">Our architecture is designed for extreme scalability, separating the application layer from the consensus engine for maximum performance.</p>
              <button className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-white/40 hover:text-white transition-colors group">
                 Review Specifications <ArrowRight className="w-4 h-4 group-hover:translate-x-4 transition-transform" />
              </button>
           </Reveal>
        </div>
      </section>

      {/* ═══ SECTION 7: TRUST & SECURITY ═══ */}
      <section className="py-40 relative z-10 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
           <Reveal>
              <h2 className="text-5xl font-black uppercase tracking-tighter text-white italic mb-12 leading-[0.9]">Hardened <br/>Security.</h2>
              <div className="space-y-12">
                 {[
                   { title: "Penetration Tested", desc: "Weekly audits by third-party cybersecurity specialists." },
                   { title: "Quantum Shield", desc: "Post-quantum encryption standard across all endpoints." },
                   { title: "Cold Core", desc: "Air-gapped transaction signing for high-value operations." },
                 ].map((s, i) => (
                   <div key={i} className="flex gap-8 group cursor-pointer">
                      <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                         <Shield className="w-5 h-5" />
                      </div>
                      <div>
                         <h3 className="text-lg font-black uppercase tracking-widest text-white mb-2">{s.title}</h3>
                         <p className="text-sm text-zinc-500 max-w-sm leading-relaxed">{s.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </Reveal>
           <Reveal delay={0.2} className="relative aspect-square">
              <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-[100px] animate-pulse" />
              <div className="relative h-full w-full flex items-center justify-center">
                 <div className="w-64 h-64 border border-white/5 rounded-full flex items-center justify-center animate-spin-slow">
                    <div className="w-32 h-32 border border-white/20 rounded-full flex items-center justify-center">
                       <Fingerprint className="w-12 h-12 text-white opacity-40" />
                    </div>
                 </div>
              </div>
           </Reveal>
        </div>
      </section>

      {/* ═══ SECTION 8: ECOSYSTEM ═══ */}
      <section className="py-32 relative z-10 border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
           <Reveal className="mb-20">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-600">The Connected Network</span>
           </Reveal>
           <div className="flex flex-wrap justify-center gap-16 md:gap-32 opacity-10 grayscale hover:grayscale-0 transition-all duration-700">
              <div className="text-2xl font-black italic tracking-tighter text-white uppercase">ETHER_NET</div>
              <div className="text-2xl font-black italic tracking-tighter text-white uppercase">BLOCK_ONE</div>
              <div className="text-2xl font-black italic tracking-tighter text-white uppercase">NEON_LABS</div>
              <div className="text-2xl font-black italic tracking-tighter text-white uppercase">CYBER_SYS</div>
           </div>
        </div>
      </section>

      {/* ═══ SECTION 9: FAQ ═══ */}
      <section className="py-40 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
           <Reveal className="text-center mb-24">
              <h2 className="text-4xl font-black uppercase tracking-tighter italic text-white">Technical Protocols</h2>
           </Reveal>
           <div className="space-y-4">
              {[
                { q: "Is the protocol open source?", a: "The core engine is dual-licensed under GPLv3 and our Enterprise Commercial License for corporate deployments." },
                { q: "What is the maximum throughput?", a: "Current benchmarks show sustained performance of 150k TPS across a distributed 100-node mesh." },
                { q: "Do you offer on-premise installation?", a: "Yes, our engineers provide white-glove deployment for private cloud or air-gapped data centers." },
              ].map((f, i) => (
                <Reveal key={i} delay={i * 0.1}>
                   <div className="p-10 border border-white/5 hover:bg-white/5 transition-all group cursor-pointer">
                      <div className="flex justify-between items-center mb-6">
                         <span className="text-sm font-black uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors">{f.q}</span>
                         <HelpCircle className="w-5 h-5 text-zinc-800 group-hover:text-white transition-colors" />
                      </div>
                      <p className="text-sm text-zinc-600 leading-relaxed italic group-hover:text-zinc-400 transition-colors">{f.a}</p>
                   </div>
                </Reveal>
              ))}
           </div>
        </div>
      </section>

      {/* ═══ SECTION 10: PARTNER LOGOS ═══ */}
      <section className="py-24 relative z-10 bg-zinc-950 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
           <div className="flex flex-wrap justify-center gap-16 md:gap-32 opacity-20 grayscale hover:grayscale-0 transition-all duration-700">
              <div className="text-2xl font-black italic tracking-tighter text-white uppercase">AMD</div>
              <div className="text-2xl font-black italic tracking-tighter text-white uppercase">INTEL_CO</div>
              <div className="text-2xl font-black italic tracking-tighter text-white uppercase">CISCO_SYS</div>
              <div className="text-2xl font-black italic tracking-tighter text-white uppercase">IBM_TECH</div>
           </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-60 relative z-10 bg-[#050505] text-center">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <h2 className="text-7xl md:text-[10vw] font-black uppercase tracking-tighter text-white leading-none mb-16 italic">Initialize<br/>Deployment.</h2>
            <div className="flex flex-col items-center gap-12">
              <MagneticButton
                style={{ background: brand, color: "#fff" }}
                className="px-16 py-8 rounded-none font-black uppercase tracking-[0.3em] text-sm shadow-[0_0_80px_rgba(59,130,246,0.4)]"
              >
                Access Terminal
              </MagneticButton>
              <div className="flex gap-12 text-[10px] font-black uppercase tracking-[0.5em] text-zinc-600">
                <span>Core.v2.0</span>
                <span>System.Online</span>
                <span>{formData.city}</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }
      `}</style>
    </ThemeWrapper>
  );
}
