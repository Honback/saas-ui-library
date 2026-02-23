import { create } from 'zustand';
import apiClient from '@/lib/api-client';
import type { User } from '@/types/user';
import type { ApiResponse } from '@/types/api';
import type { AuthResponse, SignupRequest } from '@/types/auth';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: SignupRequest) => Promise<void>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: !!localStorage.getItem('access_token'),
  isLoading: false,

  login: async (email, password) => {
    const { data } = await apiClient.post<ApiResponse<AuthResponse>>('/auth/login', { email, password });
    localStorage.setItem('access_token', data.data.accessToken);
    localStorage.setItem('refresh_token', data.data.refreshToken);
    set({ user: data.data.user, isAuthenticated: true });
  },

  signup: async (signupData) => {
    const { data } = await apiClient.post<ApiResponse<AuthResponse>>('/auth/signup', signupData);
    localStorage.setItem('access_token', data.data.accessToken);
    localStorage.setItem('refresh_token', data.data.refreshToken);
    set({ user: data.data.user, isAuthenticated: true });
  },

  logout: async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        await apiClient.post('/auth/logout', { refreshToken });
      }
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('current_organization_id');
      set({ user: null, isAuthenticated: false });
    }
  },

  fetchUser: async () => {
    set({ isLoading: true });
    try {
      const { data } = await apiClient.get<ApiResponse<User>>('/users/me');
      set({ user: data.data, isAuthenticated: true, isLoading: false });
    } catch {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },
}));
