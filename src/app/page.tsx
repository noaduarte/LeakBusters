import { MonthlyConsumptionChart } from '@/components/dashboard/monthly-consumption-chart';
import { LeakPrediction } from '@/components/dashboard/leak-prediction';
import { StatCard } from '@/components/dashboard/stat-card';
import { PageHeader } from '@/components/page-header';
import {
  FileText,
  LayoutDashboard,
  LineChart,
  Lightbulb,
  Settings,
} from 'lucide-react';
import { monthlyConsumption } from '@/lib/data';

export default function Home() {
  const quickLinks = [
    {
      title: 'Consumption Details',
      href: '/consumption',
      icon: <LineChart className="size-6 text-primary" />,
      description: 'View daily, monthly, and annual usage graphs.',
    },
    {
      title: 'Recommendations',
      href: '/recommendations',
      icon: <Lightbulb className="size-6 text-primary" />,
      description: 'Get tips to reduce your water consumption.',
    },
    {
      title: 'Billing History',
      href: '/bills',
      icon: <FileText className="size-6 text-primary" />,
      description: 'Access your past and current monthly bills.',
    },
    {
      title: 'Settings',
      href: '/settings',
      icon: <Settings className="size-6 text-primary" />,
      description: 'Configure your data sources and prediction models.',
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Dashboard"
        description="Here's an overview of your water consumption."
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
