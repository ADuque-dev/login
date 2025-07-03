import { create } from 'zustand';
// import Cookies from 'js-cookie';
import { createJSONStorage, persist } from 'zustand/middleware';

interface User {
  first_name: string;
  last_name: string;
  role: string;
}

interface Tokens {
  token: string;
  refresh_token: string;
  timestamp: string;
}

interface AuthState {
  user: User | null;
  tokens: Tokens | null;
  isAuthenticated: boolean;
  crendital: {email: string, password: string},
  login: (user: User, tokens: Tokens) => void;
  setCrendential: (email: string, password: string) => void;
  logout: () => void;
  refreshTokens: (tokens: Tokens) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      tokens: null,
      isAuthenticated: false,
      crendital: {email: '', password: ''},
     login: (user, tokens) => {
        // Guardar en Zustand
        set({ user, tokens, isAuthenticated: true });

      },
      logout: () => {
        set({ user: null, tokens: null, isAuthenticated: false });
      },
      refreshTokens: (tokens) => {
        set((state) => ({ ...state, tokens }));
      },
      setCrendential: (email, password) =>{
        set((state) => ({ ...state, crendital:{ email, password }}));
      },

    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);