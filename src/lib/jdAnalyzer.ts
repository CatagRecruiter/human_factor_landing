import { SkillCriterion } from './engine';

export interface CalibrationQuestion {
  id: string;
  question: string;
  options: {
    label: string;
    description: string;
    focus: 'depth' | 'velocity' | 'leadership' | 'systemic';
  }[];
}

export const CALIBRATION_QUESTIONS: CalibrationQuestion[] = [
  {
    id: 'autonomy',
    question: '1. What level of operational autonomy does this hire need in the first 60 days?',
    options: [
      {
        label: 'High Autonomy / Unblocker',
        description: 'Needs to define architectures, set standards, and resolve ambiguous roadblocks without guidance.',
        focus: 'leadership',
      },
      {
        label: 'Executional Velocity',
        description: 'Focuses on rapid task throughput, sprint execution, and clean implementation within existing frameworks.',
        focus: 'velocity',
      },
      {
        label: 'Production Resilience / Deep Specialist',
        description: 'Manages critical infrastructure, zero-downtime, and high-impact failure prevention under stress.',
        focus: 'systemic',
      },
    ],
  },
  {
    id: 'risk',
    question: '2. What is the single biggest catastrophic risk if this hire underperforms?',
    options: [
      {
        label: 'Production Downtime & SLA Breach',
        description: 'System outages, security vulnerability, or latency spikes affecting paying enterprise clients.',
        focus: 'systemic',
      },
      {
        label: 'Product Roadmap Drag & Misalignment',
        description: 'Building wrong features, creating friction with stakeholders, or wasting engineering sprints.',
        focus: 'depth',
      },
      {
        label: 'Team Friction & Negative Moral Contagion',
        description: 'Eroding team trust, inability to mentor, or causing senior engineers to leave.',
        focus: 'leadership',
      },
    ],
  },
];

export function extractDimensionsFromJD(
  jobTitle: string,
  jdText: string,
  answers: Record<string, string>
): SkillCriterion[] {
  const lower = (jobTitle + ' ' + jdText).toLowerCase();

  // If leadership / executive focus
  if (answers['autonomy']?.includes('High Autonomy') || lower.includes('lead') || lower.includes('manager') || lower.includes('director') || lower.includes('head')) {
    return [
      {
        name: 'Technical Autonomy & Problem Disambiguation',
        weight: 40,
        q: 'How did you turn vague business requirements into a reliable, phased technical roadmap?',
        s1: 'Waits for explicit instructions; freezes in ambiguity',
        s3: 'Executes standard requirements with occasional manager syncs',
        s5: 'Anticipates edge-cases, establishes team SOPs, and delivers ahead of deadline',
        score: 5,
      },
      {
        name: 'Stakeholder & Cross-Functional Alignment',
        weight: 35,
        q: 'Describe a moment when you disagreed with a key stakeholder on delivery vs. quality.',
        s1: 'Confrontational or passively compromises without data',
        s3: 'Escalates to leadership during formal meetings',
        s5: 'Built objective trade-off matrix; aligned team on shared outcome',
        score: 4,
      },
      {
        name: 'Talent Density & Team Multiplier',
        weight: 25,
        q: 'How have you mentored junior peers or elevated the engineering quality bar?',
        s1: 'Works in isolation; complains about peer mistakes',
        s3: 'Conducts routine code reviews and answers questions',
        s5: 'Designed training guides and pair-programming loops that accelerated onboarding by 50%',
        score: 5,
      },
    ];
  }

  // If Product / Growth / Strategy
  if (lower.includes('product') || lower.includes('growth') || lower.includes('marketing') || lower.includes('ux')) {
    return [
      {
        name: 'Hypothesis Rigor & Experimentation',
        weight: 40,
        q: 'Walk me through a failed initiative or flat A/B test. How did you diagnose the root cause?',
        s1: 'Blames market/team; changes random variables',
        s3: 'Runs standard analytics and proceeds to backlog',
        s5: 'Audited user telemetry, identified drop-off leak, and reversed retention churn by 20%',
        score: 5,
      },
      {
        name: 'Revenue ROI vs. Technical Feasibility',
        weight: 35,
        q: 'Engineering asks for 3 sprints to refactor a legacy system—how do you negotiate?',
        s1: 'Disregards technical debt; forces vanity features',
        s3: 'Allocates flat 15% maintenance sprint capacity',
        s5: 'Quantified outage cost against product roadmap; designed phased delivery milestones',
        score: 4,
      },
      {
        name: 'User Empathy & Qualitative Signal Synthesis',
        weight: 25,
        q: 'How do you extract actionable product insights from difficult customer feedback?',
        s1: 'Ignores edge feedback or reacts to single loudest customer',
        s3: 'Collects feedback in spreadsheet for quarterly review',
        s5: 'Conducts live contextual inquiries; correlates pain points with usage drops',
        score: 5,
      },
    ];
  }

  // If Sales / GTM / Operations
  if (lower.includes('sales') || lower.includes('ops') || lower.includes('operations') || lower.includes('account') || lower.includes('gtm')) {
    return [
      {
        name: 'Pipeline Velocity & Qualification Rigor',
        weight: 40,
        q: 'How do you qualify out low-fit opportunities early in the sales/operational cycle?',
        s1: 'Chases unqualified leads; inflates pipeline with vanity metrics',
        s3: 'Applies standard BANT/MEDDPICC checklists',
        s5: 'Identifies non-buyers in call 1; focuses 80% effort on high-LTV decision makers',
        score: 5,
      },
      {
        name: 'Crisis Escalation & SLA Contingency',
        weight: 35,
        q: 'A high-tier client threatens to churn due to an operational bottleneck—your playbook?',
        s1: 'Panics, overpromises, or shifts blame to other teams',
        s3: 'Follows standard customer support escalation tree',
        s5: 'Takes full ownership, provides root-cause diagnosis, and restores confidence within 24h',
        score: 4,
      },
      {
        name: 'Process Optimization & Friction Elimination',
        weight: 25,
        q: 'How have you improved recurring team workflows or reduced turnaround latency?',
        s1: 'Relies on brute force and manual spreadsheets',
        s3: 'Documents standard operating procedures (SOPs)',
        s5: 'Automated notification loops; reduced deal latency by 45%',
        score: 5,
      },
    ];
  }

  // Default: Senior Engineering / Systems Architecture
  return [
    {
      name: 'Production Resilience & Debugging Under Pressure',
      weight: 40,
      q: 'Tell me about a time when a critical service spiked latency in production. How did you triage?',
      s1: 'Blames infrastructure or juniors; guesses without telemetry',
      s3: 'Checks standard logs and scales horizontal resources',
      s5: 'Profiles memory/query execution plans, isolated root leak, and implemented circuit breakers',
      score: 5,
    },
    {
      name: 'Zero-Downtime Architecture & Scalability Trade-offs',
      weight: 35,
      q: 'How did you execute a complex schema or architectural migration without breaking client SLAs?',
      s1: 'Applied table locks causing service interruption',
      s3: 'Scheduled weekend maintenance downtime windows',
      s5: 'Dual-write pattern + asynchronous backfill with zero client-perceived downtime',
      score: 4,
    },
    {
      name: 'Operational Discipline & Pragmatic Delivery',
      weight: 25,
      q: 'How do you balance shipping fast vs. long-term code maintainability when under tight deadlines?',
      s1: 'Caves to all pressure or refuses to ship anything without 100% refactor',
      s3: 'Raises warnings in sprint retrospectives',
      s5: 'Established clear tech-debt tickets with quantified payoff timelines and automated test coverage',
      score: 5,
    },
  ];
}
