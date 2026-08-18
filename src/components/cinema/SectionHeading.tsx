import { motion } from 'framer-motion';
import { staggerContainer, heroItem } from './variants';

interface Props {
  kicker?: string;
  title: string;
  sub?: string;
  align?: 'left' | 'center';
  accent?: string;
}

/**
 * Editorial section heading used across the whole platform.
 * Staggered blur-reveal entrance when scrolled into view.
 */
export default function SectionHeading({ kicker, title, sub, align = 'left', accent = '#D4AF37' }: Props) {
  const alignCls = align === 'center' ? 'text-center items-center' : 'text-left items-start';
  return (
    <motion.div
      variants={staggerContainer(0.12, 0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className={`flex flex-col ${alignCls} max-w-3xl`}
    >
      {kicker && (
        <motion.span
          variants={heroItem}
          className="font-sans text-[10px] md:text-xs font-semibold uppercase tracking-[0.4em]"
          style={{ color: accent }}
        >
          {kicker}
        </motion.span>
      )}
      <motion.h2
        variants={heroItem}
        className="mt-4 font-display text-[clamp(1.9rem,5vw,4rem)] font-black uppercase leading-[0.95] text-white"
      >
        {title}
      </motion.h2>
      {sub && (
        <motion.p variants={heroItem} className="mt-5 font-sans text-base font-light text-white/55 md:text-lg">
          {sub}
        </motion.p>
      )}
      <motion.div variants={heroItem} className="mt-6 h-px w-16" style={{ background: `${accent}55` }} />
    </motion.div>
  );
}
