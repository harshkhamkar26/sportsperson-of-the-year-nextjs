import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useInView, animate } from 'framer-motion';
import { statVariants, staggerContainer } from './variants';

interface StatItem {
  value: number;
  label: string;
  highlight?: boolean;
}

interface Props {
  stats: StatItem[];
}

/** Eased 0 → target counter, triggered when it enters the viewport. */
function CountUp({ target, delay, reducedMotion }: { target: number; delay: number; reducedMotion: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [display, setDisplay] = useState(reducedMotion ? String(target).padStart(2, '0') : '00');

  useEffect(() => {
    if (!inView || reducedMotion) return;
    const controls = animate(0, target, {
      duration: 1.6,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(String(Math.round(v)).padStart(2, '0')),
    });
    return () => controls.stop();
  }, [inView, target, delay, reducedMotion]);

  return <span ref={ref}>{display}</span>;
}

/**
 * "THE SEASON THAT MADE THEM" — broadcast-style achievement statistics.
 * Values come straight from the rankings/data layer; nothing is invented.
 */
export default function AchievementStats({ stats }: Props) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.section
      variants={staggerContainer(0.14, 0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className="relative mx-auto w-full max-w-6xl px-6 py-24 md:px-10"
      aria-label="Season statistics"
    >
      <motion.p
        variants={statVariants}
        className="font-sans text-[10px] md:text-xs font-semibold uppercase tracking-[0.4em] text-[#D4AF37]"
      >
        The Season That Made Them
      </motion.p>
      <motion.h2
        variants={statVariants}
        className="mt-3 font-display text-3xl md:text-5xl font-black uppercase text-white"
      >
        The Numbers Behind
        <span className="block text-white/60">The Glory</span>
      </motion.h2>

      <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-14 md:grid-cols-4 md:gap-x-10">
        {stats.map((s, i) => (
          <motion.div key={s.label} variants={statVariants} className="relative text-center">
            <div
              className={`mx-auto mb-6 h-px w-12 ${s.highlight ? 'bg-[#D4AF37]/70' : 'bg-white/20'}`}
            />
            <span
              className={`font-display text-[clamp(2.6rem,7vw,5.5rem)] font-bold leading-none tabular-nums ${
                s.highlight ? 'text-[#D4AF37]' : 'text-white'
              }`}
            >
              <CountUp target={s.value} delay={i * 0.12} reducedMotion={!!reducedMotion} />
            </span>
            <p className="mt-2 font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-white/45">
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
