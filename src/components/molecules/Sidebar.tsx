import React from 'react';
import { Shield, LayoutDashboard, AlertTriangle, Settings, FileText, ChevronLeft, BarChart3, HelpCircle, Crown } from 'lucide-react';
import { useDashboardStore } from '../../store/useDashboardStore';
import { cn } from '../../utils/cn';

export function Sidebar() {
  const { isSidebarOpen, toggleSidebar } = useDashboardStore();

  const mainNav = [
    { name: 'Dashboard', icon: LayoutDashboard, active: true },
    { name: 'Threats', icon: AlertTriangle, active: false, badge: 12 },
    { name: 'Reports', icon: FileText, active: false },
    { name: 'Analytics', icon: BarChart3, active: false },
  ];

  const secondaryNav = [
    { name: 'Settings', icon: Settings },
    { name: 'Help & Support', icon: HelpCircle },
  ];

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden transition-all duration-300"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex flex-col w-[260px] bg-white border-r border-slate-200 transition-transform duration-300 ease-in-out lg:translate-x-0',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-[64px] px-6 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <span className="text-base font-bold text-slate-900 tracking-tight">SAFTY</span>
          </div>
          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 lg:hidden transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="px-4 py-4">
          <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-100 text-sm text-slate-400">
            <span>Search anything...</span>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="flex-1 px-3 overflow-y-auto">
          <div className="space-y-1">
            {mainNav.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href="#"
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                    item.active
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  )}
                >
                  <Icon className={cn('w-[18px] h-[18px]', item.active ? 'text-blue-600' : 'text-slate-400')} />
                  {item.name}
                  {item.badge && (
                    <span className="ml-auto text-[11px] font-bold bg-red-100 text-red-600 px-2 py-0.5 rounded-full">{item.badge}</span>
                  )}
                </a>
              );
            })}
          </div>

          <div className="mt-8 mb-3 px-3">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">General</span>
          </div>
          <div className="space-y-1">
            {secondaryNav.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href="#"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all duration-200"
                >
                  <Icon className="w-[18px] h-[18px] text-slate-400" />
                  {item.name}
                </a>
              );
            })}
          </div>
        </div>
      </aside>
    </>
  );
}
