"use client";

import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
  AnimatePresence,
  useMotionValue,
} from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";
import {
  ArrowRight,
  Menu,
  X,
  Zap,
  Terminal,
  Cpu,
  Radio,
  Wifi,
  Eye,
  ChevronRight,
  Code2,
  Layers,
  Globe,
  Users,
  Award,
  TrendingUp,
} from "lucide-react";

// ─── CONSTANTS ───────────────────────────────────────────────────────────────

const PINK = "#ff2d78";
const CYAN = "#00f5ff";
const PURPLE = "#b44fff";
const BG = "#06000f";
const CARD_BG = "#0d0018";

const NAV_LINKS = ["NETWORK", "SERVICES", "WORKS", "TEAM", "CONTACT"];

const SERVICES = [
  {
    icon: Terminal,
    name: "NEURAL DESIGN",
    code: "SVC_01",
    desc: "Architecting hyper-visual interfaces that bleed neon into every pixel. We weaponize aesthetics and deliver interfaces that feel like the future.",
    color: PINK,
    tags: ["UI/UX", "MOTION", "IDENTITY"],
  },
  {
    icon: Cpu,
    name: "BYTE ARCHITECTURE",
    code: "SVC_02",
    desc: "Systems built in silicon and shadow. Full-stack structures engineered for zero-latency throughput and infinite scale under any load.",
    color: CYAN,
    tags: ["REACT", "NODE", "POSTGRES"],
  },
  {
    icon: Radio,
    name: "VOID ENGINEERING",
    code: "SVC_03",
    desc: "We build in the dark. Signal-layer protocols, encrypted pipelines, and spectral backend meshes that power mission-critical systems.",
    color: PURPLE,
    tags: ["API", "SECURITY", "INFRA"],
  },
  {
    icon: Globe,
    name: "GRID DEPLOYMENT",
    code: "SVC_04",
    desc: "Edge-distributed, globally replicated, zero-downtime. We launch into production and stay there — monitored, optimized, evolving.",
    color: CYAN,
    tags: ["DEVOPS", "CDN", "CI/CD"],
  },
  {
    icon: Layers,
    name: "SIGNAL STRATEGY",
    code: "SVC_05",
    desc: "Before the first line of code: roadmaps, architecture decisions, tech stack selection, and growth trajectories written in data.",
    color: PINK,
    tags: ["AUDIT", "ROADMAP", "GROWTH"],
  },
  {
    icon: Code2,
    name: "PHANTOM SYSTEMS",
    code: "SVC_06",
    desc: "AI-augmented automation, LLM integrations, and machine intelligence woven into products. We make software that learns.",
    color: PURPLE,
    tags: ["AI", "LLM", "AUTOMATION"],
  },
];

const STATS = [
  { value: "∞", unit: "FPS", label: "RENDER RATE", color: PINK },
  { value: "0", unit: "ms", label: "LAG TOLERANCE", color: CYAN },
  { value: "147", unit: "+", label: "PROJECTS SHIPPED", color: PURPLE },
  { value: "24/7", unit: "", label: "UPTIME STATUS", color: PINK },
  { value: "99.9", unit: "%", label: "CLIENT RETENTION", color: CYAN },
  { value: "12", unit: "YRS", label: "IN THE GRID", color: PURPLE },
];

const PORTFOLIO = [
  {
    title: "NEON_DRIFT",
    category: "VISUAL SYSTEMS",
    gradient: `linear-gradient(135deg, ${PINK}55 0%, ${PURPLE}22 50%, #06000f 100%)`,
    accent: PINK,
    year: "2024",
    desc: "E-commerce platform with real-time 3D product visualization",
  },
  {
    title: "MATRIX_CORE",
    category: "BYTE ARCHITECTURE",
    gradient: `linear-gradient(135deg, ${CYAN}44 0%, #06000f 70%)`,
    accent: CYAN,
    year: "2024",
    desc: "Distributed ledger system processing 2M+ tx/day",
  },
  {
    title: "GHOST_WIRE",
    category: "VOID ENGINEERING",
    gradient: `linear-gradient(135deg, ${PURPLE}55 0%, #06000f 60%)`,
    accent: PURPLE,
    year: "2023",
    desc: "Zero-trust security mesh for Fortune 500 enterprise",
  },
  {
    title: "BLADE_RUN",
    category: "NEURAL DESIGN",
    gradient: `linear-gradient(135deg, ${PINK}33 0%, ${CYAN}33 100%)`,
    accent: CYAN,
    year: "2023",
    desc: "AI-driven creative suite with real-time collaboration",
  },
  {
    title: "CYBER_FLUX",
    category: "GRID DEPLOYMENT",
    gradient: `linear-gradient(135deg, ${CYAN}22 0%, ${PURPLE}44 100%)`,
    accent: PURPLE,
    year: "2023",
    desc: "Global CDN orchestration for 40+ regional nodes",
  },
  {
    title: "PHANTOM_X",
    category: "PHANTOM SYSTEMS",
    gradient: `linear-gradient(135deg, ${PURPLE}22 0%, ${PINK}44 100%)`,
    accent: PINK,
    year: "2022",
    desc: "LLM-powered content engine serving 500K+ users",
  },
];

const TEAM = [
  {
    name: "ARIA_VOSS",
    role: "CREATIVE DIRECTOR",
    handle: "@aria.exe",
    color: PINK,
    bio: "Former lead at IDEO. 14 years shaping digital identities for global brands.",
    stat: "73 AWARDS",
  },
  {
    name: "KAI_NEXUS",
    role: "CHIEF ARCHITECT",
    handle: "@kai.sys",
    color: CYAN,
    bio: "Ex-Google infra. Built systems processing 10B+ daily requests at scale.",
    stat: "10B+ REQS",
  },
  {
    name: "ZARA_VOID",
    role: "AI ENGINEER",
    handle: "@zara.null",
    color: PURPLE,
    bio: "PhD in ML. Pioneering the integration of generative AI in production products.",
    stat: "12 PATENTS",
  },
  {
    name: "REX_SIGNAL",
    role: "SECURITY LEAD",
    handle: "@rex.enc",
    color: PINK,
    bio: "Zero-day researcher. Keeps our systems — and yours — bulletproof.",
    stat: "0 BREACHES",
  },
];

// ─── INJECTED GLOBAL STYLES ───────────────────────────────────────────────────

