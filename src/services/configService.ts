import { fetchApi } from '../api/api';

export const configService = {
  getConfig: () => {
    return fetchApi('config', {
      method: 'GET'
    });
  },

  updateConfig: (data: any) => {
    return fetchApi('config', {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }
};
