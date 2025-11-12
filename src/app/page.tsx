import { StatCard } from '@/components/dashboard/stat-card';
import { PageHeader } from '@/components/page-header';
import {
  FileText,
  LayoutDashboard,
  LineChart,
  Lightbulb,
  Settings,
} from 'lucide-react';
import { MonthlyConsumptionChart } from '@/components/dashboard/monthly-consumption-chart';
import { LeakPrediction } from '@/components/dashboard/leak-prediction';
import { monthlyConsumption } from '@/lib/data';


export default function Home() {
  const quickLinks = [
    {
      title: 'Detalls de Consum',
      href: '/consumption',
      icon: <LineChart className="size-6 text-primary" />,
      description: 'Consulta gràfics de consum diari, mensual i anual.',
    },
    {
      title: 'Recomanacions',
      href: '/recommendations',
      icon: <Lightbulb className="size-6 text-primary" />,
      description: 'Obtén consells per reduir el teu consum d\'aigua.',
    },
    {
      title: 'Historial de Factures',
      href: '/bills',
      icon: <FileText className="size-6 text-primary" />,
      description: 'Accedeix a les teves factures mensuals passades i actuals.',
    },
    {
      title: 'Configuració',
      href: '/settings',
      icon: <Settings className="size-6 text-primary" />,
      description: 'Configura les teves fonts de dades i models de predicció.',
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Inici"
        description="Aquí tens un resum del teu consum d'aigua."
        icon={<LayoutDashboard />}
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <MonthlyConsumptionChart data={monthlyConsumption} />
        </div>
        <div className="lg:col-span-1">
          <LeakPrediction />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
