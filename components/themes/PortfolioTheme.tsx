"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { SessionData } from "@/lib/sessions";
import { ThemeWrapper } from "./ThemeWrapper";
import { Reveal, Stagger, StaggerItem, MagneticButton } from "./AnimationHelpers";
import { ArrowUpRight, ArrowDown, ExternalLink, Award, HelpCircle, Activity, Star, Quote, Globe, Phone, Mail, ArrowRight, X, Layout, Layers, Terminal } from "lucide-react";

const PROJECTS = [
  { title: "Metamorphosis", cat: "Art Direction", year: "2026", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80" },
  { title: "Kinetic Soul", cat: "Interactive Design", year: "2025", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80" },
  { title: "Brutalist Future", cat: "Web Design", year: "2026", img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&q=80" },
];

export function PortfolioTheme({ session }: { session: SessionData }) {
  const { formData, generatedContent: c } = session;
  const brand = formData.brandColor || "#111";
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const bannerX = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <ThemeWrapper session={session} dark={false}>
      {/* Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[200] opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center overflow-hidden bg-white">
        <div className="relative z-10 max-w-5xl px-6">
          <Reveal>
            <div className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-300 mb-12">Multidisciplinary Creator // Portfolio</div>
            <h1 className="text-7xl md:text-[12vw] font-black leading-[0.8] tracking-tighter uppercase mb-16 text-black italic">
              {formData.businessName}
            </h1>
            <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20">
              <p className="text-2xl text-gray-400 font-light italic max-w-sm leading-tight">
                {c?.heroHeadline}
              </p>
              <div className="h-[1px] w-20 bg-gray-100 hidden md:block" />
              <div className="flex items-center gap-6">
                <MagneticButton
                  href="#work"
                  style={{ background: brand, color: "#fff" }}
                  className="w-40 h-40 rounded-full flex flex-col items-center justify-center gap-2 group transition-all"
                >
                  <ArrowDown className="w-6 h-6 group-hover:translate-y-2 transition-transform" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Scroll Down</span>
                </MagneticButton>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Floating background text */}
        <motion.div 
          style={{ x: bannerX }}
          className="absolute bottom-20 left-0 whitespace-nowrap text-[20vw] font-black uppercase opacity-[0.02] pointer-events-none tracking-tighter italic"
        >
          Creative Portfolio Creative Portfolio Creative Portfolio
        </motion.div>
      </section>

      {/* Philosophy Section */}
      <section className="py-40 bg-[#fafafa] border-y">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-end">
            <Reveal>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-12 leading-none italic">Think. <br/>Create. <br/>Refine.</h2>
              <p className="text-xl text-gray-500 leading-relaxed italic max-w-md">
                {c?.aboutText}
              </p>
            </Reveal>
            <div className="space-y-12">
              {formData.benefits.map((b, i) => (
                <div key={i} className="flex gap-10 items-center group cursor-pointer">
                  <div className="text-4xl font-black text-gray-200 italic group-hover:text-black transition-colors">0{i+1}</div>
                  <div className="h-[1px] flex-1 bg-gray-200 group-hover:bg-black transition-all" />
                  <div className="text-xl font-bold uppercase group-hover:italic transition-all">{b}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Selected Works */}
      <section id="work" className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="mb-32">
            <h2 className="text-5xl md:text-[8vw] font-black uppercase tracking-tighter leading-none italic">Selected <br/>Works.</h2>
          </Reveal>

          <div className="space-y-60">
            {PROJECTS.map((p, i) => (
              <Reveal key={i} y={100}>
                <div className="group relative">
                  <div className="aspect-[16/9] overflow-hidden rounded-[60px] shadow-2xl mb-12">
                    <motion.img 
                      whileHover={{ scale: 1.05 }}
                      src={p.img} 
                      className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" 
                    />
                  </div>
                  <div className="flex flex-col md:flex-row justify-between items-end gap-10">
                    <div>
                      <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-gray-300 mb-6">
                        {p.cat} // {p.year}
                      </div>
                      <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic">{p.title}</h3>
                    </div>
                    <MagneticButton
                      className="w-32 h-32 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all"
                    >
                      <ExternalLink className="w-6 h-6" />
                    </MagneticButton>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 5: DISCIPLINE ═══ */}
      <section className="py-40 bg-[#fafafa] border-y">
        <div className="max-w-7xl mx-auto px-6">
           <Reveal className="mb-24">
              <h2 className="text-5xl font-black uppercase tracking-tighter italic">Discipline.</h2>
           </Reveal>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { title: "Visual Design", desc: "Crafting digital experiences with a focus on typography and space." },
                { title: "Motion Direction", desc: "Bringing static ideas to life through meaningful animation." },
                { title: "Creative Tech", desc: "Bridging the gap between design and high-performance code." },
              ].map((d, i) => (
                <Reveal key={i} delay={i * 0.1}>
                   <div className="p-12 bg-white border border-gray-100 rounded-[40px] hover:shadow-2xl transition-all group">
                      <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center mb-8 group-hover:bg-black group-hover:text-white transition-all">
                         <Layout className="w-5 h-5" />
                      </div>
                      <h3 className="text-2xl font-black uppercase mb-4 italic tracking-tight">{d.title}</h3>
                      <p className="text-sm text-gray-400 leading-relaxed italic">{d.desc}</p>
                   </div>
                </Reveal>
              ))}
           </div>
        </div>
      </section>

      {/* ═══ SECTION 6: SKILLS MARQUEE ═══ */}
      <section className="py-24 bg-white overflow-hidden border-b">
        <div className="flex whitespace-nowrap">
           <motion.div 
             animate={{ x: ["0%", "-50%"] }}
             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
             className="flex gap-20 text-6xl md:text-8xl font-black uppercase tracking-tighter italic text-gray-100"
           >
              <span>Framer Motion // Next.js // TypeScript // WebGL // GSAP // Globe // Adobe Suite //</span>
              <span>Framer Motion // Next.js // TypeScript // WebGL // GSAP // Globe // Adobe Suite //</span>
           </motion.div>
        </div>
      </section>

      {/* ═══ SECTION 7: EXPERIENCE ═══ */}
      <section className="py-40 bg-[#fafafa] border-b">
        <div className="max-w-7xl mx-auto px-6">
           <Reveal className="mb-24">
              <h2 className="text-5xl font-black uppercase tracking-tighter italic">Experience.</h2>
           </Reveal>
           <div className="space-y-4">
              {[
                { year: "2024-Present", role: "Senior Creative", company: "Aevia Digital", desc: "Leading the design system for next-gen SAAS products." },
                { year: "2021-2023", role: "Motion Designer", company: "Motion_Studio", desc: "Developed interactive campaign assets for global brands." },
                { year: "2018-2020", role: "Junior Designer", company: "Start_Up_Inc", desc: "Focused on mobile-first interfaces and user flow optimization." },
              ].map((exp, i) => (
                <Reveal key={i} delay={i * 0.1}>
                   <div className="p-10 border border-gray-100 hover:bg-white hover:shadow-xl transition-all group flex flex-col md:flex-row justify-between items-start md:items-center gap-12 rounded-[2rem]">
                      <div className="text-xl font-black italic text-gray-300 group-hover:text-black transition-colors">{exp.year}</div>
                      <div className="flex-1">
                         <h3 className="text-2xl font-black uppercase tracking-tight text-black mb-1">{exp.role}</h3>
                         <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">{exp.company}</div>
                      </div>
                      <p className="text-sm text-gray-400 max-w-sm italic leading-tight">{exp.desc}</p>
                   </div>
                </Reveal>
              ))}
           </div>
        </div>
      </section>

      {/* ═══ SECTION 8: TESTIMONIALS ═══ */}
      <section className="py-40 bg-white border-b">
        <div className="max-w-4xl mx-auto px-6 text-center">
           <Reveal>
              <Quote className="w-16 h-16 mx-auto mb-16 text-gray-100" />
              <p className="text-3xl md:text-5xl font-black italic text-black leading-tight mb-20 uppercase tracking-tighter">
                 &quot;An absolute visionary when it comes to the intersection of raw brutalism and modern interactive design.&quot;
              </p>
              <div className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-300 italic">— Julian Vance // Creative Director</div>
           </Reveal>
        </div>
      </section>

      {/* ═══ SECTION 9: AWARDS ═══ */}
      <section className="py-40 bg-[#fafafa] border-b">
        <div className="max-w-7xl mx-auto px-6">
           <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
              {[
                { val: "12", label: "Awwwards SOTD" },
                { val: "05", label: "FWA Wins" },
                { val: "08", label: "CSSDA Awards" },
                { val: "02", label: "Webby Nominees" },
              ].map((a, i) => (
                <Reveal key={i} delay={i * 0.1}>
                   <div className="text-6xl font-black text-black mb-2 italic tracking-tighter">{a.val}</div>
                   <div className="text-[10px] uppercase font-black tracking-widest text-gray-300">{a.label}</div>
                </Reveal>
              ))}
           </div>
        </div>
      </section>

      {/* ═══ SECTION 10: INSTAGRAM FEED ═══ */}
      <section className="py-40 bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 mb-24 flex justify-between items-end">
           <Reveal>
              <h2 className="text-5xl font-black uppercase tracking-tighter italic">Process // Logs.</h2>
           </Reveal>
           <div className="text-[10px] font-black uppercase tracking-widest text-gray-300">@ {formData.businessName.replace(/\s+/g, '_').toLowerCase()}</div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
           {[
             "https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&q=80",
             "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80",
             "https://images.unsplash.com/photo-1512403754473-27835f7b9984?w=400&q=80",
             "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&q=80",
           ].map((img, i) => (
             <Reveal key={i} delay={i * 0.1}>
                <div className="aspect-square bg-gray-100 grayscale hover:grayscale-0 transition-all duration-700 cursor-crosshair group relative overflow-hidden">
                   <img src={img} className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity" />
                </div>
             </Reveal>
           ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-60 bg-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <h2 className="text-7xl md:text-[10vw] font-black uppercase tracking-tighter text-black leading-none mb-16 italic">Let&apos;s Build<br/>The Future.</h2>
            <div className="flex flex-col items-center gap-12 mt-20">
              <a 
                href={`mailto:${formData.email}`} 
                className="text-3xl md:text-5xl font-black border-b-4 border-black pb-4 hover:opacity-40 transition-opacity uppercase tracking-tighter"
              >
                {formData.email}
              </a>
              <div className="flex gap-12 font-bold text-xs uppercase tracking-widest text-gray-400">
                <span className="cursor-pointer hover:text-black transition-colors">Globe</span>
                <span className="cursor-pointer hover:text-black transition-colors">Behance</span>
                <span className="cursor-pointer hover:text-black transition-colors">LinkedIn</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </ThemeWrapper>
  );
}
