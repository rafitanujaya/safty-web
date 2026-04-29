import { fetchApi } from '../api/api';

export const eventService = {
  createEvent: (data: any) => {
    return fetchApi('events', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
};
