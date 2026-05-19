"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { SessionData } from "@/lib/sessions";
import { ThemeWrapper } from "./ThemeWrapper";
import { Reveal, Stagger, StaggerItem } from "./AnimationHelpers";
import { ShoppingBag, X, Plus, Minus, Star, ShieldCheck, Truck, RotateCcw, Quote, ArrowRight, Mail, MapPin, Phone, Heart, Clock, Globe, HelpCircle, Gift, Award, Zap } from "lucide-react";

// --- Mock Data Generator ---
const generateProducts = (businessType: string, brandColor: string) => {
  const isFashion = businessType.toLowerCase().includes("fashion") || businessType.toLowerCase().includes("boutique");
  const isJewelry = businessType.toLowerCase().includes("jewelry") || businessType.toLowerCase().includes("luxury");
  
  const base = [
    { id: 1, name: "Premium Collection Item", price: 129, category: "Featured" },
    { id: 2, name: "Limited Edition Release", price: 89, category: "New Arrivals" },
    { id: 3, name: "Signature Series A", price: 199, category: "Bestsellers" },
    { id: 4, name: "Essential Pack", price: 45, category: "Featured" },
    { id: 5, name: "Modern Classic", price: 155, category: "New Arrivals" },
    { id: 6, name: "Artisanal Selection", price: 210, category: "Bestsellers" },
  ];

  return base.map(p => ({
    ...p,
    image: `https://images.unsplash.com/photo-${1500000000000 + p.id * 1000}?w=800&q=80`,
    rating: 4.5 + Math.random() * 0.5
  }));
};

function TiltCard({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]));
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]));

  function handleMouse(e: React.MouseEvent) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <motion.div
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className="relative"
    >
      {children}
    </motion.div>
  );
}

