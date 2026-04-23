import React from 'react';
import { useTopFlaggedWebsites } from '../../../hooks/useDashboardData';
import { Loader2 } from 'lucide-react';

export function TopFlaggedWebsites() {
  const { data: topWebsites, isLoading } = useTopFlaggedWebsites();

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">Customers</h3>
          <p className="text-xs text-slate-400 mt-0.5">Top flagged domains</p>
        </div>
        <button className="text-slate-400 hover:text-slate-600 transition-colors">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <circle cx="10" cy="4" r="1.5" />
            <circle cx="10" cy="10" r="1.5" />
            <circle cx="10" cy="16" r="1.5" />
          </svg>
        </button>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { icon: '👤', val: '2,884', label: 'Retailers', color: 'bg-blue-50 border-blue-100' },
          { icon: '📦', val: '1,432', label: 'Distributors', color: 'bg-emerald-50 border-emerald-100' },
          { icon: '🏢', val: '562', label: 'Wholesalers', color: 'bg-amber-50 border-amber-100' },
        ].map((s, i) => (
          <div key={i} className={`p-3 rounded-xl border ${s.color} flex items-center gap-3`}>
            <span className="text-lg">{s.icon}</span>
            <div>
              <div className="text-lg font-bold text-slate-900">{s.val}</div>
              <div className="text-[11px] text-slate-400 font-medium">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
        </div>
      ) : (
        <ul className="space-y-2 flex-1">
          {topWebsites?.map((site, index) => (
            <li key={site.domain} className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-400 w-5">{index + 1}</span>
                <div>
                  <p className="text-sm font-medium text-slate-700 truncate max-w-[200px]">{site.domain}</p>
                  <p className="text-xs text-slate-400">{site.count} events</p>
                </div>
              </div>
              <span className="text-sm font-bold text-red-500">{site.riskScore}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
