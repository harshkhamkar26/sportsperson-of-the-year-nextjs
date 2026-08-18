import type { Variants } from 'framer-motion';

/**
 * SPOTY OS — shared cinematic motion variants.
 * Reused across every page so the whole platform animates as one system.
 */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 24, stiffness: 200 } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

export const blurReveal: Variants = {
  hidden: { opacity: 0, filter: 'blur(14px)', scale: 0.985 },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    scale: 1,
    transition: { type: 'spring', damping: 22, stiffness: 180 },
  },
};

export const letterTrack: Variants = {
  hidden: { opacity: 0, letterSpacing: '0.8em' },
  visible: { opacity: 1, letterSpacing: '0.25em', transition: { duration: 1.3, ease: 'easeOut' } },
};

export const staggerContainer = (stagger = 0.12, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren } },
});

export const heroItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 22, stiffness: 170 } },
};

export const statItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 20, stiffness: 160 } },
};

export const imageReveal: Variants = {
  hidden: { opacity: 0.35, scale: 1.1, filter: 'blur(16px)' },
  visible: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 1.4, ease: 'easeOut' } },
};

export const listItem: Variants = {
  hidden: { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0, transition: { type: 'spring', damping: 24, stiffness: 180 } },
};

export const podiumCard: Variants = {
  hidden: { opacity: 0, y: 60, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: 'spring', damping: 18, stiffness: 130 } },
};

export const beamVariants: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: { scaleX: 1, opacity: 0.5, transition: { duration: 1.2, ease: 'easeInOut' } },
};
