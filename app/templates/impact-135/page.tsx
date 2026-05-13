"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Link from "next/link";
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Shield,
  Zap,
  Globe,
  Lock,
  Bell,
  BarChart3,
  ArrowRight,
  Check,
  ChevronDown,
  Star,
  Users,
  Code2,
  RefreshCw,
  MessageSquare,
  Link2,
  GitBranch,
  AlertTriangle,
  Target,
  Cpu,
  LineChart,
} from "lucide-react";

const C = {
  bg: "#0A0F0D",
  bgAlt: "#0F1612",
  bgCard: "#111A14",
  bgCardHover: "#162018",
  green: "#00D964",
  greenDim: "rgba(0,217,100,0.15)",
  greenBorder: "rgba(0,217,100,0.25)",
  red: "#FF4444",
  redDim: "rgba(255,68,68,0.12)",
  redBorder: "rgba(255,68,68,0.2)",
  amber: "#FFB800",
  text: "#E8F0EA",
  textMuted: "#6B8573",
  textFaint: "rgba(232,240,234,0.35)",
  border: "rgba(255,255,255,0.06)",
  borderGreen: "rgba(0,217,100,0.18)",
  white: "#ffffff",
  grid: "rgba(0,217,100,0.03)",
};

const FONT = "'Space Grotesk', system-ui, sans-serif";
const MONO = "'JetBrains Mono', 'Fira Code', monospace";

// ─── TICKER DATA ─────────────────────────────────────────────────────────────
const INITIAL_TICKERS = [
  { sym: "BTC/USD", price: 67420.5, change: 2.34, vol: "28.4B" },
  { sym: "ETH/USD", price: 3510.8, change: -1.18, vol: "11.2B" },
  { sym: "NVDA", price: 924.3, change: 5.67, vol: "38.1M" },
  { sym: "AAPL", price: 189.4, change: 0.43, vol: "51.7M" },
  { sym: "TSLA", price: 192.1, change: -2.89, vol: "112M" },
  { sym: "SPX", price: 5408.2, change: 0.72, vol: "3.4B" },
  { sym: "SOL/USD", price: 162.4, change: 7.21, vol: "4.8B" },
  { sym: "MSFT", price: 432.7, change: 1.14, vol: "22.3M" },
];

// ─── CANDLESTICK DATA (signature element) ────────────────────────────────────
const CANDLES = [
  { o: 62, h: 78, l: 58, c: 74 },
  { o: 74, h: 82, l: 70, c: 68 },
  { o: 68, h: 75, l: 62, c: 72 },
  { o: 72, h: 88, l: 69, c: 85 },
  { o: 85, h: 91, l: 80, c: 83 },
  { o: 83, h: 87, l: 72, c: 75 },
  { o: 75, h: 86, l: 73, c: 84 },
  { o: 84, h: 96, l: 82, c: 93 },
  { o: 93, h: 98, l: 86, c: 89 },
  { o: 89, h: 95, l: 84, c: 92 },
  { o: 92, h: 102, l: 90, c: 99 },
  { o: 99, h: 108, l: 95, c: 104 },
  { o: 104, h: 112, l: 98, c: 108 },
  { o: 108, h: 115, l: 102, c: 110 },
  { o: 110, h: 118, l: 107, c: 116 },
  { o: 116, h: 122, l: 110, c: 112 },
  { o: 112, h: 116, l: 104, c: 107 },
  { o: 107, h: 114, l: 105, c: 113 },
  { o: 113, h: 124, l: 111, c: 121 },
  { o: 121, h: 128, l: 118, c: 125 },
];

const STATS = [
  { value: "< 2ms", label: "Latence d'exécution", sub: "Co-location NYSE/LSE" },
  { value: "$2.4T", label: "Volume traité/an", sub: "+34% vs N-1" },
  { value: "99.98%", label: "Uptime SLA garanti", sub: "Compensation automatique" },
  { value: "120+", label: "Marchés accessibles", sub: "Actions, Crypto, Dérivés" },
];

const FEATURES = [
  {
    icon: Zap,
    title: "Exécution Ultra-Basse Latence",
    desc: "Infrastructure co-localisée sur NYSE, LSE et CME. Acheminement direct vers les liquidités Tier-1 avec routage intelligent SMART ORDER.",
    tag: "< 2ms",
  },
  {
    icon: Shield,
    title: "Sécurité Institutionnelle",
    desc: "Portefeuilles MPC (multi-party computation), isolation hardware, couverture d'assurance $250M. Conforme MiFID II, Dodd-Frank.",
    tag: "SOC2 Type II",
  },
  {
    icon: BarChart3,
    title: "Analytics Algorithme",
    desc: "Backtesting sur 15 ans de données tick-by-tick. Optimisation de stratégie par IA. Simulateur de risque Monte Carlo en temps réel.",
    tag: "IA Native",
  },
  {
    icon: Globe,
    title: "Accès Marchés Mondiaux",
    desc: "Actions US, EU, APAC. Crypto 24/7. Options et futures. Forex institutionnel. Tout depuis un compte marge unifié multi-devises.",
    tag: "120+ Marchés",
  },
  {
    icon: Activity,
    title: "Risk Manager Intégré",
    desc: "Stop-loss dynamiques, VaR en temps réel, stress-test scénarios extrêmes. Alertes SMS/push avant déclenchement des seuils.",
    tag: "Temps réel",
  },
  {
    icon: Code2,
    title: "API & Algo Trading",
    desc: "API REST et WebSocket. SDK Python, Rust, C++. 50 000 requêtes/seconde. Compatible MetaTrader, QuantConnect, Zipline.",
    tag: "SDK complet",
  },
];

