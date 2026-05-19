'use client';

import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useInView,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from 'framer-motion';
import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';

// ─── Font Loader ─────────────────────────────────────────────────────────────
const useFonts = () => {
  useEffect(() => {
    if (document.getElementById('gp-fonts-v2')) return;
    const s = document.createElement('style');
    s.id = 'gp-fonts-v2';
    s.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Jost:wght@300;400;500;600&display=swap');
    `;
    document.head.appendChild(s);
  }, []);
};

// ─── Design Tokens ───────────────────────────────────────────────────────────
const CREAM   = '#f5f0e8';
const DARK    = '#1a1208';
const GOLD    = '#b8965a';
const GOLD_DIM = '#8a6f3e';
const CREAM_DIM = '#ede5d4';
const MID     = '#2e2318';

const SERIF = "'Cormorant Garamond', Georgia, 'Times New Roman', serif";
const SANS  = "'Jost', system-ui, sans-serif";

// ─── Data ────────────────────────────────────────────────────────────────────
const ROOMS = [
  {
    num: '01',
    name: 'Prestige Room',
    size: '38 m²',
    view: 'Courtyard Garden',
    price: '€480',
    tag: 'Most Requested',
    desc: 'A sanctuary of refined calm. Hand-stitched linen, aged oak flooring, and a private terrace overlooking the sculpted inner garden.',
    img: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&q=85',
  },
  {
    num: '02',
    name: 'Deluxe Suite',
    size: '65 m²',
    view: 'Panoramic Park',
    price: '€780',
    tag: 'Guest Favourite',
    desc: 'Soaring ceilings, a double marble bathroom, and floor-to-ceiling windows that frame the park like a living painting.',
    img: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=85',
  },
  {
    num: '03',
    name: 'Grand Suite',
    size: '110 m²',
    view: 'City Skyline',
    price: '€1,200',
    tag: 'Signature',
    desc: 'Our most coveted address. A private dining room, butler antechamber, and a rooftop terrace overlooking the golden skyline at dusk.',
    img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=85',
  },
];

const EXPERIENCES = [
  {
    label: 'L\'Atelier',
    sub: 'Two Michelin Stars',
    desc: 'Chef Margaux Vernet elevates classical French gastronomy with ingredients sourced from our estate gardens and trusted regional producers.',
    img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1000&q=85',
  },
  {
    label: 'Espace Étoile',
    sub: 'Spa & Thermal Circuit',
    desc: 'Seven treatment rooms, a Roman hammam, and a 25m heated pool. Every ritual is bespoke, every moment restorative.',
    img: 'https://images.unsplash.com/photo-1540541338537-1220059a0de6?w=1000&q=85',
  },
  {
    label: 'Bar Lumière',
    sub: 'Rare Spirits & Cellar',
    desc: 'An intimate bar presided over by our Maître d\'Alcools. Three thousand labels. One extraordinary conversation.',
    img: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=1000&q=85',
  },
];

const STATS = [
  { n: '1887', l: 'Founded' },
  { n: '87',   l: 'Rooms & Suites' },
  { n: '2 ✦',  l: 'Michelin Stars' },
  { n: '4',    l: 'Hectares of Gardens' },
];

const NAV_LINKS = ['Rooms', 'Experiences', 'Dining', 'Location', 'Reserve'];

// ─── Hooks ───────────────────────────────────────────────────────────────────
function useParallax(ref: React.RefObject<HTMLElement | null>, speed = 0.4) {
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  return useTransform(scrollYProgress, [0, 1], [`${-speed * 100 * 0.5}%`, `${speed * 100 * 0.5}%`]);
}

// ─── BlurReveal ──────────────────────────────────────────────────────────────
function BlurReveal({
  children,
  delay = 0,
  style = {},
}: {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

// ─── ParallaxSection ─────────────────────────────────────────────────────────
function ParallaxSection({
  imgSrc,
  speed = 0.4,
  height = '60vh',
  children,
  overlay = 'rgba(26,18,8,0.45)',
}: {
  imgSrc: string;
  speed?: number;
  height?: string;
  children?: React.ReactNode;
  overlay?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const imgY = useParallax(ref, speed);

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        height,
        overflow: 'hidden',
        width: '100%',
      }}
    >
      <motion.div
        style={{
          position: 'absolute',
          inset: '-20%',
          backgroundImage: `url(${imgSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          y: imgY,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(to bottom, ${overlay} 0%, transparent 40%, transparent 60%, ${overlay} 100%)`,
        }}
      />
      <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {children}
      </div>
    </div>
  );
}

// ─── NavBar ──────────────────────────────────────────────────────────────────
function NavBar({ scrolled }: { scrolled: boolean }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <motion.nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 2.5rem',
          height: '72px',
          transition: 'background 0.5s ease, border-color 0.5s ease',
          background: scrolled ? `${CREAM}f5` : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? `1px solid ${GOLD}30` : '1px solid transparent',
        }}
      >
        <span style={{ fontFamily: SERIF, fontSize: '1.5rem', color: scrolled ? DARK : CREAM, letterSpacing: '0.08em', fontWeight: 300 }}>
          Grand Palais
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
          {NAV_LINKS.slice(0, 4).map((link) => (
            <Link
              key={link}
              href="#"
              style={{
                fontFamily: SANS,
                fontSize: '0.72rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: scrolled ? `${DARK}99` : `${CREAM}99`,
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
            >
              {link}
            </Link>
          ))}
          <button
            style={{
              fontFamily: SANS,
              fontSize: '0.7rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              background: GOLD,
              color: CREAM,
              border: 'none',
              padding: '0.6rem 1.4rem',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => { (e.target as HTMLButtonElement).style.background = GOLD_DIM; }}
            onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.background = GOLD; }}
          >
            Reserve
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 200,
              background: DARK,
              display: 'flex',
              flexDirection: 'column',
              padding: '2.5rem',
            }}
          >
            <button
              onClick={() => setMobileOpen(false)}
              style={{ alignSelf: 'flex-end', background: 'none', border: 'none', color: CREAM, cursor: 'pointer', fontSize: '1.5rem', marginBottom: '3rem' }}
            >
              ✕
            </button>
            {NAV_LINKS.map((link, i) => (
              <motion.div key={link} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}>
                <Link
                  href="#"
                  onClick={() => setMobileOpen(false)}
                  style={{ fontFamily: SERIF, fontSize: '2.5rem', color: CREAM, display: 'block', marginBottom: '1.5rem', textDecoration: 'none' }}
                >
                  {link}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Parallax image
  const bgY = useTransform(heroProgress, [0, 1], ['0%', '30%']);

  // Color shift overlay: deep navy → warm amber as user scrolls
  const r = useTransform(heroProgress, [0, 1], [8, 60]);
  const g = useTransform(heroProgress, [0, 1], [14, 35]);
  const b = useTransform(heroProgress, [0, 1], [40, 14]);
  const overlayColor = useMotionTemplate`rgba(${r}, ${g}, ${b}, 0.72)`;

  // Foreground fade
  const contentOpacity = useTransform(heroProgress, [0, 0.65], [1, 0]);
  const contentY = useTransform(heroProgress, [0, 0.65], ['0px', '-40px']);

  // Heading sweep from below
  const headingY = useTransform(heroProgress, [0, 0.5], ['0px', '-25px']);

  return (
    <section
      ref={heroRef}
      style={{
        position: 'relative',
        height: '100vh',
        overflow: 'hidden',
        background: DARK,
      }}
    >
      {/* Parallax background image */}
      <motion.div
        style={{
          position: 'absolute',
          inset: '-10%',
          backgroundImage: 'url(https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1800&q=90)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          y: bgY,
        }}
      />

      {/* Color-shifting overlay */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: overlayColor,
        }}
      />

      {/* Vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.5) 100%)',
        }}
      />

      {/* Content */}
      <motion.div
        style={{
          position: 'relative',
          zIndex: 10,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 1.5rem',
          opacity: contentOpacity,
          y: contentY,
        }}
      >
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.4em' }}
          animate={{ opacity: 1, letterSpacing: '0.3em' }}
          transition={{ duration: 1.4, delay: 0.3 }}
          style={{
            fontFamily: SANS,
            fontSize: '0.65rem',
            textTransform: 'uppercase',
            color: GOLD,
            letterSpacing: '0.3em',
            marginBottom: '2rem',
          }}
        >
          Palace — Founded 1887
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          style={{
            fontFamily: SERIF,
            fontSize: 'clamp(4.5rem, 12vw, 10rem)',
            fontWeight: 300,
            lineHeight: 0.9,
            color: CREAM,
            marginBottom: '2.5rem',
            y: headingY,
          }}
        >
          Grand<br />
          <em style={{ fontStyle: 'italic' }}>Palais</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.55 }}
          style={{
            fontFamily: SERIF,
            fontSize: '1.15rem',
            color: `${CREAM}aa`,
            maxWidth: '32rem',
            lineHeight: 1.7,
            marginBottom: '3rem',
            fontWeight: 300,
            fontStyle: 'italic',
          }}
        >
          Where time is measured not in hours, but in moments that endure.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.75 }}
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <button
            style={{
              fontFamily: SANS,
              fontSize: '0.7rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              background: GOLD,
              color: CREAM,
              border: 'none',
              padding: '1rem 2.5rem',
              cursor: 'pointer',
            }}
          >
            Discover Our Suites
          </button>
          <button
            style={{
              fontFamily: SANS,
              fontSize: '0.7rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              background: 'transparent',
              color: CREAM,
              border: `1px solid ${CREAM}50`,
              padding: '1rem 2.5rem',
              cursor: 'pointer',
            }}
          >
            Virtual Journey
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          style={{
            width: '1px',
            height: '50px',
            background: `linear-gradient(to bottom, ${CREAM}00, ${CREAM}80)`,
          }}
        />
        <span style={{ fontFamily: SANS, fontSize: '0.55rem', letterSpacing: '0.2em', color: `${CREAM}60`, textTransform: 'uppercase' }}>
          Scroll
        </span>
      </motion.div>
    </section>
  );
}

// ─── Stats Bar ────────────────────────────────────────────────────────────────
function StatsBar() {
  return (
    <div
      style={{
        background: GOLD,
        padding: '2rem 2.5rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1rem',
      }}
    >
      {STATS.map(({ n, l }) => (
        <div key={l} style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: SERIF, fontSize: '2.2rem', fontWeight: 300, color: DARK, lineHeight: 1, marginBottom: '0.3rem' }}>
            {n}
          </p>
          <p style={{ fontFamily: SANS, fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: `${DARK}80` }}>
            {l}
          </p>
        </div>
      ))}
    </div>
  );
}

// ─── Horizontal Scroll Rooms ─────────────────────────────────────────────────
function RoomsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Each card is ~520px + 32px gap. We have 3 cards so total - viewport ~= 2 * 552
  const CARD_W = 520;
  const GAP = 32;
  const TOTAL_SHIFT = -(CARD_W + GAP) * (ROOMS.length - 1);

  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, TOTAL_SHIFT]);
  const springX = useSpring(x, { stiffness: 80, damping: 22 });

  // Decorative large number opacity/position driven by scroll
  const numOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        height: `${100 + ROOMS.length * 60}vh`,
        background: CREAM,
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {/* Section label */}
        <div style={{ padding: '0 3rem', marginBottom: '3rem' }}>
          <BlurReveal>
            <p style={{ fontFamily: SANS, fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, marginBottom: '0.6rem' }}>
              Accommodations
            </p>
            <h2
              style={{
                fontFamily: SERIF,
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                fontWeight: 300,
                color: DARK,
                lineHeight: 1.05,
              }}
            >
              Rooms & Suites
            </h2>
          </BlurReveal>
        </div>

        {/* Horizontal rail */}
        <div style={{ position: 'relative', overflow: 'hidden', paddingLeft: '3rem' }}>
          <motion.div
            style={{
              display: 'flex',
              gap: `${GAP}px`,
              x: springX,
              willChange: 'transform',
            }}
          >
            {ROOMS.map((room, i) => (
              <RoomCard key={room.num} room={room} index={i} scrollYProgress={scrollYProgress} />
            ))}
          </motion.div>
        </div>

        {/* Decorative room number watermark */}
        <motion.div
          style={{
            position: 'absolute',
            right: '3rem',
            bottom: '4rem',
            fontFamily: SERIF,
            fontSize: 'clamp(8rem, 20vw, 18rem)',
            fontWeight: 300,
            color: `${GOLD}15`,
            lineHeight: 1,
            userSelect: 'none',
            pointerEvents: 'none',
            opacity: numOpacity,
          }}
        >
          {/* Active room number driven by scroll */}
          <ScrollRoomNumber scrollYProgress={scrollYProgress} />
        </motion.div>
      </div>
    </section>
  );
}

function ScrollRoomNumber({ scrollYProgress }: { scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      if (v < 0.35) setActive(0);
      else if (v < 0.68) setActive(1);
      else setActive(2);
    });
  }, [scrollYProgress]);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={active}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.5 }}
      >
        {ROOMS[active].num}
      </motion.span>
    </AnimatePresence>
  );
}

function RoomCard({
  room,
  index,
  scrollYProgress,
}: {
  room: typeof ROOMS[0];
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
  const SEGMENTS = ROOMS.length;
  const start = index / SEGMENTS;
  const end = (index + 1) / SEGMENTS;

  const cardOpacity = useTransform(scrollYProgress, [Math.max(0, start - 0.1), start + 0.05, end - 0.05, Math.min(1, end + 0.1)], [0.45, 1, 1, 0.45]);
  const cardScale = useTransform(scrollYProgress, [Math.max(0, start - 0.1), start + 0.05, end - 0.05, Math.min(1, end + 0.1)], [0.96, 1, 1, 0.96]);

  return (
    <motion.div
      style={{
        flex: '0 0 520px',
        height: '520px',
        background: DARK,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        opacity: cardOpacity,
        scale: cardScale,
      }}
    >
      {/* Image */}
      <div
        style={{
          flex: '0 0 55%',
          backgroundImage: `url(${room.img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(26,18,8,0.6) 100%)' }} />
        <div
          style={{
            position: 'absolute',
            top: '1.25rem',
            left: '1.5rem',
            fontFamily: SANS,
            fontSize: '0.6rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: GOLD,
            background: `${DARK}cc`,
            padding: '0.3rem 0.8rem',
          }}
        >
          {room.tag}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: '1.75rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <p style={{ fontFamily: SANS, fontSize: '0.58rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: `${CREAM}50`, marginBottom: '0.4rem' }}>
            {room.size} · {room.view}
          </p>
          <h3
            style={{
              fontFamily: SERIF,
              fontSize: '1.75rem',
              fontWeight: 300,
              color: CREAM,
              marginBottom: '0.75rem',
              lineHeight: 1.1,
            }}
          >
            {room.name}
          </h3>
          <p style={{ fontFamily: SERIF, fontSize: '0.9rem', color: `${CREAM}70`, lineHeight: 1.7, fontStyle: 'italic' }}>
            {room.desc}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: '1.25rem' }}>
          <div>
            <p style={{ fontFamily: SANS, fontSize: '0.55rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: `${CREAM}40`, marginBottom: '0.2rem' }}>
              From
            </p>
            <p style={{ fontFamily: SERIF, fontSize: '2.2rem', fontWeight: 300, color: GOLD, lineHeight: 1 }}>
              {room.price}
              <span style={{ fontFamily: SANS, fontSize: '0.65rem', color: `${CREAM}40`, marginLeft: '0.3rem' }}>/night</span>
            </p>
          </div>
          <button
            style={{
              fontFamily: SANS,
              fontSize: '0.62rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              background: GOLD,
              color: CREAM,
              border: 'none',
              padding: '0.75rem 1.5rem',
              cursor: 'pointer',
            }}
          >
            Reserve
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Experience Section ───────────────────────────────────────────────────────
function ExperienceSection() {
  return (
    <section style={{ background: DARK, padding: '8rem 0' }}>
      <div style={{ maxWidth: '75rem', margin: '0 auto', padding: '0 3rem' }}>
        <BlurReveal>
          <div style={{ marginBottom: '5rem' }}>
            <p style={{ fontFamily: SANS, fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, marginBottom: '0.75rem' }}>
              The Experience
            </p>
            <h2
              style={{
                fontFamily: SERIF,
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 300,
                color: CREAM,
                lineHeight: 1.1,
                maxWidth: '28rem',
              }}
            >
              Every Sense,<br />
              <em>Attended To</em>
            </h2>
          </div>
        </BlurReveal>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
          {EXPERIENCES.map((exp, i) => (
            <ExperienceRow key={exp.label} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceRow({ exp, index }: { exp: typeof EXPERIENCES[0]; index: number }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: rowRef, offset: ['start end', 'center center'] });

  // Parallax on image
  const imgY = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={rowRef}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '4rem',
        alignItems: 'center',
      }}
    >
      {/* Image side */}
      <div
        style={{
          gridColumn: isEven ? '1' : '2',
          gridRow: '1',
          position: 'relative',
          height: '480px',
          overflow: 'hidden',
        }}
      >
        <motion.div
          style={{
            position: 'absolute',
            inset: '-15%',
            backgroundImage: `url(${exp.img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            y: imgY,
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(26,18,8,0.25)' }} />
      </div>

      {/* Text side */}
      <BlurReveal
        delay={0.1}
        style={{
          gridColumn: isEven ? '2' : '1',
          gridRow: '1',
        }}
      >
        <div>
          <p style={{ fontFamily: SANS, fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: GOLD, marginBottom: '1rem' }}>
            {exp.sub}
          </p>
          <h3
            style={{
              fontFamily: SERIF,
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              fontWeight: 300,
              color: CREAM,
              lineHeight: 1.1,
              marginBottom: '1.5rem',
            }}
          >
            {exp.label}
          </h3>
          <p
            style={{
              fontFamily: SERIF,
              fontSize: '1.05rem',
              color: `${CREAM}70`,
              lineHeight: 1.8,
              fontStyle: 'italic',
              marginBottom: '2.5rem',
              maxWidth: '28rem',
            }}
          >
            {exp.desc}
          </p>
          <button
            style={{
              fontFamily: SANS,
              fontSize: '0.65rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              background: 'transparent',
              color: GOLD,
              border: `1px solid ${GOLD}50`,
              padding: '0.9rem 2rem',
              cursor: 'pointer',
            }}
          >
            Discover More
          </button>
        </div>
      </BlurReveal>
    </motion.div>
  );
}

// ─── Parallax Divider ─────────────────────────────────────────────────────────
function ParallaxDivider() {
  return (
    <ParallaxSection
      imgSrc="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=85"
      speed={0.35}
      height="55vh"
      overlay="rgba(26,18,8,0.55)"
    >
      <BlurReveal>
        <div style={{ textAlign: 'center', padding: '0 2rem' }}>
          <p
            style={{
              fontFamily: SERIF,
              fontSize: 'clamp(1.8rem, 4vw, 3.5rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: CREAM,
              maxWidth: '38rem',
              lineHeight: 1.4,
            }}
          >
            "Luxury is the ease of a t-shirt in a very expensive dress."
          </p>
          <p style={{ fontFamily: SANS, fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, marginTop: '1.5rem' }}>
            — Karl Lagerfeld
          </p>
        </div>
      </BlurReveal>
    </ParallaxSection>
  );
}

// ─── Dining Section ───────────────────────────────────────────────────────────
function DiningSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <section
      ref={sectionRef}
      style={{ background: CREAM, padding: '9rem 0', position: 'relative', overflow: 'hidden' }}
    >
      {/* Subtle textured bg element */}
      <motion.div
        style={{
          position: 'absolute',
          right: '-5rem',
          top: '5rem',
          width: '45vw',
          height: '80%',
          backgroundImage: 'url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=85)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          y: bgY,
          opacity: 0.18,
          filter: 'saturate(0)',
        }}
      />

      <div style={{ maxWidth: '75rem', margin: '0 auto', padding: '0 3rem', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>
          <BlurReveal>
            <div>
              <p style={{ fontFamily: SANS, fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, marginBottom: '1rem' }}>
                Gastronomy
              </p>
              <h2
                style={{
                  fontFamily: SERIF,
                  fontSize: 'clamp(2.5rem, 4.5vw, 4rem)',
                  fontWeight: 300,
                  color: DARK,
                  lineHeight: 1.1,
                  marginBottom: '1.75rem',
                }}
              >
                L'Atelier<br />
                <em style={{ fontStyle: 'italic', color: GOLD_DIM }}>Restaurant</em>
              </h2>
              <p
                style={{
                  fontFamily: SERIF,
                  fontSize: '1.05rem',
                  color: `${DARK}80`,
                  lineHeight: 1.8,
                  fontStyle: 'italic',
                  marginBottom: '2rem',
                  maxWidth: '30rem',
                }}
              >
                Two Michelin stars. Chef Margaux Vernet reimagines the French canon with produce grown fifty metres from the kitchen. The tasting menu changes with the moon.
              </p>
              <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2.5rem' }}>
                {[['Breakfast', '7—11h'], ['Déjeuner', '12—14h30'], ['Dîner', '19—22h']].map(([m, t]) => (
                  <div key={m} style={{ borderLeft: `1px solid ${GOLD}50`, paddingLeft: '1rem' }}>
                    <p style={{ fontFamily: SANS, fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: DARK, marginBottom: '0.2rem' }}>{m}</p>
                    <p style={{ fontFamily: SERIF, fontSize: '0.85rem', color: `${DARK}70` }}>{t}</p>
                  </div>
                ))}
              </div>
              <button
                style={{
                  fontFamily: SANS,
                  fontSize: '0.65rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  background: DARK,
                  color: CREAM,
                  border: 'none',
                  padding: '1rem 2.2rem',
                  cursor: 'pointer',
                }}
              >
                Reserve a Table
              </button>
            </div>
          </BlurReveal>

          <BlurReveal delay={0.15}>
            <div
              style={{
                height: '560px',
                backgroundImage: 'url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1000&q=85)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
              }}
            >
              <div style={{ position: 'absolute', bottom: '-1.5rem', left: '-1.5rem', background: GOLD, padding: '1.5rem 2rem' }}>
                <p style={{ fontFamily: SERIF, fontSize: '2rem', fontWeight: 300, color: CREAM, lineHeight: 1 }}>2 ✦</p>
                <p style={{ fontFamily: SANS, fontSize: '0.55rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: `${CREAM}80`, marginTop: '0.3rem' }}>
                  Michelin Stars
                </p>
              </div>
            </div>
          </BlurReveal>
        </div>
      </div>
    </section>
  );
}

// ─── Location Section ─────────────────────────────────────────────────────────
function LocationSection() {
  return (
    <section style={{ background: MID, padding: '9rem 0' }}>
      <div style={{ maxWidth: '75rem', margin: '0 auto', padding: '0 3rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'start' }}>
          <BlurReveal>
            <div>
              <p style={{ fontFamily: SANS, fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, marginBottom: '1rem' }}>
                Location
              </p>
              <h2
                style={{
                  fontFamily: SERIF,
                  fontSize: 'clamp(2.5rem, 4.5vw, 4rem)',
                  fontWeight: 300,
                  color: CREAM,
                  lineHeight: 1.1,
                  marginBottom: '2rem',
                }}
              >
                At the Heart of<br />
                <em>the City of Light</em>
              </h2>
              <p
                style={{
                  fontFamily: SERIF,
                  fontSize: '1.05rem',
                  color: `${CREAM}70`,
                  lineHeight: 1.8,
                  fontStyle: 'italic',
                  marginBottom: '3rem',
                }}
              >
                Eight hundred metres from the Opéra. A fifteen-minute walk to the Louvre. Paris unfolds at your threshold.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {[
                  { icon: '◎', label: 'Address', val: '8 Avenue de la Paix, 75009 Paris' },
                  { icon: '◎', label: 'Telephone', val: '+33 1 40 00 00 00' },
                  { icon: '◎', label: 'Reservations', val: 'reservations@grandpalais.fr' },
                  { icon: '◎', label: 'Concierge', val: 'Available 24 hours' },
                ].map(({ icon, label, val }) => (
                  <div key={label} style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                    <span style={{ color: GOLD, fontSize: '0.7rem', marginTop: '0.15rem', flexShrink: 0 }}>{icon}</span>
                    <div>
                      <p style={{ fontFamily: SANS, fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: `${CREAM}50`, marginBottom: '0.2rem' }}>
                        {label}
                      </p>
                      <p style={{ fontFamily: SERIF, fontSize: '0.95rem', color: CREAM_DIM }}>{val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </BlurReveal>

          <BlurReveal delay={0.2}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div
                style={{
                  height: '340px',
                  backgroundImage: 'url(https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1000&q=85)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative',
                }}
              >
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(26,18,8,0.2)' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                {[
                  { label: 'Opéra Garnier', dist: '5 min' },
                  { label: 'Louvre', dist: '15 min' },
                  { label: 'Eiffel Tower', dist: '20 min' },
                  { label: 'CDG Airport', dist: '35 min' },
                ].map(({ label, dist }) => (
                  <div key={label} style={{ background: `${CREAM}08`, padding: '1.25rem 1.5rem', borderLeft: `2px solid ${GOLD}` }}>
                    <p style={{ fontFamily: SANS, fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: `${CREAM}60`, marginBottom: '0.3rem' }}>
                      {label}
                    </p>
                    <p style={{ fontFamily: SERIF, fontSize: '1.5rem', fontWeight: 300, color: GOLD }}>{dist}</p>
                  </div>
                ))}
              </div>
            </div>
          </BlurReveal>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  { name: 'Sophie R.', origin: 'Paris', text: 'An experience that redefined our expectations of hospitality. Every detail, every gesture — flawless.', stars: 5 },
  { name: 'James W.', origin: 'London', text: 'The Grand Palais is beyond comparison. The suite views, the silence, the staff — we return every autumn.', stars: 5 },
  { name: 'Hana T.', origin: 'Tokyo', text: 'The most extraordinary stay of our lives. Nothing prepares you for the quiet perfection of this place.', stars: 5 },
];

function TestimonialsSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % TESTIMONIALS.length), 5500);
    return () => clearInterval(t);
  }, []);

  return (
    <section style={{ background: GOLD, padding: '8rem 3rem' }}>
      <div style={{ maxWidth: '52rem', margin: '0 auto', textAlign: 'center' }}>
        <BlurReveal>
          <p style={{ fontFamily: SANS, fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: `${DARK}70`, marginBottom: '3.5rem' }}>
            Guest Voices
          </p>
        </BlurReveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.35rem', marginBottom: '2rem' }}>
              {Array.from({ length: TESTIMONIALS[active].stars }).map((_, i) => (
                <span key={i} style={{ color: DARK, fontSize: '0.9rem' }}>✦</span>
              ))}
            </div>
            <p
              style={{
                fontFamily: SERIF,
                fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: DARK,
                lineHeight: 1.5,
                marginBottom: '2rem',
              }}
            >
              "{TESTIMONIALS[active].text}"
            </p>
            <p style={{ fontFamily: SANS, fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: DARK, fontWeight: 500 }}>
              {TESTIMONIALS[active].name}
            </p>
            <p style={{ fontFamily: SANS, fontSize: '0.62rem', color: `${DARK}60`, marginTop: '0.25rem' }}>
              {TESTIMONIALS[active].origin}
            </p>
          </motion.div>
        </AnimatePresence>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', marginTop: '3rem' }}>
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                width: i === active ? '2rem' : '0.45rem',
                height: '0.45rem',
                borderRadius: '9999px',
                background: i === active ? DARK : `${DARK}40`,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.4s ease',
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Booking CTA ──────────────────────────────────────────────────────────────
function BookingCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section ref={sectionRef} style={{ position: 'relative', overflow: 'hidden', background: DARK }}>
      {/* Parallax background */}
      <motion.div
        style={{
          position: 'absolute',
          inset: '-15%',
          backgroundImage: 'url(https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1600&q=85)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          y: bgY,
          opacity: 0.2,
          filter: 'saturate(0)',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          padding: '10rem 3rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <BlurReveal>
          <p style={{ fontFamily: SANS, fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD, marginBottom: '1.5rem' }}>
            Reservations
          </p>
        </BlurReveal>

        <BlurReveal delay={0.1}>
          <h2
            style={{
              fontFamily: SERIF,
              fontSize: 'clamp(3rem, 7vw, 6.5rem)',
              fontWeight: 300,
              color: CREAM,
              lineHeight: 0.95,
              marginBottom: '2rem',
            }}
          >
            Live the<br />
            <em style={{ fontStyle: 'italic', color: GOLD }}>Grand Palais</em>
          </h2>
        </BlurReveal>

        <BlurReveal delay={0.2}>
          <p
            style={{
              fontFamily: SERIF,
              fontSize: '1.1rem',
              color: `${CREAM}70`,
              maxWidth: '30rem',
              lineHeight: 1.8,
              fontStyle: 'italic',
              marginBottom: '3.5rem',
            }}
          >
            Our concierge team is available at every hour to craft a stay that is entirely, irreducibly yours.
          </p>
        </BlurReveal>

        {/* Booking widget */}
        <BlurReveal delay={0.3}>
          <div
            style={{
              background: CREAM,
              padding: '2.5rem',
              display: 'flex',
              gap: '1rem',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              justifyContent: 'center',
              marginBottom: '2.5rem',
            }}
          >
            {[
              { label: 'Arrival', placeholder: 'DD / MM / YYYY' },
              { label: 'Departure', placeholder: 'DD / MM / YYYY' },
              { label: 'Guests', placeholder: '2 Adults' },
            ].map(({ label, placeholder }) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label
                  style={{
                    fontFamily: SANS,
                    fontSize: '0.58rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: `${DARK}80`,
                  }}
                >
                  {label}
                </label>
                <input
                  type="text"
                  placeholder={placeholder}
                  style={{
                    fontFamily: SERIF,
                    fontSize: '0.95rem',
                    color: DARK,
                    background: 'transparent',
                    border: 'none',
                    borderBottom: `1px solid ${DARK}30`,
                    padding: '0.5rem 0',
                    width: '160px',
                    outline: 'none',
                  }}
                />
              </div>
            ))}
            <button
              style={{
                fontFamily: SANS,
                fontSize: '0.68rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                background: GOLD,
                color: CREAM,
                border: 'none',
                padding: '0.9rem 2rem',
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              Check Availability
            </button>
          </div>
        </BlurReveal>

        <BlurReveal delay={0.4}>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a
              href="tel:+33140000000"
              style={{
                fontFamily: SANS,
                fontSize: '0.65rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: `${CREAM}70`,
                textDecoration: 'none',
                borderBottom: `1px solid ${CREAM}30`,
                paddingBottom: '2px',
              }}
            >
              +33 1 40 00 00 00
            </a>
            <a
              href="mailto:reservations@grandpalais.fr"
              style={{
                fontFamily: SANS,
                fontSize: '0.65rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: `${CREAM}70`,
                textDecoration: 'none',
                borderBottom: `1px solid ${CREAM}30`,
                paddingBottom: '2px',
              }}
            >
              reservations@grandpalais.fr
            </a>
          </div>
        </BlurReveal>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: '#0f0b06', borderTop: `1px solid ${GOLD}25`, padding: '5rem 3rem 3rem' }}>
      <div style={{ maxWidth: '75rem', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '3rem', marginBottom: '4rem' }}>
          <div>
            <p style={{ fontFamily: SERIF, fontSize: '1.6rem', fontWeight: 300, color: GOLD, marginBottom: '1rem', letterSpacing: '0.05em' }}>
              Grand Palais
            </p>
            <p style={{ fontFamily: SERIF, fontSize: '0.9rem', color: `${CREAM}50`, lineHeight: 1.7, fontStyle: 'italic', maxWidth: '20rem', marginBottom: '1.5rem' }}>
              A palace of quiet distinction at the heart of Paris since 1887.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {['IG', 'FB', 'TW'].map((s) => (
                <button
                  key={s}
                  style={{
                    width: '2rem',
                    height: '2rem',
                    background: `${GOLD}20`,
                    border: `1px solid ${GOLD}30`,
                    color: GOLD,
                    fontFamily: SANS,
                    fontSize: '0.55rem',
                    cursor: 'pointer',
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {[
            {
              title: 'Stay',
              links: ['Prestige Rooms', 'Deluxe Suites', 'Grand Suite', 'Presidential Suite'],
            },
            {
              title: 'Experiences',
              links: ['L\'Atelier Restaurant', 'Espace Étoile Spa', 'Bar Lumière', 'Private Events'],
            },
            {
              title: 'Information',
              links: ['Rates & Availability', 'Cancellation Policy', 'Special Offers', 'Contact'],
            },
          ].map((col) => (
            <div key={col.title}>
              <p style={{ fontFamily: SANS, fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: `${CREAM}60`, marginBottom: '1.25rem' }}>
                {col.title}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {col.links.map((l) => (
                  <li key={l}>
                    <Link
                      href="#"
                      style={{
                        fontFamily: SERIF,
                        fontSize: '0.9rem',
                        color: `${CREAM}50`,
                        textDecoration: 'none',
                        fontStyle: 'italic',
                      }}
                    >
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          style={{
            borderTop: `1px solid ${CREAM}12`,
            paddingTop: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <span style={{ fontFamily: SANS, fontSize: '0.58rem', color: `${CREAM}35`, letterSpacing: '0.08em' }}>
            © 2026 Grand Palais. All rights reserved.
          </span>
          <div style={{ display: 'flex', gap: '2rem' }}>
            {['Legal Notice', 'Privacy Policy', 'Cookie Settings'].map((l) => (
              <Link
                key={l}
                href="#"
                style={{
                  fontFamily: SANS,
                  fontSize: '0.58rem',
                  color: `${CREAM}35`,
                  textDecoration: 'none',
                  letterSpacing: '0.08em',
                }}
              >
                {l}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 28 });

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: GOLD,
        transformOrigin: 'left',
        scaleX,
        zIndex: 200,
      }}
    />
  );
}

// ─── Root Page ────────────────────────────────────────────────────────────────
export default function GrandPalaisPage() {
  useFonts();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: CREAM,
        fontFamily: SANS,
        color: DARK,
        overflowX: 'hidden',
      }}
    >
      <ScrollProgress />
      <NavBar scrolled={scrolled} />
      <HeroSection />
      <StatsBar />
      <RoomsSection />
      <ParallaxDivider />
      <ExperienceSection />
      <DiningSection />
      <TestimonialsSection />
      <LocationSection />
      <BookingCTA />
      <Footer />
    </div>
  );
}
