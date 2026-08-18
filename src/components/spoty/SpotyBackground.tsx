import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';

interface Props {
  /** -1..1 mouse x, used for parallax */
  mouseX: MotionValue<number>;
  /** -1..1 mouse y, used for parallax */
  mouseY: MotionValue<number>;
  /** spotlight follows pointer for the cursor glow */
  spotlightX: MotionValue<number>;
  spotlightY: MotionValue<number>;
}

/**
 * Layered cinematic environment:
 * dark base + radial lighting + noise + particles + rings + beams + vignette,
 * all mouse/scroll responsive. Subtle, never distracting.
 */
export default function SpotyBackground({ mouseX, mouseY, spotlightX, spotlightY }: Props) {
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scrollY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  // Parallax offsets driven by pointer
  const ringX = useTransform(mouseX, [-1, 1], [-16, 16]);
  const ringY = useTransform(mouseY, [-1, 1], [-10, 10]);
  const glowX = useTransform(mouseX, [-1, 1], [-28, 28]);
  const glowY = useTransform(mouseY, [-1, 1], [-18, 18]);

  const particles = Array.from({ length: 18 });

  return (
    <div aria-hidden className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#060606]">
      {/* Deep obsidian base with graphite vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-20%,#1a1a1a_0%,#0a0a0a_55%,#050505_100%)]" />

      {/* Subtle radial lighting (gold, follows pointer subtly) */}
      <motion.div
        style={{ x: glowX, y: glowY }}
        className="absolute -top-40 left-1/4 w-[640px] h-[640px] rounded-full opacity-[0.07] bg-[#D4AF37] blur-[140px]"
      />
      {/* Ultraviolet atmosphere */}
      <motion.div
        style={{ x: glowX, y: glowY }}
        className="absolute -bottom-48 right-1/4 w-[560px] h-[560px] rounded-full opacity-[0.05] bg-[#3B82F6] blur-[160px]"
      />

      {/* Championship-ring geometry — abstract, thin, rotating slowly */}
      <motion.div
        style={{ x: ringX, y: ringY, rotate: 45 }}
        className="absolute top-1/2 left-1/2 w-[420px] h-[420px] md:w-[620px] md:h-[620px] rounded-full border border-[#D4AF37]/10"
      >
        <div className="absolute inset-10 rounded-full border border-[#D4AF37]/5" />
        <div className="absolute inset-24 rounded-full border border-white/[0.04]" />
      </motion.div>

      {/* Thin geometric grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:120px_120px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />

      {/* Slow atmospheric particles */}
      {!reducedMotion &&
        particles.map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-[2px] h-[2px] rounded-full bg-[#D4AF37]/30"
            style={{ left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%` }}
            animate={{ y: [0, -34, 0], opacity: [0.1, 0.5, 0.1] }}
            transition={{ duration: 9 + (i % 5) * 2.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.7 }}
          />
        ))}

      {/* Soft light beams */}
      <div className="absolute -top-24 left-[15%] w-px h-[120vh] bg-gradient-to-b from-transparent via-[#D4AF37]/8 to-transparent -rotate-[14deg]" />
      <div className="absolute -top-24 right-[18%] w-px h-[120vh] bg-gradient-to-b from-transparent via-[#3B82F6]/6 to-transparent rotate-[14deg]" />

      {/* Scroll parallax depth layer */}
      <motion.div style={{ y: scrollY }} className="absolute inset-0" />

      {/* Pointer spotlight glow (whole page) */}
      <motion.div
        style={{ x: spotlightX, y: spotlightY }}
        className="absolute w-[520px] h-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.05] bg-[radial-gradient(circle,#D4AF37_0%,transparent_70%)]"
      />

      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.55)_100%)]" />

      {/* Film grain — ultra subtle */}
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
