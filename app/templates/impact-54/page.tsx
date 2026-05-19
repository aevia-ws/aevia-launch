"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useSpring,
  useInView,
  AnimatePresence,
} from "framer-motion";
import {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
  memo,
} from "react";
import {
  ArrowUpRight,
  X,
  Zap,
  Layers,
  Shield,
  Cpu,
  Terminal,
  Activity,
  Code2,
  Sparkles,
  ChevronRight,
} from "lucide-react";

// ─── GLOBAL STYLE INJECTION ───────────────────────────────────────────────────

const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Syne:wght@400;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #050510;
    --text: #e8e8ff;
    --accent: #7c3aed;
    --neon: #00ffd1;
    --muted: rgba(232,232,255,0.35);
    --card-bg: rgba(124,58,237,0.06);
    --border: rgba(124,58,237,0.18);
  }

  html { scroll-behavior: smooth; }
  body { background: var(--bg); color: var(--text); font-family: 'Inter', sans-serif; overflow-x: hidden; }

  ::selection { background: var(--accent); color: #fff; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 2px; }

  @keyframes particleDrift {
    0%   { opacity: 0.08; transform: translateY(0px) translateX(0px) scale(1); }
    33%  { opacity: 0.45; transform: translateY(-14px) translateX(7px) scale(1.3); }
    66%  { opacity: 0.15; transform: translateY(-6px) translateX(-5px) scale(0.85); }
    100% { opacity: 0.08; transform: translateY(0px) translateX(0px) scale(1); }
  }

  @keyframes float {
    0%   { transform: translateY(0px); }
    50%  { transform: translateY(-8px); }
    100% { transform: translateY(0px); }
  }

  @keyframes cursorBlink {
    0%, 49%  { opacity: 1; }
    50%, 100%{ opacity: 0; }
  }

  @keyframes rotateSlow {
    from { transform: rotateZ(0deg); }
    to   { transform: rotateZ(360deg); }
  }

  @keyframes pulseGlow {
    0%, 100% { box-shadow: 0 0 20px rgba(124,58,237,0.3); }
    50%       { box-shadow: 0 0 60px rgba(0,255,209,0.5), 0 0 100px rgba(124,58,237,0.3); }
  }

  @keyframes scanLine {
    0%   { transform: translateY(-100%); }
    100% { transform: translateY(100vh); }
  }

  @keyframes neonFlicker {
    0%, 95%, 100% { opacity: 1; }
    96%, 98%      { opacity: 0.4; }
  }

  .particle {
    position: absolute;
    border-radius: 50%;
    background: var(--neon);
    animation: particleDrift linear infinite;
    pointer-events: none;
  }

  .float-card {
    animation: float ease-in-out infinite;
  }

  .cursor-blink::after {
    content: '|';
    display: inline-block;
    color: var(--neon);
    animation: cursorBlink 0.8s step-end infinite;
    margin-left: 1px;
  }

  .neon-text {
    animation: neonFlicker 4s ease-in-out infinite;
  }

  .scan-line {
    position: fixed;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(0,255,209,0.15), transparent);
    animation: scanLine 8s linear infinite;
    pointer-events: none;
    z-index: 9998;
  }
