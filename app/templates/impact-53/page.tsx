"use client";

import {
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  motion,
  useInView,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";

// ─── TYPES ───────────────────────────────────────────────────────────────────

interface Project {
  num: string;
  name: string;
  category: string;
  year: string;
  accentColor: string;
}

interface Stat {
  value: string;
  label: string;
}

interface Service {
  num: string;
  title: string;
  desc: string;
}

// ─── DATA ────────────────────────────────────────────────────────────────────

const PROJECTS: Project[] = [
  {
    num: "01",
    name: "FORM COLLAPSE",
    category: "Identity Design",
    year: "2026",
    accentColor: "#ff3300",
  },
  {
    num: "02",
    name: "RAW SIGNAL",
    category: "Brand Strategy",
    year: "2025",
    accentColor: "#ffffff",
  },
  {
    num: "03",
    name: "DEAD WEIGHT",
    category: "Campaign Direction",
    year: "2025",
    accentColor: "#ffffff",
  },
  {
    num: "04",
    name: "GRID BREACH",
    category: "Digital Experience",
    year: "2025",
    accentColor: "#ffffff",
  },
  {
    num: "05",
    name: "NO MERCY",
    category: "Visual Identity",
    year: "2024",
    accentColor: "#ffffff",
  },
  {
    num: "06",
    name: "HARD RESET",
    category: "Art Direction",
    year: "2024",
    accentColor: "#ffffff",
  },
];

const STATS: Stat[] = [
  { value: "06", label: "YEARS" },
  { value: "312", label: "PROJECTS" },
  { value: "48", label: "AWARDS" },
  { value: "19", label: "COUNTRIES" },
];

const SERVICES: Service[] = [
  {
    num: "S·01",
    title: "BRAND IDENTITY",
    desc: "Naming, visual systems, typographic language, colour philosophy. We build marks that outlast the trend cycle — anchored in concept, ruthless in execution.",
  },
  {
    num: "S·02",
    title: "ART DIRECTION",
    desc: "We own the visual logic from first brief to final file. Campaign concepting, set direction, editorial sequencing — the whole frame, not just the corner.",
  },
  {
    num: "S·03",
    title: "DIGITAL EXPERIENCE",
    desc: "Interaction design, motion language, front-end architecture. Websites that breathe and respond. Interfaces that reward attention.",
  },
  {
    num: "S·04",
    title: "MOTION & FILM",
    desc: "Title sequences, brand films, animated identities. We treat motion as a second language — not decoration, but argument. Every frame earns its place.",
  },
];

const MARQUEE_TEXT =
  "DESIGN · STRATEGY · CODE · IDENTITY · MOTION · DESIGN · STRATEGY · CODE · IDENTITY · MOTION · ";

const HERO_WORDS = ["WE", "BREAK.", "WE", "BUILD.", "WE", "SHIP."];

// ─── DESIGN TOKENS ───────────────────────────────────────────────────────────

const C = {
  black: "#000000",
  white: "#ffffff",
  red: "#ff3300",
  dim: "rgba(255,255,255,0.18)",
  dimDark: "rgba(255,255,255,0.06)",
};

const FONT_SYNE = "'Syne', 'Arial Black', 'Helvetica Neue', Arial, sans-serif";
const FONT_MONO = "'JetBrains Mono', 'Courier New', monospace";

// ─── GOOGLE FONTS INJECTION ───────────────────────────────────────────────────

const FONT_LINK =
  "https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&display=swap";

// ─── WORD-BY-WORD HERO REVEAL ─────────────────────────────────────────────────

function HeroWordReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-10%" });

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0 0.35em",
        lineHeight: 0.88,
      }}
    >
      {HERO_WORDS.map((word, i) => {
        const isAccent = word === "BREAK." || word === "BUILD." || word === "SHIP.";
        return (
          <span
            key={`${word}-${i}`}
            style={{
              overflow: "hidden",
              display: "inline-block",
              verticalAlign: "top",
            }}
          >
            <motion.span
              initial={{ y: "105%" }}
              animate={inView ? { y: "0%" } : { y: "105%" }}
              transition={{
                duration: 0.78,
                delay: i * 0.11,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                display: "block",
                fontFamily: FONT_SYNE,
                fontWeight: 800,
                fontSize: "clamp(4.5rem, 16vw, 13rem)",
                letterSpacing: "-0.045em",
                lineHeight: 0.88,
                color: isAccent ? C.red : C.white,
                WebkitTextStroke: isAccent ? "0px" : "0px",
              }}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </div>
  );
}

// ─── ROTATING MARQUEE BELT ────────────────────────────────────────────────────

function MarqueeBelt() {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  // Base rotation animation via CSS, velocity modifies the speed via transform
  const velocityFactor = useTransform(smoothVelocity, [-3000, 0, 3000], [-1.5, 1, 2.5], {
    clamp: false,
  });

  // We drive x offset with a motion value that we update via requestAnimationFrame
  const baseX = useMotionValue(0);

  useEffect(() => {
    let raf: number;
    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = now - lastTime;
      lastTime = now;
      const vel = velocityFactor.get();
      // Base speed: -0.04 per ms, then scale by velocity factor
      const delta = -0.04 * dt * (vel || 1);
      let next = baseX.get() + delta;
      // Wrap at -50% (two copies of the text)
      const charWidth = 100; // percent
      if (next < -charWidth) next = 0;
      if (next > 0) next = -charWidth;
      baseX.set(next);
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const x = useTransform(baseX, (v) => `${v}%`);

  return (
    <div
      style={{
        overflow: "hidden",
        borderTop: `1px solid ${C.dim}`,
        borderBottom: `1px solid ${C.dim}`,
        background: C.black,
        padding: "1.1rem 0",
        cursor: "default",
        userSelect: "none",
      }}
    >
      <motion.div
        style={{
          x,
          display: "flex",
          whiteSpace: "nowrap",
          width: "200%",
        }}
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            style={{
              width: "50%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontFamily: FONT_SYNE,
                fontWeight: 800,
                fontSize: "clamp(0.75rem, 1.5vw, 1rem)",
                letterSpacing: "0.28em",
                color: C.white,
                textTransform: "uppercase",
              }}
            >
              {MARQUEE_TEXT}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// ─── MAGNETIC BUTTON ──────────────────────────────────────────────────────────

function MagneticCTA() {
  const ref = useRef<HTMLButtonElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 220, damping: 22 });
  const springY = useSpring(rawY, { stiffness: 220, damping: 22 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const RADIUS = 100;
      if (dist < RADIUS) {
        const strength = 1 - dist / RADIUS;
        rawX.set(dx * strength * 0.4);
        rawY.set(dy * strength * 0.4);
      } else {
        rawX.set(0);
        rawY.set(0);
      }
    },
    [rawX, rawY]
  );

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{ display: "inline-block", position: "relative" }}
      onMouseMove={(e) => {
        // Proxy to button handler (wrapper is larger hit area)
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const RADIUS = 120;
        if (dist < RADIUS) {
          const strength = 1 - dist / RADIUS;
          rawX.set(dx * strength * 0.4);
          rawY.set(dy * strength * 0.4);
        }
      }}
      onMouseLeave={() => {
        rawX.set(0);
        rawY.set(0);
        setHovered(false);
      }}
    >
      <motion.button
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setHovered(true)}
        style={{
          x: springX,
          y: springY,
          fontFamily: FONT_SYNE,
          fontWeight: 800,
          fontSize: "0.72rem",
          letterSpacing: "0.22em",
          background: hovered ? C.red : C.white,
          color: hovered ? C.white : C.black,
          border: "none",
          padding: "1rem 2.2rem",
          cursor: "pointer",
          textTransform: "uppercase",
          position: "relative",
          zIndex: 1,
          transition: "background 0.15s ease, color 0.15s ease",
          boxShadow: hovered
            ? `6px 6px 0 ${C.red}, 12px 12px 0 rgba(255,51,0,0.25)`
            : "6px 6px 0 rgba(255,255,255,0.15)",
        }}
      >
        START A PROJECT
      </motion.button>
    </div>
  );
}

// ─── PROJECT ACCORDION ────────────────────────────────────────────────────────

function ProjectAccordion({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rowRef, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      style={{
        borderBottom: `1px solid ${C.dim}`,
      }}
    >
      {/* Accordion trigger row */}
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "1.6rem 2.5rem",
          display: "grid",
          gridTemplateColumns: "5rem 1fr auto auto",
          gap: "1.5rem",
          alignItems: "center",
          textAlign: "left",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background =
            "rgba(255,255,255,0.03)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "none";
        }}
      >
        <span
          style={{
            fontFamily: FONT_MONO,
            fontSize: "0.62rem",
            letterSpacing: "0.14em",
            color: C.dim,
          }}
        >
          {project.num}
        </span>

        <span
          style={{
            fontFamily: FONT_SYNE,
            fontWeight: 800,
            fontSize: "clamp(1.4rem, 3.5vw, 2.8rem)",
            letterSpacing: "-0.04em",
            lineHeight: 1,
            color: C.white,
          }}
        >
          {project.name}
        </span>

        <span
          style={{
            fontFamily: FONT_MONO,
            fontSize: "0.6rem",
            letterSpacing: "0.14em",
            color: C.dim,
            whiteSpace: "nowrap",
          }}
        >
          {project.year}
        </span>

        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "inline-flex",
            color: open ? C.red : C.dim,
            fontSize: "1.4rem",
            lineHeight: 1,
            fontFamily: FONT_SYNE,
            fontWeight: 800,
          }}
        >
          +
        </motion.span>
      </button>

      {/* Expandable preview strip */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
            layout
          >
            <div
              style={{
                display: "flex",
                gap: 0,
                margin: "0 2.5rem 1.8rem",
                height: "120px",
                overflow: "hidden",
              }}
            >
              {/* Colour block */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
                style={{
                  transformOrigin: "left",
                  background: project.accentColor === "#ff3300" ? C.red : "rgba(255,255,255,0.08)",
                  width: "8px",
                  flexShrink: 0,
                  marginRight: "2rem",
                }}
              />

              {/* Category and sub-info */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: "0.6rem",
                }}
              >
                <span
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: "0.6rem",
                    letterSpacing: "0.22em",
                    color: C.red,
                    textTransform: "uppercase",
                  }}
                >
                  {project.category}
                </span>
                <span
                  style={{
                    fontFamily: FONT_SYNE,
                    fontWeight: 800,
                    fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
                    letterSpacing: "-0.05em",
                    lineHeight: 0.9,
                    color: "rgba(255,255,255,0.07)",
                  }}
                >
                  {project.name}
                </span>
              </div>

              {/* Right arrow */}
              <div
                style={{
                  marginLeft: "auto",
                  display: "flex",
                  alignItems: "center",
                  paddingRight: "0.5rem",
                }}
              >
                <ArrowUpRight size={28} color={C.dim} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── STATS COUNTER SECTION ────────────────────────────────────────────────────

