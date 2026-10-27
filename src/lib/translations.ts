export interface CaseStudyItem {
  id: string;
  clientType: string;
  market: string;
  problem: string;
  solution: string;
  metrics: { label: string; value: string; detail: string }[];
}

export interface ArticleItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  content: string[];
}

export interface AppTranslations {
  nav: {
    talentScience: string;
    interviewTool: string;
    inefficiencyAudit: string;
    aboutCatalina: string;
    marketSignals: string;
    playbook: string;
    tourBtn: string;
    profileBtn: string;
    bookBtn: string;
    sfxTitle: string;
    langTitle: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    primaryBtn: string;
    secondaryBtn: string;
  };
  overview: {
    badge: string;
    title: string;
    subtitle: string;
    traditionalTitle: string;
    traditionalBadge: string;
    traditionalPoints: string[];
    scienceTitle: string;
    scienceBadge: string;
    sciencePoints: string[];
    pillars: {
      title: string;
      desc: string;
    }[];
    caseStudiesTitle: string;
    caseStudiesBadge: string;
    challengeLabel: string;
    solutionLabel: string;
    caseStudies: CaseStudyItem[];
  };
  tool: {
    badge: string;
    title: string;
    subtitle: string;
    step1: string;
    step2: string;
    step3: string;
    jobTitleLabel: string;
    deptLabel: string;
    jdLabel: string;
    calibrateBtn: string;
    generating: string;
    dimensionsHeading: string;
    addCriterion: string;
    anchorsTitle: string;
    fitThreshold: string;
    hireDecision: string;
    calibrateDecision: string;
    passDecision: string;
    candidatesHeading: string;
    candidateNamePlaceholder: string;
    addCandidateBtn: string;
    downloadPdfBtn: string;
    copyReportBtn: string;
    reportCopied: string;
  };
  calculator: {
    badge: string;
    subBadge: string;
    title: string;
    subtitle: string;
    panelEngineers: string;
    roundsPerCandidate: string;
    candidatesPerHire: string;
    engineerRate: string;
    annualHires: string;
    relyAgencies: string;
    agencyFee: string;
    avgSalary: string;
    annualWasteTitle: string;
    annualWasteSub: string;
    hoursBurnedTitle: string;
    hoursBurnedSub: string;
    agencyFeesTitle: string;
    agencyFeesSub: string;
    savingsTitle: string;
    savingsSub: string;
    calloutTitle: string;
    calloutText: string;
    calloutAction: string;
  };
  aboutMe: {
    badge: string;
    subBadge: string;
    title: string;
    subtitle: string;
    ctaBtn: string;
    cards: {
      title: string;
      desc: string;
    }[];
  };
  playbook: {
    badge: string;
    title: string;
    subtitle: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    companyPlaceholder: string;
    downloadBtn: string;
    downloadSuccess: string;
    tableOfContents: string;
    chapters: string[];
  };
  newsletter: {
    badge: string;
    title: string;
    subtitle: string;
    emailPlaceholder: string;
    subscribeBtn: string;
    subscribedSuccess: string;
    readTimeLabel: string;
    articles: ArticleItem[];
  };
  footer: {
    byLine: string;
    subLine: string;
    linkedIn: string;
    leadCv: string;
    fullCycleCv: string;
  };
  modals: {
    welcome: {
      title: string;
      subtitle: string;
      role: string;
      intro: string;
      startTour: string;
      exploreDirectly: string;
    };
    tour: {
      stepOf: string;
      next: string;
      prev: string;
      finish: string;
    };
  };
}

