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
import { Play, Menu, ArrowRight, Star, CheckCircle2, Video, BookOpen, Users, Trophy, Download, Clock, ShieldCheck } from "lucide-react"

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
  { label: "Curriculum", href: "#curriculum" },
  { label: "Instructor", href: "#instructor" },
  { label: "Reviews", href: "#reviews" },
  { label: "Enroll", href: "#enroll" },
]

const STATS = [
  { value: "45", label: "Video Lessons", suffix: "" },
  { value: "12", label: "Hours of Content", suffix: "+" },
  { value: "25", label: "Students Enrolled", suffix: "k" },
  { value: "4.9", label: "Average Rating", suffix: "/5" },
  { value: "100", label: "Lifetime Access", suffix: "%" },
]

const CURRICULUM = [
  {
    id: "module1",
    title: "Module 1: The Foundation",
    icon: <BookOpen className="w-5 h-5" />,
    description: "Before building complex systems, you must master the fundamentals. This module strips away the noise and focuses entirely on the core principles that dictate success in this industry.",
    lessons: [
      { title: "Deconstructing the Myth of Talent", duration: "18:45" },
      { title: "The 80/20 Rule in Practice", duration: "24:12" },
      { title: "Setting up your Environment", duration: "15:30" },
      { title: "Mental Models for Rapid Learning", duration: "32:10" }
    ],
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80"
  },
  {
    id: "module2",
    title: "Module 2: Advanced Mechanics",
    icon: <Video className="w-5 h-5" />,
    description: "Once the foundation is set, we move into the advanced mechanics. You will learn the exact proprietary frameworks I use to execute high-level projects flawlessly.",
    lessons: [
      { title: "The 4-Step Execution Framework", duration: "45:20" },
      { title: "Navigating Complex Roadblocks", duration: "28:15" },
      { title: "Live Case Study: Project X", duration: "55:00" },
      { title: "Optimization and Refinement", duration: "31:45" }
    ],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
  },
  {
    id: "module3",
    title: "Module 3: Scale & Mastery",
    icon: <Trophy className="w-5 h-5" />,
    description: "The final phase is about scaling your output without scaling your input. Learn how to productize your skills, build leverage, and achieve true mastery in your field.",
    lessons: [
      { title: "Building Leverage through Systems", duration: "42:10" },
      { title: "Delegation and Outsourcing", duration: "25:30" },
      { title: "The Psychology of Pricing", duration: "38:45" },
      { title: "Final Exam & Certification", duration: "60:00" }
    ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
  }
]

const TESTIMONIALS = [
  {
    name: "David Chen",
    role: "Freelance Designer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    content: "This masterclass completely rewired how I approach my business. I applied the framework from Module 2 and doubled my freelance rate within 30 days without losing a single client.",
    rating: 5
  },
  {
    name: "Sarah Jenkins",
    role: "Agency Founder",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    content: "I've bought dozens of courses, but the production value and depth of insight here are on another level. It feels like a premium documentary that actually teaches you hard skills.",
    rating: 5
  },
  {
    name: "Michael Torres",
    role: "Product Manager",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    content: "The live case studies are worth the price of admission alone. Seeing the exact process unedited, mistakes and all, gave me the confidence to execute on my own projects.",
    rating: 5
  },
  {
    name: "Elena Rostova",
    role: "Creative Director",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    content: "A masterclass in every sense of the word. The pacing is perfect, the assignments are actually challenging, and the private community has been incredibly supportive.",
    rating: 5
  }
]

const PRICING = [
  {
    id: "standard",
    title: "Self-Paced Course",
    subtitle: "Lifetime Access",
    price: "$497",
    duration: "One-Time Payment",
    description: "Get immediate access to the entire video curriculum, downloadable workbooks, and resource library.",
    features: [
      "All 45 HD Video Lessons",
      "Interactive Notion Workbooks",
      "Downloadable Asset Library",
      "Lifetime Updates",
      "Certificate of Completion"
    ],
    recommended: false,
    linkText: "Enroll Now"
  },
  {
    id: "pro",
    title: "Mastery Tier",
    subtitle: "Community + Coaching",
    price: "$997",
    duration: "One-Time Payment",
    description: "Everything in the standard course, plus access to our private Discord community and monthly live Q&A calls.",
    features: [
      "Everything in Self-Paced",
      "Private Discord Mastermind",
      "Monthly Live Q&A Coaching Calls",
      "Behind-the-scenes Project Files",
      "Peer Review System"
    ],
    recommended: true,
    linkText: "Join Mastery Tier"
  },
  {
    id: "payment-plan",
    title: "3-Month Plan",
    subtitle: "Flexible Payments",
    price: "$349",
    duration: "Per Month for 3 Months",
    description: "Get access to the Mastery Tier with a flexible 3-month payment plan. No interest, no hidden fees.",
    features: [
      "Instant Access to Mastery Tier",
      "Automated Monthly Billing",
      "Cancel Anytime (Lose Access)",
      "0% Interest Financing"
    ],
    recommended: false,
    linkText: "Start Payment Plan"
  }
]

const FAQS = [
  {
    question: "Do I have lifetime access to the course?",
    answer: "Yes! Once you enroll, you have lifetime access to the course materials, including any future updates or bonus modules we add to the curriculum."
  },
  {
    question: "What if I don't like the course? Is there a refund policy?",
    answer: "We offer a 14-day action-based money-back guarantee. If you complete the first module, do the homework, and still don't feel you're getting value, we will refund your investment in full."
  },
  {
    question: "Do I need any prior experience to take this class?",
    answer: "Module 1 starts with the absolute fundamentals. While having some background knowledge is helpful, the course is designed to take you from a complete beginner to an advanced practitioner."
  },
  {
    question: "How much time do I need to dedicate each week?",
    answer: "The course is self-paced. We recommend setting aside 2-3 hours per week to watch the lessons and complete the practical assignments, which means you can finish the core curriculum in about 6 weeks."
  },
  {
    question: "Will I get direct feedback from the instructor?",
    answer: "If you enroll in the Mastery Tier, you can submit questions for the monthly live Q&A calls. Direct 1-on-1 feedback on specific projects is generally peer-reviewed within the Discord community."
  },
  {
    question: "Are the videos captioned?",
    answer: "Yes, all video lessons include high-quality, human-edited English closed captions. We also provide full text transcripts for every lesson."
  },
  {
    question: "Can I pay with PayPal or Crypto?",
    answer: "We currently accept all major credit cards and PayPal. We do not accept cryptocurrency at this time."
  },
  {
    question: "Is there a student discount available?",
    answer: "Yes, we offer a 20% discount for currently enrolled university students. Please email our support team with a valid .edu email address or a photo of your student ID to receive your discount code."
  }
]

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────
export default function MasteryStudioTemplate() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  
  // Parallax Values
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"])

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0A0A0A] text-[#F3F4F6] font-sans selection:bg-[#6366F1] selection:text-white" style={{ overflowX: "hidden", scrollBehavior: "smooth" }}>
      
      {/* ─── 1. NAVBAR (CLEAN & MODERN) ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-lg border-b border-white/10 transition-all duration-300">
        <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group cursor-pointer">
            <div className="w-8 h-8 bg-gradient-to-br from-[#6366F1] to-[#4F46E5] rounded flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)]">
              <Play className="w-4 h-4 text-white fill-current ml-0.5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Mastery<span className="text-[#6366F1] font-light">Class</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.label} 
                href={link.href} 
                className="text-sm font-semibold text-zinc-400 hover:text-white transition-colors duration-200 cursor-pointer"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center">
            <Link href="#enroll" className="px-6 py-2.5 bg-white text-[#0A0A0A] text-sm font-bold rounded-full hover:bg-zinc-200 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] cursor-pointer">
              Enroll Now
            </Link>
          </div>

          {/* Mobile Nav */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="md:hidden p-2 text-zinc-400 hover:text-white cursor-pointer transition-colors">
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#0A0A0A] border-l border-white/10 text-white w-full sm:w-[400px]">
              <div className="flex flex-col gap-6 mt-12">
                <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-6">
                  <div className="w-8 h-8 bg-[#6366F1] rounded flex items-center justify-center">
                    <Play className="w-4 h-4 text-white fill-current ml-0.5" />
                  </div>
                  <span className="text-xl font-bold tracking-tight">MasteryClass</span>
                </div>
                {NAV_LINKS.map((link) => (
                  <Link 
                    key={link.label} 
                    href={link.href} 
                    className="text-xl font-bold text-zinc-300 hover:text-white transition-colors cursor-pointer"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-8">
                  <Link href="#enroll" className="w-full flex justify-center py-4 bg-white text-[#0A0A0A] text-base font-bold rounded-xl cursor-pointer">
                    Enroll Now
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* ─── 2. HERO PARALLAX (VIDEO AESTHETIC) ─── */}
      <section className="relative pt-20 pb-20 md:pb-0 min-h-[90vh] flex items-center overflow-hidden bg-[#0A0A0A]">
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#6366F1] rounded-full blur-[120px] opacity-20" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#818CF8] rounded-full blur-[100px] opacity-10" />
        </div>

        <div className="max-w-[1200px] mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10 pt-10 lg:pt-0">
          
          <motion.div style={{ y: textY }} className="flex flex-col items-start text-left">
            <Reveal>
              <div className="flex items-center gap-2 mb-6">
                <Badge className="bg-[#6366F1]/10 text-[#818CF8] border border-[#6366F1]/30 px-3 py-1 rounded-full font-bold uppercase tracking-wider text-[10px]">
                  Enrollment Open
                </Badge>
                <div className="flex items-center gap-1 text-[#F59E0B] text-xs font-bold">
                  <Star className="w-3 h-3 fill-current" /> 4.9/5 Average
                </div>
              </div>
            </Reveal>
            
            <Reveal delay={0.1}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.05]">
                Master the art of <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#818CF8] to-[#C7D2FE]">
                  visual storytelling.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-lg md:text-xl text-zinc-400 font-medium max-w-lg mb-10 leading-relaxed">
                Join 25,000+ students in this definitive masterclass. Learn the exact frameworks used to direct award-winning campaigns.
              </p>
            </Reveal>

            <Reveal delay={0.3} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link href="#enroll" className="px-8 py-4 bg-[#6366F1] text-white font-bold rounded-xl hover:bg-[#4F46E5] transition-all duration-300 shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] cursor-pointer text-center">
                Enroll in Masterclass
              </Link>
              <Dialog>
                <DialogTrigger asChild>
                  <button className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-colors duration-300 cursor-pointer flex items-center justify-center gap-2">
                    <Play className="w-4 h-4 text-[#818CF8]" /> Watch Trailer
                  </button>
                </DialogTrigger>
                <DialogContent className="bg-[#0A0A0A] border-white/10 sm:max-w-[900px] p-0 rounded-2xl overflow-hidden">
                  <div className="aspect-video relative w-full bg-black flex items-center justify-center">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1600&q=80')] bg-cover opacity-50" />
                    <div className="w-16 h-16 rounded-full bg-[#6366F1]/20 backdrop-blur-sm border border-[#6366F1]/50 flex items-center justify-center z-10 cursor-pointer hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 text-white fill-current ml-1" />
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </Reveal>
          </motion.div>

          <motion.div style={{ y: heroY }} className="relative h-[400px] sm:h-[500px] lg:h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
            <Image 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80" 
              alt="Instructor" 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-80" />
            
            {/* Video Player UI Overlay */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="w-full h-1 bg-white/20 rounded-full mb-4 overflow-hidden relative">
                <div className="absolute top-0 left-0 h-full w-1/3 bg-[#6366F1] rounded-full" />
              </div>
              <div className="flex items-center justify-between text-xs font-bold text-white/80">
                <div className="flex items-center gap-4">
                  <Play className="w-4 h-4 text-white fill-current" />
                  <span>01:24 / 03:45</span>
                </div>
                <div className="flex items-center gap-4">
                  <span>HD</span>
                  <div className="w-4 h-4 border-2 border-white/80 rounded-[2px]" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── 3. STATS BAR ─── */}
      <section className="py-12 border-y border-white/10 bg-[#0A0A0A] relative z-10">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4 divide-x-0 md:divide-x divide-white/10">
            {STATS.map((stat, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="flex flex-col items-center text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-white mb-2 tracking-tight">
                    {stat.value}<span className="text-[#6366F1]">{stat.suffix}</span>
                  </div>
                  <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                    {stat.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. FEATURES (CURRICULUM TABS) ─── */}
      <section id="curriculum" className="py-32 relative bg-[#111111]">
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <Reveal>
              <h2 className="text-[10px] font-bold text-[#818CF8] mb-4 uppercase tracking-widest">The Syllabus</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">Course Curriculum.</h3>
              <p className="text-zinc-400 max-w-2xl mx-auto leading-relaxed text-lg font-medium">
                12 hours of dense, unskippable content. Broken down into 3 distinct modules designed to take you from theory to execution.
              </p>
            </Reveal>
          </div>

          <Tabs defaultValue="module1" className="w-full flex flex-col lg:flex-row gap-12 lg:gap-16">
            <div className="lg:w-1/3">
              <TabsList className="flex flex-col h-auto bg-transparent gap-3 items-stretch p-0">
                {CURRICULUM.map((mod) => (
                  <TabsTrigger 
                    key={mod.id} 
                    value={mod.id}
                    className="justify-start px-6 py-5 text-left data-[state=active]:bg-[#6366F1]/10 data-[state=active]:text-white text-zinc-400 hover:bg-white/5 transition-all duration-300 cursor-pointer rounded-xl border border-transparent data-[state=active]:border-[#6366F1]/30"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-[#818CF8]">{mod.icon}</div>
                      <span className="text-sm font-bold">{mod.title}</span>
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <div className="lg:w-2/3">
              <AnimatePresence mode="wait">
                {CURRICULUM.map((mod) => (
                  <TabsContent key={mod.id} value={mod.id} className="mt-0 outline-none">
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4 }}
                      className="bg-[#0A0A0A] rounded-2xl border border-white/10 overflow-hidden"
                    >
                      <div className="aspect-[21/9] relative w-full overflow-hidden">
                        <Image src={mod.image} alt={mod.title} fill className="object-cover opacity-60" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
                        <div className="absolute bottom-6 left-6">
                          <h4 className="text-2xl font-bold text-white mb-2">{mod.title}</h4>
                          <Badge className="bg-[#6366F1] text-white border-none">{mod.lessons.length} Lessons</Badge>
                        </div>
                      </div>
                      
                      <div className="p-8 md:p-10">
                        <p className="text-zinc-400 leading-relaxed mb-8 text-sm md:text-base">{mod.description}</p>
                        
                        <div className="space-y-3">
                          {mod.lessons.map((lesson, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                              <div className="flex items-center gap-4">
                                <div className="w-8 h-8 rounded-full bg-[#6366F1]/20 flex items-center justify-center text-[#818CF8] text-xs font-bold">
                                  {i + 1}
                                </div>
                                <span className="text-sm font-semibold text-zinc-200">{lesson.title}</span>
                              </div>
                              <div className="flex items-center gap-2 text-xs font-bold text-zinc-500">
                                <Clock className="w-3 h-3" /> {lesson.duration}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </TabsContent>
                ))}
              </AnimatePresence>
            </div>
          </Tabs>
        </div>
      </section>

      {/* ─── 5. TESTIMONIALS (STUDENT SUCCESS) ─── */}
      <section id="reviews" className="py-32 bg-[#0A0A0A] overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.05)_0%,transparent_50%)]" />
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <Reveal>
            <div className="mb-20 text-center">
              <h2 className="text-[10px] font-bold text-[#818CF8] mb-4 uppercase tracking-widest">Success Stories</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-white">Student Results.</h3>
            </div>
          </Reveal>

          <Carousel className="w-full">
            <CarouselContent>
              {TESTIMONIALS.map((testi, i) => (
                <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/2 pl-6">
                  <Reveal delay={i * 0.1}>
                    <Card className="bg-[#111111] border-white/10 hover:border-[#6366F1]/50 transition-colors duration-300 cursor-pointer h-full rounded-2xl relative overflow-hidden group">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#6366F1] to-[#818CF8] opacity-0 group-hover:opacity-100 transition-opacity" />
                      <CardContent className="p-10 flex flex-col h-full justify-between">
                        <div>
                          <div className="flex gap-1 mb-6">
                            {[...Array(testi.rating)].map((_, j) => (
                              <Star key={j} className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                            ))}
                          </div>
                          <p className="text-zinc-300 font-medium leading-relaxed mb-8 text-base">
                            "{testi.content}"
                          </p>
                        </div>
                        <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                          <Avatar className="w-12 h-12 border border-white/20">
                            <AvatarImage src={testi.avatar} />
                            <AvatarFallback>ST</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-white font-bold text-sm">{testi.name}</div>
                            <div className="text-[#818CF8] text-xs font-semibold mt-1">{testi.role}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Reveal>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-4 mt-12">
              <CarouselPrevious className="relative inset-auto translate-y-0 bg-[#111111] border-white/20 text-white hover:bg-white hover:text-black transition-colors rounded-full" />
              <CarouselNext className="relative inset-auto translate-y-0 bg-[#111111] border-white/20 text-white hover:bg-white hover:text-black transition-colors rounded-full" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* ─── 6. PRICING (ENROLLMENT OPTIONS) ─── */}
      <section id="enroll" className="py-32 bg-[#111111] relative border-y border-white/5">
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <Reveal>
              <h2 className="text-[10px] font-bold text-[#818CF8] mb-4 uppercase tracking-widest">Enrollment</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">Choose your path.</h3>
              <p className="text-zinc-400 font-medium text-base max-w-xl mx-auto">
                Secure your spot today and get immediate lifetime access to the curriculum. Covered by our 14-day guarantee.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {PRICING.map((tier, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <Card className={`relative bg-[#0A0A0A] border ${tier.recommended ? 'border-[#6366F1] shadow-[0_0_40px_rgba(99,102,241,0.15)] z-10 lg:-translate-y-4' : 'border-white/10'} rounded-2xl transition-all duration-300`}>
                  {tier.recommended && (
                    <div className="absolute top-0 inset-x-0 bg-gradient-to-r from-[#6366F1] to-[#4F46E5] text-white text-[10px] font-bold uppercase tracking-widest text-center py-2 rounded-t-2xl">
                      Most Value
                    </div>
                  )}
                  <CardContent className={`p-10 ${tier.recommended ? 'pt-12' : ''}`}>
                    <h4 className="text-2xl font-bold text-white mb-2">{tier.title}</h4>
                    <div className="text-xs font-bold text-[#818CF8] uppercase tracking-wider mb-8">{tier.subtitle}</div>
                    
                    <div className="flex items-end gap-2 mb-6">
                      <span className="text-5xl font-bold text-white tracking-tight">{tier.price}</span>
                    </div>
                    <div className="text-xs font-semibold text-zinc-500 mb-8 uppercase tracking-widest border-b border-white/10 pb-8">{tier.duration}</div>

                    <p className="text-sm text-zinc-400 mb-8 h-16 leading-relaxed">{tier.description}</p>
                    
                    <ul className="space-y-4 mb-10">
                      {tier.features.map((feat, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm font-semibold text-zinc-300">
                          <CheckCircle2 className="w-5 h-5 text-[#6366F1] shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    <button className={`w-full py-4 text-sm font-bold rounded-xl transition-all duration-300 ${tier.recommended ? 'bg-[#6366F1] text-white hover:bg-[#4F46E5] shadow-lg shadow-[#6366F1]/20' : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'}`}>
                      {tier.linkText}
                    </button>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7. FAQ ACCORDION ─── */}
      <section className="py-32 bg-[#0A0A0A]">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-[10px] font-bold text-[#818CF8] mb-4 uppercase tracking-widest">Support</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-white">Frequently Asked.</h3>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-white/10">
                  <AccordionTrigger className="text-left text-white hover:text-[#818CF8] hover:no-underline font-bold text-lg py-6 transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-zinc-400 font-medium leading-relaxed pb-6 text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* ─── 8. CTA BANNER (COUNTDOWN STYLE) ─── */}
      <section className="py-24 px-6 bg-[#0A0A0A]">
        <Reveal>
          <div className="max-w-[1200px] mx-auto bg-gradient-to-br from-[#111111] to-[#1a1a1a] border border-white/10 rounded-3xl p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#6366F1] via-[#818CF8] to-[#6366F1]" />
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#6366F1] rounded-full blur-[100px] opacity-20" />
            
            <div className="relative z-10 flex flex-col items-center">
              <Badge className="bg-red-500/10 text-red-500 border border-red-500/20 mb-8 px-4 py-1.5 rounded-full font-bold uppercase tracking-widest text-[10px]">
                Registration Closes Soon
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Ready to master your craft?</h2>
              <p className="text-base text-zinc-400 max-w-xl mx-auto mb-10 font-medium leading-relaxed">
                Join the private community of 25,000+ creators. Get immediate access to all 45 lessons, workbooks, and bonus materials today.
              </p>
              <Link href="#enroll" className="px-12 py-5 bg-white text-[#0A0A0A] font-bold rounded-xl hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(255,255,255,0.15)]">
                Enroll Risk-Free
              </Link>
              <p className="mt-6 text-xs text-zinc-500 font-medium flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-zinc-400" /> 14-Day Money-Back Guarantee
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ─── 9. FOOTER ─── */}
      <footer className="bg-[#0A0A0A] text-white pt-24 pb-12 border-t border-white/10">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-3 mb-6 cursor-pointer">
                <div className="w-8 h-8 bg-[#6366F1] rounded flex items-center justify-center">
                  <Play className="w-4 h-4 text-white fill-current ml-0.5" />
                </div>
                <span className="text-xl font-bold tracking-tight text-white">
                  MasteryClass
                </span>
              </Link>
              <p className="text-zinc-500 font-medium text-sm leading-relaxed mb-8 max-w-sm">
                Premium online education for the modern creator. Learn from industry leaders through cinematic, action-oriented curriculum.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-[10px] mb-6">Course</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-zinc-400 hover:text-white transition-colors text-sm font-semibold cursor-pointer">Curriculum</a></li>
                <li><a href="#" className="text-zinc-400 hover:text-white transition-colors text-sm font-semibold cursor-pointer">Student Log In</a></li>
                <li><a href="#" className="text-zinc-400 hover:text-white transition-colors text-sm font-semibold cursor-pointer">Pricing</a></li>
                <li><a href="#" className="text-zinc-400 hover:text-white transition-colors text-sm font-semibold cursor-pointer">Gift a Course</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-[10px] mb-6">Support</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-zinc-400 hover:text-white transition-colors text-sm font-semibold cursor-pointer">Help Center</a></li>
                <li><a href="#" className="text-zinc-400 hover:text-white transition-colors text-sm font-semibold cursor-pointer">FAQ</a></li>
                <li><a href="#" className="text-zinc-400 hover:text-white transition-colors text-sm font-semibold cursor-pointer">Contact Us</a></li>
                <li><a href="#" className="text-zinc-400 hover:text-white transition-colors text-sm font-semibold cursor-pointer">Affiliate Program</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold text-zinc-600">
            <p>&copy; 2026 Mastery Studio Education. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-zinc-400 transition-colors cursor-pointer">Terms of Service</a>
              <a href="#" className="hover:text-zinc-400 transition-colors cursor-pointer">Privacy Policy</a>
              <a href="#" className="hover:text-zinc-400 transition-colors cursor-pointer">Refund Policy</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}