function StatCounter({ stat, index }: { stat: Stat; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      style={{
        overflow: "hidden",
        borderRight: index < 3 ? `1px solid ${C.dim}` : "none",
        padding: "3rem 2.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.4rem",
      }}
    >
      {/* Clip-path reveal for the number */}
      <motion.div
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={inView ? { clipPath: "inset(0 0% 0 0)" } : { clipPath: "inset(0 100% 0 0)" }}
        transition={{
          duration: 0.9,
          delay: index * 0.12,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{
          fontFamily: FONT_SYNE,
          fontWeight: 800,
          fontSize: "clamp(6rem, 15vw, 14rem)",
          letterSpacing: "-0.06em",
          lineHeight: 0.85,
          color: C.white,
        }}
      >
        {stat.value}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{
          duration: 0.5,
          delay: index * 0.12 + 0.35,
          ease: "easeOut",
        }}
        style={{
          fontFamily: FONT_MONO,
          fontSize: "0.68rem",
          letterSpacing: "0.3em",
          color: C.dim,
          textTransform: "uppercase",
        }}
      >
        {stat.label}
      </motion.div>
    </motion.div>
  );
}

// ─── SERVICE ROW ─────────────────────────────────────────────────────────────

function ServiceRow({ service, index }: { service: Service; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderBottom: `1px solid ${C.dim}`,
        padding: "2rem 2.5rem",
        display: "grid",
        gridTemplateColumns: "5rem 1fr 2fr auto",
        gap: "2rem",
        alignItems: "start",
        background: hovered ? "rgba(255,255,255,0.03)" : "transparent",
        transition: "background 0.2s ease",
        cursor: "default",
      }}
    >
      <span
        style={{
          fontFamily: FONT_MONO,
          fontSize: "0.6rem",
          letterSpacing: "0.15em",
          color: C.dim,
          paddingTop: "0.2rem",
        }}
      >
        {service.num}
      </span>

      <h3
        style={{
          fontFamily: FONT_SYNE,
          fontWeight: 800,
          fontSize: "clamp(1rem, 2vw, 1.4rem)",
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          color: hovered ? C.red : C.white,
          margin: 0,
          transition: "color 0.2s ease",
        }}
      >
        {service.title}
      </h3>

      <p
        style={{
          fontFamily: FONT_MONO,
          fontSize: "0.75rem",
          lineHeight: 1.65,
          letterSpacing: "0.01em",
          color: "rgba(255,255,255,0.45)",
          margin: 0,
        }}
      >
        {service.desc}
      </p>

      <motion.div
        animate={{ x: hovered ? 4 : 0, opacity: hovered ? 1 : 0.25 }}
        transition={{ duration: 0.2 }}
      >
        <ArrowUpRight size={18} color={hovered ? C.red : C.white} />
      </motion.div>
    </motion.div>
  );
}

