"use client";

import { motion } from "framer-motion";
import type { SessionData } from "@/lib/sessions";
import { ThemeWrapper } from "./ThemeWrapper";
import { Reveal, Stagger, StaggerItem, MagneticButton } from "./AnimationHelpers";
import { MapPin, Home, Maximize2, BedDouble, Bath, ArrowUpRight, Search, Building, Star, Award, ShieldCheck, Quote, Globe, Phone, Mail } from "lucide-react";

const PROPERTIES = [
  { name: "The Skyline Penthouse", price: "$4,500,000", beds: 4, baths: 5, sqft: 4200, img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80" },
  { name: "Modernist Villa", price: "$2,850,000", beds: 3, baths: 3, sqft: 3100, img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80" },
  { name: "Coastal Retreat", price: "$1,950,000", beds: 3, baths: 2, sqft: 2400, img: "https://images.unsplash.com/photo-1600607687940-477a284e68c5?w=1200&q=80" },
];

export function RealEstateTheme({ session }: { session: SessionData }) {
  const { formData, generatedContent: c } = session;
  const brand = formData.brandColor || "#1e293b";

  return (
    <ThemeWrapper session={session} dark={false}>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 15 }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={formData.heroImageUrl || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80"} 
            className="w-full h-full object-cover brightness-75" 
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="relative z-10 max-w-5xl px-6 text-center text-white">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-1 border border-white/30 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-12 backdrop-blur-md">
              Exclusive Listings // 2026
            </div>
            <h1 className="text-6xl md:text-[8vw] font-black uppercase tracking-tighter leading-[0.85] mb-12 italic">
              {c?.heroHeadline}
            </h1>
            <p className="text-xl md:text-2xl font-light italic text-white/70 max-w-2xl mx-auto mb-16">
              {c?.heroSubline}
            </p>
            
            {/* Search Bar */}
            <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-2xl border border-white/20 p-2 rounded-2xl flex flex-col md:flex-row gap-2">
              <div className="flex-1 flex items-center gap-4 px-6 py-4">
                <Search className="w-5 h-5 text-white/50" />
                <input type="text" placeholder="Location, ZIP, Neighborhood..." className="bg-transparent text-white placeholder:text-white/30 outline-none w-full font-medium" />
              </div>
              <div className="flex-1 flex items-center gap-4 px-6 py-4 border-l border-white/10 hidden md:flex">
                <Home className="w-5 h-5 text-white/50" />
                <select className="bg-transparent text-white outline-none w-full font-medium appearance-none">
                  <option className="bg-slate-900">Residential</option>
                  <option className="bg-slate-900">Commercial</option>
                </select>
              </div>
              <button 
                style={{ background: brand }}
                className="px-10 py-4 text-white font-black uppercase tracking-widest text-xs hover:brightness-110 transition-all rounded-xl"
              >
                Search
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b pb-12">
            <Reveal>
              <h2 className="text-5xl font-black uppercase tracking-tighter text-slate-900">Featured Homes</h2>
            </Reveal>
            <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest hidden md:block">
              Curated for Excellence
            </div>
          </div>

          <div className="space-y-40">
            {PROPERTIES.map((p, i) => (
              <Reveal key={i} y={100}>
                <div className={`flex flex-col lg:flex-row gap-20 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className="flex-1 relative aspect-[16/10] overflow-hidden rounded-[40px] shadow-2xl group cursor-pointer">
                    <img src={p.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute top-8 right-8 px-6 py-2 bg-white/90 backdrop-blur-md rounded-full font-black text-slate-900">
                      {p.price}
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-10">
                    <div>
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 mb-6">
                        <MapPin className="w-4 h-4" /> {formData.city} // Luxury
                      </div>
                      <h3 className="text-5xl font-black uppercase tracking-tighter text-slate-900 leading-none mb-8 italic">{p.name}</h3>
                      <p className="text-xl text-slate-500 leading-relaxed italic">
                        An architectural masterpiece blending modern design with timeless elegance.
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-8 py-10 border-y border-slate-100">
                      <div className="flex flex-col gap-2">
                        <BedDouble className="w-6 h-6 text-slate-300" />
                        <div className="text-lg font-black">{p.beds} Beds</div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Bath className="w-6 h-6 text-slate-300" />
                        <div className="text-lg font-black">{p.baths} Baths</div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Maximize2 className="w-6 h-6 text-slate-300" />
                        <div className="text-lg font-black">{p.sqft} SQFT</div>
                      </div>
                    </div>

                    <MagneticButton
                      style={{ background: brand, color: "#fff" }}
                      className="px-10 py-5 rounded-full font-black uppercase tracking-widest text-xs flex items-center gap-4 group"
                    >
                      View Property <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </MagneticButton>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-40 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <Reveal>
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 block mb-6 font-mono">Our Vision // Impact</span>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-10 leading-[0.9] italic text-white">Elevating the <br/>Way You Live.</h2>
            <p className="text-xl text-slate-400 leading-relaxed italic mb-16">
              {c?.aboutText}
            </p>
            <div className="grid grid-cols-2 gap-10">
              {formData.benefits.map((b, i) => (
                <div key={i} className="flex flex-col gap-4">
                  <div className="text-5xl font-black text-white/5 italic">0{i+1}</div>
                  <div className="text-xs font-black uppercase tracking-widest text-slate-500">{b}</div>
                </div>
              ))}
            </div>
          </Reveal>
          
          <Reveal delay={0.2} className="relative">
            <div className="aspect-[4/5] rounded-[60px] overflow-hidden rotate-2 border-8 border-white/5">
              <img src="https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?w=800&q=80" className="w-full h-full object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ SECTION 7: STATS COUNTER ═══ */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
           {[
             { val: "$2.4B+", label: "Total Sales" },
             { val: "1500+", label: "Properties Sold" },
             { val: "12yr", label: "Market Experience" },
             { val: "100%", label: "Privacy Guaranteed" },
           ].map((s, i) => (
             <Reveal key={i} delay={i * 0.1}>
                <div className="text-4xl md:text-5xl font-black text-slate-900 mb-2 italic tracking-tighter">{s.val}</div>
                <div className="text-[10px] uppercase font-black tracking-widest text-slate-300">{s.label}</div>
             </Reveal>
           ))}
        </div>
      </section>

      {/* ═══ SECTION 8: NEIGHBORHOODS ═══ */}
      <section className="py-32 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-20 flex justify-between items-end">
           <Reveal>
              <h2 className="text-4xl font-black uppercase tracking-tighter text-slate-900">Elite Locations</h2>
              <p className="text-slate-400 mt-4 uppercase text-[10px] font-bold tracking-widest italic">Where lifestyle meets legacy</p>
           </Reveal>
        </div>
        <div className="flex gap-8 px-6 overflow-x-auto no-scrollbar pb-10">
           {[
             { name: "Downtown Core", img: "https://images.unsplash.com/photo-1449156001533-cb39c7314260?w=600&q=80" },
             { name: "Emerald Hills", img: "https://images.unsplash.com/photo-1500382017468-9049fee74a62?w=600&q=80" },
             { name: "Harbor View", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80" },
             { name: "West Side", img: "https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=600&q=80" },
           ].map((n, i) => (
             <div key={i} className="min-w-[300px] h-[400px] rounded-[32px] overflow-hidden relative group cursor-pointer shadow-xl">
                <img src={n.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-8 left-8">
                   <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">{n.name}</h3>
                   <div className="text-[10px] text-white/50 font-black uppercase tracking-widest mt-2">Explore Listings</div>
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* ═══ SECTION 9: TESTIMONIALS ═══ */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <Reveal>
             <div className="w-20 h-20 rounded-full bg-slate-900 flex items-center justify-center text-white mb-12 shadow-2xl">
                <Quote className="w-8 h-8" />
             </div>
             <p className="text-3xl md:text-5xl font-light italic text-slate-900 leading-tight mb-12 uppercase tracking-tighter">
                &quot;The most seamless real estate experience we&apos;ve ever had. Their market insight is unparalleled.&quot;
             </p>
             <div className="flex flex-col">
                <div className="font-black uppercase tracking-widest text-slate-900">Julianna & Victor Thorne</div>
                <div className="text-[10px] uppercase font-bold text-slate-400 mt-2">Sellers // Skyline Penthouse</div>
             </div>
          </Reveal>
          <Reveal delay={0.2} className="relative aspect-square">
             <div className="absolute inset-0 bg-slate-900 rounded-[80px] rotate-3" />
             <div className="absolute inset-0 bg-white border border-slate-100 rounded-[80px] -rotate-3 p-16 flex flex-col justify-center">
                <div className="flex gap-2 mb-8">
                   {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 fill-slate-900 text-slate-900" />)}
                </div>
                <h4 className="text-2xl font-black uppercase italic mb-6">Concierge Excellence</h4>
                <p className="text-slate-500 leading-relaxed italic">Our dedicated concierge team handles every detail, from professional staging to international marketing, ensuring your property gets the attention it deserves.</p>
             </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ SECTION 10: PARTNER LOGOS ═══ */}
      <section className="py-24 bg-slate-50 border-y border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-16 md:gap-32 opacity-20 grayscale hover:grayscale-0 transition-all duration-700">
             <div className="text-2xl font-black italic tracking-tighter text-slate-900 uppercase">CHRISTIES</div>
             <div className="text-2xl font-black italic tracking-tighter text-slate-900 uppercase">SOTHEBYS</div>
             <div className="text-2xl font-black italic tracking-tighter text-slate-900 uppercase">SAVILLS</div>
             <div className="text-2xl font-black italic tracking-tighter text-slate-900 uppercase">KNIGHT_FRANK</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-60 bg-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <h2 className="text-7xl md:text-[10vw] font-black uppercase tracking-tighter text-slate-900 leading-none mb-16 italic">Find Your Sanctuary<span style={{ color: brand }}>.</span></h2>
            <div className="flex flex-col items-center gap-12 mt-20">
              <div className="flex gap-8">
                <a href={`mailto:${formData.email}`} className="text-3xl md:text-5xl font-black border-b-4 border-slate-900 pb-4 hover:opacity-40 transition-opacity uppercase tracking-tighter">
                  {formData.email}
                </a>
              </div>
              <MagneticButton
                style={{ background: brand, color: "#fff" }}
                className="px-12 py-6 rounded-full font-black uppercase tracking-[0.2em] text-sm shadow-2xl"
              >
                Schedule A Private Showing
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </ThemeWrapper>
  );
}
