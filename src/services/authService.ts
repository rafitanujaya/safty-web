import { fetchApi } from '../api/api';

export interface RegisterData {
  email?: string;
  password?: string;
  [key: string]: any;
}

export interface LoginData {
  email?: string;
  password?: string;
  [key: string]: any;
}

export const authService = {
  register: (data: RegisterData) => {
    return fetchApi('auth/register', { 
      method: 'POST', 
      body: JSON.stringify(data) 
    });
  },
  
  login: (data: LoginData) => {
    return fetchApi('auth/login', { 
      method: 'POST', 
      body: JSON.stringify(data) 
    });
  },
  
  getMe: (token?: string) => {
    const headers: HeadersInit = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return fetchApi('auth/me', { headers });
  }
};