`;

// ─── DATA ─────────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: Zap,
    title: "Zero-Latency Engine",
    desc: "Sub-millisecond computation pipeline with predictive cache warming. Your users never wait.",
    color: "#7c3aed",
  },
  {
    icon: Layers,
    title: "Infinite Composition",
    desc: "Stack visual primitives with mathematical precision. Every layer is GPU-accelerated.",
    color: "#00ffd1",
  },
  {
    icon: Shield,
    title: "Cryptographic Core",
    desc: "End-to-end encryption baked into the data layer. Zero-knowledge proofs by default.",
    color: "#7c3aed",
  },
  {
    icon: Cpu,
    title: "Neural Synthesis",
    desc: "Generative models trained on 10B creative samples. Art that thinks for itself.",
    color: "#00ffd1",
  },
  {
    icon: Terminal,
    title: "Dev-First API",
    desc: "GraphQL + REST with auto-generated TypeScript types. Ship in hours, not days.",
    color: "#7c3aed",
  },
  {
    icon: Activity,
    title: "Live Telemetry",
    desc: "Real-time observability with sub-second metric refresh. See everything, always.",
    color: "#00ffd1",
  },
];

const STATS = [
  { value: "10B+", label: "Samples Processed" },
  { value: "0.3ms", label: "P99 Latency" },
  { value: "99.99%", label: "Uptime SLA" },
  { value: "420K+", label: "Active Studios" },
];

const CODE_LINES = [
  "import { Genesis } from '@artgen/core';",
  "",
  "const canvas = new Genesis({",
  "  resolution: [3840, 2160],",
  "  depth: 'infinite',",
  "  renderer: 'gpu-accelerated',",
  "});",
  "",
  "canvas.layer('particle-field', {",
  "  count: 60_000,",
  "  physics: 'newtonian',",
  "  color: palette.neon,",
  "});",
  "",
  "canvas.layer('geometry', {",
  "  type: 'procedural',",
  "  seed: crypto.randomUUID(),",
  "  mutation: 'drift',",
  "});",
  "",
  "await canvas.render({ format: 'webp', quality: 1 });",
  "// ✓ 4K frame rendered in 12ms",
];

const PRICING = [
  {
    tier: "Studio",
    price: "$49",
    period: "/mo",
    desc: "For independent artists and small creative teams.",
    features: [
      "50K renders / month",
      "4K resolution output",
      "5 concurrent layers",
      "Community API access",
      "Basic telemetry",
    ],
    accent: false,
  },
  {
    tier: "Atelier",
    price: "$149",
    period: "/mo",
    desc: "For serious studios pushing creative boundaries.",
    features: [
      "Unlimited renders",
      "8K + HDR output",
      "Infinite layer depth",
      "Priority GPU cluster",
      "Real-time telemetry",
      "Neural synthesis beta",
    ],
    accent: true,
  },
  {
    tier: "Enterprise",
    price: "Custom",
    period: "",
    desc: "White-label deployment on your infrastructure.",
    features: [
      "On-prem or cloud",
      "SLA 99.99%",
      "Dedicated GPU pool",
      "Custom model training",
      "24/7 dedicated support",
      "Compliance & audit logs",
    ],
    accent: false,
  },
];

// ─── STYLE INJECTION COMPONENT ────────────────────────────────────────────────

function StyleInjector() {
  useEffect(() => {
    const existing = document.getElementById("impact-54-styles");
    if (existing) return;
    const tag = document.createElement("style");
    tag.id = "impact-54-styles";
    tag.textContent = GLOBAL_STYLES;
    document.head.appendChild(tag);
    return () => {
      const el = document.getElementById("impact-54-styles");
      if (el) el.remove();
    };
  }, []);
  return null;
}

// ─── REVEAL ON SCROLL ─────────────────────────────────────────────────────────

const Reveal = memo(function Reveal({
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
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      style={style}
    >
      {children}
    </motion.div>
  );
});

// ─── 1. CSS PARTICLE FIELD ────────────────────────────────────────────────────

function ParticleField() {
  const particles = useMemo(() => {
    return Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: `${2 + ((i * 1.618) % 96)}%`,
      top: `${1 + ((i * 2.718) % 97)}%`,
      size: 2 + (i % 4),
      delay: `${(i * 0.27) % 7}s`,
      duration: `${5 + (i % 6)}s`,
      opacity: 0.08 + (i % 5) * 0.04,
    }));
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
            opacity: p.opacity,
            background:
              p.id % 3 === 0
                ? "#00ffd1"
                : p.id % 3 === 1
                ? "#7c3aed"
                : "#e8e8ff",
          }}
        />
      ))}
    </div>
  );
}

// ─── 2. 3D ROTATING PRODUCT SHOWCASE ─────────────────────────────────────────

function RotatingProduct({ scrollYProgress }: { scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const hue = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [260, 200, 150, 170, 260]);
  const shadowColor = useMotionTemplate`drop-shadow(0px 30px 60px hsl(${hue}deg 80% 55% / 0.5))`;

  const spring = useSpring(rotateY, { stiffness: 40, damping: 20 });

  return (
    <motion.div
      style={{
        width: 280,
        height: 280,
        position: "relative",
        transformStyle: "preserve-3d",
        perspective: 1200,
        rotateY: spring,
        filter: shadowColor,
        margin: "0 auto",
      }}
    >
      {/* Outer ring */}
      <motion.div
        animate={{ rotateZ: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          inset: 0,
          border: "2px solid rgba(124,58,237,0.4)",
          borderRadius: "50%",
        }}
      />
      {/* Inner diagonal square */}
      <motion.div
        animate={{ rotateZ: -360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          top: "15%",
          left: "15%",
          right: "15%",
          bottom: "15%",
          border: "2px solid rgba(0,255,209,0.5)",
          transform: "rotateZ(45deg)",
          borderRadius: 8,
        }}
      />
      {/* Core hexagonal shape */}
      <motion.div
        animate={{ rotateZ: 120 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          top: "28%",
          left: "28%",
          right: "28%",
          bottom: "28%",
          background: "linear-gradient(135deg, rgba(124,58,237,0.7), rgba(0,255,209,0.4))",
          borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
          border: "1px solid rgba(232,232,255,0.2)",
        }}
      />
      {/* Center dot */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 16,
          height: 16,
          borderRadius: "50%",
          background: "#00ffd1",
          boxShadow: "0 0 30px #00ffd1, 0 0 60px rgba(0,255,209,0.5)",
          animation: "pulseGlow 2s ease-in-out infinite",
        }}
      />
      {/* Orbiting accent dots */}
      {[0, 72, 144, 216, 288].map((angle, i) => (
        <motion.div
          key={i}
          animate={{ rotateZ: 360 }}
          transition={{ duration: 8 + i * 1.5, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            inset: 0,
            transformOrigin: "center",
            transform: `rotateZ(${angle}deg)`,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translate(-50%, 0)",
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: i % 2 === 0 ? "#7c3aed" : "#00ffd1",
              boxShadow: `0 0 12px ${i % 2 === 0 ? "#7c3aed" : "#00ffd1"}`,
            }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

// ─── 3. TYPEWRITER CODE REVEAL ────────────────────────────────────────────────

function TypewriterCode() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [revealedLines, setRevealedLines] = useState<string[]>([]);
  const [currentLineIdx, setCurrentLineIdx] = useState(0);
  const [currentCharIdx, setCurrentCharIdx] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (inView && !started) {
      setStarted(true);
    }
  }, [inView, started]);

  useEffect(() => {
    if (!started) return;
    if (currentLineIdx >= CODE_LINES.length) return;

    const line = CODE_LINES[currentLineIdx];

    if (currentCharIdx >= line.length) {
      const timer = setTimeout(() => {
        setRevealedLines((prev) => [...prev, line]);
        setCurrentLineIdx((i) => i + 1);
        setCurrentCharIdx(0);
      }, line.length === 0 ? 80 : 120);
      return () => clearTimeout(timer);
    }

    const charDelay = line.length === 0 ? 80 : 28 + Math.random() * 20;
    const timer = setTimeout(() => {
      setCurrentCharIdx((c) => c + 1);
    }, charDelay);
    return () => clearTimeout(timer);
  }, [started, currentLineIdx, currentCharIdx]);

  const currentTypingLine = currentLineIdx < CODE_LINES.length
    ? CODE_LINES[currentLineIdx].slice(0, currentCharIdx)
    : null;
  const isTypingDone = currentLineIdx >= CODE_LINES.length;

  return (
    <div ref={ref}>
      <div
        style={{
          background: "rgba(5,5,16,0.95)",
          border: "1px solid rgba(124,58,237,0.3)",
          borderRadius: 12,
          overflow: "hidden",
          fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
          fontSize: 13,
          lineHeight: 1.7,
        }}
      >
        {/* Terminal chrome */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "12px 16px",
            borderBottom: "1px solid rgba(124,58,237,0.2)",
            background: "rgba(124,58,237,0.08)",
          }}
        >
          {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
            <div
              key={i}
              style={{ width: 12, height: 12, borderRadius: "50%", background: c }}
            />
          ))}
          <span
            style={{
              marginLeft: 8,
              color: "rgba(232,232,255,0.3)",
              fontSize: 11,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            artgen-studio — canvas.ts
          </span>
        </div>

        {/* Code body */}
        <div style={{ padding: "20px 24px", minHeight: 480 }}>
          {revealedLines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1 }}
              style={{ display: "flex", gap: 16 }}
            >
              <span style={{ color: "rgba(232,232,255,0.15)", userSelect: "none", minWidth: 24, textAlign: "right" }}>
                {i + 1}
              </span>
              <span style={{ color: colorizeCode(line) ? undefined : "rgba(232,232,255,0.7)" }}>
                {renderColorizedLine(line)}
              </span>
            </motion.div>
          ))}

          {currentTypingLine !== null && (
            <div style={{ display: "flex", gap: 16 }}>
              <span style={{ color: "rgba(232,232,255,0.15)", userSelect: "none", minWidth: 24, textAlign: "right" }}>
                {revealedLines.length + 1}
              </span>
              <span
                className={isTypingDone ? "" : "cursor-blink"}
                style={{ color: "rgba(232,232,255,0.7)" }}
              >
                {renderColorizedLine(currentTypingLine)}
              </span>
            </div>
          )}

          {isTypingDone && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ marginTop: 12, color: "#00ffd1", fontSize: 12 }}
            >
              <span style={{ color: "rgba(232,232,255,0.2)" }}>{CODE_LINES.length + 1}</span>
              {"  "}
              <span className="neon-text">✓ Genesis compiled in 847ms — ready to render</span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

function colorizeCode(line: string) {
  return line.includes("import") || line.includes("const") || line.includes("await");
}

function renderColorizedLine(line: string): React.ReactNode {
  if (!line) return " ";

  const parts: { text: string; color: string }[] = [];

  // Very lightweight syntax highlighting via regex replacement
  const keywords = ["import", "from", "const", "new", "await", "async", "return"];
  const strings = line.match(/'[^']*'|"[^"]*"|`[^`]*`/g);
  const comments = line.match(/\/\/.*/)?.[0];

  if (comments) {
    const beforeComment = line.slice(0, line.indexOf(comments));
    return (
      <>
        <ColorizedSegment text={beforeComment} />
        <span style={{ color: "rgba(0,255,209,0.5)", fontStyle: "italic" }}>{comments}</span>
      </>
    );
  }

  return <ColorizedSegment text={line} />;
}

