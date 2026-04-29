import { fetchApi } from '../api/api';

export const fileService = {
  getFiles: (params?: Record<string, any>) => {
    const query = params ? new URLSearchParams(params as any).toString() : '';
    return fetchApi<any>(`files${query ? `?${query}` : ''}`, { method: 'GET' });
  },

  getFileById: (id: string) => {
    return fetchApi<any>(`files/${id}`, { method: 'GET' });
  },

  scanFile: (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return fetchApi<any>('files/scan', {
      method: 'POST',
      body: formData,
      // API wrapper will NOT add Content-Type for FormData
    });
  }
};
