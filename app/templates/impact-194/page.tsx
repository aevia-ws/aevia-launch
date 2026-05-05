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
import { Play, Menu, ArrowRight, Star, ShoppingBag, Search, Plus, Minus, X, CheckCircle2, ShieldCheck, Zap, Truck, Flame } from "lucide-react"

// ─── REVEAL COMPONENT ────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number, className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── DATA ────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Sneakers", href: "#sneakers" },
  { label: "Apparel", href: "#apparel" },
  { label: "Releases", href: "#releases" },
  { label: "Sell", href: "#sell" },
]

const STATS = [
  { value: "100", label: "Authenticity Guarantee", suffix: "%" },
  { value: "24", label: "Express Shipping", suffix: "H" },
  { value: "50", label: "Brands Stocked", suffix: "+" },
  { value: "500", label: "Active Listings", suffix: "K" },
  { value: "4.9", label: "Trustpilot Rating", suffix: "" },
]

const COLLECTIONS = [
  {
    id: "hype",
    title: "Hype Releases",
    icon: <Flame className="w-5 h-5" />,
    description: "The most sought-after drops of the week. Limited stock, authenticated, and ready to ship instantly to your door.",
    image: "https://images.unsplash.com/photo-1552346154-21d32810baa3?w=800&q=80",
    products: [
      { name: "Jordan 1 Retro High 'Chicago'", price: "$850", type: "Sneaker" },
      { name: "Travis Scott x SB Dunk", price: "$1,200", type: "Sneaker" },
      { name: "Off-White x Air Force 1", price: "$950", type: "Sneaker" }
    ]
  },
  {
    id: "essentials",
    title: "Daily Rotation",
    icon: <Zap className="w-5 h-5" />,
    description: "Versatile silhouettes that belong in every rotation. Classic colorways and unbeatable comfort for everyday wear.",
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&q=80",
    products: [
      { name: "New Balance 990v6", price: "$200", type: "Sneaker" },
      { name: "Nike Dunk Low 'Panda'", price: "$150", type: "Sneaker" },
      { name: "Asics Gel-Kayano 14", price: "$160", type: "Sneaker" }
    ]
  },
  {
    id: "apparel",
    title: "Streetwear & Archives",
    icon: <ShoppingBag className="w-5 h-5" />,
    description: "Curated vintage garments, limited collaboration hoodies, and essential streetwear pieces to complete the fit.",
    image: "https://images.unsplash.com/photo-1523398002811-999aa8ffdd59?w=800&q=80",
    products: [
      { name: "Supreme Box Logo Hoodie", price: "$450", type: "Apparel" },
      { name: "Stüssy 8 Ball Fleece", price: "$180", type: "Apparel" },
      { name: "Arc'teryx Beta LT Jacket", price: "$400", type: "Apparel" }
    ]
  }
]

const TESTIMONIALS = [
  {
    name: "Hypebeast",
    role: "Editorial Review",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    content: "Kicks Market is changing the game. Their multi-stage authentication process is the most rigorous we've seen, effectively eliminating fakes from their platform.",
    rating: 5
  },
  {
    name: "Complex Sneakers",
    role: "Industry Spotlight",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    content: "Finally, a secondary market platform that doesn't hit you with 20% in hidden fees at checkout. Transparent pricing and instant shipping make this the new standard.",
    rating: 5
  },
  {
    name: "Marcus T.",
    role: "Verified Buyer",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    content: "Ordered the Lost & Founds on Tuesday afternoon, had them authenticated and on my feet by Thursday. The NFC authenticity tag is a brilliant touch.",
    rating: 5
  },
  {
    name: "Sarah Jenkins",
    role: "Verified Seller",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    content: "As a seller, the payout times are insane. Usually, it takes weeks on other apps. Here, the moment my sneakers passed verification, the money was in my account.",
    rating: 5
  }
]

