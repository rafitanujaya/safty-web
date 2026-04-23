import { initialMockActivities, mockCategoryData, mockDetections, mockOverviewStats, mockTopFlagged, mockTrendData, mockUserInsight, type ActivityEvent, type CategoryData, type Detection, type FlaggedWebsite, type OverviewStats, type TrendDataPoint, type UserInsight } from "../api/mockData";


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

  getUserInsight: async (): Promise<UserInsight> => {
    await delay(500);
    return mockUserInsight;
  },

  getInitialActivities: async (): Promise<ActivityEvent[]> => {
    await delay(400);
    return initialMockActivities;
  }
};
