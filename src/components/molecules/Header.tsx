import React, { useState } from "react";
import { Bell, Menu, User, Search, Calendar, ChevronDown, Moon, Sun, Settings } from "lucide-react";
import { useDashboardStore } from "../../store/useDashboardStore";
import { useLocation } from "react-router-dom";
import { cn } from "../../utils/cn";

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  '/dashboard':       { title: 'Dashboard',               subtitle: 'Real-time overview of your security events' },
  '/protection-log':  { title: 'Protection Log',          subtitle: 'Live feed of all security events' },
  '/history':         { title: 'Threat History',          subtitle: 'Review past detections and blocked activities' },
  '/education':       { title: 'Security Education',      subtitle: 'Learn about scams and cybersecurity threats' },
  '/settings':        { title: 'Settings',                subtitle: 'Configure your protection preferences' },
  '/file-protection': { title: 'File Protection Scanner', subtitle: 'Scan files for malware and suspicious behavior' },
  '/image-forensic':  { title: 'Image Forensic Analysis', subtitle: 'Detect scams and manipulation in images' },
};


export function Header() {
  const { toggleSidebar, timeRange, setTimeRange } = useDashboardStore();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [showDateDropdown, setShowDateDropdown] = useState(false);

  const currentPage = pageTitles[location.pathname] || pageTitles['/dashboard'];

  const timeRangeLabels: Record<string, string> = {
    '24h': 'Last 24 Hours',
    '7d': 'Last 7 Days',
    '30d': 'Last 30 Days',
  };

  return (
    <header className="z-30 flex items-center justify-between h-[60px] px-4 md:px-8 flex gap-7">
      <div className="flex items-center justify-between gap-5 bg-white px-5 py-2 rounded-3xl flex-1">
        <button
          onClick={toggleSidebar}
          className="p-2 -ml-2 rounded-lg text-slate-400 hover:bg-slate-100 lg:hidden transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="hidden md:block flex-1">
          <h2 className="text-xl font-semibold text-slate-900 tracking-tight">{currentPage.title}</h2>
        </div>
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-3xl px-3 py-4 w-[380px] focus-within:border-[#0967F7]/30 focus-within:ring-2 focus-within:ring-[#0967F7]/10 transition-all">
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search domains, threats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-xs text-slate-700 placeholder-slate-400 outline-none flex-1"
          />
        </div>
        <div className="flex items-center bg-slate-100 rounded-4xl">
          <div className="p-3">
            <Moon className="w-5 h-5 text-slate-400" />
          </div>
          <div className="p-3 bg-secondary rounded-full">
            <Sun className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>


      <div className="py-3 px-5 rounded-3xl bg-white h-full">
        <div className="flex items-center gap-5">
          {/* Notifications */}
          <button className="relative rounded-xl text-slate-400 hover:bg-slate-50 transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <button className="relative rounded-xl text-slate-400 hover:bg-slate-50 transition-colors">
            <Settings className="w-5 h-5" />
          </button>
          {/* User Avatar */}
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-[#0967F7] to-[#5969AB] text-white cursor-pointer hover:shadow-md hover:shadow-[#0967F7]/20 transition-all ml-1">
            <User className="w-4 h-4" />
          </div>
        </div>
      </div>
    </header>
  );
}
