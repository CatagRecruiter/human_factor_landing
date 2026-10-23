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
  Shuffle, 
  Scale, 
  Plus, 
  Trash2, 
  DollarSign, 
  Users, 
  AlertTriangle, 
  ArrowUpRight,
  ChevronRight
} from 'lucide-react';
import { ROLE_TEMPLATES, SkillCriterion, CandidateEntry, calculateFit, calculatePnL } from './lib/engine';
import { sound } from './lib/sound';
import { NumberTicker } from './components/NumberTicker';

export function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [sfxOn, setSfxOn] = useState<boolean>(true);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Spotlight mouse coordinates
  const [mousePos, setMousePos] = useState({ x: 50, y: 30 });

  // View Modes: Split Cockpit (All Live), 1. Fit % Converter, 2. Bad-Hire P&L
  const [activeTab, setActiveTab] = useState<'all' | 'converter' | 'calculator'>('all');

  // Role Templates & Evaluation
  const [selectedRole, setSelectedRole] = useState<'tech' | 'product' | 'sales' | 'ops'>('tech');
  const [criteria, setCriteria] = useState<SkillCriterion[]>(() => JSON.parse(JSON.stringify(ROLE_TEMPLATES.tech)));
  const [activeCandidate, setActiveCandidate] = useState<string>('Alex Rivera');
  
  // Arena Candidates List
  const [candidates, setCandidates] = useState<CandidateEntry[]>([
    { name: "Alex Rivera", score: 4.70, fit: 92.5, status: "HIRE", color: "var(--apple-green)" },
    { name: "Jordan Lee", score: 3.80, fit: 70.0, status: "CALIBRATE", color: "var(--apple-amber)" },
    { name: "Taylor Smith", score: 2.30, fit: 32.5, status: "PASS", color: "var(--apple-red)" }
  ]);
  const [calibrationsCount, setCalibrationsCount] = useState<number>(3);

  // P&L Parameters
  const [salary, setSalary] = useState<number>(80000);
  const [hires, setHires] = useState<number>(12);
  const [failRate, setFailRate] = useState<number>(20);
  const [feeRate, setFeeRate] = useState<number>(22);

  // Leads
  const [leadEmail, setLeadEmail] = useState<string>('');
  const [honeypot, setHoneypot] = useState<string>('');
  const [leadLoading, setLeadLoading] = useState<boolean>(false);
  const [leadSuccess, setLeadSuccess] = useState<boolean>(false);

  // Dynamic Engine Calculations
  const fitResults = calculateFit(criteria);
  const pnlResults = calculatePnL(salary, hires, failRate, feeRate);

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

  const handleRoleChange = (role: 'tech' | 'product' | 'sales' | 'ops') => {
    sound.playTone(560, 'triangle');
    setSelectedRole(role);
    setCriteria(JSON.parse(JSON.stringify(ROLE_TEMPLATES[role])));
    showToast(`Loaded ${role.toUpperCase()} rubric!`);
  };

  const updateScore = (index: number, score: number) => {
    const next = [...criteria];
    next[index].score = score;
    setCriteria(next);
    sound.playTone(score === 5 ? 680 : score === 3 ? 480 : 280, 'triangle');
  };

  const updateWeight = (index: number, weight: number) => {
    const next = [...criteria];
    next[index].weight = weight;
    setCriteria(next);
    sound.playTone(420, 'sine', 0.03);
  };

  const autoBalanceWeights = () => {
    const total = criteria.reduce((sum, c) => sum + (Number(c.weight) || 0), 0);
    if (total === 0) return;
    let running = 0;
    const next = criteria.map((c, i) => {
      if (i === criteria.length - 1) {
        return { ...c, weight: Math.max(5, 100 - running) };
      }
      const w = Math.round(((c.weight / total) * 100) / 5) * 5;
      const finalW = Math.max(5, w);
      running += finalW;
      return { ...c, weight: finalW };
    });
    setCriteria(next);
    sound.playChord();
    showToast('Weights normalized to 100%!');
  };

  const simulateWildcard = () => {
    const pool = ["Sofia Chen", "Marcus Vance", "Elena Rostova", "Liam O'Connor", "Mateo Silva", "Priya Patel"];
    const randomName = pool[Math.floor(Math.random() * pool.length)];
    setActiveCandidate(randomName);
    const possibleScores = [1, 3, 5];
    const next = criteria.map(c => ({
      ...c,
      score: possibleScores[Math.floor(Math.random() * possibleScores.length)]
    }));
    setCriteria(next);
    sound.playTone(640, 'sawtooth');
    showToast(`Simulated candidate: ${randomName}`);
  };

  const addCustomSkill = () => {
    setCriteria([
      ...criteria,
      {
        name: `Custom Skill #${criteria.length + 1}`,
        weight: 15,
        q: "Give a specific example with measurable impact.",
        s1: "Vague / no ownership",
        s3: "Meets standard bar",
        s5: "Measurable ROI & autonomy",
        score: 5
      }
    ]);
    sound.playTone(540, 'sine');
  };

  const lockCandidateToArena = () => {
    const name = activeCandidate.trim() || `Candidate #${candidates.length + 1}`;
    const newCand: CandidateEntry = {
      name,
      score: fitResults.rawScore,
      fit: fitResults.fitPct,
      status: fitResults.fitPct >= 80 ? 'HIRE' : fitResults.fitPct >= 50 ? 'CALIBRATE' : 'PASS',
      color: fitResults.fitPct >= 80 ? 'var(--apple-green)' : fitResults.fitPct >= 50 ? 'var(--apple-amber)' : 'var(--apple-red)'
    };

    setCandidates([newCand, ...candidates].sort((a, b) => b.fit - a.fit));
    setCalibrationsCount(prev => prev + 1);
    sound.playChord();

    if (fitResults.fitPct >= 80) {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    }
    showToast(`Locked ${name} (${fitResults.fitPct}% Fit) into Arena!`);
  };

  const exportScorecardMD = () => {
    let md = `# BARS WEIGHTED SCORECARD — ${activeCandidate}\n`;
    md += `**Weighted Fit:** ${fitResults.fitPct}% (${fitResults.rawScore}/5.0) | **Framework:** Catalina Gil Sierra (USBMED)\n\n`;
    criteria.forEach((c, idx) => {
      md += `${idx + 1}. **${c.name}** (Weight: ${c.weight}%) — Score: **${c.score}/5**\n`;
      md += `   - Probe: *"${c.q}"*\n`;
    });
    navigator.clipboard.writeText(md);
    sound.playChord();
    showToast('Scorecard Markdown copied!');
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadEmail || !leadEmail.includes('@')) {
      showToast('Please enter a valid email.');
      return;
    }
    setLeadLoading(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: leadEmail, source: 'bars_framework_download', hp: honeypot })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setLeadSuccess(true);
        sound.playChord();
        confetti({ particleCount: 40, spread: 50, origin: { y: 0.8 } });
        showToast(data.message || "You're on the list!");
      } else {
        showToast(data.error || 'Could not register email.');
      }
    } catch {
      setLeadSuccess(true);
      sound.playChord();
      showToast("You're on the list!");
    } finally {
      setLeadLoading(false);
    }
  };

  const topCandidate = candidates.length > 0 ? candidates[0] : null;

  // Apple Activity Ring Parameters
  const radius = 64;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (fitResults.fitPct / 100) * circumference;

  const getStatusColor = (fit: number) => {
    if (fit >= 80) return 'var(--apple-green)';
    if (fit >= 50) return 'var(--apple-amber)';
    return 'var(--apple-red)';
  };

  return (
    <div 
      className="relative min-h-screen selection:bg-[var(--apple-blue)] selection:text-white pb-16"
      style={{
        '--mouse-x': `${mousePos.x}%`,
        '--mouse-y': `${mousePos.y}%`
      } as React.CSSProperties}
    >
      {/* ALWAYS-ON LIVING CANVAS BACKGROUND (Apple Intelligence Fluid Mesh & Micro-dot Grid) */}
      <div className="living-canvas-container">
        <div className="living-grid-matrix" />
        <div className="living-orb-1" />
        <div className="living-orb-2" />
        <div className="living-orb-3" />
        <div className="ambient-spotlight-beam" />
      </div>

      {/* Floating Dynamic Island Toast */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--apple-surface)] border border-[var(--apple-border)] text-[var(--apple-text-primary)] font-semibold text-xs shadow-2xl"
          >
            <Check className="w-4 h-4 text-[var(--apple-green)]" />
            <span>{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Apple Translucent Frosted Glass Navbar */}
      <header className="sticky top-0 z-40 apple-glass px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 rounded-lg bg-[var(--apple-text-primary)] text-[var(--apple-bg)] flex items-center justify-center font-bold text-sm tracking-tight cursor-default"
            >
              TL
            </motion.div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[var(--apple-text-primary)] text-sm tracking-tight">TalentLens Studio</span>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-[var(--apple-surface-secondary)] text-[var(--apple-text-secondary)] border border-[var(--apple-border)]">
                  WEEK 1 • LIVE TOOL
                </span>
              </div>
              <p className="text-[11px] text-[var(--apple-text-secondary)] hidden sm:block">
                By Catalina Gil Sierra • Psychometrics (USBMED)
              </p>
            </div>
          </div>

          {/* Precision Telemetry HUD */}
          <div className="hidden lg:flex items-center gap-5 px-4 py-1 rounded-full bg-[var(--apple-surface-secondary)] border border-[var(--apple-border)] text-xs">
            <div className="flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-[var(--apple-amber)]" />
              <span className="text-[var(--apple-text-secondary)]">Calibrations:</span>
              <span className="font-semibold text-[var(--apple-text-primary)] t-nums">{calibrationsCount}</span>
            </div>
            <span className="text-[var(--apple-border)]">|</span>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[var(--apple-green)]" />
              <span className="text-[var(--apple-text-secondary)]">P&L Protected:</span>
              <span className="font-semibold text-[var(--apple-green)]">
                <NumberTicker value={pnlResults.netSavings} prefix="$" />
              </span>
            </div>
            <span className="text-[var(--apple-border)]">|</span>
            <div className="flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-[var(--apple-blue)]" />
              <span className="text-[var(--apple-text-secondary)]">Top Fit:</span>
              <span className="font-semibold text-[var(--apple-text-primary)] t-nums">{topCandidate ? `${topCandidate.fit}%` : 'N/A'}</span>
            </div>
          </div>

          {/* Sensory Controls */}
          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setSfxOn(!sfxOn)}
              className="p-2 rounded-full hover:bg-[var(--apple-surface-secondary)] text-[var(--apple-text-secondary)] hover:text-[var(--apple-text-primary)]"
              title="Toggle Tactile Sound FX"
            >
              {sfxOn ? <Volume2 className="w-4 h-4 text-[var(--apple-blue)]" /> : <VolumeX className="w-4 h-4" />}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full hover:bg-[var(--apple-surface-secondary)] text-[var(--apple-text-secondary)] hover:text-[var(--apple-text-primary)]"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-[var(--apple-amber)]" /> : <Moon className="w-4 h-4 text-[var(--apple-blue)]" />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={exportScorecardMD}
              className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[var(--apple-surface-secondary)] hover:bg-[var(--apple-surface-tertiary)] text-[var(--apple-text-primary)] text-xs font-semibold border border-[var(--apple-border)]"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Export MD</span>
            </motion.button>
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              href="https://cal.com"
              target="_blank"
              rel="noopener noreferrer"
              className="apple-button inline-flex items-center gap-1.5"
            >
              <span>Book 15m</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </motion.a>
          </div>
        </div>
      </header>

      {/* Main Experience Space with Staggered Entrance */}
      <motion.main 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.28, 0.11, 0.32, 1] }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12"
      >
        
        {/* Apple-Style Minimalist Narrative Hero */}
        <section className="text-center max-w-4xl mx-auto space-y-4 pt-4 sm:pt-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--apple-surface-secondary)] border border-[var(--apple-border)] text-xs font-semibold text-[var(--apple-text-secondary)]">
            <span className="w-2 h-2 rounded-full bg-[var(--apple-blue)]" />
            <span>Kill Vibe Checks • Quantify Fit % • Stop P&L Bleed</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--apple-text-primary)] leading-[1.08]">
            Interactive Hiring Decision Cockpit
          </h1>
          
          {/* iOS Segmented Control with Shared Layout Sliding Pill */}
          <div className="pt-4 flex justify-center">
            <div className="segmented-control inline-flex items-center p-1 bg-[var(--apple-surface-secondary)] border border-[var(--apple-border)] rounded-full">
              {[
                { id: 'all', label: 'Split Cockpit (All Live)' },
                { id: 'converter', label: '1. Fit % Converter' },
                { id: 'calculator', label: '2. Bad-Hire P&L' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'all' | 'converter' | 'calculator')}
                  className="relative px-4 py-1.5 text-xs font-semibold transition-colors z-10"
                >
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeViewTabPill"
                      className="absolute inset-0 bg-[var(--apple-surface)] rounded-full shadow-sm"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                  <span className={`relative z-20 ${activeTab === tab.id ? 'text-[var(--apple-text-primary)] font-bold' : 'text-[var(--apple-text-secondary)]'}`}>
                    {tab.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* MODULE 1: INTERVIEW ➔ WEIGHTED FIT % CONVERTER + ARENA                   */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'converter') && (
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Criteria & Sliders (7 cols) */}
            <div className="lg:col-span-7 apple-card p-6 sm:p-8 space-y-6">
              
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--apple-border)] pb-4">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-[var(--apple-surface-secondary)] text-[var(--apple-blue)] text-xs font-bold font-mono">
                    TOOL 01
                  </span>
                  <h2 className="text-lg font-bold text-[var(--apple-text-primary)]">Interview ➔ Fit % Converter</h2>
                </div>

                {/* Role Switcher with Shared Layout Sliding Pill */}
                <div className="segmented-control inline-flex items-center p-1 bg-[var(--apple-surface-secondary)] border border-[var(--apple-border)] rounded-full">
                  {(['tech', 'product', 'sales', 'ops'] as const).map(role => (
                    <button
                      key={role}
                      onClick={() => handleRoleChange(role)}
                      className="relative px-3.5 py-1 text-xs font-semibold capitalize transition-colors z-10"
                    >
                      {selectedRole === role && (
                        <motion.div
                          layoutId="activeRoleTabPill"
                          className="absolute inset-0 bg-[var(--apple-surface)] rounded-full shadow-sm"
                          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                        />
                      )}
                      <span className={`relative z-20 ${selectedRole === role ? 'text-[var(--apple-text-primary)] font-bold' : 'text-[var(--apple-text-secondary)]'}`}>
                        {role}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Candidate Info Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-[var(--apple-surface-secondary)] p-3 rounded-2xl border border-[var(--apple-border)]">
                <div className="flex items-center gap-2 flex-grow">
                  <span className="text-xs text-[var(--apple-text-secondary)] font-medium">Candidate:</span>
                  <input
                    type="text"
                    value={activeCandidate}
                    onChange={(e) => setActiveCandidate(e.target.value)}
                    className="bg-[var(--apple-surface)] border border-[var(--apple-border)] focus:border-[var(--apple-blue)] rounded-xl px-3 py-1.5 text-xs font-semibold text-[var(--apple-text-primary)] focus:outline-none w-44 sm:w-52 shadow-sm"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <div className={`px-2.5 py-1 rounded-xl text-xs font-semibold font-mono ${
                    fitResults.totalWeight === 100
                      ? 'bg-[var(--apple-green-bg)] text-[var(--apple-green)]'
                      : 'bg-[var(--apple-amber-bg)] text-[var(--apple-amber)]'
                  }`}>
                    {fitResults.totalWeight === 100 ? 'Weights: 100% ✓' : `Weights: ${fitResults.totalWeight}% ⚠️`}
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={autoBalanceWeights}
                    className="px-2.5 py-1 rounded-xl bg-[var(--apple-surface)] hover:bg-[var(--apple-surface-tertiary)] text-[var(--apple-text-primary)] border border-[var(--apple-border)] text-xs font-semibold flex items-center gap-1 shadow-sm"
                    title="Auto-normalize weights to 100%"
                  >
                    <Scale className="w-3.5 h-3.5 text-[var(--apple-blue)]" />
                    <span>Auto-100%</span>
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={simulateWildcard}
                    className="px-2.5 py-1 rounded-xl bg-[var(--apple-surface)] hover:bg-[var(--apple-surface-tertiary)] text-[var(--apple-text-primary)] border border-[var(--apple-border)] text-xs font-semibold flex items-center gap-1 shadow-sm"
                    title="Simulate random candidate"
                  >
                    <Shuffle className="w-3.5 h-3.5 text-[var(--apple-amber)]" />
                    <span>Wildcard</span>
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={addCustomSkill}
                    className="p-1.5 rounded-xl bg-[var(--apple-surface)] hover:bg-[var(--apple-surface-tertiary)] text-[var(--apple-text-primary)] border border-[var(--apple-border)] shadow-sm"
                    title="Add custom skill"
                  >
                    <Plus className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              {/* BARS Skill Cards */}
              <div className="space-y-4">
                {criteria.map((c, idx) => (
                  <motion.div 
                    layout
                    key={idx} 
                    className="p-4 sm:p-5 rounded-2xl bg-[var(--apple-surface-secondary)] border border-[var(--apple-border)] space-y-3"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5 flex-grow">
                        <span className="w-5 h-5 rounded-md bg-[var(--apple-surface-tertiary)] text-[var(--apple-text-primary)] text-xs font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <input
                          type="text"
                          value={c.name}
                          onChange={(e) => {
                            const next = [...criteria];
                            next[idx].name = e.target.value;
                            setCriteria(next);
                          }}
                          className="bg-transparent border-b border-transparent focus:border-[var(--apple-blue)] text-sm sm:text-base font-bold text-[var(--apple-text-primary)] w-full focus:outline-none"
                        />
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <input
                          type="range"
                          min="5"
                          max="80"
                          step="5"
                          value={c.weight}
                          onChange={(e) => updateWeight(idx, parseInt(e.target.value, 10))}
                          className="w-20 accent-[var(--apple-blue)] cursor-pointer"
                        />
                        <span className="w-10 text-right font-mono text-xs font-bold text-[var(--apple-text-secondary)] t-nums">
                          {c.weight}%
                        </span>
                        <button
                          onClick={() => {
                            if (criteria.length <= 1) {
                              showToast('Keep at least 1 skill criterion!');
                              return;
                            }
                            setCriteria(criteria.filter((_, i) => i !== idx));
                            sound.playTone(300, 'sine');
                          }}
                          className="text-[var(--apple-text-tertiary)] hover:text-[var(--apple-red)] p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Question Probe */}
                    <div className="text-xs text-[var(--apple-text-secondary)] bg-[var(--apple-surface)] px-3.5 py-2.5 rounded-xl border border-[var(--apple-border)] leading-relaxed">
                      <span>"{c.q}"</span>
                    </div>

                    {/* 1-3-5 Objective Grading */}
                    <div className="grid grid-cols-3 gap-2.5">
                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={() => updateScore(idx, 1)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          c.score === 1
                            ? 'bg-[var(--apple-surface)] border-[var(--apple-red)] ring-2 ring-[var(--apple-red-bg)] shadow-sm'
                            : 'bg-[var(--apple-surface)] border-[var(--apple-border)] hover:border-[var(--apple-border-hover)]'
                        }`}
                      >
                        <div className="font-bold text-[var(--apple-red)] text-xs">1 • Alert (0%)</div>
                        <div className="text-[11px] text-[var(--apple-text-secondary)] mt-1 line-clamp-2 leading-tight">{c.s1}</div>
                      </motion.button>

                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={() => updateScore(idx, 3)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          c.score === 3
                            ? 'bg-[var(--apple-surface)] border-[var(--apple-amber)] ring-2 ring-[var(--apple-amber-bg)] shadow-sm'
                            : 'bg-[var(--apple-surface)] border-[var(--apple-border)] hover:border-[var(--apple-border-hover)]'
                        }`}
                      >
                        <div className="font-bold text-[var(--apple-amber)] text-xs">3 • Solid (50%)</div>
                        <div className="text-[11px] text-[var(--apple-text-secondary)] mt-1 line-clamp-2 leading-tight">{c.s3}</div>
                      </motion.button>

                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={() => updateScore(idx, 5)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          c.score === 5
                            ? 'bg-[var(--apple-surface)] border-[var(--apple-green)] ring-2 ring-[var(--apple-green-bg)] shadow-sm'
                            : 'bg-[var(--apple-surface)] border-[var(--apple-border)] hover:border-[var(--apple-border-hover)]'
                        }`}
                      >
                        <div className="font-bold text-[var(--apple-green)] text-xs">5 • Star (100%)</div>
                        <div className="text-[11px] text-[var(--apple-text-secondary)] mt-1 line-clamp-2 leading-tight">{c.s5}</div>
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>

            {/* Apple Activity-Ring Gauge & Arena (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Apple Activity Ring Display */}
              <div className="apple-card p-6 sm:p-8 space-y-6 text-center">
                
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[var(--apple-text-secondary)] uppercase tracking-wider">
                    Live Weighted Fit
                  </span>
                  <div className={`px-2.5 py-1 rounded-full text-xs font-bold font-mono ${
                    fitResults.fitPct >= 80 
                      ? 'bg-[var(--apple-green-bg)] text-[var(--apple-green)]' 
                      : fitResults.fitPct >= 50 
                      ? 'bg-[var(--apple-amber-bg)] text-[var(--apple-amber)]' 
                      : 'bg-[var(--apple-red-bg)] text-[var(--apple-red)]'
                  }`}>
                    {fitResults.verdict}
                  </div>
                </div>

                {/* Circular Activity Ring with Elastic Spring Transition */}
                <div className="relative w-44 h-44 mx-auto flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="88"
                      cy="88"
                      r={radius}
                      stroke="var(--apple-surface-secondary)"
                      strokeWidth={strokeWidth}
                      fill="transparent"
                    />
                    <motion.circle
                      cx="88"
                      cy="88"
                      r={radius}
                      stroke={getStatusColor(fitResults.fitPct)}
                      strokeWidth={strokeWidth}
                      strokeDasharray={circumference}
                      initial={{ strokeDashoffset: circumference }}
                      animate={{ strokeDashoffset }}
                      transition={{ type: 'spring', stiffness: 180, damping: 25 }}
                      strokeLinecap="round"
                      fill="transparent"
                    />
                  </svg>

                  <div className="absolute text-center">
                    <span className="text-4xl font-bold text-[var(--apple-text-primary)] tracking-tight t-nums block">
                      <NumberTicker value={Math.round(fitResults.fitPct)} suffix="%" />
                    </span>
                    <span className="text-xs text-[var(--apple-text-secondary)] font-medium block mt-0.5">
                      {fitResults.rawScore} / 5.0
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={lockCandidateToArena}
                    className="apple-button py-2.5 flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Trophy className="w-3.5 h-3.5" />
                    <span>Lock Into Arena</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={exportScorecardMD}
                    className="py-2.5 px-4 rounded-full bg-[var(--apple-surface-secondary)] hover:bg-[var(--apple-surface-tertiary)] text-[var(--apple-text-primary)] border border-[var(--apple-border)] text-xs font-semibold flex items-center justify-center gap-1.5"
                  >
                    <Copy className="w-3.5 h-3.5 text-[var(--apple-text-secondary)]" />
                    <span>Copy Scorecard</span>
                  </motion.button>
                </div>
              </div>

              {/* iOS-Style Candidate Arena with Fluid List Reordering */}
              <div className="apple-card p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-[var(--apple-border)] pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--apple-text-primary)]">
                    Candidate Arena ({candidates.length})
                  </span>
                  {topCandidate && (
                    <span className="text-xs font-semibold text-[var(--apple-green)]">
                      #1 {topCandidate.name} ({topCandidate.fit}%)
                    </span>
                  )}
                </div>

                <div className="space-y-1 divide-y divide-[var(--apple-border)]">
                  <AnimatePresence>
                    {candidates.map((c, idx) => (
                      <motion.div
                        layout
                        initial={{ opacity: 0, height: 0, y: -10 }}
                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -10 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                        key={c.name}
                        className="flex items-center justify-between py-3 text-xs"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-5 h-5 rounded-full bg-[var(--apple-surface-secondary)] text-[var(--apple-text-secondary)] font-semibold flex items-center justify-center text-[11px]">
                            {idx + 1}
                          </span>
                          <span className="font-semibold text-[var(--apple-text-primary)]">{c.name}</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <span className="text-[var(--apple-text-secondary)] t-nums">{c.score.toFixed(2)}/5</span>
                          <span className={`px-2.5 py-0.5 rounded-full font-bold t-nums ${
                            c.fit >= 80 
                              ? 'text-[var(--apple-green)] bg-[var(--apple-green-bg)]' 
                              : c.fit >= 50 
                              ? 'text-[var(--apple-amber)] bg-[var(--apple-amber-bg)]' 
                              : 'text-[var(--apple-red)] bg-[var(--apple-red-bg)]'
                          }`}>
                            {c.fit}%
                          </span>
                          <motion.button
                            whileTap={{ scale: 0.8 }}
                            onClick={() => {
                              if (candidates.length <= 1) return;
                              setCandidates(candidates.filter(item => item.name !== c.name));
                              sound.playTone(320, 'sine');
                            }}
                            className="text-[var(--apple-text-tertiary)] hover:text-[var(--apple-red)] p-1"
                          >
                            ✕
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

            </div>

          </section>
        )}

        {/* ========================================================================= */}
        {/* MODULE 2: BAD-HIRE P&L BLEED SIMULATOR                                    */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'calculator') && (
          <section className="apple-card p-6 sm:p-10 space-y-8">
            
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--apple-border)] pb-4">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-[var(--apple-surface-secondary)] text-[var(--apple-green)] text-xs font-bold font-mono">
                  TOOL 02
                </span>
                <h2 className="text-xl font-bold text-[var(--apple-text-primary)]">Cost of a Bad Hire (P&L Bleed Simulator)</h2>
              </div>
              <span className="text-xs text-[var(--apple-text-secondary)] font-medium">
                SHRM / HBR Formula • Drag sliders to stress-test P&L
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Sliders Console */}
              <div className="lg:col-span-5 space-y-6 bg-[var(--apple-surface-secondary)] p-6 rounded-2xl border border-[var(--apple-border)]">
                
                <div>
                  <div className="flex justify-between text-xs font-medium mb-2">
                    <span className="text-[var(--apple-text-primary)] flex items-center gap-1.5 font-semibold">
                      <DollarSign className="w-3.5 h-3.5 text-[var(--apple-blue)]" />
                      Avg Base Salary:
                    </span>
                    <span className="text-[var(--apple-blue)] font-bold text-sm">
                      <NumberTicker value={salary} prefix="$" />
                    </span>
                  </div>
                  <input
                    type="range"
                    min="20000"
                    max="250000"
                    step="5000"
                    value={salary}
                    onChange={(e) => {
                      setSalary(parseInt(e.target.value, 10));
                      sound.playTone(380, 'sine', 0.02);
                    }}
                    className="w-full accent-[var(--apple-blue)] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium mb-2">
                    <span className="text-[var(--apple-text-primary)] flex items-center gap-1.5 font-semibold">
                      <Users className="w-3.5 h-3.5 text-[var(--apple-blue)]" />
                      Annual Hires:
                    </span>
                    <span className="text-[var(--apple-blue)] font-bold text-sm">
                      {hires} {hires === 1 ? 'Hire' : 'Hires'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    step="1"
                    value={hires}
                    onChange={(e) => {
                      setHires(parseInt(e.target.value, 10));
                      sound.playTone(380, 'sine', 0.02);
                    }}
                    className="w-full accent-[var(--apple-blue)] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium mb-2">
                    <span className="text-[var(--apple-text-primary)] flex items-center gap-1.5 font-semibold">
                      <AlertTriangle className="w-3.5 h-3.5 text-[var(--apple-red)]" />
                      90-Day Fail Rate (Vibe Check):
                    </span>
                    <span className="text-[var(--apple-red)] font-bold t-nums text-sm">
                      {failRate}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    step="5"
                    value={failRate}
                    onChange={(e) => {
                      setFailRate(parseInt(e.target.value, 10));
                      sound.playTone(380, 'sine', 0.02);
                    }}
                    className="w-full accent-[var(--apple-red)] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium mb-2">
                    <span className="text-[var(--apple-text-primary)] flex items-center gap-1.5 font-semibold">
                      Agency / Replacement Fee:
                    </span>
                    <span className="text-[var(--apple-amber)] font-bold t-nums text-sm">
                      {feeRate}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    step="2"
                    value={feeRate}
                    onChange={(e) => {
                      setFeeRate(parseInt(e.target.value, 10));
                      sound.playTone(380, 'sine', 0.02);
                    }}
                    className="w-full accent-[var(--apple-amber)] cursor-pointer"
                  />
                </div>

              </div>

              {/* Tesla-Style Big Stat Callouts with Number Ticker */}
              <div className="lg:col-span-7 space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  
                  <div className="p-5 rounded-2xl bg-[var(--apple-surface-secondary)] border border-[var(--apple-border)] text-center space-y-1">
                    <span className="text-xs font-medium text-[var(--apple-text-secondary)] uppercase block">1 Bad Hire Costs</span>
                    <div className="text-3xl font-bold text-[var(--apple-red)] tracking-tight">
                      <NumberTicker value={pnlResults.costPerBadHire} prefix="$" />
                    </div>
                    <span className="text-[11px] text-[var(--apple-text-secondary)] block">Salary + Ramp + Fee</span>
                  </div>

                  <div className="p-5 rounded-2xl bg-[var(--apple-surface-secondary)] border border-[var(--apple-border)] text-center space-y-1">
                    <span className="text-xs font-medium text-[var(--apple-text-secondary)] uppercase block">Annual P&L Bleed</span>
                    <div className="text-3xl font-bold text-[var(--apple-amber)] tracking-tight">
                      <NumberTicker value={pnlResults.annualBleed} prefix="$" />
                    </div>
                    <span className="text-[11px] text-[var(--apple-text-secondary)] block">
                      {pnlResults.badHiresCount} failed hires/yr
                    </span>
                  </div>

                  <div className="p-5 rounded-2xl bg-[var(--apple-green-bg)] border border-[var(--apple-green)] text-center space-y-1">
                    <span className="text-xs font-bold text-[var(--apple-green)] uppercase block">
                      BARS Net Savings
                    </span>
                    <div className="text-3xl font-bold text-[var(--apple-green)] tracking-tight">
                      <NumberTicker value={pnlResults.netSavings} prefix="$" />
                    </div>
                    <span className="text-[11px] text-[var(--apple-green)] font-medium block">Cuts fail rate to 4%</span>
                  </div>

                </div>

                {/* Minimalist Comparison Bars */}
                <div className="p-5 rounded-2xl bg-[var(--apple-surface-secondary)] border border-[var(--apple-border)] space-y-4">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs text-[var(--apple-text-primary)] mb-1 font-semibold">
                        <span>Unstructured Vibe-Check Bleed</span>
                        <NumberTicker value={pnlResults.annualBleed} prefix="$" />
                      </div>
                      <div className="w-full bg-[var(--apple-surface)] h-2.5 rounded-full overflow-hidden border border-[var(--apple-border)]">
                        <motion.div 
                          className="bg-[var(--apple-red)] h-full rounded-full w-full"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.6 }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-[var(--apple-text-primary)] mb-1 font-semibold">
                        <span>Calibrated BARS Process (4% Fail)</span>
                        <NumberTicker value={pnlResults.calibratedBleed} prefix="$" />
                      </div>
                      <div className="w-full bg-[var(--apple-surface)] h-2.5 rounded-full overflow-hidden border border-[var(--apple-border)]">
                        <motion.div
                          className="bg-[var(--apple-green)] h-full rounded-full"
                          animate={{
                            width: `${Math.max(5, (pnlResults.calibratedBleed / (pnlResults.annualBleed || 1)) * 100)}%`
                          }}
                          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </section>
        )}

        {/* Apple-Style Minimalist Waitlist Card */}
        <section className="apple-card p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-bold tracking-tight text-[var(--apple-text-primary)]">
              Join the waitlist for the BARS Rubric Framework.
            </h3>
            <p className="text-sm text-[var(--apple-text-secondary)] max-w-xl leading-relaxed">
              Receive the complete structured interview guide, scoring criteria, and executive hiring metrics ready for your team.
            </p>
          </div>

          {leadSuccess ? (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="px-6 py-3 rounded-full bg-[var(--apple-green-bg)] text-[var(--apple-green)] font-semibold text-xs flex items-center gap-2 border border-[var(--apple-green)]"
            >
              <Check className="w-4 h-4" />
              <span>You're on the list.</span>
            </motion.div>
          ) : (
            <form onSubmit={handleLeadSubmit} className="flex items-center gap-3 w-full md:w-auto relative">
              <input
                type="text"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
              />
              <input
                type="email"
                required
                value={leadEmail}
                onChange={(e) => setLeadEmail(e.target.value)}
                placeholder="name@company.com"
                className="bg-[var(--apple-surface)] border border-[var(--apple-border)] rounded-full px-4 py-2.5 text-xs text-[var(--apple-text-primary)] focus:outline-none focus:border-[var(--apple-blue)] w-full sm:w-64"
              />
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={leadLoading}
                className="apple-button whitespace-nowrap disabled:opacity-50"
              >
                {leadLoading ? '...' : 'Notify Me'}
              </motion.button>
            </form>
          )}
        </section>

        {/* Minimal Apple-Style Footer */}
        <footer className="pt-8 border-t border-[var(--apple-border)] text-xs text-[var(--apple-text-secondary)] space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <strong className="text-[var(--apple-text-primary)] font-semibold">Catalina Gil Sierra</strong> • Lead TA & Psychometric Systems Architect (USBMED)
              <div className="text-[11px] text-[var(--apple-text-tertiary)] mt-0.5">
                ⏳ Coming Next Week: n8n Workflow Simulator & Funnel Bottleneck Diagnostic
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <a
                href="https://www.linkedin.com/in/catalinagilpeopleops"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--apple-blue)] flex items-center gap-0.5"
              >
                <span>LinkedIn</span>
                <ChevronRight className="w-3 h-3" />
              </a>
              <a
                href="https://docs.google.com/document/d/1LFZOGBt049Cw7poC0fcgHkFuszylslldqMNAUYQO-eg/edit"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--apple-blue)] flex items-center gap-0.5"
              >
                <span>Lead CV</span>
                <ChevronRight className="w-3 h-3" />
              </a>
              <a
                href="https://docs.google.com/document/d/1NyrhrXB_HySO9egpYThS5MJuVfiH3X2BehcRAJiqOVg/edit"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--apple-blue)] flex items-center gap-0.5"
              >
                <span>Full-Cycle CV</span>
                <ChevronRight className="w-3 h-3" />
              </a>
              <a
                href="mailto:catagil91@gmail.com"
                className="text-[var(--apple-blue)] font-semibold hover:underline"
              >
                catagil91@gmail.com
              </a>
            </div>
          </div>
        </footer>

      </motion.main>
    </div>
  );
}
export default App;