// ─── SECTION LABEL ────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontFamily: FONT_MONO,
        fontSize: "0.62rem",
        letterSpacing: "0.28em",
        color: C.dim,
        textTransform: "uppercase",
      }}
    >
      {children}
    </span>
  );
}

// ─── SECTION HEADING ─────────────────────────────────────────────────────────

function SectionHeading({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.h2
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        fontFamily: FONT_SYNE,
        fontWeight: 800,
        fontSize: "clamp(2rem, 5vw, 4.5rem)",
        letterSpacing: "-0.045em",
        lineHeight: 0.9,
        color: C.white,
        margin: 0,
      }}
    >
      {children}
    </motion.h2>
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────

function Navbar({ onMenuOpen }: { onMenuOpen: () => void }) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 40));
    return unsub;
  }, [scrollY]);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled ? "rgba(0,0,0,0.95)" : "transparent",
        borderBottom: scrolled ? `1px solid ${C.dim}` : "1px solid transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 2.5rem",
        height: "68px",
        transition: "background 0.3s ease, border-color 0.3s ease",
      }}
    >
      {/* Wordmark */}
      <div
        style={{
          fontFamily: FONT_SYNE,
          fontWeight: 800,
          fontSize: "1.15rem",
          letterSpacing: "-0.05em",
          color: C.white,
          userSelect: "none",
        }}
      >
        MESH<span style={{ color: C.red }}>·</span>WARP
      </div>

      {/* Desktop links */}
      <div
        style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}
        className="mw-desktop-nav"
      >
        {["WORK", "STUDIO", "STATS", "SERVICES", "CONTACT"].map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            style={{
              fontFamily: FONT_MONO,
              fontWeight: 700,
              fontSize: "0.62rem",
              letterSpacing: "0.2em",
              color: C.dim,
              textDecoration: "none",
              transition: "color 0.15s ease",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color = C.white)
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color = C.dim)
            }
          >
            {link}
          </a>
        ))}
      </div>

      {/* CTA + hamburger */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <a
          href="#contact"
          style={{
            fontFamily: FONT_MONO,
            fontWeight: 700,
            fontSize: "0.62rem",
            letterSpacing: "0.2em",
            color: C.black,
            background: C.white,
            padding: "0.55rem 1.1rem",
            textDecoration: "none",
            display: "inline-block",
            transition: "background 0.15s ease, color 0.15s ease",
          }}
          className="mw-desktop-nav"
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = C.red;
            (e.currentTarget as HTMLAnchorElement).style.color = C.white;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = C.white;
            (e.currentTarget as HTMLAnchorElement).style.color = C.black;
          }}
        >
          BRIEF US
        </a>

        <button
          onClick={onMenuOpen}
          className="mw-hamburger"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: C.white,
            padding: "0.25rem",
            display: "none",
          }}
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
      </div>
    </nav>
  );
}

