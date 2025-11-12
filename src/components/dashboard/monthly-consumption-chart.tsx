'use client';
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltipContent,
} from '@/components/ui/chart';
import type { MonthlyConsumption } from '@/lib/types';
import { TrendingUp } from 'lucide-react';

const chartConfig = {
  consumption: {
    label: 'Consumption (Gallons)',
    color: 'hsl(var(--primary))',
  },
};

type MonthlyConsumptionChartProps = {
  data: MonthlyConsumption[];
};

export function MonthlyConsumptionChart({ data }: MonthlyConsumptionChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <TrendingUp className="size-6"/>
          Monthly Consumption
        </CardTitle>
        <CardDescription>
          Your water usage over the past 12 months.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <BarChart data={data} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <Tooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <Bar dataKey="consumption" fill="var(--color-consumption)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