const GLOBAL_STYLES = `
  * { cursor: none !important; }

  @keyframes crt-flicker {
    0%   { opacity: 0.013; }
    5%   { opacity: 0.015; }
    10%  { opacity: 0.012; }
    15%  { opacity: 0.016; }
    25%  { opacity: 0.013; }
    30%  { opacity: 0.015; }
    35%  { opacity: 0.012; }
    40%  { opacity: 0.014; }
    45%  { opacity: 0.013; }
    50%  { opacity: 0.016; }
    55%  { opacity: 0.013; }
    60%  { opacity: 0.015; }
    70%  { opacity: 0.012; }
    80%  { opacity: 0.015; }
    90%  { opacity: 0.014; }
    100% { opacity: 0.013; }
  }

  @keyframes scanline-move {
    0%   { transform: translateY(0); }
    100% { transform: translateY(4px); }
  }

  body::after {
    content: '';
    position: fixed;
    inset: 0;
    z-index: 9997;
    pointer-events: none;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0, 245, 255, 0.015) 2px,
      rgba(0, 245, 255, 0.015) 3px
    );
    animation: crt-flicker 0.15s infinite, scanline-move 8s linear infinite;
  }

  @keyframes glitch-clip-1 {
    0%   { clip-path: inset(40% 0 61% 0); transform: translate(-4px, 0); }
    20%  { clip-path: inset(92% 0 1% 0);  transform: translate(4px, 0); }
    40%  { clip-path: inset(43% 0 1% 0);  transform: translate(0, 0); }
    60%  { clip-path: inset(25% 0 58% 0); transform: translate(3px, 0); }
    80%  { clip-path: inset(54% 0 7% 0);  transform: translate(-3px, 0); }
    100% { clip-path: inset(58% 0 43% 0); transform: translate(0, 0); }
  }

  @keyframes glitch-clip-2 {
    0%   { clip-path: inset(50% 0 30% 0); transform: translate(4px, 0); }
    20%  { clip-path: inset(10% 0 80% 0); transform: translate(-4px, 0); }
    40%  { clip-path: inset(60% 0 5% 0);  transform: translate(0, 0); }
    60%  { clip-path: inset(30% 0 50% 0); transform: translate(-3px, 0); }
    80%  { clip-path: inset(75% 0 15% 0); transform: translate(3px, 0); }
    100% { clip-path: inset(20% 0 70% 0); transform: translate(0, 0); }
  }

  .glitch-card {
    position: relative;
    overflow: hidden;
  }

  .glitch-card[data-text]::before,
  .glitch-card[data-text]::after {
    content: attr(data-text);
    position: absolute;
    top: 0; left: 0; right: 0;
    font-family: 'Courier New', monospace;
    font-weight: 900;
    font-size: inherit;
    letter-spacing: inherit;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.1s;
  }

  .glitch-card:hover[data-text]::before {
    color: ${PINK};
    text-shadow: -2px 0 ${CYAN};
    opacity: 0.85;
    animation: glitch-clip-1 0.4s infinite linear;
    left: 2px;
  }

  .glitch-card:hover[data-text]::after {
    color: ${CYAN};
    text-shadow: 2px 0 ${PINK};
    opacity: 0.85;
    animation: glitch-clip-2 0.4s infinite linear;
    left: -2px;
  }

  @keyframes border-draw {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }

  .neon-divider {
    transform-origin: left center;
    transform: scaleX(0);
    transition: transform 0.8s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .neon-divider.in-view {
    transform: scaleX(1);
  }

  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 8px currentColor, 0 0 20px currentColor; }
    50%       { box-shadow: 0 0 16px currentColor, 0 0 40px currentColor, 0 0 60px currentColor; }
  }

  .portfolio-card-centered {
    animation: pulse-glow 2s ease-in-out infinite;
  }

  @keyframes hero-grid-pulse {
    0%, 100% { opacity: 0.07; }
    50%       { opacity: 0.14; }
  }
`;

// ─── CURSOR TRAIL ────────────────────────────────────────────────────────────

const TRAIL_LENGTH = 8;