export const TRANSLATIONS: Record<'en' | 'es', AppTranslations> = {
  en: {
    nav: {
      talentScience: "Talent Science",
      interviewTool: "Interview Tool",
      inefficiencyAudit: "Inefficiency Audit",
      aboutCatalina: "About Catalina",
      marketSignals: "Market Signals",
      playbook: "Playbook",
      tourBtn: "Tour",
      profileBtn: "Profile",
      bookBtn: "Book 15m",
      sfxTitle: "Toggle Tactile Sound FX",
      langTitle: "Change Language"
    },
    hero: {
      badge: "Predictive Selection • BARS Rubrics • Operating Margin Protection",
      title: "Talent Acquisition Predictive Science",
      subtitle: "Eliminating subjective guesswork from technical hiring panels. Calibrated Behaviorally Anchored Rating Scales (BARS), n8n workflow automations, and audit-grade decision frameworks.",
      primaryBtn: "Launch BARS Analysis & Report",
      secondaryBtn: "Simulate P&L Bleed Cost"
    },
    overview: {
      badge: "METHODOLOGY & COMPARISON",
      title: "Intuition vs. Predictive Science",
      subtitle: "Eliminating subjective bias through applied psychometrics",
      traditionalTitle: "Traditional Hiring (\"Vibe Checks\")",
      traditionalBadge: "HIGH RISK",
      traditionalPoints: [
        "Affinity-based evaluation: Unstructured questions that reward conversational charisma over proven on-the-job capability.",
        "> 35% panel inter-rater disagreement: Each interviewer evaluates candidates against subjective personal standards.",
        "4-6 week interview cycles: Repetitive redundant rounds that exhaust engineers and drive high candidate drop-off.",
        "Costly early attrition: 1 in 5 technical hires underperforms or churns within the first 90 days."
      ],
      scienceTitle: "Talent Science (Evidence & BARS)",
      scienceBadge: "AUDITABLE",
      sciencePoints: [
        "1-3-5 BARS Rubrics: Standardized, observable behaviors instead of ambiguous personal impressions.",
        "24-Hour panel consensus: Unified scoring criteria enabling fast, mathematically calibrated decisions.",
        "50% reduction in rounds: Drastically cuts engineering hours burned while accelerating time-to-offer.",
        "Direct business alignment: Verifiable correlation between interview assessment and real production output."
      ],
      pillars: [
        {
          title: "1. Calibrated BARS Scales",
          desc: "Objective ratings anchored to verifiable workplace actions and critical incidents."
        },
        {
          title: "2. n8n Automation",
          desc: "Frictionless event-driven workflows closing candidate feedback loops in under 24 hours."
        },
        {
          title: "3. P&L Margin Protection",
          desc: "Eliminates high external agency fees and developer burnout during technical panels."
        }
      ],
      caseStudiesTitle: "Production Case Studies",
      caseStudiesBadge: "VERIFIED",
      challengeLabel: "Challenge:",
      solutionLabel: "Solution:",
      caseStudies: [
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
      ]
    },
    tool: {
      badge: "BARS CALIBRATION WORKBENCH",
      title: "Interactive Interview Analysis Tool",
      subtitle: "Convert unstructured job specs into mathematical 1-3-5 competency rubrics and multi-candidate scorecards.",
      step1: "1. Role Specification",
      step2: "2. BARS Rubric Architecture",
      step3: "3. Multi-Candidate Matrix",
      jobTitleLabel: "Target Role Title",
      deptLabel: "Department / Business Unit",
      jdLabel: "Job Description / Core Responsibilities",
      calibrateBtn: "Generate Calibrated BARS Rubric",
      generating: "Synthesizing Rubric...",
      dimensionsHeading: "Calibrated Evaluation Dimensions",
      addCriterion: "Add New Dimension",
      anchorsTitle: "Behaviorally Anchored Rating Scale (1 - 3 - 5):",
      fitThreshold: "Fit Score Threshold",
      hireDecision: "STRONG HIRE",
      calibrateDecision: "CALIBRATE FURTHER",
      passDecision: "DO NOT PROCEED",
      candidatesHeading: "Candidate Evaluation Pool",
      candidateNamePlaceholder: "Candidate Name...",
      addCandidateBtn: "Add Candidate",
      downloadPdfBtn: "Download Calibration Report (PDF)",
      copyReportBtn: "Copy Assessment Summary",
      reportCopied: "Assessment Summary copied to clipboard!"
    },
    calculator: {
      badge: "AUDIT CALCULATOR",
      subBadge: "Internal Engineering Hours & Agency Spend Analysis",
      title: "Cost of Uncalibrated Interviewing",
      subtitle: "Stress-test the hidden engineering and agency tax on your hiring pipeline",
      panelEngineers: "Engineers on Hiring Panel",
      roundsPerCandidate: "Interview Rounds per Candidate",
      candidatesPerHire: "Candidates Interviewed per Hire",
      engineerRate: "Blended Engineering Hourly Rate ($/hr)",
      annualHires: "Annual Target Technical Hires",
      relyAgencies: "Hires Outsourced to Agencies (%)",
      agencyFee: "Standard Agency Placement Fee (%)",
      avgSalary: "Average Annual Engineer Salary ($)",
      annualWasteTitle: "Annual Interview Inefficiency",
      annualWasteSub: "Internal developer time burned + external fee leakage",
      hoursBurnedTitle: "Engineering Hours Burned",
      hoursBurnedSub: "Lost productive sprint time across your tech team",
      agencyFeesTitle: "External Agency Spend",
      agencyFeesSub: "Contingency fees paid due to uncalibrated internal pipelines",
      savingsTitle: "Estimated Annual Savings with Talent Science",
      savingsSub: "Via calibrated 1-3-5 BARS rubrics & 24h panel alignment",
      calloutTitle: "Margin Recovery Insight",
      calloutText: "Moving from 4 uncalibrated interview rounds down to 2 calibrated BARS rounds saves up to 48 engineering hours per hire and protects your team from context switching.",
      calloutAction: "Book a 15-Minute Pipeline Diagnostic"
    },
    aboutMe: {
      badge: "SYSTEMS ARCHITECT",
      subBadge: "10 Years Global Sourcing & Selection Track Record",
      title: "Catalina Gil Sierra",
      subtitle: "Senior Talent Acquisition Specialist | Evidence-Based & Skills-Based Hiring",
      ctaBtn: "View Full Interactive Profile & History",
      cards: [
        {
          title: "4x Team Throughput Multiplier",
          desc: "Delivering the sourcing throughput of 2 sourcers and 2 recruiters via n8n automation and targeted LLM prompting."
        },
        {
          title: "Psychometric Measurement",
          desc: "Postgraduate Specialization in Design and Validation of Psychological Measurement Instruments (USBMED)."
        },
        {
          title: "Global Search Delivery",
          desc: "10+ years filling complex engineering, executive, and specialized vacancies across US, EU, and LATAM."
        }
      ]
    },
    playbook: {
      badge: "EXECUTIVE RESOURCE",
      title: "The Talent Acquisition Science Playbook",
      subtitle: "A comprehensive 40-page guide on migrating from intuition-based interviews to Behaviorally Anchored Rating Scales (BARS).",
      namePlaceholder: "Your Full Name",
      emailPlaceholder: "Your Business Email",
      companyPlaceholder: "Company / Organization",
      downloadBtn: "Download Free Playbook (PDF)",
      downloadSuccess: "Playbook sent! Check your inbox shortly.",
      tableOfContents: "Inside the Playbook:",
      chapters: [
        "1. The Failure of Keyword Matching & Vibe Checks in Modern Tech",
        "2. Psychometric Validity & Reliability: The 1-3-5 BARS Framework",
        "3. Building Event-Driven n8n Recruitment Architectures",
        "4. Overcoming Panel Disagreement: A 24-Hour Consensus Blueprint"
      ]
    },
    newsletter: {
      badge: "THOUGHT LEADERSHIP",
      title: "Market Signals & Talent Science",
      subtitle: "Insights on evidence-based hiring, recruitment automations, and tech compensation benchmarks.",
      emailPlaceholder: "Enter your email address...",
      subscribeBtn: "Subscribe",
      subscribedSuccess: "Thank you for subscribing to Market Signals!",
      readTimeLabel: "read",
      articles: [
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
      ]
    },
    footer: {
      byLine: "Catalina Gil Sierra • Lead TA & Psychometric Systems Architect (USBMED)",
      subLine: "Predictive Talent Systems, n8n Orchestrations & Objective BARS Frameworks",
      linkedIn: "LinkedIn",
      leadCv: "Lead CV",
      fullCycleCv: "Full-Cycle CV"
    },
    modals: {
      welcome: {
        title: "Welcome to Talent Science",
        subtitle: "Predictive Talent Acquisition & Psychometric Architecture",
        role: "By Catalina Gil Sierra",
        intro: "This interactive cockpit demonstrates how calibrated BARS rubrics, automated n8n pipelines, and psychometric validation transform hiring from subjective intuition into predictable business ROI.",
        startTour: "Start Guided Tour",
        exploreDirectly: "Explore Cockpit Directly"
      },
      tour: {
        stepOf: "Step",
        next: "Next",
        prev: "Previous",
        finish: "Get Started"
      }
    }
  },
  es: {
    nav: {
      talentScience: "Ciencia del Talento",
      interviewTool: "Herramienta BARS",
      inefficiencyAudit: "Auditoría de Ineficiencia",
      aboutCatalina: "Acerca de Catalina",
      marketSignals: "Señales de Mercado",
      playbook: "Playbook",
      tourBtn: "Tour",
      profileBtn: "Perfil",
      bookBtn: "Agendar 15m",
      sfxTitle: "Alternar Efectos de Sonido",
      langTitle: "Cambiar Idioma"
    },
    hero: {
      badge: "Selección Predictiva • Rúbricas BARS • Protección del Margen Operativo",
      title: "Ciencia Predictiva en Adquisición de Talento",
      subtitle: "Eliminando la intuición subjetiva de los comités técnicos de contratación. Escalas de Calificación con Anclaje Conductual (BARS), automatización con n8n y marcos de decisión auditables.",
      primaryBtn: "Ejecutar Análisis y Reporte BARS",
      secondaryBtn: "Simular Costo de Desperdicio Operativo"
    },
    overview: {
      badge: "METODOLOGÍA Y COMPARACIÓN",
      title: "Intuición vs. Ciencia Predictiva",
      subtitle: "Erradicando sesgos subjetivos mediante psicometría aplicada",
      traditionalTitle: "Contratación Tradicional ('Evaluación por Afinidad')",
      traditionalBadge: "ALTO RIESGO",
      traditionalPoints: [
        "Evaluación por afinidad: Preguntas no estructuradas que premian el carisma conversacional sobre la competencia técnica comprobable.",
        "> 35% de desacuerdo entre evaluadores: Cada entrevistador califica según criterios personales subjetivos.",
        "Procesos de 4 a 6 semanas: Rondas redundantes que agotan a los ingenieros y provocan deserciones de candidatos calificados.",
        "Costosa rotación temprana: 1 de cada 5 contrataciones técnicas no rinde o renuncia en los primeros 90 días."
      ],
      scienceTitle: "Talent Science (Evidencia y BARS)",
      scienceBadge: "AUDITABLE",
      sciencePoints: [
        "Rúbricas BARS 1-3-5: Comportamientos observables y estandarizados en lugar de impresiones personales ambiguas.",
        "Consenso en 24 horas: Criterios unificados de puntuación que permiten decisiones rápidas y matemáticamente calibradas.",
        "50% de reducción en rondas: Disminuye drásticamente las horas de ingeniería consumidas y acelera el tiempo de oferta.",
        "Alineación directa con el negocio: Correlación verificable entre la evaluación de la entrevista y el rendimiento real en producción."
      ],
      pillars: [
        {
          title: "1. Escalas BARS Calibradas",
          desc: "Calificaciones objetivas ancladas a acciones laborales verificables e incidentes críticos."
        },
        {
          title: "2. Automatización con n8n",
          desc: "Flujos dirigidos por eventos sin fricción que cierran ciclos de retroalimentación en menos de 24 horas."
        },
        {
          title: "3. Protección del Margen Operativo",
          desc: "Elimina elevados costos de agencias externas y el agotamiento de desarrolladores en paneles técnicos."
        }
      ],
      caseStudiesTitle: "Casos de Estudio en Producción",
      caseStudiesBadge: "VERIFICADO",
      challengeLabel: "Desafío:",
      solutionLabel: "Solución:",
      caseStudies: [
        {
          id: 'cs-1',
          clientType: 'Scale-Up Industrial y Cloud Europea',
          market: 'Países Bajos y Alemania (Tech y Manufactura)',
          problem: 'Los comités de contratación sufrían alto desacuerdo (30% de decisiones divididas) y un 22% de rotación en los primeros 90 días en puestos críticos de ingeniería.',
          solution: 'Diseño e implementación de rúbricas BARS personalizadas (Resiliencia en Producción, Cero Caídas) y scorecards en ATS. Capacitación a 24 líderes técnicos en recolección de evidencia conductual objetiva.',
          metrics: [
            { label: 'Reducción de Rotación 90 Días', value: '-60%', detail: 'Descendió de 22% a menos de 4% en 12 meses' },
            { label: 'Alineación del Comité', value: '94%', detail: 'Consenso logrado dentro de las 24h de la ronda final' },
            { label: 'Conversión Outbound', value: '7.2%', detail: '3.5x por encima del promedio del mercado' }
          ]
        },
        {
          id: 'cs-2',
          clientType: 'Plataforma Global de Talento IA',
          market: 'Nueva York y Remoto Global',
          problem: 'El volumen de postulaciones entrantes sobrepasó a los reclutadores (1,200+ CVs/semana). Los candidatos se frustraban por cartas de rechazo automáticas, bajando el NPS a 3.2.',
          solution: 'Arquitectura de eventos en n8n con prompting selectivo en OpenAI para auditar entregas de muestras de trabajo frente a Pruebas de Juicio Situacional (SJT) validadas.',
          metrics: [
            { label: 'NPS de Candidatos', value: '4.6 / 5.0', detail: 'Subió de 3.2 gracias a retroalimentación transparente' },
            { label: 'Rendimiento de Equipo', value: 'Capacidad 4x', detail: 'Entregó la productividad de 2 sourcers + 2 recruiters' },
            { label: 'Tiempo a la Oferta', value: '8 Días', detail: 'Comprimido desde un promedio de 26 días' }
          ]
        }
      ]
    },
    tool: {
      badge: "MESA DE TRABAJO BARS",
      title: "Herramienta Interactiva de Análisis de Entrevistas",
      subtitle: "Convierte descripciones de cargo ambiguas en rúbricas matemáticas 1-3-5 por competencias y matrices de evaluación.",
      step1: "1. Especificación del Rol",
      step2: "2. Arquitectura de Rúbrica BARS",
      step3: "3. Matriz de Candidatos",
      jobTitleLabel: "Título del Cargo",
      deptLabel: "Departamento / Área de Negocio",
      jdLabel: "Descripción del Cargo / Responsabilidades Clave",
      calibrateBtn: "Generar Rúbrica BARS Calibrada",
      generating: "Sintetizando Rúbrica...",
      dimensionsHeading: "Dimensiones de Evaluación Calibradas",
      addCriterion: "Agregar Nueva Dimensión",
      anchorsTitle: "Escala con Anclaje Conductual (1 - 3 - 5):",
      fitThreshold: "Umbral de Ajuste Requerido",
      hireDecision: "CONTRATAR (ALTO AJUSTE)",
      calibrateDecision: "SEGUNDA CALIBRACIÓN",
      passDecision: "NO PROCEDER",
      candidatesHeading: "Grupo de Candidatos a Evaluar",
      candidateNamePlaceholder: "Nombre del Candidato...",
      addCandidateBtn: "Agregar Candidato",
      downloadPdfBtn: "Descargar Reporte de Calibración (PDF)",
      copyReportBtn: "Copiar Resumen de Evaluación",
      reportCopied: "¡Resumen copiado al portapapeles!"
    },
    calculator: {
      badge: "CALCULADORA DE AUDITORÍA",
      subBadge: "Análisis de Horas de Ingeniería y Gasto en Agencias",
      title: "Costo de Entrevistas Sin Calibrar",
      subtitle: "Calcula el costo oculto de horas de ingeniería y comisiones externas en tu proceso de selección",
      panelEngineers: "Ingenieros en el Comité Evaluador",
      roundsPerCandidate: "Rondas de Entrevista por Candidato",
      candidatesPerHire: "Candidatos Evaluados por Contratación",
      engineerRate: "Tarifa Horaria Promedio de Ingeniería ($/hora)",
      annualHires: "Meta Anual de Contrataciones Técnicas",
      relyAgencies: "Contrataciones Asignadas a Agencias (%)",
      agencyFee: "Comisión Estándar de la Agencia (%)",
      avgSalary: "Salario Anual Promedio del Ingeniero ($)",
      annualWasteTitle: "Desperdicio Anual por Ineficiencia",
      annualWasteSub: "Horas de desarrollo consumidas + comisiones externas evitables",
      hoursBurnedTitle: "Horas de Ingeniería Consumidas",
      hoursBurnedSub: "Tiempo productivo de sprints perdido por tu equipo técnico",
      agencyFeesTitle: "Gasto en Agencias Externas",
      agencyFeesSub: "Comisiones pagadas por embudos internos no calibrados",
      savingsTitle: "Ahorro Anual Estimado con Talent Science",
      savingsSub: "Mediante rúbricas BARS 1-3-5 y alineación de comités en 24h",
      calloutTitle: "Recuperación de Margen Operativo",
      calloutText: "Pasar de 4 rondas de entrevista no calibradas a 2 rondas con rúbricas BARS ahorra hasta 48 horas de ingeniería por contratación y protege a tu equipo de interrupciones de contexto.",
      calloutAction: "Agendar Diagnóstico de Selección de 15 Minutos"
    },
    aboutMe: {
      badge: "ARQUITECTA DE PROCESOS",
      subBadge: "10 Años de Trayectoria Global en Atracción y Selección",
      title: "Catalina Gil Sierra",
      subtitle: "Especialista Senior en Adquisición de Talento | Selección Basada en Evidencia y Habilidades",
      ctaBtn: "Ver Perfil Interactivo y Trayectoria Completa",
      cards: [
        {
          title: "Multiplicador de Capacidad 4x",
          desc: "Entregando el rendimiento de atracción de 2 sourcers y 2 recruiters mediante automatizaciones en n8n y prompts especializados de LLM."
        },
        {
          title: "Medición Psicométrica",
          desc: "Especialización en Diseño y Validación de Instrumentos de Medición Psicológica (USBMED)."
        },
        {
          title: "Alcance y Entrega Global",
          desc: "Más de 10 años cubriendo vacantes técnicas, ejecutivas y críticas en EE. UU., Europa y Latinoamérica."
        }
      ]
    },
    playbook: {
      badge: "RECURSO EJECUTIVO",
      title: "The Talent Acquisition Science Playbook",
      subtitle: "Una guía completa de 40 páginas sobre cómo migrar de entrevistas basadas en intuición a Escalas de Calificación con Anclaje Conductual (BARS).",
      namePlaceholder: "Tu Nombre Completo",
      emailPlaceholder: "Tu Correo Corporativo",
      companyPlaceholder: "Empresa / Organización",
      downloadBtn: "Descargar Playbook Gratuito (PDF)",
      downloadSuccess: "¡Playbook enviado! Revisa tu bandeja de entrada en breve.",
      tableOfContents: "Contenido del Playbook:",
      chapters: [
        "1. El colapso del filtrado por palabras clave y las entrevistas por afinidad en tecnología",
        "2. Validez y confiabilidad psicométrica: El marco de evaluación BARS 1-3-5",
        "3. Creación de arquitecturas de reclutamiento dirigidas por eventos en n8n",
        "4. Superando el desacuerdo en comités técnicos: Protocolo de consenso en 24 horas"
      ]
    },
    newsletter: {
      badge: "LIDERAZGO DE OPINIÓN",
      title: "Señales de Mercado y Ciencia del Talento",
      subtitle: "Análisis sobre selección basada en evidencia, automatizaciones en reclutamiento y bandas salariales en tech.",
      emailPlaceholder: "Ingresa tu correo electrónico...",
      subscribeBtn: "Suscribirme",
      subscribedSuccess: "¡Gracias por suscribirte a Señales de Mercado!",
      readTimeLabel: "de lectura",
      articles: [
        {
          id: 'art-1',
          slug: 'bot-vs-bot-hiring-paradox',
          title: 'La Paradoja del Reclutamiento Bot vs. Bot: Por qué la señal nunca fue tan económica ni tan escasa',
          excerpt: 'Cuando los candidatos usan IA para generar 500 postulaciones y los reclutadores usan IA para auto-rechazarlas, la señal colapsa. Cómo reconstruir filtros de prueba de trabajo.',
          category: 'Tendencias de Mercado',
          date: '24 Oct, 2026',
          readTime: '4 min de lectura',
          content: [
            'A principios de 2026, el costo de generar solicitudes de empleo altamente convincentes llegó a cero. Un postulante puede enviar 400 hojas de vida personalizadas en una tarde mediante flujos locales de agentes de IA. Simultáneamente, los equipos de reclutamiento dependen de analizadores automáticos para descartar el 95% de postulaciones sin revisión humana.',
            'El resultado es un ataque de denegación de servicio mutuo en la infraestructura de contratación. Los líderes técnicos se quejan de la escasez de talento calificado mientras que los ingenieros senior se niegan a postular por portales tradicionales de ATS.',
            'El remedio no es endurecer los filtros por palabras clave, sino evaluar muestras de trabajo con anclaje conductual (Proof-of-Work). Al anclar la evaluación a escenarios de juicio situacional y compromisos técnicos reales, el contenido superficial generado por IA se disuelve en menos de 3 minutos.',
            'Nuestros datos en 14 equipos de tecnología en empresas europeas indican que los equipos que migraron a una calificación BARS 1-3-5 vieron cómo las tasas de respuesta de ingenieros senior auténticos subieron del 2.1% al 7.4% en 60 días.'
          ]
        },
        {
          id: 'art-2',
          slug: 'death-of-the-vibe-check',
          title: 'El Costo Silencioso de las Evaluaciones por Afinidad en los Márgenes de Ingeniería',
          excerpt: 'Las entrevistas sin calibrar no solo provocan malas contrataciones: queman silenciosamente más de 120 horas de ingenieros senior por vacante. Aquí está la matemática.',
          category: 'Psicometría',
          date: '22 Oct, 2026',
          readTime: '5 min de lectura',
          content: [
            'Durante un comité de entrevistas no calibrado, cada entrevistador evalúa lo que a nivel personal considera interesante. El Staff Engineer interroga al candidato sobre funcionamiento interno de compiladores, mientras el Engineering Manager analiza la soltura en una charla casual.',
            'Ninguna de esas dos métricas predice si el candidato construirá y desplegará sistemas distribuidos confiables bajo acuerdos de nivel de servicio (SLAs) de producción.',
            'Al auditar el tiempo de ingeniería, un ciclo típico no estructurado de 5 etapas consume 18 horas de ingeniería por postulante. Con un promedio de 4 finalistas para concretar una oferta, estás invirtiendo entre 72 y 120 horas de tiempo valioso de ingenieros senior por vacante.',
            'Al definir 3 dimensiones BARS calibradas con anclajes conductuales claros en niveles 1, 3 y 5, la variabilidad del comité se reduce en un 68%, recortando las etapas de entrevista de 5 a 3 sin bajar los estándares de contratación.'
          ]
        },
        {
          id: 'art-3',
          slug: 'n8n-modern-recruitment-architecture',
          title: 'Arquitectando Flujos de Talento Sin Fricción: Reemplazando 2 Reclutadores con n8n y OpenAI',
          excerpt: 'Un desglose práctico de cómo automatizamos notificaciones de etapa, agendamiento de comités y recordatorios de scorecards sin perder calidez humana.',
          category: 'Automatización TA',
          date: '20 Oct, 2026',
          readTime: '6 min de lectura',
          content: [
            'La lentitud operativa en el reclutamiento es la causa número uno de abandono de los mejores candidatos en procesos competitivos. Cuando un candidato finaliza su última ronda el miércoles y debe esperar hasta el siguiente martes para recibir retroalimentación, percibe desorganización interna.',
            'Construimos webhooks dirigidos por eventos en n8n que conectan Greenhouse o Ashby con Slack y números privados de WhatsApp empresarial.',
            'En menos de 15 minutos tras concluir la entrevista, el evaluador recibe una notificación móvil para ingresar su calificación BARS 1-3-5. Tan pronto el comité completa sus evaluaciones, se genera automáticamente una matriz comparativa sintetizada para el VP de Ingeniería.',
            'El NPS del candidato aumentó de 3.2 a 4.6, y el tiempo de decisión se redujo de 14 días a 48 horas.'
          ]
        },
        {
          id: 'art-4',
          slug: 'salary-benchmarking-european-tech-2026',
          title: 'Realidades Salariales de Ingeniería en Ámsterdam, Berlín y Bruselas',
          excerpt: 'Hallazgos clave tras 4 años de búsqueda técnica en Benelux y DACH: dónde se están estabilizando las bandas remotas.',
          category: 'Búsqueda Ejecutiva',
          date: '18 Oct, 2026',
          readTime: '4 min de lectura',
          content: [
            'A pesar de fluctuaciones macroeconómicas, las posiciones de infraestructura, resiliencia cloud y plataformas de datos continúan enfrentando una oferta sumamente restringida en los centros tecnológicos de Europa Occidental.',
            'Los profesionales en los Países Bajos y Alemania priorizan la transparencia en el trabajo asíncrono y la autonomía técnica por encima de promesas infladas de opciones sobre acciones.',
            'Este artículo detalla las bandas salariales de referencia para ingenieros Principal y Staff en Benelux y DACH, exponiendo la brecha entre las tarifas propuestas por agencias y las ofertas realmente aceptadas.'
          ]
        }
      ]
    },
    footer: {
      byLine: "Catalina Gil Sierra • Líder de Adquisición de Talento y Arquitectura Psicométrica (USBMED)",
      subLine: "Sistemas Predictivos de Talento, Orquestaciones en n8n y Marcos BARS Objetivos",
      linkedIn: "LinkedIn",
      leadCv: "CV Liderazgo",
      fullCycleCv: "CV Ciclo Completo"
    },
    modals: {
      welcome: {
        title: "Bienvenido a Talent Science",
        subtitle: "Adquisición Predictiva de Talento y Arquitectura Psicométrica",
        role: "Por Catalina Gil Sierra",
        intro: "Esta plataforma interactiva demuestra cómo las rúbricas BARS calibradas, los flujos automatizados en n8n y la validación psicométrica transforman la contratación de una intuición subjetiva a un retorno de inversión predecible.",
        startTour: "Iniciar Tour Guiado",
        exploreDirectly: "Explorar la Plataforma Directamente"
      },
      tour: {
        stepOf: "Paso",
        next: "Siguiente",
        prev: "Anterior",
        finish: "Comenzar"
      }
    }
  }
};
