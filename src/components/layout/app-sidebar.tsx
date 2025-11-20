'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LineChart, Users, FileText, LogOut, Settings } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const navItems = [
  { href: '/dashboard', icon: Home, label: 'Inici' },
  { href: '/dashboard/consumption', icon: LineChart, label: 'Consum' },
  { href: '/dashboard/awareness', icon: Users, label: 'Conscienciació' },
  { href: '/dashboard/bills', icon: FileText, label: 'Factures' },
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <aside className="flex flex-col items-center border-r bg-background p-3">
      <div className="flex flex-col items-center gap-y-6">
        <Link href="/dashboard">
          <Icons.logo className="size-8 text-primary" />
          <span className="sr-only">AB Data Challenge</span>
        </Link>
        <TooltipProvider>
          <nav className="flex flex-col items-center gap-y-4">
            {navItems.map((item) => (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <Button
                    asChild
                    variant={pathname === item.href ? 'secondary' : 'ghost'}
                    size="icon"
                    className={cn(
                      'rounded-lg',
                      pathname === item.href &&
                        'text-primary'
                    )}
                  >
                    <Link href={item.href}>
                      <item.icon className="size-5" />
                      <span className="sr-only">{item.label}</span>
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">{item.label}</TooltipContent>
              </Tooltip>
            ))}
             <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={handleLogout} variant="ghost" size="icon" className="rounded-lg mt-4">
                  <LogOut className="size-5" />
                  <span className="sr-only">Tancar sessió</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Tancar sessió</TooltipContent>
            </Tooltip>
          </nav>
        </TooltipProvider>
      </div>
    </aside>
  );
}
