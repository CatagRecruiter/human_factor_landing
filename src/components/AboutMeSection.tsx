import React from 'react';
import { 
  CheckCircle2, 
  ExternalLink, 
  FileText, 
  Mail, 
  ArrowRight,
  Sparkles,
  Award,
  Layers,
  GraduationCap
} from 'lucide-react';

export const AboutMeSection: React.FC = () => {
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
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-500 font-mono text-[11px] font-bold border border-blue-500/20">
                SYSTEMS ARCHITECT
              </span>
              <span className="text-xs text-[var(--apple-text-tertiary)] font-medium">
                10 Years Global Sourcing &amp; Selection Track Record
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--apple-text-primary)]">
              Catalina Gil Sierra
            </h2>
            <p className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-medium mt-0.5">
              Senior Talent Acquisition Specialist | Evidence-Based &amp; Skills-Based Hiring
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={navigateToAboutPage}
              className="apple-button flex items-center gap-2 text-xs py-2.5 px-4 font-semibold shadow-sm cursor-pointer"
            >
              <span>View Full Interactive Profile &amp; History</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* 3 Value Highlights Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-[var(--apple-surface-secondary)] border border-[var(--apple-border)] space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-xs text-[var(--apple-text-primary)]">
              <Layers className="h-4 w-4 text-blue-500" />
              <span>4x Team Throughput Multiplier</span>
            </div>
            <p className="text-[11px] text-[var(--apple-text-secondary)]">
              Delivering the sourcing throughput of 2 sourcers and 2 recruiters via n8n automation and targeted LLM prompting.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[var(--apple-surface-secondary)] border border-[var(--apple-border)] space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-xs text-[var(--apple-text-primary)]">
              <GraduationCap className="h-4 w-4 text-emerald-500" />
              <span>Psychometric Measurement</span>
            </div>
            <p className="text-[11px] text-[var(--apple-text-secondary)]">
              Postgraduate Specialization in Design and Validation of Psychological Measurement Instruments (USBMED).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[var(--apple-surface-secondary)] border border-[var(--apple-border)] space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-xs text-[var(--apple-text-primary)]">
              <Award className="h-4 w-4 text-amber-500" />
              <span>US, European &amp; LATAM Markets</span>
            </div>
            <p className="text-[11px] text-[var(--apple-text-secondary)]">
              Full-cycle executive and engineering search across Tech, Oil &amp; Gas, Manufacturing, and Retail.
            </p>
          </div>
        </div>

        {/* Action Link Bar */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--apple-text-tertiary)] border-t border-[var(--apple-border)]">
          <div className="flex items-center gap-2 font-medium text-[var(--apple-text-secondary)]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            <span>Open for Remote B2B Contractor Roles (US &amp; European Timezones)</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/catalinagilpeopleops"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline flex items-center gap-1 font-semibold"
            >
              <span>LinkedIn</span>
              <ExternalLink className="h-3 w-3" />
            </a>
            <span>•</span>
            <a
              href="https://docs.google.com/document/d/1LFZOGBt049Cw7poC0fcgHkFuszylslldqMNAUYQO-eg/edit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline flex items-center gap-1 font-semibold"
            >
              <span>Full CV</span>
              <FileText className="h-3 w-3" />
            </a>
            <span>•</span>
            <a
              href="mailto:info@catagil.com"
              className="text-blue-500 hover:underline flex items-center gap-1 font-semibold"
            >
              <span>info@catagil.com</span>
              <Mail className="h-3 w-3" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
