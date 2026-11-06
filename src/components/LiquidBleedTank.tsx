import React from 'react';
import { ShieldCheck, AlertTriangle, Sparkles } from 'lucide-react';
import { haptics } from '../lib/haptics';
import { sound } from '../lib/sound';

interface LiquidBleedTankProps {
  totalWaste: number;
  savings: number;
  isProtected: boolean;
  onToggleProtected: () => void;
  lang: 'en' | 'es';
}

export const LiquidBleedTank: React.FC<LiquidBleedTankProps> = ({
  totalWaste,
  savings,
  isProtected,
  onToggleProtected,
  lang
}) => {
  // Normalize fill percentage: $30k -> 25%, $300k+ -> 88%
  const baseFill = Math.min(Math.max((totalWaste / 350000) * 85, 20), 88);
  const fillPct = isProtected ? Math.max(18, baseFill * 0.32) : baseFill;

  const handleToggle = () => {
    haptics.impact();
    if (!isProtected) {
      sound.playSuccess();
    } else {
      sound.playClick();
    }
    onToggleProtected();
  };

  const fluidColor = isProtected ? '#10b981' : '#ef4444';
  const fluidBg = isProtected ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.12)';

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 shadow-xs relative overflow-hidden">
      {/* Header and Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
            {lang === 'es' ? 'Simulador Dinámico de Fuga' : 'Dynamic P&L Bleed Tank'}
          </span>
          <h3 className="text-sm font-bold text-slate-900">
            {isProtected 
              ? (lang === 'es' ? 'Blindaje Psicométrico BARS Activo' : 'BARS Psychometric Shield Active')
              : (lang === 'es' ? 'Fuga Financiera por Intuición No Estructurada' : 'Unmitigated Intuition Bleed')}
          </h3>
        </div>

        {/* Protection Mode Toggle Switch */}
        <button
          onClick={handleToggle}
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer shadow-2xs active:scale-95 ${
            isProtected
              ? 'bg-emerald-50 border-emerald-300 text-emerald-800 ring-2 ring-emerald-500/20'
              : 'bg-red-50 border-red-200 text-red-700 hover:bg-red-100/70'
          }`}
        >
          {isProtected ? <ShieldCheck className="w-4 h-4 text-emerald-600" /> : <AlertTriangle className="w-4 h-4 text-red-600" />}
          <span>
            {isProtected
              ? (lang === 'es' ? 'Blindaje Activo (65% Ahorro)' : 'Shield Active (65% Saved)')
              : (lang === 'es' ? 'Activar Blindaje BARS' : 'Activate BARS Shield')}
          </span>
        </button>
      </div>

      {/* Visual Glass Tank with Fluid SVG */}
      <div className="relative h-44 sm:h-48 w-full rounded-xl overflow-hidden border-2 border-slate-200/90 bg-slate-50 flex flex-col justify-end">
        {/* Measurement Ticks on Left Side */}
        <div className="absolute left-2.5 top-2 bottom-2 flex flex-col justify-between text-[9px] font-mono text-slate-400 z-10 pointer-events-none">
          <span>$400K</span>
          <span>$300K</span>
          <span>$200K</span>
          <span>$100K</span>
          <span>$0K</span>
        </div>

        {/* Animated Fluid Container */}
        <div
          className="w-full relative transition-all duration-700 ease-out"
          style={{
            height: `${fillPct}%`,
            backgroundColor: fluidBg
          }}
        >
          {/* Animated Wave Surface */}
          <div className="absolute top-0 left-0 right-0 h-4 -mt-3 overflow-hidden pointer-events-none">
            <svg
              viewBox="0 0 500 150"
              preserveAspectRatio="none"
              className="w-[200%] h-full animate-[wave_4s_linear_infinite]"
              style={{ fill: fluidColor, opacity: 0.35 }}
            >
              <path d="M0.00,49.98 C150.00,150.00 349.20,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" />
            </svg>
          </div>

          {/* Core Fluid Layer */}
          <div
            className="w-full h-full transition-colors duration-500"
            style={{
              background: `linear-gradient(to top, ${fluidColor} 0%, ${fluidColor}99 100%)`
            }}
          />

          {/* Tank Value Badge Centered */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-3 z-10 pointer-events-none text-center">
            <div className="text-[10px] font-mono uppercase tracking-wider opacity-90 drop-shadow-sm">
              {isProtected
                ? (lang === 'es' ? 'Presupuesto Rescatado' : 'Budget Rescued')
                : (lang === 'es' ? 'Capital Drenado / Año' : 'Capital Burned / Year')}
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight drop-shadow-md">
              ${(isProtected ? savings : totalWaste).toLocaleString()}
            </div>
            {isProtected && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full mt-0.5">
                <Sparkles className="w-3 h-3 text-amber-200" />
                <span>{lang === 'es' ? '65% Eficiencia Operativa' : '65% Operational Efficiency'}</span>
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="text-[11px] text-slate-500 font-medium text-center">
        {isProtected
          ? (lang === 'es'
              ? 'Con matrices BARS y flujos n8n, las horas de ingeniería se reducen a 9h por contratación y la fuga por desalineación cae al mínimo.'
              : 'With calibrated BARS rubrics & n8n workflows, interview panel hours fall to 9h per hire and mis-hire leakage is minimized.')
          : (lang === 'es'
              ? 'Mueva los controles de la izquierda para calibrar el volumen de ingenieros, vacantes y tarifas de agencias.'
              : 'Adjust the sliders on the left to calibrate panel size, hire count, and third-party fee exposure.')}
      </div>
    </div>
  );
};
