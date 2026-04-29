import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../services/dashboardService';
import { threatSourceService } from '../services/threatSourceService';

export const DASHBOARD_KEYS = {
  all: ['dashboard'] as const,
  summary: (days: number) => [...DASHBOARD_KEYS.all, 'summary', days] as const,
  trend: (days: number) => [...DASHBOARD_KEYS.all, 'trend', days] as const,
  severity: (days: number) => [...DASHBOARD_KEYS.all, 'severity', days] as const,
  recentEvents: (limit: number) => [...DASHBOARD_KEYS.all, 'recentEvents', limit] as const,
  riskLevel: (days: number) => [...DASHBOARD_KEYS.all, 'riskLevel', days] as const,
  threatSources: (limit: number) => [...DASHBOARD_KEYS.all, 'threatSources', limit] as const,
};

export const useDashboardData = (days = 7) => {
  const summaryQuery = useQuery({
    queryKey: DASHBOARD_KEYS.summary(days),
    queryFn: () => dashboardService.getSummary(days),
  });

  const trendQuery = useQuery({
    queryKey: DASHBOARD_KEYS.trend(days),
    queryFn: () => dashboardService.getTrend(days),
  });

  const severityQuery = useQuery({
    queryKey: DASHBOARD_KEYS.severity(days),
    queryFn: () => dashboardService.getSeverity(days),
  });

  const recentEventsQuery = useQuery({
    queryKey: DASHBOARD_KEYS.recentEvents(10),
    queryFn: () => dashboardService.getRecentEvents(10),
  });

  const riskLevelQuery = useQuery({
    queryKey: DASHBOARD_KEYS.riskLevel(days),
    queryFn: () => dashboardService.getRiskLevel(days),
  });

  return {
    summary: summaryQuery.data,
    trend: trendQuery.data,
    severity: severityQuery.data,
    recentEvents: recentEventsQuery.data,
    riskLevel: riskLevelQuery.data,
    isLoading: 
      summaryQuery.isLoading || 
      trendQuery.isLoading || 
      severityQuery.isLoading || 
      recentEventsQuery.isLoading || 
      riskLevelQuery.isLoading,
    isError: 
      summaryQuery.isError || 
      trendQuery.isError || 
      severityQuery.isError || 
      recentEventsQuery.isError || 
      riskLevelQuery.isError,
  };
};

export const useTopThreatSources = (limit = 5) => {
  return useQuery({
    queryKey: DASHBOARD_KEYS.threatSources(limit),
    queryFn: () => threatSourceService.getTopSources(limit),
  });
};
