import React from 'react';
import { Badge, type BadgeVariant } from '../../../components/atoms/Badge';
import { useRecentDetections } from '../../../hooks/useDashboardData';
import { Loader2 } from 'lucide-react';
import type { ThreatCategory } from '../../../api/mockData';

export function RecentDetectionsTable() {
  const { data: detections, isLoading } = useRecentDetections();

  const getStatusBadge = (status: string): BadgeVariant => {
    switch (status) {
      case 'Blocked': return 'success';
      case 'Warning': return 'warning';
      case 'Passed': return 'default';
      default: return 'default';
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
          <h3 className="text-base font-bold text-slate-900 tracking-tight">Best Selling Products</h3>
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
              <th className="px-6 py-3 font-semibold">#</th>
              <th className="px-6 py-3 font-semibold">Name</th>
              <th className="px-6 py-3 font-semibold">Action</th>
              <th className="px-6 py-3 font-semibold">Revenue</th>
              <th className="px-6 py-3 font-semibold">Rating</th>
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
              detections?.map((d, i) => (
                <tr key={d.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-3.5 text-slate-400 font-mono text-xs">#{(83009 + i).toString()}</td>
                  <td className="px-6 py-3.5">
                    <span className="font-medium text-slate-700 truncate max-w-[200px] block">{d.domain}</span>
                  </td>
                  <td className="px-6 py-3.5">
                    <Badge variant={getStatusBadge(d.status)}>{d.status}</Badge>
                  </td>
                  <td className="px-6 py-3.5 text-slate-600 font-medium">
                    <span className="text-emerald-600">◉</span> ${(d.riskScore * 1347).toLocaleString()}
                  </td>
                  <td className="px-6 py-3.5 text-slate-600 font-medium">
                    <span className="text-amber-500">★</span> {(d.riskScore / 20).toFixed(1)}
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
