import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Check, 
  Target, 
  ShieldAlert, 
  Trophy, 
  FileSpreadsheet, 
  ArrowRight
} from 'lucide-react';
import { sound } from '../lib/sound';

export interface TourStep {
  id: string;
  badge: string;
  title: string;
  targetDescription: string;
  explanation: string;
  howToUse: string;
  icon: React.ComponentType<{ className?: string }>;
  tabTarget?: 'all' | 'converter' | 'calculator';
}

const TOUR_STEPS: TourStep[] = [
  {
    id: 'intro',
    badge: '01 / OVERVIEW',
    title: 'Why Talent Science Exists',
    targetDescription: 'Talent Acquisition Predictive Science',
    explanation: 'Most technical hiring failures stem from subjective "vibe checks" and unstructured interviews. This platform replaces intuition with evidence-based psychometrics and quantitative financial modeling.',
    howToUse: 'Use this cockpit to grade candidates against objective behavioral rubrics (BARS) and immediately audit the P&L risk of a bad hire.',
    icon: Sparkles,
    tabTarget: 'all',
  },
  {
    id: 'bars-rubric',
    badge: '02 / MODULE 1',
    title: 'Interview Report & Analysis Generator',
    targetDescription: 'Behaviorally Anchored Rating Scales (1-3-5 Grading)',
    explanation: 'Instead of arbitrary 1-to-5 star ratings, each skill is anchored to observable technical behaviors: Score 1 (Dangerous / Substandard), Score 3 (Standard Bar), and Score 5 (Exceptional / Autonomous Execution).',
    howToUse: 'Switch between Tech, Product, Sales, and Ops roles. Adjust weights to reflect your quarterly priorities, or click "Auto-100%" to normalize.',
    icon: Target,
    tabTarget: 'converter',
  },
  {
    id: 'activity-ring',
    badge: '03 / METRICS',
    title: 'Dynamic Fit % & Decision Status',
    targetDescription: 'Activity Ring & Recommendation Engine',
    explanation: 'The cockpit calculates a weighted composite fit percentage in real-time. It maps directly to an objective decision protocol: HIRE (≥80%), CALIBRATE (50-79%), or PASS (<50%).',
    howToUse: 'Once evaluated, click "Lock Into Arena" to benchmark this candidate against previous applicants, or click "Copy Scorecard" for your ATS.',
    icon: Trophy,
    tabTarget: 'converter',
  },
  {
    id: 'pnl-simulator',
    badge: '04 / MODULE 2',
    title: 'Interview Report & Analysis Generator (P&L)',
    targetDescription: 'SHRM / Harvard Business Review Cost Engine',
    explanation: 'A bad hire costs far more than lost salary. This engine models the 5 hidden cost vectors: recruiting fees, wasted onboarding ramp-up, team disruption, and lost opportunity cost.',
    howToUse: 'Drag the sliders (Base Salary, Annual Hires, Failure Rate, Agency Fees) to stress-test your organization’s exposure and see net savings with structured screening.',
    icon: ShieldAlert,
    tabTarget: 'calculator',
  },
  {
    id: 'export-lead',
    badge: '05 / ACTIONABLE OUTPUT',
    title: 'Scorecard Export & Next Steps',
    targetDescription: 'ATS Integration & Booking',
    explanation: 'The entire evaluation can be exported as a clean Markdown scorecard formatted for Greenhouse, Ashby, Lever, or Notion.',
    howToUse: 'Click "Export MD" in the header to copy candidate data, or "Book 15m" to calibrate your hiring team’s assessment infrastructure with Catalina Gil.',
    icon: FileSpreadsheet,
    tabTarget: 'all',
  },
];

interface GuidedTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchTab?: (tab: 'all' | 'converter' | 'calculator') => void;
}

