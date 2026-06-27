'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';

export default function NotificationsPage() {
  const { isAuthenticated, isLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.push('/login?redirect=/notifications');
  }, [isLoading, isAuthenticated]);

  if (isLoading || !isAuthenticated) {
    return <div className="max-w-2xl mx-auto px-4 py-16 text-center text-muted-foreground">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">Notifications</h1>
      <p className="text-muted-foreground mb-6">Your recent alerts and updates</p>
      <div className="text-center py-16 text-muted-foreground">
        <span className="text-4xl block mb-3">🔔</span>
        <p>No notifications yet</p>
        <p className="text-sm">You will see booking updates and alerts here</p>
      </div>
    </div>
  );
}
