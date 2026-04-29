import { useQuery } from '@tanstack/react-query';
import { historyService } from '../services/historyService';

export const HISTORY_KEYS = {
  all: ['history'] as const,
  list: (params: any) => [...HISTORY_KEYS.all, 'list', params] as const,
};

export const useThreatHistory = (params?: Record<string, any>) => {
  return useQuery({
    queryKey: HISTORY_KEYS.list(params),
    queryFn: () => historyService.getHistory(params),
  });
};
