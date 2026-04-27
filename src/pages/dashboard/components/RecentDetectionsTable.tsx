import React from 'react';
import { Badge, type BadgeVariant } from '../../../components/atoms/Badge';
import { useRecentDetections } from '../../../hooks/useDashboardData';
import { Loader2 } from 'lucide-react';
import { type SeverityLevel } from '../../../api/mockData';

export function RecentDetectionsTable() {
  const { data: detections, isLoading } = useRecentDetections();

  const getStatusBadge = (status: string): BadgeVariant => {
    switch (status) {
      case 'BLOCKED': return 'success'; 
      case 'WARNING': return 'warning';
      case 'LOGGED': return 'default';
      default: return 'default';
    }
  };

  const getSeverityColor = (severity: SeverityLevel) => {
    switch (severity) {
      case 'CRITICAL': return 'text-red-600 bg-red-50 border-red-100';
      case 'HIGH': return 'text-orange-600 bg-orange-50 border-orange-100';
      case 'MEDIUM': return 'text-yellow-600 bg-yellow-50 border-yellow-100';
      case 'LOW': return 'text-blue-600 bg-blue-50 border-blue-100';
      default: return 'text-slate-600 bg-slate-50 border-slate-100';
    }
  };

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return `${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · ${d.toLocaleDateString()}`;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden flex flex-col">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">Recent Detections</h3>
          <p className="text-xs text-slate-400 mt-0.5">Intercepted domains across your subnet</p>
        </div>
        <button className="text-slate-400 hover:text-slate-600 transition-colors">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <circle cx="10" cy="4" r="1.5" />
            <circle cx="10" cy="10" r="1.5" />
            <circle cx="10" cy="16" r="1.5" />
          </svg>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-[11px] text-slate-400 uppercase tracking-wider bg-slate-50/50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-3 font-semibold">Time</th>
              <th className="px-6 py-3 font-semibold">Domain</th>
              <th className="px-6 py-3 font-semibold">Action</th>
              <th className="px-6 py-3 font-semibold">Severity</th>
              <th className="px-6 py-3 font-semibold">Risk Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center">
                  <Loader2 className="w-5 h-5 animate-spin text-slate-400 mx-auto" />
                </td>
              </tr>
            ) : (
              detections?.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-3.5 text-slate-400 font-mono text-xs whitespace-nowrap">
                    {new Date(d.detected_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="px-6 py-3.5">
                    <span className="font-medium text-slate-700 truncate max-w-[200px] block">{d.domain}</span>
                    <span className="text-xs text-slate-400 mt-0.5 block">{d.category}</span>
                  </td>
                  <td className="px-6 py-3.5">
                    <Badge variant={getStatusBadge(d.action_taken)}>{d.action_taken}</Badge>
                  </td>
                  <td className="px-6 py-3.5">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold border ${getSeverityColor(d.severity)}`}>
                      {d.severity}
                    </span>
                  </td>
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-2">
                       <span className="text-slate-700 font-bold">{d.riskScore}</span>
                       <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full ${d.riskScore > 80 ? 'bg-red-500' : d.riskScore > 50 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${d.riskScore}%`}} />
                       </div>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
