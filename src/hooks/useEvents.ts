import { useQuery } from '@tanstack/react-query';
import { eventService } from '../services/eventService';

export const EVENT_KEYS = {
  all: ['events'] as const,
  list: (params: any) => [...EVENT_KEYS.all, 'list', params] as const,
};

export const useEvents = (params?: Record<string, any>) => {
  return useQuery({
    queryKey: EVENT_KEYS.list(params),
    queryFn: () => eventService.getEvents(params),
  });
};
