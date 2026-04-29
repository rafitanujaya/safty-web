import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { imageService } from '../services/imageService';

export const IMAGE_KEYS = {
  all: ['images'] as const,
  list: (params: any) => [...IMAGE_KEYS.all, 'list', params] as const,
  detail: (id: string) => [...IMAGE_KEYS.all, 'detail', id] as const,
};

export const useImages = (params?: Record<string, any>) => {
  return useQuery({
    queryKey: IMAGE_KEYS.list(params),
    queryFn: () => imageService.getImages(params),
  });
};

export const useImage = (id: string) => {
  return useQuery({
    queryKey: IMAGE_KEYS.detail(id),
    queryFn: () => imageService.getImageById(id),
    enabled: !!id,
  });
};

export const useScanImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (image: File) => imageService.scanImage(image),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: IMAGE_KEYS.all });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
};
