"use client";

import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, ArrowUpRight, Star, Check, Menu, X, Layers, Globe, Film, Zap, Circle, ChevronRight, Eye, Command, Terminal, Cpu, Share2, Search, ShoppingBag, ZapOff, Ghost, Activity, Box, Radio } from "lucide-react";

import "../premium.css";

/* ==========================================================================
   DATA STRUCTURES
   ========================================================================== */

const WORK = [
  {
    id: 1,
    title: "VOID IDENTITY",
    client: "Orbit Labs",
    tag: "Brand System",
    year: "2026",
    img: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=1200&q=80",
    deliverables: [
      "Identity System",
      "Motion Language",
      "Sonic Identity",
      "Environmental Applications",
    ],
  },
  {
    id: 2,
    title: "CIPHER UI",
    client: "Nova Bank",
    tag: "Digital Experience",
    year: "2025",
    img: "https://images.unsplash.com/photo-1481487196290-c152efe083f5?w=1200&q=80",
    deliverables: [
      "Design System",
      "Interaction Design",
      "Prototype",
      "Dev Handoff",
    ],
  },
  {
    id: 3,
    title: "BRUTAL MOTION",
    client: "Hyper Records",
    tag: "Motion Design",
    year: "2025",
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80",
    deliverables: [
      "Title Sequence",
      "Visual ID",
      "Music Video Direction",
      "Live Visuals",
    ],
  },
  {
    id: 4,
    title: "DARK MATTER",
    client: "Epoch Films",
    tag: "Title Design",
    year: "2024",
    img: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=1200&q=80",
    deliverables: [
      "Main Title",
      "End Credits",
      "Chapter Idents",
      "Promotional Assets",
    ],
  },
];

const RECOGNITION = [
  { award: "Agency of the Year", org: "Awwwards", year: "2025" },
  { award: "Gold - Brand Identity", org: "Cannes Lions", year: "2025" },
  { award: "Best In Show - Digital", org: "D&AD", year: "2024" },
  { award: "Motion Graphics Award", org: "Vimeo Staff Pick", year: "2024" },
];

const STRATEGIC_PILLARS = [
  {
    title: "Conceptual Friction",
    desc: "We seek the points of resistance between a brand and its audience. That's where the truth lives.",
    icon: <ZapOff className="w-5 h-5" />,
  },
  {
    title: "Visual Brutalism",
    desc: "Stripping away the decorative to reveal the structural. Aesthetic integrity through reduction.",
    icon: <Box className="w-5 h-5" />,
  },
  {
    title: "Kinetic Heritage",
    desc: "Digital systems that don't just sit there. They breathe, move, and react like living organisms.",
    icon: <Activity className="w-5 h-5" />,
  },
];

const STUDIO_LOCATIONS = [
  {
    city: "Berlin",
    focus: "Creative Direction // Motion Lab",
    status: "Active",
  },
  {
    city: "Los Angeles",
    focus: "Strategy // Client Services",
    status: "Active",
  },
  { city: "Tokyo", focus: "Digital Production // UI Hub", status: "Standby" },
];

/* ==========================================================================
   UTILITY COMPONENTS
   ========================================================================== */

function Reveal({
  children,
  delay = 0,
  y = 30,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

function GlitchText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const [glitch, setGlitch] = useState(false);
  useEffect(() => {
    const id = setInterval(
      () => {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 90);
      },
      3000 + Math.random() * 2000,
    );
    return () => clearInterval(id);
  }, []);
  return (
    <span
      className={`relative inline-block ${className}`}
      style={
        glitch
          ? {
              textShadow: "2px 0 #ff003c, -2px 0 #ffffff20",
              filter: "brightness(1.2)",
            }
          : {}
      }
    >
      {text}
    </span>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    let cur = 0;
    const step = to / 70;
    const t = setInterval(() => {
      cur += step;
      if (cur >= to) {
        setCount(to);
        clearInterval(t);
      } else {
        setCount(Math.floor(cur));
      }
    }, 16);
    return () => clearInterval(t);
  }, [isInView, to]);
  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* ==========================================================================
   MAIN PAGE COMPONENT
   ========================================================================== */

