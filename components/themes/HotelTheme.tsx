"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { SessionData } from "@/lib/sessions";
import { ThemeWrapper } from "./ThemeWrapper";
import { Reveal, Stagger, StaggerItem, MagneticButton } from "./AnimationHelpers";
import { Calendar, Users, MapPin, X, Star, Wind, Wifi, Coffee, Utensils, Waves, Award, HelpCircle, Quote, Globe, ArrowRight, ShieldCheck } from "lucide-react";

const ROOMS = [
  { name: "Deluxe Ocean Suite", price: 450, img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80" },
  { name: "Garden Terrace Room", price: 320, img: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200&q=80" },
  { name: "Presidential Penthouse", price: 1200, img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80" },
];

export function HotelTheme({ session }: { session: SessionData }) {
  const { formData, generatedContent: c } = session;
  const brand = formData.brandColor || "#94a3b8";
  
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <ThemeWrapper session={session} dark={false}>
      {/* Hero Section with Parallax Background */}
      <section className="relative h-[110vh] overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10 }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={formData.heroImageUrl || "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1600&q=80"} 
            className="w-full h-full object-cover brightness-75" 
          />
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-white" />

        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
          <Reveal>
            <div className="flex gap-1 mb-6">
              {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 text-white fill-current" />)}
            </div>
            <h1 className="text-6xl md:text-[10vw] font-black text-white uppercase tracking-tighter leading-none mb-10 italic">
              {c?.heroHeadline}
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-light italic max-w-2xl mx-auto mb-16">
              {c?.heroSubline}
            </p>
            
            {/* Booking Bar (Interactive) */}
            <div className="w-full max-w-5xl bg-white p-8 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-8 items-center border border-gray-100">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                <div className="text-left">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Check In</label>
                  <div className="flex items-center gap-3 text-lg font-bold"><Calendar className="w-5 h-5 text-gray-300" /> May 20, 2026</div>
                </div>
                <div className="text-left">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Check Out</label>
                  <div className="flex items-center gap-3 text-lg font-bold"><Calendar className="w-5 h-5 text-gray-300" /> May 25, 2026</div>
                </div>
                <div className="text-left">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Guests</label>
                  <div className="flex items-center gap-3 text-lg font-bold"><Users className="w-5 h-5 text-gray-300" /> 2 Adults</div>
                </div>
              </div>
              <button 
                onClick={() => setIsBookingOpen(true)}
                style={{ background: brand }}
                className="w-full md:w-auto px-12 py-5 text-white font-black uppercase tracking-widest text-xs hover:brightness-110 transition-all shadow-xl"
              >
                Check Availability
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <Reveal>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-300 block mb-6">The Sanctuary // Reimagined</span>
              <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-10 leading-none">A Journey Into Elegance.</h2>
              <p className="text-xl text-gray-500 leading-relaxed italic mb-12">
                {c?.aboutText}
              </p>
              <div className="grid grid-cols-2 gap-10">
                {[
                  { icon: <Wind />, label: "Air Purify" },
                  { icon: <Wifi />, label: "High Speed" },
                  { icon: <Coffee />, label: "Breakfast" },
                  { icon: <Utensils />, label: "Catering" },
                ].map((a, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-full border flex items-center justify-center text-gray-300 group-hover:bg-zinc-900 group-hover:text-white transition-all">{a.icon}</div>
                    <span className="text-xs font-bold uppercase tracking-widest">{a.label}</span>
                  </div>
                ))}
              </div>
            </Reveal>
            
            <Reveal delay={0.2} className="relative">
              <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80" className="w-full h-full object-cover" />
              </div>
              <div className="absolute top-10 left-10 p-8 bg-white/40 backdrop-blur-xl rounded-2xl border border-white/20 text-center hidden md:block">
                <div className="text-3xl font-black mb-1">9.8</div>
                <div className="text-[10px] font-black uppercase tracking-widest opacity-60 text-black">Booking Rating</div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Rooms Section */}
      <section className="py-40 bg-zinc-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <Reveal>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">Accommodations</h2>
            </Reveal>
            <div className="text-xs font-black text-gray-300 uppercase tracking-widest hidden md:block">
              Selected Collection // 2026
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {ROOMS.map((r, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="group cursor-pointer">
                  <div className="aspect-[4/5] rounded-3xl overflow-hidden mb-8 shadow-lg relative">
                    <img src={r.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                      <button className="px-8 py-3 bg-white text-black font-black uppercase text-[10px] tracking-widest">Book This Room</button>
                    </div>
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter mb-2 group-hover:italic transition-all">{r.name}</h3>
                  <div className="text-lg font-bold text-gray-400">From ${r.price} / Night</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 6: GASTRONOMY ═══ */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
           <Reveal className="order-2 lg:order-1">
              <div className="aspect-square bg-zinc-100 rounded-[60px] overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1550966841-3ee4ad004051?w=800&q=80" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              </div>
           </Reveal>
           <Reveal delay={0.2} className="order-1 lg:order-2">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-10 leading-none italic">Culinary <br/>Artistry.</h2>
              <p className="text-xl text-gray-500 leading-relaxed italic mb-12">Experience a symphony of flavors curated by our Michelin-starred chefs, using only the finest seasonal ingredients sourced from local artisans.</p>
              <button className="px-10 py-4 border border-zinc-200 font-black uppercase text-[10px] tracking-widest hover:bg-zinc-900 hover:text-white transition-all">Explore Our Menu</button>
           </Reveal>
        </div>
      </section>

      {/* ═══ SECTION 7: WELLNESS & SPA ═══ */}
      <section className="py-32 bg-zinc-50 border-y">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
           <Reveal>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-10 leading-none italic">Eternal <br/>Serenity.</h2>
              <p className="text-xl text-gray-500 leading-relaxed italic mb-12">Retreat to our sanctuary of peace. Our holistic treatments and thermal baths are designed to restore balance to your mind, body, and spirit.</p>
              <div className="flex gap-12">
                 <div>
                    <div className="text-2xl font-black mb-1">12</div>
                    <div className="text-[10px] uppercase font-bold text-gray-400">Treatment Rooms</div>
                 </div>
                 <div>
                    <div className="text-2xl font-black mb-1">24/7</div>
                    <div className="text-[10px] uppercase font-bold text-gray-400">Fitness Access</div>
                 </div>
              </div>
           </Reveal>
           <Reveal delay={0.2} className="relative aspect-video lg:aspect-square bg-zinc-200 rounded-[60px] overflow-hidden">
              <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecee?w=800&q=80" className="w-full h-full object-cover opacity-80 grayscale" />
              <div className="absolute inset-0 flex items-center justify-center">
                 <Waves className="w-20 h-20 text-white/50 animate-pulse" />
              </div>
           </Reveal>
        </div>
      </section>

      {/* ═══ SECTION 8: GUEST REVIEWS ═══ */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
           <Reveal className="mb-24">
              <h2 className="text-4xl font-black uppercase tracking-tighter">Guest Stories</h2>
           </Reveal>
           <div className="flex gap-8 overflow-x-auto no-scrollbar pb-10">
              {[
                { name: "Sophia L.", text: "An absolute gem. The level of service and attention to detail is unmatched.", rating: 5 },
                { name: "James K.", text: "The views from the penthouse are breathtaking. A truly transformative stay.", rating: 5 },
                { name: "Elena R.", text: "Flawless gastronomy and the spa is out of this world. Will be returning.", rating: 5 },
              ].map((rev, i) => (
                <div key={i} className="min-w-[400px] p-12 bg-zinc-50 rounded-[40px] text-left border border-zinc-100">
                   <div className="flex gap-1 mb-8">
                      {Array.from({ length: rev.rating }).map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                   </div>
                   <p className="text-xl font-light italic leading-relaxed mb-10 text-gray-600">&quot;{rev.text}&quot;</p>
                   <div className="font-black uppercase tracking-widest text-xs text-black">— {rev.name}</div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* ═══ SECTION 9: FAQ ═══ */}
      <section className="py-32 bg-zinc-950 text-white">
        <div className="max-w-4xl mx-auto px-6">
           <Reveal className="text-center mb-24">
              <h2 className="text-4xl font-black uppercase tracking-tighter italic">Essential Information</h2>
           </Reveal>
           <div className="space-y-4">
              {[
                { q: "What are the check-in and check-out times?", a: "Standard check-in is at 3:00 PM and check-out is at 11:00 AM. Early check-in or late check-out can be requested subject to availability." },
                { q: "Is airport transportation available?", a: "Yes, we offer private chauffeur services for airport transfers. Please contact our concierge at least 24 hours in advance to arrange." },
                { q: "Do you allow pets at the property?", a: "We are a pet-friendly property in specific room categories. A one-time cleaning fee of $75 applies per stay." },
              ].map((f, i) => (
                <Reveal key={i} delay={i * 0.1}>
                   <div className="p-10 border border-white/5 hover:bg-white/5 transition-all group cursor-pointer rounded-[2rem]">
                      <div className="flex justify-between items-center mb-6">
                         <span className="text-sm font-black uppercase tracking-widest">{f.q}</span>
                         <HelpCircle className="w-5 h-5 text-zinc-600 group-hover:text-white transition-colors" />
                      </div>
                      <p className="text-sm text-zinc-500 leading-relaxed italic group-hover:text-zinc-300 transition-colors">{f.a}</p>
                   </div>
                </Reveal>
              ))}
           </div>
        </div>
      </section>

      {/* ═══ SECTION 10: PARTNER LOGOS ═══ */}
      <section className="py-24 bg-white border-b overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
           <Reveal className="mb-16">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-300">Curated Associations</span>
           </Reveal>
           <div className="flex flex-wrap justify-center gap-16 md:gap-32 opacity-20 grayscale hover:grayscale-0 transition-all duration-700">
              <div className="text-2xl font-black italic tracking-tighter text-black uppercase">LE_MATHIS</div>
              <div className="text-2xl font-black italic tracking-tighter text-black uppercase">HERMES_SPA</div>
              <div className="text-2xl font-black italic tracking-tighter text-black uppercase">ROLEX_LTD</div>
              <div className="text-2xl font-black italic tracking-tighter text-black uppercase">MICHELIN_2026</div>
           </div>
        </div>
      </section>

      {/* Booking Modal */}
      <AnimatePresence>
        {isBookingOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBookingOpen(false)}
              className="fixed inset-0 bg-black/80 z-[2000] backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl bg-white z-[2001] rounded-3xl overflow-hidden shadow-2xl p-12"
            >
              <div className="flex justify-between items-center mb-12">
                <div className="text-2xl font-black uppercase tracking-widest italic">Reserve Your Stay</div>
                <button onClick={() => setIsBookingOpen(false)}><X className="w-6 h-6" /></button>
              </div>
              <div className="text-center py-12">
                <div className="text-emerald-500 text-5xl font-black mb-6 italic">Rooms Available</div>
                <p className="text-gray-400 mb-12 leading-relaxed">We have 3 rooms matching your criteria. Would you like to proceed with the Ocean Suite?</p>
                <button 
                  style={{ background: brand }}
                  className="w-full py-5 text-white font-bold uppercase tracking-widest text-xs shadow-xl"
                >
                  Confirm Reservation
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </ThemeWrapper>
  );
}
