import React, { useEffect, useState } from 'react';
import { useInitialActivities } from '../../../hooks/useDashboardData';
import { AlertTriangle, Shield, MousePointerClick, FileWarning, Loader2 } from 'lucide-react';
import { cn } from '../../../utils/cn';
import type { ActivityEvent } from '../../../api/mockData';

export function ActivityLog() {
  const { data: initialData, isLoading } = useInitialActivities();
  const [activities, setActivities] = useState<ActivityEvent[]>([]);

  useEffect(() => {
    if (initialData) {
      setActivities(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    if (!initialData) return;

    const streamInterval = setInterval(() => {
      const liveEvents: Partial<ActivityEvent>[] = [
        { action: 'Background Scan', domain: 'google.com', severity: 'info' },
        { action: 'Phishing Prevented', domain: 'login-amazon-update.com', severity: 'high' },
        { action: 'Tracker Blocked', domain: 'free-robux-gen.net', severity: 'medium' },
        { action: 'Blocked Download', domain: 'invoice_2024.exe.zip', severity: 'high' },
        { action: 'Background Scan', domain: 'tailwindcss.com', severity: 'info' },
      ];

      const randomEvent = liveEvents[Math.floor(Math.random() * liveEvents.length)];
      const newEvent: ActivityEvent = {
        id: Math.random().toString(),
        action: randomEvent.action as ActivityEvent['action'],
        domain: randomEvent.domain!,
        severity: randomEvent.severity as ActivityEvent['severity'],
        timestamp: new Date().toISOString(),
      };

      // Add simple pulse effect hint
      setActivities(prev => [newEvent, ...prev].slice(0, 10));
    }, 4500);

    return () => clearInterval(streamInterval);
  }, [initialData]);

  const getEventIcon = (action: string) => {
    if (action.includes('Phishing')) return <AlertTriangle className="w-3.5 h-3.5" />;
    if (action.includes('Form') || action.includes('Tracker')) return <MousePointerClick className="w-3.5 h-3.5" />;
    if (action.includes('Download')) return <FileWarning className="w-3.5 h-3.5" />;
    return <Shield className="w-3.5 h-3.5" />;
  };

  const getSeverityDot = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]';
      case 'medium': return 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]';
      case 'info': return 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]';
      default: return 'bg-slate-400';
    }
  };

  return (
    <div className="col-span-1 bg-white rounded-2xl border border-slate-100 p-5 flex flex-col min-h-[380px] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500" />
      
      <div className="flex items-center justify-between mb-5 mt-1">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <h3 className="text-base font-bold text-slate-900 tracking-tight">Real-Time Activity Log</h3>
        </div>
        <button className="text-slate-400 hover:text-slate-600 transition-colors">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <circle cx="10" cy="4" r="1.5" />
            <circle cx="10" cy="10" r="1.5" />
            <circle cx="10" cy="16" r="1.5" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-1">
        {isLoading ? (
          <div className="flex items-center justify-center text-slate-400 h-32">
            <Loader2 className="w-5 h-5 animate-spin" />
          </div>
        ) : (
          <div className="space-y-2">
            {activities.map((activity, i) => (
              <div
                key={activity.id}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-500 border border-transparent",
                  i === 0 ? "bg-slate-50 border-slate-100 translate-x-0 opacity-100" : "hover:bg-slate-50/50"
                )}
                style={i === 0 ? { animation: 'slideRight 0.5s ease-out' } : undefined}
              >
                <div className={cn('w-2 h-2 rounded-full shrink-0', getSeverityDot(activity.severity))} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-700 truncate">{activity.action}</p>
                  <p className="text-xs text-slate-500 font-mono truncate">{activity.domain}</p>
                </div>
                <span className="text-[11px] text-slate-400 font-semibold whitespace-nowrap bg-white px-2 py-1 rounded shadow-sm border border-slate-100">
                  {new Date(activity.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
      <style>{`
        @keyframes slideRight {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
