import React from "react";
import { Sidebar } from "../molecules/Sidebar";
import { Header } from "../molecules/Header";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-[#f8f9fb] text-slate-900">
      <Sidebar />
      <div className="lg:pl-[260px] flex flex-col min-h-screen transition-all duration-300">
        <Header />
        <main className="flex-1 p-4 lg:p-8 overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
}
