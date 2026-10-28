import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Sliders, 
  Trash2, 
  Download, 
  UserPlus, 
  Users, 
  Scale,
  Calendar,
  ArrowRight
} from 'lucide-react';
import { SkillCriterion, CandidateEntry, calculateFit } from '../lib/engine';
import { CALIBRATION_QUESTIONS, extractDimensionsFromJD } from '../lib/jdAnalyzer';
import { generateComparisonPDF } from '../lib/pdfReport';
import { sound } from '../lib/sound';
import { TRANSLATIONS } from '../lib/translations';

interface Props {
  lang: 'en' | 'es';
  onShowToast: (msg: string) => void;
}

export const InterviewAnalysisTool: React.FC<Props> = ({ lang, onShowToast }) => {
  const t = TRANSLATIONS[lang].tool;

  // Step 1: Job Description Input & Calibration State
  const [jobTitle, setJobTitle] = useState(lang === 'es' ? 'Ingeniero Senior de Sistemas Distribuidos' : 'Senior Distributed Systems Engineer');
  const [department, setDepartment] = useState(lang === 'es' ? 'Ingeniería Central' : 'Core Engineering');
  const [jdText, setJdText] = useState(
    lang === 'es'
      ? 'Buscamos un Ingeniero Senior con sólida experiencia en servicios backend de alto rendimiento, migraciones de bases de datos sin tiempo de inactividad y resolución autónoma de incidentes en producción.'
      : 'We are looking for a Senior Engineer with deep experience in high-throughput backend services, zero-downtime database migrations, and autonomous problem-solving under production incidents.'
  );
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [calibrationAnswers, setCalibrationAnswers] = useState<Record<string, string>>({
    autonomy: 'Production Resilience / Deep Specialist',
    risk: 'Production Downtime & SLA Breach',
  });

  // Step 2: Criteria & BARS Rubric State
  const [criteria, setCriteria] = useState<SkillCriterion[]>(() =>
    extractDimensionsFromJD(jobTitle, jdText, calibrationAnswers)
  );

  // Step 3: Multi-Candidate Evaluation State
  const [candidates, setCandidates] = useState<CandidateEntry[]>([
    { name: 'Alex Rivera', score: 4.70, fit: 92.5, status: 'HIRE', color: 'var(--apple-green)' },
    { name: 'Jordan Lee', score: 3.80, fit: 70.0, status: 'CALIBRATE', color: 'var(--apple-amber)' },
    { name: 'Taylor Smith', score: 2.30, fit: 32.5, status: 'PASS', color: 'var(--apple-red)' },
  ]);

  const [activeCandidateName, setActiveCandidateName] = useState(lang === 'es' ? 'Camilo Gómez' : 'Sam Patel');
  const [mobileTab, setMobileTab] = useState<'rubrics' | 'arena'>('rubrics');

  // Real-time calculation of current criteria
  const currentFitResults = calculateFit(criteria);

  // Handler: Run Calibration & generate dimensions
  const handleCalibrateDimensions = () => {
    sound.playChord();
    const generated = extractDimensionsFromJD(jobTitle, jdText, calibrationAnswers);
    setCriteria(generated);
    setIsCalibrating(false);
    onShowToast(lang === 'es' ? `¡Se generaron ${generated.length} dimensiones BARS calibradas!` : `Generated ${generated.length} BARS dimensions from Job Description!`);
  };

  // Handler: Update score for active evaluation
  const updateCriterionScore = (index: number, score: number) => {
    const next = [...criteria];
    next[index].score = score;
    setCriteria(next);
    sound.playTone(400 + score * 80, 'sine', 0.05);
  };

  // Handler: Auto-balance weights
  const autoBalanceWeights = () => {
    sound.playTone(600, 'triangle');
    const equalWeight = Math.round(100 / criteria.length);
    const updated = criteria.map((c, i) => ({
      ...c,
      weight: i === criteria.length - 1 ? 100 - equalWeight * (criteria.length - 1) : equalWeight,
    }));
    setCriteria(updated);
    onShowToast(lang === 'es' ? 'Ponderaciones balanceadas al 100%' : 'Weights balanced to 100%');
  };

  // Handler: Save / Lock candidate to Arena
  const handleLockCandidate = () => {
    const name = activeCandidateName.trim() || (lang === 'es' ? `Candidato #${candidates.length + 1}` : `Candidate #${candidates.length + 1}`);
    const newEntry: CandidateEntry = {
      name,
      score: currentFitResults.rawScore,
      fit: currentFitResults.fitPct,
      status: currentFitResults.fitPct >= 80 ? 'HIRE' : currentFitResults.fitPct >= 50 ? 'CALIBRATE' : 'PASS',
      color: currentFitResults.fitPct >= 80 ? 'var(--apple-green)' : currentFitResults.fitPct >= 50 ? 'var(--apple-amber)' : 'var(--apple-red)',
    };

    setCandidates(prev => [newEntry, ...prev].sort((a, b) => b.fit - a.fit));
    setActiveCandidateName('');
    sound.playChord();
    onShowToast(lang === 'es' ? `Evaluado y guardado: ${name} (${currentFitResults.fitPct}%)` : `Evaluated & saved ${name} (${currentFitResults.fitPct}%)`);
  };

  // Handler: Download PDF Report
  const handleDownloadPDF = () => {
    sound.playChord();
    generateComparisonPDF({
      jobTitle,
      department,
      date: new Date().toLocaleDateString(lang === 'es' ? 'es-CO' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      criteria,
      candidates,
    });
    onShowToast(lang === 'es' ? '¡Reporte PDF generado y descargado!' : 'PDF report generated and downloaded!');
  };

  return (
    <section id="interview-tool" className="space-y-8 scroll-mt-24">
      {/* Module Title Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[var(--apple-border)] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-700 font-mono text-[11px] font-bold border border-purple-500/20">
              {t.badge}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--apple-text-primary)]">
            {t.title}
          </h2>
          <p className="text-xs sm:text-sm text-[var(--apple-text-secondary)] mt-1 max-w-2xl">
            {t.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCalibrating(prev => !prev)}
            className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2.5 rounded-xl border border-[var(--apple-border)] bg-[var(--apple-surface)] hover:bg-[var(--apple-hover)] text-[var(--apple-text-primary)] transition-all shadow-sm cursor-pointer"
          >
            <Sliders className="h-4 w-4 text-purple-600" />
            <span>{isCalibrating ? (lang === 'es' ? 'Cerrar Calibración' : 'Close Calibration') : (lang === 'es' ? 'Calibrar Vacante' : 'Calibrate Job Description')}</span>
          </button>

          <button
            onClick={handleDownloadPDF}
            className="apple-button flex items-center gap-1.5 text-xs py-2.5 px-4 font-semibold shadow-sm cursor-pointer"
          >
            <Download className="h-4 w-4" />
            <span>{t.downloadPdfBtn}</span>
          </button>
        </div>
      </div>

      {/* Calibration Panel (Expandable) */}
      <AnimatePresence>
        {isCalibrating && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="rounded-2xl border border-purple-500/30 bg-purple-500/5 p-6 space-y-6 overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                <h3 className="font-bold text-sm sm:text-base text-[var(--apple-text-primary)]">
                  {lang === 'es' ? 'Asistente de Calibración de Vacante' : 'Job Description Calibration Assistant'}
                </h3>
              </div>
              <span className="text-xs text-[var(--apple-text-tertiary)]">
                {lang === 'es' ? 'Paso 1: Requerimientos del puesto' : 'Step 1 of 2: Set role requirements'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[var(--apple-text-primary)] mb-1">
                  {t.jobTitleLabel}
                </label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={e => setJobTitle(e.target.value)}
                  className="w-full text-xs rounded-xl border border-[var(--apple-border)] bg-[var(--apple-surface)] px-3.5 py-2.5 text-[var(--apple-text-primary)] focus:outline-none focus:border-purple-600"
                  placeholder="e.g. Lead SRE / Senior Product Manager"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[var(--apple-text-primary)] mb-1">
                  {t.deptLabel}
                </label>
                <input
                  type="text"
                  value={department}
                  onChange={e => setDepartment(e.target.value)}
                  className="w-full text-xs rounded-xl border border-[var(--apple-border)] bg-[var(--apple-surface)] px-3.5 py-2.5 text-[var(--apple-text-primary)] focus:outline-none focus:border-purple-600"
                  placeholder="e.g. Infrastructure & Cloud Security"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--apple-text-primary)] mb-1">
                {t.jdLabel}
              </label>
              <textarea
                rows={3}
                value={jdText}
                onChange={e => setJdText(e.target.value)}
                className="w-full text-xs rounded-xl border border-[var(--apple-border)] bg-[var(--apple-surface)] p-3 text-[var(--apple-text-primary)] focus:outline-none focus:border-purple-600 leading-relaxed font-mono"
                placeholder="Paste key responsibilities or required competencies..."
              />
            </div>

            {/* Calibration Questions */}
            <div className="space-y-4 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--apple-text-primary)]">
                {lang === 'es' ? 'Dimensiones de Calibración:' : 'Calibration Dimensions:'}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {CALIBRATION_QUESTIONS.map(q => (
                  <div key={q.id} className="space-y-2">
                    <p className="text-xs font-semibold text-[var(--apple-text-primary)]">
                      {q.question}
                    </p>
                    <div className="space-y-1.5">
                      {q.options.map(opt => (
                        <button
                          key={opt.label}
                          onClick={() => setCalibrationAnswers(prev => ({ ...prev, [q.id]: opt.label }))}
                          className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all cursor-pointer ${
                            calibrationAnswers[q.id] === opt.label
                              ? 'border-purple-600 bg-purple-500/10 text-[var(--apple-text-primary)] shadow-sm'
                              : 'border-[var(--apple-border)] bg-[var(--apple-surface)] text-[var(--apple-text-secondary)] hover:border-[var(--apple-border-hover)]'
                          }`}
                        >
                          <div className="font-semibold text-[var(--apple-text-primary)]">{opt.label}</div>
                          <div className="text-[11px] opacity-75 mt-0.5">{opt.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={handleCalibrateDimensions}
                className="apple-button flex items-center gap-2 text-xs py-2 px-5 font-semibold cursor-pointer"
              >
                <Sparkles className="h-4 w-4" />
                <span>{t.calibrateBtn}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Tab Stepper (< 1024px) */}
      <div className="flex lg:hidden items-center p-1 rounded-2xl bg-[var(--apple-surface-secondary)] border border-[var(--apple-border)] gap-1 shadow-2xs">
        <button
          onClick={() => {
            sound.playClick();
            setMobileTab('rubrics');
          }}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            mobileTab === 'rubrics'
              ? 'bg-purple-700 text-white shadow-xs'
              : 'text-[var(--apple-text-secondary)] hover:text-[var(--apple-text-primary)]'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>{lang === 'es' ? 'Rúbricas BARS' : 'BARS Rubrics'} ({criteria.length})</span>
        </button>
        <button
          onClick={() => {
            sound.playClick();
            setMobileTab('arena');
          }}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            mobileTab === 'arena'
              ? 'bg-purple-700 text-white shadow-xs'
              : 'text-[var(--apple-text-secondary)] hover:text-[var(--apple-text-primary)]'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>{lang === 'es' ? 'Arena y Fit' : 'Fit & Arena'} ({currentFitResults.fitPct}%)</span>
        </button>
      </div>

      {/* Main Evaluator Grid: 7 cols for Scorecard Rubrics, 5 cols for Live Ring & Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column: Criteria & Questions */}
        <div className={`apple-card p-5 sm:p-8 space-y-6 ${mobileTab === 'rubrics' ? 'block' : 'hidden'} lg:block lg:col-span-7`}>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--apple-border)] pb-4">
            <div>
              <span className="text-xs font-bold text-[var(--apple-text-primary)] uppercase tracking-wider block">
                {jobTitle}
              </span>
              <span className="text-xs text-[var(--apple-text-secondary)]">
                {criteria.length} {lang === 'es' ? 'Dimensiones Calibradas de Evaluación' : 'Calibrated Evaluation Dimensions'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold font-mono ${
                currentFitResults.totalWeight === 100
                  ? 'bg-cyan-500/10 text-cyan-700 border border-cyan-500/20'
                  : 'bg-amber-500/10 text-amber-600 border border-amber-500/20'
              }`}>
                {lang === 'es' ? 'Ponderación' : 'Weights'}: {currentFitResults.totalWeight}%
              </span>

              <button
                onClick={autoBalanceWeights}
                className="px-2.5 py-1 rounded-lg border border-[var(--apple-border)] bg-[var(--apple-surface)] text-xs font-semibold text-[var(--apple-text-primary)] hover:bg-[var(--apple-hover)] flex items-center gap-1 shadow-sm cursor-pointer"
                title={lang === 'es' ? 'Normalizar ponderaciones al 100%' : 'Normalize weights to 100%'}
              >
                <Scale className="h-3.5 w-3.5 text-purple-600" />
                <span>Balance 100%</span>
              </button>
            </div>
          </div>

          {/* Criteria Cards */}
          <div className="space-y-4">
            {criteria.map((c, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-[var(--apple-surface-secondary)] border border-[var(--apple-border)] space-y-3"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 flex-1">
                    <span className="w-5 h-5 rounded-md bg-[var(--apple-surface)] text-[var(--apple-text-primary)] text-xs font-bold flex items-center justify-center shrink-0 border border-[var(--apple-border)]">
                      {idx + 1}
                    </span>
                    <input
                      type="text"
                      value={c.name}
                      onChange={e => {
                        const next = [...criteria];
                        next[idx].name = e.target.value;
                        setCriteria(next);
                      }}
                      className="bg-transparent border-b border-transparent focus:border-purple-600 text-sm font-bold text-[var(--apple-text-primary)] w-full focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <input
                      type="range"
                      min="5"
                      max="70"
                      step="5"
                      value={c.weight}
                      onChange={e => {
                        const next = [...criteria];
                        next[idx].weight = parseInt(e.target.value, 10);
                        setCriteria(next);
                      }}
                      className="w-16 accent-purple-600 cursor-pointer"
                    />
                    <span className="font-mono text-xs font-bold text-[var(--apple-text-secondary)] w-9 text-right">
                      {c.weight}%
                    </span>
                  </div>
                </div>

                {/* Behavioral Probe */}
                <div className="text-xs text-[var(--apple-text-secondary)] bg-[var(--apple-surface)] px-3.5 py-2.5 rounded-xl border border-[var(--apple-border)] leading-relaxed italic">
                  "{c.q}"
                </div>

                {/* 1 - 3 - 5 Objective Anchors */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5">
                  <button
                    onClick={() => updateCriterionScore(idx, 1)}
                    className={`p-3 rounded-2xl border text-left transition-all active:scale-[0.97] cursor-pointer ${
                      c.score === 1
                        ? 'border-red-500 bg-red-500/10 text-red-600 font-semibold shadow-xs ring-1 ring-red-500/30'
                        : 'border-[var(--apple-border)] bg-[var(--apple-surface)] text-[var(--apple-text-secondary)] hover:border-[var(--apple-border-hover)] hover:bg-[var(--apple-surface-secondary)]'
                    }`}
                  >
                    <div className="font-bold text-[11px] uppercase tracking-wide flex items-center justify-between">
                      <span>{lang === 'es' ? '1: Insuficiente' : '1: Substandard'}</span>
                      {c.score === 1 && <span className="w-1.5 h-1.5 rounded-full bg-red-500" />}
                    </div>
                    <div className="text-[10px] opacity-80 mt-1 line-clamp-2 leading-relaxed">{c.s1}</div>
                  </button>

                  <button
                    onClick={() => updateCriterionScore(idx, 3)}
                    className={`p-3 rounded-2xl border text-left transition-all active:scale-[0.97] cursor-pointer ${
                      c.score === 3
                        ? 'border-amber-500 bg-amber-500/10 text-amber-600 font-semibold shadow-xs ring-1 ring-amber-500/30'
                        : 'border-[var(--apple-border)] bg-[var(--apple-surface)] text-[var(--apple-text-secondary)] hover:border-[var(--apple-border-hover)] hover:bg-[var(--apple-surface-secondary)]'
                    }`}
                  >
                    <div className="font-bold text-[11px] uppercase tracking-wide flex items-center justify-between">
                      <span>{lang === 'es' ? '3: Estándar' : '3: Standard Bar'}</span>
                      {c.score === 3 && <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />}
                    </div>
                    <div className="text-[10px] opacity-80 mt-1 line-clamp-2 leading-relaxed">{c.s3}</div>
                  </button>

                  <button
                    onClick={() => updateCriterionScore(idx, 5)}
                    className={`p-3 rounded-2xl border text-left transition-all active:scale-[0.97] cursor-pointer ${
                      c.score === 5
                        ? 'border-cyan-500 bg-cyan-500/10 text-cyan-700 font-semibold shadow-xs ring-1 ring-cyan-500/30'
                        : 'border-[var(--apple-border)] bg-[var(--apple-surface)] text-[var(--apple-text-secondary)] hover:border-[var(--apple-border-hover)] hover:bg-[var(--apple-surface-secondary)]'
                    }`}
                  >
                    <div className="font-bold text-[11px] uppercase tracking-wide flex items-center justify-between">
                      <span>{lang === 'es' ? '5: Autónomo' : '5: Autonomous'}</span>
                      {c.score === 5 && <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />}
                    </div>
                    <div className="text-[10px] opacity-80 mt-1 line-clamp-2 leading-relaxed">{c.s5}</div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Live Fit Ring + Multi-Candidate Arena */}
        <div className={`space-y-6 ${mobileTab === 'arena' ? 'block' : 'hidden'} lg:block lg:col-span-5`}>
          {/* Active Candidate Evaluation Card */}
          <div className="apple-card p-6 space-y-5 text-center">
            <div className="flex items-center justify-between border-b border-[var(--apple-border)] pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--apple-text-primary)]">
                {lang === 'es' ? 'Puntuación de Candidato Activo' : 'Active Candidate Scoring'}
              </span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                currentFitResults.fitPct >= 80
                  ? 'bg-cyan-500/10 text-cyan-700'
                  : currentFitResults.fitPct >= 50
                  ? 'bg-amber-500/10 text-amber-600'
                  : 'bg-red-500/10 text-red-600'
              }`}>
                {currentFitResults.fitPct >= 80 ? t.hireDecision : currentFitResults.fitPct >= 50 ? t.calibrateDecision : t.passDecision}
              </span>
            </div>

            {/* Input candidate name */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={activeCandidateName}
                onChange={e => setActiveCandidateName(e.target.value)}
                placeholder={t.candidateNamePlaceholder}
                className="w-full text-xs rounded-xl border border-[var(--apple-border)] bg-[var(--apple-surface)] px-3.5 py-2.5 text-[var(--apple-text-primary)] focus:outline-none focus:border-purple-600 font-semibold"
              />
            </div>

            {/* Big Circular Metric Indicator */}
            <div className="py-2">
              <div className="text-5xl font-extrabold text-[var(--apple-text-primary)] tracking-tight font-mono">
                {currentFitResults.fitPct}%
              </div>
              <div className="text-xs text-[var(--apple-text-tertiary)] font-medium mt-1">
                {lang === 'es' ? 'Puntaje Ponderado' : 'Composite Score'}: {currentFitResults.rawScore} / 5.0
              </div>
            </div>

            <button
              onClick={handleLockCandidate}
              className="apple-button w-full py-2.5 flex items-center justify-center gap-2 text-xs font-semibold shadow-md cursor-pointer"
            >
              <UserPlus className="h-4 w-4" />
              <span>{lang === 'es' ? 'Guardar y Comparar en Arena' : 'Save & Compare in Arena'}</span>
            </button>
          </div>

          {/* Comparative Candidate Arena */}
          <div className="apple-card p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--apple-border)] pb-3">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-purple-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--apple-text-primary)]">
                  {lang === 'es' ? `Arena de Candidatos (${candidates.length})` : `Candidate Arena (${candidates.length})`}
                </span>
              </div>
              <button
                onClick={handleDownloadPDF}
                className="text-xs font-semibold text-purple-600 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Download className="h-3 w-3" />
                <span>PDF Summary</span>
              </button>
            </div>

            <div className="space-y-2">
              {candidates.map((c, i) => (
                <div 
                  key={c.name} 
                  className="p-3 rounded-2xl bg-[var(--apple-surface-secondary)] border border-[var(--apple-border)] flex items-center justify-between text-xs transition-all hover:border-purple-400/50 shadow-2xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-[var(--apple-surface-solid)] text-[var(--apple-text-secondary)] font-bold font-mono flex items-center justify-center text-[10px] border border-[var(--apple-border)]">
                      #{i + 1}
                    </span>
                    <div>
                      <div className="font-bold text-[var(--apple-text-primary)]">{c.name}</div>
                      <div className="text-[10px] text-[var(--apple-text-tertiary)] font-mono">{lang === 'es' ? 'Puntaje' : 'Score'}: {c.score.toFixed(2)} / 5.0</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full font-bold font-mono text-xs ${
                      c.fit >= 80
                        ? 'bg-cyan-500/10 text-cyan-700 border border-cyan-500/20'
                        : c.fit >= 50
                        ? 'bg-amber-500/10 text-amber-600 border border-amber-500/20'
                        : 'bg-red-500/10 text-red-600 border border-red-500/20'
                    }`}>
                      {c.fit}%
                    </span>
                    <button
                      onClick={() => setCandidates(prev => prev.filter((_, idx) => idx !== i))}
                      className="text-[var(--apple-text-tertiary)] hover:text-red-500 p-1.5 rounded-lg hover:bg-red-500/10 transition-colors cursor-pointer"
                      title={lang === 'es' ? 'Eliminar candidato' : 'Remove candidate'}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Calibrate Hiring Committee CTA */}
          <div className="p-4 rounded-xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-blue-50 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
            <div className="space-y-0.5 text-left">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-1">
                <Scale className="w-3.5 h-3.5" />
                {lang === 'es' ? 'Despliega Rúbricas BARS en tu Equipo' : 'Deploy Calibrated BARS in Your Org'}
              </span>
              <p className="text-xs text-slate-700">
                {lang === 'es'
                  ? 'Entrena a tus entrevistadores técnicos para evaluar evidencia conductual sin sesgos.'
                  : 'Calibrate your interview panels to evaluate behavioral evidence and eradicate interviewer variance.'}
              </p>
            </div>
            <a
              href="https://cal.com/catalinagil"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-semibold shadow-xs hover:shadow transition-all shrink-0 cursor-pointer"
            >
              <span>{lang === 'es' ? 'Consultar con Catalina' : 'Work with Catalina'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
