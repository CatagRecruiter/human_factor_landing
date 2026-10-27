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
  FileSpreadsheet
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

const TOUR_STEPS_EN: TourStep[] = [
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
    title: 'Cost of Inefficient Interviewing Audit',
    targetDescription: 'SHRM / Harvard Business Review Cost Engine',
    explanation: 'A bad hire costs far more than lost salary. This engine models the hidden cost vectors: recruiting fees, wasted onboarding ramp-up, team disruption, and lost opportunity cost.',
    howToUse: 'Drag the sliders to stress-test your organization’s exposure and see net savings with structured screening.',
    icon: ShieldAlert,
    tabTarget: 'calculator',
  },
  {
    id: 'export-lead',
    badge: '05 / ACTIONABLE OUTPUT',
    title: 'Scorecard Export & Next Steps',
    targetDescription: 'ATS Integration & Booking',
    explanation: 'The entire evaluation can be exported as a clean Markdown or PDF scorecard formatted for Greenhouse, Ashby, Lever, or Notion.',
    howToUse: 'Click "Export PDF" to download candidate comparisons, or "Book 15m" to calibrate your hiring team’s assessment infrastructure with Catalina Gil.',
    icon: FileSpreadsheet,
    tabTarget: 'all',
  },
];

const TOUR_STEPS_ES: TourStep[] = [
  {
    id: 'intro',
    badge: '01 / INTRODUCCIÓN',
    title: 'Por qué existe Talent Science',
    targetDescription: 'Ciencia Predictiva en Adquisición de Talento',
    explanation: 'La mayoría de fracasos en contrataciones técnicas provienen de evaluaciones por afinidad y entrevistas no estructuradas. Esta plataforma reemplaza la intuición con psicometría basada en evidencia y modelos financieros cuantificables.',
    howToUse: 'Usa este cockpit para evaluar candidatos con rúbricas conductuales objetivas (BARS) y auditar el impacto en resultados operativos.',
    icon: Sparkles,
    tabTarget: 'all',
  },
  {
    id: 'bars-rubric',
    badge: '02 / MÓDULO 1',
    title: 'Herramienta de Análisis y Rúbricas BARS',
    targetDescription: 'Escalas de Calificación con Anclaje Conductual (1-3-5)',
    explanation: 'En lugar de estrellas o impresiones subjetivas, cada competencia se ancla a comportamientos observables: Nivel 1 (Insuficiente), Nivel 3 (Estándar de Puesto), y Nivel 5 (Autónomo / Excepcional).',
    howToUse: 'Ajusta los ponderadores para reflejar las prioridades del rol, o usa el balance automático al 100%.',
    icon: Target,
    tabTarget: 'converter',
  },
  {
    id: 'activity-ring',
    badge: '03 / MÉTRICAS',
    title: 'Porcentaje de Ajuste y Veredicto Dinámico',
    targetDescription: 'Motor de Recomendación Matemática',
    explanation: 'El sistema calcula en tiempo real el porcentaje de ajuste ponderado mapeado a un protocolo riguroso: CONTRATAR (≥80%), CALIBRAR (50-79%), o NO PROCEDER (<50%).',
    howToUse: 'Una vez calificado, guarda el candidato en la Arena para compararlo con el resto del grupo evaluado.',
    icon: Trophy,
    tabTarget: 'converter',
  },
  {
    id: 'pnl-simulator',
    badge: '04 / MÓDULO 2',
    title: 'Auditoría de Ineficiencia y Costos Ocultos',
    targetDescription: 'Modelo Financiero de Impacto Operativo',
    explanation: 'Una contratación errada cuesta mucho más que un salario. Este simulador calcula horas de ingeniería quemadas en comités no calibrados y tarifas evitables de agencias.',
    howToUse: 'Desplaza los controles para calcular el impacto financiero anual y proyectar los ahorros recuperables.',
    icon: ShieldAlert,
    tabTarget: 'calculator',
  },
  {
    id: 'export-lead',
    badge: '05 / CONCLUSIÓN',
    title: 'Exportación de Reportes y Agenda',
    targetDescription: 'Integración con ATS y Diagnóstico',
    explanation: 'La evaluación completa se puede exportar en PDF ejecutivo para comités técnicos o directores de ingeniería.',
    howToUse: 'Haz clic en "Descargar PDF" para obtener la comparativa, o "Agendar 15m" para una sesión de calibración con Catalina Gil.',
    icon: FileSpreadsheet,
    tabTarget: 'all',
  },
];

