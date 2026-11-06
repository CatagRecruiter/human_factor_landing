/**
 * Safe mobile haptic feedback helper using navigator.vibrate
 */
export const haptics = {
  /** Light click/tap sensation (10ms) */
  tap: () => {
    try {
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate(10);
      }
    } catch {
      // Ignore silence
    }
  },

  /** Crisp selection switch or step (18ms) */
  step: () => {
    try {
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate(18);
      }
    } catch {
      // Ignore silence
    }
  },

  /** Positive confirmation/achievement (double pulse) */
  success: () => {
    try {
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate([15, 60, 25]);
      }
    } catch {
      // Ignore silence
    }
  },

  /** Strong milestone or high impact trigger */
  impact: () => {
    try {
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate([35, 40, 20]);
      }
    } catch {
      // Ignore silence
    }
  },

  /** Error or alert double buzz */
  warning: () => {
    try {
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate([40, 50, 40]);
      }
    } catch {
      // Ignore silence
    }
  }
};
