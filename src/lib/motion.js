/**
 * Shared motion system
 *
 * Single source of truth for animation timing, easing, and reusable variant
 * presets. Components import from here instead of hardcoding durations, delays,
 * and easing inline.
 *
 * Duration tiers are derived from the values already dominant in the codebase:
 *   - fast (0.2): quick UI feedback (taps, small toggles)
 *   - base (0.5): standard content reveals
 *   - slow (0.8): hero / ceremonial moments
 *
 * Reduced motion: use `useMotionPreset` / `useReducedMotionFlag` so that, when
 * the user requests reduced motion, positional and scale movement collapse to
 * opacity-only (or instant), and decorative loops can be suppressed.
 */

import { useReducedMotion } from "motion/react";

/** Named duration tiers (seconds). */
export const DURATION = {
  fast: 0.2,
  base: 0.5,
  slow: 0.8,
};

/** Decorative loop speeds (seconds) for ambient, infinite animations. */
export const LOOP = {
  nudge: 1.5, // CTA arrow nudge
  pulse: 2, // gentle pulses
  float: 4, // floating hearts drift
};

/** Standardized easing curves. */
export const EASE = {
  out: "easeOut",
  inOut: "easeInOut",
};

/** Default translation distance (px) for "fade up into place" reveals. */
export const LIFT = 20;

// ============ Variant presets ============

/** Simple opacity fade. */
export const fade = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.base, ease: EASE.out },
  },
  exit: {
    opacity: 0,
    transition: { duration: DURATION.base, ease: EASE.inOut },
  },
};

/** Opacity + upward translation into place. */
export const fadeUp = {
  hidden: { opacity: 0, y: LIFT },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE.out },
  },
  exit: {
    opacity: 0,
    y: LIFT,
    transition: { duration: DURATION.base, ease: EASE.inOut },
  },
};

/** Scale up from slightly small with a fade. */
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.base, ease: EASE.out },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: DURATION.base, ease: EASE.inOut },
  },
};

/**
 * Page enter (incoming view): fade + rise.
 * Pairs symmetrically with `pageExit` for the landing -> main transition.
 */
export const pageEnter = {
  hidden: { opacity: 0, y: LIFT },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE.out },
  },
};

/**
 * Page exit (outgoing view): fade + drop.
 * Mirror of `pageEnter` so exit and enter read as one continuous motion.
 */
export const pageExit = {
  opacity: 0,
  y: -LIFT,
  transition: { duration: DURATION.slow, ease: EASE.inOut },
};

// ============ Helpers ============

/**
 * Container variant that staggers its children's reveals evenly.
 * @param {number} [step=DURATION.fast] - Delay between each child (seconds)
 * @returns {import('motion/react').Variants}
 */
export const staggerContainer = (step = DURATION.fast) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: step },
  },
});

/**
 * Per-element transition for a sequenced reveal when not using a container.
 * @param {number} index - Position in the sequence (0-based)
 * @param {number} [step=DURATION.fast] - Delay between elements (seconds)
 * @returns {{ duration: number, ease: string, delay: number }}
 */
export const stagger = (index, step = DURATION.fast) => ({
  duration: DURATION.base,
  ease: EASE.out,
  delay: index * step,
});

// ============ Reduced-motion-aware access ============

/** Opacity-only equivalents used when reduced motion is requested. */
const REDUCED = {
  fade,
  fadeUp: fade,
  scaleIn: fade,
  pageEnter: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  pageExit: { opacity: 0 },
};

const FULL = { fade, fadeUp, scaleIn, pageEnter, pageExit };

/**
 * Returns whether the user has requested reduced motion.
 * @returns {boolean}
 */
export function useReducedMotionFlag() {
  return Boolean(useReducedMotion());
}

/**
 * Returns a motion variant preset by name, automatically swapping to an
 * opacity-only / instant equivalent when the user prefers reduced motion.
 *
 * @param {'fade'|'fadeUp'|'scaleIn'|'pageEnter'|'pageExit'} name
 * @returns {object} The variant object appropriate for the user's preference
 */
export function useMotionPreset(name) {
  const reduced = useReducedMotion();
  const source = reduced ? REDUCED : FULL;
  return source[name] ?? FULL.fade;
}
