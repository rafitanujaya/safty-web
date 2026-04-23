import React from 'react';
import { Bell, Menu, User, Sun, Calendar } from 'lucide-react';
import { useDashboardStore } from '../../store/useDashboardStore';

export function Header() {
  const { toggleSidebar } = useDashboardStore();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-[64px] px-4 md:px-8 bg-white border-b border-slate-100">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 -ml-2 rounded-lg text-slate-400 hover:bg-slate-100 lg:hidden transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        <h1 className="text-lg font-bold text-slate-900 tracking-tight hidden md:block">Dashboard</h1>
      </div>

      <div className="flex items-center gap-2">
        {/* Date Range */}
        <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-100 text-sm text-slate-500 font-medium">
          <Calendar className="w-4 h-4 text-slate-400" />
          <span>Jan 1, 2025 - Feb 1, 2025</span>
        </div>

        {/* Period Selector */}
        <select defaultValue="30d" className="hidden md:block text-sm bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-slate-600 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all">
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="90d">Last 90 Days</option>
        </select>

        {/* Theme Toggle */}
        <button className="p-2 rounded-xl text-slate-400 hover:bg-slate-50 transition-colors">
          <Sun className="w-[18px] h-[18px]" />
        </button>

        {/* Notifications */}
        <button className="relative p-2 rounded-xl text-slate-400 hover:bg-slate-50 transition-colors">
          <Bell className="w-[18px] h-[18px]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        {/* User Avatar */}
        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-200 text-slate-600 cursor-pointer hover:bg-slate-300 transition-colors ml-1">
          <User className="w-4 h-4" />
        </div>
      </div>
    </header>
  );
}
