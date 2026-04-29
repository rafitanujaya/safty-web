import { useQuery } from '@tanstack/react-query';
import { educationService } from '../services/educationService';

export const EDUCATION_KEYS = {
  all: ['education'] as const,
  list: (params: any) => [...EDUCATION_KEYS.all, 'list', params] as const,
};

export const useEducation = (params?: Record<string, any>) => {
  return useQuery({
    queryKey: EDUCATION_KEYS.list(params),
    queryFn: () => educationService.getEducationArticles(params),
  });
};
