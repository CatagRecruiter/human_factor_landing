import React from 'react';
import { 
  ShieldCheck, 
  Layers, 
  Zap, 
  XCircle, 
  CheckCircle2, 
  TrendingUp, 
  Clock, 
  Users, 
  Scale 
} from 'lucide-react';
import { CASE_STUDIES_DATA } from '../lib/dataContent';

export const TalentScienceOverview: React.FC = () => {
  return (
    <section id="talent-science" className="space-y-8 scroll-mt-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--apple-border)] pb-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-500 font-mono text-[11px] font-bold border border-blue-500/20">
            METHODOLOGY &amp; COMPARISON
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--apple-text-primary)] mt-1">
            Intuition vs. Predictive Science
          </h2>
        </div>
        <span className="text-xs text-[var(--apple-text-secondary)] font-medium">
          Eliminating subjective bias through applied psychometrics
        </span>
      </div>

      {/* Side-by-Side Visual Comparison (Before vs After) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Pain / Traditional Approach */}
        <div className="p-5 sm:p-6 rounded-2xl bg-red-500/5 border border-red-500/20 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-red-500/15">
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-bold text-sm">
              <XCircle className="h-4 w-4 shrink-0" />
              <span>Traditional Hiring ("Vibe Checks")</span>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-red-500/10 text-red-500 border border-red-500/20">
              HIGH RISK
            </span>
          </div>

          <ul className="space-y-2.5 text-xs text-[var(--apple-text-secondary)]">
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold mt-0.5">•</span>
              <span><strong>Affinity-based evaluation:</strong> Unstructured questions that reward conversational charisma over proven on-the-job capability.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold mt-0.5">•</span>
              <span><strong>&gt; 35% panel inter-rater disagreement:</strong> Each interviewer evaluates candidates against subjective personal standards.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold mt-0.5">•</span>
              <span><strong>4-6 week interview cycles:</strong> Repetitive redundant rounds that exhaust engineers and drive high candidate drop-off.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold mt-0.5">•</span>
              <span><strong>Costly early attrition:</strong> 1 in 5 technical hires underperforms or churns within the first 90 days.</span>
            </li>
          </ul>
        </div>

        {/* Solution / Talent Science Approach */}
        <div className="p-5 sm:p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-emerald-500/15">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>Talent Science (Evidence &amp; BARS)</span>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              AUDITABLE
            </span>
          </div>

          <ul className="space-y-2.5 text-xs text-[var(--apple-text-secondary)]">
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold mt-0.5">•</span>
              <span><strong>1-3-5 BARS Rubrics:</strong> Standardized, observable behaviors instead of ambiguous personal impressions.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold mt-0.5">•</span>
              <span><strong>24-Hour panel consensus:</strong> Unified scoring criteria enabling fast, mathematically calibrated decisions.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold mt-0.5">•</span>
              <span><strong>50% reduction in rounds:</strong> Drastically cuts engineering hours burned while accelerating time-to-offer.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold mt-0.5">•</span>
              <span><strong>Direct business alignment:</strong> Verifiable correlation between interview assessment and real production output.</span>
            </li>
          </ul>
        </div>

      </div>

      {/* 3 Core Pillars Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-xl bg-[var(--apple-surface)] border border-[var(--apple-border)] space-y-1">
          <div className="flex items-center gap-2 font-bold text-xs text-[var(--apple-text-primary)]">
            <Layers className="h-4 w-4 text-blue-500" />
            <span>1. Calibrated BARS Scales</span>
          </div>
          <p className="text-[11px] text-[var(--apple-text-secondary)]">
            Objective ratings anchored to verifiable workplace actions and critical incidents.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[var(--apple-surface)] border border-[var(--apple-border)] space-y-1">
          <div className="flex items-center gap-2 font-bold text-xs text-[var(--apple-text-primary)]">
            <Zap className="h-4 w-4 text-amber-500" />
            <span>2. n8n Automation</span>
          </div>
          <p className="text-[11px] text-[var(--apple-text-secondary)]">
            Frictionless event-driven workflows closing candidate feedback loops in under 24 hours.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[var(--apple-surface)] border border-[var(--apple-border)] space-y-1">
          <div className="flex items-center gap-2 font-bold text-xs text-[var(--apple-text-primary)]">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            <span>3. P&amp;L Margin Protection</span>
          </div>
          <p className="text-[11px] text-[var(--apple-text-secondary)]">
            Eliminates high external agency fees and developer burnout during technical panels.
          </p>
        </div>
      </div>

      {/* Case Studies Strip */}
      <div className="apple-card p-5 sm:p-6 space-y-3">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[var(--apple-text-primary)] font-mono border-b border-[var(--apple-border)] pb-2.5">
          <span className="flex items-center gap-1.5">
            <TrendingUp className="h-4 w-4 text-blue-500" />
            Production Case Studies
          </span>
          <span className="text-[10px] text-[var(--apple-text-tertiary)]">VERIFIED</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CASE_STUDIES_DATA.map((cs) => (
            <div key={cs.id} className="p-4 rounded-xl bg-[var(--apple-surface-secondary)] border border-[var(--apple-border)] space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400">{cs.clientType}</span>
                <span className="text-[10px] font-mono text-[var(--apple-text-tertiary)]">{cs.market}</span>
              </div>
              
              <div className="text-xs text-[var(--apple-text-secondary)] space-y-1">
                <p><strong>Challenge:</strong> {cs.problem}</p>
                <p><strong>Solution:</strong> {cs.solution}</p>
              </div>

              <div className="pt-2 border-t border-[var(--apple-border)] grid grid-cols-3 gap-2">
                {cs.metrics.map((m, mIdx) => (
                  <div key={mIdx} className="p-2 rounded-lg bg-[var(--apple-surface)] border border-[var(--apple-border)] text-center">
                    <div className="text-xs font-black text-emerald-600 dark:text-emerald-400 font-mono">{m.value}</div>
                    <div className="text-[9px] text-[var(--apple-text-secondary)] leading-tight mt-0.5">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