const PRODUCTS = [
  {
    id: "j4",
    name: "Jordan 4 Retro SB 'Pine Green'",
    category: "Jordan",
    price: 450,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80",
    tag: "Trending",
    rating: 4.9,
    reviews: 124
  },
  {
    id: "nb",
    name: "New Balance 2002R 'Protection Pack'",
    category: "New Balance",
    price: 220,
    image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=600&q=80",
    tag: "Restock",
    rating: 4.8,
    reviews: 85
  },
  {
    id: "dunk",
    name: "Nike SB Dunk Low 'Jarritos'",
    category: "Nike",
    price: 650,
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=80",
    rating: 4.7,
    reviews: 63
  },
  {
    id: "yeezy",
    name: "Yeezy Slide 'Onyx'",
    category: "Adidas",
    price: 180,
    image: "https://images.unsplash.com/photo-1610847037207-62f59231f822?w=600&q=80",
    tag: "Summer Essential",
    rating: 4.9,
    reviews: 210
  }
]

const FAQS = [
  {
    question: "How does the authentication process work?",
    answer: "Every item sold on Kicks Market goes through a rigorous multi-point inspection by our expert authenticators. We check the materials, stitching, labels, box, and use AI-assisted scanning to guarantee 100% authenticity."
  },
  {
    question: "What is your return policy?",
    answer: "Because we operate as a live marketplace, all sales are final. However, if an item arrives completely not as described or is proven to be inauthentic (which our guarantee covers), we will issue a full refund."
  },
  {
    question: "How fast is shipping?",
    answer: "Items marked 'Instant Ship' are already pre-verified in our warehouse and ship the same day. Standard items must first be shipped by the seller to our authentication center, which typically takes 5-7 business days total."
  },
  {
    question: "How do I sell my sneakers?",
    answer: "Simply create an account, search for the item you have, and 'Place an Ask'. When a buyer matches your price, we send you a prepaid shipping label. Ship it to us, and get paid within 24 hours of successful verification."
  },
  {
    question: "Are there any hidden buyer fees?",
    answer: "No. Unlike other platforms, the price you see is the price you pay. We charge a flat 3% processing fee at checkout, and standard shipping is calculated based on your location. No surprise authentication fees."
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship to over 150 countries via DHL Express. International buyers are responsible for any customs duties or import taxes assessed by their local government."
  },
  {
    question: "Can I cancel my bid/ask?",
    answer: "Yes, you can cancel or modify your bid/ask at any time before it is matched. Once a match occurs and the transaction is generated, it cannot be cancelled."
  },
  {
    question: "What happens if a seller sends a fake item?",
    answer: "If an item fails our authentication process, the transaction is cancelled, the buyer is immediately refunded in full, and the seller is penalized (including potential account suspension and a 15% penalty fee)."
  }
]

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────
export default function KicksMarketTemplate() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  
  // Parallax Values
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"])

  // Cart State (Mock)
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([
    { ...PRODUCTS[0], size: "US 10", quantity: 1 }
  ])

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)

  return (
    <div ref={containerRef} className="min-h-screen bg-[#F4F4F4] text-[#111111] font-sans selection:bg-[#FF3A00] selection:text-white" style={{ overflowX: "hidden", scrollBehavior: "smooth" }}>
      
      {/* ─── 1. NAVBAR & CART DRAWER ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-black/10 transition-all duration-300">
        <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group cursor-pointer">
            <span className="text-3xl font-black tracking-tighter uppercase italic text-[#111111]">
              KICKS<span className="text-[#FF3A00]">MKT</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.label} 
                href={link.href} 
                className="text-sm font-black tracking-widest uppercase text-zinc-500 hover:text-[#111111] transition-colors duration-200 cursor-pointer"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <button className="hidden sm:flex items-center gap-2 p-2 bg-zinc-100 rounded-full px-4 text-xs font-bold text-zinc-500 hover:bg-zinc-200 transition-colors">
              <Search className="w-4 h-4" /> Search brands, models...
            </button>
            
            {/* CART DRAWER */}
            <Sheet open={cartOpen} onOpenChange={setCartOpen}>
              <SheetTrigger asChild>
                <button className="p-2 text-[#111111] hover:text-[#FF3A00] transition-colors cursor-pointer relative">
                  <ShoppingBag className="w-6 h-6" />
                  {cartItems.length > 0 && (
                    <span className="absolute top-0 right-0 w-4 h-4 bg-[#FF3A00] text-white text-[10px] font-black rounded-full flex items-center justify-center">
                      {cartItems.length}
                    </span>
                  )}
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-white border-l border-black/10 w-full sm:w-[450px] p-0 flex flex-col">
                <SheetHeader className="p-6 border-b border-black/10 flex-shrink-0">
                  <SheetTitle className="text-2xl font-black uppercase italic tracking-tighter text-left">Your Cart</SheetTitle>
                </SheetHeader>
                
                <div className="flex-1 overflow-y-auto p-6 bg-[#F4F4F4]">
                  {cartItems.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center text-zinc-500">
                      <ShoppingBag className="w-16 h-16 mb-4 opacity-20" />
                      <p className="text-xl font-black uppercase italic mb-2 tracking-tighter">Your cart is empty.</p>
                      <button onClick={() => setCartOpen(false)} className="text-sm font-black uppercase tracking-widest text-[#FF3A00] border-b-2 border-[#FF3A00] pb-1">
                        Start Shopping
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      {cartItems.map((item, i) => (
                        <div key={i} className="flex gap-4 bg-white p-4 rounded-xl shadow-sm border border-black/5">
                          <div className="w-24 h-24 relative bg-zinc-100 rounded-lg overflow-hidden flex-shrink-0">
                            <Image src={item.image} alt={item.name} fill className="object-cover mix-blend-multiply" />
                          </div>
                          <div className="flex flex-col flex-1 py-1">
                            <div className="flex justify-between items-start mb-1">
                              <h4 className="font-bold text-[#111111] text-sm leading-tight pr-4">{item.name}</h4>
                              <button className="text-zinc-400 hover:text-red-500 transition-colors">
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="text-xs font-bold text-zinc-500 mb-auto">Size: {item.size}</div>
                            <div className="flex justify-between items-end mt-4">
                              <span className="font-black text-lg">${item.price}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {cartItems.length > 0 && (
                  <div className="p-6 bg-white border-t border-black/10 flex-shrink-0">
                    <div className="flex justify-between items-center mb-6">
                      <span className="font-bold uppercase tracking-widest text-sm">Estimated Total</span>
                      <span className="font-black text-2xl">${cartTotal}</span>
                    </div>
                    <button className="w-full py-5 bg-[#FF3A00] text-white text-sm font-black uppercase tracking-widest hover:bg-[#111111] transition-colors cursor-pointer rounded-xl">
                      Proceed to Checkout
                    </button>
                    <div className="mt-4 flex items-center justify-center gap-2 text-xs font-bold text-zinc-500 uppercase tracking-widest">
                      <ShieldCheck className="w-4 h-4 text-[#FF3A00]" /> Authenticity Guaranteed
                    </div>
                  </div>
                )}
              </SheetContent>
            </Sheet>

            {/* Mobile Menu Trigger */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="md:hidden p-2 text-[#111111] cursor-pointer">
                  <Menu className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-white w-[300px]">
                <div className="flex flex-col gap-6 mt-12">
                  <span className="text-3xl font-black tracking-tighter uppercase italic text-[#111111] mb-8">
                    KICKS<span className="text-[#FF3A00]">MKT</span>
                  </span>
                  {NAV_LINKS.map((link) => (
                    <Link 
                      key={link.label} 
                      href={link.href} 
                      className="text-2xl font-black uppercase tracking-tighter text-zinc-800 hover:text-[#FF3A00] transition-colors cursor-pointer"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* ─── 2. HERO PARALLAX (URBAN KINETIC) ─── */}
      <section className="relative pt-20 h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-[#111111]">
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=2000&q=80" 
            alt="Sneaker Culture" 
            fill 
            className="object-cover opacity-40 grayscale mix-blend-luminosity"
            priority
          />
          {/* Halftone / Grid Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#111_100%)] opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-80" />
        </motion.div>

        <motion.div style={{ y: textY }} className="relative z-10 w-full px-6 flex flex-col items-center text-center">
          <Reveal>
            <Badge className="bg-[#FF3A00] text-white border-none mb-8 px-4 py-1.5 rounded-sm font-black uppercase tracking-widest text-[10px]">
              Verified Authentic Market
            </Badge>
          </Reveal>
          
          <Reveal delay={0.1}>
            <h1 className="text-7xl md:text-9xl lg:text-[10rem] font-black italic tracking-tighter text-white mb-6 leading-[0.85] uppercase">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">Secure</span> <br />
              The <span className="text-[#FF3A00]">Grails.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-sm md:text-lg text-zinc-400 font-bold max-w-xl mx-auto mb-10 leading-relaxed uppercase tracking-widest">
              The premier marketplace for verified sneakers, apparel, and collectibles. No fakes. No stress.
            </p>
          </Reveal>

          <Reveal delay={0.3} className="flex flex-col sm:flex-row gap-6">
            <button className="px-12 py-5 bg-[#FF3A00] text-white font-black uppercase tracking-widest text-sm hover:scale-105 transition-transform duration-300 cursor-pointer shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
              Shop New Releases
            </button>
            <button className="px-12 py-5 bg-white text-[#111111] font-black uppercase tracking-widest text-sm hover:scale-105 transition-transform duration-300 cursor-pointer shadow-[8px_8px_0px_0px_rgba(255,58,0,1)]">
              Sell Your Pair
            </button>
          </Reveal>
        </motion.div>
      </section>

      {/* ─── 3. STATS BAR (MARQUEE STYLE) ─── */}
      <section className="py-12 border-b border-black/10 bg-[#FF3A00] relative z-10 overflow-hidden">
        <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite]">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 px-6">
              {STATS.map((stat, j) => (
                <div key={j} className="flex items-center gap-3">
                  <span className="text-3xl font-black italic text-white tracking-tighter">{stat.value}{stat.suffix}</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/80">{stat.label}</span>
                  <Star className="w-4 h-4 text-white/50 ml-6" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ─── 4. FEATURES (CURATED COLLECTIONS) ─── */}
      <section id="releases" className="py-32 relative bg-[#F4F4F4]">
        <div className="max-w-[1600px] mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b-4 border-[#111111] pb-6">
            <Reveal>
              <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter text-[#111111] uppercase">Curated.</h2>
            </Reveal>
            <Reveal>
              <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest max-w-sm text-right">
                Hand-picked collections updated daily.
              </p>
            </Reveal>
          </div>

          <Tabs defaultValue="hype" className="w-full">
            <TabsList className="flex flex-wrap justify-start h-auto bg-transparent gap-4 mb-16 p-0">
              {COLLECTIONS.map((col) => (
                <TabsTrigger 
                  key={col.id} 
                  value={col.id}
                  className="px-6 py-4 text-center data-[state=active]:bg-[#111111] data-[state=active]:text-white text-[#111111] bg-white hover:bg-zinc-200 transition-colors duration-300 cursor-pointer rounded-none border-2 border-[#111111] shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] data-[state=active]:shadow-none data-[state=active]:translate-y-[4px] data-[state=active]:translate-x-[4px]"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-black uppercase tracking-widest">{col.title}</span>
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
                      transition={{ duration: 0.4 }}
                      className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 items-stretch"
                    >
                      <div className="bg-[#111111] p-12 text-white flex flex-col justify-center rounded-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                          {col.icon}
                        </div>
                        <h4 className="text-5xl font-black italic uppercase tracking-tighter mb-6">{col.title}</h4>
                        <p className="text-zinc-400 font-bold leading-relaxed mb-10 text-sm tracking-wide">{col.description}</p>
                        <button className="w-fit bg-[#FF3A00] px-8 py-4 text-xs font-black uppercase tracking-widest hover:bg-white hover:text-[#111111] transition-colors cursor-pointer rounded-full">
                          Shop All
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {col.products.map((prod, i) => (
                          <div key={i} className="bg-white p-6 border-2 border-black/10 rounded-2xl flex flex-col hover:border-[#111111] transition-colors group">
                            <div className="aspect-square relative w-full overflow-hidden bg-zinc-50 rounded-xl mb-6">
                              <Image src={col.image} alt={prod.name} fill className="object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2">{prod.type}</div>
                            <div className="font-bold text-sm mb-auto line-clamp-2">{prod.name}</div>
                            <div className="mt-4 pt-4 border-t border-black/10 flex justify-between items-center">
                              <span className="font-black text-lg">{prod.price}</span>
                              <button className="w-8 h-8 bg-zinc-100 rounded-full flex items-center justify-center group-hover:bg-[#FF3A00] group-hover:text-white transition-colors">
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </TabsContent>
                ))}
              </AnimatePresence>
            </div>
          </Tabs>
        </div>
      </section>

      {/* ─── 5. TESTIMONIALS ─── */}
      <section className="py-32 bg-[#111111] text-white border-y border-white/10 overflow-hidden relative">
        <div className="max-w-[1600px] mx-auto px-6 relative z-10">
          <Reveal>
            <div className="text-center mb-20">
              <h2 className="text-[10px] font-black text-[#FF3A00] mb-4 uppercase tracking-[0.3em]">The Word</h2>
              <h3 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase">Verified Reviews.</h3>
            </div>
          </Reveal>

          <Carousel className="w-full">
            <CarouselContent>
              {TESTIMONIALS.map((testi, i) => (
                <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3 pl-6">
                  <Reveal delay={i * 0.1}>
                    <Card className="bg-[#1A1A1A] border-white/10 hover:border-[#FF3A00] transition-colors duration-300 cursor-pointer h-full rounded-2xl">
                      <CardContent className="p-8 flex flex-col h-full justify-between">
                        <div>
                          <div className="flex gap-1 mb-6">
                            {[...Array(testi.rating)].map((_, j) => (
                              <Star key={j} className="w-4 h-4 fill-[#FF3A00] text-[#FF3A00]" />
                            ))}
                          </div>
                          <p className="text-zinc-300 font-bold leading-relaxed mb-8 text-sm">
                            "{testi.content}"
                          </p>
                        </div>
                        <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                          <Avatar className="w-12 h-12 rounded-full border border-white/20">
                            <AvatarImage src={testi.avatar} />
                            <AvatarFallback>KM</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-black text-xs uppercase tracking-widest text-white">{testi.name}</div>
                            <div className="font-bold text-[10px] uppercase tracking-widest text-[#FF3A00] mt-1">{testi.role}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Reveal>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-6 mt-16">
              <CarouselPrevious className="relative inset-auto translate-y-0 bg-white border-none text-[#111111] hover:bg-[#FF3A00] hover:text-white transition-colors rounded-full" />
              <CarouselNext className="relative inset-auto translate-y-0 bg-white border-none text-[#111111] hover:bg-[#FF3A00] hover:text-white transition-colors rounded-full" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* ─── 6. PRODUCT GRID (LIVE MARKET) ─── */}
      <section id="sneakers" className="py-32 bg-white relative">
        <div className="max-w-[1600px] mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b-4 border-[#111111] pb-6">
            <Reveal>
              <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter text-[#111111] uppercase">Live Market.</h2>
            </Reveal>
            <Reveal>
              <button className="mt-6 md:mt-0 text-sm font-black uppercase tracking-widest text-[#FF3A00] hover:text-[#111111] transition-colors cursor-pointer flex items-center gap-2">
                View All <ArrowRight className="w-4 h-4" />
              </button>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.map((prod, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="bg-[#F4F4F4] p-6 rounded-3xl group relative overflow-hidden border-2 border-transparent hover:border-[#111111] transition-colors">
                  {prod.tag && (
                    <div className="absolute top-6 left-6 z-10 bg-[#FF3A00] text-white px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg">
                      {prod.tag}
                    </div>
                  )}
                  <div className="aspect-square relative w-full overflow-hidden rounded-2xl mb-6 bg-white">
                    <Image src={prod.image} alt={prod.name} fill className="object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">{prod.category}</div>
                      <h4 className="font-bold text-[#111111] text-sm leading-tight pr-4">{prod.name}</h4>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between border-t border-black/10 pt-4">
                    <span className="font-black text-xl">${prod.price}</span>
                    <button 
                      onClick={() => setCartOpen(true)}
                      className="px-4 py-2 bg-[#111111] text-white text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-[#FF3A00] transition-colors"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7. FAQ ACCORDION ─── */}
      <section className="py-32 bg-[#F4F4F4] border-t-2 border-black/10">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-[10px] font-black text-[#FF3A00] mb-4 uppercase tracking-[0.3em]">Knowledge Base</h2>
              <h3 className="text-5xl font-black italic uppercase tracking-tighter text-[#111111]">How it Works.</h3>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-black/10">
                  <AccordionTrigger className="text-left text-[#111111] hover:text-[#FF3A00] hover:no-underline font-black text-lg py-6 transition-colors uppercase">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-zinc-600 font-bold leading-relaxed pb-6 text-sm">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* ─── 8. CTA BANNER (APP DOWNLOAD) ─── */}
      <section className="py-24 px-6 relative z-10 bg-white">
        <Reveal>
          <div className="max-w-[1600px] mx-auto bg-[#FF3A00] rounded-3xl p-16 md:p-24 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552346154-21d32810baa3?w=1600&q=80')] bg-cover bg-center opacity-10 mix-blend-multiply" />
            
            <div className="relative z-10 flex flex-col items-center">
              <h2 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter text-white mb-6">Cop on the go.</h2>
              <p className="text-white/90 font-bold mb-12 text-sm md:text-lg max-w-xl mx-auto uppercase tracking-widest">
                Download the Kicks Market app to set release reminders, place instant bids, and track your portfolio from anywhere.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-10 py-5 bg-[#111111] text-white text-xs font-black uppercase tracking-widest hover:bg-white hover:text-[#111111] transition-colors duration-300 cursor-pointer rounded-full shadow-2xl">
                  Download for iOS
                </button>
                <button className="px-10 py-5 bg-white text-[#111111] text-xs font-black uppercase tracking-widest hover:bg-zinc-200 transition-colors duration-300 cursor-pointer rounded-full shadow-2xl">
                  Download for Android
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ─── 9. FOOTER ─── */}
      <footer className="bg-[#111111] text-white pt-24 pb-12">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20 border-b border-white/10 pb-16">
            <div>
              <Link href="/" className="inline-block mb-8 cursor-pointer">
                <span className="text-4xl font-black tracking-tighter uppercase italic text-white">
                  KICKS<span className="text-[#FF3A00]">MKT</span>
                </span>
              </Link>
              <p className="text-zinc-400 font-bold text-sm leading-relaxed mb-8 max-w-sm">
                The global marketplace for authenticated sneakers, streetwear, and collectibles. Buy and sell with total confidence.
              </p>
            </div>

            <div>
              <h4 className="text-white font-black uppercase tracking-[0.2em] text-[10px] mb-6">Marketplace</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-zinc-400 hover:text-[#FF3A00] transition-colors text-xs font-bold uppercase tracking-widest cursor-pointer">Sneakers</a></li>
                <li><a href="#" className="text-zinc-400 hover:text-[#FF3A00] transition-colors text-xs font-bold uppercase tracking-widest cursor-pointer">Apparel</a></li>
                <li><a href="#" className="text-zinc-400 hover:text-[#FF3A00] transition-colors text-xs font-bold uppercase tracking-widest cursor-pointer">Collectibles</a></li>
                <li><a href="#" className="text-zinc-400 hover:text-[#FF3A00] transition-colors text-xs font-bold uppercase tracking-widest cursor-pointer">Release Calendar</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-black uppercase tracking-[0.2em] text-[10px] mb-6">Support</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-zinc-400 hover:text-[#FF3A00] transition-colors text-xs font-bold uppercase tracking-widest cursor-pointer">Help Center</a></li>
                <li><a href="#" className="text-zinc-400 hover:text-[#FF3A00] transition-colors text-xs font-bold uppercase tracking-widest cursor-pointer">Authentication Process</a></li>
                <li><a href="#" className="text-zinc-400 hover:text-[#FF3A00] transition-colors text-xs font-bold uppercase tracking-widest cursor-pointer">Shipping Rates</a></li>
                <li><a href="#" className="text-zinc-400 hover:text-[#FF3A00] transition-colors text-xs font-bold uppercase tracking-widest cursor-pointer">Selling Guide</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-black uppercase tracking-[0.2em] text-[10px] mb-6">Company</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-zinc-400 hover:text-[#FF3A00] transition-colors text-xs font-bold uppercase tracking-widest cursor-pointer">About Us</a></li>
                <li><a href="#" className="text-zinc-400 hover:text-[#FF3A00] transition-colors text-xs font-bold uppercase tracking-widest cursor-pointer">Careers</a></li>
                <li><a href="#" className="text-zinc-400 hover:text-[#FF3A00] transition-colors text-xs font-bold uppercase tracking-widest cursor-pointer">Press</a></li>
                <li><a href="#" className="text-zinc-400 hover:text-[#FF3A00] transition-colors text-xs font-bold uppercase tracking-widest cursor-pointer">Drop-off Locations</a></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">
            <p>&copy; 2026 KICKS MARKET INC. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors cursor-pointer">Terms</a>
              <a href="#" className="hover:text-white transition-colors cursor-pointer">Privacy</a>
              <a href="#" className="hover:text-white transition-colors cursor-pointer">Do Not Sell My Info</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}