function CursorTrail() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { stiffness: 220, damping: 22, mass: 0.6 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const [trail, setTrail] = useState<{ x: number; y: number }[]>(
    Array.from({ length: TRAIL_LENGTH }, () => ({ x: -100, y: -100 }))
  );

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const interval = setInterval(() => {
      const cx = cursorX.get();
      const cy = cursorY.get();
      setTrail((prev) => {
        const next = [{ x: cx, y: cy }, ...prev.slice(0, TRAIL_LENGTH - 1)];
        return next;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [cursorX, cursorY]);

  return (
    <>
      {trail.map((pos, i) => {
        const opacity = ((TRAIL_LENGTH - i) / TRAIL_LENGTH) * 0.55;
        const size = Math.max(2, 10 - i * 1.1);
        const colors = [PINK, CYAN, PURPLE];
        const color = colors[i % colors.length];
        return (
          <div
            key={i}
            style={{
              position: "fixed",
              left: pos.x - size / 2,
              top: pos.y - size / 2,
              width: size,
              height: size,
              borderRadius: "50%",
              background: color,
              opacity,
              pointerEvents: "none",
              zIndex: 99999,
              boxShadow: `0 0 ${size * 2}px ${color}`,
              transition: "none",
            }}
          />
        );
      })}
      {/* Main cursor dot */}
      <motion.div
        style={{
          position: "fixed",
          left: cursorX,
          top: cursorY,
          x: -6,
          y: -6,
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: PINK,
          boxShadow: `0 0 12px ${PINK}, 0 0 24px ${PINK}88`,
          pointerEvents: "none",
          zIndex: 100000,
        }}
      />
      {/* Outer ring */}
      <motion.div
        style={{
          position: "fixed",
          left: cursorX,
          top: cursorY,
          x: -18,
          y: -18,
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: `1px solid ${CYAN}88`,
          pointerEvents: "none",
          zIndex: 99999,
        }}
      />
    </>
  );
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function Reveal({
  children,
  delay = 0,
  y = 40,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  style?: React.CSSProperties;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.23, 1, 0.32, 1] }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

function NeonDivider({ color = PINK }: { color?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, {
    once: true,
    margin: "-60px",
  });

  useEffect(() => {
    if (!ref.current) return;
    if (inView) {
      ref.current.classList.add("in-view");
    }
  }, [inView]);

  return (
    <div
      ref={ref}
      className="neon-divider"
      style={{
        height: "1px",
        background: `linear-gradient(90deg, ${color}, ${color}00)`,
        boxShadow: `0 0 8px ${color}`,
        color,
        margin: "0",
      }}
    />
  );
}

function SectionLabel({
  code,
  color = CYAN,
}: {
  code: string;
  color?: string;
}) {
  return (
    <span
      style={{
        fontSize: "0.58rem",
        fontFamily: "'Courier New', monospace",
        color,
        letterSpacing: "0.4em",
        textShadow: `0 0 10px ${color}`,
        display: "block",
        marginBottom: "1rem",
      }}
    >
      {code}
    </span>
  );
}

function GlitchHeadline({
  text,
  color = PINK,
  outlineText,
  outlineColor = CYAN,
}: {
  text: string;
  color?: string;
  outlineText?: string;
  outlineColor?: string;
}) {
  const [ticking, setTicking] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setTicking(true);
      setTimeout(() => setTicking(false), 200);
    }, 4000 + Math.random() * 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.h2
      animate={ticking ? { x: [0, -4, 4, -2, 2, 0], skewX: [0, -1, 1, 0] } : {}}
      transition={{ duration: 0.2 }}
      style={{
        fontSize: "clamp(2.8rem, 7vw, 6rem)",
        fontFamily: "'Courier New', monospace",
        fontWeight: 900,
        lineHeight: 0.9,
        letterSpacing: "-0.02em",
        margin: "0 0 2rem",
      }}
    >
      <span
        style={{
          display: "block",
          color,
          textShadow: `0 0 30px ${color}, 0 0 60px ${color}44`,
        }}
      >
        {text}
      </span>
      {outlineText && (
        <span
          style={{
            display: "block",
            color: "transparent",
            WebkitTextStroke: `2px ${outlineColor}`,
            textShadow: `0 0 20px ${outlineColor}44`,
          }}
        >
          {outlineText}
        </span>
      )}
    </motion.h2>
  );
}

// ─── SCANLINE + CRT OVERLAY ───────────────────────────────────────────────────

function GlobalStyles() {
  return <style dangerouslySetInnerHTML={{ __html: GLOBAL_STYLES }} />;
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────

function Navbar({ onMenuOpen }: { onMenuOpen: () => void }) {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const [active, setActive] = useState<string | null>(null);

  return (
    <motion.nav
      style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000 }}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
    >
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          background: `${BG}f0`,
          backdropFilter: "blur(20px)",
          borderBottom: `1px solid ${PINK}33`,
          opacity: bgOpacity,
        }}
      />
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.25rem 2.5rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <Zap
            size={20}
            style={{ color: PINK, filter: `drop-shadow(0 0 8px ${PINK})` }}
          />
          <span
            style={{
              fontSize: "1rem",
              fontWeight: 900,
              fontFamily: "'Courier New', monospace",
              color: PINK,
              textShadow: `0 0 16px ${PINK}, 0 0 32px ${PINK}66`,
              letterSpacing: "0.08em",
            }}
          >
            PARTICLE<span style={{ color: `${PINK}66` }}> // </span>FIELD
          </span>
        </div>

        <div
          style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}
          className="hidden md:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onMouseEnter={() => setActive(link)}
              onMouseLeave={() => setActive(null)}
              style={{
                fontSize: "0.62rem",
                fontWeight: 700,
                fontFamily: "'Courier New', monospace",
                color: active === link ? PINK : CYAN,
                textDecoration: "none",
                letterSpacing: "0.2em",
                textShadow:
                  active === link ? `0 0 12px ${PINK}` : `0 0 8px ${CYAN}55`,
                transition: "all 0.2s",
              }}
            >
              {link}
            </a>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <a
            href="#contact"
            className="hidden md:inline-flex"
            style={{
              alignItems: "center",
              gap: "0.4rem",
              fontSize: "0.6rem",
              fontWeight: 900,
              fontFamily: "'Courier New', monospace",
              color: BG,
              background: PINK,
              padding: "0.5rem 1.2rem",
              textDecoration: "none",
              letterSpacing: "0.2em",
              boxShadow: `0 0 14px ${PINK}88`,
              transition: "all 0.2s",
            }}
          >
            CONNECT
          </a>
          <button
            onClick={onMenuOpen}
            className="md:hidden"
            style={{
              background: "none",
              border: "none",
              color: CYAN,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Menu size={22} />
          </button>
        </div>
      </div>
    </motion.nav>
  );
}

