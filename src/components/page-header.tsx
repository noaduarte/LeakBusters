import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type PageHeaderProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
  className?: string;
};

export function PageHeader({
  title,
  description,
  icon,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn('flex items-start gap-4', className)}>
      {icon && (
        <div className="hidden sm:flex items-center justify-center p-3 rounded-lg bg-card border text-primary">
          {icon}
        </div>
      )}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary-foreground font-headline">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
}
