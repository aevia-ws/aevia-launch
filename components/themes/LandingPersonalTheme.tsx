"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { SessionData } from "@/lib/sessions";
import { ThemeWrapper } from "./ThemeWrapper";
import { Reveal, Stagger, StaggerItem, MagneticButton } from "./AnimationHelpers";
import { ArrowDown, Mail, Globe, MessageSquare, ExternalLink, Award, HelpCircle, Activity, CheckCircle, TrendingUp, Quote, Search, Phone, Shield, Zap, ArrowRight, PlayCircle } from "lucide-react";

export function LandingPersonalTheme({ session }: { session: SessionData }) {
  const { formData, generatedContent: c } = session;
  const brand = formData.brandColor || "#7c3aed";
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const profileY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const textX = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <ThemeWrapper session={session} dark={false}>
      {/* Noise Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[200] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-multiply" />

      <section ref={containerRef} className="relative min-h-screen flex flex-col justify-center pt-20 overflow-hidden bg-[#fafafa]">
        {/* Organic Shadows / Blobs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-gray-200 to-transparent rounded-full blur-[120px] opacity-40 -translate-y-1/2 translate-x-1/4" />
        
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
          <Reveal>
            <div className="inline-flex items-center gap-3 mb-10">
              <span className="w-10 h-[1px]" style={{ background: brand }} />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Personal Brand // 2026</span>
            </div>
            <motion.h1 
              style={{ x: textX }}
              className="text-7xl md:text-9xl font-black mb-12 leading-[0.9] tracking-tighter text-black"
            >
              {formData.businessName}.
            </motion.h1>
            <h2 className="text-3xl md:text-5xl font-light italic text-gray-400 mb-12 leading-tight">
              {c?.heroHeadline}
            </h2>
            <p className="text-xl text-gray-500 max-w-lg mb-16 leading-relaxed">
              {c?.heroSubline}
            </p>
            <div className="flex flex-wrap gap-12 items-center">
              <MagneticButton
                href="#contact"
                style={{ background: brand, color: "#fff" }}
                className="px-12 py-5 rounded-full font-bold text-lg shadow-xl"
              >
                Let&apos;s Connect
              </MagneticButton>
              <div className="flex gap-6">
                <Globe className="w-5 h-5 text-gray-300 hover:text-black transition-colors cursor-pointer" />
                <Globe className="w-5 h-5 text-gray-300 hover:text-black transition-colors cursor-pointer" />
                <Globe className="w-5 h-5 text-gray-300 hover:text-black transition-colors cursor-pointer" />
              </div>
            </div>
          </Reveal>

          <div className="relative">
            <motion.div 
              style={{ y: profileY }}
              className="aspect-[4/5] rounded-[60px] overflow-hidden shadow-2xl relative z-10 border-[12px] border-white"
            >
              <img 
                src={formData.heroImageUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"} 
                className="w-full h-full object-cover" 
                alt={formData.businessName}
              />
            </motion.div>
            {/* Decorative background shape */}
            <div className="absolute -bottom-10 -right-10 w-full h-full border-2 border-gray-100 rounded-[60px] z-0" />
          </div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-gray-300"
        >
          <span className="text-[10px] font-black uppercase tracking-widest rotate-90">Scroll</span>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </section>

      {/* Expertise Section */}
      <section className="py-40 bg-white border-y">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
            <Reveal>
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-10">Expertise.</h2>
              <p className="text-gray-400 italic leading-relaxed text-lg">
                {c?.aboutText}
              </p>
            </Reveal>
            <div className="lg:col-span-2">
              <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {c?.services.map((s, i) => (
                  <StaggerItem key={i}>
                    <div className="group pb-10 border-b hover:border-black transition-colors duration-500">
                      <div className="text-xs font-black text-gray-300 mb-6 uppercase tracking-widest">0{i+1} / Service</div>
                      <h3 className="text-2xl font-bold mb-4 flex justify-between items-center group-hover:italic transition-all">
                        {s.title} <ArrowDown className="w-6 h-6 -rotate-45 opacity-0 group-hover:opacity-100 transition-all" />
                      </h3>
                      <p className="text-gray-500 leading-relaxed">{s.description}</p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </div>
      </section>

      {/* Selected Works */}
      <section className="py-40 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="mb-24">
            <h2 className="text-5xl font-black uppercase tracking-tighter mb-8 text-center">Selected Works.</h2>
            <div className="w-20 h-1 bg-black mx-auto" />
          </Reveal>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-20">
            {[
              { title: "Project Alpha", cat: "Branding", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80" },
              { title: "Digital Odyssey", cat: "Web Design", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80" },
            ].map((p, i) => (
              <StaggerItem key={i}>
                <div className="group cursor-pointer">
                  <div className="aspect-[16/10] overflow-hidden rounded-3xl mb-8 shadow-lg">
                    <img src={p.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-300 mb-2 block">{p.cat}</span>
                      <h3 className="text-3xl font-bold italic">{p.title}</h3>
                    </div>
                    <div className="w-12 h-12 rounded-full border flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ═══ SECTION 5: PERSONAL STATS ═══ */}
      <section className="py-24 bg-white border-y">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
           {[
             { val: "8yr+", label: "EXPERIENCE" },
             { val: "120+", label: "PROJECTS" },
             { val: "15", label: "AWARDS" },
             { val: "∞", label: "CURIOSITY" },
           ].map((s, i) => (
             <Reveal key={i} delay={i * 0.1}>
                <div className="text-5xl font-black text-black mb-2 tracking-tighter italic">{s.val}</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-gray-300">{s.label}</div>
             </Reveal>
           ))}
        </div>
      </section>

      {/* ═══ SECTION 6: TOOLBOX MARQUEE ═══ */}
      <section className="py-20 bg-[#fafafa] overflow-hidden border-b">
        <div className="flex whitespace-nowrap">
           <motion.div 
             animate={{ x: ["0%", "-50%"] }}
             transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
             className="flex gap-20 text-4xl md:text-6xl font-black uppercase tracking-tighter italic text-gray-100"
           >
              <span>Product Design // Brand Identity // Motion Direction // Creative Strategy // Art Direction // Front-end //</span>
              <span>Product Design // Brand Identity // Motion Direction // Creative Strategy // Art Direction // Front-end //</span>
           </motion.div>
        </div>
      </section>

      {/* ═══ SECTION 7: WORKFLOW ═══ */}
      <section className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
           <Reveal>
              <h2 className="text-5xl font-black uppercase tracking-tighter mb-12 leading-[0.85] italic">The Workflow <br/>Of Intent.</h2>
              <div className="space-y-12">
                 {[
                   { step: "01", title: "Discovery", desc: "Diving deep into the core problem to uncover hidden truths." },
                   { step: "02", title: "Refinement", desc: "Iterating with precision until only the essential remains." },
                   { step: "03", title: "Execution", desc: "Bringing the vision to life with high-performance craft." },
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
           <Reveal delay={0.2} className="relative aspect-square border border-gray-100 p-4 bg-[#fafafa] rounded-[40px] overflow-hidden">
              <img src="https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80" className="w-full h-full object-cover grayscale opacity-20" />
              <div className="absolute inset-0 flex items-center justify-center">
                 <Activity className="w-16 h-16 text-black/5 animate-pulse" />
              </div>
           </Reveal>
        </div>
      </section>

      {/* ═══ SECTION 8: TESTIMONIALS ═══ */}
      <section className="py-40 bg-[#fafafa] border-y">
        <div className="max-w-4xl mx-auto px-6 text-center">
           <Reveal>
              <Quote className="w-16 h-16 mx-auto mb-16 text-gray-200" />
              <p className="text-3xl md:text-5xl font-black italic text-black leading-tight mb-20 uppercase tracking-tighter">
                 &quot;Working with {formData.businessName.split(' ')[0]} was a turning point for our brand. A rare blend of strategic thinking and visual brilliance.&quot;
              </p>
              <div className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-300 italic">— Marcus Vane // Head of Creative</div>
           </Reveal>
        </div>
      </section>

      {/* ═══ SECTION 9: RECOGNITION ═══ */}
      <section className="py-24 bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 text-center">
           <div className="flex flex-wrap justify-center gap-16 md:gap-32 opacity-10 grayscale hover:grayscale-0 transition-all duration-700">
              <div className="text-2xl font-black italic tracking-tighter text-black uppercase">AD_WEEK</div>
              <div className="text-2xl font-black italic tracking-tighter text-black uppercase">BEHANCE_ELITE</div>
              <div className="text-2xl font-black italic tracking-tighter text-black uppercase">DRIBBBLE_PRO</div>
              <div className="text-2xl font-black italic tracking-tighter text-black uppercase">SITE_INSPIRE</div>
           </div>
        </div>
      </section>

      {/* ═══ SECTION 10: JOURNAL SIGNUP ═══ */}
      <section className="py-40 bg-white border-b text-center">
        <div className="max-w-3xl mx-auto px-6">
           <Reveal>
              <div className="w-20 h-20 rounded-full border border-gray-100 flex items-center justify-center mx-auto mb-12">
                 <Mail className="w-8 h-8 text-black" />
              </div>
              <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-12 italic">The Journal.</h2>
              <p className="text-xl text-gray-400 mb-16 max-w-xl mx-auto italic font-medium">Occasional thoughts on design, tech, and the creative process. No spam, just substance.</p>
              <div className="flex border-b-4 border-black pb-4 max-w-md mx-auto group">
                 <input type="email" placeholder="Email Address" className="bg-transparent font-black uppercase tracking-widest text-sm outline-none flex-1 text-black placeholder:text-gray-200" />
                 <button className="font-black uppercase tracking-widest text-xs hover:opacity-50 transition-opacity">Subscribe</button>
              </div>
           </Reveal>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-60 bg-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <h2 className="text-7xl md:text-[8vw] font-black uppercase tracking-tighter mb-12 leading-none italic">Let&apos;s Create Something Together.</h2>
            <div className="flex flex-col items-center gap-12">
              <a 
                href={`mailto:${formData.email}`} 
                className="text-3xl md:text-5xl font-black border-b-4 border-black pb-4 hover:opacity-40 transition-opacity"
              >
                {formData.email}
              </a>
              <div className="flex gap-12 font-bold text-xs uppercase tracking-widest text-gray-400">
                <span className="cursor-pointer hover:text-black transition-colors">Globe</span>
                <span className="cursor-pointer hover:text-black transition-colors">LinkedIn</span>
                <span className="cursor-pointer hover:text-black transition-colors">Globe</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </ThemeWrapper>
  );
}
