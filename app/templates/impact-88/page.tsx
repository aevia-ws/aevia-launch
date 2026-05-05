"use client";
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { X, Menu, ArrowRight, Globe, Star, Clock, Check } from "lucide-react";

const PALETTE = [
  "All",
  "Gel",
  "Nail Art",
  "Manicure",
  "Pedicure",
  "Extensions",
];

const GALLERY = [
  {
    id: 1,
    style: "Nail Art",
    img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80",
    artist: "Sofia",
  },
  {
    id: 2,
    style: "Gel",
    img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80",
    artist: "Camille",
  },
  {
    id: 3,
    style: "Extensions",
    img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80",
    artist: "Léa",
  },
  {
    id: 4,
    style: "Manicure",
    img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80",
    artist: "Sofia",
  },
  {
    id: 5,
    style: "Nail Art",
    img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80",
    artist: "Camille",
  },
  {
    id: 6,
    style: "Pedicure",
    img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80",
    artist: "Léa",
  },
];

const SERVICES = [
  {
    name: "Signature Manicure",
    dur: "45m",
    price: "€55",
    desc: "Nail shaping, cuticle care, and hand massage with premium polish.",
  },
  {
    name: "Gel Gloss Coat",
    dur: "60m",
    price: "€75",
    desc: "Long-lasting gel application with LED cure — chip-free up to 3 weeks.",
  },
  {
    name: "Bespoke Nail Art",
    dur: "90m",
    price: "€120",
    desc: "Custom hand-painted designs, foils, and 3D embellishments.",
  },
  {
    name: "Full Set Extensions",
    dur: "120m",
    price: "€160",
    desc: "Acrylic or BIAB extensions sculpted to your desired length and shape.",
  },
  {
    name: "Luxury Pedicure",
    dur: "75m",
    price: "€85",
    desc: "Foot soak, exfoliation, callus removal, and gel finish.",
  },
  {
    name: "Nail Repair + Care",
    dur: "30m",
    price: "€35",
    desc: "Single-nail repair, strengthening treatment, or removal service.",
  },
];

const ARTISTS = [
  {
    name: "Sofia Reyes",
    role: "Lead Nail Artist",
    spec: "3D Floral & Crystal Art",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
  },
  {
    name: "Camille Noir",
    role: "Gel Specialist",
    spec: "French & Ombré Techniques",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
  },
  {
    name: "Léa Fontaine",
    role: "Extension Expert",
    spec: "Sculpted Acrylic & BIAB",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
  },
];

const REVIEWS = [
  {
    name: "Margot D.",
    stars: 5,
    text: "Sofia's nail art is literally museum-quality. I get stopped every week by strangers asking where I got my nails done.",
  },
  {
    name: "Elena K.",
    stars: 5,
    text: "The gel lasts 4 weeks without chipping. The salon itself is the most beautiful space — it feels like a luxury boutique.",
  },
  {
    name: "Noémie L.",
    stars: 5,
    text: "The bespoke art session was worth every cent. Camille listened to my vision and exceeded it completely.",
  },
];

function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef(null);
  const v = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={v ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

function MagBtn({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0),
    y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 }),
    sy = useSpring(y, { stiffness: 200, damping: 20 });
  const move = useCallback(
    (e: React.MouseEvent) => {
      const r = ref.current?.getBoundingClientRect();
      if (!r) return;
      x.set((e.clientX - r.left - r.width / 2) * 0.35);
      y.set((e.clientY - r.top - r.height / 2) * 0.35);
    },
    [x, y],
  );
  return (
    <motion.button
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={move}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.button>
  );
}

