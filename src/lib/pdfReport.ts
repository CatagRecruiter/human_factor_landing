import { jsPDF } from 'jspdf';
import { CandidateEntry, SkillCriterion } from './engine';

export interface ReportData {
  jobTitle: string;
  department: string;
  date: string;
  criteria: SkillCriterion[];
  candidates: CandidateEntry[];
}

export function generateComparisonPDF(data: ReportData) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  let currentY = 20;

  // Header / Brand
  doc.setFillColor(15, 23, 42); // Slate 900
  doc.rect(0, 0, pageWidth, 28, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('TALENT SCIENCE', 18, 14);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(148, 163, 184); // Slate 400
  doc.text('Talent Acquisition Predictive Science • Interview & Analysis Tool', 18, 20);

  // Document Title
  currentY = 38;
  doc.setTextColor(30, 41, 59); // Slate 800
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('Candidate Comparative Evaluation Report', 18, currentY);

  currentY += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text(`Role: ${data.jobTitle || 'Unspecified Role'}  |  Dept: ${data.department || 'General'}  |  Date: ${data.date || new Date().toLocaleDateString()}`, 18, currentY);

  // Divider
  currentY += 6;
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.5);
  doc.line(18, currentY, pageWidth - 18, currentY);

  // Section 1: Executive Ranking
  currentY += 10;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('1. Executive Candidate Ranking (Ranked by Weighted Fit %)', 18, currentY);

  currentY += 6;
  doc.setFillColor(248, 250, 252);
  doc.rect(18, currentY, pageWidth - 36, 8, 'F');
  
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(71, 85, 105);
  doc.text('RANK', 22, currentY + 5.5);
  doc.text('CANDIDATE NAME', 40, currentY + 5.5);
  doc.text('RAW SCORE (1-5)', 110, currentY + 5.5);
  doc.text('WEIGHTED FIT %', 145, currentY + 5.5);
  doc.text('DECISION', 175, currentY + 5.5);

  currentY += 8;
  doc.setFont('helvetica', 'normal');

  const sortedCandidates = [...data.candidates].sort((a, b) => b.fit - a.fit);

  sortedCandidates.forEach((c, idx) => {
    currentY += 6;
    doc.setTextColor(30, 41, 59);
    doc.text(`#${idx + 1}`, 22, currentY);
    doc.text(c.name, 40, currentY);
    doc.text(`${c.score.toFixed(2)} / 5.0`, 110, currentY);
    
    // Fit % with highlight
    doc.setFont('helvetica', 'bold');
    if (c.fit >= 80) doc.setTextColor(16, 185, 129); // Green
    else if (c.fit >= 50) doc.setTextColor(245, 158, 11); // Amber
    else doc.setTextColor(239, 68, 68); // Red
    doc.text(`${c.fit.toFixed(1)}%`, 145, currentY);

    // Decision tag
    doc.text(c.status, 175, currentY);
    doc.setFont('helvetica', 'normal');

    // Sub-divider
    doc.setDrawColor(241, 245, 249);
    doc.line(18, currentY + 2, pageWidth - 18, currentY + 2);
  });

  // Section 2: Calibrated Dimensions Evaluated
  currentY += 14;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('2. Calibrated BARS Behavioral Dimensions & Weights', 18, currentY);

  currentY += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);

  data.criteria.forEach((crit, i) => {
    if (currentY > 260) {
      doc.addPage();
      currentY = 20;
    }
    currentY += 6;
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 41, 59);
    doc.text(`${i + 1}. ${crit.name} (Weight: ${crit.weight}%)`, 18, currentY);

    currentY += 4.5;
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(100, 116, 139);
    doc.text(`Interview Probe: "${crit.q}"`, 22, currentY);

    currentY += 4.5;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text(`• Score 1 (Pass): ${crit.s1}`, 22, currentY);
    currentY += 4;
    doc.text(`• Score 3 (Standard): ${crit.s3}`, 22, currentY);
    currentY += 4;
    doc.text(`• Score 5 (Exceptional): ${crit.s5}`, 22, currentY);
    currentY += 2;
  });

  // Footer notes & Methodology Signoff
  currentY += 12;
  if (currentY > 265) {
    doc.addPage();
    currentY = 25;
  }
  doc.setDrawColor(226, 232, 240);
  doc.line(18, currentY, pageWidth - 18, currentY);

  currentY += 6;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(30, 41, 59);
  doc.text('Predictive Methodology & Audit Compliance:', 18, currentY);

  currentY += 4;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text(
    'This evaluation replaces unstructured intuition with Behaviorally Anchored Rating Scales (BARS). Normalized composite fit scores >= 80% indicate statistically reliable job performance fit and minimize variance across interview panels.',
    18,
    currentY,
    { maxWidth: pageWidth - 36 }
  );

  currentY += 8;
  doc.setFont('helvetica', 'italic');
  doc.text('Report certified by Catalina Gil Sierra • Lead TA & Psychometric Systems Architect (USBMED)', 18, currentY);

  // Save / Download PDF
  const filename = `TalentScience-Candidate-Report-${(data.jobTitle || 'Role').replace(/\s+/g, '_')}.pdf`;
  doc.save(filename);
}
