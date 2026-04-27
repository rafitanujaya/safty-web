import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '../services/dashboardService';

export const useOverviewStats = () => {
  return useQuery({
    queryKey: ['dashboard', 'overview'],
    queryFn: dashboardService.getOverviewStats,
  });
};

export const useTrendData = () => {
  return useQuery({
    queryKey: ['dashboard', 'trends'],
    queryFn: dashboardService.getTrendData,
  });
};

export const useCategoryData = () => {
  return useQuery({
    queryKey: ['dashboard', 'categories'],
    queryFn: dashboardService.getCategoryData,
  });
};

export const useRecentDetections = () => {
  return useQuery({
    queryKey: ['dashboard', 'detections'],
    queryFn: dashboardService.getRecentDetections,
  });
};

export const useTopFlaggedWebsites = () => {
  return useQuery({
    queryKey: ['dashboard', 'topFlagged'],
    queryFn: dashboardService.getTopFlaggedWebsites,
  });
};

export const useSystemInsight = () => {
  return useQuery({
    queryKey: ['dashboard', 'insight'],
    queryFn: dashboardService.getSystemInsight,
  });
};

export const useInitialActivities = () => {
  return useQuery({
    queryKey: ['dashboard', 'activities'],
    queryFn: dashboardService.getInitialActivities,
  });
};