const TESTIMONIALS = [
  {
    name: "Alexandre Mercier",
    role: "Head of Quantitative Strategies",
    firm: "Meridian Capital, Paris",
    stars: 5,
    text: "Trade OS a réduit notre slippage de 0.18% à 0.03% sur les stratégies HFT. L'infrastructure co-localisée NYSE justifie seule l'abonnement Elite.",
  },
  {
    name: "Sarah Chen",
    role: "Portfolio Manager",
    firm: "Apex Hedge Fund, Londres",
    stars: 5,
    text: "L'API Python est d'une qualité rare — documentation parfaite, WebSocket stable, aucune panne en 14 mois de live trading. Indispensable.",
  },
  {
    name: "Marco Ferretti",
    role: "Proprietary Trader",
    firm: "Independent, Milan",
    stars: 5,
    text: "Les outils de backtesting 15 ans tick-by-tick ont transformé ma façon de valider mes stratégies. Le passage au live est sans friction.",
  },
  {
    name: "Priya Nair",
    role: "Risk Manager",
    firm: "DeltaOne Asset Mgmt, Singapour",
    stars: 5,
    text: "La VaR temps réel et les stress-tests Monte Carlo nous ont permis de réduire notre exposition de 22% sans sacrifier le rendement.",
  },
  {
    name: "Thomas Beaumont",
    role: "CTO",
    firm: "Quant Factory, Genève",
    stars: 5,
    text: "Intégration en 48h via API REST. Nos algos Rust tournent sans problème à 50k req/s. Le support technique répond en moins d'1h.",
  },
  {
    name: "Aiko Watanabe",
    role: "Senior Trader FX",
    firm: "Tokio Pacific Trading",
    stars: 5,
    text: "Accès forex institutionnel avec spreads 0.1 pip. Execution directe chez les prime brokers. Impossible de trouver mieux pour ce prix.",
  },
];

const PRICING = [
  {
    name: "Starter",
    price: "79",
    period: "/mois",
    desc: "Pour les traders actifs",
    features: [
      "Accès 40 marchés",
      "Latence standard 15ms",
      "API REST 5 000 req/s",
      "Backtesting 3 ans",
      "Risk Manager basique",
      "Support email 48h",
    ],
    cta: "Démarrer Starter",
    highlight: false,
  },
  {
    name: "Pro",
    price: "249",
    period: "/mois",
    desc: "Pour les pros & small funds",
    features: [
      "Accès 80 marchés",
      "Latence < 5ms",
      "API REST + WebSocket",
      "Backtesting 10 ans (tick)",
      "Risk Manager avancé",
      "VaR temps réel",
      "SDK Python/Rust",
      "Support prioritaire 4h",
    ],
    cta: "Passer Pro",
    highlight: true,
  },
  {
    name: "Elite",
    price: "890",
    period: "/mois",
    desc: "Infrastructure institutionnelle",
    features: [
      "120+ marchés mondiaux",
      "Co-location NYSE/LSE < 2ms",
      "API illimitée 50k req/s",
      "Backtesting 15 ans (tick)",
      "Risk Manager Monte Carlo",
      "Desk trading dédié",
      "SDK Python, Rust, C++",
      "SLA 99.98% + compensation",
      "Support desk dédié 24/7",
    ],
    cta: "Contacter l'équipe Elite",
    highlight: false,
  },
];

const TEAM = [
  {
    name: "Julien Hartmann",
    role: "CEO & Co-fondateur",
    bio: "Ex-VP Goldman Sachs Electronic Trading. 18 ans marchés financiers. Créateur de l'algorithme de routage SMART ORDER de Trade OS.",
  },
  {
    name: "Léa Fontaine",
    role: "CTO & Co-fondatrice",
    bio: "PhD Systèmes Distribués, INRIA. Ex-ingénieure HFT chez Virtu Financial. Architecte de l'infrastructure latence < 2ms.",
  },
  {
    name: "Romain Duval",
    role: "Head of Quant Research",
    bio: "Ex-quant hedge fund Citadel. Spécialiste Monte Carlo, modélisation stochastique et stratégies market-making.",
  },
  {
    name: "Nadia Okonkwo",
    role: "Head of Compliance",
    bio: "Ex-AMF, avocate marchés financiers. Expertise MiFID II, Dodd-Frank, EMIR. Garantit la conformité dans 40+ juridictions.",
  },
];

const FAQS = [
  {
    q: "Quelle est la latence réelle sur les marchés US ?",
    a: "Sur le plan Elite avec co-location NYSE, nous garantissons une latence < 2ms de la réception de l'ordre à la confirmation de l'exécution. En plan Pro (sans co-location), la latence moyenne est de 4.2ms. Ces chiffres sont publiés mensuellement dans notre rapport de performance.",
  },
  {
    q: "Comment fonctionne le backtesting tick-by-tick ?",
    a: "Notre moteur de backtesting charge les données tick historiques (jusqu'à 15 ans selon le plan) directement en mémoire. Chaque tick est rejoué dans l'ordre chronologique exact avec simulation du carnet d'ordres. Vous pouvez tester avec les coûts de transaction réels, le glissement et la liquidité historique.",
  },
  {
    q: "L'API est-elle compatible avec mes algos existants ?",
    a: "Trade OS expose une API REST et WebSocket standard, compatible avec QuantConnect, Zipline, Backtrader et MetaTrader via bridge. Nos SDK officiels Python et Rust couvrent 100% des endpoints. La migration depuis Interactive Brokers ou Alpaca prend en général 2-4 heures.",
  },
  {
    q: "Comment gérez-vous la sécurité des fonds ?",
    a: "Les fonds clients sont ségrégués dans des comptes dédiés auprès de prime brokers régulés (JPMorgan, BNP Paribas). Nos accès techniques utilisent des portefeuilles MPC sans stockage de clé privée. Couverture d'assurance $250M via Lloyd's of London.",
  },
  {
    q: "Quel support pour les stratégies algorithmiques custom ?",
    a: "Le plan Elite inclut un desk quant dédié — nos ingénieurs peuvent auditer vos stratégies, optimiser le code pour la latence, et vous aider à implémenter le risk management. Pour les fonds > $10M AUM, nous proposons une infrastructure sur-mesure.",
  },
  {
    q: "Puis-je tester la plateforme avant de m'engager ?",
    a: "Oui — 14 jours d'essai gratuit avec données de marché réelles (limité à $100k de positions simulées). Aucune carte bancaire requise. Accès à tous les outils Pro pendant la période d'essai.",
  },
];