// ─── MOBILE MENU ──────────────────────────────────────────────────────────────

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            background: C.black,
            color: C.white,
            display: "flex",
            flexDirection: "column",
            padding: "0 2.5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: `1px solid ${C.dim}`,
              height: "68px",
            }}
          >
            <span
              style={{
                fontFamily: FONT_SYNE,
                fontWeight: 800,
                fontSize: "1.15rem",
                letterSpacing: "-0.05em",
              }}
            >
              MESH<span style={{ color: C.red }}>·</span>WARP
            </span>
            <button
              onClick={onClose}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: C.white,
                padding: "0.25rem",
              }}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          <nav
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "0.75rem",
            }}
          >
            {["WORK", "STUDIO", "STATS", "SERVICES", "CONTACT"].map(
              (link, i) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={onClose}
                  initial={{ opacity: 0, x: 32 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    fontFamily: FONT_SYNE,
                    fontWeight: 800,
                    fontSize: "clamp(2.5rem, 10vw, 5rem)",
                    letterSpacing: "-0.05em",
                    lineHeight: 0.95,
                    color: C.white,
                    textDecoration: "none",
                    display: "block",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color = C.red)
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color = C.white)
                  }
                >
                  {link}
                </motion.a>
              )
            )}
          </nav>

          <div
            style={{
              borderTop: `1px solid ${C.dim}`,
              padding: "1.5rem 0",
              fontFamily: FONT_MONO,
              fontSize: "0.62rem",
              letterSpacing: "0.22em",
              color: "rgba(255,255,255,0.25)",
            }}
          >
            PARIS, FR — EST. 2019
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── RED RULE ─────────────────────────────────────────────────────────────────

