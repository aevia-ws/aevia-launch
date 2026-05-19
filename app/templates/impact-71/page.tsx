// @ts-nocheck
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
import { useState, useRef, useEffect, useCallback } from "react";
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
import { Heart, Star, Check, Menu, X, Globe, Clock, Quote, Search, ShoppingBag, Leaf, Wind, Droplets, Sun, Moon, Sparkles, Activity, Mail, MapPin, Phone, Plus, ArrowRight, ArrowUpRight, ChevronRight } from "lucide-react";

import "../premium.css";

/* ==========================================================================
   DATA STRUCTURES
   ========================================================================= */

const CLASSES = [
  {
    id: 1,
    title: "Vinyasa Flow",
    level: "All Levels",
    duration: "60 min",
    intensity: "Medium",
    img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
    desc: "A dynamic sequence of postures that breath-synchronizes movement to build heat and flexibility.",
  },
  {
    id: 2,
    title: "Yin & Sound Bath",
    level: "Beginner",
    duration: "90 min",
    intensity: "Low",
    img: "https://images.unsplash.com/photo-1599447421416-3414500d18a5?w=800&q=80",
    desc: "Deep connective tissue release paired with meditative crystal bowl frequencies.",
  },
  {
    id: 3,
    title: "Ashtanga Primary",
    level: "Advanced",
    duration: "75 min",
    intensity: "High",
    img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
    desc: "The traditional rigorous series focusing on breath, bandhas, and drishti for internal purification.",
  },
  {
    id: 4,
    title: "Hatha Awakening",
    level: "All Levels",
    duration: "60 min",
    intensity: "Low",
    img: "https://images.unsplash.com/photo-1510894347713-fc3ad69df939?w=800&q=80",
    desc: "Foundational postures held longer to align the body and quiet the central nervous system.",
  },
];

const TEACHERS = [
  {
    name: "Maya Sterling",
    specialty: "Vinyasa & Meditation",
    avatar: "MS",
    img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80",
  },
  {
    name: "Julian Zen",
    specialty: "Ashtanga & Pranayama",
    avatar: "JZ",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
  },
  {
    name: "Elena Rose",
    specialty: "Yin & Sound Healing",
    avatar: "ER",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
  },
];

const SCHEDULE = [
  {
    time: "07:00",
    class: "Hatha Awakening",
    teacher: "Maya Sterling",
    type: "Morning",
  },
  {
    time: "09:00",
    class: "Vinyasa Flow",
    teacher: "Maya Sterling",
    type: "Flow",
  },
  {
    time: "12:30",
    class: "Lunch Express",
    teacher: "Julian Zen",
    type: "Power",
  },
  {
    time: "17:30",
    class: "Ashtanga Primary",
    teacher: "Julian Zen",
    type: "Advanced",
  },
  {
    time: "19:30",
    class: "Yin & Sound Bath",
    teacher: "Elena Rose",
    type: "Relax",
  },
];