// ─── CANDLESTICK CHART (Signature Element) ───────────────────────────────────
function CandlestickChart({ visible }: { visible: boolean }) {
  const chartH = 160;
  const chartW = 380;
  const candleW = 14;
  const gap = 5;
  const allValues = CANDLES.flatMap((c) => [c.h, c.l]);
  const minVal = Math.min(...allValues);
  const maxVal = Math.max(...allValues);
  const range = maxVal - minVal;

  const toY = (v: number) =>
    chartH - ((v - minVal) / range) * (chartH - 20) - 10;

  return (
    <svg
      width={chartW}
      height={chartH}
      style={{ overflow: "visible" }}
    >
      {/* Grid lines */}
      {[0.25, 0.5, 0.75].map((pct, i) => (
        <line
          key={i}
          x1={0}
          y1={chartH * pct}
          x2={chartW}
          y2={chartH * pct}
          stroke={C.border}
          strokeWidth={1}
          strokeDasharray="4,4"
        />
      ))}

      {CANDLES.map((c, i) => {
        const x = i * (candleW + gap);
        const isBull = c.c >= c.o;
        const color = isBull ? C.green : C.red;
        const bodyTop = toY(Math.max(c.o, c.c));
        const bodyBot = toY(Math.min(c.o, c.c));
        const bodyH = Math.max(bodyBot - bodyTop, 2);

        return (
          <motion.g
            key={i}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={visible ? { opacity: 1, scaleY: 1 } : {}}
            transition={{ delay: i * 0.04, duration: 0.4, ease: "easeOut" }}
            style={{ transformOrigin: `${x + candleW / 2}px ${chartH}px` }}
          >
            {/* Wick */}
            <line
              x1={x + candleW / 2}
              y1={toY(c.h)}
              x2={x + candleW / 2}
              y2={toY(c.l)}
              stroke={color}
              strokeWidth={1.5}
              opacity={0.6}
            />
            {/* Body */}
            <rect
              x={x}
              y={bodyTop}
              width={candleW}
              height={bodyH}
              fill={isBull ? color : "transparent"}
              stroke={color}
              strokeWidth={1.5}
              rx={1}
              opacity={0.9}
            />
          </motion.g>
        );
      })}
    </svg>
  );
}

