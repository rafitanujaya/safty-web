import React from "react";
import { Sidebar } from "../molecules/Sidebar";
import { Header } from "../molecules/Header";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F3F6FC] text-slate-900">
      <Sidebar />
      <div className="lg:pl-[260px] flex flex-col min-h-screen transition-all duration-300 py-5">
        <Header />
        <main className="flex-1 p-4 lg:p-8 overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
}
