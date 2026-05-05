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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Play, Menu, ArrowRight, Star, ChevronRight, CheckCircle2, Building2, Scale, Briefcase, Landmark, ShieldCheck, Mail } from "lucide-react"

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
  { label: "Expertise", href: "#expertise" },
  { label: "Partners", href: "#partners" },
  { label: "Insights", href: "#insights" },
  { label: "Offices", href: "#offices" },
]

const STATS = [
  { value: "12", label: "Billion in M&A Handled", suffix: "B" },
  { value: "45", label: "Partners Worldwide", suffix: "" },
  { value: "98", label: "Trial Success Rate", suffix: "%" },
  { value: "1924", label: "Year Established", suffix: "" },
  { value: "Fortune 500", label: "Trusted Advisors To", suffix: "" },
]

const FEATURES = [
  {
    id: "corporate",
    title: "Corporate & M&A",
    icon: <Building2 className="w-5 h-5" />,
    description: "We navigate complex cross-border transactions, joint ventures, and corporate restructuring for multinational entities with surgical precision.",
    bullets: [
      "Mergers & Acquisitions",
      "Private Equity Transactions",
      "Corporate Governance",
      "Capital Markets"
    ],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80"
  },
  {
    id: "litigation",
    title: "Complex Litigation",
    icon: <Scale className="w-5 h-5" />,
    description: "Our trial lawyers represent corporations and executives in high-stakes commercial disputes, white-collar defense, and regulatory investigations.",
    bullets: [
      "Commercial Disputes",
      "White Collar Defense",
      "Antitrust Litigation",
      "International Arbitration"
    ],
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&q=80"
  },
  {
    id: "realestate",
    title: "Real Estate",
    icon: <Landmark className="w-5 h-5" />,
    description: "Advising developers, REITs, and institutional investors on the acquisition, financing, and development of major commercial properties globally.",
    bullets: [
      "Commercial Development",
      "REIT Formation & Compliance",
      "Zoning & Land Use",
      "Portfolio Acquisitions"
    ],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
  }
]

const TESTIMONIALS = [
  {
    name: "Jonathan Hayes",
    role: "CEO, Vertex Holdings",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    content: "Sterling Partners executed our $2.4B acquisition with a level of foresight and strategic acumen that I have not seen from any other firm on Wall Street.",
    rating: 5
  },
  {
    name: "Eleanor Vance",
    role: "General Counsel, Nexus Tech",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    content: "When facing a bet-the-company antitrust litigation, there is no other firm I would rather have in our corner. Their litigation department is simply unparalleled.",
    rating: 5
  },
  {
    name: "Marcus Chen",
    role: "Managing Partner, Alpine Capital",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    content: "Their Private Equity team doesn't just understand the law; they understand the underlying economics of the deal. They are true strategic advisors.",
    rating: 5
  },
  {
    name: "Sarah Jenkins",
    role: "Founder, Zenith Real Estate",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    content: "From zoning approvals in Manhattan to complex mezzanine financing structures, Sterling has been instrumental in the growth of our commercial portfolio.",
    rating: 5
  }
]

const PRICING = [
  {
    id: "advisory",
    title: "Strategic Advisory",
    subtitle: "Retained Counsel",
    price: "Custom",
    duration: "Monthly Retainer",
    description: "Ongoing legal and strategic counsel for executives and boards, acting as outside general counsel for mid-market and enterprise firms.",
    features: [
      "Dedicated relationship partner",
      "Priority response SLA",
      "Board meeting attendance",
      "Routine contract review",
      "Regulatory compliance monitoring"
    ],
    recommended: false
  },
  {
    id: "transactional",
    title: "Transactional",
    subtitle: "Project-Based",
    price: "Tiered",
    duration: "Per Deal Value",
    description: "End-to-end legal representation for specific corporate transactions, mergers, acquisitions, and major financing rounds.",
    features: [
      "Comprehensive due diligence",
      "Deal structuring & negotiation",
      "Tax optimization strategy",
      "Regulatory filing (HSR, SEC)",
      "Post-merger integration counsel"
    ],
    recommended: true
  },
  {
    id: "litigation",
    title: "Litigation & Defense",
    subtitle: "Hourly / Contingent",
    price: "Hourly",
    duration: "Blended Rates",
    description: "Aggressive, trial-ready representation for commercial disputes, intellectual property defense, and regulatory investigations.",
    features: [
      "Early case assessment",
      "E-discovery management",
      "Deposition & motion practice",
      "Alternative dispute resolution",
      "Appellate litigation"
    ],
    recommended: false
  }
]

