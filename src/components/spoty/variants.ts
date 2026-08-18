import type { Variants } from 'framer-motion';

/** Reusable cinematic animation variants for the SPOTY experience */

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', damping: 24, stiffness: 200 },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

export const blurReveal: Variants = {
  hidden: { opacity: 0, filter: 'blur(14px)', scale: 0.98 },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    scale: 1,
    transition: { type: 'spring', damping: 22, stiffness: 180 },
  },
};

export const letterTrack: Variants = {
  hidden: { opacity: 0, letterSpacing: '0.8em' },
  visible: {
    opacity: 1,
    letterSpacing: '0.25em',
    transition: { duration: 1.4, ease: 'easeOut' },
  },
};

export const staggerContainer = (stagger = 0.12, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

export const introVariants: Variants = {
  blackScreen: { opacity: 1 },
  visible: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0.8 } },
};

export const beamVariants: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 0.5,
    transition: { duration: 1.2, ease: 'easeInOut' },
  },
};

export const winnerVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', damping: 16, stiffness: 140 },
  },
};

export const imageVariants: Variants = {
  hidden: { opacity: 0.4, scale: 1.08, filter: 'blur(18px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 1.6, ease: 'easeOut' },
  },
};

export const statVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', damping: 20, stiffness: 160 },
  },
};

export const timelineVariants: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', damping: 22, stiffness: 160 },
  },
};

export const spotlightVariants: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', damping: 18, stiffness: 120 },
  },
};
