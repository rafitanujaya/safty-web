import { fetchApi } from '../api/api';

export const educationService = {
  getEducationArticles: (params?: Record<string, any>) => {
    const query = params ? new URLSearchParams(params as any).toString() : '';
    return fetchApi<any>(`education${query ? `?${query}` : ''}`, { method: 'GET' });
  }
};
