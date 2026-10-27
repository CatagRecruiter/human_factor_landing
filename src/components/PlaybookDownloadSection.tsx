import React, { useState } from 'react';
import { BookOpen, Download, Check, Sparkles, Shield, ArrowRight } from 'lucide-react';
import { sound } from '../lib/sound';

interface Props {
  onShowToast: (msg: string) => void;
}

export const PlaybookDownloadSection: React.FC<Props> = ({ onShowToast }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      onShowToast('Please enter a valid work email.');
      return;
    }

    setLoading(true);
    sound.playChord();

    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'skills_evidence_hiring_playbook' }),
      });
    } catch {}

    setLoading(false);
    setSubmitted(true);
    onShowToast('Playbook download dispatched to your email!');
  };

  return (
    <section id="playbook" className="apple-card p-8 sm:p-12 space-y-8 scroll-mt-24">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-mono text-[11px] font-bold border border-emerald-500/20">
              FREE EXECUTIVE RESOURCE
            </span>
            <span className="text-xs text-[var(--apple-text-tertiary)] font-medium">
              42-Page Implementation Guide
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--apple-text-primary)]">
            How to Do Skills & Evidence-Based Hiring: The 2026 Playbook
          </h2>

          <p className="text-xs sm:text-sm text-[var(--apple-text-secondary)] leading-relaxed">
            The complete blueprint for engineering leads, heads of talent, and founders. Learn how to transform subjective interview conversations into standardized, high-predictive scoring loops.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs text-[var(--apple-text-secondary)]">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>Step-by-step BARS rubric creation templates</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>EU AI Act & US automated hiring compliance</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>Interviewer calibration workshop slides</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>Work sample & situational judgment scripts</span>
            </div>
          </div>
        </div>

        {/* Lead Capture Box */}
        <div className="w-full lg:w-96 rounded-2xl border border-[var(--apple-border)] bg-[var(--apple-surface-secondary)] p-6 space-y-4">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--apple-text-primary)]">
                <BookOpen className="h-4 w-4 text-blue-500" />
                <span>Download Playbook (PDF)</span>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[var(--apple-text-primary)] mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Elena Rostova"
                  className="w-full text-xs rounded-xl border border-[var(--apple-border)] bg-[var(--apple-surface)] px-3.5 py-2.5 text-[var(--apple-text-primary)] focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[var(--apple-text-primary)] mb-1">
                  Work Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="elena@company.com"
                  className="w-full text-xs rounded-xl border border-[var(--apple-border)] bg-[var(--apple-surface)] px-3.5 py-2.5 text-[var(--apple-text-primary)] focus:outline-none focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="apple-button w-full py-2.5 text-xs font-semibold flex items-center justify-center gap-2 shadow-sm"
              >
                <Download className="h-4 w-4" />
                <span>{loading ? 'Preparing...' : 'Get Instant Access'}</span>
              </button>

              <p className="text-[10px] text-center text-[var(--apple-text-tertiary)]">
                Zero spam. You'll also receive our bi-weekly psychometrics dispatch.
              </p>
            </form>
          ) : (
            <div className="py-6 text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <Check className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-sm text-[var(--apple-text-primary)]">
                Playbook on its way!
              </h3>
              <p className="text-xs text-[var(--apple-text-secondary)]">
                Check your inbox at <strong>{email}</strong> for the PDF and companion templates.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
