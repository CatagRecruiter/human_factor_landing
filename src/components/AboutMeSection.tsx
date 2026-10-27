import React from 'react';
import { 
  ArrowRight,
  Award,
  Layers,
  GraduationCap
} from 'lucide-react';
import { TRANSLATIONS } from '../lib/translations';

interface Props {
  lang: 'en' | 'es';
}

export const AboutMeSection: React.FC<Props> = ({ lang }) => {
  const t = TRANSLATIONS[lang].aboutMe;

  const navigateToAboutPage = () => {
    const targetUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      ? (window.location.port === '5173' ? 'http://localhost:5174' : '../aboutme_page/dist/index.html')
      : 'https://catagil.com/';
    window.open(targetUrl, '_blank') || (window.location.href = targetUrl);
  };

  return (
    <section id="about-me" className="space-y-6 scroll-mt-24">
      <div className="apple-card p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--apple-border)] pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-700 font-mono text-[11px] font-bold border border-purple-500/20">
                {t.badge}
              </span>
              <span className="text-xs text-[var(--apple-text-tertiary)] font-medium">
                {t.subBadge}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--apple-text-primary)]">
              {t.title}
            </h2>
            <p className="text-xs sm:text-sm text-purple-700 font-medium mt-0.5">
              {t.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={navigateToAboutPage}
              className="apple-button flex items-center gap-2 text-xs py-2.5 px-4 font-semibold shadow-sm cursor-pointer"
            >
              <span>{t.ctaBtn}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* 3 Value Highlights Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-[var(--apple-surface-secondary)] border border-[var(--apple-border)] space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-xs text-[var(--apple-text-primary)]">
              <Layers className="h-4 w-4 text-purple-600" />
              <span>{t.cards[0].title}</span>
            </div>
            <p className="text-[11px] text-[var(--apple-text-secondary)]">
              {t.cards[0].desc}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[var(--apple-surface-secondary)] border border-[var(--apple-border)] space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-xs text-[var(--apple-text-primary)]">
              <GraduationCap className="h-4 w-4 text-cyan-600" />
              <span>{t.cards[1].title}</span>
            </div>
            <p className="text-[11px] text-[var(--apple-text-secondary)]">
              {t.cards[1].desc}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[var(--apple-surface-secondary)] border border-[var(--apple-border)] space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-xs text-[var(--apple-text-primary)]">
              <Award className="h-4 w-4 text-amber-500" />
              <span>{t.cards[2].title}</span>
            </div>
            <p className="text-[11px] text-[var(--apple-text-secondary)]">
              {t.cards[2].desc}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