function RedRule({ delay = 0 }: { delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} style={{ overflow: "hidden" }}>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
        style={{
          transformOrigin: "left",
          height: "3px",
          background: C.red,
          marginBottom: "3rem",
        }}
      />
    </div>
  );
}

// ─── PHILOSOPHY BLOCK ─────────────────────────────────────────────────────────

function PhilosophyBlock({
  title,
  body,
  index,
}: {
  title: string;
  body: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{
        duration: 0.65,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        borderLeft: `2px solid ${C.dim}`,
        paddingLeft: "1.6rem",
      }}
    >
      <div
        style={{
          fontFamily: FONT_MONO,
          fontSize: "0.6rem",
          letterSpacing: "0.24em",
          color: C.red,
          marginBottom: "1rem",
          textTransform: "uppercase",
        }}
      >
        {title}
      </div>
      <p
        style={{
          fontFamily: FONT_MONO,
          fontSize: "0.78rem",
          lineHeight: 1.7,
          letterSpacing: "0.01em",
          color: "rgba(255,255,255,0.5)",
          margin: 0,
        }}
      >
        {body}
      </p>
    </motion.div>
  );
}

// ─── CONTACT SECTION ─────────────────────────────────────────────────────────

function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="contact"
      style={{
        background: C.black,
        borderTop: `1px solid ${C.dim}`,
        padding: "7rem 2.5rem 6rem",
      }}
    >
      {/* Huge closing line */}
      <div style={{ overflow: "hidden", marginBottom: "2rem" }}>
        <motion.h2
          initial={{ y: "100%" }}
          animate={inView ? { y: "0%" } : { y: "100%" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: FONT_SYNE,
            fontWeight: 800,
            fontSize: "clamp(3rem, 10vw, 9rem)",
            letterSpacing: "-0.06em",
            lineHeight: 0.85,
            color: C.white,
            margin: 0,
          }}
        >
          LET&apos;S BREAK
        </motion.h2>
      </div>

      <div style={{ overflow: "hidden", marginBottom: "4rem" }}>
        <motion.h2
          initial={{ y: "100%" }}
          animate={inView ? { y: "0%" } : { y: "100%" }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: FONT_SYNE,
            fontWeight: 800,
            fontSize: "clamp(3rem, 10vw, 9rem)",
            letterSpacing: "-0.06em",
            lineHeight: 0.85,
            color: C.red,
            margin: 0,
          }}
        >
          SOMETHING →
        </motion.h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        style={{
          borderTop: `1px solid ${C.dim}`,
          paddingTop: "3rem",
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "3rem",
          alignItems: "end",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          <SectionLabel>GET IN TOUCH</SectionLabel>
          <a
            href="mailto:brief@meshwarp.studio"
            style={{
              fontFamily: FONT_SYNE,
              fontWeight: 800,
              fontSize: "clamp(1rem, 2.5vw, 1.8rem)",
              letterSpacing: "-0.03em",
              color: C.white,
              textDecoration: "underline",
              textDecorationThickness: "2px",
              textUnderlineOffset: "5px",
              transition: "color 0.15s ease",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color = C.red)
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color = C.white)
            }
          >
            brief@meshwarp.studio
          </a>

          <div style={{ display: "flex", gap: "2rem", marginTop: "0.5rem" }}>
            {[
              { label: "LinkedIn", href: "https://linkedin.com" },
              { label: "Dribbble", href: "https://dribbble.com" },
              { label: "Instagram", href: "https://instagram.com" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  color: C.dim,
                  textDecoration: "none",
                  transition: "color 0.15s ease",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color = C.white)
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color = C.dim)
                }
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Magnetic CTA */}
        <MagneticCTA />
      </motion.div>
    </section>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function Impact53Page() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      style={{
        background: C.black,
        color: C.white,
        fontFamily: FONT_SYNE,
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href={FONT_LINK} rel="stylesheet" />

      {/* Navbar */}
      <Navbar onMenuOpen={() => setMenuOpen(true)} />

      {/* Mobile Menu */}
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section
        style={{
          paddingTop: "14rem",
          paddingBottom: "6rem",
          paddingLeft: "2.5rem",
          paddingRight: "2.5rem",
          borderBottom: `1px solid ${C.dim}`,
          position: "relative",
          minHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        {/* Studio label top-right */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          style={{
            position: "absolute",
            top: "7rem",
            right: "2.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.3rem",
            textAlign: "right",
          }}
        >
          <SectionLabel>CREATIVE STUDIO</SectionLabel>
          <SectionLabel>PARIS, FR — EST. 2019</SectionLabel>
        </motion.div>

        {/* Red vertical rule */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          style={{
            position: "absolute",
            top: "6rem",
            left: "2.5rem",
            width: "2px",
            height: "5rem",
            background: C.red,
            transformOrigin: "top",
          }}
        />

        {/* Hero word reveal */}
        <HeroWordReveal />

        {/* Sub tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7, ease: "easeOut" }}
          style={{
            fontFamily: FONT_MONO,
            fontSize: "0.78rem",
            lineHeight: 1.65,
            letterSpacing: "0.04em",
            color: "rgba(255,255,255,0.4)",
            maxWidth: "380px",
            marginTop: "2.5rem",
            marginBottom: 0,
          }}
        >
          Bold creative studio. We design visual identities, campaigns, and
          digital experiences that refuse to be ignored.
        </motion.p>
      </section>

      {/* ── MARQUEE BELT ────────────────────────────────────────────────────── */}
      <MarqueeBelt />

      {/* ── SELECTED WORK ───────────────────────────────────────────────────── */}
      <section
        id="work"
        style={{ borderBottom: `1px solid ${C.dim}` }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            padding: "3rem 2.5rem 1.5rem",
            borderBottom: `1px solid ${C.dim}`,
          }}
        >
          <SectionHeading>SELECTED WORK</SectionHeading>
          <SectionLabel>2024 — 2026</SectionLabel>
        </div>

        {/* Accordion list */}
        <div>
          {PROJECTS.map((project) => (
            <ProjectAccordion key={project.num} project={project} />
          ))}
        </div>
      </section>

      {/* ── MANIFESTO / STUDIO ──────────────────────────────────────────────── */}
      <section
        id="studio"
        style={{
          borderBottom: `1px solid ${C.dim}`,
          padding: "6rem 2.5rem",
        }}
      >
        <div style={{ marginBottom: "4rem" }}>
          <SectionHeading>WE DON&apos;T DESIGN.</SectionHeading>
          <SectionHeading delay={0.1}>WE DISRUPT.</SectionHeading>
        </div>

        <RedRule delay={0.2} />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "2.5rem",
          }}
        >
          {[
            {
              title: "AGAINST DECORATION",
              body: "Decoration is what you add when you have nothing to say. We strip it out until only the argument remains — precise, unapologetic, unavoidable.",
            },
            {
              title: "FOR PERMANENCE",
              body: "Trends are noise. We design for the five-year mark, the ten-year mark. Work that doesn't need a rebrand every eighteen months to stay relevant.",
            },
            {
              title: "ON CONSTRAINTS",
              body: "The grid is not a prison. It's a weapon. Limitations define the fight. We use every constraint as an accelerant, not an excuse.",
            },
          ].map((block, i) => (
            <PhilosophyBlock
              key={block.title}
              title={block.title}
              body={block.body}
              index={i}
            />
          ))}
        </div>
      </section>

      {/* ── STATS — OVERSIZED COUNTER ────────────────────────────────────────── */}
      <section
        id="stats"
        style={{
          borderBottom: `1px solid ${C.dim}`,
        }}
      >
        <div
          style={{
            padding: "2.5rem 2.5rem 1.5rem",
            borderBottom: `1px solid ${C.dim}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <SectionHeading>BY THE NUMBERS</SectionHeading>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
          }}
          className="mw-stats-grid"
        >
          {STATS.map((stat, i) => (
            <StatCounter key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </section>

      {/* ── SERVICES ────────────────────────────────────────────────────────── */}
      <section
        id="services"
        style={{ borderBottom: `1px solid ${C.dim}` }}
      >
        <div
          style={{
            padding: "3rem 2.5rem 1.5rem",
            borderBottom: `1px solid ${C.dim}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <SectionHeading>WHAT WE DO</SectionHeading>
          <SectionLabel>CAPABILITIES</SectionLabel>
        </div>

        <div>
          {SERVICES.map((service, i) => (
            <ServiceRow key={service.num} service={service} index={i} />
          ))}
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────────────────────────────────── */}
      <ContactSection />

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer
        style={{
          background: C.black,
          borderTop: `1px solid ${C.dimDark}`,
          padding: "1.5rem 2.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <span
          style={{
            fontFamily: FONT_MONO,
            fontSize: "0.58rem",
            letterSpacing: "0.2em",
            color: "rgba(255,255,255,0.2)",
          }}
        >
          © MESH // WARP 2026
        </span>
        <span
          style={{
            fontFamily: FONT_MONO,
            fontSize: "0.58rem",
            letterSpacing: "0.2em",
            color: "rgba(255,255,255,0.2)",
          }}
        >
          PARIS, FR · ALL RIGHTS RESERVED
        </span>
      </footer>

      {/* ── GLOBAL STYLES ───────────────────────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&display=swap');

        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          background: #000000;
          overflow-x: hidden;
        }

        ::selection {
          background: #ff3300;
          color: #ffffff;
        }

        /* Desktop nav shown, hamburger hidden by default */
        .mw-desktop-nav { display: flex !important; }
        .mw-hamburger  { display: none !important; }

        @media (max-width: 768px) {
          .mw-desktop-nav { display: none !important; }
          .mw-hamburger  { display: block !important; }

          .mw-stats-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }

        @media (max-width: 600px) {
          .mw-stats-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
