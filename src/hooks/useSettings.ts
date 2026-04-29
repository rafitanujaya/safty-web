import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { settingsService } from '../services/settingsService';

export const SETTINGS_KEYS = {
  all: ['settings'] as const,
};

export const useSettings = () => {
  return useQuery({
    queryKey: SETTINGS_KEYS.all,
    queryFn: () => settingsService.getSettings(),
  });
};

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => settingsService.updateSettings(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SETTINGS_KEYS.all });
    },
  });
};
