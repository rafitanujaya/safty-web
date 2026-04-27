import React from "react";
import { DashboardLayout } from "../../components/organisms/DashboardLayout";
import { OverviewCards } from "./components/OverviewCards";
import { TrendChart } from "./components/TrendChart";
import { CategoryBreakdown } from "./components/CategoryBreakdown";
import { RecentDetectionsTable } from "./components/RecentDetectionsTable";
import { TopThreatSources } from "./components/TopThreatSources";
import { ActivityLog } from "./components/ActivityLog";
import { ThreatInsightCard } from "./components/ThreatInsightCard";
import { FileDown } from "lucide-react";

export function Dashboard() {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6 pb-12">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Dashboard
            </h1>
            <p className="text-sm text-slate-400 mt-0.5">
              Real-time overview of your security events.
            </p>
          </div>
        </div>

        {/* Overview Stats */}
        <OverviewCards />

        {/* Charts Row: 2/3 + 1/3 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <TrendChart />
          <ActivityLog />
        </div>

        {/* Middle Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <CategoryBreakdown />
          </div>
          <div className="lg:col-span-2">
            <RecentDetectionsTable />
          </div>
        </div>

        {/* Bottom Row */}
        <TopThreatSources />
      </div>
    </DashboardLayout>
  );
}