export function EcommerceTheme({ session }: { session: SessionData }) {
  const { formData, generatedContent: c } = session;
  const brand = formData.brandColor || "#7c3aed";
  const products = generateProducts(formData.businessType, brand);
  
  const [cart, setCart] = useState<{id: number, name: string, price: number, qty: number}[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [filter, setFilter] = useState("All");

  const addToCart = (p: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === p.id);
      if (existing) return prev.map(item => item.id === p.id ? { ...item, qty: item.qty + 1 } : item);
      return [...prev, { id: p.id, name: p.name, price: p.price, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const filteredProducts = filter === "All" ? products : products.filter(p => p.category === filter);

  return (
    <ThemeWrapper session={session}>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden bg-zinc-900">
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 1.5 }}
          src={formData.heroImageUrl || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80"}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-white">
          <Reveal>
            <div className="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-widest mb-6">
              New Collection 2026
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight max-w-3xl">
              {c?.heroHeadline}
            </h1>
            <p className="text-xl text-white/70 max-w-xl mb-12 leading-relaxed">
              {c?.heroSubline}
            </p>
            <div className="flex gap-6">
              <button 
                onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })}
                style={{ background: brand }}
                className="px-10 py-5 rounded-none font-bold uppercase tracking-widest text-sm hover:brightness-110 transition-all"
              >
                Shop Now
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 border-b bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-12 md:gap-24 text-zinc-400">
          <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest"><Truck className="w-5 h-5 text-zinc-900" /> Free Shipping</div>
          <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest"><ShieldCheck className="w-5 h-5 text-zinc-900" /> Secure Payment</div>
          <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest"><RotateCcw className="w-5 h-5 text-zinc-900" /> 30-Day Returns</div>
        </div>
      </section>

      {/* Shop Section */}
      <section id="shop" className="py-32 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <Reveal>
              <h2 className="text-5xl font-black uppercase tracking-tighter">Explore {formData.businessName}</h2>
              <div className="w-20 h-2 mt-6" style={{ background: brand }} />
            </Reveal>
            
            <div className="flex gap-4">
              {["All", "Featured", "New Arrivals", "Bestsellers"].map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all ${filter === cat ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-400 hover:text-zinc-900 border'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {filteredProducts.map(p => (
              <StaggerItem key={p.id}>
                <TiltCard>
                  <div className="group bg-white border border-zinc-100 overflow-hidden">
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white text-[10px] font-black uppercase tracking-widest border border-zinc-100">{p.category}</span>
                      </div>
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button 
                          onClick={() => addToCart(p)}
                          className="bg-white text-zinc-900 px-8 py-3 font-bold uppercase text-xs tracking-widest hover:bg-zinc-100 transition-colors"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg">{p.name}</h3>
                        <div className="flex items-center gap-1 text-amber-500"><Star className="w-3 h-3 fill-current" /> <span className="text-xs font-bold">{p.rating}</span></div>
                      </div>
                      <div className="text-xl font-black" style={{ color: brand }}>${p.price}</div>
                    </div>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Lookbook / Collections */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <Reveal>
              <h3 className="text-4xl font-black mb-8 uppercase tracking-tighter leading-tight">Curated with Passion,<br/>Delivered with Precision.</h3>
              <p className="text-lg text-zinc-500 mb-12 leading-relaxed">
                {c?.aboutText}
              </p>
              <div className="grid grid-cols-2 gap-8">
                {formData.benefits.map((b, i) => (
                  <div key={i} className="flex flex-col gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ background: brand }}>{i+1}</div>
                    <div className="font-bold uppercase text-xs tracking-widest">{b}</div>
                  </div>
                ))}
              </div>
            </Reveal>
            <div className="grid grid-cols-2 gap-6 h-[600px]">
              <div className="h-full pt-12"><img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80" className="w-full h-full object-cover" /></div>
              <div className="h-full pb-12"><img src="https://images.unsplash.com/photo-1529139513055-119712d289b5?w=800&q=80" className="w-full h-full object-cover" /></div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 5: CUSTOMER REVIEWS ═══ */}
      <section className="py-32 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="text-center mb-20">
            <div className="text-xs font-black uppercase tracking-[0.3em] mb-6" style={{ color: brand }}>Customer Love</div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">What Our Customers Say</h2>
          </Reveal>
          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(c?.testimonials || [
              { name: "Sophie L.", role: "Verified Buyer", text: "Incredible quality. The packaging was beautiful and delivery was lightning fast.", rating: 5 },
              { name: "Marc T.", role: "Loyal Customer", text: "I've ordered multiple times — consistency is flawless. My go-to store.", rating: 5 },
              { name: "Emma R.", role: "First Purchase", text: "Exceeded expectations! The product quality is outstanding for the price.", rating: 5 },
            ]).map((t, i) => (
              <StaggerItem key={i}>
                <div className="p-8 bg-white border hover:shadow-xl transition-all h-full flex flex-col">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-current text-amber-400" />
                    ))}
                  </div>
                  <p className="text-lg leading-relaxed mb-8 flex-1 text-zinc-600 italic">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: brand }}>{t.name.charAt(0)}</div>
                    <div>
                      <div className="font-bold text-sm">{t.name}</div>
                      <div className="text-[10px] text-zinc-400 uppercase tracking-widest">{t.role}</div>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ═══ SECTION 6: FEATURED CATEGORIES ═══ */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="mb-20">
            <h2 className="text-4xl font-black uppercase tracking-tighter">Shop By Category</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "New Arrivals", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80" },
              { name: "Bestsellers", img: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80" },
              { name: "Sale", img: "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&q=80" },
            ].map((cat, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="group relative aspect-[4/5] overflow-hidden cursor-pointer">
                  <img src={cat.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight">{cat.name}</h3>
                    <ArrowRight className="w-6 h-6 text-white group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 7: NEWSLETTER CTA ═══ */}
      <section className="py-32 bg-zinc-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <Mail className="w-8 h-8 mx-auto mb-8 opacity-40" />
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6">Join The Club</h2>
            <p className="text-lg text-white/50 mb-12 max-w-xl mx-auto">Get early access to new arrivals, exclusive deals, and 10% off your first order.</p>
            <form onSubmit={e => e.preventDefault()} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input type="email" placeholder="Your email address" className="flex-1 px-6 py-5 bg-white/10 border border-white/20 text-white placeholder:text-white/30 outline-none text-sm" />
              <button type="submit" style={{ background: brand }} className="px-10 py-5 font-bold uppercase tracking-widest text-xs hover:brightness-110 transition-all">
                Subscribe
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      {/* ═══ SECTION 8: CONTACT / STORE INFO ═══ */}
      <section id="contact" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <Reveal>
              <div className="p-8 bg-zinc-50 border h-full">
                <MapPin className="w-6 h-6 mb-6" style={{ color: brand }} />
                <h3 className="font-black uppercase tracking-widest text-sm mb-4">Visit Us</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{formData.city}</p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="p-8 bg-zinc-50 border h-full">
                <Mail className="w-6 h-6 mb-6" style={{ color: brand }} />
                <h3 className="font-black uppercase tracking-widest text-sm mb-4">Email Us</h3>
                <p className="text-zinc-500 text-sm">{formData.email}</p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="p-8 bg-zinc-50 border h-full">
                <Phone className="w-6 h-6 mb-6" style={{ color: brand }} />
                <h3 className="font-black uppercase tracking-widest text-sm mb-4">Call Us</h3>
                <p className="text-zinc-500 text-sm">{formData.phone || "Mon-Sat 9AM-6PM"}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 9: FLASH SALE ═══ */}
      <section className="py-20 bg-red-600 text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10 relative z-10">
          <Reveal>
            <div className="flex items-center gap-4 mb-4">
              <Zap className="w-8 h-8 fill-current" />
              <span className="text-xl font-black uppercase tracking-[0.3em]">Flash Sale</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic">Limited Time Offer</h2>
          </Reveal>
          
          <div className="flex gap-8 items-center font-black">
            {[
              { val: "02", label: "Hours" },
              { val: "45", label: "Mins" },
              { val: "12", label: "Secs" },
            ].map((t, i) => (
              <div key={i} className="text-center">
                <div className="text-5xl md:text-7xl tracking-tighter leading-none">{t.val}</div>
                <div className="text-[10px] uppercase tracking-widest mt-2 opacity-60">{t.label}</div>
              </div>
            ))}
          </div>
          
          <Reveal delay={0.2}>
            <button className="px-12 py-5 bg-white text-red-600 font-black uppercase text-xs tracking-widest shadow-2xl hover:scale-105 transition-all">
              Claim 40% Off
            </button>
          </Reveal>
        </div>
      </section>

      {/* ═══ SECTION 10: BRAND STORY ═══ */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <Reveal>
            <div className="text-xs font-black uppercase tracking-[0.4em] mb-8" style={{ color: brand }}>Our Philosophy</div>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-12 leading-[0.9]">Crafted for the <br/>Discerning.</h2>
            <p className="text-xl text-zinc-500 leading-relaxed mb-12 italic">
              Every piece in our collection is a testament to our commitment to quality, sustainability, and timeless design. We don&apos;t just sell products; we deliver experiences that last a lifetime.
            </p>
            <div className="flex gap-12">
              <div>
                <div className="text-4xl font-black mb-2 tracking-tighter italic">100%</div>
                <div className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest">Organic Materials</div>
              </div>
              <div className="w-px h-16 bg-zinc-100" />
              <div>
                <div className="text-4xl font-black mb-2 tracking-tighter italic">Ethical</div>
                <div className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest">Sourcing Policy</div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.2} className="relative">
             <div className="aspect-[4/5] rounded-[60px] overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80" className="w-full h-full object-cover" alt="Craftsmanship" />
             </div>
             <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full border-[12px] border-white overflow-hidden shadow-xl hidden lg:block">
                <img src="https://images.unsplash.com/photo-1544441893-675973e31985?w=400&q=80" className="w-full h-full object-cover" alt="Detail" />
             </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ SECTION 11: INSTAGRAM FEED ═══ */}
      <section className="py-32 bg-zinc-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-20 flex justify-between items-end">
          <Reveal>
            <h2 className="text-4xl font-black uppercase tracking-tighter">@ {formData.businessName.replace(/\s+/g, '_').toLowerCase()}</h2>
            <p className="text-zinc-400 mt-4 uppercase text-[10px] font-bold tracking-widest">Follow us for daily inspiration</p>
          </Reveal>
          <button className="hidden md:flex items-center gap-2 text-xs font-black uppercase tracking-widest">
            <Globe className="w-4 h-4" /> View Profile
          </button>
        </div>
        
        <div className="flex gap-4 animate-marquee whitespace-nowrap">
          {[
            "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&q=80",
            "https://images.unsplash.com/photo-1441984904996-e0b6ba687e12?w=400&q=80",
            "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80",
            "https://images.unsplash.com/photo-1470309634658-8efe215a9edb?w=400&q=80",
            "https://images.unsplash.com/photo-1539109132381-31a1b973f0ea?w=400&q=80",
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80",
            "https://images.unsplash.com/photo-1529139513055-119712d289b5?w=400&q=80",
            "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&q=80",
          ].map((img, i) => (
            <div key={i} className="w-64 h-64 flex-shrink-0 relative group">
              <img src={img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Globe className="w-8 h-8 text-white" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ SECTION 12: FEATURED PRODUCT SPOTLIGHT ═══ */}
      <section className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-zinc-900 rounded-[60px] overflow-hidden flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 p-16 md:p-24 text-white">
               <Reveal>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest mb-8 border border-white/10">
                     <Star className="w-3 h-3 fill-white" /> Item of the month
                  </div>
                  <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 italic leading-none">The Onyx <br/>Series v2.</h2>
                  <p className="text-xl text-white/50 mb-12 leading-relaxed">
                     Redefining the standards of modern luxury. Engineered with high-tensile materials and hand-finished for an unparalleled tactile experience.
                  </p>
                  <div className="flex gap-8 items-end mb-16">
                     <span className="text-5xl font-black">$499</span>
                     <span className="text-white/30 line-through text-2xl">$650</span>
                  </div>
                  <button style={{ background: brand }} className="px-12 py-5 font-black uppercase tracking-widest text-sm shadow-2xl hover:scale-105 transition-all">
                     Order Now
                  </button>
               </Reveal>
            </div>
            <div className="lg:w-1/2 h-full relative aspect-square lg:aspect-auto">
               <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&q=80" className="w-full h-full object-cover grayscale opacity-80" alt="Spotlight" />
               <div className="absolute inset-0 bg-gradient-to-l from-zinc-900/50 to-transparent lg:hidden" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 13: MEMBERSHIP / LOYALTY ═══ */}
      <section className="py-32 bg-zinc-50 border-y">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
          <Reveal className="col-span-1">
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-8">Join the Inner Circle.</h2>
            <p className="text-zinc-500 leading-relaxed italic">Unlock exclusive benefits, early access, and personalized rewards designed for our most loyal community members.</p>
          </Reveal>
          
          <div className="col-span-1 md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
             {[
               { icon: <Gift />, title: "Reward Points", desc: "Earn points on every purchase and redeem them for future collections." },
               { icon: <Clock />, title: "Early Access", desc: "Be the first to shop limited releases before they hit the main store." },
               { icon: <Award />, title: "VIP Events", desc: "Invites to private showcase events and digital masterclasses." },
               { icon: <HelpCircle />, title: "Concierge", desc: "Dedicated 24/7 support for all your product and styling needs." },
             ].map((item, i) => (
               <Reveal key={i} delay={i * 0.1}>
                 <div className="p-8 bg-white border rounded-3xl group hover:border-transparent hover:shadow-2xl transition-all duration-500">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-all group-hover:scale-110" style={{ background: brand + '10', color: brand }}>{item.icon}</div>
                    <h3 className="text-lg font-black uppercase tracking-tight mb-4">{item.title}</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
                 </div>
               </Reveal>
             ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 14: FAQ ═══ */}
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal className="text-center mb-24">
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-6">Concierge Support</h2>
            <p className="text-zinc-500 italic">Everything you need to know about our products and services.</p>
          </Reveal>
          
          <div className="space-y-6">
            {[
              { q: "What is your global shipping policy?", a: "We offer express worldwide shipping. Most orders arrive within 3-5 business days. Customs and duties are calculated at checkout." },
              { q: "Do you offer a satisfaction guarantee?", a: "Yes, we provide a 30-day no-questions-asked return policy for all unworn items in their original packaging." },
              { q: "How do I track my order status?", a: "Once your order is dispatched, you will receive a tracking link via email and SMS to monitor its progress in real-time." },
            ].map((f, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="p-8 border rounded-3xl group hover:bg-zinc-50 transition-colors cursor-pointer">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-black uppercase tracking-widest text-sm">{f.q}</span>
                    <Plus className="w-4 h-4 text-zinc-400 group-hover:rotate-90 transition-transform" />
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed group-hover:text-zinc-900 transition-colors">{f.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 15: PRE-FOOTER PROMO ═══ */}
      <section className="py-40 bg-zinc-900 relative overflow-hidden">
        <motion.div 
           animate={{ scale: [1, 1.2, 1], rotate: [0, 5, 0] }}
           transition={{ duration: 20, repeat: Infinity }}
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-30 grayscale blur-xl"
        >
           <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80" className="w-full h-full object-cover" alt="" />
        </motion.div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="text-6xl md:text-[8vw] font-black uppercase tracking-tighter text-white italic mb-16 leading-none">The Future <br/>Of Style<span style={{ color: brand }}>.</span></h2>
            <button style={{ background: brand }} className="px-16 py-8 text-white font-black uppercase tracking-[0.3em] text-sm shadow-[0_0_80px_rgba(0,0,0,0.5)] hover:scale-105 transition-all">
              Elevate Your Collection
            </button>
          </Reveal>
        </div>
      </section>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/60 z-[1000] backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-white z-[1001] shadow-2xl flex flex-col"
            >
              <div className="p-8 border-b flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-6 h-6" />
                  <span className="font-black uppercase tracking-widest text-lg">Your Cart</span>
                  <span className="bg-zinc-100 text-zinc-500 text-xs px-2 py-0.5 rounded-full">{cart.reduce((a, b) => a + b.qty, 0)}</span>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="hover:rotate-90 transition-transform"><X className="w-6 h-6" /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-8">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-zinc-400 gap-4">
                    <ShoppingBag className="w-12 h-12 opacity-20" />
                    <p className="uppercase text-xs font-bold tracking-widest">Cart is empty</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-8">
                    {cart.map(item => (
                      <div key={item.id} className="flex gap-6 items-center">
                        <div className="w-20 h-24 bg-zinc-100 overflow-hidden flex-shrink-0">
                          <img src={`https://images.unsplash.com/photo-${1500000000000 + item.id * 1000}?w=200&q=80`} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <div className="font-bold mb-1">{item.name}</div>
                          <div className="text-zinc-500 text-sm mb-4">${item.price}</div>
                          <div className="flex items-center gap-4">
                            <button className="p-1 border hover:bg-zinc-50" onClick={() => setCart(prev => prev.map(i => i.id === item.id && i.qty > 1 ? {...i, qty: i.qty - 1} : i))}><Minus className="w-3 h-3" /></button>
                            <span className="font-bold text-sm">{item.qty}</span>
                            <button className="p-1 border hover:bg-zinc-50" onClick={() => setCart(prev => prev.map(i => i.id === item.id ? {...i, qty: i.qty + 1} : i))}><Plus className="w-3 h-3" /></button>
                          </div>
                        </div>
                        <button className="text-zinc-300 hover:text-red-500 transition-colors" onClick={() => setCart(prev => prev.filter(i => i.id !== item.id))}><X className="w-4 h-4" /></button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-8 border-t bg-zinc-50">
                <div className="flex justify-between items-center mb-8">
                  <span className="font-bold uppercase text-xs tracking-widest text-zinc-400">Total Amount</span>
                  <span className="text-2xl font-black">${cart.reduce((a, b) => a + b.price * b.qty, 0)}</span>
                </div>
                <button 
                  disabled={cart.length === 0}
                  style={{ background: brand }}
                  className="w-full py-5 rounded-none text-white font-black uppercase tracking-[0.2em] text-sm shadow-xl hover:brightness-110 transition-all disabled:opacity-50 disabled:grayscale"
                >
                  Checkout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </ThemeWrapper>
  );
}
