import { apiClient } from './client';

export const authService = {
  async login(email: string, password: string) {
    const response = await apiClient.post<{ access: string; refresh: string }>('/auth/login/', {
      email,
      password,
    });
    return response;
  },

  async refreshToken(refreshToken: string) {
    const response = await apiClient.post<{ access: string }>('/auth/refresh/', {
      refresh: refreshToken,
    });
    return response;
  },

  async logout() {
    await apiClient.post('/auth/logout/');
  },
};