/* ==========================================================================
   UTILITY COMPONENTS
   ========================================================================= */

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
      transition={{ duration: 1, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Counter({
  to,
  prefix = "",
  suffix = "",
}: {
  to: number;
  prefix?: string;
  suffix?: string;
}) {
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
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

function MagneticBtn({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouse = useCallback(
    (e: React.MouseEvent) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
      y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
    },
    [x, y],
  );

  const reset = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.button
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.button>
  );
}

/* ==========================================================================
   MAIN PAGE COMPONENT
   ========================================================================= */

export default function ZenSpacePage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeClass, setActiveClass] = useState<number | null>(null);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="premium-theme min-h-screen bg-[#faf9f6] text-[#33302c] font-sans selection:bg-[#e8e4db] selection:text-[#33302c] overflow-x-hidden"
      style={{ scrollBehavior: "smooth" }}
    >
      {/* ==========================================
          NAVIGATION
          ========================================== */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-1000 ${scrolled ? "bg-[#faf9f6]/95 backdrop-blur-md py-4 border-b border-stone-200/50 shadow-sm" : "bg-transparent py-10"}`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="flex flex-col items-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-stone-400 mb-1">
              Sanctuary.
            </span>
            <span className="text-xl md:text-2xl font-light tracking-[0.4em] uppercase text-[#33302c]">
              ZEN<span className="text-[#c9a84c]">SPACE</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">
            <Link
              href="#classes"
              className="hover:text-[#c9a84c] transition-colors"
            >
              Practices
            </Link>
            <Link
              href="#schedule"
              className="hover:text-[#c9a84c] transition-colors"
            >
              Timetable
            </Link>
            <Link
              href="#teachers"
              className="hover:text-[#c9a84c] transition-colors"
            >
              Guides
            </Link>
            <Link
              href="#about"
              className="hover:text-[#c9a84c] transition-colors"
            >
              Ethos
            </Link>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden xl:flex flex-col items-end">
              <span className="text-[9px] font-bold text-stone-300 uppercase tracking-widest">
                Morning Ritual
              </span>
              <span className="text-[11px] font-bold text-[#c9a84c] flex items-center gap-1">
                LIVE AT 07:00 <Sun className="w-3 h-3" />
              </span>
            </div>
            <MagneticBtn className="px-8 py-3 bg-[#33302c] text-[#faf9f6] text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-[#c9a84c] transition-all">
              BOOK_MAT
            </MagneticBtn>
            <button onClick={() => setMenuOpen(true)} className="lg:hidden">
              <Menu className="w-6 h-6 text-stone-500" />
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
            className="fixed inset-0 z-[100] bg-[#faf9f6] p-8 pt-32 flex flex-col border-l border-stone-200"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-10 right-8 text-stone-400"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="flex flex-col gap-10 text-5xl font-light tracking-tighter uppercase italic text-stone-400">
              <Link href="#classes" onClick={() => setMenuOpen(false)}>
                Practices
              </Link>
              <Link href="#schedule" onClick={() => setMenuOpen(false)}>
                Timetable
              </Link>
              <Link href="#teachers" onClick={() => setMenuOpen(false)}>
                Guides
              </Link>
              <Link href="#about" onClick={() => setMenuOpen(false)}>
                Ethos
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==========================================
          1. HERO (Minimal Zen)
          ========================================== */}
      <section
        ref={heroRef}
        className="relative w-full h-[100svh] flex flex-col justify-center overflow-hidden"
      >
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1600&q=80"
            alt="Zen Hero"
            fill
            className="object-cover opacity-30 grayscale-[0.5]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#faf9f6] via-transparent to-[#faf9f6]" />
        </motion.div>

        {/* SOFT GLOWS */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#e8e4db]/40 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#c9a84c]/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full">
          <Reveal>
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-stone-100/50 backdrop-blur-md rounded-full border border-stone-200/50 text-stone-500 text-[10px] font-bold uppercase tracking-widest mb-10 shadow-sm">
              <Leaf className="w-3.5 h-3.5 text-[#c9a84c]" />
              Silence is the Language of the Soul
            </div>
            <h1 className="text-7xl md:text-9xl lg:text-[11rem] font-light leading-[0.8] tracking-tighter mb-12 uppercase italic text-[#33302c]">
              Find Your <br />{" "}
              <span className="text-[#c9a84c]">Stillness.</span>
            </h1>
            <p className="max-w-xl text-lg md:text-xl text-stone-400 leading-relaxed font-light mb-12 italic tracking-tight">
              A architectural sanctuary in the heart of the city. We provide the
              space, the breath, and the ancient wisdom for modern evolution.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <MagneticBtn className="px-12 py-5 bg-[#33302c] text-[#faf9f6] text-[10px] font-bold uppercase tracking-[0.4em] rounded-full hover:bg-[#c9a84c] transition-all cursor-pointer shadow-2xl">
                Discover Practices
              </MagneticBtn>
              <button className="px-12 py-5 border border-stone-200 text-stone-400 text-[10px] font-bold uppercase tracking-[0.4em] rounded-full hover:bg-stone-50 transition-all cursor-pointer">
                Our_Ethos
              </button>
            </div>
          </Reveal>
        </div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute bottom-10 right-12 hidden md:block"
        >
          <div className="flex flex-col items-end gap-3 text-right">
            <span className="text-[9px] font-bold text-stone-300 uppercase tracking-[0.5em]">
              GENEVA // KYOTO // LONDON
            </span>
            <div className="w-32 h-[1px] bg-[#c9a84c]/40" />
          </div>
        </motion.div>
      </section>

      {/* ==========================================
          2. THE RITUAL (Process)
          ========================================== */}
      <section
        id="about"
        className="py-32 bg-[#faf9f6] border-y border-stone-200/30"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-32 items-center">
            <div className="lg:col-span-5">
              <Reveal>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#c9a84c] mb-6 block">
                  The Zen Method
                </span>
                <h2 className="text-5xl md:text-7xl font-light tracking-tighter leading-tight mb-12 text-[#33302c] uppercase italic">
                  Breath <br />{" "}
                  <span className="text-[#c9a84c] not-italic">As Alchemy.</span>
                </h2>
                <p className="text-lg text-stone-400 leading-relaxed font-light mb-16 uppercase tracking-tight italic">
                  Nous fusionnons les asanas traditionnels avec une approche
                  neurologique contemporaine pour réinitialiser votre système
                  nerveux en 60 minutes.
                </p>

                <div className="space-y-10">
                  {[
                    {
                      label: "Mindfulness Accuracy",
                      val: 100,
                      suffix: "%",
                      desc: "Every practice is led by RYT-500 certified guides with deep meditation lineage.",
                    },
                    {
                      label: "Cortisol Reduction",
                      val: 42,
                      suffix: "%",
                      desc: "Clinically proven decrease in stress markers after a single Yin session.",
                    },
                    {
                      label: "Community Members",
                      val: 840,
                      suffix: "+",
                      desc: "A curated family of conscious souls growing together in stillness.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="group border-l border-[#c9a84c]/20 pl-8 hover:border-[#c9a84c] transition-all"
                    >
                      <h4 className="text-sm font-bold uppercase tracking-tight mb-2 text-stone-500">
                        {item.label}
                      </h4>
                      <div className="text-3xl font-black text-[#c9a84c] mb-2 uppercase italic tabular-nums">
                        <Counter to={item.val} suffix={item.suffix} />
                      </div>
                      <p className="text-[10px] text-stone-300 leading-relaxed font-bold uppercase tracking-widest">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Reveal className="relative aspect-[4/5] md:aspect-video rounded-3xl overflow-hidden shadow-2xl border border-stone-200/50 bg-white p-1 group">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.05)_0%,transparent_70%)] animate-pulse" />
                <div className="relative h-full w-full border border-stone-200/50 bg-[#faf9f6] p-8 flex flex-col justify-between overflow-hidden">
                  <div className="flex items-center justify-between mb-10 pb-6 border-b border-stone-200/50">
                    <div className="flex items-center gap-4">
                      <Wind className="w-5 h-5 text-[#c9a84c]" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c9a84c]">
                        Atmospheric_Purity_Log
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-1.5 h-1.5 bg-[#c9a84c] rounded-full animate-pulse" />
                      <div className="w-1.5 h-1.5 bg-[#c9a84c]/30 rounded-full" />
                    </div>
                  </div>

                  <div className="space-y-6">
                    {[
                      {
                        label: "Air Filtration",
                        val: "HEPA-13 Nano",
                        icon: <Wind className="w-4 h-4" />,
                      },
                      {
                        label: "Soundscape",
                        val: "432Hz Harmonic",
                        icon: <Activity className="w-4 h-4" />,
                      },
                      {
                        label: "Scent Ritual",
                        val: "Mysore Sandalwood",
                        icon: <Sparkles className="w-4 h-4" />,
                      },
                      {
                        label: "Floor System",
                        val: "Anti-Shock Oak",
                        icon: <Leaf className="w-4 h-4" />,
                      },
                    ].map((spec, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-4 bg-white/50 border border-stone-200/30 rounded-xl hover:border-[#c9a84c]/30 transition-all"
                      >
                        <div className="flex items-center gap-4">
                          <div className="text-[#c9a84c]">{spec.icon}</div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-stone-500">
                            {spec.label}
                          </span>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#c9a84c] italic">
                          {spec.val}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-12 flex justify-between items-end">
                    <div className="space-y-1">
                      <span className="text-[9px] font-bold text-stone-300 uppercase tracking-widest">
                        Sanctuary Capacity
                      </span>
                      <div className="text-2xl font-black text-stone-500 italic">
                        12 Mats per Session
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="flex flex-col items-end">
                        <span className="text-[8px] font-bold text-[#c9a84c] uppercase">
                          Certified
                        </span>
                        <span className="text-[10px] font-black uppercase text-stone-500">
                          Yoga Alliance RYS
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          3. PRACTICES (Grid)
          ========================================== */}
      <section id="classes" className="py-32 bg-[#faf9f6]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
            <Reveal>
              <h2 className="text-5xl md:text-8xl font-light tracking-tighter uppercase leading-[0.9] text-[#33302c] italic">
                The <br /> <span className="text-[#c9a84c]">Practices.</span>
              </h2>
            </Reveal>
            <p className="max-w-sm text-sm text-stone-400 leading-relaxed font-bold uppercase tracking-widest italic text-right">
              Explore our signature lineages. From rigorous Ashtanga to
              restorative Yin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {CLASSES.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.1}>
                <div
                  onClick={() => setActiveClass(i)}
                  className="group cursor-pointer bg-white border border-stone-200/50 hover:border-[#c9a84c]/40 transition-all rounded-3xl p-4 shadow-sm overflow-hidden"
                >
                  <div className="relative aspect-square rounded-2xl overflow-hidden mb-8">
                    <Image
                      src={p.img}
                      alt={p.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-stone-900/10" />
                  </div>
                  <div className="px-4 pb-4">
                    <span className="text-[10px] uppercase tracking-widest text-[#c9a84c] font-black mb-2 block">
                      {p.level}
                    </span>
                    <h3 className="text-xl font-light tracking-tight mb-4 text-[#33302c] truncate uppercase italic">
                      {p.title}
                    </h3>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-black text-stone-300 italic">
                        {p.duration}
                      </span>
                      <button className="p-3 bg-[#33302c] text-[#faf9f6] rounded-full hover:bg-[#c9a84c] transition-all">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          4. SCHEDULE (Timetable)
          ========================================== */}
      <section
        id="schedule"
        className="py-32 bg-[#faf9f6] border-y border-stone-200/30"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
          <Reveal className="max-w-2xl mx-auto mb-20">
            <span className="text-[10px] uppercase tracking-[0.5em] font-black text-[#c9a84c] mb-6 block">
              Weekly Flow
            </span>
            <h2 className="text-5xl md:text-7xl font-light tracking-tighter uppercase italic text-[#33302c]">
              The Timetable.
            </h2>
          </Reveal>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans">
              <thead>
                <tr className="border-b border-stone-200/50 text-[10px] uppercase tracking-widest text-stone-400">
                  <th className="pb-8 font-black">Time_Slot</th>
                  <th className="pb-8 font-black">Practice_Name</th>
                  <th className="pb-8 font-black">Guide</th>
                  <th className="pb-8 font-black">Energy_Type</th>
                  <th className="pb-8 font-black text-right">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {SCHEDULE.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-stone-100 hover:bg-stone-50 transition-colors group"
                  >
                    <td className="py-8 font-black text-stone-300 tabular-nums">
                      {row.time}
                    </td>
                    <td className="py-8 font-light text-[#33302c] group-hover:text-[#c9a84c] transition-colors uppercase italic tracking-tight text-lg">
                      {row.class}
                    </td>
                    <td className="py-8 text-stone-400 uppercase tracking-widest text-[10px] font-bold">
                      {row.teacher}
                    </td>
                    <td className="py-8">
                      <Badge className="bg-stone-100 text-stone-500 border-none text-[9px] uppercase tracking-widest px-3 py-1 font-black">
                        {row.type}
                      </Badge>
                    </td>
                    <td className="py-8 text-right">
                      <button className="text-[9px] font-black uppercase tracking-widest text-[#c9a84c] hover:text-[#33302c] transition-colors">
                        Reserve_Mat
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ==========================================
          5. GUIDES (Teachers)
          ========================================== */}
      <section id="teachers" className="py-32 bg-[#faf9f6]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <Reveal className="mb-20 text-center">
            <h2 className="text-5xl md:text-7xl font-light tracking-tighter uppercase italic text-[#33302c]">
              Your <span className="text-[#c9a84c]">Guides.</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {TEACHERS.map((t, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="group text-center">
                  <div className="relative aspect-[3/4] rounded-3xl overflow-hidden mb-8 border border-stone-200/50">
                    <Image
                      src={t.img}
                      alt={t.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-1000 grayscale-[0.2]"
                    />
                    <div className="absolute inset-0 bg-stone-900/10 mix-blend-overlay" />
                  </div>
                  <h4 className="text-xl font-light tracking-tight text-[#33302c] uppercase italic mb-2">
                    {t.name}
                  </h4>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#c9a84c]">
                    {t.specialty}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          6. PRICING (Membership)
          ========================================== */}
      <section className="py-32 bg-[#33302c] text-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <Reveal className="max-w-2xl mx-auto mb-24 text-center">
            <span className="text-[10px] uppercase tracking-[0.5em] font-black text-[#c9a84c] mb-6 block">
              The Membership
            </span>
            <h2 className="text-5xl md:text-8xl font-light tracking-tighter uppercase italic mb-8">
              Sacred <br /> <span className="text-[#c9a84c]">Tiers.</span>
            </h2>
            <p className="text-white/40 italic font-medium leading-relaxed uppercase tracking-tight">
              Invest in your evolution. We offer flexible memberships designed
              for the dedicated practitioner.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/10 rounded-3xl overflow-hidden">
            {[
              {
                title: "Trial Ritual",
                val: "€45",
                desc: "Un accès illimité de 7 jours pour découvrir notre sanctuaire et nos guides.",
                features: [
                  "7 Days Unlimited",
                  "Locker Access",
                  "Mat & Towel Rental",
                  "Consultation",
                ],
              },
              {
                title: "Sanctuary Pass",
                val: "€160",
                desc: "L'abonnement mensuel standard pour le pratiquant régulier. Sans engagement.",
                features: [
                  "Unlimited Classes",
                  "Priority Booking",
                  "Member Workshops",
                  "Guest Passes (1/mo)",
                ],
              },
              {
                title: "Eternal Path",
                val: "€1400",
                desc: "Accès illimité d'un an avec accompagnement personnalisé et retraites exclusives.",
                features: [
                  "Annual Unlimited",
                  "1:1 Private Session",
                  "Retreat Discount",
                  "Private Locker",
                ],
              },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.1} className="h-full">
                <div className="p-12 border-r border-white/10 last:border-r-0 hover:bg-white/[0.02] transition-all flex flex-col h-full">
                  <div className="text-3xl font-black text-[#c9a84c] mb-6 italic">
                    {item.val}
                  </div>
                  <h4 className="text-lg font-light uppercase tracking-widest text-white mb-6 italic">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-white/40 leading-relaxed font-bold uppercase tracking-widest italic mb-10 flex-1">
                    {item.desc}
                  </p>
                  <ul className="space-y-4 mb-12">
                    {item.features.map((f, j) => (
                      <li
                        key={j}
                        className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-white/60"
                      >
                        <Check className="w-3.5 h-3.5 text-[#c9a84c]" /> {f}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full py-5 border border-[#c9a84c] text-[#c9a84c] text-[10px] font-bold uppercase tracking-widest hover:bg-[#c9a84c] hover:text-[#33302c] transition-all cursor-pointer">
                    ENROLL_NOW
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          7. FAQ (The Buffer)
          ========================================== */}
      <section className="py-32 bg-[#faf9f6]">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-light tracking-tighter leading-none uppercase italic text-[#33302c]">
              Zen_Buffer
            </h2>
          </Reveal>

          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                q: "Je suis débutant, par où commencer ?",
                a: "Nous recommandons le cours 'Hatha Awakening' ou 'Yin' pour commencer. Nos guides adaptent chaque posture selon votre niveau actuel.",
              },
              {
                q: "Faut-il apporter son propre tapis ?",
                a: "Nous fournissons des tapis Lululemon haut de gamme et des serviettes purifiées. Vous pouvez bien sûr apporter le vôtre si vous préférez.",
              },
              {
                q: "Quelle est votre politique d'annulation ?",
                a: "Toute réservation peut être annulée sans frais jusqu'à 6 heures avant le début du cours via l'application ZenSpace.",
              },
              {
                q: "Proposez-vous des cours privés ?",
                a: "Oui, nos guides sont disponibles pour des sessions 1:1 personnalisées selon vos objectifs spécifiques (flexibilité, force, méditation).",
              },
            ].map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b border-stone-200/50"
              >
                <AccordionTrigger className="text-left text-sm uppercase font-bold tracking-widest py-8 hover:text-[#c9a84c] hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-stone-400 leading-relaxed font-bold uppercase tracking-widest pb-8 italic">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ==========================================
          8. MEGA FOOTER (Premium Minimal)
          ========================================== */}
      <footer className="bg-[#1a1814] pt-32 pb-12 px-6 md:px-12 border-t border-white/5 relative overflow-hidden text-white">
        <div className="max-w-[1600px] mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-32">
            <div className="lg:col-span-5">
              <Reveal>
                <div className="flex flex-col mb-10">
                  <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-white/20 mb-1">
                    Sanctuary.
                  </span>
                  <span className="text-2xl font-light tracking-[0.4em] uppercase text-white">
                    ZEN<span className="text-[#c9a84c]">SPACE</span>
                  </span>
                </div>
                <p className="text-white/20 max-w-sm mb-12 uppercase tracking-widest text-[10px] font-bold leading-relaxed italic">
                  A architectural sanctuary designed for the conscious evolution
                  of mind and body. Est. 2026.
                </p>
                <form
                  className="relative max-w-md"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="email"
                    placeholder="ENROLL_IN_THE_MANIFESTO"
                    className="w-full bg-white/[0.02] border border-white/5 rounded-none px-6 py-4 text-xs font-bold outline-none focus:border-[#c9a84c] text-white transition-all uppercase tracking-widest"
                  />
                  <button
                    type="submit"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-[#c9a84c] hover:text-white transition-colors uppercase tracking-[0.3em]"
                  >
                    ENROLL
                  </button>
                </form>
              </Reveal>
            </div>

            <div className="lg:col-span-2 lg:col-start-7">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#c9a84c] mb-10">
                Practices
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/20">
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#c9a84c] transition-colors"
                  >
                    Vinyasa_Flow
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#c9a84c] transition-colors"
                  >
                    Ashtanga_Rigour
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#c9a84c] transition-colors"
                  >
                    Yin_Stillness
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#c9a84c] transition-colors"
                  >
                    Meditation_Core
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#c9a84c] mb-10">
                Sanctuary
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/20">
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#c9a84c] transition-colors"
                  >
                    Our_Ethos
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#c9a84c] transition-colors"
                  >
                    Guide_Profiles
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#c9a84c] transition-colors"
                  >
                    Studio_Tour
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#c9a84c] transition-colors"
                  >
                    Boutique
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#c9a84c] mb-10">
                Terminal
              </h4>
              <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-white/20">
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#c9a84c] transition-colors flex items-center gap-3"
                  >
                    <Globe className="w-3 h-3" /> Globe
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#c9a84c] transition-colors flex items-center gap-3"
                  >
                    <Mail className="w-3 h-3" /> Contact_Control
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-[#c9a84c] transition-colors flex items-center gap-3"
                  >
                    <MapPin className="w-3 h-3" /> Find_Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-10 border-t border-white/5 text-[9px] font-bold uppercase tracking-widest text-white/10">
            <div className="flex items-center gap-10">
              <span>
                &copy; {new Date().getFullYear()} ZEN SPACE Wellness Ltd.
              </span>
              <Link href="#" className="hover:text-white transition-colors">
                Regulatory_Terms
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Privacy_Buffer
              </Link>
            </div>
            <div className="flex gap-10">
              <span>Geneva // Kyoto // London</span>
              <span>In Silence We Grow</span>
            </div>
          </div>
        </div>
      </footer>

      {/* CLASS MODAL */}
      <AnimatePresence>
        {activeClass !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6"
            onClick={() => setActiveClass(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="bg-[#faf9f6] border border-stone-200/50 max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-3xl shadow-2xl relative text-[#33302c]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveClass(null)}
                className="absolute top-8 right-8 text-stone-300 hover:text-[#c9a84c] transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="relative aspect-square md:aspect-auto">
                <Image
                  src={CLASSES[activeClass].img}
                  alt="Class"
                  fill
                  className="object-cover brightness-95"
                />
              </div>
              <div className="p-12 flex flex-col justify-between bg-white">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-[#c9a84c] font-black mb-4">
                    Practice Detail // {CLASSES[activeClass].level}
                  </div>
                  <h3 className="text-4xl font-light uppercase tracking-tighter italic text-[#33302c] mb-6 leading-none">
                    {CLASSES[activeClass].title}
                  </h3>
                  <p className="text-sm text-stone-400 leading-relaxed font-bold mb-10 italic">
                    "{CLASSES[activeClass].desc}"
                  </p>

                  <div className="grid grid-cols-1 gap-4 mb-10">
                    {[
                      { label: "Duration", val: CLASSES[activeClass].duration },
                      {
                        label: "Intensity",
                        val: CLASSES[activeClass].intensity,
                      },
                      { label: "Linéage", val: "Traditional Hatha" },
                      { label: "Props", val: "All Provided" },
                    ].map((s, i) => (
                      <div
                        key={i}
                        className="flex justify-between text-[10px] border-b border-stone-100 pb-2 font-sans"
                      >
                        <span className="uppercase tracking-widest text-stone-300 font-black">
                          {s.label}
                        </span>
                        <span className="font-black text-[#c9a84c] italic">
                          {s.val}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <button className="w-full py-5 bg-[#33302c] text-[#faf9f6] text-[10px] font-bold uppercase tracking-widest hover:bg-[#c9a84c] transition-all cursor-pointer shadow-xl">
                    RESERVE_MAT
                  </button>
                  <button className="w-full py-5 border border-stone-200 text-stone-400 text-[10px] font-bold uppercase tracking-widest hover:bg-[#33302c] hover:text-white transition-all cursor-pointer">
                    VIEW_PREREQUISITES
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`::-webkit-scrollbar{width:4px;background:#faf9f6}::-webkit-scrollbar-thumb{background:#e8e4db}`}</style>
    </div>
  );
}
