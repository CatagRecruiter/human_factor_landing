import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Sparkles, 
  ArrowRight, 
  Sliders, 
  CheckCircle2, 
  Cpu, 
  Scale, 
  FileText,
  Mail,
  ExternalLink
} from 'lucide-react';
import { sound } from '../lib/sound';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAction?: (tab: 'all' | 'converter' | 'calculator') => void;
  onStartTour?: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({
  isOpen,
  onClose,
  onSelectAction,
  onStartTour,
}) => {
  const handleClose = () => {
    sound.playTone(320, 'sine', 0.06);
    onClose();
  };

  const handleAction = (tab: 'all' | 'converter' | 'calculator') => {
    sound.playTone(600, 'sine');
    if (onSelectAction) {
      onSelectAction(tab);
    }
    onClose();
  };

  const handleTour = () => {
    sound.playChord();
    onClose();
    if (onStartTour) {
      onStartTour();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          {/* Backdrop with Apple-style blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: 'spring', damping: 26, stiffness: 340 }}
            className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl border border-[var(--apple-border)] bg-[var(--apple-surface)]/95 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl text-[var(--apple-text-primary)]"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              aria-label="Close modal"
              className="absolute right-4 top-4 rounded-full p-2 text-[var(--apple-text-tertiary)] transition-colors hover:bg-[var(--apple-hover)] hover:text-[var(--apple-text-primary)] z-10"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Profile Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-5">
              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-sky-400 text-white font-bold text-xl shadow-lg shadow-blue-500/20">
                  CG
                </div>
                <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 border-2 border-[var(--apple-surface)] text-white">
                  <CheckCircle2 className="h-3 w-3" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-medium uppercase tracking-wider text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
                    Verify in 2 minutes
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--apple-text-primary)] mt-1">
                  Hi, I'm Catalina Gil
                </h2>
                <p className="text-xs sm:text-sm font-medium text-[var(--apple-text-secondary)]">
                  Senior Talent Acquisition Specialist & Psychometric Systems Architect
                </p>
              </div>
            </div>

            {/* First-person statement */}
            <div className="space-y-3 text-xs sm:text-sm text-[var(--apple-text-secondary)] leading-relaxed border-y border-[var(--apple-border)] py-4 my-4">
              <p>
                I eliminate <span className="text-[var(--apple-text-primary)] font-semibold">"vibe check" bias</span> from high-stakes technical hiring. I transform talent acquisition by combining <strong className="text-[var(--apple-text-primary)]">evidence-based psychometrics</strong>, recruitment automation with <strong className="text-[var(--apple-text-primary)]">n8n / AI</strong>, and structured People Analytics.
              </p>
              <p>
                I designed this interactive cockpit to demonstrate how <strong className="text-[var(--apple-text-primary)]">BARS rubrics</strong> and financial P&amp;L bleed models safeguard operational margins and elevate candidate quality across technical panels.
              </p>
            </div>

            {/* Verified Metrics */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3 mb-5">
              <div className="rounded-xl border border-[var(--apple-border)] bg-[var(--apple-hover)]/30 p-3 text-center">
                <div className="text-base sm:text-lg font-bold text-blue-500 font-mono">7% vs 2%</div>
                <div className="text-[10px] sm:text-xs text-[var(--apple-text-tertiary)] mt-0.5 leading-tight">
                  Outbound Reply Rate (3.5x benchmark)
                </div>
              </div>
              <div className="rounded-xl border border-[var(--apple-border)] bg-[var(--apple-hover)]/30 p-3 text-center">
                <div className="text-base sm:text-lg font-bold text-emerald-500 font-mono">3.2 ➔ 4.6</div>
                <div className="text-[10px] sm:text-xs text-[var(--apple-text-tertiary)] mt-0.5 leading-tight">
                  Candidate NPS via Proof-of-Work
                </div>
              </div>
              <div className="rounded-xl border border-[var(--apple-border)] bg-[var(--apple-hover)]/30 p-3 text-center">
                <div className="text-base sm:text-lg font-bold text-indigo-500 font-mono">4x Scale</div>
                <div className="text-[10px] sm:text-xs text-[var(--apple-text-tertiary)] mt-0.5 leading-tight">
                  Throughput via n8n & AI Prompting
                </div>
              </div>
            </div>

            {/* Production Experience */}
            <div className="space-y-2 mb-6">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[var(--apple-text-tertiary)] flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-blue-500" /> Production Track Record & Methodology
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="rounded-xl border border-[var(--apple-border)] bg-[var(--apple-surface)] p-3 text-xs">
                  <div className="flex items-center gap-1.5 font-semibold text-[var(--apple-text-primary)]">
                    <Scale className="h-3.5 w-3.5 text-blue-500" /> Condigno & Meroo
                  </div>
                  <p className="text-[11px] text-[var(--apple-text-secondary)] mt-1">
                    Predictive selection across Tech, Oil &amp; Gas, and Manufacturing (NL, BE, DE). Gamified psychometric design & compliance with EU/US automated hiring regulations.
                  </p>
                </div>

                <div className="rounded-xl border border-[var(--apple-border)] bg-[var(--apple-surface)] p-3 text-xs">
                  <div className="flex items-center gap-1.5 font-semibold text-[var(--apple-text-primary)]">
                    <Cpu className="h-3.5 w-3.5 text-indigo-500" /> ScaleHouse Talent
                  </div>
                  <p className="text-[11px] text-[var(--apple-text-secondary)] mt-1">
                    Scientific talent evaluation (BARS/SJTs) and automated recruitment pipelines with n8n + OpenAI. Integrations across Greenhouse, Manatal, and Zoho.
                  </p>
                </div>
              </div>
            </div>

            {/* Cockpit Module Launchers */}
            <div className="space-y-2.5 mb-5">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[var(--apple-text-tertiary)]">
                Try my live tools:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  onClick={() => handleAction('converter')}
                  className="flex items-center justify-between p-3 rounded-xl border border-[var(--apple-border)] hover:border-blue-500/50 hover:bg-[var(--apple-hover)]/50 transition-all text-left group"
                >
                  <div>
                    <div className="font-semibold text-xs text-[var(--apple-text-primary)] group-hover:text-blue-500 transition-colors">
                      BARS Arena & Weighted Fit %
                    </div>
                    <div className="text-[10px] text-[var(--apple-text-secondary)]">Live behavioral rating rubric</div>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-[var(--apple-text-tertiary)] group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
                </button>

                <button
                  onClick={() => handleAction('calculator')}
                  className="flex items-center justify-between p-3 rounded-xl border border-[var(--apple-border)] hover:border-amber-500/50 hover:bg-[var(--apple-hover)]/50 transition-all text-left group"
                >
                  <div>
                    <div className="font-semibold text-xs text-[var(--apple-text-primary)] group-hover:text-amber-500 transition-colors">
                      Interview Report & Analysis Generator
                    </div>
                    <div className="text-[10px] text-[var(--apple-text-secondary)]">SHRM / HBR financial model</div>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-[var(--apple-text-tertiary)] group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all" />
                </button>
              </div>
            </div>

            {/* Footer with Links and Primary Action */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-[var(--apple-border)]">
              <div className="flex items-center gap-3 text-xs text-[var(--apple-text-secondary)]">
                <a
                  href="https://www.linkedin.com/in/catalinagilpeopleops"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500 flex items-center gap-1 transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>LinkedIn</span>
                </a>
                <span>•</span>
                <a
                  href="https://docs.google.com/document/d/1LFZOGBt049Cw7poC0fcgHkFuszylslldqMNAUYQO-eg/edit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500 flex items-center gap-1 transition-colors"
                >
                  <FileText className="h-3.5 w-3.5" />
                  <span>Lead CV</span>
                </a>
                <span>•</span>
                <a
                  href="mailto:info@catagil.com"
                  className="hover:text-blue-500 flex items-center gap-1 transition-colors"
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span>Contact</span>
                </a>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={handleTour}
                  className="w-full sm:w-auto flex items-center justify-center gap-1.5 py-2 px-4 rounded-full border border-blue-500/40 text-blue-500 hover:bg-blue-500/10 text-xs font-semibold transition-colors"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Interactive Tour (EN)</span>
                </button>

                <button
                  onClick={() => handleAction('all')}
                  className="apple-button w-full sm:w-auto flex items-center justify-center gap-2 py-2 px-5 text-xs font-semibold"
                >
                  <Sliders className="h-3.5 w-3.5" />
                  <span>Explore Cockpit</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
