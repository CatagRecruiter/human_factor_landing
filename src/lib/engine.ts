// Pure business logic preserved accurately from psychometric framework

export interface SkillCriterion {
  name: string;
  weight: number;
  q: string;
  s1: string;
  s3: string;
  s5: string;
  score: number; // 1, 3, or 5
}

export interface CandidateEntry {
  name: string;
  score: number;
  fit: number;
  status: 'HIRE' | 'CALIBRATE' | 'PASS';
  color: string;
}

export const ROLE_TEMPLATES: Record<string, SkillCriterion[]> = {
  tech: [
    {
      name: "Production Resilience & Debugging",
      weight: 40,
      q: "Debugged a p99 latency spike under load—what metrics & trade-offs?",
      s1: "Blames cloud/juniors; no metrics",
      s3: "Standard alerts + horizontal scale",
      s5: "Query plan profiling + circuit breakers",
      score: 5
    },
    {
      name: "Zero-Downtime DB Architecture",
      weight: 35,
      q: "Executed a high-volume schema migration without breaking SLAs?",
      s1: "Table locks & outage",
      s3: "Off-hours maintenance window",
      s5: "Dual-write + async backfill (0 downtime)",
      score: 5
    },
    {
      name: "Product vs. Tech-Debt Alignment",
      weight: 25,
      q: "Resolved a speed vs. stability dispute with a Product Lead?",
      s1: "Rigid or caves immediately",
      s3: "Escalates in sprint planning",
      s5: "Built latency-vs-revenue matrix",
      score: 4
    }
  ],
  product: [
    {
      name: "Hypothesis & A/B Rigor",
      weight: 40,
      q: "Handled a flat A/B test—how did you audit instrumentation?",
      s1: "Chases vanity metrics",
      s3: "Moves to next backlog item",
      s5: "Found funnel leak; +25% activation",
      score: 4
    },
    {
      name: "Tech Debt vs. Revenue ROI",
      weight: 35,
      q: "Engineering asks for 2 sprints of refactoring—your call?",
      s1: "Dismisses engineering risk",
      s3: "Allocates flat 20% capacity",
      s5: "Quantified churn cost; phased roadmap",
      score: 5
    },
    {
      name: "User Friction Discovery",
      weight: 25,
      q: "Feature had low adoption post-launch—how did you pivot?",
      s1: "Blames users or marketing",
      s3: "Sends standard NPS survey",
      s5: "Interviewed 12 users in 48h; 3x usage",
      score: 5
    }
  ],
  sales: [
    {
      name: "Executive Pain Discovery",
      weight: 40,
      q: "Uncovered budget on a stalled $50k+ B2B deal?",
      s1: "Pitches generic feature demo",
      s3: "Standard BANT qualification",
      s5: "Mapped Economic Buyer P&L pain",
      score: 5
    },
    {
      name: "CFO Objection Turnaround",
      weight: 35,
      q: "CFO freezes spend at quarter-end—how do you rescue?",
      s1: "Panic-discounts margin",
      s3: "Offers quarterly payment terms",
      s5: "Built Cost-of-Inaction ROI case",
      score: 4
    },
    {
      name: "Pipeline & Forecast Precision",
      weight: 25,
      q: "How do you keep monthly forecast accuracy above 90%?",
      s1: "Hopes on zombie deals",
      s3: "Weekly CRM hygiene",
      s5: "Strict 3x weighted stage velocity",
      score: 5
    }
  ],
  ops: [
    {
      name: "Bottleneck Elimination",
      weight: 40,
      q: "Cut cycle times without adding headcount?",
      s1: "Throws headcount at chaos",
      s3: "Maps SOP checklists",
      s5: "Removed handoffs; -65% error rate",
      score: 5
    },
    {
      name: "SLA Crisis Contingency",
      weight: 35,
      q: "Key vendor failed during peak demand—your playbook?",
      s1: "Missed customer SLAs",
      s3: "Called backup vendor list",
      s5: "Rerouted in 4h; 98% on-time fulfillment",
      score: 4
    },
    {
      name: "Frontline 90-Day Retention",
      weight: 25,
      q: "Reduced early turnover in high-tempo shift teams?",
      s1: "Blames labor market",
      s3: "Runs exit interviews",
      s5: "Skill-tiered progression; -60% churn",
      score: 5
    }
  ]
};

// Calculate normalized weighted fit %
export function calculateFit(criteria: SkillCriterion[]) {
  const totalWeight = criteria.reduce((sum, c) => sum + (Number(c.weight) || 0), 0);
  const weightedSum = criteria.reduce((sum, c) => sum + c.score * ((Number(c.weight) || 0) / 100), 0);
  
  const normWeight = totalWeight > 0 ? totalWeight : 100;
  const rawScore = (weightedSum * 100) / normWeight;
  const fitPct = Math.max(0, Math.min(100, ((rawScore - 1.0) / 4.0) * 100));

  let verdict: 'STRONG HIRE' | 'CALIBRATE' | 'NO HIRE' = 'CALIBRATE';
  let badgeClass = 'text-amber-400 bg-amber-500/15 border-amber-500/30';

  if (fitPct >= 80) {
    verdict = 'STRONG HIRE';
    badgeClass = 'text-emerald-400 bg-emerald-500/15 border-emerald-500/40';
  } else if (fitPct < 50) {
    verdict = 'NO HIRE';
    badgeClass = 'text-rose-400 bg-rose-500/15 border-rose-500/40';
  }

  return {
    totalWeight,
    rawScore: Number(rawScore.toFixed(2)),
    fitPct: Number(fitPct.toFixed(1)),
    verdict,
    badgeClass
  };
}

// Calculate P&L metrics based on SHRM / HBR formula
export function calculatePnL(salary: number, hires: number, failRatePct: number, feeRatePct: number) {
  const failRate = failRatePct / 100;
  const feeRate = feeRatePct / 100;

  const costPerBadHire = Math.round(salary * (0.55 + feeRate));
  const badHiresCount = hires * failRate;
  const annualBleed = Math.round(costPerBadHire * badHiresCount);
  const calibratedBleed = Math.round(costPerBadHire * (hires * 0.04));
  const netSavings = Math.max(0, annualBleed - calibratedBleed);

  return {
    costPerBadHire,
    badHiresCount: Number(badHiresCount.toFixed(1)),
    annualBleed,
    calibratedBleed,
    netSavings
  };
}
