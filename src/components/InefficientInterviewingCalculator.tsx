import React, { useState } from 'react';
import { motion } from 'motion/react';
import { DollarSign, Clock, Building2, AlertTriangle, ArrowRight, ShieldCheck, TrendingDown } from 'lucide-react';
import { sound } from '../lib/sound';

export const InefficientInterviewingCalculator: React.FC = () => {
  // Input parameters
  const [panelEngineers, setPanelEngineers] = useState(4);
  const [roundsPerCandidate, setRoundsPerCandidate] = useState(4);
  const [candidatesPerHire, setCandidatesPerHire] = useState(6);
  const [engineerHourlyRate, setEngineerHourlyRate] = useState(95);
  const [annualHires, setAnnualHires] = useState(12);
  const [agencyFeePct, setAgencyFeePct] = useState(20);
  const [avgSalary, setAvgSalary] = useState(85000);
  const [relyOnAgenciesPct, setRelyOnAgenciesPct] = useState(50); // % of hires outsourced

  // Calculations
  // 1. Engineering hours burned per hire in uncalibrated panels
  const hoursPerCandidate = panelEngineers * 1.0 * (roundsPerCandidate * 0.75); // 0.75h per round avg
  const totalInterviewHoursPerHire = Math.round(hoursPerCandidate * candidatesPerHire);
  const annualInternalEngineeringCost = Math.round(totalInterviewHoursPerHire * engineerHourlyRate * annualHires);

  // 2. External agency spend due to uncalibrated internal sourcing / low offer acceptance
  const agencyHiresCount = Math.round(annualHires * (relyOnAgenciesPct / 100));
  const annualAgencyFees = Math.round(agencyHiresCount * avgSalary * (agencyFeePct / 100));

  // 3. Operational drag & candidate loss from prolonged feedback loops
  const operationalDisruptionCost = Math.round(annualHires * 4500); // Onboarding delays & candidate ghosting

  // Total annual waste
  const totalAnnualInefficiencyCost = annualInternalEngineeringCost + annualAgencyFees + operationalDisruptionCost;

  // With Talent Science BARS & Calibrated loops:
  // - Rounds drop from 4 to 2 (consensus reached in 24h)
  // - Candidates per hire drops from 6 to 3
  // - Agency dependency drops by 60%
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
            <span className="px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-500 font-mono text-[11px] font-bold border border-red-500/20">
              AUDIT CALCULATOR
            </span>
            <span className="text-xs text-[var(--apple-text-tertiary)] font-medium">
              Internal Engineering Hours &amp; Agency Spend Analysis
            </span>
          </div>
          <h2 className="text-2xl font-bold text-[var(--apple-text-primary)]">
            Cost of Uncalibrated Interviewing
          </h2>
        </div>
        <span className="text-xs text-[var(--apple-text-secondary)] font-medium">
          Stress-test the hidden engineering and agency tax on your hiring pipeline
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sliders Console */}
        <div className="lg:col-span-6 space-y-5 bg-[var(--apple-surface-secondary)] p-6 rounded-2xl border border-[var(--apple-border)]">
          <div className="text-xs font-bold uppercase tracking-wider text-[var(--apple-text-primary)] mb-2">
            Panel & Workflow Parameters:
          </div>

          <div>
            <div className="flex justify-between text-xs font-medium mb-1.5">
              <span className="text-[var(--apple-text-primary)] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-500" /> Interviewers per Panel:
              </span>
              <span className="text-blue-500 font-bold">{panelEngineers} Interviewers</span>
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
              className="w-full accent-blue-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-medium mb-1.5">
              <span className="text-[var(--apple-text-primary)] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-500" /> Candidates Screened per Closed Hire:
              </span>
              <span className="text-blue-500 font-bold">{candidatesPerHire} Candidates</span>
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
              className="w-full accent-blue-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-medium mb-1.5">
              <span className="text-[var(--apple-text-primary)] flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-blue-500" /> Annual Target Hires:
              </span>
              <span className="text-blue-500 font-bold">{annualHires} Hires / year</span>
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
              className="w-full accent-blue-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-medium mb-1.5">
              <span className="text-[var(--apple-text-primary)] flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-amber-500" /> Reliance on Headhunter Agencies:
              </span>
              <span className="text-amber-500 font-bold">{relyOnAgenciesPct}% of vacancies</span>
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
            <span className="text-[11px] font-mono uppercase tracking-wider text-red-500 font-bold flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4" /> Total Annual Pipeline Inefficiency Cost:
            </span>
            <div className="text-4xl sm:text-5xl font-extrabold text-[var(--apple-text-primary)] tracking-tight font-mono">
              ${totalAnnualInefficiencyCost.toLocaleString()}
            </div>
            <p className="text-xs text-[var(--apple-text-secondary)]">
              Money and senior team bandwidth quietly lost across engineering, agency invoices, and cycle latency.
            </p>
          </div>

          {/* Area Impact Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl border border-[var(--apple-border)] bg-[var(--apple-surface)] space-y-1">
              <span className="text-[10px] uppercase font-bold text-[var(--apple-text-tertiary)] block">
                Engineering Bandwidth
              </span>
              <div className="font-mono text-base font-bold text-red-500">
                ${annualInternalEngineeringCost.toLocaleString()}
              </div>
              <p className="text-[11px] text-[var(--apple-text-secondary)]">
                {totalInterviewHoursPerHire * annualHires} total hours burned in uncalibrated panel debates.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-[var(--apple-border)] bg-[var(--apple-surface)] space-y-1">
              <span className="text-[10px] uppercase font-bold text-[var(--apple-text-tertiary)] block">
                Agency Headhunter Fees
              </span>
              <div className="font-mono text-base font-bold text-amber-500">
                ${annualAgencyFees.toLocaleString()}
              </div>
              <p className="text-[11px] text-[var(--apple-text-secondary)]">
                External search spend triggered by low internal candidate closing rates.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-[var(--apple-border)] bg-[var(--apple-surface)] space-y-1">
              <span className="text-[10px] uppercase font-bold text-[var(--apple-text-tertiary)] block">
                Opportunity Drag
              </span>
              <div className="font-mono text-base font-bold text-blue-500">
                ${operationalDisruptionCost.toLocaleString()}
              </div>
              <p className="text-[11px] text-[var(--apple-text-secondary)]">
                Project delays caused by prolonged 4+ week time-to-hire cycles.
              </p>
            </div>
          </div>

          {/* Calibrated Model Comparison */}
          <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                <ShieldCheck className="h-4 w-4" />
                <span>Recoverable with Talent Science (BARS):</span>
              </div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-[var(--apple-text-primary)] mt-0.5">
                ${netEstimatedSavings.toLocaleString()} / year
              </div>
            </div>
            <div className="text-right text-xs text-[var(--apple-text-secondary)] hidden sm:block">
              Panel consensus in 24h <br />-60% candidate churn
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
