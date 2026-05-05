"use client"

import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Play, Menu, ArrowRight, Star, ShoppingBag, Search, Plus, Minus, X, Droplet, Sparkles, Leaf, Heart } from "lucide-react"

// ─── REVEAL COMPONENT ────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number, className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── DATA ────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Skincare", href: "#skincare" },
  { label: "Makeup", href: "#makeup" },
  { label: "Best Sellers", href: "#bestsellers" },
  { label: "Our Story", href: "#story" },
]

const STATS = [
  { value: "100", label: "Vegan & Cruelty-Free", suffix: "%" },
  { value: "0", label: "Synthetic Fragrances", suffix: "%" },
  { value: "24", label: "Hour Hydration", suffix: "H" },
  { value: "50", label: "Awards Won", suffix: "+" },
  { value: "30", label: "Day Guarantee", suffix: "D" },
]

const COLLECTIONS = [
  {
    id: "skincare",
    title: "The Radiance Protocol",
    icon: <Droplet className="w-5 h-5" />,
    description: "Our signature skincare line powered by bio-fermented active ingredients and hyaluronic acid to restore your skin's natural barrier and illuminate from within.",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80",
    products: [
      { name: "Luminous Serum", price: "$85", type: "Treatment" },
      { name: "Barrier Cream", price: "$65", type: "Moisturizer" },
      { name: "Gentle Cleanser", price: "$42", type: "Cleanse" }
    ]
  },
  {
    id: "makeup",
    title: "Second Skin Color",
    icon: <Sparkles className="w-5 h-5" />,
    description: "Breathable, serum-infused makeup that enhances rather than conceals. Formulated with squalane to melt seamlessly into your skin.",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80",
    products: [
      { name: "Skin Tint SPF 30", price: "$48", type: "Complexion" },
      { name: "Cloud Blush", price: "$28", type: "Cheek" },
      { name: "Glass Lip Oil", price: "$24", type: "Lip" }
    ]
  },
  {
    id: "body",
    title: "Body Rituals",
    icon: <Leaf className="w-5 h-5" />,
    description: "Transform your daily shower into a spa ritual. Rich, sensorial textures that nourish the skin and ground the mind.",
    image: "https://images.unsplash.com/photo-1614859324967-bdf873af90f8?w=800&q=80",
    products: [
      { name: "Sandalwood Polish", price: "$55", type: "Exfoliate" },
      { name: "Melting Body Balm", price: "$68", type: "Moisturize" },
      { name: "Aura Bath Drops", price: "$45", type: "Soak" }
    ]
  }
]

const TESTIMONIALS = [
  {
    name: "Vogue Beauty",
    role: "Editor's Pick",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    content: "Lumina has achieved what seemed impossible: high-performance active ingredients wrapped in textures so elegant you'll look forward to your routine every morning.",
    rating: 5
  },
  {
    name: "Allure Magazine",
    role: "Best of Beauty 2026",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    content: "The Luminous Serum is a masterclass in formulation. It delivers a glass-skin effect instantly while actually repairing the moisture barrier long-term.",
    rating: 5
  },
  {
    name: "Claire M.",
    role: "Verified Buyer",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    content: "I have incredibly sensitive, rosacea-prone skin. This is the first brand I can use comprehensively without a single flare-up. The Barrier Cream is a lifesaver.",
    rating: 5
  },
  {
    name: "Harper's Bazaar",
    role: "Skincare Awards",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    content: "A masterfully curated line that proves 'clean' beauty doesn't have to compromise on efficacy. The Skin Tint is our new holy grail for the no-makeup look.",
    rating: 5
  }
]

const PRODUCTS = [
  {
    id: "serum",
    name: "The Luminous Serum",
    category: "Treatment",
    price: 85,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80",
    tag: "Best Seller",
    rating: 4.9,
    reviews: 1240
  },
  {
    id: "cream",
    name: "Rich Barrier Cream",
    category: "Moisturizer",
    price: 65,
    image: "https://images.unsplash.com/photo-1615397323755-e43a91b4097f?w=600&q=80",
    tag: "Award Winner",
    rating: 4.8,
    reviews: 856
  },
  {
    id: "cleanser",
    name: "Oat Milk Cleanser",
    category: "Cleanse",
    price: 42,
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&q=80",
    rating: 4.7,
    reviews: 632
  },
  {
    id: "tint",
    name: "Serum Skin Tint",
    category: "Complexion",
    price: 48,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80",
    tag: "New Shade",
    rating: 4.9,
    reviews: 2105
  }
]