// ─── LIVE TICKER TAPE ────────────────────────────────────────────────────────
function TickerTape({ tickers }: { tickers: typeof INITIAL_TICKERS }) {
  const doubled = [...tickers, ...tickers, ...tickers];
  return (
    <div
      style={{
        overflow: "hidden",
        background: C.bgAlt,
        borderBottom: `1px solid ${C.border}`,
        borderTop: `1px solid ${C.border}`,
        padding: "10px 0",
      }}
    >
      <motion.div
        animate={{ x: ["0%", "-33.33%"] }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
        style={{ display: "flex", whiteSpace: "nowrap", width: "max-content" }}
      >
        {doubled.map((t, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "0 28px",
              fontFamily: MONO,
              fontSize: 12,
              borderRight: `1px solid ${C.border}`,
            }}
          >
            <span style={{ color: C.text, fontWeight: 600, letterSpacing: 0.5 }}>
              {t.sym}
            </span>
            <span style={{ color: t.change >= 0 ? C.green : C.red }}>
              {t.price.toLocaleString("fr-FR", { minimumFractionDigits: 1 })}
            </span>
            {t.change >= 0 ? (
              <TrendingUp size={11} color={C.green} />
            ) : (
              <TrendingDown size={11} color={C.red} />
            )}
            <span
              style={{ color: t.change >= 0 ? C.green : C.red, fontSize: 11 }}
            >
              {t.change >= 0 ? "+" : ""}
              {t.change}%
            </span>
            <span style={{ color: C.textMuted, fontSize: 10 }}>
              Vol {t.vol}
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─── COUNTER ─────────────────────────────────────────────────────────────────
function StatCounter({
  value,
  label,
  sub,
  delay = 0,
}: {
  value: string;
  label: string;
  sub: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.7, ease: "easeOut" }}
      style={{ textAlign: "center", padding: "48px 32px" }}
    >
      <div
        style={{
          fontFamily: FONT,
          fontSize: "clamp(2rem, 4vw, 3.2rem)",
          fontWeight: 700,
          color: C.green,
          letterSpacing: -1,
          marginBottom: 8,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: 14,
          color: C.text,
          fontWeight: 600,
          marginBottom: 6,
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: 12, color: C.textMuted, fontFamily: MONO }}>
        {sub}
      </div>
    </motion.div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function Impact135Page() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInView = useInView(chartRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({ target: containerRef });
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -60]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  const [tickers, setTickers] = useState(INITIAL_TICKERS);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeFeature, setActiveFeature] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"chart" | "book" | "positions">(
    "chart"
  );

  // Live ticker simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setTickers((prev) =>
        prev.map((t) => {
          const delta = (Math.random() - 0.49) * 0.8;
          const newChange = Math.round((t.change + delta * 0.3) * 100) / 100;
          const newPrice =
            Math.round(t.price * (1 + delta * 0.001) * 100) / 100;
          return { ...t, price: newPrice, change: newChange };
        })
      );
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        background: C.bg,
        color: C.text,
        minHeight: "100vh",
        fontFamily: FONT,
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: ${C.bg}; }
        ::-webkit-scrollbar-thumb { background: ${C.border}; }
      `}</style>

      {/* ── NAV ───────────────────────────────────────────────────────────── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: "rgba(10,15,13,0.92)",
          backdropFilter: "blur(16px)",
          borderBottom: `1px solid ${C.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 48px",
          height: 64,
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              background: C.green,
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Activity size={18} color={C.bg} />
          </div>
          <span
            style={{
              fontFamily: FONT,
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: -0.5,
              color: C.text,
            }}
          >
            Trade<span style={{ color: C.green }}>OS</span>
          </span>
          <span
            style={{
              fontFamily: MONO,
              fontSize: 9,
              letterSpacing: 2,
              color: C.textMuted,
              textTransform: "uppercase",
              marginLeft: 4,
            }}
          >
            v4.2
          </span>
        </div>

        {/* Nav links — desktop */}
        <div
          style={{
            display: "flex",
            gap: 36,
            alignItems: "center",
          }}
        >
          {["Marchés", "Algorithmes", "Tarifs", "API Docs", "Blog"].map(
            (l) => (
              <a
                key={l}
                href="#"
                style={{
                  fontSize: 14,
                  color: C.textMuted,
                  textDecoration: "none",
                  fontWeight: 500,
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = C.text)
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = C.textMuted)
                }
              >
                {l}
              </a>
            )
          )}
        </div>

        {/* CTAs */}
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <a
            href="#"
            style={{
              fontSize: 14,
              color: C.textMuted,
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            Se connecter
          </a>
          <motion.a
            href="#"
            whileHover={{ scale: 1.03, background: "#00F070" }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: "9px 22px",
              background: C.green,
              color: C.bg,
              fontSize: 13,
              fontWeight: 700,
              borderRadius: 6,
              textDecoration: "none",
              letterSpacing: 0.3,
              transition: "background 0.2s",
            }}
          >
            Essai gratuit 14j
          </motion.a>
        </div>
      </nav>

      {/* ── LIVE TICKER ─────────────────────────────────────────────────────── */}
      <div style={{ paddingTop: 64 }}>
        <TickerTape tickers={tickers} />
      </div>

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        style={{
          minHeight: "92vh",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          padding: "0 80px",
          position: "relative",
          overflow: "hidden",
          gap: 60,
        }}
      >
        {/* BG grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `linear-gradient(${C.grid} 1px, transparent 1px), linear-gradient(90deg, ${C.grid} 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
            pointerEvents: "none",
          }}
        />
        {/* BG glow */}
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "5%",
            width: 500,
            height: 500,
            background: `radial-gradient(circle, rgba(0,217,100,0.06) 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />

        {/* Left — copy */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity, position: "relative" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: C.greenDim,
                border: `1px solid ${C.greenBorder}`,
                borderRadius: 20,
                padding: "6px 16px",
                marginBottom: 32,
              }}
            >
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: C.green,
                  animation: "pulse 1.5s infinite",
                }}
              />
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 11,
                  color: C.green,
                  letterSpacing: 1,
                  fontWeight: 500,
                }}
              >
                MARCHÉS OUVERTS · NYSE +0.72%
              </span>
            </div>

            <h1
              style={{
                fontSize: "clamp(44px, 5.5vw, 84px)",
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: -2,
                marginBottom: 28,
              }}
            >
              Tradez à la{" "}
              <span
                style={{
                  color: C.green,
                  display: "inline-block",
                }}
              >
                vitesse
              </span>
              <br />
              des institutions.
            </h1>

            <p
              style={{
                fontSize: 18,
                color: C.textMuted,
                lineHeight: 1.75,
                maxWidth: 480,
                marginBottom: 44,
              }}
            >
              Infrastructure HFT, analytics algorithmiques et accès 120+ marchés
              mondiaux. Trade OS donne aux traders indépendants et aux hedge funds
              la même puissance que Wall Street.
            </p>

            <div style={{ display: "flex", gap: 14, marginBottom: 40 }}>
              <motion.a
                href="#"
                whileHover={{ scale: 1.03, background: "#00F070" }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "14px 32px",
                  background: C.green,
                  color: C.bg,
                  fontSize: 15,
                  fontWeight: 700,
                  borderRadius: 8,
                  textDecoration: "none",
                  transition: "background 0.2s",
                }}
              >
                Démarrer l'essai gratuit{" "}
                <ArrowRight size={16} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{
                  background: "rgba(255,255,255,0.05)",
                  borderColor: C.textMuted,
                }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "14px 28px",
                  background: "transparent",
                  color: C.text,
                  fontSize: 15,
                  fontWeight: 600,
                  borderRadius: 8,
                  textDecoration: "none",
                  border: `1px solid ${C.border}`,
                  transition: "all 0.2s",
                }}
              >
                Voir la démo live
              </motion.a>
            </div>

            <div
              style={{
                display: "flex",
                gap: 28,
                fontSize: 13,
                color: C.textMuted,
              }}
            >
              {[
                "Aucune CB requise",
                "14j essai complet",
                "Annulation anytime",
              ].map((t) => (
                <span
                  key={t}
                  style={{ display: "flex", alignItems: "center", gap: 6 }}
                >
                  <Check size={13} color={C.green} />
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right — DASHBOARD + CANDLESTICK (signature element) */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{ position: "relative" }}
          ref={chartRef}
        >
          {/* Dashboard panel */}
          <div
            style={{
              background: C.bgCard,
              border: `1px solid ${C.border}`,
              borderRadius: 12,
              overflow: "hidden",
              boxShadow: `0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px ${C.border}`,
            }}
          >
            {/* Panel header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 20px",
                borderBottom: `1px solid ${C.border}`,
                background: C.bgAlt,
              }}
            >
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div
                  style={{
                    display: "flex",
                    gap: 6,
                  }}
                >
                  {["chart", "book", "positions"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab as typeof activeTab)}
                      style={{
                        padding: "5px 14px",
                        background:
                          activeTab === tab ? C.green : "transparent",
                        color: activeTab === tab ? C.bg : C.textMuted,
                        border: `1px solid ${activeTab === tab ? C.green : C.border}`,
                        borderRadius: 4,
                        fontSize: 11,
                        fontFamily: MONO,
                        fontWeight: 600,
                        cursor: "pointer",
                        letterSpacing: 0.5,
                        transition: "all 0.15s",
                      }}
                    >
                      {tab === "chart"
                        ? "GRAPHE"
                        : tab === "book"
                        ? "CARNET"
                        : "POSITIONS"}
                    </button>
                  ))}
                </div>
              </div>
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 11,
                  color: C.green,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: C.green,
                  }}
                />
                LIVE
              </div>
            </div>

            {/* Instrument info */}
            <div
              style={{
                padding: "16px 20px 8px",
                display: "flex",
                alignItems: "center",
                gap: 20,
                borderBottom: `1px solid ${C.border}`,
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: 13,
                    fontWeight: 600,
                    color: C.text,
                  }}
                >
                  BTC/USD
                </div>
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: 10,
                    color: C.textMuted,
                  }}
                >
                  Bitcoin · Perpetual
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: 22,
                    fontWeight: 700,
                    color: C.text,
                  }}
                >
                  {tickers[0].price.toLocaleString("fr-FR")}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  background:
                    tickers[0].change >= 0 ? C.greenDim : C.redDim,
                  border: `1px solid ${tickers[0].change >= 0 ? C.greenBorder : C.redBorder}`,
                  padding: "4px 10px",
                  borderRadius: 4,
                }}
              >
                {tickers[0].change >= 0 ? (
                  <TrendingUp size={12} color={C.green} />
                ) : (
                  <TrendingDown size={12} color={C.red} />
                )}
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: 12,
                    color:
                      tickers[0].change >= 0 ? C.green : C.red,
                    fontWeight: 600,
                  }}
                >
                  {tickers[0].change >= 0 ? "+" : ""}
                  {tickers[0].change}%
                </span>
              </div>
            </div>

            {/* Chart area — candlestick */}
            <div
              style={{
                padding: "24px 20px 16px",
                background: C.bg,
              }}
            >
              <CandlestickChart visible={chartInView} />
            </div>

            {/* Bottom stats row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                borderTop: `1px solid ${C.border}`,
              }}
            >
              {[
                { label: "Volume 24h", val: "28.4B", color: C.text },
                { label: "High", val: "68 920", color: C.green },
                { label: "Low", val: "65 100", color: C.red },
                { label: "Latence", val: "1.8ms", color: C.amber },
              ].map((s, i) => (
                <div
                  key={i}
                  style={{
                    padding: "12px 16px",
                    borderRight: i < 3 ? `1px solid ${C.border}` : "none",
                  }}
                >
                  <div
                    style={{
                      fontFamily: MONO,
                      fontSize: 9,
                      color: C.textMuted,
                      textTransform: "uppercase",
                      letterSpacing: 1,
                      marginBottom: 4,
                    }}
                  >
                    {s.label}
                  </div>
                  <div
                    style={{
                      fontFamily: MONO,
                      fontSize: 14,
                      fontWeight: 600,
                      color: s.color,
                    }}
                  >
                    {s.val}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Floating P&L card */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              top: -20,
              right: -20,
              background: C.bgCard,
              border: `1px solid ${C.greenBorder}`,
              borderRadius: 10,
              padding: "14px 18px",
              boxShadow: `0 8px 32px rgba(0,0,0,0.4)`,
              minWidth: 160,
            }}
          >
            <div
              style={{
                fontFamily: MONO,
                fontSize: 9,
                color: C.textMuted,
                letterSpacing: 1,
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              P&L Today
            </div>
            <div
              style={{
                fontFamily: MONO,
                fontSize: 22,
                fontWeight: 700,
                color: C.green,
              }}
            >
              +$14 280
            </div>
            <div
              style={{
                fontFamily: MONO,
                fontSize: 11,
                color: C.green,
                opacity: 0.7,
              }}
            >
              +8.34% · 12 trades
            </div>
          </motion.div>

          {/* Floating latency badge */}
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            style={{
              position: "absolute",
              bottom: -16,
              left: -16,
              background: C.bgCard,
              border: `1px solid ${C.border}`,
              borderRadius: 10,
              padding: "12px 16px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            }}
          >
            <div
              style={{
                fontFamily: MONO,
                fontSize: 9,
                color: C.textMuted,
                letterSpacing: 1,
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              Exécution
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Zap size={14} color={C.amber} />
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 16,
                  fontWeight: 700,
                  color: C.amber,
                }}
              >
                1.8ms
              </span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────────────────── */}
      <section
        style={{
          background: C.bgAlt,
          borderTop: `1px solid ${C.border}`,
          borderBottom: `1px solid ${C.border}`,
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
        }}
      >
        {STATS.map((s, i) => (
          <div
            key={i}
            style={{
              borderRight: i < 3 ? `1px solid ${C.border}` : "none",
            }}
          >
            <StatCounter
              value={s.value}
              label={s.label}
              sub={s.sub}
              delay={i * 0.1}
            />
          </div>
        ))}
      </section>

      {/* ── LIVE ASSETS BOARD ──────────────────────────────────────────────── */}
      <section style={{ padding: "120px 80px" }}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: 56 }}
        >
          <div
            style={{
              fontFamily: MONO,
              fontSize: 11,
              letterSpacing: 3,
              color: C.green,
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Marchés en direct
          </div>
          <h2
            style={{
              fontSize: "clamp(36px, 4vw, 60px)",
              fontWeight: 700,
              letterSpacing: -1.5,
              lineHeight: 1.1,
            }}
          >
            Tous les marchés.
            <br />
            <span style={{ color: C.green }}>Un seul compte.</span>
          </h2>
        </motion.div>

        {/* Asset table */}
        <div
          style={{
            background: C.bgCard,
            border: `1px solid ${C.border}`,
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1.5fr 1fr 1fr 1fr",
              padding: "12px 24px",
              background: C.bgAlt,
              borderBottom: `1px solid ${C.border}`,
            }}
          >
            {["Instrument", "Prix", "Var 24h", "Volume", "Signal"].map(
              (h) => (
                <div
                  key={h}
                  style={{
                    fontFamily: MONO,
                    fontSize: 10,
                    color: C.textMuted,
                    letterSpacing: 1.5,
                    textTransform: "uppercase",
                  }}
                >
                  {h}
                </div>
              )
            )}
          </div>

          {tickers.map((t, i) => (
            <motion.div
              key={t.sym}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ background: C.bgCardHover }}
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1.5fr 1fr 1fr 1fr",
                padding: "18px 24px",
                borderBottom: `1px solid ${C.border}`,
                cursor: "pointer",
                transition: "background 0.15s",
                alignItems: "center",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: 14,
                    fontWeight: 600,
                    color: C.text,
                  }}
                >
                  {t.sym}
                </div>
              </div>
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 15,
                  fontWeight: 600,
                  color: C.text,
                }}
              >
                {t.price.toLocaleString("fr-FR", {
                  minimumFractionDigits: 1,
                })}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                {t.change >= 0 ? (
                  <TrendingUp size={13} color={C.green} />
                ) : (
                  <TrendingDown size={13} color={C.red} />
                )}
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: 13,
                    color: t.change >= 0 ? C.green : C.red,
                    fontWeight: 600,
                  }}
                >
                  {t.change >= 0 ? "+" : ""}
                  {t.change}%
                </span>
              </div>
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 12,
                  color: C.textMuted,
                }}
              >
                {t.vol}
              </div>
              <div>
                <span
                  style={{
                    padding: "4px 10px",
                    borderRadius: 4,
                    fontSize: 10,
                    fontFamily: MONO,
                    fontWeight: 700,
                    letterSpacing: 0.5,
                    background:
                      t.change >= 0 ? C.greenDim : C.redDim,
                    color: t.change >= 0 ? C.green : C.red,
                    border: `1px solid ${t.change >= 0 ? C.greenBorder : C.redBorder}`,
                  }}
                >
                  {t.change >= 0 ? "LONG" : "WATCH"}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────────────────────────── */}
      <section
        style={{
          background: C.bgAlt,
          padding: "120px 80px",
          borderTop: `1px solid ${C.border}`,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: 72 }}
        >
          <div
            style={{
              fontFamily: MONO,
              fontSize: 11,
              letterSpacing: 3,
              color: C.green,
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Fonctionnalités
          </div>
          <h2
            style={{
              fontSize: "clamp(36px, 4vw, 60px)",
              fontWeight: 700,
              letterSpacing: -1.5,
            }}
          >
            Infrastructure de trading
            <br />
            <span style={{ color: C.green }}>niveau Wall Street.</span>
          </h2>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}
        >
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{
                  borderColor: C.greenBorder,
                  background: C.bgCardHover,
                  y: -4,
                }}
                style={{
                  background: C.bgCard,
                  border: `1px solid ${C.border}`,
                  borderRadius: 10,
                  padding: "36px 32px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    background: C.greenDim,
                    border: `1px solid ${C.greenBorder}`,
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 20,
                  }}
                >
                  <Icon size={22} color={C.green} />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 12,
                  }}
                >
                  <h3
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: C.text,
                    }}
                  >
                    {f.title}
                  </h3>
                  <span
                    style={{
                      fontFamily: MONO,
                      fontSize: 10,
                      color: C.green,
                      background: C.greenDim,
                      border: `1px solid ${C.greenBorder}`,
                      padding: "3px 8px",
                      borderRadius: 4,
                      letterSpacing: 0.5,
                    }}
                  >
                    {f.tag}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: 14,
                    color: C.textMuted,
                    lineHeight: 1.75,
                  }}
                >
                  {f.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────────── */}
      <section style={{ padding: "120px 80px" }}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: 80 }}
        >
          <div
            style={{
              fontFamily: MONO,
              fontSize: 11,
              letterSpacing: 3,
              color: C.green,
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Démarrage
          </div>
          <h2
            style={{
              fontSize: "clamp(36px, 4vw, 60px)",
              fontWeight: 700,
              letterSpacing: -1.5,
            }}
          >
            Opérationnel en{" "}
            <span style={{ color: C.green }}>48 heures.</span>
          </h2>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 0,
            position: "relative",
          }}
        >
          {/* Connector line */}
          <div
            style={{
              position: "absolute",
              top: 36,
              left: "12.5%",
              right: "12.5%",
              height: 1,
              background: `linear-gradient(90deg, ${C.green}, ${C.greenBorder}, ${C.greenBorder}, ${C.green})`,
              opacity: 0.3,
            }}
          />

          {[
            {
              n: "01",
              title: "Création de compte",
              desc: "KYC simplifié, vérification d'identité en 15 minutes. Accès immédiat au compte démo avec $100k virtuels.",
            },
            {
              n: "02",
              title: "Connexion API",
              desc: "Générez vos clés API, choisissez votre SDK. Documentation complète avec exemples Python/Rust. Sandbox live.",
            },
            {
              n: "03",
              title: "Backtesting",
              desc: "Chargez votre stratégie, testez sur données historiques tick-by-tick. Optimisez les paramètres avec notre IA.",
            },
            {
              n: "04",
              title: "Go Live",
              desc: "Déposez des fonds, activez votre stratégie en production. Risk manager actif dès le premier trade.",
            },
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              style={{
                padding: "0 32px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  background: C.bgCard,
                  border: `2px solid ${C.greenBorder}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 28px",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: 18,
                    fontWeight: 700,
                    color: C.green,
                  }}
                >
                  {step.n}
                </span>
              </div>
              <h3
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: C.text,
                  marginBottom: 12,
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: C.textMuted,
                  lineHeight: 1.75,
                }}
              >
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────────────── */}
      <section
        style={{
          background: C.bgAlt,
          padding: "120px 80px",
          borderTop: `1px solid ${C.border}`,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: 72 }}
        >
          <div
            style={{
              fontFamily: MONO,
              fontSize: 11,
              letterSpacing: 3,
              color: C.green,
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Témoignages
          </div>
          <h2
            style={{
              fontSize: "clamp(36px, 4vw, 60px)",
              fontWeight: 700,
              letterSpacing: -1.5,
            }}
          >
            Ce que disent les
            <br />
            <span style={{ color: C.green }}>professionnels.</span>
          </h2>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{
                borderColor: C.greenBorder,
                y: -4,
              }}
              style={{
                background: C.bgCard,
                border: `1px solid ${C.border}`,
                borderRadius: 10,
                padding: "32px",
                transition: "all 0.2s",
              }}
            >
              <div
                style={{ display: "flex", gap: 4, marginBottom: 20 }}
              >
                {Array(t.stars)
                  .fill(0)
                  .map((_, j) => (
                    <Star
                      key={j}
                      size={14}
                      color={C.amber}
                      fill={C.amber}
                    />
                  ))}
              </div>
              <p
                style={{
                  fontSize: 14,
                  color: C.textMuted,
                  lineHeight: 1.8,
                  marginBottom: 24,
                  fontStyle: "italic",
                }}
              >
                "{t.text}"
              </p>
              <div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: C.text,
                    marginBottom: 4,
                  }}
                >
                  {t.name}
                </div>
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: 11,
                    color: C.textMuted,
                  }}
                >
                  {t.role}
                </div>
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: 11,
                    color: C.green,
                    opacity: 0.7,
                  }}
                >
                  {t.firm}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────────────────────────── */}
      <section style={{ padding: "120px 80px" }}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: 72 }}
        >
          <div
            style={{
              fontFamily: MONO,
              fontSize: 11,
              letterSpacing: 3,
              color: C.green,
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Tarifs
          </div>
          <h2
            style={{
              fontSize: "clamp(36px, 4vw, 60px)",
              fontWeight: 700,
              letterSpacing: -1.5,
            }}
          >
            Choisissez votre
            <br />
            <span style={{ color: C.green }}>niveau d'infrastructure.</span>
          </h2>
          <p
            style={{
              fontSize: 17,
              color: C.textMuted,
              marginTop: 20,
            }}
          >
            Sans commission sur les trades. Sans frais cachés.
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
            maxWidth: 1100,
            margin: "0 auto",
          }}
        >
          {PRICING.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onHoverStart={() => setHoveredPlan(i)}
              onHoverEnd={() => setHoveredPlan(null)}
              style={{
                background: p.highlight ? C.green : C.bgCard,
                border: `1px solid ${p.highlight ? C.green : hoveredPlan === i ? C.greenBorder : C.border}`,
                borderRadius: 12,
                padding: "40px 36px",
                transform: p.highlight ? "scale(1.03)" : "none",
                boxShadow: p.highlight
                  ? `0 24px 60px rgba(0,217,100,0.2)`
                  : "none",
                transition: "all 0.2s",
                position: "relative",
              }}
            >
              {p.highlight && (
                <div
                  style={{
                    position: "absolute",
                    top: -12,
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: C.amber,
                    color: C.bg,
                    fontSize: 10,
                    fontWeight: 700,
                    fontFamily: MONO,
                    letterSpacing: 1,
                    padding: "4px 16px",
                    borderRadius: 20,
                    textTransform: "uppercase",
                  }}
                >
                  PLUS POPULAIRE
                </div>
              )}

              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 11,
                  letterSpacing: 2,
                  color: p.highlight ? C.bg : C.textMuted,
                  textTransform: "uppercase",
                  marginBottom: 20,
                }}
              >
                {p.name}
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 4,
                  marginBottom: 6,
                }}
              >
                <span
                  style={{
                    fontFamily: FONT,
                    fontSize: 52,
                    fontWeight: 700,
                    letterSpacing: -2,
                    color: p.highlight ? C.bg : C.text,
                    lineHeight: 1,
                  }}
                >
                  {p.price}€
                </span>
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: 13,
                    color: p.highlight
                      ? "rgba(10,15,13,0.6)"
                      : C.textMuted,
                  }}
                >
                  {p.period}
                </span>
              </div>

              <div
                style={{
                  fontSize: 13,
                  color: p.highlight ? "rgba(10,15,13,0.7)" : C.textMuted,
                  marginBottom: 32,
                }}
              >
                {p.desc}
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  marginBottom: 36,
                }}
              >
                {p.features.map((f, j) => (
                  <div
                    key={j}
                    style={{
                      display: "flex",
                      gap: 10,
                      alignItems: "flex-start",
                      fontSize: 13,
                      color: p.highlight ? C.bg : C.text,
                    }}
                  >
                    <Check
                      size={14}
                      color={p.highlight ? C.bg : C.green}
                      style={{ marginTop: 2, flexShrink: 0 }}
                    />
                    {f}
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ opacity: 0.85 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  width: "100%",
                  padding: "14px",
                  background: p.highlight ? C.bg : C.green,
                  color: p.highlight ? C.green : C.bg,
                  border: "none",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: FONT,
                  transition: "opacity 0.15s",
                }}
              >
                {p.cta}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── TEAM ──────────────────────────────────────────────────────────────── */}
      <section
        style={{
          background: C.bgAlt,
          padding: "120px 80px",
          borderTop: `1px solid ${C.border}`,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ marginBottom: 72 }}
        >
          <div
            style={{
              fontFamily: MONO,
              fontSize: 11,
              letterSpacing: 3,
              color: C.green,
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            L'équipe
          </div>
          <h2
            style={{
              fontSize: "clamp(36px, 4vw, 60px)",
              fontWeight: 700,
              letterSpacing: -1.5,
            }}
          >
            Construit par des
            <br />
            <span style={{ color: C.green }}>anciens de Wall Street.</span>
          </h2>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 24,
          }}
        >
          {TEAM.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ borderColor: C.greenBorder, y: -4 }}
              style={{
                background: C.bgCard,
                border: `1px solid ${C.border}`,
                borderRadius: 10,
                padding: "32px 28px",
                transition: "all 0.2s",
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  background: C.greenDim,
                  border: `1px solid ${C.greenBorder}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 20,
                  fontSize: 22,
                  fontWeight: 700,
                  color: C.green,
                  fontFamily: FONT,
                }}
              >
                {member.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: C.text,
                  marginBottom: 4,
                }}
              >
                {member.name}
              </div>
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 11,
                  color: C.green,
                  marginBottom: 16,
                  opacity: 0.8,
                }}
              >
                {member.role}
              </div>
              <p
                style={{
                  fontSize: 13,
                  color: C.textMuted,
                  lineHeight: 1.75,
                }}
              >
                {member.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
      <section style={{ padding: "120px 80px" }}>
        <div
          style={{
            maxWidth: 800,
            margin: "0 auto",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: "center", marginBottom: 72 }}
          >
            <div
              style={{
                fontFamily: MONO,
                fontSize: 11,
                letterSpacing: 3,
                color: C.green,
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              FAQ
            </div>
            <h2
              style={{
                fontSize: "clamp(36px, 4vw, 56px)",
                fontWeight: 700,
                letterSpacing: -1.5,
              }}
            >
              Questions techniques.
            </h2>
          </motion.div>

          {FAQS.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              style={{ borderBottom: `1px solid ${C.border}` }}
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "24px 0",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  gap: 20,
                }}
              >
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: C.text,
                    fontFamily: FONT,
                  }}
                >
                  {f.q}
                </span>
                <motion.span
                  animate={{ rotate: openFaq === i ? 45 : 0 }}
                  style={{
                    fontSize: 24,
                    color: C.green,
                    minWidth: 24,
                    lineHeight: 1,
                    fontWeight: 300,
                  }}
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: "hidden" }}
                  >
                    <p
                      style={{
                        paddingBottom: 24,
                        fontSize: 15,
                        color: C.textMuted,
                        lineHeight: 1.85,
                        fontFamily: FONT,
                      }}
                    >
                      {f.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA FINAL ────────────────────────────────────────────────────────── */}
      <section
        style={{
          background: C.bgAlt,
          padding: "120px 80px",
          textAlign: "center",
          borderTop: `1px solid ${C.border}`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* BG glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            height: 300,
            background: `radial-gradient(ellipse, rgba(0,217,100,0.08) 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ position: "relative" }}
        >
          <div
            style={{
              fontFamily: MONO,
              fontSize: 11,
              letterSpacing: 3,
              color: C.green,
              textTransform: "uppercase",
              marginBottom: 24,
            }}
          >
            Rejoindre Trade OS
          </div>
          <h2
            style={{
              fontSize: "clamp(48px, 7vw, 96px)",
              fontWeight: 700,
              letterSpacing: -3,
              lineHeight: 1.02,
              marginBottom: 32,
            }}
          >
            Tradez à la vitesse
            <br />
            <span style={{ color: C.green }}>de la lumière.</span>
          </h2>
          <p
            style={{
              fontSize: 18,
              color: C.textMuted,
              marginBottom: 48,
              maxWidth: 480,
              margin: "0 auto 48px",
              lineHeight: 1.7,
            }}
          >
            14 jours gratuits, sans carte bancaire. Infrastructure complète,
            données réelles, aucune limite.
          </p>
          <div
            style={{
              display: "flex",
              gap: 16,
              justifyContent: "center",
            }}
          >
            <motion.a
              href="#"
              whileHover={{ scale: 1.03, background: "#00F070" }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "16px 40px",
                background: C.green,
                color: C.bg,
                fontSize: 16,
                fontWeight: 700,
                borderRadius: 8,
                textDecoration: "none",
                transition: "background 0.2s",
              }}
            >
              Démarrer gratuitement <ArrowRight size={18} />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ borderColor: C.textMuted }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "16px 36px",
                background: "transparent",
                color: C.text,
                fontSize: 16,
                fontWeight: 600,
                borderRadius: 8,
                textDecoration: "none",
                border: `1px solid ${C.border}`,
                transition: "border-color 0.2s",
              }}
            >
              Voir la démo
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
      <footer
        style={{
          background: "#060B09",
          padding: "64px 80px 40px",
          borderTop: `1px solid ${C.border}`,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: 60,
            marginBottom: 64,
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  background: C.green,
                  borderRadius: 5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Activity size={15} color={C.bg} />
              </div>
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: C.text,
                  letterSpacing: -0.5,
                }}
              >
                Trade<span style={{ color: C.green }}>OS</span>
              </span>
            </div>
            <p
              style={{
                fontSize: 14,
                color: C.textMuted,
                lineHeight: 1.8,
                maxWidth: 280,
                marginBottom: 28,
              }}
            >
              Infrastructure de trading professionnelle. Accès institutionnel
              pour traders indépendants et hedge funds.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              {[MessageSquare, Link2, GitBranch].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ borderColor: C.greenBorder, color: C.green }}
                  style={{
                    width: 36,
                    height: 36,
                    border: `1px solid ${C.border}`,
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: C.textMuted,
                    transition: "all 0.15s",
                  }}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {[
            {
              title: "Produit",
              links: ["Marchés", "Algorithmes", "API", "Backtesting", "Risk Manager"],
            },
            {
              title: "Ressources",
              links: ["Documentation", "SDK Python", "SDK Rust", "Blog Quant", "Changelog"],
            },
            {
              title: "Légal",
              links: ["Conditions d'utilisation", "Politique de confidentialité", "AMF", "MiFID II", "Contact"],
            },
          ].map((col) => (
            <div key={col.title}>
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 10,
                  letterSpacing: 2,
                  color: C.textMuted,
                  textTransform: "uppercase",
                  marginBottom: 20,
                }}
              >
                {col.title}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                {col.links.map((l) => (
                  <a
                    key={l}
                    href="#"
                    style={{
                      fontSize: 14,
                      color: C.textMuted,
                      textDecoration: "none",
                      transition: "color 0.15s",
                    }}
                    onMouseEnter={(e) =>
                      ((e.target as HTMLElement).style.color = C.text)
                    }
                    onMouseLeave={(e) =>
                      ((e.target as HTMLElement).style.color = C.textMuted)
                    }
                  >
                    {l}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            borderTop: `1px solid ${C.border}`,
            paddingTop: 28,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontFamily: MONO, fontSize: 12, color: C.textMuted }}>
            © 2026 TradeOS SAS · Paris, France · AMF N°GP-24-00142
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: C.green,
              }}
            />
            <span style={{ fontFamily: MONO, fontSize: 11, color: C.green }}>
              Tous systèmes opérationnels · NYSE, LSE, CME
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
