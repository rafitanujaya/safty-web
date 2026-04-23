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
        { action: 'Scan Completed', domain: 'google.com', severity: 'info' },
        { action: 'Phishing Detected', domain: 'login-amazon-update.com', severity: 'high' },
        { action: 'Suspicious Form Blocked', domain: 'free-robux-gen.net', severity: 'medium' },
        { action: 'Blocked Download', domain: 'invoice_2024.exe.zip', severity: 'high' },
        { action: 'Scan Completed', domain: 'tailwindcss.com', severity: 'info' },
      ];

      const randomEvent = liveEvents[Math.floor(Math.random() * liveEvents.length)];
      const newEvent: ActivityEvent = {
        id: Math.random().toString(),
        action: randomEvent.action as ActivityEvent['action'],
        domain: randomEvent.domain!,
        severity: randomEvent.severity as ActivityEvent['severity'],
        timestamp: new Date().toISOString(),
      };

      setActivities(prev => [newEvent, ...prev].slice(0, 10));
    }, 8000);

    return () => clearInterval(streamInterval);
  }, [initialData]);

  const getEventIcon = (action: string) => {
    if (action.includes('Phishing')) return <AlertTriangle className="w-3.5 h-3.5" />;
    if (action.includes('Form')) return <MousePointerClick className="w-3.5 h-3.5" />;
    if (action.includes('Download')) return <FileWarning className="w-3.5 h-3.5" />;
    return <Shield className="w-3.5 h-3.5" />;
  };

  const getSeverityDot = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-amber-500';
      case 'info': return 'bg-emerald-500';
      default: return 'bg-slate-400';
    }
  };

  return (
    <div className="col-span-1 bg-white rounded-2xl border border-slate-100 p-5 flex flex-col min-h-[380px]">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-bold text-slate-900 tracking-tight">Most Day Active</h3>
        </div>
        <button className="text-slate-400 hover:text-slate-600 transition-colors">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <circle cx="10" cy="4" r="1.5" />
            <circle cx="10" cy="10" r="1.5" />
            <circle cx="10" cy="16" r="1.5" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center text-slate-400 h-32">
            <Loader2 className="w-5 h-5 animate-spin" />
          </div>
        ) : (
          <div className="space-y-2">
            {activities.map((activity, i) => (
              <div
                key={activity.id}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors"
              >
                <div className={cn('w-2 h-2 rounded-full shrink-0', getSeverityDot(activity.severity))} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-700 truncate">{activity.action}</p>
                  <p className="text-xs text-slate-400 font-mono truncate">{activity.domain}</p>
                </div>
                <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap">
                  {new Date(activity.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