function ColorizedSegment({ text }: { text: string }) {
  const keywords = ["import", "from", "const", "new", "await", "async", "return", "true", "false"];
  const parts = text.split(/(\s+|[.,:{}\[\]()'])/);

  return (
    <>
      {parts.map((part, i) => {
        if (keywords.includes(part.trim())) {
          return <span key={i} style={{ color: "#7c3aed" }}>{part}</span>;
        }
        if (/^['"`]/.test(part) || /['"`]$/.test(part)) {
          return <span key={i} style={{ color: "#00ffd1" }}>{part}</span>;
        }
        if (/^\d/.test(part.trim())) {
          return <span key={i} style={{ color: "#f59e0b" }}>{part}</span>;
        }
        if (/^[A-Z]/.test(part.trim()) && part.trim().length > 1) {
          return <span key={i} style={{ color: "#60a5fa" }}>{part}</span>;
        }
        return <span key={i} style={{ color: "rgba(232,232,255,0.75)" }}>{part}</span>;
      })}
    </>
  );
}

// ─── 4. SCROLL-SCRUBBED COLOR THEME ──────────────────────────────────────────

function useScrollTheme(scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"]) {
  // 5 color stops driving background gradient
  const r1 = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [5, 5, 20, 5, 5]);
  const g1 = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [5, 10, 5, 30, 5]);
  const b1 = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [16, 60, 16, 40, 16]);

  const accentH = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [262, 220, 280, 160, 262]);
  const accentS = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [80, 90, 85, 80, 80]);
  const accentL = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [58, 65, 55, 50, 58]);

  const bgGradient = useMotionTemplate`radial-gradient(ellipse 120% 80% at 50% 0%, rgb(${r1},${g1},${b1}) 0%, #050510 70%)`;
  const accentColor = useMotionTemplate`hsl(${accentH}deg ${accentS}% ${accentL}%)`;

  return { bgGradient, accentColor };
}

// ─── NAVIGATION ───────────────────────────────────────────────────────────────

