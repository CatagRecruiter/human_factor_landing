import React from 'react';

interface RadarAxis {
  name: string;
  score: number; // 1 to 5
  benchmark?: number; // default 3.5
}

interface RadarChartProps {
  axes: RadarAxis[];
  size?: number;
  candidateName?: string;
}

export const RadarChart: React.FC<RadarChartProps> = ({
  axes,
  size = 280,
  candidateName
}) => {
  if (!axes || axes.length < 3) return null;

  const center = size / 2;
  const radius = (size / 2) - 40;
  const count = axes.length;
  const angleStep = (Math.PI * 2) / count;

  // Level rings: 1, 2, 3, 4, 5
  const rings = [1, 2, 3, 4, 5];

  // Helper to convert polar to cartesian
  const getCoordinates = (index: number, value: number) => {
    const angle = index * angleStep - Math.PI / 2;
    const r = (value / 5) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  // Build candidate polygon points
  const candidatePoints = axes
    .map((axis, i) => {
      const { x, y } = getCoordinates(i, axis.score);
      return `${x},${y}`;
    })
    .join(' ');

  // Build target benchmark polygon points (default benchmark 3.5 / 5)
  const benchmarkPoints = axes
    .map((axis, i) => {
      const { x, y } = getCoordinates(i, axis.benchmark ?? 3.5);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white border border-purple-100 shadow-2xs">
      <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-700 mb-1">
        Radar de Competencias · BARS 360°
      </div>

      <svg width={size} height={size} className="overflow-visible">
        {/* Background Concentric Rings */}
        {rings.map((ring) => {
          const r = (ring / 5) * radius;
          return (
            <circle
              key={ring}
              cx={center}
              cy={center}
              r={r}
              fill="none"
              stroke="#e2e8f0"
              strokeDasharray={ring === 3 || ring === 5 ? 'none' : '3 3'}
              strokeWidth={ring === 3 ? '1.5' : '1'}
            />
          );
        })}

        {/* Axis Spokes from center */}
        {axes.map((_, i) => {
          const { x, y } = getCoordinates(i, 5);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="#cbd5e1"
              strokeWidth="1"
            />
          );
        })}

        {/* Benchmark Area (Dashed Cyan) */}
        <polygon
          points={benchmarkPoints}
          fill="rgba(6, 182, 212, 0.12)"
          stroke="#0891b2"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />

        {/* Candidate Evaluation Area (Vibrant Purple with transition) */}
        <polygon
          points={candidatePoints}
          fill="rgba(124, 58, 237, 0.25)"
          stroke="#7c3aed"
          strokeWidth="2.5"
          className="transition-all duration-500 ease-out"
        />

        {/* Axis End Nodes & Labels */}
        {axes.map((axis, i) => {
          const { x: nodeX, y: nodeY } = getCoordinates(i, axis.score);
          const angle = i * angleStep - Math.PI / 2;
          const labelDist = radius + 22;
          const lx = center + labelDist * Math.cos(angle);
          const ly = center + labelDist * Math.sin(angle);

          return (
            <g key={i}>
              {/* Evaluated Score Node */}
              <circle
                cx={nodeX}
                cy={nodeY}
                r="4.5"
                fill="#7c3aed"
                stroke="#ffffff"
                strokeWidth="2"
                className="transition-all duration-500"
              />

              {/* Axis Label */}
              <text
                x={lx}
                y={ly}
                textAnchor="middle"
                dominantBaseline="central"
                className="text-[9px] font-sans font-semibold fill-slate-700"
                style={{ fontSize: '9.5px' }}
              >
                {axis.name.length > 16 ? `${axis.name.slice(0, 15)}…` : axis.name}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="flex items-center gap-4 text-[10px] font-mono mt-1 text-slate-600">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-purple-600 inline-block" />
          <span>{candidateName || 'Candidato'}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-600 inline-block border border-dashed border-cyan-700" />
          <span>Target Benchmark (3.5)</span>
        </div>
      </div>
    </div>
  );
};
