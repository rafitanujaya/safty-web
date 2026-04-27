import React from 'react';
import { useTopFlaggedWebsites } from '../../../hooks/useDashboardData';
import { Loader2, ShieldAlert } from 'lucide-react';

export function TopThreatSources() {
  const { data: topWebsites, isLoading } = useTopFlaggedWebsites();

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">Top Threat Sources</h3>
          <p className="text-xs text-slate-400 mt-0.5">Most frequent origins of malicious activity</p>
        </div>
        <button className="text-slate-400 hover:text-slate-600 transition-colors">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <circle cx="10" cy="4" r="1.5" />
            <circle cx="10" cy="10" r="1.5" />
            <circle cx="10" cy="16" r="1.5" />
          </svg>
        </button>
      </div>

      <div className="bg-red-50/50 border border-red-100 rounded-xl p-4 flex items-start gap-3 mb-6">
         <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
         <div>
            <span className="text-sm font-semibold text-slate-900 block">Severe Network Activity</span>
            <span className="text-xs text-slate-500">2 specific domains account for 45% of recent alerts. Consider blocking these subnets natively.</span>
         </div>
      </div>

      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
        </div>
      ) : (
        <ul className="space-y-3 flex-1 overflow-y-auto">
          {topWebsites?.map((site, index) => (
            <li key={site.domain} className="flex items-center justify-between px-3 py-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-400 w-5 text-center">{index + 1}</span>
                <div>
                  <p className="text-sm font-semibold text-slate-700 truncate max-w-[200px]">{site.domain}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{site.total_intercepts} intercepts</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                 <span className="text-xs font-medium text-slate-500 mb-1">Risk Score</span>
                 <span className="text-sm font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-100">{site.riskScore}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
