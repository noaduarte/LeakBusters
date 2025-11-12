import { ConsumptionView } from '@/components/consumption/consumption-view';
import { PageHeader } from '@/components/page-header';
import { dailyConsumption, monthlyConsumption, yearlyConsumption } from '@/lib/data';
import { LineChart } from 'lucide-react';

export default function ConsumptionPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Consumption Analysis"
        description="Analyze your water usage patterns across different timeframes."
        icon={<LineChart />}
      />
      <ConsumptionView
        dailyData={dailyConsumption}
        monthlyData={monthlyConsumption}
        yearlyData={yearlyConsumption}
      />
    </div>
  );
}