function Navigation({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (v: boolean) => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 40px",
          height: 72,
          background: scrolled ? "rgba(5,5,16,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(124,58,237,0.15)" : "none",
          transition: "background 0.5s, backdrop-filter 0.5s, border-color 0.5s",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              background: "linear-gradient(135deg, #7c3aed, #00ffd1)",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Sparkles style={{ width: 18, height: 18, color: "#fff" }} />
          </div>
          <span
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: 18,
              color: "#e8e8ff",
              letterSpacing: "-0.02em",
            }}
          >
            ARTGEN
          </span>
        </div>

        {/* Links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 36,
            fontFamily: "'Inter', sans-serif",
            fontSize: 13,
            fontWeight: 500,
            color: "rgba(232,232,255,0.5)",
          }}
        >
          {["Product", "Features", "Pricing", "Docs"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              style={{ textDecoration: "none", color: "inherit", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#e8e8ff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(232,232,255,0.5)")}
            >
              {item}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            style={{
              background: "none",
              border: "none",
              color: "rgba(232,232,255,0.5)",
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
              padding: "8px 16px",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Sign in
          </button>
          <button
            style={{
              background: "linear-gradient(135deg, #7c3aed, #5b21b6)",
              border: "none",
              color: "#fff",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              padding: "8px 20px",
              borderRadius: 8,
              fontFamily: "'Inter', sans-serif",
              boxShadow: "0 0 20px rgba(124,58,237,0.4)",
              transition: "box-shadow 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 0 40px rgba(124,58,237,0.7)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 0 20px rgba(124,58,237,0.4)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Get Early Access
          </button>
          <button
            onClick={() => setMenuOpen(true)}
            style={{
              background: "none",
              border: "1px solid rgba(124,58,237,0.3)",
              color: "#e8e8ff",
              cursor: "pointer",
              padding: "8px 12px",
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <rect y="3" width="16" height="1.5" rx="0.75" />
              <rect y="7.25" width="12" height="1.5" rx="0.75" />
              <rect y="11.5" width="8" height="1.5" rx="0.75" />
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* Mobile / Fullscreen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at calc(100% - 56px) 36px)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at calc(100% - 56px) 36px)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at calc(100% - 56px) 36px)" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 60,
              background: "#050510",
              display: "flex",
              flexDirection: "column",
              padding: "32px 48px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 80 }}>
              <span
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: 22,
                  color: "#e8e8ff",
                }}
              >
                ARTGEN
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                style={{
                  background: "none",
                  border: "1px solid rgba(232,232,255,0.15)",
                  color: "#e8e8ff",
                  cursor: "pointer",
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <X style={{ width: 20, height: 20 }} />
              </button>
            </div>
            <nav style={{ display: "flex", flexDirection: "column", gap: 24, flex: 1 }}>
              {["Product", "Features", "Pricing", "Docs", "Blog", "About"].map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 + 0.15, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(36px, 7vw, 80px)",
                    color: "#e8e8ff",
                    textDecoration: "none",
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#00ffd1")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#e8e8ff")}
                >
                  {item}
                </motion.a>
              ))}
            </nav>
            <div
              style={{
                borderTop: "1px solid rgba(232,232,255,0.08)",
                paddingTop: 24,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "rgba(232,232,255,0.3)",
                fontSize: 12,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              <span>© 2026 ARTGEN STUDIO</span>
              <span>Creative Tech Platform</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── HERO SECTION ─────────────────────────────────────────────────────────────

function HeroSection({ scrollYProgress }: { scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const { bgGradient, accentColor } = useScrollTheme(scrollYProgress);
  const heroY = useTransform(scrollYProgress, [0, 0.4], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  return (
    <motion.section
      id="product"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: bgGradient,
      }}
    >
      {/* Particle field */}
      <ParticleField />

      {/* Grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(124,58,237,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.06) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          padding: "0 24px",
          maxWidth: 920,
          y: heroY,
          opacity: heroOpacity,
        }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(124,58,237,0.12)",
            border: "1px solid rgba(124,58,237,0.3)",
            borderRadius: 100,
            padding: "6px 16px",
            marginBottom: 36,
            color: "#00ffd1",
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.08em",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#00ffd1",
              boxShadow: "0 0 8px #00ffd1",
            }}
          />
          GENESIS ENGINE v3.0 — NOW LIVE
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(52px, 9vw, 120px)",
            lineHeight: 0.92,
            letterSpacing: "-0.04em",
            color: "#e8e8ff",
            marginBottom: 32,
          }}
        >
          Generative Art
          <br />
          <motion.span
            style={{ color: accentColor }}
            className="neon-text"
          >
            Redefined.
          </motion.span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: "clamp(15px, 2.2vw, 20px)",
            color: "rgba(232,232,255,0.5)",
            lineHeight: 1.65,
            maxWidth: 560,
            margin: "0 auto 48px",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
          }}
        >
          The creative tech platform for studios that refuse to compromise.
          GPU-accelerated rendering, neural synthesis, infinite layers — in one API.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}
        >
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: "0 0 50px rgba(124,58,237,0.8)" }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: "linear-gradient(135deg, #7c3aed, #4f1c99)",
              border: "none",
              color: "#fff",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
              padding: "14px 32px",
              borderRadius: 10,
              fontFamily: "'Inter', sans-serif",
              boxShadow: "0 0 30px rgba(124,58,237,0.4)",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            Start Creating Free
            <ArrowUpRight style={{ width: 18, height: 18 }} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03, borderColor: "rgba(0,255,209,0.5)" }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: "rgba(232,232,255,0.04)",
              border: "1px solid rgba(232,232,255,0.12)",
              color: "#e8e8ff",
              fontSize: 15,
              fontWeight: 500,
              cursor: "pointer",
              padding: "14px 32px",
              borderRadius: 10,
              fontFamily: "'Inter', sans-serif",
              transition: "border-color 0.2s",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Code2 style={{ width: 18, height: 18, color: "#00ffd1" }} />
            View API Docs
          </motion.button>
        </motion.div>

        {/* Social proof */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{
            marginTop: 40,
            fontSize: 12,
            color: "rgba(232,232,255,0.25)",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Trusted by 420,000+ studios worldwide · SOC 2 Type II · GDPR compliant
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{
          position: "absolute",
          bottom: 36,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          color: "rgba(232,232,255,0.25)",
          fontSize: 11,
          fontFamily: "'Inter', sans-serif",
          letterSpacing: "0.12em",
        }}
      >
        <span>SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: 1,
            height: 40,
            background: "linear-gradient(to bottom, rgba(124,58,237,0.6), transparent)",
          }}
        />
      </motion.div>
    </motion.section>
  );
}

