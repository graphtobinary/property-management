import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  user: null | { id: string; email: string };
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: async (email: string, password: string) => {
        // Here you would typically make an API call to your backend
        // For now, we'll just simulate a successful login
        await new Promise((resolve) => setTimeout(resolve, 1000));
        set({ isAuthenticated: true, user: { id: '1', email } });
      },
      logout: () => {
        set({ isAuthenticated: false, user: null });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