// ─── MOBILE MENU ─────────────────────────────────────────────────────────────

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 2000,
            background: `${BG}f8`,
            backdropFilter: "blur(24px)",
            display: "flex",
            flexDirection: "column",
            padding: "2rem",
            fontFamily: "'Courier New', monospace",
            borderLeft: `1px solid ${PINK}44`,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "3rem",
            }}
          >
            <span
              style={{
                fontSize: "1rem",
                fontWeight: 900,
                color: PINK,
                textShadow: `0 0 16px ${PINK}`,
                letterSpacing: "0.08em",
              }}
            >
              PARTICLE // FIELD
            </span>
            <button
              onClick={onClose}
              style={{
                background: "none",
                border: `1px solid ${PINK}44`,
                color: PINK,
                padding: "0.5rem",
                display: "flex",
              }}
            >
              <X size={20} />
            </button>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              flex: 1,
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={onClose}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 + 0.2 }}
                style={{
                  fontSize: "2rem",
                  fontWeight: 900,
                  color: i % 2 === 0 ? PINK : CYAN,
                  textDecoration: "none",
                  letterSpacing: "0.1em",
                  textShadow: `0 0 20px ${i % 2 === 0 ? PINK : CYAN}88`,
                }}
              >
                {link}
              </motion.a>
            ))}
          </div>
          <a
            href="#contact"
            onClick={onClose}
            style={{
              textAlign: "center",
              fontSize: "0.7rem",
              fontWeight: 900,
              color: PINK,
              border: `1px solid ${PINK}`,
              padding: "1rem",
              textDecoration: "none",
              letterSpacing: "0.3em",
              boxShadow: `0 0 20px ${PINK}44`,
            }}
          >
            CONNECT →
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero() {
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 700], [0, 100]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 80);
    return () => clearInterval(id);
  }, []);

  const glitchChars = "!@#$%^&*<>?/|\\[]{}";
  const heroWord = "PARTICLE";
  const glitchedWord =
    tick % 40 < 3
      ? heroWord
          .split("")
          .map((c) =>
            Math.random() > 0.7
              ? glitchChars[Math.floor(Math.random() * glitchChars.length)]
              : c
          )
          .join("")
      : heroWord;

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: BG,
        overflow: "hidden",
        padding: "0 1.5rem",
      }}
    >
      {/* Animated grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(${CYAN}10 1px, transparent 1px), linear-gradient(90deg, ${CYAN}10 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          pointerEvents: "none",
          animation: "hero-grid-pulse 4s ease-in-out infinite",
        }}
      />

      {/* Deep radial glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "900px",
          height: "900px",
          background: `radial-gradient(ellipse, ${PINK}1a 0%, ${PURPLE}0d 40%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* Corner brackets */}
      {(["topLeft", "topRight", "bottomLeft", "bottomRight"] as const).map(
        (corner) => {
          const pos = {
            top: corner.startsWith("top") ? "2rem" : undefined,
            bottom: corner.startsWith("bottom") ? "2rem" : undefined,
            left: corner.endsWith("Left") ? "2rem" : undefined,
            right: corner.endsWith("Right") ? "2rem" : undefined,
          };
          const borders = {
            borderTop: corner.startsWith("top") ? `2px solid ${CYAN}` : undefined,
            borderBottom: corner.startsWith("bottom")
              ? `2px solid ${CYAN}`
              : undefined,
            borderLeft: corner.endsWith("Left") ? `2px solid ${CYAN}` : undefined,
            borderRight: corner.endsWith("Right")
              ? `2px solid ${CYAN}`
              : undefined,
          };
          return (
            <motion.div
              key={corner}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              style={{
                position: "absolute",
                ...pos,
                width: "44px",
                height: "44px",
                ...borders,
                boxShadow: `0 0 10px ${CYAN}66`,
              }}
            />
          );
        }
      )}

      {/* Status bar top */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        style={{
          position: "absolute",
          top: "6rem",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "0.55rem",
          fontFamily: "'Courier New', monospace",
          color: `${CYAN}77`,
          letterSpacing: "0.35em",
          whiteSpace: "nowrap",
        }}
      >
        [SYS:ONLINE] &nbsp;|&nbsp; NODE_ID: PF_BERLIN_01 &nbsp;|&nbsp;
        UPTIME: 99.97%
      </motion.div>

      <motion.div
        style={{ y: parallaxY, opacity, textAlign: "center", zIndex: 10 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            fontSize: "0.58rem",
            fontFamily: "'Courier New', monospace",
            fontWeight: 700,
            letterSpacing: "0.4em",
            color: `${CYAN}88`,
            marginBottom: "2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.8rem",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: CYAN,
              boxShadow: `0 0 8px ${CYAN}`,
            }}
          />
          CYBERPUNK_CREATIVE_STUDIO &nbsp;//&nbsp; EST. 2019
          <span
            style={{
              display: "inline-block",
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: PINK,
              boxShadow: `0 0 8px ${PINK}`,
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
        >
          <div
            style={{
              fontSize: "clamp(4.5rem, 15vw, 13rem)",
              fontFamily: "'Courier New', monospace",
              fontWeight: 900,
              lineHeight: 0.82,
              color: PINK,
              textShadow: `0 0 30px ${PINK}, 0 0 80px ${PINK}55`,
              letterSpacing: "-0.03em",
            }}
          >
            {glitchedWord}
          </div>
          <div
            style={{
              fontSize: "clamp(4.5rem, 15vw, 13rem)",
              fontFamily: "'Courier New', monospace",
              fontWeight: 900,
              lineHeight: 0.82,
              color: "transparent",
              WebkitTextStroke: `2px ${CYAN}`,
              textShadow: `0 0 30px ${CYAN}44`,
              letterSpacing: "-0.03em",
              marginBottom: "1.5rem",
            }}
          >
            FIELD
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          style={{
            fontSize: "0.72rem",
            fontFamily: "'Courier New', monospace",
            letterSpacing: "0.18em",
            color: `${PINK}bb`,
            maxWidth: "500px",
            margin: "0 auto 3.5rem",
            lineHeight: 2,
            textShadow: `0 0 12px ${PINK}33`,
          }}
        >
          WE_BUILD_DIGITAL_FUTURES.EXE // NEON-GRADE DESIGN SYSTEMS,
          BYTE-PERFECT ARCHITECTURE, SIGNAL-DARK ENGINEERING.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1.2rem",
            flexWrap: "wrap",
          }}
        >
          <a
            href="#services"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "1rem 2.2rem",
              background: PINK,
              color: BG,
              fontFamily: "'Courier New', monospace",
              fontWeight: 900,
              fontSize: "0.68rem",
              letterSpacing: "0.22em",
              textDecoration: "none",
              boxShadow: `0 0 24px ${PINK}, 0 0 50px ${PINK}44`,
            }}
          >
            ENTER THE GRID <ArrowRight size={14} />
          </a>
          <a
            href="#works"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "1rem 2.2rem",
              background: "transparent",
              color: CYAN,
              fontFamily: "'Courier New', monospace",
              fontWeight: 700,
              fontSize: "0.68rem",
              letterSpacing: "0.22em",
              textDecoration: "none",
              border: `1px solid ${CYAN}66`,
              boxShadow: `0 0 14px ${CYAN}33`,
            }}
          >
            VIEW WORKS
          </a>
        </motion.div>
      </motion.div>

      {/* Bottom scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <span
          style={{
            fontSize: "0.48rem",
            fontFamily: "'Courier New', monospace",
            color: `${CYAN}55`,
            letterSpacing: "0.4em",
          }}
        >
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: "1px",
            height: "40px",
            background: `linear-gradient(${CYAN}, transparent)`,
          }}
        />
      </motion.div>
    </section>
  );
}

// ─── SERVICES ────────────────────────────────────────────────────────────────

function Services() {
  return (
    <section
      id="services"
      style={{ background: BG, padding: "9rem 2rem 8rem" }}
    >
      <NeonDivider color={PINK} />
      <div style={{ maxWidth: "1280px", margin: "0 auto", paddingTop: "6rem" }}>
        <Reveal>
          <div style={{ marginBottom: "5rem" }}>
            <SectionLabel code="[MODULE: SERVICES.EXE]" color={CYAN} />
            <GlitchHeadline
              text="WHAT WE"
              outlineText="BUILD"
              outlineColor={PINK}
            />
            <p
              style={{
                fontSize: "0.78rem",
                fontFamily: "'Courier New', monospace",
                color: "#6666aa",
                letterSpacing: "0.08em",
                lineHeight: 1.9,
                maxWidth: "520px",
              }}
            >
              SIX CORE CAPABILITIES. INFINITE PERMUTATIONS. FROM PIXEL-PERFECT
              DESIGN TO PLANETARY-SCALE INFRASTRUCTURE — WE EXECUTE ACROSS THE
              FULL STACK.
            </p>
          </div>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "1px",
            background: `${PINK}18`,
          }}
        >
          {SERVICES.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <Reveal key={svc.code} delay={i * 0.09}>
                <div
                  className="glitch-card"
                  data-text={svc.name}
                  style={{
                    background: CARD_BG,
                    padding: "2.8rem 2.2rem",
                    position: "relative",
                    transition: "background 0.3s ease",
                    minHeight: "280px",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.background =
                      `${svc.color}0a`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.background = CARD_BG;
                  }}
                >
                  {/* Top neon line */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "2px",
                      background: `linear-gradient(90deg, ${svc.color}88, ${svc.color}, ${svc.color}88)`,
                      boxShadow: `0 0 10px ${svc.color}`,
                    }}
                  />

                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      marginBottom: "1.5rem",
                    }}
                  >
                    <Icon
                      size={28}
                      style={{
                        color: svc.color,
                        filter: `drop-shadow(0 0 10px ${svc.color})`,
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontSize: "0.52rem",
                        fontFamily: "'Courier New', monospace",
                        color: `${svc.color}66`,
                        letterSpacing: "0.3em",
                        border: `1px solid ${svc.color}33`,
                        padding: "0.25rem 0.6rem",
                      }}
                    >
                      {svc.code}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: "1.2rem",
                      fontFamily: "'Courier New', monospace",
                      fontWeight: 900,
                      color: svc.color,
                      textShadow: `0 0 14px ${svc.color}88`,
                      letterSpacing: "0.06em",
                      marginBottom: "0.9rem",
                    }}
                  >
                    {svc.name}
                  </h3>

                  <p
                    style={{
                      fontSize: "0.77rem",
                      fontFamily: "'Courier New', monospace",
                      color: "#7777aa",
                      lineHeight: 1.9,
                      letterSpacing: "0.04em",
                      marginBottom: "1.5rem",
                    }}
                  >
                    {svc.desc}
                  </p>

                  <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                    {svc.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: "0.48rem",
                          fontFamily: "'Courier New', monospace",
                          color: `${svc.color}99`,
                          border: `1px solid ${svc.color}33`,
                          padding: "0.2rem 0.5rem",
                          letterSpacing: "0.2em",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── HORIZONTAL SCROLL PORTFOLIO ─────────────────────────────────────────────

function Portfolio() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [centeredIndex, setCenteredIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-70%"]);
  const xSpring = useSpring(x, { stiffness: 80, damping: 20 });

  // Detect centered card as user scrolls
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      const idx = Math.round(v * (PORTFOLIO.length - 1));
      setCenteredIndex(Math.max(0, Math.min(PORTFOLIO.length - 1, idx)));
    });
    return unsubscribe;
  }, [scrollYProgress]);

  return (
    <section
      id="works"
      ref={sectionRef}
      style={{ height: "300vh", position: "relative" }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          background: BG,
        }}
      >
        <NeonDivider color={PURPLE} />

        {/* Header */}
        <div
          style={{
            position: "absolute",
            top: "3rem",
            left: "4rem",
            zIndex: 10,
          }}
        >
          <SectionLabel code="[MODULE: WORKS.DB]" color={PURPLE} />
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontFamily: "'Courier New', monospace",
              fontWeight: 900,
              lineHeight: 1,
              margin: 0,
            }}
          >
            <span
              style={{
                color: "#e0e0ff",
              }}
            >
              SELECTED{" "}
            </span>
            <span
              style={{
                color: PURPLE,
                textShadow: `0 0 20px ${PURPLE}`,
              }}
            >
              WORK
            </span>
          </h2>
        </div>

        {/* Scroll progress indicator */}
        <div
          style={{
            position: "absolute",
            bottom: "2.5rem",
            left: "4rem",
            display: "flex",
            gap: "0.4rem",
            zIndex: 10,
          }}
        >
          {PORTFOLIO.map((_, i) => (
            <div
              key={i}
              style={{
                width: centeredIndex === i ? "24px" : "6px",
                height: "2px",
                background:
                  centeredIndex === i ? PINK : `${CYAN}44`,
                boxShadow:
                  centeredIndex === i ? `0 0 8px ${PINK}` : "none",
                transition: "all 0.4s ease",
              }}
            />
          ))}
        </div>

        {/* Drag label */}
        <div
          style={{
            position: "absolute",
            bottom: "2.5rem",
            right: "4rem",
            fontSize: "0.52rem",
            fontFamily: "'Courier New', monospace",
            color: `${CYAN}55`,
            letterSpacing: "0.3em",
            zIndex: 10,
          }}
        >
          SCROLL TO NAVIGATE →
        </div>

        {/* Track */}
        <motion.div
          ref={trackRef}
          style={{
            x: xSpring,
            display: "flex",
            gap: "1.5rem",
            paddingLeft: "4rem",
            alignItems: "center",
            height: "100%",
            width: "max-content",
          }}
        >
          {PORTFOLIO.map((item, i) => {
            const isCentered = centeredIndex === i;
            return (
              <div
                key={item.title}
                className={isCentered ? "portfolio-card-centered" : ""}
                style={{
                  width: "clamp(320px, 28vw, 480px)",
                  height: "clamp(400px, 60vh, 580px)",
                  flexShrink: 0,
                  background: CARD_BG,
                  border: `1px solid ${isCentered ? item.accent : item.accent + "33"}`,
                  boxShadow: isCentered
                    ? `0 0 40px ${item.accent}55, inset 0 0 40px ${item.accent}0a`
                    : `0 0 20px ${item.accent}11`,
                  color: item.accent,
                  position: "relative",
                  overflow: "hidden",
                  transition: "border-color 0.4s ease, box-shadow 0.4s ease",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  transform: isCentered ? "scale(1.02)" : "scale(0.97)",
                }}
              >
                {/* BG gradient */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: item.gradient,
                    transition: "opacity 0.4s ease",
                    opacity: isCentered ? 1 : 0.7,
                  }}
                />

                {/* Grid overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `linear-gradient(${item.accent}0a 1px, transparent 1px), linear-gradient(90deg, ${item.accent}0a 1px, transparent 1px)`,
                    backgroundSize: "30px 30px",
                  }}
                />

                {/* Year badge */}
                <div
                  style={{
                    position: "absolute",
                    top: "1.5rem",
                    right: "1.5rem",
                    fontSize: "0.52rem",
                    fontFamily: "'Courier New', monospace",
                    color: `${item.accent}99`,
                    letterSpacing: "0.25em",
                    border: `1px solid ${item.accent}33`,
                    padding: "0.25rem 0.6rem",
                  }}
                >
                  {item.year}
                </div>

                {/* Center icon */}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    opacity: isCentered ? 0.5 : 0.15,
                    transition: "opacity 0.4s ease",
                  }}
                >
                  <Eye
                    size={52}
                    style={{
                      color: item.accent,
                      filter: `drop-shadow(0 0 12px ${item.accent})`,
                    }}
                  />
                </div>

                {/* Bottom content */}
                <div
                  style={{
                    position: "relative",
                    zIndex: 2,
                    padding: "1.8rem",
                    borderTop: `1px solid ${item.accent}33`,
                    background: `${BG}cc`,
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.5rem",
                      fontFamily: "'Courier New', monospace",
                      color: `${item.accent}99`,
                      letterSpacing: "0.3em",
                      display: "block",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {item.category}
                  </span>
                  <span
                    style={{
                      display: "block",
                      fontSize: "1.3rem",
                      fontFamily: "'Courier New', monospace",
                      fontWeight: 900,
                      color: item.accent,
                      textShadow: `0 0 12px ${item.accent}88`,
                      letterSpacing: "0.05em",
                      marginBottom: "0.6rem",
                    }}
                  >
                    {item.title}
                  </span>
                  <span
                    style={{
                      fontSize: "0.7rem",
                      fontFamily: "'Courier New', monospace",
                      color: "#6666aa",
                      letterSpacing: "0.04em",
                      lineHeight: 1.6,
                    }}
                  >
                    {item.desc}
                  </span>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

// ─── STATS ───────────────────────────────────────────────────────────────────

function Stats() {
  return (
    <section
      style={{ background: CARD_BG, padding: "6rem 2rem" }}
    >
      <NeonDivider color={CYAN} />
      <div
        style={{ maxWidth: "1280px", margin: "0 auto", paddingTop: "5rem" }}
      >
        <Reveal style={{ marginBottom: "4rem", textAlign: "center" }}>
          <SectionLabel code="[MODULE: METRICS.LOG]" color={PINK} />
          <GlitchHeadline text="BY THE" outlineText="NUMBERS" outlineColor={CYAN} />
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "1px",
            background: `${CYAN}18`,
          }}
        >
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <div
                style={{
                  background: CARD_BG,
                  textAlign: "center",
                  padding: "3rem 1.5rem",
                  position: "relative",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background =
                    `${stat.color}0a`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = CARD_BG;
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    background: stat.color,
                    boxShadow: `0 0 10px ${stat.color}`,
                    opacity: 0.5,
                  }}
                />
                <div
                  style={{
                    fontFamily: "'Courier New', monospace",
                    fontWeight: 900,
                    fontSize: "clamp(2.2rem, 4vw, 3.8rem)",
                    color: stat.color,
                    textShadow: `0 0 30px ${stat.color}`,
                    lineHeight: 1,
                    marginBottom: "0.3rem",
                  }}
                >
                  {stat.value}
                  <span
                    style={{
                      fontSize: "clamp(1rem, 2vw, 1.5rem)",
                      marginLeft: "0.2rem",
                      opacity: 0.8,
                    }}
                  >
                    {stat.unit}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "0.52rem",
                    fontFamily: "'Courier New', monospace",
                    color: "#44445566",
                    letterSpacing: "0.3em",
                    marginTop: "0.8rem",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TEAM ────────────────────────────────────────────────────────────────────

function Team() {
  return (
    <section
      id="team"
      style={{ background: BG, padding: "9rem 2rem 8rem" }}
    >
      <NeonDivider color={PURPLE} />
      <div
        style={{ maxWidth: "1280px", margin: "0 auto", paddingTop: "6rem" }}
      >
        <Reveal style={{ marginBottom: "5rem" }}>
          <SectionLabel code="[MODULE: OPERATORS.DB]" color={PURPLE} />
          <GlitchHeadline
            text="THE GRID"
            outlineText="RUNNERS"
            outlineColor={PINK}
          />
          <p
            style={{
              fontSize: "0.78rem",
              fontFamily: "'Courier New', monospace",
              color: "#6666aa",
              letterSpacing: "0.08em",
              lineHeight: 1.9,
              maxWidth: "480px",
            }}
          >
            FOUR OPERATORS. ONE MISSION. WE LIVE IN THE MACHINE AND BUILD WHAT
            OTHERS ONLY DREAM ABOUT.
          </p>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {TEAM.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.1}>
              <div
                className="glitch-card"
                data-text={member.name}
                style={{
                  background: CARD_BG,
                  border: `1px solid ${member.color}33`,
                  padding: "2.5rem 2rem",
                  position: "relative",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = member.color;
                  el.style.boxShadow = `0 0 30px ${member.color}33`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = `${member.color}33`;
                  el.style.boxShadow = "none";
                }}
              >
                {/* Avatar placeholder */}
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    border: `2px solid ${member.color}`,
                    boxShadow: `0 0 20px ${member.color}66`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.5rem",
                    background: `${member.color}11`,
                  }}
                >
                  <Users
                    size={28}
                    style={{
                      color: member.color,
                      filter: `drop-shadow(0 0 6px ${member.color})`,
                    }}
                  />
                </div>

                <div
                  style={{
                    fontSize: "0.5rem",
                    fontFamily: "'Courier New', monospace",
                    color: `${member.color}77`,
                    letterSpacing: "0.3em",
                    marginBottom: "0.3rem",
                  }}
                >
                  {member.handle}
                </div>

                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontFamily: "'Courier New', monospace",
                    fontWeight: 900,
                    color: member.color,
                    textShadow: `0 0 12px ${member.color}88`,
                    letterSpacing: "0.06em",
                    marginBottom: "0.4rem",
                  }}
                >
                  {member.name}
                </h3>

                <div
                  style={{
                    fontSize: "0.55rem",
                    fontFamily: "'Courier New', monospace",
                    color: `${member.color}66`,
                    letterSpacing: "0.25em",
                    marginBottom: "1.2rem",
                  }}
                >
                  {member.role}
                </div>

                <p
                  style={{
                    fontSize: "0.74rem",
                    fontFamily: "'Courier New', monospace",
                    color: "#6666aa",
                    lineHeight: 1.8,
                    letterSpacing: "0.04em",
                    marginBottom: "1.5rem",
                  }}
                >
                  {member.bio}
                </p>

                <div
                  style={{
                    fontSize: "0.58rem",
                    fontFamily: "'Courier New', monospace",
                    color: member.color,
                    letterSpacing: "0.2em",
                    border: `1px solid ${member.color}44`,
                    padding: "0.4rem 0.8rem",
                    display: "inline-block",
                    boxShadow: `0 0 8px ${member.color}22`,
                  }}
                >
                  {member.stat}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── MANIFESTO ───────────────────────────────────────────────────────────────

function Manifesto() {
  return (
    <section
      style={{
        background: CARD_BG,
        padding: "9rem 2rem",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      <NeonDivider color={PINK} />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "1000px",
          height: "1000px",
          background: `radial-gradient(ellipse, ${PURPLE}0f 0%, transparent 60%)`,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          position: "relative",
          zIndex: 2,
          paddingTop: "5rem",
        }}
      >
        <Reveal>
          <SectionLabel code="[MODULE: MANIFESTO.TXT]" color={PURPLE} />
        </Reveal>
        <Reveal delay={0.15}>
          <div
            style={{
              fontSize: "clamp(3rem, 9vw, 8rem)",
              fontFamily: "'Courier New', monospace",
              fontWeight: 900,
              lineHeight: 0.88,
              letterSpacing: "-0.02em",
              margin: "1.5rem 0 3rem",
            }}
          >
            <span
              style={{
                display: "block",
                color: PINK,
                textShadow: `0 0 40px ${PINK}, 0 0 80px ${PINK}44`,
              }}
            >
              WE BUILD
            </span>
            <span
              style={{
                display: "block",
                color: "transparent",
                WebkitTextStroke: `2px ${CYAN}`,
                textShadow: `0 0 20px ${CYAN}44`,
              }}
            >
              IN THE DARK
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.25}>
          <p
            style={{
              fontSize: "0.88rem",
              fontFamily: "'Courier New', monospace",
              color: "#5555aa",
              lineHeight: 2.2,
              letterSpacing: "0.07em",
              maxWidth: "700px",
              margin: "0 auto 3.5rem",
            }}
          >
            WE ARE THE GRID_RUNNERS. THE NEON_ARCHITECTS. THE
            SIGNAL_ENGINEERS. WE DO NOT FOLLOW TRENDS — WE WRITE THE CODE
            THAT BECOMES THE CULTURE. EVERY PIXEL IS A STATEMENT. EVERY SYSTEM
            IS A MANIFESTO. PARTICLE // FIELD EXISTS IN THE SPACE BETWEEN
            LIGHT AND ZERO.
          </p>
        </Reveal>

        <Reveal delay={0.35}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            {[
              "FOUNDED_2019",
              "BERLIN_HQ",
              "GLOBAL_OPS",
              "147_SHIPPED",
              "22_AWARDS",
            ].map((tag, i) => {
              const colors = [PINK, CYAN, PURPLE];
              const c = colors[i % colors.length];
              return (
                <span
                  key={tag}
                  style={{
                    fontSize: "0.52rem",
                    fontFamily: "'Courier New', monospace",
                    color: `${c}cc`,
                    letterSpacing: "0.28em",
                    border: `1px solid ${c}44`,
                    padding: "0.4rem 1rem",
                    boxShadow: `0 0 10px ${c}1a`,
                  }}
                >
                  {tag}
                </span>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── CONTACT ─────────────────────────────────────────────────────────────────

function Contact() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [budget, setBudget] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: `${BG}`,
    border: `1px solid ${PINK}33`,
    color: "#ccccff",
    fontFamily: "'Courier New', monospace",
    fontSize: "0.78rem",
    padding: "1rem 1.2rem",
    outline: "none",
    boxSizing: "border-box",
    transition: "all 0.2s",
    letterSpacing: "0.06em",
  };

  return (
    <section
      id="contact"
      style={{ background: BG, padding: "9rem 2rem 8rem" }}
    >
      <NeonDivider color={CYAN} />
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          paddingTop: "6rem",
        }}
      >
        <Reveal>
          <SectionLabel code="[MODULE: CONNECT.EXE]" color={CYAN} />
          <GlitchHeadline text="JACK IN" outlineText="→" outlineColor={PINK} />
          <p
            style={{
              fontSize: "0.72rem",
              fontFamily: "'Courier New', monospace",
              color: `${CYAN}66`,
              letterSpacing: "0.18em",
              marginBottom: "3.5rem",
              lineHeight: 1.8,
            }}
          >
            ESTABLISH_CONNECTION // TRANSMIT_BRIEF // WE RESPOND WITHIN 24H
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                padding: "4rem",
                border: `1px solid ${CYAN}`,
                boxShadow: `0 0 40px ${CYAN}44`,
                fontFamily: "'Courier New', monospace",
                color: CYAN,
                fontSize: "1rem",
                letterSpacing: "0.15em",
                textAlign: "center",
                textShadow: `0 0 20px ${CYAN}`,
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>✓</div>
              SIGNAL_RECEIVED.OK
              <div
                style={{
                  fontSize: "0.6rem",
                  color: `${CYAN}66`,
                  marginTop: "0.5rem",
                  letterSpacing: "0.2em",
                }}
              >
                WE WILL RESPOND WITHIN 24H // STAY IN THE GRID
              </div>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1.2rem",
                }}
              >
                <input
                  type="text"
                  placeholder="YOUR_HANDLE"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={inputStyle}
                  onFocus={(e) => {
                    e.target.style.borderColor = CYAN;
                    e.target.style.boxShadow = `0 0 16px ${CYAN}33`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = `${PINK}33`;
                    e.target.style.boxShadow = "none";
                  }}
                />
                <input
                  type="email"
                  placeholder="YOUR_EMAIL@DOMAIN.NET"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={inputStyle}
                  onFocus={(e) => {
                    e.target.style.borderColor = PINK;
                    e.target.style.boxShadow = `0 0 16px ${PINK}44`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = `${PINK}33`;
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                style={{
                  ...inputStyle,
                  appearance: "none",
                  background: BG,
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = PURPLE;
                  e.target.style.boxShadow = `0 0 16px ${PURPLE}33`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = `${PINK}33`;
                  e.target.style.boxShadow = "none";
                }}
              >
                <option value="" style={{ background: BG }}>
                  SELECT_BUDGET_RANGE
                </option>
                <option value="10k" style={{ background: BG }}>
                  $10K — $25K // STARTER_GRID
                </option>
                <option value="25k" style={{ background: BG }}>
                  $25K — $75K // CORE_MISSION
                </option>
                <option value="75k" style={{ background: BG }}>
                  $75K — $200K // ENTERPRISE_TIER
                </option>
                <option value="200k+" style={{ background: BG }}>
                  $200K+ // FULL_SPECTRUM_OPS
                </option>
              </select>

              <textarea
                placeholder="DESCRIBE_YOUR_PROJECT // SIGNAL_BRIEF — WHAT ARE YOU BUILDING?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={6}
                style={{ ...inputStyle, resize: "vertical" }}
                onFocus={(e) => {
                  e.target.style.borderColor = CYAN;
                  e.target.style.boxShadow = `0 0 16px ${CYAN}33`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = `${PINK}33`;
                  e.target.style.boxShadow = "none";
                }}
              />

              <button
                type="submit"
                style={{
                  background: "transparent",
                  border: `2px solid ${PINK}`,
                  color: PINK,
                  fontFamily: "'Courier New', monospace",
                  fontWeight: 900,
                  fontSize: "0.72rem",
                  letterSpacing: "0.3em",
                  padding: "1.1rem 2rem",
                  boxShadow: `0 0 24px ${PINK}55, 0 0 50px ${PINK}22`,
                  textShadow: `0 0 10px ${PINK}`,
                  transition: "all 0.2s",
                  width: "100%",
                }}
                onMouseEnter={(e) => {
                  const btn = e.currentTarget;
                  btn.style.background = `${PINK}22`;
                  btn.style.boxShadow = `0 0 40px ${PINK}88`;
                }}
                onMouseLeave={(e) => {
                  const btn = e.currentTarget;
                  btn.style.background = "transparent";
                  btn.style.boxShadow = `0 0 24px ${PINK}55, 0 0 50px ${PINK}22`;
                }}
              >
                TRANSMIT_SIGNAL →
              </button>
            </form>
          )}
        </Reveal>

        {/* Contact info row */}
        <Reveal delay={0.3}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "3rem",
              marginTop: "3rem",
              flexWrap: "wrap",
            }}
          >
            {[
              { label: "EMAIL", value: "SIGNAL@PARTICLE.FIELD" },
              { label: "NODE", value: "BERLIN_HQ" },
              { label: "TZ", value: "CET / UTC+1" },
            ].map((item) => (
              <div key={item.label} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: "0.48rem",
                    fontFamily: "'Courier New', monospace",
                    color: `${CYAN}55`,
                    letterSpacing: "0.3em",
                    marginBottom: "0.3rem",
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    fontSize: "0.65rem",
                    fontFamily: "'Courier New', monospace",
                    color: CYAN,
                    letterSpacing: "0.15em",
                    textShadow: `0 0 8px ${CYAN}44`,
                  }}
                >
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer
      style={{
        background: CARD_BG,
        borderTop: `1px solid ${PINK}1a`,
        padding: "3rem 2rem",
        fontFamily: "'Courier New', monospace",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Zap
              size={16}
              style={{ color: PINK, filter: `drop-shadow(0 0 6px ${PINK})` }}
            />
            <span
              style={{
                fontSize: "0.85rem",
                fontWeight: 900,
                color: PINK,
                textShadow: `0 0 12px ${PINK}`,
                letterSpacing: "0.08em",
              }}
            >
              PARTICLE // FIELD
            </span>
          </div>

          <div style={{ display: "flex", gap: "2rem" }}>
            {["TWITTER", "GITHUB", "DRIBBBLE", "INSTAGRAM", "LINKEDIN"].map(
              (soc) => (
                <a
                  key={soc}
                  href="#"
                  style={{
                    fontSize: "0.52rem",
                    color: `${CYAN}66`,
                    textDecoration: "none",
                    letterSpacing: "0.2em",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = CYAN;
                    (e.currentTarget as HTMLAnchorElement).style.textShadow = `0 0 10px ${CYAN}`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = `${CYAN}66`;
                    (e.currentTarget as HTMLAnchorElement).style.textShadow = "none";
                  }}
                >
                  {soc}
                </a>
              )
            )}
          </div>
        </div>

        <div
          style={{
            borderTop: `1px solid ${PINK}12`,
            paddingTop: "2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          <span
            style={{
              fontSize: "0.48rem",
              color: "#2a2a4455",
              letterSpacing: "0.3em",
            }}
          >
            © 2024 PARTICLE FIELD STUDIO. ALL SIGNALS RESERVED.
          </span>
          <div style={{ display: "flex", gap: "2rem" }}>
            {["PRIVACY.TXT", "TERMS.TXT", "COOKIES.TXT"].map((link) => (
              <a
                key={link}
                href="#"
                style={{
                  fontSize: "0.48rem",
                  color: `${PINK}33`,
                  textDecoration: "none",
                  letterSpacing: "0.2em",
                }}
              >
                {link}
              </a>
            ))}
          </div>
          <span
            style={{
              fontSize: "0.48rem",
              color: `${PINK}44`,
              letterSpacing: "0.2em",
            }}
          >
            [SYS: OPERATIONAL] // BERLIN_NODE_01
          </span>
        </div>
      </div>
    </footer>
  );
}

// ─── ROOT PAGE ────────────────────────────────────────────────────────────────

export default function ParticleFieldCyberpunk() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      style={{
        background: BG,
        minHeight: "100vh",
        fontFamily: "'Courier New', monospace",
        color: "#ccccff",
        overflowX: "hidden",
      }}
    >
      <GlobalStyles />
      <CursorTrail />
      <Navbar onMenuOpen={() => setMenuOpen(true)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Stats />
        <Team />
        <Manifesto />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
