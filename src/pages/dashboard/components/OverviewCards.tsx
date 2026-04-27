import React from 'react';
import { useOverviewStats } from '../../../hooks/useDashboardData';
import { ShieldCheck, ShieldAlert, AlertTriangle, AlertCircle } from 'lucide-react';
import { cn } from '../../../utils/cn';

export function OverviewCards() {
  const { data: stats, isLoading } = useOverviewStats();

  if (isLoading || !stats) {
    return <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 animate-pulse">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="p-5 h-28 bg-white rounded-2xl border border-slate-100" />
      ))}
    </div>;
  }

  const items = [
    { label: 'Total Threats Blocked', value: stats.totalThreatsBlocked.toLocaleString(), icon: ShieldCheck, trend: '+12.4%', trendUp: true, trendLabel: 'vs. last 7 days', iconColor: 'text-emerald-600 bg-emerald-50' },
    { label: 'Phishing Detections', value: stats.phishingDetections.toLocaleString(), icon: ShieldAlert, trend: '+23.1%', trendUp: false, trendLabel: 'vs. last 7 days', iconColor: 'text-red-600 bg-red-50' },
    { label: 'Malicious Activity', value: stats.maliciousActivity.toLocaleString(), icon: AlertTriangle, trend: '-5.2%', trendUp: true, trendLabel: 'vs. last 7 days', iconColor: 'text-amber-600 bg-amber-50' },
    { label: 'Suspicious Interactions', value: stats.suspiciousInteractions.toLocaleString(), icon: AlertCircle, trend: '+8.4%', trendUp: false, trendLabel: 'vs. last 7 days', iconColor: 'text-blue-600 bg-blue-50' },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
      {items.map((item, index) => (
        <div key={index} className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-sm transition-all focus-within:ring-2 focus-within:ring-slate-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-slate-500 font-medium">{item.label}</span>
            <div className={cn('p-2 rounded-xl', item.iconColor)}>
              <item.icon className="w-4 h-4" />
            </div>
          </div>
          
          <div className="flex items-end gap-3">
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{item.value}</h3>
            <span className={cn(
              'text-xs font-semibold px-1.5 py-0.5 rounded',
              item.trendUp ? 'text-emerald-600 bg-emerald-50' : 'text-red-500 bg-red-50'
            )}>
              {item.trend}
            </span>
          </div>
          
          <p className="text-xs text-slate-400 mt-2">{item.trendLabel}</p>
        </div>
      ))}
    </div>
  );
}
