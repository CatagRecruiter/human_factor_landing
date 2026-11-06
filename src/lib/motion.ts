/**
 * Unified animation tokens & spring physics
 */
export const transitions = {
  appleSpring: {
    type: "spring" as const,
    stiffness: 260,
    damping: 24,
    mass: 0.8
  },
  snappySpring: {
    type: "spring" as const,
    stiffness: 380,
    damping: 30,
    mass: 0.6
  },
  gentleSpring: {
    type: "spring" as const,
    stiffness: 140,
    damping: 20,
    mass: 1.0
  },
  bouncySpring: {
    type: "spring" as const,
    stiffness: 300,
    damping: 15,
    mass: 0.8
  }
};

export const fadeInVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: transitions.appleSpring
  }
};

export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: transitions.appleSpring
  }
};
