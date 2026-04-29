import { fetchApi } from '../api/api';

export interface LoginData {
  email: string;
  password?: string;
}

export interface RegisterData {
  username?: string;
  email: string;
  password?: string;
}

export const authService = {
  login: async (data: LoginData) => {
    return fetchApi('auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  register: async (data: RegisterData) => {
    return fetchApi('auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getMe: async (token?: string) => {
    // token is now automatically injected by fetchApi via authStore
    // but if we pass it, we can still use it (though api.ts overrides if authStore has it)
    return fetchApi('auth/me', {
      method: 'GET',
    });
  },
};
