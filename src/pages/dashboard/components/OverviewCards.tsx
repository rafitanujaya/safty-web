import React from 'react';
import { useOverviewStats } from '../../../hooks/useDashboardData';
import { Activity, ShieldCheck, ShieldAlert, AlertCircle, TrendingUp, TrendingDown } from 'lucide-react';
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
    { label: 'Page Views', value: stats.totalScanned.toLocaleString(), icon: Activity, trend: '+15.6%', trendUp: true, trendLabel: 'vs. 13,653 last period', iconColor: 'text-blue-600 bg-blue-50' },
    { label: 'Suspicious', value: stats.suspiciousDetected, icon: ShieldAlert, trend: '+8.4%', trendUp: true, trendLabel: 'vs. 6,702 last period', iconColor: 'text-amber-600 bg-amber-50' },
    { label: 'Safe Websites', value: stats.safeWebsites.toLocaleString(), icon: ShieldCheck, trend: '+10.6%', trendUp: true, trendLabel: 'vs. 3,284 last period', iconColor: 'text-emerald-600 bg-emerald-50' },
    { label: 'Alerts Today', value: stats.todayAlerts, icon: AlertCircle, trend: '-4.4%', trendUp: false, trendLabel: 'vs. 1,196 last period', iconColor: 'text-red-600 bg-red-50' },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
      {items.map((item, index) => (
        <div key={index} className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-sm transition-all">
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