// ─── PRODUCT 3D SHOWCASE SECTION ──────────────────────────────────────────────

function ShowcaseSection({ scrollYProgress }: { scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const { bgGradient } = useScrollTheme(scrollYProgress);
  const ref = useRef(null);
  const sectionInView = useInView(ref, { once: false, margin: "-20%" });

  return (
    <section
      id="showcase"
      ref={ref}
      style={{
        position: "relative",
        padding: "140px 40px",
        overflow: "hidden",
      }}
    >
      {/* Section background glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 80 }}>
            <span
              style={{
                display: "inline-block",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.2em",
                color: "#00ffd1",
                fontFamily: "'Inter', sans-serif",
                marginBottom: 16,
              }}
            >
              3D PRODUCT SHOWCASE
            </span>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(36px, 6vw, 72px)",
                lineHeight: 1,
                letterSpacing: "-0.03em",
                color: "#e8e8ff",
              }}
            >
              The Genesis Engine
            </h2>
            <p
              style={{
                marginTop: 20,
                fontSize: 16,
                color: "rgba(232,232,255,0.45)",
                fontFamily: "'Inter', sans-serif",
                maxWidth: 440,
                margin: "20px auto 0",
                lineHeight: 1.65,
              }}
            >
              Scroll to rotate. Every axis represents a dimension of your creative process.
            </p>
          </div>
        </Reveal>

        {/* 3D shape + data ring layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
            gap: 48,
          }}
        >
          {/* Left data */}
          <Reveal delay={0.1}>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {[
                { label: "Render Engine", value: "GPU-Native v3", color: "#7c3aed" },
                { label: "Layer Depth", value: "∞ Infinite", color: "#00ffd1" },
                { label: "Output Formats", value: "48 Codecs", color: "#7c3aed" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  animate={sectionInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.12 + 0.2, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    background: "rgba(5,5,16,0.8)",
                    border: `1px solid ${item.color}25`,
                    borderRadius: 10,
                    padding: "16px 20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      color: "rgba(232,232,255,0.4)",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {item.label}
                  </span>
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: item.color,
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {item.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </Reveal>

          {/* 3D rotating shape */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={sectionInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "relative" }}
          >
            <RotatingProduct scrollYProgress={scrollYProgress} />
            {/* Label under shape */}
            <p
              style={{
                textAlign: "center",
                marginTop: 24,
                fontSize: 11,
                color: "rgba(232,232,255,0.25)",
                fontFamily: "'Inter', sans-serif",
                letterSpacing: "0.12em",
              }}
            >
              SCROLL TO ROTATE ↕
            </p>
          </motion.div>

          {/* Right data */}
          <Reveal delay={0.2}>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {[
                { label: "Neural Models", value: "28 Loaded", color: "#00ffd1" },
                { label: "API Latency", value: "< 0.3ms", color: "#7c3aed" },
                { label: "Uptime", value: "99.99%", color: "#00ffd1" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  animate={sectionInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.12 + 0.3, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    background: "rgba(5,5,16,0.8)",
                    border: `1px solid ${item.color}25`,
                    borderRadius: 10,
                    padding: "16px 20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      color: "rgba(232,232,255,0.4)",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {item.label}
                  </span>
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: item.color,
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {item.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── 5. FEATURE CARDS WITH FLOAT + SPRING HOVER ───────────────────────────────

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof FEATURES)[number];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="float-card"
      whileHover={{ scale: 1.03 }}
      transition={{
        scale: { type: "spring", stiffness: 280, damping: 22 },
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        animationDelay: `${index * 0.4}s`,
        animationDuration: `${3.5 + index * 0.3}s`,
        background: hovered
          ? `linear-gradient(135deg, rgba(124,58,237,0.12), rgba(0,255,209,0.04))`
          : "rgba(232,232,255,0.02)",
        border: `1px solid ${hovered ? "rgba(124,58,237,0.35)" : "rgba(232,232,255,0.06)"}`,
        borderRadius: 16,
        padding: "32px 28px",
        cursor: "default",
        transition: "background 0.3s, border-color 0.3s",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Hover glow */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 1,
              background: `linear-gradient(90deg, transparent, ${feature.color}, transparent)`,
            }}
          />
        )}
      </AnimatePresence>

      {/* Icon */}
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 10,
          background: `${feature.color}18`,
          border: `1px solid ${feature.color}30`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 20,
          transition: "box-shadow 0.3s",
          boxShadow: hovered ? `0 0 20px ${feature.color}40` : "none",
        }}
      >
        <feature.icon
          style={{ width: 22, height: 22, color: feature.color }}
        />
      </div>

      <h3
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 700,
          fontSize: 18,
          color: "#e8e8ff",
          marginBottom: 10,
          letterSpacing: "-0.01em",
        }}
      >
        {feature.title}
      </h3>
      <p
        style={{
          fontSize: 14,
          color: "rgba(232,232,255,0.45)",
          lineHeight: 1.65,
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {feature.desc}
      </p>

      {/* Bottom arrow */}
      <motion.div
        animate={hovered ? { x: 4, opacity: 1 } : { x: 0, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        style={{
          position: "absolute",
          bottom: 24,
          right: 24,
          color: feature.color,
        }}
      >
        <ChevronRight style={{ width: 18, height: 18 }} />
      </motion.div>
    </motion.div>
  );
}

function FeaturesSection() {
  return (
    <section
      id="features"
      style={{ padding: "140px 40px", position: "relative" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal>
          <div style={{ marginBottom: 80 }}>
            <span
              style={{
                display: "block",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.2em",
                color: "#00ffd1",
                fontFamily: "'Inter', sans-serif",
                marginBottom: 16,
              }}
            >
              CAPABILITIES
            </span>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                flexWrap: "wrap",
                gap: 24,
              }}
            >
              <h2
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(32px, 5.5vw, 64px)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.03em",
                  color: "#e8e8ff",
                  maxWidth: 480,
                }}
              >
                Everything a creative studio needs.
              </h2>
              <p
                style={{
                  fontSize: 15,
                  color: "rgba(232,232,255,0.4)",
                  fontFamily: "'Inter', sans-serif",
                  maxWidth: 340,
                  lineHeight: 1.65,
                }}
              >
                Built by artists, engineered for production. Every primitive is
                composable, every workflow is scriptable.
              </p>
            </div>
          </div>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 20,
          }}
        >
          {FEATURES.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 0.07}>
              <FeatureCard feature={feature} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CODE TYPEWRITER SECTION ──────────────────────────────────────────────────

function CodeSection() {
  return (
    <section
      id="docs"
      style={{
        padding: "140px 40px",
        background: "rgba(124,58,237,0.03)",
        borderTop: "1px solid rgba(124,58,237,0.1)",
        borderBottom: "1px solid rgba(124,58,237,0.1)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.6fr",
            gap: 80,
            alignItems: "center",
          }}
        >
          {/* Left text */}
          <div>
            <Reveal>
              <span
                style={{
                  display: "block",
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  color: "#00ffd1",
                  fontFamily: "'Inter', sans-serif",
                  marginBottom: 16,
                }}
              >
                DEV-FIRST API
              </span>
              <h2
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(28px, 4vw, 52px)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.03em",
                  color: "#e8e8ff",
                  marginBottom: 24,
                }}
              >
                Ship generative art in&nbsp;minutes.
              </h2>
              <p
                style={{
                  fontSize: 15,
                  color: "rgba(232,232,255,0.45)",
                  fontFamily: "'Inter', sans-serif",
                  lineHeight: 1.7,
                  marginBottom: 36,
                }}
              >
                The Genesis SDK abstracts GPU orchestration, layer composition,
                and neural inference behind a clean, typed API. Ten lines of
                code. Infinite possibilities.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  "Auto-generated TypeScript types",
                  "GraphQL + REST endpoints",
                  "Webhook event streaming",
                  "OpenAPI 3.1 specification",
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      fontSize: 14,
                      color: "rgba(232,232,255,0.6)",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    <div
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "#00ffd1",
                        flexShrink: 0,
                        boxShadow: "0 0 8px #00ffd1",
                      }}
                    />
                    {item}
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  marginTop: 36,
                  background: "none",
                  border: "1px solid rgba(0,255,209,0.3)",
                  color: "#00ffd1",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  padding: "12px 24px",
                  borderRadius: 8,
                  fontFamily: "'Inter', sans-serif",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(0,255,209,0.07)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "none";
                }}
              >
                Read the docs
                <ArrowUpRight style={{ width: 16, height: 16 }} />
              </motion.button>
            </Reveal>
          </div>

          {/* Right — typewriter */}
          <Reveal delay={0.1}>
            <TypewriterCode />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── STATS SECTION ────────────────────────────────────────────────────────────

function StatsSection({ scrollYProgress }: { scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const { accentColor } = useScrollTheme(scrollYProgress);

  return (
    <section style={{ padding: "120px 40px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Divider */}
        <Reveal>
          <div
            style={{
              height: 1,
              background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.4), rgba(0,255,209,0.4), transparent)",
              marginBottom: 96,
            }}
          />
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 2,
          }}
        >
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <motion.div
                whileHover={{ scale: 1.04 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                style={{
                  padding: "48px 32px",
                  borderLeft: i === 0 ? "none" : "1px solid rgba(232,232,255,0.06)",
                  textAlign: "center",
                }}
              >
                <motion.div
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(36px, 5vw, 64px)",
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                    marginBottom: 12,
                    color: i % 2 === 0 ? "#e8e8ff" : "#00ffd1",
                  }}
                >
                  {stat.value}
                </motion.div>
                <p
                  style={{
                    fontSize: 13,
                    color: "rgba(232,232,255,0.35)",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    letterSpacing: "0.05em",
                  }}
                >
                  {stat.label}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div
            style={{
              height: 1,
              background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.4), rgba(0,255,209,0.4), transparent)",
              marginTop: 96,
            }}
          />
        </Reveal>
      </div>
    </section>
  );
}

