import { useReducedMotion } from "framer-motion";

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Returns animation props that respect the user's prefers-reduced-motion setting.
 * When reduced motion is preferred, animations are disabled (no movement, instant opacity).
 *
 * Usage:
 *   const { safeInitial, safeAnimate, safeTransition } = useAccessibleAnimation();
 *   <motion.div initial={safeInitial({ opacity: 0, y: 20 })} animate={safeAnimate({ opacity: 1, y: 0 })} />
 */
export function useAccessibleAnimation() {
  const shouldReduce = useReducedMotion();

  return {
    /** Returns false (no initial state) if reduced motion, otherwise the given variant */
    safeInitial: (variant: any): any =>
      shouldReduce ? false : variant,

    /**
     * Returns the animate target unchanged. When reduced motion is active,
     * safeInitial returns false (skipping the initial state) and safeTransition
     * sets duration to 0 — so the element jumps instantly to this target.
     * safeAnimate itself does not need to change because it represents the
     * desired end-state, not the motion path.
     */
    safeAnimate: (variant: any): any => variant,

    /** Returns instant transition if reduced motion, otherwise the given transition */
    safeTransition: (transition: any): any =>
      shouldReduce ? { duration: 0 } : transition,

    /** Whether to skip animations entirely */
    shouldReduce: !!shouldReduce,
  };
}
