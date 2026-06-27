'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useUiStore } from '@/store/ui-store';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: '◻' },
  { href: '/admin/users', label: 'Users', icon: '👥' },
  { href: '/admin/locations', label: 'Locations', icon: '📍' },
  { href: '/admin/slots', label: 'Parking Slots', icon: '🅿️' },
  { href: '/admin/bookings', label: 'Bookings', icon: '📋' },
  { href: '/admin/pricing', label: 'Pricing', icon: '💰' },
  { href: '/admin/reports', label: 'Reports', icon: '📊' },
  { href: '/admin/settings', label: 'Settings', icon: '⚙️' },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen, closeSidebar } = useUiStore();

  const isActive = (href) => pathname.startsWith(href);

  return (
    <>
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={closeSidebar} />
      )}

      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-full w-64 bg-card border-r border-border transform transition-transform duration-200 lg:translate-x-0 lg:static lg:z-auto',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="h-16 flex items-center px-6 border-b border-border">
          <Link href="/admin/dashboard" className="text-lg font-bold text-primary">
            ☰ ParkingBook
          </Link>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeSidebar}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                isActive(item.href)
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <div className="text-xs text-muted-foreground text-center">
            ParkingBook v1.0
          </div>
        </div>
      </aside>
    </>
  );
}
