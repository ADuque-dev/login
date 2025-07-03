import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useAuthStore } from '../authStore';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('AuthStore', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset store state
    useAuthStore.setState({
      user: null,
      tokens: null,
      isAuthenticated: false,
      crendital: { email: '', password: '' },
    });
  });

  describe('Estado inicial', () => {
    it('debe tener el estado inicial correcto', () => {
      const state = useAuthStore.getState();
      
      expect(state.user).toBeNull();
      expect(state.tokens).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.crendital).toEqual({ email: '', password: '' });
    });
  });

  describe('Login', () => {
    it('debe actualizar el estado al hacer login', () => {
      const mockUser = {
        first_name: 'John',
        last_name: 'Doe',
        role: 'admin'
      };

      const mockTokens = {
        token: 'jwt-token',
        refresh_token: 'refresh-token',
        timestamp: '2023-01-01T00:00:00Z'
      };

      useAuthStore.getState().login(mockUser, mockTokens);

      const state = useAuthStore.getState();
      expect(state.user).toEqual(mockUser);
      expect(state.tokens).toEqual(mockTokens);
      expect(state.isAuthenticated).toBe(true);
    });
  });

  describe('Logout', () => {
    it('debe limpiar el estado al hacer logout', () => {
      const mockUser = {
        first_name: 'John',
        last_name: 'Doe',
        role: 'admin'
      };

      const mockTokens = {
        token: 'jwt-token',
        refresh_token: 'refresh-token',
        timestamp: '2023-01-01T00:00:00Z'
      };

      useAuthStore.getState().login(mockUser, mockTokens);
      useAuthStore.getState().logout();
      const state = useAuthStore.getState();
      expect(state.user).toBeNull();
      expect(state.tokens).toBeNull();
      expect(state.isAuthenticated).toBe(false);
    });
  });

  describe('SetCredential', () => {
    it('debe actualizar las credenciales', () => {
      const email = 'test@example.com';
      const password = 'password123';

      useAuthStore.getState().setCrendential(email, password);

      const state = useAuthStore.getState();
      expect(state.crendital.email).toBe(email);
      expect(state.crendital.password).toBe(password);
    });
  });

  describe('RefreshTokens', () => {
    it('debe actualizar solo los tokens', () => {
      const mockUser = {
        first_name: 'John',
        last_name: 'Doe',
        role: 'admin'
      };

      const initialTokens = {
        token: 'old-jwt-token',
        refresh_token: 'old-refresh-token',
        timestamp: '2023-01-01T00:00:00Z'
      };

      useAuthStore.getState().login(mockUser, initialTokens);
      const newTokens = {
        token: 'new-jwt-token',
        refresh_token: 'new-refresh-token',
        timestamp: '2023-01-02T00:00:00Z'
      };

      useAuthStore.getState().refreshTokens(newTokens);

      const state = useAuthStore.getState();
      expect(state.user).toEqual(mockUser);
      expect(state.tokens).toEqual(newTokens);
      expect(state.isAuthenticated).toBe(true); 
    });
  });
});