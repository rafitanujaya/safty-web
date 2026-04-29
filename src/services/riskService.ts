import { fetchApi } from '../api/api';

export const riskService = {
  scanPage: (data: any) => {
    return fetchApi('risk/page', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  scanFormSubmit: (data: any) => {
    return fetchApi('risk/form-submit', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
};
