import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
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
  ExternalLink, 
  Shuffle, 
  Scale, 
  Plus, 
  Trash2, 
  TrendingDown, 
  DollarSign, 
  Users, 
  AlertTriangle,
  FileSpreadsheet,
  FileText,
  Sparkles,
  Award
} from 'lucide-react';
import { ROLE_TEMPLATES, SkillCriterion, CandidateEntry, calculateFit, calculatePnL } from './lib/engine';
import { sound } from './lib/sound';

export function App() {
  // Theme state: Defaulting to 2026 Pearl Studio (Light) for optical warmth & neuroaesthetic appeal
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [sfxOn, setSfxOn] = useState<boolean>(true);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Cockpit View Modes
  const [activeTab, setActiveTab] = useState<'all' | 'converter' | 'calculator'>('all');

  // Module 1: Fit % State
  const [selectedRole, setSelectedRole] = useState<'tech' | 'product' | 'sales' | 'ops'>('tech');
  const [criteria, setCriteria] = useState<SkillCriterion[]>(() => JSON.parse(JSON.stringify(ROLE_TEMPLATES.tech)));
  const [activeCandidate, setActiveCandidate] = useState<string>('Alex Rivera');
  
  // Candidates Arena
  const [candidates, setCandidates] = useState<CandidateEntry[]>([
    { name: "Alex Rivera", score: 4.70, fit: 92.5, status: "HIRE", color: "var(--accent-emerald)" },
    { name: "Jordan Lee", score: 3.80, fit: 70.0, status: "CALIBRATE", color: "var(--accent-amber)" },
    { name: "Taylor Smith", score: 2.30, fit: 32.5, status: "PASS", color: "var(--accent-rose)" }
  ]);
  const [calibrationsCount, setCalibrationsCount] = useState<number>(3);

  // Module 2: P&L Simulator State
  const [salary, setSalary] = useState<number>(80000);
  const [hires, setHires] = useState<number>(12);
  const [failRate, setFailRate] = useState<number>(20);
  const [feeRate, setFeeRate] = useState<number>(22);

  // Lead Capture State
  const [leadEmail, setLeadEmail] = useState<string>('');
  const [honeypot, setHoneypot] = useState<string>('');
  const [leadLoading, setLeadLoading] = useState<boolean>(false);
  const [leadSuccess, setLeadSuccess] = useState<boolean>(false);

  // Computed Values
  const fitResults = calculateFit(criteria);
  const pnlResults = calculatePnL(salary, hires, failRate, feeRate);

  // Sync Theme attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Sound sync
  useEffect(() => {
    sound.enabled = sfxOn;
  }, [sfxOn]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const handleRoleChange = (role: 'tech' | 'product' | 'sales' | 'ops') => {
    sound.playTone(560, 'triangle');
    setSelectedRole(role);
    setCriteria(JSON.parse(JSON.stringify(ROLE_TEMPLATES[role])));
    showToast(`Loaded ${role.toUpperCase()} rubric template!`);
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
    showToast('Normalized weights to exactly 100%!');
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
        name: `Strategic Skill #${criteria.length + 1}`,
        weight: 15,
        q: "Demonstrated measurable ROI and end-to-end execution under pressure?",
        s1: "Vague explanations / no metrics",
        s3: "Meets standard process requirements",
        s5: "Autonomous leadership, 0-to-1 impact",
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
      color: fitResults.fitPct >= 80 ? 'var(--accent-emerald)' : fitResults.fitPct >= 50 ? 'var(--accent-amber)' : 'var(--accent-rose)'
    };

    setCandidates([newCand, ...candidates].sort((a, b) => b.fit - a.fit));
    setCalibrationsCount(prev => prev + 1);
    sound.playChord();

    if (fitResults.fitPct >= 80) {
      confetti({
        particleCount: 55,
        spread: 65,
        origin: { y: 0.6 }
      });
    }
    showToast(`Locked ${name} (${fitResults.fitPct}% Fit) into Arena!`);
  };

  const copyScorecardMD = () => {
    let md = `# BARS WEIGHTED SCORECARD — ${activeCandidate}\n`;
    md += `**Weighted Fit:** ${fitResults.fitPct}% (${fitResults.rawScore}/5.0) | **Verdict:** ${fitResults.verdict}\n`;
    md += `**Framework:** Catalina Gil Sierra (USBMED Psychometrics)\n\n`;
    criteria.forEach((c, idx) => {
      md += `${idx + 1}. **${c.name}** (Weight: ${c.weight}%) — Grade: **${c.score}/5**\n`;
      md += `   - Probe: *"${c.q}"*\n`;
    });
    navigator.clipboard.writeText(md);
    sound.playChord();
    showToast('Scorecard Markdown copied to clipboard!');
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadEmail || !leadEmail.includes('@')) {
      showToast('Please enter a valid business email.');
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
        confetti({ particleCount: 45, spread: 55, origin: { y: 0.8 } });
        showToast(data.message || "You're on the list!");
      } else {
        showToast(data.error || 'Could not register email.');
      }
    } catch {
      setLeadSuccess(true);
      sound.playChord();
      showToast("You're on the list! (Saved locally)");
    } finally {
      setLeadLoading(false);
    }
  };

  const topCandidate = candidates.length > 0 ? candidates[0] : null;

  // SVG Radial Gauge Geometry
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (fitResults.fitPct / 100) * circumference;

  return (
    <div className="relative min-h-screen">
      {/* 2026 Ambient Chromatic Aurora */}
      <div className="aurora-bg">
        <div className="aurora-blob-1" />
        <div className="aurora-blob-2" />
      </div>

      {/* Floating Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[var(--accent-emerald)] text-white font-black text-xs font-mono shadow-2xl animate-bounce">
          <Check className="w-4 h-4 stroke-[3]" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* 2026 Refractive Glass Floating Island Header */}
      <header className="sticky top-4 z-40 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prismatic-glass rounded-2xl px-5 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[var(--accent-primary)] to-[var(--accent-emerald)] flex items-center justify-center font-black text-white text-base shadow-md">
              TL
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-[var(--text-heading)] text-base tracking-tight">TalentLens Studio</span>
                <span className="px-2 py-0.5 text-[10px] font-mono font-black rounded-full bg-[var(--accent-emerald-bg)] text-[var(--accent-emerald)] border border-[var(--border-subtle)]">
                  PEARL STUDIO v2.6
                </span>
              </div>
              <p className="text-xs text-[var(--text-muted)] font-mono hidden sm:block">
                Catalina Gil Sierra • Psychometric Systems Architect
              </p>
            </div>
          </div>

          {/* Realtime KPI Telemetry */}
          <div className="hidden md:flex items-center gap-4 px-4 py-1.5 rounded-xl bg-[var(--surface-sunken)] border border-[var(--border-subtle)] font-mono text-xs">
            <div className="flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-[var(--accent-amber)]" />
              <span className="text-[var(--text-muted)]">Calibrations:</span>
              <span className="font-black text-[var(--text-heading)] t-nums">{calibrationsCount}</span>
            </div>
            <span className="text-[var(--border-subtle)]">|</span>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[var(--accent-emerald)]" />
              <span className="text-[var(--text-muted)]">P&L Protected:</span>
              <span className="font-black text-[var(--accent-emerald)] t-nums">${pnlResults.netSavings.toLocaleString()}</span>
            </div>
            <span className="text-[var(--border-subtle)]">|</span>
            <div className="flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-[var(--accent-primary)]" />
              <span className="text-[var(--text-muted)]">Top Fit:</span>
              <span className="font-black text-[var(--text-heading)] t-nums">{topCandidate ? `${topCandidate.fit}%` : 'N/A'}</span>
            </div>
          </div>

          {/* Quick Sensory & Action Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSfxOn(!sfxOn)}
              className="p-2.5 rounded-xl bg-[var(--surface-elevated)] hover:bg-[var(--surface-sunken)] text-[var(--text-heading)] border border-[var(--border-subtle)] tap-spring"
              title="Toggle Web Audio SFX"
            >
              {sfxOn ? <Volume2 className="w-4 h-4 text-[var(--accent-primary)]" /> : <VolumeX className="w-4 h-4 text-[var(--text-muted)]" />}
            </button>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2.5 rounded-xl bg-[var(--surface-elevated)] hover:bg-[var(--surface-sunken)] text-[var(--text-heading)] border border-[var(--border-subtle)] tap-spring"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-[var(--accent-amber)]" /> : <Moon className="w-4 h-4 text-[var(--accent-primary)]" />}
            </button>
            <button
              onClick={copyScorecardMD}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--surface-elevated)] hover:bg-[var(--surface-sunken)] text-[var(--text-heading)] border border-[var(--border-subtle)] text-xs font-mono font-bold tap-spring"
            >
              <Copy className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
              <span>Export MD</span>
            </button>
            <a
              href="mailto:catagil91@gmail.com"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-emerald)] text-white font-black text-xs font-mono shadow-md tap-spring"
            >
              <span>Book 15m</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Command Space */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Tactical Hero & Mode Segmented Selector */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 prismatic-glass rounded-3xl p-7">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[var(--accent-primary)] font-bold uppercase tracking-wider">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-emerald)] animate-ping" />
              <span>Kill Vibe Checks • Quantify Fit % • Stop P&L Bleed</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-[var(--text-heading)] tracking-tight">
              Interactive Hiring Decision Cockpit
            </h1>
            <p className="text-sm sm:text-base text-[var(--text-body)] max-w-2xl font-medium leading-relaxed">
              Convert subjective interviews into weighted psychometric proof points and simulate the direct financial impact on executive P&L.
            </p>
          </div>

          {/* Segmented View Switcher */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold tap-spring transition-all ${
                activeTab === 'all'
                  ? 'bg-[var(--accent-primary)] text-white shadow-md'
                  : 'bg-[var(--surface-sunken)] text-[var(--text-heading)] border border-[var(--border-subtle)] hover:border-[var(--accent-primary)]'
              }`}
            >
              ⚡ Split Cockpit (All Live)
            </button>
            <button
              onClick={() => setActiveTab('converter')}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold tap-spring transition-all ${
                activeTab === 'converter'
                  ? 'bg-[var(--accent-primary)] text-white shadow-md'
                  : 'bg-[var(--surface-sunken)] text-[var(--text-heading)] border border-[var(--border-subtle)] hover:border-[var(--accent-primary)]'
              }`}
            >
              🎯 1. Fit % Converter
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold tap-spring transition-all ${
                activeTab === 'calculator'
                  ? 'bg-[var(--accent-primary)] text-white shadow-md'
                  : 'bg-[var(--surface-sunken)] text-[var(--text-heading)] border border-[var(--border-subtle)] hover:border-[var(--accent-primary)]'
              }`}
            >
              💰 2. Bad-Hire P&L Bleed
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MODULE 1: INTERVIEW ➔ WEIGHTED FIT % CONVERTER + ARENA                   */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'converter') && (
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Criteria & Sliders (7 cols) */}
            <div className="lg:col-span-7 prismatic-glass rounded-3xl p-6 sm:p-7 space-y-6">
              
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-5">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-1 rounded-xl bg-[var(--accent-primary)] text-white font-mono text-xs font-black">
                    MODULE 01
                  </span>
                  <h2 className="text-lg font-black text-[var(--text-heading)]">Interview ➔ Fit % Converter</h2>
                </div>

                {/* Role Pill Switcher */}
                <div className="flex flex-wrap gap-2">
                  {(['tech', 'product', 'sales', 'ops'] as const).map(role => (
                    <button
                      key={role}
                      onClick={() => handleRoleChange(role)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold capitalize tap-spring transition-all ${
                        selectedRole === role
                          ? 'bg-[var(--accent-primary)] text-white font-black shadow-sm'
                          : 'bg-[var(--surface-sunken)] text-[var(--text-heading)] border border-[var(--border-subtle)] hover:border-[var(--accent-primary)]'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              {/* Candidate Info + Fast Utilities */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-[var(--surface-sunken)] p-4 rounded-2xl border border-[var(--border-subtle)]">
                <div className="flex items-center gap-2.5 flex-grow">
                  <span className="text-xs font-mono text-[var(--text-muted)] font-bold">👤 Candidate:</span>
                  <input
                    type="text"
                    value={activeCandidate}
                    onChange={(e) => setActiveCandidate(e.target.value)}
                    className="bg-[var(--surface-card)] border border-[var(--border-subtle)] focus:border-[var(--accent-primary)] rounded-xl px-3 py-1.5 text-xs font-bold text-[var(--text-heading)] font-mono focus:outline-none w-44 sm:w-56"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <div className={`px-3 py-1.5 rounded-xl border font-mono text-xs font-black ${
                    fitResults.totalWeight === 100
                      ? 'bg-[var(--accent-emerald-bg)] text-[var(--accent-emerald)] border-[var(--accent-emerald)]'
                      : 'bg-[var(--accent-amber-bg)] text-[var(--accent-amber)] border-[var(--accent-amber)]'
                  }`}>
                    {fitResults.totalWeight === 100 ? 'Weights: 100% ✓' : `Weights: ${fitResults.totalWeight}% ⚠️`}
                  </div>
                  <button
                    onClick={autoBalanceWeights}
                    className="px-3 py-1.5 rounded-xl bg-[var(--surface-card)] hover:bg-[var(--surface-elevated)] text-[var(--text-heading)] border border-[var(--border-subtle)] font-mono text-xs font-bold tap-spring flex items-center gap-1.5"
                    title="Auto-normalize all criteria weights to 100%"
                  >
                    <Scale className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                    <span>Auto-100%</span>
                  </button>
                  <button
                    onClick={simulateWildcard}
                    className="px-3 py-1.5 rounded-xl bg-[var(--surface-card)] hover:bg-[var(--surface-elevated)] text-[var(--text-heading)] border border-[var(--border-subtle)] font-mono text-xs font-bold tap-spring flex items-center gap-1.5"
                    title="Simulate random candidate"
                  >
                    <Shuffle className="w-3.5 h-3.5 text-[var(--accent-amber)]" />
                    <span>Wildcard</span>
                  </button>
                  <button
                    onClick={addCustomSkill}
                    className="p-1.5 rounded-xl bg-[var(--surface-card)] hover:bg-[var(--surface-elevated)] text-[var(--text-heading)] border border-[var(--border-subtle)] tap-spring"
                    title="Add custom evaluation skill"
                  >
                    <Plus className="w-4 h-4 text-[var(--accent-primary)]" />
                  </button>
                </div>
              </div>

              {/* Dynamic BARS Skill Cards with High-Contrast Typography */}
              <div className="space-y-4">
                {criteria.map((c, idx) => (
                  <div key={idx} className="prismatic-elevated p-5 rounded-2xl border border-[var(--border-subtle)] space-y-3.5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5 flex-grow">
                        <span className="w-6 h-6 rounded-lg bg-[var(--accent-primary)] text-white font-mono text-xs font-black flex items-center justify-center shrink-0">
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
                          className="bg-transparent border-b border-transparent focus:border-[var(--accent-primary)] text-base font-black text-[var(--text-heading)] w-full focus:outline-none"
                        />
                      </div>

                      <div className="flex items-center gap-2.5 shrink-0">
                        <input
                          type="range"
                          min="5"
                          max="80"
                          step="5"
                          value={c.weight}
                          onChange={(e) => updateWeight(idx, parseInt(e.target.value, 10))}
                          className="w-20 accent-[var(--accent-primary)] cursor-pointer"
                        />
                        <span className="w-12 text-right font-mono text-xs font-black text-[var(--accent-primary)] t-nums">
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
                          className="text-[var(--text-muted)] hover:text-[var(--accent-rose)] p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Luminous Probe Question */}
                    <div className="text-xs sm:text-sm font-mono text-[var(--text-heading)] bg-[var(--surface-sunken)] px-4 py-2.5 rounded-xl border border-[var(--border-subtle)] font-semibold leading-relaxed">
                      <span>💬 "{c.q}"</span>
                    </div>

                    {/* 1-3-5 Tactile Mechanical Buttons */}
                    <div className="grid grid-cols-3 gap-2.5">
                      <button
                        onClick={() => updateScore(idx, 1)}
                        className={`key-mechanical p-3 rounded-xl border text-left transition-all ${
                          c.score === 1
                            ? 'bg-[var(--accent-rose-bg)] border-[var(--accent-rose)] shadow-md'
                            : 'bg-[var(--surface-card)] border-[var(--border-subtle)] hover:border-[var(--accent-rose)]'
                        }`}
                      >
                        <div className="font-mono font-black text-[var(--accent-rose)] text-xs">1 • Alert (0%)</div>
                        <div className="text-xs text-[var(--text-body)] mt-1 font-medium leading-snug">{c.s1}</div>
                      </button>

                      <button
                        onClick={() => updateScore(idx, 3)}
                        className={`key-mechanical p-3 rounded-xl border text-left transition-all ${
                          c.score === 3
                            ? 'bg-[var(--accent-amber-bg)] border-[var(--accent-amber)] shadow-md'
                            : 'bg-[var(--surface-card)] border-[var(--border-subtle)] hover:border-[var(--accent-amber)]'
                        }`}
                      >
                        <div className="font-mono font-black text-[var(--accent-amber)] text-xs">3 • Solid (50%)</div>
                        <div className="text-xs text-[var(--text-body)] mt-1 font-medium leading-snug">{c.s3}</div>
                      </button>

                      <button
                        onClick={() => updateScore(idx, 5)}
                        className={`key-mechanical p-3 rounded-xl border text-left transition-all ${
                          c.score === 5
                            ? 'bg-[var(--accent-emerald-bg)] border-[var(--accent-emerald)] shadow-md'
                            : 'bg-[var(--surface-card)] border-[var(--border-subtle)] hover:border-[var(--accent-emerald)]'
                        }`}
                      >
                        <div className="font-mono font-black text-[var(--accent-emerald)] text-xs">5 • Star (100%)</div>
                        <div className="text-xs text-[var(--text-body)] mt-1 font-medium leading-snug">{c.s5}</div>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Live Radial Gauge & Arena Benchmark (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* 2026 Radial Fit Gauge Card */}
              <div className="prismatic-glass rounded-3xl p-6 border border-[var(--border-active)] space-y-6">
                
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[var(--text-muted)] font-black uppercase tracking-wider block">
                    Telemetry Analysis
                  </span>
                  <div className={`px-3 py-1 rounded-xl border font-mono font-black text-xs ${
                    fitResults.fitPct >= 80 
                      ? 'bg-[var(--accent-emerald-bg)] text-[var(--accent-emerald)] border-[var(--accent-emerald)]' 
                      : fitResults.fitPct >= 50 
                      ? 'bg-[var(--accent-amber-bg)] text-[var(--accent-amber)] border-[var(--accent-amber)]' 
                      : 'bg-[var(--accent-rose-bg)] text-[var(--accent-rose)] border-[var(--accent-rose)]'
                  }`}>
                    {fitResults.verdict}
                  </div>
                </div>

                {/* SVG Radial Gauge Display */}
                <div className="flex items-center justify-center gap-6">
                  <div className="relative w-36 h-36 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="72"
                        cy="72"
                        r={radius}
                        stroke="var(--border-subtle)"
                        strokeWidth="11"
                        fill="transparent"
                      />
                      <circle
                        cx="72"
                        cy="72"
                        r={radius}
                        stroke="url(#radialGradient)"
                        strokeWidth="11"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        fill="transparent"
                        className="transition-all duration-500 ease-out"
                      />
                      <defs>
                        <linearGradient id="radialGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="var(--accent-primary)" />
                          <stop offset="100%" stopColor="var(--accent-emerald)" />
                        </linearGradient>
                      </defs>
                    </svg>

                    <div className="absolute text-center">
                      <span className="text-3xl font-black text-[var(--text-heading)] font-mono tracking-tight t-nums block">
                        {fitResults.fitPct}%
                      </span>
                      <span className="text-[11px] font-mono text-[var(--accent-primary)] font-black block mt-0.5">
                        {fitResults.rawScore} / 5.0
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[var(--accent-emerald)]" />
                      <span className="text-[var(--text-heading)] font-black">BARS Calibrated</span>
                    </div>
                    <div className="text-[var(--text-body)] text-xs font-medium leading-relaxed">
                      Eliminates rater bias and standardizes multi-round grading across interview panels.
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={lockCandidateToArena}
                    className="py-3 px-4 rounded-xl bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-emerald)] text-white font-black text-xs font-mono shadow-md tap-spring flex items-center justify-center gap-2"
                  >
                    <Trophy className="w-4 h-4" />
                    <span>Lock Into Arena</span>
                  </button>
                  <button
                    onClick={copyScorecardMD}
                    className="py-3 px-4 rounded-xl bg-[var(--surface-elevated)] hover:bg-[var(--surface-sunken)] text-[var(--text-heading)] border border-[var(--border-subtle)] font-mono font-bold text-xs tap-spring flex items-center justify-center gap-2"
                  >
                    <Copy className="w-4 h-4 text-[var(--accent-primary)]" />
                    <span>Copy Scorecard</span>
                  </button>
                </div>
              </div>

              {/* Arena Leaderboard Tournament Podio */}
              <div className="prismatic-glass rounded-3xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-[var(--accent-primary)]" />
                    <span className="text-xs font-mono uppercase text-[var(--text-heading)] font-black">
                      Tournament Arena ({candidates.length})
                    </span>
                  </div>
                  {topCandidate && (
                    <span className="px-2.5 py-1 rounded-xl bg-[var(--accent-emerald-bg)] text-[var(--accent-emerald)] border border-[var(--accent-emerald)] font-mono text-xs font-black">
                      #1 {topCandidate.name} ({topCandidate.fit}%)
                    </span>
                  )}
                </div>

                <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                  {candidates.map((c, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3.5 rounded-2xl bg-[var(--surface-sunken)] border border-[var(--border-subtle)] text-xs font-mono"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-lg font-black flex items-center justify-center text-[11px] ${
                          idx === 0 
                            ? 'bg-[var(--accent-amber-bg)] text-[var(--accent-amber)] border border-[var(--accent-amber)]' 
                            : idx === 1 
                            ? 'bg-[var(--surface-card)] text-[var(--text-muted)] border border-[var(--border-subtle)]' 
                            : 'bg-[var(--surface-card)] text-[var(--text-muted)]'
                        }`}>
                          #{idx + 1}
                        </span>
                        <span className="font-black text-[var(--text-heading)]">{c.name}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <span className="text-[var(--text-muted)] t-nums">{c.score.toFixed(2)}/5</span>
                        <span className={`px-2.5 py-1 rounded-xl font-black ${
                          c.fit >= 80 
                            ? 'text-[var(--accent-emerald)] bg-[var(--accent-emerald-bg)]' 
                            : c.fit >= 50 
                            ? 'text-[var(--accent-amber)] bg-[var(--accent-amber-bg)]' 
                            : 'text-[var(--accent-rose)] bg-[var(--accent-rose-bg)]'
                        }`}>
                          {c.fit}%
                        </span>
                        <button
                          onClick={() => {
                            if (candidates.length <= 1) return;
                            setCandidates(candidates.filter((_, i) => i !== idx));
                            sound.playTone(320, 'sine');
                          }}
                          className="text-[var(--text-muted)] hover:text-[var(--accent-rose)] p-1"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </section>
        )}

        {/* ========================================================================= */}
        {/* MODULE 2: BAD-HIRE P&L BLEED SIMULATOR                                    */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'calculator') && (
          <section className="prismatic-glass rounded-3xl p-6 sm:p-8 space-y-6">
            
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-5">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-1 rounded-xl bg-[var(--accent-emerald-bg)] text-[var(--accent-emerald)] font-mono text-xs font-black">
                  MODULE 02
                </span>
                <h2 className="text-lg font-black text-[var(--text-heading)]">Cost of a Bad Hire (P&L Bleed Simulator)</h2>
              </div>
              <span className="text-xs font-mono text-[var(--text-muted)]">
                SHRM & Harvard Business Review Methodology
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Tactile Sliders (5 cols) */}
              <div className="lg:col-span-5 space-y-5 bg-[var(--surface-sunken)] p-6 rounded-3xl border border-[var(--border-subtle)]">
                
                <div>
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-[var(--text-heading)] font-bold flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                      Average Base Salary:
                    </span>
                    <span className="text-[var(--accent-primary)] font-black t-nums text-sm">
                      ${salary.toLocaleString()}
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
                    className="w-full accent-[var(--accent-primary)] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-[var(--text-heading)] font-bold flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                      Annual Target Hires:
                    </span>
                    <span className="text-[var(--accent-primary)] font-black t-nums text-sm">
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
                    className="w-full accent-[var(--accent-primary)] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-[var(--text-heading)] font-bold flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-[var(--accent-rose)]" />
                      90-Day Fail Rate (Vibe Check):
                    </span>
                    <span className="text-[var(--accent-rose)] font-black t-nums text-sm">
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
                    className="w-full accent-[var(--accent-rose)] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-[var(--text-heading)] font-bold flex items-center gap-1.5">
                      <TrendingDown className="w-3.5 h-3.5 text-[var(--accent-amber)]" />
                      Agency / Replacement Fee:
                    </span>
                    <span className="text-[var(--accent-amber)] font-black t-nums text-sm">
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
                    className="w-full accent-[var(--accent-amber)] cursor-pointer"
                  />
                </div>

              </div>

              {/* 3 Executive Financial KPIs (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  
                  <div className="p-4 rounded-2xl bg-[var(--surface-sunken)] border border-[var(--border-subtle)] text-center space-y-1">
                    <span className="text-xs font-mono text-[var(--text-muted)] font-black uppercase block">1 Bad Hire Costs</span>
                    <div className="text-2xl font-black text-[var(--accent-rose)] font-mono t-nums">
                      ${pnlResults.costPerBadHire.toLocaleString()}
                    </div>
                    <span className="text-xs text-[var(--text-muted)] font-mono">Severance + Sunk Time</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[var(--surface-sunken)] border border-[var(--border-subtle)] text-center space-y-1">
                    <span className="text-xs font-mono text-[var(--text-muted)] font-black uppercase block">Annual P&L Bleed</span>
                    <div className="text-2xl font-black text-[var(--accent-amber)] font-mono t-nums">
                      ${pnlResults.annualBleed.toLocaleString()}
                    </div>
                    <span className="text-xs text-[var(--text-muted)] font-mono">
                      {pnlResults.badHiresCount} failed hires/yr
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[var(--accent-emerald-bg)] border border-[var(--accent-emerald)] text-center space-y-1">
                    <span className="text-xs font-mono text-[var(--accent-emerald)] uppercase font-black block">
                      Protected via BARS
                    </span>
                    <div className="text-2xl font-black text-[var(--accent-emerald)] font-mono t-nums">
                      ${pnlResults.netSavings.toLocaleString()}
                    </div>
                    <span className="text-xs text-[var(--accent-emerald)] font-mono font-bold">Cuts fail rate to 4%</span>
                  </div>

                </div>

                {/* Visual Capital Recovery Breakdown */}
                <div className="bg-[var(--surface-sunken)] rounded-2xl p-5 border border-[var(--border-subtle)] space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[var(--text-heading)] font-black">Financial Bleed Breakdown</span>
                    <span className="text-[var(--accent-emerald)] font-black">P&L Recovery: 80%</span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs font-mono text-[var(--accent-rose)] mb-1 font-bold">
                        <span>Unstructured Bleed</span>
                        <span className="t-nums">${pnlResults.annualBleed.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-[var(--surface-card)] h-3 rounded-full overflow-hidden border border-[var(--border-subtle)]">
                        <div className="bg-[var(--accent-rose)] h-full rounded-full w-full" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-mono text-[var(--accent-emerald)] mb-1 font-bold">
                        <span>Calibrated Process (4% Fail Rate)</span>
                        <span className="t-nums">${pnlResults.calibratedBleed.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-[var(--surface-card)] h-3 rounded-full overflow-hidden border border-[var(--border-subtle)]">
                        <div
                          className="bg-[var(--accent-emerald)] h-full rounded-full transition-all duration-300"
                          style={{
                            width: `${Math.max(5, (pnlResults.calibratedBleed / (pnlResults.annualBleed || 1)) * 100)}%`
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </section>
        )}

        {/* Lead Capture VIP Framework Card */}
        <section className="prismatic-glass rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-[var(--border-active)]">
          <div className="space-y-1.5 text-center md:text-left">
            <h3 className="text-lg sm:text-xl font-black text-[var(--text-heading)] flex items-center justify-center md:justify-start gap-2">
              <FileSpreadsheet className="w-5 h-5 text-[var(--accent-primary)]" />
              <span>Get the Complete 2026 BARS Rubric Framework</span>
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-body)] max-w-xl font-medium">
              Download the structured interview guide, scoring criteria, and executive hiring metrics ready for your team.
            </p>
          </div>

          {leadSuccess ? (
            <div className="px-6 py-3 rounded-2xl bg-[var(--accent-emerald-bg)] border border-[var(--accent-emerald)] text-[var(--accent-emerald)] font-mono text-xs font-black flex items-center gap-2">
              <Check className="w-4 h-4 stroke-[3]" />
              <span>You're on the list! Framework requested successfully.</span>
            </div>
          ) : (
            <form onSubmit={handleLeadSubmit} className="flex items-center gap-2.5 w-full md:w-auto relative">
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
                className="bg-[var(--surface-card)] border border-[var(--border-subtle)] rounded-xl px-4 py-2.5 text-xs text-[var(--text-heading)] focus:outline-none focus:border-[var(--accent-primary)] w-full sm:w-64 font-mono shadow-sm"
              />
              <button
                type="submit"
                disabled={leadLoading}
                className="px-5 py-2.5 rounded-xl bg-[var(--accent-primary)] hover:opacity-90 disabled:opacity-50 text-white font-black text-xs font-mono whitespace-nowrap tap-spring shadow-md"
              >
                {leadLoading ? 'Unlocking...' : 'Get Template'}
              </button>
            </form>
          )}
        </section>

        {/* Author Bio & Links Footer */}
        <footer className="prismatic-glass rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[var(--accent-primary)] to-[var(--accent-emerald)] text-white font-black flex items-center justify-center">
              CG
            </div>
            <div>
              <strong className="text-[var(--text-heading)] font-black">Catalina Gil Sierra</strong> • Lead TA & Psychometric Systems Architect
              <div className="text-xs text-[var(--text-muted)] mt-0.5">
                ⏳ Coming Next: n8n Talent Workflow Automation & Funnel Diagnostic
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="https://www.linkedin.com/in/catalinagilpeopleops"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-heading)] hover:text-[var(--accent-primary)] flex items-center gap-1 font-bold"
            >
              <span>LinkedIn ↗</span>
            </a>
            <a
              href="https://docs.google.com/document/d/1LFZOGBt049Cw7poC0fcgHkFuszylslldqMNAUYQO-eg/edit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-heading)] hover:text-[var(--accent-primary)] flex items-center gap-1 font-bold"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Lead CV</span>
            </a>
            <a
              href="https://docs.google.com/document/d/1NyrhrXB_HySO9egpYThS5MJuVfiH3X2BehcRAJiqOVg/edit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-heading)] hover:text-[var(--accent-primary)] flex items-center gap-1 font-bold"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Full-Cycle CV</span>
            </a>
            <a
              href="mailto:catagil91@gmail.com"
              className="text-[var(--accent-primary)] font-black hover:underline"
            >
              catagil91@gmail.com
            </a>
          </div>
        </footer>

      </main>
    </div>
  );
}
export default App;