export default function VelvetNails() {
  const [menu, setMenu] = useState(false);
  const [filter, setFilter] = useState("All");
  const [booking, setBooking] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const filtered =
    filter === "All" ? GALLERY : GALLERY.filter((g) => g.style === filter);

  return (
    <div className="min-h-screen bg-[#fdf8f5] text-[#2a1f1a] overflow-x-hidden font-sans selection:bg-[#d4a0a0] selection:text-white">
      {/* NAV */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-700 ${scrolled ? "bg-white/95 backdrop-blur-xl border-b border-[#d4a0a0]/20 py-4" : "bg-transparent py-8"} px-6 md:px-12 flex items-center justify-between`}
      >
        <div className="flex flex-col">
          <span className="text-[9px] font-bold uppercase tracking-[.5em] text-[#d4a0a0]">
            Studio.
          </span>
          <span className="text-xl font-black tracking-tighter italic text-[#2a1f1a]">
            VELVET
            <span className="text-[#d4a0a0] not-italic font-thin"> NAILS</span>
          </span>
        </div>
        <div className="hidden lg:flex gap-10 text-[10px] font-bold uppercase tracking-widest text-[#2a1f1a]/40">
          {["Gallery", "Services", "Artists", "About"].map((l) => (
            <Link
              key={l}
              href={`#${l.toLowerCase()}`}
              className="hover:text-[#d4a0a0] transition-colors"
            >
              {l}
            </Link>
          ))}
        </div>
        <div className="flex gap-4 items-center">
          <MagBtn
            onClick={() => setBooking(true)}
            className="px-7 py-3 bg-[#2a1f1a] text-white text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-[#d4a0a0] transition-all hidden md:block"
          >
            Book Now
          </MagBtn>
          <button
            onClick={() => setMenu(true)}
            className="lg:hidden text-[#d4a0a0]"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 z-[100] bg-[#fdf8f5] p-12 flex flex-col justify-center gap-10"
          >
            <button
              onClick={() => setMenu(false)}
              className="absolute top-8 right-8 text-[#d4a0a0]"
            >
              <X className="w-8 h-8" />
            </button>
            {["Gallery", "Services", "Artists", "About"].map((l) => (
              <Link
                key={l}
                href={`#${l.toLowerCase()}`}
                onClick={() => setMenu(false)}
                className="text-5xl font-black italic text-[#d4a0a0]/40 hover:text-[#d4a0a0] transition-colors"
              >
                {l}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section className="relative min-h-[100svh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1600&q=80"
            alt="Nail art hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2a1f1a] via-[#2a1f1a]/30 to-transparent" />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 pb-20 w-full">
          <Reveal>
            <Badge className="mb-8 bg-[#d4a0a0]/20 text-[#d4a0a0] border border-[#d4a0a0]/30 backdrop-blur-sm text-[10px] font-bold uppercase tracking-widest">
              Paris // London // Milano
            </Badge>
            <h1 className="text-7xl md:text-[9rem] font-black leading-[.85] tracking-tighter text-white mb-8">
              Nail Art <br />
              <span className="italic font-thin text-[#d4a0a0]">
                as Sculpture.
              </span>
            </h1>
            <p className="text-white/50 text-lg max-w-md mb-10 font-light leading-relaxed">
              Precision nail artistry for those who treat their hands as a
              canvas. Bespoke designs. No walk-ins.
            </p>
            <div className="flex gap-5 flex-wrap">
              <MagBtn
                onClick={() => setBooking(true)}
                className="px-10 py-4 bg-[#d4a0a0] text-white text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-white hover:text-[#2a1f1a] transition-all"
              >
                Book a Session
              </MagBtn>
              <Link
                href="#gallery"
                className="px-10 py-4 border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-white/10 transition-all"
              >
                View Gallery
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-28 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter italic">
                Portfolio{" "}
                <span className="not-italic font-thin text-[#d4a0a0]">
                  Archive.
                </span>
              </h2>
              <div className="flex gap-3 flex-wrap">
                {PALETTE.map((p) => (
                  <button
                    key={p}
                    onClick={() => setFilter(p)}
                    className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all
                    ${filter === p ? "bg-[#2a1f1a] text-white border-[#2a1f1a]" : "border-[#2a1f1a]/10 text-[#2a1f1a]/50 hover:border-[#d4a0a0]"}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
          >
            <AnimatePresence>
              {filtered.map((g, i) => (
                <motion.div
                  key={g.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.05 }}
                  className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
                >
                  <Image
                    src={g.img}
                    alt={g.style}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-[#2a1f1a]/70 flex flex-col items-center justify-center gap-3"
                  >
                    <span className="text-white text-sm font-black uppercase tracking-widest">
                      {g.style}
                    </span>
                    <span className="text-[#d4a0a0] text-[10px] uppercase tracking-widest">
                      by {g.artist}
                    </span>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-28 px-6 md:px-12 bg-[#faf4f0]">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter italic mb-20">
              The{" "}
              <span className="not-italic font-thin text-[#d4a0a0]">Menu.</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.07}>
                <div className="p-8 bg-white border border-[#d4a0a0]/10 rounded-2xl hover:border-[#d4a0a0] transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-black italic">{s.name}</h3>
                    <span className="text-[#d4a0a0] font-black text-lg">
                      {s.price}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[9px] font-bold text-[#2a1f1a]/30 uppercase tracking-widest mb-5">
                    <Clock className="w-3 h-3" />
                    {s.dur}
                  </div>
                  <p className="text-sm text-[#2a1f1a]/50 leading-relaxed font-light italic mb-8">
                    {s.desc}
                  </p>
                  <button
                    onClick={() => setBooking(true)}
                    className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-widest text-[#d4a0a0] group-hover:gap-5 transition-all"
                  >
                    Book this <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ARTISTS */}
      <section id="artists" className="py-28 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter italic mb-20">
              The{" "}
              <span className="not-italic font-thin text-[#d4a0a0]">
                Artisans.
              </span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ARTISTS.map((a, i) => (
              <Reveal key={a.name} delay={i * 0.1}>
                <div className="group text-center">
                  <div className="relative aspect-square rounded-full overflow-hidden mb-6 mx-auto w-48 border-4 border-[#d4a0a0]/20 group-hover:border-[#d4a0a0] transition-all">
                    <Image
                      src={a.img}
                      alt={a.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <h3 className="text-xl font-black italic mb-1">{a.name}</h3>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#d4a0a0] mb-2">
                    {a.role}
                  </p>
                  <p className="text-sm text-[#2a1f1a]/40 italic font-light">
                    {a.spec}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-24 px-6 md:px-12 bg-[#2a1f1a] text-white">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter italic mb-16 text-center">
              Client{" "}
              <span className="not-italic font-thin text-[#d4a0a0]">Love.</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS.map((r, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="p-8 border border-white/5 rounded-2xl bg-white/5">
                  <div className="flex gap-1 mb-4">
                    {[...Array(r.stars)].map((_, j) => (
                      <Star
                        key={j}
                        className="w-4 h-4 fill-[#d4a0a0] text-[#d4a0a0]"
                      />
                    ))}
                  </div>
                  <p className="text-white/60 italic font-light leading-relaxed mb-6">
                    "{r.text}"
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#d4a0a0]">
                    {r.name}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-28 px-6 md:px-12">
        <div className="max-w-2xl mx-auto">
          <Reveal>
            <h2 className="text-4xl font-black italic tracking-tighter mb-16 text-center">
              FAQ{" "}
              <span className="not-italic font-thin text-[#d4a0a0]">
                Studio.
              </span>
            </h2>
          </Reveal>
          <Accordion type="single" collapsible className="space-y-4">
            {[
              {
                q: "Do I need to book in advance?",
                a: "Yes — Velvet Nails is appointment-only. We recommend booking 48–72 hours ahead, especially for bespoke nail art sessions.",
              },
              {
                q: "How long does gel last?",
                a: "Our gel services are designed to last 3–4 weeks without chipping, using premium Gelish and CND Shellac formulations.",
              },
              {
                q: "Can I bring my own design inspiration?",
                a: "Absolutely. Bring photos, mood boards, or Pantone codes. Our artists will review your references and advise on technical feasibility.",
              },
              {
                q: "Do you offer nail removal?",
                a: "Yes. Safe removal is included for any service upgrading from a previous set. Standalone removal sessions start at €35.",
              },
            ].map((f, i) => (
              <AccordionItem
                key={i}
                value={`f${i}`}
                className="border-b border-[#d4a0a0]/15 px-2"
              >
                <AccordionTrigger className="text-sm font-bold tracking-wide py-6 hover:text-[#d4a0a0] hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-[#2a1f1a]/50 italic font-light leading-relaxed pb-6">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-[#d4a0a0]/10 pt-24 pb-10 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
          <div className="md:col-span-5">
            <span className="text-2xl font-black italic tracking-tighter">
              VELVET
              <span className="text-[#d4a0a0] not-italic font-thin">
                {" "}
                NAILS
              </span>
            </span>
            <p className="text-[#2a1f1a]/30 text-[10px] uppercase tracking-widest font-bold leading-loose mt-6 max-w-xs italic">
              Precision nail artistry. Appointment-only. Paris, London & Milano.
            </p>
            <div className="flex gap-3 mt-8">
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-[#d4a0a0]/20 flex items-center justify-center text-[#d4a0a0] hover:bg-[#d4a0a0] hover:text-white transition-all"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>
          <div className="md:col-span-3 md:col-start-7">
            <h4 className="text-[10px] font-bold uppercase tracking-widest mb-8 text-[#2a1f1a]/50">
              Services
            </h4>
            <ul className="space-y-3 text-[10px] font-bold uppercase tracking-widest text-[#2a1f1a]/25">
              {[
                "Manicure",
                "Gel Polish",
                "Nail Art",
                "Extensions",
                "Pedicure",
              ].map((l) => (
                <li key={l}>
                  <Link
                    href="#"
                    className="hover:text-[#d4a0a0] transition-colors"
                  >
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-3">
            <h4 className="text-[10px] font-bold uppercase tracking-widest mb-8 text-[#2a1f1a]/50">
              Studio
            </h4>
            <ul className="space-y-3 text-[10px] font-bold uppercase tracking-widest text-[#2a1f1a]/25">
              {[
                "Our Artists",
                "Booking",
                "Gift Cards",
                "Globe",
                "Contact",
              ].map((l) => (
                <li key={l}>
                  <Link
                    href="#"
                    className="hover:text-[#d4a0a0] transition-colors"
                  >
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto pt-8 border-t border-[#d4a0a0]/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] font-bold uppercase tracking-widest text-[#2a1f1a]/15">
          <span>
            © {new Date().getFullYear()} Velvet Nails Studio. All rights
            reserved.
          </span>
          <span>Made with care — for hands that deserve it.</span>
        </div>
      </footer>

      {/* BOOKING MODAL */}
      <AnimatePresence>
        {booking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setBooking(false)}
            className="fixed inset-0 z-[200] bg-[#2a1f1a]/80 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-10 max-w-md w-full shadow-2xl relative"
            >
              <button
                onClick={() => setBooking(false)}
                className="absolute top-6 right-6 text-[#d4a0a0]"
              >
                <X className="w-6 h-6" />
              </button>
              <h3 className="text-2xl font-black italic mb-2">
                Book a Session
              </h3>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#2a1f1a]/30 mb-8">
                Appointment-only studio
              </p>
              <div className="space-y-4 mb-8">
                <input
                  type="text"
                  placeholder="FULL_NAME"
                  className="w-full border border-[#d4a0a0]/20 rounded-xl px-5 py-3 text-xs font-bold uppercase tracking-widest outline-none focus:border-[#d4a0a0] transition-all"
                />
                <input
                  type="email"
                  placeholder="EMAIL_ADDRESS"
                  className="w-full border border-[#d4a0a0]/20 rounded-xl px-5 py-3 text-xs font-bold uppercase tracking-widest outline-none focus:border-[#d4a0a0] transition-all"
                />
                <select className="w-full border border-[#d4a0a0]/20 rounded-xl px-5 py-3 text-xs font-bold uppercase tracking-widest outline-none focus:border-[#d4a0a0] transition-all appearance-none">
                  <option>SELECT_SERVICE</option>
                  {SERVICES.map((s) => (
                    <option key={s.name}>{s.name}</option>
                  ))}
                </select>
                <input
                  type="date"
                  className="w-full border border-[#d4a0a0]/20 rounded-xl px-5 py-3 text-xs font-bold uppercase tracking-widest outline-none focus:border-[#d4a0a0] transition-all"
                />
              </div>
              <button className="w-full py-4 bg-[#2a1f1a] text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-[#d4a0a0] transition-all">
                Confirm Appointment
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`::-webkit-scrollbar{width:4px;background:#fdf8f5}::-webkit-scrollbar-thumb{background:#d4a0a0}`}</style>
    </div>
  );
}
