import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Shield, LayoutDashboard, ScrollText, Clock, BookOpen, Settings, ChevronLeft, LogOut, FileSearch, ScanSearch } from 'lucide-react';
import { useDashboardStore } from '../../store/useDashboardStore';
import { cn } from '../../utils/cn';

export function Sidebar() {
  const { isSidebarOpen, toggleSidebar } = useDashboardStore();
  const location = useLocation();

  const mainNav = [
    { name: 'Dashboard',        icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Protection Log',   icon: ScrollText,       path: '/protection-log' },
    { name: 'History',          icon: Clock,            path: '/history' },
    { name: 'Education',        icon: BookOpen,         path: '/education' },
    { name: 'File Protection',  icon: FileSearch,       path: '/file-protection' },
    { name: 'Image Forensic',   icon: ScanSearch,       path: '/image-forensic' },
  ];

  const secondaryNav = [
    { name: 'Settings', icon: Settings, path: '/settings' },
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
          'fixed inset-y-0 left-0 z-50 flex flex-col w-[260px] bg-white border-r border-slate-200/80 transition-transform duration-300 ease-in-out lg:translate-x-0',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-[64px] px-6 border-b border-slate-100">
          <NavLink to="/dashboard" className="flex items-center gap-2.5">
            <span className="text-xl font-bold text-slate-900 tracking-tight">SAFETY</span>
          </NavLink>
          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 lg:hidden transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        {/* Main Navigation */}
        <div className="flex-1 px-3 py-4 overflow-y-auto">
          <div className="mb-3 px-3">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">Main Menu</span>
          </div>
          <div className="space-y-1">
            {mainNav.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => {
                    if (window.innerWidth < 1024) toggleSidebar();
                  }}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-secondary text-white'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  )}
                >
                  <Icon className={cn('w-[18px] h-[18px]', isActive ? 'text-white' : 'text-slate-400')} />
                  {item.name}
                </NavLink>
              );
            })}
          </div>

          <div className="mt-8 mb-3 px-3">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">General</span>
          </div>
          <div className="space-y-1">
            {secondaryNav.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => {
                    if (window.innerWidth < 1024) toggleSidebar();
                  }}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-secondary text-white'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                  )}
                >
                  <Icon className={cn('w-[18px] h-[18px]', isActive ? 'text-white' : 'text-slate-400')} />
                  {item.name}
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* Bottom section */}
        <div className="px-3 pb-4">
          <div className="bg-gradient-to-br from-[#0967F7]/5 to-[#5969AB]/5 border border-[#0967F7]/10 rounded-2xl p-4 mb-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-slate-700">Protection Active</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Real-time scanning is running. All threats are being monitored.
            </p>
          </div>
          <button
            onClick={() => {
              window.location.href = '/';
            }}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
          >
            <LogOut className="w-[18px] h-[18px]" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
