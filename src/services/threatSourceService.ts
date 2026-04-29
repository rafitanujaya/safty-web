import { fetchApi } from '../api/api';

export const threatSourceService = {
  getTopSources: (limit: number = 5) => {
    return fetchApi<any>(`threat-sources/top?limit=${limit}`, { method: 'GET' });
  }
};
