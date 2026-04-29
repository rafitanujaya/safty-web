import React from "react";
import { DashboardLayout } from "../../components/organisms/DashboardLayout";
import { OverviewCards } from "./components/OverviewCards";
import { TrendChart } from "./components/TrendChart";
import { CategoryBreakdown } from "./components/CategoryBreakdown";
import { RecentDetectionsTable } from "./components/RecentDetectionsTable";
import { ActivityLog } from "./components/ActivityLog";
import { RiskLevelGauge } from "./components/RiskLevelGauge";
import { ProtectionStatus } from "./components/ProtectionStatus";
import { DangerousFilesList } from "./components/DangerousFilesList";

export function Dashboard() {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6 pb-12">
        {/* Overview Stats */}
        <OverviewCards />

        {/* Charts Row: Trend 2/3 + Activity Log 1/3 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <TrendChart />
          <ActivityLog />
        </div>

        {/* Middle Row: Severity + Risk Gauge + Protection Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CategoryBreakdown />
          <RiskLevelGauge />
          <ProtectionStatus />
        </div>

        {/* Dangerous Files */}
        <DangerousFilesList />

        {/* Recent Detections Table */}
        <RecentDetectionsTable />
      </div>
    </DashboardLayout>
  );
}
