import { fetchApi } from '../api/api';

export const settingsService = {
  getSettings: () => {
    return fetchApi<any>('settings', { method: 'GET' });
  },

  updateSettings: (data: any) => {
    return fetchApi<any>('settings', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }
};
