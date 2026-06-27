'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/auth-store';
import { useAuth } from '@/hooks/use-auth';

const navItems = [
  { href: '/', label: 'Home', icon: '🏠' },
  { href: '/parking', label: 'Search', icon: '🔍' },
  { href: '/bookings', label: 'Bookings', icon: '📋' },
  { href: '/notifications', label: 'Alerts', icon: '🔔' },
  { href: '/profile', label: 'Profile', icon: '👤' },
];

export function MobileNav() {
  const pathname = usePathname();
  const { isAuthenticated } = useAuthStore();
  const { logout } = useAuth();

  if (!isAuthenticated) return null;
  if (pathname.startsWith('/admin')) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border md:hidden">
      <div className="flex items-center justify-around h-14">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center gap-0.5 text-xs transition-colors',
                active ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
        <button
          onClick={logout}
          className="flex flex-col items-center gap-0.5 text-xs text-muted-foreground"
        >
          <span className="text-lg">🚪</span>
          Logout
        </button>
      </div>
    </nav>
  );
}
