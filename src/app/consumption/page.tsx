import { ConsumptionView } from '@/components/consumption/consumption-view';
import { PageHeader } from '@/components/page-header';
import { getHourlyConsumptionForDay, getDailyConsumptionForMonth, getMonthlyConsumptionForYear } from '@/lib/data';
import { LineChart } from 'lucide-react';

export default function ConsumptionPage() {
  const userId = '999000011116';
  const hourlyData = getHourlyConsumptionForDay(userId, new Date('2024-07-23'));
  const dailyData = getDailyConsumptionForMonth(userId, 2024, 6); // Juliol (0-indexed)
  const monthlyData = getMonthlyConsumptionForYear(userId, 2024);

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Anàlisi de Consum"
        description="Analitza els teus patrons de consum d'aigua en diferents períodes de temps."
        icon={<LineChart />}
      />
      <ConsumptionView
        hourlyData={hourlyData}
        dailyData={dailyData}
        monthlyData={monthlyData}
      />
    </div>
  );
}
