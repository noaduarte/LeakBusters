import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';

type StatCardProps = {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
};

export function StatCard({ title, description, href, icon }: StatCardProps) {
  return (
    <Link href={href} className="group">
      <Card className="h-full transition-all duration-300 hover:shadow-md hover:-translate-y-1">
        <CardHeader>
          <div className="flex justify-between items-start mb-2">
            <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
                {icon}
            </div>
            <ArrowRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
          </div>
          <CardTitle className="font-headline text-lg">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
