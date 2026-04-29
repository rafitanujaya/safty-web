import { fetchApi } from '../api/api';

export const dashboardService = {
  getSummary: (days: number = 7) => {
    return fetchApi<any>(`dashboard/summary?days=${days}`, { method: 'GET' });
  },

  getTrend: (days: number = 7) => {
    return fetchApi<any>(`dashboard/trend?days=${days}`, { method: 'GET' });
  },

  getSeverity: (days: number = 7) => {
    return fetchApi<any>(`dashboard/severity?days=${days}`, { method: 'GET' });
  },

  getRecentEvents: (limit: number = 10) => {
    return fetchApi<any>(`dashboard/recent-events?limit=${limit}`, { method: 'GET' });
  },

  getRiskLevel: (days: number = 7) => {
    return fetchApi<any>(`dashboard/risk-level?days=${days}`, { method: 'GET' });
  }
};
