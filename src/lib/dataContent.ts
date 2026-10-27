export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: 'Market Trends' | 'Psychometrics' | 'TA Automation' | 'Executive Search';
  date: string;
  readTime: string;
  content: string[];
}

export const ARTICLES_DATA: Article[] = [
  {
    id: 'art-1',
    slug: 'bot-vs-bot-hiring-paradox',
    title: 'The Bot vs. Bot Hiring Paradox: Why Signal Has Never Been Cheaper or Rarer',
    excerpt: 'When candidates use AI to generate 500 tailored resumes and recruiters use AI to auto-reject them, signal collapses. How to rebuild proof-of-work filters.',
    category: 'Market Trends',
    date: 'Oct 24, 2026',
    readTime: '4 min read',
    content: [
      'In early 2026, the cost of generating high-plausibility applications reached zero. A candidate can now dispatch 400 bespoke applications per afternoon using local agentic workflows. Simultaneously, Talent Acquisition teams rely on automated parsers to cull 95% of incoming resumes without human review.',
      'The result is a mutual denial-of-service attack on recruitment infrastructure. Hiring managers complain about a lack of senior talent while top-tier engineers refuse to apply through traditional ATS portals.',
      'The antidote is not stricter keyword matching—it is Behaviorally Anchored Work Samples (Proof-of-Work). When you anchor the evaluation to situational judgment scenarios and observable trade-offs, AI-generated fluff decomposes in under 3 minutes.',
      'Our data across 14 European enterprise tech teams indicates that teams shifting to 1-3-5 BARS scoring saw candidate response rates from genuine senior engineers rise from 2.1% to 7.4% within 60 days.'
    ]
  },
  {
    id: 'art-2',
    slug: 'death-of-the-vibe-check',
    title: 'The Silent Cost of "Culture Fit" Vibe Checks on Engineering Margins',
    excerpt: 'Uncalibrated interviews dont just lead to bad hires—they quietly burn 120+ senior engineering hours per open requisition. Heres the math.',
    category: 'Psychometrics',
    date: 'Oct 22, 2026',
    readTime: '5 min read',
    content: [
      'During an uncalibrated interview panel, each interviewer tests for what they personally find interesting. The Staff Engineer grills the candidate on compiler internals, while the Engineering Manager evaluates how comfortable the candidate was during small talk.',
      'Neither metric predicts whether the candidate will ship reliable distributed systems under production SLAs.',
      'When you audit engineering time, a typical 5-stage unstructured interview cycle consumes 18 engineering hours per candidate. With an average on-site ratio of 4:1 to close a hire, you are investing 72 to 120 hours of senior engineering bandwidth per hire.',
      'By defining 3 calibrated BARS dimensions with explicit 1, 3, and 5 behavioral anchors, interview panel variance drops by 68%, cutting interview stages from 5 to 3 without lowering the hiring bar.'
    ]
  },
  {
    id: 'art-3',
    slug: 'n8n-modern-recruitment-architecture',
    title: 'Architecting Frictionless TA Workflows: Replacing 2 Recruiters with n8n & OpenAI',
    excerpt: 'A practical breakdown of how we automated candidate stage notifications, panel scheduling, and scorecard reminders without losing candidate warmth.',
    category: 'TA Automation',
    date: 'Oct 20, 2026',
    readTime: '6 min read',
    content: [
      'Recruitment operational latency is the number one reason top candidates drop out of competitive pipelines. When a candidate completes a final round on Wednesday, waiting until the following Tuesday for internal scorecard calibration signals organizational dysfunction.',
      'We built event-driven webhooks in n8n connecting Greenhouse / Ashby to Slack and private WhatsApp business endpoints.',
      'Within 15 minutes of an interview concluding, the interviewer receives a single mobile-optimized prompt to submit their 1-3-5 BARS rating. If all panel ratings are logged, an auto-synthesized comparative scorecard is delivered to the VP of Engineering.',
      'Candidate NPS increased from 3.2 to 4.6, and time-to-decision was compressed from 14 days to 48 hours.'
    ]
  },
  {
    id: 'art-4',
    slug: 'salary-benchmarking-european-tech-2026',
    title: 'Engineering Compensation Realities in Amsterdam, Berlin & Brussels',
    excerpt: 'Key findings from 4 years of technical search across the Benelux and DACH regions: where remote bands are settling.',
    category: 'Executive Search',
    date: 'Oct 18, 2026',
    readTime: '4 min read',
    content: [
      'Despite macro fluctuations, hard-to-hire infrastructure, cloud resilience, and data platform vacancies remain heavily supply-constrained in Western European tech hubs.',
      'Candidates in the Netherlands and Germany prioritize transparency in asynchronous culture and technical autonomy over inflated equity promises.',
      'This article outlines the benchmarked salary bands for Principal and Staff engineers across Benelux and DACH, highlighting the gap between agency expectations and actual signed offers.'
    ]
  }
];

export interface CaseStudy {
  id: string;
  clientType: string;
  market: string;
  problem: string;
  solution: string;
  metrics: { label: string; value: string; detail: string }[];
}

export const CASE_STUDIES_DATA: CaseStudy[] = [
  {
    id: 'cs-1',
    clientType: 'European Industrial & Cloud Scale-Up',
    market: 'Netherlands & Germany (Tech & Manufacturing)',
    problem: 'Hiring panels suffered from high inter-rater disagreement (30% split decisions) and a 22% early 90-day churn rate in mission-critical engineering roles.',
    solution: 'Designed and deployed custom BARS rubrics (Production Resilience, Zero-Downtime Architecture) and automated ATS scorecards. Trained 24 engineering leads on objective behavioral evidence collection.',
    metrics: [
      { label: '90-Day Churn Reduction', value: '-60%', detail: 'Dropped from 22% to under 4% in 12 months' },
      { label: 'Panel Alignment', value: '94%', detail: 'Consensus achieved within 24h of final round' },
      { label: 'Outbound Conversion', value: '7.2%', detail: '3.5x higher response rate over industry average' }
    ]
  },
  {
    id: 'cs-2',
    clientType: 'High-Growth AI Talent Platform',
    market: 'New York & Global Remote',
    problem: 'Inbound application volume overwhelmed recruiters (1,200+ resumes/wk). Candidates felt frustrated by generic automated rejection emails, dropping NPS to 3.2.',
    solution: 'Engineered an n8n event-driven architecture with selective OpenAI prompting to audit proof-of-work submissions against validated Situational Judgment Tests (SJTs).',
    metrics: [
      { label: 'Candidate NPS', value: '4.6 / 5.0', detail: 'Up from 3.2 through transparent feedback' },
      { label: 'Team Throughput', value: '4x Capacity', detail: 'Delivered throughput of 2 sourcers + 2 recruiters' },
      { label: 'Time-to-Offer', value: '8 Days', detail: 'Compressed from 26 days average' }
    ]
  }
];