export default function VoidAgencyPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeWork, setActiveWork] = useState<number | null>(null);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="premium-theme min-h-screen bg-[#080808] text-white font-sans selection:bg-[#ff003c] selection:text-white overflow-x-hidden"
      style={{ scrollBehavior: "smooth" }}
    >
      {/* ==========================================
          SCANLINE / NOISE OVERLAY
          ========================================== */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />

      {/* ==========================================
          NAVIGATION
          ========================================== */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 mix-blend-difference ${scrolled ? "py-4" : "py-10"}`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link
            href="/"
            className="text-xl md:text-2xl font-black tracking-tighter uppercase"
          >
            VOID<span className="text-[#ff003c]">.</span>
          </Link>

          <div className="hidden lg:flex items-center gap-10 text-[10px] font-bold uppercase tracking-[0.4em] text-white/50">
            <Link href="#" className="hover:text-white transition-colors">
              Selected_Work
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Manifesto
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Studio_Intel
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Access_Log
            </Link>
          </div>

          <div className="flex items-center gap-6">
            <button className="hidden md:block hover:text-[#ff003c] transition-colors text-white/40">
              <Search className="w-5 h-5" />
            </button>
            <button className="px-6 py-2 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-[#ff003c] hover:text-white transition-all">
              Start_Project
            </button>
            <button onClick={() => setMenuOpen(true)} className="lg:hidden">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.5 }}
            className="fixed inset-0 z-[100] bg-[#080808] p-8 pt-32 flex flex-col border-l border-white/5"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-10 right-8 text-white"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="flex flex-col gap-10 text-4xl font-black tracking-tighter uppercase">
              <Link href="#" onClick={() => setMenuOpen(false)}>
                Work
              </Link>
              <Link href="#" onClick={() => setMenuOpen(false)}>
                Manifesto
              </Link>
              <Link href="#" onClick={() => setMenuOpen(false)}>
                Studio
              </Link>
              <Link href="#" onClick={() => setMenuOpen(false)}>
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==========================================
          1. HERO (Brutalist Typography)
          ========================================== */}
      <section
        ref={heroRef}
        className="relative w-full h-[100svh] flex flex-col justify-center overflow-hidden px-6 md:px-12"
      >
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&q=80"
            alt="Creative Agency Hero"
            fill
            className="object-cover grayscale brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
        </motion.div>

        <div className="relative z-10 max-w-[1400px] mx-auto w-full">
          <Reveal>
            <div className="flex items-center gap-4 mb-8">
              <Badge className="bg-[#ff003c] text-white rounded-none px-4 py-1 text-[10px] tracking-widest font-black uppercase">
                Established 2017
              </Badge>
              <span className="text-[10px] text-white/30 tracking-[0.4em] font-black uppercase">
                BERLIN // PARIS // LA
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-[10vw] font-black leading-[0.8] tracking-[-0.04em] mb-10 uppercase">
              <GlitchText text="We make" />
              <br />
              <span
                className="text-white/10"
                style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)" }}
              >
                brands
              </span>{" "}
              <br />
              <GlitchText text="uncomfortable." />
            </h1>
            <p className="max-w-xl text-lg md:text-xl text-white/40 leading-relaxed font-black mb-12 uppercase tracking-widest">
              Brand systems, digital experience, and motion design for companies
              that refuse to be forgettable.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <button className="px-10 py-5 bg-white text-black text-[10px] uppercase tracking-[0.4em] font-black hover:bg-[#ff003c] hover:text-white transition-all cursor-pointer">
                View_Work
              </button>
              <button className="px-10 py-5 border border-white/20 text-white text-[10px] uppercase tracking-[0.4em] font-black hover:bg-white hover:text-black transition-all cursor-pointer">
                Our_Process
              </button>
            </div>
          </Reveal>
        </div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute bottom-10 left-12 flex flex-col gap-2"
        >
          <div className="text-[9px] font-black text-white/20 uppercase tracking-widest">
            Uptime: 99.9%
          </div>
          <div className="w-24 h-0.5 bg-white/5">
            <motion.div
              animate={{ width: ["0%", "100%", "0%"] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="h-full bg-[#ff003c]"
            />
          </div>
        </motion.div>
      </section>

      {/* ==========================================
          2. THE MANIFESTO (Large Typography)
          ========================================== */}
      <section className="py-32 bg-[#080808] relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <Reveal>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-tight uppercase max-w-5xl mb-24">
              "We don't build <span className="text-white/20">assets</span>. We
              build <span className="text-[#ff003c]">ideologies</span>. In a
              world of visual entropy, we choose structural{" "}
              <span className="text-white/20">brutalism</span>."
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-32">
            {STRATEGIC_PILLARS.map((pillar, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="group">
                  <div className="text-[#ff003c] mb-8 group-hover:scale-110 transition-transform origin-left">
                    {pillar.icon}
                  </div>
                  <h4 className="text-xl font-black uppercase tracking-tight mb-4">
                    {pillar.title}
                  </h4>
                  <p className="text-sm text-white/40 leading-relaxed font-bold uppercase tracking-widest">
                    {pillar.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          3. SELECTED WORK (Interactive List)
          ========================================== */}
      <section className="py-32 bg-[#0c0c0c] border-y border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <Reveal className="mb-24">
            <span className="text-[10px] uppercase tracking-[0.5em] font-black text-[#ff003c] mb-6 block">
              Portfolio_Index
            </span>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
              Selected <br /> <span className="text-white/10">Archives.</span>
            </h2>
          </Reveal>

          <div className="space-y-0 divide-y divide-white/5">
            {WORK.map((work, i) => (
              <Reveal key={work.id} delay={i * 0.1}>
                <div
                  onClick={() => setActiveWork(i)}
                  className="group cursor-pointer py-12 flex flex-col md:flex-row md:items-center justify-between gap-8 hover:bg-white/[0.02] transition-colors px-4"
                >
                  <div className="flex items-center gap-10">
                    <span className="text-[11px] font-black text-white/20 uppercase tracking-widest">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter group-hover:text-[#ff003c] transition-colors">
                      <GlitchText text={work.title} />
                    </h3>
                  </div>
                  <div className="flex flex-col md:items-end">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-1">
                      {work.tag}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">
                      {work.client} // {work.year}
                    </span>
                  </div>
                  <div className="hidden lg:block relative w-32 aspect-video overflow-hidden rounded-sm opacity-0 group-hover:opacity-100 transition-opacity translate-x-10 group-hover:translate-x-0">
                    <Image
                      src={work.img}
                      alt={work.title}
                      fill
                      className="object-cover grayscale"
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          4. RECOGNITION (Awards Grid)
          ========================================== */}
      <section className="py-32 bg-[#080808]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <Reveal className="relative aspect-square md:aspect-[4/5] rounded-sm overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1200&auto=format&fit=crop"
                alt="Recognition"
                fill
                className="object-cover grayscale group-hover:scale-105 transition-transform duration-[2s]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
              <div className="absolute bottom-12 left-12">
                <div className="flex items-center gap-3 text-[10px] font-black text-[#ff003c] uppercase tracking-[0.3em]">
                  <Star className="w-4 h-4 fill-current" /> Industry Validation
                </div>
              </div>
            </Reveal>

            <div>
              <Reveal>
                <span className="text-[10px] uppercase tracking-[0.5em] font-black text-[#ff003c] mb-6 block">
                  Accolades_Log
                </span>
                <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-tight mb-12 uppercase">
                  Unverifiable <br />{" "}
                  <span className="text-white/20">Success.</span>
                </h2>

                <div className="space-y-6">
                  {RECOGNITION.map((item, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center py-6 border-b border-white/5 hover:bg-white/2 transition-colors px-4 group"
                    >
                      <div>
                        <h4 className="text-lg font-black uppercase tracking-tight text-white group-hover:text-[#ff003c] transition-colors">
                          {item.award}
                        </h4>
                        <p className="text-[10px] uppercase tracking-widest text-white/30 font-black">
                          {item.org}
                        </p>
                      </div>
                      <span className="text-[10px] font-black text-white/20">
                        {item.year}
                      </span>
                    </div>
                  ))}
                </div>

                <button className="mt-16 text-[10px] font-black uppercase tracking-[0.4em] text-[#ff003c] hover:text-white transition-colors flex items-center gap-3">
                  View_Full_Press_Kit <ArrowRight className="w-4 h-4" />
                </button>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          5. STUDIO CULTURE (Team/Process)
          ========================================== */}
      <section className="py-32 bg-[#0c0c0c] border-y border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 md:gap-32">
            <div className="lg:col-span-2">
              <Reveal>
                <span className="text-[10px] uppercase tracking-[0.5em] font-black text-[#ff003c] mb-6 block">
                  Studio_Infrastructure
                </span>
                <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-12 uppercase">
                  The <br /> <span className="text-white/10">Laboratory.</span>
                </h2>
                <p className="text-xl text-white/40 leading-relaxed font-black uppercase tracking-widest mb-16">
                  We operate as an embedded creative cell. Our team is a mix of
                  designers, creative technologists, and structural theorists.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {[
                    {
                      title: "Direct Collaboration",
                      desc: "No account managers. You speak directly to the creators responsible for your brand.",
                    },
                    {
                      title: "Deep Immersion",
                      desc: "We spend 48 hours on-site with every new client to understand their biological reality.",
                    },
                    {
                      title: "Radical Iteration",
                      desc: "We produce more work than we show. We kill 90% of our ideas to find the 10% that survive.",
                    },
                    {
                      title: "Post-Launch Audit",
                      desc: "We monitor every deployment for 6 months, optimizing for cultural resonance.",
                    },
                  ].map((feat, i) => (
                    <div key={i} className="flex gap-6">
                      <div className="text-[10px] font-black text-[#ff003c] mt-1">
                        {String(i + 1).padStart(2, "0")} //
                      </div>
                      <div>
                        <h4 className="text-sm font-black uppercase mb-2 text-white">
                          {feat.title}
                        </h4>
                        <p className="text-xs text-white/30 leading-relaxed font-bold uppercase tracking-widest">
                          {feat.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <div className="space-y-12">
              {STUDIO_LOCATIONS.map((loc, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="p-10 bg-[#080808] border border-white/5 hover:border-[#ff003c]/30 transition-all">
                    <div className="flex items-center justify-between mb-8">
                      <h4 className="text-2xl font-black uppercase tracking-tighter italic">
                        {loc.city}
                      </h4>
                      <span className="flex items-center gap-2 text-[9px] font-black text-green-500 uppercase tracking-widest">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />{" "}
                        {loc.status}
                      </span>
                    </div>
                    <p className="text-[10px] uppercase tracking-widest text-white/40 font-black leading-relaxed">
                      {loc.focus}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          6. STATS (Large Display)
          ========================================== */}
      <section className="py-24 bg-[#ff003c] text-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-2 lg:grid-cols-4 gap-16 text-center">
          {[
            { label: "Projects_Archive", val: 194, suffix: "+" },
            { label: "Countries_Reached", val: 34, suffix: "" },
            { label: "Awards_Secured", val: 67, suffix: "" },
            { label: "Identity_Systems", val: 89, suffix: "" },
          ].map((stat, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="text-5xl md:text-7xl font-black mb-4">
                <Counter to={stat.val} suffix={stat.suffix} />
              </div>
              <div className="text-[10px] font-black uppercase tracking-[0.5em]">
                {stat.label}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ==========================================
          7. FAQ (The Buffer)
          ========================================== */}
      <section className="py-32 bg-[#080808]">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none italic">
              Intel_Buffer
            </h2>
          </Reveal>

          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                q: "How do you begin a new project?",
                a: "Every engagement opens with a two-day Creative Immersion — a structured provocation session where we map your brand territory. No brief accepted beforehand.",
              },
              {
                q: "What is your minimum engagement?",
                a: "Our minimum project scope is six weeks. We do not accept one-off logo briefs. We build systems, not assets.",
              },
              {
                q: "Do you work with early-stage startups?",
                a: "Occasionally. If the ambition is sufficiently uncommon, we will consider early-stage companies on a deferred payment structure.",
              },
              {
                q: "How do you measure success?",
                a: "We set measurable KPIs (brand recall, NPS, digital engagement) and qualitative benchmarks (cultural resonance, editorial coverage) equally.",
              },
            ].map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b border-white/5"
              >
                <AccordionTrigger className="text-left text-sm uppercase font-black tracking-widest py-8 hover:text-[#ff003c] hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-white/30 leading-relaxed font-bold uppercase tracking-widest pb-8">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ==========================================
          8. MEGA FOOTER (Brutalist)
          ========================================== */}
      <footer className="bg-[#0c0c0c] pt-32 pb-12 px-6 md:px-12 border-t border-white/5 relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-32">
            <div className="lg:col-span-5">
              <Reveal>
                <div className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.85] mb-12">
                  Make <br />{" "}
                  <span
                    className="text-white/10"
                    style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}
                  >
                    something
                  </span>{" "}
                  <br /> <span className="text-[#ff003c]">brutal.</span>
                </div>
                <form
                  className="relative max-w-md"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="email"
                    placeholder="ENCRYPTED_EMAIL"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-none px-6 py-5 text-xs font-black outline-none focus:border-[#ff003c] text-white transition-all uppercase tracking-widest"
                  />
                  <button
                    type="submit"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-[#ff003c] hover:text-white transition-colors uppercase tracking-[0.4em]"
                  >
                    AUTHENTICATE
                  </button>
                </form>
              </Reveal>
            </div>

            <div className="lg:col-span-2 lg:col-start-7">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-[#ff003c] mb-10">
                Directory
              </h4>
              <ul className="space-y-4 text-[10px] font-black uppercase tracking-widest text-white/30">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Selected_Work
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Manifesto
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Process
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-[#ff003c] mb-10">
                Intel
              </h4>
              <ul className="space-y-4 text-[10px] font-black uppercase tracking-widest text-white/30">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Project_Archive
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Press_Kit
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Legal_Buffer
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Privacy_Log
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-[#ff003c] mb-10">
                Connect
              </h4>
              <ul className="space-y-4 text-[10px] font-black uppercase tracking-widest text-white/30">
                <li>
                  <Link
                    href="#"
                    className="hover:text-white transition-colors flex items-center gap-3"
                  >
                    <Globe className="w-3 h-3" /> Globe
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-white transition-colors flex items-center gap-3"
                  >
                    <Globe className="w-3 h-3" /> X_Protocol
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-white transition-colors flex items-center gap-3"
                  >
                    <Globe className="w-3 h-3" /> LinkedIn
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-10 border-t border-white/5 text-[9px] font-black uppercase tracking-widest text-white/10">
            <div className="flex items-center gap-10">
              <span>&copy; {new Date().getFullYear()} VOID Agency GmbH.</span>
              <Link href="#" className="hover:text-white transition-colors">
                Privacy_Protocol
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Terms_of_Trade
              </Link>
            </div>
            <div className="flex gap-10">
              <span>Berlin // Paris // LA</span>
              <span>Crafted with Friction</span>
            </div>
          </div>
        </div>
      </footer>

      {/* WORK MODAL (Placeholder logic) */}
      <AnimatePresence>
        {activeWork !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setActiveWork(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="bg-[#0c0c0c] border border-white/10 max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-square md:aspect-auto">
                <Image
                  src={WORK[activeWork].img}
                  alt="Work"
                  fill
                  className="object-cover grayscale brightness-50"
                />
                <div className="absolute inset-0 bg-[#ff003c]/5 mix-blend-screen" />
              </div>
              <div className="p-12 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-[#ff003c] font-black mb-4">
                    {WORK[activeWork].tag} // {WORK[activeWork].year}
                  </div>
                  <h3 className="text-4xl font-black uppercase tracking-tighter text-white mb-6 leading-none">
                    {WORK[activeWork].title}
                  </h3>
                  <p className="text-sm text-white/30 leading-relaxed font-bold uppercase tracking-widest mb-10 italic">
                    "{WORK[activeWork].client} required a total brand system
                    rebuilt from first principles. We delivered a visual
                    ideology."
                  </p>

                  <div className="grid grid-cols-1 gap-4 mb-10">
                    {WORK[activeWork].deliverables.map((d, i) => (
                      <div
                        key={i}
                        className="flex justify-between text-xs border-b border-white/5 pb-2"
                      >
                        <span className="uppercase tracking-widest text-white/20 font-black">
                          DELIVERABLE_0{i + 1}
                        </span>
                        <span className="font-black text-white/60">{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <button className="w-full py-5 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-[#ff003c] hover:text-white transition-all cursor-pointer">
                  View_Full_Case_Study
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`::-webkit-scrollbar{width:4px;background:#080808}::-webkit-scrollbar-thumb{background:#ff003c10}`}</style>
    </div>
  );
}
