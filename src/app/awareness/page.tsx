'use client';
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ChartTooltipContent } from '@/components/ui/chart';
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
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={combinedData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis
                tickFormatter={(value) => `${Math.round(value / 1000)}k L`}
              />
              <Tooltip
                content={<ChartTooltipContent indicator="dot" />}
                cursor={{ fill: 'hsl(var(--muted))' }}
              />
              <Legend />
              <Bar
                dataKey="userConsumption"
                name={chartConfig.userConsumption.label}
                fill={chartConfig.userConsumption.color}
                radius={4}
              />
              <Bar
                dataKey="averageConsumption"
                name={chartConfig.averageConsumption.label}
                fill={chartConfig.averageConsumption.color}
                radius={4}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
