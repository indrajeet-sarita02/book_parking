'use client';
import { useAuthStore } from '@/store/auth-store';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api/client';
import { useCallback } from 'react';

export function useAuth() {
  const { user, isAuthenticated, isLoading, setUser, clearUser } = useAuthStore();
  const router = useRouter();

  const login = useCallback(async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    setUser(res.data);
    return res;
  }, []);

  const register = useCallback(async (data) => {
    const res = await api.post('/auth/register', data);
    setUser(res.data);
    return res;
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.post('/auth/logout');
    } catch {} finally {
      clearUser();
      router.push('/login');
    }
  }, []);

  return { user, isAuthenticated, isLoading, login, register, logout };
}
