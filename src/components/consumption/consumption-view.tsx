'use client';
import {
  Bar,
  BarChart,
  Line,
  LineChart,
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import type {
  DailyConsumption,
  MonthlyConsumption,
  YearlyConsumption,
} from '@/lib/types';

const chartConfig = {
  consumption: {
    label: 'Consumption',
    color: 'hsl(var(--primary))',
  },
};

type ConsumptionViewProps = {
  dailyData: DailyConsumption[];
  monthlyData: MonthlyConsumption[];
  yearlyData: YearlyConsumption[];
};

export function ConsumptionView({
  dailyData,
  monthlyData,
  yearlyData,
}: ConsumptionViewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Consumption Graphs</CardTitle>
        <CardDescription>
          Click through the tabs to see your consumption data.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="monthly">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly</TabsTrigger>
          </TabsList>
          <TabsContent value="daily" className="mt-6">
            <ChartContainer config={chartConfig} className="h-72 w-full">
              <LineChart
                data={dailyData}
                accessibilityLayer
                margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis
                  tickFormatter={(value) => `${value} gal`}
                  domain={['dataMin - 20', 'dataMax + 20']}
                />
                <Tooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="consumption"
                  stroke="var(--color-consumption)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </TabsContent>
          <TabsContent value="monthly" className="mt-6">
            <ChartContainer config={chartConfig} className="h-72 w-full">
              <BarChart data={monthlyData} accessibilityLayer>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickFormatter={(value) => `${value / 1000}k gal`} />
                <Tooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="consumption"
                  fill="var(--color-consumption)"
                  radius={4}
                />
              </BarChart>
            </ChartContainer>
          </TabsContent>
          <TabsContent value="yearly" className="mt-6">
             <ChartContainer config={chartConfig} className="h-72 w-full">
              <BarChart data={yearlyData} accessibilityLayer>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="year" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickFormatter={(value) => `${value / 1000}k gal`} />
                <Tooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="consumption"
                  fill="var(--color-consumption)"
                  radius={4}
                />
              </BarChart>
            </ChartContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