interface GuidedTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: 'en' | 'es';
  onSwitchTab?: (tab: 'all' | 'converter' | 'calculator') => void;
}

export const GuidedTourModal: React.FC<GuidedTourModalProps> = ({
  isOpen,
  onClose,
  lang = 'en',
  onSwitchTab,
}) => {
  const [currentStepIdx, setCurrentStepIdx] = React.useState(0);
  const steps = lang === 'es' ? TOUR_STEPS_ES : TOUR_STEPS_EN;

  const step = steps[currentStepIdx] || steps[0];
  const IconComponent = step.icon;

  const handleNext = () => {
    sound.playTone(560, 'sine', 0.05);
    if (currentStepIdx < steps.length - 1) {
      const nextIdx = currentStepIdx + 1;
      setCurrentStepIdx(nextIdx);
      if (onSwitchTab && steps[nextIdx].tabTarget) {
        onSwitchTab(steps[nextIdx].tabTarget!);
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
      if (onSwitchTab && steps[prevIdx].tabTarget) {
        onSwitchTab(steps[prevIdx].tabTarget!);
      }
    }
  };

  const handleComplete = () => {
    sound.playChord();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative w-full max-w-lg rounded-3xl border border-[var(--apple-border)] bg-[var(--apple-surface)]/95 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl text-[var(--apple-text-primary)] space-y-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[var(--apple-border)] pb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-purple-700 bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/20">
                  {step.badge}
                </span>
                <span className="text-xs text-[var(--apple-text-tertiary)]">
                  {lang === 'es' ? 'Paso' : 'Step'} {currentStepIdx + 1} / {steps.length}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-full text-[var(--apple-text-tertiary)] hover:bg-[var(--apple-hover)] hover:text-[var(--apple-text-primary)] cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-purple-500/10 text-purple-700 border border-purple-500/20">
                  <IconComponent className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[var(--apple-text-primary)]">
                    {step.title}
                  </h3>
                  <p className="text-xs text-purple-700 font-medium">
                    {step.targetDescription}
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[var(--apple-text-secondary)] leading-relaxed">
                {step.explanation}
              </p>

              <div className="p-3.5 rounded-xl bg-[var(--apple-surface-secondary)] border border-[var(--apple-border)] text-xs text-[var(--apple-text-secondary)] space-y-1">
                <div className="font-semibold text-[var(--apple-text-primary)]">
                  {lang === 'es' ? 'Cómo utilizarlo:' : 'How to use:'}
                </div>
                <p>{step.howToUse}</p>
              </div>
            </div>

            {/* Stepper Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-[var(--apple-border)]">
              <button
                onClick={handlePrev}
                disabled={currentStepIdx === 0}
                className={`flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-xl transition-all ${
                  currentStepIdx === 0
                    ? 'opacity-30 cursor-not-allowed text-[var(--apple-text-tertiary)]'
                    : 'text-[var(--apple-text-secondary)] hover:text-[var(--apple-text-primary)] hover:bg-[var(--apple-hover)] cursor-pointer'
                }`}
              >
                <ChevronLeft className="h-4 w-4" />
                <span>{lang === 'es' ? 'Anterior' : 'Previous'}</span>
              </button>

              {/* Dot Indicators */}
              <div className="flex items-center gap-1.5">
                {steps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentStepIdx(i)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      i === currentStepIdx ? 'w-5 bg-purple-600' : 'w-1.5 bg-[var(--apple-border)]'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="apple-button flex items-center gap-1 text-xs py-1.5 px-4 font-semibold shadow-sm cursor-pointer"
              >
                <span>{currentStepIdx === steps.length - 1 ? (lang === 'es' ? 'Comenzar' : 'Get Started') : (lang === 'es' ? 'Siguiente' : 'Next')}</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
