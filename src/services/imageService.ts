import { fetchApi } from '../api/api';

export const imageService = {
  getImages: (params?: Record<string, any>) => {
    const query = params ? new URLSearchParams(params as any).toString() : '';
    return fetchApi<any>(`images${query ? `?${query}` : ''}`, { method: 'GET' });
  },

  getImageById: (id: string) => {
    return fetchApi<any>(`images/${id}`, { method: 'GET' });
  },

  scanImage: (image: File) => {
    const formData = new FormData();
    formData.append("image", image);
    return fetchApi<any>('images/scan', {
      method: 'POST',
      body: formData,
    });
  }
};
