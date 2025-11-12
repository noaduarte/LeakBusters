'use client';

import { Icons } from '@/components/icons';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  LineChart,
  Lightbulb,
  FileText,
  Settings,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const navItems = [
  {
    href: '/',
    icon: LayoutDashboard,
    label: 'Dashboard',
  },
  {
    href: '/consumption',
    icon: LineChart,
    label: 'Consumption',
  },
  {
    href: '/recommendations',
    icon: Lightbulb,
    label: 'Recommendations',
  },
  {
    href: '/bills',
    icon: FileText,
    label: 'Bills',
  },
  {
    href: '/settings',
    icon: Settings,
    label: 'Settings',
  },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar
          variant="inset"
          collapsible="icon"
          className="group/sidebar hidden md:flex"
        >
          <SidebarHeader className="h-16 items-center flex">
            <Button variant="ghost" className="h-10 w-full justify-start gap-3 px-2" asChild>
                <Link href="/">
                    <Icons.logo className="size-8 shrink-0 text-primary" />
                    <div className="flex flex-col">
                        <span className="font-headline text-lg font-bold text-primary-foreground">AquaGuard</span>
                    </div>
                </Link>
            </Button>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.label}
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        <SidebarInset className="p-4 sm:p-6 lg:p-8 !pt-16 sm:!pt-6 lg:!pt-8 bg-background">
            <header className="fixed md:hidden top-0 left-0 right-0 z-20 flex items-center justify-between p-2 border-b bg-background/80 backdrop-blur-sm h-14">
                <Button variant="ghost" className="h-10 justify-start gap-3 px-2" asChild>
                    <Link href="/">
                        <Icons.logo className="size-8 shrink-0 text-primary" />
                         <span className="font-headline text-lg font-bold">AquaGuard</span>
                    </Link>
                </Button>
                <SidebarTrigger className="size-8" />
            </header>
            <main className='w-full'>
                 {children}
            </main>
        </SidebarInset>

      </div>
    </SidebarProvider>
  );
}
