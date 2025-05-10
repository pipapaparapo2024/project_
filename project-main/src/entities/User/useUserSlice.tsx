import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from './api';
import { loginSchema, registerSchema } from './validation';
import { z } from 'zod';

export interface LoginFormData {
  username?: string;
  email: string;
  password: string;
}

interface UserState {
  token: string | null;
  isAuthenticated: boolean;
  loginUser: (data: LoginFormData) => Promise<void>;
  registerUser: (data: LoginFormData) => Promise<void>;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,
      
      loginUser: (userData) => {
        const validatedData = loginSchema.parse(userData);
        return api.post<{ token: string }>('/auth/login', validatedData)
          .then(({ data }) => {
            set({ token: data.token, isAuthenticated: true });
          })
          .catch((error) => {
            if (error instanceof z.ZodError) {
              throw new Error(error.errors.map(err => err.message).join(', '));
            }
            if (error.response?.data?.message) {
              throw new Error(error.response.data.message);
            }
            throw new Error('Ошибка при входе');
          });
      },
      
      registerUser: (userData) => {
        const validatedData = registerSchema.parse(userData);
        return api.post<{ token: string }>('/auth/register', validatedData)
          .then(({ data }) => {
            set({ token: data.token, isAuthenticated: true });
          })
          .catch((error) => {
            if (error instanceof z.ZodError) {
              throw new Error(error.errors.map(err => err.message).join(', '));
            }
            if (error.response?.data?.message) {
              throw new Error(error.response.data.message);
            }
            throw new Error('Ошибка при регистрации');
          });
      },
      
      logout: () => {
        set({ token: null, isAuthenticated: false });
      },
    }),
    {
      name: 'user-storage',
    }
  )
);