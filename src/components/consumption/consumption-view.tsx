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
  HourlyConsumption,
  DailyConsumption,
  MonthlyConsumption,
} from '@/lib/types';
import { ConsumptionDatePicker } from './consumption-date-picker';

const chartConfig = {
  consumption: {
    label: 'Consum (Litres)',
    color: 'hsl(var(--primary))',
  },
};

type ConsumptionViewProps = {
  hourlyData: HourlyConsumption[];
  dailyData: DailyConsumption[];
  monthlyData: MonthlyConsumption[];
};

export function ConsumptionView({
  hourlyData,
  dailyData,
  monthlyData,
}: ConsumptionViewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gràfics de Consum</CardTitle>
        <CardDescription>
          Fes clic a les pestanyes per veure les teves dades de consum.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="daily">
          <div className="flex justify-between items-center">
            <TabsList className="grid grid-cols-3 w-auto">
              <TabsTrigger value="daily">Diari</TabsTrigger>
              <TabsTrigger value="monthly">Mensual</TabsTrigger>
              <TabsTrigger value="yearly">Anual</TabsTrigger>
            </TabsList>
            <ConsumptionDatePicker />
          </div>
          <TabsContent value="daily" className="mt-6">
            <ChartContainer config={chartConfig} className="h-72 w-full">
              <LineChart
                data={hourlyData}
                accessibilityLayer
                margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis dataKey="hour" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis
                  tickFormatter={(value) => `${value} L`}
                />
                <Tooltip content={<ChartTooltipContent indicator="dot" />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="consumption"
                  name="Consum"
                  stroke="var(--color-consumption)"
                  strokeWidth={2}
                  dot={true}
                />
              </LineChart>
            </ChartContainer>
             <p className="text-center text-sm text-muted-foreground mt-4">Evolució del consum durant el dia seleccionat.</p>
          </TabsContent>
          <TabsContent value="monthly" className="mt-6">
            <ChartContainer config={chartConfig} className="h-72 w-full">
              <BarChart data={dailyData} accessibilityLayer>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickFormatter={(value) => `${value} L`} />
                <Tooltip content={<ChartTooltipContent indicator="dot" />} />
                <Legend />
                <Bar
                  dataKey="consumption"
                  name="Consum"
                  fill="var(--color-consumption)"
                  radius={4}
                />
              </BarChart>
            </ChartContainer>
            <p className="text-center text-sm text-muted-foreground mt-4">Evolució del consum durant els dies del mes seleccionat.</p>
          </TabsContent>
          <TabsContent value="yearly" className="mt-6">
             <ChartContainer config={chartConfig} className="h-72 w-full">
              <BarChart data={monthlyData} accessibilityLayer>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickFormatter={(value) => `${value / 1000}k L`} />
                <Tooltip content={<ChartTooltipContent indicator="dot" />} />
                <Legend />
                <Bar
                  dataKey="consumption"
                  name="Consum"
                  fill="var(--color-consumption)"
                  radius={4}
                />
              </BarChart>
            </ChartContainer>
            <p className="text-center text-sm text-muted-foreground mt-4">Evolució del consum durant els mesos de l'any seleccionat.</p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
