import React, { useEffect, useState } from 'react';
import { useDashboardData } from '../../../hooks/useDashboardData';
import { AlertTriangle, Shield, MousePointerClick, FileWarning, Loader2 } from 'lucide-react';
import { cn } from '../../../utils/cn';
import type { ActivityEvent } from '../../../api/mockData';

export function ActivityLog() {
  const { recentEvents: initialData, isLoading } = useDashboardData();
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    if (initialData) {
      setActivities(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    if (!initialData) return;

    const streamInterval = setInterval(() => {
      const liveEvents: any[] = [
        { eventType: 'BACKGROUND_SCAN', actionTaken: 'LOGGED', domain: 'google.com', riskLevel: 'LOW' },
        { eventType: 'PHISHING_PREVENTED', actionTaken: 'BLOCKED', domain: 'login-amazon-update.com', riskLevel: 'HIGH' },
        { eventType: 'TRACKER_BLOCKED', actionTaken: 'BLOCKED', domain: 'free-robux-gen.net', riskLevel: 'MEDIUM' },
        { eventType: 'DOWNLOAD_BLOCKED', actionTaken: 'BLOCKED', domain: 'invoice_2024.exe.zip', riskLevel: 'HIGH' },
        { eventType: 'BACKGROUND_SCAN', actionTaken: 'LOGGED', domain: 'tailwindcss.com', riskLevel: 'LOW' },
      ];

      const randomEvent = liveEvents[Math.floor(Math.random() * liveEvents.length)];
      const newEvent = {
        id: Math.random().toString(),
        eventType: randomEvent.eventType,
        actionTaken: randomEvent.actionTaken,
        domain: randomEvent.domain,
        riskLevel: randomEvent.riskLevel,
        createdAt: new Date().toISOString(),
      };

      // Add simple pulse effect hint
      setActivities(prev => [newEvent, ...prev].slice(0, 10));
    }, 4500);

    return () => clearInterval(streamInterval);
  }, [initialData]);

  const getEventIcon = (eventType: string) => {
    if (eventType.includes('PHISHING')) return <AlertTriangle className="w-3.5 h-3.5" />;
    if (eventType.includes('TRACKER') || eventType.includes('INTERACTION')) return <MousePointerClick className="w-3.5 h-3.5" />;
    if (eventType.includes('DOWNLOAD')) return <FileWarning className="w-3.5 h-3.5" />;
    return <Shield className="w-3.5 h-3.5" />;
  };

  const getSeverityDot = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
      case 'HIGH': return 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]';
      case 'MEDIUM': return 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]';
      case 'LOW': return 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]';
      default: return 'bg-slate-400';
    }
  };

  const formatEventType = (type: string) => {
    return type.replace(/_/g, ' ').replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  };

  return (
    <div className="col-span-1 bg-white rounded-2xl border border-slate-100 p-5 flex flex-col min-h-[380px] relative overflow-hidden">
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
                <div className={cn('w-2 h-2 rounded-full shrink-0', getSeverityDot(activity.riskLevel))} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    {getEventIcon(activity.eventType || '')}
                    <span className="text-xs font-bold text-slate-700 truncate">{formatEventType(activity.eventType || '')}</span>
                    <span className={cn(
                      "text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider",
                      activity.actionTaken === 'BLOCKED' ? 'bg-red-50 text-red-600 border border-red-100' :
                        activity.actionTaken === 'WARNING' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                          'bg-slate-100 text-slate-500 border border-slate-200'
                    )}>
                      {activity.actionTaken}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-mono truncate">{activity.domain}</p>
                </div>
                <span className="text-[11px] text-slate-400 font-semibold whitespace-nowrap bg-white px-2 py-1 rounded shadow-sm border border-slate-100">
                  {new Date(activity.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
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
