import React, { useState } from 'react';
import { DollarSign, Clock, Building2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { sound } from '../lib/sound';
import { TRANSLATIONS } from '../lib/translations';

interface Props {
  lang: 'en' | 'es';
}

export const InefficientInterviewingCalculator: React.FC<Props> = ({ lang }) => {
  const t = TRANSLATIONS[lang].calculator;

  // Input parameters
  const [panelEngineers, setPanelEngineers] = useState(4);
  const [candidatesPerHire, setCandidatesPerHire] = useState(6);
  const [annualHires, setAnnualHires] = useState(12);
  const [engineerHourlyRate] = useState(95);
  const [relyOnAgenciesPct, setRelyOnAgenciesPct] = useState(50);
  const avgSalary = 85000;
  const agencyFeePct = 20;
  const roundsPerCandidate = 4;

  // Calculations
  const hoursPerCandidate = panelEngineers * 1.0 * (roundsPerCandidate * 0.75);
  const totalInterviewHoursPerHire = Math.round(hoursPerCandidate * candidatesPerHire);
  const annualInternalEngineeringCost = Math.round(totalInterviewHoursPerHire * engineerHourlyRate * annualHires);

  const agencyHiresCount = Math.round(annualHires * (relyOnAgenciesPct / 100));
  const annualAgencyFees = Math.round(agencyHiresCount * avgSalary * (agencyFeePct / 100));

  const operationalDisruptionCost = Math.round(annualHires * 4500);

  const totalAnnualInefficiencyCost = annualInternalEngineeringCost + annualAgencyFees + operationalDisruptionCost;

  const calibratedHoursPerHire = Math.round((2 * 1.0 * 1.5) * 3);
  const calibratedEngineeringCost = Math.round(calibratedHoursPerHire * engineerHourlyRate * annualHires);
  const calibratedAgencyFees = Math.round(annualAgencyFees * 0.35);
  const calibratedTotalCost = calibratedEngineeringCost + calibratedAgencyFees + Math.round(operationalDisruptionCost * 0.2);
  const netEstimatedSavings = Math.max(0, totalAnnualInefficiencyCost - calibratedTotalCost);

  return (
    <section id="interview-cost" className="apple-card p-6 sm:p-10 space-y-8 scroll-mt-24">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--apple-border)] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-600 font-mono text-[11px] font-bold border border-red-500/20">
              {t.badge}
            </span>
            <span className="text-xs text-[var(--apple-text-tertiary)] font-medium">
              {t.subBadge}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-[var(--apple-text-primary)]">
            {t.title}
          </h2>
        </div>
        <span className="text-xs text-[var(--apple-text-secondary)] font-medium">
          {t.subtitle}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sliders Console */}
        <div className="lg:col-span-6 space-y-5 bg-[var(--apple-surface-secondary)] p-6 rounded-2xl border border-[var(--apple-border)]">
          <div className="text-xs font-bold uppercase tracking-wider text-[var(--apple-text-primary)] mb-2">
            {lang === 'es' ? 'Parámetros del Comité y Proceso:' : 'Panel & Workflow Parameters:'}
          </div>

          <div>
            <div className="flex justify-between text-xs font-medium mb-1.5">
              <span className="text-[var(--apple-text-primary)] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-purple-600" /> {t.panelEngineers}:
              </span>
              <span className="text-purple-700 font-bold">{panelEngineers}</span>
            </div>
            <input
              type="range"
              min="1"
              max="8"
              value={panelEngineers}
              onChange={e => {
                setPanelEngineers(parseInt(e.target.value, 10));
                sound.playTone(380, 'sine', 0.02);
              }}
              className="w-full accent-purple-600 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-medium mb-1.5">
              <span className="text-[var(--apple-text-primary)] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-purple-600" /> {t.candidatesPerHire}:
              </span>
              <span className="text-purple-700 font-bold">{candidatesPerHire}</span>
            </div>
            <input
              type="range"
              min="2"
              max="15"
              value={candidatesPerHire}
              onChange={e => {
                setCandidatesPerHire(parseInt(e.target.value, 10));
                sound.playTone(380, 'sine', 0.02);
              }}
              className="w-full accent-purple-600 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-medium mb-1.5">
              <span className="text-[var(--apple-text-primary)] flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-purple-600" /> {t.annualHires}:
              </span>
              <span className="text-purple-700 font-bold">{annualHires}</span>
            </div>
            <input
              type="range"
              min="2"
              max="50"
              value={annualHires}
              onChange={e => {
                setAnnualHires(parseInt(e.target.value, 10));
                sound.playTone(380, 'sine', 0.02);
              }}
              className="w-full accent-purple-600 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-medium mb-1.5">
              <span className="text-[var(--apple-text-primary)] flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-amber-500" /> {t.relyAgencies}:
              </span>
              <span className="text-amber-500 font-bold">{relyOnAgenciesPct}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={relyOnAgenciesPct}
              onChange={e => {
                setRelyOnAgenciesPct(parseInt(e.target.value, 10));
                sound.playTone(380, 'sine', 0.02);
              }}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Breakdown Output by Business Areas */}
        <div className="lg:col-span-6 space-y-4">
          <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-6 space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-red-600 font-bold flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4" /> {t.annualWasteTitle}:
            </span>
            <div className="text-4xl sm:text-5xl font-extrabold text-[var(--apple-text-primary)] tracking-tight font-mono">
              ${totalAnnualInefficiencyCost.toLocaleString()}
            </div>
            <p className="text-xs text-[var(--apple-text-secondary)]">
              {t.annualWasteSub}
            </p>
          </div>

          {/* Area Impact Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl border border-[var(--apple-border)] bg-[var(--apple-surface)] space-y-1">
              <span className="text-[10px] uppercase font-bold text-[var(--apple-text-tertiary)] block">
                {t.hoursBurnedTitle}
              </span>
              <div className="font-mono text-base font-bold text-red-600">
                ${annualInternalEngineeringCost.toLocaleString()}
              </div>
              <p className="text-[11px] text-[var(--apple-text-secondary)]">
                {totalInterviewHoursPerHire * annualHires} {lang === 'es' ? 'horas consumidas en debates de comités no calibrados.' : 'total hours burned in uncalibrated panel debates.'}
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-[var(--apple-border)] bg-[var(--apple-surface)] space-y-1">
              <span className="text-[10px] uppercase font-bold text-[var(--apple-text-tertiary)] block">
                {t.agencyFeesTitle}
              </span>
              <div className="font-mono text-base font-bold text-amber-500">
                ${annualAgencyFees.toLocaleString()}
              </div>
              <p className="text-[11px] text-[var(--apple-text-secondary)]">
                {t.agencyFeesSub}
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-[var(--apple-border)] bg-[var(--apple-surface)] space-y-1">
              <span className="text-[10px] uppercase font-bold text-[var(--apple-text-tertiary)] block">
                {lang === 'es' ? 'Fricción Operativa' : 'Opportunity Drag'}
              </span>
              <div className="font-mono text-base font-bold text-purple-700">
                ${operationalDisruptionCost.toLocaleString()}
              </div>
              <p className="text-[11px] text-[var(--apple-text-secondary)]">
                {lang === 'es' ? 'Retrasos en proyectos por ciclos de contratación de más de 4 semanas.' : 'Project delays caused by prolonged 4+ week time-to-hire cycles.'}
              </p>
            </div>
          </div>

          {/* Calibrated Model Comparison */}
          <div className="p-4 rounded-xl border border-cyan-500/30 bg-cyan-500/10 flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-800">
                <ShieldCheck className="h-4 w-4 text-cyan-600" />
                <span>{t.savingsTitle}:</span>
              </div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-[var(--apple-text-primary)] mt-0.5">
                ${netEstimatedSavings.toLocaleString()} {lang === 'es' ? '/ año' : '/ year'}
              </div>
            </div>
            <div className="text-right text-xs text-[var(--apple-text-secondary)] hidden sm:block">
              {t.savingsSub}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
