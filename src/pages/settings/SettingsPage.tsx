import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../../components/organisms/DashboardLayout';
import { useProtectionConfig } from '../../hooks/useDashboardData';
import {
  Loader2,
  Shield,
  ShieldCheck,
  FileSearch,
  FormInput,
  MonitorSmartphone,
  RefreshCcw,
  Radar,
  ArrowLeftRight,
  Save,
  CheckCircle2,
  Info,
} from 'lucide-react';
import { cn } from '../../utils/cn';
import type { ProtectionConfig } from '../../api/mockData';

export function SettingsPage() {
  const { data: config, isLoading } = useProtectionConfig();
  const [localConfig, setLocalConfig] = useState<ProtectionConfig | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (config && !localConfig) {
      setLocalConfig({ ...config });
    }
  }, [config]);

  useEffect(() => {
    if (config && localConfig) {
      const changed = JSON.stringify(config) !== JSON.stringify(localConfig);
      setHasChanges(changed);
    }
  }, [localConfig, config]);

  const updateConfig = (key: keyof ProtectionConfig, value: any) => {
    if (!localConfig) return;
    setLocalConfig({ ...localConfig, [key]: value });
    setIsSaved(false);
  };

  const handleSave = () => {
    // Simulate save
    setIsSaved(true);
    setHasChanges(false);
    setTimeout(() => setIsSaved(false), 3000);
  };

  if (isLoading || !localConfig) {
    return (
      <DashboardLayout>
        <div className="max-w-3xl mx-auto flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
        </div>
      </DashboardLayout>
    );
  }

  const toggleItems = [
    {
      key: 'realtimeProtection' as const,
      label: 'Real-time Protection',
      description: 'Continuously scan websites and network requests for threats',
      icon: ShieldCheck,
      critical: true,
    },
    {
      key: 'formBlocking' as const,
      label: 'Form Blocking',
      description: 'Block form submissions on suspicious or phishing websites',
      icon: FormInput,
    },
    {
      key: 'downloadScanning' as const,
      label: 'Download Scanning',
      description: 'Scan downloaded files for malware, trojans, and suspicious content',
      icon: FileSearch,
    },
    {
      key: 'trackerBlocking' as const,
      label: 'Tracker Blocking',
      description: 'Block third-party tracking scripts and advertising networks',
      icon: Radar,
    },
    {
      key: 'redirectProtection' as const,
      label: 'Redirect Protection',
      description: 'Detect and block malicious redirect chains before they resolve',
      icon: ArrowLeftRight,
    },
  ];

  const formatSyncTime = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6 pb-12">
        {/* Save Bar */}
        {hasChanges && (
          <div className="sticky top-[64px] z-20 flex items-center justify-between bg-[#0967F7] text-white rounded-2xl px-5 py-3 shadow-lg shadow-[#0967F7]/20 animate-slideDown">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-white/70" />
              <span className="text-sm font-medium">You have unsaved changes</span>
            </div>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-white text-[#0967F7] font-bold text-sm px-4 py-2 rounded-xl hover:bg-white/90 transition-all"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        )}

        {isSaved && (
          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-2xl px-5 py-3">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-sm font-medium">Settings saved successfully</span>
          </div>
        )}

        {/* Protection Toggles Section */}
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900 tracking-tight">Protection Controls</h3>
            <p className="text-xs text-slate-400 mt-1">Configure how Safty protects your browsing activity</p>
          </div>

          <div className="divide-y divide-slate-50">
            {toggleItems.map((item) => {
              const Icon = item.icon;
              const isEnabled = localConfig[item.key] as boolean;
              return (
                <div key={item.key} className="flex items-center justify-between px-6 py-5 hover:bg-slate-50/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={cn('p-2.5 rounded-xl', isEnabled ? 'bg-[#0967F7]/10' : 'bg-slate-100')}>
                      <Icon className={cn('w-5 h-5', isEnabled ? 'text-[#0967F7]' : 'text-slate-400')} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-slate-800">{item.label}</span>
                        {item.critical && (
                          <span className="text-[10px] font-bold text-[#0967F7] bg-[#0967F7]/10 px-1.5 py-0.5 rounded">RECOMMENDED</span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5 max-w-sm">{item.description}</p>
                    </div>
                  </div>

                  {/* Custom Toggle */}
                  <button
                    onClick={() => updateConfig(item.key, !isEnabled)}
                    className={cn(
                      'relative w-12 h-7 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#0967F7]/30',
                      isEnabled ? 'bg-[#0967F7]' : 'bg-slate-200'
                    )}
                  >
                    <span
                      className={cn(
                        'absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-300',
                        isEnabled ? 'translate-x-5' : 'translate-x-0'
                      )}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Risk Threshold */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6">
          <h3 className="text-base font-bold text-slate-900 tracking-tight mb-1">Risk Threshold</h3>
          <p className="text-xs text-slate-400 mb-5">Events below this score will be logged instead of blocked</p>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600 font-medium">Current Threshold</span>
              <span className={cn(
                'text-lg font-bold px-3 py-0.5 rounded-lg',
                localConfig.riskThreshold >= 80 ? 'text-red-600 bg-red-50'
                  : localConfig.riskThreshold >= 50 ? 'text-amber-600 bg-amber-50'
                    : 'text-emerald-600 bg-emerald-50'
              )}>
                {localConfig.riskThreshold}
              </span>
            </div>

            <div className="relative">
              <input
                type="range"
                min="0"
                max="100"
                value={localConfig.riskThreshold}
                onChange={(e) => updateConfig('riskThreshold', parseInt(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer accent-[#0967F7]"
                style={{
                  background: `linear-gradient(to right, #0967F7 0%, #0967F7 ${localConfig.riskThreshold}%, #e2e8f0 ${localConfig.riskThreshold}%, #e2e8f0 100%)`,
                }}
              />
              <div className="flex justify-between mt-2">
                <span className="text-[11px] text-slate-400">0 — More alerts</span>
                <span className="text-[11px] text-slate-400">100 — Fewer alerts</span>
              </div>
            </div>
          </div>
        </div>

        {/* Device Info */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6">
          <h3 className="text-base font-bold text-slate-900 tracking-tight mb-4">Device Information</h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-slate-50">
              <div className="flex items-center gap-3 text-slate-500">
                <MonitorSmartphone className="w-4 h-4" />
                <span className="text-sm font-medium">Device Name</span>
              </div>
              <span className="text-sm font-semibold text-slate-800">{localConfig.deviceName}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-slate-50">
              <div className="flex items-center gap-3 text-slate-500">
                <Shield className="w-4 h-4" />
                <span className="text-sm font-medium">Extension Version</span>
              </div>
              <span className="text-sm font-semibold text-slate-800">v{localConfig.extensionVersion}</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3 text-slate-500">
                <RefreshCcw className="w-4 h-4" />
                <span className="text-sm font-medium">Last Sync</span>
              </div>
              <span className="text-sm font-semibold text-slate-800">{formatSyncTime(localConfig.lastSync)}</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown { animation: slideDown 0.3s ease-out; }
      `}</style>
    </DashboardLayout>
  );
}
