import React from 'react';
import { useDashboardData } from '../../../hooks/useDashboardData';
import { Loader2 } from 'lucide-react';
import { cn } from '../../../utils/cn';

export function RiskLevelGauge() {
  const { riskLevel: insight, isLoading } = useDashboardData();

  const riskScore = insight?.averageRiskScore ?? 0;

  const getRiskLevel = (score: number) => {
    if (score <= 20) return { label: 'Very Low', color: '#10b981', bgColor: 'bg-emerald-50', textColor: 'text-emerald-600' };
    if (score <= 40) return { label: 'Low', color: '#3b82f6', bgColor: 'bg-blue-50', textColor: 'text-blue-600' };
    if (score <= 60) return { label: 'Moderate', color: '#eab308', bgColor: 'bg-yellow-50', textColor: 'text-yellow-600' };
    if (score <= 80) return { label: 'High', color: '#f97316', bgColor: 'bg-orange-50', textColor: 'text-orange-600' };
    return { label: 'Critical', color: '#ef4444', bgColor: 'bg-red-50', textColor: 'text-red-600' };
  };

  const risk = getRiskLevel(riskScore);

  // SVG arc calculations for the gauge
  const radius = 80;
  const strokeWidth = 14;
  const cx = 100;
  const cy = 100;
  const startAngle = -210;
  const endAngle = 30;
  const totalAngle = endAngle - startAngle; // 240 degrees
  const progressAngle = startAngle + (riskScore / 100) * totalAngle;

  const polarToCartesian = (centerX: number, centerY: number, r: number, angleDeg: number) => {
    const angleRad = (angleDeg * Math.PI) / 180;
    return {
      x: centerX + r * Math.cos(angleRad),
      y: centerY + r * Math.sin(angleRad),
    };
  };

  const describeArc = (x: number, y: number, r: number, startAng: number, endAng: number) => {
    const start = polarToCartesian(x, y, r, endAng);
    const end = polarToCartesian(x, y, r, startAng);
    const largeArcFlag = endAng - startAng <= 180 ? '0' : '1';
    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
  };

  // Gradient stops for the gauge arc
  const gradientStops = [
    { offset: '0%', color: '#10b981' },
    { offset: '25%', color: '#3b82f6' },
    { offset: '50%', color: '#eab308' },
    { offset: '75%', color: '#f97316' },
    { offset: '100%', color: '#ef4444' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 flex flex-col items-center min-h-[300px]">
      <div className="flex items-center justify-between w-full mb-2">
        <h3 className="text-base font-bold text-slate-900 tracking-tight">System Risk Level</h3>
        <span className={cn('text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider', risk.bgColor, risk.textColor)}>
          {risk.label}
        </span>
      </div>

      <div className="flex-1 flex items-center justify-center">
        {isLoading ? (
          <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
        ) : (
          <div className="relative">
            <svg width="200" height="140" viewBox="0 0 200 140">
              <defs>
                <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  {gradientStops.map((stop) => (
                    <stop key={stop.offset} offset={stop.offset} stopColor={stop.color} />
                  ))}
                </linearGradient>
              </defs>
              {/* Background arc */}
              <path
                d={describeArc(cx, cy, radius, startAngle, endAngle)}
                fill="none"
                stroke="#f1f5f9"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
              />
              {/* Progress arc */}
              <path
                d={describeArc(cx, cy, radius, startAngle, progressAngle)}
                fill="none"
                stroke={risk.color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                style={{
                  transition: 'all 1s ease-out',
                  filter: `drop-shadow(0 0 6px ${risk.color}40)`,
                }}
              />
              {/* Center score text */}
              <text x={cx} y={cy - 8} textAnchor="middle" className="text-4xl font-bold" fill="#0f172a" fontSize="36" fontWeight="800">
                {riskScore}
              </text>
              <text x={cx} y={cx + 14} textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="500">
                out of 100
              </text>
            </svg>
          </div>
        )}
      </div>

      <p className="text-xs text-slate-500 text-center mt-2 leading-relaxed">
        {insight ? `Your current risk level is ${insight.riskLevel}` : 'Calculating your risk score...'}
      </p>
    </div>
  );
}
