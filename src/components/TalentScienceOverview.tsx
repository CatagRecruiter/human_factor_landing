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
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 space-y-4 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
              <XCircle className="h-4 w-4 shrink-0 text-slate-400" />
              <span>{t.traditionalTitle}</span>
            </div>
            <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
              {t.traditionalBadge}
            </span>
          </div>

          <ul className="space-y-2.5 text-xs text-slate-600">
            {t.traditionalPoints.map((pt, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-slate-400 font-bold mt-0.5">•</span>
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Solution / Talent Science Approach */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-purple-200 space-y-4 shadow-xs relative overflow-hidden ring-1 ring-purple-500/10">
          <div className="absolute top-0 left-0 right-0 h-1 bg-purple-600" />
          <div className="flex items-center justify-between pb-3 border-b border-purple-100">
            <div className="flex items-center gap-2 text-purple-950 font-bold text-sm">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-purple-600" />
              <span>{t.scienceTitle}</span>
            </div>
            <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
              {t.scienceBadge}
            </span>
          </div>

          <ul className="space-y-2.5 text-xs text-slate-700">
            {t.sciencePoints.map((pt, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-purple-600 font-bold mt-0.5">•</span>
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* 3 Core Pillars Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-xl bg-white border border-slate-200/80 space-y-1 shadow-2xs">
          <div className="flex items-center gap-2 font-bold text-xs text-[var(--apple-text-primary)]">
            <Layers className="h-4 w-4 text-purple-600" />
            <span>{t.pillars[0].title}</span>
          </div>
          <p className="text-[11px] text-[var(--apple-text-secondary)]">
            {t.pillars[0].desc}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200/80 space-y-1 shadow-2xs">
          <div className="flex items-center gap-2 font-bold text-xs text-[var(--apple-text-primary)]">
            <Zap className="h-4 w-4 text-purple-600" />
            <span>{t.pillars[1].title}</span>
          </div>
          <p className="text-[11px] text-[var(--apple-text-secondary)]">
            {t.pillars[1].desc}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200/80 space-y-1 shadow-2xs">
          <div className="flex items-center gap-2 font-bold text-xs text-[var(--apple-text-primary)]">
            <ShieldCheck className="h-4 w-4 text-purple-600" />
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
          <span className="text-[10px] text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200 font-bold">{t.caseStudiesBadge}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {t.caseStudies.map((cs) => (
            <div key={cs.id} className="p-4 rounded-xl bg-white border border-slate-200/80 space-y-2.5 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-purple-700">{cs.clientType}</span>
                <span className="text-[10px] font-mono text-[var(--apple-text-tertiary)]">{cs.market}</span>
              </div>
              
              <div className="text-xs text-[var(--apple-text-secondary)] space-y-1">
                <p><strong>{t.challengeLabel}</strong> {cs.problem}</p>
                <p><strong>{t.solutionLabel}</strong> {cs.solution}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 grid grid-cols-3 gap-2">
                {cs.metrics.map((m, mIdx) => (
                  <div key={mIdx} className="p-2 rounded-lg bg-slate-50 border border-slate-200/70 text-center">
                    <div className="text-xs font-black text-purple-700 font-mono">{m.value}</div>
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
