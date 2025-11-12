'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  LineChart,
  Users,
  FileText,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'lucide-react';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/', icon: Home, label: 'Inici' },
  { href: '/consumption', icon: LineChart, label: 'Consum' },
  { href: '/awareness', icon: Users, label: 'Conscienciació' },
  { href: '/bills', icon: FileText, label: 'Factures' },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col items-center gap-y-6 border-r bg-background p-3">
      <Link href="/">
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
        </nav>
      </TooltipProvider>
    </aside>
  );
}
