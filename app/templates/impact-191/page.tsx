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
import { Play, Menu, ArrowRight, Star, CheckCircle2, HeartPulse, Stethoscope, Microscope, ShieldCheck, Clock, MapPin, Phone, CalendarDays } from "lucide-react"

// ─── REVEAL COMPONENT ────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number, className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── DATA ────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Treatments", href: "#treatments" },
  { label: "Our Doctors", href: "#doctors" },
  { label: "Facilities", href: "#facilities" },
  { label: "Reviews", href: "#reviews" },
]

const STATS = [
  { value: "15", label: "Years Experience", suffix: "+" },
  { value: "50", label: "Medical Specialists", suffix: "+" },
  { value: "100", label: "Happy Patients", suffix: "k" },
  { value: "4.9", label: "Average Rating", suffix: "/5" },
  { value: "24/7", label: "Emergency Care", suffix: "" },
]

const FEATURES = [
  {
    id: "aesthetics",
    title: "Advanced Aesthetics",
    icon: <HeartPulse className="w-5 h-5" />,
    description: "State-of-the-art non-surgical procedures utilizing FDA-approved technology to enhance your natural beauty with minimal downtime.",
    bullets: [
      "Morpheus8 RF Microneedling",
      "Laser Skin Resurfacing",
      "Dermal Fillers & Botox",
      "Platelet-Rich Plasma (PRP)"
    ],
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80"
  },
  {
    id: "dental",
    title: "Cosmetic Dentistry",
    icon: <Stethoscope className="w-5 h-5" />,
    description: "Transform your smile with our master ceramists and orthodontists. We specialize in minimally invasive veneer placement and invisible aligners.",
    bullets: [
      "Porcelain Veneers (E-Max)",
      "Invisalign Clear Aligners",
      "Laser Teeth Whitening",
      "Digital Smile Design"
    ],
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80"
  },
  {
    id: "dermatology",
    title: "Clinical Dermatology",
    icon: <Microscope className="w-5 h-5" />,
    description: "Comprehensive medical dermatology focused on skin health, mole mapping, acne treatment, and advanced scar revision protocols.",
    bullets: [
      "Advanced Mole Mapping",
      "Acne & Rosacea Protocols",
      "Scar Revision Surgery",
      "Skin Cancer Screenings"
    ],
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80"
  }
]

const TESTIMONIALS = [
  {
    name: "Sarah Jenkins",
    role: "Aesthetics Patient",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    content: "The level of care at Nova Clinic is unmatched. Dr. Chen took the time to explain every step of the Morpheus8 procedure. The results look completely natural.",
    rating: 5
  },
  {
    name: "David M.",
    role: "Dental Patient",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    content: "I had terrible dental anxiety for years. The environment here feels more like a luxury spa than a clinic, and the veneers completely changed my confidence.",
    rating: 5
  },
  {
    name: "Elena R.",
    role: "Dermatology Patient",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    content: "After struggling with adult acne for a decade, the specialized laser protocol at Nova cleared my skin in 3 months. Their approach is highly scientific.",
    rating: 5
  },
  {
    name: "Michael T.",
    role: "Wellness Patient",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    content: "The annual executive health screening was incredibly thorough. Receiving same-day results and a customized health roadmap is exactly what I needed.",
    rating: 5
  }
]

const PRICING = [
  {
    id: "consultation",
    title: "Initial Consultation",
    subtitle: "Comprehensive Assessment",
    price: "$150",
    duration: "Per Visit",
    description: "A full 45-minute deep dive into your health goals with a board-certified specialist. The fee is fully redeemable against any treatment booked.",
    features: [
      "45-minute specialist consultation",
      "3D facial or dental scanning",
      "Customized treatment roadmap",
      "Medical history review",
      "Fee redeemable against treatments"
    ],
    recommended: false
  },
  {
    id: "signature",
    title: "Nova Signature Glow",
    subtitle: "Most Popular Treatment",
    price: "$850",
    duration: "Per Session",
    description: "Our proprietary combination of light chemical peeling, laser genesis, and PRP to radically improve skin texture and tone in a single session.",
    features: [
      "Medical-grade chemical peel",
      "Laser genesis collagen stimulation",
      "PRP (Platelet-Rich Plasma) therapy",
      "LED light therapy recovery",
      "Post-care product kit included"
    ],
    recommended: true
  },
  {
    id: "executive",
    title: "Executive Health",
    subtitle: "Annual Screening",
    price: "$2,500",
    duration: "Annual",
    description: "A comprehensive half-day proactive health assessment including advanced blood panels, full-body MRI, and cardiovascular stress testing.",
    features: [
      "Full-body MRI scan",
      "Advanced 50+ biomarker blood panel",
      "Cardiovascular stress testing",
      "Genetic predisposition screening",
      "Same-day consultation & results"
    ],
    recommended: false
  }
]

