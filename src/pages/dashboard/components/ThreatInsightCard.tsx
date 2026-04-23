import React from 'react';
import { useUserInsight } from '../../../hooks/useDashboardData';
import { TrendingDown, TrendingUp, ShieldCheck, ShieldAlert, Loader2 } from 'lucide-react';

export function ThreatInsightCard() {
  const { data: insight, isLoading } = useUserInsight();

  return (
    <div className="col-span-1 bg-white rounded-2xl border border-slate-100 p-6 flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-bold text-slate-900 tracking-tight">Repeat Customer Rate</h3>
        <button className="text-slate-400 hover:text-slate-600 transition-colors">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <circle cx="10" cy="4" r="1.5" />
            <circle cx="10" cy="10" r="1.5" />
            <circle cx="10" cy="16" r="1.5" />
          </svg>
        </button>
      </div>

      {isLoading || !insight ? (
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
        </div>
      ) : (
        <div className="flex-1 flex flex-col">
          {/* Circular Gauge */}
          <div className="flex-1 flex items-center justify-center">
            <div className="relative">
              <svg className="w-40 h-40 transform -rotate-90">
                <circle cx="80" cy="80" r="68" stroke="#f1f5f9" strokeWidth="12" fill="transparent" />
                <circle
                  cx="80" cy="80" r="68" stroke="#10b981" strokeWidth="12" fill="transparent"
                  strokeDasharray={427.26} strokeDashoffset={427.26 - (427.26 * insight.weeklyRiskScore) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-slate-900">{insight.weeklyRiskScore}%</span>
                <span className="text-xs text-slate-400 font-medium mt-1">On track for 80% target</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-3 mt-6">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span className="text-sm text-slate-600 font-medium">Prevented</span>
              </div>
              <span className="text-sm font-bold text-slate-900">{insight.preventedIncidents}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
              <div className="flex items-center gap-3">
                <ShieldAlert className="w-4 h-4 text-amber-500" />
                <span className="text-sm text-slate-600 font-medium">Near-miss</span>
              </div>
              <span className="text-sm font-bold text-slate-900">{insight.nearMissEvents}</span>
            </div>
          </div>

          <button className="w-full mt-4 text-center text-sm text-blue-600 font-semibold hover:text-blue-700 transition-colors">
            Show details
          </button>
        </div>
      )}
    </div>
  );
}
