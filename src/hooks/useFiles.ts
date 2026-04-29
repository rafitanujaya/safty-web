import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fileService } from '../services/fileService';

export const FILE_KEYS = {
  all: ['files'] as const,
  list: (params: any) => [...FILE_KEYS.all, 'list', params] as const,
  detail: (id: string) => [...FILE_KEYS.all, 'detail', id] as const,
};

export const useFiles = (params?: Record<string, any>) => {
  return useQuery({
    queryKey: FILE_KEYS.list(params),
    queryFn: () => fileService.getFiles(params),
  });
};

export const useFile = (id: string) => {
  return useQuery({
    queryKey: FILE_KEYS.detail(id),
    queryFn: () => fileService.getFileById(id),
    enabled: !!id,
  });
};

export const useScanFile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => fileService.scanFile(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: FILE_KEYS.all });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};