const FAQS = [
  {
    question: "Are your products cruelty-free and vegan?",
    answer: "Yes, proudly. 100% of the Lumina line is vegan and Leaping Bunny certified cruelty-free. We never test on animals and we do not sell in countries where animal testing is required by law."
  },
  {
    question: "What is your return policy?",
    answer: "We want you to love your ritual. If you are not completely satisfied, we offer a 30-day money-back guarantee, even on gently used products. Simply initiate a return through our portal."
  },
  {
    question: "Is your packaging recyclable?",
    answer: "Sustainability is core to our mission. Our glass bottles are endlessly recyclable, and our caps are made from 50% post-consumer recycled plastic. Our shipping boxes are printed with soy ink on recycled cardboard."
  },
  {
    question: "Are your products safe for pregnancy?",
    answer: "Most of our products are pregnancy-safe, as we avoid retinoids and high-dose salicylic acid. However, we always recommend consulting with your physician before introducing new skincare during pregnancy."
  },
  {
    question: "How long is shipping?",
    answer: "Standard shipping takes 3-5 business days within the continental US. We offer free standard shipping on all orders over $50. Expedited 2-day shipping is available at checkout."
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we currently ship to Canada, the UK, the EU, and Australia. International shipping times range from 7-14 business days, and duties/taxes are calculated at checkout."
  },
  {
    question: "Are your products suitable for sensitive skin?",
    answer: "Yes. Our formulas are dermatologist-tested, hypoallergenic, and formulated without synthetic fragrances, essential oils, parabens, or sulfates. We specifically formulate to support the skin barrier."
  },
  {
    question: "Do you offer samples?",
    answer: "Every order includes your choice of two complimentary deluxe samples at checkout. We also offer a 'Discovery Kit' containing miniature versions of our core routine for $35."
  }
]

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────
export default function LuminaBeautyTemplate() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  
  // Parallax Values
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"])

  // Cart State (Mock)
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([
    { ...PRODUCTS[0], quantity: 1 }
  ])

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)

  return (
    <div ref={containerRef} className="min-h-screen bg-[#FAFAFA] text-[#2D2A26] font-sans selection:bg-[#E8DCCB] selection:text-[#2D2A26]" style={{ overflowX: "hidden", scrollBehavior: "smooth" }}>
      
      {/* ─── 1. NAVBAR & CART DRAWER (E-COMMERCE READY) ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100 transition-all duration-300">
        <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
          {/* Mobile Menu Trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="md:hidden p-2 text-zinc-600 cursor-pointer">
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-white border-r border-zinc-100 w-[300px]">
              <div className="flex flex-col gap-6 mt-12">
                {NAV_LINKS.map((link) => (
                  <Link 
                    key={link.label} 
                    href={link.href} 
                    className="text-lg font-serif italic text-zinc-800 hover:text-[#B89C7A] transition-colors cursor-pointer"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 w-1/3">
            {NAV_LINKS.slice(0,2).map((link) => (
              <Link 
                key={link.label} 
                href={link.href} 
                className="text-xs font-semibold tracking-widest uppercase text-zinc-500 hover:text-[#2D2A26] transition-colors duration-200 cursor-pointer"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Link href="/" className="flex items-center justify-center w-1/3 group cursor-pointer">
            <span className="text-3xl font-serif italic tracking-tight text-[#2D2A26]">
              Lumina
            </span>
          </Link>

          <div className="flex items-center justify-end gap-6 w-1/3">
            <div className="hidden md:flex gap-8">
              {NAV_LINKS.slice(2,4).map((link) => (
                <Link 
                  key={link.label} 
                  href={link.href} 
                  className="text-xs font-semibold tracking-widest uppercase text-zinc-500 hover:text-[#2D2A26] transition-colors duration-200 cursor-pointer"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <button className="p-2 text-zinc-600 hover:text-[#2D2A26] transition-colors cursor-pointer hidden sm:block">
              <Search className="w-5 h-5" />
            </button>
            
            {/* CART DRAWER (E-Commerce Feature) */}
            <Sheet open={cartOpen} onOpenChange={setCartOpen}>
              <SheetTrigger asChild>
                <button className="p-2 text-zinc-600 hover:text-[#2D2A26] transition-colors cursor-pointer relative">
                  <ShoppingBag className="w-5 h-5" />
                  {cartItems.length > 0 && (
                    <span className="absolute top-1 right-0 w-4 h-4 bg-[#B89C7A] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                      {cartItems.length}
                    </span>
                  )}
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-white border-l border-zinc-100 w-full sm:w-[450px] p-0 flex flex-col">
                <SheetHeader className="p-6 border-b border-zinc-100 flex-shrink-0">
                  <SheetTitle className="text-2xl font-serif italic text-left">Your Bag</SheetTitle>
                </SheetHeader>
                
                <div className="flex-1 overflow-y-auto p-6">
                  {cartItems.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center text-zinc-500">
                      <ShoppingBag className="w-12 h-12 mb-4 opacity-20" />
                      <p className="text-lg font-serif italic mb-2">Your bag is empty.</p>
                      <button onClick={() => setCartOpen(false)} className="text-xs font-bold uppercase tracking-widest text-[#B89C7A] border-b border-[#B89C7A] pb-1">
                        Continue Shopping
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-6">
                      {cartItems.map((item, i) => (
                        <div key={i} className="flex gap-4 group">
                          <div className="w-24 h-32 relative bg-zinc-50 rounded-lg overflow-hidden flex-shrink-0">
                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                          </div>
                          <div className="flex flex-col flex-1 py-1">
                            <div className="flex justify-between items-start mb-1">
                              <h4 className="font-semibold text-[#2D2A26] text-sm">{item.name}</h4>
                              <button className="text-zinc-400 hover:text-red-500 transition-colors">
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="text-xs text-zinc-500 mb-auto">{item.category}</div>
                            <div className="flex justify-between items-end mt-4">
                              <div className="flex items-center border border-zinc-200 rounded-full px-2 py-1">
                                <button className="p-1 text-zinc-500 hover:text-black"><Minus className="w-3 h-3" /></button>
                                <span className="text-xs font-semibold w-6 text-center">{item.quantity}</span>
                                <button className="p-1 text-zinc-500 hover:text-black"><Plus className="w-3 h-3" /></button>
                              </div>
                              <span className="font-semibold">${item.price * item.quantity}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {cartItems.length > 0 && (
                  <div className="p-6 bg-zinc-50 border-t border-zinc-200 flex-shrink-0">
                    <div className="flex justify-between items-center mb-6">
                      <span className="font-serif italic text-lg">Subtotal</span>
                      <span className="font-bold text-lg">${cartTotal}</span>
                    </div>
                    <p className="text-xs text-zinc-500 text-center mb-4">Shipping & taxes calculated at checkout.</p>
                    <button className="w-full py-4 bg-[#2D2A26] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#B89C7A] transition-colors cursor-pointer rounded-none">
                      Checkout
                    </button>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* ─── 2. HERO PARALLAX (SOFT ELEGANCE) ─── */}
      <section className="relative pt-20 h-[95vh] flex items-center justify-center overflow-hidden bg-[#FAFAFA]">
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0 flex md:grid md:grid-cols-2">
          <div className="hidden md:block relative h-full bg-[#E8DCCB]/30">
            <Image 
              src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&q=80" 
              alt="Lumina texture" 
              fill 
              className="object-cover opacity-80"
              priority
            />
          </div>
          <div className="w-full h-full relative">
            <Image 
              src="https://images.unsplash.com/photo-1615397323755-e43a91b4097f?w=1200&q=80" 
              alt="Lumina product" 
              fill 
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#FAFAFA]/90 md:from-[#FAFAFA] to-transparent md:to-transparent" />
          </div>
        </motion.div>

        <motion.div style={{ y: textY }} className="relative z-10 w-full max-w-[1400px] mx-auto px-6 flex flex-col items-start pt-10">
          <Reveal>
            <Badge className="bg-[#B89C7A]/10 text-[#B89C7A] border border-[#B89C7A]/30 mb-8 px-4 py-1.5 rounded-full font-semibold uppercase tracking-widest text-[10px]">
              New Formulation
            </Badge>
          </Reveal>
          
          <Reveal delay={0.1}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif italic text-[#2D2A26] mb-6 leading-[1.1] max-w-2xl">
              Illuminated from <br />
              <span className="font-sans font-bold not-italic text-transparent bg-clip-text bg-gradient-to-r from-[#2D2A26] to-[#B89C7A]">
                within.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-lg md:text-xl text-zinc-600 font-medium max-w-md mb-10 leading-relaxed">
              Clinical-grade skincare that respects your barrier. Formulated with bio-fermented actives for skin that breathes.
            </p>
          </Reveal>

          <Reveal delay={0.3} className="flex flex-col sm:flex-row gap-6">
            <button className="px-10 py-4 bg-[#2D2A26] text-white font-bold uppercase tracking-widest text-xs hover:bg-[#B89C7A] transition-all duration-300 cursor-pointer rounded-none">
              Shop The Serum
            </button>
            <button className="px-10 py-4 bg-transparent border-b-2 border-[#2D2A26] text-[#2D2A26] font-bold uppercase tracking-widest text-xs hover:text-[#B89C7A] hover:border-[#B89C7A] transition-colors duration-300 cursor-pointer rounded-none">
              Explore Routine
            </button>
          </Reveal>
        </motion.div>
      </section>

      {/* ─── 3. STATS BAR (CLEAN BEAUTY) ─── */}
      <section className="py-20 border-y border-zinc-200 bg-white relative z-10">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12 md:gap-4 divide-x-0 md:divide-x divide-zinc-200">
            {STATS.map((stat, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="flex flex-col items-center text-center">
                  <div className="text-4xl lg:text-5xl font-serif italic text-[#2D2A26] mb-3">
                    {stat.value}<span className="text-[#B89C7A] text-2xl ml-1 font-sans not-italic font-bold">{stat.suffix}</span>
                  </div>
                  <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em]">
                    {stat.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. FEATURES (PRODUCT COLLECTIONS TABS) ─── */}
      <section id="story" className="py-32 relative bg-[#FAFAFA]">
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <Reveal>
              <h2 className="text-[10px] font-bold text-[#B89C7A] mb-4 uppercase tracking-[0.3em]">The Collections</h2>
              <h3 className="text-5xl md:text-6xl font-serif italic text-[#2D2A26] mb-6">Curated Rituals.</h3>
              <p className="text-zinc-500 max-w-xl mx-auto leading-relaxed text-lg">
                We believe in fewer, better products. Each collection is designed to work synergistically to support your skin's unique ecosystem.
              </p>
            </Reveal>
          </div>

          <Tabs defaultValue="skincare" className="w-full">
            <TabsList className="flex flex-wrap justify-center h-auto bg-transparent gap-8 mb-16 p-0 border-b border-zinc-200 pb-4">
              {COLLECTIONS.map((col) => (
                <TabsTrigger 
                  key={col.id} 
                  value={col.id}
                  className="px-0 py-2 text-center data-[state=active]:bg-transparent data-[state=active]:text-[#2D2A26] text-zinc-400 hover:text-[#2D2A26] transition-colors duration-300 cursor-pointer rounded-none border-b-2 border-transparent data-[state=active]:border-[#B89C7A] shadow-none data-[state=active]:shadow-none"
                >
                  <div className="flex items-center gap-3">
                    <div className="opacity-70">{col.icon}</div>
                    <span className="text-xs font-bold uppercase tracking-[0.15em]">{col.title}</span>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="w-full">
              <AnimatePresence mode="wait">
                {COLLECTIONS.map((col) => (
                  <TabsContent key={col.id} value={col.id} className="mt-0 outline-none">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.6 }}
                      className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-20 items-center"
                    >
                      <div className="order-2 lg:order-1 grid grid-cols-2 gap-4 md:gap-8">
                        {col.products.map((prod, i) => (
                          <div key={i} className={`flex flex-col group ${i === 2 ? 'col-span-2 md:col-span-1' : ''}`}>
                            <div className="aspect-[4/5] relative w-full overflow-hidden bg-zinc-100 mb-4 rounded-sm">
                              <Image src={col.image} alt={prod.name} fill className="object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-700" />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                                <button className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-white text-[#2D2A26] px-6 py-3 text-[10px] font-bold uppercase tracking-widest">
                                  Quick Add
                                </button>
                              </div>
                            </div>
                            <div className="text-xs text-zinc-500 mb-1">{prod.type}</div>
                            <div className="font-semibold text-sm mb-1">{prod.name}</div>
                            <div className="text-sm">{prod.price}</div>
                          </div>
                        ))}
                      </div>

                      <div className="order-1 lg:order-2 flex flex-col justify-center">
                        <h4 className="text-4xl font-serif italic text-[#2D2A26] mb-6">{col.title}</h4>
                        <p className="text-zinc-600 leading-relaxed mb-10 text-lg">{col.description}</p>
                        <button className="w-fit border-b border-[#2D2A26] pb-1 text-xs font-bold uppercase tracking-widest hover:text-[#B89C7A] hover:border-[#B89C7A] transition-colors cursor-pointer flex items-center gap-2">
                          Shop Collection <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  </TabsContent>
                ))}
              </AnimatePresence>
            </div>
          </Tabs>
        </div>
      </section>

      {/* ─── 5. TESTIMONIALS (PRESS) ─── */}
      <section className="py-32 bg-[#E8DCCB]/20 border-y border-zinc-200 overflow-hidden relative">
        <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center">
          <Reveal>
            <div className="mb-20">
              <h2 className="text-[10px] font-bold text-[#B89C7A] mb-4 uppercase tracking-[0.3em]">Press</h2>
              <h3 className="text-4xl md:text-5xl font-serif italic text-[#2D2A26]">Industry Acclaim.</h3>
            </div>
          </Reveal>

          <Carousel className="w-full">
            <CarouselContent>
              {TESTIMONIALS.map((testi, i) => (
                <CarouselItem key={i} className="md:basis-full pl-0">
                  <Reveal delay={i * 0.1}>
                    <div className="max-w-3xl mx-auto flex flex-col items-center">
                      <div className="flex gap-2 mb-8">
                        {[...Array(testi.rating)].map((_, j) => (
                          <Star key={j} className="w-5 h-5 fill-[#B89C7A] text-[#B89C7A]" />
                        ))}
                      </div>
                      <p className="text-2xl md:text-3xl font-serif italic leading-relaxed mb-12 text-[#2D2A26]">
                        "{testi.content}"
                      </p>
                      <div className="flex flex-col items-center gap-2">
                        <div className="font-bold tracking-widest uppercase text-xs text-[#2D2A26]">{testi.name}</div>
                        <div className="font-medium text-[10px] uppercase tracking-[0.2em] text-zinc-500">{testi.role}</div>
                      </div>
                    </div>
                  </Reveal>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-8 mt-16">
              <CarouselPrevious className="relative inset-auto translate-y-0 bg-white border-zinc-200 text-[#2D2A26] hover:bg-[#2D2A26] hover:text-white transition-colors" />
              <CarouselNext className="relative inset-auto translate-y-0 bg-white border-zinc-200 text-[#2D2A26] hover:bg-[#2D2A26] hover:text-white transition-colors" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* ─── 6. PRICING / SHOP GRID (BEST SELLERS) ─── */}
      <section id="bestsellers" className="py-32 bg-white relative">
        <div className="max-w-[1600px] mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20">
            <Reveal>
              <h2 className="text-[10px] font-bold text-[#B89C7A] mb-4 uppercase tracking-[0.3em]">Shop</h2>
              <h3 className="text-4xl md:text-5xl font-serif italic text-[#2D2A26]">Cult Favorites.</h3>
            </Reveal>
            <Reveal>
              <button className="mt-6 md:mt-0 border-b border-[#2D2A26] pb-1 text-xs font-bold uppercase tracking-widest hover:text-[#B89C7A] hover:border-[#B89C7A] transition-colors cursor-pointer">
                View All Products
              </button>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PRODUCTS.map((prod, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="flex flex-col group relative">
                  {prod.tag && (
                    <div className="absolute top-4 left-4 z-10 bg-white px-3 py-1 text-[9px] font-bold uppercase tracking-widest shadow-sm">
                      {prod.tag}
                    </div>
                  )}
                  <div className="aspect-[4/5] relative w-full overflow-hidden bg-[#FAFAFA] mb-6">
                    <Image src={prod.image} alt={prod.name} fill className="object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-700" />
                    
                    {/* Hover Add to Cart */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 flex flex-col justify-end p-4">
                      <button 
                        onClick={() => setCartOpen(true)}
                        className="w-full opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-[#2D2A26] text-white py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-[#B89C7A]"
                      >
                        Add to Bag — ${prod.price}
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">{prod.category}</div>
                      <h4 className="font-serif text-lg text-[#2D2A26]">{prod.name}</h4>
                    </div>
                    <span className="font-semibold">${prod.price}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className={`w-3 h-3 ${j < Math.floor(prod.rating) ? 'fill-[#2D2A26] text-[#2D2A26]' : 'text-zinc-300'}`} />
                      ))}
                    </div>
                    <span className="text-xs text-zinc-500">({prod.reviews})</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7. FAQ ACCORDION ─── */}
      <section className="py-32 bg-[#FAFAFA] border-t border-zinc-200">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-[10px] font-bold text-[#B89C7A] mb-4 uppercase tracking-[0.3em]">Knowledge</h2>
              <h3 className="text-4xl font-serif italic text-[#2D2A26]">Common Questions.</h3>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-zinc-200">
                  <AccordionTrigger className="text-left text-[#2D2A26] hover:text-[#B89C7A] hover:no-underline font-semibold text-base py-6 transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-zinc-600 font-medium leading-relaxed pb-6 text-sm">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* ─── 8. CTA BANNER (NEWSLETTER) ─── */}
      <section className="py-24 px-6 relative z-10 bg-white">
        <Reveal>
          <div className="max-w-[1200px] mx-auto bg-[#E8DCCB]/30 p-16 md:p-24 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1600&q=80')] bg-cover bg-center opacity-5 mix-blend-multiply" />
            
            <div className="relative z-10 max-w-lg mx-auto flex flex-col items-center">
              <Heart className="w-8 h-8 text-[#B89C7A] mb-6" />
              <h2 className="text-3xl md:text-5xl font-serif italic text-[#2D2A26] mb-6">Join the Inner Circle.</h2>
              <p className="text-zinc-600 mb-10 font-medium">
                Subscribe to receive 10% off your first ritual, plus early access to new launches and exclusive content.
              </p>
              <div className="flex w-full flex-col sm:flex-row gap-0">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 px-6 py-4 bg-white border border-zinc-200 focus:outline-none focus:border-[#B89C7A] text-sm"
                />
                <button className="px-8 py-4 bg-[#2D2A26] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#B89C7A] transition-colors duration-300 cursor-pointer whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ─── 9. FOOTER ─── */}
      <footer className="bg-[#2D2A26] text-[#FAFAFA] pt-24 pb-12 border-t border-zinc-200">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div>
              <Link href="/" className="inline-block mb-8 cursor-pointer">
                <span className="text-3xl font-serif italic tracking-tight text-white">
                  Lumina
                </span>
              </Link>
              <p className="text-zinc-400 font-medium text-sm leading-relaxed mb-8 max-w-sm">
                Skincare that honors your skin's natural intelligence. Formulated in Paris, made in California.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-[0.2em] text-[10px] mb-6">Shop</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-zinc-400 hover:text-[#B89C7A] transition-colors text-sm font-semibold cursor-pointer">All Products</a></li>
                <li><a href="#" className="text-zinc-400 hover:text-[#B89C7A] transition-colors text-sm font-semibold cursor-pointer">Skincare</a></li>
                <li><a href="#" className="text-zinc-400 hover:text-[#B89C7A] transition-colors text-sm font-semibold cursor-pointer">Makeup</a></li>
                <li><a href="#" className="text-zinc-400 hover:text-[#B89C7A] transition-colors text-sm font-semibold cursor-pointer">Sets & Bundles</a></li>
                <li><a href="#" className="text-zinc-400 hover:text-[#B89C7A] transition-colors text-sm font-semibold cursor-pointer">Digital Gift Cards</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-[0.2em] text-[10px] mb-6">About</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-zinc-400 hover:text-[#B89C7A] transition-colors text-sm font-semibold cursor-pointer">Our Story</a></li>
                <li><a href="#" className="text-zinc-400 hover:text-[#B89C7A] transition-colors text-sm font-semibold cursor-pointer">Ingredients</a></li>
                <li><a href="#" className="text-zinc-400 hover:text-[#B89C7A] transition-colors text-sm font-semibold cursor-pointer">Sustainability</a></li>
                <li><a href="#" className="text-zinc-400 hover:text-[#B89C7A] transition-colors text-sm font-semibold cursor-pointer">Careers</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-[0.2em] text-[10px] mb-6">Support</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-zinc-400 hover:text-[#B89C7A] transition-colors text-sm font-semibold cursor-pointer">FAQ</a></li>
                <li><a href="#" className="text-zinc-400 hover:text-[#B89C7A] transition-colors text-sm font-semibold cursor-pointer">Shipping & Returns</a></li>
                <li><a href="#" className="text-zinc-400 hover:text-[#B89C7A] transition-colors text-sm font-semibold cursor-pointer">Track Order</a></li>
                <li><a href="#" className="text-zinc-400 hover:text-[#B89C7A] transition-colors text-sm font-semibold cursor-pointer">Contact Us</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
            <p>&copy; 2026 Lumina Beauty Inc.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors cursor-pointer">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors cursor-pointer">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors cursor-pointer">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}