const FAQS = [
  {
    question: "Do you accept health insurance?",
    answer: "Nova Clinic is an out-of-network provider. While we do not bill insurance directly, we provide a detailed 'superbill' that you can submit to your insurance company for potential reimbursement on medically necessary procedures."
  },
  {
    question: "Are your consultations really redeemable?",
    answer: "Yes, the $150 consultation fee is fully credited toward any treatment or procedure you book within 30 days of your initial visit."
  },
  {
    question: "How long is the waitlist for an appointment?",
    answer: "For new patient consultations, the typical wait time is 1-2 weeks. However, we keep dedicated slots open daily for acute dermatological or dental emergencies."
  },
  {
    question: "What qualifications do your practitioners have?",
    answer: "All our treatments are performed exclusively by Board-Certified Dermatologists, Plastic Surgeons, or specialized Registered Nurses. We never use estheticians for medical-grade procedures."
  },
  {
    question: "Is there downtime after aesthetic procedures?",
    answer: "It depends on the specific treatment. Injectables usually have zero downtime. Laser resurfacing or Morpheus8 typically require 2-4 days of social downtime. Your practitioner will explain this clearly during consultation."
  },
  {
    question: "Do you offer payment plans?",
    answer: "Yes, we partner with CareCredit and PatientFi to offer 0% interest financing for up to 12 months on all procedures over $1,000."
  },
  {
    question: "Where are you located?",
    answer: "Our flagship clinic is located in the Medical Arts Building downtown. We offer complimentary valet parking for all patients in the underground garage."
  },
  {
    question: "Can I do multiple treatments in one day?",
    answer: "Absolutely. We specialize in 'stacking' treatments (e.g., Botox and Laser Genesis) to maximize your results while minimizing the number of visits and total recovery time."
  }
]

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────
export default function NovaClinicTemplate() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  
  // Parallax Values
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"])

  return (
    <div ref={containerRef} className="min-h-screen bg-[#FDFDFD] text-[#111827] font-sans selection:bg-[#0EA5E9] selection:text-white" style={{ overflowX: "hidden", scrollBehavior: "smooth" }}>
      
      {/* ─── 1. NAVBAR (CLEAN & TRUSTWORTHY) ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-zinc-200 transition-all duration-300">
        <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-[#0EA5E9] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-[#111827]">
              Nova Clinic<span className="text-[#0EA5E9]">.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.label} 
                href={link.href} 
                className="text-sm font-semibold text-zinc-500 hover:text-[#0EA5E9] transition-colors duration-200 cursor-pointer"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button className="text-sm font-bold text-zinc-500 hover:text-[#111827] transition-colors cursor-pointer flex items-center gap-2">
              <Phone className="w-4 h-4" /> 1-800-NOVA
            </button>
            <button className="px-6 py-2.5 bg-[#0EA5E9] text-white text-sm font-bold rounded-full hover:bg-[#0284C7] transition-all duration-300 shadow-[0_4px_14px_0_rgba(14,165,233,0.39)] hover:shadow-[0_6px_20px_rgba(14,165,233,0.23)] hover:-translate-y-0.5 cursor-pointer flex items-center gap-2">
              <CalendarDays className="w-4 h-4" /> Book Consultation
            </button>
          </div>

          {/* Mobile Nav */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="md:hidden p-2 text-zinc-500 cursor-pointer">
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-white border-l border-zinc-200 text-[#111827] w-full sm:w-[400px]">
              <div className="flex flex-col gap-6 mt-12">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-[#0EA5E9] flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold tracking-tight">Nova Clinic.</span>
                </div>
                {NAV_LINKS.map((link) => (
                  <Link 
                    key={link.label} 
                    href={link.href} 
                    className="text-lg font-semibold text-zinc-600 hover:text-[#0EA5E9] transition-colors cursor-pointer"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-8 pt-8 border-t border-zinc-100 flex flex-col gap-4">
                  <button className="w-full py-4 border border-zinc-200 text-[#111827] text-sm font-bold rounded-xl cursor-pointer flex justify-center items-center gap-2">
                    <Phone className="w-4 h-4" /> Call Us
                  </button>
                  <button className="w-full py-4 bg-[#0EA5E9] text-white text-sm font-bold rounded-xl cursor-pointer flex justify-center items-center gap-2">
                    <CalendarDays className="w-4 h-4" /> Book Online
                  </button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* ─── 2. HERO PARALLAX (CLEAN MEDICAL AESTHETIC) ─── */}
      <section className="relative pt-20 pb-20 md:pb-0 md:h-[95vh] flex items-center overflow-hidden bg-gradient-to-b from-[#F0F9FF] to-white">
        <div className="max-w-[1400px] mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <motion.div style={{ y: textY }} className="relative z-10 pt-10 md:pt-0">
            <Reveal>
              <Badge className="bg-white text-[#0EA5E9] border border-[#0EA5E9]/20 mb-6 px-4 py-1.5 rounded-full font-semibold shadow-sm">
                Award-Winning Care in 2026
              </Badge>
            </Reveal>
            
            <Reveal delay={0.1}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#111827] mb-6 leading-[1.1]">
                Mastering the art <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0EA5E9] to-[#3B82F6]">
                  of natural beauty.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-lg md:text-xl text-zinc-500 font-medium max-w-lg mb-10 leading-relaxed">
                Elevate your confidence with board-certified specialists, cutting-edge technology, and a commitment to subtle, transformative results.
              </p>
            </Reveal>

            <Reveal delay={0.3} className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-[#111827] text-white font-bold rounded-full hover:bg-zinc-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2">
                View Treatments <ArrowRight className="w-4 h-4" />
              </button>
              <Dialog>
                <DialogTrigger asChild>
                  <button className="px-8 py-4 bg-white border border-zinc-200 text-[#111827] font-bold rounded-full hover:bg-zinc-50 transition-colors duration-300 cursor-pointer flex items-center justify-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#0EA5E9]/10 flex items-center justify-center">
                      <Play className="w-3 h-3 text-[#0EA5E9] ml-0.5" />
                    </div>
                    Tour the Clinic
                  </button>
                </DialogTrigger>
                <DialogContent className="bg-white border-zinc-200 sm:max-w-[800px] p-1 rounded-2xl overflow-hidden">
                  <div className="aspect-video relative w-full bg-zinc-100 flex items-center justify-center rounded-xl overflow-hidden">
                    <div className="w-12 h-12 rounded-full border-t-2 border-[#0EA5E9] animate-spin" />
                  </div>
                </DialogContent>
              </Dialog>
            </Reveal>
            
            <Reveal delay={0.4} className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1,2,3,4].map((i) => (
                  <div key={i} className={`w-10 h-10 rounded-full border-2 border-white bg-zinc-200 overflow-hidden relative z-[${5-i}]`}>
                    <Image src={`https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80&auto=format&fit=crop&crop=faces`} alt="patient" fill className="object-cover" />
                  </div>
                ))}
              </div>
              <div className="text-sm font-semibold text-zinc-600">
                <span className="text-[#111827] font-bold">100k+</span> procedures performed safely.
              </div>
            </Reveal>
          </motion.div>

          <motion.div style={{ y: heroY }} className="relative h-[500px] md:h-[700px] w-full hidden md:block rounded-3xl overflow-hidden shadow-2xl">
            <Image 
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&q=80" 
              alt="Modern medical clinic" 
              fill 
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0EA5E9]/20 to-transparent mix-blend-multiply" />
            
            {/* Floating Glass Card */}
            <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-zinc-500 mb-1">Clinic Status</div>
                <div className="flex items-center gap-2 font-semibold text-[#111827]">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" /> Accepting New Patients
                </div>
              </div>
              <button className="w-10 h-10 rounded-full bg-[#0EA5E9]/10 flex items-center justify-center text-[#0EA5E9]">
                <ArrowRight className="w-5 h-5 -rotate-45" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── 3. STATS BAR ─── */}
      <section className="py-16 border-y border-zinc-100 bg-white relative z-10">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4 divide-x-0 md:divide-x divide-zinc-100">
            {STATS.map((stat, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="flex flex-col items-center text-center">
                  <div className="text-4xl lg:text-5xl font-bold text-[#111827] mb-2 tracking-tight">
                    {stat.value}<span className="text-[#0EA5E9]">{stat.suffix}</span>
                  </div>
                  <div className="text-xs text-zinc-500 font-bold uppercase tracking-widest">
                    {stat.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. FEATURES (TABS) ─── */}
      <section id="treatments" className="py-32 relative bg-zinc-50">
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <Reveal>
              <h2 className="text-sm font-bold text-[#0EA5E9] mb-4 uppercase tracking-widest">Departments</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-[#111827] mb-6 tracking-tight">Comprehensive Care.</h3>
              <p className="text-zinc-500 max-w-2xl mx-auto leading-relaxed text-lg font-medium">
                Our clinic houses three distinct departments under one roof, allowing for a holistic and collaborative approach to your aesthetic and medical needs.
              </p>
            </Reveal>
          </div>

          <Tabs defaultValue="aesthetics" className="w-full">
            <TabsList className="flex flex-col sm:flex-row justify-center h-auto bg-transparent gap-4 mb-16 p-0">
              {FEATURES.map((feature) => (
                <TabsTrigger 
                  key={feature.id} 
                  value={feature.id}
                  className="px-8 py-4 text-center data-[state=active]:bg-[#111827] data-[state=active]:text-white text-zinc-500 hover:bg-white hover:text-[#111827] transition-all duration-300 cursor-pointer rounded-full border border-zinc-200 data-[state=active]:border-[#111827] shadow-sm data-[state=active]:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <div className="opacity-70">{feature.icon}</div>
                    <span className="text-sm font-bold">{feature.title}</span>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="w-full">
              <AnimatePresence mode="wait">
                {FEATURES.map((feature) => (
                  <TabsContent key={feature.id} value={feature.id} className="mt-0 outline-none">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="bg-white rounded-3xl overflow-hidden shadow-xl border border-zinc-100 flex flex-col lg:flex-row"
                    >
                      <div className="p-10 md:p-16 lg:w-1/2 flex flex-col justify-center">
                        <div className="w-12 h-12 rounded-xl bg-[#E0F2FE] flex items-center justify-center text-[#0EA5E9] mb-8">
                          {feature.icon}
                        </div>
                        <h4 className="text-3xl font-bold text-[#111827] mb-6">{feature.title}</h4>
                        <p className="text-zinc-500 leading-relaxed mb-10 text-lg">{feature.description}</p>
                        <div className="space-y-5">
                          {feature.bullets.map((bullet, i) => (
                            <div key={i} className="flex items-center gap-4">
                              <div className="w-6 h-6 rounded-full bg-[#F0F9FF] flex items-center justify-center shrink-0">
                                <CheckCircle2 className="w-4 h-4 text-[#0EA5E9]" />
                              </div>
                              <span className="text-base font-semibold text-zinc-700">{bullet}</span>
                            </div>
                          ))}
                        </div>
                        <button className="mt-12 w-fit px-8 py-3 text-sm font-bold text-[#0EA5E9] border border-[#0EA5E9]/30 rounded-full hover:bg-[#F0F9FF] transition-colors cursor-pointer">
                          Learn More
                        </button>
                      </div>
                      
                      <div className="relative lg:w-1/2 min-h-[400px] lg:min-h-full">
                        <Image src={feature.image} alt={feature.title} fill className="object-cover" />
                      </div>
                    </motion.div>
                  </TabsContent>
                ))}
              </AnimatePresence>
            </div>
          </Tabs>
        </div>
      </section>

      {/* ─── 5. TESTIMONIALS CAROUSEL ─── */}
      <section id="reviews" className="py-32 bg-white border-y border-zinc-100 overflow-hidden relative">
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-sm font-bold text-[#0EA5E9] mb-4 uppercase tracking-widest">Testimonials</h2>
              <h3 className="text-4xl font-bold text-[#111827]">Patient Stories.</h3>
            </div>
          </Reveal>

          <Carousel className="w-full max-w-6xl mx-auto">
            <CarouselContent>
              {TESTIMONIALS.map((testi, i) => (
                <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/2 pl-6">
                  <Reveal delay={i * 0.1}>
                    <Card className="bg-[#F8FAFC] border-zinc-100 hover:border-zinc-300 transition-colors duration-300 cursor-pointer h-full rounded-2xl relative overflow-hidden group">
                      <CardContent className="p-10 flex flex-col h-full justify-between relative z-10">
                        <div>
                          <div className="flex gap-1 mb-6">
                            {[...Array(testi.rating)].map((_, j) => (
                              <Star key={j} className="w-5 h-5 fill-[#F59E0B] text-[#F59E0B]" />
                            ))}
                          </div>
                          <p className="text-zinc-600 text-lg leading-relaxed mb-8 italic">
                            "{testi.content}"
                          </p>
                        </div>
                        <div className="flex items-center gap-4 pt-6 mt-auto border-t border-zinc-200">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={testi.avatar} />
                            <AvatarFallback>PT</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-[#111827] font-bold text-sm">{testi.name}</div>
                            <div className="text-[#0EA5E9] font-semibold text-xs mt-1">{testi.role}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Reveal>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-4 mt-12">
              <CarouselPrevious className="relative inset-auto translate-y-0 bg-white border-zinc-200 text-[#111827] hover:bg-zinc-100 hover:text-black transition-colors" />
              <CarouselNext className="relative inset-auto translate-y-0 bg-white border-zinc-200 text-[#111827] hover:bg-zinc-100 hover:text-black transition-colors" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* ─── 6. PRICING ─── */}
      <section className="py-32 bg-zinc-50 relative">
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <Reveal>
              <h2 className="text-sm font-bold text-[#0EA5E9] mb-4 uppercase tracking-widest">Investment</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-[#111827] mb-6">Transparent Pricing.</h3>
              <p className="text-zinc-500 max-w-xl mx-auto text-lg">
                We believe in complete transparency. Every journey begins with a comprehensive consultation to map out your specific needs.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {PRICING.map((tier, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <Card className={`relative bg-white border ${tier.recommended ? 'border-[#0EA5E9] shadow-[0_20px_50px_rgba(14,165,233,0.1)] lg:scale-105 z-10' : 'border-zinc-200 shadow-sm'} rounded-3xl transition-all duration-300`}>
                  {tier.recommended && (
                    <div className="absolute top-0 inset-x-0 bg-[#0EA5E9] text-white text-xs font-bold uppercase tracking-widest text-center py-2 rounded-t-3xl">
                      Most Popular
                    </div>
                  )}
                  <CardContent className={`p-10 ${tier.recommended ? 'pt-12' : ''}`}>
                    <h4 className="text-2xl font-bold text-[#111827] mb-1">{tier.title}</h4>
                    <div className="text-sm font-semibold text-zinc-500 mb-6">{tier.subtitle}</div>
                    
                    <div className="flex items-end gap-1 mb-8">
                      <span className="text-5xl font-bold text-[#111827] tracking-tight">{tier.price}</span>
                      <span className="text-sm font-semibold text-zinc-500 mb-2">{tier.duration}</span>
                    </div>

                    <p className="text-sm font-medium text-zinc-600 mb-8 h-16">{tier.description}</p>
                    
                    <ul className="space-y-4 mb-10 border-t border-zinc-100 pt-8">
                      {tier.features.map((feat, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm text-zinc-700 font-semibold">
                          <CheckCircle2 className="w-5 h-5 text-[#0EA5E9] shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    <button className={`w-full py-4 text-sm font-bold rounded-xl transition-all duration-300 ${tier.recommended ? 'bg-[#111827] text-white hover:bg-zinc-800 shadow-md' : 'bg-[#F0F9FF] text-[#0EA5E9] hover:bg-[#E0F2FE]'}`}>
                      Book Now
                    </button>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7. FAQ ACCORDION ─── */}
      <section className="py-32 bg-white border-t border-zinc-100">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-sm font-bold text-[#0EA5E9] mb-4 uppercase tracking-widest">Support</h2>
              <h3 className="text-4xl font-bold text-[#111827]">Frequently Asked.</h3>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-zinc-200">
                  <AccordionTrigger className="text-left text-[#111827] hover:text-[#0EA5E9] hover:no-underline font-bold text-lg py-6 transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-zinc-600 font-medium leading-relaxed pb-6 text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* ─── 8. CTA BANNER ─── */}
      <section className="py-24 px-6 relative z-10 bg-zinc-50">
        <Reveal>
          <div className="max-w-[1400px] mx-auto bg-[#111827] rounded-3xl p-12 md:p-24 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay group-hover:opacity-30 transition-opacity duration-700" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#0EA5E9] opacity-20 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <CalendarDays className="w-16 h-16 text-[#0EA5E9] mx-auto mb-8" />
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Ready to begin your journey?</h2>
              <p className="text-lg text-zinc-300 max-w-2xl mx-auto mb-10 font-medium">
                Schedule your comprehensive consultation today. Let our experts create a tailored roadmap for your aesthetic and medical goals.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="px-10 py-4 bg-[#0EA5E9] text-white font-bold rounded-full hover:bg-[#0284C7] hover:-translate-y-1 transition-all duration-300 cursor-pointer shadow-lg shadow-[#0EA5E9]/30">
                  Book Online
                </button>
                <button className="px-10 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 font-bold rounded-full hover:bg-white/20 transition-all duration-300 cursor-pointer">
                  Call the Clinic
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ─── 9. FOOTER ─── */}
      <footer className="bg-white pt-24 pb-12 border-t border-zinc-200">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-8 cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-[#0EA5E9] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold tracking-tight text-[#111827]">
                  Nova Clinic.
                </span>
              </Link>
              <p className="text-zinc-500 font-medium text-sm leading-relaxed mb-8 max-w-sm">
                A premium medical and aesthetics center dedicated to evidence-based treatments and natural, elegant results.
              </p>
            </div>

            <div>
              <h4 className="text-[#111827] font-bold uppercase tracking-widest text-xs mb-6">Treatments</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-zinc-500 hover:text-[#0EA5E9] transition-colors text-sm font-semibold cursor-pointer">Injectables</a></li>
                <li><a href="#" className="text-zinc-500 hover:text-[#0EA5E9] transition-colors text-sm font-semibold cursor-pointer">Laser Therapy</a></li>
                <li><a href="#" className="text-zinc-500 hover:text-[#0EA5E9] transition-colors text-sm font-semibold cursor-pointer">Skin Tightening</a></li>
                <li><a href="#" className="text-zinc-500 hover:text-[#0EA5E9] transition-colors text-sm font-semibold cursor-pointer">Cosmetic Dental</a></li>
                <li><a href="#" className="text-zinc-500 hover:text-[#0EA5E9] transition-colors text-sm font-semibold cursor-pointer">Health Screenings</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[#111827] font-bold uppercase tracking-widest text-xs mb-6">Patient Info</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-zinc-500 hover:text-[#0EA5E9] transition-colors text-sm font-semibold cursor-pointer">First Visit Guide</a></li>
                <li><a href="#" className="text-zinc-500 hover:text-[#0EA5E9] transition-colors text-sm font-semibold cursor-pointer">Financing Options</a></li>
                <li><a href="#" className="text-zinc-500 hover:text-[#0EA5E9] transition-colors text-sm font-semibold cursor-pointer">Post-Care Portal</a></li>
                <li><a href="#" className="text-zinc-500 hover:text-[#0EA5E9] transition-colors text-sm font-semibold cursor-pointer">Telehealth</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[#111827] font-bold uppercase tracking-widest text-xs mb-6">Contact</h4>
              <ul className="space-y-4 font-semibold text-sm text-zinc-500">
                <li className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-[#0EA5E9]" /> 123 Medical Plaza, NY
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#0EA5E9]" /> +1 (800) 555-NOVA
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-zinc-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold text-zinc-500">
            <p>&copy; 2026 Nova Clinic LLC. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[#0EA5E9] transition-colors cursor-pointer">Privacy Policy</a>
              <a href="#" className="hover:text-[#0EA5E9] transition-colors cursor-pointer">Terms of Service</a>
              <a href="#" className="hover:text-[#0EA5E9] transition-colors cursor-pointer">HIPAA Notice</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}
