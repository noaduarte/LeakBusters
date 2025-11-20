import { AppSidebar } from '@/components/layout/app-sidebar';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <main className="flex-grow p-4 sm:p-6 lg:p-8 pt-16">{children}</main>
    </div>
  );
}
