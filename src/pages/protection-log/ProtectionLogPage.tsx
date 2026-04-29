import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../../components/organisms/DashboardLayout';
import { useInitialActivities } from '../../hooks/useDashboardData';
import { AlertTriangle, Shield, MousePointerClick, FileWarning, Loader2, ArrowUpDown, Filter, RefreshCcw } from 'lucide-react';
import { cn } from '../../utils/cn';
import type { ActivityEvent, SeverityLevel } from '../../api/mockData';

export function ProtectionLogPage() {
  const { data: initialData, isLoading } = useInitialActivities();
  const [activities, setActivities] = useState<ActivityEvent[]>([]);
  const [filterSeverity, setFilterSeverity] = useState<SeverityLevel | 'ALL'>('ALL');
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    if (initialData) {
      setActivities(initialData);
    }
  }, [initialData]);

  // Live event stream
  useEffect(() => {
    if (!initialData || !isLive) return;

    const liveEvents: Partial<ActivityEvent>[] = [
      { event_type: 'BACKGROUND_SCAN', action_taken: 'LOGGED', domain: 'google.com', severity: 'LOW' },
      { event_type: 'PHISHING_PREVENTED', action_taken: 'BLOCKED', domain: 'login-amazon-update.com', severity: 'HIGH' },
      { event_type: 'TRACKER_BLOCKED', action_taken: 'BLOCKED', domain: 'free-robux-gen.net', severity: 'MEDIUM' },
      { event_type: 'DOWNLOAD_BLOCKED', action_taken: 'BLOCKED', domain: 'invoice_2024.exe.zip', severity: 'HIGH' },
      { event_type: 'BACKGROUND_SCAN', action_taken: 'LOGGED', domain: 'tailwindcss.com', severity: 'LOW' },
      { event_type: 'REDIRECT_BLOCKED', action_taken: 'BLOCKED', domain: 'suspicious-redirect.xyz', severity: 'MEDIUM' },
      { event_type: 'PHISHING_PREVENTED', action_taken: 'BLOCKED', domain: 'verify-paypal-account.info', severity: 'CRITICAL' },
      { event_type: 'FORM_BLOCKED', action_taken: 'WARNING', domain: 'fake-survey-site.com', severity: 'LOW' },
      { event_type: 'SUSPICIOUS_INTERACTION', action_taken: 'WARNING', domain: 'crypto-pump-signal.io', severity: 'MEDIUM' },
      { event_type: 'DOWNLOAD_BLOCKED', action_taken: 'BLOCKED', domain: 'free-antivirus-pro.exe', severity: 'HIGH' },
    ];

    const streamInterval = setInterval(() => {
      const randomEvent = liveEvents[Math.floor(Math.random() * liveEvents.length)];
      const newEvent: ActivityEvent = {
        id: Math.random().toString(36).substring(7),
        event_type: randomEvent.event_type as ActivityEvent['event_type'],
        action_taken: randomEvent.action_taken as ActivityEvent['action_taken'],
        domain: randomEvent.domain!,
        severity: randomEvent.severity as ActivityEvent['severity'],
        detected_at: new Date().toISOString(),
      };
      setActivities(prev => [newEvent, ...prev].slice(0, 50));
    }, 3500);

    return () => clearInterval(streamInterval);
  }, [initialData, isLive]);

  const getEventIcon = (eventType: string) => {
    if (eventType.includes('PHISHING')) return <AlertTriangle className="w-4 h-4" />;
    if (eventType.includes('TRACKER') || eventType.includes('INTERACTION') || eventType.includes('FORM') || eventType.includes('REDIRECT')) return <MousePointerClick className="w-4 h-4" />;
    if (eventType.includes('DOWNLOAD')) return <FileWarning className="w-4 h-4" />;
    return <Shield className="w-4 h-4" />;
  };

  const getEventIconColor = (eventType: string) => {
    if (eventType.includes('PHISHING')) return 'text-red-500 bg-red-50';
    if (eventType.includes('DOWNLOAD')) return 'text-amber-500 bg-amber-50';
    if (eventType.includes('TRACKER')) return 'text-purple-500 bg-purple-50';
    if (eventType.includes('REDIRECT')) return 'text-orange-500 bg-orange-50';
    if (eventType.includes('FORM')) return 'text-blue-500 bg-blue-50';
    return 'text-slate-500 bg-slate-50';
  };

  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return 'text-red-600 bg-red-50 border-red-100';
      case 'HIGH': return 'text-orange-600 bg-orange-50 border-orange-100';
      case 'MEDIUM': return 'text-yellow-600 bg-yellow-50 border-yellow-100';
      case 'LOW': return 'text-blue-600 bg-blue-50 border-blue-100';
      default: return 'text-slate-600 bg-slate-50 border-slate-100';
    }
  };

  const formatEventType = (type: string) => {
    return type.replace(/_/g, ' ').replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  };

  const formatTime = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  const filteredActivities = filterSeverity === 'ALL'
    ? activities
    : activities.filter(a => a.severity === filterSeverity);

  const severityCounts = {
    ALL: activities.length,
    CRITICAL: activities.filter(a => a.severity === 'CRITICAL').length,
    HIGH: activities.filter(a => a.severity === 'HIGH').length,
    MEDIUM: activities.filter(a => a.severity === 'MEDIUM').length,
    LOW: activities.filter(a => a.severity === 'LOW').length,
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6 pb-12">
        {/* Controls Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsLive(!isLive)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all border',
                isLive
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-slate-50 text-slate-600 border-slate-200'
              )}
            >
              <div className={cn('w-2 h-2 rounded-full', isLive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400')} />
              {isLive ? 'Live' : 'Paused'}
            </button>
            <span className="text-xs text-slate-400 font-medium">
              {activities.length} events captured
            </span>
          </div>
        </div>

        {/* Severity Filter Chips */}
        <div className="flex flex-wrap items-center gap-2">
          {(['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'] as const).map((severity) => (
            <button
              key={severity}
              onClick={() => setFilterSeverity(severity)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border',
                filterSeverity === severity
                  ? severity === 'ALL' ? 'bg-secondary text-white border-[#0967F7]'
                    : severity === 'CRITICAL' ? 'bg-red-500 text-white border-red-500'
                      : severity === 'HIGH' ? 'bg-orange-500 text-white border-orange-500'
                        : severity === 'MEDIUM' ? 'bg-yellow-500 text-white border-yellow-500'
                          : 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
              )}
            >
              {severity} ({severityCounts[severity]})
            </button>
          ))}
        </div>

        {/* Event List */}
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="relative">
            {isLive && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0967F7] via-emerald-500 to-[#0967F7] animate-pulse" />
            )}

            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
              </div>
            ) : (
              <div className="divide-y divide-slate-50">
                {filteredActivities.map((activity, i) => (
                  <div
                    key={activity.id}
                    className={cn(
                      'flex items-center gap-4 px-6 py-4 transition-all duration-500',
                      i === 0 && isLive ? 'bg-slate-50/80' : 'hover:bg-slate-50/50'
                    )}
                    style={i === 0 && isLive ? { animation: 'slideIn 0.4s ease-out' } : undefined}
                  >
                    {/* Icon */}
                    <div className={cn('p-2.5 rounded-xl shrink-0', getEventIconColor(activity.event_type))}>
                      {getEventIcon(activity.event_type)}
                    </div>

                    {/* Event Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-bold text-slate-800">{formatEventType(activity.event_type)}</span>
                        <span className={cn(
                          'text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider border',
                          activity.action_taken === 'BLOCKED' ? 'bg-red-50 text-red-600 border-red-100' :
                            activity.action_taken === 'WARNING' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                              'bg-slate-100 text-slate-500 border-slate-200'
                        )}>
                          {activity.action_taken}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 font-mono truncate">{activity.domain}</p>
                    </div>

                    {/* Severity */}
                    <span className={cn(
                      'text-[11px] font-bold px-2.5 py-1 rounded-md border hidden sm:inline-flex',
                      getSeverityStyles(activity.severity)
                    )}>
                      {activity.severity}
                    </span>

                    {/* Timestamp */}
                    <div className="text-right shrink-0">
                      <span className="text-xs font-semibold text-slate-600 block">{formatTime(activity.detected_at)}</span>
                      <span className="text-[11px] text-slate-400">{formatDate(activity.detected_at)}</span>
                    </div>
                  </div>
                ))}

                {filteredActivities.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                    <Shield className="w-10 h-10 mb-3 text-slate-300" />
                    <p className="text-sm font-medium">No events match this filter</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </DashboardLayout>
  );
}
