import React, { useState, useEffect } from 'react';
import { Activity, Sparkles, HelpCircle } from 'lucide-react';
import { haptics } from '../lib/haptics';
import { sound } from '../lib/sound';

interface LiveAuditTickerProps {
  lang: 'en' | 'es';
  onOpenQuiz: () => void;
}

const AUDIT_EVENTS_ES = [
  'Hace 4 min · CTO en Ámsterdam (Benelux) generó Scorecard BARS para Staff Engineer',
  'Hace 14 min · Head of Eng en Berlín auditó fuga P&L de $210K / año',
  'Hace 28 min · VP of People en San Francisco exportó Auditoría de Hiring Loop en PDF',
  'Hace 39 min · Lead Recruiter en Londres sincronizó rúbrica técnica con Greenhouse',
  'Hace 52 min · Founder en Bogotá calibró comité para 8 contrataciones anuales'
];

const AUDIT_EVENTS_EN = [
  '4 min ago · CTO in Amsterdam (Benelux) generated BARS Scorecard for Staff Engineer',
  '14 min ago · Head of Eng in Berlin audited $210K/year P&L panel bleed',
  '28 min ago · VP of People in San Francisco exported Candidate Audit PDF for hiring loop',
  '39 min ago · Lead Recruiter in London synced technical rubric with Greenhouse',
  '52 min ago · Founder in Austin calibrated engineering panel for 8 annual hires'
];

export const LiveAuditTicker: React.FC<LiveAuditTickerProps> = ({ lang, onOpenQuiz }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const events = lang === 'es' ? AUDIT_EVENTS_ES : AUDIT_EVENTS_EN;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % events.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [events.length]);

  return (
    <div className="w-full bg-slate-900 text-white text-[11px] font-mono py-2 px-4 flex flex-col sm:flex-row items-center justify-between gap-2 border-b border-purple-500/30">
      <div className="flex items-center gap-2.5 overflow-hidden">
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-purple-300 font-bold hidden md:inline">
          {lang === 'es' ? 'AUDITORÍAS EN VIVO:' : 'LIVE AUDITS:'}
        </span>
        <span className="truncate text-slate-300 transition-all duration-300">
          {events[currentIndex]}
        </span>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <span className="text-[10px] text-slate-400 hidden lg:inline">
          {lang === 'es' ? '142 evaluaciones esta semana' : '142 audits this week'}
        </span>
        <button
          onClick={() => {
            haptics.tap();
            sound.playClick();
            onOpenQuiz();
          }}
          className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-700/80 hover:bg-purple-600 text-purple-100 border border-purple-400/40 text-[10px] font-sans font-bold cursor-pointer transition-colors"
        >
          <Sparkles className="w-3 h-3 text-amber-300" />
          <span>{lang === 'es' ? 'Quiz de Arquetipo (30s)' : 'Archetype Quiz (30s)'}</span>
        </button>
      </div>
    </div>
  );
};
