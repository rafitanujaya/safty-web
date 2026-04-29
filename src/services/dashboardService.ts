import {
  initialMockActivities,
  mockCategoryData,
  mockDetections,
  mockOverviewStats,
  mockTopFlagged,
  mockTrendData,
  mockUserInsight,
  mockDangerousFiles,
  mockEducationArticles,
  mockProtectionConfig,
  mockThreatHistory,
  type ActivityEvent,
  type CategoryData,
  type Detection,
  type FlaggedWebsite,
  type OverviewStats,
  type TrendDataPoint,
  type SystemInsight,
  type DangerousFile,
  type EducationArticle,
  type ProtectionConfig,
  type ThreatHistoryEntry,
} from "../api/mockData";
import { fetchApi } from '../api/api';


// Helper to simulate network latency
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const dashboardService = {
  getOverviewStats: async (): Promise<OverviewStats> => {
    await delay(600);
    return mockOverviewStats;
  },

  getTrendData: async (): Promise<TrendDataPoint[]> => {
    await delay(800);
    return mockTrendData;
  },

  getCategoryData: async (): Promise<CategoryData[]> => {
    await delay(700);
    return mockCategoryData;
  },

  getRecentDetections: async (): Promise<Detection[]> => {
    await delay(1000);
    return mockDetections;
  },

  getTopFlaggedWebsites: async (): Promise<FlaggedWebsite[]> => {
    await delay(900);
    return mockTopFlagged;
  },

  getSystemInsight: async (): Promise<SystemInsight> => {
    await delay(500);
    return mockUserInsight;
  },

  getInitialActivities: async (): Promise<ActivityEvent[]> => {
    await delay(400);
    return initialMockActivities;
  },

  getDangerousFiles: async (): Promise<DangerousFile[]> => {
    await delay(700);
    return mockDangerousFiles;
  },

  getEducationArticles: async (): Promise<EducationArticle[]> => {
    await delay(500);
    return mockEducationArticles;
  },

  getProtectionConfig: async (): Promise<ProtectionConfig> => {
    await delay(400);
    return mockProtectionConfig;
  },

  updateProtectionConfig: async (config: Partial<ProtectionConfig>): Promise<ProtectionConfig> => {
    await delay(300);
    return { ...mockProtectionConfig, ...config };
  },

  getThreatHistory: async (): Promise<ThreatHistoryEntry[]> => {
    await delay(800);
    return mockThreatHistory;
  },

  // Real API endpoints from SAFTY-BE
  getSummaryApi: () => {
    return fetchApi('dashboard/summary', { method: 'GET' });
  },

  getRecentEventsApi: () => {
    return fetchApi('dashboard/events', { method: 'GET' });
  }
};
