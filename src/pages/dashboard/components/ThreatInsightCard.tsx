import React from 'react';
import { useSystemInsight } from '../../../hooks/useDashboardData';
import { ShieldCheck, Lightbulb, TrendingUp, AlertTriangle, Loader2 } from 'lucide-react';

export function ThreatInsightCard() {
  const { data: insight, isLoading } = useSystemInsight();

  return (
    <div className="col-span-1 bg-white rounded-2xl border border-slate-100 p-6 flex flex-col h-full bg-gradient-to-b from-white to-slate-50/50">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-500 fill-amber-50" />
          <h3 className="text-base font-bold text-slate-900 tracking-tight">System Insights</h3>
        </div>
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
        <div className="flex-1 flex flex-col gap-4">
          {/* Main Insight */}
          <div className="bg-blue-50/60 border border-blue-100 p-4 rounded-xl flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-slate-900 leading-snug">
                {insight.trendInsight}
              </p>
              <p className="text-xs text-slate-500 mt-1">Our engine automatically adjusted rules to counteract this peak.</p>
            </div>
          </div>

          {/* Secondary Insight */}
          <div className="bg-amber-50/50 border border-amber-100 p-4 rounded-xl flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-slate-900 leading-snug">
                {insight.originInsight}
              </p>
            </div>
          </div>

          {/* Summary Stat */}
          <div className="mt-auto">
            <div className="h-px w-full bg-slate-100 mb-4" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Total Prevented</p>
                <p className="text-2xl font-black text-emerald-600 tracking-tight flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5" />
                  {insight.preventedIncidents.toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Risk Score</p>
                <p className="text-2xl font-black text-slate-900 tracking-tight">{insight.weeklyRiskScore}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
