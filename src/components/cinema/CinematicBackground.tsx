import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/** Background atmosphere tones — one coherent SPOTY OS palette per page. */
export type CinematicTone = 'arena' | 'race' | 'live' | 'story' | 'ops';

interface Tone {
  accent: string;   // champagne gold
  glow: string;     // secondary atmosphere
  glow2: string;    // tertiary atmosphere
}

const TONES: Record<CinematicTone, Tone> = {
  arena: { accent: '#D4AF37', glow: '#3B82F6', glow2: '#1d4ed8' },   // gold + electric blue
  race:  { accent: '#D4AF37', glow: '#7c3aed', glow2: '#4c1d95' },   // gold + ultraviolet
  live:  { accent: '#60a5fa', glow: '#22d3ee', glow2: '#2563eb' },   // electric blue + cyan
  story: { accent: '#D4AF37', glow: '#94a3b8', glow2: '#e2e8f0' },   // gold + atmospheric white
  ops:   { accent: '#D4AF37', glow: '#64748b', glow2: '#334155' },   // graphite + restrained gold
};

interface Props {
  tone?: CinematicTone;
  className?: string;
}

/**
 * Reusable cinematic environment used across the whole platform.
 * One coherent system: obsidian base, radial lighting, slow particles,
 * thin beams, championship-ring geometry, grain, vignette — plus a
 * pointer-following spotlight and scroll parallax. Purely decorative.
 */
export default function CinematicBackground({ tone = 'arena', className = '' }: Props) {
  const reducedMotion = useReducedMotion();
  const t = TONES[tone];

  const px = useMotionValue(-600);
  const py = useMotionValue(-600);
  const sx = useSpring(px, { stiffness: 60, damping: 20 });
  const sy = useSpring(py, { stiffness: 60, damping: 20 });
  const glowX = useTransform(sx, (v) => v * 0.05);
  const glowY = useTransform(sy, (v) => v * 0.05);

  const particles = Array.from({ length: 14 });

  if (typeof window !== 'undefined') {
    window.addEventListener('pointermove', (e) => {
      px.set(e.clientX);
      py.set(e.clientY);
    }, { passive: true });
  }

  return (
    <div aria-hidden className={`fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#060606] ${className}`}>
      {/* Obsidian base + vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-20%,#1a1a1a_0%,#0a0a0a_55%,#050505_100%)]" />

      {/* Radial atmosphere */}
      <motion.div
        style={{ x: glowX, y: glowY }}
        className="absolute -top-40 left-1/4 h-[640px] w-[640px] rounded-full opacity-[0.07] blur-[140px]"
      >
        <div className="h-full w-full rounded-full" style={{ background: t.glow }} />
      </motion.div>
      <motion.div
        style={{ x: glowX, y: glowY }}
        className="absolute -bottom-48 right-1/4 h-[560px] w-[560px] rounded-full opacity-[0.05] blur-[160px]"
      >
        <div className="h-full w-full rounded-full" style={{ background: t.glow2 }} />
      </motion.div>

      {/* Championship-ring geometry */}
      <div className="absolute top-1/2 left-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full border border-white/[0.04]">
        <div className="absolute inset-16 rounded-full border border-white/[0.03]" />
        <div className="absolute inset-32 rounded-full border border-white/[0.02]" />
      </div>

      {/* Thin geometric lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:120px_120px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />

      {/* Slow atmospheric particles */}
      {!reducedMotion &&
        particles.map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-[2px] w-[2px] rounded-full"
            style={{ left: `${(i * 41) % 100}%`, top: `${(i * 59) % 100}%`, background: t.accent }}
            animate={{ y: [0, -30, 0], opacity: [0.08, 0.4, 0.08] }}
            transition={{ duration: 8 + (i % 5) * 2.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.6 }}
          />
        ))}

      {/* Soft light beams */}
      <div className="absolute -top-24 left-[15%] h-[120vh] w-px -rotate-[14deg] bg-gradient-to-b from-transparent to-transparent opacity-60"
        style={{ backgroundImage: `linear-gradient(to bottom, transparent, ${t.accent}1A, transparent)` }} />
      <div className="absolute -top-24 right-[18%] h-[120vh] w-px rotate-[14deg] bg-gradient-to-b from-transparent to-transparent opacity-60"
        style={{ backgroundImage: `linear-gradient(to bottom, transparent, ${t.glow}14, transparent)` }} />

      {/* Pointer spotlight */}
      <motion.div
        style={{ x: sx, y: sy }}
        className="absolute h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.05]"
      >
        <div className="h-full w-full rounded-full" style={{ background: `radial-gradient(circle, ${t.accent} 0%, transparent 70%)` }} />
      </motion.div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.55)_100%)]" />

      {/* Film grain */}
      {!reducedMotion && (
        <div
          className="absolute inset-0 opacity-[0.025] mix-blend-overlay"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E")',
          }}
        />
      )}
    </div>
  );
}
