import { motion } from 'framer-motion';
import { timelineVariants, staggerContainer } from './variants';

interface Moment {
  label: string;
  meta: string;
  /** milestone moments get gold emphasis */
  milestone?: boolean;
}

interface Props {
  moments: Moment[];
}

/**
 * CHAMPIONSHIP MOMENTS — a broadcast "season recap" timeline.
 * Horizontal scroll on desktop, vertical stack on mobile.
 * Built from the top performances present in the rankings data layer.
 */
export default function ChampionshipMoments({ moments }: Props) {
  return (
    <section className="relative mx-auto w-full max-w-6xl px-6 py-24 md:px-10" aria-label="Championship moments">
      <motion.p
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="font-sans text-[10px] md:text-xs font-semibold uppercase tracking-[0.4em] text-[#D4AF37]"
      >
        Championship Moments
      </motion.p>
      <motion.h2
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="mt-3 font-display text-3xl md:text-5xl font-black uppercase text-white"
      >
        The Road to the Crown
      </motion.h2>

      {/* Desktop: horizontal scroll rail */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer(0.18, 0.2)}
        className="mt-16 hidden gap-4 overflow-x-auto pb-6 md:flex md:overflow-visible"
      >
        {moments.map((m, i) => (
          <motion.div key={m.label + i} variants={timelineVariants} className="relative shrink-0">
            <div className="relative w-56 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 transition-colors duration-500 hover:border-[#D4AF37]/40">
              {m.milestone && (
                <span className="absolute right-4 top-4 font-sans text-[9px] font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
                  Milestone
                </span>
              )}
              <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-white/35">
                Event {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className={`mt-3 font-display text-2xl font-bold uppercase ${m.milestone ? 'text-[#D4AF37]' : 'text-white'}`}>
                {m.label}
              </h3>
              <p className="mt-2 font-sans text-xs font-light tracking-wide text-white/50">{m.meta}</p>
            </div>
            {i < moments.length - 1 && (
              <span className="absolute -right-4 top-1/2 hidden h-px w-4 bg-[#D4AF37]/30 md:block" />
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Mobile / tablet: vertical timeline */}
      <motion.ol
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={staggerContainer(0.16, 0.15)}
        className="relative mt-12 space-y-10 border-l border-white/[0.08] pl-8 md:hidden"
      >
        {moments.map((m, i) => (
          <motion.li key={m.label + i} variants={timelineVariants} className="relative">
            <span
              className={`absolute -left-[37px] top-1 h-2.5 w-2.5 rounded-full ${
                m.milestone ? 'bg-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.6)]' : 'bg-white/30'
              }`}
            />
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-white/35">
              Event {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className={`mt-1 font-display text-2xl font-bold uppercase ${m.milestone ? 'text-[#D4AF37]' : 'text-white'}`}>
              {m.label}
            </h3>
            <p className="mt-1 font-sans text-sm font-light text-white/50">{m.meta}</p>
          </motion.li>
        ))}
      </motion.ol>
    </section>
  );
}
