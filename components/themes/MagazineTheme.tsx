"use client";

import { motion } from "framer-motion";
import type { SessionData } from "@/lib/sessions";
import { ThemeWrapper } from "./ThemeWrapper";
import { Reveal, Stagger, StaggerItem } from "./AnimationHelpers";
import { ArrowRight, BookOpen, Clock, Tag, TrendingUp, PlayCircle, Search, Mic, Star, Award, HelpCircle, Quote, Globe, Phone, Mail, Calendar } from "lucide-react";

const ARTICLES = [
  { title: "The Future of Digital Ecosystems", cat: "Technology", date: "May 24, 2026", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80" },
  { title: "Redefining Minimalist Architecture", cat: "Design", date: "May 22, 2026", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80" },
  { title: "Global Market Shifts in 2026", cat: "Business", date: "May 20, 2026", img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80" },
  { title: "Sustainable Urban Living", cat: "Environment", date: "May 18, 2026", img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80" },
];

export function MagazineTheme({ session }: { session: SessionData }) {
  const { formData, generatedContent: c } = session;
  const brand = formData.brandColor || "#111";

  return (
    <ThemeWrapper session={session} dark={false}>
      {/* Editorial Hero */}
      <section className="pt-32 pb-20 border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="flex justify-between items-center mb-12 border-b pb-6">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 italic">Volume 01 // Issue 04</span>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
            </div>
            <h1 className="text-7xl md:text-[10vw] font-black uppercase tracking-tighter leading-[0.8] mb-12 text-black text-center">
              {formData.businessName}.
            </h1>
          </Reveal>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-20">
            <Reveal className="lg:col-span-2">
              <div className="group cursor-pointer">
                <div className="aspect-[16/9] overflow-hidden mb-10 bg-gray-100">
                  <img src={formData.heroImageUrl || ARTICLES[0].img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
                </div>
                <div className="flex gap-4 items-center mb-6">
                  <span className="px-3 py-1 bg-black text-white text-[8px] font-black uppercase tracking-widest">Featured</span>
                  <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">By Aevia Editor // 5 Min Read</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-8 group-hover:italic transition-all">
                  {c?.heroHeadline}
                </h2>
                <p className="text-xl text-gray-500 leading-relaxed italic max-w-2xl mb-10">
                  {c?.heroSubline}
                </p>
                <button className="flex items-center gap-2 font-black uppercase text-xs tracking-[0.2em] border-b-2 border-black pb-2">
                  Read Full Article <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </Reveal>
            
            <div className="space-y-12 border-l lg:pl-12">
              <div className="text-xs font-black uppercase tracking-widest border-b pb-4 mb-8 flex items-center gap-3">
                <TrendingUp className="w-4 h-4" /> Trending Now
              </div>
              {ARTICLES.slice(1).map((a, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="group cursor-pointer">
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-4 block">{a.cat} // {a.date}</span>
                    <h3 className="text-2xl font-bold uppercase tracking-tight mb-4 group-hover:text-gray-400 transition-colors leading-tight">{a.title}</h3>
                    <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                      Read More <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-1 border-gray-200">
          {["Culture", "Design", "Tech", "Future"].map((cat, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="bg-white p-10 border hover:bg-black hover:text-white transition-all cursor-pointer text-center group">
                <div className="text-[10px] font-black uppercase tracking-[0.5em] mb-4 opacity-30 group-hover:opacity-100 transition-opacity">Discover</div>
                <div className="text-xl font-black uppercase tracking-widest italic">{cat}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Magazine Content Grid */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
            {ARTICLES.map((a, i) => (
              <StaggerItem key={i}>
                <div className="group cursor-pointer">
                  <div className="aspect-square overflow-hidden mb-8 bg-gray-100 border">
                    <img src={a.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  </div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">{a.cat}</span>
                    <div className="flex items-center gap-2 text-[10px] text-gray-300"><Clock className="w-3 h-3" /> 4 Min</div>
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tight mb-6 leading-tight group-hover:italic transition-all">{a.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">
                    Exploring the deep intersections between modern structural design and the future of human interaction.
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ═══ SECTION 5: MULTIMEDIA FEATURE ═══ */}
      <section className="py-40 bg-white border-y-4 border-black overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
           <Reveal className="relative group cursor-pointer">
              <div className="aspect-video bg-gray-100 overflow-hidden relative border border-black/10">
                 <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80" className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-black text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                       <PlayCircle className="w-10 h-10" />
                    </div>
                 </div>
              </div>
           </Reveal>
           <Reveal delay={0.2}>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-400 mb-8 block">Cinematic // Issue 04</span>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-12 italic">The Visual <br/>Manifesto.</h2>
              <p className="text-xl text-gray-500 leading-relaxed italic mb-16">A deep dive into the aesthetic revolution of the mid-2020s. From neon-brutalism to organic minimalism, we explore the visions shaping our world.</p>
              <button className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-black group">
                 Watch The Documentary <ArrowRight className="w-4 h-4 group-hover:translate-x-4 transition-transform" />
              </button>
           </Reveal>
        </div>
      </section>

      {/* ═══ SECTION 6: EDITORS' PICKS ═══ */}
      <section className="py-40 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
           <Reveal className="mb-24 flex justify-between items-end border-b border-black pb-8">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic">Editors' Picks</h2>
              <div className="text-[10px] font-black uppercase tracking-widest text-gray-300">Staff Selection // May 2026</div>
           </Reveal>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
              {[
                { title: "The New Vanguard: 10 Designers to Watch", cat: "Culture", img: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=800&q=80" },
                { title: "Silicon vs Carbon: The Future of Neural Nets", cat: "Tech", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80" },
              ].map((p, i) => (
                <Reveal key={i} delay={i * 0.1}>
                   <div className="group cursor-pointer">
                      <div className="aspect-[16/10] overflow-hidden mb-10 bg-gray-200">
                         <img src={p.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-300 mb-4 block">{p.cat}</span>
                      <h3 className="text-3xl font-black uppercase leading-tight group-hover:italic transition-all">{p.title}</h3>
                   </div>
                </Reveal>
              ))}
           </div>
        </div>
      </section>

      {/* ═══ SECTION 7: COMMUNITY ═══ */}
      <section className="py-40 bg-white border-b-4 border-black">
        <div className="max-w-4xl mx-auto px-6 text-center">
           <Reveal>
              <Quote className="w-16 h-16 mx-auto mb-16 text-gray-100" />
              <p className="text-3xl md:text-5xl font-black italic text-black leading-tight mb-20 uppercase tracking-tighter">
                 &quot;{formData.businessName} has become the definitive source for those who reject the status quo and seek true intellectual depth.&quot;
              </p>
              <div className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-300 italic">— Readers Union // New York Chapter</div>
           </Reveal>
        </div>
      </section>

      {/* ═══ SECTION 8: BRAND PARTNERS ═══ */}
      <section className="py-24 bg-gray-50 border-b border-black/10">
        <div className="max-w-7xl mx-auto px-6">
           <div className="flex flex-wrap justify-center gap-16 md:gap-32 opacity-20 grayscale hover:grayscale-0 transition-all duration-700">
              <div className="text-2xl font-black italic tracking-tighter text-black uppercase">LEXUS_GLOBAL</div>
              <div className="text-2xl font-black italic tracking-tighter text-black uppercase">ROLEX_ARCHIVE</div>
              <div className="text-2xl font-black italic tracking-tighter text-black uppercase">APPLE_DESIGN</div>
              <div className="text-2xl font-black italic tracking-tighter text-black uppercase">PRADA_MODE</div>
           </div>
        </div>
      </section>

      {/* ═══ SECTION 9: ARCHIVE SEARCH ═══ */}
      <section className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
           <Reveal>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-12 italic">The Archive.</h2>
              <p className="text-xl text-gray-500 leading-relaxed italic mb-16">Access over a decade of editorial excellence. Every issue, every interview, every manifesto ever published.</p>
              <div className="flex border-b-4 border-black pb-4">
                 <input type="text" placeholder="Search The Archive..." className="bg-transparent font-black uppercase tracking-widest text-sm outline-none flex-1 text-black placeholder:text-gray-300" />
                 <Search className="w-6 h-6 text-black" />
              </div>
           </Reveal>
           <Reveal delay={0.2} className="relative aspect-square border-4 border-black p-4">
              <div className="grid grid-cols-3 gap-4 h-full">
                 {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
                   <div key={i} className="bg-gray-100 border border-black/5 flex items-center justify-center grayscale hover:grayscale-0 transition-all">
                      <Calendar className="w-4 h-4 text-gray-300" />
                   </div>
                 ))}
              </div>
           </Reveal>
        </div>
      </section>

      {/* ═══ SECTION 10: PODCAST ═══ */}
      <section className="py-40 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-20">
           <Reveal className="max-w-xl">
              <div className="flex items-center gap-4 mb-10">
                 <Mic className="w-8 h-8 text-rose-500" />
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">The Weekly frequency</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-12 italic">On Air // <br/>The Frequency.</h2>
              <p className="text-xl text-white/30 leading-relaxed italic mb-16">Conversations with the most disruptive minds in our network. New episodes every Tuesday morning.</p>
              <button className="px-12 py-5 border border-white text-white font-black uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all">Listen On Spotify</button>
           </Reveal>
           <Reveal delay={0.2} className="relative w-80 h-80 border-4 border-white flex flex-col items-center justify-center">
              <div className="text-8xl font-black italic text-white/10">MIC</div>
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-20 h-[2px] bg-rose-500 animate-pulse" />
              </div>
           </Reveal>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-40 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center mx-auto mb-12">
              <BookOpen className="w-8 h-8" />
            </div>
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-8 italic leading-none">Join The Inner Circle.</h2>
            <p className="text-xl text-white/40 mb-16 italic font-light">
              Receive our weekly digest of the most impactful stories in culture, design, and technology.
            </p>
            <div className="max-w-md mx-auto flex flex-col md:flex-row gap-4">
              <input type="email" placeholder="Email Address" className="flex-1 bg-white/5 border border-white/10 px-8 py-5 text-white outline-none focus:border-white transition-all italic font-light" />
              <button 
                style={{ background: brand }}
                className="px-10 py-5 text-black font-black uppercase tracking-widest text-xs shadow-2xl"
              >
                Subscribe
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </ThemeWrapper>
  );
}
