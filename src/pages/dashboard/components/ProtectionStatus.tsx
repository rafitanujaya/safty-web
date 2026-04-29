import React from 'react';
import { useProtectionConfig } from '../../../hooks/useDashboardData';
import { Shield, ShieldCheck, FileSearch, FormInput, MonitorSmartphone, RefreshCcw, Loader2 } from 'lucide-react';
import { cn } from '../../../utils/cn';

export function ProtectionStatus() {
  const { data: config, isLoading } = useProtectionConfig();

  if (isLoading || !config) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 p-6 min-h-[300px] flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
      </div>
    );
  }

  const statusItems = [
    { label: 'Realtime Scan', enabled: config.realtimeProtection, icon: ShieldCheck },
    { label: 'Form Protection', enabled: config.formBlocking, icon: FormInput },
    { label: 'Download Scanning', enabled: config.downloadScanning, icon: FileSearch },
  ];

  const formatSyncTime = (iso: string) => {
    const d = new Date(iso);
    const now = new Date();
    const diffMin = Math.round((now.getTime() - d.getTime()) / 60000);
    if (diffMin < 1) return 'Just now';
    if (diffMin < 60) return `${diffMin} min ago`;
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 flex flex-col min-h-[300px]">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-bold text-slate-900 tracking-tight">Protection Status</h3>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">Active</span>
        </div>
      </div>

      <div className="space-y-3 flex-1">
        {statusItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-slate-50/50 border border-slate-100/50">
              <div className="flex items-center gap-3">
                <Icon className={cn('w-4 h-4', item.enabled ? 'text-[#0967F7]' : 'text-slate-400')} />
                <span className="text-sm font-medium text-slate-700">{item.label}</span>
              </div>
              <span className={cn(
                'text-[11px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider',
                item.enabled ? 'text-emerald-600 bg-emerald-50 border border-emerald-100' : 'text-slate-400 bg-slate-100 border border-slate-200'
              )}>
                {item.enabled ? 'ON' : 'OFF'}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-500">
            <MonitorSmartphone className="w-3.5 h-3.5" />
            <span className="text-xs font-medium">Device</span>
          </div>
          <span className="text-xs font-semibold text-slate-700">{config.deviceName}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-500">
            <RefreshCcw className="w-3.5 h-3.5" />
            <span className="text-xs font-medium">Last Sync</span>
          </div>
          <span className="text-xs font-semibold text-slate-700">{formatSyncTime(config.lastSync)}</span>
        </div>
      </div>
    </div>
  );
}
