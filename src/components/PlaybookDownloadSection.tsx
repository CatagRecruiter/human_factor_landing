import React, { useState } from 'react';
import { BookOpen, Download, Check } from 'lucide-react';
import { sound } from '../lib/sound';
import { TRANSLATIONS } from '../lib/translations';

interface Props {
  lang: 'en' | 'es';
  onShowToast: (msg: string) => void;
}

export const PlaybookDownloadSection: React.FC<Props> = ({ lang, onShowToast }) => {
  const t = TRANSLATIONS[lang].playbook;
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      onShowToast(lang === 'es' ? 'Por favor ingresa un correo corporativo válido.' : 'Please enter a valid work email.');
      return;
    }

    setLoading(true);
    sound.playChord();

    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, source: 'skills_evidence_hiring_playbook' }),
      });
    } catch {}

    setLoading(false);
    setSubmitted(true);
    onShowToast(t.downloadSuccess);
  };

  return (
    <section id="playbook" className="apple-card p-8 sm:p-12 space-y-8 scroll-mt-24">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-700 font-mono text-[11px] font-bold border border-purple-500/20">
              {t.badge}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--apple-text-primary)]">
            {t.title}
          </h2>

          <p className="text-xs sm:text-sm text-[var(--apple-text-secondary)] leading-relaxed">
            {t.subtitle}
          </p>

          <div className="space-y-1.5 pt-2">
            <div className="text-xs font-bold text-[var(--apple-text-primary)] mb-1">
              {t.tableOfContents}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[var(--apple-text-secondary)]">
              {t.chapters.map((ch, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-cyan-600 shrink-0 mt-0.5" />
                  <span>{ch}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lead Capture Box */}
        <div className="w-full lg:w-96 rounded-2xl border border-[var(--apple-border)] bg-[var(--apple-surface-secondary)] p-6 space-y-4">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--apple-text-primary)]">
                <BookOpen className="h-4 w-4 text-purple-600" />
                <span>{lang === 'es' ? 'Descargar Playbook (PDF)' : 'Download Playbook (PDF)'}</span>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[var(--apple-text-primary)] mb-1">
                  {lang === 'es' ? 'Tu Nombre Completo' : 'Your Full Name'}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder={t.namePlaceholder}
                  className="w-full text-xs rounded-xl border border-[var(--apple-border)] bg-[var(--apple-surface)] px-3.5 py-2.5 text-[var(--apple-text-primary)] focus:outline-none focus:border-purple-600"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[var(--apple-text-primary)] mb-1">
                  {lang === 'es' ? 'Correo Corporativo' : 'Work Email Address'}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={t.emailPlaceholder}
                  className="w-full text-xs rounded-xl border border-[var(--apple-border)] bg-[var(--apple-surface)] px-3.5 py-2.5 text-[var(--apple-text-primary)] focus:outline-none focus:border-purple-600"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="apple-button w-full py-2.5 text-xs font-semibold flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <Download className="h-4 w-4" />
                <span>{loading ? (lang === 'es' ? 'Procesando...' : 'Preparing...') : t.downloadBtn}</span>
              </button>

              <p className="text-[10px] text-center text-[var(--apple-text-tertiary)]">
                {lang === 'es' ? 'Cero spam. Recibirás también nuestro boletín de psicometría.' : 'Zero spam. You will also receive our bi-weekly psychometrics dispatch.'}
              </p>
            </form>
          ) : (
            <div className="py-6 text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-cyan-500/10 text-cyan-700 flex items-center justify-center">
                <Check className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-sm text-[var(--apple-text-primary)]">
                {lang === 'es' ? '¡Playbook en camino!' : 'Playbook on its way!'}
              </h3>
              <p className="text-xs text-[var(--apple-text-secondary)]">
                {lang === 'es' ? (
                  <>Revisa tu bandeja de entrada en <strong>{email}</strong> para recibir el documento.</>
                ) : (
                  <>Check your inbox at <strong>{email}</strong> for the PDF and companion templates.</>
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