// ─── PRICING SECTION ──────────────────────────────────────────────────────────

function PricingCard({
  plan,
  index,
}: {
  plan: (typeof PRICING)[number];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <Reveal delay={index * 0.1}>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        style={{
          background: plan.accent
            ? "linear-gradient(135deg, rgba(124,58,237,0.18), rgba(124,58,237,0.08))"
            : "rgba(232,232,255,0.02)",
          border: `1px solid ${plan.accent ? "rgba(124,58,237,0.45)" : "rgba(232,232,255,0.07)"}`,
          borderRadius: 20,
          padding: "44px 36px",
          position: "relative",
          overflow: "hidden",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {plan.accent && (
          <div
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              background: "linear-gradient(135deg, #7c3aed, #00ffd1)",
              color: "#fff",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.12em",
              padding: "4px 10px",
              borderRadius: 100,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            MOST POPULAR
          </div>
        )}

        {/* Accent glow top */}
        {plan.accent && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              background: "linear-gradient(90deg, #7c3aed, #00ffd1)",
            }}
          />
        )}

        <div style={{ marginBottom: 32 }}>
          <span
            style={{
              display: "block",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.15em",
              color: plan.accent ? "#00ffd1" : "rgba(232,232,255,0.4)",
              fontFamily: "'Inter', sans-serif",
              marginBottom: 12,
            }}
          >
            {plan.tier.toUpperCase()}
          </span>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 4, marginBottom: 12 }}>
            <span
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: 52,
                letterSpacing: "-0.04em",
                color: "#e8e8ff",
                lineHeight: 1,
              }}
            >
              {plan.price}
            </span>
            {plan.period && (
              <span
                style={{
                  fontSize: 15,
                  color: "rgba(232,232,255,0.3)",
                  fontFamily: "'Inter', sans-serif",
                  paddingBottom: 8,
                }}
              >
                {plan.period}
              </span>
            )}
          </div>
          <p
            style={{
              fontSize: 14,
              color: "rgba(232,232,255,0.4)",
              fontFamily: "'Inter', sans-serif",
              lineHeight: 1.5,
            }}
          >
            {plan.desc}
          </p>
        </div>

        {/* Features list */}
        <ul
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            flex: 1,
            marginBottom: 36,
          }}
        >
          {plan.features.map((feat, i) => (
            <li
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                fontSize: 14,
                color: "rgba(232,232,255,0.65)",
                fontFamily: "'Inter', sans-serif",
                listStyle: "none",
              }}
            >
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: plan.accent ? "rgba(0,255,209,0.15)" : "rgba(124,58,237,0.15)",
                  border: `1px solid ${plan.accent ? "rgba(0,255,209,0.4)" : "rgba(124,58,237,0.3)"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                  <path
                    d="M1.5 4.5L3.5 6.5L7.5 2.5"
                    stroke={plan.accent ? "#00ffd1" : "#7c3aed"}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              {feat}
            </li>
          ))}
        </ul>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            width: "100%",
            padding: "14px",
            background: plan.accent
              ? "linear-gradient(135deg, #7c3aed, #5b21b6)"
              : "rgba(232,232,255,0.05)",
            border: plan.accent ? "none" : "1px solid rgba(232,232,255,0.1)",
            color: "#e8e8ff",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            borderRadius: 10,
            fontFamily: "'Inter', sans-serif",
            boxShadow: plan.accent ? "0 0 30px rgba(124,58,237,0.35)" : "none",
            transition: "box-shadow 0.2s",
          }}
          onMouseEnter={(e) => {
            if (plan.accent) e.currentTarget.style.boxShadow = "0 0 50px rgba(124,58,237,0.6)";
          }}
          onMouseLeave={(e) => {
            if (plan.accent) e.currentTarget.style.boxShadow = "0 0 30px rgba(124,58,237,0.35)";
          }}
        >
          {plan.tier === "Enterprise" ? "Contact Sales" : "Get Started"}
        </motion.button>
      </motion.div>
    </Reveal>
  );
}

function PricingSection() {
  return (
    <section
      id="pricing"
      style={{ padding: "140px 40px" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 80 }}>
            <span
              style={{
                display: "block",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.2em",
                color: "#00ffd1",
                fontFamily: "'Inter', sans-serif",
                marginBottom: 16,
              }}
            >
              PRICING
            </span>
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(32px, 5.5vw, 64px)",
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                color: "#e8e8ff",
                marginBottom: 20,
              }}
            >
              Simple, honest pricing.
            </h2>
            <p
              style={{
                fontSize: 16,
                color: "rgba(232,232,255,0.4)",
                fontFamily: "'Inter', sans-serif",
                maxWidth: 400,
                margin: "0 auto",
                lineHeight: 1.65,
              }}
            >
              All plans include the Genesis core. No per-render fees. No
              surprise bills.
            </p>
          </div>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
            alignItems: "start",
          }}
        >
          {PRICING.map((plan, i) => (
            <PricingCard key={plan.tier} plan={plan} index={i} />
          ))}
        </div>

        <Reveal delay={0.3}>
          <p
            style={{
              textAlign: "center",
              marginTop: 48,
              fontSize: 13,
              color: "rgba(232,232,255,0.2)",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            All prices in USD. Cancel anytime. SOC 2 Type II certified.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ─── CTA SECTION ──────────────────────────────────────────────────────────────

function CTASection({ scrollYProgress }: { scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const { accentColor } = useScrollTheme(scrollYProgress);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section style={{ padding: "140px 40px 160px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }} ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: "linear-gradient(135deg, rgba(124,58,237,0.14) 0%, rgba(0,255,209,0.05) 100%)",
            border: "1px solid rgba(124,58,237,0.25)",
            borderRadius: 24,
            padding: "100px 60px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Background particles inside CTA */}
          <ParticleField />

          {/* Large radial glow */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              width: 700,
              height: 400,
              borderRadius: "50%",
              background: "radial-gradient(ellipse, rgba(124,58,237,0.12) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* Grid overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(rgba(124,58,237,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.05) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              borderRadius: 24,
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "relative", zIndex: 5 }}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.8 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(0,255,209,0.08)",
                border: "1px solid rgba(0,255,209,0.25)",
                borderRadius: 100,
                padding: "6px 18px",
                marginBottom: 36,
                color: "#00ffd1",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.1em",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              <Sparkles style={{ width: 14, height: 14 }} />
              FREE DURING BETA
            </motion.div>

            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(40px, 7vw, 88px)",
                lineHeight: 1,
                letterSpacing: "-0.04em",
                color: "#e8e8ff",
                marginBottom: 28,
              }}
            >
              Create without limits.
              <br />
              <motion.span style={{ color: accentColor }}>
                Ship without fear.
              </motion.span>
            </h2>

            <p
              style={{
                fontSize: 17,
                color: "rgba(232,232,255,0.45)",
                fontFamily: "'Inter', sans-serif",
                maxWidth: 480,
                margin: "0 auto 48px",
                lineHeight: 1.65,
              }}
            >
              Join 420,000+ studios already using the Genesis Engine to produce
              work that was previously impossible.
            </p>

            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <motion.button
                whileHover={{ scale: 1.04, boxShadow: "0 0 60px rgba(124,58,237,0.9)" }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #4f1c99)",
                  border: "none",
                  color: "#fff",
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: "pointer",
                  padding: "16px 40px",
                  borderRadius: 12,
                  fontFamily: "'Inter', sans-serif",
                  boxShadow: "0 0 40px rgba(124,58,237,0.5)",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                Start for Free
                <ArrowUpRight style={{ width: 20, height: 20 }} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: "rgba(232,232,255,0.05)",
                  border: "1px solid rgba(232,232,255,0.12)",
                  color: "#e8e8ff",
                  fontSize: 16,
                  fontWeight: 500,
                  cursor: "pointer",
                  padding: "16px 40px",
                  borderRadius: 12,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Book a Demo
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function Footer() {
  const footerLinks = {
    Product: ["Overview", "Features", "Changelog", "Roadmap"],
    Developers: ["API Reference", "SDK", "GitHub", "Status"],
    Company: ["About", "Blog", "Careers", "Press"],
    Legal: ["Privacy", "Terms", "Security", "Cookies"],
  };

  return (
    <footer
      style={{
        padding: "80px 40px 48px",
        borderTop: "1px solid rgba(232,232,255,0.06)",
        background: "rgba(5,5,16,0.95)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr repeat(4, 1fr)",
            gap: 40,
            marginBottom: 64,
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  background: "linear-gradient(135deg, #7c3aed, #00ffd1)",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Sparkles style={{ width: 18, height: 18, color: "#fff" }} />
              </div>
              <span
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: 18,
                  color: "#e8e8ff",
                }}
              >
                ARTGEN
              </span>
            </div>
            <p
              style={{
                fontSize: 14,
                color: "rgba(232,232,255,0.3)",
                fontFamily: "'Inter', sans-serif",
                lineHeight: 1.7,
                maxWidth: 280,
                marginBottom: 24,
              }}
            >
              The generative art platform for studios that push the boundaries of
              what is visually possible.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              {["𝕏", "in", "gh", "dc"].map((s) => (
                <a
                  key={s}
                  href="#"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    border: "1px solid rgba(232,232,255,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(232,232,255,0.35)",
                    fontSize: 13,
                    textDecoration: "none",
                    fontFamily: "'Inter', sans-serif",
                    transition: "border-color 0.2s, color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(124,58,237,0.4)";
                    e.currentTarget.style.color = "#e8e8ff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(232,232,255,0.08)";
                    e.currentTarget.style.color = "rgba(232,232,255,0.35)";
                  }}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  color: "rgba(232,232,255,0.3)",
                  fontFamily: "'Inter', sans-serif",
                  marginBottom: 20,
                  textTransform: "uppercase",
                }}
              >
                {section}
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      style={{
                        fontSize: 14,
                        color: "rgba(232,232,255,0.4)",
                        textDecoration: "none",
                        fontFamily: "'Inter', sans-serif",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#e8e8ff")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(232,232,255,0.4)")}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(232,232,255,0.06)",
            paddingTop: 32,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <p
            style={{
              fontSize: 13,
              color: "rgba(232,232,255,0.2)",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            © 2026 Artgen Studio, Inc. All rights reserved.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            {["Status: Operational", "v3.0.1"].map((item, i) => (
              <span
                key={i}
                style={{
                  fontSize: 12,
                  color: "rgba(232,232,255,0.2)",
                  fontFamily: "'Inter', sans-serif",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                {i === 0 && (
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#00ffd1",
                      boxShadow: "0 0 6px #00ffd1",
                      display: "inline-block",
                    }}
                  />
                )}
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function Impact54Page() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"],
  });

  // Scroll-driven background color via 5 stops
  const bgR = useTransform(scrollYProgress, [0, 0.2, 0.45, 0.7, 1], [5, 3, 8, 4, 5]);
  const bgG = useTransform(scrollYProgress, [0, 0.2, 0.45, 0.7, 1], [5, 4, 5, 10, 5]);
  const bgB = useTransform(scrollYProgress, [0, 0.2, 0.45, 0.7, 1], [16, 28, 14, 22, 16]);
  const scrollBg = useMotionTemplate`rgb(${bgR},${bgG},${bgB})`;

  return (
    <>
      <StyleInjector />

      {/* Ambient scan line */}
      <div className="scan-line" />

      <motion.div
        ref={pageRef}
        style={{
          minHeight: "100vh",
          background: scrollBg,
          position: "relative",
        }}
      >
        <Navigation menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

        {/* ── 1. PARTICLE FIELD HERO (also uses scroll color) ── */}
        <HeroSection scrollYProgress={scrollYProgress} />

        {/* ── 2. 3D ROTATING PRODUCT SHOWCASE ── */}
        <ShowcaseSection scrollYProgress={scrollYProgress} />

        {/* ── 5. FEATURE CARDS WITH FLOAT + SPRING HOVER ── */}
        <FeaturesSection />

        {/* ── 3. TYPEWRITER CODE REVEAL ── */}
        <CodeSection />

        {/* STATS */}
        <StatsSection scrollYProgress={scrollYProgress} />

        {/* PRICING */}
        <PricingSection />

        {/* ── CTA (uses scroll theme accent color) ── */}
        <CTASection scrollYProgress={scrollYProgress} />

        <Footer />
      </motion.div>
    </>
  );
}
