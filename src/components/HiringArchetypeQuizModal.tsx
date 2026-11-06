import React, { useState } from 'react';
import { X, Sparkles, Target, ShieldAlert, Cpu, ArrowRight, CheckCircle2 } from 'lucide-react';
import { haptics } from '../lib/haptics';
import { sound } from '../lib/sound';

interface HiringArchetypeQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'en' | 'es';
  onSelectModule: (module: 'converter' | 'calculator') => void;
}

export const HiringArchetypeQuizModal: React.FC<HiringArchetypeQuizModalProps> = ({
  isOpen,
  onClose,
  lang,
  onSelectModule
}) => {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<'founder' | 'eng_vp' | 'people_ops' | null>(null);
  const [pain, setPain] = useState<'variance' | 'cost' | 'sourcing' | null>(null);
  const [result, setResult] = useState<{
    title: string;
    description: string;
    recommendedModule: 'converter' | 'calculator';
    moduleName: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleNextToPain = (selectedRole: 'founder' | 'eng_vp' | 'people_ops') => {
    haptics.step();
    sound.playClick();
    setRole(selectedRole);
    setStep(2);
  };

  const handleCalculateArchetype = (selectedPain: 'variance' | 'cost' | 'sourcing') => {
    haptics.impact();
    sound.playSuccess();
    setPain(selectedPain);

    if (selectedPain === 'variance' || selectedRoleIsEng(role)) {
      setResult({
        title: lang === 'es' ? 'Arquetipo: Arquitecto de Consistencia Técnica' : 'Archetype: Technical Consistency Architect',
        description: lang === 'es' 
          ? 'Tu prioridad es eliminar el sesgo subjetivo de los comités de ingeniería mediante rúbricas objetivas BARS.'
          : 'Your priority is eliminating subjective bias from engineering committees through objective BARS rubrics.',
        recommendedModule: 'converter',
        moduleName: lang === 'es' ? 'Arena BARS y Ajuste % Ponderado' : 'BARS Arena & Weighted Fit %'
      });
    } else {
      setResult({
        title: lang === 'es' ? 'Arquetipo: Protector de Margen Operativo' : 'Archetype: Operational Margin Protector',
        description: lang === 'es'
          ? 'Tu foco principal es cuantificar y recuperar el gasto oculto de malas contrataciones y horas técnicas desperdiciadas.'
          : 'Your focus is quantifying and recovering hidden costs from mis-hires and wasted engineering hours.',
        recommendedModule: 'calculator',
        moduleName: lang === 'es' ? 'Auditoría de Ineficiencia y Costos P&L' : 'Inefficient Interviewing Audit (P&L)'
      });
    }
    setStep(3);
  };

  function selectedRoleIsEng(r: 'founder' | 'eng_vp' | 'people_ops' | null) {
    return r === 'eng_vp';
  }

  const handleLaunch = () => {
    if (result) {
      onSelectModule(result.recommendedModule);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-white border border-purple-200 shadow-2xl p-6 sm:p-7 overflow-hidden space-y-5">
        
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-800">
              {lang === 'es' ? 'Diagnóstico Rápido de Contratación' : 'Hiring Diagnostic & Archetype Quiz'}
            </span>
          </div>
          <button
            onClick={() => {
              haptics.tap();
              onClose();
            }}
            className="p-1.5 rounded-full text-slate-400 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step 1: Role Selection */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <div className="text-[10px] font-mono text-slate-400 font-bold uppercase">
                {lang === 'es' ? 'Paso 1 de 2' : 'Step 1 of 2'}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                {lang === 'es' ? '¿Cuál es tu rol en la organización?' : 'What is your primary leadership role?'}
              </h3>
            </div>

            <div className="space-y-2.5">
              <button
                onClick={() => handleNextToPain('founder')}
                className="w-full p-3.5 rounded-xl border border-slate-200 hover:border-purple-500 hover:bg-purple-50/40 text-left transition-all flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <div className="font-bold text-xs text-slate-900 group-hover:text-purple-900">
                    {lang === 'es' ? 'Founder / CEO / Managing Director' : 'Founder / CEO / Managing Director'}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {lang === 'es' ? 'Crecimiento de equipo con runway y márgenes controlados.' : 'Scaling teams while safeguarding runway and operating margins.'}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-0.5 transition-all" />
              </button>

              <button
                onClick={() => handleNextToPain('eng_vp')}
                className="w-full p-3.5 rounded-xl border border-slate-200 hover:border-purple-500 hover:bg-purple-50/40 text-left transition-all flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <div className="font-bold text-xs text-slate-900 group-hover:text-purple-900">
                    {lang === 'es' ? 'VP of Engineering / Head of Tech' : 'VP of Engineering / Head of Tech'}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {lang === 'es' ? 'Calidad técnica, rigor en código y cero debate subjetivo.' : 'Technical bar, coding rigor, and eliminating subjective panel debates.'}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-0.5 transition-all" />
              </button>

              <button
                onClick={() => handleNextToPain('people_ops')}
                className="w-full p-3.5 rounded-xl border border-slate-200 hover:border-purple-500 hover:bg-purple-50/40 text-left transition-all flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <div className="font-bold text-xs text-slate-900 group-hover:text-purple-900">
                    {lang === 'es' ? 'VP / Director of People & Talent Acquisition' : 'VP / Director of People & Talent Acquisition'}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {lang === 'es' ? 'Automatización de embudos con n8n, cNPS y retención a 12 meses.' : 'Funnel automation with n8n, cNPS, and 12-month retention.'}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-0.5 transition-all" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Friction Point */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <div className="text-[10px] font-mono text-slate-400 font-bold uppercase">
                {lang === 'es' ? 'Paso 2 de 2' : 'Step 2 of 2'}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                {lang === 'es' ? '¿Cuál es la mayor fricción en tus contrataciones?' : 'What is your single biggest hiring bottleneck?'}
              </h3>
            </div>

            <div className="space-y-2.5">
              <button
                onClick={() => handleCalculateArchetype('variance')}
                className="w-full p-3.5 rounded-xl border border-slate-200 hover:border-purple-500 hover:bg-purple-50/40 text-left transition-all flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <div className="font-bold text-xs text-slate-900 group-hover:text-purple-900">
                    {lang === 'es' ? 'Varianza y "vibe checks" en entrevistas técnicas' : 'Interviewer variance & unstructured "vibe checks"'}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {lang === 'es' ? 'Los evaluadores usan criterios dispares y sin anclas observables.' : 'Evaluators use conflicting criteria without behavioral anchors.'}
                  </div>
                </div>
                <Target className="w-4 h-4 text-purple-600" />
              </button>

              <button
                onClick={() => handleCalculateArchetype('cost')}
                className="w-full p-3.5 rounded-xl border border-slate-200 hover:border-purple-500 hover:bg-purple-50/40 text-left transition-all flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <div className="font-bold text-xs text-slate-900 group-hover:text-purple-900">
                    {lang === 'es' ? 'Fuga financiera por rotación temprana (meses 1 a 6)' : 'Capital bleed from early turnover & agency fees'}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {lang === 'es' ? 'Altos costes de reemplazo y desalineación tras la contratación.' : 'Heavy replacement costs and operational disruption.'}
                  </div>
                </div>
                <ShieldAlert className="w-4 h-4 text-red-500" />
              </button>

              <button
                onClick={() => handleCalculateArchetype('sourcing')}
                className="w-full p-3.5 rounded-xl border border-slate-200 hover:border-purple-500 hover:bg-purple-50/40 text-left transition-all flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <div className="font-bold text-xs text-slate-900 group-hover:text-purple-900">
                    {lang === 'es' ? 'Procesos manuales lentos y baja respuesta outbound' : 'Slow manual loops & low outbound candidate reply'}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {lang === 'es' ? 'Necesidad de automatizar con n8n y escalar el embudo.' : 'Need to automate pipelines with n8n and scale conversion.'}
                  </div>
                </div>
                <Cpu className="w-4 h-4 text-indigo-600" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Result & Recommendation */}
        {step === 3 && result && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 space-y-2 text-center">
              <span className="text-[10px] font-mono uppercase tracking-wider text-purple-700 font-bold">
                {lang === 'es' ? 'Perfil Calibrado' : 'Calibrated Profile'}
              </span>
              <h3 className="text-lg font-black text-purple-950">
                {result.title}
              </h3>
              <p className="text-xs text-slate-700 leading-relaxed max-w-sm mx-auto">
                {result.description}
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
              <div>
                <div className="text-[10px] font-mono uppercase text-slate-400 font-semibold">
                  {lang === 'es' ? 'Módulo Recomendado' : 'Recommended Module'}
                </div>
                <div className="text-xs font-bold text-slate-900">
                  {result.moduleName}
                </div>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>

            <button
              onClick={handleLaunch}
              className="w-full py-3 px-4 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer"
            >
              <span>{lang === 'es' ? 'Abrir Módulo Recomendado' : 'Launch Recommended Module'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
