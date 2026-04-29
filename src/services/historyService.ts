import { fetchApi } from '../api/api';

export const historyService = {
  getHistory: (params?: Record<string, any>) => {
    const query = params ? new URLSearchParams(params as any).toString() : '';
    return fetchApi<any>(`history${query ? `?${query}` : ''}`, { method: 'GET' });
  }
};