export const GuidedTourModal: React.FC<GuidedTourModalProps> = ({
  isOpen,
  onClose,
  onSwitchTab,
}) => {
  const [currentStepIdx, setCurrentStepIdx] = React.useState(0);

  const step = TOUR_STEPS[currentStepIdx];
  const IconComponent = step.icon;

  const handleNext = () => {
    sound.playTone(560, 'sine', 0.05);
    if (currentStepIdx < TOUR_STEPS.length - 1) {
      const nextIdx = currentStepIdx + 1;
      setCurrentStepIdx(nextIdx);
      if (onSwitchTab && TOUR_STEPS[nextIdx].tabTarget) {
        onSwitchTab(TOUR_STEPS[nextIdx].tabTarget!);
      }
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    sound.playTone(420, 'sine', 0.05);
    if (currentStepIdx > 0) {
      const prevIdx = currentStepIdx - 1;
      setCurrentStepIdx(prevIdx);
      if (onSwitchTab && TOUR_STEPS[prevIdx].tabTarget) {
        onSwitchTab(TOUR_STEPS[prevIdx].tabTarget!);
      }
    }
  };

  const handleComplete = () => {
    sound.playChord();
    onClose();
    localStorage.setItem('talentlens_tour_seen', 'true');
  };

  const handleJump = (index: number) => {
    sound.playTone(500, 'sine', 0.04);
    setCurrentStepIdx(index);
    if (onSwitchTab && TOUR_STEPS[index].tabTarget) {
      onSwitchTab(TOUR_STEPS[index].tabTarget!);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
        {/* Apple-style backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/55 backdrop-blur-md"
        />

        {/* Floating Interactive Card */}
        <motion.div
          key={step.id}
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 26, stiffness: 350 }}
          className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-[var(--apple-border)] bg-[var(--apple-surface)]/95 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl text-[var(--apple-text-primary)]"
        >
          {/* Top Bar with Step Indicators */}
          <div className="flex items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-1.5">
              {TOUR_STEPS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleJump(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === currentStepIdx
                      ? 'w-7 bg-blue-500'
                      : i < currentStepIdx
                      ? 'w-3 bg-blue-500/40'
                      : 'w-3 bg-[var(--apple-border)] hover:bg-[var(--apple-text-tertiary)]'
                  }`}
                  aria-label={`Go to step ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={onClose}
              className="rounded-full p-1.5 text-[var(--apple-text-tertiary)] hover:bg-[var(--apple-hover)] hover:text-[var(--apple-text-primary)] transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Header */}
          <div className="flex items-start gap-4 mb-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500 border border-blue-500/20 shadow-sm">
              <IconComponent className="h-6 w-6" />
            </div>
            <div>
              <span className="text-[11px] font-mono font-bold tracking-wider text-blue-500 uppercase">
                {step.badge}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--apple-text-primary)]">
                {step.title}
              </h3>
              <p className="text-xs font-semibold text-[var(--apple-text-tertiary)]">
                Focus: {step.targetDescription}
              </p>
            </div>
          </div>

          {/* Body Content */}
          <div className="space-y-4 text-xs sm:text-sm leading-relaxed border-y border-[var(--apple-border)] py-4 my-4">
            <div>
              <h4 className="font-semibold text-[var(--apple-text-primary)] mb-1">
                What this is:
              </h4>
              <p className="text-[var(--apple-text-secondary)]">
                {step.explanation}
              </p>
            </div>

            <div className="rounded-xl bg-[var(--apple-hover)]/40 p-3.5 border border-[var(--apple-border)]">
              <h4 className="font-semibold text-blue-500 text-xs mb-1 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" /> Interactive Tip:
              </h4>
              <p className="text-xs text-[var(--apple-text-secondary)]">
                {step.howToUse}
              </p>
            </div>
          </div>

          {/* Footer Controls */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              onClick={handlePrev}
              disabled={currentStepIdx === 0}
              className={`flex items-center gap-1 text-xs font-semibold px-3 py-2 rounded-full transition-colors ${
                currentStepIdx === 0
                  ? 'opacity-30 cursor-not-allowed text-[var(--apple-text-tertiary)]'
                  : 'hover:bg-[var(--apple-hover)] text-[var(--apple-text-secondary)] hover:text-[var(--apple-text-primary)]'
              }`}
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>

            <div className="text-xs text-[var(--apple-text-tertiary)] font-mono">
              {currentStepIdx + 1} of {TOUR_STEPS.length}
            </div>

            <button
              onClick={handleNext}
              className="apple-button flex items-center gap-1.5 text-xs py-2 px-5 font-semibold shadow-md"
            >
              <span>{currentStepIdx === TOUR_STEPS.length - 1 ? 'Start Exploring' : 'Next'}</span>
              {currentStepIdx === TOUR_STEPS.length - 1 ? (
                <Check className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
