import React from "react";
import { Bell, Menu, User, Sun, Calendar } from "lucide-react";
import { useDashboardStore } from "../../store/useDashboardStore";

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
      </div>

      <div className="flex items-center gap-2">
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
