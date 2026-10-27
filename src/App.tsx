import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Flame, 
  Trophy, 
  Volume2, 
  VolumeX, 
  Sun, 
  Moon, 
  Copy, 
  Check, 
  ArrowUpRight,
  ChevronRight,
  Sparkles,
  BookOpen,
  Newspaper,
  User,
  Sliders,
  DollarSign
} from 'lucide-react';
import { sound } from './lib/sound';
import { NumberTicker } from './components/NumberTicker';
import { WelcomeModal } from './components/WelcomeModal';
import { GuidedTourModal } from './components/GuidedTourModal';
import { InterviewAnalysisTool } from './components/InterviewAnalysisTool';
import { InefficientInterviewingCalculator } from './components/InefficientInterviewingCalculator';
import { TalentScienceOverview } from './components/TalentScienceOverview';
import { AboutMeSection } from './components/AboutMeSection';
import { NewsletterSection } from './components/NewsletterSection';
import { PlaybookDownloadSection } from './components/PlaybookDownloadSection';

export function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [sfxOn, setSfxOn] = useState<boolean>(true);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState<boolean>(() => {
    return !localStorage.getItem('talentlens_welcomed');
  });
  const [isTourOpen, setIsTourOpen] = useState<boolean>(false);

  // Spotlight mouse coordinates
  const [mousePos, setMousePos] = useState({ x: 50, y: 30 });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

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
      className="relative min-h-screen selection:bg-[var(--apple-blue)] selection:text-white pb-16"
      style={{
        '--mouse-x': `${mousePos.x}%`,
        '--mouse-y': `${mousePos.y}%`
      } as React.CSSProperties}
    >
      {/* Living Canvas Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-40 dark:opacity-20 transition-opacity duration-1000"
          style={{
            background: `radial-gradient(circle 800px at var(--mouse-x) var(--mouse-y), rgba(0, 113, 227, 0.15), transparent 80%)`
          }}
        />
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
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
            <Check className="w-4 h-4 text-[var(--apple-green)]" />
            <span>{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Apple Translucent Frosted Glass Navbar */}
      <header className="sticky top-0 z-40 apple-glass px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo('hero')}>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 rounded-lg bg-[var(--apple-text-primary)] text-[var(--apple-bg)] flex items-center justify-center font-bold text-sm tracking-tight cursor-default"
            >
              TS
            </motion.div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[var(--apple-text-primary)] text-sm tracking-tight">Talent Science</span>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-[var(--apple-surface-secondary)] text-[var(--apple-text-secondary)] border border-[var(--apple-border)]">
                  PREDICTIVE TA
                </span>
              </div>
              <p className="text-[11px] text-[var(--apple-text-secondary)] hidden sm:block">
                By Catalina Gil Sierra • Psychometrics (USBMED)
              </p>
            </div>
          </div>

          {/* Quick Nav Anchors */}
          <nav className="hidden xl:flex items-center gap-1 bg-[var(--apple-surface-secondary)] p-1 rounded-full border border-[var(--apple-border)] text-xs font-semibold text-[var(--apple-text-secondary)]">
            <button onClick={() => scrollTo('talent-science')} className="px-3 py-1 rounded-full hover:text-[var(--apple-text-primary)] hover:bg-[var(--apple-surface)] transition-all">
              Talent Science
            </button>
            <button onClick={() => scrollTo('interview-tool')} className="px-3 py-1 rounded-full hover:text-[var(--apple-text-primary)] hover:bg-[var(--apple-surface)] transition-all">
              Interview Tool
            </button>
            <button onClick={() => scrollTo('interview-cost')} className="px-3 py-1 rounded-full hover:text-[var(--apple-text-primary)] hover:bg-[var(--apple-surface)] transition-all">
              Inefficiency Audit
            </button>
            <button onClick={() => scrollTo('about-me')} className="px-3 py-1 rounded-full hover:text-[var(--apple-text-primary)] hover:bg-[var(--apple-surface)] transition-all">
              About Catalina
            </button>
            <button onClick={() => scrollTo('newsletter')} className="px-3 py-1 rounded-full hover:text-[var(--apple-text-primary)] hover:bg-[var(--apple-surface)] transition-all">
              Market Signals
            </button>
            <button onClick={() => scrollTo('playbook')} className="px-3 py-1 rounded-full text-blue-500 hover:bg-[var(--apple-surface)] transition-all flex items-center gap-1">
              <span>Playbook</span>
              <span className="text-[9px] px-1 py-0.2 rounded bg-blue-500/10 border border-blue-500/20 font-bold">PDF</span>
            </button>
          </nav>

          {/* Controls & CTAs */}
          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={() => {
                sound.playTone(500, 'sine', 0.08);
                setIsTourOpen(true);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-blue-500/30 bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 transition-all shadow-sm"
              title="Interactive Platform Tour (EN)"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tour (EN)</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={() => {
                sound.playTone(480, 'sine', 0.08);
                setIsWelcomeModalOpen(true);
              }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-[var(--apple-border)] bg-[var(--apple-surface-secondary)] text-[var(--apple-text-secondary)] hover:text-[var(--apple-text-primary)] hover:border-[var(--apple-border-hover)] transition-all"
              title="View Catalina Gil's Profile"
            >
              <User className="w-3.5 h-3.5" />
              <span>Profile</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setSfxOn(!sfxOn)}
              className="p-2 rounded-full hover:bg-[var(--apple-surface-secondary)] text-[var(--apple-text-secondary)] hover:text-[var(--apple-text-primary)]"
              title="Toggle Tactile Sound FX"
            >
              {sfxOn ? <Volume2 className="w-4 h-4 text-blue-500" /> : <VolumeX className="w-4 h-4" />}
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full hover:bg-[var(--apple-surface-secondary)] text-[var(--apple-text-secondary)] hover:text-[var(--apple-text-primary)]"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-blue-500" />}
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              href="https://cal.com/catalinagil"
              target="_blank"
              rel="noopener noreferrer"
              className="apple-button inline-flex items-center gap-1.5 text-xs py-2 px-3.5"
            >
              <span>Book 15m</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </motion.a>
          </div>
        </div>
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--apple-surface-secondary)] border border-[var(--apple-border)] text-xs font-semibold text-[var(--apple-text-secondary)]">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span>Predictive Selection • BARS Rubrics • Operating Margin Protection</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--apple-text-primary)] leading-[1.08]">
            Talent Acquisition Predictive Science
          </h1>

          <p className="text-sm sm:text-base text-[var(--apple-text-secondary)] max-w-2xl mx-auto leading-relaxed">
            Eliminating subjective guesswork from technical hiring panels. Calibrated Behaviorally Anchored Rating Scales (BARS), n8n workflow automations, and audit-grade decision frameworks.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => scrollTo('interview-tool')}
              className="apple-button flex items-center gap-2 text-xs py-2.5 px-5 font-semibold cursor-pointer"
            >
              <Sliders className="h-4 w-4" />
              <span>Launch BARS Analysis &amp; Report</span>
            </button>
            <button
              onClick={() => scrollTo('interview-cost')}
              className="flex items-center gap-2 text-xs py-2.5 px-5 rounded-full border border-[var(--apple-border)] bg-[var(--apple-surface)] hover:bg-[var(--apple-hover)] text-[var(--apple-text-primary)] font-semibold transition-all shadow-sm cursor-pointer"
            >
              <DollarSign className="h-4 w-4 text-amber-500" />
              <span>Simulate P&amp;L Bleed Cost</span>
            </button>
          </div>
        </section>

        {/* 1. TALENT SCIENCE OVERVIEW & CASE STUDIES */}
        <TalentScienceOverview />

        {/* 2. THE CORE TOOL: INTERVIEW AND ANALYSIS TOOL */}
        <InterviewAnalysisTool onShowToast={showToast} />

        {/* 3. COST OF INEFFICIENT INTERVIEWING CALCULATOR */}
        <InefficientInterviewingCalculator />

        {/* 4. ABOUT ME / HOJA DE VIDA SECTION */}
        <AboutMeSection />

        {/* 5. PLAYBOOK DOWNLOAD GATED RESOURCE */}
        <PlaybookDownloadSection onShowToast={showToast} />

        {/* 6. NEWSLETTER / MARKET SIGNALS FEED */}
        <NewsletterSection />

        {/* Apple-Style Minimalist Footer */}
        <footer className="pt-8 border-t border-[var(--apple-border)] text-xs text-[var(--apple-text-secondary)] space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <strong className="text-[var(--apple-text-primary)] font-semibold">Catalina Gil Sierra</strong> • Lead TA & Psychometric Systems Architect (USBMED)
              <div className="text-[11px] text-[var(--apple-text-tertiary)] mt-0.5">
                Predictive Talent Systems, n8n Orchestrations & Objective BARS Frameworks
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <a
                href="https://www.linkedin.com/in/catalinagilpeopleops"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500 flex items-center gap-0.5"
              >
                <span>LinkedIn</span>
                <ChevronRight className="w-3 h-3" />
              </a>
              <a
                href="https://docs.google.com/document/d/1LFZOGBt049Cw7poC0fcgHkFuszylslldqMNAUYQO-eg/edit"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500 flex items-center gap-0.5"
              >
                <span>Lead CV</span>
                <ChevronRight className="w-3 h-3" />
              </a>
              <a
                href="https://docs.google.com/document/d/1NyrhrXB_HySO9egpYThS5MJuVfiH3X2BehcRAJiqOVg/edit"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500 flex items-center gap-0.5"
              >
                <span>Full-Cycle CV</span>
                <ChevronRight className="w-3 h-3" />
              </a>
              <a
                href="mailto:info@catagil.com"
                className="text-blue-500 font-semibold hover:underline"
              >
                info@catagil.com
              </a>
            </div>
          </div>
        </footer>

        {/* Welcome Modal */}
        <WelcomeModal
          isOpen={isWelcomeModalOpen}
          onClose={() => {
            setIsWelcomeModalOpen(false);
            localStorage.setItem('talentlens_welcomed', 'true');
          }}
          onSelectAction={(tab) => {
            if (tab === 'converter') scrollTo('interview-tool');
            else if (tab === 'calculator') scrollTo('interview-cost');
            else scrollTo('talent-science');
          }}
          onStartTour={() => {
            setIsTourOpen(true);
          }}
        />

        {/* Guided Tour Modal */}
        <GuidedTourModal
          isOpen={isTourOpen}
          onClose={() => setIsTourOpen(false)}
          onSwitchTab={(tab) => {
            if (tab === 'converter') scrollTo('interview-tool');
            else if (tab === 'calculator') scrollTo('interview-cost');
            else scrollTo('talent-science');
          }}
        />

      </motion.main>
    </div>
  );
}

export default App;
