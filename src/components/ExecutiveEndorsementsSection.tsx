import React from 'react';
import { Quote, ExternalLink, ArrowRight, ShieldCheck } from 'lucide-react';

const LinkedInIcon: React.FC<{ className?: string }> = ({ className = "h-3.5 w-3.5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
  </svg>
);

interface Props {
  lang: 'en' | 'es';
}

interface Endorsement {
  name: string;
  role: string;
  company: string;
  relation: string;
  quote: string;
  badge: string;
}

const ENDORSEMENTS: Endorsement[] = [
  {
    name: 'Giuliana Corbo',
    role: 'President, Nortal Americas',
    company: 'Forbes Tech Council',
    relation: 'Senior to Catalina at Nortal',
    badge: 'Executive',
    quote:
      'Catalina is passionate about her work. She has a pleasant personality and makes everyone comfortable while being around her. Working together has been great!',
  },
  {
    name: 'Francisco Alba',
    role: 'Executive | Global Delivery & Transformation',
    company: 'Ex-VP Fiserv, Experian, HP',
    relation: 'Senior to Catalina',
    badge: 'Executive',
    quote:
      'From the very first day I was able to see her deep passion for recruitment, not seen only as operational motions, but rather as a discipline to be defined, measured, tracked and improved. I would definitely hire her back at anytime.',
  },
  {
    name: 'Michael Muehlberger',
    role: 'Founder & CEO at SPACE44',
    company: 'Building AI Operating Layer',
    relation: 'Direct Executive Partner',
    badge: 'Founder & CEO',
    quote:
      'Cat is driven by heart and passion in everything she does. Within a team she does a lot for the human side and spirit with endless engagement ideas and gamification. She is an inspiring person with great ideas for Recruiting and HR.',
  },
  {
    name: 'Tony Reece',
    role: 'Principal Solutions Architect & Strategist',
    company: 'Oracle Cloud / Enterprise Architect',
    relation: 'Senior to Catalina at Newton Vision',
    badge: 'Enterprise Architect',
    quote:
      'Her ability to connect people with opportunities was unique to only her capability. She will make an impact day one not just on talent but on the brand of any organization. She comes highly recommended by me.',
  },
];

const RESEARCH_PAPERS = [
  {
    id: 'bot-vs-bot-paradox',
    titleEn: "The 'Bot vs. Bot' Paradox in Modern Hiring",
    titleEs: "La Paradoja 'Bot vs. Bot' en la Selección Moderna",
    descEn: 'How candidate LLMs broke legacy ATS filters and why calibrated BARS rubrics are the only resilient defense.',
    descEs: 'Cómo los LLMs de candidatos rompieron los ATS heredados y por qué las rúbricas BARS son la única defensa.',
    tag: 'Talent Architecture',
    readTime: '6 min read',
  },
  {
    id: 'bars-engineering-rubrics',
    titleEn: 'Designing BARS Rubrics for Distributed Engineering Teams',
    titleEs: 'Diseño de Rúbricas BARS para Equipos de Ingeniería Distribuidos',
    descEn: 'A quantitative playbook to eliminate 68% interviewer variance across remote technical hiring panels.',
    descEs: 'Guía cuantitativa para eliminar el 68% de la varianza entre entrevistadores en comités remotos.',
    tag: 'Psychometrics',
    readTime: '8 min read',
  },
  {
    id: 'autonomous-sourcing-n8n',
    titleEn: 'The 4x Recruiter: Engineering Autonomous Pipelines with n8n',
    titleEs: 'El Reclutador 4x: Construcción de Pipelines Autónomos con n8n',
    descEn: 'Architecting continuous talent ingestion, enrichment, and hyper-personalized outbound workflows without agency fees.',
    descEs: 'Arquitectura de ingesta, enriquecimiento y outbound hiper-personalizado sin intermediarios.',
    tag: 'AI Workflows',
    readTime: '7 min read',
  },
];

export const ExecutiveEndorsementsSection: React.FC<Props> = ({ lang }) => {
  const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
  const aboutMeUrl = isLocal ? 'http://localhost:5173/' : 'https://catagil.com/';

  return (
    <section className="space-y-8 scroll-mt-24">
      {/* 1. Executive Social Proof Ticker */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--apple-border)] pb-3">
          <div>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-800 font-mono text-[10px] font-bold border border-cyan-500/20 uppercase tracking-wider">
              {lang === 'es' ? 'Validación Ejecutiva' : 'Executive Endorsements'}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--apple-text-primary)] mt-1">
              {lang === 'es' ? 'Respaldada por Líderes Tecnológicos y C-Levels' : 'Trusted by Engineering Leaders & C-Suite Executives'}
            </h3>
          </div>
          <a
            href="https://www.linkedin.com/in/catalinagilpeopleops"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-purple-700 hover:text-purple-800 inline-flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            <LinkedInIcon className="w-3.5 h-3.5 text-[#0A66C2]" />
            <span>{lang === 'es' ? 'Ver 7 recomendaciones en LinkedIn' : 'Verify all 7 recommendations on LinkedIn'}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="flex sm:grid sm:grid-cols-2 gap-4 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0 touch-carousel-snap">
          {ENDORSEMENTS.map((item, idx) => (
            <div
              key={idx}
              className="w-[86vw] sm:w-auto shrink-0 p-5 rounded-2xl bg-[var(--apple-surface)] border border-[var(--apple-border)] flex flex-col justify-between space-y-3.5 shadow-xs hover:border-purple-300 transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200">
                    {item.badge}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] text-emerald-700 font-semibold">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    <span>{lang === 'es' ? 'Verificado en LinkedIn' : 'LinkedIn Verified'}</span>
                  </div>
                </div>

                <p className="text-xs text-[var(--apple-text-secondary)] italic leading-relaxed">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-3 border-t border-[var(--apple-border)] flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[var(--apple-text-primary)]">{item.name}</div>
                  <div className="text-[10px] text-purple-700 font-medium">{item.role}</div>
                  <div className="text-[10px] text-[var(--apple-text-tertiary)]">{item.company}</div>
                </div>
                <Quote className="w-5 h-5 text-purple-200 shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Research Papers & Tactical Essays Teaser */}
      <div className="apple-card p-6 sm:p-7 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--apple-border)] pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-700 font-mono text-[10px] font-bold border border-purple-500/20 uppercase tracking-wider">
                {lang === 'es' ? 'Investigación Publicada' : 'Published Research'}
              </span>
              <span className="text-xs text-[var(--apple-text-tertiary)] font-mono">
                Talent Science Dossier
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--apple-text-primary)] mt-1">
              {lang === 'es' ? 'Artículos Técnicos y Ensayos de Psicometría' : 'Technical Papers & Psychometric Frameworks'}
            </h3>
          </div>
          <a
            href={aboutMeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="apple-button inline-flex items-center gap-2 text-xs py-2 px-3.5 self-start sm:self-auto cursor-pointer"
          >
            <span>{lang === 'es' ? 'Explorar Todos los Artículos' : 'Explore All Essays'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="flex md:grid md:grid-cols-3 gap-3.5 overflow-x-auto md:overflow-visible pb-2 md:pb-0 touch-carousel-snap">
          {RESEARCH_PAPERS.map((paper) => (
            <a
              key={paper.id}
              href={aboutMeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-[82vw] md:w-auto shrink-0 p-4 rounded-xl bg-[var(--apple-surface-secondary)] border border-[var(--apple-border)] hover:border-purple-400/60 hover:bg-[var(--apple-surface)] transition-all flex flex-col justify-between space-y-3 group cursor-pointer"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-purple-700 font-bold uppercase">{paper.tag}</span>
                  <span className="text-[var(--apple-text-tertiary)]">{paper.readTime}</span>
                </div>
                <h4 className="text-xs font-bold text-[var(--apple-text-primary)] group-hover:text-purple-700 transition-colors leading-snug">
                  {lang === 'es' ? paper.titleEs : paper.titleEn}
                </h4>
                <p className="text-[11px] text-[var(--apple-text-secondary)] line-clamp-3 leading-relaxed">
                  {lang === 'es' ? paper.descEs : paper.descEn}
                </p>
              </div>

              <div className="pt-2 border-t border-[var(--apple-border)] flex items-center justify-between text-[11px] text-purple-700 font-semibold">
                <span>{lang === 'es' ? 'Leer en Dossier' : 'Read in Dossier'}</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
