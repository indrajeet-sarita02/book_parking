'use client';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/auth-store';
import { api } from '@/lib/api/client';

export function AuthProvider({ children }) {
  const { setUser, clearUser } = useAuthStore();

  useEffect(() => {
    let cancelled = false;
    async function loadUser() {
      try {
        const res = await api.get('/auth/me');
        if (!cancelled) setUser(res.data);
      } catch {
        if (!cancelled) {
          const state = useAuthStore.getState();
          if (!state.isAuthenticated) {
            clearUser();
          }
        }
      }
    }
    loadUser();
    return () => { cancelled = true; };
  }, []);

  return children;
}
