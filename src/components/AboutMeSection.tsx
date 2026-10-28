import React from 'react';
import { 
  ArrowRight,
  Award,
  Layers,
  GraduationCap,
  ExternalLink,
  CheckCircle2,
  Calendar,
  Sparkles
} from 'lucide-react';
import { TRANSLATIONS } from '../lib/translations';

interface Props {
  lang: 'en' | 'es';
}

export const AboutMeSection: React.FC<Props> = ({ lang }) => {
  const t = TRANSLATIONS[lang].aboutMe;

  const navigateToAboutPage = () => {
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const targetUrl = isLocal ? 'http://localhost:5173/' : 'https://catagil.com/';
    window.open(targetUrl, '_blank') || (window.location.href = targetUrl);
  };

  return (
    <section id="about-me" className="space-y-6 scroll-mt-24">
      <div className="apple-card p-6 sm:p-8 space-y-6">
        
        {/* Header & Bio Split */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-[var(--apple-border)] pb-6">
          <div className="flex items-start gap-4 sm:gap-5">
            {/* Catalina Portrait */}
            <div className="relative shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-purple-200 shadow-md">
                <img
                  src="/catalina.jpg"
                  alt="Catalina Gil Sierra"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white" title="Available for B2B Contracts" />
            </div>

            {/* Profile Info */}
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 font-mono text-[10px] font-bold border border-purple-200 uppercase tracking-wider">
                  {t.badge}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
                  <CheckCircle2 className="w-3 h-3 text-purple-600" />
                  B2B CONTRACTOR · US & EU
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--apple-text-primary)]">
                {t.title}
              </h2>
              <p className="text-xs sm:text-sm text-purple-700 font-medium">
                {t.subtitle}
              </p>
              <p className="text-xs text-[var(--apple-text-secondary)] max-w-xl pt-0.5">
                {lang === 'es'
                  ? 'Especialista en Evaluación Psicométrica (USBMED) y Psicóloga Organizacional (EAFIT). Reemplazando "vibe checks" con rúbricas BARS calibradas y automatización n8n en Norteamérica, Europa y LATAM.'
                  : 'Specialist in Psychometric Assessment Instruments (USBMED) & Organizational Psychologist (EAFIT). Replacing intuition-based hiring with calibrated BARS and n8n autonomous sourcing workflows.'}
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full md:w-auto shrink-0">
            <button
              onClick={navigateToAboutPage}
              className="apple-button flex items-center justify-center gap-2 text-xs py-2.5 px-4 font-semibold shadow-sm cursor-pointer"
            >
              <span>{t.ctaBtn}</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </button>
            <a
              href="https://cal.com/catalinagil"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--apple-border)] bg-[var(--apple-surface)] hover:bg-[var(--apple-hover)] text-xs font-semibold text-[var(--apple-text-primary)] transition-all cursor-pointer shadow-xs"
            >
              <Calendar className="w-3.5 h-3.5 text-purple-600" />
              <span>{lang === 'es' ? 'Agendar Consulta' : 'Book Consultation'}</span>
            </a>
          </div>
        </div>

        {/* 4 Quantitative Impact Pillars */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 text-center space-y-0.5 shadow-2xs hover:border-purple-300 transition-all">
            <div className="font-mono text-xl sm:text-2xl font-black text-purple-700">10+</div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-800">{lang === 'es' ? 'Años de Trayectoria' : 'Years Experience'}</div>
            <div className="text-[10px] text-slate-500">{lang === 'es' ? 'US, LATAM y Europa' : 'US, LATAM & Europe'}</div>
          </div>
          <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 text-center space-y-0.5 shadow-2xs hover:border-purple-300 transition-all">
            <div className="font-mono text-xl sm:text-2xl font-black text-purple-700">4x</div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-800">{lang === 'es' ? 'Multiplicador de Equipo' : 'Team Multiplier'}</div>
            <div className="text-[10px] text-slate-500">{lang === 'es' ? 'Flujos autónomos n8n' : 'Autonomous n8n pipelines'}</div>
          </div>
          <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 text-center space-y-0.5 shadow-2xs hover:border-purple-300 transition-all">
            <div className="font-mono text-xl sm:text-2xl font-black text-purple-700">7.0%</div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-800">{lang === 'es' ? 'Respuesta Outbound' : 'Outbound Reply Rate'}</div>
            <div className="text-[10px] text-slate-500">{lang === 'es' ? 'vs. 2.1% media de mercado' : 'vs. 2.1% market average'}</div>
          </div>
          <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 text-center space-y-0.5 shadow-2xs hover:border-purple-300 transition-all">
            <div className="font-mono text-xl sm:text-2xl font-black text-purple-700">4.6 / 5</div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-800">{lang === 'es' ? 'cNPS Candidatos' : 'Candidate NPS'}</div>
            <div className="text-[10px] text-slate-500">{lang === 'es' ? 'Experiencia transparente' : 'Glassdoor & referral lift'}</div>
          </div>
        </div>

        {/* 3 Core Competence Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-white border border-slate-200/80 space-y-1.5 shadow-2xs">
            <div className="flex items-center gap-2 font-bold text-xs text-[var(--apple-text-primary)]">
              <Layers className="h-4 w-4 text-purple-600" />
              <span>{t.cards[0].title}</span>
            </div>
            <p className="text-[11px] text-[var(--apple-text-secondary)]">
              {t.cards[0].desc}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200/80 space-y-1.5 shadow-2xs">
            <div className="flex items-center gap-2 font-bold text-xs text-[var(--apple-text-primary)]">
              <GraduationCap className="h-4 w-4 text-purple-600" />
              <span>{t.cards[1].title}</span>
            </div>
            <p className="text-[11px] text-[var(--apple-text-secondary)]">
              {t.cards[1].desc}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200/80 space-y-1.5 shadow-2xs">
            <div className="flex items-center gap-2 font-bold text-xs text-[var(--apple-text-primary)]">
              <Award className="h-4 w-4 text-purple-600" />
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
