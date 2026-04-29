import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService, type LoginData, type RegisterData } from '../services/authService';
import { useAuthStore } from '../store/authStore';

export const AUTH_KEYS = {
  me: ['auth', 'me'] as const,
};

export const useAuth = () => {
  const queryClient = useQueryClient();
  const { token, setAuth, clearAuth } = useAuthStore();

  // Query untuk mendapatkan data user saat ini
  const useMe = (customToken?: string) => {
    const activeToken = customToken || token;
    return useQuery({
      queryKey: [...AUTH_KEYS.me, activeToken],
      queryFn: () => activeToken ? authService.getMe(activeToken) : Promise.reject('No token'),
      enabled: !!activeToken,
    });
  };

  // Mutation untuk login
  const useLogin = () => {
    return useMutation({
      mutationFn: (data: LoginData) => authService.login(data),
      onSuccess: (data: any) => {
        // Asumsi response login mengembalikan { token, user }
        // Sesuaikan dengan struktur response API yang sebenarnya
        if (data?.token) {
          setAuth(data.token, data.user);
        }
        queryClient.invalidateQueries({ queryKey: AUTH_KEYS.me });
      },
    });
  };

  // Mutation untuk register
  const useRegister = () => {
    return useMutation({
      mutationFn: (data: RegisterData) => authService.register(data),
      onSuccess: (data: any) => {
        // Jika register langsung auto-login, bisa diset juga tokennya di sini
         if (data?.token) {
          setAuth(data.token, data.user);
        }
        queryClient.invalidateQueries({ queryKey: AUTH_KEYS.me });
      }
    });
  };

  // Logout
  const logout = () => {
    clearAuth();
    queryClient.setQueryData(AUTH_KEYS.me, null);
    queryClient.removeQueries({ queryKey: AUTH_KEYS.me });
  };

  return {
    useMe,
    useLogin,
    useRegister,
    logout,
    token, // expose token just in case
  };
};

