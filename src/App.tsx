import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Volume2, 
  VolumeX, 
  Check, 
  ArrowUpRight, 
  ChevronRight, 
  Sparkles, 
  User, 
  Sliders, 
  DollarSign,
  Command,
  Menu,
  X
} from 'lucide-react';
import { sound } from './lib/sound';
import { GuidedTourModal } from './components/GuidedTourModal';
import { CommandPalette } from './components/CommandPalette';
import { InterviewAnalysisTool } from './components/InterviewAnalysisTool';
import { InefficientInterviewingCalculator } from './components/InefficientInterviewingCalculator';
import { TalentScienceOverview } from './components/TalentScienceOverview';
import { AboutMeSection } from './components/AboutMeSection';
import { NewsletterSection } from './components/NewsletterSection';
import { PlaybookDownloadSection } from './components/PlaybookDownloadSection';
import { TRANSLATIONS } from './lib/translations';

export function App() {
  const [lang, setLang] = useState<'en' | 'es'>('en');
  const [sfxOn, setSfxOn] = useState<boolean>(true);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [isTourOpen, setIsTourOpen] = useState<boolean>(false);
  const [isCommandOpen, setIsCommandOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Spotlight mouse coordinates
  const [mousePos, setMousePos] = useState({ x: 50, y: 30 });

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
  }, []);

  useEffect(() => {
    sound.enabled = sfxOn;
  }, [sfxOn]);

  // Spotlight mouse listener at 60fps
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = Math.round((e.clientX / window.innerWidth) * 100);
      const y = Math.round((e.clientY / window.innerHeight) * 100);
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Keyboard shortcut listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2400);
  };

  const scrollTo = (id: string) => {
    sound.playTone(480, 'sine', 0.05);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      className="relative min-h-screen selection:bg-purple-500/20 selection:text-purple-600 pb-28 sm:pb-16"
      style={{
        '--mouse-x': `${mousePos.x}%`,
        '--mouse-y': `${mousePos.y}%`
      } as React.CSSProperties}
    >
      {/* Living Canvas Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-40 transition-opacity duration-1000"
          style={{
            background: `radial-gradient(circle 800px at var(--mouse-x) var(--mouse-y), rgba(109, 40, 217, 0.12), transparent 80%)`
          }}
        />
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(var(--apple-text-primary) 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />
      </div>

      {/* Floating System Notification Toast */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--apple-surface)] border border-[var(--apple-border)] text-[var(--apple-text-primary)] font-semibold text-xs shadow-2xl backdrop-blur-xl"
          >
            <Check className="w-4 h-4 text-cyan-600" />
            <span>{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Apple Translucent Frosted Glass Navbar */}
      <header className="sticky top-0 z-40 apple-glass px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Brand Logo & Attribution */}
          <div 
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-700 via-indigo-600 to-cyan-600 flex items-center justify-center text-white shadow-md shadow-purple-600/20 group-hover:scale-105 transition-transform shrink-0">
              <Sparkles className="w-4 h-4 text-cyan-200" />
            </div>
            <span className="font-black text-sm sm:text-base text-[var(--apple-text-primary)] tracking-tight">
              Talent Science
            </span>
          </div>

          {/* Quick Nav Anchors */}
          <nav className="hidden xl:flex items-center gap-1 bg-[var(--apple-surface-secondary)] p-1 rounded-full border border-[var(--apple-border)] text-xs font-semibold text-[var(--apple-text-secondary)]">
            <button onClick={() => scrollTo('talent-science')} className="px-3 py-1 rounded-full hover:text-[var(--apple-text-primary)] hover:bg-[var(--apple-surface)] transition-all cursor-pointer">
              {t.nav.talentScience}
            </button>
            <button onClick={() => scrollTo('interview-tool')} className="px-3 py-1 rounded-full hover:text-[var(--apple-text-primary)] hover:bg-[var(--apple-surface)] transition-all cursor-pointer">
              {t.nav.interviewTool}
            </button>
            <button onClick={() => scrollTo('interview-cost')} className="px-3 py-1 rounded-full hover:text-[var(--apple-text-primary)] hover:bg-[var(--apple-surface)] transition-all cursor-pointer">
              {t.nav.inefficiencyAudit}
            </button>
            <button onClick={() => scrollTo('about-me')} className="px-3 py-1 rounded-full hover:text-[var(--apple-text-primary)] hover:bg-[var(--apple-surface)] transition-all cursor-pointer">
              {t.nav.aboutCatalina}
            </button>
            <button onClick={() => scrollTo('newsletter')} className="px-3 py-1 rounded-full hover:text-[var(--apple-text-primary)] hover:bg-[var(--apple-surface)] transition-all cursor-pointer">
              {t.nav.marketSignals}
            </button>
            <button onClick={() => scrollTo('playbook')} className="px-3 py-1 rounded-full text-purple-700 hover:bg-[var(--apple-surface)] transition-all flex items-center gap-1 cursor-pointer">
              <span>{t.nav.playbook}</span>
              <span className="text-[9px] px-1 py-0.2 rounded bg-purple-500/10 border border-purple-500/20 font-bold">PDF</span>
            </button>
          </nav>

          {/* Controls & CTAs (Desktop / Tablet) */}
          <div className="hidden sm:flex items-center gap-2">
            {/* Command Palette Trigger */}
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={() => {
                sound.playClick();
                setIsCommandOpen(true);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold border border-[var(--apple-border)] bg-[var(--apple-surface)] hover:bg-[var(--apple-hover)] text-[var(--apple-text-secondary)] hover:text-[var(--apple-text-primary)] transition-all shadow-2xs cursor-pointer"
              title={lang === 'es' ? 'Paleta de Comandos (Ctrl+K)' : 'Command Palette (Ctrl+K)'}
            >
              <Command className="w-3.5 h-3.5 text-purple-600" />
              <span className="font-mono text-[10px] hidden md:inline">⌘K</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={() => {
                sound.playTone(500, 'sine', 0.08);
                setIsTourOpen(true);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-purple-500/30 bg-purple-500/10 text-purple-700 hover:bg-purple-500/20 transition-all shadow-sm cursor-pointer"
              title={lang === 'es' ? 'Tour Guiado' : 'Interactive Tour'}
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
              <span>{t.nav.tourBtn}</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={() => {
                scrollTo('about-me');
              }}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-[var(--apple-border)] bg-[var(--apple-surface-secondary)] text-[var(--apple-text-secondary)] hover:text-[var(--apple-text-primary)] hover:border-[var(--apple-border-hover)] transition-all cursor-pointer"
              title="Catalina Gil's Profile"
            >
              <User className="w-3.5 h-3.5" />
              <span>{t.nav.profileBtn}</span>
            </motion.button>

            {/* Tactile SFX Toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setSfxOn(!sfxOn)}
              className="p-2 rounded-full hover:bg-[var(--apple-surface-secondary)] text-[var(--apple-text-secondary)] hover:text-[var(--apple-text-primary)] cursor-pointer"
              title={t.nav.sfxTitle}
            >
              {sfxOn ? <Volume2 className="w-4 h-4 text-purple-600" /> : <VolumeX className="w-4 h-4" />}
            </motion.button>

            {/* English / Spanish Toggle Switch */}
            <div className="flex items-center rounded-xl bg-[var(--apple-surface-secondary)] p-0.5 border border-[var(--apple-border)]">
              <button
                onClick={() => {
                  if (lang !== 'en') {
                    sound.playClick();
                    setLang('en');
                  }
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  lang === 'en'
                    ? 'bg-purple-700 text-white shadow-xs'
                    : 'text-[var(--apple-text-secondary)] hover:text-[var(--apple-text-primary)]'
                }`}
                title="Switch to English"
              >
                EN
              </button>
              <button
                onClick={() => {
                  if (lang !== 'es') {
                    sound.playClick();
                    setLang('es');
                  }
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  lang === 'es'
                    ? 'bg-purple-700 text-white shadow-xs'
                    : 'text-[var(--apple-text-secondary)] hover:text-[var(--apple-text-primary)]'
                }`}
                title="Cambiar a Español"
              >
                ES
              </button>
            </div>

            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              href="https://cal.com/catalinagil"
              target="_blank"
              rel="noopener noreferrer"
              className="apple-button inline-flex items-center gap-1.5 text-xs py-2 px-3.5"
            >
              <span>{t.nav.bookBtn}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </motion.a>
          </div>

          {/* Mobile Right Controls (< 640px) */}
          <div className="flex sm:hidden items-center gap-2">
            <div className="flex items-center rounded-xl bg-[var(--apple-surface-secondary)] p-0.5 border border-[var(--apple-border)]">
              <button
                onClick={() => {
                  if (lang !== 'en') {
                    sound.playClick();
                    setLang('en');
                  }
                }}
                className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all ${
                  lang === 'en' ? 'bg-purple-700 text-white' : 'text-[var(--apple-text-secondary)]'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => {
                  if (lang !== 'es') {
                    sound.playClick();
                    setLang('es');
                  }
                }}
                className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all ${
                  lang === 'es' ? 'bg-purple-700 text-white' : 'text-[var(--apple-text-secondary)]'
                }`}
              >
                ES
              </button>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              className="p-2 rounded-xl border border-[var(--apple-border)] bg-[var(--apple-surface)] text-[var(--apple-text-primary)] hover:bg-[var(--apple-hover)] transition-all cursor-pointer"
              aria-label="Toggle Mobile Menu"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4 text-purple-700" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="sm:hidden border-t border-[var(--apple-border)] mt-3 pt-3 pb-2 space-y-2 overflow-hidden"
            >
              <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                <button
                  onClick={() => {
                    scrollTo('talent-science');
                    setIsMobileMenuOpen(false);
                  }}
                  className="p-2.5 rounded-xl bg-[var(--apple-surface-secondary)] border border-[var(--apple-border)] text-left"
                >
                  {t.nav.talentScience}
                </button>
                <button
                  onClick={() => {
                    scrollTo('interview-tool');
                    setIsMobileMenuOpen(false);
                  }}
                  className="p-2.5 rounded-xl bg-[var(--apple-surface-secondary)] border border-[var(--apple-border)] text-left text-purple-700 font-bold"
                >
                  {t.nav.interviewTool}
                </button>
                <button
                  onClick={() => {
                    scrollTo('interview-cost');
                    setIsMobileMenuOpen(false);
                  }}
                  className="p-2.5 rounded-xl bg-[var(--apple-surface-secondary)] border border-[var(--apple-border)] text-left"
                >
                  {t.nav.inefficiencyAudit}
                </button>
                <button
                  onClick={() => {
                    scrollTo('about-me');
                    setIsMobileMenuOpen(false);
                  }}
                  className="p-2.5 rounded-xl bg-[var(--apple-surface-secondary)] border border-[var(--apple-border)] text-left"
                >
                  {t.nav.aboutCatalina}
                </button>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => {
                    sound.playClick();
                    setIsMobileMenuOpen(false);
                    setIsTourOpen(true);
                  }}
                  className="flex-1 py-2 rounded-xl border border-purple-500/30 bg-purple-500/10 text-purple-700 text-xs font-semibold flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
                  <span>{t.nav.tourBtn}</span>
                </button>
                <button
                  onClick={() => {
                    sound.playClick();
                    setIsMobileMenuOpen(false);
                    setIsCommandOpen(true);
                  }}
                  className="flex-1 py-2 rounded-xl border border-[var(--apple-border)] bg-[var(--apple-surface)] text-xs font-semibold flex items-center justify-center gap-1.5"
                >
                  <Command className="w-3.5 h-3.5 text-purple-600" />
                  <span>⌘K Menu</span>
                </button>
                <button
                  onClick={() => {
                    setSfxOn(!sfxOn);
                    sound.playClick();
                  }}
                  className="p-2 rounded-xl border border-[var(--apple-border)] bg-[var(--apple-surface)]"
                  title="Toggle SFX"
                >
                  {sfxOn ? <Volume2 className="w-4 h-4 text-purple-600" /> : <VolumeX className="w-4 h-4" />}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Experience Flow */}
      <motion.main 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.28, 0.11, 0.32, 1] }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16"
      >
        
        {/* Hero Section */}
        <section id="hero" className="text-center max-w-4xl mx-auto space-y-4 pt-4 sm:pt-6">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--apple-text-primary)] leading-[1.08]">
            {t.hero.title}
          </h1>

          <p className="text-sm sm:text-base text-[var(--apple-text-secondary)] max-w-2xl mx-auto leading-relaxed">
            {t.hero.subtitle}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => scrollTo('interview-tool')}
              className="apple-button flex items-center gap-2 text-xs py-2.5 px-5 font-semibold cursor-pointer"
            >
              <Sliders className="h-4 w-4" />
              <span>{t.hero.primaryBtn}</span>
            </button>
            <button
              onClick={() => scrollTo('interview-cost')}
              className="flex items-center gap-2 text-xs py-2.5 px-5 rounded-full border border-[var(--apple-border)] bg-[var(--apple-surface)] hover:bg-[var(--apple-hover)] text-[var(--apple-text-primary)] font-semibold transition-all shadow-sm cursor-pointer"
            >
              <DollarSign className="h-4 w-4 text-amber-500" />
              <span>{t.hero.secondaryBtn}</span>
            </button>
          </div>
        </section>

        {/* 1. TALENT SCIENCE OVERVIEW & CASE STUDIES */}
        <TalentScienceOverview lang={lang} />

        {/* 2. THE CORE TOOL: INTERVIEW AND ANALYSIS TOOL */}
        <InterviewAnalysisTool lang={lang} onShowToast={showToast} />

        {/* 3. COST OF INEFFICIENT INTERVIEWING CALCULATOR */}
        <InefficientInterviewingCalculator lang={lang} />

        {/* 4. ABOUT ME / HOJA DE VIDA SECTION */}
        <AboutMeSection lang={lang} />

        {/* 5. PLAYBOOK DOWNLOAD GATED RESOURCE */}
        <PlaybookDownloadSection lang={lang} onShowToast={showToast} />

        {/* 6. NEWSLETTER / MARKET SIGNALS FEED */}
        <NewsletterSection lang={lang} />

        {/* Apple-Style Minimalist Footer */}
        <footer className="pt-8 border-t border-[var(--apple-border)] text-xs text-[var(--apple-text-secondary)] space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <strong className="text-[var(--apple-text-primary)] font-semibold">{t.footer.byLine}</strong>
              <div className="text-[11px] text-[var(--apple-text-tertiary)] mt-0.5">
                {t.footer.subLine}
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <a
                href="https://www.linkedin.com/in/catalinagilpeopleops"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-700 flex items-center gap-0.5"
              >
                <span>{t.footer.linkedIn}</span>
                <ChevronRight className="w-3 h-3" />
              </a>
              <a
                href="https://docs.google.com/document/d/1LFZOGBt049Cw7poC0fcgHkFuszylslldqMNAUYQO-eg/edit"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-700 flex items-center gap-0.5"
              >
                <span>{t.footer.leadCv}</span>
                <ChevronRight className="w-3 h-3" />
              </a>
              <a
                href="https://docs.google.com/document/d/1NyrhrXB_HySO9egpYThS5MJuVfiH3X2BehcRAJiqOVg/edit"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-700 flex items-center gap-0.5"
              >
                <span>{t.footer.fullCycleCv}</span>
                <ChevronRight className="w-3 h-3" />
              </a>
              <a
                href="mailto:info@catagil.com"
                className="text-purple-700 font-semibold hover:underline"
              >
                info@catagil.com
              </a>
            </div>
          </div>
        </footer>

        {/* Guided Tour Modal */}
        <GuidedTourModal
          isOpen={isTourOpen}
          lang={lang}
          onClose={() => setIsTourOpen(false)}
          onSwitchTab={(tab) => {
            if (tab === 'converter') scrollTo('interview-tool');
            else if (tab === 'calculator') scrollTo('interview-cost');
            else scrollTo('talent-science');
          }}
        />

        {/* Raycast / Linear Style Command Palette (Cmd+K) */}
        <CommandPalette
          isOpen={isCommandOpen}
          onClose={() => setIsCommandOpen(false)}
          lang={lang}
          onScrollTo={scrollTo}
          onToggleSound={() => setSfxOn(!sfxOn)}
          sfxOn={sfxOn}
          onToggleLang={() => setLang(lang === 'es' ? 'en' : 'es')}
          onOpenTour={() => setIsTourOpen(true)}
        />

      </motion.main>

      {/* Sticky Mobile Action Bar (< 640px) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--apple-surface)]/90 backdrop-blur-xl border-t border-[var(--apple-border)] px-4 py-2.5 pb-safe shadow-xl flex items-center justify-between gap-3">
        <button
          onClick={() => {
            sound.playTone(450, 'sine', 0.05);
            scrollTo('interview-tool');
          }}
          className="flex-1 py-2 px-3 rounded-xl border border-[var(--apple-border)] bg-[var(--apple-surface-secondary)] text-xs font-semibold text-[var(--apple-text-primary)] flex items-center justify-center gap-1.5 shadow-2xs active:scale-95 transition-transform"
        >
          <Sliders className="w-3.5 h-3.5 text-purple-600" />
          <span>{lang === 'es' ? 'Herramienta BARS' : 'BARS Tool'}</span>
        </button>

        <a
          href="https://cal.com/catalinagil"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 apple-button py-2 px-3 flex items-center justify-center gap-1.5 text-xs font-semibold shadow-md active:scale-95 transition-transform"
        >
          <span>{t.nav.bookBtn}</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}

export default App;
