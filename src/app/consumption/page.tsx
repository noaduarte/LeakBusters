import { ConsumptionView } from '@/components/consumption/consumption-view';
import { PageHeader } from '@/components/page-header';
import { getDailyConsumptionForUser, getMonthlyConsumptionForUser, getYearlyConsumptionForUser } from '@/lib/data';
import { LineChart } from 'lucide-react';

export default function ConsumptionPage() {
  const userId = '999000011116';
  const dailyData = getDailyConsumptionForUser(userId);
  const monthlyData = getMonthlyConsumptionForUser(userId);
  const yearlyData = getYearlyConsumptionForUser(userId);

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Anàlisi de Consum"
        description="Analitza els teus patrons de consum d'aigua en diferents períodes de temps."
        icon={<LineChart />}
      />
      <ConsumptionView
        dailyData={dailyData}
        monthlyData={monthlyData}
        yearlyData={yearlyData}
      />
    </div>
  );
}
