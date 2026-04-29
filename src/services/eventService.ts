import { fetchApi } from '../api/api';

export const eventService = {
  getEvents: (params?: Record<string, any>) => {
    const query = params ? new URLSearchParams(params as any).toString() : '';
    return fetchApi<any>(`events${query ? `?${query}` : ''}`, { method: 'GET' });
  }
};