const FAQS = [
  {
    question: "In which jurisdictions are your attorneys licensed to practice?",
    answer: "Our attorneys hold admissions in major US jurisdictions including New York, Delaware, California, and Washington D.C., as well as international admissions in London and Hong Kong."
  },
  {
    question: "How do you structure your fees for corporate transactions?",
    answer: "For major transactions, we typically utilize a blended rate structure or fixed-fee arrangements based on deal milestones to provide budget predictability for our corporate clients."
  },
  {
    question: "Do you represent startups and emerging companies?",
    answer: "Yes. Through our Emerging Companies Practice Group, we advise high-growth startups on formation, venture capital financing, and IP protection, often utilizing deferred fee structures."
  },
  {
    question: "How do you handle conflicts of interest?",
    answer: "We maintain a rigorous, automated conflict-checking system. Before accepting any engagement, a dedicated ethics committee reviews potential conflicts across our global offices."
  },
  {
    question: "Who will be handling my case or transaction?",
    answer: "Every matter is led by a Senior Partner who remains your primary point of contact. They are supported by a tailored team of associates and paralegals optimized for efficiency and expertise."
  },
  {
    question: "Does your firm handle personal injury or family law?",
    answer: "No. Sterling Partners is strictly a corporate and commercial law firm. We do not handle retail legal matters, personal injury, family law, or standard residential real estate."
  },
  {
    question: "How is data security managed during due diligence?",
    answer: "We utilize SOC 2 Type II compliant virtual data rooms (VDRs) and employ bank-level encryption for all client communications to ensure absolute confidentiality and data security."
  },
  {
    question: "Do you offer alternative fee arrangements (AFAs)?",
    answer: "Yes, we frequently partner with clients to develop AFAs, including flat fees for specific phases of litigation, success fees, and volume discounts for portfolio work, aligning our incentives with your success."
  },
  {
    question: "How can we schedule an initial consultation?",
    answer: "Initial consultations with our Partners can be arranged through our Executive Client Services team via phone or by submitting a confidential inquiry through our secure portal."
  }
]

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────
export default function SterlingPartnersTemplate() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  
  // Parallax Values
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"])

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0A0B0E] text-[#F3F4F6] font-serif selection:bg-[#BFA15F] selection:text-[#0A0B0E]" style={{ overflowX: "hidden", scrollBehavior: "smooth" }}>
      
      {/* ─── 1. NAVBAR (AUTHORITATIVE DARK) ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0B0E]/90 backdrop-blur-md border-b border-white/10 transition-all duration-300">
        <div className="max-w-[1400px] mx-auto px-6 h-24 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4 group cursor-pointer">
            <div className="w-10 h-10 border border-[#BFA15F] flex items-center justify-center">
              <span className="text-xl font-bold text-[#BFA15F] font-sans">S</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-medium tracking-[0.1em] uppercase text-white leading-tight">
                Sterling
              </span>
              <span className="text-[10px] font-sans font-bold tracking-[0.3em] uppercase text-[#BFA15F] leading-tight">
                Partners
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.label} 
                href={link.href} 
                className="text-xs font-sans font-bold tracking-[0.2em] uppercase text-zinc-400 hover:text-[#BFA15F] transition-colors duration-300 cursor-pointer"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center">
            <button className="px-8 py-3 bg-[#BFA15F] text-[#0A0B0E] font-sans text-xs font-bold tracking-[0.2em] uppercase hover:bg-white transition-colors duration-300 cursor-pointer">
              Client Portal
            </button>
          </div>

          {/* Mobile Nav */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="md:hidden p-2 text-white cursor-pointer">
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#0A0B0E] border-l border-white/10 text-white w-full sm:w-[400px]">
              <div className="flex flex-col gap-8 mt-16">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 border border-[#BFA15F] flex items-center justify-center">
                    <span className="text-xl font-bold text-[#BFA15F] font-sans">S</span>
                  </div>
                  <span className="text-xl font-medium tracking-[0.1em] uppercase text-white">Sterling Partners</span>
                </div>
                {NAV_LINKS.map((link) => (
                  <Link 
                    key={link.label} 
                    href={link.href} 
                    className="text-lg font-sans font-bold tracking-[0.2em] uppercase text-zinc-400 hover:text-[#BFA15F] transition-colors cursor-pointer"
                  >
                    {link.label}
                  </Link>
                ))}
                <button className="mt-8 py-4 bg-[#BFA15F] text-[#0A0B0E] font-sans text-xs font-bold tracking-[0.2em] uppercase cursor-pointer">
                  Client Portal
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* ─── 2. HERO PARALLAX (CORPORATE / LAW) ─── */}
      <section className="relative h-[100vh] flex items-center justify-center overflow-hidden bg-[#0A0B0E]">
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=2000&q=80" 
            alt="Corporate Boardroom" 
            fill 
            className="object-cover opacity-40 mix-blend-luminosity"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B0E] via-[#0A0B0E]/60 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0A0B0E_100%)] opacity-80" />
        </motion.div>

        <motion.div style={{ y: textY }} className="relative z-10 w-full px-6 flex flex-col items-center text-center mt-20">
          <Reveal>
            <Badge className="bg-transparent text-[#BFA15F] border border-[#BFA15F]/30 mb-8 px-4 py-1.5 rounded-none font-sans text-[10px] font-bold uppercase tracking-[0.3em]">
              Established 1924 • New York
            </Badge>
          </Reveal>
          
          <Reveal delay={0.1}>
            <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-light tracking-tight text-white mb-8 leading-[1]">
              Clarity in <br />
              <span className="italic text-[#BFA15F]">complexity.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-lg md:text-xl text-zinc-400 font-sans font-medium max-w-2xl mx-auto mb-12 leading-relaxed">
              Sterling Partners is a premier global law firm advising the world's most innovative companies and financial institutions on their most critical legal challenges.
            </p>
          </Reveal>

          <Reveal delay={0.3} className="flex flex-col sm:flex-row gap-6">
            <button className="px-10 py-5 bg-[#BFA15F] text-[#0A0B0E] font-sans font-bold uppercase tracking-[0.2em] text-xs hover:bg-white transition-colors duration-300 cursor-pointer">
              Our Practice Areas
            </button>
            <button className="px-10 py-5 bg-transparent border border-white/20 text-white font-sans font-bold uppercase tracking-[0.2em] text-xs hover:border-white transition-colors duration-300 cursor-pointer">
              Meet the Partners
            </button>
          </Reveal>
        </motion.div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-50">
          <span className="text-[9px] font-sans font-bold uppercase tracking-[0.4em] text-white mb-4">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#BFA15F] to-transparent" />
        </div>
      </section>

      {/* ─── 3. STATS BAR (AUTHORITATIVE) ─── */}
      <section className="py-24 border-y border-white/10 bg-[#0F1115] relative z-10">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12 md:gap-4 divide-x-0 md:divide-x divide-white/10">
            {STATS.map((stat, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="flex flex-col items-center text-center">
                  <div className="text-4xl lg:text-5xl font-light text-white mb-4">
                    {stat.value}<span className="text-[#BFA15F] text-3xl ml-1 font-sans font-bold">{stat.suffix}</span>
                  </div>
                  <div className="text-[9px] text-zinc-500 font-sans font-bold uppercase tracking-[0.3em]">
                    {stat.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. FEATURES (PRACTICE AREAS TABS) ─── */}
      <section id="expertise" className="py-32 relative bg-[#0A0B0E]">
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-24 border-b border-white/10 pb-12">
            <Reveal className="max-w-2xl">
              <h2 className="text-[10px] font-sans font-bold text-[#BFA15F] mb-6 uppercase tracking-[0.3em]">Practice Areas</h2>
              <h3 className="text-5xl md:text-6xl font-light text-white leading-tight">Global reach.<br/><span className="italic text-zinc-400">Surgical precision.</span></h3>
            </Reveal>
            <Reveal delay={0.2} className="mt-8 lg:mt-0">
              <p className="text-zinc-400 font-sans text-sm max-w-sm leading-relaxed">
                We organize our expertise to match the complexities of the global market, ensuring cross-disciplinary excellence on every matter.
              </p>
            </Reveal>
          </div>

          <Tabs defaultValue="corporate" className="w-full">
            <div className="flex flex-col lg:flex-row gap-16">
              <div className="lg:w-1/3">
                <TabsList className="flex flex-col h-auto bg-transparent gap-2 items-stretch">
                  {FEATURES.map((feature) => (
                    <TabsTrigger 
                      key={feature.id} 
                      value={feature.id}
                      className="justify-start px-8 py-6 text-left data-[state=active]:bg-white/5 data-[state=active]:text-white text-zinc-500 hover:text-white transition-all duration-300 cursor-pointer rounded-none border-l-2 border-transparent data-[state=active]:border-[#BFA15F]"
                    >
                      <div className="flex items-center gap-6">
                        <div className="text-[#BFA15F]">{feature.icon}</div>
                        <span className="text-sm font-sans font-bold uppercase tracking-[0.1em]">{feature.title}</span>
                      </div>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <div className="lg:w-2/3">
                <AnimatePresence mode="wait">
                  {FEATURES.map((feature) => (
                    <TabsContent key={feature.id} value={feature.id} className="mt-0 outline-none">
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.5 }}
                        className="group"
                      >
                        <div className="aspect-[21/9] relative w-full overflow-hidden mb-12 bg-[#0F1115]">
                          <Image src={feature.image} alt={feature.title} fill className="object-cover opacity-70 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                        </div>
                        
                        <div className="max-w-2xl">
                          <h4 className="text-3xl font-light text-white mb-6 font-serif">{feature.title}</h4>
                          <p className="text-zinc-400 font-sans leading-relaxed mb-10 text-base">{feature.description}</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                            {feature.bullets.map((bullet, i) => (
                              <div key={i} className="flex items-start gap-4">
                                <div className="w-1.5 h-1.5 bg-[#BFA15F] mt-2 shrink-0" />
                                <span className="text-sm font-sans text-zinc-300 font-medium">{bullet}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </TabsContent>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </Tabs>
        </div>
      </section>

      {/* ─── 5. TESTIMONIALS (CEOs / CLIENTS) ─── */}
      <section className="py-32 bg-[#0F1115] border-y border-white/10 overflow-hidden relative">
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <Reveal>
            <div className="text-center mb-20">
              <h2 className="text-[10px] font-sans font-bold text-[#BFA15F] mb-6 uppercase tracking-[0.3em]">Client Endorsements</h2>
              <h3 className="text-4xl md:text-5xl font-light text-white">Trusted by Leaders.</h3>
            </div>
          </Reveal>

          <Carousel className="w-full">
            <CarouselContent>
              {TESTIMONIALS.map((testi, i) => (
                <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/2 pl-8">
                  <Reveal delay={i * 0.1}>
                    <Card className="bg-[#0A0B0E] border-white/5 hover:border-[#BFA15F]/30 transition-colors duration-500 cursor-pointer h-full rounded-none">
                      <CardContent className="p-12 flex flex-col h-full justify-between">
                        <div>
                          <p className="text-xl md:text-2xl font-light leading-relaxed mb-12 text-zinc-300 italic">
                            "{testi.content}"
                          </p>
                        </div>
                        <div className="flex items-center gap-6 pt-8 border-t border-white/10">
                          <Avatar className="w-14 h-14 rounded-none border border-white/20">
                            <AvatarImage src={testi.avatar} className="grayscale" />
                            <AvatarFallback>SP</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-sans font-bold text-sm uppercase tracking-widest mb-1 text-white">{testi.name}</div>
                            <div className="font-sans font-medium text-[10px] uppercase tracking-[0.2em] text-[#BFA15F]">{testi.role}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Reveal>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-6 mt-16">
              <CarouselPrevious className="relative inset-auto translate-y-0 bg-transparent text-white border-white/20 hover:bg-white hover:text-black rounded-none transition-colors" />
              <CarouselNext className="relative inset-auto translate-y-0 bg-transparent text-white border-white/20 hover:bg-white hover:text-black rounded-none transition-colors" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* ─── 6. PRICING / ENGAGEMENT MODELS ─── */}
      <section id="services" className="py-32 bg-[#0A0B0E] relative">
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <Reveal>
              <h2 className="text-[10px] font-sans font-bold text-[#BFA15F] mb-6 uppercase tracking-[0.3em]">Engagement</h2>
              <h3 className="text-4xl md:text-5xl font-light text-white mb-6">Structuring Partnerships.</h3>
              <p className="text-sm font-sans font-medium text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                We align our fee structures with our clients' business objectives, offering predictable and value-driven engagement models.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {PRICING.map((tier, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <Card className={`relative bg-[#0F1115] border ${tier.recommended ? 'border-[#BFA15F]' : 'border-white/10'} rounded-none transition-all duration-500 hover:border-white/30 group`}>
                  {tier.recommended && (
                    <div className="absolute top-0 inset-x-0 bg-[#BFA15F] text-[#0A0B0E] text-[9px] font-sans font-bold uppercase tracking-[0.3em] text-center py-2">
                      Primary Model
                    </div>
                  )}
                  <CardContent className={`p-10 md:p-12 ${tier.recommended ? 'pt-14' : ''}`}>
                    <h4 className="text-2xl font-light mb-2 text-white">{tier.title}</h4>
                    <div className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-[#BFA15F] mb-8">{tier.subtitle}</div>
                    
                    <div className="flex items-end gap-2 mb-8 border-b border-white/10 pb-8">
                      <span className="text-4xl font-light text-white">{tier.price}</span>
                      <span className="text-[10px] font-sans text-zinc-500 uppercase tracking-widest mb-1">{tier.duration}</span>
                    </div>

                    <p className="text-sm font-sans text-zinc-400 mb-10 h-20 leading-relaxed">{tier.description}</p>
                    
                    <ul className="space-y-5 mb-12">
                      {tier.features.map((feat, j) => (
                        <li key={j} className="flex items-start gap-4 text-xs font-sans font-medium text-zinc-300">
                          <CheckCircle2 className="w-4 h-4 text-[#BFA15F] shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    <button className={`w-full py-4 text-[10px] font-sans font-bold uppercase tracking-[0.3em] transition-all duration-300 border ${tier.recommended ? 'bg-white text-[#0A0B0E] border-white hover:bg-transparent hover:text-white' : 'bg-transparent text-white border-white/30 hover:border-white'}`}>
                      Inquire
                    </button>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7. FAQ ACCORDION ─── */}
      <section className="bg-[#0F1115] border-y border-white/10 py-32">
        <div className="max-w-[900px] mx-auto px-6">
          <Reveal>
            <div className="text-center mb-20">
              <h2 className="text-[10px] font-sans font-bold text-[#BFA15F] mb-6 uppercase tracking-[0.3em]">Information</h2>
              <h3 className="text-4xl font-light text-white">Client Inquiries.</h3>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-white/10">
                  <AccordionTrigger className="text-left font-serif text-xl hover:no-underline py-8 hover:text-[#BFA15F] transition-colors text-white">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm font-sans font-medium leading-relaxed pb-8 text-zinc-400">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* ─── 8. CTA BANNER ─── */}
      <section className="bg-[#0A0B0E]">
        <Reveal>
          <div className="relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80')] bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-1000 grayscale" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B0E] to-[#0A0B0E]/50" />
            
            <div className="relative z-10 p-20 md:p-40 text-center max-w-4xl mx-auto">
              <Briefcase className="w-12 h-12 text-[#BFA15F] mx-auto mb-10" />
              <h2 className="text-4xl md:text-6xl font-light text-white mb-8 leading-tight">Secure your strategic advantage.</h2>
              <p className="text-zinc-400 font-sans text-sm md:text-base leading-relaxed mb-12 max-w-2xl mx-auto">
                Connect with our Executive Client Services team to arrange a confidential consultation with a Senior Partner regarding your legal needs.
              </p>
              <button className="px-12 py-5 bg-[#BFA15F] text-[#0A0B0E] font-sans text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-white transition-colors duration-300 cursor-pointer">
                Contact the Firm
              </button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ─── 9. FOOTER ─── */}
      <footer className="bg-[#0A0B0E] text-white pt-24 pb-12 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24 border-b border-white/10 pb-16">
            <div>
              <Link href="/" className="inline-block mb-8 cursor-pointer">
                <div className="flex flex-col">
                  <span className="text-xl font-medium tracking-[0.1em] uppercase text-white leading-tight">
                    Sterling
                  </span>
                  <span className="text-[10px] font-sans font-bold tracking-[0.3em] uppercase text-[#BFA15F] leading-tight">
                    Partners
                  </span>
                </div>
              </Link>
              <p className="text-xs font-sans font-medium text-zinc-500 leading-relaxed max-w-sm">
                A premier global law firm dedicated to providing strategic, high-stakes legal counsel to the world's leading corporations and financial institutions.
              </p>
            </div>

            <div>
              <h4 className="font-sans font-bold uppercase tracking-[0.3em] text-[9px] mb-8 text-[#BFA15F]">Global Offices</h4>
              <ul className="space-y-6">
                <li className="text-xs font-sans font-medium text-zinc-400 leading-relaxed">
                  <span className="text-white block mb-1 font-bold tracking-widest uppercase">New York (HQ)</span>
                  1 Vanderbilt Ave, NY 10017
                </li>
                <li className="text-xs font-sans font-medium text-zinc-400 leading-relaxed">
                  <span className="text-white block mb-1 font-bold tracking-widest uppercase">London</span>
                  100 Bishopsgate, EC2M 1GT
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-sans font-bold uppercase tracking-[0.3em] text-[9px] mb-8 text-[#BFA15F]">Practice Areas</h4>
              <ul className="space-y-4">
                <li><a href="#" className="font-sans font-bold text-[10px] hover:text-white text-zinc-400 transition-colors uppercase tracking-[0.15em] cursor-pointer">Corporate & M&A</a></li>
                <li><a href="#" className="font-sans font-bold text-[10px] hover:text-white text-zinc-400 transition-colors uppercase tracking-[0.15em] cursor-pointer">Private Equity</a></li>
                <li><a href="#" className="font-sans font-bold text-[10px] hover:text-white text-zinc-400 transition-colors uppercase tracking-[0.15em] cursor-pointer">Complex Litigation</a></li>
                <li><a href="#" className="font-sans font-bold text-[10px] hover:text-white text-zinc-400 transition-colors uppercase tracking-[0.15em] cursor-pointer">Real Estate</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-sans font-bold uppercase tracking-[0.3em] text-[9px] mb-8 text-[#BFA15F]">Contact</h4>
              <ul className="space-y-6 font-sans font-bold text-[10px] text-zinc-400 uppercase tracking-widest">
                <li>
                  <span className="text-white block mb-1 text-[9px] text-[#BFA15F]">New Inquiries</span>
                  inquiries@sterling.law
                </li>
                <li>
                  <span className="text-white block mb-1 text-[9px] text-[#BFA15F]">Press</span>
                  media@sterling.law
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8 font-sans font-bold uppercase tracking-[0.2em] text-[9px] text-zinc-600">
            <p>&copy; 2026 STERLING PARTNERS LLP. ATTORNEY ADVERTISING.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors cursor-pointer">Disclaimer</a>
              <a href="#" className="hover:text-white transition-colors cursor-pointer">Privacy Notice</a>
              <a href="#" className="hover:text-white transition-colors cursor-pointer">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}
