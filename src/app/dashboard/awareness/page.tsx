'use client';
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import {
  getMonthlyConsumptionForUser,
  getAverageMonthlyConsumption,
} from '@/lib/data';
import { PageHeader } from '@/components/page-header';
import { Users } from 'lucide-react';

const chartConfig = {
  userConsumption: {
    label: 'El Teu Consum',
    color: 'hsl(var(--chart-1))',
  },
  averageConsumption: {
    label: 'Consum Mitjà',
    color: 'hsl(var(--chart-2))',
  },
};

export default function AwarenessPage() {
  const userConsumptionData = getMonthlyConsumptionForUser();
  const averageConsumptionData = getAverageMonthlyConsumption();

  const combinedData = averageConsumptionData.map((avg) => {
    const userMonth = userConsumptionData.find((uc) => uc.month === avg.month);
    return {
      month: avg.month,
      userConsumption: userMonth ? userMonth.consumption : 0,
      averageConsumption: avg.consumption,
    };
  });

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Conscienciació sobre el Consum"
        description="Compara el teu consum d'aigua mensual amb la mitjana de tots els usuaris."
        icon={<Users />}
      />
      <Card>
        <CardHeader>
          <CardTitle>Comparativa de Consum Mensual</CardTitle>
          <CardDescription>
            A continuació es mostra el teu consum (blau) enfront de la mitjana de la comunitat (verd).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[400px] w-full">
            <BarChart data={combinedData} accessibilityLayer>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis
                tickFormatter={(value) => `${value} L`}
              />
              <Tooltip
                content={<ChartTooltipContent indicator="dot" />}
                cursor={{ fill: 'hsl(var(--muted))' }}
              />
              <Legend />
              <Bar
                dataKey="userConsumption"
                name={chartConfig.userConsumption.label}
                fill="var(--color-userConsumption)"
                radius={4}
              />
              <Bar
                dataKey="averageConsumption"
                name={chartConfig.averageConsumption.label}
                fill="var(--color-averageConsumption)"
                radius={4}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
