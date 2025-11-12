import { StatCard } from '@/components/dashboard/stat-card';
import { PageHeader } from '@/components/page-header';
import {
  FileText,
  LayoutDashboard,
  LineChart,
  Users,
} from 'lucide-react';
import { MonthlyConsumptionChart } from '@/components/dashboard/monthly-consumption-chart';
import { LeakPrediction } from '@/components/dashboard/leak-prediction';
import { getMonthlyConsumptionForUser } from '@/lib/data';
import { Icons } from '@/components/icons';

export default function Home() {
  const quickLinks = [
    {
      title: 'Detalls de Consum',
      href: '/consumption',
      icon: <LineChart className="size-6 text-primary" />,
      description: 'Consulta gràfics de consum diari, mensual i anual.',
    },
    {
      title: 'Conscienciació',
      href: '/awareness',
      icon: <Users className="size-6 text-primary" />,
      description: "Compara el teu consum d'aigua amb la mitjana.",
    },
    {
      title: 'Historial de Factures',
      href: '/bills',
      icon: <FileText className="size-6 text-primary" />,
      description: 'Accedeix a les teves factures mensuals passades i actuals.',
    },
  ];

  // We are using a specific user's data as requested
  const monthlyConsumption = getMonthlyConsumptionForUser('999000011116');

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
         <Icons.logo className="size-12 shrink-0 text-primary hidden sm:block" />
         <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary-foreground font-headline">
              AB Data Challenge
            </h1>
            <p className="mt-1 text-muted-foreground">Aquí tens un resum del teu consum d'aigua.</p>
         </div>
      </div>


      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <MonthlyConsumptionChart data={monthlyConsumption} />
        </div>
        <div className="lg:col-span-1">
          <LeakPrediction />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
        {quickLinks.map((link) => (
          <StatCard
            key={link.title}
            title={link.title}
            href={link.href}
            icon={link.icon}
            description={link.description}
          />
        ))}
      </div>
    </div>
  );
}
