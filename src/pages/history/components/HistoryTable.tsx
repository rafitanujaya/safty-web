import React from 'react';
import { Loader2, Shield, ArrowUpDown, ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '../../../utils/cn';
import type { SeverityLevel, ThreatCategory, ThreatHistoryEntry } from '../../../api/mockData';

type SortField = 'timestamp' | 'riskScore' | 'severity';
type SortDirection = 'asc' | 'desc';

interface HistoryTableProps {
  entries: any[];
  isLoading: boolean;
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
}

function getSeverityColor(severity: SeverityLevel) {
  switch (severity) {
    case 'CRITICAL': return 'text-red-600 bg-red-50 border-red-100';
    case 'HIGH':     return 'text-orange-600 bg-orange-50 border-orange-100';
    case 'MEDIUM':   return 'text-yellow-600 bg-yellow-50 border-yellow-100';
    case 'LOW':      return 'text-blue-600 bg-blue-50 border-blue-100';
    default:         return 'text-slate-600 bg-slate-50 border-slate-100';
  }
}

function getCategoryColor(category: ThreatCategory) {
  switch (category) {
    case 'Phishing':          return 'text-red-600 bg-red-50';
    case 'Malware':           return 'text-purple-600 bg-purple-50';
    case 'Suspicious':        return 'text-amber-600 bg-amber-50';
    case 'Adware':            return 'text-blue-600 bg-blue-50';
    case 'Command & Control': return 'text-pink-600 bg-pink-50';
    default:                  return 'text-slate-600 bg-slate-50';
  }
}

function formatTimestamp(iso: string) {
  const d = new Date(iso);
  return {
    time: d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    date: d.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' }),
  };
}

function SortIcon({ field, sortField, sortDirection }: { field: SortField; sortField: SortField; sortDirection: SortDirection }) {
  if (sortField !== field) return <ArrowUpDown className="w-3 h-3 text-slate-300" />;
  return sortDirection === 'asc'
    ? <ChevronUp className="w-3 h-3 text-[#0967F7]" />
    : <ChevronDown className="w-3 h-3 text-[#0967F7]" />;
}

export function HistoryTable({ entries, isLoading, sortField, sortDirection, onSort }: HistoryTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-[11px] text-slate-400 uppercase tracking-wider bg-slate-50/50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-3 font-semibold">
                <button
                  onClick={() => onSort('timestamp')}
                  className="flex items-center gap-1.5 hover:text-slate-600 transition-colors"
                >
                  Time <SortIcon field="timestamp" sortField={sortField} sortDirection={sortDirection} />
                </button>
              </th>
              <th className="px-6 py-3 font-semibold">Domain</th>
              <th className="px-6 py-3 font-semibold">Category</th>
              <th className="px-6 py-3 font-semibold">Action</th>
              <th className="px-6 py-3 font-semibold">
                <button
                  onClick={() => onSort('severity')}
                  className="flex items-center gap-1.5 hover:text-slate-600 transition-colors"
                >
                  Severity <SortIcon field="severity" sortField={sortField} sortDirection={sortDirection} />
                </button>
              </th>
              <th className="px-6 py-3 font-semibold">
                <button
                  onClick={() => onSort('riskScore')}
                  className="flex items-center gap-1.5 hover:text-slate-600 transition-colors"
                >
                  Risk Score <SortIcon field="riskScore" sortField={sortField} sortDirection={sortDirection} />
                </button>
              </th>
              <th className="px-6 py-3 font-semibold">Method</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-50">
            {isLoading ? (
              <tr>
                <td colSpan={7} className="px-6 py-16 text-center">
                  <Loader2 className="w-6 h-6 animate-spin text-slate-400 mx-auto" />
                </td>
              </tr>
            ) : (
              entries.map((entry: any) => {
                const { time, date } = formatTimestamp(entry.createdAt);
                return (
                  <tr key={entry.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-3.5">
                      <span className="text-xs font-semibold text-slate-700 block">{time}</span>
                      <span className="text-[11px] text-slate-400">{date}</span>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className="text-xs font-medium text-slate-700 font-mono truncate max-w-[200px] block">
                        {entry.domain}
                      </span>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className={cn('text-[11px] font-bold px-2 py-0.5 rounded-md', getCategoryColor(entry.category))}>
                        {entry.category}
                      </span>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className={cn(
                        'text-[11px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider border',
                        entry.actionTaken === 'BLOCKED' ? 'text-red-600 bg-red-50 border-red-100' :
                        entry.actionTaken === 'WARNING' ? 'text-amber-600 bg-amber-50 border-amber-100' :
                        'text-slate-500 bg-slate-50 border-slate-200'
                      )}>
                        {entry.actionTaken}
                      </span>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className={cn('text-[11px] font-bold px-2 py-0.5 rounded-md border', getSeverityColor(entry.riskLevel))}>
                        {entry.riskLevel}
                      </span>
                    </td>
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-700">{entry.riskScore}</span>
                        <div className="w-14 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={cn(
                              'h-full rounded-full',
                              entry.riskScore > 80 ? 'bg-red-500' :
                              entry.riskScore > 50 ? 'bg-amber-500' : 'bg-emerald-500'
                            )}
                            style={{ width: `${entry.riskScore}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className="text-xs text-slate-500">{entry.detectionMethod}</span>
                    </td>
                  </tr>
                );
              })
            )}

            {!isLoading && entries.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-16 text-center">
                  <Shield className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                  <p className="text-sm text-slate-400 font-medium">No matching threat history found</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
