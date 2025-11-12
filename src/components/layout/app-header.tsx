'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { Icons } from '@/components/icons';
import { useEffect, useState } from 'react';

export function AppHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-2 border-b bg-background/80 backdrop-blur-sm h-16">
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2">
          <Icons.logo className="size-8 shrink-0 text-primary" />
          <span className="font-headline text-lg font-bold hidden sm:inline-block">
            AB Data Challenge
          </span>
        </Link>
      </div>
      <div className="flex items-center gap-2">
        {isClient && pathname !== '/' && (
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Enrere</span>
          </Button>
        )}
        <Button variant="outline" size="icon" asChild>
          <Link href="/">
            <Home className="h-4 w-4" />
            <span className="sr-only">Inici</span>
          </Link>
        </Button>
      </div>
    </header>
  );
}
