import React from 'react';
import { 
  ShieldCheck, 
  Layers, 
  Zap, 
  XCircle, 
  CheckCircle2, 
  TrendingUp 
} from 'lucide-react';
import { TRANSLATIONS } from '../lib/translations';

interface Props {
  lang: 'en' | 'es';
}

export const TalentScienceOverview: React.FC<Props> = ({ lang }) => {
  const t = TRANSLATIONS[lang].overview;

  return (
    <section id="talent-science" className="space-y-8 scroll-mt-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--apple-border)] pb-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-700 font-mono text-[11px] font-bold border border-purple-500/20">
            {t.badge}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--apple-text-primary)] mt-1">
            {t.title}
          </h2>
        </div>
        <span className="text-xs text-[var(--apple-text-secondary)] font-medium">
          {t.subtitle}
        </span>
      </div>

      {/* Side-by-Side Visual Comparison (Before vs After) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Pain / Traditional Approach */}
        <div className="p-5 sm:p-6 rounded-2xl bg-red-500/5 border border-red-500/20 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-red-500/15">
            <div className="flex items-center gap-2 text-red-600 font-bold text-sm">
              <XCircle className="h-4 w-4 shrink-0" />
              <span>{t.traditionalTitle}</span>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-red-500/10 text-red-500 border border-red-500/20">
              {t.traditionalBadge}
            </span>
          </div>

          <ul className="space-y-2.5 text-xs text-[var(--apple-text-secondary)]">
            {t.traditionalPoints.map((pt, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-red-500 font-bold mt-0.5">•</span>
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Solution / Talent Science Approach */}
        <div className="p-5 sm:p-6 rounded-2xl bg-cyan-500/10 border border-cyan-500/25 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20">
            <div className="flex items-center gap-2 text-cyan-800 font-bold text-sm">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-600" />
              <span>{t.scienceTitle}</span>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-700 border border-cyan-500/30">
              {t.scienceBadge}
            </span>
          </div>

          <ul className="space-y-2.5 text-xs text-[var(--apple-text-secondary)]">
            {t.sciencePoints.map((pt, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-cyan-600 font-bold mt-0.5">•</span>
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* 3 Core Pillars Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-xl bg-[var(--apple-surface)] border border-[var(--apple-border)] space-y-1">
          <div className="flex items-center gap-2 font-bold text-xs text-[var(--apple-text-primary)]">
            <Layers className="h-4 w-4 text-purple-600" />
            <span>{t.pillars[0].title}</span>
          </div>
          <p className="text-[11px] text-[var(--apple-text-secondary)]">
            {t.pillars[0].desc}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[var(--apple-surface)] border border-[var(--apple-border)] space-y-1">
          <div className="flex items-center gap-2 font-bold text-xs text-[var(--apple-text-primary)]">
            <Zap className="h-4 w-4 text-cyan-600" />
            <span>{t.pillars[1].title}</span>
          </div>
          <p className="text-[11px] text-[var(--apple-text-secondary)]">
            {t.pillars[1].desc}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[var(--apple-surface)] border border-[var(--apple-border)] space-y-1">
          <div className="flex items-center gap-2 font-bold text-xs text-[var(--apple-text-primary)]">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>{t.pillars[2].title}</span>
          </div>
          <p className="text-[11px] text-[var(--apple-text-secondary)]">
            {t.pillars[2].desc}
          </p>
        </div>
      </div>

      {/* Case Studies Strip */}
      <div className="apple-card p-5 sm:p-6 space-y-3">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[var(--apple-text-primary)] font-mono border-b border-[var(--apple-border)] pb-2.5">
          <span className="flex items-center gap-1.5">
            <TrendingUp className="h-4 w-4 text-purple-600" />
            {t.caseStudiesTitle}
          </span>
          <span className="text-[10px] text-cyan-700 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20 font-bold">{t.caseStudiesBadge}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {t.caseStudies.map((cs) => (
            <div key={cs.id} className="p-4 rounded-xl bg-[var(--apple-surface-secondary)] border border-[var(--apple-border)] space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-purple-700">{cs.clientType}</span>
                <span className="text-[10px] font-mono text-[var(--apple-text-tertiary)]">{cs.market}</span>
              </div>
              
              <div className="text-xs text-[var(--apple-text-secondary)] space-y-1">
                <p><strong>{t.challengeLabel}</strong> {cs.problem}</p>
                <p><strong>{t.solutionLabel}</strong> {cs.solution}</p>
              </div>

              <div className="pt-2 border-t border-[var(--apple-border)] grid grid-cols-3 gap-2">
                {cs.metrics.map((m, mIdx) => (
                  <div key={mIdx} className="p-2 rounded-lg bg-[var(--apple-surface)] border border-[var(--apple-border)] text-center">
                    <div className="text-xs font-black text-cyan-700 font-mono">{m.value}</div>
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
