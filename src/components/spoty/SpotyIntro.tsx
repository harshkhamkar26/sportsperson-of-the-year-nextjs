import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { beamVariants, letterTrack, blurReveal, introVariants } from './variants';
import InteractiveLandscape from '@/components/InteractiveLandscape';

interface Props {
  /** 0..9 cinematic phase, advanced by SpotyPage timer */
  phase: number;
  onComplete: () => void;
}

/**
 * SCENE 01 — black screen, university identity
 * SCENE 02 — anticipation beam + "PRESENTS" + "SPORTS PERSON" / "OF THE YEAR"
 * SCENE 03 — "2025 — 26" reveal, then hand-off to the award stage.
 */
export default function SpotyIntro({ phase, onComplete }: Props) {
  const reducedMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.section
        key="intro"
        variants={introVariants}
        initial="blackScreen"
        exit="exit"
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-transparent"
        aria-label="Sports Person of the Year 2025-26 introduction"
      >
        <div className="absolute inset-0 z-0">
          <InteractiveLandscape />
        </div>
        
        {/* Scene 02 horizontal beam of light */}
        {phase >= 1 && !reducedMotion && (
          <motion.div
            variants={beamVariants}
            initial="hidden"
            animate="visible"
            className="absolute top-1/2 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent"
          />
        )}

        {/* SCENE 01 — University identity */}
        <AnimatePresence>
          <motion.div
            key="identity"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 1 ? 1 : 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="mb-10 z-10 text-center drop-shadow-[0_5px_10px_rgba(0,0,0,0.8)]"
          >
            <p className="font-sans text-[11px] md:text-xs font-medium uppercase text-[#D4AF37] [&]:tracking-[0.45em]">
              UNIVERSAL AI UNIVERSITY
            </p>
            <div className="mx-auto mt-3 h-px w-24 bg-[#D4AF37]/30" />
            <p className="mt-3 font-sans text-[10px] md:text-[11px] font-medium uppercase tracking-[0.35em] text-white/70">
              Sports Club
            </p>
          </motion.div>
        </AnimatePresence>

        {/* SCENE 02 — PRESENTS */}
        <AnimatePresence>
          {phase >= 2 && (
            <motion.p
              key="presents"
              variants={letterTrack}
              initial="hidden"
              animate="visible"
              className="font-sans text-xs md:text-sm z-10 font-bold uppercase text-white/80 [&]:tracking-[0.4em] drop-shadow-[0_5px_10px_rgba(0,0,0,0.8)]"
            >
              Presents
            </motion.p>
          )}
        </AnimatePresence>

        {/* SCENE 02 — SPORTS PERSON OF THE YEAR */}
        <AnimatePresence>
          {phase >= 3 && (
            <motion.h1
              key="title"
              variants={blurReveal}
              initial="hidden"
              animate="visible"
              className="mt-6 z-10 text-center font-display font-black uppercase leading-[0.92] drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]"
            >
              <span className="block text-[clamp(2.4rem,9vw,7.5rem)] tracking-tight text-white/95 drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]">
                Sports
              </span>
              <span className="block text-[clamp(1.6rem,6vw,5rem)] tracking-[0.08em] bg-gradient-to-r from-[#D4AF37] to-[#e8cb6d] text-transparent bg-clip-text drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                Person
              </span>
              <span className="block text-[clamp(1.2rem,4.4vw,3.6rem)] tracking-[0.18em] text-white/90 drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]">
                Of the Year
              </span>
            </motion.h1>
          )}
        </AnimatePresence>

        {/* SCENE 03 — SEASON / YEAR */}
        <AnimatePresence>
          {phase >= 4 && (
            <motion.div
              key="year"
              initial={{ opacity: 0, scale: 1.25, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.1, ease: 'easeOut' }}
              className="mt-10"
            >
              <span className="font-display text-3xl md:text-5xl font-light tracking-[0.2em] text-[#D4AF37]">
                2025<span className="mx-2 text-white/30">—</span>26
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Skip hint (keyboard accessible) */}
        {phase < 4 && (
          <button
            onClick={onComplete}
            className="absolute bottom-8 font-sans text-[10px] uppercase tracking-[0.3em] text-white/35 transition-colors hover:text-[#D4AF37] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/50"
          >
            Skip intro →
          </button>
        )}
      </motion.section>
    </AnimatePresence>
  );
}
