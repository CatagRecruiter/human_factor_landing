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
  FileText
} from 'lucide-react';
import { ROLE_TEMPLATES, SkillCriterion, CandidateEntry, calculateFit, calculatePnL } from './lib/engine';
import { sound } from './lib/sound';

export function App() {
  // Theme state
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [sfxOn, setSfxOn] = useState<boolean>(true);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Cockpit View Modes: 'all' | 'converter' | 'calculator'
  const [activeTab, setActiveTab] = useState<'all' | 'converter' | 'calculator'>('all');

  // Module 1: Fit % State
  const [selectedRole, setSelectedRole] = useState<'tech' | 'product' | 'sales' | 'ops'>('tech');
  const [criteria, setCriteria] = useState<SkillCriterion[]>(() => JSON.parse(JSON.stringify(ROLE_TEMPLATES.tech)));
  const [activeCandidate, setActiveCandidate] = useState<string>('Alex Rivera');
  
  // Candidates Arena
  const [candidates, setCandidates] = useState<CandidateEntry[]>([
    { name: "Alex Rivera", score: 4.70, fit: 92.5, status: "HIRE", color: "#10b981" },
    { name: "Jordan Lee", score: 3.80, fit: 70.0, status: "CALIBRATE", color: "#f59e0b" },
    { name: "Taylor Smith", score: 2.30, fit: 32.5, status: "PASS", color: "#f43f5e" }
  ]);
  const [calibrationsCount, setCalibrationsCount] = useState<number>(3);

  // Module 2: P&L Simulator State
  const [salary, setSalary] = useState<number>(80000);
  const [hires, setHires] = useState<number>(12);
  const [failRate, setFailRate] = useState<number>(20);
  const [feeRate, setFeeRate] = useState<number>(22);

  // Computed Values
  const fitResults = calculateFit(criteria);
  const pnlResults = calculatePnL(salary, hires, failRate, feeRate);

  // Sync Theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Sound sync
  useEffect(() => {
    sound.enabled = sfxOn;
  }, [sfxOn]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2400);
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
      color: fitResults.fitPct >= 80 ? '#10b981' : fitResults.fitPct >= 50 ? '#f59e0b' : '#f43f5e'
    };

    setCandidates([newCand, ...candidates].sort((a, b) => b.fit - a.fit));
    setCalibrationsCount(prev => prev + 1);
    sound.playChord();

    if (fitResults.fitPct >= 80) {
      confetti({
        particleCount: 50,
        spread: 60,
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

  const topCandidate = candidates.length > 0 ? candidates[0] : null;

  return (
    <div className="relative min-h-screen">
      {/* 2026 Ambient Aurora Mesh */}
      <div className="aurora-bg">
        <div className="aurora-blob w-[500px] h-[500px] -top-32 -left-32 bg-teal-500/20" />
        <div className="aurora-blob w-[600px] h-[600px] top-1/2 -right-32 bg-emerald-500/15" />
        <div className="aurora-blob w-[400px] h-[400px] -bottom-32 left-1/3 bg-cyan-500/15" />
      </div>

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-emerald-400 text-slate-950 font-extrabold text-xs font-mono shadow-2xl animate-bounce">
          <Check className="w-4 h-4 stroke-[3]" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Glass HUD Header */}
      <header className="sticky top-0 z-40 liquid-glass border-b border-white/10 px-4 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-400 to-emerald-400 flex items-center justify-center font-black text-slate-950 text-base shadow-lg shadow-teal-500/20">
              TL
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white text-base tracking-tight">TalentLens Studio</span>
                <span className="px-2 py-0.5 text-[11px] font-mono font-bold rounded-full bg-teal-950 text-teal-400 border border-teal-500/30">
                  2026 COCKPIT
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono hidden sm:block">
                Catalina Gil Sierra • Psychometric Systems Architect
              </p>
            </div>
          </div>

          {/* Realtime KPI HUD */}
          <div className="hidden md:flex items-center gap-4 px-4 py-1.5 rounded-2xl bg-slate-950/80 border border-white/10 font-mono text-xs">
            <div className="flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-400" />
              <span className="text-slate-400">Calibrations:</span>
              <span className="font-bold text-white t-nums">{calibrationsCount}</span>
            </div>
            <span className="text-slate-700">|</span>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-slate-400">P&L Protected:</span>
              <span className="font-bold text-emerald-400 t-nums">${pnlResults.netSavings.toLocaleString()}</span>
            </div>
            <span className="text-slate-700">|</span>
            <div className="flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-teal-400" />
              <span className="text-slate-400">Top Fit:</span>
              <span className="font-bold text-teal-300 t-nums">{topCandidate ? `${topCandidate.fit}%` : 'N/A'}</span>
            </div>
          </div>

          {/* Quick Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSfxOn(!sfxOn)}
              className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-teal-400 border border-white/10 tap-spring"
              title="Toggle Web Audio SFX"
            >
              {sfxOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-amber-400 border border-white/10 tap-spring"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={copyScorecardMD}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-white/10 text-xs font-mono font-bold tap-spring"
            >
              <Copy className="w-3.5 h-3.5 text-teal-400" />
              <span>Export MD</span>
            </button>
            <a
              href="mailto:catagil91@gmail.com"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-slate-950 font-extrabold text-xs font-mono shadow-lg shadow-teal-500/20 tap-spring"
            >
              <span>Book 15m</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Punchy Hero & View Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 liquid-glass rounded-3xl p-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-teal-400 font-bold uppercase tracking-wider">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-ping" />
              <span>Kill Vibe Checks • Quantify Fit % • Stop P&L Bleed</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Interactive Hiring Decision Cockpit
            </h1>
            <p className="text-sm text-slate-400 max-w-2xl">
              Turn subjective conversations into weighted psychometric proof points and simulate the direct financial impact on executive P&L.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2.5 rounded-2xl text-xs font-mono font-bold tap-spring transition-all ${
                activeTab === 'all'
                  ? 'bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-950 shadow-lg shadow-teal-500/30'
                  : 'bg-slate-900/60 text-slate-300 border border-white/10 hover:border-teal-500/50'
              }`}
            >
              ⚡ Split Cockpit (All Live)
            </button>
            <button
              onClick={() => setActiveTab('converter')}
              className={`px-4 py-2.5 rounded-2xl text-xs font-mono font-bold tap-spring transition-all ${
                activeTab === 'converter'
                  ? 'bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-950 shadow-lg shadow-teal-500/30'
                  : 'bg-slate-900/60 text-slate-300 border border-white/10 hover:border-teal-500/50'
              }`}
            >
              🎯 1. Fit % Converter
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              className={`px-4 py-2.5 rounded-2xl text-xs font-mono font-bold tap-spring transition-all ${
                activeTab === 'calculator'
                  ? 'bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-950 shadow-lg shadow-teal-500/30'
                  : 'bg-slate-900/60 text-slate-300 border border-white/10 hover:border-emerald-500/50'
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
            <div className="lg:col-span-7 liquid-glass rounded-3xl p-6 sm:p-7 space-y-6">
              
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-5">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-1 rounded-xl bg-teal-500/20 text-teal-300 font-mono text-xs font-extrabold">
                    MODULE 01
                  </span>
                  <h2 className="text-lg font-extrabold text-white">Interview ➔ Fit % Converter</h2>
                </div>

                {/* Role Pill Switcher */}
                <div className="flex flex-wrap gap-2">
                  {(['tech', 'product', 'sales', 'ops'] as const).map(role => (
                    <button
                      key={role}
                      onClick={() => handleRoleChange(role)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold capitalize tap-spring transition-all ${
                        selectedRole === role
                          ? 'bg-teal-400 text-slate-950 font-black shadow-md shadow-teal-500/20'
                          : 'bg-slate-900/60 text-slate-300 border border-white/10 hover:border-teal-500'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              {/* Candidate Info + Fast Utilities */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950/60 p-4 rounded-2xl border border-white/10">
                <div className="flex items-center gap-2.5 flex-grow">
                  <span className="text-xs font-mono text-slate-400">👤 Candidate:</span>
                  <input
                    type="text"
                    value={activeCandidate}
                    onChange={(e) => setActiveCandidate(e.target.value)}
                    className="bg-slate-900/90 border border-white/10 focus:border-teal-400 rounded-xl px-3 py-1.5 text-xs font-bold text-white font-mono focus:outline-none w-44 sm:w-56"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <div className={`px-3 py-1.5 rounded-xl border font-mono text-xs font-bold ${
                    fitResults.totalWeight === 100
                      ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                      : 'bg-amber-500/15 text-amber-300 border-amber-500/40'
                  }`}>
                    {fitResults.totalWeight === 100 ? 'Weights: 100% ✓' : `Weights: ${fitResults.totalWeight}% ⚠️`}
                  </div>
                  <button
                    onClick={autoBalanceWeights}
                    className="px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-teal-300 border border-teal-500/30 font-mono text-xs font-bold tap-spring flex items-center gap-1.5"
                    title="Auto-normalize all criteria weights to 100%"
                  >
                    <Scale className="w-3.5 h-3.5" />
                    <span>Auto-100%</span>
                  </button>
                  <button
                    onClick={simulateWildcard}
                    className="px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-purple-300 border border-purple-500/30 font-mono text-xs font-bold tap-spring flex items-center gap-1.5"
                    title="Simulate random candidate"
                  >
                    <Shuffle className="w-3.5 h-3.5" />
                    <span>Wildcard</span>
                  </button>
                  <button
                    onClick={addCustomSkill}
                    className="p-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-white/10 tap-spring"
                    title="Add custom evaluation skill"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Dynamic BARS Skill Cards */}
              <div className="space-y-4">
                {criteria.map((c, idx) => (
                  <div key={idx} className="liquid-glass-elevated p-4 rounded-2xl border border-white/10 space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5 flex-grow">
                        <span className="w-6 h-6 rounded-lg bg-teal-950 text-teal-400 font-mono text-xs font-black flex items-center justify-center shrink-0">
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
                          className="bg-transparent border-b border-transparent focus:border-teal-400 text-sm font-extrabold text-white w-full focus:outline-none"
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
                          className="w-20 accent-teal-400 cursor-pointer"
                        />
                        <span className="w-12 text-right font-mono text-xs font-black text-teal-300 t-nums">
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
                          className="text-slate-500 hover:text-rose-400 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="text-xs font-mono text-slate-400 bg-slate-950/60 px-3 py-2 rounded-xl border border-white/5">
                      <span>💬 "{c.q}"</span>
                    </div>

                    {/* 1-3-5 Objective BARS Grading Buttons */}
                    <div className="grid grid-cols-3 gap-2.5">
                      <button
                        onClick={() => updateScore(idx, 1)}
                        className={`p-2.5 rounded-xl border text-left tap-spring transition-all ${
                          c.score === 1
                            ? 'bg-rose-500/20 border-rose-500 text-rose-200 shadow-md shadow-rose-500/20'
                            : 'bg-slate-900/60 border-white/10 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className="font-mono font-bold text-rose-400 text-xs">1 • Alert (0%)</div>
                        <div className="text-[11px] text-slate-300 mt-0.5 line-clamp-1">{c.s1}</div>
                      </button>

                      <button
                        onClick={() => updateScore(idx, 3)}
                        className={`p-2.5 rounded-xl border text-left tap-spring transition-all ${
                          c.score === 3
                            ? 'bg-amber-500/20 border-amber-500 text-amber-200 shadow-md shadow-amber-500/20'
                            : 'bg-slate-900/60 border-white/10 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className="font-mono font-bold text-amber-400 text-xs">3 • Solid (50%)</div>
                        <div className="text-[11px] text-slate-300 mt-0.5 line-clamp-1">{c.s3}</div>
                      </button>

                      <button
                        onClick={() => updateScore(idx, 5)}
                        className={`p-2.5 rounded-xl border text-left tap-spring transition-all ${
                          c.score === 5
                            ? 'bg-teal-500/20 border-teal-400 text-teal-200 shadow-md shadow-teal-500/20'
                            : 'bg-slate-900/60 border-white/10 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className="font-mono font-bold text-teal-300 text-xs">5 • Star (100%)</div>
                        <div className="text-[11px] text-slate-300 mt-0.5 line-clamp-1">{c.s5}</div>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Live Score Ring & Multi-Candidate Arena (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* 2026 Radial Fit Score Hero */}
              <div className="liquid-glass rounded-3xl p-6 border border-teal-500/40 relative overflow-hidden space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                      Live Weighted Fit %
                    </span>
                    <div className="flex items-baseline gap-2.5 mt-1">
                      <span className="text-5xl font-black text-emerald-400 font-mono tracking-tight t-nums">
                        {fitResults.fitPct}%
                      </span>
                      <span className="text-xs font-mono text-teal-300 font-bold">
                        {fitResults.rawScore} / 5.0
                      </span>
                    </div>
                  </div>

                  <div className={`px-3.5 py-1.5 rounded-2xl border font-mono font-black text-xs ${fitResults.badgeClass}`}>
                    {fitResults.verdict}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-950/80 h-3.5 rounded-full overflow-hidden p-0.5 border border-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-teal-400 to-emerald-400 transition-all duration-300"
                    style={{ width: `${fitResults.fitPct}%` }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={lockCandidateToArena}
                    className="py-3 px-4 rounded-2xl bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-slate-950 font-black text-xs font-mono shadow-xl shadow-teal-500/20 tap-spring flex items-center justify-center gap-2"
                  >
                    <Trophy className="w-4 h-4" />
                    <span>Lock Into Arena</span>
                  </button>
                  <button
                    onClick={copyScorecardMD}
                    className="py-3 px-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-white border border-white/10 font-mono font-bold text-xs tap-spring flex items-center justify-center gap-2"
                  >
                    <Copy className="w-4 h-4 text-teal-400" />
                    <span>Copy Scorecard</span>
                  </button>
                </div>
              </div>

              {/* Candidate Arena Leaderboard */}
              <div className="liquid-glass rounded-3xl p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-purple-400" />
                    <span className="text-xs font-mono uppercase text-purple-300 font-extrabold">
                      Candidate Arena ({candidates.length})
                    </span>
                  </div>
                  {topCandidate && (
                    <span className="px-2.5 py-1 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-mono text-xs font-bold">
                      #1 {topCandidate.name} ({topCandidate.fit}%)
                    </span>
                  )}
                </div>

                <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                  {candidates.map((c, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-2xl bg-slate-950/70 border border-white/5 text-xs font-mono"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="font-bold text-slate-500 w-5">#{idx + 1}</span>
                        <span className="font-bold text-white">{c.name}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <span className="text-slate-400 t-nums">{c.score.toFixed(2)}/5</span>
                        <span className={`px-2.5 py-1 rounded-xl font-black ${
                          c.fit >= 80 ? 'text-emerald-400 bg-emerald-500/15' : c.fit >= 50 ? 'text-amber-400 bg-amber-500/15' : 'text-rose-400 bg-rose-500/15'
                        }`}>
                          {c.fit}%
                        </span>
                        <button
                          onClick={() => {
                            if (candidates.length <= 1) return;
                            setCandidates(candidates.filter((_, i) => i !== idx));
                            sound.playTone(320, 'sine');
                          }}
                          className="text-slate-500 hover:text-rose-400"
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
          <section className="liquid-glass rounded-3xl p-6 sm:p-8 space-y-6">
            
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-5">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 font-mono text-xs font-extrabold">
                  MODULE 02
                </span>
                <h2 className="text-lg font-extrabold text-white">Cost of a Bad Hire (P&L Bleed Simulator)</h2>
              </div>
              <span className="text-xs font-mono text-slate-400">
                SHRM & Harvard Business Review Methodology
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Tactile Sliders (5 cols) */}
              <div className="lg:col-span-5 space-y-5 bg-slate-950/60 p-5 rounded-3xl border border-white/10">
                
                <div>
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-teal-400" />
                      Average Base Salary:
                    </span>
                    <span className="text-teal-300 font-extrabold t-nums text-sm">
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
                    className="w-full accent-teal-400 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-teal-400" />
                      Annual Target Hires:
                    </span>
                    <span className="text-teal-300 font-extrabold t-nums text-sm">
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
                    className="w-full accent-teal-400 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                      90-Day Fail Rate (Vibe Check):
                    </span>
                    <span className="text-rose-400 font-extrabold t-nums text-sm">
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
                    className="w-full accent-rose-400 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <TrendingDown className="w-3.5 h-3.5 text-amber-400" />
                      Agency / Replacement Fee:
                    </span>
                    <span className="text-amber-300 font-extrabold t-nums text-sm">
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
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                </div>

              </div>

              {/* 3 Executive Financial KPIs (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  
                  <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/5 text-center space-y-1">
                    <span className="text-xs font-mono text-slate-400 uppercase block">1 Bad Hire Costs</span>
                    <div className="text-2xl font-black text-rose-400 font-mono t-nums">
                      ${pnlResults.costPerBadHire.toLocaleString()}
                    </div>
                    <span className="text-[11px] text-slate-500 font-mono">Severance + Sunk Time</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/5 text-center space-y-1">
                    <span className="text-xs font-mono text-slate-400 uppercase block">Annual P&L Bleed</span>
                    <div className="text-2xl font-black text-amber-400 font-mono t-nums">
                      ${pnlResults.annualBleed.toLocaleString()}
                    </div>
                    <span className="text-[11px] text-slate-500 font-mono">
                      {pnlResults.badHiresCount} failed hires/yr
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-1">
                    <span className="text-xs font-mono text-emerald-300 uppercase font-black block">
                      Protected via BARS
                    </span>
                    <div className="text-2xl font-black text-emerald-400 font-mono t-nums">
                      ${pnlResults.netSavings.toLocaleString()}
                    </div>
                    <span className="text-[11px] text-emerald-400/80 font-mono">Cuts fail rate to 4%</span>
                  </div>

                </div>

                {/* 2026 Visual Comparison Bar */}
                <div className="bg-slate-950/80 rounded-2xl p-5 border border-white/10 space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-300 font-bold">Financial Bleed Breakdown</span>
                    <span className="text-teal-400">P&L Recovery: 80%</span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs font-mono text-rose-300 mb-1">
                        <span>Unstructured Bleed</span>
                        <span className="t-nums">${pnlResults.annualBleed.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden">
                        <div className="bg-rose-500 h-full rounded-full w-full" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-mono text-emerald-300 mb-1">
                        <span>Calibrated Process (4% Fail Rate)</span>
                        <span className="t-nums">${pnlResults.calibratedBleed.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden">
                        <div
                          className="bg-emerald-400 h-full rounded-full transition-all duration-300"
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

        {/* Lead Capture Waiting List / Template Adapter */}
        <section className="liquid-glass rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-teal-500/20">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-lg font-extrabold text-white flex items-center justify-center md:justify-start gap-2">
              <FileSpreadsheet className="w-5 h-5 text-teal-400" />
              <span>Get the Complete 2026 BARS Rubric Framework</span>
            </h3>
            <p className="text-xs text-slate-400 max-w-xl">
              Download the structured interview guide, scoring criteria, and executive hiring metrics ready for your team.
            </p>
          </div>
          <div className="flex items-center gap-2.5 w-full md:w-auto">
            <input
              type="email"
              placeholder="name@company.com"
              className="bg-slate-900/90 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-teal-400 w-full sm:w-64"
            />
            <button
              onClick={() => showToast('Lead capture connected: framework scheduled for release!')}
              className="px-5 py-2.5 rounded-2xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-extrabold text-xs font-mono whitespace-nowrap tap-spring"
            >
              Get Template
            </button>
          </div>
        </section>

        {/* Author Bio & Links Footer */}
        <footer className="liquid-glass rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-400 to-emerald-400 text-slate-950 font-black flex items-center justify-center">
              CG
            </div>
            <div>
              <strong className="text-white">Catalina Gil Sierra</strong> • Lead TA & Psychometric Systems Architect
              <div className="text-[11px] text-slate-400">
                ⏳ Coming Next: n8n Talent Workflow Automation & Funnel Diagnostic
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="https://www.linkedin.com/in/catalinagilpeopleops"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-teal-400 flex items-center gap-1"
            >
              <span>LinkedIn ↗</span>
            </a>
            <a
              href="https://docs.google.com/document/d/1LFZOGBt049Cw7poC0fcgHkFuszylslldqMNAUYQO-eg/edit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-teal-400 flex items-center gap-1"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Lead CV</span>
            </a>
            <a
              href="https://docs.google.com/document/d/1NyrhrXB_HySO9egpYThS5MJuVfiH3X2BehcRAJiqOVg/edit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-teal-400 flex items-center gap-1"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Full-Cycle CV</span>
            </a>
            <a
              href="mailto:catagil91@gmail.com"
              className="text-teal-400 font-bold hover:underline"
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
