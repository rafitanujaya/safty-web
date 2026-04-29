import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  user: any | null; // Sesuaikan `any` dengan tipe User jika ada
  setAuth: (token: string, user?: any) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setAuth: (token, user) => set({ token, user: user || null }),
      clearAuth: () => set({ token: null, user: null }),
    }),
    {
      name: 'auth-storage', // nama key di localStorage
    }
  )
);
