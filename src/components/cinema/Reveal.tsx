import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { staggerContainer, fadeUp } from './variants';

interface Props {
  children: React.ReactNode;
  variants?: Variants;
  className?: string;
  stagger?: number;
  delay?: number;
  /** translate3d-only, GPU-friendly */
  as?: 'div' | 'section' | 'li' | 'article';
}

/**
 * Uniform scroll-reveal wrapper.
 * Wraps any block so it animates with the same cinematic language everywhere.
 */
export default function Reveal({ children, variants, className = '', stagger = 0.15, delay = 0, as = 'div' }: Props) {
  const Tag = motion[as];
  const v = variants ? { ...staggerContainer(stagger, delay), ...variants } : staggerContainer(stagger, delay);

  return (
    <Tag
      variants={v}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </Tag>
  );
}

/** Single-element reveal (no stagger) */
export function RevealOnce({ children, className = '', delay = 0, as = 'div' }: Omit<Props, 'stagger' | 'variants'>) {
  const Tag = motion[as];
  const v = { ...fadeUp };
  if (v.visible && typeof v.visible === 'object' && 'transition' in v.visible) {
    (v.visible as any).transition = { ...(v.visible as any).transition, delay };
  } else if (v.visible) {
    (v.visible as any).transition = { delay };
  }

  return (
    <Tag
      variants={v}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </Tag>
  );
}